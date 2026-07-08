import { createHash } from "node:crypto";
import { DynamoDBClient, DescribeTableCommand } from "@aws-sdk/client-dynamodb";
import {
  BatchWriteCommand,
  DynamoDBDocumentClient,
  ScanCommand
} from "@aws-sdk/lib-dynamodb";
import { fromIni } from "@aws-sdk/credential-providers";

const defaultTables = [
  "gbs-users",
  "gbs-client-intake",
  "gbs-opportunity-candidates",
  "gbs-dashboard-performance",
  "gbs-retrofit-recommendation-cache",
  "gbs-application-profiles",
  "gbs-api-runtime-state"
];

const options = parseArgs(process.argv.slice(2));

if (options.help) {
  usage();
  process.exit(0);
}

const sourceProfile = options.sourceProfile || "gbs";
const targetProfile = options.targetProfile || "retrofi-prod";
const region = options.region || "us-east-2";
const tables = options.tables.length ? options.tables : defaultTables;
const write = Boolean(options.write);
const verify = Boolean(options.verify);

const source = createClients(sourceProfile, region);
const target = createClients(targetProfile, region);

console.log(`Source profile: ${sourceProfile}`);
console.log(`Target profile: ${targetProfile}`);
console.log(`Region: ${region}`);
console.log(`Mode: ${verify ? "verify" : write ? "write" : "dry-run"}`);

for (const tableName of tables) {
  await migrateTable(tableName);
}

async function migrateTable(tableName) {
  const [sourceSummary, targetSummary] = await Promise.all([
    describeTable(source.raw, tableName),
    describeTable(target.raw, tableName)
  ]);

  console.log(
    JSON.stringify({
      table: tableName,
      sourceApproximateItems: sourceSummary.Table.ItemCount,
      targetApproximateItemsBefore: targetSummary.Table.ItemCount,
      sourceStatus: sourceSummary.Table.TableStatus,
      targetStatus: targetSummary.Table.TableStatus
    })
  );

  if (verify) {
    await verifyTable(tableName, sourceSummary.Table.KeySchema || []);
    return;
  }

  if (!write) return;

  let copied = 0;
  let lastEvaluatedKey;
  do {
    const page = await source.doc.send(
      new ScanCommand({
        TableName: tableName,
        ExclusiveStartKey: lastEvaluatedKey
      })
    );

    for (const chunk of chunks(page.Items || [], 25)) {
      await batchWriteWithRetries(target.doc, tableName, chunk);
      copied += chunk.length;
    }

    lastEvaluatedKey = page.LastEvaluatedKey;
    console.log(JSON.stringify({ table: tableName, copied }));
  } while (lastEvaluatedKey);
}

async function verifyTable(tableName, keySchema) {
  const keyAttributes = keySchema
    .slice()
    .sort((left, right) => keyTypeOrder(left.KeyType) - keyTypeOrder(right.KeyType))
    .map((entry) => entry.AttributeName);
  const [sourceIndex, targetIndex] = await Promise.all([
    scanTableIndex(source.doc, tableName, keyAttributes),
    scanTableIndex(target.doc, tableName, keyAttributes)
  ]);

  let missing = 0;
  let extra = 0;
  let itemDiffs = 0;

  for (const [key, sourceDigest] of sourceIndex.items.entries()) {
    const targetDigest = targetIndex.items.get(key);
    if (!targetDigest) {
      missing += 1;
    } else if (targetDigest !== sourceDigest) {
      itemDiffs += 1;
    }
  }

  for (const key of targetIndex.items.keys()) {
    if (!sourceIndex.items.has(key)) {
      extra += 1;
    }
  }

  const result = {
    table: tableName,
    key: keyAttributes.join(","),
    sourceExactItems: sourceIndex.items.size,
    targetExactItems: targetIndex.items.size,
    missing,
    extra,
    itemDiffs,
    sourceHash: sourceIndex.aggregateHash,
    targetHash: targetIndex.aggregateHash
  };

  console.log(JSON.stringify(result));

  if (missing || extra || itemDiffs || sourceIndex.aggregateHash !== targetIndex.aggregateHash) {
    throw new Error(`Verification failed for ${tableName}`);
  }
}

