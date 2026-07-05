import { calculateLocalTaxWorkflow, selectLocalTaxWorkflows } from "./localTaxWorkflows.mjs";
import { calculateTaxGapRuntimeRule } from "./taxGapRuntime.mjs";

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

  const evaluations = [...localWorkflowResults, ...taxGapRuleResults];
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

  return {
    schemaVersion: TAX_PROFILE_RUNTIME_SCHEMA_VERSION,
    inputPolicy: "mandatory_pre_opportunity_tax_inputs",
    includeCalculatedTaxInUserFacingTotals,
    answerCount: Object.keys(answers).length,
    selectedLocalWorkflowCount: selectedLocalWorkflows.length,
    selectedTaxGapRuntimeRuleCount: genericTaxGapRules.length,
    evaluations,
    missingRequiredInputs,
    totals: {
      calculatedAmountCents: sum(calculatedResults, (evaluation) => evaluation.result?.amountCents || 0),
      includedAmountCents: sum(includedResults, (evaluation) => evaluation.result?.amountCents || 0),
      calculatedCount: calculatedResults.length,
      includedCount: includedResults.length,
      missingRequiredInputCount: missingRequiredInputs.length,
      unsupportedOrReviewOnlyCount: unsupportedResults.length
    },
    readyForOpportunityFinancialEstimate: missingRequiredInputs.length === 0 && unsupportedResults.length === 0,
    requiresStructuredTaxModelWork: unsupportedResults.length > 0
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
