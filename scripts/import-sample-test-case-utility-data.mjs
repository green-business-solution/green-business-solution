import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildSiteEnergyProfile, supportedUtilityCategories } from "../server/energyData/parseEnergyData.mjs";

const scriptPath = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(scriptPath), "..");
const dataDir = path.join(repoRoot, "data");
const publicDir = path.join(repoRoot, "public");
const defaultPatchPath = path.join(dataDir, "sample_test_case_utility_data_gpt_pro.json");
const defaultSampleUsersPath = path.join(dataDir, "sample_user_profiles.json");
const defaultTestCasesPath = path.join(publicDir, "sample_matching_test_cases.json");
const defaultReportPath = path.join(dataDir, "sample_test_case_utility_data_import_report.md");
const billFieldDictionaryPath = path.join(dataDir, "bill_field_dictionary.json");

const acceptedSchemaVersions = new Set(["retrofi_sample_test_case_utility_data.v1"]);
const acceptedDataStatuses = new Set(["synthetic_estimated_not_actual_bills"]);
const acceptedFileTypes = new Set(["green_button_xml", "green_button_csv", "utility_pdf", "unknown"]);
const acceptedProcessingStatuses = new Set(["uploaded", "processing", "processed", "needs_review", "failed"]);
const supportedPatchCategories = new Set(["electric", "gas", "water_sewer", "waste"]);
const annualToMonthlyChecks = [
  { annualFieldId: "annual_kwh", monthlyFieldId: "monthly_kwh", label: "electric usage" },
  { annualFieldId: "annual_electric_cost", monthlyFieldId: "total_electric_cost", label: "electric cost" },
  { annualFieldId: "annual_therms", monthlyFieldId: "monthly_therms", label: "gas usage" },
  { annualFieldId: "annual_gas_cost", monthlyFieldId: "total_gas_cost", label: "gas cost" },
  { annualFieldId: "annual_water_use", monthlyFieldId: "monthly_water_use", label: "water use" },
  { annualFieldId: "annual_water_cost", monthlyFieldId: "total_water_cost", label: "water cost" }
];
const averageCostChecks = [
  {
    usageFieldId: "annual_kwh",
    costFieldId: "annual_electric_cost",
    averageFieldId: "average_cost_per_kwh",
    label: "average electric cost"
  },
  {
    usageFieldId: "annual_therms",
    costFieldId: "annual_gas_cost",
    averageFieldId: "average_cost_per_therm",
    label: "average gas cost"
  }
];

export function parseArgs(argv) {
  const options = {
    dryRun: false,
    patchPath: defaultPatchPath,
    reportPath: defaultReportPath,
    sampleUsersPath: defaultSampleUsersPath,
    strict: false,
    testCasesPath: defaultTestCasesPath
  };
  const positional = [];

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const next = argv[index + 1];

    if (arg === "--dry-run") {
      options.dryRun = true;
      continue;
    }
    if (arg === "--strict") {
      options.strict = true;
      continue;
    }
    if (arg === "--sample-users" && next) {
      options.sampleUsersPath = resolveRepoPath(next);
      index += 1;
      continue;
    }
    if (arg === "--test-cases" && next) {
      options.testCasesPath = resolveRepoPath(next);
      index += 1;
      continue;
    }
    if (arg === "--report" && next) {
      options.reportPath = resolveRepoPath(next);
      index += 1;
      continue;
    }
    if (arg === "--help" || arg === "-h") {
      options.help = true;
      continue;
    }
    if (arg.startsWith("--")) {
      throw new Error(`Unknown argument: ${arg}`);
    }
    positional.push(arg);
  }

  if (positional.length > 0) {
    options.patchPath = resolveRepoPath(positional[0]);
  }
  if (positional.length > 1) {
    throw new Error(`Unexpected positional arguments: ${positional.slice(1).join(", ")}`);
  }

  return options;
}

