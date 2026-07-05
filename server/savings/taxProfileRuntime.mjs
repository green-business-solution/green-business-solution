import { calculateLocalTaxWorkflow, selectLocalTaxWorkflows } from "./localTaxWorkflows.mjs";
import { calculateTaxGapRuntimeRule } from "./taxGapRuntime.mjs";
import { mapV2InputToField } from "./v2InputFieldCatalog.mjs";

export const TAX_PROFILE_RUNTIME_SCHEMA_VERSION = "tax-profile-runtime-v1";

const TAX_ROW_GROUPS = [
  "taxProfileFacts",
  "taxExtractedValues",
  "taxOpportunitySpecificInputs"
];

export function evaluateTaxProfileRuntime({
  taxContext = {},
  geography = {},
  localTaxWorkflows = [],
  taxGapRuntimeRules = [],
  includeCalculatedTaxInUserFacingTotals = true
} = {}) {
  const answers = buildTaxProfileRuntimeAnswers(taxContext);
  const explicitRuleIds = taxRowValues(taxContext, "taxRuleId");
  const explicitSourceIds = taxRowValues(taxContext, "sourceSkippedRecordId");
  const ctx = {
    answers,
    includeCalculatedTaxInUserFacingTotals
  };

  const selectedLocalWorkflows = selectProfileLocalTaxWorkflows({
    localTaxWorkflows,
    geography,
    explicitSourceIds
  });
  const localWorkflowResults = selectedLocalWorkflows.map((workflow) => ({
    kind: "local_tax_workflow",
    workflowId: workflow.id,
    sourceSkippedRecordIds: workflow.taxGapRepairSourceIds || [],
    taxDomain: workflow.taxDomain || null,
    taxType: workflow.taxType || null,
    result: calculateLocalTaxWorkflow(workflow, ctx)
  }));

  const genericTaxGapRules = selectProfileTaxGapRules({
    taxGapRuntimeRules,
    explicitRuleIds,
    explicitSourceIds
  });
  const taxGapRuleResults = genericTaxGapRules.map((rule) => ({
    kind: "tax_gap_runtime_rule",
    taxRuleId: rule.taxRuleId || null,
    sourceSkippedRecordId: rule.sourceSkippedRecordId || null,
    modelKind: rule.modelKind || null,
    runtimeSupportStatus: rule.runtimeSupportStatus || null,
    result: calculateTaxGapRuntimeRule(rule, ctx)
  }));

  const evaluations = [...localWorkflowResults, ...taxGapRuleResults].map(enrichTaxEvaluation);
  const missingRequiredInputs = dedupeMissingInputs(
    evaluations.flatMap((evaluation) =>
      (evaluation.result?.missingInputs || []).map((input) => ({
        ...input,
        requiredBeforeOpportunitySelection: true,
        evaluationKind: evaluation.kind,
        workflowId: evaluation.workflowId || input.workflowId || null,
        taxRuleId: evaluation.taxRuleId || input.taxRuleId || null,
        sourceSkippedRecordId: evaluation.sourceSkippedRecordId || null
      }))
    )
  );
  const calculatedResults = evaluations.filter((evaluation) => evaluation.result?.status === "calculated");
  const includedResults = calculatedResults.filter((evaluation) => evaluation.result?.includedInUserFacingTotal === true);
  const unsupportedResults = evaluations.filter((evaluation) => isUnsupportedOrReviewOnly(evaluation.result?.status));
  const requiredPreOpportunityInputFields = missingRequiredInputs.map(taxMissingInputToFormField);

  return {
    schemaVersion: TAX_PROFILE_RUNTIME_SCHEMA_VERSION,
    inputPolicy: "mandatory_pre_opportunity_tax_inputs",
    includeCalculatedTaxInUserFacingTotals,
    answerCount: Object.keys(answers).length,
    selectedLocalWorkflowCount: selectedLocalWorkflows.length,
    selectedTaxGapRuntimeRuleCount: genericTaxGapRules.length,
    evaluations,
    missingRequiredInputs,
    requiredPreOpportunityInputFields,
    totals: {
      evaluationCount: evaluations.length,
      calculatedAmountCents: sum(calculatedResults, (evaluation) => evaluation.result?.amountCents || 0),
      calculatedBenefitCents: sum(calculatedResults, (evaluation) => evaluation.calculatedBenefitCents),
      calculatedLiabilityCents: sum(calculatedResults, (evaluation) => evaluation.calculatedLiabilityCents),
      includedBenefitCents: sum(includedResults, (evaluation) => evaluation.includedBenefitCents),
      includedLiabilityCents: sum(includedResults, (evaluation) => evaluation.includedLiabilityCents),
      includedAmountCents:
        sum(includedResults, (evaluation) => evaluation.includedBenefitCents) -
        sum(includedResults, (evaluation) => evaluation.includedLiabilityCents),
      calculatedCount: calculatedResults.length,
      includedCount: includedResults.length,
      missingRequiredInputCount: missingRequiredInputs.length,
      unsupportedOrReviewOnlyCount: unsupportedResults.length
    },
    readyForOpportunityFinancialEstimate: missingRequiredInputs.length === 0 && unsupportedResults.length === 0,
    requiresStructuredTaxModelWork: unsupportedResults.length > 0
  };
}

