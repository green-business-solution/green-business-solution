import { calculateIncentiveAward } from "../../savings/incentives.mjs";
import { buildOpportunityMatchProfile } from "../../matching/buildOpportunityMatchProfile.mjs";
import { evaluateOpportunityForUser } from "../../matching/evaluateRules.mjs";
import { normalizeUserProfile } from "../../matching/normalizeUserProfile.mjs";
import { isVisibleAvailability, isVisibleOpportunity } from "../../matching/opportunityLifecycle.mjs";
import {
  billFieldById,
  calculationRequirementByModelId,
  opportunityIncentiveRulesByOpportunityId,
  opportunitySavingsMappingByOpportunityId,
  projectCostBenchmarkByModelId,
  savingsCalculationMethodByModelId,
  savingsModelById
} from "./data.mjs";

export const RETROFIT_RESULTS_SCHEMA_VERSION = "retrofit-results-v1";

const readinessRank = {
  ready_for_estimate: 0,
  needs_project_scope: 1,
  needs_quote: 2,
  needs_incentive_details: 3,
  needs_tax_context: 4,
  needs_bill_data: 5,
  not_enough_data: 6
};

const promptByReadiness = {
  ready_for_estimate: "Review the estimate and confirm project scope before requesting bids.",
  needs_bill_data: "Upload more complete utility history to improve this estimate.",
  needs_project_scope: "Add project scope or equipment details so the estimate can tighten up.",
  needs_quote: "Add a contractor quote or cost estimate to calculate a more reliable payback.",
  needs_incentive_details: "Verify the incentive details before relying on the value estimate.",
  needs_tax_context: "Confirm entity and tax context before relying on the tax-benefit estimate.",
  not_enough_data: "We need more intake and utility data before we can estimate this retrofit."
};

const fieldLabelOverrides = {
  contractor_quote_amount: "Contractor quote amount",
  project_cost_estimate: "Project cost estimate",
  interest_rate: "Interest rate",
  financing_term_years: "Financing term (years)",
  down_payment: "Down payment",
  equipment_category: "Equipment category",
  equipment_make_model: "Equipment make/model",
  equipment_efficiency_rating: "Equipment efficiency rating",
  quantity: "Quantity",
  square_footage: "Square footage",
  vehicle_count: "Vehicle count",
  ownership_status: "Ownership status",
  monthly_utility_spend: "Monthly utility spend",
  incentive_value_method: "Incentive value method",
  incentive_percent: "Incentive percent",
  incentive_amount: "Incentive amount",
  incentive_cap: "Incentive cap",
  eligible_cost_basis: "Eligible cost basis"
};

function cleanText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function slugToLabel(value) {
  if (fieldLabelOverrides[value]) return fieldLabelOverrides[value];
  return String(value || "")
    .split("_")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function parseNumber(value) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  const text = cleanText(value).replace(/[$,%\s,]+/g, "");
  if (!text) return null;
  const parsed = Number(text);
  return Number.isFinite(parsed) ? parsed : null;
}

function parseDateValue(value) {
  const text = cleanText(value);
  if (!text) return "";
  const date = new Date(text);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString();
}

function confidenceScore(value) {
  if (value === "high") return 3;
  if (value === "medium") return 2;
  if (value === "low") return 1;
  return 0;
}

function compareExtractedValues(left, right) {
  return (
    confidenceScore(right?.confidence) - confidenceScore(left?.confidence) ||
    parseDateValue(right?.periodEnd).localeCompare(parseDateValue(left?.periodEnd)) ||
    parseDateValue(right?.periodStart).localeCompare(parseDateValue(left?.periodStart))
  );
}

