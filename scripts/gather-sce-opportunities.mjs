#!/usr/bin/env node

import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { BatchWriteCommand, DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { fromIni } from "@aws-sdk/credential-providers";

const SOURCE_KEY = "SOURCE_SCE_BUSINESS";
const SOURCE_NAME = "Southern California Edison Business Programs";
const SOURCE_BASE_URL = "https://www.sce.com/";
const DEFAULT_OUTPUT_DIR = "var/opportunity-ingestion/sce";
const DEFAULT_DYNAMODB_TABLE = "gbs-opportunity-candidates";
const DEFAULT_AWS_REGION = "us-east-2";
const DEFAULT_AWS_PROFILE = "gbs";
const DEFAULT_DELAY_MS = 150;
const PARSER_VERSION = "sce-bounded-business-sections-v1";
const DEFAULT_USER_AGENT =
  "GreenBusinessSolutionBot/0.1 (+https://github.com/green-business-solution/green-business-solution)";

const SOURCE_DEFINITIONS = [
  {
    url: "https://www.sce.com/business/save-costs-energy/savings-strategies/what-is-demand-response",
    documentType: "sce_demand_response_page",
    sections: [
      {
        title: "Emergency Load Reduction Program (ELRP)",
        category: "Demand Response Program",
        start: "Emergency Load Reduction Program (ELRP)",
        end: "Agricultural and Pumping Interruptible (AP-I) Program"
      },
      {
        title: "Agricultural and Pumping Interruptible (AP-I) Program",
        category: "Demand Response Program",
        start: "Agricultural and Pumping Interruptible (AP-I) Program",
        end: "Base Interruptible Program (BIP)"
      },
      {
        title: "Base Interruptible Program (BIP)",
        category: "Demand Response Program",
        start: "Base Interruptible Program (BIP)",
        end: "Demand Response for Business"
      },
      {
        title: "Demand Response Aggregator Options",
        category: "Demand Response Aggregator Network",
        start: "Demand Response Aggregators",
        end: "DR Resources"
      }
    ]
  },
  {
    url: "https://www.sce.com/business/save-costs-energy/savings-strategies-for-businesses/what-is-demand-response/capacity-bidding-program-elect-aggregators",
    documentType: "sce_cbp_e_aggregator_page",
    sections: [
      {
        title: "Capacity Bidding Program Elect (CBP-E)",
        category: "Demand Response Program",
        start: "What is the Capacity Bidding Program Elect (CBP-E)?",
        end: "How to Become a CBP-E Aggregator"
      }
    ]
  },
  {
    url: "https://www.sce.com/business/save-costs-energy/savings-strategies/building-improvement",
    documentType: "sce_building_improvement_page",
    sections: [
      {
        title: "Retrocommissioning Program",
        category: "Building Efficiency Program",
        start: "Retrocommissioning",
        end: "Continuous Energy Improvement"
      },
      {
        title: "Continuous Energy Improvement",
        category: "Building Efficiency Program",
        start: "Continuous Energy Improvement",
        end: "HVAC Optimization"
      },
      {
        title: "HVAC Optimization Program",
        category: "Building Efficiency Program",
        start: "HVAC Optimization",
        end: "Business Energy Guzzler"
      }
    ]
  },
  {
    url: "https://www.sce.com/business/smart-energy-solar/energy-efficiency-programs",
    documentType: "sce_energy_efficiency_financing_page",
    sections: [
      {
        title: "On-Bill Financing",
        category: "Energy Efficiency Financing",
        start: "On-Bill Financing",
        end: "GoGreen Business Energy Financing"
      },
      {
        title: "GoGreen Business Energy Financing",
        category: "Energy Efficiency Financing",
        start: "GoGreen Business Energy Financing",
        end: "Clean Energy Financing"
      }
    ]
  },
  {
    url: "https://www.sce.com/business/save-costs-energy/economic-development-assistance",
    documentType: "sce_economic_development_page",
    sections: [
      {
        title: "Economic Development Services",
        category: "Business Technical Assistance",
        start: "Economic Development Services",
        end: "GIS Power Site Search Tool"
      }
    ]
  },
  {
    url: "https://www.sce.com/business/smart-energy-solar/evs-for-business",
    documentType: "sce_evs_for_business_page",
    sections: [
      {
        title: "Charge Ready Program",
        category: "EV Charging Infrastructure Program",
        start: "Charge Ready EV Infrastructure assistance for businesses.",
        end: "Charge Ready Transport"
      },
      {
        title: "Charge Ready Transport",
        category: "EV Fleet Infrastructure Program",
        start: "Charge Ready Transport Resources to get your fleet moving more efficiently.",
        end: "TE Advisory Services"
      },
      {
        title: "TE Advisory Services",
        category: "Transportation Electrification Technical Assistance",
        start: "TE Advisory Services Transportation Electrification assistance for businesses.",
        end: "ReCharge Rebate"
      },
      {
        title: "ReCharge Rebate",
        category: "EV Fleet Rebate",
        start: "ReCharge Rebate Rebate to retrofit commercial vehicles to EV.",
        end: "CA Clean Fuel Reward"
      },
      {
        title: "CA Clean Fuel Reward",
        category: "EV Incentive",
        start: "CA Clean Fuel Reward Reward to reduce the upfront cost of commercial EVs.",
        end: "Rule 29 EV Guide"
      },
      {
        title: "Rule 29 EV Guide",
        category: "EV Infrastructure Installation Support",
        start: "Rule 29 EV Guide Streamlined installation for select business customers.",
        end: "The benefits of electrifying your business or organization"
      },
      {
        title: "Shared Fleet Charging Rebate",
        category: "EV Charging Rebate",
        start: "Shared Fleet Charging Rebate",
        end: "Language:"
      }
    ]
  }
];

main().catch((error) => {
  console.error(`SCE ingestion failed: ${error.message}`);
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
  const runId = `sce-business-${safeTimestamp(startedAt)}`;
  const config = {
    outputDir: path.resolve(process.cwd(), args.outputDir ?? DEFAULT_OUTPUT_DIR),
    limit: args.limit == null ? null : positiveInteger(args.limit, null, "limit"),
    requestDelayMs: nonNegativeInteger(args.requestDelayMs, DEFAULT_DELAY_MS, "request delay"),
    writeDynamodb: parseBoolean(args.writeDynamodb, false),
    dynamodbTable: args.dynamodbTable ?? process.env.GBS_OPPORTUNITIES_TABLE ?? DEFAULT_DYNAMODB_TABLE,
    awsRegion: args.awsRegion ?? process.env.AWS_REGION ?? DEFAULT_AWS_REGION,
    awsProfile: args.awsProfile ?? process.env.AWS_PROFILE ?? DEFAULT_AWS_PROFILE,
    userAgent: process.env.SCE_USER_AGENT ?? DEFAULT_USER_AGENT
  };

  const result = await gatherFromSourceDefinitions(config);
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

  console.log("SCE ingestion completed in bounded business-section mode.");
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

  if (result.context.parseWarnings.length > 0 || result.context.limitations.length > 0) {
    console.log("");
    console.log("Notes:");
    for (const warning of result.context.parseWarnings) {
      console.log(`- ${warning}`);
    }
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
Gather Southern California Edison business opportunity candidates from bounded official SCE pages.

Usage:
  npm run gather:sce
  npm run gather:sce:aws
  node scripts/gather-sce-opportunities.mjs --limit 10

Options:
  --limit 10
  --request-delay-ms 150
  --write-dynamodb
  --dynamodb-table gbs-opportunity-candidates
  --aws-profile gbs
  --aws-region us-east-2

Environment:
  SCE_USER_AGENT       Optional user-agent override.
`);
}

async function gatherFromSourceDefinitions(config) {
  const retrievedAt = new Date().toISOString();
  const sourceDocuments = [];
  const rawRecords = [];
  const parseWarnings = [];

  for (const [index, definition] of SOURCE_DEFINITIONS.entries()) {
    if (index > 0 && config.requestDelayMs > 0) {
      await sleep(config.requestDelayMs);
    }

    const response = await fetchText(definition.url, {
      accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      userAgent: config.userAgent
    });
    const sourceUrl = canonicalUrl(response.finalUrl || definition.url);
    const rawHash = sha256(response.body);
    const pageTitle = extractPageTitle(response.body) ?? sourceUrl;
    const textWithUrls = htmlToTextWithUrls(response.body, sourceUrl);
    const mainContent = extractMainContent(textWithUrls);
    const allLinks = parseLinks(response.body, sourceUrl);

    sourceDocuments.push({
      sourceKey: SOURCE_KEY,
      sourceName: SOURCE_NAME,
      documentType: definition.documentType,
      originalUrl: definition.url,
      finalUrl: sourceUrl,
      canonicalUrl: sourceUrl,
      title: pageTitle,
      contentType: response.contentType,
      httpStatus: response.httpStatus,
      retrievedAt,
      rawHash,
      cleanedHash: sha256(mainContent),
      parserVersion: PARSER_VERSION
    });

    for (const section of definition.sections) {
      let sectionText;
      try {
        sectionText = extractSectionText(mainContent, section);
      } catch (error) {
        parseWarnings.push(`${definition.url}: ${section.title}: ${error.message}`);
        continue;
      }

      if (!sectionText || sectionText.length < 70) {
        parseWarnings.push(`${definition.url}: ${section.title}: extracted section was too short`);
        continue;
      }

      rawRecords.push(
        buildRawRecord({
          definition,
          section,
          sectionText,
          sourceUrl,
          pageTitle,
          allLinks,
          retrievedAt,
          rawHash
        })
      );

      if (config.limit != null && rawRecords.length >= config.limit) {
        break;
      }
    }

    if (config.limit != null && rawRecords.length >= config.limit) {
      rawRecords.length = config.limit;
      break;
    }
  }

  const normalizedRecords = dedupeByRecordKey(rawRecords.map((record) => normalizeSceRecord(record, retrievedAt)));

  return {
    rawRecords,
    normalizedRecords,
    sourceDocuments,
    context: {
      mode: "bounded_business_sections",
      isFullInventory: config.limit == null,
      seedUrls: SOURCE_DEFINITIONS.map((definition) => definition.url),
      parseWarnings,
      limitations: [
        "SCE mode currently imports curated official SCE business pages and specific page sections. It does not run an unbounded crawl across sce.com.",
        "External partner and aggregator links are stored as evidence/application links, but external domains are not crawled.",
        "Some statewide or third-party programs listed by SCE may duplicate DSIRE, CEC, PG&E, or SDG&E records later.",
        "ZIP-level matching still needs a service-territory-to-ZIP resolver. SCE records are currently tagged to SCE service territory.",
        "Program classifications are deterministic keyword inferences from SCE text and remain human-reviewable in the admin dashboard."
      ]
    }
  };
}

function buildRawRecord({ definition, section, sectionText, sourceUrl, pageTitle, allLinks, retrievedAt, rawHash }) {
  const sectionHash = sha256(sectionText);
  const urls = parseUrlsFromText(sectionText);
  const sectionLinks = [
    ...allLinks.filter((link) => urls.includes(link.url)),
    ...urls.map((url) => ({ url, text: url }))
  ];
  const links = uniqueBy(sectionLinks, (link) => link.url);
  const documents = links
    .filter((link) => isDocumentLink(link.url))
    .map((link) => ({
      title: link.text,
      url: link.url,
      extension: fileExtension(link.url),
      documentType: inferDocumentType(link.url, link.text)
    }));
  const applicationLink =
    links.find((link) => /get started|apply|enroll|sign up|learn more|program|rebate|portal/i.test(link.text)) ??
    links.find((link) => !link.url.includes("sce.com/legal") && !link.url.includes("/privacy")) ??
    null;

  return {
    title: section.title,
    summary: summarizeSection(sectionText, section.title),
    sourceUrl,
    programUrl: sourceUrl,
    applicationUrl: applicationLink?.url ?? null,
    documents,
    links,
    documentType: definition.documentType,
    pageTitle,
    sectionHeading: section.title,
    sectionCategory: section.category,
    retrievedAt,
    rawHash,
    sectionHash,
    parserVersion: PARSER_VERSION,
    raw: {
      sectionText,
      links,
      sourceDefinition: {
        url: definition.url,
        sectionStart: section.start,
        sectionEnd: section.end ?? null
      }
    }
  };
}

function normalizeSceRecord(record, retrievedAt) {
  const sourceUrl = canonicalUrl(record.sourceUrl);
  const textForInference = normalizeComparableText(
    [
      record.title,
      record.summary,
      record.sectionHeading,
      record.sectionCategory,
      record.raw?.sectionText,
      record.applicationUrl,
      record.documents?.map((document) => document.title).join(" ")
    ].join(" ")
  );
  const status = inferStatus(textForInference);
  const programType = inferProgramType(textForInference, record);
  const technologies = inferTechnologies(textForInference);
  const matchingParameters = inferMatchingParameters(record, {
    text: textForInference,
    status,
    technologies
  });
  const benefitTerms = extractBenefitTerms(record.raw?.sectionText ?? "");
  const contentHash = sha256(
    stableStringify({
      title: record.title,
      summary: record.summary,
      sourceUrl,
      applicationUrl: record.applicationUrl,
      documents: record.documents,
      sectionHash: record.sectionHash,
      status,
      benefitTerms
    })
  );
  const externalId = `${urlFingerprint(sourceUrl)}:${slugify(record.title)}`;

  return {
    sourceKey: SOURCE_KEY,
    sourceName: SOURCE_NAME,
    ingestionMode: "sce_bounded_business_sections",
    recordKind: "canonical_candidate",
    externalId,
    externalIdType: "sce_source_section",
    canonicalTitle: record.title,
    normalizedTitle: normalizeComparableText(record.title),
    sourceUrl,
    origin: buildOrigin(sourceUrl, record.documentType),
    status,
    sourceStatus: status,
    category: record.sectionCategory || "SCE Business Program",
    programType,
    state: "CA",
    stateName: "California",
    summary: record.summary,
    administrator: "Southern California Edison",
    deliveryPartner: inferDeliveryPartner(textForInference, record),
    contractor: null,
    applicationUrl: record.applicationUrl ? canonicalUrl(record.applicationUrl, sourceUrl) : null,
    websiteUrl: sourceUrl,
    documents: record.documents ?? [],
    technologies,
    sectors: matchingParameters.businessClassification.values,
    benefitTerms,
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
    sce: {
      pageTitle: record.pageTitle,
      sectionHeading: record.sectionHeading,
      sectionCategory: record.sectionCategory,
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
        sectionHash: record.sectionHash,
        extractedText: trimForEvidence(record.summary),
        linkUrl: sourceUrl,
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
  const businessClassification = inferBusinessClassifications(text, record);
  const squareFootage = inferSquareFootage(text);
  const demandKw = inferDemandKw(text);
  const isCurrentlyMatchable = ["active", "open", "unknown"].includes(status);

  return {
    zipCode: {
      parameter: "zip_code",
      mode: "sce_service_territory",
      values: [],
      state: "CA",
      confidence: "medium",
      method: "source_rule",
      rationale:
        "SCE business opportunities generally apply to customers in Southern California Edison's service territory unless the page says otherwise. ZIP-specific eligibility should be resolved with utility territory data."
    },
    utilityProvider: {
      parameter: "utility_provider",
      mode: "sce_service_territory",
      values: ["SCE"],
      confidence: "high",
      method: "source_rule",
      rationale: "The opportunity originated from an official Southern California Edison business program page."
    },
    businessClassification,
    squareFootage,
    demandKw,
    technologyTags: technologies,
    isCurrentlyMatchable,
    matchingWarnings: [
      "zip_resolution_needed",
      ...(businessClassification.confidence === "low" ? ["business_classification_needs_review"] : []),
      ...(!isCurrentlyMatchable ? ["not_currently_matchable_status"] : []),
      ...(record.applicationUrl && !new URL(record.applicationUrl).hostname.endsWith("sce.com")
        ? ["external_partner_link_not_crawled"]
        : [])
    ]
  };
}

function inferBusinessClassifications(text, record) {
  const values = new Set();
  const evidence = [];
  const combinedText = [normalizeComparableText(record.sectionCategory), text].join(" ");

  addIf(combinedText, values, evidence, ["agricultural", "agriculture", "pumping rate", "horsepower"], ["agricultural"]);
  addIf(combinedText, values, evidence, ["industrial", "manufacturing", "manufacturer"], ["industrial"]);
  addIf(combinedText, values, evidence, ["commercial", "business", "non-residential", "non residential"], ["commercial"]);
  addIf(combinedText, values, evidence, ["governmental", "government", "public sector", "public agency"], [
    "government",
    "public_sector"
  ]);
  addIf(combinedText, values, evidence, ["school", "university", "education"], ["education"]);
  addIf(combinedText, values, evidence, ["restaurant", "retail", "food", "convenience store"], ["retail", "food_service"]);
  addIf(combinedText, values, evidence, ["warehouse"], ["warehouse", "commercial"]);
  addIf(combinedText, values, evidence, ["fleet", "transportation electrification", "vehicles"], ["commercial"]);
  addIf(combinedText, values, evidence, ["multifamily", "residents", "residential properties"], ["multifamily"]);

  if (values.size === 0 && combinedText.includes("customer")) {
    values.add("commercial");
    evidence.push("customer");
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
      "Inferred from SCE page text, program titles, section headings, and eligibility language. This remains human-reviewable in the admin dashboard."
  };
}

function inferSquareFootage(text) {
  const atLeastMatch = text.match(/(?:at least|minimum of)\s+(\d[\d,\s]*)\s*(?:square feet|sq ft|sq\. ft\.|sf)\b/i);
  if (atLeastMatch) {
    return {
      parameter: "square_footage",
      mode: "explicit_text_found",
      min: parseInteger(atLeastMatch[1]),
      max: null,
      confidence: "medium",
      method: "regex",
      evidence: atLeastMatch[0]
    };
  }

  const match = text.match(/(\d[\d,\s]*)\s*(?:to|-)?\s*(\d[\d,\s]*)?\s*(?:square feet|sq ft|sq\. ft\.|sf)\b/i);
  if (!match) {
    return {
      parameter: "square_footage",
      mode: "not_specified",
      min: null,
      max: null,
      confidence: "high",
      method: "source_text_scan",
      rationale: "No square-footage eligibility language was found in the SCE source section."
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
  const atLeastMatch = text.match(/(?:at least|minimum of)\s+(\d[\d,\s]*)\s*(?:kilowatts|kw)\b/i);
  if (atLeastMatch) {
    return demandKwResult({ min: parseInteger(atLeastMatch[1]), evidence: atLeastMatch[0] });
  }

  const exceedingMatch = text.match(/(?:exceeding|exceed|registered demand reaching or exceeding)\s+(\d[\d,\s]*)\s*(?:kilowatts|kw)\b/i);
  if (exceedingMatch) {
    return demandKwResult({ min: parseInteger(exceedingMatch[1]), evidence: exceedingMatch[0] });
  }

  const noLessThanMatch = text.match(/no less than\s+(\d[\d,\s]*)\s*(?:kilowatts|kw)\b/i);
  if (noLessThanMatch) {
    return demandKwResult({ min: parseInteger(noLessThanMatch[1]), evidence: noLessThanMatch[0] });
  }

  return {
    parameter: "demand_kw",
    mode: "not_specified",
    min: null,
    max: null,
    confidence: "high",
    method: "source_text_scan",
    rationale: "No demand threshold was found in the SCE source section."
  };
}

function demandKwResult({ min = null, max = null, evidence }) {
  return {
    parameter: "demand_kw",
    mode: "explicit_text_found",
    min,
    max,
    confidence: "medium",
    method: "regex",
    evidence
  };
}

function inferTechnologies(text) {
  const tags = new Set();

  addTagIf(text, tags, ["demand response", "load reduction", "interruptible", "capacity bidding"], "demand_response");
  addTagIf(text, tags, ["energy efficiency", "efficiency", "energy-saving", "energy saving"], "energy_efficiency");
  addTagIf(text, tags, ["hvac", "heating", "ventilation", "air conditioning"], "HVAC");
  addTagIf(text, tags, ["lighting", "fluorescent"], "lighting");
  if (/\bled\b/.test(text)) {
    tags.add("lighting");
  }
  addTagIf(text, tags, ["refrigeration", "walk-ins", "reach-ins"], "refrigeration");
  addTagIf(text, tags, ["electric vehicle", "charging station", "charge ready", "ev charging", "ev infrastructure"], "EV_charging");
  if (/\bev\b/.test(text)) {
    tags.add("EV_charging");
  }
  addTagIf(text, tags, ["fleet", "transportation electrification", "commercial vehicles"], "fleet_electrification");
  addTagIf(text, tags, ["battery", "storage"], "battery_storage");
  addTagIf(text, tags, ["building", "retrocommissioning", "continuous energy improvement"], "energy_management_system");
  addTagIf(text, tags, ["financing", "loan", "lease"], "financing");
  addTagIf(text, tags, ["tax", "economic development", "site selection", "capital"], "technical_assistance");

  if (tags.size === 0) {
    tags.add("utility_program");
  }

  return [...tags];
}

function inferProgramType(text, record) {
  const category = normalizeComparableText(record.sectionCategory);
  if (category.includes("demand response") || text.includes("demand response") || text.includes("interruptible")) {
    return "demand_response";
  }
  if (category.includes("financing") || text.includes("on-bill financing") || text.includes("gogreen") || text.includes("loan")) {
    return "financing";
  }
  if (
    category.includes("technical assistance") ||
    category.includes("building efficiency") ||
    category.includes("installation support") ||
    category.includes("infrastructure") ||
    text.includes("consulting") ||
    text.includes("advisory") ||
    text.includes("assistance for businesses") ||
    text.includes("free consultation")
  ) {
    return "technical_assistance";
  }
  if (category.includes("rebate") || text.includes("rebate") || text.includes("bill credits") || text.includes("incentive")) {
    return "rebate";
  }
  return "utility_program";
}

function inferStatus(text) {
  if (text.includes("no longer accepting applications") || text.includes("closed") || text.includes("expired")) return "closed";
  if (text.includes("waitlist") || text.includes("wait list")) return "waitlist";
  if (text.includes("as long as funding is available")) return "active";
  if (
    text.includes("eligible") ||
    text.includes("earn") ||
    text.includes("may qualify") ||
    text.includes("helps your business") ||
    text.includes("we offer") ||
    text.includes("we provide") ||
    text.includes("get started") ||
    text.includes("learn more") ||
    text.includes("resources to get") ||
    text.includes("assistance for businesses") ||
    text.includes("rebate to") ||
    text.includes("reward to") ||
    text.includes("program offers") ||
    text.includes("streamlined installation")
  ) {
    return "active";
  }
  return "unknown";
}

function inferDeliveryPartner(text, record) {
  if (text.includes("gogreen")) return "GoGreen Business Energy Financing";
  if (text.includes("socal gas")) return "SoCalGas";
  if (record.applicationUrl) {
    const host = new URL(record.applicationUrl).hostname.replace(/^www\./, "");
    if (!host.endsWith("sce.com")) return host;
  }
  return null;
}

function extractBenefitTerms(sectionText) {
  const terms = [];
  const amountMatches = [
    ...sectionText.matchAll(/\$[\d,]+(?:\.\d+)?(?:\s*(?:per|\/|\w+)[^.;\n]*)?/gi),
    ...sectionText.matchAll(/\b\d+(?:\.\d+)?\s*%\b/g)
  ];
  const creditMatches = [...sectionText.matchAll(/\bbill credits?\b/gi)];

  for (const match of amountMatches.slice(0, 8)) {
    terms.push({
      incentiveAmountText: match[0].trim(),
      amountType: match[0].includes("%") ? "percentage" : "source_text",
      evidenceLocator: "section_text"
    });
  }

  if (creditMatches.length > 0 && terms.length === 0) {
    terms.push({
      incentiveAmountText: "bill credits",
      amountType: "bill_credit",
      evidenceLocator: "section_text"
    });
  }

  return terms;
}

function validateNormalizedRecords(records, { checkedAt }) {
  const validatedRecords = records.map((record) => {
    const criticalIssues = [];
    const warnings = [];

    if (!record.sourceKey) criticalIssues.push("missing_source_key");
    if (!record.sourceName) criticalIssues.push("missing_source_name");
    if (!record.externalId) criticalIssues.push("missing_external_id");
    if (!record.canonicalTitle || record.canonicalTitle.length < 4) criticalIssues.push("missing_or_short_title");
    if (!record.sourceUrl || !record.sourceUrl.startsWith("https://www.sce.com/")) criticalIssues.push("invalid_source_url");
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
    if (record.status !== "active") warnings.push(`source_status_${record.status}_needs_review`);
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
        validator: "sce-opportunity-validator-v1",
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
      benefitTerms: record.benefitTerms,
      geography: record.geography,
      eligibilityRules: record.eligibilityRules,
      matchingParameters: record.matchingParameters,
      sce: record.sce,
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
    parseWarnings: context.parseWarnings,
    limitations: context.limitations,
    sourceAssessment: {
      sourceImplementationQuality: "moderate_partial_success",
      opportunityYieldClass: "medium",
      implementationDifficulty: "high",
      notes:
        "SCE has useful business opportunities, but the site is sprawling and mixes SCE programs, statewide financing, third-party aggregators, old/stale pages, and external portals. The bounded importer is reusable but not a complete SCE inventory."
    },
    notes: [
      "These records are ingestion artifacts, not yet final published opportunity database rows.",
      "The importer stores Southern California Edison source/origin metadata on every writable opportunity candidate.",
      "External partner pages are recorded as links but not crawled."
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

function extractMainContent(textWithUrls) {
  const startMarker = "this element added for skip to main content issue fixes";
  const startIndex = textWithUrls.indexOf(startMarker);
  let output = startIndex === -1 ? textWithUrls : textWithUrls.slice(startIndex + startMarker.length);

  for (const marker of [" Language:", " About SCE", " Partners", " Customer Service Center"]) {
    const index = output.indexOf(marker);
    if (index !== -1) {
      output = output.slice(0, index);
    }
  }

  return output.replace(/\s+/g, " ").trim();
}

function extractSectionText(mainContent, section) {
  const startIndex = mainContent.indexOf(section.start);
  if (startIndex === -1) {
    throw new Error(`start marker not found: ${section.start}`);
  }

  let endIndex = mainContent.length;
  if (section.end) {
    const explicitEnd = mainContent.indexOf(section.end, startIndex + section.start.length);
    if (explicitEnd !== -1) {
      endIndex = explicitEnd;
    }
  }

  return mainContent.slice(startIndex, endIndex).replace(/\s+/g, " ").trim();
}

function htmlToTextWithUrls(html, baseUrl) {
  return decodeHtmlEntities(html)
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
    .replace(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi, (_, href, label) => {
      const text = cleanHtmlText(label) ?? "";
      let url = "";
      try {
        url = canonicalUrl(href, baseUrl);
      } catch {
        url = "";
      }
      return ` ${text} ${url} `;
    })
    .replace(/<\/(h[1-6]|p|li|div|tr|section|article)>/gi, " ")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function parseLinks(html, baseUrl) {
  const links = [];
  const pattern = /<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let match;

  while ((match = pattern.exec(html)) != null) {
    const href = decodeHtmlEntities(match[1]);
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:")) {
      continue;
    }

    let url;
    try {
      url = canonicalUrl(href, baseUrl);
    } catch {
      continue;
    }

    links.push({
      url,
      text: cleanHtmlText(match[2]) ?? url
    });
  }

  return uniqueBy(links, (link) => `${link.url}:${link.text}`);
}

function parseUrlsFromText(value) {
  const urls = [];
  for (const match of value.matchAll(/https?:\/\/[^\s)]+/g)) {
    try {
      urls.push(canonicalUrl(match[0].replace(/[.,;:]+$/g, "")));
    } catch {
      // Ignore malformed URLs in page text. Anchor hrefs are still parsed separately.
    }
  }
  return uniqueArray(urls);
}

function canonicalUrl(value, baseUrl = SOURCE_BASE_URL) {
  let url = new URL(value, baseUrl);

  if (url.hostname.endsWith("urldefense.com") && url.searchParams.get("u")) {
    try {
      url = new URL(url.searchParams.get("u"));
    } catch {
      // Preserve the defense URL if decoding fails.
    }
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

  return url.toString();
}

function isDocumentLink(url) {
  const extension = fileExtension(url);
  return ["pdf", "doc", "docx", "xls", "xlsx", "csv"].includes(extension ?? "") || /\/sites\/default\/files\//.test(url);
}

function inferDocumentType(url, text) {
  const extension = fileExtension(url);
  if (extension) return extension;
  if (/tariff/i.test(text)) return "tariff_document";
  if (/guide/i.test(text)) return "guide";
  if (/fact sheet/i.test(text)) return "fact_sheet";
  return "document";
}

function fileExtension(url) {
  const pathname = new URL(url).pathname;
  const match = pathname.match(/\.([a-z0-9]+)$/i);
  return match ? match[1].toLowerCase() : null;
}

function summarizeSection(text, fallbackTitle) {
  const summaryText = text
    .replace(/https?:\/\/[^\s)]+/g, "")
    .replace(/\s+/g, " ")
    .trim();
  const summary = summaryText.length > 1400 ? summaryText.slice(0, 1397).trimEnd() + "..." : summaryText;
  return summary || fallbackTitle;
}

function cleanHtmlText(value) {
  if (value == null) return null;
  const text = decodeHtmlEntities(String(value))
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return text || null;
}

function normalizeComparableText(value) {
  return cleanHtmlText(value)
    ?.toLowerCase()
    .normalize("NFKD")
    .replace(/\u2264/g, "<=")
    .replace(/\u2265/g, ">=")
    .replace(/[^\w\s$%<>+=.-]/g, " ")
    .replace(/\s+/g, " ")
    .trim() ?? "";
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

function extractPageTitle(html) {
  return (
    cleanHtmlText(firstMatch(html, /<meta property="og:title" content="([^"]+)"/i)) ??
    cleanHtmlText(firstMatch(html, /<title\b[^>]*>([\s\S]*?)<\/title>/i))
  );
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

function parseInteger(value) {
  return Number.parseInt(String(value).replace(/[^\d]/g, ""), 10);
}

function sha256(value) {
  return createHash("sha256").update(String(value)).digest("hex");
}

function urlFingerprint(url) {
  return sha256(canonicalUrl(url)).slice(0, 16);
}

function slugify(value) {
  return normalizeComparableText(value).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80);
}

function trimForEvidence(value) {
  if (!value) return null;
  return value.length > 1000 ? `${value.slice(0, 997).trimEnd()}...` : value;
}

function uniqueArray(values) {
  return [...new Set(values.filter(Boolean))];
}

function uniqueBy(values, keyFn) {
  const seen = new Set();
  const unique = [];
  for (const value of values) {
    const key = keyFn(value);
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(value);
  }
  return unique;
}

function stableStringify(value) {
  return JSON.stringify(sortJson(value));
}

function sortJson(value) {
  if (Array.isArray(value)) {
    return value.map(sortJson);
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).sort(([a], [b]) => a.localeCompare(b)).map(([key, val]) => [key, sortJson(val)]));
  }
  return value;
}

function chunks(values, size) {
  const output = [];
  for (let index = 0; index < values.length; index += size) {
    output.push(values.slice(index, index + size));
  }
  return output;
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

function camelCase(value) {
  return value.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
}

function positiveInteger(value, fallback, label) {
  if (value == null || value === "") return fallback;
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new Error(`Invalid ${label}: ${value}`);
  }
  return parsed;
}

function nonNegativeInteger(value, fallback, label) {
  if (value == null || value === "") return fallback;
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 0) {
    throw new Error(`Invalid ${label}: ${value}`);
  }
  return parsed;
}

function parseBoolean(value, fallback) {
  if (value == null) return fallback;
  if (value === true || value === "true" || value === "1" || value === "yes") return true;
  if (value === false || value === "false" || value === "0" || value === "no") return false;
  throw new Error(`Invalid boolean value: ${value}`);
}

function safeTimestamp(value) {
  return value.replace(/[:.]/g, "-");
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
