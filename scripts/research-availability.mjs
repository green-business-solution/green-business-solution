import fs from "node:fs";
import path from "node:path";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { fromIni } from "@aws-sdk/credential-providers";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { buildExtractionCorpus } from "../apps/api/server/matching/buildOpportunityMatchProfile.mjs";
import { AVAILABILITY_REVIEW_SCHEMA_VERSION, inferAvailabilityReview } from "../apps/api/server/matching/availabilityReview.mjs";
import { fetchSourceTextWithRetry } from "./reviewFetch.mjs";

const repoRoot = path.resolve(import.meta.dirname, "..");
const dataDir = path.join(repoRoot, "data");
const sourcePath = process.env.OPPORTUNITY_SOURCE_PATH || "";
const outputPath = process.env.AVAILABILITY_REVIEW_OUTPUT_PATH || path.join(dataDir, "availability_reviews.json");
const reportPath = process.env.AVAILABILITY_REVIEW_REPORT_PATH || path.join(dataDir, "availability_review_report.md");
const tableName = process.env.GBS_OPPORTUNITIES_TABLE || "gbs-opportunity-candidates";
const region = process.env.GBS_AWS_REGION || process.env.AWS_REGION || "us-east-2";
const profile = process.env.AWS_PROFILE || "gbs";
const fetchSources = process.env.AVAILABILITY_REVIEW_FETCH !== "0";
const fetchTimeoutMs = Number(process.env.AVAILABILITY_REVIEW_FETCH_TIMEOUT_MS || 12000);
const fetchAttempts = Math.max(1, Number(process.env.AVAILABILITY_REVIEW_FETCH_ATTEMPTS || 3));
const fetchRetryDelayMs = Math.max(0, Number(process.env.AVAILABILITY_REVIEW_FETCH_RETRY_DELAY_MS || 30000));
const concurrency = Math.max(1, Number(process.env.AVAILABILITY_REVIEW_CONCURRENCY || 8));
const searchFallback = process.env.AVAILABILITY_REVIEW_SEARCH_FALLBACK === "1";
const searchFallbackLimit = Math.max(1, Number(process.env.AVAILABILITY_REVIEW_SEARCH_FALLBACK_LIMIT || 3));
const searchProviderNames = uniqueStrings(
  String(process.env.AVAILABILITY_REVIEW_SEARCH_PROVIDERS || "duckduckgo,bing")
    .split(",")
    .map((provider) => provider.trim().toLowerCase())
).filter((provider) => ["duckduckgo", "bing"].includes(provider));
const searchTimeoutMs = Number(process.env.AVAILABILITY_REVIEW_SEARCH_TIMEOUT_MS || 12000);
const writeDynamoDb = process.argv.includes("--write-dynamodb");
const generatedAt = new Date().toISOString();

if (process.argv.includes("--help") || process.argv.includes("-h")) {
  printHelp();
  process.exit(0);
}

const opportunities = sourcePath ? readOpportunitySource(sourcePath) : await scanOpportunitiesFromAws();
const db = writeDynamoDb ? createDbClient() : null;
const reviews = await mapWithConcurrency(opportunities, concurrency, reviewOpportunity);
const statusCounts = countBy(reviews, (review) => review.availabilityReview.normalizedStatus);
const output = {
  schemaVersion: AVAILABILITY_REVIEW_SCHEMA_VERSION,
  generatedAt,
  opportunityCount: opportunities.length,
  fetchSources,
  fetchTimeoutMs,
  fetchAttempts,
  fetchRetryDelayMs,
  searchFallback,
  searchFallbackLimit,
  searchProviderNames,
  searchTimeoutMs,
  statusCounts,
  reviews
};

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
fs.writeFileSync(reportPath, buildReport(output), "utf8");

console.log("Availability review complete.");
console.log(`Opportunities reviewed: ${opportunities.length}`);
console.log(`Fetch source pages: ${fetchSources ? "yes" : "no"}`);
console.log(`Search fallback: ${searchFallback ? "yes" : "no"}`);
console.log(`Wrote: ${outputPath}`);
console.log(`Report: ${reportPath}`);
if (writeDynamoDb) console.log(`DynamoDB updates written to ${tableName}.`);
console.log(JSON.stringify(statusCounts, null, 2));
if (process.env.AVAILABILITY_REVIEW_NO_FORCE_EXIT !== "1") {
  process.exit(0);
}

