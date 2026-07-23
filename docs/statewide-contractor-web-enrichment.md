# Statewide Contractor Web Enrichment

This document describes the one-time contractor web-enrichment workflow implemented by `scripts/enrich-contractor-web.mjs`.
The live `gbs-contractors` table is authoritative.
The workflow does not recreate the CSLB import, official-directory consolidation, unmatched-directory resolution, or CSLB missing-field patches.

## Scope

The usable contractor set is intentionally conservative.
A contractor is eligible only when `licenseStatus` equals `CLEAR` exactly and `supportedRetrofitIds` is a nonempty array.
Every other status is skipped and counted in the report.

The workflow may propose only these missing fields:

- `email`
- `servesCommercial`
- `servesResidential`
- `serviceAreas`
- `enrichmentEvidence`

An existing scalar value, including `UNKNOWN`, is treated as filled.
An existing nonempty `serviceAreas` array is treated as filled.
Existing emails, customer-type values, service areas, program memberships, certifications, and evidence are never replaced.
The workflow cannot propose changes to license fields, classifications, or `supportedRetrofitIds`.
It never infers program memberships or certifications from a contractor website.

## Public Sources

The workflow uses only free public data:

- The retained CSLB master file in the private contractor-source bucket supplies business names and the `BUS-NAME-2` and `FullBusinessName` aliases.
- The exact reviewed official-directory snapshots from `directory-enrichment-20260723T181209453Z` supply previously matched website seeds.
- The current California OpenStreetMap extract from Geofabrik supplies exact-match website and email-domain seeds.
- The United States Census Bureau 2025 California Gazetteer files supply the official city and county reference lists.
- Verified first-party contractor websites supply public business emails and explicit service statements.

The OpenStreetMap source is checksum-verified against its published MD5 before use.
The filtered local OSM artifact and the Census source hashes are recorded in the run manifest.
No paid API, search-result page, or generated email address is used.

## Identity And Domain Verification

The pipeline builds an identity record from the current contractor row and retained CSLB aliases.
Legal suffixes are removed only when candidate domains are generated.
The original business names remain unchanged.

OpenStreetMap records are matched in this order:

1. Exact normalized phone.
2. Exact normalized business name plus ZIP.
3. Exact normalized business name plus street address.
4. Unique and nonconflicting exact business name plus city.

No fuzzy-only OSM match is accepted.

Reviewed official-directory domains are tried first.
OpenStreetMap domains are tried second.
For unresolved identities, fast mode generates no more than 12 candidates from business names, aliases, useful trade terms, city variants, and the `.com`, `.net`, `.org`, and `.co` endings.
Deep mode supports up to 40 candidates and eight pages but is not part of the initial pilot.

A candidate must resolve in DNS and return usable HTML.
The first-party page must contain an exact CSLB license number, an exact CSLB phone number, or a strong nonconflicting combination of business name, location, and compatible trade language.
Name similarity alone is never enough.
A conflicting license number, parked domain, or unrelated identity rejects the candidate.

## Bounded Crawl And Extraction

The crawler checks HTTPS before HTTP, respects `robots.txt`, permits one active request per domain, uses bounded global concurrency, applies an eight-second request timeout, and retries at most once.
Fast mode reads the homepage and at most three relevant internal contact, service, about, location, or service-area pages.
It does not crawl social networks, submit forms, execute downloads, or retain full HTML in the durable artifacts.

Email proposals must be visible text or a `mailto:` value.
Placeholder, developer, privacy, unrelated third-party, image filename, and marketing-agency contacts are rejected.
The workflow prefers general business addresses and addresses on the verified first-party domain.

Customer-type proposals require explicit service context.
The pipeline does not infer commercial or residential work from CSLB classifications.
Service areas require explicit coverage language and are normalized against the official California city and county list.
The contractor mailing address is never treated as a service area.

Every proposed field includes the source URL, retrieval time, matching method, bounded supporting text, and source value.
Website HTML is reduced to content hashes and bounded evidence metadata in the retained artifacts.

## Pilot Command

Run the mandatory 5,000-contractor fast pilot with:

```sh
npm run contractors:web-enrich -- \
  --pilot \
  --mode fast \
  --profile retrofi-prod \
  --pilot-size 5000 \
  --run-id "<stable-run-id>"
```

Use `--resume` with the same run ID after an interrupted run.
Use `--upload` only after the local report, proposals, evidence, and hashes have been inspected.
Pilot upload writes only six review artifacts to the existing private contractor-source S3 bucket.
It never writes to DynamoDB.

