# Restart Handoff - 2026-06-29

This document captures the work completed before restarting the machine/conversation and the remaining work to continue from a fresh chat.

## Current Repo State

- Branch: `main`
- Latest pushed commit at handoff: `b6be54f Apply GPT Pro opportunity data repair batch`
- Working tree at handoff should be clean.
- Production frontend/static data was deployed to S3 and CloudFront invalidation was submitted:
  - Distribution: `E3IN1F29FNWPZH`
  - Invalidation: `ICKV34EAAMUHF90A9H3NQH3TCI`
  - The invalidation was still `InProgress` when last checked.

## What Was Completed

### Public Opportunity Availability

- The public opportunity availability review was repaired down to zero uncertain public availability records in the earlier pass.
- Unavailable opportunities were archived out of active public fixtures.
- Upcoming opportunities were moved out of active public fixtures into the hidden/upcoming buckets.
- Key artifacts:
  - `data/public_opportunity_availability_reviews.json`
  - `data/public_opportunity_availability_review_report.md`
  - `data/public_opportunity_archive_report.md`
  - `public/retrofit_opportunity_index.json`
  - `public/sample_matching_test_cases.json`

### One-Time Incentive Rules

- Imported all GPT Pro one-time incentive-rule repair batches from June 28.
- Current state from `data/opportunity_incentive_rules.json`:
  - `rules.length`: 768
  - `manualRepairTargetCount`: 0
  - `researchReviewedNoRule.length`: 509
  - `possible_grant` rules: 25
- The rule importer keeps source-backed formulas and moves reviewed no-rule records out of the active repair queue.
- Key artifacts:
  - `data/opportunity_incentive_rules.json`
  - `data/opportunity_incentive_rule_research_repairs_gpt_pro_2026-06-28_batch1.json` through `batch13.json`
  - `data/opportunity_incentive_rule_research_repairs_codex_2026-06-29_nevi_possible_grants.json`
  - `scripts/apply-incentive-rule-research-repairs.mjs`

### Savings Estimate Model

- Added explicit separation of:
  - deterministic one-time savings
  - possible grant money
  - gross recurring savings
  - recurring expenses
  - net recurring savings
- Added `rate_per_battery_kwh` rule support for future/imported battery-storage incentives.
- Added NEVI-style possible grant rules as possible grant money, not deterministic savings.
- Updated the savings card UI into three equation-style sections:
  - one-time equation
  - recurring monthly equation
  - possible grant money
- Deployed these frontend/static changes.

### Test Case Savings Fixtures

- Updated the existing admin test cases rather than creating new ones.
- Current public sample fixture state:
  - `public/sample_matching_test_cases.json`
  - `testCases.length`: 50
  - `opportunityIncentiveRuleCount`: 767 in the public fixture at handoff
- The public fixture may show one fewer usable rule than the raw rules file because generation filters inactive/low-confidence rules.

### Opportunity Data Repair Workflow

- Created GPT Pro opportunity-data repair target file:
  - `data/opportunity_data_research_targets_for_gpt_pro.json`
  - 75 active/rolling lower-confidence opportunities selected for repair.
- Ran a Codex independent baseline repair pass:
  - `data/opportunity_data_research_repairs_codex_2026-06-29_batch1.json`
  - `data/opportunity_data_codex_facility_reviews.json`
  - `data/opportunity_data_codex_utility_reviews.json`
  - related reports in `data/`.
- Compared GPT Pro's first 20 repaired opportunity-data records against the Codex baseline.
- Accepted GPT Pro as better for that batch because it added source-specific blockers and corrected over-broad Codex inferences.
- Imported GPT Pro opportunity-data repair batch 1:
  - `data/opportunity_data_research_repairs_gpt_pro_2026-06-29_batch1.json`
  - 20 opportunity repairs.
- Added repeatable importer:
  - `scripts/apply-opportunity-data-research-repairs.mjs`
- Wired sample matching generation to load opportunity-data repairs:
  - `scripts/run-sample-matching.mjs`
  - `server/matching/buildOpportunityMatchProfile.mjs`
- Applied batch 1 to public fixtures:
  - 315 public retrofit-opportunity edges patched.
  - 20 unique public opportunities patched.
  - 16 test-case opportunity edges patched.
- Important corrected examples:
  - Black Hills WY (`SOURCE_DSIRE:dsire_program_id:3157`) now carries `temporarily_closed` repair evidence and appears as `uncertain` rather than cleanly active.
  - Modesto Irrigation District (`SOURCE_DSIRE:dsire_program_id:1885`) now carries `source_inaccessible` / `unknown` repair evidence and appears as `uncertain`.
  - SoCalGas (`SOURCE_DSIRE:dsire_program_id:4952`) is constrained to non-residential natural-gas equipment scope and no longer drifts into solar PV or residential matching.

## Checks Already Run

- `node --check scripts/apply-opportunity-data-research-repairs.mjs`
- `node --check scripts/run-sample-matching.mjs`
- `node --check server/matching/buildOpportunityMatchProfile.mjs`
- `npm run typecheck`
- `npm test`
  - 15 test files passed.
  - 82 tests passed.
- `npm run build`
- Static-only deploy to production S3/CloudFront.

One failed check happened first because `npm test -- --runInBand` is a Jest flag and Vitest rejected it. The correct `npm test` command was rerun and passed.

## What Still Needs To Be Done

