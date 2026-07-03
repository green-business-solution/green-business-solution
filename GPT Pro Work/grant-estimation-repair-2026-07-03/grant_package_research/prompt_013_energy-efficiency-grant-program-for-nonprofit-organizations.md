You are helping RetroFi finish conservative grant estimation.

Prompt 13 of 37.

Research only official or primary administrator sources when possible. Third-party summaries can be used only to find official sources, not as final support for formula/probability fields.

## Goal

Repair this grant-like v2 incentive package so Codex can calculate the grant value conservatively at runtime, or suppress it with explicit reason codes when no defensible estimate exists.

Do not make every grant estimable. If the source only says "up to", if the award is competitive with no probability evidence, if funding status is unknown, or if project-specific award approval is required, return suppressed or missing-input status.

## Current Package Context

```json
{
  "opportunity_id": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:energy-efficiency-grant-program-for-nonprofit-organizations",
  "program_name": "Energy Efficiency Grant Program for Nonprofit Organizations",
  "calculation_status": "calculable_with_missing_inputs",
  "availability": {
    "status": "active",
    "source_access_status": "accessible_or_researched"
  },
  "retrofit_types": [
    "air_sealing_weatherization",
    "high_efficiency_hvac_replacement",
    "led_lighting_retrofit"
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
      "effect_id": "effect_grant_expected_value_1_6f580262ed2e24cd",
      "label": "Grant can fund up to 80% of eligible electricity-saving project cost, capped at $25,000 for a single project; award is application-based and not an expected cash estimate without award probability.",
      "effect_type": "grant_expected_value",
      "cash_flow_direction": "benefit",
      "timing": {
        "cadence": "custom",
        "source_timing": "application_process",
        "approval_required_before_purchase": true,
        "approval_required_before_installation": true,
        "application_deadline": "June 30 and December 31 application periods",
        "funding_status": "open_while_funds_last"
      },
      "calculation": {
        "method": "percent_of_cost",
        "percent": 0.8,
        "cost_input": "eligible_project_cost_cents",
        "grant_value_model_kind": "capped_percent_of_eligible_cost",
        "cash_value_classification": "cash_grant",
        "conditional_award": {
          "status": "needs_project_cost",
          "formula_text": "For eligible nonprofit electricity-saving projects, SVP may grant up to 80% of eligible project cost, capped at $25,000 for a single project; applicant must provide the remaining 20% matching funds and receive approval through the application process.",
          "conditional_award_cents": null,
          "min_award_cents": null,
          "max_award_cents": 2500000,
          "cost_share_percent": 0.8,
          "required_project_inputs": [
            "eligible_project_cost_cents",
            "project_scope",
            "estimated_electricity_savings",
            "nonprofit_status",
            "svp_customer_of_record_status",
            "application_period",
            "svp_preapproval",
            "svp_award_decision"
          ],
          "calculation_trace": [
            "Confirm nonprofit and SVP customer eligibility.",
            "Confirm eligible electricity-saving project scope and estimated savings.",
            "Calculate 80% of eligible cost and apply the $25,000 single-project cap; award requires SVP application approval."
          ]
        },
        "probability_model": {
          "status": "evidence_not_found",
          "probability_discount": null,
          "probability_evidence_type": "eligibility_only",
          "historical_awards_count": null,
          "historical_applications_count": null,
          "total_program_budget_cents": null,
          "expected_award_count": null,
          "competition_scope": "utility_territory",
          "probability_notes": "Official materials provide the formula, cap, deadlines, and approval workflow, but no historical application count, success rate, expected award count, or available-funds confirmation was found."
        },
        "expected_value_recommendation": {
          "estimate_status": "suppressed",
          "expected_value_cents": null,
          "estimate_confidence": "low",
          "include_in_user_facing_total_default": false,
          "reason_codes": [
            "application_based_grant",
            "no_probability_evidence",
            "missing_project_cost",
            "svp_award_decision_required"
          ]
        },
        "fallback_prior_suggestion": {
          "probability_discount": null,
          "basis": "A human-reviewed prior could be considered for this application-based utility-territory grant, but official evidence does not support automated probability discounting.",
          "should_retro_fi_use_without_human_approval": false
        }
      },
      "caps": [
        {
          "cap_type": "maximum_amount",
          "amount": {
            "value": 25000,
            "currency": "USD"
          },
          "applies_to": "effect"
        },
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
            "effect_grant_expected_value_1_6f580262ed2e24cd"
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
          "input_key": "project_scope",
          "label": "project scope",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_6f580262ed2e24cd"
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
          "input_key": "estimated_electricity_savings",
          "label": "estimated electricity savings",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_6f580262ed2e24cd"
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
            "effect_grant_expected_value_1_6f580262ed2e24cd"
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
          "input_key": "svp_customer_of_record_status",
          "label": "SVP customer of record status",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_6f580262ed2e24cd"
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
          "input_key": "application_period",
          "label": "application period",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_6f580262ed2e24cd"
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
          "input_key": "svp_preapproval",
          "label": "SVP preapproval",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_6f580262ed2e24cd"
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
          "input_key": "svp_award_decision",
          "label": "SVP award decision",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_6f580262ed2e24cd"
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
          "label": "Eligible Project Cost",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_1_6f580262ed2e24cd"
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
        "evidence_ea48566b4319cb92",
        "grant_probability_repair_b0442ad2f8c31281"
      ],
      "confidence": {
        "overall": 0.38,
        "calculation": 0.38,
        "extraction": 0.9,
        "reason_codes": [
          "repair_status_calculation_package_found",
          "calculation_status_calculable_with_missing_inputs",
          "source_confidence_high",
          "estimate_confidence_medium",
          "value_model_capped_percent_of_eligible_cost",
          "grant_probability_repair_applied",
          "estimate_confidence_low",
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
        "effect_grant_expected_value_1_6f580262ed2e24cd"
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
      "input_key": "project_scope",
      "label": "project scope",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_6f580262ed2e24cd"
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
      "input_key": "estimated_electricity_savings",
      "label": "estimated electricity savings",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_6f580262ed2e24cd"
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
        "effect_grant_expected_value_1_6f580262ed2e24cd"
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
      "input_key": "svp_customer_of_record_status",
      "label": "SVP customer of record status",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_6f580262ed2e24cd"
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
      "input_key": "application_period",
      "label": "application period",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_6f580262ed2e24cd"
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
      "input_key": "svp_preapproval",
      "label": "SVP preapproval",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_6f580262ed2e24cd"
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
      "input_key": "svp_award_decision",
      "label": "SVP award decision",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_6f580262ed2e24cd"
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
      "label": "Eligible Project Cost",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_1_6f580262ed2e24cd"
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
      "evidence_id": "evidence_ea48566b4319cb92",
      "source_type": "gpt_pro_research_summary",
      "quote": "The legacy $250,000 cap was corrected to $25,000 for the nonprofit energy efficiency grant.",
      "source_urls": [
        "https://www.siliconvalleypower.com/businesses/rebates",
        "https://www.siliconvalleypower.com/home/showpublisheddocument/65401/638892913182770000"
      ],
      "evidence_confidence": 0.9
    },
    {
      "evidence_id": "grant_probability_repair_b0442ad2f8c31281",
      "source_type": "gpt_pro_grant_probability_repair",
      "quote": "SVP's business rebates page and nonprofit energy-efficiency grant application state that qualifying nonprofits may receive up to 80% of eligible electricity-saving project cost, capped at $25,000 for a single project, with 20% matching funds and periodic application deadlines. ([Silicon Valley Power][10])",
      "source_urls": [
        "https://www.siliconvalleypower.com/businesses/rebates",
        "https://www.siliconvalleypower.com/home/showpublisheddocument/65401/638892913182770000"
      ],
      "evidence_confidence": 0.9
    }
  ],
  "confidence": {
    "overall": 0.72,
    "source_access": 0.9,
    "availability": 0.9,
    "calculation": 0.72,
    "extraction": 0.9,
    "reason_codes": [
      "repair_status_calculation_package_found",
      "calculation_status_calculable_with_missing_inputs",
      "source_confidence_high",
      "estimate_confidence_medium"
    ]
  },
  "current_validation_notes": [
    "effect_grant_expected_value_1_6f580262ed2e24cd: conditional award status needs_project_cost",
    "effect_grant_expected_value_1_6f580262ed2e24cd: probability status evidence_not_found"
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
  "opportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:energy-efficiency-grant-program-for-nonprofit-organizations",
  "programName": "Energy Efficiency Grant Program for Nonprofit Organizations",
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
