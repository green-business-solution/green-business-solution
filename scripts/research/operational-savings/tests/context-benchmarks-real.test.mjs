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
  inspectContextBenchmarkSchema,
  inspectLightingMarketSchema,
  schemaFromContextWorkbook,
  schemaFromLightingMarketWorkbook
} from "../adapters/context-benchmarks/inspect-schema.mjs";
import {
  CONTEXT_CALCULATOR_ARTIFACT,
  DOE_LIGHTING_MARKET_ARTIFACT,
  ingestContextBenchmarks,
  ingestLightingMarketBenchmarks,
  mapExistingExteriorLightingToItc02,
  mapRackDishwasherActivityToItc52,
  recordExistingExteriorLightingBenchmark,
  recordRackDishwasherActivity,
  resolveExistingExteriorLightingWattage,
  resolveRackDishwasherDefault
} from "../adapters/context-benchmarks/run.mjs";
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
const lightingArtifactPath = join(
  repoRoot,
  "scripts/research/operational-savings/.cache/artifacts/doe-lmc-2015-tables.xlsx"
);

let database;
let temporaryRoot;
let ingestion;
let lightingIngestion;

beforeAll(async () => {
  process.env.OS_RESEARCH_NETWORK = "disabled";
  temporaryRoot = await mkdtemp(
    join(tmpdir(), "retrofi-context-benchmarks-")
  );
  database = await openResearchDatabase(
    join(temporaryRoot, "research.sqlite"),
    { deferReleasePublicationUntilClose: true }
  );
  ingestion = await ingestContextBenchmarks({
    artifactPath,
    database
  });
  lightingIngestion = await ingestLightingMarketBenchmarks({
    artifactPath: lightingArtifactPath,
    database
  });
});

afterAll(async () => {
  database?.close();
  if (temporaryRoot) {
    await rm(temporaryRoot, { recursive: true, force: true });
  }
});

test("publishes exact official dishwasher and cooktop benchmark cells", async () => {
  expect(await sha256File(artifactPath)).toBe(
    CONTEXT_CALCULATOR_ARTIFACT.sha256
  );
  expect(ingestion.schema.dishwasherActivityDefaults).toHaveLength(9);
  expect(ingestion.schema.cooktopDuty).toEqual([
    {
      reference: "C17",
      role: "conventionalCookingEfficiency",
      value: 0.7603,
      unit: "fraction"
    },
    {
      reference: "D17",
      role: "energyStarCookingEfficiency",
      value: 0.8,
      unit: "fraction"
    },
    {
      reference: "C20",
      role: "conventionalBoilCycleEnergy",
      value: 1.03,
      unit: "kWh/boil cycle"
    },
    {
      reference: "D20",
      role: "energyStarBoilCycleEnergy",
      value: 0.91,
      unit: "kWh/boil cycle"
    }
  ]);
  expect(
    database.prepare(`
      SELECT count(*) AS count
      FROM benchmark_populations
      WHERE source_release_id =
        'release:energy-star-cfs-calculator:2024-03:context'
    `).get().count
  ).toBe(10);
  expect(
    database.prepare(`
      SELECT count(*) AS count
      FROM benchmark_values v
      JOIN benchmark_populations p ON p.id = v.population_id
      WHERE p.source_release_id =
        'release:energy-star-cfs-calculator:2024-03:context'
    `).get().count
  ).toBe(13);
});

