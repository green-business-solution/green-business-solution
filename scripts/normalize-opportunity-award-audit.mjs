import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "..");

export const defaultOutputRoot = path.join(repoRoot, "GPT Pro Outputs", "opportunity-award-audit");
export const defaultPrimaryRoot = "/Users/neer_kuchlous/Code/firstmate/projects/green-business-solution/GPT Pro Outputs/opportunity-award-audit";
export const defaultOverlayPath = path.join(repoRoot, "data", "opportunity_award_audit_overlay.v1.json");

const allowedCanonicalAwardLikelihoods = new Set(["likely", "possible", "unlikely", "unknown"]);
const rawAwardLikelihoodMap = new Map([
  ["near_guaranteed", "likely"],
  ["rare", "unlikely"]
]);

export const allowedApprovalStages = new Set([
  "before_purchase",
  "before_installation",
  "before_operation",
  "after_installation",
  "multiple",
  "none",
  "unknown"
]);

export const allowedLegacyApprovalStages = new Set([
  "pre-application",
  "application",
  "under-review",
  "document-review",
  "award-review",
  "disbursal",
  "unknown"
]);

const legacyToCanonicalStage = new Map([
  ["pre-application", "before_purchase"],
  ["application", "before_purchase"],
  ["under-review", "before_installation"],
  ["document-review", "before_installation"],
  ["award-review", "before_installation"],
  ["disbursal", "after_installation"],
  ["unknown", "unknown"]
]);

const allowedReviewStatuses = new Set(["audited", "source_inaccessible", "not_audited", "needs_followup", "needs_evidence"]);

const legacyNoneIndicators = new Set([
  "closed",
  "expired",
  "inactive",
  "not_current",
  "not_current_applications",
  "program_closed",
  "current_cycle_closed",
  "repealed",
  "suspended",
  "suspended_program",
  "no_current_application",
  "no_current_credit",
  "program_is_retired",
  "program_not_currently_open"
]);

const markdownUrlPattern = /^\s*\[[^\]]*\]\(([^)]+)\)\s*$/;
const absoluteUrlPattern = /^https?:\/\//i;

function asString(value) {
  return String(value || "").trim();
}

function uniqueStrings(values) {
  const seen = new Set();
  const output = [];
  for (const value of Array.isArray(values) ? values : []) {
    const normalized = asString(value);
    if (!normalized || seen.has(normalized)) {
      continue;
    }
    seen.add(normalized);
    output.push(normalized);
  }
  return output;
}

function isObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function normalizeText(value) {
  return asString(value).toLowerCase().replace(/[_\-]+/g, "_").replace(/\s+/g, "_");
}

export function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

export function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

export function normalizeEvidenceUrl(rawValue) {
  const trimmed = asString(rawValue);
  if (!trimmed) {
    return {
      original: "",
      normalized: "",
      valid: false,
      reason: "empty"
    };
  }

  const markdownMatch = trimmed.match(markdownUrlPattern);
  const candidate = asString(markdownMatch?.[1] || trimmed).replace(/[\]\)>"'}]+$/g, "").trim();
  if (!absoluteUrlPattern.test(candidate)) {
    return {
      original: trimmed,
      normalized: candidate,
      valid: false,
      reason: "must be an absolute http(s) URL"
    };
  }

  return {
    original: trimmed,
    normalized: candidate,
    valid: true,
    reason: null
  };
}

export function normalizeEvidenceUrls(rawUrls) {
  const raw = uniqueStrings(Array.isArray(rawUrls) ? rawUrls : []);
  const normalized = [];
  const malformed = [];

  for (const value of raw) {
    const result = normalizeEvidenceUrl(value);
    if (result.valid) {
      normalized.push(result.normalized);
      continue;
    }
    malformed.push({ original: result.original, reason: result.reason });
  }

  return {
    original: raw,
    normalized: uniqueStrings(normalized),
    malformed,
    markdownCount: raw.filter((value) => markdownUrlPattern.test(asString(value))).length
  };
}

