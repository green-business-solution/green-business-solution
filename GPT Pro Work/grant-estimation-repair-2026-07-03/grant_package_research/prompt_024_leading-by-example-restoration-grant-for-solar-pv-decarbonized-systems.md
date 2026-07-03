You are helping RetroFi finish conservative grant estimation.

Prompt 24 of 37.

Research only official or primary administrator sources when possible. Third-party summaries can be used only to find official sources, not as final support for formula/probability fields.

## Goal

Repair this grant-like v2 incentive package so Codex can calculate the grant value conservatively at runtime, or suppress it with explicit reason codes when no defensible estimate exists.

Do not make every grant estimable. If the source only says "up to", if the award is competitive with no probability evidence, if funding status is unknown, or if project-specific award approval is required, return suppressed or missing-input status.

## Current Package Context

```json
{
  "opportunity_id": "SOURCE_DSIRE:dsire_program_id:22770",
  "program_name": "Leading By Example Restoration Grant for Solar PV & Decarbonized Systems",
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
      "effect_id": "effect_grant_expected_value_1_753c755368588c1b",
      "label": "Eligible Massachusetts state entities may request grant funding for up to 100% of eligible restoration costs, subject to a $500,000 per-project cap, $1,500,000 per-entity cap, program budget, and award approval.",
      "effect_type": "grant_expected_value",
      "cash_flow_direction": "benefit",
      "timing": {
        "cadence": "one_time",
        "source_timing": "post_installation_reimbursement",
        "approval_required_before_purchase": true,
        "approval_required_before_installation": true,
        "application_deadline": "2027-06-30 or until funds are exhausted",
        "funding_status": "open_while_funds_last"
      },
      "calculation": {
        "method": "expected_value",
        "probability_discount": null,
        "conditional_award_cents": null,
        "max_award_cents": 50000000,
        "grant_value_model_kind": "capped_percent_of_eligible_cost",
        "cash_value_classification": "cash_grant",
        "conditional_award": {
          "status": "needs_project_cost",
          "formula_text": "For an eligible Massachusetts state entity with an approved restoration project, grant request may cover up to 100% of eligible project costs, capped at $500,000 per project and $1,500,000 per entity, subject to rolling review, program budget, and award approval.",
          "conditional_award_cents": null,
          "min_award_cents": null,
          "max_award_cents": 50000000,
          "cost_share_percent": 1,
          "required_project_inputs": [
            "eligible_project_cost",
            "state_entity_applicant",
            "existing_system_restoration_scope",
            "site_count",
            "entity_remaining_cap",
            "award_approval",
            "program_budget_availability"
          ],
          "calculation_trace": [
            "Confirm the applicant is an eligible Massachusetts state entity.",
            "Confirm the project restores eligible existing solar PV or decarbonized systems.",
            "Calculate eligible cost support up to 100%, capped at $500,000 per project and by remaining $1,500,000 per-entity cap.",
            "Do not count value until rolling review and award approval/funding availability are confirmed."
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
          "competition_scope": "sector_specific",
          "probability_notes": "Official sources checked provide eligibility, rolling-review status, and caps, but no historical applications, award count, remaining budget, or success-rate evidence."
        },
        "expected_value_recommendation": {
          "estimate_status": "suppressed",
          "expected_value_cents": null,
          "estimate_confidence": "low",
          "include_in_user_facing_total_default": false,
          "reason_codes": [
            "rolling_grant_approval_required",
            "missing_probability_anchor",
            "needs_project_cost",
            "state_entity_only"
          ]
        },
        "fallback_prior_suggestion": {
          "probability_discount": null,
          "basis": "Rolling state-entity grant with no source-backed probability anchor; any assumed prior requires human review.",
          "should_retro_fi_use_without_human_approval": false
        },
        "min_award_cents": null,
        "cost_share_percent": 1
      },
      "caps": [
        {
          "cap_type": "maximum_amount",
          "amount": {
            "value": 500000,
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
          "input_key": "eligible_project_cost",
          "label": "eligible project cost",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_1_753c755368588c1b"
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
          "input_key": "state_entity_applicant",
          "label": "state entity applicant",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_753c755368588c1b"
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
          "input_key": "existing_system_restoration_scope",
          "label": "existing system restoration scope",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_753c755368588c1b"
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
          "input_key": "site_count",
          "label": "site count",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_1_753c755368588c1b"
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
          "input_key": "award_approval",
          "label": "award approval",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_753c755368588c1b"
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
          "input_key": "entity_remaining_cap",
          "label": "Entity Remaining Cap",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_753c755368588c1b"
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
          "input_key": "program_budget_availability",
          "label": "Program Budget Availability",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_1_753c755368588c1b"
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
        "evidence_948a33d9cbaa3a63",
        "grant_probability_repair_f57cbe3ecc3336e2"
      ],
      "confidence": {
        "overall": 0.38,
        "calculation": 0.38,
        "extraction": 0.72,
        "reason_codes": [
          "repair_status_calculation_package_found",
          "calculation_status_calculable_with_missing_inputs",
          "source_confidence_medium",
          "estimate_confidence_low",
          "value_model_competitive_cost_share",
          "grant_probability_repair_applied",
          "value_model_capped_percent_of_eligible_cost",
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
        "effect_grant_expected_value_1_753c755368588c1b"
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
      "input_key": "state_entity_applicant",
      "label": "state entity applicant",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_753c755368588c1b"
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
      "input_key": "existing_system_restoration_scope",
      "label": "existing system restoration scope",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_753c755368588c1b"
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
      "input_key": "site_count",
      "label": "site count",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_1_753c755368588c1b"
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
      "input_key": "award_approval",
      "label": "award approval",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_753c755368588c1b"
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
      "input_key": "entity_remaining_cap",
      "label": "Entity Remaining Cap",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_753c755368588c1b"
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
      "input_key": "program_budget_availability",
      "label": "Program Budget Availability",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_1_753c755368588c1b"
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
      "evidence_id": "evidence_948a33d9cbaa3a63",
      "source_type": "gpt_pro_research_summary",
      "quote": "This is a capped restoration grant for eligible Massachusetts state entities, not a private solar rebate.",
      "source_urls": [
        "https://www.mass.gov/info-details/leading-by-example-restoration-grant-for-solar-pv-decarbonized-systems",
        "https://www.mass.gov/leading-by-example-grants",
        "https://www.commbuys.com/bso/external/bidDetail.sdo?docId=BD-25-1041-ENE01-ENE01-109288&external=true&parentUrl=bid"
      ],
      "evidence_confidence": 0.72
    },
    {
      "evidence_id": "grant_probability_repair_f57cbe3ecc3336e2",
      "source_type": "gpt_pro_grant_probability_repair",
      "quote": "Massachusetts official search results state that grant requests may cover up to 100% of eligible project costs, with $500,000 per-project and $1,500,000 per-entity caps, and rolling review; the COMMBUYS solicitation is open for the Leading by Example Solar-Decarbonization Grant Program for State Entities. ([Massachusetts Government][14])",
      "source_urls": [
        "https://www.mass.gov/info-details/leading-by-example-restoration-grant-for-solar-pv-decarbonized-systems",
        "https://www.mass.gov/leading-by-example-grants",
        "https://www.commbuys.com/bso/external/bidDetail.sdo?docId=BD-25-1041-ENE01-ENE01-109288&external=true&parentUrl=bid"
      ],
      "evidence_confidence": 0.72
    }
  ],
  "confidence": {
    "overall": 0.38,
    "source_access": 0.72,
    "availability": 0.72,
    "calculation": 0.38,
    "extraction": 0.72,
    "reason_codes": [
      "repair_status_calculation_package_found",
      "calculation_status_calculable_with_missing_inputs",
      "source_confidence_medium",
      "estimate_confidence_low"
    ]
  },
  "current_validation_notes": [
    "effect_grant_expected_value_1_753c755368588c1b: missing probability_discount",
    "effect_grant_expected_value_1_753c755368588c1b: missing conditional_award_cents",
    "effect_grant_expected_value_1_753c755368588c1b: conditional award status needs_project_cost",
    "effect_grant_expected_value_1_753c755368588c1b: probability status evidence_not_found"
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
  "opportunityId": "SOURCE_DSIRE:dsire_program_id:22770",
  "programName": "Leading By Example Restoration Grant for Solar PV & Decarbonized Systems",
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
