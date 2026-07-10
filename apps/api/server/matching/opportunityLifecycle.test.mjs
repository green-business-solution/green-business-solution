import { describe, expect, it } from "vitest";
import {
  CANONICAL_OPPORTUNITY_AVAILABILITY_STATUSES,
  isArchivedOpportunity,
  isMatchableOpportunity,
  isVisibleOpportunity,
  normalizeOpportunityAvailabilityStatus
} from "./opportunityLifecycle.mjs";

describe("opportunity availability lifecycle", () => {
  it("defines and preserves the canonical lifecycle", () => {
    expect(CANONICAL_OPPORTUNITY_AVAILABILITY_STATUSES).toEqual([
      "active",
      "conditional",
      "disabled",
      "quarantined",
      "archived"
    ]);
    for (const status of CANONICAL_OPPORTUNITY_AVAILABILITY_STATUSES) {
      expect(normalizeOpportunityAvailabilityStatus(status)).toBe(status);
    }
  });

  it("keeps only active opportunities matchable while retaining reversible records", () => {
    expect(isMatchableOpportunity({ availabilityStatus: "active" })).toBe(true);
    for (const status of ["conditional", "disabled", "quarantined", "archived"]) {
      expect(isMatchableOpportunity({ availabilityStatus: status })).toBe(false);
    }

    expect(isVisibleOpportunity({ availabilityStatus: "conditional" })).toBe(true);
    expect(isVisibleOpportunity({ availabilityStatus: "disabled" })).toBe(true);
    expect(isVisibleOpportunity({ availabilityStatus: "quarantined" })).toBe(true);
    expect(isVisibleOpportunity({ availabilityStatus: "archived" })).toBe(false);
    expect(isArchivedOpportunity({ lifecycleStatus: "archived" })).toBe(true);
  });

  it("normalizes legacy states conservatively", () => {
    expect(normalizeOpportunityAvailabilityStatus()).toBe("active");
    expect(normalizeOpportunityAvailabilityStatus("upcoming")).toBe("conditional");
    expect(normalizeOpportunityAvailabilityStatus("source_inaccessible")).toBe("quarantined");
    expect(normalizeOpportunityAvailabilityStatus("closed")).toBe("disabled");
    expect(normalizeOpportunityAvailabilityStatus("unexpected-state")).toBe("conditional");
  });
});
