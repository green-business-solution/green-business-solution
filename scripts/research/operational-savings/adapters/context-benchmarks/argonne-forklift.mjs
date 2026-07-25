import { basename } from "node:path";

import {
  assertNetworkDisabled,
  buildProvenance,
  sha256Json,
  verifyArtifact
} from "../../lib/artifact.mjs";
import { upsertSourceProof } from "../../lib/sqlite.mjs";
import {
  inspectArgonneForkliftSchema
} from "./argonne-forklift-inspect-schema.mjs";

export const ARGONNE_FORKLIFT_ARTIFACT = Object.freeze({
  byteSize: 2_114_765,
  sha256:
    "cf26a69395287f5cdadc7125674632501def5033a8b37774c7a006d6ca5b9eed"
});

const STANDARD_ID = "STD-CONTEXT-BENCHMARKS";
const SOURCE_ID = "source:argonne-forklift-anl-esd-08-3";
const SCHEMA_ID = "schema:argonne-forklift-anl-esd-08-3";
const RELEASE_ID = "release:argonne-forklift-anl-esd-08-3";
const ARTIFACT_ID = "artifact:argonne-forklift-anl-esd-08-3";
const INGESTION_ID =
  "ingestion:argonne-forklift-anl-esd-08-3:v1";
const POPULATION_ID =
  `context:argonne-forklift:${RELEASE_ID}:5000-lb-electric-propane`;
const ADAPTER_PATH =
  "scripts/research/operational-savings/adapters/context-benchmarks/argonne-forklift.mjs";
const ACQUIRED_AT = "2026-07-24T19:38:13.000Z";
const SOURCE_URL =
  "https://www1.eere.energy.gov/hydrogenandfuelcells/pdfs/forklift_anl_esd.pdf";

function sourceProof(schema, artifact) {
  return {
    source: {
      id: SOURCE_ID,
      standardId: STANDARD_ID,
      organization: "Argonne National Laboratory",
      name:
        "Full Fuel-Cycle Comparison of Forklift Propulsion Systems",
      primaryUrl: SOURCE_URL,
      license:
        "U.S. Department of Energy national-laboratory technical report",
      attribution:
        "Argonne National Laboratory report ANL/ESD/08-3",
      accessMode: "PUBLIC_PDF_DOWNLOAD"
    },
    schema: {
      id: SCHEMA_ID,
      fingerprintSha256: schema.fingerprintSha256,
      kind: "PDF_NATIVE_SIDE_BY_SIDE_COMPARISON",
      observed: schema.observed,
      inspectedAt: ACQUIRED_AT
    },
    release: {
      id: RELEASE_ID,
      version: "ANL/ESD/08-3, October 2008",
      publishedAt: "2008-10-01T00:00:00.000Z",
      acquiredAt: ACQUIRED_AT,
      status: "PUBLISHED"
    },
    artifact: {
      id: ARTIFACT_ID,
      sourceUrl: SOURCE_URL,
      localName: basename(artifact.path),
      mediaType: "application/pdf",
      byteSize: artifact.byteSize,
      sha256: artifact.sha256
    },
    ingestion: {
      id: INGESTION_ID,
      adapterVersion: "context-argonne-forklift-v1",
      startedAt: ACQUIRED_AT,
      finishedAt: ACQUIRED_AT,
      status: "SUCCEEDED",
      recordsRead: 2,
      recordsWritten: 2,
      warningCount: 2
    }
  };
}

