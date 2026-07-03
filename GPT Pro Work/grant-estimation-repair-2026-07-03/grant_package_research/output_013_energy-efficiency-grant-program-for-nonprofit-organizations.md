{
"schemaVersion": "retrofi_grant_package_repair.v1",
"researchedAt": "2026-07-03",
"opportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:energy-efficiency-grant-program-for-nonprofit-organizations",
"programName": "Energy Efficiency Grant Program for Nonprofit Organizations",
"status": "suppress_no_probability_evidence",
"sourceConfidence": "high",
"estimateConfidenceIfInputsPresent": "low",
"officialSources": [
{
"title": "Energy Efficiency Rebates",
"url": "[https://www.siliconvalleypower.com/businesses/rebates](https://www.siliconvalleypower.com/businesses/rebates)",
"owner": "Silicon Valley Power, City of Santa Clara",
"accessed": "2026-07-03",
"evidenceText": "The SVP business rebates page lists the Energy Efficiency Grant Program for Nonprofit Organizations, says eligible 501(c)(3) or 501(c)(19) organizations located in Santa Clara that own or lease property and receive SVP electric service may apply, identifies electricity-saving projects such as lighting, HVAC, and weatherization, states the maximum available funds for a single project are $25,000 with 20% matching funds required, lists June 30 and December 31 application deadlines, says awards are announced within 4 weeks, and requires pre-approval prior to purchase and installation. ([Silicon Valley Power][1])"
},
{
"title": "2025–2026 Silicon Valley Power Energy Efficiency Grant for Nonprofit Organizations Application Form",
"url": "[https://www.siliconvalleypower.com/home/showpublisheddocument/65401/638892913182770000](https://www.siliconvalleypower.com/home/showpublisheddocument/65401/638892913182770000)",
"owner": "Silicon Valley Power, City of Santa Clara",
"accessed": "2026-07-03",
"evidenceText": "The official application form states that applications are accepted twice per calendar year with June 30 and December 31 deadlines, award notices go to successful applicants within 4 weeks, eligible applicants must be SVP billing customers of record and IRS 501(c)(3) or 501(c)(19) nonprofits with active FTB status, eligible projects must save electricity, SVP may inspect and audit savings, the maximum funding for a single project is $25,000, funding is limited to one grant per application period per facility, and the grant covers up to 80% of project cost. It also says rebate funding is limited by the annual budget and applications are accepted first come, first served until the budget is expended. "
},
{
"title": "Public Benefits Program Proposal for FY 2023-2024 through 2027-2028",
"url": "[https://www.siliconvalleypower.com/home/showpublisheddocument/15034/638228534630800000](https://www.siliconvalleypower.com/home/showpublisheddocument/15034/638228534630800000)",
"owner": "Silicon Valley Power, City of Santa Clara",
"accessed": "2026-07-03",
"evidenceText": "SVP's public benefits proposal lists Energy Efficiency Grant for Nonprofit Organizations as an ongoing public-benefits program that provides grants to nonprofit organizations to improve facility energy efficiency, but it does not provide application counts, award counts, a program-specific budget, or success-rate evidence for this grant. ([Silicon Valley Power][2])"
}
],
"sourceSummary": "The uploaded package context was a grant-like v2 incentive package for SVP's nonprofit energy-efficiency grant.  Official SVP sources support a conditional capped-percent formula if a project is selected and approved: up to 80% of eligible project cost, capped at 2500000 cents for a single project, with a 20% applicant match. Official sources do not support an automated expected-value estimate because the award is application-based, funding is annual-budget-limited and accepted until budget expended, current unreserved funds were not confirmed, and no official probability evidence such as historical applications, awards, success rates, expected award counts, or program-specific remaining budget was found.",
"packagePatch": {
"calculation_status": "calculable_with_missing_inputs",
"availability": {
"status": "active",
"fundingStatus": "open_while_funds_last"
},
"input_requirements_to_add_or_update": [
{
"input_key": "eligible_project_cost_cents",
"label": "Eligible electricity-saving project cost",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_6f580262ed2e24cd"
],
"source_precedence": [
"quote",
"program_application",
"admin_review"
],
"missing_severity": "blocks_conditional_award_formula"
},
{
"input_key": "project_description",
"label": "Detailed description of proposed energy-efficiency project",
"value_type": "text",
"required_for": [
"effect_grant_expected_value_1_6f580262ed2e24cd"
],
"source_precedence": [
"program_application",
"quote",
"user_profile"
],
"missing_severity": "blocks_eligibility_review"
},
{
"input_key": "proposed_project_timeline",
"label": "Proposed project completion timeline",
"value_type": "text",
"required_for": [
"effect_grant_expected_value_1_6f580262ed2e24cd"
],
"source_precedence": [
"program_application",
"quote",
"user_profile"
],
"missing_severity": "blocks_application_completeness"
},
{
"input_key": "estimated_annual_electricity_savings_kwh",
"label": "Estimated annual electricity savings",
"value_type": "number",
"required_for": [
"effect_grant_expected_value_1_6f580262ed2e24cd"
],
"source_precedence": [
"quote",
"energy_audit",
"program_application",
"admin_review"
],
"missing_severity": "blocks_eligibility_review"
},
{
"input_key": "energy_savings_calculation_source",
"label": "Source or documentation for energy-savings estimate",
"value_type": "text",
"required_for": [
"effect_grant_expected_value_1_6f580262ed2e24cd"
],
"source_precedence": [
"quote",
"energy_audit",
"program_application",
"admin_review"
],
"missing_severity": "blocks_application_completeness"
},
{
"input_key": "nonprofit_tax_exempt_status",
"label": "IRS nonprofit tax-exempt status is 501(c)(3) or 501(c)(19)",
"value_type": "enum",
"allowed_values": [
"501c3",
"501c19",
"other",
"unknown"
],
"required_for": [
"effect_grant_expected_value_1_6f580262ed2e24cd"
],
"source_precedence": [
"program_application",
"admin_review",
"user_profile"
],
"missing_severity": "blocks_eligibility_review"
},
{
"input_key": "ftb_active_exempt_status",
"label": "California FTB exempt organization status is active",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_6f580262ed2e24cd"
],
"source_precedence": [
"program_application",
"admin_review"
],
"missing_severity": "blocks_eligibility_review"
},
{
"input_key": "svp_customer_of_record_status",
"label": "Applicant is SVP electric utility billing customer of record",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_6f580262ed2e24cd"
],
"source_precedence": [
"utility_data",
"program_application",
"admin_review"
],
"missing_severity": "blocks_eligibility_review"
},
{
"input_key": "facility_in_city_of_santa_clara",
"label": "Facility is located in the City of Santa Clara",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_6f580262ed2e24cd"
],
"source_precedence": [
"utility_data",
"program_application",
"user_profile",
"admin_review"
],
"missing_severity": "blocks_eligibility_review"
},
{
"input_key": "facility_ownership_or_lease_5yr_remaining",
"label": "Applicant owns the facility or has at least five years remaining on lease",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_6f580262ed2e24cd"
],
"source_precedence": [
"program_application",
"user_profile",
"admin_review"
],
"missing_severity": "blocks_eligibility_review"
},
{
"input_key": "minimum_operating_history_or_12_month_svp_bills",
"label": "Applicant has two-year operating history or 12 consecutive months of SVP bills for facility",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_6f580262ed2e24cd"
],
"source_precedence": [
"program_application",
"utility_data",
"admin_review"
],
"missing_severity": "blocks_eligibility_review"
},
{
"input_key": "has_at_least_one_full_time_employee",
"label": "Applicant has at least one full-time employee",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_6f580262ed2e24cd"
],
"source_precedence": [
"program_application",
"user_profile",
"admin_review"
],
"missing_severity": "blocks_eligibility_review"
},
{
"input_key": "application_period_deadline",
"label": "Applicable grant application period deadline",
"value_type": "enum",
"allowed_values": [
"june_30",
"december_31",
"unknown"
],
"required_for": [
"effect_grant_expected_value_1_6f580262ed2e24cd"
],
"source_precedence": [
"server_derived",
"program_application",
"admin_review"
],
"missing_severity": "blocks_application_timing_check"
},
{
"input_key": "purchase_and_installation_after_svp_preapproval",
"label": "Purchase and installation occur only after SVP grant pre-approval",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_6f580262ed2e24cd"
],
"source_precedence": [
"program_application",
"quote",
"admin_review"
],
"missing_severity": "blocks_eligibility_review"
},
{
"input_key": "svp_preapproval_notice_status",
"label": "SVP pre-approval notice status",
"value_type": "enum",
"allowed_values": [
"approved",
"denied",
"pending",
"not_submitted",
"unknown"
],
"required_for": [
"effect_grant_expected_value_1_6f580262ed2e24cd"
],
"source_precedence": [
"application_status",
"admin_review"
],
"missing_severity": "blocks_user_facing_estimate"
},
{
"input_key": "svp_current_funds_available_status",
"label": "SVP confirmation that current program funds are available or reserved for applicant",
"value_type": "enum",
"allowed_values": [
"funds_reserved",
"funds_available",
"waitlisted",
"exhausted",
"unknown"
],
"required_for": [
"effect_grant_expected_value_1_6f580262ed2e24cd"
],
"source_precedence": [
"application_status",
"admin_review"
],
"missing_severity": "blocks_user_facing_estimate"
},
{
"input_key": "svp_approved_grant_funding_cents",
"label": "SVP approved grant funding amount from pre-approval or award notice",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_6f580262ed2e24cd"
],
"source_precedence": [
"application_status",
"admin_review"
],
"missing_severity": "blocks_user_facing_estimate"
},
{
"input_key": "prior_svp_rebate_funds_same_facility_similar_measures_5yr_cents",
"label": "Prior SVP rebate or grant funds for similar measures at same facility during five-year cap period",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_6f580262ed2e24cd"
],
"source_precedence": [
"utility_data",
"application_status",
"admin_review"
],
"missing_severity": "needs_review_for_broader_facility_cap"
}
],
"effects_to_add_or_update": [
{
"effect_id": "effect_grant_expected_value_1_6f580262ed2e24cd",
"effect_type": "grant_expected_value",
"cash_value_classification": "cash_grant",
"value_model_kind": "capped_percent_of_eligible_cost",
"calculation": {
"method": "percent_of_cost",
"amount_cents": null,
"percent": 0.8,
"conditional_award_cents": null,
"conditional_award_formula": "If, and only if, SVP determines the applicant and project are eligible, funds are available or reserved, and SVP issues a project-specific approval or award notice, the conditional pre-award cap is min(floor(eligible_project_cost_cents * 0.8), 2500000). If SVP provides svp_approved_grant_funding_cents, use that approved amount instead of the formula and do not exceed 2500000 cents for the project. Do not assign an expected value probability from official sources.",
"max_award_cents": 2500000,
"min_award_cents": null,
"rate_rows": [],
"probability_discount": null,
"probability_evidence_type": "first_come_funding_unknown"
},
"required_inputs": [
"eligible_project_cost_cents",
"project_description",
"proposed_project_timeline",
"estimated_annual_electricity_savings_kwh",
"energy_savings_calculation_source",
"nonprofit_tax_exempt_status",
"ftb_active_exempt_status",
"svp_customer_of_record_status",
"facility_in_city_of_santa_clara",
"facility_ownership_or_lease_5yr_remaining",
"minimum_operating_history_or_12_month_svp_bills",
"has_at_least_one_full_time_employee",
"application_period_deadline",
"purchase_and_installation_after_svp_preapproval",
"svp_preapproval_notice_status",
"svp_current_funds_available_status",
"svp_approved_grant_funding_cents",
"prior_svp_rebate_funds_same_facility_similar_measures_5yr_cents"
],
"missing_input_behavior": "suppress_until_review",
"includedInUserFacingTotalDefault": false,
"humanReviewRequired": true,
"reasonCodes": [
"application_based_grant",
"project_specific_award_decision_required",
"preapproval_required_before_purchase_and_installation",
"up_to_percent_not_guaranteed",
"annual_budget_limited",
"first_come_budget_status_unknown",
"current_funds_not_confirmed",
"no_probability_evidence",
"missing_project_cost_until_quote",
"missing_svp_approved_grant_funding",
"not_included_in_default_user_facing_total"
],
"calculationTrace": [
"Official sources support only a conditional value formula: up to 80% of eligible project cost with a 2500000 cent single-project maximum.",
"The application and business page require project-specific application review, pre-approval before purchase and installation, SVP inspection or audit authority, and post-installation verification before final funding is confirmed.",
"The source says annual-budget funding is limited and applications are accepted first come, first served until the budget is expended, but no official current remaining-funds amount was found.",
"No official historical applications, historical awards, success rate, expected award count, or program-specific budget evidence was found; therefore probability_discount remains null.",
"Before an SVP approval or award notice, runtime should suppress the expected value and include no amount in default user-facing savings totals.",
"After an SVP approval or award notice, runtime may display the SVP-approved funding amount as an application-status amount; if the approved amount is unavailable, the formula may be used only as a non-default conditional cap, not as an expected cash estimate."
]
}
]
},
"testCaseInputHints": [
{
"inputKey": "eligible_project_cost_cents",
"valueType": "money_cents",
"whoProvides": "quote",
"realisticDefaultGuidance": "Use only the cost of eligible electricity-saving measures for the proposed project. Do not include non-energy repairs unless SVP explicitly approves them as eligible."
},
{
"inputKey": "estimated_annual_electricity_savings_kwh",
"valueType": "number",
"whoProvides": "quote",
"realisticDefaultGuidance": "Provide annual kWh savings with a calculation source; SVP may verify or adjust savings through audit or inspection."
},
{
"inputKey": "project_description",
"valueType": "text",
"whoProvides": "user",
"realisticDefaultGuidance": "Describe the proposed lighting, HVAC, weatherization, or other electricity-saving measures and facility where they will be installed."
},
{
"inputKey": "energy_savings_calculation_source",
"valueType": "text",
"whoProvides": "quote",
"realisticDefaultGuidance": "Reference the engineering calculation, calculator, audit, or measure-savings source used to estimate savings."
},
{
"inputKey": "nonprofit_tax_exempt_status",
"valueType": "enum",
"whoProvides": "user",
"realisticDefaultGuidance": "Expected values are 501c3, 501c19, other, or unknown. Only 501c3 and 501c19 are supported by the official eligibility rules."
},
{
"inputKey": "ftb_active_exempt_status",
"valueType": "boolean",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "Must be true for a defensible eligibility assumption; otherwise suppress."
},
{
"inputKey": "svp_customer_of_record_status",
"valueType": "boolean",
"whoProvides": "bill",
"realisticDefaultGuidance": "Must confirm the nonprofit is the SVP electric utility billing customer of record for the facility."
},
{
"inputKey": "facility_in_city_of_santa_clara",
"valueType": "boolean",
"whoProvides": "server_derived",
"realisticDefaultGuidance": "Must be true because the program is for eligible nonprofit organizations located in the City of Santa Clara receiving SVP electric service."
},
{
"inputKey": "facility_ownership_or_lease_5yr_remaining",
"valueType": "boolean",
"whoProvides": "user",
"realisticDefaultGuidance": "Must confirm ownership or a lease with at least five years remaining for the facility being upgraded."
},
{
"inputKey": "minimum_operating_history_or_12_month_svp_bills",
"valueType": "boolean",
"whoProvides": "bill",
"realisticDefaultGuidance": "True only if the applicant has a minimum two-year operating history or at least 12 consecutive months of SVP utility bills for the facility."
},
{
"inputKey": "has_at_least_one_full_time_employee",
"valueType": "boolean",
"whoProvides": "user",
"realisticDefaultGuidance": "Must be true for eligibility under the official application."
},
{
"inputKey": "application_period_deadline",
"valueType": "enum",
"whoProvides": "server_derived",
"realisticDefaultGuidance": "Use june_30 or december_31 based on the application period being targeted; unknown blocks timing assumptions."
},
{
"inputKey": "purchase_and_installation_after_svp_preapproval",
"valueType": "boolean",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Must be true; projects purchased or installed before SVP pre-approval should be suppressed."
},
{
"inputKey": "svp_preapproval_notice_status",
"valueType": "enum",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Use approved, denied, pending, not_submitted, or unknown. Do not include value in totals unless approved."
},
{
"inputKey": "svp_current_funds_available_status",
"valueType": "enum",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "Use funds_reserved or funds_available only with current SVP confirmation; waitlisted, exhausted, or unknown should suppress default value."
},
{
"inputKey": "svp_approved_grant_funding_cents",
"valueType": "money_cents",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Use the amount from SVP's pre-approval or award notice. Without this, do not include a user-facing expected value."
},
{
"inputKey": "prior_svp_rebate_funds_same_facility_similar_measures_5yr_cents",
"valueType": "money_cents",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "Use if SVP or utility records show prior rebate or grant funds for similar measures at the same facility during the five-year cap period."
}
],
"remainingGaps": [
"No official historical application count for this nonprofit energy-efficiency grant was found.",
"No official historical award count or success rate for this nonprofit energy-efficiency grant was found.",
"No official expected number of awards per application period was found for this specific program.",
"No official program-specific annual budget or remaining unreserved funds amount was found.",
"No official current funds-reserved confirmation exists for a project-specific applicant until SVP issues an application status or pre-approval notice.",
"The linked form is labeled 2025–2026; runtime should re-check the SVP business rebates page for a newer form if evaluating later program years.",
"The conditional formula uses eligible project cost, but SVP may verify or adjust eligible costs and energy savings through inspections or audit."
],
"doNotUseAsUserFacingEstimateReasons": [
"The official amount is described as up to 80% of project cost, not a guaranteed entitlement.",
"SVP project-specific pre-approval is required before purchase and installation.",
"Awards are only sent to successful applicants after the application deadline.",
"Funding is limited by SVP's annual budget and accepted until the budget is expended.",
"Current remaining funds or fund reservation status was not confirmed by official sources.",
"No official probability evidence supports an expected-value discount.",
"Eligible project cost, verified electricity savings, applicant eligibility, and SVP-approved grant funding are project-specific inputs."
]
}

[1]: https://www.siliconvalleypower.com/businesses/rebates?utm_source=chatgpt.com "
    
    Energy Efficiency Rebates | Silicon Valley Power

"
[2]: https://www.siliconvalleypower.com/home/showpublisheddocument/15034/638228534630800000 "Microsoft Word - Public Benefits Program Proposal 2023-2028 final"

