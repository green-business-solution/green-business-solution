import crypto from "node:crypto";
import {
  asArray,
  canonicalOrganizationType,
  canonicalTechnologiesFromText,
  extractStateCode,
  normalizeText,
  unique
} from "./ontologies.mjs";
import { extractFacilityRequirements } from "./facilityEligibility.mjs";
import { extractUtilityRequirements } from "./utilityRestrictions.mjs";
import { availabilityFromReview } from "./availabilityReview.mjs";

export const MATCH_PROFILE_SCHEMA_VERSION = "opportunity-match-profile-v1";
export const MATCH_PROFILE_EXTRACTOR_VERSION = "rules-2026-06-26-v2";

const UNAVAILABLE_STATUS_VALUES = new Set([
  "awarded",
  "cancelled",
  "canceled",
  "closed",
  "fully_subscribed",
  "no_award",
  "unavailable"
]);

export function buildOpportunityMatchProfile(opportunity, { now = new Date() } = {}) {
  const corpus = buildExtractionCorpus(opportunity);
  const searchableText = corpus.map((segment) => segment.text).join("\n");
  const sourceContentHash = opportunity.contentHash || hashText(searchableText);
  const availability = normalizeAvailability(opportunity, searchableText, now);
  const geography = extractGeography(opportunity, searchableText);
  const utilityRequirements = extractUtilityRequirements(opportunity, searchableText);
  const applicant = extractApplicant(opportunity, searchableText);
  const site = extractSite(opportunity, searchableText);
  const project = extractProject(opportunity, searchableText);
  const constraints = extractConstraints(opportunity);
  const offers = buildOffers(opportunity, {
    applicant,
    project,
    constraints
  });
  const facts = [
    ...factsFromValues("site.geo.stateCode", geography.include.map((item) => item.id), "geography", opportunity, "state"),
    ...factsFromValues(
      "site.utility.electric.distributionUtilityId",
      [...utilityRequirements.requiredUtilityIds, ...utilityRequirements.requiredUtilityNames],
      "utility",
      opportunity,
      utilityRequirements.evidenceText || "matchingParameters.utilityProvider"
    ),
    ...factsFromValues("business.organizationTypes", applicant.eligibleOrganizationTypes, "eligibility", opportunity, "sectors"),
    ...factsFromValues("project.technologyIds", project.technologyIds, "eligibility", opportunity, "technologies")
  ];
  const conflicts = [];
  const overallConfidence = estimateOverallConfidence({
    opportunity,
    availability,
    geography,
    utilityRequirements,
    applicant,
    project
  });

  return {
    schemaVersion: MATCH_PROFILE_SCHEMA_VERSION,
    extractorVersion: MATCH_PROFILE_EXTRACTOR_VERSION,
    sourceContentHash,
    availability,
    geography,
    utilityRequirements,
    applicant,
    site,
    project,
    constraints,
    ruleGroups: buildRuleGroups({ geography, utilityRequirements, applicant, site, project, constraints }),
    offers,
    facts,
    conflicts,
    matchability: matchabilityFor({ availability, geography, applicant, project, overallConfidence }),
    overallConfidence,
    lastVerifiedAt: opportunity.lastSeenAt || opportunity.updatedAt || null,
    extractionCorpus: corpus
  };
}

