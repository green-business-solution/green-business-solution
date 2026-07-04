import { BatchWriteCommand, DeleteCommand, GetCommand, QueryCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import {
  DASHBOARD_POST_IMPLEMENTATION_SCHEMA_VERSION,
  DASHBOARD_SYNTHETIC_SOURCE,
  dashboardPerformanceScope,
  validateDashboardPostImplementationDataset
} from "./schemas.mjs";

const inMemoryDatasets = new Map();
const ENTITY_COLLECTIONS = [
  ["PROPERTY", "properties"],
  ["RETROFIT", "implementedRetrofits"],
  ["MONTH", "monthlyPerformanceRecords"],
  ["INCENTIVE", "incentivePerformanceRecords"],
  ["DOCUMENT", "documentRecords"],
  ["CERTIFICATION", "certificationRecords"],
  ["CERT_REQUIREMENT", "certificationRequirements"],
  ["ACTION", "nextBestActions"]
];

export function summarizeDashboardPostImplementationDataset(dataset, extra = {}) {
  const validation = validateDashboardPostImplementationDataset(dataset);
  return {
    testCaseId: dataset?.testCaseId || "",
    archetype: dataset?.archetype || "unknown",
    businessId: dataset?.businessId || null,
    userId: dataset?.userId || null,
    isSynthetic: Boolean(dataset?.isSynthetic),
    syntheticSource: dataset?.syntheticSource || null,
    reportingPeriod: dataset?.reportingPeriod || null,
    implementedRetrofitCount: dataset?.implementedRetrofits?.length || 0,
    monthlyRecordCount: dataset?.monthlyPerformanceRecords?.length || 0,
    incentiveRecordCount: dataset?.incentivePerformanceRecords?.length || 0,
    documentRecordCount: dataset?.documentRecords?.length || 0,
    certificationRecordCount: dataset?.certificationRecords?.length || 0,
    certificationRequirementCount: dataset?.certificationRequirements?.length || 0,
    nextBestActionCount: dataset?.nextBestActions?.length || 0,
    dataQuality: dataset?.dataQuality || {
      status: validation.valid ? "partial" : "invalid",
      notes: [],
      warnings: [...validation.errors, ...validation.warnings]
    },
    storageStatus: extra.storageStatus || dataset?.storageStatus || "unknown",
    updatedAt: dataset?.updatedAt || null,
    generatedAt: dataset?.generatedAt || null
  };
}

export function buildDashboardPerformanceSummaryResponse(testCases = [], datasets = [], extra = {}) {
  const byId = new Map(datasets.map((dataset) => [dataset.testCaseId, dataset]));
  const summaries = testCases.map((testCase) => {
    const dataset = byId.get(testCase.sampleUserId);
    if (dataset) {
      return {
        ...summarizeDashboardPostImplementationDataset(dataset, extra),
        businessName: testCase.sourceForm?.companyName || testCase.sampleUserId,
        businessType: testCase.sourceForm?.businessType || testCase.sourceForm?.industry || "",
        location: testCase.sourceForm?.siteAddress || testCase.sourceForm?.headquarters || ""
      };
    }
    return {
      testCaseId: testCase.sampleUserId,
      archetype: "not_seeded",
      businessName: testCase.sourceForm?.companyName || testCase.sampleUserId,
      businessType: testCase.sourceForm?.businessType || testCase.sourceForm?.industry || "",
      location: testCase.sourceForm?.siteAddress || "",
      implementedRetrofitCount: 0,
      monthlyRecordCount: 0,
      incentiveRecordCount: 0,
      documentRecordCount: 0,
      certificationRecordCount: 0,
      certificationRequirementCount: 0,
      nextBestActionCount: 0,
      dataQuality: { status: "empty", notes: ["Not seeded."], warnings: [] },
      storageStatus: "not_seeded",
      updatedAt: null
    };
  });
  const seeded = summaries.filter((summary) => summary.storageStatus !== "not_seeded");
  return {
    summaries,
    storageStatus: extra.storageStatus || "unknown",
    totals: {
      testCases: summaries.length,
      withPostInstallData: seeded.length,
      emptyCases: summaries.filter((summary) => summary.dataQuality?.status === "empty").length,
      implementedRetrofits: sum(seeded.map((summary) => summary.implementedRetrofitCount)),
      monthlyRecords: sum(seeded.map((summary) => summary.monthlyRecordCount)),
      incentives: sum(seeded.map((summary) => summary.incentiveRecordCount)),
      documents: sum(seeded.map((summary) => summary.documentRecordCount)),
      certifications: sum(seeded.map((summary) => summary.certificationRecordCount)),
      nextBestActions: sum(seeded.map((summary) => summary.nextBestActionCount)),
      storageStatus: extra.storageStatus || "unknown"
    }
  };
}

export async function putDashboardPostImplementationDataset({ db, tableName, dataset }) {
  const normalized = normalizeDataset(dataset);
  inMemoryDatasets.set(normalized.testCaseId, normalized);
  if (!db || !tableName) {
    return { dataset: normalized, storageStatus: "local_fallback" };
  }
  const items = serializeDataset(normalized);
  try {
    await deleteSyntheticDashboardPostImplementationDataset({ db, tableName, testCaseId: normalized.testCaseId });
    for (const chunk of chunks(items, 25)) {
      await db.send(
        new BatchWriteCommand({
          RequestItems: {
            [tableName]: chunk.map((Item) => ({ PutRequest: { Item } }))
          }
        })
      );
    }
    return { dataset: normalized, storageStatus: "dynamodb" };
  } catch (error) {
    console.warn(`[dashboard-performance] DynamoDB write failed for ${normalized.testCaseId}:`, error);
    return { dataset: normalized, storageStatus: "local_fallback", warning: error.message };
  }
}

export async function getDashboardPostImplementationDatasetByTestCase({ db, tableName, testCaseId }) {
  const cleanTestCaseId = cleanText(testCaseId);
  if (!cleanTestCaseId) return null;
  if (db && tableName) {
    try {
      const result = await db.send(
        new QueryCommand({
          TableName: tableName,
          KeyConditionExpression: "stateScope = :scope",
          ExpressionAttributeValues: {
            ":scope": dashboardPerformanceScope(cleanTestCaseId)
          }
        })
      );
      const dataset = deserializeDataset(result.Items || []);
      if (dataset) return { dataset, storageStatus: "dynamodb" };
    } catch (error) {
      console.warn(`[dashboard-performance] DynamoDB read failed for ${cleanTestCaseId}:`, error);
    }
  }
  const fallback = inMemoryDatasets.get(cleanTestCaseId) || null;
  return fallback ? { dataset: fallback, storageStatus: "local_fallback" } : null;
}

export async function deleteSyntheticDashboardPostImplementationDataset({ db, tableName, testCaseId }) {
  const cleanTestCaseId = cleanText(testCaseId);
  if (!cleanTestCaseId) return { deletedCount: 0, storageStatus: "not_found" };
  inMemoryDatasets.delete(cleanTestCaseId);
  if (!db || !tableName) {
    return { deletedCount: 0, storageStatus: "local_fallback" };
  }
  try {
    const result = await db.send(
      new QueryCommand({
        TableName: tableName,
        KeyConditionExpression: "stateScope = :scope",
        ExpressionAttributeValues: {
          ":scope": dashboardPerformanceScope(cleanTestCaseId)
        }
      })
    );
    const items = result.Items || [];
    for (const item of items) {
      await db.send(
        new DeleteCommand({
          TableName: tableName,
          Key: {
            stateScope: item.stateScope,
            stateKey: item.stateKey
          }
        })
      );
    }
    return { deletedCount: items.length, storageStatus: "dynamodb" };
  } catch (error) {
    console.warn(`[dashboard-performance] DynamoDB delete failed for ${cleanTestCaseId}:`, error);
    return { deletedCount: 0, storageStatus: "local_fallback", warning: error.message };
  }
}

export async function listDashboardPostImplementationDatasetSummaries({ db, tableName, testCases = [] }) {
  const datasets = [...inMemoryDatasets.values()];
  let storageStatus = datasets.length ? "local_fallback" : "not_seeded";
  if (db && tableName) {
    try {
      const result = await db.send(
        new ScanCommand({
          TableName: tableName,
          FilterExpression: "entityType = :entityType AND schemaVersion = :schemaVersion",
          ExpressionAttributeValues: {
            ":entityType": "DASHBOARD_PERFORMANCE_META",
            ":schemaVersion": DASHBOARD_POST_IMPLEMENTATION_SCHEMA_VERSION
          }
        })
      );
      const dynamoDatasets = (result.Items || []).map((item) => item.dataset).filter(Boolean);
      if (dynamoDatasets.length) {
        storageStatus = "dynamodb";
        return buildDashboardPerformanceSummaryResponse(testCases, dynamoDatasets, { storageStatus });
      }
    } catch (error) {
      console.warn("[dashboard-performance] DynamoDB summary scan failed:", error);
    }
  }
  return buildDashboardPerformanceSummaryResponse(testCases, datasets, { storageStatus });
}

export async function deleteAllSyntheticDashboardPostImplementationDatasets({ db, tableName, testCaseIds = [] }) {
  let deletedCount = 0;
  for (const testCaseId of testCaseIds) {
    const result = await deleteSyntheticDashboardPostImplementationDataset({ db, tableName, testCaseId });
    deletedCount += result.deletedCount || 0;
  }
  return { deletedCount };
}

function normalizeDataset(dataset) {
  return {
    ...dataset,
    schemaVersion: DASHBOARD_POST_IMPLEMENTATION_SCHEMA_VERSION,
    isSynthetic: true,
    syntheticSource: dataset.syntheticSource || DASHBOARD_SYNTHETIC_SOURCE,
    dataQuality: dataset.dataQuality || { status: "partial", notes: [], warnings: [] }
  };
}

function serializeDataset(dataset) {
  const scope = dashboardPerformanceScope(dataset.testCaseId);
  const base = {
    stateScope: scope,
    testCaseId: dataset.testCaseId,
    schemaVersion: dataset.schemaVersion,
    isSynthetic: dataset.isSynthetic,
    syntheticSource: dataset.syntheticSource,
    createdAt: dataset.generatedAt,
    updatedAt: dataset.updatedAt
  };
  const items = [{
    ...base,
    stateKey: "META",
    entityType: "DASHBOARD_PERFORMANCE_META",
    datasetSummary: summarizeDashboardPostImplementationDataset(dataset, { storageStatus: "dynamodb" }),
    dataset
  }];
  for (const [prefix, collection] of ENTITY_COLLECTIONS) {
    for (const record of dataset[collection] || []) {
      items.push({
        ...base,
        stateKey: `${prefix}#${record.id}`,
        entityType: `DASHBOARD_PERFORMANCE_${prefix}`,
        recordId: record.id,
        record
      });
    }
  }
  return items;
}

function deserializeDataset(items) {
  const meta = items.find((item) => item.entityType === "DASHBOARD_PERFORMANCE_META");
  if (meta?.dataset) return meta.dataset;
  if (!items.length) return null;
  const dataset = {
    schemaVersion: DASHBOARD_POST_IMPLEMENTATION_SCHEMA_VERSION,
    testCaseId: items[0].testCaseId,
    isSynthetic: true,
    syntheticSource: DASHBOARD_SYNTHETIC_SOURCE,
    properties: [],
    implementedRetrofits: [],
    monthlyPerformanceRecords: [],
    incentivePerformanceRecords: [],
    documentRecords: [],
    certificationRecords: [],
    certificationRequirements: [],
    nextBestActions: []
  };
  for (const [prefix, collection] of ENTITY_COLLECTIONS) {
    dataset[collection] = items
      .filter((item) => item.entityType === `DASHBOARD_PERFORMANCE_${prefix}`)
      .map((item) => item.record)
      .filter(Boolean);
  }
  return dataset;
}

function chunks(values, size) {
  const result = [];
  for (let index = 0; index < values.length; index += size) {
    result.push(values.slice(index, index + size));
  }
  return result;
}

function cleanText(value) {
  return String(value || "").trim();
}

function sum(values) {
  return values.reduce((total, value) => total + Number(value || 0), 0);
}
