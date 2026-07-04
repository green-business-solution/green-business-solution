import crypto from "node:crypto";
import { calculateV2IncentivePackage, validateIncentiveCalculationPackageV2 } from "./incentiveCalculationsV2.mjs";
import { buildV2FormInputFields } from "./v2InputFieldCatalog.mjs";
import { buildV2ResolvedRuntimeContext } from "./v2InputResolution.mjs";

const ALWAYS_BLOCKED_PACKAGE_STATUSES = new Set([
  "source_inaccessible_repair_failure",
  "unavailable_archived"
]);

const LEGACY_BLOCKED_PACKAGE_STATUSES = new Set([
  "non_monetary_workflow",
  "no_calculable_value",
  "needs_repair_review",
  "custom_quote_estimate"
]);

const TAX_EFFECT_TYPES = new Set([
  "tax_credit",
  "tax_exemption",
  "tax_abatement",
  "tax_rate_preference",
  "property_tax_valuation"
]);

const MONETARY_EFFECT_TYPES = new Set([
  "one_time_savings",
  "recurring_savings",
  "recurring_expense",
  "grant_expected_value",
  ...TAX_EFFECT_TYPES,
  "financing_subsidy"
]);

export function buildV2RuntimeIncentiveBridge({
  packages = [],
  existingLegacyRules = [],
  ctx = {}
}) {
  const legacyOpportunityIds = new Set(existingLegacyRules.map((rule) => rule.opportunityId).filter(Boolean));
  const runtimeRules = [];
  const packageSummaries = [];

  for (const pkg of packages || []) {
    const augmentedCtx = augmentRuntimeContext(buildV2ResolvedRuntimeContext(ctx, [pkg]));
    const validation = validateIncentiveCalculationPackageV2(pkg);
    if (!validation.valid) {
      packageSummaries.push({
        opportunityId: pkg?.opportunity_id || null,
        programName: pkg?.program_name || pkg?.opportunity_id || "Unknown opportunity",
        calculationStatus: pkg?.calculation_status || "invalid",
        runtimeInclusionStatus: "invalid_package",
        includedInRuntimeTotals: false,
        validationErrors: validation.errors,
        missingInputs: [],
        requiredInputs: []
      });
      continue;
    }

    const result = calculateV2IncentivePackage(pkg, augmentedCtx);
    const summary = summarizePackageRuntimeStatus({
      pkg,
      result,
      ctx: augmentedCtx,
      legacyRulePreferred: legacyOpportunityIds.has(pkg.opportunity_id)
    });

    if (summary.runtimeInclusionStatus === "included") {
      const rules = buildRuntimeRulesForPackage({ pkg, result });
      runtimeRules.push(...rules);
      summary.runtimeRuleIds = rules.map((rule) => rule.id);
      summary.includedInRuntimeTotals = rules.length > 0;
      if (rules.length === 0) summary.runtimeInclusionStatus = "no_supported_effect_amount";
    }

    packageSummaries.push(summary);
  }

  return {
    runtimeRules,
    packageSummaries,
    counts: {
      matchedPackageCount: packageSummaries.length,
      runtimeRuleCount: runtimeRules.length,
      includedPackageCount: packageSummaries.filter((summary) => summary.includedInRuntimeTotals).length,
      missingInputPackageCount: packageSummaries.filter((summary) => summary.runtimeInclusionStatus === "missing_inputs").length,
      legacyPreferredPackageCount: packageSummaries.filter((summary) => summary.runtimeInclusionStatus === "legacy_rule_preferred").length,
      suppressedPackageCount: packageSummaries.filter((summary) => !summary.includedInRuntimeTotals).length
    }
  };
}

export function selectV2PackagesForRetrofitGroup(retrofitGroup, packages = []) {
  if (!retrofitGroup?.opportunities?.length || !packages.length) return [];
  const opportunityIds = new Set(retrofitGroup.opportunities.map((opportunity) => opportunity.opportunityId).filter(Boolean));
  return packages.filter((pkg) => opportunityIds.has(pkg.opportunity_id));
}

