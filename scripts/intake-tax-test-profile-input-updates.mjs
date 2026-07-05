import fs from "node:fs";
import path from "node:path";
import { normalizeUserProfile } from "../server/matching/normalizeUserProfile.mjs";

const repoRoot = path.resolve(import.meta.dirname, "..");
const defaultDate = "2026-07-05";

const options = parseArgs(process.argv.slice(2));
const date = options.date || defaultDate;
const workDir = path.resolve(
  options.workDir || path.join(repoRoot, "GPT Pro Work", `tax-test-profile-input-updates-${date}`)
);
const targetManifestPath = path.resolve(
  options.targetManifestPath || path.join(workDir, `target_tax_test_profile_rules_${date}.json`)
);
const sampleUsersPath = path.resolve(options.sampleUsersPath || path.join(repoRoot, "data", "sample_user_profiles.json"));
const testCasesPath = path.resolve(
  options.testCasesPath || path.join(repoRoot, "public", "sample_matching_test_cases.json")
);
const artifactPath = path.resolve(
  options.artifactPath || path.join(repoRoot, "data", `tax_test_profile_input_updates_gpt_pro_${date}.json`)
);
const reportPath = path.resolve(
  options.reportPath || path.join(repoRoot, "data", `tax_test_profile_input_update_intake_report_${date}.md`)
);

if (options.help) {
  printHelp();
  process.exit(0);
}

const now = new Date().toISOString();
const manifest = readJson(targetManifestPath);
const parsedOutputs = readOutputs();
const validation = validateOutputs(parsedOutputs, manifest);

if (validation.brokenOutputs.length || validation.schemaErrors.length || validation.mismatchedOutputs.length) {
  throw new Error(
    `Tax test-profile outputs are not safe to import: ${JSON.stringify(
      {
        brokenOutputs: validation.brokenOutputs,
        schemaErrors: validation.schemaErrors,
        mismatchedOutputs: validation.mismatchedOutputs
      },
      null,
      2
    )}`
  );
}

const artifact = buildArtifact(parsedOutputs, validation);
const sampleUsers = readJson(sampleUsersPath);
const testCasesPayload = readJson(testCasesPath);
const applyResult = applyProfilePatches({ sampleUsers, testCasesPayload, artifact });

if (!options.dryRun) {
  writeJson(artifactPath, artifact);
  writeJson(sampleUsersPath, applyResult.sampleUsers);
  writeJson(testCasesPath, applyResult.testCasesPayload);
  fs.writeFileSync(reportPath, buildReport({ artifact, validation, applyResult }), "utf8");
}

console.log("Intook tax test-profile input GPT Pro outputs.");
console.log(`Output files parsed: ${parsedOutputs.length}`);
console.log(`Profile patches imported: ${artifact.profilePatchCount}`);
console.log(`Existing sample profiles updated: ${applyResult.updatedSampleUserCount}`);
console.log(`New sample profiles added: ${applyResult.addedSampleUserCount}`);
console.log(`Existing public test cases updated: ${applyResult.updatedTestCaseCount}`);
console.log(`New public tax fixture test cases added: ${applyResult.addedTestCaseCount}`);
console.log(`Warnings: ${artifact.validationWarnings.length + applyResult.warnings.length}`);
console.log(`Artifact: ${path.relative(repoRoot, artifactPath)}`);
console.log(`Report: ${path.relative(repoRoot, reportPath)}`);

function parseArgs(args) {
  const parsed = {};
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (!arg.startsWith("--")) throw new Error(`Unexpected positional argument: ${arg}`);
    const key = arg.slice(2);
    if (key === "help" || key === "dryRun") {
      parsed[key] = true;
      continue;
    }
    const value = args[index + 1];
    if (!value || value.startsWith("--")) throw new Error(`Missing value for --${key}`);
    parsed[key] = value;
    index += 1;
  }
  return parsed;
}

function printHelp() {
  console.log(`Usage: node scripts/intake-tax-test-profile-input-updates.mjs [--date ${defaultDate}] [--dryRun]`);
}

function readOutputs() {
  const files = fs
    .readdirSync(workDir)
    .filter((fileName) => /^output_\d{3}_.*\.md$/i.test(fileName))
    .sort();
  return files.map((fileName) => parseOutputFile(path.join(workDir, fileName), fileName));
}

