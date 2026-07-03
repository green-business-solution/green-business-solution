{
"schemaVersion": "retrofi_scenario_combination_verification.v1",
"reviewedBy": "gpt_pro",
"testCaseId": "bluebird-cafe-nashville",
"testCaseOrdinal": 20,
"overallAssessment": "issues_found",
"findings": [
{
"retrofitTypeId": "led_lighting_retrofit",
"retrofitDisplayName": "LED lighting retrofit",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:22126",
"SOURCE_DSIRE:dsire_program_id:658",
"SOURCE_DSIRE:dsire_program_id:676",
"SOURCE_DSIRE:dsire_program_id:1271"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is internally valid. TVA rebate opportunity is matched and has a V2 package with an expected one-time rebate, but the package is marked not_user_facing_default, not included in runtime totals, and supported by low-confidence placeholder/defaulted inputs, so it should not force inclusion in the selected scenario in this pass. Federal ITC, MACRS, and 179D also should remain excluded from a simple selected LED scenario because their blockers/reasoning notes state they are not generic LED rebates and require qualifying energy property, depreciable property ownership, or certified 179D treatment. Source packet: ",
"recommendedRepair": "Keep no-incentives selected unless TVA package confidence/runtime inclusion policy changes or a user-facing calculable package with reliable lighting inputs is created. Do not include ITC, MACRS, or 179D for standalone generic LED lighting without qualifying-project metadata.",
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
"explanation": "No-incentives is the only listed scenario, so there is no invalid stack or lower-benefit alternative to compare. However, the packet lists three matched opportunities and no V2 calculation packages. ITC is narrowed to qualified biogas property and not broad biomass combustion; REAP requires agricultural-producer or rural-small-business eligibility and is a loan guarantee, not a rebate; MACRS requires depreciable property ownership. The user is a tenant small restaurant in Nashville, and the packet does not provide rural/agricultural status, property ownership/tax basis, or whether the proposed system is qualified biogas property. This prevents a reliable decision on whether a calculable incentive scenario should exist.",
"recommendedRepair": "Add qualification metadata for biogas versus biomass, taxpayer/property ownership/depreciability, and REAP rural/agricultural eligibility. Add calculation packages only for incentives that can be user-facing and quantified; otherwise keep no-incentives selected.",
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
"explanation": "No-incentives is the only listed scenario and is internally valid. The matched ITC and MACRS opportunities both include geothermal-related categories, and REAP includes ground-source geothermal heat pumps, but no calculable package or alternative scenario is provided. The packet lacks needed eligibility details for taxpayer/property ownership, depreciability, tax-basis treatment, and REAP rural/agricultural status. Therefore the scenario selection cannot be fully verified beyond confirming that no invalid stack is present.",
"recommendedRepair": "Capture ownership/taxpayer status and REAP rural/agricultural eligibility, then create user-facing calculation packages or explicit non-calculable exclusion reasons for ITC, MACRS, and REAP. Keep no-incentives until those inputs exist.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"retrofitDisplayName": "High-efficiency HVAC replacement",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:22126",
"SOURCE_DSIRE:dsire_program_id:658",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is internally valid. TVA rebate is matched and has a V2 package with a small expected one-time rebate, but it is marked not_user_facing_default and excluded from runtime totals with low-confidence placeholder/defaulted inputs. ITC and MACRS should not be added for ordinary high-efficiency HVAC replacement because both opportunity records explicitly block or narrow generic ordinary HVAC treatment.",
"recommendedRepair": "Keep no-incentives selected unless a reliable, user-facing TVA HVAC package is enabled. Do not include ITC or MACRS for ordinary HVAC replacement without qualified clean-energy-property evidence.",
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
"explanation": "No-incentives is internally valid and no alternative scenario is listed. However, both matched opportunities include combined heat and power categories, and the packet provides no V2 packages or explicit scenario alternatives. The packet lacks project-specific tax/property ownership and qualification details needed to determine whether ITC and MACRS should produce a calculable additive scenario.",
"recommendedRepair": "Add explicit calculation package status for ITC and MACRS on CHP, including whether the tenant owns depreciable qualifying property and whether the project satisfies eligible energy-property rules. Keep no-incentives until a reliable user-facing package exists.",
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
"explanation": "No-incentives is internally valid and no alternative scenario is available. ITC and MACRS both list solar water heating as an eligible category, but there are no V2 packages or scenario candidates. The packet does not establish ownership/taxpayer/depreciability facts or qualifying-property details, so it is not possible to verify whether a calculable incentive scenario should have been selected.",
"recommendedRepair": "Add user/project qualification data and calculation package status for ITC and MACRS. If both are calculable and compatible, create an alternative/selected scenario; otherwise retain no-incentives with explicit exclusion reasons.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "thermal_energy_storage",
"retrofitDisplayName": "Thermal energy storage",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:22126",
"SOURCE_DSIRE:dsire_program_id:658"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is internally valid. TVA has a V2 package with a nominal expected rebate, but it is not_user_facing_default, excluded from runtime totals, and based on low-confidence placeholder/defaulted inputs. ITC is matched for thermal energy storage but has no package or scenario candidate, and the packet does not provide the qualifying-property details needed to decide inclusion. No invalid stack or duplicate counting appears in the selected scenario.",
"recommendedRepair": "Keep no-incentives selected for the current runtime. Add reliable thermal-storage inputs and explicit ITC calculation/package status before introducing an incentive scenario.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "battery_storage_system",
"retrofitDisplayName": "Battery storage system",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:658"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "No-incentives is internally valid. The only matched opportunity is ITC, whose eligible categories include battery storage, but no V2 package or alternative scenario is provided. The packet lacks project-specific qualification facts for eligible energy storage property, tax filing, ownership, and applicable credit rules, so it cannot be determined whether a calculable ITC scenario should have existed.",
"recommendedRepair": "Add ITC package status and required qualification inputs for battery storage. If the package remains unsupported, record that exclusion explicitly; if supported and user-facing, create a calculable incentive scenario.",
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
"explanation": "Selected no-incentives scenario is internally valid. TVA is the only matched opportunity and has a V2 package with expected one-time savings, but it is not_user_facing_default, excluded from runtime totals, and based on low-confidence placeholder/defaulted inputs. No stacking, duplicate, or alternative-selection issue appears.",
"recommendedRepair": "Keep no-incentives selected unless a reliable, user-facing TVA electric-forklift package is enabled with measure-specific inputs.",
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
"explanation": "Selected no-incentives scenario is internally valid. TVA is the only matched opportunity and has a V2 package with expected one-time savings, but it is not_user_facing_default, excluded from runtime totals, and based on low-confidence placeholder/defaulted inputs. No compatible user-facing additive opportunity is omitted from the selected scenario.",
"recommendedRepair": "Keep no-incentives selected until TVA heat-pump package inputs and runtime inclusion are reliable enough for user-facing totals.",
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
"explanation": "Selected no-incentives scenario is internally valid. TVA is the only matched opportunity and has a V2 package with expected one-time savings, but it is not_user_facing_default, excluded from runtime totals, and based on low-confidence placeholder/defaulted inputs. No invalid stack or better compatible selected alternative is shown.",
"recommendedRepair": "Keep no-incentives selected until a reliable user-facing TVA refrigeration package is available.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "leed_certification",
"retrofitDisplayName": "LEED certification",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": null,
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:22676"
],
"affectedScenarioIds": [],
"explanation": "No scenario is listed because the savings preview is unsupported for this certification/compliance task. The matched City of Memphis PILOT opportunity has blockers stating projects outside eligible downtown boundaries or without CCRFC approval should not match. The user site is in Nashville, not Memphis, based on the packet description and address, but the task is scenario-combination verification rather than eligibility rematching. Because there is no calculable package and no scenario candidate, this pass cannot verify a selected combination.",
"recommendedRepair": "Keep no scenario for LEED certification unless a calculable property-tax incentive package is created and location/approval eligibility is established. Separately review whether the Memphis PILOT opportunity should have matched this Nashville site.",
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
"explanation": "No-incentives is internally valid. The only matched opportunity is ITC, but the opportunity blockers state a microgrid match should be limited to qualifying microgrid controllers, not all microgrid infrastructure. The retrofit is a broad microgrid system, and the packet does not state whether the project is limited to a qualifying microgrid controller. That gap blocks a reliable decision about whether an incentive scenario should exist.",
"recommendedRepair": "Add a project/component flag distinguishing qualifying microgrid controllers from broader microgrid infrastructure. Only create an ITC scenario when the qualifying controller requirement is met and calculable.",
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
"explanation": "Selected no-incentives scenario is internally valid. TVA is the only matched opportunity and has a V2 package with expected one-time savings, but it is not_user_facing_default, excluded from runtime totals, and based on low-confidence placeholder/defaulted inputs. No stacking or duplicate issue is present.",
"recommendedRepair": "Keep no-incentives selected until TVA EC-motor package inputs and user-facing inclusion status are reliable.",
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
"explanation": "Selected no-incentives scenario is internally valid. TVA is the only matched opportunity and has a V2 package with expected one-time savings, but it is not_user_facing_default, excluded from runtime totals, and based on low-confidence placeholder/defaulted inputs. No alternative scenario is shown.",
"recommendedRepair": "Keep no-incentives selected until a reliable, user-facing retro-commissioning package exists.",
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
"explanation": "No-incentives is internally valid. The only matched opportunity is MACRS, whose eligible categories include small wind turbine, but no V2 package or alternative scenario is provided. The packet does not establish taxpayer ownership, depreciable property status, tax basis, or other required facts, so it cannot be verified whether a calculable MACRS scenario should exist.",
"recommendedRepair": "Add MACRS package status and required depreciable-property inputs for small wind. Keep no-incentives selected unless the package becomes reliable and user-facing.",
"needsMathVerificationLater": false
}
],
"summary": {
"retrofitsReviewed": 16,
"highSeverityCount": 0,
"mediumSeverityCount": 8,
"lowSeverityCount": 8,
"noIssueRetrofitCount": 0,
"dataGapRetrofitCount": 8
}
}

