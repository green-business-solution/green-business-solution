import fs from "node:fs";
import path from "node:path";
import { calculateLocalTaxWorkflow, selectLocalTaxWorkflows } from "../apps/api/server/savings/localTaxWorkflows.mjs";
import { evaluateTaxProfileRuntime } from "../apps/api/server/savings/taxProfileRuntime.mjs";

const repoRoot = path.resolve(import.meta.dirname, "..");
const testCasesPath = process.env.MATCHING_TEST_CASES_PATH || path.join(repoRoot, "public", "sample_matching_test_cases.json");
const packagePath =
  process.env.OPPORTUNITY_INCENTIVE_CALCULATION_PACKAGES_PATH ||
  path.join(repoRoot, "data", "opportunity_incentive_calculation_packages_v2.json");
const localTaxWorkflowPath = process.env.TAX_LOCAL_WORKFLOW_RULES_PATH || path.join(repoRoot, "data", "tax_local_workflow_rules.json");
const taxGapRuntimeRulesPath =
  process.env.TAX_GAP_RUNTIME_RULES_PATH || path.join(repoRoot, "data", "tax_gap_runtime_rules_2026-07-05.json");
const jsonReportPath =
  process.env.GRANT_TAX_COVERAGE_JSON_PATH ||
  path.join(repoRoot, "data", "test_case_grant_tax_estimate_coverage_report_2026-07-03.json");
const markdownReportPath =
  process.env.GRANT_TAX_COVERAGE_MD_PATH ||
  path.join(repoRoot, "data", "test_case_grant_tax_estimate_coverage_report_2026-07-03.md");

const testCasePayload = JSON.parse(fs.readFileSync(testCasesPath, "utf8"));
const packagePayload = JSON.parse(fs.readFileSync(packagePath, "utf8"));
const localTaxPayload = JSON.parse(fs.readFileSync(localTaxWorkflowPath, "utf8"));
const taxGapRuntimePayload = fs.existsSync(taxGapRuntimeRulesPath)
  ? JSON.parse(fs.readFileSync(taxGapRuntimeRulesPath, "utf8"))
  : { rules: [] };

const TAX_EFFECT_TYPES = new Set(["tax_credit", "tax_exemption", "tax_abatement", "tax_rate_preference", "property_tax_valuation"]);
const GRANT_CASH_CLASSIFICATIONS = new Set(["cash_grant", "reimbursement", "rebate"]);
const NON_GRANT_CASH_CLASSIFICATIONS = new Set(["loan", "financing", "technical_assistance", "tax_credit"]);
const CASH_INCENTIVE_RUNTIME_REPAIR_ACTION = "cash_incentive_runtime_repair_required";
const BLOCKED_RUNTIME_STATUSES = new Set([
  "source_inaccessible_repair_failure",
  "unavailable_archived",
  "no_calculable_value",
  "needs_repair_review",
  "custom_quote_estimate"
]);
const FORM_INPUT_STATUSES = new Set(["missing_inputs", "needs_quote", "needs_project_scope", "custom_quote_estimate"]);
const INPUT_OR_EVIDENCE_STATUSES = new Set([...FORM_INPUT_STATUSES, "needs_funding_check"]);
const POLICY_SUPPRESSED_STATUSES = new Set(["not_user_facing_default", "human_review_required", "low_confidence", "suppressed_by_policy"]);

const testCases = testCasePayload.testCases || [];
const allPackages = packagePayload.packages || [];
const localTaxWorkflows = localTaxPayload.workflows || [];
const taxGapRuntimeRules = taxGapRuntimePayload.rules || [];
const packageTaxOpportunityIds = new Set(
  allPackages
    .filter((pkg) => (pkg.effects || []).some((effect) => TAX_EFFECT_TYPES.has(effect.effect_type)))
    .map((pkg) => pkg.opportunity_id)
);

const previewRows = [];
const packageRows = [];

for (const testCase of testCases) {
  for (const retrofit of testCase.retrofits || []) {
    const preview = retrofit.savingsPreview || null;
    if (!preview) continue;
    previewRows.push({
      sampleUserId: testCase.sampleUserId,
      retrofitTypeId: retrofit.retrofitTypeId,
      status: preview.status,
      opportunityCount: retrofit.opportunityCount || 0,
      packageCount: (preview.incentiveCalculationPackageSummaries || []).length,
      upfrontSavingsCents: preview.upfrontSavingsCents || 0
    });

    for (const summary of preview.incentiveCalculationPackageSummaries || []) {
      const effects = summary.effectSummaries || [];
      const row = {
        sampleUserId: testCase.sampleUserId,
        sampleName: testCase.name || testCase.sampleUserId,
        retrofitTypeId: retrofit.retrofitTypeId,
        opportunityId: summary.opportunityId,
        programName: summary.programName,
        runtimeInclusionStatus: summary.runtimeInclusionStatus,
        outcomeClass: classifyPackageSummary(summary),
        calculationStatus: summary.calculationStatus,
        sourceStatus: summary.sourceStatus,
        confidence: summary.confidence,
        missingInputs: summary.missingInputs || [],
        defaultedInputs: summary.defaultedInputs || [],
        effectTypes: [...new Set(effects.map((effect) => effect.effectType).filter(Boolean))],
        valueModelKinds: unique(effects.map((effect) => effect.valueModelKind)),
        cashValueClassifications: unique(effects.map((effect) => effect.cashValueClassification)),
        estimateStatuses: unique(effects.map((effect) => effect.estimateStatus)),
        repairStatuses: unique(effects.map((effect) => effect.repairStatus)),
        repairedCalculationStatuses: unique(effects.map((effect) => effect.repairedCalculationStatus)),
        reasonCodes: unique(effects.flatMap((effect) => effect.reasonCodes || [])),
        humanReviewReasons: unique(effects.flatMap((effect) => effect.humanReviewReasons || [])),
        confirmedZeroTaxValue: effects.some((effect) => effect.confirmedZeroTaxValue === true),
        taxRelated: effects.some((effect) => TAX_EFFECT_TYPES.has(effect.effectType)),
        grantOrIncentiveRelated: effects.some(isGrantOrIncentiveEffect),
        grantEstimateRelated: effects.some(isGrantEstimateEffect),
        nonGrantWorkflowRelated: effects.some(isNonGrantWorkflowEffect),
        hasPositiveComputedAmount: effects.some((effect) => Number(effect.amountCents || 0) > 0),
        computedAmountCents: sum(effects, (effect) => Number(effect.amountCents || 0)),
        includedInRuntimeTotals: summary.includedInRuntimeTotals === true
      };
      const grantAction = classifyGrantProductionAction(row);
      row.grantProductionAction = grantAction.action;
      row.grantProductionReason = grantAction.reason;
      const taxAction = row.taxRelated ? classifyTaxOpportunityProductionAction(row) : null;
      row.taxOpportunityProductionAction = taxAction?.action || null;
      row.taxOpportunityProductionReason = taxAction?.reason || null;
      packageRows.push(row);
    }
  }
}

