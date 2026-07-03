You are helping RetroFi finish conservative grant estimation.

Prompt 37 of 37.

Research only official or primary administrator sources when possible. Third-party summaries can be used only to find official sources, not as final support for formula/probability fields.

## Goal

Repair this grant-like v2 incentive package so Codex can calculate the grant value conservatively at runtime, or suppress it with explicit reason codes when no defensible estimate exists.

Do not make every grant estimable. If the source only says "up to", if the award is competitive with no probability evidence, if funding status is unknown, or if project-specific award approval is required, return suppressed or missing-input status.

## Current Package Context

```json
{
  "opportunity_id": "SOURCE_DSIRE:dsire_program_id:22650",
  "program_name": "Wisconsin - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
  "calculation_status": "custom_quote_estimate",
  "availability": {
    "status": "active",
    "source_access_status": "accessible_or_researched"
  },
  "retrofit_types": [
    "ev_charger_installation"
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
      "effect_id": "effect_grant_expected_value_1_87952524be536771",
      "label": "Wisconsin Electric Vehicle Infrastructure awards may fund up to 80% of eligible NEVI-compliant charging project costs, with at least 20% non-federal match required. Competitive award value depends on application, eligible costs, and WisDOT selection.",
      "effect_type": "grant_expected_value",
      "cash_flow_direction": "benefit",
      "timing": {
        "cadence": "one_time",
        "source_timing": "post_installation_reimbursement",
        "approval_required_before_purchase": true,
        "approval_required_before_installation": true,
        "application_deadline": "2026-07-24T23:59:00-05:00",
        "funding_status": "open_while_funds_last"
      },
      "calculation": {
        "method": "expected_value",
        "probability_discount": 0.2,
        "conditional_award_cents": null,
        "max_award_cents": null,
        "grant_value_model_kind": "competitive_cost_share",
        "cash_value_classification": "reimbursement",
        "conditional_award": {
          "status": "needs_project_cost",
          "formula_text": "For a selected Wisconsin Electric Vehicle Infrastructure project, award/reimbursement may fund up to 80% of eligible NEVI-compliant charging project costs, with at least 20% non-federal match and compliance with corridor, equipment, operations, and solicitation requirements.",
          "conditional_award_cents": null,
          "min_award_cents": null,
          "max_award_cents": null,
          "cost_share_percent": 0.8,
          "required_project_inputs": [
            "eligible_project_cost",
            "corridor_eligibility",
            "charger_configuration",
            "application_score_or_selection_result",
            "non_federal_match_amount",
            "selection_result",
            "approved_award_amount"
          ],
          "calculation_trace": [
            "Confirm the current WEVI round and project selection.",
            "Calculate 80% of approved eligible project cost.",
            "Apply approved award/reimbursement terms and required match."
          ]
        },
        "probability_model": {
          "status": "evidence_found",
          "probability_discount": 0.2,
          "probability_evidence_type": "historical_success_rate",
          "historical_awards_count": 53,
          "historical_applications_count": 264,
          "total_program_budget_cents": 4000000000,
          "expected_award_count": null,
          "competition_scope": "statewide_broad",
          "probability_notes": "Official Wisconsin materials provide a prior-round denominator and award count: 53 awards from 264 applications, or about 20.1%, rounded to 0.20. Current-round probability may differ because corridors, funding, and scoring have changed."
        },
        "expected_value_recommendation": {
          "estimate_status": "needs_project_scope",
          "expected_value_cents": null,
          "estimate_confidence": "medium",
          "include_in_user_facing_total_default": false,
          "reason_codes": [
            "historical_success_rate_available",
            "competitive_grant",
            "needs_project_cost",
            "needs_current_round_fit_review"
          ]
        },
        "fallback_prior_suggestion": {
          "probability_discount": null,
          "basis": "Fallback prior not needed because Wisconsin-specific historical application and award evidence was found; do not use without project cost and round fit.",
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
            "effect_grant_expected_value_1_87952524be536771"
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
          "input_key": "corridor_eligibility",
          "label": "corridor eligibility",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_87952524be536771"
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
          "input_key": "charger_configuration",
          "label": "charger configuration",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_87952524be536771"
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
          "input_key": "application_score_or_selection_result",
          "label": "application score or selection result",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_87952524be536771"
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
          "input_key": "non_federal_match_amount",
          "label": "non-federal match amount",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_1_87952524be536771"
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
            "effect_grant_expected_value_1_87952524be536771"
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
          "input_key": "selection_result",
          "label": "selection result",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_87952524be536771"
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
          "label": "Approved Award Amount",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_1_87952524be536771"
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
        "evidence_3c149aec023973fc",
        "grant_probability_repair_590e0d9e23b23605"
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
          "value_model_competitive_cost_share",
          "grant_probability_repair_applied",
          "estimate_confidence_medium",
          "estimate_status_needs_project_scope"
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
        "effect_grant_expected_value_1_87952524be536771"
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
      "input_key": "corridor_eligibility",
      "label": "corridor eligibility",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_87952524be536771"
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
      "input_key": "charger_configuration",
      "label": "charger configuration",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_87952524be536771"
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
      "input_key": "application_score_or_selection_result",
      "label": "application score or selection result",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_87952524be536771"
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
      "input_key": "non_federal_match_amount",
      "label": "non-federal match amount",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_1_87952524be536771"
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
        "effect_grant_expected_value_1_87952524be536771"
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
      "input_key": "selection_result",
      "label": "selection result",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_87952524be536771"
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
      "label": "Approved Award Amount",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_1_87952524be536771"
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
      "evidence_id": "evidence_3c149aec023973fc",
      "source_type": "gpt_pro_research_summary",
      "quote": "WEVI is a competitive up-to-80% cost-share program, so no deterministic customer savings should be included by default.",
      "source_urls": [
        "https://wisconsindot.gov/Pages/projects/multimodal/electrification.aspx",
        "https://programs.dsireusa.org/system/program/detail/22650/wisconsin-national-electric-vehicle-infrastructure-nevi-formula-grant-program"
      ],
      "evidence_confidence": 0.9
    },
    {
      "evidence_id": "grant_probability_repair_590e0d9e23b23605",
      "source_type": "gpt_pro_grant_probability_repair",
      "quote": "WisDOT states current WEVI applications are open through July 24, 2026, about $40 million remains unobligated, funding may cover up to 80% with at least 20% match, and $37 million has been awarded to 78 projects to date. Official WEVI prior-round materials report 53 awards from 264 applications. ([Wisconsin DOT][9])",
      "source_urls": [
        "https://wisconsindot.gov/Pages/projects/multimodal/electrification.aspx",
        "https://wisconsindot.gov/Pages/about-wisdot/newsroom/news-rel/052626-WEVI-connecting-corridors.aspx",
        "https://wisconsindot.gov/Documents/projects/multimodal/electrification/WEVI-Round1-Awarded-FAQ.pdf",
        "https://wisconsindot.gov/Documents/projects/multimodal/electrification/Wisconsin-EV-Infrastructure-Plan.pdf",
        "https://programs.dsireusa.org/system/program/detail/22650/wisconsin-national-electric-vehicle-infrastructure-nevi-formula-grant-program"
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
    "effect_grant_expected_value_1_87952524be536771: missing conditional_award_cents",
    "effect_grant_expected_value_1_87952524be536771: conditional award status needs_project_cost",
    "effect_grant_expected_value_1_87952524be536771: probability status evidence_found"
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
  "opportunityId": "SOURCE_DSIRE:dsire_program_id:22650",
  "programName": "Wisconsin - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
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
