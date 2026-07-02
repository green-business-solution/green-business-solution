# AI Changelog

## 2026-07-02 - Codex (GPT-5) retrofit preview command-center refinement

- Refined the admin-nav `/user-preview` Retrofit Recommendations page into a tighter command-center and drill-down IA: active retrofit command cards, Overview opportunity preview, compact included summary, grouped Opportunities tab, worklist-style Requirements tab, and secondary More tab shortcuts.
- Preserved live/backend recommendation data paths and existing local-only interaction state while keeping full scenario, opportunity, assumptions, operating savings, financing, and application-prep details behind workspace tabs/drawers.
- Updated retrofit preview tests for the new Overview-first structure, compact rail/readiness/current-plan presentation, hidden detail tabs, and readable soft hover states.

## 2026-07-02 - Codex (GPT-5) application requirement extractor

- Added read-only `ApplicationRequirementExtractor` for per-opportunity deterministic extraction of required fields, documents, rules, deadlines, steps, evidence, and notes from the best available application/source URL.
- Added mocked extractor tests covering utility rebate, PDF-like application text, email, contractor-submitted, tax/accountant, deadline, vague-source, and unreadable-source cases.
- Added a per-row admin “Extract requirements” action and requirement preview under `/admin/application-sources`, without DynamoDB writes, requirement-to-user-data mapping, packet generation, autofill, submission, or email sending.

## 2026-07-02 - Codex (GPT-5) retrofit preview command workspace redesign

- Simplified the admin-nav `/user-preview` Retrofit Recommendations page into a compact command layer with admin strip, recommendation readiness, filter toolbar, current-plan strip, horizontal retrofit rail, and active retrofit command center.
- Moved secondary retrofit details behind workspace tabs for Overview, Financials, Scenarios, Opportunities, Requirements, and More while preserving scenario selection, opportunity grouping, operating savings, assumptions, financing, application prep, and add-to-plan behavior.
- Updated focused preview tests to verify the new default Overview, hidden detail tabs, compact/readable hover states, and continued live/API-shaped data mapping without introducing production writes.

## 2026-07-02 - Codex (GPT-5) retrofit preview workspace tab build fix

- Preserved the updated Retrofit Recommendations workspace-tab rendering so the committed frontend build remains valid and matches the deployed UI bundle.

## 2026-07-02 - Codex (GPT-5) application path one-hop discovery

- Updated `ApplicationPathFinder` to follow one official program website link from DSIRE-style source pages and inspect that one page for real application URLs, PDF forms, email paths, contractor instructions, or tax/accountant filing language.
- Added `programWebsiteUrl`, `pdfUrl`, `contactEmail`, `applicationMethod`, `discoveryStatus`, `confidence`, and richer evidence fields while preserving the existing read-only per-row discovery flow and legacy path fields.
- Updated the admin application-source audit path result to separate program source, program website, application URL, PDF URL, contact email, method, status, confidence, and evidence, including program-website-only/source-only summary counts.

## 2026-07-02 - Codex (GPT-5) deterministic match-confidence fixture repair

- Updated opportunity-data repair application so repaired visible public fixture edges use deterministic `confidence: 1` for match confidence while preserving source confidence separately as `dataRepairConfidence`.
- Removed unavailable, expired, and source-inaccessible repaired opportunities from active retrofit database/test-case rows instead of leaving them visible as low-confidence matches.
- Reapplied all 97 opportunity-data repair batches to refresh `public/retrofit_opportunity_index.json` and `public/sample_matching_test_cases.json` with zero non-100% visible match-confidence rows.

## 2026-07-02 - Codex (GPT-5) application path finder aggregator links

- Updated `ApplicationPathFinder` to extract official program/provider website links from DSIRE-style aggregator pages as `programWebsiteUrl`, separately from `discoveredApplicationUrl`.
- Tightened application URL classification so official program website links are not treated as application paths unless link text or URL clearly indicates apply/application/form/portal behavior.
- Updated the admin application-source audit discovery result to show program source, program website, application URL, PDF URL, contact email, method status, evidence snippets, and in-memory path discovery summary counts.

## 2026-07-02 - Codex (GPT-5) application path finder

- Added read-only `ApplicationPathFinder` source-page inspection for one opportunity source profile at a time, with bounded fetch timeout/response size, no crawling, no browser automation, and no DynamoDB writes.
- Added mocked fixture tests covering apply links, PDF application links, email application paths, contractor-submitted instructions, tax/accountant filing language, utility portal links, readable no-path pages, and unreadable source failures.
- Added a separate admin path-discovery endpoint and per-row `/admin/application-sources` action so path discovery is explicit and does not trigger external fetches during initial source-audit page load.

## 2026-07-02 - Codex (GPT-5) retrofit preview full polish follow-up

- Completed the next Retrofit Recommendations polish pass by making the improve-estimates panel a true three-zone row, reducing the current plan to active draft / selected count / recalculation / next step, and keeping initial plan actions relevant.
- Added active mini-subnav state, tightened retrofit tabs to the target compact height, and preserved active-tab auto-scroll for the one-active-retrofit workflow.
- Expanded focused preview tests for compact plan/refinement structure, active subnav state, 118px tab height, and removal of duplicated header opportunity counts.

## 2026-07-02 - Codex (GPT-5) retrofit preview hover and flow cleanup

- Fixed Retrofit Recommendations preview hover states so tabs, scenario cards, subnav chips, secondary buttons, opportunity rows, and action rows use light readable hover styles instead of inheriting dark global button hover.
- Made the current plan, top recommendation, refinement panel, active retrofit header, and horizontal retrofit tabs more compact while preserving one-retrofit-at-a-time planning, scenario, opportunity, financing, and application-prep controls.
- Reordered the active retrofit workspace so Financials leads the decision flow, Missing Info appears before assumptions/details, and “Why this is recommended” remains available as a collapsed rationale section.

## 2026-07-02 - Codex (GPT-5) retrofit preview readability follow-up

- Further tightened the Retrofit Recommendations active workspace after screenshot review by removing sticky mini-navigation overlap and shortening default scenario tab copy.
- Updated scenario cards so titles, opportunity chips, and metrics wrap/truncate cleanly instead of clipping hidden content.
- Improved included-estimate truth-table wrapping so blocker names, actions, and reasons remain visually separated in dense rows.

## 2026-07-02 - Codex (GPT-5) application source timeout fix