const localTaxRows = testCases.flatMap((testCase) => buildLocalTaxRows(testCase, localTaxWorkflows));
const taxProfileRuntimeRows = testCases.flatMap((testCase) => buildTaxProfileRuntimeRows(testCase, localTaxWorkflows, taxGapRuntimeRules));
const matchedTaxPackageOpportunityIds = new Set(packageRows.filter((row) => row.taxRelated).map((row) => row.opportunityId));
const grantProductionRows = packageRows.filter((row) => row.grantOrIncentiveRelated && !row.taxRelated);

const report = {
  schemaVersion: "retrofi_test_case_grant_tax_coverage_report.v1",
  generatedAt: new Date().toISOString(),
  sourceFiles: {
    testCases: path.relative(repoRoot, testCasesPath),
    packages: path.relative(repoRoot, packagePath),
    localTaxWorkflows: path.relative(repoRoot, localTaxWorkflowPath),
    taxGapRuntimeRules: fs.existsSync(taxGapRuntimeRulesPath) ? path.relative(repoRoot, taxGapRuntimeRulesPath) : null
  },
  summary: {
    testCaseCount: testCases.length,
    retrofitPreviewCount: previewRows.length,
    previewStatusCounts: countBy(previewRows, (row) => row.status),
    matchedV2PackageEvaluationCount: packageRows.length,
    runtimeInclusionStatusCounts: countBy(packageRows, (row) => row.runtimeInclusionStatus),
    outcomeClassCounts: countBy(packageRows, (row) => row.outcomeClass),
    packageEffectTypeCounts: countEffectTypes(packageRows),
    runtimeIncludedPackageCount: packageRows.filter((row) => row.includedInRuntimeTotals).length,
    computedButSuppressedPackageCount: packageRows.filter((row) => row.outcomeClass === "computed_but_suppressed").length,
    missingEvidenceOrInputPackageCount: packageRows.filter((row) => row.outcomeClass === "missing_evidence_or_inputs").length,
    grantProductionActionCounts: countBy(grantProductionRows, (row) => row.grantProductionAction),
    taxOpportunityProductionActionCounts: countBy(packageRows.filter((row) => row.taxRelated), (row) => row.taxOpportunityProductionAction),
    taxOpportunityPackageCountInDatabase: packageTaxOpportunityIds.size,
    taxOpportunityPackageCountMatchedByTestCases: matchedTaxPackageOpportunityIds.size,
    localTaxWorkflowEvaluationCount: localTaxRows.length,
    localTaxWorkflowStatusCounts: countBy(localTaxRows, (row) => row.status),
    localTaxWorkflowProductionActionCounts: countBy(localTaxRows, (row) => row.localTaxProductionAction),
    taxProfileRuntimeEvaluationCount: taxProfileRuntimeRows.length,
    taxProfileRuntimeStatusCounts: countBy(taxProfileRuntimeRows, (row) => row.status),
    taxProfileRuntimeReadyCount: taxProfileRuntimeRows.filter((row) => row.readyForOpportunityFinancialEstimate).length,
    taxProfileRuntimeIncludedBenefitCents: sum(taxProfileRuntimeRows, (row) => row.includedBenefitCents),
    taxProfileRuntimeIncludedLiabilityCents: sum(taxProfileRuntimeRows, (row) => row.includedLiabilityCents),
    taxProfileRuntimeNetIncludedAmountCents: sum(taxProfileRuntimeRows, (row) => row.includedAmountCents),
    taxProfileRuntimeMissingPreOpportunityInputCount: sum(taxProfileRuntimeRows, (row) => row.missingRequiredInputCount),
    taxProfileRuntimeStructuredModelWorkCount: taxProfileRuntimeRows.filter((row) => row.requiresStructuredTaxModelWork).length
  },
  topMissingInputs: topCounts(
    packageRows
      .filter((row) => row.outcomeClass === "missing_evidence_or_inputs")
      .flatMap((row) => row.missingInputs.map((input) => input.inputKey))
  ),
  grantAndIncentivePackageOutcomes: summarizeRows(packageRows.filter((row) => row.grantOrIncentiveRelated)),
  grantProductionActionOutcomes: summarizeGrantProductionRows(grantProductionRows),
  taxOpportunityPackageOutcomes: summarizeRows(packageRows.filter((row) => row.taxRelated)),
  taxOpportunityProductionActionOutcomes: summarizeTaxOpportunityRows(packageRows.filter((row) => row.taxRelated)),
  unmatchedTaxOpportunityPackages: [...packageTaxOpportunityIds]
    .filter((opportunityId) => !matchedTaxPackageOpportunityIds.has(opportunityId))
    .map((opportunityId) => {
      const pkg = allPackages.find((item) => item.opportunity_id === opportunityId);
      return {
        opportunityId,
        programName: pkg?.program_name || opportunityId,
        calculationStatus: pkg?.calculation_status || null,
        effectTypes: [...new Set((pkg?.effects || []).map((effect) => effect.effect_type))]
      };
    }),
  localTaxWorkflowOutcomes: summarizeLocalTaxRows(localTaxRows),
  taxProfileRuntimeOutcomes: summarizeTaxProfileRuntimeRows(taxProfileRuntimeRows),
  sampleRows: {
    missingEvidenceOrInputs: packageRows
      .filter((row) => row.outcomeClass === "missing_evidence_or_inputs")
      .slice(0, 25)
      .map(compactPackageOutcomeRow),
    computedButSuppressed: packageRows
      .filter((row) => row.outcomeClass === "computed_but_suppressed")
      .slice(0, 25)
      .map(compactPackageOutcomeRow),
    sourceOrPackageBlocked: packageRows
      .filter((row) => row.outcomeClass === "source_or_package_blocked")
      .slice(0, 25)
      .map(compactPackageOutcomeRow),
    grantProductionActions: grantProductionRows
      .filter((row) => !["production_ready_included", "not_grant_estimation_target"].includes(row.grantProductionAction))
      .map(compactGrantProductionRow)
      .slice(0, 50),
    localTaxNeedsInputOrReview: localTaxRows
      .filter((row) => !["production_ready_customer_calculation", "not_applicable_zero_value"].includes(row.localTaxProductionAction))
      .slice(0, 25),
    taxProfileRuntimeNeedsStructuredModel: taxProfileRuntimeRows
      .filter((row) => row.requiresStructuredTaxModelWork || row.missingRequiredInputCount > 0)
      .slice(0, 25)
  }
};

