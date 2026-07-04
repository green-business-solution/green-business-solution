import { describe, expect, it } from "vitest";
import { buildIncentiveScenarios, selectBestScenario } from "../stacking.mjs";
import { buildV2RuntimeIncentiveBridge } from "../v2RuntimeIncentives.mjs";

function ctx(overrides = {}) {
  const { answers: answerOverrides = {}, ...rest } = overrides;
  return {
    answers: {
      project_cost_cents: { value: 100000 },
      smart_charger_confirmed: { value: true },
      ...answerOverrides
    },
    billLines: {},
    billLineDeltas: [],
    baseCostLedgerEntries: [{ id: "cost", kind: "upfront_cost", category: "equipment_cost", amountCents: 100000 }],
    baseRecurringSavingsEntries: [],
    upfrontCostCents: 100000,
    ...rest
  };
}

describe("v2 runtime incentive bridge", () => {
  it("turns complete included v2 effects into runtime scenario rules", () => {
    const bridge = buildV2RuntimeIncentiveBridge({
      packages: [includedFixedPackage()],
      existingLegacyRules: [],
      ctx: ctx()
    });
    const scenarios = buildIncentiveScenarios({
      incentiveRules: bridge.runtimeRules,
      selectedOpportunityIds: ["opp_v2_fixed"],
      ...ctx()
    });
    const best = selectBestScenario(scenarios);

    expect(bridge.counts).toMatchObject({ matchedPackageCount: 1, runtimeRuleCount: 1, includedPackageCount: 1 });
    expect(bridge.packageSummaries[0].runtimeInclusionStatus).toBe("included");
    expect(best.totalUpfrontSavingsCents).toBe(25000);
    expect(best.opportunityIds).toEqual(["opp_v2_fixed"]);
  });

  it("summarizes missing v2 inputs without creating runtime money", () => {
    const bridge = buildV2RuntimeIncentiveBridge({
      packages: [includedFixedPackage()],
      existingLegacyRules: [],
      ctx: ctx({ answers: { smart_charger_confirmed: undefined } })
    });

    expect(bridge.runtimeRules).toEqual([]);
    expect(bridge.packageSummaries[0].runtimeInclusionStatus).toBe("missing_inputs");
    expect(bridge.packageSummaries[0].missingInputs).toEqual([
      { inputKey: "smart_charger_confirmed", effectId: "effect_fixed", label: "Smart charger confirmed" }
    ]);
    expect(bridge.packageSummaries[0].formInputFields).toEqual([
      expect.objectContaining({
        inputKey: "smart_charger_confirmed",
        collectionSurface: "project_quote_upload",
        implementationStatus: "planned",
        uploadKind: "quote_or_invoice"
      })
    ]);
  });

  it("prefers an existing legacy rule for the same opportunity to avoid double counting", () => {
    const bridge = buildV2RuntimeIncentiveBridge({
      packages: [includedFixedPackage()],
      existingLegacyRules: [{ id: "oir_legacy", opportunityId: "opp_v2_fixed" }],
      ctx: ctx()
    });

    expect(bridge.runtimeRules).toEqual([]);
    expect(bridge.packageSummaries[0].runtimeInclusionStatus).toBe("legacy_rule_preferred");
  });

  it("uses a visible conservative unit-count placeholder for simple v2 per-unit effects", () => {
    const bridge = buildV2RuntimeIncentiveBridge({
      packages: [includedPerUnitPackage()],
      existingLegacyRules: [],
      ctx: ctx({ answers: { unit_count: undefined } })
    });

    expect(bridge.packageSummaries[0].runtimeInclusionStatus).toBe("included");
    expect(bridge.packageSummaries[0].defaultedInputs).toEqual([
      expect.objectContaining({
        inputKey: "unit_count",
        canonicalInputKey: "unit_count",
        source: "safe_placeholder_default",
        defaultIsPlaceholder: true,
        userOverrideAllowed: true
      })
    ]);
    expect(bridge.runtimeRules[0].amountRule.amountCents).toBe(5000);
  });

  it("uses synthetic admin test-case defaults for measure catalogs only when explicitly enabled", () => {
    const withoutSynthetic = buildV2RuntimeIncentiveBridge({
      packages: [includedMeasureCatalogPackage()],
      existingLegacyRules: [],
      ctx: ctx({ answers: { measure_type: undefined, unit_count: undefined } })
    });
    const withSynthetic = buildV2RuntimeIncentiveBridge({
      packages: [includedMeasureCatalogPackage()],
      existingLegacyRules: [],
      ctx: ctx({
        answers: { measure_type: undefined, unit_count: undefined },
        allowSyntheticV2Defaults: true
      })
    });

    expect(withoutSynthetic.packageSummaries[0].runtimeInclusionStatus).toBe("missing_inputs");
    expect(withSynthetic.packageSummaries[0].runtimeInclusionStatus).toBe("included");
    expect(withSynthetic.runtimeRules[0].amountRule.amountCents).toBe(2500);
  });

  it("uses source-row amount fields for repaired measure catalog rows", () => {
    const bridge = buildV2RuntimeIncentiveBridge({
      packages: [sourceRowMeasureCatalogPackage()],
      existingLegacyRules: [],
      ctx: ctx({
        answers: { measure_type: undefined, unit_count: undefined },
        allowSyntheticV2Defaults: true,
        sourceRetrofitTypeId: "level_2_ev_charger_installation"
      })
    });

    expect(bridge.packageSummaries[0].runtimeInclusionStatus).toBe("included");
    expect(bridge.runtimeRules[0].amountRule.amountCents).toBe(400000);
  });

  it("uses conservative range rate-table rows and point-of-sale timing for repaired packages", () => {
    const bridge = buildV2RuntimeIncentiveBridge({
      packages: [rangeRateTablePointOfSalePackage()],
      existingLegacyRules: [],
      ctx: ctx({
        answers: { tons: { value: 3 } },
        sourceRetrofitTypeId: "heat_pump_hvac_retrofit"
      })
    });

    expect(bridge.packageSummaries[0].runtimeInclusionStatus).toBe("included");
    expect(bridge.runtimeRules[0].timing).toBe("upfront");
    expect(bridge.runtimeRules[0].amountRule.amountCents).toBe(3000);
  });

  it("treats supported v2 tax credits as first-class runtime effects even when not grant totals", () => {
    const bridge = buildV2RuntimeIncentiveBridge({
      packages: [supportedTaxCreditPackage()],
      existingLegacyRules: [],
      ctx: ctx()
    });
    const scenarios = buildIncentiveScenarios({
      incentiveRules: bridge.runtimeRules,
      selectedOpportunityIds: ["opp_v2_tax"],
      ...ctx()
    });
    const best = selectBestScenario(scenarios);

    expect(bridge.packageSummaries[0].runtimeInclusionStatus).toBe("included");
    expect(bridge.runtimeRules[0].incentiveType).toBe("tax_credit");
    expect(best.totalUpfrontSavingsCents).toBe(10000);
    expect(best.upfrontSavingsEntries[0].category).toBe("tax_credit");
  });

  it("keeps repaired tax expressions out of runtime totals when tax review is required", () => {
    const bridge = buildV2RuntimeIncentiveBridge({
      packages: [humanReviewTaxExpressionPackage()],
      existingLegacyRules: [],
      ctx: ctx({
        answers: {
          approved_rerz_designation: { value: true },
          qualified_company_operations: { value: true },
          company_current_on_state_and_local_taxes: { value: true },
          phaseout_multiplier: { value: 1 },
          eligible_state_education_tax_cents: { value: 10000 },
          eligible_real_property_tax_cents: { value: 20000 },
          eligible_personal_property_tax_cents: { value: 30000 },
          eligible_local_income_tax_cents: { value: 40000 }
        }
      })
    });

    expect(bridge.runtimeRules).toEqual([]);
    expect(bridge.packageSummaries[0].runtimeInclusionStatus).toBe("human_review_required");
    expect(bridge.packageSummaries[0].effectSummaries[0].amountCents).toBe(100000);
  });

  it("uses repaired grant decision metadata instead of stale needs-repair package status", () => {
    const bridge = buildV2RuntimeIncentiveBridge({
      packages: [productionSuppressedGrantPackage()],
      existingLegacyRules: [],
      ctx: ctx()
    });

    expect(bridge.runtimeRules).toEqual([]);
    expect(bridge.packageSummaries[0].runtimeInclusionStatus).toBe("no_calculable_value");
    expect(bridge.packageSummaries[0].effectSummaries[0]).toMatchObject({
      effectType: "grant_expected_value",
      estimateStatus: "suppressed",
      hasProductionDecision: true,
      potentialAwardCents: 2000000
    });
  });

  it("treats grant and rebate custom quote packages as quote form gates", () => {
    const bridge = buildV2RuntimeIncentiveBridge({
      packages: [customQuoteRebatePackage()],
      existingLegacyRules: [],
      ctx: ctx()
    });

    expect(bridge.runtimeRules).toEqual([]);
    expect(bridge.packageSummaries[0].runtimeInclusionStatus).toBe("needs_quote");
    expect(bridge.packageSummaries[0].formInputFields).toEqual([
      expect.objectContaining({
        inputKey: "smart_charger_confirmed",
        collectionSurface: "project_quote_upload",
        implementationStatus: "planned"
      })
    ]);
  });

  it("treats grant production action zero placeholders as no-calculable-value decisions", () => {
    const bridge = buildV2RuntimeIncentiveBridge({
      packages: [productionActionZeroValuePackage()],
      existingLegacyRules: [],
      ctx: ctx()
    });

    expect(bridge.runtimeRules).toEqual([]);
    expect(bridge.packageSummaries[0].runtimeInclusionStatus).toBe("no_calculable_value");
    expect(bridge.packageSummaries[0].effectSummaries[0]).toMatchObject({
      estimateStatus: "zero_value",
      hasProductionDecision: true,
      runtimeEligibleForTotals: false
    });
  });

  it("routes grant production action non-grant workflows outside grant totals", () => {
    const bridge = buildV2RuntimeIncentiveBridge({
      packages: [productionActionNonGrantWorkflowPackage()],
      existingLegacyRules: [],
      ctx: ctx()
    });

    expect(bridge.runtimeRules).toEqual([]);
    expect(bridge.packageSummaries[0].runtimeInclusionStatus).toBe("non_monetary_workflow");
    expect(bridge.packageSummaries[0].effectSummaries[0]).toMatchObject({
      estimateStatus: "non_grant_workflow",
      hasProductionDecision: true,
      runtimeEligibleForTotals: false
    });
  });

  it("uses repaired tax metadata instead of stale non-monetary package status", () => {
    const bridge = buildV2RuntimeIncentiveBridge({
      packages: [nonMonetaryStatusTaxPackage()],
      existingLegacyRules: [],
      ctx: ctx({
        answers: {
          ac_nameplate_capacity_kw: { value: 100 },
          tangible_property_applicable: { value: true },
          real_property_applicable: { value: true },
          counterfactual_ordinary_annual_property_tax_cents: { value: 100000 }
        }
      })
    });

    expect(bridge.runtimeRules).toEqual([]);
    expect(bridge.packageSummaries[0].runtimeInclusionStatus).toBe("human_review_required");
    expect(bridge.packageSummaries[0].effectSummaries[0].amountCents).toBe(15000);
  });
});

