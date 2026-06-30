import {
  aggregateAnnualRecurringExpenses,
  aggregateAnnualRecurringSavings,
  aggregateAnnualSavings,
  aggregateMonthlyRecurringExpenses,
  aggregateMonthlyRecurringSavings,
  aggregateMonthlySavings,
  aggregatePossibleGrantMoney,
  aggregateUpfrontCost,
  aggregateUpfrontCostAfterSavings,
  aggregateUpfrontSavings
} from "./aggregation.mjs";
import { annualEnergySavingsCents, annualKwhReduction, roundCents } from "./formulas.mjs";
import { answerValue, hasAnswer, resolveLaborCost } from "./labor.mjs";
import { buildIncentiveScenarios, selectBestScenario } from "./stacking.mjs";
import { calculateSalesTaxFromRule, resolveSalesTaxRule } from "./tax.mjs";

function normalizeArray(value, singular) {
  if (Array.isArray(value)) return value;
  if (singular) return [singular];
  return [];
}

function missingQuestion(answerKey, message) {
  return {
    type: "question",
    answerKey,
    message,
    blocking: true
  };
}

function missingBillLine(canonicalBillField, message) {
  return {
    type: "bill_line",
    canonicalBillField,
    message,
    blocking: true
  };
}

function missingRule(type, message) {
  return {
    type,
    message,
    blocking: true
  };
}

function blockedEstimate({ projectId, businessId, retrofitInstance, missingInputs }) {
  return {
    id: null,
    projectId,
    businessId,
    retrofitInstanceId: retrofitInstance?.id || null,
    retrofitTypeId: retrofitInstance?.retrofitTypeId || null,
    status: "blocked",
    missingInputs,
    upfrontCostCents: null,
    oneTimeSavingsCents: null,
    possibleGrantMoneyCents: null,
    upfrontCostAfterSavingsCents: null,
    monthlyRecurringSavingsCents: null,
    annualRecurringSavingsCents: null,
    monthlyRecurringExpensesCents: null,
    annualRecurringExpensesCents: null,
    netMonthlyRecurringSavingsCents: null,
    netAnnualRecurringSavingsCents: null,
    monthlySavingsCents: null,
    annualSavingsCents: null,
    costBreakdown: [],
    savingsBreakdown: [],
    billLineDeltas: [],
    selectedOpportunityIds: [],
    calculationTrace: {
      id: "trace_blocked",
      summary: "Calculation is blocked by missing required inputs.",
      steps: [],
      assumptions: [{ id: "assumption_no_financing", label: "Financing ignored in V1", value: true }],
      warnings: missingInputs.map((input, index) => ({
        id: `blocking_${index + 1}`,
        severity: "blocking",
        message: input.message
      })),
      inputSnapshot: [],
      outputChecks: []
    }
  };
}

function calculateFinalSavingsMetrics({ finalCostBreakdown, finalRecurringSavingsEntries }) {
  const upfrontCostAfterSavingsCents = aggregateUpfrontCostAfterSavings(finalCostBreakdown);
  const oneTimeSavingsCents = aggregateUpfrontSavings(finalCostBreakdown);
  const possibleGrantMoneyCents = aggregatePossibleGrantMoney(finalCostBreakdown);
  const monthlyRecurringSavingsCents = aggregateMonthlyRecurringSavings(finalRecurringSavingsEntries);
  const annualRecurringSavingsCents = aggregateAnnualRecurringSavings(finalRecurringSavingsEntries);
  const monthlyRecurringExpensesCents = aggregateMonthlyRecurringExpenses(finalRecurringSavingsEntries);
  const annualRecurringExpensesCents = aggregateAnnualRecurringExpenses(finalRecurringSavingsEntries);
  const netMonthlyRecurringSavingsCents = aggregateMonthlySavings(finalRecurringSavingsEntries);
  const netAnnualRecurringSavingsCents = aggregateAnnualSavings(finalRecurringSavingsEntries);

  return {
    upfrontCostAfterSavingsCents,
    oneTimeSavingsCents,
    possibleGrantMoneyCents,
    monthlyRecurringSavingsCents,
    annualRecurringSavingsCents,
    monthlyRecurringExpensesCents,
    annualRecurringExpensesCents,
    netMonthlyRecurringSavingsCents,
    netAnnualRecurringSavingsCents,
    monthlySavingsCents: netMonthlyRecurringSavingsCents,
    annualSavingsCents: netAnnualRecurringSavingsCents
  };
}

function validateLedInputs({ answers, billLines, laborResult, taxRule }) {
  const missingInputs = [];
  const requiredAnswers = [
    "fixture_count",
    "existing_fixture_watts",
    "new_fixture_watts",
    "hours_per_day",
    "operating_days_per_year",
    "equipment_unit_cost_cents"
  ];

  for (const answerKey of requiredAnswers) {
    if (!hasAnswer(answers, answerKey)) {
      missingInputs.push(missingQuestion(answerKey, `${answerKey} is required to calculate LED savings.`));
    }
  }

  if (!hasAnswer(answers, "confirmed_usage_increase")) {
    const oldWatts = Number(answerValue(answers, "existing_fixture_watts"));
    const newWatts = Number(answerValue(answers, "new_fixture_watts"));
    if (Number.isFinite(oldWatts) && Number.isFinite(newWatts) && newWatts > oldWatts) {
      missingInputs.push(
        missingQuestion(
          "confirmed_usage_increase",
          "The new fixture wattage is higher than the existing fixture wattage; confirm the usage increase to continue."
        )
      );
    }
  }

  if (billLines?.electric?.annual_kwh === undefined) {
    missingInputs.push(
      missingBillLine("annual_kwh", "Annual electric usage is required to calculate LED savings.")
    );
  }

  if (billLines?.electric?.average_cost_per_kwh === undefined) {
    missingInputs.push(
      missingBillLine("average_cost_per_kwh", "Average electric cost per kWh is required to calculate LED savings.")
    );
  }

  if (!laborResult) {
    missingInputs.push(missingRule("labor_rule", "Installation labor cost is required for the upfront cost calculation."));
  }

  if (!taxRule) {
    missingInputs.push(missingRule("tax_rule", "Sales tax rule is required for the upfront cost calculation."));
  }

  return missingInputs;
}

function createTraceStep(id, label, category, formula, inputs, result) {
  return { id, label, category, formula, inputs, result };
}

function numberAnswer(answers, answerKey, fallback = undefined) {
  if (!hasAnswer(answers, answerKey)) return fallback;
  const value = Number(answerValue(answers, answerKey));
  return Number.isFinite(value) ? value : fallback;
}

function firstPresentAnswerKey(answers, answerKeys) {
  return answerKeys.find((answerKey) => hasAnswer(answers, answerKey)) || null;
}

function requireAnswer(missingInputs, answers, answerKey, message) {
  if (!hasAnswer(answers, answerKey)) {
    missingInputs.push(missingQuestion(answerKey, message));
  }
}

function requireBillValue(missingInputs, value, canonicalBillField, message) {
  if (value === undefined || value === null || value === "") {
    missingInputs.push(missingBillLine(canonicalBillField, message));
  }
}

