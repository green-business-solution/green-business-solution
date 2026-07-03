{
"schemaVersion": "retrofi_scenario_combination_verification.v1",
"reviewedBy": "gpt_pro",
"testCaseId": "common-ground-coop-urbana",
"testCaseOrdinal": 29,
"overallAssessment": "inconclusive_due_to_data_gaps",
"findings": [
{
"retrofitTypeId": "battery_storage_system",
"retrofitDisplayName": "Battery storage system",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:658",
"SOURCE_DSIRE:dsire_program_id:3626",
"SOURCE_DSIRE:dsire_program_id:3567",
"SOURCE_DSIRE:dsire_program_id:3543",
"SOURCE_DSIRE:dsire_program_id:22553",
"SOURCE_DSIRE:dsire_program_id:22233"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid because it contains no stacked incentives. However, the packet lists multiple matched opportunities, including federal ITC, Illinois C-PACE/financing, Ameren distributed generation rebate, ComEd distributed generation/storage rebate, and a High Impact Business sales tax incentive, while v2PackageSummaries is empty and no alternative incentive scenarios are provided. Several opportunities are financing or have restrictive project requirements, and the packet does not provide calculable package inclusion/exclusion metadata or stack/conflict metadata needed to decide whether an incentive combination should have been present. Citation: ",
"recommendedRepair": "Add V2 package summaries or explicit no-package reasons for each matched opportunity, including whether federal tax credits, utility storage rebates tied to distributed generation, financing-only opportunities, and High Impact Business sales tax exemptions should be excluded from user-facing scenarios or modeled as separate non-rebate benefits.",
"needsMathVerificationLater": false
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
"SOURCE_DSIRE:dsire_program_id:3567",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario does not create an invalid stack. However, matched opportunities include ITC, USDA REAP loan guarantees, Illinois financing, and MACRS, all of which could affect scenario presentation depending on RetroFi policy. No alternative scenarios or v2 package summaries explain whether these are excluded because they are financing/tax cost recovery, blocked by ownership or rural-small-business requirements, missing inputs, or not user-facing by default.",
"recommendedRepair": "Provide explicit package/disposition metadata for ITC, REAP, Illinois financing, and MACRS, including whether tenant status and property ownership requirements prevent inclusion or merely require user input/human review.",
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
"SOURCE_DSIRE:dsire_program_id:3567",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally non-conflicting, but the packet lists matched ITC, REAP loan guarantee, Illinois financing, and MACRS opportunities. The ITC notes narrow eligibility for qualified biogas rather than broad biomass combustion, while REAP and financing opportunities have borrower/project requirements. With no package summaries or candidate incentive scenarios, the packet does not allow reliable verification that no incentives was the correct selected scenario.",
"recommendedRepair": "Add package-level dispositions distinguishing qualified biogas from unsupported biomass, and mark whether each tax, loan guarantee, or financing opportunity should be excluded, modeled, or routed to human review.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "solar_water_heating_system",
"retrofitDisplayName": "Solar water heating system",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:658",
"SOURCE_DSIRE:dsire_program_id:3567",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid, but matched opportunities include ITC, Illinois financing, and MACRS. The packet gives no v2 package summaries, no alternative scenarios, and no conflict/stacking metadata explaining why these matched opportunities are absent from the selected scenario.",
"recommendedRepair": "Add explicit scenario-generation metadata for the ITC, Illinois financing, and MACRS opportunities, including whether tax-cost-recovery and financing benefits are intentionally suppressed from incentive scenarios.",
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
"SOURCE_DSIRE:dsire_program_id:676",
"SOURCE_DSIRE:dsire_program_id:1271"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario appears reasonable for scenario-combination purposes. The matched ITC and MACRS records explicitly block generic LED lighting or ordinary efficiency measures, and 179D is valid only as part of a certified qualifying commercial building or retrofit-property savings calculation, not as a simple LED rebate. There is no alternative scenario showing a certified 179D project that should displace the no-incentives selection.",
"recommendedRepair": "Keep these opportunities out of simple LED incentive scenarios unless a 179D-certified project package with required modeled or measured savings inputs is available.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "combined_heat_and_power_system",
"retrofitDisplayName": "Combined heat and power system",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:658",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The no-incentives scenario is internally valid because it does not stack anything. However, ITC and MACRS are matched for CHP, and there are no v2 package summaries, candidate scenarios, or stack/conflict dispositions explaining why neither tax opportunity is present.",
"recommendedRepair": "Add package-level inclusion/exclusion reasons for CHP ITC and MACRS, including whether RetroFi intentionally excludes tax credits/depreciation from selected scenarios or lacks required inputs.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "community_solar_subscription",
"retrofitDisplayName": "Community solar subscription",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:22233"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario appears correct. The only matched opportunity is the ComEd distributed generation/storage rebate, and its blockers state that community solar subscription is not a physical retrofit and is not the rebate recipient category. Excluding it from the scenario avoids a false-positive incentive.",
"recommendedRepair": "Keep ComEd distributed generation/storage rebates excluded from community solar subscription scenarios unless the retrofit is changed to an eligible distributed generation owner/operator project rather than a subscription.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"retrofitDisplayName": "High-efficiency HVAC replacement",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:658",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario appears reasonable. The matched ITC and MACRS records both warn that generic or ordinary high-efficiency HVAC replacement is not supported unless the property independently qualifies under listed clean-energy categories. The packet provides no alternative scenario or package indicating that this HVAC replacement is qualifying energy property.",
"recommendedRepair": "Keep generic high-efficiency HVAC replacement out of ITC/MACRS scenarios unless the retrofit is specifically a qualifying clean-energy property category such as eligible geothermal or another listed category.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "rooftop_solar_pv",
"retrofitDisplayName": "Rooftop solar PV",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3567"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "No scenario-combination issue is visible from the packet. The only matched opportunity is Illinois financing, and its blockers state it is financing rather than a direct equipment incentive. With no rebate/tax-credit scenario candidate and no calculable package, selecting no incentives is internally valid for this pass.",
"recommendedRepair": "No scenario-combination repair needed from this packet; separately consider whether financing opportunities should be displayed outside incentive scenarios.",
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
"explanation": "The selected no-incentives scenario is internally valid, but MACRS is matched and includes small wind turbine in eligible retrofit categories. The packet does not include a v2 package summary explaining whether MACRS was excluded because it is tax cost recovery, missing ownership/tax-basis inputs, or not user-facing by default.",
"recommendedRepair": "Add a MACRS package disposition for small wind, especially whether depreciation benefits are intentionally omitted from selected scenarios or require missing tax/ownership inputs.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "submetering_energy_monitoring",
"retrofitDisplayName": "Submetering / energy monitoring system",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:22553",
"SOURCE_DSIRE:dsire_program_id:22233"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario appears correct. Both matched distributed-generation rebate opportunities explicitly block or reject submetering/energy monitoring as unsupported false-positive matches. Excluding both opportunities avoids an invalid scenario.",
"recommendedRepair": "Keep Ameren and ComEd distributed generation/storage rebates excluded from submetering and energy monitoring scenarios, and consider removing these false-positive matches upstream.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "leed_certification",
"retrofitDisplayName": "LEED certification",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": null,
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:2466"
],
"affectedScenarioIds": [],
"explanation": "No scenario is present because the savings preview is unsupported for an audit, study, certification, or compliance task. The matched Chicago Green Building Permit Program is also geographically questionable from the packet because the user site is in Urbana, while the hard requirements refer to City of Chicago DOB certification. Since the task is scenario-combination verification and the packet has no scenario candidates or package disposition, no reliable scenario decision can be made.",
"recommendedRepair": "Add explicit geography and package-disposition metadata for the Chicago permit opportunity, and exclude it from Urbana scenarios unless the packet contains a source-backed reason it applies outside Chicago.",
"needsMathVerificationLater": false
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
"explanation": "The selected no-incentives scenario appears reasonable for the broad microgrid retrofit. The matched ITC opportunity states that a microgrid match should be limited to qualifying microgrid controllers, not all microgrid infrastructure. The retrofit is a microgrid system, and no package identifies a qualifying controller-only scope.",
"recommendedRepair": "Keep broad microgrid system projects out of ITC scenarios unless a package or retrofit subtype confirms qualifying microgrid controller property.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "solar_plus_storage_system",
"retrofitDisplayName": "Solar-plus-storage system",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3543"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario appears reasonable. The only matched opportunity is the High Impact Business sales tax exemption, and its blockers state that solar-plus-storage should not be matched unless the project is a qualifying utility-scale solar or battery energy storage facility. The user profile is an 8,000-square-foot grocery co-op tenant, and the packet does not establish a utility-scale facility or High Impact Business certification.",
"recommendedRepair": "Keep the High Impact Business sales tax exemption excluded from customer-sited solar-plus-storage scenarios unless qualifying utility-scale facility and certification facts are present.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "thermal_energy_storage",
"retrofitDisplayName": "Thermal energy storage",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:658"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid, but ITC is matched and thermal energy storage appears in the opportunity's eligible retrofit categories. The packet does not include any v2 package summary or candidate incentive scenario explaining whether ITC was excluded due to missing inputs, policy suppression, or lack of a calculable package.",
"recommendedRepair": "Add ITC package metadata for thermal energy storage, including whether it should create a scenario, be suppressed as a tax credit, or remain blocked pending qualification inputs.",
"needsMathVerificationLater": false
}
],
"summary": {
"retrofitsReviewed": 15,
"highSeverityCount": 0,
"mediumSeverityCount": 8,
"lowSeverityCount": 7,
"noIssueRetrofitCount": 1,
"dataGapRetrofitCount": 8
}
}

