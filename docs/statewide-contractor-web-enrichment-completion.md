# Statewide Contractor Web Enrichment Completion

The proposal-only statewide run completed the fast pass for every eligible California contractor and made zero DynamoDB writes.
The optional deep pass rechecked 9,500 prioritized contractors and accepted 602 better outcomes based on a higher disposition rank or, at equal rank, more proposal keys before the user directed the run to finalize.
This document is a sanitized automated execution record, not human verification and not authorization to write any proposal to production.

## Run Identity

| Item | Value |
| --- | --- |
| Branch | `codex/statewide-contractor-web-enrichment-full` |
| Starting commit | `6371cab78756366fda38a31ce5be1989bae40a04` |
| Final implementation commit | `9b6d02fc6659f3d0840f1e85c67b43598bc405d4` |
| Run ID | `web-enrichment-statewide-fast-20260724T190000Z` |
| Script version | `1.4.1` |
| Scope and mode | `full`, `fast`, proposal-only |
| Started | `2026-07-24T18:59:27.069Z` |
| Completed | `2026-07-25T07:47:27.989Z` |
| Wall-clock runtime | 46,081 seconds, or 12 hours, 48 minutes, and 1 second |
| AWS account | `059310317821` |
| Contractor table read | `gbs-contractors` |
| Contractor-source bucket | `gbs-retrofi-contractor-source-data-059310317821-us-east-1` |

The run used the approved pilot report SHA-256 `9af997e4cfd3f3f37b9cfd10adde222478931c947a1448e38e7123989dcdea0f`.
It used the approved manual-review bundle SHA-256 `45f9281129e58042319df19f88007c69b8f8efa3499b8d5ef3ebd6aab5422d9a`.
Neither approved pilot artifact was changed.

## Implementation Commits

The implementation history after the starting commit is:

| Commit | Purpose |
| --- | --- |
| `5d49040` | Harden statewide contractor web enrichment and add the 30-finding regression fixture. |
| `d44680b` | Quarantine reviewed license transitions. |
| `021092a` | Fail closed on cached transition reviews. |
| `05e99c3` | Scale statewide web enrichment safely. |
| `631e484` | Make checkpoints and append-only recovery state crash-safe. |
| `043bc36` | Keep processing inside the runtime and finalization budgets. |
| `b557863` | Resolve web candidates through address records. |
| `6253a5f` | Avoid blocking DNS resolver starvation. |
| `590fd1d` | Harden statewide artifacts, validation, and resume behavior. |
| `4c062f6` | Close crawler connection pools after each run. |
| `9b6d02f` | Preserve safe concurrency under network timeouts. |

The implementation retained the pilot strategy while strengthening current-site identity verification, malformed-email rejection, explicit customer-type extraction, longest-match-first service-area extraction, license-transition quarantine, bounded concurrency, crash recovery, artifact validation, and fail-closed write protection.

## Tests And Checks

The CI selector identified `api`, `web`, `scripts`, and `audit` as the relevant check groups.
The initial implementation slice passed `npm test` with 648 tests across 85 files, the API check, typecheck, the repository build, and both production dependency audits with zero vulnerabilities.
The final hardening state passed these checks:

- `npx vitest run scripts/contractor-web-enrichment-core.test.mjs scripts/contractor-web-enrichment-run-state.test.mjs scripts/enrich-contractor-web.test.mjs` passed 74 tests across 3 files.
- `npm test` passed 670 tests across 85 files.
- `npm run typecheck` passed.
- `npm audit --omit=dev --audit-level=high` passed with zero production vulnerabilities.
- `npm audit --workspace @gbs/api --omit=dev --audit-level=high` passed with zero API production vulnerabilities.
- The crawler syntax check, API syntax check, and `git diff --check` passed.
- The final statewide validation artifact has status `PASS` with no failures.

After the later connection-pool change, the 74 focused tests, typecheck, root production audit, crawler syntax check, and diff check were rerun and passed.
The repository build was proven on the initial implementation slice and was not rerun after the later script-only hardening.
No application or infrastructure stack was deployed.

## Regression And Preflight Gate

The committed regression fixture contains exactly 30 findings.
Every finding passed its focused regression assertion before statewide processing.
The table is intentionally phrased without contractor identities, contact data, or domains.