fs.writeFileSync(jsonReportPath, `${JSON.stringify(report, null, 2)}\n`);
fs.writeFileSync(markdownReportPath, buildMarkdownReport(report));

console.log(`Wrote grant/tax coverage JSON: ${jsonReportPath}`);
console.log(`Wrote grant/tax coverage report: ${markdownReportPath}`);
console.log(`Matched v2 package evaluations: ${report.summary.matchedV2PackageEvaluationCount}`);
console.log(`Runtime inclusion statuses: ${JSON.stringify(report.summary.runtimeInclusionStatusCounts)}`);
console.log(`Local tax workflow statuses: ${JSON.stringify(report.summary.localTaxWorkflowStatusCounts)}`);
console.log(`Local tax production actions: ${JSON.stringify(report.summary.localTaxWorkflowProductionActionCounts)}`);

function classifyPackageSummary(summary) {
  if (summary.runtimeInclusionStatus === "included") return "calculated_and_included";
  if (summary.runtimeInclusionStatus === "legacy_rule_preferred") return "legacy_rule_preferred";
  if (summary.runtimeInclusionStatus === "non_monetary_workflow") return "non_monetary_workflow";
  if (
    summary.runtimeInclusionStatus === "no_calculable_value" &&
    (summary.effectSummaries || []).some((effect) => effect.confirmedZeroTaxValue === true)
  ) {
    return "not_applicable_zero_value";
  }
  if (BLOCKED_RUNTIME_STATUSES.has(summary.runtimeInclusionStatus)) return "source_or_package_blocked";

  const hasPositiveAmount = (summary.effectSummaries || []).some((effect) => Number(effect.amountCents || 0) > 0);
  if (POLICY_SUPPRESSED_STATUSES.has(summary.runtimeInclusionStatus)) {
    return hasPositiveAmount ? "computed_but_suppressed" : "suppressed_without_amount";
  }

  if (INPUT_OR_EVIDENCE_STATUSES.has(summary.runtimeInclusionStatus) || (summary.missingInputs || []).length > 0) {
    return "missing_evidence_or_inputs";
  }

  if (summary.runtimeInclusionStatus === "no_supported_effect_amount") return "calculated_zero_or_no_supported_amount";
  return "other_suppressed";
}

function isGrantOrIncentiveEffect(effect) {
  const cashClass = effect.cashValueClassification || "";
  if (effect.effectType === "grant_expected_value") return true;
  if (GRANT_CASH_CLASSIFICATIONS.has(cashClass)) return true;
  if (effect.effectType === "one_time_savings" || effect.effectType === "recurring_savings") return true;
  return false;
}

function isGrantEstimateEffect(effect) {
  return effect.effectType === "grant_expected_value" || GRANT_CASH_CLASSIFICATIONS.has(effect.cashValueClassification || "");
}

function isNonGrantWorkflowEffect(effect) {
  return NON_GRANT_CASH_CLASSIFICATIONS.has(effect.cashValueClassification || "") || effect.effectType === "financing_subsidy";
}

function buildLocalTaxRows(testCase, workflows) {
  const geography = inferCoverageGeography(testCase);
  const answers = inferLocalTaxAnswers(testCase);
  const selected = selectLocalTaxWorkflows({ workflows, geography });

  return selected.map((workflow) => {
    const result = calculateLocalTaxWorkflow(workflow, { answers, includeCalculatedTaxInUserFacingTotals: true });
    const localTaxProductionDecision = classifyLocalTaxProductionAction({ workflow, result, answers });
    return {
      sampleUserId: testCase.sampleUserId,
      sampleName: testCase.name || testCase.sampleUserId,
      workflowId: workflow.id,
      taxDomain: workflow.taxDomain,
      taxType: workflow.taxType,
      geography,
      status: result.status,
      amountCents: result.amountCents || 0,
      includedInUserFacingTotal: result.includedInUserFacingTotal === true,
      missingInputs: result.missingInputs || [],
      localTaxProductionAction: localTaxProductionDecision.action,
      localTaxProductionReason: localTaxProductionDecision.reason,
      inferredAnswerKeys: Object.entries(answers)
        .filter(([, answer]) => answer.source === "coverage_inferred")
        .map(([key]) => key)
        .sort()
    };
  });
}

