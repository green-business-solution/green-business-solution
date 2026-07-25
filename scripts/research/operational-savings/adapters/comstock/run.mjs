import { basename } from "node:path";

import { DuckDBInstance } from "@duckdb/node-api";

import {
  assertNetworkDisabled,
  buildProvenance,
  sha256Json
} from "../../lib/artifact.mjs";
import { upsertSourceProof } from "../../lib/sqlite.mjs";
import {
  COMSTOCK_RELEASE,
  inspectComstockRelease,
  inspectComstockUpgradesLookup
} from "./inspect-schema.mjs";

const SOURCE_ID = "source:comstock-2025-release-3";
const SCHEMA_ID = "schema:comstock-2025-release-3";
export const COMSTOCK_SOURCE_RELEASE_ID =
  "release:comstock-2025-release-3";
const INGESTION_ID = "ingestion:comstock-2025-release-3:v2";
const ADAPTER_VERSION = "comstock-annual-delta-v2";
const ADAPTER_PATH =
  "scripts/research/operational-savings/adapters/comstock/run.mjs";
const ACQUIRED_AT = "2026-07-24T00:00:00.000Z";

export const COMSTOCK_LED_SMALL_OFFICE_SELECTION = Object.freeze({
  retrofitId: "led_lighting_retrofit",
  nativeMeasureId: "ltg_0001",
  upgradeId: 43,
  upgradeName: "LED Lighting",
  geography: "CA, San Francisco County",
  state: "CA",
  buildingType: "SmallOffice",
  areaMinFt2: 1000,
  areaMaxFt2: 5500,
  resource: "electricity",
  unit: "kWh/ft2-year",
  minimumPopulation: 30,
  statistic: "SOURCE_WEIGHTED_MEDIAN"
});

function sourceProof(
  inspection,
  status,
  recordsRead = 0,
  recordsWritten = 0
) {
  const baseline = inspection.artifacts.baselineParquet;
  return {
    source: {
      id: SOURCE_ID,
      standardId: "STD-COMSTOCK-ANNUAL-DELTA",
      organization: "National Renewable Energy Laboratory",
      name: "ComStock 2025 AMY2018 Release 3",
      primaryUrl:
        "https://data.openei.org/submissions/7530",
      license: "NREL ComStock data terms retained with source release",
      attribution:
        "National Renewable Energy Laboratory ComStock",
      accessMode: "PUBLIC_OEDI_S3"
    },
    schema: {
      id: SCHEMA_ID,
      fingerprintSha256:
        inspection.schemaFingerprintSha256,
      kind: "COMSTOCK_RELEASE_BUNDLE",
      observed: inspection.observedSchema,
      inspectedAt: ACQUIRED_AT
    },
    release: {
      id: COMSTOCK_SOURCE_RELEASE_ID,
      version: COMSTOCK_RELEASE,
      publishedAt: "2025-01-01",
      acquiredAt: ACQUIRED_AT,
      status
    },
    artifact: {
      id: baseline.artifactId,
      sourceUrl: baseline.sourceUrl,
      localName: basename(baseline.path),
      mediaType: baseline.mediaType,
      byteSize: baseline.byteSize,
      sha256: baseline.sha256
    },
    ingestion: {
      id: INGESTION_ID,
      adapterVersion: ADAPTER_VERSION,
      startedAt: ACQUIRED_AT,
      finishedAt:
        status === "PUBLISHED" ? ACQUIRED_AT : null,
      status:
        status === "PUBLISHED" ? "SUCCEEDED" : "RUNNING",
      recordsRead,
      recordsWritten,
      warningCount: 0
    }
  };
}

