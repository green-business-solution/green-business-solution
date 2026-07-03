{
"schemaVersion": "retrofi_scenario_combination_verification.v1",
"reviewedBy": "gpt_pro",
"testCaseId": "santa-clara-university-campus",
"testCaseOrdinal": 9,
"overallAssessment": "issues_found",
"findings": [
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"retrofitDisplayName": "High-efficiency HVAC replacement",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [],
"affectedScenarioIds": [],
"explanation": "The selected no-incentives scenario is internally valid for this pass. The matched SVP nonprofit grant, SVP new construction incentives, SVP customer-directed electrification rebate, and Energy Design Assistance packages were all excluded from runtime totals due to human review, not-user-facing defaults, or non-monetary workflow treatment. PACE and MACRS are financing or tax cost-recovery opportunities rather than direct scenario incentives. No listed alternative scenario has a higher compatible benefit. Source packet cited: ",
"recommendedRepair": "No scenario-combination repair needed. Keep suppressed/non-user-facing packages out of selected runtime totals unless RetroFi later supports user-facing human-review or financing/tax scenarios.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "low_flow_fixture_retrofit",
"retrofitDisplayName": "Low-flow fixture retrofit",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_SILICON_VALLEY_POWER:svp_source_section:f69ab77394818965:industrial-assessments"
],
"affectedScenarioIds": [],
"explanation": "The selected no-incentives scenario is appropriate. The only matched opportunity explicitly says the low-flow fixture match should be removed because fixture language does not support plumbing or water-efficiency retrofit eligibility, and the opportunity is no-cost technical assistance rather than a direct equipment rebate.",
"recommendedRepair": "Keep this opportunity excluded from monetary scenarios and consider removing or downgrading the retrofit match for low-flow fixtures.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "battery_storage_system",
"retrofitDisplayName": "Battery storage system",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:22615",
"SOURCE_DSIRE:dsire_program_id:3527"
],
"affectedScenarioIds": [],
"explanation": "The selected no-incentives scenario is valid. PACE is financing only and not a direct incentive. MCE Feed-In Tariff Plus explicitly should not be matched as a standalone battery storage rebate; storage is only valid as part of a qualifying solar-plus-storage wholesale generation project, and its V2 package is not user-facing by default with zero totals.",
"recommendedRepair": "Keep standalone battery storage excluded from monetary incentive scenarios for these opportunities. Represent PACE separately as financing if supported.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "ev_charger_installation",
"retrofitDisplayName": "EV charger installation",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-608",
"SOURCE_DSIRE:dsire_program_id:22629",
"SOURCE_DSIRE:dsire_program_id:22278"
],
"affectedScenarioIds": [],
"explanation": "The selected no-incentives scenario is probably correct for runtime totals because all V2 packages are suppressed, low-confidence, no-calculable-value, or not-user-facing defaults. However, the opportunity data contains eligibility problems that block a fully reliable scenario decision: the Azusa Light & Water rebate is residential and requires an Azusa account/service address, while this site is in Silicon Valley Power territory; NEVI and EV HOME are competitive grant programs with missing award probability and project-specific requirements rather than deterministic charger rebates.",
"recommendedRepair": "Remove or mark the Azusa rebate ineligible for this user. Keep NEVI and EV HOME out of selected default monetary scenarios unless a supported competitive-grant expected-value scenario is explicitly created with required inputs and human review.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"retrofitDisplayName": "Ground-source / geothermal heat pump",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [],
"affectedScenarioIds": [],
"explanation": "The selected no-incentives scenario is internally valid. The matched opportunities are loan guarantee, PACE financing, and MACRS tax cost recovery, with no V2 package summaries or runtime-includable direct incentive amounts. No compatible additive rebate or grant scenario is listed.",
"recommendedRepair": "No scenario-combination repair needed. Financing and tax-cost-recovery treatment can be handled separately if RetroFi supports those scenario types.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "led_lighting_retrofit",
"retrofitDisplayName": "LED lighting retrofit",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [],
"affectedScenarioIds": [],
"explanation": "The selected no-incentives scenario is internally valid for default runtime totals. The SVP nonprofit grant has an expected grant amount but is marked human_review_required and excluded from runtime totals. New Construction Incentives are not user-facing by default and apply only to qualifying new construction, additions, or major renovations. Energy Design Assistance is a non-monetary workflow, and MACRS is not represented by a V2 package.",
"recommendedRepair": "No default scenario repair needed. Consider a separate human-review scenario for the SVP nonprofit grant if RetroFi wants to surface conditional grant opportunities outside selected default totals.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "biomass_biogas_energy_system",
"retrofitDisplayName": "Biomass / biogas energy system",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [],
"affectedScenarioIds": [],
"explanation": "The selected no-incentives scenario is valid. REAP is a loan guarantee, MACRS is tax cost recovery, and MCE Feed-In Tariff Plus is not user-facing by default with zero totals. No stackable direct rebate or grant scenario is listed.",
"recommendedRepair": "No scenario-combination repair needed. Keep loan, tax, and tariff opportunities outside selected default rebate/grant totals unless supported by separate scenario handling.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "air_sealing_weatherization",
"retrofitDisplayName": "Air sealing / weatherization",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [],
"affectedScenarioIds": [],
"explanation": "The selected no-incentives scenario is valid for default runtime totals. The SVP nonprofit grant is matched and has an expected grant amount, but it is excluded because it requires human review. LIHEAP is marked no-calculable-value and is residential/household-oriented rather than a commercial campus retrofit incentive.",
"recommendedRepair": "No default scenario repair needed. Do not include LIHEAP in monetary scenarios for this campus. Optionally create a human-review-only pathway for the SVP nonprofit grant.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "combined_heat_and_power_system",
"retrofitDisplayName": "Combined heat and power system",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [],
"affectedScenarioIds": [],
"explanation": "The selected no-incentives scenario is internally valid. The only matched opportunity is MACRS tax cost recovery, with no V2 package summary or direct incentive scenario candidate.",
"recommendedRepair": "No scenario-combination repair needed.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"retrofitDisplayName": "Heat pump HVAC retrofit",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [],
"affectedScenarioIds": [],
"explanation": "The selected no-incentives scenario is valid. The SVP Customer Directed Electrification Rebate is a relevant matched opportunity, but its V2 package is not user-facing by default, uses placeholder/defaulted inputs, and produces zero expected one-time savings in the provided packet.",
"recommendedRepair": "No scenario-combination repair needed. Surface the SVP electrification rebate only as a conditional or non-default opportunity until required inputs support a user-facing calculation.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "solar_water_heating_system",
"retrofitDisplayName": "Solar water heating system",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [],
"affectedScenarioIds": [],
"explanation": "The selected no-incentives scenario is internally valid. The only matched opportunity is MACRS tax cost recovery, with no V2 package summary or direct monetary incentive scenario candidate.",
"recommendedRepair": "No scenario-combination repair needed.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "energy_management_system",
"retrofitDisplayName": "Energy management system",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [],
"affectedScenarioIds": [],
"explanation": "The selected no-incentives scenario is valid for default runtime totals. The SVP Controls Program is relevant, but its V2 package is not user-facing by default, depends on placeholder inputs and verified savings, and shows zero expected one-time savings in the packet.",
"recommendedRepair": "No default scenario repair needed. Keep the Controls Program as a conditional non-default calculation until required project savings and preapproval inputs are available.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "heat_pump_water_heater",
"retrofitDisplayName": "Heat pump water heater",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:heat-pump-water-heater-rebate"
],
"affectedScenarioIds": [],
"explanation": "The selected no-incentives scenario is not clearly wrong because the V2 package reports no supported effect amount and a zero-dollar amount despite runtimeEligibleForTotals being true. However, the package status is internally ambiguous for scenario construction: a relevant SVP heat pump water heater rebate exists, but the packet does not provide a supported nonzero amount or enough inputs to decide whether a calculable rebate scenario should exist.",
"recommendedRepair": "Clarify the V2 package status. If no supported effect amount is available, keep it excluded and set runtimeEligibleForTotals false; if the rebate amount can be calculated from required inputs, create a nonzero rebate scenario candidate for later math verification.",
"needsMathVerificationLater": true
},
{
"retrofitTypeId": "insulation_upgrade",
"retrofitDisplayName": "Insulation upgrade",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [],
"affectedScenarioIds": [],
"explanation": "The selected no-incentives scenario is internally valid. The only matched opportunity is PACE financing, which the packet explicitly says should not be treated as a rebate or direct product incentive.",
"recommendedRepair": "No scenario-combination repair needed.",
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
"explanation": "No calculable scenario is expected. The retrofit is non-physical and unsupported for savings calculation, and the matched San Diego expedited permit program is not a direct equipment rebate and does not support a general LEED certification match for this Santa Clara campus.",
"recommendedRepair": "Keep no scenario. Consider removing or downgrading the LEED match because the opportunity is tied to San Diego sustainable building compliance, not this user's project geography or deterministic LEED certification.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "rooftop_solar_pv",
"retrofitDisplayName": "Rooftop solar PV",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:2794"
],
"affectedScenarioIds": [],
"explanation": "The selected no-incentives scenario is not clearly wrong because the V2 package has no supported effect amount and zero totals. However, the underlying opportunity appears mismatched to this user: it is a CPS Energy Texas solar PV rebate, while the user site is in California and served by Silicon Valley Power. The packet's matchedReasons saying the CA site matches the opportunity geography conflicts with the opportunity's state and hard requirement that the applicant be a CPS Energy customer.",
"recommendedRepair": "Mark the CPS Energy solar PV rebate ineligible for this user and keep it out of scenarios. Investigate geography/utility matching metadata so out-of-territory opportunities do not produce calculable package candidates.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "small_wind_turbine",
"retrofitDisplayName": "Small wind turbine",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [],
"affectedScenarioIds": [],
"explanation": "The selected no-incentives scenario is internally valid. The only matched opportunity is MACRS tax cost recovery, with no V2 package summary or direct incentive scenario candidate.",
"recommendedRepair": "No scenario-combination repair needed.",
"needsMathVerificationLater": false
}
],
"summary": {
"retrofitsReviewed": 17,
"highSeverityCount": 0,
"mediumSeverityCount": 3,
"lowSeverityCount": 14,
"noIssueRetrofitCount": 11,
"dataGapRetrofitCount": 3
}
}

