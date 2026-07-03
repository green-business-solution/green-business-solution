You are helping RetroFi finish conservative grant estimation.

Prompt 15 of 37.

Research only official or primary administrator sources when possible. Third-party summaries can be used only to find official sources, not as final support for formula/probability fields.

## Goal

Repair this grant-like v2 incentive package so Codex can calculate the grant value conservatively at runtime, or suppress it with explicit reason codes when no defensible estimate exists.

Do not make every grant estimable. If the source only says "up to", if the award is competitive with no probability evidence, if funding status is unknown, or if project-specific award approval is required, return suppressed or missing-input status.

## Current Package Context

```json
{
  "opportunity_id": "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-308",
  "program_name": "GFO-25-308 - Distributed Clean Hydrogen Production with Onsite End Use (H2ONSITE)",
  "calculation_status": "no_calculable_value",
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
      "effect_id": "effect_grant_expected_value_1_fad24d1a1bf06105",
      "label": "Competitive CEC grant for distributed-scale clean hydrogen production facilities up to five metric tons per day, co-located with hydrogen storage and onsite end use. Award amount depends on the solicitation manual, project budget, scoring, and CEC award decision.",
      "effect_type": "grant_expected_value",
      "cash_flow_direction": "benefit",
      "timing": {
        "cadence": "custom",
        "source_timing": "application_process",
        "approval_required_before_purchase": true,
        "approval_required_before_installation": true,
        "application_deadline": "2026-08-19 23:59",
        "funding_status": "open_funds_available"
      },
      "calculation": {
        "method": "expected_value",
        "probability_discount": null,
        "conditional_award_cents": null,
        "max_award_cents": 400000000,
        "grant_value_model_kind": "competitive_award_range",
        "cash_value_classification": "cash_grant",
        "conditional_award": {
          "status": "calculable",
          "formula_text": "Competitive CEC grant. Solicitation funding is $4,000,000 total; funding request must be between $2,000,000 and $4,000,000 per project, with at least 50% match. Conditional award equals approved CEC funding request if selected, subject to the solicitation minimum, maximum, total available funding, eligible costs, and match requirements.",
          "conditional_award_cents": null,
          "min_award_cents": 200000000,
          "max_award_cents": 400000000,
          "cost_share_percent": null,
          "required_project_inputs": [
            "cec_funding_request",
            "total_eligible_project_budget",
            "eligible_match_amount",
            "hydrogen_production_capacity_in_metric_tons_per_day",
            "hydrogen_storage_scope",
            "onsite_hydrogen_end_use_scope",
            "award_decision"
          ],
          "calculation_trace": [
            "Official solicitation page identifies GFO-25-308 as active with an August 19, 2026 final application deadline.",
            "Official pre-application materials state $4,000,000 total available funding.",
            "Funding table states minimum award $2,000,000 and maximum award $4,000,000.",
            "Match slide states applicants must provide at least 50% match.",
            "Conditional award cannot be converted to expected value without selection probability evidence."
          ]
        },
        "probability_model": {
          "status": "evidence_not_found",
          "probability_discount": null,
          "probability_evidence_type": "scoring_criteria_only",
          "historical_awards_count": null,
          "historical_applications_count": null,
          "total_program_budget_cents": 400000000,
          "expected_award_count": null,
          "competition_scope": "statewide_broad",
          "probability_notes": "Official materials provide total budget, award range, scoring, and a minimum passing score, but no historical application count, expected award count, or success rate. A score threshold is not enough to estimate probability."
        },
        "expected_value_recommendation": {
          "estimate_status": "human_review_required",
          "expected_value_cents": null,
          "estimate_confidence": "low",
          "include_in_user_facing_total_default": false,
          "reason_codes": [
            "competitive_grant",
            "conditional_award_range_found",
            "probability_evidence_not_found",
            "do_not_use_max_as_expected_value"
          ]
        },
        "fallback_prior_suggestion": {
          "probability_discount": 0.1,
          "basis": "Low-confidence human-review prior for a statewide competitive CEC demonstration solicitation with a small total budget and likely small award count.",
          "should_retro_fi_use_without_human_approval": false
        },
        "min_award_cents": 200000000
      },
      "required_inputs": [
        {
          "input_key": "cec_funding_request",
          "label": "CEC funding request",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_fad24d1a1bf06105"
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
          "input_key": "total_eligible_project_budget",
          "label": "total eligible project budget",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_fad24d1a1bf06105"
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
          "input_key": "hydrogen_production_capacity_in_metric_tons_per_day",
          "label": "hydrogen production capacity in metric tons per day",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_1_fad24d1a1bf06105"
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
          "input_key": "hydrogen_storage_scope",
          "label": "hydrogen storage scope",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_fad24d1a1bf06105"
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
          "input_key": "onsite_hydrogen_end_use_scope",
          "label": "onsite hydrogen end-use scope",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_fad24d1a1bf06105"
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
          "input_key": "application_score_or_award_decision",
          "label": "application score or award decision",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_fad24d1a1bf06105"
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
          "input_key": "eligible_project_budget",
          "label": "eligible project budget",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_fad24d1a1bf06105"
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
            "effect_grant_expected_value_1_fad24d1a1bf06105"
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
          "input_key": "eligible_match_amount",
          "label": "Eligible Match Amount",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_1_fad24d1a1bf06105"
          ],
          "source_precedence": [
            "quote",
            "user_profile",
            "retrofit_assumptions"
          ],
          "missing_severity": "blocks_calculation"
        },
        {
          "input_key": "award_decision",
          "label": "Award Decision",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_1_fad24d1a1bf06105"
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
        "evidence_86efdd5747770656",
        "grant_probability_repair_73b3ab98d549c5f0"
      ],
      "confidence": {
        "overall": 0.38,
        "calculation": 0.38,
        "extraction": 0.9,
        "reason_codes": [
          "repair_status_custom_quote_required",
          "calculation_status_no_calculable_value",
          "source_confidence_high",
          "estimate_confidence_low",
          "value_model_competitive_max_only",
          "grant_probability_repair_applied",
          "value_model_competitive_award_range",
          "estimate_status_human_review_required"
        ]
      }
    }
  ],
  "input_requirements": [
    {
      "input_key": "cec_funding_request",
      "label": "CEC funding request",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_fad24d1a1bf06105"
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
      "input_key": "total_eligible_project_budget",
      "label": "total eligible project budget",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_fad24d1a1bf06105"
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
      "input_key": "hydrogen_production_capacity_in_metric_tons_per_day",
      "label": "hydrogen production capacity in metric tons per day",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_1_fad24d1a1bf06105"
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
      "input_key": "hydrogen_storage_scope",
      "label": "hydrogen storage scope",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_fad24d1a1bf06105"
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
      "input_key": "onsite_hydrogen_end_use_scope",
      "label": "onsite hydrogen end-use scope",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_fad24d1a1bf06105"
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
      "input_key": "application_score_or_award_decision",
      "label": "application score or award decision",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_fad24d1a1bf06105"
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
      "input_key": "eligible_project_budget",
      "label": "eligible project budget",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_fad24d1a1bf06105"
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
        "effect_grant_expected_value_1_fad24d1a1bf06105"
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
      "input_key": "eligible_match_amount",
      "label": "Eligible Match Amount",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_1_fad24d1a1bf06105"
      ],
      "source_precedence": [
        "quote",
        "user_profile",
        "retrofit_assumptions"
      ],
      "missing_severity": "blocks_calculation"
    },
    {
      "input_key": "award_decision",
      "label": "Award Decision",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_1_fad24d1a1bf06105"
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
      "evidence_id": "evidence_86efdd5747770656",
      "source_type": "gpt_pro_research_summary",
      "quote": "H2ONSITE is a competitive clean-hydrogen demonstration grant, not a battery-storage retrofit program.",
      "source_urls": [
        "https://www.energy.ca.gov/solicitations/2026-06/gfo-25-308-distributed-clean-hydrogen-production-onsite-end-use-h2onsite",
        "https://ecams.energy.ca.gov/s/login/"
      ],
      "evidence_confidence": 0.9
    },
    {
      "evidence_id": "grant_probability_repair_73b3ab98d549c5f0",
      "source_type": "gpt_pro_grant_probability_repair",
      "quote": "CEC solicitation page and workshop materials describe GFO-25-308 as H2ONSITE, an active competitive solicitation for distributed clean hydrogen production with onsite end use. The official workshop funding table states $4,000,000 available, minimum award $2,000,000, maximum award $4,000,000, and a 50% match requirement.",
      "source_urls": [
        "https://www.energy.ca.gov/solicitations/2026-06/gfo-25-308-distributed-clean-hydrogen-production-onsite-end-use-h2onsite",
        "https://www.energy.ca.gov/sites/default/files/2026-06/GFO-25-308_Pre-Application_Workshop_Presentation_ada.pdf",
        "https://ecams.energy.ca.gov/s/login/"
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
      "calculation_status_no_calculable_value",
      "source_confidence_high",
      "estimate_confidence_low"
    ]
  },
  "current_validation_notes": [
    "effect_grant_expected_value_1_fad24d1a1bf06105: missing probability_discount",
    "effect_grant_expected_value_1_fad24d1a1bf06105: missing conditional_award_cents",
    "effect_grant_expected_value_1_fad24d1a1bf06105: conditional award status calculable",
    "effect_grant_expected_value_1_fad24d1a1bf06105: probability status evidence_not_found"
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
  "opportunityId": "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-308",
  "programName": "GFO-25-308 - Distributed Clean Hydrogen Production with Onsite End Use (H2ONSITE)",
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
