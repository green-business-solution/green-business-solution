import { basename } from "node:path";

import {
  assertNetworkDisabled,
  buildProvenance,
  sha256Json,
  verifyArtifact
} from "../../lib/artifact.mjs";
import { upsertSourceProof } from "../../lib/sqlite.mjs";
import { loadAndInspectCiWorkbook } from "./inspect-schema.mjs";

export const WATERSENSE_CI_ARTIFACT = Object.freeze({
  byteSize: 89_786,
  sha256: "f69facc89beb2073fdaba88206d20e32151b2f30c53a7f21f7981eeab8c0ab52"
});

const SOURCE_ID = "source:watersense-ci-operations";
const SCHEMA_ID = "schema:watersense-ci-operations:2012-10";
const RELEASE_ID = "release:watersense-ci-operations:2012-10";
const ARTIFACT_ID = "artifact:watersense-ci-operations:2012-10";
const INGESTION_ID = "ingestion:watersense-ci-operations:2012-10:v1";
const ADAPTER_PATH =
  "scripts/research/operational-savings/adapters/watersense-ci/run.mjs";

export const WATERSENSE_CI_METHODS = Object.freeze([
  Object.freeze({
    id: "watersense-ci:leak-detection-and-repair",
    sheetName: "Action Plan Checklist",
    methodName: "leak_detection_and_repair_scope",
    nativeCell: "A7",
    formulaText: "Implement a leak detection and repair program.",
    unit: null
  }),
  Object.freeze({
    id: "watersense-ci:measured-flow-rate",
    sheetName: "Water Use Inventory",
    methodName: "measured_flow_rate",
    nativeCell: "C2",
    formulaText: "Flow\n(gallons per minute)",
    unit: "gallons/minute"
  }),
  Object.freeze({
    id: "watersense-ci:measured-operating-time",
    sheetName: "Water Use Inventory",
    methodName: "measured_operating_time",
    nativeCell: "D2",
    formulaText: "Operating Time (minutes per day)",
    unit: "minutes/day"
  }),
  Object.freeze({
    id: "watersense-ci:measured-flow-per-day",
    sheetName: "Water Use Inventory",
    methodName: "measured_flow_per_day",
    nativeCell: "C2:E2",
    formulaText:
      "Dimensional relationship inferred from adjacent headers: Flow (gallons/minute) multiplied by Operating Time (minutes/day)",
    unit: "gallons/day"
  }),
  Object.freeze({
    id: "watersense-ci:ccf-conversion",
    sheetName: "Water Consumption History",
    methodName: "ccf_to_approximate_gallons",
    nativeCell: "A20",
    formulaText:
      "1 The abbreviation ccf represents 100 cubic feet, or roughly 748 gallons.",
    unit: "approximately 748 gallons/ccf"
  }),
  Object.freeze({
    id: "watersense-ci:cooling-tower-cycles",
    sheetName: "Action Plan Checklist",
    methodName: "cooling_tower_cycles_scope",
    nativeCell: "A43",
    formulaText:
      "Professionally monitor cooling tower and boiler chemistry and maximize cycles of concentration.",
    unit: null
  }),
  Object.freeze({
    id: "watersense-ci:cooling-tower-metering",
    sheetName: "Action Plan Checklist",
    methodName: "cooling_tower_metering_scope",
    nativeCell: "A44",
    formulaText:
      "Install cooling tower meters and control systems to control chemical feed and blowdown based on conductivity.",
    unit: null
  })
]);

export function waterSenseCiMethodId(
  nativeMethodId,
  releaseId = RELEASE_ID
) {
  const prefix = "watersense-ci:";
  if (
    typeof nativeMethodId !== "string" ||
    !nativeMethodId.startsWith(prefix) ||
    nativeMethodId.length === prefix.length ||
    typeof releaseId !== "string" ||
    !releaseId
  ) {
    throw new Error(
      "INVALID_RELEASE_SCOPED_WATERSENSE_CI_METHOD_ID_INPUT"
    );
  }
  return (
    `watersense-ci:${releaseId}:` +
    nativeMethodId.slice(prefix.length)
  );
}

