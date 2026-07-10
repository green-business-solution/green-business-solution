import fs from "node:fs/promises";
import path from "node:path";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { fromIni } from "@aws-sdk/credential-providers";
import { readFirstmateTaskReport, readFirstmateTasksDashboard } from "../apps/api/server/firstmateTasks.mjs";
import {
  buildFirstmateTaskSnapshotFromDashboard,
  defaultFirstmateTaskWorkspaceId,
  publishFirstmateTaskSnapshot
} from "../apps/api/server/firstmateTaskSnapshots.mjs";

const defaultRegion = "us-east-2";
const defaultTableName = "gbs-firstmate-tasks";

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    printHelp();
    return;
  }

  const firstmateHome = options.firstmateHome || process.env.RETROFI_FIRSTMATE_HOME || "";
  if (!firstmateHome) {
    throw new Error("Firstmate home is required. Set RETROFI_FIRSTMATE_HOME or pass --firstmate-home.");
  }
  const tableName = options.tableName || process.env.GBS_FIRSTMATE_TASKS_TABLE || defaultTableName;
  const region = options.region || process.env.GBS_AWS_REGION || process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION || defaultRegion;
  const profile = options.profile || process.env.AWS_PROFILE || "";
  const workspaceId = options.workspaceId || process.env.RETROFI_FIRSTMATE_TASK_WORKSPACE_ID || defaultFirstmateTaskWorkspaceId;
  const sourceModifiedAtEpochMs = await latestFirstmateSourceModifiedAtEpochMs(firstmateHome);
  const dashboard = await readFirstmateTasksDashboard({
    env: firstmateEnv(firstmateHome),
    now: new Date()
  });
  const reportsByTaskId = await readFirstmateReportsByTaskId({
    dashboard,
    env: firstmateEnv(firstmateHome),
    now: new Date()
  });
  const snapshot = buildFirstmateTaskSnapshotFromDashboard(dashboard, {
    reportsByTaskId,
    sourceModifiedAtEpochMs,
    workspaceId
  });

  if (!dashboard.enabled) {
    throw new Error(dashboard.reason || "Firstmate task data is unavailable.");
  }

  const summary = {
    workspaceId: snapshot.workspaceId,
    snapshotVersion: snapshot.snapshotVersion,
    sourceModifiedAtEpochMs: snapshot.sourceModifiedAtEpochMs,
    activeTaskCount: snapshot.activeTaskCount,
    inactiveTaskCount: snapshot.inactiveTaskCount,
    reportCount: snapshot.reportCount,
    totalTaskCount: snapshot.totalTaskCount,
    tableName,
    region,
    write: options.write
  };

  if (!options.write) {
    console.log(JSON.stringify({ ...summary, dryRun: true }, null, 2));
    return;
  }

  const db = DynamoDBDocumentClient.from(
    new DynamoDBClient({
      region,
      credentials: profile ? fromIni({ profile }) : undefined
    }),
    {
      marshallOptions: {
        removeUndefinedValues: true
      }
    }
  );
  const result = await publishFirstmateTaskSnapshot({ db, tableName, snapshot });
  console.log(JSON.stringify({ ...summary, ...result, dryRun: false }, null, 2));
}

async function latestFirstmateSourceModifiedAtEpochMs(firstmateHome) {
  return Math.max(
    await latestMtimeMs(path.join(firstmateHome, "data", "backlog.md")),
    await latestStateMtimeMs(path.join(firstmateHome, "state")),
    await latestReportMtimeMs(path.join(firstmateHome, "data")),
    0
  ) || Date.now();
}

async function latestMtimeMs(filePath) {
  let stat;
  try {
    stat = await fs.stat(filePath);
  } catch {
    return 0;
  }

  return stat.isDirectory() ? 0 : stat.mtimeMs;
}

async function latestStateMtimeMs(stateDir) {
  let stat;
  try {
    stat = await fs.stat(stateDir);
  } catch {
    return 0;
  }
  if (!stat.isDirectory()) return stat.mtimeMs;

  let latest = stat.mtimeMs;
  const entries = await fs.readdir(stateDir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) continue;
    if (!/\.(meta|status)$/i.test(entry.name)) continue;
    latest = Math.max(latest, await latestMtimeMs(path.join(stateDir, entry.name)));
  }
  return latest;
}

async function latestReportMtimeMs(dataDir) {
  let stat;
  try {
    stat = await fs.stat(dataDir);
  } catch {
    return 0;
  }
  if (!stat.isDirectory()) return 0;

  let latest = stat.mtimeMs;
  const entries = await fs.readdir(dataDir, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    latest = Math.max(latest, await latestMtimeMs(path.join(dataDir, entry.name, "report.md")));
  }
  return latest;
}

async function readFirstmateReportsByTaskId({ dashboard, env, now }) {
  const reportsByTaskId = new Map();
  for (const task of dashboard.tasks || []) {
    if (!task.hasReport) continue;
    reportsByTaskId.set(task.id, await readFirstmateTaskReport({ env, taskId: task.id, now }));
  }
  return reportsByTaskId;
}

function firstmateEnv(firstmateHome) {
  return {
    ...process.env,
    RETROFI_ENABLE_FIRSTMATE_TASKS: "1",
    RETROFI_FIRSTMATE_HOME: firstmateHome
  };
}

function parseArgs(args) {
  const options = {
    firstmateHome: "",
    help: false,
    profile: "",
    region: "",
    tableName: "",
    workspaceId: "",
    write: false
  };

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === "--help" || arg === "-h") {
      options.help = true;
      continue;
    }
    if (arg === "--write") {
      options.write = true;
      continue;
    }
    if (arg === "--firstmate-home") {
      options.firstmateHome = requiredArg(args, ++index, arg);
      continue;
    }
    if (arg === "--table") {
      options.tableName = requiredArg(args, ++index, arg);
      continue;
    }
    if (arg === "--region") {
      options.region = requiredArg(args, ++index, arg);
      continue;
    }
    if (arg === "--profile") {
      options.profile = requiredArg(args, ++index, arg);
      continue;
    }
    if (arg === "--workspace") {
      options.workspaceId = requiredArg(args, ++index, arg);
      continue;
    }
    throw new Error(`Unknown argument: ${arg}`);
  }

  return options;
}

function requiredArg(args, index, flag) {
  const value = args[index];
  if (!value || value.startsWith("--")) {
    throw new Error(`${flag} requires a value.`);
  }
  return value;
}

function printHelp() {
  console.log(`Sync sanitized Firstmate task snapshots into DynamoDB.

Usage:
  node scripts/sync-firstmate-tasks-to-dynamodb.mjs [options]

Options:
  --write                         Publish to DynamoDB. Omit for a dry run.
  --firstmate-home <path>          Firstmate home. Required unless RETROFI_FIRSTMATE_HOME is set.
  --table <name>                   DynamoDB table. Default: GBS_FIRSTMATE_TASKS_TABLE or ${defaultTableName}.
  --workspace <id>                 Snapshot workspace id. Default: ${defaultFirstmateTaskWorkspaceId}.
  --region <region>                AWS region. Default: GBS_AWS_REGION, AWS_REGION, or ${defaultRegion}.
  --profile <profile>              Optional AWS profile for local publishing.

The writer stores a complete versioned snapshot first, then advances the manifest
with a conditional write so stale or partial publishes cannot replace current work.
Report markdown is sanitized and bounded before it is written.`);
}

main().catch((error) => {
  console.error(error?.message || error);
  process.exitCode = 1;
});
