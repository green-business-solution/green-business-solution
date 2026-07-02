import { describe, expect, it } from "vitest";
import { buildIncentiveScenarios, selectBestScenario } from "../stacking.mjs";
import { buildV2RuntimeIncentiveBridge } from "../v2RuntimeIncentives.mjs";

function ctx(overrides = {}) {
  return {
    answers: {
      project_cost_cents: { value: 100000 },
      smart_charger_confirmed: { value: true },
      ...overrides.answers
    },
    billLines: {},
    billLineDeltas: [],
    baseCostLedgerEntries: [{ id: "cost", kind: "upfront_cost", category: "equipment_cost", amountCents: 100000 }],
    baseRecurringSavingsEntries: [],
    upfrontCostCents: 100000
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
