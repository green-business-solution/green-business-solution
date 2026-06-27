import {
  aggregateAnnualSavings,
  aggregateMonthlySavings,
  aggregateUpfrontCost,
  aggregateUpfrontCostAfterSavings
} from "./aggregation.mjs";
import { annualEnergySavingsCents, annualKwhReduction } from "./formulas.mjs";
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
    upfrontCostAfterSavingsCents: null,
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
    throw new Error(`Unsupported retrofit type in V1 savings engine: ${retrofitInstance.retrofitTypeSlug}`);
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
    firstYearRecurringSavingsCents: 0,
    firstYearTotalBenefitCents: 0,
    upfrontCostAfterSavingsCents: upfrontCostCents,
    conflictExplanations: [],
    capExplanations: []
  };

  const finalCostBreakdown = [...costBreakdown, ...selectedScenario.upfrontSavingsEntries];
  const finalRecurringSavingsEntries = [...baseRecurringSavingsEntries, ...selectedScenario.recurringSavingsEntries];
  const upfrontCostAfterSavingsCents = aggregateUpfrontCostAfterSavings(finalCostBreakdown);
  const monthlySavingsCents = aggregateMonthlySavings(finalRecurringSavingsEntries);
  const annualSavingsCents = aggregateAnnualSavings(finalRecurringSavingsEntries);

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
    createTraceStep(
      "trace_aggregation",
      "Headline aggregation",
      "aggregation",
      "upfront_cost - upfront_savings",
      { upfrontCostCents, upfrontSavingsCents: upfrontCostCents - upfrontCostAfterSavingsCents },
      { value: upfrontCostAfterSavingsCents, unit: "cents" }
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
    upfrontCostAfterSavingsCents,
    monthlySavingsCents,
    annualSavingsCents,
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
          expectedCents: upfrontCostAfterSavingsCents,
          actualCents: upfrontCostAfterSavingsCents,
          passed: true
        },
        {
          name: "annual savings matches recurring entries",
          expectedCents: annualSavingsCents,
          actualCents: annualSavingsCents,
          passed: true
        }
      ]
    },
    createdAt: new Date(`${calculationDate}T00:00:00.000Z`).toISOString()
  };
}
