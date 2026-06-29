import { describe, expect, it } from "vitest";
import { buildIncentiveScenarios, selectBestScenario } from "../stacking.mjs";
import { cityLightingGrant, efficiencyTaxCredit, utilityCityConflictRule, utilityLedRebate } from "./testHelpers.mjs";

function scenarioCtx(rules, selectedOpportunityIds = rules.map((rule) => rule.opportunityId), stackingRules = []) {
  const baseCostLedgerEntries = [
    { kind: "upfront_cost", category: "equipment_cost", amountCents: 102000 },
    { kind: "upfront_cost", category: "installation_labor", amountCents: 49500 },
    { kind: "upfront_cost", category: "sales_tax", amountCents: 8925 }
  ];

  return buildIncentiveScenarios({
    incentiveRules: rules,
    selectedOpportunityIds,
    baseCostLedgerEntries,
    baseRecurringSavingsEntries: [],
    billLineDeltas: [],
    answers: { fixture_count: { value: 12 } },
    billLines: {},
    stackingRules,
    upfrontCostCents: 160425
  });
}

describe("incentive stacking", () => {
  it("stacks compatible rebate, grant, and tax credit with tax credit after prior awards", () => {
    const fixedGrant = cityLightingGrant({
      id: "oir_fixed_grant_100_v1",
      opportunityId: "opp_fixed_grant",
      name: "Fixed Grant",
      amountRule: { kind: "fixed_amount", amountCents: 10000 },
      cap: undefined
    });
    const scenarios = scenarioCtx([utilityLedRebate(), fixedGrant, efficiencyTaxCredit()]);
    const selected = selectBestScenario(scenarios);

    expect(selected.totalUpfrontSavingsCents).toBe(46643);
    expect(selected.upfrontCostAfterSavingsCents).toBe(113782);
  });

  it("prevents mutually exclusive opportunities from stacking and selects first-year best case", () => {
    const scenarios = scenarioCtx(
      [utilityLedRebate(), cityLightingGrant(), efficiencyTaxCredit()],
      ["opp_utility_led_rebate", "opp_city_lighting_grant", "opp_tax_credit_efficiency"],
      [utilityCityConflictRule()]
    );
    const selected = selectBestScenario(scenarios);

    expect(selected.opportunityIds).toEqual(["opp_city_lighting_grant", "opp_tax_credit_efficiency"]);
    expect(selected.totalUpfrontSavingsCents).toBe(38543);
    expect(selected.upfrontCostAfterSavingsCents).toBe(121882);
    expect(
      selected.conflictExplanations.some((explanation) =>
        explanation.reason.includes("Utility Lighting Rebate cannot be combined with City Lighting Grant")
      )
    ).toBe(true);
  });

  it("uses annual recurring incentives in first-year scenario ranking", () => {
    const upfrontRule = {
      id: "oir_upfront_400_v1",
      opportunityId: "opp_upfront",
      name: "Upfront Rebate",
      incentiveType: "fixed_per_unit_rebate",
      timing: "upfront",
      amountRule: { kind: "fixed_amount", amountCents: 40000 },
      basisPolicy: { basis: "gross_project_cost", applicationOrder: 10 },
      stacking: { incompatibleWithOpportunityIds: ["opp_recurring"] },
      active: true
    };
    const recurringRule = {
      id: "oir_recurring_250_v1",
      opportunityId: "opp_recurring",
      name: "Annual Credit",
      incentiveType: "recurring_bill_credit",
      timing: "annual",
      amountRule: { kind: "fixed_amount", amountCents: 25000 },
      basisPolicy: { basis: "gross_project_cost", applicationOrder: 10 },
      active: true
    };
    const smallerUpfrontRule = {
      id: "oir_upfront_200_v1",
      opportunityId: "opp_recurring",
      name: "Recurring Option Upfront Rebate",
      incentiveType: "fixed_per_unit_rebate",
      timing: "upfront",
      amountRule: { kind: "fixed_amount", amountCents: 20000 },
      basisPolicy: { basis: "gross_project_cost", applicationOrder: 5 },
      active: true
    };

    const scenarios = scenarioCtx(
      [upfrontRule, smallerUpfrontRule, recurringRule],
      ["opp_upfront", "opp_recurring"]
    );
    const selected = selectBestScenario(scenarios);

    expect(selected.opportunityIds).toEqual(["opp_recurring"]);
    expect(selected.firstYearTotalBenefitCents).toBe(45000);
  });

  it("selects possible grant scenarios as a tiebreaker without counting them as upfront savings", () => {
    const possibleGrantRule = {
      id: "oir_possible_grant_v1",
      opportunityId: "opp_possible_grant",
      name: "Possible Grant",
      incentiveType: "possible_grant",
      timing: "upfront",
      amountRule: { kind: "percent_of_basis", percent: 0.8 },
      basisPolicy: { basis: "gross_project_cost", applicationOrder: 10 },
      active: true
    };

    const scenarios = scenarioCtx([possibleGrantRule]);
    const selected = selectBestScenario(scenarios);

    expect(selected.opportunityIds).toEqual(["opp_possible_grant"]);
    expect(selected.totalUpfrontSavingsCents).toBe(0);
    expect(selected.possibleGrantMoneyCents).toBe(128340);
    expect(selected.upfrontSavingsEntries[0]).toMatchObject({
      kind: "possible_grant",
      amountCents: 128340
    });
  });
});
