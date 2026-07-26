import { basename } from "node:path";

import {
  assertNetworkDisabled,
  buildProvenance,
  sha256Json,
  verifyArtifact
} from "../../lib/artifact.mjs";
import { upsertSourceProof } from "../../lib/sqlite.mjs";
import { inspectFempLightingSchema } from "./inspect-schema.mjs";

export const FEMP_EXTERIOR_LIGHTING_ARTIFACT = Object.freeze({
  byteSize: 148626,
  sha256: "cb50171c667e44e0c8fe1681fac57fcfe22d6adffe6ba1229bd9d103b8fc547a"
});

export const OFFICIAL_FEMP_LIGHTING_URL =
  "https://www.energy.gov/cmei/femp/purchasing-energy-efficient-exterior-lighting";

const SOURCE_ID = "source:femp-exterior-lighting";
const SCHEMA_ID = "schema:femp-exterior-lighting:2026-07-23";
const RELEASE_ID = "release:femp-exterior-lighting:2026-07-23";
const ARTIFACT_ID = "artifact:femp-exterior-lighting:2026-07-23";
const INGESTION_ID = "ingestion:femp-exterior-lighting:2026-07-23:v1";
const ADAPTER_PATH =
  "scripts/research/operational-savings/adapters/femp-lighting/run.mjs";

function normalizeApplication(value) {
  return String(value ?? "")
    .normalize("NFKC")
    .toLocaleLowerCase("en-US")
    .replaceAll(/\s+/g, " ")
    .trim();
}

export function fempExteriorLightingRequirementId(
  application,
  releaseId = RELEASE_ID
) {
  const normalizedApplication = normalizeApplication(application)
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replaceAll(/^-|-$/g, "");
  if (
    typeof releaseId !== "string" ||
    !releaseId ||
    !normalizedApplication
  ) {
    throw new Error(
      "INVALID_RELEASE_SCOPED_FEMP_REQUIREMENT_ID_INPUT"
    );
  }
  return (
    `femp:exterior-lighting:${releaseId}:` +
    normalizedApplication
  );
}

function sourceProof(
  schema,
  artifact,
  ingestionPhase,
  recordsRead = 0,
  recordsWritten = 0
) {
  return {
    source: {
      id: SOURCE_ID,
      standardId: "STD-FEMP-EXTERIOR-LIGHTING",
      organization: "U.S. Department of Energy Federal Energy Management Program",
      name: "Purchasing Energy-Efficient Exterior Lighting",
      primaryUrl: OFFICIAL_FEMP_LIGHTING_URL,
      license: "Federal procurement guidance",
      attribution: "U.S. Department of Energy Federal Energy Management Program",
      accessMode: "PUBLIC_HTML_TABLE"
    },
    schema: {
      id: SCHEMA_ID,
      fingerprintSha256: schema.fingerprintSha256,
      kind: "HTML_TABLE",
      observed: schema,
      inspectedAt: "2026-07-23T00:00:00.000Z"
    },
    release: {
      id: RELEASE_ID,
      version: "page snapshot acquired 2026-07-23; guidance updated June 2023",
      publishedAt: "2023-06-01",
      acquiredAt: "2026-07-23T00:00:00.000Z",
      status: "PUBLISHED"
    },
    artifact: {
      id: ARTIFACT_ID,
      sourceUrl: OFFICIAL_FEMP_LIGHTING_URL,
      localName: basename(artifact.path),
      mediaType: "text/html",
      byteSize: artifact.byteSize,
      sha256: artifact.sha256
    },
    ingestion: {
      id: INGESTION_ID,
      adapterVersion: "femp-exterior-lighting-v1",
      startedAt: "2026-07-23T00:00:00.000Z",
      finishedAt:
        ingestionPhase === "PUBLISHED"
          ? "2026-07-23T00:00:00.000Z"
          : null,
      status:
        ingestionPhase === "PUBLISHED"
          ? "SUCCEEDED"
          : "RUNNING",
      recordsRead,
      recordsWritten,
      warningCount: 0
    }
  };
}

