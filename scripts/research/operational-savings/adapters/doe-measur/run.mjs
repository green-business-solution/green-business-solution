import { basename } from "node:path";

import {
  assertNetworkDisabled,
  buildProvenance,
  sha256Json
} from "../../lib/artifact.mjs";
import { upsertSourceProof } from "../../lib/sqlite.mjs";
import { compileAndRunNativeJsonHarness } from "./native-harness.mjs";
import {
  DOE_MEASUR_COMMIT,
  DOE_MEASUR_PINNED_FILES,
  DOE_MEASUR_REPOSITORY_URL,
  DOE_MEASUR_SOURCE_SCHEMA,
  DOE_MEASUR_SOURCE_SCHEMA_FINGERPRINT_SHA256,
  DOE_MEASUR_SOURCE_SCHEMA_ID,
  inspectDoeMeasurRepository
} from "./inspect-schema.mjs";

const ADAPTER_PATH =
  "scripts/research/operational-savings/adapters/doe-measur/run.mjs";
const SOURCE_ID = "source:doe-measur";
const RELEASE_ID = `release:doe-measur:${DOE_MEASUR_COMMIT}`;
const MODEL_VERSION_ID =
  `model:doe-measur:${DOE_MEASUR_COMMIT}`;
const INGESTION_ID =
  `ingestion:doe-measur:${DOE_MEASUR_COMMIT}:compressed-air-v2`;
const ACQUIRED_AT = "2026-07-23T00:00:00.000Z";
const ADAPTER_VERSION = "doe-measur-compressed-air-v2";

export const DOE_MEASUR_COMPRESSED_AIR_ESTIMATE_FIXTURE =
  Object.freeze({
    annualHours: 8640,
    equipmentCount: 1,
    utilityCostPerKwh: 0.12,
    measurementMethod: "estimate",
    leakRateEstimate: 0.1,
    documentedSystemPressurePsig: 130,
    compressorControlAdjustment: 0.4,
    compressorSpecificPower: 0.16
  });

function cppNumber(value) {
  if (!Number.isFinite(value)) {
    throw new Error(
      "INCOMPATIBLE_UNIT_OR_VALUE: non-finite MEASUR input"
    );
  }
  return Number(value).toString();
}

function validateCompressedAirEstimateInput(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    throw new Error(
      "MISSING_REQUIRED_INPUT: compressed-air estimate input"
    );
  }
  if (input.measurementMethod !== "estimate") {
    throw new Error(
      `UNSUPPORTED_MEASUREMENT_METHOD: ${input.measurementMethod}`
    );
  }
  if (
    !Number.isInteger(input.equipmentCount) ||
    input.equipmentCount <= 0
  ) {
    throw new Error(
      "INCOMPATIBLE_UNIT_OR_VALUE: equipmentCount must be a positive integer"
    );
  }
  for (const [field, value] of Object.entries({
    annualHours: input.annualHours,
    leakRateEstimate: input.leakRateEstimate,
    documentedSystemPressurePsig:
      input.documentedSystemPressurePsig,
    compressorSpecificPower:
      input.compressorSpecificPower
  })) {
    if (!Number.isFinite(value) || value <= 0) {
      throw new Error(
        `INCOMPATIBLE_UNIT_OR_VALUE: ${field} must be positive`
      );
    }
  }
  if (input.annualHours > 8784) {
    throw new Error(
      "INCOMPATIBLE_UNIT_OR_VALUE: annualHours exceeds leap-year hours"
    );
  }
  if (!Number.isInteger(input.annualHours)) {
    throw new Error(
      "INCOMPATIBLE_UNIT_OR_VALUE: annualHours must be an integer"
    );
  }
  if (
    !Number.isFinite(input.utilityCostPerKwh) ||
    input.utilityCostPerKwh < 0 ||
    !Number.isFinite(input.compressorControlAdjustment) ||
    input.compressorControlAdjustment < 0
  ) {
    throw new Error(
      "INCOMPATIBLE_UNIT_OR_VALUE: utility cost and compressor adjustment must be non-negative"
    );
  }
  return {
    ...input
  };
}

