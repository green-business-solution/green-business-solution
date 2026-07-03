import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { fromIni } from "@aws-sdk/credential-providers";

const scriptPath = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(scriptPath), "..");
const defaultSampleUsersPath = path.join(repoRoot, "data", "sample_user_profiles.json");
const defaultTestCasesPath = path.join(repoRoot, "public", "sample_matching_test_cases.json");
const defaultReportPath = path.join(repoRoot, "data", "sample_test_case_fake_user_promotion_report.md");
const defaultRegion = process.env.GBS_AWS_REGION || process.env.AWS_REGION || "us-east-2";
const defaultProfile = process.env.AWS_PROFILE || "gbs";
const defaultUsersTable = process.env.GBS_USERS_TABLE || "gbs-users";
const defaultIntakeTable = process.env.GBS_INTAKE_TABLE || "gbs-client-intake";

export function parseArgs(argv) {
  const options = {
    dryRun: true,
    intakeTable: defaultIntakeTable,
    patchPath: null,
    profile: defaultProfile,
    region: defaultRegion,
    reportPath: defaultReportPath,
    sampleUserIds: [],
    sampleUsersPath: defaultSampleUsersPath,
    testCasesPath: defaultTestCasesPath,
    usersTable: defaultUsersTable
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const next = argv[index + 1];

    if (arg === "--write" || arg === "--no-dry-run") {
      options.dryRun = false;
      continue;
    }
    if (arg === "--dry-run") {
      options.dryRun = true;
      continue;
    }
    if (arg === "--patch" && next) {
      options.patchPath = path.resolve(repoRoot, next);
      index += 1;
      continue;
    }
    if (arg === "--sample-user-id" && next) {
      options.sampleUserIds.push(...splitIds(next));
      index += 1;
      continue;
    }
    if (arg === "--sample-users" && next) {
      options.sampleUsersPath = path.resolve(repoRoot, next);
      index += 1;
      continue;
    }
    if (arg === "--test-cases" && next) {
      options.testCasesPath = path.resolve(repoRoot, next);
      index += 1;
      continue;
    }
    if (arg === "--report" && next) {
      options.reportPath = path.resolve(repoRoot, next);
      index += 1;
      continue;
    }
    if (arg === "--users-table" && next) {
      options.usersTable = next;
      index += 1;
      continue;
    }
    if (arg === "--intake-table" && next) {
      options.intakeTable = next;
      index += 1;
      continue;
    }
    if (arg === "--region" && next) {
      options.region = next;
      index += 1;
      continue;
    }
    if (arg === "--profile" && next) {
      options.profile = next;
      index += 1;
      continue;
    }
    if (arg === "--help" || arg === "-h") {
      options.help = true;
      continue;
    }
    throw new Error(`Unknown argument: ${arg}`);
  }

  options.sampleUserIds = unique(options.sampleUserIds);
  return options;
}

export async function promoteSampleTestCasesToFakeUsers(options = {}, dependencies = {}) {
  const config = {
    dryRun: options.dryRun !== false,
    intakeTable: options.intakeTable || defaultIntakeTable,
    patchPath: options.patchPath || null,
    profile: options.profile ?? defaultProfile,
    region: options.region || defaultRegion,
    reportPath: options.reportPath || defaultReportPath,
    sampleUserIds: Array.isArray(options.sampleUserIds) ? unique(options.sampleUserIds) : [],
    sampleUsersPath: options.sampleUsersPath || defaultSampleUsersPath,
    testCasesPath: options.testCasesPath || defaultTestCasesPath,
    usersTable: options.usersTable || defaultUsersTable
  };
  const readFile = dependencies.readFile || fs.readFile;
  const writeFile = dependencies.writeFile || fs.writeFile;
  const mkdir = dependencies.mkdir || fs.mkdir;
  const db = dependencies.db || createDbClient(config);
  const now = new Date().toISOString();
  const sampleUsers = JSON.parse(await readFile(config.sampleUsersPath, "utf8"));
  const testCasesPayload = JSON.parse(await readFile(config.testCasesPath, "utf8"));
  const testCases = Array.isArray(testCasesPayload) ? testCasesPayload : testCasesPayload.testCases || [];
  const selectedIds = await resolveSelectedSampleUserIds(config, { readFile, sampleUsers });
  const records = buildPromotionRecords({ now, sampleUsers, selectedIds, testCases });
  const results = [];
  const failures = [];

  for (const record of records) {
    const result = {
      companyName: record.user.companyName,
      dryRun: config.dryRun,
      email: record.user.email,
      sampleUserId: record.sampleUserId,
      status: config.dryRun ? "dry-run" : "pending",
      userId: record.user.userId
    };

    try {
      await assertSafeToWriteRecord(record, { db, intakeTable: config.intakeTable, usersTable: config.usersTable });
      if (!config.dryRun) {
        await db.send(
          new PutCommand({
            TableName: config.usersTable,
            Item: record.user
          })
        );
        await db.send(
          new PutCommand({
            TableName: config.intakeTable,
            Item: record.intake
          })
        );
      }
      result.status = config.dryRun ? "dry-run" : "promoted";
    } catch (error) {
      result.status = "failed";
      result.error = error instanceof Error ? error.message : "Unknown promotion error.";
      failures.push(result);
    }

    results.push(result);
  }

  const report = buildReport({ config, failures, generatedAt: now, records, results, selectedIds });
  await mkdir(path.dirname(config.reportPath), { recursive: true });
  await writeFile(config.reportPath, report, "utf8");

  return {
    failures,
    promotedCount: results.filter((result) => result.status === "promoted").length,
    report,
    results,
    selectedCount: selectedIds.length
  };
}