function summarizePackageRuntimeStatus({ pkg, result, ctx, legacyRulePreferred }) {
  const inputRequirements = inputRequirementsForPackage(pkg);
  const requiredInputs = inputRequirements.map((input) => input.input_key).filter(Boolean);
  const missingInputs = dedupeMissingInputs(result.missingInputs || []);
  const effectSummaries = (pkg.effects || []).map((effect) => {
    const effectResult = result.effectResults.find((item) => item.effectId === effect.effect_id);
    return {
      effectId: effect.effect_id,
      label: effect.label || effect.effect_id,
      effectType: effect.effect_type,
      calculationMethod: effect.calculation?.method || "unknown",
      valueModelKind: effect.repair_metadata?.value_model_kind || null,
      cashValueClassification: effect.repair_metadata?.cash_value_classification || null,
      includedInUserFacingTotalDefault: effect.repair_metadata?.included_in_user_facing_total_default === true,
      repairStatus: effect.repair_metadata?.repair_status || null,
      repairedCalculationStatus: effect.repair_metadata?.calculation_status || null,
      estimateStatus: repairEstimateStatus(effect),
      hasProductionDecision: hasProductionDecisionMetadata(effect),
      reasonCodes: repairReasonCodes(effect),
      humanReviewReasons: effect.repair_metadata?.human_review_reasons || [],
      confirmedZeroTaxValue: isConfirmedZeroTaxValue(effect, ctx),
      probabilityDiscount: Number.isFinite(effect.calculation?.probability_discount)
        ? Number(effect.calculation.probability_discount)
        : null,
      conditionalAwardCents: Number.isFinite(effect.calculation?.conditional_award_cents)
        ? Number(effect.calculation.conditional_award_cents)
        : null,
      potentialAwardCents: potentialAwardCents(effect),
      userFacingLabel: repairDisplayRecommendation(effect).label,
      userFacingCaveat: repairDisplayRecommendation(effect).caveat,
      runtimeEligibleForTotals: isRuntimeEffectEligibleForTotals(effect),
      humanReviewRequired: effect.repair_metadata?.human_review_required === true,
      amountCents: effectResult?.amountCents || 0,
      annualizedAmountCents: effectResult?.annualizedAmountCents || 0,
      missingInputs: missingInputs.filter((input) => input.effectId === effect.effect_id)
    };
  });
  const resolvedInputs = summarizeResolvedInputs(ctx.v2ResolvedInputs || [], requiredInputs);

  const summary = {
    opportunityId: pkg.opportunity_id,
    programName: pkg.program_name || pkg.opportunity_id,
    calculationStatus: pkg.calculation_status,
    sourceStatus: pkg.availability?.source_access_status || null,
    confidence: confidenceLabel(pkg.confidence?.overall),
    includedInRuntimeTotals: false,
    runtimeInclusionStatus: "not_evaluated",
    missingInputs,
    requiredInputs,
    formInputFields: buildV2FormInputFields({ requiredInputs, missingInputs, inputRequirements }),
    resolvedInputs,
    defaultedInputs: resolvedInputs.filter((input) => input.defaultIsPlaceholder),
    totals: result.totals,
    effectSummaries
  };

  const hasRuntimeEligibleEffect = effectSummaries.some((effect) => effect.runtimeEligibleForTotals);
  const hasHumanReviewRequiredEffect = effectSummaries.some(
    (effect) => MONETARY_EFFECT_TYPES.has(effect.effectType) && effect.humanReviewRequired
  );
  const hasSupportedEffectAmount = effectSummaries.some(
    (effect) => effect.runtimeEligibleForTotals && MONETARY_EFFECT_TYPES.has(effect.effectType) && Math.abs(effect.amountCents) > 0
  );
  const hasConfirmedZeroTaxValue = effectSummaries.some(
    (effect) => TAX_EFFECT_TYPES.has(effect.effectType) && effect.confirmedZeroTaxValue
  );

  if (legacyRulePreferred) {
    summary.runtimeInclusionStatus = "legacy_rule_preferred";
  } else if (ALWAYS_BLOCKED_PACKAGE_STATUSES.has(pkg.calculation_status)) {
    summary.runtimeInclusionStatus = pkg.calculation_status;
  } else if (productionDecisionRuntimeStatus(effectSummaries, pkg)) {
    summary.runtimeInclusionStatus = productionDecisionRuntimeStatus(effectSummaries, pkg);
  } else if (legacyPackageBlockStatus(pkg, effectSummaries)) {
    summary.runtimeInclusionStatus = legacyPackageBlockStatus(pkg, effectSummaries);
  } else if (confidenceLabel(pkg.confidence?.overall) === "low") {
    summary.runtimeInclusionStatus = "low_confidence";
  } else if (hasConfirmedZeroTaxValue && !hasSupportedEffectAmount) {
    summary.runtimeInclusionStatus = "no_calculable_value";
  } else if (hasHumanReviewRequiredEffect) {
    summary.runtimeInclusionStatus = "human_review_required";
  } else if (missingInputs.length > 0) {
    summary.runtimeInclusionStatus = "missing_inputs";
  } else if (!hasRuntimeEligibleEffect) {
    summary.runtimeInclusionStatus = "not_user_facing_default";
  } else if (!hasSupportedEffectAmount) {
    summary.runtimeInclusionStatus = "no_supported_effect_amount";
  } else {
    summary.runtimeInclusionStatus = "included";
  }

  return summary;
}

