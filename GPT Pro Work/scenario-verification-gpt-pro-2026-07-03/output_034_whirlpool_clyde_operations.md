{
"schemaVersion": "retrofi_scenario_combination_verification.v1",
"reviewedBy": "gpt_pro",
"testCaseId": "whirlpool-clyde-operations",
"testCaseOrdinal": 34,
"overallAssessment": "inconclusive_due_to_data_gaps",
"findings": [
{
"retrofitTypeId": "biomass_biogas_energy_system",
"retrofitDisplayName": "Biomass / biogas energy system",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:5313",
"SOURCE_DSIRE:dsire_program_id:2511",
"SOURCE_DSIRE:dsire_program_id:78",
"SOURCE_DSIRE:dsire_program_id:676",
"SOURCE_DSIRE:dsire_program_id:3554"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid and does not stack conflicting opportunities because it includes none. However, the packet lists several matched opportunities with hard requirements or blockers that materially affect whether any should be user-facing or scenario-eligible: USDA 5313 requires a qualifying commercial-scale biorefinery or biobased manufacturing facility and says generic biomass systems should not match; REAP requires agricultural-producer or rural-small-business eligibility; CAIP says general biomass is unsupported unless independently qualifying; SEID/PACE requires a valid Ohio special energy improvement district; MACRS is tax cost recovery rather than a rebate. No V2 package summaries or alternative scenarios are provided, so the packet does not show whether these exclusions are intentional because no calculable package exists, because they are blocked, or because package coverage is missing. ",
"recommendedRepair": "Add V2 package status for each matched opportunity, including whether it is unsupported, suppressed, blocked by missing eligibility inputs, or intentionally excluded as non-user-facing financing/tax treatment. Also capture eligibility facts needed for USDA REAP, USDA biorefinery, CAIP, MACRS, and local SEID/PACE before deciding whether any calculable scenario should exist.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"retrofitDisplayName": "Ground-source / geothermal heat pump",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:2511",
"SOURCE_DSIRE:dsire_program_id:676",
"SOURCE_DSIRE:dsire_program_id:3554"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid and contains no invalid stack. The packet supports geothermal matches in REAP, MACRS, and Ohio SEID/PACE categories, but each has gating requirements or non-rebate treatment: REAP requires agricultural-producer or rural-small-business status, MACRS requires depreciable qualifying clean-energy property, and SEID/PACE requires location in a valid Ohio special energy improvement district. Because no V2 package summaries or alternative scenarios are present, it is not possible to verify whether no-incentives is the correct scenario or whether compatible additive financing/tax opportunities were properly excluded.",
"recommendedRepair": "Add package-level inclusion/exclusion reasons for REAP, MACRS, and SEID/PACE. Add user/site facts needed to test rural-small-business or agricultural-producer status, depreciable property assumptions, and valid Ohio SEID location.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "battery_storage_system",
"retrofitDisplayName": "Battery storage system",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:78",
"SOURCE_DSIRE:dsire_program_id:3554"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario appears valid for scenario-combination purposes. Both matched battery-storage opportunities state blockers: CAIP says standalone battery storage is not supported by the current guidelines searched, and Ohio SEID/PACE says battery storage is not supported by the reviewed statutory definition unless a local district independently documents eligibility. Since there are no alternative scenarios and no included packages, there is no evidence of a missed compatible calculable opportunity.",
"recommendedRepair": "Keep CAIP and SEID/PACE battery-storage opportunities out of calculable scenarios unless additional source-backed local-district or Air Quality Facility evidence is added. Consider downgrading or suppressing these matches rather than showing them as ordinary eligible opportunities.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "led_lighting_retrofit",
"retrofitDisplayName": "LED lighting retrofit",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:676",
"SOURCE_DSIRE:dsire_program_id:77"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario appears valid for scenario-combination purposes. MACRS explicitly blocks generic LED lighting as a specially supported clean-energy MACRS category, and the Ohio Energy Conversion and Thermal Efficiency Sales Tax Exemption says LED lighting retrofits are not supported as a general category. There is no listed alternative scenario or V2 package that should have been selected instead.",
"recommendedRepair": "Keep these opportunities excluded from LED lighting calculable scenarios unless the project is reframed with source-backed qualifying clean-energy property or qualifying statutory energy-conversion or thermal-efficiency facility facts.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "small_wind_turbine",
"retrofitDisplayName": "Small wind turbine",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:4217",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid and contains no invalid stack. The Ohio small-project property tax exemption appears technology-matched for wind but requires aggregate nameplate capacity of 250 kW or less, and MACRS may apply only if the property qualifies for depreciable clean-energy treatment. The packet gives no wind-system capacity, tax basis, or V2 package status, so it cannot be determined whether no-incentives is correct or whether a compatible additive tax treatment/property-tax exemption scenario should have been considered.",
"recommendedRepair": "Add required wind capacity and package status for the Ohio 250 kW-or-less property tax exemption. Add MACRS package status and any stacking metadata between property tax exemption and depreciation treatment.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "solar_water_heating_system",
"retrofitDisplayName": "Solar water heating system",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:676",
"SOURCE_DSIRE:dsire_program_id:3554"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid and contains no invalid stack. Both MACRS and Ohio SEID/PACE list solar water heating or solar thermal categories as potentially eligible, but MACRS depends on tax and qualified-property facts, while SEID/PACE requires a valid local special energy improvement district. No V2 package summaries, local-district facts, or alternative scenarios are provided, so the packet does not establish whether the no-incentives scenario is correct or whether compatible additive opportunities are missing.",
"recommendedRepair": "Add V2 package summaries and missing eligibility inputs for MACRS and SEID/PACE. Include stacking metadata showing whether financing/tax-cost-recovery opportunities may be combined or should remain non-calculable/non-user-facing.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "combined_heat_and_power_system",
"retrofitDisplayName": "Combined heat and power system",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid. MACRS is the only matched opportunity and includes combined heat and power as a potentially eligible category, but it is tax cost recovery rather than a rebate and depends on depreciable property, placed-in-service date, basis, and current tax requirements. Without a V2 package summary, the packet does not show whether MACRS was correctly excluded as non-calculable or whether a calculable tax scenario is missing.",
"recommendedRepair": "Add MACRS package status for combined heat and power, including whether the opportunity is intentionally non-user-facing, unsupported by current calculators, or blocked by missing tax inputs.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "engineering_feasibility_study",
"retrofitDisplayName": "Engineering feasibility study",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": null,
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:5313"
],
"affectedScenarioIds": [],
"explanation": "No scenario is present because the retrofit is non-physical and unsupported without modeled savings input. That exclusion is consistent with the opportunity blocker stating that standalone engineering feasibility studies are not a source-backed retrofit category for the USDA biorefinery assistance program.",
"recommendedRepair": "Keep this out of calculable scenarios unless it is tied to a qualifying commercial-scale biorefinery or biobased product manufacturing project and a source-backed calculation package exists.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"retrofitDisplayName": "High-efficiency HVAC replacement",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario appears valid for scenario-combination purposes. MACRS is the only matched opportunity, and its blockers state that ordinary HVAC replacement is not a specially supported clean-energy MACRS category. There is no listed compatible alternative scenario.",
"recommendedRepair": "Keep generic high-efficiency HVAC replacement out of MACRS calculable scenarios unless the project is reclassified with source-backed qualifying clean-energy property facts.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"retrofitDisplayName": "High-efficiency refrigeration equipment",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:77"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario appears valid for scenario-combination purposes. The Ohio Energy Conversion and Thermal Efficiency Sales Tax Exemption explicitly says ordinary refrigeration equipment is not eligible merely because refrigeration is mentioned and that generic refrigeration should not match unless tied to a qualifying waste-heat or energy-conversion facility.",
"recommendedRepair": "Keep this opportunity excluded from refrigeration calculable scenarios unless the project includes source-backed qualifying waste-heat recovery, energy-conversion, or thermal-efficiency facility facts.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "leed_certification",
"retrofitDisplayName": "LEED certification",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": null,
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:2809"
],
"affectedScenarioIds": [],
"explanation": "No scenario is present because the item is a non-physical certification/compliance task and the savings preview is unsupported without resulting modeled savings input. The matched Cincinnati opportunity is residential-focused, requires a qualifying Cincinnati residential project, and is not a direct retrofit incentive for this Ohio industrial manufacturing site.",
"recommendedRepair": "Keep this out of calculable scenarios for this industrial Clyde site. Suppress or mark the Cincinnati LEED/property-tax-abatement opportunity as inapplicable unless project location and residential eligibility are satisfied.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "rooftop_solar_pv",
"retrofitDisplayName": "Rooftop solar PV",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3554"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid and contains no invalid stack. The Ohio SEID/PACE opportunity lists rooftop solar PV as an eligible category, but it requires the project to be located in a valid Ohio special energy improvement district and must not be treated as an automatic statewide rebate. The packet lacks local SEID confirmation and V2 package status, so it cannot be verified whether no-incentives is correct or whether a non-rebate financing scenario should have been considered.",
"recommendedRepair": "Add local SEID/PACE jurisdiction verification and package status. Mark the opportunity as non-calculable financing unless RetroFi has a supported PACE calculator and confirmed district eligibility.",
"needsMathVerificationLater": false
}
],
"summary": {
"retrofitsReviewed": 12,
"highSeverityCount": 0,
"mediumSeverityCount": 6,
"lowSeverityCount": 6,
"noIssueRetrofitCount": 0,
"dataGapRetrofitCount": 6
}
}

