import fs from "node:fs";
import path from "node:path";
import { fetchSourceTextWithRetry } from "./reviewFetch.mjs";

const repoRoot = path.resolve(import.meta.dirname, "..");
const dataDir = path.join(repoRoot, "data");
const publicDir = path.join(repoRoot, "public");
const retrofitIndexPath = process.env.RETROFIT_INDEX_PATH || path.join(publicDir, "retrofit_opportunity_index.json");
const outputPath = process.env.SPECIAL_RETROFIT_EDGE_AUDIT_OUTPUT_PATH || path.join(dataDir, "special_retrofit_edge_audit.json");
const reportPath = process.env.SPECIAL_RETROFIT_EDGE_AUDIT_REPORT_PATH || path.join(dataDir, "special_retrofit_edge_audit.md");
const fetchSources = process.env.SPECIAL_RETROFIT_EDGE_AUDIT_FETCH !== "0";
const fetchTimeoutMs = Number(process.env.SPECIAL_RETROFIT_EDGE_FETCH_TIMEOUT_MS || 12000);
const fetchAttempts = Math.max(1, Number(process.env.SPECIAL_RETROFIT_EDGE_FETCH_ATTEMPTS || 2));
const fetchRetryDelayMs = Math.max(0, Number(process.env.SPECIAL_RETROFIT_EDGE_FETCH_RETRY_DELAY_MS || 5000));
const concurrency = Math.max(1, Number(process.env.SPECIAL_RETROFIT_EDGE_AUDIT_CONCURRENCY || 8));
const generatedAt = new Date().toISOString();

const SPECIAL_RETROFIT_IDS = new Set([
  "energy_audit",
  "leed_certification",
  "engineering_feasibility_study",
  "building_benchmarking_compliance"
]);

const retrofitIndex = readJson(retrofitIndexPath);
const opportunityGroups = groupOpportunitiesById(retrofitIndex);
const mixedRows = [...opportunityGroups.values()].filter((row) => row.specialRetrofits.length > 0 && row.normalRetrofits.length > 0);
const specialOnlyRows = [...opportunityGroups.values()].filter((row) => row.specialRetrofits.length > 0 && row.normalRetrofits.length === 0);
const reviewedMixedRows = await mapWithConcurrency(mixedRows, concurrency, reviewMixedRow);
const actionCounts = countBy(reviewedMixedRows, (row) => row.recommendedAction);
const output = {
  schemaVersion: "special-retrofit-edge-audit-v1",
  generatedAt,
  retrofitIndexPath,
  fetchSources,
  fetchTimeoutMs,
  fetchAttempts,
  fetchRetryDelayMs,
  opportunityCount: opportunityGroups.size,
  mixedSpecialNormalOpportunityCount: mixedRows.length,
  specialOnlyOpportunityCount: specialOnlyRows.length,
  actionCounts,
  rows: reviewedMixedRows
};

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
fs.writeFileSync(reportPath, buildReport(output), "utf8");

console.log("Special retrofit edge audit complete.");
console.log(`Mixed special/normal opportunities: ${mixedRows.length}`);
console.log(`Special-only opportunities: ${specialOnlyRows.length}`);
console.log(`Fetch source pages: ${fetchSources ? "yes" : "no"}`);
console.log(`Wrote: ${outputPath}`);
console.log(`Report: ${reportPath}`);
console.log(JSON.stringify(actionCounts, null, 2));
if (process.env.SPECIAL_RETROFIT_EDGE_AUDIT_NO_FORCE_EXIT !== "1") {
  process.exit(0);
}