function buildRuntimeRulesForPackage({ pkg, result }) {
  const rules = [];
  for (const effect of pkg.effects || []) {
    if (!isRuntimeEffectEligibleForTotals(effect)) continue;
    if (!MONETARY_EFFECT_TYPES.has(effect.effect_type)) continue;
    const effectResult = result.effectResults.find((item) => item.effectId === effect.effect_id);
    if (!effectResult || Math.abs(effectResult.amountCents) <= 0) continue;
    const timing = runtimeTiming(effect.timing);
    if (!timing) continue;

    rules.push({
      id: `oir_v2_${shortHash(`${pkg.opportunity_id}|${effect.effect_id}`)}_v1`,
      version: 1,
      opportunityId: pkg.opportunity_id,
      name: effect.label || pkg.program_name || pkg.opportunity_id,
      incentiveType: runtimeIncentiveType(effect),
      timing,
      recurringEffect: effect.effect_type === "recurring_expense" ? "expense" : undefined,
      amountRule: { kind: "fixed_amount", amountCents: Math.round(Math.abs(effectResult.amountCents)) },
      basisPolicy: { basis: "gross_project_cost", applicationOrder: 10 },
      active: true,
      confidence: confidenceLabel(effect.confidence?.overall ?? pkg.confidence?.overall),
      source: "gpt_pro_incentive_formula_rate_table_repair",
      extractionMethod: "gpt_pro_formula_rate_table_v2_runtime_bridge",
      formula: effect.calculation?.method || null,
      evidenceText: effect.label || "",
      requiredInputs: (effect.required_inputs || []).map((input) => input.input_key).filter(Boolean),
      valueModelKind: effect.repair_metadata?.value_model_kind || null,
      cashValueClassification: effect.repair_metadata?.cash_value_classification || null,
      v2CalculationPackage: {
        opportunityId: pkg.opportunity_id,
        effectId: effect.effect_id,
        calculationStatus: pkg.calculation_status,
        amountCents: effectResult.amountCents,
        annualizedAmountCents: effectResult.annualizedAmountCents,
        trace: effectResult.trace || []
      }
    });
  }
  return rules;
}

function isRuntimeEffectEligibleForTotals(effect) {
  if (effect.repair_metadata?.included_in_user_facing_total_default === true) return true;
  if (!TAX_EFFECT_TYPES.has(effect.effect_type)) {
    return false;
  }
  if (effect.repair_metadata?.human_review_required === true) return false;
  return effect.calculation?.method && effect.calculation.method !== "zero_when_not_applicable";
}

