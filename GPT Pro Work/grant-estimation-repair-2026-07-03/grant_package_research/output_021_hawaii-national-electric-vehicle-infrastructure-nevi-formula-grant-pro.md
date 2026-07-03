{
"schemaVersion": "retrofi_grant_package_repair.v1",
"researchedAt": "2026-07-03",
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22630",
"programName": "Hawaii - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
"status": "needs_project_inputs",
"sourceConfidence": "high",
"estimateConfidenceIfInputsPresent": "medium",
"officialSources": [
{
"title": "Hawaii NEVI State Plan",
"url": "[https://hidot.hawaii.gov/highways/hawaii-nevi-state-plan/](https://hidot.hawaii.gov/highways/hawaii-nevi-state-plan/)",
"owner": "Hawaii Department of Transportation",
"accessed": "2026-07-03",
"evidenceText": "HDOT hosts the Hawaii NEVI State Plan page and links the 2025 State Plan Update; the page describes NEVI as a federal program providing dedicated funding to states and lists federal site requirements such as four 150 kW DC fast chargers per site and 600 kW site capability. ([Hawaii Department of Transportation][1])"
},
{
"title": "Hawaii 2025 NEVI Plan Update",
"url": "[https://hidot.hawaii.gov/highways/files/2025/09/20250911-HDOT-letter-Submitting-2025-NEVI-Plan-for-FY26-funding-approved-by-FHWA.pdf](https://hidot.hawaii.gov/highways/files/2025/09/20250911-HDOT-letter-Submitting-2025-NEVI-Plan-for-FY26-funding-approved-by-FHWA.pdf)",
"owner": "Hawaii Department of Transportation",
"accessed": "2026-07-03",
"evidenceText": "The 2025 update says HDOT is using NEVI to deploy charging infrastructure through fiscal year 2026, describes use of HDOT's fleet electrification contract and a nonstandard approach that includes forgoing competitive bid processes, and lists planned/under-construction stations with site costs and funding-source years. ([Hawaii Department of Transportation][2]) ([Hawaii Department of Transportation][2]) ([Hawaii Department of Transportation][2])"
},
{
"title": "New electric vehicle charging station at Princeville Library under construction",
"url": "[https://hidot.hawaii.gov/highways/new-electric-vehicle-charging-station-at-princeville-library-under-construction/](https://hidot.hawaii.gov/highways/new-electric-vehicle-charging-station-at-princeville-library-under-construction/)",
"owner": "Hawaii Department of Transportation",
"accessed": "2026-07-03",
"evidenceText": "HDOT states the Princeville Library public charger infrastructure is NEVI-funded, will be publicly accessible, and lists statewide planned locations and statuses for 11 NEVI charging stations. ([Hawaii Department of Transportation][3])"
},
{
"title": "Preparations to begin for construction of EV charging station at Kapalua Airport",
"url": "[https://hidot.hawaii.gov/airports/preparations-to-begin-for-construction-of-ev-charging-station-at-kapalua-airport/](https://hidot.hawaii.gov/airports/preparations-to-begin-for-construction-of-ev-charging-station-at-kapalua-airport/)",
"owner": "Hawaii Department of Transportation",
"accessed": "2026-07-03",
"evidenceText": "HDOT describes Kapalua Airport as a NEVI-funded public charging station project, with four 150 kW DC fast chargers and a station cost of $3.2 million, supporting that this is site-specific infrastructure deployment rather than a standard customer rebate. ([Hawaii Department of Transportation][4])"
},
{
"title": "National Electric Vehicle Infrastructure Formula Program Fact Sheet",
"url": "[https://highways.dot.gov/iija/fact-sheets/national-electric-vehicle-infrastructure-formula-program](https://highways.dot.gov/iija/fact-sheets/national-electric-vehicle-infrastructure-formula-program)",
"owner": "Federal Highway Administration",
"accessed": "2026-07-03",
"evidenceText": "FHWA describes NEVI as formula funding to states, says funds are not available for obligation until a state plan is approved, lists an 80% federal share, describes eligible EV charging infrastructure projects, and allows contracting with private entities. ([Federal Highway Administration][5])"
},
{
"title": "23 U.S.C. 151 - National electric vehicle charging and hydrogen, propane, and natural gas fueling corridors",
"url": "[https://uscode.house.gov/view.xhtml?edition=prelim&num=0&req=granuleid%3AUSC-prelim-title23-section151](https://uscode.house.gov/view.xhtml?edition=prelim&num=0&req=granuleid%3AUSC-prelim-title23-section151)",
"owner": "Office of the Law Revision Counsel, U.S. House of Representatives",
"accessed": "2026-07-03",
"evidenceText": "Federal statute limits the federal share for projects under this subsection to no more than 80% of total project cost and requires a contracted private entity to pay the non-federal share. ([U.S. Code][6])"
},
{
"title": "National Electric Vehicle Infrastructure Formula Program Interim Final Guidance",
"url": "[https://www.fhwa.dot.gov/environment/nevi/resources/NEVI-Interim-Final-Program-Guidance-8-11-2025.pdf](https://www.fhwa.dot.gov/environment/nevi/resources/NEVI-Interim-Final-Program-Guidance-8-11-2025.pdf)",
"owner": "Federal Highway Administration",
"accessed": "2026-07-03",
"evidenceText": "FHWA's 2025 Interim Final Guidance says NEVI funds are for vehicle-charging projects open to the public or to authorized commercial motor vehicle operators from more than one company, and lists eligible categories including new chargers, charger upgrades, directly related on-site batteries, electric service equipment, and limited operating assistance. ([Federal Highway Administration][7])"
},
{
"title": "National Electric Vehicle Infrastructure Formula Program Guidance, 90 FR 39025",
"url": "[https://www.federalregister.gov/documents/2025/08/13/2025-15370/national-electric-vehicle-infrastructure-formula-program-guidance](https://www.federalregister.gov/documents/2025/08/13/2025-15370/national-electric-vehicle-infrastructure-formula-program-guidance)",
"owner": "Federal Highway Administration / Federal Register",
"accessed": "2026-07-03",
"evidenceText": "The Federal Register notice states that the revised NEVI Interim Final Guidance became effective on August 13, 2025 and was intended to streamline and provide flexibility for program implementation. ([Federal Register][8])"
}
],
"sourceSummary": "The uploaded package context was reviewed as the starting point.  Official HDOT and FHWA materials support classifying Hawaii NEVI as a state-administered formula deployment program for public EV charging infrastructure, not an open direct customer rebate. The only broadly supported numeric rule is the federal cap of no more than 80% of total or eligible project cost; that cap is not an award guarantee. HDOT materials show project-specific stations, site estimates, contractor implementation, and an insufficient $17.7 million NEVI formula allocation for full build-out, so RetroFi should not include a default savings estimate for general users. ([Hawaii Department of Transportation][2])",
"packagePatch": {
"calculation_status": "calculable_with_missing_inputs",
"availability": {
"status": "active",
"fundingStatus": "unknown"
},
"input_requirements_to_add_or_update": [
{
"input_key": "hdot_selection_or_contract_status",
"label": "HDOT NEVI selection or contract status",
"value_type": "enum",
"allowed_values": [
"approved_hdot_project",
"executed_hdot_contract_or_subcontract",
"pending_review",
"not_selected",
"unknown"
],
"required_for": [
"effect_grant_expected_value_1_83bd8b19270e1ac1"
],
"source_precedence": [
"program_application",
"admin_review",
"contract",
"user_profile"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "approved_award_amount_cents",
"label": "approved NEVI award amount in cents",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_83bd8b19270e1ac1"
],
"source_precedence": [
"program_application",
"contract",
"admin_review"
],
"missing_severity": "blocks_calculation_unless_approved_cost_share_path_present"
},
{
"input_key": "approved_eligible_project_cost_cents",
"label": "approved eligible project cost in cents",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_83bd8b19270e1ac1"
],
"source_precedence": [
"program_application",
"contract",
"quote",
"admin_review"
],
"missing_severity": "blocks_calculation_unless_approved_award_amount_present"
},
{
"input_key": "approved_federal_cost_share_percent",
"label": "approved federal cost-share percentage",
"value_type": "number",
"validation": {
"minimum": 0,
"maximum": 0.8,
"do_not_default_to_maximum": true
},
"required_for": [
"effect_grant_expected_value_1_83bd8b19270e1ac1"
],
"source_precedence": [
"program_application",
"contract",
"admin_review"
],
"missing_severity": "blocks_calculation_unless_approved_award_amount_present"
},
{
"input_key": "nevi_site_location",
"label": "HDOT NEVI site location",
"value_type": "text",
"required_for": [
"effect_grant_expected_value_1_83bd8b19270e1ac1"
],
"source_precedence": [
"program_application",
"contract",
"admin_review",
"user_profile"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "charger_power_and_port_count",
"label": "charger power and port count",
"value_type": "text",
"required_for": [
"effect_grant_expected_value_1_83bd8b19270e1ac1"
],
"source_precedence": [
"quote",
"program_application",
"contract",
"admin_review"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "applicant_is_hdot_or_hdot_contractor",
"label": "applicant is HDOT or HDOT-contracted project participant",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_83bd8b19270e1ac1"
],
"source_precedence": [
"contract",
"program_application",
"admin_review"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "approval_documentation_url_or_id",
"label": "approval, contract, or award documentation reference",
"value_type": "text",
"required_for": [
"effect_grant_expected_value_1_83bd8b19270e1ac1"
],
"source_precedence": [
"contract",
"program_application",
"admin_review"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "award_probability",
"label": "award probability",
"value_type": "text",
"required_for": [],
"source_precedence": [],
"missing_severity": "not_required",
"action": "remove_or_ignore",
"reason": "No defensible pre-selection probability model was found for a general customer because no open direct customer application path was verified."
},
{
"input_key": "selection_status",
"label": "selection status",
"value_type": "text",
"required_for": [],
"source_precedence": [],
"missing_severity": "not_required",
"action": "merge_into_hdot_selection_or_contract_status",
"reason": "Use one explicit HDOT selection or contract status input to avoid duplicate blocking inputs."
}
],
"effects_to_add_or_update": [
{
"effect_id": "effect_grant_expected_value_1_83bd8b19270e1ac1",
"effect_type": "one_time_savings",
"cash_value_classification": "reimbursement",
"value_model_kind": "formula_grant",
"calculation": {
"method": "expression",
"amount_cents": null,
"percent": null,
"conditional_award_cents": null,
"conditional_award_formula": "Suppress unless hdot_selection_or_contract_status is approved_hdot_project or executed_hdot_contract_or_subcontract, applicant_is_hdot_or_hdot_contractor is true, and approval_documentation_url_or_id is present. If approved_award_amount_cents is documented, use approved_award_amount_cents. Otherwise, if approved_eligible_project_cost_cents and approved_federal_cost_share_percent are both documented, calculate round(approved_eligible_project_cost_cents * approved_federal_cost_share_percent), with approved_federal_cost_share_percent capped at 0.8. Do not use 0.8 as a default rate; it is only a statutory maximum federal share.",
"max_award_cents": null,
"min_award_cents": null,
"rate_rows": [],
"probability_discount": null,
"probability_evidence_type": "not_required"
},
"required_inputs": [
{
"input_key": "hdot_selection_or_contract_status",
"required_condition": "always",
"accepted_values_for_calculation": [
"approved_hdot_project",
"executed_hdot_contract_or_subcontract"
]
},
{
"input_key": "applicant_is_hdot_or_hdot_contractor",
"required_condition": "always",
"accepted_values_for_calculation": [
true
]
},
{
"input_key": "approval_documentation_url_or_id",
"required_condition": "always"
},
{
"input_key": "nevi_site_location",
"required_condition": "always"
},
{
"input_key": "charger_power_and_port_count",
"required_condition": "always"
},
{
"input_key": "approved_award_amount_cents",
"required_condition": "preferred_calculation_path"
},
{
"input_key": "approved_eligible_project_cost_cents",
"required_condition": "required_if_approved_award_amount_cents_missing"
},
{
"input_key": "approved_federal_cost_share_percent",
"required_condition": "required_if_approved_award_amount_cents_missing"
}
],
"missing_input_behavior": "suppress_until_review",
"includedInUserFacingTotalDefault": false,
"humanReviewRequired": true,
"reasonCodes": [
"no_open_direct_customer_grant_verified",
"state_formula_deployment_program",
"hdot_project_selection_or_contract_required",
"approved_award_or_approved_cost_share_required",
"do_not_use_statutory_80_percent_max_as_award",
"no_preapproval_probability_model",
"funding_status_for_direct_customer_unknown",
"exclude_from_user_facing_total_by_default"
],
"calculationTrace": [
"Treat Hawaii NEVI as HDOT-administered deployment funding for public charging infrastructure, not as a direct customer rebate.",
"Use an approved award amount if an HDOT contract, approval, or award record states a dollar amount.",
"If no approved award amount is present, use only a documented approved federal cost-share percentage and documented approved eligible project cost.",
"Reject any calculation that uses the statutory 80% federal share as the default award rate; 80% is only a maximum.",
"Suppress the effect unless project approval, HDOT selection or contract status, site location, charger scope, and approved cost or award documentation are present.",
"Do not apply an award probability discount because no open applicant pool or success-rate evidence was found for a general customer-facing grant path."
]
}
]
},
"testCaseInputHints": [
{
"inputKey": "hdot_selection_or_contract_status",
"valueType": "enum",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Use unknown unless an HDOT approval, contract, subcontract, or official award record confirms the project is part of Hawaii NEVI deployment."
},
{
"inputKey": "applicant_is_hdot_or_hdot_contractor",
"valueType": "boolean",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Use false for ordinary residential or commercial customers. Use true only for HDOT or a verified HDOT-contracted project participant."
},
{
"inputKey": "approved_award_amount_cents",
"valueType": "money_cents",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Leave null unless an executed agreement or official approval record states the NEVI reimbursement or award amount."
},
{
"inputKey": "approved_eligible_project_cost_cents",
"valueType": "money_cents",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "Use the cost basis approved for NEVI reimbursement, not a preliminary quote, total station estimate, or HDOT planning estimate."
},
{
"inputKey": "approved_federal_cost_share_percent",
"valueType": "number",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "Must come from an approval or contract document and cannot exceed 0.8. Do not default this input to 0.8."
},
{
"inputKey": "nevi_site_location",
"valueType": "text",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "Use the approved HDOT NEVI site name or location from the contract or state plan, such as Kapalua Airport, Princeville Library, Mililani, Port Allen, Hilo, Waimea, Kona, Oceanview, or Volcano when applicable."
},
{
"inputKey": "charger_power_and_port_count",
"valueType": "text",
"whoProvides": "quote",
"realisticDefaultGuidance": "Use the approved charging configuration. HDOT official materials commonly describe four 150 kW DC fast chargers for NEVI sites, but the calculation should use the project-specific approved scope."
},
{
"inputKey": "approval_documentation_url_or_id",
"valueType": "text",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "Provide the contract number, award reference, approval letter, or administrator document URL. Suppress without documentation."
}
],
"remainingGaps": [
"No official HDOT customer-facing rebate page, standard award table, solicitation intake, or open application guide was verified.",
"No defensible probability model was found for general applicants because the available official materials describe HDOT deployment and contracts, not an open applicant pool.",
"The official 80% federal share is a maximum, not a fixed award rate; actual approved federal share or award amount remains project-specific.",
"HDOT planning estimates such as $3.2 million or $3.5 million per station are not customer caps or standard grant amounts.",
"Funding availability for a new direct customer application is not established; the official materials support ongoing HDOT deployment, not open customer funds.",
"If a project is outside an HDOT-selected or HDOT-contracted NEVI site, no calculable cash grant value is supported."
],
"doNotUseAsUserFacingEstimateReasons": [
"No open direct customer grant or rebate path was verified.",
"Project-specific HDOT selection, contract, or approval is required.",
"The 80% federal share is only a maximum and should not be treated as an expected award.",
"No applicant success-rate or probability evidence exists for a general customer estimate.",
"Approved eligible cost, approved federal share, or approved award amount must be documented before any runtime calculation.",
"Default user-facing savings totals should exclude this package unless verified approval documentation is present and human review has confirmed the calculation path."
]
}

[1]: https://hidot.hawaii.gov/highways/hawaii-nevi-state-plan/ "Hawaii NEVI State Plan   | Highways"
[2]: https://hidot.hawaii.gov/highways/files/2025/09/20250911-HDOT-letter-Submitting-2025-NEVI-Plan-for-FY26-funding-approved-by-FHWA.pdf "DEP-HWY 25.2.80036 HI 2025 NEVI Plan Update (part 1) - signed.pdf"
[3]: https://hidot.hawaii.gov/highways/new-electric-vehicle-charging-station-at-princeville-library-under-construction/ "New electric vehicle charging station at Princeville Library under construction   | Highways"
[4]: https://hidot.hawaii.gov/airports/preparations-to-begin-for-construction-of-ev-charging-station-at-kapalua-airport/ "Preparations to begin for construction of EV charging station at Kapalua Airport   | Airports"
[5]: https://highways.dot.gov/iija/fact-sheets/national-electric-vehicle-infrastructure-formula-program "National Electric Vehicle Infrastructure Formula Program | FHWA"
[6]: https://uscode.house.gov/view.xhtml?edition=prelim&num=0&req=granuleid%3AUSC-prelim-title23-section151 "23 USC 151: National electric vehicle charging and hydrogen, propane, and natural gas fueling corridors"
[7]: https://www.fhwa.dot.gov/environment/nevi/resources/NEVI-Interim-Final-Program-Guidance-8-11-2025.pdf "National Electric Vehicle Infrastructure Formula Program Interim Final Guidance "
[8]: https://www.federalregister.gov/documents/2025/08/13/2025-15370/national-electric-vehicle-infrastructure-formula-program-guidance "
      Federal Register
       \:: 
      National Electric Vehicle Infrastructure Formula Program Guidance
    "

