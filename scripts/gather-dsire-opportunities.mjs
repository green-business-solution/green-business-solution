#!/usr/bin/env node

import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const SOURCE_KEY = "SOURCE_DSIRE";
const SOURCE_NAME = "DSIRE";
const DEFAULT_OUTPUT_DIR = "var/opportunity-ingestion/dsire";
const DEFAULT_RSS_URL = "https://programs.dsireusa.org/rss/";
const DEFAULT_PROGRAMS_PATH = "/programs";
const DEFAULT_PAGE_SIZE = 100;
const DEFAULT_MAX_PAGES = 1000;
const DEFAULT_USER_AGENT =
  "GreenBusinessSolutionBot/0.1 (+https://github.com/green-business-solution/green-business-solution)";

main().catch((error) => {
  console.error(`DSIRE ingestion failed: ${error.message}`);
  if (process.env.DEBUG) {
    console.error(error);
  }
  process.exitCode = 1;
});

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.help) {
    printHelp();
    return;
  }

  const startedAt = new Date().toISOString();
  const requestedMode = args.mode ?? "auto";
  const apiBaseUrl = args.apiBaseUrl ?? process.env.DSIRE_API_BASE_URL;
  const mode = requestedMode === "auto" ? (apiBaseUrl ? "api" : "rss") : requestedMode;

  const config = {
    mode,
    requestedMode,
    outputDir: path.resolve(process.cwd(), args.outputDir ?? DEFAULT_OUTPUT_DIR),
    rssUrl: args.rssUrl ?? process.env.DSIRE_RSS_URL ?? DEFAULT_RSS_URL,
    apiBaseUrl,
    apiProgramsPath: args.apiProgramsPath ?? process.env.DSIRE_API_PROGRAMS_PATH ?? DEFAULT_PROGRAMS_PATH,
    apiKey: process.env.DSIRE_API_KEY,
    apiAuthHeader: process.env.DSIRE_API_AUTH_HEADER ?? "Authorization",
    apiAuthScheme: process.env.DSIRE_API_AUTH_SCHEME ?? "Bearer",
    apiLimitParam: process.env.DSIRE_API_LIMIT_PARAM ?? "limit",
    apiOffsetParam: process.env.DSIRE_API_OFFSET_PARAM ?? "offset",
    apiPageParam: process.env.DSIRE_API_PAGE_PARAM,
    apiPageStart: Number(process.env.DSIRE_API_PAGE_START ?? "1"),
    apiUpdatedSinceParam: process.env.DSIRE_API_UPDATED_SINCE_PARAM ?? "updatedSince",
    updatedSince: args.updatedSince,
    pageSize: positiveInteger(args.pageSize, DEFAULT_PAGE_SIZE, "page size"),
    maxPages: positiveInteger(args.maxPages, DEFAULT_MAX_PAGES, "max pages"),
    limit: args.limit == null ? null : positiveInteger(args.limit, null, "limit"),
    userAgent: process.env.DSIRE_USER_AGENT ?? DEFAULT_USER_AGENT
  };

  if (mode !== "api" && mode !== "rss") {
    throw new Error(`Unsupported mode "${mode}". Use "auto", "api", or "rss".`);
  }

  if (mode === "api" && !config.apiBaseUrl) {
    throw new Error(
      "API mode requires DSIRE_API_BASE_URL or --api-base-url. Use --mode rss for the public update feed."
    );
  }

  const result = mode === "api" ? await gatherFromApi(config) : await gatherFromRss(config);
  const completedAt = new Date().toISOString();

  const outputs = await writeRunOutputs({
    config,
    startedAt,
    completedAt,
    rawRecords: result.rawRecords,
    normalizedRecords: result.normalizedRecords,
    sourceDocuments: result.sourceDocuments,
    context: result.context
  });

  console.log(`DSIRE ingestion completed in ${mode} mode.`);
  console.log(`Raw records: ${result.rawRecords.length}`);
  console.log(`Normalized opportunity candidates: ${result.normalizedRecords.length}`);
  console.log(`Run directory: ${path.relative(process.cwd(), outputs.runDir)}`);
  console.log(`Change report: ${path.relative(process.cwd(), outputs.changesPath)}`);

  if (result.context.limitations.length > 0) {
    console.log("");
    console.log("Limitations:");
    for (const limitation of result.context.limitations) {
      console.log(`- ${limitation}`);
    }
  }
}

