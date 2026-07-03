You are helping RetroFi finish conservative grant estimation.

Prompt 10 of 37.

Research only official or primary administrator sources when possible. Third-party summaries can be used only to find official sources, not as final support for formula/probability fields.

## Goal

Repair this grant-like v2 incentive package so Codex can calculate the grant value conservatively at runtime, or suppress it with explicit reason codes when no defensible estimate exists.

Do not make every grant estimable. If the source only says "up to", if the award is competitive with no probability evidence, if funding status is unknown, or if project-specific award approval is required, return suppressed or missing-input status.

## Current Package Context

```json
{
  "opportunity_id": "SOURCE_DSIRE:dsire_program_id:5362",
  "program_name": "Commercial Scale Renewable Energy Grants (Commerce RI)",
  "calculation_status": "calculable_with_missing_inputs",
  "availability": {
    "status": "active",
    "source_access_status": "accessible_or_researched"
  },
  "retrofit_types": [
    "battery_storage_system",
    "solar_carport"
  ],
  "geography": {
    "country": "US",
    "states": [],
    "counties": [],
    "cities": [],
    "utility_territory_required": false
  },
  "grant_effects": [
    {
      "effect_id": "effect_grant_expected_value_1_6968bbfaaabe9e9d",
      "label": "Calculate the commercial-scale solar base grant by ownership and DC capacity tiers, then add approved solar carport and energy-storage adders subject to per-project and round caps. Storage adder is based on maximum continuous power deliverable over three hours.",
      "effect_type": "grant_expected_value",
      "cash_flow_direction": "benefit",
      "timing": {
        "cadence": "one_time",
        "source_timing": "post_installation_reimbursement",
        "approval_required_before_purchase": true,
        "approval_required_before_installation": true,
        "application_deadline": "2026-07-31; next listed round 2026-10-23",
        "funding_status": "open_funds_available"
      },
      "calculation": {
        "method": "rate_table",
        "rate_table_id": "commerce_ri_ref_commercial_scale_2026",
        "lookup_inputs": [
          "ownership",
          "capacity_or_adder_tier"
        ],
        "grant_value_model_kind": "hybrid_rate_plus_cap",
        "cash_value_classification": "cash_grant",
        "conditional_award": {
          "status": "needs_project_scope",
          "formula_text": "For 2026 commercial-scale REF projects, calculate the direct-ownership solar base grant by DC capacity tiers from the current RFP: 70 cents/W for the first 0-50 kW, 40 cents/W for the second 50 kW up to 100 kW, 30 cents/W for the third 50 kW up to 150 kW, and 20 cents/W for the fourth 50 kW up to 200 kW, capped at 7,500,000 cents per project and 15,000,000 cents per installer/block. Approved solar carport capacity may receive an additional 55 cents/W subject to a 20,000,000-cent per-project carport maximum and 60,000,000-cent installer/block cap. Approved commercial storage receives 50 cents/W of maximum continuous three-hour deliverable power, capped at 4,000,000 cents per project. SDHW, if applicable, is 25% of contract price capped at 400,000 cents per unit. All awards are subject to REF review and available funds.",
          "conditional_award_cents": null,
          "min_award_cents": null,
          "max_award_cents": null,
          "cost_share_percent": null,
          "required_project_inputs": [
            "ownership_model",
            "project_dc_watts_by_tier",
            "solar_carport_watts",
            "storage_total_battery_capacity_wh",
            "storage_inverter_max_continuous_power_watts",
            "eligible_contract_price_for_sdhw_if_applicable",
            "installer_round_cap_status",
            "application_round",
            "funding_availability",
            "ref_approval_before_installation"
          ],
          "calculation_trace": [
            "Base direct-ownership PV tier calculation uses current RFP rate table and 7,500,000-cent project cap.",
            "Carport adder = eligible carport watts × 55 cents, subject to 20,000,000-cent project cap.",
            "Storage adder = min(total battery capacity Wh / 3 hours, inverter max continuous power W) × 50 cents, capped at 4,000,000 cents.",
            "Apply installer/block and available-fund constraints."
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
          "competition_scope": "statewide_broad",
          "probability_notes": "The REF commercial-scale formulas are rate-table formulas after approval, but blocks close on the application closing date or when funds are reached. No historical success rate, application count, or expected award count was found."
        },
        "expected_value_recommendation": {
          "estimate_status": "needs_project_scope",
          "expected_value_cents": null,
          "estimate_confidence": "medium",
          "include_in_user_facing_total_default": false,
          "reason_codes": [
            "rate_table_inputs_missing",
            "round_and_funding_check_required",
            "adder_caps_require_program_confirmation"
          ]
        },
        "fallback_prior_suggestion": {
          "probability_discount": null,
          "basis": "No automated fallback prior recommended. If RetroFi wants a pre-approval EV, it should be human-reviewed using Commerce RI block funding and application pipeline data.",
          "should_retro_fi_use_without_human_approval": false
        }
      },
      "caps": [
        {
          "cap_type": "maximum_amount",
          "amount": {
            "value": 75000,
            "currency": "USD"
          },
          "applies_to": "effect"
        }
      ],
      "required_inputs": [
        {
          "input_key": "ownership_model",
          "label": "ownership model",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_6968bbfaaabe9e9d"
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
          "input_key": "project_dc_watts_by_tier",
          "label": "project DC watts by tier",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_6968bbfaaabe9e9d"
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
          "input_key": "solar_carport_watts",
          "label": "solar carport watts",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_6968bbfaaabe9e9d"
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
          "input_key": "storage_three_hour_continuous_power_watts",
          "label": "storage three-hour continuous power watts",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_6968bbfaaabe9e9d"
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
          "input_key": "eligible_contract_price_for_sdhw_if_applicable",
          "label": "eligible contract price for SDHW if applicable",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_6968bbfaaabe9e9d"
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
          "input_key": "installer_round_cap_status",
          "label": "installer round cap status",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_6968bbfaaabe9e9d"
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
          "input_key": "application_round",
          "label": "application round",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_6968bbfaaabe9e9d"
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
          "input_key": "ownership",
          "label": "ownership",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_6968bbfaaabe9e9d"
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
          "input_key": "project_watts",
          "label": "project watts",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_6968bbfaaabe9e9d"
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
          "input_key": "adder_quantities",
          "label": "adder quantities",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_6968bbfaaabe9e9d"
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
          "input_key": "cap_availability",
          "label": "cap availability",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_6968bbfaaabe9e9d"
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
          "input_key": "storage_total_battery_capacity_wh",
          "label": "Storage Total Battery Capacity Wh",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_6968bbfaaabe9e9d"
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
          "input_key": "storage_inverter_max_continuous_power_watts",
          "label": "Storage Inverter Max Continuous Power Watts",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_6968bbfaaabe9e9d"
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
            "effect_grant_expected_value_1_6968bbfaaabe9e9d"
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
          "input_key": "ref_approval_before_installation",
          "label": "Ref Approval Before Installation",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_6968bbfaaabe9e9d"
          ],
          "source_precedence": [
            "user_profile",
            "program_application",
            "admin_review"
          ],
          "missing_severity": "blocks_calculation"
        }
      ],
      "evidence_refs": [
        "evidence_981329af0da6297b",
        "grant_probability_repair_e9aba8966133e8cb"
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
          "value_model_rate_table",
          "grant_probability_repair_applied",
          "value_model_hybrid_rate_plus_cap",
          "estimate_status_needs_project_scope"
        ]
      }
    }
  ],
  "rate_tables": [
    {
      "table_id": "commerce_ri_ref_commercial_scale_2026",
      "name": "commerce_ri_ref_commercial_scale_2026",
      "dimensions": [
        "ownership",
        "capacity_or_adder_tier"
      ],
      "rows": [
        {
          "ownership": "direct_ownership",
          "tier": "first_50_kW_DC",
          "rate": 0.7,
          "rateUnit": "$/W"
        },
        {
          "ownership": "direct_ownership",
          "tier": "second_50_kW_DC_51_to_100",
          "rate": 0.4,
          "rateUnit": "$/W"
        },
        {
          "ownership": "direct_ownership",
          "tier": "third_50_kW_DC_101_to_150",
          "rate": 0.3,
          "rateUnit": "$/W"
        },
        {
          "ownership": "direct_ownership",
          "tier": "fourth_50_kW_DC_151_to_200",
          "rate": 0.2,
          "rateUnit": "$/W"
        },
        {
          "ownership": "third_party_ownership",
          "tier": "first_50_kW_DC",
          "rate": 0.35,
          "rateUnit": "$/W"
        },
        {
          "ownership": "third_party_ownership",
          "tier": "second_50_kW_DC_51_to_100",
          "rate": 0.2,
          "rateUnit": "$/W"
        },
        {
          "ownership": "third_party_ownership",
          "tier": "third_50_kW_DC_101_to_150",
          "rate": 0.15,
          "rateUnit": "$/W"
        },
        {
          "ownership": "third_party_ownership",
          "tier": "fourth_50_kW_DC_151_to_200",
          "rate": 0.1,
          "rateUnit": "$/W"
        },
        {
          "ownership": "any",
          "tier": "solar_carport_adder",
          "rate": 0.55,
          "rateUnit": "$/W",
          "maxAwardCents": 20000000
        },
        {
          "ownership": "any",
          "tier": "energy_storage_adder_three_hour_power",
          "rate": 0.5,
          "rateUnit": "$/W",
          "maxAwardCents": 4000000
        },
        {
          "ownership": "any",
          "tier": "solar_domestic_hot_water",
          "percent": 25,
          "maxAwardCents": 400000
        }
      ]
    }
  ],
  "input_requirements": [
    {
      "input_key": "ownership_model",
      "label": "ownership model",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_6968bbfaaabe9e9d"
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
      "input_key": "project_dc_watts_by_tier",
      "label": "project DC watts by tier",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_6968bbfaaabe9e9d"
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
      "input_key": "solar_carport_watts",
      "label": "solar carport watts",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_6968bbfaaabe9e9d"
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
      "input_key": "storage_three_hour_continuous_power_watts",
      "label": "storage three-hour continuous power watts",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_6968bbfaaabe9e9d"
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
      "input_key": "eligible_contract_price_for_sdhw_if_applicable",
      "label": "eligible contract price for SDHW if applicable",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_6968bbfaaabe9e9d"
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
      "input_key": "installer_round_cap_status",
      "label": "installer round cap status",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_6968bbfaaabe9e9d"
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
      "input_key": "application_round",
      "label": "application round",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_6968bbfaaabe9e9d"
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
      "input_key": "ownership",
      "label": "ownership",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_6968bbfaaabe9e9d"
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
      "input_key": "project_watts",
      "label": "project watts",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_6968bbfaaabe9e9d"
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
      "input_key": "adder_quantities",
      "label": "adder quantities",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_6968bbfaaabe9e9d"
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
      "input_key": "cap_availability",
      "label": "cap availability",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_6968bbfaaabe9e9d"
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
      "input_key": "storage_total_battery_capacity_wh",
      "label": "Storage Total Battery Capacity Wh",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_6968bbfaaabe9e9d"
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
      "input_key": "storage_inverter_max_continuous_power_watts",
      "label": "Storage Inverter Max Continuous Power Watts",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_6968bbfaaabe9e9d"
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
        "effect_grant_expected_value_1_6968bbfaaabe9e9d"
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
      "input_key": "ref_approval_before_installation",
      "label": "Ref Approval Before Installation",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_6968bbfaaabe9e9d"
      ],
      "source_precedence": [
        "user_profile",
        "program_application",
        "admin_review"
      ],
      "missing_severity": "blocks_calculation"
    }
  ],
  "source_evidence": [
    {
      "evidence_id": "evidence_981329af0da6297b",
      "source_type": "gpt_pro_research_summary",
      "quote": "Commerce RI commercial REF uses solar capacity tiers and capped adders for carports and storage.",
      "source_urls": [
        "https://commerceri.com/renewable-energy-fund/",
        "https://assets.simpleviewinc.com/simpleview/image/upload/v1/clients/rhodeisland/Commercial_RFP_1__0ab2622e-1f9a-44af-b983-3fe495aab483.pdf",
        "https://assets.simpleviewinc.com/simpleview/image/upload/v1/clients/rhodeisland/Commercial_Flyer_778e7b33-c575-431c-9973-44bc372ed4cc.pdf",
        "https://programs.dsireusa.org/system/program/detail/5362/commercial-scale-renewable-energy-grants-commerce-ri"
      ],
      "evidence_confidence": 0.9
    },
    {
      "evidence_id": "grant_probability_repair_e9aba8966133e8cb",
      "source_type": "gpt_pro_grant_probability_repair",
      "quote": "Commerce RI's 2026 commercial REF page/RFP/flyer publish commercial-scale rounds, direct-ownership capacity tiers, a $75,000 base project cap, carport adder/caps, a commercial storage adder of $0.50/W capped at $40,000, and availability/funding constraints.",
      "source_urls": [
        "https://commerceri.com/renewable-energy-fund/",
        "https://assets.simpleviewinc.com/simpleview/image/upload/v1/clients/rhodeisland/Commercial_RFP_1__0ab2622e-1f9a-44af-b983-3fe495aab483.pdf",
        "https://assets.simpleviewinc.com/simpleview/image/upload/v1/clients/rhodeisland/Commercial_Flyer_778e7b33-c575-431c-9973-44bc372ed4cc.pdf",
        "https://assets.simpleviewinc.com/simpleview/image/upload/v1/clients/rhodeisland/REF_Storage_Adder_RFP_FINAL_d448fb12-1769-48fd-a04f-2d9922beff15.pdf",
        "https://programs.dsireusa.org/system/program/detail/5362/commercial-scale-renewable-energy-grants-commerce-ri"
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
  },
  "current_validation_notes": [
    "effect_grant_expected_value_1_6968bbfaaabe9e9d: conditional award status needs_project_scope",
    "effect_grant_expected_value_1_6968bbfaaabe9e9d: probability status not_required_deterministic"
  ]
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
  "opportunityId": "SOURCE_DSIRE:dsire_program_id:5362",
  "programName": "Commercial Scale Renewable Energy Grants (Commerce RI)",
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