function sourceProof(schema, artifact, status, recordsRead = 0, recordsWritten = 0) {
  return {
    source: {
      id: SOURCE_ID,
      standardId: "STD-WATERSENSE-CI-OPERATIONS",
      organization: "U.S. Environmental Protection Agency",
      name:
        "Writable Tables from WaterSense at Work: Best Management Practices for Commercial and Institutional Facilities",
      primaryUrl:
        "https://www.epa.gov/sites/default/files/2017-02/ws-commercial-excel-writeable-tables.xlsx",
      license:
        "EPA-published WaterSense content is public domain with requested attribution",
      attribution: "U.S. EPA WaterSense",
      accessMode: "PUBLIC_XLSX_DOWNLOAD"
    },
    schema: {
      id: SCHEMA_ID,
      fingerprintSha256: schema.fingerprintSha256,
      kind: "XLSX_NATIVE_CELLS",
      observed: schema,
      inspectedAt: "2026-07-23T00:00:00.000Z"
    },
    release: {
      id: RELEASE_ID,
      version: "WaterSense at Work writeable tables, October 2012",
      publishedAt: "2012-10-01T00:00:00.000Z",
      acquiredAt: "2026-07-23T00:00:00.000Z",
      status
    },
    artifact: {
      id: ARTIFACT_ID,
      sourceUrl:
        "https://www.epa.gov/sites/default/files/2017-02/ws-commercial-excel-writeable-tables.xlsx",
      localName: basename(artifact.path),
      mediaType:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      byteSize: artifact.byteSize,
      sha256: artifact.sha256
    },
    ingestion: {
      id: INGESTION_ID,
      adapterVersion: "watersense-ci-v1",
      startedAt: "2026-07-23T00:00:00.000Z",
      finishedAt: status === "PUBLISHED" ? "2026-07-23T00:00:00.000Z" : null,
      status: status === "PUBLISHED" ? "SUCCEEDED" : "RUNNING",
      recordsRead,
      recordsWritten,
      warningCount: 0
    }
  };
}

function finiteMeasurement(value, label, { maximum = Infinity } = {}) {
  if (
    typeof value !== "number" ||
    !Number.isFinite(value) ||
    value < 0 ||
    value > maximum
  ) {
    throw new Error(
      `INVALID_PROJECT_MEASUREMENT: ${label} must be between 0 and ${maximum}`
    );
  }
  return value;
}

function requireMeasurement(value, label) {
  if (value === undefined || value === null) {
    throw new Error(`MISSING_PROJECT_MEASUREMENT: ${label}`);
  }
  return value;
}

function requireMethod(database, id) {
  const method = database.prepare(`
    SELECT
      sheet_name AS sheetName,
      method_name AS methodName,
      native_cell AS nativeCell,
      formula_text AS formulaText,
      unit
    FROM watersense_ci_methods
    WHERE id = ?
      AND source_release_id = ?
  `).get(
    waterSenseCiMethodId(id, RELEASE_ID),
    RELEASE_ID
  );
  if (!method) {
    throw new Error(`MISSING_PUBLISHED_WATERSENSE_CI_METHOD: ${id}`);
  }
  return method;
}

export async function ingestWaterSenseCi({
  artifactPath,
  database
}) {
  assertNetworkDisabled();
  const artifact = await verifyArtifact(artifactPath, WATERSENSE_CI_ARTIFACT);
  const { schema } = await loadAndInspectCiWorkbook(artifactPath);
  upsertSourceProof(database, sourceProof(schema, artifact, "INSPECTED"));
  const insert = database.prepare(`
    INSERT INTO watersense_ci_methods (
      id, source_release_id, sheet_name, method_name, native_cell,
      formula_text, unit
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      sheet_name = excluded.sheet_name,
      method_name = excluded.method_name,
      native_cell = excluded.native_cell,
      formula_text = excluded.formula_text,
      unit = excluded.unit
  `);
  database.exec("BEGIN IMMEDIATE");
  try {
    for (const method of WATERSENSE_CI_METHODS) {
      insert.run(
        waterSenseCiMethodId(
          method.id,
          RELEASE_ID
        ),
        RELEASE_ID,
        method.sheetName,
        method.methodName,
        method.nativeCell,
        method.formulaText,
        method.unit
      );
    }
    database.exec("COMMIT");
  } catch (error) {
    database.exec("ROLLBACK");
    throw error;
  }
  upsertSourceProof(
    database,
    sourceProof(
      schema,
      artifact,
      "PUBLISHED",
      schema.requiredCells.length,
      WATERSENSE_CI_METHODS.length
    )
  );
  return {
    artifact,
    schema,
    recordsRead: schema.requiredCells.length,
    recordsWritten: WATERSENSE_CI_METHODS.length,
    releaseId: RELEASE_ID,
    normalizedTargets: ["watersense_ci_methods"]
  };
}