| Finding | Regression behavior | Result |
| ---: | --- | --- |
| 1 | Reject a repurposed wrong-country domain despite a historical seed. | Pass |
| 2 | Reject an email whose local part is contaminated by a navigation token. | Pass |
| 3 | Reject an email whose local part is contaminated by form labels. | Pass |
| 4 | Do not infer commercial service from habitat-restoration wording. | Pass |
| 5 | Do not infer commercial service from generic market-demand wording. | Pass |
| 6 | Do not emit a city token that is only a person's name. | Pass |
| 7 | Do not emit a location token that appears only in the business name. | Pass |
| 8 | Do not interpret the common noun `Industry` as a service area in the first audited context. | Pass |
| 9 | Do not interpret the common noun `Industry` as a service area in the second audited context. | Pass |
| 10 | Do not interpret the material name `Clay` as a service area. | Pass |
| 11 | Preserve `Carson City` instead of shortening it to `Carson`. | Pass |
| 12 | Preserve `Carson Valley` instead of shortening it to `Carson`. | Pass |
| 13 | Preserve `Corona del Mar` in the first audited context. | Pass |
| 14 | Preserve `Corona del Mar` in the second audited context. | Pass |
| 15 | Preserve `Woodland Hills` in the first audited context. | Pass |
| 16 | Preserve `Woodland Hills` in the second audited context. | Pass |
| 17 | Do not convert a named city district into a different city with the same name. | Pass |
| 18 | Preserve `Paradise Valley` instead of shortening it to `Paradise`. | Pass |
| 19 | Preserve `Antelope Valley` instead of shortening it to `Antelope`. | Pass |
| 20 | Preserve `San Fernando Valley` in the first audited context. | Pass |
| 21 | Preserve `San Fernando Valley` in the second audited context. | Pass |
| 22 | Preserve `San Fernando Valley` in the third audited context. | Pass |
| 23 | Preserve `San Fernando Valley` in the fourth audited context. | Pass |
| 24 | Preserve `San Fernando Valley` in the fifth audited context. | Pass |
| 25 | Preserve `San Gabriel Valley` instead of shortening it to `San Gabriel`. | Pass |
| 26 | Preserve `Coachella Valley` instead of shortening it to `Coachella`. | Pass |
| 27 | Preserve `Playa Vista` instead of shortening it to `Vista`. | Pass |
| 28 | Preserve `Portola Hills` instead of shortening it to `Portola`. | Pass |
| 29 | Quarantine the first known different-license website as `LICENSE_TRANSITION_REVIEW` with no proposal. | Pass |
| 30 | Quarantine the second known different-license website as `LICENSE_TRANSITION_REVIEW` with no proposal. | Pass |

The final reviewed preflight reprocessed 37 unique targets assembled from the 30 findings and the eight original inconclusive audit entries.
One contractor supplied two of the 30 findings, so the 30 finding records plus eight inconclusive entries formed 37 unique contractor targets.
It produced 30 verified domains, 3 ambiguous domains, 2 license-transition quarantines, 1 no-verified-domain outcome, and 1 unreachable outcome.
The preflight proposed fields for 30 contractors and passed every validation check with zero DynamoDB writes.
All eight original inconclusive entries were reprocessed to verified current domains, with seven at Tier C and one at Tier A.
A separate two-target sensitive-evidence preflight verified both domains and passed credential-bearing URL, evidence, protected-field, and write-safety checks.
A separate one-target long-keepalive preflight passed and confirmed that connection-pool shutdown did not leave the process running after finalization.
The preflight gate found no major source or parser failure.

The final 37-target preflight report SHA-256 is `46b45af6b75aba4b742d86fa3be412e32502580045df56300bf41fadcf734232`.
Its validation SHA-256 is `17e8eb2b49eb8ddc6f4c734789f7ceb9c13ac16fe37b12d3ac8dd31b05e0172d`.
The sensitive-evidence report and validation SHA-256 values are `b59d1ab8a2a2beb7efce9dcd17eafcfc74e7bc696a290a6b5c9473224c782b69` and `5385ac1e31733bb448b4df04f54a347549dc0f1b914b287c6ee0b361f20a4da4`.
The keepalive report and validation SHA-256 values are `dafbe673cbbf53506cdb47dc6d4734487772d337426dc690f47c4a709c9a7158` and `6873f39fb2372c592998be0c1d66aae6857cec80ed16a80f9f6df6118ccb2b77`.

## Held-Out Canary

The final held-out canary used exactly 1,000 unique contractors that were not in the original 5,000-contractor pilot.
Its deterministic selected-contractor SHA-256 was `900833b87968f493dd93bab46976cd870eb38e3753408ac25ccc794e80fc79f7`.
All 1,000 selected contractors completed and zero remained.
The final canary report SHA-256 is `fab209834e2331f41a4a97d69cf954238d04989d1161d7a868afeb692d7b6ad5`.
Its validation SHA-256 is `c6e9c485f3883a29d8d7f5ea64965eee71fe8fd9ba9614b7629eec1e1ef42860`.
Its proposals SHA-256 is `2d9861ba264ac1a0faea50648df27b596db00ee27eaba466d0d074d533ebbe3f`.

| Canary measure | Count |
| --- | ---: |
| Verified domains | 121 |
| Ambiguous terminal outcomes | 137 |
| Unreachable terminal outcomes | 93 |
| License-transition quarantines | 1 |
| No-verified-domain terminal outcomes | 648 |
| Contractor proposals | 110 |
| Email proposals | 78 |
| Commercial proposals | 58 |
| Residential proposals | 64 |
| Service-area array proposals | 53 |
| Service-area values | 146 |
| Websites crawled | 121 |
| Pages crawled | 340 |

