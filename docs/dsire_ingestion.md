# DSIRE Opportunity Ingestion

This project now has a reusable DSIRE ingestion script:

```bash
npm run gather:dsire
```

The command runs `scripts/gather-dsire-opportunities.mjs`. It writes local JSON artifacts under `var/opportunity-ingestion/dsire/`, which is intentionally ignored by Git.

## Current Behavior

The script supports two modes:

- `api`: gathers full DSIRE program records from a configured licensed/API endpoint.
- `rss`: gathers the public DSIRE update feed for weekly change detection.

The default command uses `auto` mode:

- If `DSIRE_API_BASE_URL` is set, it runs API mode.
- If `DSIRE_API_BASE_URL` is not set, it runs RSS mode.

RSS mode is useful for detecting recently added or updated DSIRE programs, but it is not a full opportunity database export. Full DSIRE gathering requires configured API access or another authorized structured endpoint.

## Commands

Run the public RSS smoke test:

```bash
npm run gather:dsire:rss
```

Run API mode after configuring access:

```bash
DSIRE_API_BASE_URL="https://example.dsire-api-host" npm run gather:dsire -- --mode api
```

Run an API delta pull when the endpoint supports an updated-since filter:

```bash
DSIRE_API_BASE_URL="https://example.dsire-api-host" npm run gather:dsire -- --mode api --updated-since 2026-01-01
```

Limit records during testing:

```bash
npm run gather:dsire:rss -- --limit 5
```

## API Configuration

Use environment variables so credentials are not committed:

| Variable | Purpose |
| --- | --- |
| `DSIRE_API_BASE_URL` | Base API URL. Required for API mode. |
| `DSIRE_API_PROGRAMS_PATH` | Program endpoint path. Defaults to `/programs`. |
| `DSIRE_API_KEY` | Optional API token/key. |
| `DSIRE_API_AUTH_HEADER` | Header for the token/key. Defaults to `Authorization`. |
| `DSIRE_API_AUTH_SCHEME` | Auth scheme. Defaults to `Bearer`; set empty if the API expects the raw token. |
| `DSIRE_API_LIMIT_PARAM` | Page-size query parameter. Defaults to `limit`. |
| `DSIRE_API_OFFSET_PARAM` | Offset query parameter. Defaults to `offset`. |
| `DSIRE_API_PAGE_PARAM` | Optional page-number query parameter. If set, page mode is used instead of offset mode. |
| `DSIRE_API_PAGE_START` | First page number. Defaults to `1`. |
| `DSIRE_API_UPDATED_SINCE_PARAM` | Updated-since query parameter. Defaults to `updatedSince`. |
| `DSIRE_USER_AGENT` | Optional user-agent override. |

The adapter is intentionally configurable because the exact licensed DSIRE API shape should come from the DSIRE API documentation or credentials we receive.

## Output Files

Each run creates:

- `raw-records.json`: raw API records or RSS items.
- `normalized-opportunities.json`: normalized opportunity candidate records.
- `source-documents.json`: fetched API/RSS document metadata and hashes.
- `changes.json`: new, changed, unchanged, and when safe, removed records compared with the previous local snapshot.
- `run-manifest.json`: run metadata, counts, output paths, and limitations.

The script also updates:

- `latest-normalized-opportunities.json`
- `latest-run-manifest.json`

These files are local ingestion artifacts. They are not yet the final relational opportunity database.

## Weekly Reuse

The weekly job should eventually run this script before downstream parsing, classification, review, and publishing jobs.

Suggested future flow:

1. Run DSIRE API mode as a full inventory or updated-since pull.
2. Store raw and normalized artifacts.
3. Compare content hashes and external IDs against existing opportunity records.
4. Insert or update relational opportunity tables.
5. Queue uncertain, changed, or high-impact records for admin review.
6. Show every related table in the admin interface for human validation.

## Current Limitations

- The relational opportunity database has not been implemented yet.
- This script does not create migrations, queues, cron schedules, Lambda jobs, or admin review tabs.
- RSS mode cannot gather all DSIRE opportunities.
- API mode is ready for configuration, but the actual DSIRE API base URL, auth format, and pagination parameters need to be confirmed from the authorized DSIRE API access.
- Classification by zip code, utility provider, business classification, and square footage remains planned for a later implementation step.
