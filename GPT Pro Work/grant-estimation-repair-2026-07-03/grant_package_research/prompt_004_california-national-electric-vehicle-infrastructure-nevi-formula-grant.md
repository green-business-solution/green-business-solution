You are helping RetroFi finish conservative grant estimation.

Prompt 4 of 37.

Research only official or primary administrator sources when possible. Third-party summaries can be used only to find official sources, not as final support for formula/probability fields.

## Goal

Repair this grant-like v2 incentive package so Codex can calculate the grant value conservatively at runtime, or suppress it with explicit reason codes when no defensible estimate exists.

Do not make every grant estimable. If the source only says "up to", if the award is competitive with no probability evidence, if funding status is unknown, or if project-specific award approval is required, return suppressed or missing-input status.

## Current Package Context

```json
{
  "opportunity_id": "SOURCE_DSIRE:dsire_program_id:22629",
  "program_name": "California - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
  "calculation_status": "calculable_with_missing_inputs",
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
      "effect_id": "effect_grant_expected_value_1_c93b27f2d9d796eb",
      "label": "California NEVI funding is awarded through competitive CEC solicitations for publicly accessible high-powered DC fast charging; federal grant share is generally capped at 80% of allowable project cost with required match.",
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
        "grant_value_model_kind": "competitive_cost_share",
        "cash_value_classification": "cash_grant",
        "conditional_award": {
          "status": "needs_project_cost",
          "formula_text": "For a selected California CEC NEVI solicitation project, conditional grant amount is the lesser of the requested/approved grant amount, 80% of CEC-approved eligible project cost, and any solicitation-specific funding or site caps.",
          "conditional_award_cents": null,
          "min_award_cents": null,
          "max_award_cents": null,
          "cost_share_percent": 0.8,
          "required_project_inputs": [
            "solicitation_number",
            "eligible_project_cost",
            "requested_grant_amount",
            "match_funding",
            "dcfc_site_and_corridor_compliance",
            "award_selection_status",
            "solicitation_specific_caps"
          ],
          "calculation_trace": [
            "Confirm the applicable CEC NEVI solicitation and whether the site is selected.",
            "Calculate 80% of approved eligible project cost.",
            "Cap at the requested/approved grant amount and any solicitation-specific limits."
          ]
        },
        "probability_model": {
          "status": "evidence_not_found",
          "probability_discount": null,
          "probability_evidence_type": "none",
          "historical_awards_count": null,
          "historical_applications_count": null,
          "total_program_budget_cents": 7900000000,
          "expected_award_count": null,
          "competition_scope": "statewide_broad",
          "probability_notes": "Official sources identify an active competitive CEC NEVI solicitation and funding amount, but no current application count, historical success-rate denominator, or expected award count was verified for discounting."
        },
        "expected_value_recommendation": {
          "estimate_status": "suppressed",
          "expected_value_cents": null,
          "estimate_confidence": "low",
          "include_in_user_facing_total_default": false,
          "reason_codes": [
            "competitive_grant",
            "cost_share_cap_only",
            "missing_probability_anchor",
            "needs_project_cost"
          ]
        },
        "fallback_prior_suggestion": {
          "probability_discount": null,
          "basis": "Only a human-reviewed prior should be used for competitive NEVI solicitations without application and award-count evidence.",
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
          "input_key": "solicitation_number",
          "label": "solicitation number",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_c93b27f2d9d796eb"
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
            "effect_grant_expected_value_1_c93b27f2d9d796eb"
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
          "input_key": "requested_grant_amount",
          "label": "requested grant amount",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_1_c93b27f2d9d796eb"
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
          "input_key": "match_funding",
          "label": "match funding",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_c93b27f2d9d796eb"
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
          "input_key": "dcfc_site_and_corridor_compliance",
          "label": "dcfc site and corridor compliance",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_c93b27f2d9d796eb"
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
          "input_key": "award_selection_status",
          "label": "award selection status",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_c93b27f2d9d796eb"
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
          "input_key": "solicitation_specific_caps",
          "label": "Solicitation Specific Caps",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_c93b27f2d9d796eb"
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
        "evidence_83e7014507a30f21",
        "grant_probability_repair_d8a8e87f233a895c"
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
          "estimate_status_suppressed"
        ]
      }
    }
  ],
  "input_requirements": [
    {
      "input_key": "solicitation_number",
      "label": "solicitation number",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_c93b27f2d9d796eb"
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
        "effect_grant_expected_value_1_c93b27f2d9d796eb"
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
      "input_key": "requested_grant_amount",
      "label": "requested grant amount",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_1_c93b27f2d9d796eb"
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
      "input_key": "match_funding",
      "label": "match funding",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_c93b27f2d9d796eb"
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
      "input_key": "dcfc_site_and_corridor_compliance",
      "label": "dcfc site and corridor compliance",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_c93b27f2d9d796eb"
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
      "input_key": "award_selection_status",
      "label": "award selection status",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_c93b27f2d9d796eb"
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
      "input_key": "solicitation_specific_caps",
      "label": "Solicitation Specific Caps",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_c93b27f2d9d796eb"
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
      "evidence_id": "evidence_83e7014507a30f21",
      "source_type": "gpt_pro_research_summary",
      "quote": "California NEVI is a competitive public DC fast-charging grant program, not an automatic charger rebate.",
      "source_urls": [
        "https://www.energy.ca.gov/programs-and-topics/programs/federal-ev-infrastructure-programs",
        "https://www.energy.ca.gov/programs-and-topics/programs/national-electric-vehicle-infrastructure-nevi-formula-program",
        "https://www.energy.ca.gov/solicitations/2026-02/gfo-25-603-californias-national-electric-vehicle-infrastructure-formula",
        "https://programs.dsireusa.org/system/program/detail/22629/california-national-electric-vehicle-infrastructure-nevi-formula-grant-program"
      ],
      "evidence_confidence": 0.9
    },
    {
      "evidence_id": "grant_probability_repair_d8a8e87f233a895c",
      "source_type": "gpt_pro_grant_probability_repair",
      "quote": "CEC identifies GFO-25-603 as California's NEVI Formula Program solicitation with up to $79 million available for public high-powered DC fast charging; federal NEVI cost share is up to 80% of eligible costs. ([California Energy Commission][3])",
      "source_urls": [
        "https://www.energy.ca.gov/programs-and-topics/programs/federal-ev-infrastructure-programs",
        "https://www.energy.ca.gov/programs-and-topics/programs/national-electric-vehicle-infrastructure-nevi-formula-program",
        "https://www.energy.ca.gov/solicitations/2026-02/gfo-25-603-californias-national-electric-vehicle-infrastructure-formula",
        "https://afdc.energy.gov/laws/12744",
        "https://programs.dsireusa.org/system/program/detail/22629/california-national-electric-vehicle-infrastructure-nevi-formula-grant-program"
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
    "effect_grant_expected_value_1_c93b27f2d9d796eb: missing probability_discount",
    "effect_grant_expected_value_1_c93b27f2d9d796eb: missing conditional_award_cents",
    "effect_grant_expected_value_1_c93b27f2d9d796eb: conditional award status needs_project_cost",
    "effect_grant_expected_value_1_c93b27f2d9d796eb: probability status evidence_not_found"
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
  "opportunityId": "SOURCE_DSIRE:dsire_program_id:22629",
  "programName": "California - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
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