function productionDecisionRuntimeStatus(effectSummaries, pkg) {
  const repairedGrantOrTaxEffects = effectSummaries.filter(
    (effect) => effect.hasProductionDecision && isGrantTaxOrRepairedCashEffect(effect)
  );
  if (!repairedGrantOrTaxEffects.length) return null;

  if (
    repairedGrantOrTaxEffects.some((effect) => effect.confirmedZeroTaxValue) &&
    repairedGrantOrTaxEffects.every((effect) => Number(effect.amountCents || 0) === 0)
  ) {
    return "no_calculable_value";
  }

  if (repairedGrantOrTaxEffects.some((effect) => effect.runtimeEligibleForTotals && Number(effect.amountCents || 0) > 0)) {
    return null;
  }

  const decisionText = repairedGrantOrTaxEffects
    .flatMap((effect) => [
      effect.estimateStatus,
      effect.repairStatus,
      effect.repairedCalculationStatus,
      ...(effect.reasonCodes || []),
      ...(effect.humanReviewReasons || [])
    ])
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (decisionText.includes("needs_quote") || decisionText.includes("quote_required") || decisionText.includes("custom_quote") || decisionText.includes("invoice_required")) {
    return "needs_quote";
  }
  if (decisionText.includes("needs_funding_check")) return "needs_funding_check";
  if (/\b(needs_accountant_review|needs_property_tax_profile|tax_or_assessor_review_required|suppressed_until_program_documentation)\b/.test(decisionText)) {
    return "human_review_required";
  }
  if (/\b(non_grant_workflow|not_grant_estimation_target|outside_grant_estimator|not_a_grant)\b/.test(decisionText)) {
    return "non_monetary_workflow";
  }
  if (decisionText.includes("zero_value") || decisionText.includes("no_calculable_value") || /\bnot_calculable\b/.test(decisionText)) {
    return "no_calculable_value";
  }
  if (
    decisionText.includes("needs_project_scope") ||
    decisionText.includes("needs_project_inputs") ||
    decisionText.includes("formula_status_needs_user_input") ||
    repairedGrantOrTaxEffects.some((effect) => (effect.missingInputs || []).length > 0)
  ) {
    return "needs_project_scope";
  }
  if (decisionText.includes("suppressed") || decisionText.includes("exclude_from_user_facing") || decisionText.includes("do_not_include")) {
    return "suppressed_by_policy";
  }
  if (repairedGrantOrTaxEffects.some((effect) => effect.effectType === "grant_expected_value" || isGrantOrReimbursementEffect(effect))) {
    return "suppressed_by_policy";
  }
  if (repairedGrantOrTaxEffects.some((effect) => effect.humanReviewRequired)) return "human_review_required";
  if (LEGACY_BLOCKED_PACKAGE_STATUSES.has(pkg.calculation_status)) return "not_user_facing_default";
  return null;
}

function legacyPackageBlockStatus(pkg, effectSummaries) {
  if (!LEGACY_BLOCKED_PACKAGE_STATUSES.has(pkg.calculation_status)) return null;
  const hasTaxMonetaryEffect = effectSummaries.some((effect) => TAX_EFFECT_TYPES.has(effect.effectType));
  const hasRepairedGrantOrTaxDecision = effectSummaries.some(
    (effect) => effect.hasProductionDecision && isGrantTaxOrRepairedCashEffect(effect)
  );
  if (pkg.calculation_status === "custom_quote_estimate" && effectSummaries.some(isGrantOrReimbursementEffect)) {
    return "needs_quote";
  }
  if (hasRepairedGrantOrTaxDecision || hasTaxMonetaryEffect) return null;
  return pkg.calculation_status;
}

function isGrantTaxOrRepairedCashEffect(effect) {
  return effect.effectType === "grant_expected_value" || TAX_EFFECT_TYPES.has(effect.effectType) || isGrantOrReimbursementEffect(effect);
}

function isGrantOrReimbursementEffect(effect) {
  return ["cash_grant", "reimbursement", "rebate"].includes(effect.cashValueClassification);
}

function hasProductionDecisionMetadata(effect) {
  const metadata = effect.repair_metadata || {};
  return Boolean(
    metadata.grant_production_action_repair ||
      metadata.grant_production_quality_repair ||
      metadata.grant_estimation_package_repair ||
      metadata.grant_probability_deep_research ||
      metadata.grant_probability_repair ||
      metadata.tax_package_repair ||
      metadata.tax_geography_repair
  );
}

function repairEstimateStatus(effect) {
  const metadata = effect.repair_metadata || {};
  return (
    metadata.grant_production_action_repair?.estimate_status ||
    metadata.grant_production_action_repair?.estimate_recommendation?.estimate_status ||
    metadata.grant_production_quality_repair?.estimate_status ||
    metadata.grant_production_quality_repair?.estimate_recommendation?.estimate_status ||
    metadata.grant_estimation_package_repair?.estimate_recommendation?.estimate_status ||
    metadata.grant_estimation_package_repair?.repair_status ||
    metadata.grant_probability_repair?.estimate_status ||
    metadata.grant_probability_deep_research?.estimate_status ||
    metadata.tax_package_repair?.display_recommendation?.estimateStatus ||
    metadata.tax_geography_repair?.recommended_estimate_status ||
    metadata.calculation_status ||
    null
  );
}

