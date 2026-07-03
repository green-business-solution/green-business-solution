You are helping RetroFi finish conservative grant estimation.

Prompt 30 of 37.

Research only official or primary administrator sources when possible. Third-party summaries can be used only to find official sources, not as final support for formula/probability fields.

## Goal

Repair this grant-like v2 incentive package so Codex can calculate the grant value conservatively at runtime, or suppress it with explicit reason codes when no defensible estimate exists.

Do not make every grant estimable. If the source only says "up to", if the award is competitive with no probability evidence, if funding status is unknown, or if project-specific award approval is required, return suppressed or missing-input status.

## Current Package Context

```json
{
  "opportunity_id": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:nonprofit-solar-grant",
  "program_name": "Nonprofit Solar Grant",
  "calculation_status": "calculable_with_missing_inputs",
  "availability": {
    "status": "active",
    "source_access_status": "accessible_or_researched"
  },
  "retrofit_types": [
    "rooftop_solar_pv"
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
      "effect_id": "effect_grant_expected_value_1_5bab9aa147dbe71e",
      "label": "Grant reimburses up to 100% of eligible nonprofit-owned solar PV system cost, capped at $100,000. No more than 10% of grant funds may be used for building repairs or PV-ready infrastructure, leases and PPAs are ineligible, and system size may not exceed 80% of annual electricity use.",
      "effect_type": "grant_expected_value",
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
        "method": "percent_of_cost",
        "percent": 1,
        "cost_input": "eligible_system_cost_cents",
        "grant_value_model_kind": "capped_percent_of_eligible_cost",
        "cash_value_classification": "cash_grant",
        "conditional_award": {
          "status": "needs_project_cost",
          "formula_text": "For eligible nonprofit-owned solar PV systems, SVP grant = min(100% of eligible system cost, $100,000), with no more than 10% of grant funds for building repairs or PV-ready infrastructure, leases and PPAs ineligible, system size not exceeding 80% of annual electricity usage, and funding first-come, first-served until exhausted.",
          "conditional_award_cents": null,
          "min_award_cents": null,
          "max_award_cents": 10000000,
          "cost_share_percent": 1,
          "required_project_inputs": [
            "eligible_system_cost_cents",
            "nonprofit_status",
            "system_ownership_model",
            "annual_electric_usage_kwh",
            "pv_ready_costs",
            "project_preapproval",
            "preapproval_status",
            "program_funds_available"
          ],
          "calculation_trace": [
            "Confirm eligible nonprofit status and nonprofit-owned solar PV system; leased systems and PPAs are ineligible.",
            "Confirm system size does not exceed 80% of annual electricity usage and PV-ready costs are within the 10% grant-fund limit.",
            "Calculate 100% of eligible system cost and cap at $100,000; confirm first-come funds remain available."
          ]
        },
        "probability_model": {
          "status": "first_come_funding_unknown",
          "probability_discount": null,
          "probability_evidence_type": "first_come_funding_unknown",
          "historical_awards_count": null,
          "historical_applications_count": null,
          "total_program_budget_cents": null,
          "expected_award_count": null,
          "competition_scope": "utility_territory",
          "probability_notes": "Official materials state funding is first-come, first-served until exhausted and waitlisting may occur once funds are reserved, but no current remaining-funds balance was found."
        },
        "expected_value_recommendation": {
          "estimate_status": "needs_funding_check",
          "expected_value_cents": null,
          "estimate_confidence": "medium",
          "include_in_user_facing_total_default": false,
          "reason_codes": [
            "capped_percent_of_eligible_cost",
            "missing_system_cost",
            "first_come_funding_unknown",
            "ownership_and_system_size_requirements"
          ]
        },
        "fallback_prior_suggestion": {
          "probability_discount": null,
          "basis": "Do not apply a competitive grant prior. The relevant checks are eligibility, project approval, and whether first-come funds remain available.",
          "should_retro_fi_use_without_human_approval": false
        }
      },
      "caps": [
        {
          "cap_type": "maximum_amount",
          "amount": {
            "value": 100000,
            "currency": "USD"
          },
          "applies_to": "effect"
        },
        {
          "cap_type": "maximum_percent_of_cost",
          "percent": 1,
          "applies_to": "effect"
        }
      ],
      "required_inputs": [
        {
          "input_key": "eligible_system_cost",
          "label": "eligible system cost",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_1_5bab9aa147dbe71e"
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
          "input_key": "nonprofit_status",
          "label": "nonprofit status",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_5bab9aa147dbe71e"
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
          "input_key": "system_ownership_model",
          "label": "system ownership model",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_5bab9aa147dbe71e"
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
          "input_key": "annual_electric_usage_kwh",
          "label": "annual electric usage kwh",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_1_5bab9aa147dbe71e"
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
          "input_key": "project_preapproval",
          "label": "project preapproval",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_5bab9aa147dbe71e"
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
          "input_key": "pv_ready_costs",
          "label": "pv ready costs",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_1_5bab9aa147dbe71e"
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
          "input_key": "annual_usage_kwh",
          "label": "annual usage kwh",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_1_5bab9aa147dbe71e"
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
            "effect_grant_expected_value_1_5bab9aa147dbe71e"
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
          "input_key": "eligible_system_cost_cents",
          "label": "Eligible System Cost",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_1_5bab9aa147dbe71e"
          ],
          "source_precedence": [
            "quote",
            "user_profile",
            "retrofit_assumptions"
          ],
          "missing_severity": "blocks_calculation"
        },
        {
          "input_key": "program_funds_available",
          "label": "Program Funds Available",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_5bab9aa147dbe71e"
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
        "evidence_e9bf78fd2b846895",
        "grant_probability_repair_0355f5932e092602"
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
          "value_model_capped_percent_of_eligible_cost",
          "grant_probability_repair_applied",
          "estimate_confidence_medium",
          "estimate_status_needs_funding_check"
        ]
      }
    }
  ],
  "input_requirements": [
    {
      "input_key": "eligible_system_cost",
      "label": "eligible system cost",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_1_5bab9aa147dbe71e"
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
      "input_key": "nonprofit_status",
      "label": "nonprofit status",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_5bab9aa147dbe71e"
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
      "input_key": "system_ownership_model",
      "label": "system ownership model",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_5bab9aa147dbe71e"
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
      "input_key": "annual_electric_usage_kwh",
      "label": "annual electric usage kwh",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_1_5bab9aa147dbe71e"
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
      "input_key": "project_preapproval",
      "label": "project preapproval",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_5bab9aa147dbe71e"
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
      "input_key": "pv_ready_costs",
      "label": "pv ready costs",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_1_5bab9aa147dbe71e"
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
      "input_key": "annual_usage_kwh",
      "label": "annual usage kwh",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_1_5bab9aa147dbe71e"
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
        "effect_grant_expected_value_1_5bab9aa147dbe71e"
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
      "input_key": "eligible_system_cost_cents",
      "label": "Eligible System Cost",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_1_5bab9aa147dbe71e"
      ],
      "source_precedence": [
        "quote",
        "user_profile",
        "retrofit_assumptions"
      ],
      "missing_severity": "blocks_calculation"
    },
    {
      "input_key": "program_funds_available",
      "label": "Program Funds Available",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_5bab9aa147dbe71e"
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
      "evidence_id": "evidence_e9bf78fd2b846895",
      "source_type": "gpt_pro_research_summary",
      "quote": "SVP's nonprofit grant application supports nonprofit-owned solar PV systems up to $100,000 and 100% of eligible cost.",
      "source_urls": [
        "https://www.siliconvalleypower.com/home/showpublisheddocument/82370/638409969485570000",
        "https://www.siliconvalleypower.com/businesses/rebates"
      ],
      "evidence_confidence": 0.9
    },
    {
      "evidence_id": "grant_probability_repair_0355f5932e092602",
      "source_type": "gpt_pro_grant_probability_repair",
      "quote": "SVP states the Nonprofit Solar Grant provides up to $100,000 and up to 100% of system cost, is first-come, first-served until funds are exhausted, and may use a waitlist once funds are reserved; the application confirms nonprofit ownership, no leases or PPAs, the 80% annual-usage sizing limit, and the 10% limit for PV-ready or building-repair costs. ([Silicon Valley Power][10])",
      "source_urls": [
        "https://www.siliconvalleypower.com/businesses/rebates",
        "https://www.siliconvalleypower.com/home/showpublisheddocument/82370/638409969485570000"
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
    "effect_grant_expected_value_1_5bab9aa147dbe71e: conditional award status needs_project_cost",
    "effect_grant_expected_value_1_5bab9aa147dbe71e: probability status first_come_funding_unknown"
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
  "opportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:nonprofit-solar-grant",
  "programName": "Nonprofit Solar Grant",
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
