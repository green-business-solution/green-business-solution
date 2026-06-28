import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

const repoRoot = path.resolve(import.meta.dirname, "..");
const dataDir = path.join(repoRoot, "data");
const sourcePath = process.env.OPPORTUNITY_SOURCE_PATH || path.join(repoRoot, "public", "retrofit_opportunity_index.json");
const reviewPath = process.env.AVAILABILITY_REVIEW_OUTPUT_PATH || path.join(dataDir, "public_opportunity_availability_reviews.json");
const reportPath =
  process.env.AVAILABILITY_REVIEW_REPORT_PATH || path.join(dataDir, "public_opportunity_availability_review_report.md");
const subsetLimit = Math.max(0, Number(process.env.AVAILABILITY_REVIEW_UNCERTAIN_LIMIT || 0));
const generatedAt = new Date().toISOString();
const uncertainRepairSearchFallback = process.env.AVAILABILITY_REVIEW_SEARCH_FALLBACK === "1";
const uncertainRepairFetchAttempts = process.env.AVAILABILITY_REVIEW_FETCH_ATTEMPTS || "1";
const uncertainRepairFetchTimeoutMs = process.env.AVAILABILITY_REVIEW_FETCH_TIMEOUT_MS || "10000";
const uncertainRepairConcurrency = process.env.AVAILABILITY_REVIEW_CONCURRENCY || "12";

const sourceRows = flattenOpportunitySource(readJson(sourcePath));
const existingArtifact = readJson(reviewPath);
const existingReviews = existingArtifact.reviews || [];
const uncertainIds = new Set(
  existingReviews
    .filter((row) => row?.availabilityReview?.normalizedStatus === "uncertain")
    .map((row) => row.opportunityId)
);
const targets = sourceRows.filter((row) => uncertainIds.has(row.opportunityId));
const limitedTargets = subsetLimit > 0 ? targets.slice(0, subsetLimit) : targets;

if (limitedTargets.length === 0) {
  console.log("No uncertain availability rows found.");
  process.exit(0);
}

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "retrofi-availability-"));
const subsetPath = path.join(tmpDir, "uncertain-opportunities.json");
const subsetOutputPath = path.join(tmpDir, "uncertain-reviews.json");
const subsetReportPath = path.join(tmpDir, "uncertain-report.md");

writeJson(subsetPath, limitedTargets);

const result = spawnSync(process.execPath, [path.join(repoRoot, "scripts", "research-availability.mjs")], {
  cwd: repoRoot,
  stdio: "inherit",
  env: {
    ...process.env,
    OPPORTUNITY_SOURCE_PATH: subsetPath,
    AVAILABILITY_REVIEW_OUTPUT_PATH: subsetOutputPath,
    AVAILABILITY_REVIEW_REPORT_PATH: subsetReportPath,
    AVAILABILITY_REVIEW_NO_FORCE_EXIT: "0",
    AVAILABILITY_REVIEW_SEARCH_FALLBACK: uncertainRepairSearchFallback ? "1" : "0",
    AVAILABILITY_REVIEW_SEARCH_FALLBACK_LIMIT: process.env.AVAILABILITY_REVIEW_SEARCH_FALLBACK_LIMIT || "4",
    AVAILABILITY_REVIEW_SEARCH_PROVIDERS: process.env.AVAILABILITY_REVIEW_SEARCH_PROVIDERS || "duckduckgo,bing",
    AVAILABILITY_REVIEW_SEARCH_TIMEOUT_MS: process.env.AVAILABILITY_REVIEW_SEARCH_TIMEOUT_MS || "5000",
    AVAILABILITY_REVIEW_FETCH_ATTEMPTS: uncertainRepairFetchAttempts,
    AVAILABILITY_REVIEW_FETCH_TIMEOUT_MS: uncertainRepairFetchTimeoutMs,
    AVAILABILITY_REVIEW_CONCURRENCY: uncertainRepairConcurrency
  }
});

if (result.status !== 0) {
  console.error(`Uncertain availability review failed with exit code ${result.status}.`);
  process.exit(result.status || 1);
}

