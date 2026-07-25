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
  afterEach,
  beforeAll,
  beforeEach,
  expect,
  test
} from "vitest";

import {
  assertComstockReleaseCompatibility,
  assertRequiredComstockParquetSchema,
  COMSTOCK_RELEASE_ARTIFACTS,
  inspectComstockRelease
} from "../adapters/comstock/inspect-schema.mjs";
import {
  calculateSourceWeightedMedian,
  COMSTOCK_SOURCE_RELEASE_ID,
  ingestComstockAnnualDelta,
  mapComstockAnnualDeltaToItc01,
  publishComstockNormalizedPopulation,
  recordComstockFormulaMapping,
  resolveComstockAnnualDelta
} from "../adapters/comstock/run.mjs";
import {
  openResearchDatabase
} from "../lib/sqlite.mjs";

const repoRoot = fileURLToPath(
  new URL("../../../..", import.meta.url)
);
const artifactRoot = join(
  repoRoot,
  "scripts/research/operational-savings/.cache/artifacts"
);
const artifactPaths = Object.freeze({
  dataDictionaryPath: join(
    artifactRoot,
    "comstock-data-dictionary.tsv"
  ),
  enumerationDictionaryPath: join(
    artifactRoot,
    "comstock-enumeration-dictionary.tsv"
  ),
  measureCrosswalkPath: join(
    artifactRoot,
    "comstock-measure-name-crosswalk.csv"
  ),
  upgradesLookupPath: join(
    artifactRoot,
    "comstock-upgrades.json"
  ),
  baselineParquetPath: join(
    artifactRoot,
    "comstock-ca-g0600750-upgrade0.parquet"
  ),
  upgradeParquetPath: join(
    artifactRoot,
    "comstock-ca-g0600750-upgrade43.parquet"
  )
});
const proofPath = join(
  repoRoot,
  "scripts/research/operational-savings/adapters/comstock/proof.json"
);

let previousNetworkMode;
let workspace;
let database;
let publication;

const alternateReleaseId =
  "release:comstock:two-release-coexistence";
const alternateBaselineArtifactId =
  "artifact:comstock:two-release-coexistence:baseline";
const alternateUpgradeArtifactId =
  "artifact:comstock:two-release-coexistence:upgrade";

function snapshotComstockRelease(sourceReleaseId) {
  const queries = {
    measures: `
      SELECT *
      FROM building_upgrade_measures
      WHERE source_release_id = ?
      ORDER BY id
    `,
    crosswalks: `
      SELECT *
      FROM retrofit_measure_crosswalks
      WHERE source_release_id = ?
      ORDER BY id
    `,
    results: `
      SELECT *
      FROM comstock_building_results
      WHERE source_release_id = ?
      ORDER BY id
    `,
    deltas: `
      SELECT *
      FROM comstock_paired_resource_deltas
      WHERE source_release_id = ?
      ORDER BY id
    `,
    populations: `
      SELECT *
      FROM benchmark_populations
      WHERE source_release_id = ?
      ORDER BY id
    `,
    values: `
      SELECT value.*
      FROM benchmark_values AS value
      JOIN benchmark_populations AS population
        ON population.id = value.population_id
      WHERE population.source_release_id = ?
      ORDER BY value.id
    `,
    benchmarks: `
      SELECT *
      FROM building_archetype_benchmarks
      WHERE source_release_id = ?
      ORDER BY id
    `
  };
  return Object.fromEntries(
    Object.entries(queries).map(([name, sql]) => [
      name,
      JSON.stringify(database.prepare(sql).all(sourceReleaseId))
    ])
  );
}