export async function ingestArgonneForkliftComparison({
  artifactPath,
  database
}) {
  assertNetworkDisabled();
  const artifact = await verifyArtifact(
    artifactPath,
    ARGONNE_FORKLIFT_ARTIFACT
  );
  const schema = await inspectArgonneForkliftSchema(
    artifactPath
  );
  upsertSourceProof(database, sourceProof(schema, artifact));
  database.prepare(`
    INSERT INTO benchmark_populations (
      id, source_release_id, standard_id, process_key, filters_json,
      population_size, weighting_field, selection_rule
    ) VALUES (?, ?, ?, 'context_benchmarks', ?, 1, NULL,
      'EXACT_5000_LB_EPRI_SIDE_BY_SIDE_ELECTRIC_PROPANE_CASE')
    ON CONFLICT(id) DO UPDATE SET
      filters_json = excluded.filters_json,
      selection_rule = excluded.selection_rule
  `).run(
    POPULATION_ID,
    RELEASE_ID,
    STANDARD_ID,
    JSON.stringify({
      equipmentClass: "FORKLIFT",
      ratedCapacityLb: schema.ratedCapacityLb,
      existingPropulsion: "PROPANE",
      proposedPropulsion: "BATTERY_ELECTRIC",
      comparableDuty:
        "EPRI_SIDE_BY_SIDE_COST_COMPARISON"
    })
  );
  const insertValue = database.prepare(`
    INSERT INTO benchmark_values (
      id, population_id, field_key, value, unit, sample_size
    ) VALUES (?, ?, ?, ?, ?, 1)
    ON CONFLICT(id) DO UPDATE SET
      value = excluded.value,
      unit = excluded.unit
  `);
  insertValue.run(
    `${POPULATION_ID}:existing-propane`,
    POPULATION_ID,
    "existing_fuel_per_hour",
    schema.propaneGallonsPerHour,
    "gallons/hour"
  );
  insertValue.run(
    `${POPULATION_ID}:proposed-electricity`,
    POPULATION_ID,
    "proposed_kWh_per_hour",
    schema.wallElectricityKwhPerHour,
    "kWh/hour"
  );
  return {
    artifact,
    schema,
    recordsRead: 2,
    recordsWritten: 2,
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

export function mapArgonneForkliftComparison(database, {
  equipmentClass,
  ratedCapacityLb,
  existingPropulsion,
  proposedPropulsion,
  comparableDuty,
  annualOperatingHours
}) {
  assertNetworkDisabled();
  const filters = {
    equipmentClass,
    ratedCapacityLb,
    existingPropulsion,
    proposedPropulsion,
    comparableDuty
  };
  const expected = {
    equipmentClass: "FORKLIFT",
    ratedCapacityLb: 5_000,
    existingPropulsion: "PROPANE",
    proposedPropulsion: "BATTERY_ELECTRIC",
    comparableDuty: "EPRI_SIDE_BY_SIDE_COST_COMPARISON"
  };
  if (
    Object.entries(expected).some(
      ([key, value]) => filters[key] !== value
    )
  ) {
    throw new Error(
      "INCOMPATIBLE_ARGONNE_FORKLIFT_SCOPE: the exact 5,000 lb EPRI electric-propane side-by-side case is required"
    );
  }
  const hours = positiveNumber(
    annualOperatingHours,
    "annualOperatingHours",
    8_784
  );
  const rows = database.prepare(`
    SELECT
      v.field_key AS fieldKey,
      v.value,
      v.unit,
      p.selection_rule AS selectionRule
    FROM benchmark_populations p
    JOIN benchmark_values v ON v.population_id = p.id
    WHERE p.id = ?
      AND p.source_release_id = ?
    ORDER BY v.field_key
  `).all(POPULATION_ID, RELEASE_ID);
  if (
    rows.length !== 2 ||
    rows[0].fieldKey !== "existing_fuel_per_hour" ||
    rows[0].unit !== "gallons/hour" ||
    rows[1].fieldKey !== "proposed_kWh_per_hour" ||
    rows[1].unit !== "kWh/hour"
  ) {
    throw new Error(
      "MISSING_PUBLISHED_ARGONNE_FORKLIFT_COMPARISON"
    );
  }
  const values = Object.fromEntries(
    rows.map(({ fieldKey, value }) => [fieldKey, value])
  );
  const provenanceFilters = {
    ...filters,
    annualOperatingHours: hours
  };
  return {
    standardId: STANDARD_ID,
    categoryId: "ITC-30",
    processKey: "context_benchmarks",
    sourceArtifactId: ARTIFACT_ID,
    sourceReleaseId: RELEASE_ID,
    values,
    formulaBindings: [
      {
        outputName:
          "One compatible existing fuel-use intensity",
        formulaTerm: "existing_fuel_per_hour",
        value: values.existing_fuel_per_hour,
        unit: "fuel-unit/hour",
        nativeUnit: "gallons/hour",
        scope: "PER_HOUR"
      },
      {
        outputName:
          "One compatible proposed wall-electricity intensity",
        formulaTerm: "proposed_kWh_per_hour",
        value: values.proposed_kWh_per_hour,
        unit: "kWh/hour",
        scope: "PER_HOUR"
      }
    ],
    selectionRule: rows[0].selectionRule,
    warnings: [
      "The source reports a narrow side-by-side cost comparison, not a universal forklift default.",
      "Annual operating hours are a connected schedule output and do not alter the hourly intensities."
    ],
    provenance: buildProvenance({
      standardId: STANDARD_ID,
      artifact: ARGONNE_FORKLIFT_ARTIFACT,
      sourceVersion: "ANL/ESD/08-3, October 2008",
      sourceFields: [
        "Section 3.1 5,000 lb side-by-side comparison",
        "Section 3.1 7.5 kWh/h electric intensity",
        "Section 3.1 1.38 gal/h propane intensity"
      ],
      filters: provenanceFilters,
      transformation:
        "Exact same-paragraph hourly intensity selection for the source's 5,000 lb electric and propane comparison",
      adapterPath: ADAPTER_PATH
    })
  };
}

export function recordArgonneForkliftComparison(
  database,
  result
) {
  assertNetworkDisabled();
  if (
    !result ||
    result.standardId !== STANDARD_ID ||
    result.categoryId !== "ITC-30" ||
    result.processKey !== "context_benchmarks"
  ) {
    throw new Error("INVALID_ARGONNE_FORKLIFT_RESULT");
  }
  const inputHash = sha256Json(result.provenance.filters);
  const calculationId =
    `calculation:context:argonne-forklift:${RELEASE_ID}:` +
    inputHash.slice(0, 20);
  database.prepare(`
    INSERT INTO calculation_runs (
      id, standard_id, process_key, source_release_id, model_version_id,
      adapter_version, input_sha256, output_sha256, network_disabled,
      status, created_at
    ) VALUES (?, ?, 'context_benchmarks', ?, NULL,
      'context-argonne-forklift-v1', ?, ?, 1, 'SUCCEEDED', ?)
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
  const insertValue = database.prepare(`
    INSERT INTO selected_values (
      id, calculation_run_id, formula_term, value, unit, scope,
      selection_rule
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      value = excluded.value,
      unit = excluded.unit,
      scope = excluded.scope,
      selection_rule = excluded.selection_rule
  `);
  const insertProvenance = database.prepare(`
    INSERT INTO selected_value_provenance (
      selected_value_id, source_artifact_id, source_fields_json,
      filters_json, transformation, adapter_path
    ) VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT(selected_value_id) DO UPDATE SET
      source_fields_json = excluded.source_fields_json,
      filters_json = excluded.filters_json,
      transformation = excluded.transformation,
      adapter_path = excluded.adapter_path
  `);
  for (const binding of result.formulaBindings) {
    const selectedValueId =
      `${calculationId}:${binding.formulaTerm}`;
    insertValue.run(
      selectedValueId,
      calculationId,
      binding.formulaTerm,
      binding.value,
      binding.unit,
      binding.scope,
      result.selectionRule
    );
    insertProvenance.run(
      selectedValueId,
      ARTIFACT_ID,
      JSON.stringify(result.provenance.sourceFields),
      JSON.stringify(result.provenance.filters),
      result.provenance.transformation,
      ADAPTER_PATH
    );
  }
  return calculationId;
}