- Reworked `GET /api/admin/application-sources` into a bounded, metadata-only paged read with default `limit=100`, explicit timing logs, and safe JSON failures instead of an unbounded full-table scan that could 504 in production.
- Kept `ApplicationSourceResolver` classification read-only and based on existing opportunity metadata only, with no live external URL validation in the endpoint path.
- Updated the admin application-sources page to handle loading, empty, error, and incremental load-more states against the paged response.

## 2026-07-02 - Codex (GPT-5) retrofit preview tab overlap cleanup

- Corrected the Retrofit Recommendations preview layout so horizontal retrofit tabs are fixed-height, lighter-weight, and non-overlapping with the active retrofit workspace.
- Removed the sticky bottom action-bar overlay behavior so the add-to-plan CTA no longer covers accordion content while scrolling.
- Tightened preview badges, tab metadata, mini navigation chips, and section scroll offsets to improve readability without changing backend data, opportunity selection logic, or production persistence behavior.

## 2026-07-02 - Codex (GPT-5) retrofit preview consistency polish

- Tightened the Retrofit Recommendations preview labels so the included-estimate truth table visibly uses “Included in current estimate” even when all selected opportunities are pending validation.
- Replaced the opportunity details toggle copy with a cleaner “View details” / “Details open” pattern instead of terse disclosure-only text.
- Added focused preview tests for default scenario tab labeling, no contradictory missing-info copy, included-estimate summary labels, and utility-territory uncertainty preventing an opportunity from contributing to financial estimates.

## 2026-07-02 - Codex (GPT-5) incentive formula repair intake 1-25

- Added an intake/validation script for GPT Pro incentive formula and rate-table repair outputs that checks batch order/counts, normalizes markdown-contaminated URL fields, and writes a clean research artifact plus report.
- Imported the first 25 completed GPT Pro outputs from `GPT Pro Work/incentive-formula-rate-table-repair-batches-1-50/`, covering 500 opportunity formula/workflow repair targets.
- Preserved the richer research separately from the legacy simple-rule runtime file so the next estimator/import step can consume rate tables, measure catalogs, edge actions, tax credits, tariffs, and non-monetary workflow classifications safely.

## 2026-07-02 - Codex (GPT-5) incentive formula repair packet 1-50

- Added a reusable GPT Pro work-packet generator for incentive formula, rate-table, measure-catalog, grant, tax-credit, recurring-effect, non-monetary workflow, and bad-edge repair.
- Created `GPT Pro Work/incentive-formula-rate-table-repair-batches-1-50/` with 50 prompt files, 50 blank output files, a README, and a target-batch index for 984 immediate repair targets.
- Prioritized 515 active/rolling opportunities with existing simple incentive rules before 469 active/rolling reviewed no-rule opportunities that need richer calculation/workflow reclassification.

## 2026-07-01 - Codex (GPT-5) application source resolver audit

- Added a read-only `ApplicationSourceResolver` for DSIRE opportunity records that classifies application source type, application method, extraction status, confidence, and related retrofit context without writing to DynamoDB.
- Added an admin-only `/api/admin/application-sources` endpoint plus an authenticated `/admin/application-sources` audit view so RetroFi can review source/program URLs, application URLs, email-only flows, confidence, and resolver notes across visible opportunities.
- Added resolver coverage for PDF, utility portal, tax/accountant filing, email, online portal, contractor-submitted, ambiguous webpage, and missing-source cases, and fixed the local frontend build blockers needed to run the repo’s required smoke checks.
- Production deploy note: the normal CloudFormation deploy path is still blocked by `AWS::EarlyValidation::ResourceExistenceCheck`, so this release was pushed live by updating the `gbs-retrofi-api` Lambda package directly, syncing the frontend bucket, and invalidating CloudFront.

## 2026-07-02 - Codex (GPT-5) final source-confidence repair follow-up

- Normalized and imported GPT Pro's final low-source-confidence follow-up as opportunity data repair batch 97, cleaning markdown-formatted URLs before validation.
- Marked the final unrepaired Dixie Electric and Farmers Electric source-inaccessible failures as unavailable for product-visible archive/exclusion, while preserving their source-access evidence.
- Promoted the MID business rebate, Chicago Green Permit, and Energy Trust Custom Renewable records to medium source confidence where official evidence supported active broad program status, and suppressed unsupported physical retrofit edges until proper measure/special-workflow modeling exists.
- Reapplied all opportunity data repair batches, refreshed public matching fixtures, and regenerated both remaining repair queues to zero.
- Production deploy note: the normal CloudFormation deploy path is currently blocked by `AWS::EarlyValidation::ResourceExistenceCheck` because the template wants to add `EnergyDataBucket` even though `gbs-retrofi-org-energy-data-448016109714` already exists outside the stack. This change was deployed directly by updating Lambda code from the uploaded artifact, syncing `dist/` to the frontend bucket, and invalidating CloudFront.

## 2026-07-02 - Codex (GPT-5) opportunity retention policy TODOs

- Clarified product TODOs so source-inaccessible opportunities that fail targeted GPT Pro repair should be archived or excluded instead of treated as indefinite manual blockers.
- Added guidance to retain non-monetary special-workflow opportunities and expand the retrofit/workflow taxonomy for currently unsupported but source-backed opportunity paths, including future no-retrofit-needed/action-only opportunities.
- Clarified that tax credits should be modeled as first-class tax incentive effects rather than routed through grant estimation or ignored.
- Updated the low-source-confidence queue behavior so terminal unavailable or expired records do not remain in the follow-up queue.
- Added the MID Business Rebates, Chicago Green Permit, and Energy Trust Custom Renewable records to the special-edge suppression list so active but measure-unsupported or special-workflow opportunities do not remain attached to physical retrofit cards.

## 2026-07-02 - Codex (GPT-5) GPT Pro opportunity data repair batches 79-96

- Validated the 18 GPT Pro outputs in `GPT Pro Work/opportunity-data-repair-batches-79-96/` and confirmed each output matched its prompt target set, including the final 14-target batch.
- Imported the outputs as normalized opportunity-data repair batches 79-96 and appended them to the ordered repair manifest.
- Applied all 96 repair batches cumulatively to the public retrofit opportunity index and sample matching fixtures, reducing remaining unrepaired match-confidence targets to zero and low source-confidence follow-ups to five.

## 2026-07-02 - Codex (GPT-5) state-dependent incentive TODO

- Added a product TODO for tracking user state, already-completed retrofits, and dependent opportunity logic so future estimates can recalculate incentives when prior retrofits change marginal savings, tiers, caps, or eligible basis.

