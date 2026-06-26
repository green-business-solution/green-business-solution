import { asArray, normalizeText, unique } from "./ontologies.mjs";

export const FACILITY_ELIGIBILITY_STATUSES = [
  "required",
  "broad_nonresidential",
  "broad_commercial",
  "broad_residential",
  "none",
  "not_applicable",
  "none_found_after_review",
  "unknown"
];

const APPLICANT_ONLY_CLASSIFICATIONS = new Set(["commercial", "government", "nonprofit", "public_sector", "small_business", "unknown"]);

const CLASSIFICATION_FACILITY_TYPES = {
  agricultural: ["agricultural_facility"],
  data_center: ["data_center"],
  education: ["education_campus"],
  food_service: ["restaurant_foodservice"],
  healthcare: ["healthcare"],
  industrial: ["industrial_manufacturing"],
  lodging_hospitality: ["hospitality_lodging"],
  multifamily: ["multifamily_residential"],
  retail: ["retail_storefront"]
};

export function extractFacilityRequirements(opportunity, searchableText) {
  const reviewed = normalizeFacilityEligibilityReview(opportunity.facilityEligibilityReview);
  if (reviewed) return reviewed;
  return inferFacilityRequirements(opportunity, searchableText, {
    reviewMethod: "deterministic_source_corpus"
  });
}

export function inferFacilityRequirements(
  opportunity,
  searchableText,
  { fetchErrors = [], reviewedAt = null, reviewMethod = "deterministic_source_corpus", sourceUrlsChecked = [] } = {}
) {
  const classificationValues = asArray(opportunity.matchingParameters?.businessClassification?.values)
    .map((value) => normalizeText(value))
    .filter(Boolean);
  const sourceText = sourceFacilityText(opportunity);
  const reviewText = [sourceText, searchableText.slice(0, 16000)].filter(Boolean).join("\n");
  const eligibleBuildingTypes = unique([
    ...facilityTypesFromBusinessClassifications(classificationValues),
    ...inferFacilityTypesFromText(reviewText)
  ]);
  const hasSpecificFacilityTypes = eligibleBuildingTypes.length > 0;
  const eligibilityStatus = facilityStatusFor({
    classificationValues,
    eligibleBuildingTypes,
    opportunity,
    searchableText,
    sourceText,
    reviewText
  });

  return {
    eligibilityStatus,
    eligibleBuildingTypes,
    evidenceText: evidenceTextFor({ classificationValues, eligibleBuildingTypes, eligibilityStatus, opportunity, sourceText: reviewText }),
    reviewMethod,
    sourceUrlsChecked,
    fetchErrors,
    reviewedAt,
    confidence: confidenceFor({ eligibilityStatus, hasSpecificFacilityTypes, classificationValues })
  };
}

export function normalizeFacilityEligibilityReview(review) {
  if (!review || typeof review !== "object") return null;
  const eligibilityStatus = FACILITY_ELIGIBILITY_STATUSES.includes(review.eligibilityStatus)
    ? review.eligibilityStatus
    : "unknown";
  return {
    eligibilityStatus,
    eligibleBuildingTypes: unique(asArray(review.eligibleBuildingTypes).filter(Boolean)),
    evidenceText: review.evidenceText || null,
    reviewMethod: review.reviewMethod || "stored_review",
    sourceUrlsChecked: unique(asArray(review.sourceUrlsChecked).filter(Boolean)),
    fetchErrors: asArray(review.fetchErrors),
    reviewedAt: review.reviewedAt || null,
    confidence: typeof review.confidence === "number" ? review.confidence : 0.5
  };
}

export function buildingTypesOverlap(userBuildingTypes, eligibleBuildingTypes, eligibilityStatus) {
  const userTypes = unique(asArray(userBuildingTypes));
  const eligibleTypes = unique(asArray(eligibleBuildingTypes));
  if (["none", "not_applicable", "none_found_after_review"].includes(eligibilityStatus)) return true;
  if (eligibilityStatus === "broad_nonresidential") return userTypes.some(isNonresidentialFacilityType);
  if (eligibilityStatus === "broad_commercial") return userTypes.some(isCommercialFacilityType);
  if (eligibilityStatus === "broad_residential") return userTypes.some(isResidentialFacilityType);
  if (userTypes.some((type) => eligibleTypes.includes(type))) return true;
  if (eligibleTypes.includes("any_site")) return true;
  if (eligibleTypes.includes("nonresidential") && userTypes.some(isNonresidentialFacilityType)) return true;
  if (eligibleTypes.includes("commercial") && userTypes.some(isCommercialFacilityType)) return true;
  if (eligibleTypes.includes("residential") && userTypes.some(isResidentialFacilityType)) return true;
  if (userTypes.includes("mixed_use") && eligibleTypes.some((type) => ["commercial", "nonresidential", "multifamily_residential"].includes(type))) {
    return true;
  }
  return false;
}

