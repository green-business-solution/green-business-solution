{
"schemaVersion": "retrofi_scenario_combination_verification.v1",
"reviewedBy": "gpt_pro",
"testCaseId": "juniper-and-ivy-san-diego",
"testCaseOrdinal": 3,
"overallAssessment": "issues_found",
"findings": [
{
"retrofitTypeId": "ev_charger_installation",
"retrofitDisplayName": "EV charger installation",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is acceptable for runtime totals. All matched monetary or potentially monetary EV opportunities are either not user-facing by default, low confidence, non-monetary workflow, school-bus-specific, fleet/DCFC-specific, residential/Azusa-specific, or otherwise blocked by missing/defaulted inputs. No compatible additive runtime opportunity is shown in the packet. Source packet: ",
"recommendedRepair": "Keep no-incentives as the selected runtime scenario. Clean up opportunity matching separately so residential Azusa, school-bus-only, advisory, and rate-plan records are not treated as ordinary physical EV charger incentives.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"retrofitDisplayName": "High-efficiency HVAC replacement",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is acceptable. The calculable HVAC-related packages are suppressed: SD Energy Edge has a zero estimate and is not user-facing by default, Comfortably CA is a custom quote/pass-through estimate, and Plumas-Sierra failed repair because the source was inaccessible. Other matched records are financing, training, tax-credit, or depreciation records that the packet itself says should not be treated as ordinary HVAC rebates.",
"recommendedRepair": "Keep no-incentives selected for runtime totals. Separately restrict false-positive HVAC matches such as LEARN, generic ITC/MACRS, and non-SDG&E utility programs.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "automated_demand_response_controls",
"retrofitDisplayName": "Automated demand response controls",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is valid because the matched opportunities are demand-response participation programs, not equipment rebates for automated demand response controls. The packet provides no calculable V2 packages and no scenario alternatives.",
"recommendedRepair": "Keep no-incentives selected. Model ELRP, general Demand Response Programs, and CBP as separate demand-response enrollment or performance opportunities rather than equipment retrofit incentives.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "battery_storage_system",
"retrofitDisplayName": "Battery storage system",
"severity": "medium",
"findingType": "no_calculable_scenario_but_should_have_one",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:658",
"SOURCE_DSIRE:dsire_program_id:552"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The packet lists battery storage as an eligible category for both the federal Business Energy Investment Tax Credit and SGIP, but only the unrelated Marin Clean Energy Feed-In Tariff Plus has a V2 package summary. No ITC or SGIP calculation package is present, and no scenario candidate using either storage-specific opportunity is considered. This blocks a reliable decision that no incentives should be selected.",
"recommendedRepair": "Add or repair calculation packages for the battery-storage ITC and SGIP opportunities, then generate scenario candidates that can compare ITC-only, SGIP-only, and any permitted ITC-plus-SGIP stack. Do not rely on the MCE FIT package for standalone behind-the-meter battery storage.",
"needsMathVerificationLater": true
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"retrofitDisplayName": "Ground-source / geothermal heat pump",
"severity": "medium",
"findingType": "no_calculable_scenario_but_should_have_one",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:658",
"SOURCE_DSIRE:dsire_program_id:2511",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The packet lists ground-source geothermal heat pump as an eligible category for the Business Energy ITC, REAP loan guarantees, and MACRS, but no V2 package summaries or alternative scenarios are present. Because at least one source-backed monetary/tax opportunity appears relevant, selecting no incentives cannot be verified from the scenario candidates provided.",
"recommendedRepair": "Add calculation or non-cash/tax-value package handling for ITC, REAP loan guarantee, and MACRS where applicable. Generate scenarios that distinguish direct cash incentives, loan guarantees, and tax benefits, with eligibility gates for rural-small-business or agricultural-producer requirements.",
"needsMathVerificationLater": true
},
{
"retrofitTypeId": "biomass_biogas_energy_system",
"retrofitDisplayName": "Biomass / biogas energy system",
"severity": "medium",
"findingType": "no_calculable_scenario_but_should_have_one",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:658",
"SOURCE_DSIRE:dsire_program_id:2511",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is not reliably supported. The packet lists potentially applicable ITC, REAP loan guarantee, and MACRS opportunities for qualified biogas/biomass-related energy property, but the only V2 package summary is for MCE Feed-In Tariff Plus. That MCE opportunity is a wholesale renewable procurement program and may not correspond to a restaurant site retrofit.",
"recommendedRepair": "Create scenario candidates for source-backed biomass/qualified-biogas ITC, REAP, and MACRS treatment where eligibility can be established. Keep MCE FIT separate and only include it when the project is a qualifying 1 MW to 5 MW wholesale generation project.",
"needsMathVerificationLater": true
},
{
"retrofitTypeId": "led_lighting_retrofit",
"retrofitDisplayName": "LED lighting retrofit",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is acceptable for this pass. The packet states that SD Energy Edge should not match indoor LED lighting and only supports narrowed outdoor or Type B LED measures; Plumas-Sierra is inaccessible and likely not applicable to an SDG&E customer; ITC and MACRS exclude generic LED lighting; and 179D is not a simple LED rebate and requires certified whole-building or system savings. No compatible additive runtime incentive is shown.",
"recommendedRepair": "Keep no-incentives selected unless the project scope is confirmed as eligible SD Energy Edge outdoor/Type B lighting or a certified 179D project. Remove generic ITC/MACRS LED matches from physical rebate scenario generation.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "combined_heat_and_power_system",
"retrofitDisplayName": "Combined heat and power system",
"severity": "medium",
"findingType": "no_calculable_scenario_but_should_have_one",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:658",
"SOURCE_DSIRE:dsire_program_id:552",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The packet lists combined heat and power as an eligible category for the Business Energy ITC, SGIP, and MACRS, but no V2 package summaries or alternative scenarios are present. A no-incentives selection therefore appears to be caused by missing calculation packages rather than a verified best scenario.",
"recommendedRepair": "Add scenario support for CHP-specific ITC, SGIP, and MACRS opportunities, with stacking/conflict metadata between tax credits, rebates, and depreciation treatment.",
"needsMathVerificationLater": true
},
{
"retrofitTypeId": "energy_management_system",
"retrofitDisplayName": "Energy management system",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is valid. The matched ELRP and CBP opportunities pay for demand-response participation or verified load reduction, not energy management system installation. The packet includes no calculable package or alternative scenario for an equipment incentive.",
"recommendedRepair": "Keep no-incentives selected. Reclassify the matched demand-response programs as enrollment/performance opportunities rather than EMS retrofit incentives.",
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
"explanation": "The packet lists solar water heating as an eligible category for the Business Energy ITC and MACRS, but no V2 package summaries or alternative scenarios are present. Selecting no incentives is therefore not verifiable from the packet.",
"recommendedRepair": "Add calculation packages and scenario candidates for solar water heating ITC and MACRS where eligible. Include tax-benefit stacking metadata before selecting no incentives.",
"needsMathVerificationLater": true
},
{
"retrofitTypeId": "small_wind_turbine",
"retrofitDisplayName": "Small wind turbine",
"severity": "medium",
"findingType": "no_calculable_scenario_but_should_have_one",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:552",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The packet lists small wind turbine as an eligible category for SGIP and MACRS, but no V2 package summaries or alternative scenarios are present. The no-incentives selected scenario may be missing a source-backed incentive/tax-value scenario.",
"recommendedRepair": "Add SGIP and MACRS package handling for small wind where current program eligibility is met, then generate scenario candidates and stacking metadata.",
"needsMathVerificationLater": true
},
{
"retrofitTypeId": "fleet_charging_infrastructure",
"retrofitDisplayName": "Fleet charging infrastructure",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is acceptable for runtime totals. The only matched opportunity, Power Your Drive for Fleets, is supported for fleet charging but its V2 package is not user-facing by default and relies on low-confidence placeholder/defaulted inputs. No compatible runtime scenario is listed.",
"recommendedRepair": "Keep no-incentives selected until fleet-vehicle commitment, site category, charger count, make-ready scope, and utility approval are user-confirmed. Then consider a fleet-specific incentive scenario.",
"needsMathVerificationLater": true
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"retrofitDisplayName": "Heat pump HVAC retrofit",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is acceptable because the only matched opportunity is Plumas-Sierra REC, while the user is in SDG&E territory. The V2 repair also failed due to source inaccessibility and was not included in runtime totals.",
"recommendedRepair": "Keep no-incentives selected. Fix utility gating so Plumas-Sierra REC does not match an SDG&E customer unless service-territory eligibility is independently confirmed.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "heat_pump_water_heater",
"retrofitDisplayName": "Heat pump water heater",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is acceptable. The only matched opportunity is Plumas-Sierra REC, which is not the user's utility, and its V2 package is blocked by source-inaccessible repair failure.",
"recommendedRepair": "Keep no-incentives selected. Enforce utility-service-territory requirements for Plumas-Sierra REC before creating water-heater incentive scenarios.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"retrofitDisplayName": "High-efficiency refrigeration equipment",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is acceptable for runtime totals. The GRFS match is well aligned to the restaurant profile and refrigeration retrofit, but its V2 package is a custom quote estimate, not included in runtime totals, and depends on enrolled aggregator, approved pathway, measure package, verified savings, and funding availability.",
"recommendedRepair": "Keep no-incentives selected until GRFS project scope and aggregator approval are available. Then create a custom-quote scenario for GRFS if user-facing rules allow it.",
"needsMathVerificationLater": true
},
{
"retrofitTypeId": "insulation_upgrade",
"retrofitDisplayName": "Insulation upgrade",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is valid. The only matched opportunity is PACE financing, which the packet explicitly says should not be treated as a rebate and has no V2 package or runtime value.",
"recommendedRepair": "Keep no-incentives selected. Represent PACE as financing-only support, not as upfront savings.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "leed_certification",
"retrofitDisplayName": "LEED certification",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": null,
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:4790"
],
"affectedScenarioIds": [],
"explanation": "No scenario is present because this is a non-physical certification/compliance task with unsupported savings. The matched City of San Diego expedited permit program is not a general LEED certification incentive for private projects, and the packet says it should be modeled as CALGreen/sustainable building compliance rather than LEED.",
"recommendedRepair": "Keep excluded from monetary retrofit scenarios. Reclassify the opportunity away from LEED certification unless a separate source-backed LEED-specific record applies.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "microgrid_system",
"retrofitDisplayName": "Microgrid system",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is acceptable from the packet. The only matched opportunity is the Business Energy ITC, but its own blockers say a microgrid match should be limited to qualifying microgrid controllers, not all microgrid infrastructure. No V2 package or alternative scenario is present for a qualifying controller-only scope.",
"recommendedRepair": "Keep no-incentives selected unless the retrofit scope is narrowed to a qualifying microgrid controller. Add a microgrid-controller-specific tax-credit package if that scope is confirmed.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "rooftop_solar_pv",
"retrofitDisplayName": "Rooftop solar PV",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:552"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is valid for the only matched opportunity in the packet. SGIP should not be counted for standalone rooftop solar PV because the packet states standalone rooftop solar is not a general SGIP rebate and solar is supported only where paired with storage under applicable equity offerings.",
"recommendedRepair": "Keep SGIP excluded from standalone rooftop solar PV scenarios. The packet does not list the federal solar ITC as a matched opportunity, so do not invent it in this pass.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "submetering_energy_monitoring",
"retrofitDisplayName": "Submetering / energy monitoring system",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is valid. The only matched opportunity is EV Charging Station Submeter Billing, which is an EV-specific billing option and not a general building energy monitoring or non-EV submetering rebate. Its V2 package is non-monetary workflow and not included in totals.",
"recommendedRepair": "Keep no-incentives selected. Reclassify the matched opportunity as EV charging submeter billing only.",
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
"explanation": "The packet lists thermal energy storage as an eligible category for the Business Energy ITC, but no V2 package summary or alternative scenario is present. Selecting no incentives is therefore not reliably verified.",
"recommendedRepair": "Add a thermal-energy-storage ITC calculation package and scenario candidate, then compare against no-incentives after eligibility and tax treatment are confirmed.",
"needsMathVerificationLater": true
}
],
"summary": {
"retrofitsReviewed": 21,
"highSeverityCount": 0,
"mediumSeverityCount": 8,
"lowSeverityCount": 13,
"noIssueRetrofitCount": 12,
"dataGapRetrofitCount": 8
}
}