export function buildExtractionCorpus(opportunity) {
  const segments = [];
  addSegment(segments, "canonicalTitle", opportunity.canonicalTitle);
  addSegment(segments, "summary", opportunity.summary);
  addSegment(segments, "summaryHtml", stripHtml(opportunity.summaryHtml));
  addSegment(segments, "administrator", opportunity.administrator);
  addSegment(segments, "category", opportunity.category);
  addSegment(segments, "programType", opportunity.programType);
  addSegment(segments, "state", opportunity.state);
  addSegment(segments, "stateName", opportunity.stateName);
  addObjectSegments(segments, "geography", opportunity.geography);
  addObjectSegments(segments, "eligibleSectors", opportunity.eligibleSectors);
  addObjectSegments(segments, "sectors", opportunity.sectors);
  addObjectSegments(segments, "technologies", opportunity.technologies);
  addObjectSegments(segments, "technologyRecords", opportunity.technologyRecords);
  addObjectSegments(segments, "details", opportunity.details);
  addObjectSegments(segments, "parameterSets", opportunity.parameterSets);
  addObjectSegments(segments, "matchingParameters", opportunity.matchingParameters);
  addObjectSegments(segments, "eligibilityRules", opportunity.eligibilityRules);
  addObjectSegments(segments, "cec", opportunity.cec);
  addObjectSegments(segments, "sce", opportunity.sce);
  addObjectSegments(segments, "sdge", opportunity.sdge);
  addObjectSegments(segments, "svp", opportunity.svp);

  for (const [index, evidence] of asArray(opportunity.evidence).entries()) {
    addSegment(segments, `evidence[${index}].sectionHeading`, evidence?.sectionHeading, evidence?.sourceUrl, evidence?.retrievedAt);
    addSegment(segments, `evidence[${index}].sectionCategory`, evidence?.sectionCategory, evidence?.sourceUrl, evidence?.retrievedAt);
    addSegment(segments, `evidence[${index}].extractedText`, evidence?.extractedText, evidence?.sourceUrl, evidence?.retrievedAt);
  }

  return segments.filter((segment) => segment.text);
}

function normalizeAvailability(opportunity, searchableText, now) {
  const reviewedAvailability = availabilityFromReview(opportunity.availabilityReview, opportunity);
  if (reviewedAvailability) return reviewedAvailability;

  const statusText = normalizeText([opportunity.status, opportunity.sourceStatus, opportunity.reviewStatus].join(" "));
  const availabilityText = normalizeText(searchableText);
  const deadline = parseDate(opportunity.deadlineDate) || parseDate(opportunity.endDate);
  const startDate = parseDate(opportunity.startDate) || parseDate(opportunity.releaseDate);
  const noDeadlineExplicit = /no deadline|no expiration|rolling|open until funds|until funds are exhausted/i.test(searchableText);
  const upcomingOrReopening =
    /\b(currently closed|not currently open|temporarily closed|expected to (?:open|reopen)|anticipated to (?:open|reopen)|expected to open again|will open again|next cycle is expected|future funding|unveiled later this year)\b/i.test(
      searchableText
    );
  const stalePastCycle =
    /\b(most recent application (?:deadline|period)|most recent funding round|most recent [^.]{0,60}(?:solicitation|round)[^.]{0,60}closed|previous application (?:deadline|period)|applications? closed (?:on|in)|round [^.]{0,40}deadline (?:was|is) [^.]{0,40}\b(?:2020|2021|2022|2023|2024|2025|january 2026|february 2026|march 2026|april 2026|may 2026|june 2026))\b/i.test(
      searchableText
    );
  const closedUntilFurtherNotice = /\b(?:applications?|grant applications?) (?:are )?(?:currently )?not being accepted until further notice\b/i.test(searchableText);
  const deadlineHasPassed =
    Boolean(opportunity.matchingParameters?.deadlineHasPassed) ||
    Boolean(deadline && deadline.getTime() < now.getTime());
  let normalizedStatus = "uncertain";
  const reasons = [];

  if (closedUntilFurtherNotice) {
    normalizedStatus = "unavailable";
    reasons.push("closed_until_further_notice");
  } else if (upcomingOrReopening) {
    normalizedStatus = "upcoming";
    reasons.push("upcoming_or_reopening_language");
  } else if (
    [...UNAVAILABLE_STATUS_VALUES].some((value) => statusText.includes(value)) ||
    availabilityText.includes("fully subscribed") ||
    availabilityText.includes("closed as of") ||
    availabilityText.includes("no longer accepting new applications") ||
    availabilityText.includes("not accepting new applications") ||
    availabilityText.includes("currently closed") ||
    availabilityText.includes("not currently open") ||
    stalePastCycle
  ) {
    normalizedStatus = "unavailable";
    reasons.push("source_status_unavailable");
  } else if (deadlineHasPassed && !noDeadlineExplicit) {
    normalizedStatus = "unavailable";
    reasons.push("deadline_has_passed");
  } else if (statusText.includes("upcoming") || (startDate && startDate.getTime() > now.getTime())) {
    normalizedStatus = "upcoming";
    reasons.push("upcoming_or_future_open");
  } else if (statusText.includes("active") || noDeadlineExplicit || opportunity.published === true) {
    normalizedStatus = noDeadlineExplicit ? "rolling" : "active";
    reasons.push(noDeadlineExplicit ? "rolling_language" : "active_or_published");
  }

  return {
    normalizedStatus,
    applicationOpenAt: startDate ? startDate.toISOString() : null,
    applicationDeadlineAt: deadline ? deadline.toISOString() : null,
    questionsDeadlineAt: parseDate(opportunity.questionsDeadline)?.toISOString() || null,
    programEndAt: parseDate(opportunity.endDate)?.toISOString() || null,
    recurring: /annual|annually|recurring|each year/i.test(searchableText),
    noDeadlineExplicit,
    lastVerifiedAt: opportunity.lastSeenAt || opportunity.updatedAt || null,
    confidence: reasons.length > 0 ? 0.78 : 0.45,
    reasons
  };
}