function includedFixedPackage() {
  return {
    schema_version: "2.0.0",
    opportunity_id: "opp_v2_fixed",
    program_name: "V2 Fixed Rebate",
    calculation_status: "calculable",
    availability: { status: "active", source_access_status: "accessible" },
    customer_segments: ["residential"],
    retrofit_types: ["level_2_ev_charger_installation"],
    geography: { country: "US", states: ["GA"], counties: [], cities: [], utility_territory_required: true },
    measure_catalogs: [],
    rate_tables: [],
    effects: [
      {
        effect_id: "effect_fixed",
        label: "V2 fixed charger rebate",
        effect_type: "one_time_savings",
        cash_flow_direction: "benefit",
        timing: { cadence: "one_time" },
        calculation: { method: "fixed_amount", amount: { value: 250, currency: "USD" } },
        limits: [],
        caps: [],
        required_inputs: [
          {
            input_key: "smart_charger_confirmed",
            label: "Smart charger confirmed",
            value_type: "boolean",
            required_for: ["effect_fixed"],
            source_precedence: ["quote"],
            missing_severity: "blocks_calculation"
          }
        ],
        evidence_refs: ["ev_fixed"],
        confidence: { overall: 0.9, calculation: 0.9, extraction: 0.9, reason_codes: ["fixed_amount"] },
        repair_metadata: {
          included_in_user_facing_total_default: true,
          cash_value_classification: "rebate",
          value_model_kind: "fixed_amount"
        }
      }
    ],
    global_limits: [],
    global_caps: [],
    stacking: { behavior: "unknown_requires_review" },
    input_requirements: [
      {
        input_key: "smart_charger_confirmed",
        label: "Smart charger confirmed",
        value_type: "boolean",
        required_for: ["effect_fixed"],
        source_precedence: ["quote"],
        missing_severity: "blocks_calculation"
      }
    ],
    assumptions: [],
    source_evidence: [{ evidence_id: "ev_fixed", source_type: "web_page", quote: "$250 rebate", evidence_confidence: 0.9 }],
    confidence: { overall: 0.9, source_access: 0.9, availability: 0.9, calculation: 0.9, extraction: 0.9, reason_codes: ["fixed_amount"] }
  };
}