function parseOutputFile(filePath, fileName) {
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = {
    fileName,
    outputIndex: outputIndexFromFileName(fileName),
    object: null,
    broken: false,
    error: null,
    trailingTextLength: 0
  };

  try {
    const extracted = extractFirstJsonObject(raw);
    parsed.object = JSON.parse(extracted.json);
    parsed.trailingTextLength = extracted.trailing.length;
  } catch (error) {
    parsed.broken = true;
    parsed.error = error.message;
  }

  return parsed;
}

function extractFirstJsonObject(raw) {
  const cleaned = raw
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();
  const start = cleaned.indexOf("{");
  if (start < 0) throw new Error("No JSON object found.");

  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let index = start; index < cleaned.length; index += 1) {
    const char = cleaned[index];
    if (inString) {
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === "\"") inString = false;
      continue;
    }
    if (char === "\"") inString = true;
    else if (char === "{") depth += 1;
    else if (char === "}") {
      depth -= 1;
      if (depth === 0) {
        return {
          json: cleaned.slice(start, index + 1),
          trailing: cleaned.slice(index + 1).trim()
        };
      }
    }
  }
  throw new Error("Unclosed JSON object.");
}

function validateOutputs(parsedOutputs, manifest) {
  const targetsByIndex = new Map(
    (manifest.targets || []).map((target, index) => [index + 1, target])
  );
  const brokenOutputs = [];
  const schemaErrors = [];
  const mismatchedOutputs = [];
  const duplicateTargets = [];
  const trailingTextOutputs = [];
  const profileWarnings = [];
  const seenTargetIds = new Map();

  for (const output of parsedOutputs) {
    const target = targetsByIndex.get(output.outputIndex);
    if (output.broken) {
      brokenOutputs.push({ fileName: output.fileName, error: output.error });
      continue;
    }
    if (output.trailingTextLength > 0) {
      trailingTextOutputs.push({ fileName: output.fileName, trailingTextLength: output.trailingTextLength });
    }
    const object = output.object || {};
    if (object.schemaVersion !== "retrofi_tax_test_profile_patch.v1") {
      schemaErrors.push({ fileName: output.fileName, schemaVersion: object.schemaVersion || null });
      continue;
    }
    if (!target) {
      mismatchedOutputs.push({ fileName: output.fileName, reason: "No target manifest row for output index." });
      continue;
    }
    if (object.sourceSkippedRecordId !== target.sourceSkippedRecordId || object.taxRuleId !== target.taxRuleId) {
      mismatchedOutputs.push({
        fileName: output.fileName,
        expectedSourceSkippedRecordId: target.sourceSkippedRecordId,
        actualSourceSkippedRecordId: object.sourceSkippedRecordId,
        expectedTaxRuleId: target.taxRuleId,
        actualTaxRuleId: object.taxRuleId
      });
    }
    const targetSampleUserId = object.targetSampleUserId || object.profileIdentityPatch?.sampleUserId;
    if (!targetSampleUserId) profileWarnings.push(`${output.fileName}: missing targetSampleUserId.`);
    if (!Array.isArray(object.taxProfileFacts)) profileWarnings.push(`${output.fileName}: taxProfileFacts is not an array.`);
    if (!Array.isArray(object.taxDocuments)) profileWarnings.push(`${output.fileName}: taxDocuments is not an array.`);

    const previous = seenTargetIds.get(object.sourceSkippedRecordId);
    if (previous) duplicateTargets.push({ sourceSkippedRecordId: object.sourceSkippedRecordId, files: [previous, output.fileName] });
    else seenTargetIds.set(object.sourceSkippedRecordId, output.fileName);

    for (const fact of object.taxProfileFacts || []) {
      if (!fact.inputKey) profileWarnings.push(`${output.fileName}: a taxProfileFacts row is missing inputKey.`);
      if (!Object.prototype.hasOwnProperty.call(fact, "value")) {
        profileWarnings.push(`${output.fileName}: taxProfileFacts.${fact.inputKey || "unknown"} is missing value.`);
      }
    }
  }

  return {
    brokenOutputs,
    schemaErrors,
    mismatchedOutputs,
    duplicateTargets,
    trailingTextOutputs,
    profileWarnings
  };
}

