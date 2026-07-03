You are helping RetroFi finish conservative grant estimation.

Prompt 25 of 37.

Research only official or primary administrator sources when possible. Third-party summaries can be used only to find official sources, not as final support for formula/probability fields.

## Goal

Repair this grant-like v2 incentive package so Codex can calculate the grant value conservatively at runtime, or suppress it with explicit reason codes when no defensible estimate exists.

Do not make every grant estimable. If the source only says "up to", if the award is competitive with no probability evidence, if funding status is unknown, or if project-specific award approval is required, return suppressed or missing-input status.

## Current Package Context

```json
{
  "opportunity_id": "SOURCE_DSIRE:dsire_program_id:22772",
  "program_name": "Leading by Example Solar-Decarbonization Grant Program",
  "calculation_status": "calculable_with_missing_inputs",
  "availability": {
    "status": "active",
    "source_access_status": "accessible_or_researched"
  },
  "retrofit_types": [
    "battery_storage_system",
    "ev_charger_installation",
    "level_2_ev_charger_installation",
    "rooftop_solar_pv"
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
      "effect_id": "effect_grant_expected_value_1_9221facf5f8b2349",
      "label": "For eligible Massachusetts state-portfolio sites, apply component formulas: battery kWh at $500/kWh, additional EVSE at $5,000/port, decarbonization equal to solar funding, and a 10% EJ adder where applicable.",
      "effect_type": "grant_expected_value",
      "cash_flow_direction": "benefit",
      "timing": {
        "cadence": "custom",
        "source_timing": "application_process",
        "approval_required_before_purchase": true,
        "approval_required_before_installation": true,
        "application_deadline": "2027-06-30",
        "funding_status": "open_while_funds_last"
      },
      "calculation": {
        "method": "measure_catalog",
        "measure_catalog_id": "ma_lbe_solar_decarbonization_grant",
        "measure_selection_input": "project_component",
        "grant_value_model_kind": "hybrid_rate_plus_cap",
        "cash_value_classification": "cash_grant",
        "conditional_award": {
          "status": "needs_project_scope",
          "formula_text": "For an approved eligible Massachusetts state-portfolio project, calculate approved components: battery storage = 50,000 cents per approved battery kWh; additional eligible EVSE = 500,000 cents per approved port; decarbonization component = approved solar funding amount; then apply a 10% Environmental Justice adder where approved. Final amount is subject to LBE approval, current opportunity-notice terms, and available funds.",
          "conditional_award_cents": null,
          "min_award_cents": null,
          "max_award_cents": null,
          "cost_share_percent": null,
          "required_project_inputs": [
            "eligible_state_entity_status",
            "approved_project_components",
            "battery_kwh",
            "eligible_evse_port_count",
            "approved_solar_funding_amount_cents",
            "environmental_justice_adder_eligibility",
            "current_funding_and_cap_confirmation"
          ],
          "calculation_trace": [
            "COMMBUYS confirms an open LBE Solar-Decarbonization Grant Program for State Entities with a 06/30/2027 bid opening date.",
            "Official mass.gov program page was checked but was not directly fetchable; available official search text and DSIRE corroborate component adders."
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
          "competition_scope": "sector_specific",
          "probability_notes": "No historical application count, award count, current remaining funding amount, or success rate was found in accessible sources. Treat as conditional award math only until LBE confirms approval and funding."
        },
        "expected_value_recommendation": {
          "estimate_status": "needs_project_scope",
          "expected_value_cents": null,
          "estimate_confidence": "low",
          "include_in_user_facing_total_default": false,
          "reason_codes": [
            "missing_component_quantities",
            "needs_current_funding_check",
            "no_probability_discount_supported"
          ]
        },
        "fallback_prior_suggestion": {
          "probability_discount": null,
          "basis": "No automated fallback prior recommended; the program is narrow and formula-like but accessible sources do not expose enough award or funding data.",
          "should_retro_fi_use_without_human_approval": false
        }
      },
      "required_inputs": [
        {
          "input_key": "project_component",
          "label": "project component",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_9221facf5f8b2349"
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
          "input_key": "battery_kwh",
          "label": "battery kwh",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_1_9221facf5f8b2349"
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
          "input_key": "evse_port_count",
          "label": "evse port count",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_1_9221facf5f8b2349"
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
          "input_key": "solar_funding_amount_cents",
          "label": "solar funding amount cents",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_1_9221facf5f8b2349"
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
          "input_key": "environmental_justice_adder_eligibility",
          "label": "environmental justice adder eligibility",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_9221facf5f8b2349"
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
          "input_key": "eligible_state_entity_status",
          "label": "eligible state entity status",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_9221facf5f8b2349"
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
          "input_key": "battery_kwh_or_evse_port_count_or_solar_funding_amount",
          "label": "battery kwh or evse port count or solar funding amount",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_1_9221facf5f8b2349"
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
          "input_key": "ej_adder_status",
          "label": "EJ adder status",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_9221facf5f8b2349"
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
          "input_key": "approved_project_components",
          "label": "Approved Project Components",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_9221facf5f8b2349"
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
          "input_key": "eligible_evse_port_count",
          "label": "Eligible Evse Port Count",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_1_9221facf5f8b2349"
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
          "input_key": "approved_solar_funding_amount_cents",
          "label": "Approved Solar Funding Amount",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_1_9221facf5f8b2349"
          ],
          "source_precedence": [
            "quote",
            "user_profile",
            "retrofit_assumptions"
          ],
          "missing_severity": "blocks_calculation"
        },
        {
          "input_key": "current_funding_and_cap_confirmation",
          "label": "Current Funding And Cap Confirmation",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_1_9221facf5f8b2349"
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
        "evidence_f37f67a5a26550c5",
        "grant_probability_repair_117445795c6fdf6b"
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
          "value_model_measure_catalog",
          "grant_probability_repair_applied",
          "value_model_hybrid_rate_plus_cap",
          "estimate_status_needs_project_scope"
        ]
      }
    }
  ],
  "measure_catalogs": [
    {
      "catalog_id": "ma_lbe_solar_decarbonization_grant",
      "name": "ma_lbe_solar_decarbonization_grant",
      "selection_input": "project_component",
      "measures": [
        {
          "measure_id": "battery_storage",
          "name": "Battery storage",
          "category": null,
          "customer_filters": [],
          "equipment_filters": [],
          "calculation": {
            "method": "per_unit",
            "rate": {
              "amount": {
                "value": 500,
                "currency": "USD"
              },
              "unit": "unit"
            }
          },
          "limits": [],
          "required_inputs": [],
          "evidence_refs": [],
          "confidence": {
            "overall": 0.72,
            "calculation": 0.72,
            "extraction": 0.72,
            "reason_codes": [
              "gpt_pro_measure_catalog_row"
            ]
          },
          "source_row": {
            "measure": "Battery storage",
            "formula": "$500 per kWh of eligible battery storage.",
            "rateCents": 50000,
            "rateUnit": "per_kWh"
          }
        },
        {
          "measure_id": "additional_evse",
          "name": "Additional EVSE",
          "category": null,
          "customer_filters": [],
          "equipment_filters": [],
          "calculation": {
            "method": "fixed_amount",
            "amount": {
              "value": 5000,
              "currency": "USD"
            }
          },
          "limits": [],
          "required_inputs": [],
          "evidence_refs": [],
          "confidence": {
            "overall": 0.72,
            "calculation": 0.72,
            "extraction": 0.72,
            "reason_codes": [
              "gpt_pro_measure_catalog_row"
            ]
          },
          "source_row": {
            "measure": "Additional EVSE",
            "formula": "$5,000 per eligible EVSE port beyond ports required under canopy requirements.",
            "amountCents": 500000,
            "rateUnit": "per_port"
          }
        },
        {
          "measure_id": "decarbonization",
          "name": "Decarbonization",
          "category": null,
          "customer_filters": [],
          "equipment_filters": [],
          "calculation": {
            "method": "zero_when_not_applicable",
            "reason": "Measure row requires custom interpretation.",
            "source_row": {
              "measure": "Decarbonization",
              "formula": "Decarbonization funding equals the solar funding amount.",
              "requiredInputs": [
                "solar_funding_amount_cents"
              ]
            }
          },
          "limits": [],
          "required_inputs": [],
          "evidence_refs": [],
          "confidence": {
            "overall": 0.72,
            "calculation": 0.72,
            "extraction": 0.72,
            "reason_codes": [
              "gpt_pro_measure_catalog_row"
            ]
          },
          "source_row": {
            "measure": "Decarbonization",
            "formula": "Decarbonization funding equals the solar funding amount.",
            "requiredInputs": [
              "solar_funding_amount_cents"
            ]
          }
        },
        {
          "measure_id": "environmental_justice_adder",
          "name": "Environmental Justice adder",
          "category": null,
          "customer_filters": [],
          "equipment_filters": [],
          "calculation": {
            "method": "percent_of_cost",
            "percent": 0.1,
            "cost_input": "eligible_project_cost_cents"
          },
          "limits": [],
          "required_inputs": [],
          "evidence_refs": [],
          "confidence": {
            "overall": 0.72,
            "calculation": 0.72,
            "extraction": 0.72,
            "reason_codes": [
              "gpt_pro_measure_catalog_row"
            ]
          },
          "source_row": {
            "measure": "Environmental Justice adder",
            "formula": "10% adder to total solar, storage, EVSE and decarbonization funding requested.",
            "percent": 0.1
          }
        },
        {
          "measure_id": "solar_pv_base_funding",
          "name": "Solar PV base funding",
          "category": null,
          "customer_filters": [],
          "equipment_filters": [],
          "calculation": {
            "method": "zero_when_not_applicable",
            "reason": "Measure row requires custom interpretation.",
            "source_row": {
              "measure": "Solar PV base funding",
              "formula": "Source supports solar PV, but full base solar formula was not reliably extracted from the accessible official page.",
              "value": "needs_human_review"
            }
          },
          "limits": [],
          "required_inputs": [],
          "evidence_refs": [],
          "confidence": {
            "overall": 0.72,
            "calculation": 0.72,
            "extraction": 0.72,
            "reason_codes": [
              "gpt_pro_measure_catalog_row"
            ]
          },
          "source_row": {
            "measure": "Solar PV base funding",
            "formula": "Source supports solar PV, but full base solar formula was not reliably extracted from the accessible official page.",
            "value": "needs_human_review"
          }
        }
      ]
    }
  ],
  "input_requirements": [
    {
      "input_key": "project_component",
      "label": "project component",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_9221facf5f8b2349"
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
      "input_key": "battery_kwh",
      "label": "battery kwh",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_1_9221facf5f8b2349"
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
      "input_key": "evse_port_count",
      "label": "evse port count",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_1_9221facf5f8b2349"
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
      "input_key": "solar_funding_amount_cents",
      "label": "solar funding amount cents",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_1_9221facf5f8b2349"
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
      "input_key": "environmental_justice_adder_eligibility",
      "label": "environmental justice adder eligibility",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_9221facf5f8b2349"
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
      "input_key": "eligible_state_entity_status",
      "label": "eligible state entity status",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_9221facf5f8b2349"
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
      "input_key": "battery_kwh_or_evse_port_count_or_solar_funding_amount",
      "label": "battery kwh or evse port count or solar funding amount",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_1_9221facf5f8b2349"
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
      "input_key": "ej_adder_status",
      "label": "EJ adder status",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_9221facf5f8b2349"
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
      "input_key": "approved_project_components",
      "label": "Approved Project Components",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_9221facf5f8b2349"
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
      "input_key": "eligible_evse_port_count",
      "label": "Eligible Evse Port Count",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_1_9221facf5f8b2349"
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
      "input_key": "approved_solar_funding_amount_cents",
      "label": "Approved Solar Funding Amount",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_1_9221facf5f8b2349"
      ],
      "source_precedence": [
        "quote",
        "user_profile",
        "retrofit_assumptions"
      ],
      "missing_severity": "blocks_calculation"
    },
    {
      "input_key": "current_funding_and_cap_confirmation",
      "label": "Current Funding And Cap Confirmation",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_1_9221facf5f8b2349"
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
      "evidence_id": "evidence_f37f67a5a26550c5",
      "source_type": "gpt_pro_research_summary",
      "quote": "LBE Solar-Decarbonization grants support solar PV, battery storage, EVSE and decarbonization for eligible Massachusetts state facilities.",
      "source_urls": [
        "https://www.mass.gov/info-details/leading-by-example-solar-decarbonization-grant-program"
      ],
      "evidence_confidence": 0.72
    },
    {
      "evidence_id": "grant_probability_repair_117445795c6fdf6b",
      "source_type": "gpt_pro_grant_probability_repair",
      "quote": "COMMBUYS identifies the LBE Solar-Decarbonization Grant Program for State Entities as an open grant opportunity. The mass.gov page was checked but returned 403 in direct fetch; available official search text and DSIRE corroborate the component-adder structure.",
      "source_urls": [
        "https://www.mass.gov/info-details/leading-by-example-solar-decarbonization-grant-program",
        "https://www.commbuys.com/bso/external/bidDetail.sdo?docId=BD-25-1041-ENE01-ENE01-107704&external=true&parentUrl=bid",
        "https://programs.dsireusa.org/system/program/detail/22772/leading-by-example-solar-decarbonization-grant-program"
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
    "effect_grant_expected_value_1_9221facf5f8b2349: conditional award status needs_project_scope",
    "effect_grant_expected_value_1_9221facf5f8b2349: probability status first_come_funding_unknown"
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
  "opportunityId": "SOURCE_DSIRE:dsire_program_id:22772",
  "programName": "Leading by Example Solar-Decarbonization Grant Program",
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
