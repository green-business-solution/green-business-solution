{
"schemaVersion": "retrofi_scenario_combination_verification.v1",
"reviewedBy": "gpt_pro",
"testCaseId": "hoa-mai-gardens-seattle-household",
"testCaseOrdinal": 12,
"overallAssessment": "issues_found",
"findings": [
{
"retrofitTypeId": "insulation_upgrade",
"retrofitDisplayName": "Insulation upgrade",
"severity": "high",
"findingType": "selected_not_optimal",
"selectedScenarioId": "scenario_v2_df1d5132708500ce_v1",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:2837",
"SOURCE_DSIRE:dsire_program_id:5622"
],
"affectedScenarioIds": [
"scenario_v2_df1d5132708500ce_v1",
"scenario_no_incentives"
],
"explanation": "The selected scenario uses the Richland Energy Services rebate, but the packet's user profile lists Seattle City Light as the electric utility and the Richland opportunity has a hard requirement that the applicant must be a Richland Energy Services electric customer. This makes the selected scenario unreliable for this Seattle household. The same retrofit also has Seattle HomeWise as a matched insulation opportunity, and the packet says HomeWise supports insulation for income-qualified residential/multifamily homes, but no calculable package/scenario exists for it. Because HomeWise requires audit/inspection, income, location, and owner cooperation, it may not be automatically calculable, but it should not be displaced by the incompatible Richland scenario. Source packet citation: ",
"recommendedRepair": "Remove or block the Richland opportunity from Seattle City Light customer scenarios unless the utility/customer requirement is satisfied. Add a non-cash or review-gated HomeWise scenario/package for insulation when eligibility prerequisites are unresolved, or keep no-incentives selected if HomeWise cannot be calculated.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"retrofitDisplayName": "Heat pump HVAC retrofit",
"severity": "high",
"findingType": "selected_not_optimal",
"selectedScenarioId": "scenario_v2_df1d5132708500ce_v1",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:2837"
],
"affectedScenarioIds": [
"scenario_v2_df1d5132708500ce_v1",
"scenario_no_incentives"
],
"explanation": "The selected scenario includes the Richland Energy Services rebate even though the user profile identifies Seattle City Light service and the Richland opportunity's hard requirements say the applicant must be a Richland Energy Services electric customer. No compatible additive heat-pump incentive scenario is listed in the packet. The Seattle City Light multifamily new-construction opportunity is correctly excluded from the selected scenario because its blockers state it is not an existing-building retrofit rebate.",
"recommendedRepair": "Block Richland from this retrofit for this Seattle City Light user unless the utility requirement is satisfied. Select the no-incentives scenario unless another compatible, calculable heat pump HVAC opportunity is added.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"retrofitDisplayName": "High-efficiency HVAC replacement",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:4479"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "No-incentives is the correct selected scenario from the listed candidates. The only matched opportunity is Seattle City Light Multifamily New Construction, and its blockers say it is not an existing-building retrofit rebate and should not match HVAC replacement categories.",
"recommendedRepair": "Keep the no-incentives scenario. Consider suppressing the new-construction opportunity from this retrofit's matched opportunities to avoid future scenario confusion.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "rooftop_solar_pv",
"retrofitDisplayName": "Rooftop solar PV",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:727",
"SOURCE_DSIRE:dsire_program_id:666"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "No-incentives is the correct selected scenario from the listed candidates. Both matched IRS subsidy exclusion records are tax treatment for qualifying utility subsidies, not standalone solar PV incentives, and the packet explicitly says not to retain rooftop solar PV as a direct retrofit category for these records.",
"recommendedRepair": "Keep no-incentives selected. Prevent these IRS exclusion records from appearing as standalone solar PV scenario inputs unless paired with a separate qualifying utility subsidy.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "solar_water_heating_system",
"retrofitDisplayName": "Solar water heating system",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:727",
"SOURCE_DSIRE:dsire_program_id:666"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "No-incentives is the correct selected scenario from the listed candidates. Both matched IRS subsidy exclusion records are not standalone solar water heating incentives, and the packet says not to retain solar water heating as a direct retrofit category for these records.",
"recommendedRepair": "Keep no-incentives selected. Only consider these tax-exclusion records when a separate qualifying public utility subsidy exists.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "air_sealing_weatherization",
"retrofitDisplayName": "Air sealing / weatherization",
"severity": "medium",
"findingType": "no_calculable_scenario_but_should_have_one",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:5622"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Seattle HomeWise is a matched opportunity for air sealing/weatherization and the packet says its air sealing match is source-backed for income-qualified residential/multifamily homes. However, no HomeWise package or alternative scenario is present. Because HomeWise measures depend on income eligibility, inspection findings, location, and rental/multifamily owner cooperation, the packet does not prove a dollar scenario should be auto-selected, but the absence of any review-gated or grant scenario means the no-incentives selection may omit a compatible opportunity.",
"recommendedRepair": "Create a HomeWise scenario/package for air sealing that is grant/review-gated or marked blocked by unresolved eligibility inputs. Keep no-incentives selected only if the package cannot be calculated or displayed because required inputs are missing.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "biomass_biogas_energy_system",
"retrofitDisplayName": "Biomass / biogas energy system",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:5840"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "No-incentives is acceptable for cash-savings scenario construction because the only matched opportunity is a WSHFC loan program. The packet explicitly says this is financing, not a rebate, and should not be forced into rebate-style eligibility.",
"recommendedRepair": "Keep no-incentives for rebate/grant savings. Optionally surface WSHFC as financing-only outside incentive totals if financing opportunities are user-facing for this product area.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "combined_heat_and_power_system",
"retrofitDisplayName": "Combined heat and power system",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:5840"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "No-incentives is acceptable for cash-savings scenario construction because the only matched opportunity is the WSHFC Sustainable Energy Program, which the packet describes as loan financing rather than a rebate or grant.",
"recommendedRepair": "Keep no-incentives for cash incentive totals. Optionally show WSHFC as financing-only if loan programs are supported outside savings scenarios.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "community_solar_subscription",
"retrofitDisplayName": "Community solar subscription",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:5840"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "No-incentives is the correct selected scenario. The only matched opportunity is WSHFC Sustainable Energy Program, and its blockers say community solar subscription is a false-positive category; the program may finance community solar projects for owners or developers, not retail subscriptions.",
"recommendedRepair": "Keep no-incentives selected and remove this opportunity from the community_solar_subscription match set, or remap it only to community_solar_project_financing where applicable.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "heat_pump_water_heater",
"retrofitDisplayName": "Heat pump water heater",
"severity": "high",
"findingType": "selected_not_optimal",
"selectedScenarioId": "scenario_v2_df1d5132708500ce_v1",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:2837"
],
"affectedScenarioIds": [
"scenario_v2_df1d5132708500ce_v1",
"scenario_no_incentives"
],
"explanation": "The selected scenario uses the Richland Energy Services rebate, but the user profile lists Seattle City Light electric service and the Richland opportunity requires the applicant to be a Richland Energy Services electric customer. Within the listed scenario candidates, no-incentives is the only scenario that avoids this incompatible utility requirement.",
"recommendedRepair": "Block Richland from this Seattle City Light user and select no-incentives unless a compatible HPWH opportunity is added.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "led_lighting_retrofit",
"retrofitDisplayName": "LED lighting retrofit",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:4479"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "No-incentives is correct from the listed candidates. The only matched opportunity is the Seattle City Light Multifamily New Construction program, whose blockers state it is not an existing-building retrofit rebate and should not match lighting retrofit categories.",
"recommendedRepair": "Keep no-incentives selected and suppress the new-construction program from existing-building lighting retrofit scenario construction.",
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
"explanation": "No-incentives is acceptable for cash-savings scenario construction because the only matched opportunity is Fannie Mae Green Financing, which the packet describes as multifamily mortgage financing rather than a rebate paid directly to tenants or homeowners.",
"recommendedRepair": "Keep no-incentives for incentive totals. Optionally surface Fannie Mae Green Financing as financing-only for qualifying multifamily borrowers, subject to ownership/borrower eligibility.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "waste_heat_recovery",
"retrofitDisplayName": "Waste heat recovery",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:4479"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "No-incentives is correct from the listed candidates. The only matched opportunity is Seattle City Light Multifamily New Construction, and its blockers say it is not an existing-building retrofit rebate and should not match waste heat recovery retrofit categories.",
"recommendedRepair": "Keep no-incentives selected and suppress the new-construction program from existing-building waste heat recovery scenario construction.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "window_replacement",
"retrofitDisplayName": "Window replacement",
"severity": "high",
"findingType": "selected_not_optimal",
"selectedScenarioId": "scenario_v2_df1d5132708500ce_v1",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:2837"
],
"affectedScenarioIds": [
"scenario_v2_df1d5132708500ce_v1",
"scenario_no_incentives"
],
"explanation": "The selected scenario uses the Richland Energy Services rebate despite the user profile showing Seattle City Light electric service and the Richland opportunity requiring the applicant to be a Richland Energy Services electric customer. No other compatible, calculable window replacement opportunity is listed, so no-incentives is the better scenario among the packet's candidates.",
"recommendedRepair": "Block Richland for this Seattle City Light user and select no-incentives unless a compatible window replacement opportunity is added.",
"needsMathVerificationLater": false
}
],
"summary": {
"retrofitsReviewed": 14,
"highSeverityCount": 4,
"mediumSeverityCount": 1,
"lowSeverityCount": 9,
"noIssueRetrofitCount": 0,
"dataGapRetrofitCount": 0
}
}