test("resolves one exact dishwasher class and reaches annual racks", () => {
  expect(
    resolveRackDishwasherDefault(database, {
      sanitationMethod: "low temperature",
      machineType: "under counter"
    })
  ).toMatchObject({
    value: 75,
    unit: "racks/operating day",
    selectionRule: "OFFICIAL_CALCULATOR_DEFAULT",
    filters: {
      sanitationMethod: "Low Temperature",
      machineType: "Under Counter",
      nativeCell: "E6"
    }
  });
  const result = mapRackDishwasherActivityToItc52(database, {
    sanitationMethod: "Low Temperature",
    machineType: "Under Counter",
    operatingDaysPerWeek: 5,
    activeWeeksPerYear: 52
  });
  expect(result.values).toEqual({
    annual_racks_per_unit: 19500
  });
  expect(result.formulaBindings).toEqual([
    {
      outputName: "Annual racks per equipment unit",
      formulaTerm: "annual_racks_per_unit",
      value: 19500,
      unit: "racks/year",
      scope: "PER_EQUIPMENT_UNIT"
    }
  ]);
  const runId = recordRackDishwasherActivity(database, result);
  expect(
    database.prepare(`
      SELECT formula_term AS formulaTerm, value, unit, scope, selection_rule AS selectionRule
      FROM selected_values
      WHERE calculation_run_id = ?
    `).get(runId)
  ).toEqual({
    formulaTerm: "annual_racks_per_unit",
    value: 19500,
    unit: "racks/year",
    scope: "PER_EQUIPMENT_UNIT",
    selectionRule: "OFFICIAL_CALCULATOR_DEFAULT"
  });
});

test("publishes all nine official Table 4-29 outdoor averages", async () => {
  expect(await sha256File(lightingArtifactPath)).toBe(
    DOE_LIGHTING_MARKET_ARTIFACT.sha256
  );
  expect(lightingIngestion.schema).toMatchObject({
    workbookSheetCount: 61,
    worksheet: {
      name: "Table 4-29",
      dimension: "A1:L14",
      applicationColumn: "A5:A13",
      averageWattageColumn: "L5:L13"
    }
  });
  expect(lightingIngestion.schema.applicationAverages).toHaveLength(9);
  expect(
    database.prepare(`
      SELECT count(*) AS count
      FROM benchmark_populations
      WHERE source_release_id =
        'release:doe-lmc-2015-tables:2017-11'
    `).get().count
  ).toBe(9);
});

test("resolves an exact outdoor subsector and reaches ITC-02 existing_kW", () => {
  expect(resolveExistingExteriorLightingWattage(database, {
    application: "building exterior: c&i"
  })).toMatchObject({
    value: 97,
    unit: "watts/lamp-or-luminaire",
    selectionRule: "OFFICIAL_2015_OUTDOOR_SUBSECTOR_AVERAGE",
    filters: {
      application: "Building Exterior: C&I",
      applicationCell: "A7",
      averageCell: "L7",
      sourceTable: "Table 4-29"
    }
  });
  const result = mapExistingExteriorLightingToItc02(database, {
    application: "Building Exterior: C&I"
  });
  expect(result.values).toEqual({ existing_kW: 0.097 });
  expect(result.formulaBindings).toEqual([
    {
      outputName: "One existing input-watt value per fixture",
      formulaTerm: "existing_kW",
      value: 0.097,
      unit: "kW/fixture",
      scope: "PER_FIXTURE"
    }
  ]);
  const runId = recordExistingExteriorLightingBenchmark(
    database,
    result
  );
  expect(
    database.prepare(`
      SELECT formula_term AS formulaTerm, value, unit, scope
      FROM selected_values
      WHERE calculation_run_id = ?
    `).get(runId)
  ).toEqual({
    formulaTerm: "existing_kW",
    value: 0.097,
    unit: "kW/fixture",
    scope: "PER_FIXTURE"
  });
});

test("allows an explicit project activity without presenting it as a source default", () => {
  const result = mapRackDishwasherActivityToItc52(database, {
    sanitationMethod: "Low Temperature",
    machineType: "Under Counter",
    racksPerOperatingDay: 100,
    operatingDaysPerWeek: 4,
    activeWeeksPerYear: 50
  });
  expect(result.values.annual_racks_per_unit).toBe(20000);
  expect(result.selectionRule).toBe("EXACT_PROJECT_INPUT");
  expect(result.provenance.sourceFields).toEqual([]);
});

