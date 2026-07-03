import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { validateIncentiveCalculationPackageV2 } from "../server/savings/incentiveCalculationsV2.mjs";

const repoRoot = path.resolve(import.meta.dirname, "..");
const defaultWorkDir = path.join(repoRoot, "GPT Pro Work", "tax-credit-and-form-input-repair-2026-07-02");
const defaultPackagesPath = path.join(repoRoot, "data", "opportunity_incentive_calculation_packages_v2.json");
const defaultTaxArtifactPath = path.join(repoRoot, "data", "tax_credit_package_research_repairs_gpt_pro_2026-07-02.json");
const defaultQuestionCatalogPath = path.join(repoRoot, "data", "input_question_catalog_gpt_pro_2026-07-02.json");
const defaultTestDefaultsPath = path.join(repoRoot, "data", "test_case_profile_defaults_gpt_pro_2026-07-02.json");
const defaultReportPath = path.join(repoRoot, "data", "tax_form_input_repair_intake_report.md");

const TAX_REPAIR_FILE = "output_001_tax_credit_package_repair.md";
const QUESTION_CATALOG_FILE = "output_002_question_catalog_form_assembly.md";
const TEST_DEFAULTS_FILE = "output_003_test_case_profile_defaults.md";

const options = parseArgs(process.argv.slice(2));
const workDir = path.resolve(options.workDir || defaultWorkDir);
const packagesPath = path.resolve(options.packagesPath || defaultPackagesPath);
const taxArtifactPath = path.resolve(options.taxArtifactPath || defaultTaxArtifactPath);
const questionCatalogPath = path.resolve(options.questionCatalogPath || defaultQuestionCatalogPath);
const testDefaultsPath = path.resolve(options.testDefaultsPath || defaultTestDefaultsPath);
const reportPath = path.resolve(options.reportPath || defaultReportPath);

const warnings = [];

const taxOutput = parseOutputFile(path.join(workDir, TAX_REPAIR_FILE), TAX_REPAIR_FILE);
const questionOutput = parseOutputFile(path.join(workDir, QUESTION_CATALOG_FILE), QUESTION_CATALOG_FILE);
const testDefaultsOutput = parseOutputFile(path.join(workDir, TEST_DEFAULTS_FILE), TEST_DEFAULTS_FILE, {
  repairKnownQuotedSyntheticSource: true
});

validateExpectedOutputs({ taxOutput, questionOutput, testDefaultsOutput, warnings });

const taxArtifact = buildTaxArtifact(taxOutput.object, warnings);
const questionArtifact = buildQuestionCatalogArtifact(questionOutput.object, taxArtifact, warnings);
const testDefaultsArtifact = buildTestDefaultsArtifact(testDefaultsOutput.object, warnings);

const packagesArtifact = readJson(packagesPath);
const packageApplyResult = applyTaxRepairsToPackages(packagesArtifact, taxArtifact.repairs);
const packageValidation = validatePackages(packagesArtifact.packages || []);
if (packageValidation.invalidCount > 0) {
  throw new Error(`Tax repair application generated invalid v2 packages: ${JSON.stringify(packageValidation.invalidSamples, null, 2)}`);
}

fs.writeFileSync(taxArtifactPath, `${JSON.stringify(taxArtifact, null, 2)}\n`);
fs.writeFileSync(questionCatalogPath, `${JSON.stringify(questionArtifact, null, 2)}\n`);
fs.writeFileSync(testDefaultsPath, `${JSON.stringify(testDefaultsArtifact, null, 2)}\n`);
fs.writeFileSync(packagesPath, `${JSON.stringify(packagesArtifact, null, 2)}\n`);
fs.writeFileSync(
  reportPath,
  buildReport({
    taxArtifact,
    questionArtifact,
    testDefaultsArtifact,
    packageApplyResult,
    packageValidation,
    parsedOutputs: [taxOutput, questionOutput, testDefaultsOutput],
    warnings
  }),
  "utf8"
);