export function importSampleTestCaseUtilityData(options = {}) {
  const config = {
    dryRun: options.dryRun === true,
    patchPath: options.patchPath || defaultPatchPath,
    reportPath: options.reportPath || defaultReportPath,
    sampleUsersPath: options.sampleUsersPath || defaultSampleUsersPath,
    strict: options.strict === true,
    testCasesPath: options.testCasesPath || defaultTestCasesPath
  };
  const billFieldById = readBillFieldDictionary();
  const patch = readJson(config.patchPath);
  const sampleUsers = readJson(config.sampleUsersPath);
  const testCasesPayload = readJson(config.testCasesPath);
  const testCases = Array.isArray(testCasesPayload) ? testCasesPayload : testCasesPayload.testCases || [];
  const validation = validatePatchShape(patch, { billFieldById, sampleUsers, strict: config.strict, testCases });

  if (validation.errors.length > 0) {
    const error = new Error(`Sample test-case utility data import failed with ${validation.errors.length} validation error(s).`);
    error.validation = validation;
    throw error;
  }

  const now = new Date().toISOString();
  const importsBySampleUserId = buildImportsBySampleUserId(patch, { billFieldById, now });
  const patchedSampleUsers = sampleUsers.map((sample) => patchSampleUser(sample, importsBySampleUserId.get(sample.sampleUserId)));
  const patchedTestCases = testCases.map((testCase) => patchTestCase(testCase, importsBySampleUserId.get(testCase.sampleUserId)));
  const patchedTestCasesPayload = Array.isArray(testCasesPayload)
    ? patchedTestCases
    : {
        ...testCasesPayload,
        sampleUtilityDataImportedAt: now,
        sampleUtilityDataProfileCount: importsBySampleUserId.size,
        sampleUtilityDataSchemaVersion: patch.schemaVersion,
        sampleUtilityDataSourcePath: path.relative(repoRoot, config.patchPath),
        sampleUtilityDataStatus: patch.dataStatus,
        testCases: patchedTestCases
      };
  const report = buildReport({
    config,
    importedProfiles: importsBySampleUserId,
    patch,
    sampleUsers,
    testCases,
    validation
  });

  if (!config.dryRun) {
    writeJson(config.sampleUsersPath, patchedSampleUsers);
    writeJson(config.testCasesPath, patchedTestCasesPayload);
    fs.mkdirSync(path.dirname(config.reportPath), { recursive: true });
    fs.writeFileSync(config.reportPath, report, "utf8");
  }

  return {
    dryRun: config.dryRun,
    importedProfileCount: importsBySampleUserId.size,
    missingProfileCount: validation.missingSampleUserIds.length,
    patchedSampleUserCount: patchedSampleUsers.filter((sample) => importsBySampleUserId.has(sample.sampleUserId)).length,
    patchedTestCaseCount: patchedTestCases.filter((testCase) => importsBySampleUserId.has(testCase.sampleUserId)).length,
    report,
    reportPath: config.reportPath,
    warnings: validation.warnings
  };
}

function validatePatchShape(patch, { billFieldById, sampleUsers, strict, testCases }) {
  const errors = [];
  const warnings = [];
  const sampleUserIds = new Set(sampleUsers.map((sample) => sample.sampleUserId).filter(Boolean));
  const testCaseIds = new Set(testCases.map((testCase) => testCase.sampleUserId).filter(Boolean));

  if (!patch || typeof patch !== "object" || Array.isArray(patch)) {
    return {
      errors: ["Patch must be a JSON object."],
      missingSampleUserIds: [...sampleUserIds],
      unexpectedSampleUserIds: [],
      warnings
    };
  }
  if (!acceptedSchemaVersions.has(patch.schemaVersion)) {
    errors.push(`Unsupported schemaVersion: ${patch.schemaVersion || "missing"}.`);
  }
  if (!acceptedDataStatuses.has(patch.dataStatus)) {
    errors.push(`Unsupported dataStatus: ${patch.dataStatus || "missing"}.`);
  }
  if (!Array.isArray(patch.profiles) || patch.profiles.length === 0) {
    errors.push("Patch must include a non-empty profiles array.");
    return { errors, missingSampleUserIds: [...sampleUserIds], unexpectedSampleUserIds: [], warnings };
  }

  const seen = new Set();
  for (const [profileIndex, profile] of patch.profiles.entries()) {
    const prefix = `profiles[${profileIndex}]`;
    if (!profile || typeof profile !== "object" || Array.isArray(profile)) {
      errors.push(`${prefix} must be an object.`);
      continue;
    }
    if (!profile.sampleUserId) {
      errors.push(`${prefix}.sampleUserId is required.`);
      continue;
    }
    if (seen.has(profile.sampleUserId)) {
      errors.push(`Duplicate sampleUserId in patch: ${profile.sampleUserId}.`);
    }
    seen.add(profile.sampleUserId);
    if (!sampleUserIds.has(profile.sampleUserId)) {
      errors.push(`Patch profile ${profile.sampleUserId} does not exist in sample users.`);
    }
    if (!testCaseIds.has(profile.sampleUserId)) {
      errors.push(`Patch profile ${profile.sampleUserId} does not exist in public test cases.`);
    }
    validateProfile(profile, { billFieldById, errors, prefix, warnings });
  }

  const missingSampleUserIds = [...sampleUserIds].filter((sampleUserId) => !seen.has(sampleUserId));
  const unexpectedSampleUserIds = [...seen].filter((sampleUserId) => !sampleUserIds.has(sampleUserId));
  if (strict && missingSampleUserIds.length > 0) {
    errors.push(`Patch is missing ${missingSampleUserIds.length} sample profile(s): ${missingSampleUserIds.join(", ")}.`);
  } else if (missingSampleUserIds.length > 0) {
    warnings.push(`Patch is missing ${missingSampleUserIds.length} sample profile(s); partial import will leave them unchanged.`);
  }

  return { errors, missingSampleUserIds, unexpectedSampleUserIds, warnings };
}