function extractGeography(opportunity, searchableText) {
  const states = unique([
    opportunity.state,
    extractStateCode(opportunity.stateName),
    extractStateCode(opportunity.geography?.state),
    extractStateCode(opportunity.matchingParameters?.zipCode?.state),
    extractStateCode(searchableText.length < 5000 ? searchableText : "")
  ].filter(Boolean));
  const include = states.map((stateCode) => ({
    kind: stateCode === "US" ? "nationwide" : "state",
    id: stateCode,
    confidence: stateCode === opportunity.state ? 0.95 : 0.72
  }));

  return {
    include,
    exclude: [],
    scopeStatus: include.length > 0 ? "known" : "unknown",
    confidence: include.length > 0 ? Math.max(...include.map((item) => item.confidence)) : 0.35
  };
}

function extractApplicant(opportunity, searchableText) {
  const sourceValues = [
    ...lookupNames(opportunity.eligibleSectors),
    ...lookupNames(opportunity.sectors),
    ...asArray(opportunity.parameterSets).flatMap((set) => lookupNames(set?.sectors)),
    ...asArray(opportunity.matchingParameters?.businessClassification?.values)
  ];
  const fromSource = sourceValues.map(canonicalOrganizationType).filter(Boolean);
  const fromText = inferApplicantTypesFromText(searchableText);
  const fromProgramFallback = fromSource.length === 0 && fromText.length === 0 ? inferApplicantTypesFromProgram(opportunity, searchableText) : [];
  const eligibleOrganizationTypes = unique([...fromSource, ...fromText, ...fromProgramFallback]);
  const residentialOnly =
    eligibleOrganizationTypes.includes("residential") &&
    !eligibleOrganizationTypes.some((type) => ["commercial", "industrial", "agricultural", "multifamily", "nonprofit", "government"].includes(type));

  return {
    eligibleOrganizationTypes,
    excludedOrganizationTypes: [],
    residentialOnly,
    confidence: eligibleOrganizationTypes.length > 0 ? 0.72 : 0.38
  };
}

function extractSite(opportunity, searchableText) {
  const facilityRequirements = extractFacilityRequirements(opportunity, searchableText);

  return {
    facilityEligibilityStatus: facilityRequirements.eligibilityStatus,
    eligibleBuildingTypes: facilityRequirements.eligibleBuildingTypes,
    evidenceText: facilityRequirements.evidenceText,
    reviewMethod: facilityRequirements.reviewMethod,
    sourceUrlsChecked: facilityRequirements.sourceUrlsChecked,
    fetchErrors: facilityRequirements.fetchErrors,
    reviewedAt: facilityRequirements.reviewedAt,
    ownershipRelationships: [],
    existingConstructionRequired: /existing building|existing facility|retrofit/i.test(searchableText) ? true : null,
    confidence: facilityRequirements.confidence
  };
}

