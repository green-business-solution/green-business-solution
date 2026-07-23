# Resource Map

This file maps source paths to checks, deploy targets, and operational resources.
It is the root routing entry point for agents.
Use [docs/architecture-resource-map.md](./docs/architecture-resource-map.md) for the detailed CloudFormation stack, DynamoDB table, and S3 bucket inventory.

## Source Of Truth

GitHub is the source of truth for code, docs, workflow files, infrastructure templates, and project history.
AWS is the source of truth for runtime data, customer uploads, runtime cache payloads, generated fixture archives, durable data, deployed runtime state, and cloud resource state.

## Path Ownership

| Path | Owner | Typical Checks | Deploy Target | Notes |
| --- | --- | --- | --- | --- |
| `apps/web/`, `index.html`, `public/`, `vite.config.ts`, `tsconfig*.json` | Frontend | `npm run typecheck`, `npm run build`, `npx vitest run apps/web` | `frontend` | Browser code and public assets |
| `apps/api/` | API | `npm run check -w @gbs/api`, `npx vitest run apps/api` | `api` | Lambda runtime and privileged backend logic |
| `apps/api/server/matching/`, `apps/api/server/savings/`, `apps/api/server/applicationSources/` | API logic | API tests, targeted fixture checks, affected script tests | `api` | Matching, savings, tax, grant, and application-profile behavior |
| `data/` runtime JSON used by API, including `data/opportunity_availability_dispositions.v1.json` and `data/opportunity_award_audit_overlay.v1.json`, `public/sample_matching_test_cases.json`, `test-fixtures/` | Runtime data | targeted validation scripts, `npx vitest run apps/api scripts` | `api` or `data` | Bundled data and generated artifacts used by runtime code |
| `infra/github-actions-deploy-role.yaml` | CI identity | script checks and CloudFormation review | `ci` | GitHub OIDC provider and deploy role |
| `infra/runtime-data.yaml`, `infra/runtime-buckets.yaml` | Data infrastructure | script checks and CloudFormation review | `data` | DynamoDB tables and runtime, source, and test fixture buckets |
| `infra/api-hosting.yaml` | API infrastructure | API checks and CloudFormation review | `api` or `infra` | Lambda, HTTP API Gateway, execution role, logs |
| `infra/production-hosting.yaml` | Edge/frontend infrastructure | frontend checks and CloudFormation review | `infra` or `frontend` | CloudFront, S3 frontend hosting, DNS, ACM |
| `scripts/` | Tooling | `npx vitest run scripts`, targeted dry runs | selected by script purpose | Deploy, routing, migration, repair, fixture, and maintenance scripts |
| `.github/workflows/`, selector scripts, package manifests, package locks | CI/CD routing | all relevant checks, selector tests, audits | none directly on PR | Pushes to `main` run production deploy selection |
| `docs/`, `AGENTS.md`, `CLAUDE.md`, `AGENT_WORKFLOW.md`, `ARCHITECTURE.md`, `RESOURCE_MAP.md`, `review.md`, `TASK_LIST.md`, `ADRS/` | Documentation and workflow | diff review, link/readability check, selector tests when routing changes | none | No AWS deploy for docs-only or workflow-only changes |

## Selector Commands

Use the CI selector to choose focused checks from a diff:

```sh
node scripts/select-ci-checks.mjs --format lines origin/main HEAD
```

Use the deploy selector before any production deploy:

```sh
node scripts/select-production-deploy-targets.mjs --format lines origin/main HEAD
```

Both selectors also accept changed files on stdin when refs are not available.
If a change cannot be confidently classified, use broader checks and the broader deploy path.

Common checks:

```sh
npm run check -w @gbs/api
npm run typecheck
npm run build
npx vitest run apps/api
npx vitest run apps/web
npx vitest run scripts
npm test
npm audit --omit=dev --audit-level=high
npm audit --workspace @gbs/api --omit=dev --audit-level=high
```

## Deploy Targets

| Target | Purpose | Command | Smoke Check |
| --- | --- | --- | --- |
| `ci` | GitHub Actions OIDC and deploy role bootstrap | `npm run deploy:production:ci` | Confirm workflow can assume the deploy role |
| `data` | Runtime DynamoDB and S3 prerequisites | `npm run deploy:production:data` | Confirm affected table or bucket exists and has expected configuration |
| `api` | Lambda package and API stack | `npm run deploy:production:api` | Call `/api/health` or the affected API route |
| `infra` | API and edge/frontend CloudFormation using existing Lambda artifact | `npm run deploy:production:infra` | Verify the affected CloudFront, API Gateway, DNS, or certificate path |
| `frontend` | Vite build, S3 sync, and CloudFront invalidation | `npm run deploy:production:frontend` | Load `https://retrofi.org/` and relevant frontend route |
| `auto` | Path-routed production deploy | `npm run deploy:production:auto` | Run target-specific smoke checks |
| `full` | Bootstrap, recovery, or unknown shared changes | `npm run deploy:production` | Run homepage and API health checks |

Do not deploy for docs-only, workflow-only, or instruction-only changes.
Do deploy when runtime app behavior, infrastructure, AWS data, or AWS configuration changed and the task does not explicitly prohibit deployment.

## AWS Access

Production resources now live in the dedicated RetroFi AWS Organization.
Use [docs/aws-setup.md](./docs/aws-setup.md), [docs/access.md](./docs/access.md), and [docs/production-deployment.md](./docs/production-deployment.md) for current account and profile details.

Common local profiles:

- `retrofi-prod` for the production workload account.
- `retrofi-management` for the management account.
- `gbs` for legacy local development and rollback-history access where docs still call for it.

