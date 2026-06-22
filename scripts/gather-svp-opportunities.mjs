#!/usr/bin/env node

import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { BatchWriteCommand, DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { fromIni } from "@aws-sdk/credential-providers";

const SOURCE_KEY = "SOURCE_SILICON_VALLEY_POWER";
const SOURCE_NAME = "Silicon Valley Power Business Programs";
const SOURCE_BASE_URL = "https://www.siliconvalleypower.com/";
const DEFAULT_OUTPUT_DIR = "var/opportunity-ingestion/svp";
const DEFAULT_DYNAMODB_TABLE = "gbs-opportunity-candidates";
const DEFAULT_AWS_REGION = "us-east-2";
const DEFAULT_AWS_PROFILE = "gbs";
const DEFAULT_DELAY_MS = 150;
const PARSER_VERSION = "svp-static-section-splitter-v1";
const DEFAULT_USER_AGENT =
  "GreenBusinessSolutionBot/0.1 (+https://github.com/green-business-solution/green-business-solution)";

const SOURCE_DEFINITIONS = [
  {
    url: "https://www.siliconvalleypower.com/businesses/rebates",
    fixtureFile: "svp_business_rebates_jina.txt",
    pageHeading: "Energy Efficiency Rebates",
    documentType: "svp_business_rebates_page",
    sections: [
      {
        title: "HVAC System and Heat Pump Rebates",
        category: "Energy Efficiency Rebate",
        start: "Air Conditioner/HVAC and Heat Pump",
        end: "Building Optimization Rebate"
      },
      {
        title: "Building Optimization Rebate",
        category: "Energy Efficiency Rebate",
        start: "Building Optimization Rebate",
        end: "Controls Program"
      },
      {
        title: "Controls Program",
        category: "Energy Efficiency Rebate",
        start: "Controls Program",
        end: "Customer Directed Rebate"
      },
      {
        title: "Customer Directed Rebate",
        category: "Energy Efficiency Rebate",
        start: "Customer Directed Rebate",
        end: "Data Center Program"
      },
      {
        title: "Data Center Program",
        category: "Energy Efficiency Rebate",
        start: "Data Center Program",
        end: "Emerging Technologies Grant"
      },
      {
        title: "Emerging Technologies Grant",
        category: "Energy Efficiency Grant",
        start: "Emerging Technologies Grant",
        end: "Energy Efficiency Grant for Nonprofit Organizations"
      },
      {
        title: "Energy Efficiency Grant Program for Nonprofit Organizations",
        category: "Energy Efficiency Grant",
        start: "Energy Efficiency Grant for Nonprofit Organizations",
        end: "Food Service Equipment"
      },
      {
        title: "Food Service Equipment Rebate Program",
        category: "Energy Efficiency Rebate",
        start: "Food Service Equipment",
        end: "Heat Pump Water Heater"
      },
      {
        title: "Heat Pump Water Heater Rebate",
        category: "Energy Efficiency Rebate",
        start: "Heat Pump Water Heater",
        end: "Lighting"
      },
      {
        title: "Lighting Rebate",
        category: "Energy Efficiency Rebate",
        start: "Lighting",
        end: "New Construction Incentives"
      },
      {
        title: "New Construction Incentives",
        category: "New Construction Incentive",
        start: "New Construction Incentives",
        end: "Nonprofit Solar Grant"
      },
      {
        title: "Nonprofit Solar Grant",
        category: "Solar Grant",
        start: "Nonprofit Solar Grant",
        end: "Solar Rebate"
      },
      {
        title: "Commercial Solar Rebate Program",
        category: "Solar Rebate",
        start: "Solar Rebate",
        end: "Last Updated:"
      }
    ]
  },
  {
    url: "https://www.siliconvalleypower.com/businesses/electrification-programs-rebates",
    fixtureFile: "svp_electrification_jina.txt",
    pageHeading: "Electrification Programs & Rebates",
    documentType: "svp_business_electrification_page",
    sections: [
      {
        title: "Customer Directed Electrification Rebate",
        category: "Electrification Rebate",
        start: "Customer Directed Electrification Rebate",
        end: "Food Service Equipment"
      },
      {
        title: "Heat Pump Air Conditioner Rebates - Conversion to All Electric Heating and Cooling",
        category: "Electrification Rebate",
        start: "Heat Pump Air Conditioner Rebates",
        end: "Heat Pump Water Heater"
      },
      {
        title: "Custom Measure Rebates - Heat Recovery Chillers and Heat Pump Pool Heaters",
        category: "Electrification Rebate",
        start: "Heat Recovery Chillers and Heat Pump Pool Heaters",
        end: "Multifamily Boiler Electrification Pilot Program"
      },
      {
        title: "Multifamily Boiler Electrification Pilot Program",
        category: "Electrification Rebate",
        start: "Multifamily Boiler Electrification Pilot Program",
        end: "Zero-Emission Vehicle Fleet Rebate"
      }
    ]
  },
  {
    url: "https://www.siliconvalleypower.com/businesses/save-money",
    fixtureFile: "svp_save_money_jina.txt",
    pageHeading: "Save Money",
    documentType: "svp_business_save_money_page",
    sections: [
      {
        title: "Energy Survey",
        category: "Technical Assistance",
        start: "Energy Survey",
        end: "**Industrial Assessments**"
      },
      {
        title: "Industrial Assessments",
        category: "Technical Assistance",
        start: "**Industrial Assessments**",
        end: "Energy Design Assistance"
      },
      {
        title: "Energy Design Assistance",
        category: "Technical Assistance",
        start: "Energy Design Assistance",
        end: "Small Business Efficiency Services"
      },
      {
        title: "Small Business Efficiency Services",
        category: "Technical Assistance",
        start: "Small Business Efficiency Services",
        end: "Bright Start for New Business"
      },
      {
        title: "Bright Start for New Business",
        category: "Energy Efficiency Rebate",
        start: "Bright Start for New Business",
        end: "Find SVP Trade Ally"
      }
    ]
  },
  {
    url: "https://www.siliconvalleypower.com/businesses/building-operator-certification-training-scholarships",
    fixtureFile: "svp_boc_jina.txt",
    documentType: "svp_boc_scholarship_page",
    sections: [
      {
        title: "Building Operator Certification Training Scholarships",
        category: "Training Scholarship",
        start: "Silicon Valley Power offers a scholarship to eligible customers",
        end: "Last Updated:"
      }
    ]
  },
  {
    url: "https://www.siliconvalleypower.com/sustainability/electric-vehicles/rebates/commercial-zero-emission-vehicle-fleet-rebate",
    fixtureFile: "svp_zev_fleet_jina.txt",
    pageHeading: "Commercial Zero-Emission Vehicle Fleet Rebate",
    documentType: "svp_ev_rebate_detail_page",
    sections: [
      {
        title: "Commercial Zero-Emission Vehicle Fleet Rebate",
        category: "EV Fleet Rebate",
        wholePage: true
      }
    ]
  },
  {
    url: "https://www.siliconvalleypower.com/sustainability/electric-vehicles/rebates/municipal-government-and-nonprofit-ev-charging-station-grant",
    fixtureFile: "svp_ev_muni_nonprofit_jina.txt",
    pageHeading: "Municipal Government and Nonprofit EV Charging Station Grant",
    documentType: "svp_ev_charging_grant_detail_page",
    sections: [
      {
        title: "Municipal Government and Nonprofit EV Charging Station Grant",
        category: "EV Charging Grant",
        wholePage: true
      }
    ]
  },
  {
    url: "https://www.siliconvalleypower.com/sustainability/electric-vehicles/ev-charging/ev-charging-rebates/multifamily-residential-and-commercial-ev-charging-station-incentive-program",
    fixtureFile: "svp_ev_multifamily_commercial_jina.txt",
    documentType: "svp_ev_charging_incentive_detail_page",
    sections: [
      {
        title: "Multifamily Residential and Commercial EV Charging Station Incentive Program",
        category: "EV Charging Rebate",
        wholePage: true
      }
    ]
  },
  {
    url: "https://www.siliconvalleypower.com/sustainability/electric-vehicles/ev-charging/ev-charging-rebates/load-development-fee-credit-program",
    fixtureFile: "svp_load_dev_credit_jina.txt",
    documentType: "svp_load_development_credit_detail_page",
    sections: [
      {
        title: "Load Development Fee Credit Program",
        category: "EV Charging Fee Credit",
        wholePage: true
      }
    ]
  }
];

main().catch((error) => {
  console.error(`SVP ingestion failed: ${error.message}`);
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
  const runId = `svp-business-${safeTimestamp(startedAt)}`;
  const config = {
    outputDir: path.resolve(process.cwd(), args.outputDir ?? DEFAULT_OUTPUT_DIR),
    limit: args.limit == null ? null : positiveInteger(args.limit, null, "limit"),
    requestDelayMs: nonNegativeInteger(args.requestDelayMs, DEFAULT_DELAY_MS, "request delay"),
    writeDynamodb: parseBoolean(args.writeDynamodb, false),
    dynamodbTable: args.dynamodbTable ?? process.env.GBS_OPPORTUNITIES_TABLE ?? DEFAULT_DYNAMODB_TABLE,
    awsRegion: args.awsRegion ?? process.env.AWS_REGION ?? DEFAULT_AWS_REGION,
    awsProfile: args.awsProfile ?? process.env.AWS_PROFILE ?? DEFAULT_AWS_PROFILE,
    userAgent: process.env.SVP_USER_AGENT ?? DEFAULT_USER_AGENT,
    fixtureDir: args.fixtureDir ?? process.env.SVP_FIXTURE_DIR ?? null,
    forceReader: parseBoolean(args.forceReader, false)
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

  console.log("SVP ingestion completed in static section-splitter mode.");
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
  const booleanFlags = new Set(["write-dynamodb", "force-reader"]);

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
Gather Silicon Valley Power business opportunity candidates from curated official pages.

Usage:
  npm run gather:svp
  npm run gather:svp:aws
  node scripts/gather-svp-opportunities.mjs --limit 10

Options:
  --limit 10
  --request-delay-ms 150
  --fixture-dir /private/tmp
  --force-reader
  --write-dynamodb
  --dynamodb-table gbs-opportunity-candidates
  --aws-profile gbs
  --aws-region us-east-2

Environment:
  SVP_USER_AGENT       Optional user-agent override.
  SVP_FIXTURE_DIR      Optional directory containing previously fetched SVP markdown snapshots.
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

    const response = await fetchOfficialOrReader(definition, config);
    const sourceUrl = canonicalUrl(definition.url);
    const rawHash = sha256(response.body);
    const cleanedHash = sha256(cleanMarkdownText(response.body) ?? "");
    const pageTitle = extractReaderTitle(response.body) ?? definition.pageHeading ?? sourceUrl;
    const mainContent = extractMainContent(response.body, definition);

    sourceDocuments.push({
      sourceKey: SOURCE_KEY,
      sourceName: SOURCE_NAME,
      documentType: definition.documentType,
      originalUrl: definition.url,
      finalUrl: sourceUrl,
      canonicalUrl: sourceUrl,
      fetchedUrl: response.fetchUrl,
      fetchMode: response.fetchMode,
      title: pageTitle,
      contentType: response.contentType,
      httpStatus: response.httpStatus,
      retrievedAt,
      rawHash,
      cleanedHash,
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

      if (!sectionText || cleanMarkdownText(sectionText).length < 80) {
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
          retrievedAt,
          rawHash,
          fetchMode: response.fetchMode,
          fetchedUrl: response.fetchUrl
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

  const normalizedRecords = dedupeByRecordKey(rawRecords.map((record) => normalizeSvpRecord(record, retrievedAt)));

  return {
    rawRecords,
    normalizedRecords,
    sourceDocuments,
    context: {
      mode: "static_section_splitter",
      isFullInventory: config.limit == null,
      seedUrls: SOURCE_DEFINITIONS.map((definition) => definition.url),
      parseWarnings,
      limitations: [
        "SVP blocks direct automated requests from this environment, so the importer tries official pages first and falls back to a reader-rendered copy while preserving official SVP URLs as source evidence.",
        "The importer currently uses curated SVP pages and section boundaries. It does not run an unbounded crawl over all SVP pages.",
        "ZIP-level matching still needs a service-territory-to-ZIP resolver. SVP records are currently tagged to SVP/Santa Clara service territory.",
        "Program classifications are deterministic keyword inferences and remain human-reviewable in the admin dashboard."
      ]
    }
  };
}

function buildRawRecord({ definition, section, sectionText, sourceUrl, pageTitle, retrievedAt, rawHash, fetchMode, fetchedUrl }) {
  const sectionHash = sha256(cleanMarkdownText(sectionText) ?? sectionText);
  const links = parseMarkdownLinks(sectionText, sourceUrl);
  const documents = links
    .filter((link) => isDocumentLink(link.url))
    .map((link) => ({
      title: link.text,
      url: link.url,
      extension: fileExtension(link.url),
      documentType: inferDocumentType(link.url, link.text)
    }));
  const applicationLink =
    links.find((link) => /application|apply|portal|interest form|client information/i.test(link.text)) ??
    links.find((link) => /application|apply|portal|interest-form/i.test(link.url)) ??
    null;

  return {
    title: section.title,
    summary: summarizeSection(sectionText, section.title),
    sourceUrl,
    programUrl: sourceUrl,
    applicationUrl: applicationLink?.url ?? null,
    documents,
    documentType: definition.documentType,
    pageTitle,
    sectionHeading: section.title,
    sectionCategory: section.category,
    retrievedAt,
    rawHash,
    sectionHash,
    fetchMode,
    fetchedUrl,
    parserVersion: PARSER_VERSION,
    raw: {
      sectionText: cleanMarkdownText(sectionText),
      links,
      sourceDefinition: {
        url: definition.url,
        pageHeading: definition.pageHeading ?? null,
        sectionStart: section.start ?? null,
        sectionEnd: section.end ?? null,
        wholePage: Boolean(section.wholePage)
      }
    }
  };
}

function normalizeSvpRecord(record, retrievedAt) {
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
    ingestionMode: "svp_static_section_splitter",
    recordKind: "canonical_candidate",
    externalId,
    externalIdType: "svp_source_section",
    canonicalTitle: record.title,
    normalizedTitle: normalizeComparableText(record.title),
    sourceUrl,
    origin: buildOrigin(sourceUrl, record.documentType),
    status,
    sourceStatus: status,
    category: record.sectionCategory || "SVP Business Program",
    programType,
    state: "CA",
    stateName: "California",
    summary: record.summary,
    administrator: "Silicon Valley Power",
    deliveryPartner: inferDeliveryPartner(textForInference),
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
      city: "Santa Clara",
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
    svp: {
      pageTitle: record.pageTitle,
      sectionHeading: record.sectionHeading,
      sectionCategory: record.sectionCategory,
      fetchMode: record.fetchMode,
      fetchedUrl: record.fetchedUrl,
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
        fetchMode: record.fetchMode,
        fetchedUrl: record.fetchedUrl,
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
      mode: "svp_service_territory",
      values: [],
      state: "CA",
      city: "Santa Clara",
      confidence: "medium",
      method: "source_rule",
      rationale:
        "SVP business opportunities generally apply to Silicon Valley Power customers in the City of Santa Clara. ZIP-specific eligibility should be resolved with a service-territory-to-ZIP resolver."
    },
    utilityProvider: {
      parameter: "utility_provider",
      mode: "svp_service_territory",
      values: ["SVP"],
      confidence: "high",
      method: "source_rule",
      rationale: "The opportunity originated from an official Silicon Valley Power business program page."
    },
    businessClassification,
    squareFootage,
    demandKw,
    technologyTags: technologies,
    isCurrentlyMatchable,
    matchingWarnings: [
      "zip_resolution_needed",
      ...(businessClassification.confidence === "low" ? ["business_classification_needs_review"] : []),
      ...(!isCurrentlyMatchable ? ["not_currently_matchable_status"] : [])
    ]
  };
}

function inferBusinessClassifications(text, record) {
  const values = new Set();
  const evidence = [];
  const combinedText = [normalizeComparableText(record.sectionCategory), text].join(" ");

  addIf(combinedText, values, evidence, ["nonprofit", "501 c 3", "501c 3", "501 c 19", "501c 19"], ["nonprofit"]);
  addIf(combinedText, values, evidence, ["municipal", "government", "public agency", "city departments"], [
    "government",
    "public_sector"
  ]);
  addIf(combinedText, values, evidence, ["school", "education", "training", "certification"], ["education", "commercial"]);
  addIf(combinedText, values, evidence, ["multifamily", "apartments", "condominiums", "condos"], ["multifamily"]);
  addIf(combinedText, values, evidence, ["data center", "server load", "cooling loads"], ["data_center", "commercial"]);
  addIf(combinedText, values, evidence, ["food service", "commercial kitchen", "restaurant", "refrigerators", "freezers"], [
    "food_service",
    "commercial"
  ]);
  addIf(combinedText, values, evidence, ["industrial", "manufacturers", "manufacturing", "process control"], ["industrial"]);
  addIf(combinedText, values, evidence, ["small business"], ["small_business", "commercial"]);
  addIf(combinedText, values, evidence, ["fleet", "workplace parking", "ev charging"], ["commercial"]);
  addIf(combinedText, values, evidence, ["commercial", "business", "nonresidential", "non residential"], ["commercial"]);
  addIf(combinedText, values, evidence, ["facility", "building", "occupant"], ["commercial"]);

  if (values.size === 0 && combinedText.includes("customers")) {
    values.add("commercial");
    evidence.push("customers");
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
      "Inferred from SVP page text, program titles, section headings, and eligibility language. This remains human-reviewable in the admin dashboard."
  };
}

function inferSquareFootage(text) {
  const underMatch = text.match(/under\s+(\d[\d,\s]*)\s*(?:square feet|sq ft|sq\. ft\.|sf)\b/i);
  if (underMatch) {
    return {
      parameter: "square_footage",
      mode: "explicit_text_found",
      min: null,
      max: parseInteger(underMatch[1]),
      confidence: "medium",
      method: "regex",
      evidence: underMatch[0]
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
      rationale: "No square-footage eligibility language was found in the SVP source section."
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
  const lessThanMatch = text.match(/(?:<=|less than|or less|under)\s*(\d[\d,]*)\s*kw/i);
  if (lessThanMatch) {
    return demandKwResult({ max: parseInteger(lessThanMatch[1]), evidence: lessThanMatch[0] });
  }

  const atOrBelowMatch = text.match(/(\d[\d,]*)\s*kw\s*(?:average\s+)?(?:peak\s+)?demand\s*(?:or less|over the past)/i);
  if (atOrBelowMatch && text.includes("or less")) {
    return demandKwResult({ max: parseInteger(atOrBelowMatch[1]), evidence: atOrBelowMatch[0] });
  }

  const greaterThanMatch = text.match(/greater than\s+(\d[\d,]*)\s*kw|loads?\s+greater than\s+(\d[\d,]*)\s*kw/i);
  if (greaterThanMatch) {
    return demandKwResult({
      min: parseInteger(greaterThanMatch[1] ?? greaterThanMatch[2]),
      evidence: greaterThanMatch[0]
    });
  }

  return {
    parameter: "demand_kw",
    mode: "not_specified",
    min: null,
    max: null,
    confidence: "high",
    method: "source_text_scan",
    rationale: "No demand threshold was found in the SVP source section."
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

  addTagIf(text, tags, ["energy efficiency", "efficiency", "energy saving", "energy savings"], "energy_efficiency");
  addTagIf(text, tags, ["hvac", "air conditioner", "heating", "cooling", "rooftop"], "HVAC");
  addTagIf(text, tags, ["heat pump"], "heat_pump");
  addTagIf(text, tags, ["lighting"], "lighting");
  addTagIf(text, tags, ["refrigeration", "freezer", "refrigerator"], "refrigeration");
  addTagIf(text, tags, ["food service", "commercial kitchen"], "food_service_equipment");
  addTagIf(text, tags, ["ev charging", "charger", "charging station"], "EV_charging");
  addTagIf(text, tags, ["zero emission vehicle", "zev", "fleet", "electric vehicle"], "fleet_electrification");
  addTagIf(text, tags, ["solar", "photovoltaic", "pv"], "solar_PV");
  addTagIf(text, tags, ["water heater", "domestic hot water", "boiler"], "water_heating");
  addTagIf(text, tags, ["building controls", "controls", "energy management", "automation"], "building_controls");
  addTagIf(text, tags, ["optimization", "building optimization"], "energy_management_system");
  addTagIf(text, tags, ["data center", "server"], "data_center");
  addTagIf(text, tags, ["new construction", "building envelope", "envelope"], "building_envelope");
  addTagIf(text, tags, ["custom", "customer directed", "unique processes"], "custom_efficiency");
  addTagIf(text, tags, ["training", "certification", "assessment", "survey", "design assistance"], "technical_assistance");
  addTagIf(text, tags, ["load development fee", "fee credit"], "rate_discount");

  if (tags.size === 0) {
    tags.add("utility_program");
  }

  return [...tags];
}

function inferProgramType(text, record) {
  const category = normalizeComparableText(record.sectionCategory);
  if (text.includes("load development fee credit") || text.includes("fee credit")) return "rate_discount";
  if (category.includes("credit")) return "rate_discount";
  if (category.includes("technical assistance")) return "technical_assistance";
  if (category.includes("grant") || category.includes("scholarship")) return "grant";
  if (category.includes("rebate") || category.includes("incentive")) return "rebate";
  if (text.includes("scholarship")) return "grant";
  if (text.includes("grant funding") || text.includes("provide grants") || text.includes("offers grants")) return "grant";
  if (text.includes("rebate") || text.includes("incentive") || text.includes("bonus rebate")) return "rebate";
  if (text.includes("survey") || text.includes("assessment") || text.includes("design assistance") || text.includes("services")) {
    return "technical_assistance";
  }
  return "utility_program";
}

function inferStatus(text) {
  if (text.includes("fully subscribed")) return "fully_subscribed";
  if (text.includes("no longer accepting new applications") || text.includes("closed") || text.includes("expired")) return "closed";
  if (/currently\s+(?:on\s+)?(?:a\s+)?wait(?:ing)?\s*list/.test(text) || text.includes("waitlisted")) return "waitlist";
  if (text.includes("check back on july 1 2026")) return "closed";
  if (
    text.includes("applications are due") ||
    text.includes("eligible") ||
    text.includes("available") ||
    text.includes("offers") ||
    text.includes("offering") ||
    text.includes("provide") ||
    text.includes("provides") ||
    text.includes("can help") ||
    text.includes("will assist") ||
    text.includes("receive a rebate") ||
    text.includes("rebates for installing") ||
    text.includes("download the application") ||
    text.includes("apply for")
  ) {
    return "active";
  }
  return "unknown";
}

function inferDeliveryPartner(text) {
  if (text.includes("san jose state university industrial assessment center") || text.includes("sjsu iac")) {
    return "San Jose State University Industrial Assessment Center";
  }
  if (text.includes("building operator certification") || text.includes("boc website")) {
    return "Building Operator Certification";
  }
  return null;
}

function extractBenefitTerms(sectionText) {
  const text = cleanMarkdownText(sectionText) ?? "";
  const terms = [];
  const amountMatches = [...text.matchAll(/\$[\d,]+(?:\.\d+)?(?:\s*(?:million|per|maximum|cap|limit|credit|rebate|grant|watt|kwh|port|outlet|ton|customer|property|vehicle)[^.;\n]*)?/gi)];
  const percentMatches = [...text.matchAll(/\b\d{1,3}\s*percent|\b\d{1,3}%/gi)];

  for (const match of amountMatches.slice(0, 8)) {
    terms.push({
      incentiveAmountText: match[0].trim(),
      amountType: "source_text",
      evidenceLocator: "section_text"
    });
  }

  for (const match of percentMatches.slice(0, 5)) {
    terms.push({
      incentiveAmountText: match[0].trim(),
      amountType: "percentage",
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
    if (!record.sourceUrl || !record.sourceUrl.startsWith("https://www.siliconvalleypower.com/")) criticalIssues.push("invalid_source_url");
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
        validator: "svp-opportunity-validator-v1",
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
      svp: record.svp,
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
    notes: [
      "These records are ingestion artifacts, not yet final published opportunity database rows.",
      "The importer stores Silicon Valley Power source/origin metadata on every writable opportunity candidate.",
      "Reader fallback content is used only when the official SVP host blocks direct automated retrieval."
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

async function fetchOfficialOrReader(definition, config) {
  const url = definition.url;

  if (config.fixtureDir && definition.fixtureFile) {
    const fixturePath = path.resolve(config.fixtureDir, definition.fixtureFile);
    const body = await readFile(fixturePath, "utf8");
    return {
      body,
      contentType: "text/markdown; source=fixture",
      finalUrl: url,
      httpStatus: 200,
      fetchUrl: fixturePath,
      fetchMode: "local_fixture"
    };
  }

  if (!config.forceReader) {
    try {
      const direct = await fetchText(url, {
        accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        userAgent: config.userAgent,
        requireOk: false
      });
      if (direct.httpStatus >= 200 && direct.httpStatus < 300 && !looksLikeAccessDenied(direct.body)) {
        return {
          ...direct,
          fetchUrl: url,
          fetchMode: "official"
        };
      }
    } catch {
      // SVP currently blocks this environment for direct fetches. Fall through to reader fallback.
    }
  }

  const readerUrl = toReaderUrl(url);
  const reader = await fetchText(readerUrl, {
    accept: "text/markdown,text/plain,*/*",
    userAgent: config.userAgent,
    requireOk: true
  });

  return {
    ...reader,
    finalUrl: url,
    fetchUrl: readerUrl,
    fetchMode: "reader_fallback"
  };
}

async function fetchText(url, { accept, userAgent, requireOk }) {
  const response = await fetch(url, {
    headers: {
      Accept: accept,
      "User-Agent": userAgent
    }
  });
  const body = await response.text();
  const contentType = response.headers.get("content-type") ?? "unknown";

  if (requireOk && !response.ok) {
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

function toReaderUrl(url) {
  return `https://r.jina.ai/http://r.jina.ai/http://${url}`;
}

function looksLikeAccessDenied(body) {
  return /access denied|akamai|you don't have permission to access/i.test(body) || body.trim().length < 50;
}

function extractReaderTitle(markdown) {
  return cleanMarkdownText(firstMatch(markdown, /^Title:\s*(.+)$/im));
}

function extractMainContent(markdown, definition) {
  const markdownContentIndex = markdown.indexOf("Markdown Content:");
  let content = markdownContentIndex === -1 ? markdown : markdown.slice(markdownContentIndex + "Markdown Content:".length);

  if (definition.pageHeading) {
    const heading = `# ${definition.pageHeading}`;
    const headingIndex = content.lastIndexOf(heading);
    if (headingIndex !== -1) {
      content = content.slice(headingIndex + heading.length);
    }
  }

  return trimAtFooter(content).trim();
}

function extractSectionText(mainContent, section) {
  if (section.wholePage) {
    return trimAtFooter(mainContent);
  }

  if (!section.start) {
    throw new Error("missing section start marker");
  }

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

  return trimAtFooter(mainContent.slice(startIndex, endIndex));
}

function trimAtFooter(value) {
  let output = value;
  for (const marker of ["\nLast Updated:", "\n# Contact us", "\n## Find Us", "\n# Contact Us", "\nWebsite Created by"]) {
    const index = output.indexOf(marker);
    if (index !== -1) {
      output = output.slice(0, index);
    }
  }
  return output.trim();
}

function parseMarkdownLinks(markdown, baseUrl) {
  const links = [];
  const pattern = /!?\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
  let match;

  while ((match = pattern.exec(markdown)) != null) {
    const href = match[2];
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
      text: cleanMarkdownText(match[1]) ?? url
    });
  }

  return uniqueBy(links, (link) => `${link.url}:${link.text}`);
}

function canonicalUrl(value, baseUrl = SOURCE_BASE_URL) {
  let url = new URL(value, baseUrl);

  if (url.hostname.endsWith("safelinks.protection.outlook.com") && url.searchParams.get("url")) {
    url = new URL(url.searchParams.get("url"));
  }

  if (url.hostname.endsWith("siliconvalleypower.com") && url.searchParams.get("splash")) {
    url = new URL(url.searchParams.get("splash"));
  }

  url.hash = "";
  url.hostname = url.hostname.toLowerCase();
  for (const key of [...url.searchParams.keys()]) {
    if (/^(utm_|gclid|fbclid|mc_|data|sdata|reserved|____isexternal)$/i.test(key)) {
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
  return (
    ["pdf", "doc", "docx", "xls", "xlsx", "csv"].includes(extension ?? "") ||
    new URL(url).pathname.toLowerCase().includes("/home/showpublisheddocument/")
  );
}

function inferDocumentType(url, text) {
  const extension = fileExtension(url);
  if (extension) return extension;
  if (/application/i.test(text)) return "application_document";
  if (/calculator/i.test(text)) return "calculator";
  if (/flyer/i.test(text)) return "flyer";
  return "document";
}

function fileExtension(url) {
  const pathname = new URL(url).pathname;
  const match = pathname.match(/\.([a-z0-9]+)$/i);
  return match ? match[1].toLowerCase() : null;
}

function summarizeSection(markdown, fallbackTitle) {
  const text = cleanMarkdownText(markdown) ?? fallbackTitle;
  const withoutBoilerplate = text
    .replace(/^#{1,6}\s*/gm, "")
    .replace(/\bHere (?:are|is) the forms? you(?:'| will)?ll need:?.*$/ims, "")
    .replace(/\bResources:?.*$/ims, "")
    .trim();
  const summary = withoutBoilerplate.length > 1400 ? withoutBoilerplate.slice(0, 1397).trimEnd() + "..." : withoutBoilerplate;
  return summary || fallbackTitle;
}

function cleanMarkdownText(value) {
  if (value == null) return null;
  const text = decodeHtmlEntities(String(value))
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)]\(([^)]*)\)/g, "$1")
    .replace(/[*_`>#|]/g, " ")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/\r/g, "\n")
    .replace(/[ \t\f\v]+/g, " ")
    .replace(/\n\s+/g, "\n")
    .replace(/\s*\n\s*/g, "\n")
    .replace(/\n{2,}/g, "\n")
    .trim()
    .replace(/\s+/g, " ");

  return text || null;
}

function normalizeComparableText(value) {
  return cleanMarkdownText(value)
    ?.toLowerCase()
    .normalize("NFKD")
    .replace(/\u2264/g, "<=")
    .replace(/\u2265/g, ">=")
    .replace(/[^\w\s$%<>+=.-]/g, " ")
    .replace(/\s+/g, " ")
    .trim() ?? "";
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