console.log("Intook tax/form-input GPT Pro outputs.");
console.log(`Tax repairs: ${taxArtifact.repairs.length}`);
console.log(`Question catalog rows: ${questionArtifact.questionCatalog.length}`);
console.log(`Test profile templates: ${testDefaultsArtifact.profileTemplates.length}`);
console.log(`Tax package repairs applied: ${packageApplyResult.appliedCount}`);
console.log(`Warnings: ${warnings.length + packageApplyResult.warnings.length}`);
console.log(`Tax artifact: ${path.relative(repoRoot, taxArtifactPath)}`);
console.log(`Question catalog: ${path.relative(repoRoot, questionCatalogPath)}`);
console.log(`Test defaults: ${path.relative(repoRoot, testDefaultsPath)}`);
console.log(`Packages: ${path.relative(repoRoot, packagesPath)}`);
console.log(`Report: ${path.relative(repoRoot, reportPath)}`);

function parseArgs(args) {
  const parsed = {};
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (!arg.startsWith("--")) continue;
    const key = arg.slice(2);
    const next = args[index + 1];
    if (!next || next.startsWith("--")) {
      parsed[key] = true;
    } else {
      parsed[key] = next;
      index += 1;
    }
  }
  return parsed;
}

function parseOutputFile(filePath, fileName, { repairKnownQuotedSyntheticSource = false } = {}) {
  const raw = fs.readFileSync(filePath, "utf8");
  const extracted = extractFirstJsonObject(raw);
  let json = extracted.json;
  if (repairKnownQuotedSyntheticSource) {
    const repaired = json.replaceAll('source="synthetic_test_case"', 'source=\\"synthetic_test_case\\"');
    if (repaired !== json) {
      warnings.push(`${fileName} had unescaped source="synthetic_test_case" prose; escaped it before JSON parsing.`);
      json = repaired;
    }
  }
  return {
    fileName,
    object: JSON.parse(json),
    trailingText: extracted.trailing,
    trailingTextLength: extracted.trailing.length
  };
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

function validateExpectedOutputs({ taxOutput, questionOutput, testDefaultsOutput, warnings }) {
  const expectedTaxIds = new Set([
    "SOURCE_DSIRE:dsire_program_id:3216",
    "SOURCE_DSIRE:dsire_program_id:381",
    "SOURCE_DSIRE:dsire_program_id:22798"
  ]);

  if (taxOutput.object.schemaVersion !== "retrofi_tax_credit_package_repair.v1") {
    throw new Error(`Unexpected tax schema: ${taxOutput.object.schemaVersion}`);
  }
  if (questionOutput.object.schemaVersion !== "retrofi_question_catalog_repair.v1") {
    throw new Error(`Unexpected question catalog schema: ${questionOutput.object.schemaVersion}`);
  }
  if (testDefaultsOutput.object.schemaVersion !== "retrofi_test_case_profile_defaults.v1") {
    throw new Error(`Unexpected test defaults schema: ${testDefaultsOutput.object.schemaVersion}`);
  }

  const taxIds = new Set((taxOutput.object.repairs || []).map((repair) => repair.opportunityId));
  for (const id of expectedTaxIds) {
    if (!taxIds.has(id)) throw new Error(`Missing expected tax repair for ${id}`);
  }
  if ((taxOutput.object.repairs || []).length !== expectedTaxIds.size) {
    warnings.push(`Expected ${expectedTaxIds.size} tax repairs but found ${(taxOutput.object.repairs || []).length}.`);
  }

  for (const output of [taxOutput, questionOutput, testDefaultsOutput]) {
    if (output.trailingTextLength > 0) {
      warnings.push(`${output.fileName} contained ${output.trailingTextLength} trailing characters after the first JSON object; imported the first JSON object and ignored trailing text.`);
    }
  }
}

function buildTaxArtifact(raw, warnings) {
  const repairs = (raw.repairs || []).map((repair) => ({
    ...repair,
    sourceFile: TAX_REPAIR_FILE,
    sourceUrlsChecked: normalizeUrls(repair.sourceUrlsChecked || []),
    effects: (repair.effects || []).map((effect) => ({
      ...effect,
      sourceUrlsChecked: normalizeUrls(effect.sourceUrlsChecked || []),
      formulaExpression: effect.formulaExpression || null,
      variables: (effect.variables || []).map(normalizeTaxVariable)
    }))
  }));

  const classificationCounts = countBy(repairs, (repair) => repair.taxBenefitClassification || "unknown");
  const sourceConfidenceCounts = countBy(repairs, (repair) => repair.sourceConfidence || "unknown");
  const displayStatusCounts = countBy(
    repairs.flatMap((repair) => repair.effects || []),
    (effect) => effect.displayRecommendation?.estimateStatus || "unknown"
  );

  return {
    schemaVersion: "retrofi_tax_credit_package_research_repairs_gpt_pro.v1",
    generatedAt: new Date().toISOString(),
    sourceWorkDir: path.relative(repoRoot, workDir),
    sourceFiles: [TAX_REPAIR_FILE],
    repairCount: repairs.length,
    counts: {
      classificationCounts,
      sourceConfidenceCounts,
      displayStatusCounts,
      archiveRecommendedCount: repairs.filter((repair) => repair.shouldArchive === true).length,
      defaultUserFacingIncludedCount: repairs.flatMap((repair) => repair.effects || []).filter((effect) => effect.includedInUserFacingTotalDefault === true).length
    },
    validationWarnings: warnings.filter((warning) => warning.includes(TAX_REPAIR_FILE)),
    repairs,
    rawSummary: raw.summary || null
  };
}

function normalizeTaxVariable(variable) {
  return {
    ...variable,
    inputKey: normalizeInputKey(variable.inputKey),
    valueType: normalizeValueType(variable.valueType),
    sourceStrategy: variable.sourceStrategy || "user_input",
    uiPlacement: variable.uiPlacement || "tax_profile",
    userOverrideAllowed: variable.userOverrideAllowed !== false,
    required: variable.required !== false
  };
}

function buildQuestionCatalogArtifact(raw, taxArtifact, warnings) {
  const questionCatalog = (raw.questionCatalog || []).map((question) => ({
    ...question,
    canonicalInputKey: normalizeInputKey(question.canonicalInputKey),
    aliases: uniqueStrings((question.aliases || []).map(normalizeInputKey)),
    sourceFile: QUESTION_CATALOG_FILE
  }));
  const formAssemblyRules = annotateRows(raw.formAssemblyRules || [], QUESTION_CATALOG_FILE);
  const retrofitBaseQuestionSets = annotateRows(raw.retrofitBaseQuestionSets || [], QUESTION_CATALOG_FILE);
  let opportunitySpecificQuestionSets = annotateRows(raw.opportunitySpecificQuestionSets || [], QUESTION_CATALOG_FILE);
  opportunitySpecificQuestionSets = correctSwappedTaxOpportunityQuestionSets(opportunitySpecificQuestionSets, warnings);

  const missingUiTodos = annotateRows(raw.missingUiTodos || [], QUESTION_CATALOG_FILE);
  const sensitiveQuestionCount = questionCatalog.filter((question) => question.sensitiveField === true).length;

  return {
    schemaVersion: "retrofi_input_question_catalog_gpt_pro.v1",
    generatedAt: new Date().toISOString(),
    sourceWorkDir: path.relative(repoRoot, workDir),
    sourceFiles: [QUESTION_CATALOG_FILE],
    questionCatalog,
    formAssemblyRules,
    retrofitBaseQuestionSets,
    opportunitySpecificQuestionSets,
    missingUiTodos,
    counts: {
      questionCount: questionCatalog.length,
      sensitiveQuestionCount,
      formAssemblyRuleCount: formAssemblyRules.length,
      retrofitBaseQuestionSetCount: retrofitBaseQuestionSets.length,
      opportunitySpecificQuestionSetCount: opportunitySpecificQuestionSets.length,
      uiPlacementCounts: countBy(questionCatalog, (question) => question.uiPlacement || "unknown"),
      answerTypeCounts: countBy(questionCatalog, (question) => question.answerType || "unknown")
    },
    validationWarnings: warnings.filter((warning) => warning.includes("question-catalog") || warning.includes("opportunity-specific question sets")),
    linkedTaxRepairOpportunityIds: taxArtifact.repairs.map((repair) => repair.opportunityId),
    rawSummary: raw.summary || null
  };
}

function correctSwappedTaxOpportunityQuestionSets(rows, warnings) {
  const byId = new Map(rows.map((row) => [row.opportunityId, row]));
  const michigan = byId.get("SOURCE_DSIRE:dsire_program_id:3216");
  const washington = byId.get("SOURCE_DSIRE:dsire_program_id:381");
  if (
    michigan?.questionIds?.includes("q_qualifying_taxable_gross_receipts") &&
    washington?.questionIds?.includes("q_approved_zone_designation")
  ) {
    warnings.push("Corrected swapped opportunity-specific question sets for SOURCE_DSIRE:dsire_program_id:3216 and SOURCE_DSIRE:dsire_program_id:381 in the normalized question-catalog artifact.");
    const correctedMichigan = {
      ...washington,
      opportunityId: "SOURCE_DSIRE:dsire_program_id:3216",
      notes: "Corrected from GPT Pro output: Michigan RERZ uses zone, approved-company, and eligible tax-liability inputs."
    };
    const correctedWashington = {
      ...michigan,
      opportunityId: "SOURCE_DSIRE:dsire_program_id:381",
      notes: "Corrected from GPT Pro output: Washington solar manufacturer preference uses B&O classification, gross-receipts, deduction, and reporting inputs."
    };
    return rows.map((row) => {
      if (row.opportunityId === "SOURCE_DSIRE:dsire_program_id:3216") return correctedMichigan;
      if (row.opportunityId === "SOURCE_DSIRE:dsire_program_id:381") return correctedWashington;
      return row;
    });
  }
  return rows;
}

function buildTestDefaultsArtifact(raw, warnings) {
  const profileTemplates = (raw.profileTemplates || []).map((template) => ({
    ...template,
    sourceFile: TEST_DEFAULTS_FILE,
    syntheticAnswers: (template.syntheticAnswers || []).map((answer) => ({
      ...answer,
      inputKey: normalizeInputKey(answer.inputKey),
      source: "synthetic_test_case",
      defaultIsPlaceholder: true,
      userOverrideAllowed: answer.userOverrideAllowed !== false
    }))
  }));
  const questionCatalogBacklog = (raw.questionCatalogBacklog || []).map((question) => ({
    ...question,
    inputKey: normalizeInputKey(question.inputKey),
    sourceFile: TEST_DEFAULTS_FILE
  }));

  return {
    schemaVersion: "retrofi_test_case_profile_defaults_gpt_pro.v1",
    generatedAt: new Date().toISOString(),
    sourceWorkDir: path.relative(repoRoot, workDir),
    sourceFiles: [TEST_DEFAULTS_FILE],
    globalRules: annotateRows(raw.globalRules || [], TEST_DEFAULTS_FILE),
    profileTemplates,
    recommendedTestCaseAdditions: annotateRows(raw.recommendedTestCaseAdditions || [], TEST_DEFAULTS_FILE),
    questionCatalogBacklog,
    counts: {
      templateCount: profileTemplates.length,
      syntheticAnswerCount: profileTemplates.reduce((sum, template) => sum + (template.syntheticAnswers || []).length, 0),
      recommendedTestCaseAdditionCount: (raw.recommendedTestCaseAdditions || []).length,
      backlogQuestionCount: questionCatalogBacklog.length,
      sensitiveBacklogQuestionCount: questionCatalogBacklog.filter((question) => question.sensitiveField === true).length
    },
    validationWarnings: warnings.filter((warning) => warning.includes(TEST_DEFAULTS_FILE)),
    rawSummary: raw.summary || null
  };
}

function applyTaxRepairsToPackages(packagesArtifact, repairs) {
  const packages = packagesArtifact.packages || [];
  const packageById = new Map(packages.map((pkg) => [pkg.opportunity_id, pkg]));
  const warnings = [];
  let appliedCount = 0;

  for (const repair of repairs) {
    const pkg = packageById.get(repair.opportunityId);
    if (!pkg) {
      warnings.push(`Missing v2 package for tax repair ${repair.opportunityId}`);
      continue;
    }
    const effectRepair = (repair.effects || [])[0];
    if (!effectRepair) {
      warnings.push(`Tax repair ${repair.opportunityId} has no effects.`);
      continue;
    }
    applyTaxRepairToPackage({ pkg, repair, effectRepair });
    appliedCount += 1;
  }

  packagesArtifact.generatedAt = new Date().toISOString();
  packagesArtifact.taxFormInputRepairAppliedAt = new Date().toISOString();
  packagesArtifact.taxFormInputRepairArtifact = path.relative(repoRoot, taxArtifactPath);
  packagesArtifact.taxFormInputRepairCount = appliedCount;
  packagesArtifact.questionCatalogArtifact = path.relative(repoRoot, questionCatalogPath);
  packagesArtifact.testCaseProfileDefaultsArtifact = path.relative(repoRoot, testDefaultsPath);
  packagesArtifact.statusCounts = countBy(packages, (pkg) => pkg.calculation_status || "unknown");
  packagesArtifact.confidenceCounts = countBy(packages, (pkg) => confidenceLabel(pkg.confidence?.overall));

  return {
    appliedCount,
    warningCount: warnings.length,
    warnings
  };
}

function applyTaxRepairToPackage({ pkg, repair, effectRepair }) {
  const effect = (pkg.effects || [])[0];
  if (!effect) throw new Error(`Package ${pkg.opportunity_id} has no effects to repair.`);

  const evidenceId = `tax_package_repair_${shortHash(repair.opportunityId)}`;
  const sourceUrls = normalizeUrls([...(repair.sourceUrlsChecked || []), ...(effectRepair.sourceUrlsChecked || [])]);
  const evidence = {
    evidence_id: evidenceId,
    source_type: "gpt_pro_tax_package_repair",
    quote: effectRepair.evidenceText || repair.evidenceText || effectRepair.formulaText || "",
    source_urls: sourceUrls,
    evidence_confidence: confidenceNumber(repair.sourceConfidence)
  };

  pkg.source_evidence = [
    ...(pkg.source_evidence || []).filter((item) => item.evidence_id !== evidenceId),
    evidence
  ];
  pkg.calculation_status = taxPackageCalculationStatus(repair, effectRepair, pkg);
  pkg.recommended_workflow_types = uniqueStrings([
    ...(pkg.recommended_workflow_types || []),
    ...(repair.recommendedRetrofitOrWorkflowTypes || [])
  ]);
  pkg.input_requirements = inputRequirementsFromVariables(effectRepair.variables || [], effect.effect_id);
  pkg.source_evidence = uniqueBy(pkg.source_evidence, (item) => item.evidence_id);

  effect.label = effectRepair.formulaText || effectRepair.displayRecommendation?.label || effect.label;
  effect.effect_type = mappedEffectType(effectRepair);
  effect.cash_flow_direction = effect.effect_type === "recurring_expense" ? "cost" : "benefit";
  effect.timing = {
    ...(effect.timing || {}),
    cadence: mappedCadence(effectRepair),
    source_timing: effectRepair.timing || effect.timing?.source_timing || "unknown",
    application_deadline: effectRepair.capsAndLimits?.expirationDate || effect.timing?.application_deadline || null
  };
  effect.calculation = {
    method: "expression",
    expression_id: effectRepair.valueModelKind || repair.taxBenefitClassification || "tax_formula",
    expression: effectRepair.formulaExpression || null,
    formula_text: effectRepair.formulaText || null,
    variables: (effectRepair.variables || []).map((variable) => normalizeInputKey(variable.inputKey)),
    tax_benefit_classification: repair.taxBenefitClassification || null,
    cash_value_classification: repair.cashValueClassification || null,
    display_recommendation: toSnakeObject(effectRepair.displayRecommendation || {}),
    caps_and_limits: toSnakeObject(effectRepair.capsAndLimits || {})
  };
  if (effectRepair.valueModelKind === "tax_rate_difference") {
    effect.calculation.preferential_solar_b_and_o_rate_decimal = 0.00275;
  }
  effect.required_inputs = inputRequirementsFromVariables(effectRepair.variables || [], effect.effect_id);
  effect.evidence_refs = uniqueStrings([...(effect.evidence_refs || []), evidenceId]);
  effect.confidence = {
    ...(effect.confidence || {}),
    overall: Math.min(confidenceNumber(repair.sourceConfidence), 0.72),
    calculation: 0.72,
    extraction: confidenceNumber(repair.sourceConfidence),
    reason_codes: uniqueStrings([
      ...(effect.confidence?.reason_codes || []),
      "tax_package_repair_applied",
      `tax_benefit_${repair.taxBenefitClassification || "unknown"}`,
      `estimate_status_${effectRepair.displayRecommendation?.estimateStatus || "unknown"}`
    ])
  };
  effect.repair_metadata = {
    ...(effect.repair_metadata || {}),
    value_model_kind: effectRepair.valueModelKind || effect.repair_metadata?.value_model_kind || null,
    cash_value_classification: repair.cashValueClassification || effect.repair_metadata?.cash_value_classification || null,
    tax_benefit_classification: repair.taxBenefitClassification || null,
    included_in_user_facing_total_default: effectRepair.includedInUserFacingTotalDefault === true,
    human_review_required: taxEffectRequiresHumanReview(effectRepair),
    human_review_reasons: uniqueStrings([
      ...(effect.repair_metadata?.human_review_reasons || []),
      effectRepair.displayRecommendation?.estimateStatus,
      "TAX_OR_ASSESSOR_REVIEW_REQUIRED"
    ]),
    tax_package_repair: {
      source_file: TAX_REPAIR_FILE,
      source_confidence: repair.sourceConfidence || null,
      display_recommendation: effectRepair.displayRecommendation || null,
      caps_and_limits: effectRepair.capsAndLimits || null,
      filing_and_approval_requirements: effectRepair.filingAndApprovalRequirements || [],
      source_urls_checked: sourceUrls,
      reasoning_notes: effectRepair.reasoningNotes || repair.reasoningNotes || ""
    }
  };

  pkg.stacking = {
    ...(pkg.stacking || {}),
    notes: [pkg.stacking?.notes, "Tax package repair keeps this effect outside user-facing totals by default pending tax/accountant/assessor review."].filter(Boolean).join(" ")
  };
  pkg.confidence = {
    ...(pkg.confidence || {}),
    overall: Math.min(confidenceNumber(repair.sourceConfidence), 0.72),
    source_access: confidenceNumber(repair.sourceConfidence),
    calculation: 0.72,
    extraction: confidenceNumber(repair.sourceConfidence),
    reason_codes: uniqueStrings([
      ...(pkg.confidence?.reason_codes || []),
      "tax_package_repair_applied",
      `tax_benefit_${repair.taxBenefitClassification || "unknown"}`
    ])
  };
  pkg.migration_metadata = {
    ...(pkg.migration_metadata || {}),
    tax_package_repair_applied_at: new Date().toISOString(),
    tax_package_repair_artifact: path.relative(repoRoot, taxArtifactPath)
  };
}

function taxPackageCalculationStatus(repair, effectRepair, pkg) {
  if (repair.opportunityId === "SOURCE_DSIRE:dsire_program_id:22798") return "non_monetary_workflow";
  if (effectRepair.displayRecommendation?.estimateStatus === "not_calculable") return "no_calculable_value";
  return pkg.calculation_status === "unavailable_archived" ? pkg.calculation_status : "calculable_with_missing_inputs";
}

function mappedEffectType(effectRepair) {
  if (["tax_exemption", "tax_abatement", "tax_rate_preference", "property_tax_valuation"].includes(effectRepair.effectType)) {
    return effectRepair.effectType;
  }
  if (effectRepair.valueModelKind === "property_tax_valuation_formula") {
    return "property_tax_valuation";
  }
  return "tax_credit";
}

function mappedCadence(effectRepair) {
  if (effectRepair.timing === "monthly") return "monthly";
  if (effectRepair.timing === "annual" || effectRepair.timing === "tax_filing") return "annual";
  return "one_time";
}

function taxEffectRequiresHumanReview(effectRepair) {
  const status = effectRepair.displayRecommendation?.estimateStatus || "";
  return status.includes("review") || status.includes("tax_profile") || status.includes("property_tax_profile") || status.includes("accountant");
}

function inputRequirementsFromVariables(variables, effectId) {
  return dedupeInputRequirements((variables || []).map((variable) => ({
    input_key: normalizeInputKey(variable.inputKey),
    label: variable.label || labelFromInputKey(variable.inputKey),
    value_type: normalizeValueType(variable.valueType),
    required_for: [effectId],
    source_precedence: sourcePrecedenceForVariable(variable),
    missing_severity: variable.required === false ? "optional" : "blocks_calculation",
    ui_placement: variable.uiPlacement || null,
    user_override_allowed: variable.userOverrideAllowed !== false,
    confidence_impact_until_confirmed: variable.confidenceImpactUntilConfirmed || null
  })));
}

function sourcePrecedenceForVariable(variable) {
  const strategy = variable.sourceStrategy || "user_input";
  if (strategy === "tax_return_or_accountant") return ["tax_profile", "accountant_review", "user_profile"];
  if (strategy === "property_tax_bill") return ["property_tax_bill", "tax_profile", "user_profile"];
  if (strategy === "quote_or_invoice") return ["quote", "retrofit_assumptions", "user_profile"];
  if (strategy === "program_approval") return ["program_approval", "admin_review"];
  if (strategy === "admin_review") return ["admin_review", "user_profile"];
  if (strategy === "official_source") return ["program_source", "admin_review"];
  if (strategy === "runtime_project_data") return ["retrofit_assumptions", "quote", "user_profile"];
  if (strategy === "derived") return ["derived_runtime", "admin_review"];
  return ["user_profile", "retrofit_assumptions"];
}

function buildReport({ taxArtifact, questionArtifact, testDefaultsArtifact, packageApplyResult, packageValidation, parsedOutputs, warnings }) {
  const lines = [];
  lines.push("# Tax/Form Input GPT Pro Intake Report");
  lines.push("");
  lines.push(`Generated: ${new Date().toISOString()}`);
  lines.push("");
  lines.push("## Output Validation");
  lines.push("");
  lines.push(`- Output files parsed: ${parsedOutputs.length}`);
  lines.push(`- Tax repairs imported: ${taxArtifact.repairs.length}`);
  lines.push(`- Question catalog rows imported: ${questionArtifact.questionCatalog.length}`);
  lines.push(`- Test profile templates imported: ${testDefaultsArtifact.profileTemplates.length}`);
  lines.push(`- Warnings: ${warnings.length + packageApplyResult.warnings.length}`);
  lines.push("");

  if (warnings.length || packageApplyResult.warnings.length) {
    lines.push("## Warnings");
    lines.push("");
    for (const warning of [...warnings, ...packageApplyResult.warnings]) lines.push(`- ${warning}`);
    lines.push("");
  }

  lines.push("## Tax Package Repairs");
  lines.push("");
  lines.push(`- Repairs applied to v2 packages: ${packageApplyResult.appliedCount}`);
  lines.push(`- Default user-facing tax inclusion count: ${taxArtifact.counts.defaultUserFacingIncludedCount}`);
  lines.push("");
  appendCountTable(lines, "Tax Benefit Classification Counts", taxArtifact.counts.classificationCounts);
  lines.push("");
  appendCountTable(lines, "Tax Display Status Counts", taxArtifact.counts.displayStatusCounts);
  lines.push("");

  lines.push("## Question Catalog");
  lines.push("");
  lines.push(`- Questions: ${questionArtifact.counts.questionCount}`);
  lines.push(`- Sensitive questions: ${questionArtifact.counts.sensitiveQuestionCount}`);
  lines.push(`- Form assembly rules: ${questionArtifact.counts.formAssemblyRuleCount}`);
  lines.push(`- Retrofit base question sets: ${questionArtifact.counts.retrofitBaseQuestionSetCount}`);
  lines.push(`- Opportunity-specific question sets: ${questionArtifact.counts.opportunitySpecificQuestionSetCount}`);
  lines.push("");

  lines.push("## Test Defaults");
  lines.push("");
  lines.push(`- Profile templates: ${testDefaultsArtifact.counts.templateCount}`);
  lines.push(`- Synthetic answers: ${testDefaultsArtifact.counts.syntheticAnswerCount}`);
  lines.push(`- Recommended test-case additions: ${testDefaultsArtifact.counts.recommendedTestCaseAdditionCount}`);
  lines.push(`- Backlog questions: ${testDefaultsArtifact.counts.backlogQuestionCount}`);
  lines.push("");

  lines.push("## Package Validation");
  lines.push("");
  lines.push(`- Packages validated: ${packageValidation.packageCount}`);
  lines.push(`- Invalid packages: ${packageValidation.invalidCount}`);
  lines.push("");

  lines.push("## Artifacts");
  lines.push("");
  lines.push(`- Tax artifact: \`${path.relative(repoRoot, taxArtifactPath)}\``);
  lines.push(`- Question catalog: \`${path.relative(repoRoot, questionCatalogPath)}\``);
  lines.push(`- Test defaults: \`${path.relative(repoRoot, testDefaultsPath)}\``);
  lines.push(`- Updated packages: \`${path.relative(repoRoot, packagesPath)}\``);
  lines.push("");

  return `${lines.join("\n")}\n`;
}

function appendCountTable(lines, title, counts) {
  lines.push(`### ${title}`);
  lines.push("");
  lines.push("| Key | Count |");
  lines.push("| --- | ---: |");
  for (const [key, count] of Object.entries(counts || {}).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))) {
    lines.push(`| ${key} | ${count} |`);
  }
}

