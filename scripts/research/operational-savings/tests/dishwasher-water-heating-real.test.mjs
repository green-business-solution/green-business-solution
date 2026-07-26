import {
  mkdtemp,
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
  inspectDishwasherWaterHeatingSchema,
  schemaFromDishwasherWorksheets
} from "../adapters/dishwasher-water-heating/inspect-schema.mjs";
import {
  DISHWASHER_CALCULATOR_ARTIFACT,
  ingestDishwasherWaterHeatingWorkbook,
  mapDishwasherWaterHeatingToItc52,
  recordDishwasherWaterHeatingRun
} from "../adapters/dishwasher-water-heating/run.mjs";
import {
  sha256File,
  verifyArtifact
} from "../lib/artifact.mjs";
import { openResearchDatabase } from "../lib/sqlite.mjs";
import {
  inspectWorkbook,
  readWorksheet
} from "../lib/xlsx.mjs";

const repoRoot = fileURLToPath(new URL("../../../..", import.meta.url));
const artifactPath = join(
  repoRoot,
  "scripts/research/operational-savings/.cache/artifacts/energy-star-cfs-calculator.xlsx"
);

let database;
let temporaryRoot;
let ingestion;

beforeAll(async () => {
  process.env.OS_RESEARCH_NETWORK = "disabled";
  temporaryRoot = await mkdtemp(
    join(tmpdir(), "retrofi-dishwasher-water-heating-")
  );
  database = await openResearchDatabase(
    join(temporaryRoot, "research.sqlite"),
    { deferReleasePublicationUntilClose: true }
  );
  ingestion = await ingestDishwasherWaterHeatingWorkbook({
    artifactPath,
    database
  });
});

afterAll(async () => {
  database?.close();
  if (temporaryRoot) {
    await rm(temporaryRoot, { recursive: true, force: true });
  }
});

test("verifies the official workbook and extracts exact cells and formulas", async () => {
  expect(await sha256File(artifactPath)).toBe(
    DISHWASHER_CALCULATOR_ARTIFACT.sha256
  );
  expect(ingestion.artifact.byteSize).toBe(
    DISHWASHER_CALCULATOR_ARTIFACT.byteSize
  );
  expect(ingestion.schema.workbookSheetCount).toBe(15);
  expect(ingestion.schema.worksheetDimension).toBe("A1:Q104");
  expect(ingestion.schema.requiredCells).toHaveLength(14);
  expect(
    ingestion.schema.requiredCells.find(
      (cell) => cell.reference === "C39"
    )
  ).toMatchObject({
    value: 0.17179180757885015,
    formula:
      "E20*I18*I19/C20/'General Assumptions'!C63",
    unit: "kWh/gallon"
  });
  expect(
    database.prepare(`
      SELECT count(*) AS count
      FROM calculation_assumptions
      WHERE standard_id = 'STD-DISHWASHER-WATER-HEATING'
    `).get().count
  ).toBe(8);
  expect(
    database.prepare(`
      SELECT count(*) AS count
      FROM model_input_schemas
      WHERE model_version_id =
        'model:energy-star-dishwasher-water-heating:2024-03'
    `).get().count
  ).toBe(1);
});

test("reproduces the workbook electric building and booster factors", () => {
  const rack = mapDishwasherWaterHeatingToItc52({
    nativeBasis: "rack",
    sanitationMethod: "HIGH_TEMPERATURE",
    resource: "electric",
    existingWaterQuantity: 1.29,
    proposedWaterQuantity: 0.89,
    buildingTemperatureRiseF: 70,
    boosterTemperatureRiseF: 40,
    waterHeaterEfficiency: 0.98,
    boosterHeaterEfficiency: 0.98
  });
  expect(
    rack.values.dishwasher_water_heating_result
      .totalResourceInputPerGallon
  ).toBeCloseTo(
    0.17179180757885015 + 0.09816674718791438,
    14
  );
  expect(
    rack.values.water_heating_R_per_rack_existing
  ).toBeCloseTo(0.3482465356491263, 14);
  expect(
    rack.values.water_heating_R_per_rack_proposed
  ).toBeCloseTo(0.24026311374242046, 14);
  expect(rack.formulaBindings).toEqual([
    expect.objectContaining({
      formulaTerm: "dishwasher_water_heating_result",
      unit: "record set",
      scope: "RECORD_SET"
    }),
    expect.objectContaining({
      formulaTerm: "water_heating_R_per_rack_existing",
      nativeUnit: "kWh/rack",
      unit: "resource/certified activity",
      scope: "PER_EVENT"
    }),
    expect.objectContaining({
      formulaTerm: "water_heating_R_per_rack_proposed",
      nativeUnit: "kWh/rack",
      unit: "resource/certified activity",
      scope: "PER_EVENT"
    })
  ]);
  const runId = recordDishwasherWaterHeatingRun(database, rack);
  expect(
    database.prepare(`
      SELECT formula_term AS formulaTerm, unit, scope
      FROM selected_values
      WHERE calculation_run_id = ?
      ORDER BY formula_term
    `).all(runId)
  ).toEqual([
    {
      formulaTerm: "water_heating_R_per_rack_existing",
      unit: "resource/certified activity",
      scope: "PER_EVENT"
    },
    {
      formulaTerm: "water_heating_R_per_rack_proposed",
      unit: "resource/certified activity",
      scope: "PER_EVENT"
    }
  ]);
});

