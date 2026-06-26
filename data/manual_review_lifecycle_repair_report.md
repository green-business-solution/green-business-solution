# Manual Review and Upcoming Lifecycle Repair Report

Generated: 2026-06-26T22:55:42.245Z
DynamoDB writes: yes

## Objective

- Hide `upcoming` opportunities from normal UI and generated sample matching fixtures without archiving them.
- Keep upcoming records available for daily availability repair so they can re-enter matching once source evidence supports `active` or `rolling`.
- Repair visible `manual_review` opportunity records by improving deterministic normalization where the stored corpus supports it.
- Archive records that are too low-information to match safely.

## Repair Process

1. Scanned all 2,096 DynamoDB opportunity records and rebuilt current match profiles from the local extractor.
2. Filtered archived lifecycle records and then filtered `upcoming`/`unavailable` availability from visible matching surfaces.
3. Audited visible `manual_review` causes. The initial visible opportunity-level review set was 34 rows, primarily missing applicant or technology normalization.
4. Added deterministic normalization for common source patterns:
   - EV charging and DC fast charging programs.
   - Clean diesel, Volkswagen settlement, bus, fleet, cargo-handling, forklift, and light-duty vehicle programs.
   - Renewable, hydrogen, wood heating, farm wiring, C-PACE, energy-financing, and business-support loan programs.
   - Economic-development rate discounts.
5. Tightened stale availability parsing so generic phrases like “read the most recent Solicitation of Applications” do not close recurring programs such as REAP.
6. Classified DSIRE changelog/update-note records as `low_information_update_record` only when they had:
   - a `dsire_program_code_title_hash` ID,
   - the generic DSIRE `/system/program` source URL,
   - no detail/website/application source URL, and
   - only a short maintenance-note summary.
7. Ran a targeted availability fetch/retry review for the 12 current unavailable candidates before archiving them. Fetch errors were recorded per row instead of silently accepted.
8. Wrote canonical `availabilityReview` data for those 12 unavailable records to DynamoDB.
9. Archived 33 additional records in DynamoDB:
   - 12 unavailable records supported by source-page review.
   - 21 low-information uncertain update-note records.
10. Regenerated `public/sample_matching_test_cases.json` from the repaired DynamoDB table.

## Results

Post-write verification from DynamoDB:

```json
{
  "total": 2096,
  "archived": 243,
  "hiddenUpcomingUnarchived": 41,
  "visibleOpportunityCount": 1812,
  "visibleMatchability": {
    "automatic": 1812
  },
  "reviewCount": 0
}
```

Regenerated sample fixture:

```json
{
  "opportunityCount": 1812,
  "archivedOpportunityCount": 243,
  "hiddenUpcomingOpportunityCount": 41,
  "sampleUserCount": 50,
  "statusTotals": {
    "eligible_active": 707,
    "likely_eligible": 12,
    "needs_information": 0,
    "manual_review": 0,
    "ineligible": 89881,
    "unavailable": 0
  }
}
```

## Automation Notes

The daily lifecycle/data-repair job should run after opportunity ingestion and normalization:

```sh
npm run matching:availability-reviews -- --write-dynamodb
npm run matching:archive-unavailable -- --write-dynamodb --unarchive-restored --archive-low-information
MATCHING_WRITE_FULL_OUTPUT=0 npm run matching:sample
```

Implementation details for automation:

- Use source fetch retry/backoff for HTTP 429, timeouts, and transient 5xx responses; wait and rerun before accepting unresolved availability.
- Do not archive `upcoming` records. They should stay unarchived but hidden from normal UI/matching surfaces.
- Only unarchive restored records when availability is clearly `active` or `rolling`; do not unarchive `upcoming` or `uncertain`.
- Archive low-information records only when the canonical record has no matchable detail source and remains uncertain or non-automatic after normalization.
- Preserve lifecycle metadata (`archivedAt`, `archiveReason`, `archiveDetails`, `lifecycleUpdatedAt`, `lifecycleUpdatedBy`) rather than deleting records.
