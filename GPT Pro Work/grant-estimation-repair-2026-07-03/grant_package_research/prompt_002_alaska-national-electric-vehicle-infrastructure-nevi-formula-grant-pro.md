You are helping RetroFi finish conservative grant estimation.

Prompt 2 of 37.

Research only official or primary administrator sources when possible. Third-party summaries can be used only to find official sources, not as final support for formula/probability fields.

## Goal

Repair this grant-like v2 incentive package so Codex can calculate the grant value conservatively at runtime, or suppress it with explicit reason codes when no defensible estimate exists.

Do not make every grant estimable. If the source only says "up to", if the award is competitive with no probability evidence, if funding status is unknown, or if project-specific award approval is required, return suppressed or missing-input status.

## Current Package Context

```json
{
  "opportunity_id": "SOURCE_DSIRE:dsire_program_id:22666",
  "program_name": "Alaska - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
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
      "effect_id": "effect_grant_expected_value_1_eff91e0ede6cdd5f",
      "label": "For selected Alaska NEVI public EV charging projects, the federal cost share may cover up to 80% of eligible project cost, with at least 20% non-federal match. Do not estimate an award unless a solicitation, selected site, eligible cost, and award decision are known.",
      "effect_type": "grant_expected_value",
      "cash_flow_direction": "benefit",
      "timing": {
        "cadence": "custom",
        "source_timing": "application_process",
        "approval_required_before_purchase": true,
        "approval_required_before_installation": true,
        "application_deadline": null,
        "funding_status": "unknown"
      },
      "calculation": {
        "method": "expected_value",
        "probability_discount": 0.26,
        "conditional_award_cents": null,
        "max_award_cents": null,
        "grant_value_model_kind": "competitive_cost_share",
        "cash_value_classification": "reimbursement",
        "conditional_award": {
          "status": "needs_project_cost",
          "formula_text": "For an Alaska NEVI-selected project, federal NEVI funds may reimburse or fund up to 80% of approved eligible public EV charging project costs, with at least 20% private/non-federal match and compliance with AEA solicitation, installation, ownership, operation, and maintenance terms.",
          "conditional_award_cents": null,
          "min_award_cents": null,
          "max_award_cents": null,
          "cost_share_percent": 0.8,
          "required_project_inputs": [
            "current_solicitation_round",
            "selected_site_or_application_status",
            "eligible_project_cost",
            "non_federal_match",
            "nevi_compliance_requirements",
            "approved_award_amount"
          ],
          "calculation_trace": [
            "Confirm the Alaska NEVI solicitation phase and selection status.",
            "Calculate 80% of approved eligible project cost.",
            "Cap at AEA-approved award and apply private/non-federal match."
          ]
        },
        "probability_model": {
          "status": "evidence_found",
          "probability_discount": 0.26,
          "probability_evidence_type": "historical_success_rate",
          "historical_awards_count": 9,
          "historical_applications_count": 34,
          "total_program_budget_cents": 5241529400,
          "expected_award_count": null,
          "competition_scope": "statewide_broad",
          "probability_notes": "Alaska materials report 34 first-round grant applications and projects selected in nine communities. Using communities as the conservative selected-project numerator yields about 26.5%, rounded to 0.26; exact project-level award count may differ."
        },
        "expected_value_recommendation": {
          "estimate_status": "needs_project_scope",
          "expected_value_cents": null,
          "estimate_confidence": "medium",
          "include_in_user_facing_total_default": false,
          "reason_codes": [
            "historical_success_rate_available",
            "competitive_solicitation",
            "needs_project_cost",
            "community_based_numerator_requires_review"
          ]
        },
        "fallback_prior_suggestion": {
          "probability_discount": null,
          "basis": "Fallback prior not needed because Alaska-specific application and selection evidence was found, though the numerator is community-based and should be reviewed before production use.",
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
          "input_key": "current_solicitation_round",
          "label": "current solicitation round",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_eff91e0ede6cdd5f"
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
          "input_key": "selected_site_or_application_status",
          "label": "selected site or application status",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_eff91e0ede6cdd5f"
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
          "input_key": "eligible_project_cost",
          "label": "eligible project cost",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_1_eff91e0ede6cdd5f"
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
            "effect_grant_expected_value_1_eff91e0ede6cdd5f"
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
          "input_key": "nevi_compliance_requirements",
          "label": "nevi compliance requirements",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_eff91e0ede6cdd5f"
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
            "effect_grant_expected_value_1_eff91e0ede6cdd5f"
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
        "evidence_9af4024cbe556fe6",
        "grant_probability_repair_85dfc4e661b7a59b"
      ],
      "confidence": {
        "overall": 0.72,
        "calculation": 0.72,
        "extraction": 0.72,
        "reason_codes": [
          "repair_status_calculation_package_found",
          "calculation_status_calculable_with_missing_inputs",
          "source_confidence_medium",
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
      "input_key": "current_solicitation_round",
      "label": "current solicitation round",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_eff91e0ede6cdd5f"
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
      "input_key": "selected_site_or_application_status",
      "label": "selected site or application status",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_eff91e0ede6cdd5f"
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
      "input_key": "eligible_project_cost",
      "label": "eligible project cost",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_1_eff91e0ede6cdd5f"
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
        "effect_grant_expected_value_1_eff91e0ede6cdd5f"
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
      "input_key": "nevi_compliance_requirements",
      "label": "nevi compliance requirements",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_eff91e0ede6cdd5f"
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
        "effect_grant_expected_value_1_eff91e0ede6cdd5f"
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
      "evidence_id": "evidence_9af4024cbe556fe6",
      "source_type": "gpt_pro_research_summary",
      "quote": "Alaska NEVI supports public EV charging infrastructure through solicitation-based cost-share grants, not building efficiency or Level 2-only rebates.",
      "source_urls": [
        "https://www.akenergyauthority.org/What-We-Do/Renewable-Energy-and-Energy-Efficiency/Electric-Vehicles",
        "https://www.akenergyauthority.org/Portals/0/What%20We%20Do/Renewable%20Energy%20and%20Energy%20Efficiency/Electric%20Vehicles/20251013%20FINAL%20FY26%20Alaska%20NEVI%20Plan%20508%20Compliant.pdf?ver=1GzaY7TO8_JfAonOxwygFA%3D%3D",
        "https://www.akenergyauthority.org/Portals/0/What%20We%20Do/Renewable%20Energy%20and%20Energy%20Efficiency/Electric%20Vehicles/AKEVWG/2024%20NEVI%20Workshop%20Series.pdf?ver=96Hmt3ZL6uTpOyPsVhWlFg%3D%3D"
      ],
      "evidence_confidence": 0.72
    },
    {
      "evidence_id": "grant_probability_repair_85dfc4e661b7a59b",
      "source_type": "gpt_pro_grant_probability_repair",
      "quote": "Alaska NEVI materials identify a total allocation of about $52.4 million, a required 20% match / 80% federal structure, 34 first-round grant applications, and first-round selections in nine communities. ([AK Energy Authority][12])",
      "source_urls": [
        "https://www.akenergyauthority.org/What-We-Do/Renewable-Energy-and-Energy-Efficiency/Electric-Vehicles",
        "https://www.akenergyauthority.org/Portals/0/What%20We%20Do/Renewable%20Energy%20and%20Energy%20Efficiency/Electric%20Vehicles/20251013%20FINAL%20FY26%20Alaska%20NEVI%20Plan%20508%20Compliant.pdf?ver=1GzaY7TO8_JfAonOxwygFA%3D%3D",
        "https://www.akenergyauthority.org/Portals/0/What%20We%20Do/Renewable%20Energy%20and%20Energy%20Efficiency/Electric%20Vehicles/AKEVWG/2024%20NEVI%20Workshop%20Series.pdf?ver=96Hmt3ZL6uTpOyPsVhWlFg%3D%3D",
        "https://afdc.energy.gov/laws/12744"
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
    "effect_grant_expected_value_1_eff91e0ede6cdd5f: missing conditional_award_cents",
    "effect_grant_expected_value_1_eff91e0ede6cdd5f: conditional award status needs_project_cost",
    "effect_grant_expected_value_1_eff91e0ede6cdd5f: probability status evidence_found"
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
  "opportunityId": "SOURCE_DSIRE:dsire_program_id:22666",
  "programName": "Alaska - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
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
