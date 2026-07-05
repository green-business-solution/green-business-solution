import { validateApplicationProfileApproval } from "./ApplicationProfileApprovalValidator.mjs";

const CUSTOMER_BLOCKED_APPLICATION_STATUSES = new Set([
  "funding_exhausted",
  "closed",
  "source_unreadable_or_js_required",
  "needs_user_selection",
  "needs_manual_review",
  "needs_review",
  "unknown"
]);

const CUSTOMER_SAFE_ARTIFACT_TYPES = new Set([
  "program_website",
  "application_portal",
  "online_form",
  "pdf",
  "guidelines",
  "checklist",
  "email_submission",
  "supporting_document",
  "pre_approval_form",
  "post_install_form",
  "grant_package",
  "contractor_portal"
]);

function cleanText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function cleanOptional(value) {
  const text = cleanText(value);
  return text || undefined;
}

function ensureArray(value) {
  return Array.isArray(value) ? value : [];
}

function isSafeUrl(value) {
  const text = cleanText(value);
  if (!text) return false;
  try {
    const parsed = new URL(text);
    return ["http:", "https:"].includes(parsed.protocol);
  } catch {
    return false;
  }
}

function sanitizeUrl(value) {
  const text = cleanText(value);
  return isSafeUrl(text) ? text : undefined;
}

function sanitizeEmail(value) {
  const text = cleanText(value);
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text) ? text : undefined;
}

function sanitizeEvidenceSnippet(value) {
  const text = cleanText(value).replace(/\s+/g, " ");
  return text ? text.slice(0, 360) : undefined;
}

function sanitizeRequirement(requirement = {}) {
  const label = cleanOptional(requirement.label || requirement.id);
  if (!label) return null;
  return {
    id: cleanOptional(requirement.id) || label.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, ""),
    label,
    description: cleanOptional(requirement.description),
    requirementType: cleanOptional(requirement.requirementType) || "other",
    required: requirement.required !== false,
    sourceUrl: sanitizeUrl(requirement.sourceUrl),
    evidenceSnippet: sanitizeEvidenceSnippet(requirement.evidenceSnippet),
    confidence: cleanOptional(requirement.confidence) || "Needs review",
    audience: cleanOptional(requirement.audience) || "customer_facing"
  };
}

function sanitizeRequirements(requirements = []) {
  return ensureArray(requirements).map(sanitizeRequirement).filter(Boolean);
}

function sanitizeArtifact(artifact = {}) {
  const label = cleanOptional(artifact.label);
  const type = cleanOptional(artifact.type) || "supporting_document";
  const url = sanitizeUrl(artifact.url);
  const email = sanitizeEmail(artifact.email);
  if (!label || (!url && !email) || !CUSTOMER_SAFE_ARTIFACT_TYPES.has(type)) return null;
  return {
    type,
    label,
    url,
    email,
    sourceUrl: sanitizeUrl(artifact.sourceUrl),
    evidenceSnippet: sanitizeEvidenceSnippet(artifact.evidenceSnippet),
    confidence: cleanOptional(artifact.confidence) || "Needs review"
  };
}

