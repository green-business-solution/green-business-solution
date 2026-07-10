import { execFile } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  DynamoDBClient,
  CreateTableCommand,
  DescribeTableCommand,
  ListTablesCommand,
  waitUntilTableExists
} from "@aws-sdk/client-dynamodb";
import { PutObjectCommand, S3Client, HeadBucketCommand, CreateBucketCommand } from "@aws-sdk/client-s3";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import crypto from "node:crypto";
import { buildFixtureRetrofitRecommendationsPayload } from "../apps/api/server/fixtureRetrofitRecommendations.mjs";
import { writePersistentRetrofitRecommendations } from "../apps/api/server/retrofitRecommendationsCache.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const composeFile = path.join(repoRoot, "docker-compose.local.yml");
const localDataRoot = path.join(repoRoot, ".local");
const operationTimeoutMs = 15000;
const localModeEnv = {
  GBS_LOCAL_STACK: "1",
  GBS_AWS_REGION: "us-east-2",
  AWS_REGION: "us-east-2",
  AWS_ACCESS_KEY_ID: "localaccesskey",
  AWS_SECRET_ACCESS_KEY: "localsecretkey",
  AWS_EC2_METADATA_DISABLED: "true",
  GBS_DYNAMODB_ENDPOINT: "http://127.0.0.1:8000",
  GBS_S3_ENDPOINT: "http://127.0.0.1:9000",
  GBS_S3_FORCE_PATH_STYLE: "1",
  GBS_ENERGY_DATA_BUCKET: "gbs-local-energy-data",
  GBS_RUNTIME_CACHE_BUCKET: "gbs-local-runtime-cache",
  GBS_DEV_WORK_BUCKET: "gbs-local-dev-work",
  GBS_GPT_PRO_WORK_BUCKET: "gbs-local-dev-work",
  GBS_USERS_TABLE: "gbs-users",
  GBS_INTAKE_TABLE: "gbs-client-intake",
  GBS_OPPORTUNITIES_TABLE: "gbs-opportunity-candidates",
  GBS_DASHBOARD_PERFORMANCE_TABLE: "gbs-dashboard-performance",
  GBS_RETROFIT_RECOMMENDATION_CACHE_TABLE: "gbs-retrofit-recommendation-cache",
  GBS_APPLICATION_PROFILES_TABLE: "gbs-application-profiles",
  GBS_API_RUNTIME_STATE_TABLE: "gbs-api-runtime-state",
  GBS_ADMIN_EMAILS: "neerkuchlous@gmail.com,pmrajvansh@gmail.com,rshen0210@gmail.com",
  GOOGLE_CLIENT_ID: "local-google-client",
  RETROFI_ENABLE_FIRSTMATE_TASKS: "0",
  RETROFI_FIRSTMATE_TASKS_LOCAL_AUTH_BYPASS: "0"
};

