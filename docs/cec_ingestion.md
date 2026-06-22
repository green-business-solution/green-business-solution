# California Energy Commission Opportunity Ingestion

This project has a CEC solicitation ingestion script:

```bash
npm run gather:cec
```

The command runs `scripts/gather-cec-opportunities.mjs`. It writes local JSON artifacts under
`var/opportunity-ingestion/cec/`, which is intentionally ignored by Git.

This importer is registered in `docs/ingestion_process_registry.md`. Every written record must include
the required source/origin metadata contract from that registry.

## Current Behavior

The script uses CEC's official sitemap to discover solicitation detail pages under:

```text
https://www.energy.ca.gov/solicitations/
```

It then fetches each solicitation detail page and extracts:

- solicitation title
- solicitation number, when present
- solicitation type
- CEC source status
- normalized status
- division
- program
- release date
- submission deadline
- questions deadline
- purpose text
- application portal or submission method when present
- linked solicitation files
- source evidence
- four matching parameters for business-profile matching

The script does not yet download or parse attached DOCX, XLSX, or PDF solicitation manuals.

## Commands

Run a local full CEC ingestion:

```bash
npm run gather:cec
```

Run a small local smoke test:

```bash
npm run gather:cec -- --limit 5 --request-delay-ms 0
```

Validate and write records into the AWS DynamoDB opportunity-candidates table:

```bash
npm run gather:cec:aws
```

## Matching Parameters

Each CEC record includes `matchingParameters` with:

- `zipCode`: defaults to California statewide or project-specific because CEC detail pages usually do not state ZIP-level eligibility.
- `utilityProvider`: defaults to `Any` because CEC is a state funding source, not a utility-territory program.
- `businessClassification`: inferred from solicitation title, purpose, division, program, and solicitation type.
- `squareFootage`: marked `not_specified` unless square-footage language is explicitly found on the detail page.

The matcher also stores:

- `technologyTags`
- `deadlineHasPassed`
- `isCurrentlyMatchable`
- `matchingWarnings`

`isCurrentlyMatchable` is false when the source status is not open/current or when the submission deadline has already passed, even if CEC's displayed status still says active.

## DynamoDB Storage

CEC records are written to:

```text
gbs-opportunity-candidates
```

The primary key remains:

```text
opportunityId = SOURCE_CA_ENERGY_COMMISSION:<externalIdType>:<externalId>
```

Representative CEC fields include:

- `sourceKey`: `SOURCE_CA_ENERGY_COMMISSION`
- `externalIdType`: `cec_solicitation_number` or `cec_url_hash`
- `canonicalTitle`
- `status`
- `sourceStatus`
- `category`
- `programType`
- `solicitationType`
- `state`
- `summary`
- `division`
- `program`
- `releaseDate`
- `deadlineDate`
- `questionsDeadline`
- `submissionMethod`
- `applicationUrl`
- `documents`
- `technologies`
- `matchingParameters`
- `eligibilityRules`
- `cec`
- `evidence`
- `dataQuality`

## Current Limitations

- Attached solicitation manuals are not parsed yet.
- Exact award amounts, eligible applicant lists, cost-share percentages, and detailed eligibility may live inside attached files.
- Business classification is currently inferred with conservative keyword rules and should be human-reviewed.
- ZIP-code eligibility is represented as California statewide/project-specific, not as exact ZIP lists.
- Closed, awarded, cancelled, and deadline-expired records are stored for auditability but marked not currently matchable.
