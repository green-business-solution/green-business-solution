import fs from "node:fs";
import path from "node:path";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { fromIni } from "@aws-sdk/credential-providers";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { buildOpportunityMatchProfile } from "../server/matching/buildOpportunityMatchProfile.mjs";
import { isArchivedOpportunity, OPPORTUNITY_LIFECYCLE_STATUS } from "../server/matching/opportunityLifecycle.mjs";

const repoRoot = path.resolve(import.meta.dirname, "..");
const dataDir = path.join(repoRoot, "data");
const sourcePath = process.env.OPPORTUNITY_SOURCE_PATH || "";
const outputPath = process.env.OPPORTUNITY_ARCHIVE_OUTPUT_PATH || path.join(dataDir, "opportunity_archive_report.json");
const markdownPath = process.env.OPPORTUNITY_ARCHIVE_REPORT_PATH || path.join(dataDir, "opportunity_archive_report.md");
const tableName = process.env.GBS_OPPORTUNITIES_TABLE || "gbs-opportunity-candidates";
const region = process.env.GBS_AWS_REGION || process.env.AWS_REGION || "us-east-2";
const profile = process.env.AWS_PROFILE || "gbs";
const writeDynamoDb = process.argv.includes("--write-dynamodb");
const unarchiveRestored = process.argv.includes("--unarchive-restored");
const concurrency = Math.max(1, Number(process.env.OPPORTUNITY_ARCHIVE_CONCURRENCY || 6));
const now = new Date(process.env.MATCHING_NOW || Date.now());
const generatedAt = new Date().toISOString();
const updatedBy = "archive-unavailable-opportunities-v1";

if (process.argv.includes("--help") || process.argv.includes("-h")) {
  printHelp();
  process.exit(0);
}

const opportunities = sourcePath ? readOpportunitySource(sourcePath) : await scanOpportunitiesFromAws();
const db = writeDynamoDb ? createDbClient() : null;
const rows = opportunities.filter((opportunity) => opportunity?.opportunityId).map(reviewOpportunity);
const actionCounts = countBy(rows, (row) => row.action);

if (db) {
  await mapWithConcurrency(
    rows.filter((row) => row.action === "archive" || row.action === "unarchive"),
    concurrency,
    writeLifecycleRow
  );
}

const output = {
  schemaVersion: "opportunity-archive-report-v1",
  generatedAt,
  matcherClock: now.toISOString(),
  opportunityCount: opportunities.length,
  writeDynamoDb,
  unarchiveRestored,
  actionCounts,
  rows
};

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
fs.writeFileSync(markdownPath, buildMarkdownReport(output), "utf8");

console.log("Opportunity lifecycle archive review complete.");
console.log(`Opportunities reviewed: ${opportunities.length}`);
console.log(`DynamoDB writes: ${writeDynamoDb ? "yes" : "no"}`);
console.log(`Unarchive restored opportunities: ${unarchiveRestored ? "yes" : "no"}`);
console.log(`Wrote: ${outputPath}`);
console.log(`Report: ${markdownPath}`);
console.log(JSON.stringify(actionCounts, null, 2));

function reviewOpportunity(opportunity) {
  const matchProfile = buildOpportunityMatchProfile(opportunity, { now });
  const availability = matchProfile.availability;
  const isUnavailable = availability.normalizedStatus === "unavailable";
  const isArchived = isArchivedOpportunity(opportunity);
  const action =
    isUnavailable && !isArchived
      ? "archive"
      : isUnavailable && isArchived
        ? "already_archived"
        : !isUnavailable && isArchived && unarchiveRestored
          ? "unarchive"
          : !isUnavailable && isArchived
            ? "archived_but_not_reopened"
            : "keep_active";

  return {
    opportunityId: opportunity.opportunityId,
    opportunityName: opportunity.canonicalTitle || opportunity.normalizedTitle || opportunity.opportunityId,
    sourceName: opportunity.sourceName || opportunity.sourceKey || null,
    state: opportunity.state || null,
    currentLifecycleStatus: opportunity.lifecycleStatus || null,
    action,
    availability: {
      normalizedStatus: availability.normalizedStatus,
      reasons: availability.reasons || [],
      applicationDeadlineAt: availability.applicationDeadlineAt,
      programEndAt: availability.programEndAt,
      lastVerifiedAt: availability.lastVerifiedAt
    }
  };
}