function includedPerUnitPackage() {
  const pkg = includedFixedPackage();
  return {
    ...pkg,
    opportunity_id: "opp_v2_per_unit",
    program_name: "V2 Per Unit Rebate",
    effects: [
      {
        ...pkg.effects[0],
        effect_id: "effect_per_unit",
        label: "Per-unit rebate",
        calculation: {
          method: "per_unit",
          rate: { amount: { value: 50, currency: "USD" }, unit: "unit" },
          quantity_input: "unit_count"
        },
        required_inputs: [
          {
            input_key: "unit_count",
            label: "Unit count",
            value_type: "number",
            required_for: ["effect_per_unit"],
            source_precedence: ["retrofit_quantity"],
            missing_severity: "blocks_calculation"
          }
        ]
      }
    ],
    input_requirements: [
      {
        input_key: "unit_count",
        label: "Unit count",
        value_type: "number",
        required_for: ["effect_per_unit"],
        source_precedence: ["retrofit_quantity"],
        missing_severity: "blocks_calculation"
      }
    ]
  };
}

function includedMeasureCatalogPackage() {
  const pkg = includedFixedPackage();
  return {
    ...pkg,
    opportunity_id: "opp_v2_catalog",
    program_name: "V2 Catalog Rebate",
    measure_catalogs: [
      {
        catalog_id: "catalog_test",
        name: "Catalog Test",
        selection_input: "measure_type",
        measures: [
          {
            measure_id: "smart_thermostat",
            name: "Smart thermostat",
            calculation: { method: "fixed_amount", amount: { value: 25, currency: "USD" } },
            customer_filters: [],
            equipment_filters: [],
            limits: [],
            required_inputs: [],
            evidence_refs: [],
            confidence: { overall: 0.9, calculation: 0.9, extraction: 0.9, reason_codes: ["test"] }
          },
          {
            measure_id: "heat_pump",
            name: "Heat pump",
            calculation: { method: "fixed_amount", amount: { value: 500, currency: "USD" } },
            customer_filters: [],
            equipment_filters: [],
            limits: [],
            required_inputs: [],
            evidence_refs: [],
            confidence: { overall: 0.9, calculation: 0.9, extraction: 0.9, reason_codes: ["test"] }
          }
        ]
      }
    ],
    effects: [
      {
        ...pkg.effects[0],
        effect_id: "effect_catalog",
        label: "Catalog rebate",
        calculation: {
          method: "measure_catalog",
          measure_catalog_id: "catalog_test",
          measure_selection_input: "measure_type"
        },
        required_inputs: [
          {
            input_key: "measure_type",
            label: "Measure type",
            value_type: "text",
            required_for: ["effect_catalog"],
            source_precedence: ["equipment_selection"],
            missing_severity: "blocks_calculation"
          },
          {
            input_key: "unit_count",
            label: "Unit count",
            value_type: "number",
            required_for: ["effect_catalog"],
            source_precedence: ["retrofit_quantity"],
            missing_severity: "blocks_calculation"
          }
        ]
      }
    ],
    input_requirements: [
      {
        input_key: "measure_type",
        label: "Measure type",
        value_type: "text",
        required_for: ["effect_catalog"],
        source_precedence: ["equipment_selection"],
        missing_severity: "blocks_calculation"
      },
      {
        input_key: "unit_count",
        label: "Unit count",
        value_type: "number",
        required_for: ["effect_catalog"],
        source_precedence: ["retrofit_quantity"],
        missing_severity: "blocks_calculation"
      }
    ]
  };
}

