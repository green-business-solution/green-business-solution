You are helping RetroFi finish conservative grant estimation.

Prompt 8 of 37.

Research only official or primary administrator sources when possible. Third-party summaries can be used only to find official sources, not as final support for formula/probability fields.

## Goal

Repair this grant-like v2 incentive package so Codex can calculate the grant value conservatively at runtime, or suppress it with explicit reason codes when no defensible estimate exists.

Do not make every grant estimable. If the source only says "up to", if the award is competitive with no probability evidence, if funding status is unknown, or if project-specific award approval is required, return suppressed or missing-input status.

## Current Package Context

```json
{
  "opportunity_id": "SOURCE_DSIRE:dsire_program_id:22149",
  "program_name": "Clean Transportation Program",
  "calculation_status": "needs_repair_review",
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
      "effect_id": "effect_grant_expected_value_1_f0c739479f440778",
      "label": "The Clean Transportation Program is an umbrella funding program. Award value is determined only by a specific CEC solicitation, block grant, or funding opportunity; no standing per-vehicle, per-port, or per-project formula applies.",
      "effect_type": "grant_expected_value",
      "cash_flow_direction": "benefit",
      "timing": {
        "cadence": "custom",
        "source_timing": "application_process",
        "approval_required_before_purchase": null,
        "approval_required_before_installation": null,
        "application_deadline": null,
        "funding_status": "unknown"
      },
      "calculation": {
        "method": "expected_value",
        "probability_discount": null,
        "conditional_award_cents": null,
        "max_award_cents": null,
        "grant_value_model_kind": "no_calculable_value",
        "cash_value_classification": "unknown",
        "conditional_award": {
          "status": "not_calculable",
          "formula_text": "The Clean Transportation Program is an umbrella CEC funding program, not a stand-alone grant formula. Award amounts are determined only by specific solicitations, block grants, or funding opportunities under the program.",
          "conditional_award_cents": null,
          "min_award_cents": null,
          "max_award_cents": null,
          "cost_share_percent": null,
          "required_project_inputs": [
            "specific_cec_solicitation_or_block_grant",
            "project_type",
            "requested_grant_amount_cents",
            "eligible_cost_basis_cents",
            "match_requirement",
            "application_score_or_award_probability"
          ],
          "calculation_trace": [
            "Official CEC program page describes the Clean Transportation Program as a funding and investment umbrella.",
            "CEC funding-area page states funding is delivered through block grants and competitive solicitations.",
            "No reusable per-vehicle, per-port, or per-project value formula was found on the umbrella page."
          ]
        },
        "probability_model": {
          "status": "not_applicable",
          "probability_discount": null,
          "probability_evidence_type": "none",
          "historical_awards_count": null,
          "historical_applications_count": null,
          "total_program_budget_cents": null,
          "expected_award_count": null,
          "competition_scope": "unknown",
          "probability_notes": "Probability evidence is not applicable at the umbrella-program level. Each underlying CEC solicitation needs its own award and probability repair."
        },
        "expected_value_recommendation": {
          "estimate_status": "suppressed",
          "expected_value_cents": null,
          "estimate_confidence": "high",
          "include_in_user_facing_total_default": false,
          "reason_codes": [
            "umbrella_program",
            "no_standing_formula",
            "specific_solicitation_required",
            "not_a_cash_estimate"
          ]
        },
        "fallback_prior_suggestion": {
          "probability_discount": null,
          "basis": "No fallback prior should be used for an umbrella program because there is no single competition or award model.",
          "should_retro_fi_use_without_human_approval": false
        },
        "min_award_cents": null
      },
      "required_inputs": [
        {
          "input_key": "specific_cec_solicitation_or_block_grant",
          "label": "specific cec solicitation or block grant",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_f0c739479f440778"
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
          "input_key": "project_type",
          "label": "project type",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_f0c739479f440778"
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
          "input_key": "requested_grant_amount_cents",
          "label": "requested grant amount cents",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_1_f0c739479f440778"
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
          "input_key": "eligible_cost_basis_cents",
          "label": "eligible cost basis cents",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_1_f0c739479f440778"
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
          "input_key": "match_requirement",
          "label": "match requirement",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_f0c739479f440778"
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
          "input_key": "application_score_or_award_probability",
          "label": "application score or award probability",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_f0c739479f440778"
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
            "effect_grant_expected_value_1_f0c739479f440778"
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
        "evidence_5af5f23826584985",
        "grant_probability_repair_93450953e6aa4e53"
      ],
      "confidence": {
        "overall": 0.9,
        "calculation": 0.9,
        "extraction": 0.9,
        "reason_codes": [
          "repair_status_needs_human_review",
          "calculation_status_needs_repair_review",
          "source_confidence_high",
          "estimate_confidence_low",
          "value_model_competitive_max_only",
          "grant_probability_repair_applied",
          "estimate_confidence_high",
          "value_model_no_calculable_value",
          "estimate_status_suppressed"
        ]
      }
    }
  ],
  "input_requirements": [
    {
      "input_key": "specific_cec_solicitation_or_block_grant",
      "label": "specific cec solicitation or block grant",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_f0c739479f440778"
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
      "input_key": "project_type",
      "label": "project type",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_f0c739479f440778"
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
      "input_key": "requested_grant_amount_cents",
      "label": "requested grant amount cents",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_1_f0c739479f440778"
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
      "input_key": "eligible_cost_basis_cents",
      "label": "eligible cost basis cents",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_1_f0c739479f440778"
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
      "input_key": "match_requirement",
      "label": "match requirement",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_f0c739479f440778"
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
      "input_key": "application_score_or_award_probability",
      "label": "application score or award probability",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_f0c739479f440778"
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
        "effect_grant_expected_value_1_f0c739479f440778"
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
      "evidence_id": "evidence_5af5f23826584985",
      "source_type": "gpt_pro_research_summary",
      "quote": "CEC Clean Transportation Program funding is real but delivered through specific solicitations, so a generic value rule would overstate awards.",
      "source_urls": [
        "https://www.energy.ca.gov/programs-and-topics/programs/clean-transportation-program",
        "https://www.energy.ca.gov/programs-and-topics/programs/clean-transportation-program/clean-transportation-funding-areas-0"
      ],
      "evidence_confidence": 0.9
    },
    {
      "evidence_id": "grant_probability_repair_93450953e6aa4e53",
      "source_type": "gpt_pro_grant_probability_repair",
      "quote": "CEC describes the Clean Transportation Program as a broad investment program whose funding is implemented through funding areas, block grants, and competitive solicitations. The umbrella page does not provide a reusable award formula.",
      "source_urls": [
        "https://www.energy.ca.gov/programs-and-topics/programs/clean-transportation-program",
        "https://www.energy.ca.gov/programs-and-topics/programs/clean-transportation-program/clean-transportation-funding-areas-0"
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
      "repair_status_needs_human_review",
      "calculation_status_needs_repair_review",
      "source_confidence_high",
      "estimate_confidence_low"
    ]
  },
  "current_validation_notes": [
    "effect_grant_expected_value_1_f0c739479f440778: missing probability_discount",
    "effect_grant_expected_value_1_f0c739479f440778: missing conditional_award_cents",
    "effect_grant_expected_value_1_f0c739479f440778: conditional award status not_calculable",
    "effect_grant_expected_value_1_f0c739479f440778: probability status not_applicable"
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
  "opportunityId": "SOURCE_DSIRE:dsire_program_id:22149",
  "programName": "Clean Transportation Program",
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
