import { answerValue, hasAnswer } from "./labor.mjs";

export const TAX_GAP_RUNTIME_RULE_SCHEMA_VERSION = "tax-gap-runtime-rules-v1";

export function calculateTaxGapRuntimeRule(rule, ctx = {}) {
  if (!rule || typeof rule !== "object") {
    return blockedResult(rule, "invalid_rule", ["Tax gap runtime rule is missing or invalid."]);
  }

  if (rule.includeInUserFacingTotalDefault === false && rule.runtimeStatus === "source_unavailable") {
    return blockedResult(rule, "source_unavailable", ["Official source is unavailable."]);
  }

  const missingInputs = missingRequiredInputs(rule, ctx);
  if (missingInputs.length) {
    return {
      taxRuleId: rule.taxRuleId || null,
      sourceSkippedRecordId: rule.sourceSkippedRecordId || null,
      status: rule.runtimeStatusWhenInputsMissing || "missing_inputs",
      amountCents: 0,
      includedInUserFacingTotal: false,
      missingInputs,
      trace: [`Missing required tax-gap inputs: ${missingInputs.map((input) => input.inputKey).join(", ")}.`]
    };
  }

  const model = rule.calculationModel || {};
  const gateResult = requiredTrueGateResult(rule, ctx);
  if (gateResult) return gateResult;

  switch (model.method) {
    case "sales_use_tax_exemption":
      return resultForRule(rule, calculateSalesUseTaxExemption(rule, ctx));

    case "az_renewable_energy_production_credit":
      return resultForRule(rule, calculateArizonaRenewableProductionCredit(rule, ctx));

    case "co_heat_pump_invoice_discount_credit":
      return resultForRule(rule, calculateColoradoHeatPumpInvoiceDiscount(rule, ctx));

    case "ct_green_building_credit":
      return resultForRule(rule, calculateConnecticutGreenBuildingCredit(rule, ctx));

    default:
      return blockedResult(rule, "unsupported_runtime_model", [
        `Unsupported tax-gap runtime model: ${model.method || "unknown"}.`
      ]);
  }
}

function calculateSalesUseTaxExemption(rule, ctx) {
  const model = rule.calculationModel || {};
  const baseCents = numberAnswer(ctx, model.amountInput);
  const rate = taxRateAnswer(ctx, model.rateInput);
  return {
    amountCents: Math.round(baseCents * rate),
    trace: [`Exempt tax base ${baseCents} cents * sales/use tax rate ${rate}.`]
  };
}

function calculateArizonaRenewableProductionCredit(rule, ctx) {
  const model = rule.calculationModel || {};
  const resourceType = normalizeKey(valueAnswer(ctx, model.resourceTypeInput));
  const firstProductionDate = String(valueAnswer(ctx, model.firstProductionDateInput) || "");
  const productionYearNumber = Number(valueAnswer(ctx, model.productionYearNumberInput));
  const kwhProduced = numberAnswer(ctx, model.kwhProducedInput);
  const ownershipPercentage = fractionAnswer(ctx, model.ownershipPercentageInput, 1);
  const certifiedCreditCents = numberAnswer(ctx, model.certifiedCreditAmountInput);
  const taxLiabilityCents = numberAnswer(ctx, model.taxLiabilityInput);

  if (model.latestEligibleFirstProductionDate && firstProductionDate > model.latestEligibleFirstProductionDate) {
    return {
      amountCents: 0,
      trace: [
        `Facility first-production date ${firstProductionDate} is after ${model.latestEligibleFirstProductionDate}, so Arizona production credit value is zero.`
      ]
    };
  }

  let grossCreditCents = 0;
  if (["wind", "biomass"].includes(resourceType)) {
    grossCreditCents = Math.min(kwhProduced, Number(model.windBiomassKwhCap || 200000000)) * Number(model.windBiomassRateCentsPerKwh || 1);
  } else {
    const rateCents = Number(model.solarRateCentsByProductionYear?.[String(productionYearNumber)] ?? 0);
    grossCreditCents = kwhProduced * rateCents;
  }

  const facilityCreditCents = Math.min(
    grossCreditCents,
    Number(model.maxFacilityAnnualCreditCents || Number.POSITIVE_INFINITY)
  ) * ownershipPercentage;
  const allowedCreditCents = Math.min(facilityCreditCents, certifiedCreditCents, taxLiabilityCents);

  return {
    amountCents: Math.round(Math.max(0, allowedCreditCents)),
    trace: [
      `Gross Arizona production credit ${grossCreditCents} cents for ${kwhProduced} kWh and resource ${resourceType}.`,
      `Applied facility cap and ownership percentage ${ownershipPercentage}: ${facilityCreditCents} cents.`,
      `Allowed current-year value is min(facility credit, certified amount, tax liability) = ${allowedCreditCents} cents.`
    ]
  };
}

