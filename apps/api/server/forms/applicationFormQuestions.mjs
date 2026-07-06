import { readFormQuestionCatalog } from "./formQuestionCatalog.mjs";

function cleanText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function ensureArray(value) {
  return Array.isArray(value) ? value : [];
}

function slug(value) {
  return cleanText(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "") || "requirement";
}

export function buildApplicationFormQuestions(profile = {}, options = {}) {
  const catalog = options.catalog || readFormQuestionCatalog();
  const applicationCatalog = catalog.application || {};
  const opportunityId = cleanText(profile.opportunityId);
  if (!opportunityId) return [];

  return [
    ...questionsForRequirementSection(profile.requiredFields, {
      applicationCatalog,
      opportunityId,
      profile,
      sectionKey: "requiredFields"
    }),
    ...questionsForRequirementSection(profile.requiredDocuments, {
      applicationCatalog,
      opportunityId,
      profile,
      sectionKey: "requiredDocuments"
    }),
    ...questionsForRequirementSection(profile.optionalFields, {
      applicationCatalog,
      opportunityId,
      profile,
      sectionKey: "optionalFields"
    })
  ];
}

function questionsForRequirementSection(requirements, context) {
  return ensureArray(requirements)
    .map((requirement) => questionForRequirement(requirement, context))
    .filter(Boolean);
}

function questionForRequirement(requirement = {}, { applicationCatalog = {}, opportunityId, profile = {}, sectionKey }) {
  const label = cleanText(requirement.label || requirement.id);
  if (!label) return null;

  const section = applicationCatalog.requirementSections?.[sectionKey] || {};
  const requirementType = cleanText(requirement.requirementType) || "other";
  const mapping = applicationCatalog.requirementTypeMappings?.[requirementType] || applicationCatalog.requirementTypeMappings?.other || {};
  const required = requirement.required !== false && section.required !== false;
  const requirementId = slug(requirement.id || label);
  const canonicalPrefix = cleanText(mapping.canonicalInputKeyPrefix) || cleanText(section.questionKind) || "application_requirement";
  const answerType = cleanText(mapping.answerType || section.answerTypeDefault || "text");

  return stripUndefined({
    id: `application:${opportunityId}:${sectionKey}:${requirementId}`,
    questionId: `application.${sectionKey}.${requirementId}`,
    opportunityId,
    retrofitId: cleanText(profile.retrofitId) || undefined,
    retrofitName: cleanText(profile.retrofitName) || undefined,
    requirementId,
    requirementType,
    applicationSection: sectionKey,
    questionKind: cleanText(section.questionKind) || "application_requirement",
    question: questionTextForRequirement(label, { answerType, requirementType, sectionKey }),
    whyItMatters: cleanText(requirement.description) || cleanText(requirement.evidenceSnippet) || "This is required by the opportunity application source.",
    affects: affectsForRequirement(requirementType, sectionKey),
    answerType,
    canonicalInputKey: `${canonicalPrefix}.${opportunityId}.${requirementId}`,
    collectionStage: collectionStageForRequirement(requirementType, applicationCatalog),
    collectionSurface: cleanText(mapping.collectionSurface) || cleanText(applicationCatalog.collectionSurface) || "opportunity_application_form",
    required,
    sourceUrl: cleanText(requirement.sourceUrl) || undefined,
    evidenceSnippet: cleanText(requirement.evidenceSnippet) || undefined,
    confidence: cleanText(requirement.confidence) || undefined,
    audience: cleanText(requirement.audience) || undefined
  });
}

function questionTextForRequirement(label, { answerType, requirementType }) {
  if (answerType === "file") return `Upload ${label}`;
  if (requirementType === "signature") return `Can an authorized signer complete ${label}?`;
  if (requirementType === "eligibility") return `Confirm ${label}`;
  return `Provide ${label}`;
}

function collectionStageForRequirement(requirementType, applicationCatalog = {}) {
  if (requirementType === "eligibility") return "pre_opportunity_estimate";
  return cleanText(applicationCatalog.collectionStage) || "post_scenario_application";
}

function affectsForRequirement(requirementType, sectionKey) {
  if (requirementType === "bill") return ["Application readiness", "Utility account verification"];
  if (requirementType === "quote") return ["Application readiness", "Project cost verification"];
  if (requirementType === "tax") return ["Application readiness", "Tax filing support"];
  if (requirementType === "contractor") return ["Application readiness", "Installer eligibility"];
  if (sectionKey === "optionalFields") return ["Application completeness"];
  return ["Application readiness"];
}

function stripUndefined(value) {
  return Object.fromEntries(Object.entries(value).filter(([, item]) => item !== undefined));
}
