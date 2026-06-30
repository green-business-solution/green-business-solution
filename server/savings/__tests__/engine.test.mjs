import { describe, expect, it } from "vitest";
import { calculateRetrofitSavingsEstimate } from "../engine.mjs";
import {
  baseLedFixture,
  cityLightingGrant,
  efficiencyTaxCredit,
  utilityCityConflictRule,
  utilityLedRebate
} from "./testHelpers.mjs";

describe("savings engine integration", () => {
  it("returns calculation trace and model versions for the minimal LED slice", () => {
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

    expect(estimate.modelVersions).toEqual([
      { savingsModelId: "sm_led_fixture_kwh_reduction_v1", version: 1 }
    ]);
    expect(estimate.calculationTrace.assumptions).toEqual(
      expect.arrayContaining([expect.objectContaining({ label: "Financing ignored in V1", value: true })])
    );
    expect(estimate.calculationTrace.steps.map((step) => step.category)).toEqual(
      expect.arrayContaining([
        "usage_delta",
        "rate_application",
        "equipment_cost",
        "labor_cost",
        "tax",
        "incentive",
        "aggregation"
      ])
    );
    expect(estimate.calculationTrace.outputChecks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "upfrontCostAfterSavings matches ledger",
          expectedCents: 121882,
          actualCents: 121882,
          passed: true
        }),
        expect.objectContaining({
          name: "annual savings matches recurring entries",
          expectedCents: 22464,
          actualCents: 22464,
          passed: true
        })
      ])
    );
  });

  it("traces upfront and recurring incentive effects from the same opportunity", () => {
    const estimate = calculateRetrofitSavingsEstimate(
      baseLedFixture({
        retrofitInstance: {
          selectedOpportunityIds: ["opp_combo_led"]
        },
        opportunityIncentiveRules: [
          utilityLedRebate({
            id: "oir_combo_led_rebate_v1",
            opportunityId: "opp_combo_led",
            name: "Combo LED Rebate",
            amountRule: { kind: "fixed_amount", amountCents: 10000 }
          }),
          {
            id: "oir_combo_led_bill_credit_v1",
            version: 1,
            opportunityId: "opp_combo_led",
            name: "Combo LED Bill Credit",
            incentiveType: "recurring_bill_credit",
            timing: "annual",
            amountRule: { kind: "fixed_amount", amountCents: 12000 },
            basisPolicy: { basis: "gross_project_cost", applicationOrder: 20 },
            active: true
          }
        ]
      })
    );

    expect(estimate.oneTimeSavingsCents).toBe(10000);
    expect(estimate.annualRecurringSavingsCents).toBe(34464);
    expect(estimate.selectedIncentiveScenario).toMatchObject({
      opportunityIds: ["opp_combo_led"],
      incentiveRuleIds: ["oir_combo_led_rebate_v1", "oir_combo_led_bill_credit_v1"]
    });
    expect(estimate.calculationTrace.steps).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: "trace_oir_combo_led_rebate_v1", category: "incentive" }),
        expect.objectContaining({ id: "trace_oir_combo_led_bill_credit_v1", category: "recurring_incentive" })
      ])
    );
  });
});
