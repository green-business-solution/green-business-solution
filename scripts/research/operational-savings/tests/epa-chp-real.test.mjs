import {
  mkdtemp,
  readFile,
  rm
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, beforeAll, expect, test } from "vitest";

import {
  acquireEpaBiomassChpCatalog
} from "../adapters/epa-chp/acquire.mjs";
import {
  epaBiomassChpPerformanceId,
  epaChpCatalogPerformanceId,
  ingestEpaBiomassChpCatalog,
  ingestEpaChpCatalog,
  mapBiomassChpSystemToItc22,
  mapChpSystemToProcess,
  mapChpSystemToItc21,
  parseBiomassChpCatalogText,
  parseChpCatalogText,
  recordEpaChpFormulaMapping,
  resolveBiomassChpSystem,
  resolveChpCatalogSystem
} from "../adapters/epa-chp/run.mjs";
import { openResearchDatabase } from "../lib/sqlite.mjs";

const repoRoot = fileURLToPath(new URL("../../../..", import.meta.url));
const artifactPath = join(
  repoRoot,
  "scripts/research/operational-savings/.cache/artifacts/epa-chp-catalog.pdf"
);
const biomassArtifactPath = join(
  repoRoot,
  "scripts/research/operational-savings/.cache/artifacts/epa-biomass-chp-catalog-v1.1.pdf"
);

let database;
let ingestion;
let biomassIngestion;
let temporaryRoot;

beforeAll(async () => {
  process.env.OS_RESEARCH_NETWORK = "disabled";
  temporaryRoot = await mkdtemp(
    join(tmpdir(), "retrofi-chp-proof-")
  );
  database = await openResearchDatabase(
    join(temporaryRoot, "research.sqlite"),
    { deferReleasePublicationUntilClose: true }
  );
  ingestion = await ingestEpaChpCatalog({ artifactPath, database });
  biomassIngestion = await ingestEpaBiomassChpCatalog({
    artifactPath: biomassArtifactPath,
    database
  });
}, 30_000);

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

test("extracts all three real EPA catalog tables into typed rows", () => {
  expect(ingestion.records).toHaveLength(16);
  expect(ingestion.records[0]).toMatchObject({
    technology: "Natural gas spark-ignition reciprocating engine",
    system: 1,
    capacityKw: 100,
    electricalEfficiencyHhv: 0.27,
    totalEfficiencyHhv: 0.8,
    powerToHeatRatio: 0.51,
    sourcePages: [36, 37]
  });
  expect(
    database.prepare("SELECT count(*) AS count FROM chp_catalog_performance").get().count
  ).toBe(16);
  expect(
    database.prepare(`
      SELECT id
      FROM source_registry
      WHERE id LIKE 'source:epa%chp%'
      ORDER BY id
    `).all()
  ).toEqual([
    { id: "source:epa-biomass-chp-catalog-v1.1" },
    { id: "source:epa-chp-catalog-2017" }
  ]);
});

test("scopes CHP performance identities to each exact source release", () => {
  const chpRecord = ingestion.records[0];
  const chpId = epaChpCatalogPerformanceId(
    chpRecord,
    ingestion.releaseId
  );
  const laterChpId = epaChpCatalogPerformanceId(
    chpRecord,
    "release:epa-chp-catalog:later"
  );
  const biomassId = epaBiomassChpPerformanceId(
    biomassIngestion.record,
    biomassIngestion.releaseId
  );
  const laterBiomassId =
    epaBiomassChpPerformanceId(
      biomassIngestion.record,
      "release:epa-biomass-chp-catalog:later"
    );
  expect(laterChpId).not.toBe(chpId);
  expect(laterBiomassId).not.toBe(biomassId);
  expect(
    database.prepare(`
      SELECT id, source_release_id AS sourceReleaseId
      FROM chp_catalog_performance
      WHERE id = ?
    `).get(chpId)
  ).toEqual({
    id: chpId,
    sourceReleaseId: ingestion.releaseId
  });
  expect(
    database.prepare(`
      SELECT id, source_release_id AS sourceReleaseId
      FROM biomass_chp_performance
      WHERE id = ?
    `).get(biomassId)
  ).toEqual({
    id: biomassId,
    sourceReleaseId: biomassIngestion.releaseId
  });
});