function splitStageString(value) {
  return asString(value).toLowerCase().split(/[^a-z0-9]+/g).filter(Boolean);
}

function hasCombinedSignals(value) {
  const normalized = normalizeText(value);
  return /\b(and|&|\/|_and_|then|then_|->| and )\b/.test(normalized);
}

export function normalizeApprovalStage(value) {
  const canonical = normalizeApprovalStageInternal(value);
  return {
    canonical: canonical.canonical,
    method: canonical.method,
    notes: canonical.notes,
    requiresManualAttention: canonical.requiresManualAttention,
    original: asString(value)
  };
}

function normalizeApprovalStageInternal(value) {
  const original = asString(value);
  const canonicalOriginal = normalizeText(original);

  if (allowedApprovalStages.has(canonicalOriginal)) {
    return {
      canonical: canonicalOriginal,
      method: "canonical",
      requiresManualAttention: false,
      notes: []
    };
  }

  const legacyStage = canonicalOriginal.replace(/_/g, "-");
  if (allowedLegacyApprovalStages.has(legacyStage)) {
    return {
      canonical: legacyToCanonicalStage.get(legacyStage),
      method: "legacy_mapping",
      requiresManualAttention: false,
      notes: [
        `Legacy approval stage mapped deterministically from ${canonicalOriginal} to ${legacyToCanonicalStage.get(legacyStage)}.`
      ]
    };
  }

  if (legacyNoneIndicators.has(canonicalOriginal) || canonicalOriginal.includes("not_current")) {
    return {
      canonical: "none",
      method: "legacy_none",
      requiresManualAttention: false,
      notes: ["Legacy stage indicates no active approval process."]
    };
  }

  const tokens = splitStageString(original);
  const hasPre = tokens.some((token) => [
    "pre",
    "application",
    "preapplication",
    "preapplication",
    "under",
    "review",
    "prequal",
    "qualification",
    "submission",
    "eligibility",
    "quote",
    "loan",
    "contractor",
    "technical",
    "document"
  ].includes(token));
  const hasPost = tokens.some((token) => [
    "award",
    "disbursal",
    "disbursement",
    "disbursements",
    "payment",
    "reimbursement",
    "install",
    "installation",
    "completion",
    "closeout",
    "verification",
    "documentreview",
    "underreview"
  ].includes(token));
  const hasOperation = tokens.some((token) => ["operation", "operational", "annual", "meter", "bill"].includes(token));

  if (hasCombinedSignals(original)) {
    return {
      canonical: "multiple",
      method: "combined_separator",
      requiresManualAttention: false,
      notes: ["Input contained multiple phase tokens and was mapped to multiple."]
    };
  }

  if (hasPre && hasPost) {
    return {
      canonical: "multiple",
      method: "combined_phase",
      requiresManualAttention: false,
      notes: ["Input mixed pre and post program-phase tokens and was mapped to multiple."]
    };
  }

  if (hasPost) {
    return {
      canonical: "after_installation",
      method: "keyword_after",
      requiresManualAttention: false,
      notes: ["Input indicates post-installation or payout language."]
    };
  }

  if (hasOperation) {
    return {
      canonical: "before_operation",
      method: "keyword_operation",
      requiresManualAttention: false,
      notes: ["Input indicates operational stage language."]
    };
  }

  if (hasPre) {
    return {
      canonical: "before_purchase",
      method: "keyword_pre",
      requiresManualAttention: false,
      notes: ["Input indicates pre-award stage language."]
    };
  }

  return {
    canonical: "unknown",
    method: original === "" ? "fallback_unknown" : "manual_review_required",
    requiresManualAttention: true,
    notes: ["Input could not be mapped deterministically."]
  };
}