export function calculateMeasuredLeakAvoidance(database, {
  measuredLeakGpm,
  measuredLeakUnit = "gallons/minute",
  confirmedLeakMinutesPerYear,
  confirmedDurationUnit = "minutes/year"
}) {
  assertNetworkDisabled();
  if (measuredLeakUnit !== "gallons/minute") {
    throw new Error(
      `INCOMPATIBLE_PROJECT_UNIT: expected gallons/minute, received ${measuredLeakUnit}`
    );
  }
  if (confirmedDurationUnit !== "minutes/year") {
    throw new Error(
      `INCOMPATIBLE_PROJECT_UNIT: expected minutes/year, received ${confirmedDurationUnit}`
    );
  }
  const flow = finiteMeasurement(
    requireMeasurement(measuredLeakGpm, "measured leak flow"),
    "measured leak flow"
  );
  const duration = finiteMeasurement(
    requireMeasurement(
      confirmedLeakMinutesPerYear,
      "confirmed annual leak duration"
    ),
    "confirmed annual leak duration",
    { maximum: 527_040 }
  );
  const flowMethod = requireMethod(
    database,
    "watersense-ci:measured-flow-rate"
  );
  const durationMethod = requireMethod(
    database,
    "watersense-ci:measured-operating-time"
  );
  const dailyFlowMethod = requireMethod(
    database,
    "watersense-ci:measured-flow-per-day"
  );
  const scopeMethod = requireMethod(
    database,
    "watersense-ci:leak-detection-and-repair"
  );
  const avoidedLeakGallons = flow * duration;
  const values = {
    measured_leak_gpm: flow,
    confirmed_leak_minutes_per_year: duration
  };
  const filters = {
    measuredLeakGpm: flow,
    measuredLeakUnit,
    confirmedLeakMinutesPerYear: duration,
    confirmedDurationUnit
  };
  return {
    standardId: "STD-WATERSENSE-CI-OPERATIONS",
    categoryId: "ITC-35",
    processKey: "watersense_ci_operations",
    values,
    avoidedLeakGallons,
    avoidedLeakUnit: "gallons/year",
    formulaBindings: [
      {
        outputName: "Measured leak flow",
        formulaTerm: "measured_leak_gpm",
        value: flow,
        unit: "gallons/minute",
        scope: "PROJECT_TOTAL"
      },
      {
        outputName: "Confirmed annual leak duration",
        formulaTerm: "confirmed_leak_minutes_per_year",
        value: duration,
        unit: "minutes/year",
        scope: "PER_YEAR"
      }
    ],
    selectionRule: "EXACT_MEASURED_FLOW_AND_CONFIRMED_DURATION",
    methodRows: [flowMethod, durationMethod, dailyFlowMethod, scopeMethod],
    provenance: buildProvenance({
      standardId: "STD-WATERSENSE-CI-OPERATIONS",
      artifact: WATERSENSE_CI_ARTIFACT,
      sourceVersion: "WaterSense at Work writeable tables, October 2012",
      sourceFields: [
        "Action Plan Checklist!A7",
        "Water Use Inventory!C2",
        "Water Use Inventory!D2",
        "Water Use Inventory!E2"
      ],
      filters,
      transformation:
        "Exact measured gallons/minute multiplied by confirmed annual minutes, preserving the workbook's flow-times-operating-time dimensional relationship",
      adapterPath: ADAPTER_PATH
    })
  };
}

