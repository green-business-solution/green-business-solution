import { answerValue, hasAnswer } from "./labor.mjs";
import { normalizeTaxGeography } from "./tax.mjs";

export const LOCAL_TAX_WORKFLOW_SCHEMA_VERSION = "tax-local-workflow-rules-v1";

export function selectLocalTaxWorkflows({ workflows = [], geography = {}, taxDomain, taxType } = {}) {
  const normalizedGeography = normalizeTaxGeography(geography);
  return (workflows || [])
    .filter((workflow) => !taxDomain || workflow.taxDomain === taxDomain)
    .filter((workflow) => !taxType || workflow.taxType === taxType)
    .map((workflow) => ({ workflow, score: geographyScore(workflow.geography, normalizedGeography) }))
    .filter((candidate) => candidate.score >= 0)
    .sort((a, b) => b.score - a.score || String(a.workflow.id).localeCompare(String(b.workflow.id)))
    .map((candidate) => candidate.workflow);
}

export function calculateLocalTaxWorkflow(workflow, ctx = {}) {
  if (!workflow || typeof workflow !== "object") {
    return reviewResult(null, "invalid_workflow", ["Workflow is missing or invalid."]);
  }

  if (workflow.calculationStatus === "source_inaccessible") {
    return reviewResult(workflow, "source_inaccessible", workflow.unresolvedGaps || ["Official source is inaccessible."]);
  }

  if (workflow.calculationStatus === "assessor_or_accountant_review_required") {
    return reviewResult(workflow, "review_required", workflow.requiredInputs || []);
  }

  if (workflow.calculationStatus === "calculable_with_tax_bill") {
    return reviewResult(workflow, "needs_tax_bill", workflow.requiredInputs || []);
  }

  const models = workflow.calculationModels || [];
  if (!models.length) return reviewResult(workflow, "no_calculation_model", workflow.requiredInputs || []);

  const model = selectCalculationModel(models, ctx);
  if (!model) {
    return {
      workflowId: workflow.id,
      status: "missing_inputs",
      amountCents: 0,
      includedInUserFacingTotal: false,
      missingInputs: [{ inputKey: "local_business_tax_class", workflowId: workflow.id }],
      trace: [`No local tax calculation row matched ${workflow.id}; business tax class is required.`]
    };
  }

  const missingInputs = missingInputsForModel(model, ctx);
  if (missingInputs.length) {
    return {
      workflowId: workflow.id,
      modelId: model.modelId,
      status: "missing_inputs",
      amountCents: 0,
      includedInUserFacingTotal: false,
      missingInputs: missingInputs.map((inputKey) => ({ inputKey, workflowId: workflow.id, modelId: model.modelId })),
      trace: [`Missing required local tax inputs for ${model.modelId}: ${missingInputs.join(", ")}.`]
    };
  }

  const calculated = calculateModel(model, ctx);
  const cappedAmount = Number.isFinite(workflow.maxCents)
    ? Math.min(calculated.amountCents, Number(workflow.maxCents))
    : calculated.amountCents;

  return {
    workflowId: workflow.id,
    modelId: model.modelId,
    status: "calculated",
    amountCents: Math.round(cappedAmount),
    includedInUserFacingTotal: workflow.includeInUserFacingTotalDefault === true,
    missingInputs: [],
    trace: [
      `Calculated ${model.modelId} for ${workflow.id}.`,
      ...calculated.trace,
      workflow.includeInUserFacingTotalDefault === true
        ? "Workflow is configured for user-facing totals."
        : "Workflow defaults to internal-only until confirmed by user, bill, accountant, or assessor inputs."
    ]
  };
}

function reviewResult(workflow, status, inputsOrReasons) {
  return {
    workflowId: workflow?.id || null,
    status,
    amountCents: 0,
    includedInUserFacingTotal: false,
    missingInputs: (inputsOrReasons || []).map((inputKey) => ({ inputKey, workflowId: workflow?.id || null })),
    trace: [`Local tax workflow ${workflow?.id || "unknown"} status: ${status}.`]
  };
}