## 2026-07-02 - Codex (GPT-5) GPT Pro repair packet 79-96

- Created a combined GPT Pro opportunity-data repair packet in `GPT Pro Work/opportunity-data-repair-batches-79-96/`.
- Included all 334 remaining unrepaired low match-confidence targets plus 20 repaired low source-confidence follow-up targets.
- Generated 18 prompt files with matching blank output files, covering 354 total targets with 20 targets per prompt except the final 14-target prompt.

## 2026-07-02 - Codex (GPT-5) how it works transformation journey

- Rebuilt the public `How It Works` section into a continuous visual business-transformation journey instead of a set of cards.
- Added seven narrative stages covering profile setup through ongoing impact tracking, each paired with an evolving commercial environment that gains greenery, lighting, solar, EV charging, rooftop upgrades, and subtle data overlays.
- Kept the redesign frontend-only with responsive CSS, lightweight motion, and `prefers-reduced-motion` handling.

## 2026-07-02 - Codex (GPT-5) how it works photo transition backgrounds

- Replaced the abstract transformation scene with the provided gray-business and sunlit future-business images as the actual stage backgrounds.
- Updated the scroll journey so each step overlays concise copy on top of a sticky photo treatment that gradually crossfades from the older property to the upgraded property while environmental enhancements appear.

## 2026-07-02 - Codex (GPT-5) GPT Pro opportunity data repair batches 59-78

- Validated the 20 GPT Pro outputs in `GPT Pro Work/opportunity-data-repair-batches-59-78/` and confirmed each output matched its 20-opportunity prompt target set.
- Imported the outputs as normalized opportunity-data repair batches 59-78 and appended them to the ordered repair manifest.
- Applied all 78 repair batches cumulatively to the public retrofit opportunity index and sample matching fixtures, then refreshed the remaining low source-confidence queue.

## 2026-07-01 - Codex (GPT-5) pricing rollback and team page update

- Restored the public Pricing page to the earlier project-based RetroFi pricing structure, including the original tier copy and FAQ set.
- Added Ryan Shen to the public Team page with a role description focused on frontend iteration, production deployment, and workflow improvements.

## 2026-07-01 - Codex (GPT-5) public site page polish

- Redesigned the public `How it Works`, `Pricing`, and `About` pages to use a calmer, more consistent SaaS-style layout with subtler green styling, cleaner hierarchy, and clearer calls to action.
- Reframed the content around homeowners and fast retrofit clarity, including a concise five-step workflow, credible pricing tiers, and a mission-led About page focused on actionable retrofit guidance.
- Removed the older experimental interactive timeline styling in favor of simpler responsive card layouts and shared public-page presentation styles without changing routing or backend behavior.

## 2026-07-01 - Codex (GPT-5) conservative grant estimation

- Added a grant-estimation rules module that separates source confidence from estimate confidence, suppresses low-confidence or max-only competitive grant values, and supports deterministic capped percent, per-unit, fixed, study/audit, competitive EV, zero-value loan/tax/non-cash classifications, and reason codes.
- Wired grant estimates into legacy and v2 savings incentive calculations so unsupported "possible grant" and ambiguous "up to" grant rules no longer contribute to savings or scenario selection totals.
- Added targeted savings tests for deterministic grants, competitive expected value, max-only suppression, low-source suppression, non-grant classifications, missing inputs, legacy runtime gating, and updated possible-grant stacking expectations.

## 2026-07-01 - Codex (GPT-5) GPT Pro repair packet 59-78

- Updated the GPT Pro opportunity-data work-packet generator so prompt validation text uses the actual target count instead of hardcoding 15 repairs.
- Updated opportunity-data repair intake to infer expected repair count from the prompt by default, while preserving explicit `--expected-count` overrides.
- Created `GPT Pro Work/opportunity-data-repair-batches-59-78/` with 20 prompt files and 20 blank output files, covering 400 unrepaired low-confidence targets after batch 58.

## 2026-07-01 - Codex (GPT-5) interactive how it works timeline

- Turned the `How it Works` timeline into an interactive draggable control so users can grab the character and move it along the process track.
- Reworked the 1-5 step markers into rounded step boxes that grow as the draggable progress passes over them, with the active step highlighted most strongly.

## 2026-07-01 - Codex (GPT-5) how it works simplified top timeline

- Removed the lower five-step card grid from the `How it Works` page so the timeline is now the only process explainer.
- Shortened the intro copy and expanded it into a full-width top section above the cleaner timeline layout.

## 2026-07-01 - Codex (GPT-5) how it works timeline swap

- Removed the animated video block from the `How it Works` page and replaced it with a cleaner process timeline above the five step cards.
- Added a small character marker above the current step on the timeline so the user can visually track where the journey starts before reading the step cards below.

## 2026-07-01 - Codex (GPT-5) how it works steps restored below video

- Removed the `What you'll need / What you get back` two-card section beneath the animated How it Works video.
- Restored the five simple process cards directly below the video with no extra heading so the walkthrough and the step-by-step summary now appear together.

## 2026-07-01 - Codex (GPT-5) how it works animated cartoon swap

- Replaced the top `How it Works` hero plus step-section text block with a single animated cartoon-style walkthrough that loops through all five RetroFi steps inside a video-like player.
- Kept the implementation frontend-only by building the short explainer with existing icons, CSS scene animation, and a lightweight scrubber/progress treatment instead of changing routing or backend behavior.

## 2026-07-01 - Codex (GPT-5) GPT Pro opportunity data repair batches 49-58

- Validated the ten GPT Pro outputs in `GPT Pro Work/opportunity-data-repair-batches-49-53/` and `GPT Pro Work/opportunity-data-repair-batches-54-58/` and confirmed none were cut off.
- Imported the outputs as normalized opportunity-data repair batches 49-58 and appended them to the ordered repair manifest.
- Applied all 58 repair batches cumulatively to the public retrofit opportunity index and sample matching fixtures, then refreshed the low source-confidence queue.

## 2026-07-01 - Codex (GPT-5) low source-confidence opportunity queue

- Added a repeatable low-source-confidence queue generator for repaired opportunity-data records.
- Generated JSON and Markdown artifacts listing the 11 latest low `source_confidence` opportunities after applying repair batches 1-48.
- Prioritized active low-source-confidence opportunities ahead of source-inaccessible records for later GPT Pro or human verification.

## 2026-07-01 - Codex (GPT-5) how it works tab redesign

