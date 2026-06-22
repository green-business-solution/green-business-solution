# Retrofi Product Vision

This document is the shared product source of truth for Codex sessions and other AI agents working on the Retrofi website. Keep it updated as product decisions are made.

## End Goal

Retrofi is a B2B sustainability retrofit platform for medium-sized businesses. It helps businesses identify eligible sustainability incentives, estimate potential savings, and create a clear retrofit roadmap.

Retrofi should feel like a serious, clean, business-focused energy and retrofit advisory platform. It is not just a rebate database, a government portal, an ESG reporting dashboard, a nonprofit awareness page, or a consumer solar quote site.

The long-term experience should move from:

1. Business intake
2. Initial opportunity preview
3. Utility bill upload
4. Opportunity ranking
5. Savings estimates
6. Implementation plan

The product should feel useful immediately after intake, before asking for more documents.

## Public Website Direction

Production website:

- `https://retrofi.org`

The public site should guide a business visitor to click `Create Free Scan`, fill out the scan form, and land on a separate scan results/opportunity preview page.

Design direction:

- Clean Arcadia-inspired B2B energy-platform feel.
- Polished climate-tech spacing and cards, without feeling like ESG reporting software.
- Practical estimate/eligibility flow inspired by business clean-energy and savings calculators.
- Off-white/warm gray background, deep evergreen primary actions, pale green/blue-green accents, subtle borders, soft shadows, and rounded cards.
- Use dashboard/report mockups and business facility language rather than nature imagery or cartoon illustrations.

Primary CTA:

- `Create Free Scan`

Secondary CTA:

- `See How It Works`

Do not use `Request Demo` as the primary CTA.

Final top navigation:

- Left: Retrofi logo
- Center: `How It Works`, `Pricing`, `For Businesses`, `About` dropdown
- Right: `Sign In`, `Create Free Scan`

Current public URL structure:

- `/` = Home
- `/how-it-works` = full process explanation
- `/pricing` = project-based pricing
- `/for-businesses` = business type fit
- `/about` = about overview hub
- `/about/mission` = mission
- `/about/team` = team
- `/about/trust` = trust and data
- `/about/contact` = contact
- `/scan` = free scan intake form
- `/scan/results` = scan results placeholder
- `/sign-in` = report/dashboard sign-in

Current public page direction:

- Home keeps the strongest gradient hero.
- Secondary pages should use lighter, more compact hero sections rather than repeating the full homepage treatment.
- Section spacing should stay spacious but tighter and more consistent than the first rebuild pass.
- About content should be split into an overview hub plus focused subpages instead of one crammed page.

## Target User

The intake form is likely filled out by a business owner, site manager, property manager, or operations lead. The form should prioritize the company and site over the individual person.

Personal contact information is still needed, but it should not be the first thing the user is asked for.

## Current Website Flow

1. User lands on the public website.
2. User clicks `Create Free Scan`.
3. User completes a business-first intake form.
4. The app saves the intake data to DynamoDB through the local/API backend.
5. After intake save, the app routes to `/scan/results`.
6. `/scan/results` currently shows a clean placeholder that the free scan is being prepared.
7. `Sign In` leads to Google-backed report/dashboard access.
8. Admin users can inspect intake records and data tables.

Legacy `/get-started` should continue routing to `/scan` for compatibility.

## Intake Form Direction

The intake form should be company-first and low-friction.

Current section order:

1. Business Information
2. Site Information
3. Contact Information

Removed sections:

- Opportunity Priorities was removed because those questions were not important enough for the first intake pass.

Current required fields:

- Contact name
- Email
- Company name
- Organization type
- Site address
- Electric utility provider
- Ownership status
- Building type
- Square footage
- Interested improvements

Current optional fields:

- Website
- Organization size
- Phone
- Anything else we should know?

Industry was removed from the visible form. Older stored records may still contain an industry value, but new users should not be asked for it.

## Organization Type Options

Use these options for Organization type:

- Commercial Business
- Industrial Facility
- Agricultural Operation
- Multifamily Property
- Nonprofit Organization
- Government / Public Agency
- Other

## Intake Header And Privacy

Current intake header:

- Heading: `Tell us about your business`
- Subheader: `We'll use this information to tailor your recommendations.`

The required-fields note belongs in the form header row, aligned with the first section heading:

- `Required fields are marked with *`

The submit CTA should be:

- `Create Free Scan`

After the user clicks `Create Free Scan`, the app should save the intake record first, then route to:

- `/scan/results`

Privacy line:

- Show a small lock icon above the submit button with the visible text:
- `Your information is kept private and used only to prepare your recommendations.`

The lock icon should not be inside the submit button. It should sit separately in the whitespace above the button so it is not conflated with the action.

## Post-Submit Opportunity Experience

After intake submission, the current next page is `/scan/results`.

Current placeholder content:

- Title: `Your free scan is being prepared`
- Supporting copy: `Retrofi is reviewing your business and site information to identify likely incentive and retrofit opportunities.`
- Placeholder cards:
  - Estimated opportunity range: `Coming soon`
  - Likely categories: `Pending analysis`
  - Recommended next step: `Upload utility bills for detailed savings and ROI`

Later planned page concept:

- Header: `Your Initial Opportunities`
- Supporting copy: Based on the business and site information, these are the areas Retrofi will evaluate first.
- Opportunity cards for likely categories such as LED upgrades, HVAC, refrigeration, solar, EV charging, water efficiency, and building controls.
- Each card can show relevance, why it may apply, and what data is needed next.

Utility bill upload should be the next step after the preview:

- Prompt users to upload multiple utility bills.
- Bills will support rankings, savings estimates, and implementation planning.
- Upload should support multiple files, starting with PDFs and images.

The utility bill step should unlock deeper analysis rather than blocking the initial opportunity preview.

## About Structure

About should now work as a trust hub rather than a single long company page.

Current About architecture:

- `/about` = overview page with cards linking to the subpages
- `/about/mission` = problem, mission, and beliefs
- `/about/team` = founder/team cards
- `/about/trust` = trust and data-use explanations
- `/about/contact` = contact email and simple contact form

Footer company links should point to these About subpages instead of repeating long company copy inline.

## Data Storage

All user-filled intake information should be stored in DynamoDB through the backend API.

Current DynamoDB tables are documented in `docs/data-model.md`.

Important compatibility note:

- Keep existing intake storage keys stable unless a migration plan is added.
- Removed visible form fields may still exist in the intake record schema for compatibility with older records.
- Optional blank fields should not block submission.

## Opportunity Database Direction

The long-term opportunity/rebate/incentive database plan is documented in `docs/rebate_tax_incentive_database_instructions.md`.

Current direction:

- Use DynamoDB prototype opportunity-candidate storage for gathered source records.
- Design a normalized relational opportunity database later for matching, ranking, eligibility, geography, utility, business classification, and program details.
- Keep human review and auditability for opportunity ingestion.

## Agent Coordination

Agents should update this document whenever product behavior, user flow, required fields, post-submit flow, privacy messaging, or opportunity-ranking direction changes.

If a change is implementation-only and does not affect product direction, update `AI_CHANGELOG.md` but this file may not need changes.

If a decision affects how the website should work or what the business goal is, update this file in the same commit as the code change.
