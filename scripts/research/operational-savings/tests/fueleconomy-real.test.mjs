import {
  mkdtemp,
  rm,
  writeFile
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, beforeAll, expect, test } from "vitest";

import {
  FUELECONOMY_ARTIFACT,
  fuelEconomyVehicleProductId,
  ingestFuelEconomy,
  mapExactElectricVehicleToItc28,
  mapExactVehiclePairToItc29,
  recordFuelEconomyFormulaMapping,
  recordItc29FormulaMapping,
  resolveVehicleByDescription,
  resolveVehicleById
} from "../adapters/fueleconomy/run.mjs";
import { schemaFromHeaders } from "../adapters/fueleconomy/inspect-schema.mjs";
import { sha256File, verifyArtifact } from "../lib/artifact.mjs";
import { openResearchDatabase } from "../lib/sqlite.mjs";

const repoRoot = fileURLToPath(new URL("../../../..", import.meta.url));
const artifactPath = join(
  repoRoot,
  "scripts/research/operational-savings/.cache/artifacts/vehicles.csv.zip"
);

let database;
let temporaryRoot;
let ingestion;

beforeAll(async () => {
  process.env.OS_RESEARCH_NETWORK = "disabled";
  temporaryRoot = await mkdtemp(join(tmpdir(), "retrofi-fueleconomy-proof-"));
  database = await openResearchDatabase(
    join(temporaryRoot, "research.sqlite"),
    { deferReleasePublicationUntilClose: true }
  );
  ingestion = await ingestFuelEconomy({ artifactPath, database });
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

test("ingests the complete official bulk artifact with its pinned checksum", async () => {
  expect(await sha256File(artifactPath)).toBe(FUELECONOMY_ARTIFACT.sha256);
  expect(ingestion.artifact.byteSize).toBe(FUELECONOMY_ARTIFACT.byteSize);
  expect(ingestion.recordsRead).toBeGreaterThan(40_000);
  expect(ingestion.recordsWritten).toBe(ingestion.recordsRead);
  expect(ingestion.schema.fields.map((field) => field.name)).toContain("comb08");
  expect(ingestion.schema.fields.map((field) => field.name)).toContain("combE");
  expect(
    database.prepare("SELECT count(*) AS count FROM fuel_economy_vehicles").get().count
  ).toBe(ingestion.recordsRead);
});

test("resolves genuine reviewed vehicle rows by ID and exact description", () => {
  expect(resolveVehicleById(database, 43764)).toMatchObject({
    make: "Hyundai",
    model: "Kona FWD",
    year: 2022,
    comb08: 32
  });
  expect(resolveVehicleByDescription(database, {
    make: "Hyundai",
    model: "Kona Electric",
    year: 2022,
    drive: "Front-Wheel Drive"
  })).toMatchObject({
    nativeId: "44444",
    combE: 28
  });
});

test("scopes stable vehicle identities to the exact source release", () => {
  const currentId = fuelEconomyVehicleProductId(
    "43764",
    ingestion.releaseId
  );
  const laterId = fuelEconomyVehicleProductId(
    "43764",
    "release:fueleconomy-vehicles:later"
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

test("reaches both exact ITC-29 formula terms offline and publishes provenance", () => {
  const result = mapExactVehiclePairToItc29(database, {
    existingVehicleId: 43764,
    proposedVehicleId: 44444
  });
  expect(result.values).toEqual({
    existing_combined_mpg: 32,
    proposed_combE: 28
  });
  expect(result.formulaBindings).toEqual([
    expect.objectContaining({
      formulaTerm: "existing_combined_mpg",
      unit: "miles/gallon",
      scope: "PER_EQUIPMENT_UNIT"
    }),
    expect.objectContaining({
      formulaTerm: "proposed_combE",
      unit: "kWh/100 miles",
      scope: "PER_EQUIPMENT_UNIT"
    })
  ]);
  const calculationId =
    recordItc29FormulaMapping(database, result);
  expect(calculationId).toContain(
    `:${ingestion.releaseId}:`
  );
  expect(
    database.prepare(
      "SELECT count(*) AS count FROM selected_values WHERE calculation_run_id LIKE 'calculation:fueleconomy:%'"
    ).get().count
  ).toBe(2);
  expect(
    database.prepare(
      "SELECT count(*) AS count FROM selected_value_provenance WHERE source_artifact_id = ?"
    ).get("artifact:fueleconomy-vehicles:2026-07-23").count
  ).toBe(2);
});

test("maps an exact electric vehicle to ITC-28 intensity and publishes provenance", () => {
  const result = mapExactElectricVehicleToItc28(database, {
    vehicleId: 44444
  });
  expect(result.values).toEqual({
    vehicle_kWh_per_mile: 0.28
  });
  expect(result.formulaBindings).toEqual([
    expect.objectContaining({
      formulaTerm: "vehicle_kWh_per_mile",
      value: 0.28,
      unit: "kWh/mile",
      scope: "PER_EQUIPMENT_UNIT"
    })
  ]);
  const calculationId = recordFuelEconomyFormulaMapping(database, result);
  expect(
    database.prepare(`
      SELECT formula_term AS formulaTerm, value, unit, selection_rule AS selectionRule
      FROM selected_values
      WHERE calculation_run_id = ?
    `).get(calculationId)
  ).toEqual({
    formulaTerm: "vehicle_kWh_per_mile",
    value: 0.28,
    unit: "kWh/mile",
    selectionRule: "EXACT_ELECTRIC_SOURCE_ID"
  });
  expect(
    database.prepare(`
      SELECT count(*) AS count
      FROM selected_value_provenance
      WHERE selected_value_id = ?
        AND source_artifact_id = ?
    `).get(
      `${calculationId}:vehicle_kWh_per_mile`,
      "artifact:fueleconomy-vehicles:2026-07-23"
    ).count
  ).toBe(1);
});

test("fails closed on a missing source column", () => {
  const headers = ingestion.schema.fields
    .map((field) => field.name)
    .filter((name) => name !== "combE");
  expect(() => schemaFromHeaders(headers)).toThrow(/MISSING_REQUIRED_COLUMN: combE/);
});

test("fails closed on incompatible exact pairs", () => {
  expect(() => mapExactVehiclePairToItc29(database, {
    existingVehicleId: 43764,
    proposedVehicleId: 43764
  })).toThrow(/proposed record lacks electric combE/);
  expect(() => mapExactElectricVehicleToItc28(database, {
    vehicleId: 43764
  })).toThrow(/exact record lacks electric combE/);
});

test("fails a corrupt artifact checksum", async () => {
  const corrupt = join(temporaryRoot, "corrupt.zip");
  await writeFile(corrupt, "not an official source artifact", "utf8");
  await expect(
    verifyArtifact(corrupt, FUELECONOMY_ARTIFACT)
  ).rejects.toThrow(/ARTIFACT_SIZE_MISMATCH|CORRUPT_CHECKSUM/);
});

test("requires the runtime network guard", () => {
  const previous = process.env.OS_RESEARCH_NETWORK;
  delete process.env.OS_RESEARCH_NETWORK;
  expect(() => mapExactVehiclePairToItc29(database, {
    existingVehicleId: 43764,
    proposedVehicleId: 44444
  })).toThrow(/OFFLINE_GUARD_REQUIRED/);
  process.env.OS_RESEARCH_NETWORK = previous;
});
