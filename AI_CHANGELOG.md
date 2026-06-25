# AI Changelog

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