export function buildPromotionRecords({ now, sampleUsers, selectedIds, testCases }) {
  const sampleById = new Map(sampleUsers.map((sample) => [sample.sampleUserId, sample]));
  const testCaseById = new Map(testCases.map((testCase) => [testCase.sampleUserId, testCase]));
  return selectedIds.map((sampleUserId) => {
    const sample = sampleById.get(sampleUserId);
    if (!sample) {
      throw new Error(`Sample user was not found: ${sampleUserId}`);
    }
    if (!Array.isArray(sample.uploadedUtilityFiles) || sample.uploadedUtilityFiles.length === 0) {
      throw new Error(`Sample user does not have imported utility files: ${sampleUserId}`);
    }
    if (!Array.isArray(sample.utilityExtractedValues) || sample.utilityExtractedValues.length === 0) {
      throw new Error(`Sample user does not have imported utility extracted values: ${sampleUserId}`);
    }

    const testCase = testCaseById.get(sampleUserId) || null;
    const email = cleanEmail(sample.email || `${sampleUserId}@example.com`);
    const userId = createAccountUserId(email);
    const submissionId = `intake_sample_${sampleUserId}`;
    const fullName = deriveSampleContactName(sample);
    const utilityImportedAt = sample.utilityDataImportedAt || now;
    const user = {
      userId,
      role: "client",
      status: "active",
      fullName,
      email,
      companyName: cleanText(sample.companyName),
      authProvider: "sample_fixture",
      googleLinked: false,
      passwordLinked: false,
      isFakeUser: true,
      sampleUserId,
      source: "sample_matching_test_case",
      createdAt: sample.createdAt || utilityImportedAt,
      updatedAt: now
    };
    const intake = {
      userId,
      submissionId,
      sampleUserId,
      source: "sample_matching_test_case",
      isFakeUser: true,
      contact: {
        fullName,
        email,
        phone: cleanOptional(sample.phone),
        roleTitle: "Sample test user",
        contactPreference: "Email"
      },
      business: {
        companyName: cleanText(sample.companyName),
        website: cleanOptional(sample.website),
        industry: cleanText(sample.primaryActivityText),
        primaryActivityText: cleanText(sample.primaryActivityText),
        naicsCodes: Array.isArray(sample.naicsCodes) ? sample.naicsCodes : [],
        organizationType: cleanText(sample.organizationType),
        organizationSize: cleanText(sample.organizationSize),
        headquarters: cleanText(sample.siteAddress)
      },
      site: {
        address: cleanText(sample.siteAddress),
        electricUtilityProvider: cleanText(sample.electricUtilityProvider),
        gasUtilityProvider: cleanOptional(sample.gasUtilityProvider),
        ownershipStatus: cleanText(sample.ownershipStatus),
        buildingType: cleanText(sample.buildingType),
        squareFootage: cleanText(sample.squareFootage),
        numberOfUnits: cleanOptional(sample.numberOfUnits),
        derivedFieldsPlanned: ["State", "County", "City", "ZIP", "Utility territory"]
      },
      sustainability: {
        goals: cleanText(sample.publicSourceNotes || sample.description),
        currentChallenges: cleanText(sample.notes),
        interestedImprovements: deriveInterestedImprovements(testCase),
        monthlyUtilitySpend: deriveMonthlyUtilitySpend(sample.siteEnergyProfile),
        timeline: cleanText(sample.project?.stage) || "exploring",
        notes: [
          sample.syntheticUtilityDataNotice,
          sample.notes,
          `Sample matching test case: ${sampleUserId}`
        ].filter(Boolean).join(" ")
      },
      energyDataUploadSession: null,
      uploadedUtilityFiles: sample.uploadedUtilityFiles,
      utilityExtractedValues: sample.utilityExtractedValues,
      siteEnergyProfile: sample.siteEnergyProfile,
      uploadedTaxFiles: Array.isArray(sample.uploadedTaxFiles) ? sample.uploadedTaxFiles : [],
      taxExtractedValues: Array.isArray(sample.taxExtractedValues) ? sample.taxExtractedValues : [],
      siteTaxProfile: sample.siteTaxProfile || null,
      taxProfileFacts: Array.isArray(sample.taxProfileFacts) ? sample.taxProfileFacts : [],
      taxOpportunitySpecificInputs: Array.isArray(sample.taxOpportunitySpecificInputs) ? sample.taxOpportunitySpecificInputs : [],
      taxMissingOrReviewInputs: Array.isArray(sample.taxMissingOrReviewInputs) ? sample.taxMissingOrReviewInputs : [],
      grantProfileFacts: Array.isArray(sample.grantProfileFacts) ? sample.grantProfileFacts : [],
      grantRetrofitProjectInputs: Array.isArray(sample.grantRetrofitProjectInputs)
        ? sample.grantRetrofitProjectInputs
        : [],
      grantOpportunitySpecificInputs: Array.isArray(sample.grantOpportunitySpecificInputs)
        ? sample.grantOpportunitySpecificInputs
        : [],
      grantMissingOrReviewInputs: Array.isArray(sample.grantMissingOrReviewInputs)
        ? sample.grantMissingOrReviewInputs
        : [],
      grantDoNotForceQualificationReasons: Array.isArray(sample.grantDoNotForceQualificationReasons)
        ? sample.grantDoNotForceQualificationReasons
        : [],
      syntheticGrantProfileDataNotice: sample.syntheticGrantProfileDataNotice || null,
      grantProfileConfidence: sample.grantProfileConfidence || null,
      grantProfileNotes: sample.grantProfileNotes || null,
      grantProfileDataSchemaVersion: sample.grantProfileDataSchemaVersion || null,
      grantProfileDataSourceArtifact: sample.grantProfileDataSourceArtifact || null,
      sampleMatchingSummary: testCase
        ? {
            topOpportunityCount: testCase.topOpportunities?.length || 0,
            promisingOpportunityCount: testCase.promisingOpportunityCount ?? null,
            reviewedNoRuleCount: testCase.reviewedNoRuleCount ?? null,
            generatedAt: testCase.generatedAt || null
          }
        : null,
      createdAt: sample.createdAt || utilityImportedAt,
      updatedAt: now
    };

    return { intake, sampleUserId, user };
  });
}