const tables = [
  { TableName: localModeEnv.GBS_USERS_TABLE, KeySchema: [{ AttributeName: "userId", KeyType: "HASH" }], AttributeDefinitions: [{ AttributeName: "userId", AttributeType: "S" }], BillingMode: "PAY_PER_REQUEST" },
  { TableName: localModeEnv.GBS_INTAKE_TABLE, KeySchema: [{ AttributeName: "userId", KeyType: "HASH" }], AttributeDefinitions: [{ AttributeName: "userId", AttributeType: "S" }], BillingMode: "PAY_PER_REQUEST" },
  { TableName: localModeEnv.GBS_OPPORTUNITIES_TABLE, KeySchema: [{ AttributeName: "opportunityId", KeyType: "HASH" }], AttributeDefinitions: [{ AttributeName: "opportunityId", AttributeType: "S" }], BillingMode: "PAY_PER_REQUEST" },
  { TableName: localModeEnv.GBS_DASHBOARD_PERFORMANCE_TABLE, KeySchema: [{ AttributeName: "stateScope", KeyType: "HASH" }, { AttributeName: "stateKey", KeyType: "RANGE" }], AttributeDefinitions: [{ AttributeName: "stateScope", AttributeType: "S" }, { AttributeName: "stateKey", AttributeType: "S" }], BillingMode: "PAY_PER_REQUEST" },
  { TableName: localModeEnv.GBS_RETROFIT_RECOMMENDATION_CACHE_TABLE, KeySchema: [{ AttributeName: "stateScope", KeyType: "HASH" }, { AttributeName: "stateKey", KeyType: "RANGE" }], AttributeDefinitions: [{ AttributeName: "stateScope", AttributeType: "S" }, { AttributeName: "stateKey", AttributeType: "S" }], BillingMode: "PAY_PER_REQUEST" },
  { TableName: localModeEnv.GBS_APPLICATION_PROFILES_TABLE, KeySchema: [{ AttributeName: "stateScope", KeyType: "HASH" }, { AttributeName: "stateKey", KeyType: "RANGE" }], AttributeDefinitions: [{ AttributeName: "stateScope", AttributeType: "S" }, { AttributeName: "stateKey", AttributeType: "S" }], BillingMode: "PAY_PER_REQUEST" },
  { TableName: localModeEnv.GBS_API_RUNTIME_STATE_TABLE, KeySchema: [{ AttributeName: "stateScope", KeyType: "HASH" }, { AttributeName: "stateKey", KeyType: "RANGE" }], AttributeDefinitions: [{ AttributeName: "stateScope", AttributeType: "S" }, { AttributeName: "stateKey", AttributeType: "S" }], BillingMode: "PAY_PER_REQUEST" }
];

function exec(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = execFile(command, args, { cwd: repoRoot, env: { ...process.env, ...options.env } }, (error, stdout, stderr) => {
      if (error) {
        reject(Object.assign(error, { stdout, stderr }));
        return;
      }
      resolve({ stdout, stderr });
    });
    child.stdin?.end();
  });
}

async function sendWithTimeout(client, command, label) {
  const timeout = new Promise((_, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`${label} timed out after ${operationTimeoutMs}ms`));
    }, operationTimeoutMs);
    timer.unref?.();
  });

  return Promise.race([client.send(command), timeout]);
}

async function waitFor(fn, description, timeoutMs = 120000) {
  const startedAt = Date.now();
  let lastError = null;
  while (Date.now() - startedAt < timeoutMs) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
  throw new Error(`${description} did not become ready within ${timeoutMs}ms${lastError ? `: ${lastError.message}` : ""}`);
}

async function ensureDocker() {
  try {
    await exec("docker", ["version"]);
  } catch {
    throw new Error("Docker is required for the local stack. Install and start Docker, then rerun `npm run dev:local`.");
  }
}

async function compose(args) {
  await exec("docker", ["compose", "-f", composeFile, ...args]);
}

async function localClients() {
  const ddb = new DynamoDBClient({
    region: localModeEnv.GBS_AWS_REGION,
    endpoint: localModeEnv.GBS_DYNAMODB_ENDPOINT,
    credentials: {
      accessKeyId: localModeEnv.AWS_ACCESS_KEY_ID,
      secretAccessKey: localModeEnv.AWS_SECRET_ACCESS_KEY
    }
  });
  const s3 = new S3Client({
    region: localModeEnv.GBS_AWS_REGION,
    endpoint: localModeEnv.GBS_S3_ENDPOINT,
    forcePathStyle: true,
    credentials: {
      accessKeyId: localModeEnv.AWS_ACCESS_KEY_ID,
      secretAccessKey: localModeEnv.AWS_SECRET_ACCESS_KEY
    }
  });
  return { ddb, db: DynamoDBDocumentClient.from(ddb), s3 };
}

async function closeClients(clients) {
  clients?.db?.destroy?.();
  clients?.ddb?.destroy?.();
  clients?.s3?.destroy?.();
}

async function ensureBucket(s3, bucket) {
  console.log(`[local-stack] ensuring bucket ${bucket}`);
  try {
    await sendWithTimeout(s3, new HeadBucketCommand({ Bucket: bucket }), `HeadBucket ${bucket}`);
  } catch {
    await sendWithTimeout(s3, new CreateBucketCommand({ Bucket: bucket }), `CreateBucket ${bucket}`);
  }
}

