{
"schemaVersion": "retrofi_grant_package_repair.v1",
"researchedAt": "2026-07-03",
"opportunityId": "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-603",
"programName": "GFO-25-603 - California's National Electric Vehicle Infrastructure Formula Program - Solicitation 6 Community Charging",
"status": "suppress_no_probability_evidence",
"sourceConfidence": "high",
"estimateConfidenceIfInputsPresent": "low",
"officialSources": [
{
"title": "GFO-25-603 - California's National Electric Vehicle Infrastructure Formula Program - Solicitation 6 Community Charging",
"url": "[https://www.energy.ca.gov/solicitations/2026-02/gfo-25-603-californias-national-electric-vehicle-infrastructure-formula](https://www.energy.ca.gov/solicitations/2026-02/gfo-25-603-californias-national-electric-vehicle-infrastructure-formula)",
"owner": "California Energy Commission",
"accessed": "2026-07-03",
"evidenceText": "CEC lists this as an active Grant Funding Opportunity, solicitation number GFO-25-603, released February 23, 2026, with a submission deadline of October 16, 2026 at 11:59 pm. The page states this is a competitive grant solicitation with up to $79,000,000 available for publicly accessible, high-powered DC fast charging projects. ([California Energy Commission][1])"
},
{
"title": "00_GFO-25-603_Solicitation_Manual_Addendum_02_ada.docx",
"url": "[https://www.energy.ca.gov/sites/default/files/2026-07/00_GFO-25-603_Solicitation_Manual_Addendum_02_ada.docx](https://www.energy.ca.gov/sites/default/files/2026-07/00_GFO-25-603_Solicitation_Manual_Addendum_02_ada.docx)",
"owner": "California Energy Commission",
"accessed": "2026-07-03",
"evidenceText": "Official solicitation manual listed in CEC solicitation files. The manual controls award determination, applicant cap, match, eligible costs, screening, scoring, cost evaluation, and agreement/funding-contingency terms. The solicitation page lists the Addendum 02 manual in the official solicitation files. ([California Energy Commission][1])"
},
{
"title": "GFO-25-603 NEVI Pre-Application Workshop Slides",
"url": "[https://www.energy.ca.gov/sites/default/files/2026-03/GFO-25-603_NEVI_6_Pre-Application_Workshop_Slides_ADA.pdf](https://www.energy.ca.gov/sites/default/files/2026-03/GFO-25-603_NEVI_6_Pre-Application_Workshop_Slides_ADA.pdf)",
"owner": "California Energy Commission",
"accessed": "2026-07-03",
"evidenceText": "CEC slides summarize the solicitation as competitive, show $79 million available and a maximum grant award per applicant of 35% of funds available or $27.65 million, state that applicants must include exactly 20% match for total allowable project cost, and explain that applications passing thresholds are ranked by cost per CCS port until funds are exhausted. ([California Energy Commission][2])"
},
{
"title": "GFO-25-603 Addendum 02 Cover Letter",
"url": "[https://www.energy.ca.gov/sites/default/files/2026-07/GFO-25-603_Addendum_02_Cover_Letter_ada.docx](https://www.energy.ca.gov/sites/default/files/2026-07/GFO-25-603_Addendum_02_Cover_Letter_ada.docx)",
"owner": "California Energy Commission",
"accessed": "2026-07-03",
"evidenceText": "Official Addendum 02 changed the ECAMS application acceptance date to July 16, 2026 and preserved the October 16, 2026 application deadline; the solicitation page lists Addendum 02 in the official solicitation files. ([California Energy Commission][1])"
},
{
"title": "GFO-25-603 Questions and Answers Round 1",
"url": "[https://www.energy.ca.gov/sites/default/files/2026-06/GFO-25-603_Questions_and_Answers_Round_1_ada.docx](https://www.energy.ca.gov/sites/default/files/2026-06/GFO-25-603_Questions_and_Answers_Round_1_ada.docx)",
"owner": "California Energy Commission",
"accessed": "2026-07-03",
"evidenceText": "Official Round 1 Q&A is listed in the CEC solicitation files. It confirms award determinations are competitive/scored and reiterates that project-specific eligibility depends on solicitation requirements and proposal details; it does not provide a GFO-25-603 success probability, application count, or expected award count. ([California Energy Commission][1])"
},
{
"title": "California's National Electric Vehicle Infrastructure Formula Program Map",
"url": "[https://www.energy.ca.gov/programs-and-topics/programs/federal-ev-infrastructure-programs/californias-national-electric](https://www.energy.ca.gov/programs-and-topics/programs/federal-ev-infrastructure-programs/californias-national-electric)",
"owner": "California Energy Commission",
"accessed": "2026-07-03",
"evidenceText": "CEC states that the interactive map includes a NEVI 6 (GFO-25-603) Alternative Fuel Corridors layer showing corridors eligible for Round 6. ([California Energy Commission][3])"
}
],
"sourceSummary": "Official CEC sources support a conditional reimbursement-style competitive cost-share model, not a defensible pre-award expected value. The solicitation is active and competitive, with up to $79,000,000 available and an October 16, 2026 application deadline; official workshop material states a $27,650,000 per-applicant cap, exactly 20% match, and ranking by cost per CCS port until funds are exhausted. ([California Energy Commission][4]) No official source reviewed provides GFO-25-603 application volume, expected award count, or success rate. The uploaded package context required conservative suppression where no defensible estimate exists.  ",
"packagePatch": {
"calculation_status": "no_calculable_value",
"availability": {
"status": "active",
"fundingStatus": "open_funds_available"
},
"input_requirements_to_add_or_update": [
{
"input_key": "award_selection_status",
"label": "Award selection or agreement status",
"value_type": "enum",
"required_for": [
"effect_grant_expected_value_1_42355de1814a8757"
],
"allowed_values": [
"not_applied",
"application_in_progress",
"submitted",
"not_selected",
"proposed_award",
"final_award_approved",
"agreement_executed"
],
"source_precedence": [
"application_status",
"admin_research",
"user"
],
"missing_severity": "blocks_user_facing_estimate"
},
{
"input_key": "approved_cec_award_cents",
"label": "Official approved CEC award amount, cents",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_42355de1814a8757"
],
"source_precedence": [
"admin_research",
"application_status",
"executed_agreement"
],
"missing_severity": "blocks_conditional_award_after_selection"
},
{
"input_key": "total_allowable_project_cost_cents",
"label": "Total allowable project cost, cents",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_42355de1814a8757"
],
"source_precedence": [
"quote",
"proposal_budget",
"executed_agreement"
],
"missing_severity": "blocks_conditional_award"
},
{
"input_key": "requested_cec_reimbursable_share_cents",
"label": "Requested CEC reimbursable share, cents",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_42355de1814a8757"
],
"source_precedence": [
"proposal_budget",
"quote",
"user"
],
"missing_severity": "blocks_conditional_award"
},
{
"input_key": "match_share_cents",
"label": "Total match share, cents",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_42355de1814a8757"
],
"source_precedence": [
"proposal_budget",
"accountant",
"user"
],
"missing_severity": "blocks_eligibility"
},
{
"input_key": "cash_match_share_cents",
"label": "Cash portion of match share, cents",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_42355de1814a8757"
],
"source_precedence": [
"proposal_budget",
"accountant",
"user"
],
"missing_severity": "blocks_eligibility"
},
{
"input_key": "number_of_ccs_ports",
"label": "Number of CCS Type 1 charging ports proposed",
"value_type": "number",
"required_for": [
"effect_grant_expected_value_1_42355de1814a8757"
],
"source_precedence": [
"quote",
"equipment_spec",
"proposal_budget"
],
"missing_severity": "blocks_cost_per_port_check"
},
{
"input_key": "station_count",
"label": "Number of EV charging stations in the application",
"value_type": "number",
"required_for": [
"effect_grant_expected_value_1_42355de1814a8757"
],
"source_precedence": [
"proposal_budget",
"quote",
"user"
],
"missing_severity": "blocks_eligibility"
},
{
"input_key": "each_station_ccs_port_count",
"label": "CCS Type 1 port count for each proposed charging station",
"value_type": "array",
"required_for": [
"effect_grant_expected_value_1_42355de1814a8757"
],
"source_precedence": [
"equipment_spec",
"quote",
"site_plan"
],
"missing_severity": "blocks_eligibility"
},
{
"input_key": "each_ccs_port_power_kw",
"label": "Power delivery rating for each proposed CCS port",
"value_type": "array",
"required_for": [
"effect_grant_expected_value_1_42355de1814a8757"
],
"source_precedence": [
"equipment_spec",
"quote",
"site_plan"
],
"missing_severity": "blocks_eligibility"
},
{
"input_key": "applicant_type",
"label": "Applicant type",
"value_type": "enum",
"required_for": [
"effect_grant_expected_value_1_42355de1814a8757"
],
"allowed_values": [
"private_entity",
"investor_owned_utility",
"california_tribal_organization",
"other"
],
"source_precedence": [
"user_profile",
"application_status"
],
"missing_severity": "blocks_eligibility"
},
{
"input_key": "nevi_6_afc_site_eligibility",
"label": "Project site is within the eligible NEVI 6 Alternative Fuel Corridor geography",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_42355de1814a8757"
],
"source_precedence": [
"server_derived",
"admin_research",
"site_address"
],
"missing_severity": "blocks_eligibility"
},
{
"input_key": "site_control_documentation_status",
"label": "Site control documentation status for each station",
"value_type": "enum",
"required_for": [
"effect_grant_expected_value_1_42355de1814a8757"
],
"allowed_values": [
"not_started",
"in_progress",
"complete",
"approved_by_cec"
],
"source_precedence": [
"application_status",
"user",
"admin_research"
],
"missing_severity": "blocks_eligibility"
},
{
"input_key": "agreement_executed",
"label": "CEC grant agreement has been fully executed",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_42355de1814a8757"
],
"source_precedence": [
"application_status",
"admin_research"
],
"missing_severity": "blocks_reimbursement_estimate"
},
{
"input_key": "cec_notice_to_proceed_or_reimbursable_authorization",
"label": "CEC notice to proceed or other reimbursable-cost authorization is in place",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_42355de1814a8757"
],
"source_precedence": [
"application_status",
"admin_research"
],
"missing_severity": "blocks_reimbursement_estimate"
},
{
"input_key": "cost_per_ccs_port_cents",
"label": "Cost per CCS port, cents",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_42355de1814a8757"
],
"source_precedence": [
"server_derived"
],
"derivation": "requested_cec_reimbursable_share_cents / number_of_ccs_ports",
"missing_severity": "ranking_only_not_probability"
}
],
"effects_to_add_or_update": [
{
"effect_id": "effect_grant_expected_value_1_42355de1814a8757",
"effect_type": "grant_expected_value",
"cash_value_classification": "reimbursement",
"value_model_kind": "competitive_cost_share",
"calculation": {
"method": "expected_value",
"amount_cents": null,
"percent": 0.8,
"conditional_award_cents": null,
"conditional_award_formula": "Pre-award expected_value_cents MUST remain null because no official probability_discount is available. If and only if award_selection_status is final_award_approved or agreement_executed and approved_cec_award_cents is present, conditional_award_cents = min(approved_cec_award_cents, requested_cec_reimbursable_share_cents, floor(0.8 * total_allowable_project_cost_cents), 2765000000). Eligibility gates: match_share_cents must equal 0.2 * total_allowable_project_cost_cents within CEC tolerance; cash_match_share_cents must be at least 0.5 * match_share_cents; station_count must be 1 through 20; each_station_ccs_port_count must be 4 through 20 CCS Type 1 ports; each CCS port must satisfy solicitation power and access requirements; site must be NEVI 6 AFC eligible; costs must be allowable, documented, and incurred only after applicable agreement/authorization requirements. If award_selection_status is not_selected, conditional_award_cents = 0. For submitted, application_in_progress, proposed_award without approved amount, or unknown status, conditional_award_cents = null.",
"max_award_cents": 2765000000,
"min_award_cents": null,
"rate_rows": [],
"probability_discount": null,
"probability_evidence_type": "scoring_criteria_only"
},
"required_inputs": [
"award_selection_status",
"approved_cec_award_cents",
"total_allowable_project_cost_cents",
"requested_cec_reimbursable_share_cents",
"match_share_cents",
"cash_match_share_cents",
"number_of_ccs_ports",
"station_count",
"each_station_ccs_port_count",
"each_ccs_port_power_kw",
"applicant_type",
"nevi_6_afc_site_eligibility",
"site_control_documentation_status",
"agreement_executed",
"cec_notice_to_proceed_or_reimbursable_authorization",
"cost_per_ccs_port_cents"
],
"missing_input_behavior": "suppress_until_review",
"includedInUserFacingTotalDefault": false,
"humanReviewRequired": true,
"reasonCodes": [
"competitive_grant",
"expected_value_suppressed",
"probability_evidence_not_found",
"scoring_criteria_only_not_probability",
"cost_per_ccs_port_ranking_not_probability",
"up_to_budget_not_guaranteed",
"project_specific_selection_required",
"final_award_or_executed_agreement_required",
"approved_award_amount_required_for_conditional_award",
"eligible_cost_basis_required",
"exact_20_percent_match_required",
"partial_award_possible",
"funding_availability_contingency",
"exclude_from_user_facing_total_default"
],
"calculationTrace": [
"CEC page identifies GFO-25-603 as active, competitive, and open through October 16, 2026 with up to $79,000,000 available. ([California Energy Commission][1])",
"CEC workshop/manual materials state a maximum grant award per applicant of 35% of available funds, equal to $27,650,000 when total funds are $79,000,000. ([California Energy Commission][2])",
"The required match is exactly 20% of total allowable project cost, which implies a maximum CEC reimbursable share of 80% of total allowable project cost for a compliant budget. ([California Energy Commission][2])",
"Eligible costs include DCFC EVSE with 4 to 20 CCS ports per station, transformers/electrical equipment, installation, planning/engineering, and up to five years of operations and maintenance; ineligible costs include vehicles, manufacturing, DCFC without CCS connectors, chargers above the 20-port maximum, and land acquisition or lease costs. ([California Energy Commission][2])",
"Applications must pass screening and minimum scoring thresholds; applications that pass are ranked by cost per CCS port and recommended for funding until solicitation funds are exhausted; partial funding is expressly possible. ([California Energy Commission][2])",
"No official GFO-25-603 probability discount, expected award count, application count, or historical success rate for this solicitation was found. Therefore expected_value_cents and probability_discount remain null and the effect is not included in user-facing totals by default."
]
}
]
},
"testCaseInputHints": [
{
"inputKey": "award_selection_status",
"valueType": "enum",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Use unknown, not_applied, or submitted before official award evidence. Only final_award_approved or agreement_executed can unlock a conditional award check; not_selected returns 0."
},
{
"inputKey": "approved_cec_award_cents",
"valueType": "money_cents",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "Null unless an official Notice of Proposed Awards, final award, or executed CEC agreement identifies a project-specific amount. Do not substitute the $27,650,000 applicant cap."
},
{
"inputKey": "total_allowable_project_cost_cents",
"valueType": "money_cents",
"whoProvides": "quote",
"realisticDefaultGuidance": "Use only costs that the solicitation treats as allowable and that are included in the approved budget; exclude land acquisition, vehicles, manufacturing, non-CCS-only DCFC, and other ineligible costs."
},
{
"inputKey": "requested_cec_reimbursable_share_cents",
"valueType": "money_cents",
"whoProvides": "quote",
"realisticDefaultGuidance": "Should generally equal 80% of total allowable project cost for a compliant budget, subject to the applicant cap and any approved partial award."
},
{
"inputKey": "match_share_cents",
"valueType": "money_cents",
"whoProvides": "accountant",
"realisticDefaultGuidance": "Must equal exactly 20% of total allowable project cost within CEC tolerance; do not use less or more."
},
{
"inputKey": "cash_match_share_cents",
"valueType": "money_cents",
"whoProvides": "accountant",
"realisticDefaultGuidance": "Must be at least 50% of the required match share."
},
{
"inputKey": "number_of_ccs_ports",
"valueType": "number",
"whoProvides": "quote",
"realisticDefaultGuidance": "Count CCS Type 1 charging ports only; do not count J3400/NACS-only connectors or non-CCS ports."
},
{
"inputKey": "station_count",
"valueType": "number",
"whoProvides": "user",
"realisticDefaultGuidance": "Application must include at least 1 and no more than 20 EV charging stations."
},
{
"inputKey": "each_station_ccs_port_count",
"valueType": "array",
"whoProvides": "quote",
"realisticDefaultGuidance": "Each station must have between 4 and 20 CCS Type 1 ports."
},
{
"inputKey": "each_ccs_port_power_kw",
"valueType": "array",
"whoProvides": "quote",
"realisticDefaultGuidance": "Use equipment specifications showing each CCS port can meet the solicitation's power-delivery requirement."
},
{
"inputKey": "nevi_6_afc_site_eligibility",
"valueType": "boolean",
"whoProvides": "server_derived",
"realisticDefaultGuidance": "Derive from the CEC NEVI 6 Alternative Fuel Corridors map/layer and site address; false or unknown should block any conditional estimate."
},
{
"inputKey": "cost_per_ccs_port_cents",
"valueType": "money_cents",
"whoProvides": "server_derived",
"realisticDefaultGuidance": "Compute as requested_cec_reimbursable_share_cents divided by number_of_ccs_ports. Use for ranking diagnostics only; it is not a probability estimate."
},
{
"inputKey": "human_reviewed_probability_discount",
"valueType": "number",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "Leave null unless RetroFi has a separately approved probability model supported by official application counts, expected awards, or a documented human-review policy. Do not use the prior 0.15 fallback automatically."
}
],
"remainingGaps": [
"No official GFO-25-603 application count, expected award count, or success rate was found.",
"Official sources provide scoring and cost-per-CCS-port ranking rules, but those rules do not convert to a probability discount.",
"The final project-specific award amount is unknown until CEC publishes/provides an award decision and agreement materials.",
"Actual reimbursable value depends on CEC-approved eligible costs, exact 20% match, documentation, site/equipment eligibility, and agreement/authorization gates.",
"The solicitation allows partial funding when remaining funds are insufficient and reserves funding-availability contingencies."
],
"doNotUseAsUserFacingEstimateReasons": [
"Competitive scored grant; no official probability discount or success-rate evidence.",
"The $79,000,000 solicitation budget and $27,650,000 applicant cap are maximum/up-to amounts, not a guaranteed project award.",
"Applications are ranked by cost per CCS port until funds are exhausted; ranking position is project-specific and unknown at runtime before application results.",
"Award requires application, screening, scoring, CEC recommendation/approval, CEQA/NEPA and agreement steps, and may be partially funded or cancelled if funds become unavailable.",
"Project-specific eligible costs, match documentation, site eligibility, equipment specs, and official award approval are required before a defensible cash value can be calculated."
]
}

[1]: https://www.energy.ca.gov/solicitations/2026-02/gfo-25-603-californias-national-electric-vehicle-infrastructure-formula?utm_source=chatgpt.com "GFO-25-603 - California’s National Electric Vehicle Infrastructure Formula Program – Solicitation 6 Community Charging"
[2]: https://www.energy.ca.gov/sites/default/files/2026-03/GFO-25-603_NEVI_6_Pre-Application_Workshop_Slides_ADA.pdf "GFO-25-603 NEVI Pre-Application Workshop"
[3]: https://www.energy.ca.gov/programs-and-topics/programs/federal-ev-infrastructure-programs/californias-national-electric "California’s National Electric Vehicle Infrastructure (NEVI) Formula Program Map"
[4]: https://www.energy.ca.gov/solicitations/2026-02/gfo-25-603-californias-national-electric-vehicle-infrastructure-formula "GFO-25-603 - California’s National Electric Vehicle Infrastructure Formula Program – Solicitation 6 Community Charging"

