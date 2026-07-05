import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { validateIncentiveCalculationPackageV2 } from "../apps/api/server/savings/incentiveCalculationsV2.mjs";

const scriptPath = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(scriptPath), "..");
const defaultDate = "2026-07-03";

const expectedTaxSchemas = new Map([
  ["output_001_national_tax_dataset_source_catalog.md", "retrofi_official_tax_dataset_source_catalog.v1"],
  ["output_002_sales_use_tax_rate_boundary_rules.md", "retrofi_sales_use_tax_rule_research.v1"],
  ["output_003_property_tax_assessor_boundary_rules.md", "retrofi_property_tax_dataset_rule_research.v1"],
  ["output_004_business_tax_income_franchise_gross_receipts_rules.md", "retrofi_business_tax_rule_research.v1"],
  ["output_005_current_retrofi_tax_rule_repairs.md", "retrofi_current_tax_rule_repairs.v1"],
  ["output_006_tax_rule_import_validation_refresh_plan.md", "retrofi_tax_dataset_import_validation_refresh_plan.v1"]
]);

const opportunityStateRepairs = new Map([
  ["SOURCE_DSIRE:dsire_program_id:381", "WA"],
  ["SOURCE_DSIRE:dsire_program_id:22798", "RI"],
  ["SOURCE_DSIRE:dsire_program_id:3216", "MI"]
]);

const taxEffectTypeByOpportunityId = new Map([
  ["SOURCE_DSIRE:dsire_program_id:381", "tax_rate_preference"],
  ["SOURCE_DSIRE:dsire_program_id:22798", "property_tax_valuation"],
  ["SOURCE_DSIRE:dsire_program_id:3216", "tax_exemption"]
]);

const options = parseArgs(process.argv.slice(2));
const date = options.date || defaultDate;
const taxDatasetDir = path.resolve(options.taxDatasetDir || path.join(repoRoot, "GPT Pro Work", `tax-official-dataset-rule-research-${date}`));
const testCaseDir = path.resolve(options.testCaseDir || path.join(repoRoot, "GPT Pro Work", `test-case-tax-document-updates-${date}`));
const taxOfficialArtifactPath = path.resolve(options.taxOfficialArtifactPath || path.join(repoRoot, "data", `tax_official_dataset_rule_research_gpt_pro_${date}.json`));
const testTaxDocumentArtifactPath = path.resolve(options.testTaxDocumentArtifactPath || path.join(repoRoot, "data", `test_case_tax_document_updates_gpt_pro_${date}.json`));
const taxGeographyRulesPath = path.resolve(options.taxGeographyRulesPath || path.join(repoRoot, "data", "tax_geography_rules.json"));
const packagesPath = path.resolve(options.packagesPath || path.join(repoRoot, "data", "opportunity_incentive_calculation_packages_v2.json"));
const sampleUsersPath = path.resolve(options.sampleUsersPath || path.join(repoRoot, "data", "sample_user_profiles.json"));
const testCasesPath = path.resolve(options.testCasesPath || path.join(repoRoot, "public", "sample_matching_test_cases.json"));
const reportPath = path.resolve(options.reportPath || path.join(repoRoot, "data", `tax_dataset_and_test_doc_intake_report_${date}.md`));

if (options.help) {
  printHelp();
  process.exit(0);
}

const now = new Date().toISOString();
const warnings = [];

const taxOutputs = readTaxOutputs();
const testOutputs = readTestCaseOutputs();
const taxOfficialArtifact = buildTaxOfficialArtifact(taxOutputs);
const testTaxDocumentArtifact = buildTestTaxDocumentArtifact(testOutputs);

const taxGeographyRules = readJson(taxGeographyRulesPath);
const taxRuleApplyResult = applyTaxRuleRepairs(taxGeographyRules, currentRuleRepairOutput(taxOutputs));

const packagesArtifact = readJson(packagesPath);
const packageApplyResult = applyPackageTaxRepairs(packagesArtifact, currentRuleRepairOutput(taxOutputs));
const packageValidation = validatePackages(packagesArtifact.packages || []);
if (packageValidation.invalidCount > 0) {
  throw new Error(`Tax package repair generated invalid packages: ${JSON.stringify(packageValidation.invalidSamples, null, 2)}`);
}

const sampleUsers = readJson(sampleUsersPath);
const testCasesPayload = readJson(testCasesPath);
const sampleApplyResult = applySyntheticTaxDocumentsToSamples({ sampleUsers, testCasesPayload, testTaxDocumentArtifact });