async function ensureTable(ddb, table) {
  console.log(`[local-stack] checking table ${table.TableName}`);
  try {
    await sendWithTimeout(ddb, new DescribeTableCommand({ TableName: table.TableName }), `DescribeTable ${table.TableName}`);
  } catch {
    console.log(`[local-stack] creating table ${table.TableName}`);
    await sendWithTimeout(ddb, new CreateTableCommand(table), `CreateTable ${table.TableName}`);
    console.log(`[local-stack] waiting for table ${table.TableName}`);
    await waitUntilTableExists({ client: ddb, maxWaitTime: 60 }, { TableName: table.TableName });
  }
}

async function waitForInfra() {
  const clients = await localClients();
  try {
    await waitFor(async () => {
      await sendWithTimeout(clients.ddb, new ListTablesCommand({ Limit: 1 }), "DynamoDB Local readiness");
      return true;
    }, "DynamoDB Local");
    await waitFor(async () => {
      await sendWithTimeout(clients.s3, new HeadBucketCommand({ Bucket: "gbs-local-runtime-cache" }), "MinIO readiness").catch(
        () => {}
      );
      return true;
    }, "MinIO");
  } finally {
    await closeClients(clients);
  }
}

function hashPublicUploadToken(value) {
  return crypto.createHash("sha256").update(String(value || "").trim()).digest("hex");
}