export function buildTaxProfileRuntimePreview(options = {}) {
  const result = evaluateTaxProfileRuntime(options);
  const calculatedBenefits = result.evaluations.filter(
    (evaluation) => evaluation.result?.status === "calculated" && evaluation.financialRole === "tax_benefit"
  );
  const calculatedLiabilities = result.evaluations.filter(
    (evaluation) => evaluation.result?.status === "calculated" && evaluation.financialRole === "tax_liability"
  );
  const status =
    result.requiredPreOpportunityInputFields.length > 0
      ? "requires_tax_intake"
      : result.requiresStructuredTaxModelWork
        ? "needs_structured_tax_model"
        : result.evaluations.length > 0
          ? "calculated"
          : "no_applicable_tax_rules";

  return {
    schemaVersion: TAX_PROFILE_RUNTIME_SCHEMA_VERSION,
    status,
    inputPolicy: result.inputPolicy,
    opportunityDisplayBlocked: result.requiredPreOpportunityInputFields.length > 0,
    readyForOpportunityFinancialEstimate: result.readyForOpportunityFinancialEstimate,
    requiresStructuredTaxModelWork: result.requiresStructuredTaxModelWork,
    requiredPreOpportunityInputs: result.requiredPreOpportunityInputFields,
    totals: result.totals,
    calculatedTaxBenefits: calculatedBenefits.map(compactEvaluation),
    calculatedTaxLiabilities: calculatedLiabilities.map(compactEvaluation),
    evaluations: result.evaluations.map(compactEvaluation)
  };
}

export function buildTaxProfileRuntimeAnswers(taxContext = {}) {
  const answers = {};
  for (const row of taxRows(taxContext)) {
    const key = row.inputKey || row.input_key || row.fieldId || row.field_id;
    if (!key || row.value === undefined || row.value === null || row.value === "") continue;
    answers[key] = {
      value: row.value,
      source: row.sourceStrategy || row.sourceType || row.source || "tax_profile"
    };
  }

  addAlias(answers, "annual_taxable_sales_cents", "gross_receipts_cents");
  addAlias(answers, "taxable_gross_receipts_cents", "gross_receipts_cents");
  addAlias(answers, "taxable_room_revenue_cents", "taxable_lodging_receipts_cents");
  addAlias(answers, "taxable_room_revenue_cents", "taxable_rent_cents");
  addAlias(answers, "taxable_room_revenue_cents", "rent_cents");
  addAlias(answers, "annual_property_tax_cents", "annual_property_tax_due_cents");
  addAlias(answers, "annual_real_property_tax_due_cents", "annual_property_tax_due_cents");
  addAlias(answers, "building_square_feet", "business_square_feet");
  addAlias(answers, "leased_square_feet", "business_square_feet");
  addAlias(answers, "building_square_feet", "warehouse_square_feet");
  addAlias(answers, "leased_square_feet", "warehouse_square_feet");
  addSourceBasedLocalBusinessTaxClass(answers, taxContext);

  return answers;
}

