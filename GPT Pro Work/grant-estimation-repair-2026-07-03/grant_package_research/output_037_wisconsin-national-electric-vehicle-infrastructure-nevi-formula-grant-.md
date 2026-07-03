<!-- Missing GPT Pro output for Wisconsin NEVI. Paste the Wisconsin repair JSON here before importing prompt 37. -->

{
"schemaVersion": "retrofi_grant_package_repair.v1",
"researchedAt": "2026-07-03",
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22650",
"programName": "Wisconsin - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
"status": "needs_project_inputs",
"sourceConfidence": "high",
"estimateConfidenceIfInputsPresent": "low",
"officialSources": [
{
"title": "Electric Vehicles in WI",
"url": "[https://wisconsindot.gov/Pages/projects/multimodal/electrification.aspx](https://wisconsindot.gov/Pages/projects/multimodal/electrification.aspx)",
"owner": "Wisconsin Department of Transportation",
"accessed": "2026-07-03",
"evidenceText": "WisDOT describes WEVI as a competitive grant program for eligible entities to install, own, operate, and maintain NEVI-compliant EV charging stations; it also states the program involves up to 80% federal funding and at least 20% non-federal match. The current Connecting Corridors RFP was released May 26, 2026 and applications are due July 24, 2026 at 11:59 p.m. CT. ([Wisconsin DOT][1])"
},
{
"title": "WisDOT announces grant application period open for next round of National Electric Vehicle Infrastructure funding in Wisconsin",
"url": "[https://wisconsindot.gov/Pages/about-wisdot/newsroom/news-rel/052626-WEVI-connecting-corridors.aspx](https://wisconsindot.gov/Pages/about-wisdot/newsroom/news-rel/052626-WEVI-connecting-corridors.aspx)",
"owner": "Wisconsin Department of Transportation",
"accessed": "2026-07-03",
"evidenceText": "WisDOT states it is accepting project proposals through July 24, 2026, will review submitted applications and announce awards in fall 2026, has approximately 4000000000 cents in unobligated program funds, and funding covers up to 80% of eligible costs with at least 20% non-federal match. ([Wisconsin DOT][2])"
},
{
"title": "WEVI Connecting Corridors Request for Proposals",
"url": "[https://wisconsindot.gov/Documents/projects/multimodal/WEVI-Connecting-Corridors-RFP.pdf](https://wisconsindot.gov/Documents/projects/multimodal/WEVI-Connecting-Corridors-RFP.pdf)",
"owner": "Wisconsin Department of Transportation",
"accessed": "2026-07-03",
"evidenceText": "The RFP seeks competitive proposals and provides reimbursement of up to 80% of eligible costs, with a minimum 20% non-federal cost-share and no maximum project funding amount. It also requires FHWA authorization, final grant agreement execution, WisDOT notices, approved budgets, proof of payment, and continuing compliance before reimbursement. ([Wisconsin DOT][3])"
},
{
"title": "WEVI Connecting Corridors RFP Questions and Answers",
"url": "[https://wisconsindot.gov/Documents/projects/multimodal/WEVI-connecting-corridors-QA.pdf](https://wisconsindot.gov/Documents/projects/multimodal/WEVI-connecting-corridors-QA.pdf)",
"owner": "Wisconsin Department of Transportation",
"accessed": "2026-07-03",
"evidenceText": "WisDOT confirms there is no maximum grant amount, each site can only be awarded up to 80% of eligible expenses, each grantee must provide at least 20% of total eligible cost, approximately 4000000000 cents is unobligated, and work performed before an executed grant agreement is not eligible for reimbursement. ([Wisconsin DOT][4])"
},
{
"title": "WEVI Connecting Corridor Proposal Submission Package",
"url": "[https://wisconsindot.gov/Documents/projects/multimodal/WEVI-Submission-Packet.pdf](https://wisconsindot.gov/Documents/projects/multimodal/WEVI-Submission-Packet.pdf)",
"owner": "Wisconsin Department of Transportation",
"accessed": "2026-07-03",
"evidenceText": "The submission package requires a proposal budget, requested federal share not exceeding 80% of total project cost, recipient cost-share of at least 20%, total project cost, cost per port, and cost-share source. It also requires technical compliance details such as port count, kW per port, connector counts, site location, payment access, hours, and EVITP installer information. ([Wisconsin DOT][5])"
},
{
"title": "Wisconsin Electric Vehicle Infrastructure Plan - 2024 Plan Update",
"url": "[https://wisconsindot.gov/Documents/projects/multimodal/WEVI-plan-update-final-9-2024.pdf](https://wisconsindot.gov/Documents/projects/multimodal/WEVI-plan-update-final-9-2024.pdf)",
"owner": "Wisconsin Department of Transportation",
"accessed": "2026-07-03",
"evidenceText": "For historical probability evidence, WisDOT reports 264 Round 1 applications, 235 applications eligible after Step 1 review, and 53 conditional awards announced on May 23, 2024. This supports only a historical selected-application ratio of about 0.20 and is not current-round probability proof. ([Wisconsin DOT][6])"
},
{
"title": "23 CFR Part 680 - National Electric Vehicle Infrastructure Standards and Requirements",
"url": "[https://www.ecfr.gov/current/title-23/chapter-I/subchapter-G/part-680](https://www.ecfr.gov/current/title-23/chapter-I/subchapter-G/part-680)",
"owner": "eCFR / Federal Highway Administration",
"accessed": "2026-07-03",
"evidenceText": "The eCFR states that 23 CFR Part 680 prescribes minimum standards and requirements for NEVI Formula Program-funded projects and certain publicly accessible EV charger projects funded under Title 23. ([eCFR][7])"
}
],
"sourceSummary": "The uploaded package context was the repair target.  Official sources support an active 2026 WisDOT WEVI Connecting Corridors competitive reimbursement program, not an entitlement rebate. The 80% value is an upper cost-share cap, not a guaranteed award. Runtime calculation should require project-specific approved award and eligible paid cost inputs, or suppress the estimate. A historical 53-of-264 award/application ratio can be retained only as a low-confidence historical prior and should not be included in user-facing totals by default. ([Wisconsin DOT][2])",
"packagePatch": {
"calculation_status": "calculable_with_missing_inputs",
"availability": {
"status": "active",
"fundingStatus": "open_funds_available"
},
"input_requirements_to_add_or_update": [
{
"input_key": "applicant_entity_type",
"label": "Applicant entity type",
"value_type": "enum",
"required_for": [
"effect_grant_expected_value_1_87952524be536771"
],
"source_precedence": [
"user_profile",
"program_application",
"admin_review"
],
"missing_severity": "blocks_calculation",
"notes": "Eligible current-round proposers are private businesses, nonprofits authorized to do business in Wisconsin, and Tribal organizations; utilities and public/governmental entities are ineligible under the Connecting Corridors RFP."
},
{
"input_key": "proposed_site_address_or_coordinates",
"label": "Proposed EV charging site address or coordinates",
"value_type": "text",
"required_for": [
"effect_grant_expected_value_1_87952524be536771"
],
"source_precedence": [
"program_application",
"quote",
"user_profile",
"admin_review"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "site_location_classification",
"label": "WEVI corridor or priority-location classification",
"value_type": "enum",
"required_for": [
"effect_grant_expected_value_1_87952524be536771"
],
"source_precedence": [
"admin_review",
"program_application",
"user_profile"
],
"missing_severity": "blocks_calculation",
"notes": "Needed because site location is scored and proposals outside the identified/priority corridors receive lower or zero site-location scoring."
},
{
"input_key": "site_previously_awarded_wevi_funding",
"label": "Whether site already received WEVI Round 1 or Round 1.5 funding",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_87952524be536771"
],
"source_precedence": [
"admin_review",
"program_application",
"user_profile"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "proposal_submitted_by_deadline",
"label": "Proposal submitted by July 24, 2026, 11:59 p.m. CT",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_87952524be536771"
],
"source_precedence": [
"application_status",
"program_application",
"admin_review"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "nevi_compliance_verified",
"label": "NEVI and WEVI technical compliance verified",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_87952524be536771"
],
"source_precedence": [
"admin_review",
"program_application",
"quote"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "charger_port_count",
"label": "Number of proposed NEVI-compliant charging ports",
"value_type": "number",
"required_for": [
"effect_grant_expected_value_1_87952524be536771"
],
"source_precedence": [
"quote",
"program_application",
"retrofit_assumptions"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "ccs_connector_count",
"label": "Number of CCS Type 1 connectors",
"value_type": "number",
"required_for": [
"effect_grant_expected_value_1_87952524be536771"
],
"source_precedence": [
"quote",
"program_application",
"retrofit_assumptions"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "min_kw_per_port",
"label": "Minimum kW per DCFC port",
"value_type": "number",
"required_for": [
"effect_grant_expected_value_1_87952524be536771"
],
"source_precedence": [
"quote",
"program_application",
"retrofit_assumptions"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "eligible_project_cost_cents",
"label": "Eligible project cost, in cents",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_87952524be536771"
],
"source_precedence": [
"approved_project_budget",
"program_application",
"quote",
"admin_review"
],
"missing_severity": "blocks_calculation",
"notes": "Must exclude ineligible costs and costs incurred before required WisDOT/FHWA notices or authorization."
},
{
"input_key": "eligible_paid_costs_cents",
"label": "Eligible costs actually incurred and paid, in cents",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_87952524be536771"
],
"source_precedence": [
"invoice",
"application_status",
"grant_reimbursement_request",
"quote"
],
"missing_severity": "blocks_calculation",
"notes": "Required for conservative reimbursement calculation after award; WisDOT requires proof of payment before reimbursement."
},
{
"input_key": "approved_award_amount_cents",
"label": "Approved grant award amount from final grant agreement, in cents",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_87952524be536771"
],
"source_precedence": [
"application_status",
"grant_agreement",
"admin_review"
],
"missing_severity": "blocks_calculation",
"notes": "Do not substitute requested federal share unless human review explicitly approves a pre-award expected-value estimate."
},
{
"input_key": "non_federal_cost_share_cents",
"label": "Committed non-federal cost share, in cents",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_87952524be536771"
],
"source_precedence": [
"program_application",
"grant_agreement",
"quote",
"user_profile"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "selection_result",
"label": "WisDOT selection or rejection result",
"value_type": "enum",
"required_for": [
"effect_grant_expected_value_1_87952524be536771"
],
"source_precedence": [
"application_status",
"admin_review",
"program_application"
],
"missing_severity": "blocks_calculation",
"notes": "Expected values: not_submitted, submitted_pending, conditionally_selected, final_grant_agreement_executed, rejected, withdrawn, expired."
},
{
"input_key": "award_probability",
"label": "Human-reviewed award probability for current project",
"value_type": "number",
"required_for": [
"effect_grant_expected_value_1_87952524be536771"
],
"source_precedence": [
"admin_review",
"application_status",
"program_application"
],
"missing_severity": "blocks_pre_award_estimate",
"notes": "Historical prior is 0.20 from 53/264, but current Connecting Corridors probability may differ and should not be used in user-facing totals without review."
},
{
"input_key": "grant_agreement_executed",
"label": "Final grant agreement executed",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_87952524be536771"
],
"source_precedence": [
"application_status",
"grant_agreement",
"admin_review"
],
"missing_severity": "blocks_reimbursement_estimate"
},
{
"input_key": "fhwa_authorization_received",
"label": "FHWA project authorization received",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_87952524be536771"
],
"source_precedence": [
"application_status",
"admin_review",
"grant_agreement"
],
"missing_severity": "blocks_reimbursement_estimate"
},
{
"input_key": "wisdot_notice_to_proceed_received",
"label": "Applicable WisDOT notice to proceed received before expense",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_87952524be536771"
],
"source_precedence": [
"application_status",
"grant_agreement",
"admin_review"
],
"missing_severity": "blocks_reimbursement_estimate"
}
],
"effects_to_add_or_update": [
{
"effect_id": "effect_grant_expected_value_1_87952524be536771",
"effect_type": "grant_expected_value",
"cash_value_classification": "reimbursement",
"value_model_kind": "competitive_cost_share",
"calculation": {
"method": "expected_value",
"amount_cents": null,
"percent": 0.8,
"conditional_award_cents": null,
"conditional_award_formula": "Do not calculate from the 80% cap alone. If final grant agreement is executed and reimbursement prerequisites are satisfied, selected_reimbursement_cents = min(approved_award_amount_cents, floor(0.8 * eligible_paid_costs_cents)). For pre-award expected value only after human review, expected_value_cents = award_probability * min(approved_award_amount_cents, floor(0.8 * eligible_project_cost_cents)); if approved_award_amount_cents is missing, suppress rather than using requested federal share or 80% of estimated cost. If rejected, withdrawn, expired, ineligible, or not submitted by deadline, value is 0.",
"max_award_cents": null,
"min_award_cents": null,
"rate_rows": [],
"probability_discount": 0.2,
"probability_evidence_type": "historical_success_rate"
},
"required_inputs": [
{
"input_key": "applicant_entity_type",
"value_type": "enum",
"missing_severity": "blocks_calculation"
},
{
"input_key": "proposed_site_address_or_coordinates",
"value_type": "text",
"missing_severity": "blocks_calculation"
},
{
"input_key": "site_location_classification",
"value_type": "enum",
"missing_severity": "blocks_calculation"
},
{
"input_key": "site_previously_awarded_wevi_funding",
"value_type": "boolean",
"missing_severity": "blocks_calculation"
},
{
"input_key": "proposal_submitted_by_deadline",
"value_type": "boolean",
"missing_severity": "blocks_calculation"
},
{
"input_key": "nevi_compliance_verified",
"value_type": "boolean",
"missing_severity": "blocks_calculation"
},
{
"input_key": "charger_port_count",
"value_type": "number",
"missing_severity": "blocks_calculation"
},
{
"input_key": "ccs_connector_count",
"value_type": "number",
"missing_severity": "blocks_calculation"
},
{
"input_key": "min_kw_per_port",
"value_type": "number",
"missing_severity": "blocks_calculation"
},
{
"input_key": "eligible_project_cost_cents",
"value_type": "money_cents",
"missing_severity": "blocks_calculation"
},
{
"input_key": "eligible_paid_costs_cents",
"value_type": "money_cents",
"missing_severity": "blocks_reimbursement_estimate"
},
{
"input_key": "approved_award_amount_cents",
"value_type": "money_cents",
"missing_severity": "blocks_calculation"
},
{
"input_key": "non_federal_cost_share_cents",
"value_type": "money_cents",
"missing_severity": "blocks_calculation"
},
{
"input_key": "selection_result",
"value_type": "enum",
"missing_severity": "blocks_calculation"
},
{
"input_key": "award_probability",
"value_type": "number",
"missing_severity": "blocks_pre_award_estimate"
},
{
"input_key": "grant_agreement_executed",
"value_type": "boolean",
"missing_severity": "blocks_reimbursement_estimate"
},
{
"input_key": "fhwa_authorization_received",
"value_type": "boolean",
"missing_severity": "blocks_reimbursement_estimate"
},
{
"input_key": "wisdot_notice_to_proceed_received",
"value_type": "boolean",
"missing_severity": "blocks_reimbursement_estimate"
}
],
"missing_input_behavior": "suppress_until_review",
"includedInUserFacingTotalDefault": false,
"humanReviewRequired": true,
"reasonCodes": [
"competitive_grant",
"up_to_percent_cap_not_guaranteed",
"needs_project_specific_award_amount",
"needs_eligible_paid_costs",
"needs_final_grant_agreement_or_human_reviewed_probability",
"historical_success_rate_available_but_current_round_uncertain",
"reimbursement_after_payment_and_compliance",
"preauthorization_costs_not_reimbursable",
"open_funds_available_but_no_expected_award_count",
"do_not_include_in_user_facing_total_default"
],
"calculationTrace": [
"Confirm the program round is the 2026 WEVI Connecting Corridors RFP and that the proposal was submitted by July 24, 2026 at 11:59 p.m. CT.",
"Confirm applicant eligibility, site eligibility, no prior WEVI funding for the same site, and NEVI/WEVI technical compliance.",
"Suppress the estimate if the project is only generally eligible or the package only has estimated project cost; the 80% value is a cap, not a guaranteed award.",
"For pre-award expected value, require human-reviewed award_probability and approved_award_amount_cents or another explicitly approved project-specific award basis.",
"Historical probability may be set to 0.20 only as a non-default prior from 53 Round 1 awards over 264 applications; do not treat it as current-round success probability without review.",
"For selected projects with a final agreement, calculate reimbursement as min(approved_award_amount_cents, floor(0.8 * eligible_paid_costs_cents)).",
"Exclude costs that are ineligible, incurred before required WisDOT notice or authorization, not in the approved budget, not supported by proof of payment, or noncompliant with 23 CFR 680.",
"Set value to 0 for rejected, withdrawn, expired, ineligible, or late proposals."
]
}
]
},
"testCaseInputHints": [
{
"inputKey": "applicant_entity_type",
"valueType": "enum",
"whoProvides": "user",
"realisticDefaultGuidance": "Use private_business, nonprofit_authorized_in_wisconsin, tribal_organization, utility, public_entity, or other. Utilities and public/governmental entities should fail eligibility for the current Connecting Corridors RFP."
},
{
"inputKey": "site_location_classification",
"valueType": "enum",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "Use priority_site_within_primary_corridor_threshold, priority_site_within_secondary_corridor_threshold, within_5_miles_of_identified_corridor, over_5_miles_from_identified_corridor, or unknown."
},
{
"inputKey": "site_previously_awarded_wevi_funding",
"valueType": "boolean",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "Default unknown, not false. If true, suppress for current Connecting Corridors funding."
},
{
"inputKey": "proposal_submitted_by_deadline",
"valueType": "boolean",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Use true only with application/submission evidence before the July 24, 2026 11:59 p.m. CT deadline."
},
{
"inputKey": "nevi_compliance_verified",
"valueType": "boolean",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "Use true only after review of the submitted technical compliance package; do not infer from generic charger type."
},
{
"inputKey": "charger_port_count",
"valueType": "number",
"whoProvides": "quote",
"realisticDefaultGuidance": "Use actual proposed NEVI-compliant port count from the quote or application. Current package should not assume eligibility if fewer than four ports are proposed."
},
{
"inputKey": "ccs_connector_count",
"valueType": "number",
"whoProvides": "quote",
"realisticDefaultGuidance": "Use actual CCS Type 1 connector count from equipment specification or application."
},
{
"inputKey": "min_kw_per_port",
"valueType": "number",
"whoProvides": "quote",
"realisticDefaultGuidance": "Use actual equipment output rating per port from the quote or technical submittal."
},
{
"inputKey": "eligible_project_cost_cents",
"valueType": "money_cents",
"whoProvides": "quote",
"realisticDefaultGuidance": "Use itemized eligible costs only. Do not include real estate, major grid upgrades, pre-authorization expenses, electricity, general staff time, rent, customer service, or other ineligible expenses."
},
{
"inputKey": "eligible_paid_costs_cents",
"valueType": "money_cents",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Use paid supplier/vendor invoices that are included in the approved project budget and eligible for reimbursement. No default."
},
{
"inputKey": "approved_award_amount_cents",
"valueType": "money_cents",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Use the executed grant agreement or formal award documentation. Do not default to 80% of project cost."
},
{
"inputKey": "non_federal_cost_share_cents",
"valueType": "money_cents",
"whoProvides": "quote",
"realisticDefaultGuidance": "Must be at least 20% of eligible project costs and must not be federal funds used for the required match."
},
{
"inputKey": "selection_result",
"valueType": "enum",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Use not_submitted, submitted_pending, conditionally_selected, final_grant_agreement_executed, rejected, withdrawn, or expired."
},
{
"inputKey": "award_probability",
"valueType": "number",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "Use null unless human-reviewed. A historical prior of 0.20 is supported by Round 1 historical evidence but should not be used in user-facing totals by default."
},
{
"inputKey": "grant_agreement_executed",
"valueType": "boolean",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Use true only with an executed final grant award agreement."
},
{
"inputKey": "fhwa_authorization_received",
"valueType": "boolean",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Use true only when FHWA authorization is documented for the project."
},
{
"inputKey": "wisdot_notice_to_proceed_received",
"valueType": "boolean",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Use true only for costs incurred after the applicable formal WisDOT notice to proceed or authorization."
}
],
"remainingGaps": [
"Current 2026 Connecting Corridors expected award count has not been published.",
"Current-round application count and current-round success rate are unknown.",
"WisDOT Q&A states approximately 4000000000 cents remains unobligated, but WisDOT has not set a specific total grant amount for the Connecting Corridors RFP.",
"Project-specific approved award amount, final grant agreement, FHWA authorization, WisDOT notices, eligible paid costs, and proof of payment are not available in the source package.",
"The historical 0.20 probability prior comes from Round 1 AFC build-out procurement and may not represent the 2026 Connecting Corridors round."
],
"doNotUseAsUserFacingEstimateReasons": [
"The program is competitive and requires WisDOT selection.",
"The 80% figure is an upper reimbursement cap, not a guaranteed award.",
"There is no published maximum award per project and awards are based on the specific funding requested and approved.",
"Conditional award notifications are not final allocations of funds.",
"Final reimbursement depends on FHWA authorization, executed grant agreement, WisDOT notices, approved budget, eligible paid costs, proof of payment, and ongoing NEVI/WEVI compliance.",
"Historical 53/264 success-rate evidence is from a prior round and is not reliable enough for default user-facing savings totals.",
"Costs incurred before required authorization or executed agreement are not reimbursable."
]
}

