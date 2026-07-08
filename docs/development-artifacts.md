# Development Artifacts

Raw GPT Pro prompt/output work packets are stored outside Git in a private S3 bucket.

Generated fixtures and synthetic test data use a separate private S3 bucket so fixture deploy/sync work
does not mix with raw GPT prompt/output archives.

## GPT Pro Work

- Current production S3 URI: `s3://gbs-retrofi-dev-work-059310317821-us-east-1/gpt-pro-work/`
- AWS region: `us-east-1`
- Current production bucket: `gbs-retrofi-dev-work-059310317821-us-east-1`
- Current AWS profile: `retrofi-prod`
- Legacy rollback profile: `gbs`
- Access: private S3 bucket with public access blocked
- Default encryption: AES-256
- Versioning: enabled

Restore locally:

```sh
AWS_PROFILE=retrofi-prod AWS_REGION=us-east-1 aws s3 sync \
  s3://gbs-retrofi-dev-work-059310317821-us-east-1/gpt-pro-work/ \
  "GPT Pro Work/"
```

Dry-run the managed migration before uploading new local GPT Pro work:

```sh
AWS_PROFILE=retrofi-prod AWS_REGION=us-east-1 npm run migrate:gpt-pro-work
```

Upload with:

```sh
AWS_PROFILE=retrofi-prod AWS_REGION=us-east-1 npm run migrate:gpt-pro-work -- --write
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
AWS_PROFILE=retrofi-prod npm run fixtures:generated:download
```

Upload refreshed fixtures:

```sh
AWS_PROFILE=retrofi-prod npm run fixtures:generated:upload
```
