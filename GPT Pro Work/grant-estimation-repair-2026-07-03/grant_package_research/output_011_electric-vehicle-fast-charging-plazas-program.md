{
"schemaVersion": "retrofi_grant_package_repair.v1",
"researchedAt": "2026-07-03",
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22160",
"programName": "Electric Vehicle Fast-Charging Plazas Program",
"status": "suppress_no_probability_evidence",
"sourceConfidence": "medium",
"estimateConfidenceIfInputsPresent": "low",
"officialSources": [
{
"title": "DCFC Plazas",
"url": "[https://energyoffice.colorado.gov/transportation/grants-incentives/dcfc-plazas](https://energyoffice.colorado.gov/transportation/grants-incentives/dcfc-plazas)",
"owner": "Colorado Energy Office",
"accessed": "2026-07-03",
"evidenceText": "Official administrator page describes the Direct Current Fast-Charging Plazas Grant, lists eligible applicant classes, funding sources as NEVI and CAE, funding amount of $17 million, match varying up to 80%, and an application round labeled Spring 2026. It also states incentives are per charging port, require at least four ports, require minimum 150 kW output, and vary by location. ([Colorado Energy Office][1])"
},
{
"title": "National Electric Vehicle Infrastructure Plan",
"url": "[https://www.codot.gov/programs/innovativemobility/electrification/nevi-plan](https://www.codot.gov/programs/innovativemobility/electrification/nevi-plan)",
"owner": "Colorado Department of Transportation",
"accessed": "2026-07-03",
"evidenceText": "CDOT states NEVI funds are distributed through the Colorado Energy Office DCFC Plazas Program and directs applicants to the DCFC Plazas page for incentive structure, application guide, and application. The page also states NEVI projects must be within one mile of an Alternative Fuel Corridor, while CAE funding makes all parts of Colorado eligible under the DCFC Plazas Program. ([Colorado Department of Transportation][2])"
},
{
"title": "2025 Update of the National Electric Vehicle Infrastructure Program Deployment Plan for Colorado",
"url": "[https://www.codot.gov/programs/innovativemobility/assets/colorado-2025-nevi-plan_final.pdf](https://www.codot.gov/programs/innovativemobility/assets/colorado-2025-nevi-plan_final.pdf)",
"owner": "Colorado Department of Transportation and Colorado Energy Office",
"accessed": "2026-07-03",
"evidenceText": "The 2025 NEVI Plan states Colorado implemented a competitive grant program to identify and award the strongest proposals, that the programs operate on a reimbursement basis, and that CEO establishes individual project agreements after project selection. It also reports three completed grant solicitation rounds and 53 sites awarded totaling $29,117,000 statewide, but does not provide a current-round success probability. ([Colorado Department of Transportation][3])"
},
{
"title": "DCFC Plazas Awards - Public",
"url": "[https://docs.google.com/spreadsheets/d/1VjqJguBah7u92N0qOiSK_BNkDY3qAnVoVVandaSgmEk/edit?gid=32679425](https://docs.google.com/spreadsheets/d/1VjqJguBah7u92N0qOiSK_BNkDY3qAnVoVVandaSgmEk/edit?gid=32679425)",
"owner": "Colorado Energy Office linked public Google Sheet",
"accessed": "2026-07-03",
"evidenceText": "The public awards sheet linked from the Colorado Energy Office page lists awarded projects, ports, kW per port, and funding columns across multiple award tabs. It supports historical-awards-only evidence, not a current-round probability denominator. ([Google Docs][4])"
},
{
"title": "Alternative Fuels Data Center: Direct Current (DC) Fast Charging Plazas Grants",
"url": "[https://afdc.energy.gov/laws/12432](https://afdc.energy.gov/laws/12432)",
"owner": "U.S. Department of Energy Alternative Fuels Data Center",
"accessed": "2026-07-03",
"evidenceText": "Federal AFDC listing corroborates that CEO offers DC fast charger grants through the Colorado EV DC Fast Charging Plazas Program, eligible applicants may receive grants up to 80% of project costs at each proposed location, and awardees must provide five years of continuous use. ([Alternative Fuels Data Center][5])"
}
],
"sourceSummary": "Input package reviewed from uploaded prompt file.  Official sources confirm this is a Colorado competitive DCFC plaza grant/reimbursement program, not an entitlement rebate. The official administrator page confirms a $17 million program amount, applicant eligibility categories, a maximum match described as varying up to 80%, per-port incentives, minimum four charging ports, minimum 150 kW output, and storage-related enhanced incentives. CDOT confirms NEVI funding is administered through the DCFC Plazas Program and that CEO evaluates and awards the strongest proposals through a competitive grant process. Official sources found do not provide current-round application volume, success rate, or a machine-extracted current-round rate table from the Google Drive application guide. Therefore no pre-award expected value should be included by default.",
"packagePatch": {
"calculation_status": "no_calculable_value",
"availability": {
"status": "unknown",
"fundingStatus": "unknown"
},
"input_requirements_to_add_or_update": [
{
"input_key": "application_status",
"label": "application status",
"value_type": "enum",
"allowed_values": [
"not_applied",
"drafting",
"submitted",
"awarded",
"denied",
"withdrawn"
],
"required_for": [
"effect_grant_expected_value_1_f3f277efefdea00d"
],
"source_precedence": [
"application_status",
"admin_research",
"user_profile"
],
"missing_severity": "blocks_user_facing_estimate"
},
{
"input_key": "approved_award_amount_cents",
"label": "approved award amount from award notice or grant agreement",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_f3f277efefdea00d"
],
"source_precedence": [
"application_status",
"admin_research",
"user_profile"
],
"missing_severity": "blocks_post_award_calculation"
},
{
"input_key": "eligible_project_cost_cents",
"label": "administrator-approved eligible project cost",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_f3f277efefdea00d"
],
"source_precedence": [
"quote",
"application_status",
"retrofit_assumptions"
],
"missing_severity": "blocks_conditional_formula"
},
{
"input_key": "site_location",
"label": "project site address or coordinates in Colorado",
"value_type": "text",
"required_for": [
"effect_grant_expected_value_1_f3f277efefdea00d"
],
"source_precedence": [
"user_profile",
"quote",
"admin_research"
],
"missing_severity": "blocks_eligibility_check"
},
{
"input_key": "site_county",
"label": "Colorado county for project site",
"value_type": "text",
"required_for": [
"effect_grant_expected_value_1_f3f277efefdea00d"
],
"source_precedence": [
"server_derived",
"user_profile",
"quote"
],
"missing_severity": "blocks_rate_table_lookup"
},
{
"input_key": "number_of_charging_ports",
"label": "number of public DC fast-charging ports",
"value_type": "number",
"required_for": [
"effect_grant_expected_value_1_f3f277efefdea00d"
],
"source_precedence": [
"quote",
"retrofit_assumptions",
"application_status"
],
"missing_severity": "blocks_rate_table_lookup"
},
{
"input_key": "charger_power_kw_per_port",
"label": "minimum guaranteed kW output per charging port",
"value_type": "number",
"required_for": [
"effect_grant_expected_value_1_f3f277efefdea00d"
],
"source_precedence": [
"quote",
"equipment_specs",
"application_status"
],
"missing_severity": "blocks_eligibility_check"
},
{
"input_key": "simultaneous_150kw_vehicle_count",
"label": "number of vehicles that can charge at 150 kW simultaneously",
"value_type": "number",
"required_for": [
"effect_grant_expected_value_1_f3f277efefdea00d"
],
"source_precedence": [
"quote",
"equipment_specs",
"admin_research"
],
"missing_severity": "blocks_rate_table_lookup"
},
{
"input_key": "public_access_commitment_years",
"label": "public use and operation commitment in years",
"value_type": "number",
"required_for": [
"effect_grant_expected_value_1_f3f277efefdea00d"
],
"source_precedence": [
"application_status",
"user_profile",
"quote"
],
"missing_severity": "blocks_eligibility_check"
},
{
"input_key": "selected_funding_source",
"label": "administrator-selected funding source",
"value_type": "enum",
"allowed_values": [
"NEVI",
"CAE",
"mixed",
"unknown"
],
"required_for": [
"effect_grant_expected_value_1_f3f277efefdea00d"
],
"source_precedence": [
"admin_research",
"application_status"
],
"missing_severity": "blocks_eligibility_check"
},
{
"input_key": "within_one_mile_of_designated_alternative_fuel_corridor",
"label": "site is within one mile of a federally designated Alternative Fuel Corridor",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_f3f277efefdea00d"
],
"source_precedence": [
"server_derived",
"admin_research",
"application_status"
],
"missing_severity": "blocks_nevi_eligibility_check"
},
{
"input_key": "storage_configuration",
"label": "battery storage configuration",
"value_type": "enum",
"allowed_values": [
"none",
"battery_integrated_storage",
"standalone_battery_storage",
"unknown"
],
"required_for": [
"effect_grant_expected_value_1_f3f277efefdea00d"
],
"source_precedence": [
"quote",
"equipment_specs",
"application_status"
],
"missing_severity": "needed_for_enhanced_incentive_only"
},
{
"input_key": "storage_kwh",
"label": "battery storage capacity in kWh",
"value_type": "number",
"required_for": [
"effect_grant_expected_value_1_f3f277efefdea00d"
],
"source_precedence": [
"quote",
"equipment_specs",
"application_status"
],
"missing_severity": "needed_for_enhanced_incentive_only"
},
{
"input_key": "current_round_rate_table_verified",
"label": "administrator-verified current round rate table and caps",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_f3f277efefdea00d"
],
"source_precedence": [
"admin_research"
],
"missing_severity": "blocks_pre_award_formula"
}
],
"effects_to_add_or_update": [
{
"effect_id": "effect_grant_expected_value_1_f3f277efefdea00d",
"effect_type": "grant_expected_value",
"cash_value_classification": "reimbursement",
"value_model_kind": "competitive_cost_share",
"calculation": {
"method": "expected_value",
"amount_cents": null,
"percent": null,
"conditional_award_cents": null,
"conditional_award_formula": "Do not calculate a pre-award expected value from the 80% maximum. Official sources show a competitive reimbursement grant with per-port incentives and location-varying amounts, but no official current-round success probability and no machine-extracted current rate table. If application_status == awarded and approved_award_amount_cents is provided from an award notice, grant agreement, or administrator record, use approved_award_amount_cents as the conservative post-award value, subject to reimbursement timing and completed milestone rules. If a human-verified current-round rate table is later added, an approved conditional award can be computed as the lesser of: administrator-approved eligible project cost times approved cost-share percent, per-port award amount by location/rate row times simultaneous_150kw_vehicle_count plus any administrator-approved storage enhancement, the round/site cap, and the approved award amount. Before award, expected_value_cents must remain null and includedInUserFacingTotalDefault must remain false.",
"max_award_cents": null,
"min_award_cents": null,
"rate_rows": [],
"probability_discount": null,
"probability_evidence_type": "historical_awards_only"
},
"required_inputs": [
"application_status",
"approved_award_amount_cents",
"eligible_project_cost_cents",
"site_location",
"site_county",
"number_of_charging_ports",
"charger_power_kw_per_port",
"simultaneous_150kw_vehicle_count",
"public_access_commitment_years",
"selected_funding_source",
"within_one_mile_of_designated_alternative_fuel_corridor",
"storage_configuration",
"storage_kwh",
"current_round_rate_table_verified"
],
"missing_input_behavior": "suppress_until_review",
"includedInUserFacingTotalDefault": false,
"humanReviewRequired": true,
"reasonCodes": [
"competitive_grant",
"award_approval_required",
"no_official_success_probability",
"historical_awards_without_application_denominator",
"max_only_match_percent",
"current_round_rate_table_not_machine_extracted",
"funding_status_and_deadline_unverified",
"site_specific_contract_required",
"reimbursement_basis"
],
"calculationTrace": [
"Colorado Energy Office page confirms DCFC Plazas is a grant program funded by NEVI and CAE with $17 million listed, eligible applicant categories, and match varying up to 80%.",
"Colorado Energy Office page states incentives are per charging port, require a minimum of four charging ports, require at least 150 kW output, and vary by location; the page defers detailed incentive amounts to the application guide.",
"CDOT NEVI page states NEVI funds are distributed through the DCFC Plazas Program and that NEVI-funded projects must be within one mile of a federally designated Alternative Fuel Corridor, while CAE funding can support statewide eligibility.",
"The 2025 Colorado NEVI Plan states Colorado implemented a competitive grant program to identify and award the strongest proposals and that programs operate on a reimbursement basis.",
"The 2025 Colorado NEVI Plan and public awards sheet provide historical awards evidence, but no official current-round application volume, current success rate, or defensible probability discount.",
"Because the only broadly extractable current value rule is a maximum match and the award is competitive, RetroFi should suppress pre-award user-facing expected value."
]
}
]
},
"testCaseInputHints": [
{
"inputKey": "application_status",
"valueType": "enum",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Default to not_applied. Only awarded should unlock any post-award value."
},
{
"inputKey": "approved_award_amount_cents",
"valueType": "money_cents",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Use only a dollar amount from a CEO/CDOT award notice, executed agreement, or administrator record. Do not infer this from project cost."
},
{
"inputKey": "eligible_project_cost_cents",
"valueType": "money_cents",
"whoProvides": "quote",
"realisticDefaultGuidance": "Use administrator-approved eligible project costs, not total project cost if the quote includes ineligible scope."
},
{
"inputKey": "site_location",
"valueType": "text",
"whoProvides": "user",
"realisticDefaultGuidance": "A Colorado site address or coordinates are needed for eligibility, priority, funding-source, and location-rate checks."
},
{
"inputKey": "site_county",
"valueType": "text",
"whoProvides": "server_derived",
"realisticDefaultGuidance": "Derive from site address. Needed for any future current-round location rate table."
},
{
"inputKey": "number_of_charging_ports",
"valueType": "number",
"whoProvides": "quote",
"realisticDefaultGuidance": "Official page says a minimum of four charging ports is required, unless a future official guide creates an exception."
},
{
"inputKey": "charger_power_kw_per_port",
"valueType": "number",
"whoProvides": "quote",
"realisticDefaultGuidance": "Official page states ports must deliver a minimum 150 kW power output."
},
{
"inputKey": "simultaneous_150kw_vehicle_count",
"valueType": "number",
"whoProvides": "quote",
"realisticDefaultGuidance": "The number of vehicles that can charge at 150 kW at the same time determines the incentive amount under the official page."
},
{
"inputKey": "public_access_commitment_years",
"valueType": "number",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Use 5 only if the applicant commits to the required five years of continuous public use; otherwise suppress."
},
{
"inputKey": "selected_funding_source",
"valueType": "enum",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "Use NEVI, CAE, mixed, or unknown based on the official award or administrator guidance."
},
{
"inputKey": "within_one_mile_of_designated_alternative_fuel_corridor",
"valueType": "boolean",
"whoProvides": "server_derived",
"realisticDefaultGuidance": "Required for NEVI eligibility. A CAE-only project may still be statewide eligible, but funding-source selection must be administrator-confirmed."
},
{
"inputKey": "current_round_rate_table_verified",
"valueType": "boolean",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "Default false. Set true only after the current official application guide or administrator rate table has been extracted and reviewed."
}
],
"remainingGaps": [
"The official Google Drive application guide linked by the Colorado Energy Office opened only as a loading page in the web extract, so current-round per-port dollar amounts, location rows, equity adders, storage adders, site caps, and eligible-cost definitions were not machine-extracted from a primary source.",
"The official Salesforce application portal rendered a CSS/loading error, so current live application status, exact current deadline, and submission-state details were not confirmed from extractable official text.",
"Official sources found provide historical award counts and funding totals, but not current-round application count, expected current award count tied to the active round, or official success-rate/probability evidence.",
"The official page states the application round as Spring 2026 with key dates to be determined. As of the research date, the exact open/closed status and remaining funding availability were not defensibly verified from primary extractable text.",
"Site-specific funding source selection, rate-row eligibility, priority-area status, and final approved award amount require administrator or award-document confirmation."
],
"doNotUseAsUserFacingEstimateReasons": [
"Award is competitive and depends on CEO/CDOT selection rather than automatic eligibility.",
"No official current-round success probability, application denominator, or award probability discount was found.",
"The extractable official value language includes a maximum match up to 80% and location-varying per-port incentives, not a guaranteed grant amount.",
"The current official rate table and caps were not extracted from the application guide, so a pre-award formula would require unsupported assumptions.",
"Funding status and exact current deadline were not confirmed from extractable primary administrator text.",
"Program operates on a reimbursement basis and requires project-specific agreement, scope, schedule, budget, completion, and approval."
]
}

[1]: https://energyoffice.colorado.gov/transportation/grants-incentives/dcfc-plazas?utm_source=chatgpt.com "DCFC Plazas | Colorado Energy Office"
[2]: https://www.codot.gov/programs/innovativemobility/electrification/nevi-plan "National Electric Vehicle Infrastructure Plan — Colorado Department of Transportation"
[3]: https://www.codot.gov/programs/innovativemobility/assets/colorado-2025-nevi-plan_final.pdf "Colorado NEVI Plan 2025"
[4]: https://docs.google.com/spreadsheets/d/1VjqJguBah7u92N0qOiSK_BNkDY3qAnVoVVandaSgmEk/edit?gid=32679425 "DCFC Plazas Awards - Public - Google Sheets"
[5]: https://afdc.energy.gov/laws/12432 "Alternative Fuels Data Center: Direct Current (DC) Fast Charging Plazas Grants"