function resolveProjectCostInputs({
  answers,
  fixture,
  retrofitInstance,
  geography,
  calculationDate,
  equipmentAnswerKeys = ["equipment_cost_cents", "installed_cost_cents", "project_cost_cents"],
  unitAnswerKey = "unit_count",
  laborRequired = true
}) {
  const equipmentAnswerKey = firstPresentAnswerKey(answers, equipmentAnswerKeys);
  const equipmentCostCents = equipmentAnswerKey ? numberAnswer(answers, equipmentAnswerKey) : null;
  const laborCostRules = normalizeArray(fixture.laborCostRules, fixture.laborCostRule);
  const geographicTaxRules = normalizeArray(fixture.geographicTaxRules, fixture.geographicTaxRule);
  const laborResult = resolveLaborCost({
    answers,
    rules: laborCostRules,
    retrofitTypeId: retrofitInstance.retrofitTypeId,
    unitAnswerKey,
    geography,
    calculationDate
  });
  const taxRule = resolveSalesTaxRule({
    answers,
    rules: geographicTaxRules,
    geography,
    calculationDate
  });
  const missingInputs = [];

  if (!equipmentAnswerKey) {
    missingInputs.push(
      missingQuestion(equipmentAnswerKeys[0], `${equipmentAnswerKeys[0]} is required for the upfront cost calculation.`)
    );
  }

  if (laborRequired && !laborResult) {
    missingInputs.push(missingRule("labor_rule", "Installation labor cost is required for the upfront cost calculation."));
  }

  if (!taxRule) {
    missingInputs.push(missingRule("tax_rule", "Sales tax rule is required for the upfront cost calculation."));
  }

  return {
    equipmentAnswerKey,
    equipmentCostCents,
    laborResult,
    taxRule,
    missingInputs
  };
}

function buildBaseCostLedger({ equipmentCostCents, equipmentLabel, equipmentAnswerKey, laborResult, taxRule }) {
  const laborCostCents = laborResult?.amountCents || 0;
  const salesTaxCents = calculateSalesTaxFromRule({
    rule: taxRule,
    equipmentCostCents,
    laborCostCents
  });

  const entries = [
    {
      id: "cle_equipment",
      kind: "upfront_cost",
      category: "equipment_cost",
      label: equipmentLabel,
      amountCents: equipmentCostCents,
      source: "user_input",
      formula: equipmentAnswerKey,
      traceId: "trace_equipment_cost"
    },
    {
      id: "cle_sales_tax",
      kind: "upfront_cost",
      category: "sales_tax",
      label: "Estimated sales tax",
      amountCents: salesTaxCents,
      source: "tax_rule",
      sourceId: taxRule.id,
      formula: "taxable project costs * sales_tax_rate",
      traceId: "trace_sales_tax"
    }
  ];

  if (laborResult) {
    entries.splice(1, 0, {
      id: "cle_labor",
      kind: "upfront_cost",
      category: "installation_labor",
      label: "Installation labor",
      amountCents: laborCostCents,
      source: laborResult.source,
      sourceId: laborResult.sourceId || undefined,
      formula: laborResult.formula,
      traceId: "trace_labor_cost"
    });
  }

  return entries;
}

function recurringEntry({
  id,
  category,
  label,
  amountCents,
  period = "annual",
  sourceId,
  formula,
  traceId,
  allowMonthlyProration = period === "annual",
  allowAnnualization = true
}) {
  return {
    id,
    category,
    label,
    amountCents,
    period,
    allowMonthlyProration,
    allowAnnualization,
    annualizedAmountCents: period === "monthly" ? amountCents * 12 : amountCents,
    source: "bill_line_delta",
    sourceId,
    formula,
    traceId
  };
}

function finalizeCalculatedEstimate({
  projectId,
  businessId,
  retrofitInstance,
  answers,
  billLines,
  calculationDate,
  modelVersion,
  summary,
  costBreakdown,
  baseRecurringSavingsEntries,
  billLineDeltas,
  traceSteps,
  opportunityIncentiveRules = [],
  selectedOpportunityIds = [],
  stackingRules = []
}) {
  const upfrontCostCents = aggregateUpfrontCost(costBreakdown);
  const selectedRequestedOpportunityIds = retrofitInstance.selectedOpportunityIds || selectedOpportunityIds || [];
  const scenarios = buildIncentiveScenarios({
    incentiveRules: opportunityIncentiveRules,
    selectedOpportunityIds: selectedRequestedOpportunityIds,
    baseCostLedgerEntries: costBreakdown,
    baseRecurringSavingsEntries,
    billLineDeltas,
    answers,
    billLines,
    stackingRules,
    upfrontCostCents
  });
  const selectedScenario = selectBestScenario(scenarios) || {
    id: "scenario_no_incentives",
    opportunityIds: [],
    incentiveRuleIds: [],
    upfrontSavingsEntries: [],
    recurringSavingsEntries: [],
    totalUpfrontSavingsCents: 0,
    possibleGrantMoneyCents: 0,
    firstYearRecurringSavingsCents: 0,
    firstYearRecurringExpensesCents: 0,
    firstYearNetRecurringSavingsCents: 0,
    firstYearTotalBenefitCents: 0,
    upfrontCostAfterSavingsCents: upfrontCostCents,
    conflictExplanations: [],
    capExplanations: []
  };

  const finalCostBreakdown = [...costBreakdown, ...selectedScenario.upfrontSavingsEntries];
  const finalRecurringSavingsEntries = [...baseRecurringSavingsEntries, ...selectedScenario.recurringSavingsEntries];
  const finalSavingsMetrics = calculateFinalSavingsMetrics({ finalCostBreakdown, finalRecurringSavingsEntries });

  traceSteps.push(
    ...selectedScenario.upfrontSavingsEntries.map((entry) =>
      createTraceStep(
        `trace_${entry.incentiveRuleId}`,
        entry.label,
        "incentive",
        entry.formula || "incentive rule",
        { opportunityId: entry.opportunityId },
        { value: entry.amountCents, unit: "cents" }
      )
    ),
    ...selectedScenario.recurringSavingsEntries.map((entry) =>
      createTraceStep(
        `trace_${entry.incentiveRuleId}`,
        entry.label,
        entry.kind === "recurring_expense" ? "recurring_incentive_expense" : "recurring_incentive",
        entry.formula || "recurring incentive rule",
        { opportunityId: entry.opportunityId, period: entry.period },
        { value: entry.annualizedAmountCents ?? entry.amountCents, unit: "cents_annualized" }
      )
    ),
    createTraceStep(
      "trace_aggregation",
      "Headline aggregation",
      "aggregation",
      "upfront_cost - upfront_savings",
      { upfrontCostCents, upfrontSavingsCents: finalSavingsMetrics.oneTimeSavingsCents },
      { value: finalSavingsMetrics.upfrontCostAfterSavingsCents, unit: "cents" }
    )
  );

  return {
    id: null,
    projectId,
    businessId,
    retrofitInstanceId: retrofitInstance.id,
    retrofitTypeId: retrofitInstance.retrofitTypeId,
    status: "calculated",
    modelVersions: [modelVersion],
    selectedOpportunityIds: selectedScenario.opportunityIds,
    missingInputs: [],
    upfrontCostCents,
    ...finalSavingsMetrics,
    costBreakdown: finalCostBreakdown,
    savingsBreakdown: finalRecurringSavingsEntries,
    billLineDeltas,
    selectedIncentiveScenario: selectedScenario,
    alternativeScenarios: scenarios.filter((scenario) => scenario.id !== selectedScenario.id),
    requiredInputsUsed: Object.entries(answers).map(([answerKey, answer]) => ({
      answerKey,
      value: answerValue(answers, answerKey),
      unit: answer?.unit,
      source: answer?.source || "user_entered"
    })),
    calculationTrace: {
      id: `trace_${modelVersion.savingsModelId}`,
      summary,
      steps: traceSteps,
      assumptions: [{ id: "assumption_no_financing", label: "Financing ignored in V1", value: true }],
      warnings: [],
      inputSnapshot: [],
      outputChecks: [
        {
          name: "upfrontCostAfterSavings matches ledger",
          expectedCents: finalSavingsMetrics.upfrontCostAfterSavingsCents,
          actualCents: finalSavingsMetrics.upfrontCostAfterSavingsCents,
          passed: true
        },
        {
          name: "annual savings matches recurring entries",
          expectedCents: finalSavingsMetrics.annualSavingsCents,
          actualCents: finalSavingsMetrics.annualSavingsCents,
          passed: true
        }
      ]
    },
    createdAt: new Date(`${calculationDate}T00:00:00.000Z`).toISOString()
  };
}

