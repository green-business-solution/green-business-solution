You are helping RetroFi finish conservative grant estimation.

Prompt 33 of 37.

Research only official or primary administrator sources when possible. Third-party summaries can be used only to find official sources, not as final support for formula/probability fields.

## Goal

Repair this grant-like v2 incentive package so Codex can calculate the grant value conservatively at runtime, or suppress it with explicit reason codes when no defensible estimate exists.

Do not make every grant estimable. If the source only says "up to", if the award is competitive with no probability evidence, if funding status is unknown, or if project-specific award approval is required, return suppressed or missing-input status.

## Current Package Context

```json
{
  "opportunity_id": "SOURCE_DSIRE:dsire_program_id:22783",
  "program_name": "Public Charger Grants",
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
      "effect_id": "effect_grant_expected_value_1_c8247b1ced6ec8db",
      "label": "Competitive RFP EM-008-2026 reimburses awardees up to 80% of total eligible project costs, capped at $200,000 per site, for public Level 2 EV charger projects. A minimum of four ports per site is required. Because awards are competitive, do not include expected value without a probability model.",
      "effect_type": "grant_expected_value",
      "cash_flow_direction": "benefit",
      "timing": {
        "cadence": "one_time",
        "source_timing": "post_installation_reimbursement",
        "approval_required_before_purchase": true,
        "approval_required_before_installation": true,
        "application_deadline": null,
        "funding_status": "open_funds_available"
      },
      "calculation": {
        "method": "expected_value",
        "probability_discount": null,
        "conditional_award_cents": null,
        "max_award_cents": 20000000,
        "grant_value_model_kind": "competitive_cost_share",
        "cash_value_classification": "reimbursement",
        "conditional_award": {
          "status": "needs_project_cost",
          "formula_text": "If selected under Efficiency Maine RFP EM-008-2026, reimbursement is the lesser of 80% of total eligible project costs or 20,000,000 cents per site for eligible public Level 2 EV charger projects with at least four ports.",
          "conditional_award_cents": null,
          "min_award_cents": null,
          "max_award_cents": 20000000,
          "cost_share_percent": 0.8,
          "required_project_inputs": [
            "eligible_project_cost_cents",
            "site_location_in_maine",
            "public_level_2_charger_design",
            "number_of_ports_at_least_4",
            "host_site_public_access_agreement",
            "award_selection"
          ],
          "calculation_trace": [
            "eligible_project_cost_cents × 0.80",
            "Apply 20,000,000-cent per-site cap."
          ]
        },
        "probability_model": {
          "status": "evidence_not_found",
          "probability_discount": null,
          "probability_evidence_type": "scoring_criteria_only",
          "historical_awards_count": null,
          "historical_applications_count": null,
          "total_program_budget_cents": 960000000,
          "expected_award_count": null,
          "competition_scope": "statewide_broad",
          "probability_notes": "RFP EM-008-2026 publishes a $9.6 million budget, scoring/award process, monthly awards, and a closing date of 12/03/2026 or until funds are committed, but does not publish expected award count, application volume, or success rate."
        },
        "expected_value_recommendation": {
          "estimate_status": "human_review_required",
          "expected_value_cents": null,
          "estimate_confidence": "low",
          "include_in_user_facing_total_default": false,
          "reason_codes": [
            "competitive_grant_no_success_rate",
            "budget_without_expected_award_count",
            "max_cap_not_expected_value"
          ]
        },
        "fallback_prior_suggestion": {
          "probability_discount": null,
          "basis": "A human-reviewed prior could be developed from proposal pipeline data or comparable Efficiency Maine EVSE RFP award rates; do not infer EV from the cap or budget alone.",
          "should_retro_fi_use_without_human_approval": false
        },
        "min_award_cents": null,
        "cost_share_percent": 0.8
      },
      "caps": [
        {
          "cap_type": "maximum_amount",
          "amount": {
            "value": 200000,
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
            "effect_grant_expected_value_1_c8247b1ced6ec8db"
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
          "input_key": "site_location_in_maine",
          "label": "site location in Maine",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_c8247b1ced6ec8db"
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
          "input_key": "public_level_2_charger_design",
          "label": "public Level 2 charger design",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_c8247b1ced6ec8db"
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
          "input_key": "number_of_ports",
          "label": "number of ports",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_c8247b1ced6ec8db"
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
          "input_key": "host_site_agreement_for_public_access_at_least_five_years",
          "label": "host-site agreement for public access at least five years",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_c8247b1ced6ec8db"
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
          "input_key": "rfp_response_score_and_award_decision",
          "label": "RFP response score and award decision",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_c8247b1ced6ec8db"
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
          "input_key": "award_probability_or_award_decision",
          "label": "award probability or award decision",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_c8247b1ced6ec8db"
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
          "input_key": "site_priority_status",
          "label": "site priority status",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_c8247b1ced6ec8db"
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
            "effect_grant_expected_value_1_c8247b1ced6ec8db"
          ],
          "source_precedence": [
            "quote",
            "user_profile",
            "retrofit_assumptions"
          ],
          "missing_severity": "blocks_calculation"
        },
        {
          "input_key": "number_of_ports_at_least_4",
          "label": "Number Of Ports At Least 4",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_1_c8247b1ced6ec8db"
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
          "input_key": "host_site_public_access_agreement",
          "label": "Host Site Public Access Agreement",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_c8247b1ced6ec8db"
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
          "input_key": "award_selection",
          "label": "Award Selection",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_1_c8247b1ced6ec8db"
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
        "evidence_b880cb5e7d77c08b",
        "grant_probability_repair_1a79b0246a2406d9"
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
      "input_key": "eligible_project_cost",
      "label": "eligible project cost",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_1_c8247b1ced6ec8db"
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
      "input_key": "site_location_in_maine",
      "label": "site location in Maine",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_c8247b1ced6ec8db"
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
      "input_key": "public_level_2_charger_design",
      "label": "public Level 2 charger design",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_c8247b1ced6ec8db"
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
      "input_key": "number_of_ports",
      "label": "number of ports",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_c8247b1ced6ec8db"
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
      "input_key": "host_site_agreement_for_public_access_at_least_five_years",
      "label": "host-site agreement for public access at least five years",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_c8247b1ced6ec8db"
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
      "input_key": "rfp_response_score_and_award_decision",
      "label": "RFP response score and award decision",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_c8247b1ced6ec8db"
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
      "input_key": "award_probability_or_award_decision",
      "label": "award probability or award decision",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_c8247b1ced6ec8db"
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
      "input_key": "site_priority_status",
      "label": "site priority status",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_c8247b1ced6ec8db"
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
        "effect_grant_expected_value_1_c8247b1ced6ec8db"
      ],
      "source_precedence": [
        "quote",
        "user_profile",
        "retrofit_assumptions"
      ],
      "missing_severity": "blocks_calculation"
    },
    {
      "input_key": "number_of_ports_at_least_4",
      "label": "Number Of Ports At Least 4",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_1_c8247b1ced6ec8db"
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
      "input_key": "host_site_public_access_agreement",
      "label": "Host Site Public Access Agreement",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_c8247b1ced6ec8db"
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
      "input_key": "award_selection",
      "label": "Award Selection",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_1_c8247b1ced6ec8db"
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
      "evidence_id": "evidence_b880cb5e7d77c08b",
      "source_type": "gpt_pro_research_summary",
      "quote": "Efficiency Maine's current opportunity funds public Level 2 EV chargers competitively; DCFC is not the current target.",
      "source_urls": [
        "https://www.efficiencymaine.com/opportunities/",
        "https://www.efficiencymaine.com/at-work/electric-vehicle-supply-equipment-initiative/",
        "https://www.efficiencymaine.com/rfp-em-008-2026/",
        "https://www.efficiencymaine.com/docs/RFP-EM-008-2026-Public-L2-EV-Chargers-EM-008-2026.pdf"
      ],
      "evidence_confidence": 0.9
    },
    {
      "evidence_id": "grant_probability_repair_1a79b0246a2406d9",
      "source_type": "gpt_pro_grant_probability_repair",
      "quote": "Efficiency Maine's RFP page/PDF state that EM-008-2026 funds public Level 2 EV chargers up to 80% of eligible costs, capped at $200,000 per site, with at least four ports per site and a $9.6 million budget.",
      "source_urls": [
        "https://www.efficiencymaine.com/opportunities/",
        "https://www.efficiencymaine.com/at-work/electric-vehicle-supply-equipment-initiative/",
        "https://www.efficiencymaine.com/rfp-em-008-2026/",
        "https://www.efficiencymaine.com/docs/RFP-EM-008-2026-Public-L2-EV-Chargers-EM-008-2026.pdf"
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
    "effect_grant_expected_value_1_c8247b1ced6ec8db: missing probability_discount",
    "effect_grant_expected_value_1_c8247b1ced6ec8db: missing conditional_award_cents",
    "effect_grant_expected_value_1_c8247b1ced6ec8db: conditional award status needs_project_cost",
    "effect_grant_expected_value_1_c8247b1ced6ec8db: probability status evidence_not_found"
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
  "opportunityId": "SOURCE_DSIRE:dsire_program_id:22783",
  "programName": "Public Charger Grants",
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