function cloneComstockReleaseForTest() {
  database.prepare(`
    INSERT INTO source_releases (
      id, source_id, version, published_at, acquired_at,
      status, schema_version_id
    )
    SELECT ?, source_id, ?, published_at, acquired_at,
      status, schema_version_id
    FROM source_releases
    WHERE id = ?
  `).run(
    alternateReleaseId,
    "two-release coexistence fixture",
    COMSTOCK_SOURCE_RELEASE_ID
  );
  for (const [sourceArtifactId, targetArtifactId] of [
    [
      publication.inspection.artifacts.baselineParquet.artifactId,
      alternateBaselineArtifactId
    ],
    [
      publication.inspection.artifacts.upgradeParquet.artifactId,
      alternateUpgradeArtifactId
    ]
  ]) {
    database.prepare(`
      INSERT INTO source_artifacts (
        id, release_id, source_url, local_name, media_type,
        byte_size, sha256, acquired_at, official
      )
      SELECT ?, ?, source_url, local_name, media_type,
        byte_size, sha256, acquired_at, official
      FROM source_artifacts
      WHERE id = ?
    `).run(
      targetArtifactId,
      alternateReleaseId,
      sourceArtifactId
    );
    database.prepare(`
      INSERT INTO source_checksums (
        artifact_id, algorithm, digest, observed_at
      )
      SELECT ?, algorithm, digest, observed_at
      FROM source_checksums
      WHERE artifact_id = ?
    `).run(targetArtifactId, sourceArtifactId);
  }
}

beforeAll(async () => {
  process.env.OS_RESEARCH_NETWORK = "disabled";
  workspace = await mkdtemp(
    join(tmpdir(), "comstock-real-proof-")
  );
  database = await openResearchDatabase(
    join(workspace, "research.sqlite"),
    { deferReleasePublicationUntilClose: true }
  );
  publication = await ingestComstockAnnualDelta({
    artifactPaths,
    database
  });
});

afterAll(async () => {
  database?.close();
  await rm(workspace, { recursive: true, force: true });
});

beforeEach(() => {
  previousNetworkMode = process.env.OS_RESEARCH_NETWORK;
  process.env.OS_RESEARCH_NETWORK = "disabled";
});

afterEach(() => {
  if (previousNetworkMode === undefined) {
    delete process.env.OS_RESEARCH_NETWORK;
  } else {
    process.env.OS_RESEARCH_NETWORK = previousNetworkMode;
  }
});

test("pins the complete official ComStock Release 3 bundle and exact native schema", async () => {
  const inspection = await inspectComstockRelease(artifactPaths);
  expect(
    Object.fromEntries(
      Object.entries(inspection.artifacts).map(
        ([key, artifact]) => [key, artifact.sha256]
      )
    )
  ).toEqual(
    Object.fromEntries(
      Object.entries(COMSTOCK_RELEASE_ARTIFACTS).map(
        ([key, artifact]) => [key, artifact.sha256]
      )
    )
  );
  expect(
    inspection.measureCrosswalk.selectedMeasure
  ).toEqual({
    measureId: "ltg_0001",
    measureName: "LED Lighting",
    sourceFolder: "upgrade_light_led",
    upgradeId: 43,
    upgradeName: "LED Lighting"
  });
  expect(
    inspection.observedSchema.nativeDatasetLabel
  ).toBe("ComStock sdr_2025_r4_combined");
  expect(
    inspection.observedSchema.baselineParquet.rowCount
  ).toBe(18622);
  expect(
    inspection.observedSchema.upgradeParquet.rowCount
  ).toBe(18622);
  expect(
    inspection.observedSchema.upgradeParquet.applicableRows
  ).toBe(7806);
  expect(
    inspection.schemaFingerprintSha256
  ).toMatch(/^[a-f0-9]{64}$/);
});

