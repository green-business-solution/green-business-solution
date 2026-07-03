You are helping RetroFi finish conservative grant estimation.

Prompt 18 of 37.

Research only official or primary administrator sources when possible. Third-party summaries can be used only to find official sources, not as final support for formula/probability fields.

## Goal

Repair this grant-like v2 incentive package so Codex can calculate the grant value conservatively at runtime, or suppress it with explicit reason codes when no defensible estimate exists.

Do not make every grant estimable. If the source only says "up to", if the award is competitive with no probability evidence, if funding status is unknown, or if project-specific award approval is required, return suppressed or missing-input status.

## Current Package Context

```json
{
  "opportunity_id": "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-607",
  "program_name": "GFO-25-607 - Clean Transportation Program Hydrogen Infrastructure Project Opportunity (HIPO)",
  "calculation_status": "calculable_with_missing_inputs",
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
      "effect_id": "effect_grant_expected_value_1_a7ff5e3c336c4dd5",
      "label": "Competitive HIPO grants must fund eligible California hydrogen refueling infrastructure. Grant requests are $2,000,000 to $15,000,000 per project, require at least 25% match, and are limited by the $45,000,000 solicitation budget; expected value requires award probability.",
      "effect_type": "grant_expected_value",
      "cash_flow_direction": "benefit",
      "timing": {
        "cadence": "custom",
        "source_timing": "application_process",
        "approval_required_before_purchase": true,
        "approval_required_before_installation": true,
        "application_deadline": "2026-06-19",
        "funding_status": "closed"
      },
      "calculation": {
        "method": "expected_value",
        "probability_discount": null,
        "conditional_award_cents": 200000000,
        "max_award_cents": 1500000000,
        "grant_value_model_kind": "competitive_cost_share",
        "cash_value_classification": "cash_grant",
        "conditional_award": {
          "status": "needs_project_scope",
          "formula_text": "Competitive hydrogen refueling infrastructure grant. Funding request must be between $2,000,000 and $15,000,000 per project, with at least 25% match, meaning CEC share is up to 75% of eligible project cost. Conditional award equals approved funding request if selected, subject to station-type subcaps, eligible costs, match, and the $45,000,000 solicitation budget.",
          "conditional_award_cents": null,
          "min_award_cents": 200000000,
          "max_award_cents": 1500000000,
          "cost_share_percent": 0.75,
          "required_project_inputs": [
            "requested_grant_amount_cents",
            "eligible_project_cost_cents",
            "match_amount_cents",
            "hydrogen_station_scope",
            "station_type",
            "application_score_or_award_decision"
          ],
          "calculation_trace": [
            "Official CEC solicitation page shows GFO-25-607 active with July 20, 2026 deadline.",
            "Official workshop materials state $45,000,000 total funding.",
            "Funding table states minimum award $2,000,000 and maximum award $15,000,000.",
            "Match slide states a minimum 25% match, implying CEC funding up to 75% of eligible cost.",
            "Conditional award is project-specific and requires approval."
          ]
        },
        "probability_model": {
          "status": "evidence_not_found",
          "probability_discount": null,
          "probability_evidence_type": "scoring_criteria_only",
          "historical_awards_count": null,
          "historical_applications_count": null,
          "total_program_budget_cents": 4500000000,
          "expected_award_count": null,
          "competition_scope": "statewide_broad",
          "probability_notes": "Official materials include budget, min/max award, match, and ranked scoring, but no historical application count, expected award count, or success rate."
        },
        "expected_value_recommendation": {
          "estimate_status": "human_review_required",
          "expected_value_cents": null,
          "estimate_confidence": "low",
          "include_in_user_facing_total_default": false,
          "reason_codes": [
            "competitive_grant",
            "conditional_award_range_found",
            "project_scope_required",
            "probability_evidence_not_found"
          ]
        },
        "fallback_prior_suggestion": {
          "probability_discount": 0.15,
          "basis": "Low-confidence human-review prior for a statewide competitive hydrogen infrastructure solicitation with a $45,000,000 budget and large per-project awards.",
          "should_retro_fi_use_without_human_approval": false
        },
        "min_award_cents": 200000000,
        "cost_share_percent": 0.75
      },
      "caps": [
        {
          "cap_type": "maximum_amount",
          "amount": {
            "value": 15000000,
            "currency": "USD"
          },
          "applies_to": "effect"
        },
        {
          "cap_type": "maximum_percent_of_cost",
          "percent": 75,
          "applies_to": "effect"
        }
      ],
      "required_inputs": [
        {
          "input_key": "requested_grant_amount_cents",
          "label": "requested grant amount cents",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_1_a7ff5e3c336c4dd5"
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
          "label": "eligible project cost cents",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_1_a7ff5e3c336c4dd5"
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
          "input_key": "match_amount_cents",
          "label": "match amount cents",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_1_a7ff5e3c336c4dd5"
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
          "input_key": "hydrogen_station_scope",
          "label": "hydrogen station scope",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_a7ff5e3c336c4dd5"
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
            "effect_grant_expected_value_1_a7ff5e3c336c4dd5"
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
            "effect_grant_expected_value_1_a7ff5e3c336c4dd5"
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
          "input_key": "station_type",
          "label": "Station Type",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_a7ff5e3c336c4dd5"
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
          "label": "Application Score Or Award Decision",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_1_a7ff5e3c336c4dd5"
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
        "evidence_611e651feb71618c",
        "grant_probability_repair_99ebd622d5d074b7"
      ],
      "confidence": {
        "overall": 0.38,
        "calculation": 0.38,
        "extraction": 0.9,
        "reason_codes": [
          "repair_status_calculation_package_found",
          "calculation_status_calculable_with_missing_inputs",
          "source_confidence_high",
          "estimate_confidence_low",
          "value_model_competitive_cost_share",
          "grant_probability_repair_applied",
          "estimate_status_human_review_required"
        ]
      }
    }
  ],
  "input_requirements": [
    {
      "input_key": "requested_grant_amount_cents",
      "label": "requested grant amount cents",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_1_a7ff5e3c336c4dd5"
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
      "label": "eligible project cost cents",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_1_a7ff5e3c336c4dd5"
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
      "input_key": "match_amount_cents",
      "label": "match amount cents",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_1_a7ff5e3c336c4dd5"
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
      "input_key": "hydrogen_station_scope",
      "label": "hydrogen station scope",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_a7ff5e3c336c4dd5"
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
        "effect_grant_expected_value_1_a7ff5e3c336c4dd5"
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
        "effect_grant_expected_value_1_a7ff5e3c336c4dd5"
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
      "input_key": "station_type",
      "label": "Station Type",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_a7ff5e3c336c4dd5"
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
      "label": "Application Score Or Award Decision",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_1_a7ff5e3c336c4dd5"
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
      "evidence_id": "evidence_611e651feb71618c",
      "source_type": "gpt_pro_research_summary",
      "quote": "GFO-25-607 has calculable grant request bounds and match rules, but its June 19, 2026 deadline has passed.",
      "source_urls": [
        "https://www.energy.ca.gov/solicitations/2026-04/gfo-25-607-clean-transportation-program-hydrogen-infrastructure-project",
        "https://www.energy.ca.gov/sites/default/files/2026-04/GFO-25-607_Pre-Application_Workshop_Presentation_ada.pdf",
        "https://www.energy.ca.gov/event/funding-workshop/2026-04/pre-application-workshop-gfo-25-607-clean-transportation-program"
      ],
      "evidence_confidence": 0.9
    },
    {
      "evidence_id": "grant_probability_repair_99ebd622d5d074b7",
      "source_type": "gpt_pro_grant_probability_repair",
      "quote": "CEC's official page and pre-application workshop materials state a July 20, 2026 deadline, $45,000,000 total funding, funding requests from $2,000,000 to $15,000,000 per project, and a 25% minimum match requirement.",
      "source_urls": [
        "https://www.energy.ca.gov/solicitations/2026-04/gfo-25-607-clean-transportation-program-hydrogen-infrastructure-project",
        "https://www.energy.ca.gov/sites/default/files/2026-04/GFO-25-607_Pre-Application_Workshop_Presentation_ada.pdf",
        "https://www.energy.ca.gov/event/funding-workshop/2026-04/pre-application-workshop-gfo-25-607-clean-transportation-program"
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
      "repair_status_calculation_package_found",
      "calculation_status_calculable_with_missing_inputs",
      "source_confidence_high",
      "estimate_confidence_low"
    ]
  },
  "current_validation_notes": [
    "effect_grant_expected_value_1_a7ff5e3c336c4dd5: missing probability_discount",
    "effect_grant_expected_value_1_a7ff5e3c336c4dd5: conditional award status needs_project_scope",
    "effect_grant_expected_value_1_a7ff5e3c336c4dd5: probability status evidence_not_found"
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
  "opportunityId": "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-607",
  "programName": "GFO-25-607 - Clean Transportation Program Hydrogen Infrastructure Project Opportunity (HIPO)",
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
