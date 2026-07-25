import {
  mkdtemp,
  rm,
  writeFile
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, beforeAll, expect, test } from "vitest";

import { validateLandscapeObservedSchema } from "../adapters/watersense-landscape/inspect-schema.mjs";
import {
  WATERSENSE_LANDSCAPE_ARTIFACT,
  WATERSENSE_V2_METHOD_SOURCE,
  calculateWaterSenseVersion2Allowances,
  ingestWaterSenseLandscape,
  recordWaterSenseLandscapeFormulaMapping,
  resolveWaterSenseLandscapeClimate,
  waterSenseLandscapeClimateId
} from "../adapters/watersense-landscape/run.mjs";
import { sha256File, verifyArtifact } from "../lib/artifact.mjs";
import { openResearchDatabase } from "../lib/sqlite.mjs";

const repoRoot = fileURLToPath(new URL("../../../..", import.meta.url));
const artifactPath = join(
  repoRoot,
  "scripts/research/operational-savings/.cache/artifacts/watersense-climate.xlsx"
);

const reviewedProjectInput = Object.freeze({
  postalCode: "94105",
  landscapeAreaFt2: 1_000,
  areaUnit: "square feet",
  growingSeason: Object.freeze({
    startMonth: 1,
    endMonth: 12,
    source: "EPA_WATERSENSE_V2",
    postalCode: "94105",
    methodArtifactSha256: WATERSENSE_V2_METHOD_SOURCE.sha256
  }),
  proposedHydrozones: Object.freeze([
    Object.freeze({
      areaFt2: 1_000,
      landscapeType: "non_turf_plants",
      irrigationEquipment: "microirrigation",
      irrigationEfficiency: 0.9,
      pressureRegulated: false
    })
  ]),
  controllerTreatment: "watersense_weather_based",
  certifiedProfessionalAudit: true
});

let database;
let temporaryRoot;
let ingestion;

beforeAll(async () => {
  process.env.OS_RESEARCH_NETWORK = "disabled";
  temporaryRoot = await mkdtemp(join(tmpdir(), "retrofi-watersense-landscape-"));
  database = await openResearchDatabase(
    join(temporaryRoot, "research.sqlite"),
    { deferReleasePublicationUntilClose: true }
  );
  ingestion = await ingestWaterSenseLandscape({ artifactPath, database });
}, 180_000);

afterAll(async () => {
  try {
    database?.close();
  } finally {
    if (temporaryRoot) {
      await rm(temporaryRoot, {
        recursive: true,
        force: true
      });
    }
  }
});

test("verifies and publishes every populated postal-code climate row from the real workbook", async () => {
  expect(await sha256File(artifactPath)).toBe(
    WATERSENSE_LANDSCAPE_ARTIFACT.sha256
  );
  expect(ingestion.artifact.byteSize).toBe(
    WATERSENSE_LANDSCAPE_ARTIFACT.byteSize
  );
  expect(ingestion.schema.sheetOrder).toEqual([
    "About",
    "Peak_Month",
    "ETo",
    "P50"
  ]);
  expect(ingestion.recordsRead).toBe(31_735);
  expect(ingestion.recordsWritten).toBe(31_735);
  expect(ingestion.schema.recordContract).toMatchObject({
    usZipRows: 30_116,
    canadianFsaRows: 1_619,
    styledBlankRowsInMonthlySheets: 24_179
  });
  expect(
    database.prepare(
      "SELECT count(*) AS count FROM watersense_landscape_climate"
    ).get().count
  ).toBe(31_735);
  expect(
    database.prepare(`
      SELECT count(*) AS count
      FROM calculation_assumptions
      WHERE standard_id = 'STD-WATERSENSE-LANDSCAPE'
    `).get().count
  ).toBe(8);
});

test("resolves an exact native ZIP row with monthly types, units, and provenance", () => {
  const climate = resolveWaterSenseLandscapeClimate(database, "94105");
  expect(climate).toMatchObject({
    postalCode: "94105",
    annualEtoIn: 42.589954999999996,
    annualRainfallIn: 19.271563,
    nativeSheet: "Peak_Month + ETo + P50",
    nativeRow: 28_201
  });
  expect(climate.monthly).toMatchObject({
    peakWateringMonth: "jun",
    peakEtoIn: 5.305005,
    peakRainfallIn: 0.039661
  });
  expect(climate.monthly.etoIn).toHaveLength(12);
  expect(climate.monthly.rainfallIn).toHaveLength(12);
});

test("scopes climate identities to the exact workbook release", () => {
  const currentId = waterSenseLandscapeClimateId(
    "94105",
    ingestion.releaseId
  );
  const laterId = waterSenseLandscapeClimateId(
    "94105",
    "release:watersense-landscape:later"
  );
  expect(laterId).not.toBe(currentId);
  expect(
    database.prepare(`
      SELECT id, source_release_id AS sourceReleaseId
      FROM watersense_landscape_climate
      WHERE id = ?
    `).get(currentId)
  ).toEqual({
    id: currentId,
    sourceReleaseId: ingestion.releaseId
  });
});