test("joins real baseline and LED rows, applies release weights, and publishes the ITC-01 output offline", () => {
  expect(publication.pairedRows).toHaveLength(952);
  expect(publication.benchmark).toEqual({
    value: 0.27474747474747446,
    totalWeight: 582.0665544105079,
    populationSize: 952,
    selectionRule:
      "FIRST_SOURCE_WEIGHTED_DELTA_AT_OR_ABOVE_HALF_TOTAL_WEIGHT"
  });
  expect(
    database.prepare(`
      SELECT count(*) AS count
      FROM comstock_building_results
    `).get().count
  ).toBe(1904);
  expect(
    database.prepare(`
      SELECT count(*) AS count
      FROM comstock_paired_resource_deltas
    `).get().count
  ).toBe(952);
  expect(
    database.prepare(`
      SELECT count(*) AS count
      FROM source_artifacts
      WHERE release_id = 'release:comstock-2025-release-3'
    `).get().count
  ).toBe(6);

  const mapped = mapComstockAnnualDeltaToItc01(database, {
    retrofitId: "led_lighting_retrofit",
    geography: "CA, San Francisco County",
    buildingType: "SmallOffice",
    areaFt2: 4000,
    resource: "electricity"
  });
  expect(mapped.formulaBindings[0]).toMatchObject({
    formulaTerm: "median_ComStock_delta_r_per_ft²",
    value: 0.27474747474747446,
    unit: "kWh/ft2-year"
  });
  expect(mapped.provenance.artifacts).toHaveLength(6);
  expect(mapped.provenance.sourceFields).toContain("bldg_id");
  expect(mapped.provenance.sourceFields).toContain("weight");
  expect(mapped.provenance.sourceFields).toContain(
    "out.electricity.total.energy_consumption..kwh"
  );
  const calculationId = recordComstockFormulaMapping(
    database,
    mapped
  );
  expect(
    database.prepare(`
      SELECT value, unit
      FROM selected_values
      WHERE calculation_run_id = ?
    `).get(calculationId)
  ).toEqual({
    value: 0.27474747474747446,
    unit: "kWh/ft2-year"
  });
});