The canary validation status was `PASS`.
It found zero protected-field proposals, malformed retained emails, historical-seed-only accepted domains, conflicting-license proposals, credential-bearing URLs, duplicate proposals, duplicate evidence values, duplicate service-area values, or proposals missing field evidence.
Its 121 accepted domains all received a deterministic `CORRECT` verdict with complete bounded field evidence, but the automated sample was below the statewide gate's 400-entry sample requirement.
The canary remained `AWAITING_REVIEW`, authorized no statewide write, and made zero DynamoDB writes.
This automated result is not human verification.

## Statewide Scope And Outcome Accounting

| Scope measure | Count |
| --- | ---: |
| Live contractors | 207,903 |
| Eligible contractors with exact `CLEAR` status and at least one supported retrofit | 192,900 |
| Eligible contractors fully processed in the fast pass | 192,900 |
| Eligible contractors remaining | 0 |
| Contractors skipped by exact status | 15,003 |
| Total contractor outcomes | 207,903 |
| Fast-pass completion | 100% of eligible contractors |

The exact eligibility rule was intentionally conservative.
Only rows with `licenseStatus` exactly equal to `CLEAR` and a nonempty `supportedRetrofitIds` array were crawled.
All other live rows received `SKIPPED_LICENSE_STATUS` accounting without substantial crawl work.

<details>
<summary>Complete skippedStatusCounts breakdown, totaling 15,003 contractors</summary>

