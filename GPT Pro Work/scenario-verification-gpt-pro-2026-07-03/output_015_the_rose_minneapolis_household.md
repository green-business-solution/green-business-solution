{
"schemaVersion": "retrofi_scenario_combination_verification.v1",
"reviewedBy": "gpt_pro",
"testCaseId": "the-rose-minneapolis-household",
"testCaseOrdinal": 15,
"overallAssessment": "issues_found",
"findings": [
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"retrofitDisplayName": "High-efficiency HVAC replacement",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:2258",
"SOURCE_DSIRE:dsire_program_id:2555",
"SOURCE_DSIRE:dsire_program_id:2539",
"SOURCE_DSIRE:dsire_program_id:4740",
"SOURCE_DSIRE:dsire_program_id:3310",
"SOURCE_DSIRE:dsire_program_id:1188"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid because no package is included in runtime totals. However, the matched opportunity set contains multiple utility- or ownership-restricted programs that conflict with the profile or need verification before any additive scenario can be trusted: ECE, Princeton PUC, Grand Marais PUC, and MMPA require membership/customer status not shown for this Xcel/CenterPoint Minneapolis tenant profile; Minnesota Energy Resources is a gas program but the profile description says CenterPoint gas; and the Home Energy Loan Program requires a one-to-four-unit owner-occupied primary residence while the profile is a tenant in multifamily housing. This prevents reliable scenario-combination verification for whether an incentive scenario should exist. Source packet: ",
"recommendedRepair": "Repair opportunity matching and required utility/ownership metadata before generating scenario candidates. Keep these opportunities out of stackable scenarios unless the customer, territory, ownership, and occupancy requirements are confirmed.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "ev_charger_installation",
"retrofitDisplayName": "EV charger installation",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:2258",
"SOURCE_DSIRE:dsire_program_id:2555",
"SOURCE_DSIRE:dsire_program_id:2539"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid because all three calculation packages are excluded as human_review_required. No alternative scenario is listed. Verification is blocked because all three EV charger opportunities require specific utility/customer participation or confirmation that is not established for this Xcel Minneapolis profile.",
"recommendedRepair": "Do not form a stackable EV incentive scenario from these municipal/cooperative programs unless participating-utility confirmation is supplied. Add explicit territory/customer gating and preserve the human-review exclusion.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"retrofitDisplayName": "Heat pump HVAC retrofit",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:2258",
"SOURCE_DSIRE:dsire_program_id:2555",
"SOURCE_DSIRE:dsire_program_id:2539",
"SOURCE_DSIRE:dsire_program_id:4740",
"SOURCE_DSIRE:dsire_program_id:4813"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid under runtime rules because all packages are suppressed or not user-facing by default. There is no listed alternative scenario. However, the packet includes a high-confidence Xcel heat-pump package marked not_user_facing_default with expected one-time savings, plus several non-Xcel municipal/cooperative opportunities that require unverified participation. The packet does not provide stacking metadata showing whether the Xcel package could be combined with any utility-specific alternatives, nor does it explain why a user-facing Xcel-only candidate was not produced.",
"recommendedRepair": "Create an explicit candidate generation reason for the Xcel opportunity: either include it as a single-opportunity scenario when user-facing criteria are met, or record why not_user_facing_default must stay excluded. Do not stack it with non-Xcel utility programs absent participating-utility confirmation and conflict metadata.",
"needsMathVerificationLater": true
},
{
"retrofitTypeId": "heat_pump_water_heater",
"retrofitDisplayName": "Heat pump water heater",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:2258",
"SOURCE_DSIRE:dsire_program_id:2555",
"SOURCE_DSIRE:dsire_program_id:2539",
"SOURCE_DSIRE:dsire_program_id:4813"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid under runtime inclusion because the packages are excluded. But the high-confidence Xcel package is marked not_user_facing_default with expected savings, while the municipal/cooperative packages require unverified participation or human review. The packet does not include scenario candidates or metadata explaining whether the Xcel heat pump water heater opportunity should be a standalone selected scenario or remain excluded.",
"recommendedRepair": "Add scenario-candidate audit metadata for not_user_facing_default packages. Produce an Xcel-only scenario only after required inputs and user-facing eligibility are satisfied; keep municipal/cooperative programs excluded unless participation is verified.",
"needsMathVerificationLater": true
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"retrofitDisplayName": "High-efficiency refrigeration equipment",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:2258",
"SOURCE_DSIRE:dsire_program_id:4740"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The no-incentives scenario is valid because no package is included in runtime totals. Verification is blocked because the matched refrigeration opportunities appear to be residential appliance rebate programs, not clearly high-efficiency refrigeration equipment for this multifamily project, and both require unverified utility/member status. No compatible additive scenario can be reliably selected from the packet.",
"recommendedRepair": "Narrow this retrofit mapping to residential refrigerator/freezer appliance measures only where applicable, add participating-utility verification, and avoid scenario creation for commercial or broad refrigeration equipment unless explicitly supported.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "rooftop_solar_pv",
"retrofitDisplayName": "Rooftop solar PV",
"severity": "medium",
"findingType": "no_calculable_scenario_but_should_have_one",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:5417",
"SOURCE_DSIRE:dsire_program_id:1218"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid, but the packet lists two rooftop-solar-relevant opportunities: Xcel Solar*Rewards and Minnesota Solar Energy Sales Tax Exemption. There are no V2 package summaries and no incentive scenario candidates, so the system cannot compare a plausible Xcel-only, sales-tax-only, or combined solar scenario. The IRS subsidy exclusion records should not be treated as standalone solar incentives because their blockers say they are only tax treatment for a separate qualifying public utility subsidy.",
"recommendedRepair": "Add calculable packages or explicit unsupported reasons for Solar*Rewards and the Minnesota solar sales tax exemption. Add stacking/conflict metadata for whether a performance-based utility incentive and state sales tax exemption can be combined. Keep the IRS subsidy exclusion out of standalone solar scenarios unless a qualifying utility subsidy exists.",
"needsMathVerificationLater": true
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"retrofitDisplayName": "Ground-source / geothermal heat pump",
"severity": "low",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:2258"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid because the only package is human_review_required and excluded. The matched ECE opportunity requires ECE membership/service-area status, which is not established for the Xcel Minneapolis profile, so no incentive scenario should be selected without confirmation.",
"recommendedRepair": "Require ECE account/service-area confirmation before creating a geothermal incentive candidate.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "high_efficiency_furnace_retrofit",
"retrofitDisplayName": "High-efficiency furnace retrofit",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3310"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The no-incentives scenario is internally valid under runtime inclusion because the only package is not_user_facing_default. However, the matched opportunity is Minnesota Energy Resources gas, while the profile description identifies CenterPoint gas. The opportunity match also states self-reported utility matches Xcel Energy for a gas program, which is internally inconsistent and blocks reliable scenario selection.",
"recommendedRepair": "Repair gas-utility matching. Only create a furnace rebate scenario after the correct gas territory is confirmed and required natural-gas heating inputs are available.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "insulation_upgrade",
"retrofitDisplayName": "Insulation upgrade",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:4813",
"SOURCE_DSIRE:dsire_program_id:3310",
"SOURCE_DSIRE:dsire_program_id:1188"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is valid under current runtime inclusion, but scenario verification is blocked. The Xcel package is high-confidence but not_user_facing_default and appears to contain effects also used for heat pump measures rather than clearly insulation-specific effects. The Minnesota Energy Resources gas opportunity conflicts with the profile's described CenterPoint gas service. The Home Energy Loan Program requires one-to-four-unit owner-occupied property, conflicting with the tenant/multifamily profile.",
"recommendedRepair": "Separate insulation-specific Xcel package effects from heat-pump package effects, confirm fuel/utility service, and exclude the owner-occupied loan opportunity for this tenant multifamily case unless ownership data changes. Add explicit stackability metadata for Xcel electric/gas and any gas-utility insulation rebates.",
"needsMathVerificationLater": true
},
{
"retrofitTypeId": "led_lighting_retrofit",
"retrofitDisplayName": "LED lighting retrofit",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:4740"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The no-incentives scenario is internally valid because the only package is excluded from runtime totals. Verification is blocked because the MMPA opportunity requires a participating member utility and local form amount, neither of which is established for the Xcel Minneapolis profile. No stackable or alternative scenario can be selected reliably.",
"recommendedRepair": "Gate MMPA lighting scenarios on participating member utility and local form confirmation. Do not create a lighting incentive scenario for this profile unless those inputs are confirmed.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "level_2_ev_charger_installation",
"retrofitDisplayName": "Level 2 EV charger installation",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:2258",
"SOURCE_DSIRE:dsire_program_id:2555",
"SOURCE_DSIRE:dsire_program_id:2539"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid because all packages are human_review_required and excluded. The packet does not establish that the user is an ECE, Princeton PUC, or Grand Marais PUC customer/member, so no additive EV charger scenario should be selected from these opportunities.",
"recommendedRepair": "Add participating-utility confirmation before creating any Level 2 EV charger rebate scenario, and add conflict metadata to prevent stacking mutually exclusive utility-territory rebates.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "solar_water_heating_system",
"retrofitDisplayName": "Solar water heating system",
"severity": "medium",
"findingType": "no_calculable_scenario_but_should_have_one",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:1218"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid, but the Minnesota Solar Energy Sales Tax Exemption is explicitly matched to solar water heating and has no V2 package or scenario candidate. The IRS subsidy exclusion records should stay excluded as standalone incentives because their blockers say a separate qualifying utility subsidy must exist.",
"recommendedRepair": "Add a calculable package or explicit unsupported reason for the Minnesota sales tax exemption for solar water heating. Keep IRS subsidy-exclusion opportunities out of scenarios unless paired with a qualifying public utility subsidy and relevant tax-treatment logic.",
"needsMathVerificationLater": true
},
{
"retrofitTypeId": "air_sealing_weatherization",
"retrofitDisplayName": "Air sealing / weatherization",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:4813",
"SOURCE_DSIRE:dsire_program_id:3310"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is valid under current runtime inclusion. Verification is blocked because the Xcel package is high-confidence but not_user_facing_default and appears reused across unrelated Xcel measures, while the Minnesota Energy Resources gas opportunity conflicts with the profile's stated CenterPoint gas service. The packet lacks stacking metadata for whether electric/gas utility weatherization rebates can combine.",
"recommendedRepair": "Repair measure-specific package effects, confirm the gas utility, and add stacking metadata for Xcel and any confirmed gas-utility weatherization rebates before selecting a combined or single-opportunity scenario.",
"needsMathVerificationLater": true
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
"explanation": "The no-incentives selected scenario is appropriate for incentive totals. The only matched opportunity is Fannie Mae Green Financing, which is mortgage financing for a qualifying multifamily borrower or lender, not a direct rebate for the tenant household. No V2 package or incentive scenario is listed, which is consistent with keeping it out of upfront-savings totals.",
"recommendedRepair": "Keep this financing opportunity out of rebate/grant scenario totals. If financing is displayed separately, require borrower/property-owner context and green mortgage eligibility.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"retrofitDisplayName": "Smart thermostat / zoning retrofit",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3312",
"SOURCE_DSIRE:dsire_program_id:2258"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is valid because the MER package is missing inputs and the ECE package is human_review_required. The MER Home Energy Excellence program is for new construction and should not drive an existing-home retrofit scenario without a new-home project context. The ECE thermostat rebate requires ECE customer/member confirmation, which is not established.",
"recommendedRepair": "Block the new-construction MER program for existing retrofit scenarios unless the project stage and building context confirm new construction. Require ECE customer confirmation before creating an ECE thermostat candidate.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "duct_sealing_and_insulation",
"retrofitDisplayName": "Duct sealing and duct insulation",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3310"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The no-incentives scenario is internally valid because the only package is not_user_facing_default. Verification is blocked because the matched Minnesota Energy Resources gas opportunity conflicts with the profile's stated CenterPoint gas service and has gas-heating/contractor requirements not confirmed in the packet.",
"recommendedRepair": "Confirm gas utility territory and measure requirements before producing a duct-sealing rebate scenario.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "energy_recovery_ventilation_retrofit",
"retrofitDisplayName": "Energy recovery ventilation retrofit",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3310"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The no-incentives scenario is internally valid because the only package is not_user_facing_default. Scenario verification is blocked because the matched Minnesota Energy Resources gas opportunity conflicts with the profile's stated CenterPoint gas service and requires natural-gas heating/service eligibility that is not confirmed.",
"recommendedRepair": "Repair gas-utility matching and require service/measure eligibility before generating an ERV/HRV incentive scenario.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "high_efficiency_boiler_retrofit",
"retrofitDisplayName": "High-efficiency boiler retrofit",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3310"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid because the only package is excluded as not_user_facing_default. Verification is blocked because the matched Minnesota Energy Resources gas opportunity conflicts with the profile's stated CenterPoint gas service and has natural-gas heating/service requirements that are not confirmed.",
"recommendedRepair": "Confirm gas utility territory and boiler-specific eligibility before producing a boiler rebate scenario.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "high_efficiency_laundry_equipment",
"retrofitDisplayName": "High-efficiency laundry equipment",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:4740"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The no-incentives scenario is internally valid because the only package is excluded from runtime totals. Verification is blocked because the MMPA opportunity requires a participating member utility and local residential form, neither of which is established for this Xcel Minneapolis profile.",
"recommendedRepair": "Gate laundry/appliance rebate scenarios on confirmed MMPA member-utility status and local form amount.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "small_wind_turbine",
"retrofitDisplayName": "Small wind turbine",
"severity": "medium",
"findingType": "no_calculable_scenario_but_should_have_one",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:601"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid, but the matched Minnesota Wind Energy Sales Tax Exemption directly supports qualifying small wind turbines and has no V2 package or unsupported reason. A tax-exemption scenario candidate appears missing.",
"recommendedRepair": "Add a calculable package or explicit unsupported reason for the wind sales tax exemption. Generate a wind sales-tax-exemption scenario when purchase-tax inputs are available.",
"needsMathVerificationLater": true
},
{
"retrofitTypeId": "submetering_energy_monitoring",
"retrofitDisplayName": "Submetering / energy monitoring system",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:5417"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is appropriate. The only matched opportunity is Xcel Solar*Rewards, but the opportunity blockers state that production or net metering required for the solar program is not a standalone submetering or energy-monitoring retrofit. No incentive scenario should be formed for this retrofit from that opportunity.",
"recommendedRepair": "Remove or suppress the Solar*Rewards match for submetering/energy monitoring and keep it limited to solar PV scenarios.",
"needsMathVerificationLater": false
}
],
"summary": {
"retrofitsReviewed": 21,
"highSeverityCount": 0,
"mediumSeverityCount": 18,
"lowSeverityCount": 3,
"noIssueRetrofitCount": 0,
"dataGapRetrofitCount": 15
}
}