function selectProfileLocalTaxWorkflows({ localTaxWorkflows = [], geography = {}, explicitSourceIds = new Set() }) {
  if (explicitSourceIds.size) {
    const sourceMatched = (localTaxWorkflows || []).filter((workflow) =>
      (workflow.taxGapRepairSourceIds || []).some((sourceId) => explicitSourceIds.has(sourceId))
    );
    const geographyMatched = selectLocalTaxWorkflows({ workflows: sourceMatched, geography });
    return geographyMatched.length ? geographyMatched : sourceMatched;
  }
  return selectLocalTaxWorkflows({ workflows: localTaxWorkflows, geography });
}

function selectProfileTaxGapRules({ taxGapRuntimeRules = [], explicitRuleIds = new Set(), explicitSourceIds = new Set() }) {
  if (!explicitRuleIds.size && !explicitSourceIds.size) return [];
  return (taxGapRuntimeRules || [])
    .filter((rule) => !rule.localWorkflowId)
    .filter((rule) =>
      explicitRuleIds.has(rule.taxRuleId) ||
      explicitSourceIds.has(rule.sourceSkippedRecordId)
    );
}

function taxRows(taxContext = {}) {
  const rows = [];
  for (const group of TAX_ROW_GROUPS) {
    rows.push(...arrayOf(taxContext[group]));
    rows.push(...arrayOf(taxContext.sourceForm?.[group]));
    rows.push(...arrayOf(taxContext.normalizedProfile?.tax?.[group]));
  }
  return rows;
}

function enrichTaxEvaluation(evaluation) {
  const amountCents = Number(evaluation.result?.amountCents || 0);
  const financialRole = taxFinancialRole(evaluation);
  const financialTiming = taxFinancialTiming(evaluation);
  const isIncluded = evaluation.result?.status === "calculated" && evaluation.result?.includedInUserFacingTotal === true;
  return {
    ...evaluation,
    financialRole,
    financialTiming,
    calculatedBenefitCents: evaluation.result?.status === "calculated" && financialRole === "tax_benefit" ? amountCents : 0,
    calculatedLiabilityCents: evaluation.result?.status === "calculated" && financialRole === "tax_liability" ? amountCents : 0,
    includedBenefitCents: isIncluded && financialRole === "tax_benefit" ? amountCents : 0,
    includedLiabilityCents: isIncluded && financialRole === "tax_liability" ? amountCents : 0
  };
}

function taxFinancialRole(evaluation) {
  const text = normalizeTaxText([
    evaluation.kind,
    evaluation.modelKind,
    evaluation.taxDomain,
    evaluation.taxType,
    evaluation.workflowId,
    evaluation.sourceSkippedRecordId,
    ...(evaluation.sourceSkippedRecordIds || [])
  ].filter(Boolean).join(" "));

  if (/\b(exemption|credit|abatement|deduction|rate preference|invoice discount|tax benefit)\b/.test(text)) {
    return "tax_benefit";
  }
  if (/\b(business license|gross receipts tax|commercial activity tax|parcel tax|property tax|tax due|liability)\b/.test(text)) {
    return "tax_liability";
  }
  if (evaluation.kind === "tax_gap_runtime_rule") return "tax_benefit";
  return "tax_unknown";
}

