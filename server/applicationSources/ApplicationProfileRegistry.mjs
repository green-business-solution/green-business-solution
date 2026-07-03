import crypto from "node:crypto";

export const APPLICATION_PROFILE_STATE_SCOPE = "applicationProfile";
export const APPLICATION_PROFILE_SCHEMA_VERSION = "application-profile-registry-v1";

export const APPLICATION_PROFILE_REVIEW_STATUSES = new Set([
  "ai_extracted",
  "needs_review",
  "needs_targeted_cleanup",
  "admin_reviewed",
  "rejected",
  "archived"
]);

export const APPLICATION_PROFILE_MUTATION_PROTECTED_STATUSES = new Set(["admin_reviewed", "rejected", "archived"]);

const EDITABLE_PROFILE_FIELDS = new Set([
  "requiredFields",
  "requiredDocuments",
  "optionalFields",
  "applicationSteps",
  "applicationArtifacts",
  "primaryApplicationArtifacts",
  "applicationMethod",
  "primaryMethod",
  "secondaryMethods",
  "applicationStatus",
  "adminNotes",
  "profileQuality",
  "qualityWarnings"
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

function stableHash(value) {
  return crypto.createHash("sha256").update(cleanText(value)).digest("hex").slice(0, 20);
}

export function applicationProfileIdForOpportunity(opportunityId) {
  const cleanOpportunityId = cleanText(opportunityId);
  if (!cleanOpportunityId) return "";
  return `application_profile_${stableHash(cleanOpportunityId)}`;
}

export function applicationProfileStateKey(profileId) {
  return {
    stateScope: APPLICATION_PROFILE_STATE_SCOPE,
    stateKey: `profile:${cleanText(profileId)}`
  };
}

export function draftReviewStatusForQuality(profileQuality) {
  const quality = cleanText(profileQuality);
  if (quality === "needs_targeted_cleanup") return "needs_targeted_cleanup";
  if (quality === "requirements_ready_for_admin_review" || quality === "closed_but_profile_extractable") return "ai_extracted";
  return "needs_review";
}

export function isApplicationProfileRegistryItem(item = {}) {
  return item?.stateScope === APPLICATION_PROFILE_STATE_SCOPE && cleanText(item?.profileId);
}

export function publicApplicationProfileRecord(item = {}) {
  const { stateScope: _stateScope, stateKey: _stateKey, ...profile } = item || {};
  return profile;
}

export function stripUndefinedApplicationProfileValues(value) {
  if (value === undefined) return undefined;
  if (Array.isArray(value)) {
    return value.map((item) => stripUndefinedApplicationProfileValues(item)).filter((item) => item !== undefined);
  }
  if (value && typeof value === "object" && Object.getPrototypeOf(value) === Object.prototype) {
    return Object.fromEntries(
      Object.entries(value)
        .map(([key, item]) => [key, stripUndefinedApplicationProfileValues(item)])
        .filter(([, item]) => item !== undefined)
    );
  }
  return value;
}

export function compactApplicationProfileRecord(profile = {}) {
  return {
    profileId: profile.profileId,
    opportunityId: profile.opportunityId,
    opportunityName: profile.opportunityName,
    programWebsiteUrl: profile.programWebsiteUrl,
    applicationUrl: profile.applicationUrl,
    pdfUrl: profile.pdfUrl,
    contactEmail: profile.contactEmail,
    applicationMethod: profile.applicationMethod,
    primaryMethod: profile.primaryMethod,
    secondaryMethods: ensureArray(profile.secondaryMethods),
    applicationStatus: profile.applicationStatus,
    profileQuality: profile.profileQuality,
    reviewStatus: profile.reviewStatus,
    requiredFieldCount: ensureArray(profile.requiredFields).length,
    requiredDocumentCount: ensureArray(profile.requiredDocuments).length,
    optionalFieldCount: ensureArray(profile.optionalFields).length,
    primaryArtifactCount: ensureArray(profile.primaryApplicationArtifacts).length,
    qualityWarningCount: ensureArray(profile.qualityWarnings).length,
    reviewedBy: profile.reviewedBy,
    reviewedAt: profile.reviewedAt,
    createdAt: profile.createdAt,
    updatedAt: profile.updatedAt
  };
}

export function normalizeApplicationProfileForRegistry(profile = {}, options = {}) {
  const now = options.now || new Date().toISOString();
  const opportunityId = cleanText(profile.opportunityId);
  const profileId = cleanText(profile.profileId) || applicationProfileIdForOpportunity(opportunityId);
  const requestedReviewStatus = cleanText(options.reviewStatus || profile.reviewStatus);
  const reviewStatus =
    options.statusMode === "draft"
      ? draftReviewStatusForQuality(profile.profileQuality)
      : APPLICATION_PROFILE_REVIEW_STATUSES.has(requestedReviewStatus)
        ? requestedReviewStatus
        : draftReviewStatusForQuality(profile.profileQuality);

  return {
    ...applicationProfileStateKey(profileId),
    schemaVersion: APPLICATION_PROFILE_SCHEMA_VERSION,
    profileId,
    opportunityId,
    opportunityName: cleanOptional(profile.opportunityName),
    retrofitId: cleanOptional(profile.retrofitId),
    retrofitName: cleanOptional(profile.retrofitName),
    programSourceUrl: cleanOptional(profile.programSourceUrl),
    programWebsiteUrl: cleanOptional(profile.programWebsiteUrl),
    programWebsiteSource: cleanOptional(profile.programWebsiteSource),
    applicationUrl: cleanOptional(profile.applicationUrl),
    pdfUrl: cleanOptional(profile.pdfUrl),
    contactEmail: cleanOptional(profile.contactEmail),
    applicationMethod: cleanOptional(profile.applicationMethod) || "unknown",
    primaryMethod: cleanOptional(profile.primaryMethod) || cleanOptional(profile.applicationMethod) || "unknown",
    secondaryMethods: ensureArray(profile.secondaryMethods),
    applicationStatus: cleanOptional(profile.applicationStatus) || "unknown",
    profileQuality: cleanOptional(profile.profileQuality) || "needs_manual_review",
    reviewStatus,
    applicationArtifacts: ensureArray(profile.applicationArtifacts),
    primaryApplicationArtifacts: ensureArray(profile.primaryApplicationArtifacts),
    requiredFields: ensureArray(profile.requiredFields),
    requiredDocuments: ensureArray(profile.requiredDocuments),
    optionalFields: ensureArray(profile.optionalFields),
    applicationSteps: ensureArray(profile.applicationSteps),
    evidence: ensureArray(profile.evidence),
    sourceChain: ensureArray(profile.sourceChain),
    artifactDiagnostics: profile.artifactDiagnostics || {},
    extractionDiagnostics: profile.extractionDiagnostics || {},
    diagnostics: profile.diagnostics || {},
    qualityWarnings: ensureArray(profile.qualityWarnings),
    adminNotes: cleanOptional(options.adminNotes ?? profile.adminNotes),
    reviewedBy: cleanOptional(profile.reviewedBy),
    reviewedAt: cleanOptional(profile.reviewedAt),
    rejectedBy: cleanOptional(profile.rejectedBy),
    rejectedAt: cleanOptional(profile.rejectedAt),
    rejectionReason: cleanOptional(profile.rejectionReason),
    archivedBy: cleanOptional(profile.archivedBy),
    archivedAt: cleanOptional(profile.archivedAt),
    approvedAsReferenceOnly: profile.approvedAsReferenceOnly === true,
    createdFrom: cleanOptional(profile.createdFrom) || "extraction",
    createdAt: cleanOptional(profile.createdAt) || now,
    updatedAt: now,
    notes: ensureArray(profile.notes)
  };
}

export function applyApplicationProfileAdminPatch(profile = {}, patch = {}, options = {}) {
  const now = options.now || new Date().toISOString();
  const next = { ...profile };
  for (const [field, value] of Object.entries(patch || {})) {
    if (!EDITABLE_PROFILE_FIELDS.has(field)) continue;
    if (
      [
        "requiredFields",
        "requiredDocuments",
        "optionalFields",
        "applicationSteps",
        "applicationArtifacts",
        "primaryApplicationArtifacts",
        "secondaryMethods",
        "qualityWarnings"
      ].includes(field)
    ) {
      next[field] = ensureArray(value);
    } else if (field === "adminNotes") {
      next.adminNotes = cleanOptional(value);
    } else if (typeof value === "string") {
      next[field] = cleanText(value);
    } else {
      next[field] = value;
    }
  }
  next.updatedAt = now;
  return normalizeApplicationProfileForRegistry(next, { now, reviewStatus: next.reviewStatus });
}

export function profileCanBeRegenerated(profile = {}) {
  return !APPLICATION_PROFILE_MUTATION_PROTECTED_STATUSES.has(cleanText(profile.reviewStatus));
}

export function appendAdminNote(existingNotes, nextNote) {
  const note = cleanText(nextNote);
  if (!note) return cleanOptional(existingNotes);
  const current = cleanText(existingNotes);
  if (!current) return note;
  return `${current}\n\n${note}`;
}

export function extractDraftProfilesFromFirstTenAudit(audit = {}) {
  const results = Array.isArray(audit?.results) ? audit.results : [];
  return results
    .map((item) => item?.draftApplicationProfile)
    .filter((profile) => profile && cleanText(profile.opportunityId))
    .map((profile) => normalizeApplicationProfileForRegistry(profile, { statusMode: "draft" }));
}

export function sortApplicationProfileImportOpportunities(opportunities = []) {
  return [...ensureArray(opportunities)].sort((a, b) =>
    String(b?.lastSeenAt || b?.updatedAt || b?.publishedAt || "").localeCompare(
      String(a?.lastSeenAt || a?.updatedAt || a?.publishedAt || "")
    )
  );
}

export function summarizeApplicationProfileImport(profile = {}, status = "imported", reason = "") {
  return {
    opportunityId: profile.opportunityId,
    profileId: profile.profileId,
    reviewStatus: profile.reviewStatus,
    profileQuality: profile.profileQuality,
    status,
    reason: cleanOptional(reason)
  };
}

export function applicationProfileImportSourceUnavailableError() {
  return {
    message: "Import source unavailable. Generate drafts from production opportunities or check server logs."
  };
}

export async function importApplicationProfilesFromOpportunities({
  opportunities = [],
  buildDraftForOpportunity,
  getExistingProfile,
  saveProfile,
  limit = 10,
  concurrency = 10
} = {}) {
  const selectedOpportunities = sortApplicationProfileImportOpportunities(opportunities).slice(0, limit);
  const imported = [];
  const skipped = [];
  const errors = [];

  if (!selectedOpportunities.length) {
    return {
      imported,
      skipped,
      errors: [applicationProfileImportSourceUnavailableError()],
      profiles: [],
      importedCount: 0,
      skippedCount: 0,
      errorCount: 1
    };
  }

  if (typeof buildDraftForOpportunity !== "function" || typeof getExistingProfile !== "function" || typeof saveProfile !== "function") {
    return {
      imported,
      skipped,
      errors: [{ message: "ApplicationProfile import is not configured on the server." }],
      profiles: [],
      importedCount: 0,
      skippedCount: 0,
      errorCount: 1
    };
  }

  let nextIndex = 0;
  const workerCount = Math.max(1, Math.min(selectedOpportunities.length, Number.parseInt(concurrency, 10) || 1));

  async function processOpportunity(opportunity, index) {
    const opportunityId = cleanText(opportunity?.opportunityId);
    try {
      const expectedProfileId = applicationProfileIdForOpportunity(opportunityId);
      if (expectedProfileId) {
        const existing = await getExistingProfile({ profileId: expectedProfileId, opportunityId });
        if (existing) {
          const skippedSummary = summarizeApplicationProfileImport(
            publicApplicationProfileRecord(existing),
            "skipped",
            "Existing ApplicationProfile already saved for this opportunity."
          );
          skipped.push(skippedSummary);
          return;
        }
      }

      const draft = await buildDraftForOpportunity(opportunity, { index });
      const normalized = normalizeApplicationProfileForRegistry(draft, { statusMode: "draft" });
      const existingAfterBuild = expectedProfileId === normalized.profileId ? null : await getExistingProfile(normalized);
      if (existingAfterBuild) {
        const skippedSummary = summarizeApplicationProfileImport(
          publicApplicationProfileRecord(existingAfterBuild),
          "skipped",
          "Existing ApplicationProfile already saved for this opportunity."
        );
        skipped.push(skippedSummary);
        return;
      }
      const saved = await saveProfile(normalized);
      imported.push(summarizeApplicationProfileImport(saved, "imported"));
    } catch (error) {
      errors.push({
        opportunityId,
        opportunityName: cleanOptional(opportunity?.canonicalTitle || opportunity?.normalizedTitle),
        message: cleanText(error?.message || error) || "ApplicationProfile import failed for this opportunity."
      });
    }
  }

  async function worker() {
    while (nextIndex < selectedOpportunities.length) {
      const index = nextIndex;
      nextIndex += 1;
      await processOpportunity(selectedOpportunities[index], index);
    }
  }

  await Promise.all(Array.from({ length: workerCount }, () => worker()));

  imported.sort((a, b) => a.opportunityId.localeCompare(b.opportunityId));
  skipped.sort((a, b) => a.opportunityId.localeCompare(b.opportunityId));
  errors.sort((a, b) => cleanText(a.opportunityId).localeCompare(cleanText(b.opportunityId)));

  return {
    imported,
    skipped,
    errors,
    profiles: imported,
    importedCount: imported.length,
    skippedCount: skipped.length,
    errorCount: errors.length
  };
}
