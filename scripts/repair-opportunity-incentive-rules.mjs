import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { stripHtml } from "./reviewFetch.mjs";

const repoRoot = path.resolve(import.meta.dirname, "..");
const dataDir = path.join(repoRoot, "data");
const publicDir = path.join(repoRoot, "public");
const mappingPath = process.env.OPPORTUNITY_SAVINGS_MAPPING_PATH || path.join(dataDir, "opportunity_savings_mapping.json");
const publicIndexPath = process.env.RETROFIT_INDEX_PATH || path.join(publicDir, "retrofit_opportunity_index.json");
const availabilityReviewsPath =
  process.env.AVAILABILITY_REVIEWS_PATH || path.join(dataDir, "public_opportunity_availability_reviews.json");
const outputPath = process.env.OPPORTUNITY_INCENTIVE_RULES_OUTPUT_PATH || path.join(dataDir, "opportunity_incentive_rules.json");
const reportPath =
  process.env.OPPORTUNITY_INCENTIVE_RULES_REPORT_PATH || path.join(dataDir, "opportunity_incentive_rule_repair_report.md");
const fetchTimeoutMs = Number(process.env.INCENTIVE_REPAIR_FETCH_TIMEOUT_MS || 12000);
const directConcurrency = Math.max(1, Number(process.env.INCENTIVE_REPAIR_CONCURRENCY || 10));
const sourceLimit = Math.max(1, Number(process.env.INCENTIVE_REPAIR_SOURCE_LIMIT || 3));
const searchFallback = process.env.INCENTIVE_REPAIR_SEARCH_FALLBACK !== "0";
const searchLimit = Math.max(1, Number(process.env.INCENTIVE_REPAIR_SEARCH_LIMIT || 2));
const progressEvery = Math.max(0, Number(process.env.INCENTIVE_REPAIR_PROGRESS_EVERY || 25));
const searchProviderNames = uniqueStrings(
  String(process.env.INCENTIVE_REPAIR_SEARCH_PROVIDERS || "bing,duckduckgo")
    .split(",")
    .map((value) => value.trim().toLowerCase())
).filter((provider) => ["bing", "duckduckgo"].includes(provider));
const generatedAt = new Date().toISOString();
const limitArg = argValue("--limit");
const targetLimit = limitArg ? Math.max(1, Number(limitArg)) : null;
const fetchSources = !process.argv.includes("--no-fetch");
const onlyManualFromPath = argValue("--only-manual-from");
const mergeExistingPath = argValue("--merge-existing");

if (process.argv.includes("--help") || process.argv.includes("-h")) {
  printHelp();
  process.exit(0);
}

const mappings = readJson(mappingPath);
const publicIndex = readJson(publicIndexPath);
const availabilityReviews = readJson(availabilityReviewsPath);
const publicOpportunitiesById = buildPublicOpportunityMap(publicIndex);
const availabilityRowsById = new Map(
  (availabilityReviews.reviews || []).map((row) => [
    row.opportunityId,
    {
      opportunityId: row.opportunityId,
      opportunityName: row.opportunityName,
      sourceName: row.sourceName,
      sourceUrl: row.sourceUrl,
      websiteUrl: row.websiteUrl,
      state: row.state,
      availabilityStatus: row.availabilityReview?.normalizedStatus
    }
  ])
);

const onlyManualIds = onlyManualFromPath ? manualTargetIdsFrom(onlyManualFromPath) : null;
const targets = mappings
  .filter((mapping) => (mapping.value_roles || []).includes("upfront_cost_reduction"))
  .map((mapping) => buildTarget(mapping))
  .filter((target) => ["active", "rolling"].includes(target.availabilityStatus))
  .filter((target) => !onlyManualIds || onlyManualIds.has(target.opportunityId))
  .slice(0, targetLimit || undefined);

const repairedRows = fetchSources
  ? await mapWithConcurrency(targets, directConcurrency, repairTarget, { progress: true })
  : targets.map((target) => buildNoFetchGap(target));

const newRules = repairedRows.filter((row) => row.rule).map((row) => row.rule);
const previousOutput = mergeExistingPath ? readJson(path.resolve(repoRoot, mergeExistingPath)) : null;
const previousResearchReviewedNoRule = previousOutput?.researchReviewedNoRule || [];
const previousResearchReviewedNoRuleIds = new Set(previousResearchReviewedNoRule.map((row) => row.opportunityId).filter(Boolean));
const newGaps = repairedRows
  .filter((row) => !row.rule)
  .map((row) => row.gap)
  .filter((gap) => !previousResearchReviewedNoRuleIds.has(gap.opportunityId));
const newRuleIds = new Set(newRules.map((rule) => rule.opportunityId));
const newGapIds = new Set(newGaps.map((gap) => gap.opportunityId));
const rules = previousOutput
  ? [...(previousOutput.rules || []).filter((rule) => !newRuleIds.has(rule.opportunityId)), ...newRules]
  : newRules;
const gaps = previousOutput
  ? [
      ...(previousOutput.manualRepairTargets || []).filter(
        (gap) => !newRuleIds.has(gap.opportunityId) && !newGapIds.has(gap.opportunityId)
      ),
      ...newGaps
    ]
  : newGaps;