function taxFinancialTiming(evaluation) {
  const text = normalizeTaxText([
    evaluation.modelKind,
    evaluation.taxDomain,
    evaluation.taxType,
    evaluation.workflowId
  ].filter(Boolean).join(" "));

  if (/\b(business license|gross receipts|commercial activity|property tax|parcel tax|income tax|corporation business tax)\b/.test(text)) {
    return "annual_tax_filing_or_bill";
  }
  return "one_time_project_or_transaction";
}

function normalizeTaxText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[_-]+/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function taxMissingInputToFormField(input) {
  const sourceStrategy = input.sourceStrategy || input.sourceType || input.uiPlacement || null;
  const field = mapV2InputToField(
    {
      input_key: input.inputKey,
      label: input.label || input.inputKey,
      value_type: input.valueType || input.value_type,
      source_precedence: [sourceStrategy].filter(Boolean),
      missing_severity: "blocks_calculation"
    },
    { isMissing: true }
  );
  return {
    ...field,
    requiredBeforeOpportunitySelection: true,
    collectionStage: "pre_opportunity_intake",
    workflowId: input.workflowId || null,
    taxRuleId: input.taxRuleId || null,
    sourceSkippedRecordId: input.sourceSkippedRecordId || null,
    evaluationKind: input.evaluationKind || null
  };
}

function compactEvaluation(evaluation) {
  return {
    kind: evaluation.kind,
    workflowId: evaluation.workflowId || null,
    taxRuleId: evaluation.taxRuleId || null,
    sourceSkippedRecordId: evaluation.sourceSkippedRecordId || (evaluation.sourceSkippedRecordIds || [])[0] || null,
    modelKind: evaluation.modelKind || null,
    taxDomain: evaluation.taxDomain || null,
    taxType: evaluation.taxType || null,
    status: evaluation.result?.status || "unknown",
    amountCents: evaluation.result?.amountCents || 0,
    includedInUserFacingTotal: evaluation.result?.includedInUserFacingTotal === true,
    financialRole: evaluation.financialRole,
    financialTiming: evaluation.financialTiming,
    missingInputs: evaluation.result?.missingInputs || [],
    trace: evaluation.result?.trace || []
  };
}

function taxRowValues(taxContext, key) {
  return new Set(taxRows(taxContext).map((row) => row[key]).filter(Boolean));
}

function isUnsupportedOrReviewOnly(status) {
  return [
    "unsupported_runtime_model",
    "invalid_rule",
    "review_required",
    "needs_tax_bill",
    "needs_program_documentation",
    "needs_assessor_confirmation",
    "no_calculation_model"
  ].includes(status);
}

function addAlias(answers, fromKey, toKey) {
  if (answers[toKey] || !answers[fromKey]) return;
  answers[toKey] = {
    ...answers[fromKey],
    source: "tax_profile_alias"
  };
}

function addSourceBasedLocalBusinessTaxClass(answers, taxContext) {
  if (answers.local_business_tax_class) return;
  const sourceIds = taxRowValues(taxContext, "sourceSkippedRecordId");
  if (sourceIds.has("sales_use_tax_ambiguous_rule_8")) {
    answers.local_business_tax_class = {
      value: "solar_energy_system_sale_installation",
      source: "tax_gap_runtime_source_default"
    };
  } else if (sourceIds.has("skip_oh_cat_current_exclusion_amount_without_current_return_confirmation")) {
    answers.local_business_tax_class = {
      value: "ohio_cat",
      source: "tax_gap_runtime_source_default"
    };
  }
}

function dedupeMissingInputs(inputs = []) {
  const seen = new Set();
  return inputs.filter((input) => {
    const key = [
      input.inputKey,
      input.workflowId || "",
      input.taxRuleId || "",
      input.sourceSkippedRecordId || ""
    ].join("|");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function arrayOf(value) {
  return Array.isArray(value) ? value : [];
}

function sum(rows, selector) {
  return rows.reduce((total, row) => total + Number(selector(row) || 0), 0);
}
