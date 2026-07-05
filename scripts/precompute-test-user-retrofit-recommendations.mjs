import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { S3Client } from "@aws-sdk/client-s3";
import { fromIni } from "@aws-sdk/credential-providers";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  buildSiteEnergyProfile,
  supportedUtilityCategories,
  supportedUtilityFileTypes
} from "../server/energyData/parseEnergyData.mjs";
import { buildPortalRetrofitRecommendations } from "../server/retrofitRecommendations.mjs";
import {
  readPersistentRetrofitRecommendations,
  writePersistentRetrofitRecommendations
} from "../server/retrofitRecommendationsCache.mjs";
import { buildFixtureRetrofitRecommendationsPayload } from "../server/fixtureRetrofitRecommendations.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const defaultProfile = process.env.AWS_PROFILE || "gbs";
const defaultDataRegion = process.env.GBS_AWS_REGION || process.env.AWS_REGION || "us-east-2";
const defaultS3Region = process.env.GBS_ENERGY_DATA_BUCKET_REGION || process.env.AWS_REGION || "us-east-1";
const defaultUsersTable = process.env.GBS_USERS_TABLE || "gbs-users";
const defaultIntakeTable = process.env.GBS_INTAKE_TABLE || "gbs-client-intake";
const defaultOpportunitiesTable = process.env.GBS_OPPORTUNITIES_TABLE || "gbs-opportunity-candidates";
const defaultRetrofitRecommendationCacheTable =
  process.env.GBS_RETROFIT_RECOMMENDATION_CACHE_TABLE || process.env.GBS_RUNTIME_STATE_TABLE || "gbs-retrofit-recommendation-cache";
const defaultRuntimeCacheBucket =
  process.env.GBS_RUNTIME_CACHE_BUCKET || process.env.GBS_ENERGY_DATA_BUCKET || "gbs-retrofi-org-runtime-cache-448016109714";
const defaultTestCasesPath = path.join(repoRoot, "public", "sample_matching_test_cases.json");
const payloadSources = new Set(["auto", "fixture", "live"]);

