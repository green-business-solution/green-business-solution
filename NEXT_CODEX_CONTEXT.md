# Next Codex Context

Prepared for the next Neer Codex session.

Last reviewed on July 9, 2026 against repository commit `84686e2` on branch `codex/ai-workflow-docs`, rebased onto `origin/main`.

## Purpose

This file is a compact restart context for the RetroFi application implementation plan and the work Codex has already finished.
Use it to get oriented before starting product, frontend, backend, data, or deployment work.
It does not replace the canonical docs listed below.

## Start Here

Work from `/Users/vikas/green-business-solution-ai-workflow` unless the user explicitly says otherwise.
The older `/Users/vikas/green-business-solution` checkout exists, but it was observed to be far behind `origin/main` during this handoff.

Before editing, run:

```sh
git status --short --branch
git fetch origin
git rebase origin/main
```

Read these files before meaningful work:

- `AGENTS.md`
- `AGENT_WORKFLOW.md`
- `review.md`
- `ARCHITECTURE.md`
- `RESOURCE_MAP.md`
- `TASK_LIST.md`
- `docs/product-vision.md`
- `docs/product-todos.md`
- `docs/restart-handoff-2026-07-07.md`

For docs-only changes, inspect the diff and run a focused readability and path sanity check.
For runtime, data, infrastructure, auth, deployment, or user-flow changes, use `RESOURCE_MAP.md` to pick checks and deployment targets.

## Product Direction

RetroFi is a B2B sustainability retrofit platform for medium-sized businesses.
It should help companies identify eligible sustainability incentives, estimate savings, and build a retrofit roadmap.
It should feel like a serious climate-tech operating tool, not a rebate directory, government portal, ESG dashboard, nonprofit page, or consumer solar quote site.

The intended user journey is:

1. Business intake.
2. Initial opportunity preview.
3. Utility bill upload.
4. Opportunity ranking.
5. Savings estimates.
6. Implementation plan.

The public site should drive visitors to `Get Started`, collect business-first intake, save the record through the API, then route to `/scan/results`.
The current `/scan/results` page is a placeholder that says the free scan is being prepared.
The deeper utility-bill upload and ranked recommendation experience remains planned work.

Primary public CTA:

- `Get Started`

Secondary CTA:

- `See How It Works`

Do not make `Request Demo` the primary CTA.

## Current Routes

Key public routes:

- `/` for home.
- `/how-it-works` for the full process explanation.
- `/pricing` for project-based pricing.
- `/about` for the about hub.
- `/about/mission`, `/about/team`, `/about/trust`, and `/about/contact` for focused about pages.
- `/scan` for free scan intake.
- `/scan/results` for the post-submit placeholder.
- `/sign-in` for report and dashboard sign-in.
- `/database` currently maps to the admin-backed database view.

Compatibility routes:

- `/get-started` routes to `/scan`.
- `/for-businesses` routes home.

Admin and internal routes include `/admin`, `/admin/application-sources`, `/admin/application-profiles`, `/admin/dashboard-performance-data`, `/portal-preview`, `/user-preview`, and `/testcases`.

## Architecture Snapshot

The repository is an npm workspace monorepo.
Frontend code lives under `apps/web`.
Backend API code lives under `apps/api`.

Production runs at `https://retrofi.org`.
CloudFront serves the built Vite frontend from S3.
CloudFront routes `/api/*` to API Gateway and Lambda.
The Lambda wraps the same Express app used in local development.

Important boundaries:

- Browser code is untrusted and must never receive AWS credentials, backend secrets, OAuth client secrets, private keys, database credentials, or raw secret values.
- Backend API owns Google OAuth, DynamoDB, S3 presigned URLs, matching, savings, tax, grants, application profiles, Geocodio usage state, and admin operations.
- Runtime truth lives in AWS.
- GitHub is the source of truth for code and docs.

Useful local commands:

```sh
aws sso login --profile gbs
npm install
npm run dev
npm run typecheck
npm run build
npm run check -w @gbs/api
npm test
```

