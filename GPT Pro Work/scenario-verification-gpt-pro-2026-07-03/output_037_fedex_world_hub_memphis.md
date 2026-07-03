{
"schemaVersion": "retrofi_scenario_combination_verification.v1",
"reviewedBy": "gpt_pro",
"testCaseId": "fedex-world-hub-memphis",
"testCaseOrdinal": 37,
"overallAssessment": "issues_found",
"findings": [
{
"retrofitTypeId": "led_lighting_retrofit",
"retrofitDisplayName": "LED lighting retrofit",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:658",
"SOURCE_DSIRE:dsire_program_id:676",
"SOURCE_DSIRE:dsire_program_id:1271",
"SOURCE_DSIRE:dsire_program_id:22126"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The no-incentives selected scenario is internally valid. ITC and MACRS should stay excluded because their blockers say generic LED lighting is not supported. The 179D deduction should stay excluded because standalone LED lighting is not eligible unless part of a certified qualifying project. TVA has a V2 package, but it is not user-facing by default, not included in runtime totals, and uses low-confidence placeholder/default inputs, so excluding it from the selected scenario is acceptable for this pass. Source packet cited: ",
"recommendedRepair": "No scenario-combination repair needed. Keep federal tax credit/depreciation/deduction opportunities out of the default selected scenario unless qualification is established, and continue suppressing the TVA package until inputs/confidence/user-facing status are resolved.",
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
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid, but the packet does not provide calculable packages or stacking/conflict metadata for the matched ITC, REAP loan guarantee, or MACRS opportunities. The ITC opportunity is narrowed to qualified biogas property and says broad biomass combustion is not supported, REAP requires agricultural-producer or rural-small-business eligibility, and MACRS requires owned depreciable property. The user profile identifies a very large commercial tenant, but does not establish ownership, rural-small-business status, agricultural producer status, or qualified biogas-property details. This prevents a reliable scenario decision.",
"recommendedRepair": "Add eligibility and scenario metadata for qualified biogas versus broad biomass, taxpayer/owner status, REAP rural-small-business/agricultural-producer status, and whether ITC/MACRS can stack. Until then, keep no-incentives selected or mark incentives as non-default/manual-review.",
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
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid, but matched ITC, REAP loan guarantee, and MACRS opportunities have no calculable package summaries or alternative scenarios. The packet supports geothermal as a potentially eligible category, but also includes requirements that cannot be verified from the profile: taxpayer/qualified-property status for ITC, depreciable property ownership for MACRS, and rural-small-business/agricultural-producer eligibility for REAP. Because the site profile says tenant and does not provide these inputs, the incentive combination cannot be reliably verified.",
"recommendedRepair": "Add package/scenario metadata for ITC, MACRS, and REAP, including owner/taxpayer status, rural/agricultural eligibility, and stacking treatment. Keep no-incentives or manual-review status until these inputs are resolved.",
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
"SOURCE_DSIRE:dsire_program_id:676",
"SOURCE_DSIRE:dsire_program_id:22126"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The no-incentives selected scenario is internally valid. ITC and MACRS should stay excluded because both include blockers against ordinary/generic high-efficiency HVAC replacement. TVA is matched and has a V2 package, but that package is suppressed from runtime totals as not user-facing by default and relies on low-confidence placeholder/default inputs, so it is acceptable that it was not included in the selected scenario.",
"recommendedRepair": "No selected-scenario repair needed. Keep ITC and MACRS excluded for ordinary HVAC replacement, and only include TVA once the package is made user-facing or the required measure inputs are trustworthy.",
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
"explanation": "The no-incentives selected scenario is internally valid, but both matched opportunities appear category-compatible: ITC lists combined heat and power systems, and MACRS lists combined heat and power systems. The packet provides no V2 package summaries, alternative scenarios, or stacking/conflict metadata to decide whether the two tax opportunities should be included, combined, or excluded.",
"recommendedRepair": "Add calculable or explicit non-calculable scenario metadata for ITC and MACRS, including ownership/taxpayer requirements and stacking treatment between tax credit and depreciation benefits.",
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
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid, but both matched opportunities list solar water heating or solar thermal property categories. The packet has no V2 package summaries, no alternative scenarios, and no stacking/conflict metadata explaining why these category-compatible tax opportunities are excluded.",
"recommendedRepair": "Add scenario/package handling for ITC and MACRS, or explicit manual-review/non-default reasons tied to taxpayer/ownership and qualified-property requirements. Add stacking treatment if both are potentially available.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "thermal_energy_storage",
"retrofitDisplayName": "Thermal energy storage",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:658",
"SOURCE_DSIRE:dsire_program_id:22126"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid. The TVA opportunity is excluded appropriately for now because its V2 package is not user-facing by default and uses low-confidence placeholder/default inputs. However, ITC lists thermal energy storage as an eligible category and has no V2 package summary, alternative scenario, or explicit scenario-level exclusion. The packet does not provide enough data to verify whether a compatible additive ITC scenario should exist or whether it should stack with TVA.",
"recommendedRepair": "Add ITC package/scenario metadata for thermal energy storage and explicit stacking/conflict treatment with the TVA rebate. Keep TVA suppressed until measure inputs and user-facing status are resolved.",
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
"explanation": "Battery storage has a single matched ITC opportunity, and ITC lists battery storage systems as an eligible category. Unlike several TVA measures, there is no V2 summary explaining suppression, missing inputs, low confidence, or manual review. The selected no-incentives scenario is internally valid, but the packet gives no reason why a calculable or at least manual-review ITC scenario was not constructed.",
"recommendedRepair": "Create an ITC scenario/package for battery storage or add an explicit non-calculable/manual-review exclusion reason, including taxpayer and qualified-property requirements.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "electric_forklift_material_handling",
"retrofitDisplayName": "Electric forklift / material handling equipment",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:22126"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The no-incentives selected scenario is internally valid. TVA is the only matched opportunity and its V2 package is not user-facing by default, not included in runtime totals, and depends on low-confidence placeholder/default inputs. Excluding it from the selected scenario is appropriate for this pass.",
"recommendedRepair": "No scenario-combination repair needed. Include TVA only after forklift-specific inputs and package confidence/user-facing status are resolved.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"retrofitDisplayName": "Heat pump HVAC retrofit",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:22126"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The no-incentives selected scenario is internally valid. TVA is the only matched opportunity and has a suppressed V2 package that is not user-facing by default and uses low-confidence placeholder/default inputs. Excluding it from the selected scenario is acceptable.",
"recommendedRepair": "No scenario-combination repair needed. Reconsider TVA only when required HVAC measure inputs are reliable and the package is enabled for user-facing totals.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"retrofitDisplayName": "High-efficiency refrigeration equipment",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:22126"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The no-incentives selected scenario is internally valid. TVA is the only matched opportunity, and its V2 package is suppressed as not user-facing by default with low-confidence placeholder/default inputs. Excluding it from the selected scenario is acceptable.",
"recommendedRepair": "No scenario-combination repair needed. Only include the TVA package after measure inputs and runtime inclusion status are resolved.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "leed_certification",
"retrofitDisplayName": "LEED certification",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": null,
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:22676"
],
"affectedScenarioIds": [],
"explanation": "No selected scenario exists because the savings preview is unsupported for this non-physical certification/compliance task. The matched PILOT opportunity is described as a property tax incentive where certifications affect scoring or term extension, not a direct retrofit rebate. With no calculable scenario candidates in the packet, there is no stack or duplicate-counting issue to flag.",
"recommendedRepair": "No scenario-combination repair needed. Keep this outside normal retrofit savings scenarios unless a modeled property-tax benefit package and location eligibility are added.",
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
"explanation": "The selected no-incentives scenario is internally valid, but ITC is matched and its eligible category is microgrid controller, while its blockers state a microgrid match should be limited to qualifying microgrid controllers, not all microgrid infrastructure. The retrofit is broadly named microgrid system, and the packet does not specify whether the project is only a qualifying controller or broader infrastructure. No V2 package or alternative scenario explains the exclusion.",
"recommendedRepair": "Add project/component metadata distinguishing qualifying microgrid controllers from broader microgrid infrastructure, then create a manual-review or calculable ITC scenario only for the qualifying controller portion.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "refrigeration_ec_motor_retrofit",
"retrofitDisplayName": "Refrigeration EC motor retrofit",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:22126"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The no-incentives selected scenario is internally valid. TVA is the only matched opportunity, and its V2 package is not user-facing by default, not included in runtime totals, and uses low-confidence placeholder/default inputs. Excluding it from the selected scenario is acceptable.",
"recommendedRepair": "No scenario-combination repair needed. Include TVA only after EC-motor measure inputs and runtime inclusion status are resolved.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "retro_commissioning_study",
"retrofitDisplayName": "Retro-commissioning study",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:22126"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid. TVA is the only matched opportunity, but its V2 package is not user-facing by default and relies on low-confidence placeholder/default inputs. Excluding it from the selected scenario is acceptable.",
"recommendedRepair": "No scenario-combination repair needed. Enable TVA only after retro-commissioning-specific inputs and package status are resolved.",
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
"explanation": "The selected no-incentives scenario is internally valid, but MACRS is matched and lists small wind turbine as an eligible category. The packet provides no V2 package summary, alternative scenario, or explicit reason for excluding the depreciation opportunity. The profile also says the user is a tenant, while MACRS requires depreciable property owned by the taxpayer, so ownership/taxpayer status blocks reliable verification.",
"recommendedRepair": "Add ownership/taxpayer-status checks and a calculable or manual-review MACRS scenario for small wind if eligible. Otherwise add an explicit scenario exclusion reason.",
"needsMathVerificationLater": false
}
],
"summary": {
"retrofitsReviewed": 16,
"highSeverityCount": 0,
"mediumSeverityCount": 8,
"lowSeverityCount": 8,
"noIssueRetrofitCount": 1,
"dataGapRetrofitCount": 7
}
}