function upsertSupportingArtifacts(database, inspection) {
  const insertArtifact = database.prepare(`
    INSERT INTO source_artifacts (
      id, release_id, source_url, local_name, media_type,
      byte_size, sha256, acquired_at, official
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)
    ON CONFLICT(id) DO UPDATE SET
      byte_size = excluded.byte_size,
      sha256 = excluded.sha256
  `);
  const insertChecksum = database.prepare(`
    INSERT INTO source_checksums (
      artifact_id, algorithm, digest, observed_at
    ) VALUES (?, 'sha256', ?, ?)
    ON CONFLICT(artifact_id, algorithm) DO UPDATE SET
      digest = excluded.digest,
      observed_at = excluded.observed_at
  `);
  for (const artifact of Object.values(inspection.artifacts)) {
    insertArtifact.run(
      artifact.artifactId,
      COMSTOCK_SOURCE_RELEASE_ID,
      artifact.sourceUrl,
      basename(artifact.path),
      artifact.mediaType,
      artifact.byteSize,
      artifact.sha256,
      ACQUIRED_AT
    );
    insertChecksum.run(
      artifact.artifactId,
      artifact.sha256,
      ACQUIRED_AT
    );
  }
}

function quoteSqlLiteral(value) {
  return `'${String(value).replaceAll("'", "''")}'`;
}

async function readPairedPopulation({
  baselineParquetPath,
  upgradeParquetPath,
  selection
}) {
  const instance = await DuckDBInstance.create(":memory:");
  const connection = await instance.connect();
  try {
    const result = await connection.run(`
      WITH baseline AS (
        SELECT DISTINCT
          bldg_id,
          weight,
          dataset,
          "in.comstock_building_type" AS building_type,
          "in.sqft..ft2" AS floor_area_ft2,
          "in.county_name" AS geography,
          "in.state" AS state,
          completed_status,
          "out.electricity.total.energy_consumption..kwh"
            AS annual_resource_value
        FROM read_parquet(
          ${quoteSqlLiteral(baselineParquetPath)}
        )
      ),
      proposed AS (
        SELECT DISTINCT
          bldg_id,
          weight,
          dataset,
          "in.comstock_building_type" AS building_type,
          "in.sqft..ft2" AS floor_area_ft2,
          "in.county_name" AS geography,
          "in.state" AS state,
          upgrade,
          applicability,
          completed_status,
          "out.electricity.total.energy_consumption..kwh"
            AS annual_resource_value
        FROM read_parquet(
          ${quoteSqlLiteral(upgradeParquetPath)}
        )
      )
      SELECT
        proposed.bldg_id,
        proposed.weight,
        proposed.dataset,
        proposed.building_type,
        proposed.floor_area_ft2,
        proposed.geography,
        proposed.state,
        proposed.upgrade,
        baseline.annual_resource_value AS baseline_kwh,
        proposed.annual_resource_value AS proposed_kwh,
        (
          baseline.annual_resource_value -
          proposed.annual_resource_value
        ) / proposed.floor_area_ft2 AS delta_kwh_per_ft2
      FROM baseline
      INNER JOIN proposed
        ON baseline.bldg_id = proposed.bldg_id
        AND baseline.weight = proposed.weight
        AND baseline.dataset = proposed.dataset
        AND baseline.building_type = proposed.building_type
        AND baseline.floor_area_ft2 =
          proposed.floor_area_ft2
        AND baseline.geography = proposed.geography
        AND baseline.state = proposed.state
      WHERE baseline.completed_status = 'Success'
        AND proposed.completed_status = 'Success'
        AND proposed.applicability
        AND proposed.upgrade = ${Number(selection.upgradeId)}
        AND proposed.geography =
          ${quoteSqlLiteral(selection.geography)}
        AND proposed.state =
          ${quoteSqlLiteral(selection.state)}
        AND proposed.building_type =
          ${quoteSqlLiteral(selection.buildingType)}
        AND proposed.floor_area_ft2 BETWEEN
          ${Number(selection.areaMinFt2)}
          AND ${Number(selection.areaMaxFt2)}
        AND proposed.floor_area_ft2 > 0
        AND proposed.weight > 0
        AND baseline.annual_resource_value IS NOT NULL
        AND proposed.annual_resource_value IS NOT NULL
      ORDER BY
        proposed.bldg_id,
        proposed.weight
    `);
    const rows = await result.getRowObjects();
    return rows.map((row) => ({
      nativeBuildingId: Number(row.bldg_id),
      sourceWeight: row.weight,
      dataset: row.dataset,
      buildingType: row.building_type,
      floorAreaFt2: row.floor_area_ft2,
      geography: row.geography,
      state: row.state,
      upgradeId: Number(row.upgrade),
      baselineKwh: row.baseline_kwh,
      proposedKwh: row.proposed_kwh,
      deltaKwhPerFt2: row.delta_kwh_per_ft2
    }));
  } finally {
    connection.closeSync();
  }
}

