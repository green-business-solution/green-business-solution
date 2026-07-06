import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { buildTaxProfileRuntimePreview, evaluateTaxProfileRuntime } from "../taxProfileRuntime.mjs";

const localWorkflowPayload = JSON.parse(
  fs.readFileSync(path.resolve("data/tax_local_workflow_rules.json"), "utf8")
);
const taxGapRuntimePayload = JSON.parse(
  fs.readFileSync(path.resolve("data/tax_gap_runtime_rules_2026-07-05.json"), "utf8")
);

const testCases = [
  taxCaseFixture("az-santa-cruz-solar-production-llc", { stateCode: "AZ", countyName: "Santa Cruz County", placeName: "Rio Rico" }, [
    taxRow("az_renewable_generator_qualified", true, "tax_gap_rule_5b724c7f00", "az_renewable_energy_production_tax_credit_skip_v1"),
    taxRow("qualified_resource_type", "solar", "tax_gap_rule_5b724c7f00", "az_renewable_energy_production_tax_credit_skip_v1"),
    taxRow("facility_first_production_date", "2018-11-15", "tax_gap_rule_5b724c7f00", "az_renewable_energy_production_tax_credit_skip_v1"),
    taxRow("az_facility_location_and_land_control_confirmed", true, "tax_gap_rule_5b724c7f00", "az_renewable_energy_production_tax_credit_skip_v1"),
    taxRow("az_grid_transmission_or_interconnection_confirmed", true, "tax_gap_rule_5b724c7f00", "az_renewable_energy_production_tax_credit_skip_v1"),
    taxRow("az_sale_to_eligible_unrelated_entity_confirmed", true, "tax_gap_rule_5b724c7f00", "az_renewable_energy_production_tax_credit_skip_v1"),
    taxRow("production_year_number", 5, "tax_gap_rule_5b724c7f00", "az_renewable_energy_production_tax_credit_skip_v1"),
    taxRow("calendar_year_kwh_produced", 100000, "tax_gap_rule_5b724c7f00", "az_renewable_energy_production_tax_credit_skip_v1"),
    taxRow("facility_ownership_percentage", 1, "tax_gap_rule_5b724c7f00", "az_renewable_energy_production_tax_credit_skip_v1"),
    taxRow("ador_certificate_approved", true, "tax_gap_rule_5b724c7f00", "az_renewable_energy_production_tax_credit_skip_v1"),
    taxRow("ador_certified_credit_amount_cents", 1000000, "tax_gap_rule_5b724c7f00", "az_renewable_energy_production_tax_credit_skip_v1"),
    taxRow("ador_aggregate_cap_amount_certified", true, "tax_gap_rule_5b724c7f00", "az_renewable_energy_production_tax_credit_skip_v1"),
    taxRow("arizona_income_tax_liability_cents", 1000000, "tax_gap_rule_5b724c7f00", "az_renewable_energy_production_tax_credit_skip_v1")
  ]),
  taxCaseFixture("la-montanita-nob-hill-albuquerque", { stateCode: "NM", countyName: "Bernalillo County", placeName: "Albuquerque" }, [
    taxRow("eligible_solar_sale_installation_receipts_cents", 21875000, "tax_gap_rule_0702ef4e25", "sales_use_tax_ambiguous_rule_8"),
    taxRow("applicable_combined_gross_receipts_tax_rate_decimal", 0.07625, "tax_gap_rule_0702ef4e25", "sales_use_tax_ambiguous_rule_8"),
    taxRow("nm_solar_energy_system_eligible", true, "tax_gap_rule_0702ef4e25", "sales_use_tax_ambiguous_rule_8"),
    taxRow("seller_nm_gross_receipts_taxpayer_status_confirmed", true, "tax_gap_rule_0702ef4e25", "sales_use_tax_ambiguous_rule_8"),
    taxRow("nm_solar_grt_deduction_pass_through_confirmed", true, "tax_gap_rule_0702ef4e25", "sales_use_tax_ambiguous_rule_8"),
    taxRow("seller_grt_deduction_filing_confirmed", true, "tax_gap_rule_0702ef4e25", "sales_use_tax_ambiguous_rule_8"),
    taxRow("nm_rpd_41341_or_equivalent_documentation_present", true, "tax_gap_rule_0702ef4e25", "sales_use_tax_ambiguous_rule_8")
  ]),
  taxCaseFixture("whirlpool-clyde-operations", { stateCode: "OH", countyName: "Sandusky County", placeName: "Clyde" }, [
    taxRow("tax_year", 2026, "tax_gap_rule_4a6e174401", "skip_oh_cat_current_exclusion_amount_without_current_return_confirmation"),
    taxRow("annual_ohio_taxable_gross_receipts_cents", 8742500000, "tax_gap_rule_4a6e174401", "skip_oh_cat_current_exclusion_amount_without_current_return_confirmation"),
    taxRow("oh_cat_filing_confirmation", true, "tax_gap_rule_4a6e174401", "skip_oh_cat_current_exclusion_amount_without_current_return_confirmation")
  ]),
  taxCaseFixture("sample_al_ch9b_huntsville_mfg_001", { stateCode: "AL", countyName: "Madison County", placeName: "Huntsville" }, [
    taxRow("executed_chapter_9b_abatement_agreement", true, "tax_gap_rule_4d6fe746b4", "sales_use_tax_ambiguous_rule_1"),
    taxRow("certified_granting_authority_resolution", true, "tax_gap_rule_4d6fe746b4", "sales_use_tax_ambiguous_rule_1"),
    taxRow("completed_form_co_caa_and_property_list", true, "tax_gap_rule_4d6fe746b4", "sales_use_tax_ambiguous_rule_1"),
    taxRow("completed_form_st_ex_a2_sales_and_use_tax_certificate_application", true, "tax_gap_rule_4d6fe746b4", "sales_use_tax_ambiguous_rule_1"),
    taxRow("alabama_department_of_revenue_sales_and_use_tax_exemption_certificate", true, "tax_gap_rule_4d6fe746b4", "sales_use_tax_ambiguous_rule_1"),
    taxRow("e_verify_documentation", true, "tax_gap_rule_4d6fe746b4", "sales_use_tax_ambiguous_rule_1"),
    taxRow("alabama_department_of_commerce_project_notification", true, "tax_gap_rule_4d6fe746b4", "sales_use_tax_ambiguous_rule_1"),
    taxRow("itemized_invoices_and_transaction_dates", true, "tax_gap_rule_4d6fe746b4", "sales_use_tax_ambiguous_rule_1"),
    taxRow("tax_base_for_qualifying_tangible_personal_property_and_taxable_services_incorporated_into_the_project", 64230000, "tax_gap_rule_4d6fe746b4", "sales_use_tax_ambiguous_rule_1"),
    taxRow("state_and_local_sales_and_use_tax_rates", { totalAbatableRateBps: 725 }, "tax_gap_rule_4d6fe746b4", "sales_use_tax_ambiguous_rule_1"),
    taxRow("identification_of_local_education_and_noneducation_tax_components", true, "tax_gap_rule_4d6fe746b4", "sales_use_tax_ambiguous_rule_1"),
    taxRow("project_placed_in_service_or_completion_date", "2026-06-15", "tax_gap_rule_4d6fe746b4", "sales_use_tax_ambiguous_rule_1")
  ]),
  taxCaseFixture("sf-mission-hardware-synthetic", { stateCode: "CA", countyFips: "06075", countyName: "San Francisco County", placeName: "San Francisco" }, [
    taxRow("verified_city", "San Francisco", "tax_gap_rule_6fe87d35d5", "skip_unverified_ca_city_business_license_rates")
  ]),
  taxCaseFixture("sf-mission-hardware-complete-local-review", { stateCode: "CA", countyFips: "06075", countyName: "San Francisco County", placeName: "San Francisco" }, [
    taxRow("verified_city", "San Francisco", "tax_gap_rule_6fe87d35d5", "skip_unverified_ca_city_business_license_rates"),
    taxRow("sf_business_activity_category", "Retail Trade", "tax_gap_rule_6fe87d35d5", "skip_unverified_ca_city_business_license_rates"),
    taxRow("sf_allocated_gross_receipts_by_category", [{ activityClass: "Retail Trade", taxableReceiptsCents: 384250000 }], "tax_gap_rule_6fe87d35d5", "skip_unverified_ca_city_business_license_rates"),
    taxRow("sf_registration_fee_schedule_amount_cents", 127000, "tax_gap_rule_6fe87d35d5", "skip_unverified_ca_city_business_license_rates"),
    taxRow("sf_gross_receipts_tax_return_present", true, "tax_gap_rule_6fe87d35d5", "skip_unverified_ca_city_business_license_rates"),
    taxRow("sf_hgr_or_overpaid_executive_tax_applicability", false, "tax_gap_rule_6fe87d35d5", "skip_unverified_ca_city_business_license_rates")
  ])
];
const localTaxWorkflows = localWorkflowPayload.workflows || [];
const taxGapRuntimeRules = taxGapRuntimePayload.rules || [];