function selectCalculationModel(models, ctx) {
  const classValue = normalizeClass(
    firstAnswer(ctx, [
      "local_business_tax_class",
      "business_tax_classification",
      "business_license_class",
      "public_utility_activity_type"
    ])
  );

  if (!classValue && models.length === 1 && !(models[0].appliesToClasses || []).length) return models[0];
  if (!classValue) return null;

  return models.find((model) => (model.appliesToClasses || []).map(normalizeClass).includes(classValue)) || null;
}

function missingInputsForModel(model, ctx) {
  return (model.inputKeys || []).filter((inputKey) => !hasRuntimeAnswer(ctx, inputKey));
}

function calculateModel(model, ctx) {
  switch (model.method) {
    case "fixed_amount":
      return { amountCents: Number(model.amountCents || 0), trace: [`Fixed amount ${model.amountCents || 0} cents.`] };

    case "fixed_plus_per_employee": {
      const employeeCount = numberAnswer(ctx, model.employeeInput);
      const countedEmployees = Math.max(0, employeeCount - Number(model.employeeOffset || 0));
      const amountCents = Number(model.baseCents || 0) + countedEmployees * Number(model.perEmployeeCents || 0);
      return applyModelCap(amountCents, model, [
        `Base ${model.baseCents || 0} + ${countedEmployees} employees * ${model.perEmployeeCents || 0} cents.`
      ]);
    }

    case "valuation_per_thousand": {
      const valuationCents = numberAnswer(ctx, model.valuationInput);
      const valuationDollars = valuationCents / 100;
      const amountCents = Math.ceil(valuationDollars / 1000) * Number(model.centsPerThousandDollars || 0);
      const minimumApplied = applyModelMinimum(amountCents, model, [`${valuationDollars} valuation dollars per $1,000.`]);
      return applyModelCap(minimumApplied.amountCents, model, minimumApplied.trace);
    }

    case "base_plus_sqft_over_threshold": {
      const squareFeet = numberAnswer(ctx, model.squareFeetInput);
      const extraSquareFeet = Math.max(0, squareFeet - Number(model.includedSquareFeet || 0));
      const increments = Math.ceil(extraSquareFeet / Number(model.incrementSquareFeet || 1));
      const amountCents = Number(model.baseCents || 0) + increments * Number(model.centsPerIncrement || 0);
      return applyModelCap(amountCents, model, [
        `Base ${model.baseCents || 0} + ${increments} square-foot increments * ${model.centsPerIncrement || 0} cents.`
      ]);
    }

    case "base_plus_units_over_threshold": {
      const units = numberAnswer(ctx, model.unitInput);
      const extraUnits = Math.max(0, units - Number(model.includedUnits || 0));
      return {
        amountCents: Number(model.baseCents || 0) + extraUnits * Number(model.centsPerAdditionalUnit || 0),
        trace: [`Base ${model.baseCents || 0} + ${extraUnits} additional units * ${model.centsPerAdditionalUnit || 0} cents.`]
      };
    }

    case "gross_receipts_rate": {
      const grossReceiptsCents = numberAnswer(ctx, model.grossReceiptsInput);
      if (Number.isFinite(model.lowGrossThresholdCents) && grossReceiptsCents < Number(model.lowGrossThresholdCents)) {
        return {
          amountCents: Number(model.lowGrossAmountCents || 0),
          trace: [`Gross receipts ${grossReceiptsCents} cents below threshold ${model.lowGrossThresholdCents}; using low-gross amount.`]
        };
      }
      const rate = Number.isFinite(model.rateDecimal) ? Number(model.rateDecimal) : numberAnswer(ctx, model.rateInput);
      const amountCents = grossReceiptsCents * rate;
      return applyModelMinimum(amountCents, model, [`Gross receipts ${grossReceiptsCents} cents * rate ${rate}.`]);
    }

    case "everett_bo_ordinary_rate": {
      const grossReceiptsCents = numberAnswer(ctx, model.grossReceiptsInput);
      const deductionsCents = model.deductionsInput ? numberAnswer(ctx, model.deductionsInput) : 0;
      const taxableReceiptsCents = Math.max(0, grossReceiptsCents - deductionsCents);
      const filingFrequency = normalizeClass(firstAnswer(ctx, [model.filingFrequencyInput]));
      const thresholdCents =
        filingFrequency === "quarterly"
          ? Number(model.quarterlyNoTaxThresholdCents)
          : filingFrequency === "annual"
            ? Number(model.annualNoTaxThresholdCents)
            : null;

      if (Number.isFinite(thresholdCents) && taxableReceiptsCents <= thresholdCents) {
        return {
          amountCents: 0,
          trace: [
            `Everett taxable B&O receipts ${taxableReceiptsCents} cents are at or below ${filingFrequency} no-tax threshold ${thresholdCents} cents.`
          ]
        };
      }

      const rate = Number(model.rateDecimal || 0);
      return {
        amountCents: taxableReceiptsCents * rate,
        trace: [
          `Everett taxable B&O receipts ${taxableReceiptsCents} cents * ordinary B&O rate ${rate}.`,
          filingFrequency === "monthly" ? "Monthly no-tax threshold was not source-confirmed, so no threshold was applied." : `Filing frequency: ${filingFrequency}.`
        ]
      };
    }

    case "class_rate_table": {
      const classValue = normalizeClass(firstAnswer(ctx, [model.classInput, "local_business_tax_class"]));
      const rate = model.ratesByClass?.[classValue];
      const grossReceiptsCents = numberAnswer(ctx, model.grossReceiptsInput);
      return {
        amountCents: grossReceiptsCents * Number(rate || 0),
        trace: [`Gross income ${grossReceiptsCents} cents * class rate ${rate || 0} for ${classValue}.`]
      };
    }

    case "conditional_fixed_amount": {
      const conditionApplies = model.conditionInput ? booleanAnswer(ctx, model.conditionInput) === true : true;
      const amountCents = conditionApplies ? Number(model.amountCents || 0) : 0;
      return {
        amountCents,
        trace: [`Conditional fixed amount ${model.amountCents || 0} cents; condition applies: ${conditionApplies}.`]
      };
    }

    case "fixed_amount_by_key": {
      const selectedKey = normalizeClass(firstAnswer(ctx, [model.selectorInput]));
      const amountCents = Number(model.amountCentsByKey?.[selectedKey] || 0);
      return {
        amountCents,
        trace: [`Selected ${selectedKey || "unknown"} fixed amount ${amountCents} cents.`]
      };
    }

    case "unit_rate": {
      const units = numberAnswer(ctx, model.unitInput);
      if (Number.isFinite(model.minimumUnitsForTax) && units < Number(model.minimumUnitsForTax)) {
        return {
          amountCents: 0,
          trace: [`${units} units below taxable minimum ${model.minimumUnitsForTax}; tax is zero.`]
        };
      }
      return applyModelMinimum(units * Number(model.centsPerUnit || 0), model, [
        `${units} units * ${model.centsPerUnit || 0} cents.`
      ]);
    }

    case "percentage_rate": {
      const conditionApplies = model.conditionInput ? booleanAnswer(ctx, model.conditionInput) === true : true;
      const amountBaseCents = numberAnswer(ctx, model.amountInput);
      const rate = Number(model.rateDecimal || 0);
      return {
        amountCents: conditionApplies ? amountBaseCents * rate : 0,
        trace: [`${amountBaseCents} cents * rate ${rate}; condition applies: ${conditionApplies}.`]
      };
    }

    case "percentage_rate_by_key": {
      const conditionApplies = model.conditionInput ? booleanAnswer(ctx, model.conditionInput) === true : true;
      const selectedKey = normalizeClass(firstAnswer(ctx, [model.selectorInput]));
      const amountBaseCents = numberAnswer(ctx, model.amountInput);
      const rate = Number(model.ratesByKey?.[selectedKey] || 0);
      return {
        amountCents: conditionApplies ? amountBaseCents * rate : 0,
        trace: [`${amountBaseCents} cents * keyed rate ${rate} for ${selectedKey || "unknown"}; condition applies: ${conditionApplies}.`]
      };
    }

    case "percentage_rate_with_unit_threshold": {
      const conditionApplies = model.conditionInput ? booleanAnswer(ctx, model.conditionInput) === true : true;
      const units = numberAnswer(ctx, model.unitInput);
      const amountBaseCents = numberAnswer(ctx, model.amountInput);
      const thresholdMet = units >= Number(model.minimumUnitsForTax || 0);
      const rate = Number(model.rateDecimal || 0);
      return {
        amountCents: conditionApplies && thresholdMet ? amountBaseCents * rate : 0,
        trace: [
          `${amountBaseCents} cents * rate ${rate}; condition applies: ${conditionApplies}; units ${units} meet threshold ${model.minimumUnitsForTax || 0}: ${thresholdMet}.`
        ]
      };
    }

    case "professional_employee_formula": {
      const principals = numberAnswer(ctx, model.professionalPrincipalInput);
      const professionalEmployees = numberAnswer(ctx, model.professionalEmployeeInput);
      const nonProfessionalEmployees = numberAnswer(ctx, model.nonProfessionalEmployeeInput);
      const amountCents =
        (principals > 0 ? Number(model.firstProfessionalCents || 0) : 0) +
        Math.max(0, principals - 1) * Number(model.additionalProfessionalCents || 0) +
        professionalEmployees * Number(model.professionalEmployeeCents || 0) +
        nonProfessionalEmployees * Number(model.nonProfessionalEmployeeCents || 0);
      return applyModelCap(amountCents, model, [
        `Professional formula with ${principals} principals, ${professionalEmployees} professional employees, ${nonProfessionalEmployees} other employees.`
      ]);
    }

    case "square_foot_rate": {
      const squareFeet = numberAnswer(ctx, model.squareFeetInput);
      return {
        amountCents: squareFeet * Number(model.centsPerSquareFoot || 0),
        trace: [`${squareFeet} square feet * ${model.centsPerSquareFoot || 0} cents.`]
      };
    }

    case "two_receipts_rate": {
      const first = numberAnswer(ctx, model.firstGrossReceiptsInput);
      const second = numberAnswer(ctx, model.secondGrossReceiptsInput);
      const amountCents = first * Number(model.firstRateDecimal || 0) + second * Number(model.secondRateDecimal || 0);
      return applyModelMinimum(amountCents, model, [
        `${first} cents * ${model.firstRateDecimal || 0} + ${second} cents * ${model.secondRateDecimal || 0}.`
      ]);
    }

    case "san_diego_employee_certificate": {
      const employees = numberAnswer(ctx, model.employeeInput);
      const base = employees <= 12 ? 3400 : 12500 + 500 * employees;
      const sb1186Fee = booleanAnswer(ctx, model.sb1186FeeAppliesInput) === true ? 400 : 0;
      const minimumWageFee = booleanAnswer(ctx, model.minimumWageFeeAppliesInput) === true ? Math.round(147 * employees) : 0;
      return {
        amountCents: base + sb1186Fee + minimumWageFee,
        trace: [`San Diego base ${base} cents + SB-1186 ${sb1186Fee} cents + minimum-wage fee ${minimumWageFee} cents.`]
      };
    }

    case "rental_unit_tier": {
      const rentalType = normalizeClass(firstAnswer(ctx, [model.rentalTypeInput]));
      const units = numberAnswer(ctx, model.unitInput);
      const parcelCount = Math.max(1, numberAnswer(ctx, model.parcelCountInput));
      const tier = (model.tiers || []).find((candidate) => {
        const types = (candidate.rentalTypes || []).map(normalizeClass);
        const maxUnits = candidate.maxUnits === null || candidate.maxUnits === undefined ? Number.POSITIVE_INFINITY : Number(candidate.maxUnits);
        return types.includes(rentalType) && units >= Number(candidate.minUnits || 0) && units <= maxUnits;
      });

      if (!tier) {
        return {
          amountCents: 0,
          trace: [`No rental unit tier matched ${rentalType || "unknown"} with ${units} units.`]
        };
      }

      return {
        amountCents: Number(tier.baseFeePerParcelCents || 0) * parcelCount + Number(tier.perUnitCents || 0) * units,
        trace: [
          `${parcelCount} parcels * ${tier.baseFeePerParcelCents || 0} cents + ${units} units * ${tier.perUnitCents || 0} cents for ${rentalType}.`
        ]
      };
    }

    default:
      return { amountCents: 0, trace: [`Unsupported local tax model method: ${model.method || "unknown"}.`] };
  }
}

