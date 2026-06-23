# Production Deployment

The production domain is `retrofi.org`, registered in AWS Route 53 under the Green Business Solution account.

## Current AWS Hosting Model

Production hosting is defined in `infra/production-hosting.yaml` and deployed by `scripts/deploy-production.sh`.

The stack creates:

- S3 bucket for the built Vite frontend.
- CloudFront distribution for `https://retrofi.org` and `https://www.retrofi.org`.
- ACM certificate validated through the Route 53 hosted zone.
- HTTP API Gateway route for `/api/*`.
- Lambda function running the existing Express API through `server/lambda.mjs`.
- Route 53 `A` and `AAAA` alias records for the root and `www` domains.

The API Lambda runs in `us-east-1` with IAM permissions to read/write the existing DynamoDB tables in `us-east-2`.

## Deploy Command

```sh
AWS_PROFILE=gbs ./scripts/deploy-production.sh
```

The script:

1. Builds the Vite frontend.
2. Packages the Express API as a Lambda zip.
3. Uploads the Lambda package to an artifact S3 bucket.
4. Deploys or updates the CloudFormation stack.
5. Syncs `dist/` to the frontend S3 bucket.
6. Invalidates CloudFront.

## Google OAuth

The Google OAuth web client must include these authorized JavaScript origins:

```text
http://localhost:5173
http://127.0.0.1:5173
https://retrofi.org
https://www.retrofi.org
```

This app uses Google Identity Services ID tokens through the browser, so the client secret is not needed by the frontend or API for this flow.

Leave redirect URIs empty for the current sign-in implementation. RetroFi does not currently use Google's authorization-code redirect flow; the browser gets an ID token and the API verifies it at `/api/auth/google`.

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
