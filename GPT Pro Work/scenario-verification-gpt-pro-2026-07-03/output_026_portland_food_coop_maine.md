{
"schemaVersion": "retrofi_scenario_combination_verification.v1",
"reviewedBy": "gpt_pro",
"testCaseId": "portland-food-coop-maine",
"testCaseOrdinal": 26,
"overallAssessment": "issues_found",
"findings": [
{
"retrofitTypeId": "ev_charger_installation",
"retrofitDisplayName": "EV charger installation",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_formula_c73cf00e09d14526_v1_plus_formula_d566c93b59a1975b_v1",
"affectedOpportunityIds": [],
"affectedScenarioIds": [],
"explanation": "Selected scenario is internally valid. The two selected rules are two additive effects from the same Off-Peak Charger Discount opportunity: a $200 instant discount and a $200 setup bonus. The EV rebate program has no supported nonzero charger effect, and the Public Charger Grants package is low-confidence, human-review, and missing award probability, so those exclusions are supported in this pass. Source packet reviewed: ",
"recommendedRepair": "No scenario-combination repair recommended.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"retrofitDisplayName": "High-efficiency HVAC replacement",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [],
"affectedScenarioIds": [],
"explanation": "The selected no-incentives scenario is acceptable for scenario-combination purposes. The only V2 package is the Efficiency Maine C&I Prescriptive Program, but it is not user-facing by default and is not runtime-eligible for totals. Other matched records are either financing, residential-appliance-bounded, or explicitly narrowed away from ordinary high-efficiency HVAC.",
"recommendedRepair": "No scenario-combination repair recommended. Eligibility and gas/heating-fuel details can be resolved before any future user-facing C&I HVAC package is exposed.",
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
"SOURCE_DSIRE:dsire_program_id:1144",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The no-incentives selection cannot be reliably verified from the packet. Matched opportunities split across qualified biogas property, biomass heating, rural/agricultural REAP financing, and MACRS clean-energy cost recovery, but the retrofit is broad biomass/biogas and the packet lacks the project subtype, ownership/taxpayer basis, rural/agricultural eligibility, and stacking metadata needed to determine whether a non-empty scenario should exist.",
"recommendedRepair": "Add project subtype gates for biomass heating versus qualified biogas, REAP rural/agricultural eligibility, taxpayer ownership/depreciability, and stacking/basis metadata before constructing a scenario.",
"needsMathVerificationLater": true
},
{
"retrofitTypeId": "led_lighting_retrofit",
"retrofitDisplayName": "LED lighting retrofit",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [],
"affectedScenarioIds": [],
"explanation": "The selected no-incentives scenario is reasonable in this pass. ITC and MACRS blockers exclude generic LED lighting, 179D is not a simple standalone LED rebate and requires certification/savings qualification, and the C&I Prescriptive V2 package is not user-facing by default.",
"recommendedRepair": "No scenario-combination repair recommended.",
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
"explanation": "The packet lists matched federal opportunities whose eligible categories directly include ground-source/geothermal heat pump or geothermal energy property, but there are no V2 packages and no calculated alternative scenario. A no-incentives scenario is therefore likely incomplete, although exact values and stacking treatment should be verified later.",
"recommendedRepair": "Create calculable ITC and MACRS packages for ground-source/geothermal heat pumps and add stacking/basis-reduction metadata before scenario selection.",
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
"explanation": "The selected no-incentives scenario omits the matched federal ITC opportunity even though its eligible categories directly include battery storage. The C-PACE record has tenant/property-owner constraints and is financing, but the ITC omission appears to be caused by the absence of a calculable package rather than an incompatibility.",
"recommendedRepair": "Add a battery-storage ITC calculation package and applicable federal tax-credit stacking metadata. Keep C-PACE excluded unless owner, municipality, lender-consent, and financing treatment are verified.",
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
"explanation": "The packet lists ITC and MACRS opportunities with eligible categories that directly include combined heat and power, but the selected scenario is no incentives and no calculable alternative is present. This is a scenario coverage gap, not a formula-math conclusion.",
"recommendedRepair": "Add calculable CHP ITC and MACRS packages and define their stacking/basis interaction before scenario selection.",
"needsMathVerificationLater": true
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"retrofitDisplayName": "Heat pump HVAC retrofit",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [],
"affectedScenarioIds": [],
"explanation": "The selected no-incentives scenario is acceptable for this pass. The C&I Prescriptive package is not user-facing by default and not runtime-eligible for totals, while the Appliance Rebate Program is explicitly bounded away from space-heating heat pump HVAC.",
"recommendedRepair": "No scenario-combination repair recommended. Future C&I heat-pump scenarios should resolve measure path, equipment, gas/heating-fuel, and customer-class inputs first.",
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
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The packet lists matched federal ITC and MACRS opportunities with eligible categories that directly include solar water heating or solar thermal property, but no calculable package or alternative scenario is present. The selected no-incentives scenario likely omits compatible federal tax benefits.",
"recommendedRepair": "Add solar water heating ITC and MACRS packages and define stacking/basis interaction before scenario selection.",
"needsMathVerificationLater": true
},
{
"retrofitTypeId": "air_sealing_weatherization",
"retrofitDisplayName": "Air sealing / weatherization",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [],
"affectedScenarioIds": [],
"explanation": "The only matched opportunity is the Efficiency Maine C&I Prescriptive Program. Its V2 package is not user-facing by default and not runtime-eligible for totals, so no additive opportunity was improperly omitted from the selected user-facing scenario.",
"recommendedRepair": "No scenario-combination repair recommended.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "energy_recovery_ventilation_retrofit",
"retrofitDisplayName": "Energy recovery ventilation retrofit",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [],
"affectedScenarioIds": [],
"explanation": "The only matched opportunity is the Efficiency Maine C&I Prescriptive Program, and its V2 package is not user-facing by default and not runtime-eligible for totals. No alternative calculated scenario with an ERV incentive is shown.",
"recommendedRepair": "No scenario-combination repair recommended.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "heat_pump_water_heater",
"retrofitDisplayName": "Heat pump water heater",
"severity": "low",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:5324"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The Appliance Rebate Program record includes heat pump water heaters, but its packet data is internally ambiguous for this commercial grocery user: it is labeled residential and lists residential sectors, while also showing a business claimant path. With no V2 package or alternative scenario, the no-incentives selection cannot be verified as complete.",
"recommendedRepair": "Clarify whether the heat pump water heater rebate is available to this commercial tenant/site and add a calculable package only if the commercial/business claimant path is valid.",
"needsMathVerificationLater": true
},
{
"retrofitTypeId": "high_efficiency_laundry_equipment",
"retrofitDisplayName": "High-efficiency laundry equipment",
"severity": "low",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:5324"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The Appliance Rebate Program record includes high-efficiency laundry equipment, but the packet’s eligibility data is mixed for a commercial grocery site: the program is labeled residential and lists residential sectors, while also showing a business claimant with W-9. No V2 package exists, so the selected no-incentives scenario cannot be verified as complete.",
"recommendedRepair": "Clarify commercial eligibility and site-use applicability for laundry equipment before adding a package or scenario candidate.",
"needsMathVerificationLater": true
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"retrofitDisplayName": "High-efficiency refrigeration equipment",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [],
"affectedScenarioIds": [],
"explanation": "The matched C&I Prescriptive Program is compatible with refrigeration, but its V2 package is not user-facing by default and is not runtime-eligible for totals. No calculated alternative with a refrigeration incentive is shown, so this is not a scenario-combination error in this pass.",
"recommendedRepair": "No scenario-combination repair recommended. Future user-facing refrigeration scenarios should use measure-specific C&I inputs rather than placeholder defaults.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "level_2_ev_charger_installation",
"retrofitDisplayName": "Level 2 EV charger installation",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_formula_c73cf00e09d14526_v1_plus_formula_d566c93b59a1975b_v1",
"affectedOpportunityIds": [],
"affectedScenarioIds": [],
"explanation": "Selected scenario is internally valid. The two selected rule entries are separate components of the same Off-Peak Charger Discount opportunity: an instant discount and a setup bonus. No duplicate separate opportunity is being stacked.",
"recommendedRepair": "No scenario-combination repair recommended.",
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
"explanation": "The matched ITC opportunity is narrowed to a microgrid controller, while the retrofit is a broad microgrid system. The packet lacks cost allocation or subtype data showing what portion, if any, is a qualifying controller. No V2 package exists, so the selected no-incentives scenario cannot be reliably verified.",
"recommendedRepair": "Add microgrid-controller subtype and cost-allocation inputs, then create an ITC package only for the qualifying controller portion.",
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
"explanation": "The matched MACRS opportunity directly lists small wind turbine as an eligible category, but there is no V2 package and the only scenario is no incentives. This appears to omit a compatible tax cost-recovery opportunity from scenario construction.",
"recommendedRepair": "Add a small-wind MACRS package and depreciation/tax-benefit treatment before scenario selection.",
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
"explanation": "The matched ITC opportunity directly lists thermal energy storage as an eligible category, but no V2 package or calculated alternative scenario exists. The selected no-incentives scenario likely omits a compatible federal tax-credit opportunity.",
"recommendedRepair": "Add a thermal energy storage ITC package and applicable federal tax-credit stacking metadata before scenario selection.",
"needsMathVerificationLater": true
},
{
"retrofitTypeId": "variable_frequency_drive_retrofit",
"retrofitDisplayName": "Variable frequency drive retrofit",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [],
"affectedScenarioIds": [],
"explanation": "The only matched opportunity is the Efficiency Maine C&I Prescriptive Program, and its V2 package is not user-facing by default and not runtime-eligible for totals. No calculated alternative with a VFD incentive is shown.",
"recommendedRepair": "No scenario-combination repair recommended.",
"needsMathVerificationLater": false
}
],
"summary": {
"retrofitsReviewed": 19,
"highSeverityCount": 0,
"mediumSeverityCount": 8,
"lowSeverityCount": 2,
"noIssueRetrofitCount": 9,
"dataGapRetrofitCount": 4
}
}

