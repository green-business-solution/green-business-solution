import fs from "node:fs/promises";
import { describe, expect, it } from "vitest";
import { buildSyntheticDashboardPostImplementationDataset } from "./syntheticDashboardPerformance.mjs";
import {
  DASHBOARD_POST_IMPLEMENTATION_SCHEMA_VERSION,
  validateDashboardPostImplementationDataset
} from "./schemas.mjs";

async function loadSampleTestCase(sampleUserId = "juniper-and-ivy-san-diego") {
  const payload = JSON.parse(await fs.readFile(new URL("../../public/sample_matching_test_cases.json", import.meta.url), "utf8"));
  return payload.testCases.find((testCase) => testCase.sampleUserId === sampleUserId) || payload.testCases[0];
}

describe("synthetic dashboard post-implementation generator", () => {
  it("is deterministic and emits the required schema version", async () => {
    const testCase = await loadSampleTestCase();
    const first = buildSyntheticDashboardPostImplementationDataset(testCase);
    const second = buildSyntheticDashboardPostImplementationDataset(testCase);

    expect(first).toEqual(second);
    expect(first.schemaVersion).toBe(DASHBOARD_POST_IMPLEMENTATION_SCHEMA_VERSION);
    expect(first.testCaseId).toBe(testCase.sampleUserId);
    expect(first.isSynthetic).toBe(true);
    expect(first.syntheticSource).toBe("admin_test_case_seed");
  });

  it("creates linked implemented retrofits, monthly records, incentives, documents, certifications, and actions", async () => {
    const testCase = await loadSampleTestCase();
    const dataset = buildSyntheticDashboardPostImplementationDataset(testCase);
    const validation = validateDashboardPostImplementationDataset(dataset);

    expect(validation.valid).toBe(true);
    expect(dataset.implementedRetrofits.length).toBeGreaterThanOrEqual(3);
    expect(dataset.monthlyPerformanceRecords.length).toBeGreaterThanOrEqual(dataset.implementedRetrofits.length * 12);
    expect(dataset.incentivePerformanceRecords.length).toBeGreaterThan(0);
    expect(dataset.documentRecords.length).toBeGreaterThan(dataset.implementedRetrofits.length * 2);
    expect(dataset.certificationRecords.length).toBeGreaterThan(0);
    expect(dataset.certificationRequirements.length).toBeGreaterThan(0);
    expect(dataset.nextBestActions.length).toBeGreaterThanOrEqual(3);
    expect(dataset.implementedRetrofits.every((retrofit) => retrofit.sourceEstimateId && retrofit.retrofitId)).toBe(true);
    expect(dataset.incentivePerformanceRecords.every((incentive) => incentive.retrofitPerformanceId)).toBe(true);
  });

  it("does not create savings before operational date and keeps cumulative savings monotonic", async () => {
    const testCase = await loadSampleTestCase();
    const dataset = buildSyntheticDashboardPostImplementationDataset(testCase);

    for (const retrofit of dataset.implementedRetrofits) {
      const operationalMonth = retrofit.operationalDate.slice(0, 7);
      const records = dataset.monthlyPerformanceRecords.filter(
        (record) => record.retrofitPerformanceId === retrofit.id
      );
      expect(records).toHaveLength(12);
      records
        .filter((record) => record.month < operationalMonth)
        .forEach((record) => expect(record.actualSavingsCents).toBe(0));
      records.reduce((previous, record) => {
        expect(record.cumulativeSavingsCents).toBeGreaterThanOrEqual(previous);
        return record.cumulativeSavingsCents;
      }, -Infinity);
    }
  });

  it("separates certification progress from document readiness and includes varied document statuses", async () => {
    const testCase = await loadSampleTestCase("california-endowment-hq");
    const dataset = buildSyntheticDashboardPostImplementationDataset(testCase);
    const documentStatuses = new Set(dataset.documentRecords.map((document) => document.status));

    expect(dataset.certificationRecords.some((record) => record.progressPercent !== record.readinessPercent)).toBe(true);
    expect(documentStatuses.has("verified")).toBe(true);
    expect([...documentStatuses].some((status) => ["missing", "needs_update", "requested"].includes(status))).toBe(true);
  });
});