test("keeps two ComStock releases independently resolvable and prevents mutation", () => {
  const releaseOneSnapshot = snapshotComstockRelease(
    COMSTOCK_SOURCE_RELEASE_ID
  );
  cloneComstockReleaseForTest();
  const alternateInspection = structuredClone(
    publication.inspection
  );
  alternateInspection.artifacts.baselineParquet.artifactId =
    alternateBaselineArtifactId;
  alternateInspection.artifacts.upgradeParquet.artifactId =
    alternateUpgradeArtifactId;
  const alternateBenchmark = {
    ...publication.benchmark,
    value: publication.benchmark.value + 0.01
  };
  expect(() =>
    publishComstockNormalizedPopulation(
      database,
      {
        ...alternateInspection,
        artifacts: {
          ...alternateInspection.artifacts,
          baselineParquet:
            publication.inspection.artifacts.baselineParquet
        }
      },
      publication.pairedRows,
      alternateBenchmark,
      publication.selection,
      { sourceReleaseId: alternateReleaseId }
    )
  ).toThrow(/RELEASE_LINEAGE_MISMATCH/);
  const alternatePublication =
    publishComstockNormalizedPopulation(
      database,
      alternateInspection,
      publication.pairedRows,
      alternateBenchmark,
      publication.selection,
      { sourceReleaseId: alternateReleaseId }
    );

  expect(
    snapshotComstockRelease(COMSTOCK_SOURCE_RELEASE_ID)
  ).toEqual(releaseOneSnapshot);
  expect(alternatePublication.benchmarkId).not.toBe(
    publication.benchmarkId
  );
  expect(
    Object.fromEntries(
      [
        "building_upgrade_measures",
        "retrofit_measure_crosswalks",
        "comstock_building_results",
        "comstock_paired_resource_deltas",
        "benchmark_populations",
        "benchmark_values",
        "building_archetype_benchmarks"
      ].map((table) => [
        table,
        database.prepare(
          `SELECT count(*) AS count FROM ${table}`
        ).get().count
      ])
    )
  ).toEqual({
    building_upgrade_measures: 2,
    retrofit_measure_crosswalks: 2,
    comstock_building_results: 3808,
    comstock_paired_resource_deltas: 1904,
    benchmark_populations: 2,
    benchmark_values: 2,
    building_archetype_benchmarks: 2
  });

  const inputs = {
    retrofitId: "led_lighting_retrofit",
    geography: "CA, San Francisco County",
    buildingType: "SmallOffice",
    areaFt2: 4000,
    resource: "electricity"
  };
  expect(
    resolveComstockAnnualDelta(database, inputs)
  ).toMatchObject({
    sourceReleaseId: COMSTOCK_SOURCE_RELEASE_ID,
    deltaPerFt2: publication.benchmark.value
  });
  expect(
    resolveComstockAnnualDelta(database, {
      ...inputs,
      sourceReleaseId: alternateReleaseId
    })
  ).toMatchObject({
    sourceReleaseId: alternateReleaseId,
    deltaPerFt2: alternateBenchmark.value
  });
  const alternateMapped = mapComstockAnnualDeltaToItc01(
    database,
    {
      ...inputs,
      sourceReleaseId: alternateReleaseId
    }
  );
  expect(alternateMapped).toMatchObject({
    sourceReleaseId: alternateReleaseId,
    values: {
      "median_ComStock_delta_r_per_ft²":
        alternateBenchmark.value
    }
  });
  const alternateCalculationId =
    recordComstockFormulaMapping(
      database,
      alternateMapped
    );
  expect(
    database.prepare(`
      SELECT source_release_id AS sourceReleaseId
      FROM calculation_runs
      WHERE id = ?
    `).get(alternateCalculationId)
  ).toEqual({
    sourceReleaseId: alternateReleaseId
  });
  expect(alternateCalculationId).not.toBe(
    database.prepare(`
      SELECT id
      FROM calculation_runs
      WHERE source_release_id = ?
      ORDER BY id
      LIMIT 1
    `).get(COMSTOCK_SOURCE_RELEASE_ID).id
  );

  const alternateSnapshot = snapshotComstockRelease(
    alternateReleaseId
  );
  publishComstockNormalizedPopulation(
    database,
    alternateInspection,
    publication.pairedRows,
    alternateBenchmark,
    publication.selection,
    { sourceReleaseId: alternateReleaseId }
  );
  expect(
    snapshotComstockRelease(alternateReleaseId)
  ).toEqual(alternateSnapshot);
  expect(() =>
    publishComstockNormalizedPopulation(
      database,
      alternateInspection,
      publication.pairedRows,
      {
        ...alternateBenchmark,
        value: alternateBenchmark.value + 0.01
      },
      publication.selection,
      { sourceReleaseId: alternateReleaseId }
    )
  ).toThrow(/IMMUTABLE_ROW_UPDATE/);
  expect(
    snapshotComstockRelease(alternateReleaseId)
  ).toEqual(alternateSnapshot);
});

test("fails closed on schema drift, missing columns, and incompatible units", () => {
  const validColumns = Object.entries({
    applicability: "BOOLEAN",
    bldg_id: "BIGINT",
    completed_status: "VARCHAR",
    dataset: "VARCHAR",
    "in.comstock_building_type": "VARCHAR",
    "in.county_name": "VARCHAR",
    "in.sqft..ft2": "DOUBLE",
    "in.state": "VARCHAR",
    "out.electricity.total.energy_consumption..kwh":
      "DOUBLE",
    upgrade: "BIGINT",
    weight: "DOUBLE"
  }).map(([columnName, columnType]) => ({
    columnName,
    columnType
  }));
  expect(() =>
    assertRequiredComstockParquetSchema(
      validColumns.filter(
        ({ columnName }) => columnName !== "weight"
      ),
      "mutated"
    )
  ).toThrow(/MISSING_REQUIRED_COLUMN.*weight/);
  expect(() =>
    assertRequiredComstockParquetSchema(
      validColumns.map((column) =>
        column.columnName === "in.sqft..ft2"
          ? { ...column, columnType: "VARCHAR" }
          : column
      ),
      "mutated"
    )
  ).toThrow(/SOURCE_SCHEMA_DRIFT.*in\.sqft/);
});