Local dev starts the API at `http://127.0.0.1:8787` and Vite at the first available port starting at `http://127.0.0.1:5173`.

## AWS And Deployment State

Production has been moved into the dedicated RetroFi AWS Organization.
The production workload account is `059310317821`.
The management account is `945129430686`.
The legacy Green Business Solution account is `448016109714`.

Production deploys should use `retrofi-prod` where appropriate.
Some docs and scripts still mention the old `gbs` profile for local development, legacy resources, rollback history, or data-copy history.
Auditing and cleaning up those references is still an open task.

Production domain state:

- `retrofi.org` and `www.retrofi.org` serve from the new RetroFi production account.
- Current CloudFront distribution is `EDUJMKVIUDD3Z`.
- Current CloudFront domain is `d1l4o8icodiv1l.cloudfront.net`.
- Current hosted zone is `Z10326481HHLW5TKN20XQ`.
- The old hosted zone `Z04402863EVV8FUF4EWUX` was retained temporarily for resolver-cache and rollback safety.

Deployment commands:

```sh
npm run deploy:production:auto
npm run deploy:production:frontend
npm run deploy:production:api
npm run deploy:production:infra
npm run deploy:production:data
npm run deploy:production:ci
```

Confirm the intended AWS profile and account before any local production deploy:

```sh
aws sts get-caller-identity --profile retrofi-prod
```

GitHub Actions deploys from `main` using OIDC into account `059310317821`.
Documentation-only changes normally need no AWS deployment.

## Runtime Data And Artifacts

DynamoDB runtime tables include:

- `gbs-users`
- `gbs-client-intake`
- `gbs-opportunity-candidates`
- `gbs-dashboard-performance`
- `gbs-retrofit-recommendation-cache`
- `gbs-application-profiles`
- `gbs-api-runtime-state`

S3 runtime and development buckets include:

- Energy upload bucket for customer utility and Green Button files.
- Runtime-cache bucket for generated recommendation payloads.
- Generated-test-fixtures bucket for synthetic fixtures.
- Artifact bucket for Lambda package zips.
- Dev-work bucket for raw GPT Pro prompt and output archives.

Do not put large GPT Pro work folders or generated fixture archives back into Git.
Use the private S3 dev-work and generated-fixtures buckets unless there is a deliberate reason to commit a normalized artifact.

The production form-question catalog is AWS-owned.
Normal production deploys should not seed or overwrite it.
Use explicit catalog commands:

```sh
npm run form-catalog:export
npm run form-catalog:publish
npm run form-catalog:rollback
```

Before changing form-gate behavior, verify the active AWS catalog includes the required grant, tax, quote, bill, assessor, and tax-return fields.

## What Codex Has Finished

Codex has adopted the durable AI workflow structure.
This includes `ARCHITECTURE.md`, `RESOURCE_MAP.md`, `TASK_LIST.md`, `review.md`, `template.md`, ADRs, `AI_RESOURCES/`, updated `AGENTS.md`, and updated `AGENT_WORKFLOW.md`.

Codex has reorganized the app into npm workspaces.
Frontend dependencies and source live under `apps/web`.
API Lambda runtime dependencies and source live under `apps/api`.
Lambda packaging now installs from the API workspace so frontend build tooling does not ship in the Lambda zip.

Codex has split production deployment and infrastructure.
There are separate CloudFormation templates for GitHub OIDC, runtime data, runtime buckets, API hosting, and frontend/edge hosting.
The deploy script supports path-selected `ci`, `data`, `api`, `infra`, and `frontend` targets.
CI uses path-routed checks and deploy target selection.
Production deploys skip unchanged Lambda packages and unchanged frontend uploads by hash.

Codex has migrated production from the old Green Business Solution account to the dedicated RetroFi AWS Organization.
DynamoDB tables, current S3 objects, versioned generated fixtures, versioned dev-work archives, API hosting, frontend hosting, CloudFront aliases, GitHub deploy role, and domain ownership were moved or recreated.
Old-account cleanup was recorded after live production was verified.

