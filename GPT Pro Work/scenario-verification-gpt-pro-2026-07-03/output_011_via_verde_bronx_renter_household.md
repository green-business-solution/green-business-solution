{
"schemaVersion": "retrofi_scenario_combination_verification.v1",
"reviewedBy": "gpt_pro",
"testCaseId": "via-verde-bronx-renter-household",
"testCaseOrdinal": 11,
"overallAssessment": "issues_found",
"findings": [
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
"explanation": "The selected no-incentives scenario is appropriate for combination purposes. Both matched IRS subsidy-exclusion opportunities are explicitly described as tax treatment only, not standalone solar PV incentives, and each requires a separate qualifying public-utility subsidy before it becomes relevant. No such separate subsidy is present in this retrofit packet, and there are no calculable package summaries or alternative scenarios showing an includable value. ",
"recommendedRepair": "Keep these opportunities excluded from the selected rooftop solar PV scenario unless a separate qualifying public-utility subsidy is also matched and calculated. Consider removing or suppressing these records from direct rooftop solar PV incentive matching because the packet itself says not to retain them as direct solar categories.",
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
"explanation": "The selected no-incentives scenario is appropriate for combination purposes. The same two IRS subsidy-exclusion opportunities are matched, but both have blockers stating they should not be treated as standalone solar water heating incentives and require a separate qualifying public-utility subsidy. The packet includes no such subsidy, no calculable package summaries, and no compatible alternative scenario. ",
"recommendedRepair": "Keep these opportunities excluded from the selected solar water heating scenario unless a separate qualifying public-utility subsidy is present. Consider suppressing these records from direct solar water heating incentive matching.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "battery_storage_system",
"retrofitDisplayName": "Battery storage system",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3652"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario avoids counting the Town of Babylon Green Homes opportunity, which is directionally correct because the opportunity blockers state battery storage is not supported and should not match. However, the packet still labels the opportunity as eligible for this Bronx renter household even though hard requirements say the applicant must own a one- or two-family home in the Town of Babylon. This bad opportunity match prevents a clean scenario decision because the matched-opportunity set itself is unreliable. ",
"recommendedRepair": "Mark this opportunity ineligible or remove it from battery storage matching for this user profile. Do not create a calculable battery storage scenario from this opportunity.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "duct_sealing_and_insulation",
"retrofitDisplayName": "Duct sealing and duct insulation",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3652"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario may be reasonable because no calculable package or alternative scenario is provided, but the underlying matched opportunity is not reliable for this user. The packet says duct sealing is a valid measure for the Town of Babylon program, yet the hard requirements require a one- or two-family homeowner in the Town of Babylon, while the user is a tenant in Bronx multifamily housing. Because the opportunity is simultaneously marked eligible and contains hard requirements the user does not appear to satisfy, scenario inclusion cannot be reliably verified. ",
"recommendedRepair": "Correct the eligibility match for the Town of Babylon opportunity before scenario selection. If the user does not own a one- or two-family home in the Town of Babylon, keep the opportunity out of calculable scenarios.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "insulation_upgrade",
"retrofitDisplayName": "Insulation upgrade",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3652"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario may be reasonable because there is no calculable package or alternative scenario, but the matched Town of Babylon opportunity conflicts with the user profile. The packet says insulation is valid for the program, but the hard requirements limit the program to homeowners of one- or two-family homes in the Town of Babylon. The user is described as a Bronx renter in multifamily housing. This eligibility mismatch blocks reliable verification of whether an incentive scenario should exist. ",
"recommendedRepair": "Correct the Town of Babylon eligibility match for this retrofit. If the location and ownership requirements are not satisfied, remove the opportunity from the matched set and keep no-incentives selected.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "led_lighting_retrofit",
"retrofitDisplayName": "LED lighting retrofit",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3652"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario correctly avoids counting the Town of Babylon opportunity for LED lighting, because the opportunity blockers explicitly state LED lighting is not supported and should not match. However, the opportunity is still marked eligible despite those blockers and despite hard requirements for a Town of Babylon one- or two-family homeowner, which do not fit the Bronx renter multifamily profile. This is primarily an opportunity-data problem that blocks reliable scenario verification. ",
"recommendedRepair": "Remove or mark the Town of Babylon opportunity ineligible for LED lighting for this profile. Do not include it in a scenario unless corrected source data supports both the measure and the user eligibility.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "low_flow_fixture_retrofit",
"retrofitDisplayName": "Low-flow fixture retrofit",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:5780"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario may be appropriate because the packet provides no calculable package or alternative scenario for the Fannie Mae Green Financing opportunity. However, the opportunity is a multifamily green mortgage loan for borrowers, property owners, and lenders, while the user profile is a renter household. The packet says the low-flow fixture match is valid only as a multifamily loan-supported water-efficiency measure, so the opportunity may be relevant to the property but not directly to the tenant. That ownership/applicant ambiguity prevents reliable scenario inclusion verification. ",
"recommendedRepair": "Add explicit applicant/beneficiary handling for tenant versus multifamily property owner financing. Keep this opportunity excluded from tenant-facing savings totals unless the scenario is intentionally modeling landlord/property-level financing rather than tenant benefits.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"retrofitDisplayName": "Smart thermostat / zoning retrofit",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3464"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is not proven wrong because the V2 package summary for the RG&E opportunity has no calculable value, low confidence, and is suppressed from runtime totals. However, the matched opportunity is problematic for this Bronx ConEd user because the program is administered by RG&E and the hard requirements say the customer must be served by RG&E, while the user reports Consolidated Edison. The packet also says smart thermostat support should be treated as demand-response or rewards participation, not necessarily an upfront rebate. These issues block a reliable scenario decision. ",
"recommendedRepair": "Correct utility-territory eligibility before scenario construction. For a ConEd customer, do not include the RG&E opportunity unless the user is verified to be RG&E-served or a transferable statewide pathway is separately identified. Keep the suppressed no-cash-value package out of selected totals.",
"needsMathVerificationLater": false
}
],
"summary": {
"retrofitsReviewed": 8,
"highSeverityCount": 0,
"mediumSeverityCount": 6,
"lowSeverityCount": 2,
"noIssueRetrofitCount": 0,
"dataGapRetrofitCount": 6
}
}

