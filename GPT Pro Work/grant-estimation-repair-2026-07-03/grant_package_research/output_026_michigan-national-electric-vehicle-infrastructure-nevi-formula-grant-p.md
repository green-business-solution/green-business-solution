{
"schemaVersion": "retrofi_grant_package_repair.v1",
"researchedAt": "2026-07-03",
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22647",
"programName": "Michigan - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
"status": "needs_project_inputs",
"sourceConfidence": "high",
"estimateConfidenceIfInputsPresent": "low",
"officialSources": [
{
"title": "National Electric Vehicle Infrastructure (DBOM) - Round 3",
"url": "[https://www.michigan.gov/mdot/business/contractors/innovativecontracting/national-electric-vehicle-infrastructure-3](https://www.michigan.gov/mdot/business/contractors/innovativecontracting/national-electric-vehicle-infrastructure-3)",
"owner": "Michigan Department of Transportation",
"accessed": "2026-07-03",
"evidenceText": "MDOT's Round 3 administrator page describes the project as design, construction, operations, and maintenance of EV charging sites; a typical site includes at least four network-connected DC 150 kW charging ports available to the public, with O&M for at least five years. The page lists RFP issuance on June 8, 2026, proposals due August 7, 2026, and anticipated award in October 2026. ([Michigan.gov][1])"
},
{
"title": "NEVI Round 3 Request for Proposals",
"url": "[https://www.michigan.gov/mdot/-/media/Project/Websites/MDOT/Business/Contractors/Innovative-Contracting/NEVI---3/RFP.pdf](https://www.michigan.gov/mdot/-/media/Project/Websites/MDOT/Business/Contractors/Innovative-Contracting/NEVI---3/RFP.pdf)",
"owner": "Michigan Department of Transportation",
"accessed": "2026-07-03",
"evidenceText": "The RFP states MDOT is using a one-step DBOM competitive procurement and will award contracts, if at all, to responsive and responsible proposers offering the Best Value Proposal; MDOT reserves the right to reject any or all proposals. The RFP procurement schedule lists proposals due at 1:00 p.m. ET on August 7, 2026, with anticipated notification of selected responsive proposers in November 2026. ([Michigan.gov][2])"
},
{
"title": "NEVI Round 3 RFP - Price Proposal and Eligible Costs",
"url": "[https://www.michigan.gov/mdot/-/media/Project/Websites/MDOT/Business/Contractors/Innovative-Contracting/NEVI---3/RFP.pdf](https://www.michigan.gov/mdot/-/media/Project/Websites/MDOT/Business/Contractors/Innovative-Contracting/NEVI---3/RFP.pdf)",
"owner": "Michigan Department of Transportation",
"accessed": "2026-07-03",
"evidenceText": "The RFP price proposal instructions require price proposals to include only eligible costs, be itemized, and include a Project Company Share equal to at least 20% of Total Eligible Cost. Form 3 caps Total Funds Requested at a maximum of 80% of Total Eligible Cost. The contract payment section says MDOT pays Total Funds Requested as lump-sum milestone payments subject to contract limits, with eligible and ineligible cost lists. ([Michigan.gov][2])"
},
{
"title": "Michigan State Plan for Electric Vehicle Infrastructure Deployment Fiscal Year 2026",
"url": "[https://www.michigan.gov/mdot/-/media/Project/Websites/MDOT/Travel/Mobility/Mobility-Initiatives/NEVI/FY26-Michigan-Plan-Electric-Vehicles.pdf](https://www.michigan.gov/mdot/-/media/Project/Websites/MDOT/Travel/Mobility/Mobility-Initiatives/NEVI/FY26-Michigan-Plan-Electric-Vehicles.pdf)",
"owner": "Michigan Department of Transportation",
"accessed": "2026-07-03",
"evidenceText": "Michigan's FY 2026 EVID Plan states MDOT selected 83 project sites from 214 proposals submitted in the first two competitive procurement rounds. It also states Round 1 selected 35 sites and Round 2 selected 48 sites, and that future remaining funds would be competitively procured for publicly accessible EV charging stations statewide. ([Michigan.gov][3])"
},
{
"title": "MDOT expanding EV charging network, accepting proposals for Round 3 NEVI procurement",
"url": "[https://www.michigan.gov/mdot/news-outreach/pressreleases/2026/06/09/mdot-expanding-ev-charging-network-accepting-proposals-for-round-3-nevi-procurement](https://www.michigan.gov/mdot/news-outreach/pressreleases/2026/06/09/mdot-expanding-ev-charging-network-accepting-proposals-for-round-3-nevi-procurement)",
"owner": "Michigan Department of Transportation",
"accessed": "2026-07-03",
"evidenceText": "MDOT's June 9, 2026 press release says FHWA approval secured access to 5100000000 cents in remaining NEVI formula funds and that Round 3 is anticipated to include 60 additional NEVI stations. ([Michigan.gov][4])"
},
{
"title": "23 CFR Part 680 - National Electric Vehicle Infrastructure Standards and Requirements",
"url": "[https://www.ecfr.gov/current/title-23/chapter-I/subchapter-G/part-680](https://www.ecfr.gov/current/title-23/chapter-I/subchapter-G/part-680)",
"owner": "Federal Highway Administration / eCFR",
"accessed": "2026-07-03",
"evidenceText": "23 CFR Part 680 applies to NEVI Formula Program projects. It requires, among other things, at least four network-connected charging ports capable of charging at least four EVs, DCFC corridor-serving ports with at least 150 kW continuous power delivery, public availability requirements, at least five years of maintenance, and greater than 97% average annual port uptime. ([eCFR][5])"
}
],
"sourceSummary": "Official MDOT and FHWA sources confirm this is an active Michigan Round 3 NEVI competitive DBOM procurement, not a deterministic rebate. The defensible conditional value model is a competitive cost-share reimbursement/payment equal to Total Funds Requested, capped at 80% of MDOT-approved Total Eligible Cost, with at least 20% Project Company Share. A project-level expected value can be modeled only after project cost and application-fit inputs are present, using a conservative probability discount of 0.38 based on Michigan's prior-round historical selection rate of 83 selected sites from 214 submitted proposals. It should not be included in user-facing savings totals by default because MDOT selection, responsiveness, scoring, available funding, contract execution, eligible-cost review, milestone payment conditions, and possible deductions remain project-specific. Uploaded package context to repair:  ",
"packagePatch": {
"calculation_status": "calculable_with_missing_inputs",
"availability": {
"status": "active",
"fundingStatus": "open_funds_available"
},
"input_requirements_to_add_or_update": [
{
"input_key": "eligible_project_cost_cents",
"label": "MDOT/RFP eligible project cost in cents",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_cddd6282f92b5b42"
],
"source_precedence": [
"quote",
"application_status",
"admin_research",
"user_profile"
],
"missing_severity": "blocks_calculation",
"notes": "Must be Total Eligible Cost after excluding RFP-ineligible costs. Costs incurred before award and construction costs before NEPA approval must be excluded. Utility infrastructure costs may be included only through the RFP's permitted utility quote, revised Form 3, or change order process."
},
{
"input_key": "total_funds_requested_cents",
"label": "Total Funds Requested in Form 3 or revised Form 3, cents",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_cddd6282f92b5b42"
],
"source_precedence": [
"application_status",
"quote",
"admin_research"
],
"missing_severity": "blocks_calculation_when_available",
"notes": "If present, use the lesser of this amount and 80% of eligible_project_cost_cents for the conditional award model. If absent, use 80% of eligible_project_cost_cents only for internal pre-award expected-value modeling after fit review."
},
{
"input_key": "project_company_share_percent",
"label": "Project Company Share as decimal fraction",
"value_type": "number",
"required_for": [
"effect_grant_expected_value_1_cddd6282f92b5b42"
],
"source_precedence": [
"quote",
"application_status"
],
"missing_severity": "blocks_calculation",
"notes": "Must be at least 0.2."
},
{
"input_key": "mdot_round3_proposal_status",
"label": "MDOT Round 3 proposal status",
"value_type": "enum",
"allowed_values": [
"not_submitted",
"submitted",
"responsive_under_review",
"selected",
"contract_executed",
"rejected",
"unknown"
],
"required_for": [
"effect_grant_expected_value_1_cddd6282f92b5b42"
],
"source_precedence": [
"application_status",
"admin_research",
"user_profile"
],
"missing_severity": "blocks_user_facing_total",
"notes": "Use historical expected value only for internal pre-award modeling. Use approved actual funds only after selected or contract_executed status."
},
{
"input_key": "application_fit_review_status",
"label": "Application fit review status",
"value_type": "enum",
"allowed_values": [
"not_reviewed",
"fit_confirmed",
"fit_rejected"
],
"required_for": [
"effect_grant_expected_value_1_cddd6282f92b5b42"
],
"source_precedence": [
"admin_research",
"application_status"
],
"missing_severity": "blocks_calculation",
"notes": "Must be fit_confirmed before any pre-award expected value is calculated."
},
{
"input_key": "nevi_round3_site_compliance_confirmed",
"label": "NEVI Round 3 site and equipment compliance confirmed",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_cddd6282f92b5b42"
],
"source_precedence": [
"quote",
"application_status",
"admin_research"
],
"missing_severity": "blocks_calculation",
"notes": "Confirm RFP and 23 CFR Part 680 requirements, including public access, required port count, power, connector, payment, O&M, uptime, workforce, and data-sharing requirements."
},
{
"input_key": "proposal_submission_date",
"label": "Proposal submission date",
"value_type": "date",
"required_for": [
"effect_grant_expected_value_1_cddd6282f92b5b42"
],
"source_precedence": [
"application_status",
"user_profile"
],
"missing_severity": "blocks_calculation",
"notes": "Must be on or before the official MDOT due date and time unless MDOT issues an addendum changing the deadline."
},
{
"input_key": "current_mdot_round3_funding_check",
"label": "Current MDOT Round 3 solicitation and funding check",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_cddd6282f92b5b42"
],
"source_precedence": [
"server_derived",
"admin_research"
],
"missing_severity": "blocks_calculation",
"notes": "Must be true after checking current MDOT Round 3 page, RFP addenda, and close/funding status at runtime."
},
{
"input_key": "approved_total_funds_requested_cents",
"label": "Approved MDOT Total Funds Requested or executed contract amount, cents",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_cddd6282f92b5b42"
],
"source_precedence": [
"application_status",
"quote",
"admin_research"
],
"missing_severity": "blocks_post_award_actual_value",
"notes": "Use only for selected or contract-executed projects. This input is not required for internal pre-award expected value, but is required before any deterministic user-facing total is shown."
}
],
"effects_to_add_or_update": [
{
"effect_id": "effect_grant_expected_value_1_cddd6282f92b5b42",
"effect_type": "grant_expected_value",
"cash_value_classification": "reimbursement",
"value_model_kind": "competitive_cost_share",
"calculation": {
"method": "expected_value",
"amount_cents": null,
"percent": 0.8,
"conditional_award_cents": null,
"conditional_award_formula": "Internal pre-award model only: conditional_award_cents = min(total_funds_requested_cents if present, floor(0.8 * eligible_project_cost_cents)); if total_funds_requested_cents is absent, use floor(0.8 * eligible_project_cost_cents) only after application_fit_review_status is fit_confirmed, nevi_round3_site_compliance_confirmed is true, project_company_share_percent >= 0.2, proposal_submission_date is timely, and current_mdot_round3_funding_check is true. expected_value_cents = floor(conditional_award_cents * 0.38). For selected or contract-executed projects with approved_total_funds_requested_cents, use approved_total_funds_requested_cents as the deterministic post-award value subject to milestone payment, contract, withholding, and deduction terms; do not apply the historical probability discount to an already approved award.",
"max_award_cents": null,
"min_award_cents": null,
"rate_rows": [],
"probability_discount": 0.38,
"probability_evidence_type": "historical_success_rate"
},
"required_inputs": [
"eligible_project_cost_cents",
"project_company_share_percent",
"mdot_round3_proposal_status",
"application_fit_review_status",
"nevi_round3_site_compliance_confirmed",
"proposal_submission_date",
"current_mdot_round3_funding_check"
],
"missing_input_behavior": "needs_project_scope",
"includedInUserFacingTotalDefault": false,
"humanReviewRequired": true,
"reasonCodes": [
"official_mdot_round3_rfp_active",
"competitive_best_value_procurement",
"mdot_may_reject_any_or_all_proposals",
"project_specific_selection_required",
"capped_at_80_percent_total_eligible_cost",
"minimum_20_percent_project_company_share_required",
"eligible_cost_review_required",
"pre_award_costs_ineligible",
"nepa_gate_for_construction_costs",
"historical_success_rate_available_83_of_214",
"probability_discount_floored_to_0_38",
"round3_actual_application_count_unknown",
"do_not_include_user_facing_total_by_default"
],
"calculationTrace": [
"Verify the MDOT Round 3 solicitation is still open or otherwise still available at runtime; proposals are currently due August 7, 2026 unless changed by addendum.",
"Confirm project is a Michigan NEVI Round 3 candidate and passes a human or admin application-fit review.",
"Confirm site, equipment, public access, O&M, uptime, workforce, payment, data-sharing, and other NEVI/RFP requirements.",
"Build eligible_project_cost_cents from itemized eligible costs only; exclude pre-award costs, construction costs before NEPA approval, major grid upgrades, real estate, unrelated building or parking work, electricity, staffing, and other ineligible costs.",
"Confirm project_company_share_percent is at least 0.2.",
"Set conditional_award_cents to total_funds_requested_cents if provided, capped at floor(0.8 * eligible_project_cost_cents). If total_funds_requested_cents is not available, model conditional_award_cents as floor(0.8 * eligible_project_cost_cents) only for internal pre-award expected value after all gating inputs are present.",
"Apply probability_discount 0.38, derived by flooring Michigan's historical prior-round selection rate of 83 selected sites divided by 214 submitted proposals.",
"Return expected_value_cents only for internal modeling and keep includedInUserFacingTotalDefault false.",
"If MDOT selection and an approved or executed contract amount are present, use approved_total_funds_requested_cents as a post-award deterministic reimbursement/payment value subject to milestone payment schedule and contract deductions; otherwise do not present as guaranteed savings."
]
}
]
},
"testCaseInputHints": [
{
"inputKey": "eligible_project_cost_cents",
"valueType": "money_cents",
"whoProvides": "quote",
"realisticDefaultGuidance": "Null unless an itemized EV charging project quote has been reviewed against the RFP eligible and ineligible cost rules."
},
{
"inputKey": "project_company_share_percent",
"valueType": "number",
"whoProvides": "quote",
"realisticDefaultGuidance": "Use 0.2 or higher. Null blocks calculation."
},
{
"inputKey": "mdot_round3_proposal_status",
"valueType": "enum",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Use not_submitted, submitted, responsive_under_review, selected, contract_executed, rejected, or unknown. User-facing deterministic value requires selected or contract_executed plus approved_total_funds_requested_cents."
},
{
"inputKey": "application_fit_review_status",
"valueType": "enum",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "Use fit_confirmed only after reviewing Round 3 eligibility, county/phase, scoring exposure, applicant role, site host status, and proposal readiness. Otherwise use not_reviewed or fit_rejected."
},
{
"inputKey": "nevi_round3_site_compliance_confirmed",
"valueType": "boolean",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "True only if the site and equipment comply with MDOT RFP and 23 CFR Part 680 requirements. Null or false blocks calculation."
},
{
"inputKey": "proposal_submission_date",
"valueType": "date",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Use the actual proposal submission date. Must be timely under the current MDOT RFP or addenda."
},
{
"inputKey": "current_mdot_round3_funding_check",
"valueType": "boolean",
"whoProvides": "server_derived",
"realisticDefaultGuidance": "True only after checking the current MDOT Round 3 page, RFP addenda, and funding/close status at runtime."
},
{
"inputKey": "total_funds_requested_cents",
"valueType": "money_cents",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Use the Form 3 or revised Form 3 Total Funds Requested amount when available. Otherwise null and let runtime cap conditional award at 80% of eligible_project_cost_cents for internal pre-award EV only."
},
{
"inputKey": "approved_total_funds_requested_cents",
"valueType": "money_cents",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Use only after MDOT selection, contract execution, or an approved award/payment document. Null until project-specific approval exists."
}
],
"remainingGaps": [
"Round 3 actual proposal count is not yet available, so the probability discount uses historical Round 1 and Round 2 results only.",
"MDOT may issue RFP addenda or Q&A that change deadlines, requirements, or funding availability; runtime must check current official MDOT materials.",
"No per-project dollar cap was found beyond the 80% Total Eligible Cost cap and the Total Funds Requested/Contract Price mechanics; max_award_cents remains null.",
"The conditional award cannot be known without site-specific eligible costs, Project Company Share, Form 3 or revised Form 3, utility quote/change order treatment, and MDOT selection or contract status.",
"The MDOT Round 3 page and RFP differ on anticipated award timing, October versus November 2026; this does not affect the application deadline or conservative value calculation."
],
"doNotUseAsUserFacingEstimateReasons": [
"This is a competitive best-value procurement, and MDOT reserves the right to reject any or all proposals.",
"The 80% figure is a maximum cost-share cap, not a guaranteed award.",
"Project-specific MDOT selection, responsiveness review, scoring, available funding, contract execution, and approved eligible costs are required.",
"Historical 83-of-214 selection probability is not a project-specific probability and Round 3's actual application denominator is unknown.",
"Pre-award costs and construction before NEPA approval are ineligible, and contract payments may be milestone-based, withheld, or reduced for nonperformance.",
"Do not include any value in user-facing savings totals by default until there is a selected or contract-executed project with an approved_total_funds_requested_cents amount."
]
}

[1]: https://www.michigan.gov/mdot/business/contractors/innovativecontracting/national-electric-vehicle-infrastructure-3 "National Electric Vehicle Infrastructure (DBOM) - Round 3"
[2]: https://www.michigan.gov/mdot/-/media/Project/Websites/MDOT/Business/Contractors/Innovative-Contracting/NEVI---3/RFP.pdf "NEVI Round 3 RFP"
[3]: https://www.michigan.gov/mdot/-/media/Project/Websites/MDOT/Travel/Mobility/Mobility-Initiatives/NEVI/FY26-Michigan-Plan-Electric-Vehicles.pdf "Michigan State Plan for Electric Vehicle Infrastructure Deployment Fiscal Year 2026"
[4]: https://www.michigan.gov/mdot/news-outreach/pressreleases/2026/06/09/mdot-expanding-ev-charging-network-accepting-proposals-for-round-3-nevi-procurement "MDOT expanding EV charging network, accepting proposals for Round 3 NEVI procurement"
[5]: https://www.ecfr.gov/current/title-23/chapter-I/subchapter-G/part-680 "
    eCFR :: 23 CFR Part 680 -- National Electric Vehicle Infrastructure Standards and Requirements
  "

