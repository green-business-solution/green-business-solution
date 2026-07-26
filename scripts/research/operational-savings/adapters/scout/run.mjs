import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

import {
  assertNetworkDisabled,
  buildProvenance,
  sha256Json,
  verifyArtifact
} from "../../lib/artifact.mjs";
import { upsertSourceProof } from "../../lib/sqlite.mjs";
import {
  SCOUT_COMMIT,
  SCOUT_PREPARATION_OUTPUT,
  SCOUT_PREPARATION_RESULT,
  extractScoutConstantRelativeSavings,
  inspectScoutRepository,
  parseScoutPreparationOutput,
  parseScoutPreparationResult
} from "./inspect-schema.mjs";

const SOURCE_ID = "source:scout";
const SCHEMA_ID = "schema:scout:ecm-v1.0.0:72bcf419";
const RELEASE_ID = "release:scout:72bcf419";
const ARTIFACT_ID =
  "artifact:scout-commercial-901-lighting-72bcf419";
const INGESTION_ID =
  "ingestion:scout:72bcf419:ecm-prep-v2";
const MODEL_VERSION_ID =
  "model:scout:ecm-prep:72bcf419";
const PREPARATION_RUN_ID =
  "preparation:scout:commercial-901-lighting:72bcf419";
const ADAPTER_VERSION = "scout-ecm-prep-v2";
const ACQUIRED_AT = "2026-07-24T18:46:53.000Z";
const ADAPTER_PATH =
  "scripts/research/operational-savings/adapters/scout/run.mjs";

export const DEFAULT_SCOUT_PREPARATION_RESULT_PATH =
  fileURLToPath(
    new URL("./prepared-result.v1.json", import.meta.url)
  );
export const DEFAULT_SCOUT_PREPARATION_OUTPUT_PATH =
  fileURLToPath(
    new URL(
      "../../.cache/artifacts/scout-ecm-prep-72bcf419.json",
      import.meta.url
    )
  );

export function scoutBuildingMeasureId(
  nativeMeasureId,
  releaseId = RELEASE_ID
) {
  const normalizedNativeMeasureId = String(
    nativeMeasureId ?? ""
  )
    .normalize("NFKC")
    .toLocaleLowerCase("en-US")
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replaceAll(/^-|-$/g, "");
  if (
    typeof releaseId !== "string" ||
    !releaseId ||
    !normalizedNativeMeasureId
  ) {
    throw new Error(
      "INVALID_RELEASE_SCOPED_SCOUT_MEASURE_ID_INPUT"
    );
  }
  return (
    `scout:measure:${releaseId}:` +
    normalizedNativeMeasureId
  );
}

