{
"schemaVersion": "retrofi_scenario_combination_verification.v1",
"reviewedBy": "gpt_pro",
"testCaseId": "boeing-everett-factory",
"testCaseOrdinal": 31,
"overallAssessment": "issues_found",
"findings": [
{
"retrofitTypeId": "biomass_biogas_energy_system",
"retrofitDisplayName": "Biomass / biogas energy system",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:5313",
"SOURCE_DSIRE:dsire_program_id:2511",
"SOURCE_DSIRE:dsire_program_id:576",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is internally valid for this pass because none of the matched opportunities has a calculable runtime package in the packet. Loan guarantees and MACRS are not direct rebate/grant savings, and the WA renewable sales/use tax opportunity may only apply to biomass/biogas electric generation, not generic thermal biomass systems. No alternative scenario is listed. Citation: ",
"recommendedRepair": "No scenario-combination repair needed. Keep non-calculable loan guarantee, tax cost recovery, and conditional renewable-electric opportunities out of runtime totals unless a supported calculation package and project-specific eligible equipment facts are added.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"retrofitDisplayName": "Ground-source / geothermal heat pump",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:2511",
"SOURCE_DSIRE:dsire_program_id:576",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The no-incentives selection is appropriate from a scenario-combination standpoint. REAP is a loan guarantee with agricultural-producer/rural-small-business requirements, the WA renewable sales/use tax record explicitly blocks ground-source geothermal heat pumps because current guidance supports renewable electric generation equipment, and MACRS is tax cost recovery without a calculable package.",
"recommendedRepair": "Do not include these opportunities in a default upfront-savings scenario unless the project is proven eligible and a supported calculation package exists. The WA renewable sales/use tax opportunity should remain excluded for ground-source heat pump HVAC.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"retrofitDisplayName": "High-efficiency HVAC replacement",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:2239",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "No stacking problem is present because the selected scenario contains no incentives. Snohomish PUD has a matched package, but the package is not user-facing by default, is excluded from runtime totals, and relies on placeholder defaults. MACRS also should not be included for generic HVAC replacement because its own blockers say ordinary HVAC replacement is not specially supported clean-energy MACRS property.",
"recommendedRepair": "Keep the selected no-incentives scenario for default runtime totals. Preserve the Snohomish PUD package as suppressed/not-user-facing until real measure type, size, savings, and preapproval inputs are available.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"retrofitDisplayName": "High-efficiency refrigeration equipment",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:2239",
"SOURCE_DSIRE:dsire_program_id:2208"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is defensible only because both calculable packages are not user-facing by default and excluded from runtime totals. However, the Seattle City Light opportunity has an internal data conflict: matchedReasons say no utility restriction was found, while hardRequirements say the customer must have qualifying Seattle City Light electric service. The user profile identifies Snohomish PUD electric service, so Seattle City Light should not be treated as compatible unless service territory facts are repaired. This blocks reliable scenario construction if suppressed packages are later enabled.",
"recommendedRepair": "Correct the Seattle City Light opportunity match/utility restriction for this site. For this user, exclude Seattle City Light from scenarios unless qualifying Seattle City Light electric service is established. Continue suppressing both rebate packages from default totals until real measure and preapproval inputs are available.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "led_lighting_retrofit",
"retrofitDisplayName": "LED lighting retrofit",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:2208",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is acceptable for current runtime totals because the Seattle City Light package is suppressed/not-user-facing and MACRS blocks generic LED lighting. However, Seattle City Light is internally inconsistent for this site: hardRequirements require qualifying Seattle City Light electric service, while the user profile shows Snohomish PUD electric service. This utility mismatch means the matched Seattle City Light opportunity should not be considered a compatible additive incentive without repaired utility data.",
"recommendedRepair": "Remove or downgrade the Seattle City Light match for this Snohomish PUD site unless qualifying Seattle City Light service is verified. Do not include MACRS for generic LED lighting.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "rooftop_solar_pv",
"retrofitDisplayName": "Rooftop solar PV",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:576"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "No scenario-combination issue can be identified from the packet. The WA renewable sales/use tax exemption appears technology-compatible with rooftop solar PV, but no calculable package or alternative scenario is provided, so the selected no-incentives scenario is internally valid for runtime totals.",
"recommendedRepair": "No combination repair needed. Add a supported calculation package for the WA renewable sales/use tax exemption if RetroFi intends to model this opportunity for rooftop solar PV.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "solar_water_heating_system",
"retrofitDisplayName": "Solar water heating system",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:576",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is appropriate. The WA renewable sales/use tax opportunity explicitly says solar water heating is not supported by current official renewable electricity equipment guidance. MACRS has no calculable scenario package and is tax cost recovery rather than a direct upfront incentive.",
"recommendedRepair": "Keep WA renewable sales/use tax exemption excluded for solar water heating. Do not add MACRS to runtime savings unless a supported tax-benefit package is intentionally modeled outside rebate/grant totals.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "anti_sweat_heater_controls",
"retrofitDisplayName": "Anti-sweat heater controls",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:2239"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "No stacking or selection issue is present. Snohomish PUD is compatible with the user's electric utility and the retrofit category, but the only package is not user-facing by default, excluded from runtime totals, and relies on low-confidence placeholder inputs. Therefore the selected no-incentives scenario is valid for this pass.",
"recommendedRepair": "Keep the Snohomish PUD rebate excluded from default totals until real measure, unit count/size, savings, and preapproval inputs are available.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "combined_heat_and_power_system",
"retrofitDisplayName": "Combined heat and power system",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "No scenario-combination issue is visible. The only matched opportunity is MACRS, which is tax cost recovery and has no calculable package in the packet. No alternative scenario is listed.",
"recommendedRepair": "No combination repair needed. Add a dedicated MACRS/tax-cost-recovery scenario only if RetroFi intentionally models tax benefits separately from direct incentive totals.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "energy_management_system",
"retrofitDisplayName": "Energy management system",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:2208"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is acceptable only because the Seattle City Light package is suppressed/not-user-facing and excluded from runtime totals. The opportunity itself is not reliably compatible: hardRequirements require qualifying Seattle City Light electric service, while the user profile identifies Snohomish PUD electric service. This prevents reliable scenario inclusion if suppressed packages are later enabled.",
"recommendedRepair": "Repair the Seattle City Light utility eligibility data. Exclude this opportunity for the Snohomish PUD site unless qualifying City Light service is established.",
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
"explanation": "No calculable scenario is present, which is appropriate. The matched USDA opportunity explicitly blocks standalone engineering feasibility studies as not source-backed for this opportunity, and the retrofit is non-physical/unsupported without modeled resulting savings.",
"recommendedRepair": "Keep this out of calculated scenarios unless the feasibility study is tied to an eligible commercial-scale biorefinery or qualifying manufacturing facility project with supported modeled savings.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"retrofitDisplayName": "Heat pump HVAC retrofit",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:2239"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "No scenario-combination issue is present. Snohomish PUD appears compatible with the user and retrofit category, but the calculation package is not user-facing by default, excluded from runtime totals, and relies on low-confidence placeholder inputs. No alternative scenario is listed.",
"recommendedRepair": "Keep no-incentives selected for default totals. Enable a Snohomish PUD scenario only when project-specific measure, size, savings, and preapproval inputs are available.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "insulation_upgrade",
"retrofitDisplayName": "Insulation upgrade",
"severity": "low",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:2239"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives is valid for runtime totals because the Snohomish PUD package is suppressed/not-user-facing. A data gap remains for eligibility: the opportunity's blockers and hardRequirements say windows and insulation apply to electrically heated facilities, but the user profile does not establish the facility heating fuel or electrically heated status.",
"recommendedRepair": "Keep the rebate excluded from default scenarios until electrically heated facility status and required measure inputs are verified.",
"needsMathVerificationLater": false
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
"explanation": "No combination issue is visible. The only matched opportunity is MACRS, which is tax cost recovery and has no calculable package. No alternative scenario is listed.",
"recommendedRepair": "No combination repair needed. Add a separate supported tax-benefit calculation only if RetroFi intends to model MACRS.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"retrofitDisplayName": "Smart thermostat / zoning retrofit",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:2239"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "No scenario-combination issue is present. Snohomish PUD appears compatible with the user's utility and retrofit category, but its package is not user-facing by default, excluded from runtime totals, and dependent on placeholder inputs. No alternative scenario is listed.",
"recommendedRepair": "Keep no-incentives selected until real project inputs and preapproval status are available for a user-facing Snohomish PUD rebate scenario.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "waste_heat_recovery",
"retrofitDisplayName": "Waste heat recovery",
"severity": "low",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:2239"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives is valid for runtime totals because the Snohomish PUD package is suppressed/not-user-facing. However, the opportunity reasoning notes caution that heat recovery should be interpreted as heat-recovery ventilation or approved custom savings, not generic industrial waste-heat recovery without review. The packet does not establish whether this waste heat recovery project is an approved custom savings measure.",
"recommendedRepair": "Keep the opportunity out of default totals until the project is confirmed as a Snohomish PUD-approved custom measure or otherwise mapped to a supported rebate category with required inputs.",
"needsMathVerificationLater": false
}
],
"summary": {
"retrofitsReviewed": 16,
"highSeverityCount": 0,
"mediumSeverityCount": 3,
"lowSeverityCount": 13,
"noIssueRetrofitCount": 4,
"dataGapRetrofitCount": 5
}
}

