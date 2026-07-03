{
"schemaVersion": "retrofi_grant_package_repair.v1",
"researchedAt": "2026-07-03",
"opportunityId": "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-607",
"programName": "GFO-25-607 - Clean Transportation Program Hydrogen Infrastructure Project Opportunity (HIPO)",
"status": "suppress_no_probability_evidence",
"sourceConfidence": "high",
"estimateConfidenceIfInputsPresent": "low",
"officialSources": [
{
"title": "GFO-25-607 - Clean Transportation Program Hydrogen Infrastructure Project Opportunity (HIPO)",
"url": "[https://www.energy.ca.gov/solicitations/2026-04/gfo-25-607-clean-transportation-program-hydrogen-infrastructure-project](https://www.energy.ca.gov/solicitations/2026-04/gfo-25-607-clean-transportation-program-hydrogen-infrastructure-project)",
"owner": "California Energy Commission",
"accessed": "2026-07-03",
"evidenceText": "CEC lists this as Grant Funding Opportunity GFO-25-607, status Active, release date April 06, 2026, submission deadline July 20, 2026 at 11:59 pm, and states the purpose is to fund deployment of hydrogen refueling infrastructure for light-, medium-, and/or heavy-duty on-road FCEVs. The page also lists the Addendum 2 solicitation manual, Addendum 3, and revised Q&A. ([California Energy Commission][1])"
},
{
"title": "GFO-25-607 Solicitation Manual Addendum 02",
"url": "[https://www.energy.ca.gov/sites/default/files/2026-06/GFO-25-607_Solicitation_Manual_Addendum_02_ada.docx](https://www.energy.ca.gov/sites/default/files/2026-06/GFO-25-607_Solicitation_Manual_Addendum_02_ada.docx)",
"owner": "California Energy Commission",
"accessed": "2026-07-03",
"evidenceText": "Official manual states this is a competitive grant solicitation with up to $45,000,000 available; awards require administrative/technical screening, at least 70% technical score, cost evaluation ranking, and possible partial funding. It states projects are eligible for up to 75% of total allowable project costs, minimum award is $2,000,000 per application, total requested amount cannot exceed $15,000,000, match share is 25%, CEC must formally approve awards, recipients may begin only after full execution, and no agreement is effective until CEC Business Meeting approval and signatures."
},
{
"title": "GFO-25-607 Pre-Application Workshop Presentation",
"url": "[https://www.energy.ca.gov/sites/default/files/2026-04/GFO-25-607_Pre-Application_Workshop_Presentation_ada.pdf](https://www.energy.ca.gov/sites/default/files/2026-04/GFO-25-607_Pre-Application_Workshop_Presentation_ada.pdf)",
"owner": "California Energy Commission",
"accessed": "2026-07-03",
"evidenceText": "Workshop slides corroborate that the solicitation is competitive, has $45,000,000 available, a $15,000,000 maximum grant award per project, a $2,000,000 minimum award per application, and ranked awards until funds are exhausted; slides also list station-type caps for new infrastructure, TNO reopening, GFO-19-602 supplemental funding, and O&M. The slide deadline was superseded by later CEC page/Q&A materials. ([California Energy Commission][2])"
},
{
"title": "GFO-25-607 Questions and Answers Revised",
"url": "[https://www.energy.ca.gov/sites/default/files/2026-06/GFO-25-607_Questions_and_Answers_Revised_ada.docx](https://www.energy.ca.gov/sites/default/files/2026-06/GFO-25-607_Questions_and_Answers_Revised_ada.docx)",
"owner": "California Energy Commission",
"accessed": "2026-07-03",
"evidenceText": "Official revised Q&A says it supersedes the prior Q&A, states Addendum 1 extended the application deadline to July 20, 2026, clarifies that new infrastructure is eligible for $1,000,000 per fueling position, and gives an example in which a four-position $10,000,000 station is eligible for up to $4,000,000 rather than 75% of project cost."
},
{
"title": "GFO-25-607 Addendum 03 Cover Letter",
"url": "[https://www.energy.ca.gov/sites/default/files/2026-06/GFO-25-607_Addendum_03_Cover_Letter_ada.docx](https://www.energy.ca.gov/sites/default/files/2026-06/GFO-25-607_Addendum_03_Cover_Letter_ada.docx)",
"owner": "California Energy Commission",
"accessed": "2026-07-03",
"evidenceText": "Addendum 3 notifies applicants of revised Questions and Answers and reiterates renewable hydrogen requirements for stations funded under this solicitation."
}
],
"sourceSummary": "The current official CEC solicitation page controls availability: the opportunity is active with a July 20, 2026 deadline, so the prior closed/June 19 status should be repaired. Official materials support a conditional cost-share award formula, but not a defensible expected-value probability. The uploaded package context was reviewed as the starting point. ([California Energy Commission][1]) ",
"packagePatch": {
"calculation_status": "no_calculable_value",
"availability": {
"status": "active",
"fundingStatus": "open_funds_available"
},
"input_requirements_to_add_or_update": [
{
"input_key": "requested_grant_amount_cents",
"label": "Requested CEC grant amount",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_a7ff5e3c336c4dd5"
],
"source_precedence": [
"application_budget",
"quote",
"user_profile",
"admin_research"
],
"missing_severity": "blocks_conditional_award_formula"
},
{
"input_key": "total_allowable_project_cost_cents",
"label": "Total allowable project cost, including CEC reimbursable share and recipient match share",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_a7ff5e3c336c4dd5"
],
"source_precedence": [
"application_budget",
"quote",
"user_profile",
"admin_research"
],
"missing_severity": "blocks_conditional_award_formula"
},
{
"input_key": "eligible_cec_reimbursable_cost_cents",
"label": "Costs eligible for CEC reimbursement, excluding match-only and ineligible costs",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_a7ff5e3c336c4dd5"
],
"source_precedence": [
"application_budget",
"quote",
"admin_research"
],
"missing_severity": "blocks_conditional_award_formula"
},
{
"input_key": "match_share_cents",
"label": "Documented applicant or third-party match share",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_a7ff5e3c336c4dd5"
],
"source_precedence": [
"application_budget",
"letters_of_commitment",
"user_profile",
"admin_research"
],
"missing_severity": "blocks_conditional_award_formula"
},
{
"input_key": "station_scope_rows",
"label": "Station scope rows with project type, station count, fueling positions, O&M request, TNO status, prior CEC award status, and capacity kg/day",
"value_type": "array",
"required_for": [
"effect_grant_expected_value_1_a7ff5e3c336c4dd5"
],
"source_precedence": [
"application_narrative",
"quote",
"user_profile",
"admin_research"
],
"missing_severity": "blocks_station_cap_formula"
},
{
"input_key": "application_submitted_by_deadline",
"label": "Application submitted in ECAMS by July 20, 2026, 11:59 pm",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_a7ff5e3c336c4dd5"
],
"source_precedence": [
"application_status",
"admin_research",
"user_profile"
],
"missing_severity": "blocks_eligibility"
},
{
"input_key": "applicant_eligibility_status",
"label": "Applicant is eligible and not an excluded IOU, California state agency, or U.S. federal agency",
"value_type": "enum",
"required_for": [
"effect_grant_expected_value_1_a7ff5e3c336c4dd5"
],
"source_precedence": [
"application_status",
"admin_research",
"user_profile"
],
"allowed_values": [
"eligible",
"ineligible",
"unknown"
],
"missing_severity": "blocks_eligibility"
},
{
"input_key": "project_eligibility_status",
"label": "Project passes HIPO project eligibility, California deployment, access, FCEV commitment, technical, fund-stacking, and renewable hydrogen requirements",
"value_type": "enum",
"required_for": [
"effect_grant_expected_value_1_a7ff5e3c336c4dd5"
],
"source_precedence": [
"application_status",
"admin_research",
"quote",
"user_profile"
],
"allowed_values": [
"eligible",
"ineligible",
"unknown"
],
"missing_severity": "blocks_eligibility"
},
{
"input_key": "award_probability",
"label": "Human-reviewed award probability based on defensible evidence",
"value_type": "number_decimal_0_to_1",
"required_for": [
"effect_grant_expected_value_1_a7ff5e3c336c4dd5"
],
"source_precedence": [
"admin_research",
"human_review",
"application_status"
],
"missing_severity": "forces_suppression"
},
{
"input_key": "cec_award_status",
"label": "CEC award status",
"value_type": "enum",
"required_for": [
"effect_grant_expected_value_1_a7ff5e3c336c4dd5"
],
"source_precedence": [
"application_status",
"admin_research"
],
"allowed_values": [
"not_submitted",
"submitted_pending",
"not_selected",
"proposed_award",
"approved_executed",
"unknown"
],
"missing_severity": "forces_suppression"
},
{
"input_key": "cec_approved_award_cents",
"label": "Actual CEC proposed or approved award amount, if known",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_a7ff5e3c336c4dd5"
],
"source_precedence": [
"application_status",
"admin_research"
],
"missing_severity": "optional_until_award"
}
],
"effects_to_add_or_update": [
{
"effect_id": "effect_grant_expected_value_1_a7ff5e3c336c4dd5",
"effect_type": "grant_expected_value",
"cash_value_classification": "reimbursement",
"value_model_kind": "competitive_cost_share",
"calculation": {
"method": "expected_value",
"amount_cents": null,
"percent": 0.75,
"conditional_award_cents": null,
"conditional_award_formula": "Suppress by default. If human review supplies a defensible award_probability or actual CEC award status, conditional_award_cents after selection/approval is the lesser of: requested_grant_amount_cents; eligible_cec_reimbursable_cost_cents; floor(0.75 * total_allowable_project_cost_cents); 1500000000 cents per application; station_cap_sum_cents; and any administrator-confirmed partial/remaining funding limit. The request must be at least 200000000 cents and not more than 1500000000 cents per application, and match_share_cents must be at least 25% of total_allowable_project_cost_cents. station_cap_sum_cents is the sum of applicable caps by station/project type: new infrastructure equals 100000000 cents per refueling position with at least two positions per station and not more than 1500000000 cents per station/application; reopening TNO stations equals up to 200000000 cents per station; supplementing GFO-19-602 stations equals up to 50000000 cents per station; O&M equals up to 50000000 cents per station and is reimbursable only after the station becomes operational. CEC may partially fund a ranked proposal if remaining solicitation funds are insufficient.",
"max_award_cents": 1500000000,
"min_award_cents": 200000000,
"rate_rows": [
{
"row_type": "application_total",
"min_award_cents": 200000000,
"max_award_cents": 1500000000,
"max_percent_of_total_allowable_project_cost": 0.75,
"minimum_match_share_percent": 0.25
},
{
"row_type": "new_infrastructure_station",
"rate_cents_per_refueling_position": 100000000,
"minimum_refueling_positions_per_station": 2,
"max_award_cents_per_station": 1500000000,
"notes": "Q&A clarifies a four-position $10,000,000 new station is eligible for up to $4,000,000, not $7,500,000."
},
{
"row_type": "reopening_tno_station",
"max_award_cents_per_station": 200000000,
"eligibility_notes": "Station must currently be classified as temporarily non-operational and otherwise not return to open-retail status."
},
{
"row_type": "gfo_19_602_supplement_station",
"max_award_cents_per_station": 50000000,
"eligibility_notes": "For stations awarded under CEC GFO-19-602 that are fully permitted and lacking capital to finish construction."
},
{
"row_type": "operations_and_maintenance",
"max_award_cents_per_station": 50000000,
"eligibility_notes": "Only in addition to an eligible station project; reimbursable only after station becomes operational; stations that received relevant prior CEC O&M funding are not eligible for additional O&M."
}
],
"probability_discount": null,
"probability_evidence_type": "scoring_criteria_only"
},
"required_inputs": [
"requested_grant_amount_cents",
"total_allowable_project_cost_cents",
"eligible_cec_reimbursable_cost_cents",
"match_share_cents",
"station_scope_rows",
"application_submitted_by_deadline",
"applicant_eligibility_status",
"project_eligibility_status",
"award_probability",
"cec_award_status",
"cec_approved_award_cents"
],
"missing_input_behavior": "suppress_until_review",
"includedInUserFacingTotalDefault": false,
"humanReviewRequired": true,
"reasonCodes": [
"competitive_grant",
"official_source_active_deadline_2026_07_20",
"funding_status_repaired_from_closed_to_active",
"conditional_cost_share_formula_found",
"conditional_award_is_project_specific",
"cec_approval_and_executed_agreement_required",
"award_probability_not_published",
"historical_application_count_not_found",
"expected_award_count_not_found",
"scoring_criteria_only_not_probability",
"suppress_user_facing_total_default"
],
"calculationTrace": [
"CEC official page lists solicitation status Active and submission deadline July 20, 2026.",
"CEC official materials describe this as a competitive grant solicitation for hydrogen refueling infrastructure.",
"Total solicitation funding is up to $45,000,000, with $21,200,000 dedicated to light-duty hydrogen refueling infrastructure and $23,800,000 dedicated to light-, medium-, and/or heavy-duty hydrogen refueling infrastructure.",
"Applications must pass administrative and technical screening, meet technical-score minimums, and then are ranked by cost per refueling position and cost per kg of 24-hour dispensing capacity.",
"Projects are eligible for up to 75% of total allowable project costs and require 25% match share.",
"Application request must be at least $2,000,000 and cannot exceed $15,000,000.",
"Station/project-type subcaps apply: new infrastructure at $1,000,000 per refueling position with at least two positions; TNO reopening up to $2,000,000 per station; GFO-19-602 supplement up to $500,000 per station; O&M up to $500,000 per station after station operational.",
"Official materials do not publish an expected number of awards, application count, historical success rate, or source-supported probability discount for GFO-25-607.",
"Because the value is competitive, project-specific, and approval-dependent, expected value is not defensible without human-reviewed probability evidence or an actual award decision."
]
}
]
},
"testCaseInputHints": [
{
"inputKey": "requested_grant_amount_cents",
"valueType": "money_cents",
"whoProvides": "user",
"realisticDefaultGuidance": "Do not default to the $15,000,000 cap. Use only the amount in the actual application budget; it must be between 200000000 and 1500000000 cents."
},
{
"inputKey": "total_allowable_project_cost_cents",
"valueType": "money_cents",
"whoProvides": "quote",
"realisticDefaultGuidance": "Use the CEC-defined total allowable project cost, not gross project cost that includes ineligible items."
},
{
"inputKey": "eligible_cec_reimbursable_cost_cents",
"valueType": "money_cents",
"whoProvides": "quote",
"realisticDefaultGuidance": "Include only costs eligible for CEC reimbursement; exclude match-only costs such as planning/design, permitting, land leases, project management, and ineligible costs."
},
{
"inputKey": "match_share_cents",
"valueType": "money_cents",
"whoProvides": "user",
"realisticDefaultGuidance": "Must be documented and at least 25% of total allowable project cost; no cash-only default is required because in-kind match may qualify."
},
{
"inputKey": "station_scope_rows",
"valueType": "array",
"whoProvides": "quote",
"realisticDefaultGuidance": "Each row should identify station/project type, station count, fueling positions, O&M request, TNO status, prior CEC funding status, and total 24-hour kg capacity."
},
{
"inputKey": "application_submitted_by_deadline",
"valueType": "boolean",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Use true only when the ECAMS application was submitted by July 20, 2026 at 11:59 pm."
},
{
"inputKey": "applicant_eligibility_status",
"valueType": "enum",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "Use eligible only after confirming applicant type, California Secretary of State standing if applicable, CEC active-project count, and excluded-entity rules."
},
{
"inputKey": "project_eligibility_status",
"valueType": "enum",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "Use eligible only after confirming California deployment, access type, FCEV commitments, minimum fueling positions, fund-stacking restrictions, 95% uptime commitment, and renewable hydrogen requirements."
},
{
"inputKey": "award_probability",
"valueType": "number",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "No source-supported default exists. Leave null unless a grant expert supplies a documented, human-reviewed probability or an actual award decision is known."
},
{
"inputKey": "cec_award_status",
"valueType": "enum",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Use submitted_pending before NOPA; use proposed_award or approved_executed only from official CEC award records or executed agreement documentation."
},
{
"inputKey": "cec_approved_award_cents",
"valueType": "money_cents",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Leave null unless the NOPA, CEC Business Meeting approval, or executed agreement states the actual award amount."
}
],
"remainingGaps": [
"No official expected award count was found for GFO-25-607.",
"No official historical application count or success rate was found for this solicitation.",
"Notice of Proposed Awards is not yet available as of the research date; the manual anticipates NOPA posting after the application deadline.",
"Actual award amount, partial-funding outcome, and agreement execution status are project-specific and cannot be known from the solicitation alone.",
"Station-specific eligibility, eligible reimbursable cost, match documentation, CEQA/readiness status, access requirements, and prior CEC funding/O&M conflicts must be checked per application."
],
"doNotUseAsUserFacingEstimateReasons": [
"The opportunity is competitive and ranked; eligibility and scoring do not create an award probability.",
"Official sources provide award caps and cost-share limits but do not provide a success rate, expected number of awards, or historical application count for a probability discount.",
"Conditional award depends on project scope, station type, eligible reimbursable costs, documented match, CEC screening/scoring, and available funds.",
"CEC Business Meeting approval and an executed agreement are required before an agreement is effective or reimbursable work can begin.",
"Using the minimum award, maximum award, or a human-prior probability would overstate user-facing savings without defensible source support."
]
}

[1]: https://www.energy.ca.gov/solicitations/2026-04/gfo-25-607-clean-transportation-program-hydrogen-infrastructure-project?utm_source=chatgpt.com "GFO-25-607 - Clean Transportation Program Hydrogen Infrastructure Project Opportunity (HIPO)"
[2]: https://www.energy.ca.gov/sites/default/files/2026-04/GFO-25-607_Pre-Application_Workshop_Presentation_ada.pdf?utm_source=chatgpt.com "GFO-25-607 Pre-Application Workshop"

