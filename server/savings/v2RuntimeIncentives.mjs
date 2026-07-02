import crypto from "node:crypto";
import { calculateV2IncentivePackage, validateIncentiveCalculationPackageV2 } from "./incentiveCalculationsV2.mjs";
import { buildV2ResolvedRuntimeContext } from "./v2InputResolution.mjs";

const BLOCKED_PACKAGE_STATUSES = new Set([
  "source_inaccessible_repair_failure",
  "unavailable_archived",
  "non_monetary_workflow",
  "no_calculable_value",
  "needs_repair_review",
  "custom_quote_estimate"
]);

const MONETARY_EFFECT_TYPES = new Set([
  "one_time_savings",
  "recurring_savings",
  "recurring_expense",
  "grant_expected_value",
  "tax_credit",
  "financing_subsidy"
]);

export function buildV2RuntimeIncentiveBridge({
  packages = [],
  existingLegacyRules = [],
  ctx = {}
}) {
  const legacyOpportunityIds = new Set(existingLegacyRules.map((rule) => rule.opportunityId).filter(Boolean));
  const augmentedCtx = augmentRuntimeContext(buildV2ResolvedRuntimeContext(ctx, packages));
  const runtimeRules = [];
  const packageSummaries = [];

  for (const pkg of packages || []) {
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
  const requiredInputs = requiredInputsForPackage(pkg);
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

  if (legacyRulePreferred) {
    summary.runtimeInclusionStatus = "legacy_rule_preferred";
  } else if (BLOCKED_PACKAGE_STATUSES.has(pkg.calculation_status)) {
    summary.runtimeInclusionStatus = pkg.calculation_status;
  } else if (confidenceLabel(pkg.confidence?.overall) === "low") {
    summary.runtimeInclusionStatus = "low_confidence";
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
  if (effect.effect_type !== "tax_credit") return false;
  if (effect.repair_metadata?.human_review_required === true) return false;
  return effect.calculation?.method && effect.calculation.method !== "zero_when_not_applicable";
}

function runtimeIncentiveType(effect) {
  if (effect.effect_type === "tax_credit") return "tax_credit";
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
  return null;
}

function requiredInputsForPackage(pkg) {
  return dedupeStrings((pkg.input_requirements || []).map((input) => input.input_key).filter(Boolean));
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
