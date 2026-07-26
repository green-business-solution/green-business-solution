import { assertNetworkDisabled, sha256Json } from "./artifact.mjs";
import {
  upsertSourceProof,
  withAtomicDeferredReleasePublication
} from "./sqlite.mjs";

const CANONICAL_OUTPUTS = Object.freeze({
  "STD-PVWATTS-V8": {
    unit: "kWh/interval",
    scope: "PROFILE"
  },
  "STD-SAM-SOLAR-THERMAL": {
    unit: "kWh-thermal/year",
    scope: "PER_YEAR"
  },
  "STD-WIND-SAM": {
    unit: "kWh/interval",
    scope: "PROFILE"
  }
});

function slugForProof(proof) {
  return {
    "STD-PVWATTS-V8": "pvwatts",
    "STD-SAM-SOLAR-THERMAL": "sam-solar-thermal",
    "STD-WIND-SAM": "wind-sam"
  }[proof.standardId];
}

function validateProof(proof) {
  const slug = slugForProof(proof);
  if (!slug || !CANONICAL_OUTPUTS[proof.standardId]) {
    throw new Error(
      `SOURCE_UNSUPPORTED: unknown SSC Standard ${proof.standardId}`
    );
  }
  if (
    proof.proofStatus !== "REAL_SOURCE_BACKED" ||
    proof.execution?.status !== "SUCCESS" ||
    proof.execution?.networkDisabled !== true ||
    proof.sourceIdentity?.library?.sscVersion !== 303
  ) {
    throw new Error(
      `INVALID_MODEL_PROOF: ${proof.standardId} is not a successful offline SSC 303 execution`
    );
  }
  if (
    proof.publicationRows?.modelVersion?.executableSha256 !==
      proof.sourceIdentity.library.sha256 ||
    proof.publicationRows?.modelInputSchema?.fingerprintSha256 !==
      proof.nativeModelInterface?.schemaFingerprintSha256
  ) {
    throw new Error(
      `MIXED_MODEL_RELEASES: ${proof.standardId} publication rows differ from the executed model`
    );
  }
  const selection =
    proof.publicationRows.selectedValue ||
    proof.publicationRows.selectedSeries;
  if (
    !selection ||
    selection.formulaTerm !== proof.formulaBinding?.formulaTerm ||
    selection.unit !== CANONICAL_OUTPUTS[proof.standardId].unit
  ) {
    throw new Error(
      `MISSING_FORMULA_MAPPING: ${proof.standardId} selected output differs from its formula binding`
    );
  }
  return { slug, selection };
}

export function publishSscProof(database, proof) {
  assertNetworkDisabled();
  const validatedProof = validateProof(proof);
  return withAtomicDeferredReleasePublication(
    database,
    () => publishSscProofWithinPublication(
      database,
      proof,
      validatedProof
    )
  );
}