export function calculateSourceWeightedMedian(
  rows,
  {
    minimumPopulation =
      COMSTOCK_LED_SMALL_OFFICE_SELECTION.minimumPopulation
  } = {}
) {
  if (!Array.isArray(rows) || rows.length < minimumPopulation) {
    throw new Error(
      `INSUFFICIENT_BENCHMARK_POPULATION: expected at least ${minimumPopulation}, received ${rows?.length ?? 0}`
    );
  }
  const keys = new Set();
  for (const row of rows) {
    if (
      !Number.isSafeInteger(row.nativeBuildingId) ||
      !Number.isFinite(row.sourceWeight) ||
      row.sourceWeight <= 0 ||
      !Number.isFinite(row.deltaKwhPerFt2)
    ) {
      throw new Error(
        "INCOMPATIBLE_UNIT_OR_VALUE: invalid ComStock paired population row"
      );
    }
    const key = `${row.nativeBuildingId}:${row.sourceWeight}`;
    if (keys.has(key)) {
      throw new Error(
        `AMBIGUOUS_EXACT_MATCH: duplicate ComStock pair ${key}`
      );
    }
    keys.add(key);
  }
  const ordered = [...rows].sort(
    (left, right) =>
      left.deltaKwhPerFt2 - right.deltaKwhPerFt2 ||
      left.nativeBuildingId - right.nativeBuildingId ||
      left.sourceWeight - right.sourceWeight
  );
  const totalWeight = ordered.reduce(
    (sum, row) => sum + row.sourceWeight,
    0
  );
  const threshold = totalWeight / 2;
  let cumulativeWeight = 0;
  for (const row of ordered) {
    cumulativeWeight += row.sourceWeight;
    if (cumulativeWeight >= threshold) {
      return {
        value: row.deltaKwhPerFt2,
        totalWeight,
        populationSize: ordered.length,
        selectionRule:
          "FIRST_SOURCE_WEIGHTED_DELTA_AT_OR_ABOVE_HALF_TOTAL_WEIGHT"
      };
    }
  }
  throw new Error(
    "INSUFFICIENT_BENCHMARK_POPULATION: weighted median was not selected"
  );
}

export function comstockReleaseScopedId(
  sourceReleaseId,
  kind,
  identity
) {
  if (
    typeof sourceReleaseId !== "string" ||
    sourceReleaseId.length === 0 ||
    typeof kind !== "string" ||
    !/^[a-z0-9-]+$/.test(kind)
  ) {
    throw new Error(
      "INVALID_RELEASE_SCOPED_ID: source release and kind are required"
    );
  }
  return `comstock:${kind}:${sha256Json({
    sourceReleaseId,
    identity
  }).slice(0, 20)}`;
}

function resultId(
  sourceReleaseId,
  kind,
  row,
  {
    sourceArtifactId,
    resource,
    upgradeId
  }
) {
  return comstockReleaseScopedId(
    sourceReleaseId,
    kind,
    {
      nativeBuildingId: row.nativeBuildingId,
      sourceWeight: row.sourceWeight,
      dataset: row.dataset,
      sourceArtifactId,
      resource,
      upgradeId
    }
  );
}

