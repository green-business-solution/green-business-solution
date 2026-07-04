import { describe, expect, it } from "vitest";
import { calculateIncentiveAward } from "../incentives.mjs";
import {
  calculateV2IncentivePackage,
  convertLegacyIncentiveRuleToV2,
  validateIncentiveCalculationPackageV2
} from "../incentiveCalculationsV2.mjs";
import { buildV2ResolvedRuntimeContext } from "../v2InputResolution.mjs";

function baseCtx(overrides = {}) {
  const { answers: answerOverrides = {}, ...rest } = overrides;
  return {
    answers: {
      unit_count: { value: 3 },
      system_kw: { value: 7 },
      project_cost_cents: { value: 100000 },
      selected_measures: { value: [] },
      electric_customer: { value: true },
      ...answerOverrides
    },
    billLines: {},
    billLineDeltas: [{ canonicalField: "annual_kwh_delta", deltaValue: -1200 }],
    baseCostLedgerEntries: [
      { category: "equipment_cost", amountCents: 70000 },
      { category: "installation_labor", amountCents: 30000 }
    ],
    baseRecurringSavingsEntries: [],
    upfrontCostCents: 100000,
    ...rest
  };
}

function legacyRule(overrides = {}) {
  return {
    id: "oir_legacy_test_v1",
    opportunityId: "opp_legacy_test",
    name: "Legacy Test Incentive",
    incentiveType: "fixed_per_unit_rebate",
    timing: "upfront",
    amountRule: { kind: "fixed_amount", amountCents: 0 },
    basisPolicy: { basis: "gross_project_cost", applicationOrder: 10 },
    active: true,
    confidence: "high",
    ...overrides
  };
}

function compareLegacyToV2(rule, ctx = baseCtx()) {
  const v1Award = calculateIncentiveAward(rule, ctx);
  const pkg = convertLegacyIncentiveRuleToV2(rule);
  const validation = validateIncentiveCalculationPackageV2(pkg);
  const v2Result = calculateV2IncentivePackage(pkg, ctx);
  return { v1Award, pkg, validation, v2Result };
}

