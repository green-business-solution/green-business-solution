{
"schemaVersion": "retrofi_grant_package_repair.v1",
"researchedAt": "2026-07-03",
"opportunityId": "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-605",
"programName": "GFO-25-605 - Reliable Electric Charging for Eligible School-bus Sites (RECESS)",
"status": "suppress_no_probability_evidence",
"sourceConfidence": "high",
"estimateConfidenceIfInputsPresent": "low",
"officialSources": [
{
"title": "GFO-25-605 – Reliable Electric Charging for Eligible School-bus Sites (RECESS)",
"url": "[https://www.energy.ca.gov/solicitations/2026-04/gfo-25-605-reliable-electric-charging-eligible-school-bus-sites-recess](https://www.energy.ca.gov/solicitations/2026-04/gfo-25-605-reliable-electric-charging-eligible-school-bus-sites-recess)",
"owner": "California Energy Commission",
"accessed": "2026-07-03",
"evidenceText": "Official CEC solicitation page lists GFO-25-605 as Active, release date April 06, 2026, submission deadline August 31, 2026 at 11:59 pm, ECAMS submission, up to 2200000000 cents available, and lane budgets/selection types: Lane 1 first-come, Lane 2 competitive, Lane 3 competitive. ([California Energy Commission][1])"
},
{
"title": "00_GFO-25-605 Solicitation_Manual_Addendum_02_ada.docx",
"url": "[https://www.energy.ca.gov/sites/default/files/2026-06/00_GFO-25-605%20Solicitation_Manual_Addendum_02_ada.docx](https://www.energy.ca.gov/sites/default/files/2026-06/00_GFO-25-605%20Solicitation_Manual_Addendum_02_ada.docx)",
"owner": "California Energy Commission",
"accessed": "2026-07-03",
"evidenceText": "Current Addendum 02 solicitation manual is listed in the official CEC solicitation files. The web parser did not fully extract the DOCX, so formula support below is cross-checked against CEC-hosted manual snippets and the official current solicitation page. ([California Energy Commission][1])"
},
{
"title": "00_GFO-25-605_Solicitation_Manual_ada.docx",
"url": "[https://www.energy.ca.gov/sites/default/files/2026-04/00_GFO-25-605_Solicitation_Manual_ada.docx](https://www.energy.ca.gov/sites/default/files/2026-04/00_GFO-25-605_Solicitation_Manual_ada.docx)",
"owner": "California Energy Commission",
"accessed": "2026-07-03",
"evidenceText": "CEC-hosted solicitation manual snippets identify the conditional maximum award formula and lane caps: Level 2 charging ports at 2000000 cents each, dual-port DCFC or bidirectional DCFC at 7500000 cents each, up to single applicant caps; Lane 3 multi-LEA cap is 450000000 cents. ([California Energy Commission][2])"
},
{
"title": "Energy Commission Agreement Management System (ECAMS)",
"url": "[https://ecams.energy.ca.gov/s/login/](https://ecams.energy.ca.gov/s/login/)",
"owner": "California Energy Commission",
"accessed": "2026-07-03",
"evidenceText": "The official CEC solicitation page says applications must be submitted through ECAMS and applicants must have or create an account. ([California Energy Commission][1])"
}
],
"sourceSummary": "Reviewed uploaded package context . The official CEC page confirms the solicitation is active and describes up to 2200000000 cents of funding across Lane 1 first-come funding and competitive Lanes 2 and 3. The CEC-hosted manual supports a conditional maximum award formula, but not a defensible expected value. No official remaining-funds or queue source for Lane 1, historical success rate, expected award count, or application denominator for competitive lanes was found; therefore no value should be included in user-facing totals by default.",
"packagePatch": {
"calculation_status": "no_calculable_value",
"availability": {
"status": "active",
"fundingStatus": "unknown"
},
"input_requirements_to_add_or_update": [
{
"input_key": "funding_lane",
"label": "Funding lane",
"value_type": "enum",
"required_for": [
"effect_grant_expected_value_1_9badcea914d6d42f"
],
"allowed_values": [
"lane_1",
"lane_2",
"lane_3"
],
"source_precedence": [
"user_profile",
"retrofit_assumptions",
"application_status"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "applicant_type",
"label": "Applicant type",
"value_type": "enum",
"required_for": [
"effect_grant_expected_value_1_9badcea914d6d42f"
],
"allowed_values": [
"local_educational_agency",
"third_party_transportation_provider"
],
"source_precedence": [
"user_profile",
"application_status"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "applicant_or_lea_name",
"label": "Applicant or served LEA name",
"value_type": "text",
"required_for": [
"effect_grant_expected_value_1_9badcea914d6d42f"
],
"source_precedence": [
"user_profile",
"application_status"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "eligible_project_cost_cents",
"label": "Eligible project cost in cents",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_9badcea914d6d42f"
],
"source_precedence": [
"quote",
"application_status",
"retrofit_assumptions"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "number_of_l2_charging_ports",
"label": "Number of eligible Level 2 charging ports",
"value_type": "number",
"required_for": [
"effect_grant_expected_value_1_9badcea914d6d42f"
],
"source_precedence": [
"quote",
"retrofit_assumptions",
"application_status"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "number_of_dual_port_dcfc_or_bidirectional_dcfc_chargers",
"label": "Number of eligible dual-port DCFC or dual-port bidirectional DCFC chargers",
"value_type": "number",
"required_for": [
"effect_grant_expected_value_1_9badcea914d6d42f"
],
"source_precedence": [
"quote",
"retrofit_assumptions",
"application_status"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "demonstrated_electric_school_bus_need_count",
"label": "Electric school buses with demonstrated need for charging infrastructure",
"value_type": "number",
"required_for": [
"effect_grant_expected_value_1_9badcea914d6d42f"
],
"source_precedence": [
"application_status",
"user_profile",
"retrofit_assumptions"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "lane_1_maximum_charging_ports_from_table_4",
"label": "Lane 1 maximum charging ports from Table 4 after CEC confirmation",
"value_type": "number",
"required_for": [
"effect_grant_expected_value_1_9badcea914d6d42f"
],
"source_precedence": [
"admin_research",
"application_status"
],
"missing_severity": "blocks_calculation_for_lane_1"
},
{
"input_key": "serves_more_than_one_lea",
"label": "Whether Lane 3 applicant serves more than one LEA",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_9badcea914d6d42f"
],
"source_precedence": [
"application_status",
"user_profile"
],
"missing_severity": "blocks_calculation_for_lane_3"
},
{
"input_key": "application_or_award_status",
"label": "Application or award status",
"value_type": "enum",
"required_for": [
"effect_grant_expected_value_1_9badcea914d6d42f"
],
"allowed_values": [
"not_applied",
"submitted_pending",
"passed_screening",
"selected_for_proposed_award",
"approved_by_cec_business_meeting",
"executed_grant_agreement",
"not_selected",
"withdrawn"
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
"label": "Approved or executed grant award amount in cents",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_9badcea914d6d42f"
],
"source_precedence": [
"application_status",
"admin_research"
],
"missing_severity": "blocks_user_facing_estimate_unless_human_probability_available"
},
{
"input_key": "remaining_lane_funds_or_queue_status",
"label": "Remaining funds or queue status for the applicable lane",
"value_type": "text",
"required_for": [
"effect_grant_expected_value_1_9badcea914d6d42f"
],
"source_precedence": [
"admin_research",
"application_status"
],
"missing_severity": "blocks_user_facing_estimate"
},
{
"input_key": "award_probability_discount",
"label": "Human-reviewed award probability discount",
"value_type": "number",
"required_for": [
"effect_grant_expected_value_1_9badcea914d6d42f"
],
"source_precedence": [
"admin_research",
"application_status"
],
"missing_severity": "blocks_expected_value"
}
],
"effects_to_add_or_update": [
{
"effect_id": "effect_grant_expected_value_1_9badcea914d6d42f",
"effect_type": "grant_expected_value",
"cash_value_classification": "reimbursement",
"value_model_kind": "hybrid_rate_plus_cap",
"calculation": {
"method": "expected_value",
"amount_cents": null,
"percent": null,
"conditional_award_cents": null,
"conditional_award_formula": "Do not calculate expected value unless award_probability_discount is human-reviewed or the project has an approved/executed award amount. If approved and no approved_award_amount_cents is provided, conditional maximum award cents equals the lesser of eligible_project_cost_cents, 2000000 times number_of_l2_charging_ports plus 7500000 times number_of_dual_port_dcfc_or_bidirectional_dcfc_chargers, and the applicable lane cap. Lane 2 cap is 225000000 cents. Lane 3 cap is 225000000 cents when serving one LEA and 450000000 cents when serving more than one LEA. Lane 1 has no fixed applicant-dollar cap in the extracted text; it is constrained by CEC-confirmed Table 4 maximum charging ports and demonstrated electric school bus need. Total requested charging ports must not exceed demonstrated_electric_school_bus_need_count, and for Lane 1 must not exceed lane_1_maximum_charging_ports_from_table_4.",
"max_award_cents": 450000000,
"min_award_cents": null,
"rate_rows": [
{
"row_id": "rate_l2_charging_port",
"row_type": "unit_rate",
"unit_input_key": "number_of_l2_charging_ports",
"unit": "eligible_level_2_charging_port",
"amount_cents_per_unit": 2000000,
"applies_when": "new grid-connected Level 2 charging port for demonstrated electric school bus charging need"
},
{
"row_id": "rate_dual_port_dcfc",
"row_type": "unit_rate",
"unit_input_key": "number_of_dual_port_dcfc_or_bidirectional_dcfc_chargers",
"unit": "eligible_dual_port_dcfc_or_dual_port_bidirectional_dcfc_charger",
"amount_cents_per_unit": 7500000,
"applies_when": "new grid-connected dual-port DCFC or dual-port bidirectional DCFC for demonstrated electric school bus charging need"
},
{
"row_id": "cap_lane_1",
"row_type": "applicant_cap",
"funding_lane": "lane_1",
"cap_cents": null,
"cap_formula": "Port-count limited by CEC-confirmed Table 4 maximum charging ports and demonstrated need; do not use the 400000000 cent lane budget as an applicant cap."
},
{
"row_id": "cap_lane_2",
"row_type": "applicant_cap",
"funding_lane": "lane_2",
"cap_cents": 225000000,
"cap_formula": "25 percent of Lane 2 total funding"
},
{
"row_id": "cap_lane_3_one_lea",
"row_type": "applicant_cap",
"funding_lane": "lane_3",
"serves_more_than_one_lea": false,
"cap_cents": 225000000,
"cap_formula": "25 percent of Lane 3 total funding for an applicant serving one LEA"
},
{
"row_id": "cap_lane_3_more_than_one_lea",
"row_type": "applicant_cap",
"funding_lane": "lane_3",
"serves_more_than_one_lea": true,
"cap_cents": 450000000,
"cap_formula": "50 percent of Lane 3 total funding for an applicant serving more than one LEA"
}
],
"probability_discount": null,
"probability_evidence_type": "none"
},
"required_inputs": [
"funding_lane",
"applicant_type",
"applicant_or_lea_name",
"eligible_project_cost_cents",
"number_of_l2_charging_ports",
"number_of_dual_port_dcfc_or_bidirectional_dcfc_chargers",
"demonstrated_electric_school_bus_need_count",
"lane_1_maximum_charging_ports_from_table_4",
"serves_more_than_one_lea",
"application_or_award_status",
"approved_award_amount_cents",
"remaining_lane_funds_or_queue_status",
"award_probability_discount"
],
"missing_input_behavior": "suppress_until_review",
"includedInUserFacingTotalDefault": false,
"humanReviewRequired": true,
"reasonCodes": [
"expected_value_probability_not_defensible",
"first_come_remaining_funds_and_queue_not_found",
"competitive_lanes_probability_evidence_not_found",
"scoring_criteria_only_for_lanes_2_and_3",
"award_formula_is_conditional_maximum_only",
"project_scope_required",
"eligible_cost_required",
"applicant_eligibility_required",
"cec_award_or_agreement_required",
"do_not_include_in_user_facing_total_default"
],
"calculationTrace": [
"CEC official page lists GFO-25-605 as active with submission deadline August 31, 2026 at 11:59 pm and states up to 2200000000 cents in grant funds for electric school bus EV charging infrastructure. ([California Energy Commission][1])",
"CEC official page separates funding into Lane 1 first-come with 400000000 cents, Lane 2 competitive with 900000000 cents, and Lane 3 competitive with 900000000 cents. ([California Energy Commission][1])",
"CEC-hosted manual snippets support the conditional maximum formula: Level 2 charging ports at 2000000 cents each plus dual-port DCFC or bidirectional DCFC chargers at 7500000 cents each, subject to single applicant caps. ([California Energy Commission][2])",
"CEC-hosted manual snippets identify Lane 2 cap of 225000000 cents and Lane 3 caps of 225000000 cents for one LEA or 450000000 cents for more than one LEA; Lane 1 is port-count constrained by Table 4. ([California Energy Commission][2])",
"CEC-hosted manual snippets indicate competitive applications require a minimum 70 percent score to be eligible and CEC may partially fund proposals if funds are insufficient; this is scoring and award-process evidence, not probability evidence. ([California Energy Commission][2])",
"No official remaining-funds or queue status for Lane 1, no historical applications denominator, and no expected award count were found; expected value remains null."
]
}
]
},
"testCaseInputHints": [
{
"inputKey": "funding_lane",
"valueType": "enum",
"whoProvides": "user",
"realisticDefaultGuidance": "No default. Applicant must choose exactly one lane: lane_1, lane_2, or lane_3."
},
{
"inputKey": "eligible_project_cost_cents",
"valueType": "money_cents",
"whoProvides": "quote",
"realisticDefaultGuidance": "Use a project budget or quote limited to eligible reimbursable costs. Do not infer from total construction cost if eligibility is unclear."
},
{
"inputKey": "number_of_l2_charging_ports",
"valueType": "number",
"whoProvides": "quote",
"realisticDefaultGuidance": "Use actual eligible Level 2 charging port count. Use 0 only if the quote clearly has no L2 ports; otherwise null."
},
{
"inputKey": "number_of_dual_port_dcfc_or_bidirectional_dcfc_chargers",
"valueType": "number",
"whoProvides": "quote",
"realisticDefaultGuidance": "Count eligible dual-port DCFC or dual-port bidirectional DCFC chargers, not ports. Use 0 only if the quote clearly has none; otherwise null."
},
{
"inputKey": "demonstrated_electric_school_bus_need_count",
"valueType": "number",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Use the number of electric school buses for which the applicant can document charging-infrastructure need."
},
{
"inputKey": "lane_1_maximum_charging_ports_from_table_4",
"valueType": "number",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "Only for Lane 1. Derive from CEC Table 4 and any CEC confirmation that the related HVIP purchase order status does not reduce the port count."
},
{
"inputKey": "serves_more_than_one_lea",
"valueType": "boolean",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Only for Lane 3 cap selection. True only when the transportation provider serves more than one LEA under qualifying service commitments."
},
{
"inputKey": "application_or_award_status",
"valueType": "enum",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Do not treat submitted or passed screening as award approval. User-facing estimate should remain suppressed unless selected/approved/executed or human-reviewed probability is supplied."
},
{
"inputKey": "approved_award_amount_cents",
"valueType": "money_cents",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Use the award amount from CEC proposed award, Business Meeting approval, or executed grant agreement when available. Prefer this over calculated maximum."
},
{
"inputKey": "remaining_lane_funds_or_queue_status",
"valueType": "text",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "No default. Requires official CEC/ECAMS/admin confirmation of remaining funds or queue position, especially for Lane 1."
},
{
"inputKey": "award_probability_discount",
"valueType": "number",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "No generic fallback prior. Only use a human-reviewed probability supported by official award/application data or direct administrator confirmation."
}
],
"remainingGaps": [
"Current Addendum 02 DOCX was listed by CEC but not fully machine-extractable through the web parser; ingestion should parse the official DOCX directly before changing rates or caps.",
"No official remaining-funds dashboard, queue position, or funds-exhaustion status was found for Lane 1.",
"No official historical applications count, expected applications count, expected award count, or success-rate evidence was found for competitive Lanes 2 and 3.",
"Applicant-specific eligibility, LEA/transportation-provider pathway, demonstrated electric school bus need, equipment type/count, eligible cost basis, and application/award status remain required.",
"CEC may partially fund proposals or modify funding amounts, so calculated values are maximum conditional estimates unless an approved award amount is supplied."
],
"doNotUseAsUserFacingEstimateReasons": [
"The official source says up to 2200000000 cents is available, not that any applicant will receive an award.",
"Lane 1 is first-come, but remaining funds and applicant queue position were not found.",
"Lanes 2 and 3 are competitive and scored; no probability evidence or success rate was found.",
"The rate formula is a conditional maximum award formula and depends on eligibility, eligible costs, charger counts, demonstrated bus need, lane caps, and CEC award approval.",
"A submitted application, passing score, or project eligibility is not the same as an approved or executed grant award."
]
}

[1]: https://www.energy.ca.gov/solicitations/2026-04/gfo-25-605-reliable-electric-charging-eligible-school-bus-sites-recess?utm_source=chatgpt.com "GFO-25-605 – Reliable Electric Charging for Eligible School-bus Sites (RECESS)"
[2]: https://www.energy.ca.gov/sites/default/files/2026-04/00_GFO-25-605_Solicitation_Manual_ada.docx?utm_source=chatgpt.com "00_GFO-25-605_Solicitation_Manual_ada.docx"