function sourceProof(
  inspection,
  status,
  recordsRead = 0,
  recordsWritten = 0
) {
  const artifact = inspection.artifacts.lighting;
  return {
    source: {
      id: SOURCE_ID,
      standardId: "STD-SCOUT-ECM-SCREEN",
      organization:
        "U.S. Department of Energy Building Technologies Office",
      name: "Scout",
      primaryUrl: "https://github.com/trynthink/scout",
      license: "Apache-2.0 with a conditional BSD alternative",
      attribution:
        "Scout authors Chioke Harris and Jared Langevin",
      accessMode: "PUBLIC_GIT_REPOSITORY"
    },
    schema: {
      id: SCHEMA_ID,
      fingerprintSha256:
        inspection.schemaFingerprintSha256,
      kind: "SCOUT_ECM_JSON_SCHEMA_AND_PREPARATION_INTERFACE",
      observed: inspection.observedSchema,
      inspectedAt: ACQUIRED_AT
    },
    release: {
      id: RELEASE_ID,
      version: `Git commit ${SCOUT_COMMIT}`,
      publishedAt: "2026-07-23",
      acquiredAt: ACQUIRED_AT,
      status
    },
    artifact: {
      id: ARTIFACT_ID,
      sourceUrl:
        `https://github.com/trynthink/scout/blob/${SCOUT_COMMIT}` +
        "/ecm_definitions/%28C%29%2090.1%20Lighting.json",
      localName: "(C) 90.1 Lighting.json",
      mediaType: "application/json",
      byteSize: artifact.byteSize,
      sha256: artifact.sha256
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

function preparedValueId(buildingType) {
  return `scout:prepared-value:${sha256Json({
    preparationRunId: PREPARATION_RUN_ID,
    buildingType
  }).slice(0, 20)}`;
}

function annualResultId(row) {
  return `scout:annual-result:${sha256Json({
    preparationRunId: PREPARATION_RUN_ID,
    adoptionScenario: row.adoptionScenario,
    year: row.year
  }).slice(0, 20)}`;
}

function publishModelVersion(
  database,
  inspection,
  preparedResult
) {
  database.prepare(`
    INSERT INTO model_versions (
      id, standard_id, package_name, version,
      commit_sha, executable_sha256
    ) VALUES (
      ?, 'STD-SCOUT-ECM-SCREEN', 'Scout ecm_prep',
      ?, ?, ?
    )
    ON CONFLICT(id) DO UPDATE SET
      version = excluded.version,
      commit_sha = excluded.commit_sha,
      executable_sha256 = excluded.executable_sha256
  `).run(
    MODEL_VERSION_ID,
    `Git commit ${SCOUT_COMMIT}`,
    SCOUT_COMMIT,
    inspection.artifacts.entryPoint.sha256
  );

  database.prepare(`
    INSERT INTO model_input_schemas (
      id, model_version_id, module_name,
      fingerprint_sha256, schema_json
    ) VALUES (?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      fingerprint_sha256 = excluded.fingerprint_sha256,
      schema_json = excluded.schema_json
  `).run(
    "model-schema:scout:ecm-prep:72bcf419",
    MODEL_VERSION_ID,
    "ecm_prep:(C) 90.1 Lighting",
    inspection.schemaFingerprintSha256,
    JSON.stringify({
      ecmSchemaId: inspection.schema.$id,
      ecmSchemaVersion: inspection.schema.version,
      preparationResultSchemaVersion:
        preparedResult.schemaVersion,
      executionArguments:
        preparedResult.execution.arguments
    })
  );
}

function publishPreparation(
  database,
  preparedResult,
  preparationOutputArtifact,
  preparationResultArtifact
) {
  const prepared = preparedResult.preparedMeasure;
  database.prepare(`
    INSERT INTO scout_preparation_runs (
      id, source_release_id, source_artifact_id,
      model_version_id, commit_sha, entry_point,
      arguments_json, runtime_json, network_mode,
      output_byte_size, output_sha256,
      independent_replay_count,
      replay_output_sha256
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      arguments_json = excluded.arguments_json,
      runtime_json = excluded.runtime_json,
      network_mode = excluded.network_mode,
      output_byte_size = excluded.output_byte_size,
      output_sha256 = excluded.output_sha256,
      independent_replay_count =
        excluded.independent_replay_count,
      replay_output_sha256 =
        excluded.replay_output_sha256
  `).run(
    PREPARATION_RUN_ID,
    RELEASE_ID,
    ARTIFACT_ID,
    MODEL_VERSION_ID,
    SCOUT_COMMIT,
    preparedResult.execution.entryPoint,
    JSON.stringify(preparedResult.execution.arguments),
    JSON.stringify({
      python: preparedResult.execution.python,
      dependencies:
        preparedResult.execution.dependencies,
      preparationOutputArtifactSha256:
        preparationOutputArtifact.sha256,
      preparationOutputArtifactByteSize:
        preparationOutputArtifact.byteSize,
      compactProofArtifactSha256:
        preparationResultArtifact.sha256,
      compactProofArtifactByteSize:
        preparationResultArtifact.byteSize
    }),
    preparedResult.execution.networkMode,
    preparedResult.execution.outputByteSize,
    preparedResult.execution.outputSha256,
    preparedResult.execution.independentReplayCount,
    preparedResult.execution
      .independentReplayOutputSha256
  );

  database.prepare(`
    INSERT INTO building_upgrade_measures (
      id, source_release_id, native_measure_id,
      name, method
    ) VALUES (?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      name = excluded.name,
      method = excluded.method
  `).run(
    scoutBuildingMeasureId(
      prepared.name,
      RELEASE_ID
    ),
    RELEASE_ID,
    prepared.name,
    prepared.name,
    "Scout ecm_prep at the pinned commit with source-native constant relative savings"
  );

  const insertValue = database.prepare(`
    INSERT INTO scout_prepared_ecm_values (
      id, preparation_run_id, native_measure_name,
      building_type, climate_zones_json,
      structure_types_json, end_use, fuel_type,
      reduction_fraction, native_unit,
      installed_cost, installed_cost_unit,
      product_lifetime, product_lifetime_unit
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      reduction_fraction =
        excluded.reduction_fraction,
      installed_cost = excluded.installed_cost,
      product_lifetime =
        excluded.product_lifetime
  `);
  for (const buildingType of prepared.buildingTypes) {
    insertValue.run(
      preparedValueId(buildingType),
      PREPARATION_RUN_ID,
      prepared.name,
      buildingType,
      JSON.stringify(prepared.climateZones),
      JSON.stringify(prepared.structureTypes),
      prepared.endUse,
      prepared.fuelType,
      prepared.reductionFractions[buildingType],
      prepared.energyEfficiencyUnit,
      prepared.installedCost2020UsdPerFt2[
        buildingType
      ],
      "2020 USD/ft2 floor",
      prepared.productLifetimeYears,
      "years"
    );
  }

  const insertAnnual = database.prepare(`
    INSERT INTO scout_prepared_ecm_annual_results (
      id, preparation_run_id, native_measure_name,
      adoption_scenario, model_year,
      baseline_energy_mmbtu, efficient_energy_mmbtu,
      aggregate_reduction_fraction
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      baseline_energy_mmbtu =
        excluded.baseline_energy_mmbtu,
      efficient_energy_mmbtu =
        excluded.efficient_energy_mmbtu,
      aggregate_reduction_fraction =
        excluded.aggregate_reduction_fraction
  `);
  for (const row of preparedResult.annualModelResults) {
    insertAnnual.run(
      annualResultId(row),
      PREPARATION_RUN_ID,
      prepared.name,
      row.adoptionScenario,
      row.year,
      row.baselineEnergyMmbtu,
      row.efficientEnergyMmbtu,
      row.aggregateReductionFraction
    );
  }
}

export async function ingestScoutPreparedMeasure({
  repositoryPath,
  preparationOutputPath =
    DEFAULT_SCOUT_PREPARATION_OUTPUT_PATH,
  preparationResultPath =
    DEFAULT_SCOUT_PREPARATION_RESULT_PATH,
  database
}) {
  assertNetworkDisabled();
  const [
    inspection,
    preparationOutputArtifact,
    preparationResultArtifact,
    preparationOutputSource,
    preparationResultSource
  ] = await Promise.all([
    inspectScoutRepository(repositoryPath),
    verifyArtifact(
      preparationOutputPath,
      SCOUT_PREPARATION_OUTPUT
    ),
    verifyArtifact(
      preparationResultPath,
      SCOUT_PREPARATION_RESULT
    ),
    readFile(preparationOutputPath, "utf8"),
    readFile(preparationResultPath, "utf8")
  ]);
  const preparedResult = parseScoutPreparationResult(
    preparationResultSource,
    inspection
  );
  const preparedOutput = parseScoutPreparationOutput(
    preparationOutputSource,
    preparedResult
  );
  upsertSourceProof(
    database,
    sourceProof(inspection, "INSPECTED")
  );
  database.exec("BEGIN IMMEDIATE");
  try {
    publishModelVersion(
      database,
      inspection,
      preparedResult
    );
    publishPreparation(
      database,
      preparedResult,
      preparationOutputArtifact,
      preparationResultArtifact
    );
    database.exec("COMMIT");
  } catch (error) {
    database.exec("ROLLBACK");
    throw error;
  }
  const recordsRead =
    preparedResult.preparedMeasure.buildingTypes.length +
    preparedResult.annualModelResults.length +
    1;
  const recordsWritten = recordsRead + 1;
  upsertSourceProof(
    database,
    sourceProof(
      inspection,
      "PUBLISHED",
      recordsRead,
      recordsWritten
    )
  );
  return {
    inspection,
    preparationOutputArtifact,
    preparationResultArtifact,
    preparedResult,
    preparedOutput,
    releaseId: RELEASE_ID,
    modelVersionId: MODEL_VERSION_ID,
    preparationRunId: PREPARATION_RUN_ID,
    recordsRead,
    recordsWritten,
    normalizedTargets: [
      "scout_preparation_runs",
      "scout_prepared_ecm_values",
      "scout_prepared_ecm_annual_results",
      "building_upgrade_measures"
    ]
  };
}

function requireNonEmptyString(value, label) {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(
      `INVALID_SCOUT_MARKET_SELECTOR: ${label}`
    );
  }
  return value;
}

export function resolveExactScoutReduction(
  database,
  {
    measureName,
    buildingType,
    climateZone,
    structureType,
    endUse,
    fuelType
  }
) {
  assertNetworkDisabled();
  const filters = {
    measureName: requireNonEmptyString(
      measureName,
      "measureName"
    ),
    buildingType: requireNonEmptyString(
      buildingType,
      "buildingType"
    ),
    climateZone: requireNonEmptyString(
      climateZone,
      "climateZone"
    ),
    structureType: requireNonEmptyString(
      structureType,
      "structureType"
    ),
    endUse: requireNonEmptyString(endUse, "endUse"),
    fuelType: requireNonEmptyString(
      fuelType,
      "fuelType"
    )
  };
  const rows = database.prepare(`
    SELECT
      value.id,
      value.native_measure_name AS measureName,
      value.building_type AS buildingType,
      value.climate_zones_json AS climateZonesJson,
      value.structure_types_json AS structureTypesJson,
      value.end_use AS endUse,
      value.fuel_type AS fuelType,
      value.reduction_fraction AS reductionFraction,
      value.native_unit AS nativeUnit,
      value.installed_cost AS installedCost,
      value.installed_cost_unit AS installedCostUnit,
      value.product_lifetime AS productLifetime,
      value.product_lifetime_unit AS productLifetimeUnit,
      run.output_sha256 AS preparationOutputSha256,
      artifact.sha256 AS artifactSha256,
      artifact.byte_size AS artifactByteSize
    FROM scout_prepared_ecm_values AS value
    INNER JOIN scout_preparation_runs AS run
      ON run.id = value.preparation_run_id
    INNER JOIN source_artifacts AS artifact
      ON artifact.id = run.source_artifact_id
    WHERE value.native_measure_name = ?
      AND value.building_type = ?
      AND value.end_use = ?
      AND value.fuel_type = ?
      AND run.source_release_id = ?
    ORDER BY value.id
  `).all(
    filters.measureName,
    filters.buildingType,
    filters.endUse,
    filters.fuelType,
    RELEASE_ID
  );
  if (rows.length === 0) {
    throw new Error(
      "NO_EXACT_SCOUT_MARKET_MATCH: measure, building type, end use, or fuel does not match"
    );
  }
  if (rows.length !== 1) {
    throw new Error(
      "AMBIGUOUS_SCOUT_MARKET_MATCH: multiple prepared values match"
    );
  }
  const row = rows[0];
  const climateZones = JSON.parse(row.climateZonesJson);
  const structureTypes = JSON.parse(
    row.structureTypesJson
  );
  if (!climateZones.includes(filters.climateZone)) {
    throw new Error(
      `INCOMPATIBLE_SCOUT_MARKET: climate zone ${filters.climateZone}`
    );
  }
  if (!structureTypes.includes(filters.structureType)) {
    throw new Error(
      `INCOMPATIBLE_SCOUT_MARKET: structure type ${filters.structureType}`
    );
  }
  return {
    ...row,
    climateZones,
    structureTypes,
    filters
  };
}

export function mapScoutPreparedMeasureToItc14(
  database,
  selectors
) {
  const resolved = resolveExactScoutReduction(
    database,
    selectors
  );
  const values = {
    Scout_reduction_fraction_r:
      resolved.reductionFraction
  };
  return {
    categoryId: "ITC-14",
    processKey: "scout_ecm_screen",
    values,
    formulaBindings: [
      {
        formulaTerm:
          "Scout_reduction_fraction_r",
        value: resolved.reductionFraction,
        unit: "fraction",
        scope:
          "EXACT_SCOUT_MEASURE_AND_MARKET_SEGMENT"
      }
    ],
    selectionRule:
      "EXACT_PREPARED_MEASURE_BUILDING_CLIMATE_STRUCTURE_END_USE_AND_FUEL",
    warning:
      "Scout documents that relative savings can retain uncertainty when the cited baseline differs from Scout's baseline.",
    provenance: buildProvenance({
      standardId: "STD-SCOUT-ECM-SCREEN",
      artifact: {
        sha256: resolved.artifactSha256,
        byteSize: resolved.artifactByteSize
      },
      sourceVersion: `Git commit ${SCOUT_COMMIT}`,
      sourceFields: [
        "name",
        "climate_zone",
        "bldg_type",
        "structure_type",
        "end_use",
        "fuel_type",
        "energy_efficiency",
        "energy_efficiency_units",
        "energy_efficiency_source"
      ],
      filters: resolved.filters,
      transformation:
        "Run the pinned Scout ecm_prep path offline, select the exact prepared market row, and map reduction_fraction = energy_efficiency only for the native constant-relative-savings unit",
      adapterPath: ADAPTER_PATH
    })
  };
}

export function recordScoutFormulaMapping(
  database,
  result
) {
  assertNetworkDisabled();
  const calculationId =
    `calculation:scout:itc-14:${RELEASE_ID}:${sha256Json(
      result.provenance.filters
    ).slice(0, 16)}`;
  database.prepare(`
    INSERT INTO calculation_runs (
      id, standard_id, process_key, source_release_id,
      model_version_id, adapter_version, input_sha256,
      output_sha256, network_disabled, status, created_at
    ) VALUES (
      ?, 'STD-SCOUT-ECM-SCREEN', 'scout_ecm_screen',
      ?, ?, ?, ?, ?, 1, 'SUCCEEDED', ?
    )
    ON CONFLICT(id) DO UPDATE SET
      input_sha256 = excluded.input_sha256,
      output_sha256 = excluded.output_sha256,
      status = excluded.status
  `).run(
    calculationId,
    RELEASE_ID,
    MODEL_VERSION_ID,
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
      unit, scope, selection_rule
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
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
      source_fields_json, filters_json,
      transformation, adapter_path
    ) VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT(selected_value_id) DO UPDATE SET
      source_fields_json =
        excluded.source_fields_json,
      filters_json = excluded.filters_json,
      transformation = excluded.transformation,
      adapter_path = excluded.adapter_path
  `).run(
    selectedValueId,
    ARTIFACT_ID,
    JSON.stringify(result.provenance.sourceFields),
    JSON.stringify(result.provenance.filters),
    result.provenance.transformation,
    ADAPTER_PATH
  );
  database.prepare(`
    INSERT INTO calculation_warnings (
      id, calculation_run_id, code, message, severity
    ) VALUES (?, ?, ?, ?, 'NOTICE')
    ON CONFLICT(id) DO UPDATE SET
      message = excluded.message
  `).run(
    `${calculationId}:relative-savings-baseline`,
    calculationId,
    "SCOUT_RELATIVE_SAVINGS_BASELINE_DEPENDENCY",
    result.warning
  );
  return calculationId;
}

export async function inspectScoutLightingMeasure({
  repositoryPath,
  buildingType
}) {
  const inspection =
    await inspectScoutRepository(repositoryPath);
  const sourceValue =
    extractScoutConstantRelativeSavings(
      inspection.lighting,
      { buildingType }
    );
  return {
    inspection,
    sourceValue,
    provenance: buildProvenance({
      standardId: "STD-SCOUT-ECM-SCREEN",
      artifact: inspection.artifacts.lighting,
      sourceVersion: `Git commit ${SCOUT_COMMIT}`,
      sourceFields: [
        "name",
        "climate_zone",
        "bldg_type",
        "end_use",
        "fuel_type",
        "energy_efficiency",
        "energy_efficiency_units",
        "energy_efficiency_source"
      ],
      filters: {
        exactMeasureName: inspection.lighting.name,
        buildingType
      },
      transformation:
        "Select the exact building-type member only when the native unit is relative savings (constant)",
      adapterPath: ADAPTER_PATH
    })
  };
}

export function rejectUnreviewedScoutCrosswalk() {
  throw new Error(
    "REVIEWED_CROSSWALK_REQUIRED: a parsed Scout ECM is not an approved RetroFi retrofit-to-measure mapping"
  );
}