| Exact license status | Count |
| --- | ---: |
| `Contr Bond Susp` | 4799 |
| `CLEAR \| WC Susp Pending` | 3137 |
| `Work Comp Susp` | 2529 |
| `Liab Ins Susp` | 460 |
| `CLEAR \| Renewal Recived` | 415 |
| `CLEAR \| Pending Case/CIT` | 404 |
| `CLEAR \| 7073E Probation` | 335 |
| `CLEAR \| DISC Bond Filed` | 280 |
| `Susp - No Qualifier` | 207 |
| `Family Sup Susp` | 199 |
| `SOS Suspension` | 178 |
| `CLEAR \| Pending IFS` | 164 |
| `CLEAR \| FAM Sup Tmp Lic` | 163 |
| `Judgement Susp` | 106 |
| `Contr Bond Susp \| WC Susp Pending` | 103 |
| `CLEAR \| BOND Pay Pending` | 96 |
| `Out Liab Susp` | 94 |
| `BOND Pay Susp` | 93 |
| `CLEAR \| Class Removal Pending` | 91 |
| `EMP/WK Bnd Susp` | 85 |
| `JDG Entity Susp` | 81 |
| `CLEAR \| Liability Pend` | 69 |
| `CLEAR \| Bond Pay Entity Pending` | 65 |
| `CLEAR \| Pending Canc` | 56 |
| `Liab Ins Susp \| WC Susp Pending` | 55 |
| `CLEAR \| Judgement Pend` | 54 |
| `QUAL Bond SUSP` | 49 |
| `CLEAR \| Pending Case/CIT\| DISC Bond Filed` | 34 |
| `CLEAR \| LIC-Cont in eff` | 27 |
| `BND Pay EN Susp` | 25 |
| `CLEAR \| SOS Problem` | 23 |
| `CLEAR \| O/L Entity Pending` | 21 |
| `O/L Entity Susp` | 21 |
| `CLEAR \| Renew Inactive only` | 20 |
| `Contr Bond Susp \| BOND Pay Pending` | 20 |
| `Contr Bond Susp \| Pending Canc` | 20 |
| `Work Comp Susp \| Pending Canc` | 17 |
| `CLEAR \| Entity Susp PND` | 16 |
| `Contr Bond Susp \| Pending Case/CIT` | 16 |
| `Susp - No Qualifier \| WC Susp Pending` | 13 |
| `Contr Bond Susp \| 7073E Probation` | 11 |
| `CLEAR \| Blanket Bond On File` | 10 |
| `Discp Bond SUSP` | 10 |
| `CLEAR \| Pending Case/CIT\| BOND Pay Pending` | 9 |
| `CLEAR \| Pending Case/CIT\| WC Susp Pending` | 9 |
| `Out Liab Susp \| Liability Pend` | 9 |
| `BOND Pay Susp \| Pending Case/CIT` | 8 |
| `Work Comp Susp \| Pending IFS` | 8 |
| `CLEAR \| 7073E Probation\| DISC Bond Filed` | 7 |
| `Contr Bond Susp \| Bond Pay Entity Pending` | 7 |
| `Contr Bond Susp \| FAM Sup Tmp Lic` | 7 |
| `CLEAR \| BOND Pay Pending\| WC Susp Pending` | 6 |
| `CLEAR \| DISC Bond Filed\| WC Susp Pending` | 6 |
| `Contr Bond Susp \| Renewal Recived` | 6 |
| `Work Comp Susp \| 7073E Probation` | 6 |
| `Citation Susp` | 5 |
| `CLEAR \| Pending IFS\| WC Susp Pending` | 5 |
| `CLEAR \| WC Susp Pending\| FAM Sup Tmp Lic` | 5 |
| `Contr Bond Susp \| Liability Pend` | 5 |
| `Work Comp Susp \| Liability Pend` | 5 |
| `Work Comp Susp \| Pending Case/CIT` | 5 |
| `Work Comp Susp \| Renewal Recived` | 5 |
| `ARB Suspension` | 4 |
| `CLEAR \| 7073E Probation\| WC Susp Pending` | 4 |
| `CLEAR \| WC Susp Pending\| Renewal Recived` | 4 |
| `Contr Bond Susp \| DISC Bond Filed` | 4 |
| `J V Entity Susp` | 4 |
| `SOS Suspension \| WC Susp Pending` | 4 |
| `Susp - No Qualifier \| Pending Case/CIT` | 4 |
| `Work Comp Susp \| BOND Pay Pending` | 4 |
| `BOND Pay Susp \| BOND Pay Pending` | 3 |
| `Citation Susp \| BOND Pay Pending` | 3 |
| `CLEAR \| Class Removal Pending\| Pending IFS` | 3 |
| `CLEAR \| DISC Bond Filed\| Pending Case/CIT` | 3 |
| `CLEAR \| FAM Sup Tmp Lic\| 7073E Probation` | 3 |
| `Contr Bond Susp \| Judgement Pend` | 3 |
| `Contr Bond Susp \| Pending IFS` | 3 |
| `EMP/WK Bnd Susp \| WC Susp Pending` | 3 |
| `Family Sup Susp \| DISC Bond Filed` | 3 |
| `Judgement Susp \| Pending Case/CIT` | 3 |
| `QUAL Bond SUSP \| WC Susp Pending` | 3 |
| `Work Comp Susp \| FAM Sup Tmp Lic` | 3 |
| `ARB Entity Susp` | 2 |
| `BOND Pay Susp \| FAM Sup Tmp Lic` | 2 |
| `BOND Pay Susp \| WC Susp Pending` | 2 |
| `CLEAR \| 7073E Probation\| FAM Sup Tmp Lic` | 2 |
| `CLEAR \| 7073E Probation\| Pending Case/CIT` | 2 |
| `CLEAR \| Class Removal Pending\| WC Susp Pending` | 2 |
| `CLEAR \| DISC Bond Filed\| WC Susp Pending\| BOND Pay Pending` | 2 |
| `CLEAR \| Pending Case/CIT\| Bond Pay Entity Pending` | 2 |
| `CLEAR \| Pending Case/CIT\| DISC Bond Filed\| WC Susp Pending` | 2 |
| `CLEAR \| WC Susp Pending\| Pending Canc` | 2 |
| `Contr Bond Susp \| Entity Susp PND` | 2 |
| `Discp Bond SUSP \| Pending Case/CIT` | 2 |
| `Family Sup Susp \| 7073E Probation` | 2 |
| `Family Sup Susp \| WC Susp Pending` | 2 |
| `Judgement Susp \| BOND Pay Pending` | 2 |
| `Judgement Susp \| WC Susp Pending` | 2 |
| `Liab Ins Susp \| Pending Canc` | 2 |
| `Liab Ins Susp \| Pending IFS` | 2 |
| `Liab Ins Susp \| Pending IFS\| WC Susp Pending` | 2 |
| `Out Liab Susp \| Pending Case/CIT` | 2 |
| `Work Comp Susp \| Bond Pay Entity Pending` | 2 |
| `Work Comp Susp \| Class Removal Pending` | 2 |
| `Work Comp Susp \| Judgement Pend` | 2 |
| `ARB Entity Susp \| WC Susp Pending` | 1 |
| `BND Pay EN Susp \| Entity Susp PND` | 1 |
| `BND Pay EN Susp \| WC Susp Pending` | 1 |
| `BOND Pay Susp \| Judgement Pend` | 1 |
| `BOND Pay Susp \| Pending Case/CIT\| BOND Pay Pending` | 1 |
| `BOND Pay Susp \| Pending Case/CIT\| WC Susp Pending` | 1 |
| `BOND Pay Susp \| Pending IFS` | 1 |
| `Cit Entity Susp` | 1 |
| `Cit Entity Susp \| Pending Case/CIT` | 1 |
| `Citation Susp \| Pending Case/CIT` | 1 |
| `CLEAR \| 7073E Probation\| BOND Pay Pending` | 1 |
| `CLEAR \| 7073E Probation\| Class Removal Pending` | 1 |
| `CLEAR \| 7073E Probation\| Pending Canc` | 1 |
| `CLEAR \| Bond Pay Entity Pending\| Renewal Recived` | 1 |
| `CLEAR \| Bond Pay Entity Pending\| WC Susp Pending` | 1 |
| `CLEAR \| BOND Pay Pending\| Bond Pay Entity Pending` | 1 |
| `CLEAR \| BOND Pay Pending\| Pending Case/CIT` | 1 |
| `CLEAR \| Class Removal Pending\| Bond Pay Entity Pending` | 1 |
| `CLEAR \| Class Removal Pending\| C22 Not Valid` | 1 |
| `CLEAR \| DISC Bond Filed\| 7073E Probation` | 1 |
| `CLEAR \| DISC Bond Filed\| Bond Pay Entity Pending` | 1 |
| `CLEAR \| DISC Bond Filed\| Pending Case/CIT\| Judgement Pend` | 1 |
| `CLEAR \| FAM Sup Tmp Lic\| Bond Pay Entity Pending` | 1 |
| `CLEAR \| Judgement Pend\| BOND Pay Pending` | 1 |
| `CLEAR \| Liability Pend\| BOND Pay Pending` | 1 |
| `CLEAR \| Liability Pend\| FAM Sup Tmp Lic` | 1 |
| `CLEAR \| LIC-Cont in eff\| FAM Sup Tmp Lic` | 1 |
| `CLEAR \| O/L Entity Pending\| WC Susp Pending` | 1 |
| `CLEAR \| Pending Case/CIT\| 7073E Probation` | 1 |
| `CLEAR \| Pending Case/CIT\| DISC Bond Filed\| SOS Problem` | 1 |
| `CLEAR \| Pending Case/CIT\| Judgement Pend` | 1 |
| `CLEAR \| Pending Case/CIT\| O/L Entity Pending` | 1 |
| `CLEAR \| Pending Case/CIT\| Renewal Recived` | 1 |
| `CLEAR \| Pending Case/CIT\| WC Susp Pending\| FAM Sup Tmp Lic` | 1 |
| `CLEAR \| Pending Continuance` | 1 |
| `CLEAR \| Pending IFS\| Class Removal Pending` | 1 |
| `CLEAR \| Pending IFS\| Judgement Pend` | 1 |
| `CLEAR \| Renew Inactive only\| DISC Bond Filed` | 1 |
| `CLEAR \| Renew Inactive only\| Pending Case/CIT` | 1 |
| `CLEAR \| SOS Problem\| WC Susp Pending` | 1 |
| `CLEAR \| WC Susp Pending\| BOND Pay Pending` | 1 |
| `CLEAR \| WC Susp Pending\| Class Removal Pending` | 1 |
| `CLEAR \| WC Susp Pending\| Judgement Pend` | 1 |
| `CLEAR \| WC Susp Pending\| Liability Pend` | 1 |
| `CLEAR \| WC Susp Pending\| Pending Case/CIT` | 1 |
| `CLEAR \| WC Susp Pending\| Pending IFS` | 1 |
| `Contr Bond Susp \| 7073E Probation\| DISC Bond Filed` | 1 |
| `Contr Bond Susp \| BOND Pay Pending\| WC Susp Pending` | 1 |
| `Contr Bond Susp \| DISC Bond Filed\| Pending Canc` | 1 |
| `Contr Bond Susp \| FAM Sup Tmp Lic\| WC Susp Pending` | 1 |
| `Contr Bond Susp \| LIC-Cont in eff` | 1 |
| `Contr Bond Susp \| O/L Entity Pending` | 1 |
| `Contr Bond Susp \| Pending Case/CIT\| Bond Pay Entity Pending\| WC Susp Pending` | 1 |
| `Contr Bond Susp \| Pending Case/CIT\| DISC Bond Filed` | 1 |
| `Contr Bond Susp \| Renew Inactive only` | 1 |
| `Contr Bond Susp \| SOS Problem` | 1 |
| `EMP/WK Bnd Susp \| DISC Bond Filed` | 1 |
| `EMP/WK Bnd Susp \| DISC Bond Filed\| Judgement Pend` | 1 |
| `EMP/WK Bnd Susp \| Pending Case/CIT` | 1 |
| `Family Sup Susp \| 7073E Probation\| DISC Bond Filed` | 1 |
| `Family Sup Susp \| BOND Pay Pending` | 1 |
| `Family Sup Susp \| Liability Pend` | 1 |
| `Family Sup Susp \| SOS Problem` | 1 |
| `JDG Entity Susp \| Bond Pay Entity Pending` | 1 |
| `JDG Entity Susp \| FAM Sup Tmp Lic` | 1 |
| `JDG Entity Susp \| Pending Case/CIT` | 1 |
| `JDG Entity Susp \| Pending IFS` | 1 |
| `Judgement Susp \| Judgement Pend` | 1 |
| `Judgement Susp \| Liability Pend` | 1 |
| `Judgement Susp \| Pending IFS` | 1 |
| `Judgement Susp \| Pending IFS\| BOND Pay Pending` | 1 |
| `Judgement Susp \| SOS Problem` | 1 |
| `Liab Ins Susp \| Class Removal Pending\| WC Susp Pending` | 1 |
| `Liab Ins Susp \| DISC Bond Filed` | 1 |
| `Liab Ins Susp \| Pending Case/CIT` | 1 |
| `Liab Ins Susp \| Renewal Recived` | 1 |
| `Liab Ins Susp \| SOS Problem` | 1 |
| `O/L Entity Susp \| O/L Entity Pending` | 1 |
| `Out Liab Susp \| BOND Pay Pending\| WC Susp Pending` | 1 |
| `Out Liab Susp \| WC Susp Pending` | 1 |
| `QUAL Bond SUSP \| Class Removal Pending` | 1 |
| `QUAL Bond SUSP \| Entity Susp PND` | 1 |
| `SOS Suspension \| Entity Susp PND` | 1 |
| `SOS Suspension \| FAM Sup Tmp Lic` | 1 |
| `SOS Suspension \| Pending Case/CIT` | 1 |
| `Susp - No Qualifier \| 7073E Probation` | 1 |
| `Susp - No Qualifier \| DISC Bond Filed` | 1 |
| `Susp - No Qualifier \| Liability Pend` | 1 |
| `Susp - No Qualifier \| Pending Canc` | 1 |
| `Work Comp Susp \| Class Removal Pending\| Pending IFS` | 1 |
| `Work Comp Susp \| DISC Bond Filed` | 1 |
| `Work Comp Susp \| Entity Susp PND` | 1 |
| `Work Comp Susp \| Pending Case/CIT\| BOND Pay Pending` | 1 |
| `Work Comp Susp \| Renew Inactive only` | 1 |
| `Work Comp Susp \| SOS Problem` | 1 |
| **Total** | **15,003** |