function calculateColoradoHeatPumpInvoiceDiscount(rule, ctx) {
  const model = rule.calculationModel || {};
  const invoiceDiscountCents = numberAnswer(ctx, model.invoiceDiscountInput);
  return {
    amountCents: Math.round(Math.max(0, invoiceDiscountCents)),
    trace: [
      `Colorado heat-pump customer-facing tax-credit value uses the separately stated invoice discount: ${invoiceDiscountCents} cents.`
    ]
  };
}

function calculateConnecticutGreenBuildingCredit(rule, ctx) {
  const model = rule.calculationModel || {};
  const projectType = normalizeKey(valueAnswer(ctx, model.projectTypeInput));
  const certificationLevel = normalizeKey(valueAnswer(ctx, model.certificationLevelInput));
  const allowableCostsCents = numberAnswer(ctx, model.allowableCostsInput);
  const squareFeet = numberAnswer(ctx, model.squareFeetInput);
  const voucherAmountCents = numberAnswer(ctx, model.voucherAmountInput);
  const taxLiabilityLimitCents = numberAnswer(ctx, model.taxLiabilityLimitInput);
  const availableCreditCents = numberAnswer(ctx, model.availableCreditForTaxYearInput);
  const bonusRate = fractionAnswer(ctx, model.bonusRateInput, 0);

  const costCapPerSquareFootCents = costCapPerSquareFoot(model, projectType);
  const baseRate = greenBuildingBaseRate(model, projectType, certificationLevel);
  const cappedAllowableCostsCents = Math.min(allowableCostsCents, squareFeet * costCapPerSquareFootCents);
  const totalCreditEarnedCents = Math.min(voucherAmountCents, cappedAllowableCostsCents * (baseRate + bonusRate));
  const annualClaimLimitCents = allowableCostsCents * Number(model.annualClaimLimitPercent || 0.25);
  const currentYearCreditCents = Math.min(
    totalCreditEarnedCents,
    annualClaimLimitCents,
    availableCreditCents,
    taxLiabilityLimitCents
  );

  return {
    amountCents: Math.round(Math.max(0, currentYearCreditCents)),
    trace: [
      `Capped allowable costs: min(${allowableCostsCents}, ${squareFeet} * ${costCapPerSquareFootCents}) = ${cappedAllowableCostsCents} cents.`,
      `Credit before current-year limits: min(voucher ${voucherAmountCents}, capped costs * rate ${baseRate + bonusRate}) = ${totalCreditEarnedCents} cents.`,
      `Current-year value: min(total credit, annual limit ${annualClaimLimitCents}, available credit ${availableCreditCents}, tax liability ${taxLiabilityLimitCents}) = ${currentYearCreditCents} cents.`
    ]
  };
}

