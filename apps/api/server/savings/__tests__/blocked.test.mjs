import { describe, expect, it } from "vitest";
import { calculateRetrofitSavingsEstimate } from "../engine.mjs";
import { baseLedFixture } from "./testHelpers.mjs";

function expectBlockedFor(mutate, expected) {
  const fixture = baseLedFixture();
  mutate(fixture);
  const estimate = calculateRetrofitSavingsEstimate(fixture);

  expect(estimate).toMatchObject({
    status: "blocked",
    upfrontCostCents: null,
    upfrontCostAfterSavingsCents: null,
    monthlySavingsCents: null,
    annualSavingsCents: null
  });
  expect(estimate.missingInputs).toEqual(expect.arrayContaining([expect.objectContaining(expected)]));
}

describe("savings blocked states", () => {
  it("blocks when retrofit quantity is missing", () => {
    expectBlockedFor((fixture) => delete fixture.userAnswers.fixture_count, {
      type: "question",
      answerKey: "fixture_count",
      blocking: true
    });
  });

  it("blocks when old wattage is missing", () => {
    expectBlockedFor((fixture) => delete fixture.userAnswers.existing_fixture_watts, {
      type: "question",
      answerKey: "existing_fixture_watts",
      blocking: true
    });
  });

  it("blocks when new wattage is missing", () => {
    expectBlockedFor((fixture) => delete fixture.userAnswers.new_fixture_watts, {
      type: "question",
      answerKey: "new_fixture_watts",
      blocking: true
    });
  });

  it("blocks when equipment cost is missing", () => {
    expectBlockedFor((fixture) => delete fixture.userAnswers.equipment_unit_cost_cents, {
      type: "question",
      answerKey: "equipment_unit_cost_cents",
      blocking: true
    });
  });

  it("blocks when labor cost cannot be resolved", () => {
    expectBlockedFor((fixture) => {
      fixture.laborCostRules = [];
    }, {
      type: "labor_rule",
      blocking: true
    });
  });

  it("blocks when sales tax rule cannot be resolved", () => {
    expectBlockedFor((fixture) => {
      fixture.geographicTaxRules = [];
    }, {
      type: "tax_rule",
      blocking: true
    });
  });

  it("blocks when annual kWh is missing", () => {
    expectBlockedFor((fixture) => delete fixture.billLines.electric.annual_kwh, {
      type: "bill_line",
      canonicalBillField: "annual_kwh",
      blocking: true
    });
  });

  it("blocks when average cost per kWh is missing", () => {
    expectBlockedFor((fixture) => delete fixture.billLines.electric.average_cost_per_kwh, {
      type: "bill_line",
      canonicalBillField: "average_cost_per_kwh",
      blocking: true
    });
  });

  it("blocks higher-wattage LED replacements unless the usage increase is confirmed", () => {
    expectBlockedFor((fixture) => {
      fixture.userAnswers.existing_fixture_watts = { value: 60 };
      fixture.userAnswers.new_fixture_watts = { value: 100 };
    }, {
      type: "question",
      answerKey: "confirmed_usage_increase",
      blocking: true
    });
  });
});