test("rejects mixed releases, insufficient populations, duplicates, and ambiguous resolution", () => {
  expect(() =>
    assertComstockReleaseCompatibility(
      { dataset: "release-a", rowCount: 100 },
      { dataset: "release-b", rowCount: 100 }
    )
  ).toThrow(/MIXED_RELEASES/);
  expect(() =>
    calculateSourceWeightedMedian(
      [
        {
          nativeBuildingId: 1,
          sourceWeight: 1,
          deltaKwhPerFt2: 0.2
        }
      ],
      { minimumPopulation: 2 }
    )
  ).toThrow(/INSUFFICIENT_BENCHMARK_POPULATION/);
  expect(() =>
    calculateSourceWeightedMedian(
      [
        {
          nativeBuildingId: 1,
          sourceWeight: 1,
          deltaKwhPerFt2: 0.2
        },
        {
          nativeBuildingId: 1,
          sourceWeight: 1,
          deltaKwhPerFt2: 0.3
        }
      ],
      { minimumPopulation: 2 }
    )
  ).toThrow(/AMBIGUOUS_EXACT_MATCH/);

  database.exec("BEGIN IMMEDIATE");
  try {
    database.prepare(`
      INSERT INTO building_archetype_benchmarks (
        id, source_release_id, measure_id, geography,
        building_type, area_min_ft2, area_max_ft2, resource,
        delta_per_ft2, unit, source_weight, population_size
      )
      SELECT
        'comstock:benchmark:ambiguous-copy',
        source_release_id, measure_id, geography, building_type,
        area_min_ft2, area_max_ft2, resource, delta_per_ft2,
        unit, source_weight, population_size
      FROM building_archetype_benchmarks
      WHERE id = ?
    `).run(publication.benchmarkId);
    expect(() =>
      resolveComstockAnnualDelta(database, {
        retrofitId: "led_lighting_retrofit",
        geography: "CA, San Francisco County",
        buildingType: "SmallOffice",
        areaFt2: 4000,
        resource: "electricity"
      })
    ).toThrow(/AMBIGUOUS_EXACT_MATCH/);
  } finally {
    database.exec("ROLLBACK");
  }
});

test("rejects changed artifacts and attempted runtime network access", async () => {
  const mutationWorkspace = await mkdtemp(
    join(tmpdir(), "comstock-artifact-mutation-")
  );
  try {
    const changedDictionaryPath = join(
      mutationWorkspace,
      "data_dictionary.tsv"
    );
    const source = await readFile(
      artifactPaths.dataDictionaryPath,
      "utf8"
    );
    await writeFile(
      changedDictionaryPath,
      source.replace(
        "Building total floor area",
        "Building total floor areas"
      )
    );
    await expect(
      inspectComstockRelease({
        ...artifactPaths,
        dataDictionaryPath: changedDictionaryPath
      })
    ).rejects.toThrow(/CORRUPT_CHECKSUM|ARTIFACT_SIZE_MISMATCH/);

    delete process.env.OS_RESEARCH_NETWORK;
    await expect(
      inspectComstockRelease(artifactPaths)
    ).rejects.toThrow(/OFFLINE_GUARD_REQUIRED/);
  } finally {
    await rm(mutationWorkspace, {
      recursive: true,
      force: true
    });
  }
});

test("classifies the complete ComStock chain as end-to-end real", async () => {
  const manifest = JSON.parse(
    await readFile(proofPath, "utf8")
  );
  expect(manifest.processClaims).toHaveLength(1);
  expect(manifest.processClaims[0]).toMatchObject({
    categoryId: "ITC-01",
    processKey: "comstock_annual_delta",
    proofLevel: "END_TO_END_REAL"
  });
  expect(
    Object.values(manifest.processClaims[0].gates)
  ).toEqual(Array(15).fill(true));
});
