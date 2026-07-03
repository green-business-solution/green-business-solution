You are helping RetroFi finish conservative grant estimation.

Prompt 23 of 37.

Research only official or primary administrator sources when possible. Third-party summaries can be used only to find official sources, not as final support for formula/probability fields.

## Goal

Repair this grant-like v2 incentive package so Codex can calculate the grant value conservatively at runtime, or suppress it with explicit reason codes when no defensible estimate exists.

Do not make every grant estimable. If the source only says "up to", if the award is competitive with no probability evidence, if funding status is unknown, or if project-specific award approval is required, return suppressed or missing-input status.

## Current Package Context

```json
{
  "opportunity_id": "SOURCE_DSIRE:dsire_program_id:3577",
  "program_name": "Lake Region Electric Cooperative - Agriculture and Commercial Energy Efficiency Grant Program",
  "calculation_status": "calculable_with_missing_inputs",
  "availability": {
    "status": "active",
    "source_access_status": "accessible_or_researched"
  },
  "retrofit_types": [
    "high_efficiency_hvac_replacement",
    "high_efficiency_refrigeration_equipment",
    "led_lighting_retrofit",
    "refrigeration_controls_retrofit"
  ],
  "geography": {
    "country": "US",
    "states": [],
    "counties": [],
    "cities": [],
    "utility_territory_required": false
  },
  "related_non_grant_effects": [
    {
      "effect_id": "effect_one_time_savings_1_1710faf590c563a5",
      "label": "Commercial lighting incentives use a measure catalog for LED lamps, fixtures, and controls, with the rebate not exceeding 50% of material or equipment cost and a $5,000 annual member cap.",
      "effect_type": "one_time_savings",
      "cash_flow_direction": "benefit",
      "timing": {
        "cadence": "one_time",
        "source_timing": "post_installation_reimbursement",
        "approval_required_before_purchase": true,
        "approval_required_before_installation": true,
        "application_deadline": "2026-12-15; some forms also state the third Friday in November",
        "funding_status": "open_while_funds_last"
      },
      "calculation": {
        "method": "measure_catalog",
        "measure_catalog_id": "lrec_2026_commercial_lighting",
        "measure_selection_input": "lighting_measure_type_and_wattage",
        "grant_value_model_kind": "per_unit_award",
        "cash_value_classification": "rebate",
        "conditional_award": {
          "status": "needs_project_scope",
          "formula_text": "For eligible commercial/agricultural/industrial lighting, calculate the sum of 2026 LREC lighting measure-catalog amounts for qualifying LED lamps, fixtures, and controls, including per-lamp/fixture tiers and control rebates per connected kW. Final rebate may not exceed 50% of material/equipment cost and may not exceed 500,000 cents per member annually.",
          "conditional_award_cents": null,
          "min_award_cents": null,
          "max_award_cents": 500000,
          "cost_share_percent": 0.5,
          "required_project_inputs": [
            "lrec_commercial_or_agricultural_member_status",
            "lighting_measure_type",
            "new_fixture_or_lamp_wattage",
            "quantity",
            "connected_control_kw",
            "material_or_equipment_cost_cents",
            "dlc_or_energy_star_listing",
            "invoice_date",
            "funding_availability"
          ],
          "calculation_trace": [
            "Select applicable 2026 LREC lighting catalog rate.",
            "Multiply per-unit or per-kW rate by eligible quantity.",
            "Cap by 50% of material/equipment cost and 500,000 cents per member annually."
          ]
        },
        "probability_model": {
          "status": "not_required_deterministic",
          "probability_discount": null,
          "probability_evidence_type": "not_required",
          "historical_awards_count": null,
          "historical_applications_count": null,
          "total_program_budget_cents": null,
          "expected_award_count": null,
          "competition_scope": "utility_territory",
          "probability_notes": "The lighting rebate is deterministic after eligibility, equipment, cost, and funding availability are confirmed. No competitive grant probability discount is required."
        },
        "expected_value_recommendation": {
          "estimate_status": "needs_project_scope",
          "expected_value_cents": null,
          "estimate_confidence": "medium",
          "include_in_user_facing_total_default": false,
          "reason_codes": [
            "measure_catalog_inputs_missing",
            "requires_material_cost",
            "funding_availability_must_be_checked"
          ]
        },
        "fallback_prior_suggestion": {
          "probability_discount": null,
          "basis": "No fallback probability prior needed for a measure-catalog rebate; use the published 2026 catalog and live funding check.",
          "should_retro_fi_use_without_human_approval": false
        }
      },
      "caps": [
        {
          "cap_type": "maximum_amount",
          "amount": {
            "value": 5000,
            "currency": "USD"
          },
          "applies_to": "effect"
        },
        {
          "cap_type": "maximum_percent_of_cost",
          "percent": 50,
          "applies_to": "effect"
        }
      ],
      "required_inputs": [
        {
          "input_key": "lrec_commercial_account",
          "label": "LREC commercial account",
          "value_type": "number",
          "required_for": [
            "effect_one_time_savings_1_1710faf590c563a5"
          ],
          "source_precedence": [
            "user_profile",
            "retrofit_assumptions",
            "quote",
            "utility_data"
          ],
          "missing_severity": "blocks_calculation"
        },
        {
          "input_key": "lighting_measure_type",
          "label": "lighting measure type",
          "value_type": "text",
          "required_for": [
            "effect_one_time_savings_1_1710faf590c563a5"
          ],
          "source_precedence": [
            "user_profile",
            "retrofit_assumptions",
            "quote",
            "utility_data"
          ],
          "missing_severity": "blocks_calculation"
        },
        {
          "input_key": "new_fixture_wattage",
          "label": "new fixture wattage",
          "value_type": "text",
          "required_for": [
            "effect_one_time_savings_1_1710faf590c563a5"
          ],
          "source_precedence": [
            "user_profile",
            "retrofit_assumptions",
            "quote",
            "utility_data"
          ],
          "missing_severity": "blocks_calculation"
        },
        {
          "input_key": "quantity",
          "label": "quantity",
          "value_type": "number",
          "required_for": [
            "effect_one_time_savings_1_1710faf590c563a5"
          ],
          "source_precedence": [
            "user_profile",
            "retrofit_assumptions",
            "quote",
            "utility_data"
          ],
          "missing_severity": "blocks_calculation"
        },
        {
          "input_key": "connected_control_kw",
          "label": "connected control kW",
          "value_type": "number",
          "required_for": [
            "effect_one_time_savings_1_1710faf590c563a5"
          ],
          "source_precedence": [
            "user_profile",
            "retrofit_assumptions",
            "quote",
            "utility_data"
          ],
          "missing_severity": "blocks_calculation"
        },
        {
          "input_key": "material_or_equipment_cost",
          "label": "material or equipment cost",
          "value_type": "number",
          "required_for": [
            "effect_one_time_savings_1_1710faf590c563a5"
          ],
          "source_precedence": [
            "user_profile",
            "retrofit_assumptions",
            "quote",
            "utility_data"
          ],
          "missing_severity": "blocks_calculation"
        },
        {
          "input_key": "invoice_date",
          "label": "invoice date",
          "value_type": "text",
          "required_for": [
            "effect_one_time_savings_1_1710faf590c563a5"
          ],
          "source_precedence": [
            "user_profile",
            "retrofit_assumptions",
            "quote",
            "utility_data"
          ],
          "missing_severity": "blocks_calculation"
        },
        {
          "input_key": "dlc_or_energy_star_listing",
          "label": "DLC or ENERGY STAR listing",
          "value_type": "text",
          "required_for": [
            "effect_one_time_savings_1_1710faf590c563a5"
          ],
          "source_precedence": [
            "user_profile",
            "retrofit_assumptions",
            "quote",
            "utility_data"
          ],
          "missing_severity": "blocks_calculation"
        },
        {
          "input_key": "measure_type",
          "label": "measure type",
          "value_type": "text",
          "required_for": [
            "effect_one_time_savings_1_1710faf590c563a5"
          ],
          "source_precedence": [
            "user_profile",
            "retrofit_assumptions",
            "quote",
            "utility_data"
          ],
          "missing_severity": "blocks_calculation"
        },
        {
          "input_key": "wattage_or_control_kw",
          "label": "wattage or control kW",
          "value_type": "number",
          "required_for": [
            "effect_one_time_savings_1_1710faf590c563a5"
          ],
          "source_precedence": [
            "user_profile",
            "retrofit_assumptions",
            "quote",
            "utility_data"
          ],
          "missing_severity": "blocks_calculation"
        },
        {
          "input_key": "material_cost",
          "label": "material cost",
          "value_type": "number",
          "required_for": [
            "effect_one_time_savings_1_1710faf590c563a5"
          ],
          "source_precedence": [
            "user_profile",
            "retrofit_assumptions",
            "quote",
            "utility_data"
          ],
          "missing_severity": "blocks_calculation"
        },
        {
          "input_key": "lrec_commercial_or_agricultural_member_status",
          "label": "Lrec Commercial Or Agricultural Member Status",
          "value_type": "text",
          "required_for": [
            "effect_one_time_savings_1_1710faf590c563a5"
          ],
          "source_precedence": [
            "user_profile",
            "program_application",
            "admin_review"
          ],
          "missing_severity": "blocks_calculation"
        },
        {
          "input_key": "new_fixture_or_lamp_wattage",
          "label": "New Fixture Or Lamp Wattage",
          "value_type": "text",
          "required_for": [
            "effect_one_time_savings_1_1710faf590c563a5"
          ],
          "source_precedence": [
            "user_profile",
            "retrofit_assumptions",
            "quote",
            "utility_data"
          ],
          "missing_severity": "blocks_calculation"
        },
        {
          "input_key": "material_or_equipment_cost_cents",
          "label": "Material Or Equipment Cost",
          "value_type": "number",
          "required_for": [
            "effect_one_time_savings_1_1710faf590c563a5"
          ],
          "source_precedence": [
            "quote",
            "user_profile",
            "retrofit_assumptions"
          ],
          "missing_severity": "blocks_calculation"
        },
        {
          "input_key": "funding_availability",
          "label": "Funding Availability",
          "value_type": "number",
          "required_for": [
            "effect_one_time_savings_1_1710faf590c563a5"
          ],
          "source_precedence": [
            "user_profile",
            "retrofit_assumptions",
            "quote",
            "utility_data"
          ],
          "missing_severity": "blocks_calculation"
        }
      ],
      "evidence_refs": [
        "evidence_9558a9198acccd4e",
        "grant_probability_repair_f806241843dce182"
      ],
      "confidence": {
        "overall": 0.72,
        "calculation": 0.72,
        "extraction": 0.9,
        "reason_codes": [
          "repair_status_calculation_package_found",
          "calculation_status_calculable_with_missing_inputs",
          "source_confidence_high",
          "estimate_confidence_medium",
          "value_model_measure_catalog",
          "grant_probability_repair_applied",
          "value_model_per_unit_award",
          "estimate_status_needs_project_scope"
        ]
      }
    },
    {
      "effect_id": "effect_one_time_savings_2_8f47bd53eecfe786",
      "label": "Dairy incentives include $2 per cow for plate coolers, $2 per cow for milk pump VFDs, and $20 per horsepower for vacuum pump VFDs.",
      "effect_type": "one_time_savings",
      "cash_flow_direction": "benefit",
      "timing": {
        "cadence": "one_time",
        "source_timing": "post_installation_reimbursement",
        "approval_required_before_purchase": true,
        "approval_required_before_installation": true,
        "application_deadline": "2026-12-15; some forms also state the third Friday in November",
        "funding_status": "open_while_funds_last"
      },
      "calculation": {
        "method": "measure_catalog",
        "measure_catalog_id": "lrec_2026_dairy_measures",
        "measure_selection_input": "dairy_measure_type",
        "grant_value_model_kind": "per_unit_award",
        "cash_value_classification": "rebate",
        "conditional_award": {
          "status": "needs_project_scope",
          "formula_text": "For eligible dairy measures, calculate 200 cents per cow for a dairy plate/pre-cooler, 200 cents per cow for a milk pump VFD, and 2,000 cents per horsepower for a vacuum pump VFD. The robotic milking system line is shown as $X.XX per stall and is not calculable without LREC confirmation.",
          "conditional_award_cents": null,
          "min_award_cents": null,
          "max_award_cents": null,
          "cost_share_percent": null,
          "required_project_inputs": [
            "lrec_agricultural_or_commercial_member_status",
            "dairy_measure_type",
            "cow_count",
            "horsepower",
            "project_cost_and_invoices",
            "equipment_specifications",
            "funding_availability"
          ],
          "calculation_trace": [
            "Plate/pre-cooler: cow_count × 200 cents.",
            "Milk pump VFD: cow_count × 200 cents.",
            "Vacuum pump VFD: horsepower × 2,000 cents.",
            "Robotic milking system requires LREC-specific confirmation."
          ]
        },
        "probability_model": {
          "status": "not_required_deterministic",
          "probability_discount": null,
          "probability_evidence_type": "not_required",
          "historical_awards_count": null,
          "historical_applications_count": null,
          "total_program_budget_cents": null,
          "expected_award_count": null,
          "competition_scope": "utility_territory",
          "probability_notes": "The published dairy rates are deterministic per-unit rebates for listed measures once eligibility, counts, specifications, and funding availability are confirmed. No competitive grant probability discount is required."
        },
        "expected_value_recommendation": {
          "estimate_status": "needs_project_scope",
          "expected_value_cents": null,
          "estimate_confidence": "medium",
          "include_in_user_facing_total_default": false,
          "reason_codes": [
            "per_unit_inputs_missing",
            "rms_amount_not_published",
            "funding_availability_must_be_checked"
          ]
        },
        "fallback_prior_suggestion": {
          "probability_discount": null,
          "basis": "No fallback probability prior needed for the published per-unit dairy rebates.",
          "should_retro_fi_use_without_human_approval": false
        }
      },
      "required_inputs": [
        {
          "input_key": "dairy_measure_type",
          "label": "dairy measure type",
          "value_type": "text",
          "required_for": [
            "effect_one_time_savings_2_8f47bd53eecfe786"
          ],
          "source_precedence": [
            "user_profile",
            "retrofit_assumptions",
            "quote",
            "utility_data"
          ],
          "missing_severity": "blocks_calculation"
        },
        {
          "input_key": "cow_count",
          "label": "cow count",
          "value_type": "number",
          "required_for": [
            "effect_one_time_savings_2_8f47bd53eecfe786"
          ],
          "source_precedence": [
            "user_profile",
            "retrofit_assumptions",
            "quote",
            "utility_data"
          ],
          "missing_severity": "blocks_calculation"
        },
        {
          "input_key": "horsepower",
          "label": "horsepower",
          "value_type": "text",
          "required_for": [
            "effect_one_time_savings_2_8f47bd53eecfe786"
          ],
          "source_precedence": [
            "user_profile",
            "retrofit_assumptions",
            "quote",
            "utility_data"
          ],
          "missing_severity": "blocks_calculation"
        },
        {
          "input_key": "eligible_equipment_cost",
          "label": "eligible equipment cost",
          "value_type": "number",
          "required_for": [
            "effect_one_time_savings_2_8f47bd53eecfe786"
          ],
          "source_precedence": [
            "user_profile",
            "retrofit_assumptions",
            "quote",
            "utility_data"
          ],
          "missing_severity": "blocks_calculation"
        },
        {
          "input_key": "measure_type",
          "label": "measure type",
          "value_type": "text",
          "required_for": [
            "effect_one_time_savings_2_8f47bd53eecfe786"
          ],
          "source_precedence": [
            "user_profile",
            "retrofit_assumptions",
            "quote",
            "utility_data"
          ],
          "missing_severity": "blocks_calculation"
        },
        {
          "input_key": "cow_count_or_horsepower",
          "label": "cow count or horsepower",
          "value_type": "number",
          "required_for": [
            "effect_one_time_savings_2_8f47bd53eecfe786"
          ],
          "source_precedence": [
            "user_profile",
            "retrofit_assumptions",
            "quote",
            "utility_data"
          ],
          "missing_severity": "blocks_calculation"
        },
        {
          "input_key": "lrec_agricultural_or_commercial_member_status",
          "label": "Lrec Agricultural Or Commercial Member Status",
          "value_type": "text",
          "required_for": [
            "effect_one_time_savings_2_8f47bd53eecfe786"
          ],
          "source_precedence": [
            "user_profile",
            "program_application",
            "admin_review"
          ],
          "missing_severity": "blocks_calculation"
        },
        {
          "input_key": "project_cost_and_invoices",
          "label": "Project Cost And Invoices",
          "value_type": "number",
          "required_for": [
            "effect_one_time_savings_2_8f47bd53eecfe786"
          ],
          "source_precedence": [
            "quote",
            "user_profile",
            "retrofit_assumptions"
          ],
          "missing_severity": "blocks_calculation"
        },
        {
          "input_key": "equipment_specifications",
          "label": "Equipment Specifications",
          "value_type": "text",
          "required_for": [
            "effect_one_time_savings_2_8f47bd53eecfe786"
          ],
          "source_precedence": [
            "user_profile",
            "retrofit_assumptions",
            "quote",
            "utility_data"
          ],
          "missing_severity": "blocks_calculation"
        },
        {
          "input_key": "funding_availability",
          "label": "Funding Availability",
          "value_type": "number",
          "required_for": [
            "effect_one_time_savings_2_8f47bd53eecfe786"
          ],
          "source_precedence": [
            "user_profile",
            "retrofit_assumptions",
            "quote",
            "utility_data"
          ],
          "missing_severity": "blocks_calculation"
        }
      ],
      "evidence_refs": [
        "evidence_9558a9198acccd4e",
        "grant_probability_repair_a5f591ce10dfea82"
      ],
      "confidence": {
        "overall": 0.72,
        "calculation": 0.72,
        "extraction": 0.9,
        "reason_codes": [
          "repair_status_calculation_package_found",
          "calculation_status_calculable_with_missing_inputs",
          "source_confidence_high",
          "estimate_confidence_medium",
          "value_model_measure_catalog",
          "grant_probability_repair_applied",
          "value_model_per_unit_award",
          "estimate_status_needs_project_scope"
        ]
      }
    },
    {
      "effect_id": "effect_one_time_savings_3_15fcad37f2268e40",
      "label": "Custom commercial and agricultural electric efficiency projects require pre-approval and LREC review; the rebate may not exceed 50% of project cost and is determined from project demand, energy savings, and annual operating hours.",
      "effect_type": "one_time_savings",
      "cash_flow_direction": "benefit",
      "timing": {
        "cadence": "custom",
        "source_timing": "application_process",
        "approval_required_before_purchase": true,
        "approval_required_before_installation": true,
        "application_deadline": "2026-12-15; some forms also state the third Friday in November",
        "funding_status": "open_while_funds_last"
      },
      "calculation": {
        "method": "custom_quote",
        "reason": "Project-specific quote or program review required.",
        "grant_value_model_kind": "other",
        "cash_value_classification": "rebate",
        "conditional_award": {
          "status": "needs_quote",
          "formula_text": "Custom energy rebate value is determined by LREC based on project demand (kW), energy (kWh), annual hours of operation, nameplate data, specifications, pre-inspection, and pre-approval. Maximum rebate is limited to 50% of project costs and to a maximum dollar amount deemed by the cooperative; no public rate table or fixed dollar cap was found.",
          "conditional_award_cents": null,
          "min_award_cents": null,
          "max_award_cents": null,
          "cost_share_percent": 0.5,
          "required_project_inputs": [
            "lrec_commercial_or_agricultural_member_status",
            "preapproval_status",
            "equipment_nameplate_data",
            "equipment_specifications",
            "eligible_project_cost_cents",
            "coincidental_kw_saved_or_growth",
            "annual_kwh_saved_or_sales",
            "annual_operating_hours",
            "lrec_preinspection_or_review",
            "funding_availability"
          ],
          "calculation_trace": [
            "LREC determines rebate value project by project.",
            "Apply 50% of project cost cap.",
            "Maximum dollar amount must be confirmed by LREC."
          ]
        },
        "probability_model": {
          "status": "not_required_deterministic",
          "probability_discount": null,
          "probability_evidence_type": "not_required",
          "historical_awards_count": null,
          "historical_applications_count": null,
          "total_program_budget_cents": null,
          "expected_award_count": null,
          "competition_scope": "utility_territory",
          "probability_notes": "This is not a competitive grant EV, but the public source does not provide a complete formula. Probability discount is not required after LREC approval; the amount requires LREC review and funding confirmation."
        },
        "expected_value_recommendation": {
          "estimate_status": "needs_quote",
          "expected_value_cents": null,
          "estimate_confidence": "low",
          "include_in_user_facing_total_default": false,
          "reason_codes": [
            "custom_review_required",
            "public_formula_incomplete",
            "funding_availability_must_be_checked"
          ]
        },
        "fallback_prior_suggestion": {
          "probability_discount": null,
          "basis": "No automated probability prior should be used. Obtain LREC preapproval or a project-specific rebate determination.",
          "should_retro_fi_use_without_human_approval": false
        }
      },
      "caps": [
        {
          "cap_type": "maximum_percent_of_cost",
          "percent": 50,
          "applies_to": "effect"
        }
      ],
      "required_inputs": [
        {
          "input_key": "preapproval_status",
          "label": "preapproval status",
          "value_type": "text",
          "required_for": [
            "effect_one_time_savings_3_15fcad37f2268e40"
          ],
          "source_precedence": [
            "user_profile",
            "retrofit_assumptions",
            "quote",
            "utility_data",
            "program_application",
            "admin_review"
          ],
          "missing_severity": "blocks_calculation"
        },
        {
          "input_key": "equipment_nameplate_data",
          "label": "equipment nameplate data",
          "value_type": "text",
          "required_for": [
            "effect_one_time_savings_3_15fcad37f2268e40"
          ],
          "source_precedence": [
            "user_profile",
            "retrofit_assumptions",
            "quote",
            "utility_data"
          ],
          "missing_severity": "blocks_calculation"
        },
        {
          "input_key": "equipment_specifications",
          "label": "equipment specifications",
          "value_type": "text",
          "required_for": [
            "effect_one_time_savings_3_15fcad37f2268e40"
          ],
          "source_precedence": [
            "user_profile",
            "retrofit_assumptions",
            "quote",
            "utility_data"
          ],
          "missing_severity": "blocks_calculation"
        },
        {
          "input_key": "eligible_project_cost",
          "label": "eligible project cost",
          "value_type": "number",
          "required_for": [
            "effect_one_time_savings_3_15fcad37f2268e40"
          ],
          "source_precedence": [
            "user_profile",
            "retrofit_assumptions",
            "quote",
            "utility_data"
          ],
          "missing_severity": "blocks_calculation"
        },
        {
          "input_key": "estimated_kw_reduction",
          "label": "estimated kW reduction",
          "value_type": "number",
          "required_for": [
            "effect_one_time_savings_3_15fcad37f2268e40"
          ],
          "source_precedence": [
            "user_profile",
            "retrofit_assumptions",
            "quote",
            "utility_data"
          ],
          "missing_severity": "blocks_calculation"
        },
        {
          "input_key": "estimated_kwh_savings",
          "label": "estimated kWh savings",
          "value_type": "number",
          "required_for": [
            "effect_one_time_savings_3_15fcad37f2268e40"
          ],
          "source_precedence": [
            "user_profile",
            "retrofit_assumptions",
            "quote",
            "utility_data"
          ],
          "missing_severity": "blocks_calculation"
        },
        {
          "input_key": "annual_operating_hours",
          "label": "annual operating hours",
          "value_type": "text",
          "required_for": [
            "effect_one_time_savings_3_15fcad37f2268e40"
          ],
          "source_precedence": [
            "user_profile",
            "retrofit_assumptions",
            "quote",
            "utility_data"
          ],
          "missing_severity": "blocks_calculation"
        },
        {
          "input_key": "lrec_pre_inspection",
          "label": "LREC pre inspection",
          "value_type": "text",
          "required_for": [
            "effect_one_time_savings_3_15fcad37f2268e40"
          ],
          "source_precedence": [
            "user_profile",
            "retrofit_assumptions",
            "quote",
            "utility_data"
          ],
          "missing_severity": "blocks_calculation"
        },
        {
          "input_key": "kw_reduction",
          "label": "kW reduction",
          "value_type": "number",
          "required_for": [
            "effect_one_time_savings_3_15fcad37f2268e40"
          ],
          "source_precedence": [
            "user_profile",
            "retrofit_assumptions",
            "quote",
            "utility_data"
          ],
          "missing_severity": "blocks_calculation"
        },
        {
          "input_key": "kwh_savings",
          "label": "kWh savings",
          "value_type": "number",
          "required_for": [
            "effect_one_time_savings_3_15fcad37f2268e40"
          ],
          "source_precedence": [
            "user_profile",
            "retrofit_assumptions",
            "quote",
            "utility_data"
          ],
          "missing_severity": "blocks_calculation"
        },
        {
          "input_key": "lrec_commercial_or_agricultural_member_status",
          "label": "Lrec Commercial Or Agricultural Member Status",
          "value_type": "text",
          "required_for": [
            "effect_one_time_savings_3_15fcad37f2268e40"
          ],
          "source_precedence": [
            "user_profile",
            "program_application",
            "admin_review"
          ],
          "missing_severity": "blocks_calculation"
        },
        {
          "input_key": "eligible_project_cost_cents",
          "label": "Eligible Project Cost",
          "value_type": "number",
          "required_for": [
            "effect_one_time_savings_3_15fcad37f2268e40"
          ],
          "source_precedence": [
            "quote",
            "user_profile",
            "retrofit_assumptions"
          ],
          "missing_severity": "blocks_calculation"
        },
        {
          "input_key": "coincidental_kw_saved_or_growth",
          "label": "Coincidental Kw Saved Or Growth",
          "value_type": "text",
          "required_for": [
            "effect_one_time_savings_3_15fcad37f2268e40"
          ],
          "source_precedence": [
            "utility_data",
            "quote",
            "retrofit_assumptions"
          ],
          "missing_severity": "blocks_calculation"
        },
        {
          "input_key": "annual_kwh_saved_or_sales",
          "label": "Annual Kwh Saved Or Sales",
          "value_type": "text",
          "required_for": [
            "effect_one_time_savings_3_15fcad37f2268e40"
          ],
          "source_precedence": [
            "utility_data",
            "quote",
            "retrofit_assumptions"
          ],
          "missing_severity": "blocks_calculation"
        },
        {
          "input_key": "lrec_preinspection_or_review",
          "label": "Lrec Preinspection Or Review",
          "value_type": "text",
          "required_for": [
            "effect_one_time_savings_3_15fcad37f2268e40"
          ],
          "source_precedence": [
            "user_profile",
            "retrofit_assumptions",
            "quote",
            "utility_data"
          ],
          "missing_severity": "blocks_calculation"
        },
        {
          "input_key": "funding_availability",
          "label": "Funding Availability",
          "value_type": "number",
          "required_for": [
            "effect_one_time_savings_3_15fcad37f2268e40"
          ],
          "source_precedence": [
            "user_profile",
            "retrofit_assumptions",
            "quote",
            "utility_data"
          ],
          "missing_severity": "blocks_calculation"
        }
      ],
      "evidence_refs": [
        "evidence_9558a9198acccd4e",
        "grant_probability_repair_b4dba5a96e2cbb1a"
      ],
      "confidence": {
        "overall": 0.38,
        "calculation": 0.38,
        "extraction": 0.9,
        "reason_codes": [
          "repair_status_calculation_package_found",
          "calculation_status_calculable_with_missing_inputs",
          "source_confidence_high",
          "estimate_confidence_medium",
          "value_model_custom_quote",
          "grant_probability_repair_applied",
          "estimate_confidence_low",
          "value_model_other",
          "estimate_status_needs_quote"
        ]
      }
    }
  ],
  "measure_catalogs": [
    {
      "catalog_id": "lrec_2026_commercial_lighting",
      "name": "lrec_2026_commercial_lighting",
      "selection_input": "lighting_measure_type_and_wattage",
      "measures": [
        {
          "measure_id": "measure_1",
          "name": "measure_1",
          "category": null,
          "customer_filters": [],
          "equipment_filters": [],
          "calculation": {
            "method": "fixed_amount",
            "amount": {
              "value": 2,
              "currency": "USD"
            }
          },
          "limits": [],
          "required_inputs": [],
          "evidence_refs": [],
          "confidence": {
            "overall": 0.72,
            "calculation": 0.72,
            "extraction": 0.72,
            "reason_codes": [
              "gpt_pro_measure_catalog_row"
            ]
          },
          "source_row": {
            "selection": "screw_or_pin_LED_lamp_20_to_60W",
            "amountCents": 200
          }
        },
        {
          "measure_id": "measure_2",
          "name": "measure_2",
          "category": null,
          "customer_filters": [],
          "equipment_filters": [],
          "calculation": {
            "method": "fixed_amount",
            "amount": {
              "value": 5,
              "currency": "USD"
            }
          },
          "limits": [],
          "required_inputs": [],
          "evidence_refs": [],
          "confidence": {
            "overall": 0.72,
            "calculation": 0.72,
            "extraction": 0.72,
            "reason_codes": [
              "gpt_pro_measure_catalog_row"
            ]
          },
          "source_row": {
            "selection": "screw_or_pin_LED_lamp_61_to_100W",
            "amountCents": 500
          }
        },
        {
          "measure_id": "measure_3",
          "name": "measure_3",
          "category": null,
          "customer_filters": [],
          "equipment_filters": [],
          "calculation": {
            "method": "fixed_amount",
            "amount": {
              "value": 10,
              "currency": "USD"
            }
          },
          "limits": [],
          "required_inputs": [],
          "evidence_refs": [],
          "confidence": {
            "overall": 0.72,
            "calculation": 0.72,
            "extraction": 0.72,
            "reason_codes": [
              "gpt_pro_measure_catalog_row"
            ]
          },
          "source_row": {
            "selection": "screw_or_pin_LED_lamp_101_to_140W",
            "amountCents": 1000
          }
        },
        {
          "measure_id": "measure_4",
          "name": "measure_4",
          "category": null,
          "customer_filters": [],
          "equipment_filters": [],
          "calculation": {
            "method": "fixed_amount",
            "amount": {
              "value": 5,
              "currency": "USD"
            }
          },
          "limits": [],
          "required_inputs": [],
          "evidence_refs": [],
          "confidence": {
            "overall": 0.72,
            "calculation": 0.72,
            "extraction": 0.72,
            "reason_codes": [
              "gpt_pro_measure_catalog_row"
            ]
          },
          "source_row": {
            "selection": "4_foot_LED_lamp_replacing_T12_or_T8",
            "amountCents": 500
          }
        },
        {
          "measure_id": "measure_5",
          "name": "measure_5",
          "category": null,
          "customer_filters": [],
          "equipment_filters": [],
          "calculation": {
            "method": "fixed_amount",
            "amount": {
              "value": 20,
              "currency": "USD"
            }
          },
          "limits": [],
          "required_inputs": [],
          "evidence_refs": [],
          "confidence": {
            "overall": 0.72,
            "calculation": 0.72,
            "extraction": 0.72,
            "reason_codes": [
              "gpt_pro_measure_catalog_row"
            ]
          },
          "source_row": {
            "selection": "5_to_6_foot_refrigerator_or_freezer_case_lamp",
            "amountCents": 2000
          }
        },
        {
          "measure_id": "measure_6",
          "name": "measure_6",
          "category": null,
          "customer_filters": [],
          "equipment_filters": [],
          "calculation": {
            "method": "fixed_amount",
            "amount": {
              "value": 10,
              "currency": "USD"
            }
          },
          "limits": [],
          "required_inputs": [],
          "evidence_refs": [],
          "confidence": {
            "overall": 0.72,
            "calculation": 0.72,
            "extraction": 0.72,
            "reason_codes": [
              "gpt_pro_measure_catalog_row"
            ]
          },
          "source_row": {
            "selection": "LED_fixture_less_than_25W",
            "amountCents": 1000
          }
        },
        {
          "measure_id": "measure_7",
          "name": "measure_7",
          "category": null,
          "customer_filters": [],
          "equipment_filters": [],
          "calculation": {
            "method": "fixed_amount",
            "amount": {
              "value": 15,
              "currency": "USD"
            }
          },
          "limits": [],
          "required_inputs": [],
          "evidence_refs": [],
          "confidence": {
            "overall": 0.72,
            "calculation": 0.72,
            "extraction": 0.72,
            "reason_codes": [
              "gpt_pro_measure_catalog_row"
            ]
          },
          "source_row": {
            "selection": "LED_fixture_26_to_50W",
            "amountCents": 1500
          }
        },
        {
          "measure_id": "measure_8",
          "name": "measure_8",
          "category": null,
          "customer_filters": [],
          "equipment_filters": [],
          "calculation": {
            "method": "fixed_amount",
            "amount": {
              "value": 20,
              "currency": "USD"
            }
          },
          "limits": [],
          "required_inputs": [],
          "evidence_refs": [],
          "confidence": {
            "overall": 0.72,
            "calculation": 0.72,
            "extraction": 0.72,
            "reason_codes": [
              "gpt_pro_measure_catalog_row"
            ]
          },
          "source_row": {
            "selection": "LED_fixture_51_to_75W",
            "amountCents": 2000
          }
        },
        {
          "measure_id": "measure_9",
          "name": "measure_9",
          "category": null,
          "customer_filters": [],
          "equipment_filters": [],
          "calculation": {
            "method": "zero_when_not_applicable",
            "reason": "Measure row requires custom interpretation.",
            "source_row": {
              "selection": "NLC_with_LLLC",
              "rateCentsPerConnectedKW": 5000
            }
          },
          "limits": [],
          "required_inputs": [],
          "evidence_refs": [],
          "confidence": {
            "overall": 0.72,
            "calculation": 0.72,
            "extraction": 0.72,
            "reason_codes": [
              "gpt_pro_measure_catalog_row"
            ]
          },
          "source_row": {
            "selection": "NLC_with_LLLC",
            "rateCentsPerConnectedKW": 5000
          }
        }
      ]
    },
    {
      "catalog_id": "lrec_2026_dairy_measures",
      "name": "lrec_2026_dairy_measures",
      "selection_input": "dairy_measure_type",
      "measures": [
        {
          "measure_id": "measure_1",
          "name": "measure_1",
          "category": null,
          "customer_filters": [],
          "equipment_filters": [],
          "calculation": {
            "method": "fixed_amount",
            "amount": {
              "value": 2,
              "currency": "USD"
            }
          },
          "limits": [],
          "required_inputs": [],
          "evidence_refs": [],
          "confidence": {
            "overall": 0.72,
            "calculation": 0.72,
            "extraction": 0.72,
            "reason_codes": [
              "gpt_pro_measure_catalog_row"
            ]
          },
          "source_row": {
            "selection": "dairy_plate_cooler",
            "amountCents": 200,
            "unit": "per cow"
          }
        },
        {
          "measure_id": "measure_2",
          "name": "measure_2",
          "category": null,
          "customer_filters": [],
          "equipment_filters": [],
          "calculation": {
            "method": "fixed_amount",
            "amount": {
              "value": 2,
              "currency": "USD"
            }
          },
          "limits": [],
          "required_inputs": [],
          "evidence_refs": [],
          "confidence": {
            "overall": 0.72,
            "calculation": 0.72,
            "extraction": 0.72,
            "reason_codes": [
              "gpt_pro_measure_catalog_row"
            ]
          },
          "source_row": {
            "selection": "milk_pump_VFD",
            "amountCents": 200,
            "unit": "per cow"
          }
        },
        {
          "measure_id": "measure_3",
          "name": "measure_3",
          "category": null,
          "customer_filters": [],
          "equipment_filters": [],
          "calculation": {
            "method": "fixed_amount",
            "amount": {
              "value": 20,
              "currency": "USD"
            }
          },
          "limits": [],
          "required_inputs": [],
          "evidence_refs": [],
          "confidence": {
            "overall": 0.72,
            "calculation": 0.72,
            "extraction": 0.72,
            "reason_codes": [
              "gpt_pro_measure_catalog_row"
            ]
          },
          "source_row": {
            "selection": "vacuum_pump_VFD",
            "amountCents": 2000,
            "unit": "per horsepower"
          }
        }
      ]
    }
  ],
  "input_requirements": [
    {
      "input_key": "lrec_commercial_account",
      "label": "LREC commercial account",
      "value_type": "number",
      "required_for": [
        "effect_one_time_savings_1_1710faf590c563a5"
      ],
      "source_precedence": [
        "user_profile",
        "retrofit_assumptions",
        "quote",
        "utility_data"
      ],
      "missing_severity": "blocks_calculation"
    },
    {
      "input_key": "lighting_measure_type",
      "label": "lighting measure type",
      "value_type": "text",
      "required_for": [
        "effect_one_time_savings_1_1710faf590c563a5"
      ],
      "source_precedence": [
        "user_profile",
        "retrofit_assumptions",
        "quote",
        "utility_data"
      ],
      "missing_severity": "blocks_calculation"
    },
    {
      "input_key": "new_fixture_wattage",
      "label": "new fixture wattage",
      "value_type": "text",
      "required_for": [
        "effect_one_time_savings_1_1710faf590c563a5"
      ],
      "source_precedence": [
        "user_profile",
        "retrofit_assumptions",
        "quote",
        "utility_data"
      ],
      "missing_severity": "blocks_calculation"
    },
    {
      "input_key": "quantity",
      "label": "quantity",
      "value_type": "number",
      "required_for": [
        "effect_one_time_savings_1_1710faf590c563a5"
      ],
      "source_precedence": [
        "user_profile",
        "retrofit_assumptions",
        "quote",
        "utility_data"
      ],
      "missing_severity": "blocks_calculation"
    },
    {
      "input_key": "connected_control_kw",
      "label": "connected control kW",
      "value_type": "number",
      "required_for": [
        "effect_one_time_savings_1_1710faf590c563a5"
      ],
      "source_precedence": [
        "user_profile",
        "retrofit_assumptions",
        "quote",
        "utility_data"
      ],
      "missing_severity": "blocks_calculation"
    },
    {
      "input_key": "material_or_equipment_cost",
      "label": "material or equipment cost",
      "value_type": "number",
      "required_for": [
        "effect_one_time_savings_1_1710faf590c563a5"
      ],
      "source_precedence": [
        "user_profile",
        "retrofit_assumptions",
        "quote",
        "utility_data"
      ],
      "missing_severity": "blocks_calculation"
    },
    {
      "input_key": "invoice_date",
      "label": "invoice date",
      "value_type": "text",
      "required_for": [
        "effect_one_time_savings_1_1710faf590c563a5"
      ],
      "source_precedence": [
        "user_profile",
        "retrofit_assumptions",
        "quote",
        "utility_data"
      ],
      "missing_severity": "blocks_calculation"
    },
    {
      "input_key": "dlc_or_energy_star_listing",
      "label": "DLC or ENERGY STAR listing",
      "value_type": "text",
      "required_for": [
        "effect_one_time_savings_1_1710faf590c563a5"
      ],
      "source_precedence": [
        "user_profile",
        "retrofit_assumptions",
        "quote",
        "utility_data"
      ],
      "missing_severity": "blocks_calculation"
    },
    {
      "input_key": "measure_type",
      "label": "measure type",
      "value_type": "text",
      "required_for": [
        "effect_one_time_savings_1_1710faf590c563a5",
        "effect_one_time_savings_2_8f47bd53eecfe786"
      ],
      "source_precedence": [
        "user_profile",
        "retrofit_assumptions",
        "quote",
        "utility_data"
      ],
      "missing_severity": "blocks_calculation"
    },
    {
      "input_key": "wattage_or_control_kw",
      "label": "wattage or control kW",
      "value_type": "number",
      "required_for": [
        "effect_one_time_savings_1_1710faf590c563a5"
      ],
      "source_precedence": [
        "user_profile",
        "retrofit_assumptions",
        "quote",
        "utility_data"
      ],
      "missing_severity": "blocks_calculation"
    },
    {
      "input_key": "material_cost",
      "label": "material cost",
      "value_type": "number",
      "required_for": [
        "effect_one_time_savings_1_1710faf590c563a5"
      ],
      "source_precedence": [
        "user_profile",
        "retrofit_assumptions",
        "quote",
        "utility_data"
      ],
      "missing_severity": "blocks_calculation"
    },
    {
      "input_key": "dairy_measure_type",
      "label": "dairy measure type",
      "value_type": "text",
      "required_for": [
        "effect_one_time_savings_2_8f47bd53eecfe786"
      ],
      "source_precedence": [
        "user_profile",
        "retrofit_assumptions",
        "quote",
        "utility_data"
      ],
      "missing_severity": "blocks_calculation"
    },
    {
      "input_key": "cow_count",
      "label": "cow count",
      "value_type": "number",
      "required_for": [
        "effect_one_time_savings_2_8f47bd53eecfe786"
      ],
      "source_precedence": [
        "user_profile",
        "retrofit_assumptions",
        "quote",
        "utility_data"
      ],
      "missing_severity": "blocks_calculation"
    },
    {
      "input_key": "horsepower",
      "label": "horsepower",
      "value_type": "text",
      "required_for": [
        "effect_one_time_savings_2_8f47bd53eecfe786"
      ],
      "source_precedence": [
        "user_profile",
        "retrofit_assumptions",
        "quote",
        "utility_data"
      ],
      "missing_severity": "blocks_calculation"
    },
    {
      "input_key": "eligible_equipment_cost",
      "label": "eligible equipment cost",
      "value_type": "number",
      "required_for": [
        "effect_one_time_savings_2_8f47bd53eecfe786"
      ],
      "source_precedence": [
        "user_profile",
        "retrofit_assumptions",
        "quote",
        "utility_data"
      ],
      "missing_severity": "blocks_calculation"
    },
    {
      "input_key": "cow_count_or_horsepower",
      "label": "cow count or horsepower",
      "value_type": "number",
      "required_for": [
        "effect_one_time_savings_2_8f47bd53eecfe786"
      ],
      "source_precedence": [
        "user_profile",
        "retrofit_assumptions",
        "quote",
        "utility_data"
      ],
      "missing_severity": "blocks_calculation"
    },
    {
      "input_key": "preapproval_status",
      "label": "preapproval status",
      "value_type": "text",
      "required_for": [
        "effect_one_time_savings_3_15fcad37f2268e40"
      ],
      "source_precedence": [
        "user_profile",
        "retrofit_assumptions",
        "quote",
        "utility_data",
        "program_application",
        "admin_review"
      ],
      "missing_severity": "blocks_calculation"
    },
    {
      "input_key": "equipment_nameplate_data",
      "label": "equipment nameplate data",
      "value_type": "text",
      "required_for": [
        "effect_one_time_savings_3_15fcad37f2268e40"
      ],
      "source_precedence": [
        "user_profile",
        "retrofit_assumptions",
        "quote",
        "utility_data"
      ],
      "missing_severity": "blocks_calculation"
    },
    {
      "input_key": "equipment_specifications",
      "label": "equipment specifications",
      "value_type": "text",
      "required_for": [
        "effect_one_time_savings_3_15fcad37f2268e40",
        "effect_one_time_savings_2_8f47bd53eecfe786"
      ],
      "source_precedence": [
        "user_profile",
        "retrofit_assumptions",
        "quote",
        "utility_data"
      ],
      "missing_severity": "blocks_calculation"
    },
    {
      "input_key": "eligible_project_cost",
      "label": "eligible project cost",
      "value_type": "number",
      "required_for": [
        "effect_one_time_savings_3_15fcad37f2268e40"
      ],
      "source_precedence": [
        "user_profile",
        "retrofit_assumptions",
        "quote",
        "utility_data"
      ],
      "missing_severity": "blocks_calculation"
    },
    {
      "input_key": "estimated_kw_reduction",
      "label": "estimated kW reduction",
      "value_type": "number",
      "required_for": [
        "effect_one_time_savings_3_15fcad37f2268e40"
      ],
      "source_precedence": [
        "user_profile",
        "retrofit_assumptions",
        "quote",
        "utility_data"
      ],
      "missing_severity": "blocks_calculation"
    },
    {
      "input_key": "estimated_kwh_savings",
      "label": "estimated kWh savings",
      "value_type": "number",
      "required_for": [
        "effect_one_time_savings_3_15fcad37f2268e40"
      ],
      "source_precedence": [
        "user_profile",
        "retrofit_assumptions",
        "quote",
        "utility_data"
      ],
      "missing_severity": "blocks_calculation"
    },
    {
      "input_key": "annual_operating_hours",
      "label": "annual operating hours",
      "value_type": "text",
      "required_for": [
        "effect_one_time_savings_3_15fcad37f2268e40"
      ],
      "source_precedence": [
        "user_profile",
        "retrofit_assumptions",
        "quote",
        "utility_data"
      ],
      "missing_severity": "blocks_calculation"
    },
    {
      "input_key": "lrec_pre_inspection",
      "label": "LREC pre inspection",
      "value_type": "text",
      "required_for": [
        "effect_one_time_savings_3_15fcad37f2268e40"
      ],
      "source_precedence": [
        "user_profile",
        "retrofit_assumptions",
        "quote",
        "utility_data"
      ],
      "missing_severity": "blocks_calculation"
    },
    {
      "input_key": "kw_reduction",
      "label": "kW reduction",
      "value_type": "number",
      "required_for": [
        "effect_one_time_savings_3_15fcad37f2268e40"
      ],
      "source_precedence": [
        "user_profile",
        "retrofit_assumptions",
        "quote",
        "utility_data"
      ],
      "missing_severity": "blocks_calculation"
    },
    {
      "input_key": "kwh_savings",
      "label": "kWh savings",
      "value_type": "number",
      "required_for": [
        "effect_one_time_savings_3_15fcad37f2268e40"
      ],
      "source_precedence": [
        "user_profile",
        "retrofit_assumptions",
        "quote",
        "utility_data"
      ],
      "missing_severity": "blocks_calculation"
    },
    {
      "input_key": "lrec_commercial_or_agricultural_member_status",
      "label": "Lrec Commercial Or Agricultural Member Status",
      "value_type": "text",
      "required_for": [
        "effect_one_time_savings_1_1710faf590c563a5",
        "effect_one_time_savings_3_15fcad37f2268e40"
      ],
      "source_precedence": [
        "user_profile",
        "program_application",
        "admin_review"
      ],
      "missing_severity": "blocks_calculation"
    },
    {
      "input_key": "new_fixture_or_lamp_wattage",
      "label": "New Fixture Or Lamp Wattage",
      "value_type": "text",
      "required_for": [
        "effect_one_time_savings_1_1710faf590c563a5"
      ],
      "source_precedence": [
        "user_profile",
        "retrofit_assumptions",
        "quote",
        "utility_data"
      ],
      "missing_severity": "blocks_calculation"
    },
    {
      "input_key": "material_or_equipment_cost_cents",
      "label": "Material Or Equipment Cost",
      "value_type": "number",
      "required_for": [
        "effect_one_time_savings_1_1710faf590c563a5"
      ],
      "source_precedence": [
        "quote",
        "user_profile",
        "retrofit_assumptions"
      ],
      "missing_severity": "blocks_calculation"
    },
    {
      "input_key": "funding_availability",
      "label": "Funding Availability",
      "value_type": "number",
      "required_for": [
        "effect_one_time_savings_1_1710faf590c563a5",
        "effect_one_time_savings_2_8f47bd53eecfe786",
        "effect_one_time_savings_3_15fcad37f2268e40"
      ],
      "source_precedence": [
        "user_profile",
        "retrofit_assumptions",
        "quote",
        "utility_data"
      ],
      "missing_severity": "blocks_calculation"
    },
    {
      "input_key": "lrec_agricultural_or_commercial_member_status",
      "label": "Lrec Agricultural Or Commercial Member Status",
      "value_type": "text",
      "required_for": [
        "effect_one_time_savings_2_8f47bd53eecfe786"
      ],
      "source_precedence": [
        "user_profile",
        "program_application",
        "admin_review"
      ],
      "missing_severity": "blocks_calculation"
    },
    {
      "input_key": "project_cost_and_invoices",
      "label": "Project Cost And Invoices",
      "value_type": "number",
      "required_for": [
        "effect_one_time_savings_2_8f47bd53eecfe786"
      ],
      "source_precedence": [
        "quote",
        "user_profile",
        "retrofit_assumptions"
      ],
      "missing_severity": "blocks_calculation"
    },
    {
      "input_key": "eligible_project_cost_cents",
      "label": "Eligible Project Cost",
      "value_type": "number",
      "required_for": [
        "effect_one_time_savings_3_15fcad37f2268e40"
      ],
      "source_precedence": [
        "quote",
        "user_profile",
        "retrofit_assumptions"
      ],
      "missing_severity": "blocks_calculation"
    },
    {
      "input_key": "coincidental_kw_saved_or_growth",
      "label": "Coincidental Kw Saved Or Growth",
      "value_type": "text",
      "required_for": [
        "effect_one_time_savings_3_15fcad37f2268e40"
      ],
      "source_precedence": [
        "utility_data",
        "quote",
        "retrofit_assumptions"
      ],
      "missing_severity": "blocks_calculation"
    },
    {
      "input_key": "annual_kwh_saved_or_sales",
      "label": "Annual Kwh Saved Or Sales",
      "value_type": "text",
      "required_for": [
        "effect_one_time_savings_3_15fcad37f2268e40"
      ],
      "source_precedence": [
        "utility_data",
        "quote",
        "retrofit_assumptions"
      ],
      "missing_severity": "blocks_calculation"
    },
    {
      "input_key": "lrec_preinspection_or_review",
      "label": "Lrec Preinspection Or Review",
      "value_type": "text",
      "required_for": [
        "effect_one_time_savings_3_15fcad37f2268e40"
      ],
      "source_precedence": [
        "user_profile",
        "retrofit_assumptions",
        "quote",
        "utility_data"
      ],
      "missing_severity": "blocks_calculation"
    }
  ],
  "source_evidence": [
    {
      "evidence_id": "evidence_9558a9198acccd4e",
      "source_type": "gpt_pro_research_summary",
      "quote": "LREC publishes 2026 commercial lighting, dairy, and custom rebate forms plus an ag-commercial grants page for eligible electric-efficiency projects.",
      "source_urls": [
        "https://www.lrec.coop/energy-services/ag-commercial-energy-grants/",
        "https://www.lrec.coop/energy-services/rebates-loans-and-tax-credits/",
        "https://www.lrec.coop/wp-content/uploads/2026/02/2026-LREC-Com-Lighting-Fillable.pdf",
        "https://www.lrec.coop/wp-content/uploads/2026/02/2026-LREC-Custom-Fillable.pdf",
        "https://www.lrec.coop/wp-content/uploads/2026/02/2026-LREC-Dairy-Fillable.pdf"
      ],
      "evidence_confidence": 0.9
    },
    {
      "evidence_id": "grant_probability_repair_f806241843dce182",
      "source_type": "gpt_pro_grant_probability_repair",
      "quote": "LREC's 2026 commercial LED lighting form states that eligible commercial, agricultural, or industrial members can receive rebates by lamp/fixture/control measure, subject to a cap of 50% of material/equipment cost and $5,000 per member annually.",
      "source_urls": [
        "https://www.lrec.coop/energy-services/ag-commercial-energy-grants/",
        "https://www.lrec.coop/energy-services/rebates-loans-and-tax-credits/",
        "https://www.lrec.coop/wp-content/uploads/2026/02/2026-LREC-Com-Lighting-Fillable.pdf"
      ],
      "evidence_confidence": 0.9
    },
    {
      "evidence_id": "grant_probability_repair_a5f591ce10dfea82",
      "source_type": "gpt_pro_grant_probability_repair",
      "quote": "LREC's 2026 dairy form lists $2/cow for dairy plate cooler, $2/cow for milk pump VFD, and $20/hp for vacuum pump VFD; it shows robotic milking system as $X.XX/stall, requiring confirmation.",
      "source_urls": [
        "https://www.lrec.coop/energy-services/ag-commercial-energy-grants/",
        "https://www.lrec.coop/energy-services/rebates-loans-and-tax-credits/",
        "https://www.lrec.coop/wp-content/uploads/2026/02/2026-LREC-Dairy-Fillable.pdf"
      ],
      "evidence_confidence": 0.9
    },
    {
      "evidence_id": "grant_probability_repair_b4dba5a96e2cbb1a",
      "source_type": "gpt_pro_grant_probability_repair",
      "quote": "LREC's custom energy rebate form says pre-approval is required, rebate value is determined from demand, energy, and annual operating hours, and maximum rebate is limited to 50% of project costs up to a dollar amount deemed by the cooperative.",
      "source_urls": [
        "https://www.lrec.coop/energy-services/ag-commercial-energy-grants/",
        "https://www.lrec.coop/energy-services/rebates-loans-and-tax-credits/",
        "https://www.lrec.coop/wp-content/uploads/2026/02/2026-LREC-Custom-Fillable.pdf"
      ],
      "evidence_confidence": 0.9
    }
  ],
  "confidence": {
    "overall": 0.72,
    "source_access": 0.9,
    "availability": 0.9,
    "calculation": 0.72,
    "extraction": 0.9,
    "reason_codes": [
      "repair_status_calculation_package_found",
      "calculation_status_calculable_with_missing_inputs",
      "source_confidence_high",
      "estimate_confidence_medium"
    ]
  }
}
```

