export const CRITERION_REGISTRY_VERSION = "2026-06-25";

export const criterionRegistry = [
  {
    criterionId: "site.geo.stateCode",
    dataType: "string",
    supportedOperators: ["eq", "in"],
    collectionMode: "derived",
    userQuestion: null,
    opportunityAliases: ["state", "service state", "project location", "available in"]
  },
  {
    criterionId: "site.geo.zip5",
    dataType: "string",
    supportedOperators: ["eq", "in"],
    collectionMode: "derived",
    userQuestion: null,
    opportunityAliases: ["zip", "zip code", "postal code"]
  },
  {
    criterionId: "site.utility.electric.distributionUtilityId",
    dataType: "string",
    supportedOperators: ["eq", "in"],
    collectionMode: "derived_and_confirmed",
    userQuestion: "Which electric utility delivers power to this site?",
    opportunityAliases: ["utility", "electric utility", "distribution utility", "service territory"]
  },
  {
    criterionId: "business.organizationTypes",
    dataType: "string[]",
    supportedOperators: ["overlaps", "in"],
    collectionMode: "current_form",
    userQuestion: "What type of organization is applying?",
    opportunityAliases: ["eligible sector", "applicant type", "customer type"]
  },
  {
    criterionId: "site.buildingTypes",
    dataType: "string[]",
    supportedOperators: ["overlaps", "in"],
    collectionMode: "current_form",
    userQuestion: "What type of site or facility is this?",
    opportunityAliases: ["building type", "facility type", "property type", "site type"]
  },
  {
    criterionId: "site.ownershipRelationship",
    dataType: "string",
    supportedOperators: ["eq", "in"],
    collectionMode: "current_form",
    userQuestion: "Do you own, lease, or manage the property?",
    opportunityAliases: ["owner", "tenant", "site control", "customer of record"]
  },
  {
    criterionId: "site.squareFootage",
    dataType: "number",
    units: "square_feet",
    supportedOperators: ["gte", "lte", "between"],
    collectionMode: "current_form",
    userQuestion: "What is the approximate square footage?",
    opportunityAliases: ["square footage", "floor area", "building size"]
  },
  {
    criterionId: "project.technologyIds",
    dataType: "string[]",
    supportedOperators: ["overlaps", "in"],
    collectionMode: "current_form",
    userQuestion: "Which improvements are you interested in?",
    opportunityAliases: ["technology", "measure", "equipment", "project type"]
  },
  {
    criterionId: "project.stage",
    dataType: "string",
    supportedOperators: ["eq", "in"],
    collectionMode: "future_conditional",
    userQuestion: "What stage is the project in?",
    opportunityAliases: ["preapproval", "installed", "purchased", "application timing"]
  },
  {
    criterionId: "site.peakDemandKw",
    dataType: "number",
    units: "kW",
    supportedOperators: ["gte", "lte", "between"],
    collectionMode: "conditional",
    userQuestion: "What is the site's approximate peak electric demand?",
    opportunityAliases: ["peak demand", "maximum demand", "billing demand", "connected load"]
  }
];

export function getCriterion(criterionId) {
  return criterionRegistry.find((criterion) => criterion.criterionId === criterionId) || null;
}
