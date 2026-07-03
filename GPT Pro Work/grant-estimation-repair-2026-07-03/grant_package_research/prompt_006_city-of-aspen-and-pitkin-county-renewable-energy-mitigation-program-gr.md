You are helping RetroFi finish conservative grant estimation.

Prompt 6 of 37.

Research only official or primary administrator sources when possible. Third-party summaries can be used only to find official sources, not as final support for formula/probability fields.

## Goal

Repair this grant-like v2 incentive package so Codex can calculate the grant value conservatively at runtime, or suppress it with explicit reason codes when no defensible estimate exists.

Do not make every grant estimable. If the source only says "up to", if the award is competitive with no probability evidence, if funding status is unknown, or if project-specific award approval is required, return suppressed or missing-input status.

## Current Package Context

```json
{
  "opportunity_id": "SOURCE_DSIRE:dsire_program_id:5558",
  "program_name": "City of Aspen and Pitkin County - Renewable Energy Mitigation Program Grants",
  "calculation_status": "calculable_with_missing_inputs",
  "availability": {
    "status": "active",
    "source_access_status": "accessible_or_researched"
  },
  "retrofit_types": [
    "high_efficiency_hvac_replacement"
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
      "effect_id": "effect_grant_expected_value_2_a28bd747b9260955",
      "label": "CORE implementation grants for larger, long-term, impactful existing-building projects may provide up to $200,000 when rebates are insufficient. Grant award depends on greenhouse-gas impact analysis, application review, and available funds.",
      "effect_type": "grant_expected_value",
      "cash_flow_direction": "benefit",
      "timing": {
        "cadence": "custom",
        "source_timing": "application_process",
        "approval_required_before_purchase": true,
        "approval_required_before_installation": true,
        "application_deadline": null,
        "funding_status": "open_while_funds_last"
      },
      "calculation": {
        "method": "expected_value",
        "probability_discount": null,
        "conditional_award_cents": null,
        "max_award_cents": 20000000,
        "grant_value_model_kind": "competitive_max_only",
        "cash_value_classification": "cash_grant",
        "conditional_award": {
          "status": "needs_project_scope",
          "formula_text": "CORE implementation grants for commercial and multifamily applicants may provide up to $200,000 for larger, long-term, impactful existing-building projects when rebates are insufficient; award requires application review, greenhouse-gas impact analysis, and available funds.",
          "conditional_award_cents": null,
          "min_award_cents": null,
          "max_award_cents": 20000000,
          "cost_share_percent": null,
          "required_project_inputs": [
            "property_type",
            "county_or_service_geography",
            "eligible_project_cost_cents",
            "measure_type",
            "greenhouse_gas_impact_analysis",
            "rebate_insufficiency_rationale",
            "core_grant_application",
            "grant_request"
          ],
          "calculation_trace": [
            "CORE publishes grant availability for commercial and multifamily applicants.",
            "CORE says grants can reach up to $200,000.",
            "CORE states grants are for larger, long-term, impactful projects and require a greenhouse-gas impact analysis; award depends on application review and funding availability."
          ]
        },
        "probability_model": {
          "status": "evidence_not_found",
          "probability_discount": null,
          "probability_evidence_type": "eligibility_only",
          "historical_awards_count": null,
          "historical_applications_count": null,
          "total_program_budget_cents": null,
          "expected_award_count": null,
          "competition_scope": "narrow_local",
          "probability_notes": "Official sources provide eligibility, review criteria, and the $200,000 maximum, but no historical application count, success rate, expected award count, or other probability anchor was found."
        },
        "expected_value_recommendation": {
          "estimate_status": "suppressed",
          "expected_value_cents": null,
          "estimate_confidence": "low",
          "include_in_user_facing_total_default": false,
          "reason_codes": [
            "competitive_max_only",
            "no_probability_evidence",
            "award_depends_on_review",
            "available_funds_dependency"
          ]
        },
        "fallback_prior_suggestion": {
          "probability_discount": null,
          "basis": "A low prior could be human-reviewed for a narrow local competitive grant, but the official materials reviewed do not support an automated probability discount.",
          "should_retro_fi_use_without_human_approval": false
        },
        "min_award_cents": null
      },
      "caps": [
        {
          "cap_type": "maximum_amount",
          "amount": {
            "value": 200000,
            "currency": "USD"
          },
          "applies_to": "effect"
        }
      ],
      "required_inputs": [
        {
          "input_key": "eligible_project_cost",
          "label": "eligible project cost",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_2_a28bd747b9260955"
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
          "input_key": "greenhouse_gas_impact_analysis",
          "label": "greenhouse-gas impact analysis",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_2_a28bd747b9260955"
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
          "input_key": "core_grant_application",
          "label": "CORE grant application",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_2_a28bd747b9260955"
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
          "input_key": "rebate_insufficiency_rationale",
          "label": "rebate insufficiency rationale",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_2_a28bd747b9260955"
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
          "input_key": "award_decision",
          "label": "award decision",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_2_a28bd747b9260955"
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
          "input_key": "grant_request",
          "label": "grant request",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_2_a28bd747b9260955"
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
          "input_key": "ghg_impact_analysis",
          "label": "GHG impact analysis",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_2_a28bd747b9260955"
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
          "input_key": "award_probability",
          "label": "award probability",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_2_a28bd747b9260955"
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
          "input_key": "property_type",
          "label": "Property Type",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_2_a28bd747b9260955"
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
          "input_key": "county_or_service_geography",
          "label": "County Or Service Geography",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_2_a28bd747b9260955"
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
          "input_key": "eligible_project_cost_cents",
          "label": "Eligible Project Cost",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_2_a28bd747b9260955"
          ],
          "source_precedence": [
            "quote",
            "user_profile",
            "retrofit_assumptions"
          ],
          "missing_severity": "blocks_calculation"
        },
        {
          "input_key": "measure_type",
          "label": "Measure Type",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_2_a28bd747b9260955"
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
        "evidence_9b09b26d9683ee6c",
        "grant_probability_repair_536b236e6921f87b"
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
          "value_model_competitive_max_only",
          "grant_probability_repair_applied",
          "estimate_confidence_low",
          "estimate_status_suppressed"
        ]
      }
    }
  ],
  "related_non_grant_effects": [
    {
      "effect_id": "effect_one_time_savings_1_22733c30bc9dd9f9",
      "label": "Commercial and multifamily rebates generally cover 50% of eligible project cost, capped at $25,000 for standard participants or $50,000 for Community Priority Participants, for qualifying existing-building efficiency and electrification measures.",
      "effect_type": "one_time_savings",
      "cash_flow_direction": "benefit",
      "timing": {
        "cadence": "one_time",
        "source_timing": "post_installation_reimbursement",
        "approval_required_before_purchase": true,
        "approval_required_before_installation": true,
        "application_deadline": null,
        "funding_status": "open_while_funds_last"
      },
      "calculation": {
        "method": "percent_of_cost",
        "percent": 0.5,
        "cost_input": "eligible_project_cost_cents",
        "grant_value_model_kind": "capped_percent_of_eligible_cost",
        "cash_value_classification": "rebate",
        "conditional_award": {
          "status": "needs_project_cost",
          "formula_text": "For qualifying commercial or multifamily efficiency and electrification measures, CORE generally rebates 50% of eligible project cost, capped at $25,000 for standard participants and $50,000 for Community Priority Participants.",
          "conditional_award_cents": null,
          "min_award_cents": null,
          "max_award_cents": 5000000,
          "cost_share_percent": 0.5,
          "required_project_inputs": [
            "eligible_project_cost_cents",
            "property_type",
            "county_or_service_geography",
            "participant_priority_category",
            "measure_type",
            "core_preapproval_requirements",
            "measure_eligibility"
          ],
          "calculation_trace": [
            "Determine whether applicant is standard or Community Priority Participant.",
            "Calculate 50% of eligible project cost.",
            "Apply the relevant cap: $25,000 standard or $50,000 Community Priority Participant."
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
          "competition_scope": "narrow_local",
          "probability_notes": "This is a deterministic rebate after eligibility and preapproval, not a competitive grant expected-value estimate."
        },
        "expected_value_recommendation": {
          "estimate_status": "needs_quote",
          "expected_value_cents": null,
          "estimate_confidence": "high",
          "include_in_user_facing_total_default": false,
          "reason_codes": [
            "deterministic_rebate_not_competitive",
            "missing_project_cost",
            "missing_participant_priority_category",
            "preapproval_required"
          ]
        },
        "fallback_prior_suggestion": {
          "probability_discount": null,
          "basis": "Not needed because the rebate amount is formula-based once project eligibility, participant tier, and project cost are known.",
          "should_retro_fi_use_without_human_approval": false
        }
      },
      "caps": [
        {
          "cap_type": "maximum_amount",
          "amount": {
            "value": 25000,
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
          "input_key": "property_type",
          "label": "property type",
          "value_type": "text",
          "required_for": [
            "effect_one_time_savings_1_22733c30bc9dd9f9"
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
          "input_key": "county_or_service_geography",
          "label": "county or service geography",
          "value_type": "number",
          "required_for": [
            "effect_one_time_savings_1_22733c30bc9dd9f9"
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
            "effect_one_time_savings_1_22733c30bc9dd9f9"
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
          "input_key": "participant_priority_category",
          "label": "participant priority category",
          "value_type": "text",
          "required_for": [
            "effect_one_time_savings_1_22733c30bc9dd9f9"
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
            "effect_one_time_savings_1_22733c30bc9dd9f9"
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
          "input_key": "core_preapproval_requirements",
          "label": "CORE preapproval requirements",
          "value_type": "text",
          "required_for": [
            "effect_one_time_savings_1_22733c30bc9dd9f9"
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
          "input_key": "measure_eligibility",
          "label": "measure eligibility",
          "value_type": "text",
          "required_for": [
            "effect_one_time_savings_1_22733c30bc9dd9f9"
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
          "input_key": "eligible_project_cost_cents",
          "label": "Eligible Project Cost",
          "value_type": "number",
          "required_for": [
            "effect_one_time_savings_1_22733c30bc9dd9f9"
          ],
          "source_precedence": [
            "quote",
            "user_profile",
            "retrofit_assumptions"
          ],
          "missing_severity": "blocks_calculation"
        }
      ],
      "evidence_refs": [
        "evidence_9b09b26d9683ee6c",
        "grant_probability_repair_1695719b1b39f171"
      ],
      "confidence": {
        "overall": 0.9,
        "calculation": 0.9,
        "extraction": 0.9,
        "reason_codes": [
          "repair_status_calculation_package_found",
          "calculation_status_calculable_with_missing_inputs",
          "source_confidence_high",
          "estimate_confidence_medium",
          "value_model_capped_percent_of_eligible_cost",
          "grant_probability_repair_applied",
          "estimate_confidence_high",
          "estimate_status_needs_quote"
        ]
      }
    }
  ],
  "input_requirements": [
    {
      "input_key": "property_type",
      "label": "property type",
      "value_type": "text",
      "required_for": [
        "effect_one_time_savings_1_22733c30bc9dd9f9",
        "effect_grant_expected_value_2_a28bd747b9260955"
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
      "input_key": "county_or_service_geography",
      "label": "county or service geography",
      "value_type": "number",
      "required_for": [
        "effect_one_time_savings_1_22733c30bc9dd9f9",
        "effect_grant_expected_value_2_a28bd747b9260955"
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
        "effect_one_time_savings_1_22733c30bc9dd9f9",
        "effect_grant_expected_value_2_a28bd747b9260955"
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
      "input_key": "participant_priority_category",
      "label": "participant priority category",
      "value_type": "text",
      "required_for": [
        "effect_one_time_savings_1_22733c30bc9dd9f9"
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
        "effect_one_time_savings_1_22733c30bc9dd9f9",
        "effect_grant_expected_value_2_a28bd747b9260955"
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
      "input_key": "core_preapproval_requirements",
      "label": "CORE preapproval requirements",
      "value_type": "text",
      "required_for": [
        "effect_one_time_savings_1_22733c30bc9dd9f9"
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
      "input_key": "measure_eligibility",
      "label": "measure eligibility",
      "value_type": "text",
      "required_for": [
        "effect_one_time_savings_1_22733c30bc9dd9f9"
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
      "input_key": "greenhouse_gas_impact_analysis",
      "label": "greenhouse-gas impact analysis",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_2_a28bd747b9260955"
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
      "input_key": "core_grant_application",
      "label": "CORE grant application",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_2_a28bd747b9260955"
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
      "input_key": "rebate_insufficiency_rationale",
      "label": "rebate insufficiency rationale",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_2_a28bd747b9260955"
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
      "input_key": "award_decision",
      "label": "award decision",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_2_a28bd747b9260955"
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
      "input_key": "grant_request",
      "label": "grant request",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_2_a28bd747b9260955"
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
      "input_key": "ghg_impact_analysis",
      "label": "GHG impact analysis",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_2_a28bd747b9260955"
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
      "input_key": "award_probability",
      "label": "award probability",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_2_a28bd747b9260955"
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
      "input_key": "eligible_project_cost_cents",
      "label": "Eligible Project Cost",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_2_a28bd747b9260955",
        "effect_one_time_savings_1_22733c30bc9dd9f9"
      ],
      "source_precedence": [
        "quote",
        "user_profile",
        "retrofit_assumptions"
      ],
      "missing_severity": "blocks_calculation"
    }
  ],
  "source_evidence": [
    {
      "evidence_id": "evidence_9b09b26d9683ee6c",
      "source_type": "gpt_pro_research_summary",
      "quote": "CORE publishes rebate caps and grant maximums for qualifying efficiency and electrification projects.",
      "source_urls": [
        "https://www.aspencore.org/grants-and-funding-programs",
        "https://www.aspencore.org/funding-criteria",
        "https://www.aspencore.org/commercial-multifamily-funding",
        "https://www.aspencore.org/residential-rebates-updated"
      ],
      "evidence_confidence": 0.9
    },
    {
      "evidence_id": "grant_probability_repair_536b236e6921f87b",
      "source_type": "gpt_pro_grant_probability_repair",
      "quote": "CORE's commercial and multifamily funding page says implementation grants can provide up to $200,000 for larger, long-term, impactful projects when rebates are insufficient, with grant review tied to greenhouse-gas impact and available funds. ([AspenCore][2])",
      "source_urls": [
        "https://www.aspencore.org/grants-and-funding-programs",
        "https://www.aspencore.org/funding-criteria",
        "https://www.aspencore.org/commercial-multifamily-funding",
        "https://www.aspencore.org/residential-rebates-updated"
      ],
      "evidence_confidence": 0.9
    },
    {
      "evidence_id": "grant_probability_repair_1695719b1b39f171",
      "source_type": "gpt_pro_grant_probability_repair",
      "quote": "CORE states that commercial and multifamily rebates cover 50% of project cost up to $25,000, or 50% up to $50,000 for Community Priority Participants; CORE also describes rebates as first-come, first-served and subject to program changes. ([AspenCore][2])",
      "source_urls": [
        "https://www.aspencore.org/commercial-multifamily-funding",
        "https://www.aspencore.org/funding-criteria",
        "https://www.aspencore.org/grants-and-funding-programs"
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
    "effect_grant_expected_value_2_a28bd747b9260955: missing probability_discount",
    "effect_grant_expected_value_2_a28bd747b9260955: missing conditional_award_cents",
    "effect_grant_expected_value_2_a28bd747b9260955: conditional award status needs_project_scope",
    "effect_grant_expected_value_2_a28bd747b9260955: probability status evidence_not_found"
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
  "opportunityId": "SOURCE_DSIRE:dsire_program_id:5558",
  "programName": "City of Aspen and Pitkin County - Renewable Energy Mitigation Program Grants",
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
