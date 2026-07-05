const BLOCKED_PROFILE_QUALITIES = new Set([
  "source_unreadable_or_js_required",
  "needs_user_selection",
  "needs_manual_review",
  "needs_targeted_cleanup",
  "needs_pdf_text_extraction",
  "needs_form_field_extraction",
  "artifacts_found_requirements_missing",
  "closed_no_action"
]);

const JUNK_EVIDENCE_PATTERN =
  /\b(invalidinitialphone|invalidphone|phonenosdonotmatch|phone numbers do not match|unconfirmeduser|otpsentemail|one[- ]?time password|verify your email|verification email|captcha|zoho sign settings|support@zohoforms\.com|newsletter sign up|sign up confirmation|manufactured home installer faq|local tax id|act 32|please enter a valid phone number)\b/i;

const CRITICAL_WARNING_PATTERN =
  /\b(system|validation|newsletter|vendor-support|malformed|unrelated|missing|source unreadable|needs user selection|manual review|targeted cleanup|pdf text|form field|invented)\b/i;

const APPLYABLE_STATUSES = new Set(["open", "unknown", "future_round_expected"]);
const CLOSED_STATUSES = new Set(["closed", "funding_exhausted"]);
const TERMINAL_REVIEW_STATUSES = new Set(["rejected", "archived"]);

function cleanText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function allRequirements(profile = {}) {
  return [
    ...(Array.isArray(profile.requiredFields) ? profile.requiredFields : []),
    ...(Array.isArray(profile.requiredDocuments) ? profile.requiredDocuments : [])
  ];
}

function allUrls(profile = {}) {
  return [
    profile.programSourceUrl,
    profile.programWebsiteUrl,
    profile.applicationUrl,
    profile.pdfUrl,
    ...(Array.isArray(profile.applicationArtifacts)
      ? profile.applicationArtifacts.flatMap((artifact) => [artifact?.url, artifact?.sourceUrl])
      : []),
    ...(Array.isArray(profile.primaryApplicationArtifacts)
      ? profile.primaryApplicationArtifacts.flatMap((artifact) => [artifact?.url, artifact?.sourceUrl])
      : [])
  ].filter(Boolean);
}

function hasMalformedUrl(value) {
  const text = cleanText(value);
  if (!text) return false;
  if (/https?&#58;/i.test(text)) return true;
  if ((text.match(/https?:\/\//gi) || []).length > 1) return true;
  try {
    const parsed = new URL(text);
    return !["http:", "https:"].includes(parsed.protocol);
  } catch {
    return true;
  }
}

function warningIsCritical(warning) {
  const text = cleanText(warning);
  if (!text) return false;
  if (/filtered from the final profile/i.test(text)) return false;
  return CRITICAL_WARNING_PATTERN.test(text);
}

function profileHasPrimaryArtifact(profile = {}) {
  if (Array.isArray(profile.primaryApplicationArtifacts) && profile.primaryApplicationArtifacts.length > 0) {
    return true;
  }
  return false;
}

export function validateApplicationProfileApproval(profile = {}, options = {}) {
  const errors = [];
  const warnings = [];
  const confirmationProvided = options.confirmation === true || options.confirmApproval === true;
  const adminNote = cleanText(options.adminNote || options.note);
  const approveAsReferenceOnly = options.approveAsReferenceOnly === true;
  const profileQuality = cleanText(profile.profileQuality);
  const applicationStatus = cleanText(profile.applicationStatus) || "unknown";

  if (!cleanText(profile.profileId)) {
    errors.push("profileId is required before approval.");
  }

  if (!cleanText(profile.opportunityId)) {
    errors.push("opportunityId is required before approval.");
  }

  if (TERMINAL_REVIEW_STATUSES.has(cleanText(profile.reviewStatus))) {
    errors.push("Rejected or archived profiles cannot be approved.");
  }

  if (!adminNote && !confirmationProvided) {
    errors.push("Approval requires an admin note or explicit confirmation.");
  }

  if (BLOCKED_PROFILE_QUALITIES.has(profileQuality)) {
    errors.push(`Profile quality "${profileQuality}" blocks approval until cleanup or manual review is complete.`);
  }

  if (profileQuality !== "requirements_ready_for_admin_review" && profileQuality !== "closed_but_profile_extractable") {
    warnings.push(`Profile quality "${profileQuality || "unknown"}" is not a normal approval-ready quality.`);
  }

  if (CLOSED_STATUSES.has(applicationStatus)) {
    if (!approveAsReferenceOnly) {
      errors.push("Closed or funding-exhausted profiles can only be approved as reference-only.");
    } else {
      warnings.push("Closed or funding-exhausted profile will be reviewed as reference-only and must never be treated as ready-to-apply.");
    }
  }

  for (const requirement of allRequirements(profile)) {
    const label = cleanText(requirement?.label || requirement?.id || "unknown requirement");
    if (!cleanText(requirement?.sourceUrl) || !cleanText(requirement?.evidenceSnippet)) {
      errors.push(`Requirement "${label}" is missing source evidence.`);
    }
    const evidenceText = [requirement?.label, requirement?.sourceUrl, requirement?.evidenceSnippet].filter(Boolean).join(" ");
    if (JUNK_EVIDENCE_PATTERN.test(evidenceText)) {
      errors.push(`Requirement "${label}" uses system, validation, newsletter, vendor-support, or unrelated evidence.`);
    }
  }

  const stepText = Array.isArray(profile.applicationSteps) ? profile.applicationSteps.join(" ") : "";
  if (JUNK_EVIDENCE_PATTERN.test(stepText)) {
    errors.push("Application steps contain system, validation, newsletter, vendor-support, or unrelated text.");
  }

  const criticalWarnings = (Array.isArray(profile.qualityWarnings) ? profile.qualityWarnings : []).filter(warningIsCritical);
  if (criticalWarnings.length > 0) {
    errors.push(`Critical quality warnings remain: ${criticalWarnings.join(" | ")}`);
  }

  const malformedUrl = allUrls(profile).find(hasMalformedUrl);
  if (malformedUrl) {
    errors.push(`Profile contains a malformed URL: ${malformedUrl}`);
  }

  if (APPLYABLE_STATUSES.has(applicationStatus) && !profileHasPrimaryArtifact(profile)) {
    errors.push("Open/applyable profiles require at least one primary application artifact before approval.");
  }

  return {
    allowed: errors.length === 0,
    errors,
    warnings
  };
}

export function isApplicationProfileCustomerReady(profile = {}) {
  if (profile.reviewStatus !== "admin_reviewed") return false;
  if (CLOSED_STATUSES.has(cleanText(profile.applicationStatus))) return false;
  return validateApplicationProfileApproval(profile, {
    confirmation: true,
    adminNote: "Previously admin reviewed."
  }).allowed;
}

export { JUNK_EVIDENCE_PATTERN };
