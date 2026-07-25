import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, beforeAll, expect, test } from "vitest";

import {
  ENERGY_STAR_DISHWASHER_ARTIFACT,
  ENERGY_STAR_DISHWASHER_METADATA_ARTIFACT,
  energyStarDishwasherProductId,
  ingestEnergyStarDishwashers,
  mapExactProposedDishwasherToItc52,
  mapRequirementProposedDishwasherToItc52,
  recordItc52DishwasherFormulaMapping,
  resolveEnergyStarDishwasherByExactModel,
  resolveEnergyStarDishwasherByPdId,
  resolveEnergyStarDishwasherRequirements
} from "../adapters/energy-star/run.mjs";
import {
  schemaFromDishwasherRecords
} from "../adapters/energy-star/inspect-schema.mjs";
import {
  sha256File,
  verifyArtifact
} from "../lib/artifact.mjs";
import { openResearchDatabase } from "../lib/sqlite.mjs";

const repoRoot = fileURLToPath(new URL("../../../..", import.meta.url));
const artifactPath = join(
  repoRoot,
  "scripts/research/operational-savings/.cache/artifacts/energy-star-commercial-dishwashers-full.json"
);
const metadataPath = join(
  repoRoot,
  "scripts/research/operational-savings/.cache/artifacts/energy-star-commercial-dishwashers-metadata.json"
);

let database;
let temporaryRoot;
let ingestion;

beforeAll(async () => {
  process.env.OS_RESEARCH_NETWORK = "disabled";
  temporaryRoot = await mkdtemp(join(tmpdir(), "retrofi-energy-star-proof-"));
  database = await openResearchDatabase(
    join(temporaryRoot, "research.sqlite"),
    { deferReleasePublicationUntilClose: true }
  );
  ingestion = await ingestEnergyStarDishwashers({
    artifactPath,
    metadataPath,
    database
  });
});

afterAll(async () => {
  database?.close();
  if (temporaryRoot) {
    await rm(temporaryRoot, { recursive: true, force: true });
  }
});

test("ingests the complete current official snapshot with pinned data and metadata checksums", async () => {
  expect(await sha256File(artifactPath)).toBe(
    ENERGY_STAR_DISHWASHER_ARTIFACT.sha256
  );
  expect(await sha256File(metadataPath)).toBe(
    ENERGY_STAR_DISHWASHER_METADATA_ARTIFACT.sha256
  );
  expect(ingestion.artifact.byteSize).toBe(
    ENERGY_STAR_DISHWASHER_ARTIFACT.byteSize
  );
  expect(ingestion.recordsRead).toBe(418);
  expect(ingestion.recordsWritten).toBe(418);
  expect(ingestion.operatingModesWritten).toBe(448);
  expect(ingestion.duplicateModelIdentifierCount).toBe(1);
  expect(ingestion.schema.rowCount).toBe(418);
  expect(
    ingestion.schema.fields.find(
      (field) =>
        field.name ===
        "washing_energy_consumption_kwh_rack_for_high_temp_and_dual_sanitizing_machines"
    )
  ).toMatchObject({
    presenceCount: 334,
    unit: "kWh/rack"
  });
  expect(
    database.prepare(
      "SELECT count(*) AS count FROM energy_star_commercial_dishwashers"
    ).get().count
  ).toBe(418);
  expect(
    database.prepare(
      "SELECT count(*) AS count FROM energy_star_dishwasher_operating_modes"
    ).get().count
  ).toBe(448);
  expect(
    database.prepare(
      "SELECT count(*) AS count FROM equipment_performance_fields WHERE product_id LIKE 'energy-star:commercial-dishwasher:%'"
    ).get().count
  ).toBe(1759);
});

test("scopes stable product identities to the exact source release", () => {
  const currentId = energyStarDishwasherProductId(
    "3998246",
    ingestion.releaseId
  );
  const laterId = energyStarDishwasherProductId(
    "3998246",
    "release:energy-star-commercial-dishwashers:later"
  );
  expect(laterId).not.toBe(currentId);
  expect(
    database.prepare(`
      SELECT id, source_release_id AS sourceReleaseId
      FROM equipment_products
      WHERE id = ?
    `).get(currentId)
  ).toEqual({
    id: currentId,
    sourceReleaseId: ingestion.releaseId
  });
});

