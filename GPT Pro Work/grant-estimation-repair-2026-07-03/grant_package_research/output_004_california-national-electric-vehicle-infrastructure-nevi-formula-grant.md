{
"schemaVersion": "retrofi_grant_package_repair.v1",
"researchedAt": "2026-07-03",
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22629",
"programName": "California - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
"status": "suppress_no_probability_evidence",
"sourceConfidence": "high",
"estimateConfidenceIfInputsPresent": "low",
"officialSources": [
{
"title": "GFO-25-603 - California's National Electric Vehicle Infrastructure Formula Program - Solicitation 6 Community Charging",
"url": "[https://www.energy.ca.gov/solicitations/2026-02/gfo-25-603-californias-national-electric-vehicle-infrastructure-formula](https://www.energy.ca.gov/solicitations/2026-02/gfo-25-603-californias-national-electric-vehicle-infrastructure-formula)",
"owner": "California Energy Commission",
"accessed": "2026-07-03",
"evidenceText": "CEC identifies GFO-25-603 as a Grant Funding Opportunity with Solicitation Status Active, Release Date February 23, 2026, Submission Deadline October 16, 2026 at 11:59 pm, and Questions Deadline July 13, 2026 at 5:00 pm. The purpose section states that this is a competitive grant solicitation with up to $79,000,000 in grant funds for publicly accessible, high-powered DCFC stations supporting light-duty EV travel along major corridors."
},
{
"title": "00_GFO-25-603_Solicitation_Manual_Addendum_02_ada.docx",
"url": "[https://www.energy.ca.gov/sites/default/files/2026-07/00_GFO-25-603_Solicitation_Manual_Addendum_02_ada.docx](https://www.energy.ca.gov/sites/default/files/2026-07/00_GFO-25-603_Solicitation_Manual_Addendum_02_ada.docx)",
"owner": "California Energy Commission",
"accessed": "2026-07-03",
"evidenceText": "The addendum 2 solicitation manual states that awards require screening, technical evaluation, minimum scores, and Cost Evaluation ranking by ascending Cost-per-CCS-Port. It states that final funding recommendations are made in rank order, that partial funding may be recommended if remaining funds are insufficient, that $79,000,000 is available, that the current applicant award cap is 35% of available funds, that one application may include 1 to 20 stations, and that CEC must formally approve awards at a Business Meeting before any agreement is effective."
},
{
"title": "GFO-25-603 Solicitation Manual Addendum 2 - match, eligible costs, and timing",
"url": "[https://www.energy.ca.gov/sites/default/files/2026-07/00_GFO-25-603_Solicitation_Manual_Addendum_02_ada.docx](https://www.energy.ca.gov/sites/default/files/2026-07/00_GFO-25-603_Solicitation_Manual_Addendum_02_ada.docx)",
"owner": "California Energy Commission",
"accessed": "2026-07-03",
"evidenceText": "The manual states that eligible project costs are eligible for CEC reimbursement or match share only after the corresponding project phase has been authorized by FHWA and the grant agreement has been formally executed. It lists eligible costs including DCFC EVSE with 4 to 20 CCS ports per station, transformers, panels, conduit, wiring, meters, installation, planning and engineering, networking licenses, warranties, and up to five years of maintenance. It states that the total match share required is exactly 20% of total allowable project cost, with a minimum 50% cash match share."
},
{
"title": "Federal EV Infrastructure Programs",
"url": "[https://www.energy.ca.gov/programs-and-topics/programs/federal-ev-infrastructure-programs](https://www.energy.ca.gov/programs-and-topics/programs/federal-ev-infrastructure-programs)",
"owner": "California Energy Commission",
"accessed": "2026-07-03",
"evidenceText": "CEC states that it has partnered with Caltrans to implement federally funded EV infrastructure programs, including the NEVI Formula Program. The page states California will receive $384 million over five years and describes the program objective of installing at least four 150 kW DC fast chargers at least every 50 miles over 6,600 miles of interstates, U.S. routes, and state routes. It also links the current California NEVI solicitations."
},
{
"title": "California's National Electric Vehicle Infrastructure (NEVI) Formula Program Map",
"url": "[https://www.energy.ca.gov/programs-and-topics/programs/federal-ev-infrastructure-programs/californias-national-electric](https://www.energy.ca.gov/programs-and-topics/programs/federal-ev-infrastructure-programs/californias-national-electric)",
"owner": "California Energy Commission",
"accessed": "2026-07-03",
"evidenceText": "CEC's map page describes Alternative Fuel Corridors and NEVI solicitation layers, including a NEVI 6 (GFO-25-603) Alternative Fuel Corridors layer showing corridors eligible for Round 6 of California's NEVI funding program, and layers for awarded/planned sites from prior rounds."
},
{
"title": "23 U.S.C. § 151 - National electric vehicle charging and hydrogen, propane, and natural gas fueling corridors",
"url": "[https://uscode.house.gov/view.xhtml?edition=prelim&num=0&req=granuleid%3AUSC-prelim-title23-section151](https://uscode.house.gov/view.xhtml?edition=prelim&num=0&req=granuleid%3AUSC-prelim-title23-section151)",
"owner": "Office of the Law Revision Counsel, U.S. House of Representatives",
"accessed": "2026-07-03",
"evidenceText": "Federal statute provides that the Federal share of the cost of a project carried out with a grant under this subsection shall not exceed 80% of the total project cost and that a private entity must pay the share not paid by the Federal Government."
}
],
"sourceSummary": "Official CEC and federal sources support a competitive reimbursement/cost-share model, not an automatic rebate. For GFO-25-603, CEC currently identifies an active solicitation with $79,000,000 available, a maximum applicant cap currently equal to 35% of available funds ($27,650,000), an exact 20% match requirement, and project-specific ranking, approval, agreement execution, and FHWA authorization gates. The uploaded package context asked for conservative suppression where probability evidence is missing.  No official current application count, award count, or success-rate denominator was found for GFO-25-603, and the Notice of Proposed Awards is anticipated in 2027; therefore pre-award expected value should be suppressed by default.",
"packagePatch": {
"calculation_status": "calculable_with_missing_inputs",
"availability": {
"status": "active",
"fundingStatus": "open_funds_available"
},
"input_requirements_to_add_or_update": [
{
"input_key": "solicitation_number",
"label": "Applicable CEC NEVI solicitation number",
"value_type": "enum",
"required_for": [
"effect_grant_expected_value_1_c93b27f2d9d796eb"
],
"source_precedence": [
"admin_research",
"application_status",
"user_profile"
],
"allowed_values_hint": [
"GFO-25-603",
"GFO-25-602",
"GFO-25-604",
"GFO-25-606",
"other_current_cec_nevi_solicitation"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "solicitation_status",
"label": "Current solicitation status and application window",
"value_type": "enum",
"required_for": [
"effect_grant_expected_value_1_c93b27f2d9d796eb"
],
"source_precedence": [
"admin_research"
],
"allowed_values_hint": [
"upcoming",
"accepting_applications",
"submitted_closed",
"nopa_posted",
"awards_approved",
"closed",
"cancelled"
],
"missing_severity": "blocks_user_facing_estimate"
},
{
"input_key": "application_deadline",
"label": "Application deadline for selected solicitation",
"value_type": "date",
"required_for": [
"effect_grant_expected_value_1_c93b27f2d9d796eb"
],
"source_precedence": [
"admin_research"
],
"missing_severity": "blocks_eligibility_check"
},
{
"input_key": "eligible_project_cost_cents",
"label": "CEC/FHWA total allowable project cost",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_c93b27f2d9d796eb"
],
"source_precedence": [
"quote",
"application_status",
"admin_research"
],
"missing_severity": "blocks_conditional_award_calculation"
},
{
"input_key": "requested_grant_amount_cents",
"label": "Grant amount requested in the CEC application",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_c93b27f2d9d796eb"
],
"source_precedence": [
"application_status",
"quote",
"user_profile"
],
"missing_severity": "blocks_conditional_award_calculation"
},
{
"input_key": "cec_approved_award_amount_cents",
"label": "CEC proposed or approved award amount",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_c93b27f2d9d796eb"
],
"source_precedence": [
"application_status",
"admin_research"
],
"missing_severity": "blocks_actual_award_calculation"
},
{
"input_key": "solicitation_available_funding_cents",
"label": "Total funding available under the applicable solicitation",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_c93b27f2d9d796eb"
],
"source_precedence": [
"admin_research"
],
"realistic_default_for_gfo_25_603_cents": 7900000000,
"missing_severity": "blocks_solicitation_cap_calculation"
},
{
"input_key": "solicitation_applicant_award_cap_cents",
"label": "Applicant award cap for the applicable solicitation",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_c93b27f2d9d796eb"
],
"source_precedence": [
"admin_research",
"application_status"
],
"realistic_default_for_gfo_25_603_cents": 2765000000,
"missing_severity": "blocks_conditional_award_calculation"
},
{
"input_key": "match_share_cents",
"label": "Committed match share",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_c93b27f2d9d796eb"
],
"source_precedence": [
"application_status",
"quote",
"user_profile"
],
"validation_hint": "For GFO-25-603, match_share_cents must equal 0.20 * eligible_project_cost_cents.",
"missing_severity": "blocks_eligibility_check"
},
{
"input_key": "cash_match_share_cents",
"label": "Committed cash match share",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_c93b27f2d9d796eb"
],
"source_precedence": [
"application_status",
"user_profile",
"quote"
],
"validation_hint": "For GFO-25-603, cash_match_share_cents must be at least 50% of total match share.",
"missing_severity": "blocks_eligibility_check"
},
{
"input_key": "award_selection_status",
"label": "Award selection and approval status",
"value_type": "enum",
"required_for": [
"effect_grant_expected_value_1_c93b27f2d9d796eb"
],
"source_precedence": [
"application_status",
"admin_research"
],
"allowed_values_hint": [
"not_applied",
"drafting",
"submitted",
"not_selected",
"proposed_award_nopa",
"cec_business_meeting_approved",
"agreement_fully_executed",
"fhwa_phase_authorized"
],
"missing_severity": "blocks_user_facing_estimate"
},
{
"input_key": "agreement_execution_status",
"label": "CEC agreement execution status",
"value_type": "enum",
"required_for": [
"effect_grant_expected_value_1_c93b27f2d9d796eb"
],
"source_precedence": [
"application_status",
"admin_research"
],
"allowed_values_hint": [
"not_started",
"pending",
"fully_executed"
],
"missing_severity": "blocks_actual_reimbursement"
},
{
"input_key": "fhwa_phase_authorization_status",
"label": "FHWA/E-76 authorization status for the relevant project phase",
"value_type": "enum",
"required_for": [
"effect_grant_expected_value_1_c93b27f2d9d796eb"
],
"source_precedence": [
"application_status",
"admin_research"
],
"allowed_values_hint": [
"not_authorized",
"authorized"
],
"missing_severity": "blocks_actual_reimbursement"
},
{
"input_key": "applicant_eligibility_status",
"label": "Applicant eligibility under the selected solicitation",
"value_type": "enum",
"required_for": [
"effect_grant_expected_value_1_c93b27f2d9d796eb"
],
"source_precedence": [
"user_profile",
"application_status",
"admin_research"
],
"allowed_values_hint": [
"eligible_private_entity",
"eligible_ca_tribal_organization",
"ineligible_investor_owned_utility",
"unknown"
],
"missing_severity": "blocks_eligibility_check"
},
{
"input_key": "station_count",
"label": "Number of proposed EV charging stations in application",
"value_type": "number",
"required_for": [
"effect_grant_expected_value_1_c93b27f2d9d796eb"
],
"source_precedence": [
"quote",
"application_status"
],
"validation_hint": "For GFO-25-603, one application must contain 1 to 20 EV charging stations.",
"missing_severity": "blocks_eligibility_check"
},
{
"input_key": "ccs_port_count_per_station",
"label": "CCS ports per proposed station",
"value_type": "array",
"required_for": [
"effect_grant_expected_value_1_c93b27f2d9d796eb"
],
"source_precedence": [
"quote",
"application_status"
],
"validation_hint": "For GFO-25-603, each station must include 4 to 20 CCS ports; J3400 may be present only if there is also a CCS connector on the charger.",
"missing_severity": "blocks_eligibility_check"
},
{
"input_key": "dcfc_site_and_corridor_compliance",
"label": "DCFC site, public access, and corridor compliance",
"value_type": "enum",
"required_for": [
"effect_grant_expected_value_1_c93b27f2d9d796eb"
],
"source_precedence": [
"quote",
"application_status",
"admin_research"
],
"allowed_values_hint": [
"confirmed_compliant",
"not_compliant",
"unknown"
],
"validation_hint": "Confirm California location, eligible AFC or other selected solicitation geography, 24/7 public access, required power/connector specifications, and exclusion of existing/planned NEVI 1-3 stations where applicable.",
"missing_severity": "blocks_eligibility_check"
},
{
"input_key": "eligible_costs_verified",
"label": "Eligible and ineligible cost screening completed",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_c93b27f2d9d796eb"
],
"source_precedence": [
"quote",
"application_status",
"admin_research"
],
"validation_hint": "Exclude ineligible costs such as vehicle purchases, land acquisition or lease costs, Level 1/Level 2 chargers, mobile charging equipment, and costs already covered by other CEC GFO/block grant incentives.",
"missing_severity": "blocks_conditional_award_calculation"
}
],
"effects_to_add_or_update": [
{
"effect_id": "effect_grant_expected_value_1_c93b27f2d9d796eb",
"effect_type": "grant_expected_value",
"cash_value_classification": "reimbursement",
"value_model_kind": "competitive_cost_share",
"calculation": {
"method": "expected_value",
"amount_cents": null,
"percent": 0.8,
"conditional_award_cents": null,
"conditional_award_formula": "Do not calculate a pre-award expected value without a defensible probability discount. For a selected and approved project only, calculate conditional reimbursement as min(cec_approved_award_amount_cents, requested_grant_amount_cents, round(0.80 * eligible_project_cost_cents), solicitation_applicant_award_cap_cents). For GFO-25-603, solicitation_available_funding_cents is 7900000000 and the current 35% applicant cap is 2765000000 cents, but CEC reserves discretion to modify or eliminate the cap; use the current solicitation-specific cap or approved award amount. Actual reimbursement also requires eligible invoices, fully executed CEC agreement, and FHWA/E-76 authorization for the corresponding phase.",
"max_award_cents": 2765000000,
"min_award_cents": null,
"rate_rows": [],
"probability_discount": null,
"probability_evidence_type": "scoring_criteria_only"
},
"required_inputs": [
"solicitation_number",
"solicitation_status",
"application_deadline",
"eligible_project_cost_cents",
"requested_grant_amount_cents",
"cec_approved_award_amount_cents",
"solicitation_available_funding_cents",
"solicitation_applicant_award_cap_cents",
"match_share_cents",
"cash_match_share_cents",
"award_selection_status",
"agreement_execution_status",
"fhwa_phase_authorization_status",
"applicant_eligibility_status",
"station_count",
"ccs_port_count_per_station",
"dcfc_site_and_corridor_compliance",
"eligible_costs_verified"
],
"missing_input_behavior": "suppress_until_review",
"includedInUserFacingTotalDefault": false,
"humanReviewRequired": true,
"reasonCodes": [
"competitive_grant",
"scoring_criteria_only",
"missing_probability_anchor",
"no_current_application_denominator",
"no_expected_award_count",
"cost_share_cap_only",
"up_to_funding_not_entitlement",
"needs_project_cost",
"needs_solicitation_specific_caps",
"selection_required",
"cec_business_meeting_approval_required",
"agreement_execution_required",
"fhwa_phase_authorization_required",
"do_not_include_pre_award_expected_value"
],
"calculationTrace": [
"Confirm the current applicable CEC NEVI solicitation and application window; for GFO-25-603, CEC lists the solicitation as active with an October 16, 2026 submission deadline and $79,000,000 available.",
"Verify applicant eligibility, California/site geography, AFC or solicitation-specific location compliance, public accessibility, DCFC/CCS port requirements, station count, and prior NEVI-site exclusions.",
"Verify eligible project cost by excluding ineligible costs and confirming costs are eligible only after CEC agreement execution and FHWA authorization for the corresponding project phase.",
"Verify match: GFO-25-603 requires exactly 20% match of total allowable project cost, with at least 50% of match as cash.",
"If the project is not selected, not approved by CEC, not under a fully executed agreement, or not FHWA-authorized for the phase, suppress user-facing value.",
"If the project is selected and approved, compute conditional reimbursement as the lesser of approved award, requested grant amount, 80% of eligible project cost, and the current solicitation-specific cap.",
"Do not compute expected value unless a human-reviewed probability prior or official success-rate denominator is supplied."
]
}
]
},
"testCaseInputHints": [
{
"inputKey": "solicitation_number",
"valueType": "enum",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "Use GFO-25-603 for the current light-duty Community Charging solicitation; do not reuse this cap for other NEVI solicitations without checking the applicable manual."
},
{
"inputKey": "solicitation_status",
"valueType": "enum",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "For GFO-25-603 as researched, CEC page status is active; ECAMS application acceptance begins July 16, 2026 and deadline is October 16, 2026."
},
{
"inputKey": "application_deadline",
"valueType": "date",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "For GFO-25-603, use 2026-10-16."
},
{
"inputKey": "eligible_project_cost_cents",
"valueType": "money_cents",
"whoProvides": "quote",
"realisticDefaultGuidance": "Use the CEC/FHWA allowable cost basis after removing ineligible costs; example 500000000 for a $5,000,000 allowable project."
},
{
"inputKey": "requested_grant_amount_cents",
"valueType": "money_cents",
"whoProvides": "application_status",
"realisticDefaultGuidance": "For a $5,000,000 eligible project under an 80% reimbursement share, a typical request would be 400000000, subject to cap and CEC approval."
},
{
"inputKey": "cec_approved_award_amount_cents",
"valueType": "money_cents",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Leave null until NOPA/CEC approval/agreement data exists; this is required for any actual award calculation."
},
{
"inputKey": "solicitation_available_funding_cents",
"valueType": "money_cents",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "For GFO-25-603, use 7900000000."
},
{
"inputKey": "solicitation_applicant_award_cap_cents",
"valueType": "money_cents",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "For GFO-25-603, current 35% applicant cap equals 2765000000; update if CEC modifies the cap or approves a different amount."
},
{
"inputKey": "match_share_cents",
"valueType": "money_cents",
"whoProvides": "user",
"realisticDefaultGuidance": "For GFO-25-603, must equal exactly 20% of total allowable project cost; for a $5,000,000 project use 100000000."
},
{
"inputKey": "cash_match_share_cents",
"valueType": "money_cents",
"whoProvides": "user",
"realisticDefaultGuidance": "For GFO-25-603, at least 50% of match must be cash; for a $1,000,000 match, use at least 50000000."
},
{
"inputKey": "award_selection_status",
"valueType": "enum",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Use submitted or not_selected before NOPA; use cec_business_meeting_approved or agreement_fully_executed only with official award records."
},
{
"inputKey": "probability_discount",
"valueType": "number",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "Keep null unless an official success-rate denominator or human-reviewed probability prior is documented."
}
],
"remainingGaps": [
"No official current GFO-25-603 application count was found, and the application period/NOPA process had not produced a current awards denominator as of the research date.",
"No official expected number of awards was found; $79,000,000 available and a 35% applicant cap do not imply an award count because project sizes vary and CEC may partially fund proposals.",
"No defensible probability discount can be calculated from scoring criteria alone.",
"Actual project value depends on a project-specific NOPA, CEC Business Meeting approval, fully executed agreement, FHWA/E-76 authorization, invoice eligibility, and any CEC-approved scope or funding reductions.",
"Solicitation deadlines, eligible locations, caps, and requirements vary across GFO-25-602, GFO-25-604, GFO-25-606, GFO-25-603, and later NEVI rounds; runtime should not apply GFO-25-603 caps to another solicitation without rechecking official sources.",
"Funding availability is competitive and not first-come entitlement funding; the presence of open funds does not support a user-facing savings estimate before selection and approval."
],
"doNotUseAsUserFacingEstimateReasons": [
"The program is a competitive grant solicitation, not an automatic rebate.",
"Official sources provide only available funding, cost-share limits, scoring/ranking rules, and caps, not a probability of award.",
"No current application denominator, expected award count, or historical success rate for this solicitation was verified.",
"Project-specific CEC selection, CEC Business Meeting approval, agreement execution, and FHWA authorization are required.",
"The $79,000,000 available amount and $27,650,000 applicant cap are maximum/cap information, not a conditional entitlement for any project.",
"Eligible project cost and match funding must be verified; ineligible costs and non-authorized pre-agreement costs cannot be counted.",
"Default inclusion in user-facing savings totals would overstate value for applicants that have not been selected and approved."
]
}
