import {
  mkdtemp,
  rm,
  writeFile
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, beforeAll, expect, test } from "vitest";

import { validateCiObservedSchema } from "../adapters/watersense-ci/inspect-schema.mjs";
import {
  WATERSENSE_CI_ARTIFACT,
  calculateMeasuredLeakAvoidance,
  ingestWaterSenseCi,
  recordWaterSenseCiFormulaMapping,
  rejectUnsupportedCoolingTowerCalculation,
  waterSenseCiMethodId
} from "../adapters/watersense-ci/run.mjs";
import { sha256File, verifyArtifact } from "../lib/artifact.mjs";
import { openResearchDatabase } from "../lib/sqlite.mjs";

const repoRoot = fileURLToPath(new URL("../../../..", import.meta.url));
const artifactPath = join(
  repoRoot,
  "scripts/research/operational-savings/.cache/artifacts/watersense-ci-worksheets.xlsx"
);

const measuredLeakInput = Object.freeze({
  measuredLeakGpm: 0.5,
  measuredLeakUnit: "gallons/minute",
  confirmedLeakMinutesPerYear: 525_600,
  confirmedDurationUnit: "minutes/year"
});

let database;
let temporaryRoot;
let ingestion;

beforeAll(async () => {
  process.env.OS_RESEARCH_NETWORK = "disabled";
  temporaryRoot = await mkdtemp(join(tmpdir(), "retrofi-watersense-ci-"));
  database = await openResearchDatabase(
    join(temporaryRoot, "research.sqlite"),
    { deferReleasePublicationUntilClose: true }
  );
  ingestion = await ingestWaterSenseCi({ artifactPath, database });
}, 120_000);

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

test("verifies all seven real workbook sheets and publishes typed method rows", async () => {
  expect(await sha256File(artifactPath)).toBe(WATERSENSE_CI_ARTIFACT.sha256);
  expect(ingestion.artifact.byteSize).toBe(WATERSENSE_CI_ARTIFACT.byteSize);
  expect(ingestion.schema.sheetOrder).toEqual([
    "Title Page",
    "Action Plan Checklist",
    "Building Water Survey",
    "List of Water Meters",
    "Water Consumption History",
    "Existing Plumbing Equipment",
    "Water Use Inventory"
  ]);
  expect(ingestion.schema.formulaCount).toBe(0);
  expect(ingestion.recordsWritten).toBe(7);
  expect(
    database.prepare(
      "SELECT count(*) AS count FROM watersense_ci_methods"
    ).get().count
  ).toBe(7);
});

test("retains the exact measured-input cells, units, notes, and method boundary", () => {
  expect(
    database.prepare(`
      SELECT
        sheet_name AS sheetName,
        native_cell AS nativeCell,
        formula_text AS formulaText,
        unit
      FROM watersense_ci_methods
      WHERE id = ?
    `).get(
      waterSenseCiMethodId(
        "watersense-ci:measured-flow-per-day",
        ingestion.releaseId
      )
    )
  ).toEqual({
    sheetName: "Water Use Inventory",
    nativeCell: "C2:E2",
    formulaText:
      "Dimensional relationship inferred from adjacent headers: Flow (gallons/minute) multiplied by Operating Time (minutes/day)",
    unit: "gallons/day"
  });
  expect(
    database.prepare(`
      SELECT native_cell AS nativeCell, formula_text AS formulaText
      FROM watersense_ci_methods
      WHERE id = ?
    `).get(
      waterSenseCiMethodId(
        "watersense-ci:cooling-tower-cycles",
        ingestion.releaseId
      )
    )
  ).toEqual({
    nativeCell: "A43",
    formulaText:
      "Professionally monitor cooling tower and boiler chemistry and maximize cycles of concentration."
  });
});

test("scopes method identities to the exact workbook release", () => {
  const nativeMethodId =
    "watersense-ci:measured-flow-per-day";
  const currentId = waterSenseCiMethodId(
    nativeMethodId,
    ingestion.releaseId
  );
  const laterId = waterSenseCiMethodId(
    nativeMethodId,
    "release:watersense-ci-operations:later"
  );
  expect(laterId).not.toBe(currentId);
  expect(
    database.prepare(`
      SELECT id, source_release_id AS sourceReleaseId
      FROM watersense_ci_methods
      WHERE id = ?
    `).get(currentId)
  ).toEqual({
    id: currentId,
    sourceReleaseId: ingestion.releaseId
  });
});