async function reviewOpportunity(opportunity) {
  const corpusText = buildExtractionCorpus(opportunity).map((segment) => segment.text).join("\n");
  const urls = sourceUrlsFor(opportunity);
  const fetched = fetchSources ? await mapWithConcurrency(urls, 2, fetchSourceText) : [];
  const baseAvailabilityReview = availabilityReviewFromFetchedSources(opportunity, corpusText, fetched, []);
  const searchFetched =
    searchFallback && baseAvailabilityReview.normalizedStatus === "uncertain"
      ? await fetchSearchFallbackSources(opportunity)
      : [];
  const availabilityReview =
    searchFetched.length > 0
      ? availabilityReviewFromFetchedSources(opportunity, corpusText, fetched, searchFetched, {
          reviewMethod: "source_url_fetch_search_fallback_and_deterministic_corpus"
        })
      : baseAvailabilityReview;
  const allFetched = [...fetched, ...searchFetched];
  const row = {
    opportunityId: opportunity.opportunityId,
    opportunityName: opportunity.canonicalTitle || opportunity.normalizedTitle || opportunity.opportunityId,
    sourceName: opportunity.sourceName || opportunity.sourceKey || null,
    state: opportunity.state || null,
    sourceUrl: opportunity.sourceUrl || null,
    websiteUrl: opportunity.websiteUrl || null,
    availabilityReview
  };

  if (db) {
    await db.send(
      new UpdateCommand({
        TableName: tableName,
        Key: { opportunityId: opportunity.opportunityId },
        UpdateExpression:
          "SET availabilityReview = :review, availabilityReviewUpdatedAt = :updatedAt, availabilityReviewSchemaVersion = :schemaVersion",
        ExpressionAttributeValues: {
          ":review": availabilityReview,
          ":updatedAt": generatedAt,
          ":schemaVersion": AVAILABILITY_REVIEW_SCHEMA_VERSION
        }
      })
    );
  }

  return {
    ...row,
    availabilityReview: {
      ...availabilityReview,
      sourceUrlsChecked: allFetched.map((result) => result.url),
      fetchErrors: allFetched.filter((result) => !result.ok).map(({ error, url }) => ({ error, url }))
    }
  };
}

function availabilityReviewFromFetchedSources(opportunity, corpusText, fetched, extraFetched, overrides = {}) {
  const allFetched = [...fetched, ...extraFetched];
  const fetchedText = allFetched.filter((result) => result.ok).map((result) => result.text).join("\n");
  return inferAvailabilityReview(opportunity, [corpusText, fetchedText].filter(Boolean).join("\n"), {
    fetchErrors: allFetched.filter((result) => !result.ok).map(({ error, url }) => ({ error, url })),
    reviewedAt: generatedAt,
    reviewMethod: overrides.reviewMethod || (fetchSources ? "source_url_fetch_and_deterministic_corpus" : "deterministic_source_corpus"),
    sourceUrlsChecked: allFetched.map((result) => result.url)
  });
}

