# AI Changelog

## 2026-06-22 - Codex (GPT-5) RetroFi logo and hover polish

- Added the uploaded RetroFi logo asset to the public site header/footer branding and browser favicon.
- Changed the About dropdown so hovering over the trigger area opens the menu without a click and keeps it open while moving into Mission or Team.

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
