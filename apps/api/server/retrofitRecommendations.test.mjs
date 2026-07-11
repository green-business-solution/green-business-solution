import { describe, expect, it } from "vitest";
import { buildRetrofitDetailQuestions } from "./forms/retrofitFormQuestions.mjs";
import { summarizeMatchResult } from "./matching/explainMatch.mjs";
import { buildOpportunityMatchProfile } from "./matching/buildOpportunityMatchProfile.mjs";
import { evaluateOpportunityForUser } from "./matching/evaluateRules.mjs";
import { normalizeUserProfile } from "./matching/normalizeUserProfile.mjs";
import { isVisibleAvailability, isVisibleOpportunity } from "./matching/opportunityLifecycle.mjs";
import { classifyRetrofitsForOpportunity } from "./matching/retrofitTaxonomy.mjs";
import {
  buildPortalRetrofitPreviewShell,
  buildPortalRetrofitRecommendations,
  buildRetrofitGroupsFromEligibleResults
} from "./retrofitRecommendations.mjs";

const now = new Date("2026-06-30T12:00:00Z");
const testFormQuestionCatalog = {
  schemaVersion: "retrofi_form_question_catalog.v1",
  catalogId: "retrofit_recommendations_test_catalog",
  version: "test",
  retrofit: {
    defaultQuestionIds: ["tax_inclusive_costs"],
    questions: {
      tax_inclusive_costs: {
        idSuffix: "tax-inclusive-costs",
        question: "Do you want to enter costs with tax included, or should RetroFi estimate them for you?",
        answerType: "select",
        options: ["Enter tax-inclusive numbers", "Estimate for me (tax included)"],
        canonicalInputKey: "project_cost_tax_inclusion_preference"
      },
      lighting_fixture_count: {
        idSuffix: "fixtures",
        question: "How many fixtures or bulbs are being replaced?",
        answerType: "number",
        canonicalInputKey: "fixture_count"
      },
      current_fuel_type: {
        idSuffix: "fuel",
        question: "What is the current fuel type?",
        answerType: "select",
        options: ["Electric", "Gas", "Mixed", "Unknown"],
        canonicalInputKey: "current_fuel_type"
      },
      solar_roof_area: {
        idSuffix: "roof-area",
        question: "How much usable roof or site area is available?",
        answerType: "number",
        canonicalInputKey: "usable_roof_or_site_area_sqft"
      },
      solar_site_control: {
        idSuffix: "roof-control",
        question: "Do you control the roof or site?",
        answerType: "select",
        options: ["Own", "Lease with permission", "Do not control", "Unknown"],
        canonicalInputKey: "site_control_status"
      },
      biomass_fuel_stream: {
        idSuffix: "fuel-stream",
        question: "What organic fuel stream or waste source would be used?",
        answerType: "text",
        canonicalInputKey: "biomass_fuel_stream"
      },
      biomass_feedstock_quantity: {
        idSuffix: "feedstock",
        question: "What quantity of feedstock is available per month?",
        answerType: "text",
        canonicalInputKey: "monthly_feedstock_quantity"
      }
    },
    bindings: [
      { priority: 10, match: { retrofitTypeIdContains: ["lighting", "led"] }, questionIds: ["lighting_fixture_count"] },
      { priority: 20, match: { retrofitTypeIdContains: ["hvac"] }, questionIds: ["current_fuel_type"] },
      { priority: 30, match: { retrofitTypeIdContains: ["solar"] }, questionIds: ["solar_roof_area", "solar_site_control"] },
      { priority: 40, match: { retrofitTypeIdContains: ["biomass", "biogas"] }, questionIds: ["biomass_fuel_stream", "biomass_feedstock_quantity"] }
    ]
  },
  application: {
    requirementSections: {},
    requirementTypeMappings: {}
  }
};

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
  it("assembles base retrofit form questions from the shared catalog", () => {
    const solarQuestions = buildRetrofitDetailQuestions(
      {
        retrofitTypeId: "solar_renewable_electricity",
        displayName: "Rooftop solar PV",
        parentCategory: "renewable_generation"
      },
      { catalog: testFormQuestionCatalog }
    );
    const biomassQuestions = buildRetrofitDetailQuestions(
      {
        retrofitTypeId: "biomass_biogas_energy_system",
        displayName: "Biomass/biogas energy system",
        parentCategory: "renewable_generation"
      },
      { catalog: testFormQuestionCatalog }
    );

    expect(solarQuestions.map((question) => question.id)).toContain("solar_renewable_electricity:roof-area");
    expect(solarQuestions.map((question) => question.question)).toContain("Do you control the roof or site?");
    expect(biomassQuestions.map((question) => question.id)).toContain("biomass_biogas_energy_system:fuel-stream");
    expect(biomassQuestions.map((question) => question.question)).toContain("What quantity of feedstock is available per month?");
    expect(biomassQuestions.every((question) => question.collectionStage === "pre_opportunity_estimate")).toBe(true);
  });

  it("builds a lightweight shell from saved retrofit interests without opportunity details", () => {
    const intake = baseIntake({
      sustainability: {
        goals: "Reduce energy costs",
        currentChallenges: "High bills",
        interestedImprovements: ["LED lighting retrofit", "Heat pump HVAC retrofit"],
        monthlyUtilitySpend: "4000",
        timeline: "This year",
        notes: null
      },
      sampleMatchingSummary: {
        promisingOpportunityCount: 12,
        topOpportunityCount: 5,
        generatedAt: now.toISOString()
      }
    });
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

    const payload = buildPortalRetrofitPreviewShell({ formQuestionCatalog: testFormQuestionCatalog, user, intake, now });

    expect(payload.isProgressiveShell).toBe(true);
    expect(payload.summary).toMatchObject({
      matchedRetrofitCount: 2,
      matchedOpportunityCount: 12,
      canShowOpportunities: true,
      taxIntakeRequiredBeforeOpportunityDisplay: false,
      requiredTaxInputCount: 0
    });
    expect(payload.taxRuntimePreview).toMatchObject({
      status: "no_applicable_tax_rules",
      opportunityDisplayBlocked: false
    });
    expect(payload.retrofits.map((retrofit) => retrofit.retrofitTypeId)).toEqual([
      "led_lighting_retrofit",
      "heat_pump_hvac_retrofit"
    ]);
    expect(payload.retrofits[0].detailQuestions.map((question) => question.id)).toContain("led_lighting_retrofit:fixtures");
    expect(payload.retrofits[0].detailQuestions.find((question) => question.id === "led_lighting_retrofit:fixtures")).toMatchObject({
      canonicalInputKey: "fixture_count",
      collectionStage: "pre_opportunity_estimate",
      collectionSurface: "retrofit_scope_form"
    });
    expect(payload.retrofits[1].detailQuestions.map((question) => question.id)).toContain("heat_pump_hvac_retrofit:fuel");
    expect(payload.retrofits.every((retrofit) => retrofit.opportunities.length === 0)).toBe(true);
    expect(payload.retrofits.every((retrofit) => retrofit.savingsPreview?.status === "calculated")).toBe(true);
    expect(payload.retrofits[0].savingsPreview?.annualSavingsCents).toBeGreaterThan(0);
    expect(payload.retrofits[0].savingsPreview?.sustainabilityImpact?.status).toBe("estimated");
    expect(payload.retrofits[0].savingsPreview?.sustainabilityImpact?.metrics?.scope2ElectricityReductionKwhPerYear?.value).toBeGreaterThan(0);
    expect(payload.retrofits[0].savingsPreview?.sustainabilityImpact?.metrics?.siteEuiReductionKbtuPerSquareFootPerYear?.value).toBeGreaterThan(0);
    expect(payload.retrofits[0].savingsPreview?.sustainabilityImpact?.metrics?.annualOperationalCO2eReductionKgPerYear?.value).toBeGreaterThan(0);
  });

  it("keeps conditional opportunities matchable and only excludes archived entries", () => {
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
      lastLoginAt: now.toISOString(),
    };
    const conditionalOpportunity = makeOpportunity({
      opportunityId: "conditional-opportunity",
      canonicalTitle: "Conditional Lighting Incentive",
      normalizedTitle: "Conditional Lighting Incentive",
      availabilityStatus: "conditional",
      lifecycleStatus: "conditional",
    });
    const archivedOpportunity = makeOpportunity({
      opportunityId: "archived-opportunity",
      canonicalTitle: "Archived Lighting Incentive",
      normalizedTitle: "Archived Lighting Incentive",
      availabilityStatus: "archived",
      lifecycleStatus: "archived",
    });

    const payload = buildPortalRetrofitRecommendations({
      formQuestionCatalog: testFormQuestionCatalog,
      intake,
      opportunities: [conditionalOpportunity, archivedOpportunity],
      now,
      user,
    });

    expect(payload.summary.canShowOpportunities).toBe(true);
    expect(payload.summary.matchedOpportunityCount).toBe(1);
    expect(payload.retrofits).toHaveLength(1);
    expect(payload.retrofits[0].opportunities.map((opportunity) => opportunity.opportunityId)).toEqual([
      "conditional-opportunity",
    ]);
  });

  it("exposes mandatory pre-opportunity tax inputs when local tax workflow inputs are missing", () => {
    const intake = baseIntake({
      site: {
        address: "123 Mission St, San Francisco, CA 94105",
        geography: {
          stateCode: "CA",
          countyFips: "06075",
          placeName: "San Francisco",
          zip5: "94105"
        },
        electricUtilityProvider: "PG&E",
        gasUtilityProvider: "PG&E",
        ownershipStatus: "Own",
        buildingType: "Retail",
        squareFootage: "5000",
        numberOfUnits: null
      }
    });

    const payload = buildPortalRetrofitPreviewShell({
      formQuestionCatalog: testFormQuestionCatalog,
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
      now
    });

    expect(payload.summary).toMatchObject({
      canShowOpportunities: false,
      taxIntakeRequiredBeforeOpportunityDisplay: true
    });
    expect(payload.taxRuntimePreview.status).toBe("requires_tax_intake");
    expect(payload.taxRuntimePreview.requiredPreOpportunityInputs.length).toBeGreaterThan(0);
    expect(payload.taxRuntimePreview.requiredPreOpportunityInputs[0]).toMatchObject({
      requiredBeforeOpportunitySelection: true,
      collectionStage: "pre_opportunity_intake"
    });
  });

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
      formQuestionCatalog: testFormQuestionCatalog,
      subjectId: user.userId,
      opportunityRules: []
    });
    const payload = buildPortalRetrofitRecommendations({
      formQuestionCatalog: testFormQuestionCatalog,
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

  it("can build only the selected retrofit for prioritized detail loading", () => {
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
    const payload = buildPortalRetrofitRecommendations({
      formQuestionCatalog: testFormQuestionCatalog,
      user,
      intake,
      opportunities: [
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
        })
      ],
      retrofitTypeIds: ["led_lighting_retrofit"],
      now
    });

    expect(payload.isPartialRecommendations).toBe(true);
    expect(payload.retrofits.map((retrofit) => retrofit.retrofitTypeId)).toEqual(["led_lighting_retrofit"]);
    expect(payload.summary.matchedRetrofitCount).toBe(1);
    expect(payload.summary.matchedOpportunityCount).toBe(1);
  });

  it("keeps fixture-based savings previews attached to grouped retrofit recommendations", () => {
    const intake = baseIntake();
    const payload = buildPortalRetrofitRecommendations({
      formQuestionCatalog: testFormQuestionCatalog,
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

  it("prevents archived opportunities from appearing as current matches", () => {
    const intake = baseIntake();
    const lifecycleStatuses = ["active", "conditional", "disabled", "quarantined", "archived"];
    const payload = buildPortalRetrofitRecommendations({
      formQuestionCatalog: testFormQuestionCatalog,
      user: { userId: intake.userId },
      intake,
      opportunities: lifecycleStatuses.map((availabilityStatus) =>
        makeOpportunity({
          opportunityId: `lifecycle-${availabilityStatus}`,
          availabilityStatus
        })
      ),
      now
    });

    expect(payload.summary.matchedOpportunityCount).toBe(4);
    expect(payload.retrofits.flatMap((retrofit) => retrofit.opportunities)).toEqual([
      expect.objectContaining({
        opportunityId: "lifecycle-active",
        availabilityStatus: "active"
      }),
      expect.objectContaining({
        opportunityId: "lifecycle-conditional",
        availabilityStatus: "conditional"
      }),
      expect.objectContaining({
        opportunityId: "lifecycle-disabled",
        availabilityStatus: "disabled"
      }),
      expect.objectContaining({
        opportunityId: "lifecycle-quarantined",
        availabilityStatus: "quarantined"
      })
    ]);
  });

  it("keeps visible non-archived opportunities in the match pipeline", () => {
    const intake = baseIntake();
    const payload = buildPortalRetrofitRecommendations({
      formQuestionCatalog: testFormQuestionCatalog,
      user: { userId: intake.userId },
      intake,
      opportunities: [
        makeOpportunity({
          opportunityId: "visible-conditional",
          canonicalTitle: "Conditional LED Rebate",
          availabilityStatus: "conditional",
        }),
        makeOpportunity({
          opportunityId: "visible-disabled",
          canonicalTitle: "Disabled HVAC Rebate",
          availabilityStatus: "disabled",
        }),
      ],
      now,
    });

    expect(payload.summary.matchedOpportunityCount).toBeGreaterThan(0);
    expect(
      payload.retrofits.flatMap((retrofit) => retrofit.opportunities).map((opportunity) => opportunity.opportunityId),
    ).toEqual(expect.arrayContaining(["visible-conditional", "visible-disabled"]));
  });

  it("propagates award-audit fields into recommendation payload opportunities", () => {
    const intake = baseIntake();
    const payload = buildPortalRetrofitRecommendations({
      formQuestionCatalog: testFormQuestionCatalog,
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
          opportunityId: "audit-payload-opportunity",
          canonicalTitle: "PG&E Business LED Rebate",
          technologies: ["LED Lighting"],
          requiresProgramApproval: false,
          approvalRequirements: [],
          approvalStage: "none",
          awardLikelihood: "possible",
          awardLikelihoodReason: "The evidence remains inconclusive.",
          awardLikelihoodEvidence: "Potential outcomes based on reviewed criteria.",
          reviewStatus: "needs_followup"
        })
      ],
      now
    });

    const opportunity = payload.retrofits[0].opportunities[0];
    expect(opportunity).toMatchObject({
      requiresProgramApproval: false,
      approvalRequirements: [],
      approvalStage: "none",
      awardLikelihood: "possible",
      awardLikelihoodReason: "The evidence remains inconclusive.",
      awardLikelihoodEvidence: "Potential outcomes based on reviewed criteria.",
      reviewStatus: "needs_followup"
    });
  });

  it("passes award-audit fields through explain-match summary payloads", () => {
    const summary = summarizeMatchResult({
      opportunityId: "opp-audit-1",
      opportunityName: "Municipal Rebates",
      offerId: null,
      retrofitTypeIds: ["led_lighting_retrofit"],
      retrofitTypes: [],
      sourceUrl: "https://example.com/program",
      websiteUrl: "https://example.com/program",
      applicationUrl: "https://example.com/program/apply",
      eligibilityStatus: "eligible",
      rankScore: 0.81,
      opportunityDataConfidence: 0.92,
      userProfileCompleteness: 0.8,
      matchedReasons: ["reason-a"],
      unresolvedRequirements: [],
      blockers: [],
      availabilityStatus: "conditional",
      availabilityLifecycle: {
        status: "conditional",
        conditionalRequirements: [{ type: "locality", description: "Resolve the jurisdiction." }]
      },
      requiresProgramApproval: true,
      approvalRequirements: ["official permit", "energy audit"],
      approvalStage: "before_installation",
      awardLikelihood: "near-guaranteed",
      awardLikelihoodReason: "The benefit is statutory.",
      awardLikelihoodEvidence: "Evidence shows clear award cadence.",
      reviewStatus: "audited"
    });

    expect(summary).toMatchObject({
      availabilityStatus: "conditional",
      availabilityLifecycle: {
        status: "conditional",
        conditionalRequirements: [{ type: "locality", description: "Resolve the jurisdiction." }]
      },
      requiresProgramApproval: true,
      approvalRequirements: ["official permit", "energy audit"],
      approvalStage: "before_installation",
      awardLikelihood: "near_guaranteed",
      awardLikelihoodReason: "The benefit is statutory.",
      awardLikelihoodEvidence: "Evidence shows clear award cadence.",
      reviewStatus: "audited"
    });
  });
});
