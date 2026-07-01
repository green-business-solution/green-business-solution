import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { importSampleTestCaseUtilityData } from "./import-sample-test-case-utility-data.mjs";

const tmpDirs = [];

afterEach(async () => {
  await Promise.all(tmpDirs.splice(0).map((dir) => fs.rm(dir, { recursive: true, force: true })));
});

describe("importSampleTestCaseUtilityData", () => {
  it("patches sample users and public test cases with intake-compatible utility data", async () => {
    const dir = await makeTmpDir();
    const paths = await writeFixtureFiles(dir, validPatch());

    const result = importSampleTestCaseUtilityData(paths);

    expect(result.importedProfileCount).toBe(1);
    const sampleUsers = JSON.parse(await fs.readFile(paths.sampleUsersPath, "utf8"));
    const testCases = JSON.parse(await fs.readFile(paths.testCasesPath, "utf8"));
    expect(sampleUsers[0].uploadedUtilityFiles).toHaveLength(1);
    expect(sampleUsers[0].utilityExtractedValues.some((value) => value.fieldId === "annual_kwh")).toBe(true);
    expect(sampleUsers[0].siteEnergyProfile).toMatchObject({
      annualKwh: 1200,
      annualElectricCost: 300,
      averageCostPerKwh: 0.25,
      processedFileCount: 1
    });
    expect(testCases.sampleUtilityDataProfileCount).toBe(1);
    expect(testCases.testCases[0].sourceForm.siteEnergyProfile.annualKwh).toBe(1200);
    expect(await fs.readFile(paths.reportPath, "utf8")).toContain("Imported profiles: 1");
  });

  it("rejects unknown bill field IDs", async () => {
    const dir = await makeTmpDir();
    const patch = validPatch();
    patch.profiles[0].utilityExtractedValues[0].fieldId = "not_a_real_field";
    const paths = await writeFixtureFiles(dir, patch);

    expect(() => importSampleTestCaseUtilityData(paths)).toThrow(/validation error/);
  });

  it("rejects annual and monthly totals that do not reconcile", async () => {
    const dir = await makeTmpDir();
    const patch = validPatch();
    patch.profiles[0].utilityExtractedValues.find((value) => value.fieldId === "annual_kwh").value = 9000;
    const paths = await writeFixtureFiles(dir, patch);

    expect(() => importSampleTestCaseUtilityData(paths)).toThrow(/validation error/);
  });
});

async function makeTmpDir() {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "retrofi-utility-import-"));
  tmpDirs.push(dir);
  return dir;
}

async function writeFixtureFiles(dir, patch) {
  const sampleUsersPath = path.join(dir, "sample_user_profiles.json");
  const testCasesPath = path.join(dir, "sample_matching_test_cases.json");
  const patchPath = path.join(dir, "patch.json");
  const reportPath = path.join(dir, "report.md");
  await fs.writeFile(
    sampleUsersPath,
    `${JSON.stringify(
      [
        {
          sampleUserId: "sample-one",
          companyName: "Sample One",
          electricUtilityProvider: "Sample Utility",
          siteAddress: "1 Main St, Test, CA 90000"
        }
      ],
      null,
      2
    )}\n`
  );
  await fs.writeFile(
    testCasesPath,
    `${JSON.stringify(
      {
        generatedAt: "2026-06-30T00:00:00.000Z",
        testCases: [{ sampleUserId: "sample-one", sourceForm: { sampleUserId: "sample-one" } }]
      },
      null,
      2
    )}\n`
  );
  await fs.writeFile(patchPath, `${JSON.stringify(patch, null, 2)}\n`);
  return { patchPath, reportPath, sampleUsersPath, testCasesPath };
}

function validPatch() {
  const sampleUserId = "sample-one";
  const fileId = `sample_bill_${sampleUserId}_electric_2026`;
  const baseValue = {
    clientIntakeId: `intake_sample_${sampleUserId}`,
    confidence: "medium",
    fileId,
    periodStart: "2025-06-01",
    periodEnd: "2026-05-31",
    sourcePath: "gpt_pro.synthetic_utility_profile.electric",
    sourceText: "Synthetic utility data.",
    sourceType: "unknown"
  };
  const annualValues = [
    value(baseValue, sampleUserId, "utility_provider", "Sample Utility", "text", 1),
    value(baseValue, sampleUserId, "service_address", "1 Main St, Test, CA 90000", "text", 2),
    value(baseValue, sampleUserId, "annual_kwh", 1200, "kWh", 3),
    value(baseValue, sampleUserId, "annual_electric_cost", 300, "USD", 4),
    value(baseValue, sampleUserId, "average_cost_per_kwh", 0.25, "USD/kWh", 5)
  ];
  const monthlyValues = [];
  for (let month = 0; month < 12; month += 1) {
    const start = new Date(Date.UTC(2025, 5 + month, 1));
    const end = new Date(Date.UTC(2025, 6 + month, 0));
    const periodStart = start.toISOString().slice(0, 10);
    const periodEnd = end.toISOString().slice(0, 10);
    monthlyValues.push(
      value({ ...baseValue, periodStart, periodEnd }, sampleUserId, "monthly_kwh", 100, "kWh", 10 + month),
      value({ ...baseValue, periodStart, periodEnd }, sampleUserId, "total_electric_cost", 25, "USD", 30 + month)
    );
  }

  return {
    schemaVersion: "retrofi_sample_test_case_utility_data.v1",
    generatedAt: "2026-06-30T00:00:00.000Z",
    source: "gpt_pro",
    dataStatus: "synthetic_estimated_not_actual_bills",
    globalAssumptions: [],
    profiles: [
      {
        sampleUserId,
        confidence: "medium",
        syntheticUtilityDataNotice: "Synthetic estimated utility profile for test fixtures; not an actual bill.",
        uploadedUtilityFiles: [
          {
            fileId,
            clientIntakeId: `intake_sample_${sampleUserId}`,
            siteId: `intake_sample_${sampleUserId}:primary_site`,
            originalFilename: `${sampleUserId}-electric-synthetic-utility-profile-2026.json`,
            fileType: "unknown",
            utilityCategory: "electric",
            utilityProvider: "Sample Utility",
            s3Key: `synthetic/sample-test-cases/${sampleUserId}/electric-2026.json`,
            processingStatus: "processed",
            uploadedAt: "2026-06-30T00:00:00.000Z",
            processedAt: "2026-06-30T00:00:00.000Z",
            errorMessage: null
          }
        ],
        utilityExtractedValues: [...annualValues, ...monthlyValues],
        siteEnergyProfileDraft: null,
        modelingNotes: ["Synthetic fixture."],
        sourceUrlsChecked: []
      }
    ],
    missingOrSkippedProfiles: []
  };
}

function value(baseValue, sampleUserId, fieldId, rawValue, unit, sequence) {
  return {
    ...baseValue,
    extractedValueId: `sample_ev_${sampleUserId}_electric_${fieldId}_${sequence}`,
    fieldDisplayName: fieldId,
    fieldId,
    unit,
    value: rawValue
  };
}