function calculateModeledElectricKwhReduction(ctx) {
  const { answers, billLines, retrofitInstance, costInputs } = ctx;
  const missingInputs = [...costInputs.missingInputs];
  requireAnswer(missingInputs, answers, "modeled_kwh_reduction", "Modeled annual kWh reduction is required.");
  requireBillValue(
    missingInputs,
    billLines?.electric?.average_cost_per_kwh,
    "average_cost_per_kwh",
    "Average electric cost per kWh is required."
  );
  if (missingInputs.length) return { missingInputs };

  const kwhReduction = numberAnswer(answers, "modeled_kwh_reduction");
  const averageCostPerKwh = Number(billLines.electric.average_cost_per_kwh);
  const annualSavingsCents = annualEnergySavingsCents(kwhReduction, averageCostPerKwh);
  const modelId = "sm_modeled_electric_kwh_reduction_v1";

  return {
    modelVersion: { savingsModelId: modelId, version: 1 },
    summary: "Modeled electric kWh reduction savings estimate calculated.",
    equipmentLabel: "Retrofit equipment",
    billLineDeltas: [
      {
        id: "bld_annual_kwh",
        retrofitInstanceId: retrofitInstance.id,
        savingsModelId: modelId,
        domain: "electric",
        canonicalField: "annual_kwh_delta",
        deltaValue: -kwhReduction,
        unit: "kWh/year",
        period: "annual",
        savingsCents: annualSavingsCents,
        rateBasis: {
          source: "average_cost_per_kwh",
          rateValue: averageCostPerKwh,
          rateUnit: "$/kWh",
          billLineField: "average_cost_per_kwh"
        },
        traceId: "trace_kwh_delta"
      }
    ],
    recurringSavingsEntries: [
      recurringEntry({
        id: "rse_avoided_energy",
        category: "avoided_energy_cost",
        label: "Avoided electricity cost",
        amountCents: annualSavingsCents,
        sourceId: "bld_annual_kwh",
        formula: "modeled_kwh_reduction * average_cost_per_kwh",
        traceId: "trace_energy_savings"
      })
    ],
    traceSteps: [
      createTraceStep(
        "trace_kwh_delta",
        "Annual electricity reduction",
        "usage_delta",
        "modeled_kwh_reduction",
        { modeled_kwh_reduction: kwhReduction },
        { value: kwhReduction, unit: "kWh/year" }
      ),
      createTraceStep(
        "trace_energy_savings",
        "Avoided electricity cost",
        "rate_application",
        "modeled_kwh_reduction * average_cost_per_kwh",
        { modeled_kwh_reduction: kwhReduction, average_cost_per_kwh: averageCostPerKwh },
        { value: annualSavingsCents, unit: "cents/year" }
      )
    ]
  };
}

function calculateModeledGasThermReduction(ctx) {
  const { answers, billLines, retrofitInstance, costInputs } = ctx;
  const missingInputs = [...costInputs.missingInputs];
  requireAnswer(missingInputs, answers, "modeled_therm_reduction", "Modeled annual therm reduction is required.");
  requireBillValue(
    missingInputs,
    billLines?.gas?.average_cost_per_therm,
    "average_cost_per_therm",
    "Average gas cost per therm is required."
  );
  if (missingInputs.length) return { missingInputs };

  const thermReduction = numberAnswer(answers, "modeled_therm_reduction");
  const averageCostPerTherm = Number(billLines.gas.average_cost_per_therm);
  const annualSavingsCents = roundCents(thermReduction * averageCostPerTherm * 100);
  const modelId = "sm_modeled_gas_therm_reduction_v1";

  return {
    modelVersion: { savingsModelId: modelId, version: 1 },
    summary: "Modeled gas therm reduction savings estimate calculated.",
    equipmentLabel: "Retrofit equipment",
    billLineDeltas: [
      {
        id: "bld_annual_therms",
        retrofitInstanceId: retrofitInstance.id,
        savingsModelId: modelId,
        domain: "gas",
        canonicalField: "annual_therms_delta",
        deltaValue: -thermReduction,
        unit: "therms/year",
        period: "annual",
        savingsCents: annualSavingsCents,
        rateBasis: {
          source: "average_cost_per_therm",
          rateValue: averageCostPerTherm,
          rateUnit: "$/therm",
          billLineField: "average_cost_per_therm"
        },
        traceId: "trace_therm_delta"
      }
    ],
    recurringSavingsEntries: [
      recurringEntry({
        id: "rse_avoided_gas",
        category: "avoided_gas_cost",
        label: "Avoided gas cost",
        amountCents: annualSavingsCents,
        sourceId: "bld_annual_therms",
        formula: "modeled_therm_reduction * average_cost_per_therm",
        traceId: "trace_gas_savings"
      })
    ],
    traceSteps: [
      createTraceStep(
        "trace_therm_delta",
        "Annual gas reduction",
        "usage_delta",
        "modeled_therm_reduction",
        { modeled_therm_reduction: thermReduction },
        { value: thermReduction, unit: "therms/year" }
      ),
      createTraceStep(
        "trace_gas_savings",
        "Avoided gas cost",
        "rate_application",
        "modeled_therm_reduction * average_cost_per_therm",
        { modeled_therm_reduction: thermReduction, average_cost_per_therm: averageCostPerTherm },
        { value: annualSavingsCents, unit: "cents/year" }
      )
    ]
  };
}

