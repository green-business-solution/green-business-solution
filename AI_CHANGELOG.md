# AI Changelog

## 2026-06-28 - Codex (GPT-5) recurring expense and grant savings buckets

- Added explicit savings-engine fields for gross recurring savings, recurring expenses, net recurring savings, deterministic one-time savings, and separate possible grant money.
- Added `rate_per_battery_kwh` incentive rule support plus storage-capacity fixture answers for battery, solar-plus-storage, and microgrid previews.
- Refreshed the admin test-case savings previews and updated the UI savings card to show possible grants and recurring expenses separately from net recurring savings.

## 2026-06-28 - Codex (GPT-5) GPT Pro incentive rule repair final batch

- Applied the final GPT Pro one-time incentive repair batch through the importer: 37 source-backed rules added and 12 opportunities reviewed without a safe one-time rule.
- Reduced manual incentive rule repair targets from 33 to 0, with no remaining GPT Pro continuation point.
- Refreshed public sample test cases so 193 calculated retrofit previews show nonzero upfront opportunity savings with 742 usable rules loaded.

## 2026-06-28 - Codex (GPT-5) GPT Pro incentive rule repair batch 12

- Applied the twelfth GPT Pro one-time incentive repair batch through the importer: 71 source-backed rules added and 32 opportunities reviewed without a safe one-time rule.
- Reduced manual incentive rule repair targets from 108 to 33, with `SOURCE_DSIRE:dsire_program_id:22188` recorded as the next GPT Pro continuation point.
- Refreshed public sample test cases so 185 calculated retrofit previews show nonzero upfront opportunity savings with 705 usable rules loaded.

## 2026-06-28 - Codex (GPT-5) GPT Pro incentive rule repair batch 11

- Applied the eleventh GPT Pro one-time incentive repair batch through the importer: 51 source-backed rules added and 47 opportunities reviewed without a safe one-time rule.
- Reduced manual incentive rule repair targets from 183 to 108, with `SOURCE_DSIRE:dsire_program_id:4145` recorded as the next GPT Pro continuation point.
- Refreshed public sample test cases so 167 calculated retrofit previews show nonzero upfront opportunity savings with 634 usable rules loaded.

## 2026-06-28 - Codex (GPT-5) GPT Pro incentive rule repair batch 10

- Applied the tenth GPT Pro one-time incentive repair batch through the importer: 43 source-backed rules added and 44 opportunities reviewed without a safe one-time rule.
- Reduced manual incentive rule repair targets from 258 to 183, with `SOURCE_DSIRE:dsire_program_id:4812` recorded as the next GPT Pro continuation point.
- Refreshed public sample test cases so 167 calculated retrofit previews now show nonzero upfront opportunity savings with 583 usable rules loaded.

## 2026-06-28 - Codex (GPT-5) GPT Pro incentive rule repair batch 9

- Applied the ninth GPT Pro one-time incentive repair batch through the importer: 38 source-backed rules added and 48 opportunities reviewed without a safe one-time rule.
- Reduced manual incentive rule repair targets from 333 to 258, with `SOURCE_DSIRE:dsire_program_id:3406` recorded as the next GPT Pro continuation point.
- Refreshed public sample test cases so 158 calculated retrofit previews now show nonzero upfront opportunity savings with 540 usable rules loaded.

## 2026-06-28 - Codex (GPT-5) GPT Pro incentive rule repair batches 6-8

- Applied three additional GPT Pro one-time incentive repair batches through the importer: 175 source-backed rules added and 121 opportunities reviewed without a safe one-time rule.
- Reduced manual incentive rule repair targets from 558 to 333, with `SOURCE_DSIRE:dsire_program_id:22647` recorded as the next GPT Pro continuation point.
- Refreshed public sample test cases so 156 calculated retrofit previews now show nonzero upfront opportunity savings with 502 usable rules loaded.

## 2026-06-28 - Codex (GPT-5) GPT Pro incentive rule repair batch 5

- Applied the fifth GPT Pro one-time incentive repair batch through the importer: 26 source-backed rules added and 56 opportunities reviewed without a safe one-time rule.
- Reduced manual incentive rule repair targets from 633 to 558, with `SOURCE_DSIRE:dsire_program_id:2553` recorded as the next GPT Pro continuation point.
- Refreshed public sample test cases so 116 calculated retrofit previews now show nonzero upfront opportunity savings with 327 usable rules loaded.

## 2026-06-28 - Codex (GPT-5) GPT Pro incentive rule repair batch 4

- Applied the fourth GPT Pro one-time incentive repair batch through the importer: 50 source-backed rules added and 40 opportunities reviewed without a safe one-time rule.
- Reduced manual incentive rule repair targets from 708 to 633, with `SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-605` recorded as the next GPT Pro continuation point.
- Refreshed public sample test cases so 111 calculated retrofit previews now show nonzero upfront opportunity savings with 301 usable rules loaded.

## 2026-06-28 - Codex (GPT-5) GPT Pro incentive rule repair batch 3

- Applied the third GPT Pro one-time incentive repair batch through the importer: 53 source-backed rules added and 39 opportunities reviewed without a safe one-time rule.
- Reduced manual incentive rule repair targets from 783 to 708, with `SOURCE_DSIRE:dsire_program_id:2534` recorded as the next GPT Pro continuation point.
- Refreshed public sample test cases so 104 calculated retrofit previews now show nonzero upfront opportunity savings with 251 usable rules loaded.

## 2026-06-28 - Codex (GPT-5) GPT Pro incentive rule repair batch 2

- Applied the second GPT Pro one-time incentive repair batch through the repeatable importer: 46 source-backed rules added and 41 opportunities reviewed without a safe one-time rule.
- Reduced manual incentive rule repair targets from 858 to 783, with `SOURCE_DSIRE:dsire_program_id:22308` recorded as the next GPT Pro continuation point.
- Refreshed public sample test cases so 102 calculated retrofit previews now show nonzero upfront opportunity savings with 198 usable rules loaded.

## 2026-06-28 - Codex (GPT-5) GPT Pro incentive rule repair batch 1

- Added a repeatable GPT Pro research repair importer for opportunity incentive rules, preserving raw research batches and moving reviewed no-rule opportunities out of the active repair queue.
- Applied the first GPT Pro one-time incentive repair batch: 28 source-backed rules added, 54 opportunities reviewed without a safe one-time rule, and manual repair targets reduced from 933 to 858.
- Refreshed public sample test cases so 97 calculated retrofit previews now show nonzero upfront opportunity savings with 152 usable rules loaded.

## 2026-06-28 - Codex (GPT-5) source-backed one-time incentive rule repair

- Added a repeatable opportunity incentive rule repair script that fetches source pages/PDFs, extracts conservative source-backed one-time incentive formulas, and records unresolved rows as manual repair targets.
- Generated `data/opportunity_incentive_rules.json` with 125 extracted active/rolling upfront incentive rules and 933 explicit manual repair targets from 1,058 active/rolling upfront-cost-reduction opportunities.
- Wired extracted rules into admin test-case savings previews using the highest-ranked matched opportunity with a source-backed rule, avoiding unsupported stacking across unrelated connected incentives.
- Refreshed public sample test cases so 81 calculated retrofit previews now show nonzero one-time opportunity savings where a repaired rule is available.

## 2026-06-28 - Codex (GPT-5) final Ohio availability repair

