function cleanText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function cleanOptional(value) {
  const text = cleanText(value);
  return text || undefined;
}

function uniqueBy(items, keyFn) {
  const seen = new Set();
  const result = [];
  for (const item of Array.isArray(items) ? items : []) {
    const key = keyFn(item);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    result.push(item);
  }
  return result;
}

const TARGETED_CLEANUP_EVIDENCE_PATTERN =
  /\b(invalidinitialphone|invalidphone|phonenosdonotmatch|phone numbers do not match|unconfirmeduser|otpsentemail|one[- ]?time password|verify your email|verification email|captcha|zoho sign settings|support@zohoforms\.com|please enter a valid phone number|enter a phone number|sending email|newsletter sign up|sign up confirmation|choose which notifications|notification preferences?)\b/i;
const PA_SOLAR_UNRELATED_PATTERN =
  /\b(manufactured home|manufactured housing|modular\/industrialized housing|industrialized housing|local tax id|w2-r|w-2r|act 32|mediation guidelines|veterans resources|compliance resources|publications?\s*&\s*documents?|employer annual w2-r|manufactured home installer faq|newsletter sign up confirmation)\b/i;

function normalizeWhitespace(value) {
  return cleanText(value).replace(/\s+/g, " ");
}

function profileText(profile = {}) {
  return normalizeWhitespace([
    profile.opportunityName,
    profile.programWebsiteUrl,
    profile.applicationUrl,
    profile.pdfUrl,
    profile.contactEmail,
    ...(profile.applicationArtifacts || []).map((artifact) => [artifact.label, artifact.url, artifact.email, artifact.sourceUrl].join(" "))
  ].filter(Boolean).join(" "));
}

function isSolarForSchoolsProfile(profile = {}) {
  return /\bsolar for schools|s4s\b/i.test(profileText(profile));
}

