import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { calculateTaxGapRuntimeRule } from "../taxGapRuntime.mjs";

const runtimeRulePayload = JSON.parse(
  fs.readFileSync(path.resolve("data/tax_gap_runtime_rules_2026-07-05.json"), "utf8")
);
const rules = runtimeRulePayload.rules;

function rule(sourceSkippedRecordId) {
  const found = rules.find((item) => item.sourceSkippedRecordId === sourceSkippedRecordId);
  if (!found) throw new Error(`Missing tax gap runtime rule: ${sourceSkippedRecordId}`);
  return found;
}

function ctx(answers = {}) {
  return {
    answers: Object.fromEntries(Object.entries(answers).map(([key, value]) => [key, { value }]))
  };
}

describe("tax gap runtime rules", () => {
  it("keeps Iowa sales/use exemption gated until required invoice and certificate inputs are present", () => {
    const missing = calculateTaxGapRuntimeRule(rule("sales_use_tax_ambiguous_rule_4"), ctx({}));
    const calculated = calculateTaxGapRuntimeRule(
      rule("sales_use_tax_ambiguous_rule_4"),
      ctx({
        qualifying_exempt_sales_price_cents: 1000000,
        combined_sales_use_tax_rate_decimal: 0.06,
        iowa_exemption_category_confirmed: true,
        iowa_primary_use_or_item_eligibility_confirmed: true,
        iowa_exemption_certificate_present: true,
        iowa_labor_or_service_classification: "new_construction"
      })
    );

    expect(missing.status).toBe("needs_tax_profile");
    expect(missing.missingInputs.map((input) => input.inputKey)).toContain("qualifying_exempt_sales_price_cents");
    expect(calculated.status).toBe("calculated");
    expect(calculated.amountCents).toBe(60000);
    expect(calculated.includedInUserFacingTotal).toBe(false);
  });

  it("can include calculated tax-gap values after mandatory intake inputs are complete", () => {
    const calculated = calculateTaxGapRuntimeRule(
      rule("sales_use_tax_ambiguous_rule_4"),
      {
        ...ctx({
          qualifying_exempt_sales_price_cents: 1000000,
          combined_sales_use_tax_rate_decimal: 0.06,
          iowa_exemption_category_confirmed: true,
          iowa_primary_use_or_item_eligibility_confirmed: true,
          iowa_exemption_certificate_present: true,
          iowa_labor_or_service_classification: "new_construction"
        }),
        includeCalculatedTaxInUserFacingTotals: true
      }
    );

    expect(calculated.status).toBe("calculated");
    expect(calculated.amountCents).toBe(60000);
    expect(calculated.includedInUserFacingTotal).toBe(true);
  });

  it("calculates Arizona renewable production credit with certificate and tax-liability caps", () => {
    const calculated = calculateTaxGapRuntimeRule(
      rule("az_renewable_energy_production_tax_credit_skip_v1"),
      ctx({
        az_renewable_generator_qualified: true,
        qualified_resource_type: "solar_light",
        facility_first_production_date: "2020-12-31",
        az_facility_location_and_land_control_confirmed: true,
        az_grid_transmission_or_interconnection_confirmed: true,
        az_sale_to_eligible_unrelated_entity_confirmed: true,
        production_year_number: 1,
        calendar_year_kwh_produced: 1000000,
        facility_ownership_percentage: 50,
        ador_certificate_approved: true,
        ador_certified_credit_amount_cents: 3000000,
        ador_aggregate_cap_amount_certified: true,
        arizona_income_tax_liability_cents: 2500000
      })
    );
    const ineligible = calculateTaxGapRuntimeRule(
      rule("az_renewable_energy_production_tax_credit_skip_v1"),
      ctx({
        az_renewable_generator_qualified: true,
        qualified_resource_type: "solar_light",
        facility_first_production_date: "2021-01-01",
        az_facility_location_and_land_control_confirmed: true,
        az_grid_transmission_or_interconnection_confirmed: true,
        az_sale_to_eligible_unrelated_entity_confirmed: true,
        production_year_number: 1,
        calendar_year_kwh_produced: 1000000,
        facility_ownership_percentage: 50,
        ador_certificate_approved: true,
        ador_certified_credit_amount_cents: 3000000,
        ador_aggregate_cap_amount_certified: true,
        arizona_income_tax_liability_cents: 2500000
      })
    );

    expect(calculated.status).toBe("calculated");
    expect(calculated.amountCents).toBe(2000000);
    expect(ineligible.amountCents).toBe(0);
  });

  it("uses the Colorado heat-pump invoice discount as customer-facing value", () => {
    const calculated = calculateTaxGapRuntimeRule(
      rule("co_heat_pump_systems_registered_contractor_credit_skip_v1"),
      ctx({
        co_contractor_registered_at_installation: true,
        co_invoice_separately_states_required_discount: true,
        co_heat_pump_invoice_discount_cents: 150000,
        co_heat_pump_technology_type: "air_source",
        co_heat_pump_property_type: "nonresidential",
        co_contractor_filing_confirmation: true
      })
    );

    expect(calculated.status).toBe("calculated");
    expect(calculated.amountCents).toBe(150000);
    expect(calculated.includedInUserFacingTotal).toBe(false);
  });

  it("calculates Connecticut green-building credit from voucher, cost, annual, and liability limits", () => {
    const calculated = calculateTaxGapRuntimeRule(
      rule("ct_green_buildings_credit_skip_v1"),
      ctx({
        tax_year: 2025,
        ct_chapter_208_taxpayer_status_confirmed: true,
        deep_initial_credit_voucher_valid: true,
        deep_initial_credit_voucher_amount_cents: 5000000,
        ct_green_building_project_type: "new_construction",
        leed_or_equivalent_certification_level: "leed_gold",
        ct_green_building_allowable_costs_cents: 50000000,
        qualified_square_feet: 1000,
        ct_green_building_available_credit_for_tax_year_cents: 1500000,
        ct_chapter_208_tax_after_credit_ordering_cents: 3000000,
        ct_annual_eligibility_certificate_present: true
      })
    );

    expect(calculated.status).toBe("calculated");
    expect(calculated.amountCents).toBe(1500000);
    expect(calculated.includedInUserFacingTotal).toBe(false);
  });
});