- Researched the last remaining uncertain opportunity, Ohio Energy Efficiency Program for Manufacturers, against DSIRE, Ohio Development, Fairfield County grant listings, and the 2025 ODOD energy-grants workshop toolkit.
- Reclassified the record from `uncertain` to lower-confidence `rolling` because the program is described as no-formal-application / funding available until funds are expended, while the official Ohio Development URL is stale.

## 2026-06-28 - Codex (GPT-5) Pro answer-key availability reconciliation

- Compared the final public opportunity availability repairs against the GPT Pro answer key supplied by the user.
- Reconciled 9 status mismatches using Pro's stronger official-source evidence, including EV Tourism closed, Pay for Performance active via replacement program, SuSI CSI upcoming, Danville Utilities active, and one Ohio manufacturers record left uncertain.

## 2026-06-28 - Codex (GPT-5) final public availability uncertainty repair

- Researched and applied the final 50 public opportunity availability repairs using official-source manual research patterns learned from GPT Pro batches.
- Reduced public uncertain availability records from 50 to 0, with final public review counts of 1,371 active, 151 rolling, 49 upcoming, and 48 unavailable opportunities.
- Regenerated public fixtures, archive reports, and the uncertainty research packet so unavailable opportunities are archived from active public maps and no GPT Pro targets remain.
- Documented last-50 official-source repair heuristics for future cron automation.

## 2026-06-28 - Codex (GPT-5) GPT Pro availability research batch 2

- Applied 50 additional GPT Pro researched opportunity availability repairs, reducing public uncertain records from 251 to 202.
- Reclassified mostly standing tax, PACE, statutory, and financing opportunities as `rolling`, with one additional `upcoming` opportunity moved out of active public fixtures.
- Regenerated public fixtures, archive reports, and the next uncertainty prompt packet.

## 2026-06-28 - Codex (GPT-5) targeted PECO and CMAQ availability repairs

- Repaired PECO Commercial Charger Rebate Program from `uncertain` to `active` using the official PECO EVsmart Charging Rebate route provided by the user.
- Marked the CMAQ Incentive Program unavailable after official-source research could not confirm current availability and the user directed archival.
- Regenerated public fixtures, archive reports, and the remaining uncertainty prompt packet, reducing public uncertain records from 253 to 251.

## 2026-06-28 - Codex (GPT-5) availability research guidance update

- Added official-source fallback research lessons from the GPT Pro repair batch to the availability review workflow.
- Updated the GPT Pro uncertainty prompt to ask for replacement official pages, statutes, tax guidance, tariffs, PDFs, portals, and program-variant checks before leaving opportunities uncertain.

## 2026-06-28 - Codex (GPT-5) GPT Pro availability research batch

- Added `matching:availability-apply-repairs` to import official-source GPT Pro/manual availability repair JSON into the public opportunity review artifact.
- Applied 50 GPT Pro researched opportunity availability repairs, reducing public uncertain records from 301 to 253.
- Regenerated public matching fixtures, archive reports, and the next GPT Pro research target packet after moving newly unavailable/upcoming opportunities out of active public fixtures.

## 2026-06-27 - Codex (GPT-5) conservative availability uncertainty repair

- Added a conservative uncertainty-only availability repair workflow that re-reviews only currently uncertain public opportunities and merges safe direct-source classifications into the public review artifact.
- Tightened availability search fallback logic after detecting noisy generic search results; broad search fallback is now documented as exploratory and disabled by default for the uncertainty repair command.
- Reclassified 13 public opportunities from `uncertain` to `active` using reachable title-specific source URLs/pages, leaving 303 rows in an official-source research queue.
- Generated `data/public_opportunity_uncertain_research_targets.json` and `data/public_opportunity_uncertain_research_prompt.md` for GPT Pro/manual research of the remaining unresolved opportunities.

## 2026-06-27 - Codex (GPT-5) opportunity availability repair

- Added a searchable public availability-review pass that can fall back to title/state web search for uncertain source pages and classify reachable title-specific program pages as lower-confidence active evidence.
- Applied the refreshed public availability review to checked-in test fixtures, removing 8 unavailable opportunities from active maps and moving 45 upcoming opportunities into hidden upcoming buckets.
- Converted the remaining special-retrofit manual-review cases into normal-edge suppressions where only the special service matched source text and the normal retrofit match was a fallback.
- Added public fixture and archive workflows for applying availability reviews locally and dry-running archive actions from the generated review artifact.

## 2026-06-27 - Codex (GPT-5) modeled retrofit savings expansion

- Added reusable modeled savings handlers for electric kWh reductions, gas therm reductions, gas-to-electric replacements, demand-charge reductions, solar/export value, EV charging load, water/sewer reductions, waste service reductions, and fleet electrification.
- Reworked admin test-case savings previews from LED-only fixtures to template-driven retrofit family fixtures, calculating 830 of 885 matched retrofit previews while leaving service-only audit/certification/study items unsupported until modeled savings are available.
- Added focused Vitest coverage for modeled retrofit handlers and updated admin preview tests for calculated HVAC fixtures and service-only unsupported states.

## 2026-06-27 - Codex (GPT-5) test case selector labels

- Changed the Test Cases selector to show establishment names instead of fixture IDs and removed the duplicate establishment heading.

## 2026-06-27 - Codex (GPT-5) remove test profile description

- Removed the visible generated description line under the establishment name in the Test Cases profile card.

## 2026-06-27 - Codex (GPT-5) remove public source notes

- Removed the visible Public source notes section from the standalone Test Cases test-site profile card.

## 2026-06-27 - Codex (GPT-5) grouped test profile fields

- Changed the Test Cases profile details from separate mini-cards into one compact grouped card with thin divider lines.

## 2026-06-27 - Codex (GPT-5) compact test site profile

- Tightened the standalone Test Cases test-site profile card with a narrower column, stacked selector/header, smaller metric tiles, and compact key/value profile rows.

## 2026-06-27 - Codex (GPT-5) standalone test cases route

- Added `/testcases` as a standalone admin-only route that renders the Test Cases workspace without the sidebar/navbar.
- Changed the admin workspace Test Cases nav item to open `/testcases` in a new browser tab.

## 2026-06-27 - Codex (GPT-5) opportunity map modal

- Changed the admin Test Cases opportunity map so clicking an opportunity opens its full detail card in a centered popup.
- Removed the always-visible selected-retrofit opportunity card list below the map to reduce page clutter.

## 2026-06-27 - Codex (GPT-5) sticky sidebar avatar fix

- Fixed the workspace sidebar so the bottom-left avatar sign-out control stays anchored to the viewport instead of being pushed below long admin tables after content loads.

## 2026-06-27 - Codex (GPT-5) sidebar avatar sign-out

- Replaced the visible sidebar name/email/sign-out stack with a bottom-left circular account avatar that expands on hover/focus to reveal the sign-out button.
- Exposed the stored Google profile picture URL in the public user payload, with initials fallback for accounts without a picture.

## 2026-06-27 - Codex (GPT-5) workspace sidebar branding

- Replaced the sidebar `G` workspace mark and `Green Business Solution` text with the RetroFi logo and `Admin Workspace` label for admin users.

## 2026-06-27 - Codex (GPT-5) compact workspace chrome

- Moved the signed-in user name, email, and sign-out button from the main workspace topbar into the left sidebar above navigation.
- Removed the redundant visible admin/topbar header and the normal admin Test Cases page heading so the page starts directly with test-case content.

## 2026-06-27 - Codex (GPT-5) test-case fixture metadata cleanup

