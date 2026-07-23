import crypto from "node:crypto";
import fsPromises from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

import {
  CONTRACTOR_SOURCE_BUCKET,
  CONTRACTORS_TABLE,
  DYNAMODB_REGION,
  EXPECTED_AWS_ACCOUNT_ID,
  EXPECTED_AWS_PROFILE,
  S3_REGION,
} from "./import-cslb-contractors.mjs";
import { createAwsAdapter } from "./enrich-contractor-directories.mjs";

const RUN_ID = "directory-resolution-20260723T185235786Z";
const EXPECTED_REPAIR_COUNT = 5;

export async function repairContractorEvidenceDeduplication(
  options,
  dependencies = {},
) {
  const profile =
    options.profile ||
    process.env.AWS_PROFILE ||
    EXPECTED_AWS_PROFILE;
  if (profile !== EXPECTED_AWS_PROFILE) {
    throw new Error(
      `This repair requires AWS profile ${EXPECTED_AWS_PROFILE}.`,
    );
  }
  if (options.write && options.approval !== RUN_ID) {
    throw new Error(`Write mode requires --approval ${RUN_ID}.`);
  }
  const aws =
    dependencies.aws ||
    createAwsAdapter({
      bucketName: CONTRACTOR_SOURCE_BUCKET,
      profile,
      s3Region: S3_REGION,
      tableName: CONTRACTORS_TABLE,
      tableRegion: DYNAMODB_REGION,
    });
  const accountId = await aws.getAccountId();
  if (accountId !== EXPECTED_AWS_ACCOUNT_ID) {
    throw new Error(
      `This repair requires AWS account ${EXPECTED_AWS_ACCOUNT_ID}.`,
    );
  }
  await aws.assertInfrastructure();
  const reportKey = `imports/enrichment/${RUN_ID}/evidence-deduplication-report.json`;
  if (options.write && aws.readJson) {
    const existing = await aws.readJson(reportKey);
    if (existing?.repairedContractorCount === EXPECTED_REPAIR_COUNT) {
      return {
        idempotentReplay: true,
        report: existing,
      };
    }
  }

  const contractors = await aws.scanContractors();
  const repairs = contractors
    .map((contractor) => {
      const current = contractor.enrichmentEvidence;
      if (!Array.isArray(current) || current.length < 2) return null;
      const deduplicated = deduplicateEvidence(current);
      if (deduplicated.length === current.length) return null;
      return {
        contractorId: contractor.contractorId,
        expected: current,
        set: deduplicated,
      };
    })
    .filter(Boolean);
  if (repairs.length !== EXPECTED_REPAIR_COUNT) {
    throw new Error(
      `Expected ${EXPECTED_REPAIR_COUNT} evidence repairs, found ${repairs.length}.`,
    );
  }

  let awsWriteCount = 0;
  if (options.write) {
    for (const repair of repairs) {
      await aws.updateContractor({
        contractorId: repair.contractorId,
        expected: {
          enrichmentEvidence: repair.expected,
        },
        reasons: ["execution:deduplicateEnrichmentEvidence"],
        set: {
          enrichmentEvidence: repair.set,
        },
      });
      awsWriteCount += 1;
    }
  }
  const report = {
    schemaVersion:
      "contractor-evidence-deduplication-report.v1",
    runId: RUN_ID,
    mode: options.write ? "write" : "dry-run",
    completedAt: new Date().toISOString(),
    accountId,
    field: "enrichmentEvidence",
    expectedRepairCount: EXPECTED_REPAIR_COUNT,
    repairedContractorCount: options.write ? repairs.length : 0,
    proposedRepairCount: repairs.length,
    removedDuplicateCount: repairs.reduce(
      (total, repair) =>
        total + repair.expected.length - repair.set.length,
      0,
    ),
    contractorIdTokens: repairs
      .map((repair) => token(repair.contractorId))
      .sort(),
    invariants: {
      changesEmail: false,
      changesCslbFields: false,
      changesSupportedRetrofitIds: false,
      conditionalUpdates: true,
    },
    awsWriteCount: options.write ? awsWriteCount + 1 : 0,
  };
  if (options.output) {
    const outputPath = path.resolve(options.output);
    await fsPromises.mkdir(path.dirname(outputPath), {
      recursive: true,
    });
    await fsPromises.writeFile(
      outputPath,
      `${JSON.stringify(report, null, 2)}\n`,
    );
  }
  if (options.write) await aws.uploadJson(reportKey, report);
  return { report };
}

function deduplicateEvidence(values) {
  return [
    ...new Map(
      values.map((value) => [
        evidenceKey(value),
        value,
      ]),
    ).values(),
  ].sort(
    (left, right) =>
      compareStrings(left.field, right.field) ||
      compareStrings(left.sourceId, right.sourceId) ||
      compareStrings(left.sourceValue, right.sourceValue),
  );
}

function evidenceKey(value) {
  return [
    value?.field,
    value?.sourceId,
    value?.sourceUrl,
    value?.sourceValue,
    value?.verificationDate,
  ].join("|");
}

function token(value) {
  return crypto
    .createHash("sha256")
    .update(String(value || ""))
    .digest("hex")
    .slice(0, 12);
}

function compareStrings(left, right) {
  return String(left).localeCompare(String(right));
}

function parseArgs(argv) {
  const options = {
    approval: "",
    output: "",
    profile: "",
    write: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--write") {
      options.write = true;
    } else if (arg === "--approval") {
      options.approval = requiredArg(argv, ++index, arg);
    } else if (arg === "--output") {
      options.output = requiredArg(argv, ++index, arg);
    } else if (arg === "--profile") {
      options.profile = requiredArg(argv, ++index, arg);
    } else if (arg === "--help" || arg === "-h") {
      options.help = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return options;
}

function requiredArg(argv, index, flag) {
  const value = argv[index];
  if (!value || value.startsWith("--")) {
    throw new Error(`${flag} requires a value.`);
  }
  return value;
}

function printHelp() {
  console.log(`Repair the five verified duplicate evidence arrays.

Usage:
  node scripts/repair-contractor-evidence-deduplication.mjs
  node scripts/repair-contractor-evidence-deduplication.mjs --write \\
    --profile retrofi-prod \\
    --approval ${RUN_ID} \\
    --output <report-path>`);
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    printHelp();
    return;
  }
  const result = await repairContractorEvidenceDeduplication(
    options,
  );
  console.log(JSON.stringify(result.report, null, 2));
}

const isEntrypoint =
  process.argv[1] &&
  import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;
if (isEntrypoint) {
  main().catch((error) => {
    console.error(error?.stack || error?.message || error);
    process.exitCode = 1;
  });
}
