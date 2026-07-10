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

The admin `/tasks` page reads the manifest-selected production-safe Codex task snapshot from DynamoDB for authenticated RetroFi admins.
It distinguishes unavailable, empty, warning, and current snapshot states.
When the snapshot metadata includes source timestamps, it surfaces the source-generated and source-modified times in the admin notice.
The Refresh button always refetches the latest snapshot response.
The summary card labeled Working tasks counts only tasks still in active work states.
Blocked tasks stay in the blocked section and do not move into the Needs response bucket just because they are blocked.
The Show inactive control uses the snapshot's inactive counts, including the hidden-by-default count when that is present.
Firstmate remains the authoritative task system.
Publish sanitized snapshots from a trusted operator environment with a least-privilege AWS identity that can write only the Firstmate task snapshot table:

```sh
cd <retrofi-checkout> && RETROFI_FIRSTMATE_HOME=<firstmate-home> AWS_PROFILE=<firstmate-task-publisher> GBS_FIRSTMATE_TASKS_TABLE=gbs-firstmate-tasks npm run firstmate:tasks:sync -- --write
```

For a simple periodic publisher, install the same command in cron or launchd at the desired interval, for example every five minutes:

```cron
*/5 * * * * cd <retrofi-checkout> && RETROFI_FIRSTMATE_HOME=<firstmate-home> AWS_PROFILE=<firstmate-task-publisher> GBS_FIRSTMATE_TASKS_TABLE=gbs-firstmate-tasks npm run firstmate:tasks:sync -- --write >> <safe-log-dir>/retrofi-firstmate-task-sync.log 2>&1
```

The sync first writes a complete versioned snapshot, including bounded sanitized report payloads, then conditionally advances the manifest so stale publishes cannot retire current work.
Only safe task fields and report markdown capped at 24000 characters are persisted.
Completed and archived tasks stay in the snapshot and remain inactive.
They are hidden by default only when no report review is pending.
Completed or archived tasks with review-ready reports remain discoverable in the default admin view through the Reports ready area and count.
Deploy the optional ingestion role by setting `GBS_FIRSTMATE_TASKS_INGESTION_PRINCIPAL_ARN` to the exact publisher role or user ARN before running `npm run deploy:production:data`.
Leave it blank to preserve any existing stack value and skip adding a writer role when the stack is created fresh.
The RetroFi Lambda role has read-only access to the snapshot table.

For local captain workflow only, run the API with `RETROFI_ENABLE_FIRSTMATE_TASKS=1` and
`RETROFI_FIRSTMATE_HOME=<firstmate-home>`.
If local Google OAuth is not configured, set `RETROFI_FIRSTMATE_TASKS_LOCAL_AUTH_BYPASS=1` to allow only
Firstmate task reads, response, report feedback, and assignment endpoints to run without admin
sign-in.
The auth bypass is ignored when AWS Lambda runtime environment markers are present.
The API reads Firstmate backlog, status, metadata, and `data/<task-id>/report.md` files without mutating them.
For response-needed tasks with a live `window=` value in `state/<task-id>.meta`, the admin page can send a captain response through `<RETROFI_FIRSTMATE_HOME>/bin/fm-send.sh` using argument-based process execution.
If `fm-send.sh` reports that Enter was swallowed and text was left in the composer, the API performs one argument-based `--key Enter` retry for the same validated window.
For completed tasks with reports and a live `window=`, the admin page can send report feedback with either a proceed action or requested-change comments through the same helper.
For completed or review-ready reports without a live `window=`, report feedback is written to `data/<task-id>/feedback/` and queued as a Firstmate follow-up task through `tasks-axi add`.
Looks-good report approval creates a continuation task and records `data/<task-id>/feedback/report-review-state.json` so the approved report leaves the default review list without deleting `report.md`.
Requested changes create a revision task and keep the original report row visible until a revised report is available.
Existing queued or active `feedback-*`, `revision-*`, or `continue-*` follow-ups also suppress the original completed report from the default review list.
Set `RETROFI_FIRSTMATE_FEEDBACK_AUTO_DISPATCH=1` with the local tasks auth bypass to automatically spawn crewmates for no-window report revisions, report continuations, and queued task assignment.
The auto-dispatch spawn uses `<RETROFI_FIRSTMATE_HOME>/bin/fm-spawn.sh` with explicit profile args, defaulting to `--harness codex --model gpt-5.5 --effort xhigh`.
Override those local-only defaults with `RETROFI_FIRSTMATE_FEEDBACK_DISPATCH_HARNESS`, `RETROFI_FIRSTMATE_FEEDBACK_DISPATCH_MODEL`, and `RETROFI_FIRSTMATE_FEEDBACK_DISPATCH_EFFORT`.
If auto-dispatch is disabled or spawn fails, the follow-up remains queued and the dashboard reports that fallback.
For queued tasks without `project=` metadata, the dashboard assignment endpoint tries the Firstmate project registry, `RETROFI_FIRSTMATE_PROJECT_<REPO>_PATH`, `RETROFI_FIRSTMATE_PROJECT_PATH`, and known local RetroFi project paths before reporting that the project path is unavailable.
If a queued task is missing `data/<task-id>/brief.md`, assignment creates that brief under the task data directory from the backlog details before calling `fm-spawn.sh`.
If an active or reopened task still has an older `report.md`, the dashboard labels it as a previous or draft report instead of a final report.
Set `report_status=review-ready` in task metadata only when an active task explicitly wants captain report review before completion.
GPT Pro repair/report tasks expose the repair workspace action only when task metadata explicitly marks the next step as repair work, such as `gpt_pro_repair_status=ready` or `report_status=repair-ready`.
Set `RETROFI_FIRSTMATE_GPT_PRO_REPAIR_URL=/chats` to route those repair-ready rows to the local GPT Pro copy/paste workspace.
Set `RETROFI_GPT_PRO_CHATS_LOCAL_AUTH_BYPASS=1` only for local captain `/chats` workflows where Google OAuth is not configured.
The Firstmate tasks local auth bypass remains scoped to Firstmate task endpoints and does not grant access to GPT Pro work endpoints.
Rows in report review mode and rows in GPT Pro repair mode are mutually exclusive in the dashboard.
