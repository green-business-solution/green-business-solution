#!/usr/bin/env node

import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { BatchWriteCommand, DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { fromIni } from "@aws-sdk/credential-providers";

const SOURCE_KEY = "SOURCE_SDGE_BUSINESS";
const SOURCE_NAME = "San Diego Gas & Electric Business Programs";
const SOURCE_BASE_URL = "https://www.sdge.com/";
const DEFAULT_OUTPUT_DIR = "var/opportunity-ingestion/sdge";
const DEFAULT_DYNAMODB_TABLE = "gbs-opportunity-candidates";
const DEFAULT_AWS_REGION = "us-east-2";
const DEFAULT_AWS_PROFILE = "gbs";
const DEFAULT_DELAY_MS = 150;
const DEFAULT_USER_AGENT =
  "GreenBusinessSolutionBot/0.1 (+https://github.com/green-business-solution/green-business-solution)";

const DEFAULT_SEED_URLS = [
  "https://www.sdge.com/business/save-energy-and-money",
  "https://www.sdge.com/business/savings-center/business-winter-savings-safety-and-solutions",
  "https://www.sdge.com/businesses/savings-center/energy-management-programs/demand-response",
  "https://www.sdge.com/business/electric-vehicles/lovelectric",
  "https://www.sdge.com/node/14441"
];

const BUSINESS_HUB_TITLES = new Set([
  "energy efficiency programs",
  "demand response programs",
  "gogreen financing",
  "san diego learn program"
]);

const DEMAND_RESPONSE_URLS = new Set([
  "https://www.sdge.com/node/555",
  "https://www.sdge.com/node/19551"
]);

const EV_TITLES = new Set([
  "power your drive for apartments and condos",
  "power your drive for fleets",
  "power your drive for schools parks and beaches",
  "power your drive for schools parks beaches",
  "power your drive for workplaces",
  "charge with lower pricing",
  "ev infrastructure rule",
  "national electric vehicle infrastructure nevi program",
  "electric vehicle submeter billing",
  "transportation electrification advisory services teas",
  "hydrogen 101 for fleets"
]);

main().catch((error) => {
  console.error(`SDG&E ingestion failed: ${error.message}`);
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
  const runId = `sdge-business-${safeTimestamp(startedAt)}`;
  const config = {
    outputDir: path.resolve(process.cwd(), args.outputDir ?? DEFAULT_OUTPUT_DIR),
    seedUrls: parseSeedUrls(args.seedUrl ?? process.env.SDGE_SEED_URLS),
    limit: args.limit == null ? null : positiveInteger(args.limit, null, "limit"),
    requestDelayMs: nonNegativeInteger(args.requestDelayMs, DEFAULT_DELAY_MS, "request delay"),
    writeDynamodb: parseBoolean(args.writeDynamodb, false),
    dynamodbTable: args.dynamodbTable ?? process.env.GBS_OPPORTUNITIES_TABLE ?? DEFAULT_DYNAMODB_TABLE,
    awsRegion: args.awsRegion ?? process.env.AWS_REGION ?? DEFAULT_AWS_REGION,
    awsProfile: args.awsProfile ?? process.env.AWS_PROFILE ?? DEFAULT_AWS_PROFILE,
    userAgent: process.env.SDGE_USER_AGENT ?? DEFAULT_USER_AGENT
  };

  const result = await gatherFromSeedPages(config);
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

  console.log("SDG&E ingestion completed in business seed-page mode.");
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
Gather SDG&E business opportunity candidates from bounded business-program seed pages.

Usage:
  npm run gather:sdge
  npm run gather:sdge:aws
  node scripts/gather-sdge-opportunities.mjs --limit 10

Options:
  --limit 25
  --request-delay-ms 150
  --seed-url https://www.sdge.com/business/save-energy-and-money,https://www.sdge.com/node/14441
  --write-dynamodb
  --dynamodb-table gbs-opportunity-candidates
  --aws-profile gbs
  --aws-region us-east-2

Environment:
  SDGE_SEED_URLS       Optional comma-separated seed URL override.
  SDGE_USER_AGENT      Optional user-agent override.
`);
}

async function gatherFromSeedPages(config) {
  const retrievedAt = new Date().toISOString();
  const sourceDocuments = [];
  const rawRecords = [];

  for (const [index, seedUrl] of config.seedUrls.entries()) {
    if (index > 0 && config.requestDelayMs > 0) {
      await sleep(config.requestDelayMs);
    }

    const response = await fetchText(seedUrl, {
      accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      userAgent: config.userAgent
    });
    const pageUrl = canonicalUrl(response.finalUrl);
    const rawHash = sha256(response.body);
    const pageTitle = extractPageTitle(response.body) ?? pageUrl;

    sourceDocuments.push({
      sourceKey: SOURCE_KEY,
      sourceName: SOURCE_NAME,
      documentType: "sdge_business_seed_page",
      originalUrl: seedUrl,
      finalUrl: response.finalUrl,
      canonicalUrl: pageUrl,
      title: pageTitle,
      contentType: response.contentType,
      httpStatus: response.httpStatus,
      retrievedAt,
      rawHash
    });

    const pageContext = {
      seedUrl,
      pageUrl,
      pageTitle,
      retrievedAt,
      rawHash,
      httpStatus: response.httpStatus,
      contentType: response.contentType
    };

    rawRecords.push(...parseRawRecordsFromPage(response.body, pageContext));

    if (config.limit != null && rawRecords.length >= config.limit) {
      rawRecords.length = config.limit;
      break;
    }
  }

  const normalizedRecords = dedupeByRecordKey(rawRecords.map((record) => normalizeSdgeRecord(record, retrievedAt)));

  return {
    rawRecords,
    normalizedRecords,
    sourceDocuments,
    context: {
      mode: "business_seed_pages",
      isFullInventory: config.limit == null,
      seedUrls: config.seedUrls,
      limitations: [
        "SDG&E mode currently imports named programs from curated SDG&E business seed pages. It records external partner URLs but does not crawl external partner sites yet.",
        "Program classifications are deterministic keyword inferences from SDG&E page text and should remain human-reviewable in the admin dashboard.",
        "Some statewide utility programs may later duplicate records gathered from PG&E, SCE, CEC, or DSIRE. Those merges should happen in the normalized relational opportunity schema."
      ]
    }
  };
}

function parseRawRecordsFromPage(html, context) {
  const pathname = new URL(context.pageUrl).pathname;

  if (pathname === "/business/save-energy-and-money") {
    return parseBusinessProgramTableRows(html, context);
  }

  if (pathname.includes("/business-winter-savings-safety-and-solutions")) {
    return parseProgramTiles(html, context, {
      documentType: "business_program_tile",
      allowedTitles: BUSINESS_HUB_TITLES,
      sectionCategory: "Business Programs"
    });
  }

  if (pathname.includes("/demand-response")) {
    return [
      ...parseProgramTiles(html, context, {
        documentType: "demand_response_program_tile",
        allowedUrls: DEMAND_RESPONSE_URLS,
        sectionCategory: "Demand Response for Business"
      }),
      ...parseDemandResponseSections(html, context)
    ];
  }

  if (pathname === "/business/electric-vehicles/lovelectric") {
    return parseProgramTiles(html, context, {
      documentType: "ev_business_program_tile",
      allowedTitles: EV_TITLES,
      sectionCategory: "EV Charging Programs for Businesses"
    });
  }

  if (pathname === "/node/14441" || pathname === "/edr") {
    return parseEconomicDevelopmentRate(html, context);
  }

  return [];
}

function parseBusinessProgramTableRows(html, context) {
  const records = [];
  const rowPattern = /<tr\b[^>]*>([\s\S]*?)<\/tr>/gi;
  let match;

  while ((match = rowPattern.exec(html)) != null) {
    const rowHtml = match[0];
    const cells = extractTableCells(rowHtml);
    if (cells.length < 2 || /<th\b/i.test(rowHtml)) {
      continue;
    }

    const sectionHeading = findNearestAccordionHeading(html, match.index);
    const sectionCategory = normalizeSectionCategory(sectionHeading);
    if (!sectionCategory || !isBusinessProgramSection(sectionCategory)) {
      continue;
    }

    const links = parseLinks(cells[0], context.pageUrl);
    const title = normalizeProgramTitle(links[0]?.text ?? cleanHtmlText(cells[0]));
    const description = cleanHtmlText(cells[1]);
    const contractor = cleanHtmlText(cells[2]);

    if (!title || !description) {
      continue;
    }

    const programUrl = links[0]?.url ?? null;

    records.push({
      title,
      summary: description,
      sourceUrl: context.pageUrl,
      programUrl,
      applicationUrl: programUrl,
      documentType: "business_program_table",
      pageTitle: context.pageTitle,
      sectionHeading,
      sectionCategory,
      contractor,
      retrievedAt: context.retrievedAt,
      rawHash: context.rawHash,
      rowHash: sha256(rowHtml),
      parserVersion: "sdge-business-program-table-v1",
      raw: {
        rowText: cleanHtmlText(rowHtml),
        linkText: links[0]?.text ?? null,
        linkUrl: programUrl,
        tableCells: cells.map(cleanHtmlText)
      }
    });
  }

  return records;
}

function parseProgramTiles(html, context, { documentType, allowedTitles, allowedUrls, sectionCategory }) {
  const records = [];
  const h5Pattern = /<h5\b[^>]*>([\s\S]*?)<\/h5>/gi;
  const h5Matches = [...html.matchAll(h5Pattern)];

  for (const [index, match] of h5Matches.entries()) {
    const title = normalizeProgramTitle(cleanHtmlText(match[1]));
    if (!title) {
      continue;
    }

    const start = match.index ?? 0;
    const nextH5 = h5Matches[index + 1]?.index ?? html.length;
    const nextH2 = indexOfAfter(html, /<h2\b/i, start + match[0].length);
    const end = Math.min(nextH5, nextH2 === -1 ? html.length : nextH2, html.indexOf("</article>", start) === -1 ? html.length : html.indexOf("</article>", start));
    const sectionHtml = html.slice(start, end);
    const links = parseLinks(sectionHtml, context.pageUrl);
    const programUrl = links[0]?.url ?? null;

    if (allowedTitles && !allowedTitles.has(normalizeComparableText(title))) {
      continue;
    }

    if (allowedUrls && (!programUrl || !allowedUrls.has(programUrl))) {
      continue;
    }

    const summary = extractFirstMeaningfulParagraph(sectionHtml) ?? title;

    records.push({
      title,
      summary,
      sourceUrl: context.pageUrl,
      programUrl,
      applicationUrl: programUrl,
      documentType,
      pageTitle: context.pageTitle,
      sectionHeading: title,
      sectionCategory,
      contractor: null,
      retrievedAt: context.retrievedAt,
      rawHash: context.rawHash,
      rowHash: sha256(sectionHtml),
      parserVersion: "sdge-program-tile-v1",
      raw: {
        sectionText: cleanHtmlText(sectionHtml),
        linkText: links[0]?.text ?? null,
        linkUrl: programUrl
      }
    });
  }

  return records;
}

function parseDemandResponseSections(html, context) {
  const criticalPeakSection = extractSectionByHeading(html, "Critical Peak Pricing Plans", {
    untilHeading: "Frequently Asked Questions"
  });

  if (!criticalPeakSection) {
    return [];
  }

  const links = parseLinks(criticalPeakSection.html, context.pageUrl);
  const applicationLink = links.find((link) => link.text.toLowerCase().includes("review")) ?? links[0] ?? null;

  return [
    {
      title: "Critical Peak Pricing Plans",
      summary:
        cleanHtmlText(criticalPeakSection.html) ??
        "Critical peak pricing plans help SDG&E business customers reduce energy use during event-day hours.",
      sourceUrl: context.pageUrl,
      programUrl: applicationLink?.url ?? context.pageUrl,
      applicationUrl: applicationLink?.url ?? null,
      documentType: "demand_response_section",
      pageTitle: context.pageTitle,
      sectionHeading: "Critical Peak Pricing Plans",
      sectionCategory: "Demand Response for Business",
      contractor: "SDG&E",
      retrievedAt: context.retrievedAt,
      rawHash: context.rawHash,
      rowHash: sha256(criticalPeakSection.html),
      parserVersion: "sdge-demand-response-section-v1",
      raw: {
        sectionText: cleanHtmlText(criticalPeakSection.html),
        links
      }
    }
  ];
}

function parseEconomicDevelopmentRate(html, context) {
  const title = cleanHtmlText(firstMatch(html, /<h1\b[^>]*>([\s\S]*?)<\/h1>/i)) ?? "Economic Development Rate Program";
  const overview = extractSectionByHeading(html, "Program Overview");
  const eligibility = extractSectionByHeading(html, "Eligibility Requirements");
  const limitations = extractSectionByHeading(html, "Program Limitations");
  const enrollment = extractSectionByHeading(html, "How to enroll in the program");
  const documents = parseLinks(html, context.pageUrl)
    .filter((link) => fileExtension(link.url) === "pdf")
    .map((link) => ({
      title: link.text,
      url: link.url,
      extension: "pdf",
      documentType: "pdf"
    }));
  const applicationLink =
    parseLinks(enrollment?.html ?? html, context.pageUrl).find((link) => link.url.includes("economic-development-rate")) ??
    parseLinks(html, context.pageUrl).find((link) => link.text.toLowerCase().includes("interest form"));
  const summary =
    cleanHtmlText(
      [
        overview?.html,
        eligibility ? `<p>${cleanHtmlText(eligibility.html)}</p>` : null,
        limitations ? `<p>${cleanHtmlText(limitations.html)}</p>` : null
      ]
        .filter(Boolean)
        .join(" ")
    ) ?? title;

  return [
    {
      title,
      summary,
      sourceUrl: context.pageUrl,
      programUrl: context.pageUrl,
      applicationUrl: applicationLink?.url ?? null,
      documentType: "economic_development_rate_page",
      pageTitle: context.pageTitle,
      sectionHeading: title,
      sectionCategory: "Economic Development Rate",
      contractor: "SDG&E",
      documents,
      retrievedAt: context.retrievedAt,
      rawHash: context.rawHash,
      rowHash: sha256([overview?.html, eligibility?.html, limitations?.html, enrollment?.html].join("\n")),
      parserVersion: "sdge-economic-development-rate-v1",
      raw: {
        overview: cleanHtmlText(overview?.html),
        eligibility: cleanHtmlText(eligibility?.html),
        limitations: cleanHtmlText(limitations?.html),
        enrollment: cleanHtmlText(enrollment?.html),
        documents
      }
    }
  ];
}

function normalizeSdgeRecord(record, retrievedAt) {
  const programUrl = record.programUrl ? canonicalUrl(record.programUrl) : null;
  const sourceUrl = canonicalUrl(record.sourceUrl);
  const textForInference = normalizeComparableText(
    [
      record.title,
      record.summary,
      record.sectionHeading,
      record.sectionCategory,
      record.contractor,
      programUrl,
      record.raw?.sectionText,
      record.raw?.rowText,
      record.raw?.eligibility,
      record.raw?.limitations
    ].join(" ")
  );
  const status = inferStatus(textForInference);
  const programType = inferProgramType(textForInference);
  const technologies = inferTechnologies(textForInference);
  const matchingParameters = inferMatchingParameters(record, {
    text: textForInference,
    status,
    technologies
  });
  const contentHash = sha256(
    stableStringify({
      title: record.title,
      summary: record.summary,
      sourceUrl,
      programUrl,
      applicationUrl: record.applicationUrl,
      sectionCategory: record.sectionCategory,
      contractor: record.contractor,
      documents: record.documents,
      rowHash: record.rowHash
    })
  );
  const externalId = programUrl ? urlFingerprint(programUrl) : `section_hash:${record.rowHash.slice(0, 16)}`;

  return {
    sourceKey: SOURCE_KEY,
    sourceName: SOURCE_NAME,
    ingestionMode: "sdge_business_seed_pages",
    recordKind: "canonical_candidate",
    externalId,
    externalIdType: programUrl ? "program_url" : "source_section_hash",
    canonicalTitle: record.title,
    normalizedTitle: normalizeComparableText(record.title),
    sourceUrl,
    origin: buildOrigin(sourceUrl, record.documentType),
    status,
    sourceStatus: status,
    category: record.sectionCategory || "Utility Business Program",
    programType,
    state: "CA",
    stateName: "California",
    summary: record.summary,
    administrator: "SDG&E",
    deliveryPartner: record.contractor && record.contractor !== "SDG&E" ? record.contractor : null,
    contractor: record.contractor,
    applicationUrl: record.applicationUrl ? canonicalUrl(record.applicationUrl) : null,
    websiteUrl: programUrl ?? sourceUrl,
    documents: record.documents ?? [],
    technologies,
    sectors: matchingParameters.businessClassification.values,
    geography: {
      state: "CA",
      stateName: "California",
      geographyType: matchingParameters.zipCode.mode,
      zipCodeMode: matchingParameters.zipCode.mode,
      zipCodes: matchingParameters.zipCode.values,
      utilityProvider: matchingParameters.utilityProvider.values
    },
    eligibilityRules: {
      geography: matchingParameters.zipCode,
      utilityProvider: matchingParameters.utilityProvider,
      businessClassification: matchingParameters.businessClassification,
      squareFootage: matchingParameters.squareFootage,
      demandKw: matchingParameters.demandKw
    },
    matchingParameters,
    sdge: {
      pageTitle: record.pageTitle,
      sectionHeading: record.sectionHeading,
      sectionCategory: record.sectionCategory,
      contractor: record.contractor,
      programUrl,
      parserVersion: record.parserVersion
    },
    evidence: [
      {
        sourceName: SOURCE_NAME,
        sourceUrl,
        documentType: record.documentType,
        sectionHeading: record.sectionHeading,
        sectionCategory: record.sectionCategory,
        retrievedAt,
        rawContentHash: record.rawHash,
        sectionHash: record.rowHash,
        extractedText: trimForEvidence(record.summary),
        linkUrl: programUrl,
        parserVersion: record.parserVersion
      }
    ],
    raw: record.raw,
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

function inferMatchingParameters(record, { text, status, technologies }) {
  const isStatewide = normalizeComparableText(record.sectionCategory).includes("statewide");
  const businessClassification = inferBusinessClassifications(text, record);
  const squareFootage = inferSquareFootage(text);
  const demandKw = inferDemandKw(text);
  const isCurrentlyMatchable = ["active", "open", "unknown"].includes(status);

  return {
    zipCode: {
      parameter: "zip_code",
      mode: isStatewide ? "california_statewide_utility_program" : "sdge_service_territory",
      values: [],
      state: "CA",
      confidence: isStatewide ? "medium" : "high",
      method: "source_rule",
      rationale: isStatewide
        ? "SDG&E lists this as a statewide program. ZIP-specific eligibility should be resolved with utility territory data later."
        : "SDG&E business source pages generally apply to customers in SDG&E's service territory unless the page says otherwise."
    },
    utilityProvider: {
      parameter: "utility_provider",
      mode: isStatewide ? "statewide_program_listed_by_sdge" : "sdge_service_territory",
      values: isStatewide ? ["Any", "SDG&E"] : ["SDG&E"],
      confidence: isStatewide ? "medium" : "high",
      method: "source_rule",
      rationale: isStatewide
        ? "The SDG&E source page labels this as a statewide program, so it may apply beyond SDG&E customers."
        : "The opportunity originated from an SDG&E business program page."
    },
    businessClassification,
    squareFootage,
    demandKw,
    technologyTags: technologies,
    isCurrentlyMatchable,
    matchingWarnings: [
      ...(businessClassification.confidence === "low" ? ["business_classification_needs_review"] : []),
      ...(isStatewide ? ["statewide_program_may_duplicate_other_utility_sources"] : [])
    ]
  };
}

function inferBusinessClassifications(text, record) {
  const values = new Set();
  const evidence = [];
  const section = normalizeComparableText(record.sectionCategory);
  const combinedText = [section, text].join(" ");

  addIf(combinedText, values, evidence, ["small business"], ["small_business", "commercial"]);
  addIf(combinedText, values, evidence, ["commercial", "business", "office", "retail", "wholesale"], ["commercial"]);
  addIf(combinedText, values, evidence, ["restaurant", "foodservice", "food service", "grocery", "groceries", "food storage"], ["food_service", "retail", "commercial"]);
  addIf(combinedText, values, evidence, ["hotel", "motel", "lodging", "hospitality"], ["lodging_hospitality", "commercial"]);
  addIf(combinedText, values, evidence, ["industrial", "manufacturer", "manufacturing", "construction", "mining", "waste management"], ["industrial"]);
  addIf(combinedText, values, evidence, ["water infrastructure", "water production", "water distribution", "water treatment"], ["industrial", "government", "public_sector"]);
  addIf(combinedText, values, evidence, ["agriculture", "agricultural", "farm", "crops", "livestock"], ["agricultural"]);
  if (!combinedText.includes("non governmental")) {
    addIf(combinedText, values, evidence, ["public sector", "state agency", "state owned", "government"], ["government", "public_sector"]);
  }
  addIf(combinedText, values, evidence, ["school", "higher education", "college", "university"], ["education", "public_sector"]);
  addIf(combinedText, values, evidence, ["healthcare", "health care", "hospital"], ["healthcare"]);
  addIf(combinedText, values, evidence, ["multifamily", "multi family", "apartments", "condos"], ["multifamily"]);
  addIf(combinedText, values, evidence, ["fleet", "workplace", "ev charging"], ["commercial", "government", "public_sector"]);

  if (values.size === 0 && text.includes("business")) {
    values.add("commercial");
    evidence.push("business");
  }

  if (values.size === 0) {
    values.add("unknown");
    evidence.push("no_business_classification_keywords_found");
  }

  return {
    parameter: "business_classification",
    values: [...values],
    confidence: values.has("unknown") ? "low" : evidence.length > 0 ? "medium" : "low",
    method: "keyword_rules",
    evidence,
    rationale:
      "Inferred from SDG&E section labels, program titles, contractor labels, and descriptions. This remains human-reviewable in the admin dashboard."
  };
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
      method: "source_text_scan",
      rationale: "No square-footage eligibility language was found on the SDG&E source page section."
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

function inferDemandKw(text) {
  const lessThanMatch = text.match(/(?:demand\s*)?<\s*(\d[\d,]*)\s*kw/i);
  if (lessThanMatch) {
    return {
      parameter: "demand_kw",
      mode: "explicit_text_found",
      min: null,
      max: parseInteger(lessThanMatch[1]),
      confidence: "medium",
      method: "regex",
      evidence: lessThanMatch[0]
    };
  }

  const atOrBelowMatch = text.match(/(\d[\d,]*)\s*kilowatts?\s*\(kw\)\s*or\s*less/i);
  if (atOrBelowMatch) {
    return {
      parameter: "demand_kw",
      mode: "explicit_text_found",
      min: null,
      max: parseInteger(atOrBelowMatch[1]),
      confidence: "medium",
      method: "regex",
      evidence: atOrBelowMatch[0]
    };
  }

  return {
    parameter: "demand_kw",
    mode: "not_specified",
    min: null,
    max: null,
    confidence: "high",
    method: "source_text_scan",
    rationale: "No demand threshold was found in the SDG&E source page section."
  };
}

function inferTechnologies(text) {
  const tags = new Set();

  addTagIf(text, tags, ["energy efficiency", "efficiency", "energy savings", "save energy"], "energy_efficiency");
  addTagIf(text, tags, ["hvac", "heating", "cooling"], "HVAC");
  addTagIf(text, tags, ["lighting"], "lighting");
  addTagIf(text, tags, ["refrigeration", "food storage"], "refrigeration");
  addTagIf(text, tags, ["foodservice", "food service", "restaurant"], "food_service_equipment");
  addTagIf(text, tags, ["ev charging", "charger", "electric vehicle", "charging stations"], "EV_charging");
  addTagIf(text, tags, ["fleet", "transportation electrification", "hydrogen"], "fleet_electrification");
  addTagIf(text, tags, ["demand response", "critical peak", "load reduction", "reduce energy use"], "demand_response");
  addTagIf(text, tags, ["battery", "storage"], "battery_storage");
  addTagIf(text, tags, ["water heating"], "water_heating");
  addTagIf(text, tags, ["water infrastructure", "water production", "water treatment"], "water_efficiency");
  addTagIf(text, tags, ["building controls", "energy management"], "building_controls");
  addTagIf(text, tags, ["decarbonization"], "building_decarbonization");
  addTagIf(text, tags, ["financing", "loan"], "financing");
  addTagIf(text, tags, ["economic development rate", "discount", "pricing plan", "rate"], "rate_discount");

  if (tags.size === 0) {
    tags.add("utility_program");
  }

  return [...tags];
}

function inferProgramType(text) {
  if (text.includes("demand response") || text.includes("load reduction")) return "demand_response";
  if (text.includes("financing")) return "financing";
  if (text.includes("critical peak") || text.includes("pricing plan") || text.includes("discount") || text.includes("economic development rate")) {
    return "rate_discount";
  }
  if (
    text.includes("instant rebates") ||
    text.includes("rebate") ||
    text.includes("incentive") ||
    text.includes("reduced prices") ||
    text.includes("equipment upgrades")
  ) {
    return "rebate";
  }
  if (
    text.includes("training") ||
    text.includes("advisory") ||
    text.includes("no cost support") ||
    text.includes("design assistance") ||
    text.includes("site assessments") ||
    text.includes("direct installation") ||
    text.includes("application process") ||
    text.includes("courses") ||
    text.includes("recommendations") ||
    text.includes("technical") ||
    text.includes("resources")
  ) {
    return "technical_assistance";
  }
  if (text.includes("energy efficiency projects") || text.includes("energy savings") || text.includes("save energy") || text.includes("reduce electric use")) return "rebate";
  if (text.includes("learn how")) return "technical_assistance";
  if (text.includes("submeter billing")) return "rate_discount";
  return "utility_program";
}

function inferStatus(text) {
  if (text.includes("closed") || text.includes("expired")) return "closed";
  if (text.includes("waitlist")) return "waitlist";
  if (text.includes("fully subscribed")) return "fully_subscribed";
  if (text.includes("coming soon") || text.includes("coming")) return "upcoming";
  if (text.includes("current") || text.includes("eligible") || text.includes("offers") || text.includes("available")) return "active";
  return "unknown";
}

function validateNormalizedRecords(records, { checkedAt }) {
  const validatedRecords = records.map((record) => {
    const criticalIssues = [];
    const warnings = [];

    if (!record.sourceKey) criticalIssues.push("missing_source_key");
    if (!record.sourceName) criticalIssues.push("missing_source_name");
    if (!record.externalId) criticalIssues.push("missing_external_id");
    if (!record.canonicalTitle || record.canonicalTitle.length < 4) criticalIssues.push("missing_or_short_title");
    if (!record.sourceUrl || !record.sourceUrl.startsWith("https://www.sdge.com/")) criticalIssues.push("invalid_source_url");
    if (!record.origin?.sourceKey || !record.origin?.sourceName || !record.origin?.sourceUrl) {
      criticalIssues.push("missing_origin_metadata");
    }
    if (!Array.isArray(record.evidence) || record.evidence.length === 0) {
      criticalIssues.push("missing_source_evidence");
    }
    if (!record.contentHash || record.contentHash.length !== 64) criticalIssues.push("missing_or_invalid_content_hash");
    if (!record.summary) warnings.push("missing_summary");
    if (!record.applicationUrl && !record.websiteUrl) warnings.push("missing_application_or_program_url");
    if (record.programType === "utility_program") warnings.push("generic_program_type_needs_review");
    if (record.matchingParameters?.businessClassification?.confidence === "low") {
      warnings.push("business_classification_low_confidence");
    }
    if (record.matchingParameters?.matchingWarnings?.length > 0) {
      warnings.push(...record.matchingParameters.matchingWarnings);
    }

    const isWritable = criticalIssues.length === 0;
    return {
      ...record,
      reviewStatus: isWritable ? "needs_review" : "rejected",
      dataQuality: {
        validator: "sdge-opportunity-validator-v1",
        checkedAt,
        status: isWritable && warnings.length === 0 ? "clean" : isWritable ? "clean_with_warnings" : "rejected",
        isWritable,
        criticalIssues,
        warnings: uniqueArray(warnings)
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
      normalizedTitle: record.normalizedTitle,
      sourceUrl: record.sourceUrl,
      origin: record.origin,
      status: record.status,
      sourceStatus: record.sourceStatus,
      category: record.category,
      programType: record.programType,
      state: record.state,
      stateName: record.stateName,
      summary: record.summary,
      administrator: record.administrator,
      deliveryPartner: record.deliveryPartner,
      contractor: record.contractor,
      applicationUrl: record.applicationUrl,
      websiteUrl: record.websiteUrl,
      documents: record.documents,
      technologies: record.technologies,
      sectors: record.sectors,
      geography: record.geography,
      eligibilityRules: record.eligibilityRules,
      matchingParameters: record.matchingParameters,
      sdge: record.sdge,
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
    seedUrls: context.seedUrls,
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
      "The importer stores SDG&E source/origin metadata on every writable opportunity candidate."
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
    programType: record.programType,
    contentHash: record.contentHash
  };
}

function recordKey(record) {
  return `${record.sourceKey}:${record.externalIdType}:${record.externalId}`;
}

function dedupeByRecordKey(records) {
  const seen = new Set();
  const deduped = [];

  for (const record of records) {
    const key = recordKey(record);
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    deduped.push(record);
  }

  return deduped;
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

function extractTableCells(rowHtml) {
  return [...rowHtml.matchAll(/<td\b[^>]*>([\s\S]*?)<\/td>/gi)].map((match) => match[1]);
}

function findNearestAccordionHeading(html, index) {
  const prior = html.slice(Math.max(0, index - 12000), index);
  const headings = [...prior.matchAll(/<a\b[^>]*class="[^"]*\bcollapsed\b[^"]*"[^>]*>([\s\S]*?)<\/a>/gi)];
  return cleanHtmlText(headings.at(-1)?.[1]);
}

function normalizeSectionCategory(sectionHeading) {
  if (!sectionHeading) return null;
  return cleanHtmlText(sectionHeading.split(" - ")[0]);
}

function isBusinessProgramSection(sectionCategory) {
  return ["Commercial", "Industrial", "Agriculture", "Statewide Programs"].includes(sectionCategory);
}

function extractFirstMeaningfulParagraph(html) {
  const paragraphs = [...html.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)]
    .map((match) => cleanHtmlText(match[1]))
    .filter(Boolean)
    .filter((value) => !/^learn more|^get started|^review the plan|^explore|^participate|^register/i.test(value))
    .filter((value) => value.length > 20);

  return paragraphs[0] ?? null;
}

function extractSectionByHeading(html, heading, options = {}) {
  const headingPattern = new RegExp(`<h[1-6][^>]*>\\s*(?:<[^>]+>\\s*)*${escapeRegex(heading)}[\\s\\S]*?<\\/h[1-6]>`, "i");
  const match = html.match(headingPattern);
  if (!match || match.index == null) {
    return null;
  }

  const start = match.index;
  let end = html.length;
  if (options.untilHeading) {
    const untilPattern = new RegExp(`<h[1-6][^>]*>\\s*(?:<[^>]+>\\s*)*${escapeRegex(options.untilHeading)}`, "i");
    const untilIndex = indexOfAfter(html, untilPattern, start + match[0].length);
    if (untilIndex !== -1) {
      end = untilIndex;
    }
  } else {
    const nextHeading = indexOfAfter(html, /<h[1-6]\b/i, start + match[0].length);
    if (nextHeading !== -1) {
      end = nextHeading;
    }
  }

  return {
    heading,
    html: html.slice(start, end)
  };
}

function parseLinks(html, baseUrl) {
  const links = [];
  const pattern = /<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
  let match;

  while ((match = pattern.exec(html)) != null) {
    const href = decodeHtmlEntities(match[1]);
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
      continue;
    }

    let url;
    try {
      url = canonicalUrl(new URL(href, baseUrl).toString());
    } catch {
      continue;
    }

    links.push({
      url,
      text: cleanHtmlText(match[2]) ?? url
    });
  }

  return links;
}

function canonicalUrl(value) {
  let url = new URL(value, SOURCE_BASE_URL);

  if (url.hostname.endsWith("safelinks.protection.outlook.com") && url.searchParams.get("url")) {
    url = new URL(url.searchParams.get("url"));
  }

  url.hash = "";
  url.hostname = url.hostname.toLowerCase();
  for (const key of [...url.searchParams.keys()]) {
    if (/^(utm_|gclid|fbclid|mc_|data|sdata|reserved)$/i.test(key)) {
      url.searchParams.delete(key);
    }
  }

  if (url.pathname !== "/" && url.pathname.endsWith("/")) {
    url.pathname = url.pathname.slice(0, -1);
  }
  url.pathname = url.pathname.replace(/%C2%A0$/i, "");

  return url.toString();
}

function normalizeProgramTitle(value) {
  return cleanHtmlText(value)
    ?.replace(/\s+-\s+Header$/i, "")
    .replace(/\s+\(Market Access Program\)$/i, " (Market Access Program)")
    .trim();
}

function extractPageTitle(html) {
  return (
    cleanHtmlText(firstMatch(html, /<meta property="og:title" content="([^"]+)"/i)) ??
    cleanHtmlText(firstMatch(html, /<title\b[^>]*>([\s\S]*?)<\/title>/i))
  );
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

function addTagIf(text, tags, keywords, tag) {
  if (keywords.some((keyword) => text.includes(keyword))) {
    tags.add(tag);
  }
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

function indexOfAfter(value, pattern, start) {
  const slice = value.slice(start);
  const match = slice.match(pattern);
  return match && match.index != null ? start + match.index : -1;
}

function escapeRegex(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function parseSeedUrls(value) {
  if (!value) {
    return DEFAULT_SEED_URLS;
  }

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .map(canonicalUrl);
}

function urlFingerprint(value) {
  const url = new URL(value);
  return `${url.hostname}${url.pathname}`.replace(/^www\./, "").replace(/[^a-z0-9]+/gi, "_").replace(/^_|_$/g, "").toLowerCase();
}

function trimForEvidence(value) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, 1000);
}

function normalizeComparableText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
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

function chunks(items, chunkSize) {
  const result = [];
  for (let index = 0; index < items.length; index += chunkSize) {
    result.push(items.slice(index, index + chunkSize));
  }
  return result;
}

function safeTimestamp(value) {
  return value.replace(/[:.]/g, "-");
}

function camelCase(value) {
  return value.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

function positiveInteger(value, fallback, label) {
  if (value == null || value === "") {
    return fallback;
  }

  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new Error(`Invalid ${label}: expected a positive integer.`);
  }
  return parsed;
}

function nonNegativeInteger(value, fallback, label) {
  if (value == null || value === "") {
    return fallback;
  }

  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 0) {
    throw new Error(`Invalid ${label}: expected a non-negative integer.`);
  }
  return parsed;
}

function parseBoolean(value, fallback) {
  if (value == null) {
    return fallback;
  }
  if (value === true || value === "true" || value === "1" || value === "") {
    return true;
  }
  if (value === false || value === "false" || value === "0") {
    return false;
  }
  throw new Error(`Invalid boolean value "${value}".`);
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

function relativePath(filePath) {
  return path.relative(process.cwd(), filePath);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