if (!options.dryRun) {
  writeJson(taxOfficialArtifactPath, taxOfficialArtifact);
  writeJson(testTaxDocumentArtifactPath, testTaxDocumentArtifact);
  writeJson(taxGeographyRulesPath, taxGeographyRules);
  writeJson(packagesPath, packagesArtifact);
  writeJson(sampleUsersPath, sampleApplyResult.sampleUsers);
  writeJson(testCasesPath, sampleApplyResult.testCasesPayload);
  fs.writeFileSync(
    reportPath,
    buildReport({
      taxOfficialArtifact,
      testTaxDocumentArtifact,
      taxRuleApplyResult,
      packageApplyResult,
      packageValidation,
      sampleApplyResult,
      warnings
    }),
    "utf8"
  );
}

console.log("Intook tax dataset/rule and test tax-document GPT Pro outputs.");
console.log(`Official tax outputs: ${taxOfficialArtifact.sourceFiles.length}`);
console.log(`Current tax rule repairs applied: ${taxRuleApplyResult.appliedCount}`);
console.log(`Tax package repairs applied: ${packageApplyResult.appliedCount}`);
console.log(`Synthetic test tax profiles: ${testTaxDocumentArtifact.profileCount}`);
console.log(`Sample profiles patched: ${sampleApplyResult.patchedSampleUserCount}`);
console.log(`Public test cases patched: ${sampleApplyResult.patchedTestCaseCount}`);
console.log(`Warnings: ${warnings.length + taxRuleApplyResult.warnings.length + packageApplyResult.warnings.length + sampleApplyResult.warnings.length}`);
console.log(`Official tax artifact: ${path.relative(repoRoot, taxOfficialArtifactPath)}`);
console.log(`Test tax-document artifact: ${path.relative(repoRoot, testTaxDocumentArtifactPath)}`);
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
  console.log(`Usage: node scripts/intake-tax-dataset-and-test-doc-outputs.mjs [--date ${defaultDate}] [--dryRun]`);
}

function readTaxOutputs() {
  const outputs = [];
  for (const [fileName, schemaVersion] of expectedTaxSchemas.entries()) {
    const parsed = parseOutputFile(path.join(taxDatasetDir, fileName), fileName);
    if (parsed.object.schemaVersion !== schemaVersion) {
      throw new Error(`${fileName} has schemaVersion ${parsed.object.schemaVersion}; expected ${schemaVersion}.`);
    }
    if (parsed.trailingTextLength > 0) {
      warnings.push(`${fileName} contains trailing text after the first JSON object; ignored trailing text.`);
    }
    outputs.push(parsed);
  }
  return outputs;
}

function readTestCaseOutputs() {
  const files = fs.readdirSync(testCaseDir).filter((fileName) => /^output_\d+_.*\.md$/.test(fileName)).sort();
  if (files.length !== 5) warnings.push(`Expected 5 test-case tax-document outputs, found ${files.length}.`);
  return files.map((fileName) => {
    const parsed = parseOutputFile(path.join(testCaseDir, fileName), fileName);
    if (parsed.object.schemaVersion !== "retrofi_test_case_tax_document_updates.v1") {
      throw new Error(`${fileName} has schemaVersion ${parsed.object.schemaVersion}; expected retrofi_test_case_tax_document_updates.v1.`);
    }
    if ((parsed.object.profileTaxDocumentUpdates || []).length !== 10) {
      warnings.push(`${fileName} has ${(parsed.object.profileTaxDocumentUpdates || []).length} profileTaxDocumentUpdates; expected 10.`);
    }
    return parsed;
  });
}

function parseOutputFile(filePath, fileName) {
  const raw = fs.readFileSync(filePath, "utf8");
  const extracted = extractFirstJsonObject(raw);
  return {
    fileName,
    object: JSON.parse(extracted.json),
    trailingTextLength: extracted.trailing.length
  };
}

function extractFirstJsonObject(raw) {
  const cleaned = raw.trim().replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/i, "").trim();
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