async function reviewMixedRow(row) {
  const urls = sourceUrlsFor(row);
  const fetched = fetchSources ? await mapWithConcurrency(urls, 2, fetchSourceText) : [];
  const fetchedText = fetched.filter((result) => result.ok).map((result) => result.text).join("\n");
  const corpusText = [
    row.opportunityName,
    row.sourceName,
    row.programType,
    row.administrator,
    row.state,
    row.specialRetrofits.map((retrofit) => retrofit.displayName).join(" "),
    row.normalRetrofits.map((retrofit) => retrofit.displayName).join(" "),
    fetchedText
  ].filter(Boolean).join("\n");
  const review = classifySpecialEdge(row, corpusText);

  return {
    opportunityId: row.opportunityId,
    opportunityName: row.opportunityName,
    sourceName: row.sourceName,
    state: row.state,
    programType: row.programType,
    sourceUrl: row.sourceUrl,
    websiteUrl: row.websiteUrl,
    applicationUrl: row.applicationUrl,
    specialRetrofits: row.specialRetrofits,
    normalRetrofits: row.normalRetrofits,
    recommendedAction: review.recommendedAction,
    reasons: review.reasons,
    evidenceText: review.evidenceText,
    sourceUrlsChecked: fetched.map((result) => result.url),
    fetchErrors: fetched.filter((result) => !result.ok).map(({ error, url }) => ({ error, url }))
  };
}

function classifySpecialEdge(row, text) {
  const compactText = String(text || "").replace(/\s+/g, " ").trim();
  const reasons = [];
  const prerequisiteEvidence = findSnippet(
    compactText,
    /\b(?:energy audit|audit|feasibility study|engineering study|leed certification|leed-certified|benchmarking|benchmarking compliance)[^.]{0,140}\b(?:required|requirement|must|shall|need(?:ed)?|prerequisite|condition|prior to|before|must be completed|must be performed|submit(?:ted)?|provided)\b/i
  ) || findSnippet(
    compactText,
    /\b(?:required|requirement|must|shall|need(?:ed)?|prerequisite|condition|prior to|before|submit(?:ted)?|provided)[^.]{0,140}\b(?:energy audit|audit|feasibility study|engineering study|leed certification|leed-certified|benchmarking|benchmarking compliance)\b/i
  );

  if (prerequisiteEvidence) {
    reasons.push("explicit_special_prerequisite_language");
    return {
      recommendedAction: "remove_normal_edges",
      reasons,
      evidenceText: prerequisiteEvidence
    };
  }

  const normalTextMatches = row.normalRetrofits.filter((retrofit) => retrofit.matchBasis === "text_or_source_technology").length;
  const specialTextMatches = row.specialRetrofits.filter((retrofit) => retrofit.matchBasis === "text_or_source_technology").length;
  if (specialTextMatches > 0 && normalTextMatches === 0) {
    reasons.push("special_text_match_only_normal_edges_are_fallback");
    return {
      recommendedAction: "remove_normal_edges",
      reasons,
      evidenceText: findSnippet(compactText, /\b(?:energy audit|audit|leed|benchmarking|feasibility study|engineering study)\b/i)
    };
  }

  reasons.push("normal_retrofit_text_match_or_no_prerequisite_found");
  return {
    recommendedAction: "keep_normal_edges",
    reasons,
    evidenceText: findSnippet(compactText, /\b(?:rebate|grant|incentive|tax credit|loan|financing|audit|leed|benchmarking|feasibility)\b/i)
  };
}

function groupOpportunitiesById(index) {
  const groups = new Map();

  for (const retrofit of index.retrofits || []) {
    for (const opportunity of retrofit.opportunities || []) {
      if (!opportunity?.opportunityId) continue;
      const group = groups.get(opportunity.opportunityId) || {
        opportunityId: opportunity.opportunityId,
        opportunityName: opportunity.opportunityName,
        sourceName: opportunity.sourceName,
        sourceUrl: opportunity.sourceUrl,
        websiteUrl: opportunity.websiteUrl,
        applicationUrl: opportunity.applicationUrl,
        state: opportunity.state,
        programType: opportunity.programType,
        administrator: opportunity.administrator,
        specialRetrofits: [],
        normalRetrofits: []
      };
      const retrofitRow = {
        retrofitTypeId: retrofit.retrofitTypeId,
        displayName: retrofit.displayName,
        isPhysicalRetrofit: retrofit.isPhysicalRetrofit,
        matchBasis: opportunity.matchBasis,
        matchedTerms: opportunity.matchedTerms || []
      };
      if (SPECIAL_RETROFIT_IDS.has(retrofit.retrofitTypeId)) {
        group.specialRetrofits.push(retrofitRow);
      } else {
        group.normalRetrofits.push(retrofitRow);
      }
      groups.set(opportunity.opportunityId, group);
    }
  }

  return groups;
}

