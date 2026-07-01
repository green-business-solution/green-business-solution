import { describe, expect, it } from "vitest";
import { summarizeMatchResult } from "./matching/explainMatch.mjs";
import { buildOpportunityMatchProfile } from "./matching/buildOpportunityMatchProfile.mjs";
import { evaluateOpportunityForUser } from "./matching/evaluateRules.mjs";
import { normalizeUserProfile } from "./matching/normalizeUserProfile.mjs";
import { isVisibleAvailability, isVisibleOpportunity } from "./matching/opportunityLifecycle.mjs";
import { classifyRetrofitsForOpportunity } from "./matching/retrofitTaxonomy.mjs";
import { buildPortalRetrofitRecommendations, buildRetrofitGroupsFromEligibleResults } from "./retrofitRecommendations.mjs";

const now = new Date("2026-06-30T12:00:00Z");

function baseIntake(overrides = {}) {
  return {
    userId: "client_1",
    submissionId: "intake_client_1",
    contact: {
      fullName: "Test Client",
      email: "client@example.com",
      phone: null,
      roleTitle: null,
      contactPreference: "Email"
    },
    business: {
      companyName: "Retrofit Test Co",
      website: null,
      industry: "Commercial office",
      organizationType: "business_commercial",
      organizationSize: "11-50 employees",
      headquarters: "Oakland, CA"
    },
    site: {
      address: "123 Main St, Oakland, CA 94612",
      electricUtilityProvider: "PG&E",
      gasUtilityProvider: "PG&E",
      ownershipStatus: "Own",
      buildingType: "Office",
      squareFootage: "10000",
      numberOfUnits: null
    },
    sustainability: {
      goals: "Reduce energy costs",
      currentChallenges: "High bills",
      interestedImprovements: ["LED lighting"],
      monthlyUtilitySpend: "4000",
      timeline: "This year",
      notes: null
    },
    uploadedUtilityFiles: [],
    utilityExtractedValues: [],
    siteEnergyProfile: null,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    ...overrides
  };
}

function makeOpportunity(overrides = {}) {
  return {
    opportunityId: overrides.opportunityId || "test-opportunity",
    canonicalTitle: overrides.canonicalTitle || "Commercial Lighting Rebate",
    normalizedTitle: overrides.normalizedTitle || "Commercial Lighting Rebate",
    sourceKey: "SOURCE_DSIRE",
    sourceName: "DSIRE",
    sourceUrl: "https://example.com/program",
    websiteUrl: "https://example.com/program",
    applicationUrl: "https://example.com/apply",
    state: "CA",
    status: "active",
    category: "Financial Incentive",
    programType: "Rebate Program",
    summary: "Commercial customers can receive incentives for efficiency upgrades.",
    technologies: ["LED Lighting"],
    sectors: ["Commercial"],
    dataQuality: { status: "clean" },
    contentHash: "abc",
    ...overrides
  };
}

function summarizeRetrofits(retrofits) {
  return retrofits.map((retrofit) => ({
    retrofitTypeId: retrofit.retrofitTypeId,
    displayName: retrofit.displayName,
    opportunityIds: retrofit.opportunities.map((opportunity) => opportunity.opportunityId)
  }));
}

describe("portal retrofit recommendations", () => {
  it("reuses the same grouped eligible retrofit matches that feed test cases", () => {
    const intake = baseIntake();
    const user = {
      userId: intake.userId,
      role: "client",
      status: "active",
      fullName: "Test Client",
      email: "client@example.com",
      companyName: "Retrofit Test Co",
      authProvider: "google",
      googleLinked: true,
      isFakeUser: false,
      createdAt: now.toISOString(),
      lastLoginAt: now.toISOString()
    };
    const opportunities = [
      makeOpportunity({
        opportunityId: "lighting-1",
        canonicalTitle: "PG&E Business LED Rebate",
        technologies: ["LED Lighting"]
      }),
      makeOpportunity({
        opportunityId: "hvac-1",
        canonicalTitle: "PG&E Commercial Heat Pump Incentive",
        technologies: ["Heat Pumps"],
        summary: "Commercial customers can receive incentives for high-efficiency heat pump HVAC upgrades."
      }),
      makeOpportunity({
        opportunityId: "texas-1",
        canonicalTitle: "Texas Lighting Program",
        state: "TX",
        summary: "Texas-only commercial lighting incentive."
      })
    ];

    const normalizedProfile = normalizeUserProfile(intake);
    const eligibleResults = opportunities
      .filter(isVisibleOpportunity)
      .map((opportunity) => {
        const matchProfile = buildOpportunityMatchProfile(opportunity, { now });
        if (!isVisibleAvailability(matchProfile.availability)) return null;
        return evaluateOpportunityForUser(
          normalizedProfile,
          opportunity,
          {
            ...matchProfile,
            retrofitTypes: classifyRetrofitsForOpportunity(opportunity, matchProfile)
          },
          { now }
        );
      })
      .filter(Boolean)
      .filter((result) => result.eligibilityStatus === "eligible");

    const expectedRetrofits = buildRetrofitGroupsFromEligibleResults({
      results: eligibleResults,
      normalizedProfile,
      calculationDate: now.toISOString().slice(0, 10),
      subjectId: user.userId,
      opportunityRules: []
    });
    const payload = buildPortalRetrofitRecommendations({
      user,
      intake,
      opportunities,
      now
    });

    expect(payload.summary.matchedOpportunityCount).toBe(eligibleResults.length);
    expect(payload.summary.matchedRetrofitCount).toBe(expectedRetrofits.length);
    expect(summarizeRetrofits(payload.retrofits)).toEqual(summarizeRetrofits(expectedRetrofits));
    expect(payload.retrofits.every((retrofit) => retrofit.opportunities.every((opportunity) => summarizeMatchResult(opportunity).opportunityId))).toBe(true);
  });

  it("keeps fixture-based savings previews attached to grouped retrofit recommendations", () => {
    const intake = baseIntake();
    const payload = buildPortalRetrofitRecommendations({
      user: {
        userId: intake.userId,
        role: "client",
        status: "active",
        fullName: "Test Client",
        email: "client@example.com",
        companyName: "Retrofit Test Co",
        authProvider: "google",
        googleLinked: true,
        isFakeUser: false,
        createdAt: now.toISOString(),
        lastLoginAt: now.toISOString()
      },
      intake,
      opportunities: [
        makeOpportunity({
          opportunityId: "lighting-1",
          canonicalTitle: "PG&E Business LED Rebate",
          technologies: ["LED Lighting"]
        })
      ],
      now
    });

    expect(payload.retrofits).toHaveLength(1);
    expect(payload.retrofits[0].retrofitTypeId).toBe("led_lighting_retrofit");
    expect(payload.retrofits[0].savingsPreview?.retrofitTypeId).toBe("led_lighting_retrofit");
  });
});