function buildTaxOfficialArtifact(outputs) {
  const byFile = Object.fromEntries(outputs.map((output) => [output.fileName, normalizeUrlsDeep(output.object)]));
  const currentRepairs = byFile["output_005_current_retrofi_tax_rule_repairs.md"];
  return {
    schemaVersion: "retrofi_tax_official_dataset_rule_research_gpt_pro.v1",
    generatedAt: now,
    sourceWorkDir: path.relative(repoRoot, taxDatasetDir),
    sourceFiles: outputs.map((output) => output.fileName),
    counts: {
      datasetFamilyCount: byFile["output_001_national_tax_dataset_source_catalog.md"].datasetFamilies?.length || 0,
      salesUseStateRuleCount: byFile["output_002_sales_use_tax_rate_boundary_rules.md"].stateRules?.length || 0,
      propertyTaxStateRuleCount: byFile["output_003_property_tax_assessor_boundary_rules.md"].statePropertyTaxData?.length || 0,
      businessTaxStateRuleCount: byFile["output_004_business_tax_income_franchise_gross_receipts_rules.md"].stateBusinessTaxRules?.length || 0,
      currentRuleRepairCount: currentRepairs.repairs?.length || 0,
      recommendedDatabaseTableCount: byFile["output_006_tax_rule_import_validation_refresh_plan.md"].recommendedDatabaseTables?.length || 0
    },
    outputs: {
      nationalTaxDatasetSourceCatalog: byFile["output_001_national_tax_dataset_source_catalog.md"],
      salesUseTaxRateBoundaryRules: byFile["output_002_sales_use_tax_rate_boundary_rules.md"],
      propertyTaxAssessorBoundaryRules: byFile["output_003_property_tax_assessor_boundary_rules.md"],
      businessTaxIncomeFranchiseGrossReceiptsRules: byFile["output_004_business_tax_income_franchise_gross_receipts_rules.md"],
      currentRetrofiTaxRuleRepairs: currentRepairs,
      taxRuleImportValidationRefreshPlan: byFile["output_006_tax_rule_import_validation_refresh_plan.md"]
    },
    validationWarnings: warnings.filter((warning) => warning.includes("output_00"))
  };
}

function buildTestTaxDocumentArtifact(outputs) {
  const profileUpdates = [];
  const globalWarnings = [];
  for (const output of outputs) {
    globalWarnings.push(...(output.object.globalWarnings || []).map((warning) => `${output.fileName}: ${warning}`));
    for (const update of output.object.profileTaxDocumentUpdates || []) {
      profileUpdates.push(normalizeUrlsDeep({
        ...update,
        sourceFile: output.fileName,
        sourceWorkDir: path.relative(repoRoot, testCaseDir)
      }));
    }
  }

  const seenProfiles = new Set();
  const duplicateProfiles = [];
  for (const update of profileUpdates) {
    if (seenProfiles.has(update.sampleUserId)) duplicateProfiles.push(update.sampleUserId);
    seenProfiles.add(update.sampleUserId);
    validateTaxProfileUpdate(update);
  }
  if (duplicateProfiles.length > 0) warnings.push(`Duplicate test tax-document profile updates: ${duplicateProfiles.join(", ")}.`);

  return {
    schemaVersion: "retrofi_test_case_tax_document_updates_gpt_pro.v1",
    generatedAt: now,
    sourceWorkDir: path.relative(repoRoot, testCaseDir),
    sourceFiles: outputs.map((output) => output.fileName),
    profileCount: profileUpdates.length,
    counts: {
      syntheticTaxFileCount: sum(profileUpdates, (profile) => profile.syntheticTaxFiles?.length || 0),
      syntheticTaxExtractedValueCount: sum(profileUpdates, (profile) => profile.syntheticTaxExtractedValues?.length || 0),
      taxProfileFactCount: sum(profileUpdates, (profile) => profile.taxProfileFacts?.length || 0),
      opportunitySpecificTaxInputCount: sum(profileUpdates, (profile) => profile.opportunitySpecificTaxInputs?.length || 0),
      missingOrReviewInputCount: sum(profileUpdates, (profile) => profile.missingOrReviewInputs?.length || 0),
      documentTypeCounts: countBy(profileUpdates.flatMap((profile) => profile.syntheticTaxFiles || []), (file) => file.taxDocumentType || "unknown"),
      profileStateCounts: countBy(profileUpdates, (profile) => profile.profileSummary?.state || "unknown")
    },
    profileTaxDocumentUpdates: profileUpdates,
    globalWarnings,
    validationWarnings: warnings.filter((warning) => warning.includes("synthetic tax") || warning.includes("tax-document") || warning.includes("profile updates"))
  };
}