- Removed the generated-at/opportunity-count fixture metadata line from the admin Test Cases page header.

## 2026-06-26 - Codex (GPT-5) test-case diagnostics removal

- Removed the admin Test Cases `Common next questions`, `Common unresolved requirements`, and `Common blockers` diagnostic cards from the main sample profile view.

## 2026-06-26 - Codex (GPT-5) relationship map scenario colors

- Updated the admin Test Cases retrofit-opportunity map so the selected retrofit is grey, compatible selected-retrofit opportunities are light green, and opportunities excluded from a modeled best scenario are light red.

## 2026-06-26 - Codex (GPT-5) map-driven retrofit selection

- Removed the duplicate `Retrofits from matched opportunities` selector panel from admin Test Cases so the retrofit-opportunity map is the single selector for the selected-retrofit opportunity list.

## 2026-06-26 - Codex (GPT-5) duplicate test-case counts cleanup

- Removed the separate admin Test Cases eligible/ineligible summary cards now that those counts live inside the Test site profile card.

## 2026-06-26 - Codex (GPT-5) test-site profile counts

- Added eligible and ineligible opportunity counts directly inside the admin Test site profile card for each sample matching test case.

## 2026-06-26 - Codex (GPT-5) compact test-case selector

- Moved the admin Test Cases selector into the Test site profile card header and removed the separate wide selector card to reduce empty vertical space.

## 2026-06-26 - Codex (GPT-5) test-case description placement

- Moved admin test-case description text from the selector row into the Test site profile card so site context appears with the site details it describes.

## 2026-06-26 - Codex (GPT-5) admin test-case profile cleanup

- Simplified the admin Test Cases profile card to show a single test site profile instead of exposing the internal normalized matcher profile.
- Removed stale interested-improvement and user technology-interest fields from sample user profiles and public admin test-case fixtures.
- Updated matching so user-selected technology interests no longer reject otherwise eligible opportunities; opportunity technologies now drive retrofit discovery/classification only.

## 2026-06-26 - Codex (GPT-5) admin savings preview

- Added admin test-case savings previews generated from the V1 savings engine, with calculated LED fixture estimates and explicit unsupported states for retrofit types without V1 models.
- Rendered upfront cost, one-time savings, upfront cost after savings, monthly/annual recurring savings, cost and savings breakdowns, assumptions, and calculation traces in the admin Test Cases tab.
- Added a local fixture patch script for refreshing savings previews without re-running live opportunity matching.

## 2026-06-26 - Codex (GPT-5) savings engine LED vertical slice

- Added pure savings-engine modules for integer-cent money math, upfront/recurring aggregation, labor rules, geographic tax rules, incentive calculation, stacking scenarios, and a V1 LED average-rate savings estimate.
- Added focused Vitest coverage for the initial vertical slice: formulas, aggregation, blocked states, labor, tax, incentives, stacking, LED golden scenarios, and engine traces.
- Updated Vitest excludes so full repo test runs ignore dependency test files in `node_modules`.

## 2026-06-26 - Codex (GPT-5) opportunity publish gate TODO

- Documented the need for a backend publish gate that validates repaired opportunity data before opportunities become user-accessible.
- The future gate should block publication when visible records still produce unresolved internal repair statuses instead of `eligible` or `ineligible`.

## 2026-06-26 - Codex (GPT-5) eligible status rename

- Renamed the previous positive matching status key to `eligible` across matcher output, admin test-case rendering, generated fixtures, tests, and docs.
- Tightened sample fixture generation so published admin test cases only allow `eligible` and `ineligible` statuses.
- Regenerated the sample matching and retrofit fixtures from DynamoDB, preserving 1,809 visible opportunities, 245 archived records, and 42 hidden upcoming records.

## 2026-06-26 - Codex (GPT-5) upcoming hide and manual-review lifecycle repair

- Hid upcoming opportunities from admin database browsing and generated sample matching fixtures while keeping them unarchived for future availability reclassification.
- Repaired remaining visible opportunity-level `manual_review` causes with broader deterministic technology/applicant normalization and archived low-information DSIRE update-note records.
- Wrote targeted unavailable availability reviews and lifecycle archive updates to DynamoDB, raising archived records from 210 to 243 and reducing visible opportunity-level manual review to 0.
- Regenerated the admin sample matching fixture from 1,812 visible opportunities, with 41 upcoming records hidden and no `upcoming` status bucket rendered.

## 2026-06-26 - Codex (GPT-5) targeted matching review repair

- Repaired the current availability and utility-review gaps that were still producing `likely_eligible` sample matches, with DynamoDB writeback and a new repeatable targeted repair script.
- Added shared source-fetch retry/backoff handling for availability, utility, and facility research scripts so HTTP 429, HTTP 5xx, and timeout failures are retried before accepting unresolved data.
- Reconciled the admin sample matching fixture and report so the 50 public test profiles now show zero `likely_eligible` pairings and no stale nested likely opportunity cards.

## 2026-06-26 - Codex (GPT-5) Lambda packaging fix

- Updated the production deploy package to include the bill-field dictionary required by the energy-data parser so the API Lambda can import the merged server bundle.

## 2026-06-26 - Codex (GPT-5) nationwide matching test cases

- Added 40 nationwide sample matching profiles covering residential, multifamily, small business, nonprofit, public-sector, industrial, data-center, tribal, island, rural, and cooperative-utility edge cases.
- Expanded electric distribution utility aliases for the new sample profiles and fixed address state parsing so city names like `La Farge, WI` do not get mistaken for Louisiana.
- Regenerated the admin matching and retrofit fixtures across 50 sample profiles, surfacing 12 remaining `likely_eligible` pairings for follow-up data repair.

## 2026-06-25 - Codex (GPT-5) availability review repair

- Added a repeatable availability-review pipeline that fetches source pages, stores canonical `availabilityReview` records on DynamoDB opportunities, and documents future cron automation.
- Repaired the 11 unique opportunities causing 12 sample `likely_eligible` results, classifying 9 active, 1 rolling, and 1 unavailable based on source evidence.
- Archived the newly unavailable MAP opportunity and regenerated admin matching fixtures, reducing current real-profile `likely_eligible` pairings from 12 to 0.

## 2026-06-25 - Codex (GPT-5) admin allowlist update

- Added `rshen0210@gmail.com` to the default RetroFi production admin allowlist in the API server, CloudFormation template, and production deploy script.
- This allows the production app to create or promote that account as an admin on sign-in after the AWS stack configuration is updated.

## 2026-06-25 - Codex (GPT-5) public energy-data upload flow

- Added a post-scan energy-data upload flow with a new `/scan/energy-data` route, a live upload CTA from scan results, and browser-stored upload session handling tied to each new intake.
- Added presigned S3 upload, energy-data registration, upload-session validation, parsed file listing, and admin table visibility for a new `gbs-energy-data` metadata store.
- Implemented first-pass Green Button XML and CSV parsing plus AWS deployment updates for a private energy-data upload bucket and production table bootstrap.

## 2026-06-25 - Codex (GPT-5) facility eligibility repair

- Repaired opportunity facility eligibility reviews with source-page fetching and DynamoDB writeback, reducing stored `unknown` facility statuses to 0 of 2,096 opportunities.
- Tightened rule evaluation so high-confidence broad or specific facility mismatches become hard ineligible blockers instead of `likely_eligible` unknowns.
- Regenerated sample matching fixtures, reducing current real-profile `likely_eligible` pairings from 211 to 12, all due to availability uncertainty rather than facility eligibility.