export function rejectUnsupportedCoolingTowerCalculation(database, {
  existingCyclesOfConcentration,
  proposedCyclesOfConcentration,
  annualEvaporationGallons,
  annualEvaporationUnit = "gallons/year"
} = {}) {
  assertNetworkDisabled();
  const existing = finiteMeasurement(
    requireMeasurement(
      existingCyclesOfConcentration,
      "existing cycles of concentration"
    ),
    "existing cycles of concentration"
  );
  const proposed = finiteMeasurement(
    requireMeasurement(
      proposedCyclesOfConcentration,
      "proposed cycles of concentration"
    ),
    "proposed cycles of concentration"
  );
  finiteMeasurement(
    requireMeasurement(
      annualEvaporationGallons,
      "annual evaporation or equivalent heat rejection"
    ),
    "annual evaporation or equivalent heat rejection"
  );
  if (existing <= 1 || proposed <= 1) {
    throw new Error(
      "INVALID_PROJECT_MEASUREMENT: cycles of concentration must exceed 1"
    );
  }
  if (annualEvaporationUnit !== "gallons/year") {
    throw new Error(
      `INCOMPATIBLE_PROJECT_UNIT: expected gallons/year, received ${annualEvaporationUnit}`
    );
  }
  requireMethod(database, "watersense-ci:cooling-tower-cycles");
  requireMethod(database, "watersense-ci:cooling-tower-metering");
  throw new Error(
    "SOURCE_METHOD_NOT_EXECUTABLE: the reviewed workbook identifies cooling-tower cycles, meters, and controls but contains no numeric makeup-water equation"
  );
}

export function recordWaterSenseCiFormulaMapping(database, result) {
  assertNetworkDisabled();
  if (
    !result ||
    result.standardId !== "STD-WATERSENSE-CI-OPERATIONS" ||
    result.categoryId !== "ITC-35" ||
    result.processKey !== "watersense_ci_operations"
  ) {
    throw new Error("INVALID_WATERSENSE_CI_RESULT");
  }
  const calculationId = [
    "calculation",
    "watersense-ci",
    "itc-35",
    RELEASE_ID,
    sha256Json(result.provenance.filters).slice(0, 16)
  ].join(":");
  database.prepare(`
    INSERT INTO calculation_runs (
      id, standard_id, process_key, source_release_id, model_version_id,
      adapter_version, input_sha256, output_sha256, network_disabled, status,
      created_at
    ) VALUES (?, 'STD-WATERSENSE-CI-OPERATIONS',
      'watersense_ci_operations', ?, NULL, 'watersense-ci-v1', ?, ?, 1,
      'SUCCEEDED', '2026-07-23T00:00:00.000Z')
    ON CONFLICT(id) DO UPDATE SET output_sha256 = excluded.output_sha256
  `).run(
    calculationId,
    RELEASE_ID,
    sha256Json(result.provenance.filters),
    sha256Json({
      ...result.values,
      avoidedLeakGallons: result.avoidedLeakGallons
    })
  );
  const insertValue = database.prepare(`
    INSERT INTO selected_values (
      id, calculation_run_id, formula_term, value, unit, scope, selection_rule
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      value = excluded.value,
      unit = excluded.unit,
      scope = excluded.scope,
      selection_rule = excluded.selection_rule
  `);
  const insertProvenance = database.prepare(`
    INSERT INTO selected_value_provenance (
      selected_value_id, source_artifact_id, source_fields_json, filters_json,
      transformation, adapter_path
    ) VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT(selected_value_id) DO UPDATE SET
      source_fields_json = excluded.source_fields_json,
      filters_json = excluded.filters_json,
      transformation = excluded.transformation,
      adapter_path = excluded.adapter_path
  `);
  for (const binding of result.formulaBindings) {
    const valueId = `${calculationId}:${binding.formulaTerm}`;
    insertValue.run(
      valueId,
      calculationId,
      binding.formulaTerm,
      binding.value,
      binding.unit,
      binding.scope,
      result.selectionRule
    );
    insertProvenance.run(
      valueId,
      ARTIFACT_ID,
      JSON.stringify(result.provenance.sourceFields),
      JSON.stringify(result.provenance.filters),
      result.provenance.transformation,
      ADAPTER_PATH
    );
  }
  return calculationId;
}
