You are helping RetroFi finish conservative grant estimation.

Prompt 12 of 37.

Research only official or primary administrator sources when possible. Third-party summaries can be used only to find official sources, not as final support for formula/probability fields.

## Goal

Repair this grant-like v2 incentive package so Codex can calculate the grant value conservatively at runtime, or suppress it with explicit reason codes when no defensible estimate exists.

Do not make every grant estimable. If the source only says "up to", if the award is competitive with no probability evidence, if funding status is unknown, or if project-specific award approval is required, return suppressed or missing-input status.

## Current Package Context

```json
{
  "opportunity_id": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:emerging-technologies-grant",
  "program_name": "Emerging Technologies Grant",
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
      "effect_id": "effect_grant_expected_value_1_23a2e7833c383169",
      "label": "Potential grant equals approved annual kWh savings multiplied by $0.35 per kWh, subject to SVP approval, not more than 85% of total measure cost, $250,000 per customer per program year, and $500,000 annual program funding.",
      "effect_type": "grant_expected_value",
      "cash_flow_direction": "benefit",
      "timing": {
        "cadence": "one_time",
        "source_timing": "post_installation_reimbursement",
        "approval_required_before_purchase": true,
        "approval_required_before_installation": true,
        "application_deadline": null,
        "funding_status": "open_while_funds_last"
      },
      "calculation": {
        "method": "zero_when_not_applicable",
        "reason": "hybrid_rate_plus_cap is not included in automated totals without additional estimator support.",
        "source_effect_id": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:emerging-technologies-grant:0:effect_grant_expected_value_1_23a2e7833c383169",
        "grant_value_model_kind": "hybrid_rate_plus_cap",
        "cash_value_classification": "cash_grant",
        "conditional_award": {
          "status": "needs_project_scope",
          "formula_text": "Potential SVP Emerging Technologies Grant = min($0.35 × approved annual kWh savings, 85% of total measure cost, $250,000 per customer per program year), subject to SVP approval, verified savings adjustment, and the $500,000 annual program funding cap.",
          "conditional_award_cents": null,
          "min_award_cents": null,
          "max_award_cents": 25000000,
          "cost_share_percent": 0.85,
          "required_project_inputs": [
            "approved_annual_kwh_savings",
            "eligible_measure_cost_cents",
            "svp_preapproval",
            "verified_savings",
            "project_risk_adjustment",
            "program_year_funding_available"
          ],
          "calculation_trace": [
            "Multiply approved annual kWh savings by $0.35 per kWh.",
            "Limit the result to 85% of total measure cost.",
            "Apply the $250,000 per-customer program-year cap and confirm program budget remains available."
          ]
        },
        "probability_model": {
          "status": "first_come_funding_unknown",
          "probability_discount": null,
          "probability_evidence_type": "first_come_funding_unknown",
          "historical_awards_count": null,
          "historical_applications_count": null,
          "total_program_budget_cents": 50000000,
          "expected_award_count": null,
          "competition_scope": "utility_territory",
          "probability_notes": "Official materials show a formula, per-customer cap, annual program funding limit, and first-come availability until budget is expended, but no live remaining-budget balance was found."
        },
        "expected_value_recommendation": {
          "estimate_status": "needs_funding_check",
          "expected_value_cents": null,
          "estimate_confidence": "medium",
          "include_in_user_facing_total_default": false,
          "reason_codes": [
            "formula_grant",
            "missing_approved_kwh_savings",
            "missing_measure_cost",
            "first_come_funding_unknown",
            "svp_preapproval_required"
          ]
        },
        "fallback_prior_suggestion": {
          "probability_discount": null,
          "basis": "A competitive probability prior is not appropriate because the program is formula-based and budget-limited; the operational uncertainty is SVP approval, verified savings, and remaining funds.",
          "should_retro_fi_use_without_human_approval": false
        }
      },
      "caps": [
        {
          "cap_type": "maximum_amount",
          "amount": {
            "value": 250000,
            "currency": "USD"
          },
          "applies_to": "effect"
        },
        {
          "cap_type": "maximum_percent_of_cost",
          "percent": 0.85,
          "applies_to": "effect"
        }
      ],
      "required_inputs": [
        {
          "input_key": "approved_annual_kwh_savings",
          "label": "approved annual kwh savings",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_1_23a2e7833c383169"
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
          "input_key": "eligible_measure_cost",
          "label": "eligible measure cost",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_1_23a2e7833c383169"
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
          "label": "svp preapproval",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_23a2e7833c383169"
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
          "input_key": "verified_savings",
          "label": "verified savings",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_23a2e7833c383169"
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
          "input_key": "project_risk_adjustment",
          "label": "project risk adjustment",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_23a2e7833c383169"
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
          "input_key": "eligible_measure_cost_cents",
          "label": "Eligible Measure Cost",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_1_23a2e7833c383169"
          ],
          "source_precedence": [
            "quote",
            "user_profile",
            "retrofit_assumptions"
          ],
          "missing_severity": "blocks_calculation"
        },
        {
          "input_key": "program_year_funding_available",
          "label": "Program Year Funding Available",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_1_23a2e7833c383169"
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
        "evidence_b51f9dd620210659",
        "grant_probability_repair_f64ebf34a5310de0"
      ],
      "confidence": {
        "overall": 0.72,
        "calculation": 0.72,
        "extraction": 0.9,
        "reason_codes": [
          "repair_status_calculation_package_found",
          "calculation_status_calculable_with_missing_inputs",
          "source_confidence_high",
          "estimate_confidence_medium",
          "value_model_hybrid_rate_plus_cap",
          "grant_probability_repair_applied",
          "estimate_status_needs_funding_check"
        ]
      }
    }
  ],
  "input_requirements": [
    {
      "input_key": "approved_annual_kwh_savings",
      "label": "approved annual kwh savings",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_1_23a2e7833c383169"
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
      "input_key": "eligible_measure_cost",
      "label": "eligible measure cost",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_1_23a2e7833c383169"
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
      "label": "svp preapproval",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_23a2e7833c383169"
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
      "input_key": "verified_savings",
      "label": "verified savings",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_23a2e7833c383169"
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
      "input_key": "project_risk_adjustment",
      "label": "project risk adjustment",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_23a2e7833c383169"
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
      "input_key": "eligible_measure_cost_cents",
      "label": "Eligible Measure Cost",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_1_23a2e7833c383169"
      ],
      "source_precedence": [
        "quote",
        "user_profile",
        "retrofit_assumptions"
      ],
      "missing_severity": "blocks_calculation"
    },
    {
      "input_key": "program_year_funding_available",
      "label": "Program Year Funding Available",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_1_23a2e7833c383169"
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
      "evidence_id": "evidence_b51f9dd620210659",
      "source_type": "gpt_pro_research_summary",
      "quote": "SVP publishes an emerging technologies grant based on approved annual kWh savings with project-cost and program caps.",
      "source_urls": [
        "https://www.siliconvalleypower.com/businesses/rebates",
        "https://www.siliconvalleypower.com/home/showpublisheddocument/46967/638868862568870000",
        "https://www.siliconvalleypower.com/home/showpublisheddocument/5082/638917985630870000"
      ],
      "evidence_confidence": 0.9
    },
    {
      "evidence_id": "grant_probability_repair_f64ebf34a5310de0",
      "source_type": "gpt_pro_grant_probability_repair",
      "quote": "SVP lists the Emerging Technologies Grant as based on energy saved, with a maximum of 85% of project cost, up to $250,000 per customer, and a $500,000 annual program budget; the application form gives the $0.35/kWh calculation, risk and verification adjustments, and first-come availability until budget is expended. ([Silicon Valley Power][10])",
      "source_urls": [
        "https://www.siliconvalleypower.com/businesses/rebates",
        "https://www.siliconvalleypower.com/home/showpublisheddocument/46967/638868862568870000",
        "https://www.siliconvalleypower.com/home/showpublisheddocument/5082/638917985630870000"
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
    "effect_grant_expected_value_1_23a2e7833c383169: currently suppressed because method is unsupported or not applicable",
    "effect_grant_expected_value_1_23a2e7833c383169: conditional award status needs_project_scope",
    "effect_grant_expected_value_1_23a2e7833c383169: probability status first_come_funding_unknown"
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
  "opportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:emerging-technologies-grant",
  "programName": "Emerging Technologies Grant",
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
