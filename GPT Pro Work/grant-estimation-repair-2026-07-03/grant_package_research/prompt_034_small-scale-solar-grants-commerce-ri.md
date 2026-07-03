You are helping RetroFi finish conservative grant estimation.

Prompt 34 of 37.

Research only official or primary administrator sources when possible. Third-party summaries can be used only to find official sources, not as final support for formula/probability fields.

## Goal

Repair this grant-like v2 incentive package so Codex can calculate the grant value conservatively at runtime, or suppress it with explicit reason codes when no defensible estimate exists.

Do not make every grant estimable. If the source only says "up to", if the award is competitive with no probability evidence, if funding status is unknown, or if project-specific award approval is required, return suppressed or missing-input status.

## Current Package Context

```json
{
  "opportunity_id": "SOURCE_DSIRE:dsire_program_id:5361",
  "program_name": "Small Scale Solar Grants (Commerce RI)",
  "calculation_status": "calculable_with_missing_inputs",
  "availability": {
    "status": "active",
    "source_access_status": "accessible_or_researched"
  },
  "retrofit_types": [
    "battery_storage_system",
    "rooftop_solar_pv",
    "solar_water_heating_system"
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
      "effect_id": "effect_grant_expected_value_1_4b087fae3c03d391",
      "label": "Small-scale REF grant is $1.65 per watt for eligible small-scale solar PV or solar domestic hot water projects, with systems above 8.8 kW receiving the maximum grant of $14,500 per project.",
      "effect_type": "grant_expected_value",
      "cash_flow_direction": "benefit",
      "timing": {
        "cadence": "one_time",
        "source_timing": "post_installation_reimbursement",
        "approval_required_before_purchase": true,
        "approval_required_before_installation": true,
        "application_deadline": "2026 small-scale rounds listed for May 1, July 17/31, and October 16/23 depending on round documents.",
        "funding_status": "open_while_funds_last"
      },
      "calculation": {
        "method": "zero_when_not_applicable",
        "reason": "hybrid_rate_plus_cap is not included in automated totals without additional estimator support.",
        "source_effect_id": "SOURCE_DSIRE:dsire_program_id:5361:0:effect_grant_expected_value_1_4b087fae3c03d391",
        "grant_value_model_kind": "hybrid_rate_plus_cap",
        "cash_value_classification": "cash_grant",
        "conditional_award": {
          "status": "needs_project_scope",
          "formula_text": "For 2026 small-scale direct-ownership solar PV, REF grant equals 165 cents per rated DC watt up to 8.8 kW; systems above 8.8 kW receive the 1,450,000-cent per-project maximum. The 2026 RFP separately states SDHW grants equal 25% of total contract price capped at 400,000 cents per housing or small business unit. Applications are subject to REF approval, round timing, and available funds.",
          "conditional_award_cents": null,
          "min_award_cents": null,
          "max_award_cents": 1450000,
          "cost_share_percent": null,
          "required_project_inputs": [
            "eligible_renewable_measure_type",
            "approved_system_dc_watts_for_pv",
            "eligible_contract_price_cents_for_sdhw_if_applicable",
            "net_metered_direct_ownership_confirmation",
            "rhode_island_project_and_property_ownership",
            "ref_approval_before_installation",
            "application_round_and_fund_availability"
          ],
          "calculation_trace": [
            "PV: approved_system_watts × 165 cents, capped at 1,450,000 cents per project.",
            "SDHW: eligible contract price × 0.25, capped at 400,000 cents per unit.",
            "Blocks close on the application close date or when available funds are reached."
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
          "probability_notes": "The REF small-scale award formula is deterministic after application approval and fund reservation. Program blocks are first-come/subject to available funds, so live funding status or an award letter is required before user-facing inclusion."
        },
        "expected_value_recommendation": {
          "estimate_status": "needs_funding_check",
          "expected_value_cents": null,
          "estimate_confidence": "medium",
          "include_in_user_facing_total_default": false,
          "reason_codes": [
            "deterministic_formula_requires_ref_approval",
            "first_come_funding_availability",
            "project_type_inputs_missing"
          ]
        },
        "fallback_prior_suggestion": {
          "probability_discount": null,
          "basis": "No fallback probability prior should be used. Use the fixed formula only after REF round/funding status and pre-installation approval are confirmed.",
          "should_retro_fi_use_without_human_approval": false
        }
      },
      "caps": [
        {
          "cap_type": "maximum_amount",
          "amount": {
            "value": 14500,
            "currency": "USD"
          },
          "applies_to": "effect"
        }
      ],
      "required_inputs": [
        {
          "input_key": "approved_system_watts",
          "label": "approved system watts",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_4b087fae3c03d391"
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
          "input_key": "eligible_renewable_measure_type",
          "label": "eligible renewable measure type",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_4b087fae3c03d391"
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
          "input_key": "net_metered_direct_ownership_confirmation",
          "label": "net metered direct ownership confirmation",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_4b087fae3c03d391"
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
          "input_key": "ref_round_approval_before_installation",
          "label": "ref round approval before installation",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_4b087fae3c03d391"
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
          "input_key": "approved_system_dc_watts_for_pv",
          "label": "Approved System Dc Watts For Pv",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_4b087fae3c03d391"
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
          "input_key": "eligible_contract_price_cents_for_sdhw_if_applicable",
          "label": "Eligible Contract Price Cents For Sdhw If Applicable",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_1_4b087fae3c03d391"
          ],
          "source_precedence": [
            "quote",
            "user_profile",
            "retrofit_assumptions"
          ],
          "missing_severity": "blocks_calculation"
        },
        {
          "input_key": "rhode_island_project_and_property_ownership",
          "label": "Rhode Island Project And Property Ownership",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_4b087fae3c03d391"
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
            "effect_grant_expected_value_1_4b087fae3c03d391"
          ],
          "source_precedence": [
            "user_profile",
            "program_application",
            "admin_review"
          ],
          "missing_severity": "blocks_calculation"
        },
        {
          "input_key": "application_round_and_fund_availability",
          "label": "Application Round And Fund Availability",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_4b087fae3c03d391"
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
        "evidence_dcdade6a07275a8e",
        "grant_probability_repair_0aff298d9f8bad4a"
      ],
      "confidence": {
        "overall": 0.72,
        "calculation": 0.72,
        "extraction": 0.9,
        "reason_codes": [
          "repair_status_calculation_package_found",
          "calculation_status_calculable_with_missing_inputs",
          "source_confidence_high",
          "estimate_confidence_high",
          "value_model_hybrid_rate_plus_cap",
          "grant_probability_repair_applied",
          "estimate_confidence_medium",
          "estimate_status_needs_funding_check"
        ]
      }
    },
    {
      "effect_id": "effect_grant_expected_value_2_5d165cb2af3b1006",
      "label": "An eligible storage adder provides $5,000 for qualifying battery storage when paired with a concurrently awarded REF-funded renewable project.",
      "effect_type": "grant_expected_value",
      "cash_flow_direction": "benefit",
      "timing": {
        "cadence": "one_time",
        "source_timing": "post_installation_reimbursement",
        "approval_required_before_purchase": true,
        "approval_required_before_installation": true,
        "application_deadline": "2026 small-scale rounds listed for May 1, July 17/31, and October 16/23 depending on round documents.",
        "funding_status": "open_while_funds_last"
      },
      "calculation": {
        "method": "fixed_amount",
        "amount": {
          "value": 5000,
          "currency": "USD"
        },
        "grant_value_model_kind": "fixed_amount",
        "cash_value_classification": "cash_grant",
        "conditional_award": {
          "status": "calculable",
          "formula_text": "For an eligible energy storage component paired with a renewable energy component concurrently awarded REF Small-Scale funding, the storage adder is fixed at 500,000 cents per project, subject to storage eligibility, REF review/approval, and funding availability.",
          "conditional_award_cents": 500000,
          "min_award_cents": 500000,
          "max_award_cents": 500000,
          "cost_share_percent": null,
          "required_project_inputs": [
            "qualifying_concurrent_ref_small_scale_renewable_project_award",
            "battery_storage_integration",
            "energy_storage_eligibility",
            "connected_solutions_enrollment_or_opt_out",
            "storage_adder_approval",
            "funding_availability"
          ],
          "calculation_trace": [
            "Fixed small-scale storage adder = 500,000 cents.",
            "Requires concurrent REF Small-Scale renewable award and storage approval.",
            "Funding is first-come and subject to availability."
          ]
        },
        "probability_model": {
          "status": "not_required_deterministic",
          "probability_discount": null,
          "probability_evidence_type": "not_required",
          "historical_awards_count": null,
          "historical_applications_count": null,
          "total_program_budget_cents": 150000000,
          "expected_award_count": null,
          "competition_scope": "statewide_broad",
          "probability_notes": "The amount is fixed after approval. The storage adder is supported by limited first-come funds and all awards are subject to availability, so do not include it before confirming concurrent REF award and storage approval."
        },
        "expected_value_recommendation": {
          "estimate_status": "needs_funding_check",
          "expected_value_cents": null,
          "estimate_confidence": "medium",
          "include_in_user_facing_total_default": false,
          "reason_codes": [
            "fixed_amount_but_requires_concurrent_ref_award",
            "storage_adder_approval_required",
            "first_come_funding_availability"
          ]
        },
        "fallback_prior_suggestion": {
          "probability_discount": null,
          "basis": "No fallback probability prior needed for the fixed adder; use only after approval and funding confirmation.",
          "should_retro_fi_use_without_human_approval": false
        }
      },
      "required_inputs": [
        {
          "input_key": "qualifying_ref_funded_renewable_project",
          "label": "qualifying ref funded renewable project",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_2_5d165cb2af3b1006"
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
          "input_key": "battery_storage_integration",
          "label": "battery storage integration",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_2_5d165cb2af3b1006"
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
          "input_key": "storage_adder_approval",
          "label": "storage adder approval",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_2_5d165cb2af3b1006"
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
          "input_key": "qualifying_concurrent_ref_small_scale_renewable_project_award",
          "label": "Qualifying Concurrent Ref Small Scale Renewable Project Award",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_2_5d165cb2af3b1006"
          ],
          "source_precedence": [
            "quote",
            "user_profile",
            "retrofit_assumptions"
          ],
          "missing_severity": "blocks_calculation"
        },
        {
          "input_key": "energy_storage_eligibility",
          "label": "Energy Storage Eligibility",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_2_5d165cb2af3b1006"
          ],
          "source_precedence": [
            "user_profile",
            "program_application",
            "admin_review"
          ],
          "missing_severity": "blocks_calculation"
        },
        {
          "input_key": "connected_solutions_enrollment_or_opt_out",
          "label": "Connected Solutions Enrollment Or Opt Out",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_2_5d165cb2af3b1006"
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
            "effect_grant_expected_value_2_5d165cb2af3b1006"
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
        "evidence_dcdade6a07275a8e",
        "grant_probability_repair_65bfed25026cfed4"
      ],
      "confidence": {
        "overall": 0.72,
        "calculation": 0.72,
        "extraction": 0.9,
        "reason_codes": [
          "repair_status_calculation_package_found",
          "calculation_status_calculable_with_missing_inputs",
          "source_confidence_high",
          "estimate_confidence_high",
          "value_model_fixed_amount",
          "grant_probability_repair_applied",
          "estimate_confidence_medium",
          "estimate_status_needs_funding_check"
        ]
      }
    }
  ],
  "input_requirements": [
    {
      "input_key": "approved_system_watts",
      "label": "approved system watts",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_4b087fae3c03d391"
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
      "input_key": "eligible_renewable_measure_type",
      "label": "eligible renewable measure type",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_4b087fae3c03d391"
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
      "input_key": "net_metered_direct_ownership_confirmation",
      "label": "net metered direct ownership confirmation",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_4b087fae3c03d391"
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
      "input_key": "ref_round_approval_before_installation",
      "label": "ref round approval before installation",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_4b087fae3c03d391"
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
      "input_key": "qualifying_ref_funded_renewable_project",
      "label": "qualifying ref funded renewable project",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_2_5d165cb2af3b1006"
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
      "input_key": "battery_storage_integration",
      "label": "battery storage integration",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_2_5d165cb2af3b1006"
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
      "input_key": "storage_adder_approval",
      "label": "storage adder approval",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_2_5d165cb2af3b1006"
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
      "input_key": "approved_system_dc_watts_for_pv",
      "label": "Approved System Dc Watts For Pv",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_4b087fae3c03d391"
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
      "input_key": "eligible_contract_price_cents_for_sdhw_if_applicable",
      "label": "Eligible Contract Price Cents For Sdhw If Applicable",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_1_4b087fae3c03d391"
      ],
      "source_precedence": [
        "quote",
        "user_profile",
        "retrofit_assumptions"
      ],
      "missing_severity": "blocks_calculation"
    },
    {
      "input_key": "rhode_island_project_and_property_ownership",
      "label": "Rhode Island Project And Property Ownership",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_4b087fae3c03d391"
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
        "effect_grant_expected_value_1_4b087fae3c03d391"
      ],
      "source_precedence": [
        "user_profile",
        "program_application",
        "admin_review"
      ],
      "missing_severity": "blocks_calculation"
    },
    {
      "input_key": "application_round_and_fund_availability",
      "label": "Application Round And Fund Availability",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_4b087fae3c03d391"
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
      "input_key": "qualifying_concurrent_ref_small_scale_renewable_project_award",
      "label": "Qualifying Concurrent Ref Small Scale Renewable Project Award",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_2_5d165cb2af3b1006"
      ],
      "source_precedence": [
        "quote",
        "user_profile",
        "retrofit_assumptions"
      ],
      "missing_severity": "blocks_calculation"
    },
    {
      "input_key": "energy_storage_eligibility",
      "label": "Energy Storage Eligibility",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_2_5d165cb2af3b1006"
      ],
      "source_precedence": [
        "user_profile",
        "program_application",
        "admin_review"
      ],
      "missing_severity": "blocks_calculation"
    },
    {
      "input_key": "connected_solutions_enrollment_or_opt_out",
      "label": "Connected Solutions Enrollment Or Opt Out",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_2_5d165cb2af3b1006"
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
        "effect_grant_expected_value_2_5d165cb2af3b1006"
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
      "evidence_id": "evidence_dcdade6a07275a8e",
      "source_type": "gpt_pro_research_summary",
      "quote": "Commerce RI publishes small-scale REF grant rates for solar PV, solar hot water, and a paired storage adder.",
      "source_urls": [
        "https://commerceri.com/renewable-energy-fund/",
        "https://assets.simpleviewinc.com/simpleview/image/upload/v1/clients/rhodeisland/Small_Scale_RFP_c9b2126b-7a3b-47db-941a-9f576e78237c.pdf",
        "https://assets.simpleviewinc.com/simpleview/image/upload/v1/clients/rhodeisland/Small_Scale_Flyer_38730e17-9e3b-4e0f-b749-f9b8352c70bc.pdf",
        "https://assets.simpleviewinc.com/simpleview/image/upload/v1/clients/rhodeisland/REF_Storage_Adder_RFP_FINAL_d448fb12-1769-48fd-a04f-2d9922beff15.pdf"
      ],
      "evidence_confidence": 0.9
    },
    {
      "evidence_id": "grant_probability_repair_0aff298d9f8bad4a",
      "source_type": "gpt_pro_grant_probability_repair",
      "quote": "Commerce RI's 2026 small-scale REF RFP/flyer list $1.65/W for direct-ownership solar PV up to 8.8 kW, a $14,500 per-project maximum, and a $375,000 per-application cap; the RFP also lists SDHW at 25% of contract price capped at $4,000 per unit.",
      "source_urls": [
        "https://commerceri.com/renewable-energy-fund/",
        "https://assets.simpleviewinc.com/simpleview/image/upload/v1/clients/rhodeisland/Small_Scale_RFP_c9b2126b-7a3b-47db-941a-9f576e78237c.pdf",
        "https://assets.simpleviewinc.com/simpleview/image/upload/v1/clients/rhodeisland/Small_Scale_Flyer_38730e17-9e3b-4e0f-b749-f9b8352c70bc.pdf"
      ],
      "evidence_confidence": 0.9
    },
    {
      "evidence_id": "grant_probability_repair_65bfed25026cfed4",
      "source_type": "gpt_pro_grant_probability_repair",
      "quote": "Commerce RI's small-scale flyer and storage-adder RFP state that REF awards a flat $5,000 storage adder for an eligible storage component paired with a renewable energy component concurrently awarded REF Small-Scale funding. The storage-adder RFP states funding is first-come, first-served and contingent on availability.",
      "source_urls": [
        "https://commerceri.com/renewable-energy-fund/",
        "https://assets.simpleviewinc.com/simpleview/image/upload/v1/clients/rhodeisland/Small_Scale_Flyer_38730e17-9e3b-4e0f-b749-f9b8352c70bc.pdf",
        "https://assets.simpleviewinc.com/simpleview/image/upload/v1/clients/rhodeisland/REF_Storage_Adder_RFP_FINAL_d448fb12-1769-48fd-a04f-2d9922beff15.pdf"
      ],
      "evidence_confidence": 0.9
    }
  ],
  "confidence": {
    "overall": 0.9,
    "source_access": 0.9,
    "availability": 0.9,
    "calculation": 0.9,
    "extraction": 0.9,
    "reason_codes": [
      "repair_status_calculation_package_found",
      "calculation_status_calculable_with_missing_inputs",
      "source_confidence_high",
      "estimate_confidence_high"
    ]
  },
  "current_validation_notes": [
    "effect_grant_expected_value_1_4b087fae3c03d391: currently suppressed because method is unsupported or not applicable",
    "effect_grant_expected_value_1_4b087fae3c03d391: conditional award status needs_project_scope",
    "effect_grant_expected_value_1_4b087fae3c03d391: probability status not_required_deterministic",
    "effect_grant_expected_value_2_5d165cb2af3b1006: conditional award status calculable",
    "effect_grant_expected_value_2_5d165cb2af3b1006: probability status not_required_deterministic"
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
  "opportunityId": "SOURCE_DSIRE:dsire_program_id:5361",
  "programName": "Small Scale Solar Grants (Commerce RI)",
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