## 2026-06-25 - Codex (GPT-5) real public matching test cases

- Replaced the synthetic matching sample profiles with 10 real public California business and institutional sites supplied from GPT Pro research.
- Added canonical utility aliases for Burbank Water and Power, Anaheim Public Utilities, Vernon Public Utilities, Pasadena Water and Power, and City of Healdsburg Electric Utility.
- Regenerated the admin matching test-case and retrofit fixtures from the 1,887 visible opportunities with archived opportunities excluded.

## 2026-06-25 - Codex (GPT-5) final intake step CTA

- Updated the bottom-right conversational intake button to show `Submit` on the final visible step above the progress bar.
- Preserved the existing `Next →` label on all earlier steps.

## 2026-06-25 - Codex (GPT-5) unavailable opportunity archiving

- Added opportunity lifecycle archiving for normalized unavailable opportunities, with a repeatable script and report artifacts.
- Archived 209 unavailable DynamoDB opportunity records and regenerated matching fixtures from the remaining 1,887 visible opportunities.
- Excluded archived opportunities from sample matching, admin database browsing, and normal opportunity counts while documenting future archive/unarchive automation.

## 2026-06-25 - Codex (GPT-5) facility taxonomy and eligibility review

- Expanded the public business site/facility type choices while preserving the existing intake step layout.
- Added canonical facility eligibility normalization, broad facility statuses, source-page review artifacts, and DynamoDB writeback for all 2,096 opportunity records.
- Regenerated admin matching test cases from DynamoDB-stored utility/facility reviews, increasing sample positive pairings from near-zero to 127 across the 10 test profiles.

## 2026-06-25 - Codex (GPT-5) intake back button text color

- Updated the conversational intake footer back button to use white label text.

## 2026-06-25 - Codex (GPT-5) intake footer back button

- Added a footer back button that appears from step 2 onward, matches the primary button height, and uses the existing conversational intake step navigation to move backward.

## 2026-06-25 - Codex (GPT-5) intake top chip removal

- Removed the top `STEP X • section` chip row from the conversational intake flow and tightened the shell spacing so the question area sits higher on every step.

## 2026-06-25 - Codex (GPT-5) intake privacy note reposition

- Moved the conversational intake privacy note below the progress bar and step count so it sits with the lower progress section instead of above the controls.

## 2026-06-25 - Codex (GPT-5) persistent intake next button

- Changed the conversational intake footer so the primary `Next` button is always visible on non-review steps instead of appearing only after selection or text entry.
- Kept the existing validation flow intact by letting submission surface step errors while preserving stable footer layout across steps.

## 2026-06-25 - Codex (GPT-5) unified conversational intake shell

- Replaced the stepper's mixed-width layout with one shared `960px` intake shell that now contains the header row, question area, body, privacy note, controls, and progress UI on every step.
- Kept selection steps on an `880px` centered content area while constraining only text inputs to a centered `520px` field width inside the same outer shell.
- Standardized the footer alignment so the privacy note, Next button row, and progress bar all share the same `880px` horizontal frame across the full 14-step flow.

## 2026-06-25 - Codex (GPT-5) conversational intake width wrapper fix

- Fixed the single-field intake wrapper rendering inline, which prevented the shared full-width layout from applying on later steps.
- Standardized the effective content width across all 14 intake pages by making the field shell honor the same `880px` frame as step 1.

## 2026-06-25 - Codex (GPT-5) conversational intake width normalization

- Unified the public intake step body to a single shared content width so choice, input, and review steps no longer alternate between wide and narrow layouts.
- Expanded single-field intake steps to use the same outer frame as the multi-card step while preserving the existing typography scale.
- Increased field padding instead of shrinking the page, leaving more whitespace around text on simpler steps.

## 2026-06-25 - Codex (GPT-5) conversational intake footer stabilization

- Grouped the privacy note, primary action area, and progress bar into a single footer container for the public intake flow.
- Converted the intake form to a column layout so the footer stays anchored at the bottom instead of shifting vertically between steps.
- Reserved consistent action-row and button sizing across step types, with full-width mobile controls for stable responsive behavior.

## 2026-06-25 - Codex (GPT-5) utility review DynamoDB writeback

- Added a DynamoDB writeback script for storing the generated utility restriction review artifact on canonical opportunity records.
- Stored utility review metadata under dedicated `utilityRestrictionReview*` fields instead of mutating source-ingestion `updatedAt`.
- Updated the utility restriction runbook to include the DynamoDB writeback step in the repeatable cron workflow.

## 2026-06-25 - Codex (GPT-5) utility restriction review pipeline

- Added a repeatable utility-restriction research script that reviews stored opportunity data plus source pages and writes a reusable review artifact/report.
- Updated opportunity match profiles and rule evaluation to distinguish required utility restrictions from explicit no restriction, utility-not-applicable programs, reviewed-none-found programs, and unresolved unknowns.
- Wired sample matching to consume the generated utility review artifact and documented the workflow for future Codex/cron reruns.

## 2026-06-25 - Codex (GPT-5) admin retrofit relationship graph

- Added a scrollable two-column SVG graph to each admin matching test case showing retrofit types, unique opportunities, and every connection between them.
- Made retrofit graph nodes selectable so choosing a retrofit in the chart updates the detailed opportunity list below.

## 2026-06-25 - Codex (GPT-5) retrofit opportunity index

- Added a canonical retrofit taxonomy layer and generated a separate public retrofit-to-opportunity index.
- Added retrofit classifications to match results so each sample test case can group promising opportunities by retrofit type.
- Updated the admin `Test Cases` tab to show inferred retrofit groups and let admins click a retrofit to inspect the related opportunities for that sample profile.

## 2026-06-25 - Codex (GPT-5) opportunity source links in matching results

- Preserved source, application, and website URLs in deterministic match results and summarized sample matching output.
- Added source-link chips to admin matching test-case opportunity cards, labeling DSIRE records as `DSIRE source`.
- Confirmed DSIRE ingestion already stores DSIRE detail URLs as `sourceUrl` and flags missing source URLs during data-quality checks.

## 2026-06-25 - Codex (GPT-5) real-address matching test cases

- Replaced the sample matching test-case site addresses with ten real California addresses supplied by the user.
- Updated sample test-case IDs, descriptions, utility selections, and profile metadata so the generated admin test cases stay coherent with the new addresses.
- Regenerated the sample matching report and public admin test-case fixture after evaluating all 2,096 opportunities against the 10 revised profiles.

## 2026-06-25 - Codex (GPT-5) admin matching test case tab

- Added a dedicated admin `Test Cases` tab with a dropdown for generated sample matching profiles.
- Displayed each selected test case's intake profile, normalized matcher profile, eligibility status counts, strongest matches, common unresolved requirements, next questions, and blockers.
- Updated the sample matching script to emit a compact public admin fixture alongside the existing full JSON and markdown report.

## 2026-06-25 - Codex (GPT-5) sample opportunity matching pipeline

- Added a deterministic first-pass matching pipeline with criterion registry, ontology normalization, opportunity match profiles, user match profiles, rule evaluation, scoring, and explanations.
- Added ten sample intake profiles and a read-only sample matching audit script that evaluates every current opportunity against each sample user.
- Generated a sample matching report from 2,096 live opportunity records and added regression tests for utility mismatches, missing utility restrictions, vehicle battery text, and unavailable program summaries.