- Reworked the public `How it Works` page from a text-heavy timeline into a faster-scanning five-step journey with a visual progress rail and responsive step cards.
- Simplified the supporting content into compact "What you'll need" and "What you get back" panels so users can understand the RetroFi flow without comparing long lists.
- Kept all existing routing and functionality unchanged while improving visual hierarchy, hover polish, and mobile readability.

## 2026-07-01 - Codex (GPT-5) Rajvansh GitHub organization admin invite

- Invited Rajvansh Gupta's GitHub account `SchrodingersCatLooks` as an admin/owner of the `green-business-solution` GitHub organization.
- Verified Rajvansh already has production app admin access via `pmrajvansh@gmail.com` in the live `GBS_ADMIN_EMAILS` allowlist and `role: admin` in `gbs-users`.
- Updated access documentation to record that the GitHub organization admin invitation is pending acceptance.

## 2026-07-01 - Codex (GPT-5) GPT Pro repair packets 49-58

- Created two disjoint GPT Pro opportunity-data repair work packets for batches 49-53 and 54-58.
- Each packet includes five prompt files and five blank output files, covering 150 total unrepaired low-confidence targets after batch 48.
- Refreshed the next-target artifact to the batch 54-58 target set while preserving batch 49-53 targets in its packet prompts.

## 2026-07-01 - Codex (GPT-5) GPT Pro opportunity data repair batches 39-48

- Validated the ten GPT Pro outputs in `GPT Pro Work/opportunity-data-repair-batches-39-43/` and `GPT Pro Work/opportunity-data-repair-batches-44-48/` and confirmed none were cut off.
- Imported the outputs as normalized opportunity-data repair batches 39-48 and appended them to the ordered repair manifest.
- Applied all 48 repair batches cumulatively to the public retrofit opportunity index and sample matching fixtures.

## 2026-07-01 - Codex (GPT-5) confidence terminology TODO

- Clarified that `match_confidence` is deterministic rules confidence and should be pushed to 100% through opportunity-data repair.
- Clarified that `source_confidence` is separate research/provenance confidence and may remain low even when deterministic matching can resolve an outcome.
- Added a TODO to queue low-source-confidence opportunities for deeper GPT Pro research or human/admin verification.

## 2026-07-01 - Codex (GPT-5) GPT Pro repair packets 39-48

- Created two disjoint GPT Pro opportunity-data repair work packets for batches 39-43 and 44-48.
- Each packet includes five prompt files and five blank output files, covering 150 total unrepaired low-confidence targets after batch 38.
- Refreshed the next-target artifact to the batch 44-48 target set while preserving batch 39-43 targets in its packet prompts.

## 2026-07-01 - Codex (GPT-5) GPT Pro opportunity data repair batches 34-38

- Validated the five GPT Pro outputs in `GPT Pro Work/opportunity-data-repair-batches-34-38/` and confirmed none were cut off.
- Imported the outputs as normalized opportunity-data repair batches 34-38 and appended them to the ordered repair manifest.
- Applied all 38 repair batches cumulatively to the public retrofit opportunity index and sample matching fixtures.

## 2026-07-01 - Codex (GPT-5) retrofit preview hierarchy correction

- Corrected the existing admin-nav and customer Retrofit Recommendations preview hierarchy so retrofit cards are the primary ranked plans and scenario comparison now lives inside each expanded retrofit instead of as a page-level dashboard.
- Added a compact top recommendation summary, retrofit-scoped scenario selection/details, cleaner customer-facing copy, human-readable next actions, and more conservative completeness/confidence presentation without adding production writes.
- Updated preview tests to assert the absence of the old global scenario summary and the presence of retrofit-scoped scenario content on the live/API-backed preview path.

## 2026-07-01 - Codex (GPT-5) GPT Pro opportunity data repair batches 29-33

- Validated the five GPT Pro outputs in `GPT Pro Work/opportunity-data-repair-batches-29-33/` and confirmed none were cut off.
- Imported the outputs as normalized opportunity-data repair batches 29-33 and appended them to the ordered repair manifest.
- Applied all 33 repair batches cumulatively to the public retrofit opportunity index and sample matching fixtures.

## 2026-07-01 - Codex (GPT-5) GPT Pro repair packet 34-38

- Added support for excluding existing GPT Pro target packets when generating opportunity-data repair work packets.
- Created `GPT Pro Work/opportunity-data-repair-batches-34-38/` with five prompt files and five blank output files, continuing after the 29-33 packet.
- Refreshed the next-target artifact to the batch 34-38 target set.

## 2026-07-01 - Codex (GPT-5) user preview fake-user autoload

- Updated `/user-preview` to fetch admin users automatically on page load instead of requiring a manual refresh.
- Scoped the preview dropdown to promoted fake client test-case users so the first available test case is selected by default.

## 2026-07-01 - Codex (GPT-5) standalone admin user preview page

- Removed the `Client Intake Summary` admin page, utility-readiness summary helpers, and related styles.
- Changed the admin `User Preview` nav item to open a dedicated `/user-preview` page in a new tab, matching the Test Cases navigation pattern.
- Added a client dropdown on `/user-preview` that loads live admin user data and renders the existing Retrofit Recommendations preview for the selected user.

## 2026-07-01 - Codex (GPT-5) retrofit recommendations per-retrofit financial scoping

- Reworked the existing Retrofit Recommendations preview/results UI so retrofit cards, not scenario cards, are the primary results surface on both the client route and admin preview route.
- Scoped project cost, incentives, tax-benefit fallback, recurring operating savings, payback, ROI, missing information, estimate assumptions, opportunities, and operating-savings details to each individual retrofit card.
- Demoted the four scenario cards into compact bundle summaries, tightened completeness/confidence display rules, removed the premium placeholder panel, and added focused preview-state tests for estimate confirmation and opportunity-selection behavior.

## 2026-07-01 - Codex (GPT-5) GPT Pro work packet organization

- Moved GPT Pro prompts and saved outputs under `GPT Pro Work/` so prompt/output handoff artifacts live in one workspace.
- Added a reusable opportunity-data GPT Pro work-packet generator that creates five prompt files and five blank output files per repair packet.
- Generated the next opportunity-data repair packet for batches 29-33 and refreshed the next 75-target artifact from the current batch-28 public index.

## 2026-07-01 - Codex (GPT-5) GPT Pro opportunity data repair batches 24-28

