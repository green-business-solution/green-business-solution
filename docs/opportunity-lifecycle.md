# Opportunity Lifecycle and Archiving

Unavailable opportunities should be archived, not deleted. Archived records stay in DynamoDB for auditability and future reactivation, but normal matching, admin database browsing, and public test-case fixtures should exclude them.

## Current Fields

Archived opportunities use these fields:

- `lifecycleStatus`: `archived`
- `archivedAt`: first archive timestamp
- `archiveReason`: currently `availability_unavailable` or `low_information_update_record`
- `archiveDetails`: normalized availability status, reasons, deadlines, and verification timestamp
- `lifecycleUpdatedAt`: last lifecycle decision timestamp
- `lifecycleUpdatedBy`: automation identifier

## Current Command

Run a dry run:

```sh
npm run matching:archive-unavailable
```

Write archive updates to DynamoDB:

```sh
npm run matching:archive-unavailable -- --write-dynamodb
```

Archive low-information DSIRE changelog fragments at the same time:

```sh
npm run matching:archive-unavailable -- --write-dynamodb --archive-low-information
```

Upcoming opportunities are not archived by this command. They are hidden from normal UI and fixture surfaces, but remain active lifecycle records so the daily availability repair job can reclassify them as `active` or `rolling` when the source opening window arrives.

The command writes:

- `data/opportunity_archive_report.json`
- `data/opportunity_archive_report.md`

After archiving, regenerate sample fixtures:

```sh
npm run matching:sample
```

## Future Automation Note

In a future version, this lifecycle check should run automatically after DSIRE ingestion and normalization. That scheduled job should:

1. Recompute normalized availability for every current opportunity.
2. Archive records that become unavailable.
3. Check currently archived records to see whether the source has reopened, renewed, or become active again.
4. Keep `upcoming` records hidden but unarchived, then reclassify them as active or rolling once the source supports it.
5. Unarchive restored records only when the source clearly supports active or rolling availability.
6. Archive DSIRE update-only records with no detail page or matchable source corpus as `low_information_update_record`.
7. Preserve archive/unarchive timestamps and reasons instead of deleting the record.

The daily lifecycle command should be:

```sh
npm run matching:archive-unavailable -- --write-dynamodb --unarchive-restored --archive-low-information
```

The existing script has a `--unarchive-restored` option for that future flow, but the default current workflow only archives unavailable records.
