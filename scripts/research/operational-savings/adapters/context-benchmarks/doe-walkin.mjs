import { basename } from "node:path";

import {
  assertNetworkDisabled,
  buildProvenance,
  sha256Json,
  verifyArtifact
} from "../../lib/artifact.mjs";
import { upsertSourceProof } from "../../lib/sqlite.mjs";
import {
  DEFAULT_DOE_WALKIN_FIXTURE_URL,
  inspectDoeWalkInSchema
} from "./doe-walkin-inspect-schema.mjs";

export const DOE_WALKIN_ARTIFACT = Object.freeze({
  byteSize: 5_240_469,
  sha256:
    "d46c285120da35349dfe1017b1d2739cfa20efe62f00261e89c8c225c6fd1bbc"
});

export const DOE_WALKIN_REVIEWED_FIXTURE =
  Object.freeze({
    byteSize: 6_655,
    sha256:
      "f478c75ebcac1128849561f6eee03fdc7fbbeec606fe65ddf4a7b2081df11e2f"
  });

const STANDARD_ID = "STD-CONTEXT-BENCHMARKS";
const SOURCE_ID = "source:doe-wicf-ecs-nopr:2023-08";
const SCHEMA_ID = "schema:doe-wicf-ecs-nopr:2023-08";
const RELEASE_ID = "release:doe-wicf-ecs-nopr:2023-08";
const ARTIFACT_ID = "artifact:doe-wicf-ecs-nopr:2023-08";
const INGESTION_ID =
  "ingestion:doe-wicf-ecs-nopr:2023-08:v1";
const ADAPTER_PATH =
  "scripts/research/operational-savings/adapters/context-benchmarks/doe-walkin.mjs";
const ACQUIRED_AT = "2026-07-24T19:38:14.000Z";
const SOURCE_URL =
  "https://www.energy.gov/sites/default/files/2023-08/Walk-In%20Coolers%20and%20Freezers%20ECS%20NOPR.pdf";
const SELECTION_RULE =
  "EXACT_SAME_COMPONENT_AND_EQUIPMENT_CLASS_ROW_BASELINE_TO_TSL_3";

function populationId(equipmentClass) {
  return `context:doe-walkin:${RELEASE_ID}:${equipmentClass
    .toLowerCase()
    .replaceAll(".", "-")}`;
}

function sourceProof(schema, artifact) {
  return {
    source: {
      id: SOURCE_ID,
      standardId: STANDARD_ID,
      organization: "U.S. Department of Energy",
      name:
        "Energy Conservation Standards for Walk-in Coolers and Freezers NOPR",
      primaryUrl: SOURCE_URL,
      license:
        "U.S. Department of Energy public rulemaking document with attribution retained",
      attribution:
        "U.S. Department of Energy, EERE-2017-BT-STD-0009",
      accessMode: "PUBLIC_PDF_DOWNLOAD"
    },
    schema: {
      id: SCHEMA_ID,
      fingerprintSha256: schema.fingerprintSha256,
      kind: "PDF_NATIVE_CLASS_AND_ENERGY_TABLES",
      observed: schema.observed,
      inspectedAt: ACQUIRED_AT
    },
    release: {
      id: RELEASE_ID,
      version: "August 2023 NOPR",
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
      adapterVersion: "context-doe-walkin-v1",
      startedAt: ACQUIRED_AT,
      finishedAt: ACQUIRED_AT,
      status: "SUCCEEDED",
      recordsRead: schema.rows.length * 2,
      recordsWritten: schema.rows.length * 2,
      warningCount: 3
    }
  };
}