function parseArgs(argv) {
  const args = {};

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === "--help" || arg === "-h") {
      args.help = true;
      continue;
    }

    if (!arg.startsWith("--")) {
      throw new Error(`Unexpected positional argument "${arg}".`);
    }

    const [rawKey, inlineValue] = arg.slice(2).split("=", 2);
    const key = camelCase(rawKey);
    const value = inlineValue ?? argv[index + 1];

    if (inlineValue == null) {
      index += 1;
    }

    if (value == null || value.startsWith("--")) {
      throw new Error(`Missing value for --${rawKey}.`);
    }

    args[key] = value;
  }

  return args;
}

function printHelp() {
  console.log(`
Gather DSIRE opportunity records or update-feed records.

Usage:
  npm run gather:dsire
  npm run gather:dsire:rss
  node scripts/gather-dsire-opportunities.mjs --mode api --updated-since 2026-01-01

Modes:
  auto  Uses API mode when DSIRE_API_BASE_URL is set; otherwise uses public RSS mode.
  api   Pulls program records from a configured DSIRE API endpoint.
  rss   Pulls the public DSIRE update feed. This is useful for weekly change detection,
        but it is not a full DSIRE opportunity database export.

API environment variables:
  DSIRE_API_BASE_URL              Required for API mode.
  DSIRE_API_PROGRAMS_PATH         Defaults to /programs.
  DSIRE_API_KEY                   Optional token/key.
  DSIRE_API_AUTH_HEADER           Defaults to Authorization.
  DSIRE_API_AUTH_SCHEME           Defaults to Bearer. Set to empty for raw token values.
  DSIRE_API_LIMIT_PARAM           Defaults to limit.
  DSIRE_API_OFFSET_PARAM          Defaults to offset.
  DSIRE_API_PAGE_PARAM            Optional page-number parameter name.
  DSIRE_API_PAGE_START            Defaults to 1.
  DSIRE_API_UPDATED_SINCE_PARAM   Defaults to updatedSince.
  DSIRE_USER_AGENT                Overrides the default user agent.

Options:
  --mode auto|api|rss
  --output-dir var/opportunity-ingestion/dsire
  --limit 25
  --page-size 100
  --max-pages 1000
  --updated-since 2026-01-01
  --api-base-url https://example.dsire-api-host
  --api-programs-path /programs
  --rss-url https://programs.dsireusa.org/rss/
`);
}

async function gatherFromRss(config) {
  const retrievedAt = new Date().toISOString();
  const sourceDocument = await fetchText(config.rssUrl, {
    accept: "application/rss+xml, application/xml, text/xml, */*",
    userAgent: config.userAgent
  });
  const items = parseRssItems(sourceDocument.body);
  const selectedItems = config.limit == null ? items : items.slice(0, config.limit);
  const sourceDocumentHash = sha256(sourceDocument.body);

  return {
    rawRecords: selectedItems,
    normalizedRecords: selectedItems.map((item) =>
      normalizeRssItem(item, {
        rssUrl: config.rssUrl,
        finalUrl: sourceDocument.finalUrl,
        retrievedAt,
        sourceDocumentHash
      })
    ),
    sourceDocuments: [
      {
        sourceKey: SOURCE_KEY,
        sourceName: SOURCE_NAME,
        documentType: "rss_feed",
        originalUrl: config.rssUrl,
        finalUrl: sourceDocument.finalUrl,
        contentType: sourceDocument.contentType,
        httpStatus: sourceDocument.httpStatus,
        retrievedAt,
        rawHash: sourceDocumentHash
      }
    ],
    context: {
      mode: "rss",
      isFullInventory: false,
      limitations: [
        "RSS mode reads DSIRE's public update feed only. It can detect recent added or updated programs, but it cannot gather the full DSIRE database.",
        "RSS records do not include the full eligibility, incentive, geography, or technology fields needed for final opportunity matching."
      ]
    }
  };
}

