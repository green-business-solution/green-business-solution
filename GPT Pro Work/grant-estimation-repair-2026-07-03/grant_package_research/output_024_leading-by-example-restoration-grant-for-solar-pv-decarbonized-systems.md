{
"schemaVersion": "retrofi_grant_package_repair.v1",
"researchedAt": "2026-07-03",
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22770",
"programName": "Leading By Example Restoration Grant for Solar PV & Decarbonized Systems",
"status": "suppress_no_probability_evidence",
"sourceConfidence": "medium",
"estimateConfidenceIfInputsPresent": "low",
"officialSources": [
{
"title": "Leading By Example Restoration Grant for Solar PV & Decarbonized Systems",
"url": "[https://www.mass.gov/info-details/leading-by-example-restoration-grant-for-solar-pv-decarbonized-systems](https://www.mass.gov/info-details/leading-by-example-restoration-grant-for-solar-pv-decarbonized-systems)",
"owner": "Massachusetts Department of Energy Resources / Leading by Example",
"accessed": "2026-07-03",
"evidenceText": "Official Mass.gov indexed text states that the Restoration Program supports existing solar PV and decarbonized-system restoration; systems or equipment to be repaired or replaced must be Commonwealth-owned; total program funding is $5,000,000; maximum per individual project is $500,000; maximum per individual entity is $1,500,000; applications are accepted and reviewed on a rolling basis until funds are exhausted; and grant requests may cover up to 100% of eligible costs. ([Massachusetts Government][1])"
},
{
"title": "COMMBUYS Bid Solicitation BD-25-1041-ENE01-ENE01-109288",
"url": "[https://www.commbuys.com/bso/external/bidDetail.sdo?docId=BD-25-1041-ENE01-ENE01-109288&external=true&parentUrl=bid](https://www.commbuys.com/bso/external/bidDetail.sdo?docId=BD-25-1041-ENE01-ENE01-109288&external=true&parentUrl=bid)",
"owner": "Commonwealth of Massachusetts COMMBUYS / Department of Energy Resources",
"accessed": "2026-07-03",
"evidenceText": "COMMBUYS lists the bid as 'LBE Restoration Grant Program for Solar and Decarbonized Systems (PON-ENE-2025-007),' with Department of Energy Resources as purchaser/organization, Bid Type OPEN, bid opening date 06/30/2027 12:00:00 AM, electronic quote allowed, and file attachments for the PON and application form. ([Commbuys][2])"
},
{
"title": "Leading by Example Grants",
"url": "[https://www.mass.gov/leading-by-example-grants](https://www.mass.gov/leading-by-example-grants)",
"owner": "Massachusetts Department of Energy Resources / Leading by Example",
"accessed": "2026-07-03",
"evidenceText": "The official Mass.gov LBE grants page describes Leading by Example grant programs for state entities seeking funding for clean energy or sustainability projects. ([Massachusetts Government][3])"
}
],
"sourceSummary": "Official administrator sources show an open, rolling Massachusetts DOER/Leading by Example grant opportunity for eligible state entities restoring existing Commonwealth-owned solar PV or decarbonized systems. The published value is a maximum request framework, not a guaranteed entitlement: up to 100% of eligible costs, subject to a $500,000 per-project cap, $1,500,000 per-entity cap, $5,000,000 total program budget, funds remaining, and DOER award approval. No official probability anchor, historical application count, award count, success rate, remaining budget, or expected award count was found. Repair prompt context: ",
"packagePatch": {
"calculation_status": "calculable_with_missing_inputs",
"availability": {
"status": "rolling",
"fundingStatus": "open_while_funds_last"
},
"input_requirements_to_add_or_update": [
{
"input_key": "applicant_is_massachusetts_state_entity",
"label": "Applicant is an eligible Massachusetts state entity",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_753c755368588c1b"
],
"source_precedence": [
"user_profile",
"admin_research",
"application_status"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "applicant_entity_name",
"label": "Applicant entity name",
"value_type": "text",
"required_for": [
"effect_grant_expected_value_1_753c755368588c1b"
],
"source_precedence": [
"user_profile",
"application_status"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "commonwealth_owned_system_or_equipment",
"label": "System or equipment to be repaired/replaced is Commonwealth-owned",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_753c755368588c1b"
],
"source_precedence": [
"user_profile",
"admin_research",
"application_status"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "eligible_restoration_scope",
"label": "Eligible restoration scope for existing solar PV or decarbonized system",
"value_type": "enum",
"allowed_values": [
"existing_solar_pv_repair_or_replacement",
"existing_decarbonized_system_repair_or_replacement",
"solar_panel_disposal_or_recycling_related_to_restoration",
"unknown_or_not_eligible"
],
"required_for": [
"effect_grant_expected_value_1_753c755368588c1b"
],
"source_precedence": [
"quote",
"retrofit_assumptions",
"application_status",
"admin_research"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "eligible_project_cost_cents",
"label": "Eligible project cost in cents",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_753c755368588c1b"
],
"source_precedence": [
"quote",
"retrofit_assumptions",
"application_status"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "entity_prior_or_committed_awards_cents",
"label": "Prior or committed awards under this program for the applicant entity",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_753c755368588c1b"
],
"source_precedence": [
"application_status",
"admin_research",
"user_profile"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "entity_remaining_cap_cents",
"label": "Remaining entity cap in cents",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_753c755368588c1b"
],
"source_precedence": [
"server_derived",
"application_status",
"admin_research"
],
"missing_severity": "blocks_calculation",
"derivation": "max(0, 150000000 - entity_prior_or_committed_awards_cents)"
},
{
"input_key": "program_funds_remaining_confirmed_cents",
"label": "Confirmed remaining program funds in cents",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_753c755368588c1b"
],
"source_precedence": [
"admin_research",
"application_status"
],
"missing_severity": "blocks_user_facing_estimate"
},
{
"input_key": "award_approval_status",
"label": "DOER award approval status",
"value_type": "enum",
"allowed_values": [
"not_applied",
"submitted",
"under_review",
"approved",
"denied",
"unknown"
],
"required_for": [
"effect_grant_expected_value_1_753c755368588c1b"
],
"source_precedence": [
"application_status",
"admin_research",
"user_profile"
],
"missing_severity": "blocks_user_facing_estimate"
},
{
"input_key": "approved_award_amount_cents",
"label": "Official approved award amount in cents",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_753c755368588c1b"
],
"source_precedence": [
"application_status",
"admin_research"
],
"missing_severity": "blocks_user_facing_estimate"
},
{
"input_key": "reimbursement_or_payment_status",
"label": "Reimbursement or payment status",
"value_type": "enum",
"allowed_values": [
"not_started",
"claim_submitted",
"reimbursement_approved",
"paid",
"unknown"
],
"required_for": [
"effect_grant_expected_value_1_753c755368588c1b"
],
"source_precedence": [
"application_status",
"admin_research"
],
"missing_severity": "does_not_block_approved_award_value_but_blocks_cash_timing"
}
],
"effects_to_add_or_update": [
{
"effect_id": "effect_grant_expected_value_1_753c755368588c1b",
"effect_type": "grant_expected_value",
"cash_value_classification": "cash_grant",
"value_model_kind": "competitive_cost_share",
"calculation": {
"method": "expected_value",
"amount_cents": null,
"percent": null,
"conditional_award_cents": null,
"conditional_award_formula": "Do not calculate a user-facing expected value from the published up-to-100% language. Before DOER approval, the only defensible runtime value is a suppressed upper-bound request amount: min(eligible_project_cost_cents, 50000000, entity_remaining_cap_cents, program_funds_remaining_confirmed_cents if confirmed). After official DOER approval, conditional_award_cents may be set only from the official approved_award_amount_cents, capped as min(approved_award_amount_cents, eligible_project_cost_cents, 50000000, entity_remaining_cap_cents). Expected value remains null unless a source-backed probability_discount is later added by human review.",
"max_award_cents": 50000000,
"min_award_cents": null,
"rate_rows": [
{
"row_type": "published_maximum_request_basis",
"eligible_scope": "existing Commonwealth-owned solar PV or decarbonized-system restoration",
"published_max_percent_of_eligible_cost": 1.0,
"per_project_cap_cents": 50000000,
"per_entity_cap_cents": 150000000,
"total_program_funding_cents": 500000000,
"notes": "This row is an upper-bound request constraint only. It is not a guaranteed award formula and must not be used in user-facing savings totals without official award approval."
}
],
"probability_discount": null,
"probability_evidence_type": "eligibility_only"
},
"required_inputs": [
"applicant_is_massachusetts_state_entity",
"applicant_entity_name",
"commonwealth_owned_system_or_equipment",
"eligible_restoration_scope",
"eligible_project_cost_cents",
"entity_prior_or_committed_awards_cents",
"entity_remaining_cap_cents",
"program_funds_remaining_confirmed_cents",
"award_approval_status",
"approved_award_amount_cents",
"reimbursement_or_payment_status"
],
"missing_input_behavior": "suppress_until_review",
"includedInUserFacingTotalDefault": false,
"humanReviewRequired": true,
"reasonCodes": [
"state_entity_only",
"commonwealth_owned_system_required",
"restoration_scope_only",
"up_to_amount_not_guaranteed",
"rolling_grant_approval_required",
"funding_remaining_unknown",
"missing_probability_anchor",
"approved_award_amount_required",
"exclude_from_user_facing_total_default"
],
"calculationTrace": [
"Confirm the applicant is an eligible Massachusetts state entity.",
"Confirm the system or equipment to be repaired or replaced is Commonwealth-owned.",
"Confirm the project restores an existing solar PV or decarbonized system rather than installing an unrelated new system.",
"Compute only a suppressed pre-approval upper-bound request amount: min(eligible_project_cost_cents, 50000000, entity_remaining_cap_cents, confirmed remaining funds if available).",
"Do not treat the published up-to-100% language as a guaranteed award rate.",
"Do not calculate expected value because no official probability discount, success rate, historical applications, historical awards, expected awards, or remaining-budget evidence was found.",
"If an official DOER award approval exists, use approved_award_amount_cents as the conditional cash grant value, capped by eligible cost, the $500,000 per-project cap, and remaining $1,500,000 per-entity cap.",
"Exclude the incentive from user-facing savings totals by default unless human review confirms official award approval and a payable award amount."
]
}
]
},
"testCaseInputHints": [
{
"inputKey": "applicant_is_massachusetts_state_entity",
"valueType": "boolean",
"whoProvides": "user",
"realisticDefaultGuidance": "Default to false unless the applicant is a Massachusetts state entity eligible under the LBE program."
},
{
"inputKey": "commonwealth_owned_system_or_equipment",
"valueType": "boolean",
"whoProvides": "user",
"realisticDefaultGuidance": "Default to false unless ownership documentation confirms the system or equipment is Commonwealth-owned."
},
{
"inputKey": "eligible_restoration_scope",
"valueType": "enum",
"whoProvides": "quote",
"realisticDefaultGuidance": "Use 'unknown_or_not_eligible' unless the project scope is clearly repair/replacement/restoration of an existing solar PV or decarbonized system."
},
{
"inputKey": "eligible_project_cost_cents",
"valueType": "money_cents",
"whoProvides": "quote",
"realisticDefaultGuidance": "Use the eligible cost subtotal only, not total project cost including ineligible work."
},
{
"inputKey": "entity_prior_or_committed_awards_cents",
"valueType": "money_cents",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Use 0 only if administrator records confirm no prior or committed awards for the same entity under this program."
},
{
"inputKey": "entity_remaining_cap_cents",
"valueType": "money_cents",
"whoProvides": "server_derived",
"realisticDefaultGuidance": "Calculate as max(0, 150000000 - entity_prior_or_committed_awards_cents)."
},
{
"inputKey": "program_funds_remaining_confirmed_cents",
"valueType": "money_cents",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "Leave null unless DOER or COMMBUYS confirms funds remain available for new approvals."
},
{
"inputKey": "award_approval_status",
"valueType": "enum",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Default to 'unknown' or 'not_applied'; do not assume approval from eligibility."
},
{
"inputKey": "approved_award_amount_cents",
"valueType": "money_cents",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Leave null until an official DOER award letter, contract, or approval notice states the award amount."
},
{
"inputKey": "reimbursement_or_payment_status",
"valueType": "enum",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Use to model timing only; approved award amount is still required for cash value."
}
],
"remainingGaps": [
"The full Mass.gov program page returned a 403 error in direct browsing; administrator snippets and COMMBUYS were accessible, so source confidence is medium rather than high.",
"COMMBUYS lists the official PON and application form attachments, but the browser extract did not expose attachment contents for detailed eligible/ineligible cost rules.",
"No official historical application count, award count, success rate, scoring-to-award conversion, or expected award count was found.",
"The total program budget is published as $5,000,000, but current remaining funds were not found.",
"The published up-to-100% value is a maximum request basis, not a guaranteed award percentage.",
"Actual grant value requires project-specific DOER approval and an official approved award amount."
],
"doNotUseAsUserFacingEstimateReasons": [
"Award is subject to rolling DOER review and approval.",
"Funding is available only while program funds last, and current remaining funds are unknown.",
"The source states a maximum/up-to value, not a guaranteed rate.",
"No defensible probability discount or success-rate evidence was found.",
"Eligibility is limited to Massachusetts state entities with Commonwealth-owned existing systems/equipment and eligible restoration scope.",
"Use only an official approved_award_amount_cents for any nonzero user-facing value."
]
}

[1]: https://www.mass.gov/info-details/leading-by-example-restoration-grant-for-solar-pv-decarbonized-systems?utm_source=chatgpt.com "Leading By Example Restoration Grant for Solar PV & ..."
[2]: https://www.commbuys.com/bso/external/bidDetail.sdo?docId=BD-25-1041-ENE01-ENE01-109288&external=true&parentUrl=bid "COMMBUYS - Bid Solicitation - BD-25-1041-ENE01-ENE01-109288"
[3]: https://www.mass.gov/leading-by-example-grants?utm_source=chatgpt.com "Leading by Example Grants"