function sourceRowMeasureCatalogPackage() {
  const pkg = includedMeasureCatalogPackage();
  return {
    ...pkg,
    opportunity_id: "opp_v2_source_row_catalog",
    measure_catalogs: [
      {
        catalog_id: "catalog_source_row",
        name: "Source Row Catalog",
        selection_input: "charger_and_site_category",
        measures: [
          {
            measure_id: "smart_networked_level_2",
            name: "Smart networked Level 2",
            calculation: {
              method: "zero_when_not_applicable",
              reason: "Measure row requires custom interpretation.",
              source_row: {
                category: "smart_networked_level_2",
                amountCentsPerEligibleChargerOrPort: 400000,
                maxUnits: 2
              }
            },
            customer_filters: [],
            equipment_filters: [],
            limits: [],
            required_inputs: [],
            evidence_refs: [],
            confidence: { overall: 0.9, calculation: 0.9, extraction: 0.9, reason_codes: ["test"] }
          }
        ]
      }
    ],
    effects: [
      {
        ...pkg.effects[0],
        effect_id: "effect_source_row_catalog",
        label: "Source row catalog rebate",
        calculation: {
          method: "measure_catalog",
          measure_catalog_id: "catalog_source_row",
          measure_selection_input: "charger_and_site_category"
        },
        required_inputs: [
          {
            input_key: "charger_count",
            label: "Charger count",
            value_type: "number",
            required_for: ["effect_source_row_catalog"],
            source_precedence: ["retrofit_quantity"],
            missing_severity: "blocks_calculation"
          }
        ]
      }
    ],
    input_requirements: [
      {
        input_key: "charger_count",
        label: "Charger count",
        value_type: "number",
        required_for: ["effect_source_row_catalog"],
        source_precedence: ["retrofit_quantity"],
        missing_severity: "blocks_calculation"
      }
    ]
  };
}

