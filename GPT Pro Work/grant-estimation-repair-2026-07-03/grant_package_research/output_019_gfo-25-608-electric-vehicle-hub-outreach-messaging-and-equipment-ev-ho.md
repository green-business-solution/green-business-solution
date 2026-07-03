{
"schemaVersion": "retrofi_grant_package_repair.v1",
"researchedAt": "2026-07-03",
"opportunityId": "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-608",
"programName": "GFO-25-608 - Electric Vehicle Hub, Outreach, Messaging, and Equipment (EV HOME)",
"status": "suppress_no_probability_evidence",
"sourceConfidence": "high",
"estimateConfidenceIfInputsPresent": "low",
"officialSources": [
{
"title": "GFO-25-608 - Electric Vehicle Hub, Outreach, Messaging, and Equipment (EV HOME)",
"url": "[https://www.energy.ca.gov/solicitations/2026-05/gfo-25-608-electric-vehicle-hub-outreach-messaging-and-equipment-ev-home](https://www.energy.ca.gov/solicitations/2026-05/gfo-25-608-electric-vehicle-hub-outreach-messaging-and-equipment-ev-home)",
"owner": "California Energy Commission",
"accessed": "2026-07-03",
"evidenceText": "CEC lists the solicitation as an active Grant Funding Opportunity, with a submission deadline of August 18, 2026 at 11:59 p.m. The page describes EV HOME as a competitive grant solicitation with up to $10 million available and possible future Phase 2 funding."
},
{
"title": "00_GFO-25-608_Att_00_Solicitation_Manual_ada.docx",
"url": "[https://www.energy.ca.gov/sites/default/files/2026-05/00_GFO-25-608_Att_00_Solicitation_Manual_ada.docx](https://www.energy.ca.gov/sites/default/files/2026-05/00_GFO-25-608_Att_00_Solicitation_Manual_ada.docx)",
"owner": "California Energy Commission",
"accessed": "2026-07-03",
"evidenceText": "The solicitation manual states that applications are screened, scored, ranked, and recommended until Phase 1 funds are exhausted. Phase 1 is required; Phase 2 is optional, discretionary, subject to future appropriations, and not guaranteed. The Phase 1 award range is $500,000 to $5,000,000."
},
{
"title": "GFO-25-608 Pre-Application Workshop Presentation",
"url": "[https://www.energy.ca.gov/sites/default/files/2026-06/GFO-25-608_Pre-Application_Workshop_ada.pdf](https://www.energy.ca.gov/sites/default/files/2026-06/GFO-25-608_Pre-Application_Workshop_ada.pdf)",
"owner": "California Energy Commission",
"accessed": "2026-07-03",
"evidenceText": "The workshop slides confirm $10 million for Phase 1, a $500,000 to $5,000,000 funding range for each phase, Phase 2 contingency, required scoring, and per-installation reimbursement caps for residential charger installation support."
},
{
"title": "Energy Commission Agreement Management System",
"url": "[https://ecams.energy.ca.gov/](https://ecams.energy.ca.gov/)",
"owner": "California Energy Commission",
"accessed": "2026-07-03",
"evidenceText": "CEC directs applicants to submit through ECAMS. This supports the preapproval and application-gated nature of the opportunity."
}
],
"sourceSummary": "The uploaded Prompt 19 package was the package under repair (). Official CEC sources support an active, statewide California competitive grant solicitation for eligible program administrators, not a reusable per-homeowner or per-charger rebate. Phase 1 has $10,000,000 available and an official request range of $500,000 to $5,000,000. CEC materials provide screening criteria, scoring criteria, a 70-point passing threshold, rank-order award selection, and eligible-cost caps, but they do not provide a defensible award probability, historical success rate, application count, or expected award count for this solicitation. Therefore no expected value should be calculated or included in user-facing savings totals by default.",
"packagePatch": {
"calculation_status": "no_calculable_value",
"availability": {
"status": "active",
"fundingStatus": "open_funds_available"
},
"input_requirements_to_add_or_update": [
{
"input_key": "applicant_type",
"label": "Applicant type",
"value_type": "enum",
"allowed_values": [
"community_based_organization",
"non_profit_organization",
"community_choice_aggregator",
"investor_owned_utility",
"other"
],
"required_for": [
"effect_grant_expected_value_1_aa2ca5c972c94202"
],
"missing_severity": "blocks_calculation",
"notes": "Eligible applicants are CBOs, non-profits, and community choice aggregators. Investor-owned utilities and entities not listed as eligible are ineligible."
},
{
"input_key": "cbo_partner_commitment",
"label": "Community-Based Organization partner commitment",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_aa2ca5c972c94202"
],
"missing_severity": "blocks_calculation",
"notes": "Applicants that are not CBOs must identify at least one CBO subrecipient and include a Letter of Commitment."
},
{
"input_key": "proposed_region",
"label": "Proposed service region",
"value_type": "text",
"required_for": [
"effect_grant_expected_value_1_aa2ca5c972c94202"
],
"missing_severity": "blocks_calculation",
"notes": "The region must be geographically defined, within California, and not statewide."
},
{
"input_key": "dac_or_lic_census_tracts_served",
"label": "DAC or LIC census tracts served",
"value_type": "array",
"required_for": [
"effect_grant_expected_value_1_aa2ca5c972c94202"
],
"missing_severity": "blocks_calculation",
"notes": "Activities and charger installations must serve residents in disadvantaged or low-income community census tracts."
},
{
"input_key": "phase_1_funding_request_cents",
"label": "Phase 1 CEC funding request",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_aa2ca5c972c94202"
],
"missing_severity": "blocks_calculation",
"min_value_cents": 50000000,
"max_value_cents": 500000000,
"notes": "Official Phase 1 request range is $500,000 to $5,000,000, but request amount is not an award estimate."
},
{
"input_key": "eligible_reimbursable_project_budget_cents",
"label": "Eligible reimbursable project budget",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_aa2ca5c972c94202"
],
"missing_severity": "blocks_calculation",
"notes": "Budget must be CEC-eligible and subject to administrative and charger-installation caps."
},
{
"input_key": "phase_1_ev_acquisition_target",
"label": "Phase 1 EV acquisition target",
"value_type": "number",
"required_for": [
"effect_grant_expected_value_1_aa2ca5c972c94202"
],
"missing_severity": "blocks_calculation",
"min_value": 250,
"notes": "All applications must support at least 250 new or used EV acquisitions in Phase 1."
},
{
"input_key": "application_score_or_rank",
"label": "Application score or rank",
"value_type": "text",
"required_for": [
"effect_grant_expected_value_1_aa2ca5c972c94202"
],
"missing_severity": "blocks_calculation",
"notes": "A 70-point minimum passing score is required, but passing does not imply award; awards are rank ordered until funds are exhausted."
},
{
"input_key": "award_decision_status",
"label": "Award decision status",
"value_type": "enum",
"allowed_values": [
"not_applied",
"submitted",
"screened_out",
"not_selected",
"proposed_award",
"business_meeting_approved",
"executed_agreement"
],
"required_for": [
"effect_grant_expected_value_1_aa2ca5c972c94202"
],
"missing_severity": "blocks_calculation",
"notes": "Do not calculate a value unless a project-specific proposed award, approval, or executed agreement amount is known."
},
{
"input_key": "approved_award_cents",
"label": "CEC-approved award amount",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_aa2ca5c972c94202"
],
"missing_severity": "blocks_calculation",
"notes": "Use only an official NOPA, CEC approval, or executed agreement amount. Do not infer from maximum funding."
},
{
"input_key": "award_probability",
"label": "Human-reviewed award probability",
"value_type": "number",
"required_for": [
"effect_grant_expected_value_1_aa2ca5c972c94202"
],
"missing_severity": "blocks_calculation",
"notes": "No official probability evidence was found. Any probability must be supplied by human review and should not be used automatically."
},
{
"input_key": "phase_2_requested",
"label": "Phase 2 requested",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_aa2ca5c972c94202"
],
"missing_severity": "does_not_block_phase_1",
"notes": "Phase 2 is optional, discretionary, future-funded, and excluded from default value."
}
],
"effects_to_add_or_update": [
{
"effect_id": "effect_grant_expected_value_1_aa2ca5c972c94202",
"effect_type": "grant_expected_value",
"cash_value_classification": "reimbursement",
"value_model_kind": "competitive_award_range",
"calculation": {
"method": "expected_value",
"amount_cents": null,
"percent": null,
"conditional_award_cents": null,
"conditional_award_formula": "Suppress pre-award expected value. If a project is selected and an official CEC award amount is available, conditional Phase 1 award equals the CEC-approved reimbursable award amount in the NOPA, business-meeting approval, or executed agreement, subject to the executed scope and budget. Do not infer value from the $5,000,000 Phase 1 maximum. Official Phase 1 request range is $500,000 to $5,000,000, but CEC may recommend partial funding if available funds are insufficient. No match is required. Administrative costs are capped at 10% of total eligible reimbursable costs. Residential charger installation costs are subject to per-installation CEC reimbursement caps in rate_rows. Phase 2 must be excluded unless separately approved because it is optional, discretionary, contingent on future appropriations, and not guaranteed.",
"max_award_cents": 500000000,
"min_award_cents": 50000000,
"rate_rows": [
{
"row_type": "program_budget",
"phase": "phase_1",
"available_funding_cents": 1000000000,
"min_request_cents": 50000000,
"max_request_cents": 500000000,
"status": "available_under_active_solicitation"
},
{
"row_type": "program_budget",
"phase": "phase_2",
"available_funding_cents": null,
"possible_future_funding_cents": 1000000000,
"min_request_cents": 50000000,
"max_request_cents": 500000000,
"status": "contingent_future_appropriations_excluded_from_default"
},
{
"row_type": "eligible_cost_cap",
"cost_category": "administrative_costs",
"cap_percent_of_total_eligible_reimbursable_cost": 0.1
},
{
"row_type": "installation_reimbursement_cap",
"house_type": "single_family_home",
"charger_voltage": "120_volt",
"max_cec_reimbursement_cents": 100000
},
{
"row_type": "installation_reimbursement_cap",
"house_type": "single_family_home",
"charger_voltage": "240_volt",
"max_cec_reimbursement_cents": 200000
},
{
"row_type": "installation_reimbursement_cap",
"house_type": "multifamily_home",
"charger_voltage": "120_volt",
"max_cec_reimbursement_cents": 250000
},
{
"row_type": "installation_reimbursement_cap",
"house_type": "multifamily_home",
"charger_voltage": "240_volt",
"max_cec_reimbursement_cents": 600000
}
],
"probability_discount": null,
"probability_evidence_type": "scoring_criteria_only"
},
"required_inputs": [
"applicant_type",
"cbo_partner_commitment",
"proposed_region",
"dac_or_lic_census_tracts_served",
"phase_1_funding_request_cents",
"eligible_reimbursable_project_budget_cents",
"phase_1_ev_acquisition_target",
"application_score_or_rank",
"award_decision_status",
"approved_award_cents",
"award_probability",
"phase_2_requested"
],
"missing_input_behavior": "suppress_until_review",
"includedInUserFacingTotalDefault": false,
"humanReviewRequired": true,
"reasonCodes": [
"competitive_grant",
"conditional_award_range_found",
"probability_evidence_not_found",
"scoring_criteria_only",
"award_requires_project_specific_cec_selection",
"approval_required_before_purchase_or_installation",
"do_not_infer_from_max_award",
"phase_2_contingent_future_appropriation",
"not_direct_consumer_rebate",
"exclude_from_user_facing_total_default"
],
"calculationTrace": [
"CEC identifies GFO-25-608 as an active Grant Funding Opportunity with an August 18, 2026 application deadline.",
"CEC describes EV HOME as a competitive grant solicitation, so value cannot be treated as first-come or automatically available.",
"Phase 1 has $10,000,000 available under the solicitation, with official Phase 1 award requests from $500,000 to $5,000,000.",
"Awards are based on administrative screening, technical screening, scoring, and rank order until available Phase 1 funding is exhausted.",
"The materials provide a 70-point minimum passing score and scoring criteria, but no historical success rate, application count, or expected number of awards.",
"Because probability evidence is absent, expected value is not defensible without human review or an official award decision.",
"CEC may partially fund a proposal if remaining funds are insufficient, so neither the applicant request nor the maximum award is a guaranteed conditional award.",
"Phase 2 is optional, contingent on future appropriations, subject to CEC discretion and performance requirements, and excluded from default calculations.",
"Residential charger installation caps are eligible-cost constraints for awarded program administrators; they do not create a direct homeowner rebate estimate."
]
}
]
},
"testCaseInputHints": [
{
"inputKey": "applicant_type",
"valueType": "enum",
"whoProvides": "user",
"realisticDefaultGuidance": "Use only if the applicant is a CBO, non-profit, or community choice aggregator. Investor-owned utilities and other entities should fail eligibility."
},
{
"inputKey": "cbo_partner_commitment",
"valueType": "boolean",
"whoProvides": "user",
"realisticDefaultGuidance": "True only if a non-CBO applicant has a CBO subrecipient commitment letter."
},
{
"inputKey": "proposed_region",
"valueType": "text",
"whoProvides": "user",
"realisticDefaultGuidance": "A defined California region that is not statewide."
},
{
"inputKey": "dac_or_lic_census_tracts_served",
"valueType": "array",
"whoProvides": "server_derived",
"realisticDefaultGuidance": "Use census tracts confirmed as disadvantaged or low-income under the solicitation definitions."
},
{
"inputKey": "phase_1_funding_request_cents",
"valueType": "money_cents",
"whoProvides": "user",
"realisticDefaultGuidance": "Must be between 50000000 and 500000000 cents, but do not use request amount as an estimate."
},
{
"inputKey": "eligible_reimbursable_project_budget_cents",
"valueType": "money_cents",
"whoProvides": "quote",
"realisticDefaultGuidance": "Use only CEC-eligible reimbursable costs. Apply 10% administrative cap and installation reimbursement caps."
},
{
"inputKey": "phase_1_ev_acquisition_target",
"valueType": "number",
"whoProvides": "user",
"realisticDefaultGuidance": "At least 250 EV acquisitions for Phase 1. Phase 2 consideration requires a higher Phase 1 target and performance confirmation."
},
{
"inputKey": "installation_mix",
"valueType": "array",
"whoProvides": "quote",
"realisticDefaultGuidance": "Rows should include house type, charger voltage, eligible installation cost, and whether other CEC/block-grant funding is already used."
},
{
"inputKey": "application_score_or_rank",
"valueType": "text",
"whoProvides": "application_status",
"realisticDefaultGuidance": "No default. Passing score alone is insufficient; rank and available funds matter."
},
{
"inputKey": "award_decision_status",
"valueType": "enum",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Do not estimate value when status is not_applied, submitted, screened_out, or not_selected."
},
{
"inputKey": "approved_award_cents",
"valueType": "money_cents",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "Use only official NOPA, CEC Business Meeting approval, or executed agreement amount."
},
{
"inputKey": "award_probability",
"valueType": "number",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "No defensible official default. Leave null unless a human reviewer supplies a documented probability."
},
{
"inputKey": "phase_2_requested",
"valueType": "boolean",
"whoProvides": "user",
"realisticDefaultGuidance": "Phase 2 should remain excluded from user-facing estimates unless separately approved and funded."
}
],
"remainingGaps": [
"No official historical success rate, application count, or expected award count was found for GFO-25-608.",
"No official Notice of Proposed Awards exists yet because the application deadline is August 18, 2026 and the anticipated NOPA posting is the week of October 26, 2026.",
"Official written questions and answers were anticipated for the week of July 6, 2026; they were not available in the researched official materials as of 2026-07-03.",
"No applicant-specific project budget, CEC-approved award amount, rank, score, region, or executed agreement is available in the package.",
"Phase 2 cannot be valued because funding is subject to future appropriations, CEC discretion, and Phase 1 performance documentation."
],
"doNotUseAsUserFacingEstimateReasons": [
"The opportunity is a competitive CEC grant, not an automatic rebate or formula incentive.",
"The official sources provide only budget, ranges, screening criteria, and scoring criteria, not a defensible probability of award.",
"The $5,000,000 maximum award is an upper bound, not a conditional award estimate.",
"CEC selection, ranking, available funds, and project-specific approval are required before any award amount is known.",
"CEC reserves the right to partially fund proposals, so applicant request amount is not reliable as a user-facing estimate.",
"Phase 2 is optional, contingent on future appropriations, and excluded from default value.",
"Residential charger reimbursement caps apply only inside an awarded administrator program and do not create a direct homeowner savings estimate."
]
}

