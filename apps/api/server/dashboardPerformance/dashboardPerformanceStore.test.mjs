import fs from "node:fs/promises";
import { describe, expect, it } from "vitest";
import { buildSyntheticDashboardPostImplementationDataset } from "./syntheticDashboardPerformance.mjs";
import {
  deleteSyntheticDashboardPostImplementationDataset,
  getDashboardPostImplementationDatasetByTestCase,
  listDashboardPostImplementationDatasetSummaries,
  putDashboardPostImplementationDataset
} from "./dashboardPerformanceStore.mjs";

async function buildDataset() {
  const payload = JSON.parse(await fs.readFile(new URL("../../../../public/sample_matching_test_cases.json", import.meta.url), "utf8"));
  return buildSyntheticDashboardPostImplementationDataset(payload.testCases[0]);
}

function createMockDocumentClient({ queryPageSize = 1000, scanPageSize = 1000 } = {}) {
  const items = [];
  function pageRows(rows, pageSize, exclusiveStartKey) {
    const start = exclusiveStartKey?.mockOffset || 0;
    const page = rows.slice(start, start + pageSize);
    const nextOffset = start + pageSize;
    return {
      Items: page,
      LastEvaluatedKey: nextOffset < rows.length ? { mockOffset: nextOffset } : undefined
    };
  }
  return {
    items,
    async send(command) {
      const name = command.constructor.name;
      const input = command.input;
      if (name === "BatchWriteCommand") {
        for (const request of input.RequestItems.dashboardPerformanceTestTable) {
          items.push(request.PutRequest.Item);
        }
        return {};
      }
      if (name === "QueryCommand") {
        const rows = items.filter((item) => item.stateScope === input.ExpressionAttributeValues[":scope"]);
        return pageRows(rows, queryPageSize, input.ExclusiveStartKey);
      }
      if (name === "ScanCommand") {
        const rows = items.filter(
          (item) =>
            item.entityType === input.ExpressionAttributeValues[":entityType"] &&
            item.schemaVersion === input.ExpressionAttributeValues[":schemaVersion"]
        );
        return pageRows(rows, scanPageSize, input.ExclusiveStartKey);
      }
      if (name === "DeleteCommand") {
        const index = items.findIndex(
          (item) =>
            item.stateScope === input.Key.stateScope &&
            item.stateKey === input.Key.stateKey
        );
        if (index >= 0) items.splice(index, 1);
        return {};
      }
      throw new Error(`Unhandled command ${name}`);
    }
  };
}

describe("dashboard performance store", () => {
  it("batch writes, reads, summarizes, and deletes all dashboard performance entity types", async () => {
    const db = createMockDocumentClient({ queryPageSize: 7, scanPageSize: 1 });
    const tableName = "dashboardPerformanceTestTable";
    const dataset = await buildDataset();

    const putResult = await putDashboardPostImplementationDataset({ db, tableName, dataset });
    expect(putResult.storageStatus).toBe("dynamodb");
    expect(db.items.some((item) => item.entityType === "DASHBOARD_PERFORMANCE_META")).toBe(true);
    expect(db.items.some((item) => item.entityType === "DASHBOARD_PERFORMANCE_RETROFIT")).toBe(true);
    expect(db.items.some((item) => item.entityType === "DASHBOARD_PERFORMANCE_MONTH")).toBe(true);
    expect(db.items.some((item) => item.entityType === "DASHBOARD_PERFORMANCE_INCENTIVE")).toBe(true);
    expect(db.items.some((item) => item.entityType === "DASHBOARD_PERFORMANCE_DOCUMENT")).toBe(true);
    expect(db.items.some((item) => item.entityType === "DASHBOARD_PERFORMANCE_CERTIFICATION")).toBe(true);
    expect(db.items.some((item) => item.entityType === "DASHBOARD_PERFORMANCE_ACTION")).toBe(true);

    const readResult = await getDashboardPostImplementationDatasetByTestCase({
      db,
      tableName,
      testCaseId: dataset.testCaseId
    });
    expect(readResult.storageStatus).toBe("dynamodb");
    expect(readResult.dataset.testCaseId).toBe(dataset.testCaseId);
    expect(readResult.dataset.implementedRetrofits).toHaveLength(dataset.implementedRetrofits.length);

    const listResult = await listDashboardPostImplementationDatasetSummaries({
      db,
      tableName,
      testCases: [{ sampleUserId: dataset.testCaseId, sourceForm: { companyName: "Test Case" } }]
    });
    expect(listResult.totals.testCases).toBe(1);
    expect(listResult.totals.withPostInstallData).toBe(1);
    expect(listResult.totals.implementedRetrofits).toBe(dataset.implementedRetrofits.length);

    const deleteResult = await deleteSyntheticDashboardPostImplementationDataset({
      db,
      tableName,
      testCaseId: dataset.testCaseId
    });
    expect(deleteResult.storageStatus).toBe("dynamodb");
    expect(db.items).toHaveLength(0);
  });
});
