import fs from "node:fs/promises";
import path from "node:path";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
  processUtilityDataUpload,
  validateExtractedValueFieldIds
} from "../server/energyData/parseEnergyData.mjs";

const scriptPath = fileURLToPath(import.meta.url);
const scriptDir = path.dirname(scriptPath);
const repoRoot = path.resolve(scriptDir, "..");
const defaultFixtureDir = path.join(repoRoot, "test-fixtures", "green-button");
const defaultReportPath = path.join(repoRoot, "data", "fake_green_button_seed_report.md");
const defaultApiBaseUrl = process.env.GBS_API_BASE_URL || "http://127.0.0.1:8787";
const defaultCount = 5;
const defaultSeed = 123;
const productionConfirmPhrase = "SEED_PRODUCTION";

export const supportedCustomerTypes = [
  "homeowner",
  "multifamily_property_owner_manager",
  "business_commercial",
  "nonprofit",
  "government_public_agency",
  "school_education",
  "agriculture",
  "industrial_manufacturing",
  "other"
];

const utilityProviders = ["PG&E", "Southern California Edison", "San Diego Gas & Electric", "Silicon Valley Power", "LADWP", "SMUD"];
const gasUtilityProviders = ["PG&E", "SoCalGas", "Southwest Gas", "No gas", "Unknown"];
const organizationSizes = ["1-10 employees", "11-50 employees", "51-250 employees", "251-1,000 employees", "1,000+ employees"];
const homeownerBuildingTypes = ["Single-family home", "Townhome", "Condo", "Duplex / triplex"];
const nonResidentialBuildingTypes = [
  "Office",
  "Retail / Storefront",
  "Restaurant / Commercial Kitchen",
  "Warehouse / Logistics",
  "Industrial / Manufacturing",
  "School / Education Campus",
  "Agricultural / Greenhouse",
  "Mixed-use",
  "Other"
];
const firstNames = ["Alex", "Jordan", "Taylor", "Morgan", "Riley", "Casey", "Harper", "Logan", "Drew", "Parker"];
const lastNames = ["Rivera", "Kim", "Patel", "Martinez", "Johnson", "Nguyen", "Davis", "Lee", "Garcia", "Wilson"];
const streetNames = ["Market", "Broadway", "Main", "Sunset", "Cedar", "Maple", "Hillcrest", "Valley View", "Harbor", "Mission"];
const cities = [
  { city: "San Francisco", state: "CA", zip: "94105" },
  { city: "Oakland", state: "CA", zip: "94612" },
  { city: "San Jose", state: "CA", zip: "95113" },
  { city: "Los Angeles", state: "CA", zip: "90017" },
  { city: "Sacramento", state: "CA", zip: "95814" }
];

const fixtureSourceUrlByFileName = {
  "TestGBDataOneYearDailyBinnedMonthly.xml":
    "https://s3-us-west-2.amazonaws.com/technical.greenbuttonalliance.org/library/sample-data/TestGBDataOneYearDailyBinnedMonthly.xml",
  "TestGBDataHourlyNineDaysBinnedDaily.xml":
    "https://s3-us-west-2.amazonaws.com/technical.greenbuttonalliance.org/library/sample-data/TestGBDataHourlyNineDaysBinnedDaily.xml",
  "TestGBDataThirteenMonthsBinnedDailyWCost.xml":
    "https://s3-us-west-2.amazonaws.com/technical.greenbuttonalliance.org/library/sample-data/TestGBDataThirteenMonthsBinnedDailyWCost.xml"
};

function intakeFlowForOrganizationType(value) {
  switch (value) {
    case "homeowner":
      return "homeowner";
    case "multifamily_property_owner_manager":
      return "multifamily";
    case "business_commercial":
      return "business";
    case "nonprofit":
    case "government_public_agency":
    case "school_education":
    case "agriculture":
    case "industrial_manufacturing":
    case "other":
      return "organization";
    default:
      return "unknown";
  }
}

