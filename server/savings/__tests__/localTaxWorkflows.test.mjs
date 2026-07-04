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
});
