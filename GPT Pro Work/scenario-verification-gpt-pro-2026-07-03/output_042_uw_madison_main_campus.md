{
"schemaVersion": "retrofi_scenario_combination_verification.v1",
"reviewedBy": "gpt_pro",
"testCaseId": "uw-madison-main-campus",
"testCaseOrdinal": 42,
"overallAssessment": "issues_found",
"findings": [
{
"retrofitTypeId": "battery_storage_system",
"retrofitDisplayName": "Battery storage system",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:178",
"SOURCE_DSIRE:dsire_program_id:3538",
"SOURCE_DSIRE:dsire_program_id:3223"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is scenario-level valid. All three matched opportunities should stay excluded from the scenario based on the packet: the Wisconsin property tax exemption and sales tax exemption both block standalone battery storage, and PACE is financing rather than a rebate and says standalone battery storage is not identified as eligible. No compatible additive calculable opportunity is shown. Source packet citation: ",
"recommendedRepair": "Keep the no-incentives scenario for this retrofit. Repair opportunity tagging so these programs are not treated as standalone battery incentives unless paired with a qualifying renewable system and supported by current program data.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "biomass_biogas_energy_system",
"retrofitDisplayName": "Biomass / biogas energy system",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:2511",
"SOURCE_DSIRE:dsire_program_id:178",
"SOURCE_DSIRE:dsire_program_id:3223",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The no-incentives scenario is internally valid, but the packet is insufficient to verify whether it is the right final combination. Multiple matched opportunities appear technology-relevant for biogas, but no calculation packages or alternative scenarios are provided. REAP is a loan guarantee and appears applicant-restricted to agricultural producers or rural small businesses, which does not match the university/government profile cleanly. MACRS is tax cost recovery and may be inapplicable or non-user-facing for a government university. The Wisconsin sales tax exemption is narrowed to anaerobic-digestion gas from animal manure or agricultural waste, and the packet does not state whether the campus project meets that fuel condition. The property tax exemption may be compatible for qualifying biogas systems but has no calculable package. This prevents a reliable scenario-combination decision beyond excluding non-calculable items from totals.",
"recommendedRepair": "Add explicit applicability flags and calculation package status for each biomass/biogas opportunity, especially government eligibility, tax appetite or tax-exempt ownership treatment, qualifying fuel type, and whether property/sales tax exemptions should be included as non-cash or calculable scenario entries.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "ev_charger_installation",
"retrofitDisplayName": "EV charger installation",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:22363"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is scenario-level valid. The only matched opportunity is an MGE charger leasing or utility-owned residential home charging service, not a customer-owned commercial/institutional charger rebate. Its hard requirements refer to qualifying home EV charging customers, while the user is a large university campus. Excluding it from the scenario is appropriate.",
"recommendedRepair": "Keep the no-incentives scenario. Correct the opportunity match so this residential leasing program is not marked eligible for a university campus or commercial EV charger retrofit.",
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
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid, but the packet does not provide enough scenario/package data to decide whether all matched opportunities should be excluded. REAP appears to require an agricultural producer or rural small business borrower, which is not established for the government university profile. MACRS is tax cost recovery for depreciable business or income-producing property, and the packet does not resolve whether this government campus can use it. No calculation packages or alternative scenarios are shown.",
"recommendedRepair": "Add explicit applicant/tax-status gating and package inclusion status for REAP and MACRS. If either opportunity is intentionally non-user-facing, tax-exempt-blocked, or unsupported, mark that in V2 package summaries.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "solar_water_heating_system",
"retrofitDisplayName": "Solar water heating system",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3223",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid, but the packet does not establish whether the two matched solar water-heating opportunities should be excluded from all scenarios. The Wisconsin sales tax exemption appears technology-relevant for qualifying solar heat-producing products, while excluding hot-water storage tanks, but there is no calculation package or package-blocking reason. MACRS lists solar water heating but is tax cost recovery, and the user is a government university with unresolved tax/depreciation usability. No alternative scenario is available for comparison.",
"recommendedRepair": "Add V2 package summaries for the sales tax exemption and MACRS showing whether they are calculable, blocked by missing inputs, blocked by tax-exempt ownership, suppressed as non-user-facing, or excluded as non-cash tax treatment.",
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
"explanation": "The selected no-incentives scenario is valid. LIHEAP is described as low-income household assistance and not a commercial or institutional retrofit program. The V2 package summary also marks it no_calculable_value, excluded from runtime totals, low confidence, and dependent on placeholder local-grantee inputs. It should not be included in the university campus scenario.",
"recommendedRepair": "Keep the no-incentives scenario. Repair matching so LIHEAP is not marked eligible for institutional campus air sealing unless a specific residential low-income household context is present.",
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
"explanation": "The selected no-incentives scenario is internally valid, but the packet does not provide enough data to verify that MACRS should be completely excluded. MACRS lists combined heat and power as an eligible category, but it is tax cost recovery rather than a rebate, requires depreciable business or income-producing property, and the user profile is a government university. No V2 package summary explains whether the opportunity was blocked, suppressed, unsupported, or simply missing a calculable package.",
"recommendedRepair": "Add a package summary or eligibility gate explaining MACRS treatment for government/tax-exempt owners and whether CHP MACRS should be unavailable, non-user-facing, or calculable only with tax-owner information.",
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
"explanation": "The selected no-incentives scenario is valid. The only matched opportunity is MACRS, but the packet's blockers explicitly say generic ordinary HVAC replacement is not a specially supported clean-energy MACRS category for this opportunity. Excluding it from the scenario is appropriate.",
"recommendedRepair": "Keep the no-incentives scenario. Repair opportunity discovery so ordinary high-efficiency HVAC replacement is not matched to this MACRS opportunity unless a qualifying clean-energy property category is present.",
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
"explanation": "The selected no-incentives scenario is valid. The only matched opportunity is MACRS, but the packet's blockers explicitly say generic LED lighting is not a specially supported clean-energy MACRS category for this opportunity. Excluding it from the scenario is appropriate.",
"recommendedRepair": "Keep the no-incentives scenario. Repair opportunity discovery so generic LED lighting is not matched to this MACRS clean-energy cost-recovery opportunity.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "level_2_ev_charger_installation",
"retrofitDisplayName": "Level 2 EV charger installation",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:22363"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is scenario-level valid. The only matched opportunity is the same MGE residential Charge at Home leasing or utility-owned service, not a customer-owned commercial or institutional charger rebate. Its hard requirements and eligible applicant types are residential/home oriented, so exclusion from the campus Level 2 EV charger scenario is appropriate.",
"recommendedRepair": "Keep the no-incentives scenario. Correct the opportunity match so this residential MGE charger leasing program is not marked eligible for a university campus Level 2 charger retrofit.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "small_wind_turbine",
"retrofitDisplayName": "Small wind turbine",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid, but the packet does not provide enough data to verify that the MACRS opportunity should be excluded. MACRS lists small wind turbine as an eligible category, but it is tax cost recovery for depreciable property, and the user is a government university with unresolved tax/depreciation usability. No V2 package summary explains whether it was blocked, suppressed, unsupported, or simply not calculable.",
"recommendedRepair": "Add a V2 package summary or eligibility gate for MACRS small wind treatment, including tax-exempt ownership, depreciable-property status, and whether the opportunity should be non-user-facing or calculable only after tax-owner inputs are supplied.",
"needsMathVerificationLater": false
}
],
"summary": {
"retrofitsReviewed": 11,
"highSeverityCount": 0,
"mediumSeverityCount": 5,
"lowSeverityCount": 6,
"noIssueRetrofitCount": 0,
"dataGapRetrofitCount": 5
}
}

