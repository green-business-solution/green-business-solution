import { applyCaps, percentOfCents, roundCents } from "./formulas.mjs";
import { buildGrantEstimateFromLegacyRule, isGrantLikeRule } from "./grantEstimates.mjs";
import { answerValue, hasAnswer } from "./labor.mjs";

function sum(entries) {
  return entries.reduce((total, entry) => total + Number(entry.amountCents || 0), 0);
}

export function incentiveCategory(rule) {
  switch (rule.incentiveType) {
    case "grant":
    case "possible_grant":
      return "grant";
    case "tax_credit":
      return "tax_credit";
    case "sales_tax_exemption":
      return "sales_tax_exemption";
    case "property_tax_exemption":
      return "property_tax_abatement";
    case "recurring_bill_credit":
      return "recurring_bill_credit";
    case "recurring_bill_charge":
      return "recurring_bill_charge";
    case "tariff_charge":
      return "tariff_charge";
    case "rate_discount":
      return "rate_discount";
    case "demand_response_credit":
      return "demand_response_credit";
    case "performance_based_incentive":
      return "recurring_incentive";
    case "srec_rec_revenue":
      return "srec_rec_revenue";
    case "feed_in_tariff":
      return "feed_in_tariff_revenue";
    case "fixed_per_unit_rebate":
    case "percent_project_cost_rebate":
    case "capped_rebate":
    default:
      return "rebate";
  }
}

export function incentiveTypeMatchesSubtractPolicy(incentiveType, subtractPriorIncentiveTypes = []) {
  if (subtractPriorIncentiveTypes.includes(incentiveType)) return true;
  const category = incentiveCategory({ incentiveType });
  return subtractPriorIncentiveTypes.includes(category);
}

function costByCategory(costLedgerEntries, categories) {
  return sum(costLedgerEntries.filter((entry) => categories.includes(entry.category)));
}

export function resolveIncentiveBasis(rule, ctx, priorAwards = []) {
  if (rule.incentiveType === "sales_tax_exemption") {
    return costByCategory(ctx.baseCostLedgerEntries, ["sales_tax"]);
  }

  if (rule.incentiveType === "property_tax_exemption") {
    if (hasAnswer(ctx.answers, "eligible_assessed_value_increase_cents")) {
      return Number(answerValue(ctx.answers, "eligible_assessed_value_increase_cents"));
    }
    if (hasAnswer(ctx.answers, "installed_cost_cents")) {
      return Number(answerValue(ctx.answers, "installed_cost_cents"));
    }
  }

  const basisPolicy = rule.basisPolicy || { basis: "gross_project_cost", applicationOrder: 10 };

  switch (basisPolicy.basis) {
    case "equipment_cost":
      return costByCategory(ctx.baseCostLedgerEntries, ["equipment_cost"]);
    case "equipment_plus_labor":
      return costByCategory(ctx.baseCostLedgerEntries, ["equipment_cost", "installation_labor"]);
    case "eligible_cost_categories":
      return costByCategory(ctx.baseCostLedgerEntries, rule.eligibleCostCategories || []);
    case "net_after_prior_incentives": {
      const subtractTypes = basisPolicy.subtractPriorIncentiveTypes || [];
      const priorSavings = sum(
        priorAwards.filter((award) => incentiveTypeMatchesSubtractPolicy(award.incentiveType, subtractTypes))
      );
      return Math.max(0, ctx.upfrontCostCents - priorSavings);
    }
    case "user_supplied_basis":
      if (rule.userSuppliedBasisAnswerKey && hasAnswer(ctx.answers, rule.userSuppliedBasisAnswerKey)) {
        return Number(answerValue(ctx.answers, rule.userSuppliedBasisAnswerKey));
      }
      if (hasAnswer(ctx.answers, "eligible_incentive_basis_cents")) {
        return Number(answerValue(ctx.answers, "eligible_incentive_basis_cents"));
      }
      if (hasAnswer(ctx.answers, "eligible_assessed_value_increase_cents")) {
        return Number(answerValue(ctx.answers, "eligible_assessed_value_increase_cents"));
      }
      return 0;
    case "gross_project_cost":
    default:
      return ctx.upfrontCostCents;
  }
}

function resolveKwh(source, ctx) {
  switch (source) {
    case "annual_kwh_delta_abs":
      return Math.abs(
        ctx.billLineDeltas
          .filter((delta) => delta.canonicalField === "annual_kwh_delta")
          .reduce((total, delta) => total + Number(delta.deltaValue || 0), 0)
      );
    case "annual_generation_kwh":
      return Number(answerValue(ctx.answers, "estimated_annual_production_kwh") || 0);
    case "export_kwh":
      return Number(answerValue(ctx.answers, "export_kwh") || 0);
    default:
      return Number(answerValue(ctx.answers, source) || 0);
  }
}