export function parseArgs(argv) {
  const options = {
    dataRegion: defaultDataRegion,
    dryRun: true,
    runtimeCacheBucket: defaultRuntimeCacheBucket,
    force: false,
    intakeTable: defaultIntakeTable,
    limit: 0,
    opportunitiesTable: defaultOpportunitiesTable,
    profile: defaultProfile,
    retrofitRecommendationCacheTable: defaultRetrofitRecommendationCacheTable,
    s3Region: defaultS3Region,
    source: "auto",
    testCasesPath: defaultTestCasesPath,
    userIds: [],
    usersTable: defaultUsersTable,
    progress: true
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
    if (arg === "--force") {
      options.force = true;
      continue;
    }
    if (arg === "--progress") {
      options.progress = true;
      continue;
    }
    if (arg === "--quiet") {
      options.progress = false;
      continue;
    }
    if (arg === "--source" && next) {
      if (!payloadSources.has(next)) {
        throw new Error(`Unknown source: ${next}. Expected one of: ${[...payloadSources].join(", ")}`);
      }
      options.source = next;
      index += 1;
      continue;
    }
    if (arg === "--user-id" && next) {
      options.userIds.push(...splitList(next));
      index += 1;
      continue;
    }
    if (arg === "--limit" && next) {
      options.limit = Math.max(0, Number.parseInt(next, 10) || 0);
      index += 1;
      continue;
    }
    if (arg === "--profile" && next) {
      options.profile = next;
      index += 1;
      continue;
    }
    if (arg === "--region" && next) {
      options.dataRegion = next;
      index += 1;
      continue;
    }
    if (arg === "--s3-region" && next) {
      options.s3Region = next;
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
    if (arg === "--opportunities-table" && next) {
      options.opportunitiesTable = next;
      index += 1;
      continue;
    }
    if (arg === "--runtime-state-table" && next) {
      options.retrofitRecommendationCacheTable = next;
      index += 1;
      continue;
    }
    if (arg === "--retrofit-cache-table" && next) {
      options.retrofitRecommendationCacheTable = next;
      index += 1;
      continue;
    }
    if (arg === "--energy-data-bucket" && next) {
      options.runtimeCacheBucket = next;
      index += 1;
      continue;
    }
    if (arg === "--runtime-cache-bucket" && next) {
      options.runtimeCacheBucket = next;
      index += 1;
      continue;
    }
    if (arg === "--test-cases" && next) {
      options.testCasesPath = path.resolve(repoRoot, next);
      index += 1;
      continue;
    }
    if (arg === "--help" || arg === "-h") {
      options.help = true;
      continue;
    }
    throw new Error(`Unknown argument: ${arg}`);
  }

  options.userIds = unique(options.userIds);
  return options;
}

export async function precomputeTestUserRetrofitRecommendations(options = {}, dependencies = {}) {
  const config = {
    dataRegion: options.dataRegion || defaultDataRegion,
    dryRun: options.dryRun !== false,
    runtimeCacheBucket: options.runtimeCacheBucket || defaultRuntimeCacheBucket,
    force: Boolean(options.force),
    intakeTable: options.intakeTable || defaultIntakeTable,
    limit: Math.max(0, Number.parseInt(options.limit, 10) || 0),
    opportunitiesTable: options.opportunitiesTable || defaultOpportunitiesTable,
    profile: options.profile ?? defaultProfile,
    retrofitRecommendationCacheTable: options.retrofitRecommendationCacheTable || defaultRetrofitRecommendationCacheTable,
    s3Region: options.s3Region || defaultS3Region,
    source: payloadSources.has(options.source) ? options.source : "auto",
    testCasesPath: options.testCasesPath || defaultTestCasesPath,
    userIds: Array.isArray(options.userIds) ? unique(options.userIds) : [],
    usersTable: options.usersTable || defaultUsersTable,
    progress: Boolean(options.progress)
  };

  const credentials = dependencies.credentials || (config.profile ? fromIni({ profile: config.profile }) : undefined);
  const db =
    dependencies.db ||
    DynamoDBDocumentClient.from(
      new DynamoDBClient({
        region: config.dataRegion,
        credentials
      })
    );
  const s3 =
    dependencies.s3 ||
    new S3Client({
      region: config.s3Region,
      credentials
    });

  const users = dependencies.users || (await scanAll(db, config.usersTable));
  const sampleTestCaseById = dependencies.sampleTestCaseById || (await loadSampleTestCaseByIdMap(config.testCasesPath));
  const targetUserIdSet = new Set(config.userIds);
  const scopedFakeUsers = users
    .filter((user) => isActiveUserRecord(user) && user.role === "client" && isFakeUserRecord(user))
    .filter((user) => !targetUserIdSet.size || targetUserIdSet.has(user.userId));
  const skippedTaxOnlyUserCount = scopedFakeUsers.filter((user) => !isPreviewableFakeClientUser(user, sampleTestCaseById)).length;
  let fakeUsers = scopedFakeUsers
    .filter((user) => isPreviewableFakeClientUser(user, sampleTestCaseById))
    .sort((left, right) => String(left.fullName || left.email || left.userId).localeCompare(String(right.fullName || right.email || right.userId)));

  if (config.limit > 0) {
    fakeUsers = fakeUsers.slice(0, config.limit);
  }

  let opportunities = dependencies.opportunities || null;
  async function getOpportunities() {
    if (!opportunities) {
      logProgress(config, `Loading live opportunities from ${config.opportunitiesTable}...`);
      opportunities = await scanAll(db, config.opportunitiesTable);
      logProgress(config, `Loaded ${opportunities.length} live opportunities.`);
    }
    return opportunities;
  }

  const results = [];
  for (const [index, user] of fakeUsers.entries()) {
    const label = user.fullName || user.companyName || user.email || user.userId;
    logProgress(config, `[${index + 1}/${fakeUsers.length}] ${label}`);
    try {
      const intake = normalizeIntakeRecord(
        dependencies.intakesByUserId?.get?.(user.userId) ||
          (await getIntake(db, config.intakeTable, user.userId))
      );
      if (!intake) {
        results.push({ userId: user.userId, label, status: "missing_intake" });
        continue;
      }

      if (!config.force) {
        const existing = await readPersistentRetrofitRecommendations({
          bucket: config.runtimeCacheBucket,
          db,
          intake,
          logger: quietLogger,
          s3,
          table: config.retrofitRecommendationCacheTable,
          user
        });
        if (existing) {
          results.push({
            userId: user.userId,
            label,
            matchedOpportunityCount: existing.summary?.matchedOpportunityCount || 0,
            matchedRetrofitCount: existing.summary?.matchedRetrofitCount || 0,
            status: "already_current"
          });
          continue;
        }
      }

      const fixturePayload = config.source === "live"
        ? null
        : buildFixtureRetrofitRecommendationsPayload({
            user,
            intake,
            testCase: sampleTestCaseById.get(cleanText(user.sampleUserId)),
            now: new Date()
          });
      const payloadSource = fixturePayload ? "fixture" : "live";

      if (!fixturePayload && config.source === "fixture") {
        results.push({ userId: user.userId, label, status: "missing_fixture_payload" });
        continue;
      }

      const payload =
        fixturePayload ||
        buildPortalRetrofitRecommendations({
          user: publicUser(user),
          intake,
          opportunities: await getOpportunities(),
          now: new Date()
        });

      if (config.dryRun) {
        results.push({
          userId: user.userId,
          label,
          matchedOpportunityCount: payload.summary.matchedOpportunityCount,
          matchedRetrofitCount: payload.summary.matchedRetrofitCount,
          source: payloadSource,
          status: "would_write"
        });
        continue;
      }

      const writeResult = await writePersistentRetrofitRecommendations({
        bucket: config.runtimeCacheBucket,
        db,
        intake,
        payload,
        s3,
        table: config.retrofitRecommendationCacheTable,
        user
      });
      results.push({
        userId: user.userId,
        label,
        matchedOpportunityCount: payload.summary.matchedOpportunityCount,
        matchedRetrofitCount: payload.summary.matchedRetrofitCount,
        source: payloadSource,
        s3Key: writeResult?.s3Key || null,
        status: writeResult ? "written" : "write_failed"
      });
    } catch (error) {
      results.push({
        userId: user.userId,
        label,
        error: error instanceof Error ? error.message : String(error),
        status: "error"
      });
    }
  }

  return {
    dryRun: config.dryRun,
    runtimeCacheBucket: config.runtimeCacheBucket,
    generatedAt: new Date().toISOString(),
    liveOpportunityRecordCount: opportunities?.length || 0,
    results,
    summary: summarizeResults(results),
    skippedTaxOnlyUserCount,
    source: config.source,
    targetUserCount: fakeUsers.length
  };
}

async function scanAll(db, TableName) {
  const items = [];
  let ExclusiveStartKey;

  do {
    const input = { TableName };
    if (ExclusiveStartKey) {
      input.ExclusiveStartKey = ExclusiveStartKey;
    }
    const result = await db.send(new ScanCommand(input));
    items.push(...(result.Items || []));
    ExclusiveStartKey = result.LastEvaluatedKey;
  } while (ExclusiveStartKey);

  return items;
}

async function getIntake(db, TableName, userId) {
  const result = await db.send(
    new GetCommand({
      TableName,
      Key: { userId }
    })
  );
  return result.Item || null;
}

function normalizeIntakeRecord(item) {
  if (!item) {
    return null;
  }

  const uploadedUtilityFiles = normalizeUploadedUtilityFiles(item.uploadedUtilityFiles);
  const utilityExtractedValues = normalizeUtilityExtractedValues(item.utilityExtractedValues);
  const siteId = deriveSiteId(item.userId, item);

  return {
    ...item,
    uploadedUtilityFiles,
    utilityExtractedValues,
    siteEnergyProfile:
      item.siteEnergyProfile && Array.isArray(item.siteEnergyProfile.utilitySummaries)
        ? item.siteEnergyProfile
        : buildSiteEnergyProfile({
            siteId,
            uploadedUtilityFiles,
            utilityExtractedValues
          })
  };
}

function normalizeUploadedUtilityFiles(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((item) => item && typeof item === "object")
    .map((item) => ({
      fileId: cleanText(item.fileId),
      clientIntakeId: cleanText(item.clientIntakeId),
      siteId: cleanOptional(item.siteId),
      originalFilename: cleanText(item.originalFilename),
      fileType: supportedUtilityFileTypes.has(cleanText(item.fileType)) ? cleanText(item.fileType) : "unknown",
      utilityCategory: supportedUtilityCategories.has(cleanText(item.utilityCategory)) ? cleanText(item.utilityCategory) : "unknown",
      utilityProvider: cleanOptional(item.utilityProvider),
      s3Key: cleanText(item.s3Key),
      processingStatus: cleanText(item.processingStatus) || "uploaded",
      uploadedAt: cleanText(item.uploadedAt),
      processedAt: cleanOptional(item.processedAt),
      errorMessage: cleanOptional(item.errorMessage)
    }))
    .filter((item) => item.fileId && item.originalFilename && item.s3Key);
}

function normalizeUtilityExtractedValues(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((item) => item && typeof item === "object")
    .map((item) => ({
      extractedValueId: cleanText(item.extractedValueId),
      clientIntakeId: cleanText(item.clientIntakeId),
      fileId: cleanText(item.fileId),
      fieldId: cleanText(item.fieldId),
      fieldDisplayName: cleanOptional(item.fieldDisplayName),
      value: item.value ?? null,
      unit: cleanOptional(item.unit),
      periodStart: cleanOptional(item.periodStart),
      periodEnd: cleanOptional(item.periodEnd),
      confidence: cleanOptional(item.confidence),
      sourceType: supportedUtilityFileTypes.has(cleanText(item.sourceType)) ? cleanText(item.sourceType) : "unknown",
      sourceText: cleanOptional(item.sourceText),
      sourcePath: cleanOptional(item.sourcePath)
    }))
    .filter((item) => item.extractedValueId && item.fileId && item.fieldId);
}

function deriveSiteId(userId, intake) {
  const submissionId = cleanText(intake?.submissionId) || `intake_${userId}`;
  return `${submissionId}:primary_site`;
}

function isActiveUserRecord(user) {
  return user?.status === "active" && ["client", "admin"].includes(user.role);
}

function isFakeUserRecord(user) {
  if (typeof user?.isFakeUser === "boolean") {
    return user.isFakeUser;
  }

  return user?.role !== "admin";
}

async function loadSampleTestCaseByIdMap(testCasesPath) {
  try {
    const raw = await readFile(testCasesPath, "utf8");
    const parsed = JSON.parse(raw);
    const testCases = Array.isArray(parsed) ? parsed : parsed.testCases || [];
    return new Map(testCases.map((testCase) => [cleanText(testCase?.sampleUserId), testCase]).filter(([sampleUserId]) => sampleUserId));
  } catch {
    return new Map();
  }
}

function isPreviewableFakeClientUser(user, sampleTestCaseById) {
  const sampleUserId = cleanText(user?.sampleUserId);
  if (!sampleUserId || !sampleTestCaseById?.has(sampleUserId)) return true;
  return sampleTestCaseHasRetrofitResults(sampleTestCaseById.get(sampleUserId));
}

function sampleTestCaseHasRetrofitResults(testCase) {
  return Array.isArray(testCase?.retrofits) && testCase.retrofits.length > 0;
}

function publicUser(user) {
  if (!user) return null;

  return {
    userId: user.userId,
    role: user.role,
    status: user.status,
    fullName: user.fullName,
    email: user.email,
    companyName: user.companyName || null,
    authProvider: user.authProvider,
    googleLinked: Boolean(user.googleLinked),
    googlePicture: user.googlePicture || null,
    passwordLinked: Boolean(user.passwordLinked),
    isFakeUser: isFakeUserRecord(user),
    createdAt: user.createdAt,
    lastLoginAt: user.lastLoginAt || null
  };
}

function summarizeResults(results) {
  return results.reduce((summary, result) => {
    summary[result.status] = (summary[result.status] || 0) + 1;
    return summary;
  }, {});
}

function splitList(value) {
  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function cleanText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function cleanOptional(value) {
  const text = cleanText(value);
  return text.length > 0 ? text : null;
}

const quietLogger = {
  warn() {}
};

function logProgress(config, message) {
  if (config.progress) {
    console.log(message);
  }
}

function printHelp() {
  console.log(`Precompute and persist full retrofit recommendation payloads for fake/test users.

Usage:
  node scripts/precompute-test-user-retrofit-recommendations.mjs [options]

Options:
  --write                       Write S3/DynamoDB cache entries. Default is dry-run.
  --force                       Recompute even when a current persisted payload already exists.
  --source <auto|fixture|live>  Payload source. Default: auto. Fixture skips live opportunity matching when generated test-case retrofits exist.
  --user-id <id[,id]>           Limit to one or more fake user IDs.
  --limit <n>                   Limit number of fake users processed.
  --progress                    Print per-user progress. Enabled by default for CLI runs.
  --quiet                       Suppress progress output.
  --profile <name>              AWS profile. Default: ${defaultProfile}
  --region <region>             DynamoDB region. Default: ${defaultDataRegion}
  --s3-region <region>          S3 bucket region. Default: ${defaultS3Region}
  --users-table <name>          Users table. Default: ${defaultUsersTable}
  --intake-table <name>         Intake table. Default: ${defaultIntakeTable}
  --opportunities-table <name>  Opportunities table. Default: ${defaultOpportunitiesTable}
  --runtime-state-table <name>  Deprecated alias for --retrofit-cache-table.
  --retrofit-cache-table <name> Recommendation cache metadata table. Default: ${defaultRetrofitRecommendationCacheTable}
  --runtime-cache-bucket <name> Cache payload bucket. Default: ${defaultRuntimeCacheBucket}
  --energy-data-bucket <name>   Deprecated alias for --runtime-cache-bucket.
  --test-cases <path>           Generated test cases used to skip tax-only fixtures. Default: public/sample_matching_test_cases.json
`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  try {
    const options = parseArgs(process.argv.slice(2));
    if (options.help) {
      printHelp();
      process.exit(0);
    }

    const result = await precomputeTestUserRetrofitRecommendations(options);
    console.log(JSON.stringify(result, null, 2));
    const failedCount = (result.summary.error || 0) + (result.summary.write_failed || 0);
    process.exit(failedCount > 0 ? 1 : 0);
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
}