function buildFieldSnapshot(intake) {
  const extractedValues = Array.isArray(intake?.utilityExtractedValues) ? intake.utilityExtractedValues : [];
  const valuesByFieldId = new Map();

  for (const value of extractedValues) {
    const existing = valuesByFieldId.get(value.fieldId);
    if (!existing || compareExtractedValues(value, existing) < 0) {
      valuesByFieldId.set(value.fieldId, value);
    }
  }

  const site = intake?.site || {};
  const business = intake?.business || {};
  const sustainability = intake?.sustainability || {};
  const interestedImprovements = Array.isArray(sustainability.interestedImprovements) ? sustainability.interestedImprovements : [];
  const squareFootage = parseNumber(site.squareFootage);
  const monthlyUtilitySpend = parseNumber(sustainability.monthlyUtilitySpend);
  const quantity = parseNumber(site.numberOfUnits);

  const nonBillInputs = {
    square_footage: squareFootage,
    ownership_status: cleanText(site.ownershipStatus) || null,
    organization_type: cleanText(business.organizationType) || null,
    building_type: cleanText(site.buildingType) || null,
    monthly_utility_spend: monthlyUtilitySpend,
    quantity,
    unit_count: quantity,
    equipment_category: interestedImprovements[0] || cleanText(site.buildingType) || null
  };

  const availableFieldIds = new Set(valuesByFieldId.keys());
  const billValues = {};
  for (const [fieldId, value] of valuesByFieldId.entries()) {
    billValues[fieldId] = value.value;
  }

  const annualKwh = parseNumber(billValues.annual_kwh);
  const annualElectricCost = parseNumber(billValues.annual_electric_cost) ?? parseNumber(billValues.total_electric_cost);
  const annualTherms = parseNumber(billValues.annual_therms);
  const annualGasCost = parseNumber(billValues.annual_gas_cost) ?? parseNumber(billValues.total_gas_cost);
  const annualWaterUse = parseNumber(billValues.annual_water_use);
  const annualWaterCost = parseNumber(billValues.annual_water_cost) ?? parseNumber(billValues.total_water_cost);

  if (!availableFieldIds.has("average_cost_per_kwh") && annualKwh && annualElectricCost) {
    billValues.average_cost_per_kwh = annualElectricCost / annualKwh;
    availableFieldIds.add("average_cost_per_kwh");
  }

  if (!availableFieldIds.has("average_cost_per_therm") && annualTherms && annualGasCost) {
    billValues.average_cost_per_therm = annualGasCost / annualTherms;
    availableFieldIds.add("average_cost_per_therm");
  }

  if (!availableFieldIds.has("project_cost_estimate") && parseNumber(nonBillInputs.project_cost_estimate) != null) {
    availableFieldIds.add("project_cost_estimate");
  }

  return {
    availableFieldIds,
    billValues,
    extractedValues,
    nonBillInputs,
    valuesByFieldId
  };
}

function firstRule(opportunityId) {
  return (opportunityIncentiveRulesByOpportunityId.get(opportunityId) || [])[0] || null;
}

function normalizeIncentive({ mapping, opportunity, rule }) {
  const amountRule = rule?.amountRule || {};
  const normalized = {
    ruleId: rule?.id || null,
    incentive_value_method: mapping?.incentive_value_method || amountRule.kind || null,
    incentive_amount:
      amountRule.kind === "fixed_amount"
        ? amountRule.amountCents / 100
        : amountRule.kind === "fixed_per_unit"
          ? amountRule.amountCentsPerUnit / 100
          : null,
    incentive_percent:
      amountRule.kind === "percent_of_basis"
        ? amountRule.percent
        : rule?.incentiveType === "property_tax_exemption"
          ? rule?.amountRule?.percent ?? rule?.exemptionPercent ?? null
          : null,
    incentive_cap: rule?.cap?.maxAmountCents != null ? rule.cap.maxAmountCents / 100 : null,
    eligible_cost_basis: rule?.basisPolicy?.basis || null,
    incentive_unit:
      amountRule.unitAnswerKey ||
      (amountRule.kind === "rate_per_kwh" ? "kWh saved" : amountRule.kind === "rate_per_kw" ? "kW" : null),
    application_deadline: opportunity?.endDate || null,
    preapproval_required: /pre[- ]?approval|preapproval|required before purchase/i.test(
      [opportunity?.summary, opportunity?.reviewNotes].filter(Boolean).join(" ")
    ),
    stacking_notes:
      Array.isArray(rule?.basisPolicy?.subtractPriorIncentiveTypes) && rule.basisPolicy.subtractPriorIncentiveTypes.length > 0
        ? `Subtracts prior incentives from ${rule.basisPolicy.subtractPriorIncentiveTypes.join(", ")} before calculating basis.`
        : null,
    source_confidence: rule?.confidence || mapping?.confidence || null,
    source_formula: rule?.formula || null,
    missing_info_flags: []
  };

  if (normalized.incentive_value_method == null) normalized.missing_info_flags.push("incentive_value_method");
  if (normalized.incentive_amount == null && normalized.incentive_percent == null) {
    normalized.missing_info_flags.push("incentive_amount_or_percent");
  }
  if (!normalized.application_deadline) normalized.missing_info_flags.push("application_deadline");

  return normalized;
}

function resolveRequirement(modelId) {
  return calculationRequirementByModelId.get(modelId) || {
    required_bill_fields: [],
    optional_bill_fields: [],
    required_non_bill_inputs: [],
    optional_non_bill_inputs: [],
    required_incentive_fields: [],
    required_cost_fields: [],
    calculation_readiness_rules: {
      benchmarkAllowed: false,
      quoteRequired: false,
      incentiveDetailsOptional: true,
      supportedForFirstPass: false
    }
  };
}