const COMPRESSED_AIR_HARNESS_SOURCE = String.raw`
#include <iomanip>
#include <iostream>
#include <string>
#include <vector>
#include "calculator/util/CompressedAirLeakSurvey.h"

int main(int argc, char* argv[]) {
  if (argc != 8) {
    std::cerr << "expected 7 compressed-air arguments";
    return 2;
  }
  std::vector<CompressedAirLeakSurveyInput> inputs = {
    CompressedAirLeakSurveyInput(
      std::stoi(argv[1]),
      1,
      std::stod(argv[2]),
      0,
      EstimateMethodData(std::stod(argv[3])),
      DecibelsMethodData(std::stod(argv[4]), 25, 20, 150, 1.04, 1.2, 30, 125, 1.85, 1.65),
      BagMethodData(15, 10, 12),
      OrificeMethodData(250.0, 14.7, 1.0, 6.0, 6.2, 4),
      CompressorElectricityData(
        std::stod(argv[5]),
        std::stod(argv[6])
      ),
      std::stoi(argv[7])
    )
  };
  auto output = CompressedAirLeakSurvey(inputs).calculate();
  std::cout << std::setprecision(17)
    << "{\"annualTotalElectricity\":" << output.annualTotalElectricity
    << ",\"annualTotalElectricityCost\":" << output.annualTotalElectricityCost
    << ",\"totalFlowRate\":" << output.totalFlowRate
    << ",\"annualTotalFlowRate\":" << output.annualTotalFlowRate
    << "}";
  return 0;
}
`;

function buildHarnessArguments(input) {
  return [
    cppNumber(input.annualHours),
    cppNumber(input.utilityCostPerKwh),
    cppNumber(input.leakRateEstimate),
    cppNumber(input.documentedSystemPressurePsig),
    cppNumber(input.compressorControlAdjustment),
    cppNumber(input.compressorSpecificPower),
    cppNumber(input.equipmentCount)
  ];
}

function assertGoldenOutput(output) {
  const expected = {
    annualTotalElectricity: 138.24,
    annualTotalElectricityCost: 16.5888,
    totalFlowRate: 0.1,
    annualTotalFlowRate: 51840
  };
  for (const [field, value] of Object.entries(expected)) {
    if (
      typeof output[field] !== "number" ||
      Math.abs(output[field] - value) > Math.max(1e-9, Math.abs(value) * 1e-12)
    ) {
      throw new Error(
        `NATIVE_GOLDEN_MISMATCH: ${field} expected ${value}, received ${output[field]}`
      );
    }
  }
}

export async function runDoeMeasurCompressedAirGolden({
  repositoryPath,
  compiler = process.env.MEASUR_CXX || "/usr/bin/clang++",
  input = DOE_MEASUR_COMPRESSED_AIR_ESTIMATE_FIXTURE
}) {
  assertNetworkDisabled();
  const normalizedInput =
    validateCompressedAirEstimateInput(input);
  const inspection =
    await inspectDoeMeasurRepository(repositoryPath);
  const nativeExecution =
    await compileAndRunNativeJsonHarness({
      repositoryPath,
      compiler,
      harnessSource: COMPRESSED_AIR_HARNESS_SOURCE,
      sourceFiles: [
        DOE_MEASUR_PINNED_FILES.leakSource.relativePath,
        DOE_MEASUR_PINNED_FILES.reductionSource.relativePath
      ],
      executionArgs: buildHarnessArguments(normalizedInput),
      workspacePrefix: "retrofi-measur-proof-",
      compileFailureLabel: "MEASUR_NATIVE_COMPILE_FAILED",
      executionFailureLabel:
        "MEASUR_NATIVE_EXECUTION_FAILED"
    });
  if (
    JSON.stringify(normalizedInput) ===
    JSON.stringify(DOE_MEASUR_COMPRESSED_AIR_ESTIMATE_FIXTURE)
  ) {
    assertGoldenOutput(nativeExecution.nativeOutput);
  }
  const result = {
    sourceCommit: DOE_MEASUR_COMMIT,
    calculator: "CompressedAirLeakSurvey",
    compilerVersion: nativeExecution.compilerVersion,
    executableSha256: nativeExecution.executableSha256,
    networkMode: nativeExecution.networkMode,
    nativeInput: normalizedInput,
    nativeOutput: nativeExecution.nativeOutput,
    sourceSchemaFingerprintSha256:
      inspection.schemaFingerprintSha256,
    adapterPath: ADAPTER_PATH
  };
  const deterministicResult = {
    sourceCommit: result.sourceCommit,
    calculator: result.calculator,
    nativeInput: result.nativeInput,
    nativeOutput: result.nativeOutput,
    sourceSchemaFingerprintSha256:
      result.sourceSchemaFingerprintSha256,
    adapterPath: result.adapterPath
  };
  return {
    inspection,
    result,
    resultFingerprintSha256: sha256Json(deterministicResult)
  };
}

