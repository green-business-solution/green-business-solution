You are helping RetroFi finish conservative grant estimation.

Prompt 27 of 37.

Research only official or primary administrator sources when possible. Third-party summaries can be used only to find official sources, not as final support for formula/probability fields.

## Goal

Repair this grant-like v2 incentive package so Codex can calculate the grant value conservatively at runtime, or suppress it with explicit reason codes when no defensible estimate exists.

Do not make every grant estimable. If the source only says "up to", if the award is competitive with no probability evidence, if funding status is unknown, or if project-specific award approval is required, return suppressed or missing-input status.

## Current Package Context

```json
{
  "opportunity_id": "SOURCE_DSIRE:dsire_program_id:22656",
  "program_name": "Montana - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
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
      "effect_id": "effect_grant_expected_value_1_0f0a763b480029a9",
      "label": "Selected Montana NEVI projects may receive up to 80% federal cost-share for eligible public DC fast-charging project costs; actual funding depends on MDT procurement selection, approved costs, and required non-federal match.",
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
        "method": "expected_value",
        "probability_discount": null,
        "conditional_award_cents": null,
        "max_award_cents": null,
        "grant_value_model_kind": "competitive_cost_share",
        "cash_value_classification": "reimbursement",
        "conditional_award": {
          "status": "needs_project_cost",
          "formula_text": "For a selected Montana NEVI procurement project, federal cost share may cover up to 80% of approved eligible public DC fast-charging project cost, with at least 20% non-federal match and compliance with final MDT solicitation, corridor/site, and equipment requirements.",
          "conditional_award_cents": null,
          "min_award_cents": null,
          "max_award_cents": null,
          "cost_share_percent": 0.8,
          "required_project_inputs": [
            "eligible_project_cost",
            "mdt_procurement_selection",
            "non_federal_match",
            "alternative_fuel_corridor_site",
            "nevi_equipment_compliance",
            "procurement_selection",
            "final_solicitation_terms"
          ],
          "calculation_trace": [
            "Confirm a final MDT solicitation/procurement and selection status.",
            "Calculate 80% of approved eligible cost.",
            "Apply any final RFP caps, payment milestones, and required non-federal match."
          ]
        },
        "probability_model": {
          "status": "evidence_not_found",
          "probability_discount": null,
          "probability_evidence_type": "none",
          "historical_awards_count": null,
          "historical_applications_count": null,
          "total_program_budget_cents": 4300000000,
          "expected_award_count": null,
          "competition_scope": "statewide_broad",
          "probability_notes": "Montana official planning materials describe expected NEVI funding and a competitive procurement approach, but the checked materials did not provide a verified application count, award count, or current open solicitation probability anchor."
        },
        "expected_value_recommendation": {
          "estimate_status": "suppressed",
          "expected_value_cents": null,
          "estimate_confidence": "low",
          "include_in_user_facing_total_default": false,
          "reason_codes": [
            "competitive_procurement",
            "current_solicitation_not_verified",
            "cost_share_cap_only",
            "missing_probability_anchor"
          ]
        },
        "fallback_prior_suggestion": {
          "probability_discount": null,
          "basis": "Use of a competitive NEVI prior would require human review because Montana-specific success-rate evidence was not found.",
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
            "effect_grant_expected_value_1_0f0a763b480029a9"
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
          "input_key": "mdt_procurement_selection",
          "label": "mdt procurement selection",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_0f0a763b480029a9"
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
            "effect_grant_expected_value_1_0f0a763b480029a9"
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
          "input_key": "alternative_fuel_corridor_site",
          "label": "alternative fuel corridor site",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_0f0a763b480029a9"
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
            "effect_grant_expected_value_1_0f0a763b480029a9"
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
          "input_key": "procurement_selection",
          "label": "procurement selection",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_0f0a763b480029a9"
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
          "input_key": "final_solicitation_terms",
          "label": "Final Solicitation Terms",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_0f0a763b480029a9"
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
        "evidence_75f82fa23a8974fb",
        "grant_probability_repair_27c1cf85063feae6"
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
        "effect_grant_expected_value_1_0f0a763b480029a9"
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
      "input_key": "mdt_procurement_selection",
      "label": "mdt procurement selection",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_0f0a763b480029a9"
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
        "effect_grant_expected_value_1_0f0a763b480029a9"
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
      "input_key": "alternative_fuel_corridor_site",
      "label": "alternative fuel corridor site",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_0f0a763b480029a9"
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
        "effect_grant_expected_value_1_0f0a763b480029a9"
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
      "input_key": "procurement_selection",
      "label": "procurement selection",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_0f0a763b480029a9"
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
      "input_key": "final_solicitation_terms",
      "label": "Final Solicitation Terms",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_0f0a763b480029a9"
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
      "evidence_id": "evidence_75f82fa23a8974fb",
      "source_type": "gpt_pro_research_summary",
      "quote": "Montana NEVI is a procurement-based DC fast-charging cost-share program, not a guaranteed charger rebate.",
      "source_urls": [
        "https://www.mdt.mt.gov/publications/plans/ev/",
        "https://www.mdt.mt.gov/business/contracting/qacurrent.aspx",
        "https://deq.mt.gov/energy/Programs/fuels",
        "https://www.fhwa.dot.gov/environment/nevi/"
      ],
      "evidence_confidence": 0.9
    },
    {
      "evidence_id": "grant_probability_repair_27c1cf85063feae6",
      "source_type": "gpt_pro_grant_probability_repair",
      "quote": "MDT EV planning materials state Montana expects about $43 million over five years; FY26 planning materials describe competitive two-phase design-build solicitations and an 80/20 cost assumption, while noting prior solicitation responses had not been evaluated. ([Montana Department of Transportation][10])",
      "source_urls": [
        "https://www.mdt.mt.gov/publications/plans/ev/",
        "https://www.mdt.mt.gov/business/contracting/qacurrent.aspx",
        "https://deq.mt.gov/energy/Programs/fuels",
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
    "effect_grant_expected_value_1_0f0a763b480029a9: missing probability_discount",
    "effect_grant_expected_value_1_0f0a763b480029a9: missing conditional_award_cents",
    "effect_grant_expected_value_1_0f0a763b480029a9: conditional award status needs_project_cost",
    "effect_grant_expected_value_1_0f0a763b480029a9: probability status evidence_not_found"
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
  "opportunityId": "SOURCE_DSIRE:dsire_program_id:22656",
  "programName": "Montana - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
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