Codex has built and refined the current public homepage direction.
Recent work added the scroll-frame scanner hero, scanner JPEG frame manifest, premium light infographic section, homepage copy transitions, and a refined climate-tech visual system.
The home page now uses the animated scanner hero and points toward outcome-specific incentive CTAs.

Codex has merged the home How It Works journey into the home page and reused the same journey component for `/how-it-works`.
Earlier local scanner-to-dashboard and dashboard-to-How-It-Works transitions were iterated heavily, but the current top-level state is the scanner hero plus refined premium homepage treatment.

Codex has built the business-first intake and post-submit flow.
The intake form prioritizes company and site information before personal contact information.
Submission saves through the API and routes to `/scan/results`.
The current results page is intentionally a clean preparation placeholder.

Codex has added Google-backed sign-in, admin access, intake storage, and admin inspection surfaces.
Admin users are documented in `docs/data-model.md`.
Local API diagnostics exist at `/api/diagnostics`.
Production health exists at `/api/health`.

Codex has built a DSIRE-backed opportunity candidate pipeline and admin database view.
`gbs-opportunity-candidates` stores DSIRE opportunity records.
The `/database` surface projects DSIRE records into a public database-like shape while the final reviewed relational opportunity database remains future work.

Codex has repaired large portions of opportunity matching, data quality, availability, utility restrictions, facility eligibility, savings, grants, tax workflows, and generated fixtures.
The detailed repair artifacts and reports live under `data/`, with large GPT Pro work archived outside Git.

Codex has built v2 grant, tax, and incentive calculation support for current test-case production-style estimates when required inputs exist.
Form-input-required outcomes are expected and should be treated as production gates, not source-data repair failures.
Tax document parsing and nationwide tax automation remain future work.

Codex has created the unified runtime-backed form-question catalog.
Retrofit questions, opportunity application-prep requirements, and profile-backed requirements can be assembled into forms.
The active production catalog now lives in AWS and must be managed explicitly.

Codex has implemented application-source discovery and application-profile workflows.
The first-10 application prep run improved from all source-only rows to finding official websites and application artifacts for all 10 sampled opportunities.
Application profile admin endpoints and UI panels now support draft generation, import, approval, rejection, archive, and customer-ready profile views.

Codex has documented the July 2026 restart handoff in `docs/restart-handoff-2026-07-07.md`.
That document is still the best focused resume point for form gates, scenario verification, grant/tax cleanup, and AWS migration follow-up.

## Most Important Open Work

Start with reliability before new research.
Do not begin the next product session by creating more GPT Pro research unless the user specifically asks for it.

Highest-priority next work:

1. Verify form gates end to end.
2. Ensure user-visible matched opportunities never leak raw `Requires` rows.
3. Confirm `needs_quote`, `needs_project_scope`, bill, tax-bill, tax-return, assessor, and similar statuses behave as user input gates.
4. Verify the production AWS form catalog contains all required fields for grant, tax, quote, bill, assessor, tax-return, and application-prep flows.
5. Resume scenario verification repairs from the saved GPT Pro summary.
6. Fix the first known concrete scenario bugs.
7. Regenerate recommendation and test fixtures after scenario-rule repairs.
8. Run scenario math verification after scenario-combination repairs.

Known scenario verification resume details from `docs/restart-handoff-2026-07-07.md`:

- Saved GPT Pro summary path: `GPT Pro Work/scenario-verification-gpt-pro-2026-07-03/scenario_verification_results_summary.md`.
- Reviewed decisions: 779.
- Usable as-is: 461.
- Concrete repairs needed: 82.
- Blocked by data or package gaps: 236.
- First bug: Richland Energy Services utility-territory leakage into the Seattle household test case.
- Second bug: Burlington Beer Company LED lighting incorrectly using an evaporator fan motor controls rule.

Other important open items:

