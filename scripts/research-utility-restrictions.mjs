import fs from "node:fs";
import path from "node:path";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { fromIni } from "@aws-sdk/credential-providers";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { buildExtractionCorpus } from "../server/matching/buildOpportunityMatchProfile.mjs";
import { inferUtilityRequirements } from "../server/matching/utilityRestrictions.mjs";

const repoRoot = path.resolve(import.meta.dirname, "..");
const dataDir = path.join(repoRoot, "data");
const sourcePath = process.env.OPPORTUNITY_SOURCE_PATH || "";
const outputPath = process.env.UTILITY_REVIEW_OUTPUT_PATH || path.join(dataDir, "utility_restriction_reviews.json");
const reportPath = process.env.UTILITY_REVIEW_REPORT_PATH || path.join(dataDir, "utility_restriction_review_report.md");
const tableName = process.env.GBS_OPPORTUNITIES_TABLE || "gbs-opportunity-candidates";
const region = process.env.GBS_AWS_REGION || process.env.AWS_REGION || "us-east-2";
const profile = process.env.AWS_PROFILE || "gbs";
const fetchSources = process.env.UTILITY_REVIEW_FETCH !== "0";
const fetchTimeoutMs = Number(process.env.UTILITY_REVIEW_FETCH_TIMEOUT_MS || 12000);
const concurrency = Math.max(1, Number(process.env.UTILITY_REVIEW_CONCURRENCY || 8));
const writeDynamoDb = process.argv.includes("--write-dynamodb");
const generatedAt = new Date().toISOString();

if (process.argv.includes("--help") || process.argv.includes("-h")) {
  printHelp();
  process.exit(0);
}

const opportunities = sourcePath ? readOpportunitySource(sourcePath) : await scanOpportunitiesFromAws();
const db = writeDynamoDb ? createDbClient() : null;
const reviews = await mapWithConcurrency(opportunities, concurrency, reviewOpportunity);
const statusCounts = countBy(reviews, (review) => review.utilityRestrictionReview.restrictionStatus);
const output = {
  schemaVersion: "utility-restriction-review-v1",
  generatedAt,
  opportunityCount: opportunities.length,
  fetchSources,
  fetchTimeoutMs,
  statusCounts,
  reviews
};

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
fs.writeFileSync(reportPath, buildReport(output), "utf8");

console.log("Utility restriction review complete.");
console.log(`Opportunities reviewed: ${opportunities.length}`);
console.log(`Fetch source pages: ${fetchSources ? "yes" : "no"}`);
console.log(`Wrote: ${outputPath}`);
console.log(`Report: ${reportPath}`);
if (writeDynamoDb) console.log(`DynamoDB updates written to ${tableName}.`);
console.log(JSON.stringify(statusCounts, null, 2));