</details>

## Domain Discovery And Dispositions

| Verified-domain discovery method | Count | Share of verified domains |
| --- | ---: | ---: |
| Candidate generation | 17,225 | 97.47% |
| Exact OpenStreetMap match | 343 | 1.94% |
| Reviewed official directory | 104 | 0.59% |
| **Total** | **17,672** | **100.00%** |

OpenStreetMap processing found 140,005 records with contact data, 658 exact contractor matches, 32 ambiguous matches, and 139,315 unmatched records.
Of the exact matches, 656 carried a usable domain and 528 belonged to the selected statewide contractor set.
Current website verification accepted 343 OpenStreetMap-discovered domains.

| Verified-domain confidence tier | Count | Share of verified domains |
| --- | ---: | ---: |
| `TIER_A_EXACT_LICENSE` | 6,856 | 38.80% |
| `TIER_B_PHONE_AND_NAME` | 9,763 | 55.25% |
| `TIER_C_NAME_LOCATION_TRADE` | 1,053 | 5.96% |
| **Total** | **17,672** | **100.00%** |

| Terminal domain disposition | Contractors |
| --- | ---: |
| `VERIFIED_DOMAIN` | 17,672 |
| `AMBIGUOUS_DOMAIN` | 26,416 |
| `WEBSITE_UNREACHABLE` | 18,127 |
| `LICENSE_TRANSITION_REVIEW` | 179 |
| `NO_DOMAIN_CANDIDATE` | 80 |
| `NO_VERIFIED_DOMAIN` | 130,426 |
| **Total** | **192,900** |