function extractProject(opportunity, searchableText) {
  const technologyText = [
    ...lookupNames(opportunity.technologies),
    ...lookupNames(opportunity.technologyRecords),
    ...asArray(opportunity.parameterSets).flatMap((set) => lookupNames(set?.technologies)),
    ...asArray(opportunity.matchingParameters?.technologyTags),
    opportunity.canonicalTitle,
    opportunity.category,
    opportunity.programType,
    opportunity.summary,
    opportunity.sce?.sectionHeading,
    opportunity.sce?.sectionCategory,
    opportunity.sdge?.sectionHeading,
    opportunity.sdge?.sectionCategory,
    opportunity.svp?.sectionHeading,
    opportunity.svp?.sectionCategory,
    opportunity.cec?.program
  ].join(" ");
  const technologyIds = refineTechnologyIds(unique([
    ...canonicalTechnologiesFromText(technologyText),
    ...inferAdditionalTechnologiesFromText(technologyText)
  ]), technologyText);
  const fallbackTechnologyIds =
    technologyIds.length > 0
      ? technologyIds
      : refineTechnologyIds(unique([
          ...canonicalTechnologiesFromText(searchableText),
          ...inferAdditionalTechnologiesFromText(searchableText)
        ]), searchableText);
  const preapprovalRequired = /preapproval|pre-approval|before purchase|prior to purchase|before installation/i.test(searchableText);

  return {
    technologyIds: fallbackTechnologyIds,
    stageRequirements: preapprovalRequired ? ["preapproval_before_purchase"] : [],
    preapprovalRequired,
    confidence: fallbackTechnologyIds.length > 0 ? 0.72 : 0.34
  };
}

function refineTechnologyIds(technologyIds, technologyText) {
  const normalized = normalizeText(technologyText);
  let refined = [...technologyIds];

  if (
    refined.includes("battery_storage") &&
    !/(battery storage|energy storage|storage system|stationary storage|behind the meter storage)/i.test(technologyText) &&
    /(battery electric|electric vehicle|vehicle|fleet|zev)/i.test(technologyText)
  ) {
    refined = refined.filter((technologyId) => technologyId !== "battery_storage");
  }

  if (refined.includes("lighting") && !/(^|\s)(lighting|led|light emitting diode)(\s|$)/.test(normalized)) {
    refined = refined.filter((technologyId) => technologyId !== "lighting");
  }

  if (
    refined.includes("energy_efficiency") &&
    !/(energy efficiency|energy efficient|energy conservation|weatherization|home performance|whole building|custom measure|retrofit|comprehensive measures|efficient equipment|equipment efficiency)/i.test(technologyText) &&
    refined.some((technologyId) => ["ev_charging", "fleet_electrification", "clean_transportation"].includes(technologyId))
  ) {
    refined = refined.filter((technologyId) => technologyId !== "energy_efficiency");
  }

  if (
    refined.includes("hvac") &&
    refined.some((technologyId) => ["ev_charging", "fleet_electrification", "clean_transportation"].includes(technologyId)) &&
    /\b(fleet|vehicle|vehicles|transportation electrification|ev|electric vehicle|charging|hydrogen)\b/i.test(technologyText) &&
    !/\b(hvac|heat pump|air conditioner|air conditioning|chiller|boiler|furnace|space heating|space cooling|building electrification)\b/i.test(technologyText)
  ) {
    refined = refined.filter((technologyId) => technologyId !== "hvac");
  }

  return refined;
}