function resolveMethod(modelId) {
  return savingsCalculationMethodByModelId.get(modelId) || null;
}

function resolveBenchmark(modelId) {
  return projectCostBenchmarkByModelId.get(modelId) || null;
}

function buildHumanFieldList(fieldIds) {
  return fieldIds.map((fieldId) => ({
    fieldId,
    label: billFieldById.get(fieldId)?.display_name || slugToLabel(fieldId)
  }));
}

function determineReadiness({
  eligibilityStatus,
  missingBillFields,
  missingCostFields,
  missingIncentiveFields,
  missingNonBillInputs,
  modelId,
  normalizedIncentive,
  requirement
}) {
  if (eligibilityStatus === "ineligible" || eligibilityStatus === "unavailable") {
    return "not_enough_data";
  }

  if (missingBillFields.length > 0) {
    return "needs_bill_data";
  }

  if (modelId === "tax_benefit_project_cost_reduction") {
    return missingIncentiveFields.length > 0 ? "needs_tax_context" : "ready_for_estimate";
  }

  if (requirement.calculation_readiness_rules?.quoteRequired && missingCostFields.length > 0) {
    return "needs_quote";
  }

  if (missingIncentiveFields.length > 0 && !requirement.calculation_readiness_rules?.incentiveDetailsOptional) {
    return "needs_incentive_details";
  }

  if (missingNonBillInputs.length > 0) {
    return "needs_project_scope";
  }

  if (
    requirement.calculation_readiness_rules?.supportedForFirstPass === false &&
    normalizedIncentive.missing_info_flags.length > 0
  ) {
    return "not_enough_data";
  }

  return "ready_for_estimate";
}

function resolveProjectCostRange({ benchmark, modelId, fields }) {
  const quote = parseNumber(fields.billValues.contractor_quote_amount) ?? parseNumber(fields.billValues.project_cost_estimate) ?? parseNumber(fields.nonBillInputs.project_cost_estimate);
  if (quote != null) {
    return { low: quote, typical: quote, high: quote, source: "user_supplied" };
  }

  if (!benchmark) {
    return { low: null, typical: null, high: null, source: "missing" };
  }

  if (benchmark.basis === "per_sqft") {
    const squareFootage = parseNumber(fields.nonBillInputs.square_footage);
    if (squareFootage == null) return { low: null, typical: null, high: null, source: "missing" };
    return {
      low: squareFootage * Number(benchmark.low || 0),
      typical: squareFootage * Number(benchmark.typical || 0),
      high: squareFootage * Number(benchmark.high || 0),
      source: "benchmark_per_sqft"
    };
  }

  if (benchmark.basis === "per_annual_kwh") {
    const annualKwh = parseNumber(fields.billValues.annual_kwh);
    if (annualKwh == null) return { low: null, typical: null, high: null, source: "missing" };
    return {
      low: annualKwh * Number(benchmark.low || 0),
      typical: annualKwh * Number(benchmark.typical || 0),
      high: annualKwh * Number(benchmark.high || 0),
      source: "benchmark_per_annual_kwh"
    };
  }

  if (benchmark.basis === "per_site" || benchmark.basis === "none") {
    return {
      low: Number(benchmark.low || 0),
      typical: Number(benchmark.typical || 0),
      high: Number(benchmark.high || 0),
      source: benchmark.basis === "none" ? "none" : "benchmark_per_site"
    };
  }

  return { low: null, typical: null, high: null, source: "missing" };
}

function buildRange(low, typical, high) {
  return { low: low ?? null, typical: typical ?? null, high: high ?? null };
}

function clampNonNegative(value) {
  return value == null ? null : Math.max(0, value);
}