const ARTIFACT_IDS = Object.freeze({
  leakHeader:
    "artifact:doe-measur-compressed-air-header-bdc33b83",
  leakSource:
    "artifact:doe-measur-compressed-air-source-bdc33b83",
  reductionHeader:
    "artifact:doe-measur-reduction-header-bdc33b83",
  reductionSource:
    "artifact:doe-measur-reduction-source-bdc33b83",
  wasmBinding:
    "artifact:doe-measur-wasm-binding-bdc33b83",
  goldenTest:
    "artifact:doe-measur-compressed-air-golden-bdc33b83",
  license: "artifact:doe-measur-license-bdc33b83"
});

function sourceUrlFor(key) {
  return `${DOE_MEASUR_REPOSITORY_URL}/blob/${DOE_MEASUR_COMMIT}/${DOE_MEASUR_PINNED_FILES[key].relativePath}`;
}

function sourceProof(
  execution,
  status,
  recordsRead = 0,
  recordsWritten = 0
) {
  const artifact = execution.inspection.artifacts.goldenTest;
  return {
    source: {
      id: SOURCE_ID,
      standardId: "STD-DOE-MEASUR",
      organization:
        "Oak Ridge National Laboratory Advanced Manufacturing Office",
      name: "AMO Tools Suite",
      primaryUrl: DOE_MEASUR_REPOSITORY_URL,
      license: "BSD-3-Clause",
      attribution:
        "Oak Ridge National Laboratory AMO Tools Suite",
      accessMode: "PUBLIC_GIT_CLONE"
    },
    schema: {
      id: DOE_MEASUR_SOURCE_SCHEMA_ID,
      fingerprintSha256:
        DOE_MEASUR_SOURCE_SCHEMA_FINGERPRINT_SHA256,
      kind: DOE_MEASUR_SOURCE_SCHEMA.format,
      observed: DOE_MEASUR_SOURCE_SCHEMA,
      inspectedAt: ACQUIRED_AT
    },
    release: {
      id: RELEASE_ID,
      version: `Git commit ${DOE_MEASUR_COMMIT}`,
      publishedAt: null,
      acquiredAt: ACQUIRED_AT,
      status
    },
    artifact: {
      id: ARTIFACT_IDS.goldenTest,
      sourceUrl: sourceUrlFor("goldenTest"),
      localName: basename(
        DOE_MEASUR_PINNED_FILES.goldenTest.relativePath
      ),
      mediaType: "text/x-c++src",
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
      warningCount: status === "PUBLISHED" ? 1 : 0
    }
  };
}

function upsertDoeMeasurArtifacts(database, execution) {
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
  for (const [key, artifact] of Object.entries(
    execution.inspection.artifacts
  )) {
    const expected = DOE_MEASUR_PINNED_FILES[key];
    insertArtifact.run(
      ARTIFACT_IDS[key],
      RELEASE_ID,
      sourceUrlFor(key),
      basename(expected.relativePath),
      key === "license"
        ? "text/plain"
        : key.endsWith("Header")
          ? "text/x-c++hdr"
          : "text/x-c++src",
      artifact.byteSize,
      artifact.sha256,
      ACQUIRED_AT
    );
    insertChecksum.run(
      ARTIFACT_IDS[key],
      artifact.sha256,
      ACQUIRED_AT
    );
  }
}