function hasEmbeddedMalformedAbsoluteUrl(value) {
  const text = cleanText(value);
  if (!text) return false;
  if (/https?&#58;/i.test(text)) return true;
  const matches = [...text.matchAll(/https?:\/\//gi)];
  return matches.length > 1;
}

function targetedCleanupWarnings(profile = {}) {
  const warnings = [];
  const requirements = [
    ...(profile.requiredFields || []),
    ...(profile.requiredDocuments || []),
    ...(profile.optionalFields || [])
  ];

  if (hasEmbeddedMalformedAbsoluteUrl(profile.applicationUrl)) {
    warnings.push("Application URL appears malformed or contains an embedded absolute URL.");
  }

  const badRequirement = requirements.find((requirement) =>
    TARGETED_CLEANUP_EVIDENCE_PATTERN.test([requirement.label, requirement.evidenceSnippet, requirement.sourceUrl].filter(Boolean).join(" "))
  );
  if (badRequirement) {
    warnings.push(`Requirement "${badRequirement.label || badRequirement.id}" uses system, validation, newsletter, or vendor-support text as evidence.`);
  }

  const highValidationRequirement = requirements.find((requirement) =>
    requirement.confidence === "High" &&
    /\b(invalid|valid phone|valid email|verify your email|verification)\b/i.test(requirement.evidenceSnippet || "")
  );
  if (highValidationRequirement) {
    warnings.push(`Requirement "${highValidationRequirement.label || highValidationRequirement.id}" is High confidence from validation text only.`);
  }

  const stepText = (profile.applicationSteps || []).join(" ");
  if (TARGETED_CLEANUP_EVIDENCE_PATTERN.test(stepText)) {
    warnings.push("Application steps include system, validation, newsletter, or vendor-support text.");
  }

  const artifactText = (profile.applicationArtifacts || [])
    .map((artifact) => [artifact.type, artifact.label, artifact.url, artifact.email, artifact.evidenceSnippet, artifact.sourceUrl].join(" "))
    .join(" ");
  if (/\boffice@wmgld\.com\b/i.test(artifactText)) {
    warnings.push("Wakefield profile still contains a generic office email artifact.");
  }

  if (isSolarForSchoolsProfile(profile)) {
    const unrelatedRequirement = requirements.find((requirement) => PA_SOLAR_UNRELATED_PATTERN.test([requirement.label, requirement.evidenceSnippet, requirement.sourceUrl].filter(Boolean).join(" ")));
    const unrelatedArtifact = (profile.applicationArtifacts || []).find((artifact) => PA_SOLAR_UNRELATED_PATTERN.test([artifact.label, artifact.url, artifact.evidenceSnippet].filter(Boolean).join(" ")));
    if (unrelatedRequirement || unrelatedArtifact) {
      warnings.push("Solar for Schools profile still contains unrelated DCED/manufactured-housing/local-tax/newsletter material.");
    }
  }

  return warnings;
}

export function composeDraftApplicationProfile({
  opportunity = {},
  officialProgramWebsiteProfile = {},
  applicationPathProfile = {},
  applicationRequirementProfile = {}
} = {}) {
  const now = new Date().toISOString();
  const extracted =
    applicationRequirementProfile?.extractionStatus === "requirements_extracted" ||
    applicationRequirementProfile?.extractionStatus === "partial";

  const profile = {
    opportunityId: String(
      opportunity?.opportunityId ||
        officialProgramWebsiteProfile?.opportunityId ||
        applicationPathProfile?.opportunityId ||
        applicationRequirementProfile?.opportunityId ||
        ""
    ),
    opportunityName: cleanOptional(
      opportunity?.canonicalTitle ||
        opportunity?.normalizedTitle ||
        applicationPathProfile?.opportunityName ||
        applicationRequirementProfile?.opportunityName
    ),
    retrofitId: cleanOptional(applicationRequirementProfile?.retrofitId || applicationPathProfile?.retrofitId),
    retrofitName: cleanOptional(applicationRequirementProfile?.retrofitName || applicationPathProfile?.retrofitName),

    programSourceUrl: cleanOptional(applicationPathProfile?.programSourceUrl || officialProgramWebsiteProfile?.programSourceUrl),
    programWebsiteUrl: cleanOptional(applicationPathProfile?.programWebsiteUrl || officialProgramWebsiteProfile?.programWebsiteUrl),
    programWebsiteSource: cleanOptional(applicationPathProfile?.programWebsiteSource || officialProgramWebsiteProfile?.programWebsiteSource),

    applicationUrl: cleanOptional(applicationPathProfile?.applicationUrl || applicationPathProfile?.bestApplicationUrl || applicationRequirementProfile?.applicationUrl),
    pdfUrl: cleanOptional(applicationPathProfile?.pdfUrl || applicationPathProfile?.bestPdfUrl || applicationPathProfile?.discoveredPdfUrl),
    contactEmail: cleanOptional(applicationPathProfile?.contactEmail || applicationPathProfile?.bestContactEmail || applicationPathProfile?.discoveredContactEmail),

    applicationMethod: cleanOptional(applicationPathProfile?.applicationMethod || applicationRequirementProfile?.applicationMethod) || "unknown",
    primaryMethod: cleanOptional(applicationPathProfile?.primaryMethod || applicationRequirementProfile?.primaryMethod || applicationPathProfile?.applicationMethod) || "unknown",
    secondaryMethods: Array.isArray(applicationPathProfile?.secondaryMethods) ? applicationPathProfile.secondaryMethods : [],
    applicationStatus: cleanOptional(applicationPathProfile?.applicationStatus || applicationRequirementProfile?.applicationStatus) || "unknown",

    applicationArtifacts: uniqueBy(applicationPathProfile?.applicationArtifacts || applicationRequirementProfile?.applicationArtifacts || [], (item) =>
      [item?.type, item?.url || item?.email, item?.sourceUrl].join("|")
    ),
    primaryApplicationArtifacts: uniqueBy(applicationPathProfile?.primaryApplicationArtifacts || [], (item) =>
      [item?.type, item?.url || item?.email, item?.sourceUrl].join("|")
    ),
    artifactDiagnostics: applicationPathProfile?.artifactDiagnostics || {},

    requiredFields: applicationRequirementProfile?.requiredFields || [],
    requiredDocuments: applicationRequirementProfile?.requiredDocuments || [],
    optionalFields: applicationRequirementProfile?.optionalFields || [],

    preApprovalRequired: applicationRequirementProfile?.preApprovalRequired ?? "unknown",
    contractorRequired: applicationRequirementProfile?.contractorRequired ?? "unknown",
    taxReviewRequired: applicationRequirementProfile?.taxReviewRequired ?? "unknown",

    deadline: cleanOptional(applicationRequirementProfile?.deadline),
    estimatedTime: cleanOptional(applicationRequirementProfile?.estimatedTime),

    applicationSteps: applicationRequirementProfile?.applicationSteps || [],
    evidence: [
      ...(Array.isArray(applicationPathProfile?.evidence) ? applicationPathProfile.evidence : []),
      ...(Array.isArray(applicationRequirementProfile?.evidence) ? applicationRequirementProfile.evidence : [])
    ].slice(0, 40),
    sourceChain: applicationPathProfile?.sourceChain || officialProgramWebsiteProfile?.sourceChain || [],
    extractionDiagnostics: applicationRequirementProfile?.extractionDiagnostics || {},
    diagnostics: applicationRequirementProfile?.diagnostics || {},

    reviewStatus: extracted ? "ai_extracted" : "needs_review",
    createdFrom: "extraction",
    createdAt: now,
    updatedAt: now,

    notes: [
      ...(Array.isArray(officialProgramWebsiteProfile?.notes) ? officialProgramWebsiteProfile.notes : []),
      ...(Array.isArray(applicationPathProfile?.notes) ? applicationPathProfile.notes : []),
      ...(Array.isArray(applicationRequirementProfile?.notes) ? applicationRequirementProfile.notes : [])
    ].filter(Boolean)
  };

  const quality = assessApplicationProfileQuality(profile, {
    pathProfile: applicationPathProfile,
    requirementProfile: applicationRequirementProfile
  });
  profile.profileQuality = quality.profileQuality;
  profile.qualityWarnings = quality.qualityWarnings;
  return profile;
}

export function assessApplicationProfileQuality(profile = {}, context = {}) {
  const warnings = [];
  const requirementCount = (profile.requiredFields?.length || 0) + (profile.requiredDocuments?.length || 0);
  const optionalCount = profile.optionalFields?.length || 0;
  const artifactCount = (profile.applicationArtifacts || []).filter((artifact) => artifact?.type !== "program_website").length;
  const extractionStatus = context?.requirementProfile?.extractionStatus || profile.extractionStatus;
  const diagnostics = context?.requirementProfile?.extractionDiagnostics || profile.extractionDiagnostics || {};
  const artifactDiagnostics = context?.pathProfile?.artifactDiagnostics || profile.artifactDiagnostics || {};
  const stepText = (profile.applicationSteps || []).join(" ");

  if (profile.applicationStatus === "source_unreadable_or_js_required" || extractionStatus === "source_unreadable_or_js_required") {
    if (requirementCount + optionalCount > 0) warnings.push("Source is unreadable or JavaScript-required but profile contains extracted requirements.");
    return { profileQuality: "source_unreadable_or_js_required", qualityWarnings: warnings };
  }

  if (profile.applicationStatus === "needs_user_selection" || extractionStatus === "needs_user_selection") {
    if (!profile.notes?.some((note) => /selection|utility|town|municipal|territory/i.test(note))) {
      warnings.push("Needs-user-selection profile should explain the required selection.");
    }
    return { profileQuality: "needs_user_selection", qualityWarnings: warnings };
  }

  if (["closed", "funding_exhausted"].includes(profile.applicationStatus)) {
    if (profile.readyToApply) warnings.push("Closed/funding-exhausted profile must not be marked ready-to-apply.");
    if (requirementCount > 0) return { profileQuality: "closed_but_profile_extractable", qualityWarnings: warnings };
    return { profileQuality: "closed_no_action", qualityWarnings: warnings };
  }

  if (diagnostics.pdfTextExtractionStatus === "pdf_text_unavailable" || extractionStatus === "needs_pdf_text_extraction") {
    warnings.push("One or more relevant PDF artifacts need readable text extraction before requirements can be trusted.");
    return { profileQuality: "needs_pdf_text_extraction", qualityWarnings: warnings };
  }

  const cleanupWarnings = targetedCleanupWarnings(profile);
  warnings.push(...cleanupWarnings);

  if (artifactDiagnostics.filteredArtifacts?.length) {
    warnings.push(`${artifactDiagnostics.filteredArtifacts.length} unrelated or low-confidence artifacts were filtered from the final profile.`);
  }

  if (TARGETED_CLEANUP_EVIDENCE_PATTERN.test(stepText)) {
    warnings.push("Application steps include system, CAPTCHA, validation, or vendor-support text.");
  }

  if (cleanupWarnings.length > 0) {
    return { profileQuality: "needs_targeted_cleanup", qualityWarnings: warnings };
  }

  if (artifactCount > 0 && requirementCount === 0) {
    warnings.push("Application artifacts were found, but required fields/documents are missing.");
    if (diagnostics.formFieldExtractionStatus !== "form_fields_extracted" && (profile.applicationArtifacts || []).some((artifact) => /form|jotform|zoho|interest-form/i.test(`${artifact.type} ${artifact.label} ${artifact.url}`))) {
      return { profileQuality: "needs_form_field_extraction", qualityWarnings: warnings };
    }
    return { profileQuality: "artifacts_found_requirements_missing", qualityWarnings: warnings };
  }

  if (extractionStatus === "requirements_extracted" && requirementCount <= 2) {
    warnings.push("Extraction status says requirements_extracted, but only one or two generic requirements were found.");
    return { profileQuality: "needs_manual_review", qualityWarnings: warnings };
  }

  if (requirementCount >= 3 && (profile.evidence || []).length > 0) {
    return { profileQuality: "requirements_ready_for_admin_review", qualityWarnings: warnings };
  }

  if (artifactCount > 0) return { profileQuality: "artifacts_found_requirements_missing", qualityWarnings: warnings };
  return { profileQuality: "needs_manual_review", qualityWarnings: warnings };
}

export function validateApplicationProfile(profile = {}, context = {}) {
  const warnings = [];
  const errors = [];

  if (!cleanText(profile.opportunityId)) {
    errors.push("opportunityId is required.");
  }

  if (!cleanText(profile.applicationMethod)) {
    errors.push("applicationMethod is required.");
  }

  const sourceUnavailable = ["source_unavailable", "source_unreadable_or_js_required"].includes(context?.extractionStatus) ||
    profile.applicationStatus === "source_unreadable_or_js_required";

  if (!profile.programWebsiteUrl && !sourceUnavailable) {
    warnings.push("programWebsiteUrl is missing; profile should retain a source URL or explicit unavailable status.");
  }

  const extractedRequirements = [...(profile.requiredFields || []), ...(profile.requiredDocuments || []), ...(profile.optionalFields || [])];
  if (context?.extractionStatus === "requirements_extracted") {
    for (const requirement of extractedRequirements) {
      if (!requirement?.evidenceSnippet || !requirement?.sourceUrl) {
        errors.push(`Requirement "${requirement?.label || requirement?.id || "unknown"}" is missing source evidence.`);
      }
    }
  }

  if (["closed", "funding_exhausted"].includes(profile.applicationStatus) && profile.readyToApply) {
    errors.push("Closed or funding-exhausted profiles must not be marked ready-to-apply.");
  }

  if (profile.applicationStatus === "source_unreadable_or_js_required" && extractedRequirements.length > 0) {
    errors.push("Source-unreadable profiles should not contain extracted requirements.");
  }

  if (profile.applicationStatus === "needs_user_selection" && !profile.notes?.some((note) => /selection|utility|town|municipal|territory/i.test(note))) {
    warnings.push("needs_user_selection profiles should explain what selection is needed.");
  }

  if (profile.reviewStatus === "admin_reviewed" && context?.createdAutomatically !== false) {
    errors.push("admin_reviewed requires explicit admin action and cannot be set by automatic extraction.");
  }

  const dsireOnly = !profile.programWebsiteUrl && profile.sourceChain?.some((item) => /dsire/i.test(item?.url || ""));
  if (dsireOnly && profile.reviewStatus === "admin_reviewed" && !profile.notes?.length) {
    errors.push("DSIRE-only profiles require manual review notes before admin_reviewed.");
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}