function computeSavingsRange({ modelId, method, fields }) {
  const annualKwh = parseNumber(fields.billValues.annual_kwh);
  const annualElectricCost = parseNumber(fields.billValues.annual_electric_cost) ?? parseNumber(fields.billValues.total_electric_cost);
  const averageCostPerKwh = parseNumber(fields.billValues.average_cost_per_kwh);
  const annualTherms = parseNumber(fields.billValues.annual_therms);
  const annualGasCost = parseNumber(fields.billValues.annual_gas_cost) ?? parseNumber(fields.billValues.total_gas_cost);
  const averageCostPerTherm = parseNumber(fields.billValues.average_cost_per_therm);
  const annualWaterUse = parseNumber(fields.billValues.annual_water_use);
  const annualWaterCost = parseNumber(fields.billValues.annual_water_cost) ?? parseNumber(fields.billValues.total_water_cost);
  const assumptions = [];

  if (!method) {
    return { annualSavings: buildRange(null, null, null), annualUsageDelta: buildRange(null, null, null), assumptions };
  }

  if (method.calculator_family === "electric_reduction_percent") {
    if (annualKwh == null || averageCostPerKwh == null) {
      return { annualSavings: buildRange(null, null, null), annualUsageDelta: buildRange(null, null, null), assumptions };
    }
    const rates = [method.savings_rate_low, method.savings_rate_typical, method.savings_rate_high].map(Number);
    assumptions.push(...(method.notes || []));
    return {
      annualSavings: buildRange(
        annualKwh * rates[0] * averageCostPerKwh,
        annualKwh * rates[1] * averageCostPerKwh,
        annualKwh * rates[2] * averageCostPerKwh
      ),
      annualUsageDelta: buildRange(annualKwh * rates[0], annualKwh * rates[1], annualKwh * rates[2]),
      assumptions
    };
  }

  if (method.calculator_family === "gas_reduction_percent") {
    if (annualTherms == null || averageCostPerTherm == null) {
      return { annualSavings: buildRange(null, null, null), annualUsageDelta: buildRange(null, null, null), assumptions };
    }
    const rates = [method.savings_rate_low, method.savings_rate_typical, method.savings_rate_high].map(Number);
    assumptions.push(...(method.notes || []));
    return {
      annualSavings: buildRange(
        annualTherms * rates[0] * averageCostPerTherm,
        annualTherms * rates[1] * averageCostPerTherm,
        annualTherms * rates[2] * averageCostPerTherm
      ),
      annualUsageDelta: buildRange(annualTherms * rates[0], annualTherms * rates[1], annualTherms * rates[2]),
      assumptions
    };
  }

  if (method.calculator_family === "gas_to_electric_shift") {
    if (annualTherms == null || averageCostPerTherm == null || annualKwh == null || averageCostPerKwh == null) {
      return { annualSavings: buildRange(null, null, null), annualUsageDelta: buildRange(null, null, null), assumptions };
    }
    const gasRates = [method.gas_reduction_low, method.gas_reduction_typical, method.gas_reduction_high].map(Number);
    const electricMultipliers = [
      method.electric_addition_multiplier_low,
      method.electric_addition_multiplier_typical,
      method.electric_addition_multiplier_high
    ].map(Number);
    assumptions.push(...(method.notes || []));
    const annualSavings = gasRates.map((gasRate, index) => {
      const avoidedGasCost = annualTherms * gasRate * averageCostPerTherm;
      const addedElectricCost = annualKwh * electricMultipliers[index] * averageCostPerKwh;
      return avoidedGasCost - addedElectricCost;
    });
    return {
      annualSavings: buildRange(annualSavings[0], annualSavings[1], annualSavings[2]),
      annualUsageDelta: buildRange(
        annualTherms * gasRates[0],
        annualTherms * gasRates[1],
        annualTherms * gasRates[2]
      ),
      assumptions
    };
  }

  if (method.calculator_family === "water_reduction_percent") {
    if (annualWaterUse == null || annualWaterCost == null || annualWaterUse <= 0) {
      return { annualSavings: buildRange(null, null, null), annualUsageDelta: buildRange(null, null, null), assumptions };
    }
    const unitCost = annualWaterCost / annualWaterUse;
    const rates = [method.savings_rate_low, method.savings_rate_typical, method.savings_rate_high].map(Number);
    assumptions.push(...(method.notes || []));
    return {
      annualSavings: buildRange(
        annualWaterUse * rates[0] * unitCost,
        annualWaterUse * rates[1] * unitCost,
        annualWaterUse * rates[2] * unitCost
      ),
      annualUsageDelta: buildRange(
        annualWaterUse * rates[0],
        annualWaterUse * rates[1],
        annualWaterUse * rates[2]
      ),
      assumptions
    };
  }

  if (method.calculator_family === "solar_offset_percent") {
    if (annualKwh == null || averageCostPerKwh == null) {
      return { annualSavings: buildRange(null, null, null), annualUsageDelta: buildRange(null, null, null), assumptions };
    }
    const offsets = [method.offset_low, method.offset_typical, method.offset_high].map(Number);
    const exportCredits = [
      method.export_credit_fraction_low,
      method.export_credit_fraction_typical,
      method.export_credit_fraction_high
    ].map(Number);
    assumptions.push(...(method.notes || []));
    const annualSavings = offsets.map((offset, index) => annualKwh * offset * averageCostPerKwh * (1 + exportCredits[index]));
    return {
      annualSavings: buildRange(annualSavings[0], annualSavings[1], annualSavings[2]),
      annualUsageDelta: buildRange(annualKwh * offsets[0], annualKwh * offsets[1], annualKwh * offsets[2]),
      assumptions
    };
  }

  if (method.calculator_family === "managed_load_percent") {
    const baselineCost = annualElectricCost ?? (annualKwh != null && averageCostPerKwh != null ? annualKwh * averageCostPerKwh : null);
    if (baselineCost == null) {
      return { annualSavings: buildRange(null, null, null), annualUsageDelta: buildRange(null, null, null), assumptions };
    }
    const rates = [method.savings_rate_low, method.savings_rate_typical, method.savings_rate_high].map(Number);
    assumptions.push(...(method.notes || []));
    return {
      annualSavings: buildRange(baselineCost * rates[0], baselineCost * rates[1], baselineCost * rates[2]),
      annualUsageDelta: buildRange(null, null, null),
      assumptions
    };
  }

  if (method.calculator_family === "incentive_only" || method.calculator_family === "financing_only") {
    assumptions.push(...(method.notes || []));
    return {
      annualSavings: buildRange(0, 0, 0),
      annualUsageDelta: buildRange(null, null, null),
      assumptions
    };
  }

  return { annualSavings: buildRange(null, null, null), annualUsageDelta: buildRange(null, null, null), assumptions };
}

