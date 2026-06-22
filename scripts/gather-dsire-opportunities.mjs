#!/usr/bin/env node

import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { BatchWriteCommand, DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { fromIni } from "@aws-sdk/credential-providers";

const SOURCE_KEY = "SOURCE_DSIRE";
const SOURCE_NAME = "DSIRE";
const DEFAULT_OUTPUT_DIR = "var/opportunity-ingestion/dsire";
const DEFAULT_RSS_URL = "https://programs.dsireusa.org/rss/";
const DEFAULT_PUBLIC_API_BASE_URL = "https://programs.dsireusa.org/api/v1/";
const DEFAULT_PUBLIC_PROGRAMS_PATH = "/programs";
const DEFAULT_PUBLIC_REFERER = "https://programs.dsireusa.org/system/program";
const DEFAULT_PROGRAMS_PATH = "/programs";
const DEFAULT_PAGE_SIZE = 100;
const DEFAULT_PUBLIC_PAGE_SIZE = 500;
const DEFAULT_MAX_PAGES = 1000;
const DEFAULT_DYNAMODB_TABLE = "gbs-opportunity-candidates";
const DEFAULT_AWS_REGION = "us-east-2";
const DEFAULT_AWS_PROFILE = "gbs";
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
  const requestedMode = normalizeMode(args.mode ?? "auto");
  const apiBaseUrl = args.apiBaseUrl ?? process.env.DSIRE_API_BASE_URL;
  const mode = requestedMode === "auto" ? (apiBaseUrl ? "api" : "public-table") : requestedMode;
  const runId = `dsire-${mode}-${safeTimestamp(startedAt)}`;

  const config = {
    mode,
    requestedMode,
    outputDir: path.resolve(process.cwd(), args.outputDir ?? DEFAULT_OUTPUT_DIR),
    rssUrl: args.rssUrl ?? process.env.DSIRE_RSS_URL ?? DEFAULT_RSS_URL,
    publicApiBaseUrl: args.publicApiBaseUrl ?? process.env.DSIRE_PUBLIC_API_BASE_URL ?? DEFAULT_PUBLIC_API_BASE_URL,
    publicProgramsPath:
      args.publicProgramsPath ?? process.env.DSIRE_PUBLIC_PROGRAMS_PATH ?? DEFAULT_PUBLIC_PROGRAMS_PATH,
    publicReferer: args.publicReferer ?? process.env.DSIRE_PUBLIC_REFERER ?? DEFAULT_PUBLIC_REFERER,
    publicCategory: args.publicCategory ?? process.env.DSIRE_PUBLIC_CATEGORY ?? "financial",
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
    pageSize: positiveInteger(
      args.pageSize,
      mode === "public-table" ? DEFAULT_PUBLIC_PAGE_SIZE : DEFAULT_PAGE_SIZE,
      "page size"
    ),
    maxPages: positiveInteger(args.maxPages, DEFAULT_MAX_PAGES, "max pages"),
    limit: args.limit == null ? null : positiveInteger(args.limit, null, "limit"),
    writeDynamodb: parseBoolean(args.writeDynamodb, false),
    dynamodbTable: args.dynamodbTable ?? process.env.GBS_OPPORTUNITIES_TABLE ?? DEFAULT_DYNAMODB_TABLE,
    awsRegion: args.awsRegion ?? process.env.AWS_REGION ?? DEFAULT_AWS_REGION,
    awsProfile: args.awsProfile ?? process.env.AWS_PROFILE ?? DEFAULT_AWS_PROFILE,
    userAgent: process.env.DSIRE_USER_AGENT ?? DEFAULT_USER_AGENT
  };

  if (mode !== "api" && mode !== "rss" && mode !== "public-table") {
    throw new Error(`Unsupported mode "${mode}". Use "auto", "public-table", "api", or "rss".`);
  }

  if (mode === "api" && !config.apiBaseUrl) {
    throw new Error(
      "API mode requires DSIRE_API_BASE_URL or --api-base-url. Use --mode rss for the public update feed."
    );
  }

  const result =
    mode === "api"
      ? await gatherFromApi(config)
      : mode === "rss"
        ? await gatherFromRss(config)
        : await gatherFromPublicTable(config);
  const validation = validateNormalizedRecords(result.normalizedRecords, {
    checkedAt: new Date().toISOString()
  });
  const dynamodbWrite =
    config.writeDynamodb && validation.summary.writableRecords > 0
      ? await writeDynamodbRecords(validation.records, config, {
          runId,
          startedAt
        })
      : null;
  const completedAt = new Date().toISOString();

  const outputs = await writeRunOutputs({
    runId,
    config,
    startedAt,
    completedAt,
    rawRecords: result.rawRecords,
    normalizedRecords: validation.records,
    sourceDocuments: result.sourceDocuments,
    context: result.context,
    validation,
    dynamodbWrite
  });

  console.log(`DSIRE ingestion completed in ${mode} mode.`);
  console.log(`Raw records: ${result.rawRecords.length}`);
  console.log(`Normalized opportunity candidates: ${validation.records.length}`);
  console.log(`Validation: ${validation.summary.writableRecords} writable, ${validation.summary.rejectedRecords} rejected`);
  if (dynamodbWrite) {
    console.log(
      `DynamoDB write: ${dynamodbWrite.createdRecords} created, ${dynamodbWrite.updatedRecords} updated, ${dynamodbWrite.unchangedRecords} unchanged in ${dynamodbWrite.tableName}`
    );
  }
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

async function gatherFromPublicTable(config) {
  const retrievedAt = new Date().toISOString();
  const rawRecords = [];
  const sourceDocuments = [];
  let recordsTotal = null;
  let recordsFiltered = null;

  for (let pageIndex = 0; pageIndex < config.maxPages; pageIndex += 1) {
    const requestedUrl = buildPublicTablePageUrl(config, pageIndex);
    const response = await fetchJson(requestedUrl, {
      accept: "application/json, text/javascript, */*; q=0.01",
      userAgent: config.userAgent,
      headers: {
        Referer: config.publicReferer,
        "X-Requested-With": "XMLHttpRequest"
      }
    });
    const pageHash = sha256(response.body);
    const payload = response.json;
    const records = extractRecordsFromApiResponse(payload);

    recordsTotal = extractTotalCount(payload) ?? recordsTotal;
    recordsFiltered = extractFilteredCount(payload) ?? recordsFiltered ?? recordsTotal;

    sourceDocuments.push({
      sourceKey: SOURCE_KEY,
      sourceName: SOURCE_NAME,
      documentType: "public_table_api_response",
      originalUrl: requestedUrl,
      finalUrl: response.finalUrl,
      contentType: response.contentType,
      httpStatus: response.httpStatus,
      retrievedAt,
      rawHash: pageHash,
      pageIndex,
      recordCount: records.length,
      recordsTotal,
      recordsFiltered,
      publicCategory: config.publicCategory
    });

    rawRecords.push(...records);

    if (config.limit != null && rawRecords.length >= config.limit) {
      rawRecords.length = config.limit;
      break;
    }

    const expectedCount = recordsFiltered ?? recordsTotal;

    if (records.length === 0) {
      break;
    }

    if (expectedCount != null && rawRecords.length >= expectedCount) {
      break;
    }

    if (records.length < config.pageSize) {
      break;
    }
  }

  const normalizedRecords = rawRecords.map((record) =>
    normalizeApiRecord(record, retrievedAt, {
      ingestionMode: "public_table_inventory",
      recordKind: "canonical_candidate",
      sourceDocumentType: "public_table_record"
    })
  );

  const limitations = [];
  if (config.publicCategory === "financial") {
    limitations.push(
      "Public table mode imports DSIRE Financial Incentive records by default. Use --public-category all if regulatory policies should also be loaded."
    );
  }
  if (config.limit != null) {
    limitations.push("This run used --limit, so it is not a full inventory.");
  }

  return {
    rawRecords,
    normalizedRecords,
    sourceDocuments,
    context: {
      mode: "public-table",
      isFullInventory: config.limit == null,
      recordsTotal,
      recordsFiltered,
      publicCategory: config.publicCategory,
      limitations
    }
  };
}

function parseArgs(argv) {
  const args = {};
  const booleanFlags = new Set(["write-dynamodb"]);

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

    if (booleanFlags.has(rawKey) && inlineValue == null) {
      args[key] = true;
      continue;
    }

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
  npm run gather:dsire:public
  node scripts/gather-dsire-opportunities.mjs --mode api --updated-since 2026-01-01

Modes:
  auto          Uses API mode when DSIRE_API_BASE_URL is set; otherwise uses public-table mode.
  public-table  Pulls the current DSIRE public table inventory from /api/v1/programs.
  api           Pulls program records from a configured DSIRE API endpoint.
  rss           Pulls the public DSIRE update feed. This is useful for weekly change detection,
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

Public table options:
  DSIRE_PUBLIC_API_BASE_URL       Defaults to https://programs.dsireusa.org/api/v1/.
  DSIRE_PUBLIC_PROGRAMS_PATH      Defaults to /programs.
  DSIRE_PUBLIC_REFERER            Defaults to https://programs.dsireusa.org/system/program.
  DSIRE_PUBLIC_CATEGORY           financial, regulatory, or all. Defaults to financial.

Options:
  --mode auto|public-table|api|rss
  --output-dir var/opportunity-ingestion/dsire
  --limit 25
  --page-size 500
  --max-pages 1000
  --updated-since 2026-01-01
  --public-category financial|regulatory|all
  --api-base-url https://example.dsire-api-host
  --api-programs-path /programs
  --rss-url https://programs.dsireusa.org/rss/
  --write-dynamodb
  --dynamodb-table gbs-opportunity-candidates
  --aws-profile gbs
  --aws-region us-east-2
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

function buildPublicTablePageUrl(config, pageIndex) {
  const publicUrl = new URL(stripLeadingSlash(config.publicProgramsPath), ensureTrailingSlash(config.publicApiBaseUrl));
  publicUrl.searchParams.set("draw", String(pageIndex + 1));
  publicUrl.searchParams.set("start", String(pageIndex * config.pageSize));
  publicUrl.searchParams.set("length", String(config.pageSize));

  for (const categoryId of publicCategoryIds(config.publicCategory)) {
    publicUrl.searchParams.append("category[]", categoryId);
  }

  return publicUrl.toString();
}

function publicCategoryIds(category) {
  switch (String(category || "financial").toLowerCase()) {
    case "all":
      return [];
    case "financial":
    case "financial-incentive":
    case "financial_incentive":
      return ["1"];
    case "regulatory":
    case "regulatory-policy":
    case "regulatory_policy":
      return ["2"];
    default:
      throw new Error(`Unsupported public DSIRE category "${category}". Use financial, regulatory, or all.`);
  }
}

async function fetchJson(url, options) {
  const response = await fetchText(url, options);
  const json = JSON.parse(response.body);
  return { ...response, json };
}

async function fetchText(url, { accept, userAgent, apiKey, apiAuthHeader, apiAuthScheme, headers: extraHeaders = {} }) {
  const headers = {
    Accept: accept,
    "User-Agent": userAgent,
    ...extraHeaders
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

function validateNormalizedRecords(records, { checkedAt }) {
  const validatedRecords = records.map((record) => {
    const criticalIssues = [];
    const warnings = [];

    if (!record.sourceKey) {
      criticalIssues.push("missing_source_key");
    }

    if (!record.sourceName) {
      criticalIssues.push("missing_source_name");
    }

    if (!record.sourceUrl) {
      criticalIssues.push("missing_source_url");
    }

    if (!record.origin?.sourceKey || !record.origin?.sourceName || !record.origin?.sourceUrl) {
      criticalIssues.push("missing_origin_metadata");
    }

    if (!Array.isArray(record.evidence) || record.evidence.length === 0) {
      criticalIssues.push("missing_source_evidence");
    }

    if (!record.externalId) {
      criticalIssues.push("missing_external_id");
    } else if (record.externalIdType !== "dsire_program_id" && String(record.externalId).trim().length < 3) {
      criticalIssues.push("short_external_id");
    }

    if (!record.canonicalTitle || String(record.canonicalTitle).trim().length < 4) {
      criticalIssues.push("missing_or_short_canonical_title");
    }

    if (!record.contentHash || String(record.contentHash).length !== 64) {
      criticalIssues.push("missing_or_invalid_content_hash");
    }

    if (record.ingestionMode === "rss_delta_feed") {
      if (!record.dsire?.programCode || !/^[A-Z]{2}\d+[A-Z]?$/.test(record.dsire.programCode)) {
        criticalIssues.push("missing_or_invalid_dsire_program_code");
      }

      if (!record.publishedAt) {
        warnings.push("missing_published_at");
      }

      warnings.push("rss_record_contains_update_summary_not_full_program_details");
    }

    if (record.ingestionMode === "public_table_inventory") {
      if (!record.dsire?.programId) {
        criticalIssues.push("missing_dsire_program_id");
      }

      if (!record.category) {
        warnings.push("missing_category");
      }

      if (!record.programType) {
        warnings.push("missing_program_type");
      }

      if (!record.summary) {
        warnings.push("missing_clean_summary");
      }

      if (record.published !== true) {
        warnings.push("record_not_marked_published_by_dsire");
      }
    }

    const isWritable = criticalIssues.length === 0;

    return {
      ...record,
      reviewStatus: isWritable ? "needs_review" : "rejected",
      dataQuality: {
        validator: "dsire-opportunity-validator-v1",
        checkedAt,
        status: isWritable && warnings.length === 0 ? "clean" : isWritable ? "clean_with_limitations" : "rejected",
        isWritable,
        criticalIssues,
        warnings
      }
    };
  });

  const keyCounts = new Map();
  for (const record of validatedRecords) {
    const key = recordKey(record);
    keyCounts.set(key, (keyCounts.get(key) || 0) + 1);
  }

  const dedupedValidatedRecords = validatedRecords.map((record) => {
    const key = recordKey(record);
    if (keyCounts.get(key) === 1) {
      return record;
    }

    const criticalIssues = [...record.dataQuality.criticalIssues, "duplicate_record_key_in_current_run"];
    return {
      ...record,
      reviewStatus: "rejected",
      dataQuality: {
        ...record.dataQuality,
        status: "rejected",
        isWritable: false,
        criticalIssues
      }
    };
  });

  const writableRecords = dedupedValidatedRecords.filter((record) => record.dataQuality.isWritable);
  const rejectedRecords = dedupedValidatedRecords.filter((record) => !record.dataQuality.isWritable);

  return {
    records: dedupedValidatedRecords,
    writableRecords,
    rejectedRecords,
    summary: {
      totalRecords: dedupedValidatedRecords.length,
      writableRecords: writableRecords.length,
      rejectedRecords: rejectedRecords.length,
      warningRecords: dedupedValidatedRecords.filter((record) => record.dataQuality.warnings.length > 0).length
    }
  };
}

async function writeDynamodbRecords(records, config, { runId, startedAt }) {
  const writableRecords = records.filter((record) => record.dataQuality?.isWritable);
  const db = createDynamodbDocumentClient(config);
  const existingRecords = await scanExistingDynamodbRecords(db, config.dynamodbTable);
  const summary = {
    tableName: config.dynamodbTable,
    region: config.awsRegion,
    profile: config.awsProfile,
    attemptedRecords: writableRecords.length,
    createdRecords: 0,
    updatedRecords: 0,
    unchangedRecords: 0,
    skippedRecords: records.length - writableRecords.length
  };
  const items = [];

  for (const record of writableRecords) {
    const opportunityId = recordKey(record);
    const previous = existingRecords.get(opportunityId) || null;
    const now = new Date().toISOString();
    const item = buildDynamodbOpportunityItem(record, {
      opportunityId,
      runId,
      firstSeenAt: previous?.firstSeenAt || startedAt,
      createdAt: previous?.createdAt || startedAt,
      updatedAt: previous && previous.contentHash === record.contentHash ? previous.updatedAt || now : now,
      lastSeenAt: now,
      previousContentHash: previous?.contentHash || null
    });

    items.push(item);

    if (!previous) {
      summary.createdRecords += 1;
    } else if (previous.contentHash === record.contentHash) {
      summary.unchangedRecords += 1;
    } else {
      summary.updatedRecords += 1;
    }
  }

  await batchWriteDynamodbItems(db, config.dynamodbTable, items);

  return summary;
}

async function scanExistingDynamodbRecords(db, tableName) {
  const records = new Map();
  let ExclusiveStartKey;

  do {
    const response = await db.send(
      new ScanCommand({
        TableName: tableName,
        ProjectionExpression: "opportunityId, contentHash, firstSeenAt, createdAt, updatedAt",
        ExclusiveStartKey
      })
    );

    for (const item of response.Items || []) {
      records.set(item.opportunityId, item);
    }

    ExclusiveStartKey = response.LastEvaluatedKey;
  } while (ExclusiveStartKey);

  return records;
}

async function batchWriteDynamodbItems(db, tableName, items) {
  for (const chunk of chunks(items, 25)) {
    let RequestItems = {
      [tableName]: chunk.map((Item) => ({
        PutRequest: { Item }
      }))
    };
    let attempt = 0;

    while ((RequestItems[tableName] || []).length > 0) {
      const response = await db.send(new BatchWriteCommand({ RequestItems }));
      const unprocessedItems = response.UnprocessedItems?.[tableName] || [];

      if (unprocessedItems.length === 0) {
        break;
      }

      attempt += 1;
      await sleep(Math.min(250 * 2 ** attempt, 5000));
      RequestItems = {
        [tableName]: unprocessedItems
      };
    }
  }
}

function createDynamodbDocumentClient(config) {
  const client = new DynamoDBClient({
    region: config.awsRegion,
    credentials: config.awsProfile ? fromIni({ profile: config.awsProfile }) : undefined
  });

  return DynamoDBDocumentClient.from(client, {
    marshallOptions: {
      removeUndefinedValues: true
    }
  });
}

function buildDynamodbOpportunityItem(record, metadata) {
  return {
    opportunityId: metadata.opportunityId,
    sourceKey: record.sourceKey,
    sourceName: record.sourceName,
    externalId: String(record.externalId),
    externalIdType: record.externalIdType,
    canonicalTitle: record.canonicalTitle,
    normalizedTitle: normalizeComparableText(record.canonicalTitle),
    sourceUrl: record.sourceUrl,
    origin: record.origin,
    status: record.status,
    category: record.category,
    categoryId: record.categoryId,
    programType: record.programType,
    programTypeId: record.programTypeId,
    state: record.state,
    stateName: record.stateName,
    summary: record.summary,
    summaryHtml: record.summaryHtml,
    publishedAt: record.publishedAt,
    published: record.published,
    websiteUrl: record.websiteUrl,
    lastUpdated: record.lastUpdated,
    sourceCreatedAt: record.sourceCreatedAt,
    startDate: record.startDate,
    endDate: record.endDate,
    fundingSource: record.fundingSource,
    budget: record.budget,
    details: record.details,
    ingestionMode: record.ingestionMode,
    recordKind: record.recordKind,
    contentHash: record.contentHash,
    previousContentHash: metadata.previousContentHash,
    dsire: record.dsire,
    geography: record.geography,
    administrator: record.administrator,
    implementingSector: record.implementingSector,
    sectors: record.sectors,
    eligibleSectors: record.eligibleSectors,
    technologies: record.technologies,
    technologyRecords: record.technologyRecords,
    parameterSets: record.parameterSets,
    dsireClone: record.dsireClone,
    evidence: record.evidence,
    raw: record.raw,
    dataQuality: record.dataQuality,
    reviewStatus: record.reviewStatus,
    ingestRunId: metadata.runId,
    firstSeenAt: metadata.firstSeenAt,
    lastSeenAt: metadata.lastSeenAt,
    createdAt: metadata.createdAt,
    updatedAt: metadata.updatedAt
  };
}

function normalizeComparableText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
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

function decodeHtmlEntities(value) {
  return decodeXml(value)
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)));
}

function cleanHtmlText(value) {
  if (value == null) {
    return null;
  }

  return (
    decodeHtmlEntities(String(value))
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/(p|li|div|tr|h[1-6])>/gi, "\n")
      .replace(/<[^>]+>/g, " ")
      .replace(/[ \t\r\f\v]+/g, " ")
      .replace(/\n\s+/g, "\n")
      .replace(/\s*\n\s*/g, "\n")
      .replace(/\n{2,}/g, "\n")
      .trim()
      .replace(/\s+/g, " ") || null
  );
}

