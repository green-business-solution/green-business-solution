You are helping RetroFi finish conservative grant estimation.

Prompt 9 of 37.

Research only official or primary administrator sources when possible. Third-party summaries can be used only to find official sources, not as final support for formula/probability fields.

## Goal

Repair this grant-like v2 incentive package so Codex can calculate the grant value conservatively at runtime, or suppress it with explicit reason codes when no defensible estimate exists.

Do not make every grant estimable. If the source only says "up to", if the award is competitive with no probability evidence, if funding status is unknown, or if project-specific award approval is required, return suppressed or missing-input status.

## Current Package Context

```json
{
  "opportunity_id": "SOURCE_DSIRE:dsire_program_id:22811",
  "program_name": "Cobb Electric Membership Corporation - Business EV Charger Grant Program",
  "calculation_status": "custom_quote_estimate",
  "availability": {
    "status": "active",
    "source_access_status": "accessible_or_researched"
  },
  "retrofit_types": [
    "dc_fast_charger_installation",
    "ev_charger_installation",
    "level_2_ev_charger_installation"
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
      "effect_id": "effect_grant_expected_value_1_54a6dbe585e8fc1f",
      "label": "Cobb EMC business EV grants range from $500 to $5,000; Cobb EMC determines the award at its sole discretion based on charger classification, number of ports, installation price, and benefit to users.",
      "effect_type": "grant_expected_value",
      "cash_flow_direction": "benefit",
      "timing": {
        "cadence": "one_time",
        "source_timing": "post_installation_reimbursement",
        "approval_required_before_purchase": null,
        "approval_required_before_installation": null,
        "application_deadline": null,
        "funding_status": "open_while_funds_last"
      },
      "calculation": {
        "method": "expected_value",
        "probability_discount": null,
        "conditional_award_cents": 50000,
        "max_award_cents": 500000,
        "grant_value_model_kind": "competitive_award_range",
        "cash_value_classification": "cash_grant",
        "conditional_award": {
          "status": "not_calculable",
          "formula_text": "If Cobb EMC approves the business EV charger grant application, the award is discretionary within the published 50,000- to 500,000-cent range. Cobb EMC determines the amount based on charger classification, ports, installation price, user benefit, documentation, and funding availability.",
          "conditional_award_cents": null,
          "min_award_cents": 50000,
          "max_award_cents": 500000,
          "cost_share_percent": null,
          "required_project_inputs": [
            "cobb_emc_business_member_status",
            "charger_classification",
            "port_count",
            "installation_price",
            "site_user_benefit",
            "cobb_emc_award_determination",
            "funding_availability"
          ],
          "calculation_trace": [
            "Published minimum award is 50,000 cents.",
            "Published maximum award is 500,000 cents.",
            "No deterministic tier table or probability model is published."
          ]
        },
        "probability_model": {
          "status": "first_come_funding_unknown",
          "probability_discount": null,
          "probability_evidence_type": "first_come_funding_unknown",
          "historical_awards_count": null,
          "historical_applications_count": null,
          "total_program_budget_cents": null,
          "expected_award_count": null,
          "competition_scope": "utility_territory",
          "probability_notes": "Cobb EMC states applications are accepted until funds are exhausted and that it will notify applicants whether a grant will be awarded and in what amount. No program budget, application count, historical award count, or success rate was found."
        },
        "expected_value_recommendation": {
          "estimate_status": "human_review_required",
          "expected_value_cents": null,
          "estimate_confidence": "low",
          "include_in_user_facing_total_default": false,
          "reason_codes": [
            "discretionary_award_amount",
            "first_come_funding_unknown",
            "no_award_probability_evidence"
          ]
        },
        "fallback_prior_suggestion": {
          "probability_discount": null,
          "basis": "A low-confidence human-reviewed prior could be created from Cobb EMC budget utilization or past approvals if obtained from the utility. Do not infer expected value from the $500-$5,000 range alone.",
          "should_retro_fi_use_without_human_approval": false
        },
        "min_award_cents": 50000
      },
      "caps": [
        {
          "cap_type": "maximum_amount",
          "amount": {
            "value": 5000,
            "currency": "USD"
          },
          "applies_to": "effect"
        }
      ],
      "required_inputs": [
        {
          "input_key": "charger_classification",
          "label": "charger classification",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_54a6dbe585e8fc1f"
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
          "input_key": "port_count",
          "label": "port count",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_1_54a6dbe585e8fc1f"
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
          "input_key": "installation_price",
          "label": "installation price",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_54a6dbe585e8fc1f"
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
          "input_key": "site_user_benefit",
          "label": "site user benefit",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_54a6dbe585e8fc1f"
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
          "input_key": "cobb_emc_award_determination",
          "label": "Cobb EMC award determination",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_54a6dbe585e8fc1f"
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
          "input_key": "cobb_emc_business_member_status",
          "label": "Cobb Emc Business Member Status",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_54a6dbe585e8fc1f"
          ],
          "source_precedence": [
            "user_profile",
            "program_application",
            "admin_review"
          ],
          "missing_severity": "blocks_calculation"
        },
        {
          "input_key": "funding_availability",
          "label": "Funding Availability",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_1_54a6dbe585e8fc1f"
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
        "evidence_2e856a3290a1d090",
        "grant_probability_repair_7e095ed56441e6ae"
      ],
      "confidence": {
        "overall": 0.38,
        "calculation": 0.38,
        "extraction": 0.9,
        "reason_codes": [
          "repair_status_custom_quote_required",
          "calculation_status_custom_quote_estimate",
          "source_confidence_high",
          "estimate_confidence_low",
          "value_model_competitive_award_range",
          "grant_probability_repair_applied",
          "estimate_status_human_review_required"
        ]
      }
    }
  ],
  "input_requirements": [
    {
      "input_key": "charger_classification",
      "label": "charger classification",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_54a6dbe585e8fc1f"
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
      "input_key": "port_count",
      "label": "port count",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_1_54a6dbe585e8fc1f"
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
      "input_key": "installation_price",
      "label": "installation price",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_54a6dbe585e8fc1f"
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
      "input_key": "site_user_benefit",
      "label": "site user benefit",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_54a6dbe585e8fc1f"
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
      "input_key": "cobb_emc_award_determination",
      "label": "Cobb EMC award determination",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_54a6dbe585e8fc1f"
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
      "input_key": "cobb_emc_business_member_status",
      "label": "Cobb Emc Business Member Status",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_54a6dbe585e8fc1f"
      ],
      "source_precedence": [
        "user_profile",
        "program_application",
        "admin_review"
      ],
      "missing_severity": "blocks_calculation"
    },
    {
      "input_key": "funding_availability",
      "label": "Funding Availability",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_1_54a6dbe585e8fc1f"
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
      "evidence_id": "evidence_2e856a3290a1d090",
      "source_type": "gpt_pro_research_summary",
      "quote": "Cobb EMC business EV charger grants range from $500 to $5,000, but final award is discretionary and cannot be deterministically estimated.",
      "source_urls": [
        "https://www.cobbemc.com/ev-charging-business",
        "https://www.cobbemc.com/sites/default/files/documents/ev/EVGrantApplicationFinal.pdf",
        "https://www.cobbemc.com/sites/default/files/documents/ev/Program%20Requirements%20and%20Acknowledgements.pdf"
      ],
      "evidence_confidence": 0.9
    },
    {
      "evidence_id": "grant_probability_repair_7e095ed56441e6ae",
      "source_type": "gpt_pro_grant_probability_repair",
      "quote": "Cobb EMC's official business EV charging materials state that business EV charger grants range from $500 to $5,000, applications are accepted until funds are exhausted, and Cobb EMC determines whether a grant is awarded and the amount.",
      "source_urls": [
        "https://www.cobbemc.com/ev-charging-business",
        "https://www.cobbemc.com/sites/default/files/documents/ev/EVGrantApplicationFinal.pdf",
        "https://www.cobbemc.com/sites/default/files/documents/ev/Program%20Requirements%20and%20Acknowledgements.pdf"
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
    "effect_grant_expected_value_1_54a6dbe585e8fc1f: missing probability_discount",
    "effect_grant_expected_value_1_54a6dbe585e8fc1f: conditional award status not_calculable",
    "effect_grant_expected_value_1_54a6dbe585e8fc1f: probability status first_come_funding_unknown"
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
  "opportunityId": "SOURCE_DSIRE:dsire_program_id:22811",
  "programName": "Cobb Electric Membership Corporation - Business EV Charger Grant Program",
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