## 2026-06-25 - Codex (GPT-5) intake draft persistence and retrofit select-all option

- Replaced the `Not sure yet` interested-improvements checkbox with an in-grid `All retrofit types` checkbox.
- Selecting `All retrofit types` selects every concrete retrofit category, and unselecting it clears the retrofit category selections.
- Added local browser draft persistence for the free-scan intake form so refreshes restore in-progress entries.
- Cleared the saved draft after successful intake submission.

## 2026-06-25 - Codex (GPT-5) admin user-flow access restore

- Restored public `Get Started` calls to action for signed-in admin users.
- Removed the signed-in admin redirect from `/scan` to `/admin` so admins can use the normal free-scan intake flow.
- Kept admin sign-in landing behavior unchanged while allowing admins to navigate into user-facing flows when needed.

## 2026-06-25 - Codex (GPT-5) retrofit selection shortcut

- Added a compact `Select all retrofit types` action to the free-scan interested-improvements checklist.
- The shortcut selects every listed retrofit category while leaving `Not sure yet` unselected.
- Styled the helper action separately from the primary form submit button.

## 2026-06-25 - Codex (GPT-5) Ryan Shen access setup

- Invited Ryan Shen's GitHub account `PlaneCoder75367` to the private repository with write access.
- Created Ryan Shen's AWS IAM Identity Center user `rshen0210` with email `rshen0210@gmail.com`.
- Assigned Ryan Shen the `AdministratorAccess` permission set on only the Green Business Solution AWS account.
- Documented Ryan's GitHub and AWS access in the repository access notes.

## 2026-06-25 - Codex (GPT-5) admin scan access polish

- Hid public scan/report-start CTAs for signed-in admin accounts while keeping regular signed-in users unchanged.
- Redirected signed-in admins away from `/scan` to `/admin`, including direct browser visits and in-app scan navigation.
- Passed public auth state into the scan and sign-in shells so signed-in users see `Sign Out` instead of `Sign In` on `/scan`.

## 2026-06-25 - Codex (GPT-5) manual review semantics refinement

- Reinterpreted full-run `manual_review_required` as true classifier uncertainty instead of V1 readiness or business-scope gating.
- Added `v1_readiness` and `exclusion_or_delay_reason` to full mapping JSON and import CSV.
- Regenerated the full dry-run mapping and coverage report, reducing manual-review rows from 1,845 to 525.
- Updated validation for the new readiness and delay-reason enums without mutating production data.

## 2026-06-25 - Codex (GPT-5) full savings mapping dry run

- Added a full-run savings mapping generator that classifies the read-only opportunity export without writing to DynamoDB.
- Generated full dry-run mapping JSON, import CSV, and coverage report for 2,096 opportunity records.
- Updated savings mapping validation to validate both sample and full mapping files against the source export.
- Left production opportunity records and database UI unchanged.

## 2026-06-24 - Codex (GPT-5) savings model refinement

- Added value-role and business-relevance classification to the sample opportunity savings mappings and import CSV.
- Added savings models for renewable generation credits, whole-building custom efficiency, program-rule value, net metering/export value, and interconnection/grid access value.
- Replaced blanket manual review with rule-based manual-review logic and expanded validation for value-role and business-relevance enums.
- Regenerated the 50-opportunity sample mapping and coverage report without mutating production opportunity records.

## 2026-06-24 - Codex (GPT-5) database ID search

- Extended the admin database search to match opportunity IDs, source keys, external IDs, external ID types, and DSIRE program IDs.
- Updated the database search placeholder to mention ID search.
- Added a focused search test covering numeric DSIRE IDs, full opportunity IDs, and existing title/admin/technology matching.

## 2026-06-24 - Codex (GPT-5) savings model sample mapping

- Added a reusable savings model library for bill/document-driven opportunity valuation.
- Added a canonical bill and document field dictionary covering electric, gas, water/sewer, waste, fuel/fleet, and project inputs.
- Created a 50-opportunity sample mapping from current opportunity candidates to primary and secondary savings models, plus import-ready CSV and coverage report.
- Added generation and validation scripts for the sample artifacts without mutating production opportunity records.

## 2026-06-23 - Codex (GPT-5) database filter placeholders

- Added a functional `Implementing sector` dropdown to the admin database tab.
- Renamed the DSIRE program type filter label from `Type` to `Program type`.
- Added disabled placeholder filter buttons for `Date`, `Coverage area`, and `Square footage` so planned DSIRE filter parity work is visible in the UI.

## 2026-06-23 - Codex (GPT-5) database loading progress

- Added a chunked admin-only `/api/database/programs/batch` endpoint so the database browser can load opportunity records incrementally.
- Updated the admin database tab to show a real progress bar based on DynamoDB scan progress while partial opportunities become available.
- Moved database filtering, facets, and pagination to the loaded client-side dataset and optimized program detail lookup through the `opportunityId` table key.

## 2026-06-23 - Codex (GPT-5) admin database tab

- Moved the DSIRE incentive database browser into the admin dashboard as a `Database` sidebar tab.
- Removed the public footer link and standalone `/database` page flow; legacy `/database` visits now resolve to `/admin`.
- Replaced the raw `gbs-opportunity-candidates` admin tab with the normalized database browser and avoided refetching the program list when selecting a program.

## 2026-06-23 - Codex (GPT-5) persisted auth session restore

- Persisted the backend-issued password session credential after Google or password sign-in so refreshes and direct protected-route loads can restore auth state.
- Added startup session restoration through `/api/auth/password/session` before protected routes render their login fallback.
- Updated the database page shell to show the signed-in navbar state after an admin session is restored.

## 2026-06-23 - Codex (GPT-5) brand and Google logo alignment

- Replaced the navbar `R` mark with the same `retrofi-logo.png` asset used by the favicon.
- Replaced the plain Google `G` text in the sign-in button with a multicolor Google-style SVG mark.

## 2026-06-23 - Codex (GPT-5) Google button color correction

- Strengthened the sign-in page Google button CSS so it keeps a white secondary-button background with dark text while preserving its existing size.
- Excluded the Google sign-in button from the broad public-page CTA button rule that was forcing a green background.

## 2026-06-23 - Codex (GPT-5) admin sign-in performance

- Changed admin auth responses to return a lightweight dashboard shell instead of scanning all admin DynamoDB tables during sign-in.
- Added admin-only lazy data endpoints for client rows and individual database table snapshots.
- Updated the admin dashboard to load the active tab on demand and refresh only the currently selected admin section.

## 2026-06-23 - Codex (GPT-5) sign-in navbar sizing

- Removed sign-in-page-specific navbar sizing overrides so the sign-in page reuses the same public navbar dimensions as the homepage.

## 2026-06-23 - Codex (GPT-5) signed-in home navbar state

- Updated the home page public navbar so the auth action changes from `Sign In` to `Sign Out` when the current SPA session is signed in.
- Reused the existing sign-out handler so the button clears auth state and returns to the homepage.

## 2026-06-23 - Codex (GPT-5) Google OAuth redirect flow