test("fails changed benchmark cells and worksheet shapes", async () => {
  const [workbook, dishwasher, cooktop] = await Promise.all([
    inspectWorkbook(artifactPath),
    readWorksheet(artifactPath, "Dishwasher Calcs"),
    readWorksheet(artifactPath, "Electric Cooktop Calcs")
  ]);
  const changed = structuredClone(dishwasher);
  changed.rows
    .find((row) => row.rowNumber === 6)
    .cells.find((cell) => cell?.reference === "E6").value = 76;
  expect(() =>
    schemaFromContextWorkbook({
      workbook,
      dishwasher: changed,
      cooktop
    })
  ).toThrow(/SOURCE_SCHEMA_DRIFT.*E6 changed/);
  const wrongShape = {
    ...structuredClone(cooktop),
    dimension: "A1:P46"
  };
  expect(() =>
    schemaFromContextWorkbook({
      workbook,
      dishwasher,
      cooktop: wrongShape
    })
  ).toThrow(/SOURCE_SCHEMA_DRIFT.*Electric Cooktop Calcs dimension/);
});

test("fails Table 4-29 header, application, and value mutations", async () => {
  const [workbook, table] = await Promise.all([
    inspectWorkbook(lightingArtifactPath),
    readWorksheet(lightingArtifactPath, "Table 4-29")
  ]);
  const changedHeader = structuredClone(table);
  changedHeader.rows
    .find((row) => row.rowNumber === 3)
    .cells.find((cell) => cell?.reference === "L3").value =
      "Mean";
  expect(() => schemaFromLightingMarketWorkbook({
    workbook,
    table: changedHeader
  })).toThrow(/SOURCE_SCHEMA_DRIFT.*L3 changed/);

  const changedValue = structuredClone(table);
  changedValue.rows
    .find((row) => row.rowNumber === 7)
    .cells.find((cell) => cell?.reference === "L7").value =
      "N/A";
  expect(() => schemaFromLightingMarketWorkbook({
    workbook,
    table: changedValue
  })).toThrow(/SOURCE_SCHEMA_DRIFT.*L7/);
});

test("fails unsupported classes and invalid schedules", () => {
  expect(() =>
    resolveRackDishwasherDefault(database, {
      sanitationMethod: "High Temperature",
      machineType: "Flight Machine"
    })
  ).toThrow(/NO_EXACT_MATCH/);
  expect(() =>
    mapRackDishwasherActivityToItc52(database, {
      sanitationMethod: "Low Temperature",
      machineType: "Under Counter",
      operatingDaysPerWeek: 8,
      activeWeeksPerYear: 52
    })
  ).toThrow(/INVALID_SCHEDULE_INPUT.*operatingDaysPerWeek/);
  expect(() => resolveExistingExteriorLightingWattage(database, {
    application: "Warehouse aisle"
  })).toThrow(/NO_EXACT_MATCH/);
});

test("fails a corrupt workbook checksum", async () => {
  const corrupt = join(temporaryRoot, "corrupt-context.xlsx");
  await writeFile(corrupt, "not an xlsx\n", "utf8");
  await expect(
    verifyArtifact(corrupt, CONTEXT_CALCULATOR_ARTIFACT)
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
      resolveRackDishwasherDefault(database, {
        sanitationMethod: "Low Temperature",
        machineType: "Under Counter"
      })
    ).toThrow(/OFFLINE_GUARD_REQUIRED/);
    await expect(
      inspectContextBenchmarkSchema(artifactPath)
    ).resolves.toMatchObject({
      format: "XLSX_OOXML"
    });
    await expect(
      inspectLightingMarketSchema(lightingArtifactPath)
    ).resolves.toMatchObject({
      format: "XLSX_OOXML"
    });
    expect(() => mapExistingExteriorLightingToItc02(database, {
      application: "Parking"
    })).toThrow(/OFFLINE_GUARD_REQUIRED/);
    expect(fetchCalls).toBe(0);
  } finally {
    process.env.OS_RESEARCH_NETWORK = previousNetwork;
    globalThis.fetch = previousFetch;
  }
});