function buildArtifact(parsedOutputs, validation) {
  const profilePatches = parsedOutputs
    .filter((output) => output.object?.schemaVersion === "retrofi_tax_test_profile_patch.v1")
    .map((output) => normalizePatch(output.object, output.fileName));

  return {
    schemaVersion: "retrofi_tax_test_profile_input_updates_gpt_pro.v1",
    generatedAt: now,
    sourceWorkDir: path.relative(repoRoot, workDir),
    sourceFiles: parsedOutputs.map((output) => output.fileName),
    profilePatchCount: profilePatches.length,
    counts: {
      updateExistingCount: profilePatches.filter((patch) => patch.requestedAction === "update_existing_profile").length,
      createNewCount: profilePatches.filter((patch) => patch.requestedAction === "create_new_profile").length,
      taxProfileFactCount: sum(profilePatches, (patch) => patch.taxProfileFacts.length),
      taxDocumentCount: sum(profilePatches, (patch) => patch.taxDocuments.length),
      stillMissingOrUnsafeFieldCount: sum(profilePatches, (patch) => patch.stillMissingOrUnsafeFields.length),
      expectedRuntimeStatusCounts: countBy(profilePatches, (patch) => patch.calculationExpectation?.expectedRuntimeStatusWithPatch || "unknown")
    },
    profilePatches,
    validationWarnings: [
      ...validation.trailingTextOutputs.map((warning) => `${warning.fileName}: ignored ${warning.trailingTextLength} trailing characters.`),
      ...validation.duplicateTargets.map((warning) => `${warning.sourceSkippedRecordId}: duplicate outputs in ${warning.files.join(", ")}.`),
      ...validation.profileWarnings
    ]
  };
}

function normalizePatch(raw, sourceFile) {
  const targetSampleUserId = raw.targetSampleUserId || raw.profileIdentityPatch?.sampleUserId;
  const taxDocuments = (raw.taxDocuments || []).map((document) => normalizeDocument(document, raw, sourceFile));
  const fileIdByInputKey = new Map();
  for (const document of taxDocuments) {
    for (const inputKey of document.extractedInputKeys || []) {
      if (!fileIdByInputKey.has(inputKey)) fileIdByInputKey.set(inputKey, document.fileId);
    }
  }
  const taxProfileFacts = (raw.taxProfileFacts || []).map((fact) =>
    normalizeFact(fact, raw, sourceFile, fileIdByInputKey.get(fact.inputKey) || null)
  );

  return {
    schemaVersion: raw.schemaVersion,
    sourceSkippedRecordId: raw.sourceSkippedRecordId,
    taxRuleId: raw.taxRuleId,
    requestedAction: raw.action,
    targetSampleUserId,
    profileIdentityPatch: raw.profileIdentityPatch || {},
    taxProfileFacts,
    taxDocuments,
    taxExtractedValues: taxProfileFacts.map((fact, index) => buildExtractedValue(fact, targetSampleUserId, index)),
    opportunityEligibilityFields: arrayOf(raw.opportunityEligibilityFields),
    postScenarioApplicationFields: arrayOf(raw.postScenarioApplicationFields),
    serverDerivedFields: arrayOf(raw.serverDerivedFields),
    stillMissingOrUnsafeFields: arrayOf(raw.stillMissingOrUnsafeFields),
    calculationExpectation: raw.calculationExpectation || null,
    sourceUrlsChecked: arrayOf(raw.sourceUrlsChecked),
    notesForCodexImporter: arrayOf(raw.notesForCodexImporter),
    sourceFile,
    sourceWorkDir: path.relative(repoRoot, workDir)
  };
}

function normalizeDocument(document, raw, sourceFile) {
  const sampleUserId = raw.targetSampleUserId || raw.profileIdentityPatch?.sampleUserId;
  return {
    fileId: document.fileId,
    clientIntakeId: `intake_sample_${sampleUserId}`,
    siteId: `intake_sample_${sampleUserId}:primary_site`,
    originalFilename: document.originalFilename || `${document.fileId}.pdf`,
    fileType: "application/pdf",
    utilityCategory: "tax",
    taxDocumentType: document.taxDocumentType || "other",
    synthetic: document.synthetic !== false,
    processingStatus: "processed",
    uploadedAt: now,
    processedAt: now,
    documentSummary: document.documentSummary || "",
    extractedInputKeys: arrayOf(document.extractedInputKeys),
    sourceSkippedRecordId: raw.sourceSkippedRecordId,
    taxRuleId: raw.taxRuleId,
    source: "gpt_pro_tax_test_profile_patch",
    sourceFile
  };
}

