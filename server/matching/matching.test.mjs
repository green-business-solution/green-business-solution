import { describe, expect, it } from "vitest";
import { buildOpportunityMatchProfile } from "./buildOpportunityMatchProfile.mjs";
import { evaluateOpportunityForUser } from "./evaluateRules.mjs";
import { summarizeMatchResult } from "./explainMatch.mjs";
import { normalizeUserProfile } from "./normalizeUserProfile.mjs";
import { classifyRetrofitsForOpportunity } from "./retrofitTaxonomy.mjs";

const now = new Date("2026-06-25T12:00:00Z");

describe("matching pipeline", () => {
  it("matches an SDG&E EV charging user to an SDG&E EV charging opportunity", () => {
    const user = normalizeUserProfile({
      organizationType: "Agricultural Operation",
      siteAddress: "100 Harbor Drive, San Diego, CA 92101",
      electricUtilityProvider: "SDG&E",
      ownershipStatus: "Lease",
      buildingType: "Office",
      squareFootage: "12000",
      interestedImprovements: ["EV charging"]
    });
    const opportunity = {
      opportunityId: "test-sdge-ev",
      canonicalTitle: "SDG&E Business EV Charging Rebate",
      sourceKey: "SOURCE_SDGE_BUSINESS",
      sourceName: "San Diego Gas & Electric Business Programs",
      state: "CA",
      status: "active",
      category: "EV Charging Programs for Businesses",
      programType: "Rebate Program",
      summary: "Commercial and agricultural customers may receive incentives for Level 2 EV charging.",
      technologies: ["Level-2 Electric Vehicle Service Equipment"],
      sectors: ["Commercial", "Agricultural"],
      dataQuality: { status: "clean" },
      contentHash: "abc"
    };
    const profile = buildOpportunityMatchProfile(opportunity, { now });
    const result = evaluateOpportunityForUser(user, opportunity, profile, { now });

    expect(["eligible_active", "likely_eligible"]).toContain(result.eligibilityStatus);
    expect(result.rankScore).toBeGreaterThanOrEqual(85);
    expect(result.blockers).toHaveLength(0);
  });

  it("hard-fails explicit utility mismatches", () => {
    const user = normalizeUserProfile({
      organizationType: "Commercial Business",
      siteAddress: "3800 Market Street, Riverside, CA 92501",
      electricUtilityProvider: "Southern California Edison",
      ownershipStatus: "Own",
      buildingType: "Office",
      squareFootage: "20000",
      interestedImprovements: ["EV charging"]
    });
    const opportunity = {
      opportunityId: "test-sdge-only",
      canonicalTitle: "SDG&E EV Charging Program",
      sourceKey: "SOURCE_SDGE_BUSINESS",
      sourceName: "San Diego Gas & Electric Business Programs",
      state: "CA",
      status: "active",
      category: "EV Charging Programs for Businesses",
      programType: "Rebate Program",
      summary: "Available to SDG&E business customers.",
      technologies: ["Level-2 Electric Vehicle Service Equipment"],
      sectors: ["Commercial"],
      dataQuality: { status: "clean" },
      contentHash: "abc"
    };
    const profile = buildOpportunityMatchProfile(opportunity, { now });
    const result = evaluateOpportunityForUser(user, opportunity, profile, { now });

    expect(result.eligibilityStatus).toBe("ineligible");
    expect(result.blockers.join(" ")).toMatch(/does not match required utility/);
  });

  it("treats reviewed opportunities with no utility restriction language as pass", () => {
    const user = normalizeUserProfile({
      organizationType: "Commercial Business",
      siteAddress: "1 City Hall Square, Boston, MA 02201",
      electricUtilityProvider: "Other / Not sure",
      ownershipStatus: "Lease",
      buildingType: "Office",
      squareFootage: "30000",
      interestedImprovements: ["LED lighting"]
    });
    const opportunity = {
      opportunityId: "test-ma-lighting",
      canonicalTitle: "Massachusetts Commercial Lighting Rebate",
      sourceKey: "SOURCE_DSIRE",
      sourceName: "DSIRE",
      state: "MA",
      status: "active",
      category: "Financial Incentive",
      programType: "Rebate Program",
      summary: "Commercial customers can receive lighting incentives.",
      technologies: ["LED Lighting"],
      sectors: ["Commercial"],
      dataQuality: { status: "clean" },
      contentHash: "abc"
    };
    const profile = buildOpportunityMatchProfile(opportunity, { now });
    const result = evaluateOpportunityForUser(user, opportunity, profile, { now });

    expect(profile.utilityRequirements.restrictionStatus).toBe("none_found_after_review");
    expect(result.eligibilityStatus).not.toBe("ineligible");
    expect(result.unresolvedRequirements.join(" ")).not.toMatch(/utility restriction/i);
    expect(result.matchedReasons.join(" ")).toMatch(/No utility restriction was found after source review/);
  });

  it("hard-fails utility-like requirements that are not in the utility ontology", () => {
    const user = normalizeUserProfile({
      organizationType: "Commercial Business",
      siteAddress: "1 Infinite Loop, Cupertino, CA 95014, USA",
      electricUtilityProvider: "PG&E",
      ownershipStatus: "Lease",
      buildingType: "Office",
      squareFootage: "12000",
      interestedImprovements: ["LED lighting"]
    });
    const opportunity = {
      opportunityId: "test-lodi-lighting",
      canonicalTitle: "Lodi Electric Utility - Commercial Energy Efficiency Rebate Program",
      sourceKey: "SOURCE_DSIRE",
      sourceName: "DSIRE",
      state: "CA",
      status: "active",
      category: "Financial Incentive",
      programType: "Rebate Program",
      summary: "Commercial customers may receive lighting incentives.",
      technologies: ["LED Lighting"],
      sectors: ["Commercial"],
      dataQuality: { status: "clean" },
      contentHash: "abc"
    };
    const profile = buildOpportunityMatchProfile(opportunity, { now });
    const result = evaluateOpportunityForUser(user, opportunity, profile, { now });

    expect(profile.utilityRequirements.restrictionStatus).toBe("required");
    expect(profile.utilityRequirements.requiredUtilityNames).toContain("Lodi Electric Utility");
    expect(result.eligibilityStatus).toBe("ineligible");
    expect(result.blockers.join(" ")).toMatch(/Lodi Electric Utility/);
  });

  it("hard-fails high-confidence specific facility mismatches", () => {
    const user = normalizeUserProfile({
      organizationType: "Commercial Business",
      siteAddress: "100 N Alameda Street, Los Angeles, CA 90012, USA",
      electricUtilityProvider: "LADWP",
      ownershipStatus: "Lease",
      buildingType: "Office",
      squareFootage: "12000",
      interestedImprovements: ["EV charging"]
    });
    const opportunity = {
      opportunityId: "test-school-bus-site",
      canonicalTitle: "School Bus Charging Site Program",
      sourceKey: "SOURCE_DSIRE",
      sourceName: "DSIRE",
      state: "CA",
      status: "active",
      category: "Financial Incentive",
      programType: "Rebate Program",
      summary: "Eligible school sites may receive incentives for EV charging.",
      technologies: ["EV charging"],
      sectors: ["Commercial"],
      facilityEligibilityReview: {
        eligibilityStatus: "required",
        eligibleBuildingTypes: ["education_campus"],
        evidenceText: "Eligible school sites may receive incentives.",
        confidence: 0.86
      },
      dataQuality: { status: "clean" },
      contentHash: "abc"
    };
    const profile = buildOpportunityMatchProfile(opportunity, { now });
    const result = evaluateOpportunityForUser(user, opportunity, profile, { now });

    expect(result.eligibilityStatus).toBe("ineligible");
    expect(result.blockers.join(" ")).toMatch(/does not match the user's site type/);
  });

  it("hard-fails high-confidence broad residential facility mismatches", () => {
    const user = normalizeUserProfile({
      organizationType: "Commercial Business",
      siteAddress: "600 S IKEA Way, Burbank, CA 91502, USA",
      electricUtilityProvider: "Burbank Water and Power",
      ownershipStatus: "Lease",
      buildingType: "Retail / Storefront",
      squareFootage: "456000",
      interestedImprovements: ["LED lighting"]
    });
    const opportunity = {
      opportunityId: "test-residential-rebate",
      canonicalTitle: "Residential Energy Efficiency Rebate Program",
      sourceKey: "SOURCE_DSIRE",
      sourceName: "DSIRE",
      state: "CA",
      status: "active",
      category: "Financial Incentive",
      programType: "Rebate Program",
      summary: "Residential customers may receive incentives for lighting and HVAC.",
      technologies: ["LED Lighting"],
      sectors: ["Commercial"],
      facilityEligibilityReview: {
        eligibilityStatus: "broad_residential",
        eligibleBuildingTypes: [],
        evidenceText: "Residential customers may receive incentives.",
        confidence: 0.82
      },
      dataQuality: { status: "clean" },
      contentHash: "abc"
    };
    const profile = buildOpportunityMatchProfile(opportunity, { now });
    const result = evaluateOpportunityForUser(user, opportunity, profile, { now });

    expect(result.eligibilityStatus).toBe("ineligible");
    expect(result.blockers.join(" ")).toMatch(/broad_residential eligibility/);
  });

  it("uses stored utility review artifacts before deterministic inference", () => {
    const user = normalizeUserProfile({
      organizationType: "Commercial Business",
      siteAddress: "1 Infinite Loop, Cupertino, CA 95014, USA",
      electricUtilityProvider: "PG&E",
      ownershipStatus: "Lease",
      buildingType: "Office",
      squareFootage: "12000",
      interestedImprovements: ["EV charging"]
    });
    const opportunity = {
      opportunityId: "test-reviewed-any-utility",
      canonicalTitle: "SDG&E EV Charging Program",
      sourceKey: "SOURCE_SDGE_BUSINESS",
      sourceName: "San Diego Gas & Electric Business Programs",
      state: "CA",
      status: "active",
      category: "EV Charging Programs for Businesses",
      programType: "Rebate Program",
      summary: "Commercial customers can receive EV charging incentives.",
      technologies: ["Level-2 Electric Vehicle Service Equipment"],
      sectors: ["Commercial"],
      utilityRestrictionReview: {
        restrictionStatus: "none",
        requiredUtilityIds: [],
        evidenceText: "Reviewed source rules indicate any electric utility customer is eligible.",
        confidence: 0.86
      },
      dataQuality: { status: "clean" },
      contentHash: "abc"
    };
    const profile = buildOpportunityMatchProfile(opportunity, { now });
    const result = evaluateOpportunityForUser(user, opportunity, profile, { now });

    expect(profile.utilityRequirements.restrictionStatus).toBe("none");
    expect(profile.utilityRequirements.requiredUtilityIds).toEqual([]);
    expect(result.eligibilityStatus).not.toBe("ineligible");
    expect(result.blockers.join(" ")).not.toMatch(/utility/i);
  });

  it("preserves source links in summarized match results", () => {
    const user = normalizeUserProfile({
      organizationType: "Commercial Business",
      siteAddress: "1 Infinite Loop, Cupertino, CA 95014, USA",
      electricUtilityProvider: "PG&E",
      ownershipStatus: "Lease",
      buildingType: "Office",
      squareFootage: "12000",
      interestedImprovements: ["EV charging"]
    });
    const opportunity = {
      opportunityId: "test-dsire-source-link",
      canonicalTitle: "PG&E EV Fleet Program",
      sourceKey: "SOURCE_DSIRE",
      sourceName: "DSIRE",
      sourceUrl: "https://programs.dsireusa.org/system/program/detail/22283/pge-ev-fleet-program",
      websiteUrl: "https://example.com/pge-ev-fleet",
      state: "CA",
      status: "active",
      category: "Financial Incentive",
      programType: "Rebate Program",
      summary: "Commercial customers can receive EV fleet infrastructure incentives.",
      technologies: ["EV charging"],
      sectors: ["Commercial"],
      dataQuality: { status: "clean" },
      contentHash: "abc"
    };
    const profile = buildOpportunityMatchProfile(opportunity, { now });
    const result = evaluateOpportunityForUser(user, opportunity, profile, { now });
    const summary = summarizeMatchResult(result);

    expect(summary.sourceUrl).toBe(opportunity.sourceUrl);
    expect(summary.websiteUrl).toBe(opportunity.websiteUrl);
  });

  it("classifies one opportunity into multiple retrofit types", () => {
    const opportunity = {
      opportunityId: "test-multi-retrofit",
      canonicalTitle: "Commercial retrofit bundle",
      sourceKey: "SOURCE_DSIRE",
      sourceName: "DSIRE",
      state: "CA",
      status: "active",
      category: "Financial Incentive",
      programType: "Rebate Program",
      summary: "Rebates are available for LED lighting, refrigeration equipment, and solar PV systems.",
      technologies: ["LED Lighting", "Refrigerators/Freezers", "Solar Photovoltaics"],
      sectors: ["Commercial"],
      dataQuality: { status: "clean" },
      contentHash: "abc"
    };
    const profile = buildOpportunityMatchProfile(opportunity, { now });
    const retrofits = classifyRetrofitsForOpportunity(opportunity, profile).map((retrofit) => retrofit.retrofitTypeId);

    expect(retrofits).toContain("led_lighting_retrofit");
    expect(retrofits).toContain("high_efficiency_refrigeration_equipment");
    expect(retrofits).toContain("rooftop_solar_pv");
  });

  it("does not classify battery electric vehicle text as battery storage", () => {
    const opportunity = {
      opportunityId: "test-battery-electric-vehicle",
      canonicalTitle: "Commercial EV Charging Station Incentive",
      sourceKey: "SOURCE_SILICON_VALLEY_POWER",
      sourceName: "Silicon Valley Power Business Programs",
      state: "CA",
      status: "active",
      category: "EV Charging Rebate",
      programType: "rebate",
      summary: "Rebates for zero-emission infrastructure equipment for battery electric vehicles.",
      technologies: ["EV_charging"],
      sectors: ["Commercial"],
      dataQuality: { status: "clean" },
      contentHash: "abc"
    };
    const profile = buildOpportunityMatchProfile(opportunity, { now });

    expect(profile.project.technologyIds).toContain("ev_charging");
    expect(profile.project.technologyIds).not.toContain("battery_storage");
  });

  it("marks fully subscribed programs as unavailable from summary text", () => {
    const user = normalizeUserProfile({
      organizationType: "Commercial Business",
      siteAddress: "1500 Warburton Avenue, Santa Clara, CA 95050",
      electricUtilityProvider: "Silicon Valley Power",
      ownershipStatus: "Own",
      buildingType: "Office",
      squareFootage: "18000",
      interestedImprovements: ["EV charging"]
    });
    const opportunity = {
      opportunityId: "test-fully-subscribed",
      canonicalTitle: "Commercial EV Charging Station Incentive",
      sourceKey: "SOURCE_SILICON_VALLEY_POWER",
      sourceName: "Silicon Valley Power Business Programs",
      state: "CA",
      status: "active",
      category: "EV Charging Rebate",
      programType: "rebate",
      summary: "Due to high demand, the Incentive Program is now fully subscribed and is no longer accepting new applications.",
      technologies: ["EV_charging"],
      sectors: ["Commercial"],
      dataQuality: { status: "clean" },
      contentHash: "abc"
    };
    const profile = buildOpportunityMatchProfile(opportunity, { now });
    const result = evaluateOpportunityForUser(user, opportunity, profile, { now });

    expect(profile.availability.normalizedStatus).toBe("unavailable");
    expect(result.eligibilityStatus).toBe("unavailable");
  });

  it("does not treat vehicle battery text as stationary battery storage", () => {
    const opportunity = {
      opportunityId: "test-fleet-battery-electric",
      canonicalTitle: "Commercial Vehicles ZEV Infrastructure",
      sourceKey: "SOURCE_CA_ENERGY_COMMISSION",
      sourceName: "California Energy Commission",
      state: "CA",
      status: "active",
      category: "State Funding Solicitation",
      programType: "solicitation",
      summary: "Incentives for zero-emission vehicle infrastructure for medium-duty battery-electric fleet vehicles.",
      technologies: ["EV_charging", "fleet_electrification", "battery_storage"],
      sectors: ["Commercial"],
      dataQuality: { status: "clean" },
      contentHash: "abc"
    };
    const profile = buildOpportunityMatchProfile(opportunity, { now });

    expect(profile.project.technologyIds).toContain("ev_charging");
    expect(profile.project.technologyIds).toContain("fleet_electrification");
    expect(profile.project.technologyIds).not.toContain("battery_storage");
  });

  it("marks closed-as-of summaries unavailable", () => {
    const opportunity = {
      opportunityId: "test-closed-as-of",
      canonicalTitle: "Closed Grant",
      sourceKey: "SOURCE_CA_ENERGY_COMMISSION",
      sourceName: "California Energy Commission",
      state: "CA",
      status: "unknown",
      category: "State Funding Solicitation",
      programType: "solicitation",
      summary: "Closed as of 09/15/2023. Applications are no longer accepted.",
      technologies: ["EV_charging"],
      sectors: ["Commercial"],
      dataQuality: { status: "clean" },
      contentHash: "abc"
    };
    const profile = buildOpportunityMatchProfile(opportunity, { now });

    expect(profile.availability.normalizedStatus).toBe("unavailable");
  });
});