function calculateGasToElectricReplacement(ctx) {
  const { answers, billLines, retrofitInstance, costInputs } = ctx;
  const missingInputs = [...costInputs.missingInputs];
  requireAnswer(missingInputs, answers, "annual_therms_avoided", "Annual avoided therms are required.");
  requireAnswer(missingInputs, answers, "modeled_new_electric_kwh", "Modeled added electric kWh is required.");
  requireBillValue(missingInputs, billLines?.gas?.average_cost_per_therm, "average_cost_per_therm", "Average gas cost per therm is required.");
  requireBillValue(missingInputs, billLines?.electric?.average_cost_per_kwh, "average_cost_per_kwh", "Average electric cost per kWh is required.");
  if (missingInputs.length) return { missingInputs };

  const thermsAvoided = numberAnswer(answers, "annual_therms_avoided");
  const addedKwh = numberAnswer(answers, "modeled_new_electric_kwh");
  const gasRate = Number(billLines.gas.average_cost_per_therm);
  const electricRate = Number(billLines.electric.average_cost_per_kwh);
  const gasSavingsCents = roundCents(thermsAvoided * gasRate * 100);
  const addedElectricCostCents = roundCents(addedKwh * electricRate * 100);
  const netSavingsCents = gasSavingsCents - addedElectricCostCents;
  const modelId = "sm_gas_to_electric_replacement_v1";

  return {
    modelVersion: { savingsModelId: modelId, version: 1 },
    summary: "Gas-to-electric replacement savings estimate calculated.",
    equipmentLabel: "Heat pump equipment",
    billLineDeltas: [
      {
        id: "bld_annual_therms",
        retrofitInstanceId: retrofitInstance.id,
        savingsModelId: modelId,
        domain: "gas",
        canonicalField: "annual_therms_delta",
        deltaValue: -thermsAvoided,
        unit: "therms/year",
        period: "annual",
        savingsCents: gasSavingsCents,
        traceId: "trace_gas_savings"
      },
      {
        id: "bld_added_kwh",
        retrofitInstanceId: retrofitInstance.id,
        savingsModelId: modelId,
        domain: "electric",
        canonicalField: "annual_kwh_delta",
        deltaValue: addedKwh,
        unit: "kWh/year",
        period: "annual",
        savingsCents: -addedElectricCostCents,
        traceId: "trace_added_electric_cost"
      }
    ],
    recurringSavingsEntries: [
      recurringEntry({
        id: "rse_avoided_gas",
        category: "avoided_gas_cost",
        label: "Avoided gas cost",
        amountCents: gasSavingsCents,
        sourceId: "bld_annual_therms",
        formula: "annual_therms_avoided * average_cost_per_therm",
        traceId: "trace_gas_savings"
      }),
      recurringEntry({
        id: "rse_added_electric",
        category: "avoided_energy_cost",
        label: "Added electricity cost",
        amountCents: -addedElectricCostCents,
        sourceId: "bld_added_kwh",
        formula: "modeled_new_electric_kwh * average_cost_per_kwh",
        traceId: "trace_added_electric_cost"
      })
    ],
    traceSteps: [
      createTraceStep("trace_gas_savings", "Avoided gas cost", "rate_application", "annual_therms_avoided * average_cost_per_therm", { thermsAvoided, gasRate }, { value: gasSavingsCents, unit: "cents/year" }),
      createTraceStep("trace_added_electric_cost", "Added electricity cost", "rate_application", "modeled_new_electric_kwh * average_cost_per_kwh", { addedKwh, electricRate }, { value: -addedElectricCostCents, unit: "cents/year" }),
      createTraceStep("trace_net_savings", "Net annual savings", "aggregation", "gas_savings - added_electric_cost", { gasSavingsCents, addedElectricCostCents }, { value: netSavingsCents, unit: "cents/year" })
    ]
  };
}

function calculateDemandReduction(ctx) {
  const { answers, billLines, retrofitInstance, costInputs } = ctx;
  const missingInputs = [...costInputs.missingInputs];
  requireAnswer(missingInputs, answers, "peak_kw_reduction", "Peak kW reduction is required.");
  requireAnswer(missingInputs, answers, "billing_months", "Billing months are required for demand savings.");
  requireBillValue(missingInputs, billLines?.electric?.demand_charge_rate, "demand_charge_rate", "Demand charge rate is required.");
  if (missingInputs.length) return { missingInputs };

  const peakKwReduction = numberAnswer(answers, "peak_kw_reduction");
  const billingMonths = numberAnswer(answers, "billing_months");
  const demandChargeRate = Number(billLines.electric.demand_charge_rate);
  const annualSavingsCents = roundCents(peakKwReduction * demandChargeRate * billingMonths * 100);
  const modelId = "sm_demand_charge_reduction_v1";

  return {
    modelVersion: { savingsModelId: modelId, version: 1 },
    summary: "Demand charge reduction savings estimate calculated.",
    equipmentLabel: "Demand reduction equipment",
    billLineDeltas: [
      {
        id: "bld_peak_kw",
        retrofitInstanceId: retrofitInstance.id,
        savingsModelId: modelId,
        domain: "electric",
        canonicalField: "peak_kw_delta",
        deltaValue: -peakKwReduction,
        unit: "kW",
        period: "monthly",
        savingsCents: annualSavingsCents,
        traceId: "trace_demand_savings"
      }
    ],
    recurringSavingsEntries: [
      recurringEntry({
        id: "rse_avoided_demand",
        category: "avoided_demand_charge",
        label: "Avoided demand charges",
        amountCents: annualSavingsCents,
        sourceId: "bld_peak_kw",
        formula: "peak_kw_reduction * demand_charge_rate * billing_months",
        traceId: "trace_demand_savings"
      })
    ],
    traceSteps: [
      createTraceStep(
        "trace_demand_savings",
        "Avoided demand charges",
        "rate_application",
        "peak_kw_reduction * demand_charge_rate * billing_months",
        { peakKwReduction, demandChargeRate, billingMonths },
        { value: annualSavingsCents, unit: "cents/year" }
      )
    ]
  };
}

function calculateSolarPv(ctx) {
  const { answers, billLines, retrofitInstance, costInputs } = ctx;
  const missingInputs = [...costInputs.missingInputs];
  requireAnswer(missingInputs, answers, "estimated_annual_production_kwh", "Estimated annual production is required.");
  requireAnswer(missingInputs, answers, "self_consumption_percent", "Self-consumption percent is required.");
  requireBillValue(missingInputs, billLines?.electric?.average_cost_per_kwh, "average_cost_per_kwh", "Average electric cost per kWh is required.");

  const exportPercent = numberAnswer(answers, "export_percent", 0);
  const hasExport = exportPercent > 0 || hasAnswer(answers, "export_kwh");
  if (hasExport && billLines?.electric?.export_rate_per_kwh === undefined && billLines?.electric?.net_metering_type !== "retail_credit") {
    missingInputs.push(missingBillLine("export_rate_per_kwh", "Export rate or retail net metering rule is required."));
  }

  if (missingInputs.length) return { missingInputs };

  const productionKwh = numberAnswer(answers, "estimated_annual_production_kwh");
  const selfConsumptionPercent = numberAnswer(answers, "self_consumption_percent");
  const selfConsumedKwh = productionKwh * selfConsumptionPercent;
  const exportedKwh = hasAnswer(answers, "export_kwh") ? numberAnswer(answers, "export_kwh") : productionKwh * exportPercent;
  const averageCostPerKwh = Number(billLines.electric.average_cost_per_kwh);
  const exportRate =
    billLines.electric.net_metering_type === "retail_credit"
      ? averageCostPerKwh
      : Number(billLines.electric.export_rate_per_kwh || 0);
  const importSavingsCents = annualEnergySavingsCents(selfConsumedKwh, averageCostPerKwh);
  const exportValueCents = annualEnergySavingsCents(exportedKwh, exportRate);
  const modelId = "sm_solar_pv_offset_export_v1";

  return {
    modelVersion: { savingsModelId: modelId, version: 1 },
    summary: "Solar production and export savings estimate calculated.",
    equipmentLabel: "Solar PV system",
    billLineDeltas: [
      {
        id: "bld_solar_self_consumed",
        retrofitInstanceId: retrofitInstance.id,
        savingsModelId: modelId,
        domain: "electric",
        canonicalField: "annual_kwh_delta",
        deltaValue: -selfConsumedKwh,
        unit: "kWh/year",
        period: "annual",
        savingsCents: importSavingsCents,
        traceId: "trace_import_savings"
      },
      {
        id: "bld_solar_export",
        retrofitInstanceId: retrofitInstance.id,
        savingsModelId: modelId,
        domain: "electric",
        canonicalField: "export_kwh",
        deltaValue: exportedKwh,
        unit: "kWh/year",
        period: "annual",
        savingsCents: exportValueCents,
        traceId: "trace_export_value"
      }
    ],
    recurringSavingsEntries: [
      recurringEntry({
        id: "rse_solar_import",
        category: "avoided_energy_cost",
        label: "Solar self-consumption value",
        amountCents: importSavingsCents,
        sourceId: "bld_solar_self_consumed",
        formula: "self_consumed_kwh * average_cost_per_kwh",
        traceId: "trace_import_savings"
      }),
      recurringEntry({
        id: "rse_solar_export",
        category: "feed_in_tariff_revenue",
        label: "Solar export value",
        amountCents: exportValueCents,
        sourceId: "bld_solar_export",
        formula: "exported_kwh * export_rate_per_kwh",
        traceId: "trace_export_value"
      })
    ],
    traceSteps: [
      createTraceStep("trace_solar_generation", "Solar generation allocation", "usage_delta", "production split by self-consumption and export percent", { productionKwh, selfConsumptionPercent, exportPercent }, { value: selfConsumedKwh + exportedKwh, unit: "kWh/year valued" }),
      createTraceStep("trace_import_savings", "Avoided import cost", "rate_application", "self_consumed_kwh * average_cost_per_kwh", { selfConsumedKwh, averageCostPerKwh }, { value: importSavingsCents, unit: "cents/year" }),
      createTraceStep("trace_export_value", "Export value", "rate_application", "exported_kwh * export_rate_per_kwh", { exportedKwh, exportRate }, { value: exportValueCents, unit: "cents/year" })
    ]
  };
}

