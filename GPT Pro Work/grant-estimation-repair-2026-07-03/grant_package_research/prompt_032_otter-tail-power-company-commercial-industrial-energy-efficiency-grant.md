You are helping RetroFi finish conservative grant estimation.

Prompt 32 of 37.

Research only official or primary administrator sources when possible. Third-party summaries can be used only to find official sources, not as final support for formula/probability fields.

## Goal

Repair this grant-like v2 incentive package so Codex can calculate the grant value conservatively at runtime, or suppress it with explicit reason codes when no defensible estimate exists.

Do not make every grant estimable. If the source only says "up to", if the award is competitive with no probability evidence, if funding status is unknown, or if project-specific award approval is required, return suppressed or missing-input status.

## Current Package Context

```json
{
  "opportunity_id": "SOURCE_DSIRE:dsire_program_id:1528",
  "program_name": "Otter Tail Power Company - Commercial & Industrial Energy Efficiency Grant Program",
  "calculation_status": "custom_quote_estimate",
  "availability": {
    "status": "active",
    "source_access_status": "accessible_or_researched"
  },
  "retrofit_types": [
    "waste_heat_recovery"
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
      "effect_id": "effect_one_time_savings_1_5eb511fe0f127e08",
      "label": "Custom grant amount is determined by Otter Tail Power from a preapproved custom energy-savings proposal based on kilowatt-hours saved, kilowatts of demand reduced, and project costs. Grant amounts will not exceed 75% of project costs or 90% of incremental costs; other caps may apply.",
      "effect_type": "one_time_savings",
      "cash_flow_direction": "benefit",
      "timing": {
        "cadence": "one_time",
        "source_timing": "post_installation_reimbursement",
        "approval_required_before_purchase": true,
        "approval_required_before_installation": true,
        "application_deadline": null,
        "funding_status": "unknown"
      },
      "calculation": {
        "method": "custom_quote",
        "reason": "Project-specific quote or program review required.",
        "grant_value_model_kind": "hybrid_rate_plus_cap",
        "cash_value_classification": "rebate",
        "conditional_award": {
          "status": "needs_quote",
          "formula_text": "Otter Tail Power may provide custom business grants after a preapproved custom energy-savings proposal. The grant amount is calculated from estimated kWh savings, kW demand reduction, and project costs, and will not exceed 75% of total project cost or 90% of incremental cost.",
          "conditional_award_cents": null,
          "min_award_cents": null,
          "max_award_cents": null,
          "cost_share_percent": null,
          "required_project_inputs": [
            "custom_energy_savings_proposal",
            "estimated_annual_kwh_saved",
            "estimated_kw_demand_reduction",
            "project_cost",
            "incremental_cost",
            "preapproval",
            "approved_grant_amount"
          ],
          "calculation_trace": [
            "Official Otter Tail page states custom grants require preapproval based on a custom energy-savings proposal.",
            "Official page states grant amounts are calculated based on kWh saved, kW demand reduced, and project costs.",
            "Official page caps grant at 75% of project cost and 90% of incremental cost.",
            "No public fixed rate per kWh or kW was found; approved amount requires utility review."
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
          "probability_notes": "This is a utility custom incentive subject to preapproval and project-specific engineering review, not a competitive grant probability model."
        },
        "expected_value_recommendation": {
          "estimate_status": "needs_quote",
          "expected_value_cents": null,
          "estimate_confidence": "medium",
          "include_in_user_facing_total_default": false,
          "reason_codes": [
            "custom_quote_required",
            "deterministic_after_preapproval",
            "no_public_rate_table",
            "utility_review_required"
          ]
        },
        "fallback_prior_suggestion": {
          "probability_discount": null,
          "basis": "No probability prior needed; obtain a utility-approved custom grant amount instead.",
          "should_retro_fi_use_without_human_approval": false
        }
      },
      "caps": [
        {
          "cap_type": "maximum_percent_of_cost",
          "percent": 0.75,
          "applies_to": "effect"
        }
      ],
      "required_inputs": [
        {
          "input_key": "custom_energy_savings_proposal",
          "label": "custom energy-savings proposal",
          "value_type": "text",
          "required_for": [
            "effect_one_time_savings_1_5eb511fe0f127e08"
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
          "input_key": "estimated_annual_kwh_saved",
          "label": "estimated annual kWh saved",
          "value_type": "number",
          "required_for": [
            "effect_one_time_savings_1_5eb511fe0f127e08"
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
          "input_key": "estimated_kw_demand_reduction",
          "label": "estimated kW demand reduction",
          "value_type": "number",
          "required_for": [
            "effect_one_time_savings_1_5eb511fe0f127e08"
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
          "input_key": "project_cost",
          "label": "project cost",
          "value_type": "number",
          "required_for": [
            "effect_one_time_savings_1_5eb511fe0f127e08"
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
          "input_key": "incremental_cost",
          "label": "incremental cost",
          "value_type": "number",
          "required_for": [
            "effect_one_time_savings_1_5eb511fe0f127e08"
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
          "input_key": "preapproval",
          "label": "preapproval",
          "value_type": "text",
          "required_for": [
            "effect_one_time_savings_1_5eb511fe0f127e08"
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
          "input_key": "measurement_and_verification_if_required",
          "label": "measurement and verification if required",
          "value_type": "text",
          "required_for": [
            "effect_one_time_savings_1_5eb511fe0f127e08"
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
          "input_key": "approved_grant_amount",
          "label": "approved grant amount",
          "value_type": "number",
          "required_for": [
            "effect_one_time_savings_1_5eb511fe0f127e08"
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
          "input_key": "project_specific_kwh_savings",
          "label": "project-specific kWh savings",
          "value_type": "number",
          "required_for": [
            "effect_one_time_savings_1_5eb511fe0f127e08"
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
          "input_key": "project_specific_kw_reduction",
          "label": "project-specific kW reduction",
          "value_type": "number",
          "required_for": [
            "effect_one_time_savings_1_5eb511fe0f127e08"
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
        "evidence_9b8a59f46547323b",
        "grant_probability_repair_3f5898b0434c6010"
      ],
      "confidence": {
        "overall": 0.72,
        "calculation": 0.72,
        "extraction": 0.9,
        "reason_codes": [
          "repair_status_custom_quote_required",
          "calculation_status_custom_quote_estimate",
          "source_confidence_high",
          "estimate_confidence_low",
          "value_model_custom_quote",
          "grant_probability_repair_applied",
          "estimate_confidence_medium",
          "value_model_hybrid_rate_plus_cap",
          "estimate_status_needs_quote"
        ]
      }
    }
  ],
  "input_requirements": [
    {
      "input_key": "custom_energy_savings_proposal",
      "label": "custom energy-savings proposal",
      "value_type": "text",
      "required_for": [
        "effect_one_time_savings_1_5eb511fe0f127e08"
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
      "input_key": "estimated_annual_kwh_saved",
      "label": "estimated annual kWh saved",
      "value_type": "number",
      "required_for": [
        "effect_one_time_savings_1_5eb511fe0f127e08"
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
      "input_key": "estimated_kw_demand_reduction",
      "label": "estimated kW demand reduction",
      "value_type": "number",
      "required_for": [
        "effect_one_time_savings_1_5eb511fe0f127e08"
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
      "input_key": "project_cost",
      "label": "project cost",
      "value_type": "number",
      "required_for": [
        "effect_one_time_savings_1_5eb511fe0f127e08"
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
      "input_key": "incremental_cost",
      "label": "incremental cost",
      "value_type": "number",
      "required_for": [
        "effect_one_time_savings_1_5eb511fe0f127e08"
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
      "input_key": "preapproval",
      "label": "preapproval",
      "value_type": "text",
      "required_for": [
        "effect_one_time_savings_1_5eb511fe0f127e08"
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
      "input_key": "measurement_and_verification_if_required",
      "label": "measurement and verification if required",
      "value_type": "text",
      "required_for": [
        "effect_one_time_savings_1_5eb511fe0f127e08"
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
      "input_key": "approved_grant_amount",
      "label": "approved grant amount",
      "value_type": "number",
      "required_for": [
        "effect_one_time_savings_1_5eb511fe0f127e08"
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
      "input_key": "project_specific_kwh_savings",
      "label": "project-specific kWh savings",
      "value_type": "number",
      "required_for": [
        "effect_one_time_savings_1_5eb511fe0f127e08"
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
      "input_key": "project_specific_kw_reduction",
      "label": "project-specific kW reduction",
      "value_type": "number",
      "required_for": [
        "effect_one_time_savings_1_5eb511fe0f127e08"
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
      "evidence_id": "evidence_9b8a59f46547323b",
      "source_type": "gpt_pro_research_summary",
      "quote": "The official page supports custom business grants and caps but not a reusable heat-recovery formula.",
      "source_urls": [
        "https://www.otpco.com/rebates-and-efficiency-programs/programs/custom-grants/",
        "https://www.otpco.com/rebates-and-efficiency-programs/business/programs/",
        "https://www.otpco.com/media/pv4pgqyt/2025-program-and-services-guide_final.pdf",
        "https://www.otpco.com/rebates-and-efficiency-programs/topics/heating-and-cooling/heat-recovery-air-exchangers/"
      ],
      "evidence_confidence": 0.9
    },
    {
      "evidence_id": "grant_probability_repair_3f5898b0434c6010",
      "source_type": "gpt_pro_grant_probability_repair",
      "quote": "Official Otter Tail materials state that custom grant amounts are based on kWh saved, kW demand reduced, and project costs, and that grants will not exceed 75% of project costs or 90% of incremental costs.",
      "source_urls": [
        "https://www.otpco.com/rebates-and-efficiency-programs/programs/custom-grants/",
        "https://www.otpco.com/rebates-and-efficiency-programs/business/programs/",
        "https://www.otpco.com/media/pv4pgqyt/2025-program-and-services-guide_final.pdf"
      ],
      "evidence_confidence": 0.9
    }
  ],
  "confidence": {
    "overall": 0.38,
    "source_access": 0.9,
    "availability": 0.9,
    "calculation": 0.38,
    "extraction": 0.9,
    "reason_codes": [
      "repair_status_custom_quote_required",
      "calculation_status_custom_quote_estimate",
      "source_confidence_high",
      "estimate_confidence_low"
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
  "opportunityId": "SOURCE_DSIRE:dsire_program_id:1528",
  "programName": "Otter Tail Power Company - Commercial & Industrial Energy Efficiency Grant Program",
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