function normalizeAwardLikelihood(value) {
  const original = asString(value).toLowerCase();
  if (!original) {
    return {
      canonical: "unknown",
      method: "missing",
      requiresManualAttention: true,
      notes: ["awardLikelihood was missing."],
      original
    };
  }

  if (allowedCanonicalAwardLikelihoods.has(original)) {
    return {
      canonical: original,
      method: "canonical",
      requiresManualAttention: false,
      notes: [],
      original
    };
  }

  if (rawAwardLikelihoodMap.has(original)) {
    return {
      canonical: rawAwardLikelihoodMap.get(original),
      method: `legacy_${original}`,
      requiresManualAttention: false,
      notes: [`Mapped non-standard awardLikelihood ${original} to ${rawAwardLikelihoodMap.get(original)}.`],
      original
    };
  }

  return {
    canonical: "unknown",
    method: "manual_review_required",
    requiresManualAttention: true,
    notes: [`Unrecognized awardLikelihood: ${original}`],
    original
  };
}

function normalizeRequiresProgramApproval(value) {
  if (typeof value === "boolean") {
    return {
      canonical: value,
      method: "canonical",
      requiresManualAttention: false,
      notes: [],
      original: value
    };
  }

  const normalized = asString(value).toLowerCase();
  if (normalized === "unknown") {
    return {
      canonical: null,
      method: "legacy_unknown",
      requiresManualAttention: true,
      notes: ["requiresProgramApproval was string 'unknown' and mapped to null."],
      original: normalized
    };
  }

  if (!normalized) {
    return {
      canonical: null,
      method: "missing",
      requiresManualAttention: true,
      notes: ["requiresProgramApproval was missing and mapped to null."],
      original: normalized
    };
  }

  return {
    canonical: null,
    method: "manual_review_required",
    requiresManualAttention: true,
    notes: [`requiresProgramApproval "${normalized}" was non-boolean and mapped to null.`],
    original: normalized
  };
}

function toIsoDate(value) {
  const text = asString(value);
  const parsed = Date.parse(text);
  return Number.isFinite(parsed) ? text : "";
}

function maybeHost(url) {
  try {
    return new URL(url).hostname.toLowerCase().replace(/^www\./, "");
  } catch {
    return null;
  }
}

function officialHostsFromOpportunity(opportunity) {
  return uniqueStrings([opportunity?.sourceUrl, opportunity?.websiteUrl, opportunity?.applicationUrl].map(maybeHost).filter(Boolean));
}

function matchesOfficialHost(url, officialHosts) {
  const host = maybeHost(url);
  if (!host || officialHosts.length === 0) {
    return false;
  }
  return officialHosts.some((officialHost) => host === officialHost || host.endsWith(`.${officialHost}`) || officialHost.endsWith(`.${host}`));
}

function hasOfficialEvidence(evidenceUrls, opportunity) {
  const officialHosts = officialHostsFromOpportunity(opportunity);
  return evidenceUrls.some((candidate) => matchesOfficialHost(candidate, officialHosts));
}