function validateTaxProfileUpdate(update) {
  if (!update.sampleUserId) throw new Error("A profileTaxDocumentUpdates row is missing sampleUserId.");
  const fileIds = new Set((update.syntheticTaxFiles || []).map((file) => file.fileId).filter(Boolean));
  if (fileIds.size !== (update.syntheticTaxFiles || []).length) {
    warnings.push(`${update.sampleUserId} has duplicate or missing synthetic tax file IDs.`);
  }
  for (const value of update.syntheticTaxExtractedValues || []) {
    if (value.sourceType !== "synthetic_tax_document") {
      warnings.push(`${update.sampleUserId} extracted value ${value.extractedValueId || value.fieldId} is not marked synthetic_tax_document.`);
    }
    if (value.fileId && !fileIds.has(value.fileId)) {
      warnings.push(`${update.sampleUserId} extracted value references missing tax file ${value.fileId}.`);
    }
  }
  for (const fact of [...(update.taxProfileFacts || []), ...(update.opportunitySpecificTaxInputs || [])]) {
    if (fact.sourceFileId && !fileIds.has(fact.sourceFileId)) {
      warnings.push(`${update.sampleUserId} tax fact ${fact.inputKey} references missing tax file ${fact.sourceFileId}.`);
    }
  }
}

function currentRuleRepairOutput(outputs) {
  return outputs.find((output) => output.fileName === "output_005_current_retrofi_tax_rule_repairs.md").object;
}

function applyTaxRuleRepairs(taxGeographyRules, repairOutput) {
  const rules = taxGeographyRules.rules || [];
  const warnings = [];
  let appliedCount = 0;
  for (const repair of repairOutput.repairs || []) {
    const index = rules.findIndex((rule) => rule.id === repair.ruleId || (rule.opportunityIds || []).includes(repair.opportunityId));
    if (index < 0) {
      warnings.push(`Missing existing tax geography rule for ${repair.ruleId || repair.opportunityId}.`);
      continue;
    }
    const existing = rules[index];
    const normalizedRepair = normalizeUrlsDeep(repair);
    rules[index] = {
      ...existing,
      version: Number(existing.version || 0) + 1,
      active: true,
      taxType: normalizedRepair.taxType || existing.taxType,
      ruleKind: normalizedRepair.ruleKind || existing.ruleKind,
      geography: normalizedRepair.geography || existing.geography,
      opportunityIds: uniqueStrings([...(existing.opportunityIds || []), normalizedRepair.opportunityId]),
      effectiveStartDate: normalizedRepair.effectiveStartDate ?? existing.effectiveStartDate ?? null,
      effectiveEndDate: normalizedRepair.effectiveEndDate ?? existing.effectiveEndDate ?? null,
      sourceConfidence: normalizedRepair.sourceConfidence || existing.sourceConfidence || null,
      localityMatters: normalizedRepair.localityMatters,
      localityExplanation: normalizedRepair.localityExplanation || existing.localityExplanation || "",
      derivedInputs: normalizeInputRows(normalizedRepair.derivedInputs || []),
      requiredUserInputs: normalizeInputRows(normalizedRepair.requiredUserInputs || []),
      requiresUserOrProfessionalInputs: normalizeInputRows(normalizedRepair.requiredUserInputs || []).map((input) => input.inputKey),
      serverDerivableInputs: normalizeInputRows(normalizedRepair.serverDerivableInputs || []),
      calculationImpact: normalizedRepair.calculationImpact || existing.calculationImpact || null,
      sourceUrls: normalizedRepair.sourceUrls || normalizedRepair.sourceUrlsChecked || existing.sourceUrls || [],
      evidenceText: normalizedRepair.evidenceText || existing.evidenceText || "",
      humanReviewRequired: normalizedRepair.humanReviewRequired === true,
      humanReviewReasons: uniqueStrings(normalizedRepair.humanReviewReasons || existing.humanReviewReasons || []),
      inputAliases: inputAliasesForRepair(normalizedRepair),
      lastGptProRepairAppliedAt: now,
      lastGptProRepairSource: path.relative(repoRoot, taxOfficialArtifactPath)
    };
    appliedCount += 1;
  }

  taxGeographyRules.updatedAt = now;
  taxGeographyRules.sourceArtifact = path.relative(repoRoot, taxOfficialArtifactPath);
  taxGeographyRules.latestResearchArtifact = path.relative(repoRoot, taxOfficialArtifactPath);
  taxGeographyRules.ruleRepairCount = appliedCount;

  return { appliedCount, warnings };
}

function inputAliasesForRepair(repair) {
  if (repair.opportunityId === "SOURCE_DSIRE:dsire_program_id:22798") {
    return [
      {
        aliasInputKey: "ac_kw_capacity",
        canonicalInputKey: "ac_nameplate_capacity_kw",
        reason: "Existing v2 packages used ac_kw_capacity; refreshed RI property-tax research uses AC nameplate capacity."
      }
    ];
  }
  return [];
}

