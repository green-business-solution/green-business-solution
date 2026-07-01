import { describe, expect, it } from "vitest";
import { buildSampleMatchingOpportunityAudit } from "./audit-sample-matching-opportunity-data.mjs";

describe("buildSampleMatchingOpportunityAudit", () => {
  it("separates pending data repairs from ranking and local-scope risks", () => {
    const audit = buildSampleMatchingOpportunityAudit({
      targetsPayload: {
        targets: [{ opportunityId: "SOURCE_TEST:pending" }]
      },
      retrofitIndexPayload: {
        retrofits: [
          {
            opportunities: [
              {
                opportunityId: "SOURCE_TEST:repaired",
                opportunityDataRepair: { confidence: "high" }
              }
            ]
          }
        ]
      },
      testCasesPayload: {
        testCases: [
          {
            sampleUserId: "los-angeles-office",
            description: "Test office",
            sourceForm: { siteAddress: "100 Main Street, Los Angeles, CA 90012, USA" },
            normalizedProfile: { site: { geo: { stateCode: "CA" } } },
            topResults: [
              result("SOURCE_TEST:pending", "Pending Utility Rebate", {
                opportunityDataConfidence: 0.68,
                retrofitTypes: [physicalRetrofit("led_lighting_retrofit")]
              }),
              result("SOURCE_TEST:city", "City of San Diego - Permit Program", {
                opportunityDataConfidence: 0.77,
                retrofitTypes: [nonPhysicalRetrofit("leed_certification", "certifications_compliance")]
              }),
              result("SOURCE_TEST:tax", "Business Energy Investment Tax Credit (ITC)", {
                opportunityDataConfidence: 0.82,
                sourceSummary: { state: "US", programType: "Tax Credit" },
                retrofitTypes: [physicalRetrofit("rooftop_solar_pv")]
              }),
              result("SOURCE_TEST:repaired", "Reviewed Program", {
                opportunityDataConfidence: 0.9,
                retrofitTypes: [physicalRetrofit("insulation_upgrade")]
              })
            ]
          }
        ]
      }
    });

    expect(audit.summary.issueCount).toBe(3);
    expect(audit.summary.opportunityDataIssueCount).toBe(2);
    expect(audit.summary.matchingRankingIssueCount).toBe(2);
    expect(audit.issues.find((issue) => issue.opportunityId === "SOURCE_TEST:pending").flags).toContain(
      "pending_gpt_repair_target"
    );
    expect(audit.issues.find((issue) => issue.opportunityId === "SOURCE_TEST:city").flags).toEqual(
      expect.arrayContaining(["local_scope_matched_by_state_only", "non_physical_top_result"])
    );
    expect(audit.issues.find((issue) => issue.opportunityId === "SOURCE_TEST:tax").flags).toContain(
      "financing_or_tax_program_high_rank"
    );
  });
});

function result(opportunityId, opportunityName, overrides = {}) {
  const retrofitTypes = overrides.retrofitTypes || [];
  return {
    opportunityId,
    opportunityName,
    retrofitTypeIds: retrofitTypes.map((retrofit) => retrofit.retrofitTypeId),
    retrofitTypes,
    rankScore: 100,
    opportunityDataConfidence: 0.9,
    sourceSummary: { state: "CA", programType: "Rebate Program" },
    ...overrides
  };
}

function physicalRetrofit(retrofitTypeId) {
  return {
    retrofitTypeId,
    parentCategory: "building_envelope",
    isPhysicalRetrofit: true
  };
}

function nonPhysicalRetrofit(retrofitTypeId, parentCategory) {
  return {
    retrofitTypeId,
    parentCategory,
    isPhysicalRetrofit: false
  };
}
