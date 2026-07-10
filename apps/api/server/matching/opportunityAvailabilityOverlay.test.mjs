import { describe, expect, it } from "vitest";
import {
  applyOpportunityAvailabilityOverlay,
  loadOpportunityAvailabilityOverlay
} from "./opportunityAvailabilityOverlay.mjs";
import { loadOpportunityAwardAuditOverlay } from "./opportunityAwardAuditOverlay.mjs";

describe("opportunity availability disposition overlay", () => {
  it("loads the authoritative 41-record disposition with exact lifecycle counts", () => {
    const overlay = loadOpportunityAvailabilityOverlay();
    const counts = Object.values(overlay.records).reduce((result, record) => {
      result[record.availabilityStatus] = (result[record.availabilityStatus] || 0) + 1;
      return result;
    }, {});

    expect(Object.keys(overlay.records)).toHaveLength(41);
    expect(counts).toEqual({
      conditional: 27,
      disabled: 9,
      quarantined: 4,
      archived: 1
    });
    expect(overlay.cohort.counts).toEqual({
      active: 1473,
      conditional: 27,
      disabled: 9,
      quarantined: 4,
      archived: 1
    });
    expect(JSON.stringify(overlay)).not.toContain("awardLikelihoodConfidence");
  });

  it("reconciles all 41 dispositions to the preserved 1,514-record audit cohort", () => {
    const availabilityOverlay = loadOpportunityAvailabilityOverlay();
    const awardOverlay = loadOpportunityAwardAuditOverlay();
    const reconciliation = awardOverlay.reconciliation;
    const unknownIds = Object.entries(awardOverlay.records)
      .filter(([, record]) => record.awardLikelihood === "unknown")
      .map(([opportunityId]) => opportunityId)
      .sort();

    expect(reconciliation).toMatchObject({
      expectedOpportunityCount: 1514,
      reviewedOpportunityCount: 1514,
      missingOpportunityCount: 0,
      duplicateOpportunityCount: 0,
      extraOutputCount: 0,
      rejectedOpportunityCount: 0
    });
    expect(Object.keys(awardOverlay.records)).toHaveLength(1514);
    expect(Object.keys(availabilityOverlay.records).sort()).toEqual(unknownIds);
    expect(
      availabilityOverlay.cohort.defaultActiveCount + availabilityOverlay.cohort.dispositionRecordCount
    ).toBe(1514);
  });

  it("propagates structured requirements and provenance independently from likelihood", () => {
    const [opportunity] = applyOpportunityAvailabilityOverlay(
      [{ opportunityId: "opp-1", awardLikelihood: "near_guaranteed" }],
      {
        records: {
          "opp-1": {
            availabilityStatus: "conditional",
            conditionalRequirements: [
              { type: "locality", description: "Resolve the property jurisdiction." }
            ],
            rationale: "A local ordinance controls availability.",
            officialUrls: ["https://example.gov/statute"],
            reviewedAt: "2026-07-10",
            dispositionProvenance: { sourceReports: ["challenge-archive-unknowns-r2"] }
          }
        }
      }
    );

    expect(opportunity).toMatchObject({
      awardLikelihood: "near_guaranteed",
      availabilityStatus: "conditional",
      availabilityLifecycle: {
        status: "conditional",
        conditionalRequirements: [
          { type: "locality", description: "Resolve the property jurisdiction." }
        ],
        rationale: "A local ordinance controls availability.",
        reviewedAt: "2026-07-10"
      }
    });
  });

  it("defaults records without a disposition to active", () => {
    const [opportunity] = applyOpportunityAvailabilityOverlay([{ opportunityId: "opp-active" }], {
      records: {}
    });
    expect(opportunity.availabilityStatus).toBe("active");
    expect(opportunity.availabilityLifecycle).toBeUndefined();
  });
});
