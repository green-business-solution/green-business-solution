{
"schemaVersion": "retrofi_grant_package_repair.v1",
"researchedAt": "2026-07-03",
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22772",
"programName": "Leading by Example Solar-Decarbonization Grant Program",
"status": "needs_project_inputs",
"sourceConfidence": "medium",
"estimateConfidenceIfInputsPresent": "medium",
"officialSources": [
{
"title": "Leading by Example Solar-Decarbonization Grant Program",
"url": "[https://www.mass.gov/info-details/leading-by-example-solar-decarbonization-grant-program](https://www.mass.gov/info-details/leading-by-example-solar-decarbonization-grant-program)",
"owner": "Massachusetts Department of Energy Resources / Leading by Example",
"accessed": "2026-07-03",
"evidenceText": "Official indexed Mass.gov text identifies eligible applicants as executive agencies, state institutions of higher education, or quasi-public state entities; lists total program funding of $25,000,000; maximum award per individual project of $2,500,000; rolling review until allocated funds are awarded; battery storage at $500/kWh; additional EVSE at $5,000/port; decarbonization equal to solar funding amount; and a 10% Environmental Justice adder. ([Massachusetts Government][1])"
},
{
"title": "COMMBUYS Bid Solicitation BD-25-1041-ENE01-ENE01-107704",
"url": "[https://www.commbuys.com/bso/external/bidDetail.sda?docId=BD-25-1041-ENE01-ENE01-107704&external=true&parentUrl=bid](https://www.commbuys.com/bso/external/bidDetail.sda?docId=BD-25-1041-ENE01-ENE01-107704&external=true&parentUrl=bid)",
"owner": "Massachusetts Department of Energy Resources",
"accessed": "2026-07-03",
"evidenceText": "COMMBUYS lists the opportunity as 'LBE Solar-Decarbonization Grant Program for State Entities,' shows Bid Type OPEN, identifies the Department of Energy Resources as purchaser organization, lists [LBE-grants@mass.gov](mailto:LBE-grants@mass.gov) as contact, shows an available date of 2024-09-20, and shows a bid opening date of 2027-06-30. It also lists current Opportunity Notice and Application Form amendment attachments. ([Commbuys][2])"
},
{
"title": "Mass.gov indexed solar rate table text",
"url": "[https://www.mass.gov/info-details/leading-by-example-solar-decarbonization-grant-program](https://www.mass.gov/info-details/leading-by-example-solar-decarbonization-grant-program)",
"owner": "Massachusetts Department of Energy Resources / Leading by Example",
"accessed": "2026-07-03",
"evidenceText": "Official indexed Mass.gov text supports solar PV rate rows for state-owned behind-the-meter projects at $0.75/W for rooftop and ground-mount and $2.00/W for solar canopy and innovative solar PV; it also supports third-party-owned behind-the-meter rows at $0.60/W for rooftop and ground-mount and $1.50/W for solar canopy and innovative solar PV. ([Massachusetts Government][1])"
},
{
"title": "Leading by Example Grants",
"url": "[https://www.mass.gov/info-details/leading-by-example-grants](https://www.mass.gov/info-details/leading-by-example-grants)",
"owner": "Massachusetts Department of Energy Resources / Leading by Example",
"accessed": "2026-07-03",
"evidenceText": "Official Mass.gov indexed text identifies Leading by Example as offering grant opportunities to support state entities, including through the Solar-Decarbonization Grant Program. ([Massachusetts Government][3])"
}
],
"sourceSummary": "The uploaded package already captured the main conditional components, but it should be repaired to use explicit supported rate rows, a $2,500,000 per-project cap, and strict suppression from user-facing totals unless project scope, applicant/site eligibility, current funding, and LBE/DOER approval are confirmed. The Mass.gov page itself was not directly fetchable in full during this run, so source confidence remains medium; however, official Mass.gov indexed text and the official COMMBUYS bid support active availability, eligibility, several rate rows, the cap, rolling review, and component adders. Uploaded package context reviewed:  Official support: ([Commbuys][2])",
"packagePatch": {
"calculation_status": "calculable_with_missing_inputs",
"availability": {
"status": "active",
"fundingStatus": "open_while_funds_last"
},
"input_requirements_to_add_or_update": [
{
"input_key": "eligible_applicant_entity_type",
"label": "Eligible applicant entity type",
"value_type": "enum",
"required_for": [
"effect_grant_expected_value_1_9221facf5f8b2349"
],
"allowed_values": [
"executive_agency",
"state_institution_of_higher_education",
"quasi_public_state_entity"
],
"source_precedence": [
"user_profile",
"application_status",
"admin_research"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "project_site_eligibility_confirmed",
"label": "Project site eligibility confirmed by LBE/DOER",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_9221facf5f8b2349"
],
"source_precedence": [
"application_status",
"admin_research",
"user_profile"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "application_award_status",
"label": "Application award status",
"value_type": "enum",
"required_for": [
"effect_grant_expected_value_1_9221facf5f8b2349"
],
"allowed_values": [
"not_applied",
"submitted",
"approved",
"denied",
"waitlisted",
"unknown"
],
"source_precedence": [
"application_status",
"admin_research",
"user_profile"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "current_funding_available_confirmed",
"label": "Current funding available confirmed by administrator or current notice",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_9221facf5f8b2349"
],
"source_precedence": [
"admin_research",
"application_status"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "individual_project_cap_cents",
"label": "Current individual project cap in cents",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_9221facf5f8b2349"
],
"source_precedence": [
"admin_research",
"program_application"
],
"default_value_cents_if_current_source_confirms": 250000000,
"missing_severity": "blocks_calculation"
},
{
"input_key": "approved_solar_project_type",
"label": "Approved solar project type",
"value_type": "enum",
"required_for": [
"effect_grant_expected_value_1_9221facf5f8b2349"
],
"allowed_values": [
"none",
"rooftop_solar",
"ground_mount_solar",
"solar_canopy",
"innovative_solar_pv"
],
"source_precedence": [
"quote",
"application_status",
"admin_research"
],
"missing_severity": "blocks_calculation_when_solar_component_selected"
},
{
"input_key": "solar_ownership_metering_model",
"label": "Solar ownership and metering model",
"value_type": "enum",
"required_for": [
"effect_grant_expected_value_1_9221facf5f8b2349"
],
"allowed_values": [
"state_owned_behind_the_meter",
"third_party_owned_behind_the_meter",
"other_current_notice_confirmed"
],
"source_precedence": [
"quote",
"application_status",
"admin_research"
],
"missing_severity": "blocks_calculation_when_solar_component_selected"
},
{
"input_key": "approved_solar_capacity_watts",
"label": "Approved eligible solar capacity in watts",
"value_type": "number",
"required_for": [
"effect_grant_expected_value_1_9221facf5f8b2349"
],
"source_precedence": [
"quote",
"application_status",
"admin_research"
],
"missing_severity": "blocks_calculation_when_solar_component_selected"
},
{
"input_key": "approved_battery_kwh",
"label": "Approved eligible battery storage capacity in kWh",
"value_type": "number",
"required_for": [
"effect_grant_expected_value_1_9221facf5f8b2349"
],
"source_precedence": [
"quote",
"application_status",
"admin_research"
],
"missing_severity": "blocks_calculation_when_battery_component_selected"
},
{
"input_key": "additional_eligible_evse_port_count",
"label": "Additional eligible EVSE port count beyond required canopy ports",
"value_type": "number",
"required_for": [
"effect_grant_expected_value_1_9221facf5f8b2349"
],
"source_precedence": [
"quote",
"application_status",
"admin_research"
],
"missing_severity": "blocks_calculation_when_evse_component_selected"
},
{
"input_key": "decarbonization_component_approved",
"label": "Decarbonization component approved",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_9221facf5f8b2349"
],
"source_precedence": [
"application_status",
"admin_research"
],
"missing_severity": "blocks_calculation_when_decarbonization_component_selected"
},
{
"input_key": "approved_solar_funding_amount_cents",
"label": "Approved solar funding amount in cents",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_9221facf5f8b2349"
],
"source_precedence": [
"application_status",
"quote",
"admin_research"
],
"missing_severity": "blocks_calculation_when_decarbonization_component_selected_or_solar_formula_unavailable"
},
{
"input_key": "environmental_justice_adder_approved",
"label": "Environmental Justice adder approved",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_9221facf5f8b2349"
],
"source_precedence": [
"application_status",
"admin_research"
],
"missing_severity": "blocks_calculation"
}
],
"effects_to_add_or_update": [
{
"effect_id": "effect_grant_expected_value_1_9221facf5f8b2349",
"effect_type": "grant_expected_value",
"cash_value_classification": "cash_grant",
"value_model_kind": "hybrid_rate_plus_cap",
"calculation": {
"method": "rate_table",
"amount_cents": null,
"percent": null,
"conditional_award_cents": null,
"conditional_award_formula": "Only calculate a conditional award when eligible_applicant_entity_type, project_site_eligibility_confirmed, application_award_status='approved', current_funding_available_confirmed=true, individual_project_cap_cents, approved project components, and all component quantities/rate dimensions are present. solar_base_cents = approved_solar_capacity_watts * solar_rate_cents_per_watt from supported current rate row. battery_cents = approved_battery_kwh * 50000. evse_cents = additional_eligible_evse_port_count * 500000. decarbonization_cents = approved_solar_funding_amount_cents when decarbonization_component_approved=true, else 0. pre_ej_cents = solar_base_cents + battery_cents + evse_cents + decarbonization_cents. ej_adder_cents = round(pre_ej_cents * 0.10) when environmental_justice_adder_approved=true, else 0. conditional_award_cents = min(pre_ej_cents + ej_adder_cents, individual_project_cap_cents). If any selected component lacks a supported current official rate row or approved amount, suppress until review.",
"max_award_cents": 250000000,
"min_award_cents": null,
"rate_rows": [
{
"component": "solar_pv",
"project_type": "rooftop_solar",
"ownership_metering_model": "state_owned_behind_the_meter",
"rate_cents_per_watt": 75,
"unit": "watt",
"source_note": "Official indexed Mass.gov rate table text."
},
{
"component": "solar_pv",
"project_type": "ground_mount_solar",
"ownership_metering_model": "state_owned_behind_the_meter",
"rate_cents_per_watt": 75,
"unit": "watt",
"source_note": "Official indexed Mass.gov rate table text."
},
{
"component": "solar_pv",
"project_type": "solar_canopy",
"ownership_metering_model": "state_owned_behind_the_meter",
"rate_cents_per_watt": 200,
"unit": "watt",
"source_note": "Official indexed Mass.gov rate table text."
},
{
"component": "solar_pv",
"project_type": "innovative_solar_pv",
"ownership_metering_model": "state_owned_behind_the_meter",
"rate_cents_per_watt": 200,
"unit": "watt",
"source_note": "Official indexed Mass.gov rate table text."
},
{
"component": "solar_pv",
"project_type": "rooftop_solar",
"ownership_metering_model": "third_party_owned_behind_the_meter",
"rate_cents_per_watt": 60,
"unit": "watt",
"source_note": "Official indexed Mass.gov rate table text."
},
{
"component": "solar_pv",
"project_type": "ground_mount_solar",
"ownership_metering_model": "third_party_owned_behind_the_meter",
"rate_cents_per_watt": 60,
"unit": "watt",
"source_note": "Official indexed Mass.gov rate table text."
},
{
"component": "solar_pv",
"project_type": "solar_canopy",
"ownership_metering_model": "third_party_owned_behind_the_meter",
"rate_cents_per_watt": 150,
"unit": "watt",
"source_note": "Official indexed Mass.gov rate table text."
},
{
"component": "solar_pv",
"project_type": "innovative_solar_pv",
"ownership_metering_model": "third_party_owned_behind_the_meter",
"rate_cents_per_watt": 150,
"unit": "watt",
"source_note": "Official indexed Mass.gov rate table text."
},
{
"component": "battery_storage",
"rate_cents_per_kwh": 50000,
"unit": "kwh",
"source_note": "Official indexed Mass.gov text states Battery Storage incentive amount is $500 per kWh."
},
{
"component": "additional_evse",
"rate_cents_per_port": 500000,
"unit": "port",
"eligibility_note": "Only additional EVSE beyond number of ports required under canopy requirements.",
"source_note": "Official indexed Mass.gov text states Additional EVSE incentive amount is $5,000 per port."
},
{
"component": "decarbonization",
"rate_basis": "approved_solar_funding_amount_cents",
"unit": "component",
"source_note": "Official indexed Mass.gov text states Decarbonization incentive amount is equal to solar funding amount."
},
{
"component": "environmental_justice_adder",
"adder_percent": 0.1,
"unit": "percent_of_total_solar_storage_evse_and_decarbonization_funding_requested",
"source_note": "Official indexed Mass.gov text states a 10% EJ adder."
}
],
"probability_discount": null,
"probability_evidence_type": "first_come_funding_unknown"
},
"required_inputs": [
"eligible_applicant_entity_type",
"project_site_eligibility_confirmed",
"application_award_status",
"current_funding_available_confirmed",
"individual_project_cap_cents",
"approved_project_components",
"approved_solar_project_type",
"solar_ownership_metering_model",
"approved_solar_capacity_watts",
"approved_battery_kwh",
"additional_eligible_evse_port_count",
"decarbonization_component_approved",
"approved_solar_funding_amount_cents",
"environmental_justice_adder_approved"
],
"missing_input_behavior": "suppress_until_review",
"includedInUserFacingTotalDefault": false,
"humanReviewRequired": true,
"reasonCodes": [
"official_formula_rate_rows_found",
"official_commbuys_bid_open",
"application_deadline_or_bid_opening_2027_06_30",
"rolling_until_allocated_funds_awarded",
"current_remaining_funding_unknown",
"project_specific_lbe_doer_approval_required",
"missing_project_scope_blocks_calculation",
"missing_applicant_or_site_eligibility_blocks_calculation",
"missing_current_funding_confirmation_blocks_calculation",
"no_probability_discount_supported",
"do_not_include_in_user_facing_total_by_default",
"source_confidence_medium_due_full_massgov_page_not_directly_fetchable"
],
"calculationTrace": [
"COMMBUYS identifies an official DOER opportunity named LBE Solar-Decarbonization Grant Program for State Entities, shows Bid Type OPEN, and lists a 2027-06-30 bid opening date. ([Commbuys][2])",
"Official indexed Mass.gov text states total program funding of $25,000,000, a maximum award per individual project of $2,500,000, and rolling application review until allocated funds are awarded. ([Massachusetts Government][1])",
"Official indexed Mass.gov text states applicant eligibility for executive agencies, state institutions of higher education, or quasi-public state entities. ([Massachusetts Government][1])",
"Official indexed Mass.gov text supports battery storage at $500/kWh, additional EVSE at $5,000/port, decarbonization equal to solar funding amount, and a 10% Environmental Justice adder. ([Massachusetts Government][1])",
"Official indexed Mass.gov text supports behind-the-meter solar rate rows for state-owned projects and third-party-owned projects, but full current opportunity notice attachment text was not directly retrieved; unsupported rows must be suppressed until administrator review. ([Massachusetts Government][1])",
"No official historical application count, award count, success rate, expected award count, or current remaining funding balance was found in accessible official sources during this run; therefore probability_discount remains null and the value must not be included in user-facing savings totals by default."
]
}
]
},
"testCaseInputHints": [
{
"inputKey": "eligible_applicant_entity_type",
"valueType": "enum",
"whoProvides": "user",
"realisticDefaultGuidance": "Use one of: executive_agency, state_institution_of_higher_education, quasi_public_state_entity. Do not default to eligible for residential, commercial, municipal, nonprofit, or private applicants."
},
{
"inputKey": "project_site_eligibility_confirmed",
"valueType": "boolean",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "Default false unless application materials or administrator confirmation establish the site is eligible under the current LBE notice."
},
{
"inputKey": "application_award_status",
"valueType": "enum",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Use approved only after LBE/DOER award or approval documentation. submitted or not_applied must suppress user-facing value."
},
{
"inputKey": "current_funding_available_confirmed",
"valueType": "boolean",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "Default false unless the current COMMBUYS/Mass.gov notice or LBE contact confirms funds remain available for the project."
},
{
"inputKey": "individual_project_cap_cents",
"valueType": "money_cents",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "Use 250000000 only if the current notice still confirms a $2,500,000 maximum award per individual project."
},
{
"inputKey": "approved_solar_project_type",
"valueType": "enum",
"whoProvides": "quote",
"realisticDefaultGuidance": "Use none, rooftop_solar, ground_mount_solar, solar_canopy, or innovative_solar_pv based on the approved application/quote."
},
{
"inputKey": "solar_ownership_metering_model",
"valueType": "enum",
"whoProvides": "quote",
"realisticDefaultGuidance": "Use state_owned_behind_the_meter or third_party_owned_behind_the_meter only when documented. Other rows require current notice review."
},
{
"inputKey": "approved_solar_capacity_watts",
"valueType": "number",
"whoProvides": "quote",
"realisticDefaultGuidance": "Use approved eligible solar watts from the application or quote. Do not infer from annual kWh production."
},
{
"inputKey": "approved_battery_kwh",
"valueType": "number",
"whoProvides": "quote",
"realisticDefaultGuidance": "Use approved eligible battery energy capacity in kWh. Use 0 when no battery component is approved."
},
{
"inputKey": "additional_eligible_evse_port_count",
"valueType": "number",
"whoProvides": "quote",
"realisticDefaultGuidance": "Use only additional eligible EVSE ports beyond any ports required under canopy requirements. Use 0 when no additional EVSE component is approved."
},
{
"inputKey": "decarbonization_component_approved",
"valueType": "boolean",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Default false unless the approved application includes a decarbonization component."
},
{
"inputKey": "approved_solar_funding_amount_cents",
"valueType": "money_cents",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Use the approved solar funding amount in cents; required for the decarbonization component and as a fallback when solar formula dimensions are unavailable."
},
{
"inputKey": "environmental_justice_adder_approved",
"valueType": "boolean",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Default false unless the current application or award approval confirms EJ adder eligibility."
}
],
"remainingGaps": [
"The full Mass.gov program page and current COMMBUYS Opportunity Notice/Application Form attachment contents were not directly retrievable in this run; official indexed text and COMMBUYS metadata were accessible, but production use should verify the current attachment terms.",
"The current remaining funding balance and allocation queue were not found in accessible official sources.",
"No official historical application count, historical award count, expected award count, or success rate was found.",
"Official indexed text did not fully expose every possible solar rate-table row; only the listed state-owned behind-the-meter and third-party-owned behind-the-meter rows should be auto-calculated without additional administrator review.",
"The cap treatment after the EJ adder should be verified in the current opportunity notice; the conservative runtime formula caps the total conditional award at $2,500,000.",
"Project-specific approval, eligible component classification, eligible watt/kWh/port quantities, and EJ adder approval must come from the application, quote, or administrator review."
],
"doNotUseAsUserFacingEstimateReasons": [
"Applications are reviewed on a rolling basis until allocated funds are awarded, and current remaining funds were not found in accessible official sources.",
"The $2,500,000 figure is a maximum individual project award cap, not a guaranteed entitlement.",
"The award requires project-specific LBE/DOER review and approval.",
"No defensible probability discount, success rate, or current funding balance was found.",
"Missing applicant eligibility, site eligibility, ownership/metering model, project component quantities, or approval status must suppress the value.",
"Unsupported or unverified current rate-table rows must not be estimated from third-party summaries."
]
}

[1]: https://www.mass.gov/info-details/leading-by-example-solar-decarbonization-grant-program?utm_source=chatgpt.com "Leading by Example Solar-Decarbonization Grant Program"
[2]: https://www.commbuys.com/bso/external/bidDetail.sdo?docId=BD-25-1041-ENE01-ENE01-107704&external=true&parentUrl=bid "COMMBUYS - Bid Solicitation - BD-25-1041-ENE01-ENE01-107704"
[3]: https://www.mass.gov/leading-by-example-grants?utm_source=chatgpt.com "Leading by Example Grants"