describe("incentive calculation v2", () => {
  it("validates converted legacy packages", () => {
    const pkg = convertLegacyIncentiveRuleToV2(legacyRule({ amountRule: { kind: "fixed_amount", amountCents: 12345 } }));
    expect(validateIncentiveCalculationPackageV2(pkg)).toEqual({ valid: true, errors: [] });
  });

  it("preserves known simple fixed amount behavior during migration", () => {
    const { v1Award, v2Result } = compareLegacyToV2(
      legacyRule({ amountRule: { kind: "fixed_amount", amountCents: 12345 } })
    );

    expect(v2Result.totals.expectedOneTimeSavingsCents).toBe(v1Award.amountCents);
    expect(v2Result.totals.expectedOneTimeSavingsCents).toBe(12345);
  });

  it("preserves known simple per-unit behavior including legacy maxUnits", () => {
    const { v1Award, v2Result } = compareLegacyToV2(
      legacyRule({
        amountRule: { kind: "fixed_per_unit", amountCentsPerUnit: 5000, unitAnswerKey: "unit_count" },
        cap: { maxUnits: 2 }
      })
    );

    expect(v1Award.amountCents).toBe(10000);
    expect(v2Result.totals.expectedOneTimeSavingsCents).toBe(v1Award.amountCents);
  });

  it("preserves known simple percent-of-basis behavior", () => {
    const { v1Award, v2Result } = compareLegacyToV2(
      legacyRule({
        incentiveType: "percent_project_cost_rebate",
        amountRule: { kind: "percent_of_basis", percent: 0.25 },
        cap: { maxAmountCents: 20000 }
      })
    );

    expect(v1Award.amountCents).toBe(20000);
    expect(v2Result.totals.expectedOneTimeSavingsCents).toBe(v1Award.amountCents);
  });

  it("preserves known simple per-kW and per-kWh behavior", () => {
    const perKw = compareLegacyToV2(
      legacyRule({
        amountRule: { kind: "rate_per_kw", amountCentsPerKw: 10000, kwSource: "system_kw" }
      })
    );
    const perKwh = compareLegacyToV2(
      legacyRule({
        amountRule: { kind: "rate_per_kwh", amountCentsPerKwh: 25, kwhSource: "annual_kwh_delta_abs" }
      })
    );

    expect(perKw.v2Result.totals.expectedOneTimeSavingsCents).toBe(perKw.v1Award.amountCents);
    expect(perKw.v2Result.totals.expectedOneTimeSavingsCents).toBe(70000);
    expect(perKwh.v2Result.totals.expectedOneTimeSavingsCents).toBe(perKwh.v1Award.amountCents);
    expect(perKwh.v2Result.totals.expectedOneTimeSavingsCents).toBe(30000);
  });

  it("preserves known simple recurring bill credit behavior", () => {
    const { v1Award, v2Result } = compareLegacyToV2(
      legacyRule({
        incentiveType: "recurring_bill_credit",
        timing: "monthly",
        amountRule: { kind: "fixed_amount", amountCents: 2000 }
      })
    );

    expect(v1Award.recurringSavingsEntry.annualizedAmountCents).toBe(24000);
    expect(v2Result.totals.expectedRecurringSavingsAnnualCents).toBe(
      v1Award.recurringSavingsEntry.annualizedAmountCents
    );
  });

  it("suppresses legacy possible grant money without probability evidence", () => {
    const { v1Award, v2Result } = compareLegacyToV2(
      legacyRule({
        incentiveType: "possible_grant",
        amountRule: { kind: "percent_of_basis", percent: 0.8 }
      })
    );

    expect(v1Award.upfrontSavingsEntry.kind).toBe("possible_grant");
    expect(v2Result.totals.expectedOneTimeSavingsCents).toBe(0);
    expect(v1Award.amountCents).toBe(0);
    expect(v2Result.totals.expectedGrantAmountCents).toBe(0);
    expect(v2Result.effectResults[0].grantEstimate.computedEstimate.estimateStatus).toBe("suppressed");
  });

  it("calculates a measure catalog with customer filter and annual household limit", () => {
    const pkg = consumersEnergyAirPurifierPackage();
    const one = calculateV2IncentivePackage(
      pkg,
      baseCtx({ answers: { selected_measures: { value: [{ measure_id: "air_purifier", quantity: 1 }] } } })
    );
    const two = calculateV2IncentivePackage(
      pkg,
      baseCtx({ answers: { selected_measures: { value: [{ measure_id: "air_purifier", quantity: 2 }] } } })
    );
    const three = calculateV2IncentivePackage(
      pkg,
      baseCtx({ answers: { selected_measures: { value: [{ measure_id: "air_purifier", quantity: 3 }] } } })
    );

    expect(validateIncentiveCalculationPackageV2(pkg)).toEqual({ valid: true, errors: [] });
    expect(one.totals.expectedOneTimeSavingsCents).toBe(5000);
    expect(two.totals.expectedOneTimeSavingsCents).toBe(10000);
    expect(three.totals.expectedOneTimeSavingsCents).toBe(10000);
  });

  it("returns missing inputs for a measure catalog when no selected measures are supplied", () => {
    const result = calculateV2IncentivePackage(
      consumersEnergyAirPurifierPackage(),
      baseCtx({ answers: { selected_measures: undefined } })
    );

    expect(result.totals.expectedOneTimeSavingsCents).toBe(0);
    expect(result.missingInputs).toEqual([
      { inputKey: "selected_measures", effectId: "effect_air_purifier_rebate", label: "Selected appliance measures" }
    ]);
  });

  it("does not calculate fixed amounts when blocking v2 project inputs are missing", () => {
    const pkg = fixedAmountWithBlockingInputsPackage();
    const missing = calculateV2IncentivePackage(pkg, baseCtx({ answers: { charger_is_smart: undefined } }));
    const complete = calculateV2IncentivePackage(
      pkg,
      baseCtx({ answers: { charger_is_smart: { value: true } } })
    );

    expect(missing.totals.expectedOneTimeSavingsCents).toBe(0);
    expect(missing.missingInputs).toEqual([{ inputKey: "charger_is_smart", effectId: "effect_smart_charger_rebate", label: "Smart charger" }]);
    expect(complete.totals.expectedOneTimeSavingsCents).toBe(25000);
  });

  it("calculates expected-value grants only when probability and conditional award are present", () => {
    const pkg = expectedValueGrantPackage();
    const result = calculateV2IncentivePackage(pkg, baseCtx());

    expect(result.totals.expectedGrantAmountCents).toBe(3000000);
    expect(result.effectResults[0].amountCents).toBe(3000000);
  });

  it("calculates a conservative matched rate-table row from runtime inputs", () => {
    const result = calculateV2IncentivePackage(
      rateTablePackage(),
      baseCtx({
        answers: {
          fuel_type: { value: "electric" },
          project_type: { value: "retrofit" },
          annual_kwh_savings: { value: 2000 }
        }
      })
    );

    expect(result.totals.expectedOneTimeSavingsCents).toBe(20000);
    expect(result.effectResults[0].trace.join(" ")).toContain("selected conservative matched row");
  });

  it("calculates tax-exempt liability expressions from confirmed eligible taxes", () => {
    const result = calculateV2IncentivePackage(
      expressionPackage({
        expressionId: "tax_exempt_liability",
        effectType: "tax_exemption",
        requiredInputs: [
          "approved_rerz_designation",
          "qualified_company_operations",
          "company_current_on_state_and_local_taxes",
          "phaseout_multiplier",
          "eligible_state_education_tax_cents",
          "eligible_real_property_tax_cents",
          "eligible_personal_property_tax_cents",
          "eligible_local_income_tax_cents"
        ]
      }),
      baseCtx({
        answers: {
          approved_rerz_designation: { value: true },
          qualified_company_operations: { value: true },
          company_current_on_state_and_local_taxes: { value: true },
          phaseout_multiplier: { value: 0.75 },
          eligible_state_education_tax_cents: { value: 10000 },
          eligible_real_property_tax_cents: { value: 20000 },
          eligible_personal_property_tax_cents: { value: 30000 },
          eligible_local_income_tax_cents: { value: 40000 }
        }
      })
    );

    expect(result.totals.expectedOneTimeSavingsCents).toBe(75000);
    expect(result.effectResults[0].trace.join(" ")).toContain("Eligible tax liability 100000 cents");
  });

  it("calculates tax-rate difference expressions using the source-backed preferential rate", () => {
    const result = calculateV2IncentivePackage(
      expressionPackage({
        expressionId: "tax_rate_difference",
        effectType: "tax_rate_preference",
        calculation: { preferential_solar_b_and_o_rate_decimal: 0.00275 },
        requiredInputs: [
          "annual_tax_performance_report_filed",
          "qualifying_tax_base_after_deductions_and_matc_cents",
          "otherwise_applicable_b_and_o_rate_decimal"
        ]
      }),
      baseCtx({
        answers: {
          annual_tax_performance_report_filed: { value: true },
          qualifying_tax_base_after_deductions_and_matc_cents: { value: 10000000 },
          otherwise_applicable_b_and_o_rate_decimal: { value: 0.00484 }
        }
      })
    );

    expect(result.totals.expectedOneTimeSavingsCents).toBe(20900);
    expect(result.effectResults[0].trace.join(" ")).toContain("rate difference 0.00484 - 0.00275");
  });

  it("derives Washington ordinary B&O comparison rate after activity classification is known", () => {
    const pkg = expressionPackage({
      expressionId: "tax_rate_difference",
      effectType: "tax_rate_preference",
      calculation: { preferential_solar_b_and_o_rate_decimal: 0.00275 },
      requiredInputs: [
        "annual_tax_performance_report_filed",
        "qualifying_tax_base_after_deductions_and_matc_cents",
        "business_activity_classification",
        "otherwise_applicable_b_and_o_rate_decimal"
      ]
    });
    pkg.opportunity_id = "SOURCE_DSIRE:dsire_program_id:381";

    const ctx = buildV2ResolvedRuntimeContext(
      baseCtx({
        calculationDate: "2026-07-02",
        answers: {
          annual_tax_performance_report_filed: { value: true },
          qualifying_tax_base_after_deductions_and_matc_cents: { value: 10000000 },
          business_activity_classification: { value: "qualifying_solar_manufacturing" },
          tax_period_start_date: { value: "2026-07-01" }
        }
      }),
      [pkg]
    );
    const result = calculateV2IncentivePackage(pkg, ctx);

    expect(ctx.answers.otherwise_applicable_b_and_o_rate_decimal).toMatchObject({
      value: 0.00484,
      source: "derived_washington_bo_rate_schedule",
      userOverrideAllowed: true
    });
    expect(result.missingInputs).toEqual([]);
    expect(result.totals.expectedOneTimeSavingsCents).toBe(20900);
  });

  it("calculates property-tax valuation expressions as a recurring workflow amount", () => {
    const result = calculateV2IncentivePackage(
      expressionPackage({
        expressionId: "property_tax_valuation_formula",
        effectType: "property_tax_valuation",
        timing: { cadence: "annual" },
        requiredInputs: [
          "ac_kw_capacity",
          "tangible_property_applicable",
          "real_property_applicable",
          "counterfactual_ordinary_annual_property_tax_cents"
        ]
      }),
      baseCtx({
        answers: {
          ac_kw_capacity: { value: 100 },
          tangible_property_applicable: { value: true },
          real_property_applicable: { value: true },
          counterfactual_ordinary_annual_property_tax_cents: { value: 100000 }
        }
      })
    );

    expect(result.totals.expectedRecurringSavingsAnnualCents).toBe(15000);
    expect(result.effectResults[0].trace.join(" ")).toContain("Statutory renewable property tax value 85000 cents");
  });

  it("does not estimate property-tax valuation savings without counterfactual tax evidence", () => {
    const result = calculateV2IncentivePackage(
      expressionPackage({
        expressionId: "property_tax_valuation_formula",
        effectType: "property_tax_valuation",
        timing: { cadence: "annual" },
        requiredInputs: [
          "ac_kw_capacity",
          "tangible_property_applicable",
          "real_property_applicable"
        ]
      }),
      baseCtx({
        answers: {
          ac_kw_capacity: { value: 100 },
          tangible_property_applicable: { value: true },
          real_property_applicable: { value: true }
        }
      })
    );

    expect(result.totals.expectedRecurringSavingsAnnualCents).toBe(0);
    expect(result.missingInputs).toEqual([
      {
        inputKey: "counterfactual_ordinary_annual_property_tax_cents",
        effectId: "effect_property_tax_valuation_formula"
      }
    ]);
  });

  it("resolves tax geography inputs from site geography before v2 tax package calculation", () => {
    const pkg = expressionPackage({
      expressionId: "property_tax_valuation_formula",
      effectType: "recurring_savings",
      timing: { cadence: "annual" },
      requiredInputs: [
        "ac_kw_capacity",
        "municipality",
        "tangible_property_applicable",
        "real_property_applicable",
        "counterfactual_ordinary_annual_property_tax_cents"
      ]
    });
    const ctx = buildV2ResolvedRuntimeContext(
      baseCtx({
        geography: {
          country: "US",
          stateCode: "RI",
          countyFips: "44007",
          placeGeoid: "4459000",
          placeName: "Providence city"
        },
        answers: {
          ac_kw_capacity: { value: 100 },
          tangible_property_applicable: { value: true },
          real_property_applicable: { value: true },
          counterfactual_ordinary_annual_property_tax_cents: { value: 100000 }
        }
      }),
      [pkg]
    );
    const result = calculateV2IncentivePackage(pkg, ctx);

    expect(ctx.answers.municipality).toMatchObject({
      value: "Providence city",
      source: "address_geography",
      defaultIsPlaceholder: false
    });
    expect(ctx.answers.ac_nameplate_capacity_kw).toMatchObject({
      value: 100,
      canonicalInputKey: "system_kw"
    });
    expect(result.missingInputs).toEqual([]);
    expect(result.totals.expectedRecurringSavingsAnnualCents).toBe(15000);
  });

  it("resolves tax profile and opportunity-specific inputs into v2 tax calculations", () => {
    const pkg = expressionPackage({
      expressionId: "tax_exempt_liability",
      effectType: "tax_exemption",
      requiredInputs: [
        "approved_rerz_designation",
        "qualified_company_operations",
        "company_current_on_state_and_local_taxes",
        "phaseout_multiplier",
        "eligible_state_education_tax_cents",
        "eligible_real_property_tax_cents",
        "eligible_personal_property_tax_cents",
        "eligible_local_income_tax_cents"
      ]
    });
    pkg.opportunity_id = "SOURCE_DSIRE:dsire_program_id:3216";

    const ctx = buildV2ResolvedRuntimeContext(
      baseCtx({
        taxProfileFacts: [
          { inputKey: "company_current_on_state_and_local_taxes", value: true, sourceStrategy: "accountant_review" },
          { inputKey: "eligible_state_education_tax_cents", value: 1000, sourceStrategy: "synthetic_tax_document" },
          { inputKey: "eligible_real_property_tax_cents", value: 2000, sourceStrategy: "synthetic_tax_document" },
          { inputKey: "eligible_personal_property_tax_cents", value: 3000, sourceStrategy: "synthetic_tax_document" },
          { inputKey: "eligible_local_income_tax_cents", value: 4000, sourceStrategy: "synthetic_tax_document" }
        ],
        taxOpportunitySpecificInputs: [
          {
            opportunityId: "SOURCE_DSIRE:dsire_program_id:3216",
            inputKey: "approved_rerz_designation",
            value: true,
            sourceStrategy: "synthetic_tax_document"
          },
          {
            opportunityId: "SOURCE_DSIRE:dsire_program_id:3216",
            inputKey: "qualified_company_operations",
            value: true,
            sourceStrategy: "synthetic_tax_document"
          },
          {
            opportunityId: "SOURCE_DSIRE:dsire_program_id:3216",
            inputKey: "phaseout_multiplier",
            value: 0.75,
            sourceStrategy: "synthetic_tax_document"
          }
        ]
      }),
      [pkg]
    );
    const result = calculateV2IncentivePackage(pkg, ctx);

    expect(ctx.answers.approved_rerz_designation.source).toBe("tax_opportunity_input");
    expect(ctx.answers.eligible_real_property_tax_cents.source).toBe("tax_profile_fact");
    expect(result.missingInputs).toEqual([]);
    expect(result.totals.expectedOneTimeSavingsCents).toBe(7500);
  });

  it("derives Michigan Renaissance Zone phaseout multiplier from approved term and program year", () => {
    const pkg = expressionPackage({
      expressionId: "tax_exempt_liability",
      effectType: "tax_exemption",
      requiredInputs: [
        "approved_rerz_designation",
        "qualified_company_operations",
        "company_current_on_state_and_local_taxes",
        "approved_zone_term_years",
        "program_year",
        "phaseout_multiplier",
        "eligible_state_education_tax_cents",
        "eligible_real_property_tax_cents",
        "eligible_personal_property_tax_cents",
        "eligible_local_income_tax_cents"
      ]
    });
    pkg.opportunity_id = "SOURCE_DSIRE:dsire_program_id:3216";

    const ctx = buildV2ResolvedRuntimeContext(
      baseCtx({
        answers: {
          approved_rerz_designation: { value: true },
          qualified_company_operations: { value: true },
          company_current_on_state_and_local_taxes: { value: true },
          approved_zone_term_years: { value: 15 },
          program_year: { value: 14 },
          eligible_state_education_tax_cents: { value: 10000 },
          eligible_real_property_tax_cents: { value: 20000 },
          eligible_personal_property_tax_cents: { value: 30000 },
          eligible_local_income_tax_cents: { value: 40000 }
        }
      }),
      [pkg]
    );
    const result = calculateV2IncentivePackage(pkg, ctx);

    expect(ctx.answers.phaseout_multiplier).toMatchObject({
      value: 0.5,
      source: "derived_michigan_rerz_phaseout_schedule",
      userOverrideAllowed: true
    });
    expect(result.missingInputs).toEqual([]);
    expect(result.totals.expectedOneTimeSavingsCents).toBe(50000);
  });

  it("uses opportunity-specific AC nameplate capacity before generic system kW for property-tax valuation", () => {
    const pkg = expressionPackage({
      expressionId: "property_tax_valuation_formula",
      effectType: "property_tax_valuation",
      timing: { cadence: "annual" },
      requiredInputs: [
        "ac_nameplate_capacity_kw",
        "tangible_property_applicable",
        "real_property_applicable",
        "counterfactual_ordinary_annual_property_tax_cents"
      ]
    });
    pkg.opportunity_id = "SOURCE_DSIRE:dsire_program_id:22798";

    const ctx = buildV2ResolvedRuntimeContext(
      baseCtx({
        answers: {
          system_kw: { value: 64 }
        },
        taxOpportunitySpecificInputs: [
          {
            opportunityId: "SOURCE_DSIRE:dsire_program_id:22798",
            inputKey: "ac_nameplate_capacity_kw",
            value: 375,
            sourceStrategy: "synthetic_engineering_summary"
          },
          {
            opportunityId: "SOURCE_DSIRE:dsire_program_id:22798",
            inputKey: "tangible_property_applicable",
            value: true,
            sourceStrategy: "synthetic_assessor_review"
          },
          {
            opportunityId: "SOURCE_DSIRE:dsire_program_id:22798",
            inputKey: "real_property_applicable",
            value: true,
            sourceStrategy: "synthetic_assessor_review"
          },
          {
            opportunityId: "SOURCE_DSIRE:dsire_program_id:22798",
            inputKey: "counterfactual_ordinary_annual_property_tax_cents",
            value: 1413270,
            sourceStrategy: "synthetic_tax_document"
          }
        ]
      }),
      [pkg]
    );
    const result = calculateV2IncentivePackage(pkg, ctx);

    expect(ctx.answers.ac_nameplate_capacity_kw).toMatchObject({
      value: 375,
      source: "tax_opportunity_input"
    });
    expect(ctx.answers.system_kw).toMatchObject({ value: 64 });
    expect(result.missingInputs).toEqual([]);
    expect(result.totals.expectedRecurringSavingsAnnualCents).toBe(1094520);
  });

  it("resolves grant profile inputs by matched opportunity and current retrofit without overriding user answers", () => {
    const ctx = buildV2ResolvedRuntimeContext(
      {
        answers: {
          eligible_project_cost_cents: { value: 123456 }
        },
        retrofitTypeId: "led_lighting_retrofit",
        grantContext: {
          grantProfileFacts: [
            { inputKey: "organization_is_nonprofit_501c3", value: true, sourceStrategy: "existing_test_case" }
          ],
          grantRetrofitProjectInputs: [
            {
              retrofitTypeId: "led_lighting_retrofit",
              inputFacts: [
                { inputKey: "fixture_count", value: 42, sourceStrategy: "synthetic_realistic_default" },
                { inputKey: "lighting_project_scope_confirmed", value: true, sourceStrategy: "synthetic_realistic_default" }
              ]
            },
            {
              retrofitTypeId: "heat_pump_hvac_retrofit",
              inputFacts: [
                { inputKey: "excluded_retrofit_specific_input", value: true, sourceStrategy: "synthetic_realistic_default" }
              ]
            }
          ],
          grantOpportunitySpecificInputs: [
            {
              opportunityId: "opp_grant_a",
              expectedHandling: "calculate_if_formula_ready",
              inputFacts: [
                { inputKey: "eligible_project_cost_cents", value: 500000, sourceStrategy: "synthetic_quote_estimate" },
                { inputKey: "grant_application_status", value: "not_started", sourceStrategy: "synthetic_realistic_default" }
              ]
            },
            {
              opportunityId: "opp_grant_b",
              inputFacts: [
                { inputKey: "ignored_opportunity_marker", value: true, sourceStrategy: "synthetic_realistic_default" }
              ]
            }
          ]
        }
      },
      [{ opportunity_id: "opp_grant_a" }]
    );

    expect(ctx.answers.eligible_project_cost_cents).toMatchObject({ value: 123456 });
    expect(ctx.answers.fixture_count).toMatchObject({
      value: 42,
      source: "grant_retrofit_project_input",
      retrofitTypeId: "led_lighting_retrofit"
    });
    expect(ctx.answers.grant_application_status).toMatchObject({
      value: "not_started",
      source: "grant_opportunity_input",
      grantOpportunityId: "opp_grant_a",
      estimateStatusIfUsed: "calculate_if_formula_ready"
    });
    expect(ctx.answers.organization_is_nonprofit_501c3).toMatchObject({
      value: true,
      source: "grant_profile_fact"
    });
    expect(ctx.answers.excluded_retrofit_specific_input).toBeUndefined();
    expect(ctx.answers.ignored_opportunity_marker).toBeUndefined();
  });

  it("short-circuits disqualified tax workflows to zero before requiring downstream tax documents", () => {
    const result = calculateV2IncentivePackage(
      expressionPackage({
        expressionId: "tax_exempt_liability",
        effectType: "tax_exemption",
        requiredInputs: [
          "approved_rerz_designation",
          "qualified_company_operations",
          "parcel_or_facility_within_approved_zone_boundary",
          "approved_zone_legal_description_and_maps",
          "eligible_real_property_tax_cents"
        ]
      }),
      baseCtx({
        answers: {
          approved_rerz_designation: { value: true },
          qualified_company_operations: { value: true },
          parcel_or_facility_within_approved_zone_boundary: { value: false }
        }
      })
    );

    expect(result.missingInputs).toEqual([]);
    expect(result.totals.expectedOneTimeSavingsCents).toBe(0);
    expect(result.effectResults[0].trace.join(" ")).toContain("Facility inside approved zone boundary is not confirmed");
  });
});