export function normalizeAndValidateReview(review, context = {}) {
  const errors = [];
  const warnings = [];
  if (!isObject(review)) {
    return {
      ok: false,
      errors: ["review must be an object"],
      warnings: [],
      normalized: null
    };
  }

  const opportunityId = asString(review.opportunityId);
  if (!opportunityId) {
    errors.push("opportunityId is required.");
    return {
      ok: false,
      errors,
      warnings,
      normalized: null
    };
  }

  const awardLikelihood = normalizeAwardLikelihood(review.awardLikelihood);
  if (awardLikelihood.requiresManualAttention) {
    warnings.push(`${awardLikelihood.notes[0]}`);
  }

  let reviewStatus = asString(review.reviewStatus).toLowerCase();
  if (!allowedReviewStatuses.has(reviewStatus)) {
    warnings.push(`Invalid reviewStatus "${reviewStatus || "<missing>"}" was mapped to needs_followup.`);
    reviewStatus = "needs_followup";
  }

  const requiresProgramApproval = normalizeRequiresProgramApproval(review.requiresProgramApproval);
  if (requiresProgramApproval.requiresManualAttention) {
    warnings.push(`${requiresProgramApproval.notes[0]}`);
  }

  const approvalRequirements = uniqueStrings(Array.isArray(review.approvalRequirements) ? review.approvalRequirements : []);
  if (requiresProgramApproval.canonical === true && approvalRequirements.length === 0) {
    warnings.push("requiresProgramApproval=true but approvalRequirements is empty.");
  }

  const approvalStage = normalizeApprovalStageInternal(review.approvalStage);
  if (approvalStage.requiresManualAttention) {
    warnings.push(`${approvalStage.notes[0]}`);
  }

  const evidenceText = asString(review.evidenceText);
  if (!evidenceText) {
    warnings.push("evidenceText was missing or empty.");
  }

  const awardLikelihoodReason = asString(review.awardLikelihoodReason);
  if (!awardLikelihoodReason) {
    warnings.push("awardLikelihoodReason was missing or empty.");
  }

  const reviewedAt = toIsoDate(review.reviewedAt);
  if (!reviewedAt) {
    warnings.push("reviewedAt was missing or invalid; normalized to empty.");
  }

  const evidenceUrls = normalizeEvidenceUrls(review.evidenceUrls);
  if (evidenceUrls.malformed.length > 0) {
    warnings.push(`Malformed evidenceUrls: ${evidenceUrls.malformed.map((item) => item.original).join(", ")}`);
  }

  const reviewedRecord = {
    opportunityId,
    requiresProgramApproval: requiresProgramApproval.canonical,
    approvalRequirements,
    approvalStage: approvalStage.canonical,
    awardLikelihood: awardLikelihood.canonical,
    awardLikelihoodReason: awardLikelihoodReason || "Missing awardLikelihoodReason.",
    evidenceUrls: evidenceUrls.normalized,
    evidenceText: evidenceText || "No evidence text provided.",
    reviewedAt,
    reviewStatus,
    awardLikelihoodEvidence: asString(review.awardLikelihoodEvidence),
    evidenceUrlMarkdownCount: evidenceUrls.markdownCount,
    normalization: {
      sourceTrace: {
        outputFile: context.outputFile || null,
        batchId: context.batchId || null,
        inputFile: context.inputFile || null,
        rawApprovalStage: asString(review.approvalStage),
        rawRequiresProgramApproval: review.requiresProgramApproval,
        awardLikelihoodSource: awardLikelihood.original,
        originalReviewStatus: asString(review.reviewStatus)
      },
      approvalStageMethod: approvalStage.method,
      approvalStageNotes: approvalStage.notes,
      awardLikelihoodMethod: awardLikelihood.method,
      awardLikelihoodNotes: awardLikelihood.notes,
      requiresProgramApprovalMethod: requiresProgramApproval.method,
      requiresProgramApprovalNotes: requiresProgramApproval.notes,
      requiresManualAttention: approvalStage.requiresManualAttention || awardLikelihood.requiresManualAttention || requiresProgramApproval.requiresManualAttention,
      awardEvidenceNormalization: {
        originalEvidenceUrls: evidenceUrls.original,
        malformedEvidenceUrls: evidenceUrls.malformed,
        officialEvidenceUrls: []
      }
    }
  };

  const officialEvidenceUrls = evidenceUrls.normalized.filter((candidate) => hasOfficialEvidence([candidate], context.opportunityRecord || {}));
  reviewedRecord.normalization.awardEvidenceNormalization.officialEvidenceUrls = officialEvidenceUrls;

  if (reviewedRecord.reviewStatus === "audited" && reviewedRecord.evidenceUrls.length === 0) {
    reviewedRecord.reviewStatus = "needs_evidence";
    warnings.push("audited review had no valid evidenceUrl; mapped reviewStatus to needs_evidence.");
  }

  if (reviewedRecord.requiresProgramApproval === true && reviewedRecord.reviewStatus !== "source_inaccessible" && officialEvidenceUrls.length === 0) {
    reviewedRecord.reviewStatus = "needs_followup";
    warnings.push("requiresProgramApproval=true but no official-host evidenceUrl was provided.");
  }

  if (reviewedRecord.requiresProgramApproval === null && reviewedRecord.reviewStatus === "audited") {
    reviewedRecord.reviewStatus = "needs_followup";
  }

  if (reviewedRecord.evidenceUrls.length === 0 && reviewedRecord.reviewStatus === "needs_followup") {
    reviewedRecord.reviewStatus = "needs_evidence";
  }

  return {
    ok: errors.length === 0,
    errors,
    warnings,
    normalized: reviewedRecord
  };
}

