{
"schemaVersion": "retrofi_grant_package_repair.v1",
"researchedAt": "2026-07-03",
"opportunityId": "SOURCE_DSIRE:dsire_program_id:21861",
"programName": "Agricultural Energy Program",
"status": "suppress_no_probability_evidence",
"sourceConfidence": "high",
"estimateConfidenceIfInputsPresent": "low",
"officialSources": [
{
"title": "Energy Efficiency And Renewable Energy Programs For Farms",
"url": "[https://energy.ri.gov/energy-efficiency/farm-energy-programs](https://energy.ri.gov/energy-efficiency/farm-energy-programs)",
"owner": "Rhode Island Office of Energy Resources",
"accessed": "2026-07-03",
"evidenceText": "Current OER page states the Agricultural Energy Grant Program provides grants of up to $20,000 for eligible farm energy efficiency and renewable energy projects, is funded by RGGI proceeds, awards are subject to availability of funds and OER sole discretion, applications do not guarantee awards, and the 2026 rolling application deadline is 5:00pm on Friday, November 6, 2026. ([Rhode Island Office of Energy Resources][1])"
},
{
"title": "Farm Energy Program Guidance Doc V4",
"url": "[https://energy.ri.gov/sites/g/files/xkgbur741/files/2026-06/Farm%20Energy%20Program%20Guidance%20Doc%20V4.pdf](https://energy.ri.gov/sites/g/files/xkgbur741/files/2026-06/Farm%20Energy%20Program%20Guidance%20Doc%20V4.pdf)",
"owner": "Rhode Island Office of Energy Resources and Rhode Island Department of Environmental Management",
"accessed": "2026-07-03",
"evidenceText": "Guidance states qualified Rhode Island agribusinesses may be eligible for grants of up to $20,000, application submittal does not guarantee award, awards are subject to funding availability, applicants must contribute at least 10% of total project costs, grants are ranked from highest to lowest scores, funds are for direct materials and labor, exact funding amount is determined at OER sole discretion, pre-OER-contract costs are not reimbursable, and site visits or inspections do not guarantee funding.   "
},
{
"title": "Agricultural Energy Program Grant Application Form for an Energy Efficiency Project",
"url": "[https://energy.ri.gov/sites/g/files/xkgbur741/files/2023-02/UPDATED%20FINAL%20EE%20App_Fillable.pdf](https://energy.ri.gov/sites/g/files/xkgbur741/files/2023-02/UPDATED%20FINAL%20EE%20App_Fillable.pdf)",
"owner": "Rhode Island Office of Energy Resources and Rhode Island Department of Environmental Management",
"accessed": "2026-07-03",
"evidenceText": "Energy efficiency application asks for total project cost, other funding, applicant contribution, requested RI Agricultural Energy Program amount of $20,000 or less, zero shortfall, project cost savings, vendor documentation, audit, energy bills, and attestation that funding is at OER sole discretion and subject to availability. "
},
{
"title": "Agricultural Energy Program Grant Application Form for a Renewable Energy Project",
"url": "[https://energy.ri.gov/sites/g/files/xkgbur741/files/2023-02/UPDATED%20FINAL%20RE%20App_Fillable.pdf](https://energy.ri.gov/sites/g/files/xkgbur741/files/2023-02/UPDATED%20FINAL%20RE%20App_Fillable.pdf)",
"owner": "Rhode Island Office of Energy Resources and Rhode Island Department of Environmental Management",
"accessed": "2026-07-03",
"evidenceText": "Renewable energy application asks for project size, turnkey contract date, energy bills, annual generation and savings, audit status, other funding, applicant contribution of at least 10%, requested RI Agricultural Energy Program amount of $20,000 or less, zero shortfall, ITC status, permits, vendor credentials, equipment specifications, and attestation that funds are subject to OER discretion and availability. "
},
{
"title": "RI Agricultural Energy Program Dashboard",
"url": "[https://energy.ri.gov/energy-efficiency/farm-energy-programs/farm-energy-program-dashboard](https://energy.ri.gov/energy-efficiency/farm-energy-programs/farm-energy-program-dashboard)",
"owner": "Rhode Island Office of Energy Resources",
"accessed": "2026-07-03",
"evidenceText": "Official dashboard provides historical program progress since 2016 and shows total grants awarded and applications awarded by year, but it does not provide applications submitted, current round budget, expected number of 2026 awards, or a success rate denominator. ([Rhode Island Office of Energy Resources][2]) "
},
{
"title": "RI Agricultural Energy Program",
"url": "[https://dem.ri.gov/agriculture/financial-assistance/farm-energy-program](https://dem.ri.gov/agriculture/financial-assistance/farm-energy-program)",
"owner": "Rhode Island Department of Environmental Management",
"accessed": "2026-07-03",
"evidenceText": "DEM page confirms DEM partners with OER to administer the RI Agricultural Energy Grant Program, with grant awards of up to $20,000 for eligible energy efficiency and renewable energy projects at Rhode Island farms. ([RI DEM][3])"
},
{
"title": "Agricultural Energy Audits: RI Agricultural Clean Energy Technical Assistance Program",
"url": "[https://energy.ri.gov/energy-efficiency/farm-energy-programs/agricultural-energy-audits](https://energy.ri.gov/energy-efficiency/farm-energy-programs/agricultural-energy-audits)",
"owner": "Rhode Island Office of Energy Resources",
"accessed": "2026-07-03",
"evidenceText": "OER states GDS Associates offers free comprehensive agricultural energy audits to Rhode Island farmers; this is non-cash technical assistance and does not establish a grant award amount. ([Rhode Island Office of Energy Resources][4])"
}
],
"sourceSummary": "Reviewed uploaded package context  and current official OER/DEM sources. The program is active for the 2026 round, with rolling applications due 2026-11-06, but the official materials support only a competitive, discretionary, funding-contingent award with a $20,000 maximum and at least 10% applicant contribution. The sources do not support an automatic 90% grant formula. The official dashboard gives historical awarded-project information, but not applications submitted, current budget, expected award count, or success-rate evidence. Expected value should therefore be suppressed by default.",
"packagePatch": {
"calculation_status": "no_calculable_value",
"availability": {
"status": "rolling",
"fundingStatus": "open_while_funds_last"
},
"input_requirements_to_add_or_update": [
{
"input_key": "eligible_direct_material_labor_cost_cents",
"label": "eligible direct materials and labor cost",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_d2ac4b4734cc8f4f"
],
"source_precedence": [
"quote",
"program_application",
"paid_invoice",
"admin_review"
],
"missing_severity": "blocks_conditional_award_validation"
},
{
"input_key": "total_project_cost_cents",
"label": "total project cost",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_d2ac4b4734cc8f4f"
],
"source_precedence": [
"quote",
"program_application",
"paid_invoice"
],
"missing_severity": "blocks_cost_share_validation"
},
{
"input_key": "applicant_contribution_cents",
"label": "applicant contribution",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_d2ac4b4734cc8f4f"
],
"source_precedence": [
"program_application",
"user_profile",
"accountant",
"admin_review"
],
"missing_severity": "blocks_cost_share_validation"
},
{
"input_key": "other_committed_funding_cents",
"label": "other committed funding",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_d2ac4b4734cc8f4f"
],
"source_precedence": [
"program_application",
"accountant",
"admin_review"
],
"missing_severity": "blocks_full_funding_validation"
},
{
"input_key": "requested_grant_amount_cents",
"label": "amount requested from RI Agricultural Energy Program",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_d2ac4b4734cc8f4f"
],
"source_precedence": [
"program_application"
],
"missing_severity": "does_not_create_award_estimate"
},
{
"input_key": "award_decision_status",
"label": "official award decision status",
"value_type": "enum",
"allowed_values": [
"not_applied",
"submitted",
"under_review",
"site_visit_pending",
"selected_pending_award_letter",
"awarded",
"denied",
"withdrawn",
"unknown"
],
"required_for": [
"effect_grant_expected_value_1_d2ac4b4734cc8f4f"
],
"source_precedence": [
"application_status",
"admin_review"
],
"missing_severity": "blocks_user_facing_value"
},
{
"input_key": "award_letter_awarded_amount_cents",
"label": "official award letter amount",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_d2ac4b4734cc8f4f"
],
"source_precedence": [
"application_status",
"program_award_letter",
"admin_review"
],
"missing_severity": "blocks_conditional_award_amount"
},
{
"input_key": "award_probability",
"label": "defensible award probability",
"value_type": "number",
"required_for": [
"effect_grant_expected_value_1_d2ac4b4734cc8f4f"
],
"source_precedence": [
"official_success_rate",
"official_budget_and_expected_awards",
"human_reviewed_prior"
],
"missing_severity": "suppress_expected_value"
},
{
"input_key": "measure_type",
"label": "selected clean energy investment type",
"value_type": "enum",
"allowed_values": [
"photovoltaics",
"small_scale_wind",
"biomass",
"energy_storage",
"envelope_insulation",
"led_lighting",
"hvac_system",
"automatic_temperature_controls",
"variable_speed_motors_drives_pumps",
"solar_thermal",
"other_oer_preapproved"
],
"required_for": [
"effect_grant_expected_value_1_d2ac4b4734cc8f4f"
],
"source_precedence": [
"quote",
"program_application",
"admin_review"
],
"missing_severity": "blocks_eligibility_validation"
},
{
"input_key": "agricultural_energy_audit_status",
"label": "agricultural energy audit status",
"value_type": "enum",
"allowed_values": [
"completed",
"scheduled",
"initiated",
"waived_by_oer",
"not_started",
"unknown"
],
"required_for": [
"effect_grant_expected_value_1_d2ac4b4734cc8f4f"
],
"source_precedence": [
"program_application",
"audit_report",
"admin_review"
],
"missing_severity": "blocks_eligibility_validation"
},
{
"input_key": "project_completed_or_interconnected_before_application",
"label": "project completed or interconnected before application",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_d2ac4b4734cc8f4f"
],
"source_precedence": [
"program_application",
"quote",
"interconnection_documentation",
"admin_review"
],
"missing_severity": "blocks_eligibility_validation"
},
{
"input_key": "uses_renewable_energy_growth_program",
"label": "renewable project uses Renewable Energy Growth Program",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_d2ac4b4734cc8f4f"
],
"source_precedence": [
"program_application",
"utility_data",
"admin_review"
],
"missing_severity": "blocks_renewable_project_eligibility_validation"
},
{
"input_key": "oer_executed_contract_or_mou_status",
"label": "OER executed contract or memorandum of understanding status",
"value_type": "enum",
"allowed_values": [
"executed",
"not_executed",
"not_required_yet",
"unknown"
],
"required_for": [
"effect_grant_expected_value_1_d2ac4b4734cc8f4f"
],
"source_precedence": [
"application_status",
"program_contract",
"admin_review"
],
"missing_severity": "blocks_reimbursement_validation"
},
{
"input_key": "paid_invoice_documentation_status",
"label": "paid invoice and incurred cost documentation status",
"value_type": "enum",
"allowed_values": [
"initial_materials_paid_documented",
"final_paid_invoice_documented",
"zero_balance_invoice_documented",
"not_documented",
"unknown"
],
"required_for": [
"effect_grant_expected_value_1_d2ac4b4734cc8f4f"
],
"source_precedence": [
"paid_invoice",
"program_application",
"admin_review"
],
"missing_severity": "blocks_reimbursement_validation"
},
{
"input_key": "post_installation_inspection_status",
"label": "post-installation inspection status",
"value_type": "enum",
"allowed_values": [
"passed",
"pending",
"failed",
"not_required_yet",
"unknown"
],
"required_for": [
"effect_grant_expected_value_1_d2ac4b4734cc8f4f"
],
"source_precedence": [
"application_status",
"admin_review"
],
"missing_severity": "blocks_final_payment_validation"
}
],
"effects_to_add_or_update": [
{
"effect_id": "effect_grant_expected_value_1_d2ac4b4734cc8f4f",
"effect_type": "grant_expected_value",
"cash_value_classification": "reimbursement",
"value_model_kind": "competitive_max_only",
"calculation": {
"method": "expected_value",
"amount_cents": null,
"percent": null,
"conditional_award_cents": null,
"conditional_award_formula": "Do not compute a pre-award grant estimate from project cost alone. Official sources support only a competitive, discretionary award request capped at $20,000 with at least 10% applicant contribution. If and only if an official OER award letter or executed agreement is present, conditional_award_cents may be set to min(award_letter_awarded_amount_cents, 2000000, eligible_direct_material_labor_cost_cents_after_excluding_ineligible_and_pre_OER_contract_costs), subject to applicant_contribution_cents >= 0.10 * total_project_cost_cents, full-funding/zero-shortfall documentation, required permits, interconnection for renewable energy projects, paid invoice documentation, and OER inspection/payment gates. requested_grant_amount_cents is only an application request and must not be treated as an awarded amount.",
"max_award_cents": 2000000,
"min_award_cents": null,
"rate_rows": [],
"probability_discount": null,
"probability_evidence_type": "historical_awards_only"
},
"required_inputs": [
"award_decision_status",
"award_letter_awarded_amount_cents",
"award_probability",
"eligible_direct_material_labor_cost_cents",
"total_project_cost_cents",
"applicant_contribution_cents",
"other_committed_funding_cents",
"requested_grant_amount_cents",
"measure_type",
"agricultural_energy_audit_status",
"project_completed_or_interconnected_before_application",
"uses_renewable_energy_growth_program",
"oer_executed_contract_or_mou_status",
"paid_invoice_documentation_status",
"post_installation_inspection_status"
],
"missing_input_behavior": "suppress_until_review",
"includedInUserFacingTotalDefault": false,
"humanReviewRequired": true,
"reasonCodes": [
"competitive_grant",
"maximum_award_only",
"up_to_amount_not_fixed_award",
"award_amount_discretionary",
"project_specific_award_letter_required",
"probability_evidence_not_found",
"historical_awards_without_application_denominator",
"no_current_round_budget_found",
"no_expected_award_count_found",
"funding_subject_to_availability",
"application_does_not_guarantee_award",
"site_visit_does_not_guarantee_funding",
"cost_share_requirement_is_not_award_formula",
"do_not_apply_90_percent_formula",
"reimbursement_requires_paid_cost_documentation",
"pre_oer_contract_costs_ineligible"
],
"calculationTrace": [
"Current OER page confirms an active rolling 2026 application round with a 2026-11-06 deadline, but awards are subject to funds and OER discretion.",
"OER/DEM guidance and applications support a maximum/request cap of $20,000 and an applicant contribution requirement of at least 10% of total project cost.",
"The 10% applicant contribution requirement caps potential public funding but does not create an automatic 90% reimbursement formula.",
"Guidance states grants are competitive, ranked by score, subject to funding availability, and exact funding amount is determined at OER sole discretion.",
"The official dashboard provides historical awarded-project information only; it does not provide total applications submitted, success rate, current round budget, or expected award count.",
"Therefore probability_discount remains null and expected_value_cents must remain null unless a defensible official probability or human-reviewed prior is supplied.",
"For an already-awarded project, use only the official award letter or executed agreement amount, capped at $20,000 and validated against eligible paid direct materials/labor and reimbursement gates."
]
}
]
},
"testCaseInputHints": [
{
"inputKey": "award_decision_status",
"valueType": "enum",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Default to unknown or not_applied. Do not infer selected or awarded from eligibility."
},
{
"inputKey": "award_letter_awarded_amount_cents",
"valueType": "money_cents",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Only populate from official OER award letter or executed agreement. Do not default to 2000000."
},
{
"inputKey": "award_probability",
"valueType": "number",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "Leave null unless official success-rate evidence, budget-and-expected-awards evidence, or an explicitly approved human-reviewed prior exists."
},
{
"inputKey": "eligible_direct_material_labor_cost_cents",
"valueType": "money_cents",
"whoProvides": "quote",
"realisticDefaultGuidance": "Use direct project construction materials and labor only. Exclude audits, feasibility studies, ineligible costs, and costs incurred before OER reimbursement eligibility gates."
},
{
"inputKey": "total_project_cost_cents",
"valueType": "money_cents",
"whoProvides": "quote",
"realisticDefaultGuidance": "Use total project cost from vendor contract/application economics. Needed to validate 10% applicant contribution."
},
{
"inputKey": "applicant_contribution_cents",
"valueType": "money_cents",
"whoProvides": "user",
"realisticDefaultGuidance": "Must be at least 10% of total project cost. Treat missing or below-threshold contribution as blocking eligibility."
},
{
"inputKey": "other_committed_funding_cents",
"valueType": "money_cents",
"whoProvides": "accountant",
"realisticDefaultGuidance": "Use committed REAP, REF, EQIP, ITC, utility, or other funding documented in the application. Needed for zero-shortfall/full-funding validation."
},
{
"inputKey": "requested_grant_amount_cents",
"valueType": "money_cents",
"whoProvides": "application_status",
"realisticDefaultGuidance": "May be at most 2000000 cents, but it is only a request and must not be used as a user-facing estimate."
},
{
"inputKey": "measure_type",
"valueType": "enum",
"whoProvides": "quote",
"realisticDefaultGuidance": "Eligible listed measures include PV, small wind, biomass, energy storage, envelope insulation, LED lighting, HVAC, controls, variable speed motors/drives/pumps, and solar thermal; unlisted measures require OER preapproval."
},
{
"inputKey": "agricultural_energy_audit_status",
"valueType": "enum",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Use completed, scheduled/initiated, or OER-waived. Missing audit status blocks eligibility validation."
},
{
"inputKey": "project_completed_or_interconnected_before_application",
"valueType": "boolean",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "Must be false. Completed or already interconnected projects are ineligible."
},
{
"inputKey": "uses_renewable_energy_growth_program",
"valueType": "boolean",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "Must be false for renewable energy projects because REG projects are ineligible for this RGGI-funded grant."
},
{
"inputKey": "oer_executed_contract_or_mou_status",
"valueType": "enum",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Required before treating costs as reimbursable or award funds as payable."
},
{
"inputKey": "paid_invoice_documentation_status",
"valueType": "enum",
"whoProvides": "quote",
"realisticDefaultGuidance": "Initial 50% payment requires documentation of materials purchased and paid; final 50% requires completion documentation and paid or zero-balance invoice."
},
{
"inputKey": "post_installation_inspection_status",
"valueType": "enum",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Final payment should remain blocked until OER or designee inspection is passed."
}
],
"remainingGaps": [
"No official applications-submitted count or historical success rate was found.",
"No official current 2026 round budget was found.",
"No official expected number of 2026 awards was found.",
"Official sources provide awarded-project history only, which is insufficient for probability_discount.",
"Exact project award amount is discretionary and requires an official OER award letter or executed agreement.",
"No official source supports calculating a default grant as 90% of eligible project cost; the 10% applicant contribution is an eligibility/cost-share requirement, not an automatic award rate."
],
"doNotUseAsUserFacingEstimateReasons": [
"Grant source says up to $20,000, not a fixed $20,000 award.",
"Award is competitive and ranked from highest to lowest scoring projects.",
"Application, site visit, and eligibility do not guarantee award.",
"Funding is subject to availability and OER sole discretion.",
"No defensible award probability or success-rate denominator was found.",
"Project-specific official award amount is required before a conditional cash value can be calculated.",
"Applicant request amount is not an award amount.",
"A 90% of cost calculation would overstate the source because official materials only require at least 10% applicant contribution.",
"Do not apply the prior probability suggestion without explicit human approval.",
"Reimbursement depends on executed OER agreement, paid-cost documentation, eligible direct costs, post-installation inspection, and interconnection for renewable projects."
]
}

[1]: https://energy.ri.gov/energy-efficiency/farm-energy-programs "Energy Efficiency And Renewable Energy Programs For Farms | Rhode Island Office of Energy Resources"
[2]: https://energy.ri.gov/energy-efficiency/farm-energy-programs/farm-energy-program-dashboard "RI Agricultural Energy Program Dashboard | Rhode Island Office of Energy Resources"
[3]: https://dem.ri.gov/agriculture/financial-assistance/farm-energy-program "RI Agricultural Energy Program | Rhode Island Department of Environmental Management"
[4]: https://energy.ri.gov/energy-efficiency/farm-energy-programs/agricultural-clean-energy-technical-assistance-program-ace-0 "Agricultural Energy Audits: RI Agricultural Clean Energy Technical Assistance Program (ACE TAP) | Rhode Island Office of Energy Resources"

