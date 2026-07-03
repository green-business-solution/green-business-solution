{
"schemaVersion": "retrofi_grant_package_repair.v1",
"researchedAt": "2026-07-03",
"opportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:emerging-technologies-grant",
"programName": "Emerging Technologies Grant",
"status": "needs_project_inputs",
"sourceConfidence": "high",
"estimateConfidenceIfInputsPresent": "medium",
"officialSources": [
{
"title": "Energy Efficiency Rebates - Emerging Technologies Grant",
"url": "[https://www.siliconvalleypower.com/businesses/rebates](https://www.siliconvalleypower.com/businesses/rebates)",
"owner": "Silicon Valley Power / City of Santa Clara",
"accessed": "2026-07-03",
"evidenceText": "The SVP business rebates page lists the Emerging Technologies Grant, describes eligible emerging-technology project types, states awards are based on energy saved, capped at 85% of project cost and $250,000 per customer, and identifies $500,000 per year program funding. It also says pre-approval is required before installation. ([Silicon Valley Power][1])"
},
{
"title": "2025-2026 Emerging Technologies Grant Program Application",
"url": "[https://www.siliconvalleypower.com/home/showpublisheddocument/46967/638868862568870000](https://www.siliconvalleypower.com/home/showpublisheddocument/46967/638868862568870000)",
"owner": "Silicon Valley Power / City of Santa Clara",
"accessed": "2026-07-03",
"evidenceText": "The official application supplies the calculable rate of $0.35 per annual kWh saved, states the total rebate cannot exceed 85% of total measure cost, confirms the $250,000 per-customer program-year cap and $500,000 program-year funding limit, and states applications are accepted first come, first served until the rebate budget is expended. It also requires SVP pre-approval, SVP-approved savings and measure costs, and M&V verification before final payment. "
},
{
"title": "Commercial Rebate Programs: Energy Investments for Your Business",
"url": "[https://www.siliconvalleypower.com/home/showpublisheddocument/5082/638917985630870000](https://www.siliconvalleypower.com/home/showpublisheddocument/5082/638917985630870000)",
"owner": "Silicon Valley Power / City of Santa Clara",
"accessed": "2026-07-03",
"evidenceText": "The official commercial rebate flyer summarizes that SVP offers Emerging Technology Grant funding up to $250,000 for customers implementing new energy-efficient technology and states pre-approval is required for all rebates. "
},
{
"title": "Public Benefits Program Proposal for FY 2023-2024 through 2027-2028",
"url": "[https://www.siliconvalleypower.com/home/showpublisheddocument/15034/638228534630800000](https://www.siliconvalleypower.com/home/showpublisheddocument/15034/638228534630800000)",
"owner": "Silicon Valley Power / City of Santa Clara",
"accessed": "2026-07-03",
"evidenceText": "SVP's Public Benefits Program Proposal identifies the Emerging Technologies Grant as an ongoing public-benefits program through the FY 2023-2024 to FY 2027-2028 planning period and describes the same emerging-technology eligibility themes. ([Silicon Valley Power][2])"
}
],
"sourceSummary": "Official SVP sources support a formula-based, first-come, budget-limited cash grant rather than a competitive expected-value estimate. The defensible conditional formula is $0.35 per SVP-approved annual kWh saved, capped at 85% of SVP-approved eligible measure cost and $250,000 per customer per program year, with an annual program funding limit of $500,000. Runtime calculation must remain conditional because the application requires written SVP pre-approval before implementation or installation, SVP approval of project description, savings and measure-cost documentation, M&V verification, and current-year funding availability. No official live remaining-budget balance, historical award count, application count, or success rate was found; therefore the award should not be included in user-facing savings totals by default. Original package context reviewed from the uploaded prompt. ",
"packagePatch": {
"calculation_status": "calculable_with_missing_inputs",
"availability": {
"status": "active",
"fundingStatus": "open_while_funds_last"
},
"input_requirements_to_add_or_update": [
{
"input_key": "applicant_is_nonresidential_svp_customer",
"label": "Applicant is a nonresidential Silicon Valley Power customer",
"value_type": "boolean",
"required_for": [
"effect_svp_emerging_technologies_grant_conditional_award"
],
"source_precedence": [
"user_profile",
"utility_data",
"program_application",
"admin_review"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "project_matches_emerging_technology_eligibility",
"label": "Project matches at least one SVP emerging-technology eligibility category",
"value_type": "boolean",
"required_for": [
"effect_svp_emerging_technologies_grant_conditional_award"
],
"source_precedence": [
"program_application",
"admin_review"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "project_not_implemented_before_svp_preapproval",
"label": "Project was not implemented or installed before SVP pre-approval",
"value_type": "boolean",
"required_for": [
"effect_svp_emerging_technologies_grant_conditional_award"
],
"source_precedence": [
"program_application",
"admin_review"
],
"missing_severity": "blocks_eligibility"
},
{
"input_key": "svp_written_preapproval_obtained",
"label": "Written SVP pre-approval obtained",
"value_type": "boolean",
"required_for": [
"effect_svp_emerging_technologies_grant_conditional_award"
],
"source_precedence": [
"program_application",
"application_status",
"admin_review"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "svp_project_description_approved",
"label": "SVP approved the project description",
"value_type": "boolean",
"required_for": [
"effect_svp_emerging_technologies_grant_conditional_award"
],
"source_precedence": [
"program_application",
"application_status",
"admin_review"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "svp_savings_estimate_approved",
"label": "SVP approved the energy savings estimate",
"value_type": "boolean",
"required_for": [
"effect_svp_emerging_technologies_grant_conditional_award"
],
"source_precedence": [
"program_application",
"application_status",
"admin_review"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "svp_approved_annual_kwh_savings",
"label": "SVP-approved annual kWh savings",
"value_type": "number",
"required_for": [
"effect_svp_emerging_technologies_grant_conditional_award"
],
"source_precedence": [
"program_application",
"admin_review",
"quote",
"utility_data"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "eligible_measure_cost_cents",
"label": "SVP-approved eligible measure cost in cents",
"value_type": "money_cents",
"required_for": [
"effect_svp_emerging_technologies_grant_conditional_award"
],
"source_precedence": [
"admin_review",
"program_application",
"quote",
"invoice"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "program_year_funding_available",
"label": "Current SVP program-year funding available for this project",
"value_type": "boolean",
"required_for": [
"effect_svp_emerging_technologies_grant_conditional_award"
],
"source_precedence": [
"admin_research",
"program_application",
"application_status"
],
"missing_severity": "blocks_user_facing_estimate"
},
{
"input_key": "verified_annual_kwh_savings",
"label": "Verified annual kWh savings after M&V, if available",
"value_type": "number",
"required_for": [
"effect_svp_emerging_technologies_grant_conditional_award"
],
"source_precedence": [
"application_status",
"admin_review",
"utility_data",
"bill"
],
"missing_severity": "optional_refines_final_award"
}
],
"effects_to_add_or_update": [
{
"effect_id": "effect_svp_emerging_technologies_grant_conditional_award",
"effect_type": "grant_expected_value",
"cash_value_classification": "cash_grant",
"value_model_kind": "hybrid_rate_plus_cap",
"calculation": {
"method": "expression",
"amount_cents": null,
"percent": 0.85,
"conditional_award_cents": null,
"conditional_award_formula": "Return null unless applicant_is_nonresidential_svp_customer, project_matches_emerging_technology_eligibility, project_not_implemented_before_svp_preapproval, svp_written_preapproval_obtained, svp_project_description_approved, svp_savings_estimate_approved, and program_year_funding_available are all true. When true: conservative_kwh = min(svp_approved_annual_kwh_savings, coalesce(verified_annual_kwh_savings, svp_approved_annual_kwh_savings)); conditional_award_cents = floor(min(35 * conservative_kwh, 0.85 * eligible_measure_cost_cents, 25000000)). Do not apply any probability discount; suppress instead when funding availability or SVP approval inputs are missing.",
"max_award_cents": 25000000,
"min_award_cents": 0,
"rate_rows": [
{
"rate_name": "energy_savings_grant_rate",
"rate_cents_per_kwh": 35,
"applies_to": "SVP-approved annual kWh savings, or lower verified annual kWh savings when available"
},
{
"rate_name": "maximum_percent_of_project_cost",
"percent": 0.85,
"cost_basis": "SVP-approved equipment and labor costs directly related to the energy-efficiency improvements"
},
{
"rate_name": "per_customer_program_year_cap",
"amount_cents": 25000000,
"applies_to": "customer per SVP program year"
},
{
"rate_name": "annual_program_funding_limit",
"amount_cents": 50000000,
"applies_to": "Emerging Technologies Grant program per SVP program year"
}
],
"probability_discount": null,
"probability_evidence_type": "first_come_funding_unknown"
},
"required_inputs": [
"applicant_is_nonresidential_svp_customer",
"project_matches_emerging_technology_eligibility",
"project_not_implemented_before_svp_preapproval",
"svp_written_preapproval_obtained",
"svp_project_description_approved",
"svp_savings_estimate_approved",
"svp_approved_annual_kwh_savings",
"eligible_measure_cost_cents",
"program_year_funding_available"
],
"missing_input_behavior": "needs_funding_check",
"includedInUserFacingTotalDefault": false,
"humanReviewRequired": true,
"reasonCodes": [
"formula_rate_plus_cap",
"rate_35_cents_per_approved_annual_kwh",
"cap_85_percent_of_svp_approved_measure_cost",
"cap_250000_per_customer_program_year",
"annual_program_budget_500000",
"requires_svp_written_preapproval",
"requires_svp_approved_savings",
"requires_svp_approved_measure_cost",
"project_specific_approval_required",
"first_come_funding_unknown",
"no_live_remaining_budget_published",
"final_award_subject_to_m_and_v",
"exclude_from_user_facing_total_by_default"
],
"calculationTrace": [
"Confirm the applicant is a nonresidential SVP customer and the project meets an Emerging Technologies Grant eligibility category.",
"Suppress unless the project was not implemented or installed before written SVP pre-approval.",
"Suppress unless SVP has approved the project description, savings estimate, eligible measure costs, and current program-year funds are available.",
"Calculate energy-savings component as 35 cents times SVP-approved annual kWh savings; if verified annual kWh savings are available and lower, use the lower verified kWh for a conservative estimate.",
"Limit the result to 85% of SVP-approved eligible measure cost.",
"Limit the result to $250,000 per customer per SVP program year.",
"Do not add a probability discount or include in user-facing totals by default because no official remaining-budget balance, application count, award count, or success rate was found."
]
}
]
},
"testCaseInputHints": [
{
"inputKey": "applicant_is_nonresidential_svp_customer",
"valueType": "boolean",
"whoProvides": "server_derived",
"realisticDefaultGuidance": "Do not default true unless the account is a nonresidential SVP electric customer."
},
{
"inputKey": "project_matches_emerging_technology_eligibility",
"valueType": "boolean",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "Set true only after the project narrative fits an SVP emerging-technology category or SVP confirms eligibility."
},
{
"inputKey": "project_not_implemented_before_svp_preapproval",
"valueType": "boolean",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Do not default true; verify pre-approval occurred before implementation or installation."
},
{
"inputKey": "svp_written_preapproval_obtained",
"valueType": "boolean",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Do not default true; require written SVP confirmation."
},
{
"inputKey": "svp_approved_annual_kwh_savings",
"valueType": "number",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "Use the annual kWh savings approved by SVP, not an unreviewed engineering estimate."
},
{
"inputKey": "eligible_measure_cost_cents",
"valueType": "money_cents",
"whoProvides": "quote",
"realisticDefaultGuidance": "Use only equipment and labor costs that SVP approves as directly related to the energy-efficiency improvement; for testing, $100,000 is 10000000."
},
{
"inputKey": "program_year_funding_available",
"valueType": "boolean",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "Do not default true; verify current-year remaining funds with SVP or the rebate portal before calculating a user-facing estimate."
},
{
"inputKey": "verified_annual_kwh_savings",
"valueType": "number",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Optional before M&V. If present and below approved savings, use it to reduce the conservative award estimate."
}
],
"remainingGaps": [
"No official live remaining-budget balance was found for the $500,000 annual Emerging Technologies Grant program budget.",
"No official historical awards, applications, success rate, or expected award count was found.",
"The downloadable application located during research is titled 2025-2026; confirm the current 2026-2027 application or SVP acceptance status before making a user-facing estimate after the July-June budget year rollover.",
"SVP must approve the project description, energy savings estimates, eligible measure costs, and M&V plan; these cannot be inferred from a quote alone.",
"Existing non-cents eligible_measure_cost input should be deprecated or mapped to eligible_measure_cost_cents to avoid duplicate cost inputs."
],
"doNotUseAsUserFacingEstimateReasons": [
"No default expected value is defensible because program funds are first come, first served until the budget is expended and no live remaining-funds balance was published.",
"No project-specific award is defensible without written SVP pre-approval, SVP-approved annual kWh savings, SVP-approved eligible measure cost, and confirmation that program-year funds remain available.",
"Final payment may be adjusted after M&V based on verified savings, including downward adjustment.",
"The official application found is marked 2025-2026, so current program-year application status should be confirmed with SVP before user-facing inclusion."
]
}

[1]: https://www.siliconvalleypower.com/businesses/rebates?utm_source=chatgpt.com "
    
    Energy Efficiency Rebates | Silicon Valley Power

"
[2]: https://www.siliconvalleypower.com/home/showpublisheddocument/15034/638228534630800000 "Microsoft Word - Public Benefits Program Proposal 2023-2028 final"

