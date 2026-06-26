import fs from "node:fs";
import path from "node:path";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { fromIni } from "@aws-sdk/credential-providers";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { buildExtractionCorpus } from "../server/matching/buildOpportunityMatchProfile.mjs";
import { inferFacilityRequirements } from "../server/matching/facilityEligibility.mjs";

const repoRoot = path.resolve(import.meta.dirname, "..");
const dataDir = path.join(repoRoot, "data");
const sourcePath = process.env.OPPORTUNITY_SOURCE_PATH || "";
const outputPath = process.env.FACILITY_REVIEW_OUTPUT_PATH || path.join(dataDir, "facility_eligibility_reviews.json");
const reportPath = process.env.FACILITY_REVIEW_REPORT_PATH || path.join(dataDir, "facility_eligibility_review_report.md");
const tableName = process.env.GBS_OPPORTUNITIES_TABLE || "gbs-opportunity-candidates";
const region = process.env.GBS_AWS_REGION || process.env.AWS_REGION || "us-east-2";
const profile = process.env.AWS_PROFILE || "gbs";
const fetchSources = process.env.FACILITY_REVIEW_FETCH !== "0";
const fetchTimeoutMs = Number(process.env.FACILITY_REVIEW_FETCH_TIMEOUT_MS || 12000);
const concurrency = Math.max(1, Number(process.env.FACILITY_REVIEW_CONCURRENCY || 8));
const writeDynamoDb = process.argv.includes("--write-dynamodb");
const generatedAt = new Date().toISOString();
const schemaVersion = "facility-eligibility-review-v1";

if (process.argv.includes("--help") || process.argv.includes("-h")) {
  printHelp();
  process.exit(0);
}

const opportunities = sourcePath ? readOpportunitySource(sourcePath) : await scanOpportunitiesFromAws();
const db = writeDynamoDb ? createDbClient() : null;
const reviews = await mapWithConcurrency(opportunities, concurrency, reviewOpportunity);
const statusCounts = countBy(reviews, (review) => review.facilityEligibilityReview.eligibilityStatus);
const output = {
  schemaVersion,
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

console.log("Facility eligibility review complete.");
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
  const facilityEligibilityReview = inferFacilityRequirements(opportunity, [corpusText, fetchedText].filter(Boolean).join("\n"), {
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
    facilityEligibilityReview
  };

  if (db) {
    await db.send(
      new UpdateCommand({
        TableName: tableName,
        Key: { opportunityId: opportunity.opportunityId },
        UpdateExpression:
          "SET facilityEligibilityReview = :review, facilityEligibilityReviewUpdatedAt = :updatedAt, facilityEligibilityReviewSchemaVersion = :schemaVersion",
        ExpressionAttributeValues: {
          ":review": facilityEligibilityReview,
          ":updatedAt": generatedAt,
          ":schemaVersion": schemaVersion
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
        "user-agent": "RetroFi facility eligibility review/1.0"
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
    "# Facility Eligibility Review",
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
    "- `required`: one or more specific eligible site/facility types were found.",
    "- `broad_nonresidential`: source indicates broad nonresidential eligibility.",
    "- `broad_commercial`: source indicates broad commercial facility/customer eligibility.",
    "- `broad_residential`: source indicates broad residential eligibility.",
    "- `none`: source explicitly says no site/facility type restriction.",
    "- `not_applicable`: opportunity type is not gated by site/facility type.",
    "- `none_found_after_review`: source corpus and fetched pages were checked and no facility restriction language was found.",
    "- `unknown`: source references facility/property type but no supported value could be normalized.",
    "",
    "## Sample Rows",
    ""
  ];

  for (const review of output.reviews.slice(0, 50)) {
    const facility = review.facilityEligibilityReview;
    lines.push(
      `- ${facility.eligibilityStatus}: ${review.opportunityName} (${review.opportunityId})`,
      `  - types: ${facility.eligibleBuildingTypes.join(", ") || "none"}`,
      `  - evidence: ${facility.evidenceText || "none"}`
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
  console.log(`Usage: npm run matching:facility-reviews [-- --write-dynamodb]

Research site/facility eligibility restrictions for opportunities.

Environment:
  OPPORTUNITY_SOURCE_PATH             Read opportunities from local JSON instead of DynamoDB.
  FACILITY_REVIEW_OUTPUT_PATH         Output JSON path. Default: data/facility_eligibility_reviews.json.
  FACILITY_REVIEW_REPORT_PATH         Output markdown path. Default: data/facility_eligibility_review_report.md.
  FACILITY_REVIEW_FETCH=0             Skip source-page fetches.
  FACILITY_REVIEW_CONCURRENCY=8       Opportunity review concurrency.
  FACILITY_REVIEW_FETCH_TIMEOUT_MS=12000 Source fetch timeout in milliseconds.

Options:
  --write-dynamodb                    Store facilityEligibilityReview on each DynamoDB opportunity.
`);
}