- Replaced the Google Identity Services browser button flow with a backend OAuth authorization-code redirect flow.
- Added `/api/auth/google/start` and `/api/auth/google/callback` with state-cookie validation, Google code exchange, ID-token verification, and app session handoff back to the SPA.
- Updated the sign-in page to use a normal redirect button and removed old Google iframe styling overrides.
- Added CloudFormation and deploy-script support for backend-only `GOOGLE_CLIENT_SECRET` and `GOOGLE_REDIRECT_URI` configuration.
- Updated Google auth and production deployment docs around authorized redirect URIs.
- Scoped the OAuth state cookie to `.retrofi.org` in production so root and `www` callback hosts can share the redirect state.

## 2026-06-23 - Codex (GPT-5) auth refactor and Google sign-in payload fix

- Extracted frontend route, API, config, icon, auth credential, and Google sign-in helpers from `App.tsx` into small modules so the sign-in flow is easier to inspect.
- Added `STYLE_GUIDE.md` with RetroFi visual and implementation rules for future human and AI contributors.
- Clarified Google Identity Services setup docs: this app uses browser ID tokens and Authorized JavaScript origins, not redirect URIs.
- Added OAuth diagnostics to `/api/health` and `/api/diagnostics`, including the expected browser origins and a public client ID hint.
- Fixed admin Google sign-in failing behind AWS Lambda response limits by returning a bounded DSIRE admin preview with total counts instead of every compacted opportunity record.
- Replaced CSS-generated navbar CTA text with real button text for accessibility and simpler styling.

## 2026-06-22 - Codex (GPT-5) navbar spacing and hero copy refinement

- Reworked the public RetroFi navbar into a full-width header with a centered 1440px inner grid so the logo starts near the desktop left edge and the center links stay visually centered.
- Kept the main navbar links to `How It Works`, `Pricing`, and the existing About dropdown, with `Sign In` and `Get Started` aligned on the right and routed to `/scan`.
- Updated the homepage subheadline phrase to `personalized retrofit implementation plan`.

## 2026-06-22 - Codex (GPT-5) admin-only database access

- Restricted the `/database` page to signed-in admin accounts and passed existing admin credentials into database API requests.
- Added server-side admin authentication middleware for `/api/database/*` so DSIRE clone data is no longer publicly readable through the API.

## 2026-06-22 - Codex (GPT-5) login reference polish follow-up

- Tuned the `/sign-in` page proportions to better match the generated reference, including an 840px desktop card, softer page glow, roomier form controls, and mobile gutters that prevent horizontal cropping.
- Updated the public sign-in navbar to use the simple dark-green `R` mark, remove the `Database` link, and label the primary CTA `Create My Report`.
- Overrode the injected Google Identity Services button wrapper so the Google sign-in option is full-width and visually aligned with the email, password, and primary login controls.

## 2026-06-22 - Codex (GPT-5) database footer removal

- Removed the public site footer from the `/database` page so the DSIRE browser ends at the database interface instead of showing the general marketing footer.

## 2026-06-22 - Codex (GPT-5) homepage hero and logo lockup

- Refined the RetroFi header lockup so the icon and wordmark sit closer together with responsive icon sizing.
- Replaced the homepage split hero and scan preview card with a centered full-width gradient banner using the requested slogan, headline, subheadline, and `/scan` CTA.
- Updated the mobile header CTA label to `Get Started` while keeping it routed to `/scan`.

## 2026-06-22 - Codex (GPT-5) RetroFi logo and hover polish

- Added the uploaded RetroFi logo asset to the public site header/footer branding and browser favicon.
- Changed the About dropdown so hovering over the trigger area opens the menu without a click and keeps it open while moving into Mission or Team.

## 2026-06-22 - Codex (GPT-5) DSIRE clone database browser

- Added a public `/database` page for browsing DSIRE-sourced programs with search, facets, program list, and detail sections.
- Added read-only DSIRE clone API endpoints for programs, details, facets, lookups, update feed, and summary counts.
- Updated DSIRE ingestion to write `dsireClone`, eligible sectors, technology records, and parameter sets into DynamoDB for clone-shaped records.

## 2026-06-22 - Codex (GPT-5) generated-style login polish

- Reworked the sign-in page to more closely match the generated reference: larger centered card, stronger header bar, roomier fields, green CTA, pill divider, and full-width Google option.
- Added a password visibility control and a Google-button loading fallback so the layout stays polished while Google Identity Services loads.

## 2026-06-22 - Codex (GPT-5) DSIRE-only opportunity scope

- Removed non-DSIRE opportunity ingestion scripts, npm commands, and source-specific ingestion docs.
- Rewrote the opportunity ingestion registry, database instructions, and data model around DSIRE as the only active opportunity source.
- Updated the admin opportunity review API and UI to expose only DSIRE records with compact DSIRE source lineage and metadata.

## 2026-06-22 - Codex (GPT-5) unique email accounts

- Enforced normalized email as the single account identity across intake, Google sign-in, and password signup.
- Switched new user records to deterministic email-based account IDs so duplicate account creation for the same email is blocked.
- Allowed intake submission to attach to an existing client account when that email does not already have an intake record.

## 2026-06-22 - Codex (GPT-5) sign-in page restyle

- Restyled the sign-in page around a visible email/password form, account-mode toggle, divider, and Google sign-in option.
- Hid the public footer from non-home public pages so the sign-in flow stays visually focused.
- Expanded the Google sign-in button to match the form width and made it slightly taller.

## 2026-06-22 - Codex (GPT-5) remove For Businesses surface

- Removed the `For Businesses` page and all related homepage/nav/footer content from the public RetroFi site.
- Redirected legacy `/for-businesses` requests back to the homepage so old links do not lead to a dead page.

## 2026-06-22 - Codex (GPT-5) agent smoke-check clarification

- Clarified that the fast-iteration workflow removes the need for human/user testing before GitHub/AWS sharing, not quick AI-agent verification.
- Updated agent instructions to require quick practical smoke checks before pushing/deploying code, configuration, infrastructure, AWS data, or runtime behavior changes when practical.
- Kept broad or slow local test passes optional unless explicitly requested or clearly needed for risky work.

## 2026-06-22 - Codex (GPT-5) password auth and compact admin payload

- Added username/password account creation and login alongside Google sign-in on the unified sign-in screen.
- Added password session support so admins can refresh and review opportunity records after non-Google login.
- Compacted admin opportunity records returned from the API to avoid Lambda response-size failures during admin sign-in.

## 2026-06-22 - Codex (GPT-5) RetroFi public site refinement

- Split the About area into an overview hub plus Mission, Team, Trust & Data, and Contact subpages with matching routes and footer links.
- Reworked the public navigation into a cleaner desktop layout with an About dropdown and a dedicated mobile menu/CTA pattern.
- Tightened the public visual hierarchy with smaller secondary heroes, denser card spacing, real lightweight icons, aligned pricing/team/business grids, and a more compact footer.

## 2026-06-22 - Codex (GPT-5) RetroFi public website rebuild

- Rebuilt the public RetroFi flow around `Get Started` with Home, How It Works, Pricing, About, Scan, Scan Results, and Sign In routes.
- Refined the scan form to match the business-first intake direction, submit through the existing API, and route to `/scan/results`.
- Added the RetroFi B2B energy-platform visual layer, responsive navigation/footer, scan results placeholder, document title, and updated product-vision documentation.

## 2026-06-22 - Codex (GPT-5) fast-iteration agent workflow

- Updated repository agent instructions so agents commit and push meaningful changes to GitHub immediately during early development.
- Added guidance to apply matching AWS changes immediately when a code/configuration change affects deployed app behavior, infrastructure, AWS data, or AWS configuration.
- Made broad local testing optional unless explicitly requested or clearly risky, with skipped local testing reported in the final response.

