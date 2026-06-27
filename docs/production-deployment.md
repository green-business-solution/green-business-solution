# Production Deployment

The production domain is `retrofi.org`, registered in AWS Route 53 under the Green Business Solution account.

## Current AWS Hosting Model

Production hosting is defined in `infra/production-hosting.yaml` and deployed by `scripts/deploy-production.sh`.

The stack creates:

- S3 bucket for the built Vite frontend.
- Private S3 bucket for uploaded utility bills and Green Button files.
- CloudFront distribution for `https://retrofi.org` and `https://www.retrofi.org`.
- ACM certificate validated through the Route 53 hosted zone.
- HTTP API Gateway route for `/api/*`.
- Lambda function running the existing Express API through `server/lambda.mjs`.
- Route 53 `A` and `AAAA` alias records for the root and `www` domains.

The API Lambda runs in `us-east-1` with IAM permissions to read/write the existing DynamoDB tables in `us-east-2`.

The production API uses separate AWS regions for:

- DynamoDB data access via `GBS_AWS_REGION` (`us-east-2`)
- The energy-data S3 bucket via `GBS_ENERGY_DATA_BUCKET_REGION` (`us-east-1`)

## Deploy Command

```sh
AWS_PROFILE=gbs ./scripts/deploy-production.sh
```

The script:

1. Builds the Vite frontend.
2. Packages the Express API as a Lambda zip.
3. Uploads the Lambda package to an artifact S3 bucket.
4. Ensures the `gbs-energy-data` DynamoDB table exists in the data region.
5. Deploys or updates the CloudFormation stack.
6. Syncs `dist/` to the frontend S3 bucket.
7. Invalidates CloudFront.

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
