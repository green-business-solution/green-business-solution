You are helping RetroFi finish conservative grant estimation.

Prompt 7 of 37.

Research only official or primary administrator sources when possible. Third-party summaries can be used only to find official sources, not as final support for formula/probability fields.

## Goal

Repair this grant-like v2 incentive package so Codex can calculate the grant value conservatively at runtime, or suppress it with explicit reason codes when no defensible estimate exists.

Do not make every grant estimable. If the source only says "up to", if the award is competitive with no probability evidence, if funding status is unknown, or if project-specific award approval is required, return suppressed or missing-input status.

## Current Package Context

```json
{
  "opportunity_id": "SOURCE_DSIRE:dsire_program_id:1774",
  "program_name": "City of Tallahassee Utilities - Grant Programs",
  "calculation_status": "calculable_with_missing_inputs",
  "availability": {
    "status": "active",
    "source_access_status": "accessible_or_researched"
  },
  "retrofit_types": [
    "insulation_upgrade"
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
      "effect_id": "effect_one_time_savings_1_6485f6750d0228c1",
      "label": "After a required City of Tallahassee home energy audit and approved-contractor installation, standard ceiling insulation grants cover 80% of installed cost up to $400; low-income grants cover 100% of installed cost up to $500.",
      "effect_type": "one_time_savings",
      "cash_flow_direction": "benefit",
      "timing": {
        "cadence": "one_time",
        "source_timing": "post_installation_reimbursement",
        "approval_required_before_purchase": true,
        "approval_required_before_installation": true,
        "application_deadline": null,
        "funding_status": "unknown"
      },
      "calculation": {
        "method": "rate_table",
        "rate_table_id": "tallahassee_ceiling_insulation_grant_tiers",
        "lookup_inputs": [
          "applicant_tier"
        ],
        "grant_value_model_kind": "capped_percent_of_eligible_cost",
        "cash_value_classification": "cash_grant",
        "conditional_award": {
          "status": "needs_project_cost",
          "formula_text": "Ceiling insulation grant after required City home energy audit and approved-contractor installation. Standard grant pays 80% of installed cost up to $400. Low-income grant pays 100% of installed cost up to $500. Total installed cost must be at least $500 and the work must meet City material and audit requirements.",
          "conditional_award_cents": null,
          "min_award_cents": null,
          "max_award_cents": 50000,
          "cost_share_percent": null,
          "required_project_inputs": [
            "installed_insulation_cost",
            "standard_or_low_income_grant_tier",
            "audit_result",
            "approved_contractor",
            "material_type",
            "target_r_value"
          ],
          "calculation_trace": [
            "For standard tier: award = min(0.80 * installed_insulation_cost, $400).",
            "For low-income tier: award = min(1.00 * installed_insulation_cost, $500).",
            "Grant requires a City home energy audit before installation.",
            "Grant requires City-approved contractor and eligible ceiling or attic insulation materials."
          ]
        },
        "probability_model": {
          "status": "not_required_deterministic",
          "probability_discount": null,
          "probability_evidence_type": "not_required",
          "historical_awards_count": null,
          "historical_applications_count": null,
          "total_program_budget_cents": null,
          "expected_award_count": null,
          "competition_scope": "narrow_local",
          "probability_notes": "Published grant formula is deterministic for eligible customers after required audit, approved contractor, and eligible installation. No competitive probability discount is required."
        },
        "expected_value_recommendation": {
          "estimate_status": "needs_quote",
          "expected_value_cents": null,
          "estimate_confidence": "high",
          "include_in_user_facing_total_default": false,
          "reason_codes": [
            "deterministic_formula",
            "installed_cost_required",
            "audit_required",
            "tier_required"
          ]
        },
        "fallback_prior_suggestion": {
          "probability_discount": null,
          "basis": "No fallback prior needed because the grant is formula-based for eligible projects.",
          "should_retro_fi_use_without_human_approval": false
        }
      },
      "caps": [
        {
          "cap_type": "maximum_amount",
          "amount": {
            "value": 500,
            "currency": "USD"
          },
          "applies_to": "effect"
        },
        {
          "cap_type": "maximum_percent_of_cost",
          "percent": 1,
          "applies_to": "effect"
        }
      ],
      "required_inputs": [
        {
          "input_key": "installed_insulation_cost",
          "label": "installed insulation cost",
          "value_type": "number",
          "required_for": [
            "effect_one_time_savings_1_6485f6750d0228c1"
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
          "input_key": "standard_or_low_income_grant_tier",
          "label": "standard or low income grant tier",
          "value_type": "text",
          "required_for": [
            "effect_one_time_savings_1_6485f6750d0228c1"
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
          "input_key": "audit_result",
          "label": "audit result",
          "value_type": "text",
          "required_for": [
            "effect_one_time_savings_1_6485f6750d0228c1"
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
          "input_key": "approved_contractor",
          "label": "approved contractor",
          "value_type": "text",
          "required_for": [
            "effect_one_time_savings_1_6485f6750d0228c1"
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
          "input_key": "material_type",
          "label": "material type",
          "value_type": "text",
          "required_for": [
            "effect_one_time_savings_1_6485f6750d0228c1"
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
          "input_key": "target_r_value",
          "label": "target R value",
          "value_type": "text",
          "required_for": [
            "effect_one_time_savings_1_6485f6750d0228c1"
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
          "input_key": "installed_cost",
          "label": "installed cost",
          "value_type": "number",
          "required_for": [
            "effect_one_time_savings_1_6485f6750d0228c1"
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
          "input_key": "grant_tier",
          "label": "grant tier",
          "value_type": "text",
          "required_for": [
            "effect_one_time_savings_1_6485f6750d0228c1"
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
        "evidence_462d1777ce068b8c",
        "grant_probability_repair_410bf0da36e00af0"
      ],
      "confidence": {
        "overall": 0.9,
        "calculation": 0.9,
        "extraction": 0.9,
        "reason_codes": [
          "repair_status_calculation_package_found",
          "calculation_status_calculable_with_missing_inputs",
          "source_confidence_high",
          "estimate_confidence_high",
          "value_model_rate_table",
          "grant_probability_repair_applied",
          "value_model_capped_percent_of_eligible_cost",
          "estimate_status_needs_quote"
        ]
      }
    }
  ],
  "rate_tables": [
    {
      "table_id": "tallahassee_ceiling_insulation_grant_tiers",
      "name": "tallahassee_ceiling_insulation_grant_tiers",
      "dimensions": [
        "applicant_tier"
      ],
      "rows": [
        {
          "applicantTier": "standard",
          "percentOfInstalledCost": 0.8,
          "maxAmountCents": 40000
        },
        {
          "applicantTier": "low_income",
          "percentOfInstalledCost": 1,
          "maxAmountCents": 50000
        }
      ]
    }
  ],
  "input_requirements": [
    {
      "input_key": "installed_insulation_cost",
      "label": "installed insulation cost",
      "value_type": "number",
      "required_for": [
        "effect_one_time_savings_1_6485f6750d0228c1"
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
      "input_key": "standard_or_low_income_grant_tier",
      "label": "standard or low income grant tier",
      "value_type": "text",
      "required_for": [
        "effect_one_time_savings_1_6485f6750d0228c1"
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
      "input_key": "audit_result",
      "label": "audit result",
      "value_type": "text",
      "required_for": [
        "effect_one_time_savings_1_6485f6750d0228c1"
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
      "input_key": "approved_contractor",
      "label": "approved contractor",
      "value_type": "text",
      "required_for": [
        "effect_one_time_savings_1_6485f6750d0228c1"
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
      "input_key": "material_type",
      "label": "material type",
      "value_type": "text",
      "required_for": [
        "effect_one_time_savings_1_6485f6750d0228c1"
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
      "input_key": "target_r_value",
      "label": "target R value",
      "value_type": "text",
      "required_for": [
        "effect_one_time_savings_1_6485f6750d0228c1"
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
      "input_key": "installed_cost",
      "label": "installed cost",
      "value_type": "number",
      "required_for": [
        "effect_one_time_savings_1_6485f6750d0228c1"
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
      "input_key": "grant_tier",
      "label": "grant tier",
      "value_type": "text",
      "required_for": [
        "effect_one_time_savings_1_6485f6750d0228c1"
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
      "evidence_id": "evidence_462d1777ce068b8c",
      "source_type": "gpt_pro_research_summary",
      "quote": "Tallahassee supports only attic or ceiling insulation grants after an energy audit, with cost-share tiers by income status and strict material exclusions.",
      "source_urls": [
        "https://www.talgov.com/you/you-products-home-ceiling-insulation",
        "https://www.talgov.com/you/you-products-home-energy-audit"
      ],
      "evidence_confidence": 0.9
    },
    {
      "evidence_id": "grant_probability_repair_410bf0da36e00af0",
      "source_type": "gpt_pro_grant_probability_repair",
      "quote": "City of Tallahassee ceiling insulation page states that the standard grant covers 80% up to $400 and the low-income grant covers 100% up to $500, after a City energy audit and approved-contractor installation.",
      "source_urls": [
        "https://www.talgov.com/you/you-products-home-ceiling-insulation",
        "https://www.talgov.com/you/you-products-home-energy-audit"
      ],
      "evidence_confidence": 0.9
    }
  ],
  "confidence": {
    "overall": 0.9,
    "source_access": 0.9,
    "availability": 0.9,
    "calculation": 0.9,
    "extraction": 0.9,
    "reason_codes": [
      "repair_status_calculation_package_found",
      "calculation_status_calculable_with_missing_inputs",
      "source_confidence_high",
      "estimate_confidence_high"
    ]
  }
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
  "opportunityId": "SOURCE_DSIRE:dsire_program_id:1774",
  "programName": "City of Tallahassee Utilities - Grant Programs",
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
