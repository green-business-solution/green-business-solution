{
"schemaVersion": "retrofi_grant_package_repair.v1",
"researchedAt": "2026-07-03",
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22666",
"programName": "Alaska - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
"status": "needs_project_inputs",
"sourceConfidence": "high",
"estimateConfidenceIfInputsPresent": "medium",
"officialSources": [
{
"title": "Alaska Energy Authority - Electric Vehicles",
"url": "[https://www.akenergyauthority.org/What-We-Do/Renewable-Energy-and-Energy-Efficiency/Electric-Vehicles](https://www.akenergyauthority.org/What-We-Do/Renewable-Energy-and-Energy-Efficiency/Electric-Vehicles)",
"owner": "Alaska Energy Authority",
"accessed": "2026-07-03",
"evidenceText": "AEA states that FHWA approved Alaska's FY26 Electric Vehicle Implementation Plan on October 10, 2025, that Alaska is eligible to obligate over $52 million in NEVI formula funding available through FY22-FY26, and that Phase 1 covers 2025-2026 while Phase 2 covers 2026-2028. ([AK Energy Authority][1])"
},
{
"title": "State of Alaska Electric Vehicle Infrastructure Implementation Plan FY26",
"url": "[https://www.akenergyauthority.org/Portals/0/What%20We%20Do/Renewable%20Energy%20and%20Energy%20Efficiency/Electric%20Vehicles/20251013%20FINAL%20FY26%20Alaska%20NEVI%20Plan%20508%20Compliant.pdf?ver=1GzaY7TO8_JfAonOxwygFA%3D%3D](https://www.akenergyauthority.org/Portals/0/What%20We%20Do/Renewable%20Energy%20and%20Energy%20Efficiency/Electric%20Vehicles/20251013%20FINAL%20FY26%20Alaska%20NEVI%20Plan%20508%20Compliant.pdf?ver=1GzaY7TO8_JfAonOxwygFA%3D%3D)",
"owner": "Alaska Energy Authority / Alaska Department of Transportation and Public Facilities",
"accessed": "2026-07-03",
"evidenceText": "The FY26 plan lists Alaska's FY22-FY26 NEVI formula allocation as $52,415,294, describes AEA's competitive RFA for EVSE at up to 14 AFC sites, states that AEA and DOT&PF will enter a separate project grant agreement for each chosen site, and requires applicants to construct and maintain EVSE under federal NEVI standards and Buy America requirements. ([AK Energy Authority][2])"
},
{
"title": "National Electric Vehicle Infrastructure Formula Program Interim Final Guidance",
"url": "[https://www.fhwa.dot.gov/environment/nevi/resources/NEVI-Interim-Final-Program-Guidance-8-11-2025.pdf](https://www.fhwa.dot.gov/environment/nevi/resources/NEVI-Interim-Final-Program-Guidance-8-11-2025.pdf)",
"owner": "Federal Highway Administration",
"accessed": "2026-07-03",
"evidenceText": "FHWA guidance states that the federal cost share for NEVI Program projects is 80 percent, that private and state funds can provide the non-federal share, that total federal cost share cannot exceed 80 percent, and that NEVI funds may be used to contract with private entities for acquisition, installation, operations, and maintenance of EV charging infrastructure. ([fhwa.dot.gov][3])"
},
{
"title": "AEA Electric Vehicle Update, October 2023",
"url": "[https://www.akenergyauthority.org/Portals/0/About/Board%20Meetings/Documents/2023/2023.10.25/8D.%20%20Electric%20Vehicle%20Update.pdf?ver=f-CpLDY14psvUAINwZvSTg%3D%3D](https://www.akenergyauthority.org/Portals/0/About/Board%20Meetings/Documents/2023/2023.10.25/8D.%20%20Electric%20Vehicle%20Update.pdf?ver=f-CpLDY14psvUAINwZvSTg%3D%3D)",
"owner": "Alaska Energy Authority",
"accessed": "2026-07-03",
"evidenceText": "AEA reported receiving 34 applications for 14 priority AFC sites, selecting projects in nine Alaska communities, and matching $6.4 million in federal NEVI funding with $1.6 million from private entities selected to install, own, and operate the charging stations. "
},
{
"title": "AIDEA/AEA Procurement - Active Solicitations",
"url": "[https://www.aideaaeaprocurement.org/](https://www.aideaaeaprocurement.org/)",
"owner": "Alaska Industrial Development and Export Authority / Alaska Energy Authority",
"accessed": "2026-07-03",
"evidenceText": "The public active solicitations page showed only an AIDEA hangar RFI and did not show an active Alaska NEVI RFA, so current applicant-facing NEVI funding status should not be assumed open. ([AIDEA/AEA Procurement][4])"
}
],
"sourceSummary": "Official sources support treating Alaska NEVI as a state-administered, competitive, site-specific EV charging infrastructure cost-share program, not a consumer rebate. The conditional cost-share ceiling is 80 percent federal NEVI share with a required non-federal match, but Alaska awards require a current RFA or grant agreement, AEA/DOT&PF selection, eligible project costs, compliance with NEVI/RFA terms, and an approved project-specific award amount. Historical first-round evidence exists, but the 34 applications and nine selected communities are not safe as a current-round project probability. The current public procurement page did not show an open NEVI RFA, so this package should not estimate a user-facing value by default. Prompt context was provided in the uploaded repair file. ",
"packagePatch": {
"calculation_status": "calculable_with_missing_inputs",
"availability": {
"status": "active",
"fundingStatus": "unknown"
},
"input_requirements_to_add_or_update": [
{
"input_key": "current_solicitation_round_or_rfa_id",
"label": "Current Alaska NEVI RFA, solicitation round, or grant agreement identifier",
"value_type": "text",
"required_for": [
"effect_grant_expected_value_1_eff91e0ede6cdd5f"
],
"source_precedence": [
"program_application",
"admin_research",
"user_profile"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "application_or_award_status",
"label": "Application or award status",
"value_type": "enum",
"allowed_values": [
"no_application",
"applied",
"not_selected",
"selected",
"approved",
"executed_grant_agreement"
],
"required_for": [
"effect_grant_expected_value_1_eff91e0ede6cdd5f"
],
"source_precedence": [
"program_application",
"admin_review",
"user_profile"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "approved_award_amount_cents",
"label": "AEA/DOT&PF approved award amount",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_eff91e0ede6cdd5f"
],
"source_precedence": [
"program_application",
"admin_review",
"quote"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "eligible_project_cost_cents",
"label": "Approved eligible project cost",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_eff91e0ede6cdd5f"
],
"source_precedence": [
"quote",
"program_application",
"admin_review"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "non_federal_match_cents",
"label": "Confirmed non-federal match",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_eff91e0ede6cdd5f"
],
"source_precedence": [
"quote",
"program_application",
"user_profile",
"admin_review"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "project_location_and_site_host",
"label": "Project site, host, and ownership or operating entity",
"value_type": "text",
"required_for": [
"effect_grant_expected_value_1_eff91e0ede6cdd5f"
],
"source_precedence": [
"program_application",
"user_profile",
"quote",
"admin_review"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "nevi_public_access_and_standards_compliance",
"label": "NEVI public access, standards, Buy America, operations, maintenance, and data reporting compliance",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_eff91e0ede6cdd5f"
],
"source_precedence": [
"program_application",
"admin_review",
"quote"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "costs_incurred_after_award_or_notice_to_proceed",
"label": "Costs incurred only after award or required notice to proceed",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_eff91e0ede6cdd5f"
],
"source_precedence": [
"program_application",
"quote",
"admin_review"
],
"missing_severity": "blocks_calculation"
}
],
"effects_to_add_or_update": [
{
"effect_id": "effect_grant_expected_value_1_eff91e0ede6cdd5f",
"effect_type": "grant_expected_value",
"cash_value_classification": "reimbursement",
"value_model_kind": "competitive_cost_share",
"calculation": {
"method": "expression",
"amount_cents": null,
"percent": 0.8,
"conditional_award_cents": null,
"conditional_award_formula": "Do not estimate from eligibility alone. Calculate only when application_or_award_status is selected, approved, or executed_grant_agreement and approved_award_amount_cents is present. Runtime conditional_award_cents = min(approved_award_amount_cents, round(eligible_project_cost_cents * 0.80)). Require non_federal_match_cents >= round(eligible_project_cost_cents * 0.20), current Alaska NEVI RFA or grant agreement terms, and NEVI-compliant public EV charging scope. If any required input is missing, return null and suppress from user-facing totals.",
"max_award_cents": null,
"min_award_cents": null,
"rate_rows": [],
"probability_discount": null,
"probability_evidence_type": "none"
},
"required_inputs": [
"current_solicitation_round_or_rfa_id",
"application_or_award_status",
"approved_award_amount_cents",
"eligible_project_cost_cents",
"non_federal_match_cents",
"project_location_and_site_host",
"nevi_public_access_and_standards_compliance",
"costs_incurred_after_award_or_notice_to_proceed"
],
"missing_input_behavior": "calculate_when_present",
"includedInUserFacingTotalDefault": false,
"humanReviewRequired": false,
"reasonCodes": [
"official_sources_confirm_formula_funded_state_nevi_program",
"competitive_rfa_or_project_agreement_required",
"federal_cost_share_ceiling_80_percent",
"non_federal_match_required",
"approved_award_amount_required",
"eligible_cost_basis_required",
"no_current_nevi_rfa_found_on_active_procurement_page",
"current_applicant_funding_status_unknown",
"historical_34_applications_and_9_communities_not_used_as_current_probability",
"do_not_include_in_user_facing_total_by_default"
],
"calculationTrace": [
"Verify there is a current Alaska NEVI RFA, selection notice, award letter, or executed project grant agreement for the site.",
"Confirm application_or_award_status is selected, approved, or executed_grant_agreement.",
"Confirm eligible_project_cost_cents under the current RFA or grant agreement.",
"Compute 0.80 multiplied by eligible_project_cost_cents.",
"Cap the result at approved_award_amount_cents.",
"Confirm non_federal_match_cents is at least 20 percent of eligible_project_cost_cents and that project scope complies with NEVI public-access, ownership, operation, maintenance, data reporting, Buy America, and timing requirements.",
"If funding status, selection status, approved award amount, eligible cost, or compliance is missing, return null and suppress."
]
}
]
},
"testCaseInputHints": [
{
"inputKey": "current_solicitation_round_or_rfa_id",
"valueType": "text",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "No default. Use the current AEA/AIDEA Alaska NEVI RFA number, solicitation round, selection notice, or executed grant agreement identifier."
},
{
"inputKey": "application_or_award_status",
"valueType": "enum",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Use one of no_application, applied, not_selected, selected, approved, or executed_grant_agreement. Calculate only for selected, approved, or executed_grant_agreement."
},
{
"inputKey": "approved_award_amount_cents",
"valueType": "money_cents",
"whoProvides": "application_status",
"realisticDefaultGuidance": "No default. Must come from AEA/DOT&PF award notice, grant agreement, or other administrator-approved award documentation."
},
{
"inputKey": "eligible_project_cost_cents",
"valueType": "money_cents",
"whoProvides": "quote",
"realisticDefaultGuidance": "Use approved eligible costs only. Do not use total quote cost unless ineligible, pre-award, unrelated, real-estate, building, parking, and non-NEVI costs have been excluded under the current RFA or grant agreement."
},
{
"inputKey": "non_federal_match_cents",
"valueType": "money_cents",
"whoProvides": "user",
"realisticDefaultGuidance": "Should be at least 20 percent of eligible_project_cost_cents unless the current grant agreement states a stricter match requirement."
},
{
"inputKey": "project_location_and_site_host",
"valueType": "text",
"whoProvides": "user",
"realisticDefaultGuidance": "Use the selected site, site host, property owner, charging operator, and location from the application or grant agreement."
},
{
"inputKey": "nevi_public_access_and_standards_compliance",
"valueType": "boolean",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "True only when the current RFA or grant agreement confirms the site is NEVI-compliant and publicly available or available to authorized commercial motor vehicle operators from more than one company."
},
{
"inputKey": "costs_incurred_after_award_or_notice_to_proceed",
"valueType": "boolean",
"whoProvides": "quote",
"realisticDefaultGuidance": "True only when project costs were or will be incurred after the administrator-required award, agreement, or notice-to-proceed date."
}
],
"remainingGaps": [
"No current open Alaska NEVI applicant-facing RFA was found on the public AIDEA/AEA active solicitations page; future Phase 2 solicitation terms may change.",
"No official current-round applicant success probability was found. First-round evidence of 34 applications and selections in nine communities is historical and community/site-based, not a defensible project-specific current probability.",
"No official per-project maximum award cap for future Alaska NEVI rounds was found. Use the current RFA or executed award agreement for any per-project cap.",
"Eligible and ineligible cost details must be confirmed against the current Alaska NEVI RFA or project grant agreement before runtime calculation.",
"Funding is available to the state under the approved FY26 plan, but funding availability for a new applicant or site remains unknown without a current solicitation or award decision."
],
"doNotUseAsUserFacingEstimateReasons": [
"The 80 percent NEVI share is a federal cost-share ceiling, not a guaranteed payment.",
"The program uses competitive, site-specific selection and separate project grant agreements.",
"Project-specific award approval and an approved award amount are required before calculating a value.",
"The public active procurement page did not show a current open Alaska NEVI RFA.",
"Historical first-round application and selection data should not be used as a current project probability without human review.",
"Eligible cost basis, non-federal match, timing, site eligibility, and NEVI compliance must be confirmed."
]
}

[1]: https://www.akenergyauthority.org/What-We-Do/Renewable-Energy-and-Energy-Efficiency/Electric-Vehicles "
    Alaska Energy Authority > What We Do > Renewable Energy and Energy Efficiency > Electric Vehicles
"
[2]: https://www.akenergyauthority.org/Portals/0/What%20We%20Do/Renewable%20Energy%20and%20Energy%20Efficiency/Electric%20Vehicles/20251013%20FINAL%20FY26%20Alaska%20NEVI%20Plan%20508%20Compliant.pdf?ver=1GzaY7TO8_JfAonOxwygFA%3D%3D "State of Alaska Electric Vehicle Infrastructure Implementation Plan FY 26"
[3]: https://www.fhwa.dot.gov/environment/nevi/resources/NEVI-Interim-Final-Program-Guidance-8-11-2025.pdf "National Electric Vehicle Infrastructure Formula Program Interim Final Guidance "
[4]: https://www.aideaaeaprocurement.org/ "AIDEA/AEA Procurement Home Page"