The run attempted 1,014,906 candidate domains, of which 877,841 did not resolve in DNS.
Across all attempts, it recorded 931,881 rejected-domain attempts, 29,663 ambiguous-domain attempts, 35,501 unreachable attempts, 17,672 verified attempts, and 189 transition-review attempts.
The 29,663 ambiguous attempts involved 26,777 contractors, of whom 26,416 ended with a terminal ambiguous outcome.
Attempt-level counts are not terminal contractor counts because one contractor can have multiple rejected, ambiguous, unreachable, or transition candidates before receiving a terminal outcome.

The license-transition review artifact contains 192 candidate-license quarantine rows covering 185 unique contractors.
Seven rows are additional quarantines for contractors already represented elsewhere in that artifact.
The 179 terminal transition outcomes count contractors whose final disposition remained `LICENSE_TRANSITION_REVIEW`.
Six quarantined contractors were later verified through a different, nonconflicting domain and therefore did not remain terminal transition outcomes.
The 189 attempt-level count reflects transition dispositions encountered in normal candidate attempts, while the review artifact also retains explicit reviewed-transition guard rows.
No transition row produced a proposal.

The crawler verified and crawled 17,672 websites and retained 53,238 bounded pages.
It did not scrape search-engine result pages, use paid APIs, submit forms, or retain full website HTML.

## Proposals And Coverage

The output contains 16,029 unique contractor proposal rows.
A contractor can contribute more than one field, so field counts do not sum to the proposal-row count.

| Proposed field | Contractors | Eligible-population coverage |
| --- | ---: | ---: |
| `email` | 10,191 | 5.28% |
| `servesCommercial` | 9,179 | 4.76% |
| `servesResidential` | 10,147 | 5.26% |
| `serviceAreas` | 7,879 arrays | 4.08% |

The 7,879 service-area arrays contain 26,183 total deduplicated values.
Verified-domain coverage was 9.16% of eligible contractors.
Every proposed field has bounded field-specific evidence.
The proposals set only missing or `UNKNOWN` eligible fields and append new `enrichmentEvidence`.
They do not replace existing substantive values.

