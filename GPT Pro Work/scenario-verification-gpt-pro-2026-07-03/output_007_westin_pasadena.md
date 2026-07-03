{
"schemaVersion": "retrofi_scenario_combination_verification.v1",
"reviewedBy": "gpt_pro",
"testCaseId": "westin-pasadena",
"testCaseOrdinal": 7,
"overallAssessment": "issues_found",
"findings": [
{
"retrofitTypeId": "ev_charger_installation",
"retrofitDisplayName": "EV charger installation",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:22289",
"SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-605",
"SOURCE_DSIRE:dsire_program_id:22629",
"SOURCE_DSIRE:dsire_program_id:22278",
"SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-603"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is defensible from the scenario list because every matched EV package is excluded from runtime totals due to missing inputs, low confidence, no calculable value, or not-user-facing-default status. However, several matched opportunities appear materially off-profile or lane-specific: the Azusa rebate requires an Azusa account/residential service address, RECESS is tied to school-bus infrastructure, and NEVI/GFO-25-603 are public DC fast-charging solicitations rather than ordinary hotel/workplace Level 2 charging. The packet has no stacking/conflict metadata and no alternative candidate scenarios, so the selected no-incentives scenario can be accepted only as a runtime-suppression result, not as a reliable eligibility/stacking decision. ",
"recommendedRepair": "Add explicit opportunity applicability filters and scenario metadata for generic commercial Level 2 charging versus public DCFC, school-bus, residential Azusa, and competitive-grant lanes. Keep excluded/suppressed opportunities out of selected totals unless the missing inputs and applicability conditions are resolved.",
"needsMathVerificationLater": false
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
"explanation": "The matched opportunities include the Business Energy Investment Tax Credit with ground_source_geothermal_heat_pump in its eligible retrofit categories and MACRS with geothermal_energy_property in its eligible retrofit categories. Yet v2PackageSummaries is empty and the only scenario is no incentives. This is not a stacking conflict; it is a missing calculable-package/scenario construction gap for two potentially additive federal tax benefits. USDA REAP and PACE are less certain because REAP requires rural/agricultural eligibility and PACE is financing rather than a direct incentive.",
"recommendedRepair": "Create or attach calculation packages and scenario candidates for ITC and MACRS where the geothermal property qualifies. Add dependency metadata for tax basis interactions and any ITC/MACRS ordering rules, and keep REAP/PACE as separate financing/eligibility-gated opportunities unless project facts support them.",
"needsMathVerificationLater": true
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"retrofitDisplayName": "High-efficiency HVAC replacement",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:658",
"SOURCE_DSIRE:dsire_program_id:22067",
"SOURCE_DSIRE:dsire_program_id:3527",
"SOURCE_DSIRE:dsire_program_id:676",
"SOURCE_DSIRE:dsire_program_id:3260"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "No-incentives selection is acceptable for this pass. The PWP rebate has a calculable package but is not user-facing by default and not included in runtime totals. PSREC is source-inaccessible and also appears utility-mismatched because the user is in Pasadena Water and Power territory while PSREC requires a PSREC commercial or irrigation customer. ITC and MACRS explicitly caution that ordinary high-efficiency HVAC replacement is not supported unless the property independently qualifies as listed energy property. PACE is financing only.",
"recommendedRepair": "Do not add the suppressed PWP or PSREC packages to the selected scenario until user-facing/default and utility/applicability rules are resolved. Maintain exclusions for ITC/MACRS ordinary HVAC and PACE financing from direct incentive totals.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "led_lighting_retrofit",
"retrofitDisplayName": "LED lighting retrofit",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:658",
"SOURCE_DSIRE:dsire_program_id:22067",
"SOURCE_DSIRE:dsire_program_id:676",
"SOURCE_DSIRE:dsire_program_id:3260",
"SOURCE_DSIRE:dsire_program_id:1271"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "No-incentives selection is acceptable for this pass. The PWP rebate package is calculable but marked not_user_facing_default and excluded from runtime totals. PSREC is source-inaccessible and utility-mismatched. ITC and MACRS caution against generic LED lighting. The 179D opportunity is valid only as part of certified qualifying interior lighting, whole-building, or retrofit-property savings calculation, not a simple additive LED rebate.",
"recommendedRepair": "Keep the selected no-incentives scenario unless PWP is promoted to a user-facing/default package or a certified 179D scenario is separately modeled with required dependencies.",
"needsMathVerificationLater": false
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
"explanation": "The ITC matched opportunity explicitly lists battery_storage_system as an eligible retrofit category, but the only v2 package is for MCE Feed-In Tariff Plus and is not included in runtime totals. The MCE opportunity should remain excluded for standalone storage because its own blockers state not to match standalone battery storage. PACE is financing only. The absence of an ITC calculable package or candidate scenario appears to prevent a valid scenario decision.",
"recommendedRepair": "Add an ITC calculation package and scenario candidate for qualifying battery storage. Keep MCE FIT Plus out of standalone battery scenarios unless paired with eligible wholesale solar-plus-storage generation, and keep PACE as financing-only.",
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
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The ITC opportunity lists qualified_biogas_property and the MACRS opportunity lists biomass_biogas_energy_system, but the only v2 package is for MCE FIT Plus and is excluded from runtime totals. The MCE package may be relevant only for wholesale generation projects and not ordinary building retrofits. REAP has rural/agricultural eligibility conditions. The selected no-incentives scenario therefore misses likely federal tax-credit/depreciation scenario candidates if the project is qualifying biogas property.",
"recommendedRepair": "Create ITC and MACRS scenario candidates for qualifying biogas/biomass energy property, with explicit qualification gates. Keep MCE FIT Plus separate as a wholesale generation tariff and REAP as rural/agricultural/loan-guarantee gated.",
"needsMathVerificationLater": true
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
"explanation": "The matched ITC opportunity includes solar_water_heating_system and solar_thermal_energy_property, and MACRS includes solar_water_heating_system, but there are no v2 packages and no incentive scenarios. This looks like a missing federal tax scenario construction gap rather than a valid no-incentives outcome.",
"recommendedRepair": "Add ITC and MACRS package support and candidate scenarios for qualifying commercial solar water heating property, with any tax-basis and ordering dependencies represented before combining them.",
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
"explanation": "The ITC and MACRS matched opportunities both list combined_heat_and_power_system in eligible retrofit categories, but v2PackageSummaries is empty and no scenario candidate includes either opportunity. The selected no-incentives scenario is therefore not reliable for this retrofit.",
"recommendedRepair": "Add calculation packages and scenario candidates for qualifying CHP under ITC and MACRS. Include stacking/order metadata for tax-credit and depreciation interactions.",
"needsMathVerificationLater": true
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"retrofitDisplayName": "Heat pump HVAC retrofit",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:22067",
"SOURCE_DSIRE:dsire_program_id:3260"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is acceptable because the only local utility package with a calculated amount, PWP, is marked not_user_facing_default and excluded from runtime totals. PSREC is source-inaccessible and requires a PSREC commercial or irrigation customer, which conflicts with the user's PWP utility profile.",
"recommendedRepair": "Keep PSREC excluded for this user. Consider promoting the PWP package into a user-facing candidate only after measure selection and package-default confidence issues are resolved.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "heat_pump_water_heater",
"retrofitDisplayName": "Heat pump water heater",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:22067",
"SOURCE_DSIRE:dsire_program_id:3260"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is acceptable for this pass. PWP is calculable but not_user_facing_default and excluded from runtime totals. PSREC is source-inaccessible and requires a PSREC commercial or irrigation customer, while the user profile reports Pasadena Water and Power.",
"recommendedRepair": "Keep PSREC excluded. Add or promote a PWP scenario only when the package is intended to be user-facing and the measure/default input confidence is adequate.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "level_2_ev_charger_installation",
"retrofitDisplayName": "Level 2 EV charger installation",
"severity": "low",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:22289"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "PWP's commercial charger incentive appears compatible with the user's PWP commercial profile and Level 2 EV charger retrofit, but the package is blocked by missing charger_and_site_category and is excluded from runtime totals. No alternative scenario is listed. No-incentives is therefore acceptable as a missing-input result, but not as a final scenario decision.",
"recommendedRepair": "Collect charger/site category inputs and create a PWP rebate scenario candidate once the measure catalog row is resolved. Do not include the rebate in selected totals while the missing input remains unresolved.",
"needsMathVerificationLater": true
},
{
"retrofitTypeId": "cooling_tower_controls_optimization",
"retrofitDisplayName": "Cooling tower controls / optimization",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3260"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "PWP is the only matched opportunity and it is marked calculable but not_user_facing_default and excluded from runtime totals. With no user-facing package or alternative scenario, selected no-incentives is valid for runtime scenario construction.",
"recommendedRepair": "No scenario repair required unless PWP's package is intentionally promoted into user-facing/default scenario generation.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "high_efficiency_commercial_dishwasher",
"retrofitDisplayName": "High-efficiency commercial dishwasher",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3260"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "PWP is the only matched opportunity and the v2 package is not_user_facing_default and excluded from runtime totals. No stacking or duplicate issue is visible in the scenario list.",
"recommendedRepair": "No scenario repair required unless the suppressed PWP package should become user-facing.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "high_efficiency_fryer",
"retrofitDisplayName": "High-efficiency fryer",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3260"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "PWP is the only matched opportunity and the v2 package is not_user_facing_default and excluded from runtime totals. The selected no-incentives scenario is internally valid.",
"recommendedRepair": "No scenario repair required unless the suppressed PWP package should become user-facing.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "high_efficiency_laundry_equipment",
"retrofitDisplayName": "High-efficiency laundry equipment",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3260"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "PWP is the only matched opportunity and the v2 package is not_user_facing_default and excluded from runtime totals. The selected no-incentives scenario is internally valid.",
"recommendedRepair": "No scenario repair required unless the suppressed PWP package should become user-facing.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "high_efficiency_oven",
"retrofitDisplayName": "High-efficiency oven",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3260"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "PWP is the only matched opportunity and the v2 package is not_user_facing_default and excluded from runtime totals. The selected no-incentives scenario is internally valid.",
"recommendedRepair": "No scenario repair required unless the suppressed PWP package should become user-facing.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"retrofitDisplayName": "High-efficiency refrigeration equipment",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3260"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "PWP is the only matched opportunity and the v2 package is not_user_facing_default and excluded from runtime totals. The selected no-incentives scenario is internally valid.",
"recommendedRepair": "No scenario repair required unless the suppressed PWP package should become user-facing.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "high_efficiency_steamer",
"retrofitDisplayName": "High-efficiency steamer",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3260"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "PWP is the only matched opportunity and the v2 package is not_user_facing_default and excluded from runtime totals. The selected no-incentives scenario is internally valid.",
"recommendedRepair": "No scenario repair required unless the suppressed PWP package should become user-facing.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "induction_cooking_equipment",
"retrofitDisplayName": "Induction cooking equipment",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3260"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "PWP is the only matched opportunity and the v2 package is not_user_facing_default and excluded from runtime totals. The selected no-incentives scenario is internally valid.",
"recommendedRepair": "No scenario repair required unless the suppressed PWP package should become user-facing.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "insulation_upgrade",
"retrofitDisplayName": "Insulation upgrade",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3527"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Only PACE financing is matched. The opportunity itself warns that it is financing, not a rebate, and product matches should be represented as financing only unless a local administrator verifies the measure. Excluding it from direct savings scenarios is appropriate.",
"recommendedRepair": "No repair required for direct incentive scenario construction. Track PACE separately as financing if the product supports financing scenarios.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "leed_certification",
"retrofitDisplayName": "LEED certification",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": null,
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:4790"
],
"affectedScenarioIds": [],
"explanation": "This retrofit is unsupported and has no scenarios. The matched San Diego expedited permit program is not a direct equipment rebate and the blockers say it should not be treated as a general LEED certification match. No calculable scenario is expected from the packet.",
"recommendedRepair": "No scenario-combination repair required. Consider removing or narrowing the opportunity match outside this pass.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "lighting_controls_retrofit",
"retrofitDisplayName": "Lighting controls retrofit",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3260"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "PWP is the only matched opportunity and the v2 package is not_user_facing_default and excluded from runtime totals. The selected no-incentives scenario is internally valid.",
"recommendedRepair": "No scenario repair required unless the suppressed PWP package should become user-facing.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "microgrid_system",
"retrofitDisplayName": "Microgrid system",
"severity": "medium",
"findingType": "no_calculable_scenario_but_should_have_one",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:658"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The ITC matched opportunity includes microgrid_controller as an eligible category and its blocker says the match should be limited to qualifying microgrid controllers, not all microgrid infrastructure. There is no v2 package and no scenario candidate. The packet does not establish whether the proposed microgrid system includes a qualifying microgrid controller, so the selected no-incentives scenario is not reliably verifiable.",
"recommendedRepair": "Add a dependency gate distinguishing qualifying microgrid controller costs from broader microgrid infrastructure. Generate an ITC scenario only for the qualifying controller portion when the input is available.",
"needsMathVerificationLater": true
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
"explanation": "MACRS is matched and lists small_wind_turbine as an eligible retrofit category, but no v2 package or nonzero incentive/tax scenario exists. Based on the packet, a MACRS depreciation scenario candidate appears to be missing.",
"recommendedRepair": "Add a MACRS calculation package and scenario candidate for depreciable qualifying small wind turbine property, with tax basis inputs and eligibility gates.",
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
"explanation": "The ITC matched opportunity explicitly lists thermal_energy_storage as an eligible retrofit category, but there is no v2 package and no candidate scenario. The selected no-incentives scenario therefore appears incomplete.",
"recommendedRepair": "Add an ITC calculation package and candidate scenario for qualifying thermal energy storage property, including any required eligibility and placed-in-service inputs.",
"needsMathVerificationLater": true
},
{
"retrofitTypeId": "window_film_shading_retrofit",
"retrofitDisplayName": "Window film / shading retrofit",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3260"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "PWP is the only matched opportunity and the v2 package is not_user_facing_default and excluded from runtime totals. The matched opportunity supports window film but not window replacement, so the selected no-incentives scenario is acceptable unless the suppressed PWP package is promoted.",
"recommendedRepair": "No scenario repair required unless the suppressed PWP package should become user-facing for qualifying window film/shading measures.",
"needsMathVerificationLater": false
}
],
"summary": {
"retrofitsReviewed": 26,
"highSeverityCount": 0,
"mediumSeverityCount": 10,
"lowSeverityCount": 16,
"noIssueRetrofitCount": 2,
"dataGapRetrofitCount": 3
}
}

