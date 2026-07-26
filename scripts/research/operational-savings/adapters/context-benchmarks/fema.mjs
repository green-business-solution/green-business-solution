import { basename } from "node:path";

import {
  assertNetworkDisabled,
  buildProvenance,
  sha256Json,
  verifyArtifact
} from "../../lib/artifact.mjs";
import { upsertSourceProof } from "../../lib/sqlite.mjs";
import {
  inspectFemaGeneratorFuelingSchema
} from "./fema-inspect-schema.mjs";

export const FEMA_GENERATOR_FUELING_ARTIFACT = Object.freeze({
  byteSize: 23_016,
  sha256:
    "104fd7d8fe018001753d4700616f4f5a96bb27ae88440ea794e9d03a0bd32a0a"
});

const STANDARD_ID = "STD-CONTEXT-BENCHMARKS";
const SOURCE_ID = "source:fema-is-815-generator-fueling";
const SCHEMA_ID = "schema:fema-is-815-generator-fueling:2026-07-24";
const RELEASE_ID = "release:fema-is-815-generator-fueling:2026-07-24";
const ARTIFACT_ID = "artifact:fema-is-815-generator-fueling:2026-07-24";
const INGESTION_ID = "ingestion:fema-is-815-generator-fueling:v1";
const POPULATION_ID =
  `context:fema:${RELEASE_ID}:full-load-diesel-generator`;
const VALUE_ID = `${POPULATION_ID}:fuel-coefficient`;
const ADAPTER_PATH =
  "scripts/research/operational-savings/adapters/context-benchmarks/fema.mjs";
const ACQUIRED_AT = "2026-07-24T19:38:11.000Z";
const SOURCE_URL =
  "https://emilms.fema.gov/IS0815/groups/90.html";

function sourceProof(schema, artifact) {
  return {
    source: {
      id: SOURCE_ID,
      standardId: STANDARD_ID,
      organization: "Federal Emergency Management Agency",
      name: "IS-815 Operational generator fueling requirements",
      primaryUrl: SOURCE_URL,
      license:
        "U.S. federal emergency-management training publication",
      attribution: "Federal Emergency Management Agency",
      accessMode: "PUBLIC_HTML_DOWNLOAD"
    },
    schema: {
      id: SCHEMA_ID,
      fingerprintSha256: schema.fingerprintSha256,
      kind: "HTML_NATIVE_FORMULA_AND_APPLICABILITY",
      observed: schema.observed,
      inspectedAt: ACQUIRED_AT
    },
    release: {
      id: RELEASE_ID,
      version: "FEMA IS-815 page acquired 2026-07-24",
      publishedAt: null,
      acquiredAt: ACQUIRED_AT,
      status: "PUBLISHED"
    },
    artifact: {
      id: ARTIFACT_ID,
      sourceUrl: SOURCE_URL,
      localName: basename(artifact.path),
      mediaType: "text/html",
      byteSize: artifact.byteSize,
      sha256: artifact.sha256
    },
    ingestion: {
      id: INGESTION_ID,
      adapterVersion: "context-fema-generator-v1",
      startedAt: ACQUIRED_AT,
      finishedAt: ACQUIRED_AT,
      status: "SUCCEEDED",
      recordsRead: 3,
      recordsWritten: 1,
      warningCount: 2
    }
  };
}

export async function ingestFemaGeneratorFueling({
  artifactPath,
  database
}) {
  assertNetworkDisabled();
  const artifact = await verifyArtifact(
    artifactPath,
    FEMA_GENERATOR_FUELING_ARTIFACT
  );
  const schema = await inspectFemaGeneratorFuelingSchema(
    artifactPath
  );
  upsertSourceProof(database, sourceProof(schema, artifact));
  database.prepare(`
    INSERT INTO benchmark_populations (
      id, source_release_id, standard_id, process_key, filters_json,
      population_size, weighting_field, selection_rule
    ) VALUES (?, ?, ?, 'fema-full-load-diesel-test-fuel', ?, 1, NULL,
      'EXACT_FEMA_DIESEL_FULL_LOAD_RULE_OF_THUMB')
    ON CONFLICT(id) DO UPDATE SET
      filters_json = excluded.filters_json,
      population_size = excluded.population_size,
      selection_rule = excluded.selection_rule
  `).run(
    POPULATION_ID,
    RELEASE_ID,
    STANDARD_ID,
    JSON.stringify({
      technology: "generator",
      fuelType: "diesel",
      loadCondition: "FULL_LOAD",
      annualHoursSource: "PROJECT_DOCUMENT_REQUIRED"
    })
  );
  database.prepare(`
    INSERT INTO benchmark_values (
      id, population_id, field_key, value, unit, sample_size
    ) VALUES (?, ?, 'full_load_diesel_fuel_coefficient', ?,
      'gallon/(hour kW)', 1)
    ON CONFLICT(id) DO UPDATE SET
      value = excluded.value,
      unit = excluded.unit
  `).run(VALUE_ID, POPULATION_ID, schema.coefficient);
  return {
    artifact,
    schema,
    recordsRead: 3,
    recordsWritten: 1,
    normalizedTargets: [
      "benchmark_populations",
      "benchmark_values"
    ]
  };
}

function positiveNumber(value, name, maximum) {
  if (
    typeof value !== "number" ||
    !Number.isFinite(value) ||
    value <= 0 ||
    value > maximum
  ) {
    throw new Error(
      `INVALID_PROJECT_INPUT: ${name} must be greater than 0 and no more than ${maximum}`
    );
  }
  return value;
}

