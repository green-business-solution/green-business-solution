import { asArray, canonicalUtilityId, normalizeText, unique } from "./ontologies.mjs";

export const UTILITY_RESTRICTION_STATUSES = [
  "required",
  "none",
  "not_applicable",
  "none_found_after_review",
  "unknown"
];

const NO_RESTRICTION_VALUES = new Set(["any", "all", "none", "no restriction", "not applicable", "n a"]);

export function extractUtilityRequirements(opportunity, searchableText) {
  const reviewed = normalizeUtilityRestrictionReview(opportunity.utilityRestrictionReview);
  if (reviewed) return reviewed;
  return inferUtilityRequirements(opportunity, searchableText, {
    reviewMethod: "deterministic_source_corpus"
  });
}

export function inferUtilityRequirements(
  opportunity,
  searchableText,
  { fetchErrors = [], reviewedAt = null, reviewMethod = "deterministic_source_corpus", sourceUrlsChecked = [] } = {}
) {
  const explicitRawValues = asArray(opportunity.matchingParameters?.utilityProvider?.values)
    .map((value) => String(value || "").trim())
    .filter(Boolean);
  const explicitNoRestriction = explicitRawValues.some((value) => NO_RESTRICTION_VALUES.has(normalizeText(value)));
  const explicitRequiredValues = explicitRawValues.filter((value) => !NO_RESTRICTION_VALUES.has(normalizeText(value)));
  const explicitMappedIds = explicitRequiredValues.map(canonicalUtilityId).filter(Boolean);
  const explicitRequiredNames = explicitRequiredValues.filter((value) => !canonicalUtilityId(value));
  const sourceUtility = utilityIdFromSource(opportunity.sourceKey);
  const relationshipUtilities = inferUtilitiesFromRelationshipText(searchableText);
  const textUtilities = unique([
    canonicalUtilityId(opportunity.administrator),
    canonicalUtilityId(opportunity.canonicalTitle),
    canonicalUtilityId(searchableText.length < 12000 ? searchableText : "")
  ].filter(Boolean));
  const inferredNames = inferRequiredUtilityNames(opportunity);
  const requiredUtilityIds = unique([...explicitMappedIds, sourceUtility, ...textUtilities, ...relationshipUtilities.requiredUtilityIds]);
  const requiredUtilityNames = unique(
    [...explicitRequiredNames, ...inferredNames, ...relationshipUtilities.requiredUtilityNames].filter((name) => !canonicalUtilityId(name))
  );
  const customerRelationshipRequired =
    /customer of record|account holder|electric customer|utility customer|customers of|served by|service territory|ratepayer/i.test(searchableText);
  const hasUtilityRequirement = requiredUtilityIds.length > 0 || requiredUtilityNames.length > 0;
  const restrictionStatus = restrictionStatusFor({
    explicitNoRestriction,
    hasUtilityRequirement,
    opportunity,
    searchableText,
    customerRelationshipRequired
  });
  const evidenceText = evidenceTextFor({
    explicitRawValues,
    inferredNames,
    opportunity,
    restrictionStatus,
    searchableText
  });

  return {
    restrictionStatus,
    requiredUtilityIds,
    requiredUtilityNames,
    allowedSupplierIds: [],
    rateClasses: [],
    customerRelationshipRequired,
    evidenceText,
    reviewMethod,
    sourceUrlsChecked,
    fetchErrors,
    reviewedAt,
    confidence: confidenceFor({ explicitRawValues, hasUtilityRequirement, restrictionStatus, sourceUtility })
  };
}

export function normalizeUtilityRestrictionReview(review) {
  if (!review || typeof review !== "object") return null;
  const restrictionStatus = UTILITY_RESTRICTION_STATUSES.includes(review.restrictionStatus)
    ? review.restrictionStatus
    : "unknown";
  return {
    restrictionStatus,
    requiredUtilityIds: unique(asArray(review.requiredUtilityIds).filter(Boolean)),
    requiredUtilityNames: unique(asArray(review.requiredUtilityNames).filter(Boolean)),
    allowedSupplierIds: unique(asArray(review.allowedSupplierIds).filter(Boolean)),
    rateClasses: unique(asArray(review.rateClasses).filter(Boolean)),
    customerRelationshipRequired: Boolean(review.customerRelationshipRequired),
    evidenceText: review.evidenceText || null,
    reviewMethod: review.reviewMethod || "stored_review",
    sourceUrlsChecked: unique(asArray(review.sourceUrlsChecked).filter(Boolean)),
    fetchErrors: asArray(review.fetchErrors),
    reviewedAt: review.reviewedAt || null,
    confidence: typeof review.confidence === "number" ? review.confidence : 0.5
  };
}