function applyPackageTaxRepairs(packagesArtifact, repairOutput) {
  const packages = packagesArtifact.packages || [];
  const packageById = new Map(packages.map((pkg) => [pkg.opportunity_id, pkg]));
  const repairByOpportunityId = new Map((repairOutput.repairs || []).map((repair) => [repair.opportunityId, normalizeUrlsDeep(repair)]));
  const warnings = [];
  let appliedCount = 0;

  for (const [opportunityId, repair] of repairByOpportunityId.entries()) {
    const pkg = packageById.get(opportunityId);
    if (!pkg) {
      warnings.push(`Missing v2 package for ${opportunityId}.`);
      continue;
    }

    const state = opportunityStateRepairs.get(opportunityId);
    pkg.geography = {
      ...(pkg.geography || {}),
      country: pkg.geography?.country || "US",
      states: state ? [state] : pkg.geography?.states || [],
      counties: pkg.geography?.counties || [],
      cities: pkg.geography?.cities || [],
      utility_territory_required: Boolean(pkg.geography?.utility_territory_required)
    };

    const effect = (pkg.effects || [])[0];
    if (effect) {
      const effectType = taxEffectTypeByOpportunityId.get(opportunityId);
      if (effectType) {
        effect.effect_type = effectType;
        effect.cash_flow_direction = "benefit";
      }
      effect.required_inputs = inputRequirementsFromRuleInputs(repair.requiredUserInputs || [], effect.effect_id);
      effect.calculation = {
        ...(effect.calculation || {}),
        display_recommendation: {
          ...(effect.calculation?.display_recommendation || {}),
          estimate_status: repair.calculationImpact?.recommendedEstimateStatus || effect.calculation?.display_recommendation?.estimate_status || null
        },
        tax_geography_rule_repair_status: repair.calculationImpact?.recommendedEstimateStatus || null
      };
      if (opportunityId === "SOURCE_DSIRE:dsire_program_id:22798") {
        effect.calculation.input_aliases = inputAliasesForRepair(repair);
      }
      effect.repair_metadata = {
        ...(effect.repair_metadata || {}),
        human_review_required: repair.humanReviewRequired === true,
        human_review_reasons: uniqueStrings([
          ...(effect.repair_metadata?.human_review_reasons || []),
          ...(repair.humanReviewReasons || []),
          repair.calculationImpact?.recommendedEstimateStatus,
          "TAX_OR_ASSESSOR_REVIEW_REQUIRED"
        ]),
        tax_geography_repair: {
          source_file: "output_005_current_retrofi_tax_rule_repairs.md",
          source_confidence: repair.sourceConfidence || null,
          recommended_action: repair.recommendedAction || null,
          recommended_estimate_status: repair.calculationImpact?.recommendedEstimateStatus || null,
          source_urls: repair.sourceUrls || [],
          evidence_text: repair.evidenceText || ""
        },
        tax_benefit_classification: effect.repair_metadata?.tax_benefit_classification || taxBenefitClassificationForRepair(repair),
        cash_value_classification: effect.repair_metadata?.cash_value_classification || cashValueClassificationForRepair(repair)
      };
    }

    pkg.input_requirements = effect?.required_inputs || pkg.input_requirements || [];
    pkg.taxGeographyRuleRepairAppliedAt = now;
    pkg.taxGeographyRuleRepairArtifact = path.relative(repoRoot, taxOfficialArtifactPath);
    pkg.migration_metadata = {
      ...(pkg.migration_metadata || {}),
      tax_geography_rule_repair_applied_at: now,
      tax_geography_rule_repair_artifact: path.relative(repoRoot, taxOfficialArtifactPath)
    };
    pkg.source_evidence = uniqueBy([
      ...(pkg.source_evidence || []),
      {
        evidence_id: `tax_geography_repair_${shortHash(opportunityId)}`,
        source_type: "gpt_pro_tax_rule_repair",
        quote: repair.evidenceText || "",
        source_urls: repair.sourceUrls || [],
        evidence_confidence: confidenceNumber(repair.sourceConfidence)
      }
    ], (item) => item.evidence_id);
    appliedCount += 1;
  }

  packagesArtifact.generatedAt = now;
  packagesArtifact.taxOfficialDatasetRuleResearchArtifact = path.relative(repoRoot, taxOfficialArtifactPath);
  packagesArtifact.taxGeographyRuleRepairAppliedAt = now;
  packagesArtifact.taxGeographyRuleRepairCount = appliedCount;
  packagesArtifact.statusCounts = countBy(packages, (pkg) => pkg.calculation_status || "unknown");
  return { appliedCount, warnings };
}

