# Architecture and Resource Map

This map is the current source-of-truth view of how GitHub paths, deploy targets, CloudFormation stacks,
and AWS resources relate to each other.

## Request Flow

Browser traffic enters CloudFront on `retrofi.org`.

- Normal static routes go to the frontend S3 bucket created by `gbs-retrofi-production`.
- `/api/*` routes go from CloudFront to the API Gateway domain output by `gbs-retrofi-api`.
- API Gateway invokes the Lambda function from `gbs-retrofi-api`.
- Lambda reads/writes DynamoDB tables in `us-east-2` and S3 buckets in `us-east-1`.

## GitHub Source Ownership

| Path | Owner | Deploy target |
| --- | --- | --- |
| `apps/web/src/`, `index.html`, `public/`, `vite.config.ts`, `tsconfig.json` | React/Vite frontend | `frontend` |
| `apps/api/server/`, `apps/api/package.json`, `apps/api/package-lock.json` | Express API/Lambda runtime | `api` |
| `data/bill_field_dictionary.json`, savings/tax/incentive runtime JSON, `public/sample_matching_test_cases.json` | API runtime data bundled into Lambda | `api` |
| `infra/api-hosting.yaml`, `infra/production-hosting.yaml` | API and edge/frontend CloudFormation | `infra` |
| `infra/runtime-data.yaml`, `infra/runtime-buckets.yaml` | Runtime DynamoDB/S3 support resources | `data` |
| `infra/github-actions-deploy-role.yaml` | GitHub OIDC deploy role | `ci` |
| `scripts/deploy-production.sh`, `scripts/select-production-deploy-targets.mjs`, package locks | Deploy machinery | all production targets |

`scripts/select-production-deploy-targets.mjs` encodes this routing. GitHub Actions uses it on pushes to
`main`; local agents can use `npm run deploy:production:auto` with `GBS_DEPLOY_BASE_SHA` and
`GBS_DEPLOY_HEAD_SHA`.

## CloudFormation Stacks

| Stack | Region | Template | Owns |
| --- | --- | --- | --- |
| `gbs-github-actions-deploy` | `us-east-1` | `infra/github-actions-deploy-role.yaml` | GitHub OIDC provider and `gbs-github-actions-deploy` IAM role |
| `gbs-retrofi-runtime-data` | `us-east-2` | `infra/runtime-data.yaml` | Domain-specific runtime DynamoDB tables |
| `gbs-retrofi-runtime-buckets` | `us-east-1` | `infra/runtime-buckets.yaml` | Runtime cache, generated fixture, and private development-work buckets |
| `gbs-retrofi-api` | `us-east-1` | `infra/api-hosting.yaml` | API Lambda, HTTP API Gateway, Lambda execution role, log group |
| `gbs-retrofi-production` | `us-east-1` | `infra/production-hosting.yaml` | Frontend S3 bucket, CloudFront, ACM cert, Route 53 aliases |

## DynamoDB Tables

| Table | Region | Purpose |
| --- | --- | --- |
| `gbs-users` | `us-east-2` | Account/auth/user records |
| `gbs-client-intake` | `us-east-2` | Intake form state, business/site profile, uploaded utility metadata, extracted bill fields, per-retrofit pre-retrofit form answers |
| `gbs-opportunity-candidates` | `us-east-2` | DSIRE opportunity candidate records and admin review state |
| `gbs-dashboard-performance` | `us-east-2` | Synthetic/test-case dashboard performance datasets |
| `gbs-retrofit-recommendation-cache` | `us-east-2` | Recommendation cache metadata; large payloads live in S3 |
| `gbs-application-profiles` | `us-east-2` | Application source/profile registry records |
| `gbs-api-runtime-state` | `us-east-2` | Small API operational state such as Geocodio quota counters |

The deleted `gbs-runtime-state` table was split into the four domain runtime tables above. The deleted
`gbs-energy-data` DynamoDB table is not part of the active model.

## S3 Buckets

| Bucket | Region | Purpose |
| --- | --- | --- |
| `gbs-retrofi-org-frontend-059310317821` | `us-east-1` | Built frontend assets served through CloudFront |
| `gbs-retrofi-org-artifacts-059310317821-us-east-1` | `us-east-1` | Lambda zip artifacts under `lambda/`; GitHub is still the code source of truth |
| `gbs-retrofi-org-energy-data-059310317821` | `us-east-1` | Customer utility/energy uploads under `energy-data/` |
| `gbs-retrofi-org-runtime-cache-059310317821` | `us-east-1` | Generated runtime cache payloads under `runtime-cache/` |
| `gbs-retrofi-test-fixtures-059310317821-us-east-1` | `us-east-1` | Generated fixtures and synthetic test data under `generated-test-fixtures/` |
| `gbs-retrofi-dev-work-059310317821-us-east-1` | `us-east-1` | Raw GPT Pro prompt/output archives under `gpt-pro-work/` |

## Deployment Commands

| Command | Scope |
| --- | --- |
| `npm run deploy:production` | Full production deploy |
| `npm run deploy:production:auto` | Path-routed deploy from changed files |
| `npm run deploy:production:ci` | GitHub Actions OIDC/deploy role only |
| `npm run deploy:production:data` | Runtime DynamoDB/S3 prerequisites only |
| `npm run deploy:production:api` | API Lambda package and API stack only |
| `npm run deploy:production:infra` | API and edge/frontend stacks using existing Lambda artifact |
| `npm run deploy:production:frontend` | Vite build, frontend S3 sync, CloudFront invalidation only |

GitHub Actions runs checks for pull requests and pushes. Pushes to `main` deploy only when the path
selector returns a production target.
