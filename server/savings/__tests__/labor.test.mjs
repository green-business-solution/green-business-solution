import { describe, expect, it } from "vitest";
import { calculateLaborAdders, resolveLaborCost, selectLaborRule } from "../labor.mjs";

const stateRule = {
  id: "labor_led_state_v1",
  version: 1,
  retrofitTypeId: "rt_led_lighting",
  geography: { country: "US", state: "CA" },
  unitAnswerKey: "fixture_count",
  fixedCostCents: 10000,
  perUnitCostCents: 1000,
  minimumContractorCostCents: 20000,
  countyLaborMultiplier: 1,
  retrofitComplexityMultiplier: 1,
  effectiveStartDate: "2026-01-01",
  active: true
};

const countyRule = {
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
};

describe("labor cost rules", () => {
  it("selects county-level rules over state rules", () => {
    const selected = selectLaborRule({
      rules: [stateRule, countyRule],
      retrofitTypeId: "rt_led_lighting",
      geography: { country: "US", state: "CA", countyFips: "06075" },
      calculationDate: "2026-06-27"
    });

    expect(selected.id).toBe("labor_led_06075_v1");
  });

  it("falls back to state rule when no county rule exists", () => {
    const labor = resolveLaborCost({
      answers: { fixture_count: { value: 12 } },
      rules: [stateRule],
      retrofitTypeId: "rt_led_lighting",
      geography: { country: "US", state: "CA", countyFips: "06075" },
      calculationDate: "2026-06-27"
    });

    expect(labor.amountCents).toBe(22000);
    expect(labor.sourceId).toBe("labor_led_state_v1");
  });

  it("uses contractor quotes before labor rules", () => {
    const labor = resolveLaborCost({
      answers: {
        fixture_count: { value: 12 },
        contractor_quote_amount_cents: { value: 60000 }
      },
      rules: [countyRule],
      retrofitTypeId: "rt_led_lighting",
      geography: { country: "US", state: "CA", countyFips: "06075" },
      calculationDate: "2026-06-27"
    });

    expect(labor.amountCents).toBe(60000);
    expect(labor.source).toBe("contractor_quote");
  });

  it("applies permitting, design, and project-management adders", () => {
    const adders = calculateLaborAdders({
      rule: {
        id: "labor_with_adders",
        adders: [
          { category: "permitting", kind: "fixed", amountCents: 10000 },
          { category: "design_engineering", kind: "percent_of_equipment_plus_labor", percent: 0.1 },
          { category: "project_management", kind: "percent_of_labor", percent: 0.05 }
        ]
      },
      equipmentCostCents: 100000,
      laborCostCents: 50000
    });

    expect(adders.map((adder) => adder.amountCents)).toEqual([10000, 15000, 2500]);
  });
});
