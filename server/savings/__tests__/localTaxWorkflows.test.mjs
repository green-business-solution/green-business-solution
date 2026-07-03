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

  it("calculates Burbank business-license rows only as internal confirmed-input values", () => {
    const result = calculateLocalTaxWorkflow(
      workflow("local_tax_ca_burbank_business_license_v1"),
      ctx({
        local_business_tax_class: "retail",
        employee_count: 10
      })
    );

    expect(result.status).toBe("calculated");
    expect(result.amountCents).toBe(20340);
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
    expect(missingGross.status).toBe("missing_inputs");
    expect(missingGross.missingInputs.map((input) => input.inputKey)).toEqual(["gross_receipts_cents"]);
  });

  it("applies source-backed public utility class rates for Quincy while leaving non-utility gaps unresolved", () => {
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