function buildIncentiveContext({ opportunityId, rule, projectCostDollars, annualUsageDelta, fields }) {
  const quantity = parseNumber(fields.nonBillInputs.quantity) ?? parseNumber(fields.nonBillInputs.unit_count) ?? 0;
  const answers = {
    unit_count: quantity,
    quantity,
    project_cost_estimate: projectCostDollars,
    contractor_quote_amount: projectCostDollars
  };
  const billLineDeltas = annualUsageDelta.typical != null
    ? [
        {
          canonicalField:
            rule?.amountRule?.kwhSource || rule?.amountRule?.kind === "rate_per_kwh" ? "annual_kwh_delta" : "annual_therm_delta",
          deltaValue: -Math.abs(annualUsageDelta.typical)
        }
      ]
    : [];

  return {
    answers,
    baseCostLedgerEntries: [
      {
        category: "equipment_cost",
        amountCents: Math.round(projectCostDollars * 100)
      }
    ],
    upfrontCostCents: Math.round(projectCostDollars * 100),
    billLineDeltas,
    billLines: {
      electric: {
        annual_kwh: parseNumber(fields.billValues.annual_kwh),
        average_cost_per_kwh: parseNumber(fields.billValues.average_cost_per_kwh)
      },
      gas: {
        annual_therms: parseNumber(fields.billValues.annual_therms),
        average_cost_per_therm: parseNumber(fields.billValues.average_cost_per_therm)
      },
      tax: {
        property_tax_rate: 0
      }
    },
    billChargeBasisCents: {}
  };
}

function resolveIncentiveRange({ modelId, normalizedIncentive, rule, projectCost, annualUsageDelta, fields }) {
  if (!projectCost.typical && !rule) {
    return buildRange(null, null, null);
  }

  if (rule) {
    const values = [
      projectCost.low,
      projectCost.typical,
      projectCost.high
    ].map((cost) => {
      if (cost == null) return null;
      const award = calculateIncentiveAward(
        rule,
        buildIncentiveContext({
          opportunityId: rule.opportunityId,
          rule,
          projectCostDollars: cost,
          annualUsageDelta,
          fields
        }),
        []
      );
      return award.amountCents / 100;
    });
    return buildRange(values[0], values[1], values[2]);
  }

  const percent = normalizedIncentive.incentive_percent;
  if (percent != null && projectCost.typical != null) {
    return buildRange(
      projectCost.low != null ? projectCost.low * percent : null,
      projectCost.typical * percent,
      projectCost.high != null ? projectCost.high * percent : null
    );
  }

  if (normalizedIncentive.incentive_amount != null) {
    return buildRange(
      normalizedIncentive.incentive_amount,
      normalizedIncentive.incentive_amount,
      normalizedIncentive.incentive_amount
    );
  }

  return buildRange(null, null, null);
}

