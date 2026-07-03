import {
  canonicalBuildingType,
  canonicalOrganizationType,
  canonicalUtilityId,
  extractStateCode,
  extractZip5,
  normalizeText
} from "./ontologies.mjs";

export const USER_MATCH_PROFILE_SCHEMA_VERSION = "user-match-profile-v1";

export function normalizeUserProfile(intake) {
  const source = intake || {};
  const contact = source.contact || {};
  const business = source.business || source;
  const site = source.site || source;
  const sustainability = source.sustainability || source;

  const siteAddress = site.address || source.siteAddress || "";
  const organizationType = business.organizationType || source.organizationType || "";
  const buildingType = site.buildingType || source.buildingType || "";
  const electricUtilityProvider = site.electricUtilityProvider || source.electricUtilityProvider || "";
  const squareFootageRaw = site.squareFootage || source.squareFootage || "";
  const resolvedGeography = site.geography || source.siteGeography || source.geography || {};

  const stateCode = resolvedGeography.stateCode || extractStateCode(siteAddress) || extractStateCode(business.headquarters);
  const zip5 = resolvedGeography.zip5 || extractZip5(siteAddress);
  const utilityId = canonicalUtilityId(electricUtilityProvider);
  const squareFootage = parseNumber(squareFootageRaw);

  return {
    schemaVersion: USER_MATCH_PROFILE_SCHEMA_VERSION,
    sourceIntakeId: source.submissionId || source.userId || null,
    business: {
      organizationTypes: unique([canonicalOrganizationType(organizationType)]),
      primaryActivityText: business.primaryActivityText || business.industry || "",
      naicsCodes: Array.isArray(business.naicsCodes) ? business.naicsCodes : [],
      organizationSize: business.organizationSize || null
    },
    site: {
      addressStructured: {
        raw: siteAddress,
        matched: resolvedGeography.matchedAddress || null,
        stateCode,
        zip5
      },
      geo: {
        stateCode,
        zip5,
        countyFips: resolvedGeography.countyFips || null,
        countyName: resolvedGeography.countyName || null,
        placeGeoid: resolvedGeography.placeGeoid || null,
        placeName: resolvedGeography.placeName || null,
        censusTractGeoid: resolvedGeography.censusTractGeoid || null,
        censusBlockGeoid: resolvedGeography.censusBlockGeoid || null,
        coordinates: resolvedGeography.coordinates || null,
        resolutionStatus: resolvedGeography.status || "not_resolved",
        resolutionProvider: resolvedGeography.provider || null,
        designations: []
      },
      utility: {
        electric: {
          selfReportedName: electricUtilityProvider || null,
          distributionUtilityId: utilityId,
          territoryCandidates: utilityId ? [utilityId] : [],
          verificationStatus: utilityId ? "self_reported_unverified" : "unknown",
          customerClass: null
        }
      },
      ownershipRelationship: normalizeOwnership(site.ownershipStatus || source.ownershipStatus),
      buildingTypes: unique([canonicalBuildingType(buildingType)]),
      squareFootage: {
        value: squareFootage,
        raw: squareFootageRaw || null,
        parsingStatus: squareFootage == null ? "needs_validation" : "parsed"
      }
    },
    project: {
      stage: source.project?.stage || "unknown",
      alreadyPurchasedEquipment: null,
      targetStartDate: null
    },
    contact: {
      hasEmail: Boolean(contact.email || source.email),
      hasPhone: Boolean(contact.phone || source.phone)
    },
    tax: {
      siteTaxProfile: source.siteTaxProfile || null,
      uploadedTaxFiles: Array.isArray(source.uploadedTaxFiles) ? source.uploadedTaxFiles : [],
      taxProfileFacts: Array.isArray(source.taxProfileFacts) ? source.taxProfileFacts : [],
      taxExtractedValues: Array.isArray(source.taxExtractedValues) ? source.taxExtractedValues : [],
      taxOpportunitySpecificInputs: Array.isArray(source.taxOpportunitySpecificInputs)
        ? source.taxOpportunitySpecificInputs
        : [],
      taxMissingOrReviewInputs: Array.isArray(source.taxMissingOrReviewInputs) ? source.taxMissingOrReviewInputs : [],
      syntheticTaxDataNotice: source.syntheticTaxDataNotice || null,
      taxDataSchemaVersion: source.taxDataSchemaVersion || null,
      taxDataSourceArtifact: source.taxDataSourceArtifact || null
    },
    completeness: {
      hasState: Boolean(stateCode),
      hasZip: Boolean(zip5),
      hasCounty: Boolean(resolvedGeography.countyFips),
      hasPlace: Boolean(resolvedGeography.placeGeoid || resolvedGeography.placeName),
      hasCensusTract: Boolean(resolvedGeography.censusTractGeoid),
      hasUtility: Boolean(utilityId),
      hasOrganizationType: Boolean(organizationType),
      hasBuildingType: Boolean(buildingType),
      hasSquareFootage: squareFootage != null
    }
  };
}

function normalizeOwnership(value) {
  const normalized = normalizeText(value);
  if (!normalized) return null;
  if (normalized.includes("own")) return "owner";
  if (normalized.includes("lease")) return "tenant";
  if (normalized.includes("manage")) return "property_manager";
  if (normalized.includes("not sure")) return "unknown";
  return normalized;
}

function parseNumber(value) {
  const cleaned = String(value || "").replace(/,/g, "");
  const match = cleaned.match(/\d+(?:\.\d+)?/);
  if (!match) return null;
  const parsed = Number(match[0]);
  return Number.isFinite(parsed) ? parsed : null;
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}