function normalizeFact(fact, raw, sourceFile, sourceFileId) {
  return {
    inputKey: fact.inputKey || fact.input_key || "",
    value: fact.value,
    valueType: normalizeValueType(fact.valueType || fact.value_type || valueTypeFor(fact.value)),
    sourceStrategy: fact.sourceStrategy || "synthetic_tax_profile",
    uiStage: fact.uiStage || null,
    uiPlacement: fact.uiPlacement || "tax_profile",
    confidence: fact.confidence || "medium",
    confidenceImpactUntilConfirmed: confidenceImpactUntilConfirmed(fact.confidence || "medium"),
    userOverrideAllowed: fact.userOverrideAllowed !== false,
    notes: fact.notes || "",
    source: "gpt_pro_tax_test_profile_patch",
    sourceSkippedRecordId: raw.sourceSkippedRecordId,
    taxRuleId: raw.taxRuleId,
    sourceFileId,
    sourceFile,
    defaultIsSynthetic: true
  };
}

function buildExtractedValue(fact, sampleUserId, index) {
  return {
    extractedValueId: `tax_patch_ev_${sampleUserId}_${fact.sourceSkippedRecordId}_${String(index + 1).padStart(3, "0")}`,
    clientIntakeId: `intake_sample_${sampleUserId}`,
    fileId: fact.sourceFileId || null,
    fieldId: fact.inputKey,
    fieldDisplayName: labelFromInputKey(fact.inputKey),
    value: fact.value,
    unit: unitForFact(fact),
    taxYear: taxYearFromFact(fact),
    confidence: fact.confidence,
    sourceType: fact.sourceStrategy || "synthetic_tax_profile",
    sourceText: fact.notes || "Synthetic GPT Pro tax fixture input.",
    sourcePath: fact.sourceFileId ? `synthetic://${fact.sourceFileId}#/fields/${fact.inputKey}` : null,
    sourceSkippedRecordId: fact.sourceSkippedRecordId,
    taxRuleId: fact.taxRuleId,
    sourceFile: fact.sourceFile
  };
}

function applyProfilePatches({ sampleUsers, testCasesPayload, artifact }) {
  const profilePatches = artifact.profilePatches || [];
  const sampleById = new Map(sampleUsers.map((sample, index) => [sample.sampleUserId, { sample, index }]));
  const testCases = Array.isArray(testCasesPayload) ? testCasesPayload : testCasesPayload.testCases || [];
  const testCaseById = new Map(testCases.map((testCase, index) => [testCase.sampleUserId, { testCase, index }]));
  const patchedSampleUsers = [...sampleUsers];
  const patchedTestCases = [...testCases];
  const warnings = [];
  let updatedSampleUserCount = 0;
  let addedSampleUserCount = 0;
  let updatedTestCaseCount = 0;
  let addedTestCaseCount = 0;

  for (const patch of profilePatches) {
    const existingSample = sampleById.get(patch.targetSampleUserId);
    const sourceForm = existingSample
      ? applyPatchToSourceForm(existingSample.sample, patch)
      : buildNewSourceForm(patch);
    const normalizedProfile = normalizeUserProfile(sourceForm);
    const patchedSourceForm = {
      ...sourceForm,
      normalizedProfile
    };

    if (existingSample) {
      patchedSampleUsers[existingSample.index] = patchedSourceForm;
      updatedSampleUserCount += 1;
    } else {
      patchedSampleUsers.push(patchedSourceForm);
      sampleById.set(patch.targetSampleUserId, { sample: patchedSourceForm, index: patchedSampleUsers.length - 1 });
      addedSampleUserCount += 1;
    }

    const existingTestCase = testCaseById.get(patch.targetSampleUserId);
    if (existingTestCase) {
      patchedTestCases[existingTestCase.index] = applyPatchToTestCase(existingTestCase.testCase, patchedSourceForm, patch);
      updatedTestCaseCount += 1;
    } else {
      patchedTestCases.push(buildNewTaxFixtureTestCase(patchedSourceForm, patch));
      testCaseById.set(patch.targetSampleUserId, {
        testCase: patchedTestCases[patchedTestCases.length - 1],
        index: patchedTestCases.length - 1
      });
      addedTestCaseCount += 1;
    }

    if (patch.requestedAction === "create_new_profile" && existingSample) {
      warnings.push(`${patch.sourceFile}: requested create_new_profile but ${patch.targetSampleUserId} already existed; updated existing profile.`);
    }
  }

  const patchedPayload = Array.isArray(testCasesPayload)
    ? patchedTestCases
    : {
        ...testCasesPayload,
        taxTestProfileInputUpdatesImportedAt: now,
        taxTestProfileInputUpdateCount: profilePatches.length,
        taxTestProfileInputUpdateArtifact: path.relative(repoRoot, artifactPath),
        testCases: patchedTestCases
      };

  return {
    sampleUsers: patchedSampleUsers,
    testCasesPayload: patchedPayload,
    updatedSampleUserCount,
    addedSampleUserCount,
    updatedTestCaseCount,
    addedTestCaseCount,
    warnings
  };
}