function consumersEnergyAirPurifierPackage() {
  return {
    schema_version: "2.0.0",
    opportunity_id: "opp_consumers_energy_air_purifier",
    program_name: "Consumers Energy Residential Appliance Rebates",
    calculation_status: "calculable_with_missing_inputs",
    availability: { status: "active", source_access_status: "accessible" },
    customer_segments: ["residential"],
    retrofit_types: ["air_purifier"],
    geography: { country: "US", states: ["MI"], counties: [], cities: [], utility_territory_required: true },
    measure_catalogs: [
      {
        catalog_id: "consumers_energy_appliance_catalog",
        name: "Consumers Energy appliance rebates",
        selection_input: "selected_measures",
        measures: [
          {
            measure_id: "air_purifier",
            name: "Air purifier",
            category: "appliance",
            customer_filters: [{ input_key: "electric_customer", operator: "equals", value: true }],
            calculation: { method: "fixed_amount", amount: { value: 50, currency: "USD" } },
            limits: [
              {
                scope: "household",
                period: "calendar_year",
                max_count: 2,
                applies_to_measure_ids: ["air_purifier"],
                evidence_refs: ["ev_air_purifier_limit"]
              }
            ],
            required_inputs: [],
            evidence_refs: ["ev_air_purifier_row"],
            confidence: { overall: 0.94, calculation: 0.98, extraction: 0.94, reason_codes: ["published_measure_catalog"] }
          }
        ]
      }
    ],
    rate_tables: [],
    effects: [
      {
        effect_id: "effect_air_purifier_rebate",
        label: "Air purifier rebate",
        effect_type: "one_time_savings",
        cash_flow_direction: "benefit",
        timing: { cadence: "one_time" },
        calculation: {
          method: "measure_catalog",
          measure_catalog_id: "consumers_energy_appliance_catalog",
          measure_selection_input: "selected_measures"
        },
        required_inputs: [
          {
            input_key: "selected_measures",
            label: "Selected appliance measures",
            value_type: "array",
            required_for: ["effect_air_purifier_rebate"],
            source_precedence: ["equipment_selection", "user_profile"],
            missing_severity: "blocks_calculation"
          }
        ],
        evidence_refs: ["ev_air_purifier_row"],
        confidence: { overall: 0.92, calculation: 0.95, reason_codes: ["published_measure_catalog"] }
      }
    ],
    global_limits: [],
    global_caps: [],
    stacking: { behavior: "unknown_requires_review" },
    input_requirements: [
      {
        input_key: "selected_measures",
        label: "Selected appliance measures",
        value_type: "array",
        required_for: ["effect_air_purifier_rebate"],
        source_precedence: ["equipment_selection", "user_profile"],
        missing_severity: "blocks_calculation"
      }
    ],
    assumptions: [],
    source_evidence: [
      {
        evidence_id: "ev_air_purifier_row",
        source_type: "web_page",
        quote: "$50 for Electric Customers Only",
        evidence_confidence: 0.95
      },
      {
        evidence_id: "ev_air_purifier_limit",
        source_type: "web_page",
        quote: "Limit two rebates per calendar year, per household.",
        evidence_confidence: 0.95
      }
    ],
    confidence: {
      overall: 0.91,
      source_access: 1,
      availability: 0.9,
      calculation: 0.95,
      extraction: 0.94,
      reason_codes: ["published_measure_catalog", "exact_published_amount"]
    }
  };
}

