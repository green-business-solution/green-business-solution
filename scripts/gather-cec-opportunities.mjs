#!/usr/bin/env node

import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { BatchWriteCommand, DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { fromIni } from "@aws-sdk/credential-providers";

const SOURCE_KEY = "SOURCE_CA_ENERGY_COMMISSION";
const SOURCE_NAME = "California Energy Commission";
const SOURCE_BASE_URL = "https://www.energy.ca.gov/";
const DEFAULT_SITEMAP_URL = "https://www.energy.ca.gov/sitemap.xml";
const DEFAULT_OUTPUT_DIR = "var/opportunity-ingestion/cec";
const DEFAULT_DYNAMODB_TABLE = "gbs-opportunity-candidates";
const DEFAULT_AWS_REGION = "us-east-2";
const DEFAULT_AWS_PROFILE = "gbs";
const DEFAULT_DELAY_MS = 100;
const DEFAULT_USER_AGENT =
  "GreenBusinessSolutionBot/0.1 (+https://github.com/green-business-solution/green-business-solution)";

main().catch((error) => {
  console.error(`CEC ingestion failed: ${error.message}`);
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
  const runId = `cec-sitemap-${safeTimestamp(startedAt)}`;
  const config = {
    outputDir: path.resolve(process.cwd(), args.outputDir ?? DEFAULT_OUTPUT_DIR),
    sitemapUrl: args.sitemapUrl ?? process.env.CEC_SITEMAP_URL ?? DEFAULT_SITEMAP_URL,
    limit: args.limit == null ? null : positiveInteger(args.limit, null, "limit"),
    requestDelayMs: nonNegativeInteger(args.requestDelayMs, DEFAULT_DELAY_MS, "request delay"),
    writeDynamodb: parseBoolean(args.writeDynamodb, false),
    dynamodbTable: args.dynamodbTable ?? process.env.GBS_OPPORTUNITIES_TABLE ?? DEFAULT_DYNAMODB_TABLE,
    awsRegion: args.awsRegion ?? process.env.AWS_REGION ?? DEFAULT_AWS_REGION,
    awsProfile: args.awsProfile ?? process.env.AWS_PROFILE ?? DEFAULT_AWS_PROFILE,
    userAgent: process.env.CEC_USER_AGENT ?? DEFAULT_USER_AGENT
  };

  const result = await gatherFromSitemap(config);
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

  console.log("CEC ingestion completed in sitemap mode.");
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
Gather California Energy Commission solicitation opportunity records.

Usage:
  npm run gather:cec
  npm run gather:cec:aws
  node scripts/gather-cec-opportunities.mjs --limit 10

Options:
  --limit 25
  --request-delay-ms 100
  --sitemap-url https://www.energy.ca.gov/sitemap.xml
  --write-dynamodb
  --dynamodb-table gbs-opportunity-candidates
  --aws-profile gbs
  --aws-region us-east-2

Environment:
  CEC_SITEMAP_URL       Optional sitemap URL override.
  CEC_USER_AGENT        Optional user-agent override.
`);
}

async function gatherFromSitemap(config) {
  const retrievedAt = new Date().toISOString();
  const sourceDocuments = [];
  const rawRecords = [];

  const sitemapIndex = await fetchText(config.sitemapUrl, {
    accept: "application/xml, text/xml, */*",
    userAgent: config.userAgent
  });
  const sitemapHash = sha256(sitemapIndex.body);
  sourceDocuments.push(buildSourceDocument("sitemap_index", config.sitemapUrl, sitemapIndex, retrievedAt, sitemapHash));

  const sitemapUrls = parseXmlLocs(sitemapIndex.body).filter((url) => url.includes("/sitemap.xml?page="));
  const sitemapPageUrls = sitemapUrls.length > 0 ? sitemapUrls : [config.sitemapUrl];
  const solicitationUrls = [];

  for (const sitemapUrl of sitemapPageUrls) {
    const response = sitemapUrl === config.sitemapUrl ? sitemapIndex : await fetchText(sitemapUrl, {
      accept: "application/xml, text/xml, */*",
      userAgent: config.userAgent
    });
    const pageHash = sitemapUrl === config.sitemapUrl ? sitemapHash : sha256(response.body);
    sourceDocuments.push(buildSourceDocument("sitemap_page", sitemapUrl, response, retrievedAt, pageHash));

    for (const url of parseXmlLocs(response.body)) {
      if (isSolicitationDetailUrl(url)) {
        solicitationUrls.push(canonicalUrl(url));
      }
    }
  }

  const selectedUrls = uniqueArray(solicitationUrls).sort().slice(0, config.limit ?? undefined);

  for (const [index, detailUrl] of selectedUrls.entries()) {
    if (index > 0 && config.requestDelayMs > 0) {
      await sleep(config.requestDelayMs);
    }

    const response = await fetchText(detailUrl, {
      accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      userAgent: config.userAgent
    });
    const rawHash = sha256(response.body);
    const parsed = parseSolicitationDetailPage(response.body, {
      detailUrl,
      finalUrl: response.finalUrl,
      retrievedAt,
      rawHash,
      httpStatus: response.httpStatus,
      contentType: response.contentType
    });

    rawRecords.push(parsed);
    sourceDocuments.push({
      sourceKey: SOURCE_KEY,
      sourceName: SOURCE_NAME,
      documentType: "solicitation_detail_page",
      originalUrl: detailUrl,
      finalUrl: response.finalUrl,
      contentType: response.contentType,
      httpStatus: response.httpStatus,
      retrievedAt,
      rawHash,
      externalId: parsed.solicitationNumber,
      title: parsed.title
    });
  }

  const normalizedRecords = rawRecords.map((record) => normalizeCecRecord(record, retrievedAt));

  return {
    rawRecords,
    normalizedRecords,
    sourceDocuments,
    context: {
      mode: "sitemap",
      isFullInventory: config.limit == null,
      discoveredUrls: uniqueArray(solicitationUrls).length,
      limitations: [
        "CEC mode currently parses solicitation detail pages and file links, but it does not download or parse attached DOCX, XLSX, or PDF manuals.",
        "Zip code, utility provider, business classification, and square footage fields are inferred conservatively from page-level text and should be reviewed before production matching."
      ]
    }
  };
}

function buildSourceDocument(documentType, originalUrl, response, retrievedAt, rawHash) {
  return {
    sourceKey: SOURCE_KEY,
    sourceName: SOURCE_NAME,
    documentType,
    originalUrl,
    finalUrl: response.finalUrl,
    contentType: response.contentType,
    httpStatus: response.httpStatus,
    retrievedAt,
    rawHash
  };
}

function parseSolicitationDetailPage(html, context) {
  const title = cleanHtmlText(
    firstMatch(html, /<h1[^>]*page-header__title[\s\S]*?<div[^>]*field__item[^>]*>([\s\S]*?)<\/div>[\s\S]*?<\/h1>/i) ??
      firstMatch(html, /<meta property="og:title" content="([^"]+)"/i) ??
      firstMatch(html, /<title[^>]*>([\s\S]*?)<\/title>/i)
  );
  const fields = parseDefinitionFields(html);
  const purpose = extractFieldItemByClass(html, "field--name-field-purpose");
  const additionalInformation = extractSectionText(html, "Additional Information");
  const files = parseFileLinks(html, context.finalUrl);
  const applicationLinks = parseApplicationLinks(html, context.finalUrl);
  const solicitationNumber = cleanSolicitationNumber(fields["Solicitation Number"]?.value ?? inferSolicitationNumber(title));

  return {
    title,
    solicitationNumber,
    sourceUrl: canonicalUrl(context.finalUrl),
    finalUrl: context.finalUrl,
    solicitationType: fields["Solicitation Type"]?.value ?? inferSolicitationType(title),
    status: fields["Solicitation Status"]?.value ?? null,
    division: fields.Division?.value ?? null,
    program: fields.Program?.value ?? null,
    releaseDate: fields["Release Date"]?.datetime ?? normalizeDate(fields["Release Date"]?.value),
    releaseDateText: fields["Release Date"]?.value ?? null,
    submissionDeadline: fields["Submission Deadline"]?.datetime ?? normalizeDate(fields["Submission Deadline"]?.value),
    submissionDeadlineText: fields["Submission Deadline"]?.value ?? null,
    questionsDeadline: fields["Questions Deadline"]?.datetime ?? normalizeDate(fields["Questions Deadline"]?.value),
    questionsDeadlineText: fields["Questions Deadline"]?.value ?? null,
    purpose,
    additionalInformation,
    applicationPortalUrl: inferApplicationPortalUrl(html, fields, applicationLinks),
    submissionMethod: inferSubmissionMethod(html),
    files,
    applicationLinks,
    retrievedAt: context.retrievedAt,
    rawHash: context.rawHash,
    httpStatus: context.httpStatus,
    contentType: context.contentType,
    parserVersion: "cec-solicitation-detail-v1",
    raw: {
      fields,
      fileCount: files.length,
      applicationLinks
    }
  };
}

function parseDefinitionFields(html) {
  const fields = {};
  const dlHtml = firstMatch(html, /<dl>([\s\S]*?)<\/dl>/i);
  if (!dlHtml) {
    return fields;
  }

  const pattern = /<dt[^>]*>([\s\S]*?)<\/dt>\s*<dd[^>]*>([\s\S]*?)<\/dd>/gi;
  let match;
  while ((match = pattern.exec(dlHtml)) != null) {
    const label = cleanHtmlText(match[1]);
    if (!label) {
      continue;
    }

    const valueHtml = match[2];
    fields[label] = {
      value: cleanHtmlText(valueHtml),
      datetime: firstMatch(valueHtml, /<time[^>]*datetime="([^"]+)"/i) ?? null,
      html: valueHtml
    };
  }

  return fields;
}

function parseFileLinks(html, baseUrl) {
  const links = parseLinks(html, baseUrl).filter((link) => {
    return new URL(link.url).pathname.startsWith("/sites/default/files/");
  });

  return links.map((link) => ({
    title: link.text,
    url: link.url,
    extension: fileExtension(link.url),
    documentType: documentTypeFromExtension(fileExtension(link.url))
  }));
}

function parseApplicationLinks(html, baseUrl) {
  return parseLinks(html, baseUrl).filter((link) => {
    const text = normalizeComparableText(link.text);
    const host = new URL(link.url).hostname;
    return host.includes("ecams.energy.ca.gov") || host.includes("gss.energy.ca.gov") || text.includes("apply");
  });
}

function parseLinks(html, baseUrl) {
  const links = [];
  const pattern = /<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
  let match;

  while ((match = pattern.exec(html)) != null) {
    const href = decodeHtmlEntities(match[1]);
    if (!href || href.startsWith("#") || href.startsWith("mailto:")) {
      continue;
    }

    let url;
    try {
      url = new URL(href, baseUrl).toString();
    } catch {
      continue;
    }

    links.push({
      url: canonicalUrl(url),
      text: cleanHtmlText(match[2]) ?? url
    });
  }

  return links;
}

function normalizeCecRecord(record, retrievedAt) {
  const externalId = record.solicitationNumber ?? `url_hash:${sha256(record.sourceUrl).slice(0, 16)}`;
  const normalizedStatus = normalizeCecStatus(record.status);
  const programType = normalizeProgramType(record.solicitationType);
  const summary = record.purpose ?? record.additionalInformation ?? record.title;
  const contentForHash = {
    title: record.title,
    solicitationNumber: record.solicitationNumber,
    solicitationType: record.solicitationType,
    status: record.status,
    division: record.division,
    program: record.program,
    releaseDate: record.releaseDate,
    submissionDeadline: record.submissionDeadline,
    questionsDeadline: record.questionsDeadline,
    purpose: record.purpose,
    files: record.files,
    applicationPortalUrl: record.applicationPortalUrl
  };
  const contentHash = sha256(stableStringify(contentForHash));
  const technologyTags = inferTechnologies(record);
  const matchingParameters = inferMatchingParameters(record, {
    normalizedStatus,
    technologyTags
  });

  return {
    sourceKey: SOURCE_KEY,
    sourceName: SOURCE_NAME,
    ingestionMode: "cec_sitemap_detail",
    recordKind: "canonical_candidate",
    externalId,
    externalIdType: record.solicitationNumber ? "cec_solicitation_number" : "cec_url_hash",
    canonicalTitle: record.title ?? "Untitled CEC solicitation",
    sourceUrl: record.sourceUrl,
    origin: buildOrigin(record.sourceUrl, "solicitation_detail_page"),
    status: normalizedStatus,
    sourceStatus: record.status,
    category: "State Funding Solicitation",
    programType,
    solicitationType: record.solicitationType,
    state: "CA",
    stateName: "California",
    summary,
    administrator: SOURCE_NAME,
    division: record.division,
    program: record.program,
    releaseDate: record.releaseDate,
    releaseDateText: record.releaseDateText,
    deadlineDate: record.submissionDeadline,
    deadlineText: record.submissionDeadlineText,
    questionsDeadline: record.questionsDeadline,
    questionsDeadlineText: record.questionsDeadlineText,
    submissionMethod: record.submissionMethod,
    applicationUrl: record.applicationPortalUrl,
    websiteUrl: record.sourceUrl,
    documents: record.files,
    technologies: technologyTags,
    sectors: matchingParameters.businessClassification.values,
    geography: {
      state: "CA",
      stateName: "California",
      geographyType: "statewide_or_project_specific",
      zipCodeMode: matchingParameters.zipCode.mode,
      zipCodes: matchingParameters.zipCode.values
    },
    eligibilityRules: {
      geography: matchingParameters.zipCode,
      utilityProvider: matchingParameters.utilityProvider,
      businessClassification: matchingParameters.businessClassification,
      squareFootage: matchingParameters.squareFootage
    },
    matchingParameters,
    cec: {
      solicitationNumber: record.solicitationNumber,
      solicitationType: record.solicitationType,
      status: record.status,
      division: record.division,
      program: record.program,
      parserVersion: record.parserVersion
    },
    evidence: [
      {
        sourceName: SOURCE_NAME,
        sourceUrl: record.sourceUrl,
        documentType: "solicitation_detail_page",
        retrievedAt,
        rawContentHash: record.rawHash,
        parserVersion: record.parserVersion
      }
    ],
    raw: {
      title: record.title,
      fields: record.raw.fields,
      purpose: record.purpose,
      additionalInformation: record.additionalInformation,
      files: record.files,
      applicationLinks: record.applicationLinks,
      rawHash: record.rawHash
    },
    contentHash
  };
}

function buildOrigin(sourceUrl, documentType) {
  return {
    sourceKey: SOURCE_KEY,
    sourceName: SOURCE_NAME,
    sourceUrl,
    sourceBaseUrl: SOURCE_BASE_URL,
    documentType
  };
}

function inferMatchingParameters(record, { normalizedStatus, technologyTags }) {
  const sourceText = normalizeComparableText(
    [
      record.title,
      record.solicitationType,
      record.status,
      record.division,
      record.program,
      record.purpose,
      record.additionalInformation
    ].join(" ")
  );
  const squareFootage = inferSquareFootage(sourceText);
  const businessClassification = inferBusinessClassifications(sourceText, record);
  const deadlineHasPassed = hasPastDeadline(record.submissionDeadline);
  const openStatus = ["active", "upcoming", "open", "no_time_limit", "pre_application"].includes(normalizedStatus);
  const isCurrentlyMatchable = openStatus && !deadlineHasPassed;

  return {
    zipCode: {
      parameter: "zip_code",
      mode: "california_statewide_or_project_specific",
      values: [],
      state: "CA",
      confidence: "medium",
      method: "source_rule",
      rationale:
        "CEC solicitations are California state funding opportunities. This parser did not find ZIP-specific eligibility on the detail page."
    },
    utilityProvider: {
      parameter: "utility_provider",
      mode: "not_utility_specific",
      values: ["Any"],
      confidence: "high",
      method: "source_rule",
      rationale: "CEC is a state funding source, not a utility-territory program."
    },
    businessClassification,
    squareFootage,
    technologyTags,
    deadlineHasPassed,
    isCurrentlyMatchable,
    matchingWarnings: [
      ...(businessClassification.confidence === "low" ? ["business_classification_needs_review"] : []),
      ...(deadlineHasPassed ? ["submission_deadline_has_passed"] : [])
    ]
  };
}

function hasPastDeadline(value) {
  if (!value) {
    return false;
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return false;
  }

  return parsed.getTime() < Date.now();
}

function inferBusinessClassifications(text, record) {
  const values = new Set();
  const evidence = [];

  addIf(text, values, evidence, ["school", "school bus", "university", "college", "education"], ["education", "government", "public_sector"]);
  addIf(text, values, evidence, ["government", "public agency", "public sector", "municipal", "city ", "county ", "state agency", "tribal", "tribe", "fleet"], ["government", "public_sector"]);
  addIf(text, values, evidence, ["nonprofit", "non-profit"], ["nonprofit"]);
  addIf(text, values, evidence, ["industrial", "manufacturing", "factory", "production", "process heat"], ["industrial"]);
  addIf(text, values, evidence, ["agricultural", "agriculture", "farm", "dairy"], ["agricultural"]);
  addIf(text, values, evidence, ["food production"], ["industrial", "agricultural", "food_service"]);
  addIf(text, values, evidence, ["commercial", "business", "workplace", "charging hub"], ["commercial"]);
  addIf(text, values, evidence, ["multifamily", "multi family", "apartment", "housing"], ["multifamily"]);
  addIf(text, values, evidence, ["hospital", "healthcare", "health care"], ["healthcare"]);
  addIf(text, values, evidence, ["data center"], ["data_center"]);

  if (values.size === 0 && normalizeComparableText(record.solicitationType).includes("request for")) {
    values.add("commercial");
    evidence.push("request_for_vendor_or_contractor_services");
  }

  if (values.size === 0 && normalizeComparableText(record.solicitationType).includes("grant")) {
    for (const value of ["commercial", "nonprofit", "government", "public_sector"]) {
      values.add(value);
    }
    evidence.push("broad_cec_grant_opportunity_default");
  }

  if (values.size === 0) {
    values.add("unknown");
    evidence.push("no_business_classification_keywords_found");
  }

  return {
    parameter: "business_classification",
    values: [...values],
    confidence: evidence.includes("broad_cec_grant_opportunity_default") || values.has("unknown") ? "low" : "medium",
    method: "keyword_rules",
    evidence,
    rationale:
      "Inferred from title, purpose, division, program, and solicitation type. Attached manuals are not parsed yet, so eligibility requires review."
  };
}

function addIf(text, values, evidence, keywords, classifications) {
  for (const keyword of keywords) {
    if (!text.includes(keyword)) {
      continue;
    }

    for (const classification of classifications) {
      values.add(classification);
    }
    evidence.push(keyword.trim());
    return;
  }
}

function inferSquareFootage(text) {
  const match = text.match(/(\d[\d,]*)\s*(?:to|-)?\s*(\d[\d,]*)?\s*(?:square feet|sq ft|sq\. ft\.|sf)\b/i);

  if (!match) {
    return {
      parameter: "square_footage",
      mode: "not_specified",
      min: null,
      max: null,
      confidence: "high",
      method: "detail_page_text_scan",
      rationale: "No square-footage eligibility language was found on the CEC detail page."
    };
  }

  return {
    parameter: "square_footage",
    mode: "explicit_text_found",
    min: parseInteger(match[1]),
    max: match[2] ? parseInteger(match[2]) : null,
    confidence: "medium",
    method: "regex",
    evidence: match[0]
  };
}

function inferTechnologies(record) {
  const text = normalizeComparableText(
    [record.title, record.division, record.program, record.purpose, record.additionalInformation].join(" ")
  );
  const tags = new Set();

  addTagIf(text, tags, ["hydrogen"], "clean_hydrogen");
  addTagIf(text, tags, ["electric vehicle", " ev charging", "charging infrastructure", "charger", "charging hub"], "EV_charging");
  addTagIf(text, tags, ["fleet", "school bus", "transportation", "zero emission vehicle", "zero emission transportation"], "fleet_electrification");
  addTagIf(text, tags, ["solar", "photovoltaic", " pv "], "solar_PV");
  addTagIf(text, tags, ["battery", "storage", "long duration"], "battery_storage");
  addTagIf(text, tags, ["microgrid"], "microgrid");
  addTagIf(text, tags, ["demand flexibility", "virtual power plant", "demand response"], "demand_response");
  addTagIf(text, tags, ["grid", "resilience"], "grid_resilience");
  addTagIf(text, tags, ["geothermal"], "geothermal");
  addTagIf(text, tags, ["heat pump"], "heat_pump");
  addTagIf(text, tags, ["hvac"], "HVAC");
  addTagIf(text, tags, ["retrofit", "energy efficiency", "efficiency", "energy code"], "energy_efficiency");
  addTagIf(text, tags, ["building decarbonization", "building"], "building_decarbonization");
  addTagIf(text, tags, ["food production", "manufacturing", "industrial"], "industrial_efficiency");
  addTagIf(text, tags, ["direct air capture", "carbon capture", "carbon"], "carbon_management");
  addTagIf(text, tags, ["water"], "water_efficiency");

  if (tags.size === 0) {
    tags.add("clean_energy");
  }

  return [...tags];
}

function addTagIf(text, tags, keywords, tag) {
  if (keywords.some((keyword) => text.includes(keyword))) {
    tags.add(tag);
  }
}

function validateNormalizedRecords(records, { checkedAt }) {
  const validatedRecords = records.map((record) => {
    const criticalIssues = [];
    const warnings = [];

    if (!record.sourceKey) criticalIssues.push("missing_source_key");
    if (!record.sourceName) criticalIssues.push("missing_source_name");
    if (!record.externalId) criticalIssues.push("missing_external_id");
    if (!record.canonicalTitle || record.canonicalTitle.length < 4) criticalIssues.push("missing_or_short_title");
    if (!record.sourceUrl || !record.sourceUrl.startsWith("https://www.energy.ca.gov/solicitations/")) {
      criticalIssues.push("invalid_source_url");
    }
    if (!record.origin?.sourceKey || !record.origin?.sourceName || !record.origin?.sourceUrl) {
      criticalIssues.push("missing_origin_metadata");
    }
    if (!Array.isArray(record.evidence) || record.evidence.length === 0) {
      criticalIssues.push("missing_source_evidence");
    }
    if (!record.contentHash || record.contentHash.length !== 64) criticalIssues.push("missing_or_invalid_content_hash");
    if (!record.cec?.solicitationNumber) warnings.push("missing_solicitation_number");
    if (!record.summary) warnings.push("missing_summary_or_purpose");
    if (!record.deadlineDate) warnings.push("missing_submission_deadline");
    if (!record.matchingParameters?.zipCode) criticalIssues.push("missing_zip_code_matching_parameter");
    if (!record.matchingParameters?.utilityProvider) criticalIssues.push("missing_utility_provider_matching_parameter");
    if (!record.matchingParameters?.businessClassification) {
      criticalIssues.push("missing_business_classification_matching_parameter");
    }
    if (!record.matchingParameters?.squareFootage) criticalIssues.push("missing_square_footage_matching_parameter");
    if (record.matchingParameters?.businessClassification?.confidence === "low") {
      warnings.push("business_classification_low_confidence");
    }
    if (record.matchingParameters?.deadlineHasPassed && ["active", "upcoming", "open"].includes(record.status)) {
      warnings.push("source_status_open_but_deadline_passed");
    }
    if (!record.matchingParameters?.isCurrentlyMatchable) {
      warnings.push("not_currently_matchable_status");
    }

    const isWritable = criticalIssues.length === 0;
    return {
      ...record,
      reviewStatus: isWritable ? "needs_review" : "rejected",
      dataQuality: {
        validator: "cec-opportunity-validator-v1",
        checkedAt,
        status: isWritable && warnings.length === 0 ? "clean" : isWritable ? "clean_with_warnings" : "rejected",
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

  const dedupedRecords = validatedRecords.map((record) => {
    if (keyCounts.get(recordKey(record)) === 1) {
      return record;
    }

    return {
      ...record,
      reviewStatus: "rejected",
      dataQuality: {
        ...record.dataQuality,
        status: "rejected",
        isWritable: false,
        criticalIssues: [...record.dataQuality.criticalIssues, "duplicate_record_key_in_current_run"]
      }
    };
  });

  const writableRecords = dedupedRecords.filter((record) => record.dataQuality.isWritable);
  const rejectedRecords = dedupedRecords.filter((record) => !record.dataQuality.isWritable);

  return {
    records: dedupedRecords,
    writableRecords,
    rejectedRecords,
    summary: {
      totalRecords: dedupedRecords.length,
      writableRecords: writableRecords.length,
      rejectedRecords: rejectedRecords.length,
      warningRecords: dedupedRecords.filter((record) => record.dataQuality.warnings.length > 0).length
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
  const now = new Date().toISOString();
  const items = [];

  for (const record of writableRecords) {
    const opportunityId = recordKey(record);
    const previous = existingRecords.get(opportunityId) || null;
    const item = {
      opportunityId,
      sourceKey: record.sourceKey,
      sourceName: record.sourceName,
      externalId: record.externalId,
      externalIdType: record.externalIdType,
      canonicalTitle: record.canonicalTitle,
      normalizedTitle: normalizeComparableText(record.canonicalTitle),
      sourceUrl: record.sourceUrl,
      origin: record.origin,
      status: record.status,
      sourceStatus: record.sourceStatus,
      category: record.category,
      programType: record.programType,
      solicitationType: record.solicitationType,
      state: record.state,
      stateName: record.stateName,
      summary: record.summary,
      administrator: record.administrator,
      division: record.division,
      program: record.program,
      releaseDate: record.releaseDate,
      deadlineDate: record.deadlineDate,
      questionsDeadline: record.questionsDeadline,
      submissionMethod: record.submissionMethod,
      applicationUrl: record.applicationUrl,
      websiteUrl: record.websiteUrl,
      documents: record.documents,
      technologies: record.technologies,
      sectors: record.sectors,
      geography: record.geography,
      eligibilityRules: record.eligibilityRules,
      matchingParameters: record.matchingParameters,
      cec: record.cec,
      evidence: record.evidence,
      raw: record.raw,
      ingestionMode: record.ingestionMode,
      recordKind: record.recordKind,
      contentHash: record.contentHash,
      previousContentHash: previous?.contentHash || null,
      dataQuality: record.dataQuality,
      reviewStatus: record.reviewStatus,
      ingestRunId: runId,
      firstSeenAt: previous?.firstSeenAt || startedAt,
      lastSeenAt: now,
      createdAt: previous?.createdAt || startedAt,
      updatedAt: previous && previous.contentHash === record.contentHash ? previous.updatedAt || now : now
    };
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
      if (unprocessedItems.length === 0) break;

      attempt += 1;
      await sleep(Math.min(250 * 2 ** attempt, 5000));
      RequestItems = { [tableName]: unprocessedItems };
    }
  }
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
    mode: context.mode,
    startedAt,
    completedAt,
    isFullInventory: context.isFullInventory,
    discoveredUrls: context.discoveredUrls,
    limit: config.limit,
    requestDelayMs: config.requestDelayMs,
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
      "These records are ingestion artifacts, not yet final published opportunity database rows.",
      "Attached solicitation manuals should be parsed in a later pass for exact award amounts, eligible applicants, and detailed eligibility rules."
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
    changesPath
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
    } else if (previous.contentHash !== current.contentHash) {
      changedRecords.push({ before: summaryRecord(previous), after: summaryRecord(current) });
    } else {
      unchangedRecords.push(summaryRecord(current));
    }
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

function summaryRecord(record) {
  return {
    key: recordKey(record),
    title: record.canonicalTitle,
    sourceUrl: record.sourceUrl,
    status: record.status,
    sourceStatus: record.sourceStatus,
    programType: record.programType,
    deadlineDate: record.deadlineDate ?? null,
    contentHash: record.contentHash
  };
}

function recordKey(record) {
  return `${record.sourceKey}:${record.externalIdType}:${record.externalId}`;
}

async function fetchText(url, { accept, userAgent }) {
  const response = await fetch(url, {
    headers: {
      Accept: accept,
      "User-Agent": userAgent
    }
  });
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

function parseXmlLocs(xml) {
  return [...xml.matchAll(/<loc>([\s\S]*?)<\/loc>/gi)].map((match) => decodeHtmlEntities(match[1].trim()));
}

function isSolicitationDetailUrl(url) {
  try {
    const parsed = new URL(url);
    return parsed.hostname === "www.energy.ca.gov" && /^\/solicitations\/\d{4}-\d{2}\//.test(parsed.pathname);
  } catch {
    return false;
  }
}

function inferSolicitationNumber(title) {
  return firstMatch(title || "", /\b(?:GFO|RFQ|RFP|PON|IFB)-\d{2}-\d{3}\b/i);
}

function cleanSolicitationNumber(value) {
  return value ? String(value).trim().replace(/\s+/g, " ").toUpperCase() : null;
}

function inferSolicitationType(title) {
  const code = inferSolicitationNumber(title);
  if (!code) return null;
  if (code.startsWith("GFO")) return "Grant Funding Opportunity";
  if (code.startsWith("RFQ")) return "Request for Qualification";
  if (code.startsWith("RFP")) return "Request for Proposal";
  if (code.startsWith("PON")) return "Program Opportunity Notice";
  if (code.startsWith("IFB")) return "Invitation for Bid";
  return null;
}

function normalizeCecStatus(value) {
  const normalized = normalizeComparableText(value);
  if (!normalized) return "unknown";
  if (normalized === "active") return "active";
  if (normalized.includes("anticipated") || normalized.includes("upcoming")) return "upcoming";
  if (normalized.includes("awarded")) return "awarded";
  if (normalized.includes("selected")) return "selected";
  if (normalized.includes("closed")) return "closed";
  if (normalized.includes("cancelled") || normalized.includes("canceled")) return "cancelled";
  if (normalized.includes("no award")) return "no_award";
  if (normalized.includes("no selection")) return "no_selection";
  if (normalized.includes("no time limit")) return "no_time_limit";
  if (normalized.includes("paused")) return "paused";
  if (normalized.includes("pre application")) return "pre_application";
  return normalized.replace(/\s+/g, "_");
}

function normalizeProgramType(value) {
  const normalized = normalizeComparableText(value);
  if (normalized.includes("grant")) return "grant";
  if (normalized.includes("block grant")) return "grant";
  if (normalized.includes("rebate")) return "rebate";
  if (normalized.includes("request for")) return "solicitation";
  if (normalized.includes("bid")) return "solicitation";
  if (normalized.includes("program opportunity")) return "solicitation";
  return "solicitation";
}

function inferApplicationPortalUrl(html, fields, applicationLinks) {
  const link = applicationLinks.find((item) => {
    const host = new URL(item.url).hostname;
    return host.includes("ecams.energy.ca.gov") || host.includes("gss.energy.ca.gov");
  });
  if (link) return link.url;

  const text = normalizeComparableText([html, fields["Submission Method"]?.value].join(" "));
  if (text.includes("ecams")) return "https://ecams.energy.ca.gov/s/login/";
  if (text.includes("grant solicitation system") || text.includes(" gss")) return "https://gss.energy.ca.gov/";
  return null;
}

function inferSubmissionMethod(html) {
  const text = cleanHtmlText(html);
  if (!text) return null;
  if (text.includes("Energy Commission Agreement Management System")) return "Energy Commission Agreement Management System (ECAMS)";
  if (text.includes("Grant Solicitation System")) return "Grant Solicitation System (GSS)";
  return null;
}

function extractFieldItemByClass(html, className) {
  const index = html.indexOf(className);
  if (index === -1) return null;
  const slice = html.slice(index, index + 5000);
  const item = firstMatch(slice, /<div class="field__item">([\s\S]*?)<\/div>/i);
  return cleanHtmlText(item);
}

function extractSectionText(html, title) {
  const pattern = new RegExp(`<h2[^>]*[^>]*>${escapeRegex(title)}<\\/h2>([\\s\\S]*?)(?:<h2|<\\/main>|<div class="section">\\s*<\\/)`, "i");
  const match = html.match(pattern);
  return match ? cleanHtmlText(match[1]) : null;
}

function cleanHtmlText(value) {
  if (value == null) return null;
  return (
    decodeHtmlEntities(String(value))
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/(p|li|div|tr|dt|dd|h[1-6])>/gi, "\n")
      .replace(/<[^>]+>/g, " ")
      .replace(/[ \t\r\f\v]+/g, " ")
      .replace(/\n\s+/g, "\n")
      .replace(/\s*\n\s*/g, "\n")
      .replace(/\n{2,}/g, "\n")
      .trim()
      .replace(/\s+/g, " ") || null
  );
}

function decodeHtmlEntities(value) {
  return String(value)
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)));
}

function firstMatch(value, pattern) {
  const match = value?.match(pattern);
  return match ? match[1] : null;
}

function fileExtension(url) {
  const pathname = new URL(url).pathname;
  const match = pathname.match(/\.([a-z0-9]+)$/i);
  return match ? match[1].toLowerCase() : null;
}

function documentTypeFromExtension(extension) {
  if (!extension) return "file";
  if (extension === "pdf") return "pdf";
  if (extension === "doc" || extension === "docx") return "word_document";
  if (extension === "xls" || extension === "xlsx") return "spreadsheet";
  return extension;
}

function canonicalUrl(value) {
  const url = new URL(value, SOURCE_BASE_URL);
  url.hash = "";
  for (const key of [...url.searchParams.keys()]) {
    if (/^(utm_|gclid|fbclid)/i.test(key)) {
      url.searchParams.delete(key);
    }
  }
  return url.toString();
}

function normalizeComparableText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function normalizeDate(value) {
  if (!value) return null;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return String(value);
  return parsed.toISOString();
}

function parseInteger(value) {
  return Number(String(value).replace(/,/g, ""));
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

async function readJsonIfExists(filePath) {
  try {
    return JSON.parse(await readFile(filePath, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }
}

async function writeJson(filePath, value) {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function relativePath(filePath) {
  return path.relative(process.cwd(), filePath);
}

function camelCase(value) {
  return value.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

function parseBoolean(value, fallback) {
  if (value == null) return fallback;
  if (typeof value === "boolean") return value;
  return ["1", "true", "yes", "on"].includes(String(value).toLowerCase());
}

function safeTimestamp(value) {
  return value.replace(/[:.]/g, "-");
}

function positiveInteger(value, fallback, label) {
  if (value == null) {
    if (fallback == null) throw new Error(`Missing ${label}.`);
    return fallback;
  }
  const number = Number(value);
  if (!Number.isInteger(number) || number <= 0) {
    throw new Error(`Invalid ${label}: ${value}. Expected a positive integer.`);
  }
  return number;
}

function nonNegativeInteger(value, fallback, label) {
  if (value == null) return fallback;
  const number = Number(value);
  if (!Number.isInteger(number) || number < 0) {
    throw new Error(`Invalid ${label}: ${value}. Expected a non-negative integer.`);
  }
  return number;
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