- Imported five additional saved GPT Pro opportunity-data repair outputs from `GPT Pro Work/Outputs/` as normalized batches 24-28.
- Appended the batches to the ordered opportunity-data repair manifest and applied all 28 batches cumulatively to the public retrofit opportunity index and sample matching fixtures.
- Advanced the repaired opportunity-data corpus to 335 unique researched opportunities.

## 2026-07-01 - Codex (GPT-5) GPT Pro opportunity data repair batches 19-23

- Imported five saved GPT Pro opportunity-data repair outputs from `GPT Pro Work/Outputs/` as normalized batches 19-23.
- Appended the batches to the ordered opportunity-data repair manifest and applied all 23 batches cumulatively to the public retrofit opportunity index and sample matching fixtures.
- Preserved the remaining prepared GPT Pro prompt set for batches 24-28 as the next waiting repair outputs.

## 2026-07-01 - Codex (GPT-5) second next opportunity repair prompt set

- Added five additional GPT Pro opportunity-data repair prompts for the next unrepaired low-confidence queue positions 76-150, excluding the already in-flight prompt batches 19-23.
- Preserved 15-target chunks, exact target-order validation, and continuation markers so the later repair outputs can be imported as batches 24-28.

## 2026-07-01 - Codex (GPT-5) next opportunity repair prompts after batch 18

- Added five ready-to-run GPT Pro opportunity-data repair prompts for the current post-batch18 queue, covering batches 19-23 and the next 75 unrepaired low-confidence targets.
- Split the queue into parallel 15-target prompt files with exact target-order validation markers and continuation IDs for deterministic intake.

## 2026-07-01 - Codex (GPT-5) GPT Pro opportunity data repair batches 14-18

- Imported Neer's pasted GPT Pro opportunity-data repair outputs as batches 14-18, covering 75 unique opportunities and appending them to the ordered repair manifest.
- Normalized copied markdown URLs and evidence fragments, then applied all 18 opportunity-data repair batches cumulatively to the public retrofit opportunity index and sample matching fixtures.
- Regenerated the next 75 opportunity-data research targets from the current repaired fixture state and refreshed the sample matching opportunity-data audit with current report language.

## 2026-07-01 - Codex (GPT-5) admin user preview tab

- Added a dedicated `User Preview` tab to the admin workspace that opens the customer-facing portal preview for selected client users.
- Removed the portal preview action from `Client Intake Summary` so intake readiness and preview navigation are separated.

## 2026-07-01 - Codex (GPT-5) admin retrofit recommendations preview redesign

- Reworked the admin-launched client portal preview retrofit tab into the main post-intake `Retrofit Recommendations` preview UI, keeping the existing `/portal-preview?userId=...` route and live recommendation endpoint.
- Added scenario comparison cards, ranking controls, editable industry-standard estimate boxes, opportunity selection, separate Operating Savings, retrofit detail questions, financing preview placeholder, next-best-action checklist, and subtle premium placeholders.
- Added deterministic frontend tests for the live-shaped preview mapper and rendered page structure without introducing production writes or local mock data for real behavior.

## 2026-07-01 - Codex (GPT-5) next opportunity repair prompt

- Regenerated the current 75-target opportunity-data research list after batch 13.
- Added a ready-to-send GPT Pro prompt for the first 15 targets in the next low-confidence repair batch, with `SOURCE_DSIRE:dsire_program_id:5512` as the continuation marker.
- Added four more disjoint GPT Pro prompt files so targets 16-75 can be researched in parallel while preserving deterministic import order.
- Added a guarded GPT Pro opportunity-data repair intake script that normalizes common output formatting damage, validates exact prompt target order, and can append validated batches to the repair manifest.
- Added a post-batch13 sample matching audit that separates remaining opportunity-data cleanup from matching/ranking issues in the 50 main test cases.

## 2026-07-01 - Codex (GPT-5) opportunity repair manifest and batch 13

- Added an ordered opportunity-data repair batch manifest and `matching:opportunity-data-repairs:apply-all` command so cumulative repair imports no longer require a long manual file list.
- Added a current-fixture target generator with `matching:opportunity-data-targets` and regenerated the next 75 unrepaired low-confidence opportunity-data targets after the first cleanup set.
- Normalized and imported the GPT Pro batch for the 15 remaining local low-confidence targets as batch 13, stripping malformed markdown URL fragments before validation and import.
- Applied repair batches 1-13 cumulatively to the public retrofit opportunity index and sample matching fixtures.

## 2026-07-01 - Codex (GPT-5) opportunity repair validation guardrails

- Added a reusable GPT Pro opportunity-data repair validator and CLI script for schema, duplicate ID, expected target, URL corruption, status, and polluted evidence checks.
- Wired the opportunity-data repair importer to fail before patching public fixtures when a repair artifact has blocking validation errors.
- Added regression tests for validator failures and importer fail-fast behavior on malformed GPT Pro repair output.

## 2026-07-01 - Codex (GPT-5) remaining opportunity data repair prompt

- Added a stricter GPT Pro opportunity-data repair prompt for the 15 remaining unrepaired low-confidence targets from the local target artifact after repair batches 1-12.
- Tightened prompt instructions to reduce malformed JSON, markdown URL fragments, duplicate target drift, and evidence-field corruption in GPT Pro responses.

## 2026-07-01 - Codex (GPT-5) GPT Pro opportunity data repair batches 11-12

- Imported batch 11 with ten newer 2026-07-01 repairs from Corn Belt Energy through Black Hills Energy Colorado electric, intentionally superseding older duplicate repairs.
- Imported batch 12 with six new 2026-06-30 repairs from Bright Energy North Dakota through South Dakota NEVI, omitting older duplicate repairs for `SOURCE_DSIRE:dsire_program_id:4586`, `SOURCE_DSIRE:dsire_program_id:3415`, `SOURCE_DSIRE:dsire_program_id:1902`, and `SOURCE_DSIRE:dsire_program_id:3464` so batch 7 remains authoritative.
- Applied opportunity-data repair batches 1-12 cumulatively to the public retrofit opportunity index and sample matching fixtures, with `SOURCE_DSIRE:dsire_program_id:1773` recorded as the next continuation point.
- Updated the opportunity-data repair importer so GPT Pro `expired` statuses publish as unavailable instead of falling back to the previous public status.

## 2026-07-01 - Codex (GPT-5) fake user database cleanup