async function seedUsersAndIntakes(db, s3) {
  const now = "2026-07-10T00:00:00.000Z";
  const password = "local-dev-password";
  const passwordSalt = "local-seed-salt";
  const passwordFields = {
    passwordAlgorithm: "scrypt",
    passwordHashKeyLength: 64,
    passwordHash: crypto.scryptSync(password, passwordSalt, 64).toString("base64url"),
    passwordSalt,
    passwordLinked: true
  };

  const users = [
    {
      userId: "account_admin_local",
      role: "admin",
      status: "active",
      fullName: "Local Admin",
      email: "neerkuchlous@gmail.com",
      companyName: null,
      authProvider: "password",
      googleLinked: false,
      isFakeUser: false,
      passwordUsername: "neerkuchlous@gmail.com",
      passwordSessionHash: crypto.createHash("sha256").update("local-admin-session").digest("base64url"),
      passwordSessionCreatedAt: now,
      passwordSessionExpiresAt: "2027-01-01T00:00:00.000Z",
      createdAt: now,
      updatedAt: now,
      ...passwordFields
    },
    {
      userId: "account_client_local",
      role: "client",
      status: "active",
      fullName: "Local Client",
      email: "client@example.com",
      companyName: "Local Client Co",
      authProvider: "password",
      googleLinked: false,
      isFakeUser: false,
      passwordUsername: "client@example.com",
      passwordSessionHash: crypto.createHash("sha256").update("local-client-session").digest("base64url"),
      passwordSessionCreatedAt: now,
      passwordSessionExpiresAt: "2027-01-01T00:00:00.000Z",
      createdAt: now,
      updatedAt: now,
      ...passwordFields
    },
    {
      userId: "sample_california-endowment-hq",
      role: "client",
      status: "active",
      fullName: "Sample User",
      email: "california-endowment-hq@example.com",
      companyName: "The California Endowment",
      authProvider: "password",
      googleLinked: false,
      isFakeUser: true,
      sampleUserId: "california-endowment-hq",
      passwordUsername: "california-endowment-hq@example.com",
      passwordSessionHash: crypto.createHash("sha256").update("local-sample-session").digest("base64url"),
      passwordSessionCreatedAt: now,
      passwordSessionExpiresAt: "2027-01-01T00:00:00.000Z",
      createdAt: now,
      updatedAt: now,
      ...passwordFields
    }
  ];

  const sample = JSON.parse(await fs.readFile(path.join(repoRoot, "data", "sample_user_profiles.json"), "utf8"));
  const california = sample.find((item) => item.sampleUserId === "california-endowment-hq");
  const clientIntake = {
    userId: "account_client_local",
    submissionId: "intake_account_client_local",
    contact: { fullName: "Local Client", email: "client@example.com" },
    business: {
      companyName: "Local Client Co",
      organizationType: "business_commercial",
      organizationSize: "1-10 employees",
      industry: "Office",
      headquarters: "Los Angeles, CA"
    },
    site: {
      address: "100 Main Street, Los Angeles, CA 90012",
      electricUtilityProvider: "Los Angeles Department of Water and Power",
      ownershipStatus: "Own",
      buildingType: "Office / Administrative",
      squareFootage: "25000",
      derivedFieldsPlanned: ["State", "County", "City", "ZIP", "Utility territory"],
      derivedFieldsStatus: "partially_resolved"
    },
    sustainability: {
      goals: "Lower energy costs",
      currentChallenges: "Unknown",
      interestedImprovements: ["lighting"],
      timeline: "0-6 months"
    },
    uploadedUtilityFiles: [],
    utilityExtractedValues: [],
    siteEnergyProfile: {
      siteId: "intake_account_client_local:primary_site",
      uploadedFileCount: 0,
      processedFileCount: 0,
      availableFieldIds: [],
      monthlySummaries: [],
      utilitySummaries: [],
      lastUpdatedAt: now
    },
    energyDataUploadSession: { tokenHash: hashPublicUploadToken("local-upload-token"), issuedAt: now, expiresAt: "2027-01-01T00:00:00.000Z" },
    createdAt: now,
    updatedAt: now
  };
  const sampleIntake = {
    userId: "sample_california-endowment-hq",
    submissionId: "intake_sample_california-endowment-hq",
    contact: { fullName: california.fullName, email: california.email, phone: california.phone },
    business: {
      companyName: california.companyName,
      organizationType: "nonprofit",
      organizationSize: california.organizationSize,
      industry: california.primaryActivityText,
      headquarters: california.siteAddress
    },
    site: {
      address: california.siteAddress,
      electricUtilityProvider: california.electricUtilityProvider,
      gasUtilityProvider: california.gasUtilityProvider,
      ownershipStatus: "Own",
      buildingType: california.buildingType,
      squareFootage: california.squareFootage,
      derivedFieldsPlanned: ["State", "County", "City", "ZIP", "Utility territory"],
      derivedFieldsStatus: "partially_resolved"
    },
    sustainability: {
      goals: "Test preview parity",
      currentChallenges: "Synthetic",
      interestedImprovements: ["lighting", "hvac", "controls"],
      timeline: "0-6 months"
    },
    uploadedUtilityFiles: california.uploadedUtilityFiles || [],
    utilityExtractedValues: california.utilityExtractedValues || [],
    siteEnergyProfile: california.siteEnergyProfile,
    energyDataUploadSession: { tokenHash: "local-upload-token", issuedAt: now, expiresAt: "2027-01-01T00:00:00.000Z" },
    createdAt: now,
    updatedAt: now
  };

  for (const user of users) {
    await db.send(new PutCommand({ TableName: localModeEnv.GBS_USERS_TABLE, Item: user }));
  }
  await db.send(new PutCommand({ TableName: localModeEnv.GBS_INTAKE_TABLE, Item: clientIntake }));
  await db.send(new PutCommand({ TableName: localModeEnv.GBS_INTAKE_TABLE, Item: sampleIntake }));
  await ensureBucket(s3, localModeEnv.GBS_ENERGY_DATA_BUCKET);
  await ensureBucket(s3, localModeEnv.GBS_RUNTIME_CACHE_BUCKET);
  await ensureBucket(s3, localModeEnv.GBS_DEV_WORK_BUCKET);
  await s3.send(new PutObjectCommand({
    Bucket: localModeEnv.GBS_ENERGY_DATA_BUCKET,
    Key: "seed/example-utility.xml",
    Body: "<utility>local-seed</utility>",
    ContentType: "application/xml"
  }));
}