function facilityTypesFromBusinessClassifications(classificationValues) {
  return unique(
    classificationValues.flatMap((value) => {
      if (APPLICANT_ONLY_CLASSIFICATIONS.has(value)) return [];
      return CLASSIFICATION_FACILITY_TYPES[value] || [];
    })
  );
}

function sourceFacilityText(opportunity) {
  return [
    opportunity.canonicalTitle,
    opportunity.normalizedTitle,
    opportunity.summary,
    opportunity.category,
    opportunity.programType,
    JSON.stringify(opportunity.matchingParameters || {})
  ]
    .filter(Boolean)
    .join("\n");
}

function inferFacilityTypesFromText(value) {
  const text = normalizeText(value);
  const types = [];
  const checks = [
    ["multifamily_residential", /\b(multifamily|multi family|apartment|condominium|condo building)\b/],
    ["restaurant_foodservice", /\b(restaurant|commercial kitchen|food service|foodservice)\b/],
    ["grocery_food_retail", /\b(grocery|convenience store|cold storage|food storage|supermarket)\b/],
    ["hospitality_lodging", /\b(hotel|motel|lodging|hospitality)\b/],
    ["warehouse_logistics", /\b(warehouse|logistics|fulfillment|distribution center)\b/],
    ["industrial_manufacturing", /\b(industrial facility|industrial site|manufacturing|production facility|processing facility|food production)\b/],
    ["healthcare", /\b(healthcare|health care|medical facility|medical office|dental office|clinic|hospital)\b/],
    ["education_campus", /\b(school|education campus|educational facility|k 12 school|college campus|university campus)\b/],
    ["agricultural_facility", /\b(agricultural facility|agriculture|farm|ranch|greenhouse)\b/],
    ["data_center", /\b(data center|server facility|server room|compute facility)\b/],
    ["office_admin", /\b(office building|office space|administrative workspace|professional office)\b/],
    ["retail_storefront", /\b(retail store|retail facility|storefront|store front)\b/],
    ["mixed_use", /\b(mixed use|mixed-use)\b/]
  ];
  for (const [type, pattern] of checks) {
    if (pattern.test(text)) types.push(type);
  }
  return unique(types.filter(Boolean));
}

function facilityStatusFor({ classificationValues, eligibleBuildingTypes, opportunity, searchableText, sourceText, reviewText }) {
  if (explicitlyNoFacilityRestriction(reviewText)) return "none";
  const broadStatus = broadFacilityStatusFor({ classificationValues, opportunity, sourceText });
  if (broadStatus) return broadStatus;
  if (eligibleBuildingTypes.length > 0) return "required";
  if (isStronglyFacilityNotApplicableProgram(opportunity, searchableText)) return "not_applicable";
  if (isFacilityNotApplicableProgram(opportunity, searchableText)) return "not_applicable";
  if (ambiguousFacilityLanguage(reviewText)) return "unknown";
  return "none_found_after_review";
}