function validateProfile(profile, { billFieldById, errors, prefix, warnings }) {
  if (!Array.isArray(profile.uploadedUtilityFiles) || profile.uploadedUtilityFiles.length === 0) {
    errors.push(`${prefix}.uploadedUtilityFiles must be a non-empty array.`);
    return;
  }
  if (!Array.isArray(profile.utilityExtractedValues) || profile.utilityExtractedValues.length === 0) {
    errors.push(`${prefix}.utilityExtractedValues must be a non-empty array.`);
    return;
  }

  const fileIds = new Set();
  const fileCategoryById = new Map();
  for (const [fileIndex, file] of profile.uploadedUtilityFiles.entries()) {
    const filePrefix = `${prefix}.uploadedUtilityFiles[${fileIndex}]`;
    if (!file || typeof file !== "object" || Array.isArray(file)) {
      errors.push(`${filePrefix} must be an object.`);
      continue;
    }
    if (!file.fileId) errors.push(`${filePrefix}.fileId is required.`);
    if (file.fileId && fileIds.has(file.fileId)) errors.push(`${filePrefix}.fileId is duplicated: ${file.fileId}.`);
    if (file.fileId) fileIds.add(file.fileId);
    if (!acceptedFileTypes.has(file.fileType)) errors.push(`${filePrefix}.fileType is unsupported: ${file.fileType}.`);
    if (!supportedPatchCategories.has(file.utilityCategory)) {
      errors.push(`${filePrefix}.utilityCategory is unsupported: ${file.utilityCategory}.`);
    }
    if (!supportedUtilityCategories.has(file.utilityCategory)) {
      errors.push(`${filePrefix}.utilityCategory is not recognized by production utility parsing: ${file.utilityCategory}.`);
    }
    if (!acceptedProcessingStatuses.has(file.processingStatus)) {
      errors.push(`${filePrefix}.processingStatus is unsupported: ${file.processingStatus}.`);
    }
    if (file.fileId) fileCategoryById.set(file.fileId, file.utilityCategory);
  }

  for (const [valueIndex, value] of profile.utilityExtractedValues.entries()) {
    const valuePrefix = `${prefix}.utilityExtractedValues[${valueIndex}]`;
    if (!value || typeof value !== "object" || Array.isArray(value)) {
      errors.push(`${valuePrefix} must be an object.`);
      continue;
    }
    if (!value.extractedValueId) errors.push(`${valuePrefix}.extractedValueId is required.`);
    if (!value.fileId || !fileIds.has(value.fileId)) errors.push(`${valuePrefix}.fileId does not reference an uploaded utility file.`);
    const field = billFieldById.get(value.fieldId);
    if (!field) {
      errors.push(`${valuePrefix}.fieldId is not in data/bill_field_dictionary.json: ${value.fieldId}.`);
      continue;
    }
    const fileCategory = fileCategoryById.get(value.fileId);
    if (fileCategory && field.bill_type !== fileCategory) {
      errors.push(`${valuePrefix}.fieldId ${value.fieldId} belongs to ${field.bill_type}, not file category ${fileCategory}.`);
    }
    if (value.sourceType && !acceptedFileTypes.has(value.sourceType)) {
      errors.push(`${valuePrefix}.sourceType is unsupported: ${value.sourceType}.`);
    }
    if (value.periodStart && !isDateOnly(value.periodStart)) warnings.push(`${valuePrefix}.periodStart is not YYYY-MM-DD.`);
    if (value.periodEnd && !isDateOnly(value.periodEnd)) warnings.push(`${valuePrefix}.periodEnd is not YYYY-MM-DD.`);
  }

  validateAnnualMonthlyConsistency(profile, { billFieldById, errors, prefix, warnings });
}