export function countRecordsByOpportunity(recordsById) {
  const counts = {
    awardLikelihood: {},
    requiresProgramApproval: { true: 0, false: 0 },
    reviewStatus: {},
    approvalStage: {},
    normalizationMethod: {},
    awardLikelihoodMethod: {},
    requiresProgramApprovalMethod: {},
    officialEvidenceCoverage: {
      total: recordsById.size,
      covered: 0,
      uncovered: 0,
      missing: 0,
      skipped: 0
    },
    normalizationTrace: {
      byOriginal: {},
      requiresManualAttention: 0
    }
  };

  for (const record of recordsById.values()) {
    counts.awardLikelihood[record.awardLikelihood] = (counts.awardLikelihood[record.awardLikelihood] || 0) + 1;
    if (record.requiresProgramApproval === null) {
      counts.requiresProgramApproval.null = (counts.requiresProgramApproval.null || 0) + 1;
    } else {
      counts.requiresProgramApproval[record.requiresProgramApproval ? "true" : "false"] += 1;
    }
    counts.reviewStatus[record.reviewStatus] = (counts.reviewStatus[record.reviewStatus] || 0) + 1;
    counts.approvalStage[record.approvalStage] = (counts.approvalStage[record.approvalStage] || 0) + 1;

    const method = record.normalization.approvalStageMethod || "fallback_unknown";
    counts.normalizationMethod[method] = (counts.normalizationMethod[method] || 0) + 1;
    const awardLikelihoodMethod = record.normalization.awardLikelihoodMethod || "fallback_unknown";
    counts.awardLikelihoodMethod[awardLikelihoodMethod] = (counts.awardLikelihoodMethod[awardLikelihoodMethod] || 0) + 1;
    const requiresProgramApprovalMethod = record.normalization.requiresProgramApprovalMethod || "fallback_unknown";
    counts.requiresProgramApprovalMethod[requiresProgramApprovalMethod] =
      (counts.requiresProgramApprovalMethod[requiresProgramApprovalMethod] || 0) + 1;
    if (record.normalization.requiresManualAttention) counts.normalizationTrace.requiresManualAttention += 1;

    const sourceStage = record.normalization.sourceTrace?.rawApprovalStage || "";
    if (sourceStage) {
      counts.normalizationTrace.byOriginal[sourceStage] = (counts.normalizationTrace.byOriginal[sourceStage] || 0) + 1;
    }

    const officialCount = record.normalization.awardEvidenceNormalization?.officialEvidenceUrls?.length || 0;
    if (record.requiresProgramApproval === false) {
      counts.officialEvidenceCoverage.skipped += 1;
    } else if (record.requiresProgramApproval === null) {
      counts.officialEvidenceCoverage.skipped += 1;
    } else if (record.reviewStatus === "source_inaccessible" || officialCount > 0) {
      counts.officialEvidenceCoverage.covered += 1;
    } else {
      counts.officialEvidenceCoverage.uncovered += 1;
    }

    if (record.awardLikelihood === "unknown") {
      counts.officialEvidenceCoverage.missing += 1;
    }
  }

  return counts;
}

function readManifest(outputRoot) {
  return readJson(path.join(outputRoot, "manifest.json"));
}

export function loadManifest(outputRoot) {
  const manifestPath = path.join(outputRoot, "manifest.json");
  if (!fs.existsSync(manifestPath)) {
    throw new Error(`Missing audit manifest at ${manifestPath}`);
  }
  return readManifest(outputRoot);
}

export function resolveAwardAuditOutputRoot(explicitPath) {
  const candidates = [explicitPath, process.env.GPT_PRO_OUTPUT_ROOT, defaultPrimaryRoot, defaultOutputRoot].filter(Boolean);

  for (const candidate of candidates) {
    const manifestPath = path.join(candidate, "manifest.json");
    if (fs.existsSync(manifestPath)) {
      return path.resolve(candidate);
    }
  }

  throw new Error(`Unable to locate GPT Pro opportunity-audit output root. Tried: ${candidates.join(", ")}`);
}

