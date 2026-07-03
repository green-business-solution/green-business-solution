You are helping RetroFi finish conservative grant estimation.

Prompt 36 of 37.

Research only official or primary administrator sources when possible. Third-party summaries can be used only to find official sources, not as final support for formula/probability fields.

## Goal

Repair this grant-like v2 incentive package so Codex can calculate the grant value conservatively at runtime, or suppress it with explicit reason codes when no defensible estimate exists.

Do not make every grant estimable. If the source only says "up to", if the award is competitive with no probability evidence, if funding status is unknown, or if project-specific award approval is required, return suppressed or missing-input status.

## Current Package Context

```json
{
  "opportunity_id": "SOURCE_DSIRE:dsire_program_id:22206",
  "program_name": "VW Funding for Diesel Replacement and EVSE Projects",
  "calculation_status": "custom_quote_estimate",
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
      "effect_id": "effect_grant_expected_value_1_6f710c93f5265829",
      "label": "Funding amount is determined by the active Volkswagen settlement subprogram or project sponsor; there is no single statewide formula across diesel replacement, non-road equipment, transit charging, and EVSE projects.",
      "effect_type": "grant_expected_value",
      "cash_flow_direction": "benefit",
      "timing": {
        "cadence": "custom",
        "source_timing": "application_process",
        "approval_required_before_purchase": true,
        "approval_required_before_installation": true,
        "application_deadline": null,
        "funding_status": "open_while_funds_last"
      },
      "calculation": {
        "method": "custom_quote",
        "reason": "Project-specific quote or program review required.",
        "grant_value_model_kind": "no_calculable_value",
        "cash_value_classification": "unknown",
        "conditional_award": {
          "status": "needs_project_scope",
          "formula_text": "New York DEC's VW Settlement funding page lists multiple sponsor-specific and subprogram-specific opportunities for diesel replacement, non-road equipment, transit charging, and EVSE projects. There is no single statewide reusable formula. Conditional award must be taken from the active sponsor/subprogram rate table or award agreement.",
          "conditional_award_cents": null,
          "min_award_cents": null,
          "max_award_cents": null,
          "cost_share_percent": null,
          "required_project_inputs": [
            "active_subprogram",
            "project_sponsor",
            "vehicle_or_equipment_class",
            "replacement_technology",
            "eligible_project_cost",
            "scrappage_or_replacement_requirements",
            "sponsor_rate_table",
            "award_decision"
          ],
          "calculation_trace": [
            "Official NY DEC page lists active and completed VW-funded opportunities.",
            "Open opportunities include sponsor-specific programs such as NYCDOT Clean Trucks, NYPA transit bus charging, and NYSERDA zero-emission non-road vehicles.",
            "Other EVSE and DCFC opportunities are completed, awarded, or under installation.",
            "Because rules vary by sponsor and subprogram, no single conditional dollar value can be calculated."
          ]
        },
        "probability_model": {
          "status": "not_applicable",
          "probability_discount": null,
          "probability_evidence_type": "none",
          "historical_awards_count": null,
          "historical_applications_count": null,
          "total_program_budget_cents": null,
          "expected_award_count": null,
          "competition_scope": "unknown",
          "probability_notes": "Probability cannot be evaluated at the aggregate VW funding-page level. Each active subprogram has separate eligibility, award method, budget, and application process."
        },
        "expected_value_recommendation": {
          "estimate_status": "needs_project_scope",
          "expected_value_cents": null,
          "estimate_confidence": "low",
          "include_in_user_facing_total_default": false,
          "reason_codes": [
            "aggregate_program_page",
            "subprogram_required",
            "no_single_formula",
            "mixed_open_and_completed_opportunities"
          ]
        },
        "fallback_prior_suggestion": {
          "probability_discount": null,
          "basis": "No fallback prior should be used for the aggregate VW funding page. Select a specific sponsor/subprogram first.",
          "should_retro_fi_use_without_human_approval": false
        }
      },
      "required_inputs": [
        {
          "input_key": "active_subprogram",
          "label": "active subprogram",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_6f710c93f5265829"
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
          "input_key": "project_sponsor",
          "label": "project sponsor",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_6f710c93f5265829"
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
          "input_key": "vehicle_or_equipment_class",
          "label": "vehicle or equipment class",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_6f710c93f5265829"
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
          "input_key": "replacement_technology",
          "label": "replacement technology",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_6f710c93f5265829"
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
          "input_key": "eligible_project_cost",
          "label": "eligible project cost",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_1_6f710c93f5265829"
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
          "input_key": "scrappage_or_replacement_requirements",
          "label": "scrappage or replacement requirements",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_6f710c93f5265829"
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
          "input_key": "site_or_fleet_details",
          "label": "site or fleet details",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_6f710c93f5265829"
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
          "input_key": "sponsor_rate_table",
          "label": "sponsor rate table",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_1_6f710c93f5265829"
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
          "input_key": "vehicle_class",
          "label": "vehicle class",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_6f710c93f5265829"
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
          "input_key": "eligible_cost",
          "label": "eligible cost",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_1_6f710c93f5265829"
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
          "input_key": "award_decision",
          "label": "Award Decision",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_1_6f710c93f5265829"
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
        "evidence_c352045334811715",
        "grant_probability_repair_4f78334d0bacedd1"
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
          "value_model_custom_quote",
          "grant_probability_repair_applied",
          "value_model_no_calculable_value",
          "estimate_status_needs_project_scope"
        ]
      }
    }
  ],
  "input_requirements": [
    {
      "input_key": "active_subprogram",
      "label": "active subprogram",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_6f710c93f5265829"
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
      "input_key": "project_sponsor",
      "label": "project sponsor",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_6f710c93f5265829"
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
      "input_key": "vehicle_or_equipment_class",
      "label": "vehicle or equipment class",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_6f710c93f5265829"
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
      "input_key": "replacement_technology",
      "label": "replacement technology",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_6f710c93f5265829"
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
      "input_key": "eligible_project_cost",
      "label": "eligible project cost",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_1_6f710c93f5265829"
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
      "input_key": "scrappage_or_replacement_requirements",
      "label": "scrappage or replacement requirements",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_6f710c93f5265829"
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
      "input_key": "site_or_fleet_details",
      "label": "site or fleet details",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_6f710c93f5265829"
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
      "input_key": "sponsor_rate_table",
      "label": "sponsor rate table",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_1_6f710c93f5265829"
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
      "input_key": "vehicle_class",
      "label": "vehicle class",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_6f710c93f5265829"
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
      "input_key": "eligible_cost",
      "label": "eligible cost",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_1_6f710c93f5265829"
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
      "input_key": "award_decision",
      "label": "Award Decision",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_1_6f710c93f5265829"
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
      "evidence_id": "evidence_c352045334811715",
      "source_type": "gpt_pro_research_summary",
      "quote": "New York DEC's VW funding page lists open and completed sponsor-specific diesel replacement, non-road, transit charging, and EVSE opportunities.",
      "source_urls": [
        "https://dec.ny.gov/environmental-protection/air-quality/controlling-motor-vehicle-pollution/vw-settlement-information/vw-funding-for-diesel-replacement-and-evse-projects"
      ],
      "evidence_confidence": 0.9
    },
    {
      "evidence_id": "grant_probability_repair_4f78334d0bacedd1",
      "source_type": "gpt_pro_grant_probability_repair",
      "quote": "NY DEC's VW funding page lists open and completed sponsor-specific opportunities, including diesel replacement, non-road equipment, transit charging, and EVSE/DCFC programs, with differing statuses and sponsors.",
      "source_urls": [
        "https://dec.ny.gov/environmental-protection/air-quality/controlling-motor-vehicle-pollution/vw-settlement-information/vw-funding-for-diesel-replacement-and-evse-projects"
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
    "effect_grant_expected_value_1_6f710c93f5265829: conditional award status needs_project_scope",
    "effect_grant_expected_value_1_6f710c93f5265829: probability status not_applicable"
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
  "opportunityId": "SOURCE_DSIRE:dsire_program_id:22206",
  "programName": "VW Funding for Diesel Replacement and EVSE Projects",
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