function restrictionStatusFor({ explicitNoRestriction, hasUtilityRequirement, opportunity, searchableText, customerRelationshipRequired }) {
  if (hasUtilityRequirement) return "required";
  if (explicitNoRestriction || explicitlyNoUtilityRestriction(searchableText)) return "none";
  if (isStronglyUtilityNotApplicableProgram(opportunity, searchableText)) return "not_applicable";
  if (customerRelationshipRequired || isLikelyUtilityAdministered(opportunity)) return "unknown";
  if (isUtilityNotApplicableProgram(opportunity, searchableText)) return "not_applicable";
  return "none_found_after_review";
}

function inferRequiredUtilityNames(opportunity) {
  const candidates = [
    utilityNameFromTitle(opportunity.canonicalTitle),
    utilityNameFromTitle(opportunity.normalizedTitle),
    isLikelyUtilityName(opportunity.administrator) ? opportunity.administrator : null,
    isLikelyUtilityName(opportunity.sourceName) ? opportunity.sourceName : null
  ];
  return unique(candidates.map(cleanUtilityName).filter(Boolean));
}

function utilityNameFromTitle(title) {
  const value = String(title || "").trim();
  const separatorIndex = value.search(/\s[-–]\s|\)[-–]\s/);
  const prefix = separatorIndex >= 0 ? value.slice(0, separatorIndex) : "";
  if (!prefix || prefix === value) return null;
  return isLikelyUtilityName(prefix) ? prefix : null;
}

function isLikelyUtilityAdministered(opportunity) {
  return [opportunity.canonicalTitle, opportunity.normalizedTitle, opportunity.administrator, opportunity.sourceName].some(isLikelyUtilityName);
}

function isLikelyUtilityName(value) {
  const text = normalizeText(value);
  if (!text) return false;
  if (canonicalUtilityId(text)) return true;
  if (/(department of energy|energy commission|energy office|energy authority|energy research|energy administration|energy division)/.test(text)) {
    return false;
  }
  return /(\belectric\b|\butility\b|\butilities\b|\bpower\b|\bgas\b|\blighting plant\b|\bmunicipal lighting\b|\bpud\b|\bpublic utility district\b|\birrigation district\b|\bpublic service company\b|\bcooperative\b|\bco op\b|\baep\b|\bswepco\b|\bentergy\b|\boncor\b|\bcenterpoint\b|\bsrp\b|\bsalt river project\b|\bappalachian power\b|\bblack hills energy\b|\bwe energies\b|\bmidamerican energy\b|\bduquesne light\b|\bholy cross energy\b|\beversource\b|\bunited illuminating\b|\bsocalgas\b|\bso cal gas\b|\bsouthern california gas\b|\bportland general electric\b|\bpacific power\b|\bnw natural\b|\bavista\b|\bnational grid\b|\bunitil\b|\bberkshire gas\b|\bliberty utilities\b|\bcape light compact\b|\bpseg\b|\bpuget sound energy\b|\bdominion energy\b|\bgreen mountain power\b|\bcolumbia water and light\b|\breading municipal light\b|\blansing board of water\b|\bbwl\b|\bconnexus energy\b|\bsmeco\b|\bcentral hudson\b|\bpenelec\b|\bmet ed\b|\baes indiana\b|\bconsumers energy\b|\bspire\b|\brhode island energy\b|\blower valley energy\b|\bhawaiian electric\b|\bheco\b|\bmaui electric\b)/.test(text);
}

function inferUtilitiesFromRelationshipText(searchableText) {
  const ids = [];
  const names = [];
  const patterns = [
    /(?:customers?|members?)\s+of\s+([^.;\n]{3,220})/gi,
    /(?:served|serviced)\s+by\s+([^.;\n]{3,220})/gi,
    /service\s+territor(?:y|ies)\s+of\s+([^.;\n]{3,220})/gi,
    /within\s+(?:the\s+)?service\s+territor(?:y|ies)\s+(?:of|served\s+by)\s+([^.;\n]{3,220})/gi,
    /located\s+within\s+([^.;\n]{3,160}?\s+service\s+territor(?:y|ies))/gi
  ];

  for (const pattern of patterns) {
    for (const match of String(searchableText || "").matchAll(pattern)) {
      for (const candidate of splitUtilityCandidates(match[1])) {
        const id = canonicalUtilityId(candidate);
        if (id) {
          ids.push(id);
        } else if (isLikelyUtilityName(candidate)) {
          names.push(cleanUtilityName(candidate));
        }
      }
    }
  }

  return {
    requiredUtilityIds: unique(ids),
    requiredUtilityNames: unique(names.filter(Boolean))
  };
}

