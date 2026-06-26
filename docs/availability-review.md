# Availability Review

The matcher should not treat missing or stale dates as proof that an opportunity is open. Availability is stored as a generated review artifact on each opportunity:

```json
{
  "availabilityReview": {
    "normalizedStatus": "active",
    "applicationOpenAt": null,
    "applicationDeadlineAt": null,
    "questionsDeadlineAt": null,
    "programEndAt": null,
    "recurring": false,
    "noDeadlineExplicit": false,
    "evidenceText": "Apply online...",
    "reasons": ["active_program_language"],
    "sourceUrlsChecked": ["https://example.com/program"],
    "fetchErrors": [],
    "reviewedAt": "2026-06-25T00:00:00.000Z",
    "reviewMethod": "source_url_fetch_and_deterministic_corpus",
    "confidence": 0.82
  },
  "availabilityReviewSchemaVersion": "availability-review-v1",
  "availabilityReviewUpdatedAt": "2026-06-25T00:00:00.000Z"
}
```

## Status Rules

- `active`: the reviewed source indicates current participation, applications, enrollment, incentives, or contact-to-start language.
- `rolling`: the source explicitly says no deadline, no time limit, first-come first-served, or open until funds are exhausted.
- `upcoming`: the source indicates a future opening date or upcoming funding round. These records are hidden from normal UI/matching surfaces until a later review reclassifies them as `active` or `rolling`.
- `unavailable`: the source says closed, fully subscribed, no longer accepting applications, funding exhausted, cancelled, or the application deadline has passed.
- `uncertain`: the reviewed source does not contain enough supported evidence to make a deterministic availability decision.

The matcher treats `active` and `rolling` as pass, hides `upcoming` records before UI fixture generation and database browsing, treats `unavailable` as a hard unavailable blocker, and treats `uncertain` as an unresolved requirement.

## Repair Workflow

Use the availability review script to review source records, fetch source pages, and write the canonical review fields:

```sh
npm run matching:availability-reviews
```

To persist results to DynamoDB:

```sh
npm run matching:availability-reviews -- --write-dynamodb
```

For a targeted repair, export or build a JSON list of opportunities and pass it through `OPPORTUNITY_SOURCE_PATH`:

```sh
OPPORTUNITY_SOURCE_PATH=/tmp/retrofi-availability-targets.json \
  npm run matching:availability-reviews -- --write-dynamodb
```

The script writes:

- `data/availability_reviews.json`
- `data/availability_review_report.md`
- DynamoDB fields `availabilityReview`, `availabilityReviewUpdatedAt`, and `availabilityReviewSchemaVersion` when `--write-dynamodb` is used.

After writing availability reviews, rerun the archive pass and sample matching fixture:

```sh
npm run matching:archive-unavailable -- --write-dynamodb
npm run matching:sample
```

## Source Research Process

For each opportunity, the script combines:

- structured opportunity fields
- extraction corpus fields used by the matcher
- `sourceUrl`
- `websiteUrl`
- `applicationUrl`
- evidence source URLs

The fetched text is searched for supported evidence of active, rolling, upcoming, or unavailable status. Evidence is stored in `availabilityReview.evidenceText` with `sourceUrlsChecked` and `fetchErrors` so the result can be audited later.

When manual research is needed, use the same evidence standard:

1. Prefer an official program page, application portal, solicitation page, or utility/program administrator page.
2. Treat explicit closed/fully subscribed/deadline-passed language as `unavailable`.
3. Treat explicit no-deadline/no-time-limit/open-until-funds language as `rolling`.
4. Treat current application/enroll/get-started/rebate language as `active`.
5. Leave `uncertain` when the source only describes historical funding or marketing text without current participation evidence.
6. Do not use `lastSeenAt` alone as proof that the opportunity is open.
7. If an official source responds with HTTP 429, timeout, or transient 5xx errors, wait for the retry window and rerun the review before accepting `uncertain`.
8. If a DSIRE record is only a maintenance/update note with no detail URL or useful program corpus, archive it as `low_information_update_record` instead of letting it remain in `manual_review`.

## Future Cron Automation

A future scheduled job should:

1. Scan opportunities whose `availabilityReviewSchemaVersion` is missing or stale.
2. Include opportunities whose `contentHash` changed since the last review.
3. Include visible opportunities with `availabilityReview.normalizedStatus = uncertain`.
4. Include opportunities that are currently causing `likely_eligible` sample results because of uncertain availability.
5. Re-fetch source URLs and update DynamoDB review fields.
6. Run `matching:archive-unavailable -- --write-dynamodb --unarchive-restored --archive-low-information` so closed opportunities are hidden, update-only fragments are retired, and reopened opportunities can return.
7. Regenerate sample matching fixtures and publish them with the frontend.

This keeps the canonical opportunity table authoritative while preserving the original source records and the evidence used for availability decisions.