async function gatherFromApi(config) {
  const retrievedAt = new Date().toISOString();
  const rawRecords = [];
  const sourceDocuments = [];
  let nextUrl = null;

  for (let pageIndex = 0; pageIndex < config.maxPages; pageIndex += 1) {
    const requestedUrl = nextUrl ?? buildApiPageUrl(config, pageIndex);
    const response = await fetchJson(requestedUrl, {
      accept: "application/json",
      userAgent: config.userAgent,
      apiKey: config.apiKey,
      apiAuthHeader: config.apiAuthHeader,
      apiAuthScheme: config.apiAuthScheme
    });
    const pageHash = sha256(response.body);
    const payload = response.json;
    const records = extractRecordsFromApiResponse(payload);

    sourceDocuments.push({
      sourceKey: SOURCE_KEY,
      sourceName: SOURCE_NAME,
      documentType: "api_response",
      originalUrl: requestedUrl,
      finalUrl: response.finalUrl,
      contentType: response.contentType,
      httpStatus: response.httpStatus,
      retrievedAt,
      rawHash: pageHash,
      pageIndex,
      recordCount: records.length
    });

    rawRecords.push(...records);

    if (config.limit != null && rawRecords.length >= config.limit) {
      rawRecords.length = config.limit;
      break;
    }

    nextUrl = extractNextUrl(payload, response.finalUrl);
    const total = extractTotalCount(payload);

    if (records.length === 0) {
      break;
    }

    if (nextUrl) {
      continue;
    }

    if (total != null && rawRecords.length >= total) {
      break;
    }

    if (records.length < config.pageSize) {
      break;
    }
  }

  const normalizedRecords = rawRecords.map((record) => normalizeApiRecord(record, retrievedAt));

  return {
    rawRecords,
    normalizedRecords,
    sourceDocuments,
    context: {
      mode: "api",
      isFullInventory: config.updatedSince == null && config.limit == null,
      limitations:
        config.updatedSince == null
          ? []
          : ["This API run used an updated-since filter, so it is a delta pull rather than a full inventory."]
    }
  };
}

function buildApiPageUrl(config, pageIndex) {
  const apiUrl = new URL(stripLeadingSlash(config.apiProgramsPath), ensureTrailingSlash(config.apiBaseUrl));
  apiUrl.searchParams.set(config.apiLimitParam, String(config.pageSize));

  if (config.apiPageParam) {
    apiUrl.searchParams.set(config.apiPageParam, String(config.apiPageStart + pageIndex));
  } else {
    apiUrl.searchParams.set(config.apiOffsetParam, String(pageIndex * config.pageSize));
  }

  if (config.updatedSince) {
    apiUrl.searchParams.set(config.apiUpdatedSinceParam, config.updatedSince);
  }

  return apiUrl.toString();
}

async function fetchJson(url, options) {
  const response = await fetchText(url, options);
  const json = JSON.parse(response.body);
  return { ...response, json };
}

async function fetchText(url, { accept, userAgent, apiKey, apiAuthHeader, apiAuthScheme }) {
  const headers = {
    Accept: accept,
    "User-Agent": userAgent
  };

  if (apiKey) {
    headers[apiAuthHeader] = apiAuthScheme ? `${apiAuthScheme} ${apiKey}` : apiKey;
  }

  const response = await fetch(url, { headers });
  const body = await response.text();
  const contentType = response.headers.get("content-type") ?? "unknown";

  if (!response.ok) {
    const bodyPreview = body.replace(/\s+/g, " ").slice(0, 300);
    throw new Error(`Request failed with ${response.status} ${response.statusText} for ${url}: ${bodyPreview}`);
  }

  return {
    body,
    contentType,
    finalUrl: response.url,
    httpStatus: response.status
  };
}

