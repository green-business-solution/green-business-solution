You are helping RetroFi finish conservative grant estimation.

Prompt 31 of 37.

Research only official or primary administrator sources when possible. Third-party summaries can be used only to find official sources, not as final support for formula/probability fields.

## Goal

Repair this grant-like v2 incentive package so Codex can calculate the grant value conservatively at runtime, or suppress it with explicit reason codes when no defensible estimate exists.

Do not make every grant estimable. If the source only says "up to", if the award is competitive with no probability evidence, if funding status is unknown, or if project-specific award approval is required, return suppressed or missing-input status.

## Current Package Context

```json
{
  "opportunity_id": "SOURCE_DSIRE:dsire_program_id:918",
  "program_name": "Office of Indian Energy Policy and Programs - Funding Opportunities",
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
      "effect_id": "effect_grant_expected_value_2_c767034e167ad0f6",
      "label": "Current DOE Indian Energy funding opportunities are competitive FOAs. Award value depends on the FOA, topic area, budget, cost share, and application review; no expected value should be assigned without probability evidence.",
      "effect_type": "grant_expected_value",
      "cash_flow_direction": "benefit",
      "timing": {
        "cadence": "custom",
        "source_timing": "application_process",
        "approval_required_before_purchase": null,
        "approval_required_before_installation": null,
        "application_deadline": "2026-07-24",
        "funding_status": "open_funds_available"
      },
      "calculation": {
        "method": "expected_value",
        "probability_discount": null,
        "conditional_award_cents": null,
        "max_award_cents": 750000000,
        "grant_value_model_kind": "competitive_award_range",
        "cash_value_classification": "cash_grant",
        "conditional_award": {
          "status": "needs_project_scope",
          "formula_text": "Current DOE Office of Indian Energy grant funding is through competitive FOAs. For the current Unleashing Tribal Energy Development NOFO, approximately $50,000,000 is available; topic maximums include up to $7,500,000 for Topic Area 1 with at least 10% cost share, up to $1,500,000 for Topic Area 2 with 0% cost share, and up to $2,500,000 for Topic Area 3 with 0% cost share.",
          "conditional_award_cents": null,
          "min_award_cents": null,
          "max_award_cents": 750000000,
          "cost_share_percent": null,
          "required_project_inputs": [
            "eligible_tribal_or_alaska_native_entity",
            "current_foa_topic",
            "eligible_project_budget_cents",
            "cost_share_requirement",
            "application_score_or_award_probability"
          ],
          "calculation_trace": [
            "Identify the current FOA and topic area.",
            "Apply topic-specific maximum award and cost-share requirement.",
            "Award amount and selection depend on competitive DOE review; no deterministic expected value is supported."
          ]
        },
        "probability_model": {
          "status": "evidence_not_found",
          "probability_discount": null,
          "probability_evidence_type": "eligibility_only",
          "historical_awards_count": null,
          "historical_applications_count": null,
          "total_program_budget_cents": 5000000000,
          "expected_award_count": null,
          "competition_scope": "sector_specific",
          "probability_notes": "Official sources confirm a competitive FOA, total current NOFO budget, deadline, topic caps, and cost shares, but no expected award count or application volume was found to calculate a conservative probability discount."
        },
        "expected_value_recommendation": {
          "estimate_status": "suppressed",
          "expected_value_cents": null,
          "estimate_confidence": "low",
          "include_in_user_facing_total_default": false,
          "reason_codes": [
            "competitive_foa",
            "no_probability_evidence",
            "topic_area_required",
            "cost_share_varies_by_topic"
          ]
        },
        "fallback_prior_suggestion": {
          "probability_discount": null,
          "basis": "A human reviewer could define a low prior for federal competitive Tribal energy FOAs, but official current materials reviewed do not provide enough probability evidence for automated expected value.",
          "should_retro_fi_use_without_human_approval": false
        },
        "min_award_cents": null
      },
      "required_inputs": [
        {
          "input_key": "current_foa_topic",
          "label": "current FOA topic",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_2_c767034e167ad0f6"
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
            "effect_grant_expected_value_2_c767034e167ad0f6"
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
          "input_key": "cost_share_requirement",
          "label": "cost share requirement",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_2_c767034e167ad0f6"
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
            "effect_grant_expected_value_2_c767034e167ad0f6"
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
            "effect_grant_expected_value_2_c767034e167ad0f6"
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
          "input_key": "eligible_tribal_or_alaska_native_entity",
          "label": "Eligible Tribal Or Alaska Native Entity",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_2_c767034e167ad0f6"
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
          "input_key": "eligible_project_budget_cents",
          "label": "Eligible Project Budget",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_2_c767034e167ad0f6"
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
        "evidence_aa4cd62b6805247b",
        "grant_probability_repair_6c45d8811fc77a04"
      ],
      "confidence": {
        "overall": 0.38,
        "calculation": 0.38,
        "extraction": 0.9,
        "reason_codes": [
          "repair_status_bad_edge_delete_only",
          "calculation_status_no_calculable_value",
          "source_confidence_high",
          "estimate_confidence_low",
          "value_model_competitive_max_only",
          "grant_probability_repair_applied",
          "value_model_competitive_award_range",
          "estimate_status_suppressed"
        ]
      }
    }
  ],
  "related_non_grant_effects": [
    {
      "effect_id": "effect_process_value_1_b76fbb43e2475d79",
      "label": "DOE Indian Energy offers no-cost technical assistance for Tribal energy planning, efficiency assessments, resource assessments, project planning, codes, and related energy project support.",
      "effect_type": "process_value",
      "cash_flow_direction": "benefit",
      "timing": {
        "cadence": "custom",
        "source_timing": "application_process",
        "approval_required_before_purchase": null,
        "approval_required_before_installation": null,
        "application_deadline": "2026-07-24",
        "funding_status": "open_funds_available"
      },
      "calculation": {
        "method": "zero_when_not_applicable",
        "reason": "non_cash_process_value is not included in automated totals without additional estimator support.",
        "source_effect_id": "SOURCE_DSIRE:dsire_program_id:918:0:effect_process_value_1_b76fbb43e2475d79"
      },
      "required_inputs": [
        {
          "input_key": "eligible_tribal_or_alaska_native_entity",
          "label": "eligible Tribal or Alaska Native entity",
          "value_type": "text",
          "required_for": [
            "effect_process_value_1_b76fbb43e2475d79"
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
          "input_key": "technical_assistance_request_scope",
          "label": "technical assistance request scope",
          "value_type": "text",
          "required_for": [
            "effect_process_value_1_b76fbb43e2475d79"
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
        "evidence_aa4cd62b6805247b"
      ],
      "confidence": {
        "overall": 0.38,
        "calculation": 0.38,
        "extraction": 0.9,
        "reason_codes": [
          "repair_status_bad_edge_delete_only",
          "calculation_status_no_calculable_value",
          "source_confidence_high",
          "estimate_confidence_low",
          "value_model_non_cash_process_value"
        ]
      }
    }
  ],
  "input_requirements": [
    {
      "input_key": "eligible_tribal_or_alaska_native_entity",
      "label": "eligible Tribal or Alaska Native entity",
      "value_type": "text",
      "required_for": [
        "effect_process_value_1_b76fbb43e2475d79",
        "effect_grant_expected_value_2_c767034e167ad0f6"
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
      "input_key": "technical_assistance_request_scope",
      "label": "technical assistance request scope",
      "value_type": "text",
      "required_for": [
        "effect_process_value_1_b76fbb43e2475d79"
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
      "input_key": "current_foa_topic",
      "label": "current FOA topic",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_2_c767034e167ad0f6"
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
        "effect_grant_expected_value_2_c767034e167ad0f6"
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
      "input_key": "cost_share_requirement",
      "label": "cost share requirement",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_2_c767034e167ad0f6"
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
        "effect_grant_expected_value_2_c767034e167ad0f6"
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
        "effect_grant_expected_value_2_c767034e167ad0f6"
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
      "input_key": "eligible_project_budget_cents",
      "label": "Eligible Project Budget",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_2_c767034e167ad0f6"
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
      "evidence_id": "evidence_aa4cd62b6805247b",
      "source_type": "gpt_pro_research_summary",
      "quote": "DOE Indian Energy is a competitive FOA and technical-assistance portal, not a standalone weatherization rebate.",
      "source_urls": [
        "https://www.energy.gov/indianenergy/current-funding-and-technical-assistance-opportunities",
        "https://ie-exchange.energy.gov/",
        "https://www.energy.gov/indianenergy/office-indian-energy-policy-and-programs"
      ],
      "evidence_confidence": 0.9
    },
    {
      "evidence_id": "grant_probability_repair_6c45d8811fc77a04",
      "source_type": "gpt_pro_grant_probability_repair",
      "quote": "DOE Indian Energy says financial assistance is provided on a competitive basis and lists the current Unleashing Tribal Energy Development funding opportunity; IE-Exchange lists the deadline and approximately $50 million available, and the DOE fact sheet identifies topic maximums and cost-share requirements. ([The Department of Energy's Energy.gov][6])",
      "source_urls": [
        "https://www.energy.gov/indianenergy/current-funding-and-technical-assistance-opportunities",
        "https://ie-exchange.energy.gov/",
        "https://www.energy.gov/indianenergy/articles/unleashing-tribal-energy-development-50-million-funding-opportunity",
        "https://www.energy.gov/indianenergy/office-indian-energy-policy-and-programs"
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
      "repair_status_bad_edge_delete_only",
      "calculation_status_no_calculable_value",
      "source_confidence_high",
      "estimate_confidence_low"
    ]
  },
  "current_validation_notes": [
    "effect_grant_expected_value_2_c767034e167ad0f6: missing probability_discount",
    "effect_grant_expected_value_2_c767034e167ad0f6: missing conditional_award_cents",
    "effect_grant_expected_value_2_c767034e167ad0f6: conditional award status needs_project_scope",
    "effect_grant_expected_value_2_c767034e167ad0f6: probability status evidence_not_found"
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
  "opportunityId": "SOURCE_DSIRE:dsire_program_id:918",
  "programName": "Office of Indian Energy Policy and Programs - Funding Opportunities",
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