export function mapDoeMeasurCompressedAirToItc43(
  execution
) {
  assertNetworkDisabled();
  const {
    nativeInput,
    nativeOutput
  } = execution.result;
  if (
    !Number.isFinite(nativeOutput.totalFlowRate) ||
    nativeOutput.totalFlowRate <= 0 ||
    !Number.isFinite(nativeInput.compressorSpecificPower) ||
    nativeInput.compressorSpecificPower <= 0
  ) {
    throw new Error(
      "INCOMPATIBLE_UNIT_OR_VALUE: MEASUR output mapping"
    );
  }
  const provenance = buildProvenance({
    standardId: "STD-DOE-MEASUR",
    artifact:
      execution.inspection.artifacts.goldenTest,
    sourceVersion: `Git commit ${DOE_MEASUR_COMMIT}`,
    sourceFields: [
      "CompressedAirLeakSurveyInput.hoursPerYear",
      "CompressedAirLeakSurveyInput.measurementMethod",
      "EstimateMethodData.leakRateEstimate",
      "CompressedAirLeakSurveyInput.units",
      "CompressorElectricityData.compressorSpecificPower",
      "CompressedAirLeakSurvey::Output.totalFlowRate"
    ],
    filters: {
      calculator: "CompressedAirLeakSurvey",
      measurementMethod: nativeInput.measurementMethod,
      equipmentCount: nativeInput.equipmentCount,
      documentedSystemPressurePsig:
        nativeInput.documentedSystemPressurePsig,
      sourceCommit: execution.result.sourceCommit
    },
    transformation:
      "Compile and execute the pinned native CompressedAirLeakSurvey estimate-method calculator. Map totalFlowRate to leak_flow and the validated native CompressorElectricityData compressorSpecificPower input to compressor_specific_power.",
    adapterPath: ADAPTER_PATH
  });
  return {
    standardId: "STD-DOE-MEASUR",
    categoryId: "ITC-43",
    processKey: "doe_measur",
    values: {
      leak_flow: nativeOutput.totalFlowRate,
      compressor_specific_power:
        nativeInput.compressorSpecificPower
    },
    formulaBindings: [
      {
        outputName: "Measured leak flow",
        formulaTerm: "leak_flow",
        value: nativeOutput.totalFlowRate,
        unit: "flow/leak",
        scope: "PER_EQUIPMENT_UNIT"
      },
      {
        outputName: "Compressor specific power",
        formulaTerm: "compressor_specific_power",
        value: nativeInput.compressorSpecificPower,
        unit: "kW/flow-unit",
        scope: "PER_EQUIPMENT_UNIT"
      }
    ],
    selectionRule:
      "EXACT_REVIEWED_ESTIMATE_METHOD_INPUTS_AND_PINNED_NATIVE_MODEL",
    provenance
  };
}