function parseInteger(value, fallback) {
  const parsed = Number.parseInt(String(value), 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function createSeededRandom(seed = defaultSeed) {
  let state = (Number(seed) >>> 0) || 1;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 0x100000000;
  };
}

function choose(random, values) {
  return values[Math.floor(random() * values.length)] || values[0];
}

function maybeChoose(random, values, probability = 0.5) {
  return random() <= probability ? choose(random, values) : "";
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function fixtureContentType(sourceType) {
  switch (sourceType) {
    case "green_button_csv":
      return "text/csv";
    case "green_button_xml":
      return "application/xml";
    case "utility_pdf":
      return "application/pdf";
    default:
      return "application/octet-stream";
  }
}

export function inferFixtureSourceType(fixturePath) {
  const ext = path.extname(fixturePath).toLowerCase();
  if (ext === ".xml") return "green_button_xml";
  if (ext === ".csv") return "green_button_csv";
  if (ext === ".pdf") return "utility_pdf";
  return "unknown";
}

export function parseArgs(argv) {
  const options = {
    allowProductionSeed: false,
    apiBaseUrl: defaultApiBaseUrl,
    count: defaultCount,
    customerType: null,
    dryRun: true,
    fixture: null,
    reportPath: defaultReportPath,
    seed: defaultSeed,
    write: false
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const next = argv[index + 1];

    if (arg === "--count" && next) {
      options.count = Math.max(1, parseInteger(next, defaultCount));
      index += 1;
      continue;
    }

    if (arg === "--customer-type" && next) {
      options.customerType = next;
      index += 1;
      continue;
    }

    if (arg === "--fixture" && next) {
      options.fixture = next;
      index += 1;
      continue;
    }

    if (arg === "--seed" && next) {
      options.seed = parseInteger(next, defaultSeed);
      index += 1;
      continue;
    }

    if (arg === "--report-path" && next) {
      options.reportPath = next;
      index += 1;
      continue;
    }

    if (arg === "--base-url" && next) {
      options.apiBaseUrl = next;
      index += 1;
      continue;
    }

    if (arg === "--dry-run") {
      options.dryRun = true;
      options.write = false;
      continue;
    }

    if (arg === "--write" || arg === "--no-dry-run") {
      options.dryRun = false;
      options.write = true;
      continue;
    }

    if (arg === "--allow-production-seed") {
      options.allowProductionSeed = true;
      continue;
    }

    if (arg === "--help" || arg === "-h") {
      options.help = true;
      continue;
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  if (options.customerType && !supportedCustomerTypes.includes(options.customerType)) {
    throw new Error(`Unsupported customer type: ${options.customerType}`);
  }

  return options;
}

export function generateFakeIntakePayload({ customerType, index, random, runId }) {
  if (!supportedCustomerTypes.includes(customerType)) {
    throw new Error(`Unsupported customer type: ${customerType}`);
  }

  const flow = intakeFlowForOrganizationType(customerType);
  const firstName = choose(random, firstNames);
  const lastName = choose(random, lastNames);
  const city = choose(random, cities);
  const streetNumber = 100 + Math.floor(random() * 8900);
  const streetName = choose(random, streetNames);
  const contactName = `${firstName} ${lastName}`;
  const emailSlug = slugify(`${runId}-${customerType}-${index}-${firstName}-${lastName}`);
  const buildingType =
    flow === "homeowner" ? choose(random, homeownerBuildingTypes) : flow === "multifamily" ? "" : choose(random, nonResidentialBuildingTypes);
  const companyBase =
    flow === "homeowner"
      ? ""
      : flow === "multifamily"
        ? `${lastName} Residences`
        : `${lastName} ${flow === "organization" ? "Initiative" : "Holdings"}`;
  const gasUtilityRaw = maybeChoose(random, gasUtilityProviders, 0.55);
  const gasUtilityProvider = gasUtilityRaw === "No gas" ? "I don't have gas" : gasUtilityRaw === "Unknown" ? "I'm not sure" : gasUtilityRaw;

  return {
    fullName: contactName,
    contactName,
    email: `${emailSlug}@example.com`,
    phone: `555-01${String(index).padStart(2, "0")}`,
    roleTitle: "",
    contactPreference: "Email",
    siteAddress: `${streetNumber} ${streetName} St, ${city.city}, ${city.state} ${city.zip}`,
    electricUtilityProvider: choose(random, utilityProviders),
    gasUtilityProvider,
    companyName: companyBase,
    website: flow === "business" || flow === "organization" ? `https://${slugify(companyBase || `${lastName}-${index}`)}.example.com` : "",
    industry: "",
    organizationType: customerType,
    organizationSize: flow === "business" || flow === "organization" ? maybeChoose(random, organizationSizes, 0.7) : "",
    headquarters: "",
    ownershipStatus: "",
    buildingType,
    squareFootage: String(
      flow === "homeowner"
        ? 1200 + Math.floor(random() * 2600)
        : flow === "multifamily"
          ? 18000 + Math.floor(random() * 50000)
          : 3000 + Math.floor(random() * 120000)
    ),
    numberOfUnits: flow === "multifamily" ? String(8 + Math.floor(random() * 220)) : "",
    interestedImprovements: [],
    sustainabilityGoals: "",
    currentChallenges: "",
    monthlyUtilitySpend: "",
    timeline: "",
    notes: `RetroFi fake seed ${runId} for ${customerType}`
  };
}

export function validateGeneratedIntakePayload(payload) {
  const errors = [];
  const requiredKeys = [
    "fullName",
    "contactName",
    "email",
    "phone",
    "roleTitle",
    "contactPreference",
    "siteAddress",
    "electricUtilityProvider",
    "gasUtilityProvider",
    "companyName",
    "website",
    "industry",
    "organizationType",
    "organizationSize",
    "headquarters",
    "ownershipStatus",
    "buildingType",
    "squareFootage",
    "numberOfUnits",
    "interestedImprovements",
    "sustainabilityGoals",
    "currentChallenges",
    "monthlyUtilitySpend",
    "timeline",
    "notes"
  ];

  for (const key of requiredKeys) {
    if (!(key in payload)) {
      errors.push(`Missing key: ${key}`);
    }
  }

  if (!payload.contactName?.trim()) errors.push("Contact name is required.");
  if (!payload.email?.trim()) errors.push("Email is required.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email || "")) errors.push("Email must be valid.");
  if (!payload.siteAddress?.trim()) errors.push("Site address is required.");
  if (!payload.electricUtilityProvider?.trim()) errors.push("Electric utility provider is required.");
  if (!payload.organizationType?.trim()) errors.push("Organization type is required.");
  if (!/^\d[\d,\s.]*$/.test(payload.squareFootage || "")) errors.push("Square footage must be numeric.");
  if (!Array.isArray(payload.interestedImprovements)) errors.push("Interested improvements must be an array.");

  const flow = intakeFlowForOrganizationType(payload.organizationType);
  if ((flow === "business" || flow === "organization") && !payload.companyName?.trim()) {
    errors.push("Company name is required.");
  }
  if ((flow === "homeowner" || flow === "business" || flow === "organization") && !payload.buildingType?.trim()) {
    errors.push("Building type is required.");
  }
  if (flow === "multifamily" && !/^\d[\d,\s.]*$/.test(payload.numberOfUnits || "")) {
    errors.push("Number of units is required and must be numeric.");
  }

  return errors;
}

export async function listFixturePaths(fixtureDir = defaultFixtureDir) {
  const entries = await fs.readdir(fixtureDir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile())
    .map((entry) => path.join(fixtureDir, entry.name))
    .filter((fixturePath) => [".xml", ".csv"].includes(path.extname(fixturePath).toLowerCase()))
    .sort((left, right) => path.basename(left).localeCompare(path.basename(right)));
}

export async function loadFixtureDescriptor(fixturePath) {
  const resolvedPath = path.resolve(fixturePath);
  const sourceType = inferFixtureSourceType(resolvedPath);
  const originalFilename = path.basename(resolvedPath);
  const text = await fs.readFile(resolvedPath, "utf8");

  if (sourceType === "unknown") {
    throw new Error(`Unsupported fixture type for ${originalFilename}`);
  }

  return {
    contentType: fixtureContentType(sourceType),
    originalFilename,
    path: resolvedPath,
    sourceType,
    text
  };
}

export async function parseFixtureForPreview({ fixture, payload }) {
  const preview = processUtilityDataUpload({
    clientIntakeId: "preview_intake",
    fileId: "preview_file",
    originalFilename: fixture.originalFilename,
    s3Key: `preview/${fixture.originalFilename}`,
    siteId: "preview_site",
    sourceType: fixture.sourceType,
    text: fixture.text,
    uploadedAt: "2026-01-01T00:00:00.000Z",
    utilityProvider: payload.electricUtilityProvider
  });
  const validation = validateExtractedValueFieldIds(preview.utilityExtractedValues);
  if (!validation.ok) {
    throw new Error(`Fixture ${fixture.originalFilename} yielded unknown field IDs: ${validation.unknownFieldIds.join(", ")}`);
  }

  return {
    extractedFieldCount: preview.utilityExtractedValues.length,
    extractedFieldIds: [...new Set(preview.utilityExtractedValues.map((item) => item.fieldId))].sort(),
    processingStatus: preview.uploadedUtilityFile.processingStatus,
    preview
  };
}

export function createApiSeedTransport({ baseUrl = defaultApiBaseUrl, fetchImpl = fetch }) {
  async function postJson(url, body) {
    const response = await fetchImpl(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(payload.error || `Request failed with HTTP ${response.status}`);
    }
    return payload;
  }

  return {
    async createIntake(payload) {
      return postJson(new URL("/api/intake", baseUrl).toString(), payload);
    },
    async uploadFixture({ fixture, payload, uploadSession }) {
      const uploadDescriptor = await postJson(new URL("/api/energy-data/upload-url", baseUrl).toString(), {
        userId: uploadSession.userId,
        uploadToken: uploadSession.token,
        fileName: fixture.originalFilename,
        contentType: fixture.contentType,
        sourceType: fixture.sourceType
      });

      const uploadResponse = await fetchImpl(uploadDescriptor.uploadUrl, {
        method: "PUT",
        headers: fixture.contentType ? { "Content-Type": fixture.contentType } : undefined,
        body: fixture.text
      });
      if (!uploadResponse.ok) {
        throw new Error(`Upload PUT failed with HTTP ${uploadResponse.status}`);
      }

      return postJson(new URL("/api/energy-data/register", baseUrl).toString(), {
        userId: uploadSession.userId,
        uploadToken: uploadSession.token,
        energyDataId: uploadDescriptor.energyDataId,
        s3Key: uploadDescriptor.s3Key,
        fileName: fixture.originalFilename,
        contentType: fixture.contentType,
        sourceType: fixture.sourceType,
        utilityName: payload.electricUtilityProvider
      });
    }
  };
}

function summarizeResult(result) {
  return {
    customerType: result.customerType,
    dryRun: result.dryRun,
    email: result.payload.email,
    extractedFieldIds: result.extractedFieldIds,
    extractedFieldCount: result.extractedFieldCount,
    fixture: path.basename(result.fixture.path),
    status: result.status,
    userId: result.userId || null
  };
}

function buildReportMarkdown({ failures, generatedAt, options, results }) {
  const customerTypes = [...new Set(results.map((result) => result.customerType))];
  const fixtures = [...new Set(results.map((result) => path.basename(result.fixture.path)))];
  const extractedFields = [...new Set(results.flatMap((result) => result.extractedFieldIds))].sort();

  return [
    "# Fake Green Button Seed Report",
    "",
    `Generated at: ${generatedAt}`,
    `Mode: ${options.dryRun ? "dry-run" : "write"}`,
    `Count requested: ${options.count}`,
    `Seed: ${options.seed}`,
    options.customerType ? `Customer type filter: ${options.customerType}` : "Customer type filter: mixed",
    "",
    "## Summary",
    "",
    `- Fake clients generated: ${results.length}`,
    `- Customer types generated: ${customerTypes.join(", ") || "None"}`,
    `- Fixture files used: ${fixtures.join(", ") || "None"}`,
    `- Extracted fields found: ${extractedFields.join(", ") || "None"}`,
    `- Failed parses or writes: ${failures.length}`,
    "",
    "## Results",
    "",
    "| Email | Customer type | Fixture | Status | Extracted fields |",
    "| --- | --- | --- | --- | --- |",
    ...results.map((result) =>
      `| ${result.payload.email} | ${result.customerType} | ${path.basename(result.fixture.path)} | ${result.status} | ${result.extractedFieldIds.join(", ") || "None"} |`
    ),
    "",
    "## Failures",
    "",
    ...(failures.length > 0
      ? failures.map((failure) => `- ${failure.email || "unknown"}: ${failure.error}`)
      : ["- None"]),
    ""
  ].join("\n");
}

async function ensureSafety(options) {
  if (process.env.NODE_ENV === "production" && !options.allowProductionSeed) {
    throw new Error("Refusing to run seed script with NODE_ENV=production without --allow-production-seed.");
  }

  if (process.env.NODE_ENV === "production" && options.allowProductionSeed && !options.dryRun) {
    if (!process.stdin.isTTY) {
      throw new Error("Production seeding requires interactive confirmation.");
    }

    console.warn("WARNING: production seeding is enabled.");
    console.warn(`Type ${productionConfirmPhrase} to continue.`);
    const rl = readline.createInterface({ input, output });
    const answer = await rl.question("> ");
    rl.close();
    if (answer.trim() !== productionConfirmPhrase) {
      throw new Error("Production seed aborted.");
    }
  }
}

export async function seedFakeGreenButtonClients(options, dependencies = {}) {
  const normalizedOptions = {
    ...options,
    apiBaseUrl: options.apiBaseUrl || defaultApiBaseUrl,
    count: Math.max(1, options.count || defaultCount),
    dryRun: options.dryRun !== false,
    reportPath: options.reportPath || defaultReportPath,
    seed: options.seed ?? defaultSeed
  };
  const random = createSeededRandom(normalizedOptions.seed);
  const runId = `seed-${normalizedOptions.seed}`;
  const transport = dependencies.transport || createApiSeedTransport({ baseUrl: normalizedOptions.apiBaseUrl, fetchImpl: dependencies.fetchImpl || fetch });
  const writeFile = dependencies.writeFile || fs.writeFile;
  const fixturePaths = normalizedOptions.fixture
    ? [path.resolve(normalizedOptions.fixture)]
    : await listFixturePaths(defaultFixtureDir);

  if (fixturePaths.length === 0) {
    throw new Error("No Green Button fixtures are available.");
  }

  const results = [];
  const failures = [];

  for (let index = 0; index < normalizedOptions.count; index += 1) {
    const customerType = normalizedOptions.customerType || choose(random, supportedCustomerTypes);
    const payload = generateFakeIntakePayload({ customerType, index, random, runId });
    const validationErrors = validateGeneratedIntakePayload(payload);
    if (validationErrors.length > 0) {
      throw new Error(`Generated payload was invalid for ${payload.email}: ${validationErrors.join(" ")}`);
    }

    const fixturePath = fixturePaths[index % fixturePaths.length];
    const fixture = await loadFixtureDescriptor(fixturePath);
    const preview = await parseFixtureForPreview({ fixture, payload });

    const result = {
      customerType,
      dryRun: normalizedOptions.dryRun,
      extractedFieldCount: preview.extractedFieldCount,
      extractedFieldIds: preview.extractedFieldIds,
      fixture,
      payload,
      status: normalizedOptions.dryRun ? "dry-run" : "pending",
      userId: null
    };

    if (!normalizedOptions.dryRun) {
      try {
        const intakeResponse = await transport.createIntake(payload);
        const uploadResponse = await transport.uploadFixture({
          fixture,
          payload,
          uploadSession: intakeResponse.uploadSession
        });
        result.status = "seeded";
        result.userId = intakeResponse.user?.userId || uploadResponse.intake?.userId || null;
      } catch (error) {
        result.status = "failed";
        failures.push({
          email: payload.email,
          error: error instanceof Error ? error.message : "Unknown write error."
        });
      }
    }

    results.push(result);
  }

  const generatedAt = new Date().toISOString();
  const report = buildReportMarkdown({ failures, generatedAt, options: normalizedOptions, results });
  await writeFile(normalizedOptions.reportPath, report, "utf8");

  return {
    failures,
    generatedAt,
    report,
    results
  };
}

function printHelp() {
  console.log(`Usage: node scripts/seed-fake-green-button-clients.mjs [options]

Options:
  --count 5
  --customer-type homeowner
  --dry-run
  --write
  --fixture path/to/sample.xml
  --seed 123
  --base-url http://127.0.0.1:8787
  --allow-production-seed
`);
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    printHelp();
    return;
  }

  await ensureSafety(options);
  const outcome = await seedFakeGreenButtonClients(options);
  for (const result of outcome.results) {
    console.log(JSON.stringify(summarizeResult(result), null, 2));
  }
  console.log(`Report written to ${path.relative(repoRoot, options.reportPath || defaultReportPath)}`);
  if (outcome.failures.length > 0) {
    process.exitCode = 1;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}