function calculateFinancialOutputs({ annualSavings, incentiveValue, projectCost }) {
  const netLow = projectCost.low != null ? clampNonNegative(projectCost.low - (incentiveValue.low || 0)) : null;
  const netTypical = projectCost.typical != null ? clampNonNegative(projectCost.typical - (incentiveValue.typical || 0)) : null;
  const netHigh = projectCost.high != null ? clampNonNegative(projectCost.high - (incentiveValue.high || 0)) : null;

  const payback = {
    low:
      netLow != null && annualSavings.high != null && annualSavings.high > 0
        ? netLow / annualSavings.high
        : null,
    typical:
      netTypical != null && annualSavings.typical != null && annualSavings.typical > 0
        ? netTypical / annualSavings.typical
        : null,
    high:
      netHigh != null && annualSavings.low != null && annualSavings.low > 0
        ? netHigh / annualSavings.low
        : null
  };

  const roi15 = {
    low:
      netHigh != null && netHigh > 0 && annualSavings.low != null && annualSavings.low > 0
        ? ((annualSavings.low * 15 + (incentiveValue.low || 0) - (projectCost.high || 0)) / netHigh) * 100
        : null,
    typical:
      netTypical != null && netTypical > 0 && annualSavings.typical != null && annualSavings.typical > 0
        ? ((annualSavings.typical * 15 + (incentiveValue.typical || 0) - (projectCost.typical || 0)) / netTypical) * 100
        : null,
    high:
      netLow != null && netLow > 0 && annualSavings.high != null && annualSavings.high > 0
        ? ((annualSavings.high * 15 + (incentiveValue.high || 0) - (projectCost.low || 0)) / netLow) * 100
        : null
  };

  return {
    estimatedNetCost: buildRange(netLow, netTypical, netHigh),
    paybackYears: buildRange(payback.low, payback.typical, payback.high),
    roi15Year: buildRange(roi15.low, roi15.typical, roi15.high)
  };
}

function confidenceForEstimate({ readinessStatus, missingBillFields, missingNonBillInputs, rule }) {
  if (readinessStatus === "ready_for_estimate" && missingNonBillInputs.length === 0 && rule?.confidence === "high") {
    return "high";
  }
  if (missingBillFields.length === 0) {
    return "medium";
  }
  return "low";
}

function sortResults(left, right) {
  return (
    (readinessRank[left.readinessStatus] ?? 999) - (readinessRank[right.readinessStatus] ?? 999) ||
    (right.estimate.annualSavingsTypical || 0) - (left.estimate.annualSavingsTypical || 0) ||
    (right.match.rankScore || 0) - (left.match.rankScore || 0)
  );
}

function buildNotApplicableResult({ opportunity, match, mapping }) {
  const retrofit = match.retrofitTypes?.[0] || null;
  return {
    opportunityId: opportunity.opportunityId,
    opportunityName: opportunity.canonicalTitle || opportunity.normalizedTitle || opportunity.opportunityId,
    retrofitTypeId: retrofit?.retrofitTypeId || null,
    retrofitDisplayName: retrofit?.displayName || "Matched opportunity",
    category: retrofit?.parentCategory || opportunity.category || "unknown",
    savingsModelId: mapping?.primary_savings_model_id || null,
    readinessStatus: "not_enough_data",
    nextStepCta: promptByReadiness.not_enough_data,
    confidence: "low",
    missingInfoPrompts: match.blockers || match.unresolvedRequirements || [],
    matchedReasons: match.matchedReasons || [],
    sourceSummary: match.sourceSummary || {},
    links: {
      sourceUrl: match.sourceUrl || null,
      websiteUrl: match.websiteUrl || null,
      applicationUrl: match.applicationUrl || null
    },
    estimate: {
      annualSavingsLow: null,
      annualSavingsTypical: null,
      annualSavingsHigh: null,
      estimatedProjectCostLow: null,
      estimatedProjectCostTypical: null,
      estimatedProjectCostHigh: null,
      estimatedIncentiveValueLow: null,
      estimatedIncentiveValueTypical: null,
      estimatedIncentiveValueHigh: null,
      estimatedNetCostLow: null,
      estimatedNetCostTypical: null,
      estimatedNetCostHigh: null,
      paybackYearsLow: null,
      paybackYearsTypical: null,
      paybackYearsHigh: null,
      roi15YearLow: null,
      roi15YearTypical: null,
      roi15YearHigh: null
    },
    fieldCoverage: {
      availableFields: [],
      missingBillFields: [],
      missingNonBillInputs: [],
      missingIncentiveFields: [],
      missingCostFields: []
    },
    normalizedIncentive: null,
    assumptionsUsed: [],
    match
  };
}