function fixedAmountWithBlockingInputsPackage() {
  return {
    schema_version: "2.0.0",
    opportunity_id: "opp_smart_charger",
    program_name: "Smart Charger Rebate",
    calculation_status: "calculable",
    availability: { status: "active", source_access_status: "accessible" },
    customer_segments: ["residential"],
    retrofit_types: ["level_2_ev_charger_installation"],
    geography: { country: "US", states: ["GA"], counties: [], cities: [], utility_territory_required: true },
    measure_catalogs: [],
    rate_tables: [],
    effects: [
      {
        effect_id: "effect_smart_charger_rebate",
        label: "Smart charger rebate",
        effect_type: "one_time_savings",
        cash_flow_direction: "benefit",
        timing: { cadence: "one_time" },
        calculation: { method: "fixed_amount", amount: { value: 250, currency: "USD" } },
        limits: [],
        caps: [],
        required_inputs: [
          {
            input_key: "charger_is_smart",
            label: "Smart charger",
            value_type: "boolean",
            required_for: ["effect_smart_charger_rebate"],
            source_precedence: ["quote"],
            missing_severity: "blocks_calculation"
          }
        ],
        evidence_refs: ["ev_smart"],
        confidence: { overall: 0.9, calculation: 0.9, reason_codes: ["fixed_amount"] }
      }
    ],
    global_limits: [],
    global_caps: [],
    stacking: { behavior: "unknown_requires_review" },
    input_requirements: [
      {
        input_key: "charger_is_smart",
        label: "Smart charger",
        value_type: "boolean",
        required_for: ["effect_smart_charger_rebate"],
        source_precedence: ["quote"],
        missing_severity: "blocks_calculation"
      }
    ],
    assumptions: [],
    source_evidence: [{ evidence_id: "ev_smart", source_type: "web_page", quote: "$250 smart charger rebate", evidence_confidence: 0.95 }],
    confidence: { overall: 0.9, source_access: 0.9, availability: 0.9, calculation: 0.9, extraction: 0.9, reason_codes: ["fixed_amount"] }
  };
}