## 2026-06-22 - Codex (GPT-5) admin opportunity review workflow

- Added an admin review workspace for `gbs-opportunity-candidates` with search and filters for source, status, program type, review status, utility provider, business classification, and warnings.
- Added opportunity detail review with normalized fields, source links, warnings, evidence, matching parameters, and raw record inspection.
- Added admin-only review updates for approve, reject, needs-review, duplicate marking, and notes persisted back to DynamoDB.

## 2026-06-22 - Codex (GPT-5) production Google sign-in render fix

- Fixed the production Google sign-in screen blanking out after Google Identity Services loaded.
- Kept the Google-rendered button in an empty DOM slot so React does not reconcile children that external Google code has replaced.

## 2026-06-21 - Codex (GPT-5) Southern California Edison opportunity import

- Added a reusable bounded SCE business-program importer for demand response, building efficiency, financing, economic development, EV charging, and fleet electrification records.
- Preserved official SCE source/origin metadata and evidence on every writable opportunity candidate.
- Imported 18 validated SCE records into `gbs-opportunity-candidates`.
- Added SCE documentation and a source implementation scorecard so difficult, partial, and high-value ingestion sources can be compared before weekly automation is finalized.

## 2026-06-21 - Codex (GPT-5) Silicon Valley Power opportunity import

- Added a reusable Silicon Valley Power static-section importer for business rebates, electrification rebates, save-money programs, BOC scholarships, and EV charging incentives.
- Preserved official SVP source/origin metadata on every opportunity candidate, with a documented reader fallback when direct SVP fetches are blocked.
- Added deterministic matching fields for utility provider, SVP/Santa Clara geography mode, business classification, square footage, and demand thresholds.
- Documented the SVP ingestion workflow for later weekly automation.

## 2026-06-21 - Codex (GPT-5) retrofi.org production hosting setup

- Registered `retrofi.org` through Amazon Route 53 with auto-renew and privacy protection enabled.
- Added Lambda-compatible API entrypoint support while preserving local `gbs` profile development behavior.
- Added a CloudFormation template and deploy script for S3, CloudFront, ACM, Route 53 records, API Gateway, and Lambda production hosting.
- Documented the production deployment command, hosted zone, and Google OAuth authorized-origin requirements.

## 2026-06-21 - Codex (GPT-5) SDG&E opportunity import and source metadata

- Added a reusable SDG&E business-program importer for curated SDG&E seed pages, program tables, program tiles, demand-response sections, EV programs, and the Economic Development Rate page.
- Required structured `origin` metadata and source evidence on DSIRE, CEC, and SDG&E opportunity writes.
- Documented the ingestion process registry and SDG&E source workflow for later scheduled automation.
- Imported 34 validated SDG&E records into `gbs-opportunity-candidates` and backfilled origin metadata across all existing opportunity records.

## 2026-06-21 - Codex (GPT-5) CEC opportunity import

- Added a California Energy Commission sitemap/detail-page importer for solicitation opportunity candidates.
- Extracted solicitation numbers, status, deadlines, purpose text, application portals, file links, technology tags, and source evidence.
- Added inferred matching parameters for ZIP code, utility provider, business classification, and square footage.
- Imported 177 validated CEC records into `gbs-opportunity-candidates` and documented the ingestion flow.

## 2026-06-21 - Codex (GPT-5) unified Google login

- Removed temporary-code login from the user portal and admin dashboard.
- Replaced separate user/admin login screens with one Google sign-in flow that routes verified admins to the admin dashboard and clients to the user dashboard.
- Switched new intake-created account IDs from six-digit codes to opaque internal IDs and documented legacy numeric IDs as non-login database keys.

## 2026-06-21 - Codex (GPT-5) DSIRE public inventory import fix

- Debugged why the DSIRE AWS table had only 25 records: the RSS feed is a recent-change feed, not the full inventory.
- Added DSIRE public-table inventory mode against `/api/v1/programs`, defaulting AWS imports to Financial Incentive records.
- Batched DynamoDB writes for the larger DSIRE import and expanded normalized fields for cleaner admin review.
- Updated DSIRE ingestion and data-model documentation.

## 2026-06-21 - Codex (GPT-5) local Google OAuth sign-in

- Added Google Identity Services sign-in buttons to the user portal and admin login screens.
- Added backend Google ID token verification, account linking to existing DynamoDB users by Google subject or email, and Google-backed admin loading.
- Documented the local OAuth client ID setup and kept the Google client secret out of the repository.

## 2026-06-21 - Codex (GPT-5) DSIRE AWS opportunity import

- Added DSIRE RSS validation and DynamoDB upsert support for the `gbs-opportunity-candidates` table.
- Added a `gather:dsire:aws` command for writing validated DSIRE opportunity candidates into AWS.
- Included the opportunity-candidates table in admin API data tabs and documented its prototype schema.

## 2026-06-21 - Codex (GPT-5) DSIRE ingestion starter

- Added a reusable DSIRE ingestion script with configurable API mode and public RSS fallback mode.
- Added local JSON run artifacts for raw records, normalized opportunity candidates, source document metadata, and change reports.
- Documented DSIRE ingestion commands, API environment variables, output files, weekly reuse, and current limitations.

## 2026-06-21 - Codex (GPT-5) table-specific admin tabs

- Replaced the single admin `Data` tab with one admin tab per returned database table.
- Updated rebate/tax incentive planning notes with current decisions on relational opportunity storage, job queues, scheduled Codex review, minimal raw-file retention, and program/measure-level records.

## 2026-06-21 - Codex (GPT-5) admin data tab and crawler planning

- Added an admin `Data` tab that displays raw snapshots of the current DynamoDB user and intake tables for human validation.
- Extended the admin API response with table snapshots for authenticated admins.
- Updated the rebate/tax incentive database instructions with current decisions and planned implementation actions.

## 2026-06-21 - Codex (GPT-5) intake form sectioning

- Reorganized the intake form into Contact Information, Business Information, and Other Questions sections.
- Moved organization type and interested improvements into the top ROI question group without changing submitted field names or DynamoDB storage shape.

## 2026-06-19 - Codex (GPT-5)

- Initialized the Green Business Solution repository structure.
- Added the project agent workflow that makes GitHub the source of truth and requires LLM-authored changes to be explained.
- Scaffolded a React + Vite + TypeScript app without copying Efficient Hypothesis product content.

## 2026-06-19 - Codex (GPT-5) AWS setup

- Created the Green Business Solution AWS Organizations member account.
- Created Rajvansh Gupta as an AWS IAM Identity Center user.
- Assigned `AdministratorAccess` on only the Green Business Solution AWS account to Neer Kuchlous and Rajvansh Gupta.
- Configured the local AWS CLI profile `gbs` for the Green Business Solution account.
- Documented the GitHub organization creation step required before pushing the private repository.

## 2026-06-19 - Codex (GPT-5) GitHub setup

- Created the private GitHub repository `green-business-solution/green-business-solution`.
- Pushed the local `main` branch to GitHub and configured `origin`.
- Invited `SchrodingersCatLooks` with write access to the repository.

## 2026-06-19 - Codex (GPT-5) agent instructions

- Added `AGENTS.md` so Codex automatically loads the project's GitHub source-of-truth and change-explanation requirements.

## 2026-06-20 - Codex (GPT-5) DynamoDB intake prototype