The report records every selected contractor outcome, all skipped license-status counts, source and artifact hashes, domain dispositions, discovery methods, field counts, coverage, sanitized examples, and the audit gate.
The audit selects at least 400 accepted domains when at least 400 accepted domains exist.
Its deterministic evidence checks are a review aid, not a substitute for the required human accuracy review.

## Review Gate

The pilot report always has `statewideWriteAuthorized: false` and `status: AWAITING_REVIEW`.
The statewide run must not begin until the pilot has been explicitly reviewed, verified-domain precision is at least 98 percent, no systemic identity problem is present, and no major source or parser failure is present.

The full-scope command requires the exact reviewed pilot report path, its SHA-256 hash, and the pilot run ID:

```sh
npm run contractors:web-enrich -- \
  --full \
  --mode fast \
  --profile retrofi-prod \
  --reviewed-pilot-report "<pilot-report-path>" \
  --approved-pilot-report-sha256 "<pilot-report-sha256>" \
  --approval "<pilot-run-id>"
```

The current implementation keeps DynamoDB write mode unavailable even after those full-scope read guards.
Passing `--write` always fails closed.
A future reviewed production-write change must add conditional, idempotent `UpdateItem` behavior and receive separate approval.

## July 23, 2026 Pilot

The completed fast pilot run ID is `web-enrichment-pilot-fast-20260723T205700Z`.
It read 207,903 live contractors, classified 192,900 exact `CLEAR` rows with mapped retrofits as usable, skipped 15,003 other rows, and processed a deterministic 5,000-contractor sample.
The complete report retains every skipped status and count.

The pilot produced these final measured results after strict identity and evidence normalization:

- 528 sampled contractors had an exact OpenStreetMap domain seed.
- 680 domains were verified: 365 from candidate generation, 253 from OpenStreetMap, and 62 from reviewed official directories.
- 641 candidate attempts were ambiguous, 45,806 were rejected, 327 contractors ended with an unreachable website, and 11 had no candidate.
- 680 verified websites yielded 2,344 bounded pages.
- 608 contractors received at least one missing-field proposal.
- The proposals contain 310 emails, 356 commercial indicators, 382 residential indicators, and 302 service-area arrays.
- The 400-domain deterministic stronger-evidence audit produced a 98.0 percent lower-bound domain precision with 392 `CORRECT` and 8 `INCONCLUSIVE` verdicts.
- Every retained audited field had complete bounded evidence support.
- Field lower bounds, which count proposals on `INCONCLUSIVE` domains as not correct, were 97.19 percent for email, 98.16 percent for commercial indicators, 97.84 percent for residential indicators, and 97.66 percent for service areas.
- The complete crawl and finalization took 1,600 seconds.
- DynamoDB updates applied: 0.

The local and S3 validations found 5,000 outcomes, 608 unique proposal IDs, no protected proposal fields, no malformed retained emails, no unsupported retained field evidence, no duplicate service-area arrays, and no duplicate evidence arrays.
All six uploaded S3 object checksums match their final local artifacts.
The live `gbs-contractors` item count remained 207,903.

The final review hashes are:

```text
manifest.json   2cc8786761b83d5e9367153bc79e4421c27382c4c51af50e257327ffd5e13383
report.json     9af997e4cfd3f3f37b9cfd10adde222478931c947a1448e38e7123989dcdea0f
audit.json      4fc64521508b65776f439d9976cad39cad74f6f075e4dc91bfded9cf187939ec
proposals.jsonl 72d4cb3c04c4bc12604cf19ed152b83526478744065d30803b695044e3ece192
```

The pilot gate remains `AWAITING_REVIEW`, requires human review, and has `statewideWriteAuthorized: false`.
No full statewide run or DynamoDB update was executed.
Deep-mode benefit remains unmeasured because no reviewed deep follow-up pilot was run.

## S3 Artifacts

An approved pilot upload uses:

```text
raw/web-enrichment/<run-id>/evidence.jsonl
raw/web-enrichment/<run-id>/outcomes.jsonl
imports/web-enrichment/<run-id>/manifest.json
imports/web-enrichment/<run-id>/proposals.jsonl
imports/web-enrichment/<run-id>/report.json
imports/web-enrichment/<run-id>/audit.json
```

Uploads use SHA-256 checksums and refuse to replace a different object at the same key.
Raw evidence and proposals remain in the existing private contractor-source bucket.
Only sanitized summaries belong in GitHub documentation.

## Operational Safety

Confirm AWS profile `retrofi-prod` and account `059310317821` before every run.
Do not deploy application or infrastructure resources for this workflow.
Do not run prior contractor import or directory workflows as part of web enrichment.
Do not start a statewide run or any DynamoDB update until the pilot report is explicitly approved.