function taxCaseFixture(sampleUserId, geography, rows) {
  return {
    sampleUserId,
    normalizedProfile: {
      site: {
        geo: geography
      }
    },
    taxProfileFacts: rows
  };
}

function taxRow(inputKey, value, taxRuleId, sourceSkippedRecordId) {
  return {
    inputKey,
    value,
    taxRuleId,
    sourceSkippedRecordId
  };
}

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
    expect(result.totals.includedBenefitCents).toBeGreaterThan(0);
    expect(result.totals.includedLiabilityCents).toBe(0);
    expect(result.readyForOpportunityFinancialEstimate).toBe(true);
  });

  it("separates calculated tax benefits from tax liabilities", () => {
    const benefit = evaluate(taxCase("la-montanita-nob-hill-albuquerque"));
    const liability = evaluate(taxCase("whirlpool-clyde-operations"));

    expect(benefit.totals.includedBenefitCents).toBeGreaterThan(0);
    expect(benefit.totals.includedLiabilityCents).toBe(0);
    expect(benefit.totals.includedAmountCents).toBe(benefit.totals.includedBenefitCents);

    expect(liability.totals.includedBenefitCents).toBe(0);
    expect(liability.totals.includedLiabilityCents).toBeGreaterThan(0);
    expect(liability.totals.includedAmountCents).toBe(-liability.totals.includedLiabilityCents);
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

  it("calculates repaired program-document tax rules after structured formula support exists", () => {
    const result = evaluate(taxCase("sample_al_ch9b_huntsville_mfg_001"));

    expect(result.totals.missingRequiredInputCount).toBe(0);
    expect(result.totals.unsupportedOrReviewOnlyCount).toBe(0);
    expect(result.totals.includedBenefitCents).toBe(4656675);
    expect(result.readyForOpportunityFinancialEstimate).toBe(true);
    expect(result.requiresStructuredTaxModelWork).toBe(false);
  });

  it("builds a compact runtime preview with required pre-opportunity fields", () => {
    const source = taxCase("az-santa-cruz-solar-production-llc");
    const incomplete = removeTaxInput(source, "calendar_year_kwh_produced");
    const preview = buildTaxProfileRuntimePreview({
      taxContext: incomplete,
      geography: geographyFor(incomplete),
      localTaxWorkflows,
      taxGapRuntimeRules
    });

    expect(preview.status).toBe("requires_tax_intake");
    expect(preview.opportunityDisplayBlocked).toBe(true);
    expect(preview.requiredPreOpportunityInputs).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          inputKey: "calendar_year_kwh_produced",
          requiredBeforeOpportunitySelection: true,
          collectionStage: "pre_opportunity_intake"
        })
      ])
    );
  });

  it("filters shared-source local workflow rules by resolved geography", () => {
    const result = evaluate(taxCase("sf-mission-hardware-synthetic"));

    expect(result.selectedLocalWorkflowCount).toBe(1);
    expect(result.evaluations[0]).toMatchObject({
      kind: "local_tax_workflow",
      workflowId: "tax_gap_ca_san_francisco_business_tax_v1"
    });
  });

  it("does not emit pre-opportunity form fields for review-required local workflows when required values are present", () => {
    const preview = buildTaxProfileRuntimePreview({
      taxContext: taxCase("sf-mission-hardware-complete-local-review"),
      geography: geographyFor(taxCase("sf-mission-hardware-complete-local-review")),
      localTaxWorkflows,
      taxGapRuntimeRules
    });

    expect(preview.status).toBe("needs_structured_tax_model");
    expect(preview.opportunityDisplayBlocked).toBe(false);
    expect(preview.requiredPreOpportunityInputs).toHaveLength(0);
    expect(preview.requiresStructuredTaxModelWork).toBe(true);
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
