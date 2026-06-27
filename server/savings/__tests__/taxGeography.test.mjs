import { describe, expect, it } from "vitest";
import { calculateSalesTaxFromRule, selectGeographicTaxRule } from "../tax.mjs";

describe("tax geography rules", () => {
  it("calculates equipment-only and labor-taxable sales tax from a rule", () => {
    expect(
      calculateSalesTaxFromRule({
        rule: { ratePercent: 0.0875, equipmentTaxable: true, laborTaxable: false },
        equipmentCostCents: 102000,
        laborCostCents: 49500
      })
    ).toBe(8925);

    expect(
      calculateSalesTaxFromRule({
        rule: { ratePercent: 0.0875, equipmentTaxable: true, laborTaxable: true },
        equipmentCostCents: 102000,
        laborCostCents: 49500
      })
    ).toBe(13256);
  });

  it("selects city tax rules over county and state rules", () => {
    const rules = [
      {
        id: "tax_state_v1",
        version: 1,
        active: true,
        taxType: "sales_tax",
        ratePercent: 0.06,
        geography: { country: "US", state: "CA" },
        effectiveStartDate: "2026-01-01"
      },
      {
        id: "tax_county_v1",
        version: 1,
        active: true,
        taxType: "sales_tax",
        ratePercent: 0.08,
        geography: { country: "US", state: "CA", countyFips: "06075" },
        effectiveStartDate: "2026-01-01"
      },
      {
        id: "tax_city_v1",
        version: 1,
        active: true,
        taxType: "sales_tax",
        ratePercent: 0.0875,
        geography: { country: "US", state: "CA", countyFips: "06075", city: "San Francisco" },
        effectiveStartDate: "2026-01-01"
      }
    ];

    const selected = selectGeographicTaxRule({
      rules,
      geography: { country: "US", state: "CA", countyFips: "06075", city: "San Francisco" },
      taxType: "sales_tax",
      calculationDate: "2026-06-27"
    });

    expect(selected.id).toBe("tax_city_v1");
  });

  it("selects tax rules by effective date", () => {
    const rules = [
      {
        id: "tax_sales_v1",
        version: 1,
        active: true,
        taxType: "sales_tax",
        ratePercent: 0.08,
        geography: { country: "US", state: "CA" },
        effectiveStartDate: "2026-01-01",
        effectiveEndDate: "2026-06-30"
      },
      {
        id: "tax_sales_v2",
        version: 2,
        active: true,
        taxType: "sales_tax",
        ratePercent: 0.09,
        geography: { country: "US", state: "CA" },
        effectiveStartDate: "2026-07-01"
      }
    ];

    expect(
      selectGeographicTaxRule({
        rules,
        geography: { country: "US", state: "CA" },
        taxType: "sales_tax",
        calculationDate: "2026-06-27"
      }).id
    ).toBe("tax_sales_v1");

    expect(
      selectGeographicTaxRule({
        rules,
        geography: { country: "US", state: "CA" },
        taxType: "sales_tax",
        calculationDate: "2026-07-02"
      }).id
    ).toBe("tax_sales_v2");
  });
});