- Backend publish gate for user-visible opportunities.
- User-overridable v2 incentive assumptions and visible placeholders.
- Tax input resolver that merges address geography, official constants, uploaded documents, user or accountant facts, quote and bill facts, and synthetic defaults.
- Tax document ingestion for bills, returns, assessor notices, approval letters, exemption certificates, and workpapers.
- Recurring funding-status refresh for while-funds-last incentives.
- User state tracking for already-completed retrofits and state-dependent incentives.
- User-selected opportunity planning with dynamic recalculation.
- Payback period information on the test cases page.
- Automation for DSIRE collection, source repair, incentive extraction, tax dataset refresh, fixture regeneration, and repair escalation.
- Decision about whether `docs/architecture-resource-map.md` should merge into root `RESOURCE_MAP.md`.
- Audit of docs and scripts that still assume legacy `gbs` production access or account `448016109714`.

## Application Prep Context

The first application-prep export originally failed to find useful application details for the first 10 sampled DSIRE opportunities.
After the application-source and requirement-extraction fixes, the same sample found official websites for 10 of 10 and application artifacts for 10 of 10.

After-fix aggregate result:

- Program websites found: 10 of 10.
- Application artifacts found: 10 of 10.
- Primary application artifacts found: 8 of 10.
- Application URLs found: 6 of 10.
- PDFs or supporting docs found: 6 of 10.
- Useful requirements extracted: 7 of 10.
- Requirements ready for admin review: 6 of 10.
- Needs manual review: 1 of 10.
- JavaScript or blocked source: 1 of 10.
- Needs user selection: 1 of 10.
- Closed or funding exhausted: 1 of 10.

Key files:

- `APPLICATION_PREP_FIRST_10_SUMMARY.md`
- `APPLICATION_PREP_FIRST_10_AFTER_FIX.md`
- `APPLICATION_PREP_FIRST_10_EXPORT.json`
- `APPLICATION_PREP_FIRST_10_AFTER_FIX.json`
- `apps/api/server/applicationSources/`
- `apps/web/src/App.tsx`

The application-profile system should prefer official program websites over DSIRE aggregator pages.
DSIRE is useful as lineage and source context, but aggregator pages are not application forms unless they contain explicit application instructions.

## Checks And Review Gates

Use the selector before checks when comparing refs:

```sh
node scripts/select-ci-checks.mjs --format lines BASE_REF HEAD_REF
```

Common checks:

```sh
npm run check -w @gbs/api
npm run typecheck
npm test
npm run build
```

Apply the `review.md` gates after meaningful slices:

- A1 verifies integration with latest main.
- A2 verifies correctness and targeted checks.
- A3 verifies release readiness, deployment risk, and broader review.

For docs-only changes, A2 can be limited to diff review, Markdown readability, and path/link sanity.
For runtime or user-facing changes, run the relevant local checks and perform a broader A3 review.

## Working Rules To Preserve

After meaningful edits, update `AI_CHANGELOG.md`, commit, and push.
If runtime behavior, infrastructure, AWS data, or AWS configuration changed, deploy or apply the matching AWS change.

Never commit secrets, `.env` files, credentials, tokens, private keys, local dumps, or raw secret values.
Never expose AWS credentials or backend secrets to frontend code.
Keep browser clients untrusted.

Do not manually edit `CHANGELOG.md` files or auto-generated files.
`AI_CHANGELOG.md` is the repository's human-maintained LLM change record and should be updated for meaningful agent-authored changes.

When writing long Markdown, keep each full sentence on its own physical line.
Do not introduce em dashes in newly written prose.

## Suggested Next Session Prompt

Use this as a clean continuation prompt:

```text
Read NEXT_CODEX_CONTEXT.md, AGENTS.md, AGENT_WORKFLOW.md, review.md, ARCHITECTURE.md, RESOURCE_MAP.md, TASK_LIST.md, docs/product-vision.md, docs/product-todos.md, and docs/restart-handoff-2026-07-07.md.
Then verify the active form catalog and start the form-gate reliability work.
Focus first on preventing matched opportunities from leaking raw Requires rows to the user-facing selected retrofit Opportunities tab.
```
