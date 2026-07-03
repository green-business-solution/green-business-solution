You are helping RetroFi finish conservative grant estimation.

Prompt 21 of 37.

Research only official or primary administrator sources when possible. Third-party summaries can be used only to find official sources, not as final support for formula/probability fields.

## Goal

Repair this grant-like v2 incentive package so Codex can calculate the grant value conservatively at runtime, or suppress it with explicit reason codes when no defensible estimate exists.

Do not make every grant estimable. If the source only says "up to", if the award is competitive with no probability evidence, if funding status is unknown, or if project-specific award approval is required, return suppressed or missing-input status.

## Current Package Context

```json
{
  "opportunity_id": "SOURCE_DSIRE:dsire_program_id:22630",
  "program_name": "Hawaii - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
  "calculation_status": "custom_quote_estimate",
  "availability": {
    "status": "active",
    "source_access_status": "accessible_or_researched"
  },
  "geography": {
    "country": "US",
    "states": [],
    "counties": [],
    "cities": [],
    "utility_territory_required": false
  },
  "grant_effects": [
    {
      "effect_id": "effect_grant_expected_value_1_83bd8b19270e1ac1",
      "label": "For HDOT NEVI deployment, selected public DC fast-charging infrastructure may receive federal NEVI cost-share support up to 80% of eligible project cost, but no open direct customer rebate or standard award table was verified.",
      "effect_type": "grant_expected_value",
      "cash_flow_direction": "benefit",
      "timing": {
        "cadence": "custom",
        "source_timing": "application_process",
        "approval_required_before_purchase": true,
        "approval_required_before_installation": true,
        "application_deadline": null,
        "funding_status": "unknown"
      },
      "calculation": {
        "method": "expected_value",
        "probability_discount": null,
        "conditional_award_cents": null,
        "max_award_cents": null,
        "grant_value_model_kind": "formula_grant",
        "cash_value_classification": "reimbursement",
        "conditional_award": {
          "status": "needs_project_scope",
          "formula_text": "For an HDOT-selected or HDOT-contracted NEVI deployment site, federal NEVI participation may cover up to 80% of approved eligible project cost, with the remaining share supplied by state, private, or other non-federal sources. No standard open customer-facing award table was verified.",
          "conditional_award_cents": null,
          "min_award_cents": null,
          "max_award_cents": null,
          "cost_share_percent": 0.8,
          "required_project_inputs": [
            "hdot_selection_or_contract_status",
            "nevi_site_location",
            "charger_power_and_port_count",
            "eligible_project_cost",
            "approved_cost_share",
            "approved_award_amount"
          ],
          "calculation_trace": [
            "Confirm the project is part of an HDOT NEVI deployment or contract.",
            "Use the approved federal share, capped at 80% of eligible cost.",
            "Do not calculate for a general customer unless HDOT selection/contract status and approved costs are known."
          ]
        },
        "probability_model": {
          "status": "not_applicable",
          "probability_discount": null,
          "probability_evidence_type": "none",
          "historical_awards_count": null,
          "historical_applications_count": null,
          "total_program_budget_cents": 1770000000,
          "expected_award_count": 11,
          "competition_scope": "unknown",
          "probability_notes": "Hawaii NEVI appears to be HDOT-administered infrastructure deployment rather than a currently verified open direct customer grant. Probability discounting is not applicable to a non-applicant deployment path."
        },
        "expected_value_recommendation": {
          "estimate_status": "suppressed",
          "expected_value_cents": null,
          "estimate_confidence": "low",
          "include_in_user_facing_total_default": false,
          "reason_codes": [
            "no_open_direct_customer_grant_verified",
            "state_formula_deployment_contract",
            "needs_contract_selection_and_approved_cost"
          ]
        },
        "fallback_prior_suggestion": {
          "probability_discount": null,
          "basis": "No applicant success-rate prior should be used where no open direct customer application path was verified.",
          "should_retro_fi_use_without_human_approval": false
        },
        "min_award_cents": null,
        "cost_share_percent": 0.8
      },
      "caps": [
        {
          "cap_type": "maximum_percent_of_cost",
          "percent": 0.8,
          "applies_to": "effect"
        }
      ],
      "required_inputs": [
        {
          "input_key": "eligible_project_cost",
          "label": "eligible project cost",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_1_83bd8b19270e1ac1"
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
          "input_key": "hdot_selection_or_contract_status",
          "label": "HDOT selection or contract status",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_83bd8b19270e1ac1"
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
          "input_key": "nevi_site_location",
          "label": "NEVI site location",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_83bd8b19270e1ac1"
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
          "input_key": "charger_power_and_port_count",
          "label": "charger power and port count",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_1_83bd8b19270e1ac1"
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
          "input_key": "approved_cost_share",
          "label": "approved cost share",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_1_83bd8b19270e1ac1"
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
          "input_key": "selection_status",
          "label": "selection status",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_83bd8b19270e1ac1"
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
          "input_key": "approved_award_amount",
          "label": "approved award amount",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_1_83bd8b19270e1ac1"
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
            "effect_grant_expected_value_1_83bd8b19270e1ac1"
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
        "evidence_ff65fb7839c8041c",
        "grant_probability_repair_b21d806c5f7addb2"
      ],
      "confidence": {
        "overall": 0.38,
        "calculation": 0.38,
        "extraction": 0.9,
        "reason_codes": [
          "repair_status_custom_quote_required",
          "calculation_status_custom_quote_estimate",
          "source_confidence_high",
          "estimate_confidence_low",
          "value_model_competitive_cost_share",
          "grant_probability_repair_applied",
          "value_model_formula_grant",
          "estimate_status_suppressed"
        ]
      }
    }
  ],
  "input_requirements": [
    {
      "input_key": "eligible_project_cost",
      "label": "eligible project cost",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_1_83bd8b19270e1ac1"
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
      "input_key": "hdot_selection_or_contract_status",
      "label": "HDOT selection or contract status",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_83bd8b19270e1ac1"
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
      "input_key": "nevi_site_location",
      "label": "NEVI site location",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_83bd8b19270e1ac1"
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
      "input_key": "charger_power_and_port_count",
      "label": "charger power and port count",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_1_83bd8b19270e1ac1"
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
      "input_key": "approved_cost_share",
      "label": "approved cost share",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_1_83bd8b19270e1ac1"
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
      "input_key": "selection_status",
      "label": "selection status",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_83bd8b19270e1ac1"
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
      "input_key": "approved_award_amount",
      "label": "approved award amount",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_1_83bd8b19270e1ac1"
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
        "effect_grant_expected_value_1_83bd8b19270e1ac1"
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
      "evidence_id": "evidence_ff65fb7839c8041c",
      "source_type": "gpt_pro_research_summary",
      "quote": "Hawaii NEVI is a state federal-formula deployment program for public DC fast charging. No standard customer-facing rebate amount or open application was verified.",
      "source_urls": [
        "https://hidot.hawaii.gov/highways/hawaii-nevi-state-plan/",
        "https://hidot.hawaii.gov/highways/kahului-ev-charging-station-opens-feb-28/",
        "https://hidot.hawaii.gov/highways/files/2025/09/20250911-HDOT-letter-Submitting-2025-NEVI-Plan-for-FY26-funding-approved-by-FHWA.pdf",
        "https://www.transportation.gov/rural/ev/toolkit/ev-infrastructure-funding-and-financing/federal-funding-programs"
      ],
      "evidence_confidence": 0.9
    },
    {
      "evidence_id": "grant_probability_repair_b21d806c5f7addb2",
      "source_type": "gpt_pro_grant_probability_repair",
      "quote": "HDOT NEVI materials describe a state deployment plan and installed/contracted fast-charging stations rather than a standard open direct rebate; official releases state HDOT plans 11 stations, and NEVI cost share can fund up to 80% of eligible costs. ([Hawaii Department of Transportation][4])",
      "source_urls": [
        "https://hidot.hawaii.gov/highways/hawaii-nevi-state-plan/",
        "https://hidot.hawaii.gov/highways/kahului-ev-charging-station-opens-feb-28/",
        "https://hidot.hawaii.gov/blog/2026/05/15/electric-vehicle-fast-chargers-dedicated-at-kapalua-airport/",
        "https://hidot.hawaii.gov/highways/files/2025/09/20250911-HDOT-letter-Submitting-2025-NEVI-Plan-for-FY26-funding-approved-by-FHWA.pdf",
        "https://afdc.energy.gov/laws/12744"
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
  },
  "current_validation_notes": [
    "effect_grant_expected_value_1_83bd8b19270e1ac1: missing probability_discount",
    "effect_grant_expected_value_1_83bd8b19270e1ac1: missing conditional_award_cents",
    "effect_grant_expected_value_1_83bd8b19270e1ac1: conditional award status needs_project_scope",
    "effect_grant_expected_value_1_83bd8b19270e1ac1: probability status not_applicable"
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
  "opportunityId": "SOURCE_DSIRE:dsire_program_id:22630",
  "programName": "Hawaii - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
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
