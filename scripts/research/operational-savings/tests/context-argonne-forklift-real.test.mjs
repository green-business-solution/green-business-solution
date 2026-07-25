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
  ARGONNE_FORKLIFT_ARTIFACT,
  ingestArgonneForkliftComparison,
  mapArgonneForkliftComparison,
  recordArgonneForkliftComparison
} from "../adapters/context-benchmarks/argonne-forklift.mjs";
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
  "scripts/research/operational-savings/.cache/artifacts/argonne-forklift-anl-esd.pdf"
);
const exactInput = Object.freeze({
  equipmentClass: "FORKLIFT",
  ratedCapacityLb: 5_000,
  existingPropulsion: "PROPANE",
  proposedPropulsion: "BATTERY_ELECTRIC",
  comparableDuty: "EPRI_SIDE_BY_SIDE_COST_COMPARISON",
  annualOperatingHours: 2_000
});

let database;
let temporaryRoot;

beforeAll(async () => {
  process.env.OS_RESEARCH_NETWORK = "disabled";
  temporaryRoot = await mkdtemp(
    join(tmpdir(), "retrofi-context-argonne-forklift-")
  );
  database = await openResearchDatabase(
    join(temporaryRoot, "research.sqlite"),
    { deferReleasePublicationUntilClose: true }
  );
  await ingestArgonneForkliftComparison({
    artifactPath,
    database
  });
}, 120_000);

afterAll(async () => {
  database?.close();
  await rm(temporaryRoot, { recursive: true, force: true });
});

test("verifies and publishes the exact Argonne 5,000 lb paired intensities", async () => {
  expect(await sha256File(artifactPath)).toBe(
    ARGONNE_FORKLIFT_ARTIFACT.sha256
  );
  expect(
    database.prepare(`
      SELECT field_key AS fieldKey, value, unit
      FROM benchmark_values
      WHERE population_id =
        'context:argonne-forklift:release:argonne-forklift-anl-esd-08-3:5000-lb-electric-propane'
      ORDER BY field_key
    `).all()
  ).toEqual([
    {
      fieldKey: "existing_fuel_per_hour",
      value: 1.38,
      unit: "gallons/hour"
    },
    {
      fieldKey: "proposed_kWh_per_hour",
      value: 7.5,
      unit: "kWh/hour"
    }
  ]);
});

test("maps both exact ITC-30 hourly intensity terms", () => {
  const result = mapArgonneForkliftComparison(
    database,
    exactInput
  );
  expect(result.values).toEqual({
    existing_fuel_per_hour: 1.38,
    proposed_kWh_per_hour: 7.5
  });
  expect(result.formulaBindings).toEqual([
    expect.objectContaining({
      formulaTerm: "existing_fuel_per_hour",
      value: 1.38,
      unit: "fuel-unit/hour",
      nativeUnit: "gallons/hour",
      scope: "PER_HOUR"
    }),
    expect.objectContaining({
      formulaTerm: "proposed_kWh_per_hour",
      value: 7.5,
      unit: "kWh/hour",
      scope: "PER_HOUR"
    })
  ]);
  const calculationId =
    recordArgonneForkliftComparison(database, result);
  expect(
    database.prepare(`
      SELECT count(*) AS count
      FROM selected_values
      WHERE calculation_run_id = ?
    `).get(calculationId).count
  ).toBe(2);
});

test("fails closed for every incompatible class or duty dimension", () => {
  for (const incompatible of [
    { ratedCapacityLb: 4_000 },
    { existingPropulsion: "DIESEL" },
    { proposedPropulsion: "FUEL_CELL" },
    { comparableDuty: "UNSPECIFIED" }
  ]) {
    expect(() =>
      mapArgonneForkliftComparison(database, {
        ...exactInput,
        ...incompatible
      })
    ).toThrow(/INCOMPATIBLE_ARGONNE_FORKLIFT_SCOPE/);
  }
});

test("rejects a corrupt source artifact", async () => {
  const corruptPath = join(temporaryRoot, "corrupt.pdf");
  await writeFile(corruptPath, "not a PDF", "utf8");
  await expect(
    ingestArgonneForkliftComparison({
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
      mapArgonneForkliftComparison(
        database,
        exactInput
      )
    ).toThrow(/OFFLINE_GUARD_REQUIRED/);
  } finally {
    process.env.OS_RESEARCH_NETWORK = previous;
  }
});
