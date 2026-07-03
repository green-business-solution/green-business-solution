{
"schemaVersion": "retrofi_scenario_combination_verification.v1",
"reviewedBy": "gpt_pro",
"testCaseId": "ikea-burbank",
"testCaseOrdinal": 2,
"overallAssessment": "issues_found",
"findings": [
{
"retrofitTypeId": "ev_charger_installation",
"retrofitDisplayName": "EV charger installation",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
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
"explanation": "The selected no-incentives scenario is internally valid for this pass because all matched EV packages are suppressed or non-user-facing: NEVI/GFO grants are low-confidence or require award-probability inputs and human review, RECESS is tied to electric school-bus infrastructure, and Azusa appears residential/utility-specific rather than applicable to a Burbank commercial site. No alternative calculable scenario is listed in the packet. Source packet citation: ",
"recommendedRepair": "Keep these opportunities out of runtime scenario totals unless the project is specifically configured as public DC fast charging, school-bus charging, or a qualifying Azusa residential charger. Tighten matching metadata for Azusa and RECESS so they do not appear as broadly eligible commercial Burbank EV opportunities.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"retrofitDisplayName": "Ground-source / geothermal heat pump",
"severity": "low",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:658",
"SOURCE_DSIRE:dsire_program_id:2511",
"SOURCE_DSIRE:dsire_program_id:3527",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The no-incentives scenario contains no stack conflict, but the packet provides no V2 calculation packages for matched ITC, MACRS, REAP loan guarantee, or PACE financing. Because no alternative scenarios or calculable package statuses are listed, this pass cannot determine whether a tax-credit/depreciation/financing scenario should have been constructed.",
"recommendedRepair": "Add repaired package summaries or explicit suppression reasons for ITC, MACRS, REAP, and PACE financing so scenario selection can distinguish unavailable, non-cash, financing-only, and additive tax benefits.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "battery_storage_system",
"retrofitDisplayName": "Battery storage system",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:658",
"SOURCE_DSIRE:dsire_program_id:3527",
"SOURCE_DSIRE:dsire_program_id:22615"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario excludes MCE Feed-In Tariff Plus appropriately because the packet states not to match standalone battery storage and treats storage only as part of a qualifying solar-plus-storage wholesale generation project. However, ITC and PACE are matched opportunities with no V2 package summaries or explicit suppression decisions, so the packet does not support a reliable scenario decision for potentially additive tax-credit or financing opportunities.",
"recommendedRepair": "Keep MCE excluded for standalone battery storage. Add package summaries for ITC and PACE, including whether they are calculable, suppressed as financing/tax-only, or eligible for additive scenario construction.",
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
"SOURCE_DSIRE:dsire_program_id:1630",
"SOURCE_DSIRE:dsire_program_id:22067",
"SOURCE_DSIRE:dsire_program_id:3527",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected scenario excludes BWP and PSREC packages that are not included in runtime totals. BWP is marked not-user-facing-default with placeholder/defaulted inputs, and PSREC is marked source-inaccessible repair failure. The ITC and MACRS records themselves state generic high-efficiency HVAC replacement is not specially supported unless it independently qualifies as listed energy property. No alternative scenario is listed.",
"recommendedRepair": "Keep the selected no-incentives scenario for runtime totals. Improve opportunity matching so PSREC does not match a Burbank Water and Power customer, and add explicit suppression/package metadata for PACE if financing scenarios are intended to be shown separately.",
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
"SOURCE_DSIRE:dsire_program_id:1630",
"SOURCE_DSIRE:dsire_program_id:22067",
"SOURCE_DSIRE:dsire_program_id:676",
"SOURCE_DSIRE:dsire_program_id:1271"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario does not stack incompatible incentives. BWP is suppressed as not-user-facing-default, PSREC is a source-inaccessible repair failure, ITC and MACRS records warn against generic LED treatment, and 179D is only valid as part of a certified qualifying building or retrofit-property calculation rather than a simple LED rebate. No compatible calculable alternative is listed.",
"recommendedRepair": "Keep excluded packages out of runtime totals until project-specific lighting measure, certification, utility-account, and tax inputs are available. Add explicit 179D scenario metadata only for certified whole-building or qualifying retrofit-property pathways.",
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
"SOURCE_DSIRE:dsire_program_id:676",
"SOURCE_DSIRE:dsire_program_id:22615"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "MCE Feed-In Tariff Plus is appropriately excluded from direct incentive totals because its package is not-user-facing-default and its fit depends on a wholesale generation project. But ITC, MACRS, and REAP are matched opportunities with no V2 package summaries or explicit scenario treatment, preventing reliable verification of whether a tax/depreciation/loan-guarantee scenario should exist.",
"recommendedRepair": "Keep MCE out of default runtime totals unless the project is modeled as a 1-5 MW wholesale generation project. Add package summaries and stacking metadata for ITC, MACRS, and REAP, including whether tax benefits and loan guarantees are scenario-eligible or intentionally excluded.",
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
"explanation": "The selected no-incentives scenario has no internal conflict, but both matched opportunities are federal tax/cost-recovery opportunities that appear category-compatible in the packet and have no V2 package summaries. The packet therefore lacks enough information to verify whether a tax-credit/depreciation scenario should have been constructed.",
"recommendedRepair": "Add V2 package summaries for ITC and MACRS and explicit stacking metadata for whether these tax benefits should be additive, mutually exclusive, financing-only, or suppressed from user-facing default scenarios.",
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
"explanation": "The no-incentives scenario is internally valid, but both matched opportunities are potentially category-compatible federal tax/cost-recovery records and neither has a V2 calculation package or explicit suppression reason. The packet does not include enough data to confirm that no incentive scenario should exist.",
"recommendedRepair": "Provide repaired ITC and MACRS packages or explicit non-runtime suppression reasons, plus stack rules governing whether credit and depreciation can be represented together.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"retrofitDisplayName": "Heat pump HVAC retrofit",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:1630",
"SOURCE_DSIRE:dsire_program_id:22067"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario excludes the two matched rebate packages. BWP is not-user-facing-default with placeholder/defaulted inputs, and PSREC is a source-inaccessible repair failure and also appears utility-incompatible with the Burbank Water and Power site. No listed alternative scenario has higher scenario-level benefit.",
"recommendedRepair": "Keep no-incentives as the selected default scenario. Tighten PSREC utility-territory matching and expose BWP only after actual measure, account, invoice/specification, and eligible-cost inputs are available.",
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
"explanation": "The matched ITC record lists thermal energy storage as an eligible category, but the packet provides no V2 package summary, calculation status, or explicit suppression reason. The selected no-incentives scenario may be valid, but that cannot be verified from the packet.",
"recommendedRepair": "Add an ITC package summary for thermal energy storage or an explicit reason it is excluded from scenario construction.",
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
"explanation": "The selected no-incentives scenario is valid for runtime totals because the only matched package is PSREC, which is marked source-inaccessible repair failure, human-review-required, and not included in runtime totals. The packet also indicates the site utility is Burbank Water and Power, while PSREC requires PSREC customer status.",
"recommendedRepair": "Keep PSREC excluded and improve utility-territory matching so it does not appear as eligible for this Burbank site unless a separate qualifying PSREC account is present.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "high_efficiency_motor_replacement",
"retrofitDisplayName": "High-efficiency motor replacement",
"severity": "low",
"findingType": "missing_compatible_opportunity",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:1630"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The only matched opportunity is BWP, and the BWP eligible retrofit categories listed in the packet do not explicitly include high-efficiency motor replacement. The package is not-user-facing-default and uses a generic measure catalog output, so the selected no-incentives scenario is safe. However, because BWP supports custom electric energy-efficiency retrofits, this may be a compatible custom opportunity if qualifying kWh savings and program approval exist.",
"recommendedRepair": "Do not include BWP by default. Add a custom-project dependency path for motor replacements only when annual kWh savings, selected custom measure, BWP business account, project cost, and approval inputs are available.",
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
"explanation": "The selected no-incentives scenario is internally valid. The only matched opportunity is PACE financing, and the packet states this should be represented as financing only, not a rebate or direct incentive. No alternative calculable scenario is listed.",
"recommendedRepair": "No scenario-combination repair needed. Keep PACE as financing-only unless RetroFi creates a separate financing scenario display.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "leed_certification",
"retrofitDisplayName": "LEED certification",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": null,
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:4790"
],
"affectedScenarioIds": [],
"explanation": "No scenario is provided because the retrofit is unsupported and non-physical. The only matched opportunity is a San Diego expedited permitting/sustainable building compliance record, and its blockers state it should not be treated as a general LEED certification or direct equipment rebate. Excluding it from scenarios is appropriate.",
"recommendedRepair": "Keep this out of incentive scenarios for the Burbank LEED certification retrofit. Correct the opportunity match to sustainable building compliance only, and only for qualifying San Diego projects if geography is enforced.",
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
"explanation": "The matched ITC record states a microgrid match should be limited to qualifying microgrid controllers, not all microgrid infrastructure. Because the retrofit is a broad microgrid system and no V2 package or qualifying-controller dependency is provided, the no-incentives scenario is a safe default.",
"recommendedRepair": "Keep ITC excluded unless the project scope isolates a qualifying microgrid controller and provides required tax-credit inputs. Add a dependency so broad microgrid-system retrofits do not automatically enter ITC scenarios.",
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
"explanation": "The matched MACRS record lists small wind turbine as an eligible retrofit category, but the packet provides no V2 package summary or explicit reason for excluding it from scenarios. The no-incentives scenario has no stack conflict, but the packet is insufficient to confirm that no tax cost-recovery scenario should exist.",
"recommendedRepair": "Add a MACRS package summary or explicit suppression reason for small wind turbine projects, including whether depreciation should be modeled as a scenario benefit or excluded from default runtime totals.",
"needsMathVerificationLater": false
}
],
"summary": {
"retrofitsReviewed": 16,
"highSeverityCount": 0,
"mediumSeverityCount": 7,
"lowSeverityCount": 9,
"noIssueRetrofitCount": 1,
"dataGapRetrofitCount": 7
}
}

