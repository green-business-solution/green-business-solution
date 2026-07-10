import fs from "node:fs";
import path from "node:path";
import { normalizeAwardLikelihood } from "./awardLikelihood.mjs";

export const OPPORTUNITY_AWARD_AUDIT_OVERLAY_SCHEMA_VERSION = "opportunity_award_audit_overlay.v1";

let cachedDefaultOverlay = null;

function resolveDefaultOverlayPath() {
  const candidates = [
    path.resolve(import.meta.dirname, "..", "..", "data", "opportunity_award_audit_overlay.v1.json"),
    path.resolve(import.meta.dirname, "..", "..", "..", "..", "data", "opportunity_award_audit_overlay.v1.json")
  ];
  return candidates.find((candidate) => fs.existsSync(candidate)) || candidates[0];
}

export function loadOpportunityAwardAuditOverlay(filePath = resolveDefaultOverlayPath()) {
  if (!filePath) {
    return null;
  }
  if (filePath === resolveDefaultOverlayPath() && cachedDefaultOverlay) {
    return cachedDefaultOverlay;
  }
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const overlay = JSON.parse(fs.readFileSync(filePath, "utf8"));
  if (overlay?.schemaVersion !== OPPORTUNITY_AWARD_AUDIT_OVERLAY_SCHEMA_VERSION || !overlay?.records) {
    throw new Error(`Invalid opportunity award-audit overlay at ${filePath}`);
  }
  if (filePath === resolveDefaultOverlayPath()) {
    cachedDefaultOverlay = overlay;
  }
  return overlay;
}

export function applyOpportunityAwardAuditRecord(opportunity, overlayRecord) {
  if (!opportunity || !overlayRecord) {
    return opportunity;
  }

  return {
    ...opportunity,
    requiresProgramApproval:
      typeof overlayRecord.requiresProgramApproval === "boolean" ? overlayRecord.requiresProgramApproval : null,
    approvalRequirements: Array.isArray(overlayRecord.approvalRequirements) ? overlayRecord.approvalRequirements : [],
    approvalStage: overlayRecord.approvalStage || "unknown",
    awardLikelihood: normalizeAwardLikelihood(overlayRecord.awardLikelihood),
    awardLikelihoodReason: overlayRecord.awardLikelihoodReason || "",
    awardLikelihoodEvidence: overlayRecord.awardLikelihoodEvidence || "",
    awardLikelihoodEvidenceText: overlayRecord.evidenceText || "",
    awardLikelihoodEvidenceUrls: Array.isArray(overlayRecord.evidenceUrls?.normalized)
      ? overlayRecord.evidenceUrls.normalized
      : [],
    awardLikelihoodAuditTrace: overlayRecord.auditTrace || null,
    reviewStatus: overlayRecord.reviewStatus || "not_audited",
    reviewedAt: overlayRecord.reviewedAt || null
  };
}

export function applyOpportunityAwardAuditOverlay(opportunities, overlay = loadOpportunityAwardAuditOverlay()) {
  const records = overlay?.records || {};
  return (Array.isArray(opportunities) ? opportunities : []).map((opportunity) =>
    applyOpportunityAwardAuditRecord(opportunity, records[opportunity?.opportunityId])
  );
}
