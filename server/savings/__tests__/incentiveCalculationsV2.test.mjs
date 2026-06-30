import { describe, expect, it } from "vitest";
import { calculateIncentiveAward } from "../incentives.mjs";
import {
  calculateV2IncentivePackage,
  convertLegacyIncentiveRuleToV2,
  validateIncentiveCalculationPackageV2
} from "../incentiveCalculationsV2.mjs";

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

  it("maps legacy possible grant money into expected grant amount instead of upfront savings", () => {
    const { v1Award, v2Result } = compareLegacyToV2(
      legacyRule({
        incentiveType: "possible_grant",
        amountRule: { kind: "percent_of_basis", percent: 0.8 }
      })
    );

    expect(v1Award.upfrontSavingsEntry.kind).toBe("possible_grant");
    expect(v2Result.totals.expectedOneTimeSavingsCents).toBe(0);
    expect(v2Result.totals.expectedGrantAmountCents).toBe(v1Award.amountCents);
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
    expect(result.missingInputs).toEqual([{ inputKey: "selected_measures", effectId: "effect_air_purifier_rebate" }]);
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