## What To Research

1. Official current source URLs, manuals, solicitations, application guides, forms, NOFO/FOA pages, or administrator pages.
2. Value model kind: fixed amount, fixed tier, percent of eligible cost, capped percent, per-unit, hybrid/rate table, reimbursement, competitive max-only, competitive award range, competitive cost-share, no calculable value, source inaccessible, loan/financing, tax credit, or non-cash assistance.
3. Conditional award formula if selected/approved: rates, caps, ranges, required cost basis, rate-table dimensions, unit counts, eligible/ineligible costs, timing/preapproval gates.
4. Probability model for competitive or funding-contingent awards: historical awards/applications, budget and expected awards, first-come funds confirmed, first-come funds unknown, scoring criteria only, eligibility only, or none.
5. Required runtime inputs: user/project inputs, quote inputs, bill inputs, application status, selected measure, equipment specs, approval status, project cost, quantity, ownership, applicant status.
6. Whether any value should be included in user-facing savings totals by default. Be conservative.

## Required Output

Return JSON only, using this schema shape. Include nulls where values are unknown. Amounts must be cents. Percentages/rates must be decimal fractions, e.g. 0.8 for 80%.

```json
{
  "schemaVersion": "retrofi_grant_package_repair.v1",
  "researchedAt": "YYYY-MM-DD",
  "opportunityId": "SOURCE_DSIRE:dsire_program_id:3577",
  "programName": "Lake Region Electric Cooperative - Agriculture and Commercial Energy Efficiency Grant Program",
  "status": "runtime_ready | needs_project_inputs | needs_formula_runtime_support | suppress_no_probability_evidence | suppress_max_only | suppress_low_source_confidence | no_calculable_value | source_inaccessible | non_grant_or_non_cash | closed_or_unavailable",
  "sourceConfidence": "high | medium | low",
  "estimateConfidenceIfInputsPresent": "high | medium | low",
  "officialSources": [
    {
      "title": "",
      "url": "",
      "owner": "",
      "accessed": "YYYY-MM-DD",
      "evidenceText": ""
    }
  ],
  "sourceSummary": "",
  "packagePatch": {
    "calculation_status": "calculable | calculable_with_missing_inputs | custom_quote_estimate | no_calculable_value | non_monetary_workflow | needs_repair_review",
    "availability": {
      "status": "active | rolling | upcoming | closed | unknown",
      "fundingStatus": "open_funds_available | open_while_funds_last | waitlist | closed | exhausted | unknown"
    },
    "input_requirements_to_add_or_update": [],
    "effects_to_add_or_update": [
      {
        "effect_id": "",
        "effect_type": "grant_expected_value | one_time_savings | no_cash_value",
        "cash_value_classification": "cash_grant | reimbursement | rebate | tax_credit | loan | financing | technical_assistance | unknown",
        "value_model_kind": "fixed_amount | fixed_tier_amount | percent_of_eligible_cost | capped_percent_of_eligible_cost | per_unit_award | hybrid_rate_plus_cap | competitive_max_only | competitive_award_range | competitive_cost_share | formula_grant | rebate_labeled_as_grant | study_or_audit_grant | loan_or_financing_labeled_as_grant | tax_credit_mixed_with_grant | non_cash_technical_assistance | no_calculable_value | source_inaccessible",
        "calculation": {
          "method": "fixed_amount | percent_of_cost | per_unit | per_kw | per_port | rate_table | measure_catalog | expected_value | custom_quote | expression | zero_when_not_applicable",
          "amount_cents": null,
          "percent": null,
          "conditional_award_cents": null,
          "conditional_award_formula": "",
          "max_award_cents": null,
          "min_award_cents": null,
          "rate_rows": [],
          "probability_discount": null,
          "probability_evidence_type": "not_required | historical_success_rate | budget_and_expected_awards | historical_awards_only | first_come_funds_confirmed | first_come_funding_unknown | scoring_criteria_only | eligibility_only | human_reviewed | none"
        },
        "required_inputs": [],
        "missing_input_behavior": "calculate_when_present | needs_quote | needs_project_scope | needs_funding_check | suppress_until_review",
        "includedInUserFacingTotalDefault": false,
        "humanReviewRequired": false,
        "reasonCodes": [],
        "calculationTrace": []
      }
    ]
  },
  "testCaseInputHints": [
    {
      "inputKey": "",
      "valueType": "number | boolean | text | date | enum | money_cents | array",
      "whoProvides": "server_derived | user | quote | bill | application_status | accountant | admin_research",
      "realisticDefaultGuidance": ""
    }
  ],
  "remainingGaps": [],
  "doNotUseAsUserFacingEstimateReasons": []
}
```