function parseRssItems(xml) {
  const itemPattern = /<item\b[^>]*>([\s\S]*?)<\/item>/gi;
  const items = [];
  let match;

  while ((match = itemPattern.exec(xml)) != null) {
    const itemXml = match[1];
    items.push({
      title: readXmlTag(itemXml, "title"),
      description: stripHtml(readXmlTag(itemXml, "description")),
      link: readXmlTag(itemXml, "link"),
      guid: readXmlTag(itemXml, "guid"),
      publishedAt: normalizeDate(readXmlTag(itemXml, "pubDate")),
      rawXmlHash: sha256(itemXml)
    });
  }

  return items;
}

function readXmlTag(xml, tagName) {
  const pattern = new RegExp(`<${tagName}\\b[^>]*>([\\s\\S]*?)<\\/${tagName}>`, "i");
  const match = xml.match(pattern);
  if (!match) {
    return null;
  }

  return decodeXml(stripCdata(match[1].trim())).trim() || null;
}

function stripCdata(value) {
  return value.replace(/^<!\[CDATA\[/, "").replace(/\]\]>$/, "");
}

function decodeXml(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

function stripHtml(value) {
  if (value == null) {
    return null;
  }

  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() || null;
}

function normalizeRssItem(item, context) {
  const titleParts = parseRssTitle(item.title);
  const sourceUrl = item.link ?? context.finalUrl ?? context.rssUrl;
  const rawForHash = {
    title: item.title,
    description: item.description,
    link: item.link,
    guid: item.guid,
    publishedAt: item.publishedAt
  };
  const contentHash = sha256(stableStringify(rawForHash));

  return {
    sourceKey: SOURCE_KEY,
    sourceName: SOURCE_NAME,
    ingestionMode: "rss_delta_feed",
    recordKind: "dsire_rss_update",
    externalId: titleParts.programCode ?? item.guid ?? contentHash,
    externalIdType: titleParts.programCode ? "dsire_program_code" : "rss_guid_or_hash",
    canonicalTitle: titleParts.programName ?? item.title ?? "Untitled DSIRE update",
    sourceUrl,
    status: "unknown",
    programType: "unknown",
    state: inferStateFromProgramCode(titleParts.programCode),
    summary: item.description,
    publishedAt: item.publishedAt,
    dsire: {
      changeAction: titleParts.changeAction,
      programCode: titleParts.programCode,
      rssGuid: item.guid,
      rawTitle: item.title
    },
    evidence: [
      {
        sourceName: SOURCE_NAME,
        sourceUrl,
        documentType: "rss_item",
        retrievedAt: context.retrievedAt,
        rawContentHash: item.rawXmlHash,
        parentDocumentHash: context.sourceDocumentHash
      }
    ],
    contentHash,
    raw: item
  };
}

function parseRssTitle(title) {
  if (!title) {
    return {
      changeAction: "unknown",
      programCode: null,
      programName: null
    };
  }

  const match = title.match(/^(Added|Updated|Removed|Deleted)\s+([^:]+):\s*(.+)$/i);
  if (!match) {
    return {
      changeAction: "unknown",
      programCode: null,
      programName: title
    };
  }

  return {
    changeAction: match[1].toLowerCase(),
    programCode: match[2].trim(),
    programName: match[3].trim()
  };
}

function normalizeApiRecord(record, retrievedAt) {
  const externalId = coalesce(
    readPath(record, "id"),
    readPath(record, "programId"),
    readPath(record, "program_id"),
    readPath(record, "programCode"),
    readPath(record, "program_code"),
    readPath(record, "code")
  );
  const canonicalTitle =
    coalesce(readPath(record, "name"), readPath(record, "title"), readPath(record, "programName")) ??
    "Untitled DSIRE program";
  const contentHash = sha256(stableStringify(record));
  const sourceUrl =
    coalesce(readPath(record, "url"), readPath(record, "websiteUrl"), readPath(record, "detailUrl")) ??
    buildLikelyDsireDetailUrl(externalId, canonicalTitle);

  return {
    sourceKey: SOURCE_KEY,
    sourceName: SOURCE_NAME,
    ingestionMode: "licensed_api",
    recordKind: "canonical_candidate",
    externalId: externalId == null ? contentHash : String(externalId),
    externalIdType: externalId == null ? "content_hash" : "dsire_program_id",
    canonicalTitle,
    sourceUrl,
    status: normalizeStatus(coalesce(readPath(record, "status"), readPath(record, "programStatus"))),
    programType: coalesce(
      readPath(record, "type.name"),
      readPath(record, "typeObj.name"),
      readPath(record, "incentiveType.name"),
      readPath(record, "categoryObj.name"),
      readPath(record, "type"),
      readPath(record, "incentiveType")
    ),
    state: coalesce(
      readPath(record, "state.abbreviation"),
      readPath(record, "stateObj.abbreviation"),
      readPath(record, "stateCode"),
      readPath(record, "state")
    ),
    geography: compactObject({
      state: coalesce(
        readPath(record, "state.abbreviation"),
        readPath(record, "stateObj.abbreviation"),
        readPath(record, "stateCode"),
        readPath(record, "state")
      ),
      counties: normalizeNameList(coalesce(readPath(record, "counties"), readPath(record, "county"))),
      cities: normalizeNameList(coalesce(readPath(record, "cities"), readPath(record, "city"))),
      zipCodes: normalizeNameList(coalesce(readPath(record, "zipCodes"), readPath(record, "zip_codes")))
    }),
    administrator: coalesce(
      readPath(record, "administrator"),
      readPath(record, "administeredBy"),
      readPath(record, "implementingSector.name"),
      readPath(record, "implementingSectorObj.name"),
      readPath(record, "implementingSector")
    ),
    sectors: normalizeNameList(
      coalesce(readPath(record, "sectors"), readPath(record, "eligibleSectors"), readPath(record, "sectorObj"))
    ),
    technologies: normalizeNameList(
      coalesce(readPath(record, "technologies"), readPath(record, "energyCategories"), readPath(record, "technologyObj"))
    ),
    updatedAt: normalizeDate(
      coalesce(readPath(record, "updatedTs"), readPath(record, "updatedAt"), readPath(record, "updated_at"))
    ),
    createdAt: normalizeDate(
      coalesce(readPath(record, "createdTs"), readPath(record, "createdAt"), readPath(record, "created_at"))
    ),
    evidence: [
      {
        sourceName: SOURCE_NAME,
        sourceUrl,
        documentType: "api_record",
        retrievedAt,
        rawContentHash: contentHash
      }
    ],
    contentHash,
    raw: record
  };
}

function extractRecordsFromApiResponse(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  const candidates = [
    payload?.data,
    payload?.records,
    payload?.programs,
    payload?.items,
    payload?.results,
    payload?.data?.records,
    payload?.data?.programs,
    payload?.data?.items,
    payload?.data?.results
  ];

  for (const candidate of candidates) {
    if (Array.isArray(candidate)) {
      return candidate;
    }
  }

  throw new Error("Could not find a program array in the DSIRE API response.");
}

function extractNextUrl(payload, finalUrl) {
  const next = coalesce(
    readPath(payload, "next"),
    readPath(payload, "links.next"),
    readPath(payload, "pagination.next"),
    readPath(payload, "meta.next")
  );

  if (!next) {
    return null;
  }

  return new URL(String(next), finalUrl).toString();
}

function extractTotalCount(payload) {
  const total = coalesce(
    readPath(payload, "total"),
    readPath(payload, "count"),
    readPath(payload, "recordsTotal"),
    readPath(payload, "meta.total"),
    readPath(payload, "pagination.total")
  );

  if (total == null || Number.isNaN(Number(total))) {
    return null;
  }

  return Number(total);
}

async function writeRunOutputs({ config, startedAt, completedAt, rawRecords, normalizedRecords, sourceDocuments, context }) {
  const safeTimestamp = startedAt.replace(/[:.]/g, "-");
  const runId = `dsire-${config.mode}-${safeTimestamp}`;
  const runDir = path.join(config.outputDir, "runs", runId);
  await mkdir(runDir, { recursive: true });

  const rawPath = path.join(runDir, "raw-records.json");
  const normalizedPath = path.join(runDir, "normalized-opportunities.json");
  const sourceDocumentsPath = path.join(runDir, "source-documents.json");
  const changesPath = path.join(runDir, "changes.json");
  const manifestPath = path.join(runDir, "run-manifest.json");
  const latestNormalizedPath = path.join(config.outputDir, "latest-normalized-opportunities.json");
  const latestManifestPath = path.join(config.outputDir, "latest-run-manifest.json");

  const previousNormalized = await readJsonIfExists(latestNormalizedPath);
  const changes = buildChangeReport(previousNormalized ?? [], normalizedRecords, {
    includeRemoved: context.isFullInventory
  });
  const manifest = {
    runId,
    sourceKey: SOURCE_KEY,
    sourceName: SOURCE_NAME,
    requestedMode: config.requestedMode,
    mode: config.mode,
    startedAt,
    completedAt,
    isFullInventory: context.isFullInventory,
    updatedSince: config.updatedSince ?? null,
    pageSize: config.mode === "api" ? config.pageSize : null,
    maxPages: config.mode === "api" ? config.maxPages : null,
    limit: config.limit,
    counts: {
      rawRecords: rawRecords.length,
      normalizedRecords: normalizedRecords.length,
      sourceDocuments: sourceDocuments.length,
      newRecords: changes.summary.newRecords,
      changedRecords: changes.summary.changedRecords,
      unchangedRecords: changes.summary.unchangedRecords,
      removedRecords: changes.summary.removedRecords
    },
    outputs: {
      rawRecords: relativePath(rawPath),
      normalizedOpportunities: relativePath(normalizedPath),
      sourceDocuments: relativePath(sourceDocumentsPath),
      changes: relativePath(changesPath),
      latestNormalizedOpportunities: relativePath(latestNormalizedPath),
      latestRunManifest: relativePath(latestManifestPath)
    },
    limitations: context.limitations,
    notes: [
      "These records are ingestion artifacts, not yet published opportunity database rows.",
      "Relational opportunity tables, migrations, scheduled jobs, queue workers, and admin review publishing are planned separately."
    ]
  };

  await writeJson(rawPath, rawRecords);
  await writeJson(normalizedPath, normalizedRecords);
  await writeJson(sourceDocumentsPath, sourceDocuments);
  await writeJson(changesPath, changes);
  await writeJson(manifestPath, manifest);
  await writeJson(latestNormalizedPath, normalizedRecords);
  await writeJson(latestManifestPath, manifest);

  return {
    runDir,
    rawPath,
    normalizedPath,
    sourceDocumentsPath,
    changesPath,
    manifestPath
  };
}

function buildChangeReport(previousRecords, currentRecords, { includeRemoved }) {
  const previousByKey = indexByRecordKey(previousRecords);
  const currentByKey = indexByRecordKey(currentRecords);
  const newRecords = [];
  const changedRecords = [];
  const unchangedRecords = [];
  const removedRecords = [];

  for (const current of currentRecords) {
    const key = recordKey(current);
    const previous = previousByKey.get(key);

    if (!previous) {
      newRecords.push(summaryRecord(current));
      continue;
    }

    if (previous.contentHash !== current.contentHash) {
      changedRecords.push({
        before: summaryRecord(previous),
        after: summaryRecord(current)
      });
      continue;
    }

    unchangedRecords.push(summaryRecord(current));
  }

  if (includeRemoved) {
    for (const previous of previousRecords) {
      if (!currentByKey.has(recordKey(previous))) {
        removedRecords.push(summaryRecord(previous));
      }
    }
  }

  return {
    summary: {
      previousRecords: previousRecords.length,
      currentRecords: currentRecords.length,
      newRecords: newRecords.length,
      changedRecords: changedRecords.length,
      unchangedRecords: unchangedRecords.length,
      removedRecords: removedRecords.length,
      removedDetectionEnabled: includeRemoved
    },
    newRecords,
    changedRecords,
    removedRecords
  };
}

function indexByRecordKey(records) {
  const map = new Map();
  for (const record of records) {
    map.set(recordKey(record), record);
  }
  return map;
}

function recordKey(record) {
  return `${record.sourceKey}:${record.externalIdType}:${record.externalId}`;
}

function summaryRecord(record) {
  return {
    key: recordKey(record),
    title: record.canonicalTitle,
    sourceUrl: record.sourceUrl,
    state: record.state ?? null,
    programType: record.programType ?? null,
    status: record.status ?? null,
    contentHash: record.contentHash
  };
}

async function readJsonIfExists(filePath) {
  try {
    return JSON.parse(await readFile(filePath, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") {
      return null;
    }
    throw error;
  }
}

async function writeJson(filePath, value) {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function normalizeNameList(value) {
  if (value == null || value === "") {
    return [];
  }

  if (Array.isArray(value)) {
    return value.map((item) => normalizeName(item)).filter(Boolean);
  }

  if (typeof value === "object") {
    return [normalizeName(value)].filter(Boolean);
  }

  return String(value)
    .split(/[,;]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeName(value) {
  if (value == null) {
    return null;
  }

  if (typeof value === "object") {
    return coalesce(value.name, value.title, value.abbreviation, value.code, value.id);
  }

  return String(value).trim() || null;
}

function normalizeStatus(value) {
  if (!value) {
    return "unknown";
  }

  return String(value).trim().toLowerCase().replace(/\s+/g, "_");
}

function normalizeDate(value) {
  if (!value) {
    return null;
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return String(value);
  }

  return parsed.toISOString();
}

function inferStateFromProgramCode(programCode) {
  if (!programCode) {
    return null;
  }

  const match = String(programCode).match(/^([A-Z]{2})/);
  return match ? match[1] : null;
}

function buildLikelyDsireDetailUrl(externalId, title) {
  if (externalId == null || title == null) {
    return "https://programs.dsireusa.org/system/program";
  }

  return `https://programs.dsireusa.org/system/program/detail/${encodeURIComponent(String(externalId))}/${slugify(title)}`;
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function readPath(value, pathExpression) {
  return pathExpression.split(".").reduce((current, part) => {
    if (current == null) {
      return null;
    }
    return current[part];
  }, value);
}

function coalesce(...values) {
  for (const value of values) {
    if (value != null && value !== "") {
      return value;
    }
  }
  return null;
}

function compactObject(value) {
  return Object.fromEntries(
    Object.entries(value).filter(([, item]) => {
      if (Array.isArray(item)) {
        return item.length > 0;
      }
      return item != null && item !== "";
    })
  );
}

function stableStringify(value) {
  if (Array.isArray(value)) {
    return `[${value.map((item) => stableStringify(item)).join(",")}]`;
  }

  if (value && typeof value === "object") {
    return `{${Object.keys(value)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`)
      .join(",")}}`;
  }

  return JSON.stringify(value);
}

function sha256(value) {
  return createHash("sha256").update(String(value)).digest("hex");
}

function ensureTrailingSlash(value) {
  return value.endsWith("/") ? value : `${value}/`;
}

function stripLeadingSlash(value) {
  return value.replace(/^\/+/, "");
}

function relativePath(filePath) {
  return path.relative(process.cwd(), filePath);
}

function camelCase(value) {
  return value.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

function positiveInteger(value, fallback, label) {
  if (value == null) {
    if (fallback == null) {
      throw new Error(`Missing ${label}.`);
    }
    return fallback;
  }

  const number = Number(value);
  if (!Number.isInteger(number) || number <= 0) {
    throw new Error(`Invalid ${label}: ${value}. Expected a positive integer.`);
  }

  return number;
}
