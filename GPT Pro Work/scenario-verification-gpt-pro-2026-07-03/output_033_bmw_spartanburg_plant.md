{
"schemaVersion": "retrofi_scenario_combination_verification.v1",
"reviewedBy": "gpt_pro",
"testCaseId": "bmw-spartanburg-plant",
"testCaseOrdinal": 33,
"overallAssessment": "issues_found",
"findings": [
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"retrofitDisplayName": "Ground-source / geothermal heat pump",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:1804",
"SOURCE_DSIRE:dsire_program_id:1803",
"SOURCE_DSIRE:dsire_program_id:676",
"SOURCE_DSIRE:dsire_program_id:2511"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid because no calculable incentive scenario is listed. However, the matched opportunities include a corporate South Carolina geothermal tax credit, MACRS, a personal tax credit, and a USDA REAP loan guarantee. The packet does not provide calculable scenario candidates or stacking metadata for these opportunities, so the pass cannot reliably decide whether a compatible additive tax scenario should have been selected. The personal tax credit and REAP loan guarantee contain blockers for this industrial user/loan structure and should not be forced into the selected scenario without additional eligibility and calculation support. Source packet: ",
"recommendedRepair": "Add or repair calculation/scenario packages for the corporate geothermal tax credit and any supported MACRS/tax-cost-recovery treatment, with explicit rules for whether they are user-facing and stackable. Keep the personal tax credit and REAP loan guarantee excluded unless applicant and project eligibility are verified.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "biomass_biogas_energy_system",
"retrofitDisplayName": "Biomass / biogas energy system",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:5313",
"SOURCE_DSIRE:dsire_program_id:2511",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is acceptable for this pass. The matched USDA opportunities are loan guarantees, not rebate incentives, and contain project/applicant requirements that are not established in the user profile. MACRS is tax cost recovery rather than a direct incentive and has no calculable scenario package in the packet. No listed alternative scenario was excluded in favor of a worse selected scenario.",
"recommendedRepair": "No scenario-combination repair required from the listed candidates. Add calculation packages only if RetroFi intends to expose loan guarantees or tax-cost-recovery opportunities in future scenarios.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "ev_charger_installation",
"retrofitDisplayName": "EV charger installation",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:22665"
],
"affectedScenarioIds": [
"scenario_no_incentives",
"scenario_09e0e215eb311de9_v1"
],
"explanation": "The selected no-incentives scenario is acceptable. The only alternative scenario is an upcoming NEVI grant candidate with a possible-grant entry calculated as 0 cents and the same first-year total benefit as no incentives. The opportunity notes say awards depend on future procurement documents and that the solicitation was not open in official materials, so excluding it from the selected scenario is reasonable.",
"recommendedRepair": "Keep NEVI out of selected runtime totals until the solicitation is active and a nonzero, supportable grant amount can be calculated. It may remain an informational alternative.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"retrofitDisplayName": "High-efficiency HVAC replacement",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3606",
"SOURCE_DSIRE:dsire_program_id:676",
"SOURCE_DSIRE:dsire_program_id:1803"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is acceptable for scenario-combination review. The Duke Energy rebate is a plausible match but its V2 package is suppressed because source repair failed, confidence is low, and human review is required. MACRS explicitly blocks generic ordinary HVAC replacement, and the personal South Carolina credit blocks generic high-efficiency HVAC and commercial/corporate use. No compatible calculable additive scenario is listed.",
"recommendedRepair": "No selected-scenario repair required. Repair the Duke Energy Smart Saver package from accessible current source material before creating a rebate scenario.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "solar_water_heating_system",
"retrofitDisplayName": "Solar water heating system",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:1804",
"SOURCE_DSIRE:dsire_program_id:1803",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The no-incentives scenario is internally valid, but the packet lists a corporate South Carolina tax credit for solar water heating and MACRS as matched opportunities without any calculable scenario candidates or stacking metadata. The personal tax credit is not appropriate for this industrial corporate user, but the corporate tax credit appears potentially compatible from the packet. Because no V2 package or alternative scenario exists, the review cannot determine whether no incentives is truly the best scenario.",
"recommendedRepair": "Create or repair calculation packages for the corporate South Carolina solar/geothermal tax credit and any supported MACRS treatment. Add explicit stacking metadata between corporate tax credits and tax-cost-recovery benefits before selecting no incentives.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "automated_demand_response_controls",
"retrofitDisplayName": "Automated demand response controls",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:1803",
"SOURCE_DSIRE:dsire_program_id:1804"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is correct. Both matched South Carolina tax credit records include blockers stating that standalone automated demand response controls should not be matched as a separate retrofit; demand response is only described within qualifying covered energy equipment. No compatible calculable incentive scenario is listed.",
"recommendedRepair": "Keep these opportunities excluded from automated-demand-response scenarios unless the controls are modeled as part of qualifying solar, hydropower, or geothermal machinery/equipment.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "battery_storage_system",
"retrofitDisplayName": "Battery storage system",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:22419"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is acceptable. The matched property tax exemption is not a rebate or grant and is limited to battery storage that enhances qualifying renewable generating equipment within the statutory size limit. The packet does not show that this standalone battery retrofit is tied to qualifying renewable property or that a calculable property-tax scenario exists.",
"recommendedRepair": "Keep the property tax exemption out of selected savings unless the project includes qualifying renewable generating equipment, the size limit is satisfied, and a property-tax calculation package exists.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "led_lighting_retrofit",
"retrofitDisplayName": "LED lighting retrofit",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3606",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is acceptable for this pass. The Duke Energy rebate match is plausible, but the V2 package is suppressed because source repair failed, confidence is low, and human review is required. MACRS blockers state that generic LED lighting is not specially supported clean-energy MACRS property. No nonzero or compatible alternative scenario is listed.",
"recommendedRepair": "No selected-scenario repair required. Repair the Duke Energy package before adding a lighting rebate scenario.",
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
"explanation": "The selected no-incentives scenario is internally valid. The only matched opportunity is MACRS, which is tax cost recovery rather than a rebate, grant, or direct incentive, and no calculable alternative scenario is present. There is no listed compatible opportunity that was incorrectly excluded from an available scenario.",
"recommendedRepair": "No scenario-combination repair required. Add a tax-cost-recovery package only if RetroFi intends to model MACRS in user-facing scenarios.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "engineering_feasibility_study",
"retrofitDisplayName": "Engineering feasibility study",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": null,
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:5313"
],
"affectedScenarioIds": [],
"explanation": "There is no selected scenario because the retrofit is nonphysical and the savings preview is unsupported pending modeled savings. The only matched opportunity explicitly blocks standalone engineering feasibility studies as a source-backed retrofit category. Therefore there is no calculable scenario that should have been selected from the packet.",
"recommendedRepair": "No scenario-combination repair required. Keep unsupported until there is a resulting modeled savings input and a source-backed study incentive, if any.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "fuel_cell_system",
"retrofitDisplayName": "Fuel cell system",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:2755"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid, but the matched South Carolina sales tax exemption appears technology- and sector-compatible for qualifying hydrogen/fuel cell equipment. The packet does not provide a calculable sales-tax-exemption package or an alternative scenario, so it is not possible to verify that no incentives is the best combination.",
"recommendedRepair": "Add a calculation package and scenario candidate for the South Carolina hydrogen fuel cell sales tax exemption, limited to qualifying device/equipment/machinery purchases and excluding unrelated installation costs.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "high_efficiency_commercial_dishwasher",
"retrofitDisplayName": "High-efficiency commercial dishwasher",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3606"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is acceptable for this pass. The Duke Energy rebate is a plausible matched opportunity, but its V2 package is suppressed due to source-inaccessible repair failure, low confidence, and human review requirement. No calculable compatible alternative exists in the packet.",
"recommendedRepair": "No selected-scenario repair required. Repair the Duke Energy Smart Saver package before creating a dishwasher rebate scenario.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"retrofitDisplayName": "High-efficiency refrigeration equipment",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3606"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is acceptable for this pass. The Duke Energy rebate is a plausible matched opportunity, but its V2 package is suppressed because source repair failed, confidence is low, and human review is required. There is no compatible calculated alternative in the packet.",
"recommendedRepair": "No selected-scenario repair required. Repair the Duke Energy Smart Saver package before creating a refrigeration rebate scenario.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "hvac_controls_retrofit",
"retrofitDisplayName": "HVAC controls retrofit",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3606"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is acceptable for this pass. The Duke Energy rebate is a plausible matched opportunity, but its V2 package is suppressed because source repair failed, confidence is low, and human review is required. No calculable compatible alternative is present.",
"recommendedRepair": "No selected-scenario repair required. Repair the Duke Energy Smart Saver package before creating an HVAC controls rebate scenario.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "insulation_upgrade",
"retrofitDisplayName": "Insulation upgrade",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3606"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is acceptable for this pass. The Duke Energy rebate match is plausible only as a current nonresidential envelope measure, but its V2 package is suppressed due to source-inaccessible repair failure, low confidence, and human review requirement. No compatible calculated alternative exists.",
"recommendedRepair": "No selected-scenario repair required. Repair the Duke Energy package with current nonresidential measure support before creating an insulation rebate scenario.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "rooftop_solar_pv",
"retrofitDisplayName": "Rooftop solar PV",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:21862"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is correct. The only matched opportunity is a Santee Cooper residential rooftop solar rebate, but the user is an industrial Duke Energy Carolinas site. The opportunity hard requirements specify Santee Cooper residential customer eligibility, so it should not enter a selected scenario for this user even though a suppressed package exists.",
"recommendedRepair": "Correct the opportunity match so this Santee Cooper residential rebate is not marked eligible for this industrial Duke Energy site, and keep it excluded from scenarios.",
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
"explanation": "The selected no-incentives scenario is internally valid. The only matched opportunity is MACRS, which is tax cost recovery rather than a rebate, grant, or direct incentive, and no calculable scenario candidate is listed. There is no evidence of an invalid stack, omitted compatible calculated scenario, or duplicate opportunity.",
"recommendedRepair": "No scenario-combination repair required. Add MACRS modeling only if RetroFi intends to include tax-cost-recovery effects in scenario totals.",
"needsMathVerificationLater": false
}
],
"summary": {
"retrofitsReviewed": 17,
"highSeverityCount": 0,
"mediumSeverityCount": 3,
"lowSeverityCount": 14,
"noIssueRetrofitCount": 10,
"dataGapRetrofitCount": 3
}
}

