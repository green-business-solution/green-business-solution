{
"schemaVersion": "retrofi_grant_package_repair.v1",
"researchedAt": "2026-07-03",
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22635",
"programName": "Georgia - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
"status": "closed_or_unavailable",
"sourceConfidence": "high",
"estimateConfidenceIfInputsPresent": "medium",
"officialSources": [
{
"title": "Georgia NEVI Deployment Program: Round 2 Notice of Selection",
"url": "[https://www.dot.ga.gov/PartnerSmart/Innovative/Documents/NEVI_Notice.pdf](https://www.dot.ga.gov/PartnerSmart/Innovative/Documents/NEVI_Notice.pdf)",
"owner": "Georgia Department of Transportation",
"accessed": "2026-07-03",
"evidenceText": "GDOT announced Apparent Best Value Proposers for RFP-484-07012024P3 and listed best-value proposal scores/rankings for the Georgia NEVI Round 2 locations. "
},
{
"title": "Georgia NEVI Round 2 Industry Forum Presentation",
"url": "[https://www.dot.ga.gov/PartnerSmart/Innovative/Documents/GA%20NEVI%20Round%202_Industry%20Forum%20Presentation.pdf](https://www.dot.ga.gov/PartnerSmart/Innovative/Documents/GA%20NEVI%20Round%202_Industry%20Forum%20Presentation.pdf)",
"owner": "Georgia Department of Transportation",
"accessed": "2026-07-03",
"evidenceText": "GDOT states that the developer must fund/finance capital, operating, and maintenance costs and GDOT reimburses a maximum of 80% of eligible costs, subject to eligibility, timing, and availability of public funds. "
},
{
"title": "Georgia EV Infrastructure Deployment Plan",
"url": "[https://www.dot.ga.gov/systems/ProjectDocuments/GANEVI/GDOT%20NEVI%20Plan.pdf](https://www.dot.ga.gov/systems/ProjectDocuments/GANEVI/GDOT%20NEVI%20Plan.pdf)",
"owner": "Georgia Department of Transportation",
"accessed": "2026-07-03",
"evidenceText": "GDOT describes NEVI as competitive deployment of public charging infrastructure and states that future deployment is expected through competitive solicitations consistent with FHWA requirements and state law. "
},
{
"title": "Georgia NEVI Fact Sheet",
"url": "[https://www.dot.ga.gov/systems/ProjectDocuments/GANEVI/NEVI%20Fact%20Sheet.pdf](https://www.dot.ga.gov/systems/ProjectDocuments/GANEVI/NEVI%20Fact%20Sheet.pdf)",
"owner": "Georgia Department of Transportation",
"accessed": "2026-07-03",
"evidenceText": "Georgia's NEVI allotment is approximately $135 million; NEVI-funded sites require at least four high-power 150 kW ports, public 24/7 access, and location within 1 mile of an AFC. "
},
{
"title": "FHWA Notice N 4510.909: FY 2026 NEVI Formula Program Apportionment",
"url": "[https://highways.dot.gov/laws-regulations/directives/notices/n-4510909](https://highways.dot.gov/laws-regulations/directives/notices/n-4510909)",
"owner": "Federal Highway Administration",
"accessed": "2026-07-03",
"evidenceText": "FHWA states that NEVI funds may be used to contract with private entities for publicly accessible EV charging infrastructure, and that the federal share payable is 80%. ([Highway Administration][1])"
},
{
"title": "23 U.S.C. 151: National Electric Vehicle Charging and Fueling Corridors",
"url": "[https://uscode.house.gov/view.xhtml?edition=prelim&num=0&req=granuleid%3AUSC-prelim-title23-section151](https://uscode.house.gov/view.xhtml?edition=prelim&num=0&req=granuleid%3AUSC-prelim-title23-section151)",
"owner": "U.S. House Office of the Law Revision Counsel",
"accessed": "2026-07-03",
"evidenceText": "The statute caps the federal share at not more than 80% of total project cost and requires the private entity to cover the non-federal share when contracted. ([U.S. Code][2])"
}
],
"sourceSummary": "The uploaded current package context was reviewed.  Official sources support treating Georgia NEVI as a GDOT-administered public-private, competitive, site-specific reimbursement procurement rather than a generally available customer rebate. Round 2 is not an open application opportunity: GDOT issued a Notice of Selection on November 20, 2025 for Apparent Best Value Proposers. A conditional reimbursement value can be calculated only for a GDOT-selected/approved project with an executed or approved award record, approved eligible costs, approved award amount, and reimbursement terms. The 80% value is a statutory/program cost-share cap, not a fixed grant amount. Round 2 official scoring records show 26 selected location awards and 41 scored proposer-location submissions, but that historical success rate is not a defensible automatic expected-value prior for a user-facing estimate because competition is location-specific, quality-scored, and closed.",
"packagePatch": {
"calculation_status": "calculable_with_missing_inputs",
"availability": {
"status": "closed",
"fundingStatus": "closed"
},
"input_requirements_to_add_or_update": [
{
"input_key": "gdot_selection_status",
"label": "GDOT NEVI selection or award status",
"value_type": "enum",
"required_for": [
"effect_grant_expected_value_1_8aaf3b374a0e6004"
],
"allowed_values": [
"not_selected",
"apparent_best_value_proposer",
"board_approved_award",
"executed_project_agreement"
],
"source_precedence": [
"application_status",
"program_application",
"admin_review"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "gdot_rfp_or_pi_number",
"label": "GDOT RFP, PI number, or NEVI location identifier",
"value_type": "text",
"required_for": [
"effect_grant_expected_value_1_8aaf3b374a0e6004"
],
"source_precedence": [
"application_status",
"program_application",
"admin_review"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "gdot_project_agreement_executed",
"label": "GDOT project agreement executed or award formally approved",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_8aaf3b374a0e6004"
],
"source_precedence": [
"application_status",
"program_application",
"admin_review"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "approved_award_amount_cents",
"label": "GDOT-approved award or reimbursement cap",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_8aaf3b374a0e6004"
],
"source_precedence": [
"application_status",
"program_application",
"admin_review",
"quote"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "approved_eligible_capital_cost_cents",
"label": "GDOT-approved eligible capital cost",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_8aaf3b374a0e6004"
],
"source_precedence": [
"program_application",
"quote",
"admin_review"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "approved_eligible_o_and_m_cost_cents",
"label": "GDOT-approved eligible operating and maintenance cost",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_8aaf3b374a0e6004"
],
"source_precedence": [
"program_application",
"quote",
"admin_review"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "approved_cost_share_percent",
"label": "GDOT-approved cost share percentage",
"value_type": "number",
"required_for": [
"effect_grant_expected_value_1_8aaf3b374a0e6004"
],
"source_precedence": [
"program_application",
"admin_review"
],
"missing_severity": "blocks_calculation",
"maximum_allowed_value": 0.8
},
{
"input_key": "private_non_federal_match_confirmed",
"label": "private or non-federal match confirmed",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_8aaf3b374a0e6004"
],
"source_precedence": [
"application_status",
"program_application",
"admin_review"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "station_port_count",
"label": "DC fast-charging port count",
"value_type": "number",
"required_for": [
"effect_grant_expected_value_1_8aaf3b374a0e6004"
],
"source_precedence": [
"quote",
"program_application",
"admin_review"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "per_port_power_kw",
"label": "minimum power per charging port in kW",
"value_type": "number",
"required_for": [
"effect_grant_expected_value_1_8aaf3b374a0e6004"
],
"source_precedence": [
"quote",
"program_application",
"admin_review"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "public_24_7_access_confirmed",
"label": "public 24/7 access confirmed",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_8aaf3b374a0e6004"
],
"source_precedence": [
"program_application",
"admin_review"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "reimbursement_milestone_status",
"label": "approved reimbursement milestone status",
"value_type": "enum",
"required_for": [
"effect_grant_expected_value_1_8aaf3b374a0e6004"
],
"allowed_values": [
"not_started",
"construction_complete",
"operations_period_reimbursement",
"final_paid"
],
"source_precedence": [
"application_status",
"program_application",
"admin_review"
],
"missing_severity": "blocks_calculation"
}
],
"effects_to_add_or_update": [
{
"effect_id": "effect_grant_expected_value_1_8aaf3b374a0e6004",
"effect_type": "grant_expected_value",
"cash_value_classification": "reimbursement",
"value_model_kind": "competitive_cost_share",
"calculation": {
"method": "expected_value",
"amount_cents": null,
"percent": 0.8,
"conditional_award_cents": null,
"conditional_award_formula": "If and only if gdot_selection_status is board_approved_award or executed_project_agreement, gdot_project_agreement_executed is true, private_non_federal_match_confirmed is true, and GDOT-approved eligible cost inputs are present: conditional_award_cents = min(approved_award_amount_cents, round((approved_eligible_capital_cost_cents + approved_eligible_o_and_m_cost_cents) * min(approved_cost_share_percent, 0.8))). If those approval inputs are absent, return null and suppress. Do not estimate from quoted cost alone.",
"max_award_cents": null,
"min_award_cents": null,
"rate_rows": [],
"probability_discount": null,
"probability_evidence_type": "historical_success_rate"
},
"required_inputs": [
"gdot_selection_status",
"gdot_rfp_or_pi_number",
"gdot_project_agreement_executed",
"approved_award_amount_cents",
"approved_eligible_capital_cost_cents",
"approved_eligible_o_and_m_cost_cents",
"approved_cost_share_percent",
"private_non_federal_match_confirmed",
"station_port_count",
"per_port_power_kw",
"public_24_7_access_confirmed",
"reimbursement_milestone_status"
],
"missing_input_behavior": "suppress_until_review",
"includedInUserFacingTotalDefault": false,
"humanReviewRequired": true,
"reasonCodes": [
"closed_round_2_notice_of_selection_issued",
"not_general_customer_rebate",
"competitive_site_specific_procurement",
"apparent_best_value_or_project_agreement_required",
"cost_share_cap_only",
"approved_award_amount_required",
"approved_eligible_cost_required",
"reimbursement_subject_to_contract_terms",
"historical_success_rate_not_used_as_default_prior",
"exclude_from_user_facing_total_default"
],
"calculationTrace": [
"Confirm that the project is a GDOT-selected NEVI Round 2 PI/location or a later GDOT NEVI project with equivalent official award documentation.",
"Confirm formal award approval or executed Project Agreement before counting any value.",
"Confirm approved eligible capital plus operating and maintenance costs; do not use unsupported quoted gross cost as the eligible cost basis.",
"Apply the approved GDOT cost-share percentage capped at 0.8.",
"Apply approved_award_amount_cents as the project-specific cap.",
"Suppress when the project is not selected/approved, when only an up-to-80% cap is known, or when approved eligible cost and award amount are missing.",
"Round 2 official records provide a historical proposal-level selection ratio of 26 selected locations over 41 scored proposer-location submissions, but the package must not multiply a user's cost by that ratio without human approval because the procurement is closed and selection is location-specific and quality-scored."
]
}
]
},
"testCaseInputHints": [
{
"inputKey": "gdot_selection_status",
"valueType": "enum",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Default to not_selected unless the user provides a GDOT Notice of Selection, board approval, or executed Project Agreement."
},
{
"inputKey": "gdot_project_agreement_executed",
"valueType": "boolean",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Use false unless there is project-specific GDOT agreement or award documentation."
},
{
"inputKey": "gdot_rfp_or_pi_number",
"valueType": "text",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Example Round 2 format: RFP-484-07012024P3 and PI No. 0020326."
},
{
"inputKey": "approved_award_amount_cents",
"valueType": "money_cents",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Leave null unless the GDOT award/project agreement specifies an approved reimbursement cap or award amount."
},
{
"inputKey": "approved_eligible_capital_cost_cents",
"valueType": "money_cents",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "Use only GDOT-approved eligible capital costs from the application, award, invoice, or reimbursement record."
},
{
"inputKey": "approved_eligible_o_and_m_cost_cents",
"valueType": "money_cents",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "Use 0 only if the approved award excludes operating and maintenance reimbursement; otherwise use GDOT-approved O&M cost."
},
{
"inputKey": "approved_cost_share_percent",
"valueType": "number",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "Maximum official value is 0.8; use a lower value if the project agreement approves less."
},
{
"inputKey": "private_non_federal_match_confirmed",
"valueType": "boolean",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Default false unless project documentation confirms the required non-federal/private share."
},
{
"inputKey": "station_port_count",
"valueType": "number",
"whoProvides": "quote",
"realisticDefaultGuidance": "NEVI-compliant GDOT fact sheet minimum is 4 high-power DCFC ports."
},
{
"inputKey": "per_port_power_kw",
"valueType": "number",
"whoProvides": "quote",
"realisticDefaultGuidance": "NEVI-compliant GDOT fact sheet minimum is 150 kW per port."
},
{
"inputKey": "public_24_7_access_confirmed",
"valueType": "boolean",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Default false unless the approved application or project agreement confirms public 24/7 availability."
},
{
"inputKey": "reimbursement_milestone_status",
"valueType": "enum",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Use not_started unless the project has reached a GDOT-approved construction or operations reimbursement milestone."
}
],
"remainingGaps": [
"The public RFP/Project Agreement and payment mechanism details may require Bid Express access or project-specific documents; no public per-project maximum award table was found in official open sources.",
"No currently open Georgia NEVI solicitation for new applicants was verified; Round 2 has a November 20, 2025 GDOT Notice of Selection.",
"Official Round 2 scoring records allow a derived historical proposal-level selection ratio of 26/41, but that is not a defensible automatic runtime probability for unrelated users or future procurements.",
"A selected project's approved award amount, eligible cost basis, reimbursement milestones, and any project-specific payment caps must come from GDOT award or Project Agreement documents.",
"Future GDOT NEVI solicitations may reopen or change terms; create a new package or re-research before treating the program as open."
],
"doNotUseAsUserFacingEstimateReasons": [
"Round 2 is closed to new applicants based on GDOT's Notice of Selection.",
"The program is a competitive GDOT P3 procurement, not a generally available property-owner rebate.",
"The 80% figure is a maximum federal cost-share cap, not a fixed award amount.",
"Project-specific GDOT selection, award approval, eligible-cost approval, and reimbursement milestones are required.",
"Historical Round 2 selection data is location-specific and quality-scored and must not be used as an automatic expected-value prior.",
"Approved award amount and approved eligible costs are missing for ordinary runtime estimates.",
"Include no value in default user-facing savings totals unless human review confirms an approved GDOT award and eligible reimbursement amount."
]
}

[1]: https://highways.dot.gov/laws-regulations/directives/notices/n-4510909 "N 4510.909 | FHWA"
[2]: https://uscode.house.gov/view.xhtml?edition=prelim&num=0&req=granuleid%3AUSC-prelim-title23-section151 "23 USC 151: National electric vehicle charging and hydrogen, propane, and natural gas fueling corridors"