const output = {
  schemaVersion: "opportunity-incentive-rules-v1",
  generatedAt,
  mappingPath: path.relative(repoRoot, mappingPath),
  publicIndexPath: path.relative(repoRoot, publicIndexPath),
  targetCount: previousOutput?.targetCount || targets.length,
  repairedThisRunCount: newRules.length,
  manualThisRunCount: newGaps.length,
  onlyManualFromPath: onlyManualFromPath ? path.relative(repoRoot, path.resolve(repoRoot, onlyManualFromPath)) : null,
  mergeExistingPath: mergeExistingPath ? path.relative(repoRoot, path.resolve(repoRoot, mergeExistingPath)) : null,
  repairedRuleCount: rules.length,
  manualRepairTargetCount: gaps.length,
  fetchSources,
  fetchTimeoutMs,
  sourceLimit,
  searchFallback,
  searchLimit,
  searchProviderNames,
  methodCounts: countBy(targets, (target) => target.mapping.incentive_value_method || "unknown"),
  ruleExtractionCounts: countBy(rules, (rule) => rule.extractionMethod || "unknown"),
  ruleConfidenceCounts: countBy(rules, (rule) => rule.confidence || "unknown"),
  gapReasonCounts: countBy(gaps, (gap) => gap.reason || "unknown"),
  researchReviewedNoRuleCount: previousResearchReviewedNoRule.length,
  appliedResearchBatches: previousOutput?.appliedResearchBatches || [],
  lastResearchRepairBatch: previousOutput?.lastResearchRepairBatch || null,
  researchNoRuleStatusCounts: countBy(previousResearchReviewedNoRule, (row) => row.repairStatus || "unknown"),
  rules,
  manualRepairTargets: gaps,
  researchReviewedNoRule: previousResearchReviewedNoRule
};

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
fs.writeFileSync(reportPath, buildReport(output), "utf8");

console.log("Opportunity incentive rule repair complete.");
console.log(`Targets: ${targets.length}`);
console.log(`Rules generated: ${rules.length}`);
console.log(`Manual repair targets: ${gaps.length}`);
console.log(`Wrote: ${outputPath}`);
console.log(`Report: ${reportPath}`);
console.log(JSON.stringify({ ruleExtractionCounts: output.ruleExtractionCounts, gapReasonCounts: output.gapReasonCounts }, null, 2));