function stripHtml(value) {
  return cleanHtmlText(value);
}

function normalizeRssItem(item, context) {
  const titleParts = parseRssTitle(item.title);
  const sourceUrl = item.link ?? context.finalUrl ?? context.rssUrl;
  const titleFingerprint = titleParts.programName
    ? sha256(normalizeComparableText(titleParts.programName)).slice(0, 12)
    : null;
  const rawForHash = {
    title: item.title,
    description: item.description,
    link: item.link,
    guid: item.guid,
    publishedAt: item.publishedAt
  };
  const contentHash = sha256(stableStringify(rawForHash));

  const normalizedRecord = {
    sourceKey: SOURCE_KEY,
    sourceName: SOURCE_NAME,
    ingestionMode: "rss_delta_feed",
    recordKind: "dsire_rss_update",
    externalId:
      titleParts.programCode && titleFingerprint
        ? `${titleParts.programCode}:${titleFingerprint}`
        : titleParts.programCode ?? item.guid ?? contentHash,
    externalIdType:
      titleParts.programCode && titleFingerprint
        ? "dsire_program_code_title_hash"
        : titleParts.programCode
          ? "dsire_program_code"
          : "rss_guid_or_hash",
    canonicalTitle: titleParts.programName ?? item.title ?? "Untitled DSIRE update",
    sourceUrl,
    origin: buildOrigin(sourceUrl, "rss_feed"),
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

  return {
    ...normalizedRecord,
    dsireClone: buildDsireCloneRecord(normalizedRecord)
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

function normalizeApiRecord(record, retrievedAt, options = {}) {
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
    coalesce(readPath(record, "detailUrl"), readPath(record, "dsireUrl"), readPath(record, "url")) ??
    buildLikelyDsireDetailUrl(externalId, canonicalTitle);
  const websiteUrl = cleanUrl(readPath(record, "websiteUrl"));
  const category = coalesce(readPath(record, "categoryObj.name"), readPath(record, "typeObj.categoryObj.name"));
  const categoryId = coalesce(
    readPath(record, "categoryObj.id"),
    readPath(record, "typeObj.categoryObj.id"),
    readPath(record, "category")
  );
  const programType = coalesce(
    readPath(record, "type.name"),
    readPath(record, "typeObj.name"),
    readPath(record, "incentiveType.name"),
    readPath(record, "type"),
    readPath(record, "incentiveType")
  );
  const programTypeId = coalesce(readPath(record, "typeObj.id"), readPath(record, "type"));
  const state = coalesce(readPath(record, "state.abbreviation"), readPath(record, "stateObj.abbreviation"), readPath(record, "stateCode"));
  const stateName = coalesce(readPath(record, "state.name"), readPath(record, "stateObj.name"));
  const summaryHtml = coalesce(readPath(record, "summary"), readPath(record, "description"));
  const details = normalizeDetails(readPath(record, "details"));
  const summary = cleanHtmlText(summaryHtml) ?? details.find((detail) => detail.value)?.value ?? null;
  const published = normalizePublished(readPath(record, "published"));
  const implementingSector = normalizeLookup(
    coalesce(
      readPath(record, "sectorObj"),
      readPath(record, "implementingSectorObj"),
      readPath(record, "implementingSector")
    )
  );
  const parameterSets = normalizeParameterSets(readPath(record, "parameterSets"));
  const parameterSetSectors = parameterSets.flatMap((parameterSet) => parameterSet.sectors);
  const parameterSetTechnologies = parameterSets.flatMap((parameterSet) => parameterSet.technologies);
  const eligibleSectors = uniqueLookupArray([
    ...normalizeLookupArray(coalesce(readPath(record, "eligibleSectors"), readPath(record, "sectors"))),
    ...parameterSetSectors
  ]);
  const technologyRecords = uniqueLookupArray([
    ...extractTechnologyRecords(record),
    ...parameterSetTechnologies
  ]);
  const sectorNames = eligibleSectors.map((sector) => sector.name).filter(Boolean);
  const technologyNames = technologyRecords.map((technology) => technology.name).filter(Boolean);

  const normalizedRecord = {
    sourceKey: SOURCE_KEY,
    sourceName: SOURCE_NAME,
    ingestionMode: options.ingestionMode ?? "licensed_api",
    recordKind: options.recordKind ?? "canonical_candidate",
    externalId: externalId == null ? contentHash : String(externalId),
    externalIdType: externalId == null ? "content_hash" : "dsire_program_id",
    canonicalTitle,
    sourceUrl,
    origin: buildOrigin(sourceUrl, options.sourceDocumentType ?? "api_record"),
    status: normalizeStatus(coalesce(readPath(record, "status"), readPath(record, "programStatus"))),
    category,
    categoryId,
    programType,
    programTypeId,
    state,
    stateName,
    summary,
    summaryHtml,
    published,
    websiteUrl,
    lastUpdated: normalizeDate(
      coalesce(readPath(record, "updatedTs"), readPath(record, "updatedAt"), readPath(record, "updated_at"))
    ),
    sourceCreatedAt: normalizeDate(
      coalesce(readPath(record, "createdTs"), readPath(record, "createdAt"), readPath(record, "created_at"))
    ),
    startDate: normalizeDate(coalesce(readPath(record, "startDate"), readPath(record, "startDateDisplay"), readPath(record, "startDateText"))),
    endDate: normalizeDate(coalesce(readPath(record, "endDate"), readPath(record, "endDateDisplay"), readPath(record, "endDateText"))),
    fundingSource: cleanHtmlText(readPath(record, "fundingSource")),
    budget: cleanHtmlText(readPath(record, "budget")),
    details,
    geography: compactObject({
      state,
      stateName,
      entireState: readPath(record, "entireState") === true,
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
    implementingSector,
    sectors: sectorNames,
    eligibleSectors,
    technologies: technologyNames,
    technologyRecords,
    parameterSets,
    dsire: compactObject({
      programId: externalId == null ? null : String(externalId),
      category,
      categoryId,
      programType,
      programTypeId,
      stateId: readPath(record, "stateObj.id") ?? readPath(record, "state"),
      state,
      stateName,
      sectorId: readPath(record, "sectorObj.id") ?? readPath(record, "sector"),
      sectorName: readPath(record, "sectorObj.name"),
      published,
      lastUpdatedDisplay: readPath(record, "lastUpdated"),
      createdTs: readPath(record, "createdTs")
    }),
    evidence: [
      {
        sourceName: SOURCE_NAME,
        sourceUrl,
        documentType: options.sourceDocumentType ?? "api_record",
        retrievedAt,
        rawContentHash: contentHash
      }
    ],
    contentHash,
    raw: record
  };

  return {
    ...normalizedRecord,
    dsireClone: buildDsireCloneRecord(normalizedRecord)
  };
}

function buildOrigin(sourceUrl, documentType) {
  return {
    sourceKey: SOURCE_KEY,
    sourceName: SOURCE_NAME,
    sourceUrl,
    sourceBaseUrl: "https://www.dsireusa.org/",
    documentType
  };
}

function normalizeDetails(details) {
  if (!Array.isArray(details)) {
    return [];
  }

  return details
    .map((detail) =>
      compactObject({
        id: detail.id == null ? null : String(detail.id),
        label: cleanHtmlText(detail.label),
        value: cleanHtmlText(detail.value),
        valueHtml: detail.value || null,
        displayOrder: detail.displayOrder,
        templateId: detail.templateId == null ? null : String(detail.templateId)
      })
    )
    .filter((detail) => Object.keys(detail).length > 0);
}

function extractTechnologies(record) {
  return extractTechnologyRecords(record).map((technology) => technology.name).filter(Boolean);
}

function extractTechnologyRecords(record) {
  return uniqueLookupArray([
    ...normalizeLookupArray(
      coalesce(readPath(record, "technologies"), readPath(record, "energyCategories"), readPath(record, "technologyObj"))
    ),
    ...normalizeNameList(readPath(record, "additionalTechnologies")).map((name) => ({
      name,
      slug: slugify(name)
    }))
  ]);
}

function normalizeParameterSets(parameterSets) {
  if (!Array.isArray(parameterSets)) {
    return [];
  }

  return parameterSets
    .map((parameterSet, index) =>
      compactObject({
        id: parameterSet.id == null ? null : String(parameterSet.id),
        programId: parameterSet.programId == null ? null : String(parameterSet.programId),
        label: cleanHtmlText(parameterSet.label),
        displayOrder: parameterSet.displayOrder ?? index,
        sectors: normalizeLookupArray(parameterSet.sectors),
        technologies: normalizeLookupArray(parameterSet.technologies),
        parameters: normalizeParameters(parameterSet.parameters)
      })
    )
    .filter((parameterSet) => Object.keys(parameterSet).length > 0);
}

function normalizeParameters(parameters) {
  if (!Array.isArray(parameters)) {
    return [];
  }

  return parameters
    .map((parameter) =>
      compactObject({
        id: parameter.id == null ? null : String(parameter.id),
        source: cleanHtmlText(parameter.source),
        qualifier: cleanHtmlText(parameter.qualifier),
        amount: normalizeNumber(parameter.amount),
        amountText: parameter.amount == null || parameter.amount === "" ? null : String(parameter.amount),
        units: cleanHtmlText(parameter.units),
        displayValue: cleanHtmlText(parameter.displayValue)
      })
    )
    .filter((parameter) => Object.keys(parameter).length > 0);
}

function normalizeLookupArray(value) {
  if (value == null || value === "") {
    return [];
  }

  const values = Array.isArray(value) ? value : [value];
  return uniqueLookupArray(values.map((item) => normalizeLookup(item)).filter(Boolean));
}

function normalizeLookup(value) {
  if (value == null || value === "") {
    return null;
  }

  if (typeof value === "object") {
    const name = normalizeName(value);
    if (!name) {
      return null;
    }

    return compactObject({
      id: value.id == null ? null : String(value.id),
      name,
      slug: slugify(name),
      category: cleanHtmlText(value.category),
      categoryId: value.categoryId == null ? null : String(value.categoryId),
      energyCategoryId: value.energyCategoryId == null ? null : String(value.energyCategoryId),
      parentId: value.parentId == null ? null : String(value.parentId),
      selectable: value.selectable,
      active: value.active
    });
  }

  const name = String(value).trim();
  return name ? { name, slug: slugify(name) } : null;
}

function uniqueLookupArray(values) {
  const seen = new Set();
  const result = [];

  for (const value of values) {
    if (!value?.name) {
      continue;
    }

    const key = value.id ? `id:${value.id}` : `name:${value.name.toLowerCase()}`;
    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    result.push(value);
  }

  return result;
}

function normalizeNumber(value) {
  if (value == null || value === "") {
    return null;
  }

  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function buildDsireCloneRecord(record) {
  const state = compactObject({
    id: record.dsire?.stateId == null ? null : String(record.dsire.stateId),
    abbreviation: record.state,
    name: record.stateName,
    isTerritory: record.raw?.stateObj?.is_territory
  });
  const category = compactObject({
    id: record.categoryId == null ? null : String(record.categoryId),
    name: record.category,
    slug: record.category ? slugify(record.category) : null
  });
  const programType = compactObject({
    id: record.programTypeId == null ? null : String(record.programTypeId),
    categoryId: record.categoryId == null ? null : String(record.categoryId),
    name: record.programType,
    slug: record.programType ? slugify(record.programType) : null
  });
  const implementingSector =
    record.implementingSector ??
    compactObject({
      id: record.dsire?.sectorId == null ? null : String(record.dsire.sectorId),
      name: record.dsire?.sectorName,
      slug: record.dsire?.sectorName ? slugify(record.dsire.sectorName) : null
    });
  const sourceProgramId = record.dsire?.programId ?? record.externalId;

  return {
    schemaVersion: "dsire-clone-v1",
    sourceSystem: "DSIRE",
    sourceProgramId: sourceProgramId == null ? null : String(sourceProgramId),
    sourceRecordType: record.ingestionMode,
    program: compactObject({
      id: sourceProgramId == null ? null : String(sourceProgramId),
      sourceProgramId: sourceProgramId == null ? null : String(sourceProgramId),
      code: record.dsire?.programCode ?? record.raw?.code ?? null,
      name: record.canonicalTitle,
      slug: slugify(record.canonicalTitle),
      state,
      isEntireState: record.geography?.entireState,
      category,
      programType,
      implementingSector,
      websiteUrl: record.websiteUrl,
      sourceUrl: record.sourceUrl,
      administrator: record.administrator,
      fundingSource: record.fundingSource,
      budget: record.budget,
      startDate: record.startDate,
      startDateText: record.raw?.startDateText ?? null,
      endDate: record.endDate,
      endDateText: record.raw?.endDateText ?? null,
      summaryText: record.summary,
      published: record.published,
      createdAt: record.sourceCreatedAt,
      updatedAt: record.lastUpdated,
      lastReviewedAt: record.lastUpdated
    }),
    overviewDetails: record.details ?? [],
    eligibleSectors: record.eligibleSectors ?? [],
    technologies: record.technologyRecords ?? [],
    parameterSets: record.parameterSets ?? [],
    authorities: normalizeAuthorities(record.raw?.authorities),
    contacts: normalizeContacts(record.raw?.contacts),
    memos: normalizeMemos(record.raw?.memos ?? record.raw?.subscriptionMemos),
    geography: record.geography ?? {},
    source: {
      sourceKey: record.sourceKey,
      sourceName: record.sourceName,
      sourceUrl: record.sourceUrl,
      externalId: record.externalId,
      externalIdType: record.externalIdType,
      ingestionMode: record.ingestionMode
    },
    searchText: normalizeComparableText(
      [
        record.canonicalTitle,
        record.dsire?.programCode,
        record.state,
        record.stateName,
        record.category,
        record.programType,
        record.administrator,
        record.summary,
        ...(record.sectors ?? []),
        ...(record.technologies ?? []),
        ...(record.details ?? []).flatMap((detail) => [detail.label, detail.value])
      ].join(" ")
    )
  };
}

function normalizeAuthorities(authorities) {
  if (!Array.isArray(authorities)) {
    return [];
  }

  return authorities.map((authority, index) =>
    compactObject({
      id: authority.id == null ? null : String(authority.id),
      displayOrder: authority.order ?? authority.displayOrder ?? index,
      code: cleanHtmlText(authority.code),
      website: cleanUrl(authority.website),
      enacted: normalizeDate(authority.enacted),
      enactedText: cleanHtmlText(authority.enactedtext ?? authority.enactedText),
      effective: normalizeDate(authority.effective),
      effectiveText: cleanHtmlText(authority.effectivetext ?? authority.effectiveText),
      expired: normalizeDate(authority.expired),
      expiredText: cleanHtmlText(authority.expiredtext ?? authority.expiredText),
      fileUrl: cleanUrl(authority.file_url ?? authority.fileUrl),
      fileName: cleanHtmlText(authority.file_name ?? authority.fileName)
    })
  );
}

function normalizeContacts(contacts) {
  if (!Array.isArray(contacts)) {
    return [];
  }

  return contacts.map((contact) =>
    compactObject({
      id: contact.id == null ? null : String(contact.id),
      firstName: cleanHtmlText(contact.first_name ?? contact.firstName),
      lastName: cleanHtmlText(contact.last_name ?? contact.lastName),
      organizationName: cleanHtmlText(contact.organization_name ?? contact.organizationName),
      phone: cleanHtmlText(contact.phone),
      email: cleanHtmlText(contact.email),
      websiteUrl: cleanUrl(contact.website_url ?? contact.websiteUrl),
      address: cleanHtmlText(contact.address),
      city: cleanHtmlText(contact.city),
      stateId: contact.state_id == null ? null : String(contact.state_id),
      zip: cleanHtmlText(contact.zip),
      webVisibleDefault: contact.web_visible_default ?? contact.webVisibleDefault
    })
  );
}

function normalizeMemos(memos) {
  if (!Array.isArray(memos)) {
    return [];
  }

  return memos.map((memo) =>
    compactObject({
      id: memo.id == null ? null : String(memo.id),
      addedByUser: memo.added_by_user ?? memo.addedByUser,
      addedAt: normalizeDate(memo.Added ?? memo.added ?? memo.addedAt),
      memo: cleanHtmlText(memo.memo)
    })
  );
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

function extractFilteredCount(payload) {
  const total = coalesce(readPath(payload, "recordsFiltered"), readPath(payload, "meta.filtered"));

  if (total == null || Number.isNaN(Number(total))) {
    return null;
  }

  return Number(total);
}

async function writeRunOutputs({
  runId,
  config,
  startedAt,
  completedAt,
  rawRecords,
  normalizedRecords,
  sourceDocuments,
  context,
  validation,
  dynamodbWrite
}) {
  const runDir = path.join(config.outputDir, "runs", runId);
  await mkdir(runDir, { recursive: true });

  const rawPath = path.join(runDir, "raw-records.json");
  const normalizedPath = path.join(runDir, "normalized-opportunities.json");
  const sourceDocumentsPath = path.join(runDir, "source-documents.json");
  const validationPath = path.join(runDir, "validation-report.json");
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
    pageSize: config.mode === "api" || config.mode === "public-table" ? config.pageSize : null,
    maxPages: config.mode === "api" || config.mode === "public-table" ? config.maxPages : null,
    publicCategory: config.mode === "public-table" ? config.publicCategory : null,
    limit: config.limit,
    counts: {
      rawRecords: rawRecords.length,
      normalizedRecords: normalizedRecords.length,
      sourceDocuments: sourceDocuments.length,
      newRecords: changes.summary.newRecords,
      changedRecords: changes.summary.changedRecords,
      unchangedRecords: changes.summary.unchangedRecords,
      removedRecords: changes.summary.removedRecords,
      writableRecords: validation.summary.writableRecords,
      rejectedRecords: validation.summary.rejectedRecords
    },
    validation: validation.summary,
    dynamodbWrite,
    outputs: {
      rawRecords: relativePath(rawPath),
      normalizedOpportunities: relativePath(normalizedPath),
      sourceDocuments: relativePath(sourceDocumentsPath),
      validationReport: relativePath(validationPath),
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
  await writeJson(validationPath, {
    summary: validation.summary,
    rejectedRecords: validation.rejectedRecords.map(summaryRecord),
    warnings: validation.records
      .filter((record) => record.dataQuality.warnings.length > 0)
      .map((record) => ({
        ...summaryRecord(record),
        warnings: record.dataQuality.warnings
      }))
  });
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

function normalizePublished(value) {
  if (value == null || value === "") {
    return null;
  }

  if (typeof value === "boolean") {
    return value;
  }

  const normalized = String(value).trim().toLowerCase();
  if (["yes", "true", "1", "published"].includes(normalized)) {
    return true;
  }

  if (["no", "false", "0", "unpublished"].includes(normalized)) {
    return false;
  }

  return null;
}

function cleanUrl(value) {
  const text = String(value || "").trim();
  return text.length > 0 ? text : null;
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

function uniqueArray(values) {
  return [...new Set(values.filter(Boolean))];
}

function chunks(values, size) {
  const result = [];
  for (let index = 0; index < values.length; index += size) {
    result.push(values.slice(index, index + size));
  }
  return result;
}

async function sleep(ms) {
  await new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
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

function normalizeMode(value) {
  if (value === "public") {
    return "public-table";
  }

  return value;
}

function parseBoolean(value, fallback) {
  if (value == null) {
    return fallback;
  }

  if (typeof value === "boolean") {
    return value;
  }

  return ["1", "true", "yes", "on"].includes(String(value).toLowerCase());
}

function safeTimestamp(value) {
  return value.replace(/[:.]/g, "-");
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