function buildTaxProfileRuntimeRows(testCase, workflows, taxGapRules) {
  if (!hasTaxRuntimeProfileData(testCase)) return [];
  const geography = inferCoverageGeography(testCase);
  const result = evaluateTaxProfileRuntime({
    taxContext: testCase,
    geography,
    localTaxWorkflows: workflows,
    taxGapRuntimeRules: taxGapRules,
    includeCalculatedTaxInUserFacingTotals: true
  });

  return result.evaluations.map((evaluation) => ({
    sampleUserId: testCase.sampleUserId,
    sampleName: testCase.name || testCase.sampleUserId,
    taxOnlyFixture: testCase.taxOnlyFixture === true,
    evaluationKind: evaluation.kind,
    workflowId: evaluation.workflowId || null,
    taxRuleId: evaluation.taxRuleId || null,
    sourceSkippedRecordId: evaluation.sourceSkippedRecordId || (evaluation.sourceSkippedRecordIds || [])[0] || null,
    modelKind: evaluation.modelKind || null,
    runtimeSupportStatus: evaluation.runtimeSupportStatus || null,
    status: evaluation.result?.status || "unknown",
    amountCents: evaluation.result?.amountCents || 0,
    includedInUserFacingTotal: evaluation.result?.includedInUserFacingTotal === true,
    financialRole: evaluation.financialRole,
    financialTiming: evaluation.financialTiming,
    includedBenefitCents: evaluation.includedBenefitCents || 0,
    includedLiabilityCents: evaluation.includedLiabilityCents || 0,
    includedAmountCents: (evaluation.includedBenefitCents || 0) - (evaluation.includedLiabilityCents || 0),
    missingRequiredInputCount: (evaluation.result?.missingInputs || []).length,
    missingInputs: evaluation.result?.missingInputs || [],
    readyForOpportunityFinancialEstimate: result.readyForOpportunityFinancialEstimate,
    requiresStructuredTaxModelWork: isUnsupportedTaxProfileRuntimeStatus(evaluation.result?.status)
  }));
}

function inferCoverageGeography(testCase) {
  const site = testCase.normalizedProfile?.site || {};
  const rawAddress = site.addressStructured?.raw || "";
  const addressParts = rawAddress.split(",").map((part) => part.trim()).filter(Boolean);
  const cityFromRaw = addressParts.length >= 3 ? addressParts[1] : null;
  const siteTaxProfile = firstPresent(
    testCase.siteTaxProfile,
    testCase.sourceForm?.siteTaxProfile,
    testCase.normalizedProfile?.tax?.siteTaxProfile
  );
  const jurisdictionCities = (siteTaxProfile?.jurisdictions || [])
    .flatMap((jurisdiction) => {
      const cityMatch = String(jurisdiction).match(/(?:City of|Town of|Village of)\s+([^,]+)/i);
      return cityMatch ? [cityMatch[1].trim()] : [];
    });
  const cities = unique([site.geo?.placeName, cityFromRaw, ...jurisdictionCities]);

  return {
    country: "US",
    stateCode: site.geo?.stateCode || site.addressStructured?.stateCode || null,
    state: site.geo?.stateCode || site.addressStructured?.stateCode || null,
    countyFips: site.geo?.countyFips || null,
    placeGeoid: site.geo?.placeGeoid || null,
    placeName: site.geo?.placeName || cities[0] || null,
    city: cities[0] || null,
    cities,
    postalCode: site.geo?.zip5 || site.addressStructured?.zip5 || null
  };
}

function hasTaxRuntimeProfileData(testCase) {
  return ["taxProfileFacts", "taxExtractedValues", "taxOpportunitySpecificInputs"].some((key) =>
    taxRows(testCase, key).length > 0
  );
}

