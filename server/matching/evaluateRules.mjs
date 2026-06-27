import { UTILITY_DISPLAY_NAMES, unique } from "./ontologies.mjs";
import { buildingTypesOverlap } from "./facilityEligibility.mjs";
import { classifyRetrofitsForOpportunity } from "./retrofitTaxonomy.mjs";

export function evaluateOpportunityForUser(userMatchProfile, opportunity, matchProfile, { now = new Date() } = {}) {
  const offerResults = matchProfile.offers.map((offer) => evaluateOffer(userMatchProfile, opportunity, matchProfile, offer, { now }));
  const bestResult = offerResults.slice().sort(compareOfferResults)[0] || null;

  if (!bestResult) {
    const retrofitTypes = retrofitTypesFor(opportunity, matchProfile);
    return {
      opportunityId: opportunity.opportunityId,
      opportunityName: opportunity.canonicalTitle || opportunity.normalizedTitle || opportunity.opportunityId,
      offerId: null,
      retrofitTypeIds: retrofitTypes.map((retrofit) => retrofit.retrofitTypeId),
      retrofitTypes,
      sourceUrl: opportunity.sourceUrl || null,
      websiteUrl: opportunity.websiteUrl || null,
      applicationUrl: opportunity.applicationUrl || null,
      eligibilityStatus: "manual_review",
      rankScore: 0,
      opportunityDataConfidence: matchProfile.overallConfidence,
      userProfileCompleteness: profileCompleteness(userMatchProfile),
      matchedReasons: [],
      unresolvedRequirements: ["No matchable offer was extracted."],
      blockers: [],
      nextQuestion: null,
      sourceSummary: {
        state: opportunity.state || null,
        sourceName: opportunity.sourceName || null,
        programType: opportunity.programType || null,
        administrator: opportunity.administrator || null
      }
    };
  }

  return bestResult;
}

function evaluateOffer(user, opportunity, profile, offer, { now }) {
  const retrofitTypes = retrofitTypesFor(opportunity, profile);
  const checks = {
    availability: evaluateAvailability(profile.availability, now),
    geography: evaluateGeography(user, profile.geography),
    utility: evaluateUtility(user, profile.utilityRequirements),
    applicant: evaluateApplicant(user, profile.applicant, offer),
    site: evaluateSite(user, profile.site),
    project: evaluateProject(user, profile.project, offer),
    constraints: evaluateConstraints(user, profile.constraints)
  };
  const hardFail = Object.values(checks).find((check) => check.result === "fail");
  const unknowns = Object.values(checks).filter((check) => check.result === "unknown");
  const passed = Object.values(checks).filter((check) => check.result === "pass");
  const rankScore = hardFail ? 0 : scoreChecks(checks);
  const eligibilityStatus = statusFor({ hardFail, unknowns, availability: checks.availability, rankScore, profile });

  return {
    opportunityId: opportunity.opportunityId,
    opportunityName: opportunity.canonicalTitle || opportunity.normalizedTitle || opportunity.opportunityId,
    offerId: offer.offerId,
    retrofitTypeIds: retrofitTypes.map((retrofit) => retrofit.retrofitTypeId),
    retrofitTypes,
    sourceUrl: opportunity.sourceUrl || null,
    websiteUrl: opportunity.websiteUrl || null,
    applicationUrl: opportunity.applicationUrl || null,
    eligibilityStatus,
    rankScore,
    opportunityDataConfidence: profile.overallConfidence,
    userProfileCompleteness: profileCompleteness(user),
    matchedReasons: unique(passed.flatMap((check) => check.reasons)),
    unresolvedRequirements: unique(unknowns.flatMap((check) => check.reasons)),
    blockers: hardFail ? unique(Object.values(checks).filter((check) => check.result === "fail").flatMap((check) => check.reasons)) : [],
    nextQuestion: nextQuestionFor(unknowns),
    checkResults: checks,
    sourceSummary: {
      state: opportunity.state || null,
      sourceName: opportunity.sourceName || null,
      programType: opportunity.programType || null,
      administrator: opportunity.administrator || null
    }
  };
}