function validateAnnualMonthlyConsistency(profile, { billFieldById, errors, prefix, warnings }) {
  const values = profile.utilityExtractedValues || [];
  for (const check of annualToMonthlyChecks) {
    const annualValue = latestNumericField(values, check.annualFieldId);
    const monthlyValues = numericFields(values, check.monthlyFieldId);
    if (annualValue == null || monthlyValues.length === 0) continue;
    const monthlySum = sum(monthlyValues);
    const relativeDiff = relativeDifference(annualValue, monthlySum);
    if (relativeDiff > 0.02) {
      errors.push(
        `${prefix} ${check.label} annual/monthly mismatch: ${check.annualFieldId}=${annualValue}, sum(${check.monthlyFieldId})=${round(monthlySum)}.`
      );
    }
  }

  for (const check of averageCostChecks) {
    const usage = latestNumericField(values, check.usageFieldId);
    const cost = latestNumericField(values, check.costFieldId);
    const average = latestNumericField(values, check.averageFieldId);
    if (usage == null || usage === 0 || cost == null || average == null) continue;
    const expected = cost / usage;
    const relativeDiff = relativeDifference(average, expected);
    if (relativeDiff > 0.02) {
      errors.push(
        `${prefix} ${check.label} mismatch: ${check.averageFieldId}=${average}, ${check.costFieldId}/${check.usageFieldId}=${round(expected, 6)}.`
      );
    }
  }

  const electricFileCount = (profile.uploadedUtilityFiles || []).filter((file) => file.utilityCategory === "electric").length;
  if (electricFileCount === 0) warnings.push(`${prefix} has no electric uploadedUtilityFiles row.`);
  const utilityProviderField = values.find((value) => value.fieldId === "utility_provider");
  if (!utilityProviderField) warnings.push(`${prefix} has no utility_provider extracted value.`);

  for (const value of values) {
    const field = billFieldById.get(value.fieldId);
    if (!field || !isNumericField(field)) continue;
    if (parseNumeric(value.value) == null) {
      errors.push(`${prefix} numeric field ${value.fieldId} has a non-numeric value: ${JSON.stringify(value.value)}.`);
    }
  }
}

function buildImportsBySampleUserId(patch, { billFieldById, now }) {
  const importsById = new Map();
  for (const profile of patch.profiles || []) {
    const uploadedUtilityFiles = normalizeUploadedUtilityFiles(profile.uploadedUtilityFiles || []);
    const utilityExtractedValues = normalizeUtilityExtractedValues(profile.utilityExtractedValues || [], { billFieldById });
    const siteId = uploadedUtilityFiles[0]?.siteId || `intake_sample_${profile.sampleUserId}:primary_site`;
    const siteEnergyProfile = buildSiteEnergyProfile({
      siteId,
      uploadedUtilityFiles,
      utilityExtractedValues
    });
    importsById.set(profile.sampleUserId, {
      confidence: profile.confidence || "medium",
      modelingNotes: Array.isArray(profile.modelingNotes) ? profile.modelingNotes : [],
      siteEnergyProfile,
      sourceUrlsChecked: normalizeStringArray(profile.sourceUrlsChecked),
      syntheticUtilityDataNotice:
        profile.syntheticUtilityDataNotice || "Synthetic estimated utility profile for test fixtures; not an actual bill.",
      uploadedUtilityFiles,
      utilityDataGeneratedAt: patch.generatedAt || now,
      utilityDataImportedAt: now,
      utilityDataSchemaVersion: patch.schemaVersion,
      utilityDataStatus: patch.dataStatus,
      utilityExtractedValues
    });
  }
  return importsById;
}