export async function ingestFempExteriorLighting({
  artifactPath,
  database
}) {
  assertNetworkDisabled();
  const artifact = await verifyArtifact(
    artifactPath,
    FEMP_EXTERIOR_LIGHTING_ARTIFACT
  );
  const { rows, schema } = await inspectFempLightingSchema(artifactPath);
  upsertSourceProof(database, sourceProof(schema, artifact, "INSPECTED"));

  const insert = database.prepare(`
    INSERT INTO femp_exterior_lighting_requirements (
      id, source_release_id, application, required_efficacy_lm_per_w,
      lumen_min, lumen_max, example_power_w, native_row_text
    ) VALUES (?, ?, ?, ?, NULL, NULL, NULL, ?)
    ON CONFLICT(id) DO UPDATE SET
      application = excluded.application,
      required_efficacy_lm_per_w = excluded.required_efficacy_lm_per_w,
      native_row_text = excluded.native_row_text
  `);
  database.exec("BEGIN IMMEDIATE");
  try {
    for (const row of rows) {
      insert.run(
        fempExteriorLightingRequirementId(
          row.application,
          RELEASE_ID
        ),
        RELEASE_ID,
        row.application,
        row.requiredEfficacyLmPerW,
        row.nativeRowText
      );
    }
    database.exec("COMMIT");
  } catch (error) {
    database.exec("ROLLBACK");
    throw error;
  }

  upsertSourceProof(
    database,
    sourceProof(schema, artifact, "PUBLISHED", rows.length, rows.length)
  );
  return {
    artifact,
    schema,
    recordsRead: rows.length,
    recordsWritten: rows.length,
    releaseId: RELEASE_ID,
    normalizedTargets: ["femp_exterior_lighting_requirements"]
  };
}

export function resolveExactFempLightingProduct() {
  assertNetworkDisabled();
  throw new Error(
    "UNSUPPORTED_SOURCE_BOUNDARY: the FEMP page contains application requirements but no product model, exact input-power, or active product rows"
  );
}

function requirePositive(value, label) {
  if (!Number.isFinite(value) || value <= 0) {
    throw new Error(`INVALID_REQUIREMENT: ${label}`);
  }
  return value;
}

export function resolveFempLightingRequirement(database, {
  application,
  requiredLumens
}) {
  assertNetworkDisabled();
  if (typeof application !== "string" || !application.trim()) {
    throw new Error("INVALID_REQUIREMENT: application");
  }
  requirePositive(requiredLumens, "requiredLumens");
  const rows = database.prepare(`
    SELECT
      id,
      application,
      required_efficacy_lm_per_w AS requiredEfficacyLmPerW,
      native_row_text AS nativeRowText
    FROM femp_exterior_lighting_requirements
    WHERE source_release_id = ?
    ORDER BY id
  `).all(RELEASE_ID).filter(
    (row) => normalizeApplication(row.application) === normalizeApplication(application)
  );
  if (rows.length === 0) {
    throw new Error(`NO_EXACT_MATCH: FEMP application ${application}`);
  }
  if (rows.length !== 1) {
    throw new Error(`AMBIGUOUS_EXACT_MATCH: FEMP application ${application}`);
  }
  const requirement = rows[0];
  const maximumInputWatts =
    requiredLumens / requirement.requiredEfficacyLmPerW;
  return {
    ...requirement,
    requiredLumens,
    maximumInputWatts,
    proposedKw: maximumInputWatts / 1000,
    interpretation:
      "Maximum input power at the exact required light output and the FEMP minimum efficacy threshold"
  };
}