function compareApprovalStage(a, b) {
  const order = [
    "before_purchase",
    "before_installation",
    "before_operation",
    "after_installation",
    "multiple",
    "none",
    "unknown"
  ];
  const ai = order.indexOf(a);
  const bi = order.indexOf(b);
  if (ai === bi) return 0;
  if (ai === -1) return 1;
  if (bi === -1) return -1;
  return ai - bi;
}

function sortCounts(rows) {
  return Object.fromEntries(rows.sort((a, b) => a[0].localeCompare(b[0])));
}

function sortCountsCanonical(rows) {
  return Object.fromEntries(rows.sort((a, b) => compareApprovalStage(a[0], b[0])));
}

export function countsForRecords(recordsById) {
  const rowCounts = countRecordsByOpportunity(recordsById);
  return {
    awardLikelihood: sortCounts(Object.entries(rowCounts.awardLikelihood)),
    reviewStatus: sortCounts(Object.entries(rowCounts.reviewStatus)),
    requiresProgramApproval: sortCounts(Object.entries(rowCounts.requiresProgramApproval)),
    approvalStage: sortCountsCanonical(Object.entries(rowCounts.approvalStage)),
    normalizationMethod: sortCounts(Object.entries(rowCounts.normalizationMethod)),
    awardLikelihoodMethod: sortCounts(Object.entries(rowCounts.awardLikelihoodMethod)),
    requiresProgramApprovalMethod: sortCounts(Object.entries(rowCounts.requiresProgramApprovalMethod)),
    officialEvidenceCoverage: rowCounts.officialEvidenceCoverage
  };
}