test("executes the measured flow-duration method and reaches both ITC-35 terms", () => {
  const result = calculateMeasuredLeakAvoidance(database, measuredLeakInput);
  expect(result.values).toEqual({
    measured_leak_gpm: 0.5,
    confirmed_leak_minutes_per_year: 525_600
  });
  expect(result.avoidedLeakGallons).toBe(262_800);
  expect(result.avoidedLeakUnit).toBe("gallons/year");
  expect(result.formulaBindings).toEqual([
    expect.objectContaining({
      formulaTerm: "measured_leak_gpm",
      unit: "gallons/minute",
      scope: "PROJECT_TOTAL"
    }),
    expect.objectContaining({
      formulaTerm: "confirmed_leak_minutes_per_year",
      unit: "minutes/year",
      scope: "PER_YEAR"
    })
  ]);
  const calculationId = recordWaterSenseCiFormulaMapping(database, result);
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
        AND source_artifact_id = 'artifact:watersense-ci-operations:2012-10'
    `).get(`${calculationId}:%`).count
  ).toBe(2);
});

test("fails closed on a mutated native unit contract", () => {
  const mutated = structuredClone(ingestion.schema);
  const flow = mutated.requiredCells.find(
    (cell) => cell.sheet === "Water Use Inventory" && cell.cell === "C2"
  );
  flow.unit = "liters/minute";
  expect(() => validateCiObservedSchema(mutated)).toThrow(
    /WATERSENSE_CI_NATIVE_UNIT_MISMATCH/
  );
});

test("rejects missing measured inputs and incompatible units", () => {
  expect(() =>
    calculateMeasuredLeakAvoidance(database, {
      ...measuredLeakInput,
      measuredLeakGpm: undefined
    })
  ).toThrow(/MISSING_PROJECT_MEASUREMENT: measured leak flow/);
  expect(() =>
    calculateMeasuredLeakAvoidance(database, {
      ...measuredLeakInput,
      confirmedLeakMinutesPerYear: undefined
    })
  ).toThrow(/MISSING_PROJECT_MEASUREMENT: confirmed annual leak duration/);
  expect(() =>
    calculateMeasuredLeakAvoidance(database, {
      ...measuredLeakInput,
      measuredLeakUnit: "liters/minute"
    })
  ).toThrow(/INCOMPATIBLE_PROJECT_UNIT/);
  expect(() =>
    calculateMeasuredLeakAvoidance(database, {
      ...measuredLeakInput,
      confirmedDurationUnit: "hours/year"
    })
  ).toThrow(/INCOMPATIBLE_PROJECT_UNIT/);
});

test("retains cooling-tower measurements and the absent numeric equation as blockers", () => {
  expect(() => rejectUnsupportedCoolingTowerCalculation(database, {})).toThrow(
    /MISSING_PROJECT_MEASUREMENT: existing cycles of concentration/
  );
  expect(() =>
    rejectUnsupportedCoolingTowerCalculation(database, {
      existingCyclesOfConcentration: 3,
      proposedCyclesOfConcentration: 6,
      annualEvaporationGallons: 1_000_000,
      annualEvaporationUnit: "gallons/year"
    })
  ).toThrow(/SOURCE_METHOD_NOT_EXECUTABLE/);
});

test("fails a corrupt CI-workbook checksum", async () => {
  const corrupt = join(temporaryRoot, "corrupt-watersense-ci.xlsx");
  await writeFile(corrupt, "not the official WaterSense CI workbook", "utf8");
  await expect(
    verifyArtifact(corrupt, WATERSENSE_CI_ARTIFACT)
  ).rejects.toThrow(/ARTIFACT_SIZE_MISMATCH|CORRUPT_CHECKSUM/);
});

test("requires the offline runtime guard", () => {
  const previous = process.env.OS_RESEARCH_NETWORK;
  delete process.env.OS_RESEARCH_NETWORK;
  try {
    expect(() =>
      calculateMeasuredLeakAvoidance(database, measuredLeakInput)
    ).toThrow(/OFFLINE_GUARD_REQUIRED/);
  } finally {
    process.env.OS_RESEARCH_NETWORK = previous;
  }
});