function broadFacilityStatusFor({ classificationValues, opportunity, sourceText }) {
  const title = String(opportunity.canonicalTitle || opportunity.normalizedTitle || "");
  if (/\b(nonresidential|non-residential|non residential|commercial and industrial|commercial\/industrial|c&i|c and i)\b/i.test(title)) {
    return "broad_nonresidential";
  }
  if (
    /\b(nonresidential|non-residential|non residential|non-?residential(?: \w+){0,3} customers?|commercial and industrial|commercial\/industrial|c&i|c and i)\b/i.test(sourceText) ||
    classificationValues.some((value) => ["industrial", "small_business"].includes(value))
  ) {
    return "broad_nonresidential";
  }
  if (/\b(residential|homeowner|homeowners|single family|single-family)\b/i.test(title) && !/\b(commercial|business|nonresidential|non-residential)\b/i.test(title)) {
    return "broad_residential";
  }
  if (/\b(commercial|business)\b/i.test(title) && !/\b(residential|multifamily|multi-family|multi family)\b/i.test(title)) {
    return "broad_commercial";
  }
  if (
    classificationValues.includes("commercial") ||
    /\b(commercial|business)(?: \w+){0,3} (customers?|buildings?|properties|facilities|sites?|owners?)\b/i.test(sourceText)
  ) {
    return "broad_commercial";
  }
  if (/\b(residential(?: \w+){0,3} customers?|residential program|homeowners?|single family homes?)\b/i.test(sourceText)) {
    return "broad_residential";
  }
  return null;
}

function explicitlyNoFacilityRestriction(value) {
  return /any building type|any facility type|all building types|no building type restriction|no facility type restriction/i.test(value);
}

function ambiguousFacilityLanguage(value) {
  return /\b(facility type|building type|property type|site type)\b/i.test(value);
}

function isFacilityNotApplicableProgram(opportunity, searchableText) {
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
  if (isStronglyFacilityNotApplicableProgram(opportunity, searchableText)) return true;
  return /\b(federal|us department|u s department|usda|department of energy|treasury|loan guarantee|bond|financing)\b/.test(text);
}

function isStronglyFacilityNotApplicableProgram(opportunity, searchableText) {
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
  return /\b(tax credit|tax deduction|tax exemption|tax incentive|fee exemption|accelerated cost recovery|macrs|sales tax|income tax|renewable energy credit|solar renewable energy credit|srec)\b/.test(text);
}

function evidenceTextFor({ classificationValues, eligibleBuildingTypes, eligibilityStatus, opportunity, sourceText }) {
  if (["broad_commercial", "broad_nonresidential", "broad_residential"].includes(eligibilityStatus)) {
    const match = sourceText.match(/.{0,80}(commercial(?: \w+){0,3} customers?|non-?residential(?: \w+){0,3} customers?|commercial and industrial|commercial\/industrial|residential(?: \w+){0,3} customers?|residential program|homeowners?).{0,120}/i);
    if (match) return match[0].trim();
    if (classificationValues.length > 0) return `matchingParameters.businessClassification: ${classificationValues.join(", ")}`;
  }
  if (eligibleBuildingTypes.length > 0) return `Facility types inferred: ${eligibleBuildingTypes.join(", ")}`;
  if (classificationValues.length > 0) return `matchingParameters.businessClassification: ${classificationValues.join(", ")}`;
  if (eligibilityStatus === "not_applicable") return "Program type/source appears not facility-type gated.";
  if (eligibilityStatus === "none_found_after_review") return "No facility-type restriction language was found in the reviewed source corpus.";
  const match = sourceText.match(/.{0,80}(eligible facilit(?:y|ies)|facility type|building type|property type|commercial customers?|residential customers?).{0,120}/i);
  return match ? match[0].trim() : [opportunity.canonicalTitle, opportunity.administrator].filter(Boolean).join(" / ");
}

function confidenceFor({ eligibilityStatus, hasSpecificFacilityTypes, classificationValues }) {
  if (hasSpecificFacilityTypes) return 0.78;
  if (["broad_commercial", "broad_nonresidential", "broad_residential"].includes(eligibilityStatus)) return classificationValues.length > 0 ? 0.82 : 0.7;
  if (["none", "not_applicable"].includes(eligibilityStatus)) return 0.82;
  if (eligibilityStatus === "none_found_after_review") return 0.68;
  return 0.42;
}

function isNonresidentialFacilityType(type) {
  return !isResidentialFacilityType(type) && type !== "other";
}

function isCommercialFacilityType(type) {
  return [
    "commercial",
    "nonresidential",
    "office_admin",
    "retail_storefront",
    "restaurant_foodservice",
    "grocery_food_retail",
    "warehouse_logistics",
    "hospitality_lodging",
    "healthcare",
    "data_center",
    "mixed_use"
  ].includes(type);
}

function isResidentialFacilityType(type) {
  return ["residential", "multifamily_residential"].includes(type);
}
