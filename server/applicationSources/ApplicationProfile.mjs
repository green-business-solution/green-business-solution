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

  return {
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
    applicationStatus: cleanOptional(applicationPathProfile?.applicationStatus || applicationRequirementProfile?.applicationStatus) || "unknown",

    applicationArtifacts: uniqueBy(applicationPathProfile?.applicationArtifacts || applicationRequirementProfile?.applicationArtifacts || [], (item) =>
      [item?.type, item?.url || item?.email, item?.sourceUrl].join("|")
    ),

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