function applyModelMinimum(amountCents, model, trace) {
  const minCents = Number(model.minCents);
  if (Number.isFinite(minCents) && amountCents < minCents) {
    return { amountCents: minCents, trace: [...trace, `Applied minimum ${minCents} cents.`] };
  }
  return { amountCents, trace };
}

function applyModelCap(amountCents, model, trace) {
  const maxCents = Number(model.maxCents);
  if (Number.isFinite(maxCents) && amountCents > maxCents) {
    return { amountCents: maxCents, trace: [...trace, `Applied maximum ${maxCents} cents.`] };
  }
  return { amountCents, trace };
}

function geographyScore(ruleGeography = {}, geography = {}) {
  const normalizedRule = normalizeTaxGeography(ruleGeography);
  const ruleCountries = listWithSingle(normalizedRule, "countries", "country");
  const ruleStates = listWithSingle(normalizedRule, "states", "state");
  const ruleCountyFips = listWithSingle(normalizedRule, "countyFipsList", "countyFips");
  const ruleCities = listWithSingle(normalizedRule, "cities", "city").concat(normalizedRule.municipalities || []);

  if (ruleCountries.length && geography.country && !ruleCountries.includes(geography.country)) return -1;
  if (ruleStates.length && (!geography.state || !ruleStates.includes(geography.state))) return -1;
  if (ruleCountyFips.length && (!geography.countyFips || !ruleCountyFips.includes(geography.countyFips))) return -1;
  if (ruleCities.length && !hasCityOverlap(ruleCities, cityValues(geography))) return -1;

  let score = 0;
  if (ruleCountries.length) score += 1;
  if (ruleStates.length) score += 2;
  if (ruleCountyFips.length) score += 4;
  if (ruleCities.length) score += 8;
  return score;
}

