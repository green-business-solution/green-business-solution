import { describe, expect, it } from "vitest";
import { calculateRetrofitSavingsEstimate } from "../engine.mjs";

function modeledFixture({ slug, answers, billLines, laborCostCents = 0, taxRate = 0.08, laborRequired = true, equipmentAnswerKeys = ["equipment_cost_cents"] }) {
  const retrofitTypeId = `rt_${slug}`;
  return {
    projectId: "proj_modeled",
    businessId: "biz_modeled",
    calculationDate: "2026-06-27",
    geography: {
      country: "US",
      state: "CA",
      countyFips: "06075"
    },
    retrofitInstance: {
      id: `ri_${slug}`,
      retrofitTypeId,
      retrofitTypeSlug: slug,
      selectedOpportunityIds: []
    },
    billLines,
    userAnswers: Object.fromEntries(
      Object.entries({ unit_count: 1, ...answers }).map(([answerKey, value]) => [
        answerKey,
        { value, source: "user_entered" }
      ])
    ),
    equipmentAnswerKeys,
    laborRequired,
    laborUnitAnswerKey: "unit_count",
    laborCostRules: laborRequired
      ? [
          {
            id: `labor_${slug}_v1`,
            version: 1,
            retrofitTypeId,
            geography: { country: "US", state: "CA", countyFips: "06075" },
            unitAnswerKey: "unit_count",
            fixedCostCents: laborCostCents,
            perUnitCostCents: 0,
            minimumContractorCostCents: laborCostCents,
            countyLaborMultiplier: 1,
            retrofitComplexityMultiplier: 1,
            effectiveStartDate: "2026-01-01",
            active: true
          }
        ]
      : [],
    geographicTaxRules: [
      {
        id: `tax_${slug}_v1`,
        version: 1,
        geography: { country: "US", state: "CA", countyFips: "06075" },
        taxType: "sales_tax",
        appliesToCategories: ["equipment_cost", "installation_labor"],
        ratePercent: taxRate,
        equipmentTaxable: true,
        laborTaxable: false,
        effectiveStartDate: "2026-01-01",
        active: true
      }
    ]
  };
}

describe("modeled retrofit savings handlers", () => {
  it("calculates modeled electric kWh reduction", () => {
    const estimate = calculateRetrofitSavingsEstimate(
      modeledFixture({
        slug: "electric_kwh_reduction",
        laborCostCents: 150000,
        answers: {
          modeled_kwh_reduction: 4000,
          equipment_cost_cents: 600000
        },
        billLines: {
          electric: {
            average_cost_per_kwh: 0.2
          }
        }
      })
    );

    expect(estimate).toMatchObject({
      status: "calculated",
      upfrontCostCents: 798000,
      upfrontCostAfterSavingsCents: 798000,
      monthlySavingsCents: 6667,
      annualSavingsCents: 80000
    });
    expect(estimate.billLineDeltas).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ canonicalField: "annual_kwh_delta", deltaValue: -4000, savingsCents: 80000 })
      ])
    );
  });

  it("calculates solar self-consumption and export value", () => {
    const estimate = calculateRetrofitSavingsEstimate(
      modeledFixture({
        slug: "solar_pv",
        laborRequired: false,
        taxRate: 0,
        equipmentAnswerKeys: ["installed_cost_cents"],
        answers: {
          estimated_annual_production_kwh: 75000,
          self_consumption_percent: 0.6,
          export_percent: 0.4,
          installed_cost_cents: 10000000
        },
        billLines: {
          electric: {
            average_cost_per_kwh: 0.16,
            export_rate_per_kwh: 0.05
          }
        }
      })
    );

    expect(estimate).toMatchObject({
      status: "calculated",
      upfrontCostCents: 10000000,
      upfrontCostAfterSavingsCents: 10000000,
      monthlySavingsCents: 72500,
      annualSavingsCents: 870000
    });
    expect(estimate.billLineDeltas).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ canonicalField: "annual_kwh_delta", deltaValue: -45000, savingsCents: 720000 }),
        expect.objectContaining({ canonicalField: "export_kwh", deltaValue: 30000, savingsCents: 150000 })
      ])
    );
  });

  it("represents EV charging load as negative recurring savings", () => {
    const estimate = calculateRetrofitSavingsEstimate(
      modeledFixture({
        slug: "ev_charging",
        laborCostCents: 200000,
        answers: {
          expected_monthly_kwh: 2000,
          equipment_cost_cents: 600000
        },
        billLines: {
          electric: {
            average_cost_per_kwh: 0.18
          }
        }
      })
    );

    expect(estimate).toMatchObject({
      status: "calculated",
      upfrontCostCents: 848000,
      monthlySavingsCents: -36000,
      annualSavingsCents: -432000
    });
    expect(estimate.billLineDeltas).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ canonicalField: "monthly_kwh_delta", deltaValue: 2000, savingsCents: -36000 }),
        expect.objectContaining({ canonicalField: "annual_kwh_delta", deltaValue: 24000, savingsCents: -432000 })
      ])
    );
  });

  it("calculates combined water and sewer savings", () => {
    const estimate = calculateRetrofitSavingsEstimate(
      modeledFixture({
        slug: "water_efficiency",
        laborCostCents: 30000,
        answers: {
          annual_water_reduction: 50000,
          sewer_affected: true,
          equipment_cost_cents: 80000
        },
        billLines: {
          water_sewer: {
            water_unit: "gal",
            water_rate_per_unit: 0.01,
            sewer_rate_per_unit: 0.008
          }
        }
      })
    );

    expect(estimate).toMatchObject({
      status: "calculated",
      upfrontCostCents: 116400,
      monthlySavingsCents: 7500,
      annualSavingsCents: 90000
    });
    expect(estimate.savingsBreakdown).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ category: "avoided_water_cost", amountCents: 50000 }),
        expect.objectContaining({ category: "avoided_sewer_cost", amountCents: 40000 })
      ])
    );
  });
});