async function writeLifecycleRow(row) {
  if (row.action === "archive") {
    await db.send(
      new UpdateCommand({
        TableName: tableName,
        Key: { opportunityId: row.opportunityId },
        UpdateExpression:
          "SET lifecycleStatus = :archived, archivedAt = if_not_exists(archivedAt, :now), archiveReason = :reason, archiveDetails = :details, lifecycleUpdatedAt = :now, lifecycleUpdatedBy = :updatedBy",
        ExpressionAttributeValues: {
          ":archived": OPPORTUNITY_LIFECYCLE_STATUS.ARCHIVED,
          ":now": generatedAt,
          ":reason": "availability_unavailable",
          ":details": row.availability,
          ":updatedBy": updatedBy
        }
      })
    );
    return;
  }

  if (row.action === "unarchive") {
    await db.send(
      new UpdateCommand({
        TableName: tableName,
        Key: { opportunityId: row.opportunityId },
        UpdateExpression:
          "SET lifecycleStatus = :active, unarchivedAt = :now, unarchiveReason = :reason, lifecycleUpdatedAt = :now, lifecycleUpdatedBy = :updatedBy REMOVE archivedAt, archiveReason, archiveDetails",
        ExpressionAttributeValues: {
          ":active": OPPORTUNITY_LIFECYCLE_STATUS.ACTIVE,
          ":now": generatedAt,
          ":reason": "availability_restored",
          ":updatedBy": updatedBy
        }
      })
    );
  }
}

function readOpportunitySource(filePath) {
  const source = readJson(filePath);
  if (Array.isArray(source)) return source.filter((item) => item?.opportunityId);
  return (source.Items || []).map((item) => (item.opportunityId ? item : unmarshall(item))).filter((item) => item?.opportunityId);
}

async function scanOpportunitiesFromAws() {
  const scanDb = createDbClient();
  const items = [];
  let ExclusiveStartKey;

  do {
    const result = await scanDb.send(new ScanCommand({ TableName: tableName, ExclusiveStartKey }));
    items.push(...(result.Items || []));
    ExclusiveStartKey = result.LastEvaluatedKey;
  } while (ExclusiveStartKey);

  return items.filter((item) => item?.opportunityId);
}

function createDbClient() {
  return DynamoDBDocumentClient.from(
    new DynamoDBClient({
      region,
      credentials: profile ? fromIni({ profile }) : undefined
    })
  );
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

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function buildMarkdownReport(output) {
  const lines = [
    "# Opportunity Archive Report",
    "",
    `Generated: ${output.generatedAt}`,
    `Matcher clock: ${output.matcherClock}`,
    `Opportunities reviewed: ${output.opportunityCount}`,
    `DynamoDB writes: ${output.writeDynamoDb ? "yes" : "no"}`,
    `Unarchive restored opportunities: ${output.unarchiveRestored ? "yes" : "no"}`,
    "",
    "## Action Counts",
    "",
    "```json",
    JSON.stringify(output.actionCounts, null, 2),
    "```",
    "",
    "## Archived Rows",
    ""
  ];

  const archivedRows = output.rows.filter((row) => row.action === "archive" || row.action === "already_archived");
  for (const row of archivedRows.slice(0, 100)) {
    lines.push(
      `- ${row.action}: ${row.opportunityName} (${row.opportunityId})`,
      `  - availability reasons: ${row.availability.reasons.join(", ") || "none"}`
    );
  }

  if (archivedRows.length > 100) {
    lines.push("", `...${archivedRows.length - 100} additional archived rows omitted from this summary.`);
  }

  return `${lines.join("\n")}\n`;
}

function printHelp() {
  console.log(`Usage: npm run matching:archive-unavailable [-- --write-dynamodb] [-- --unarchive-restored]

Archive opportunities whose normalized matcher availability is unavailable.

Options:
  --write-dynamodb      Persist lifecycle updates to DynamoDB. Without this, the script is a dry run.
  --unarchive-restored  Also mark currently archived records active when normalized availability is no longer unavailable.

Environment:
  OPPORTUNITY_SOURCE_PATH              Read opportunities from local JSON instead of DynamoDB.
  OPPORTUNITY_ARCHIVE_OUTPUT_PATH      JSON output path. Default: data/opportunity_archive_report.json.
  OPPORTUNITY_ARCHIVE_REPORT_PATH      Markdown output path. Default: data/opportunity_archive_report.md.
  OPPORTUNITY_ARCHIVE_CONCURRENCY=6    DynamoDB update concurrency.
  MATCHING_NOW                         Override matcher clock for availability evaluation.
`);
}