### Highest Priority: Repair Opportunity Data To 100% Matching Confidence

Goal: every opportunity used for matching should have complete, source-backed data so the test-case modal no longer shows broken or low-confidence data and all opportunities can reach 100% opportunity-data confidence where possible.

This means continuing the opportunity-data repair workflow until there are no broken or under-specified records:

- Continue from GPT Pro's first batch continuation point:
  - `SOURCE_DSIRE:dsire_program_id:22050`
- For each next GPT Pro batch:
  - compare GPT Pro output against the Codex baseline in `data/opportunity_data_research_repairs_codex_2026-06-29_batch1.json`
  - prefer GPT Pro where it has stronger official-source evidence
  - keep or merge Codex details only when they are more specific and source-backed
  - save the GPT Pro batch as a new `data/opportunity_data_research_repairs_gpt_pro_2026-06-29_batchN.json`
  - run `node scripts/apply-opportunity-data-research-repairs.mjs <batch-file>`
  - regenerate or patch public fixtures as needed
  - run checks
  - commit, push, and deploy static fixtures if public data changes

The next agent should not assume all 75 target opportunities are repaired yet. Only the first GPT Pro batch of 20 has been imported.

### Make Confidence More Strict And More Visible

- Review how `opportunityDataConfidence` is calculated in `server/matching/buildOpportunityMatchProfile.mjs`.
- Decide whether repaired records with high-confidence GPT Pro data should be allowed to reach 100% confidence instead of capped around the current extractor confidence values.
- Decide how to display repaired blockers/requirements in the modal. The repair object is now attached to public opportunity summaries as `opportunityDataRepair`, but the modal still mostly shows the older evaluated `matchedReasons`, `unresolvedRequirements`, and `blockers`.
- Consider adding a modal section for:
  - repaired eligible applicants
  - repaired geography/utility territories
  - repaired hard requirements
  - repaired blockers
  - repaired evidence text

### Continue Opportunity Data Repair Batches

- Ask GPT Pro for the next opportunity-data repair batch starting at:
  - `SOURCE_DSIRE:dsire_program_id:22050`
- Keep using the same schema:
  - `opportunity_data_research_repairs.v1`
- Recommended prompt context:
  - tell GPT Pro to use official/current source pages
  - ask it to include source-backed geography, eligible applicant types, eligible sectors, retrofit categories, hard requirements, blockers, program type, administrator, application URL, website URL, evidence, and reasoning
  - ask it to explicitly mark source-inaccessible or no-current-source records instead of guessing

### Revisit Public Fixture Regeneration

- The batch-1 importer patched existing public/test JSON directly.
- `scripts/run-sample-matching.mjs` is now wired to load the opportunity-data repair artifact before extracting matching profiles, so future full regeneration should preserve these repairs.
- Before broad regeneration, confirm whether it should load one combined repair file or multiple GPT Pro batch files.
- Current importer accepts one repair file at a time. A future improvement would be:
  - allow multiple repair paths
  - or create a combined `data/opportunity_data_research_repairs_gpt_pro_2026-06-29_all.json`

### Savings Model Follow-Ups

- Grants with clear deterministic one-time formulas should remain in one-time savings.
- Grants with arbitrary/unknown possible ranges should remain separate as possible grant money.
- Recurring savings and recurring expenses should stay separate, with net recurring savings shown as savings or fee based on sign.
- Tariffs/rates should be modeled as recurring expenses or recurring savings, not one-time savings, unless the source truly describes a waived upfront charge.
- Battery-kWh rule support exists, but it only affects rules using:
  - `amountRule.kind: "rate_per_battery_kwh"`
  - corresponding profile/test-case battery capacity inputs.
- If GPT Pro finds battery-kWh incentive rules later, import them using that amount-rule kind.

### Deployment Notes

- Full production deploy with Lambda requires `GOOGLE_CLIENT_SECRET`.
- Frontend/static-data-only deploy does not require the Google secret.
- Static deploy used:
  - `npm run build`
  - `aws s3 sync dist/ s3://gbs-retrofi-org-frontend-448016109714/ --delete --cache-control "public,max-age=60"`
  - `aws s3 sync dist/assets/ s3://gbs-retrofi-org-frontend-448016109714/assets/ --delete --cache-control "public,max-age=31536000,immutable"`
  - CloudFront invalidation on `E3IN1F29FNWPZH`

## Useful Recent Commits

- `b6be54f Apply GPT Pro opportunity data repair batch`
- `d1cce98 Add Codex opportunity data repair baseline`
- `f7b5de9 Add GPT Pro opportunity data repair targets`
- `4de78e3 Simplify savings estimate card layout`
- `d542c09 Add NEVI possible grant money rules`
- `477a00a Add recurring expense and possible grant savings fields`
- `46597f7 Apply final GPT Pro incentive repair batch`

## Suggested First Steps In The Next Conversation

1. Check git status and pull.
2. Confirm CloudFront invalidation `ICKV34EAAMUHF90A9H3NQH3TCI` completed.
3. Ask GPT Pro for the next opportunity-data repair batch starting at `SOURCE_DSIRE:dsire_program_id:22050`.
4. Compare that batch against the Codex baseline.
5. Import accepted repairs with `scripts/apply-opportunity-data-research-repairs.mjs`.
6. Improve or combine the importer if multiple batch files should be loaded during fixture regeneration.
7. Continue until all matching opportunities have complete repaired data and the confidence target is met.
