{
"schemaVersion": "retrofi_scenario_combination_verification.v1",
"reviewedBy": "gpt_pro",
"testCaseId": "la-montanita-nob-hill-albuquerque",
"testCaseOrdinal": 21,
"overallAssessment": "issues_found",
"findings": [
{
"retrofitTypeId": "solar_water_heating_system",
"retrofitDisplayName": "Solar water heating system",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:658",
"SOURCE_DSIRE:dsire_program_id:676",
"SOURCE_DSIRE:dsire_program_id:3532",
"SOURCE_DSIRE:dsire_program_id:22472"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid as a fallback, and no alternative scenario is listed. However, several matched opportunities appear compatible in category terms, including the federal ITC, MACRS, PACE financing, and New Solar Market Development Tax Credit. The packet provides no calculation packages, scenario candidates, or stacking/conflict metadata for these matched incentives, so this pass cannot verify whether a calculable incentive scenario should have existed or whether tax credits, tax cost recovery, and financing should have been combined or separately displayed. The gross receipts tax exemption should stay excluded for this commercial tenant because its hard requirements limit it to sales to government buyers, and the packet says private commercial purchases are blocked. ",
"recommendedRepair": "Add calculable package status and stacking/conflict metadata for the federal ITC, MACRS, New Mexico solar tax credit, and PACE financing, or explicitly mark them non-calculable/not user-facing for this scenario type. Keep the government-only gross receipts deduction out of customer benefit scenarios unless the buyer is a qualifying government.",
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
"SOURCE_DSIRE:dsire_program_id:359"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid as a fallback, and no alternative scenario is listed. But the matched opportunities include potentially relevant tax credit, loan guarantee, MACRS, and New Mexico biomass tax deduction opportunities. The packet has no calculation packages or scenario candidates for any of them, and no stacking/conflict metadata explaining whether a tax credit, cost-recovery benefit, loan guarantee, and compensating tax deduction can be jointly counted or should be shown separately. REAP also has unresolved profile constraints because the business is commercial but the packet does not establish rural small business or agricultural producer eligibility.",
"recommendedRepair": "Provide package inclusion status and stacking metadata for ITC, REAP loan guarantee, MACRS, and the New Mexico biomass deduction. Add eligibility gating for REAP rural/agricultural requirements before allowing it into any scenario.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"retrofitDisplayName": "Ground-source / geothermal heat pump",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:658",
"SOURCE_DSIRE:dsire_program_id:2511",
"SOURCE_DSIRE:dsire_program_id:676",
"SOURCE_DSIRE:dsire_program_id:3532"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid as a fallback, and there is no listed alternative. The matched opportunities include ITC, REAP loan guarantee, MACRS, and PACE financing, all with category support for geothermal or energy improvements. Because the packet provides no calculation packages, no alternative scenario candidates, and no stacking/conflict metadata, this pass cannot determine whether a calculable scenario should have included one or more of these opportunities. REAP also depends on rural small business or agricultural producer status, which is not established by the user profile.",
"recommendedRepair": "Add package status and scenario candidates for the geothermal-relevant opportunities, with explicit treatment for financing and tax cost recovery. Enforce REAP rural/agricultural eligibility before scenario inclusion.",
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
"SOURCE_DSIRE:dsire_program_id:3532",
"SOURCE_DSIRE:dsire_program_id:22472"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid as a fallback. The federal ITC and PACE financing are matched to battery storage, but no calculation packages or scenario candidates are included. The New Solar Market Development Tax Credit is matched, but the packet says standalone battery storage should not match unless integrated with a qualifying solar energy system. The battery retrofit is presented standalone, and no linked solar project is specified, so that opportunity should not be treated as a compatible additive scenario component on this packet.",
"recommendedRepair": "Exclude the New Solar Market Development Tax Credit from standalone battery storage scenarios unless a qualifying integrated solar project is present. Add package status and stacking metadata for ITC and PACE financing so RetroFi can distinguish calculable incentives from financing-only opportunities.",
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
"SOURCE_DSIRE:dsire_program_id:1271"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is acceptable for scenario-combination purposes. The ITC and MACRS matched opportunities both include blockers or notes excluding generic LED lighting. The 179D tax deduction is potentially relevant only as part of a certified qualifying interior lighting, whole-building, or retrofit-property savings calculation, not as a simple LED rebate. No alternative calculated scenario is listed, and the packet lacks a certification/modeling package that would support adding 179D.",
"recommendedRepair": "Keep the no-incentives scenario unless a certified 179D pathway package is added with the required building savings inputs. Do not include ITC or MACRS for ordinary LED lighting.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "rooftop_solar_pv",
"retrofitDisplayName": "Rooftop solar PV",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3980",
"SOURCE_DSIRE:dsire_program_id:3532",
"SOURCE_DSIRE:dsire_program_id:22472"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid as a fallback, and no alternative scenario is listed. The New Solar Market Development Tax Credit and PACE financing are potentially compatible with rooftop solar PV, but no calculation package, package status, scenario candidate, or stacking/conflict metadata is present. The government-only gross receipts tax deduction should stay excluded for this commercial tenant because its hard requirements limit eligibility to sales to qualifying government buyers.",
"recommendedRepair": "Add package status and scenario candidates for the New Solar Market Development Tax Credit and PACE financing, with explicit stacking treatment. Keep the government-only gross receipts deduction excluded unless the buyer is a qualifying government.",
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
"explanation": "The selected no-incentives scenario is internally valid as a fallback. Both the ITC and MACRS matched opportunities list combined heat and power support, but the packet provides no calculation packages, scenario candidates, or stacking/conflict metadata. Therefore this pass cannot determine whether one or both should have appeared in a calculated or user-facing scenario.",
"recommendedRepair": "Add calculation package status and stacking rules for ITC and MACRS on combined heat and power systems, including whether cost-recovery benefits should be included in the same scenario as tax credits.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "ev_charger_installation",
"retrofitDisplayName": "EV charger installation",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:22406"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is appropriate for this pass. The PNM EV Charger Rebate Program has a calculation package, but the package is marked calculable_with_missing_inputs and runtimeInclusionStatus is missing_inputs. The missing inputs include income tier/cost category and site type/charger level, with multiple low-confidence placeholder defaults. Because the package is explicitly excluded from runtime totals, no incentive scenario should be selected from the available packet data.",
"recommendedRepair": "Keep the no-incentives scenario until site type, charger level, eligible cost/category, qualified product, count, and program application path inputs are supplied. Then generate a rebate scenario candidate if the package becomes runtime-eligible.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"retrofitDisplayName": "High-efficiency HVAC replacement",
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
"explanation": "The selected no-incentives scenario is appropriate. The ITC opportunity expressly blocks ordinary high-efficiency HVAC replacement unless it independently qualifies as listed energy property, and MACRS notes that ordinary HVAC replacement is not a specially supported clean-energy MACRS category. No other calculable HVAC incentive scenario is listed.",
"recommendedRepair": "No scenario-combination repair needed. Keep ordinary high-efficiency HVAC replacement out of ITC and MACRS incentive scenarios unless a separate qualifying clean-energy property category is established.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "leed_certification",
"retrofitDisplayName": "LEED certification",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": null,
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:22424",
"SOURCE_DSIRE:dsire_program_id:22423"
],
"affectedScenarioIds": [],
"explanation": "No scenario is generated because the savings preview is unsupported for this non-physical certification/compliance task. That is acceptable for scenario-combination verification. The personal tax credit appears residential-only and should not be included for this commercial grocery profile. The corporate tax credit may be relevant only for a qualifying LEED commercial project or large renovation with EMNRD certification, but the packet does not provide a calculable package or the required project/certification inputs.",
"recommendedRepair": "No scenario-combination repair needed. Keep unsupported/no-scenario behavior unless a qualifying corporate sustainable building tax credit package with certification and project inputs is added.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "small_wind_turbine",
"retrofitDisplayName": "Small wind turbine",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3980",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid as a fallback. MACRS is matched and lists small wind turbine support, but no calculation package or scenario candidate is present. The New Mexico gross receipts tax deduction should stay excluded for this commercial tenant because the packet limits it to sales to qualifying government buyers. Because there is no package status for MACRS, this pass cannot verify whether a calculable MACRS scenario should have existed.",
"recommendedRepair": "Add package status for MACRS on small wind turbines and keep the government-only gross receipts deduction excluded unless the buyer is a qualifying government.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "dc_fast_charger_installation",
"retrofitDisplayName": "DC fast charger installation",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:22406"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is appropriate for this pass. The PNM EV Charger Rebate Program is potentially relevant to commercial DC fast charging, but its package is marked missing_inputs and excluded from runtime totals. Required inputs such as site type, charger level, income/cost category, qualified product, port count, and eligible project cost are not resolved with sufficient confidence.",
"recommendedRepair": "Keep the no-incentives scenario until the missing charger and project-cost inputs are supplied. Then allow a PNM rebate scenario candidate if the package becomes runtime-eligible.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "energy_audit",
"retrofitDisplayName": "Energy audit",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": null,
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3532"
],
"affectedScenarioIds": [],
"explanation": "No scenario is generated because the savings preview is unsupported for this non-physical audit/planning task. That is acceptable for scenario-combination verification. The matched PACE financing opportunity also says energy audits and engineering may be ancillary project costs, not stand-alone retrofit categories, so it should not produce a standalone audit incentive scenario from this packet.",
"recommendedRepair": "No scenario-combination repair needed. Keep energy audit unsupported/no-scenario unless tied to a qualifying financed project with modeled savings or eligible project cost treatment.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "level_2_ev_charger_installation",
"retrofitDisplayName": "Level 2 EV charger installation",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:22406"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is appropriate for this pass. The PNM EV Charger Rebate Program has a high-confidence package, but it is marked calculable_with_missing_inputs and missing_inputs, and it is not included in runtime totals. The packet does not resolve site type, charger level, income/cost category, qualified product, counts, or eligible project cost with sufficient confidence.",
"recommendedRepair": "Keep the no-incentives scenario until the missing Level 2 charger inputs are supplied. Then generate a rebate scenario candidate if the package becomes runtime-eligible.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "microgrid_system",
"retrofitDisplayName": "Microgrid system",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:658"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is acceptable. The only matched opportunity is the federal ITC, but its blockers narrow microgrid eligibility to qualifying microgrid controllers, not all microgrid infrastructure. The retrofit is a broad microgrid system, and the packet does not identify a qualifying microgrid controller or provide a calculation package.",
"recommendedRepair": "No scenario-combination repair needed unless the retrofit is narrowed to a qualifying microgrid controller and a calculable ITC package is added.",
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
"explanation": "The selected no-incentives scenario is internally valid as a fallback, but the only matched opportunity is the federal ITC, which lists thermal energy storage as an eligible category. The packet provides no calculation package, no alternative scenario candidate, and no explicit not-user-facing or missing-input reason. Therefore this pass cannot determine whether an ITC scenario should have been generated.",
"recommendedRepair": "Add package status for the federal ITC on thermal energy storage, including any missing inputs and whether it is eligible for user-facing scenario totals.",
"needsMathVerificationLater": false
}
],
"summary": {
"retrofitsReviewed": 16,
"highSeverityCount": 0,
"mediumSeverityCount": 8,
"lowSeverityCount": 8,
"noIssueRetrofitCount": 5,
"dataGapRetrofitCount": 8
}
}