function listWithSingle(value, pluralKey, singularKey) {
  return [...new Set([...(value[pluralKey] || []), value[singularKey]].filter(Boolean))];
}

function cityValues(geography) {
  return [geography.city, geography.municipality, geography.placeName, ...(geography.cities || []), ...(geography.municipalities || [])]
    .filter(Boolean)
    .flatMap(cityNameVariants);
}

function hasCityOverlap(ruleCities, values) {
  const normalizedRuleCities = ruleCities.flatMap(cityNameVariants);
  return normalizedRuleCities.some((city) => values.includes(city));
}

function hasRuntimeAnswer(ctx, inputKey) {
  if (!inputKey) return true;
  if (hasAnswer(ctx.answers || {}, inputKey)) return true;
  return ctx[inputKey] !== undefined && ctx[inputKey] !== null && ctx[inputKey] !== "";
}

function numberAnswer(ctx, inputKey) {
  const value = firstAnswer(ctx, [inputKey]);
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

function booleanAnswer(ctx, inputKey) {
  const value = firstAnswer(ctx, [inputKey]);
  if (typeof value === "boolean") return value;
  const normalized = String(value || "").trim().toLowerCase();
  if (["true", "yes", "y", "1", "applies"].includes(normalized)) return true;
  if (["false", "no", "n", "0", "does_not_apply"].includes(normalized)) return false;
  return null;
}

function firstAnswer(ctx, keys = []) {
  for (const key of keys) {
    if (!key) continue;
    if (hasAnswer(ctx.answers || {}, key)) return answerValue(ctx.answers, key);
    if (ctx[key] !== undefined && ctx[key] !== null && ctx[key] !== "") return ctx[key];
  }
  return null;
}

function normalizeClass(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function cityNameVariants(value) {
  const normalized = normalizeClass(value);
  return [
    normalized,
    normalized.replace(/_(city|town|village|borough|municipality)$/, "")
  ].filter(Boolean);
}
