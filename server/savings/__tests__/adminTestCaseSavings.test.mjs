import { describe, expect, it } from "vitest";
import { buildAdminTestCaseSavingsPreview } from "../adminTestCaseSavings.mjs";

describe("admin test-case savings previews", () => {
  it("calculates the LED admin test fixture preview", () => {
    const preview = buildAdminTestCaseSavingsPreview({
      sampleUserId: "sample_led",
      calculationDate: "2026-06-27",
      normalizedProfile: {
        site: {
          geo: {
            stateCode: "CA",
            countyFips: "06075"
          }
        }
      },
      retrofitGroup: {
        retrofitTypeId: "led_lighting_retrofit",
        displayName: "LED lighting retrofit",
        opportunityCount: 12
      }
    });

    expect(preview).toMatchObject({
      status: "calculated",
      estimateKind: "test_fixture",
      modelCoverage: "retrofit_only",
      upfrontCostCents: 160425,
      upfrontSavingsCents: 0,
      upfrontCostAfterSavingsCents: 160425,
      monthlySavingsCents: 1872,
      annualSavingsCents: 22464
    });
    expect(preview.costBreakdown).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ category: "equipment_cost", amountCents: 102000 }),
        expect.objectContaining({ category: "installation_labor", amountCents: 49500 }),
        expect.objectContaining({ category: "sales_tax", amountCents: 8925 })
      ])
    );
  });

  it("calculates modeled HVAC admin test fixture previews", () => {
    const preview = buildAdminTestCaseSavingsPreview({
      sampleUserId: "sample_hvac",
      calculationDate: "2026-06-27",
      normalizedProfile: {},
      retrofitGroup: {
        retrofitTypeId: "high_efficiency_hvac_replacement",
        displayName: "High-efficiency HVAC replacement",
        opportunityCount: 3
      }
    });

    expect(preview).toMatchObject({
      status: "calculated",
      estimateKind: "test_fixture",
      modelCoverage: "retrofit_only",
      upfrontCostCents: 798000,
      upfrontSavingsCents: 0,
      upfrontCostAfterSavingsCents: 798000,
      monthlySavingsCents: 6000,
      annualSavingsCents: 72000
    });
    expect(preview.billLineDeltas).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ domain: "electric", canonicalField: "annual_kwh_delta", deltaValue: -4000 })
      ])
    );
  });

  it("keeps multiple incentive effects for one matched opportunity-retrofit pair", () => {
    const preview = buildAdminTestCaseSavingsPreview({
      sampleUserId: "sample_led_combo",
      calculationDate: "2026-06-27",
      normalizedProfile: {},
      retrofitGroup: {
        retrofitTypeId: "led_lighting_retrofit",
        displayName: "LED lighting retrofit",
        opportunityCount: 1,
        opportunities: [{ opportunityId: "opp_combo_led" }]
      },
      opportunityIncentiveRules: [
        {
          id: "oir_combo_led_rebate_v1",
          version: 1,
          opportunityId: "opp_combo_led",
          name: "Combo LED Rebate",
          incentiveType: "fixed_per_unit_rebate",
          timing: "upfront",
          amountRule: { kind: "fixed_amount", amountCents: 10000 },
          basisPolicy: { basis: "gross_project_cost", applicationOrder: 10 },
          confidence: "high",
          active: true
        },
        {
          id: "oir_combo_led_bill_credit_v1",
          version: 1,
          opportunityId: "opp_combo_led",
          name: "Combo LED Bill Credit",
          incentiveType: "recurring_bill_credit",
          timing: "annual",
          amountRule: { kind: "fixed_amount", amountCents: 12000 },
          basisPolicy: { basis: "gross_project_cost", applicationOrder: 20 },
          confidence: "high",
          active: true
        }
      ]
    });

    expect(preview.oneTimeSavingsCents).toBe(10000);
    expect(preview.annualRecurringSavingsCents).toBe(34464);
    expect(preview.netAnnualRecurringSavingsCents).toBe(34464);
    expect(preview.selectedIncentiveScenario).toMatchObject({
      opportunityIds: ["opp_combo_led"],
      incentiveRuleIds: ["oir_combo_led_rebate_v1", "oir_combo_led_bill_credit_v1"],
      totalUpfrontSavingsCents: 10000,
      firstYearRecurringSavingsCents: 12000
    });
    expect(preview.selectedIncentiveScenario.upfrontSavingsEntries).toHaveLength(1);
    expect(preview.selectedIncentiveScenario.recurringSavingsEntries).toHaveLength(1);
  });

  it("passes tax context into matched v2 tax package summaries without adding review-gated money to totals", () => {
    const preview = buildAdminTestCaseSavingsPreview({
      sampleUserId: "sample_tax_context",
      calculationDate: "2026-06-27",
      normalizedProfile: {
        site: {
          geo: {
            stateCode: "MI",
            countyFips: "26081"
          }
        }
      },
      taxContext: {
        taxProfileFacts: [
          { inputKey: "company_current_on_state_and_local_taxes", value: true, sourceStrategy: "synthetic_tax_document" },
          { inputKey: "eligible_state_education_tax_cents", value: 1000, sourceStrategy: "synthetic_tax_document" },
          { inputKey: "eligible_real_property_tax_cents", value: 2000, sourceStrategy: "synthetic_tax_document" },
          { inputKey: "eligible_personal_property_tax_cents", value: 3000, sourceStrategy: "synthetic_tax_document" },
          { inputKey: "eligible_local_income_tax_cents", value: 4000, sourceStrategy: "synthetic_tax_document" }
        ],
        taxOpportunitySpecificInputs: [
          { opportunityId: "opp_tax_context", inputKey: "approved_rerz_designation", value: true },
          { opportunityId: "opp_tax_context", inputKey: "qualified_company_operations", value: true },
          { opportunityId: "opp_tax_context", inputKey: "phaseout_multiplier", value: 0.75 }
        ]
      },
      retrofitGroup: {
        retrofitTypeId: "led_lighting_retrofit",
        displayName: "LED lighting retrofit",
        opportunityCount: 1,
        opportunities: [{ opportunityId: "opp_tax_context" }]
      },
      opportunityIncentiveCalculationPackages: [taxContextExpressionPackage()]
    });

    const [summary] = preview.incentiveCalculationPackageSummaries;
    expect(summary).toMatchObject({
      opportunityId: "opp_tax_context",
      runtimeInclusionStatus: "human_review_required",
      missingInputs: []
    });
    expect(summary.effectSummaries[0]).toMatchObject({
      effectType: "tax_exemption",
      amountCents: 7500,
      humanReviewRequired: true
    });
    expect(summary.resolvedInputs).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ inputKey: "approved_rerz_designation", source: "tax_opportunity_input" }),
        expect.objectContaining({ inputKey: "eligible_real_property_tax_cents", source: "tax_profile_fact" })
      ])
    );
    expect(preview.oneTimeSavingsCents).toBe(0);
  });

  it("keeps service-only matched items unsupported until modeled savings are available", () => {
    const preview = buildAdminTestCaseSavingsPreview({
      sampleUserId: "sample_audit",
      calculationDate: "2026-06-27",
      normalizedProfile: {},
      retrofitGroup: {
        retrofitTypeId: "energy_audit",
        displayName: "Energy audit",
        opportunityCount: 2
      }
    });

    expect(preview).toMatchObject({
      status: "unsupported",
      estimateKind: "not_modeled_v1",
      modelCoverage: "none",
      upfrontCostCents: null,
      annualSavingsCents: null
    });
  });
});

