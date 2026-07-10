# Architecture

This file summarizes the major architecture of Green Business Solution / RetroFi.
Keep it practical so future agents can understand system boundaries before editing code.

Detailed companion docs:

- `docs/workspace-architecture.md`
- `docs/architecture-resource-map.md`
- `docs/production-deployment.md`
- `docs/data-model.md`

## System Overview

The repository is an npm workspace monorepo.
The browser app is a React + Vite frontend under `apps/web`.
The backend is a Node/Express API under `apps/api` that can run locally or as an AWS Lambda behind API Gateway.

Production runs at `https://retrofi.org`.
Normal browser traffic enters CloudFront and serves static frontend assets from S3.
Requests under `/api/*` route through CloudFront to API Gateway, then to the Lambda-wrapped Express app.
The backend owns privileged access to DynamoDB, S3, Google OAuth flows, Geocodio usage tracking, retrofit recommendations, application profiles, generated runtime cache data, sanitized Codex task snapshots, and private GPT Pro development-work artifacts.

## Major Components

| Component | Purpose | Owner Path | Runtime Surface |
| --- | --- | --- | --- |
| Frontend app | Browser UI for public, client, and admin workflows | `apps/web/src/`, `public/`, `index.html` | Vite dev server, CloudFront/S3 |
| Backend API | Auth, intake, admin APIs, matching, uploads, AWS access | `apps/api/server/` | Local Express server, Lambda |
| Matching, savings, and application logic | Deterministic retrofit matching, incentive/tax/savings calculations, application source profiles | `apps/api/server/matching/`, `apps/api/server/savings/`, `apps/api/server/applicationSources/` | Backend API and scripts |
| Data fixtures and repair artifacts | Source-backed opportunity data, sample users, generated fixtures, review outputs, repair batches | `data/`, `public/`, `test-fixtures/` | Git, Vite static assets, Lambda package inputs, AWS sync scripts |
| Scripts | Ingestion, repair, validation, matching, seeding, deployment, routing selectors | `scripts/` | Local Node/shell commands, GitHub Actions |
| Infrastructure | Production API, frontend/edge, runtime data/buckets, GitHub OIDC deploy role | `infra/` | AWS CloudFormation |
| Documentation | Product, data, access, deployment, workflow memory | `docs/`, root `*.md`, `ADRS/` | GitHub |

## Frontend Boundary

The browser code lives in `apps/web/src`.
It is public client code and must be treated as untrusted.
It may receive public configuration such as API paths, OAuth client IDs, public asset URLs, and non-sensitive feature flags.
It must never receive AWS credentials, backend secrets, database credentials, OAuth client secrets, private keys, or raw secret values.

The root commands delegate to workspace scripts:

```sh
npm run dev
npm run typecheck
npm run build
```

The frontend calls backend routes under `/api/*`.

## Backend Boundary

The backend entrypoint is `apps/api/server/index.mjs`.
Local development runs it as an Express server on `http://127.0.0.1:8787`.
Production uses `apps/api/server/lambda.mjs` to run the same Express app behind API Gateway and Lambda.

The backend owns:

- Google OAuth and account/session handling.
- DynamoDB access for users, intake records, opportunities, dashboard performance, recommendation cache metadata, application profiles, API runtime state, and read-only Codex task snapshots.
- S3 presigned upload URLs, runtime cache object access, and private GPT Pro development-work artifact access.
- Admin data access and review updates.
- Retrofit matching, savings, tax, grant, application-profile, pre-retrofit form-answer, and GPT Pro work APIs.
- Geocoding and external source-fetching safeguards.
- Input validation and error messages for privileged operations.

Keep AWS access out of the browser.

## Data Boundary

Durable runtime data lives in AWS.
Current DynamoDB tables and S3 buckets are documented in `docs/data-model.md` and `docs/architecture-resource-map.md`.
The `gbs-firstmate-tasks` DynamoDB table is a sanitized admin read model for Codex task state.
Firstmate remains authoritative, a separate least-privilege publisher writes versioned snapshots, and the RetroFi Lambda role only reads the table.
Snapshots keep completed and archived task records inactive and include only bounded sanitized report payloads for admin report viewing.
Closed inactive tasks are hidden by default unless a report is still awaiting admin review.

Committed data in `data/`, `public/`, and `test-fixtures/` includes source repair artifacts, generated review reports, public opportunity indexes, sample matching cases, and test fixtures.
Do not treat committed fixtures as production truth when DynamoDB or S3 owns the runtime state.

## Infrastructure Boundary

Production infrastructure is defined by CloudFormation templates in `infra/` and deployed by `scripts/deploy-production.sh`.
The current stack split is:

- `infra/github-actions-deploy-role.yaml` for GitHub OIDC deploy access.
- `infra/runtime-data.yaml` for runtime DynamoDB tables.
- `infra/runtime-buckets.yaml` for runtime cache, generated fixture, and development-work buckets.
- `infra/api-hosting.yaml` for Lambda, API Gateway, IAM role, and logs.
- `infra/production-hosting.yaml` for frontend S3, CloudFront, ACM, and Route 53 aliases.

Production deploy commands are exposed as:

```sh
npm run deploy:production:auto
npm run deploy:production:frontend
npm run deploy:production:api
npm run deploy:production:infra
npm run deploy:production:data
npm run deploy:production:ci
```

GitHub Actions runs the path-routed deploy on pushes to `main`.
For local deploys, confirm the intended AWS profile and account before running production commands.

## Deployment Shape

The deploy script can run full or path-selected deploy targets.
The selectors are:

- `scripts/select-ci-checks.mjs`
- `scripts/select-production-deploy-targets.mjs`

After runtime or infrastructure changes, run targeted local checks before pushing, then rely on GitHub Actions or perform the scoped local deploy and smoke-check production.
Documentation-only changes normally do not require deployment.

## Open Questions

- [ ] Finish auditing docs and scripts that still assume legacy `gbs` profile or account `448016109714` for production.
- [ ] Decide whether `docs/architecture-resource-map.md` should be merged into this root `RESOURCE_MAP.md` or remain the detailed companion document.
