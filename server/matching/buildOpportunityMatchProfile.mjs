import crypto from "node:crypto";
import {
  asArray,
  canonicalBuildingType,
  canonicalOrganizationType,
  canonicalTechnologiesFromText,
  canonicalUtilityId,
  extractStateCode,
  normalizeText,
  unique
} from "./ontologies.mjs";

export const MATCH_PROFILE_SCHEMA_VERSION = "opportunity-match-profile-v1";
export const MATCH_PROFILE_EXTRACTOR_VERSION = "rules-2026-06-25-v1";

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
      utilityRequirements.requiredUtilityIds,
      "utility",
      opportunity,
      "matchingParameters.utilityProvider"
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
  const statusText = normalizeText([opportunity.status, opportunity.sourceStatus, opportunity.reviewStatus].join(" "));
  const availabilityText = normalizeText(searchableText);
  const deadline = parseDate(opportunity.deadlineDate) || parseDate(opportunity.endDate);
  const startDate = parseDate(opportunity.startDate) || parseDate(opportunity.releaseDate);
  const noDeadlineExplicit = /no deadline|no expiration|rolling|open until funds|until funds are exhausted/i.test(searchableText);
  const deadlineHasPassed =
    Boolean(opportunity.matchingParameters?.deadlineHasPassed) ||
    Boolean(deadline && deadline.getTime() < now.getTime());
  let normalizedStatus = "uncertain";
  const reasons = [];

  if (
    [...UNAVAILABLE_STATUS_VALUES].some((value) => statusText.includes(value)) ||
    availabilityText.includes("fully subscribed") ||
    availabilityText.includes("closed as of") ||
    availabilityText.includes("no longer accepting new applications") ||
    availabilityText.includes("not accepting new applications")
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

function extractUtilityRequirements(opportunity, searchableText) {
  const explicitValues = asArray(opportunity.matchingParameters?.utilityProvider?.values)
    .filter((value) => normalizeText(value) !== "any")
    .map(canonicalUtilityId)
    .filter(Boolean);
  const sourceUtility = utilityIdFromSource(opportunity.sourceKey);
  const textUtilities = unique([
    canonicalUtilityId(opportunity.administrator),
    canonicalUtilityId(opportunity.canonicalTitle),
    canonicalUtilityId(searchableText.length < 8000 ? searchableText : "")
  ].filter(Boolean));
  const requiredUtilityIds = unique([...explicitValues, sourceUtility, ...textUtilities]);

  return {
    requiredUtilityIds,
    allowedSupplierIds: [],
    rateClasses: [],
    customerRelationshipRequired: /customer of record|account holder|electric customer|utility customer/i.test(searchableText),
    confidence: explicitValues.length > 0 || sourceUtility ? 0.86 : requiredUtilityIds.length > 0 ? 0.62 : 0.42
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
  const eligibleOrganizationTypes = unique([...fromSource, ...fromText]);
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
  const eligibleBuildingTypes = unique([
    ...inferBuildingTypesFromText(searchableText),
    ...asArray(opportunity.matchingParameters?.businessClassification?.values).map(canonicalBuildingType)
  ].filter(Boolean));

  return {
    eligibleBuildingTypes,
    ownershipRelationships: [],
    existingConstructionRequired: /existing building|existing facility|retrofit/i.test(searchableText) ? true : null,
    confidence: eligibleBuildingTypes.length > 0 ? 0.58 : 0.35
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
    ...canonicalTechnologiesFromText(technologyText)
  ]), technologyText);
  const preapprovalRequired = /preapproval|pre-approval|before purchase|prior to purchase|before installation/i.test(searchableText);

  return {
    technologyIds,
    stageRequirements: preapprovalRequired ? ["preapproval_before_purchase"] : [],
    preapprovalRequired,
    confidence: technologyIds.length > 0 ? 0.74 : 0.34
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
  if (utilityRequirements.requiredUtilityIds.length > 0) required.push("site.utility.electric.distributionUtilityId");
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
  for (const candidate of ["commercial", "industrial", "agricultural", "multifamily", "nonprofit", "government", "residential"]) {
    if (text.includes(candidate)) types.push(candidate);
  }
  if (text.includes("business")) types.push("commercial");
  if (text.includes("school") || text.includes("public agency")) types.push("government");
  return unique(types);
}

function inferBuildingTypesFromText(value) {
  const text = normalizeText(value);
  const buildingWords = ["restaurant", "grocery", "hotel", "hospitality", "warehouse", "office", "retail", "multifamily", "medical", "dental"];
  return unique(buildingWords.map((word) => (text.includes(word) ? canonicalBuildingType(word) : null)).filter(Boolean));
}

function utilityIdFromSource(sourceKey) {
  if (sourceKey === "SOURCE_SDGE_BUSINESS") return "UTIL_SDGE";
  if (sourceKey === "SOURCE_SCE_BUSINESS") return "UTIL_SCE";
  if (sourceKey === "SOURCE_SILICON_VALLEY_POWER") return "UTIL_SVP";
  return null;
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