function applyPatchToSourceForm(sourceForm, patch) {
  const merged = {
    ...sourceForm,
    ...taxProfilePatchFields(sourceForm, patch)
  };
  if (!merged.siteGeography) merged.siteGeography = geographyFromPatch(patch);
  return merged;
}

function buildNewSourceForm(patch) {
  const identity = patch.profileIdentityPatch || {};
  const sampleUserId = patch.targetSampleUserId;
  return {
    sampleUserId,
    description: identity.realisticProfileRationale || `Synthetic tax fixture for ${patch.sourceSkippedRecordId}.`,
    companyName: identity.organizationName || identity.sampleName || sampleUserId,
    fullName: "Sample User",
    email: `${sampleUserId}@example.com`,
    phone: "555-0100",
    website: null,
    organizationType: organizationTypeFromSector(identity.sector),
    organizationSize: organizationSizeFromSector(identity.sector),
    siteAddress: identity.address || "",
    siteGeography: geographyFromPatch(patch),
    ownershipStatus: ownershipFromSector(identity.sector),
    buildingType: buildingTypeFromSector(identity.sector),
    squareFootage: squareFootageFromSector(identity.sector),
    primaryActivityText: identity.sector || identity.realisticProfileRationale || "",
    naicsCodes: [],
    project: { stage: "synthetic_tax_fixture" },
    syntheticUtilityDataNotice: "No synthetic utility data generated; this fixture exists to exercise tax inputs.",
    uploadedUtilityFiles: [],
    utilityExtractedValues: [],
    ...taxProfilePatchFields({}, patch)
  };
}

function taxProfilePatchFields(existing, patch) {
  const taxProfileFacts = mergeRowsByKeys(existing.taxProfileFacts, patch.taxProfileFacts, patch);
  const taxExtractedValues = mergeRowsByKeys(existing.taxExtractedValues, patch.taxExtractedValues, patch, ["extractedValueId"]);
  const uploadedTaxFiles = mergeRowsByKeys(existing.uploadedTaxFiles, patch.taxDocuments, patch, ["fileId"]);
  const taxOpportunitySpecificInputs = mergeRowsByKeys(existing.taxOpportunitySpecificInputs, [], patch);
  const taxMissingOrReviewInputs = mergeRowsByKeys(existing.taxMissingOrReviewInputs, patch.stillMissingOrUnsafeFields, patch, ["inputKey"]);

  return {
    uploadedTaxFiles,
    taxProfileFacts,
    taxExtractedValues,
    taxOpportunitySpecificInputs,
    taxMissingOrReviewInputs,
    siteTaxProfile: buildSiteTaxProfile({ existing, patch, uploadedTaxFiles, taxProfileFacts, taxExtractedValues, taxOpportunitySpecificInputs, taxMissingOrReviewInputs }),
    syntheticTaxDataNotice: "Synthetic estimated tax profile for test fixtures; not actual tax documents.",
    taxDataGeneratedAt: patch.calculationExpectation?.generatedAt || now,
    taxDataImportedAt: now,
    taxDataSchemaVersion: "retrofi_tax_test_profile_patch.v1",
    taxDataSourceArtifact: path.relative(repoRoot, artifactPath)
  };
}

