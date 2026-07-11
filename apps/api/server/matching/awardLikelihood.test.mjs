import { describe, expect, it } from "vitest";
import {
  AWARD_LIKELIHOOD,
  CANONICAL_AWARD_LIKELIHOODS,
  normalizeAwardLikelihood,
  normalizeAwardLikelihoodWithTrace
} from "./awardLikelihood.mjs";

describe("canonical award-likelihood taxonomy", () => {
  it("preserves every canonical enum value including near_guaranteed", () => {
    expect(CANONICAL_AWARD_LIKELIHOODS).toEqual([
      "near_guaranteed",
      "likely",
      "possible",
      "unlikely",
      "unknown"
    ]);

    for (const value of CANONICAL_AWARD_LIKELIHOODS) {
      expect(normalizeAwardLikelihood(value)).toBe(value);
    }
    expect(AWARD_LIKELIHOOD.NEAR_GUARANTEED).toBe("near_guaranteed");
  });

  it("normalizes legacy spellings without upgrading unresolved values", () => {
    expect(normalizeAwardLikelihood("near-guaranteed")).toBe("near_guaranteed");
    expect(normalizeAwardLikelihood("near guaranteed")).toBe("near_guaranteed");
    expect(normalizeAwardLikelihood("high")).toBe("likely");
    expect(normalizeAwardLikelihood("uncertain")).toBe("possible");
    expect(normalizeAwardLikelihood("rare")).toBe("unlikely");
    expect(normalizeAwardLikelihood("not researched")).toBe("unknown");
    expect(normalizeAwardLikelihood(null)).toBe("unknown");

    expect(normalizeAwardLikelihoodWithTrace("not researched")).toMatchObject({
      canonical: "unknown",
      method: "manual_review_required",
      requiresManualAttention: true
    });
  });
});
