{
"schemaVersion": "retrofi_scenario_combination_verification.v1",
"reviewedBy": "gpt_pro",
"testCaseId": "microsoft-columbia-data-center-quincy",
"testCaseOrdinal": 36,
"overallAssessment": "issues_found",
"findings": [
{
"retrofitTypeId": "led_lighting_retrofit",
"retrofitDisplayName": "LED lighting retrofit",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:2208"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid. The only calculable package is Seattle City Light, but it is not included in runtime totals and is marked not_user_facing_default with placeholder/low-confidence defaults. It also requires qualifying Seattle City Light electric service, while the user profile lists Grant County PUD. Therefore excluding it from the selected scenario is appropriate for this packet. Federal ITC, MACRS, and 179D are matched for discovery but either do not support ordinary standalone LED lighting or lack a calculable runtime package in this packet. Source packet: ",
"recommendedRepair": "Keep Seattle City Light excluded for this Grant County PUD site. Consider repairing the opportunity matching metadata so Seattle City Light is not marked eligible when the customer utility is Grant County PUD.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "biomass_biogas_energy_system",
"retrofitDisplayName": "Biomass / biogas energy system",
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
"explanation": "The selected no-incentives scenario is internally valid because no incentive entries are present. However, the packet matches federal ITC and MACRS to this retrofit, and both opportunity records list compatible clean-energy or biomass/biogas categories. No V2 package summary or alternative scenario exists for either federal tax opportunity, so the selected no-incentives scenario appears incomplete from a scenario-combination perspective. REAP should not be automatically added as a cash incentive because it is a loan guarantee and its rural small business/agricultural-producer requirements are unresolved for this user.",
"recommendedRepair": "Add or repair calculable/non-cash scenario handling for ITC and MACRS where the project qualifies, and keep REAP outside upfront-savings totals unless loan-guarantee handling and borrower eligibility are explicitly modeled.",
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
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid, but the packet matches federal ITC and MACRS, and both list compatible geothermal or ground-source geothermal categories. Since no calculation package or alternative scenario is present for those federal tax opportunities, the no-incentives selection likely omits compatible incentives solely because package support is missing. REAP should not be included by default because it is a loan guarantee and its borrower/rural eligibility requirements are not resolved in the packet.",
"recommendedRepair": "Create or repair scenario packages for ITC and MACRS for qualifying ground-source/geothermal heat pump projects. Model REAP separately from rebates/tax credits and require explicit borrower eligibility before inclusion.",
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
"explanation": "The selected no-incentives scenario is internally valid, but the packet matches the federal ITC, and its eligible retrofit categories include battery storage system. No V2 package or alternative scenario is provided for ITC. Washington C-PACER is also matched, but it is financing, not a rebate/grant/tax credit, and local county adoption is a hard requirement, so it should not be counted as upfront savings without separate financing treatment.",
"recommendedRepair": "Add or repair ITC scenario support for battery storage. Keep C-PACER out of upfront savings totals unless financing scenarios are explicitly represented and local adoption is verified.",
"needsMathVerificationLater": true
},
{
"retrofitTypeId": "combined_heat_and_power_system",
"retrofitDisplayName": "Combined heat and power system",
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
"explanation": "The selected no-incentives scenario has no internal stacking problem, but both matched federal opportunities list combined heat and power as a compatible category. No calculable package or alternative scenario exists for either ITC or MACRS, so the selected no-incentives scenario appears to omit compatible federal tax benefits due to missing package support rather than a stacking conflict.",
"recommendedRepair": "Add or repair scenario packages for ITC and MACRS for qualifying CHP projects, with later math verification for basis, credit, and depreciation treatment.",
"needsMathVerificationLater": true
},
{
"retrofitTypeId": "ev_charger_installation",
"retrofitDisplayName": "EV charger installation",
"severity": "medium",
"findingType": "no_calculable_scenario_but_should_have_one",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:22256"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid, and there are no stacking conflicts because it includes no opportunities. However, the matched Washington Clean Alternative Fuel Commercial Vehicle and Vehicle Infrastructure Tax Credit lists EV charger installation as compatible. No calculation package or alternative scenario is provided, so the selected scenario likely omits a compatible tax credit due to missing package support. The packet also includes hard requirements tying the credit to qualifying commercial vehicle use and Washington plates, so eligibility inputs are needed before a reliable inclusion decision.",
"recommendedRepair": "Add a calculable package or blocked-by-missing-input package for this tax credit, requiring commercial vehicle use and related DOR eligibility inputs before inclusion.",
"needsMathVerificationLater": true
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"retrofitDisplayName": "High-efficiency HVAC replacement",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:658",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid. The two matched federal opportunities both contain blockers stating that ordinary or generic high-efficiency HVAC replacement is not specially supported unless the property independently qualifies as listed clean-energy property. The packet provides no such qualifying property facts and no calculation package, so excluding these opportunities from the scenario is appropriate.",
"recommendedRepair": "No scenario-combination repair needed. Improve upstream matching so generic HVAC replacement is not shown as eligible for ITC or MACRS unless the project is a qualifying clean-energy property type.",
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
"explanation": "The selected no-incentives scenario is internally valid, but both federal ITC and MACRS are matched and list solar water heating system as a compatible category. No V2 package or alternative scenario is present for either opportunity, so the no-incentives selection likely omits compatible federal tax benefits due to missing calculable package support.",
"recommendedRepair": "Add or repair ITC and MACRS scenario package support for qualifying solar water heating systems, then verify federal tax math in the later dollar-math pass.",
"needsMathVerificationLater": true
},
{
"retrofitTypeId": "energy_management_system",
"retrofitDisplayName": "Energy management system",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:2208"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid. The only matched opportunity is Seattle City Light, but its hard requirements require qualifying Seattle City Light electric service, while the user profile lists Grant County PUD. Its package is also not included in runtime totals and is marked not_user_facing_default with placeholder defaults. Excluding it is therefore appropriate.",
"recommendedRepair": "Keep the selected no-incentives scenario. Repair utility eligibility metadata so Seattle City Light does not match Grant County PUD customers as eligible.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"retrofitDisplayName": "High-efficiency refrigeration equipment",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:2208"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid. Seattle City Light is the only matched opportunity and has a package, but it is not included in runtime totals and is marked not_user_facing_default. More importantly, its hard requirements require qualifying Seattle City Light electric service, while this site reports Grant County PUD service. Exclusion is appropriate.",
"recommendedRepair": "Keep Seattle City Light excluded. Repair opportunity eligibility so this utility-restricted program does not appear eligible for Grant County PUD customers.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "level_2_ev_charger_installation",
"retrofitDisplayName": "Level 2 EV charger installation",
"severity": "medium",
"findingType": "no_calculable_scenario_but_should_have_one",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:22256"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid, but the matched Washington Clean Alternative Fuel Commercial Vehicle and Vehicle Infrastructure Tax Credit lists EV charger installation as compatible. The opportunity notes also say not to treat it as Level 2-specific, so the generic infrastructure match can be relevant, but no calculation package or alternative scenario is present. Eligibility still depends on qualifying commercial vehicle use and other DOR requirements, so the packet lacks enough modeled inputs to include it reliably.",
"recommendedRepair": "Add a package that either calculates the tax credit or blocks it on missing commercial-vehicle-use inputs. Avoid labeling the incentive as Level 2-specific unless source data supports that specificity.",
"needsMathVerificationLater": true
},
{
"retrofitTypeId": "microgrid_system",
"retrofitDisplayName": "Microgrid system",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:658"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid. The only matched opportunity is federal ITC, but its blocker says a microgrid match should be limited to qualifying microgrid controllers, not all microgrid infrastructure. The retrofit is a broad microgrid system, and the packet provides no fact that the scope is limited to a qualifying microgrid controller. Exclusion is appropriate based on the packet.",
"recommendedRepair": "Keep broad microgrid system excluded from ITC scenario totals unless project inputs identify a qualifying microgrid controller. Consider adding a more specific retrofit/category mapping for microgrid controllers.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "small_wind_turbine",
"retrofitDisplayName": "Small wind turbine",
"severity": "medium",
"findingType": "no_calculable_scenario_but_should_have_one",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid, but MACRS is matched and lists small wind turbine as a compatible category. No calculation package or alternative scenario is provided, so the selected no-incentives scenario appears incomplete due to missing federal depreciation scenario support.",
"recommendedRepair": "Add or repair MACRS scenario handling for eligible depreciable small wind turbine property.",
"needsMathVerificationLater": true
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
"explanation": "The selected no-incentives scenario is internally valid, but the federal ITC is matched and lists thermal energy storage as a compatible category. No V2 package or alternative scenario is present for ITC, so the no-incentives selection likely omits a compatible federal tax benefit due to missing package support.",
"recommendedRepair": "Add or repair ITC scenario package support for qualifying thermal energy storage.",
"needsMathVerificationLater": true
}
],
"summary": {
"retrofitsReviewed": 14,
"highSeverityCount": 0,
"mediumSeverityCount": 9,
"lowSeverityCount": 5,
"noIssueRetrofitCount": 1,
"dataGapRetrofitCount": 0
}
}