test("resolves exact source ID, operating mode, and brand-model rows without fuzzy matching", () => {
  expect(resolveEnergyStarDishwasherByPdId(
    database,
    "3998246",
    { operatingMode: "HIGH_TEMPERATURE" }
  )).toMatchObject({
    brand: "Champion",
    modelNumber: "DH3000",
    machineType: "Stationary Single Tank Door",
    sanitationMethod: "Hot Water Sanitizing (High Temp) Machine",
    waterGallonsPerRack: 0.77,
    washingKwhPerRack: 0.22,
    idleKw: 0.43,
    racksPerHour: 53,
    boosterIdleKw: 0.09
  });
  expect(resolveEnergyStarDishwasherByExactModel(database, {
    brand: "Champion",
    modelNumber: "DH3000",
    machineType: "Stationary Single Tank Door",
    sanitationMethod: "Hot Water Sanitizing (High Temp) Machine",
    operatingMode: "HIGH_TEMPERATURE"
  })).toMatchObject({
    pdId: "3998246"
  });
  expect(() => resolveEnergyStarDishwasherByExactModel(database, {
    brand: "Champion",
    modelNumber: "DH 3000",
    operatingMode: "HIGH_TEMPERATURE"
  })).toThrow(/NO_EXACT_MATCH/);
  expect(() =>
    resolveEnergyStarDishwasherByPdId(database, "2377773")
  ).toThrow(/AMBIGUOUS_EXACT_MATCH/);
  expect(() =>
    resolveEnergyStarDishwasherByPdId(
      database,
      "2371624",
      { operatingMode: "LOW_TEMPERATURE" }
    )
  ).toThrow(/INCOMPLETE_SOURCE_METRICS.*washing_kwh_per_rack/);
});

test("maps only genuine rack-machine fields to ITC-52 and records numeric provenance", () => {
  const result = mapExactProposedDishwasherToItc52(database, {
    pdId: "2383572",
    operatingMode: "LOW_TEMPERATURE"
  });
  expect(result.values).toMatchObject({
    water_per_rack_proposed: 0.95,
    active_kWh_per_rack_proposed: 0.02,
    idle_kW_proposed: 0,
    proposed_dishwasher_record: {
      pdId: "2383572",
      brand: "ADS",
      modelNumber: "AF-ES"
    }
  });
  expect(result.formulaBindings).toEqual([
    expect.objectContaining({
      formulaTerm: "water_per_rack_proposed",
      unit: "gallons/rack",
      scope: "PER_EVENT"
    }),
    expect.objectContaining({
      formulaTerm: "active_kWh_per_rack_proposed",
      unit: "kWh/rack",
      scope: "PER_EVENT"
    }),
    expect.objectContaining({
      formulaTerm: "idle_kW_proposed",
      unit: "kW",
      scope: "PER_EQUIPMENT_UNIT"
    })
  ]);
  expect(result.unsupportedFormulaTerms).toEqual([
    "water_per_hour_proposed",
    "active_kWh_per_hour_proposed"
  ]);
  const calculationId = recordItc52DishwasherFormulaMapping(database, result);
  expect(
    database.prepare(`
      SELECT formula_term AS formulaTerm, unit, scope
      FROM selected_values
      WHERE calculation_run_id = ?
      ORDER BY formula_term
    `).all(calculationId)
  ).toEqual([
    {
      formulaTerm: "active_kWh_per_rack_proposed",
      unit: "kWh/rack",
      scope: "PER_EVENT"
    },
    {
      formulaTerm: "idle_kW_proposed",
      unit: "kW",
      scope: "PER_EQUIPMENT_UNIT"
    },
    {
      formulaTerm: "water_per_rack_proposed",
      unit: "gallons/rack",
      scope: "PER_EVENT"
    }
  ]);
  expect(
    database.prepare(`
      SELECT count(*) AS count
      FROM selected_value_provenance
      WHERE source_artifact_id =
        'artifact:energy-star-commercial-dishwashers:2026-07-24-full'
    `).get().count
  ).toBe(3);
  expect(() =>
    mapExactProposedDishwasherToItc52(database, {
      pdId: "3998246",
      operatingMode: "HIGH_TEMPERATURE"
    })
  ).toThrow(/UNRESOLVED_BOOSTER_SCOPE/);
});

