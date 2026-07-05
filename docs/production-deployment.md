# Production Deployment

The production domain is `retrofi.org`, registered in AWS Route 53 under the Green Business Solution account.

## Current AWS Hosting Model

Production hosting is defined in `infra/production-hosting.yaml` and deployed by `scripts/deploy-production.sh`.
Runtime tables and support buckets are defined separately in `infra/runtime-data.yaml` and
`infra/runtime-buckets.yaml`.

The hosting stack creates:

- S3 bucket for the built Vite frontend.
- CloudFront distribution for `https://retrofi.org` and `https://www.retrofi.org`.
- ACM certificate validated through the Route 53 hosted zone.
- HTTP API Gateway route for `/api/*`.
- Lambda function running the existing Express API through `server/lambda.mjs`.
- Route 53 `A` and `AAAA` alias records for the root and `www` domains.

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

1. Builds the Vite frontend.
2. Packages the Express API as a Lambda zip using the `apps/api` workspace runtime dependencies.
3. Uploads the Lambda package to an artifact S3 bucket.
4. Deploys/updates the runtime DynamoDB and runtime bucket stacks, alert sender, and energy-data S3 bucket configuration.
5. Deploys or updates the CloudFormation stack.
6. Syncs `dist/` to the frontend S3 bucket.
7. Invalidates CloudFront.

The same script also supports narrower production targets:

```sh
npm run deploy:production:frontend
npm run deploy:production:api
npm run deploy:production:infra
npm run deploy:production:data
```

- `frontend`: builds Vite, syncs the frontend bucket, and invalidates CloudFront.
- `api`: packages and uploads a new Lambda zip, then deploys the stack with that Lambda artifact.
- `infra`: deploys the CloudFormation template while reusing the existing Lambda zip.
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