function patchSampleUser(sample, imported) {
  if (!imported) return sample;
  return {
    ...sample,
    siteEnergyProfile: imported.siteEnergyProfile,
    syntheticUtilityDataNotice: imported.syntheticUtilityDataNotice,
    uploadedUtilityFiles: imported.uploadedUtilityFiles,
    utilityDataConfidence: imported.confidence,
    utilityDataGeneratedAt: imported.utilityDataGeneratedAt,
    utilityDataImportedAt: imported.utilityDataImportedAt,
    utilityDataModelingNotes: imported.modelingNotes,
    utilityDataSchemaVersion: imported.utilityDataSchemaVersion,
    utilityDataSourceUrlsChecked: imported.sourceUrlsChecked,
    utilityDataStatus: imported.utilityDataStatus,
    utilityExtractedValues: imported.utilityExtractedValues
  };
}

function patchTestCase(testCase, imported) {
  if (!imported) return testCase;
  const sourceForm = testCase.sourceForm && typeof testCase.sourceForm === "object" ? testCase.sourceForm : {};
  return {
    ...testCase,
    sourceForm: patchSampleUser(sourceForm, imported),
    siteEnergyProfile: imported.siteEnergyProfile,
    syntheticUtilityDataNotice: imported.syntheticUtilityDataNotice,
    uploadedUtilityFiles: imported.uploadedUtilityFiles,
    utilityDataConfidence: imported.confidence,
    utilityDataGeneratedAt: imported.utilityDataGeneratedAt,
    utilityDataImportedAt: imported.utilityDataImportedAt,
    utilityDataModelingNotes: imported.modelingNotes,
    utilityDataSchemaVersion: imported.utilityDataSchemaVersion,
    utilityDataSourceUrlsChecked: imported.sourceUrlsChecked,
    utilityDataStatus: imported.utilityDataStatus,
    utilityExtractedValues: imported.utilityExtractedValues
  };
}

function normalizeUploadedUtilityFiles(files) {
  return files.map((file) => ({
    fileId: cleanText(file.fileId),
    clientIntakeId: cleanText(file.clientIntakeId),
    siteId: cleanText(file.siteId),
    originalFilename: cleanText(file.originalFilename),
    fileType: acceptedFileTypes.has(cleanText(file.fileType)) ? cleanText(file.fileType) : "unknown",
    utilityCategory: supportedPatchCategories.has(cleanText(file.utilityCategory)) ? cleanText(file.utilityCategory) : "unknown",
    utilityProvider: cleanOptional(file.utilityProvider),
    s3Key: cleanText(file.s3Key),
    processingStatus: acceptedProcessingStatuses.has(cleanText(file.processingStatus)) ? cleanText(file.processingStatus) : "processed",
    uploadedAt: cleanText(file.uploadedAt),
    processedAt: cleanOptional(file.processedAt),
    errorMessage: cleanOptional(file.errorMessage)
  }));
}

function normalizeUtilityExtractedValues(values, { billFieldById }) {
  return values.map((value) => {
    const field = billFieldById.get(value.fieldId);
    return {
      extractedValueId: cleanText(value.extractedValueId),
      clientIntakeId: cleanText(value.clientIntakeId),
      fileId: cleanText(value.fileId),
      fieldId: cleanText(value.fieldId),
      fieldDisplayName: field?.display_name || cleanOptional(value.fieldDisplayName),
      value: normalizeFieldValue(value.value, field),
      unit: field?.unit || cleanOptional(value.unit),
      periodStart: cleanOptional(value.periodStart),
      periodEnd: cleanOptional(value.periodEnd),
      confidence: cleanOptional(value.confidence) || "medium",
      sourceType: acceptedFileTypes.has(cleanText(value.sourceType)) ? cleanText(value.sourceType) : "unknown",
      sourceText: cleanOptional(value.sourceText),
      sourcePath: cleanOptional(value.sourcePath)
    };
  });
}

function normalizeFieldValue(value, field) {
  if (!field) return value ?? null;
  if (field.unit === "boolean") return value === true || String(value).toLowerCase() === "true";
  if (isNumericField(field)) return parseNumeric(value);
  if (value == null) return null;
  return typeof value === "string" ? value.trim() : value;
}

