import fs from "node:fs";
import path from "node:path";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { GetCommand } from "@aws-sdk/lib-dynamodb";

export const FORM_QUESTION_CATALOG_FILE = "form_question_catalog.json";
export const FORM_QUESTION_CATALOG_S3_KEY = "runtime-config/form-question-catalog.json";
export const FORM_QUESTION_CATALOG_STATE_SCOPE = "formQuestionCatalog";
export const FORM_QUESTION_CATALOG_STATE_KEY = "active";

let bundledCatalogCache = null;
let runtimeCatalogCache = null;

export function formQuestionCatalogStateKey() {
  return {
    stateScope: FORM_QUESTION_CATALOG_STATE_SCOPE,
    stateKey: FORM_QUESTION_CATALOG_STATE_KEY
  };
}

export function readFormQuestionCatalog() {
  if (!bundledCatalogCache) {
    const catalogPath = resolveRepoOrLambdaDataFile(FORM_QUESTION_CATALOG_FILE);
    bundledCatalogCache = normalizeFormQuestionCatalog(JSON.parse(fs.readFileSync(catalogPath, "utf8")));
  }
  return bundledCatalogCache;
}

export async function loadFormQuestionCatalog({
  bucketName,
  cacheTtlMs = 5 * 60 * 1000,
  db,
  logger = console,
  s3,
  tableName
} = {}) {
  const now = Date.now();
  if (runtimeCatalogCache && now - runtimeCatalogCache.loadedAt < cacheTtlMs) {
    return runtimeCatalogCache.catalog;
  }

  const catalog =
    (await readCatalogFromDynamoDb({ db, logger, tableName })) ||
    (await readCatalogFromS3({ bucketName, logger, s3 })) ||
    readFormQuestionCatalog();

  runtimeCatalogCache = {
    catalog,
    loadedAt: now
  };
  return catalog;
}

export function clearFormQuestionCatalogCache() {
  bundledCatalogCache = null;
  runtimeCatalogCache = null;
}

export function normalizeFormQuestionCatalog(catalog = {}) {
  if (catalog?.retrofit?.questions) {
    return catalog;
  }

  if (catalog?.questions) {
    return {
      schemaVersion: "retrofi_form_question_catalog.v1",
      catalogId: "legacy_retrofit_form_question_catalog",
      version: catalog.version || catalog.schemaVersion || "legacy",
      description: catalog.description,
      retrofit: {
        defaultQuestionIds: catalog.defaultQuestionIds || [],
        questions: catalog.questions || {},
        bindings: catalog.bindings || []
      },
      application: defaultApplicationQuestionCatalog()
    };
  }

  return {
    schemaVersion: "retrofi_form_question_catalog.v1",
    catalogId: "empty_form_question_catalog",
    version: "empty",
    retrofit: {
      defaultQuestionIds: [],
      questions: {},
      bindings: []
    },
    application: defaultApplicationQuestionCatalog()
  };
}

export function formQuestionCatalogCacheVersion(catalog = readFormQuestionCatalog()) {
  return [
    catalog.schemaVersion || "unknown_schema",
    catalog.catalogId || "unknown_catalog",
    catalog.version || "unknown_version"
  ].join(":");
}

async function readCatalogFromDynamoDb({ db, logger, tableName } = {}) {
  if (!db || !tableName) return null;
  try {
    const result = await db.send(
      new GetCommand({
        TableName: tableName,
        Key: formQuestionCatalogStateKey()
      })
    );
    const item = result.Item;
    if (!item?.catalog) return null;
    return normalizeFormQuestionCatalog(item.catalog);
  } catch (error) {
    logger?.warn?.("[form-question-catalog] DynamoDB read failed; falling back to S3/bundled catalog:", error);
    return null;
  }
}

async function readCatalogFromS3({ bucketName, logger, s3 } = {}) {
  if (!s3 || !bucketName) return null;
  try {
    const response = await s3.send(
      new GetObjectCommand({
        Bucket: bucketName,
        Key: FORM_QUESTION_CATALOG_S3_KEY
      })
    );
    const text = await response.Body?.transformToString("utf-8");
    return text ? normalizeFormQuestionCatalog(JSON.parse(text)) : null;
  } catch (error) {
    logger?.warn?.("[form-question-catalog] S3 read failed; falling back to bundled catalog:", error);
    return null;
  }
}

function defaultApplicationQuestionCatalog() {
  return {
    collectionStage: "post_scenario_application",
    collectionSurface: "opportunity_application_form",
    requirementSections: {},
    requirementTypeMappings: {}
  };
}

function resolveRepoOrLambdaDataFile(fileName) {
  const candidates = [
    path.resolve(import.meta.dirname, "..", "..", "data", fileName),
    path.resolve(import.meta.dirname, "..", "..", "..", "..", "data", fileName)
  ];
  return candidates.find((candidate) => fs.existsSync(candidate)) || candidates[0];
}