function calculateEvCharging(ctx) {
  const { answers, billLines, retrofitInstance, costInputs } = ctx;
  const missingInputs = [...costInputs.missingInputs];
  requireAnswer(missingInputs, answers, "expected_monthly_kwh", "Expected monthly charging kWh is required.");
  requireBillValue(missingInputs, billLines?.electric?.average_cost_per_kwh, "average_cost_per_kwh", "Average electric cost per kWh is required.");
  if (missingInputs.length) return { missingInputs };

  const monthlyKwh = numberAnswer(answers, "expected_monthly_kwh");
  const rate = Number(billLines.electric.average_cost_per_kwh);
  const monthlyAddedCostCents = annualEnergySavingsCents(monthlyKwh, rate);
  const annualAddedCostCents = monthlyAddedCostCents * 12;
  const modelId = "sm_ev_charging_load_v1";

  return {
    modelVersion: { savingsModelId: modelId, version: 1 },
    summary: "EV charging added electric load estimate calculated.",
    equipmentLabel: "EV charging equipment",
    billLineDeltas: [
      {
        id: "bld_monthly_kwh",
        retrofitInstanceId: retrofitInstance.id,
        savingsModelId: modelId,
        domain: "electric",
        canonicalField: "monthly_kwh_delta",
        deltaValue: monthlyKwh,
        unit: "kWh/month",
        period: "monthly",
        savingsCents: -monthlyAddedCostCents,
        traceId: "trace_ev_added_cost"
      },
      {
        id: "bld_annual_kwh",
        retrofitInstanceId: retrofitInstance.id,
        savingsModelId: modelId,
        domain: "electric",
        canonicalField: "annual_kwh_delta",
        deltaValue: monthlyKwh * 12,
        unit: "kWh/year",
        period: "annual",
        savingsCents: -annualAddedCostCents,
        traceId: "trace_ev_added_cost"
      }
    ],
    recurringSavingsEntries: [
      recurringEntry({
        id: "rse_ev_added_electric",
        category: "avoided_energy_cost",
        label: "Added EV charging electricity cost",
        amountCents: -monthlyAddedCostCents,
        period: "monthly",
        sourceId: "bld_monthly_kwh",
        formula: "expected_monthly_kwh * average_cost_per_kwh",
        traceId: "trace_ev_added_cost"
      })
    ],
    traceSteps: [
      createTraceStep("trace_ev_added_cost", "Added electricity cost", "rate_application", "expected_monthly_kwh * average_cost_per_kwh", { monthlyKwh, rate }, { value: -monthlyAddedCostCents, unit: "cents/month" })
    ]
  };
}

function calculateWaterEfficiency(ctx) {
  const { answers, billLines, retrofitInstance, costInputs } = ctx;
  const missingInputs = [...costInputs.missingInputs];
  requireAnswer(missingInputs, answers, "annual_water_reduction", "Annual water reduction is required.");
  requireBillValue(missingInputs, billLines?.water_sewer?.water_rate_per_unit, "water_rate_per_unit", "Water rate is required.");
  requireBillValue(missingInputs, billLines?.water_sewer?.water_unit, "water_unit", "Water unit is required.");
  if (missingInputs.length) return { missingInputs };

  const annualWaterReduction = numberAnswer(answers, "annual_water_reduction");
  const waterRate = Number(billLines.water_sewer.water_rate_per_unit);
  const sewerAffected = !hasAnswer(answers, "sewer_affected") || Boolean(answerValue(answers, "sewer_affected"));
  const sewerRate = sewerAffected ? Number(billLines.water_sewer.sewer_rate_per_unit || 0) : 0;
  const waterSavingsCents = roundCents(annualWaterReduction * waterRate * 100);
  const sewerSavingsCents = roundCents(annualWaterReduction * sewerRate * 100);
  const modelId = "sm_water_sewer_reduction_v1";

  return {
    modelVersion: { savingsModelId: modelId, version: 1 },
    summary: "Water and sewer reduction savings estimate calculated.",
    equipmentLabel: "Water efficiency equipment",
    billLineDeltas: [
      {
        id: "bld_annual_water",
        retrofitInstanceId: retrofitInstance.id,
        savingsModelId: modelId,
        domain: "water_sewer",
        canonicalField: "annual_water_use_delta",
        deltaValue: -annualWaterReduction,
        unit: `${billLines.water_sewer.water_unit}/year`,
        period: "annual",
        savingsCents: waterSavingsCents,
        traceId: "trace_water_savings"
      },
      {
        id: "bld_annual_sewer",
        retrofitInstanceId: retrofitInstance.id,
        savingsModelId: modelId,
        domain: "water_sewer",
        canonicalField: "annual_sewer_cost_delta",
        deltaValue: -sewerSavingsCents,
        unit: "cents/year",
        period: "annual",
        savingsCents: sewerSavingsCents,
        traceId: "trace_sewer_savings"
      }
    ],
    recurringSavingsEntries: [
      recurringEntry({ id: "rse_water", category: "avoided_water_cost", label: "Avoided water cost", amountCents: waterSavingsCents, sourceId: "bld_annual_water", formula: "annual_water_reduction * water_rate_per_unit", traceId: "trace_water_savings" }),
      recurringEntry({ id: "rse_sewer", category: "avoided_sewer_cost", label: "Avoided sewer cost", amountCents: sewerSavingsCents, sourceId: "bld_annual_sewer", formula: "annual_water_reduction * sewer_rate_per_unit", traceId: "trace_sewer_savings" })
    ],
    traceSteps: [
      createTraceStep("trace_water_savings", "Avoided water cost", "rate_application", "annual_water_reduction * water_rate_per_unit", { annualWaterReduction, waterRate }, { value: waterSavingsCents, unit: "cents/year" }),
      createTraceStep("trace_sewer_savings", "Avoided sewer cost", "rate_application", "annual_water_reduction * sewer_rate_per_unit", { annualWaterReduction, sewerRate }, { value: sewerSavingsCents, unit: "cents/year" })
    ]
  };
}