function sourceUrlsFor(row) {
  return uniqueStrings([row.sourceUrl, row.websiteUrl, row.applicationUrl]).filter((url) => /^https?:\/\//i.test(url));
}

async function fetchSourceText(url) {
  return fetchSourceTextWithRetry(url, {
    attempts: fetchAttempts,
    baseDelayMs: fetchRetryDelayMs,
    timeoutMs: fetchTimeoutMs,
    userAgent: "RetroFi special retrofit edge audit/1.0"
  });
}

function buildReport(output) {
  const lines = [
    "# Special Retrofit Edge Audit",
    "",
    `Generated: ${output.generatedAt}`,
    `Retrofit index: \`${output.retrofitIndexPath}\``,
    `Mixed special/normal opportunities: ${output.mixedSpecialNormalOpportunityCount}`,
    `Special-only opportunities: ${output.specialOnlyOpportunityCount}`,
    `Source-page fetch enabled: ${output.fetchSources ? "yes" : "no"}`,
    "",
    "## Recommended Action Counts",
    "",
    "```json",
    JSON.stringify(output.actionCounts, null, 2),
    "```",
    "",
    "## Action Meanings",
    "",
    "- `keep_normal_edges`: no explicit evidence was found that the special service is a prerequisite, and at least one normal retrofit has direct text evidence.",
    "- `manual_review_before_edge_removal`: the special service matched source text but normal retrofit edges were only broad fallback matches. A human or stronger source parser should review before suppressing normal retrofit edges.",
    "- `remove_normal_edges`: source text explicitly says the audit, certification, study, or benchmarking step is required/prerequisite/condition for the opportunity.",
    "",
    "## Rows",
    ""
  ];

  for (const row of output.rows) {
    lines.push(
      `### ${row.recommendedAction}: ${row.opportunityName}`,
      "",
      `- Opportunity ID: \`${row.opportunityId}\``,
      `- Source: ${row.sourceName || "unknown"}${row.state ? ` / ${row.state}` : ""}${row.programType ? ` / ${row.programType}` : ""}`,
      `- Special retrofits: ${row.specialRetrofits.map((retrofit) => retrofit.displayName).join(", ")}`,
      `- Normal retrofits: ${row.normalRetrofits.map((retrofit) => `${retrofit.displayName} (${retrofit.matchBasis})`).join(", ")}`,
      `- Reasons: ${row.reasons.join(", ")}`,
      `- Evidence: ${row.evidenceText || "none"}`,
      `- Sources checked: ${row.sourceUrlsChecked.join(", ") || "none"}`,
      row.fetchErrors.length > 0 ? `- Fetch errors: ${row.fetchErrors.map((error) => `${error.url}: ${error.error}`).join("; ")}` : ""
    );
    lines.push("");
  }

  return `${lines.filter((line) => line !== "").join("\n")}\n`;
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

function findSnippet(text, pattern) {
  const match = pattern.exec(text);
  if (!match) return null;
  const start = Math.max(0, match.index - 120);
  const end = Math.min(text.length, match.index + match[0].length + 180);
  return text.slice(start, end).replace(/\s+/g, " ").trim();
}

function uniqueStrings(values) {
  return [...new Set(values.filter(Boolean).map(String))];
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}
