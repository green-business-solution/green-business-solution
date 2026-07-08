# Restart Handoff - 2026-07-07

This handoff captures the remaining work from the long grant/tax/form-catalog/AWS-migration conversation so a future Codex session can resume from GitHub without relying on chat memory.

## Current Project State

- Production traffic for `retrofi.org` and `www.retrofi.org` has been cut over to the dedicated RetroFi production AWS account `059310317821`.
- The old Green Business Solution account `448016109714` remains active only for explicit rollback history.
- GitHub Actions now deploys to the new RetroFi production account.
- Generated fixtures and GPT Pro work archives have been moved out of Git where practical and into development S3 storage.
- The production form-question catalog is now AWS-owned. Normal deploys should not seed or overwrite it; use `npm run form-catalog:export`, `npm run form-catalog:publish`, and `npm run form-catalog:rollback` for explicit catalog management.
- The main product TODO list is [product-todos.md](./product-todos.md).
- The AWS migration runbook is [aws-organization-migration-runbook.md](./aws-organization-migration-runbook.md).

## Before Continuing

Run these checks at the start of the next clean conversation:

```sh
git status --short --branch
git pull --ff-only origin main
AWS_PROFILE=retrofi-prod aws sts get-caller-identity
curl -sS --max-time 20 https://retrofi.org/api/health
```

Confirm the API health output points at the expected new-account resources and still shows the Geocodio quota guard configured.

Also verify the active form catalog is present in the new production account:

```sh
AWS_PROFILE=retrofi-prod npm run form-catalog:export -- --output /tmp/retrofi-form-question-catalog-smoke.json
```

The active catalog should have real retrofit questions and application requirement mappings. If this fails or exports an empty catalog, recover from the runtime-cache S3 copy or publish the last known good catalog explicitly with `npm run form-catalog:publish`.

## Remaining AWS Follow-Ups

1. Keep old-account references only where they are explicit rollback, data-copy, or historical migration context.
2. Verify GitHub Actions deploys still work after the cutover by reviewing the latest `main` deployment run and production smoke checks.
3. Confirm all required secrets exist in the new account deployment path: Google OAuth client secret, Geocodio API key, Google OAuth redirect configuration, alert email/Sender settings, and any other production parameters.
4. Confirm operational guardrails in the new Organization: root MFA, IAM Identity Center admin access, billing alerts/budgets, CloudTrail/security baseline, and contact/billing details.

## Current Product Resume Point

The next product work should not start with new GPT Pro research. Start by making the existing generated data and UI wiring reliable:

1. Verify form gates end to end.
   - The active AWS form catalog must include every required grant/tax/quote/bill/assessor/tax-return field needed before customer-facing opportunity financials are shown.
   - Add regression coverage proving the selected retrofit Opportunities tab never shows a raw `Requires` row for matched opportunities.
   - `needs_quote`, `needs_project_scope`, tax-bill, tax-return, assessor, and similar statuses are production form gates, not source-data repair blockers.

2. Resume scenario verification repairs from the saved GPT Pro summary:
   - Summary file: `GPT Pro Work/scenario-verification-gpt-pro-2026-07-03/scenario_verification_results_summary.md`
   - Reviewed decisions: 779
   - Usable as-is: 461
   - Concrete repairs needed: 82
   - Blocked by data/package gaps: 236
   - First concrete bugs to fix:
     - Richland Energy Services utility-territory leakage into the Seattle household test case.
     - Burlington Beer Company LED lighting incorrectly using an evaporator fan motor controls rule.

3. Regenerate recommendation/test fixtures after scenario-rule repairs and rerun scenario construction.

4. Only after scenario combinations are fixed, run the separate math verification pass for one-time costs, recurring costs/savings, grant/rebate/tax effects, caps, stacking, and payback.

## Grant And Tax Status

- Grant/rebate/tax v2 package work has been heavily repaired and is usable for current test-case production-style estimates when required user/project inputs exist.
- `form_input_required` cases are expected. The user flow should collect the missing quote, unit count, equipment selection, cost, bill, tax, or timing fields before showing final opportunity financials.
- Funding-sensitive programs still need a recurring funding-status refresh job before they can be treated as always-current.
- Tax calculations are source-backed for the current promoted tax workflows, but broader nationwide tax coverage remains future dataset/automation work.
- Tax document upload/parsing is still a TODO. For now, required tax facts should be captured as structured form inputs or synthetic test-case values.

## Important Product TODOs Still Open

- Backend publish gate for user-visible opportunities.
- User-overridable v2 incentive assumptions and visible placeholders, especially quantity defaults such as `unit_count = 1`.
- Tax input resolver that merges address-derived geography, official constants, uploaded/user/accountant facts, quote/bill facts, and synthetic defaults.
- Tax document ingestion pipeline for bills, returns, assessor notices, approval letters, exemption certificates, and workpapers.
- Recurring funding-status checks for while-funds-last incentives.
- User state tracking for already-implemented retrofits and state-dependent/dependent opportunities.
- User-selected opportunity planning where users can include/exclude opportunities from a scenario and immediately recalculate savings.
- Scenario math verification after scenario-combination repairs.
- Payback period on the test cases page.
- Automation for DSIRE/opportunity collection, source repair, incentive extraction, tax dataset refresh, fixture regeneration, and repair escalation.
- Research/modeling for regulatory penalties, environmental fines, carbon credits, RECs, clean-fuel credits, offsets, and environmental market instruments.

## Working Rules For Future Agents

- GitHub is the source of truth for code and docs.
- AWS is the deployment target and runtime data store.
- Do not put large GPT Pro prompt/output folders or generated fixtures back into Git unless there is a deliberate reason.
- Use S3/dev-work archives for large development artifacts.
- Do not use GPT Pro at runtime. GPT Pro is only an offline research/repair accelerator; imported outputs must pass deterministic validation before production use.
- Before editing, check branch/status and pull only when clean.
- After meaningful edits, follow `AGENT_WORKFLOW.md`, commit, push when the supervising workflow allows it, and deploy/apply AWS changes if runtime behavior, infrastructure, AWS data, or AWS configuration changed.
