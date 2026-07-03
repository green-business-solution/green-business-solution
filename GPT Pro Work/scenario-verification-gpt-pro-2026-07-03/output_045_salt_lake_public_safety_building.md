{
"schemaVersion": "retrofi_scenario_combination_verification.v1",
"reviewedBy": "gpt_pro",
"testCaseId": "salt-lake-public-safety-building",
"testCaseOrdinal": 45,
"overallAssessment": "issues_found",
"findings": [
{
"retrofitTypeId": "biomass_biogas_energy_system",
"retrofitDisplayName": "Biomass / biogas energy system",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:2511",
"SOURCE_DSIRE:dsire_program_id:676",
"SOURCE_DSIRE:dsire_program_id:83",
"SOURCE_DSIRE:dsire_program_id:248"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid, but the packet has matched opportunities and no v2 package summaries or alternative calculable scenarios for this retrofit. Several matched opportunities also appear questionable for this government public-safety user: REAP has borrower limits tied to agricultural producers or rural small businesses, the personal Utah RESTC is residential, and MACRS is tax cost recovery for depreciable taxpayer property. The corporate Utah RESTC appears technology-compatible for commercial biomass, but the packet provides no calculation package or stacking metadata, so scenario selection cannot be reliably verified from the packet alone. ",
"recommendedRepair": "Add or repair calculation-package and eligibility metadata for the Utah corporate RESTC where applicable, suppress the personal RESTC for nonresidential government users, and require explicit borrower/taxpayer eligibility handling for REAP and MACRS before creating incentive scenarios.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"retrofitDisplayName": "Ground-source / geothermal heat pump",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:2511",
"SOURCE_DSIRE:dsire_program_id:676",
"SOURCE_DSIRE:dsire_program_id:83",
"SOURCE_DSIRE:dsire_program_id:248"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario contains no invalid stack, but matched opportunities include potentially calculable or at least scenario-relevant programs without package summaries. The Utah corporate RESTC lists geothermal as eligible for commercial systems, while the personal RESTC is residential and should not apply to this nonresidential government facility. REAP and MACRS have applicant/taxpayer eligibility constraints that are not resolved by the selected scenario. Because no alternative scenario or v2 package summary exists, this retrofit cannot be reliably verified as correctly selecting no incentives. ",
"recommendedRepair": "Create explicit package/eligibility handling for the Utah corporate RESTC geothermal case, suppress personal RESTC for this profile, and add user-facing exclusion or blocked-package metadata for REAP and MACRS where borrower/taxpayer eligibility is not satisfied.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"retrofitDisplayName": "High-efficiency HVAC replacement",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:2412"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid. The only plausible rebate package, Rocky Mountain Power wattsmart Business, is present in v2 summaries but is not user-facing by default, not included in runtime totals, and depends on low-confidence placeholder/defaulted inputs. The other matched tax-credit/depreciation opportunities should not be added for ordinary high-efficiency HVAC replacement based on their blockers and eligible technology lists.",
"recommendedRepair": "No scenario-combination repair needed. Keep wattsmart out of selected totals until measure-specific inputs and user-facing eligibility are resolved.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "solar_water_heating_system",
"retrofitDisplayName": "Solar water heating system",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:676",
"SOURCE_DSIRE:dsire_program_id:83",
"SOURCE_DSIRE:dsire_program_id:248"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid, and the personal RESTC should stay excluded for this nonresidential government facility. However, the Utah corporate RESTC lists solar/renewable thermal technologies for commercial systems, and MACRS lists solar water heating as an eligible category subject to taxpayer/property requirements. No v2 package summaries or alternative calculable scenarios are provided, so the packet does not establish whether no incentives is the correct scenario combination.",
"recommendedRepair": "Add package or blocked-package metadata for the Utah corporate RESTC and MACRS. Suppress personal RESTC for nonresidential profiles. Record explicit reasons if government ownership/taxpayer status blocks corporate tax-credit or depreciation inclusion.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "battery_storage_system",
"retrofitDisplayName": "Battery storage system",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:83",
"SOURCE_DSIRE:dsire_program_id:248"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is valid. Both matched Utah RESTC opportunities contain blockers indicating home batteries or other energy storage installations are not eligible, and the eligible retrofit categories listed for these opportunities do not include standalone battery storage. Excluding them from the selected scenario is appropriate.",
"recommendedRepair": "No scenario-combination repair needed. Consider improving upstream opportunity matching so Utah RESTC records are not marked eligible for standalone battery storage.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "ev_charger_installation",
"retrofitDisplayName": "EV charger installation",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:22661"
],
"affectedScenarioIds": [
"scenario_no_incentives",
"scenario_4e0c9ad6e33432e7_v1"
],
"explanation": "The selected no-incentives scenario is internally valid. The only alternative NEVI scenario has the same zero first-year total benefit as no incentives, reports zero possible grant amount, and the matched opportunity itself has uncertain availability with a blocker stating the Phase 1.A request for applications is closed. There is no packet basis to prefer the NEVI alternative over no incentives.",
"recommendedRepair": "No scenario-combination repair needed. Keep NEVI as non-selected unless a current open solicitation and nonzero calculable grant amount are available.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "led_lighting_retrofit",
"retrofitDisplayName": "LED lighting retrofit",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:2412"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid. The wattsmart Business package is present but not user-facing by default, not included in runtime totals, and depends on low-confidence placeholder/defaulted inputs. MACRS should not be added for generic LED lighting because its blockers say generic LED lighting is not specially supported under this opportunity.",
"recommendedRepair": "No scenario-combination repair needed. Keep wattsmart out of selected totals until measure-specific inputs and user-facing eligibility are resolved.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "rooftop_solar_pv",
"retrofitDisplayName": "Rooftop solar PV",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:83",
"SOURCE_DSIRE:dsire_program_id:248"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid, and the personal RESTC should stay excluded because it is residential and its blockers state residential solar PV installed in 2024 and later is not eligible. However, the Utah corporate RESTC lists commercial solar PV as eligible, and the user is a nonresidential government owner. The packet provides no v2 package summary, alternative scenario, or explicit government/taxpayer eligibility blocker, so it is not possible to verify that the compatible corporate opportunity was correctly excluded.",
"recommendedRepair": "Add calculation-package or blocked-package metadata for the Utah corporate RESTC on commercial solar PV, including explicit handling of government/non-taxpayer eligibility if applicable. Suppress the personal RESTC for this profile.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "combined_heat_and_power_system",
"retrofitDisplayName": "Combined heat and power system",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid, but the only matched opportunity, MACRS, lists combined heat and power as an eligible category subject to depreciable property and taxpayer requirements. The packet contains no v2 package summary or explicit blocked-package reason for this government-owned public facility, so the correctness of excluding MACRS from a scenario cannot be verified.",
"recommendedRepair": "Add blocked-package or calculable-package metadata for MACRS with explicit government/taxpayer and depreciable-property handling.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"retrofitDisplayName": "Heat pump HVAC retrofit",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:2412"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid. The wattsmart Business package is present but not user-facing by default, not included in runtime totals, and depends on low-confidence placeholder/defaulted inputs. No listed alternative has a positive scenario-level benefit that should displace the selected scenario.",
"recommendedRepair": "No scenario-combination repair needed. Keep wattsmart out of selected totals until measure-specific inputs and user-facing eligibility are resolved.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "heat_pump_water_heater",
"retrofitDisplayName": "Heat pump water heater",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:2412"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid. The wattsmart Business package is present but not user-facing by default, not included in runtime totals, and depends on low-confidence placeholder/defaulted inputs. The packet provides no alternative positive-benefit scenario that should be selected instead.",
"recommendedRepair": "No scenario-combination repair needed. Keep wattsmart out of selected totals until business-use equipment inputs and user-facing eligibility are resolved.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "high_efficiency_laundry_equipment",
"retrofitDisplayName": "High-efficiency laundry equipment",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:2412"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid. The only matched package is wattsmart Business, and it is not user-facing by default, not included in runtime totals, and dependent on low-confidence placeholder/defaulted inputs. No positive-benefit alternative scenario is listed.",
"recommendedRepair": "No scenario-combination repair needed. Keep wattsmart out of selected totals until product-specific business laundry inputs and user-facing eligibility are resolved.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"retrofitDisplayName": "High-efficiency refrigeration equipment",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:2412"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid. The only matched package is wattsmart Business, and it is not user-facing by default, not included in runtime totals, and dependent on low-confidence placeholder/defaulted inputs. No positive-benefit alternative scenario is listed.",
"recommendedRepair": "No scenario-combination repair needed. Keep wattsmart out of selected totals until measure-specific refrigeration inputs and user-facing eligibility are resolved.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "lighting_controls_retrofit",
"retrofitDisplayName": "Lighting controls retrofit",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:2412"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid. The only matched package is wattsmart Business, and it is not user-facing by default, not included in runtime totals, and dependent on low-confidence placeholder/defaulted inputs. No positive-benefit alternative scenario is listed.",
"recommendedRepair": "No scenario-combination repair needed. Keep wattsmart out of selected totals until lighting-control measure inputs and user-facing eligibility are resolved.",
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
"explanation": "The selected no-incentives scenario is internally valid, but the only matched opportunity, MACRS, lists small wind turbine as an eligible category subject to depreciable property and taxpayer requirements. The packet contains no v2 package summary or explicit blocked-package reason for this government-owned public facility, so the correctness of excluding MACRS from a scenario cannot be verified.",
"recommendedRepair": "Add blocked-package or calculable-package metadata for MACRS with explicit government/taxpayer and depreciable-property handling.",
"needsMathVerificationLater": false
}
],
"summary": {
"retrofitsReviewed": 15,
"highSeverityCount": 0,
"mediumSeverityCount": 7,
"lowSeverityCount": 8,
"noIssueRetrofitCount": 8,
"dataGapRetrofitCount": 7
}
}

