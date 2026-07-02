# Matching Model

This is the first deterministic matching pipeline for RetroFi opportunity recommendations.

The current goal is not to train a recommendation model. The data does not yet have enough labeled
application outcomes. The first production version should be rules-first, evidence-backed, and explicit
about unknowns.

## Confidence Terms

- `match_confidence` is deterministic matching confidence. It should come from whether normalized opportunity data and normalized user data are complete enough for rules to resolve a match outcome. Repaired opportunities should be driven toward 100% `match_confidence`, meaning the matcher can return a math-backed outcome instead of an ambiguous parser failure.
- `source_confidence` is source/research confidence. It describes whether the opportunity facts are backed by clear, current, trustworthy evidence. Low `source_confidence` should be escalated for deeper GPT Pro research or human/admin verification even if deterministic matching can produce a 100% `match_confidence` result.
- Historical GPT Pro repair `confidence` values should be interpreted as `source_confidence`, not final deterministic match confidence.

## Pipeline

1. Preserve the original opportunity record exactly as ingested.
2. Build a generated `matchProfile` from the opportunity.
3. Normalize an intake form into a generated `userMatchProfile`.
4. Evaluate each required condition as `pass`, `fail`, or `unknown`.
5. Remove only definite mismatches.
6. Rank remaining opportunities inside result buckets.
7. Return explanations, blockers, unresolved requirements, confidence, and source summaries.

## Files

- `server/matching/criterionRegistry.mjs`: versioned list of criteria the matcher understands.
- `server/matching/ontologies.mjs`: utility, organization, building, technology, and state normalization.
- `server/matching/normalizeUserProfile.mjs`: current form intake to canonical user profile.
- `server/matching/buildOpportunityMatchProfile.mjs`: opportunity record to canonical match profile.
- `server/matching/evaluateRules.mjs`: deterministic three-valued eligibility and ranking.
- `scripts/run-sample-matching.mjs`: evaluates all current opportunities against sample users.
- `data/sample_user_profiles.json`: ten clean sample users matching the current form.
- `data/sample_matching_report.md`: generated audit report from the current opportunity table.

## Current User Burden Policy

Do not add broad new required questions to the initial form.

The matcher should derive these first:

- State and ZIP from address text.
- Utility ID from the self-reported utility.
- Organization type from current form options.
- Building type from current form options.
- Technology IDs from interested improvements.
- Square footage from the free-text square-footage field.

Additional questions should be generated only when they unblock many otherwise-promising matches. Examples:

- Confirm electric distribution utility when the selected value is `Other / Not sure`.
- Confirm owner approval for leased sites when a strong match requires permanent installation.
- Ask charger count/level only when EV opportunities are already promising.
- Ask peak demand only when a promising opportunity has a demand threshold.

## Result Buckets

- `eligible`: no known blocker and all extracted required checks pass.
- `likely_eligible`: no known blocker, high score, but some checks are unknown.
- `needs_information`: no known blocker, but missing facts materially affect eligibility.
- `upcoming`: opportunity appears future-dated.
- `manual_review`: opportunity extraction is too weak for automatic matching.
- `ineligible`: explicit non-availability-independent mismatch.
- `unavailable`: deadline/status indicates the opportunity is not currently available.

## Known Limitations

- The current form has mostly California utility options. Non-California sample users normalize to
  `Other / Not sure`, which correctly produces utility unknowns.
- DSIRE `parameterSets` are partially normalized into offers, but source semantics still need manual
  spot checks to prevent residential/commercial leakage.
- Intake records now use Census Geocoder, with optional Geocodio fallback, to resolve address
  geography for new submissions. Matching still does not call utility service-territory polygons yet.
- `data/sample_matching_report.md` is not a human-reviewed ground-truth set. It is an audit artifact
  showing where to inspect and improve extraction.

## Realistic Validation Loop

The requested exhaustive manual review of every opportunity against every sample user would mean
20,960 pairings for the current data. The repo now has the machinery to evaluate every pairing, but
ground truth should be built incrementally:

1. Run `npm run matching:sample`.
2. Inspect the top 20 promising results for each sample user.
3. Label false positives, false negatives, and ambiguous cases.
4. Update ontology/extraction rules or add source-specific cleanup.
5. Rerun the sample matcher.
6. Promote repeatedly failing examples into regression tests.

This preserves forward motion without pretending ambiguous source data has been fully adjudicated.