function expectedValueGrantPackage() {
  return {
    schema_version: "2.0.0",
    opportunity_id: "opp_competitive_grant",
    program_name: "Competitive Grant",
    calculation_status: "calculable",
    availability: { status: "active", source_access_status: "accessible" },
    customer_segments: ["commercial"],
    retrofit_types: ["led_lighting_retrofit"],
    geography: { country: "US", states: ["CA"], counties: [], cities: [], utility_territory_required: false },
    measure_catalogs: [],
    rate_tables: [],
    effects: [
      {
        effect_id: "effect_expected_grant",
        label: "Expected grant value",
        effect_type: "grant_expected_value",
        cash_flow_direction: "benefit",
        timing: { cadence: "one_time" },
        calculation: {
          method: "expected_value",
          conditional_award_cents: 30000000,
          probability_discount: 0.1
        },
        limits: [],
        caps: [],
        required_inputs: [],
        evidence_refs: ["ev_expected_grant"],
        confidence: { overall: 0.72, calculation: 0.72, reason_codes: ["historical_success_rate"] }
      }
    ],
    global_limits: [],
    global_caps: [],
    stacking: { behavior: "unknown_requires_review" },
    input_requirements: [],
    assumptions: [],
    source_evidence: [{ evidence_id: "ev_expected_grant", source_type: "web_page", quote: "30 awards from 300 applications", evidence_confidence: 0.9 }],
    confidence: { overall: 0.72, source_access: 0.9, availability: 0.9, calculation: 0.72, extraction: 0.9, reason_codes: ["expected_value"] }
  };
}

