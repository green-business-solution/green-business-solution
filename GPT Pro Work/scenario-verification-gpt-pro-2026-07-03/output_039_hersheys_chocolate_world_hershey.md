{
"schemaVersion": "retrofi_scenario_combination_verification.v1",
"reviewedBy": "gpt_pro",
"testCaseId": "hersheys-chocolate-world-hershey",
"testCaseOrdinal": 39,
"overallAssessment": "issues_found",
"findings": [
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"retrofitDisplayName": "High-efficiency HVAC replacement",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3853"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives is internally valid, and no alternative scenario is listed. The only V2 package, PPL 3853, is calculable_with_missing_inputs but not_user_facing_default and excluded from runtime totals, so it should not be forced into the selected scenario in this pass. Other matched records have blockers for ordinary HVAC, standalone high-performance-building treatment, or loan/tax-cost-recovery treatment. Reviewed using the uploaded packet only .",
"recommendedRepair": "Keep the no-incentives selected scenario unless verified PPL pathway, savings, measure, and preapproval inputs are collected and promoted to a user-facing package.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "biomass_biogas_energy_system",
"retrofitDisplayName": "Biomass / biogas energy system",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:658",
"SOURCE_DSIRE:dsire_program_id:2511",
"SOURCE_DSIRE:dsire_program_id:676",
"SOURCE_DSIRE:dsire_program_id:22438",
"SOURCE_DSIRE:dsire_program_id:3354"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "No V2 package or alternative scenario is provided. PPL 22438 and HPB 3354 should stay excluded for standalone biomass/biogas based on their blockers, while ITC 658 is narrowed to qualified biogas property, REAP 2511 depends on agricultural-producer or rural-small-business status, and MACRS 676 is tax cost recovery rather than a direct rebate. The packet does not provide enough project-scope or applicant-eligibility detail to verify that no-incentives is truly optimal.",
"recommendedRepair": "Add explicit qualification fields for qualified biogas versus generic biomass, REAP rural/agricultural status, and tax-credit/tax-cost-recovery handling; build scenario candidates only after those dependencies are known.",
"needsMathVerificationLater": true
},
{
"retrofitTypeId": "ev_charger_installation",
"retrofitDisplayName": "EV charger installation",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:22456"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The only matched opportunity is PECO 22456, but its hard requirements require a PECO commercial or industrial electric account while the user profile lists PPL Electric Utilities. Its V2 package is also not_user_facing_default and excluded from runtime totals. The no-incentives selected scenario is therefore the right combination from the packet.",
"recommendedRepair": "Keep PECO 22456 out of the selected scenario unless the utility account is verified as PECO; otherwise remove or downgrade this match for this PPL site.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "led_lighting_retrofit",
"retrofitDisplayName": "LED lighting retrofit",
"severity": "medium",
"findingType": "missing_compatible_opportunity",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3853",
"SOURCE_DSIRE:dsire_program_id:1271"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario excludes all incentives, but the packet elsewhere describes PPL 3853 as applicable to the same PPL business site and explicitly includes led_lighting_retrofit in its eligible categories. That opportunity is absent from this retrofit's matched opportunities and scenarios. The listed 179D opportunity, by contrast, should not be treated as a simple LED rebate because its blockers require a certified 179D qualifying project.",
"recommendedRepair": "Add PPL 3853 to the LED retrofit candidate set, likely as not-user-facing or missing-input until measure, kWh-savings, pathway, scope, and preapproval inputs are available; keep 179D separate from simple rebate stacking.",
"needsMathVerificationLater": true
},
{
"retrofitTypeId": "combined_heat_and_power_system",
"retrofitDisplayName": "Combined heat and power system",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:658",
"SOURCE_DSIRE:dsire_program_id:22438",
"SOURCE_DSIRE:dsire_program_id:3853",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "CHP appears in the eligible categories for ITC 658, MACRS 676, PPL 22438, and PPL 3853. The only V2 package is PPL 3853 and it is suppressed as not_user_facing_default; no package is shown for ITC 658 or PPL 22438. The two PPL records may overlap as business/DER incentive pathways, so a reliable scenario decision requires de-duplication and stacking metadata before adding any PPL incentive alongside federal tax benefits.",
"recommendedRepair": "Create distinct CHP scenario candidates only after de-duping PPL 22438 versus PPL 3853, defining conflict/stacking rules with ITC/MACRS, and collecting required PPL pathway and savings inputs.",
"needsMathVerificationLater": true
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"retrofitDisplayName": "Ground-source / geothermal heat pump",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:658",
"SOURCE_DSIRE:dsire_program_id:2511",
"SOURCE_DSIRE:dsire_program_id:676",
"SOURCE_DSIRE:dsire_program_id:3354"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "ITC 658 and MACRS 676 list ground-source/geothermal categories, while REAP 2511 may apply only if agricultural-producer or rural-small-business requirements are met. No V2 package or alternative scenario is provided, and HPB 3354 blocks standalone geothermal unless part of a qualifying whole-building project. The packet is insufficient to verify that the no-incentives scenario is optimal.",
"recommendedRepair": "Add eligibility inputs and calculation-package coverage for geothermal ITC/MACRS and REAP, and keep HPB out unless the project is a qualifying high-performance building renovation.",
"needsMathVerificationLater": true
},
{
"retrofitTypeId": "retro_commissioning_study",
"retrofitDisplayName": "Retro-commissioning study",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3602",
"SOURCE_DSIRE:dsire_program_id:22779",
"SOURCE_DSIRE:dsire_program_id:3354"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is valid. All matched opportunities describe financing or support for implementation or high-performance building projects, and the blockers say standalone retro-commissioning studies are not supported or not clearly supported. Because no incentive is included, the packet does not show any double-counting of the overlapping HPB records.",
"recommendedRepair": "Keep standalone retro-commissioning excluded from incentive scenarios unless it is tied to a qualifying high-performance building or implementation project.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "leed_certification",
"retrofitDisplayName": "LEED certification",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": null,
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3602",
"SOURCE_DSIRE:dsire_program_id:3354"
],
"affectedScenarioIds": [],
"explanation": "No scenario is generated because the retrofit is unsupported for savings calculation. The two HPB opportunities may relate to LEED only as part of a high-performance building construction or major-renovation project, not as standalone certification service support. No selected-scenario stacking issue is present.",
"recommendedRepair": "Do not create a standalone LEED incentive scenario without a qualifying high-performance building project scope and modeled savings/cost-premium inputs; de-duplicate HPB records if a future scenario is built.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "level_2_ev_charger_installation",
"retrofitDisplayName": "Level 2 EV charger installation",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:22456"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The only matched opportunity is PECO 22456, whose hard requirements require a PECO commercial or industrial account. The user profile instead lists PPL Electric Utilities, and the V2 package is not_user_facing_default. The selected no-incentives scenario is therefore appropriate from the supplied data.",
"recommendedRepair": "Keep PECO 22456 excluded unless PECO account eligibility is verified; otherwise remove it from this PPL-site candidate set.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "solar_water_heating_system",
"retrofitDisplayName": "Solar water heating system",
"severity": "medium",
"findingType": "no_calculable_scenario_but_should_have_one",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:658",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Solar water heating is explicitly listed in the eligible categories for ITC 658 and MACRS 676, but the retrofit has no V2 package and no alternative scenario. The no-incentives selected scenario is internally valid, but it appears incomplete because a compatible federal tax-credit/tax-cost-recovery scenario was not calculable from the packet.",
"recommendedRepair": "Add calculable solar-water-heating tax incentive scenario support, with clear treatment of ITC versus MACRS and any stacking/basis-adjustment dependency before selecting the best scenario.",
"needsMathVerificationLater": true
},
{
"retrofitTypeId": "battery_storage_system",
"retrofitDisplayName": "Battery storage system",
"severity": "medium",
"findingType": "no_calculable_scenario_but_should_have_one",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:658"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Battery storage is explicitly listed in ITC 658's eligible categories, but no V2 package or alternative scenario is provided. The selected no-incentives scenario is internally valid, yet it likely omits a compatible tax-credit opportunity due to missing calculable package coverage.",
"recommendedRepair": "Add a battery-storage ITC scenario candidate with required qualification and tax-treatment inputs; then compare it against no incentives after formula math is verified.",
"needsMathVerificationLater": true
},
{
"retrofitTypeId": "energy_audit",
"retrofitDisplayName": "Energy audit",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": null,
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:22779"
],
"affectedScenarioIds": [],
"explanation": "No scenario is generated because the retrofit is unsupported for savings calculation. GELF 22779's blockers state that standalone energy audits are not a funded retrofit category, so there is no compatible standalone opportunity to include.",
"recommendedRepair": "Keep standalone energy audits out of incentive scenarios unless they are bundled into a qualifying implementation or financing project.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "ev_make_ready_electrical_upgrade",
"retrofitDisplayName": "EV make-ready electrical upgrade",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:22456"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "PECO 22456 includes commercial make-ready categories, but its hard requirements require a PECO commercial or industrial account. The user profile lists PPL Electric Utilities, and the V2 package is not_user_facing_default. The selected no-incentives scenario should stay selected on the provided data.",
"recommendedRepair": "Do not include PECO make-ready savings for this site unless PECO account eligibility is verified; otherwise remove or downgrade the match.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "exterior_site_lighting_retrofit",
"retrofitDisplayName": "Exterior/site lighting retrofit",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3853"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The PPL 3853 opportunity is compatible at a high level, but its V2 package is not_user_facing_default, excluded from runtime totals, and based on placeholder/defaulted inputs. No alternative scenario is listed. The selected no-incentives scenario is valid for this pass.",
"recommendedRepair": "Keep no incentives selected until verified PPL lighting pathway, savings, scope, and preapproval inputs allow a user-facing scenario.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "microgrid_system",
"retrofitDisplayName": "Microgrid system",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:658"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "ITC 658 is narrowed to qualifying microgrid controllers, while the retrofit is a broader microgrid system. The packet does not provide controller-specific scope or cost allocation, and no V2 package or alternative scenario is listed. Including the ITC would be unsafe, but selecting no incentives cannot be verified as optimal without this scope data.",
"recommendedRepair": "Collect microgrid-controller scope and eligible-cost inputs; create an ITC scenario only for the qualifying controller portion and keep broader microgrid infrastructure out unless separately supported.",
"needsMathVerificationLater": true
},
{
"retrofitTypeId": "small_wind_turbine",
"retrofitDisplayName": "Small wind turbine",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The only matched opportunity is MACRS 676, which the packet characterizes as tax cost recovery rather than a rebate, grant, or direct incentive. No V2 package or alternative incentive scenario is listed, so the no-incentives selected scenario has no combination or stacking defect in this packet.",
"recommendedRepair": "Keep no incentives selected unless RetroFi intentionally models depreciation/tax-cost-recovery scenarios with the required tax-basis and placed-in-service inputs.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"retrofitDisplayName": "Smart thermostat / zoning retrofit",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3853"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "PPL 3853 includes smart thermostat/zoning at a high level, but its V2 package is not_user_facing_default, excluded from runtime totals, and based on placeholder/defaulted inputs. No compatible user-facing additive opportunity is shown, so the selected no-incentives scenario is acceptable.",
"recommendedRepair": "Keep no incentives selected until verified PPL measure, pathway, savings, scope, and preapproval inputs are available.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "thermal_energy_storage",
"retrofitDisplayName": "Thermal energy storage",
"severity": "medium",
"findingType": "no_calculable_scenario_but_should_have_one",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:658"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Thermal energy storage is explicitly listed in ITC 658's eligible categories, but no V2 package or alternative scenario is provided. The no-incentives scenario is internally valid but appears incomplete because a compatible federal tax-credit scenario is not calculable from the packet.",
"recommendedRepair": "Add a thermal-energy-storage ITC scenario candidate with required eligibility and tax-treatment inputs; verify dollar math in the later calculation pass.",
"needsMathVerificationLater": true
}
],
"summary": {
"retrofitsReviewed": 18,
"highSeverityCount": 0,
"mediumSeverityCount": 8,
"lowSeverityCount": 10,
"noIssueRetrofitCount": 7,
"dataGapRetrofitCount": 4
}
}

