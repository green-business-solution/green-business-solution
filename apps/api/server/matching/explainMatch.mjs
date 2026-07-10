import { normalizeAwardLikelihood } from "./awardLikelihood.mjs";

export function summarizeMatchResult(result) {
  return {
    opportunityId: result.opportunityId,
    opportunityName: result.opportunityName,
    offerId: result.offerId,
    retrofitTypeIds: result.retrofitTypeIds || [],
    retrofitTypes: result.retrofitTypes || [],
    sourceUrl: result.sourceUrl,
    websiteUrl: result.websiteUrl,
    applicationUrl: result.applicationUrl,
    eligibilityStatus: result.eligibilityStatus,
    rankScore: result.rankScore,
    opportunityDataConfidence: result.opportunityDataConfidence,
    userProfileCompleteness: result.userProfileCompleteness,
    matchedReasons: result.matchedReasons.slice(0, 6),
    unresolvedRequirements: result.unresolvedRequirements.slice(0, 6),
    blockers: result.blockers.slice(0, 6),
    nextQuestion: result.nextQuestion,
    requiresProgramApproval:
      typeof result.requiresProgramApproval === "boolean" ? result.requiresProgramApproval : null,
    approvalRequirements: result.approvalRequirements || [],
    approvalStage: result.approvalStage || "unknown",
    awardLikelihood: normalizeAwardLikelihood(result.awardLikelihood),
    awardLikelihoodReason: result.awardLikelihoodReason || "",
    awardLikelihoodEvidence: result.awardLikelihoodEvidence || "",
    awardLikelihoodEvidenceText: result.awardLikelihoodEvidenceText || "",
    awardLikelihoodEvidenceUrls: result.awardLikelihoodEvidenceUrls || [],
    reviewStatus: result.reviewStatus || "not_audited",
    sourceSummary: result.sourceSummary
  };
}

export function groupMatchResults(results) {
  const groups = new Map();
  for (const result of results) {
    const current = groups.get(result.eligibilityStatus) || [];
    current.push(result);
    groups.set(result.eligibilityStatus, current);
  }

  return Object.fromEntries(
    [...groups.entries()].map(([status, rows]) => [
      status,
      rows.sort((a, b) => b.rankScore - a.rankScore || b.opportunityDataConfidence - a.opportunityDataConfidence)
    ])
  );
}