function rangeRateTablePointOfSalePackage() {
  const pkg = includedFixedPackage();
  return {
    ...pkg,
    opportunity_id: "opp_v2_range_rate",
    program_name: "V2 Range Rate Rebate",
    rate_tables: [
      {
        table_id: "range_rates",
        name: "Range Rates",
        dimensions: ["measure_type"],
        rows: [
          { measure: "commercial heat pump", minRate: 10, maxRate: 100, rateUnit: "USD_per_ton" },
          { measure: "LED fixture", minRate: 2, maxRate: 20, rateUnit: "USD_per_fixture" }
        ]
      }
    ],
    effects: [
      {
        ...pkg.effects[0],
        effect_id: "effect_range_rate",
        label: "Range rate rebate",
        timing: { cadence: "custom", source_timing: "point_of_sale" },
        calculation: { method: "rate_table", rate_table_id: "range_rates", lookup_inputs: ["measure_type"] },
        required_inputs: [
          {
            input_key: "tons",
            label: "Tons",
            value_type: "number",
            required_for: ["effect_range_rate"],
            source_precedence: ["quote"],
            missing_severity: "blocks_calculation"
          }
        ],
        repair_metadata: {
          included_in_user_facing_total_default: true,
          cash_value_classification: "rebate",
          value_model_kind: "rate_table"
        }
      }
    ],
    input_requirements: [
      {
        input_key: "tons",
        label: "Tons",
        value_type: "number",
        required_for: ["effect_range_rate"],
        source_precedence: ["quote"],
        missing_severity: "blocks_calculation"
      }
    ]
  };
}