function inputRequirementsFromRuleInputs(inputs, effectId) {
  return normalizeInputRows(inputs).map((input) => ({
    input_key: input.inputKey,
    label: input.label || labelFromInputKey(input.inputKey),
    value_type: normalizeValueType(input.valueType || input.answerType),
    required_for: [effectId],
    source_precedence: sourcePrecedence(input),
    missing_severity: input.required === false ? "optional" : "blocks_calculation",
    ui_placement: input.uiPlacement || "tax_profile",
    user_override_allowed: input.userOverrideAllowed !== false,
    reason: input.reason || null
  }));
}

function taxBenefitClassificationForRepair(repair) {
  if (repair.opportunityId === "SOURCE_DSIRE:dsire_program_id:381") return "tax_rate_preference";
  if (repair.opportunityId === "SOURCE_DSIRE:dsire_program_id:22798") return "property_tax_valuation";
  if (repair.opportunityId === "SOURCE_DSIRE:dsire_program_id:3216") return "tax_abatement";
  return repair.taxType || null;
}

function cashValueClassificationForRepair(repair) {
  if (repair.opportunityId === "SOURCE_DSIRE:dsire_program_id:381") return "tax_rate_preference";
  if (repair.opportunityId === "SOURCE_DSIRE:dsire_program_id:22798") return "process_value";
  if (repair.opportunityId === "SOURCE_DSIRE:dsire_program_id:3216") return "tax_exemption";
  return "unknown";
}

function applySyntheticTaxDocumentsToSamples({ sampleUsers, testCasesPayload, testTaxDocumentArtifact }) {
  const updatesBySampleId = new Map(testTaxDocumentArtifact.profileTaxDocumentUpdates.map((update) => [update.sampleUserId, update]));
  const sampleIds = new Set(sampleUsers.map((sample) => sample.sampleUserId).filter(Boolean));
  const testCases = Array.isArray(testCasesPayload) ? testCasesPayload : testCasesPayload.testCases || [];
  const testCaseIds = new Set(testCases.map((testCase) => testCase.sampleUserId).filter(Boolean));
  const warnings = [];

  for (const sampleUserId of updatesBySampleId.keys()) {
    if (!sampleIds.has(sampleUserId)) warnings.push(`Tax document update has no sample user: ${sampleUserId}.`);
    if (!testCaseIds.has(sampleUserId)) warnings.push(`Tax document update has no public test case: ${sampleUserId}.`);
  }

  const patchedSampleUsers = sampleUsers.map((sample) => {
    const update = updatesBySampleId.get(sample.sampleUserId);
    if (!update) return sample;
    return {
      ...sample,
      siteTaxProfile: buildSiteTaxProfile(update),
      uploadedTaxFiles: update.syntheticTaxFiles || [],
      taxExtractedValues: update.syntheticTaxExtractedValues || [],
      taxProfileFacts: update.taxProfileFacts || [],
      taxOpportunitySpecificInputs: update.opportunitySpecificTaxInputs || [],
      taxMissingOrReviewInputs: update.missingOrReviewInputs || [],
      syntheticTaxDataNotice: "Synthetic estimated tax profile for test fixtures; not actual tax documents.",
      taxDataGeneratedAt: now,
      taxDataImportedAt: now,
      taxDataSchemaVersion: testTaxDocumentArtifact.schemaVersion,
      taxDataSourceArtifact: path.relative(repoRoot, testTaxDocumentArtifactPath)
    };
  });

  const patchedTestCases = testCases.map((testCase) => {
    const update = updatesBySampleId.get(testCase.sampleUserId);
    if (!update) return testCase;
    const patch = {
      siteTaxProfile: buildSiteTaxProfile(update),
      uploadedTaxFiles: update.syntheticTaxFiles || [],
      taxExtractedValues: update.syntheticTaxExtractedValues || [],
      taxProfileFacts: update.taxProfileFacts || [],
      taxOpportunitySpecificInputs: update.opportunitySpecificTaxInputs || [],
      taxMissingOrReviewInputs: update.missingOrReviewInputs || [],
      syntheticTaxDataNotice: "Synthetic estimated tax profile for test fixtures; not actual tax documents.",
      taxDataGeneratedAt: now,
      taxDataImportedAt: now,
      taxDataSchemaVersion: testTaxDocumentArtifact.schemaVersion,
      taxDataSourceArtifact: path.relative(repoRoot, testTaxDocumentArtifactPath)
    };
    return {
      ...testCase,
      ...patch,
      sourceForm: {
        ...(testCase.sourceForm || {}),
        ...patch
      }
    };
  });

  const patchedPayload = Array.isArray(testCasesPayload)
    ? patchedTestCases
    : {
        ...testCasesPayload,
        sampleTaxDocumentDataImportedAt: now,
        sampleTaxDocumentProfileCount: updatesBySampleId.size,
        sampleTaxDocumentSchemaVersion: testTaxDocumentArtifact.schemaVersion,
        sampleTaxDocumentSourcePath: path.relative(repoRoot, testTaxDocumentArtifactPath),
        testCases: patchedTestCases
      };

  return {
    sampleUsers: patchedSampleUsers,
    testCasesPayload: patchedPayload,
    patchedSampleUserCount: patchedSampleUsers.filter((sample) => updatesBySampleId.has(sample.sampleUserId)).length,
    patchedTestCaseCount: patchedTestCases.filter((testCase) => updatesBySampleId.has(testCase.sampleUserId)).length,
    warnings
  };
}