function inferLocalTaxAnswers(testCase) {
  const answers = {};
  for (const row of [
    ...taxRows(testCase, "taxProfileFacts"),
    ...taxRows(testCase, "taxExtractedValues"),
    ...taxRows(testCase, "taxOpportunitySpecificInputs")
  ]) {
    const key = row.inputKey || row.input_key || row.fieldId || row.field_id;
    if (!key || row.value === undefined || row.value === null || row.value === "") continue;
    answers[key] = {
      value: row.value,
      source: row.sourceStrategy || row.sourceType || "synthetic_tax_profile"
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

  const buildingTypes = testCase.normalizedProfile?.site?.buildingTypes || [];
  addIfMissing(answers, "local_business_tax_class", inferLocalBusinessTaxClass(buildingTypes), "coverage_inferred");
  addIfMissing(answers, "employee_count", inferEmployeeCount(testCase), "coverage_inferred");
  addIfMissing(answers, "filing_frequency", "annual", "coverage_inferred");
  addIfMissing(answers, "transient_occupancy_indicator", buildingTypes.includes("hospitality_lodging"), "coverage_inferred");
  addIfMissing(answers, "lodging_business_or_short_term_rental_indicator", buildingTypes.includes("hospitality_lodging"), "coverage_inferred");
  addIfMissing(answers, "sb1186_fee_applies", true, "coverage_inferred");
  addIfMissing(answers, "minimum_wage_fee_applies", true, "coverage_inferred");
  addIfMissing(answers, "parcel_count", 1, "coverage_inferred");
  addIfMissing(answers, "accommodation_unit_count", inferAccommodationUnitCount(testCase), "coverage_inferred");

  return answers;
}

function taxRows(testCase, key) {
  const rows = [
    ...(Array.isArray(testCase[key]) ? testCase[key] : []),
    ...(Array.isArray(testCase.sourceForm?.[key]) ? testCase.sourceForm[key] : []),
    ...(Array.isArray(testCase.normalizedProfile?.tax?.[key]) ? testCase.normalizedProfile.tax[key] : [])
  ];
  const seen = new Set();
  return rows.filter((row) => {
    const dedupeKey = JSON.stringify(row);
    if (seen.has(dedupeKey)) return false;
    seen.add(dedupeKey);
    return true;
  });
}

function firstPresent(...values) {
  return values.find((value) => value !== undefined && value !== null && value !== "") ?? null;
}

function inferLocalBusinessTaxClass(buildingTypes = []) {
  if (buildingTypes.includes("hospitality_lodging")) return "hotel";
  if (buildingTypes.includes("restaurant_foodservice")) return "restaurant";
  if (buildingTypes.includes("retail_storefront") || buildingTypes.includes("grocery_food_retail")) return "retail";
  if (buildingTypes.includes("industrial_manufacturing")) return "manufacturing";
  if (buildingTypes.includes("warehouse_distribution") || buildingTypes.includes("warehouse_logistics")) return "warehouse";
  if (buildingTypes.includes("office_commercial")) return "general_business";
  if (buildingTypes.includes("multifamily_residential")) return "rental_unit_business_tax";
  return "general_business";
}

function inferAccommodationUnitCount(testCase) {
  const buildingTypes = testCase.normalizedProfile?.site?.buildingTypes || [];
  if (!buildingTypes.includes("hospitality_lodging")) return null;
  const squareFeet = Number(testCase.normalizedProfile?.site?.squareFootage?.value || 0);
  if (squareFeet <= 0) return 100;
  return Math.max(20, Math.round(squareFeet / 650));
}

function inferEmployeeCount(testCase) {
  const squareFeet = Number(testCase.normalizedProfile?.site?.squareFootage?.value || 0);
  const buildingTypes = testCase.normalizedProfile?.site?.buildingTypes || [];
  if (buildingTypes.includes("hospitality_lodging")) return Math.max(20, Math.round(squareFeet / 2000));
  if (buildingTypes.includes("restaurant_foodservice")) return Math.max(12, Math.round(squareFeet / 250));
  if (buildingTypes.includes("retail_storefront") || buildingTypes.includes("grocery_food_retail")) {
    return Math.max(10, Math.round(squareFeet / 5000));
  }
  if (buildingTypes.includes("industrial_manufacturing")) return Math.max(50, Math.round(squareFeet / 2500));
  if (squareFeet > 0) return Math.max(5, Math.round(squareFeet / 1500));
  return 10;
}

function addAlias(answers, sourceKey, targetKey) {
  if (answers[targetKey] || !answers[sourceKey]) return;
  answers[targetKey] = {
    value: answers[sourceKey].value,
    source: answers[sourceKey].source || "tax_profile_alias"
  };
}

function addIfMissing(answers, key, value, source) {
  if (answers[key] || value === undefined || value === null || value === "") return;
  answers[key] = { value, source };
}

function summarizeRows(rows) {
  return {
    count: rows.length,
    outcomeClassCounts: countBy(rows, (row) => row.outcomeClass),
    runtimeInclusionStatusCounts: countBy(rows, (row) => row.runtimeInclusionStatus),
    totalComputedAmountCents: sum(rows, (row) => row.computedAmountCents),
    sampleRows: rows.slice(0, 50).map(compactPackageOutcomeRow)
  };
}

function summarizeGrantProductionRows(rows) {
  const unresolvedRows = rows.filter(
    (row) => !["production_ready_included", "not_grant_estimation_target", "legacy_rule_preferred"].includes(row.grantProductionAction)
  );
  return {
    count: rows.length,
    actionCounts: countBy(rows, (row) => row.grantProductionAction),
    unresolvedActionCounts: countBy(unresolvedRows, (row) => row.grantProductionAction),
    sampleRowsByAction: groupSampleRows(unresolvedRows.map(compactGrantProductionRow), (row) => row.grantProductionAction, 12)
  };
}

function summarizeTaxOpportunityRows(rows) {
  return {
    count: rows.length,
    actionCounts: countBy(rows, (row) => row.taxOpportunityProductionAction),
    sampleRowsByAction: groupSampleRows(rows.map(compactTaxOpportunityRow), (row) => row.taxOpportunityProductionAction, 12)
  };
}

function summarizeLocalTaxRows(rows) {
  return {
    count: rows.length,
    statusCounts: countBy(rows, (row) => row.status),
    productionActionCounts: countBy(rows, (row) => row.localTaxProductionAction),
    totalComputedAmountCents: sum(rows, (row) => row.amountCents),
    sampleRows: rows.slice(0, 50)
  };
}

function summarizeTaxProfileRuntimeRows(rows) {
  return {
    count: rows.length,
    statusCounts: countBy(rows, (row) => row.status),
    evaluationKindCounts: countBy(rows, (row) => row.evaluationKind),
    readyCount: rows.filter((row) => row.readyForOpportunityFinancialEstimate).length,
    includedCount: rows.filter((row) => row.includedInUserFacingTotal).length,
    totalIncludedAmountCents: sum(rows, (row) => row.includedAmountCents),
    totalIncludedBenefitCents: sum(rows, (row) => row.includedBenefitCents),
    totalIncludedLiabilityCents: sum(rows, (row) => row.includedLiabilityCents),
    structuredModelWorkCount: rows.filter((row) => row.requiresStructuredTaxModelWork).length,
    sampleRows: rows.slice(0, 50)
  };
}

function buildMarkdownReport(data) {
  const missingCount = data.summary.missingEvidenceOrInputPackageCount;
  const matchedTaxCount = data.summary.taxOpportunityPackageCountMatchedByTestCases;
  const totalTaxCount = data.summary.taxOpportunityPackageCountInDatabase;
  const lines = [
    "# Test Case Grant/Tax Estimate Coverage",
    "",
    `Generated: ${data.generatedAt}`,
    "",
    "## Summary",
    "",
    `- Test cases: ${data.summary.testCaseCount}`,
    `- Retrofit previews: ${data.summary.retrofitPreviewCount}`,
    `- Matched v2 package evaluations: ${data.summary.matchedV2PackageEvaluationCount}`,
    `- Runtime-included packages: ${data.summary.runtimeIncludedPackageCount}`,
    `- Computed but suppressed packages: ${data.summary.computedButSuppressedPackageCount}`,
    `- Missing evidence/input packages: ${data.summary.missingEvidenceOrInputPackageCount}`,
    `- Tax opportunity packages in database: ${data.summary.taxOpportunityPackageCountInDatabase}`,
    `- Tax opportunity packages matched by current test cases: ${data.summary.taxOpportunityPackageCountMatchedByTestCases}`,
    `- Local tax workflow evaluations: ${data.summary.localTaxWorkflowEvaluationCount}`,
    `- Tax profile runtime evaluations: ${data.summary.taxProfileRuntimeEvaluationCount}`,
    `- Tax profile runtime ready rows: ${data.summary.taxProfileRuntimeReadyCount}`,
    `- Tax profile included benefits: ${formatCents(data.summary.taxProfileRuntimeIncludedBenefitCents)}`,
    `- Tax profile included liabilities: ${formatCents(data.summary.taxProfileRuntimeIncludedLiabilityCents)}`,
    `- Tax profile net impact: ${formatCents(data.summary.taxProfileRuntimeNetIncludedAmountCents)}`,
    "",
    "## Runtime Inclusion Status",
    "",
    tableFromCounts(data.summary.runtimeInclusionStatusCounts),
    "",
    "## Outcome Classes",
    "",
    tableFromCounts(data.summary.outcomeClassCounts),
    "",
    "## Local Tax Workflow Status",
    "",
    tableFromCounts(data.summary.localTaxWorkflowStatusCounts),
    "",
    "## Local Tax Production Action Buckets",
    "",
    tableFromCounts(data.summary.localTaxWorkflowProductionActionCounts),
    "",
    "## Tax Profile Runtime Status",
    "",
    tableFromCounts(data.summary.taxProfileRuntimeStatusCounts),
    "",
    "## Tax Opportunity Production Action Buckets",
    "",
    tableFromCounts(data.summary.taxOpportunityProductionActionCounts),
    "",
    "## Grant Production Action Buckets",
    "",
    tableFromCounts(data.summary.grantProductionActionCounts),
    "",
    "## Unresolved Grant Production Samples",
    "",
    grantProductionSampleTable(data.sampleRows.grantProductionActions),
    "",
    "## Top Missing Inputs",
    "",
    tableFromPairs(data.topMissingInputs, ["Input", "Count"]),
    "",
    "## Unmatched Tax Opportunity Packages",
    "",
    data.unmatchedTaxOpportunityPackages.length
      ? table(
          ["Opportunity", "Program", "Status", "Effects"],
          data.unmatchedTaxOpportunityPackages.map((row) => [
            row.opportunityId,
            row.programName,
            row.calculationStatus || "",
            row.effectTypes.join(", ")
          ])
        )
      : "All tax opportunity packages were matched by at least one test-case retrofit.",
    "",
    "## Interpretation",
    "",
    matchedTaxCount === 0
      ? `- The current ${data.summary.testCaseCount} test cases exercise grant/incentive packages, but they do not currently match the ${totalTaxCount} tax opportunity packages.`
      : `- The current ${data.summary.testCaseCount} test cases now match ${matchedTaxCount} of ${totalTaxCount} tax opportunity packages.`,
    "- Local tax workflows can be selected for some test-case addresses after city inference; calculated rows are customer-facing once mandatory pre-opportunity tax inputs are present.",
    "- Local tax rows classified as `tax_return_input_required`, `tax_bill_upload_required`, `assessor_confirmation_required`, or `program_document_required` are mandatory pre-opportunity intake requirements, not optional post-scenario gates.",
    "- Tax profile runtime rows marked `unsupported_runtime_model` have complete profile inputs but still need a structured formula/model before they can create a customer-facing tax amount.",
    "- Tax opportunity rows classified as `not_applicable_zero_value` are resolved to $0 by current test-case facts; rows classified as `assessor_confirmation_required` need a property-tax profile or assessor confirmation before customer-facing savings.",
    "- Grant/incentive rows classified as `form_input_required` are normal production form gates, not source-data blockers.",
    "- Grant/incentive rows classified as `funding_refresh_required` need current budget/funding status automation rather than one-time formula repair.",
    "- Grant/incentive rows classified as `zero_placeholder_no_calculable_value` should contribute $0 to customer-facing grant totals unless later source research finds a defensible formula or expected-value model.",
    "- Grant/incentive rows classified as `non_grant_workflow` should be handled outside the grant estimator, such as financing, technical assistance, tariff, or non-monetary workflows.",
    "- Grant/incentive rows classified as `archive_or_exclude` should be archived, hidden, or repaired only if an official source becomes available.",
    "- Packages classified as `computed_but_suppressed` have enough runtime inputs to produce an internal amount, but are held out because of low confidence, review flags, or default user-facing inclusion policy.",
    "- Packages classified as `source_or_package_blocked` need source/data repair or intentional archive/suppression decisions, not UI fields.",
    missingCount === 0
      ? "- No packages are currently classified as missing evidence/input repair gaps."
      : "- Packages classified as `missing_evidence_or_inputs` need quote, funding-status, project-scope, award, or runtime-document inputs before they can safely enter customer-facing totals."
  ];

  return `${lines.join("\n")}\n`;
}

function classifyGrantProductionAction(row) {
  const decisionText = [
    row.runtimeInclusionStatus,
    row.calculationStatus,
    row.sourceStatus,
    ...(row.estimateStatuses || []),
    ...(row.repairStatuses || []),
    ...(row.repairedCalculationStatuses || []),
    ...(row.reasonCodes || []),
    ...(row.humanReviewReasons || [])
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (row.includedInRuntimeTotals) {
    return {
      action: "production_ready_included",
      reason: "The package already contributes a supported runtime amount."
    };
  }

  if (!row.grantEstimateRelated) {
    return {
      action: "not_grant_estimation_target",
      reason: "The row is an incentive workflow, but not a grant/rebate/reimbursement estimate target."
    };
  }

  if (row.runtimeInclusionStatus === "legacy_rule_preferred") {
    return {
      action: "legacy_rule_preferred",
      reason: "A legacy rule is intentionally preferred for this opportunity to avoid double counting."
    };
  }

  if (FORM_INPUT_STATUSES.has(row.runtimeInclusionStatus) || row.missingInputs.length > 0) {
    return {
      action: "form_input_required",
      reason: "The source-backed rule needs user, quote, bill, filing, or project-scope inputs before estimating."
    };
  }

  if (row.runtimeInclusionStatus === "needs_funding_check" || decisionText.includes("needs_funding_check")) {
    return {
      action: "funding_refresh_required",
      reason: "The estimate depends on current funding availability, waitlist, or while-funds-last status."
    };
  }

  if (row.nonGrantWorkflowRelated || row.runtimeInclusionStatus === "non_monetary_workflow" || isClearlyNonGrantWorkflow(row)) {
    return {
      action: "non_grant_workflow",
      reason: "The opportunity is better handled outside grant estimation."
    };
  }

  if (
    row.runtimeInclusionStatus === "source_inaccessible_repair_failure" ||
    row.runtimeInclusionStatus === "unavailable_archived" ||
    decisionText.includes("source_inaccessible") ||
    decisionText.includes("program_closed") ||
    decisionText.includes("unavailable_archived")
  ) {
    return {
      action: "archive_or_exclude",
      reason: "The source is inaccessible, unavailable, closed, or otherwise not reliable enough to show."
    };
  }

  if (row.runtimeInclusionStatus === "no_calculable_value" || decisionText.includes("no_calculable_value")) {
    return {
      action: "zero_placeholder_no_calculable_value",
      reason: "No defensible formula or expected-value model exists, so the grant contribution should remain $0."
    };
  }

  if (row.runtimeInclusionStatus === "no_supported_effect_amount") {
    return {
      action: CASH_INCENTIVE_RUNTIME_REPAIR_ACTION,
      reason: "The package is grant/rebate-related but has no supported monetary effect amount."
    };
  }

  if (row.runtimeInclusionStatus === "human_review_required") {
    return {
      action: CASH_INCENTIVE_RUNTIME_REPAIR_ACTION,
      reason: "The package still needs source-backed rule/probability repair or conversion into explicit form inputs."
    };
  }

  if (["low_confidence", "suppressed_by_policy", "not_user_facing_default"].includes(row.runtimeInclusionStatus)) {
    return {
      action: CASH_INCENTIVE_RUNTIME_REPAIR_ACTION,
      reason: "The package is grant/rebate-related but policy or confidence metadata still prevents a production estimate."
    };
  }

  return {
    action: CASH_INCENTIVE_RUNTIME_REPAIR_ACTION,
    reason: "The package needs explicit grant-estimator handling for its current runtime status."
  };
}

function classifyTaxOpportunityProductionAction(row) {
  if (row.includedInRuntimeTotals) {
    return {
      action: "production_ready_included",
      reason: "The tax package contributes a supported runtime amount."
    };
  }

  if (row.confirmedZeroTaxValue || (row.runtimeInclusionStatus === "no_calculable_value" && Number(row.computedAmountCents || 0) === 0)) {
    return {
      action: "not_applicable_zero_value",
      reason: "The package is resolved to $0 by confirmed tax gates, such as no approved designation or no qualifying tax base."
    };
  }

  if (row.effectTypes.includes("property_tax_valuation") || row.estimateStatuses.includes("needs_property_tax_profile")) {
    return {
      action: "assessor_confirmation_required",
      reason: "The tax rule can compute statutory treatment, but monetary savings require local assessor confirmation and counterfactual property-tax treatment."
    };
  }

  if (row.runtimeInclusionStatus === "missing_inputs" || row.missingInputs.length > 0) {
    return {
      action: "tax_profile_or_document_required",
      reason: "The package needs tax profile, return, bill, or program-document fields before calculation."
    };
  }

  if (row.runtimeInclusionStatus === "human_review_required") {
    return {
      action: "tax_review_required",
      reason: "The tax package is still review-gated before a customer-facing amount can be included."
    };
  }

  return {
    action: "not_user_facing_tax_workflow",
    reason: "The tax package is intentionally outside ordinary customer-facing savings totals."
  };
}

function compactTaxOpportunityRow(row) {
  return {
    sampleUserId: row.sampleUserId,
    sampleName: row.sampleName,
    retrofitTypeId: row.retrofitTypeId,
    opportunityId: row.opportunityId,
    programName: row.programName,
    runtimeInclusionStatus: row.runtimeInclusionStatus,
    outcomeClass: row.outcomeClass,
    effectTypes: row.effectTypes,
    valueModelKinds: row.valueModelKinds,
    estimateStatuses: row.estimateStatuses,
    confirmedZeroTaxValue: row.confirmedZeroTaxValue,
    computedAmountCents: row.computedAmountCents,
    taxOpportunityProductionAction: row.taxOpportunityProductionAction,
    taxOpportunityProductionReason: row.taxOpportunityProductionReason
  };
}

function classifyLocalTaxProductionAction({ workflow, result, answers }) {
  if (result.status === "calculated") {
    return {
      action: "production_ready_customer_calculation",
      reason: "The local tax formula calculated from source-backed rules after mandatory pre-opportunity tax inputs were supplied."
    };
  }

  if (workflow.id.includes("rerz")) {
    const disqualified = [
      "approved_rerz_designation",
      "qualified_company_operations",
      "parcel_or_facility_within_approved_zone_boundary"
    ].some((key) => answerBoolean(answers, key) === false);
    if (disqualified) {
      return {
        action: "not_applicable_zero_value",
        reason: "The test-case tax facts show the required RERZ designation or qualified operations are not confirmed, so the tax benefit is zero."
      };
    }
    return {
      action: "program_document_required",
      reason: "The RERZ benefit requires approved zone documents, boundary confirmation, phaseout schedule, and eligible tax lines."
    };
  }

  if (result.status === "needs_tax_return" || missingInputKeys(result).some(isTaxReturnInputKey)) {
    return {
      action: "tax_return_input_required",
      reason: "The formula is source-backed, but the tax base must come from a business tax return, accounting system, or user/accountant entry."
    };
  }

  if (result.status === "needs_tax_bill" || workflow.calculationStatus === "calculable_with_tax_bill") {
    return {
      action: "tax_bill_upload_required",
      reason: "Final property-tax calculations require a current tax bill, parcel/APN, levy lines, or licensed bill-line source."
    };
  }

  if (workflow.id.includes("ri_renewable_property_tax") || workflow.calculationStatus === "assessor_or_accountant_review_required") {
    return {
      action: "assessor_confirmation_required",
      reason: "The statutory formula is known, but customer-facing savings require assessor-confirmed applicability and counterfactual local tax treatment."
    };
  }

  if (result.status === "source_inaccessible") {
    return {
      action: "source_repair_or_archive_required",
      reason: "The workflow source is inaccessible and should be repaired or archived before use."
    };
  }

  return {
    action: "tax_profile_input_required",
    reason: "The workflow needs additional tax profile inputs before it can calculate."
  };
}

function isUnsupportedTaxProfileRuntimeStatus(status) {
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

function missingInputKeys(result) {
  return (result.missingInputs || []).map((input) => input.inputKey).filter(Boolean);
}

function isTaxReturnInputKey(inputKey) {
  const normalized = normalizeKeyText(inputKey);
  return (
    normalized.includes("gross_receipts") ||
    normalized.includes("gross_income") ||
    normalized.includes("taxable_receipts") ||
    normalized.includes("taxable_sales") ||
    normalized.includes("taxable_income") ||
    normalized.includes("tax_return") ||
    normalized.includes("filing")
  );
}

function answerBoolean(answers, key) {
  const value = answers?.[key]?.value;
  if (typeof value === "boolean") return value;
  const normalized = String(value ?? "").trim().toLowerCase();
  if (["true", "yes", "y", "1", "applies", "confirmed"].includes(normalized)) return true;
  if (["false", "no", "n", "0", "does_not_apply", "not_applicable", "none"].includes(normalized)) return false;
  return null;
}

function normalizeKeyText(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function countBy(rows, keyFn) {
  return rows.reduce((counts, row) => {
    const key = keyFn(row) || "unknown";
    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, {});
}

function countEffectTypes(rows) {
  const counts = {};
  for (const row of rows) {
    for (const effectType of row.effectTypes || []) counts[effectType] = (counts[effectType] || 0) + 1;
  }
  return counts;
}

function topCounts(values, limit = 25) {
  return Object.entries(
    values.filter(Boolean).reduce((counts, value) => {
      counts[value] = (counts[value] || 0) + 1;
      return counts;
    }, {})
  )
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([value, count]) => ({ value, count }));
}

function tableFromCounts(counts) {
  return tableFromPairs(
    Object.entries(counts || {})
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([value, count]) => ({ value, count })),
    ["Status", "Count"]
  );
}

function formatCents(value) {
  const cents = Number(value || 0);
  const sign = cents < 0 ? "-" : "";
  return `${sign}$${(Math.abs(cents) / 100).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
}

function tableFromPairs(rows, headers) {
  if (!rows.length) return "_None._";
  return table(headers, rows.map((row) => [row.value, row.count]));
}

function grantProductionSampleTable(rows) {
  if (!rows.length) return "_None._";
  return table(
    ["Action", "Opportunity", "Program", "Runtime status", "Reason"],
    dedupeGrantProductionRows(rows).slice(0, 25).map((row) => [
      row.grantProductionAction,
      row.opportunityId,
      row.programName,
      row.runtimeInclusionStatus,
      row.grantProductionReason
    ])
  );
}

function compactGrantProductionRow(row) {
  return {
    sampleUserId: row.sampleUserId,
    sampleName: row.sampleName,
    retrofitTypeId: row.retrofitTypeId,
    opportunityId: row.opportunityId,
    programName: row.programName,
    runtimeInclusionStatus: row.runtimeInclusionStatus,
    outcomeClass: row.outcomeClass,
    calculationStatus: row.calculationStatus,
    sourceStatus: row.sourceStatus,
    confidence: row.confidence,
    effectTypes: row.effectTypes,
    valueModelKinds: row.valueModelKinds,
    cashValueClassifications: row.cashValueClassifications,
    estimateStatuses: row.estimateStatuses,
    repairStatuses: row.repairStatuses,
    reasonCodes: row.reasonCodes,
    humanReviewReasons: row.humanReviewReasons,
    missingInputs: row.missingInputs,
    defaultedInputKeys: (row.defaultedInputs || []).map((input) => input.inputKey).filter(Boolean),
    computedAmountCents: row.computedAmountCents,
    grantProductionAction: row.grantProductionAction,
    grantProductionReason: row.grantProductionReason
  };
}

function compactPackageOutcomeRow(row) {
  return {
    sampleUserId: row.sampleUserId,
    sampleName: row.sampleName,
    retrofitTypeId: row.retrofitTypeId,
    opportunityId: row.opportunityId,
    programName: row.programName,
    runtimeInclusionStatus: row.runtimeInclusionStatus,
    outcomeClass: row.outcomeClass,
    calculationStatus: row.calculationStatus,
    sourceStatus: row.sourceStatus,
    confidence: row.confidence,
    missingInputKeys: (row.missingInputs || []).map((input) => input.inputKey).filter(Boolean),
    defaultedInputKeys: (row.defaultedInputs || []).map((input) => input.inputKey).filter(Boolean),
    effectTypes: row.effectTypes,
    valueModelKinds: row.valueModelKinds,
    cashValueClassifications: row.cashValueClassifications,
    estimateStatuses: row.estimateStatuses,
    repairStatuses: row.repairStatuses,
    taxRelated: row.taxRelated,
    grantEstimateRelated: row.grantEstimateRelated,
    confirmedZeroTaxValue: row.confirmedZeroTaxValue,
    computedAmountCents: row.computedAmountCents,
    includedInRuntimeTotals: row.includedInRuntimeTotals,
    grantProductionAction: row.grantProductionAction,
    grantProductionReason: row.grantProductionReason,
    taxOpportunityProductionAction: row.taxOpportunityProductionAction,
    taxOpportunityProductionReason: row.taxOpportunityProductionReason
  };
}

function isClearlyNonGrantWorkflow(row) {
  return /\b(feed[-\s]?in|fit|tariff|rate|financ|loan|technical assistance|permit|interconnection|on[-\s]?bill)\b/i.test(
    row.programName || ""
  );
}

function dedupeGrantProductionRows(rows) {
  const seen = new Set();
  return rows.filter((row) => {
    const key = `${row.grantProductionAction}|${row.opportunityId}|${row.runtimeInclusionStatus}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function table(headers, rows) {
  return [
    `| ${headers.join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${row.map((value) => String(value ?? "").replace(/\|/g, "\\|")).join(" | ")} |`)
  ].join("\n");
}

function sum(rows, valueFn) {
  return rows.reduce((total, row) => total + Number(valueFn(row) || 0), 0);
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function groupSampleRows(rows, keyFn, limitPerGroup) {
  const groups = {};
  for (const row of rows) {
    const key = keyFn(row) || "unknown";
    groups[key] ||= [];
    if (groups[key].length < limitPerGroup) groups[key].push(row);
  }
  return groups;
}