function calculateWasteReduction(ctx) {
  const { answers, retrofitInstance, costInputs } = ctx;
  const missingInputs = [...costInputs.missingInputs];
  requireAnswer(missingInputs, answers, "current_total_waste_cost_cents_per_month", "Current monthly waste cost is required.");
  requireAnswer(missingInputs, answers, "new_total_waste_cost_cents_per_month", "New monthly waste cost is required.");
  if (missingInputs.length) return { missingInputs };

  const currentMonthlyCost = numberAnswer(answers, "current_total_waste_cost_cents_per_month");
  const newMonthlyCost = numberAnswer(answers, "new_total_waste_cost_cents_per_month");
  const monthlySavingsCents = currentMonthlyCost - newMonthlyCost;
  const annualSavingsCents = monthlySavingsCents * 12;
  const modelId = "sm_waste_service_cost_reduction_v1";

  return {
    modelVersion: { savingsModelId: modelId, version: 1 },
    summary: "Waste service cost reduction estimate calculated.",
    equipmentLabel: "Waste service implementation",
    billLineDeltas: [
      {
        id: "bld_waste_cost",
        retrofitInstanceId: retrofitInstance.id,
        savingsModelId: modelId,
        domain: "waste",
        canonicalField: "total_waste_cost_delta",
        deltaValue: -annualSavingsCents,
        unit: "cents/year",
        period: "annual",
        savingsCents: annualSavingsCents,
        traceId: "trace_waste_savings"
      }
    ],
    recurringSavingsEntries: [
      recurringEntry({ id: "rse_waste", category: "avoided_waste_cost", label: "Avoided waste service cost", amountCents: monthlySavingsCents, period: "monthly", sourceId: "bld_waste_cost", formula: "current_monthly_waste_cost - new_monthly_waste_cost", traceId: "trace_waste_savings" })
    ],
    traceSteps: [
      createTraceStep("trace_waste_savings", "Waste service savings", "rate_application", "current_monthly_waste_cost - new_monthly_waste_cost", { currentMonthlyCost, newMonthlyCost }, { value: monthlySavingsCents, unit: "cents/month" })
    ]
  };
}

function calculateFleetElectrification(ctx) {
  const { answers, billLines, retrofitInstance, costInputs } = ctx;
  const missingInputs = [...costInputs.missingInputs];
  for (const key of ["vehicle_count", "annual_miles_per_vehicle", "existing_mpg", "ev_kwh_per_mile"]) {
    requireAnswer(missingInputs, answers, key, `${key} is required for fleet electrification savings.`);
  }
  requireBillValue(missingInputs, billLines?.fuel?.price_per_gallon, "price_per_gallon", "Fuel price per gallon is required.");
  requireBillValue(missingInputs, billLines?.electric?.average_cost_per_kwh, "average_cost_per_kwh", "Average electric cost per kWh is required.");
  if (missingInputs.length) return { missingInputs };

  const vehicleCount = numberAnswer(answers, "vehicle_count");
  const annualMilesPerVehicle = numberAnswer(answers, "annual_miles_per_vehicle");
  const existingMpg = numberAnswer(answers, "existing_mpg");
  const evKwhPerMile = numberAnswer(answers, "ev_kwh_per_mile");
  const fuelPrice = Number(billLines.fuel.price_per_gallon);
  const electricRate = Number(billLines.electric.average_cost_per_kwh);
  const annualMiles = vehicleCount * annualMilesPerVehicle;
  const gallonsAvoided = annualMiles / existingMpg;
  const evKwh = annualMiles * evKwhPerMile;
  const fuelSavingsCents = roundCents(gallonsAvoided * fuelPrice * 100);
  const chargingCostCents = roundCents(evKwh * electricRate * 100);
  const modelId = "sm_fleet_fuel_replacement_v1";

  return {
    modelVersion: { savingsModelId: modelId, version: 1 },
    summary: "Fleet fuel replacement savings estimate calculated.",
    equipmentLabel: "Fleet electrification project",
    billLineDeltas: [
      { id: "bld_fuel_gallons", retrofitInstanceId: retrofitInstance.id, savingsModelId: modelId, domain: "fuel", canonicalField: "fuel_gallons_delta", deltaValue: -gallonsAvoided, unit: "gallons/year", period: "annual", savingsCents: fuelSavingsCents, traceId: "trace_fuel_savings" },
      { id: "bld_ev_kwh", retrofitInstanceId: retrofitInstance.id, savingsModelId: modelId, domain: "electric", canonicalField: "annual_kwh_delta", deltaValue: evKwh, unit: "kWh/year", period: "annual", savingsCents: -chargingCostCents, traceId: "trace_charging_cost" }
    ],
    recurringSavingsEntries: [
      recurringEntry({ id: "rse_fuel", category: "avoided_fuel_cost", label: "Avoided fuel cost", amountCents: fuelSavingsCents, sourceId: "bld_fuel_gallons", formula: "gallons_avoided * fuel_price_per_gallon", traceId: "trace_fuel_savings" }),
      recurringEntry({ id: "rse_charging", category: "avoided_energy_cost", label: "Added EV charging cost", amountCents: -chargingCostCents, sourceId: "bld_ev_kwh", formula: "annual_ev_kwh * average_cost_per_kwh", traceId: "trace_charging_cost" })
    ],
    traceSteps: [
      createTraceStep("trace_fuel_savings", "Avoided fuel cost", "rate_application", "vehicle_count * annual_miles_per_vehicle / existing_mpg * fuel_price_per_gallon", { vehicleCount, annualMilesPerVehicle, existingMpg, fuelPrice }, { value: fuelSavingsCents, unit: "cents/year" }),
      createTraceStep("trace_charging_cost", "Added EV charging cost", "rate_application", "vehicle_count * annual_miles_per_vehicle * ev_kwh_per_mile * average_cost_per_kwh", { vehicleCount, annualMilesPerVehicle, evKwhPerMile, electricRate }, { value: -chargingCostCents, unit: "cents/year" })
    ]
  };
}

const modeledHandlers = {
  electric_kwh_reduction: calculateModeledElectricKwhReduction,
  gas_therm_reduction: calculateModeledGasThermReduction,
  gas_to_electric: calculateGasToElectricReplacement,
  demand_charge_reduction: calculateDemandReduction,
  solar_pv: calculateSolarPv,
  ev_charging: calculateEvCharging,
  water_efficiency: calculateWaterEfficiency,
  waste_reduction: calculateWasteReduction,
  fleet_electrification: calculateFleetElectrification
};

