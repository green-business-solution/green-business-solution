import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { CopyObjectCommand, DeleteObjectsCommand, ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3";
import { BatchWriteCommand, DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { fromIni } from "@aws-sdk/credential-providers";

const accountId = process.env.GBS_ACCOUNT_ID || "448016109714";
const deployRegion = process.env.AWS_DEPLOY_REGION || process.env.AWS_REGION || "us-east-1";
const dataRegion = process.env.GBS_AWS_REGION || "us-east-2";

const defaults = {
  apiRuntimeStateTable: process.env.GBS_API_RUNTIME_STATE_TABLE || "gbs-api-runtime-state",
  applicationProfilesTable: process.env.GBS_APPLICATION_PROFILES_TABLE || "gbs-application-profiles",
  dashboardPerformanceTable: process.env.GBS_DASHBOARD_PERFORMANCE_TABLE || "gbs-dashboard-performance",
  dataRegion,
  deleteSourceS3Prefixes: false,
  deployRegion,
  dryRun: true,
  legacyGeneratedFixtureBucket:
    process.env.GBS_LEGACY_GENERATED_FIXTURE_BUCKET || "gbs-retrofi-dev-work-448016109714-us-east-1",
  legacyGeneratedFixturePrefix: cleanPrefix(process.env.GBS_LEGACY_GENERATED_FIXTURE_PREFIX || "generated-test-fixtures"),
  legacyRuntimeCacheBucket:
    process.env.GBS_LEGACY_RUNTIME_CACHE_BUCKET ||
    process.env.GBS_ENERGY_DATA_BUCKET ||
    `gbs-retrofi-org-energy-data-${accountId}`,
  legacyRuntimeCachePrefix: cleanPrefix(process.env.GBS_LEGACY_RUNTIME_CACHE_PREFIX || "runtime-cache"),
  legacyRuntimeStateTable: process.env.GBS_LEGACY_RUNTIME_STATE_TABLE || process.env.GBS_RUNTIME_STATE_TABLE || "gbs-runtime-state",
  profile: process.env.AWS_PROFILE || "gbs",
  retrofitRecommendationCacheTable:
    process.env.GBS_RETROFIT_RECOMMENDATION_CACHE_TABLE || "gbs-retrofit-recommendation-cache",
  runtimeCacheBucket: process.env.GBS_RUNTIME_CACHE_BUCKET || `gbs-retrofi-org-runtime-cache-${accountId}`,
  testFixturesBucket:
    process.env.GBS_GENERATED_FIXTURE_BUCKET ||
    process.env.GBS_TEST_FIXTURES_BUCKET ||
    `gbs-retrofi-test-fixtures-${accountId}-${deployRegion}`
};

function parseArgs(argv) {
  const options = { ...defaults };
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
    if (arg === "--delete-source-s3-prefixes") {
      options.deleteSourceS3Prefixes = true;
      continue;
    }
    if (arg === "--profile" && next) {
      options.profile = next;
      index += 1;
      continue;
    }
    if (arg === "--data-region" && next) {
      options.dataRegion = next;
      index += 1;
      continue;
    }
    if (arg === "--deploy-region" && next) {
      options.deployRegion = next;
      index += 1;
      continue;
    }
    if (arg === "--help" || arg === "-h") {
      options.help = true;
      continue;
    }
    throw new Error(`Unknown argument: ${arg}`);
  }
  return options;
}

function printHelp() {
  console.log(`Migrate legacy runtime-state and generated S3 resources into modular resources.

Usage:
  node scripts/migrate-runtime-state-resources.mjs [--write] [--delete-source-s3-prefixes]

Defaults:
  legacy runtime table: ${defaults.legacyRuntimeStateTable}
  dashboard table: ${defaults.dashboardPerformanceTable}
  recommendation cache table: ${defaults.retrofitRecommendationCacheTable}
  application profiles table: ${defaults.applicationProfilesTable}
  API runtime table: ${defaults.apiRuntimeStateTable}
  legacy runtime-cache bucket: ${defaults.legacyRuntimeCacheBucket}/${defaults.legacyRuntimeCachePrefix}/
  runtime-cache bucket: ${defaults.runtimeCacheBucket}/${defaults.legacyRuntimeCachePrefix}/
  legacy fixture bucket: ${defaults.legacyGeneratedFixtureBucket}/${defaults.legacyGeneratedFixturePrefix}/
  test fixture bucket: ${defaults.testFixturesBucket}/${defaults.legacyGeneratedFixturePrefix}/
`);
}

function credentials(options) {
  return options.profile ? fromIni({ profile: options.profile }) : undefined;
}

function destinationTableForItem(item, options) {
  const scope = String(item?.stateScope || "");
  if (scope.startsWith("DASHBOARD_PERFORMANCE#TEST_CASE#")) return options.dashboardPerformanceTable;
  if (scope === "retrofitRecommendations") return options.retrofitRecommendationCacheTable;
  if (scope === "applicationProfile") return options.applicationProfilesTable;
  return options.apiRuntimeStateTable;
}

async function scanAll(db, tableName) {
  const items = [];
  let ExclusiveStartKey;
  do {
    const result = await db.send(new ScanCommand({ TableName: tableName, ExclusiveStartKey }));
    items.push(...(result.Items || []));
    ExclusiveStartKey = result.LastEvaluatedKey;
  } while (ExclusiveStartKey);
  return items;
}

async function migrateDynamoDb(options, db) {
  console.log(`Scanning ${options.legacyRuntimeStateTable} in ${options.dataRegion}...`);
  const items = await scanAll(db, options.legacyRuntimeStateTable);
  const byTable = new Map();
  for (const item of items) {
    const tableName = destinationTableForItem(item, options);
    if (!byTable.has(tableName)) byTable.set(tableName, []);
    byTable.get(tableName).push(item);
  }

  for (const [tableName, tableItems] of byTable) {
    console.log(`${options.dryRun ? "Would copy" : "Copying"} ${tableItems.length} item(s) to ${tableName}`);
    if (options.dryRun) continue;
    for (const chunk of chunks(tableItems, 25)) {
      await batchWriteWithRetries(db, {
        [tableName]: chunk.map((Item) => ({ PutRequest: { Item } }))
      });
    }
  }

  return {
    total: items.length,
    byTable: Object.fromEntries([...byTable.entries()].map(([table, tableItems]) => [table, tableItems.length]))
  };
}

async function listPrefixObjects(s3, bucket, prefix) {
  const objects = [];
  let ContinuationToken;
  do {
    const result = await s3.send(
      new ListObjectsV2Command({
        Bucket: bucket,
        Prefix: prefix.endsWith("/") ? prefix : `${prefix}/`,
        ContinuationToken
      })
    );
    objects.push(...(result.Contents || []).filter((object) => object.Key && !object.Key.endsWith("/")));
    ContinuationToken = result.NextContinuationToken;
  } while (ContinuationToken);
  return objects;
}

async function copyS3Prefix(options, s3, { sourceBucket, sourcePrefix, destinationBucket, destinationPrefix }) {
  const sourceObjects = await listPrefixObjects(s3, sourceBucket, sourcePrefix);
  console.log(
    `${options.dryRun ? "Would copy" : "Copying"} ${sourceObjects.length} object(s) from s3://${sourceBucket}/${sourcePrefix}/ to s3://${destinationBucket}/${destinationPrefix}/`
  );
  if (!options.dryRun) {
    for (const object of sourceObjects) {
      const destinationKey = object.Key.replace(`${sourcePrefix}/`, `${destinationPrefix}/`);
      await s3.send(
        new CopyObjectCommand({
          Bucket: destinationBucket,
          Key: destinationKey,
          CopySource: encodeCopySource(sourceBucket, object.Key),
          ServerSideEncryption: "AES256"
        })
      );
    }
  }

  if (options.deleteSourceS3Prefixes) {
    if (options.dryRun) {
      console.log(`Would delete ${sourceObjects.length} source object(s) from s3://${sourceBucket}/${sourcePrefix}/`);
    } else {
      for (const chunk of chunks(sourceObjects, 1000)) {
        await s3.send(
          new DeleteObjectsCommand({
            Bucket: sourceBucket,
            Delete: {
              Objects: chunk.map((object) => ({ Key: object.Key }))
            }
          })
        );
      }
      console.log(`Deleted ${sourceObjects.length} source object(s) from s3://${sourceBucket}/${sourcePrefix}/`);
    }
  }

  return sourceObjects.length;
}

async function migrateS3(options, s3) {
  const runtimeCacheObjectCount = await copyS3Prefix(options, s3, {
    sourceBucket: options.legacyRuntimeCacheBucket,
    sourcePrefix: options.legacyRuntimeCachePrefix,
    destinationBucket: options.runtimeCacheBucket,
    destinationPrefix: options.legacyRuntimeCachePrefix
  });
  const generatedFixtureObjectCount = await copyS3Prefix(options, s3, {
    sourceBucket: options.legacyGeneratedFixtureBucket,
    sourcePrefix: options.legacyGeneratedFixturePrefix,
    destinationBucket: options.testFixturesBucket,
    destinationPrefix: options.legacyGeneratedFixturePrefix
  });
  return { runtimeCacheObjectCount, generatedFixtureObjectCount };
}

async function batchWriteWithRetries(db, requestItems) {
  let pending = requestItems;
  for (let attempt = 0; attempt < 8; attempt += 1) {
    const result = await db.send(new BatchWriteCommand({ RequestItems: pending }));
    pending = result.UnprocessedItems || {};
    if (!Object.values(pending).some((items) => items?.length)) {
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 2 ** attempt * 100));
  }
  const remaining = Object.values(pending).reduce((sum, items) => sum + (items?.length || 0), 0);
  throw new Error(`DynamoDB batch write left ${remaining} unprocessed item(s) after retries.`);
}

function encodeCopySource(bucket, key) {
  return `${bucket}/${key.split("/").map(encodeURIComponent).join("/")}`;
}

function cleanPrefix(value) {
  return String(value || "").replace(/^\/+|\/+$/g, "");
}

function chunks(items, size) {
  const result = [];
  for (let index = 0; index < items.length; index += size) {
    result.push(items.slice(index, index + size));
  }
  return result;
}

try {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    printHelp();
    process.exit(0);
  }

  const sharedCredentials = credentials(options);
  const db = DynamoDBDocumentClient.from(
    new DynamoDBClient({
      region: options.dataRegion,
      credentials: sharedCredentials
    })
  );
  const s3 = new S3Client({
    region: options.deployRegion,
    credentials: sharedCredentials
  });

  const dynamoDb = await migrateDynamoDb(options, db);
  const s3Result = await migrateS3(options, s3);
  console.log(JSON.stringify({ dryRun: options.dryRun, dynamoDb, s3: s3Result }, null, 2));
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