const subsetArtifact = readJson(subsetOutputPath);
const updatedReviewsById = new Map((subsetArtifact.reviews || []).map((row) => [row.opportunityId, row]));
const mergedReviews = existingReviews.map((row) => updatedReviewsById.get(row.opportunityId) || row);
const output = {
  ...existingArtifact,
  generatedAt,
  uncertainRepairGeneratedAt: generatedAt,
  uncertainRepairTargetCount: limitedTargets.length,
  uncertainRepairTotalUncertainBefore: uncertainIds.size,
  uncertainRepairSearchFallback,
  uncertainRepairFetchAttempts: Number(uncertainRepairFetchAttempts),
  uncertainRepairFetchTimeoutMs: Number(uncertainRepairFetchTimeoutMs),
  uncertainRepairConcurrency: Number(uncertainRepairConcurrency),
  statusCounts: countBy(mergedReviews, (row) => row.availabilityReview.normalizedStatus),
  reviews: mergedReviews
};

writeJson(reviewPath, output);
fs.writeFileSync(reportPath, buildMergedReport(output, subsetArtifact), "utf8");

console.log("Uncertain availability repair complete.");
console.log(`Existing uncertain rows: ${uncertainIds.size}`);
console.log(`Rows re-reviewed: ${limitedTargets.length}`);
console.log(`Wrote: ${reviewPath}`);
console.log(`Report: ${reportPath}`);
console.log(JSON.stringify(output.statusCounts, null, 2));

function flattenOpportunitySource(source) {
  if (Array.isArray(source)) return source.filter((item) => item?.opportunityId);
  if (Array.isArray(source.retrofits)) return flattenPublicRetrofitIndex(source);
  return (source.Items || []).filter((item) => item?.opportunityId);
}

function flattenPublicRetrofitIndex(source) {
  const opportunitiesById = new Map();

  for (const retrofit of source.retrofits || []) {
    for (const opportunity of retrofit.opportunities || []) {
      if (!opportunity?.opportunityId || opportunitiesById.has(opportunity.opportunityId)) continue;
      opportunitiesById.set(opportunity.opportunityId, {
        opportunityId: opportunity.opportunityId,
        canonicalTitle: opportunity.opportunityName,
        normalizedTitle: opportunity.opportunityName,
        sourceName: opportunity.sourceName,
        sourceKey: opportunity.sourceName,
        sourceUrl: opportunity.sourceUrl,
        websiteUrl: opportunity.websiteUrl,
        applicationUrl: opportunity.applicationUrl,
        state: opportunity.state,
        programType: opportunity.programType,
        administrator: opportunity.administrator
      });
    }
  }

  return [...opportunitiesById.values()];
}

function buildMergedReport(output, subsetArtifact) {
  const changedRows = (subsetArtifact.reviews || []).filter((row) => row.availabilityReview.normalizedStatus !== "uncertain");
  const stillUncertain = output.reviews.filter((row) => row.availabilityReview.normalizedStatus === "uncertain");
  return [
    "# Availability Review",
    "",
    `Generated: ${output.generatedAt}`,
    `Opportunities reviewed: ${output.opportunityCount}`,
    `Uncertain rows re-reviewed: ${output.uncertainRepairTargetCount}`,
    `Uncertain repair search fallback enabled: ${output.uncertainRepairSearchFallback ? "yes" : "no"}`,
    `Uncertain repair fetch attempts: ${output.uncertainRepairFetchAttempts}`,
    `Uncertain repair fetch timeout: ${output.uncertainRepairFetchTimeoutMs} ms`,
    `Uncertain repair concurrency: ${output.uncertainRepairConcurrency}`,
    "",
    "## Status Counts",
    "",
    "```json",
    JSON.stringify(output.statusCounts, null, 2),
    "```",
    "",
    "## Newly Classified From Uncertain",
    "",
    ...(
      changedRows.length
        ? changedRows.slice(0, 120).flatMap((row) => [
            `- ${row.availabilityReview.normalizedStatus}: ${row.opportunityName} (${row.opportunityId})`,
            `  - reasons: ${row.availabilityReview.reasons.join(", ") || "none"}`,
            `  - evidence: ${row.availabilityReview.evidenceText || "none"}`,
            `  - sources: ${row.availabilityReview.sourceUrlsChecked.join(", ") || "none"}`
          ])
        : ["No uncertain rows were newly classified."]
    ),
    "",
    "## Remaining Uncertain Sample",
    "",
    ...stillUncertain.slice(0, 120).flatMap((row) => [
      `- ${row.opportunityName} (${row.opportunityId})`,
      `  - state: ${row.state || "unknown"}`,
      `  - source: ${row.sourceName || "unknown"}`,
      `  - checked: ${row.availabilityReview.sourceUrlsChecked.join(", ") || "none"}`,
      `  - fetch errors: ${(row.availabilityReview.fetchErrors || []).map((error) => `${error.url}: ${error.error}`).join("; ") || "none"}`
    ])
  ].join("\n") + "\n";
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

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}