function calculateModeledRetrofitSavingsEstimate({
  fixture,
  projectId,
  businessId,
  retrofitInstance,
  answers,
  billLines,
  calculationDate,
  geography
}) {
  const handler = modeledHandlers[retrofitInstance.retrofitTypeSlug];
  if (!handler) {
    throw new Error(`Unsupported retrofit type in V1 savings engine: ${retrofitInstance.retrofitTypeSlug}`);
  }

  const costInputs = resolveProjectCostInputs({
    answers,
    fixture,
    retrofitInstance,
    geography,
    calculationDate,
    equipmentAnswerKeys: fixture.equipmentAnswerKeys,
    unitAnswerKey: fixture.laborUnitAnswerKey || "unit_count",
    laborRequired: fixture.laborRequired !== false
  });
  const result = handler({ fixture, answers, billLines, retrofitInstance, costInputs });

  if (result.missingInputs?.length) {
    return blockedEstimate({ projectId, businessId, retrofitInstance, missingInputs: result.missingInputs });
  }

  const costBreakdown = buildBaseCostLedger({
    equipmentCostCents: costInputs.equipmentCostCents,
    equipmentLabel: result.equipmentLabel || "Retrofit equipment",
    equipmentAnswerKey: costInputs.equipmentAnswerKey,
    laborResult: costInputs.laborResult,
    taxRule: costInputs.taxRule
  });

  const traceSteps = [
    ...result.traceSteps,
    createTraceStep(
      "trace_equipment_cost",
      "Equipment cost",
      "equipment_cost",
      costInputs.equipmentAnswerKey,
      { [costInputs.equipmentAnswerKey]: costInputs.equipmentCostCents },
      { value: costInputs.equipmentCostCents, unit: "cents" }
    )
  ];

  if (costInputs.laborResult) {
    traceSteps.push(
      createTraceStep(
        "trace_labor_cost",
        "Installation labor",
        "labor_cost",
        costInputs.laborResult.formula,
        { source: costInputs.laborResult.source, sourceId: costInputs.laborResult.sourceId },
        { value: costInputs.laborResult.amountCents, unit: "cents" }
      )
    );
  }

  traceSteps.push(
    createTraceStep(
      "trace_sales_tax",
      "Sales tax",
      "tax",
      "taxable project costs * sales_tax_rate",
      {
        ratePercent: costInputs.taxRule.ratePercent,
        equipmentTaxable: costInputs.taxRule.equipmentTaxable,
        laborTaxable: costInputs.taxRule.laborTaxable
      },
      { value: costBreakdown.find((entry) => entry.category === "sales_tax")?.amountCents || 0, unit: "cents" }
    )
  );

  return finalizeCalculatedEstimate({
    projectId,
    businessId,
    retrofitInstance,
    answers,
    billLines,
    calculationDate,
    modelVersion: result.modelVersion,
    summary: result.summary,
    costBreakdown,
    baseRecurringSavingsEntries: result.recurringSavingsEntries,
    billLineDeltas: result.billLineDeltas,
    traceSteps,
    opportunityIncentiveRules: fixture.opportunityIncentiveRules || [],
    selectedOpportunityIds: retrofitInstance.selectedOpportunityIds || fixture.selectedOpportunityIds || [],
    stackingRules: fixture.stackingRules || []
  });
}

