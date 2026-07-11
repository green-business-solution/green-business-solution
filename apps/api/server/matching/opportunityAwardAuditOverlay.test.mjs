import { describe, expect, it } from "vitest";
import { applyOpportunityAwardAuditOverlay } from "./opportunityAwardAuditOverlay.mjs";

describe("opportunity award-audit overlay", () => {
  it("propagates canonical likelihood and preserved evidence without coupling approval", () => {
    const [opportunity] = applyOpportunityAwardAuditOverlay(
      [{ opportunityId: "opp-1", awardLikelihood: "unknown", requiresProgramApproval: false }],
      {
        records: {
          "opp-1": {
            requiresProgramApproval: true,
            approvalRequirements: ["routine filing"],
            approvalStage: "after_installation",
            awardLikelihood: "near-guaranteed",
            awardLikelihoodReason: "The benefit is statutory.",
            awardLikelihoodEvidence: "Official form language.",
            evidenceText: "A qualifying filer receives the credit.",
            evidenceUrls: { normalized: ["https://example.gov/form"] },
            auditTrace: { sourceTrace: { awardLikelihoodSource: "near_guaranteed" } },
            reviewStatus: "audited",
            reviewedAt: "2026-07-10T12:00:00.000Z"
          }
        }
      }
    );

    expect(opportunity).toMatchObject({
      awardLikelihood: "near_guaranteed",
      requiresProgramApproval: true,
      awardLikelihoodReason: "The benefit is statutory.",
      awardLikelihoodEvidence: "Official form language.",
      awardLikelihoodEvidenceText: "A qualifying filer receives the credit.",
      awardLikelihoodEvidenceUrls: ["https://example.gov/form"],
      reviewStatus: "audited"
    });
  });

  it("leaves opportunities without an overlay record unchanged", () => {
    const source = { opportunityId: "opp-2", awardLikelihood: "likely" };
    expect(applyOpportunityAwardAuditOverlay([source], { records: {} })[0]).toBe(source);
  });
});