function mergeRowsByKeys(existingRows = [], newRows = [], patch, keys = ["inputKey", "fieldId", "fileId"]) {
  const filteredExisting = arrayOf(existingRows).filter((row) => {
    if (row.sourceSkippedRecordId === patch.sourceSkippedRecordId || row.taxRuleId === patch.taxRuleId) return false;
    return true;
  });
  const rows = [...filteredExisting];
  const seen = new Set(rows.map((row) => rowIdentity(row, keys)).filter(Boolean));
  for (const row of arrayOf(newRows)) {
    const identity = rowIdentity(row, keys);
    if (identity && seen.has(identity)) {
      const index = rows.findIndex((existing) => rowIdentity(existing, keys) === identity);
      rows[index] = row;
    } else {
      rows.push(row);
      if (identity) seen.add(identity);
    }
  }
  return rows;
}

function rowIdentity(row, keys) {
  for (const key of keys) {
    const value = row?.[key] || row?.input_key || row?.field_id;
    if (value) return `${key}:${value}`;
  }
  return null;
}

function buildSiteTaxProfile({
  existing,
  patch,
  uploadedTaxFiles,
  taxProfileFacts,
  taxExtractedValues,
  taxOpportunitySpecificInputs,
  taxMissingOrReviewInputs
}) {
  const previous = existing.siteTaxProfile || {};
  return {
    ...previous,
    schemaVersion: "retrofi_site_tax_profile_synthetic_v1",
    generatedAt: now,
    sourceArtifact: path.relative(repoRoot, artifactPath),
    sampleUserId: patch.targetSampleUserId,
    syntheticNotice: "Synthetic estimated tax profile for test fixtures; not actual tax documents.",
    uploadedFileCount: uploadedTaxFiles.length,
    processedFileCount: uploadedTaxFiles.filter((file) => file.processingStatus === "processed").length,
    extractedValueCount: taxExtractedValues.length,
    availableFieldIds: unique(taxExtractedValues.map((row) => row.fieldId).filter(Boolean)),
    taxDocumentTypes: unique(uploadedTaxFiles.map((file) => file.taxDocumentType).filter(Boolean)),
    taxYears: unique(taxExtractedValues.map((row) => String(row.taxYear || "")).filter(Boolean)),
    jurisdictions: unique([patch.profileIdentityPatch?.state, patch.profileIdentityPatch?.county, patch.profileIdentityPatch?.city].filter(Boolean)),
    taxProfileFactCount: taxProfileFacts.length,
    opportunitySpecificTaxInputCount: taxOpportunitySpecificInputs.length,
    missingOrReviewInputCount: taxMissingOrReviewInputs.length,
    sourceUrlsChecked: unique([...(previous.sourceUrlsChecked || []), ...(patch.sourceUrlsChecked || [])]),
    reasoningNotes: [
      previous.reasoningNotes,
      patch.profileIdentityPatch?.realisticProfileRationale,
      ...(patch.notesForCodexImporter || [])
    ]
      .filter(Boolean)
      .join(" ")
  };
}

function applyPatchToTestCase(testCase, patchedSourceForm, patch) {
  const sourceForm = {
    ...(testCase.sourceForm || {}),
    ...patchedSourceForm
  };
  delete sourceForm.normalizedProfile;
  const normalizedProfile = normalizeUserProfile(sourceForm);
  return {
    ...testCase,
    ...taxRootFieldsFromSourceForm(sourceForm),
    sourceForm,
    normalizedProfile,
    taxTestProfilePatchSourceFiles: unique([...(testCase.taxTestProfilePatchSourceFiles || []), patch.sourceFile])
  };
}

function buildNewTaxFixtureTestCase(sourceForm, patch) {
  const normalizedProfile = normalizeUserProfile(sourceForm);
  return {
    sampleUserId: sourceForm.sampleUserId,
    description: sourceForm.description,
    sourceForm,
    normalizedProfile,
    retrofits: [],
    topResults: [],
    blockers: [],
    unresolved: [],
    commonQuestions: [],
    statusCounts: {},
    ...taxRootFieldsFromSourceForm(sourceForm),
    taxOnlyFixture: true,
    taxTestProfilePatchSourceFiles: [patch.sourceFile]
  };
}