test("resolves unique requirements across the complete current snapshot", () => {
  const requirements = {
    machineType: "Stationary Single Tank Door",
    sanitationMethod: "Dual Sanitizing Machine",
    operatingMode: "LOW_TEMPERATURE",
    minRacksPerHour: 53,
    maxWaterGallonsPerRack: 0.48,
    maxWashingKwhPerRack: 0.11,
    maxIdleKw: 0.07
  };
  expect(
    resolveEnergyStarDishwasherRequirements(database, requirements)
  ).toMatchObject({
    pdId: "2383584",
    modelNumber: "E-HT",
    waterGallonsPerRack: 0.48
  });
  expect(
    mapRequirementProposedDishwasherToItc52(database, requirements).values
  ).toMatchObject({
    water_per_rack_proposed: 0.48,
    active_kWh_per_rack_proposed: 0.11,
    idle_kW_proposed: 0.07
  });
});

test("fails closed when current-snapshot requirements remain ambiguous", () => {
  expect(() => resolveEnergyStarDishwasherRequirements(database, {
    machineType: "Stationary Single Tank Door - Dump and Fill",
    sanitationMethod: "Chemical Sanitizing (Low Temp) Machine",
    operatingMode: "LOW_TEMPERATURE",
    minRacksPerHour: 37,
    maxWaterGallonsPerRack: 0.95,
    maxWashingKwhPerRack: 0.02,
    maxIdleKw: 0
  })).toThrow(/AMBIGUOUS_EXACT_MATCH/);
});

test("fails schema mutations that remove a required field or pollute a native unit", async () => {
  const records = JSON.parse(await readFile(artifactPath, "utf8"));
  const missingField = structuredClone(records);
  delete missingField[0].pd_id;
  expect(() => schemaFromDishwasherRecords(missingField)).toThrow(
    /MISSING_REQUIRED_VALUE.*pd_id/
  );

  const pollutedUnit = structuredClone(records);
  pollutedUnit[0].water_use_gallons_per_rack_gpr = "0.95 gallons/rack";
  expect(() => schemaFromDishwasherRecords(pollutedUnit)).toThrow(
    /INVALID_SOURCE_NUMBER.*water_use_gallons_per_rack_gpr/
  );
});

test("fails a corrupt artifact checksum", async () => {
  const corrupt = join(temporaryRoot, "corrupt-energy-star.json");
  await writeFile(corrupt, "[]\n", "utf8");
  await expect(
    verifyArtifact(corrupt, ENERGY_STAR_DISHWASHER_ARTIFACT)
  ).rejects.toThrow(/ARTIFACT_SIZE_MISMATCH|CORRUPT_CHECKSUM/);
});

test("requires offline mode and makes no runtime network call", () => {
  const previousNetwork = process.env.OS_RESEARCH_NETWORK;
  const previousFetch = globalThis.fetch;
  let fetchCalls = 0;
  globalThis.fetch = async () => {
    fetchCalls += 1;
    throw new Error("network must not be called");
  };
  try {
    process.env.OS_RESEARCH_NETWORK = "disabled";
    expect(() =>
      mapExactProposedDishwasherToItc52(database, { pdId: "3998246" })
    ).toThrow(/UNRESOLVED_BOOSTER_SCOPE/);
    expect(
      mapExactProposedDishwasherToItc52(database, {
        pdId: "2383572",
        operatingMode: "LOW_TEMPERATURE"
      })
        .values.active_kWh_per_rack_proposed
    ).toBe(0.02);
    expect(fetchCalls).toBe(0);
    delete process.env.OS_RESEARCH_NETWORK;
    expect(() =>
      mapExactProposedDishwasherToItc52(database, {
        pdId: "3998246",
        operatingMode: "HIGH_TEMPERATURE"
      })
    ).toThrow(/OFFLINE_GUARD_REQUIRED/);
    expect(fetchCalls).toBe(0);
  } finally {
    globalThis.fetch = previousFetch;
    if (previousNetwork === undefined) {
      delete process.env.OS_RESEARCH_NETWORK;
    } else {
      process.env.OS_RESEARCH_NETWORK = previousNetwork;
    }
  }
});
