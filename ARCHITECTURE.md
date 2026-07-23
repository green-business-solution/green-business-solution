# Architecture

RetroFi / Green Business Solution is a React + Vite frontend with an Express API packaged for AWS Lambda.
The product helps businesses evaluate retrofit opportunities, incentives, application requirements, and savings.

This file is the architecture entry point for agents.
Keep it practical so future agents can understand system boundaries before editing code.

Detailed companion docs:

- [docs/workspace-architecture.md](./docs/workspace-architecture.md)
- [docs/architecture-resource-map.md](./docs/architecture-resource-map.md)
- [docs/production-deployment.md](./docs/production-deployment.md)
- [docs/data-model.md](./docs/data-model.md)

## System Overview

The repository is an npm workspace monorepo.
The browser app is a React + Vite frontend under `apps/web`.
The backend is a Node/Express API under `apps/api` that can run locally or as an AWS Lambda behind API Gateway.

Production runs at `https://retrofi.org`.
Normal browser traffic enters CloudFront and serves static frontend assets from S3.
Requests under `/api/*` route through CloudFront to API Gateway, then to the Lambda-wrapped Express app.
The backend and privileged operational scripts own access to DynamoDB, S3, Google OAuth flows, Geocodio usage tracking, retrofit recommendations, application profiles, generated runtime cache data, sanitized Codex task snapshots, contractor import data, and private GPT Pro development-work artifacts.

## Runtime Surfaces

| Surface | Owner Path | Runtime | Notes |
| --- | --- | --- | --- |
| Frontend app | `apps/web/`, `index.html`, `public/` | Browser assets served by CloudFront and S3 | React/Vite UI for public pages, sign-in, intake, admin previews, and retrofit workflows |
| Backend API | `apps/api/server/` | Local Express server or AWS Lambda behind HTTP API Gateway | Owns privileged AWS access, auth callbacks, diagnostics, recommendations, forms, uploads, and admin data paths |
| Matching, savings, and application logic | `apps/api/server/matching/`, `apps/api/server/savings/`, `apps/api/server/applicationSources/` | Backend API and scripts | Deterministic retrofit matching, incentive/tax/savings calculations, and application source profiles |
| Runtime data | `data/`, DynamoDB, S3 | Bundled JSON plus AWS managed stores | Git tracks normalized runtime artifacts when code/tests need them; AWS owns uploaded customer files, caches, generated fixtures, and operational state |
| Scripts | `scripts/` | Local Node/shell commands and GitHub Actions | Ingestion, repair, validation, matching, seeding, deployment, routing selectors, fixture sync, and maintenance automation |
| Infrastructure | `infra/` | AWS CloudFormation | Production API, frontend/edge, runtime data/buckets, and GitHub OIDC deploy role |
| Documentation | `docs/`, root `*.md`, `ADRS/` | GitHub | Product, data, access, deployment, workflow memory, and durable decisions |

## Frontend Boundary

The frontend is public browser code and must be treated as untrusted.
It may receive public configuration such as API base URLs, OAuth client IDs, non-sensitive feature flags, and public asset URLs.
It must never receive AWS credentials, OAuth client secrets, database credentials, signing secrets, private keys, or raw secret values.

The root commands delegate to workspace scripts:

```sh
npm run dev
npm run typecheck
npm run build
```

The frontend calls backend routes under `/api/*`.

## API Boundary

The backend entrypoint is `apps/api/server/index.mjs`.
Local development runs it as an Express server on `http://127.0.0.1:8787`.
Production uses `apps/api/server/lambda.mjs` to run the same Express app behind API Gateway and Lambda.

The API owns privileged operations and backend-only credentials through Lambda IAM roles and deploy-time secret injection.
Browser clients should call API routes instead of touching AWS directly.
When direct browser file transfer is needed, the API should provide scoped presigned URLs.

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
Current DynamoDB tables and S3 buckets are documented in [docs/data-model.md](./docs/data-model.md) and [docs/architecture-resource-map.md](./docs/architecture-resource-map.md).
The `gbs-firstmate-tasks` DynamoDB table is a sanitized admin read model for Codex task state.
Firstmate remains authoritative, a separate least-privilege publisher writes versioned snapshots, and the RetroFi Lambda role only reads the table.
Snapshots keep completed and archived task records inactive and include only bounded sanitized report payloads for admin report viewing.
Closed inactive tasks are hidden by default unless a report is still awaiting admin review.
The `gbs-contractors` DynamoDB table stores the standardized one-time CSLB contractor import.
The private contractor-source bucket stores the unchanged source attachment and the import manifest and aggregate report.

Committed `data/` files are source-controlled runtime inputs, normalized research artifacts, reports, or fixtures that code and tests need.
Committed data in `data/`, `public/`, and `test-fixtures/` includes source repair artifacts, generated review reports, public opportunity indexes, sample matching cases, and test fixtures.
Do not treat committed fixtures as production truth when DynamoDB or S3 owns the runtime state.

Large raw GPT Pro prompt/output folders and generated fixture archives live in private S3 buckets documented in [docs/development-artifacts.md](./docs/development-artifacts.md).
Do not move ignored raw work folders or generated deployment artifacts into Git without a deliberate decision.

Treat data migration and fixture sync scripts as production-affecting tools when they write to AWS.

## Infrastructure Boundary

Production resources are managed through CloudFormation templates in `infra/` and deployment logic in `scripts/deploy-production.sh`.
GitHub Actions deploys from `main` through OIDC using the deploy role documented in [docs/production-deployment.md](./docs/production-deployment.md).
Local deploys should use the documented AWS profile and selector flow rather than ad hoc AWS changes.

The current stack split is:

- `infra/github-actions-deploy-role.yaml` for GitHub OIDC deploy access.
- `infra/runtime-data.yaml` for runtime DynamoDB tables.
- `infra/runtime-buckets.yaml` for runtime cache, generated fixture, contractor-source, and development-work buckets.
- `infra/api-hosting.yaml` for Lambda, API Gateway, IAM role, and logs.
- `infra/production-hosting.yaml` for frontend S3, CloudFront, ACM, and Route 53 aliases.

Use [RESOURCE_MAP.md](./RESOURCE_MAP.md) before touching deploy selectors, CloudFormation, AWS data resources, or path ownership.

## Deployment Shape

Pull requests run path-routed checks through `.github/workflows/ci-deploy.yml`.
Pushes to `main` run checks and then deploy only the selected production targets.
Production deploy targets are `ci`, `data`, `api`, `infra`, and `frontend`.

Production deploy commands are exposed as:

```sh
npm run deploy:production:auto
npm run deploy:production:frontend
npm run deploy:production:api
npm run deploy:production:infra
npm run deploy:production:data
npm run deploy:production:ci
```

The production domain is `retrofi.org`.
The frontend is served by CloudFront and S3.
`/api/*` routes go through CloudFront to API Gateway and Lambda.
The API reads and writes DynamoDB in `us-east-2` and S3 buckets in `us-east-1`.

Documentation-only changes normally do not require deployment.
After runtime or infrastructure changes, run targeted local checks before pushing, then rely on GitHub Actions or perform the scoped local deploy and smoke-check production.

## Open Questions

- Finish auditing docs and scripts that still assume the legacy `gbs` profile or account `448016109714` for production.
- Keep the root architecture summary and `docs/architecture-resource-map.md` synchronized as deployment ownership evolves.
- Expand ADR coverage as major architecture decisions are made or changed.