function buildReport({ config, importedProfiles, patch, sampleUsers, testCases, validation }) {
  const importedIds = [...importedProfiles.keys()].sort();
  const lines = [
    "# Sample Test Case Utility Data Import Report",
    "",
    `Generated: ${new Date().toISOString()}`,
    `Patch: \`${path.relative(repoRoot, config.patchPath)}\``,
    `Sample users: \`${path.relative(repoRoot, config.sampleUsersPath)}\``,
    `Public test cases: \`${path.relative(repoRoot, config.testCasesPath)}\``,
    `Dry run: ${config.dryRun ? "yes" : "no"}`,
    "",
    "## Summary",
    "",
    `- Patch schema: ${patch.schemaVersion || "missing"}`,
    `- Patch data status: ${patch.dataStatus || "missing"}`,
    `- Imported profiles: ${importedProfiles.size}`,
    `- Sample user fixtures available: ${sampleUsers.length}`,
    `- Public test cases available: ${testCases.length}`,
    `- Missing sample users from patch: ${validation.missingSampleUserIds.length}`,
    `- Validation warnings: ${validation.warnings.length}`,
    "",
    "## Imported Profiles",
    "",
    ...(importedIds.length > 0 ? importedIds.map((sampleUserId) => `- ${sampleUserId}`) : ["- None"]),
    "",
    "## Missing Profiles",
    "",
    ...(validation.missingSampleUserIds.length > 0
      ? validation.missingSampleUserIds.map((sampleUserId) => `- ${sampleUserId}`)
      : ["- None"]),
    "",
    "## Warnings",
    "",
    ...(validation.warnings.length > 0 ? validation.warnings.map((warning) => `- ${warning}`) : ["- None"]),
    ""
  ];
  return `${lines.join("\n")}\n`;
}

function readBillFieldDictionary() {
  const fields = readJson(billFieldDictionaryPath);
  return new Map(fields.map((field) => [field.id, field]));
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function resolveRepoPath(value) {
  return path.resolve(repoRoot, value);
}

function cleanText(value) {
  return typeof value === "string" ? value.trim() : value == null ? "" : String(value).trim();
}

function cleanOptional(value) {
  const text = cleanText(value);
  return text || null;
}

function normalizeStringArray(value) {
  return Array.isArray(value) ? value.map(cleanText).filter(Boolean) : [];
}

function isDateOnly(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(String(value || ""));
}

function isNumericField(field) {
  if (!field) return false;
  if (["boolean", "date", "masked text", "structured rate periods", "text"].includes(field.unit)) return false;
  return true;
}

function parseNumeric(value) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  const parsed = Number(String(value ?? "").replace(/[$,%\s,]+/g, ""));
  return Number.isFinite(parsed) ? parsed : null;
}

function latestNumericField(values, fieldId) {
  const candidates = values
    .filter((value) => value.fieldId === fieldId)
    .sort((left, right) => String(left.periodEnd || "").localeCompare(String(right.periodEnd || "")))
    .map((value) => parseNumeric(value.value))
    .filter((value) => value != null);
  return candidates.at(-1) ?? null;
}

function numericFields(values, fieldId) {
  return values
    .filter((value) => value.fieldId === fieldId)
    .map((value) => parseNumeric(value.value))
    .filter((value) => value != null);
}

function sum(values) {
  return values.reduce((total, value) => total + value, 0);
}

function relativeDifference(left, right) {
  if (left === right) return 0;
  const denominator = Math.max(Math.abs(left), Math.abs(right), 1);
  return Math.abs(left - right) / denominator;
}

function round(value, precision = 2) {
  const multiplier = 10 ** precision;
  return Math.round(value * multiplier) / multiplier;
}

function printHelp() {
  console.log(`Usage: node scripts/import-sample-test-case-utility-data.mjs [patch.json] [options]

Options:
  --dry-run
  --strict
  --sample-users data/sample_user_profiles.json
  --test-cases public/sample_matching_test_cases.json
  --report data/sample_test_case_utility_data_import_report.md
`);
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    printHelp();
    return;
  }
  const result = importSampleTestCaseUtilityData(options);
  console.log("Sample test-case utility data import complete.");
  console.log(`Imported profiles: ${result.importedProfileCount}`);
  console.log(`Missing profiles: ${result.missingProfileCount}`);
  console.log(`Patched sample users: ${result.patchedSampleUserCount}`);
  console.log(`Patched public test cases: ${result.patchedTestCaseCount}`);
  console.log(`Warnings: ${result.warnings.length}`);
  console.log(`Report: ${options.dryRun ? "not written in dry-run" : result.reportPath}`);
}

if (process.argv[1] === scriptPath) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    if (error?.validation?.errors?.length) {
      for (const validationError of error.validation.errors.slice(0, 20)) {
        console.error(`- ${validationError}`);
      }
      if (error.validation.errors.length > 20) {
        console.error(`... ${error.validation.errors.length - 20} more error(s)`);
      }
    }
    process.exitCode = 1;
  });
}
