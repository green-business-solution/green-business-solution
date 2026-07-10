# Opportunity Award Audit Kit

Use this folder to hand off unique retrofit opportunities to GPT Pro for approval-audit and award-likelihood review.

## Data source and dedupe rule

- Source file: `public/retrofit_opportunity_index.json`
- Opportunities are deduplicated strictly by `opportunityId` before batching.
- Flattened retrofit associations are collapsed into one opportunity row, with `relatedRetrofits` carried for reference.

## Batches

- `batch-###_input.json` contains the batch input opportunities.
- `batch-###_prompt.md` contains the exact GPT prompt text for that batch.
- `batch-###_output.json` is the initial empty output location for GPT results.
- Filenames follow `batch-001_input.json`, `batch-001_prompt.md`, `batch-001_output.json`.

## Exact handoff workflow

For each batch:

1. Open `batch-###_prompt.md`.
2. Send it to GPT Pro and complete the audit.
3. Save GPT Pro JSON output into `batch-###_output.json`.
4. Validate outputs later with `scripts/validate-opportunity-award-audit-outputs.mjs`.

## Required output schema

- JSON Schema file: `opportunity-award-audit-schema.json`
- Required field list per review:
  `opportunityId`, `requiresProgramApproval`, `approvalRequirements`, `approvalStage`,
  `awardLikelihood`, `awardLikelihoodReason`, `evidenceUrls`, `evidenceText`,
  `reviewedAt`, `reviewStatus`.
- `awardLikelihood` must be explicit for every review, including `near_guaranteed`.
- `awardLikelihoodConfidence` is intentionally not used.

## Scripts

- `node scripts/generate-opportunity-award-audit-batches.mjs`
  regenerates all numbered batches from the canonical dataset.
- `node scripts/validate-opportunity-award-audit-outputs.mjs`
  validates completed output files against `opportunity-award-audit-schema.json`.