export function publishComstockNormalizedPopulation(
  database,
  inspection,
  rows,
  benchmark,
  selection,
  {
    sourceReleaseId = COMSTOCK_SOURCE_RELEASE_ID
  } = {}
) {
  const baselineArtifactId =
    inspection.artifacts.baselineParquet.artifactId;
  const upgradeArtifactId =
    inspection.artifacts.upgradeParquet.artifactId;
  for (const artifactId of [
    baselineArtifactId,
    upgradeArtifactId
  ]) {
    const artifact = database.prepare(`
      SELECT release_id AS releaseId
      FROM source_artifacts
      WHERE id = ?
    `).get(artifactId);
    if (
      !artifact ||
      artifact.releaseId !== sourceReleaseId
    ) {
      throw new Error(
        "RELEASE_LINEAGE_MISMATCH: ComStock result artifact does not belong to its declared release"
      );
    }
  }
  const filters = {
    retrofitId: selection.retrofitId,
    nativeMeasureId: selection.nativeMeasureId,
    upgradeId: selection.upgradeId,
    upgradeName: selection.upgradeName,
    geography: selection.geography,
    state: selection.state,
    buildingType: selection.buildingType,
    areaMinFt2: selection.areaMinFt2,
    areaMaxFt2: selection.areaMaxFt2,
    resource: selection.resource,
    eligibility:
      "baseline and upgrade completed_status=Success; upgrade applicability=true; positive floor area and source weight"
  };
  const measureId = comstockReleaseScopedId(
    sourceReleaseId,
    "measure",
    {
      nativeMeasureId: selection.nativeMeasureId
    }
  );
  const crosswalkId = comstockReleaseScopedId(
    sourceReleaseId,
    "crosswalk",
    {
      retrofitId: selection.retrofitId,
      nativeMeasureId: selection.nativeMeasureId
    }
  );
  const populationId = comstockReleaseScopedId(
    sourceReleaseId,
    "population",
    filters
  );
  const benchmarkValueId = comstockReleaseScopedId(
    sourceReleaseId,
    "benchmark-value",
    {
      populationId,
      fieldKey: "median_ComStock_delta_r_per_ft²"
    }
  );
  const benchmarkId = comstockReleaseScopedId(
    sourceReleaseId,
    "benchmark",
    {
      measureId,
      geography: selection.geography,
      buildingType: selection.buildingType,
      areaMinFt2: selection.areaMinFt2,
      areaMaxFt2: selection.areaMaxFt2,
      resource: selection.resource
    }
  );

  const insertResult = database.prepare(`
    INSERT INTO comstock_building_results (
      id, source_release_id, source_artifact_id,
      native_building_id, source_weight, upgrade_id,
      geography, building_type, floor_area_ft2, resource,
      annual_resource_value, unit, applicability,
      completed_status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'kWh/year',
      1, 'Success')
    ON CONFLICT(id) DO UPDATE SET
      annual_resource_value =
        excluded.annual_resource_value,
      source_weight = excluded.source_weight
  `);
  const insertDelta = database.prepare(`
    INSERT INTO comstock_paired_resource_deltas (
      id, source_release_id, baseline_result_id,
      upgrade_result_id, native_measure_id, resource,
      delta_per_ft2, unit
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      delta_per_ft2 = excluded.delta_per_ft2,
      unit = excluded.unit
  `);

  database.exec("BEGIN IMMEDIATE");
  try {
    database.prepare(`
      INSERT INTO building_upgrade_measures (
        id, source_release_id, native_measure_id, name, method
      ) VALUES (?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        name = excluded.name,
        method = excluded.method
    `).run(
      measureId,
      sourceReleaseId,
      selection.nativeMeasureId,
      selection.upgradeName,
      `ComStock upgrade ${selection.upgradeId}`
    );
    database.prepare(`
      INSERT INTO retrofit_measure_crosswalks (
        id, source_release_id, retrofit_id,
        native_measure_id, review_status
      ) VALUES (?, ?, ?, ?,
        'APPROVED_IN_OPERATIONAL_SAVINGS_STANDARD_REGISTRY')
      ON CONFLICT(id) DO UPDATE SET
        review_status = excluded.review_status
    `).run(
      crosswalkId,
      sourceReleaseId,
      selection.retrofitId,
      selection.nativeMeasureId
    );

    for (const row of rows) {
      const baselineResultId = resultId(
        sourceReleaseId,
        "baseline",
        row,
        {
          sourceArtifactId: baselineArtifactId,
          resource: selection.resource,
          upgradeId: 0
        }
      );
      const upgradeResultId = resultId(
        sourceReleaseId,
        `upgrade-${selection.upgradeId}`,
        row,
        {
          sourceArtifactId: upgradeArtifactId,
          resource: selection.resource,
          upgradeId: selection.upgradeId
        }
      );
      insertResult.run(
        baselineResultId,
        sourceReleaseId,
        baselineArtifactId,
        row.nativeBuildingId,
        row.sourceWeight,
        0,
        row.geography,
        row.buildingType,
        row.floorAreaFt2,
        selection.resource,
        row.baselineKwh
      );
      insertResult.run(
        upgradeResultId,
        sourceReleaseId,
        upgradeArtifactId,
        row.nativeBuildingId,
        row.sourceWeight,
        selection.upgradeId,
        row.geography,
        row.buildingType,
        row.floorAreaFt2,
        selection.resource,
        row.proposedKwh
      );
      insertDelta.run(
        comstockReleaseScopedId(
          sourceReleaseId,
          "delta",
          {
            baselineResultId,
            upgradeResultId,
            nativeMeasureId: selection.nativeMeasureId
          }
        ),
        sourceReleaseId,
        baselineResultId,
        upgradeResultId,
        selection.nativeMeasureId,
        selection.resource,
        row.deltaKwhPerFt2,
        selection.unit
      );
    }

    database.prepare(`
      INSERT INTO benchmark_populations (
        id, source_release_id, standard_id, process_key,
        filters_json, population_size, weighting_field,
        selection_rule
      ) VALUES (?, ?, 'STD-COMSTOCK-ANNUAL-DELTA',
        'comstock_annual_delta', ?, ?, 'weight', ?)
      ON CONFLICT(id) DO UPDATE SET
        filters_json = excluded.filters_json,
        population_size = excluded.population_size,
        weighting_field = excluded.weighting_field,
        selection_rule = excluded.selection_rule
    `).run(
      populationId,
      sourceReleaseId,
      JSON.stringify(filters),
      benchmark.populationSize,
      benchmark.selectionRule
    );
    database.prepare(`
      INSERT INTO benchmark_values (
        id, population_id, field_key, value, unit, sample_size
      ) VALUES (?, ?, 'median_ComStock_delta_r_per_ft²',
        ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        value = excluded.value,
        unit = excluded.unit,
        sample_size = excluded.sample_size
    `).run(
      benchmarkValueId,
      populationId,
      benchmark.value,
      selection.unit,
      benchmark.populationSize
    );
    database.prepare(`
      INSERT INTO building_archetype_benchmarks (
        id, source_release_id, measure_id, geography,
        building_type, area_min_ft2, area_max_ft2, resource,
        delta_per_ft2, unit, source_weight, population_size
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        delta_per_ft2 = excluded.delta_per_ft2,
        source_weight = excluded.source_weight,
        population_size = excluded.population_size
    `).run(
      benchmarkId,
      sourceReleaseId,
      measureId,
      selection.geography,
      selection.buildingType,
      selection.areaMinFt2,
      selection.areaMaxFt2,
      selection.resource,
      benchmark.value,
      selection.unit,
      benchmark.totalWeight,
      benchmark.populationSize
    );
    database.exec("COMMIT");
  } catch (error) {
    database.exec("ROLLBACK");
    throw error;
  }

  return {
    measureId,
    crosswalkId,
    populationId,
    benchmarkValueId,
    benchmarkId
  };
}

