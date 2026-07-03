{
"schemaVersion": "retrofi_scenario_combination_verification.v1",
"reviewedBy": "gpt_pro",
"testCaseId": "tapiz-mariposa-denver-household",
"testCaseOrdinal": 13,
"overallAssessment": "issues_found",
"findings": [
{
"retrofitTypeId": "rooftop_solar_pv",
"retrofitDisplayName": "Rooftop solar PV",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:22786",
"SOURCE_DSIRE:dsire_program_id:22753",
"SOURCE_DSIRE:dsire_program_id:22763"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is internally valid because all calculable solar rebate/discount packages are explicitly suppressed: Eagle County and Solarize Summit are not user-facing defaults and the Denver solar rebate is low confidence. The packet also gives material eligibility concerns for these opportunities, including Eagle County/Holy Cross/local-area requirements, Denver group-buy quote and partner-funding confirmation, and Solarize Summit local-jurisdiction/campaign requirements. Loan and tax-treatment opportunities are matched but not rebate/grant savings. Source packet: ",
"recommendedRepair": "Keep no-incentives selected for runtime totals unless these suppressed packages become user-facing and their local/geographic, quote, participation, and funding prerequisites are verified.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"retrofitDisplayName": "High-efficiency HVAC replacement",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:4630",
"SOURCE_DSIRE:dsire_program_id:22718",
"SOURCE_DSIRE:dsire_program_id:1581",
"SOURCE_DSIRE:dsire_program_id:5558"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is valid for runtime totals because all calculable packages are suppressed: Boulder EnergySmart is not user-facing by default, HEAR and Xcel require human review, and CORE/Aspen requires human review with a missing award_probability input. Several matched opportunities also have narrow geography or measure restrictions. Financing opportunities are loans and should not add rebate value.",
"recommendedRepair": "Keep no-incentives selected unless a reviewed user-facing scenario engine is allowed to include human-review and not-user-facing packages with verified geography, income, measure, contractor, and award inputs.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "air_sealing_weatherization",
"retrofitDisplayName": "Air sealing / weatherization",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:4630",
"SOURCE_DSIRE:dsire_program_id:22718",
"SOURCE_DSIRE:dsire_program_id:1581"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is valid for runtime totals because all calculable rebate packages are suppressed: Boulder EnergySmart is not user-facing by default, while HEAR and Xcel require human review. RENU, Elevations, and Xcel financing are loan programs and should not be counted as rebate/grant savings.",
"recommendedRepair": "Keep no-incentives selected unless suppressed packages are intentionally enabled after verification of income, preapproval, measure, utility-service, and program-status requirements.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "insulation_upgrade",
"retrofitDisplayName": "Insulation upgrade",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:4630",
"SOURCE_DSIRE:dsire_program_id:22718",
"SOURCE_DSIRE:dsire_program_id:1581"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is valid for runtime totals because all calculable rebate packages are suppressed: Boulder EnergySmart is not user-facing by default, while HEAR and Xcel require human review. The Summit County match has no V2 package and includes geography/process blockers, while loan programs should not add rebate savings.",
"recommendedRepair": "Keep no-incentives selected unless package suppression is changed and income, preapproval, Xcel service, measure, and local geography requirements are verified.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"retrofitDisplayName": "Ground-source / geothermal heat pump",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:4630",
"SOURCE_DSIRE:dsire_program_id:1581"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is valid for runtime totals because the only calculable rebate packages are suppressed: Boulder EnergySmart is not user-facing by default and Xcel requires human review. The Colorado residential renewable property tax exemption is matched but has no calculation package in the packet, and RENU/Elevations are financing rather than direct savings.",
"recommendedRepair": "Keep no-incentives selected; add a future package only if property-tax-exemption value can be calculated and the property ownership/residential renewable equipment requirements are verified.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "solar_water_heating_system",
"retrofitDisplayName": "Solar water heating system",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:2948",
"SOURCE_DSIRE:dsire_program_id:4082"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario may be valid, but the packet does not support a reliable scenario-combination decision because two matched non-loan/non-tax-treatment solar opportunities have no V2 package summaries or alternative scenarios. The Boulder Solar Grant and Boulder Solar Sales and Use Tax Rebate both list solar water heating as eligible, but both also have Boulder-specific geography requirements; the user site is Denver. Because no package exists and no scenario candidate shows exclusion logic, this should be treated as a data gap rather than an assumed missing incentive.",
"recommendedRepair": "Add explicit exclusion or package status for the Boulder Solar Grant and Boulder Solar Sales and Use Tax Rebate, including geography blocking for Denver sites, so no-incentives can be verified rather than inferred.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"retrofitDisplayName": "Heat pump HVAC retrofit",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:4630",
"SOURCE_DSIRE:dsire_program_id:22718",
"SOURCE_DSIRE:dsire_program_id:1581"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is valid for runtime totals because all calculable rebate packages are suppressed: Boulder EnergySmart is not user-facing by default, while HEAR and Xcel require human review. RENU is loan financing and should not add direct rebate/grant savings.",
"recommendedRepair": "Keep no-incentives selected unless suppressed package handling changes and income, region/funding, contractor, Xcel service, and equipment-tier inputs are verified.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "heat_pump_water_heater",
"retrofitDisplayName": "Heat pump water heater",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:4630",
"SOURCE_DSIRE:dsire_program_id:22718",
"SOURCE_DSIRE:dsire_program_id:1581"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is valid for runtime totals because all calculable rebate packages are suppressed: Boulder EnergySmart is not user-facing by default, while HEAR and Xcel require human review. RENU is loan financing and should not add direct rebate/grant savings.",
"recommendedRepair": "Keep no-incentives selected unless suppressed package handling changes and income, preapproval, HEAR region/funding, contractor, Xcel service, and equipment inputs are verified.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "battery_storage_system",
"retrofitDisplayName": "Battery storage system",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:22490",
"SOURCE_DSIRE:dsire_program_id:22489",
"SOURCE_DSIRE:dsire_program_id:4210"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario cannot be fully verified because matched battery opportunities include a Colorado residential energy storage tax credit and sales tax exemption, but there are no V2 package summaries or alternative scenarios explaining why they were excluded. The property tax exemption also appears relevant only when storage is tied to qualifying residential renewable energy equipment. Without package status, stacking metadata, or exclusion traces, it is unclear whether no-incentives is the correct selected combination.",
"recommendedRepair": "Add calculation/package summaries and stacking metadata for the Colorado residential storage tax credit, sales tax exemption, and any renewable-equipment property tax treatment; distinguish standalone storage from renewable-integrated storage.",
"needsMathVerificationLater": true
},
{
"retrofitTypeId": "ev_charger_installation",
"retrofitDisplayName": "EV charger installation",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:22156",
"SOURCE_DSIRE:dsire_program_id:5349"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is valid. The Colorado EV income tax credit explicitly has no eligible retrofit categories and blockers state it does not fund charger installation or building/property retrofit work. RENU is loan financing, not a rebate or grant.",
"recommendedRepair": "Keep no-incentives selected; remove or demote the EV vehicle tax credit from EV charger retrofit opportunity matching if scenario construction depends on matched opportunities.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"retrofitDisplayName": "High-efficiency refrigeration equipment",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:5307"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is valid. The only matched opportunity is Elevations Energy Loans, which is financing rather than a rebate or grant, and its blockers explicitly say commercial refrigeration and business equipment are not supported by this residential financing program.",
"recommendedRepair": "Keep no-incentives selected; remove this opportunity from refrigeration retrofit matching or retain it only as non-savings financing if residential approved-measure evidence is added.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "biomass_biogas_energy_system",
"retrofitDisplayName": "Biomass / biogas energy system",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:4210"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario may be valid, but the matched Colorado residential renewable energy property tax exemption lists biomass/biogas energy systems as eligible and has no V2 package summary or scenario/exclusion trace. Elevations is correctly excluded as financing and does not list biomass in eligible categories, but the property tax incentive creates an unresolved scenario-combination data gap.",
"recommendedRepair": "Add a package summary or explicit unsupported/excluded status for the Colorado residential renewable energy property tax exemption, including ownership, residential property, and value-calculation requirements.",
"needsMathVerificationLater": true
},
{
"retrofitTypeId": "led_lighting_retrofit",
"retrofitDisplayName": "LED lighting retrofit",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:5562",
"SOURCE_DSIRE:dsire_program_id:5307"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is valid. The Summit County opportunity blockers state LED lighting is not supported by current requirements and also has Summit County geography/process requirements. The Elevations opportunity is a loan rather than direct rebate/grant savings.",
"recommendedRepair": "Keep no-incentives selected; remove the Summit County opportunity from LED lighting matching and retain Elevations only as non-savings financing if desired.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "community_solar_subscription",
"retrofitDisplayName": "Community solar subscription",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:4210"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is valid. The only matched opportunity is a residential renewable equipment property tax exemption, and its blockers explicitly say community solar subscriptions should not match because they are not physical residential property equipment located on the home site.",
"recommendedRepair": "Keep no-incentives selected; remove this property tax exemption from community solar subscription matching.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "high_efficiency_commercial_dishwasher",
"retrofitDisplayName": "High-efficiency commercial dishwasher",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:5307"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is valid. The only matched opportunity is Elevations Energy Loans, and its blockers explicitly say commercial dishwashers and other business equipment are not supported by this residential financing program. It is also financing, not a rebate or grant.",
"recommendedRepair": "Keep no-incentives selected; remove the opportunity from commercial dishwasher matching for this residential household profile.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "induction_cooking_equipment",
"retrofitDisplayName": "Induction cooking equipment",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:5349"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is valid. The only matched opportunity is RENU loan financing, and its blockers state induction cooking was not verified on the current RENU page and commercial kitchen induction is a false-positive category for this residential loan.",
"recommendedRepair": "Keep no-incentives selected; remove or block RENU from induction cooking equipment matching unless a current eligible residential cooking measure is verified.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "level_2_ev_charger_installation",
"retrofitDisplayName": "Level 2 EV charger installation",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:5349"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is valid. The only matched opportunity is RENU, which is loan financing and not a rebate or grant. No calculable package or direct savings opportunity is provided for Level 2 EV charger installation.",
"recommendedRepair": "Keep no-incentives selected; represent RENU only as financing support, not scenario savings.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "low_flow_fixture_retrofit",
"retrofitDisplayName": "Low-flow fixture retrofit",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:5780"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is valid. The only matched opportunity is Fannie Mae Green Financing, which is mortgage financing for qualifying multifamily borrowers and not a rebate paid directly to tenants or homeowners. No V2 package or direct savings scenario is provided.",
"recommendedRepair": "Keep no-incentives selected; retain the opportunity only as financing information for the property owner/borrower, not as direct incentive savings for the household scenario.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"retrofitDisplayName": "Smart thermostat / zoning retrofit",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:5562"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is valid. The only matched opportunity is Summit County Energy Smart, whose blockers state smart thermostat or zoning should not match unless the measure is a qualifying programmable thermostat and whose hard requirements limit eligibility to existing residential buildings in Summit County with program enrollment and coach/assessment steps. The user site is Denver.",
"recommendedRepair": "Keep no-incentives selected; block this opportunity for Denver smart thermostat/zoning unless the measure and Summit County geography are verified.",
"needsMathVerificationLater": false
}
],
"summary": {
"retrofitsReviewed": 19,
"highSeverityCount": 0,
"mediumSeverityCount": 3,
"lowSeverityCount": 16,
"noIssueRetrofitCount": 0,
"dataGapRetrofitCount": 3
}
}