function printHelp() {
  console.log(`Usage: node scripts/repair-opportunity-incentive-rules.mjs [--limit N] [--no-fetch]

Fetches public source pages for active/rolling opportunities tagged as upfront cost reduction,
extracts source-backed incentive formulas, and writes:
  - data/opportunity_incentive_rules.json
  - data/opportunity_incentive_rule_repair_report.md

Environment:
  INCENTIVE_REPAIR_CONCURRENCY=10
  INCENTIVE_REPAIR_FETCH_TIMEOUT_MS=12000
  INCENTIVE_REPAIR_SEARCH_FALLBACK=1
  INCENTIVE_REPAIR_SEARCH_LIMIT=2

Options:
  --only-manual-from data/opportunity_incentive_rules.json
  --merge-existing data/opportunity_incentive_rules.json
`);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function manualTargetIdsFrom(filePath) {
  const source = readJson(path.resolve(repoRoot, filePath));
  return new Set((source.manualRepairTargets || []).map((row) => row.opportunityId).filter(Boolean));
}

function buildPublicOpportunityMap(index) {
  const rows = new Map();
  for (const retrofit of index.retrofits || []) {
    for (const opportunity of retrofit.opportunities || []) {
      const existing = rows.get(opportunity.opportunityId) || {
        ...opportunity,
        retrofitTypeIds: new Set(),
        matchedTerms: new Set()
      };
      existing.retrofitTypeIds.add(retrofit.retrofitTypeId);
      for (const term of opportunity.matchedTerms || []) existing.matchedTerms.add(term);
      rows.set(opportunity.opportunityId, existing);
    }
  }

  return new Map(
    [...rows.entries()].map(([id, row]) => [
      id,
      {
        ...row,
        retrofitTypeIds: [...row.retrofitTypeIds],
        matchedTerms: [...row.matchedTerms]
      }
    ])
  );
}

function buildTarget(mapping) {
  const publicOpportunity = publicOpportunitiesById.get(mapping.opportunity_id);
  const availabilityRow = availabilityRowsById.get(mapping.opportunity_id);
  const source = publicOpportunity || availabilityRow || {};
  return {
    opportunityId: mapping.opportunity_id,
    opportunityName: source.opportunityName || mapping.opportunity_name || mapping.opportunity_id,
    sourceName: source.sourceName || null,
    sourceUrl: source.sourceUrl || null,
    websiteUrl: source.websiteUrl || null,
    applicationUrl: source.applicationUrl || null,
    state: source.state || null,
    programType: source.programType || null,
    administrator: source.administrator || null,
    availabilityStatus: source.availabilityStatus || availabilityRow?.availabilityStatus || null,
    matchedTerms: source.matchedTerms || [],
    retrofitTypeIds: source.retrofitTypeIds || [],
    mapping
  };
}

async function repairTarget(target) {
  const directUrls = sourceUrlsFor(target).slice(0, sourceLimit);
  const directFetched = await mapWithConcurrency(directUrls, 2, fetchSourceText);
  const directExtraction = extractRuleFromFetched(target, directFetched, "source_url_fetch");
  if (directExtraction.rule) return directExtraction;

  const searchFetched = searchFallback ? await fetchSearchFallbackSources(target) : [];
  const allFetched = [...directFetched, ...searchFetched];
  const searchExtraction = extractRuleFromFetched(target, allFetched, searchFetched.length ? "source_url_fetch_search_fallback" : "source_url_fetch");
  if (searchExtraction.rule) return searchExtraction;

  return {
    target,
    gap: buildGap(target, allFetched, directExtraction.gap?.reason || "formula_not_found_in_source_text")
  };
}

function buildNoFetchGap(target) {
  return {
    target,
    gap: buildGap(target, [], "fetch_disabled")
  };
}

function sourceUrlsFor(target) {
  return uniqueStrings([target.websiteUrl, target.applicationUrl, target.sourceUrl])
    .filter(Boolean)
    .filter((url) => /^https?:\/\//i.test(url));
}

async function fetchSearchFallbackSources(target) {
  const results = [];
  for (const query of searchQueriesFor(target)) {
    for (const provider of searchProviderNames) {
      const providerResults = await searchProvider(provider, query);
      results.push(...providerResults.map((result) => ({ ...result, query, score: scoreSearchResult(target, result) })));
      if (results.some((result) => result.score >= 5)) break;
    }
    if (results.some((result) => result.score >= 6)) break;
  }

  const urls = dedupeSearchResults(results)
    .filter((result) => result.score >= 2)
    .sort((a, b) => b.score - a.score)
    .slice(0, searchLimit)
    .map((result) => result.url);

  return mapWithConcurrency(urls, 2, fetchSourceText);
}

function searchQueriesFor(target) {
  const title = target.opportunityName;
  const state = target.state && target.state !== "US" ? target.state : null;
  const admin = target.administrator || (target.sourceName !== "DSIRE" ? target.sourceName : null);
  const terms = (target.matchedTerms || []).slice(0, 2).join(" ");
  return uniqueStrings([
    [`"${title}"`, state, admin, "rebate amount incentive"].filter(Boolean).join(" "),
    [`"${title}"`, state, terms, "rebate"].filter(Boolean).join(" "),
    [title, state, admin, "program incentive application"].filter(Boolean).join(" ")
  ]);
}

async function searchProvider(provider, query) {
  const url =
    provider === "bing"
      ? `https://www.bing.com/search?q=${encodeURIComponent(query)}`
      : `https://duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
  const fetched = await fetchUrl(url, { textOnly: true });
  if (!fetched.ok) return [];
  return provider === "bing" ? parseBingResults(fetched.rawText) : parseDuckDuckGoResults(fetched.rawText);
}

function parseDuckDuckGoResults(html) {
  const results = [];
  const blocks = String(html || "").match(/<div[^>]+class="result[^"]*"[\s\S]*?(?=<div[^>]+class="result[^"]*"|<\/body>)/g) || [];
  for (const block of blocks) {
    const match = /<a[^>]+class="result__a"[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/i.exec(block);
    if (!match) continue;
    const url = normalizeDuckDuckGoUrl(decodeHtml(match[1]));
    const title = stripHtmlFragment(match[2]);
    const snippet = stripHtmlFragment(
      (/<a[^>]+class="result__snippet"[^>]*>([\s\S]*?)<\/a>/i.exec(block) ||
        /<div[^>]+class="result__snippet"[^>]*>([\s\S]*?)<\/div>/i.exec(block) ||
        [])[1]
    );
    if (url) results.push({ provider: "duckduckgo", url, title, snippet });
  }
  return results;
}

function parseBingResults(html) {
  const results = [];
  const blocks = String(html || "").match(/<li class="b_algo"[\s\S]*?(?=<li class="b_algo"|<li class="b_ans"|<\/ol>)/g) || [];
  for (const block of blocks) {
    const match =
      /<h2[^>]*>\s*<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>\s*<\/h2>/i.exec(block) ||
      /<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/i.exec(block);
    if (!match) continue;
    const url = normalizeBingUrl(decodeHtml(match[1]));
    const title = stripHtmlFragment(match[2]);
    const snippet = stripHtmlFragment((/<p[^>]*>([\s\S]*?)<\/p>/i.exec(block) || [])[1]);
    if (url) results.push({ provider: "bing", url, title, snippet });
  }
  return results;
}

function normalizeDuckDuckGoUrl(rawUrl) {
  try {
    const parsed = new URL(String(rawUrl || "").startsWith("//") ? `https:${rawUrl}` : rawUrl);
    return parsed.searchParams.get("uddg") || parsed.toString();
  } catch {
    return null;
  }
}

function normalizeBingUrl(rawUrl) {
  const value = String(rawUrl || "");
  try {
    const parsed = new URL(value);
    if (parsed.hostname.includes("bing.com") && parsed.searchParams.get("u")) {
      return parsed.searchParams.get("u");
    }
    return parsed.toString();
  } catch {
    return null;
  }
}

function scoreSearchResult(target, result) {
  const haystack = `${result.title || ""} ${result.snippet || ""} ${result.url || ""}`.toLowerCase();
  const titleTokens = significantTokens(target.opportunityName);
  let score = 0;
  for (const token of titleTokens) if (haystack.includes(token)) score += 1;
  if (target.state && haystack.includes(target.state.toLowerCase())) score += 1;
  if (/(rebate|incentive|grant|program|application|efficiency|energy)/i.test(haystack)) score += 1;
  if (target.administrator && haystack.includes(target.administrator.toLowerCase())) score += 2;
  if (isLowValueSearchUrl(result.url)) score -= 3;
  return score;
}

function significantTokens(value) {
  return uniqueStrings(
    String(value || "")
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((token) => token.length >= 4)
      .filter((token) => !["program", "rebate", "energy", "efficiency", "residential", "commercial"].includes(token))
  ).slice(0, 6);
}

function dedupeSearchResults(results) {
  const seen = new Set();
  const deduped = [];
  for (const result of results) {
    if (!result.url || seen.has(result.url)) continue;
    seen.add(result.url);
    deduped.push(result);
  }
  return deduped;
}

function isLowValueSearchUrl(url) {
  return /(?:dsireusa\.org|facebook\.com|linkedin\.com|x\.com|twitter\.com|youtube\.com|energybot\.com|openei\.org|solarusa\.org|energysage\.com)/i.test(
    String(url || "")
  );
}

async function fetchSourceText(url) {
  return fetchUrl(url);
}

async function fetchUrl(url, { textOnly = false } = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), fetchTimeoutMs);
  try {
    const response = await fetch(url, {
      headers: { "user-agent": "RetroFi incentive rule repair/1.0" },
      signal: controller.signal
    });
    if (!response.ok) return { ok: false, url, error: `HTTP ${response.status}` };
    const contentType = response.headers.get("content-type") || "";
    const rawText = textOnly ? await response.text() : null;
    const text = textOnly ? stripHtml(rawText) : await responseToText(response, contentType, url);
    return {
      ok: true,
      url,
      contentType,
      rawText: rawText || null,
      text: cleanFetchedText(text).slice(0, 180000)
    };
  } catch (error) {
    return { ok: false, url, error: error instanceof Error ? error.message : "fetch failed" };
  } finally {
    clearTimeout(timeout);
  }
}

async function responseToText(response, contentType, url) {
  if (/application\/pdf|\.pdf(?:$|\?)/i.test(contentType) || /\.pdf(?:$|\?)/i.test(url)) {
    const buffer = Buffer.from(await response.arrayBuffer());
    return pdfBufferToText(buffer);
  }
  return stripHtml(await response.text());
}

function pdfBufferToText(buffer) {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "retrofi-incentive-pdf-"));
  const pdfPath = path.join(tempDir, "source.pdf");
  const textPath = path.join(tempDir, "source.txt");
  try {
    fs.writeFileSync(pdfPath, buffer);
    execFileSync("pdftotext", ["-layout", pdfPath, textPath], { stdio: "ignore" });
    return fs.readFileSync(textPath, "utf8");
  } catch {
    return "";
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}

function cleanFetchedText(text) {
  return String(text || "")
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .replace(/DSIRE works with EnergySage[\s\S]*?Commercial Project Financing Options!/i, " ")
    .trim();
}

function extractRuleFromFetched(target, fetched, extractionMethod) {
  const okFetched = fetched.filter((result) => result.ok && usefulSourceText(result.text));
  const segments = relevantSegments(target, okFetched);
  const extraction = extractAmountRule(target, segments);
  if (!extraction) {
    return {
      target,
      gap: buildGap(target, fetched, okFetched.length ? "formula_not_found_in_source_text" : "source_text_unavailable")
    };
  }

  return {
    target,
    rule: buildRule(target, extraction, okFetched, extractionMethod)
  };
}

function usefulSourceText(text) {
  const value = String(text || "");
  if (value.length < 250) return false;
  if (/\{\{\s*program\.name\s*\}\}/i.test(value) && value.length < 5000) return false;
  return true;
}

function relevantSegments(target, fetched) {
  const source = [
    target.opportunityName,
    target.programType,
    target.administrator,
    target.mapping.classification_reason,
    ...fetched.map((result) => result.text)
  ]
    .filter(Boolean)
    .join(" ");
  const normalized = source.replace(/\s+/g, " ");
  const chunks = normalized.match(/[^.!?;]{0,220}(?:\$|¢|cents?|percent|%|rebate|incentive|grant|award|credit|voucher|per kwh|per kw|per unit|per port|per charger|per fixture|per vehicle|per ton|per hp)[^.!?;]{0,260}/gi) || [];

  return uniqueStrings(chunks)
    .map((segment) => segment.trim())
    .filter((segment) => segment.length >= 20)
    .filter((segment) => !/EnergySage|save up to 20%|Log In|Primary Navigation/i.test(segment))
    .slice(0, 80);
}

function extractAmountRule(target, segments) {
  const method = target.mapping.incentive_value_method;
  if (method === "per_kwh_saved") return extractPerKwhRule(target, segments) || extractPercentOrGrantRule(target, segments);
  if (method === "per_kw") return extractPerKwRule(target, segments) || extractPercentOrGrantRule(target, segments);
  if (method === "grant_amount") return extractGrantRule(target, segments) || extractPercentOrGrantRule(target, segments);
  if (method === "per_unit") return extractPerUnitRule(target, segments) || extractPercentOrGrantRule(target, segments);
  return extractPercentOrGrantRule(target, segments);
}

function extractPerKwhRule(target, segments) {
  const candidates = [];
  for (const segment of segments) {
    for (const match of segment.matchAll(/\$\s*([0-9]+(?:\.[0-9]+)?)\s*(?:\/|\bper\b)\s*(?:annual\s+|first[- ]year\s+)?kwh\b/gi)) {
      candidates.push(rateCandidate(Number(match[1]) * 100, segment, "rate_per_kwh"));
    }
    for (const match of segment.matchAll(/([0-9]+(?:\.[0-9]+)?)\s*(?:¢|cents?)\s*(?:\/|\bper\b)\s*(?:annual\s+|first[- ]year\s+)?kwh\b/gi)) {
      candidates.push(rateCandidate(Number(match[1]), segment, "rate_per_kwh"));
    }
  }
  const candidate = bestCandidate(candidates.filter((item) => item.amount > 0 && item.amount <= 100000));
  if (!candidate) return null;
  return {
    amountRule: {
      kind: "rate_per_kwh",
      amountCentsPerKwh: roundMoney(candidate.amount),
      kwhSource: kwhSourceFor(target)
    },
    incentiveType: incentiveTypeFor(target),
    formula: formatCentsPerKwh(candidate.amount),
    evidenceText: candidate.segment,
    confidence: candidate.confidence
  };
}

function extractPerKwRule(target, segments) {
  const candidates = [];
  for (const segment of segments) {
    if (/\b(?:deposit|security|cost must be|installation cost|installed cost)\b/i.test(segment)) continue;
    for (const match of segment.matchAll(/\$\s*([0-9][0-9,]*(?:\.[0-9]+)?)\s*(?:\/|\bper\b)\s*(?:dc\s+|ac\s+|peak\s+|connected\s+)?(?:kw|kilowatt)\b/gi)) {
      candidates.push(rateCandidate(moneyNumberToCents(match[1]), segment, "rate_per_kw"));
    }
  }
  const candidate = bestCandidate(candidates.filter((item) => item.amount > 0 && item.amount <= 100000000));
  if (!candidate) return null;
  return {
    amountRule: {
      kind: "rate_per_kw",
      amountCentsPerKw: Math.round(candidate.amount),
      kwSource: kwSourceFor(target)
    },
    incentiveType: incentiveTypeFor(target),
    formula: `${formatMoneyCents(candidate.amount)} per kW`,
    evidenceText: candidate.segment,
    confidence: candidate.confidence
  };
}

function extractGrantRule(target, segments) {
  const percentGrant = extractPercentOrGrantRule(target, segments);
  if (percentGrant) return { ...percentGrant, incentiveType: "grant" };

  const moneyCandidates = moneyCandidatesFromSegments(segments)
    .filter((candidate) => segmentIsEligibleForGrantCap(candidate.segment))
    .filter((candidate) => candidate.amountCents >= 10000 && candidate.amountCents <= 10000000000);
  const candidate = bestMoneyCandidate(moneyCandidates);
  if (!candidate) return null;

  return {
    amountRule: { kind: "percent_of_basis", percent: 1 },
    basisPolicy: { basis: "gross_project_cost", applicationOrder: 10 },
    cap: { maxAmountCents: candidate.amountCents },
    incentiveType: "grant",
    formula: `up to ${formatMoneyCents(candidate.amountCents)} of eligible project cost`,
    evidenceText: candidate.segment,
    confidence: candidate.confidence
  };
}

function extractPerUnitRule(target, segments) {
  const candidates = moneyCandidatesFromSegments(segments)
    .filter((candidate) => segmentIsEligibleForPerUnit(candidate.segment, target))
    .filter((candidate) => !/total funding|program budget|available funding|funds available|funding available/i.test(candidate.segment))
    .filter((candidate) => candidate.amountCents >= 100 && candidate.amountCents <= 50000000);
  const candidate = bestMoneyCandidate(candidates);
  if (!candidate) return null;

  return {
    amountRule: {
      kind: "fixed_per_unit",
      amountCentsPerUnit: candidate.amountCents,
      unitAnswerKey: unitAnswerKeyFor(target)
    },
    incentiveType: incentiveTypeFor(target),
    formula: `${formatMoneyCents(candidate.amountCents)} per eligible unit`,
    evidenceText: candidate.segment,
    confidence: candidate.confidence
  };
}

function extractPercentOrGrantRule(target, segments) {
  const candidates = [];
  for (const segment of segments) {
    if (!segmentIsEligibleForPercent(segment)) continue;
    for (const match of segment.matchAll(/(?:up to|covers?|covering|pay(?:s|ing)?|rebate|incentive|grant|credit|reimbursement|cost share|cost-share)[^.%]{0,120}?([0-9]{1,3}(?:\.[0-9]+)?)\s*%/gi)) {
      const percent = Number(match[1]);
      if (percent > 0 && percent <= 100) candidates.push({ percent, segment, confidence: confidenceForSegment(segment, "percent") });
    }
    for (const match of segment.matchAll(/([0-9]{1,3}(?:\.[0-9]+)?)\s*%\s*(?:of|for)\s*(?:eligible|project|installed|equipment|measure)?\s*(?:costs?|expenses?|price)?/gi)) {
      const percent = Number(match[1]);
      if (percent > 0 && percent <= 100) candidates.push({ percent, segment, confidence: confidenceForSegment(segment, "percent") });
    }
  }
  const candidate = candidates.sort((a, b) => confidenceRank(b.confidence) - confidenceRank(a.confidence) || b.percent - a.percent)[0];
  if (!candidate) return null;
  const capCandidate = bestMoneyCandidate(
    moneyCandidatesFromSegments([candidate.segment]).filter((item) => item.amountCents >= 1000 && item.amountCents <= 10000000000)
  );
  return {
    amountRule: { kind: "percent_of_basis", percent: candidate.percent / 100 },
    basisPolicy: { basis: "gross_project_cost", applicationOrder: 10 },
    cap: capCandidate ? { maxAmountCents: capCandidate.amountCents } : undefined,
    incentiveType: incentiveTypeFor(target),
    formula: `${candidate.percent}% of eligible project cost${capCandidate ? `, capped at ${formatMoneyCents(capCandidate.amountCents)}` : ""}`,
    evidenceText: candidate.segment,
    confidence: capCandidate ? maxConfidence(candidate.confidence, capCandidate.confidence) : candidate.confidence
  };
}

function moneyCandidatesFromSegments(segments) {
  const candidates = [];
  for (const segment of segments) {
    if (isBlockedMoneySegment(segment)) continue;
    for (const match of segment.matchAll(/\$\s*([0-9][0-9,]*(?:\.[0-9]+)?)\s*(million|billion|thousand|k|m)?/gi)) {
      const amountCents = moneyNumberToCents(match[1], match[2]);
      if (!Number.isFinite(amountCents) || amountCents <= 0) continue;
      candidates.push({
        amountCents,
        segment,
        confidence: confidenceForSegment(segment, "money")
      });
    }
  }
  return candidates;
}

function segmentIsEligibleForPerUnit(segment, target) {
  const value = String(segment || "");
  if (/%|capped|maximum|max\.?|not to exceed|loan|financ/i.test(value)) return false;
  if (countMoneyMentions(value) > 2 && contextScore(value, target) < 3) return false;
  if (!/\b(?:rebate|incentive|credit|voucher|instant discount|up to)\b/i.test(value)) return false;
  if (/\b(?:project|site|property|customer account|customer)\b/i.test(value) && !/\b(?:per|each|unit|port|charger|evse|fixture|lamp|vehicle|appliance|thermostat|ton|hp|horsepower|cfm|sq\.?\s*ft|square foot)\b/i.test(value)) {
    return false;
  }
  if (
    /\$\s*[0-9][0-9,.]*\s*(?:\/|\bper\b)\s*(?:unit|port|charger|evse|fixture|lamp|vehicle|appliance|thermostat|ton|hp|horsepower|cfm|sq\.?\s*ft|square foot|point|ft)/i.test(
      value
    )
  ) {
    return true;
  }
  if (/\b(?:charger|evse|fixture|lamp|vehicle|appliance|thermostat)\s+rebate\b/i.test(value)) {
    return true;
  }
  return false;
}

function isBlockedMoneySegment(segment) {
  return /\b(?:donated|donation|case study|story|purchase price|price of less than|monthly electric bill|talk to a local solar installer|how much money can you save|save you up to \$[0-9,.]+\s+per\s+year|quarterly credit|monthly credit|annual credit|per year|loan allowed|borrow|financing|apr|interest rate|salary|wage|fee schedule)\b/i.test(
    String(segment || "")
  );
}

function segmentIsEligibleForGrantCap(segment) {
  const value = String(segment || "");
  if (isBlockedMoneySegment(value)) return false;
  if (/\b(?:total funding|program budget|available funding|funds available|funding available|receive .* allocation|over five years|distributed .* grants totaling|announces? the availability of|announces? over|grant awards?\s+[0-9]{4}|conditional awards?|recipients and their corresponding sites|applicant county grant amount)\b/i.test(value)) {
    return false;
  }
  if (!/\b(?:grant|award|reimbursement|voucher|incentive|rebate|cost share|cost-share|up to|maximum|not to exceed|capped)\b/i.test(value)) {
    return false;
  }
  return /\b(?:per project|per applicant|per customer|per property|per account|per site|per award|project cost|eligible costs?|purchase and installation|maximum grant|maximum award|grant amount)\b/i.test(
    value
  );
}

function segmentIsEligibleForPercent(segment) {
  const value = String(segment || "");
  if (isBlockedMoneySegment(value)) return false;
  if (/\b(?:interest|apr|financ|loan|shade|annual access|less energy|energy savings|save your business|match required|cash match|required match|adder to|tax credit available)\b/i.test(value)) {
    return false;
  }
  if (/\b(?:cannot|may not|shall not|not)\s+exceed|limited to|cap(?:ped)?\b/i.test(value) && !/\b(?:cover|covers|covering|grant requests? may cover|rebate amount|eligible .* receive|can receive|up to)\b/i.test(value)) {
    return false;
  }
  if (!/\b(?:rebate|incentive|grant|credit|reimbursement|cost share|cost-share|cover|covers|covered|funding|eligible)\b/i.test(value)) {
    return false;
  }
  return /\b(?:project cost|total project cost|eligible costs?|installed cost|installation costs?|purchase and installation|equipment cost|measure cost|incremental cost|invoice|invoiced)\b/i.test(
    value
  );
}

function countMoneyMentions(value) {
  return (String(value || "").match(/\$\s*[0-9]/g) || []).length;
}

function bestMoneyCandidate(candidates) {
  return candidates.sort(
    (a, b) =>
      confidenceRank(b.confidence) - confidenceRank(a.confidence) ||
      amountPreferenceScore(b.amountCents) - amountPreferenceScore(a.amountCents)
  )[0] || null;
}

function bestCandidate(candidates) {
  return candidates.sort((a, b) => confidenceRank(b.confidence) - confidenceRank(a.confidence) || b.amount - a.amount)[0] || null;
}

function rateCandidate(amount, segment, kind) {
  return {
    amount,
    segment,
    confidence: confidenceForSegment(segment, kind)
  };
}

function confidenceForSegment(segment, kind) {
  const value = String(segment || "");
  if (isBlockedMoneySegment(value)) return "blocked";
  if (kind === "rate_per_kwh" && /(?:\/|\bper\b)\s*(?:annual\s+|first[- ]year\s+)?kwh\b/i.test(value)) return "high";
  if (kind === "rate_per_kw" && /(?:\/|\bper\b)\s*(?:kw|kilowatt)\b/i.test(value)) return "high";
  if (kind === "percent" && /(?:eligible|project|installed|equipment|measure)\s+cost/i.test(value)) return "high";
  if (/\b(?:up to|maximum|max\.?|not to exceed|capped|per|each|rebate|incentive|grant|award|voucher)\b/i.test(value)) return "medium";
  return "low";
}

function confidenceRank(value) {
  if (value === "high") return 3;
  if (value === "medium") return 2;
  if (value === "low") return 1;
  return 0;
}

function contextScore(segment, target) {
  const haystack = String(segment || "").toLowerCase();
  const tokens = uniqueStrings([
    ...significantTokens(target.opportunityName),
    ...significantTokens((target.matchedTerms || []).join(" ")),
    ...significantTokens(target.mapping.primary_savings_model_id || "")
  ]).slice(0, 12);
  return tokens.filter((token) => haystack.includes(token)).length;
}

function maxConfidence(a, b) {
  return confidenceRank(a) >= confidenceRank(b) ? a : b;
}

function amountPreferenceScore(amountCents) {
  if (amountCents <= 0) return 0;
  if (amountCents > 5000000000) return 1;
  return Math.log10(amountCents);
}

function moneyNumberToCents(value, multiplierLabel = "") {
  const base = Number(String(value || "").replace(/,/g, ""));
  if (!Number.isFinite(base)) return 0;
  const label = String(multiplierLabel || "").toLowerCase();
  const multiplier = label === "billion" ? 1_000_000_000 : label === "million" || label === "m" ? 1_000_000 : label === "thousand" || label === "k" ? 1_000 : 1;
  return Math.round(base * multiplier * 100);
}

function roundMoney(value) {
  return Math.round(Number(value) * 1000) / 1000;
}

function buildRule(target, extraction, fetched, extractionMethod) {
  const id = `oir_${hashId(target.opportunityId)}_v1`;
  const basisPolicy = extraction.basisPolicy || defaultBasisPolicyFor(extraction);
  return removeUndefined({
    id,
    version: 1,
    opportunityId: target.opportunityId,
    name: target.opportunityName,
    incentiveType: extraction.incentiveType || incentiveTypeFor(target),
    timing: extraction.timing || "upfront",
    amountRule: extraction.amountRule,
    basisPolicy,
    cap: extraction.cap,
    active: true,
    source: "generated_opportunity_incentive_rule_repair",
    extractionMethod,
    confidence: extraction.confidence || "medium",
    formula: extraction.formula,
    evidenceText: trimEvidence(extraction.evidenceText),
    sourceUrlsChecked: fetched.map((result) => result.url),
    mapping: {
      primarySavingsModelId: target.mapping.primary_savings_model_id,
      incentiveValueMethod: target.mapping.incentive_value_method,
      calculationReadiness: target.mapping.calculation_readiness,
      calculationInputNeed: target.mapping.calculation_input_need || null,
      businessRelevance: target.mapping.business_relevance,
      v1Readiness: target.mapping.v1_readiness
    },
    notes:
      extraction.confidence === "low"
        ? "Low-confidence deterministic extraction; verify before customer-facing final estimates."
        : undefined
  });
}

function defaultBasisPolicyFor(extraction) {
  if (extraction.amountRule?.kind === "percent_of_basis") {
    return { basis: "gross_project_cost", applicationOrder: 10 };
  }
  return { basis: "gross_project_cost", applicationOrder: 10 };
}

function buildGap(target, fetched, reason) {
  return {
    opportunityId: target.opportunityId,
    opportunityName: target.opportunityName,
    availabilityStatus: target.availabilityStatus,
    sourceName: target.sourceName,
    state: target.state,
    sourceUrl: target.sourceUrl,
    websiteUrl: target.websiteUrl,
    applicationUrl: target.applicationUrl,
    reason,
    incentiveValueMethod: target.mapping.incentive_value_method,
    calculationReadiness: target.mapping.calculation_readiness,
    primarySavingsModelId: target.mapping.primary_savings_model_id,
    matchedTerms: target.matchedTerms || [],
    sourceUrlsChecked: fetched.map((result) => result.url),
    fetchErrors: fetched.filter((result) => !result.ok).map((result) => ({ url: result.url, error: result.error })),
    snippets: fetched
      .filter((result) => result.ok)
      .flatMap((result) => relevantSegments(target, [result]).slice(0, 2).map((text) => ({ url: result.url, text: trimEvidence(text) })))
      .slice(0, 4)
  };
}

function incentiveTypeFor(target) {
  const text = `${target.opportunityName} ${target.programType || ""} ${target.mapping.primary_savings_model_id || ""}`.toLowerCase();
  if (/tax credit|income tax|investment tax/.test(text)) return "tax_credit";
  if (/grant|funding|award|voucher/.test(text) || target.mapping.incentive_value_method === "grant_amount") return "grant";
  if (/sales tax|use tax/.test(text)) return "sales_tax_exemption";
  if (/property tax|abatement/.test(text)) return "property_tax_exemption";
  return "fixed_per_unit_rebate";
}

function unitAnswerKeyFor(target) {
  const text = `${target.opportunityName} ${target.mapping.primary_savings_model_id || ""} ${(target.matchedTerms || []).join(" ")}`.toLowerCase();
  if (/fleet|vehicle|forklift/.test(text)) return "unit_count";
  return "unit_count";
}

function kwhSourceFor(target) {
  const model = String(target.mapping.primary_savings_model_id || "").toLowerCase();
  if (/solar|generation|renewable|wind|biomass|biogas|fuel_cell|combined_heat/.test(model)) return "annual_generation_kwh";
  return "annual_kwh_delta_abs";
}

function kwSourceFor(target) {
  const model = String(target.mapping.primary_savings_model_id || "").toLowerCase();
  if (/solar|generation|renewable|wind|fuel_cell|combined_heat/.test(model)) return "system_kw";
  if (/ev_charging/.test(model)) return "charger_kw";
  return "demand_reduction_kw";
}

function hashId(value) {
  return crypto.createHash("sha1").update(String(value)).digest("hex").slice(0, 16);
}

function trimEvidence(value) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 800);
}

function formatMoneyCents(cents) {
  const dollars = Number(cents || 0) / 100;
  return `$${dollars.toLocaleString("en-US", { maximumFractionDigits: dollars % 1 ? 2 : 0 })}`;
}

function formatCentsPerKwh(cents) {
  if (cents >= 100) return `${formatMoneyCents(cents)} per kWh`;
  return `${cents.toLocaleString("en-US", { maximumFractionDigits: 3 })} cents per kWh`;
}

function removeUndefined(value) {
  if (Array.isArray(value)) return value.map(removeUndefined);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(
    Object.entries(value)
      .filter(([, entryValue]) => entryValue !== undefined)
      .map(([key, entryValue]) => [key, removeUndefined(entryValue)])
  );
}

async function mapWithConcurrency(items, concurrency, mapper, { progress = false } = {}) {
  const results = new Array(items.length);
  let index = 0;
  let completed = 0;
  const startedAt = Date.now();

  async function worker() {
    while (index < items.length) {
      const current = index;
      index += 1;
      results[current] = await mapper(items[current], current);
      completed += 1;
      if (progress && progressEvery > 0 && (completed % progressEvery === 0 || completed === items.length)) {
        const elapsedSeconds = Math.round((Date.now() - startedAt) / 1000);
        console.log(`Progress: ${completed}/${items.length} (${elapsedSeconds}s elapsed)`);
      }
    }
  }

  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, worker));
  return results;
}

function countBy(items, selector) {
  const counts = {};
  for (const item of items) {
    const key = selector(item);
    counts[key] = (counts[key] || 0) + 1;
  }
  return counts;
}

function uniqueStrings(values) {
  const seen = new Set();
  const output = [];
  for (const value of values) {
    const normalized = String(value || "").trim();
    if (!normalized || seen.has(normalized)) continue;
    seen.add(normalized);
    output.push(normalized);
  }
  return output;
}

function decodeHtml(value) {
  return String(value || "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function stripHtmlFragment(value) {
  return stripHtml(decodeHtml(value || ""));
}

function argValue(name) {
  const index = process.argv.indexOf(name);
  if (index === -1) return null;
  return process.argv[index + 1] || null;
}

function buildReport(output) {
  const lines = [
    "# Opportunity Incentive Rule Repair Report",
    "",
    `Generated: ${output.generatedAt}`,
    `Targets reviewed: ${output.targetCount}`,
    `Rules generated: ${output.repairedRuleCount}`,
    `Manual repair targets: ${output.manualRepairTargetCount}`,
    "",
    "## Rule Extraction Counts",
    "",
    "```json",
    JSON.stringify(output.ruleExtractionCounts, null, 2),
    "```",
    "",
    "## Rule Confidence Counts",
    "",
    "```json",
    JSON.stringify(output.ruleConfidenceCounts, null, 2),
    "```",
    "",
    "## Gap Reason Counts",
    "",
    "```json",
    JSON.stringify(output.gapReasonCounts, null, 2),
    "```",
    "",
    "## Notes",
    "",
    "- Rules are generated only when deterministic source text contains an extractable amount, rate, percentage, or cap.",
    "- Manual repair targets should be researched with official program documents before they are shown as customer-facing one-time savings.",
    "- Broad programs with measure-specific tables often need manual or LLM-assisted extraction because one opportunity can contain many rates.",
    "",
    "## First Manual Repair Targets",
    ""
  ];

  for (const gap of output.manualRepairTargets.slice(0, 50)) {
    lines.push(`- ${gap.opportunityName} (${gap.opportunityId})`);
    lines.push(`  - reason: ${gap.reason}; method: ${gap.incentiveValueMethod}; source: ${gap.websiteUrl || gap.sourceUrl || "n/a"}`);
  }

  return `${lines.join("\n")}\n`;
}