function validatePackages(packages) {
  const invalidSamples = [];
  let invalidCount = 0;
  for (const pkg of packages) {
    const validation = validateIncentiveCalculationPackageV2(pkg);
    if (!validation.valid) {
      invalidCount += 1;
      if (invalidSamples.length < 10) {
        invalidSamples.push({
          opportunityId: pkg.opportunity_id,
          errors: validation.errors
        });
      }
    }
  }
  return {
    packageCount: packages.length,
    invalidCount,
    invalidSamples
  };
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function annotateRows(rows, sourceFile) {
  return rows.map((row) => ({ ...row, sourceFile }));
}

function normalizeInputKey(value) {
  return String(value || "")
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .toLowerCase();
}

function normalizeValueType(value) {
  const normalized = String(value || "text").toLowerCase();
  if (normalized === "currency") return "currency_cents";
  if (normalized === "percent") return "number";
  if (normalized === "integer") return "number";
  if (normalized === "string") return "text";
  return normalized;
}

function normalizeUrls(values) {
  const urls = [];
  for (const value of values || []) {
    const text = String(value || "");
    const matches = text.match(/https?:\/\/[^\s\]\)"'<>]+/g) || [];
    urls.push(...matches.map((url) => url.replace(/[.,;]+$/g, "")));
  }
  return uniqueStrings(urls);
}

function dedupeInputRequirements(inputs = []) {
  const byKey = new Map();
  for (const input of inputs) {
    if (!input?.input_key) continue;
    if (!byKey.has(input.input_key)) {
      byKey.set(input.input_key, {
        ...input,
        required_for: uniqueStrings(input.required_for || []),
        source_precedence: uniqueStrings(input.source_precedence || [])
      });
      continue;
    }
    const existing = byKey.get(input.input_key);
    byKey.set(input.input_key, {
      ...existing,
      required_for: uniqueStrings([...(existing.required_for || []), ...(input.required_for || [])]),
      source_precedence: uniqueStrings([...(existing.source_precedence || []), ...(input.source_precedence || [])])
    });
  }
  return [...byKey.values()];
}

function labelFromInputKey(inputKey) {
  return normalizeInputKey(inputKey)
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function confidenceNumber(value) {
  if (typeof value === "number") return Math.max(0, Math.min(1, value));
  if (value === "high") return 0.9;
  if (value === "medium") return 0.72;
  if (value === "low") return 0.38;
  return 0.5;
}

function confidenceLabel(value) {
  const number = Number(value);
  if (number >= 0.82) return "high";
  if (number >= 0.55) return "medium";
  return "low";
}

function countBy(values, keyFn) {
  const counts = {};
  for (const value of values || []) {
    const key = keyFn(value);
    counts[key] = (counts[key] || 0) + 1;
  }
  return counts;
}

function toSnakeObject(value) {
  if (Array.isArray(value)) return value.map(toSnakeObject);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(
    Object.entries(value).map(([key, entry]) => [
      key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`),
      toSnakeObject(entry)
    ])
  );
}

function uniqueStrings(values = []) {
  return [...new Set(values.map((value) => String(value || "").trim()).filter(Boolean))];
}

function uniqueBy(values = [], keyFn) {
  const seen = new Set();
  return values.filter((value) => {
    const key = keyFn(value);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function shortHash(value) {
  return crypto.createHash("sha256").update(String(value)).digest("hex").slice(0, 16);
}
