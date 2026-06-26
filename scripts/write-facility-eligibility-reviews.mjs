import fs from "node:fs";
import path from "node:path";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { fromIni } from "@aws-sdk/credential-providers";

const repoRoot = path.resolve(import.meta.dirname, "..");
const dataDir = path.join(repoRoot, "data");
const reviewPath = process.env.FACILITY_REVIEW_OUTPUT_PATH || path.join(dataDir, "facility_eligibility_reviews.json");
const tableName = process.env.GBS_OPPORTUNITIES_TABLE || "gbs-opportunity-candidates";
const region = process.env.GBS_AWS_REGION || process.env.AWS_REGION || "us-east-2";
const profile = process.env.AWS_PROFILE || "gbs";
const concurrency = Math.max(1, Number(process.env.FACILITY_REVIEW_WRITE_CONCURRENCY || 4));
const maxAttempts = Math.max(1, Number(process.env.FACILITY_REVIEW_WRITE_ATTEMPTS || 8));

if (process.argv.includes("--help") || process.argv.includes("-h")) {
  printHelp();
  process.exit(0);
}

const artifact = JSON.parse(fs.readFileSync(reviewPath, "utf8"));
const reviews = Array.isArray(artifact) ? artifact : artifact.reviews || [];
const reviewedAt = artifact.generatedAt || new Date().toISOString();
const db = DynamoDBDocumentClient.from(
  new DynamoDBClient({
    region,
    credentials: profile ? fromIni({ profile }) : undefined
  })
);

const rows = reviews.filter((row) => row?.opportunityId && row?.facilityEligibilityReview);
const statusCounts = countBy(rows, (row) => row.facilityEligibilityReview.eligibilityStatus || "unknown");

await mapWithConcurrency(rows, concurrency, writeReviewRow);

console.log("Facility eligibility reviews written to DynamoDB.");
console.log(`Table: ${tableName}`);
console.log(`Rows written: ${rows.length}`);
console.log(`Review artifact: ${reviewPath}`);
console.log(`Review timestamp: ${reviewedAt}`);
console.log(JSON.stringify(statusCounts, null, 2));

async function writeReviewRow(row) {
  await retry(async () => {
    await db.send(
      new UpdateCommand({
        TableName: tableName,
        Key: { opportunityId: row.opportunityId },
        UpdateExpression:
          "SET facilityEligibilityReview = :review, facilityEligibilityReviewUpdatedAt = :updatedAt, facilityEligibilityReviewSchemaVersion = :schemaVersion",
        ExpressionAttributeValues: {
          ":review": row.facilityEligibilityReview,
          ":updatedAt": reviewedAt,
          ":schemaVersion": artifact.schemaVersion || "facility-eligibility-review-v1"
        }
      })
    );
  });
}

async function retry(callback) {
  let lastError;
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      return await callback();
    } catch (error) {
      lastError = error;
      if (!isRetryable(error) || attempt === maxAttempts) break;
      await delay(Math.min(15000, 250 * 2 ** (attempt - 1)) + Math.floor(Math.random() * 250));
    }
  }
  throw lastError;
}

function isRetryable(error) {
  const name = error?.name || error?.__type || "";
  return /Throttling|ProvisionedThroughputExceeded|RequestLimitExceeded|Timeout|Networking/i.test(name);
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function mapWithConcurrency(values, limit, callback) {
  const results = new Array(values.length);
  let nextIndex = 0;
  const workers = Array.from({ length: Math.min(limit, values.length) }, async () => {
    while (nextIndex < values.length) {
      const currentIndex = nextIndex;
      nextIndex += 1;
      results[currentIndex] = await callback(values[currentIndex], currentIndex);
    }
  });
  await Promise.all(workers);
  return results;
}

function countBy(values, keyFn) {
  const counts = {};
  for (const value of values) {
    const key = keyFn(value);
    counts[key] = (counts[key] || 0) + 1;
  }
  return counts;
}

function printHelp() {
  console.log(`Usage: npm run matching:facility-reviews:write

Write an existing facility eligibility review artifact to DynamoDB.

Environment:
  FACILITY_REVIEW_OUTPUT_PATH       Review JSON path. Default: data/facility_eligibility_reviews.json.
  FACILITY_REVIEW_WRITE_CONCURRENCY DynamoDB update concurrency. Default: 4.
  FACILITY_REVIEW_WRITE_ATTEMPTS    Retry attempts per row. Default: 8.
  GBS_OPPORTUNITIES_TABLE           DynamoDB table. Default: gbs-opportunity-candidates.
`);
}
