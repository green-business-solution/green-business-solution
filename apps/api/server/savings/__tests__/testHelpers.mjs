import { expect } from "vitest";

export function deepMerge(base, override) {
  if (Array.isArray(base) || Array.isArray(override)) {
    return override === undefined ? base : override;
  }

  if (!base || typeof base !== "object" || !override || typeof override !== "object") {
    return override === undefined ? base : override;
  }

  const merged = { ...base };
  for (const [key, value] of Object.entries(override)) {
    merged[key] = deepMerge(base[key], value);
  }
  return merged;
}

export function baseLedFixture(overrides = {}) {
  const fixture = {
    projectId: "proj_led_base",
    businessId: "biz_1",
    calculationDate: "2026-06-27",
    geography: {
      country: "US",
      state: "CA",
      countyFips: "06075",
      city: "San Francisco"
    },
    retrofitInstance: {
      id: "ri_led_001",
      retrofitTypeId: "rt_led_lighting",
      retrofitTypeSlug: "led_lighting",
      selectedOpportunityIds: []
    },
    billLines: {
      electric: {
        annual_kwh: 20000,
        average_cost_per_kwh: 0.18
      }
    },
    userAnswers: {
      fixture_count: { value: 12, unit: "fixtures", source: "user_entered" },
      existing_fixture_watts: { value: 100, unit: "W", source: "user_entered" },
      new_fixture_watts: { value: 60, unit: "W", source: "user_entered" },
      hours_per_day: { value: 10, unit: "hours/day", source: "user_entered" },
      operating_days_per_year: { value: 260, unit: "days/year", source: "user_entered" },
      equipment_unit_cost_cents: { value: 8500, unit: "cents/fixture", source: "user_entered" }
    },
    laborCostRules: [
      {
        id: "labor_led_06075_v1",
        version: 1,
        retrofitTypeId: "rt_led_lighting",
        geography: { country: "US", state: "CA", countyFips: "06075" },
        unitAnswerKey: "fixture_count",
        fixedCostCents: 15000,
        perUnitCostCents: 2500,
        minimumContractorCostCents: 30000,
        countyLaborMultiplier: 1.1,
        retrofitComplexityMultiplier: 1,
        effectiveStartDate: "2026-01-01",
        active: true
      }
    ],
    geographicTaxRules: [
      {
        id: "tax_sales_06075_city_v1",
        version: 1,
        geography: { country: "US", state: "CA", countyFips: "06075", city: "San Francisco" },
        taxType: "sales_tax",
        appliesToCategories: ["equipment_cost", "installation_labor"],
        ratePercent: 0.0875,
        equipmentTaxable: true,
        laborTaxable: false,
        effectiveStartDate: "2026-01-01",
        active: true
      }
    ],
    opportunityIncentiveRules: [],
    stackingRules: []
  };

  return deepMerge(fixture, overrides);
}

export function utilityLedRebate(overrides = {}) {
  return deepMerge(
    {
      id: "oir_utility_20_per_fixture_v1",
      version: 1,
      opportunityId: "opp_utility_led_rebate",
      name: "Utility Lighting Rebate",
      incentiveType: "fixed_per_unit_rebate",
      timing: "upfront",
      amountRule: {
        kind: "fixed_per_unit",
        amountCentsPerUnit: 2000,
        unitAnswerKey: "fixture_count"
      },
      basisPolicy: {
        basis: "gross_project_cost",
        applicationOrder: 10
      },
      active: true
    },
    overrides
  );
}

export function cityLightingGrant(overrides = {}) {
  return deepMerge(
    {
      id: "oir_city_grant_20pct_cap250_v1",
      version: 1,
      opportunityId: "opp_city_lighting_grant",
      name: "City Lighting Grant",
      incentiveType: "grant",
      timing: "upfront",
      amountRule: { kind: "percent_of_basis", percent: 0.2 },
      basisPolicy: {
        basis: "gross_project_cost",
        applicationOrder: 10
      },
      cap: { maxAmountCents: 25000 },
      active: true
    },
    overrides
  );
}

export function efficiencyTaxCredit(overrides = {}) {
  return deepMerge(
    {
      id: "oir_tax_credit_10pct_v1",
      version: 1,
      opportunityId: "opp_tax_credit_efficiency",
      name: "Efficiency Tax Credit",
      incentiveType: "tax_credit",
      timing: "upfront",
      amountRule: { kind: "percent_of_basis", percent: 0.1 },
      basisPolicy: {
        basis: "net_after_prior_incentives",
        subtractPriorIncentiveTypes: ["rebate", "grant"],
        applicationOrder: 20
      },
      active: true
    },
    overrides
  );
}

export function utilityCityConflictRule(overrides = {}) {
  return deepMerge(
    {
      id: "stack_utility_rebate_city_grant_v1",
      ruleType: "mutually_exclusive",
      opportunityAId: "opp_utility_led_rebate",
      opportunityBId: "opp_city_lighting_grant",
      explanation: "Utility Lighting Rebate cannot be combined with City Lighting Grant.",
      active: true
    },
    overrides
  );
}

export function expectCostEntry(entries, expected) {
  expect(entries).toEqual(expect.arrayContaining([expect.objectContaining(expected)]));
}