export function normalizeFromManifest(outputRoot, options = {}) {
  const root = path.resolve(outputRoot || defaultOutputRoot);
  const manifest = options.manifest || loadManifest(root);

  const batches = Array.isArray(manifest?.batches) ? manifest.batches : [];
  const recordsById = new Map();
  const rejectedRecords = [];
  const expectedOpportunityIds = new Set();
  const seenInOutputs = new Map();

  const errors = [];
  const warnings = [];

  for (const batch of batches) {
    const batchLabel = batch.batchId || batch.outputFile || batch.inputFile || "batch";
    const batchInputPath = path.join(root, batch.inputFile);
    const batchOutputPath = path.join(root, batch.outputFile);

    if (!fs.existsSync(batchInputPath)) {
      errors.push(`Missing input file for ${batchLabel}: ${batch.inputFile}`);
      continue;
    }
    if (!fs.existsSync(batchOutputPath)) {
      errors.push(`Missing output file for ${batchLabel}: ${batch.outputFile}`);
      continue;
    }

    const input = readJson(batchInputPath);
    const output = readJson(batchOutputPath);

    const inputRows = Array.isArray(input?.opportunities) ? input.opportunities : [];
    const outputRows = Array.isArray(output?.reviews) ? output.reviews : [];

    const batchInputIds = new Set();
    for (const row of inputRows) {
      const opportunityId = asString(row?.opportunityId);
      if (!opportunityId) {
        continue;
      }
      if (expectedOpportunityIds.has(opportunityId)) {
        errors.push(`Duplicate input opportunityId across batches: ${opportunityId}`);
      }
      expectedOpportunityIds.add(opportunityId);
      batchInputIds.add(opportunityId);
    }

    if (outputRows.length !== inputRows.length) {
      errors.push(`${batchLabel} output count (${outputRows.length}) does not match input count (${inputRows.length}).`);
    }

    const lookup = new Map(inputRows.map((row) => [asString(row?.opportunityId), row]));
    for (const review of outputRows) {
      const opportunityId = asString(review?.opportunityId);
      if (!opportunityId) {
        errors.push(`Batch ${batchLabel} has missing opportunityId in output.`);
        continue;
      }
      if (!batchInputIds.has(opportunityId)) {
        errors.push(`Output includes opportunityId not in this batch input (${batchLabel}): ${opportunityId}`);
      }
      if (seenInOutputs.has(opportunityId)) {
        errors.push(`OpportunityId ${opportunityId} appears in multiple output records.`);
      }
      seenInOutputs.set(opportunityId, (seenInOutputs.get(opportunityId) || 0) + 1);

      const normalized = normalizeAndValidateReview(review, {
        batchId: batch.batchId,
        inputFile: batch.inputFile,
        outputFile: batch.outputFile,
        opportunityRecord: lookup.get(opportunityId)
      });

      if (!normalized.ok) {
        errors.push(...normalized.errors.map((error) => `${batchLabel}: ${error}`));
        rejectedRecords.push({
          opportunityId,
          batchLabel,
          errors: normalized.errors,
          warnings: normalized.warnings,
          rawReview: review
        });
      }
      warnings.push(...normalized.warnings.map((warning) => `${batchLabel}: ${warning}`));
      if (normalized.normalized) {
        recordsById.set(opportunityId, normalized.normalized);
      }

      if (options.rewriteOutputs && normalized.normalized) {
        review.approvalStage = normalized.normalized.approvalStage;
        review.evidenceUrls = normalized.normalized.evidenceUrls;
        if (normalized.normalized.awardLikelihoodEvidence) {
          review.awardLikelihoodEvidence = normalized.normalized.awardLikelihoodEvidence;
        }
      }
    }
  }

  const missingIds = [...expectedOpportunityIds].filter((opportunityId) => !recordsById.has(opportunityId));
  if (missingIds.length > 0) {
    errors.push(`Missing ${missingIds.length} reviewed opportunities from expected input: ${missingIds.join(", ")}`);
  }

  const result = {
    ok: errors.length === 0,
    errors,
    warnings,
    manifest,
    recordsById,
    reviewedRowCount: recordsById.size,
    expectedOpportunityCount: expectedOpportunityIds.size,
    rejectedOpportunityCount: rejectedRecords.length,
    missingOpportunityIds: missingIds,
    missingOpportunityCount: missingIds.length,
    rejectedRecords,
    duplicateOpportunityCount: [...seenInOutputs.values()].filter((count) => count > 1).length,
    extraOutputCount: Math.max(0, recordsById.size - Math.max(0, expectedOpportunityIds.size)),
    missingFromValidatedCount: Math.max(0, expectedOpportunityIds.size - recordsById.size),
    counts: countRecordsByOpportunity(recordsById),
    report: {
      normalizationCoverage: countsForRecords(recordsById),
      outputPath: root
    }
  };

  return result;
}

export function buildCanonicalOverlay(result) {
  const records = {};

  for (const [opportunityId, row] of [...result.recordsById].sort((left, right) => left[0].localeCompare(right[0]))) {
    records[opportunityId] = {
      requiresProgramApproval: row.requiresProgramApproval,
      approvalRequirements: row.approvalRequirements,
      approvalStage: row.approvalStage,
      awardLikelihood: row.awardLikelihood,
      awardLikelihoodReason: row.awardLikelihoodReason,
      awardLikelihoodEvidence: row.awardLikelihoodEvidence || "",
      evidenceText: row.evidenceText,
      reviewStatus: row.reviewStatus,
      reviewedAt: row.reviewedAt,
      evidenceUrls: {
        normalized: row.evidenceUrls,
        malformed: row.normalization?.awardEvidenceNormalization?.malformedEvidenceUrls || [],
        original: row.normalization?.awardEvidenceNormalization?.originalEvidenceUrls || []
      },
      auditTrace: {
        sourceTrace: row.normalization.sourceTrace,
        approvalStage: {
          canonical: row.approvalStage,
          method: row.normalization.approvalStageMethod,
          notes: row.normalization.approvalStageNotes,
          requiresManualAttention: row.normalization.requiresManualAttention
        },
        officialEvidenceUrls: row.normalization?.awardEvidenceNormalization?.officialEvidenceUrls || []
      }
    };
  }

  return {
    schemaVersion: "opportunity_award_audit_overlay.v1",
    source: {
      manifestPath: "manifest.json",
      overlayCreatedAt: new Date().toISOString(),
      expectedOpportunityCount: result.expectedOpportunityCount,
      reviewedOpportunityCount: result.reviewedRowCount
    },
    reconciliation: {
      ok: result.ok,
      errors: result.errors.length,
      warnings: result.warnings.length,
      missingOpportunityCount: result.missingOpportunityCount,
      duplicateOpportunityCount: result.duplicateOpportunityCount,
      extraOutputCount: result.extraOutputCount
    },
    counts: countsForRecords(result.recordsById),
    records
  };
}

