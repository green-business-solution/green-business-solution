export const AWARD_LIKELIHOOD = Object.freeze({
  NEAR_GUARANTEED: "near_guaranteed",
  LIKELY: "likely",
  POSSIBLE: "possible",
  UNLIKELY: "unlikely",
  UNKNOWN: "unknown",
});

export const CANONICAL_AWARD_LIKELIHOODS = Object.freeze(
  Object.values(AWARD_LIKELIHOOD),
);

const canonicalAwardLikelihoods = new Set(CANONICAL_AWARD_LIKELIHOODS);
const legacyAwardLikelihoods = new Map([
  ["near-guaranteed", AWARD_LIKELIHOOD.NEAR_GUARANTEED],
  ["near guaranteed", AWARD_LIKELIHOOD.NEAR_GUARANTEED],
  ["nearguaranteed", AWARD_LIKELIHOOD.NEAR_GUARANTEED],
  ["high", AWARD_LIKELIHOOD.LIKELY],
  ["uncertain", AWARD_LIKELIHOOD.POSSIBLE],
  ["rare", AWARD_LIKELIHOOD.UNLIKELY],
  ["low", AWARD_LIKELIHOOD.UNLIKELY],
]);

function asNormalizedString(value) {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

export function normalizeAwardLikelihoodWithTrace(value) {
  const original = typeof value === "string" ? value.trim() : "";
  const normalized = asNormalizedString(value);

  if (!normalized) {
    return {
      canonical: AWARD_LIKELIHOOD.UNKNOWN,
      method: "missing",
      requiresManualAttention: true,
      notes: ["awardLikelihood was missing."],
      original,
    };
  }

  if (canonicalAwardLikelihoods.has(normalized)) {
    return {
      canonical: normalized,
      method: "canonical",
      requiresManualAttention: false,
      notes: [],
      original,
    };
  }

  const legacy = legacyAwardLikelihoods.get(normalized);
  if (legacy) {
    return {
      canonical: legacy,
      method: `legacy_${normalized.replace(/[^a-z0-9]+/g, "_")}`,
      requiresManualAttention: false,
      notes: [`Mapped legacy awardLikelihood ${original} to ${legacy}.`],
      original,
    };
  }

  return {
    canonical: AWARD_LIKELIHOOD.UNKNOWN,
    method: "manual_review_required",
    requiresManualAttention: true,
    notes: [`Unrecognized awardLikelihood: ${original}`],
    original,
  };
}

export function normalizeAwardLikelihood(value) {
  return normalizeAwardLikelihoodWithTrace(value).canonical;
}

export function isNearGuaranteedAwardLikelihood(value) {
  return normalizeAwardLikelihood(value) === AWARD_LIKELIHOOD.NEAR_GUARANTEED;
}
