# Resource Map

This file maps source paths to runtime surfaces, AWS resources, deploy targets, and checks.
The detailed existing map lives in `docs/architecture-resource-map.md`.
Keep both files current whenever resources, deployment targets, or ownership boundaries change.

## Source Of Truth

GitHub is the source of truth for code and project history.
AWS is the source of truth for deployed runtime state and durable data.

## Source Path Ownership

| Path | Owner | Checks | Deploy Target | Notes |
| --- | --- | --- | --- | --- |
| `apps/web/src/`, `index.html`, `public/`, `vite.config.ts`, `tsconfig.json` | Frontend | `npm run typecheck`, `npm run build`, `npx vitest run apps/web` | `frontend` | Browser code and static assets |
| `apps/api/server/`, `apps/api/package.json`, `apps/api/package-lock.json` | Backend API | `npm run check -w @gbs/api`, `npx vitest run apps/api` | `api` | Express app, Lambda runtime, AWS access, matching/savings/application logic |
| API runtime data in `data/` and `public/sample_matching_test_cases.json` | API runtime data | targeted validation scripts, `npx vitest run scripts`, affected API tests | `api` | Data bundled into Lambda or read by API logic |
| `scripts/` | Tooling | `npx vitest run scripts`, targeted dry runs | selected by script | Ingestion, repair, validation, matching, deploy, and routing tools |
| `infra/github-actions-deploy-role.yaml` | CI identity | CloudFormation review, deploy selector tests | `ci` | GitHub OIDC provider and deploy role |
| `infra/runtime-data.yaml`, `infra/runtime-buckets.yaml` | Runtime data resources | CloudFormation review, deploy selector tests | `data` | DynamoDB tables and support buckets |
| `infra/api-hosting.yaml`, `infra/production-hosting.yaml` | Production API and edge/frontend infra | CloudFormation review, deploy selector tests | `infra` | Lambda/API Gateway and CloudFront/S3/DNS |
| `.github/workflows/ci-deploy.yml`, `scripts/select-ci-checks.mjs`, `scripts/select-production-deploy-targets.mjs`, package locks | CI/deploy routing | selector tests, relevant app/script checks, audits | full or selected | Routing changes can affect all validation/deploy paths |
| `docs/`, `ADRS/`, root `*.md`, `AI_RESOURCES/` | Documentation and workflow memory | diff review, link/readability check | none | No deploy unless docs are published runtime artifacts |

## Check Selection

Use the selector when comparing two refs:

```sh
node scripts/select-ci-checks.mjs --format lines BASE_REF HEAD_REF
```

Common checks:

```sh
npm run check -w @gbs/api
npm run typecheck
npm run build
npx vitest run apps/api
npx vitest run apps/web
npx vitest run scripts
npm audit --omit=dev --audit-level=high
npm audit --workspace @gbs/api --omit=dev --audit-level=high
```

## Deploy Targets

| Target | Purpose | Typical Inputs | Smoke Check |
| --- | --- | --- | --- |
| `ci` | GitHub Actions OIDC/deploy role | `infra/github-actions-deploy-role.yaml` | Verify role stack and Actions assume-role path |
| `data` | Runtime DynamoDB/S3 prerequisites | `infra/runtime-data.yaml`, `infra/runtime-buckets.yaml`, runtime data migrations | Verify affected table or bucket |
| `api` | Backend Lambda/API stack | `apps/api/server/`, API runtime data, `apps/api/package.json` | Call `https://retrofi.org/api/health` or a relevant API route |
| `infra` | API and edge/frontend CloudFormation templates | `infra/api-hosting.yaml`, `infra/production-hosting.yaml` | Verify stack status and affected routing/domain behavior |
| `frontend` | Browser build and public assets | `apps/web/src/`, `public/`, frontend config | Load `https://retrofi.org` and a key route |
| full | Bootstrap, recovery, unknown, or shared deploy changes | Cross-cutting changes | Run frontend and API smoke checks |

Use the deploy selector when comparing two refs:

```sh
node scripts/select-production-deploy-targets.mjs --format lines BASE_REF HEAD_REF
```

Local deploy commands:

```sh
npm run deploy:production:auto
npm run deploy:production:frontend
npm run deploy:production:api
npm run deploy:production:infra
npm run deploy:production:data
npm run deploy:production:ci
```

Confirm the intended AWS profile and account before local production deploys.
GitHub Actions deploys from `main` using OIDC into production account `059310317821`.

## AWS Resource Inventory

| Environment | Account Alias | Account ID | Region | Resource | Owner | Managed By | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| prod | RetroFi Production | `059310317821` | `us-east-1` | `gbs-github-actions-deploy` stack | ci | `infra/github-actions-deploy-role.yaml` | GitHub OIDC provider and deploy role |
| prod | RetroFi Production | `059310317821` | `us-east-2` | `gbs-retrofi-runtime-data` stack | data | `infra/runtime-data.yaml` | Runtime DynamoDB tables |
| prod | RetroFi Production | `059310317821` | `us-east-1` | `gbs-retrofi-runtime-buckets` stack | data | `infra/runtime-buckets.yaml` | Runtime cache, generated fixture, and dev-work buckets |
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
Allowed content includes account aliases, profile names, regions, ARNs, resource names, console links, and safe CLI commands.
Forbidden content includes access keys, session tokens, OAuth client secrets, passwords, private keys, database credentials, and plaintext secret values.

## Browser Credential Boundary

The browser should never receive AWS credentials.
Browser code may receive public configuration such as API base URLs, OAuth client IDs, feature flags that are not sensitive, and public asset URLs.
Backend services should own AWS access through IAM roles or equivalent service identity.
Use presigned URLs when the browser needs direct file upload or download access.