async function fetchSearchFallbackSources(opportunity) {
  const searchResults = await searchOpportunitySources(opportunity);
  const urls = searchResults
    .filter((result) => isUsableSearchResult(opportunity, result))
    .map((result) => result.url)
    .filter((url) => /^https?:\/\//i.test(url))
    .filter((url) => !isLowValueAvailabilitySourceUrl(url))
    .slice(0, searchFallbackLimit);

  if (urls.length === 0) return [];
  return mapWithConcurrency(urls, 2, fetchSourceText);
}

async function searchOpportunitySources(opportunity) {
  const results = [];
  const queries = searchQueriesFor(opportunity);

  for (const query of queries) {
    for (const provider of searchProviderNames) {
      const providerResults = await searchProvider(provider, query);
      for (const result of providerResults) {
        results.push({
          ...result,
          query,
          score: scoreSearchResult(opportunity, result)
        });
      }
      if (results.some((result) => result.score >= 3)) break;
    }
    if (results.some((result) => result.score >= 4)) break;
  }

  return dedupeSearchResults(results)
    .sort((a, b) => b.score - a.score)
    .slice(0, searchFallbackLimit * 2);
}

function searchQueriesFor(opportunity) {
  const title = opportunity.canonicalTitle || opportunity.normalizedTitle || opportunity.opportunityName || opportunity.opportunityId;
  const state = opportunity.state && opportunity.state !== "US" ? opportunity.state : null;
  const administrator = opportunity.administrator || null;
  const sourceName = opportunity.sourceName && opportunity.sourceName !== "DSIRE" ? opportunity.sourceName : null;
  return uniqueStrings([
    [`"${title}"`, state, administrator || sourceName].filter(Boolean).join(" "),
    [`"${title}"`, state, "program"].filter(Boolean).join(" "),
    [title, state, administrator || sourceName, "rebate incentive grant"].filter(Boolean).join(" ")
  ]);
}

async function searchProvider(provider, query) {
  const url =
    provider === "bing"
      ? `https://www.bing.com/search?q=${encodeURIComponent(query)}`
      : `https://duckduckgo.com/html/?q=${encodeURIComponent(query)}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), searchTimeoutMs);

  try {
    const response = await fetch(url, {
      headers: {
        "user-agent": "Mozilla/5.0 RetroFi availability review/1.0"
      },
      signal: controller.signal
    });
    if (!response.ok) return [];
    const html = await response.text();
    return provider === "bing" ? parseBingResults(html) : parseDuckDuckGoResults(html);
  } catch {
    return [];
  } finally {
    clearTimeout(timeout);
  }
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
    if (!url) continue;
    results.push({ provider: "duckduckgo", url, title, snippet });
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
    if (!url) continue;
    results.push({ provider: "bing", url, title, snippet });
  }
  return results;
}

function normalizeDuckDuckGoUrl(rawUrl) {
  const value = String(rawUrl || "");
  try {
    const parsed = new URL(value.startsWith("//") ? `https:${value}` : value);
    const redirected = parsed.searchParams.get("uddg");
    return redirected || parsed.toString();
  } catch {
    return null;
  }
}

function normalizeBingUrl(rawUrl) {
  const value = String(rawUrl || "");
  try {
    const parsed = new URL(value.startsWith("//") ? `https:${value}` : value);
    const redirected = parsed.searchParams.get("u");
    if (parsed.hostname.includes("bing.com") && redirected) {
      return decodeBingRedirect(redirected) || null;
    }
    return parsed.toString();
  } catch {
    return null;
  }
}

function decodeBingRedirect(value) {
  try {
    const encoded = String(value || "").replace(/^a1/i, "").replace(/-/g, "+").replace(/_/g, "/");
    return Buffer.from(encoded, "base64").toString("utf8") || null;
  } catch {
    return null;
  }
}

function scoreSearchResult(opportunity, result) {
  const haystack = [result.title, result.snippet, result.url].filter(Boolean).join(" ").toLowerCase();
  const tokens = significantSearchTokens(opportunity);
  const overlap = tokens.filter((token) => haystack.includes(token)).length;
  let score = overlap;
  if (isLowValueAvailabilitySourceUrl(result.url) || isLowValueSearchResultUrl(result.url)) score -= 4;
  if (/\b(rebate|rebates|incentive|incentives|grant|grants|loan|loans|financing|pace|tax credit|tax exemption|property tax|program|application|eligible|eligibility|solar|battery|heat pump|lighting|hvac|efficiency)\b/i.test(haystack)) {
    score += 1;
  }
  if (isLikelyOfficialSearchResult(opportunity, result.url)) score += 1;
  return score;
}

function isUsableSearchResult(opportunity, result) {
  const tokens = significantSearchTokens(opportunity);
  if (tokens.length === 0) return false;
  const haystack = [result.title, result.snippet, result.url].filter(Boolean).join(" ").toLowerCase();
  const urlHaystack = String(result.url || "").toLowerCase();
  const overlap = tokens.filter((token) => haystack.includes(token)).length;
  const urlOverlap = tokens.filter((token) => urlHaystack.includes(token)).length;
  if (overlap < Math.min(2, tokens.length)) return false;
  if (urlOverlap < 1) return false;
  return isLikelyOfficialSearchResult(opportunity, result.url) || (result.score >= 5 && hasProgramLanguageInUrl(result.url));
}

function significantSearchTokens(opportunity) {
  const stopwords = new Set([
    "and",
    "for",
    "the",
    "city",
    "county",
    "state",
    "home",
    "homes",
    "business",
    "with",
    "from",
    "gas",
    "water",
    "power",
    "department",
    "association",
    "cooperative",
    "district",
    "municipal",
    "program",
    "programs",
    "rebate",
    "rebates",
    "incentive",
    "incentives",
    "energy",
    "efficiency",
    "efficient",
    "commercial",
    "residential",
    "electric",
    "electricity",
    "utility",
    "utilities",
    "loan",
    "loans",
    "grant",
    "grants",
    "financing",
    "tax",
    "investment",
    "credit",
    "credits"
  ]);
  const title = [opportunity.canonicalTitle, opportunity.normalizedTitle, opportunity.opportunityName, opportunity.name, opportunity.title]
    .filter(Boolean)
    .join(" ");
  return [...new Set(title.toLowerCase().match(/[a-z0-9]{3,}/g) || [])].filter((token) => !stopwords.has(token));
}

function isLikelyOfficialSearchResult(opportunity, url) {
  const hostname = hostnameFor(url);
  if (!hostname) return false;
  const sourceTokens = [opportunity.administrator, opportunity.sourceName, opportunity.opportunityName]
    .filter(Boolean)
    .join(" ")
    .toLowerCase()
    .match(/[a-z0-9]{4,}/g) || [];
  const tokenMatch = sourceTokens.some((token) => hostname.includes(token));
  if (tokenMatch) return true;
  if (hostname.endsWith(".gov") || hostname.includes(".gov.")) {
    const titleTokens = significantSearchTokens(opportunity);
    return titleTokens.some((token) => hostname.includes(token) || String(url).toLowerCase().includes(token));
  }
  return false;
}

function hasProgramLanguageInUrl(url) {
  const normalizedUrl = String(url || "").toLowerCase();
  return [
    "rebate",
    "incentive",
    "grant",
    "loan",
    "financing",
    "pace",
    "tax",
    "credit",
    "exemption",
    "program",
    "application",
    "solar",
    "battery",
    "heat",
    "pump",
    "lighting",
    "hvac",
    "efficiency",
    "renewable",
    "electrification",
    "ev"
  ].some((term) => normalizedUrl.includes(term));
}

function isLowValueSearchResultUrl(url) {
  const hostname = hostnameFor(url);
  return /(?:google|bing|duckduckgo|facebook|linkedin|youtube|wikipedia|merriam-webster|dictionary|cambridge|advanceautoparts)\./i.test(hostname || "");
}

function hostnameFor(url) {
  try {
    return new URL(url).hostname.toLowerCase();
  } catch {
    return "";
  }
}

function dedupeSearchResults(results) {
  const byUrl = new Map();
  for (const result of results) {
    if (!result.url) continue;
    const existing = byUrl.get(result.url);
    if (!existing || result.score > existing.score) byUrl.set(result.url, result);
  }
  return [...byUrl.values()];
}

function stripHtmlFragment(value) {
  return decodeHtml(String(value || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}

function decodeHtml(value) {
  return String(value || "")
    .replace(/&amp;/g, "&")
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function readOpportunitySource(filePath) {
  const source = readJson(filePath);
  if (Array.isArray(source)) return source.filter((item) => item?.opportunityId);
  if (Array.isArray(source.retrofits)) return flattenPublicRetrofitIndex(source);
  return (source.Items || []).map((item) => (item.opportunityId ? item : unmarshall(item))).filter((item) => item?.opportunityId);
}

function flattenPublicRetrofitIndex(source) {
  const opportunitiesById = new Map();

  for (const retrofit of source.retrofits || []) {
    for (const opportunity of retrofit.opportunities || []) {
      if (!opportunity?.opportunityId || opportunitiesById.has(opportunity.opportunityId)) {
        continue;
      }

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
    opportunity.websiteUrl,
    opportunity.applicationUrl,
    opportunity.sourceUrl,
    ...asArray(opportunity.evidence).map((evidence) => evidence?.sourceUrl)
  ].flatMap(expandKnownSourceUrls))
    .filter((url) => /^https?:\/\//i.test(url))
    .filter((url) => !isLowValueAvailabilitySourceUrl(url));
}

function expandKnownSourceUrls(url) {
  if (!url) return [];
  const value = String(url);
  if (/rd\.usda\.gov\/programs-services\/rural-energy-america-program-energy-audit-renewable-energy-development-assistance\b/i.test(value)) {
    return [
      value,
      "https://www.rd.usda.gov/programs-services/energy-programs/rural-energy-america-program-energy-audit-renewable-energy-development-assistance-grants"
    ];
  }
  return [value];
}

function isLowValueAvailabilitySourceUrl(url) {
  return /programs\.dsireusa\.org\/system\/program\/detail\//i.test(url);
}

async function fetchSourceText(url) {
  return fetchSourceTextWithRetry(url, {
    attempts: fetchAttempts,
    baseDelayMs: fetchRetryDelayMs,
    timeoutMs: fetchTimeoutMs,
    userAgent: "RetroFi availability review/1.0"
  });
}

function buildReport(output) {
  const lines = [
    "# Availability Review",
    "",
    `Generated: ${output.generatedAt}`,
    `Opportunities reviewed: ${output.opportunityCount}`,
    `Source-page fetch enabled: ${output.fetchSources ? "yes" : "no"}`,
    `Source fetch attempts: ${output.fetchAttempts}`,
    `Source fetch retry delay: ${output.fetchRetryDelayMs} ms`,
    `Search fallback enabled: ${output.searchFallback ? "yes" : "no"}`,
    `Search fallback source limit: ${output.searchFallbackLimit}`,
    `Search providers: ${output.searchProviderNames?.join(", ") || "none"}`,
    `Search timeout: ${output.searchTimeoutMs} ms`,
    "",
    "## Status Counts",
    "",
    "```json",
    JSON.stringify(output.statusCounts, null, 2),
    "```",
    "",
    "## Status Meanings",
    "",
    "- `active`: source text indicates the program is currently accepting participation or applications.",
    "- `rolling`: source text explicitly says no deadline, no time limit, first-come first-served, or open until funds are exhausted.",
    "- `upcoming`: source text indicates a future opening.",
    "- `unavailable`: source text or dates indicate the program is closed, fully subscribed, expired, cancelled, or no longer accepting applications.",
    "- `uncertain`: reviewed source text did not contain enough supported availability evidence. If source fetches were rate-limited, wait for the retry window and rerun the review before accepting this status.",
    "",
    "## Sample Rows",
    ""
  ];

  for (const review of output.reviews.slice(0, 80)) {
    const availability = review.availabilityReview;
    lines.push(
      `- ${availability.normalizedStatus}: ${review.opportunityName} (${review.opportunityId})`,
      `  - reasons: ${availability.reasons.join(", ") || "none"}`,
      `  - evidence: ${availability.evidenceText || "none"}`,
      `  - sources: ${availability.sourceUrlsChecked.join(", ") || "none"}`
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
  console.log(`Usage: npm run matching:availability-reviews [-- --write-dynamodb]

Research current application availability for opportunities.

Environment:
  OPPORTUNITY_SOURCE_PATH                 Read opportunities from local JSON instead of DynamoDB.
  AVAILABILITY_REVIEW_OUTPUT_PATH         Output JSON path. Default: data/availability_reviews.json.
  AVAILABILITY_REVIEW_REPORT_PATH         Output markdown path. Default: data/availability_review_report.md.
  AVAILABILITY_REVIEW_FETCH=0             Skip source-page fetches.
  AVAILABILITY_REVIEW_CONCURRENCY=8       Opportunity review concurrency.
  AVAILABILITY_REVIEW_FETCH_TIMEOUT_MS=12000 Source fetch timeout in milliseconds.
  AVAILABILITY_REVIEW_FETCH_ATTEMPTS=3    Attempts per source URL. HTTP 429/5xx and timeouts are retried.
  AVAILABILITY_REVIEW_FETCH_RETRY_DELAY_MS=30000 Base delay before retrying rate-limited or transient fetches.

Options:
  --write-dynamodb                        Store availabilityReview on each DynamoDB opportunity.
`);
}