async function scanTableIndex(client, tableName, keyAttributes) {
  const items = new Map();
  const hashes = [];
  let lastEvaluatedKey;

  do {
    const page = await client.send(
      new ScanCommand({
        TableName: tableName,
        ExclusiveStartKey: lastEvaluatedKey
      })
    );

    for (const item of page.Items || []) {
      const key = canonicalStringify(Object.fromEntries(keyAttributes.map((attribute) => [attribute, item[attribute]])));
      const digest = sha256(canonicalStringify(item));
      items.set(key, digest);
      hashes.push(`${key}:${digest}`);
    }

    lastEvaluatedKey = page.LastEvaluatedKey;
  } while (lastEvaluatedKey);

  hashes.sort();
  return {
    items,
    aggregateHash: sha256(hashes.join("\n"))
  };
}

function createClients(profile, regionName) {
  const credentials = fromIni({ profile });
  const raw = new DynamoDBClient({ credentials, region: regionName });
  const doc = DynamoDBDocumentClient.from(raw, {
    marshallOptions: {
      removeUndefinedValues: true
    }
  });
  return { raw, doc };
}

async function describeTable(client, tableName) {
  return client.send(new DescribeTableCommand({ TableName: tableName }));
}

async function batchWriteWithRetries(client, tableName, items) {
  let requestItems = {
    [tableName]: items.map((item) => ({
      PutRequest: { Item: item }
    }))
  };

  for (let attempt = 0; attempt < 8; attempt += 1) {
    const result = await client.send(new BatchWriteCommand({ RequestItems: requestItems }));
    requestItems = result.UnprocessedItems || {};
    const remaining = requestItems[tableName] || [];
    if (!remaining.length) return;
    await sleep(2 ** attempt * 100);
  }

  const remaining = requestItems[tableName] || [];
  throw new Error(`Failed to write ${remaining.length} unprocessed item(s) to ${tableName}`);
}

function chunks(items, size) {
  const result = [];
  for (let index = 0; index < items.length; index += size) {
    result.push(items.slice(index, index + size));
  }
  return result;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function keyTypeOrder(keyType) {
  if (keyType === "HASH") return 0;
  if (keyType === "RANGE") return 1;
  return 2;
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function canonicalStringify(value) {
  if (value instanceof Set) {
    return `[${[...value].map(canonicalStringify).sort().join(",")}]`;
  }

  if (Array.isArray(value)) {
    return `[${value.map(canonicalStringify).join(",")}]`;
  }

  if (value && typeof value === "object") {
    return `{${Object.keys(value)
      .filter((key) => value[key] !== undefined)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${canonicalStringify(value[key])}`)
      .join(",")}}`;
  }

  return JSON.stringify(value);
}

function parseArgs(args) {
  const parsed = {
    tables: []
  };

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    const next = args[index + 1];

    if (arg === "--help" || arg === "-h") {
      parsed.help = true;
      continue;
    }
    if (arg === "--write") {
      parsed.write = true;
      continue;
    }
    if (arg === "--verify") {
      parsed.verify = true;
      continue;
    }
    if (arg === "--source-profile" && next) {
      parsed.sourceProfile = next;
      index += 1;
      continue;
    }
    if (arg === "--target-profile" && next) {
      parsed.targetProfile = next;
      index += 1;
      continue;
    }
    if (arg === "--region" && next) {
      parsed.region = next;
      index += 1;
      continue;
    }
    if (arg === "--table" && next) {
      parsed.tables.push(next);
      index += 1;
      continue;
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  return parsed;
}

function usage() {
  console.log(`Usage:
  node scripts/copy-dynamodb-tables-between-profiles.mjs [--write|--verify] [--source-profile gbs] [--target-profile retrofi-prod] [--region us-east-2] [--table TABLE]...

Default mode is a dry-run that verifies both profiles can describe the default production DynamoDB tables.
Dry-run table item counts are approximate AWS metadata and can lag behind exact scans.
Use --write to scan each source table and upsert all items into the matching target table.
Use --verify to exact-scan source and target tables, compare primary-key sets, and compare canonical item hashes.
`);
}