export async function ingestDoeWalkInBenchmarks({
  artifactPath,
  fixturePath = DEFAULT_DOE_WALKIN_FIXTURE_URL,
  database
}) {
  assertNetworkDisabled();
  const [artifact, reviewedFixture] = await Promise.all([
    verifyArtifact(artifactPath, DOE_WALKIN_ARTIFACT),
    verifyArtifact(
      fixturePath,
      DOE_WALKIN_REVIEWED_FIXTURE
    )
  ]);
  const schema = await inspectDoeWalkInSchema(
    artifactPath,
    fixturePath
  );
  upsertSourceProof(database, sourceProof(schema, artifact));

  const insertPopulation = database.prepare(`
    INSERT INTO benchmark_populations (
      id, source_release_id, standard_id, process_key, filters_json,
      population_size, weighting_field, selection_rule
    ) VALUES (?, ?, ?, 'context_benchmarks', ?, 1, NULL, ?)
    ON CONFLICT(id) DO UPDATE SET
      filters_json = excluded.filters_json,
      selection_rule = excluded.selection_rule
  `);
  const insertValue = database.prepare(`
    INSERT INTO benchmark_values (
      id, population_id, field_key, value, unit, sample_size
    ) VALUES (?, ?, ?, ?, ?, 1)
    ON CONFLICT(id) DO UPDATE SET
      value = excluded.value,
      unit = excluded.unit
  `);
  for (const row of schema.rows) {
    const id = populationId(row.equipmentClass);
    insertPopulation.run(
      id,
      RELEASE_ID,
      STANDARD_ID,
      JSON.stringify({
        componentType: row.componentType,
        equipmentClass: row.equipmentClass,
        ...(row.sourceClassCode
          ? { sourceClassCode: row.sourceClassCode }
          : {}),
        componentSubtype: row.componentSubtype,
        temperatureClass: row.temperatureClass,
        indoorOutdoorConfiguration:
          row.indoorOutdoorConfiguration,
        existingEfficiencyLevel: "BASELINE",
        proposedEfficiencyLevel: "TSL_3",
        sourceTable: row.sourceTable,
        pdfPage: 164,
        documentPage: 163
      }),
      SELECTION_RULE
    );
    insertValue.run(
      `${id}:baseline`,
      id,
      "baseline",
      row.baseline,
      row.nativeUnit
    );
    insertValue.run(
      `${id}:tsl-3`,
      id,
      "tsl_3",
      row.tsl3,
      row.nativeUnit
    );
  }
  return {
    artifact,
    reviewedFixture,
    schema,
    recordsRead: schema.rows.length * 2,
    recordsWritten: schema.rows.length * 2,
    normalizedTargets: [
      "benchmark_populations",
      "benchmark_values"
    ]
  };
}

function positivePanelArea(value) {
  if (
    typeof value !== "number" ||
    !Number.isFinite(value) ||
    value <= 0 ||
    value > 10_000_000
  ) {
    throw new Error(
      "INVALID_PROJECT_INPUT: panelAreaFt2 must be greater than 0 and no more than 10000000 for a panel benchmark"
    );
  }
  return value;
}

export function resolveDoeWalkInBenchmarkRow(
  database,
  equipmentClass
) {
  assertNetworkDisabled();
  if (
    typeof equipmentClass !== "string" ||
    !equipmentClass
  ) {
    throw new Error(
      "INCOMPATIBLE_DOE_WALKIN_SCOPE: an exact reviewed equipmentClass is required"
    );
  }
  const rows = database.prepare(`
    SELECT
      p.filters_json AS filtersJson,
      p.selection_rule AS selectionRule,
      v.field_key AS fieldKey,
      v.value,
      v.unit
    FROM benchmark_populations p
    JOIN benchmark_values v ON v.population_id = p.id
    WHERE p.id = ?
      AND p.source_release_id = ?
      AND p.process_key = 'context_benchmarks'
    ORDER BY CASE v.field_key
      WHEN 'baseline' THEN 1
      WHEN 'tsl_3' THEN 2
      ELSE 3
    END
  `).all(populationId(equipmentClass), RELEASE_ID);
  if (
    rows.length !== 2 ||
    rows[0].fieldKey !== "baseline" ||
    rows[1].fieldKey !== "tsl_3" ||
    rows[0].unit !== rows[1].unit
  ) {
    throw new Error(
      `INCOMPATIBLE_DOE_WALKIN_SCOPE: no exact reviewed same-row benchmark for ${equipmentClass}`
    );
  }
  return {
    filters: JSON.parse(rows[0].filtersJson),
    baseline: rows[0].value,
    tsl3: rows[1].value,
    nativeUnit: rows[0].unit,
    selectionRule: rows[0].selectionRule
  };
}

