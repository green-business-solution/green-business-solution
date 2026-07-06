import { GetObjectCommand } from "@aws-sdk/client-s3";
import { GetCommand } from "@aws-sdk/lib-dynamodb";

export const FORM_QUESTION_CATALOG_ACTIVE_S3_KEY = "runtime-config/form-question-catalog/active.json";
export const FORM_QUESTION_CATALOG_LEGACY_S3_KEY = "runtime-config/form-question-catalog.json";
export const FORM_QUESTION_CATALOG_STATE_SCOPE = "formQuestionCatalog";
export const FORM_QUESTION_CATALOG_STATE_KEY = "active";
export const FORM_QUESTION_CATALOG_VERSION_STATE_SCOPE = "formQuestionCatalogVersion";

let bundledCatalogCache = null;
let runtimeCatalogCache = null;

export function formQuestionCatalogStateKey() {
  return {
    stateScope: FORM_QUESTION_CATALOG_STATE_SCOPE,
    stateKey: FORM_QUESTION_CATALOG_STATE_KEY
  };
}

export function formQuestionCatalogVersionStateKey(versionId) {
  return {
    stateScope: FORM_QUESTION_CATALOG_VERSION_STATE_SCOPE,
    stateKey: `version:${String(versionId || "").trim()}`
  };
}

export function versionedFormQuestionCatalogS3Key(versionId) {
  const cleanVersionId = String(versionId || "").trim().replace(/[^a-zA-Z0-9_.:-]+/g, "-");
  return `runtime-config/form-question-catalog/versions/${cleanVersionId}.json`;
}

export function readFormQuestionCatalog() {
  if (!bundledCatalogCache) {
    bundledCatalogCache = normalizeFormQuestionCatalog();
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
    (await readCatalogFromDynamoDb({ bucketName, db, logger, s3, tableName })) ||
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
    return {
      ...catalog,
      application: catalog.application || defaultApplicationQuestionCatalog()
    };
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

async function readCatalogFromDynamoDb({ bucketName, db, logger, s3, tableName } = {}) {
  if (!db || !tableName) return null;
  try {
    const result = await db.send(
      new GetCommand({
        TableName: tableName,
        Key: formQuestionCatalogStateKey()
      })
    );
    const item = result.Item;
    if (!item) return null;
    if (item.catalog) return normalizeFormQuestionCatalog(item.catalog);
    if (item.s3Key || item.activeS3Key) {
      return readCatalogFromS3({
        bucketName: item.s3Bucket || bucketName,
        key: item.s3Key || item.activeS3Key,
        logger,
        s3
      });
    }
    return null;
  } catch (error) {
    logger?.warn?.("[form-question-catalog] DynamoDB read failed; falling back to S3/empty catalog:", error);
    return null;
  }
}

async function readCatalogFromS3({ bucketName, key, logger, s3 } = {}) {
  if (!s3 || !bucketName) return null;
  const keys = key ? [key] : [FORM_QUESTION_CATALOG_ACTIVE_S3_KEY, FORM_QUESTION_CATALOG_LEGACY_S3_KEY];
  let lastError = null;
  for (const s3Key of keys) {
    try {
      const response = await s3.send(
        new GetObjectCommand({
          Bucket: bucketName,
          Key: s3Key
        })
      );
      const text = await response.Body?.transformToString("utf-8");
      if (text) return normalizeFormQuestionCatalog(JSON.parse(text));
    } catch (error) {
      lastError = error;
    }
  }
  if (lastError) {
    logger?.warn?.("[form-question-catalog] S3 read failed; falling back to empty catalog:", lastError);
  }
  return null;
}

function defaultApplicationQuestionCatalog() {
  return {
    collectionStage: "post_scenario_application",
    collectionSurface: "opportunity_application_form",
    requirementSections: {
      requiredFields: {
        label: "Required fields",
        questionKind: "field",
        required: true,
        answerTypeDefault: "text"
      },
      requiredDocuments: {
        label: "Required documents",
        questionKind: "document",
        required: true,
        answerTypeDefault: "file"
      },
      optionalFields: {
        label: "Optional fields",
        questionKind: "field",
        required: false,
        answerTypeDefault: "text"
      }
    },
    requirementTypeMappings: {
      account_number: { answerType: "text", collectionSurface: "account_number_form", canonicalInputKeyPrefix: "account_number" },
      bill: { answerType: "file", collectionSurface: "utility_bill_upload", canonicalInputKeyPrefix: "bill_document" },
      checklist: { answerType: "file", collectionSurface: "application_document_upload", canonicalInputKeyPrefix: "checklist_document" },
      contact: { answerType: "text", collectionSurface: "contact_form", canonicalInputKeyPrefix: "contact" },
      contractor: { answerType: "text", collectionSurface: "contractor_or_installer_form", canonicalInputKeyPrefix: "contractor" },
      document: { answerType: "file", collectionSurface: "application_document_upload", canonicalInputKeyPrefix: "application_document" },
      eligibility: { answerType: "boolean", collectionSurface: "opportunity_eligibility_form", canonicalInputKeyPrefix: "eligibility" },
      field: { answerType: "text", collectionSurface: "opportunity_application_form", canonicalInputKeyPrefix: "application_field" },
      other: { answerType: "text", collectionSurface: "opportunity_application_form", canonicalInputKeyPrefix: "application_requirement" },
      preapproval: { answerType: "file", collectionSurface: "preapproval_document_upload", canonicalInputKeyPrefix: "preapproval_document" },
      quote: { answerType: "file", collectionSurface: "project_quote_upload", canonicalInputKeyPrefix: "quote_document" },
      signature: { answerType: "boolean", collectionSurface: "opportunity_application_form", canonicalInputKeyPrefix: "signature" },
      tax: { answerType: "file", collectionSurface: "tax_document_upload", canonicalInputKeyPrefix: "tax_document" }
    }
  };
}