function publishSscProofWithinPublication(
  database,
  proof,
  { slug, selection }
) {
  const modelVersion = proof.publicationRows.modelVersion;
  const modelSchema = proof.publicationRows.modelInputSchema;
  const calculationRun = proof.publicationRows.calculationRun;
  const sourceId = `source:ssc:${slug}`;
  const releaseId = `release:ssc:${slug}:303`;
  const artifactId = `artifact:${slug}:ssc-303`;
  const schemaId = `schema:ssc:${slug}:303`;
  const ingestionId = `ingestion:ssc:${slug}:303:v1`;
  const acquiredAt = "2026-07-24T00:00:00.000Z";
  upsertSourceProof(database, {
    source: {
      id: sourceId,
      standardId: proof.standardId,
      organization: "National Laboratory of the Rockies",
      name: `${proof.nativeModelInterface.module} through SSC 303`,
      primaryUrl: proof.sourceIdentity.library.repository,
      license: proof.sourceIdentity.library.licenseContext,
      attribution:
        "System Advisor Model Simulation Core and pinned official repository fixtures",
      accessMode: "PINNED_LOCAL_LIBRARY_AND_REPOSITORY_FIXTURE"
    },
    schema: {
      id: schemaId,
      fingerprintSha256:
        proof.nativeModelInterface.schemaFingerprintSha256,
      kind: "SSC_C_API_MODULE_METADATA",
      observed: proof.nativeModelInterface,
      inspectedAt: acquiredAt
    },
    release: {
      id: releaseId,
      version: `SSC ${proof.sourceIdentity.library.sscVersion}`,
      publishedAt: null,
      acquiredAt,
      status: "PUBLISHED"
    },
    artifact: {
      id: artifactId,
      sourceUrl: proof.sourceIdentity.library.repository,
      localName: "libssc.dylib",
      mediaType: "application/x-mach-binary",
      byteSize: proof.sourceIdentity.library.byteSize,
      sha256: proof.sourceIdentity.library.sha256
    },
    ingestion: {
      id: ingestionId,
      adapterVersion: calculationRun.adapterVersion,
      startedAt: acquiredAt,
      finishedAt: acquiredAt,
      status: "SUCCEEDED",
      recordsRead: proof.nativeModelInterface.variables.length,
      recordsWritten: 1,
      warningCount: proof.warnings.length
    }
  });
  database.prepare(`
    INSERT INTO model_versions (
      id, standard_id, package_name, version, commit_sha, executable_sha256
    ) VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      standard_id = excluded.standard_id,
      package_name = excluded.package_name,
      version = excluded.version,
      commit_sha = excluded.commit_sha,
      executable_sha256 = excluded.executable_sha256
  `).run(
    modelVersion.id,
    modelVersion.standardId,
    modelVersion.packageName,
    modelVersion.version,
    modelVersion.commitSha,
    modelVersion.executableSha256
  );
  database.prepare(`
    INSERT INTO model_input_schemas (
      id, model_version_id, module_name, fingerprint_sha256, schema_json
    ) VALUES (?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      model_version_id = excluded.model_version_id,
      module_name = excluded.module_name,
      fingerprint_sha256 = excluded.fingerprint_sha256,
      schema_json = excluded.schema_json
  `).run(
    modelSchema.id,
    modelSchema.modelVersionId,
    modelSchema.moduleName,
    modelSchema.fingerprintSha256,
    JSON.stringify(modelSchema.schemaJson)
  );
  database.prepare(`
    INSERT INTO calculation_runs (
      id, standard_id, process_key, source_release_id, model_version_id,
      adapter_version, input_sha256, output_sha256, network_disabled,
      status, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      standard_id = excluded.standard_id,
      process_key = excluded.process_key,
      source_release_id = excluded.source_release_id,
      model_version_id = excluded.model_version_id,
      adapter_version = excluded.adapter_version,
      input_sha256 = excluded.input_sha256,
      output_sha256 = excluded.output_sha256,
      network_disabled = excluded.network_disabled,
      status = excluded.status,
      created_at = excluded.created_at
  `).run(
    calculationRun.id,
    calculationRun.standardId,
    calculationRun.processKey,
    releaseId,
    calculationRun.modelVersionId,
    calculationRun.adapterVersion,
    calculationRun.inputSha256,
    calculationRun.outputSha256,
    calculationRun.networkDisabled,
    calculationRun.status,
    acquiredAt
  );
  const canonical = CANONICAL_OUTPUTS[proof.standardId];
  const selectedId =
    proof.publicationRows.selectedValue?.id ||
    `${calculationRun.id}-${selection.formulaTerm}`;
  const numericValue =
    proof.publicationRows.selectedValue?.value ?? null;
  const structuredValue = proof.publicationRows.selectedSeries
    ? JSON.stringify({
        count: selection.count,
        sha256: selection.sha256,
        valuesIncluded: selection.valuesIncluded
      })
    : null;
  database.prepare(`
    INSERT INTO selected_values (
      id, calculation_run_id, formula_term, value, value_json, unit, scope,
      selection_rule
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      calculation_run_id = excluded.calculation_run_id,
      formula_term = excluded.formula_term,
      value = excluded.value,
      value_json = excluded.value_json,
      unit = excluded.unit,
      scope = excluded.scope,
      selection_rule = excluded.selection_rule
  `).run(
    selectedId,
    calculationRun.id,
    selection.formulaTerm,
    numericValue,
    structuredValue,
    canonical.unit,
    canonical.scope,
    proof.publicationRows.selectedValue?.selectionRule ||
      "Native SSC interval output with count and content checksum"
  );
  const provenance = proof.publicationRows.selectedValueProvenance;
  database.prepare(`
    INSERT INTO selected_value_provenance (
      selected_value_id, source_artifact_id, source_fields_json,
      filters_json, transformation, adapter_path
    ) VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT(selected_value_id) DO UPDATE SET
      source_artifact_id = excluded.source_artifact_id,
      source_fields_json = excluded.source_fields_json,
      filters_json = excluded.filters_json,
      transformation = excluded.transformation,
      adapter_path = excluded.adapter_path
  `).run(
    selectedId,
    artifactId,
    JSON.stringify(provenance.sourceFields),
    JSON.stringify(provenance.filters),
    provenance.transformation,
    provenance.adapterPath
  );
  const insertWarning = database.prepare(`
    INSERT INTO calculation_warnings (
      id, calculation_run_id, code, message, severity
    ) VALUES (?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      calculation_run_id = excluded.calculation_run_id,
      code = excluded.code,
      message = excluded.message,
      severity = excluded.severity
  `);
  const expectedWarningIds = proof.warnings.map(
    (_, index) => `${calculationRun.id}:warning:${index + 1}`
  );
  for (const [index, warning] of proof.warnings.entries()) {
    insertWarning.run(
      expectedWarningIds[index],
      calculationRun.id,
      warning.code,
      warning.message,
      warning.severity
    );
  }
  const actualWarningIds = database.prepare(`
    SELECT id
    FROM calculation_warnings
    WHERE calculation_run_id = ?
    ORDER BY id
  `).all(calculationRun.id).map(({ id }) => id);
  const ingestionWarningCount = database.prepare(`
    SELECT warning_count
    FROM ingestion_runs
    WHERE id = ?
  `).get(ingestionId)?.warning_count;
  if (
    JSON.stringify(actualWarningIds) !==
      JSON.stringify([...expectedWarningIds].sort()) ||
    ingestionWarningCount !== expectedWarningIds.length
  ) {
    throw new Error(
      `SSC_WARNING_SET_MISMATCH: ${proof.standardId} warning evidence differs from the published calculation`
    );
  }
  return {
    sourceId,
    releaseId,
    artifactId,
    schemaId,
    modelVersionId: modelVersion.id,
    calculationRunId: calculationRun.id,
    selectedValueId: selectedId,
    outputFingerprintSha256: sha256Json({
      formulaTerm: selection.formulaTerm,
      value: numericValue,
      valueJson: structuredValue,
      unit: canonical.unit,
      scope: canonical.scope
    })
  };
}