function extractConstraints(opportunity) {
  const constraints = [];
  const squareFootage = opportunity.matchingParameters?.squareFootage;
  if (squareFootage?.min != null || squareFootage?.max != null) {
    constraints.push({
      criterionId: "site.squareFootage",
      operator: squareFootage.min != null && squareFootage.max != null ? "between" : squareFootage.min != null ? "gte" : "lte",
      min: squareFootage.min ?? null,
      max: squareFootage.max ?? null,
      sourcePath: "matchingParameters.squareFootage",
      confidence: confidenceValue(squareFootage.confidence)
    });
  }
  const demandKw = opportunity.matchingParameters?.demandKw;
  if (demandKw?.min != null || demandKw?.max != null) {
    constraints.push({
      criterionId: "site.peakDemandKw",
      operator: demandKw.min != null && demandKw.max != null ? "between" : demandKw.min != null ? "gte" : "lte",
      min: demandKw.min ?? null,
      max: demandKw.max ?? null,
      sourcePath: "matchingParameters.demandKw",
      confidence: confidenceValue(demandKw.confidence)
    });
  }
  return constraints;
}

function buildOffers(opportunity, fallback) {
  const parameterSets = asArray(opportunity.parameterSets);
  if (parameterSets.length === 0) {
    return [
      {
        offerId: `${opportunity.opportunityId}:default`,
        sourcePath: "opportunity",
        sectors: fallback.applicant.eligibleOrganizationTypes,
        technologies: fallback.project.technologyIds,
        constraints: fallback.constraints,
        benefit: benefitFromOpportunity(opportunity),
        confidence: fallback.project.confidence
      }
    ];
  }

  return parameterSets.map((parameterSet, index) => ({
    offerId: `${opportunity.opportunityId}:parameter-set-${parameterSet.id || index + 1}`,
    sourcePath: `parameterSets[${index}]`,
    sectors: unique(lookupNames(parameterSet.sectors).map(canonicalOrganizationType).filter(Boolean)),
    technologies: unique(lookupNames(parameterSet.technologies).flatMap(canonicalTechnologiesFromText)),
    constraints: [],
    benefit: benefitFromParameterSet(parameterSet) || benefitFromOpportunity(opportunity),
    confidence: 0.68
  }));
}

function buildRuleGroups({ geography, utilityRequirements, applicant, site, project, constraints }) {
  const required = [];
  if (geography.scopeStatus === "known") required.push("site.geo.stateCode");
  if (utilityRequirements.restrictionStatus === "required") required.push("site.utility.electric.distributionUtilityId");
  if (applicant.eligibleOrganizationTypes.length > 0) required.push("business.organizationTypes");
  if (site.eligibleBuildingTypes.length > 0) required.push("site.buildingTypes");
  if (project.technologyIds.length > 0) required.push("project.technologyIds");
  for (const constraint of constraints) required.push(constraint.criterionId);
  return [{ groupId: "default-required", operator: "AND", required }];
}

function benefitFromOpportunity(opportunity) {
  return {
    basis: basisFromText([opportunity.programType, opportunity.summary].join(" ")),
    rawAmountText: firstDetailValue(opportunity.details, ["Incentive Amount", "Maximum Incentive"]) || opportunity.budget || null,
    currency: "USD"
  };
}

function benefitFromParameterSet(parameterSet) {
  const parameter = asArray(parameterSet.parameters).find((item) => item?.displayValue || item?.amountText || item?.amount);
  if (!parameter) return null;
  return {
    basis: basisFromText([parameter.units, parameter.source].join(" ")),
    amount: typeof parameter.amount === "number" ? parameter.amount : null,
    rawAmountText: parameter.displayValue || parameter.amountText || null,
    units: parameter.units || null,
    currency: String(parameter.units || "").includes("$") ? "USD" : null
  };
}

function basisFromText(value) {
  const text = normalizeText(value);
  if (text.includes("loan") || text.includes("financing")) return "financing";
  if (text.includes("tax")) return "tax_benefit";
  if (text.includes("kwh")) return "per_kwh";
  if (text.includes("kw")) return "per_kw";
  if (text.includes("unit")) return "per_unit";
  if (text.includes("cost") || text.includes("%")) return "percentage_of_cost";
  return "unknown";
}