- Deleted 17 extra `isFakeUser: true` records from the production `gbs-users` table that were not part of the 50 main sample matching test cases.
- Guarded deletion with the 50 `sampleUserId` allowlist from `data/sample_user_profiles.json` and DynamoDB conditional deletes requiring `isFakeUser: true`.
- Verified all 50 main test-case fake users and all 50 matching fake intake records remain present, with no unexpected fake users left after cleanup.

## 2026-07-01 - Codex (GPT-5) sample test-case utility data completion

- Imported GPT Pro utility profile patches for sample matching test cases 21-50 and added the source patch artifacts to `data/`.
- Corrected one malformed synthetic `bin_size` value for `kauai-coffee-kalaheo` by converting the descriptive text into a numeric 40-yard estimate while preserving the original description in source evidence.
- Added a merged all-50 patch artifact and re-ran the utility importer so all 50 sample users and public test cases now report imported synthetic utility data with no missing profiles.
- Promoted all 50 patched sample test cases into `gbs-users` and `gbs-client-intake` as fake client users.

## 2026-07-01 - Codex (GPT-5) GPT Pro opportunity data repair batches 9-10

- Categorized the latest pasted GPT Pro outputs as two already-imported repeats and two actionable repair batches.
- Imported batch 9 with nine new repairs from Northern Lights Inc. through Silicon Valley Power Energy Design Assistance, omitting duplicate `SOURCE_DSIRE:dsire_program_id:1939` so the newer batch 7 repair remains authoritative.
- Imported batch 10 with ten repairs from Litchfield Public Utilities through Fairmont Public Utilities, intentionally allowing newer detailed records for `SOURCE_DSIRE:dsire_program_id:2253` and `SOURCE_DSIRE:dsire_program_id:2516` to overwrite older batch 1 versions.
- Applied opportunity-data repair batches 1-10 cumulatively to the public retrofit opportunity index and sample matching fixtures, with `SOURCE_DSIRE:dsire_program_id:5136` recorded as the next continuation point.

## 2026-07-01 - Codex (GPT-5) GPT Pro opportunity data repair batch 8

- Imported eight new GPT Pro opportunity-data repairs covering CEC GFO-25-608, Duke Energy Kentucky, Rocky Mountain Power Idaho, PECO EV, SCE AP-I, Nicor Gas residential, SDG&E Rule 45, and Otter Tail Power South Dakota.
- Omitted duplicate repairs for `SOURCE_DSIRE:dsire_program_id:2639` and `SOURCE_DSIRE:dsire_program_id:1942` so the newer batch 7 repairs remain authoritative.
- Applied opportunity-data repair batches 1-8 cumulatively to the public retrofit opportunity index and sample matching fixtures, with `SOURCE_DSIRE:dsire_program_id:4198` recorded as the next continuation point.

## 2026-07-01 - Codex (GPT-5) GPT Pro opportunity data repair batch 7

- Imported the seventh GPT Pro opportunity-data repair batch for 10 opportunities, from Clark Public Utilities through Elk River Municipal Utilities residential rebates.
- Applied the newer batch 7 repairs for `SOURCE_DSIRE:dsire_program_id:4586`, `SOURCE_DSIRE:dsire_program_id:4244`, and `SOURCE_DSIRE:dsire_program_id:1939`, replacing older batch 1 versions.
- Applied opportunity-data repair batches 1-7 cumulatively to the public retrofit opportunity index and sample matching fixtures, with `SOURCE_DSIRE:dsire_program_id:2545` recorded as the next continuation point.

## 2026-07-01 - Codex (GPT-5) GPT Pro opportunity data repair batch 6

- Imported seven new GPT Pro opportunity-data repairs from the next repair output, covering Glendale Water and Power, Peoples Gas, New Ulm, Edmond Electric, Vermont Electric Cooperative, Eversource/NHSaves, and South Jersey Gas.
- Omitted duplicate repairs for `SOURCE_DSIRE:dsire_program_id:2176`, `SOURCE_DSIRE:dsire_program_id:2549`, and `SOURCE_DSIRE:dsire_program_id:4130` so the newer batch 5 repairs remain authoritative.
- Applied opportunity-data repair batches 1-6 cumulatively to the public retrofit opportunity index and sample matching fixtures, with `SOURCE_DSIRE:dsire_program_id:2639` retained as the continuation point.

## 2026-07-01 - Codex (GPT-5) GPT Pro opportunity data repair batch 5

- Imported the fifth GPT Pro opportunity-data repair batch for 10 checked opportunities, from New Hampshire Electric Co-op through Anaheim Public Utilities.
- Applied opportunity-data repair batches 1-5 cumulatively to the public retrofit opportunity index and sample matching fixtures.
- Recorded `SOURCE_DSIRE:dsire_program_id:2639` as the next GPT Pro opportunity-data repair continuation point.

## 2026-07-01 - Codex (GPT-5) sample test-case fake user batch 2

- Imported GPT Pro utility data for sample matching test cases 11-20, from `via-verde-bronx-renter-household` through `bluebird-cafe-nashville`.
- Promoted those 10 patched sample test cases into `gbs-users` and `gbs-client-intake` as fake client users with utility files and extracted values.
- Updated the sample utility import and fake-user promotion reports for the second test-case utility batch.
- Added a product TODO to surface payback period information on the test cases page.

## 2026-07-01 - Codex (GPT-5) portal retrofit recommendation timeout fix

- Identified the Portal Preview and client Retrofit Estimates HTTP 500s as Lambda timeouts at the 20-second production limit while recomputing live retrofit recommendations from a full opportunities table scan.
- Added in-memory caching and in-flight request deduping for live portal retrofit recommendations so repeated portal loads reuse the same live matcher data instead of triggering duplicate full recomputations.
- Restored the production hosting template's API Lambda headroom to 1024 MB and 60 seconds so the first uncached live recommendation build has enough time to complete safely.

## 2026-07-01 - Codex (GPT-5) sample test-case fake user promotion

- Imported GPT Pro utility data for the first 10 sample matching test cases into `data/sample_user_profiles.json` and `public/sample_matching_test_cases.json`.
- Updated the sample utility-data importer to normalize numeric utility fields that include unit suffixes, such as waste bin sizes in yards.
- Added a reusable promotion script that upserts patched sample test cases into `gbs-users` and `gbs-client-intake` as fake client users for admin portal preview workflows.
- Promoted the first 10 patched sample test cases into DynamoDB with `isFakeUser: true`.

## 2026-07-01 - Codex (GPT-5) GPT Pro opportunity data repair batch 5 prompt

