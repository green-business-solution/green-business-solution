import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { fromIni } from "@aws-sdk/credential-providers";
import {
  FORM_QUESTION_CATALOG_S3_KEY,
  FORM_QUESTION_CATALOG_STATE_SCOPE,
  FORM_QUESTION_CATALOG_STATE_KEY
} from "../apps/api/server/forms/formQuestionCatalog.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const defaults = {
  catalogPath: process.env.GBS_FORM_QUESTION_CATALOG_PATH || path.join(repoRoot, "data", "form_question_catalog.json"),
  dataRegion: process.env.GBS_AWS_REGION || "us-east-2",
  dryRun: false,
  profile: process.env.AWS_PROFILE ?? (process.env.CI ? "" : "gbs"),
  runtimeCacheBucket: process.env.GBS_RUNTIME_CACHE_BUCKET || "gbs-retrofi-org-runtime-cache-448016109714",
  runtimeCacheRegion: process.env.AWS_DEPLOY_REGION || process.env.AWS_REGION || "us-east-1",
  runtimeStateTable: process.env.GBS_API_RUNTIME_STATE_TABLE || "gbs-api-runtime-state"
};

function parseArgs(argv) {
  const options = { ...defaults };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const next = argv[index + 1];
    if (arg === "--dry-run") {
      options.dryRun = true;
      continue;
    }
    if (arg === "--catalog" && next) {
      options.catalogPath = path.resolve(next);
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
  return options;
}

function usage() {
  console.log(`Usage:
  node scripts/deploy-form-question-catalog.mjs [--dry-run] [--catalog data/form_question_catalog.json]

Environment:
  AWS_PROFILE=${defaults.profile}
  AWS_DEPLOY_REGION=${defaults.runtimeCacheRegion}
  GBS_AWS_REGION=${defaults.dataRegion}
  GBS_RUNTIME_CACHE_BUCKET=${defaults.runtimeCacheBucket}
  GBS_API_RUNTIME_STATE_TABLE=${defaults.runtimeStateTable}
`);
}

function credentials(options) {
  return options.profile ? fromIni({ profile: options.profile }) : undefined;
}

function catalogMetadata(catalogText, catalog) {
  return {
    schemaVersion: catalog.schemaVersion || null,
    catalogId: catalog.catalogId || null,
    catalogVersion: catalog.version || null,
    sha256: crypto.createHash("sha256").update(catalogText).digest("hex"),
    sizeBytes: Buffer.byteLength(catalogText)
  };
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    usage();
    return;
  }

  const catalogText = fs.readFileSync(options.catalogPath, "utf8");
  const catalog = JSON.parse(catalogText);
  const metadata = catalogMetadata(catalogText, catalog);
  const updatedAt = new Date().toISOString();

  console.log(`${options.dryRun ? "Would deploy" : "Deploying"} form question catalog ${metadata.catalogVersion || metadata.sha256}`);
  console.log(`S3: s3://${options.runtimeCacheBucket}/${FORM_QUESTION_CATALOG_S3_KEY}`);
  console.log(`DynamoDB: ${options.runtimeStateTable}/${FORM_QUESTION_CATALOG_STATE_SCOPE}:${FORM_QUESTION_CATALOG_STATE_KEY}`);

  if (options.dryRun) {
    console.log(JSON.stringify({ ...metadata, updatedAt }, null, 2));
    return;
  }

  const s3 = new S3Client({
    region: options.runtimeCacheRegion,
    credentials: credentials(options)
  });
  const db = DynamoDBDocumentClient.from(
    new DynamoDBClient({
      region: options.dataRegion,
      credentials: credentials(options)
    })
  );

  await s3.send(
    new PutObjectCommand({
      Bucket: options.runtimeCacheBucket,
      Key: FORM_QUESTION_CATALOG_S3_KEY,
      Body: catalogText,
      ContentType: "application/json",
      ServerSideEncryption: "AES256"
    })
  );

  await db.send(
    new PutCommand({
      TableName: options.runtimeStateTable,
      Item: {
        stateScope: FORM_QUESTION_CATALOG_STATE_SCOPE,
        stateKey: FORM_QUESTION_CATALOG_STATE_KEY,
        catalog,
        s3Bucket: options.runtimeCacheBucket,
        s3Key: FORM_QUESTION_CATALOG_S3_KEY,
        updatedAt,
        ...metadata
      }
    })
  );

  console.log(`Deployed form question catalog (${metadata.sha256}).`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
