import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "..");
const dataDir = path.join(repoRoot, "data");
const reviewPath =
  process.env.AVAILABILITY_REVIEW_OUTPUT_PATH || path.join(dataDir, "public_opportunity_availability_reviews.json");
const reportPath =
  process.env.AVAILABILITY_REVIEW_REPORT_PATH || path.join(dataDir, "public_opportunity_availability_review_report.md");
const repairsPath = process.argv[2] || process.env.AVAILABILITY_RESEARCH_REPAIRS_PATH || "-";
const validStatuses = new Set(["active", "rolling", "upcoming", "unavailable", "uncertain"]);
const generatedAt = new Date().toISOString();

const artifact = readJson(reviewPath);
const repairsArtifact = readRepairs(repairsPath);
const repairs = Array.isArray(repairsArtifact.repairs) ? repairsArtifact.repairs : [];
const byOpportunityId = new Map((artifact.reviews || []).map((row) => [row.opportunityId, row]));
const applied = [];
const skipped = [];

for (const repair of repairs) {
  const opportunityId = repair?.opportunityId;
  const row = byOpportunityId.get(opportunityId);
  const normalizedStatus = String(repair?.normalizedStatus || "").trim();

  if (!opportunityId || !row) {
    skipped.push({ opportunityId: opportunityId || null, reason: "unknown_opportunity_id" });
    continue;
  }

  if (!validStatuses.has(normalizedStatus)) {
    skipped.push({ opportunityId, reason: "invalid_status", normalizedStatus });
    continue;
  }

  const previousStatus = row.availabilityReview?.normalizedStatus || null;
  const sourceUrlsChecked = normalizeUrls(repair.sourceUrlsChecked);
  row.availabilityReview = {
    ...row.availabilityReview,
    normalizedStatus,
    evidenceText: String(repair.evidenceText || "").trim(),
    reasons: normalizeReasons(repair.reasons, normalizedStatus),
    sourceUrlsChecked,
    fetchErrors: [],
    reviewedAt: generatedAt,
    reviewMethod: "gpt_pro_official_source_research",
    confidence: normalizeConfidence(repair.confidence, normalizedStatus),
    researchNotes: String(repair.notes || "").trim()
  };

  applied.push({
    opportunityId,
    opportunityName: row.opportunityName,
    normalizedStatus,
    previousStatus
  });
}

artifact.generatedAt = generatedAt;
artifact.gptProResearchAppliedAt = generatedAt;
artifact.gptProResearchAppliedCount = applied.length;
artifact.gptProResearchSkipped = skipped;
artifact.statusCounts = countBy(artifact.reviews || [], (row) => row.availabilityReview.normalizedStatus);

writeJson(reviewPath, artifact);
fs.writeFileSync(reportPath, buildReport(artifact, applied, skipped), "utf8");

console.log("Applied availability research repairs.");
console.log(`Repairs supplied: ${repairs.length}`);
console.log(`Applied: ${applied.length}`);
console.log(`Skipped: ${skipped.length}`);
console.log(JSON.stringify(artifact.statusCounts, null, 2));
console.log(`Report: ${reportPath}`);
if (skipped.length > 0) console.log(JSON.stringify({ skipped }, null, 2));

function buildReport(artifact, applied, skipped) {
  const remainingUncertain = (artifact.reviews || []).filter(
    (row) => row.availabilityReview.normalizedStatus === "uncertain"
  );
  return [
    "# Availability Review",
    "",
    `Generated: ${artifact.generatedAt}`,
    `Opportunities reviewed: ${artifact.opportunityCount}`,
    `GPT Pro research applied count: ${artifact.gptProResearchAppliedCount || 0}`,
    `GPT Pro research skipped count: ${skipped.length}`,
    "",
    "## Status Counts",
    "",
    "```json",
    JSON.stringify(artifact.statusCounts, null, 2),
    "```",
    "",
    "## GPT Pro Research Applied",
    "",
    ...(applied.length
      ? applied.slice(0, 160).flatMap((row) => [
          `- ${row.normalizedStatus}: ${row.opportunityName} (${row.opportunityId})`,
          `  - previous status: ${row.previousStatus || "unknown"}`
        ])
      : ["No GPT Pro repairs were applied in this run."]),
    "",
    "## Remaining Uncertain Sample",
    "",
    ...remainingUncertain.slice(0, 120).flatMap((row) => [
      `- ${row.opportunityName} (${row.opportunityId})`,
      `  - state: ${row.state || "unknown"}`,
      `  - source: ${row.sourceName || "unknown"}`,
      `  - checked: ${row.availabilityReview.sourceUrlsChecked.join(", ") || "none"}`,
      `  - evidence: ${row.availabilityReview.evidenceText || "none"}`
    ])
  ].join("\n") + "\n";
}

function readRepairs(filePath) {
  if (filePath === "-") return JSON.parse(fs.readFileSync(0, "utf8"));
  return readJson(path.resolve(filePath));
}

function normalizeUrls(values) {
  return [...new Set((Array.isArray(values) ? values : []).map(normalizeUrl).filter(Boolean))];
}

function normalizeUrl(value) {
  const raw = String(value || "").trim();
  const markdownMatch = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(raw);
  const url = markdownMatch ? markdownMatch[2] : raw;
  return /^https?:\/\//i.test(url) ? url : null;
}

function normalizeReasons(values, normalizedStatus) {
  const reasons = (Array.isArray(values) ? values : []).map((value) => String(value || "").trim()).filter(Boolean);
  if (reasons.length > 0) return [...new Set(reasons)];
  if (normalizedStatus === "uncertain") return ["still_uncertain"];
  if (normalizedStatus === "unavailable") return ["official_source_closed"];
  if (normalizedStatus === "upcoming") return ["future_opening_language"];
  if (normalizedStatus === "rolling") return ["rolling_or_no_deadline_language"];
  return ["official_source_active"];
}

function normalizeConfidence(value, normalizedStatus) {
  const numeric = Number(value);
  if (Number.isFinite(numeric)) return Math.max(0, Math.min(1, numeric));
  if (normalizedStatus === "uncertain") return 0.35;
  if (normalizedStatus === "rolling") return 0.88;
  if (normalizedStatus === "active") return 0.82;
  if (normalizedStatus === "upcoming") return 0.78;
  if (normalizedStatus === "unavailable") return 0.86;
  return 0.42;
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