test("acquires the official biomass PDF immutably", async () => {
  const acquisitionRoot = await mkdtemp(
    join(tmpdir(), "retrofi-chp-acquisition-")
  );
  try {
    const destination = join(
      acquisitionRoot,
      "biomass.pdf"
    );
    const bytes = await readFile(biomassArtifactPath);
    const fetchImplementation = async () => new Response(bytes, {
      status: 200,
      headers: { "content-type": "application/pdf" }
    });
    const acquired = await acquireEpaBiomassChpCatalog({
      artifactPath: destination,
      fetchImplementation
    });
    expect(acquired).toMatchObject({
      publication: "ACQUIRED",
      byteSize: 5817000,
      sha256:
        "fbb7af3824eaf83a01ecb97aa070cc250fcdc3cb9702cc25f72061720ce5c959"
    });
    expect((await acquireEpaBiomassChpCatalog({
      artifactPath: destination,
      fetchImplementation
    })).publication).toBe("ALREADY_PRESENT");
    const changedBytes = Buffer.from(bytes);
    changedBytes[changedBytes.length - 10] ^= 1;
    await expect(acquireEpaBiomassChpCatalog({
      artifactPath: destination,
      fetchImplementation: async () =>
        new Response(changedBytes, {
          status: 200,
          headers: {
            "content-type": "application/pdf"
          }
        })
    })).rejects.toThrow(
      /IMMUTABLE_SNAPSHOT_CONFLICT/
    );
  } finally {
    await rm(acquisitionRoot, {
      recursive: true,
      force: true
    });
  }
});

test("resolves a real table system exactly", () => {
  expect(resolveChpCatalogSystem(database, {
    technology: "Microturbine",
    system: 6
  })).toMatchObject({
    capacityKw: 950,
    electricalEfficiencyHhv: 0.266,
    totalEfficiencyHhv: 0.631,
    powerToHeatRatio: 0.73,
    sourcePage: 98
  });
  expect(resolveChpCatalogSystem(database, {
    technology: "Fuel cell - MCFC",
    system: 3
  })).toMatchObject({
    capacityKw: 300,
    electricalEfficiencyHhv: 0.47,
    totalEfficiencyHhv: 0.82,
    powerToHeatRatio: 1.34,
    fuelInputMmbtuPerHour: 2.2,
    sourcePage: 123
  });
});

test("extracts and publishes the real biomass Table 7-15 system", () => {
  expect(biomassIngestion.record).toEqual({
    systemName: "EPA Table 7-15 representative modular biomass system",
    conversionTechnology:
      "Downdraft gasifier, gas cleanup, IC engine prime mover",
    commercializationStatus:
      "Several field demonstrations; no commercial installations",
    capacityKw: 50,
    thermalOutputMmbtuPerHour: 0.6,
    powerToHeatRatio: 0.28,
    biomassFuelInputMmbtuPerHour: 0.098,
    electricalEfficiency: 0.15,
    totalEfficiency: 0.677,
    operatingFactor: 0.8,
    sourceTable: "Table 7-15",
    sourceDocumentPage: 95,
    sourcePdfPage: 105,
    speculative: true
  });
  expect(
    database.prepare(
      "SELECT count(*) AS count FROM biomass_chp_performance"
    ).get().count
  ).toBe(1);
  expect(biomassIngestion.warnings).toEqual([
    "SOURCE_LABELS_PERFORMANCE_SPECULATIVE",
    "SOURCE_REPORTS_NO_COMMERCIAL_INSTALLATIONS"
  ]);
});

test("resolves the biomass system only by exact technology and capacity", () => {
  expect(resolveBiomassChpSystem(database, {
    conversionTechnology:
      "Downdraft gasifier, gas cleanup, IC engine prime mover",
    installedCapacityKw: 50
  })).toMatchObject({
    capacityKw: 50,
    biomassFuelInputMmbtuPerHour: 0.098,
    thermalOutputMmbtuPerHour: 0.6,
    speculative: true
  });
  expect(() => resolveBiomassChpSystem(database, {
    conversionTechnology:
      "Downdraft gasifier, gas cleanup, IC engine prime mover",
    installedCapacityKw: 51
  })).toThrow(/NO_EXACT_MATCH/);
});

test("reaches every ITC-22 formula term from the official representative system", () => {
  const result = mapBiomassChpSystemToItc22(database, {
    conversionTechnology:
      "Downdraft gasifier, gas cleanup, IC engine prime mover",
    installedCapacityKw: 50,
    annualOperatingHours: 7008
  });
  expect(result.values).toEqual({
    generation: 350400,
    scheduled_input_fuel: expect.closeTo(686.784, 8),
    useful_heat: expect.closeTo(4204.8, 8)
  });
  expect(result.formulaBindings.map(({ formulaTerm }) => formulaTerm))
    .toEqual([
      "generation",
      "scheduled_input_fuel",
      "useful_heat"
    ]);
  expect(result.formulaBindings.map((binding) => [
    binding.unit,
    binding.physicalUnit
  ])).toEqual([
    ["kWh/year", "kWh/year"],
    ["resource-unit/year", "MMBtu/year"],
    ["energy/year", "MMBtu/year"]
  ]);
  expect(result.warnings).toContain(
    "SOURCE_LABELS_PERFORMANCE_SPECULATIVE"
  );
});

