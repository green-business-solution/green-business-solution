import { describe, expect, it } from "vitest";
import {
  THREE_YEAR_FINANCIAL_VALUE_HORIZON_YEARS,
  THREE_YEAR_FINANCIAL_VALUE_METRIC,
  THREE_YEAR_FINANCIAL_VALUE_MODEL_VERSION,
  THREE_YEAR_FINANCIAL_VALUE_SCHEMA_VERSION,
  buildThreeYearFinancialValue
} from "../threeYearFinancialValue.mjs";

function baseEstimate(overrides = {}) {
  return {
    selectedIncentiveScenario: {
      id: "scenario_selected",
      opportunityIds: [],
      opportunityCount: 0,
      incentiveRuleIds: [],
      upfrontSavingsEntries: [],
      recurringSavingsEntries: [],
      capExplanations: []
    },
    alternativeScenarios: [],
    ...overrides
  };
}

function fixture(opportunities = []) {
  return {
    retrofitTypeId: "high_efficiency_hvac_retrofit",
    opportunities,
    opportunityCount: opportunities.length
  };
}

describe("buildThreeYearFinancialValue", () => {
  it("builds required v1 contract fields and near-guaranteed ranges", () => {
    const estimate = baseEstimate({
      oneTimeSavingsCents: 1200,
      netAnnualRecurringSavingsCents: 10000,
      selectedIncentiveScenario: {
        id: "s1",
        opportunityIds: ["opp-near"],
        opportunityCount: 1,
        upfrontSavingsEntries: [
          {
            kind: "upfront_savings",
            opportunityId: "opp-near",
            amountCents: 500,
            formula: "fixed_amount",
            incentiveRuleId: "rule-near"
          }
        ],
        recurringSavingsEntries: [
          {
            kind: "recurring_savings",
            opportunityId: "opp-near",
            amountCents: 200,
            period: "annual",
            formula: "incentive_rule",
            incentiveRuleId: "rule-recurring"
          }
        ]
      },
      opportunities: [{ opportunityId: "opp-near", awardLikelihood: "near_guaranteed", requiresProgramApproval: true }]
    });

    const result = buildThreeYearFinancialValue({
      retrofitGroup: fixture(estimate.opportunities),
      estimate,
      normalizedProfile: { site: { squareFootage: { value: 8000 } } }
    });

    expect(result.schemaVersion).toBe(THREE_YEAR_FINANCIAL_VALUE_SCHEMA_VERSION);
    expect(result.modelVersion).toBe(THREE_YEAR_FINANCIAL_VALUE_MODEL_VERSION);
    expect(result.metric).toBe(THREE_YEAR_FINANCIAL_VALUE_METRIC);
    expect(result.horizonYears).toBe(THREE_YEAR_FINANCIAL_VALUE_HORIZON_YEARS);
    expect(result.estimateStage).toBe("intro");
    expect(result.oneTimeContributionCents).toMatchObject({ minimum: 700, maximum: 700 });
    expect(result.recurringThreeYearContributionCents).toMatchObject({ minimum: 29400, maximum: 29400 });
    expect(result.nearGuaranteedContributionCents).toEqual({ minimum: 1100, maximum: 1100 });
    expect(result.opportunityBreakdown[0].awardLikelihood).toBe("near_guaranteed");
    expect(result.opportunityBreakdown[0].requiresProgramApproval).toBe(true);
    expect(result.minimumThreeYearFinancialValueCents).toBe(31200);
    expect(result.maximumThreeYearFinancialValueCents).toBe(31200);
  });

  it("supports non-guaranteed contributions with zero minimum and full signed maximum", () => {
    const estimate = baseEstimate({
      oneTimeSavingsCents: 1000,
      netAnnualRecurringSavingsCents: 300,
      selectedIncentiveScenario: {
        id: "s2",
        opportunityIds: ["opp-uncert"],
        opportunityCount: 1,
        upfrontSavingsEntries: [
          {
            kind: "upfront_savings",
            opportunityId: "opp-uncert",
            amountCents: -150,
            formula: "fixed_amount",
            incentiveRuleId: "rule-uncert"
          }
        ],
        recurringSavingsEntries: [
          {
            kind: "recurring_savings",
            opportunityId: "opp-uncert",
            amountCents: -80,
            period: "annual",
            formula: "incentive_rule",
            incentiveRuleId: "rule-uncert-recurring"
          }
        ]
      },
      opportunities: [{ opportunityId: "opp-uncert", awardLikelihood: "possible" }]
    });

    const result = buildThreeYearFinancialValue({
      retrofitGroup: fixture(estimate.opportunities),
      estimate,
      normalizedProfile: { site: { squareFootage: { value: 5000 } } }
    });

    expect(result.opportunityBreakdown[0].awardLikelihood).toBe("possible");
    expect(result.uncertainContributionMaximumCents.minimum).toBe(0);
    expect(result.uncertainContributionMaximumCents.maximum).toBeLessThan(0);
    expect(result.nearGuaranteedContributionCents).toEqual({ minimum: 0, maximum: 0 });
    expect(result.minimumThreeYearFinancialValueCents).toBe(2290);
    expect(result.maximumThreeYearFinancialValueCents).toBe(1900);
  });

  it.each(["likely", "possible", "unlikely", "unknown"])(
    "keeps quantified %s value out of the minimum and in the maximum",
    (awardLikelihood) => {
      const estimate = baseEstimate({
        oneTimeSavingsCents: 250,
        netAnnualRecurringSavingsCents: 0,
        selectedIncentiveScenario: {
          id: `scenario-${awardLikelihood}`,
          opportunityIds: ["opp-1"],
          opportunityCount: 1,
          upfrontSavingsEntries: [
            {
              kind: "upfront_savings",
              opportunityId: "opp-1",
              amountCents: 250,
              formula: "fixed_amount",
              incentiveRuleId: "rule-1"
            }
          ],
          recurringSavingsEntries: []
        },
        opportunities: [{ opportunityId: "opp-1", awardLikelihood }]
      });

      const result = buildThreeYearFinancialValue({
        retrofitGroup: fixture(estimate.opportunities),
        estimate
      });

      expect(result.opportunityBreakdown[0].oneTimeContributionCents).toEqual({ minimum: 0, maximum: 250 });
      expect(result.nearGuaranteedContributionCents).toEqual({ minimum: 0, maximum: 0 });
      expect(result.uncertainContributionMaximumCents).toEqual({ minimum: 0, maximum: 250 });
      expect(result.minimumThreeYearFinancialValueCents).toBe(0);
      expect(result.maximumThreeYearFinancialValueCents).toBe(250);
    }
  );

  it("keeps missing likelihood unknown and preserves approval flag", () => {
    const estimate = baseEstimate({
      oneTimeSavingsCents: 0,
      netAnnualRecurringSavingsCents: 0,
      selectedIncentiveScenario: {
        id: "s3",
        opportunityIds: ["opp-1"],
        opportunityCount: 1,
        upfrontSavingsEntries: [],
        recurringSavingsEntries: []
      },
      opportunities: [{ opportunityId: "opp-1", requiresProgramApproval: true }]
    });

    const result = buildThreeYearFinancialValue({
      retrofitGroup: fixture(estimate.opportunities),
      estimate
    });

    expect(result.opportunityBreakdown[0].awardLikelihood).toBe("unknown");
    expect(result.opportunityBreakdown[0].requiresProgramApproval).toBe(true);
  });

  it("preserves signed mandatory recurring economics and differentiates missing recurring", () => {
    const known = baseEstimate({
      oneTimeSavingsCents: 1000,
      netAnnualRecurringSavingsCents: -2400,
      selectedIncentiveScenario: {
        id: "s4",
        opportunityIds: [],
        opportunityCount: 0,
        upfrontSavingsEntries: [],
        recurringSavingsEntries: []
      }
    });

    const negativeRecurring = buildThreeYearFinancialValue({
      retrofitGroup: fixture([]),
      estimate: known
    });

    expect(negativeRecurring.recurringThreeYearContributionCents.minimum).toBe(-7200);
    expect(negativeRecurring.recurringThreeYearContributionCents.maximum).toBe(-7200);
    expect(negativeRecurring.calculationTrace.bounds.completeZero).toBe(false);

    const missing = baseEstimate({
      oneTimeSavingsCents: 1000,
      selectedIncentiveScenario: {
        id: "s4b",
        opportunityIds: [],
        opportunityCount: 0,
        upfrontSavingsEntries: [],
        recurringSavingsEntries: []
      }
    });

    const missingRecurring = buildThreeYearFinancialValue({
      retrofitGroup: fixture([]),
      estimate: missing
    });

    expect(missingRecurring.recurringThreeYearContributionCents).toEqual({ minimum: null, maximum: null });
    expect(missingRecurring.maximumThreeYearFinancialValueCents).toBeNull();
  });

  it("makes complete zero quantifiable and not treated as missing", () => {
    const estimate = baseEstimate({
      oneTimeSavingsCents: 0,
      netAnnualRecurringSavingsCents: 0,
      selectedIncentiveScenario: {
        id: "s5",
        opportunityIds: [],
        opportunityCount: 0,
        upfrontSavingsEntries: [],
        recurringSavingsEntries: []
      }
    });

    const result = buildThreeYearFinancialValue({
      retrofitGroup: fixture([]),
      estimate
    });

    expect(result.minimumThreeYearFinancialValueCents).toBe(0);
    expect(result.maximumThreeYearFinancialValueCents).toBe(0);
    expect(result.calculationTrace.bounds.completeZero).toBe(true);
  });

  it("uses selected scenario amount first and does not double count fallback", () => {
    const estimate = baseEstimate({
      oneTimeSavingsCents: 10000,
      netAnnualRecurringSavingsCents: 1000,
      selectedIncentiveScenario: {
        id: "s6",
        opportunityIds: ["opp-1"],
        opportunityCount: 1,
        upfrontSavingsEntries: [
          { kind: "upfront_savings", opportunityId: "opp-1", amountCents: 1200, formula: "fixed", incentiveRuleId: "r1" }
        ],
        recurringSavingsEntries: [],
      }
    });

    const result = buildThreeYearFinancialValue({
      retrofitGroup: fixture([{ opportunityId: "opp-1" }]),
      estimate
    });

    expect(result.oneTimeContributionCents).toMatchObject({ minimum: 8800, maximum: 8800 });
    expect(result.opportunityBreakdown[0].oneTimeContributionCents).toEqual({ minimum: 0, maximum: 1200 });
    expect(result.minimumThreeYearFinancialValueCents).toBe(11800);
    expect(result.maximumThreeYearFinancialValueCents).toBe(13000);
  });

  it("records unsupported formula exclusion explicitly", () => {
    const estimate = baseEstimate({
      oneTimeSavingsCents: 1000,
      netAnnualRecurringSavingsCents: 1000,
      selectedIncentiveScenario: {
        id: "s7",
        opportunityIds: ["opp-bad"],
        opportunityCount: 1,
        upfrontSavingsEntries: [
          {
            kind: "upfront_savings",
            opportunityId: "opp-bad",
            amountCents: 999,
            formula: "unsupported_formula",
            incentiveRuleId: "bad"
          }
        ],
        recurringSavingsEntries: [],
      }
    });

    const result = buildThreeYearFinancialValue({
      retrofitGroup: fixture([{ opportunityId: "opp-bad" }]),
      estimate
    });

    expect(result.excludedContributions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ reason: "unsupported_formula", opportunityId: "opp-bad" })
      ])
    );
    expect(result.completeness.status).toBe("partially_quantified");
  });

  it("tracks mutually exclusive opportunity exclusion and cap metadata", () => {
    const estimate = baseEstimate({
      oneTimeSavingsCents: 500,
      annualSavingsCents: 1200,
      annualRecurringExpensesCents: 200,
      selectedIncentiveScenario: {
        id: "s8",
        opportunityIds: ["opp-selected"],
        opportunityCount: 1,
        upstreamRuleIds: ["r-main"],
        upfrontSavingsEntries: [
          {
            kind: "upfront_savings",
            opportunityId: "opp-selected",
            amountCents: 100,
            formula: "fixed_amount",
            incentiveRuleId: "rule-main"
          }
        ],
        recurringSavingsEntries: [],
        capExplanations: [{ source: "capped_program", status: "capped" }]
      },
      alternativeScenarios: [
        { id: "alt", opportunityIds: ["opp-excluded"] }
      ],
      incentiveCalculationPackageSummaries: [
        { opportunityId: "opp-selected", programName: "Program A", runtimeInclusionStatus: "no_supported_effect_amount" }
      ]
    });

    const result = buildThreeYearFinancialValue({
      retrofitGroup: fixture([
        { opportunityId: "opp-selected", awardLikelihood: "near-guaranteed" },
        { opportunityId: "opp-excluded", awardLikelihood: "near-guaranteed" }
      ]),
      estimate
    });

    expect(result.excludedContributions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ reason: "mutually_exclusive_scenario_choice", opportunityId: "opp-excluded" })
      ])
    );
    expect(result.counts.capMetadataCount).toBe(2);
    expect(result.calculationTrace.steps).toEqual(
      expect.arrayContaining([expect.objectContaining({ stage: "cap_metadata", capMetadata: expect.any(Array) })])
    );
  });

  it("supports safe integer conversion and range ordering", () => {
    const estimate = baseEstimate({
      oneTimeSavingsCents: 1000,
      netAnnualRecurringSavingsCents: 1500.49,
      selectedIncentiveScenario: {
        id: "s9",
        opportunityIds: ["opp-a", "opp-b"],
        opportunityCount: 2,
        upfrontSavingsEntries: [
          { kind: "upfront_savings", opportunityId: "opp-a", amountCents: 100.5, formula: "fixed", incentiveRuleId: "r1" },
          { kind: "upfront_savings", opportunityId: "opp-b", amountCents: 100.5, formula: "fixed", incentiveRuleId: "r2" }
        ],
        recurringSavingsEntries: [
          { kind: "recurring_savings", opportunityId: "opp-a", amountCents: -49.6, period: "annual", formula: "fixed", incentiveRuleId: "r3" },
          { kind: "recurring_savings", opportunityId: "opp-b", amountCents: 55.1, period: "annual", formula: "fixed", incentiveRuleId:           "r4" }
        ]
      }
    });

    const result = buildThreeYearFinancialValue({
      retrofitGroup: fixture([
        { opportunityId: "opp-a", awardLikelihood: "uncertain" },
        { opportunityId: "opp-b", awardLikelihood: "near-guaranteed" }
      ]),
      estimate,
      normalizedProfile: {}
    });

    expect(result.oneTimeContributionCents).toMatchObject({ minimum: 798, maximum: 798 });
    expect(result.recurringThreeYearContributionCents).toMatchObject({ minimum: 4485, maximum: 4485 });
    expect(Number.isInteger(result.minimumThreeYearFinancialValueCents)).toBe(true);
    expect(Number.isInteger(result.maximumThreeYearFinancialValueCents)).toBe(true);
    expect(result.minimumThreeYearFinancialValueCents).not.toBeNull();
    expect(result.maximumThreeYearFinancialValueCents).not.toBeNull();
  });

  it("supports scaling assumptions with non-LED quantity proxy and not_required/unknown deferrals", () => {
    const estimate = baseEstimate({ oneTimeSavingsCents: 1000, netAnnualRecurringSavingsCents: 0 });

    const solarScaled = buildThreeYearFinancialValue({
      retrofitGroup: {
        retrofitTypeId: "rooftop_solar_pv",
        opportunities: [],
        opportunityCount: 0
      },
      estimate,
      normalizedProfile: { site: { roofAreaSquareFeet: { value: 2400 } } }
    });

    const fixed = buildThreeYearFinancialValue({
      retrofitGroup: {
        retrofitTypeId: "high_efficiency_hvac_retrofit",
        opportunities: [],
        opportunityCount: 0
      },
      estimate,
      normalizedProfile: {}
    });

    const unknown = buildThreeYearFinancialValue({
      retrofitGroup: {
        retrofitTypeId: "unknown_retrofit_type",
        opportunities: [],
        opportunityCount: 0
      },
      estimate,
      normalizedProfile: {}
    });

    expect(solarScaled.scalingAssumptions[0]).toMatchObject({
      retrofitTypeId: "rooftop_solar_pv",
      quantityEstimationMode: "roof_area_ratio",
      status: "active"
    });
    expect(fixed.scalingAssumptions[0]).toMatchObject({
      quantityEstimationMode: "not_required",
      retrofitTypeId: "high_efficiency_hvac_retrofit"
    });
    expect(unknown.scalingAssumptions[0].quantityEstimationMode).toBe("unknown");
  });
});