test("preserves the hourly branch without converting it to racks", () => {
  const hourly = mapDishwasherWaterHeatingToItc52({
    nativeBasis: "hour",
    sanitationMethod: "HIGH_TEMPERATURE",
    resource: "electric",
    existingWaterQuantity: 75,
    proposedWaterQuantity: 52,
    buildingTemperatureRiseF: 70,
    boosterTemperatureRiseF: 40,
    waterHeaterEfficiency: 0.98,
    boosterHeaterEfficiency: 0.98
  });
  expect(
    hourly.values.water_heating_R_per_hour_existing
  ).toBeCloseTo(20.24689160750734, 13);
  expect(
    hourly.values.water_heating_R_per_hour_proposed
  ).toBeCloseTo(14.037844847871757, 13);
  expect(
    hourly.values.water_heating_R_per_rack_existing
  ).toBeUndefined();
  expect(hourly.formulaBindings[1]).toMatchObject({
    formulaTerm: "water_heating_R_per_hour_existing",
    nativeUnit: "kWh/hour",
    unit: "resource/hour",
    scope: "PER_HOUR"
  });
});

test("uses only the building stage for low-temperature machines", () => {
  const lowTemperature = mapDishwasherWaterHeatingToItc52({
    nativeBasis: "rack",
    sanitationMethod: "LOW_TEMPERATURE",
    resource: "natural gas",
    existingWaterQuantity: 1.73,
    proposedWaterQuantity: 1.19,
    buildingTemperatureRiseF: 70,
    waterHeaterEfficiency: 0.8
  });
  expect(
    lowTemperature.values.dishwasher_water_heating_result.sourceStages
  ).toHaveLength(1);
  expect(
    lowTemperature.values.dishwasher_water_heating_result
      .totalResourceInputPerGallon
  ).toBeCloseTo(0.007182486631016042, 15);
});

test("fails mutations to a required workbook formula or cell", async () => {
  const [workbook, dishwasher, general] = await Promise.all([
    inspectWorkbook(artifactPath),
    readWorksheet(artifactPath, "Dishwasher Calcs"),
    readWorksheet(artifactPath, "General Assumptions")
  ]);
  const changedFormula = structuredClone(dishwasher);
  changedFormula.rows
    .find((row) => row.rowNumber === 39)
    .cells.find((cell) => cell?.reference === "C39").formula =
      "E20*I18*I19/C20/3412";
  expect(() =>
    schemaFromDishwasherWorksheets({
      workbook,
      dishwasher: changedFormula,
      general
    })
  ).toThrow(/SOURCE_SCHEMA_DRIFT.*C39 formula/);

  const missingCell = structuredClone(dishwasher);
  const row = missingCell.rows.find(
    (candidate) => candidate.rowNumber === 40
  );
  const index = row.cells.findIndex(
    (cell) => cell?.reference === "D40"
  );
  row.cells[index] = undefined;
  expect(() =>
    schemaFromDishwasherWorksheets({
      workbook,
      dishwasher: missingCell,
      general
    })
  ).toThrow(/SOURCE_SCHEMA_DRIFT.*D40 is missing/);
});

test("fails unsupported branches and invalid physical inputs", () => {
  const base = {
    nativeBasis: "rack",
    sanitationMethod: "HIGH_TEMPERATURE",
    resource: "electric",
    existingWaterQuantity: 1,
    proposedWaterQuantity: 0.8,
    buildingTemperatureRiseF: 70,
    boosterTemperatureRiseF: 40,
    waterHeaterEfficiency: 0.98,
    boosterHeaterEfficiency: 0.98
  };
  expect(() =>
    mapDishwasherWaterHeatingToItc52({
      ...base,
      resource: "propane"
    })
  ).toThrow(/UNSUPPORTED_RESOURCE/);
  expect(() =>
    mapDishwasherWaterHeatingToItc52({
      ...base,
      sanitationMethod: "DUAL"
    })
  ).toThrow(/UNSUPPORTED_SANITATION_METHOD/);
  expect(() =>
    mapDishwasherWaterHeatingToItc52({
      ...base,
      waterHeaterEfficiency: 0
    })
  ).toThrow(/INVALID_MODEL_INPUT.*waterHeaterEfficiency/);
  expect(() =>
    mapDishwasherWaterHeatingToItc52({
      ...base,
      nativeBasis: "square foot"
    })
  ).toThrow(/UNSUPPORTED_NATIVE_BASIS/);
});

test("fails a corrupt workbook checksum", async () => {
  const corrupt = join(temporaryRoot, "corrupt-calculator.xlsx");
  await writeFile(corrupt, "not an xlsx\n", "utf8");
  await expect(
    verifyArtifact(corrupt, DISHWASHER_CALCULATOR_ARTIFACT)
  ).rejects.toThrow(/ARTIFACT_SIZE_MISMATCH|CORRUPT_CHECKSUM/);
});

test("requires offline mode and never calls fetch", async () => {
  const previousNetwork = process.env.OS_RESEARCH_NETWORK;
  const previousFetch = globalThis.fetch;
  let fetchCalls = 0;
  globalThis.fetch = async () => {
    fetchCalls += 1;
    throw new Error("network must not be called");
  };
  try {
    process.env.OS_RESEARCH_NETWORK = "enabled";
    expect(() =>
      mapDishwasherWaterHeatingToItc52({
        nativeBasis: "rack",
        sanitationMethod: "LOW_TEMPERATURE",
        resource: "electric",
        existingWaterQuantity: 1,
        proposedWaterQuantity: 0.8,
        buildingTemperatureRiseF: 70,
        waterHeaterEfficiency: 0.98
      })
    ).toThrow(/OFFLINE_GUARD_REQUIRED/);
    await expect(
      inspectDishwasherWaterHeatingSchema(artifactPath)
    ).resolves.toMatchObject({
      format: "XLSX_OOXML"
    });
    expect(fetchCalls).toBe(0);
  } finally {
    process.env.OS_RESEARCH_NETWORK = previousNetwork;
    globalThis.fetch = previousFetch;
  }
});