function matchabilityFor({ availability, geography, applicant, project, overallConfidence }) {
  if (availability.normalizedStatus === "unavailable") return "unavailable";
  if (overallConfidence < 0.45) return "insufficient_data";
  if (geography.scopeStatus === "unknown" || applicant.eligibleOrganizationTypes.length === 0 || project.technologyIds.length === 0) {
    return "review_only";
  }
  return "automatic";
}

function estimateOverallConfidence({ opportunity, availability, geography, utilityRequirements, applicant, project }) {
  const quality = opportunity.dataQuality?.status === "clean" ? 0.82 : opportunity.dataQuality?.status === "clean_with_warnings" ? 0.62 : 0.52;
  return round(
    (quality + availability.confidence + geography.confidence + utilityRequirements.confidence + applicant.confidence + project.confidence) / 6
  );
}

function factsFromValues(criterionId, values, sectionRole, opportunity, sourcePath) {
  return values.map((value) => ({
    criterionId,
    value,
    operator: "in",
    polarity: "required",
    sourcePath,
    evidenceText: evidenceSnippet(opportunity, sourcePath),
    sectionRole,
    confidence: 0.72,
    resolutionStatus: "accepted"
  }));
}

function evidenceSnippet(opportunity, sourcePath) {
  if (sourcePath === "state") return [opportunity.state, opportunity.stateName].filter(Boolean).join(" / ");
  if (sourcePath === "sectors") return lookupNames(opportunity.eligibleSectors || opportunity.sectors).slice(0, 6).join(", ");
  if (sourcePath === "technologies") return lookupNames(opportunity.technologies || opportunity.technologyRecords).slice(0, 6).join(", ");
  return String(sourcePath || "");
}

function inferApplicantTypesFromText(value) {
  const text = normalizeText(value);
  const types = [];
  if (/\b(commercial|business|businesses|company|companies|customers?|site hosts?|owners? and operators?|workplace|building owners?|property owners?)\b/.test(text)) {
    types.push("commercial");
  }
  if (/\b(industrial|manufacturing|manufacturer|manufacturers|factory|plant|process|production)\b/.test(text)) types.push("industrial");
  if (/\b(agricultural|agriculture|farm|farms|farmer|ranch|greenhouse)\b/.test(text)) types.push("agricultural");
  if (/\b(multifamily|multi family|multi unit|multiunit|apartment|apartments|condominium|condo|rental apartment|homeowners association|hoa)\b/.test(text)) {
    types.push("multifamily");
  }
  if (/\b(nonprofit|non profit|not for profit|501 c 3|charitable)\b/.test(text)) types.push("nonprofit");
  if (/\b(government|public agency|municipal|municipality|municipalities|city|county|state agency|local government|public school|school district|transit agency|tribal)\b/.test(text)) {
    types.push("government");
  }
  if (/\b(school|schools|charter school|intermediate unit|university|college)\b/.test(text)) {
    types.push("government", "nonprofit");
  }
  if (/\b(fleet|fleets|fleet owner|fleet owners|vehicle owner|vehicle owners|transit|port authority|transportation provider|site host|site hosts)\b/.test(text)) {
    types.push("commercial", "government");
  }
  if (/\b(residential|resident|residents|homeowner|homeowners|renter|renters|household|households|single family|single family home|owner occupied|manufactured home|mobile home)\b/.test(text)) {
    types.push("residential");
  }
  if (/\b(home|homes|house|houses)\b/.test(text) && /\b(energy|weatherization|electrification|heat pump|appliance|rebate|loan)\b/.test(text)) {
    types.push("residential");
  }
  if (/\b(corporate tax|corporation|corporations)\b/.test(text)) types.push("commercial");
  if (/\b(personal tax|individual taxpayer|taxpayer|taxpayers)\b/.test(text)) types.push("residential");
  if (/\b(eligible applicants?|applicants?|borrowers?|members?)\b/.test(text) && /\b(business|commercial|industrial|agricultural|nonprofit|government|residential|homeowner)\b/.test(text)) {
    if (text.includes("business") || text.includes("commercial")) types.push("commercial");
    if (text.includes("industrial")) types.push("industrial");
    if (text.includes("agricultural")) types.push("agricultural");
    if (text.includes("nonprofit") || text.includes("non profit")) types.push("nonprofit");
    if (text.includes("government")) types.push("government");
    if (text.includes("residential") || text.includes("homeowner")) types.push("residential");
  }
  return unique(types);
}