function rateTablePackage() {
  return {
    schema_version: "2.0.0",
    opportunity_id: "opp_rate_table",
    program_name: "Rate Table Rebate",
    calculation_status: "calculable_with_missing_inputs",
    availability: { status: "active", source_access_status: "accessible" },
    customer_segments: ["commercial"],
    retrofit_types: ["led_lighting_retrofit"],
    geography: { country: "US", states: ["NY"], counties: [], cities: [], utility_territory_required: true },
    measure_catalogs: [],
    rate_tables: [
      {
        table_id: "custom_rates",
        name: "Custom Rates",
        dimensions: ["fuel", "project_type"],
        rows: [
          { fuel: "electric", project_type: "retrofit", rateCents: 10, unit: "kWh_saved" },
          { fuel: "electric", project_type: "new_construction", rateCents: 15, unit: "kWh_saved" },
          { fuel: "natural_gas", project_type: "retrofit", rateCents: 200, unit: "therm_saved" }
        ]
      }
    ],
    effects: [
      {
        effect_id: "effect_rate_table",
        label: "Custom kWh incentive",
        effect_type: "one_time_savings",
        cash_flow_direction: "benefit",
        timing: { cadence: "one_time" },
        calculation: { method: "rate_table", rate_table_id: "custom_rates", lookup_inputs: ["fuel", "project_type"] },
        limits: [],
        caps: [],
        required_inputs: [
          {
            input_key: "fuel_type",
            label: "Fuel type",
            value_type: "text",
            required_for: ["effect_rate_table"],
            source_precedence: ["user_profile"],
            missing_severity: "blocks_calculation"
          },
          {
            input_key: "project_type",
            label: "Project type",
            value_type: "text",
            required_for: ["effect_rate_table"],
            source_precedence: ["user_profile"],
            missing_severity: "blocks_calculation"
          },
          {
            input_key: "annual_kwh_savings",
            label: "Annual kWh savings",
            value_type: "number",
            required_for: ["effect_rate_table"],
            source_precedence: ["utility_data"],
            missing_severity: "blocks_calculation"
          }
        ],
        evidence_refs: ["ev_rate"],
        confidence: { overall: 0.9, calculation: 0.9, extraction: 0.9, reason_codes: ["rate_table"] }
      }
    ],
    global_limits: [],
    global_caps: [],
    stacking: { behavior: "unknown_requires_review" },
    input_requirements: [],
    assumptions: [],
    source_evidence: [{ evidence_id: "ev_rate", source_type: "web_page", quote: "$0.10/kWh saved", evidence_confidence: 0.9 }],
    confidence: { overall: 0.9, source_access: 0.9, availability: 0.9, calculation: 0.9, extraction: 0.9, reason_codes: ["rate_table"] }
  };
}

