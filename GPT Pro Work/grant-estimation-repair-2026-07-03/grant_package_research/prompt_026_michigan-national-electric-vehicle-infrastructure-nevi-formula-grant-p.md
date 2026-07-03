You are helping RetroFi finish conservative grant estimation.

Prompt 26 of 37.

Research only official or primary administrator sources when possible. Third-party summaries can be used only to find official sources, not as final support for formula/probability fields.

## Goal

Repair this grant-like v2 incentive package so Codex can calculate the grant value conservatively at runtime, or suppress it with explicit reason codes when no defensible estimate exists.

Do not make every grant estimable. If the source only says "up to", if the award is competitive with no probability evidence, if funding status is unknown, or if project-specific award approval is required, return suppressed or missing-input status.

## Current Package Context

```json
{
  "opportunity_id": "SOURCE_DSIRE:dsire_program_id:22647",
  "program_name": "Michigan - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
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
      "effect_id": "effect_grant_expected_value_1_cddd6282f92b5b42",
      "label": "Selected Michigan NEVI projects may receive federal cost-share funding up to 80% of eligible EV charging project costs; the actual award is determined by MDOT solicitation selection and approved eligible costs.",
      "effect_type": "grant_expected_value",
      "cash_flow_direction": "benefit",
      "timing": {
        "cadence": "one_time",
        "source_timing": "post_installation_reimbursement",
        "approval_required_before_purchase": true,
        "approval_required_before_installation": true,
        "application_deadline": "2026-08-07",
        "funding_status": "open_while_funds_last"
      },
      "calculation": {
        "method": "expected_value",
        "probability_discount": 0.39,
        "conditional_award_cents": null,
        "max_award_cents": null,
        "grant_value_model_kind": "competitive_cost_share",
        "cash_value_classification": "reimbursement",
        "conditional_award": {
          "status": "needs_project_cost",
          "formula_text": "For a selected Michigan NEVI project, reimbursement is capped at 80% of MDOT-approved eligible charging-site costs, subject to RFP terms, project payment caps, public-site requirements, four 150 kW port requirements, and a minimum 20% company/non-federal match.",
          "conditional_award_cents": null,
          "min_award_cents": null,
          "max_award_cents": null,
          "cost_share_percent": 0.8,
          "required_project_inputs": [
            "eligible_project_cost",
            "mdot_round_3_award_selection",
            "non_federal_match",
            "corridor_site_compliance",
            "nevi_equipment_compliance",
            "award_selection",
            "approved_award_amount"
          ],
          "calculation_trace": [
            "Confirm MDOT Round 3 or other applicable NEVI procurement selection.",
            "Calculate 80% of approved eligible project cost.",
            "Apply the approved award/payment cap and required match."
          ]
        },
        "probability_model": {
          "status": "evidence_found",
          "probability_discount": 0.39,
          "probability_evidence_type": "historical_success_rate",
          "historical_awards_count": 83,
          "historical_applications_count": 214,
          "total_program_budget_cents": 5100000000,
          "expected_award_count": 60,
          "competition_scope": "statewide_broad",
          "probability_notes": "Michigan FY26/Round 3 materials provide a historical numerator and denominator from prior rounds: 83 selected out of 214 proposals, yielding about 38.8%, rounded to a conservative 0.39. Round 3 still needs project-specific eligibility, scoring, and approved cost."
        },
        "expected_value_recommendation": {
          "estimate_status": "needs_project_scope",
          "expected_value_cents": null,
          "estimate_confidence": "medium",
          "include_in_user_facing_total_default": false,
          "reason_codes": [
            "historical_success_rate_available",
            "competitive_procurement",
            "needs_project_cost",
            "needs_application_fit_review"
          ]
        },
        "fallback_prior_suggestion": {
          "probability_discount": null,
          "basis": "Fallback prior not needed because Michigan-specific historical applications and selections were verified; do not use without project cost and proposal fit.",
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
            "effect_grant_expected_value_1_cddd6282f92b5b42"
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
          "input_key": "mdot_round_3_award_selection",
          "label": "mdot round 3 award selection",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_cddd6282f92b5b42"
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
            "effect_grant_expected_value_1_cddd6282f92b5b42"
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
          "input_key": "corridor_site_compliance",
          "label": "corridor site compliance",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_cddd6282f92b5b42"
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
            "effect_grant_expected_value_1_cddd6282f92b5b42"
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
          "label": "award selection",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_cddd6282f92b5b42"
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
          "input_key": "approved_award_amount",
          "label": "Approved Award Amount",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_1_cddd6282f92b5b42"
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
        "evidence_38715950260508f7",
        "grant_probability_repair_04604bc2a669c49f"
      ],
      "confidence": {
        "overall": 0.72,
        "calculation": 0.72,
        "extraction": 0.9,
        "reason_codes": [
          "repair_status_calculation_package_found",
          "calculation_status_calculable_with_missing_inputs",
          "source_confidence_high",
          "estimate_confidence_low",
          "value_model_competitive_cost_share",
          "grant_probability_repair_applied",
          "estimate_confidence_medium",
          "estimate_status_needs_project_scope"
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
        "effect_grant_expected_value_1_cddd6282f92b5b42"
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
      "input_key": "mdot_round_3_award_selection",
      "label": "mdot round 3 award selection",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_cddd6282f92b5b42"
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
        "effect_grant_expected_value_1_cddd6282f92b5b42"
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
      "input_key": "corridor_site_compliance",
      "label": "corridor site compliance",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_cddd6282f92b5b42"
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
        "effect_grant_expected_value_1_cddd6282f92b5b42"
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
      "label": "award selection",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_cddd6282f92b5b42"
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
      "input_key": "approved_award_amount",
      "label": "Approved Award Amount",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_1_cddd6282f92b5b42"
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
      "evidence_id": "evidence_38715950260508f7",
      "source_type": "gpt_pro_research_summary",
      "quote": "Michigan NEVI is an active competitive DC fast-charging procurement with up to 80% federal cost share, not a deterministic rebate.",
      "source_urls": [
        "https://www.michigan.gov/mdot/travel/mobility/initiatives/nevi",
        "https://www.michigan.gov/mdot/business/contractors/innovativecontracting/national-electric-vehicle-infrastructure-3",
        "https://content.govdelivery.com/accounts/MIDOT/bulletins/41afcf3",
        "https://www.fhwa.dot.gov/environment/nevi/"
      ],
      "evidence_confidence": 0.9
    },
    {
      "evidence_id": "grant_probability_repair_04604bc2a669c49f",
      "source_type": "gpt_pro_grant_probability_repair",
      "quote": "MDOT states Round 3 is open, $106 million was allocated, about $51 million remains, and Round 3 anticipates about 60 stations; Round 3 materials require statewide public NEVI charging sites with four 150 kW ports and identify the RFP due/award schedule. Michigan planning materials provide the historical 83 selected / 214 proposals evidence used for the probability discount. ([Michigan.gov][8])",
      "source_urls": [
        "https://www.michigan.gov/mdot/travel/mobility/initiatives/nevi",
        "https://www.michigan.gov/mdot/business/contractors/innovativecontracting/national-electric-vehicle-infrastructure-3",
        "https://www.michigan.gov/mdot/news-outreach/pressreleases/2026/06/09/mdot-expanding-ev-charging-network-accepting-proposals-for-round-3-nevi-procurement",
        "https://content.govdelivery.com/accounts/MIDOT/bulletins/41afcf3",
        "https://www.fhwa.dot.gov/environment/nevi/"
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
    "effect_grant_expected_value_1_cddd6282f92b5b42: missing conditional_award_cents",
    "effect_grant_expected_value_1_cddd6282f92b5b42: conditional award status needs_project_cost",
    "effect_grant_expected_value_1_cddd6282f92b5b42: probability status evidence_found"
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
  "opportunityId": "SOURCE_DSIRE:dsire_program_id:22647",
  "programName": "Michigan - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
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