function inferApplicantTypesFromProgram(opportunity, searchableText) {
  const text = normalizeText([
    opportunity.canonicalTitle,
    opportunity.normalizedTitle,
    opportunity.programType,
    opportunity.administrator,
    searchableText
  ].join(" "));
  const types = [];

  if (/\b(national electric vehicle infrastructure|nevi|clean transportation|clean diesel|diesel emission|diesel emissions|alternative fuel|clean fleet|vehicle infrastructure|public charger|qualified bidders|site hosts?|park and plug|dcfc)\b/.test(text)) {
    types.push("commercial", "government", "nonprofit");
  }
  if (/\b(?:people who purchase|individuals? who purchase|taxpayers? who purchase|motor vehicle purchase|light duty motor vehicle|buy a new or used ev|new or used ev|hybrid vehicles?)\b/.test(text)) {
    types.push("residential", "commercial");
  }
  if (/\b(home|residential|household|homeowner|renter|wood heating fuel|personal tax)\b/.test(text)) {
    types.push("residential");
  }
  if (/\b(corporate tax|industry recruitment|manufactur|new and expanded industry|production|assembly)\b/.test(text)) {
    types.push("commercial", "industrial");
  }
  if (/\b(property tax|sales tax|use tax|tax exemption|tax credit|tax deduction|tax incentive)\b/.test(text)) {
    types.push("residential", "commercial", "industrial", "agricultural", "nonprofit", "government");
  }
  if (/\b(pace financing|c pace|energy project financing|loan program|on bill financing|sustainable energy fund)\b/.test(text)) {
    types.push("commercial", "government", "nonprofit", "residential");
  }
  if (/\b(school|schools|university|college)\b/.test(text)) {
    types.push("government", "nonprofit");
  }

  return unique(types);
}