- Added the next GPT Pro opportunity-data repair prompt covering target records from `SOURCE_DSIRE:dsire_program_id:2176` through `SOURCE_DSIRE:dsire_program_id:1615`.
- Included raw-URL formatting instructions to avoid the broken markdown URL fragments seen in the prior GPT Pro batch.

## 2026-06-30 - Codex (GPT-5) GPT Pro opportunity data repair batch 4

- Imported the fourth GPT Pro opportunity-data repair batch for 10 checked opportunities, including Burlington Electric, Carbon Power, Hawaii Energy, Energize Delaware, EWEB, GCEA, JEA, Mass Save, and National Grid records.
- Normalized broken markdown URL fragments from the GPT Pro response before import while preserving the structured repair decisions.
- Applied opportunity-data repair batches 1-4 cumulatively to public fixtures so batch 4 repairs are attached to matched opportunity edges.

## 2026-06-30 - Codex (GPT-5) customer retrofit estimates from live matcher

- Resolved the outstanding `src/App.tsx` merge conflict around the portal preview and estimates tab.
- Added shared live retrofit recommendation builders that reuse the same eligible-match grouping logic as the admin Test Cases flow, then exposed them through new client/admin portal recommendation endpoints.
- Replaced the Retrofit Estimates placeholder in both the user portal and Portal Preview with a simpler customer card UI that shows matched retrofit categories, matched programs, next steps, and existing estimate previews without the admin/debug scaffolding.
- Added targeted tests to verify the new portal recommendation payload stays aligned with the Test Cases-style grouped retrofit matches.

## 2026-06-30 - Codex (GPT-5) production admin allowlist repair

- Updated the live `gbs-retrofi-production` CloudFormation stack so `GBS_ADMIN_EMAILS` now includes `rshen0210@gmail.com` alongside the existing admin allowlist.
- Verified the production stack finished `UPDATE_COMPLETE` and now resolves the correct admin email parameter at runtime.

## 2026-06-30 - Codex (GPT-5) sample utility data importer

- Added a sample test-case utility-data importer that validates GPT Pro utility patches, rebuilds intake-compatible site energy profiles, patches sample profiles and public test cases, and writes an import report.
- Added a prompt generator that embeds the current sample user profiles into the GPT Pro utility-data prompt so GPT Pro has the required profile input in one copy-paste file.
- Added focused tests for utility patch imports, unknown bill-field validation, and annual/monthly reconciliation failures.

## 2026-06-30 - Codex (GPT-5) Ryan admin user correction

- Updated the production `gbs-users` record for `rshen0210@gmail.com` to `role: admin` and `isFakeUser: false`.

## 2026-06-30 - Codex (GPT-5) GPT Pro utility fixture prompt

- Added a GPT Pro prompt for generating intake-compatible synthetic utility data for all 50 sample matching test cases so they can be migrated toward real-user preview flows.

## 2026-06-30 - Codex (GPT-5) fake user classification

- Added an `isFakeUser` flag to public user records and user creation paths so seeded/demo clients can be separated from real users.
- Marked fake Green Button seed payloads with `isFakeUser: true`.
- Split the admin Users tab into separate real-user and fake-user tables.

## 2026-06-30 - Codex (GPT-5) admin raw table cleanup

- Hid the raw `gbs-users` and `gbs-client-intake` table tabs from the admin sidebar while keeping the curated `Users` and `Client Intake Summary` views.
- Removed the Client Intake Summary button that opened the raw intake table.

## 2026-06-30 - Codex (GPT-5) GPT Pro opportunity data repair batch 3

- Imported a refined GPT Pro repair for `SOURCE_DSIRE:dsire_program_id:4281`, tightening Black Hills Energy Colorado electric residential eligibility, blockers, source URLs, and category boundaries.
- Applied opportunity-data repair batches 1-3 cumulatively so the refined batch 3 record overwrites the older batch 2 version in public fixtures.
- Corrected the next local continuation point to `SOURCE_DSIRE:dsire_program_id:4636` based on the target list.

## 2026-06-30 - Codex (GPT-5) admin energy-data tab removal

- Hid the stale `gbs-energy-data` raw table from the admin sidebar because current utility uploads are surfaced through client intake records instead.

## 2026-06-30 - Codex (GPT-5) multiple incentive effects bridge

- Updated admin test-case savings previews so a matched opportunity can pass through multiple incentive rules instead of keeping only the first rule for that opportunity.
- Added recurring incentive effects to calculation traces and made incentive scenario IDs depend on rule IDs to avoid collisions when one opportunity has multiple effects.
- Updated incentive repair process notes and deterministic rule generation so future repairs can preserve non-upfront timing for recurring credits, charges, tariffs, or performance incentives.

## 2026-06-30 - Codex (GPT-5) admin preview retrofit tab blanking

- Disabled the admin client portal preview's Retrofit estimates tab content so it no longer triggers the broken retrofit-results request path.
- Kept the My information preview tab loading from the lightweight client profile endpoint.

## 2026-06-30 - Codex (GPT-5) GPT Pro opportunity data repair batch 2

- Imported the second GPT Pro opportunity-data repair batch for 10 checked opportunities, including WVPA/PowerMoves, CenterPoint Houston, Energy Smart NOLA, PECO, Pepco, Bright Energy Solutions, Springfield Utility Board, and Black Hills Energy records.
- Applied both GPT Pro repair batches cumulatively to the public opportunity index and sample matching fixtures so repaired geography, availability, eligibility, blockers, evidence, and confidence metadata stay attached to matched opportunities.
- Treated `source_inaccessible` opportunity-data repairs as uncertain availability in the importer and matching profile builder.

## 2026-06-30 - Codex (GPT-5) incentive calculation v2 foundation

- Added a parallel v2 incentive calculation module with package validation, legacy simple-rule conversion, and basic calculation support for fixed amount, per-unit, per-kW, per-kWh, percent-of-cost, recurring, expected-grant, and measure-catalog effects.
- Added migration compatibility tests that compare v2 output against current v1 behavior for known simple legacy rules without treating v1 as the long-term source of truth.
- Added a Consumers Energy-style measure-catalog test fixture covering selected measures, household quantity limits, and missing selected-measure inputs.

## 2026-06-30 - Codex (GPT-5) incentive calculation v2 design

- Added a GPT Pro-informed incentive calculation model v2 design note covering calculation packages, measure catalogs, rate tables, expected-value grants, missing inputs, stacking, migration, repair workflow, and the first safe implementation slice.
- Linked the v2 model from the product TODO backlog.

