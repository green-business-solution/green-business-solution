{
"schemaVersion": "retrofi_grant_package_repair.v1",
"researchedAt": "2026-07-03",
"opportunityId": "SOURCE_DSIRE:dsire_program_id:1528",
"programName": "Otter Tail Power Company - Commercial & Industrial Energy Efficiency Grant Program",
"status": "needs_project_inputs",
"sourceConfidence": "high",
"estimateConfidenceIfInputsPresent": "high",
"officialSources": [
{
"title": "Custom efficiency grants",
"url": "[https://www.otpco.com/rebates-and-efficiency-programs/programs/custom-grants/](https://www.otpco.com/rebates-and-efficiency-programs/programs/custom-grants/)",
"owner": "Otter Tail Power Company",
"accessed": "2026-07-03",
"evidenceText": "Official Otter Tail page says customers may submit a custom energy-savings proposal and receive funds. It requires working with an Energy Management Representative, a custom proposal, a timeline showing completion within six months of approval, and measurement and verification for certain projects. It states grant amounts are calculated based on kilowatt-hours saved, kilowatts of demand reduced, and project costs, and grants will not exceed 75% of project costs or 90% of incremental costs; other caps may apply. ([Otter Tail Power Company][1])"
},
{
"title": "Find Your Savings | Business Programs",
"url": "[https://www.otpco.com/rebates-and-efficiency-programs/business/programs/](https://www.otpco.com/rebates-and-efficiency-programs/business/programs/)",
"owner": "Otter Tail Power Company",
"accessed": "2026-07-03",
"evidenceText": "Official Otter Tail business programs page lists Custom efficiency grants as a business program and describes the program as proposing an energy-savings project for possible funding. ([Otter Tail Power Company][2])"
},
{
"title": "Applying for a rebate",
"url": "[https://www.otpco.com/rebates-and-efficiency-programs/find/apply-for-a-rebate/](https://www.otpco.com/rebates-and-efficiency-programs/find/apply-for-a-rebate/)",
"owner": "Otter Tail Power Company",
"accessed": "2026-07-03",
"evidenceText": "Official Otter Tail rebate application guidance says energy control projects totaling $10,000 or more require preapproval and may be evaluated for a custom rebate amount. It also states rebates will not exceed 75% of project costs and that rebate and incentive programs are subject to funding limitations and may change without notice. ([Otter Tail Power Company][3])"
},
{
"title": "2026 Programs and Services Guide for Contractors",
"url": "[https://www.otpco.com/media/ji0jz3i4/2026-programs-and-services-guide-for-contractors.pdf](https://www.otpco.com/media/ji0jz3i4/2026-programs-and-services-guide-for-contractors.pdf)",
"owner": "Otter Tail Power Company",
"accessed": "2026-07-03",
"evidenceText": "Official Otter Tail 2026 contractor guide materials identify custom efficiency project grants for eligible commercial and industrial projects, including heat-recovery systems, and describe the custom grant calculation basis as kilowatt-hours saved, kilowatts of demand reduced, and project costs, with documentation required before approval. ([Otter Tail Power Company][4])"
},
{
"title": "2026 MN Customer Rebate Application",
"url": "[https://www.otpco.com/media/fspbkton/mn-customer-rebate-application-form-3053_2026-fillable.pdf](https://www.otpco.com/media/fspbkton/mn-customer-rebate-application-form-3053_2026-fillable.pdf)",
"owner": "Otter Tail Power Company",
"accessed": "2026-07-03",
"evidenceText": "Official Otter Tail 2026 Minnesota customer rebate application says equipment must be installed where electricity is supplied by Otter Tail Power, acceptance does not guarantee payment, requests may require review, incomplete applications can block payment, and Otter Tail may deny rebates or discontinue or modify programs at any time. "
},
{
"title": "2024 Status Report for South Dakota Energy Efficiency Partnership Plan",
"url": "[https://puc.sd.gov/commission/dockets/electric/2025/EL25-021/2024StatusReport.pdf](https://puc.sd.gov/commission/dockets/electric/2025/EL25-021/2024StatusReport.pdf)",
"owner": "South Dakota Public Utilities Commission / Otter Tail Power Company",
"accessed": "2026-07-03",
"evidenceText": "Official South Dakota filing describes Otter Tail's Custom Energy Efficiency Project as paying incentives to commercial and industrial customers for energy-saving installations not incentivized through prescriptive programs. It also reports limited state-specific 2024 participation and explains that Otter Tail often works with internal or third-party engineers to determine or verify savings. This is useful program evidence but not sufficient to calculate a current project approval probability. "
}
],
"sourceSummary": "Repair is based on the uploaded package context  and current official Otter Tail or administrator materials. The public sources support an active custom efficiency grant workflow for commercial and industrial energy-efficiency projects, including heat-recovery-type measures, but they do not publish a reusable per-kWh, per-kW, or rate-table formula. The only defensible runtime calculation is after Otter Tail has issued a project-specific approved grant amount: apply the public cost caps to that approved amount and suppress otherwise. ([Otter Tail Power Company][1])",
"packagePatch": {
"calculation_status": "calculable_with_missing_inputs",
"availability": {
"status": "active",
"fundingStatus": "unknown"
},
"input_requirements_to_add_or_update": [
{
"input_key": "otter_tail_account_number",
"label": "Otter Tail Power account number",
"value_type": "text",
"required_for": [
"effect_one_time_savings_1_5eb511fe0f127e08"
],
"source_precedence": [
"bill",
"user_profile",
"program_application",
"utility_data"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "service_address_served_by_otter_tail_power",
"label": "service address is supplied electricity by Otter Tail Power",
"value_type": "boolean",
"required_for": [
"effect_one_time_savings_1_5eb511fe0f127e08"
],
"source_precedence": [
"bill",
"utility_data",
"server_derived",
"admin_review"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "commercial_or_industrial_customer",
"label": "commercial or industrial customer status",
"value_type": "boolean",
"required_for": [
"effect_one_time_savings_1_5eb511fe0f127e08"
],
"source_precedence": [
"bill",
"user_profile",
"program_application",
"utility_data"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "project_state",
"label": "project state in Otter Tail service territory",
"value_type": "enum",
"allowed_values": [
"Minnesota",
"South Dakota",
"North Dakota"
],
"required_for": [
"effect_one_time_savings_1_5eb511fe0f127e08"
],
"source_precedence": [
"server_derived",
"bill",
"user_profile",
"admin_review"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "custom_energy_savings_proposal",
"label": "custom energy-savings proposal",
"value_type": "text",
"required_for": [
"effect_one_time_savings_1_5eb511fe0f127e08"
],
"source_precedence": [
"quote",
"retrofit_assumptions",
"program_application",
"admin_review"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "selected_measure_scope",
"label": "custom measure scope",
"value_type": "text",
"required_for": [
"effect_one_time_savings_1_5eb511fe0f127e08"
],
"source_precedence": [
"quote",
"retrofit_assumptions",
"program_application",
"admin_review"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "estimated_annual_kwh_saved",
"label": "estimated annual kWh saved",
"value_type": "number",
"required_for": [
"effect_one_time_savings_1_5eb511fe0f127e08"
],
"source_precedence": [
"quote",
"utility_data",
"engineering_review",
"admin_review"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "estimated_kw_demand_reduction",
"label": "estimated kW demand reduction",
"value_type": "number",
"required_for": [
"effect_one_time_savings_1_5eb511fe0f127e08"
],
"source_precedence": [
"quote",
"utility_data",
"engineering_review",
"admin_review"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "project_cost_cents",
"label": "total project cost in cents",
"value_type": "money_cents",
"required_for": [
"effect_one_time_savings_1_5eb511fe0f127e08"
],
"source_precedence": [
"quote",
"invoice",
"program_application",
"admin_review"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "incremental_cost_cents",
"label": "incremental cost in cents",
"value_type": "money_cents",
"required_for": [
"effect_one_time_savings_1_5eb511fe0f127e08"
],
"source_precedence": [
"quote",
"invoice",
"engineering_review",
"program_application",
"admin_review"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "project_completion_timeline_months",
"label": "project completion timeline after approval in months",
"value_type": "number",
"required_for": [
"effect_one_time_savings_1_5eb511fe0f127e08"
],
"source_precedence": [
"quote",
"program_application",
"admin_review"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "preapproval_status",
"label": "Otter Tail preapproval status before purchase or installation",
"value_type": "enum",
"allowed_values": [
"not_started",
"submitted",
"approved",
"denied",
"unknown"
],
"required_for": [
"effect_one_time_savings_1_5eb511fe0f127e08"
],
"source_precedence": [
"program_application",
"utility_data",
"admin_review"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "approved_grant_amount_cents",
"label": "Otter Tail approved custom grant amount in cents",
"value_type": "money_cents",
"required_for": [
"effect_one_time_savings_1_5eb511fe0f127e08"
],
"source_precedence": [
"program_application",
"utility_data",
"admin_review",
"quote"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "funding_available_confirmed",
"label": "current program funding availability confirmed for project",
"value_type": "boolean",
"required_for": [
"effect_one_time_savings_1_5eb511fe0f127e08"
],
"source_precedence": [
"admin_review",
"program_application",
"utility_data"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "measurement_and_verification_required",
"label": "measurement and verification required by Otter Tail",
"value_type": "boolean",
"required_for": [
"effect_one_time_savings_1_5eb511fe0f127e08"
],
"source_precedence": [
"admin_review",
"program_application",
"utility_data"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "measurement_and_verification_completed",
"label": "measurement and verification completed if required",
"value_type": "boolean",
"required_for": [
"effect_one_time_savings_1_5eb511fe0f127e08"
],
"source_precedence": [
"admin_review",
"program_application",
"utility_data",
"quote"
],
"missing_severity": "blocks_calculation_when_required"
},
{
"input_key": "final_application_or_payment_approval_status",
"label": "final application or payment approval status",
"value_type": "enum",
"allowed_values": [
"not_submitted",
"submitted",
"approved",
"paid",
"denied",
"unknown"
],
"required_for": [
"effect_one_time_savings_1_5eb511fe0f127e08"
],
"source_precedence": [
"program_application",
"utility_data",
"admin_review"
],
"missing_severity": "blocks_user_facing_total"
}
],
"effects_to_add_or_update": [
{
"effect_id": "effect_one_time_savings_1_5eb511fe0f127e08",
"effect_type": "one_time_savings",
"cash_value_classification": "cash_grant",
"value_model_kind": "formula_grant",
"calculation": {
"method": "custom_quote",
"amount_cents": null,
"percent": null,
"conditional_award_cents": null,
"conditional_award_formula": "Calculate only after Otter Tail has issued a project-specific approved grant amount and current funding is confirmed: conditional_award_cents = min(approved_grant_amount_cents, floor(project_cost_cents * 0.75), floor(incremental_cost_cents * 0.90)). Do not infer approved_grant_amount_cents from estimated_annual_kwh_saved, estimated_kw_demand_reduction, or project_cost_cents because no public per-kWh, per-kW, or rate-table formula was found.",
"max_award_cents": null,
"min_award_cents": null,
"rate_rows": [
{
"row_type": "cap",
"basis": "project_cost_cents",
"max_percent": 0.75,
"source": "Otter Tail custom efficiency grants page"
},
{
"row_type": "cap",
"basis": "incremental_cost_cents",
"max_percent": 0.9,
"source": "Otter Tail custom efficiency grants page"
}
],
"probability_discount": null,
"probability_evidence_type": "first_come_funding_unknown"
},
"required_inputs": [
"otter_tail_account_number",
"service_address_served_by_otter_tail_power",
"commercial_or_industrial_customer",
"project_state",
"custom_energy_savings_proposal",
"selected_measure_scope",
"estimated_annual_kwh_saved",
"estimated_kw_demand_reduction",
"project_cost_cents",
"incremental_cost_cents",
"project_completion_timeline_months",
"preapproval_status",
"approved_grant_amount_cents",
"funding_available_confirmed",
"measurement_and_verification_required",
"measurement_and_verification_completed",
"final_application_or_payment_approval_status"
],
"missing_input_behavior": "suppress_until_review",
"includedInUserFacingTotalDefault": false,
"humanReviewRequired": true,
"reasonCodes": [
"custom_grant_requires_utility_preapproval",
"approved_grant_amount_required",
"no_public_rate_table",
"do_not_use_caps_as_estimate",
"funding_status_not_verified",
"final_approval_required",
"measurement_and_verification_may_apply",
"utility_service_territory_required",
"exclude_from_user_facing_total_until_approved"
],
"calculationTrace": [
"Official Otter Tail custom grant materials require coordination with an Energy Management Representative and state that preapproval requires a custom proposal, timeline, and measurement and verification for certain projects. ([Otter Tail Power Company][1])",
"Official Otter Tail materials state the grant amount is based on kilowatt-hours saved, kilowatts of demand reduced, and project costs, but public materials do not disclose a per-kWh, per-kW, or reusable rate-table formula. ([Otter Tail Power Company][1])",
"The only public numeric caps found are that grants will not exceed 75% of project costs or 90% of incremental costs, with other caps possible. These caps are ceilings, not award estimates. ([Otter Tail Power Company][1])",
"Official 2026 guide materials identify heat-recovery systems as an eligible custom efficiency project type and require thorough documentation before approval. ([Otter Tail Power Company][4])",
"Official application and rebate guidance says acceptance does not guarantee payment, requests may require review, incomplete applications block payment, and programs may be denied, discontinued, modified, or limited by funding. ",
"A South Dakota official filing gives state-specific 2024 participation information and confirms engineering review of custom savings, but it is not adequate probability evidence for a current project-level expected value. "
]
}
]
},
"testCaseInputHints": [
{
"inputKey": "service_address_served_by_otter_tail_power",
"valueType": "boolean",
"whoProvides": "bill",
"realisticDefaultGuidance": "Set true only when an Otter Tail electric account or utility-territory lookup confirms the service address is supplied by Otter Tail Power."
},
{
"inputKey": "commercial_or_industrial_customer",
"valueType": "boolean",
"whoProvides": "bill",
"realisticDefaultGuidance": "Set true only when the customer class or account type confirms commercial or industrial service."
},
{
"inputKey": "project_state",
"valueType": "enum",
"whoProvides": "server_derived",
"realisticDefaultGuidance": "Use the service address state, then confirm program applicability for the account before calculation."
},
{
"inputKey": "custom_energy_savings_proposal",
"valueType": "text",
"whoProvides": "quote",
"realisticDefaultGuidance": "Use the proposal submitted to or prepared with Otter Tail; do not substitute a generic retrofit description."
},
{
"inputKey": "selected_measure_scope",
"valueType": "text",
"whoProvides": "quote",
"realisticDefaultGuidance": "Describe the specific custom measure, such as heat-recovery system, process improvement, chiller upgrade, or compressed-air measure."
},
{
"inputKey": "estimated_annual_kwh_saved",
"valueType": "number",
"whoProvides": "quote",
"realisticDefaultGuidance": "Use engineer, vendor, or utility-reviewed annual kWh savings from the custom proposal."
},
{
"inputKey": "estimated_kw_demand_reduction",
"valueType": "number",
"whoProvides": "quote",
"realisticDefaultGuidance": "Use engineer, vendor, or utility-reviewed peak demand reduction from the custom proposal."
},
{
"inputKey": "project_cost_cents",
"valueType": "money_cents",
"whoProvides": "quote",
"realisticDefaultGuidance": "Use total eligible project cost from the quote, invoice, or Otter Tail-reviewed application."
},
{
"inputKey": "incremental_cost_cents",
"valueType": "money_cents",
"whoProvides": "quote",
"realisticDefaultGuidance": "Use Otter Tail-reviewed incremental cost; required because the official cap includes 90% of incremental cost."
},
{
"inputKey": "project_completion_timeline_months",
"valueType": "number",
"whoProvides": "quote",
"realisticDefaultGuidance": "Use the proposal timeline; public materials indicate completion should be within six months of approval."
},
{
"inputKey": "preapproval_status",
"valueType": "enum",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Do not calculate unless status is approved before purchase or installation where required."
},
{
"inputKey": "approved_grant_amount_cents",
"valueType": "money_cents",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Use only an Otter Tail-approved grant amount from a preapproval, award, or application approval; do not estimate from public caps."
},
{
"inputKey": "funding_available_confirmed",
"valueType": "boolean",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "Set true only when Otter Tail or the current approval confirms funds are available for the project."
},
{
"inputKey": "measurement_and_verification_required",
"valueType": "boolean",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "Set based on Otter Tail review or approval terms."
},
{
"inputKey": "measurement_and_verification_completed",
"valueType": "boolean",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Required only when Otter Tail requires measurement and verification; otherwise it may be false without blocking."
},
{
"inputKey": "final_application_or_payment_approval_status",
"valueType": "enum",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Include in user-facing totals only when final status is approved or paid; submitted or accepted is not enough."
}
],
"remainingGaps": [
"No public per-kWh, per-kW, or reusable custom grant rate table was found.",
"No public maximum dollar award was found; the public 75% and 90% figures are caps only.",
"Current remaining funding status was not found. Official materials say rebate and incentive programs are subject to funding limitations and may change without notice.",
"Project-specific approval is required before the grant value is known; Otter Tail may require engineering review and measurement and verification.",
"State-specific applicability should be confirmed from the customer account or Otter Tail review before runtime calculation.",
"Official South Dakota historical participation data is too limited and state-specific to support a probability discount for current projects."
],
"doNotUseAsUserFacingEstimateReasons": [
"Only caps and custom-review factors are public; caps are not expected award amounts.",
"No public formula converts kWh savings, kW reduction, or project cost into an award amount.",
"The project requires Otter Tail preapproval and project-specific review before an approved amount exists.",
"Funding availability is not publicly confirmed for a specific project.",
"Final payment can still be blocked by application review, incomplete documentation, eligibility review, or measurement and verification requirements.",
"Do not create an expected value from historical South Dakota participation data; it is not adequate current project-level probability evidence."
]
}

[1]: https://www.otpco.com/rebates-and-efficiency-programs/programs/custom-grants/ "Custom efficiency grants | Otter Tail Power Company"
[2]: https://www.otpco.com/rebates-and-efficiency-programs/business/programs/ "Find Your Savings | Otter Tail Power Company"
[3]: https://www.otpco.com/rebates-and-efficiency-programs/find/apply-for-a-rebate/ "Applying for a rebate | Otter Tail Power Company"
[4]: https://www.otpco.com/media/ji0jz3i4/2026-programs-and-services-guide-for-contractors.pdf?utm_source=chatgpt.com "2026 REBATES"