export function mapDoeWalkInBenchmarkToItc49(
  database,
  {
    componentType,
    equipmentClass,
    temperatureClass,
    indoorOutdoorConfiguration,
    existingEfficiencyLevel,
    proposedEfficiencyLevel,
    panelAreaFt2
  }
) {
  assertNetworkDisabled();
  const row = resolveDoeWalkInBenchmarkRow(
    database,
    equipmentClass
  );
  const requiredFilters = {
    componentType,
    equipmentClass,
    temperatureClass,
    indoorOutdoorConfiguration,
    existingEfficiencyLevel,
    proposedEfficiencyLevel
  };
  if (
    Object.entries(requiredFilters).some(
      ([key, value]) => row.filters[key] !== value
    )
  ) {
    throw new Error(
      "INCOMPATIBLE_DOE_WALKIN_SCOPE: component, class, temperature, location, and efficiency levels must match one exact reviewed row"
    );
  }
  let currentAnnualKwh;
  let proposedAnnualKwh;
  let transformation;
  let area;
  if (componentType === "PANEL") {
    area = positivePanelArea(panelAreaFt2);
    if (row.nativeUnit !== "kWh/(ft2 year)") {
      throw new Error(
        "MISSING_PUBLISHED_DOE_WALKIN_BENCHMARK: panel unit changed"
      );
    }
    currentAnnualKwh = row.baseline * area;
    proposedAnnualKwh = row.tsl3 * area;
    transformation =
      "same-row panel baseline and TSL 3 kWh/(ft2 year) multiplied separately by the same project-supplied in-scope panel area";
  } else {
    if (panelAreaFt2 !== undefined && panelAreaFt2 !== null) {
      throw new Error(
        "INCOMPATIBLE_DOE_WALKIN_SCOPE: panelAreaFt2 is accepted only for panel rows"
      );
    }
    if (row.nativeUnit !== "kWh/year") {
      throw new Error(
        "MISSING_PUBLISHED_DOE_WALKIN_BENCHMARK: annual component unit changed"
      );
    }
    currentAnnualKwh = row.baseline;
    proposedAnnualKwh = row.tsl3;
    transformation =
      "exact same-row baseline and TSL 3 annual component-energy selection with no operating-hour multiplier";
  }
  const filters = {
    componentType,
    equipmentClass,
    temperatureClass,
    indoorOutdoorConfiguration,
    existingEfficiencyLevel,
    proposedEfficiencyLevel,
    ...(area === undefined ? {} : { panelAreaFt2: area }),
    sourceTable: row.filters.sourceTable,
    pdfPage: row.filters.pdfPage,
    documentPage: row.filters.documentPage
  };
  const values = {
    current_annual_refrigeration_kWh: currentAnnualKwh,
    proposed_annual_refrigeration_kWh:
      proposedAnnualKwh
  };
  return {
    standardId: STANDARD_ID,
    categoryId: "ITC-49",
    processKey: "context_benchmarks",
    sourceArtifactId: ARTIFACT_ID,
    sourceReleaseId: RELEASE_ID,
    values,
    nativeValues: {
      baseline: row.baseline,
      tsl3: row.tsl3,
      unit: row.nativeUnit
    },
    formulaBindings: [
      {
        outputName:
          "One class-matched existing annual component energy",
        formulaTerm:
          "current_annual_refrigeration_kWh",
        value: currentAnnualKwh,
        unit: "kWh/year",
        scope: "PER_EQUIPMENT_UNIT"
      },
      {
        outputName:
          "One class-matched proposed annual component energy",
        formulaTerm:
          "proposed_annual_refrigeration_kWh",
        value: proposedAnnualKwh,
        unit: "kWh/year",
        scope: "PER_EQUIPMENT_UNIT"
      }
    ],
    selectionRule: row.selectionRule,
    warnings: [
      "These are DOE NOPR component estimates, not measured whole-box project energy.",
      "The baseline and TSL 3 values must remain paired to the same exact component and equipment-class row.",
      "Do not multiply the annual door or refrigeration-system values by operating hours."
    ],
    provenance: buildProvenance({
      standardId: STANDARD_ID,
      artifact: DOE_WALKIN_ARTIFACT,
      sourceVersion: "August 2023 NOPR",
      sourceFields: [
        `PDF page ${row.filters.pdfPage} (document page ${row.filters.documentPage})`,
        `${row.filters.sourceTable}, ${equipmentClass} baseline`,
        `${row.filters.sourceTable}, ${equipmentClass} TSL 3`
      ],
      filters,
      transformation,
      adapterPath: ADAPTER_PATH
    })
  };
}

export function recordDoeWalkInBenchmark(
  database,
  result
) {
  assertNetworkDisabled();
  if (
    !result ||
    result.standardId !== STANDARD_ID ||
    result.categoryId !== "ITC-49" ||
    result.processKey !== "context_benchmarks"
  ) {
    throw new Error("INVALID_DOE_WALKIN_RESULT");
  }
  const inputHash = sha256Json(result.provenance.filters);
  const calculationId =
    `calculation:context:doe-walkin:${RELEASE_ID}:` +
    inputHash.slice(0, 20);
  database.prepare(`
    INSERT INTO calculation_runs (
      id, standard_id, process_key, source_release_id, model_version_id,
      adapter_version, input_sha256, output_sha256, network_disabled,
      status, created_at
    ) VALUES (?, ?, 'context_benchmarks', ?, NULL,
      'context-doe-walkin-v1', ?, ?, 1, 'SUCCEEDED', ?)
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
