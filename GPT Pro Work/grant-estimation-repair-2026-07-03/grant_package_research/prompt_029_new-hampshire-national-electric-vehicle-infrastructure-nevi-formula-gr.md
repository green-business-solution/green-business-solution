You are helping RetroFi finish conservative grant estimation.

Prompt 29 of 37.

Research only official or primary administrator sources when possible. Third-party summaries can be used only to find official sources, not as final support for formula/probability fields.

## Goal

Repair this grant-like v2 incentive package so Codex can calculate the grant value conservatively at runtime, or suppress it with explicit reason codes when no defensible estimate exists.

Do not make every grant estimable. If the source only says "up to", if the award is competitive with no probability evidence, if funding status is unknown, or if project-specific award approval is required, return suppressed or missing-input status.

## Current Package Context

```json
{
  "opportunity_id": "SOURCE_DSIRE:dsire_program_id:22640",
  "program_name": "New Hampshire - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
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
      "effect_id": "effect_grant_expected_value_1_08058b4cd05b18d9",
      "label": "Selected New Hampshire Round II NEVI projects may receive up to 80% federal cost-share for eligible DC fast-charging infrastructure costs; actual awards depend on NHDOT RFP selection and approved eligible costs.",
      "effect_type": "grant_expected_value",
      "cash_flow_direction": "benefit",
      "timing": {
        "cadence": "one_time",
        "source_timing": "post_installation_reimbursement",
        "approval_required_before_purchase": true,
        "approval_required_before_installation": true,
        "application_deadline": "2026-08-21",
        "funding_status": "open_while_funds_last"
      },
      "calculation": {
        "method": "expected_value",
        "probability_discount": null,
        "conditional_award_cents": null,
        "max_award_cents": null,
        "grant_value_model_kind": "competitive_cost_share",
        "cash_value_classification": "reimbursement",
        "conditional_award": {
          "status": "needs_project_cost",
          "formula_text": "For a selected New Hampshire NEVI Round II project, conditional reimbursement is capped at 80% of approved eligible DC fast-charging infrastructure cost, with at least 20% non-federal match and compliance with RFP, site, equipment, and operating requirements.",
          "conditional_award_cents": null,
          "min_award_cents": null,
          "max_award_cents": null,
          "cost_share_percent": 0.8,
          "required_project_inputs": [
            "eligible_project_cost",
            "nhdot_round_ii_selection",
            "non_federal_match",
            "nevi_equipment_compliance",
            "site_compliance",
            "round_ii_selection"
          ],
          "calculation_trace": [
            "Confirm active Round II RFP eligibility and selection status.",
            "Calculate 80% of approved eligible cost.",
            "Cap at the NHDOT-approved award or reimbursement amount."
          ]
        },
        "probability_model": {
          "status": "evidence_not_found",
          "probability_discount": null,
          "probability_evidence_type": "none",
          "historical_awards_count": null,
          "historical_applications_count": null,
          "total_program_budget_cents": 1700000000,
          "expected_award_count": null,
          "competition_scope": "statewide_broad",
          "probability_notes": "Official procurement/news sources identify an active Round II RFP and program funding, but no verified application count, award count, or success-rate evidence was found."
        },
        "expected_value_recommendation": {
          "estimate_status": "suppressed",
          "expected_value_cents": null,
          "estimate_confidence": "low",
          "include_in_user_facing_total_default": false,
          "reason_codes": [
            "competitive_rfp",
            "cost_share_cap_only",
            "missing_probability_anchor",
            "needs_project_cost"
          ]
        },
        "fallback_prior_suggestion": {
          "probability_discount": null,
          "basis": "No source-backed prior should be used without human review because only RFP availability and cost-share structure were verified.",
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
            "effect_grant_expected_value_1_08058b4cd05b18d9"
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
          "input_key": "nhdot_round_ii_selection",
          "label": "nhdot round ii selection",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_08058b4cd05b18d9"
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
          "input_key": "non_federal_match",
          "label": "non federal match",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_08058b4cd05b18d9"
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
          "input_key": "nevi_equipment_compliance",
          "label": "nevi equipment compliance",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_08058b4cd05b18d9"
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
          "input_key": "site_compliance",
          "label": "site compliance",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_08058b4cd05b18d9"
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
          "input_key": "round_ii_selection",
          "label": "round ii selection",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_08058b4cd05b18d9"
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
        "evidence_a15cc4cc0ffea069",
        "grant_probability_repair_1141569e6c720054"
      ],
      "confidence": {
        "overall": 0.38,
        "calculation": 0.38,
        "extraction": 0.72,
        "reason_codes": [
          "repair_status_calculation_package_found",
          "calculation_status_calculable_with_missing_inputs",
          "source_confidence_medium",
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
      "input_key": "eligible_project_cost",
      "label": "eligible project cost",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_1_08058b4cd05b18d9"
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
      "input_key": "nhdot_round_ii_selection",
      "label": "nhdot round ii selection",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_08058b4cd05b18d9"
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
      "input_key": "non_federal_match",
      "label": "non federal match",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_08058b4cd05b18d9"
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
      "input_key": "nevi_equipment_compliance",
      "label": "nevi equipment compliance",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_08058b4cd05b18d9"
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
      "input_key": "site_compliance",
      "label": "site compliance",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_08058b4cd05b18d9"
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
      "input_key": "round_ii_selection",
      "label": "round ii selection",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_08058b4cd05b18d9"
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
      "evidence_id": "evidence_a15cc4cc0ffea069",
      "source_type": "gpt_pro_research_summary",
      "quote": "New Hampshire NEVI Round II is an active competitive RFP with project-specific awards and an 80% federal share cap.",
      "source_urls": [
        "https://www.dot.nh.gov/projects-plans-and-programs/ev-charging-infrastructure",
        "https://www.dot.nh.gov/news-and-media/nhdot-releases-nevi-round-ii-rfp",
        "https://www.dot.nh.gov/doing-business-nhdot/procurement-information",
        "https://www.fhwa.dot.gov/environment/nevi/"
      ],
      "evidence_confidence": 0.72
    },
    {
      "evidence_id": "grant_probability_repair_1141569e6c720054",
      "source_type": "gpt_pro_grant_probability_repair",
      "quote": "New Hampshire official procurement/news results identify a Round II NEVI RFP with proposals due August 21, 2026 and more than $17 million in NEVI funding; federal NEVI cost share is up to 80% of eligible costs. ([NH DOT][7])",
      "source_urls": [
        "https://www.dot.nh.gov/projects-plans-and-programs/ev-charging-infrastructure",
        "https://www.dot.nh.gov/news-and-media/nhdot-releases-nevi-round-ii-rfp",
        "https://www.dot.nh.gov/doing-business-nhdot/procurement-information",
        "https://apps.das.nh.gov/NHProcurement/File/rfp-dot-2027-01.pdf",
        "https://apps.das.nh.gov/NHProcurement/Bid/rfp-dot-202701",
        "https://afdc.energy.gov/laws/12744",
        "https://www.fhwa.dot.gov/environment/nevi/"
      ],
      "evidence_confidence": 0.72
    }
  ],
  "confidence": {
    "overall": 0.38,
    "source_access": 0.72,
    "availability": 0.72,
    "calculation": 0.38,
    "extraction": 0.72,
    "reason_codes": [
      "repair_status_calculation_package_found",
      "calculation_status_calculable_with_missing_inputs",
      "source_confidence_medium",
      "estimate_confidence_low"
    ]
  },
  "current_validation_notes": [
    "effect_grant_expected_value_1_08058b4cd05b18d9: missing probability_discount",
    "effect_grant_expected_value_1_08058b4cd05b18d9: missing conditional_award_cents",
    "effect_grant_expected_value_1_08058b4cd05b18d9: conditional award status needs_project_cost",
    "effect_grant_expected_value_1_08058b4cd05b18d9: probability status evidence_not_found"
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
  "opportunityId": "SOURCE_DSIRE:dsire_program_id:22640",
  "programName": "New Hampshire - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
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
