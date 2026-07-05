import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { calculateLocalTaxWorkflow, selectLocalTaxWorkflows } from "../localTaxWorkflows.mjs";

const workflowPayload = JSON.parse(
  fs.readFileSync(path.resolve("data/tax_local_workflow_rules.json"), "utf8")
);
const workflows = workflowPayload.workflows;

function workflow(id) {
  const found = workflows.find((item) => item.id === id);
  if (!found) throw new Error(`Missing workflow fixture: ${id}`);
  return found;
}

function ctx(answers = {}) {
  return {
    answers: Object.fromEntries(Object.entries(answers).map(([key, value]) => [key, { value }]))
  };
}

describe("local tax workflows", () => {
  it("selects city-scoped local tax workflows from normalized address geography", () => {
    const selected = selectLocalTaxWorkflows({
      workflows,
      geography: {
        country: "US",
        stateCode: "CA",
        countyFips: "06037",
        placeName: "Burbank city"
      },
      taxDomain: "local_business_tax"
    });

    expect(selected.map((item) => item.id)).toContain("local_tax_ca_burbank_business_license_v1");
  });

  it("selects city-scoped workflows when county FIPS is not yet resolved", () => {
    const selected = selectLocalTaxWorkflows({
      workflows,
      geography: {
        country: "US",
        stateCode: "CA",
        placeName: "Pasadena"
      },
      taxDomain: "local_business_tax"
    });

    expect(selected.map((item) => item.id)).toContain("local_tax_ca_pasadena_business_license_v1");
  });

  it("calculates Burbank business-license rows only as internal confirmed-input values", () => {
    const result = calculateLocalTaxWorkflow(
      workflow("local_tax_ca_burbank_business_license_v1"),
      ctx({
        local_business_tax_class: "retail",
        employee_count: 10
      })
    );

    expect(result.status).toBe("calculated");
    expect(result.amountCents).toBe(20870);
    expect(result.includedInUserFacingTotal).toBe(false);
    expect(result.trace.join(" ")).toContain("internal-only");
  });

  it("requires business class and tax-base inputs before local business tax calculation", () => {
    const noClass = calculateLocalTaxWorkflow(workflow("local_tax_ca_anaheim_business_license_v1"), ctx({}));
    const missingGross = calculateLocalTaxWorkflow(
      workflow("local_tax_ca_anaheim_business_license_v1"),
      ctx({ local_business_tax_class: "retail" })
    );

    expect(noClass.status).toBe("missing_inputs");
    expect(noClass.missingInputs.map((input) => input.inputKey)).toEqual(["local_business_tax_class"]);
    expect(missingGross.status).toBe("needs_tax_return");
    expect(missingGross.missingInputs.map((input) => input.inputKey)).toEqual(["gross_receipts_cents"]);
  });

  it("applies source-backed public utility class rates for Quincy while excluding non-utility classes", () => {
    const calculated = calculateLocalTaxWorkflow(
      workflow("local_tax_wa_quincy_public_utility_v1"),
      ctx({
        public_utility_activity_type: "water",
        gross_income_cents: 25000000
      })
    );
    const nonUtility = calculateLocalTaxWorkflow(
      workflow("local_tax_wa_quincy_public_utility_v1"),
      ctx({
        public_utility_activity_type: "retail",
        gross_income_cents: 25000000
      })
    );

    expect(calculated.amountCents).toBe(1000000);
    expect(calculated.includedInUserFacingTotal).toBe(false);
    expect(nonUtility.status).toBe("missing_inputs");
  });

  it("applies repaired source-backed Everett B&O rates and no-tax thresholds", () => {
    const belowQuarterlyThreshold = calculateLocalTaxWorkflow(
      workflow("local_tax_wa_everett_bo_v1"),
      ctx({
        local_business_tax_class: "retailing",
        gross_receipts_cents: 400000,
        filing_frequency: "quarterly"
      })
    );
    const aboveQuarterlyThreshold = calculateLocalTaxWorkflow(
      workflow("local_tax_wa_everett_bo_v1"),
      ctx({
        local_business_tax_class: "retailing",
        gross_receipts_cents: 1000000,
        deductions_cents: 200000,
        filing_frequency: "quarterly"
      })
    );

    expect(belowQuarterlyThreshold.status).toBe("calculated");
    expect(belowQuarterlyThreshold.amountCents).toBe(0);
    expect(aboveQuarterlyThreshold.status).toBe("calculated");
    expect(aboveQuarterlyThreshold.amountCents).toBe(800);
    expect(aboveQuarterlyThreshold.includedInUserFacingTotal).toBe(false);
  });

  it("calculates repaired San Diego rental-unit tax tiers as internal confirmed-input values", () => {
    const result = calculateLocalTaxWorkflow(
      workflow("local_tax_ca_san_diego_business_tax_certificate_v1"),
      ctx({
        local_business_tax_class: "rental_unit_business_tax",
        rental_type: "apartment",
        rental_unit_count: 12,
        parcel_count: 1
      })
    );

    expect(result.status).toBe("calculated");
    expect(result.amountCents).toBe(16500);
    expect(result.includedInUserFacingTotal).toBe(false);
  });

  it("falls back restaurant-like classes to general San Diego business certificate rows", () => {
    const result = calculateLocalTaxWorkflow(
      workflow("local_tax_ca_san_diego_business_tax_certificate_v1"),
      ctx({
        local_business_tax_class: "restaurant",
        employee_count: 20
      })
    );

    expect(result.status).toBe("calculated");
    expect(result.amountCents).toBeGreaterThan(0);
    expect(result.includedInUserFacingTotal).toBe(false);
  });

  it("keeps county property-tax adapters as tax-bill gated workflows", () => {
    const result = calculateLocalTaxWorkflow(workflow("property_adapter_wa_king_county_v1"), ctx({}));

    expect(result.status).toBe("needs_tax_bill");
    expect(result.amountCents).toBe(0);
    expect(result.includedInUserFacingTotal).toBe(false);
    expect(result.missingInputs.map((input) => input.inputKey)).toContain("current_levy_lines");
  });

  it("keeps program-specific tax incentives gated to assessor or accountant review", () => {
    const result = calculateLocalTaxWorkflow(workflow("local_tax_ri_renewable_property_tax_dsire_22798_v1"), ctx({}));

    expect(result.status).toBe("review_required");
    expect(result.amountCents).toBe(0);
    expect(result.missingInputs.map((input) => input.inputKey)).toContain("local_assessor_confirmation");
  });

  it("calculates compiled Vernon employee-band rows as internal values", () => {
    const result = calculateLocalTaxWorkflow(
      workflow("local_tax_ca_vernon_business_license_and_parcel_tax_v1"),
      ctx({
        local_business_tax_class: "general_business",
        avg_vernon_employees: 42
      })
    );

    expect(result.status).toBe("calculated");
    expect(result.amountCents).toBe(215000);
    expect(result.includedInUserFacingTotal).toBe(false);
  });

  it("calculates New Mexico solar GRT deduction pass-through only when filing gates are confirmed", () => {
    const calculated = calculateLocalTaxWorkflow(
      workflow("tax_gap_nm_solar_gross_receipts_deduction_v1"),
      ctx({
        local_business_tax_class: "solar_energy_system_sale_installation",
        eligible_solar_sale_installation_receipts_cents: 1000000,
        applicable_combined_gross_receipts_tax_rate_decimal: 0.07875,
        nm_solar_energy_system_eligible: true,
        seller_nm_gross_receipts_taxpayer_status_confirmed: true,
        nm_solar_grt_deduction_pass_through_confirmed: true,
        seller_grt_deduction_filing_confirmed: true,
        nm_rpd_41341_or_equivalent_documentation_present: true
      })
    );
    const gateFalse = calculateLocalTaxWorkflow(
      workflow("tax_gap_nm_solar_gross_receipts_deduction_v1"),
      ctx({
        local_business_tax_class: "solar_energy_system_sale_installation",
        eligible_solar_sale_installation_receipts_cents: 1000000,
        applicable_combined_gross_receipts_tax_rate_decimal: 0.07875,
        nm_solar_energy_system_eligible: true,
        seller_nm_gross_receipts_taxpayer_status_confirmed: true,
        nm_solar_grt_deduction_pass_through_confirmed: false,
        seller_grt_deduction_filing_confirmed: true,
        nm_rpd_41341_or_equivalent_documentation_present: true
      })
    );

    expect(calculated.status).toBe("calculated");
    expect(calculated.amountCents).toBe(78750);
    expect(calculated.includedInUserFacingTotal).toBe(false);
    expect(gateFalse.amountCents).toBe(0);
  });

  it("calculates Los Angeles BTRC class-rate rows from current class-rate inputs", () => {
    const result = calculateLocalTaxWorkflow(
      workflow("tax_gap_ca_los_angeles_business_tax_v1"),
      ctx({
        local_business_tax_class: "retail",
        la_city_taxable_gross_receipts_cents: 2500000,
        la_business_tax_rate_cents_per_1000_gross_receipts: 127,
        la_timely_filing_or_exemption_status_confirmed: true
      })
    );

    expect(result.status).toBe("calculated");
    expect(result.amountCents).toBe(3175);
    expect(result.includedInUserFacingTotal).toBe(false);
  });

  it("calculates Ohio CAT current exclusion only with filing confirmation", () => {
    const result = calculateLocalTaxWorkflow(
      workflow("tax_gap_oh_commercial_activity_tax_current_exclusion_v1"),
      ctx({
        local_business_tax_class: "ohio_cat",
        tax_year: 2025,
        annual_ohio_taxable_gross_receipts_cents: 1000000000,
        oh_cat_filing_confirmation: true
      })
    );

    expect(result.status).toBe("calculated");
    expect(result.amountCents).toBe(1040000);
    expect(result.includedInUserFacingTotal).toBe(false);
  });
});