export function mapFemaFullLoadDieselTestFuel(database, {
  technology,
  fuelType,
  loadCondition,
  ratedCapacityKw,
  annualFullLoadTestHoursPerUnit
}) {
  assertNetworkDisabled();
  if (
    String(technology).trim().toLocaleLowerCase("en-US") !==
      "generator" ||
    String(fuelType).trim().toLocaleLowerCase("en-US") !== "diesel" ||
    loadCondition !== "FULL_LOAD"
  ) {
    throw new Error(
      "INCOMPATIBLE_FEMA_GENERATOR_SCOPE: exact diesel generator and FULL_LOAD inputs are required"
    );
  }
  const capacity = positiveNumber(
    ratedCapacityKw,
    "ratedCapacityKw",
    1_000_000
  );
  const hours = positiveNumber(
    annualFullLoadTestHoursPerUnit,
    "annualFullLoadTestHoursPerUnit",
    8_784
  );
  const resolved = database.prepare(`
    SELECT
      p.selection_rule AS selectionRule,
      v.value AS coefficient,
      v.unit
    FROM benchmark_populations p
    JOIN benchmark_values v ON v.population_id = p.id
    WHERE p.id = ?
      AND p.source_release_id = ?
      AND v.field_key = 'full_load_diesel_fuel_coefficient'
  `).get(POPULATION_ID, RELEASE_ID);
  if (!resolved) {
    throw new Error(
      "MISSING_PUBLISHED_FEMA_GENERATOR_FUELING_COEFFICIENT"
    );
  }
  if (
    resolved.unit !== "gallon/(hour kW)" ||
    resolved.coefficient !== 0.07
  ) {
    throw new Error(
      "FEMA_NORMALIZED_UNIT_OR_VALUE_MISMATCH"
    );
  }
  const annualFuelGallons =
    resolved.coefficient * capacity * hours;
  const values = {
    benchmark_annual_test_fuel_per_unit: annualFuelGallons
  };
  const filters = {
    technology: "generator",
    fuelType: "diesel",
    loadCondition,
    ratedCapacityKw: capacity,
    annualFullLoadTestHoursPerUnit: hours
  };
  return {
    standardId: STANDARD_ID,
    categoryId: "ITC-54",
    processKey: "fema-full-load-diesel-test-fuel",
    sourceArtifactId: ARTIFACT_ID,
    sourceReleaseId: RELEASE_ID,
    values,
    formulaBindings: [
      {
        outputName:
          "Annual full-load diesel test fuel per equipment unit",
        formulaTerm:
          "benchmark_annual_test_fuel_per_unit",
        value: annualFuelGallons,
        unit: "fuel-unit/year",
        nativeUnit: "gallons/year",
        scope: "PER_EQUIPMENT_UNIT"
      }
    ],
    selectionRule: resolved.selectionRule,
    warnings: [
      "FEMA labels 0.07 as a rule of thumb.",
      "Annual full-load test hours are a required project-document input and are not supplied by FEMA."
    ],
    provenance: buildProvenance({
      standardId: STANDARD_ID,
      artifact: FEMA_GENERATOR_FUELING_ARTIFACT,
      sourceVersion: "FEMA IS-815 page acquired 2026-07-24",
      sourceFields: [
        "Operational generator fueling requirements formula",
        "40 kW and 24 hour worked example",
        "diesel-only applicability statement"
      ],
      filters,
      transformation:
        "annual diesel gallons per unit = 0.07 gallon/(hour kW) * rated generator kW * documented annual full-load test hours per unit",
      adapterPath: ADAPTER_PATH
    })
  };
}

export function recordFemaFullLoadDieselTestFuel(
  database,
  result
) {
  assertNetworkDisabled();
  if (
    !result ||
    result.standardId !== STANDARD_ID ||
    result.categoryId !== "ITC-54" ||
    result.processKey !== "fema-full-load-diesel-test-fuel"
  ) {
    throw new Error("INVALID_FEMA_GENERATOR_FUELING_RESULT");
  }
  const inputHash = sha256Json(result.provenance.filters);
  const calculationId =
    `calculation:context:fema-full-load-diesel:${RELEASE_ID}:` +
    inputHash.slice(0, 20);
  database.prepare(`
    INSERT INTO calculation_runs (
      id, standard_id, process_key, source_release_id, model_version_id,
      adapter_version, input_sha256, output_sha256, network_disabled,
      status, created_at
    ) VALUES (?, ?, 'fema-full-load-diesel-test-fuel', ?, NULL,
      'context-fema-generator-v1', ?, ?, 1, 'SUCCEEDED', ?)
    ON CONFLICT(id) DO UPDATE SET
      input_sha256 = excluded.input_sha256,
      output_sha256 = excluded.output_sha256,
      status = excluded.status
  `).run(
    calculationId,
    STANDARD_ID,
    RELEASE_ID,
    inputHash,
    sha256Json(result.values),
    ACQUIRED_AT
  );
  const binding = result.formulaBindings[0];
  const selectedValueId =
    `${calculationId}:${binding.formulaTerm}`;
  database.prepare(`
    INSERT INTO selected_values (
      id, calculation_run_id, formula_term, value, unit, scope,
      selection_rule
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
      selected_value_id, source_artifact_id, source_fields_json,
      filters_json, transformation, adapter_path
    ) VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT(selected_value_id) DO UPDATE SET
      source_fields_json = excluded.source_fields_json,
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
  return calculationId;
}
