# Production Deployment

The production domain is `retrofi.org`, registered in AWS Route 53 under the Green Business Solution account.

## Current AWS Hosting Model

Production hosting is split across smaller CloudFormation stacks and deployed by
`scripts/deploy-production.sh`.

The API stack, `gbs-retrofi-api` from `infra/api-hosting.yaml`, creates:

- Lambda function running the Express API through `apps/api/server/lambda.mjs`.
- HTTP API Gateway route for `/api/*`.
- Lambda execution IAM role and CloudWatch log group.

The edge/frontend stack, `gbs-retrofi-production` from `infra/production-hosting.yaml`, creates:

- S3 bucket for the built Vite frontend.
- CloudFront distribution for `https://retrofi.org` and `https://www.retrofi.org`.
- ACM certificate validated through the Route 53 hosted zone.
- Route 53 `A` and `AAAA` alias records for the root and `www` domains.
- CloudFront `/api/*` origin pointing at the API stack output.

Runtime tables and support buckets are defined separately in `infra/runtime-data.yaml` and
`infra/runtime-buckets.yaml`.

The runtime stacks create:

- `gbs-dashboard-performance` for synthetic/test-case dashboard performance records.
- `gbs-retrofit-recommendation-cache` for recommendation cache metadata.
- `gbs-application-profiles` for application source/profile registry records.
- `gbs-api-runtime-state` for operational state such as Geocodio quota usage.
- `gbs-retrofi-org-runtime-cache-...` for generated recommendation cache payloads.
- `gbs-retrofi-test-fixtures-...` for generated fixtures and synthetic test data.

The uploaded utility/energy file bucket remains `gbs-retrofi-org-energy-data-...`; it is now only for
customer utility/energy uploads, not generated runtime cache payloads.

The API Lambda runs in `us-east-1` with IAM permissions to read/write the existing DynamoDB tables in `us-east-2`.

The production API uses separate AWS regions for:

- DynamoDB data access via `GBS_AWS_REGION` (`us-east-2`)
- The energy-data and runtime-cache S3 buckets via `GBS_ENERGY_DATA_BUCKET_REGION` (`us-east-1`)

## Deploy Command

```sh
AWS_PROFILE=gbs ./scripts/deploy-production.sh
```

The script:

1. Deploys the GitHub Actions OIDC/deploy-role bootstrap stack.
2. Deploys/updates the runtime DynamoDB and runtime bucket stacks, alert sender, and energy-data S3 bucket configuration.
3. Builds the Vite frontend.
4. Packages the Express API as a Lambda zip using the `apps/api` workspace runtime dependencies.
5. Uploads the Lambda package to the artifact S3 bucket.
6. Deploys or updates the API stack.
7. Deploys or updates the edge/frontend stack with the API origin output.
8. Syncs `dist/` to the frontend S3 bucket.
9. Invalidates CloudFront.

The same script also supports narrower production targets:

```sh
npm run deploy:production:auto
npm run deploy:production:ci
npm run deploy:production:frontend
npm run deploy:production:api
npm run deploy:production:infra
npm run deploy:production:data
```

- `auto`: selects the minimum target set from changed paths. This is what GitHub Actions uses on `main`.
- `ci`: deploys only the GitHub Actions OIDC/deploy-role bootstrap stack.
- `frontend`: builds Vite, syncs the frontend bucket, and invalidates CloudFront.
- `api`: packages and uploads a new Lambda zip, then deploys the API stack with that Lambda artifact.
- `infra`: deploys the API and edge/frontend CloudFormation templates while reusing the existing Lambda zip.
- `data`: ensures runtime prerequisites only.

The artifact bucket has a lifecycle rule for `lambda/` package zips. The default retention is 30 days and
can be overridden with `GBS_ARTIFACT_RETENTION_DAYS`.

## Google OAuth

The Google OAuth web client must include this Authorized redirect URI:

```text
https://retrofi.org/api/auth/google/callback
```

The API Lambda uses the Google authorization-code redirect flow. The client secret is required on the backend and is passed to CloudFormation through the `GOOGLE_CLIENT_SECRET` deploy environment variable, not committed to Git.

Optional local development redirect URIs:

```text
http://localhost:5173/api/auth/google/callback
http://127.0.0.1:5173/api/auth/google/callback
```

## Domain

Route 53 hosted zone:

```text
Z04402863EVV8FUF4EWUX
```

Registered domain settings:

- Domain: `retrofi.org`
- Auto-renew: enabled
- Privacy protection: enabled
- Registrar: Amazon Registrar

## GitHub Actions

`.github/workflows/ci-deploy.yml` runs checks for pull requests and pushes.
Pushes to `main` also assume the `gbs-github-actions-deploy` IAM role in the RetroFi production account `059310317821` through GitHub OIDC, select deploy targets from the pushed path diff, and run `npm run deploy:production:auto`.

The OIDC role stack is defined in `infra/github-actions-deploy-role.yaml`.
The role must exist before a new workflow can deploy, so bootstrap it with:

```sh
AWS_PROFILE=retrofi-prod ./scripts/deploy-production.sh ci
```