export function mapFempRequirementToItc02(database, requirements) {
  assertNetworkDisabled();
  const resolved = resolveFempLightingRequirement(database, requirements);
  const values = {
    proposed_kW: resolved.proposedKw
  };
  return {
    standardId: "STD-FEMP-EXTERIOR-LIGHTING",
    categoryId: "ITC-02",
    processKey: "requirement-new-fixture-watts",
    sourceArtifactId: ARTIFACT_ID,
    sourceReleaseId: RELEASE_ID,
    values,
    formulaBindings: [
      {
        outputName: "Selected proposed input power per fixture",
        formulaTerm: "proposed_kW",
        value: resolved.proposedKw,
        unit: "kW/fixture",
        scope: "PER_FIXTURE"
      }
    ],
    selectionRule: "EXACT_APPLICATION_AND_FEMP_MINIMUM_EFFICACY_POWER_CEILING",
    warning:
      "This is a requirement-derived maximum input power, not an observed product wattage.",
    provenance: buildProvenance({
      standardId: "STD-FEMP-EXTERIOR-LIGHTING",
      artifact: FEMP_EXTERIOR_LIGHTING_ARTIFACT,
      sourceVersion:
        "page snapshot acquired 2026-07-23; guidance updated June 2023",
      sourceFields: ["Category", "Luminaire Efficacy Rating (LER)"],
      filters: {
        application: requirements.application,
        requiredLumens: requirements.requiredLumens
      },
      transformation:
        "maximum_input_kW = required_lumens / minimum_luminaire_efficacy_lm_per_W / 1000",
      adapterPath: ADAPTER_PATH
    })
  };
}