test("publishes ITC-22 values with biomass-artifact provenance", () => {
  const result = mapBiomassChpSystemToItc22(database, {
    conversionTechnology:
      "Downdraft gasifier, gas cleanup, IC engine prime mover",
    installedCapacityKw: 50,
    annualOperatingHours: 7008
  });
  const calculationId = recordEpaChpFormulaMapping(database, result);
  expect(calculationId).toContain(
    `:${biomassIngestion.releaseId}:`
  );
  expect(
    database.prepare(`
      SELECT formula_term AS formulaTerm, unit
      FROM selected_values
      WHERE calculation_run_id = ?
      ORDER BY formula_term
    `).all(calculationId)
  ).toEqual([
    { formulaTerm: "generation", unit: "kWh/year" },
    {
      formulaTerm: "scheduled_input_fuel",
      unit: "resource-unit/year"
    },
    { formulaTerm: "useful_heat", unit: "energy/year" }
  ]);
  expect(
    database.prepare(`
      SELECT DISTINCT source_artifact_id AS artifactId
      FROM selected_value_provenance
      WHERE selected_value_id LIKE ?
    `).all(`${calculationId}:%`)
  ).toEqual([
    { artifactId: "artifact:epa-biomass-chp-catalog:v1.1" }
  ]);
});

test("reaches every ITC-21 formula term from one exact real system", () => {
  const result = mapChpSystemToItc21(database, {
    technology: "Natural gas spark-ignition reciprocating engine",
    system: 1,
    annualOperatingHours: 6000
  });
  expect(result.values.generation).toBe(600000);
  expect(result.values.CHP_input_fuel).toBeCloseTo(7582.222222222223, 8);
  expect(result.values.useful_heat).toBeCloseTo(4018.577777777778, 8);
  expect(result.formulaBindings.map((binding) => binding.formulaTerm)).toEqual([
    "generation",
    "CHP_input_fuel",
    "useful_heat"
  ]);
  expect(result.formulaBindings.map((binding) => [
    binding.unit,
    binding.physicalUnit
  ])).toEqual([
    ["kWh/year", "kWh/year"],
    ["fuel-unit/year", "MMBtu/year"],
    ["energy/year", "MMBtu/year"]
  ]);
  expect(result.provenance.artifactSha256).toHaveLength(64);
});

test("maps the same exact real system to the ITC-26 microgrid balance", () => {
  const result = mapChpSystemToProcess(database, {
    categoryId: "ITC-26",
    technology: "Natural gas spark-ignition reciprocating engine",
    system: 1,
    annualOperatingHours: 6000
  });
  expect(result.values).toEqual({
    generation: 600000,
    input_fuel: expect.closeTo(7582.222222222223, 8),
    useful_heat: expect.closeTo(4018.577777777778, 8)
  });
  expect(result.formulaBindings.map(({ formulaTerm }) => formulaTerm)).toEqual([
    "generation",
    "input_fuel",
    "useful_heat"
  ]);
});

test("maps an exact fuel-cell table row to every ITC-20 formula term", () => {
  const result = mapChpSystemToProcess(database, {
    categoryId: "ITC-20",
    technology: "Fuel cell - MCFC",
    system: 3,
    annualOperatingHours: 6000
  });
  expect(result.values.annual_generation).toBe(1_800_000);
  expect(result.values.added_fuel).toBeCloseTo(13_200, 8);
  expect(result.formulaBindings.map(({ formulaTerm }) => formulaTerm)).toEqual([
    "annual_generation",
    "added_fuel"
  ]);
  expect(result.provenance.sourceFields).toContain(
    "Fuel Input (MMBtu/hr), HHV"
  );
});

test("publishes an exact real CHP output set and provenance", () => {
  const result = mapChpSystemToItc21(database, {
    technology: "Natural gas spark-ignition reciprocating engine",
    system: 1,
    annualOperatingHours: 6000
  });
  const calculationId = recordEpaChpFormulaMapping(database, result);
  expect(calculationId).toContain(
    `:${ingestion.releaseId}:`
  );
  expect(
    database.prepare(`
      SELECT formula_term AS formulaTerm, unit, scope
      FROM selected_values
      WHERE calculation_run_id = ?
      ORDER BY formula_term
    `).all(calculationId)
  ).toEqual([
    {
      formulaTerm: "CHP_input_fuel",
      unit: "fuel-unit/year",
      scope: "PROJECT_TOTAL"
    },
    {
      formulaTerm: "generation",
      unit: "kWh/year",
      scope: "PROJECT_TOTAL"
    },
    {
      formulaTerm: "useful_heat",
      unit: "energy/year",
      scope: "PROJECT_TOTAL"
    }
  ]);
  expect(
    database.prepare(`
      SELECT count(*) AS count
      FROM selected_value_provenance
      WHERE source_artifact_id = 'artifact:epa-chp-catalog:2017-09'
    `).get().count
  ).toBe(3);
});

