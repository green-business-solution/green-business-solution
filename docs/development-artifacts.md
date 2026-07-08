# Development Artifacts

Raw GPT Pro prompt/output work packets are stored outside Git in a private S3 bucket.

Generated fixtures and synthetic test data use a separate private S3 bucket so fixture deploy/sync work
does not mix with raw GPT prompt/output archives.

## GPT Pro Work

- Current source S3 URI: `s3://gbs-retrofi-dev-work-448016109714-us-east-1/gpt-pro-work/`
- New production S3 URI: `s3://gbs-retrofi-dev-work-059310317821-us-east-1/gpt-pro-work/`
- AWS region: `us-east-1`
- Current source bucket: `gbs-retrofi-dev-work-448016109714-us-east-1`
- New production bucket: `gbs-retrofi-dev-work-059310317821-us-east-1`
- Access: private S3 bucket with public access blocked
- Default encryption: AES-256
- Versioning: enabled

Restore locally:

```sh
AWS_PROFILE=gbs AWS_REGION=us-east-1 aws s3 sync \
  s3://gbs-retrofi-dev-work-448016109714-us-east-1/gpt-pro-work/ \
  "GPT Pro Work/"
```

Upload new local GPT Pro work:

```sh
AWS_PROFILE=gbs AWS_REGION=us-east-1 aws s3 sync \
  "GPT Pro Work/" \
  s3://gbs-retrofi-dev-work-448016109714-us-east-1/gpt-pro-work/ \
  --exclude ".DS_Store" \
  --exclude "*/.DS_Store" \
  --sse AES256
```

`GPT Pro Work/` is intentionally ignored by Git. Keep durable normalized import artifacts in `data/` when runtime code or tests need them.

## Generated Fixtures

- Current source S3 URI: `s3://gbs-retrofi-test-fixtures-448016109714-us-east-1/generated-test-fixtures/`
- New production S3 URI: `s3://gbs-retrofi-test-fixtures-059310317821-us-east-1/generated-test-fixtures/`
- AWS region: `us-east-1`
- Current source bucket: `gbs-retrofi-test-fixtures-448016109714-us-east-1`
- New production bucket: `gbs-retrofi-test-fixtures-059310317821-us-east-1`
- Access: private S3 bucket with public access blocked
- Default encryption: AES-256
- Versioning: enabled

During the AWS account migration, use `scripts/copy-s3-bucket-versions-between-profiles.mjs` to preserve historical versions for both versioned buckets.

Restore locally:

```sh
AWS_PROFILE=gbs npm run fixtures:generated:download
```

Upload refreshed fixtures:

```sh
AWS_PROFILE=gbs npm run fixtures:generated:upload
```

## Local Firstmate Tasks

The admin `/tasks` page is disabled unless local Firstmate task access is explicitly enabled.
For local captain workflow only, run the API with `RETROFI_ENABLE_FIRSTMATE_TASKS=1` and `RETROFI_FIRSTMATE_HOME=/Users/neer_kuchlous/Code/firstmate`.
The API reads Firstmate backlog, status, metadata, and `data/<task-id>/report.md` files without mutating them.