export async function ingestComstockAnnualDelta({
  artifactPaths,
  database,
  selection = COMSTOCK_LED_SMALL_OFFICE_SELECTION
}) {
  assertNetworkDisabled();
  const inspection = await inspectComstockRelease(artifactPaths);
  upsertSourceProof(
    database,
    sourceProof(inspection, "INSPECTED")
  );
  upsertSupportingArtifacts(database, inspection);

  const rows = await readPairedPopulation({
    baselineParquetPath: artifactPaths.baselineParquetPath,
    upgradeParquetPath: artifactPaths.upgradeParquetPath,
    selection
  });
  const benchmark = calculateSourceWeightedMedian(rows, {
    minimumPopulation: selection.minimumPopulation
  });
  const published = publishComstockNormalizedPopulation(
    database,
    inspection,
    rows,
    benchmark,
    selection
  );
  const recordsRead =
    inspection.observedSchema.baselineParquet.rowCount +
    inspection.observedSchema.upgradeParquet.rowCount;
  const recordsWritten = rows.length * 3 + 5;
  upsertSourceProof(
    database,
    sourceProof(
      inspection,
      "PUBLISHED",
      recordsRead,
      recordsWritten
    )
  );
  upsertSupportingArtifacts(database, inspection);
  return {
    inspection,
    selection,
    pairedRows: rows,
    benchmark,
    ...published,
    recordsRead,
    recordsWritten,
    normalizedTargets: [
      "building_upgrade_measures",
      "retrofit_measure_crosswalks",
      "comstock_building_results",
      "comstock_paired_resource_deltas",
      "benchmark_populations",
      "benchmark_values",
      "building_archetype_benchmarks"
    ]
  };
}

