{
"schemaVersion": "retrofi_scenario_combination_verification.v1",
"reviewedBy": "gpt_pro",
"testCaseId": "food-bank-rockies-aurora-dc",
"testCaseOrdinal": 22,
"overallAssessment": "issues_found",
"findings": [
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"retrofitDisplayName": "Ground-source / geothermal heat pump",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:4815",
"SOURCE_DSIRE:dsire_program_id:2388"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is reasonable for combination purposes. The only calculable repaired package is PVREA, but it is suppressed as not_user_facing_default with placeholder defaults, and the packet also says PVREA requires membership/service. The Colorado renewable property tax opportunity explicitly says not to match ground-source geothermal heat pumps. Other matched federal tax/depreciation/loan/local-option opportunities either lack calculation packages or are not direct rebate-style scenario benefits in this packet. Source: ",
"recommendedRepair": "Keep selected no-incentives scenario unless PVREA utility membership and user-facing inclusion rules are repaired and confirmed.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "biomass_biogas_energy_system",
"retrofitDisplayName": "Biomass / biogas energy system",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:658",
"SOURCE_DSIRE:dsire_program_id:2511",
"SOURCE_DSIRE:dsire_program_id:2388",
"SOURCE_DSIRE:dsire_program_id:676",
"SOURCE_DSIRE:dsire_program_id:2502"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is internally valid because no V2 calculation packages or alternative scenarios are provided. Several matched opportunities are tax, depreciation, property-tax assessment, loan guarantee, or local-option items rather than calculable direct savings in this packet, and REAP has borrower/rural-small-business requirements that are not established for this nonprofit site.",
"recommendedRepair": "No scenario-combination repair. Add calculation packages only after eligibility and user-facing treatment are confirmed.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "led_lighting_retrofit",
"retrofitDisplayName": "LED lighting retrofit",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:658",
"SOURCE_DSIRE:dsire_program_id:676",
"SOURCE_DSIRE:dsire_program_id:1271",
"SOURCE_DSIRE:dsire_program_id:1580"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is reasonable for this pass. ITC and MACRS blockers say generic LED lighting is not supported. 179D is only valid as part of a certified qualifying lighting/whole-building/retrofit-property savings calculation and is not a simple LED rebate. Xcel is matched but has no V2 calculation package or alternative scenario in the packet.",
"recommendedRepair": "No scenario-combination repair. Build a scenario only after a supported Xcel or certified 179D calculation package exists.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "ev_charger_installation",
"retrofitDisplayName": "EV charger installation",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:4815",
"SOURCE_DSIRE:dsire_program_id:22160",
"SOURCE_DSIRE:dsire_program_id:22156"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The no-incentives scenario avoids incorrectly including the Colorado EV vehicle income tax credit, which the packet says does not fund charger installation. However, two charger-related packages exist but are suppressed: PVREA is not_user_facing_default and the Colorado fast-charging plazas grant is low_confidence with public DC fast-charging requirements. The generic EV charger retrofit lacks enough inputs to determine whether the public DC fast-charging plaza grant, PVREA charger rebate, both, or neither should be included.",
"recommendedRepair": "Collect charger type, public-access commitment, utility membership/service eligibility, DCFC port/power details, award status, and stacking metadata before forming a nonzero EV charger scenario.",
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
"SOURCE_DSIRE:dsire_program_id:4815",
"SOURCE_DSIRE:dsire_program_id:1580"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is internally valid. ITC and MACRS explicitly block generic ordinary high-efficiency HVAC replacement. The only V2 package is PVREA, but it is not_user_facing_default with placeholder defaults and service-membership requirements. Xcel is matched but has no calculation package in this packet.",
"recommendedRepair": "Keep no-incentives scenario unless a supported Xcel HVAC package or user-facing PVREA package is added with confirmed service eligibility.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "rooftop_solar_pv",
"retrofitDisplayName": "Rooftop solar PV",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:1255",
"SOURCE_DSIRE:dsire_program_id:22786",
"SOURCE_DSIRE:dsire_program_id:2388",
"SOURCE_DSIRE:dsire_program_id:2502"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is probably safe but not fully verifiable. Xcel Solar*Rewards is matched but its own hard requirements say the program is residential, while the user is a nonprofit commercial warehouse, creating a likely eligibility mismatch. The Eagle County/Walking Mountains package is not_user_facing_default and has required local-area and Holy Cross Energy dependencies; the Aurora site is not established as eligible. Local-option sales-tax and property-tax treatment lack local adoption/calc details. No valid additive solar scenario can be confirmed from the packet.",
"recommendedRepair": "Remove or demote the residential Xcel Solar*Rewards match for this nonresidential site unless program data supports commercial eligibility. Add local adoption/geography and tax-treatment calculation data before including local-option/property-tax benefits.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "solar_water_heating_system",
"retrofitDisplayName": "Solar water heating system",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:658",
"SOURCE_DSIRE:dsire_program_id:676",
"SOURCE_DSIRE:dsire_program_id:2502"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is internally valid because no V2 package or alternative scenario is provided. The matched opportunities are federal tax credit, depreciation, and local-option tax exemption items whose calculable and user-facing treatment is not supplied in this packet.",
"recommendedRepair": "No scenario-combination repair. Add tax and local-option calculation packages only after eligibility and stacking treatment are modeled.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "battery_storage_system",
"retrofitDisplayName": "Battery storage system",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:658",
"SOURCE_DSIRE:dsire_program_id:5878"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is internally valid for this pass. ITC and C-PACE are matched, but there are no calculation packages or alternative scenarios. C-PACE is financing rather than a direct incentive and should not automatically create upfront savings.",
"recommendedRepair": "No scenario-combination repair. Add calculation and financing-display rules before including either opportunity in scenario totals.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "combined_heat_and_power_system",
"retrofitDisplayName": "Combined heat and power system",
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
"explanation": "Selected no-incentives scenario is internally valid. The matched opportunities are federal ITC and MACRS-style tax items, and the packet provides no calculable package or alternative combination.",
"recommendedRepair": "No scenario-combination repair. Model tax-credit/depreciation packages separately before adding a nonzero scenario.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"retrofitDisplayName": "Heat pump HVAC retrofit",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:4815",
"SOURCE_DSIRE:dsire_program_id:1580"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is reasonable because the only calculable package is PVREA, which is not_user_facing_default with placeholder defaults and utility membership requirements. Xcel is a matched opportunity but has no calculation package or alternative scenario in this packet.",
"recommendedRepair": "Keep no-incentives scenario until a user-facing eligible heat-pump package is available for the actual utility/customer context.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"retrofitDisplayName": "High-efficiency refrigeration equipment",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:1580"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is internally valid because Xcel is matched but no calculable package or alternative scenario is supplied.",
"recommendedRepair": "No scenario-combination repair. Add Xcel refrigeration calculation rules before creating an incentive scenario.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "lighting_controls_retrofit",
"retrofitDisplayName": "Lighting controls retrofit",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:1580"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is internally valid because Xcel is matched but no calculable package or alternative scenario is supplied.",
"recommendedRepair": "No scenario-combination repair. Add Xcel lighting-controls calculation rules before creating an incentive scenario.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "low_flow_fixture_retrofit",
"retrofitDisplayName": "Low-flow fixture retrofit",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:2502",
"SOURCE_DSIRE:dsire_program_id:1580"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario avoids including the local-option renewable-energy fixture exemption, which is explicitly a false positive for low-flow plumbing fixtures. However, Xcel is also matched even though its eligible categories listed in the packet do not clearly include water-efficiency or low-flow fixtures; the packet gives no V2 package or enough detail to verify whether any Xcel water fixture incentive exists.",
"recommendedRepair": "Remove the local-option renewable-energy opportunity from this retrofit match. Verify whether Xcel actually supports low-flow/water fixtures before retaining it as a matched opportunity or scenario candidate.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "small_wind_turbine",
"retrofitDisplayName": "Small wind turbine",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:676",
"SOURCE_DSIRE:dsire_program_id:2502"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is internally valid because MACRS and local-option sales/use tax opportunities have no calculation packages or alternative scenarios in the packet.",
"recommendedRepair": "No scenario-combination repair. Add local adoption and depreciation calculation treatment before creating a nonzero scenario.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "anti_sweat_heater_controls",
"retrofitDisplayName": "Anti-sweat heater controls",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:1580"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is internally valid because Xcel is matched but no calculable package or alternative scenario is supplied.",
"recommendedRepair": "No scenario-combination repair. Add Xcel refrigeration-controls calculation rules before creating an incentive scenario.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "dc_fast_charger_installation",
"retrofitDisplayName": "DC fast charger installation",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:4815"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The no-incentives scenario is safe but not fully verifiable. PVREA has a calculable package but is not_user_facing_default with placeholder defaults and public-access/utility-membership conditions. The packet does not provide enough information to decide if the PVREA DC fast charger rebate should be included.",
"recommendedRepair": "Collect PVREA member status, charger power, public-access status, and program review eligibility before including PVREA in this scenario.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "exterior_site_lighting_retrofit",
"retrofitDisplayName": "Exterior/site lighting retrofit",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:1580"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is internally valid because Xcel is matched but no calculable package or alternative scenario is supplied.",
"recommendedRepair": "No scenario-combination repair. Add Xcel exterior lighting calculation rules before creating an incentive scenario.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "high_efficiency_boiler_retrofit",
"retrofitDisplayName": "High-efficiency boiler retrofit",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:1580"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is internally valid because Xcel is matched but no calculable package or alternative scenario is supplied.",
"recommendedRepair": "No scenario-combination repair. Add Xcel boiler/heating calculation rules before creating an incentive scenario.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "high_efficiency_commercial_dishwasher",
"retrofitDisplayName": "High-efficiency commercial dishwasher",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:1580"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is internally valid because Xcel is matched but no calculable package or alternative scenario is supplied.",
"recommendedRepair": "No scenario-combination repair. Add Xcel commercial kitchen calculation rules before creating an incentive scenario.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "induction_cooking_equipment",
"retrofitDisplayName": "Induction cooking equipment",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:4815"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is reasonable. PVREA has a calculable package but is not_user_facing_default with placeholder defaults, and the opportunity blockers warn that induction is an electric appliance incentive and should not be generalized to commercial kitchen equipment.",
"recommendedRepair": "Keep no-incentives scenario unless the project measure is confirmed to match the specific PVREA induction appliance requirements and user-facing rules.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "insulation_upgrade",
"retrofitDisplayName": "Insulation upgrade",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:1580"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is internally valid because Xcel is matched but no calculable package or alternative scenario is supplied.",
"recommendedRepair": "No scenario-combination repair. Add Xcel envelope/insulation calculation rules before creating an incentive scenario.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "level_2_ev_charger_installation",
"retrofitDisplayName": "Level 2 EV charger installation",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:4815"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is reasonable. PVREA has a calculable package but is not_user_facing_default with placeholder defaults and unconfirmed membership/charger documentation requirements.",
"recommendedRepair": "Keep no-incentives scenario until PVREA membership and Level 2 charger details are confirmed and the package is allowed in runtime totals.",
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
"explanation": "Selected no-incentives scenario is reasonable. The ITC opportunity blocker says a microgrid match should be limited to qualifying microgrid controllers, not all microgrid infrastructure, and no calculation package is supplied.",
"recommendedRepair": "Do not include ITC for a generic microgrid system unless the qualifying microgrid controller scope is isolated and modeled.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "refrigeration_controls_retrofit",
"retrofitDisplayName": "Refrigeration controls retrofit",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:1580"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is internally valid because Xcel is matched but no calculable package or alternative scenario is supplied.",
"recommendedRepair": "No scenario-combination repair. Add Xcel refrigeration-controls calculation rules before creating an incentive scenario.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "retro_commissioning_study",
"retrofitDisplayName": "Retro-commissioning study",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:5878"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is reasonable. The C-PACE blocker says retro-commissioning is not a stand-alone rebate and that commissioning, audits, and studies are eligible costs only within the C-PACE financed project context.",
"recommendedRepair": "Keep no-incentives scenario for stand-alone retro-commissioning. Only include C-PACE as financing when tied to an eligible financed project.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"retrofitDisplayName": "Smart thermostat / zoning retrofit",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:4815"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is reasonable. PVREA has a calculable package but is not_user_facing_default with placeholder defaults and unconfirmed membership/measure requirements.",
"recommendedRepair": "Keep no-incentives scenario until PVREA member status, measure details, and runtime inclusion are confirmed.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "steam_trap_replacement",
"retrofitDisplayName": "Steam trap replacement",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:1580"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is internally valid because Xcel is matched but no calculable package or alternative scenario is supplied.",
"recommendedRepair": "No scenario-combination repair. Add Xcel steam-trap/custom heating calculation rules before creating an incentive scenario.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "submetering_energy_monitoring",
"retrofitDisplayName": "Submetering / energy monitoring system",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:1255"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is correct. The Xcel Solar*Rewards blocker states production or net metering is not a standalone submetering or energy-monitoring retrofit, and its eligible categories are solar PV rather than monitoring equipment.",
"recommendedRepair": "Remove the Solar*Rewards opportunity from this retrofit match or keep it excluded from all submetering scenarios.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "thermal_energy_storage",
"retrofitDisplayName": "Thermal energy storage",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:658"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is internally valid because the ITC opportunity has no calculation package or alternative scenario in this packet.",
"recommendedRepair": "No scenario-combination repair. Add ITC calculation and tax/elective-pay treatment before creating a nonzero scenario.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "variable_frequency_drive_retrofit",
"retrofitDisplayName": "Variable frequency drive retrofit",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:1580"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is internally valid because Xcel is matched but no calculable package or alternative scenario is supplied.",
"recommendedRepair": "No scenario-combination repair. Add Xcel motors/VFD calculation rules before creating an incentive scenario.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "walk_in_cooler_freezer_upgrade",
"retrofitDisplayName": "Walk-in cooler/freezer upgrade",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:1580"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is internally valid because Xcel is matched but no calculable package or alternative scenario is supplied.",
"recommendedRepair": "No scenario-combination repair. Add Xcel walk-in refrigeration calculation rules before creating an incentive scenario.",
"needsMathVerificationLater": false
}
],
"summary": {
"retrofitsReviewed": 31,
"highSeverityCount": 0,
"mediumSeverityCount": 4,
"lowSeverityCount": 27,
"noIssueRetrofitCount": 18,
"dataGapRetrofitCount": 4
}
}