function repairReasonCodes(effect) {
  const metadata = effect.repair_metadata || {};
  return dedupeStrings([
    ...(effect.confidence?.reason_codes || []),
    ...(metadata.human_review_reasons || []),
    ...(metadata.grant_production_action_repair?.reason_codes || []),
    ...(metadata.grant_production_action_repair?.estimate_recommendation?.reason_codes || []),
    ...(metadata.grant_production_quality_repair?.estimate_recommendation?.reason_codes || []),
    ...(metadata.grant_estimation_package_repair?.reason_codes || []),
    ...(metadata.grant_probability_repair?.reason_codes || []),
    ...(metadata.grant_probability_deep_research?.reason_codes || [])
  ]);
}

function repairDisplayRecommendation(effect) {
  const metadata = effect.repair_metadata || {};
  const display =
    metadata.tax_package_repair?.display_recommendation ||
    metadata.grant_production_action_repair?.estimate_recommendation ||
    metadata.grant_production_action_repair?.runtime_recommendation ||
    metadata.grant_production_quality_repair?.estimate_recommendation ||
    metadata.grant_estimation_package_repair?.display_recommendation ||
    {};
  return {
    label: display.label || display.user_facing_label || effect.label || null,
    caveat: display.caveat || display.user_facing_caveat || null
  };
}

function isConfirmedZeroTaxValue(effect, ctx = {}) {
  const expressionId = String(effect.calculation?.expression_id || "").trim();
  if (!TAX_EFFECT_TYPES.has(effect.effect_type)) return false;

  if (expressionId === "tax_exempt_liability") {
    return [
      "approved_rerz_designation",
      "qualified_company_operations",
      "parcel_or_facility_within_approved_zone_boundary",
      "company_current_on_state_and_local_taxes"
    ].some((key) => hasRuntimeAnswer(ctx, key) && booleanRuntimeAnswer(ctx, key) === false);
  }

  if (expressionId === "tax_rate_difference") {
    if (
      ["annual_tax_performance_report_filed", "has_washington_business_excise_tax_return"].some(
        (key) => hasRuntimeAnswer(ctx, key) && booleanRuntimeAnswer(ctx, key) === false
      )
    ) {
      return true;
    }

    const taxBase = firstNumberRuntimeAnswer(ctx, [
      "qualifying_tax_base_after_deductions_and_matc_cents",
      "qualifying_taxable_gross_receipts",
      "qualifying_taxable_gross_receipts_cents"
    ]);
    return taxBase === 0;
  }

  return false;
}

function hasRuntimeAnswer(ctx, key) {
  const answer = ctx.answers?.[key];
  if (answer && answer.value !== undefined && answer.value !== null && answer.value !== "") return true;
  return ctx[key] !== undefined && ctx[key] !== null && ctx[key] !== "";
}

function runtimeAnswerValue(ctx, key) {
  const answer = ctx.answers?.[key];
  if (answer && answer.value !== undefined && answer.value !== null && answer.value !== "") return answer.value;
  if (ctx[key] !== undefined && ctx[key] !== null && ctx[key] !== "") return ctx[key];
  return null;
}

function booleanRuntimeAnswer(ctx, key) {
  const value = runtimeAnswerValue(ctx, key);
  if (typeof value === "boolean") return value;
  const normalized = String(value || "").trim().toLowerCase();
  if (["true", "yes", "y", "1", "applies", "confirmed"].includes(normalized)) return true;
  if (["false", "no", "n", "0", "does_not_apply", "not_applicable", "none"].includes(normalized)) return false;
  return null;
}

function firstNumberRuntimeAnswer(ctx, keys = []) {
  for (const key of keys) {
    if (!hasRuntimeAnswer(ctx, key)) continue;
    const number = Number(runtimeAnswerValue(ctx, key));
    if (Number.isFinite(number)) return number;
  }
  return null;
}

function potentialAwardCents(effect) {
  const calculation = effect.calculation || {};
  const candidates = [
    calculation.conditional_award_cents,
    calculation.max_award_cents,
    calculation.conditional_award_model?.max_award_cents,
    calculation.conditional_award_model?.amount_cents
  ];
  for (const candidate of candidates) {
    const value = Number(candidate);
    if (Number.isFinite(value) && value > 0) return value;
  }
  return null;
}

function runtimeIncentiveType(effect) {
  if (effect.effect_type === "tax_credit") return "tax_credit";
  if (effect.effect_type === "tax_rate_preference") return "tax_credit";
  if (effect.effect_type === "tax_exemption" || effect.effect_type === "tax_abatement" || effect.effect_type === "property_tax_valuation") {
    return "property_tax_exemption";
  }
  if (effect.effect_type === "grant_expected_value" || effect.repair_metadata?.cash_value_classification === "cash_grant") {
    return "grant";
  }
  if (effect.effect_type === "recurring_expense") return "recurring_bill_charge";
  if (effect.effect_type === "recurring_savings") return "recurring_bill_credit";
  return "capped_rebate";
}

