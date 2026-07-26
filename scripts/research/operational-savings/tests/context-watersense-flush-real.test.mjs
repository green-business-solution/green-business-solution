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
  WATERSENSE_TOILET_ACTIVITY_ARTIFACT,
  WATERSENSE_URINAL_ACTIVITY_ARTIFACT,
  ingestWaterSenseFlushActivity,
  mapWaterSenseFlushActivity,
  recordWaterSenseFlushActivity
} from "../adapters/context-benchmarks/watersense-flush.mjs";
import {
  sha256File
} from "../lib/artifact.mjs";
import {
  openResearchDatabase
} from "../lib/sqlite.mjs";

const repoRoot = fileURLToPath(
  new URL("../../../..", import.meta.url)
);
const toiletArtifactPath = join(
  repoRoot,
  "scripts/research/operational-savings/.cache/artifacts/watersense-at-work-2023.pdf"
);
const urinalArtifactPath = join(
  repoRoot,
  "scripts/research/operational-savings/.cache/artifacts/watersense-at-work-2023-urinals.pdf"
);
const toiletInput = Object.freeze({
  fixtureType: "TOILET",
  femaleEligiblePopulation: 10,
  maleEligiblePopulation: 10,
  customerOrVisitorPopulation: 0,
  inScopeFixtureCount: 4,
  operatingDaysPerWeek: 5,
  activeWeeksPerYear: 52,
  allocationMethod: "COMPLETE_ELIGIBLE_GROUP"
});

let database;
let temporaryRoot;

beforeAll(async () => {
  process.env.OS_RESEARCH_NETWORK = "disabled";
  temporaryRoot = await mkdtemp(
    join(tmpdir(), "retrofi-context-watersense-flush-")
  );
  database = await openResearchDatabase(
    join(temporaryRoot, "research.sqlite"),
    { deferReleasePublicationUntilClose: true }
  );
  await ingestWaterSenseFlushActivity({
    toiletArtifactPath,
    urinalArtifactPath,
    database
  });
}, 120_000);

afterAll(async () => {
  database?.close();
  await rm(temporaryRoot, { recursive: true, force: true });
});

test("verifies and publishes the two exact WaterSense source PDFs", async () => {
  expect(await sha256File(toiletArtifactPath)).toBe(
    WATERSENSE_TOILET_ACTIVITY_ARTIFACT.sha256
  );
  expect(await sha256File(urinalArtifactPath)).toBe(
    WATERSENSE_URINAL_ACTIVITY_ARTIFACT.sha256
  );
  expect(
    database.prepare(`
      SELECT field_key AS fieldKey, value
      FROM benchmark_values
      WHERE population_id =
        'context:watersense:release:watersense-at-work-flush-activity:2023:flush-activity:toilet'
      ORDER BY field_key
    `).all()
  ).toEqual([
    {
      fieldKey: "female_flushes_per_operating_day",
      value: 3
    },
    {
      fieldKey: "male_flushes_per_operating_day",
      value: 1
    }
  ]);
  expect(
    database.prepare(`
      SELECT value
      FROM benchmark_values
      WHERE population_id =
        'context:watersense:release:watersense-at-work-flush-activity:2023:flush-activity:urinal'
    `).get().value
  ).toBe(2);
});

test("reaches the exact ITC-33 group annual flush term without fixture-count multiplication", () => {
  const result = mapWaterSenseFlushActivity(
    database,
    toiletInput
  );
  expect(result.values).toEqual({
    total_annual_flushes_group: 10_400
  });
  expect(result.formulaBindings).toEqual([
    expect.objectContaining({
      formulaTerm: "total_annual_flushes_group",
      value: 10_400,
      unit: "flushes/year",
      scope: "PROJECT_TOTAL"
    })
  ]);
  const calculationId =
    recordWaterSenseFlushActivity(database, result);
  expect(
    database.prepare(`
      SELECT value, unit, scope
      FROM selected_values
      WHERE calculation_run_id = ?
    `).get(calculationId)
  ).toEqual({
    value: 10_400,
    unit: "flushes/year",
    scope: "PROJECT_TOTAL"
  });
});

test("supports the separate male urinal activity branch", () => {
  const result = mapWaterSenseFlushActivity(database, {
    ...toiletInput,
    fixtureType: "URINAL",
    femaleEligiblePopulation: 0
  });
  expect(
    result.values.total_annual_flushes_group
  ).toBe(5_200);
  expect(result.sourceArtifactId).toBe(
    "artifact:watersense-at-work-urinals:2023"
  );
});

test("fails closed for unproved visitors, subset allocation, and incompatible populations", () => {
  for (const incompatible of [
    { customerOrVisitorPopulation: 1 },
    { allocationMethod: "SUBSET_BY_FIXTURE_COUNT" },
    {
      fixtureType: "URINAL",
      femaleEligiblePopulation: 1
    }
  ]) {
    expect(() =>
      mapWaterSenseFlushActivity(database, {
        ...toiletInput,
        ...incompatible
      })
    ).toThrow(
      /UNSUPPORTED|INCOMPATIBLE/
    );
  }
});

test("rejects a corrupt source artifact", async () => {
  const corruptPath = join(temporaryRoot, "corrupt.pdf");
  await writeFile(corruptPath, "not a PDF", "utf8");
  await expect(
    ingestWaterSenseFlushActivity({
      toiletArtifactPath: corruptPath,
      urinalArtifactPath,
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
      mapWaterSenseFlushActivity(
        database,
        toiletInput
      )
    ).toThrow(/OFFLINE_GUARD_REQUIRED/);
  } finally {
    process.env.OS_RESEARCH_NETWORK = previous;
  }
});
