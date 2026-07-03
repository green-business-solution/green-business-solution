{
"schemaVersion": "retrofi_grant_package_repair.v1",
"researchedAt": "2026-07-03",
"opportunityId": "SOURCE_DSIRE:dsire_program_id:918",
"programName": "Office of Indian Energy Policy and Programs - Funding Opportunities",
"status": "suppress_no_probability_evidence",
"sourceConfidence": "high",
"estimateConfidenceIfInputsPresent": "low",
"officialSources": [
{
"title": "Office of Indian Energy Funding and Technical Assistance Opportunities",
"url": "[https://www.energy.gov/indianenergy/current-funding-and-technical-assistance-opportunities](https://www.energy.gov/indianenergy/current-funding-and-technical-assistance-opportunities)",
"owner": "U.S. Department of Energy, Office of Indian Energy Policy and Programs",
"accessed": "2026-07-03",
"evidenceText": "DOE states Indian Energy provides financial assistance on a competitive basis and lists Unleashing Tribal Energy Development as a $50 million opportunity with applications due July 24, 2026 at 5 p.m. ET. ([The Department of Energy's Energy.gov][1])"
},
{
"title": "IE-Exchange Funding Opportunity: DE-FOA-0003548 Unleashing Tribal Energy Development",
"url": "[https://ie-exchange.energy.gov/](https://ie-exchange.energy.gov/)",
"owner": "U.S. Department of Energy",
"accessed": "2026-07-03",
"evidenceText": "IE-Exchange identifies DE-FOA-0003548, the July 24, 2026 5 p.m. ET deadline, approximately $50 million available, and says DOE may issue awards in one, multiple, or none of the topic areas. ([IE-Exchange][2])"
},
{
"title": "DE-FOA-0003548 Unleashing Tribal Energy Development Notice of Funding Opportunity Part 1",
"url": "[https://ie-exchange.energy.gov/FileContent.aspx?FileID=f2dbd8e3-56bc-43bb-9883-2714b362940a](https://ie-exchange.energy.gov/FileContent.aspx?FileID=f2dbd8e3-56bc-43bb-9883-2714b362940a)",
"owner": "U.S. Department of Energy, Office of Indian Energy Policy and Programs",
"accessed": "2026-07-03",
"evidenceText": "NOFO Part 1 states expected total available funding is $50 million, identifies eligible applicant categories, gives the July 24, 2026 deadline, and sets topic caps and cost-share requirements: Topic 1 up to $7.5 million with 10% cost share; Topic 2 up to $1.5 million with 0% cost share; Topic 3 up to $2.5 million with 0% cost share. "
},
{
"title": "DE-FOA-0003548 Notice of Funding Opportunity Part 2",
"url": "[https://ie-exchange.energy.gov/FileContent.aspx?FileID=f779b27d-608e-4bec-bda5-ec243e59aaea](https://ie-exchange.energy.gov/FileContent.aspx?FileID=f779b27d-608e-4bec-bda5-ec243e59aaea)",
"owner": "U.S. Department of Energy",
"accessed": "2026-07-03",
"evidenceText": "NOFO Part 2 states selection for award negotiations is not a DOE commitment or guarantee of federal funding; no award is received until negotiations are complete and the Grants Officer executes the financial assistance award. "
},
{
"title": "Simpler.Grants.gov Opportunity Listing: Unleashing Tribal Energy Development",
"url": "[https://simpler.grants.gov/opportunity/118103c0-5a87-446a-a1a6-6c61906f1fd2](https://simpler.grants.gov/opportunity/118103c0-5a87-446a-a1a6-6c61906f1fd2)",
"owner": "Grants.gov",
"accessed": "2026-07-03",
"evidenceText": "The official Grants.gov listing shows $50,000,000 program funding, 40 expected awards, a $250,000 award minimum, a $7,500,000 award maximum, discretionary grant funding, and no cost sharing or matching requirement at the Grants.gov summary level. ([Simpler Grants][3])"
},
{
"title": "Technical Assistance for Tribal Energy Projects",
"url": "[https://www.energy.gov/indianenergy/technical-assistance-tribal-energy-projects](https://www.energy.gov/indianenergy/technical-assistance-tribal-energy-projects)",
"owner": "U.S. Department of Energy, Office of Indian Energy Policy and Programs",
"accessed": "2026-07-03",
"evidenceText": "DOE states technical assistance is provided at no cost, is evaluated based on requested scope and available budget, and is not direct funding to Tribes for CLDP technical assistance. ([The Department of Energy's Energy.gov][4])"
}
],
"sourceSummary": "As of 2026-07-03, the current cash opportunity is an active competitive DOE NOFO, not a deterministic rebate. Official sources support an open application deadline, $50 million total funding, 40 expected awards, topic-specific maximums, and topic-specific cost-share requirements, but they do not provide application volume or a defensible applicant-level success probability. The correct conservative treatment is to suppress automated expected value by default. Technical assistance remains a separate non-cash workflow and should not enter user-facing savings totals. Initial package context reviewed: ",
"packagePatch": {
"calculation_status": "no_calculable_value",
"availability": {
"status": "active",
"fundingStatus": "open_funds_available"
},
"input_requirements_to_add_or_update": [
{
"input_key": "eligible_applicant_entity_type",
"label": "Eligible applicant entity type",
"value_type": "enum",
"valid_values": [
"indian_tribe_including_alaska_native_regional_or_village_corporation",
"tribal_or_intertribal_organization",
"tribal_energy_development_organization",
"tribal_college_or_university"
],
"required_for": [
"effect_grant_expected_value_2_c767034e167ad0f6",
"effect_process_value_1_b76fbb43e2475d79"
],
"source_precedence": [
"user_profile",
"application_status",
"admin_research"
],
"missing_severity": "blocks_calculation",
"migration_note": "Use this structured enum instead of free-text eligible_tribal_or_alaska_native_entity where possible."
},
{
"input_key": "current_foa_topic_area",
"label": "DE-FOA-0003548 topic area",
"value_type": "enum",
"valid_values": [
"topic_area_1_tribal_community_energy_deployment_projects",
"topic_area_2_tribal_community_energy_project_planning_assessment_feasibility",
"topic_area_3_large_scale_planning_assessment_feasibility_for_tribal_energy_projects"
],
"required_for": [
"effect_grant_expected_value_2_c767034e167ad0f6"
],
"source_precedence": [
"application_status",
"quote",
"user_profile",
"admin_research"
],
"missing_severity": "blocks_conditional_cap_only",
"migration_note": "Replace current_foa_topic text input with this enum."
},
{
"input_key": "total_allowable_project_cost_cents",
"label": "Total allowable project cost",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_2_c767034e167ad0f6"
],
"source_precedence": [
"quote",
"application_status",
"admin_research"
],
"missing_severity": "blocks_conditional_cap_only",
"migration_note": "Replace eligible_project_budget text input with a money_cents value."
},
{
"input_key": "requested_federal_share_cents",
"label": "Requested DOE federal share",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_2_c767034e167ad0f6"
],
"source_precedence": [
"application_status",
"quote",
"admin_research"
],
"missing_severity": "blocks_conditional_cap_only"
},
{
"input_key": "application_status",
"label": "Application or award status",
"value_type": "enum",
"valid_values": [
"not_applied",
"application_started",
"application_submitted",
"selected_for_award_negotiations",
"alternate",
"not_selected",
"executed_award"
],
"required_for": [
"effect_grant_expected_value_2_c767034e167ad0f6"
],
"source_precedence": [
"application_status",
"user_profile",
"admin_research"
],
"missing_severity": "blocks_user_facing_total"
},
{
"input_key": "executed_doe_award_amount_cents",
"label": "Executed DOE award amount",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_2_c767034e167ad0f6"
],
"source_precedence": [
"application_status",
"admin_research"
],
"missing_severity": "blocks_user_facing_total",
"use_only_when": "application_status == executed_award"
},
{
"input_key": "human_reviewed_probability_discount",
"label": "Human-reviewed award probability discount",
"value_type": "number",
"required_for": [
"effect_grant_expected_value_2_c767034e167ad0f6"
],
"source_precedence": [
"admin_research",
"application_status"
],
"missing_severity": "blocks_expected_value",
"migration_note": "Do not ask users to guess this. Replace free-text application_score_or_award_probability and award_probability inputs with this numeric admin-reviewed input only if RetroFi explicitly approves a probability model."
},
{
"input_key": "technical_assistance_request_scope",
"label": "Technical assistance request scope",
"value_type": "text",
"required_for": [
"effect_process_value_1_b76fbb43e2475d79"
],
"source_precedence": [
"user_profile",
"retrofit_assumptions",
"quote"
],
"missing_severity": "blocks_non_cash_workflow"
}
],
"effects_to_add_or_update": [
{
"effect_id": "effect_grant_expected_value_2_c767034e167ad0f6",
"effect_type": "grant_expected_value",
"cash_value_classification": "cash_grant",
"value_model_kind": "competitive_cost_share",
"calculation": {
"method": "expected_value",
"amount_cents": null,
"percent": null,
"conditional_award_cents": null,
"conditional_award_formula": "Suppress automated expected value unless RetroFi has either an executed DOE award amount or a human-reviewed probability and conditional award amount. Before execution, only a ceiling is defensible: Topic Area 1 maximum federal share is up to min(750000000, 0.90 * total_allowable_project_cost_cents, requested_federal_share_cents) because minimum non-federal cost share is 10%; Topic Area 2 maximum is up to min(150000000, total_allowable_project_cost_cents, requested_federal_share_cents); Topic Area 3 maximum is up to min(250000000, total_allowable_project_cost_cents, requested_federal_share_cents). Actual award may be lower and depends on competitive review, selection, negotiations, available funds, and Grants Officer execution.",
"max_award_cents": 750000000,
"min_award_cents": 25000000,
"rate_rows": [
{
"topic_area": "topic_area_1_tribal_community_energy_deployment_projects",
"topic_label": "Tribal community energy deployment projects",
"max_award_cents": 750000000,
"minimum_cost_share_percent": 0.1,
"maximum_federal_share_percent_if_cost_share_only": 0.9,
"project_period_months_min": 24,
"project_period_months_max": 48,
"sourceEvidence": "NOFO Part 1 funding details and cost-share table. "
},
{
"topic_area": "topic_area_2_tribal_community_energy_project_planning_assessment_feasibility",
"topic_label": "Tribal community energy project planning, assessment, and feasibility",
"max_award_cents": 150000000,
"minimum_cost_share_percent": 0.0,
"maximum_federal_share_percent_if_cost_share_only": 1.0,
"project_period_months_min": 12,
"project_period_months_max": 48,
"sourceEvidence": "NOFO Part 1 funding details and cost-share table. "
},
{
"topic_area": "topic_area_3_large_scale_planning_assessment_feasibility_for_tribal_energy_projects",
"topic_label": "Large-scale planning, assessment, and feasibility for Tribal energy projects",
"max_award_cents": 250000000,
"minimum_cost_share_percent": 0.0,
"maximum_federal_share_percent_if_cost_share_only": 1.0,
"project_period_months_min": 12,
"project_period_months_max": 48,
"sourceEvidence": "NOFO Part 1 funding details and cost-share table. "
}
],
"probability_discount": null,
"probability_evidence_type": "budget_and_expected_awards"
},
"required_inputs": [
{
"input_key": "eligible_applicant_entity_type",
"value_type": "enum",
"needed_for": "eligibility_gate"
},
{
"input_key": "current_foa_topic_area",
"value_type": "enum",
"needed_for": "topic_cap_only"
},
{
"input_key": "total_allowable_project_cost_cents",
"value_type": "money_cents",
"needed_for": "topic_cap_only"
},
{
"input_key": "requested_federal_share_cents",
"value_type": "money_cents",
"needed_for": "topic_cap_only"
},
{
"input_key": "application_status",
"value_type": "enum",
"needed_for": "suppress_or_actual_award_gate"
},
{
"input_key": "executed_doe_award_amount_cents",
"value_type": "money_cents",
"needed_for": "actual_award_only"
},
{
"input_key": "human_reviewed_probability_discount",
"value_type": "number",
"needed_for": "human_reviewed_expected_value_only"
}
],
"missing_input_behavior": "suppress_until_review",
"includedInUserFacingTotalDefault": false,
"humanReviewRequired": true,
"reasonCodes": [
"competitive_nofo",
"no_official_application_volume",
"no_defensible_probability_discount",
"expected_awards_without_application_denominator",
"up_to_caps_only",
"topic_area_required_for_cap",
"cost_share_varies_by_topic",
"selection_not_award",
"grants_officer_execution_required",
"exclude_from_user_facing_total_default"
],
"calculationTrace": [
"DOE confirms Indian Energy financial assistance is competitive, so eligibility alone is not a value model. ([The Department of Energy's Energy.gov][1])",
"Official sources show $50,000,000 total funding and 40 expected awards, but no application count or success-rate denominator was found; therefore probability_discount remains null. ([IE-Exchange][2])",
"NOFO Part 1 provides topic ceilings and cost-share gates only; those are maximums, not expected awards. ",
"NOFO Part 1 review criteria and selection factors make award selection project-specific and discretionary. ",
"NOFO Part 2 states selection for award negotiations is not a funding guarantee; no award exists until negotiations are complete and the Grants Officer executes the award. "
]
},
{
"effect_id": "effect_process_value_1_b76fbb43e2475d79",
"effect_type": "no_cash_value",
"cash_value_classification": "technical_assistance",
"value_model_kind": "non_cash_technical_assistance",
"calculation": {
"method": "zero_when_not_applicable",
"amount_cents": null,
"percent": null,
"conditional_award_cents": null,
"conditional_award_formula": "Technical assistance is an in-kind, no-cost support workflow. Do not assign a cash grant value or include in automated savings totals. Requests require eligible Tribal status and a project-specific assistance scope and are evaluated based on scope and available budget.",
"max_award_cents": null,
"min_award_cents": null,
"rate_rows": [],
"probability_discount": null,
"probability_evidence_type": "not_required"
},
"required_inputs": [
{
"input_key": "eligible_applicant_entity_type",
"value_type": "enum",
"needed_for": "technical_assistance_eligibility"
},
{
"input_key": "technical_assistance_request_scope",
"value_type": "text",
"needed_for": "technical_assistance_request"
}
],
"missing_input_behavior": "needs_project_scope",
"includedInUserFacingTotalDefault": false,
"humanReviewRequired": false,
"reasonCodes": [
"non_cash_technical_assistance",
"no_direct_cash_value",
"request_scope_required",
"available_budget_review_required",
"exclude_from_user_facing_total_default"
],
"calculationTrace": [
"DOE states Tribal energy technical assistance is provided at no cost by DOE, national laboratories, and partners. ([The Department of Energy's Energy.gov][4])",
"DOE states each request is evaluated based on requested scope and available budget, and CLDP technical assistance is in-kind with no funding provided directly to Tribes. ([The Department of Energy's Energy.gov][4])"
]
}
]
},
"testCaseInputHints": [
{
"inputKey": "eligible_applicant_entity_type",
"valueType": "enum",
"whoProvides": "user",
"realisticDefaultGuidance": "No default. User or administrator must identify a NOFO-eligible Tribal entity type."
},
{
"inputKey": "current_foa_topic_area",
"valueType": "enum",
"whoProvides": "user",
"realisticDefaultGuidance": "No default. Must be topic_area_1, topic_area_2, or topic_area_3 from DE-FOA-0003548."
},
{
"inputKey": "total_allowable_project_cost_cents",
"valueType": "money_cents",
"whoProvides": "quote",
"realisticDefaultGuidance": "Use only a project budget prepared for the application or quote; do not infer from household retrofit cost unless that cost is part of an eligible Tribal project."
},
{
"inputKey": "requested_federal_share_cents",
"valueType": "money_cents",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Use the federal share requested in the DOE application budget. Leave null if no application budget exists."
},
{
"inputKey": "application_status",
"valueType": "enum",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Use not_applied, application_submitted, selected_for_award_negotiations, alternate, not_selected, or executed_award. Only executed_award can support an actual cash value."
},
{
"inputKey": "executed_doe_award_amount_cents",
"valueType": "money_cents",
"whoProvides": "application_status",
"realisticDefaultGuidance": "No default. Use only the executed financial assistance award amount after DOE award negotiations and Grants Officer execution."
},
{
"inputKey": "human_reviewed_probability_discount",
"valueType": "number",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "Leave null unless RetroFi explicitly approves a probability model. Do not derive a probability from 40 expected awards without application volume."
},
{
"inputKey": "technical_assistance_request_scope",
"valueType": "text",
"whoProvides": "user",
"realisticDefaultGuidance": "For non-cash workflow only; examples include energy planning, energy efficiency assessment, resource assessment, project planning, utility formation, or legal technical assistance."
}
],
"remainingGaps": [
"No official application volume, current applicant pool size, or historical success rate for DE-FOA-0003548 was found; the 40 expected awards listed by Grants.gov is not enough to compute applicant probability without a denominator. ([Simpler Grants][3])",
"The NOFO gives topic-specific maximums and cost-share requirements, but not a deterministic formula for actual award size if selected. ",
"Selection for award negotiations is not an executed award and does not guarantee funding. ",
"Technical assistance has no direct cash payment to value in user-facing totals. ([The Department of Energy's Energy.gov][4])"
],
"doNotUseAsUserFacingEstimateReasons": [
"Competitive NOFO with discretionary review and selection factors.",
"Official sources provide award ceilings and expected award count, but no application-count denominator or success probability.",
"Actual award amount is project-specific and may be lower than the published topic caps.",
"Award is not guaranteed until DOE award negotiations are complete and the Grants Officer executes the financial assistance award.",
"Technical assistance is no-cost, in-kind support rather than a cash grant."
]
}

[1]: https://www.energy.gov/indianenergy/current-funding-and-technical-assistance-opportunities "Current Funding and Technical Assistance Opportunities | Department of Energy"
[2]: https://ie-exchange.energy.gov/ "
    DOE: IE-Exchange: Funding Opportunities
"
[3]: https://simpler.grants.gov/opportunity/118103c0-5a87-446a-a1a6-6c61906f1fd2 "Opportunity Listing - Unleashing Tribal Energy Development"
[4]: https://www.energy.gov/indianenergy/technical-assistance-tribal-energy-projects "Technical Assistance for Tribal Energy Projects | Department of Energy"