function taxContextExpressionPackage() {
  const requiredInputs = [
    "approved_rerz_designation",
    "qualified_company_operations",
    "company_current_on_state_and_local_taxes",
    "phaseout_multiplier",
    "eligible_state_education_tax_cents",
    "eligible_real_property_tax_cents",
    "eligible_personal_property_tax_cents",
    "eligible_local_income_tax_cents"
  ].map((inputKey) => ({
    input_key: inputKey,
    label: inputKey,
    value_type: "text",
    required_for: ["effect_tax_context"],
    source_precedence: ["tax_profile"],
    missing_severity: "blocks_calculation"
  }));

  return {
    schema_version: "2.0.0",
    opportunity_id: "opp_tax_context",
    program_name: "Tax Context Expression",
    calculation_status: "calculable_with_missing_inputs",
    availability: { status: "active", source_access_status: "accessible" },
    customer_segments: ["commercial"],
    retrofit_types: ["led_lighting_retrofit"],
    geography: { country: "US", states: ["MI"], counties: [], cities: [], utility_territory_required: false },
    measure_catalogs: [],
    rate_tables: [],
    effects: [
      {
        effect_id: "effect_tax_context",
        label: "Tax expression requiring review",
        effect_type: "tax_exemption",
        cash_flow_direction: "benefit",
        timing: { cadence: "annual", source_timing: "annual" },
        calculation: { method: "expression", expression_id: "tax_exempt_liability" },
        limits: [],
        caps: [],
        required_inputs: requiredInputs,
        evidence_refs: ["tax_context"],
        confidence: { overall: 0.72, calculation: 0.72, extraction: 0.9, reason_codes: ["tax_package_test"] },
        repair_metadata: {
          included_in_user_facing_total_default: false,
          cash_value_classification: "tax_exemption",
          value_model_kind: "tax_exempt_liability",
          human_review_required: true
        }
      }
    ],
    global_limits: [],
    global_caps: [],
    stacking: { behavior: "unknown_requires_review" },
    input_requirements: requiredInputs,
    assumptions: [],
    source_evidence: [{ evidence_id: "tax_context", source_type: "web_page", quote: "Tax expression", evidence_confidence: 0.9 }],
    confidence: { overall: 0.72, source_access: 0.9, availability: 0.9, calculation: 0.72, extraction: 0.9, reason_codes: ["tax_package_test"] }
  };
}