[1]: https://wisconsindot.gov/Pages/projects/multimodal/electrification.aspx "
    
            Wisconsin Department of Transportation
            
            
            Electric Vehicles in WI
            
        
"
[2]: https://wisconsindot.gov/Pages/about-wisdot/newsroom/news-rel/052626-WEVI-connecting-corridors.aspx "
    WisDOT announces grant application period open for next round of National Electric Vehicle Infrastructure funding in Wiscon
"
[3]: https://wisconsindot.gov/Documents/projects/multimodal/WEVI-Connecting-Corridors-RFP.pdf "WEVI Connecting Corridors RFP"
[4]: https://wisconsindot.gov/Documents/projects/multimodal/WEVI-connecting-corridors-QA.pdf "Connecting Corridors Q&A"
[5]: https://wisconsindot.gov/Documents/projects/multimodal/WEVI-Submission-Packet.pdf "Revised and Reissued Connecting Corridor WEVI Program Proposal Submission Package"
[6]: https://wisconsindot.gov/Documents/projects/multimodal/WEVI-plan-update-final-9-2024.pdf "Wisconsin Electric Vehicle Infrastructure Plan - 2024 Plan Update"
[7]: https://www.ecfr.gov/current/title-23/chapter-I/subchapter-G/part-680?utm_source=chatgpt.com "23 CFR Part 680 -- National Electric Vehicle Infrastructure ..."
