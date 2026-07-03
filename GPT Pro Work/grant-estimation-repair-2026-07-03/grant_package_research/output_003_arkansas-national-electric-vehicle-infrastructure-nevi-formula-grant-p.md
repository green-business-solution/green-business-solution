{
"schemaVersion": "retrofi_grant_package_repair.v1",
"researchedAt": "2026-07-03",
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22633",
"programName": "Arkansas - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
"status": "closed_or_unavailable",
"sourceConfidence": "high",
"estimateConfidenceIfInputsPresent": "low",
"officialSources": [
{
"title": "National Electric Vehicle Infrastructure (NEVI) Program",
"url": "[https://ardot.gov/divisions/local-programs/local-funding-opportunities/national-electric-vehicle-infrastructure-nevi-program/](https://ardot.gov/divisions/local-programs/local-funding-opportunities/national-electric-vehicle-infrastructure-nevi-program/)",
"owner": "Arkansas Department of Transportation",
"accessed": "2026-07-03",
"evidenceText": "ARDOT's current program page states that the 2024 Request for Proposals is closed, describes EVID as a competitive procurement program, states that awards are disbursed on a reimbursement basis, and states the 80 percent federal share / 20 percent non-federal share structure. ([Arkansas Department of Transportation][1])"
},
{
"title": "Guidelines for Implementation of the NEVI Formula Program",
"url": "[https://media.ark.org/ardot/ARDOT_Implementation_Guidelines_of_NEVI.pdf](https://media.ark.org/ardot/ARDOT_Implementation_Guidelines_of_NEVI.pdf)",
"owner": "Arkansas Department of Transportation",
"accessed": "2026-07-03",
"evidenceText": "ARDOT guidelines state that projects are eligible for up to 80 percent federal share with at least 20 percent non-federal match, that projects are selected through competitive procurement, that Commission approval and awardee agreements are required, and that reimbursements are issued only after ARDOT review of invoice requests. "
},
{
"title": "Arkansas FY2026 Electric Vehicle Infrastructure Deployment Plan",
"url": "[https://media.ark.org/ardot/Submittal-Packet-FY26-EVID-Plan.pdf](https://media.ark.org/ardot/Submittal-Packet-FY26-EVID-Plan.pdf)",
"owner": "Arkansas Department of Transportation",
"accessed": "2026-07-03",
"evidenceText": "The FY2026 plan reports total Arkansas NEVI Formula Program funds of 5,412,194,600 cents, Phase II planned competitive deployment beyond EV AFCs, and Phase I historical results of 120 proposals and 19 awards totaling 1,491,600,000 cents. "
},
{
"title": "EVID RFP Frequently Asked Questions",
"url": "[https://media.ark.org/ardot/ARDOT_EVID_RFP_FAQ.pdf](https://media.ark.org/ardot/ARDOT_EVID_RFP_FAQ.pdf)",
"owner": "Arkansas Department of Transportation",
"accessed": "2026-07-03",
"evidenceText": "ARDOT states that funding is awarded based on the specific funding requested in the Project Budget, that awardees may be reimbursed only for eligible project costs occurring during the formal project period and after formal ARDOT notices, and that ARDOT retains 7 percent of awarded federal funds for administration. "
},
{
"title": "EVID Program Requirements",
"url": "[https://media.ark.org/ardot/ARDOT_EVID_Program_Requirements.pdf](https://media.ark.org/ardot/ARDOT_EVID_Program_Requirements.pdf)",
"owner": "Arkansas Department of Transportation",
"accessed": "2026-07-03",
"evidenceText": "ARDOT's EVID Program Requirements specify site-planning, electrical safety, fire-prevention, cybersecurity, load-management, and additional site requirements for EV charging stations awarded program funding. "
},
{
"title": "Draft Award Agreement with Terms and Conditions",
"url": "[https://media.ark.org/ardot/ARDOT_Draft_Agreement.pdf](https://media.ark.org/ardot/ARDOT_Draft_Agreement.pdf)",
"owner": "Arkansas Department of Transportation",
"accessed": "2026-07-03",
"evidenceText": "The draft award agreement contains project-specific award fields for total project funding, federal funding, match funding, federal-match ratio, start date, and end date, and states that expenses outside the agreement project period are ineligible for reimbursement. "
},
{
"title": "Arkansas NEVI Formula Funding Program",
"url": "[https://adeq.state.ar.us/energy/opportunities/nevi/](https://adeq.state.ar.us/energy/opportunities/nevi/)",
"owner": "Arkansas Department of Energy and Environment / Arkansas Energy Office",
"accessed": "2026-07-03",
"evidenceText": "The Arkansas Energy Office page identifies ARDOT as the program administrator in association with Energy and Environment and reports Arkansas NEVI funding over five years. ([ADEQ][2])"
}
],
"sourceSummary": "Prompt package reviewed from the uploaded file.  Official ARDOT sources support a competitive reimbursement cost-share model, not an automatic rebate. The current ARDOT program page marks the posted RFP as closed, so no user-facing estimate should be calculated for a new project by default. The conditional formula is defensible only for an ARDOT-selected project with a signed award agreement, approved project budget, required notices to proceed, and approved invoices. A historical Phase I success-rate anchor exists: 19 awards from 120 proposals, or 0.1583333333, but it is from a prior Phase I procurement and should not override the current closed-RFP suppression.",
"packagePatch": {
"calculation_status": "no_calculable_value",
"availability": {
"status": "closed",
"fundingStatus": "closed"
},
"input_requirements_to_add_or_update": [
{
"input_key": "current_rfp_open",
"label": "current ARDOT NEVI RFP is open",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_83c9b6e21b196f8c"
],
"source_precedence": [
"admin_research"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "award_selection_status",
"label": "ARDOT award selection status",
"value_type": "enum",
"allowed_values": [
"not_applied",
"submitted_not_selected",
"selected_pending_agreement",
"selected_award_agreement_signed",
"rejected",
"unknown"
],
"required_for": [
"effect_grant_expected_value_1_83c9b6e21b196f8c"
],
"source_precedence": [
"application_status",
"admin_research",
"user_profile"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "approved_federal_share_cents",
"label": "ARDOT-approved federal share",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_83c9b6e21b196f8c"
],
"source_precedence": [
"application_status",
"award_agreement",
"admin_research"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "approved_eligible_project_cost_cents",
"label": "ARDOT-approved eligible project cost",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_83c9b6e21b196f8c"
],
"source_precedence": [
"award_agreement",
"approved_project_budget",
"quote"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "requested_federal_share_cents",
"label": "requested federal share in ARDOT project budget",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_83c9b6e21b196f8c"
],
"source_precedence": [
"application_status",
"approved_project_budget",
"user_profile"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "project_specific_cap_cents",
"label": "project-specific award cap, if any",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_83c9b6e21b196f8c"
],
"source_precedence": [
"award_agreement",
"admin_research"
],
"missing_severity": "optional_cap_if_present"
},
{
"input_key": "approved_invoice_amount_cents",
"label": "approved reimbursable invoice amount",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_83c9b6e21b196f8c"
],
"source_precedence": [
"approved_invoice",
"application_status",
"quote"
],
"missing_severity": "blocks_payment_timing_calculation"
},
{
"input_key": "non_federal_match_cents",
"label": "required non-federal match",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_83c9b6e21b196f8c"
],
"source_precedence": [
"approved_project_budget",
"award_agreement",
"user_profile"
],
"missing_severity": "blocks_eligibility"
},
{
"input_key": "ardot_admin_retention_percent",
"label": "ARDOT administrative retention on awarded federal funds",
"value_type": "number",
"default_value": 0.07,
"required_for": [
"effect_grant_expected_value_1_83c9b6e21b196f8c"
],
"source_precedence": [
"admin_research"
],
"missing_severity": "blocks_conservative_cash_reimbursement"
},
{
"input_key": "ardot_admin_deposit_cents",
"label": "awardee non-federal administrative-cost deposit",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_83c9b6e21b196f8c"
],
"source_precedence": [
"approved_project_budget",
"award_agreement"
],
"missing_severity": "blocks_net_project_cost_modeling"
},
{
"input_key": "formal_ardot_notice_status",
"label": "formal ARDOT notice status",
"value_type": "enum",
"allowed_values": [
"none",
"ntp_1_preconstruction",
"ntp_2_procurement_and_construction",
"noa_accepted",
"unknown"
],
"required_for": [
"effect_grant_expected_value_1_83c9b6e21b196f8c"
],
"source_precedence": [
"application_status",
"award_agreement",
"admin_research"
],
"missing_severity": "blocks_reimbursement"
},
{
"input_key": "nevi_site_compliance",
"label": "NEVI and ARDOT EVID site compliance",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_83c9b6e21b196f8c"
],
"source_precedence": [
"application_status",
"quote",
"admin_research"
],
"missing_severity": "blocks_eligibility"
},
{
"input_key": "project_location_eligibility",
"label": "eligible AFC or approved Phase II public location",
"value_type": "enum",
"allowed_values": [
"designated_ev_afc",
"approved_phase_ii_public_location",
"not_eligible",
"unknown"
],
"required_for": [
"effect_grant_expected_value_1_83c9b6e21b196f8c"
],
"source_precedence": [
"admin_research",
"application_status",
"user_profile"
],
"missing_severity": "blocks_eligibility"
},
{
"input_key": "applicant_entity_type",
"label": "eligible proposer entity type",
"value_type": "enum",
"allowed_values": [
"registered_utility",
"arkansas_registered_business",
"arkansas_registered_nonprofit",
"tribal_organization",
"public_entity_site_host_only",
"other",
"unknown"
],
"required_for": [
"effect_grant_expected_value_1_83c9b6e21b196f8c"
],
"source_precedence": [
"user_profile",
"application_status",
"admin_research"
],
"missing_severity": "blocks_eligibility"
}
],
"effects_to_add_or_update": [
{
"effect_id": "effect_grant_expected_value_1_83c9b6e21b196f8c",
"effect_type": "grant_expected_value",
"cash_value_classification": "reimbursement",
"value_model_kind": "competitive_cost_share",
"calculation": {
"method": "expected_value",
"amount_cents": null,
"percent": 0.744,
"conditional_award_cents": null,
"conditional_award_formula": "Suppress for new user-facing estimates while current_rfp_open is false. If a future or reopened ARDOT NEVI RFP is verified open and the project is selected with a signed award agreement, compute approved_federal_share_cents = min(requested_federal_share_cents, floor(0.8 * approved_eligible_project_cost_cents), project_specific_cap_cents if present). For conservative cash reimbursement to the awardee, subtract ARDOT administrative retention: conservative_reimbursement_cash_cents = max(0, approved_federal_share_cents - floor(0.07 * approved_federal_share_cents)). Then limit reimbursement to approved invoice amounts for eligible costs incurred during the formal project period and after required ARDOT notices. Required non-federal match and the awardee administrative-cost deposit are project costs, not grant benefits.",
"max_award_cents": null,
"min_award_cents": null,
"rate_rows": [
{
"rate_name": "statutory_federal_share_cap",
"percent": 0.8,
"applies_to": "approved_eligible_project_cost_cents",
"source": "ARDOT NEVI Program and implementation guidelines"
},
{
"rate_name": "required_non_federal_share",
"percent": 0.2,
"applies_to": "eligible project expenses and ARDOT administrative costs",
"source": "ARDOT NEVI Program and RFP FAQ"
},
{
"rate_name": "ardot_admin_retention",
"percent": 0.07,
"applies_to": "approved_federal_share_cents",
"source": "ARDOT EVID RFP FAQ"
},
{
"rate_name": "effective_max_cash_reimbursement_after_admin_retention",
"percent": 0.744,
"applies_to": "approved_eligible_project_cost_cents when approved_federal_share equals the 0.8 cap",
"source": "derived as 0.8 * (1 - 0.07)"
},
{
"rate_name": "historical_phase_i_award_probability",
"percent": 0.1583333333,
"applies_to": "prior Phase I procurement only; not sufficient for default user-facing estimates while current RFP is closed",
"source": "derived from 19 awards / 120 proposals in ARDOT FY2026 EVID Plan"
}
],
"probability_discount": 0.1583333333,
"probability_evidence_type": "historical_success_rate"
},
"required_inputs": [
"current_rfp_open",
"award_selection_status",
"approved_federal_share_cents",
"approved_eligible_project_cost_cents",
"requested_federal_share_cents",
"project_specific_cap_cents",
"approved_invoice_amount_cents",
"non_federal_match_cents",
"ardot_admin_retention_percent",
"formal_ardot_notice_status",
"nevi_site_compliance",
"project_location_eligibility",
"applicant_entity_type"
],
"missing_input_behavior": "suppress_until_review",
"includedInUserFacingTotalDefault": false,
"humanReviewRequired": true,
"reasonCodes": [
"current_rfp_closed",
"competitive_procurement",
"project_specific_award_agreement_required",
"approval_required_before_purchase",
"approval_required_before_installation",
"reimbursement_only_after_formal_ardot_notices",
"approved_invoice_required",
"cost_share_cap_only",
"historical_probability_phase_i_only",
"future_phase_ii_terms_not_final_for_runtime",
"not_in_user_facing_total_default"
],
"calculationTrace": [
"Current official ARDOT NEVI page says the posted 2024 RFP is closed; availability should be closed and fundingStatus should be closed for runtime intake.",
"The program is competitive procurement, not an entitlement; ARDOT selection, Commission approval, and an award agreement are required before any reimbursement can be modeled.",
"Underlying federal cost-share cap is up to 80 percent of approved eligible project costs with at least 20 percent non-federal match.",
"ARDOT's FAQ states funding is based on the specific funding requested in the Project Budget.",
"ARDOT's FAQ states ARDOT retains 7 percent of total awarded federal funds for administrative costs; conservative user cash reimbursement should therefore not count the retained amount as cash paid to the awardee.",
"Historical Phase I evidence supports a prior-round probability anchor of 19 awards divided by 120 proposals, or 0.1583333333, but current RFP closure and potentially different future Phase II scope prevent default user-facing expected value inclusion.",
"Expected value, if human-approved for a reopened/current round, would be conservative_reimbursement_cash_cents * 0.1583333333, but only after all required project inputs and current funding status are verified."
]
}
]
},
"testCaseInputHints": [
{
"inputKey": "current_rfp_open",
"valueType": "boolean",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "Use false as of 2026-07-03 because ARDOT's current page marks the posted RFP closed. Do not calculate while false."
},
{
"inputKey": "award_selection_status",
"valueType": "enum",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Use selected_award_agreement_signed only when ARDOT selection and signed award agreement are documented; otherwise suppress."
},
{
"inputKey": "approved_federal_share_cents",
"valueType": "money_cents",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Use the federal funding amount from the ARDOT award agreement or approved Project Budget, not a user estimate."
},
{
"inputKey": "approved_eligible_project_cost_cents",
"valueType": "money_cents",
"whoProvides": "quote",
"realisticDefaultGuidance": "Use only costs ARDOT has approved as NEVI-eligible; exclude ineligible recurring business costs unless ARDOT approves them."
},
{
"inputKey": "requested_federal_share_cents",
"valueType": "money_cents",
"whoProvides": "user",
"realisticDefaultGuidance": "Use the amount requested in the submitted ARDOT Project Budget."
},
{
"inputKey": "project_specific_cap_cents",
"valueType": "money_cents",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Use null unless the award agreement, RFP, or ARDOT approval specifies a site-specific cap."
},
{
"inputKey": "approved_invoice_amount_cents",
"valueType": "money_cents",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Use only invoice costs ARDOT has reviewed and approved for reimbursement after required formal notices."
},
{
"inputKey": "non_federal_match_cents",
"valueType": "money_cents",
"whoProvides": "user",
"realisticDefaultGuidance": "Must be sufficient to satisfy the 20 percent non-federal share and any required ARDOT administrative-cost deposit."
},
{
"inputKey": "ardot_admin_retention_percent",
"valueType": "number",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "Use 0.07 for the current documented ARDOT EVID FAQ retention unless a newer RFP changes it."
},
{
"inputKey": "formal_ardot_notice_status",
"valueType": "enum",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Use none until NTP 1, NTP 2, or NOA is documented. Reimbursement should be blocked without required notice."
},
{
"inputKey": "nevi_site_compliance",
"valueType": "boolean",
"whoProvides": "quote",
"realisticDefaultGuidance": "Use true only when the site, charger, safety, ADA, cybersecurity, reporting, and 23 CFR 680 requirements are documented."
},
{
"inputKey": "project_location_eligibility",
"valueType": "enum",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "Use designated_ev_afc for Phase I-style AFC projects or approved_phase_ii_public_location only when a future ARDOT Phase II solicitation confirms eligibility."
},
{
"inputKey": "applicant_entity_type",
"valueType": "enum",
"whoProvides": "user",
"realisticDefaultGuidance": "Use an ARDOT-eligible proposer category; public entities may require special review depending on round and role."
}
],
"remainingGaps": [
"No open ARDOT NEVI RFP or current submission deadline was verified on the official ARDOT program page.",
"Future Phase II solicitation timing, final eligibility rules, scoring details, expected award count, and current application denominator were not found in a current open NOFO/RFP.",
"The 0.1583333333 probability anchor is derived from Phase I historical results and may not generalize to future discretionary Phase II procurements.",
"No universal maximum award cap was found; award value depends on requested federal share, approved eligible project cost, ARDOT-approved budget, project-specific cap if any, and approved invoices.",
"The 7 percent ARDOT administrative retention changes the conservative cash reimbursement model and should be rechecked against any newer RFP packet before reactivation."
],
"doNotUseAsUserFacingEstimateReasons": [
"current_rfp_closed",
"no_current_open_submission_window",
"competitive_procurement_requires_selection",
"project_specific_award_agreement_required",
"approval_required_before_purchase_or_installation",
"reimbursement_only_after_ardot_notices_and_approved_invoices",
"source_uses_up_to_80_percent_cost_share",
"historical_probability_not_current_round",
"future_phase_ii_terms_not_final",
"ardot_admin_retention_reduces_cash_reimbursement"
]
}

[1]: https://ardot.gov/divisions/local-programs/local-funding-opportunities/national-electric-vehicle-infrastructure-nevi-program/ "National Electric Vehicle Infrastructure (NEVI) Program - Arkansas Department of Transportation"
[2]: https://adeq.state.ar.us/energy/opportunities/nevi/ "
    Office of Energy | DEQ
"

