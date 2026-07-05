import { describe, expect, it } from "vitest";
import {
  annualKwhReduction,
  applyCaps,
  calculateLaborCents,
  calculateSalesTaxCents,
  monthlyToAnnualCents,
  percentOfCents,
  roundCents,
  annualToMonthlyCents
} from "../formulas.mjs";

describe("savings formulas", () => {
  it("rounds money values using half-up cents", () => {
    expect(roundCents(13642.5)).toBe(13643);
    expect(roundCents(13642.4)).toBe(13642);
  });

  it("calculates percent-of-cents values", () => {
    expect(percentOfCents(160425, 0.2)).toBe(32085);
    expect(percentOfCents(160425, 0.1)).toBe(16043);
  });

  it("applies max amount and max basis percent caps", () => {
    expect(applyCaps(80213, { maxAmountCents: 50000 }, 160425)).toBe(50000);
    expect(applyCaps(90000, { maxPercentOfBasis: 0.5 }, 160425)).toBe(80213);
  });

  it("calculates sales tax for equipment-only and equipment-plus-labor jurisdictions", () => {
    expect(
      calculateSalesTaxCents({
        equipmentCostCents: 102000,
        laborCostCents: 49500,
        ratePercent: 0.0875,
        equipmentTaxable: true,
        laborTaxable: false
      })
    ).toBe(8925);

    expect(
      calculateSalesTaxCents({
        equipmentCostCents: 102000,
        laborCostCents: 49500,
        ratePercent: 0.0875,
        equipmentTaxable: true,
        laborTaxable: true
      })
    ).toBe(13256);
  });

  it("calculates labor with county and complexity adjustments plus minimums", () => {
    expect(
      calculateLaborCents({
        fixedCostCents: 15000,
        perUnitCostCents: 2500,
        units: 12,
        countyLaborMultiplier: 1.1,
        retrofitComplexityMultiplier: 1,
        minimumContractorCostCents: 30000
      })
    ).toBe(49500);

    expect(
      calculateLaborCents({
        fixedCostCents: 5000,
        perUnitCostCents: 500,
        units: 2,
        countyLaborMultiplier: 1,
        retrofitComplexityMultiplier: 1,
        minimumContractorCostCents: 30000
      })
    ).toBe(30000);
  });

  it("converts recurring periods with cent rounding", () => {
    expect(annualToMonthlyCents(22464)).toBe(1872);
    expect(annualToMonthlyCents(10000)).toBe(833);
    expect(monthlyToAnnualCents(1872)).toBe(22464);
  });

  it("calculates LED annual kWh reduction", () => {
    expect(
      annualKwhReduction({
        quantity: 12,
        oldWatts: 100,
        newWatts: 60,
        hoursPerDay: 10,
        operatingDaysPerYear: 260
      })
    ).toBe(1248);
  });
});