function supportedTaxCreditPackage() {
  return {
    schema_version: "2.0.0",
    opportunity_id: "opp_v2_tax",
    program_name: "V2 Tax Credit",
    calculation_status: "calculable",
    availability: { status: "active", source_access_status: "accessible" },
    customer_segments: ["commercial"],
    retrofit_types: ["led_lighting_retrofit"],
    geography: { country: "US", states: ["CA"], counties: [], cities: [], utility_territory_required: false },
    measure_catalogs: [],
    rate_tables: [],
    effects: [
      {
        effect_id: "effect_tax_credit",
        label: "V2 tax credit",
        effect_type: "tax_credit",
        cash_flow_direction: "benefit",
        timing: { cadence: "one_time", source_timing: "tax_filing" },
        calculation: { method: "fixed_amount", amount: { value: 100, currency: "USD" } },
        limits: [],
        caps: [],
        required_inputs: [],
        evidence_refs: ["tax_fixed"],
        confidence: { overall: 0.9, calculation: 0.9, extraction: 0.9, reason_codes: ["fixed_tax_credit"] },
        repair_metadata: {
          included_in_user_facing_total_default: false,
          cash_value_classification: "tax_credit",
          value_model_kind: "tax_credit",
          human_review_required: false
        }
      }
    ],
    global_limits: [],
    global_caps: [],
    stacking: { behavior: "unknown_requires_review" },
    input_requirements: [],
    assumptions: [],
    source_evidence: [{ evidence_id: "tax_fixed", source_type: "web_page", quote: "$100 tax credit", evidence_confidence: 0.9 }],
    confidence: { overall: 0.9, source_access: 0.9, availability: 0.9, calculation: 0.9, extraction: 0.9, reason_codes: ["fixed_tax_credit"] }
  };
}

