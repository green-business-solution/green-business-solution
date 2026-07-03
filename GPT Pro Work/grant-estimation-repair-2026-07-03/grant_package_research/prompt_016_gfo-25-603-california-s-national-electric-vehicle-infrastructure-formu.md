You are helping RetroFi finish conservative grant estimation.

Prompt 16 of 37.

Research only official or primary administrator sources when possible. Third-party summaries can be used only to find official sources, not as final support for formula/probability fields.

## Goal

Repair this grant-like v2 incentive package so Codex can calculate the grant value conservatively at runtime, or suppress it with explicit reason codes when no defensible estimate exists.

Do not make every grant estimable. If the source only says "up to", if the award is competitive with no probability evidence, if funding status is unknown, or if project-specific award approval is required, return suppressed or missing-input status.

## Current Package Context

```json
{
  "opportunity_id": "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-603",
  "program_name": "GFO-25-603 - California's National Electric Vehicle Infrastructure Formula Program - Solicitation 6 Community Charging",
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
      "effect_id": "effect_grant_expected_value_1_42355de1814a8757",
      "label": "Competitive CEC grant can fund publicly accessible high-powered DC fast charging projects; grant request is capped at 80% of allowable project cost and requires exactly 20% match, with $79,000,000 total solicitation funding and a $27,650,000 maximum grant per applicant.",
      "effect_type": "grant_expected_value",
      "cash_flow_direction": "benefit",
      "timing": {
        "cadence": "custom",
        "source_timing": "application_process",
        "approval_required_before_purchase": true,
        "approval_required_before_installation": true,
        "application_deadline": "2026-10-16",
        "funding_status": "open_funds_available"
      },
      "calculation": {
        "method": "expected_value",
        "probability_discount": null,
        "conditional_award_cents": null,
        "max_award_cents": 2765000000,
        "grant_value_model_kind": "competitive_cost_share",
        "cash_value_classification": "cash_grant",
        "conditional_award": {
          "status": "needs_project_cost",
          "formula_text": "Conditional award is the approved grant request for eligible publicly accessible DC fast charging projects, capped at 80% of allowable project cost, requiring exactly 20% match, and further capped at the lesser of 35% of total solicitation funding or $27,650,000 per applicant. Applications are ranked by cost per CCS port and funded until funds are exhausted.",
          "conditional_award_cents": null,
          "min_award_cents": null,
          "max_award_cents": 2765000000,
          "cost_share_percent": 0.8,
          "required_project_inputs": [
            "allowable_project_cost",
            "requested_grant_amount",
            "match_funding_amount",
            "number_of_ccs_ports",
            "cost_per_ccs_port",
            "award_selection_status"
          ],
          "calculation_trace": [
            "Official solicitation page states up to $79,000,000 is available.",
            "Pre-application materials state 80% grant share and 20% match.",
            "Applicant cap is 35% of $79,000,000, which equals $27,650,000.",
            "Conditional award is min(requested grant, 80% of allowable project cost, $27,650,000), if selected and approved."
          ]
        },
        "probability_model": {
          "status": "evidence_not_found",
          "probability_discount": null,
          "probability_evidence_type": "scoring_criteria_only",
          "historical_awards_count": null,
          "historical_applications_count": null,
          "total_program_budget_cents": 7900000000,
          "expected_award_count": null,
          "competition_scope": "statewide_broad",
          "probability_notes": "Official materials identify available budget and the ranking mechanism, but not expected number of awards, historical applications, or a success rate. Cost-per-port ranking is not a probability estimate."
        },
        "expected_value_recommendation": {
          "estimate_status": "human_review_required",
          "expected_value_cents": null,
          "estimate_confidence": "low",
          "include_in_user_facing_total_default": false,
          "reason_codes": [
            "competitive_grant",
            "project_cost_required",
            "probability_evidence_not_found",
            "ranking_rule_not_probability"
          ]
        },
        "fallback_prior_suggestion": {
          "probability_discount": 0.15,
          "basis": "Low-confidence human-review prior for a large statewide competitive EV charging solicitation with substantial budget but unknown applicant volume.",
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
          "input_key": "allowable_project_cost",
          "label": "allowable project cost",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_1_42355de1814a8757"
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
            "effect_grant_expected_value_1_42355de1814a8757"
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
          "input_key": "match_funding_amount",
          "label": "match funding amount",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_1_42355de1814a8757"
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
          "input_key": "number_of_dcfc_ports",
          "label": "number of dcfc ports",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_42355de1814a8757"
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
          "input_key": "cost_per_ccs_port",
          "label": "cost per ccs port",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_1_42355de1814a8757"
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
            "effect_grant_expected_value_1_42355de1814a8757"
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
          "input_key": "number_of_ccs_ports",
          "label": "Number Of Ccs Ports",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_1_42355de1814a8757"
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
        "evidence_017f60f9ba29b179",
        "grant_probability_repair_8650a8fea1c316ff"
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
      "input_key": "allowable_project_cost",
      "label": "allowable project cost",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_1_42355de1814a8757"
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
        "effect_grant_expected_value_1_42355de1814a8757"
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
      "input_key": "match_funding_amount",
      "label": "match funding amount",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_1_42355de1814a8757"
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
      "input_key": "number_of_dcfc_ports",
      "label": "number of dcfc ports",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_42355de1814a8757"
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
      "input_key": "cost_per_ccs_port",
      "label": "cost per ccs port",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_1_42355de1814a8757"
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
        "effect_grant_expected_value_1_42355de1814a8757"
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
      "input_key": "number_of_ccs_ports",
      "label": "Number Of Ccs Ports",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_1_42355de1814a8757"
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
      "evidence_id": "evidence_017f60f9ba29b179",
      "source_type": "gpt_pro_research_summary",
      "quote": "GFO-25-603 is an active competitive CEC grant for public high-powered DC fast charging with a posted October 16, 2026 deadline.",
      "source_urls": [
        "https://www.energy.ca.gov/solicitations/2026-02/gfo-25-603-californias-national-electric-vehicle-infrastructure-formula",
        "https://www.energy.ca.gov/sites/default/files/2026-03/GFO-25-603_NEVI_6_Pre-Application_Workshop_Slides_ADA.pdf",
        "https://ecams.energy.ca.gov/s/login/",
        "https://www.energy.ca.gov/programs-and-topics/programs/federal-ev-infrastructure-programs"
      ],
      "evidence_confidence": 0.9
    },
    {
      "evidence_id": "grant_probability_repair_8650a8fea1c316ff",
      "source_type": "gpt_pro_grant_probability_repair",
      "quote": "Official CEC materials state that GFO-25-603 has up to $79,000,000 available, an October 16, 2026 deadline, an 80% allowable-cost grant share, a 20% match requirement, and a $27,650,000 maximum grant per applicant.",
      "source_urls": [
        "https://www.energy.ca.gov/solicitations/2026-02/gfo-25-603-californias-national-electric-vehicle-infrastructure-formula",
        "https://www.energy.ca.gov/sites/default/files/2026-03/GFO-25-603_NEVI_6_Pre-Application_Workshop_Slides_ADA.pdf",
        "https://www.energy.ca.gov/programs-and-topics/programs/federal-ev-infrastructure-programs",
        "https://ecams.energy.ca.gov/s/login/"
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
    "effect_grant_expected_value_1_42355de1814a8757: missing probability_discount",
    "effect_grant_expected_value_1_42355de1814a8757: missing conditional_award_cents",
    "effect_grant_expected_value_1_42355de1814a8757: conditional award status needs_project_cost",
    "effect_grant_expected_value_1_42355de1814a8757: probability status evidence_not_found"
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
  "opportunityId": "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-603",
  "programName": "GFO-25-603 - California's National Electric Vehicle Infrastructure Formula Program - Solicitation 6 Community Charging",
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