export function validateRequirementFieldIds() {
  const errors = [];
  for (const [modelId, requirement] of calculationRequirementByModelId.entries()) {
    for (const fieldId of requirement.required_bill_fields || []) {
      if (!billFieldById.has(fieldId)) {
        errors.push(`Unknown bill field ${fieldId} in ${modelId}`);
      }
    }
    for (const fieldId of requirement.optional_bill_fields || []) {
      if (!billFieldById.has(fieldId)) {
        errors.push(`Unknown optional bill field ${fieldId} in ${modelId}`);
      }
    }
  }
  return {
    ok: errors.length === 0,
    errors
  };
}

export function buildClientRetrofitResults({ intake, opportunities, now = new Date().toISOString() }) {
  if (!intake) {
    return {
      schemaVersion: RETROFIT_RESULTS_SCHEMA_VERSION,
      generatedAt: now,
      intakeId: null,
      summary: {
        totalResults: 0,
        readyToEstimate: 0,
        needsMoreInformation: 0,
        notCurrentlyApplicable: 0
      },
      groups: {
        readyToEstimate: [],
        needsMoreInformation: [],
        notCurrentlyApplicable: []
      }
    };
  }

  const userMatchProfile = normalizeUserProfile(intake);
  const fieldSnapshot = buildFieldSnapshot(intake);
  const visibleOpportunities = (opportunities || []).filter((opportunity) => {
    if (!isVisibleOpportunity(opportunity)) return false;
    return isVisibleAvailability(buildOpportunityMatchProfile(opportunity, { now }).availability);
  });

  const results = [];

  for (const opportunity of visibleOpportunities) {
    const matchProfile = buildOpportunityMatchProfile(opportunity, { now });
    const match = evaluateOpportunityForUser(userMatchProfile, opportunity, matchProfile, { now });
    const mapping = opportunitySavingsMappingByOpportunityId.get(opportunity.opportunityId) || null;

    if (!mapping || ["ineligible", "unavailable"].includes(match.eligibilityStatus)) {
      results.push(buildNotApplicableResult({ opportunity, match, mapping }));
      continue;
    }

    const modelId = mapping.primary_savings_model_id;
    const savingsModel = savingsModelById.get(modelId) || null;
    const requirement = resolveRequirement(modelId);
    const method = resolveMethod(modelId);
    const benchmark = resolveBenchmark(modelId);
    const rule = firstRule(opportunity.opportunityId);
    const normalizedIncentive = normalizeIncentive({ mapping, opportunity, rule });
    const missingBillFields = (requirement.required_bill_fields || []).filter(
      (fieldId) => !fieldSnapshot.availableFieldIds.has(fieldId)
    );
    const missingNonBillInputs = (requirement.required_non_bill_inputs || []).filter((fieldId) => {
      const value = fieldSnapshot.nonBillInputs[fieldId];
      return value == null || value === "";
    });
    const missingCostFields = (requirement.required_cost_fields || []).filter((fieldId) => {
      const billValue = parseNumber(fieldSnapshot.billValues[fieldId]);
      const nonBillValue = parseNumber(fieldSnapshot.nonBillInputs[fieldId]) ?? fieldSnapshot.nonBillInputs[fieldId];
      return (billValue == null && (nonBillValue == null || nonBillValue === ""));
    });
    const missingIncentiveFields = (requirement.required_incentive_fields || []).filter((fieldId) => {
      const value = normalizedIncentive[fieldId];
      return value == null || value === "";
    });

    if (
      ["grant_funding", "project_cost_reduction_only", "tax_benefit_project_cost_reduction"].includes(modelId) &&
      normalizedIncentive.missing_info_flags.includes("incentive_amount_or_percent")
    ) {
      missingIncentiveFields.push("incentive_amount");
    }

    const readinessStatus = determineReadiness({
      eligibilityStatus: match.eligibilityStatus,
      missingBillFields,
      missingCostFields,
      missingIncentiveFields,
      missingNonBillInputs,
      modelId,
      normalizedIncentive,
      requirement
    });
    const savings = computeSavingsRange({ modelId, method, fields: fieldSnapshot });
    const projectCost = resolveProjectCostRange({ benchmark, modelId, fields: fieldSnapshot });
    const incentiveValue = resolveIncentiveRange({
      modelId,
      normalizedIncentive,
      rule,
      projectCost,
      annualUsageDelta: savings.annualUsageDelta,
      fields: fieldSnapshot
    });
    const financial = calculateFinancialOutputs({
      annualSavings: savings.annualSavings,
      incentiveValue,
      projectCost
    });
    const retrofit = match.retrofitTypes?.[0] || null;
    const missingInfoPrompts = [
      ...buildHumanFieldList(missingBillFields).map((field) => `Missing utility field: ${field.label}.`),
      ...buildHumanFieldList(missingNonBillInputs).map((field) => `Missing project input: ${field.label}.`),
      ...buildHumanFieldList(missingCostFields).map((field) => `Missing cost input: ${field.label}.`),
      ...buildHumanFieldList(missingIncentiveFields).map((field) => `Missing incentive detail: ${field.label}.`)
    ];

    results.push({
      opportunityId: opportunity.opportunityId,
      opportunityName: opportunity.canonicalTitle || opportunity.normalizedTitle || opportunity.opportunityId,
      retrofitTypeId: retrofit?.retrofitTypeId || null,
      retrofitDisplayName: retrofit?.displayName || "Matched opportunity",
      category: retrofit?.parentCategory || opportunity.category || "unknown",
      savingsModelId: modelId,
      savingsModelName: savingsModel?.display_name || modelId,
      readinessStatus,
      nextStepCta: promptByReadiness[readinessStatus] || promptByReadiness.not_enough_data,
      confidence: confidenceForEstimate({
        readinessStatus,
        missingBillFields,
        missingNonBillInputs,
        rule
      }),
      missingInfoPrompts,
      matchedReasons: match.matchedReasons || [],
      sourceSummary: match.sourceSummary || {},
      links: {
        sourceUrl: match.sourceUrl || null,
        websiteUrl: match.websiteUrl || null,
        applicationUrl: match.applicationUrl || null
      },
      estimate: {
        annualSavingsLow: savings.annualSavings.low,
        annualSavingsTypical: savings.annualSavings.typical,
        annualSavingsHigh: savings.annualSavings.high,
        estimatedProjectCostLow: projectCost.low,
        estimatedProjectCostTypical: projectCost.typical,
        estimatedProjectCostHigh: projectCost.high,
        estimatedIncentiveValueLow: incentiveValue.low,
        estimatedIncentiveValueTypical: incentiveValue.typical,
        estimatedIncentiveValueHigh: incentiveValue.high,
        estimatedNetCostLow: financial.estimatedNetCost.low,
        estimatedNetCostTypical: financial.estimatedNetCost.typical,
        estimatedNetCostHigh: financial.estimatedNetCost.high,
        paybackYearsLow: financial.paybackYears.low,
        paybackYearsTypical: financial.paybackYears.typical,
        paybackYearsHigh: financial.paybackYears.high,
        roi15YearLow: financial.roi15Year.low,
        roi15YearTypical: financial.roi15Year.typical,
        roi15YearHigh: financial.roi15Year.high
      },
      fieldCoverage: {
        requiredBillFields: buildHumanFieldList(requirement.required_bill_fields || []),
        availableFields: buildHumanFieldList([...fieldSnapshot.availableFieldIds]),
        missingBillFields: buildHumanFieldList(missingBillFields),
        missingNonBillInputs: buildHumanFieldList(missingNonBillInputs),
        missingIncentiveFields: buildHumanFieldList(missingIncentiveFields),
        missingCostFields: buildHumanFieldList(missingCostFields)
      },
      normalizedIncentive,
      assumptionsUsed: [
        ...savings.assumptions,
        projectCost.source === "user_supplied"
          ? "Project cost uses a user-supplied quote or estimate."
          : projectCost.source === "missing"
            ? "Project cost could not be estimated from current inputs."
            : `Project cost uses the ${benchmark?.key || "selected"} benchmark.`
      ],
      match
    });
  }

  const sorted = results.sort(sortResults);
  const readyToEstimate = sorted.filter((result) => result.readinessStatus === "ready_for_estimate");
  const needsMoreInformation = sorted.filter(
    (result) =>
      !["ready_for_estimate", "not_enough_data"].includes(result.readinessStatus) &&
      !["ineligible", "unavailable"].includes(result.match?.eligibilityStatus || "")
  );
  const notCurrentlyApplicable = sorted.filter(
    (result) =>
      result.readinessStatus === "not_enough_data" ||
      ["ineligible", "unavailable"].includes(result.match?.eligibilityStatus || "")
  );

  return {
    schemaVersion: RETROFIT_RESULTS_SCHEMA_VERSION,
    generatedAt: now,
    intakeId: intake.submissionId || intake.userId || null,
    summary: {
      totalResults: sorted.length,
      readyToEstimate: readyToEstimate.length,
      needsMoreInformation: needsMoreInformation.length,
      notCurrentlyApplicable: notCurrentlyApplicable.length
    },
    groups: {
      readyToEstimate,
      needsMoreInformation,
      notCurrentlyApplicable
    }
  };
}
