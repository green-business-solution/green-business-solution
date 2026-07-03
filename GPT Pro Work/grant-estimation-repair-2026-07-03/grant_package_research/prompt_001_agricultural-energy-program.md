You are helping RetroFi finish conservative grant estimation.

Prompt 1 of 37.

Research only official or primary administrator sources when possible. Third-party summaries can be used only to find official sources, not as final support for formula/probability fields.

## Goal

Repair this grant-like v2 incentive package so Codex can calculate the grant value conservatively at runtime, or suppress it with explicit reason codes when no defensible estimate exists.

Do not make every grant estimable. If the source only says "up to", if the award is competitive with no probability evidence, if funding status is unknown, or if project-specific award approval is required, return suppressed or missing-input status.

## Current Package Context

```json
{
  "opportunity_id": "SOURCE_DSIRE:dsire_program_id:21861",
  "program_name": "Agricultural Energy Program",
  "calculation_status": "no_calculable_value",
  "availability": {
    "status": "active",
    "source_access_status": "accessible_or_researched"
  },
  "retrofit_types": [
    "battery_storage_system",
    "biomass_biogas_energy_system",
    "high_efficiency_hvac_replacement",
    "insulation_upgrade",
    "led_lighting_retrofit",
    "solar_water_heating_system"
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
      "effect_id": "effect_grant_expected_value_1_d2ac4b4734cc8f4f",
      "label": "Competitive agricultural energy grants may cover eligible project costs up to a $20,000 award, with at least 10% applicant cost share. Do not estimate an expected grant without award-probability evidence.",
      "effect_type": "grant_expected_value",
      "cash_flow_direction": "benefit",
      "timing": {
        "cadence": "one_time",
        "source_timing": "post_installation_reimbursement",
        "approval_required_before_purchase": true,
        "approval_required_before_installation": true,
        "application_deadline": "2026-11-06",
        "funding_status": "open_while_funds_last"
      },
      "calculation": {
        "method": "expected_value",
        "probability_discount": null,
        "conditional_award_cents": null,
        "max_award_cents": 2000000,
        "grant_value_model_kind": "competitive_cost_share",
        "cash_value_classification": "reimbursement",
        "conditional_award": {
          "status": "needs_project_cost",
          "formula_text": "Rhode Island OER Agricultural Energy Program grant. Applicant must provide at least 10% cost share; maximum award is $20,000. Conditional award is up to 90% of eligible project cost, capped at $20,000, if the application is selected and approved. Energy audits are required for some projects but are not reimbursable project costs.",
          "conditional_award_cents": null,
          "min_award_cents": null,
          "max_award_cents": 2000000,
          "cost_share_percent": 0.9,
          "required_project_inputs": [
            "eligible_project_cost",
            "applicant_cost_share",
            "measure_type",
            "agricultural_energy_audit_status",
            "application_score_or_award_decision"
          ],
          "calculation_trace": [
            "Official RI OER page states grants are up to $20,000.",
            "Official guidance states at least 10% applicant cost share.",
            "Award if approved is no more than min(90% of eligible project cost, $20,000).",
            "Guidance states applications are reviewed, ranked, and grants are made from highest to lowest ranking."
          ]
        },
        "probability_model": {
          "status": "evidence_not_found",
          "probability_discount": null,
          "probability_evidence_type": "scoring_criteria_only",
          "historical_awards_count": null,
          "historical_applications_count": null,
          "total_program_budget_cents": null,
          "expected_award_count": null,
          "competition_scope": "sector_specific",
          "probability_notes": "Official guidance provides ranking criteria, a rolling application deadline, a $20,000 maximum award, and a statement that grants are not guaranteed, but no application count, award count, total budget, expected awards, or historical success rate was found."
        },
        "expected_value_recommendation": {
          "estimate_status": "human_review_required",
          "expected_value_cents": null,
          "estimate_confidence": "low",
          "include_in_user_facing_total_default": false,
          "reason_codes": [
            "competitive_grant",
            "conditional_cap_found",
            "project_cost_required",
            "probability_evidence_not_found"
          ]
        },
        "fallback_prior_suggestion": {
          "probability_discount": 0.2,
          "basis": "Low-confidence human-review prior for a sector-specific state agricultural energy grant with small award cap and unknown applicant volume.",
          "should_retro_fi_use_without_human_approval": false
        },
        "min_award_cents": null,
        "cost_share_percent": 0.9
      },
      "caps": [
        {
          "cap_type": "maximum_amount",
          "amount": {
            "value": 20000,
            "currency": "USD"
          },
          "applies_to": "effect"
        },
        {
          "cap_type": "maximum_percent_of_cost",
          "percent": 0.9,
          "applies_to": "effect"
        }
      ],
      "required_inputs": [
        {
          "input_key": "eligible_project_cost",
          "label": "eligible project cost",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_1_d2ac4b4734cc8f4f"
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
          "input_key": "applicant_cost_share",
          "label": "applicant cost share",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_1_d2ac4b4734cc8f4f"
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
          "input_key": "measure_type",
          "label": "measure type",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_d2ac4b4734cc8f4f"
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
          "input_key": "agricultural_energy_audit_status",
          "label": "agricultural energy audit status",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_d2ac4b4734cc8f4f"
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
          "input_key": "application_score_or_award_decision",
          "label": "application score or award decision",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_d2ac4b4734cc8f4f"
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
            "effect_grant_expected_value_1_d2ac4b4734cc8f4f"
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
        "evidence_650b5392cce87724",
        "grant_probability_repair_13af77678dd4b7a7"
      ],
      "confidence": {
        "overall": 0.38,
        "calculation": 0.38,
        "extraction": 0.9,
        "reason_codes": [
          "repair_status_calculation_package_found",
          "calculation_status_no_calculable_value",
          "source_confidence_high",
          "estimate_confidence_low",
          "value_model_competitive_max_only",
          "grant_probability_repair_applied",
          "value_model_competitive_cost_share",
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
        "effect_grant_expected_value_1_d2ac4b4734cc8f4f"
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
      "input_key": "applicant_cost_share",
      "label": "applicant cost share",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_1_d2ac4b4734cc8f4f"
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
      "input_key": "measure_type",
      "label": "measure type",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_d2ac4b4734cc8f4f"
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
      "input_key": "agricultural_energy_audit_status",
      "label": "agricultural energy audit status",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_d2ac4b4734cc8f4f"
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
      "input_key": "application_score_or_award_decision",
      "label": "application score or award decision",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_d2ac4b4734cc8f4f"
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
        "effect_grant_expected_value_1_d2ac4b4734cc8f4f"
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
      "evidence_id": "evidence_650b5392cce87724",
      "source_type": "gpt_pro_research_summary",
      "quote": "RI OER supports agricultural energy efficiency and renewable grants up to $20,000, but awards are competitive and audits are not reimbursable project costs.",
      "source_urls": [
        "https://energy.ri.gov/energy-efficiency/farm-energy-programs",
        "https://energy.ri.gov/sites/g/files/xkgbur741/files/2026-06/Farm%20Energy%20Program%20Guidance%20Doc%20V4.pdf",
        "https://energy.ri.gov/energy-efficiency/farm-energy-programs/agricultural-energy-audits"
      ],
      "evidence_confidence": 0.9
    },
    {
      "evidence_id": "grant_probability_repair_13af77678dd4b7a7",
      "source_type": "gpt_pro_grant_probability_repair",
      "quote": "Rhode Island OER materials state Agricultural Energy Program grants are up to $20,000, require at least 10% applicant cost share, are reviewed and ranked competitively, and are not guaranteed.",
      "source_urls": [
        "https://energy.ri.gov/energy-efficiency/farm-energy-programs",
        "https://energy.ri.gov/sites/g/files/xkgbur741/files/2026-06/Farm%20Energy%20Program%20Guidance%20Doc%20V4.pdf",
        "https://energy.ri.gov/energy-efficiency/farm-energy-programs/agricultural-energy-audits"
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
      "calculation_status_no_calculable_value",
      "source_confidence_high",
      "estimate_confidence_low"
    ]
  },
  "current_validation_notes": [
    "effect_grant_expected_value_1_d2ac4b4734cc8f4f: missing probability_discount",
    "effect_grant_expected_value_1_d2ac4b4734cc8f4f: missing conditional_award_cents",
    "effect_grant_expected_value_1_d2ac4b4734cc8f4f: conditional award status needs_project_cost",
    "effect_grant_expected_value_1_d2ac4b4734cc8f4f: probability status evidence_not_found"
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
  "opportunityId": "SOURCE_DSIRE:dsire_program_id:21861",
  "programName": "Agricultural Energy Program",
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