function taxRootFieldsFromSourceForm(sourceForm) {
  return {
    uploadedTaxFiles: sourceForm.uploadedTaxFiles || [],
    taxProfileFacts: sourceForm.taxProfileFacts || [],
    taxExtractedValues: sourceForm.taxExtractedValues || [],
    taxOpportunitySpecificInputs: sourceForm.taxOpportunitySpecificInputs || [],
    taxMissingOrReviewInputs: sourceForm.taxMissingOrReviewInputs || [],
    siteTaxProfile: sourceForm.siteTaxProfile || null,
    syntheticTaxDataNotice: sourceForm.syntheticTaxDataNotice || null,
    taxDataGeneratedAt: sourceForm.taxDataGeneratedAt || null,
    taxDataImportedAt: sourceForm.taxDataImportedAt || null,
    taxDataSchemaVersion: sourceForm.taxDataSchemaVersion || null,
    taxDataSourceArtifact: sourceForm.taxDataSourceArtifact || null
  };
}

function geographyFromPatch(patch) {
  const identity = patch.profileIdentityPatch || {};
  const stateCode = String(identity.state || "").toUpperCase() || null;
  return {
    stateCode,
    countyName: normalizeCountyName(identity.county),
    placeName: identity.city || null,
    zip5: identity.postalCode ? String(identity.postalCode).slice(0, 5) : zipFromAddress(identity.address),
    status: "gpt_pro_synthetic_fixture",
    provider: "gpt_pro"
  };
}

function organizationTypeFromSector(sector = "") {
  const text = String(sector).toLowerCase();
  if (text.includes("residential") || text.includes("homeowner") || text.includes("household")) return "Residential";
  if (text.includes("nonprofit")) return "Nonprofit";
  if (text.includes("government") || text.includes("municipal") || text.includes("public")) return "Government";
  return "Commercial Business";
}

function organizationSizeFromSector(sector = "") {
  const text = String(sector).toLowerCase();
  if (text.includes("residential") || text.includes("homeowner") || text.includes("household")) return "1 household";
  if (text.includes("utility") || text.includes("generation") || text.includes("data center")) return "Large";
  return "Small or medium";
}

function buildingTypeFromSector(sector = "") {
  const text = String(sector).toLowerCase();
  if (text.includes("residential") || text.includes("homeowner") || text.includes("household") || text.includes("townhome")) return "Single-Family Home";
  if (text.includes("warehouse") || text.includes("distribution")) return "Warehouse / Logistics";
  if (text.includes("data center")) return "Data Center / Server Facility";
  if (text.includes("retail") || text.includes("hardware")) return "Retail / Storefront";
  if (text.includes("manufactur") || text.includes("industrial") || text.includes("production") || text.includes("generation")) return "Industrial / Manufacturing";
  if (text.includes("office")) return "Office / Administrative";
  if (text.includes("home") || text.includes("dwelling")) return "Residential";
  return "Commercial Building";
}

function squareFootageFromSector(sector = "") {
  const text = String(sector).toLowerCase();
  if (text.includes("residential") || text.includes("townhome") || text.includes("homeowner")) return "1800";
  if (text.includes("data center")) return "250000";
  if (text.includes("generation") || text.includes("utility")) return "50000";
  if (text.includes("warehouse")) return "120000";
  if (text.includes("retail")) return "12000";
  return "50000";
}

function ownershipFromSector(sector = "") {
  const text = String(sector).toLowerCase();
  if (text.includes("residential") || text.includes("owner")) return "Own";
  return "Own";
}

function normalizeValueType(valueType) {
  if (valueType === "money_cents") return "currency_cents";
  if (valueType === "decimal") return "number";
  return valueType || "text";
}

function valueTypeFor(value) {
  if (typeof value === "boolean") return "boolean";
  if (typeof value === "number") return Number.isInteger(value) ? "integer" : "number";
  if (Array.isArray(value)) return "array";
  if (value && typeof value === "object") return "object";
  return "text";
}

