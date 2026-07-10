# Development Artifacts

Raw GPT Pro prompt/output work packets are stored outside Git in a private S3 bucket.

Generated fixtures and synthetic test data use a separate private S3 bucket so fixture deploy/sync work
does not mix with raw GPT prompt/output archives.
The generated-fixture manifest lives at `data/generated_test_fixtures_manifest.json` and records the
current bucket, prefix, object sizes, and SHA-256 checksums so downloads can verify integrity against
production before local files are reused.

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

- Current production S3 URI: `s3://gbs-retrofi-test-fixtures-059310317821-us-east-1/generated-test-fixtures/`
- AWS region: `us-east-1`
- Current production bucket: `gbs-retrofi-test-fixtures-059310317821-us-east-1`
- Current AWS profile: `retrofi-prod`
- Legacy rollback profile: `gbs`
- Access: private S3 bucket with public access blocked
- Default encryption: AES-256
- Versioning: enabled

Use `scripts/copy-s3-bucket-versions-between-profiles.mjs` only for explicit legacy rollback or migration verification work.

Restore locally:

```sh
AWS_PROFILE=retrofi-prod GBS_GENERATED_FIXTURE_BUCKET=gbs-retrofi-test-fixtures-059310317821-us-east-1 npm run fixtures:generated:download -- --force
```

Upload refreshed fixtures:

```sh
AWS_PROFILE=retrofi-prod GBS_GENERATED_FIXTURE_BUCKET=gbs-retrofi-test-fixtures-059310317821-us-east-1 npm run fixtures:generated:upload
```

## Local Firstmate Tasks

The Firstmate task snapshot pipeline is still documented in the Firstmate project and in the sync scripts.
This repository no longer exposes a `/tasks` page or task-report UI.
Retain the shared task snapshot code only where it is still used by non-UI workflows.
