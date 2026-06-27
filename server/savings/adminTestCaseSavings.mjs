import { calculateRetrofitSavingsEstimate } from "./engine.mjs";

export const ADMIN_TEST_CASE_SAVINGS_SCHEMA_VERSION = "admin-test-case-savings-v1";

const ledRetrofitTypeId = "led_lighting_retrofit";

const ledFixtureAssumptions = {
  fixtureCount: 12,
  existingFixtureWatts: 100,
  newFixtureWatts: 60,
  hoursPerDay: 10,
  operatingDaysPerYear: 260,
  equipmentUnitCostCents: 8500,
  annualKwh: 20000,
  averageCostPerKwh: 0.18,
  laborFixedCostCents: 15000,
  laborPerUnitCostCents: 2500,
  laborMinimumCostCents: 30000,
  laborMultiplier: 1.1,
  salesTaxRate: 0.0875
};

export function buildAdminTestCaseSavingsPreview({ retrofitGroup, sampleUserId, normalizedProfile, calculationDate }) {
  if (retrofitGroup?.retrofitTypeId !== ledRetrofitTypeId) {
    return unsupportedPreview({ retrofitGroup, sampleUserId });
  }

  const state = normalizedProfile?.site?.geo?.stateCode || "CA";
  const countyFips = normalizedProfile?.site?.geo?.countyFips || "00000";
  const fixture = {
    projectId: `admin_test_${sampleUserId}`,
    businessId: `admin_test_${sampleUserId}`,
    calculationDate,
    geography: {
      country: "US",
      state,
      countyFips
    },
    retrofitInstance: {
      id: `ri_${sampleUserId}_${ledRetrofitTypeId}`,
      retrofitTypeId: "rt_led_lighting",
      retrofitTypeSlug: "led_lighting",
      selectedOpportunityIds: []
    },
    billLines: {
      electric: {
        annual_kwh: ledFixtureAssumptions.annualKwh,
        average_cost_per_kwh: ledFixtureAssumptions.averageCostPerKwh
      }
    },
    userAnswers: {
      fixture_count: { value: ledFixtureAssumptions.fixtureCount, source: "admin_entered" },
      existing_fixture_watts: { value: ledFixtureAssumptions.existingFixtureWatts, source: "admin_entered" },
      new_fixture_watts: { value: ledFixtureAssumptions.newFixtureWatts, source: "admin_entered" },
      hours_per_day: { value: ledFixtureAssumptions.hoursPerDay, source: "admin_entered" },
      operating_days_per_year: { value: ledFixtureAssumptions.operatingDaysPerYear, source: "admin_entered" },
      equipment_unit_cost_cents: { value: ledFixtureAssumptions.equipmentUnitCostCents, source: "admin_entered" }
    },
    laborCostRules: [
      {
        id: "admin_test_labor_led_fixture_v1",
        version: 1,
        retrofitTypeId: "rt_led_lighting",
        geography: { country: "US", state },
        unitAnswerKey: "fixture_count",
        fixedCostCents: ledFixtureAssumptions.laborFixedCostCents,
        perUnitCostCents: ledFixtureAssumptions.laborPerUnitCostCents,
        minimumContractorCostCents: ledFixtureAssumptions.laborMinimumCostCents,
        countyLaborMultiplier: ledFixtureAssumptions.laborMultiplier,
        retrofitComplexityMultiplier: 1,
        effectiveStartDate: "2026-01-01",
        active: true
      }
    ],
    geographicTaxRules: [
      {
        id: "admin_test_sales_tax_fixture_v1",
        version: 1,
        geography: { country: "US", state },
        taxType: "sales_tax",
        appliesToCategories: ["equipment_cost", "installation_labor"],
        ratePercent: ledFixtureAssumptions.salesTaxRate,
        equipmentTaxable: true,
        laborTaxable: false,
        effectiveStartDate: "2026-01-01",
        active: true
      }
    ],
    opportunityIncentiveRules: [],
    stackingRules: []
  };

  const estimate = calculateRetrofitSavingsEstimate(fixture);

  return {
    schemaVersion: ADMIN_TEST_CASE_SAVINGS_SCHEMA_VERSION,
    status: estimate.status,
    estimateKind: "test_fixture",
    modelCoverage: "retrofit_only",
    retrofitTypeId: retrofitGroup.retrofitTypeId,
    retrofitDisplayName: retrofitGroup.displayName,
    opportunityCount: retrofitGroup.opportunityCount,
    calculationDate,
    upfrontCostCents: estimate.upfrontCostCents,
    upfrontSavingsCents:
      estimate.upfrontCostCents != null && estimate.upfrontCostAfterSavingsCents != null
        ? estimate.upfrontCostCents - estimate.upfrontCostAfterSavingsCents
        : null,
    upfrontCostAfterSavingsCents: estimate.upfrontCostAfterSavingsCents,
    monthlySavingsCents: estimate.monthlySavingsCents,
    annualSavingsCents: estimate.annualSavingsCents,
    costBreakdown: estimate.costBreakdown,
    savingsBreakdown: estimate.savingsBreakdown,
    billLineDeltas: estimate.billLineDeltas,
    selectedIncentiveScenario: estimate.selectedIncentiveScenario,
    alternativeScenarios: estimate.alternativeScenarios,
    calculationTrace: estimate.calculationTrace,
    assumptions: [
      "Admin test-case fixture uses fixed LED project inputs until real project inputs are collected.",
      "Opportunity incentive values are not extracted into OpportunityIncentiveRule records yet, so one-time opportunity savings are shown as $0 for this preview.",
      "This is not a customer quote or final savings estimate."
    ],
    unsupportedReason: null
  };
}

function unsupportedPreview({ retrofitGroup, sampleUserId }) {
  return {
    schemaVersion: ADMIN_TEST_CASE_SAVINGS_SCHEMA_VERSION,
    status: "unsupported",
    estimateKind: "not_modeled_v1",
    modelCoverage: "none",
    retrofitTypeId: retrofitGroup?.retrofitTypeId || "",
    retrofitDisplayName: retrofitGroup?.displayName || "Unknown retrofit",
    opportunityCount: retrofitGroup?.opportunityCount || 0,
    calculationDate: null,
    upfrontCostCents: null,
    upfrontSavingsCents: null,
    upfrontCostAfterSavingsCents: null,
    monthlySavingsCents: null,
    annualSavingsCents: null,
    costBreakdown: [],
    savingsBreakdown: [],
    billLineDeltas: [],
    selectedIncentiveScenario: null,
    alternativeScenarios: [],
    calculationTrace: null,
    assumptions: [],
    unsupportedReason: `Savings model not implemented for ${retrofitGroup?.displayName || "this retrofit"} in admin test case ${sampleUserId}.`
  };
}