test("executes the exact reviewed Version 2.0 method and reaches both ITC-34 terms", () => {
  const result = calculateWaterSenseVersion2Allowances(
    database,
    reviewedProjectInput
  );
  expect(result.values.baseline_design_allowance_gallons).toBeCloseTo(
    15_386.062011576898,
    9
  );
  expect(result.values.proposed_design_allowance_gallons).toBeCloseTo(
    7_963.595974738558,
    9
  );
  expect(result.formulaBindings).toEqual([
    expect.objectContaining({
      formulaTerm: "baseline_design_allowance_gallons",
      unit: "gallons/year",
      scope: "PROJECT_TOTAL"
    }),
    expect.objectContaining({
      formulaTerm: "proposed_design_allowance_gallons",
      unit: "gallons/year",
      scope: "PROJECT_TOTAL"
    })
  ]);
  const calculationId = recordWaterSenseLandscapeFormulaMapping(
    database,
    result
  );
  expect(calculationId).toContain(
    `:${ingestion.releaseId}:`
  );
  expect(
    database.prepare(`
      SELECT count(*) AS count
      FROM selected_values
      WHERE calculation_run_id = ?
    `).get(calculationId).count
  ).toBe(2);
  expect(
    database.prepare(`
      SELECT count(*) AS count
      FROM selected_value_provenance
      WHERE selected_value_id LIKE ?
        AND source_artifact_id = 'artifact:watersense-landscape:2020-10'
    `).get(`${calculationId}:%`).count
  ).toBe(2);
});

test("fails closed when an observed native header drifts", () => {
  const mutated = structuredClone(ingestion.schema);
  const annual = mutated.requiredCells.find(
    (cell) => cell.sheet === "ETo" && cell.cell === "N1"
  );
  annual.value = "Annual ETo";
  expect(() => validateLandscapeObservedSchema(mutated)).toThrow(
    /LANDSCAPE_NATIVE_CELL_MISMATCH/
  );
});

test("rejects missing Version 2.0 inputs and incompatible project units", () => {
  expect(() =>
    calculateWaterSenseVersion2Allowances(database, {
      ...reviewedProjectInput,
      growingSeason: undefined
    })
  ).toThrow(/MISSING_AUTHORITATIVE_GROWING_SEASON/);
  expect(() =>
    calculateWaterSenseVersion2Allowances(database, {
      ...reviewedProjectInput,
      growingSeason: {
        ...reviewedProjectInput.growingSeason,
        postalCode: "94104"
      }
    })
  ).toThrow(/GROWING_SEASON_POSTAL_CODE_MISMATCH/);
  expect(() =>
    calculateWaterSenseVersion2Allowances(database, {
      ...reviewedProjectInput,
      growingSeason: {
        ...reviewedProjectInput.growingSeason,
        methodArtifactSha256: "0".repeat(64)
      }
    })
  ).toThrow(/UNVERIFIED_GROWING_SEASON/);
  expect(() =>
    calculateWaterSenseVersion2Allowances(database, {
      ...reviewedProjectInput,
      proposedHydrozones: []
    })
  ).toThrow(/at least one proposed hydrozone/);
  expect(() =>
    calculateWaterSenseVersion2Allowances(database, {
      ...reviewedProjectInput,
      areaUnit: "square meters"
    })
  ).toThrow(/INCOMPATIBLE_PROJECT_UNIT/);
  expect(() =>
    calculateWaterSenseVersion2Allowances(database, {
      ...reviewedProjectInput,
      proposedHydrozones: [
        {
          ...reviewedProjectInput.proposedHydrozones[0],
          irrigationEfficiency: 0.8
        }
      ]
    })
  ).toThrow(/UNSUPPORTED_IRRIGATION_EFFICIENCY_OVERRIDE/);
});

test("fails a corrupt climate-workbook checksum", async () => {
  const corrupt = join(temporaryRoot, "corrupt-watersense-climate.xlsx");
  await writeFile(corrupt, "not the official WaterSense climate workbook", "utf8");
  await expect(
    verifyArtifact(corrupt, WATERSENSE_LANDSCAPE_ARTIFACT)
  ).rejects.toThrow(/ARTIFACT_SIZE_MISMATCH|CORRUPT_CHECKSUM/);
});

test("requires the offline runtime guard", () => {
  const previous = process.env.OS_RESEARCH_NETWORK;
  delete process.env.OS_RESEARCH_NETWORK;
  try {
    expect(() =>
      calculateWaterSenseVersion2Allowances(database, reviewedProjectInput)
    ).toThrow(/OFFLINE_GUARD_REQUIRED/);
  } finally {
    process.env.OS_RESEARCH_NETWORK = previous;
  }
});
