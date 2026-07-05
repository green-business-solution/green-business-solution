import { describe, expect, it } from "vitest";
import { parseArgs, precomputeTestUserRetrofitRecommendations } from "./precompute-test-user-retrofit-recommendations.mjs";

const now = "2026-07-04T00:00:00.000Z";

describe("precomputeTestUserRetrofitRecommendations", () => {
  it("skips promoted tax-only fake users that have no retrofit test-case results", async () => {
    const users = [
      fakeUser("user_good", "sample_good", "Good Retrofit User"),
      fakeUser("user_tax_only", "sample_tax_only", "Tax Only User"),
      fakeUser("user_unmapped", "sample_unmapped", "Unmapped Retrofit User")
    ];
    const intakesByUserId = new Map([
      ["user_good", intake("user_good")],
      ["user_unmapped", intake("user_unmapped")]
    ]);
    const sampleTestCaseById = new Map([
      ["sample_good", { sampleUserId: "sample_good", retrofits: [{ retrofitTypeId: "led_lighting_retrofit" }] }],
      ["sample_tax_only", { sampleUserId: "sample_tax_only", retrofits: [] }]
    ]);

    const result = await precomputeTestUserRetrofitRecommendations(
      { dryRun: true, force: true, profile: "", testCasesPath: "/missing-test-cases.json" },
      { intakesByUserId, opportunities: [], sampleTestCaseById, users }
    );

    expect(result.targetUserCount).toBe(2);
    expect(result.skippedTaxOnlyUserCount).toBe(1);
    expect(result.results.map((item) => item.userId).sort()).toEqual(["user_good", "user_unmapped"]);
    expect(result.summary).toEqual({ would_write: 2 });
  });

  it("accepts a generated test-case path override", () => {
    expect(parseArgs(["--test-cases", "tmp/sample_matching_test_cases.json"]).testCasesPath).toContain(
      "tmp/sample_matching_test_cases.json"
    );
  });

  it("accepts fixture-only payload source", () => {
    expect(parseArgs(["--source", "fixture", "--quiet"])).toMatchObject({
      source: "fixture",
      progress: false
    });
  });

  it("uses fixture payloads without requiring live opportunities", async () => {
    const users = [fakeUser("user_good", "sample_good", "Good Retrofit User")];
    const intakesByUserId = new Map([["user_good", intake("user_good")]]);
    const sampleTestCaseById = new Map([
      [
        "sample_good",
        {
          sampleUserId: "sample_good",
          retrofits: [
            {
              retrofitTypeId: "led_lighting_retrofit",
              opportunities: [{ opportunityId: "opp_1" }]
            }
          ]
        }
      ]
    ]);

    const result = await precomputeTestUserRetrofitRecommendations(
      { dryRun: true, force: true, profile: "", source: "fixture", testCasesPath: "/missing-test-cases.json" },
      { intakesByUserId, sampleTestCaseById, users }
    );

    expect(result.liveOpportunityRecordCount).toBe(0);
    expect(result.results).toMatchObject([
      {
        matchedOpportunityCount: 1,
        matchedRetrofitCount: 1,
        source: "fixture",
        status: "would_write",
        userId: "user_good"
      }
    ]);
  });
});

function fakeUser(userId, sampleUserId, fullName) {
  return {
    userId,
    sampleUserId,
    role: "client",
    status: "active",
    fullName,
    email: `${userId}@example.com`,
    companyName: fullName,
    authProvider: "password",
    isFakeUser: true,
    createdAt: now
  };
}

function intake(userId) {
  return {
    userId,
    submissionId: `intake_${userId}`,
    contact: { fullName: "Test User", email: `${userId}@example.com` },
    business: {
      companyName: "Test Company",
      organizationType: "Commercial Business",
      organizationSize: "1-10 employees"
    },
    site: {
      address: "1 Main St, Test, CA 90000",
      electricUtilityProvider: "Sample Utility",
      gasUtilityProvider: "Sample Gas",
      ownershipStatus: "Own",
      buildingType: "Office",
      squareFootage: "1000"
    },
    sustainability: {
      interestedImprovements: ["LED lighting retrofit"],
      monthlyUtilitySpend: "100"
    },
    uploadedUtilityFiles: [],
    utilityExtractedValues: [],
    createdAt: now,
    updatedAt: now
  };
}
