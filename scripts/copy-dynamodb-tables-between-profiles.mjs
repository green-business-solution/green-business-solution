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

const source = createClients(sourceProfile, region);
const target = createClients(targetProfile, region);

console.log(`Source profile: ${sourceProfile}`);
console.log(`Target profile: ${targetProfile}`);
console.log(`Region: ${region}`);
console.log(`Mode: ${write ? "write" : "dry-run"}`);

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
      sourceItems: sourceSummary.Table.ItemCount,
      targetItemsBefore: targetSummary.Table.ItemCount,
      sourceStatus: sourceSummary.Table.TableStatus,
      targetStatus: targetSummary.Table.TableStatus
    })
  );

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
  node scripts/copy-dynamodb-tables-between-profiles.mjs [--write] [--source-profile gbs] [--target-profile retrofi-prod] [--region us-east-2] [--table TABLE]...

Default mode is a dry-run that verifies both profiles can describe the default production DynamoDB tables.
Use --write to scan each source table and upsert all items into the matching target table.
`);
}