export function recordItc02FempFormulaMapping(database, result) {
  assertNetworkDisabled();
  const calculationId =
    `calculation:femp-lighting:itc-02:${RELEASE_ID}:` +
    sha256Json(result.provenance.filters).slice(0, 16);
  database.prepare(`
    INSERT INTO calculation_runs (
      id, standard_id, process_key, source_release_id, model_version_id,
      adapter_version, input_sha256, output_sha256, network_disabled, status,
      created_at
    ) VALUES (?, 'STD-FEMP-EXTERIOR-LIGHTING',
      'requirement-new-fixture-watts', ?, NULL,
      'femp-exterior-lighting-v1', ?, ?, 1, 'SUCCEEDED',
      '2026-07-23T00:00:00.000Z')
    ON CONFLICT(id) DO UPDATE SET
      input_sha256 = excluded.input_sha256,
      output_sha256 = excluded.output_sha256
  `).run(
    calculationId,
    RELEASE_ID,
    sha256Json(result.provenance.filters),
    sha256Json(result.values)
  );
  const binding = result.formulaBindings[0];
  const selectedValueId = `${calculationId}:${binding.formulaTerm}`;
  database.prepare(`
    INSERT INTO selected_values (
      id, calculation_run_id, formula_term, value, unit, scope, selection_rule
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET value = excluded.value
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
      selected_value_id, source_artifact_id, source_fields_json, filters_json,
      transformation, adapter_path
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

function exactFormulaBinding(result, {
  standardId,
  categoryId,
  processKey,
  formulaTerm
}) {
  const hasSourceArtifact =
    typeof result?.sourceArtifactId === "string" &&
    result.sourceArtifactId.length > 0;
  const hasProjectInput =
    result?.sourceArtifactId === null &&
    result.sourceReleaseId === null &&
    result.inputOwnership === "PROJECT_OR_PROFILE" &&
    result.provenance?.inputOwnership ===
      "PROJECT_OR_PROFILE" &&
    result.provenance?.evidenceKind ===
      "CONTENT_ADDRESSED_CALCULATION_INPUT" &&
    result.provenance?.filters &&
    typeof result.provenance.filters === "object" &&
    !Array.isArray(result.provenance.filters) &&
    result.provenance?.inputSnapshotSha256 ===
      sha256Json(result.provenance.filters);
  if (
    !result ||
    result.standardId !== standardId ||
    result.categoryId !== categoryId ||
    result.processKey !== processKey ||
    (!hasSourceArtifact && !hasProjectInput) ||
    !Array.isArray(result.formulaBindings)
  ) {
    throw new Error(
      `INVALID_STANDARD_OUTPUT: ${standardId}/${processKey}`
    );
  }
  const matches = result.formulaBindings.filter(
    (binding) => binding.formulaTerm === formulaTerm
  );
  if (matches.length !== 1 || !Number.isFinite(matches[0].value)) {
    throw new Error(
      `INVALID_STANDARD_OUTPUT: exact ${formulaTerm} binding required`
    );
  }
  return matches[0];
}

export function composeItc02LightingReplacement({
  existingResult,
  proposedResult,
  scheduleResult,
  replacementFixtureCount
}) {
  assertNetworkDisabled();
  if (
    !Number.isInteger(replacementFixtureCount) ||
    replacementFixtureCount <= 0 ||
    replacementFixtureCount > 1_000_000_000
  ) {
    throw new Error(
      "INVALID_PROJECT_INPUT: replacementFixtureCount must be a positive integer"
    );
  }
  const existing = exactFormulaBinding(existingResult, {
    standardId: "STD-CONTEXT-BENCHMARKS",
    categoryId: "ITC-02",
    processKey: "context_benchmarks",
    formulaTerm: "existing_kW"
  });
  const proposed = exactFormulaBinding(proposedResult, {
    standardId: "STD-FEMP-EXTERIOR-LIGHTING",
    categoryId: "ITC-02",
    processKey: "requirement-new-fixture-watts",
    formulaTerm: "proposed_kW"
  });
  const annualHours = exactFormulaBinding(scheduleResult, {
    standardId: "STD-OPERATING-SCHEDULE",
    categoryId: "ITC-02",
    processKey: "fixed-lighting-hours",
    formulaTerm: "annual_on_hours"
  });
  if (
    existing.unit !== "kW/fixture" ||
    proposed.unit !== "kW/fixture" ||
    annualHours.unit !== "hours/year"
  ) {
    throw new Error(
      "INCOMPATIBLE_UNIT: lighting composition requires kW/fixture and hours/year"
    );
  }
  if (
    existing.value <= 0 ||
    proposed.value <= 0 ||
    proposed.value >= existing.value ||
    annualHours.value <= 0 ||
    annualHours.value > 8784
  ) {
    throw new Error(
      "INCOMPATIBLE_LIGHTING_COMPOSITION: inputs do not describe a positive annual reduction"
    );
  }
  const annualKwh =
    replacementFixtureCount *
    (existing.value - proposed.value) *
    annualHours.value;
  const dependencies = [
    {
      role: "existing_fixture_power",
      result: existingResult,
      binding: existing
    },
    {
      role: "proposed_fixture_power",
      result: proposedResult,
      binding: proposed
    },
    {
      role: "annual_operating_hours",
      result: scheduleResult,
      binding: annualHours
    }
  ].map(({ role, result, binding }) => ({
    role,
    standardId: result.standardId,
    processKey: result.processKey,
    sourceArtifactId: result.sourceArtifactId,
    inputOwnership:
      result.inputOwnership ?? "SOURCE_ARTIFACT",
    inputSha256: sha256Json(result.provenance.filters),
    sourceFields: result.provenance.sourceFields,
    transformation: result.provenance.transformation,
    formulaTerm: binding.formulaTerm,
    value: binding.value,
    unit: binding.unit,
    sourceFilters: result.provenance.filters
  }));
  const filters = {
    replacementFixtureCount,
    inputs: dependencies.map(
      ({
        role,
        standardId,
        processKey,
        sourceArtifactId,
        inputOwnership,
        inputSha256,
        formulaTerm,
        value,
        unit
      }) => ({
        role,
        standardId,
        processKey,
        sourceArtifactId,
        inputOwnership,
        inputSha256,
        formulaTerm,
        value,
        unit
      })
    )
  };
  const transformation =
    "annual_kWh = replacement_fixture_count * (existing_kW_per_fixture - proposed_kW_per_fixture) * annual_on_hours";
  return {
    standardIds: [
      "STD-CONTEXT-BENCHMARKS",
      "STD-FEMP-EXTERIOR-LIGHTING",
      "STD-OPERATING-SCHEDULE"
    ],
    categoryId: "ITC-02",
    processKey: "lighting-replacement-calculation",
    values: { annual_kWh: annualKwh },
    formulaBindings: [
      {
        outputName: "Annual electricity reduction",
        formulaTerm: "annual_kWh",
        value: annualKwh,
        unit: "kWh/year",
        scope: "PROJECT_TOTAL"
      }
    ],
    selectionRule: "COMPOSED_VERIFIED_STANDARD_OUTPUTS",
    dependencies,
    provenance: {
      filters,
      transformation,
      adapterPath: ADAPTER_PATH,
      provenanceSha256: sha256Json({
        filters,
        transformation,
        dependencies
      })
    }
  };
}

export function recordItc02LightingReplacement(
  database,
  result,
  inputCalculationRunIds
) {
  assertNetworkDisabled();
  const expectedDependencies = new Map([
    [
      "existing_fixture_power",
      {
        standardId: "STD-CONTEXT-BENCHMARKS",
        processKey: "context_benchmarks",
        formulaTerm: "existing_kW",
        inputOwnership: "SOURCE_ARTIFACT"
      }
    ],
    [
      "proposed_fixture_power",
      {
        standardId: "STD-FEMP-EXTERIOR-LIGHTING",
        processKey: "requirement-new-fixture-watts",
        formulaTerm: "proposed_kW",
        inputOwnership: "SOURCE_ARTIFACT"
      }
    ],
    [
      "annual_operating_hours",
      {
        standardId: "STD-OPERATING-SCHEDULE",
        processKey: "fixed-lighting-hours",
        formulaTerm: "annual_on_hours",
        inputOwnership: "PROJECT_OR_PROFILE"
      }
    ]
  ]);
  const binding = result?.formulaBindings?.[0];
  if (
    !result ||
    result.categoryId !== "ITC-02" ||
    result.processKey !== "lighting-replacement-calculation" ||
    !Array.isArray(result.dependencies) ||
    result.dependencies.length !== 3 ||
    new Set(
      result.dependencies.map(
        (dependency) => dependency?.role
      )
    ).size !== 3 ||
    result.dependencies.some((dependency) => {
      if (!dependency) return true;
      const expected =
        expectedDependencies.get(dependency.role);
      return (
        !expected ||
        dependency.standardId !== expected.standardId ||
        dependency.processKey !== expected.processKey ||
        dependency.formulaTerm !== expected.formulaTerm ||
        dependency.inputOwnership !==
          expected.inputOwnership
      );
    }) ||
    !binding ||
    binding.formulaTerm !== "annual_kWh" ||
    binding.value !== result.values?.annual_kWh ||
    binding.unit !== "kWh/year" ||
    binding.scope !== "PROJECT_TOTAL" ||
    result.provenance?.provenanceSha256 !==
      sha256Json({
        filters: result.provenance?.filters,
        transformation:
          result.provenance?.transformation,
        dependencies: result.dependencies
      })
  ) {
    throw new Error("INVALID_LIGHTING_COMPOSITION_RESULT");
  }
  const calculationId = `calculation:lighting-composition:itc-02:${sha256Json(
    result.provenance.filters
  ).slice(0, 16)}`;
  const roleToCalculation = new Map(
    Object.entries(inputCalculationRunIds ?? {})
  );
  for (const dependency of result.dependencies) {
    const inputCalculationRunId = roleToCalculation.get(
      dependency.role
    );
    const inputCalculationRun =
      typeof inputCalculationRunId === "string"
        ? database.prepare(`
            SELECT standard_id AS standardId,
              process_key AS processKey,
              input_sha256 AS inputSha256
            FROM calculation_runs
            WHERE id = ?
          `).get(inputCalculationRunId)
        : null;
    const inputSelectedValue =
      inputCalculationRun
        ? database.prepare(`
            SELECT sv.value, sv.unit,
              svp.source_artifact_id AS sourceArtifactId
            FROM selected_values sv
            JOIN selected_value_provenance svp
              ON svp.selected_value_id = sv.id
            WHERE sv.calculation_run_id = ?
              AND sv.formula_term = ?
          `).get(
            inputCalculationRunId,
            dependency.formulaTerm
          )
        : null;
    if (!inputCalculationRun) {
      throw new Error(
        `MISSING_COMPOSITION_DEPENDENCY: ${dependency.role}`
      );
    }
    if (
      inputCalculationRun.standardId !==
        dependency.standardId ||
      inputCalculationRun.processKey !==
        dependency.processKey ||
      inputCalculationRun.inputSha256 !==
        dependency.inputSha256 ||
      !inputSelectedValue ||
      inputSelectedValue.value !== dependency.value ||
      inputSelectedValue.unit !== dependency.unit ||
      inputSelectedValue.sourceArtifactId !==
        dependency.sourceArtifactId
    ) {
      throw new Error(
        `MISMATCHED_COMPOSITION_DEPENDENCY: ${dependency.role}`
      );
    }
    if (dependency.sourceArtifactId === null) {
      if (dependency.inputOwnership !== "PROJECT_OR_PROFILE") {
        throw new Error(
          `MISSING_COMPOSITION_DEPENDENCY: ${dependency.role}`
        );
      }
    } else if (
      typeof dependency.sourceArtifactId !== "string" ||
      !database.prepare(
        "SELECT 1 AS present FROM source_artifacts WHERE id = ?"
      ).get(dependency.sourceArtifactId)
    ) {
      throw new Error(
        `MISSING_COMPOSITION_DEPENDENCY: ${dependency.role}`
      );
    }
  }
  database.exec("BEGIN IMMEDIATE");
  try {
    database.prepare(`
      INSERT INTO calculation_runs (
        id, standard_id, process_key, source_release_id, model_version_id,
        adapter_version, input_sha256, output_sha256, network_disabled,
        status, created_at
      ) VALUES (?, 'STD-FEMP-EXTERIOR-LIGHTING',
        'lighting-replacement-calculation', NULL, NULL,
        'itc02-lighting-composition-v2', ?, ?, 1, 'SUCCEEDED',
        '2026-07-24T19:21:55.000Z')
      ON CONFLICT(id) DO UPDATE SET
        input_sha256 = excluded.input_sha256,
        output_sha256 = excluded.output_sha256,
        status = excluded.status
    `).run(
      calculationId,
      sha256Json(result.provenance.filters),
      sha256Json(result.values)
    );
    const selectedValueId = `${calculationId}:annual_kWh`;
    database.prepare(`
      INSERT INTO selected_values (
        id, calculation_run_id, formula_term, value, unit, scope,
        selection_rule
      ) VALUES (?, ?, 'annual_kWh', ?, 'kWh/year', 'PROJECT_TOTAL', ?)
      ON CONFLICT(id) DO UPDATE SET
        value = excluded.value,
        selection_rule = excluded.selection_rule
    `).run(
      selectedValueId,
      calculationId,
      binding.value,
      result.selectionRule
    );
    database.prepare(`
      INSERT INTO selected_value_provenance (
        selected_value_id, source_artifact_id, source_fields_json,
        filters_json, transformation, adapter_path
      ) VALUES (?, NULL, ?, ?, ?, ?)
      ON CONFLICT(selected_value_id) DO UPDATE SET
        source_fields_json = excluded.source_fields_json,
        filters_json = excluded.filters_json,
        transformation = excluded.transformation,
        adapter_path = excluded.adapter_path
    `).run(
      selectedValueId,
      JSON.stringify(
        result.dependencies.flatMap(
          (dependency) => dependency.sourceFields
        )
      ),
      JSON.stringify(result.provenance.filters),
      result.provenance.transformation,
      ADAPTER_PATH
    );
    const insertDependency = database.prepare(`
      INSERT INTO calculation_source_dependencies (
        calculation_run_id, dependency_role, input_calculation_run_id,
        source_artifact_id, source_fields_json, transformation
      ) VALUES (?, ?, ?, ?, ?, ?)
      ON CONFLICT(calculation_run_id, dependency_role) DO UPDATE SET
        input_calculation_run_id =
          excluded.input_calculation_run_id,
        source_artifact_id = excluded.source_artifact_id,
        source_fields_json = excluded.source_fields_json,
        transformation = excluded.transformation
    `);
    for (const dependency of result.dependencies) {
      insertDependency.run(
        calculationId,
        dependency.role,
        roleToCalculation.get(dependency.role),
        dependency.sourceArtifactId,
        JSON.stringify(dependency.sourceFields),
        dependency.transformation
      );
    }
    database.exec("COMMIT");
  } catch (error) {
    database.exec("ROLLBACK");
    throw error;
  }
  return calculationId;
}