- Created DynamoDB tables `gbs-users` and `gbs-client-intake` in the Green Business Solution AWS account.
- Seeded temporary admin users for Neer Kuchlous and Rajvansh Gupta.
- Added a local Node API that writes intake form submissions to DynamoDB using the `gbs` AWS profile.
- Reworked the React app into a version 1 banner page, required intake form, temporary-code user portal, and admin portal.
- Documented the DynamoDB model and planned Google OAuth account-linking path.

## 2026-06-20 - Codex (GPT-5) local setup diagnostics

- Verified Rajvansh Gupta's temporary admin code `768383` exists in DynamoDB and works through the local API.
- Added clearer browser/API error messages for missing local API, expired AWS SSO credentials, and AWS profile access issues.
- Added `/api/diagnostics` and documented the local troubleshooting checklist for collaborators.

## 2026-06-21 - Codex (GPT-5) intake form expansion

- Added site address, electric utility provider, organization type, ownership status, building type, square footage, and interested improvements to the client intake form.
- Stored the new fields in the existing DynamoDB-backed intake record under `site`, `business`, and `sustainability`.
- Updated user and admin portal displays so the new intake answers are visible after submission.

## 2026-06-21 - Codex (GPT-5) intake form required fields

- Made the intake form `Role/title` field optional while keeping the rest of the required contact fields unchanged.

## 2026-06-21 - Codex (GPT-5) intake CTA wording

- Changed the intake form submit button from `Create temporary user` to `Create My Plan`.

## 2026-06-21 - Codex (GPT-5) intake heading wording

- Shortened the intake form heading to `Tell us about your business`.

## 2026-06-21 - Codex (GPT-5) intake intro copy

- Removed the `Get started` eyebrow from the intake form and replaced the helper text with recommendation-focused copy.
- Refined the intake helper sentence to refer to tailoring `our recommendations`.

## 2026-06-21 - Codex (GPT-5) intake required-field note

- Added a styled required-field note below the intake form intro copy.

## 2026-06-21 - Codex (GPT-5) intake privacy affordance

- Changed the intake subheader back to `your recommendations`.
- Added a lock icon and privacy tooltip to the `Create My Plan` submit button.

## 2026-06-21 - Codex (GPT-5) intake form layout

- Centered and widened the intake form layout.
- Moved the required-field note into the Contact Information header row.

## 2026-06-21 - Codex (GPT-5) intake persistence

- Aligned backend validation with the optional `Role/title` field so submissions without a title can still be stored in DynamoDB.
- Updated the portal display to show `Not provided` when optional role/title information is blank.

## 2026-06-21 - Codex (GPT-5) company-first intake flow

- Reordered the intake form around Business Information, Site Information, Opportunity Priorities, and Contact Information.
- Made Full name and narrative priority fields optional while keeping company, site, email, timeline, and interested improvements required.
- Preserved all existing intake fields and DynamoDB storage keys.

## 2026-06-21 - Codex (GPT-5) intake priority simplification

- Removed the Opportunity Priorities section and its subquestions from the intake form.
- Dropped Timeline from backend required-field validation because the field is no longer shown.

## 2026-06-21 - Codex (GPT-5) business information cleanup

- Removed the Industry intake question and site-address helper note.
- Updated Organization type choices for commercial, industrial, agricultural, multifamily, nonprofit, government, and other organizations.

## 2026-06-21 - Codex (GPT-5) intake privacy tooltip

- Moved the lock icon into a separate `Private & Secure` cue above the submit button.
- Replaced the native title tooltip with a custom hover/focus tooltip for the privacy message.

## 2026-06-21 - Codex (GPT-5) product vision documentation

- Added `docs/product-vision.md` as the shared source of truth for website flow, intake decisions, post-submit opportunity direction, and agent coordination.
- Linked the product vision document from the README.

## 2026-06-22 - Codex (GPT-5) save-results Google sign-in modal

- Changed intake submission to show a `Sign in to save your results` modal after the intake record is saved.
- Reused the existing Google sign-in button in the save-results modal with a temporary-code fallback.
- Updated the product vision document with the intended post-submit save-results flow.

## 2026-06-22 - Codex (GPT-5) production domain documentation

- Added `https://retrofi.org` to the product vision document as the production website domain.
# 2026-06-25

- Updated the conversational intake review step so step 14 now shows `Submit` instead of `Get Started` on the bottom-right action button.
- Added intake-bound utility ingestion for Green Button XML/CSV and utility PDF uploads, storing uploaded file metadata, extracted bill fields, and site energy summaries on the client intake record instead of opportunity records.
- Updated the client/admin utility data views and upload flow to show file processing status, extracted bill fields, and site energy profile summaries.
- Added a local-safe fake client seeding workflow for the 14-step intake plus Green Button fixture uploads, with vendored test fixtures, report generation, and parser/seed tests.
- Added an admin-only `Client Intake Summary` workspace tab that turns intake utility data into a readable completion dashboard without mutating stored records.

# 2026-06-26

- Repaired the remaining visible `likely_eligible` sample matching causes with targeted utility/availability review updates and two lifecycle archives in DynamoDB.
- Changed generated admin sample matching fixtures to publish only positive and `ineligible` visible statuses, with a guard that fails generation if unresolved or hidden statuses return.
- Split the admin database browser into separate `Opportunities` and `Retrofits` tabs while preserving the existing raw DynamoDB table tabs and test-case tab.
- Added a retrofit index admin panel backed by `public/retrofit_opportunity_index.json`.
- Tightened transportation-electrification technology normalization so EV/fleet pages do not match HVAC-only user interests without explicit building HVAC evidence.
- Rebuilt the `/admin` Client Intake Summary into a fixed-column horizontally scrollable table so headers and row cells stay aligned at all viewport widths.
- Upgraded the utility upload pipeline to support category-aware electric, gas, water/sewer, and waste uploads with category metadata, multi-utility parsing, and per-category intake/profile summaries.
- Split the `/admin` Client Intake Summary into internal electricity, gas, water, and trash/recycling tabs with utility-specific completion, status, and file counts.
- Fixed the production utility-upload backend to use the S3 bucket region separately from the DynamoDB data region so signed uploads and `/api/energy-data/register` stop failing with S3 endpoint redirects.

# 2026-06-27

- Hid energy audit, LEED certification, engineering feasibility study, and building benchmarking compliance from the normal test-case retrofit savings map and surfaced them in a separate planning/certification/compliance section.
- Extended the availability review workflow to accept the public retrofit-opportunity index, skip low-value DSIRE shell pages during source fetches, add a USDA EA/REDA source URL repair, and conservatively leave unverified rows as `uncertain`.
- Added a mixed special/physical retrofit edge audit and suppressed physical retrofit edges for 20 opportunities whose source text explicitly requires an audit, study, certification, or benchmarking step first.
- Generated public availability and special-edge audit artifacts documenting current review counts, source evidence, and future cron workflow inputs.
- Documented GPT Pro availability-repair lessons for future cron/manual review, including subtype triage for statutory, tax, PACE, bond, tariff, utility portal, grant, local-option, and stale DSIRE records.
- Applied the next GPT Pro/manual public availability repair batches, reduced uncertain public opportunities to 50, regenerated public matching fixtures with savings previews, and added an availability review artifact writer for DynamoDB syncs.
- Added repo-local Codex app setup under `.codex/` so the desktop app can open this project in Local mode with shared defaults for AWS profile/regions and a bootstrap script for dependency and session checks.
