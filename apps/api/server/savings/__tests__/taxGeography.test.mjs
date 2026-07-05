import { describe, expect, it } from "vitest";
import {
  buildTaxGeographyInputAnswers,
  calculateSalesTaxFromRule,
  normalizeTaxGeography,
  selectGeographicTaxRule,
  selectTaxGeographyRules
} from "../tax.mjs";

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

  it("normalizes Census or Geocodio site geography for tax matching", () => {
    expect(
      normalizeTaxGeography({
        country: "US",
        stateCode: "ri",
        stateFips: "44",
        countyFips: "44007",
        countyName: "Providence County",
        placeGeoid: "4459000",
        placeName: "Providence city",
        censusTractGeoid: "44007000100",
        zip5: "02903",
        coordinates: { lat: 41.824, lng: -71.4128 }
      })
    ).toMatchObject({
      country: "US",
      state: "RI",
      countyFips: "44007",
      placeGeoid: "4459000",
      municipality: "Providence city",
      postalCode: "02903"
    });
  });

  it("normalizes researched geography arrays for tax matching", () => {
    expect(
      normalizeTaxGeography({
        country: "US",
        states: ["ri"],
        stateFips: ["44"],
        countyFips: [],
        placeGeoids: [],
        municipalities: ["Providence"]
      })
    ).toMatchObject({
      country: "US",
      state: "RI",
      states: ["RI"],
      stateFips: "44",
      stateFipsList: ["44"],
      countyFips: null,
      placeGeoid: null,
      municipality: "Providence"
    });
  });

  it("selects tax geography rules by normalized geography and opportunity", () => {
    const rules = [
      {
        id: "ri_property_tax",
        version: 1,
        active: true,
        taxType: "property_tax",
        geography: { country: "US", state: "RI" },
        opportunityIds: ["opp_ri"],
        effectiveStartDate: "2026-01-01"
      },
      {
        id: "wa_bo_tax",
        version: 1,
        active: true,
        taxType: "business_and_occupation_tax",
        geography: { country: "US", state: "WA" },
        opportunityIds: ["opp_wa"],
        effectiveStartDate: "2026-01-01"
      }
    ];

    const selected = selectTaxGeographyRules({
      rules,
      geography: { country: "US", stateCode: "RI", placeName: "Providence city" },
      opportunityId: "opp_ri",
      calculationDate: "2026-07-02"
    });

    expect(selected.map((rule) => rule.id)).toEqual(["ri_property_tax"]);
  });

  it("does not match state-scoped tax geography rules before state geography resolves", () => {
    const rules = [
      {
        id: "wa_bo_tax",
        version: 1,
        active: true,
        taxType: "business_and_occupation_tax",
        geography: { country: "US", state: "WA" },
        opportunityIds: ["opp_wa"],
        effectiveStartDate: "2026-01-01"
      }
    ];

    expect(
      selectTaxGeographyRules({
        rules,
        geography: { country: "US" },
        opportunityId: "opp_wa",
        calculationDate: "2026-07-02"
      })
    ).toEqual([]);
  });

  it("builds tax geography input answers from resolved site geography and matched rules", () => {
    const rules = [
      {
        id: "wa_bo_tax_rate",
        version: 1,
        active: true,
        taxType: "business_and_occupation_tax",
        geography: { country: "US", state: "WA" },
        opportunityIds: ["opp_wa"],
        effectiveStartDate: "2026-01-01",
        sourceConfidence: "medium",
        derivedInputs: [
          {
            inputKey: "preferential_solar_b_and_o_rate_decimal",
            value: 0.00275,
            source: "reviewed_tax_geography_rule",
            userOverrideAllowed: false
          }
        ]
      }
    ];

    const result = buildTaxGeographyInputAnswers({
      geography: {
        country: "US",
        stateCode: "WA",
        countyFips: "53033",
        placeGeoid: "5363000",
        placeName: "Seattle city",
        zip5: "98104"
      },
      rules,
      packages: [{ opportunity_id: "opp_wa" }],
      calculationDate: "2026-07-02"
    });

    expect(result.answers).toMatchObject({
      site_state_code: { value: "WA", source: "address_geography" },
      municipality: { value: "Seattle city", source: "address_geography" },
      preferential_solar_b_and_o_rate_decimal: {
        value: 0.00275,
        source: "reviewed_tax_geography_rule",
        taxGeographyRuleId: "wa_bo_tax_rate"
      }
    });
    expect(result.matchedRules.map((rule) => rule.id)).toEqual(["wa_bo_tax_rate"]);
  });

  it("matches researched array geography and adds server-derivable workflow inputs", () => {
    const rules = [
      {
        id: "ri_property_tax",
        version: 2,
        active: true,
        taxType: "property_tax",
        geography: { country: "US", states: ["RI"], stateFips: ["44"] },
        opportunityIds: ["opp_ri"],
        effectiveStartDate: "2025-07-02",
        sourceConfidence: "high",
        serverDerivableInputs: [
          {
            inputKey: "municipal_assessor_jurisdiction",
            sourceGeographyField: "coordinates"
          },
          {
            inputKey: "place_name",
            sourceGeographyField: "placeName"
          }
        ],
        derivedInputs: [
          {
            inputKey: "ri_tangible_renewable_tax_rate_per_kw_ac",
            value: 5,
            source: "official_source",
            userOverrideAllowed: false
          }
        ]
      }
    ];

    const result = buildTaxGeographyInputAnswers({
      geography: {
        country: "US",
        stateCode: "RI",
        stateFips: "44",
        placeGeoid: "4459000",
        placeName: "Providence city",
        coordinates: { lat: 41.824, lng: -71.4128 }
      },
      rules,
      packages: [{ opportunity_id: "opp_ri" }],
      calculationDate: "2026-07-02"
    });

    expect(result.matchedRules.map((rule) => rule.id)).toEqual(["ri_property_tax"]);
    expect(result.answers).toMatchObject({
      state_fips: { value: "44", source: "address_geography" },
      municipal_assessor_jurisdiction: {
        value: { lat: 41.824, lng: -71.4128 },
        source: "address_geography",
        taxGeographyRuleId: "ri_property_tax"
      },
      place_name: {
        value: "Providence city",
        source: "address_geography",
        taxGeographyRuleId: "ri_property_tax"
      },
      ri_tangible_renewable_tax_rate_per_kw_ac: {
        value: 5,
        source: "official_source",
        taxGeographyRuleId: "ri_property_tax"
      }
    });
  });
});
