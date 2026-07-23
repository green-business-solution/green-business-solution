# Contractor Web Enrichment Manual Review Bundle

This directory contains the manual-review bundle for the complete 400-entry automated audit sample selected by pilot run `web-enrichment-pilot-fast-20260723T205700Z`.
The bundle resolves each audit token to its original contractor without selecting a new sample or rerunning the pilot.

This bundle is prepared for human review, but it does not constitute human verification.
The `automatedAuditVerdict` values are retained automated audit outputs.

## Contents

- `manual-review-sample.jsonl` contains one JSON object per audited contractor and domain.
- The file contains 400 rows, 400 unique contractors, and 400 unique contractor/domain pairs.
- The row order is the original order of `audit.json.entries`.
- Of the 400 rows, 360 contain proposed field values.
- The retained automated verdicts are 392 `CORRECT` and 8 `INCONCLUSIVE`.

## Row Schema

| Field | Description |
| --- | --- |
| `contractorId` | Authoritative `gbs-contractors` primary key. |
| `licenseNumber` | CSLB license number from the authoritative contractor row. |
| `businessName` | CSLB-derived business name from the authoritative contractor row. |
| `businessNameAliases` | Sorted unique CSLB name variants used by the pilot identity matcher. |
| `phone` | CSLB-derived public business phone from the authoritative contractor row. |
| `businessAddress` | CSLB-derived public business address from the authoritative contractor row. |
| `licenseClassifications` | CSLB-derived classification codes from the authoritative contractor row. |
| `domain` | Verified domain retained in the immutable pilot result. |
| `finalWebsiteUrl` | Final URL of the first reviewed page retained in the pilot result. |
| `discoveryMethod` | Pilot discovery method for the domain. |
| `domainDisposition` | Pilot domain disposition. |
| `identityVerification` | Complete retained automated identity-verification result and signals. |
| `pagesReviewed` | Sanitized retained page metadata, including URL, retrieval time, status, content hash, email-candidate count, and text length. |
| `proposedFields` | Exact proposed field values with `enrichmentEvidence` separated into `fieldEvidence`. |
| `fieldEvidence` | Retained `enrichmentEvidence` entries supporting the proposed fields, with credential-bearing URL queries removed. |
| `automatedAuditVerdict` | Exact automated audit verdict from the original audit entry. |

For a row with evidence, `{ ...proposedFields, enrichmentEvidence: fieldEvidence }` reconstructs the immutable pilot proposal except for the documented URL-query sanitization.
Rows without a proposal contain an empty `proposedFields` object and an empty `fieldEvidence` array.

## Resolution Method

Each `contractorIdToken` was matched to exactly one retained result using the token and audited domain together.
The token was recomputed from the resolved `contractorId` and compared with the original audit token.
The audited domain, discovery method, identity signals, proposal field list, proposal values, proposal evidence, and verified domain were compared with the immutable pilot artifacts.
The complete proposals were compared before credential-bearing URL queries were removed from the review copy.
Public contractor identity fields were read from the live `gbs-contractors` table with consistent `BatchGetItem` reads.
CSLB name aliases were read from the exact retained CSLB source object and associated by license number.

## Source Integrity

The local pilot artifacts matched both the pilot manifest and the corresponding private S3 objects during bundle creation.

| Source | SHA-256 | Bytes |
| --- | --- | ---: |
| `audit.json` | `4fc64521508b65776f439d9976cad39cad74f6f075e4dc91bfded9cf187939ec` | 323,229 |
| `manifest.json` | `2cc8786761b83d5e9367153bc79e4421c27382c4c51af50e257327ffd5e13383` | 3,833 |
| `proposals.jsonl` | `72d4cb3c04c4bc12604cf19ed152b83526478744065d30803b695044e3ece192` | 1,810,929 |
| `raw-evidence.jsonl` | `adbd91ea120f40a56dd2d9d45824ca6970fd8d7bbc2a97f91387b9da0355e3da` | 1,165,237 |
| `report.json` | `9af997e4cfd3f3f37b9cfd10adde222478931c947a1448e38e7123989dcdea0f` | 65,040 |
| `results.jsonl` | `7a8cf9d03f12c1f79e39a857af0f19ee89f4495de1d1005b2fb9e1de9a70a7ef` | 8,636,210 |
| `raw/cslb/2026-07-23/MasterLicenseData.csv` | `055f068649d67dde1168e56094b5c4e35b6a0556926705d52a18e08a7b8cab9b` | 77,756,707 |
| `manual-review-sample.jsonl` | `45f9281129e58042319df19f88007c69b8f8efa3499b8d5ef3ebd6aab5422d9a` | 1,453,953 |

The pilot artifact keys are recorded in `manifest.json` under `s3Keys`.
The authoritative contractor table was `gbs-contractors` in AWS account `059310317821`.
Its reported item count remained 207,903 during bundle creation.

## Safety and Scope

The bundle creation performed zero DynamoDB writes and zero pilot reruns.
Its only DynamoDB operations were `DescribeTable` and consistent `BatchGetItem` reads.
Its S3 operations were read-only `GetObject` requests.
No existing pilot artifact was modified.
One expired presigned S3 source URL appeared in 39 retained evidence entries across 24 contractors.
Its credential-bearing query string was removed while its source host and path were preserved.
The bundle excludes AWS credentials, cookies, private customer information, and full website HTML.
