{
"schemaVersion": "retrofi_grant_package_repair.v1",
"researchedAt": "2026-07-03",
"opportunityId": "SOURCE_SDGE_BUSINESS:program_url:sdge_com_node_23891",
"programName": "National Electric Vehicle Infrastructure (NEVI) Program",
"status": "suppress_no_probability_evidence",
"sourceConfidence": "high",
"estimateConfidenceIfInputsPresent": "low",
"officialSources": [
{
"title": "National Electric Vehicle Infrastructure (NEVI) Program",
"url": "[https://www.sdge.com/business/electric-vehicles/nevi](https://www.sdge.com/business/electric-vehicles/nevi)",
"owner": "San Diego Gas & Electric",
"accessed": "2026-07-03",
"evidenceText": "SDG&E describes customer support for the NEVI application process and directs applicants to CEC for eligibility and solicitation information; it does not state a direct SDG&E cash rebate or grant amount."
},
{
"title": "GFO-25-603 - California's National Electric Vehicle Infrastructure Formula Program - Solicitation 6 Community Charging",
"url": "[https://www.energy.ca.gov/solicitations/2026-02/gfo-25-603-californias-national-electric-vehicle-infrastructure-formula](https://www.energy.ca.gov/solicitations/2026-02/gfo-25-603-californias-national-electric-vehicle-infrastructure-formula)",
"owner": "California Energy Commission",
"accessed": "2026-07-03",
"evidenceText": "CEC lists GFO-25-603 as an active competitive grant solicitation with a submission deadline of October 16, 2026, and up to 7900000000 cents available."
},
{
"title": "00_GFO-25-603_Solicitation_Manual_Addendum_02_ada.docx",
"url": "[https://www.energy.ca.gov/sites/default/files/2026-07/00_GFO-25-603_Solicitation_Manual_Addendum_02_ada.docx](https://www.energy.ca.gov/sites/default/files/2026-07/00_GFO-25-603_Solicitation_Manual_Addendum_02_ada.docx)",
"owner": "California Energy Commission",
"accessed": "2026-07-03",
"evidenceText": "The current manual states 7900000000 cents is available, one application may include 1-20 stations, the current applicant cap is 0.35 of available funds, match is exactly 0.2, applications are screened and scored, and ranking is by Cost-per-CCS-Port."
},
{
"title": "GFO-25-603_Addendum_02_Cover_Letter_ada.docx",
"url": "[https://www.energy.ca.gov/sites/default/files/2026-07/GFO-25-603_Addendum_02_Cover_Letter_ada.docx](https://www.energy.ca.gov/sites/default/files/2026-07/GFO-25-603_Addendum_02_Cover_Letter_ada.docx)",
"owner": "California Energy Commission",
"accessed": "2026-07-03",
"evidenceText": "Addendum 2 is dated July 2, 2026, updates ECAMS start timing, sets the application deadline to October 16, 2026, and moves the anticipated NOPA to the week of January 11, 2027."
},
{
"title": "GFO-25-603_Questions_and_Answers_Round_1_ada.docx",
"url": "[https://www.energy.ca.gov/sites/default/files/2026-06/GFO-25-603_Questions_and_Answers_Round_1_ada.docx](https://www.energy.ca.gov/sites/default/files/2026-06/GFO-25-603_Questions_and_Answers_Round_1_ada.docx)",
"owner": "California Energy Commission",
"accessed": "2026-07-03",
"evidenceText": "CEC confirms awards are determined through a competitive, scored evaluation process; Q&A also states awardees may invoice monthly or quarterly as eligible costs are incurred."
},
{
"title": "Federal EV Infrastructure Programs",
"url": "[https://www.energy.ca.gov/programs-and-topics/programs/federal-ev-infrastructure-programs](https://www.energy.ca.gov/programs-and-topics/programs/federal-ev-infrastructure-programs)",
"owner": "California Energy Commission",
"accessed": "2026-07-03",
"evidenceText": "CEC identifies California NEVI as an IIJA-funded program implemented with Caltrans and links the GFO-25-603 solicitation and California NEVI map resources."
}
],
"sourceSummary": "Uploaded package context reviewed from the provided prompt.  SDG&E is not offering a direct charger rebate or cash grant on its NEVI page; it is providing application-process support and routing customers to CEC. The monetary opportunity is CEC GFO-25-603, an active competitive solicitation. Conditional reimbursement can be described as an up-to-0.8 CEC reimbursable share of allowable project cost, subject to the current 2765000000-cent applicant cap and any CEC-approved partial award or cap change, but no automated expected value is defensible because official materials provide scoring/ranking criteria, not application counts, expected award counts, or a success-rate denominator.",
"packagePatch": {
"calculation_status": "calculable_with_missing_inputs",
"availability": {
"status": "active",
"fundingStatus": "open_funds_available"
},
"input_requirements_to_add_or_update": [
{
"input_key": "application_status",
"label": "CEC application or award status",
"value_type": "enum",
"required_for": [
"effect_grant_expected_value_2_78ea28615e9acd08"
],
"allowed_values": [
"not_started",
"submitted",
"screening_passed",
"technical_score_passed",
"proposed_award",
"approved_by_cec_business_meeting",
"agreement_executed",
"fhwa_e76_authorized",
"not_selected"
],
"source_precedence": [
"program_application",
"admin_research",
"user_profile"
],
"missing_severity": "blocks_user_facing_estimate"
},
{
"input_key": "approved_award_amount_cents",
"label": "CEC approved or proposed award amount",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_2_78ea28615e9acd08"
],
"source_precedence": [
"program_application",
"admin_research",
"cec_notice_of_proposed_awards",
"grant_agreement"
],
"missing_severity": "blocks_user_facing_estimate"
},
{
"input_key": "eligible_allowable_project_cost_cents",
"label": "Eligible allowable project cost after exclusions",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_2_78ea28615e9acd08"
],
"source_precedence": [
"quote",
"program_application",
"retrofit_assumptions",
"admin_research"
],
"missing_severity": "blocks_conditional_formula"
},
{
"input_key": "match_share_percent",
"label": "Total match share as a fraction of total allowable project cost",
"value_type": "number",
"required_for": [
"effect_grant_expected_value_2_78ea28615e9acd08"
],
"source_precedence": [
"program_application",
"quote",
"accountant"
],
"missing_severity": "blocks_eligibility_check"
},
{
"input_key": "cash_match_share_percent_of_match",
"label": "Cash match share fraction of total match share",
"value_type": "number",
"required_for": [
"effect_grant_expected_value_2_78ea28615e9acd08"
],
"source_precedence": [
"program_application",
"accountant",
"quote"
],
"missing_severity": "blocks_eligibility_check"
},
{
"input_key": "station_count",
"label": "Number of proposed EV charging stations",
"value_type": "number",
"required_for": [
"effect_grant_expected_value_2_78ea28615e9acd08"
],
"source_precedence": [
"quote",
"program_application",
"retrofit_assumptions"
],
"missing_severity": "blocks_eligibility_check"
},
{
"input_key": "number_of_ccs_ports",
"label": "Total number of proposed CCS charging ports",
"value_type": "number",
"required_for": [
"effect_grant_expected_value_2_78ea28615e9acd08"
],
"source_precedence": [
"quote",
"program_application",
"retrofit_assumptions"
],
"missing_severity": "blocks_cost_rank_context"
},
{
"input_key": "ccs_ports_per_station",
"label": "CCS charging ports per proposed station",
"value_type": "array",
"required_for": [
"effect_grant_expected_value_2_78ea28615e9acd08"
],
"source_precedence": [
"quote",
"program_application",
"retrofit_assumptions"
],
"missing_severity": "blocks_eligibility_check"
},
{
"input_key": "station_locations_within_one_mile_of_afc",
"label": "Each station is within one driving mile of an eligible Alternative Fuel Corridor exit or intersection",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_2_78ea28615e9acd08"
],
"source_precedence": [
"server_derived",
"admin_research",
"program_application"
],
"missing_severity": "blocks_eligibility_check"
},
{
"input_key": "applicant_eligibility_status",
"label": "Applicant eligibility status under GFO-25-603",
"value_type": "enum",
"required_for": [
"effect_grant_expected_value_2_78ea28615e9acd08"
],
"allowed_values": [
"eligible_private_entity",
"eligible_california_tribal_organization",
"ineligible_investor_owned_utility",
"unknown"
],
"source_precedence": [
"user_profile",
"program_application",
"admin_research"
],
"missing_severity": "blocks_eligibility_check"
},
{
"input_key": "active_cec_zev_infrastructure_projects_count",
"label": "Active CEC-funded zero-emission vehicle infrastructure projects held by applicant",
"value_type": "number",
"required_for": [
"effect_grant_expected_value_2_78ea28615e9acd08"
],
"source_precedence": [
"program_application",
"admin_research",
"user_profile"
],
"missing_severity": "blocks_eligibility_check"
},
{
"input_key": "agreement_executed",
"label": "CEC grant agreement executed",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_2_78ea28615e9acd08"
],
"source_precedence": [
"program_application",
"admin_research"
],
"missing_severity": "blocks_reimbursement_estimate"
},
{
"input_key": "fhwa_e76_authorized",
"label": "FHWA E-76 authorization for relevant project phase",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_2_78ea28615e9acd08"
],
"source_precedence": [
"program_application",
"admin_research"
],
"missing_severity": "blocks_reimbursement_estimate"
}
],
"effects_to_add_or_update": [
{
"effect_id": "effect_process_value_1_cf6d168f0142b014",
"effect_type": "no_cash_value",
"cash_value_classification": "technical_assistance",
"value_model_kind": "non_cash_technical_assistance",
"calculation": {
"method": "zero_when_not_applicable",
"amount_cents": 0,
"percent": null,
"conditional_award_cents": null,
"conditional_award_formula": "SDG&E provides non-cash NEVI application-process support and links to CEC funding materials. Assign zero direct cash value to this utility support effect.",
"max_award_cents": null,
"min_award_cents": null,
"rate_rows": [],
"probability_discount": null,
"probability_evidence_type": "not_required"
},
"required_inputs": [],
"missing_input_behavior": "calculate_when_present",
"includedInUserFacingTotalDefault": false,
"humanReviewRequired": false,
"reasonCodes": [
"non_cash_application_support",
"not_direct_utility_grant",
"sdge_not_award_administrator",
"zero_direct_cash_value"
],
"calculationTrace": [
"Treat the SDG&E page as application-process support only.",
"Do not assign any cash incentive value to SDG&E support.",
"Evaluate any monetary NEVI award only under the separate CEC-administered solicitation effect."
]
},
{
"effect_id": "effect_grant_expected_value_2_78ea28615e9acd08",
"effect_type": "grant_expected_value",
"cash_value_classification": "reimbursement",
"value_model_kind": "competitive_cost_share",
"calculation": {
"method": "expected_value",
"amount_cents": null,
"percent": 0.8,
"conditional_award_cents": null,
"conditional_award_formula": "Pre-award requested reimbursement, if otherwise eligible, is 0.8 * eligible_allowable_project_cost_cents because the required match is exactly 0.2 of total allowable project cost. Apply the current applicant cap of 2765000000 cents, but do not use this as a user-facing expected value. If CEC posts a project-specific proposed or approved award, use approved_award_amount_cents subject to agreement execution, eligible cost review, and FHWA E-76 authorization. CEC may partially fund, revise available funds, or modify/eliminate the applicant cap.",
"max_award_cents": 2765000000,
"min_award_cents": null,
"rate_rows": [],
"probability_discount": null,
"probability_evidence_type": "scoring_criteria_only"
},
"required_inputs": [
"application_status",
"approved_award_amount_cents",
"eligible_allowable_project_cost_cents",
"match_share_percent",
"cash_match_share_percent_of_match",
"station_count",
"number_of_ccs_ports",
"ccs_ports_per_station",
"station_locations_within_one_mile_of_afc",
"applicant_eligibility_status",
"active_cec_zev_infrastructure_projects_count",
"agreement_executed",
"fhwa_e76_authorized"
],
"missing_input_behavior": "suppress_until_review",
"includedInUserFacingTotalDefault": false,
"humanReviewRequired": true,
"reasonCodes": [
"competitive_scored_ranked_solicitation",
"no_probability_evidence",
"no_historical_success_rate",
"no_expected_award_count",
"project_specific_award_required",
"conditional_up_to_cap_only",
"reimbursement_after_agreement_and_e76",
"do_not_include_in_default_total"
],
"calculationTrace": [
"Confirm the project is applying under CEC GFO-25-603 and that the solicitation remains active and funded.",
"Confirm applicant eligibility: private entity other than an investor-owned utility, or eligible California Tribal Organization, and no more than 50 active CEC-funded ZEV infrastructure projects at agreement execution.",
"Confirm scope eligibility: one application, 1-20 stations, each station with 4-20 CCS ports, qualifying DCFC equipment, eligible AFC location, and eligible cost categories.",
"For a conditional pre-award reimbursement request only, calculate 0.8 of eligible allowable project cost because exactly 0.2 match is required.",
"Apply the current 2765000000-cent applicant cap for conservative pre-award conditional-award metadata, recognizing CEC may modify/eliminate the cap or partially fund.",
"Suppress automated expected value because CEC screens, scores, and ranks applications by Cost-per-CCS-Port and no official probability denominator was found.",
"Only include a value after human review or official CEC award evidence supplies approved_award_amount_cents and the required approval gates are satisfied."
]
}
]
},
"testCaseInputHints": [
{
"inputKey": "eligible_allowable_project_cost_cents",
"valueType": "money_cents",
"whoProvides": "quote",
"realisticDefaultGuidance": "Use only costs allowable under the CEC manual. Exclude vehicle purchases, land acquisition or lease costs, CEC- or utility-covered costs, Level 1/Level 2 chargers, and DCFC equipment without required CCS connectors."
},
{
"inputKey": "approved_award_amount_cents",
"valueType": "money_cents",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Leave null unless a CEC Notice of Proposed Awards, CEC Business Meeting approval, or executed grant agreement gives a project-specific dollar amount."
},
{
"inputKey": "application_status",
"valueType": "enum",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Use not_started or submitted before award; use proposed_award, approved_by_cec_business_meeting, agreement_executed, or fhwa_e76_authorized only when supported by official documentation."
},
{
"inputKey": "match_share_percent",
"valueType": "number",
"whoProvides": "accountant",
"realisticDefaultGuidance": "Expected value is 0.2. Anything materially different should fail eligibility or require manual review."
},
{
"inputKey": "cash_match_share_percent_of_match",
"valueType": "number",
"whoProvides": "accountant",
"realisticDefaultGuidance": "Must be at least 0.5 of the total match share; the remainder may be in-kind only if allowed and documented."
},
{
"inputKey": "station_count",
"valueType": "number",
"whoProvides": "quote",
"realisticDefaultGuidance": "Valid application scope is 1 through 20 proposed public EV charging stations."
},
{
"inputKey": "number_of_ccs_ports",
"valueType": "number",
"whoProvides": "quote",
"realisticDefaultGuidance": "Use the total number of CCS ports proposed across all stations; this supports CEC cost-rank context but does not create a probability estimate."
},
{
"inputKey": "ccs_ports_per_station",
"valueType": "array",
"whoProvides": "quote",
"realisticDefaultGuidance": "Each station should have 4 through 20 CCS ports and each funded port should meet applicable NEVI power requirements."
},
{
"inputKey": "station_locations_within_one_mile_of_afc",
"valueType": "boolean",
"whoProvides": "server_derived",
"realisticDefaultGuidance": "Derive from the CEC California NEVI map or GIS evidence; all proposed stations must be within one driving mile of an eligible AFC exit or intersection."
},
{
"inputKey": "agreement_executed",
"valueType": "boolean",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Set true only after CEC grant agreement execution; pre-execution costs should not be treated as reimbursable."
},
{
"inputKey": "fhwa_e76_authorized",
"valueType": "boolean",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "Set true only for the relevant project phase after FHWA authorization; reimbursement should remain suppressed until this gate is satisfied."
}
],
"remainingGaps": [
"No official count of GFO-25-603 applications received was available because the solicitation is still open.",
"No official expected award count, application denominator, or historical success rate specific to GFO-25-603 was found.",
"CEC may partially fund a proposal, revise available funds, cancel the solicitation, or modify/eliminate the applicant cap, so the pre-award cap is metadata rather than a guaranteed award.",
"The current CEC page and Addendum 2 supersede earlier workshop slide dates; use the October 16, 2026 application deadline and January 2027 anticipated NOPA timing.",
"An actual user-facing value requires official project-specific award evidence and reimbursement-gate review."
],
"doNotUseAsUserFacingEstimateReasons": [
"SDG&E's NEVI page is non-cash application support and not a direct utility incentive.",
"CEC GFO-25-603 is competitive, screened, scored, and ranked; it is not first-come, first-served.",
"Official sources provide funding available and scoring/ranking mechanics but no defensible probability discount.",
"The 7900000000-cent solicitation amount and 2765000000-cent current applicant cap are maximum/funding-limit facts, not applicant-specific award amounts.",
"Project-specific selection, CEC approval, agreement execution, and FHWA E-76 authorization are required before reimbursement can be treated as reliable.",
"CEC can partially fund, amend, revise funds, or cancel; pre-award estimates should remain suppressed."
]
}

