{
"schemaVersion": "retrofi_grant_package_repair.v1",
"researchedAt": "2026-07-03",
"opportunityId": "SOURCE_DSIRE:dsire_program_id:1774",
"programName": "City of Tallahassee Utilities - Grant Programs",
"status": "needs_project_inputs",
"sourceConfidence": "high",
"estimateConfidenceIfInputsPresent": "high",
"officialSources": [
{
"title": "Ceiling Insulation Grant",
"url": "[https://www.talgov.com/you/you-products-home-ceiling-insulation](https://www.talgov.com/you/you-products-home-ceiling-insulation)",
"owner": "City of Tallahassee Utilities",
"accessed": "2026-07-03",
"evidenceText": "Official administrator page says customers must request a Free Home Energy Audit to begin; standard grant pays 80% of installed cost up to $400; low-income grant pays 100% of installed cost up to $500; total installed cost must be at least $500; audit before installation and approved contractors are required; new construction is excluded; incentive dollars are not paid directly to the account holder. ([Tallahassee][1])"
},
{
"title": "Ceiling Insulation Grant Program Brochure",
"url": "[https://www.talgov.com/Uploads/Public/Documents/you/ceiling-insulation.pdf](https://www.talgov.com/Uploads/Public/Documents/you/ceiling-insulation.pdf)",
"owner": "City of Tallahassee Utilities",
"accessed": "2026-07-03",
"evidenceText": "Official brochure revised February 6, 2025 states the income-based grant pays 100% up to $500 and the 80% grant pays 80% up to $400, each calculated at $0.05 per R-value per square foot; target level is R-38, or R-49 if heated with electric resistance; auditor determines existing insulation, square footage, and R-value to add; all participating contractors install blown fiberglass or loose-fill cellulose at $0.05 per R-value per square foot. "
},
{
"title": "Free Home Energy Audit",
"url": "[https://www.talgov.com/you/you-products-home-energy-audit](https://www.talgov.com/you/you-products-home-energy-audit)",
"owner": "City of Tallahassee Utilities",
"accessed": "2026-07-03",
"evidenceText": "Official administrator page says a free home energy audit is a necessary first step for some City products and services, including ceiling insulation grants, and that residential electric and/or natural gas customers may participate in the audit program. ([Tallahassee][2])"
},
{
"title": "Qualifying Income Levels for Income-based Programs",
"url": "[https://www.talgov.com/you/you-income-levels](https://www.talgov.com/you/you-income-levels)",
"owner": "City of Tallahassee Utilities",
"accessed": "2026-07-03",
"evidenceText": "Official administrator page says income-based products and services are available based on number of dependents and adjusted gross income, with income thresholds listed as of June 2025. ([Tallahassee][3])"
},
{
"title": "Utility Documents, Reports & Forms",
"url": "[https://www.talgov.com/you/documents](https://www.talgov.com/you/documents)",
"owner": "City of Tallahassee Utilities",
"accessed": "2026-07-03",
"evidenceText": "Official administrator document index lists the Ceiling insulation grant program brochure as a current utility document dated 3/25. ([Tallahassee][4])"
}
],
"sourceSummary": "The ceiling-insulation portion of the City of Tallahassee Utilities grant program is formula-based after eligibility, City energy-audit, agreement, qualified-contractor, material, and funding gates are satisfied. It should remain calculable only with missing inputs, not included in default user-facing totals. Prompt context reviewed from uploaded file. ",
"packagePatch": {
"calculation_status": "calculable_with_missing_inputs",
"availability": {
"status": "active",
"fundingStatus": "unknown"
},
"input_requirements_to_add_or_update": [
{
"input_key": "city_tallahassee_electric_customer",
"label": "City of Tallahassee electric customer",
"value_type": "boolean",
"required_for": [
"effect_one_time_savings_1_6485f6750d0228c1"
],
"source_precedence": [
"utility_data",
"user_profile",
"application_status"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "premises_has_suitable_attic",
"label": "premises has suitable attic",
"value_type": "boolean",
"required_for": [
"effect_one_time_savings_1_6485f6750d0228c1"
],
"source_precedence": [
"application_status",
"audit_result",
"user_profile"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "residence_structure_type",
"label": "residence structure type",
"value_type": "enum",
"valid_values": [
"detached",
"duplex",
"triplex",
"quadruplex",
"other"
],
"required_for": [
"effect_one_time_savings_1_6485f6750d0228c1"
],
"source_precedence": [
"user_profile",
"application_status",
"audit_result"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "is_new_construction",
"label": "new construction flag",
"value_type": "boolean",
"required_for": [
"effect_one_time_savings_1_6485f6750d0228c1"
],
"source_precedence": [
"user_profile",
"application_status",
"audit_result"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "city_energy_audit_completed_before_installation",
"label": "City energy audit completed before installation",
"value_type": "boolean",
"required_for": [
"effect_one_time_savings_1_6485f6750d0228c1"
],
"source_precedence": [
"application_status",
"audit_result"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "audit_recommended_ceiling_insulation",
"label": "audit recommended eligible ceiling insulation",
"value_type": "boolean",
"required_for": [
"effect_one_time_savings_1_6485f6750d0228c1"
],
"source_precedence": [
"audit_result",
"application_status"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "applicant_tier",
"label": "grant tier determined by City",
"value_type": "enum",
"valid_values": [
"standard",
"income_based"
],
"aliases": [
"standard_or_low_income_grant_tier",
"grant_tier"
],
"required_for": [
"effect_one_time_savings_1_6485f6750d0228c1"
],
"source_precedence": [
"application_status",
"audit_result",
"user_profile"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "income_based_eligibility_confirmed_by_city",
"label": "income-based eligibility confirmed by City",
"value_type": "boolean",
"required_when": {
"applicant_tier": "income_based"
},
"required_for": [
"effect_one_time_savings_1_6485f6750d0228c1"
],
"source_precedence": [
"application_status",
"audit_result"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "heating_system_type",
"label": "heating system type",
"value_type": "enum",
"valid_values": [
"natural_gas_furnace",
"oil_furnace",
"electric_heat_pump",
"central_electric_resistance_furnace",
"other"
],
"required_for": [
"effect_one_time_savings_1_6485f6750d0228c1"
],
"source_precedence": [
"audit_result",
"user_profile"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "target_r_value",
"label": "target R-value after installation",
"value_type": "enum",
"valid_values": [
"R38",
"R49"
],
"required_for": [
"effect_one_time_savings_1_6485f6750d0228c1"
],
"source_precedence": [
"audit_result",
"retrofit_assumptions"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "city_auditor_calculated_job_cost_cents",
"label": "City auditor calculated installed job cost",
"value_type": "money_cents",
"aliases": [
"installed_insulation_cost",
"installed_cost",
"total_installed_cost_cents"
],
"required_for": [
"effect_one_time_savings_1_6485f6750d0228c1"
],
"alternative_input_group": "eligible_cost_basis",
"source_precedence": [
"audit_result",
"application_status",
"quote"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "attic_square_feet",
"label": "auditor-determined attic square footage",
"value_type": "number",
"required_for": [
"effect_one_time_savings_1_6485f6750d0228c1"
],
"alternative_input_group": "eligible_cost_basis",
"source_precedence": [
"audit_result"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "r_value_to_add",
"label": "auditor-determined R-value to be added",
"value_type": "number",
"required_for": [
"effect_one_time_savings_1_6485f6750d0228c1"
],
"alternative_input_group": "eligible_cost_basis",
"source_precedence": [
"audit_result"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "total_installed_cost_at_least_500",
"label": "total installed cost is at least $500",
"value_type": "boolean",
"required_for": [
"effect_one_time_savings_1_6485f6750d0228c1"
],
"source_precedence": [
"audit_result",
"application_status",
"quote"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "qualified_contractor_selected",
"label": "qualified participating contractor selected",
"value_type": "boolean",
"required_for": [
"effect_one_time_savings_1_6485f6750d0228c1"
],
"source_precedence": [
"application_status",
"quote",
"audit_result"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "eligible_insulation_material",
"label": "eligible insulation material",
"value_type": "enum",
"valid_values": [
"blown_fiberglass",
"loose_fill_cellulose"
],
"required_for": [
"effect_one_time_savings_1_6485f6750d0228c1"
],
"source_precedence": [
"quote",
"audit_result",
"application_status"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "city_agreement_form_signed_before_installation",
"label": "City digital agreement form signed before contractor installation",
"value_type": "boolean",
"required_for": [
"effect_one_time_savings_1_6485f6750d0228c1"
],
"source_precedence": [
"application_status"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "program_funding_available_confirmed",
"label": "program funding availability confirmed",
"value_type": "boolean",
"required_for": [
"effect_one_time_savings_1_6485f6750d0228c1"
],
"source_precedence": [
"admin_research",
"application_status"
],
"missing_severity": "blocks_user_facing_estimate"
}
],
"effects_to_add_or_update": [
{
"effect_id": "effect_one_time_savings_1_6485f6750d0228c1",
"effect_type": "one_time_savings",
"cash_value_classification": "cash_grant",
"value_model_kind": "capped_percent_of_eligible_cost",
"calculation": {
"method": "rate_table",
"amount_cents": null,
"percent": null,
"conditional_award_cents": null,
"conditional_award_formula": "If all eligibility gates are true and program_funding_available_confirmed is true, determine eligible_installed_cost_cents as city_auditor_calculated_job_cost_cents when available; otherwise calculate eligible_installed_cost_cents = round(5 * attic_square_feet * r_value_to_add), because the official brochure states $0.05 per R-value per square foot. If eligible_installed_cost_cents < 50000 or total_installed_cost_at_least_500 is not true, award = 0. If applicant_tier = standard, award_cents = min(round(0.80 * eligible_installed_cost_cents), 40000). If applicant_tier = income_based and income_based_eligibility_confirmed_by_city is true, award_cents = min(eligible_installed_cost_cents, 50000). Do not calculate before the City energy audit, City agreement, qualified contractor, eligible material, and funding confirmation inputs are present.",
"max_award_cents": 50000,
"min_award_cents": null,
"rate_rows": [
{
"applicant_tier": "standard",
"percent_of_eligible_installed_cost": 0.8,
"max_award_cents": 40000,
"minimum_total_installed_cost_cents": 50000,
"contractor_rate_cents_per_r_value_square_foot": 5,
"eligible_materials": [
"blown_fiberglass",
"loose_fill_cellulose"
],
"target_r_value_rule": "R38 unless residence is heated with central electric resistance furnace, then R49"
},
{
"applicant_tier": "income_based",
"percent_of_eligible_installed_cost": 1,
"max_award_cents": 50000,
"minimum_total_installed_cost_cents": 50000,
"contractor_rate_cents_per_r_value_square_foot": 5,
"eligible_materials": [
"blown_fiberglass",
"loose_fill_cellulose"
],
"target_r_value_rule": "R38 unless residence is heated with central electric resistance furnace, then R49"
}
],
"probability_discount": null,
"probability_evidence_type": "not_required"
},
"required_inputs": [
"city_tallahassee_electric_customer",
"premises_has_suitable_attic",
"residence_structure_type",
"is_new_construction",
"city_energy_audit_completed_before_installation",
"audit_recommended_ceiling_insulation",
"applicant_tier",
"income_based_eligibility_confirmed_by_city_if_income_based",
"heating_system_type",
"target_r_value",
"eligible_cost_basis_city_auditor_calculated_job_cost_cents_or_attic_square_feet_plus_r_value_to_add",
"total_installed_cost_at_least_500",
"qualified_contractor_selected",
"eligible_insulation_material",
"city_agreement_form_signed_before_installation",
"program_funding_available_confirmed"
],
"missing_input_behavior": "calculate_when_present",
"includedInUserFacingTotalDefault": false,
"humanReviewRequired": false,
"reasonCodes": [
"official_formula_percent_with_cap",
"deterministic_after_eligibility_approval_and_funding",
"city_energy_audit_required_before_installation",
"qualified_contractor_required",
"eligible_material_required",
"city_agreement_required_before_installation",
"installed_cost_or_audit_cost_basis_required",
"minimum_installed_cost_500_required",
"applicant_tier_required",
"income_based_eligibility_city_determined",
"funding_status_not_confirmed",
"not_paid_directly_to_account_holder",
"exclude_from_user_facing_total_until_inputs_and_funding_confirmed"
],
"calculationTrace": [
"Ceiling insulation official page: standard grant pays 80% of installed cost up to $400.",
"Ceiling insulation official page: low-income grant pays 100% of installed cost up to $500.",
"Ceiling insulation official page: total installed cost must be at least $500.",
"Official brochure: installed cost is calculated at $0.05 per R-value per square foot, using auditor-determined square footage and R-value to add.",
"Official brochure: target insulation is R-38, or R-49 if the residence is heated with electric resistance.",
"Official sources require City energy audit before installation and use of qualified or approved participating contractors.",
"Because official sources do not state current open funding or budget, the package must not be included in user-facing totals until funding is confirmed."
]
}
]
},
"testCaseInputHints": [
{
"inputKey": "city_tallahassee_electric_customer",
"valueType": "boolean",
"whoProvides": "bill",
"realisticDefaultGuidance": "true only when the utility account confirms City of Tallahassee electric service."
},
{
"inputKey": "city_energy_audit_completed_before_installation",
"valueType": "boolean",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Must be true; the official workflow begins with a Free Home Energy Audit."
},
{
"inputKey": "audit_recommended_ceiling_insulation",
"valueType": "boolean",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Must be true based on City auditor result."
},
{
"inputKey": "applicant_tier",
"valueType": "enum",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Use standard for the 80% up to $400 tier; use income_based only when City-determined income qualification is confirmed."
},
{
"inputKey": "city_auditor_calculated_job_cost_cents",
"valueType": "money_cents",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Use the City auditor's calculated job cost or agreement amount. Must be at least 50000 cents to qualify."
},
{
"inputKey": "attic_square_feet",
"valueType": "number",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Use only auditor-determined attic square footage. Example: 1000."
},
{
"inputKey": "r_value_to_add",
"valueType": "number",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Use only auditor-determined R-value to add. Example: 10, which with 1000 square feet yields 50000 cents at 5 cents per R-value-square-foot."
},
{
"inputKey": "qualified_contractor_selected",
"valueType": "boolean",
"whoProvides": "quote",
"realisticDefaultGuidance": "Must be true and tied to a City-qualified participating insulation contractor."
},
{
"inputKey": "eligible_insulation_material",
"valueType": "enum",
"whoProvides": "quote",
"realisticDefaultGuidance": "Use blown_fiberglass or loose_fill_cellulose only."
},
{
"inputKey": "program_funding_available_confirmed",
"valueType": "boolean",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "Do not default to true. Confirm via current City utility account workflow or administrator contact before user-facing inclusion."
}
],
"remainingGaps": [
"Official pages found do not state a current program budget, open-funds confirmation, waitlist status, or exhaustion status.",
"Official sources state incentive dollars are not paid directly to the account holder, so user-facing presentation should describe this as a City contribution or co-pay to project cost rather than a cash reimbursement.",
"The low-income tier depends on City-determined income eligibility; public AGI thresholds exist, but runtime should prefer application_status or audit_result confirmation.",
"The broader City Energy Retrofit Grants page states only up to $500 for certain HVAC and hot-water leak repairs, based on auditor recommendation; this repair patch does not model that separate max-only grant as an insulation value."
],
"doNotUseAsUserFacingEstimateReasons": [
"Funding status is not explicitly confirmed as open funds available in the official sources reviewed.",
"City home energy audit must occur before installation.",
"City agreement form and qualified participating contractor are required before installation.",
"The project must satisfy City-determined attic, R-value, material, structure-type, and minimum-cost requirements.",
"Applicant tier and income-based eligibility, if applicable, must be confirmed before calculating.",
"Award is a contribution to project cost and is not paid directly to the utility account holder."
]
}

[1]: https://www.talgov.com/you/you-products-home-ceiling-insulation "
    Ceiling Insulation Grant | City of Tallahassee Utilities
"
[2]: https://www.talgov.com/you/you-products-home-energy-audit "
    Free Home Energy Audit | City of Tallahassee Utilities
"
[3]: https://www.talgov.com/you/you-income-levels "
    Qualifying Income Levels for Income-based Programs | City of Tallahassee Utilities
"
[4]: https://www.talgov.com/you/documents "
    Utility Documents, Reports & Forms | City of Tallahassee Utilities
"

