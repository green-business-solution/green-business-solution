# Utility Restriction Review Runbook

This runbook records the process used to reduce ambiguous electric-utility eligibility for opportunity matching. It is designed to be repeatable by Codex or a scheduled job after new DSIRE opportunities are collected.

## Goal

Preserve each raw opportunity record, then attach a generated `utilityRestrictionReview` object that tells the matcher how to treat utility eligibility:

- `required`: a utility, customer, or service-territory requirement was found. Matching requires the user's distribution utility to match.
- `none`: the source explicitly says any utility is acceptable or no utility restriction applies.
- `not_applicable`: utility provider is not an eligibility dimension for the opportunity type, such as a federal tax credit, state tax program, broad grant, loan, bond, or financing program without utility-customer language.
- `none_found_after_review`: the record corpus and fetched source pages were reviewed and no utility restriction language was found.
- `unknown`: source language suggests a customer/service-territory rule or utility-administered program, but the required utility could not be confidently normalized.

The matcher treats `required` as a real eligibility gate, treats `none`, `not_applicable`, and `none_found_after_review` as a utility pass, and keeps `unknown` as `needs_information` or `manual_review` rather than rejecting the user.

## Repeatable Workflow

1. Refresh opportunity data.

   ```sh
   npm run gather:dsire:aws
   ```

2. Research and generate utility reviews.

   ```sh
   npm run matching:utility-reviews
   ```

   The script scans `gbs-opportunity-candidates`, builds a searchable corpus for each opportunity, fetches available source pages, and writes:

   - `data/utility_restriction_reviews.json`
   - `data/utility_restriction_review_report.md`

3. Regenerate sample matching fixtures.

   ```sh
   npm run matching:sample
   ```

   The sample matcher automatically loads `data/utility_restriction_reviews.json` and applies reviews before building match profiles.

4. Run quick checks.

   ```sh
   npm test
   npm run build
   ```

5. Commit, push, and deploy the updated app/fixtures when the generated admin output changes.

## Useful Environment Variables

- `OPPORTUNITY_SOURCE_PATH`: read opportunities from a local JSON export instead of DynamoDB.
- `UTILITY_REVIEW_OUTPUT_PATH`: override the generated review JSON path.
- `UTILITY_REVIEW_REPORT_PATH`: override the generated markdown report path.
- `UTILITY_REVIEW_FETCH=0`: skip source-page fetches and review only the stored opportunity corpus.
- `UTILITY_REVIEW_CONCURRENCY=8`: control opportunity review concurrency.
- `UTILITY_REVIEW_FETCH_TIMEOUT_MS=12000`: control source-page fetch timeout.
- `UTILITY_REVIEWS_PATH`: point `npm run matching:sample` at a non-default review artifact.

Optional DynamoDB writeback:

```sh
npm run matching:utility-reviews -- --write-dynamodb
```

Use writeback only when the generated review has been accepted as the current production normalization layer. Git remains the source of truth for code; AWS is only the deployment/data target.

## Review Method

The review script:

1. Builds a record-wide extraction corpus from fields such as title, summary, administrator, details, geography, sectors, technologies, parameter sets, matching parameters, source-specific blocks, and evidence text.
2. Collects source URLs from `sourceUrl`, `websiteUrl`, `applicationUrl`, and evidence URLs.
3. Fetches source pages when enabled and strips HTML into reviewable text.
4. Applies deterministic utility normalization and utility-name heuristics.
5. Stores evidence text, source URLs checked, fetch errors, review method, confidence, and reviewed timestamp.

The script should be conservative about `none`: use explicit `none` only when the source says any/no utility restriction. Use `none_found_after_review` when the source was checked and no utility language appeared. Keep `unknown` when there is customer/service-territory wording or a likely utility-administered program whose utility could not be normalized.

## Future Cron Shape

A scheduled Codex-style job can run:

```sh
git pull --ff-only
npm run gather:dsire:aws
npm run matching:utility-reviews
npm run matching:sample
npm test
npm run build
git status --short
```

Then Codex should inspect `data/utility_restriction_review_report.md`, spot-check high-impact `unknown` and `required` rows, commit the changed artifacts and code, push, and deploy the frontend if `public/sample_matching_test_cases.json` or other public fixtures changed.

For larger scale, optimize by only reviewing opportunities whose `contentHash` changed or whose stored `utilityRestrictionReview.reviewMethod`/extractor version is stale.