function retrofitTypesFor(opportunity, profile) {
  return Array.isArray(profile.retrofitTypes) ? profile.retrofitTypes : classifyRetrofitsForOpportunity(opportunity, profile);
}

function evaluateAvailability(availability, now) {
  if (availability.normalizedStatus === "unavailable") {
    return fail("Opportunity appears unavailable or the application deadline has passed.");
  }
  if (availability.normalizedStatus === "upcoming") {
    return unknown("Opportunity appears upcoming; application timing should be verified.");
  }
  if (availability.normalizedStatus === "active" || availability.normalizedStatus === "rolling") {
    return pass(availability.normalizedStatus === "rolling" ? "Opportunity appears rolling or no-deadline." : "Opportunity appears active.");
  }
  return unknown("Availability is uncertain.");
}

function evaluateGeography(user, geography) {
  const stateCode = user.site.geo.stateCode;
  if (geography.scopeStatus !== "known" || geography.include.length === 0) {
    return unknown("Opportunity geography could not be normalized.");
  }
  if (!stateCode) {
    return unknown("User site state is missing or was not parsed from the address.");
  }
  const includedStates = geography.include.filter((item) => item.kind === "state").map((item) => item.id);
  const isNationwide = geography.include.some((item) => item.kind === "nationwide" || item.id === "US");
  if (isNationwide || includedStates.includes(stateCode)) {
    return pass(isNationwide ? "Opportunity appears nationwide." : `Project site state ${stateCode} matches opportunity geography.`);
  }
  return fail(`Project site state ${stateCode} does not match opportunity geography ${includedStates.join(", ")}.`);
}

function evaluateUtility(user, utilityRequirements) {
  const restrictionStatus = utilityRequirements.restrictionStatus || "unknown";
  if (restrictionStatus === "none") {
    return pass("Opportunity explicitly has no electric utility restriction.");
  }
  if (restrictionStatus === "not_applicable") {
    return pass("Utility provider is not applicable to this opportunity.");
  }
  if (restrictionStatus === "none_found_after_review") {
    return pass("No utility restriction was found after source review.");
  }
  if (restrictionStatus !== "required") {
    return unknown("Utility restriction is still unknown after review.");
  }
  const required = utilityRequirements.requiredUtilityIds || [];
  const requiredNames = utilityRequirements.requiredUtilityNames || [];
  if (required.length === 0 && requiredNames.length === 0) return unknown("Utility restriction is required but no utility could be normalized.");
  const userUtilityId = user.site.utility.electric.distributionUtilityId;
  if (!userUtilityId) {
    return unknown("User electric distribution utility is unknown.");
  }
  if (required.includes(userUtilityId)) {
    return pass(`Self-reported utility matches ${UTILITY_DISPLAY_NAMES[userUtilityId] || userUtilityId}.`);
  }
  const userUtilityName = UTILITY_DISPLAY_NAMES[userUtilityId] || userUtilityId;
  if (requiredNames.some((name) => normalizedUtilityNameMatches(name, userUtilityName))) {
    return pass(`Self-reported utility matches ${userUtilityName}.`);
  }
  return fail(
    `Self-reported utility ${UTILITY_DISPLAY_NAMES[userUtilityId] || userUtilityId} does not match required utility ${required
      .map((utilityId) => UTILITY_DISPLAY_NAMES[utilityId] || utilityId)
      .concat(requiredNames)
      .join(", ")}.`
  );
}