function buildSiteTaxProfile(update) {
  const extractedValues = update.syntheticTaxExtractedValues || [];
  const files = update.syntheticTaxFiles || [];
  return {
    schemaVersion: "retrofi_site_tax_profile_synthetic_v1",
    generatedAt: now,
    sourceArtifact: path.relative(repoRoot, testTaxDocumentArtifactPath),
    sampleUserId: update.sampleUserId,
    syntheticNotice: "Synthetic estimated tax profile for test fixtures; not actual tax documents.",
    uploadedFileCount: files.length,
    processedFileCount: files.filter((file) => file.processingStatus === "processed").length,
    extractedValueCount: extractedValues.length,
    availableFieldIds: uniqueStrings(extractedValues.map((value) => value.fieldId)),
    taxDocumentTypes: uniqueStrings(files.map((file) => file.taxDocumentType)),
    taxYears: uniqueStrings(files.map((file) => file.taxYear).filter((value) => value != null)),
    jurisdictions: uniqueStrings(files.map((file) => file.jurisdiction)),
    taxProfileFactCount: (update.taxProfileFacts || []).length,
    opportunitySpecificTaxInputCount: (update.opportunitySpecificTaxInputs || []).length,
    missingOrReviewInputCount: (update.missingOrReviewInputs || []).length,
    sourceUrlsChecked: normalizeUrls(update.sourceUrlsChecked || []),
    reasoningNotes: update.reasoningNotes || ""
  };
}

function validatePackages(packages) {
  const invalidSamples = [];
  for (const pkg of packages) {
    const validation = validateIncentiveCalculationPackageV2(pkg);
    if (!validation.valid && invalidSamples.length < 5) {
      invalidSamples.push({
        opportunityId: pkg.opportunity_id,
        errors: validation.errors
      });
    }
  }
  return {
    invalidCount: packages.filter((pkg) => !validateIncentiveCalculationPackageV2(pkg).valid).length,
    invalidSamples
  };
}

function buildReport({
  taxOfficialArtifact,
  testTaxDocumentArtifact,
  taxRuleApplyResult,
  packageApplyResult,
  packageValidation,
  sampleApplyResult,
  warnings
}) {
  const allWarnings = [
    ...warnings,
    ...taxRuleApplyResult.warnings,
    ...packageApplyResult.warnings,
    ...sampleApplyResult.warnings
  ];
  return [
    "# Tax Dataset And Test Document Intake Report",
    "",
    `Generated at: ${now}`,
    "",
    "## Outputs",
    "",
    `- Official tax GPT Pro outputs parsed: ${taxOfficialArtifact.sourceFiles.length}`,
    `- Current tax rule repairs applied: ${taxRuleApplyResult.appliedCount}`,
    `- V2 tax packages patched: ${packageApplyResult.appliedCount}`,
    `- Synthetic tax test profiles imported: ${testTaxDocumentArtifact.profileCount}`,
    `- Sample profiles patched: ${sampleApplyResult.patchedSampleUserCount}`,
    `- Public test cases patched: ${sampleApplyResult.patchedTestCaseCount}`,
    `- Invalid v2 packages after patch: ${packageValidation.invalidCount}`,
    "",
    "## Artifacts",
    "",
    `- Official tax research artifact: \`${path.relative(repoRoot, taxOfficialArtifactPath)}\``,
    `- Test tax-document artifact: \`${path.relative(repoRoot, testTaxDocumentArtifactPath)}\``,
    `- Runtime tax geography rules: \`${path.relative(repoRoot, taxGeographyRulesPath)}\``,
    `- Runtime v2 packages: \`${path.relative(repoRoot, packagesPath)}\``,
    `- Sample user profiles: \`${path.relative(repoRoot, sampleUsersPath)}\``,
    `- Public sample matching test cases: \`${path.relative(repoRoot, testCasesPath)}\``,
    "",
    "## Counts",
    "",
    `- Official dataset families: ${taxOfficialArtifact.counts.datasetFamilyCount}`,
    `- Sales/use state rules: ${taxOfficialArtifact.counts.salesUseStateRuleCount}`,
    `- Property-tax state rows: ${taxOfficialArtifact.counts.propertyTaxStateRuleCount}`,
    `- Business-tax state rows: ${taxOfficialArtifact.counts.businessTaxStateRuleCount}`,
    `- Synthetic tax files: ${testTaxDocumentArtifact.counts.syntheticTaxFileCount}`,
    `- Synthetic tax extracted values: ${testTaxDocumentArtifact.counts.syntheticTaxExtractedValueCount}`,
    `- Tax profile facts: ${testTaxDocumentArtifact.counts.taxProfileFactCount}`,
    "",
    "## Warnings",
    "",
    ...(allWarnings.length > 0 ? allWarnings.map((warning) => `- ${warning}`) : ["- None"])
  ].join("\n");
}