function expressionPackage({ expressionId, effectType, timing = { cadence: "one_time" }, calculation = {}, requiredInputs = [] }) {
  const effect = {
    effect_id: `effect_${expressionId}`,
    label: `${expressionId} expression`,
    effect_type: effectType,
    cash_flow_direction: "benefit",
    timing,
    calculation: {
      method: "expression",
      expression_id: expressionId,
      ...calculation
    },
    limits: [],
    caps: [],
    required_inputs: requiredInputs.map((inputKey) => ({
      input_key: inputKey,
      label: inputKey,
      value_type: "text",
      required_for: [`effect_${expressionId}`],
      source_precedence: ["user_profile"],
      missing_severity: "blocks_calculation"
    })),
    evidence_refs: ["expression_source"],
    confidence: { overall: 0.9, calculation: 0.9, extraction: 0.9, reason_codes: ["expression_test"] }
  };

  return {
    schema_version: "2.0.0",
    opportunity_id: `opp_${expressionId}`,
    program_name: `${expressionId} program`,
    calculation_status: "calculable_with_missing_inputs",
    availability: { status: "active", source_access_status: "accessible" },
    customer_segments: ["commercial"],
    retrofit_types: ["tax_or_special_workflow"],
    geography: { country: "US", states: [], counties: [], cities: [], utility_territory_required: false },
    measure_catalogs: [],
    rate_tables: [],
    effects: [effect],
    global_limits: [],
    global_caps: [],
    stacking: { behavior: "unknown_requires_review" },
    input_requirements: effect.required_inputs,
    assumptions: [],
    source_evidence: [{ evidence_id: "expression_source", source_type: "web_page", quote: "Expression source", evidence_confidence: 0.9 }],
    confidence: { overall: 0.9, source_access: 0.9, availability: 0.9, calculation: 0.9, extraction: 0.9, reason_codes: ["expression_test"] }
  };
}
