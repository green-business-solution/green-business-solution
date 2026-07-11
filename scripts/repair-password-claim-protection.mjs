import crypto from "node:crypto";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { fromIni } from "@aws-sdk/credential-providers";
import {
  PASSWORD_CLAIM_GUARD_AT_FIELD,
  PASSWORD_CLAIM_GUARD_FIELD,
  PASSWORD_CLAIM_GUARD_REASON,
  PASSWORD_CLAIM_GUARD_REASON_FIELD,
  PASSWORD_CLAIM_GUARD_RUN_ID_FIELD,
  requiresPasswordClaimProtection,
} from "../apps/api/server/passwordSignupPolicy.mjs";

const defaultUsersTable = process.env.GBS_USERS_TABLE || "gbs-users";
const defaultRegion =
  process.env.GBS_AWS_REGION || process.env.AWS_REGION || "us-east-2";
const defaultProfile = process.env.AWS_PROFILE || "retrofi-prod";

export function parseArgs(argv) {
  const options = {
    dryRun: true,
    maxUpdates: 250,
    region: defaultRegion,
    profile: defaultProfile,
    runId: undefined,
    usersTable: defaultUsersTable,
    rollback: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const next = argv[index + 1];

    if (arg === "--dry-run") {
      options.dryRun = true;
      continue;
    }

    if (arg === "--write" || arg === "--no-dry-run") {
      options.dryRun = false;
      continue;
    }

    if (arg === "--rollback") {
      options.rollback = true;
      continue;
    }

    if (arg === "--run-id" && next) {
      options.runId = next;
      index += 1;
      continue;
    }

    if (arg === "--max-updates" && next) {
      options.maxUpdates = Number.parseInt(next, 10);
      index += 1;
      continue;
    }

    if (arg === "--region" && next) {
      options.region = next;
      index += 1;
      continue;
    }

    if (arg === "--profile" && next) {
      options.profile = next;
      index += 1;
      continue;
    }

    if (arg === "--users-table" && next) {
      options.usersTable = next;
      index += 1;
      continue;
    }

    if (arg === "--help" || arg === "-h") {
      options.help = true;
      continue;
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  if (!Number.isInteger(options.maxUpdates) || options.maxUpdates < 1) {
    throw new Error("--max-updates must be an integer and at least 1.");
  }

  return options;
}

export function buildMigrationReport({ config, outcome }) {
  return {
    mode: config.rollback ? "rollback" : "repair",
    dryRun: config.dryRun,
    runId: config.runId,
    ...outcome,
  };
}

export async function runPasswordClaimProtectionRepair(options = {}, dependencies = {}) {
  const config = {
    dryRun: options.dryRun !== false,
    maxUpdates: options.maxUpdates || 250,
    region: options.region || defaultRegion,
    profile: options.profile || defaultProfile,
    runId:
      options.runId || (options.rollback ? undefined : crypto.randomUUID()),
    usersTable: options.usersTable || defaultUsersTable,
    rollback: Boolean(options.rollback),
  };

  if (config.rollback && !config.runId) {
    throw new Error("Rollback requires --run-id.");
  }

  const db = dependencies.db || createDbClient(config);
  const now = new Date().toISOString();
  const outcome = {
    scanned: 0,
    candidates: 0,
    protected: 0,
    alreadyProtected: 0,
    restored: 0,
    skipped: 0,
    failures: 0,
  };

  let startKey;
  let scanned = 0;

  while (scanned < config.maxUpdates) {
    const requestLimit = Math.min(config.maxUpdates - scanned, 25);
    const scanResult = await db.send(
      new ScanCommand({
        TableName: config.usersTable,
        Limit: requestLimit,
        ExclusiveStartKey: startKey,
        ProjectionExpression:
          "userId, #status, role, passwordLinked, passwordHash, passwordHashKeyLength, passwordAlgorithm, passwordSalt, passwordClaimProtected, passwordClaimProtectionRunId",
        ExpressionAttributeNames: {
          "#status": "status",
        },
        ExpressionAttributeValues: {
          ":active": "active",
        },
        FilterExpression: "#status = :active",
      }),
    );

    const records = scanResult.Items || [];
    if (!records.length) {
      startKey = scanResult.LastEvaluatedKey;
      if (!startKey) {
        break;
      }
      continue;
    }

    for (const user of records) {
      if (scanned >= config.maxUpdates) {
        break;
      }

      scanned += 1;
      outcome.scanned += 1;

      const needsProtection = requiresPasswordClaimProtection(user, {
        passwordHashAlgorithm: "scrypt",
        passwordHashKeyLength: 64,
      });
      const isPrivileged = user.role === "admin";

      if (!isPrivileged) {
        outcome.skipped += 1;
        continue;
      }

      if (!config.rollback) {
        if (!needsProtection) {
          outcome.skipped += 1;
          continue;
        }

        if (user[PASSWORD_CLAIM_GUARD_FIELD] === true) {
          outcome.alreadyProtected += 1;
          continue;
        }

        outcome.candidates += 1;

        if (config.dryRun) {
          outcome.protected += 1;
          continue;
        }

        try {
          await db.send(
            new UpdateCommand({
              TableName: config.usersTable,
              Key: { userId: user.userId },
              ConditionExpression: "attribute_not_exists(passwordClaimProtected)",
              UpdateExpression:
                `SET ${PASSWORD_CLAIM_GUARD_FIELD} = :trueVal, ${PASSWORD_CLAIM_GUARD_RUN_ID_FIELD} = :runId, ${PASSWORD_CLAIM_GUARD_AT_FIELD} = :now, ${PASSWORD_CLAIM_GUARD_REASON_FIELD} = :reason`,
              ExpressionAttributeValues: {
                ":trueVal": true,
                ":runId": config.runId,
                ":now": now,
                ":reason": PASSWORD_CLAIM_GUARD_REASON,
              },
            }),
          );
          outcome.protected += 1;
        } catch (error) {
          outcome.failures += 1;
          if (error?.name === "ConditionalCheckFailedException") {
            outcome.alreadyProtected += 1;
            continue;
          }
          throw error;
        }
      } else {
        const isTargetForRollback =
          user[PASSWORD_CLAIM_GUARD_FIELD] === true &&
          user[PASSWORD_CLAIM_GUARD_RUN_ID_FIELD] === config.runId;

        if (!isTargetForRollback) {
          outcome.skipped += 1;
          continue;
        }

        outcome.candidates += 1;
        if (config.dryRun) {
          outcome.restored += 1;
          continue;
        }

        try {
          await db.send(
            new UpdateCommand({
              TableName: config.usersTable,
              Key: { userId: user.userId },
              ConditionExpression:
                "#passwordClaimProtected = :trueVal AND #passwordClaimProtectionRunId = :runId",
              ExpressionAttributeNames: {
                "#passwordClaimProtected": PASSWORD_CLAIM_GUARD_FIELD,
                "#passwordClaimProtectionRunId": PASSWORD_CLAIM_GUARD_RUN_ID_FIELD,
              },
              ExpressionAttributeValues: {
                ":trueVal": true,
                ":runId": config.runId,
              },
              UpdateExpression: `REMOVE ${PASSWORD_CLAIM_GUARD_FIELD}, ${PASSWORD_CLAIM_GUARD_RUN_ID_FIELD}, ${PASSWORD_CLAIM_GUARD_AT_FIELD}, ${PASSWORD_CLAIM_GUARD_REASON_FIELD}`,
            }),
          );
          outcome.restored += 1;
        } catch (error) {
          outcome.failures += 1;
          if (error?.name === "ConditionalCheckFailedException") {
            outcome.skipped += 1;
            continue;
          }
          throw error;
        }
      }
    }

    startKey = scanResult.LastEvaluatedKey;
    if (!startKey) {
      break;
    }
  }

  return buildMigrationReport({ config, outcome });
}

function createDbClient(config) {
  const client = new DynamoDBClient({
    region: config.region,
    credentials: config.profile ? fromIni({ profile: config.profile }) : undefined,
  });
  return DynamoDBDocumentClient.from(client);
}

function printHelp() {
  console.log(`Usage: node scripts/repair-password-claim-protection.mjs [options]\n\nOptions:\n  --dry-run\n  --write\n  --rollback\n  --run-id <id>\n  --max-updates <number>\n  --region us-east-2\n  --profile retrofi-prod\n  --users-table gbs-users`);
}

export async function main(argv) {
  const options = parseArgs(argv);
  if (options.help) {
    printHelp();
    return;
  }

  const report = await runPasswordClaimProtectionRepair(options);
  console.log(JSON.stringify(report, null, 2));
  if (report.failures > 0) {
    process.exitCode = 1;
  }
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  main(process.argv.slice(2)).catch((error) => {
    console.error(error instanceof Error ? error.message : "Unknown error.");
    process.exitCode = 1;
  });
}