export function buildReport(result) {
  const reportRows = [];
  reportRows.push("# Opportunity audit normalization and reconciliation report");
  reportRows.push(`Expected opportunities: ${result.expectedOpportunityCount}`);
  reportRows.push(`Reconciled opportunities: ${result.reviewedRowCount}`);
  reportRows.push(`Missing opportunities: ${result.missingOpportunityCount}`);
  reportRows.push(`Duplicate output IDs: ${result.duplicateOpportunityCount}`);
  reportRows.push(`Result: ${result.ok ? "PASS" : "FAIL"}`);
  reportRows.push("");

  const counts = countsForRecords(result.recordsById);
  reportRows.push("## Counts");
  reportRows.push(`awardLikelihood: ${JSON.stringify(counts.awardLikelihood)}`);
  reportRows.push(`requiresProgramApproval: ${JSON.stringify(counts.requiresProgramApproval)}`);
  reportRows.push(`reviewStatus: ${JSON.stringify(counts.reviewStatus)}`);
  reportRows.push(`approvalStage: ${JSON.stringify(counts.approvalStage)}`);
  reportRows.push(`normalizationMethod: ${JSON.stringify(counts.normalizationMethod)}`);
  reportRows.push(`awardLikelihoodMethod: ${JSON.stringify(counts.awardLikelihoodMethod)}`);
  reportRows.push(`requiresProgramApprovalMethod: ${JSON.stringify(counts.requiresProgramApprovalMethod)}`);
  reportRows.push(`officialEvidenceCoverage: ${JSON.stringify(counts.officialEvidenceCoverage)}`);
  reportRows.push("");

  if (result.errors.length > 0) {
    reportRows.push("## Errors");
    reportRows.push(...result.errors.map((error) => `- ${error}`));
    reportRows.push("");
  }

  if (result.warnings.length > 0) {
    reportRows.push("## Warnings");
    reportRows.push(...result.warnings.map((warning) => `- ${warning}`));
  }

  return `${reportRows.join("\n")}\n`;
}

export function normalizeOutputs(outputRoot = defaultOutputRoot, opts = {}) {
  const normalized = normalizeFromManifest(outputRoot, { ...opts, rewriteOutputs: true });

  for (const batch of normalized.manifest.batches || []) {
    const outputPath = path.join(outputRoot, batch.outputFile);
    if (!fs.existsSync(outputPath)) continue;
    const output = readJson(outputPath);
    output.reviews = output.reviews.map((review) => {
      const opportunityId = asString(review?.opportunityId);
      const normalizedReview = normalized.recordsById.get(opportunityId);
      if (!normalizedReview) {
        return review;
      }
      return {
        ...review,
        approvalStage: normalizedReview.approvalStage,
        evidenceUrls: normalizedReview.evidenceUrls
      };
    });
    writeJson(outputPath, output);
  }

  const overlay = buildCanonicalOverlay(normalized);
  writeJson(defaultOverlayPath, overlay);

  return {
    ...normalized,
    overlay,
    report: buildReport(normalized)
  };
}

export function main(argv = process.argv.slice(2)) {
  const outputRoot = resolveAwardAuditOutputRoot(argv[0] || null);
  const result = normalizeOutputs(outputRoot);

  console.log(result.report);
  if (!result.ok) {
    process.exitCode = 1;
  }
  return result;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
