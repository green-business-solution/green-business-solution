{
"schemaVersion": "retrofi_scenario_combination_verification.v1",
"reviewedBy": "gpt_pro",
"testCaseId": "boston-latin-school",
"testCaseOrdinal": 43,
"overallAssessment": "issues_found",
"findings": [
{
"retrofitTypeId": "ev_charger_installation",
"retrofitDisplayName": "EV charger installation",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:22187",
"SOURCE_DSIRE:dsire_program_id:22185",
"SOURCE_DSIRE:dsire_program_id:22186",
"SOURCE_DSIRE:dsire_program_id:22188"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid because no runtime-eligible package is included. However, all four matched MassEVIP opportunities have repaired V2 packages with calculable values, but each is suppressed as not_user_facing_default because required eligibility/cost inputs are populated only by low-confidence placeholders. The packet also lacks stacking/conflict metadata distinguishing public-access, workplace/fleet, fleet, and educational-campus charging paths, so it is not reliable to decide whether one of these should form a selected incentive scenario or whether any pair could stack. Source packet: ",
"recommendedRepair": "Keep the no-incentives runtime scenario until user-facing inputs are collected, but add explicit mutually-exclusive/path-selection metadata among MassEVIP charging programs and request project path inputs such as public access, workplace/fleet use, educational campus use, charger count, charger level, eligible cost, and approval/application status.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "solar_water_heating_system",
"retrofitDisplayName": "Solar water heating system",
"severity": "medium",
"findingType": "missing_compatible_opportunity",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:146",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The no-incentives scenario is internally valid because there are no calculable packages, but opportunity matching is not scenario-reliable. The Renewable Energy Property Tax Exemption should stay excluded because its blockers explicitly say not to match solar water heating or generic solar thermal. MACRS is matched to solar water heating, but there is no V2 package or scenario candidate for it, so the packet cannot verify whether a tax-cost-recovery scenario should have been considered.",
"recommendedRepair": "Remove or suppress the property-tax-exemption opportunity for solar water heating, and add a calculable or explicitly unsupported MACRS package so tax-cost-recovery treatment is handled consistently rather than silently omitted.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "battery_storage_system",
"retrofitDisplayName": "Battery storage system",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:22744",
"SOURCE_DSIRE:dsire_program_id:22037",
"SOURCE_DSIRE:dsire_program_id:146"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is reasonable from the packet. Connected Solutions has a V2 package but is suppressed as not_user_facing_default, depends on demand-response performance inputs, and currently has zero expected recurring value. PACE is financing rather than rebate/grant, and the property-tax exemption only supports co-located storage with qualifying solar or wind, not standalone batteries. No compatible additive opportunity with a runtime-eligible value is shown.",
"recommendedRepair": "Keep the no-incentives selected scenario. Separately, collect demand-response performance inputs for Connected Solutions and co-location/ownership inputs for the property-tax exemption before creating any incentive scenario.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "level_2_ev_charger_installation",
"retrofitDisplayName": "Level 2 EV charger installation",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:22187",
"SOURCE_DSIRE:dsire_program_id:22186",
"SOURCE_DSIRE:dsire_program_id:22188"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid because no package is included in runtime totals. However, three MassEVIP Level 2 opportunities each have nonzero V2 package values but are suppressed as not_user_facing_default due low-confidence placeholder inputs. The packet does not provide conflict metadata indicating whether PAC, Workplace/Fleet, and MUD/Educational Campus are mutually exclusive project pathways or whether any could stack, so the scenario decision cannot be reliably verified.",
"recommendedRepair": "Add explicit MassEVIP path-conflict metadata and collect charger/project-purpose inputs. Once the package is user-facing and project path is known, build candidate scenarios for each eligible MassEVIP path and choose the best compatible one.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "biomass_biogas_energy_system",
"retrofitDisplayName": "Biomass / biogas energy system",
"severity": "medium",
"findingType": "missing_compatible_opportunity",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:2511",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The no-incentives scenario has no internal stacking issue, but both matched opportunities are omitted from scenario construction with no V2 packages. REAP is a loan guarantee and should not be counted as rebate/grant savings, so its exclusion from cash-benefit totals is reasonable. MACRS is a tax cost recovery opportunity matched to biomass/biogas, but no package or explicit unsupported reason is provided, creating an incomplete scenario decision.",
"recommendedRepair": "Keep REAP out of incentive totals unless financing scenarios are modeled separately. Add a MACRS package or explicit unsupported/no-calculable-value status for biomass/biogas so the no-incentives selection can be verified.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "fuel_cell_system",
"retrofitDisplayName": "Fuel cell system",
"severity": "medium",
"findingType": "missing_compatible_opportunity",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:146"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The only matched opportunity is the Renewable Energy Property Tax Exemption, and the opportunity data explicitly includes qualifying fuel cell systems. There is no V2 package, no no-calculable-value explanation, and no scenario candidate for the property-tax incentive, so the selected no-incentives scenario may be missing a compatible incentive opportunity.",
"recommendedRepair": "Add a property-tax-exemption package or explicit unsupported reason for fuel cells, including inputs for qualified fuel cell status, property ownership, statutory energy-use limitation, exemption period, and taxable property value impact.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"retrofitDisplayName": "Ground-source / geothermal heat pump",
"severity": "medium",
"findingType": "missing_compatible_opportunity",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:2511",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid, but the packet does not fully support the omission of matched opportunities. REAP is a loan guarantee and should stay out of cash incentive totals unless financing is modeled. MACRS is matched to geothermal energy property and has no V2 package or explicit no-calculable-value explanation, so a potentially compatible tax-cost-recovery opportunity is omitted from scenario construction.",
"recommendedRepair": "Keep REAP excluded from incentive totals. Add a MACRS calculation package or explicit unsupported status for geothermal heat pump tax-cost-recovery treatment.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "air_sealing_weatherization",
"retrofitDisplayName": "Air sealing / weatherization",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:5712"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is appropriate. LIHEAP is matched, but the opportunity data describes it as low-income household assistance, not a commercial or institutional retrofit program. Its V2 package has no calculable cash value and is not runtime eligible. Excluding it from scenario totals is correct.",
"recommendedRepair": "No scenario repair needed. Consider correcting upstream matching so LIHEAP does not appear as eligible for a public school/institutional weatherization project.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "combined_heat_and_power_system",
"retrofitDisplayName": "Combined heat and power system",
"severity": "medium",
"findingType": "missing_compatible_opportunity",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "MACRS is the only matched opportunity and explicitly lists combined heat and power as an eligible retrofit category. The packet provides no V2 package, no alternative scenario, and no explicit unsupported/no-calculable-value reason. Therefore, the no-incentives selection may be missing a compatible tax-cost-recovery opportunity.",
"recommendedRepair": "Add a MACRS package or explicit unsupported/no-calculable-value status for combined heat and power before final scenario selection.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "fleet_charging_infrastructure",
"retrofitDisplayName": "Fleet charging infrastructure",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:22186"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid because the MassEVIP Workplace and Fleet package is not included in runtime totals. However, the V2 package has a nonzero expected one-time savings value and is suppressed only because required inputs are placeholder/defaulted. Without real inputs for charger level, costs, eligible cost after other funding, and workplace/fleet path, the packet cannot verify whether an incentive scenario should replace no incentives.",
"recommendedRepair": "Collect user-facing fleet charging inputs and promote the package to scenario construction once inputs are reliable. Until then, keep no-incentives selected but flag the retrofit as having a pending calculable opportunity.",
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
"explanation": "The selected no-incentives scenario is appropriate from the packet. The only matched opportunity, MACRS, has blockers stating that generic HVAC replacement is not specially supported as a clean-energy MACRS category. There is no compatible calculable opportunity that should be included.",
"recommendedRepair": "No scenario repair needed. Consider suppressing or marking the MACRS match as ineligible/unsupported for generic high-efficiency HVAC replacement.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "led_lighting_retrofit",
"retrofitDisplayName": "LED lighting retrofit",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is appropriate from the packet. The only matched opportunity, MACRS, has blockers stating that generic LED lighting is not specially supported as a clean-energy MACRS category. No compatible calculable opportunity is shown.",
"recommendedRepair": "No scenario repair needed. Consider suppressing or marking the MACRS match as ineligible/unsupported for generic LED lighting retrofits.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "rooftop_solar_pv",
"retrofitDisplayName": "Rooftop solar PV",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:22770"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is reasonable. The LBE Restoration Grant package is low confidence, human-review required, missing award_probability, and not included in runtime totals. The opportunity is also narrower than generic rooftop solar because it applies to restoration of existing state-owned solar PV or decarbonized systems, which the packet does not establish for this school project.",
"recommendedRepair": "Keep no-incentives selected unless inputs confirm the applicant is an eligible Massachusetts state entity and the project is restoration of an existing qualifying system. If confirmed, create a grant expected-value scenario subject to human review.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "small_wind_turbine",
"retrofitDisplayName": "Small wind turbine",
"severity": "medium",
"findingType": "missing_compatible_opportunity",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "MACRS is the only matched opportunity and lists small wind turbine as an eligible retrofit category. The packet has no V2 package, no alternative scenario, and no explicit no-calculable-value or unsupported reason. Therefore, the selected no-incentives scenario may be missing a compatible tax-cost-recovery opportunity.",
"recommendedRepair": "Add a MACRS package or explicit unsupported/no-calculable-value status for small wind before final scenario selection.",
"needsMathVerificationLater": false
}
],
"summary": {
"retrofitsReviewed": 14,
"highSeverityCount": 0,
"mediumSeverityCount": 9,
"lowSeverityCount": 5,
"noIssueRetrofitCount": 0,
"dataGapRetrofitCount": 3
}
}

