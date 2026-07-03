{
"schemaVersion": "retrofi_grant_package_repair.v1",
"researchedAt": "2026-07-03",
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3577",
"programName": "Lake Region Electric Cooperative - Agriculture and Commercial Energy Efficiency Grant Program",
"status": "needs_project_inputs",
"sourceConfidence": "high",
"estimateConfidenceIfInputsPresent": "medium",
"officialSources": [
{
"title": "Rebates, Loans, and Tax Credits",
"url": "[https://www.lrec.coop/energy-services/rebates-loans-and-tax-credits/](https://www.lrec.coop/energy-services/rebates-loans-and-tax-credits/)",
"owner": "Lake Region Electric Cooperative",
"accessed": "2026-07-03",
"evidenceText": "LREC states 2026 rebates are available, qualified purchases must be made or installed from 2026-01-01 through 2026-12-15, applications are due by 2026-12-15, rebates are available while funds last, and CI&A forms include Commercial LED Lighting, Custom Energy Rebates, and Dairy. ([Lake Region Electric Cooperative][1])"
},
{
"title": "Ag & Commercial Energy Grants",
"url": "[https://www.lrec.coop/energy-services/ag-commercial-energy-grants/](https://www.lrec.coop/energy-services/ag-commercial-energy-grants/)",
"owner": "Lake Region Electric Cooperative",
"accessed": "2026-07-03",
"evidenceText": "LREC describes grants for qualifying commercial customers for electric energy-efficiency improvements, audits, engineering and design assistance, and lists eligible project categories including motors, drives, compressed air, refrigeration, HVAC, refrigerated-case controls, dairy equipment, and lighting. ([Lake Region Electric Cooperative][2])"
},
{
"title": "2026 LREC Commercial LED Lighting - Custom and Retrofit Fillable PDF",
"url": "[https://www.lrec.coop/wp-content/uploads/2026/02/2026-LREC-Com-Lighting-Fillable.pdf](https://www.lrec.coop/wp-content/uploads/2026/02/2026-LREC-Com-Lighting-Fillable.pdf)",
"owner": "Lake Region Electric Cooperative",
"accessed": "2026-07-03",
"evidenceText": "The form allows commercial, agricultural, or industrial members to apply, requires funding availability to be checked, issues funds after installation, caps the prescriptive lighting rebate at 50% of material/equipment cost and 500000 cents per member annually, and publishes per-lamp, per-fixture, and per-connected-kW control rates. "
},
{
"title": "2026 LREC Dairy Fillable PDF",
"url": "[https://www.lrec.coop/wp-content/uploads/2026/02/2026-LREC-Dairy-Fillable.pdf](https://www.lrec.coop/wp-content/uploads/2026/02/2026-LREC-Dairy-Fillable.pdf)",
"owner": "Lake Region Electric Cooperative",
"accessed": "2026-07-03",
"evidenceText": "The dairy form publishes 200 cents per cow for a dairy plate/pre-cooler, 200 cents per cow for a milk pump VFD, 2000 cents per horsepower for a vacuum pump VFD, and shows robotic milking systems as an unpublished placeholder amount per stall; rules require funding availability and program parameters to be checked. "
},
{
"title": "2026 LREC Custom Fillable PDF",
"url": "[https://www.lrec.coop/wp-content/uploads/2026/02/2026-LREC-Custom-Fillable.pdf](https://www.lrec.coop/wp-content/uploads/2026/02/2026-LREC-Custom-Fillable.pdf)",
"owner": "Lake Region Electric Cooperative",
"accessed": "2026-07-03",
"evidenceText": "The custom form says rebate value is determined by LREC from demand, energy, and annual operating hours; requires pre-approval, funding verification, and site inspection before approval; and limits the maximum rebate to 50% of project costs up to a cooperative-deemed dollar amount. "
}
],
"sourceSummary": "Official LREC administrator sources support an active 2026 grant-like/rebate program, but only the prescriptive lighting and non-RMS dairy rows have defensible public formulas. The custom energy rebate/grant path must be suppressed unless an LREC-approved project-specific rebate amount is supplied. The uploaded package context was used only as the repair target: ",
"packagePatch": {
"calculation_status": "calculable_with_missing_inputs",
"availability": {
"status": "active",
"fundingStatus": "open_while_funds_last"
},
"input_requirements_to_add_or_update": [
{
"input_key": "lrec_business_member_status",
"label": "Active LREC commercial, agricultural, or industrial member/account status",
"value_type": "boolean",
"required_for": [
"effect_one_time_savings_1_1710faf590c563a5",
"effect_one_time_savings_2_8f47bd53eecfe786",
"effect_one_time_savings_3_15fcad37f2268e40"
],
"source_precedence": [
"utility_data",
"program_application",
"user_profile",
"admin_review"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "lrec_member_category",
"label": "LREC member category",
"value_type": "enum",
"allowed_values": [
"commercial",
"agricultural",
"industrial"
],
"required_for": [
"effect_one_time_savings_1_1710faf590c563a5",
"effect_one_time_savings_2_8f47bd53eecfe786",
"effect_one_time_savings_3_15fcad37f2268e40"
],
"source_precedence": [
"program_application",
"utility_data",
"user_profile"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "funding_availability_confirmed",
"label": "Current LREC funding availability confirmed",
"value_type": "boolean",
"required_for": [
"effect_one_time_savings_1_1710faf590c563a5",
"effect_one_time_savings_2_8f47bd53eecfe786",
"effect_one_time_savings_3_15fcad37f2268e40"
],
"source_precedence": [
"admin_research",
"program_application"
],
"missing_severity": "blocks_user_facing_estimate"
},
{
"input_key": "purchase_or_install_date",
"label": "Purchase or installation date",
"value_type": "date",
"required_for": [
"effect_one_time_savings_1_1710faf590c563a5",
"effect_one_time_savings_2_8f47bd53eecfe786",
"effect_one_time_savings_3_15fcad37f2268e40"
],
"source_precedence": [
"quote",
"invoice",
"user_profile"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "invoice_date",
"label": "Invoice date",
"value_type": "date",
"required_for": [
"effect_one_time_savings_1_1710faf590c563a5",
"effect_one_time_savings_2_8f47bd53eecfe786",
"effect_one_time_savings_3_15fcad37f2268e40"
],
"source_precedence": [
"quote",
"invoice"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "application_submission_date",
"label": "Application submission date",
"value_type": "date",
"required_for": [
"effect_one_time_savings_1_1710faf590c563a5",
"effect_one_time_savings_2_8f47bd53eecfe786",
"effect_one_time_savings_3_15fcad37f2268e40"
],
"source_precedence": [
"application_status",
"user_profile"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "itemized_invoices_available",
"label": "Itemized invoices available",
"value_type": "boolean",
"required_for": [
"effect_one_time_savings_1_1710faf590c563a5",
"effect_one_time_savings_2_8f47bd53eecfe786",
"effect_one_time_savings_3_15fcad37f2268e40"
],
"source_precedence": [
"quote",
"invoice"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "equipment_specifications_available",
"label": "Manufacturer equipment specifications available",
"value_type": "boolean",
"required_for": [
"effect_one_time_savings_1_1710faf590c563a5",
"effect_one_time_savings_2_8f47bd53eecfe786",
"effect_one_time_savings_3_15fcad37f2268e40"
],
"source_precedence": [
"quote",
"program_application"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "manufacturer_model_numbers_available",
"label": "Manufacturer and model numbers available",
"value_type": "boolean",
"required_for": [
"effect_one_time_savings_1_1710faf590c563a5",
"effect_one_time_savings_2_8f47bd53eecfe786",
"effect_one_time_savings_3_15fcad37f2268e40"
],
"source_precedence": [
"quote",
"program_application"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "lighting_line_items",
"label": "Lighting rebate line items",
"value_type": "array",
"required_for": [
"effect_one_time_savings_1_1710faf590c563a5"
],
"expected_item_fields": [
"rate_row_id",
"quantity",
"new_wattage",
"old_wattage",
"dlc_or_energy_star_listed",
"connected_control_kw",
"control_strategy"
],
"source_precedence": [
"quote",
"program_application",
"retrofit_assumptions"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "lighting_material_equipment_cost_cents",
"label": "Lighting material/equipment cost",
"value_type": "money_cents",
"required_for": [
"effect_one_time_savings_1_1710faf590c563a5"
],
"source_precedence": [
"quote",
"invoice"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "annual_lighting_rebate_already_committed_cents",
"label": "LREC lighting rebates already paid or reserved for this member in the same program year",
"value_type": "money_cents",
"required_for": [
"effect_one_time_savings_1_1710faf590c563a5"
],
"source_precedence": [
"admin_research",
"program_application",
"user_profile"
],
"missing_severity": "blocks_cap_calculation"
},
{
"input_key": "lighting_ies_light_levels_satisfied",
"label": "Lighting project does not fall below recommended IES light levels",
"value_type": "boolean",
"required_for": [
"effect_one_time_savings_1_1710faf590c563a5"
],
"source_precedence": [
"quote",
"contractor",
"program_application"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "lighting_no_fixture_lamp_double_count",
"label": "Fixture and lamp rebate not both claimed for the same project",
"value_type": "boolean",
"required_for": [
"effect_one_time_savings_1_1710faf590c563a5"
],
"source_precedence": [
"quote",
"program_application"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "dairy_measure_type",
"label": "Dairy measure type",
"value_type": "enum",
"allowed_values": [
"dairy_plate_pre_cooler",
"milk_pump_vfd",
"vacuum_pump_vfd",
"robotic_milking_system"
],
"required_for": [
"effect_one_time_savings_2_8f47bd53eecfe786"
],
"source_precedence": [
"quote",
"program_application",
"user_profile"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "dairy_cow_count",
"label": "Dairy cow count",
"value_type": "number",
"required_for": [
"effect_one_time_savings_2_8f47bd53eecfe786"
],
"source_precedence": [
"user_profile",
"program_application",
"quote"
],
"missing_severity": "blocks_calculation_for_per_cow_measures"
},
{
"input_key": "dairy_vacuum_pump_horsepower",
"label": "Vacuum pump VFD horsepower",
"value_type": "number",
"required_for": [
"effect_one_time_savings_2_8f47bd53eecfe786"
],
"source_precedence": [
"quote",
"equipment_specifications",
"program_application"
],
"missing_severity": "blocks_calculation_for_vacuum_pump_vfd"
},
{
"input_key": "dairy_project_cost_cents",
"label": "Dairy project purchaser and installation cost",
"value_type": "money_cents",
"required_for": [
"effect_one_time_savings_2_8f47bd53eecfe786"
],
"source_precedence": [
"quote",
"invoice"
],
"missing_severity": "blocks_cost_cap_check"
},
{
"input_key": "custom_preapproval_status",
"label": "LREC custom rebate pre-approval status",
"value_type": "enum",
"allowed_values": [
"not_requested",
"requested",
"approved",
"denied",
"unknown"
],
"required_for": [
"effect_one_time_savings_3_15fcad37f2268e40"
],
"source_precedence": [
"application_status",
"admin_research",
"user_profile"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "lrec_preinspection_status",
"label": "LREC pre-approval site inspection status",
"value_type": "enum",
"allowed_values": [
"not_scheduled",
"scheduled",
"completed",
"waived_by_lrec",
"unknown"
],
"required_for": [
"effect_one_time_savings_3_15fcad37f2268e40"
],
"source_precedence": [
"application_status",
"admin_research"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "custom_project_cost_cents",
"label": "Custom project cost",
"value_type": "money_cents",
"required_for": [
"effect_one_time_savings_3_15fcad37f2268e40"
],
"source_precedence": [
"quote",
"invoice"
],
"missing_severity": "blocks_cap_check"
},
{
"input_key": "custom_demand_kw",
"label": "Custom project demand kW basis",
"value_type": "number",
"required_for": [
"effect_one_time_savings_3_15fcad37f2268e40"
],
"source_precedence": [
"quote",
"utility_data",
"program_application"
],
"missing_severity": "blocks_lrec_review"
},
{
"input_key": "custom_annual_kwh",
"label": "Custom project annual kWh basis",
"value_type": "number",
"required_for": [
"effect_one_time_savings_3_15fcad37f2268e40"
],
"source_precedence": [
"quote",
"utility_data",
"program_application"
],
"missing_severity": "blocks_lrec_review"
},
{
"input_key": "custom_annual_operating_hours",
"label": "Custom project annual operating hours",
"value_type": "number",
"required_for": [
"effect_one_time_savings_3_15fcad37f2268e40"
],
"source_precedence": [
"quote",
"program_application"
],
"missing_severity": "blocks_lrec_review"
},
{
"input_key": "lrec_custom_approved_rebate_cents",
"label": "LREC-approved custom rebate amount",
"value_type": "money_cents",
"required_for": [
"effect_one_time_savings_3_15fcad37f2268e40"
],
"source_precedence": [
"application_status",
"admin_research"
],
"missing_severity": "blocks_calculation"
}
],
"effects_to_add_or_update": [
{
"effect_id": "effect_one_time_savings_1_1710faf590c563a5",
"effect_type": "one_time_savings",
"cash_value_classification": "rebate",
"value_model_kind": "hybrid_rate_plus_cap",
"calculation": {
"method": "rate_table",
"amount_cents": null,
"percent": 0.5,
"conditional_award_cents": null,
"conditional_award_formula": "For eligible prescriptive LED lighting, calculate line_rebate_cents as quantity multiplied by the selected per-lamp/per-fixture rate, or connected_control_kw multiplied by the selected per-kW control rate. Sum all eligible line_rebate_cents, then cap at min(sum_line_rebates_cents, floor(0.50 * lighting_material_equipment_cost_cents), max(0, 500000 - annual_lighting_rebate_already_committed_cents)). Suppress if LREC member eligibility, funding availability, application timing, DLC/ENERGY STAR listing, minimum wattage-reduction rules, IES light-level compliance, itemized invoices, or equipment specifications are not confirmed.",
"max_award_cents": 500000,
"min_award_cents": null,
"rate_rows": [
{
"rate_row_id": "lighting_screw_pin_led_lamp_20_to_60w",
"category": "lamps_screw_pin",
"unit": "lamp",
"new_wattage_range": "20-60W",
"amount_cents": 200,
"eligibility_notes": "50% minimum wattage reduction required"
},
{
"rate_row_id": "lighting_screw_pin_led_lamp_61_to_100w",
"category": "lamps_screw_pin",
"unit": "lamp",
"new_wattage_range": "61-100W",
"amount_cents": 500,
"eligibility_notes": "50% minimum wattage reduction required"
},
{
"rate_row_id": "lighting_screw_pin_led_lamp_101_to_140w",
"category": "lamps_screw_pin",
"unit": "lamp",
"new_wattage_range": "101-140W",
"amount_cents": 1000,
"eligibility_notes": "50% minimum wattage reduction required"
},
{
"rate_row_id": "lighting_screw_pin_led_lamp_141_to_160w",
"category": "lamps_screw_pin",
"unit": "lamp",
"new_wattage_range": "141-160W",
"amount_cents": 1500,
"eligibility_notes": "50% minimum wattage reduction required"
},
{
"rate_row_id": "lighting_4ft_led_tube_lt_18w_replaces_t12_or_t8",
"category": "led_tubes",
"unit": "lamp",
"lamp_size": "4 foot LED lamp under 18W replacing T12 or T8 lamps",
"amount_cents": 500,
"eligibility_notes": "One-for-one linear lamp replacement; DLC listing and listed form factors required"
},
{
"rate_row_id": "lighting_5_to_6ft_refrigerator_freezer_case_lamp",
"category": "led_tubes",
"unit": "lamp",
"lamp_size": "5 to 6 foot refrigerator/freezer case lamp",
"amount_cents": 2000,
"eligibility_notes": "Qualifying refrigerator/freezer case lamp"
},
{
"rate_row_id": "lighting_led_fixture_lt_25w",
"category": "fixtures_troffers_downlights_recessed_pendants_surface",
"unit": "fixture",
"new_wattage_range": "under 25W",
"amount_cents": 1000,
"eligibility_notes": "50% minimum wattage reduction required"
},
{
"rate_row_id": "lighting_led_fixture_26_to_50w",
"category": "fixtures_troffers_downlights_recessed_pendants_surface",
"unit": "fixture",
"new_wattage_range": "26-50W",
"amount_cents": 1500,
"eligibility_notes": "50% minimum wattage reduction required"
},
{
"rate_row_id": "lighting_led_fixture_51_to_75w",
"category": "fixtures_troffers_downlights_recessed_pendants_surface",
"unit": "fixture",
"new_wattage_range": "51-75W",
"amount_cents": 2000,
"eligibility_notes": "50% minimum wattage reduction required"
},
{
"rate_row_id": "lighting_hid_t12_replacement_fixture_lt_40w",
"category": "wallpacks_soffits_canopy_hibay_lobay_pole_roadway_replaces_hid_or_t12",
"unit": "fixture",
"new_wattage_range": "under 40W",
"amount_cents": 2500,
"eligibility_notes": "50% minimum wattage reduction required"
},
{
"rate_row_id": "lighting_hid_t12_replacement_fixture_41_to_80w",
"category": "wallpacks_soffits_canopy_hibay_lobay_pole_roadway_replaces_hid_or_t12",
"unit": "fixture",
"new_wattage_range": "41-80W",
"amount_cents": 3500,
"eligibility_notes": "50% minimum wattage reduction required"
},
{
"rate_row_id": "lighting_hid_t12_replacement_fixture_81_to_120w",
"category": "wallpacks_soffits_canopy_hibay_lobay_pole_roadway_replaces_hid_or_t12",
"unit": "fixture",
"new_wattage_range": "81-120W",
"amount_cents": 5000,
"eligibility_notes": "50% minimum wattage reduction required"
},
{
"rate_row_id": "lighting_hid_t12_replacement_fixture_121_to_200w",
"category": "wallpacks_soffits_canopy_hibay_lobay_pole_roadway_replaces_hid_or_t12",
"unit": "fixture",
"new_wattage_range": "121-200W",
"amount_cents": 6500,
"eligibility_notes": "50% minimum wattage reduction required"
},
{
"rate_row_id": "lighting_hid_t12_replacement_fixture_201_to_250w",
"category": "wallpacks_soffits_canopy_hibay_lobay_pole_roadway_replaces_hid_or_t12",
"unit": "fixture",
"new_wattage_range": "201-250W",
"amount_cents": 8000,
"eligibility_notes": "50% minimum wattage reduction required"
},
{
"rate_row_id": "lighting_hid_t12_replacement_fixture_251_to_300w",
"category": "wallpacks_soffits_canopy_hibay_lobay_pole_roadway_replaces_hid_or_t12",
"unit": "fixture",
"new_wattage_range": "251-300W",
"amount_cents": 10000,
"eligibility_notes": "50% minimum wattage reduction required"
},
{
"rate_row_id": "lighting_hid_t12_replacement_fixture_301_to_400w",
"category": "wallpacks_soffits_canopy_hibay_lobay_pole_roadway_replaces_hid_or_t12",
"unit": "fixture",
"new_wattage_range": "301-400W",
"amount_cents": 12000,
"eligibility_notes": "50% minimum wattage reduction required"
},
{
"rate_row_id": "lighting_control_occupancy_sensor",
"category": "automated_controls",
"unit": "connected_kw",
"amount_cents": 1500,
"eligibility_notes": "Rate is per kW controlled"
},
{
"rate_row_id": "lighting_control_daylighting",
"category": "automated_controls",
"unit": "connected_kw",
"amount_cents": 2000,
"eligibility_notes": "Rate is per kW controlled"
},
{
"rate_row_id": "lighting_control_personal_tuning",
"category": "automated_controls",
"unit": "connected_kw",
"amount_cents": 1500,
"eligibility_notes": "Rate is per kW controlled"
},
{
"rate_row_id": "lighting_control_task_tuning",
"category": "automated_controls",
"unit": "connected_kw",
"amount_cents": 1500,
"eligibility_notes": "Rate is per kW controlled"
},
{
"rate_row_id": "lighting_control_multiple_strategies",
"category": "automated_controls",
"unit": "connected_kw",
"amount_cents": 3000,
"eligibility_notes": "Any combination of two or more listed control strategies; rate is per kW controlled"
},
{
"rate_row_id": "lighting_control_nlc_without_lllc",
"category": "automated_controls",
"unit": "connected_kw",
"amount_cents": 3000,
"eligibility_notes": "Networked lighting controls without luminaire-level lighting controls; rate is per kW controlled"
},
{
"rate_row_id": "lighting_control_nlc_with_lllc",
"category": "automated_controls",
"unit": "connected_kw",
"amount_cents": 5000,
"eligibility_notes": "Networked lighting controls with luminaire-level lighting controls; sensors must be integrated into each individual fixture that is part of the rebated NLC system"
}
],
"probability_discount": null,
"probability_evidence_type": "first_come_funding_unknown"
},
"required_inputs": [
"lrec_business_member_status",
"lrec_member_category",
"funding_availability_confirmed",
"purchase_or_install_date",
"invoice_date",
"application_submission_date",
"itemized_invoices_available",
"equipment_specifications_available",
"manufacturer_model_numbers_available",
"lighting_line_items",
"lighting_material_equipment_cost_cents",
"annual_lighting_rebate_already_committed_cents",
"lighting_ies_light_levels_satisfied",
"lighting_no_fixture_lamp_double_count"
],
"missing_input_behavior": "needs_project_scope",
"includedInUserFacingTotalDefault": false,
"humanReviewRequired": false,
"reasonCodes": [
"prescriptive_rate_table_available",
"measure_catalog_inputs_missing",
"requires_material_equipment_cost",
"annual_member_cap_applies",
"funding_availability_must_be_checked",
"first_come_funding_balance_unknown",
"do_not_probability_discount_without_evidence",
"exclude_if_dlc_or_energy_star_not_confirmed",
"exclude_if_lighting_double_counts_fixture_and_lamp",
"deadline_conflict_use_earliest_or_admin_confirmed_deadline"
],
"calculationTrace": [
"Confirm the applicant is an eligible LREC commercial, agricultural, or industrial member.",
"Confirm purchase or installation is within the current 2026 program window and application timing satisfies the earliest applicable LREC deadline unless LREC confirms a later current deadline.",
"Confirm current funding availability before returning a user-facing value.",
"For each lighting line item, select exactly one published rate row and multiply by quantity or by connected_control_kw for control strategies.",
"Exclude lighting line items that fail required DLC/ENERGY STAR listing, 50% minimum wattage reduction where applicable, IES light-level requirements, or fixture/lamp exclusivity.",
"Return min(sum_line_rebates_cents, 50% of material/equipment cost, remaining 500000-cent annual member cap)."
]
},
{
"effect_id": "effect_one_time_savings_2_8f47bd53eecfe786",
"effect_type": "one_time_savings",
"cash_value_classification": "rebate",
"value_model_kind": "per_unit_award",
"calculation": {
"method": "per_unit",
"amount_cents": null,
"percent": null,
"conditional_award_cents": null,
"conditional_award_formula": "For dairy_plate_pre_cooler, calculate 200 * dairy_cow_count. For milk_pump_vfd, calculate 200 * dairy_cow_count. For vacuum_pump_vfd, calculate 2000 * dairy_vacuum_pump_horsepower. Apply the general purchaser/installation cost cap by returning min(calculated_rebate_cents, dairy_project_cost_cents) when dairy_project_cost_cents is available. If dairy_measure_type is robotic_milking_system, return null and suppress because the public form shows an unpublished placeholder rate.",
"max_award_cents": null,
"min_award_cents": null,
"rate_rows": [
{
"rate_row_id": "dairy_plate_pre_cooler",
"unit": "cow",
"amount_cents": 200,
"required_quantity_input": "dairy_cow_count"
},
{
"rate_row_id": "milk_pump_vfd",
"unit": "cow",
"amount_cents": 200,
"required_quantity_input": "dairy_cow_count"
},
{
"rate_row_id": "vacuum_pump_vfd",
"unit": "horsepower",
"amount_cents": 2000,
"required_quantity_input": "dairy_vacuum_pump_horsepower"
},
{
"rate_row_id": "robotic_milking_system",
"unit": "stall",
"amount_cents": null,
"runtime_behavior": "suppress_until_lrec_confirms_rate",
"reason_code": "rms_rate_not_published"
}
],
"probability_discount": null,
"probability_evidence_type": "first_come_funding_unknown"
},
"required_inputs": [
"lrec_business_member_status",
"lrec_member_category",
"funding_availability_confirmed",
"purchase_or_install_date",
"invoice_date",
"application_submission_date",
"itemized_invoices_available",
"equipment_specifications_available",
"manufacturer_model_numbers_available",
"dairy_measure_type",
"dairy_cow_count",
"dairy_vacuum_pump_horsepower",
"dairy_project_cost_cents"
],
"missing_input_behavior": "needs_project_scope",
"includedInUserFacingTotalDefault": false,
"humanReviewRequired": false,
"reasonCodes": [
"published_per_unit_rates_available_for_non_rms_measures",
"per_unit_inputs_missing",
"funding_availability_must_be_checked",
"first_come_funding_balance_unknown",
"rms_amount_not_published_suppress",
"requires_project_cost_for_general_cost_cap",
"deadline_conflict_use_earliest_or_admin_confirmed_deadline"
],
"calculationTrace": [
"Confirm eligible LREC business/agricultural member status and current funding availability.",
"Confirm complete application, itemized invoices, equipment specifications, and timing.",
"Select the dairy measure type.",
"For dairy plate/pre-cooler or milk pump VFD, multiply eligible cow count by 200 cents.",
"For vacuum pump VFD, multiply eligible horsepower by 2000 cents.",
"For robotic milking system, do not estimate because the public rate is unpublished.",
"Cap by purchaser and installation cost where applicable."
]
},
{
"effect_id": "effect_one_time_savings_3_15fcad37f2268e40",
"effect_type": "one_time_savings",
"cash_value_classification": "rebate",
"value_model_kind": "no_calculable_value",
"calculation": {
"method": "custom_quote",
"amount_cents": null,
"percent": 0.5,
"conditional_award_cents": null,
"conditional_award_formula": "No public rate table or complete formula is available. If LREC supplies a written approved custom rebate amount, return min(lrec_custom_approved_rebate_cents, floor(0.50 * custom_project_cost_cents)) unless LREC's approval already states a lower binding amount. If lrec_custom_approved_rebate_cents is absent, return null and suppress. Do not infer a value from the 50% cap alone.",
"max_award_cents": null,
"min_award_cents": null,
"rate_rows": [],
"probability_discount": null,
"probability_evidence_type": "human_reviewed"
},
"required_inputs": [
"lrec_business_member_status",
"lrec_member_category",
"funding_availability_confirmed",
"custom_preapproval_status",
"lrec_preinspection_status",
"custom_project_cost_cents",
"custom_demand_kw",
"custom_annual_kwh",
"custom_annual_operating_hours",
"equipment_specifications_available",
"manufacturer_model_numbers_available",
"itemized_invoices_available",
"lrec_custom_approved_rebate_cents",
"application_submission_date"
],
"missing_input_behavior": "needs_quote",
"includedInUserFacingTotalDefault": false,
"humanReviewRequired": true,
"reasonCodes": [
"custom_review_required",
"lrec_preapproval_required",
"public_formula_incomplete",
"max_dollar_amount_not_published",
"project_specific_award_approval_required",
"funding_availability_must_be_checked",
"suppress_until_lrec_approved_amount_present",
"do_not_use_50_percent_cap_as_estimate"
],
"calculationTrace": [
"Custom rebate value is determined by LREC project by project from demand, energy, and annual operating hours.",
"Require LREC preapproval and pre-approval site inspection status before treating the project as potentially eligible.",
"Do not calculate an expected value from project cost, kW, kWh, or operating hours because no public rate formula is published.",
"If a written LREC-approved rebate amount is supplied, cap it at 50% of project cost unless LREC approval is lower or specifies another binding cap.",
"Suppress from user-facing savings totals until LREC approval and funding availability are confirmed."
]
}
]
},
"testCaseInputHints": [
{
"inputKey": "lrec_business_member_status",
"valueType": "boolean",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "Use true only when utility/account evidence confirms the customer is an active LREC commercial, agricultural, or industrial member."
},
{
"inputKey": "funding_availability_confirmed",
"valueType": "boolean",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "Default to false/null until LREC confirms current funds are available for the selected rebate."
},
{
"inputKey": "application_submission_date",
"valueType": "date",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Use the actual or planned submission date; suppress if after the earliest applicable 2026 deadline unless LREC confirms acceptance."
},
{
"inputKey": "lighting_line_items",
"valueType": "array",
"whoProvides": "quote",
"realisticDefaultGuidance": "Each line should include rate_row_id, quantity, new wattage, old wattage, DLC/ENERGY STAR status, and connected kW for control strategies."
},
{
"inputKey": "lighting_material_equipment_cost_cents",
"valueType": "money_cents",
"whoProvides": "quote",
"realisticDefaultGuidance": "Use material/equipment cost only for the lighting cap; do not include unrelated project costs unless LREC confirms eligibility."
},
{
"inputKey": "annual_lighting_rebate_already_committed_cents",
"valueType": "money_cents",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "Use 0 only when the member has no other LREC lighting rebates in the same program year; otherwise use paid/reserved amount."
},
{
"inputKey": "dairy_measure_type",
"valueType": "enum",
"whoProvides": "quote",
"realisticDefaultGuidance": "Allowed calculable values are dairy_plate_pre_cooler, milk_pump_vfd, and vacuum_pump_vfd; robotic_milking_system must suppress without LREC rate confirmation."
},
{
"inputKey": "dairy_cow_count",
"valueType": "number",
"whoProvides": "user",
"realisticDefaultGuidance": "Required for dairy plate/pre-cooler and milk pump VFD calculations."
},
{
"inputKey": "dairy_vacuum_pump_horsepower",
"valueType": "number",
"whoProvides": "quote",
"realisticDefaultGuidance": "Required only for vacuum pump VFD; use equipment-rated horsepower from quote/specifications."
},
{
"inputKey": "dairy_project_cost_cents",
"valueType": "money_cents",
"whoProvides": "quote",
"realisticDefaultGuidance": "Use purchaser plus installation costs from itemized invoices or quote to enforce the general no-more-than-cost rule."
},
{
"inputKey": "custom_preapproval_status",
"valueType": "enum",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Use approved only when LREC has issued project preapproval; otherwise custom effect remains suppressed."
},
{
"inputKey": "lrec_preinspection_status",
"valueType": "enum",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Use completed or waived_by_lrec only when supported by application records."
},
{
"inputKey": "custom_project_cost_cents",
"valueType": "money_cents",
"whoProvides": "quote",
"realisticDefaultGuidance": "Use eligible custom project cost from the LREC-reviewed quote or invoice."
},
{
"inputKey": "custom_demand_kw",
"valueType": "number",
"whoProvides": "quote",
"realisticDefaultGuidance": "Provide for LREC review; do not use to infer a rebate without LREC-approved amount."
},
{
"inputKey": "custom_annual_kwh",
"valueType": "number",
"whoProvides": "quote",
"realisticDefaultGuidance": "Provide for LREC review; do not use to infer a rebate without LREC-approved amount."
},
{
"inputKey": "custom_annual_operating_hours",
"valueType": "number",
"whoProvides": "quote",
"realisticDefaultGuidance": "Provide for LREC review; do not use to infer a rebate without LREC-approved amount."
},
{
"inputKey": "lrec_custom_approved_rebate_cents",
"valueType": "money_cents",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Only populate from written LREC approval or rebate determination; otherwise leave null and suppress custom effect."
}
],
"remainingGaps": [
"No official live funding balance or reservation status was found; all effects require a funding_availability_confirmed runtime/admin input.",
"No historical applications, awards, or success-rate evidence was found; no probability discount should be invented.",
"The robotic milking system dairy row shows an unpublished placeholder amount and must suppress unless LREC confirms a rate.",
"The custom energy rebate/grant form does not publish a dollar cap or rate formula; the 50% project-cost cap is not an award estimate.",
"LREC's rebate center states 2026 applications are due by 2026-12-15, while individual forms list November deadlines; conservative runtime should use the earliest applicable deadline unless LREC confirms acceptance.",
"Ag/commercial audit, engineering/design assistance, HVAC, refrigeration, and refrigerated-case control projects outside the prescriptive lighting/dairy rows require custom LREC review or separate official rate-table support."
],
"doNotUseAsUserFacingEstimateReasons": [
"Funding is available only while funds last and no live funding balance is published.",
"Prescriptive lighting requires project-specific rate rows, quantities, costs, eligibility documentation, and annual cap inputs.",
"Prescriptive dairy requires measure selection and cow-count or horsepower inputs; RMS has no published rate.",
"Custom projects require LREC preapproval, site inspection/review, and a written LREC-approved rebate amount.",
"Do not use a maximum cap, placeholder amount, or eligibility statement as an expected award."
]
}

[1]: https://www.lrec.coop/energy-services/rebates-loans-and-tax-credits/?utm_source=chatgpt.com "Rebates, Loans, and Tax Credits - Lake Region Electric Cooperative"
[2]: https://www.lrec.coop/energy-services/ag-commercial-energy-grants/ "Ag & Commercial Energy Grants - Lake Region Electric Cooperative"