function unitForFact(fact) {
  if (fact.valueType === "currency_cents" || /_cents$/.test(fact.inputKey)) return "cents";
  if (/date/.test(fact.inputKey)) return "date";
  return fact.valueType || typeof fact.value;
}

function taxYearFromFact(fact) {
  if (fact.inputKey === "tax_year") return fact.value;
  const match = String(fact.value || "").match(/\b(20\d{2})\b/);
  return match ? match[1] : "2026";
}

function confidenceImpactUntilConfirmed(confidence) {
  if (confidence === "high") return "low";
  if (confidence === "low") return "high";
  return "medium";
}

function normalizeCountyName(value) {
  const text = String(value || "").trim();
  if (!text) return null;
  if (/county$/i.test(text)) return text;
  return `${text} County`;
}

function zipFromAddress(address) {
  return String(address || "").match(/\b\d{5}\b/)?.[0] || null;
}

function labelFromInputKey(inputKey) {
  return String(inputKey || "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function outputIndexFromFileName(fileName) {
  const match = fileName.match(/^output_(\d{3})/i);
  return match ? Number(match[1]) : null;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function arrayOf(value) {
  return Array.isArray(value) ? value : [];
}

function sum(rows, iteratee) {
  return rows.reduce((total, row) => total + Number(iteratee(row) || 0), 0);
}

function countBy(rows, iteratee) {
  const counts = {};
  for (const row of rows || []) {
    const key = iteratee(row) || "unknown";
    counts[key] = (counts[key] || 0) + 1;
  }
  return Object.fromEntries(Object.entries(counts).sort(([a], [b]) => a.localeCompare(b)));
}

function unique(values) {
  return [...new Set((values || []).filter((value) => value !== undefined && value !== null && value !== ""))];
}

function buildReport({ artifact, validation, applyResult }) {
  const warnings = [...artifact.validationWarnings, ...applyResult.warnings];
  const rows = artifact.profilePatches.map((patch) => [
    patch.sourceSkippedRecordId,
    patch.targetSampleUserId,
    patch.requestedAction,
    String(patch.taxProfileFacts.length),
    String(patch.taxDocuments.length),
    patch.calculationExpectation?.expectedRuntimeStatusWithPatch || ""
  ]);

  return [
    "# Tax Test Profile Input Update Intake Report",
    "",
    `Generated at: ${now}`,
    "",
    "## Summary",
    "",
    `- GPT Pro output files parsed: ${artifact.sourceFiles.length}`,
    `- Profile patches imported: ${artifact.profilePatchCount}`,
    `- Existing sample profiles updated: ${applyResult.updatedSampleUserCount}`,
    `- New sample profiles added: ${applyResult.addedSampleUserCount}`,
    `- Existing public test cases updated: ${applyResult.updatedTestCaseCount}`,
    `- New public tax fixture test cases added: ${applyResult.addedTestCaseCount}`,
    `- Tax profile facts imported: ${artifact.counts.taxProfileFactCount}`,
    `- Synthetic tax documents imported: ${artifact.counts.taxDocumentCount}`,
    "",
    "## Expected Runtime Statuses",
    "",
    tableFromCounts(artifact.counts.expectedRuntimeStatusCounts),
    "",
    "## Imported Patches",
    "",
    table(["Tax Rule Candidate", "Sample User", "Requested Action", "Facts", "Documents", "Expected Runtime Status"], rows),
    "",
    "## Warnings",
    "",
    ...(warnings.length ? warnings.map((warning) => `- ${warning}`) : ["- None."]),
    "",
    "## Validation Notes",
    "",
    `- Broken outputs: ${validation.brokenOutputs.length}`,
    `- Schema errors: ${validation.schemaErrors.length}`,
    `- Mismatched outputs: ${validation.mismatchedOutputs.length}`,
    ""
  ].join("\n");
}

function tableFromCounts(counts) {
  const entries = Object.entries(counts || {});
  if (!entries.length) return "- None";
  return table(["Bucket", "Count"], entries.map(([key, value]) => [key, String(value)]));
}

function table(headers, rows) {
  if (!rows.length) return "- None";
  const escape = (value) => String(value ?? "").replace(/\|/g, "\\|").replace(/\n/g, " ");
  return [
    `| ${headers.map(escape).join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${row.map(escape).join(" | ")} |`)
  ].join("\n");
}