function normalizedUtilityNameMatches(requiredName, userUtilityName) {
  const required = String(requiredName || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  const user = String(userUtilityName || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  return Boolean(required && user && (required.includes(user) || user.includes(required)));
}

function evaluateApplicant(user, applicant, offer) {
  const userTypes = user.business.organizationTypes || [];
  const eligibleTypes = unique([...(offer.sectors || []), ...(applicant.eligibleOrganizationTypes || [])]);
  if (applicant.residentialOnly && !userTypes.includes("multifamily") && !userTypes.includes("residential")) {
    return fail("Opportunity appears residential-only and the user profile is nonresidential.");
  }
  if (eligibleTypes.length === 0) {
    return unknown("Eligible applicant types were not normalized.");
  }
  if (userTypes.some((type) => eligibleTypes.includes(type))) {
    return pass(`Applicant type overlaps eligible sector: ${userTypes.filter((type) => eligibleTypes.includes(type)).join(", ")}.`);
  }
  if (eligibleTypes.includes("commercial") && !userTypes.includes("residential")) {
    return pass("Nonresidential applicant is compatible with broad commercial eligibility.");
  }
  return fail(`Applicant type ${userTypes.join(", ") || "unknown"} does not match eligible sectors ${eligibleTypes.join(", ")}.`);
}

function evaluateSite(user, site) {
  const userBuildingTypes = user.site.buildingTypes || [];
  const eligibleBuildingTypes = site.eligibleBuildingTypes || [];
  const facilityEligibilityStatus = site.facilityEligibilityStatus || "unknown";
  const facilityConfidence = typeof site.confidence === "number" ? site.confidence : 0;
  if (facilityEligibilityStatus === "none") {
    return pass("Opportunity explicitly has no site or facility type restriction.");
  }
  if (facilityEligibilityStatus === "not_applicable") {
    return pass("Site or facility type is not applicable to this opportunity.");
  }
  if (facilityEligibilityStatus === "none_found_after_review") {
    return pass("No site or facility type restriction was found after source review.");
  }
  if (facilityEligibilityStatus === "broad_nonresidential" && buildingTypesOverlap(userBuildingTypes, eligibleBuildingTypes, facilityEligibilityStatus)) {
    return pass("User site is compatible with broad nonresidential facility eligibility.");
  }
  if (facilityEligibilityStatus === "broad_commercial" && buildingTypesOverlap(userBuildingTypes, eligibleBuildingTypes, facilityEligibilityStatus)) {
    return pass("User site is compatible with broad commercial facility eligibility.");
  }
  if (facilityEligibilityStatus === "broad_residential" && buildingTypesOverlap(userBuildingTypes, eligibleBuildingTypes, facilityEligibilityStatus)) {
    return pass("User site is compatible with broad residential facility eligibility.");
  }
  if (["broad_nonresidential", "broad_commercial", "broad_residential"].includes(facilityEligibilityStatus)) {
    if (userBuildingTypes.length === 0) {
      return unknown("User site or facility type is missing.");
    }
    if (facilityConfidence >= 0.7) {
      return fail(`User site or facility type (${userBuildingTypes.join(", ")}) does not match ${facilityEligibilityStatus} eligibility.`);
    }
    return unknown(`Opportunity site or facility scope (${facilityEligibilityStatus}) does not directly match the user's site type.`);
  }
  if (facilityEligibilityStatus !== "required") {
    return unknown("Site or facility type restriction is still unknown after review.");
  }
  if (eligibleBuildingTypes.length === 0) {
    return unknown("Site or facility type is required but no specific eligible type was normalized.");
  }
  if (buildingTypesOverlap(userBuildingTypes, eligibleBuildingTypes, facilityEligibilityStatus)) {
    return pass(`Site or facility type matches: ${userBuildingTypes.filter((type) => eligibleBuildingTypes.includes(type)).join(", ") || userBuildingTypes.join(", ")}.`);
  }
  if (userBuildingTypes.length === 0) {
    return unknown("User site or facility type is missing.");
  }
  if (facilityConfidence >= 0.7) {
    return fail(`Opportunity site or facility specificity (${eligibleBuildingTypes.join(", ")}) does not match the user's site type (${userBuildingTypes.join(", ")}).`);
  }
  return unknown(`Opportunity site or facility specificity (${eligibleBuildingTypes.join(", ")}) does not directly match the user's site type.`);
}

function evaluateProject(user, project, offer) {
  const opportunityTechnologies = unique([...(offer.technologies || []), ...(project.technologyIds || [])]);
  if (opportunityTechnologies.length === 0) {
    return unknown("No opportunity technology was normalized.");
  }
  return pass(`Opportunity technology is available for retrofit discovery: ${opportunityTechnologies.join(", ")}.`);
}

function evaluateConstraints(user, constraints) {
  const failures = [];
  const unknowns = [];
  const passes = [];

  for (const constraint of constraints) {
    if (constraint.criterionId === "site.squareFootage") {
      const value = user.site.squareFootage.value;
      if (value == null) {
        unknowns.push("Square footage is needed for this opportunity.");
        continue;
      }
      if (constraint.min != null && value < constraint.min) {
        failures.push(`Square footage ${value} is below required minimum ${constraint.min}.`);
      } else if (constraint.max != null && value > constraint.max) {
        failures.push(`Square footage ${value} is above required maximum ${constraint.max}.`);
      } else {
        passes.push("Square footage satisfies extracted threshold.");
      }
    } else {
      unknowns.push(`User value is missing for ${constraint.criterionId}.`);
    }
  }

  if (failures.length > 0) return fail(...failures);
  if (unknowns.length > 0) return unknown(...unknowns);
  if (passes.length > 0) return pass(...passes);
  return pass("No numeric constraints were extracted.");
}

function scoreChecks(checks) {
  return Math.round(
    35 * scoreResult(checks.geography, 0.45) +
      20 * scoreResult(checks.utility, 0.55) +
      20 * scoreResult(checks.project, 0.15) +
      15 * scoreResult(checks.applicant, 0.35) +
      7 * scoreResult(checks.site, 0.45) +
      3 * scoreResult(checks.constraints, 0.7)
  );
}

function scoreResult(check, unknownScore) {
  if (check.result === "pass") return 1;
  if (check.result === "fail") return 0;
  return unknownScore;
}

function statusFor({ hardFail, unknowns, availability, rankScore, profile }) {
  if (hardFail) {
    return availability.result === "fail" ? "unavailable" : "ineligible";
  }
  if (availability.result === "unknown" && profile.availability.normalizedStatus === "upcoming") {
    return "upcoming";
  }
  if (profile.matchability === "review_only") {
    return "manual_review";
  }
  if (unknowns.length > 0) {
    return rankScore >= 70 ? "likely_eligible" : "needs_information";
  }
  return "eligible";
}

function nextQuestionFor(unknowns) {
  const reasons = unknowns.flatMap((check) => check.reasons).join(" ").toLowerCase();
  if (reasons.includes("utility")) {
    return {
      criterionId: "site.utility.electric.distributionUtilityId",
      prompt: "Confirm the electric distribution utility shown on the site's bill."
    };
  }
  if (reasons.includes("square footage")) {
    return {
      criterionId: "site.squareFootage",
      prompt: "What is the approximate square footage of the project site?"
    };
  }
  if (reasons.includes("geography") || reasons.includes("state")) {
    return {
      criterionId: "site.geo.stateCode",
      prompt: "Confirm the project site's city, state, and ZIP code."
    };
  }
  return null;
}

function profileCompleteness(user) {
  const values = Object.values(user.completeness || {});
  if (values.length === 0) return 0;
  return Math.round((values.filter(Boolean).length / values.length) * 100) / 100;
}

function compareOfferResults(a, b) {
  return statusRank(a.eligibilityStatus) - statusRank(b.eligibilityStatus) || b.rankScore - a.rankScore;
}

function statusRank(status) {
  return {
    eligible: 0,
    likely_eligible: 1,
    needs_information: 2,
    upcoming: 3,
    manual_review: 4,
    ineligible: 5,
    unavailable: 6
  }[status] ?? 9;
}

function pass(...reasons) {
  return { result: "pass", reasons };
}

function fail(...reasons) {
  return { result: "fail", reasons };
}

function unknown(...reasons) {
  return { result: "unknown", reasons };
}
