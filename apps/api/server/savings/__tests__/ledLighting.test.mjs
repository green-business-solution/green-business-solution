import { describe, expect, it } from "vitest";
import { calculateRetrofitSavingsEstimate } from "../engine.mjs";
import {
  baseLedFixture,
  cityLightingGrant,
  efficiencyTaxCredit,
  expectCostEntry,
  utilityCityConflictRule,
  utilityLedRebate
} from "./testHelpers.mjs";

describe("LED lighting savings", () => {
  it("calculates the golden no-incentives LED scenario", () => {
    const estimate = calculateRetrofitSavingsEstimate(baseLedFixture());

    expect(estimate).toMatchObject({
      status: "calculated",
      upfrontCostCents: 160425,
      upfrontCostAfterSavingsCents: 160425,
      monthlySavingsCents: 1872,
      annualSavingsCents: 22464
    });
    expect(estimate.billLineDeltas).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          domain: "electric",
          canonicalField: "annual_kwh_delta",
          deltaValue: -1248,
          unit: "kWh/year",
          period: "annual",
          savingsCents: 22464
        })
      ])
    );
    expectCostEntry(estimate.costBreakdown, {
      kind: "upfront_cost",
      category: "equipment_cost",
      amountCents: 102000
    });
    expectCostEntry(estimate.costBreakdown, {
      kind: "upfront_cost",
      category: "installation_labor",
      amountCents: 49500
    });
    expectCostEntry(estimate.costBreakdown, {
      kind: "upfront_cost",
      category: "sales_tax",
      amountCents: 8925
    });
  });

  it("calculates fixed rebate plus tax credit", () => {
    const estimate = calculateRetrofitSavingsEstimate(
      baseLedFixture({
        retrofitInstance: {
          selectedOpportunityIds: ["opp_utility_led_rebate", "opp_tax_credit_efficiency"]
        },
        opportunityIncentiveRules: [utilityLedRebate(), efficiencyTaxCredit()]
      })
    );

    expect(estimate).toMatchObject({
      status: "calculated",
      upfrontCostCents: 160425,
      upfrontCostAfterSavingsCents: 122782,
      monthlySavingsCents: 1872,
      annualSavingsCents: 22464,
      selectedOpportunityIds: ["opp_utility_led_rebate", "opp_tax_credit_efficiency"]
    });
    expect(estimate.selectedIncentiveScenario.totalUpfrontSavingsCents).toBe(37643);
    expectCostEntry(estimate.costBreakdown, {
      kind: "upfront_savings",
      category: "rebate",
      amountCents: 24000
    });
    expectCostEntry(estimate.costBreakdown, {
      kind: "upfront_savings",
      category: "tax_credit",
      amountCents: 13643
    });
  });

  it("selects city grant plus tax credit over conflicting utility rebate plus tax credit", () => {
    const estimate = calculateRetrofitSavingsEstimate(
      baseLedFixture({
        retrofitInstance: {
          selectedOpportunityIds: [
            "opp_utility_led_rebate",
            "opp_city_lighting_grant",
            "opp_tax_credit_efficiency"
          ]
        },
        opportunityIncentiveRules: [utilityLedRebate(), cityLightingGrant(), efficiencyTaxCredit()],
        stackingRules: [utilityCityConflictRule()]
      })
    );

    expect(estimate).toMatchObject({
      status: "calculated",
      upfrontCostCents: 160425,
      upfrontCostAfterSavingsCents: 121882,
      monthlySavingsCents: 1872,
      annualSavingsCents: 22464,
      selectedOpportunityIds: ["opp_city_lighting_grant", "opp_tax_credit_efficiency"]
    });
    expect(estimate.selectedIncentiveScenario).toMatchObject({
      totalUpfrontSavingsCents: 38543,
      firstYearRecurringSavingsCents: 0,
      firstYearTotalBenefitCents: 38543
    });
    expect(
      estimate.alternativeScenarios.some(
        (scenario) =>
          scenario.opportunityIds.includes("opp_utility_led_rebate") &&
          scenario.opportunityIds.includes("opp_tax_credit_efficiency") &&
          scenario.upfrontCostAfterSavingsCents === 122782
      )
    ).toBe(true);
  });

  it("applies labor minimums for small LED projects", () => {
    const estimate = calculateRetrofitSavingsEstimate(
      baseLedFixture({
        userAnswers: {
          fixture_count: { value: 2 },
          existing_fixture_watts: { value: 100 },
          new_fixture_watts: { value: 60 },
          hours_per_day: { value: 10 },
          operating_days_per_year: { value: 260 },
          equipment_unit_cost_cents: { value: 8500 }
        },
        laborCostRules: [
          {
            id: "labor_led_small_v1",
            version: 1,
            retrofitTypeId: "rt_led_lighting",
            geography: { country: "US", state: "CA", countyFips: "06075" },
            unitAnswerKey: "fixture_count",
            fixedCostCents: 5000,
            perUnitCostCents: 500,
            minimumContractorCostCents: 30000,
            countyLaborMultiplier: 1,
            retrofitComplexityMultiplier: 1,
            effectiveStartDate: "2026-01-01",
            active: true
          }
        ]
      })
    );

    expect(estimate).toMatchObject({
      status: "calculated",
      upfrontCostCents: 48488,
      upfrontCostAfterSavingsCents: 48488,
      monthlySavingsCents: 312,
      annualSavingsCents: 3744
    });
    expect(estimate.billLineDeltas).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          canonicalField: "annual_kwh_delta",
          deltaValue: -208,
          savingsCents: 3744
        })
      ])
    );
  });
});
