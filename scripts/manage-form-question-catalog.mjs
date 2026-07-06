import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { DynamoDBDocumentClient, GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { fromIni } from "@aws-sdk/credential-providers";
import {
  FORM_QUESTION_CATALOG_ACTIVE_S3_KEY,
  FORM_QUESTION_CATALOG_LEGACY_S3_KEY,
  formQuestionCatalogStateKey,
  formQuestionCatalogVersionStateKey,
  normalizeFormQuestionCatalog,
  versionedFormQuestionCatalogS3Key
} from "../apps/api/server/forms/formQuestionCatalog.mjs";

const defaults = {
  dataRegion: process.env.GBS_AWS_REGION || "us-east-2",
  dryRun: false,
  profile: process.env.AWS_PROFILE ?? (process.env.CI ? "" : "gbs"),
  retentionDays: Number(process.env.GBS_FORM_CATALOG_VERSION_RETENTION_DAYS || 30),
  runtimeCacheBucket: process.env.GBS_RUNTIME_CACHE_BUCKET || "gbs-retrofi-org-runtime-cache-448016109714",
  runtimeCacheRegion: process.env.AWS_DEPLOY_REGION || process.env.AWS_REGION || "us-east-1",
  runtimeStateTable: process.env.GBS_API_RUNTIME_STATE_TABLE || "gbs-api-runtime-state"
};

function parseArgs(argv) {
  const first = argv[0] || "";
  const options = {
    ...defaults,
    command: first && !first.startsWith("-") ? first : ""
  };
  for (let index = options.command ? 1 : 0; index < argv.length; index += 1) {
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
    if (arg === "--output" && next) {
      options.outputPath = path.resolve(next);
      index += 1;
      continue;
    }
    if (arg === "--version" && next) {
      options.versionId = next;
      index += 1;
      continue;
    }
    if (arg === "--retention-days" && next) {
      options.retentionDays = Number(next);
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
  node scripts/manage-form-question-catalog.mjs export [--output /tmp/catalog.json]
  node scripts/manage-form-question-catalog.mjs publish --catalog /tmp/catalog.json [--retention-days 30] [--dry-run]
  node scripts/manage-form-question-catalog.mjs rollback --version <version-id> [--dry-run]

Notes:
  - This is an explicit data-management workflow. Production deploy does not run it.
  - Publish writes an active S3 object, a versioned S3 object, and DynamoDB active/version metadata.
  - Version metadata uses DynamoDB TTL; versioned S3 objects are expired by bucket lifecycle.
`);
}

function credentials(options) {
  return options.profile ? fromIni({ profile: options.profile }) : undefined;
}

function clients(options) {
  return {
    db: DynamoDBDocumentClient.from(
      new DynamoDBClient({
        region: options.dataRegion,
        credentials: credentials(options)
      })
    ),
    s3: new S3Client({
      region: options.runtimeCacheRegion,
      credentials: credentials(options)
    })
  };
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

function safeVersionPart(value) {
  return String(value || "")
    .trim()
    .replace(/[^a-zA-Z0-9_.:-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "catalog";
}

function versionIdForCatalog(catalog, sha256, now = new Date()) {
  const timestamp = now.toISOString().replace(/[:.]/g, "-");
  return `${timestamp}-${safeVersionPart(catalog.version || catalog.catalogId || sha256.slice(0, 12))}`;
}

function expiresAtForRetention(retentionDays) {
  return Math.floor(Date.now() / 1000) + Math.max(1, Number(retentionDays) || 30) * 24 * 60 * 60;
}

async function getS3Text(s3, bucket, key) {
  const response = await s3.send(new GetObjectCommand({ Bucket: bucket, Key: key }));
  return response.Body?.transformToString("utf-8");
}

async function putS3Text(s3, bucket, key, text) {
  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: text,
      ContentType: "application/json",
      ServerSideEncryption: "AES256"
    })
  );
}

async function readActiveCatalog({ db, options, s3 }) {
  const result = await db.send(
    new GetCommand({
      TableName: options.runtimeStateTable,
      Key: formQuestionCatalogStateKey()
    })
  );
  const item = result.Item || null;
  if (item?.catalog) {
    const catalog = normalizeFormQuestionCatalog(item.catalog);
    const text = `${JSON.stringify(catalog, null, 2)}\n`;
    return { catalog, item, metadata: catalogMetadata(text, catalog), text };
  }

  const keys = [item?.s3Key, item?.activeS3Key, FORM_QUESTION_CATALOG_ACTIVE_S3_KEY, FORM_QUESTION_CATALOG_LEGACY_S3_KEY].filter(Boolean);
  for (const key of [...new Set(keys)]) {
    try {
      const text = await getS3Text(s3, item?.s3Bucket || options.runtimeCacheBucket, key);
      const catalog = normalizeFormQuestionCatalog(JSON.parse(text));
      return { catalog, item, metadata: catalogMetadata(text, catalog), text };
    } catch {
      // Try the next active-key candidate.
    }
  }
  return null;
}

async function writeVersionRecord({ catalog, catalogText, db, expiresAt, options, s3, versionId }) {
  const s3Key = versionedFormQuestionCatalogS3Key(versionId);
  const metadata = catalogMetadata(catalogText, catalog);
  await putS3Text(s3, options.runtimeCacheBucket, s3Key, catalogText);
  await db.send(
    new PutCommand({
      TableName: options.runtimeStateTable,
      Item: {
        ...formQuestionCatalogVersionStateKey(versionId),
        versionId,
        s3Bucket: options.runtimeCacheBucket,
        s3Key,
        expiresAt,
        createdAt: new Date().toISOString(),
        ...metadata
      }
    })
  );
  return { ...metadata, s3Key, versionId };
}

async function publishCatalog(options) {
  if (!options.catalogPath) {
    throw new Error("publish requires --catalog /path/to/form-question-catalog.json");
  }
  const catalogText = fs.readFileSync(options.catalogPath, "utf8");
  const catalog = normalizeFormQuestionCatalog(JSON.parse(catalogText));
  const normalizedText = `${JSON.stringify(catalog, null, 2)}\n`;
  const metadata = catalogMetadata(normalizedText, catalog);
  const versionId = versionIdForCatalog(catalog, metadata.sha256);
  const expiresAt = expiresAtForRetention(options.retentionDays);
  const { db, s3 } = clients(options);
  const current = await readActiveCatalog({ db, options, s3 });

  const previousVersionId =
    current && current.metadata.sha256 !== metadata.sha256
      ? `previous-${versionIdForCatalog(current.catalog, current.metadata.sha256)}`
      : null;

  console.log(`${options.dryRun ? "Would publish" : "Publishing"} form question catalog ${versionId}`);
  console.log(`Active S3: s3://${options.runtimeCacheBucket}/${FORM_QUESTION_CATALOG_ACTIVE_S3_KEY}`);
  console.log(`Version S3: s3://${options.runtimeCacheBucket}/${versionedFormQuestionCatalogS3Key(versionId)}`);
  if (previousVersionId) console.log(`Previous active snapshot: ${previousVersionId}`);

  if (options.dryRun) {
    console.log(JSON.stringify({ ...metadata, expiresAt, previousVersionId, versionId }, null, 2));
    return;
  }

  if (previousVersionId) {
    await writeVersionRecord({
      catalog: current.catalog,
      catalogText: current.text,
      db,
      expiresAt,
      options,
      s3,
      versionId: previousVersionId
    });
  }

  const versionRecord = await writeVersionRecord({
    catalog,
    catalogText: normalizedText,
    db,
    expiresAt,
    options,
    s3,
    versionId
  });
  await putS3Text(s3, options.runtimeCacheBucket, FORM_QUESTION_CATALOG_ACTIVE_S3_KEY, normalizedText);
  await db.send(
    new PutCommand({
      TableName: options.runtimeStateTable,
      Item: {
        ...formQuestionCatalogStateKey(),
        activeVersionId: versionId,
        latestVersionS3Key: versionRecord.s3Key,
        previousVersionId,
        s3Bucket: options.runtimeCacheBucket,
        s3Key: FORM_QUESTION_CATALOG_ACTIVE_S3_KEY,
        updatedAt: new Date().toISOString(),
        ...metadata
      }
    })
  );
  console.log(`Published form question catalog ${versionId}.`);
}

async function exportCatalog(options) {
  const { db, s3 } = clients(options);
  const active = await readActiveCatalog({ db, options, s3 });
  if (!active) throw new Error("No active form question catalog was found in DynamoDB or S3.");
  if (options.outputPath) {
    fs.writeFileSync(options.outputPath, active.text);
    console.log(`Wrote ${options.outputPath}`);
  } else {
    process.stdout.write(active.text);
  }
}

async function rollbackCatalog(options) {
  if (!options.versionId) throw new Error("rollback requires --version <version-id>");
  const { db, s3 } = clients(options);
  const s3Key = versionedFormQuestionCatalogS3Key(options.versionId);
  const catalogText = await getS3Text(s3, options.runtimeCacheBucket, s3Key);
  const catalog = normalizeFormQuestionCatalog(JSON.parse(catalogText));
  const normalizedText = `${JSON.stringify(catalog, null, 2)}\n`;
  const metadata = catalogMetadata(normalizedText, catalog);
  console.log(`${options.dryRun ? "Would roll back" : "Rolling back"} active form question catalog to ${options.versionId}`);
  if (options.dryRun) {
    console.log(JSON.stringify({ ...metadata, activeVersionId: options.versionId, s3Key }, null, 2));
    return;
  }
  await putS3Text(s3, options.runtimeCacheBucket, FORM_QUESTION_CATALOG_ACTIVE_S3_KEY, normalizedText);
  await db.send(
    new PutCommand({
      TableName: options.runtimeStateTable,
      Item: {
        ...formQuestionCatalogStateKey(),
        activeVersionId: options.versionId,
        latestVersionS3Key: s3Key,
        s3Bucket: options.runtimeCacheBucket,
        s3Key: FORM_QUESTION_CATALOG_ACTIVE_S3_KEY,
        updatedAt: new Date().toISOString(),
        rolledBackAt: new Date().toISOString(),
        ...metadata
      }
    })
  );
  console.log(`Rolled back form question catalog to ${options.versionId}.`);
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help || !options.command) {
    usage();
    return;
  }
  if (options.command === "publish") return publishCatalog(options);
  if (options.command === "export") return exportCatalog(options);
  if (options.command === "rollback") return rollbackCatalog(options);
  throw new Error(`Unknown command: ${options.command}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