async function resolveSelectedSampleUserIds(config, { readFile, sampleUsers }) {
  if (config.sampleUserIds.length > 0) {
    return config.sampleUserIds;
  }

  if (config.patchPath) {
    const patch = JSON.parse(await readFile(config.patchPath, "utf8"));
    const ids = unique((patch.profiles || []).map((profile) => profile.sampleUserId).filter(Boolean));
    if (ids.length > 0) return ids;
  }

  return sampleUsers
    .filter((sample) => Array.isArray(sample.uploadedUtilityFiles) && sample.uploadedUtilityFiles.length > 0)
    .map((sample) => sample.sampleUserId);
}

async function assertSafeToWriteRecord(record, { db, intakeTable, usersTable }) {
  const [existingUserResult, existingIntakeResult] = await Promise.all([
    db.send(new GetCommand({ TableName: usersTable, Key: { userId: record.user.userId } })),
    db.send(new GetCommand({ TableName: intakeTable, Key: { userId: record.user.userId } }))
  ]);
  const existingUser = existingUserResult.Item || null;
  const existingIntake = existingIntakeResult.Item || null;

  if (existingUser && existingUser.isFakeUser !== true) {
    throw new Error(`Refusing to overwrite non-fake user ${record.user.userId}.`);
  }
  if (existingUser && existingUser.email && cleanEmail(existingUser.email) !== record.user.email) {
    throw new Error(`Existing fake user ${record.user.userId} has a different email.`);
  }
  if (existingIntake && existingIntake.isFakeUser !== true && existingIntake.sampleUserId !== record.sampleUserId) {
    throw new Error(`Refusing to overwrite non-sample intake ${record.user.userId}.`);
  }
}