function humanReviewTaxExpressionPackage() {
  const effect = {
    effect_id: "effect_tax_expression",
    label: "Tax expression requiring review",
    effect_type: "tax_exemption",
    cash_flow_direction: "benefit",
    timing: { cadence: "annual", source_timing: "annual" },
    calculation: { method: "expression", expression_id: "tax_exempt_liability" },
    limits: [],
    caps: [],
    required_inputs: [
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
      required_for: ["effect_tax_expression"],
      source_precedence: ["tax_profile"],
      missing_severity: "blocks_calculation"
    })),
    evidence_refs: ["tax_expression"],
    confidence: { overall: 0.72, calculation: 0.72, extraction: 0.9, reason_codes: ["tax_package_repair"] },
    repair_metadata: {
      included_in_user_facing_total_default: false,
      cash_value_classification: "tax_exemption",
      value_model_kind: "tax_exempt_liability",
      human_review_required: true
    }
  };

  return {
    schema_version: "2.0.0",
    opportunity_id: "opp_v2_tax_expression_review",
    program_name: "Tax Expression Review",
    calculation_status: "calculable_with_missing_inputs",
    availability: { status: "active", source_access_status: "accessible" },
    customer_segments: ["commercial"],
    retrofit_types: ["tax_or_special_workflow"],
    geography: { country: "US", states: ["MI"], counties: [], cities: [], utility_territory_required: false },
    measure_catalogs: [],
    rate_tables: [],
    effects: [effect],
    global_limits: [],
    global_caps: [],
    stacking: { behavior: "unknown_requires_review" },
    input_requirements: effect.required_inputs,
    assumptions: [],
    source_evidence: [{ evidence_id: "tax_expression", source_type: "web_page", quote: "Tax expression", evidence_confidence: 0.9 }],
    confidence: { overall: 0.72, source_access: 0.9, availability: 0.9, calculation: 0.72, extraction: 0.9, reason_codes: ["tax_package_repair"] }
  };
}

function productionSuppressedGrantPackage() {
  return {
    schema_version: "2.0.0",
    opportunity_id: "opp_v2_production_grant",
    program_name: "Production Suppressed Grant",
    calculation_status: "needs_repair_review",
    availability: { status: "active", source_access_status: "accessible" },
    customer_segments: ["commercial"],
    retrofit_types: ["level_2_ev_charger_installation"],
    geography: { country: "US", states: ["RI"], counties: [], cities: [], utility_territory_required: false },
    measure_catalogs: [],
    rate_tables: [],
    effects: [
      {
        effect_id: "effect_grant_ev",
        label: "Competitive grant EV",
        effect_type: "grant_expected_value",
        cash_flow_direction: "benefit",
        timing: { cadence: "one_time", source_timing: "reimbursement" },
        calculation: {
          method: "expected_value",
          conditional_award_cents: 0,
          max_award_cents: 2000000,
          probability_discount: 0
        },
        limits: [],
        caps: [],
        required_inputs: [],
        evidence_refs: ["grant_ev"],
        confidence: { overall: 0.38, calculation: 0.38, extraction: 0.9, reason_codes: ["grant_production_quality_repair_applied"] },
        repair_metadata: {
          included_in_user_facing_total_default: false,
          cash_value_classification: "cash_grant",
          value_model_kind: "competitive_max_only",
          human_review_required: true,
          repair_status: "suppress_no_probability_evidence",
          calculation_status: "no_calculable_value",
          grant_production_quality_repair: {
            estimate_recommendation: {
              estimate_status: "suppressed",
              reason_codes: ["competitive_max_only", "no_probability_evidence"]
            }
          }
        }
      }
    ],
    global_limits: [],
    global_caps: [],
    stacking: { behavior: "unknown_requires_review" },
    input_requirements: [],
    assumptions: [],
    source_evidence: [{ evidence_id: "grant_ev", source_type: "web_page", quote: "Up to $20,000", evidence_confidence: 0.9 }],
    confidence: { overall: 0.38, source_access: 0.9, availability: 0.9, calculation: 0.38, extraction: 0.9, reason_codes: ["needs_repair_review"] }
  };
}

function customQuoteRebatePackage() {
  const pkg = includedFixedPackage();
  return {
    ...pkg,
    opportunity_id: "opp_v2_custom_quote_rebate",
    program_name: "Custom Quote Rebate",
    calculation_status: "custom_quote_estimate",
    effects: [
      {
        ...pkg.effects[0],
        effect_id: "effect_custom_quote_rebate",
        label: "Custom quote rebate",
        repair_metadata: {
          included_in_user_facing_total_default: true,
          cash_value_classification: "rebate",
          value_model_kind: "custom_quote"
        }
      }
    ]
  };
}