test("fails closed when an actual required table row is missing", () => {
  const mutation = [
    "Table 2-2. Gas Spark Ignition Engine CHP - Typical Performance Parameters",
    "System",
    "Baseload Electric Capacity (kW) 100 633 1,121 3,326 9,341",
    "Electrical Efficiency (%), HHV 27.0% 34.5% 36.8% 40.4% 41.6%",
    "Total Efficiency [%)",
    "19",
    "80.0% 78.9% 78.4% 78.3% 76.5%",
    "Power / Heat Ratio",
    "20",
    "0.51 0.78 0.89 1.06 1.19",
    "2.4.1 Part Load Performance",
    "Table 5-2. Microturbine Cost and Performance Characteristics",
    "System",
    "Net Electricity Capacity (kW) 28 61 190 240 320 950",
    "Electric Efficiency (%), HHV 21.9% 23.7% 26.6% 26.0% 28.0% 26.6%",
    "Total CHP Efficiency (%), HHV [4] 70.0% 70.4% 63.0% 66.9% 67.5% 63.1%",
    "5.4.1 Part-Load Performance",
    "Table 6-3. Fuel Cell CHP - Typical Performance Parameters",
    "Performance Characteristics System 1 System 2 System 3 System 4 System 5",
    "Fuel Cell Type PEMFC SOFC MCFC PAFC MCFC",
    "Nominal Electricity Capacity (kW) 0.7 1.5 300 400 1,400",
    "Net Electrical Efficiency (%), HHV) 35.3% 54.4% 47% 34.3% 42.5%",
    "Fuel Input (MMBtu/hr), HHV 0.0068 0.0094 2.2 4.0 11.2",
    "Total CHP Efficiency (%), HHV 86% 74% 82% 81% 82%",
    "Power to Heat Ratio 0.70 2.78 1.34 0.73 1.08",
    "6.4.1 Electrical Efficiency"
  ].join("\n");
  expect(() => parseChpCatalogText(mutation)).toThrow(
    /SOURCE_SCHEMA_DRIFT: missing row Power\/Heat Ratio \[5\]/
  );
});

test("fails closed when the biomass table loses native evidence", () => {
  expect(() => parseBiomassChpCatalogText([
    "Table 7-15. Modular Biomass System Cost and Performance Estimates",
    "System Characteristic Performance Value",
    "Equipment type Downdraft gasifier, gas cleanup, IC",
    "engine prime mover",
    "Commercialization status Several field demonstrations in the United",
    "States and internationally",
    "No commercial installations",
    "Equipment size (kW) 50",
    "Thermal output (Btu/hr) 600,000",
    "Power to heat ratio 0.28",
    "Electric efficiency (est.) (%) 15",
    "CHP efficiency (%) 67.70",
    "Plant operating factor",
    "$2.00",
    "$8.00",
    "80",
    "Appendix A"
  ].join("\n"))).toThrow(
    /SOURCE_SCHEMA_DRIFT: missing row Biomass fuel use/
  );
});

test("rejects invalid operating hours and unknown systems", () => {
  expect(() => mapChpSystemToItc21(database, {
    technology: "Microturbine",
    system: 1,
    annualOperatingHours: 9000
  })).toThrow(/INVALID_MODEL_INPUT/);
  expect(() => resolveChpCatalogSystem(database, {
    technology: "Microturbine",
    system: 99
  })).toThrow(/NO_EXACT_MATCH/);
  expect(() => mapChpSystemToProcess(database, {
    categoryId: "ITC-22",
    technology: "Microturbine",
    system: 1,
    annualOperatingHours: 6000
  })).toThrow(/UNSUPPORTED_CHP_PROCESS/);
  expect(() => mapBiomassChpSystemToItc22(database, {
    conversionTechnology:
      "Downdraft gasifier, gas cleanup, IC engine prime mover",
    installedCapacityKw: 50,
    annualOperatingHours: 9000
  })).toThrow(/INVALID_MODEL_INPUT/);
});

test("requires the offline guard", () => {
  const previous = process.env.OS_RESEARCH_NETWORK;
  delete process.env.OS_RESEARCH_NETWORK;
  expect(() => mapChpSystemToItc21(database, {
    technology: "Microturbine",
    system: 1,
    annualOperatingHours: 6000
  })).toThrow(/OFFLINE_GUARD_REQUIRED/);
  process.env.OS_RESEARCH_NETWORK = previous;
});
