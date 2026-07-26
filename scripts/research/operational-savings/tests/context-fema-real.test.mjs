import {
  mkdtemp,
  readFile,
  rm,
  writeFile
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

import {
  afterAll,
  beforeAll,
  expect,
  test
} from "vitest";

import {
  parseFemaGeneratorFuelingHtml
} from "../adapters/context-benchmarks/fema-inspect-schema.mjs";
import {
  FEMA_GENERATOR_FUELING_ARTIFACT,
  ingestFemaGeneratorFueling,
  mapFemaFullLoadDieselTestFuel,
  recordFemaFullLoadDieselTestFuel
} from "../adapters/context-benchmarks/fema.mjs";
import {
  sha256File
} from "../lib/artifact.mjs";
import {
  openResearchDatabase
} from "../lib/sqlite.mjs";

const repoRoot = fileURLToPath(
  new URL("../../../..", import.meta.url)
);
const artifactPath = join(
  repoRoot,
  "scripts/research/operational-savings/.cache/artifacts/fema-generator-fueling.html"
);
const projectInput = Object.freeze({
  technology: "generator",
  fuelType: "diesel",
  loadCondition: "FULL_LOAD",
  ratedCapacityKw: 40,
  annualFullLoadTestHoursPerUnit: 24
});

let database;
let temporaryRoot;

beforeAll(async () => {
  process.env.OS_RESEARCH_NETWORK = "disabled";
  temporaryRoot = await mkdtemp(
    join(tmpdir(), "retrofi-context-fema-")
  );
  database = await openResearchDatabase(
    join(temporaryRoot, "research.sqlite"),
    { deferReleasePublicationUntilClose: true }
  );
  await ingestFemaGeneratorFueling({
    artifactPath,
    database
  });
});

afterAll(async () => {
  database?.close();
  await rm(temporaryRoot, { recursive: true, force: true });
});

test("verifies and publishes the exact FEMA full-load diesel formula", async () => {
  expect(await sha256File(artifactPath)).toBe(
    FEMA_GENERATOR_FUELING_ARTIFACT.sha256
  );
  const html = await readFile(artifactPath, "utf8");
  const parsed = parseFemaGeneratorFuelingHtml(html);
  expect(parsed.coefficient).toBe(0.07);
  expect(parsed.observed.example).toEqual({
    ratedCapacityKw: 40,
    coefficient: 0.07,
    hours: 24,
    gallons: 67.2
  });
  expect(
    database.prepare(`
      SELECT
        field_key AS fieldKey,
        value,
        unit
      FROM benchmark_values
      WHERE id =
        'context:fema:release:fema-is-815-generator-fueling:2026-07-24:full-load-diesel-generator:fuel-coefficient'
    `).get()
  ).toEqual({
    fieldKey: "full_load_diesel_fuel_coefficient",
    value: 0.07,
    unit: "gallon/(hour kW)"
  });
});

test("maps the narrow FEMA calculation to the exact ITC-54 term", () => {
  const result = mapFemaFullLoadDieselTestFuel(
    database,
    projectInput
  );
  expect(result.values).toEqual({
    benchmark_annual_test_fuel_per_unit: 67.2
  });
  expect(result.formulaBindings).toEqual([
    expect.objectContaining({
      formulaTerm:
        "benchmark_annual_test_fuel_per_unit",
      value: 67.2,
      unit: "fuel-unit/year",
      nativeUnit: "gallons/year",
      scope: "PER_EQUIPMENT_UNIT"
    })
  ]);
  const calculationId =
    recordFemaFullLoadDieselTestFuel(database, result);
  expect(
    database.prepare(`
      SELECT
        formula_term AS formulaTerm,
        value,
        unit,
        scope
      FROM selected_values
      WHERE calculation_run_id = ?
    `).get(calculationId)
  ).toEqual({
    formulaTerm:
      "benchmark_annual_test_fuel_per_unit",
    value: 67.2,
    unit: "fuel-unit/year",
    scope: "PER_EQUIPMENT_UNIT"
  });
});

test("fails closed outside the diesel full-load boundary", () => {
  for (const incompatible of [
    { fuelType: "propane" },
    { technology: "fuel cell" },
    { loadCondition: "PART_LOAD" }
  ]) {
    expect(() =>
      mapFemaFullLoadDieselTestFuel(database, {
        ...projectInput,
        ...incompatible
      })
    ).toThrow(/INCOMPATIBLE_FEMA_GENERATOR_SCOPE/);
  }
  expect(() =>
    mapFemaFullLoadDieselTestFuel(database, {
      ...projectInput,
      annualFullLoadTestHoursPerUnit: undefined
    })
  ).toThrow(/INVALID_PROJECT_INPUT/);
});

test("fails native-formula and applicability mutations", async () => {
  const html = await readFile(artifactPath, "utf8");
  expect(() =>
    parseFemaGeneratorFuelingHtml(
      html.replace("0.07 gallons/hour", "0.08 gallons/hour")
    )
  ).toThrow(/FEMA_SOURCE_SCHEMA_DRIFT/);
  expect(() =>
    parseFemaGeneratorFuelingHtml(
      html.replace(
        "This applies for diesel fuel generators only.",
        "This applies for generators."
      )
    )
  ).toThrow(/FEMA_SOURCE_SCHEMA_DRIFT/);
});

test("rejects a corrupt retained artifact", async () => {
  const corruptPath = join(temporaryRoot, "corrupt.html");
  await writeFile(corruptPath, "not the FEMA source", "utf8");
  await expect(
    ingestFemaGeneratorFueling({
      artifactPath: corruptPath,
      database
    })
  ).rejects.toThrow(
    /ARTIFACT_SIZE_MISMATCH|CORRUPT_CHECKSUM/
  );
});

test("requires the offline runtime guard", () => {
  const previous = process.env.OS_RESEARCH_NETWORK;
  delete process.env.OS_RESEARCH_NETWORK;
  try {
    expect(() =>
      mapFemaFullLoadDieselTestFuel(
        database,
        projectInput
      )
    ).toThrow(/OFFLINE_GUARD_REQUIRED/);
  } finally {
    process.env.OS_RESEARCH_NETWORK = previous;
  }
});
