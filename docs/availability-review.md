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
- `active` can also mean a lower-confidence official-source finding where the current administrator page is reachable, title-specific, and program-specific, with no closed/upcoming evidence. This is recorded with `reachable_title_specific_program_page`.
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

To audit the same opportunities currently visible in the public retrofit index without scanning AWS, pass the generated public index:

```sh
AVAILABILITY_REVIEW_FETCH_ATTEMPTS=1 \
  AVAILABILITY_REVIEW_FETCH_RETRY_DELAY_MS=0 \
  AVAILABILITY_REVIEW_CONCURRENCY=16 \
  npm run matching:availability-reviews:public
```

The public review command uses `public/retrofit_opportunity_index.json` as the source and writes:

- `data/public_opportunity_availability_reviews.json`
- `data/public_opportunity_availability_review_report.md`

`AVAILABILITY_REVIEW_SEARCH_FALLBACK=1` enables an optional search fallback for rows that remain `uncertain` after direct source fetches. Use this only for exploratory research or targeted runs: search results can return unrelated pages for generic program names, so the crawler should not auto-accept broad search fallback results without source review.

For a conservative second pass over only currently uncertain public rows:

```sh
npm run matching:availability-reviews:public:uncertain
```

This reuses the existing public review artifact, reviews only rows with `availabilityReview.normalizedStatus = "uncertain"`, and merges safe direct-source updates back into the artifact. By default this command does not use broad search fallback.

When rows remain uncertain after the conservative pass, generate a GPT Pro/manual research packet:

```sh
npm run matching:availability-research-prompt
```

This writes:

- `data/public_opportunity_uncertain_research_targets.json`
- `data/public_opportunity_uncertain_research_prompt.md`

Use that prompt for official-source research, then apply reviewed repairs with the same evidence standard used by `availabilityReview`.

The script writes:

- `data/availability_reviews.json`
- `data/availability_review_report.md`
- DynamoDB fields `availabilityReview`, `availabilityReviewUpdatedAt`, and `availabilityReviewSchemaVersion` when `--write-dynamodb` is used.

After writing availability reviews, rerun the archive pass and sample matching fixture:

```sh
npm run matching:archive-unavailable -- --write-dynamodb
npm run matching:sample
```

For the checked-in public fixtures, apply the public availability review before publishing:

```sh
npm run matching:availability-public-fixtures
```

This removes `unavailable` opportunities from active public maps, moves `upcoming` opportunities into the public `upcomingOpportunities` bucket, updates the active opportunity counts, and leaves `uncertain` opportunities visible with `availabilityStatus: "uncertain"` until a stronger source is found.

To dry-run archive actions directly from the public availability artifact:

```sh
OPPORTUNITY_SOURCE_PATH=data/public_opportunity_availability_reviews.json \
  OPPORTUNITY_ARCHIVE_OUTPUT_PATH=data/public_opportunity_archive_report.json \
  OPPORTUNITY_ARCHIVE_REPORT_PATH=data/public_opportunity_archive_report.md \
  npm run matching:archive-unavailable
```

Add `-- --write-dynamodb` after refreshing AWS SSO to persist those archive actions.

Then audit mixed special/physical retrofit edges:

```sh
npm run matching:special-edge-audit
```

The special-edge audit writes:

- `data/special_retrofit_edge_audit.json`
- `data/special_retrofit_edge_audit.md`

Use the audit to suppress normal-retrofit edges when official source text explicitly says an energy audit, LEED certification, engineering feasibility study, or benchmarking/compliance step is required before the normal retrofit incentive can be used. Also suppress the normal-retrofit edge when the special service is the only source-text match and every normal retrofit match is only a broad fallback. Otherwise keep the normal retrofit edge and show the special category separately in the UI.

When suppression IDs have been added to `SPECIAL_PREREQUISITE_NORMAL_EDGE_OPPORTUNITY_IDS` in `server/matching/retrofitTaxonomy.mjs`, regenerate sample data from AWS with `npm run matching:sample`. If AWS credentials are unavailable and the checked-in public fixtures need to be patched immediately, run:

```sh
npm run matching:special-edge-suppressions:public
```

That command removes the suppressed opportunities from physical-retrofit groups in `public/retrofit_opportunity_index.json` and `public/sample_matching_test_cases.json`, while leaving the opportunities attached to their planning/certification/compliance categories.

## Source Research Process

For each opportunity, the script combines:

- structured opportunity fields
- extraction corpus fields used by the matcher
- `sourceUrl`
- `websiteUrl`
- `applicationUrl`
- evidence source URLs

The fetched text is searched for supported evidence of active, rolling, upcoming, or unavailable status. Evidence is stored in `availabilityReview.evidenceText` with `sourceUrlsChecked` and `fetchErrors` so the result can be audited later.

Some official pages are JavaScript-heavy and only return a short shell to the fetcher. A reachable title-specific source page or direct source URL can be classified as `active` with lower confidence when it contains program/incentive terms and no closed/upcoming evidence. Pure maintenance shells, generic search-result pages, and unrelated city/state homepages must not activate a record by themselves.

When manual research is needed, use the same evidence standard:

1. Prefer an official program page, application portal, solicitation page, or utility/program administrator page.
2. Treat explicit closed/fully subscribed/deadline-passed language as `unavailable`.
3. Treat explicit no-deadline/no-time-limit/open-until-funds language as `rolling`.
4. Treat current application/enroll/get-started/rebate language as `active`.
5. Leave `uncertain` when the source only describes historical funding or marketing text without current participation evidence.
6. Do not use `lastSeenAt` alone as proof that the opportunity is open.
7. If an official source responds with HTTP 403/429, timeout, or transient 5xx errors, wait for the retry window and rerun the review. If it is still blocked, check alternate official or program-partner sources before accepting `uncertain`.
8. If a DSIRE record is only a maintenance/update note with no detail URL or useful program corpus, archive it as `low_information_update_record` instead of letting it remain in `manual_review`.
9. If a visible sample match still produces `likely_eligible` or `needs_information`, repair the specific unknown canonical field and rerun the sample generator. The admin fixture should not be published with unresolved visible statuses.
10. Do not classify from generic search snippets or unrelated pages that happen to contain title words like city, county, energy, business, utility, or residential.

## Future Cron Automation

A future scheduled job should:

1. Scan opportunities whose `availabilityReviewSchemaVersion` is missing or stale.
2. Include opportunities whose `contentHash` changed since the last review.
3. Include visible opportunities with `availabilityReview.normalizedStatus = uncertain`.
4. Include opportunities that are currently causing `likely_eligible` sample results because of uncertain availability.
5. Re-fetch source URLs and update DynamoDB review fields.
6. Run `matching:archive-unavailable -- --write-dynamodb --unarchive-restored --archive-low-information` so closed opportunities are hidden, update-only fragments are retired, and reopened opportunities can return.
7. Run `matching:status-bucket-repairs -- --write-dynamodb` for targeted reviewed repairs that convert remaining visible ambiguous matches into eligible, ineligible, archived, or hidden-upcoming outcomes.
8. Run `matching:special-edge-audit` and review any `remove_normal_edges` rows before publishing regenerated test cases.
9. Regenerate sample matching fixtures, then run `matching:availability-public-fixtures` and `matching:special-edge-suppressions:public` when working from checked-in public data.
10. Publish the frontend. The sample generator fails when visible results contain any status other than `eligible` or `ineligible`.

This keeps the canonical opportunity table authoritative while preserving the original source records and the evidence used for availability decisions.