function sanitizeArtifacts(profile = {}) {
  const sourceArtifacts = ensureArray(profile.primaryApplicationArtifacts).length
    ? profile.primaryApplicationArtifacts
    : profile.applicationArtifacts;
  const seen = new Set();
  return ensureArray(sourceArtifacts)
    .map(sanitizeArtifact)
    .filter(Boolean)
    .filter((artifact) => {
      const key = `${artifact.type}|${artifact.url || artifact.email}|${artifact.label}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

function sanitizeEvidence(evidence = []) {
  return ensureArray(evidence)
    .map((item) => ({
      label: cleanOptional(item?.label),
      sourceUrl: sanitizeUrl(item?.sourceUrl),
      textSnippet: sanitizeEvidenceSnippet(item?.textSnippet)
    }))
    .filter((item) => item.label || item.textSnippet || item.sourceUrl)
    .slice(0, 20);
}

function requirementMatches(requirement = {}, pattern) {
  return pattern.test([requirement.label, requirement.description, requirement.evidenceSnippet, requirement.requirementType].filter(Boolean).join(" "));
}

function extractEligibilityRequirements(profile = {}) {
  return sanitizeRequirements([
    ...ensureArray(profile.requiredFields).filter((requirement) => requirementMatches(requirement, /\b(eligib|qualif|property owner|participating municipality|customer of record|income|tax|contractor|pre[- ]?approval)\b/i)),
    ...ensureArray(profile.requiredDocuments).filter((requirement) => requirementMatches(requirement, /\b(eligib|qualif|property owner|participating municipality|customer of record|income|tax|contractor|pre[- ]?approval)\b/i))
  ]);
}

function extractFees(profile = {}) {
  return sanitizeRequirements([
    ...ensureArray(profile.requiredFields),
    ...ensureArray(profile.requiredDocuments)
  ].filter((requirement) => requirementMatches(requirement, /\b(fee|payment|\$|non-refundable|application fee)\b/i)));
}

function deadlinesOrFundingStatus(profile = {}) {
  const values = [];
  if (cleanText(profile.deadline)) values.push(cleanText(profile.deadline));
  if (["closed", "funding_exhausted"].includes(cleanText(profile.applicationStatus))) {
    values.push("This program appears closed or funding-exhausted.");
  }
  return values;
}

function sourceLinks(profile = {}) {
  return [
    { label: "Official program website", url: sanitizeUrl(profile.programWebsiteUrl) },
    { label: "Application link", url: sanitizeUrl(profile.applicationUrl) },
    { label: "PDF/form", url: sanitizeUrl(profile.pdfUrl) },
    { label: "Program source", url: sanitizeUrl(profile.programSourceUrl) }
  ].filter((item) => item.url);
}

export function isReferenceOnlyApplicationProfile(profile = {}) {
  return (
    profile.reviewStatus === "admin_reviewed" &&
    (profile.approvedAsReferenceOnly === true || ["funding_exhausted", "closed"].includes(cleanText(profile.applicationStatus)))
  );
}

export function isCustomerReadyApplicationProfile(profile = {}) {
  if (profile.reviewStatus !== "admin_reviewed") return false;
  if (profile.approvedAsReferenceOnly === true) return false;
  if (profile.profileQuality !== "requirements_ready_for_admin_review") return false;
  if (CUSTOMER_BLOCKED_APPLICATION_STATUSES.has(cleanText(profile.applicationStatus))) return false;
  return validateApplicationProfileApproval(profile, {
    confirmation: true,
    adminNote: "Customer readiness validation."
  }).allowed;
}

export function sanitizeApplicationProfileForCustomer(profile = {}) {
  const applicationArtifacts = sanitizeArtifacts(profile);
  const requiredFields = sanitizeRequirements(profile.requiredFields);
  const requiredDocuments = sanitizeRequirements(profile.requiredDocuments);
  const optionalFields = sanitizeRequirements(profile.optionalFields);
  return {
    opportunityId: cleanOptional(profile.opportunityId),
    programName: cleanOptional(profile.opportunityName) || cleanOptional(profile.programName) || "Application profile",
    applicationMethod: cleanOptional(profile.primaryMethod) || cleanOptional(profile.applicationMethod) || "unknown",
    applicationStatus: cleanOptional(profile.applicationStatus) || "unknown",
    officialProgramWebsite: sanitizeUrl(profile.programWebsiteUrl),
    programSourceUrl: sanitizeUrl(profile.programSourceUrl),
    applicationUrl: sanitizeUrl(profile.applicationUrl),
    pdfUrl: sanitizeUrl(profile.pdfUrl),
    contactEmail: sanitizeEmail(profile.contactEmail),
    applicationArtifacts,
    requiredFields,
    optionalFields,
    requiredDocuments,
    applicationSteps: ensureArray(profile.applicationSteps).map(cleanText).filter(Boolean),
    eligibilityRequirements: extractEligibilityRequirements(profile),
    deadlinesOrFundingStatus: deadlinesOrFundingStatus(profile),
    fees: extractFees(profile),
    evidence: sanitizeEvidence(profile.evidence),
    reviewedAt: cleanOptional(profile.reviewedAt),
    sourceLinks: sourceLinks(profile)
  };
}

export function buildCustomerApplicationProfileResponse(profile = {}) {
  if (!profile || !cleanText(profile.profileId)) {
    return {
      status: "unavailable",
      customerReady: false,
      referenceOnly: false,
      profile: null,
      notice: "Application prep is not available yet."
    };
  }

  if (isReferenceOnlyApplicationProfile(profile)) {
    return {
      status: "reference_only",
      customerReady: false,
      referenceOnly: true,
      profile: sanitizeApplicationProfileForCustomer(profile),
      notice: "This program appears closed or funding-exhausted. RetroFi is showing it for reference only."
    };
  }

  if (!isCustomerReadyApplicationProfile(profile)) {
    return {
      status: "unavailable",
      customerReady: false,
      referenceOnly: false,
      profile: null,
      notice: "Application prep is not available yet."
    };
  }

  return {
    status: "customer_ready",
    customerReady: true,
    referenceOnly: false,
    profile: sanitizeApplicationProfileForCustomer(profile),
    notice: null
  };
}