function resolveKw(source, ctx) {
  switch (source) {
    case "demand_reduction_kw":
      return Math.abs(
        ctx.billLineDeltas
          .filter((delta) => delta.canonicalField === "peak_kw_delta")
          .reduce((total, delta) => total + Number(delta.deltaValue || 0), 0)
      );
    case "committed_kw":
    case "system_kw":
    case "charger_kw":
    default:
      return Number(answerValue(ctx.answers, source) || 0);
  }
}

function resolveBatteryKwh(source, ctx) {
  switch (source) {
    case "battery_storage_kwh":
    case "storage_capacity_kwh":
    default:
      return Number(answerValue(ctx.answers, source) || 0);
  }
}

function calculateRawIncentiveAmount(rule, basisCents, ctx) {
  if (rule.incentiveType === "property_tax_exemption") {
    const propertyTaxRate = Number(ctx.billLines?.tax?.property_tax_rate || 0);
    const exemptionPercent = Number(rule.amountRule?.percent ?? rule.exemptionPercent ?? 1);
    return roundCents(Number(basisCents) * propertyTaxRate * exemptionPercent);
  }

  const amountRule = rule.amountRule || { kind: "fixed_amount", amountCents: 0 };

  switch (amountRule.kind) {
    case "fixed_amount":
      return Number(amountRule.amountCents || 0);
    case "fixed_per_unit": {
      const unitCount = Math.min(
        Number(answerValue(ctx.answers, amountRule.unitAnswerKey) || 0),
        Number.isFinite(rule.cap?.maxUnits) ? Number(rule.cap.maxUnits) : Number.POSITIVE_INFINITY
      );
      return roundCents(unitCount * Number(amountRule.amountCentsPerUnit || 0));
    }
    case "percent_of_basis":
      return percentOfCents(basisCents, amountRule.percent || 0);
    case "rate_per_kwh":
      return roundCents(resolveKwh(amountRule.kwhSource, ctx) * Number(amountRule.amountCentsPerKwh || 0));
    case "rate_per_kw":
      return roundCents(resolveKw(amountRule.kwSource, ctx) * Number(amountRule.amountCentsPerKw || 0));
    case "rate_per_battery_kwh":
      return roundCents(
        resolveBatteryKwh(amountRule.batteryKwhSource || "battery_storage_kwh", ctx) *
          Number(amountRule.amountCentsPerBatteryKwh || 0)
      );
    case "bill_discount":
      return percentOfCents(Number(ctx.billChargeBasisCents?.[amountRule.billChargeBasis] || 0), amountRule.percent || 0);
    default:
      return 0;
  }
}

export function calculateIncentiveAward(rule, ctx, priorAwards = []) {
  const basisCents = resolveIncentiveBasis(rule, ctx, priorAwards);
  let rawAmountCents = calculateRawIncentiveAmount(rule, basisCents, ctx);
  let amountCents = applyCaps(rawAmountCents, rule.cap || {}, basisCents);
  const grantEstimate = isGrantLikeRule(rule)
    ? buildGrantEstimateFromLegacyRule(rule, { ...ctx, legacyIncentiveBasisCents: basisCents })
    : null;
  let grantIncludedInTotals = true;

  if (grantEstimate) {
    grantIncludedInTotals = grantEstimate.computedEstimate.includedInUserFacingTotal;
    amountCents = grantIncludedInTotals ? Number(grantEstimate.computedEstimate.estimatedAmountCents || 0) : 0;
    if (!grantIncludedInTotals) rawAmountCents = 0;
  }

  const category = incentiveCategory(rule);
  const timing = rule.timing || "upfront";
  const id = `award_${rule.id}`;

  const award = {
    id,
    rule,
    ruleId: rule.id,
    opportunityId: rule.opportunityId,
    incentiveType: rule.incentiveType,
    category,
    amountCents,
    rawAmountCents,
    basisCents,
    grantEstimate
  };

  if (timing === "upfront" && grantIncludedInTotals) {
    award.upfrontSavingsEntry = {
      id: `cle_${rule.id}`,
      kind: "upfront_savings",
      category,
      label: rule.name || rule.id,
      amountCents,
      source: "opportunity_incentive_rule",
      sourceId: rule.id,
      opportunityId: rule.opportunityId,
      incentiveRuleId: rule.id,
      formula: rule.formula || null,
      grantEstimate
    };
  } else {
    const isRecurringExpense =
      rule.recurringEffect === "expense" ||
      rule.recurringTreatment === "expense" ||
      rule.incentiveType === "recurring_bill_charge" ||
      rule.incentiveType === "tariff_charge";
    award.recurringSavingsEntry = {
      id: `rse_${rule.id}`,
      kind: isRecurringExpense ? "recurring_expense" : "recurring_savings",
      category,
      label: rule.name || rule.id,
      amountCents,
      period: timing,
      allowMonthlyProration: false,
      allowAnnualization: true,
      annualizedAmountCents: timing === "monthly" ? amountCents * 12 : amountCents,
      source: "opportunity_incentive_rule",
      sourceId: rule.id,
      opportunityId: rule.opportunityId,
      incentiveRuleId: rule.id,
      formula: rule.formula || null
    };
  }

  return award;
}
