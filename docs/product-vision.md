# Green Business Solution Product Vision

This document is the shared product source of truth for Codex sessions and other AI agents working on the Green Business Solution website. Keep it updated as product decisions are made.

## End Goal

Green Business Solution should help businesses identify relevant sustainability, energy-efficiency, rebate, incentive, and implementation opportunities from a small amount of business and site information.

The long-term experience should move from:

1. Business intake
2. Initial opportunity preview
3. Utility bill upload
4. Opportunity ranking
5. Savings estimates
6. Implementation plan

The product should feel useful immediately after intake, before asking for more documents.

## Target User

The intake form is likely filled out by a business owner, site manager, property manager, or operations lead. The form should prioritize the company and site over the individual person.

Personal contact information is still needed, but it should not be the first thing the user is asked for.

## Current Website Flow

1. User lands on the public website.
2. User clicks the primary get-started action.
3. User completes a business-first intake form.
4. The app saves the intake data to DynamoDB through the local/API backend.
5. The user receives or enters a temporary code for the portal flow.
6. Admin users can inspect intake records and data tables.

## Intake Form Direction

The intake form should be company-first and low-friction.

Current section order:

1. Business Information
2. Site Information
3. Contact Information

Removed sections:

- Opportunity Priorities was removed because those questions were not important enough for the first intake pass.

Current required fields:

- Company name
- Organization type
- Site address
- Electric utility provider
- Ownership status
- Building type
- Square footage
- Interested improvements
- Email

Current optional fields:

- Website
- Organization size
- Full name
- Phone
- Role/title
- Preferred contact

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

- `Create My Plan`

Privacy cue:

- Show a small lock icon above the submit button.
- Visible text: `Private & Secure`
- Hover/focus tooltip: `Your information stays private. We use it only to personalize your recommendations.`

The lock icon should not be inside the submit button. It should sit separately in the whitespace above the button so it is not conflated with the action.

## Post-Submit Opportunity Experience

After intake submission, the next planned product direction is an opportunity preview page.

The page should show initial opportunities based on the business and site information. It should not require utility bills before showing anything useful.

Planned page concept:

- Header: `Your Initial Opportunities`
- Supporting copy: Based on the business and site information, these are the areas Green Business Solution will evaluate first.
- Opportunity cards for likely categories such as LED upgrades, HVAC, refrigeration, solar, EV charging, water efficiency, and building controls.
- Each card can show relevance, why it may apply, and what data is needed next.

Utility bill upload should be the next step after the preview:

- Prompt users to upload multiple utility bills.
- Bills will support rankings, savings estimates, and implementation planning.
- Upload should support multiple files, starting with PDFs and images.

The utility bill step should unlock deeper analysis rather than blocking the initial opportunity preview.

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