async function seedRetrofitRecommendationCache(db, s3) {
  const sampleUsers = JSON.parse(await fs.readFile(path.join(repoRoot, "data", "sample_user_profiles.json"), "utf8"));
  const testCases = JSON.parse(await fs.readFile(path.join(repoRoot, "public", "sample_matching_test_cases.json"), "utf8"));
  const sampleUser = sampleUsers.find((item) => item.sampleUserId === "california-endowment-hq");
  const testCase = (testCases.testCases || []).find((item) => item.sampleUserId === "california-endowment-hq");
  if (!sampleUser || !testCase) {
    return;
  }

  const now = new Date("2026-07-10T00:00:00.000Z");
  const intake = {
    userId: sampleUser.sampleUserId,
    submissionId: "intake_sample_california-endowment-hq",
    contact: {
      fullName: sampleUser.fullName,
      email: sampleUser.email,
      phone: sampleUser.phone
    },
    business: {
      companyName: sampleUser.companyName,
      organizationType: "nonprofit",
      organizationSize: sampleUser.organizationSize,
      industry: sampleUser.primaryActivityText,
      headquarters: sampleUser.siteAddress
    },
    site: {
      address: sampleUser.siteAddress,
      electricUtilityProvider: sampleUser.electricUtilityProvider,
      gasUtilityProvider: sampleUser.gasUtilityProvider,
      ownershipStatus: "Own",
      buildingType: sampleUser.buildingType,
      squareFootage: sampleUser.squareFootage,
      derivedFieldsPlanned: ["State", "County", "City", "ZIP", "Utility territory"],
      derivedFieldsStatus: "partially_resolved"
    },
    sustainability: {
      goals: "Test preview parity",
      currentChallenges: "Synthetic",
      interestedImprovements: ["lighting", "hvac", "controls"],
      timeline: "0-6 months"
    },
    uploadedUtilityFiles: sampleUser.uploadedUtilityFiles || [],
    utilityExtractedValues: sampleUser.utilityExtractedValues || [],
    siteEnergyProfile: sampleUser.siteEnergyProfile,
    energyDataUploadSession: { tokenHash: hashPublicUploadToken("local-upload-token"), issuedAt: now.toISOString(), expiresAt: "2027-01-01T00:00:00.000Z" },
    createdAt: now.toISOString(),
    updatedAt: now.toISOString()
  };
  const user = {
    userId: "sample_california-endowment-hq",
    role: "client",
    status: "active",
    fullName: sampleUser.fullName,
    email: sampleUser.email,
    companyName: sampleUser.companyName,
    authProvider: "password",
    googleLinked: false,
    isFakeUser: true,
    sampleUserId: "california-endowment-hq",
    passwordUsername: sampleUser.email,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString()
  };
  const payload = buildFixtureRetrofitRecommendationsPayload({ formQuestionCatalog: null, intake, now, testCase, user });
  const previousLocalStackFlag = process.env.GBS_LOCAL_STACK;
  process.env.GBS_LOCAL_STACK = "1";
  try {
    await writePersistentRetrofitRecommendations({
      bucket: localModeEnv.GBS_RUNTIME_CACHE_BUCKET,
      db,
      intake,
      payload,
      s3,
      table: localModeEnv.GBS_RETROFIT_RECOMMENDATION_CACHE_TABLE,
      user
    });
  } finally {
    if (previousLocalStackFlag === undefined) {
      delete process.env.GBS_LOCAL_STACK;
    } else {
      process.env.GBS_LOCAL_STACK = previousLocalStackFlag;
    }
  }
  console.log("[local-stack] seeded fixture retrofit cache for california-endowment-hq");
}

function normalizeOpportunitySeed(opportunity) {
  const now = "2026-07-10T00:00:00.000Z";
  return {
    ...opportunity,
    sourceKey: opportunity.sourceKey || opportunity.sourceName || "SOURCE_DSIRE",
    sourceName: opportunity.sourceName || "DSIRE",
    status: opportunity.status || "active",
    reviewStatus: opportunity.reviewStatus || "approved",
    lifecycleStatus: opportunity.lifecycleStatus || "active",
    canonicalTitle: opportunity.canonicalTitle || opportunity.opportunityName,
    normalizedTitle: opportunity.normalizedTitle || String(opportunity.opportunityName || "").toLowerCase(),
    summary: opportunity.summary || opportunity.opportunityName,
    category: opportunity.category || "Commercial",
    stateName: opportunity.stateName || "California",
    sourceCreatedAt: opportunity.sourceCreatedAt || now,
    lastUpdated: opportunity.lastUpdated || now
  };
}