The optional deep pass began only after the entire fast pass completed.
It processed 9,500 prioritized unresolved or partially resolved contractors and improved 602 outcomes, an incremental improvement rate of 6.34% within the processed deep subset.
An improvement means the deep scheduler accepted a better overall outcome.
It does not mean that every improved outcome added a field or a proposal.
The exact pre-deep field-count delta was not retained, so the field counts and coverage rates in this document are final post-deep totals.
The user directed an early end to optional deep processing so final validation and immutable artifact upload could complete in the available execution window.
The generated report therefore records `deepPassStopped: true` and the generic scheduler field `stoppedAtDeadline: true`.
This early end reduced only optional deep-pass breadth.
It did not leave any eligible contractor without a completed fast-pass outcome.

## Unresolved Records

The unresolved artifact contains 190,443 unique contractors.

| Unresolved category | Contractors |
| --- | ---: |
| Generic no verified domain | 130,426 |
| Terminal ambiguous domain | 26,416 |
| Website unreachable | 18,127 |
| License transition review | 179 |
| No domain candidate | 80 |
| Verified domain with at least one requested field still missing | 15,215 |
| **Total unresolved artifact rows** | **190,443** |

Of the 15,215 partially unresolved verified-domain contractors, 13,572 still received at least one proposal.
Another 2,457 verified-domain contractors were fully resolved for all currently eligible missing fields and therefore do not appear in the unresolved artifact.
The report's detailed evidence-state counters overlap and must not be summed because a verified contractor can have a published email while still lacking an explicit service area or customer-type statement.
The terminal domain-disposition table remains the authoritative mutually exclusive accounting for all eligible contractors.

## Final Automated Review

The final deterministic stronger-evidence review sampled 1,768 of the 17,672 accepted domains.
It returned 1,768 automated `CORRECT` verdicts and no automated `INCONCLUSIVE` verdicts.
The sample exceeded the 400-domain requirement and the report calculated a 100% lower-bound automated precision for the sampled evidence.

| Review stratum | Audited |
| --- | ---: |
| Candidate-generated domains | 1,722 |
| OpenStreetMap domains | 38 |
| Official-directory domains | 8 |
| Tier A domains | 669 |
| Tier B domains | 1,000 |
| Tier C domains | 99 |
| Email proposals | 1,037 |
| Commercial proposals | 942 |
| Residential proposals | 1,061 |
| Service-area proposals | 777 |

Every audited proposed field had complete bounded evidence according to the deterministic checks.
This is an automated review aid and must not be described as human verification.
The review gate remains `AWAITING_REVIEW`, requires human review, and has `statewideWriteAuthorized: false`.

## Final Validation

The final validation artifact has status `PASS` and an empty failures array.

| Validation check | Result |
| --- | ---: |
| Every live contractor accounted for | Pass |
| Duplicate contractor outcomes | 0 |
| Duplicate contractor proposals | 0 |
| Duplicate evidence values | 0 |
| Duplicate service-area values | 0 |
| Credential-bearing URLs | 0 |
| Historical-seed-only accepted domains | 0 |
| License-transition proposals | 0 |
| Malformed retained emails | 0 |
| Protected-field proposals | 0 |
| Proposals missing field evidence | 0 |
| Existing substantive values replaced | No |
| `supportedRetrofitIds` modified | No |
| Program memberships modified | No |
| Certifications modified | No |
| DynamoDB writes | 0 |

The final live contractor count remained 207,903.
The run created no new contractor rows.
Passing `--write` continued to fail closed.

## Immutable S3 Artifacts

All nine final artifacts and all 406 numbered checkpoints were uploaded to the existing private contractor-source bucket.
The 406 checkpoints run from `000000.json` through `000405.json`.
The nine final artifacts plus the checkpoints produce exactly 415 expected S3 objects.
Each listed SHA-256 and byte size matches the finalized local artifact and its read-back S3 checksum.

| Final record artifact | Rows |
| --- | ---: |
| Contractor outcomes | 207,903 |
| Contractor proposals | 16,029 |
| Bounded evidence records | 44,267 |
| Automated review queue | 980 |
| License-transition quarantine rows | 192 |
| Unresolved contractors | 190,443 |

