# Contractor Directory Production Write Execution

The approved California contractor-directory consolidation and unmatched-directory resolution writes were executed on July 23, 2026.
They ran in the required order against AWS profile `retrofi-prod`, account `059310317821`, table `gbs-contractors`, and the existing contractor-source S3 bucket.
No API, frontend, recurring process, infrastructure deployment, or new contractor row was created.

## Approved Artifacts

The consolidation write used dry-run ID `directory-enrichment-20260723T181209453Z`.
Its reviewed dry-run report SHA-256 was `3eaf866fe5e18d3af7e533ec57771a9d16a2927ea862836fcef2ee31eff4e582`.
Its deterministic proposal hash was `b5e4c593f64f9285cd485db4d3a623c7cb05772871d34effe6e7c76d72ad24a7`.

The resolution write used dry-run ID `directory-resolution-20260723T185235786Z`.
Its reviewed dry-run report SHA-256 was `af1b2579d5c9646bf489b32c447484a258bf1fa8d70768703acad91552218e25`.
Its proposal artifact SHA-256 was `eb74e7b6b6dd70388d8de208f1a1168ba2c21007a45b66e4110d017280ff44f9`.
Its deterministic proposal content hash was `164c0c4febebee545646a54d596279e33d0bc887f4baee8941a6d4ffc49b99a8`.
Its unresolved-candidate artifact SHA-256 was `37f192ed81a4904a6b3afec8c1b0a1c3801ce3abe0aa2a3649db7e20fb7231bc`.

The retained CSLB source SHA-256 was `055f068649d67dde1168e56094b5c4e35b6a0556926705d52a18e08a7b8cab9b`.
Both writers verified their reviewed artifacts and refused changed inputs before mutation.

## Consolidation Write

The first write preserved the approved 1,228 contractor enrichment updates and 207,903 missing-only CSLB field patches.
The 1,228 enriched contractors are a subset of the 207,903 patched contractors, so the writer performed 207,903 conditional DynamoDB item updates rather than issuing redundant operations.
It inserted zero contractor rows and uploaded 16 reviewed source snapshots.

| Result | Count |
| --- | ---: |
| Approved contractor enrichments | 1,228 |
| Approved missing-only CSLB patches | 207,903 |
| Conditional contractor item updates | 207,903 |
| New contractor rows | 0 |
| Conflicts in the approved dry-run report | 4 |
| Failed writes | 0 |

The final consolidation write report SHA-256 is `183ca802b0efe50dc842cbe56f59a5c1b089c4650818ba20a29f724b00b3259a`.
It is stored at `s3://gbs-retrofi-contractor-source-data-059310317821-us-east-1/imports/enrichment/directory-enrichment-20260723T181209453Z/report.json`.

## Resolution Write

The second write processed all 52 approved existing-contractor updates and inserted zero contractor rows.
It verified the completed consolidation write report SHA-256 before applying any resolution update.

| Approved field | Approved contractor values |
| --- | ---: |
| `email` | 45 |
| `servesCommercial` | 27 |
| `programMemberships` | 48 |
| `serviceAreas` | 4 |
| `certifications` | 4 |

One approved email target conflicted with a different nonempty email added by the preceding consolidation write.
The conditional writer preserved the existing email, omitted the conflicting email evidence, and applied the contractor's other approved array fields.
The sanitized contractor token for that conflict is `32d542851c9b`.
This produced one conflicting field, zero skipped contractor updates, zero failed updates, and 52 updated contractors.
Of the 45 approved email values, 44 nonconflicting resolution values were verified after the write.

The writer also recorded six fields that already contained the approved value and 22 additive fields that were merged with values from the preceding write.
It retained 16 reviewed directory snapshots and 709 reviewed CSLB lookup snapshots.
The 59 unresolved or ambiguous entries, 114 inactive or unusable licenses, 3 unmapped licenses, and 2 noncontractor providers were not written.

The final resolution write report SHA-256 is `e8ad160b62b5d191b0c0c57a5c905bbb8fac0a1cdfeae179af996a9d446a797e`.
It is stored at `s3://gbs-retrofi-contractor-source-data-059310317821-us-east-1/imports/enrichment/directory-resolution-20260723T185235786Z/resolution-report.json`.

## Evidence Deduplication

Post-write verification found five semantically duplicate `enrichmentEvidence` entries where the two approved workflows described the same field and source with different matching metadata.
A bounded repair removed exactly those five duplicate entries with conditional updates.
It changed no email, CSLB-derived field, or `supportedRetrofitIds` value.

The deduplication report SHA-256 is `68308896ed58d2275ecbc6f8ed078124edd90f269c56611f2295b630d07df4a0`.
It is stored at `s3://gbs-retrofi-contractor-source-data-059310317821-us-east-1/imports/enrichment/directory-resolution-20260723T185235786Z/evidence-deduplication-report.json`.

## Final Verification

The final verifier scanned every contractor, rebuilt every protected field from the retained CSLB source and current classification mapping, checked the approved resolution field deltas, and checked every stored array for duplicates.

| Verification | Result |
| --- | ---: |
| Contractor count | 207,903 |
| New contractor rows | 0 |
| Protected CSLB or retrofit-field mismatches | 0 |
| Duplicate arrays | 0 |
| Existing emails overwritten | 0 |
| Current rows with an email | 249 |
| Unresolved candidates written | 0 |
| Failed verification checks | 0 |

Sanitized read-back tokens for the missing-only CSLB patch group are `665254263657`, `7f514311abf0`, `a7dd18588d17`, `2414811b6a7b`, and `a46f7e3d1768`.
Sanitized read-back tokens for the consolidation enrichment group are `808016a28aa2`, `2a0164f02bfb`, `07cd49b14bf0`, `e4e57bf9ebb0`, and `df39a18e94f5`.
Sanitized read-back tokens for the resolution enrichment group are `c40d0d288e31`, `7aea570254c8`, `32d542851c9b`, `6068df5b5769`, and `ccfbecc5034f`.
The S3 reports contain the corresponding field-presence and array-count summaries without exposing contractor identities.

The final verification report SHA-256 is `01123bcb3183be4c436027b4a68bf469cc1cdd7eacb13a5f77278c0b691b61aa`.
It passed every guard and is stored at `s3://gbs-retrofi-contractor-source-data-059310317821-us-east-1/imports/enrichment/directory-resolution-20260723T185235786Z/production-verification-report.json`.
