{
"schemaVersion": "retrofi_scenario_combination_verification.v1",
"reviewedBy": "gpt_pro",
"testCaseId": "melissas-vernon-distribution",
"testCaseOrdinal": 5,
"overallAssessment": "issues_found",
"findings": [
{
"retrofitTypeId": "ev_charger_installation",
"retrofitDisplayName": "EV charger installation",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-605",
"SOURCE_DSIRE:dsire_program_id:22629",
"SOURCE_DSIRE:dsire_program_id:22278",
"SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-603"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid because all four matched packages are suppressed or excluded from runtime totals. However, the matched opportunity set itself has serious applicability gaps: GFO-25-605 is school-bus-specific, NEVI/GFO-25-603 require public DC fast-charging/corridor compliance, and the Azusa rebate is residential and requires an Azusa Light & Water service address. The packet does not establish that this Vernon refrigerated distribution facility is pursuing any of those lane-specific projects. Therefore the no-incentives selection is acceptable for runtime totals, but the scenario decision is not fully reliable until opportunity matching and project-lane inputs are corrected. ",
"recommendedRepair": "Keep these opportunities out of selected runtime totals unless project-specific eligibility is confirmed. Tighten matching so school-bus, public DCFC/NEVI, residential Azusa, and non-VPU service-area opportunities do not appear as generally eligible for ordinary facility EV charging.",
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
"explanation": "The matched opportunities include federal ITC and MACRS records whose eligible retrofit categories explicitly include ground-source geothermal heat pump or geothermal energy property. No v2 package summaries or calculable incentive scenarios are present, so RetroFi selected no incentives by default. This appears to omit at least potentially compatible federal tax-credit and depreciation opportunities from scenario consideration.",
"recommendedRepair": "Add or repair calculation packages for the ITC and MACRS geothermal matches, or mark them explicitly unsupported for scenario totals with a reason. Scenario construction should then evaluate an ITC/MACRS scenario if compatible with tax treatment rules.",
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
"explanation": "The Business Energy ITC opportunity is matched and explicitly includes battery_storage_system, but the only v2 package summary shown is for the MCE feed-in tariff, which is not user-facing by default and has zero runtime value. The selected no-incentives scenario may be missing a compatible federal ITC scenario for standalone battery storage. The California solar property-tax exclusion and MCE FIT should remain excluded for a standalone battery because their blockers restrict them to active solar/solar-plus-storage or wholesale generation contexts.",
"recommendedRepair": "Add or repair an ITC calculation package for battery storage. Keep the property-tax exclusion and FIT excluded from standalone battery scenarios unless the retrofit is converted to a qualifying solar-plus-storage or wholesale generation project.",
"needsMathVerificationLater": true
},
{
"retrofitTypeId": "biomass_biogas_energy_system",
"retrofitDisplayName": "Biomass / biogas energy system",
"severity": "medium",
"findingType": "no_calculable_scenario_but_should_have_one",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "MACRS is matched and explicitly includes biomass_biogas_energy_system. The selected scenario contains no incentives and the only v2 package summary is for the MCE FIT, which is not included in runtime totals. ITC applicability is narrower because the ITC record says broad biomass combustion is unsupported and only qualified biogas property is supported. REAP has borrower and rural/agricultural eligibility dependencies not established in the packet. At minimum, MACRS appears to be a compatible tax-cost-recovery opportunity that was not represented by a calculable scenario.",
"recommendedRepair": "Add or repair a MACRS package for qualifying biomass/biogas energy property. Gate ITC and REAP scenario inclusion on qualified biogas and borrower/rural eligibility inputs rather than including them by default.",
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
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is reasonable. The ITC and MACRS records explicitly block generic ordinary HVAC replacement. The PACE item is financing rather than a rebate or grant. The PSREC commercial rebate package failed source repair and also requires the applicant to be a Plumas-Sierra REC commercial or irrigation customer, which conflicts with the packet's Vernon Public Utilities site context. No compatible calculable scenario is shown that should replace no incentives.",
"recommendedRepair": "Keep these opportunities out of runtime incentive totals. Improve matching so PSREC service-territory restrictions prevent this opportunity from being marked generally eligible for a Vernon Public Utilities customer.",
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
"SOURCE_DSIRE:dsire_program_id:1271"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is reasonable for a simple LED retrofit. The ITC and MACRS records block generic LED lighting. The PSREC rebate failed source repair and requires a PSREC customer, not established for this Vernon Public Utilities site. The 179D deduction is only valid for a certified qualifying interior-lighting/whole-building/retrofit-property project and should not be treated as a simple LED rebate. No listed compatible calculable scenario should replace no incentives on the packet data.",
"recommendedRepair": "Keep these opportunities excluded from default runtime totals. Require explicit 179D project certification inputs before creating a 179D scenario, and enforce PSREC utility service-area eligibility before matching.",
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
"SOURCE_DSIRE:dsire_program_id:558",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "All three matched opportunities list solar water heating or active solar categories that appear compatible with this retrofit: ITC, California active solar property-tax exclusion, and MACRS. No v2 package summaries or incentive scenarios are present, so selecting no incentives appears to omit compatible additive tax/property-tax opportunities from scenario construction.",
"recommendedRepair": "Add or repair packages for ITC, MACRS, and the California active solar property-tax exclusion, then evaluate a combined scenario if stacking metadata confirms they can coexist.",
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
"explanation": "Both matched federal opportunities explicitly include combined heat and power system or combined heat and power energy property. No v2 package summaries or incentive scenarios are present, so the selected no-incentives scenario appears to omit compatible tax-credit and depreciation opportunities.",
"recommendedRepair": "Add or repair calculation packages for ITC and MACRS CHP eligibility, including any basis-reduction or tax stacking treatment required before final dollar verification.",
"needsMathVerificationLater": true
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"retrofitDisplayName": "Heat pump HVAC retrofit",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:22067"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The only matched opportunity is PSREC, but its package status is source_inaccessible_repair_failure and its hard requirements require a Plumas-Sierra REC commercial or irrigation customer. The user profile indicates Vernon Public Utilities, so the opportunity should not enter a selected scenario on the packet data.",
"recommendedRepair": "Keep no incentives selected. Enforce utility/service-territory matching so PSREC is not marked eligible for this site unless a PSREC account is confirmed.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "heat_pump_water_heater",
"retrofitDisplayName": "Heat pump water heater",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:22067"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The only matched opportunity is PSREC, but its package status is source_inaccessible_repair_failure and its hard requirements require a Plumas-Sierra REC commercial or irrigation customer. The user profile indicates Vernon Public Utilities, so the opportunity should not enter a selected scenario on the packet data.",
"recommendedRepair": "Keep no incentives selected. Enforce utility/service-territory matching so PSREC is not marked eligible for this site unless a PSREC account is confirmed.",
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
"explanation": "The only matched opportunity is PACE financing. The packet repeatedly notes that this is financing, not a rebate or direct incentive, and no v2 package or calculable runtime value is shown. Selecting no incentives is internally valid for incentive totals.",
"recommendedRepair": "No scenario-combination repair needed. Keep PACE represented separately as financing rather than as upfront savings unless a financing model is added.",
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
"explanation": "No selected scenario is present because the retrofit is non-physical/unsupported and requires modeled savings before RetroFi can calculate monthly savings. The matched San Diego SBEP opportunity is also not a general LEED incentive and is geographically/project-type constrained, so no calculable scenario should be created from the packet data.",
"recommendedRepair": "No scenario-combination repair needed. Remove or narrow deterministic LEED matching for private SBEP unless San Diego location and eligible CALGreen/SBEP compliance inputs are present.",
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
"explanation": "The only matched opportunity is the federal ITC, but the opportunity's own blocker says a microgrid match should be limited to qualifying microgrid controllers, not all microgrid infrastructure. The retrofit is a broad microgrid system, and the packet does not provide the required controller-specific qualification. Excluding it from the selected scenario is appropriate on the packet data.",
"recommendedRepair": "Keep no incentives selected unless the retrofit is narrowed to a qualifying microgrid controller or controller cost component with tax-credit inputs.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "rooftop_solar_pv",
"retrofitDisplayName": "Rooftop solar PV",
"severity": "medium",
"findingType": "no_calculable_scenario_but_should_have_one",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:558"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The matched California property-tax exclusion explicitly includes rooftop_solar_pv and active solar systems, but no v2 package summary or calculable incentive scenario is present. The selected no-incentives scenario appears to omit a compatible property-tax incentive from scenario consideration. The packet also shows only this one solar opportunity, so no stacking conflict can be evaluated beyond the missing package.",
"recommendedRepair": "Add or repair a package for the California active solar property-tax exclusion, or explicitly mark property-tax exclusions unsupported for runtime scenario totals with a user-facing reason.",
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
"explanation": "The matched MACRS opportunity explicitly includes small_wind_turbine, but no v2 package summary or incentive scenario is present. The selected no-incentives scenario appears to omit a compatible federal depreciation/tax-cost-recovery opportunity.",
"recommendedRepair": "Add or repair a MACRS package for qualifying small wind property, or explicitly mark it unsupported for scenario totals with a reason.",
"needsMathVerificationLater": true
},
{
"retrofitTypeId": "solar_plus_storage_system",
"retrofitDisplayName": "Solar-plus-storage system",
"severity": "medium",
"findingType": "no_calculable_scenario_but_should_have_one",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:558"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The matched California property-tax exclusion explicitly includes solar_plus_storage_system and solar_integrated_battery_storage, but no v2 package summary or calculable incentive scenario is present. The selected no-incentives scenario appears to omit a compatible property-tax incentive from scenario consideration.",
"recommendedRepair": "Add or repair a package for the California active solar plus storage property-tax exclusion, or explicitly mark property-tax exclusions unsupported for runtime scenario totals with a reason.",
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
"explanation": "The matched federal ITC opportunity explicitly includes thermal_energy_storage, but no v2 package summary or incentive scenario is present. The selected no-incentives scenario appears to omit a compatible federal tax-credit opportunity.",
"recommendedRepair": "Add or repair an ITC package for qualifying thermal energy storage, including required tax-credit qualification inputs.",
"needsMathVerificationLater": true
}
],
"summary": {
"retrofitsReviewed": 17,
"highSeverityCount": 0,
"mediumSeverityCount": 10,
"lowSeverityCount": 7,
"noIssueRetrofitCount": 2,
"dataGapRetrofitCount": 1
}
}