export function resolveComstockAnnualDelta(
  database,
  {
    retrofitId,
    geography,
    buildingType,
    areaFt2,
    resource,
    sourceReleaseId = COMSTOCK_SOURCE_RELEASE_ID
  }
) {
  assertNetworkDisabled();
  if (!Number.isFinite(areaFt2) || areaFt2 <= 0) {
    throw new Error(
      "INCOMPATIBLE_UNIT_OR_VALUE: areaFt2 must be positive"
    );
  }
  const rows = database.prepare(`
    SELECT
      benchmark.id,
      benchmark.delta_per_ft2 AS deltaPerFt2,
      benchmark.unit,
      benchmark.source_weight AS sourceWeight,
      benchmark.population_size AS populationSize,
      crosswalk.source_release_id AS sourceReleaseId,
      measure.native_measure_id AS nativeMeasureId,
      measure.name AS measureName,
      crosswalk.review_status AS crosswalkReviewStatus
    FROM retrofit_measure_crosswalks AS crosswalk
    INNER JOIN building_upgrade_measures AS measure
      ON measure.source_release_id =
        crosswalk.source_release_id
      AND measure.native_measure_id =
        crosswalk.native_measure_id
    INNER JOIN building_archetype_benchmarks AS benchmark
      ON benchmark.source_release_id =
        crosswalk.source_release_id
      AND benchmark.measure_id = measure.id
    WHERE crosswalk.retrofit_id = ?
      AND crosswalk.source_release_id = ?
      AND benchmark.geography = ?
      AND benchmark.building_type = ?
      AND ? BETWEEN benchmark.area_min_ft2
        AND benchmark.area_max_ft2
      AND benchmark.resource = ?
    ORDER BY benchmark.id
  `).all(
    retrofitId,
    sourceReleaseId,
    geography,
    buildingType,
    areaFt2,
    resource
  );
  if (rows.length === 0) {
    throw new Error(
      "NO_EXACT_MATCH: ComStock approved measure and building segment"
    );
  }
  if (rows.length !== 1) {
    throw new Error(
      "AMBIGUOUS_EXACT_MATCH: ComStock approved measure and building segment"
    );
  }
  return rows[0];
}