function splitUtilityCandidates(value) {
  const cleaned = String(value || "")
    .replace(/\([^)]*(?:service territory|program|rebate|incentive)[^)]*\)/gi, " ")
    .replace(/\b(?:only|to receive|in order|must|may|can|who|that|with projects|for projects|if|and are|are eligible|is eligible|will)\b[\s\S]*$/i, "")
    .replace(/\s+/g, " ")
    .trim();
  if (!cleaned || /one of the|participating utilities|member utilities|investor owned utilities|any of the state/i.test(cleaned)) {
    return [];
  }
  return cleaned
    .split(/\s*(?:,|;|\band\/or\b|\bor\b|\band\b)\s*/i)
    .map((candidate) => candidate.replace(/\b(?:customers?|members?|ratepayers?|service territory|service territories|eligible buildings?|properties|homes|facilities)\b/gi, " "))
    .map(cleanUtilityName)
    .filter((candidate) => candidate.length >= 2);
}

function explicitlyNoUtilityRestriction(searchableText) {
  return /no utility restriction|any electric utility|any utility|all utility customers|not tied to a utility|utility provider does not matter/i.test(searchableText);
}

function isUtilityNotApplicableProgram(opportunity, searchableText) {
  const text = normalizeText(
    [
      opportunity.sourceName,
      opportunity.sourceKey,
      opportunity.category,
      opportunity.programType,
      opportunity.canonicalTitle,
      searchableText.slice(0, 1200)
    ].join(" ")
  );
  if (isStronglyUtilityNotApplicableProgram(opportunity, searchableText)) return true;
  if (/(federal|us department|u s department|usda|department of energy|treasury)/.test(text)) return true;
  if (/(state grant|solicitation|loan guarantee|pace|bond|financing|grant program)/.test(text) && !/(utility customer|electric customer|customers of|served by)/.test(text)) {
    return true;
  }
  return false;
}

function isStronglyUtilityNotApplicableProgram(opportunity, searchableText) {
  const text = normalizeText(
    [
      opportunity.sourceName,
      opportunity.sourceKey,
      opportunity.category,
      opportunity.programType,
      opportunity.canonicalTitle,
      opportunity.summary,
      searchableText.slice(0, 1200)
    ].join(" ")
  );
  return /(\btax credit\b|\btax deduction\b|\btax exemption\b|\btax incentive\b|\bfee exemption\b|\baccelerated cost recovery\b|\bmacrs\b|\bproperty tax\b|\bsales tax\b|\bincome tax\b|\bnevi\b|\bnational electric vehicle infrastructure\b|\bformula grant\b|\brenewable energy credit\b|\bsolar alternative energy credit\b|\bsolar renewable energy credit\b|\bsrec\b|\brenewable portfolio standard\b|\brps\b)/.test(text);
}

function evidenceTextFor({ explicitRawValues, inferredNames, opportunity, restrictionStatus, searchableText }) {
  if (explicitRawValues.length > 0) return `matchingParameters.utilityProvider: ${explicitRawValues.join(", ")}`;
  if (inferredNames.length > 0) return `Inferred from utility-like source/title/administrator: ${inferredNames.join(", ")}`;
  if (restrictionStatus === "not_applicable") return "Program type/source appears not utility-gated.";
  if (restrictionStatus === "none_found_after_review") return "No utility restriction language was found in the reviewed source corpus.";
  const match = searchableText.match(/.{0,80}(utility customer|electric customer|customers of|served by|service territory|ratepayer).{0,120}/i);
  return match ? match[0].trim() : [opportunity.canonicalTitle, opportunity.administrator].filter(Boolean).join(" / ");
}

function confidenceFor({ explicitRawValues, hasUtilityRequirement, restrictionStatus, sourceUtility }) {
  if (explicitRawValues.length > 0 || sourceUtility) return 0.9;
  if (hasUtilityRequirement) return 0.78;
  if (restrictionStatus === "none" || restrictionStatus === "not_applicable") return 0.82;
  if (restrictionStatus === "none_found_after_review") return 0.7;
  return 0.42;
}

function utilityIdFromSource(sourceKey) {
  if (sourceKey === "SOURCE_SDGE_BUSINESS") return "UTIL_SDGE";
  if (sourceKey === "SOURCE_SCE_BUSINESS") return "UTIL_SCE";
  if (sourceKey === "SOURCE_SILICON_VALLEY_POWER") return "UTIL_SVP";
  return null;
}

function cleanUtilityName(value) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\s+(business programs|programs)$/i, "");
}
