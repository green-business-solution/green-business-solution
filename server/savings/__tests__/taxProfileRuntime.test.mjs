import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { evaluateTaxProfileRuntime } from "../taxProfileRuntime.mjs";

const testCasePayload = JSON.parse(
  fs.readFileSync(path.resolve("public/sample_matching_test_cases.json"), "utf8")
);
const localWorkflowPayload = JSON.parse(
  fs.readFileSync(path.resolve("data/tax_local_workflow_rules.json"), "utf8")
);
const taxGapRuntimePayload = JSON.parse(
  fs.readFileSync(path.resolve("data/tax_gap_runtime_rules_2026-07-05.json"), "utf8")
);

const testCases = testCasePayload.testCases || [];
const localTaxWorkflows = localWorkflowPayload.workflows || [];
const taxGapRuntimeRules = taxGapRuntimePayload.rules || [];

function taxCase(sampleUserId) {
  const found = testCases.find((testCase) => testCase.sampleUserId === sampleUserId);
  if (!found) throw new Error(`Missing tax test case: ${sampleUserId}`);
  return found;
}

function geographyFor(testCase) {
  return testCase.normalizedProfile?.site?.geo || testCase.sourceForm?.siteGeography || {};
}

function evaluate(testCase) {
  return evaluateTaxProfileRuntime({
    taxContext: testCase,
    geography: geographyFor(testCase),
    localTaxWorkflows,
    taxGapRuntimeRules
  });
}

describe("tax profile runtime", () => {
  it("calculates source-backed tax-gap rules with mandatory pre-opportunity inputs", () => {
    const result = evaluate(taxCase("az-santa-cruz-solar-production-llc"));

    expect(result.inputPolicy).toBe("mandatory_pre_opportunity_tax_inputs");
    expect(result.totals.calculatedCount).toBe(1);
    expect(result.totals.includedCount).toBe(1);
    expect(result.totals.includedAmountCents).toBeGreaterThan(0);
    expect(result.readyForOpportunityFinancialEstimate).toBe(true);
  });

  it("marks missing tax fields as required before opportunity selection", () => {
    const source = taxCase("az-santa-cruz-solar-production-llc");
    const incomplete = removeTaxInput(source, "calendar_year_kwh_produced");
    const result = evaluate(incomplete);

    expect(result.readyForOpportunityFinancialEstimate).toBe(false);
    expect(result.missingRequiredInputs).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          inputKey: "calendar_year_kwh_produced",
          requiredBeforeOpportunitySelection: true
        })
      ])
    );
  });

  it("keeps program-document rules out of financial estimates until a structured formula exists", () => {
    const result = evaluate(taxCase("sample_al_ch9b_huntsville_mfg_001"));

    expect(result.totals.missingRequiredInputCount).toBe(0);
    expect(result.totals.unsupportedOrReviewOnlyCount).toBe(1);
    expect(result.readyForOpportunityFinancialEstimate).toBe(false);
    expect(result.requiresStructuredTaxModelWork).toBe(true);
  });

  it("filters shared-source local workflow rules by resolved geography", () => {
    const result = evaluate(taxCase("sf-mission-hardware-synthetic"));

    expect(result.selectedLocalWorkflowCount).toBe(1);
    expect(result.evaluations[0]).toMatchObject({
      kind: "local_tax_workflow",
      workflowId: "tax_gap_ca_san_francisco_business_tax_v1"
    });
  });
});

function removeTaxInput(testCase, inputKey) {
  const copy = structuredClone(testCase);
  const keep = (row) => (row.inputKey || row.input_key || row.fieldId || row.field_id) !== inputKey;
  for (const container of [copy, copy.sourceForm, copy.normalizedProfile?.tax].filter(Boolean)) {
    for (const key of ["taxProfileFacts", "taxExtractedValues", "taxOpportunitySpecificInputs"]) {
      if (Array.isArray(container[key])) container[key] = container[key].filter(keep);
    }
  }
  return copy;
}