## 2026-06-30 - Codex (GPT-5) multi-batch opportunity data repairs

- Updated opportunity-data repair import tooling so future GPT Pro repair batches can be applied together from multiple JSON files while preserving existing single-file behavior.
- Updated sample matching regeneration to load multiple accepted opportunity-data repair files, with later files taking precedence for duplicate opportunity IDs.
- Added an npm script for applying opportunity-data repair batches.

## 2026-06-30 - Codex (GPT-5) product TODO planning notes

- Added a product TODO document for GPT Pro-assisted opportunity-data repair, grant estimate treatment, scenario/math verification, user-selected opportunity planning, user portal audit work, and future publish-gate automation.
- Added follow-up TODOs for fact-checking existing simple incentive rules, supporting rate-card/measure-catalog opportunity models, escalating failed automated repairs to admins, and planning future non-DSIRE source collection.
- Linked the TODO document from the product vision so future agents can find the current backlog.

## 2026-06-30 - Codex (GPT-5) portal preview timeout hardening

- Added server-side caching for opportunity table loads, per-day opportunity match profiles, and per-intake retrofit result payloads so admin portal previews and debug panels do not recompute the full opportunity universe on every request.
- Updated the admin portal preview UI to keep showing the selected client identity on failures instead of falling back to the signed-in admin account, and added a clearer timeout-oriented error message for HTTP 500 preview failures.
- Raised the production API Lambda configuration in infrastructure code from 512 MB / 20 s to 1024 MB / 60 s so heavy retrofit calculations have enough CPU and timeout headroom in production.

## 2026-06-30 - Codex (GPT-5) admin portal preview date normalization

- Fixed the admin portal preview crash where retrofit matching received `now` as a string and attempted to call `getTime()` on it.
- Hardened the retrofit-results builder so it normalizes either `Date` or ISO-string inputs before filtering opportunity availability or generating preview timestamps.

## 2026-06-29 - Codex (GPT-5) restart handoff

- Added a restart handoff document summarizing completed availability, incentive-rule, savings-model, UI, deployment, and opportunity-data repair work.
- Captured remaining next steps, including the goal of repairing all matching opportunities to complete source-backed data confidence.

## 2026-06-29 - Codex (GPT-5) GPT Pro opportunity data repair batch 1

- Imported the first GPT Pro opportunity-data repair batch for 20 checked opportunities and preserved source-backed geography, applicant, retrofit category, requirement, blocker, and evidence fields.
- Added a repeatable opportunity-data repair importer and wired sample matching generation to load the repair artifact before extracting match profiles.
- Refreshed public admin fixtures so the repaired data is attached to matching/test opportunity summaries, including uncertain status for source-inaccessible or temporarily closed records.

## 2026-06-29 - Codex (GPT-5) Codex opportunity data baseline repairs

- Ran a Codex source-fetch and deterministic inference pass for the 75 GPT Pro opportunity-data repair targets.
- Saved baseline facility, utility, and combined opportunity-data repair artifacts for later comparison against GPT Pro output.

## 2026-06-29 - Codex (GPT-5) opportunity data repair targets

- Generated a focused GPT Pro input file with 75 active or rolling opportunities prioritized for opportunity-data confidence repair.

## 2026-06-29 - Codex (GPT-5) savings estimate equation layout

- Replaced duplicate savings metric and ledger cards with three compact equation cards: one-time costs/savings, recurring monthly costs/savings, and possible grant money.
- Styled savings as green positive lines and costs/fees as red negative lines, with net labels changing between cost/gain or fee/savings based on sign.

## 2026-06-29 - Codex (GPT-5) NEVI possible grant money rules

- Added 25 NEVI-style `possible_grant` rules using the 80% eligible project cost federal-share cap for solicitation-specific EV charging grants.
- Kept possible grant money separate from deterministic one-time savings so it does not reduce upfront after-savings cost.
- Refreshed admin test-case savings previews so 18 existing EV charging previews now show possible grant money.

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

## 2026-06-29 - Codex (GPT-5) first end-to-end retrofit calculation pipeline

- Added the first client-specific retrofit calculation pipeline, including normalized incentive summaries, calculation requirements, project-cost benchmarks, missing-info detection, and first-pass savings/payback/ROI estimates built from matched opportunities plus uploaded utility data.
- Added new backend routes for signed-in client portal retrofit results and admin client retrofit debug results, without mutating intake or opportunity records.
- Added a new user-portal `Retrofit estimates` workspace tab plus focused Vitest coverage for electric, water, incentive-only, financing, missing-cost, and zero-savings edge cases.
- Updated the production deploy packaging to include the calculator data files and to reuse the existing Google client secret when the deploy shell does not provide a fresh one.
- Fixed the production API health route to return the configured AWS data region instead of crashing on an undefined variable in Lambda.
- Added a temporary admin-only `/portal-preview?userId=...` route plus `Open portal preview` actions in Client Intake Summary so admins can inspect a specific client portal without separate client login.
- Updated Client Intake Summary so client rows are explicitly selectable, the selected row stays highlighted, and a floating portal-preview popup appears after selection instead of relying on an always-visible page-level action.

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

# 2026-07-01

- Reworked the existing Retrofit Recommendations preview into a horizontal retrofit-tab workflow with one active retrofit detail panel instead of a page-level scenario dashboard.
- Moved scenario comparison into the active retrofit, added scoped accordion sections for financial breakdown, estimate inclusion, opportunities, operating savings, assumptions, details, and missing information, and kept opportunity/operating-savings separation.
- Cleaned the customer-facing copy in the preview flow, added grouped expandable opportunity rows with direct source links, and updated the focused preview tests for the tabbed hierarchy.
- Collapsed the admin test-profile controls, added an active-retrofit mini sub-navigation, compact section summaries, and an application-prep drawer so the preview reads as a guided workspace instead of a long data dump.
- Fixed preview layout regressions where selected-scenario detail labels collided with long values, retrofit tabs were too tall, and negative recurring impacts could be labeled as annual savings.
- Added the one-retrofit-at-a-time current plan flow to the preview, including local add-to-plan state, recalculation-not-available messaging, guarded tab switching for unconfirmed selections, and a sticky active-retrofit action bar.
- Tightened the Retrofit Recommendations preview for deployment readiness by removing dark-green hover/header states from non-CTA UI, moving the add-to-plan strip directly after Financials, making selected-scenario details compact rows, and adding solar/biomass-specific detail questions.