function resultForRule(rule, calculated) {
  return {
    taxRuleId: rule.taxRuleId || null,
    sourceSkippedRecordId: rule.sourceSkippedRecordId || null,
    status: "calculated",
    amountCents: Math.round(calculated.amountCents || 0),
    includedInUserFacingTotal: rule.includeInUserFacingTotalDefault === true,
    missingInputs: [],
    trace: [
      ...(calculated.trace || []),
      rule.includeInUserFacingTotalDefault === true
        ? "Tax-gap rule is configured for customer-facing totals."
        : "Tax-gap rule remains internal-only until source, tax-return, certificate, and user-input gates are intentionally enabled."
    ]
  };
}

function blockedResult(rule, status, reasons = []) {
  return {
    taxRuleId: rule?.taxRuleId || null,
    sourceSkippedRecordId: rule?.sourceSkippedRecordId || null,
    status,
    amountCents: 0,
    includedInUserFacingTotal: false,
    missingInputs: [],
    trace: reasons
  };
}

function missingRequiredInputs(rule, ctx) {
  return (rule.canonicalInputRequirements || [])
    .filter((input) => input.missingSeverity !== "optional")
    .filter((input) => !hasRuntimeAnswer(ctx, input.inputKey))
    .map((input) => ({
      inputKey: input.inputKey,
      label: input.label || input.inputKey,
      sourceStrategy: input.sourceStrategy || null,
      uiPlacement: input.uiPlacement || null
    }));
}

function requiredTrueGateResult(rule, ctx) {
  const model = rule.calculationModel || {};
  for (const inputKey of model.requiredTrueInputs || []) {
    const value = booleanAnswer(ctx, inputKey);
    if (value === false) {
      return {
        taxRuleId: rule.taxRuleId || null,
        sourceSkippedRecordId: rule.sourceSkippedRecordId || null,
        status: "zero_value",
        amountCents: 0,
        includedInUserFacingTotal: false,
        missingInputs: [],
        trace: [`Required gate ${inputKey} is false, so tax value is zero.`]
      };
    }
  }
  return null;
}

function costCapPerSquareFoot(model, projectType) {
  const table = model.costCapCentsPerSquareFootByProjectType || {};
  return Number(table[projectType] ?? table.default ?? 0);
}

function greenBuildingBaseRate(model, projectType, certificationLevel) {
  const key = `${projectType}:${certificationLevel}`;
  const table = model.baseRateByProjectAndCertification || {};
  return Number(table[key] ?? table[certificationLevel] ?? 0);
}

function hasRuntimeAnswer(ctx, key) {
  if (!key) return true;
  if (hasAnswer(ctx.answers || {}, key)) return true;
  return ctx[key] !== undefined && ctx[key] !== null && ctx[key] !== "";
}

function valueAnswer(ctx, key) {
  if (!key) return null;
  if (hasAnswer(ctx.answers || {}, key)) return answerValue(ctx.answers, key);
  if (ctx[key] !== undefined && ctx[key] !== null && ctx[key] !== "") return ctx[key];
  return null;
}

function numberAnswer(ctx, key) {
  const value = Number(valueAnswer(ctx, key));
  return Number.isFinite(value) ? value : 0;
}

function booleanAnswer(ctx, key) {
  const value = valueAnswer(ctx, key);
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value !== 0;
  const normalized = String(value || "").trim().toLowerCase();
  if (["true", "yes", "y", "1", "approved", "confirmed", "filed", "eligible"].includes(normalized)) return true;
  if (["false", "no", "n", "0", "not_approved", "not_confirmed", "not_filed", "ineligible"].includes(normalized)) return false;
  return null;
}

function fractionAnswer(ctx, key, fallback) {
  if (!key || !hasRuntimeAnswer(ctx, key)) return fallback;
  const number = numberAnswer(ctx, key);
  if (!Number.isFinite(number)) return fallback;
  return number > 1 ? number / 100 : number;
}

function taxRateAnswer(ctx, key) {
  const rate = numberAnswer(ctx, key);
  return rate > 1 ? rate / 100 : rate;
}

function normalizeKey(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}