## AWS Resource Inventory

| Environment | Account Alias | Account ID | Region | Resource | Owner | Managed By | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| prod | RetroFi Production | `059310317821` | `us-east-1` | `gbs-github-actions-deploy` stack | ci | `infra/github-actions-deploy-role.yaml` | GitHub OIDC provider and deploy role |
| prod | RetroFi Production | `059310317821` | `us-east-2` | `gbs-retrofi-runtime-data` stack | data | `infra/runtime-data.yaml` | Runtime DynamoDB tables |
| prod | RetroFi Production | `059310317821` | `us-east-1` | `gbs-retrofi-runtime-buckets` stack | data | `infra/runtime-buckets.yaml` | Runtime cache, generated fixture, and development-work buckets |
| prod | RetroFi Production | `059310317821` | `us-east-1` | `gbs-retrofi-api` stack | api | `infra/api-hosting.yaml` | Lambda, API Gateway, IAM role, logs |
| prod | RetroFi Production | `059310317821` | `us-east-1` | `gbs-retrofi-production` stack | frontend/infra | `infra/production-hosting.yaml` | Frontend bucket, CloudFront, ACM, DNS aliases |
| prod | RetroFi Production | `059310317821` | `us-east-1` | `gbs-retrofi-dev-work-059310317821-us-east-1` | data/api | `infra/runtime-buckets.yaml`, `infra/api-hosting.yaml` | Private GPT Pro work artifacts under `gpt-pro-work/` |
| prod | RetroFi Production | `059310317821` | `us-east-2` | `gbs-users` | api/data | `infra/runtime-data.yaml` | User records |
| prod | RetroFi Production | `059310317821` | `us-east-2` | `gbs-client-intake` | api/data | `infra/runtime-data.yaml` | Intake records |
| prod | RetroFi Production | `059310317821` | `us-east-2` | `gbs-opportunity-candidates` | api/data | `infra/runtime-data.yaml` | DSIRE opportunity records |
| prod | RetroFi Production | `059310317821` | `us-east-2` | `gbs-dashboard-performance` | api/data | `infra/runtime-data.yaml` | Synthetic/test-case dashboard datasets |
| prod | RetroFi Production | `059310317821` | `us-east-2` | `gbs-retrofit-recommendation-cache` | api/data | `infra/runtime-data.yaml` | Recommendation cache metadata |
| prod | RetroFi Production | `059310317821` | `us-east-2` | `gbs-application-profiles` | api/data | `infra/runtime-data.yaml` | Application source/profile registry |
| prod | RetroFi Production | `059310317821` | `us-east-2` | `gbs-api-runtime-state` | api/data | `infra/runtime-data.yaml` | Operational state such as Geocodio quota counters |
| prod | RetroFi Production | `059310317821` | `us-east-2` | `gbs-firstmate-tasks` | api/data | `infra/runtime-data.yaml`, `infra/api-hosting.yaml`, `scripts/sync-firstmate-tasks-to-dynamodb.mjs` | Sanitized versioned Codex task and bounded report snapshots. Lambda reads only. The optional ingestion role writes only this table from an explicit publisher principal. |
| prod | RetroFi Production | `059310317821` | `us-east-2` | `gbs-contractors` | data | `infra/runtime-data.yaml`, `scripts/import-cslb-contractors.mjs`, `scripts/enrich-contractor-directories.mjs`, `scripts/resolve-unmatched-directory-contractors.mjs`, `scripts/repair-contractor-evidence-deduplication.mjs`, `scripts/verify-contractor-directory-production-write.mjs` | One-time standardized CSLB contractor records plus guarded missing-field, official-directory, and exact-license resolution enrichment keyed by `contractorId`. |
| prod | RetroFi Production | `059310317821` | `us-east-1` | `gbs-retrofi-contractor-source-data-059310317821-us-east-1` | data | `infra/runtime-buckets.yaml`, `scripts/import-cslb-contractors.mjs`, `scripts/enrich-contractor-directories.mjs`, `scripts/resolve-unmatched-directory-contractors.mjs`, `scripts/repair-contractor-evidence-deduplication.mjs`, `scripts/verify-contractor-directory-production-write.mjs` | Unchanged CSLB source, reviewed official-directory and live-license snapshots, import manifests, write reports, and aggregate verification reports. |
| legacy | green-business-solution | `448016109714` | mixed | legacy hosted zone and copied resources | rollback/data-copy | docs/runbooks | Keep only where documented for rollback or migration history |

## Routing Rules

- Frontend-only changes should run frontend checks and select `frontend`.
- Backend-only changes should run API checks and select `api`.
- Runtime data resource changes should select `data`.
- Infrastructure changes should select the owning infrastructure target.
- Selector scripts, package manifests, package locks, and deploy script changes should trigger broader checks.
- Unknown or cross-cutting changes should fall back to broader checks and deploy routing.
- Docs-only changes should not deploy unless the docs are published runtime artifacts.

## Secret Safety

Do not put secrets in this file.
Allowed content includes account aliases, profile names, regions, ARNs, resource names, stack names, bucket names, table names, console links, and safe CLI commands.
Forbidden content includes access keys, session tokens, OAuth client secrets, passwords, private keys, database credentials, and plaintext secret values.

## Browser Credential Boundary

The browser should never receive AWS credentials.
Frontend code may receive public configuration such as API base URLs, OAuth client IDs, non-sensitive feature flags, and public asset URLs.
Backend services should own AWS access through IAM roles or equivalent service identity.
Use presigned URLs when the browser needs direct file upload or download access.