export function publishDoeMeasurCompressedAirProof(
  database,
  execution,
  mapped = mapDoeMeasurCompressedAirToItc43(execution)
) {
  assertNetworkDisabled();
  upsertSourceProof(
    database,
    sourceProof(execution, "INSPECTED")
  );
  upsertDoeMeasurArtifacts(database, execution);

  const calculationId =
    `calculation:doe-measur:${DOE_MEASUR_COMMIT}:itc-43:${sha256Json(
      execution.result.nativeInput
    ).slice(0, 16)}`;
  database.exec("BEGIN IMMEDIATE");
  try {
    database.prepare(`
      INSERT INTO model_versions (
        id, standard_id, package_name, version,
        commit_sha, executable_sha256
      ) VALUES (
        ?, 'STD-DOE-MEASUR', 'AMO-Tools-Suite',
        ?, ?, ?
      )
      ON CONFLICT(id) DO UPDATE SET
        executable_sha256 = excluded.executable_sha256
    `).run(
      MODEL_VERSION_ID,
      `git-${DOE_MEASUR_COMMIT}`,
      DOE_MEASUR_COMMIT,
      execution.result.executableSha256
    );
    database.prepare(`
      INSERT INTO model_input_schemas (
        id, model_version_id, module_name,
        fingerprint_sha256, schema_json
      ) VALUES (
        ?, ?, 'CompressedAirLeakSurvey.estimate', ?, ?
      )
      ON CONFLICT(id) DO UPDATE SET
        fingerprint_sha256 = excluded.fingerprint_sha256,
        schema_json = excluded.schema_json
    `).run(
      `schema-input:doe-measur:${DOE_MEASUR_COMMIT}:compressed-air-estimate-v2`,
      MODEL_VERSION_ID,
      execution.inspection.schemaFingerprintSha256,
      JSON.stringify({
        nativeInterface:
          execution.inspection.nativeInterface,
        supportedBoundary: {
          measurementMethod: "estimate",
          requiredProjectInputs: Object.keys(
            DOE_MEASUR_COMPRESSED_AIR_ESTIMATE_FIXTURE
          )
        }
      })
    );
    database.prepare(`
      INSERT INTO calculation_runs (
        id, standard_id, process_key, source_release_id,
        model_version_id, adapter_version, input_sha256,
        output_sha256, network_disabled, status, created_at
      ) VALUES (
        ?, 'STD-DOE-MEASUR', 'doe_measur', ?, ?, ?, ?, ?,
        1, 'SUCCEEDED', ?
      )
      ON CONFLICT(id) DO UPDATE SET
        output_sha256 = excluded.output_sha256,
        status = excluded.status
    `).run(
      calculationId,
      RELEASE_ID,
      MODEL_VERSION_ID,
      ADAPTER_VERSION,
      sha256Json(execution.result.nativeInput),
      sha256Json(execution.result.nativeOutput),
      ACQUIRED_AT
    );
    const insertSelectedValue = database.prepare(`
      INSERT INTO selected_values (
        id, calculation_run_id, formula_term, value,
        value_json, unit, scope, selection_rule
      ) VALUES (?, ?, ?, ?, NULL, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        value = excluded.value,
        unit = excluded.unit,
        scope = excluded.scope,
        selection_rule = excluded.selection_rule
    `);
    const insertProvenance = database.prepare(`
      INSERT INTO selected_value_provenance (
        selected_value_id, source_artifact_id,
        source_fields_json, filters_json, transformation,
        adapter_path
      ) VALUES (?, ?, ?, ?, ?, ?)
      ON CONFLICT(selected_value_id) DO UPDATE SET
        source_fields_json = excluded.source_fields_json,
        filters_json = excluded.filters_json,
        transformation = excluded.transformation,
        adapter_path = excluded.adapter_path
    `);
    for (const binding of mapped.formulaBindings) {
      const selectedValueId =
        `${calculationId}:${binding.formulaTerm}`;
      insertSelectedValue.run(
        selectedValueId,
        calculationId,
        binding.formulaTerm,
        binding.value,
        binding.unit,
        binding.scope,
        mapped.selectionRule
      );
      insertProvenance.run(
        selectedValueId,
        ARTIFACT_IDS.goldenTest,
        JSON.stringify(mapped.provenance.sourceFields),
        JSON.stringify(mapped.provenance.filters),
        mapped.provenance.transformation,
        mapped.provenance.adapterPath
      );
    }
    database.prepare(`
      INSERT INTO calculation_warnings (
        id, calculation_run_id, code, message, severity
      ) VALUES (
        ?, ?, 'ESTIMATE_METHOD_ONLY',
        'The proved adapter boundary supports reviewed estimate-method inputs only; decibel, bag, and orifice project paths require separate validation.',
        'INFO'
      )
      ON CONFLICT(id) DO UPDATE SET
        message = excluded.message,
        severity = excluded.severity
    `).run(
      `${calculationId}:warning:estimate-only`,
      calculationId
    );
    database.exec("COMMIT");
  } catch (error) {
    database.exec("ROLLBACK");
    throw error;
  }

  upsertSourceProof(
    database,
    sourceProof(execution, "PUBLISHED", 7, 5)
  );
  upsertDoeMeasurArtifacts(database, execution);
  return {
    calculationId,
    modelVersionId: MODEL_VERSION_ID,
    selectedValueIds: mapped.formulaBindings.map(
      (binding) =>
        `${calculationId}:${binding.formulaTerm}`
    ),
    mapped,
    normalizedTargets: [
      "model_versions",
      "model_input_schemas",
      "calculation_runs",
      "selected_values",
      "selected_value_provenance",
      "calculation_warnings"
    ]
  };
}