async function reviewOpportunity(opportunity) {
  const corpusText = buildExtractionCorpus(opportunity).map((segment) => segment.text).join("\n");
  const urls = sourceUrlsFor(opportunity);
  const fetched = fetchSources ? await mapWithConcurrency(urls, 2, fetchSourceText) : [];
  const fetchedText = fetched.filter((result) => result.ok).map((result) => result.text).join("\n");
  const utilityRestrictionReview = inferUtilityRequirements(opportunity, [corpusText, fetchedText].filter(Boolean).join("\n"), {
    fetchErrors: fetched.filter((result) => !result.ok).map(({ error, url }) => ({ error, url })),
    reviewedAt: generatedAt,
    reviewMethod: fetchSources ? "source_url_fetch_and_deterministic_corpus" : "deterministic_source_corpus",
    sourceUrlsChecked: fetched.map((result) => result.url)
  });
  const row = {
    opportunityId: opportunity.opportunityId,
    opportunityName: opportunity.canonicalTitle || opportunity.normalizedTitle || opportunity.opportunityId,
    sourceName: opportunity.sourceName || opportunity.sourceKey || null,
    state: opportunity.state || null,
    sourceUrl: opportunity.sourceUrl || null,
    utilityRestrictionReview
  };

  if (db) {
    await db.send(
      new UpdateCommand({
        TableName: tableName,
        Key: { opportunityId: opportunity.opportunityId },
        UpdateExpression: "SET utilityRestrictionReview = :review, updatedAt = :updatedAt",
        ExpressionAttributeValues: {
          ":review": utilityRestrictionReview,
          ":updatedAt": generatedAt
        }
      })
    );
  }

  return row;
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

function sourceUrlsFor(opportunity) {
  return uniqueStrings([
    opportunity.sourceUrl,
    opportunity.websiteUrl,
    opportunity.applicationUrl,
    ...asArray(opportunity.evidence).map((evidence) => evidence?.sourceUrl)
  ]).filter((url) => /^https?:\/\//i.test(url));
}

async function fetchSourceText(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), fetchTimeoutMs);
  try {
    const response = await fetch(url, {
      headers: {
        "user-agent": "RetroFi utility restriction review/1.0"
      },
      signal: controller.signal
    });
    if (!response.ok) return { ok: false, url, error: `HTTP ${response.status}` };
    const contentType = response.headers.get("content-type") || "";
    const body = await response.text();
    return {
      ok: true,
      url,
      contentType,
      text: stripHtml(body).slice(0, 250000)
    };
  } catch (error) {
    return {
      ok: false,
      url,
      error: error instanceof Error ? error.message : "fetch failed"
    };
  } finally {
    clearTimeout(timeout);
  }
}

function stripHtml(value) {
  return String(value || "")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function buildReport(output) {
  const lines = [
    "# Utility Restriction Review",
    "",
    `Generated: ${output.generatedAt}`,
    `Opportunities reviewed: ${output.opportunityCount}`,
    `Source-page fetch enabled: ${output.fetchSources ? "yes" : "no"}`,
    "",
    "## Status Counts",
    "",
    "```json",
    JSON.stringify(output.statusCounts, null, 2),
    "```",
    "",
    "## Status Meanings",
    "",
    "- `required`: a utility/customer/service-territory requirement was found.",
    "- `none`: source text explicitly says no utility restriction or any utility is accepted.",
    "- `not_applicable`: the opportunity type is not utility-gated, such as a federal/state tax credit, loan, or broad grant.",
    "- `none_found_after_review`: source corpus and fetched pages were checked and no utility restriction language was found.",
    "- `unknown`: utility language was ambiguous or the source looked utility-administered but no normalized utility could be confirmed.",
    "",
    "## Sample Rows",
    ""
  ];

  for (const review of output.reviews.slice(0, 50)) {
    const utility = review.utilityRestrictionReview;
    lines.push(
      `- ${utility.restrictionStatus}: ${review.opportunityName} (${review.opportunityId})`,
      `  - required: ${[...utility.requiredUtilityIds, ...utility.requiredUtilityNames].join(", ") || "none"}`,
      `  - evidence: ${utility.evidenceText || "none"}`
    );
  }

  return `${lines.join("\n")}\n`;
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

function uniqueStrings(values) {
  return [...new Set(values.filter(Boolean).map(String))];
}

function asArray(value) {
  return Array.isArray(value) ? value : value == null ? [] : [value];
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function printHelp() {
  console.log(`Usage: npm run matching:utility-reviews [-- --write-dynamodb]

Research electric-utility eligibility restrictions for opportunities.

Environment:
  OPPORTUNITY_SOURCE_PATH              Read opportunities from local JSON instead of DynamoDB.
  UTILITY_REVIEW_OUTPUT_PATH           Output JSON path. Default: data/utility_restriction_reviews.json.
  UTILITY_REVIEW_REPORT_PATH           Output markdown path. Default: data/utility_restriction_review_report.md.
  UTILITY_REVIEW_FETCH=0               Skip source-page fetches.
  UTILITY_REVIEW_CONCURRENCY=8         Opportunity review concurrency.
  UTILITY_REVIEW_FETCH_TIMEOUT_MS=12000 Source fetch timeout in milliseconds.

Options:
  --write-dynamodb                     Store utilityRestrictionReview on each DynamoDB opportunity.
`);
}