| S3 key | SHA-256 | Bytes |
| --- | --- | ---: |
| `imports/web-enrichment/web-enrichment-statewide-fast-20260724T190000Z/manifest.json` | `3c90e766f5e86e32318c20e22b1426b447c9571b27a4f130677bae765734e24f` | 45,839 |
| `imports/web-enrichment/web-enrichment-statewide-fast-20260724T190000Z/proposals.jsonl` | `d242155f0a76e8b47be9bea771f53bf1d35e038b5059a0dee2c81f50a99dade4` | 47,230,770 |
| `imports/web-enrichment/web-enrichment-statewide-fast-20260724T190000Z/report.json` | `502203a525eba2e236779a763ad3711b8488c75394c92ddc3385783a1caa1436` | 68,273 |
| `imports/web-enrichment/web-enrichment-statewide-fast-20260724T190000Z/validation.json` | `c33923f24180031bbbf993f855a962864bb01ae16edf8bbb60d50df8b23145c3` | 956 |
| `raw/web-enrichment/web-enrichment-statewide-fast-20260724T190000Z/evidence.jsonl` | `f61274fdcd253d329341b8e7fbdba2964b1d8653fd24e73b5598a294c14d8665` | 47,775,714 |
| `raw/web-enrichment/web-enrichment-statewide-fast-20260724T190000Z/outcomes.jsonl` | `82a94eab00eb0b6c8aeb2d58b50556700bf704f9f3515176a7dc60e11c630e56` | 233,195,082 |
| `raw/web-enrichment/web-enrichment-statewide-fast-20260724T190000Z/review-queue.jsonl` | `8fd6e29238f36c726f16e5561d10f2cf8912c85967d1077071f74f0a81f80464` | 1,782,684 |
| `raw/web-enrichment/web-enrichment-statewide-fast-20260724T190000Z/license-transition-review.jsonl` | `8b26794fef27975e27deaa3b45b291e2488aad42c5dffc1c8853e232d001dc32` | 39,194 |
| `raw/web-enrichment/web-enrichment-statewide-fast-20260724T190000Z/unresolved.jsonl` | `44c1dd72e5c36bea68d56ac11d29fea205bd192c926ccb4d09b4965a37a5c23c` | 48,777,627 |

The local-only automated `audit.json` has SHA-256 `5b94214c78332eba7d33def8a478eb7b1958884e45412be9d06929da990cd64d` and size 1,912,901 bytes.
It is not one of the nine S3 final artifacts.

## Checkpoints, Resume, And Next Step

The run retains deterministic selected-contractor state, completed outcomes, DNS state, domain-verification state, robots state, page-content hashes, proposal state, deep-pass state, and 406 immutable checkpoints.
The checkpoint interval was 500 completed outcomes.
The run used concurrency 32, an 8,000-millisecond request timeout, a persisted 13.9-hour effective ceiling, and a 75-minute finalization reserve.
The persisted schedule was adjusted from the original 16-hour ceiling and 60-minute reserve at later user direction so the run would finish in the current session.
The adjustment preserved the original start time and did not restart completed work.

An interrupted copy of this exact run can be resumed only with the same run ID, approved pilot artifacts, immutable run metadata, and `--resume`.
The canonical command shape is documented in [Statewide Contractor Web Enrichment](./statewide-contractor-web-enrichment.md#statewide-resume).
Because this run is finalized and its S3 hashes are now the review baseline, it should not be resumed or regenerated during proposal review.

The recommended next step is an independent human review of the proposal sample, the full review queue, all license-transition rows, and the unresolved categories.
If that review approves a production write, create a separate task that consumes only the exact approved artifact hashes, rechecks the authoritative live rows, preserves all protected and substantive values, and applies conditional idempotent updates.
No production write is authorized by this completion record.

## Subsequent Production Application

On July 25, 2026, the user separately authorized production application of the exact finalized proposal artifact.
This later authorization did not change the historical automated audit status and does not constitute human verification of the audit sample.

The production writer required the exact run ID, the four approved SHA-256 values, AWS profile `retrofi-prod`, and AWS account `059310317821`.
It read all 16,029 target rows with strongly consistent reads before applying any update.
Each update required the contractor row to exist and required `licenseStatus`, `supportedRetrofitIds`, each target field, and `enrichmentEvidence` to remain equal to the pre-write values.
The writer preserved substantive current values, all CSLB-derived fields, `supportedRetrofitIds`, program memberships, certifications, and existing evidence.

The zero-write rehearsal found all 16,029 contractors, zero conflicts, and all 37,396 approved field values eligible for application.
The production operation applied 16,029 conditional `UpdateItem` calls with zero conditional conflicts and zero service failures.
It added 10,191 emails, 9,179 commercial-service values, 10,147 residential-service values, and 7,879 service-area arrays.
It appended 69,891 exact evidence objects.
It inserted no contractor rows and replaced no substantive values.

The first read-back verified all 16,029 protected-row hashes and all 37,396 field values.
It reported one evidence comparison mismatch caused by a lone invalid UTF-16 code unit in an approved supporting snippet being deterministically stored as `?` by DynamoDB string serialization.
No approved artifact was edited.
After the verifier accounted for that serialization behavior, a full replay found all 37,396 values and all 69,891 evidence objects already present, with zero conflicts and zero pending operations.
The exact live contractor count remained 207,903.

An additional write-mode replay read the immutable successful S3 report and made zero DynamoDB writes.
The successful production report is stored at `s3://gbs-retrofi-contractor-source-data-059310317821-us-east-1/imports/web-enrichment/web-enrichment-statewide-fast-20260724T190000Z/production-write-report.json`.
Its SHA-256 is `a7c4dbb89a1b4e89d4d315e6816186f824e22b9f5a9a553ef170f5b238ed7fff`.
No application or infrastructure stack was deployed.