function runtimeTiming(timing = {}) {
  if (timing.cadence === "one_time") return "upfront";
  if (timing.cadence === "monthly") return "monthly";
  if (timing.cadence === "annual") return "annual";
  if (/point_of_sale|instant|rebate|reimbursement|grant|upfront/i.test(String(timing.source_timing || ""))) return "upfront";
  return null;
}

function requiredInputsForPackage(pkg) {
  return inputRequirementsForPackage(pkg).map((input) => input.input_key).filter(Boolean);
}

function inputRequirementsForPackage(pkg) {
  const byKey = new Map();
  const addInput = (input) => {
    if (!input) return;
    const normalized = normalizeInputRequirement(input);
    if (!normalized.input_key) return;
    const existing = byKey.get(normalized.input_key);
    byKey.set(normalized.input_key, existing ? mergeInputRequirements(existing, normalized) : normalized);
  };

  for (const input of pkg.input_requirements || []) addInput(input);
  for (const effect of pkg.effects || []) {
    for (const input of effect.required_inputs || []) addInput(input);
  }
  return [...byKey.values()];
}

function normalizeInputRequirement(input) {
  if (typeof input === "string") return { input_key: input, label: input, source_precedence: [] };
  return {
    input_key: input.input_key || input.inputKey,
    label: input.label || input.input_key || input.inputKey,
    value_type: input.value_type || input.valueType,
    source_precedence: Array.isArray(input.source_precedence)
      ? input.source_precedence
      : Array.isArray(input.sourcePrecedence)
        ? input.sourcePrecedence
        : [],
    missing_severity: input.missing_severity || input.missingSeverity,
    required_for: input.required_for || input.requiredFor || []
  };
}

function mergeInputRequirements(existing, incoming) {
  return {
    ...existing,
    label: existing.label || incoming.label,
    value_type: existing.value_type || incoming.value_type,
    source_precedence: dedupeStrings([...(existing.source_precedence || []), ...(incoming.source_precedence || [])]),
    missing_severity: existing.missing_severity || incoming.missing_severity,
    required_for: dedupeStrings([...(existing.required_for || []), ...(incoming.required_for || [])])
  };
}

function dedupeMissingInputs(inputs = []) {
  const seen = new Set();
  return inputs
    .map((input) => ({
      inputKey: input.inputKey || input.input_key,
      effectId: input.effectId || input.effect_id || null,
      label: input.label || input.inputKey || input.input_key
    }))
    .filter((input) => input.inputKey)
    .filter((input) => {
      const key = `${input.inputKey}:${input.effectId || ""}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

function augmentRuntimeContext(ctx = {}) {
  const answers = { ...(ctx.answers || {}) };
  addAnswerIfMissing(answers, "project_cost_cents", ctx.upfrontCostCents);
  addAnswerIfMissing(answers, "gross_project_cost_cents", ctx.upfrontCostCents);
  addAnswerIfMissing(answers, "upfront_cost_cents", ctx.upfrontCostCents);
  return { ...ctx, answers };
}

function addAnswerIfMissing(answers, key, value) {
  if (answers[key] || !Number.isFinite(value)) return;
  answers[key] = { value, source: "calculated_project_cost" };
}

function confidenceLabel(value) {
  const number = Number(value);
  if (number >= 0.82) return "high";
  if (number >= 0.55) return "medium";
  return "low";
}

function dedupeStrings(values = []) {
  return [...new Set(values.map((value) => String(value || "").trim()).filter(Boolean))];
}

function summarizeResolvedInputs(resolvedInputs = [], requiredInputs = []) {
  if (!requiredInputs.length) return [];
  const requiredSet = new Set(requiredInputs);
  const seen = new Set();
  return resolvedInputs
    .filter((input) => requiredSet.has(input.inputKey))
    .filter((input) => {
      if (seen.has(input.inputKey)) return false;
      seen.add(input.inputKey);
      return true;
    })
    .slice(0, 24);
}

function shortHash(value) {
  return crypto.createHash("sha256").update(String(value)).digest("hex").slice(0, 16);
}