export function mapComstockAnnualDeltaToItc01(
  database,
  inputs
) {
  assertNetworkDisabled();
  const resolved = resolveComstockAnnualDelta(database, inputs);
  const filters = {
    ...inputs,
    sourceReleaseId: resolved.sourceReleaseId,
    nativeMeasureId: resolved.nativeMeasureId,
    crosswalkReviewStatus:
      resolved.crosswalkReviewStatus,
    populationSize: resolved.populationSize,
    sourceWeight: resolved.sourceWeight
  };
  const release = database.prepare(`
    SELECT version
    FROM source_releases
    WHERE id = ?
  `).get(resolved.sourceReleaseId);
  if (!release) {
    throw new Error(
      `NO_EXACT_MATCH: ComStock source release ${resolved.sourceReleaseId}`
    );
  }
  const artifacts = database.prepare(`
    SELECT
      artifact.id AS artifactId,
      artifact.source_url AS sourceUrl,
      artifact.sha256,
      artifact.byte_size AS byteSize,
      artifact.local_name AS localName,
      MAX(result.upgrade_id) AS upgradeId
    FROM source_artifacts AS artifact
    LEFT JOIN comstock_building_results AS result
      ON result.source_artifact_id = artifact.id
      AND result.source_release_id = artifact.release_id
    WHERE artifact.release_id = ?
    GROUP BY artifact.id
    ORDER BY artifact.id
  `).all(resolved.sourceReleaseId);
  const primaryArtifact =
    artifacts.find(
      (artifact) => artifact.upgradeId !== null &&
        artifact.upgradeId !== 0
    ) ?? artifacts[0];
  if (!primaryArtifact) {
    throw new Error(
      `NO_EXACT_MATCH: ComStock artifacts for ${resolved.sourceReleaseId}`
    );
  }
  const primaryProvenance = buildProvenance({
    standardId: "STD-COMSTOCK-ANNUAL-DELTA",
    artifact: primaryArtifact,
    sourceVersion: release.version,
    sourceFields: [
      "bldg_id",
      "weight",
      "upgrade",
      "applicability",
      "completed_status",
      "in.comstock_building_type",
      "in.county_name",
      "in.state",
      "in.sqft..ft2",
      "out.electricity.total.energy_consumption..kwh"
    ],
    filters,
    transformation:
      "Join distinct real baseline and upgrade records by bldg_id, source weight, dataset, and immutable segment dimensions; calculate (baseline annual kWh - upgrade annual kWh) / floor area; select the first source-weighted delta at or above half of total release weight.",
    adapterPath: ADAPTER_PATH
  });
  const provenance = {
    ...primaryProvenance,
    primaryArtifactId: primaryArtifact.artifactId,
    artifacts: artifacts.map((artifact) => ({
      artifactId: artifact.artifactId,
      sourceUrl: artifact.sourceUrl,
      sha256: artifact.sha256,
      byteSize: artifact.byteSize
    }))
  };
  provenance.provenanceSha256 = sha256Json({
    ...provenance,
    provenanceSha256: undefined
  });
  return {
    standardId: "STD-COMSTOCK-ANNUAL-DELTA",
    categoryId: "ITC-01",
    processKey: "comstock_annual_delta",
    sourceReleaseId: resolved.sourceReleaseId,
    values: {
      "median_ComStock_delta_r_per_ft²":
        resolved.deltaPerFt2
    },
    formulaBindings: [
      {
        outputName:
          "Source-weighted median annual electricity saving per square foot",
        formulaTerm:
          "median_ComStock_delta_r_per_ft²",
        value: resolved.deltaPerFt2,
        unit: resolved.unit,
        scope:
          "COMSTOCK_CA_SAN_FRANCISCO_SMALL_OFFICE_1000_TO_5500_FT2_LED_LIGHTING"
      }
    ],
    selectionRule:
      "APPROVED_RETROFIT_CROSSWALK_AND_EXACT_GEOGRAPHY_BUILDING_TYPE_AREA_RESOURCE_SEGMENT",
    provenance
  };
}