function inferAdditionalTechnologiesFromText(value) {
  const text = normalizeText(value);
  const technologies = [];
  if (/\b(renewable energy|renewables|alternative energy|clean energy|electric power generation|generation equipment|wind energy|solar energy|hydroelectric|geothermal energy|biogas|biomass|on farm energy production)\b/.test(text)) {
    technologies.push("renewable_energy", "solar");
  }
  if (/\b(wind energy|wind power|wind turbine)\b/.test(text)) technologies.push("wind", "renewable_energy");
  if (/\b(biogas|biomass|methane digester|anaerobic digester|wood biomass|forest derived biomass)\b/.test(text)) {
    technologies.push("biomass_biogas", "renewable_energy");
  }
  if (/\b(wood heating|heating fuel|refuse derived fuel)\b/.test(text)) technologies.push("wood_heating");
  if (/\b(home electrification|building electrification|electrify|electrification|steam to electric|heat pump|appliance rebate)\b/.test(text)) {
    technologies.push("hvac", "energy_efficiency");
  }
  if (/\b(energy conservation|energy conserving|energy efficient|energy efficiency|efficiency of homes|weatherization|home performance|energy audit|retro commissioning|retrocommissioning|farm wiring|business energy financing|gogreen business|energy financing)\b/.test(text)) {
    technologies.push("energy_efficiency");
  }
  if (/\b(green building|leed|energy star|efficient building|building performance|density bonus)\b/.test(text)) {
    technologies.push("energy_efficiency", "building_envelope");
  }
  if (/\b(alternative fuel|clean fuel|clean diesel|clean fleet|clean transportation|emission reduction|emissions reduction|diesel emission|diesel emissions|low emission vehicle|ultra low emission|hybrid vehicles?|zero emission|zero emission vehicle|zero tailpipe emission|motor vehicle purchase|vehicle rebate|electric transit bus|electric transit buses|passenger electric vehicle|light duty motor vehicle|replacement bus|school bus|shuttle bus|transit bus|port drayage|shore power|freight switcher|cargo handling equipment|airport ground support|electric forklift|forklift)\b/.test(text)) {
    technologies.push("fleet_electrification", "clean_transportation");
  }
  if (/\b(ev|electric vehicle|charging corridor|charging infrastructure|charging station|evse|dcfc|public charger|public dcfc|park and plug)\b/.test(text)) {
    technologies.push("ev_charging");
  }
  if (/\b(appliance|efficient appliances|water heater|water heating)\b/.test(text)) {
    technologies.push("energy_efficiency");
  }
  if (/\b(storage|battery)\b/.test(text) && /\b(energy|solar|electric|behind the meter)\b/.test(text)) {
    technologies.push("battery_storage");
  }
  if (/\b(hydrogen fuel cell|hydrogen fuel cells|fuel cell|fuel cells|hydrogen refueling|clean hydrogen)\b/.test(text)) {
    technologies.push("fuel_cell_system", "clean_transportation");
  }
  if (/\b(wood stove|wood fireplace|gas fired fireplace|gas fireplace|wood heater|wood heating|qualified fireplace)\b/.test(text)) {
    technologies.push("wood_heating", "hvac");
  }
  if (/\b(pace financing|c pace|property assessed capital expenditure|qualifying improvements|sustainable energy fund|energy project financing|on bill financing)\b/.test(text)) {
    technologies.push("energy_efficiency", "solar", "battery_storage");
  }
  if (/\b(economic development rate|rate discount|monthly bill discount|electric portion of the monthly bill)\b/.test(text)) {
    technologies.push("business_support", "demand_response");
  }
  if (/\b(gas processing facilities|gas processing facility|natural gas processing)\b/.test(text)) {
    technologies.push("natural_gas_processing");
  }
  if (/\b(direct air capture|carbon dioxide removal|carbon removal|carbon capture|carbon management)\b/.test(text)) {
    technologies.push("carbon_management");
  }
  if (/\b(economic development services|competitive edge|specialized consulting services|community development financial institution|cdfi|capital coaching and connections|business loan|sustainable businesses that generate jobs)\b/.test(text)) {
    technologies.push("business_support");
  }
  if (/\b(equipment upgrades|operations and maintenance practices|improving operations)\b/.test(text)) {
    technologies.push("energy_efficiency");
  }
  return unique(technologies);
}

function lookupNames(value) {
  return asArray(value)
    .flatMap((item) => {
      if (item == null) return [];
      if (typeof item === "string") return [item];
      if (typeof item === "object") return [item.name, item.label, item.value, item.slug, item.id].filter(Boolean);
      return [String(item)];
    })
    .filter(Boolean);
}

function firstDetailValue(details, labels) {
  const normalizedLabels = labels.map(normalizeText);
  const detail = asArray(details).find((item) => normalizedLabels.includes(normalizeText(item?.label)));
  return detail?.value || null;
}

function addSegment(segments, sourcePath, text, sourceUrl = null, retrievedAt = null) {
  const cleanText = stripHtml(text);
  if (!cleanText) return;
  segments.push({
    sourcePath,
    heading: null,
    text: cleanText,
    sourceUrl,
    retrievedAt
  });
}

function addObjectSegments(segments, sourcePath, value) {
  if (value == null || value === "") return;
  const text = typeof value === "string" ? value : JSON.stringify(value);
  addSegment(segments, sourcePath, text);
}

function stripHtml(value) {
  return String(value || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function parseDate(value) {
  if (!value) return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function confidenceValue(value) {
  if (value === "high") return 0.86;
  if (value === "medium") return 0.62;
  if (value === "low") return 0.38;
  if (typeof value === "number") return value;
  return 0.5;
}

function hashText(value) {
  return crypto.createHash("sha256").update(String(value || "")).digest("hex");
}

function round(value) {
  return Math.round(value * 100) / 100;
}