function normalizeUrlsDeep(value) {
  if (Array.isArray(value)) return value.map(normalizeUrlsDeep);
  if (!value || typeof value !== "object") return typeof value === "string" ? normalizeMarkdownUrl(value) : value;
  return Object.fromEntries(Object.entries(value).map(([key, item]) => {
    if (key.toLowerCase().includes("url") && Array.isArray(item)) return [key, normalizeUrls(item)];
    if (key.toLowerCase().includes("url") && typeof item === "string") return [key, normalizeMarkdownUrl(item)];
    return [key, normalizeUrlsDeep(item)];
  }));
}

function normalizeUrls(urls) {
  return uniqueStrings((urls || []).map(normalizeMarkdownUrl));
}

function normalizeMarkdownUrl(value) {
  const text = String(value || "").trim();
  const match = text.match(/^\[(https?:\/\/[^\]]+)\]\((https?:\/\/[^)]+)\)$/i);
  return match ? match[2] : text;
}

function normalizeInputRows(rows) {
  return (rows || []).map((row) => {
    if (!row || typeof row !== "object") return row;
    return {
      ...row,
      inputKey: normalizeInputKey(row.inputKey),
      valueType: row.valueType ? normalizeValueType(row.valueType) : row.valueType
    };
  });
}

function normalizeInputKey(value) {
  return String(value || "").trim().replace(/([a-z0-9])([A-Z])/g, "$1_$2").replace(/[^a-zA-Z0-9]+/g, "_").replace(/^_+|_+$/g, "").toLowerCase();
}

function normalizeValueType(value) {
  const key = normalizeInputKey(value);
  if (["integer", "int"].includes(key)) return "integer";
  if (["number", "decimal", "percent", "currency", "cents"].includes(key)) return "number";
  if (["boolean", "bool"].includes(key)) return "boolean";
  if (["date"].includes(key)) return "date";
  return "text";
}

function sourcePrecedence(input) {
  const strategy = normalizeInputKey(input.sourceStrategy || "");
  if (strategy.includes("assessor")) return ["assessor_review", "tax_document", "user_profile"];
  if (strategy.includes("accountant") || strategy.includes("tax_return")) return ["tax_return", "accountant_review", "user_profile"];
  if (strategy.includes("synthetic_tax_document")) return ["tax_document", "user_profile"];
  return ["user_profile", "admin_review"];
}

function labelFromInputKey(value) {
  return String(value || "").replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

function confidenceNumber(confidence) {
  if (confidence === "high") return 0.9;
  if (confidence === "medium") return 0.72;
  if (confidence === "low") return 0.35;
  return 0.5;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function uniqueStrings(values) {
  return [...new Set((values || []).map((value) => String(value || "").trim()).filter(Boolean))];
}

function uniqueBy(values, keyFn) {
  const seen = new Set();
  return (values || []).filter((value) => {
    const key = keyFn(value);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function countBy(values, keyFn) {
  return (values || []).reduce((counts, value) => {
    const key = keyFn(value);
    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, {});
}

function sum(values, valueFn) {
  return (values || []).reduce((total, value) => total + Number(valueFn(value) || 0), 0);
}

function shortHash(value) {
  let hash = 2166136261;
  for (const char of String(value || "")) {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16);
}