function productionActionZeroValuePackage() {
  const pkg = includedFixedPackage();
  return {
    ...pkg,
    opportunity_id: "opp_v2_grant_action_zero",
    program_name: "No Calculable Grant",
    calculation_status: "no_calculable_value",
    effects: [
      {
        ...pkg.effects[0],
        effect_id: "effect_grant_action_zero",
        label: "No calculable grant",
        calculation: { method: "zero_when_not_applicable", reason: "No calculable value." },
        repair_metadata: {
          included_in_user_facing_total_default: false,
          cash_value_classification: "rebate",
          value_model_kind: "no_calculable_value",
          human_review_required: false,
          repair_status: "zero_placeholder_no_calculable_value",
          calculation_status: "no_calculable_value",
          grant_production_action_repair: {
            estimate_status: "zero_value",
            recommended_action: "zero_placeholder_no_calculable_value",
            reason_codes: ["zero_value", "no_calculable_value"]
          }
        }
      }
    ]
  };
}

function productionActionNonGrantWorkflowPackage() {
  const pkg = includedFixedPackage();
  return {
    ...pkg,
    opportunity_id: "opp_v2_grant_action_non_grant",
    program_name: "Managed Charging Workflow",
    calculation_status: "non_monetary_workflow",
    effects: [
      {
        ...pkg.effects[0],
        effect_id: "effect_grant_action_non_grant",
        label: "Managed charging workflow",
        calculation: { method: "zero_when_not_applicable", reason: "Handled outside the grant estimator." },
        repair_metadata: {
          included_in_user_facing_total_default: false,
          cash_value_classification: "rebate",
          value_model_kind: "hybrid_rate_plus_cap",
          human_review_required: false,
          repair_status: "non_grant_workflow",
          calculation_status: "non_monetary_workflow",
          grant_production_action_repair: {
            estimate_status: "non_grant_workflow",
            recommended_action: "non_grant_workflow",
            reason_codes: ["non_grant_workflow", "outside_grant_estimator"]
          }
        }
      }
    ]
  };
}

function nonMonetaryStatusTaxPackage() {
  const pkg = humanReviewTaxExpressionPackage();
  return {
    ...pkg,
    opportunity_id: "SOURCE_DSIRE:dsire_program_id:22798",
    program_name: "Renewable Energy Tax Valuation",
    calculation_status: "non_monetary_workflow",
    effects: [
      {
        ...pkg.effects[0],
        effect_id: "effect_property_tax_valuation",
        label: "Property tax valuation",
        effect_type: "property_tax_valuation",
        calculation: { method: "expression", expression_id: "property_tax_valuation_formula" },
        required_inputs: [
          "ac_nameplate_capacity_kw",
          "tangible_property_applicable",
          "real_property_applicable",
          "counterfactual_ordinary_annual_property_tax_cents"
        ].map((inputKey) => ({
          input_key: inputKey,
          label: inputKey,
          value_type: "text",
          required_for: ["effect_property_tax_valuation"],
          source_precedence: ["property_tax_profile"],
          missing_severity: "blocks_calculation"
        })),
        repair_metadata: {
          included_in_user_facing_total_default: false,
          cash_value_classification: "process_value",
          value_model_kind: "property_tax_valuation_formula",
          human_review_required: true,
          repair_status: "non_monetary_workflow",
          calculation_status: "calculable_with_missing_inputs",
          tax_package_repair: {
            display_recommendation: {
              estimateStatus: "needs_property_tax_profile",
              label: "Rhode Island renewable property-tax valuation workflow"
            }
          }
        }
      }
    ],
    input_requirements: [
      "ac_nameplate_capacity_kw",
      "tangible_property_applicable",
      "real_property_applicable",
      "counterfactual_ordinary_annual_property_tax_cents"
    ].map((inputKey) => ({
      input_key: inputKey,
      label: inputKey,
      value_type: "text",
      required_for: ["effect_property_tax_valuation"],
      source_precedence: ["property_tax_profile"],
      missing_severity: "blocks_calculation"
    }))
  };
}
