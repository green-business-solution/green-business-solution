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
AWS_PROFILE=gbs npm run fixtures:generated:download
```

Upload refreshed fixtures:

```sh
AWS_PROFILE=gbs npm run fixtures:generated:upload
```

## Local Firstmate Tasks

The admin `/tasks` page is disabled unless local Firstmate task access is explicitly enabled.
For local captain workflow only, run the API with `RETROFI_ENABLE_FIRSTMATE_TASKS=1` and `RETROFI_FIRSTMATE_HOME=/Users/neer_kuchlous/Code/firstmate`.
If local Google OAuth is not configured, set `RETROFI_FIRSTMATE_TASKS_LOCAL_AUTH_BYPASS=1` to allow only the Firstmate tasks list, report, and response endpoints to run without admin sign-in.
The auth bypass is ignored when AWS Lambda runtime environment markers are present.
The API reads Firstmate backlog, status, metadata, and `data/<task-id>/report.md` files without mutating them.
For response-needed tasks with a live `window=` value in `state/<task-id>.meta`, the admin page can send a captain response through `<RETROFI_FIRSTMATE_HOME>/bin/fm-send.sh` using argument-based process execution.
If `fm-send.sh` reports that Enter was swallowed and text was left in the composer, the API performs one argument-based `--key Enter` retry for the same validated window.
For completed tasks with reports and a live `window=`, the admin page can send report feedback with either a proceed action or requested-change comments through the same helper.
For completed or review-ready reports without a live `window=`, report feedback is written to `data/<task-id>/feedback/` and queued as a Firstmate follow-up task through `tasks-axi add`.
Set `RETROFI_FIRSTMATE_FEEDBACK_AUTO_DISPATCH=1` with the local tasks auth bypass to automatically spawn a scout crewmate for no-window report revision requests.
The auto-dispatch spawn uses `<RETROFI_FIRSTMATE_HOME>/bin/fm-spawn.sh` with explicit profile args, defaulting to `--harness codex --model gpt-5.5 --effort xhigh`.
Override those local-only defaults with `RETROFI_FIRSTMATE_FEEDBACK_DISPATCH_HARNESS`, `RETROFI_FIRSTMATE_FEEDBACK_DISPATCH_MODEL`, and `RETROFI_FIRSTMATE_FEEDBACK_DISPATCH_EFFORT`.
If auto-dispatch is disabled or spawn fails, the revision follow-up remains queued and the dashboard reports that fallback.
If an active or reopened task still has an older `report.md`, the dashboard labels it as a previous or draft report instead of a final report.
Set `report_status=review-ready` in task metadata only when an active task explicitly wants captain report review before completion.
GPT Pro repair/report tasks expose the repair workspace action only when task metadata explicitly marks the next step as repair work, such as `gpt_pro_repair_status=ready` or `report_status=repair-ready`.
Set `RETROFI_FIRSTMATE_GPT_PRO_REPAIR_URL=/chats` to route those repair-ready rows to the local GPT Pro copy/paste workspace.
Set `RETROFI_GPT_PRO_CHATS_LOCAL_AUTH_BYPASS=1`, or use the existing Firstmate tasks local auth bypass, only for local captain workflows where Google OAuth is not configured.
Rows in report review mode and rows in GPT Pro repair mode are mutually exclusive in the dashboard.