async function seedOpportunities(db) {
  const opportunities = JSON.parse(await fs.readFile(path.join(repoRoot, "public", "retrofit_opportunity_index.json"), "utf8"));
  const selectedOpportunityIds = [
    "SOURCE_DSIRE:dsire_program_id:5738",
    "SOURCE_DSIRE:dsire_program_id:3831",
    "SOURCE_DSIRE:dsire_program_id:5170",
    "SOURCE_DSIRE:dsire_program_id:4342",
    "SOURCE_DSIRE:dsire_program_id:3659",
    "SOURCE_DSIRE:dsire_program_id:4835"
  ];
  const parentRetrofitsByOpportunityId = new Map();
  for (const retrofit of opportunities.retrofits) {
    for (const opportunity of retrofit.opportunities || []) {
      if (!selectedOpportunityIds.includes(opportunity.opportunityId)) {
        continue;
      }

      const existing = parentRetrofitsByOpportunityId.get(opportunity.opportunityId) || [];
      existing.push({
        retrofitTypeId: retrofit.retrofitTypeId,
        displayName: retrofit.displayName,
        parentCategory: retrofit.parentCategory,
        isPhysicalRetrofit: retrofit.isPhysicalRetrofit
      });
      parentRetrofitsByOpportunityId.set(opportunity.opportunityId, existing);
    }
  }

  const selectedRecords = [];
  for (const opportunityId of selectedOpportunityIds) {
    const parentRetrofits = parentRetrofitsByOpportunityId.get(opportunityId) || [];
    const baseOpportunity = opportunities.retrofits.flatMap((retrofit) => retrofit.opportunities || []).find((item) => item.opportunityId === opportunityId);
    if (!baseOpportunity) {
      continue;
    }

    const primaryRetrofit = parentRetrofits[0] || {};
    selectedRecords.push(
      normalizeOpportunitySeed({
        ...baseOpportunity,
        retrofitTypeId: primaryRetrofit.retrofitTypeId || baseOpportunity.retrofitTypeId || null,
        displayName: primaryRetrofit.displayName || baseOpportunity.displayName || null,
        parentCategory: primaryRetrofit.parentCategory || baseOpportunity.parentCategory || null,
        isPhysicalRetrofit: primaryRetrofit.isPhysicalRetrofit ?? baseOpportunity.isPhysicalRetrofit ?? null,
        retrofitTypes: parentRetrofits
      })
    );
  }

  for (const record of selectedRecords) {
    console.log(`[local-stack] seeding opportunity ${record.opportunityId}`);
    await db.send(
      new PutCommand({
        TableName: localModeEnv.GBS_OPPORTUNITIES_TABLE,
        Item: record
      })
    );
  }
}

async function seedStack() {
  await ensureDocker();
  console.log("[local-stack] starting containers");
  await compose(["up", "-d"]);
  console.log("[local-stack] waiting for services");
  await waitForInfra();
  const clients = await localClients();
  try {
    for (const table of tables) {
      await ensureTable(clients.ddb, table);
    }
    await seedOpportunities(clients.db);
    console.log("[local-stack] seeding users and intakes");
    await seedUsersAndIntakes(clients.db, clients.s3);
    await seedRetrofitRecommendationCache(clients.db, clients.s3);
  } finally {
    await closeClients(clients);
  }
  console.log("Local stack seeded.");
}

async function downStack() {
  console.log("[local-stack] stopping containers");
  await compose(["down", "-v"]);
}

async function resetStack() {
  await downStack();
  await fs.rm(localDataRoot, { recursive: true, force: true });
  await seedStack();
}

async function main() {
  const command = process.argv[2] || "up";
  if (command === "up") {
    await seedStack();
    return;
  }
  if (command === "down") {
    await downStack();
    return;
  }
  if (command === "reset") {
    await resetStack();
    return;
  }
  throw new Error(`Unknown local stack command: ${command}`);
}

main().catch((error) => {
  console.error(error.message || error);
  process.exitCode = 1;
});
