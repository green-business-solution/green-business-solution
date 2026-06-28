import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "..");
const dataDir = path.join(repoRoot, "data");
const reviewPath = process.env.AVAILABILITY_REVIEW_OUTPUT_PATH || path.join(dataDir, "public_opportunity_availability_reviews.json");
const targetsPath =
  process.env.AVAILABILITY_RESEARCH_TARGETS_PATH || path.join(dataDir, "public_opportunity_uncertain_research_targets.json");
const promptPath =
  process.env.AVAILABILITY_RESEARCH_PROMPT_PATH || path.join(dataDir, "public_opportunity_uncertain_research_prompt.md");
const artifact = readJson(reviewPath);
const uncertainRows = (artifact.reviews || [])
  .filter((row) => row?.availabilityReview?.normalizedStatus === "uncertain")
  .map(toResearchTarget)
  .sort(compareTargets);

writeJson(targetsPath, {
  schemaVersion: "availability-research-targets-v1",
  generatedAt: new Date().toISOString(),
  sourceReviewPath: path.relative(repoRoot, reviewPath),
  targetCount: uncertainRows.length,
  targets: uncertainRows
});
fs.writeFileSync(promptPath, buildPrompt(uncertainRows), "utf8");

console.log("Availability research prompt written.");
console.log(`Targets: ${uncertainRows.length}`);
console.log(`Wrote: ${targetsPath}`);
console.log(`Prompt: ${promptPath}`);

function toResearchTarget(row) {
  const review = row.availabilityReview || {};
  return {
    opportunityId: row.opportunityId,
    opportunityName: row.opportunityName,
    state: row.state || null,
    sourceName: row.sourceName || null,
    sourceUrl: row.sourceUrl || null,
    websiteUrl: row.websiteUrl || null,
    checkedUrls: review.sourceUrlsChecked || [],
    fetchErrors: review.fetchErrors || [],
    currentEvidenceText: review.evidenceText || null,
    currentReasons: review.reasons || [],
    failureBucket: failureBucket(review)
  };
}

function failureBucket(review) {
  const checkedUrls = review.sourceUrlsChecked || [];
  const fetchErrors = review.fetchErrors || [];
  if (checkedUrls.length === 0) return "no_source_url";
  const okCount = Math.max(0, checkedUrls.length - fetchErrors.length);
  const errorText = fetchErrors.map((error) => error.error || "").join(" ");
  if (okCount > 0) return "fetched_but_no_supported_status";
  if (/HTTP 403/i.test(errorText)) return "source_blocked_403";
  if (/HTTP 404/i.test(errorText)) return "source_missing_404";
  if (fetchErrors.length > 0) return "network_or_timeout";
  return "unknown";
}

function buildPrompt(targets) {
  const grouped = countBy(targets, (target) => target.failureBucket);
  return [
    "# GPT Pro Research Prompt: RetroFi Opportunity Availability",
    "",
    "You are helping classify availability for RetroFi opportunity records that our deterministic crawler could not safely classify.",
    "",
    "Current date: June 28, 2026. Use current public web research and official/administrator sources whenever possible.",
    "",
    "## Goal",
    "",
    "For each target opportunity below, determine one normalized availability status:",
    "",
    "- `active`: currently accepting applications/participation, currently available, or an official page describes the program as available with no closed/upcoming language.",
    "- `rolling`: explicitly no deadline, first-come first-served, open until funds are exhausted, or an ongoing statutory incentive with no application window.",
    "- `upcoming`: not open now but official source says it will open/reopen in the future.",
    "- `unavailable`: closed, expired, cancelled, fully subscribed, no longer accepting applications, repealed, or official source page is gone and no replacement official page can be found.",
    "- `uncertain`: still cannot be classified after official-source research.",
    "",
    "## Strict Rules",
    "",
    "1. Prefer official administrator pages, state/federal/utility pages, program application portals, official PDFs, or official tax-authority pages.",
    "2. Do not classify as active from generic search snippets, unrelated city/state homepages, generic news pages, dictionaries, tourism pages, social media, or aggregator sites.",
    "3. A stale 404 source URL is not enough by itself to mark unavailable if a current official replacement page exists.",
    "4. If a program has a tax statute or standing utility tariff with no application cycle, use `rolling` only when the official source supports ongoing availability.",
    "5. If a closed page also says a future cycle is expected, use `upcoming` instead of `unavailable`.",
    "6. Capture a short evidence quote and the source URL for every non-uncertain decision.",
    "",
    "## Output Format",
    "",
    "Return JSON only:",
    "",
    "```json",
    JSON.stringify(
      {
        repairs: [
          {
            opportunityId: "SOURCE_DSIRE:dsire_program_id:658",
            normalizedStatus: "active|rolling|upcoming|unavailable|uncertain",
            confidence: 0.0,
            evidenceText: "Short quote or paraphrased official evidence.",
            sourceUrlsChecked: ["https://official-source.example/page"],
            reasons: ["official_source_active"],
            notes: "Short explanation, especially if status remains uncertain."
          }
        ]
      },
      null,
      2
    ),
    "```",
    "",
    "## Failure Buckets",
    "",
    "```json",
    JSON.stringify(grouped, null, 2),
    "```",
    "",
    "## Targets",
    "",
    ...targets.flatMap((target, index) => [
      `### ${index + 1}. ${target.opportunityName}`,
      "",
      "```json",
      JSON.stringify(target, null, 2),
      "```",
      ""
    ])
  ].join("\n");
}

function compareTargets(a, b) {
  return (
    a.failureBucket.localeCompare(b.failureBucket) ||
    String(a.state || "").localeCompare(String(b.state || "")) ||
    a.opportunityName.localeCompare(b.opportunityName)
  );
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
