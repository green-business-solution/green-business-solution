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

To persist an existing review artifact, including a GPT/manual-repaired public artifact, to DynamoDB:

```sh
AVAILABILITY_REVIEW_OUTPUT_PATH=data/public_opportunity_availability_reviews.json \
  npm run matching:availability-reviews:write
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

To apply a JSON repair response from GPT Pro or a manual researcher:

```sh
npm run matching:availability-apply-repairs -- path/to/repairs.json
```

The repair importer normalizes markdown-formatted source links, updates `data/public_opportunity_availability_reviews.json`, and rewrites `data/public_opportunity_availability_review_report.md`. After applying repairs, rerun the public fixture and archive steps below.

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
11. If the stored source URL is stale, blocked, JavaScript-heavy, or too generic, search the official administrator site for replacement program pages, application portals, current PDFs, tariff sheets, statutes, tax bulletins, measure-specific rebate pages, and program guides before leaving the row uncertain.
12. For tax incentives, PACE programs, bond authorities, utility tariffs, and recurring tax holidays, use official statutes, tax authority guidance, treasurer/controller pages, current application schedules, and official code pages as availability evidence. These often classify as `rolling` or `upcoming`, not `active`.
13. Distinguish program variants with similar names. Grant and loan versions, residential and commercial versions, and parent program pages can have different current statuses.
14. For utility business opportunities, check business rebate portals, enrollment portals, application PDFs, and measure-specific rebate pages. The top-level utility page often lacks enough status language for deterministic classification.

## GPT Pro Batch Lessons

The June 2026 GPT Pro repair batch classified records that the deterministic crawler could not because it could perform semantic official-source research beyond the stored URL list. The successful patterns were:

- finding current official replacement pages when DSIRE or the stored source URL was stale, blocked, or too generic;
- using official statutes, tax authority guidance, treasurer pages, and code sections for standing tax/PACE/bond/tariff incentives;
- finding current application portals and program PDFs for utility programs whose fetched HTML was sparse or JavaScript-heavy;
- separating similarly named program variants, such as REAP grants versus REAP guaranteed loans or MORE grants versus MORE loans;
- treating recurring tax holidays or scheduled future windows as `upcoming` when the current window had passed but an official future cycle was documented.

The crawler intentionally failed closed on many of those rows because broad search fallback can produce false positives for generic program names. GPT Pro did better by classifying the opportunity type first, then looking for the right kind of official proof instead of relying on the originally stored URL. Future repair jobs should apply that same subtype triage before escalating to manual review:

1. `statutory_tax_pace_bond_tariff`: search official state code, tax authority guidance, treasurer/controller pages, current tax forms, tariff sheets, program guides, and sunset dates. Use `rolling` when the official source shows a standing incentive with no expired sunset, `upcoming` when a future window is scheduled, and `unavailable` when the statute/program is repealed or expired.
2. `utility_rebate_or_portal`: search the utility's business/residential rebate portal, enrollment portal, measure-specific rebate page, application PDF, and trade-ally or claim workflow. A reachable title-specific official portal can support lower-confidence `active` when it contains program/rebate terms and no closed language.
3. `grant_or_solicitation`: search current NOFO/FOA/solicitation pages, application schedules, program administrator notices, and current PDFs. Use the review date against application deadlines and distinguish current, future, and closed rounds.
4. `local_option_or_adopted_local_program`: distinguish enabling authority from actual adopted local programs. A local-option statute can support a `rolling` authority record, but a city/county-named record should prefer the active local administrator page.
5. `stale_dsire_or_aggregator_only`: search official replacement pages before marking unavailable. Leave `uncertain` only when no title-specific official or administrator evidence can be found.

When the title is broad, split parent and child programs before deciding. Grant, loan, tax credit, tariff, residential, commercial, personal, corporate, and measure-specific variants can have different statuses even under the same parent program. Current forms, instructions, application portals, program guides, and official PDFs can be stronger evidence than a generic program homepage.

Before escalating the next availability batch, apply those patterns to the remaining uncertain rows. If a row still remains uncertain, include the suspected subtype and failed official-source paths in the GPT Pro/manual research packet so the reviewer starts from the right search strategy.

The final June 2026 manual repair pass attempted the last 50 uncertain public rows without a GPT Pro answer key by applying the same subtype-first process more aggressively. A later Pro answer-key comparison found 9 status corrections and left one Ohio manufacturers record intentionally `uncertain`. The useful additions were:

- Search official site route replacements, not only the originally stored URL. Redesigned utility and program sites often moved old paths into `/programs/...`, `/rebates/...`, `/ways-to-save/...`, or current-year PDF guides while preserving the same program under a new slug.
- For JavaScript-heavy official shells, inspect page title/meta/source text and then search the same official domain for current program, application, and PDF routes before accepting uncertainty.
- For annual utility rebate programs, search the current program year explicitly, such as `2026 energy rebates`, and prefer current rebate catalogs, application forms, and program manuals over older DSIRE source URLs.
- If an old title-specific route is gone but a current title-specific replacement or program-family page describes the same measure and no closed language appears, classify lower-confidence `active` with the replacement source recorded.
- If current official pages only show generic conservation tips, energy education, or unrelated program families and no title-specific replacement exists, classify `unavailable` as `source_missing_no_replacement` instead of leaving the row uncertain.
- Keep parent/child program variants separate. A parent efficiency portfolio may be active while a new homes, solar thermal, diesel mitigation, or old named rebate variant is closed or missing.
- When a closed current solicitation belongs to a recurring official annual procurement, classify `upcoming` instead of `unavailable` if official materials document future cycles. When a legacy program is explicitly consolidated into a currently open replacement program, classify by the replacement program rather than by the closed legacy route.

## Future Cron Automation

A future scheduled job should:

1. Scan opportunities whose `availabilityReviewSchemaVersion` is missing or stale.
2. Include opportunities whose `contentHash` changed since the last review.
3. Include visible opportunities with `availabilityReview.normalizedStatus = uncertain`.
4. Include opportunities that are currently causing `likely_eligible` sample results because of uncertain availability.
5. Re-fetch source URLs and update DynamoDB review fields.
6. Classify remaining uncertain rows by subtype before broad search or LLM escalation: statutory/tax/PACE/bond/tariff, utility rebate portal, grant/solicitation, local-option implementation, or stale DSIRE/aggregator-only.
7. Run subtype-specific official-source searches. For statutes and tax incentives, check current code, tax authority pages, current forms, and sunset dates. For utility programs, check measure pages, portals, application PDFs, and claim workflows. For grants, check current FOAs/NOFOs and official schedules. For local-option records, distinguish enabling law from adopted local programs.
8. Generate the GPT Pro/manual research packet only after subtype search fails, and include the suspected subtype, checked official URLs, and why deterministic review could not decide.
9. Write the repaired availability artifact back to DynamoDB with `matching:availability-reviews:write` so the canonical opportunity records carry the same evidence and status as the generated public artifact.
10. Run `matching:archive-unavailable -- --write-dynamodb --unarchive-restored --archive-low-information` so closed opportunities are hidden, update-only fragments are retired, and reopened opportunities can return.
11. Run `matching:status-bucket-repairs -- --write-dynamodb` for targeted reviewed repairs that convert remaining visible ambiguous matches into eligible, ineligible, archived, or hidden-upcoming outcomes.
12. Run `matching:special-edge-audit` and review any `remove_normal_edges` rows before publishing regenerated test cases.
13. Regenerate sample matching fixtures, then run `matching:availability-public-fixtures` and `matching:special-edge-suppressions:public` when working from checked-in public data.
14. Publish the frontend. The sample generator fails when visible results contain any status other than `eligible` or `ineligible`.

This keeps the canonical opportunity table authoritative while preserving the original source records and the evidence used for availability decisions.
