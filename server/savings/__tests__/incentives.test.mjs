import { describe, expect, it } from "vitest";
import { calculateIncentiveAward } from "../incentives.mjs";
import { cityLightingGrant, efficiencyTaxCredit, utilityLedRebate } from "./testHelpers.mjs";

function baseCtx(overrides = {}) {
  return {
    answers: { fixture_count: { value: 12 } },
    billLines: {},
    billLineDeltas: [],
    baseCostLedgerEntries: [
      { kind: "upfront_cost", category: "equipment_cost", amountCents: 102000 },
      { kind: "upfront_cost", category: "installation_labor", amountCents: 49500 },
      { kind: "upfront_cost", category: "sales_tax", amountCents: 8925 }
    ],
    upfrontCostCents: 160425,
    ...overrides
  };
}

describe("incentive rules", () => {
  it("calculates fixed per-unit rebates", () => {
    const award = calculateIncentiveAward(utilityLedRebate(), baseCtx());
    expect(award.amountCents).toBe(24000);
    expect(award.upfrontSavingsEntry).toMatchObject({
      kind: "upfront_savings",
      category: "rebate",
      amountCents: 24000
    });
  });

  it("calculates percent and capped rebates", () => {
    const percentAward = calculateIncentiveAward(
      {
        id: "oir_percent_20_project_cost_v1",
        opportunityId: "opp_percent_rebate",
        name: "Percent Rebate",
        incentiveType: "percent_project_cost_rebate",
        timing: "upfront",
        amountRule: { kind: "percent_of_basis", percent: 0.2 },
        basisPolicy: { basis: "gross_project_cost", applicationOrder: 10 },
        active: true
      },
      baseCtx()
    );
    expect(percentAward.amountCents).toBe(32085);

    const cappedAward = calculateIncentiveAward(cityLightingGrant(), baseCtx());
    expect(cappedAward.rawAmountCents).toBe(32085);
    expect(cappedAward.amountCents).toBe(25000);
  });

  it("models sales tax exemptions as separate upfront savings", () => {
    const award = calculateIncentiveAward(
      {
        id: "oir_sales_tax_exemption_100pct_v1",
        opportunityId: "opp_sales_tax_exemption",
        name: "Sales Tax Exemption",
        incentiveType: "sales_tax_exemption",
        timing: "upfront",
        amountRule: { kind: "percent_of_basis", percent: 1 },
        basisPolicy: { basis: "eligible_cost_categories", applicationOrder: 10 },
        active: true
      },
      baseCtx()
    );

    expect(award.amountCents).toBe(8925);
    expect(award.upfrontSavingsEntry.category).toBe("sales_tax_exemption");
  });

  it("calculates tax credit basis after prior grants or rebates", () => {
    const award = calculateIncentiveAward(efficiencyTaxCredit(), baseCtx(), [
      { amountCents: 25000, incentiveType: "grant" }
    ]);

    expect(award.basisCents).toBe(135425);
    expect(award.amountCents).toBe(13543);
  });

  it("models property tax exemptions as annual recurring savings", () => {
    const award = calculateIncentiveAward(
      {
        id: "oir_property_tax_abatement_100pct_v1",
        opportunityId: "opp_property_tax_abatement",
        name: "Property Tax Abatement",
        incentiveType: "property_tax_exemption",
        timing: "annual",
        amountRule: { kind: "percent_of_basis", percent: 1 },
        basisPolicy: { basis: "user_supplied_basis", applicationOrder: 10 },
        active: true
      },
      baseCtx({
        answers: { eligible_assessed_value_increase_cents: { value: 5000000 } },
        billLines: { tax: { property_tax_rate: 0.012 } },
        upfrontCostCents: 5000000
      })
    );

    expect(award.amountCents).toBe(60000);
    expect(award.recurringSavingsEntry).toMatchObject({
      category: "property_tax_abatement",
      period: "annual",
      allowMonthlyProration: false,
      annualizedAmountCents: 60000
    });
  });
});
