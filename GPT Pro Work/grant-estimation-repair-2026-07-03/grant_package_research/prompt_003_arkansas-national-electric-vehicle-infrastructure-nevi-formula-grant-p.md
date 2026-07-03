You are helping RetroFi finish conservative grant estimation.

Prompt 3 of 37.

Research only official or primary administrator sources when possible. Third-party summaries can be used only to find official sources, not as final support for formula/probability fields.

## Goal

Repair this grant-like v2 incentive package so Codex can calculate the grant value conservatively at runtime, or suppress it with explicit reason codes when no defensible estimate exists.

Do not make every grant estimable. If the source only says "up to", if the award is competitive with no probability evidence, if funding status is unknown, or if project-specific award approval is required, return suppressed or missing-input status.

## Current Package Context

```json
{
  "opportunity_id": "SOURCE_DSIRE:dsire_program_id:22633",
  "program_name": "Arkansas - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
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
      "effect_id": "effect_grant_expected_value_1_83c9b6e21b196f8c",
      "label": "Competitive reimbursement grant may cover up to 80% federal share of eligible NEVI EV charging project costs; proposer must provide 20% non-federal share and be selected under ARDOT's procurement.",
      "effect_type": "grant_expected_value",
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
        "method": "expected_value",
        "probability_discount": null,
        "conditional_award_cents": null,
        "max_award_cents": null,
        "grant_value_model_kind": "competitive_cost_share",
        "cash_value_classification": "reimbursement",
        "conditional_award": {
          "status": "needs_project_cost",
          "formula_text": "For an ARDOT-selected NEVI project, conditional reimbursement is the lesser of the requested/approved reimbursement amount, 80% of approved eligible project cost, and any procurement or site-specific cap. The proposer must provide at least 20% non-federal match.",
          "conditional_award_cents": null,
          "min_award_cents": null,
          "max_award_cents": null,
          "cost_share_percent": 0.8,
          "required_project_inputs": [
            "eligible_project_cost",
            "requested_grant_amount",
            "non_federal_match_amount",
            "nevi_site_compliance",
            "award_selection_status",
            "ardot_procurement_round"
          ],
          "calculation_trace": [
            "Confirm ARDOT procurement round and selection status.",
            "Calculate 80% of approved eligible costs.",
            "Cap at the requested and ARDOT-approved reimbursement amount."
          ]
        },
        "probability_model": {
          "status": "evidence_not_found",
          "probability_discount": null,
          "probability_evidence_type": "none",
          "historical_awards_count": null,
          "historical_applications_count": null,
          "total_program_budget_cents": 5410000000,
          "expected_award_count": null,
          "competition_scope": "statewide_broad",
          "probability_notes": "ARDOT describes the NEVI opportunity as competitive reimbursement with 80% federal and 20% non-federal cost share, but no application denominator or current success-rate evidence was verified."
        },
        "expected_value_recommendation": {
          "estimate_status": "suppressed",
          "expected_value_cents": null,
          "estimate_confidence": "low",
          "include_in_user_facing_total_default": false,
          "reason_codes": [
            "competitive_procurement",
            "current_rfp_closed",
            "cost_share_cap_only",
            "missing_probability_anchor"
          ]
        },
        "fallback_prior_suggestion": {
          "probability_discount": null,
          "basis": "A generic competitive NEVI prior would require human review because official Arkansas sources did not provide applications-versus-awards evidence.",
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
            "effect_grant_expected_value_1_83c9b6e21b196f8c"
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
            "effect_grant_expected_value_1_83c9b6e21b196f8c"
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
          "input_key": "non_federal_match_amount",
          "label": "non federal match amount",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_1_83c9b6e21b196f8c"
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
          "input_key": "nevi_site_compliance",
          "label": "nevi site compliance",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_83c9b6e21b196f8c"
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
            "effect_grant_expected_value_1_83c9b6e21b196f8c"
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
          "input_key": "ardot_procurement_round",
          "label": "Ardot Procurement Round",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_83c9b6e21b196f8c"
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
        "evidence_7ac79e2770aae24a",
        "grant_probability_repair_5addf22c30bffd86"
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
      "input_key": "eligible_project_cost",
      "label": "eligible project cost",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_1_83c9b6e21b196f8c"
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
        "effect_grant_expected_value_1_83c9b6e21b196f8c"
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
      "input_key": "non_federal_match_amount",
      "label": "non federal match amount",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_1_83c9b6e21b196f8c"
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
      "input_key": "nevi_site_compliance",
      "label": "nevi site compliance",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_83c9b6e21b196f8c"
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
        "effect_grant_expected_value_1_83c9b6e21b196f8c"
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
      "input_key": "ardot_procurement_round",
      "label": "Ardot Procurement Round",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_83c9b6e21b196f8c"
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
      "evidence_id": "evidence_7ac79e2770aae24a",
      "source_type": "gpt_pro_research_summary",
      "quote": "ARDOT describes NEVI as a competitive reimbursement program with 80% federal and 20% non-federal cost share.",
      "source_urls": [
        "https://ardot.gov/divisions/local-programs/local-funding-opportunities/national-electric-vehicle-infrastructure-nevi-program/",
        "https://www.adeq.state.ar.us/energy/opportunities/nevi/",
        "https://media.ark.org/ardot/ARDOT_EVID_Program_Requirements.pdf",
        "https://media.ark.org/ardot/Submittal-Packet-FY26-EVID-Plan.pdf",
        "https://programs.dsireusa.org/system/program/detail/22633/arkansas-national-electric-vehicle-infrastructure-nevi-formula-grant-program"
      ],
      "evidence_confidence": 0.9
    },
    {
      "evidence_id": "grant_probability_repair_5addf22c30bffd86",
      "source_type": "gpt_pro_grant_probability_repair",
      "quote": "ARDOT's NEVI page describes the program as competitive reimbursement, notes the current RFP is closed, and states the 80% federal / 20% non-federal cost-share structure. ([Arkansas Department of Transportation][5])",
      "source_urls": [
        "https://ardot.gov/divisions/local-programs/local-funding-opportunities/national-electric-vehicle-infrastructure-nevi-program/",
        "https://www.adeq.state.ar.us/energy/opportunities/nevi/",
        "https://media.ark.org/ardot/ARDOT_EVID_Program_Requirements.pdf",
        "https://media.ark.org/ardot/Submittal-Packet-FY26-EVID-Plan.pdf",
        "https://afdc.energy.gov/laws/12744",
        "https://programs.dsireusa.org/system/program/detail/22633/arkansas-national-electric-vehicle-infrastructure-nevi-formula-grant-program"
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
    "effect_grant_expected_value_1_83c9b6e21b196f8c: missing probability_discount",
    "effect_grant_expected_value_1_83c9b6e21b196f8c: missing conditional_award_cents",
    "effect_grant_expected_value_1_83c9b6e21b196f8c: conditional award status needs_project_cost",
    "effect_grant_expected_value_1_83c9b6e21b196f8c: probability status evidence_not_found"
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
  "opportunityId": "SOURCE_DSIRE:dsire_program_id:22633",
  "programName": "Arkansas - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
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