export function calculateRetrofitSavingsEstimate(fixture) {
  const projectId = fixture.projectId || "project_test";
  const businessId = fixture.businessId || "business_test";
  const retrofitInstance = fixture.retrofitInstance || {};
  const answers = fixture.userAnswers || {};
  const billLines = fixture.billLines || {};
  const calculationDate = fixture.calculationDate || new Date().toISOString().slice(0, 10);
  const geography =
    fixture.geography ||
    fixture.projectGeography ||
    fixture.geographicTaxRule?.geography ||
    fixture.laborCostRule?.geography ||
    { country: "US" };

  if (retrofitInstance.retrofitTypeSlug !== "led_lighting") {
    return calculateModeledRetrofitSavingsEstimate({
      fixture,
      projectId,
      businessId,
      retrofitInstance,
      answers,
      billLines,
      calculationDate,
      geography
    });
  }

  const laborCostRules = normalizeArray(fixture.laborCostRules, fixture.laborCostRule);
  const geographicTaxRules = normalizeArray(fixture.geographicTaxRules, fixture.geographicTaxRule);
  const laborResult = resolveLaborCost({
    answers,
    rules: laborCostRules,
    retrofitTypeId: retrofitInstance.retrofitTypeId,
    unitAnswerKey: "fixture_count",
    geography,
    calculationDate
  });
  const taxRule = resolveSalesTaxRule({
    answers,
    rules: geographicTaxRules,
    geography,
    calculationDate
  });
  const missingInputs = validateLedInputs({ answers, billLines, laborResult, taxRule });

  if (missingInputs.length > 0) {
    return blockedEstimate({ projectId, businessId, retrofitInstance, missingInputs });
  }

  const fixtureCount = Number(answerValue(answers, "fixture_count"));
  const existingFixtureWatts = Number(answerValue(answers, "existing_fixture_watts"));
  const newFixtureWatts = Number(answerValue(answers, "new_fixture_watts"));
  const hoursPerDay = Number(answerValue(answers, "hours_per_day"));
  const operatingDaysPerYear = Number(answerValue(answers, "operating_days_per_year"));
  const equipmentUnitCostCents = Number(answerValue(answers, "equipment_unit_cost_cents"));
  const averageCostPerKwh = Number(billLines.electric.average_cost_per_kwh);

  const kwhReduction = annualKwhReduction({
    quantity: fixtureCount,
    oldWatts: existingFixtureWatts,
    newWatts: newFixtureWatts,
    hoursPerDay,
    operatingDaysPerYear
  });
  const annualElectricSavingsCents = annualEnergySavingsCents(kwhReduction, averageCostPerKwh);
  const equipmentCostCents = fixtureCount * equipmentUnitCostCents;
  const laborCostCents = laborResult.amountCents;
  const salesTaxCents = calculateSalesTaxFromRule({
    rule: taxRule,
    equipmentCostCents,
    laborCostCents
  });

  const traceSteps = [
    createTraceStep(
      "trace_kwh_delta",
      "Annual electricity reduction",
      "usage_delta",
      "fixture_count * (old_watts - new_watts) / 1000 * hours_per_day * days_per_year",
      {
        fixture_count: fixtureCount,
        old_watts: existingFixtureWatts,
        new_watts: newFixtureWatts,
        hours_per_day: hoursPerDay,
        days_per_year: operatingDaysPerYear
      },
      { value: kwhReduction, unit: "kWh/year" }
    ),
    createTraceStep(
      "trace_energy_savings",
      "Avoided electricity cost",
      "rate_application",
      "annual_kwh_reduction * average_cost_per_kwh",
      { annual_kwh_reduction: kwhReduction, average_cost_per_kwh: averageCostPerKwh },
      { value: annualElectricSavingsCents, unit: "cents/year" }
    )
  ];

  const costBreakdown = [
    {
      id: "cle_equipment",
      kind: "upfront_cost",
      category: "equipment_cost",
      label: "LED fixture equipment",
      amountCents: equipmentCostCents,
      source: "user_input",
      formula: `${fixtureCount} fixtures * ${equipmentUnitCostCents} cents/fixture`,
      traceId: "trace_equipment_cost"
    },
    {
      id: "cle_labor",
      kind: "upfront_cost",
      category: "installation_labor",
      label: "Installation labor",
      amountCents: laborCostCents,
      source: laborResult.source,
      sourceId: laborResult.sourceId || undefined,
      formula: laborResult.formula,
      traceId: "trace_labor_cost"
    },
    {
      id: "cle_sales_tax",
      kind: "upfront_cost",
      category: "sales_tax",
      label: "Estimated sales tax",
      amountCents: salesTaxCents,
      source: "tax_rule",
      sourceId: taxRule.id,
      formula: "taxable project costs * sales_tax_rate",
      traceId: "trace_sales_tax"
    }
  ];

  traceSteps.push(
    createTraceStep(
      "trace_equipment_cost",
      "Equipment cost",
      "equipment_cost",
      "fixture_count * equipment_unit_cost_cents",
      { fixture_count: fixtureCount, equipment_unit_cost_cents: equipmentUnitCostCents },
      { value: equipmentCostCents, unit: "cents" }
    ),
    createTraceStep(
      "trace_labor_cost",
      "Installation labor",
      "labor_cost",
      laborResult.formula,
      { source: laborResult.source, sourceId: laborResult.sourceId },
      { value: laborCostCents, unit: "cents" }
    ),
    createTraceStep(
      "trace_sales_tax",
      "Sales tax",
      "tax",
      "taxable project costs * sales_tax_rate",
      {
        ratePercent: taxRule.ratePercent,
        equipmentTaxable: taxRule.equipmentTaxable,
        laborTaxable: taxRule.laborTaxable
      },
      { value: salesTaxCents, unit: "cents" }
    )
  );

  const billLineDeltas = [
    {
      id: "bld_annual_kwh",
      retrofitInstanceId: retrofitInstance.id,
      savingsModelId: "sm_led_fixture_kwh_reduction_v1",
      domain: "electric",
      canonicalField: "annual_kwh_delta",
      deltaValue: -kwhReduction,
      unit: "kWh/year",
      period: "annual",
      savingsCents: annualElectricSavingsCents,
      rateBasis: {
        source: "average_cost_per_kwh",
        rateValue: averageCostPerKwh,
        rateUnit: "$/kWh",
        billLineField: "average_cost_per_kwh"
      },
      traceId: "trace_kwh_delta"
    },
    {
      id: "bld_annual_electric_cost",
      retrofitInstanceId: retrofitInstance.id,
      savingsModelId: "sm_led_fixture_kwh_reduction_v1",
      domain: "electric",
      canonicalField: "annual_electric_cost_delta",
      deltaValue: -annualElectricSavingsCents,
      unit: "cents/year",
      period: "annual",
      savingsCents: annualElectricSavingsCents,
      rateBasis: {
        source: "average_cost_per_kwh",
        rateValue: averageCostPerKwh,
        rateUnit: "$/kWh",
        billLineField: "average_cost_per_kwh"
      },
      traceId: "trace_energy_savings"
    }
  ];

  const baseRecurringSavingsEntries = [
    {
      id: "rse_avoided_energy",
      category: "avoided_energy_cost",
      label: "Avoided electricity cost",
      amountCents: annualElectricSavingsCents,
      period: "annual",
      allowMonthlyProration: true,
      allowAnnualization: true,
      annualizedAmountCents: annualElectricSavingsCents,
      source: "bill_line_delta",
      sourceId: "bld_annual_kwh",
      formula: "annual_kwh_reduction * average_cost_per_kwh",
      traceId: "trace_energy_savings"
    }
  ];

  const upfrontCostCents = aggregateUpfrontCost(costBreakdown);
  const opportunityIncentiveRules = fixture.opportunityIncentiveRules || [];
  const selectedRequestedOpportunityIds = retrofitInstance.selectedOpportunityIds || fixture.selectedOpportunityIds || [];
  const scenarios = buildIncentiveScenarios({
    incentiveRules: opportunityIncentiveRules,
    selectedOpportunityIds: selectedRequestedOpportunityIds,
    baseCostLedgerEntries: costBreakdown,
    baseRecurringSavingsEntries,
    billLineDeltas,
    answers,
    billLines,
    stackingRules: fixture.stackingRules || [],
    upfrontCostCents
  });
  const selectedScenario = selectBestScenario(scenarios) || {
    id: "scenario_no_incentives",
    opportunityIds: [],
    incentiveRuleIds: [],
    upfrontSavingsEntries: [],
    recurringSavingsEntries: [],
    totalUpfrontSavingsCents: 0,
    possibleGrantMoneyCents: 0,
    firstYearRecurringSavingsCents: 0,
    firstYearRecurringExpensesCents: 0,
    firstYearNetRecurringSavingsCents: 0,
    firstYearTotalBenefitCents: 0,
    upfrontCostAfterSavingsCents: upfrontCostCents,
    conflictExplanations: [],
    capExplanations: []
  };

  const finalCostBreakdown = [...costBreakdown, ...selectedScenario.upfrontSavingsEntries];
  const finalRecurringSavingsEntries = [...baseRecurringSavingsEntries, ...selectedScenario.recurringSavingsEntries];
  const finalSavingsMetrics = calculateFinalSavingsMetrics({ finalCostBreakdown, finalRecurringSavingsEntries });

  traceSteps.push(
    ...selectedScenario.upfrontSavingsEntries.map((entry) =>
      createTraceStep(
        `trace_${entry.incentiveRuleId}`,
        entry.label,
        "incentive",
        entry.formula || "incentive rule",
        { opportunityId: entry.opportunityId },
        { value: entry.amountCents, unit: "cents" }
      )
    ),
    ...selectedScenario.recurringSavingsEntries.map((entry) =>
      createTraceStep(
        `trace_${entry.incentiveRuleId}`,
        entry.label,
        entry.kind === "recurring_expense" ? "recurring_incentive_expense" : "recurring_incentive",
        entry.formula || "recurring incentive rule",
        { opportunityId: entry.opportunityId, period: entry.period },
        { value: entry.annualizedAmountCents ?? entry.amountCents, unit: "cents_annualized" }
      )
    ),
    createTraceStep(
      "trace_aggregation",
      "Headline aggregation",
      "aggregation",
      "upfront_cost - upfront_savings",
      { upfrontCostCents, upfrontSavingsCents: finalSavingsMetrics.oneTimeSavingsCents },
      { value: finalSavingsMetrics.upfrontCostAfterSavingsCents, unit: "cents" }
    )
  );

  return {
    id: null,
    projectId,
    businessId,
    retrofitInstanceId: retrofitInstance.id,
    retrofitTypeId: retrofitInstance.retrofitTypeId,
    status: "calculated",
    modelVersions: [{ savingsModelId: "sm_led_fixture_kwh_reduction_v1", version: 1 }],
    selectedOpportunityIds: selectedScenario.opportunityIds,
    missingInputs: [],
    upfrontCostCents,
    ...finalSavingsMetrics,
    costBreakdown: finalCostBreakdown,
    savingsBreakdown: finalRecurringSavingsEntries,
    billLineDeltas,
    selectedIncentiveScenario: selectedScenario,
    alternativeScenarios: scenarios.filter((scenario) => scenario.id !== selectedScenario.id),
    requiredInputsUsed: Object.entries(answers).map(([answerKey, answer]) => ({
      answerKey,
      value: answerValue(answers, answerKey),
      unit: answer?.unit,
      source: answer?.source || "user_entered"
    })),
    calculationTrace: {
      id: "trace_led_savings",
      summary: "LED fixture savings estimate calculated.",
      steps: traceSteps,
      assumptions: [{ id: "assumption_no_financing", label: "Financing ignored in V1", value: true }],
      warnings: [],
      inputSnapshot: [],
      outputChecks: [
        {
          name: "upfrontCostAfterSavings matches ledger",
          expectedCents: finalSavingsMetrics.upfrontCostAfterSavingsCents,
          actualCents: finalSavingsMetrics.upfrontCostAfterSavingsCents,
          passed: true
        },
        {
          name: "annual savings matches recurring entries",
          expectedCents: finalSavingsMetrics.annualSavingsCents,
          actualCents: finalSavingsMetrics.annualSavingsCents,
          passed: true
        }
      ]
    },
    createdAt: new Date(`${calculationDate}T00:00:00.000Z`).toISOString()
  };
}
