# Opportunity Lifecycle and Archiving

Unavailable opportunities should be archived, not deleted. Archived records stay in DynamoDB for auditability and future reactivation, but normal matching, admin database browsing, and public test-case fixtures should exclude them.

## Current Fields

Archived opportunities use these fields:

- `lifecycleStatus`: `archived`
- `archivedAt`: first archive timestamp
- `archiveReason`: currently `availability_unavailable`
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
4. Unarchive restored records only when the source clearly supports active, rolling, or upcoming availability.
5. Preserve archive/unarchive timestamps and reasons instead of deleting the record.

The existing script has a `--unarchive-restored` option for that future flow, but the default current workflow only archives unavailable records.