function createDbClient(config) {
  const client = new DynamoDBClient({
    region: config.region,
    credentials: config.profile ? fromIni({ profile: config.profile }) : undefined
  });
  return DynamoDBDocumentClient.from(client, {
    marshallOptions: {
      removeUndefinedValues: true
    }
  });
}

function buildReport({ config, failures, generatedAt, records, results, selectedIds }) {
  const lines = [
    "# Sample Test Case Fake User Promotion Report",
    "",
    `Generated: ${generatedAt}`,
    `Dry run: ${config.dryRun ? "yes" : "no"}`,
    `Sample users: \`${path.relative(repoRoot, config.sampleUsersPath)}\``,
    `Public test cases: \`${path.relative(repoRoot, config.testCasesPath)}\``,
    `Users table: \`${config.usersTable}\``,
    `Intake table: \`${config.intakeTable}\``,
    "",
    "## Summary",
    "",
    `- Selected sample users: ${selectedIds.length}`,
    `- Promotion records built: ${records.length}`,
    `- Promoted records: ${results.filter((result) => result.status === "promoted").length}`,
    `- Dry-run records: ${results.filter((result) => result.status === "dry-run").length}`,
    `- Failed records: ${failures.length}`,
    "",
    "## Results",
    "",
    ...results.map((result) =>
      `- ${result.sampleUserId} -> ${result.userId} (${result.email}): ${result.status}${result.error ? ` - ${result.error}` : ""}`
    ),
    ""
  ];
  return `${lines.join("\n")}\n`;
}

function deriveSampleContactName(sample) {
  const fullName = cleanText(sample.fullName);
  if (fullName && fullName.toLowerCase() !== "sample user") return fullName;
  const companyName = cleanText(sample.companyName);
  return companyName ? `${companyName} Sample User` : "Sample Test User";
}

function deriveInterestedImprovements(testCase) {
  if (!testCase || !Array.isArray(testCase.retrofits)) return [];
  return unique(
    testCase.retrofits
      .slice(0, 8)
      .map((retrofit) => retrofit.displayName || retrofit.retrofitDisplayName || retrofit.retrofitTypeId)
      .filter(Boolean)
  );
}

function deriveMonthlyUtilitySpend(siteEnergyProfile) {
  if (!siteEnergyProfile || typeof siteEnergyProfile !== "object") return null;
  const annualCost =
    numeric(siteEnergyProfile.annualElectricCost) +
    numeric(siteEnergyProfile.annualGasCost) +
    numeric(siteEnergyProfile.annualWaterCost);
  if (!annualCost) return null;
  return String(Math.round(annualCost / 12));
}

function createAccountUserId(email) {
  const digest = crypto.createHash("sha256").update(cleanEmail(email)).digest("hex").slice(0, 32);
  return `account_${digest}`;
}

function cleanEmail(value) {
  return cleanText(value).toLowerCase();
}

function cleanText(value) {
  return typeof value === "string" ? value.trim() : value == null ? "" : String(value).trim();
}

function cleanOptional(value) {
  const text = cleanText(value);
  return text || null;
}

function numeric(value) {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function splitIds(value) {
  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function printHelp() {
  console.log(`Usage: node scripts/promote-sample-test-cases-to-fake-users.mjs [options]

Options:
  --dry-run
  --write
  --patch /path/to/retrofi_patch_first10.json
  --sample-user-id id-a,id-b
  --sample-users data/sample_user_profiles.json
  --test-cases public/sample_matching_test_cases.json
  --report data/sample_test_case_fake_user_promotion_report.md
  --users-table gbs-users
  --intake-table gbs-client-intake
  --region us-east-2
  --profile gbs
`);
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    printHelp();
    return;
  }
  const outcome = await promoteSampleTestCasesToFakeUsers(options);
  console.log("Sample test-case fake user promotion complete.");
  console.log(`Selected records: ${outcome.selectedCount}`);
  console.log(`Promoted records: ${outcome.promotedCount}`);
  console.log(`Failures: ${outcome.failures.length}`);
  console.log(`Report: ${options.reportPath}`);
  if (outcome.failures.length > 0) {
    process.exitCode = 1;
  }
}

if (process.argv[1] === scriptPath) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}