export function recordComstockFormulaMapping(database, result) {
  assertNetworkDisabled();
  const calculationId = `calculation:comstock:itc-01:${sha256Json(
    {
      sourceReleaseId: result.sourceReleaseId,
      filters: result.provenance.filters
    }
  ).slice(0, 16)}`;
  database.prepare(`
    INSERT INTO calculation_runs (
      id, standard_id, process_key, source_release_id,
      model_version_id, adapter_version, input_sha256,
      output_sha256, network_disabled, status, created_at
    ) VALUES (
      ?, 'STD-COMSTOCK-ANNUAL-DELTA',
      'comstock_annual_delta', ?, NULL, ?, ?, ?, 1,
      'SUCCEEDED', ?
    )
    ON CONFLICT(id) DO UPDATE SET
      input_sha256 = excluded.input_sha256,
      output_sha256 = excluded.output_sha256
  `).run(
    calculationId,
    result.sourceReleaseId,
    ADAPTER_VERSION,
    sha256Json(result.provenance.filters),
    sha256Json(result.values),
    ACQUIRED_AT
  );
  const binding = result.formulaBindings[0];
  const selectedValueId =
    `${calculationId}:${binding.formulaTerm}`;
  database.prepare(`
    INSERT INTO selected_values (
      id, calculation_run_id, formula_term, value,
      value_json, unit, scope, selection_rule
    ) VALUES (?, ?, ?, ?, NULL, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      value = excluded.value,
      unit = excluded.unit,
      scope = excluded.scope,
      selection_rule = excluded.selection_rule
  `).run(
    selectedValueId,
    calculationId,
    binding.formulaTerm,
    binding.value,
    binding.unit,
    binding.scope,
    result.selectionRule
  );
  database.prepare(`
    INSERT INTO selected_value_provenance (
      selected_value_id, source_artifact_id,
      source_fields_json, filters_json, transformation,
      adapter_path
    ) VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT(selected_value_id) DO UPDATE SET
      source_artifact_id = excluded.source_artifact_id,
      source_fields_json = excluded.source_fields_json,
      filters_json = excluded.filters_json,
      transformation = excluded.transformation,
      adapter_path = excluded.adapter_path
  `).run(
    selectedValueId,
    result.provenance.primaryArtifactId,
    JSON.stringify({
      fields: result.provenance.sourceFields,
      artifacts: result.provenance.artifacts
    }),
    JSON.stringify(result.provenance.filters),
    result.provenance.transformation,
    result.provenance.adapterPath
  );
  return calculationId;
}

export async function loadComstockUpgradeEnumeration({
  artifactPath
}) {
  const inspection = await inspectComstockUpgradesLookup(
    artifactPath
  );
  return {
    ...inspection,
    normalizedRecords: inspection.records.map((record) => ({
      sourceStandardId: "STD-COMSTOCK-ANNUAL-DELTA",
      sourceVersion: COMSTOCK_RELEASE,
      nativeUpgradeId: String(record.upgradeId),
      name: record.upgradeName
    }))
  };
}

export function resolveComstockUpgrade(
  records,
  {
    upgradeId,
    upgradeName
  } = {}
) {
  if (upgradeId === undefined && !upgradeName) {
    throw new Error(
      "MISSING_REQUIRED_INPUT: upgradeId or upgradeName"
    );
  }
  const matches = records.filter(
    (record) =>
      (upgradeId === undefined ||
        record.upgradeId === Number(upgradeId)) &&
      (!upgradeName ||
        record.upgradeName === upgradeName)
  );
  if (!matches.length) {
    throw new Error("NO_EXACT_MATCH: ComStock upgrade");
  }
  if (matches.length !== 1) {
    throw new Error(
      "AMBIGUOUS_EXACT_MATCH: ComStock upgrade"
    );
  }
  return matches[0];
}
