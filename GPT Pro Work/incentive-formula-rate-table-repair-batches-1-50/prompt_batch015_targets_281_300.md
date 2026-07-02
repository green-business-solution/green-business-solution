You are helping RetroFi repair incentive formulas, rate tables, grant estimates, tax credits, and non-cash workflow value rules.

Return strict JSON only. Do not include markdown, code fences, commentary, or citations outside JSON fields.

Batch: 15
Targets in this prompt: 281-300 of 984
Repair objects required: 20

Core distinction:
- Eligibility matching is already handled elsewhere. Do not decide whether a specific user is eligible.
- Your job is to extract the source-backed value/calculation/workflow logic for an already-matched opportunity.
- If current target retrofit edges are unsupported by the source, mark those edges as delete_bad_edge. Do not preserve false physical retrofit edges.
- If the opportunity is real but belongs to a special workflow, classify it as non_monetary_workflow, process_value, permit_fee_waiver, interconnection, technical_assistance, financing, tax_credit, tariff, or another accurate category.

Use current official sources first:
- program administrator pages
- utility rebate pages
- current application forms
- PDFs, program manuals, tariffs, statutes, tax authority pages, solicitation guides, rate sheets
- DSIRE may be used as a lead, but not as final authority when official sources are available.

Do not overstate value:
- Treat 'up to' as a cap, not an expected amount.
- Competitive max-only grants should not get a dollar estimate unless source-backed probability evidence exists.
- Loans/financing are not cash savings unless explicit forgiveness, buy-down, or subsidy value is stated.
- Tax credits are monetary, but classify them as tax_credit effects, not grants.
- Custom incentives should be custom_quote_required unless a formula/rate table is published.
- If project cost, unit count, kW, kWh savings, battery kWh, square feet, tonnage, equipment tier, or eligible cost basis is required, list it in requiredInputs.

Important target interpretation:
- `existingSimpleRules` are current legacy rules. Fact-check them; do not assume they are right.
- `reviewedNoRule` means previous research did not find a simple one-time formula. Re-check for recurring credits, tariffs, tax credits, grants, rate tables, measure catalogs, non-cash workflow value, or bad edges.
- `repairedOpportunityData` contains the latest source-confidence and match repair notes. Use it to avoid false physical edges and source-inaccessible traps.

Output schema:
{
  "schemaVersion": "incentive_formula_rate_table_research_repairs.v1",
  "researchedAt": "2026-07-02",
  "source": "gpt_pro",
  "batchNumber": 15,
  "repairs": [
    {
      "opportunityId": "exact target opportunityId",
      "opportunityName": "",
      "repairStatus": "calculation_package_found | custom_quote_required | non_monetary_workflow | no_monetary_effect | source_inaccessible | unavailable_archive | bad_edge_delete_only | needs_human_review",
      "calculationStatus": "calculable | calculable_with_missing_inputs | estimate_from_range | custom_quote_estimate | source_inaccessible_repair_failure | unavailable_archived | non_monetary_workflow | no_calculable_value | needs_repair_review",
      "sourceConfidence": "high | medium | low",
      "estimateConfidence": "high | medium | low",
      "cashValueClassifications": ["cash_grant | reimbursement | rebate | tax_credit | loan | financing | technical_assistance | process_value | tariff_or_rate | non_cash | unknown"],
      "primaryValueModelKinds": ["fixed_amount | fixed_tier_amount | percent_of_eligible_cost | capped_percent_of_eligible_cost | per_unit_award | rate_table | measure_catalog | hybrid_rate_plus_cap | competitive_max_only | competitive_award_range | competitive_cost_share | formula_grant | tax_credit | loan_or_financing | tariff_or_rate | custom_quote | non_cash_process_value | no_calculable_value | source_inaccessible"],
      "effects": [
        {
          "effectType": "one_time_savings | recurring_savings | recurring_expense | grant_expected_value | tax_credit | financing_subsidy | process_value | no_cash_value",
          "cashValueClassification": "cash_grant | reimbursement | rebate | tax_credit | loan | financing | technical_assistance | process_value | tariff_or_rate | non_cash | unknown",
          "valueModelKind": "fixed_amount | fixed_tier_amount | percent_of_eligible_cost | capped_percent_of_eligible_cost | per_unit_award | rate_table | measure_catalog | hybrid_rate_plus_cap | competitive_max_only | competitive_award_range | competitive_cost_share | formula_grant | tax_credit | loan_or_financing | tariff_or_rate | custom_quote | non_cash_process_value | no_calculable_value | source_inaccessible",
          "timing": "upfront | point_of_sale | post_purchase_rebate | post_installation_reimbursement | annual | monthly | tax_filing | loan_closing | application_process | unknown",
          "formulaText": "plain English formula from source",
          "amountCents": null,
          "percent": null,
          "rate": null,
          "rateUnit": null,
          "minAmountCents": null,
          "maxAmountCents": null,
          "caps": {
            "maxAwardCents": null,
            "minAwardCents": null,
            "maxPercentOfEligibleCost": null,
            "maxUnits": null,
            "perCustomerCapCents": null,
            "perSiteCapCents": null,
            "annualCapCents": null,
            "programBudgetCents": null
          },
          "eligibleCostCategories": [],
          "ineligibleCostCategories": [],
          "requiredInputs": [],
          "missingInputsForTypicalRetroFiEstimate": [],
          "rateTable": {
            "tableId": null,
            "dimensions": [],
            "rows": []
          },
          "measureCatalog": {
            "catalogId": null,
            "selectionInput": null,
            "rows": []
          },
          "probabilityModel": {
            "probabilityRequired": false,
            "probabilityDiscount": null,
            "probabilityEvidenceType": "not_required | historical_success_rate | budget_and_expected_awards | historical_awards_only | first_come_funds_confirmed | first_come_funding_unknown | scoring_criteria_only | eligibility_only | human_reviewed | none"
          },
          "includedInUserFacingTotalDefault": false,
          "evidenceText": "under 75 words, no URLs",
          "sourceUrls": []
        }
      ],
      "edgeActions": [
        {
          "retrofitTypeId": "target retrofitTypeId",
          "action": "keep | delete_bad_edge | move_to_special_workflow | needs_review",
          "reason": "source-backed reason"
        }
      ],
      "stackingRules": {
        "stackableWithRebates": null,
        "stackableWithTaxCredits": null,
        "mustDeductOtherIncentivesFromEligibleCost": null,
        "notes": ""
      },
      "timingRequirements": {
        "approvalRequiredBeforePurchase": null,
        "approvalRequiredBeforeInstallation": null,
        "applicationDeadline": null,
        "fundingStatus": "open_funds_available | open_while_funds_last | waitlist | closed | exhausted | unknown"
      },
      "sourceUrlsChecked": [],
      "evidenceText": "under 75 words, no URLs",
      "reasoningNotes": "",
      "humanReviewRequired": false,
      "humanReviewReasons": []
    }
  ],
  "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:22622"
}

Validation before responding:
- JSON.parse must succeed.
- repairs.length must equal 20.
- repairs must be in the same order as targets.
- Every target opportunityId must appear exactly once.
- Use raw URL strings only. No markdown links.
- Use cents for USD amounts where amount fields end in Cents.
- Use null for unknown numeric values, not 0.
- Use empty arrays for unknown lists.
- Keep evidenceText fields concise and URL-free.

Targets:
[
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1344",
    "opportunityName": "Vermont Gas - Residential Energy Efficiency Program",
    "state": "VT",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1344/vermont-gas-residential-energy-efficiency-program",
    "websiteUrl": "https://vgsvt.com/savings/residentialrebate/",
    "applicationUrl": null,
    "administrator": "Vermont Gas",
    "programType": "Rebate Program With Financing Options",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 5,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "high_efficiency_boiler_retrofit",
        "displayName": "High-efficiency boiler retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "boiler"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_furnace_retrofit",
        "displayName": "High-efficiency furnace retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "furnace"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
      },
      {
        "retrofitTypeId": "smart_thermostat_zoning_retrofit",
        "displayName": "Smart thermostat / zoning retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "smart thermostat",
          "thermostat"
        ]
      },
      {
        "retrofitTypeId": "waste_heat_recovery",
        "displayName": "Waste heat recovery",
        "parentCategory": "compressed_air_industrial",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "heat recovery"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "VT"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Vermont Gas natural gas service area"
        ],
        "notes": "Equipment and financing eligibility depend on location within the Vermont Gas service area."
      },
      "eligibleApplicantTypes": [
        "residential_natural_gas_customer",
        "homeowner"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_furnace_retrofit",
        "high_efficiency_boiler_retrofit",
        "combination_boiler",
        "high_efficiency_natural_gas_water_heater",
        "tankless_water_heater",
        "direct_vent_space_heater",
        "heat_recovery_ventilator",
        "energy_recovery_ventilator",
        "drain_water_heat_recovery",
        "smart_thermostat_zoning_retrofit",
        "manufactured_home_duct_sealing",
        "manufactured_home_insulation"
      ],
      "hardRequirements": [
        "Applicant must be in Vermont Gas residential service territory.",
        "Natural gas equipment must be installed by a natural-gas licensed contractor.",
        "Equipment must meet the listed AFUE, UEF or product requirements.",
        "Financing is subject to location, eligible measure type and credit approval.",
        "Program-year deadlines and equipment-specific rebate applications apply."
      ],
      "blockers": [
        "Waste heat recovery should not be matched as industrial or compressed-air waste heat recovery.",
        "Heat recovery in this program means residential HRV or ERV equipment and drain-water heat recovery.",
        "Heat pump water heater incentives are directed to Efficiency Vermont or Burlington Electric, not Vermont Gas.",
        "Do not infer commercial or industrial measures from this residential program."
      ],
      "programType": "Rebate Program With Financing Options",
      "administrator": "Vermont Gas",
      "applicationUrl": null,
      "websiteUrl": "https://vgsvt.com/savings/residentialrebate/",
      "sourceUrlsChecked": [
        "https://vgsvt.com/savings/residentialrebate/",
        "https://vgsvt.com/wp-content/uploads/2025/12/2026-Energy-Efficiency-Improvements-for-Manufactured-Homes.pdf"
      ],
      "evidenceText": "Vermont Gas lists residential rebates for furnaces, boilers, natural gas water heaters, HRV or ERV equipment, drain-water heat recovery and smart thermostats.",
      "reasoningNotes": "The high-efficiency HVAC match should be narrowed to natural gas furnace and boiler equipment."
    },
    "existingSimpleRules": [
      {
        "id": "oir_03b01715381bd836_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 10000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$100 per smart thermostat, up to two maximum",
        "evidenceText": "Vermont Gas residential table lists Smart Thermostat at $100, up to two max.",
        "sourceUrlsChecked": [
          "https://vgsvt.com/savings/residentialrebate/"
        ],
        "reasoningNotes": "Matched smart thermostat term. Use one unit as one qualifying thermostat.",
        "mapping": {
          "primarySavingsModelId": "controls_building_automation",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_211219bf96d86c38_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 40000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$400 per 97%+ AFUE furnace",
        "evidenceText": "Vermont Gas residential table lists 97%+ AFUE furnace at $400.",
        "sourceUrlsChecked": [
          "https://vgsvt.com/savings/residentialrebate/"
        ],
        "reasoningNotes": "Matched furnace term. Returned highest furnace tier.",
        "mapping": {
          "primarySavingsModelId": "controls_building_automation",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_981e17499e7f9d88_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 60000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$600 per 95%+ AFUE boiler",
        "evidenceText": "Vermont Gas residential table lists 95%+ AFUE boiler at $600.",
        "sourceUrlsChecked": [
          "https://vgsvt.com/savings/residentialrebate/"
        ],
        "reasoningNotes": "Matched boiler term. Returned highest boiler tier.",
        "mapping": {
          "primarySavingsModelId": "controls_building_automation",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_f7843e2a9a6bf9a0_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 40000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$400 per heat or energy recovery ventilator",
        "evidenceText": "Vermont Gas residential table lists Heat/Energy Recovery Ventilator at $400.",
        "sourceUrlsChecked": [
          "https://vgsvt.com/savings/residentialrebate/"
        ],
        "reasoningNotes": "Matched heat recovery term. Use one unit as one qualifying HRV/ERV.",
        "mapping": {
          "primarySavingsModelId": "controls_building_automation",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2214",
    "opportunityName": "Okanogan County PUD - Residential Energy Efficiency Rebate Program",
    "state": "WA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2214/okanogan-county-pud-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.okanoganpud.org/energy-services-incentives/energy-incentive-programs/residential-programs/",
    "applicationUrl": "https://www.okanoganpud.org/customer-service/permits-forms/",
    "administrator": "Okanogan County PUD Conservation Department",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 5,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "heat_pump_hvac_retrofit",
        "displayName": "Heat pump HVAC retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "heat pump",
          "ductless"
        ]
      },
      {
        "retrofitTypeId": "heat_pump_water_heater",
        "displayName": "Heat pump water heater",
        "parentCategory": "water_heating",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "heat pump water heater"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
      },
      {
        "retrofitTypeId": "insulation_upgrade",
        "displayName": "Insulation upgrade",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "insulation"
        ]
      },
      {
        "retrofitTypeId": "smart_thermostat_zoning_retrofit",
        "displayName": "Smart thermostat / zoning retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "smart thermostat",
          "thermostat"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "WA"
        ],
        "counties": [
          "Okanogan County"
        ],
        "cities": [],
        "utilityTerritories": [
          "Okanogan County PUD electric service territory"
        ],
        "notes": "Primary program pages returned 403 to the browser, but official indexed snippets and form titles confirm current residential incentive categories."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "homeowner"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "ductless_heat_pump",
        "heat_pump_water_heater",
        "insulation_upgrade",
        "smart_thermostat_zoning_retrofit",
        "window_replacement"
      ],
      "hardRequirements": [
        "Applicant must be an Okanogan County PUD residential customer.",
        "Customer should contact Energy Services and use the applicable project information or installation form before starting work.",
        "Smart thermostats and heat pump water heaters must be on the applicable qualified product list.",
        "Windows, insulation and heat pump work may require utility review, pre-inspection or approved contractors under the current forms."
      ],
      "blockers": [
        "Broad high-efficiency HVAC replacement should be blocked unless the work is a qualifying heat pump or ductless heat pump project.",
        "Commercial programs are separate from the residential program.",
        "Because direct official pages were blocked, detailed eligibility should be confirmed with Okanogan PUD before automated high-confidence matching."
      ],
      "programType": "Rebate Program",
      "administrator": "Okanogan County PUD Conservation Department",
      "applicationUrl": "https://www.okanoganpud.org/customer-service/permits-forms/",
      "websiteUrl": "https://www.okanoganpud.org/energy-services-incentives/energy-incentive-programs/residential-programs/",
      "sourceUrlsChecked": [
        "https://www.okanoganpud.org/energy-services-incentives/energy-incentive-programs/residential-programs/",
        "https://www.okanoganpud.org/customer-service/permits-forms/",
        "https://www.okanoganpud.org/faqs/heat-pump-water-heaters-2/",
        "https://www.okanoganpud.org/faqs/windows-2/",
        "https://www.okanoganpud.org/energy-services-incentives/energy-services/"
      ],
      "evidenceText": "Official Okanogan PUD snippets show residential smart thermostat, heat pump water heater, ductless heat pump, insulation and window project forms; direct page fetch returned 403.",
      "reasoningNotes": "Kept the categories confirmed by official snippets, but downgraded confidence because the browser could not read the full official forms or program page."
    },
    "existingSimpleRules": [
      {
        "id": "oir_745518ed22a45c61_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 800,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "$8 per eligible unit",
        "evidenceText": "30 or less Post-inspection Incentive Amount $8 per square foot of glass replaced",
        "sourceUrlsChecked": [
          "https://www.okanoganpud.org/energy-services/residential-programs"
        ],
        "reasoningNotes": "",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null,
          "businessRelevance": "residential_only",
          "v1Readiness": "not_v1_relevant"
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3326",
    "opportunityName": "Rocky Mountain Power - WattSmart Residential Efficiency Program",
    "state": "WY",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3326/rocky-mountain-power-wattsmart-residential-efficiency-program",
    "websiteUrl": "https://wattsmarthomes.com/",
    "applicationUrl": "https://wattsmarthomes.capturesportal.com/",
    "administrator": "Rocky Mountain Power",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 5,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "air_sealing_weatherization",
        "displayName": "Air sealing / weatherization",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "air sealing",
          "weatherization"
        ]
      },
      {
        "retrofitTypeId": "duct_sealing_and_insulation",
        "displayName": "Duct sealing and duct insulation",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "duct sealing"
        ]
      },
      {
        "retrofitTypeId": "heat_pump_hvac_retrofit",
        "displayName": "Heat pump HVAC retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "heat pump",
          "ductless"
        ]
      },
      {
        "retrofitTypeId": "heat_pump_water_heater",
        "displayName": "Heat pump water heater",
        "parentCategory": "water_heating",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "heat pump water heater"
        ]
      },
      {
        "retrofitTypeId": "insulation_upgrade",
        "displayName": "Insulation upgrade",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "insulation"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "WY"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Rocky Mountain Power"
        ],
        "notes": "Applies to eligible Wyoming residential customers buying electricity from Rocky Mountain Power on qualifying schedules."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "homeowner",
        "landlord"
      ],
      "eligibleSectors": [
        "residential",
        "multifamily_residential"
      ],
      "eligibleRetrofitCategories": [
        "duct_sealing_and_insulation",
        "heat_pump_hvac_retrofit",
        "heat_pump_water_heater",
        "insulation_upgrade",
        "high_efficiency_hvac_replacement"
      ],
      "hardRequirements": [
        "Customer must reside in Wyoming and buy electricity from Rocky Mountain Power on an eligible residential rate schedule.",
        "Projects must meet the measure-specific home type, existing condition, contractor, qualified product, and submission deadline requirements.",
        "Heat pump water heaters must replace eligible existing electric water heaters or meet listed new-construction rules.",
        "Duct sealing, insulation, and HVAC rebates must use approved requirements and documentation."
      ],
      "blockers": [
        "Do not treat duct sealing as whole-building air sealing unless a specific air-sealing measure is listed.",
        "Manufactured homes and new construction are excluded from some insulation and duct measures.",
        "Commercial and industrial measures are outside this residential wattsmart Homes program."
      ],
      "programType": "Rebate Program",
      "administrator": "Rocky Mountain Power",
      "applicationUrl": "https://wattsmarthomes.capturesportal.com/",
      "websiteUrl": "https://wattsmarthomes.com/",
      "sourceUrlsChecked": [
        "https://wattsmarthomes.com/",
        "https://wattsmarthomes.com/rebate-categories/heating-and-cooling/",
        "https://wattsmarthomes.com/rebates/duct-sealing-and-duct-insulation-wy/",
        "https://wattsmarthomes.com/rebates/ductless-heat-pumps-wy/",
        "https://wattsmarthomes.com/rebates/heat-pump-water-heaters-wy/",
        "https://wattsmarthomes.com/rebates/insulation-wy/"
      ],
      "evidenceText": "Wattsmart]( Homes Wyoming pages support duct sealing, duct insulation, air-source and ductless heat pumps, heat pump water heaters, insulation, and efficient cooling equipment.",
      "reasoningNotes": "Keep residential Wyoming HVAC, HPWH, duct, and insulation categories. Do not generalize duct sealing into broader air sealing unless the measure explicitly supports it."
    },
    "existingSimpleRules": [
      {
        "id": "oir_8fff72fd05e84a7a_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 35000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "$350 per heat pump water heater",
        "evidenceText": "DSIRE/current Wattsmart Wyoming summary lists heat pump water heater rebate at $350.",
        "sourceUrlsChecked": [
          "https://wattsmarthomes.com/rebates/heat-pump-water-heaters-wy/",
          "https://programs.dsireusa.org/system/program/detail/3326"
        ],
        "reasoningNotes": "Matched heat pump water heater term. Confidence is medium because the official landing page did not expose the amount directly.",
        "mapping": {
          "primarySavingsModelId": "refrigeration_electric_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_cbc1ee2d09324634_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 180000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "Up to $1,800 per air-source heat pump",
        "evidenceText": "Rocky Mountain Power green housing page says Wattsmart Homes offers rebates up to $1,800 for air-source heat pumps.",
        "sourceUrlsChecked": [
          "https://www.rockymountainpower.net/savings-energy-choices/home/green-housing.html",
          "https://wattsmarthomes.com/"
        ],
        "reasoningNotes": "Matched heat pump term. Confidence is medium because Wyoming program changes are scheduled July 10, 2026.",
        "mapping": {
          "primarySavingsModelId": "refrigeration_electric_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22738",
    "opportunityName": "Alabama Power - Electric Forklift Rebate",
    "state": "AL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22738/alabama-power-electric-forklift-rebate",
    "websiteUrl": "https://www.alabamapower.com/business/save-money-and-energy/offers-for-business-customers/electric-forklifts-and-etrus-.html",
    "applicationUrl": null,
    "administrator": "Alabama Power Co.",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 4,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "dc_fast_charger_installation",
        "displayName": "DC fast charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "dcfc"
        ]
      },
      {
        "retrofitTypeId": "electric_forklift_material_handling",
        "displayName": "Electric forklift / material handling equipment",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "electric forklift"
        ]
      },
      {
        "retrofitTypeId": "ev_charger_installation",
        "displayName": "EV charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
      },
      {
        "retrofitTypeId": "level_2_ev_charger_installation",
        "displayName": "Level 2 EV charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "level 2",
          "level-2"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "AL"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Alabama Power service territory"
        ],
        "notes": "Applicant must be an Alabama Power business customer or eligible business site."
      },
      "eligibleApplicantTypes": [
        "business_customer",
        "commercial_customer",
        "industrial_customer",
        "fleet_operator"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "transportation",
        "warehousing",
        "logistics"
      ],
      "eligibleRetrofitCategories": [
        "electric_forklift_material_handling",
        "electric_pallet_jack_stackers_tow_tractors",
        "electric_transport_refrigeration_unit"
      ],
      "hardRequirements": [
        "Equipment must be an eligible electric forklift class or electric transport refrigeration unit.",
        "New additions and conversions are eligible.",
        "Forklift rebate is based on the number of trucks, with charging system information required.",
        "Eligibility inquiry requires business and site information."
      ],
      "blockers": [
        "Level 2 EV charger, DC fast charger and general EV charger installation rebates belong to Alabama Power's separate Make Ready Program, not this forklift and eTRU offer.",
        "Charging system information is required for forklift rebate review, but the forklift offer does not pay a standalone EV charger rebate.",
        "Do not match passenger-vehicle charging unless using the separate Make Ready Program.",
        "Do not broaden eTRU plug support into general building refrigeration equipment."
      ],
      "programType": "Rebate Program",
      "administrator": "Alabama Power Co.",
      "applicationUrl": null,
      "websiteUrl": "https://www.alabamapower.com/business/save-money-and-energy/offers-for-business-customers/electric-forklifts-and-etrus-.html",
      "sourceUrlsChecked": [
        "https://www.alabamapower.com/business/save-money-and-energy/offers-for-business-customers/electric-forklifts-and-etrus-.html",
        "https://www.alabamapower.com/business/business-customers-and-services/electric-transportation-business-programs/make-ready-program.html"
      ],
      "evidenceText": "Alabama Power's offer pays rebates for eligible electric forklift classes and eTRU plugs; its Level 2 and DCFC charger rebates are on a separate Make Ready page.",
      "reasoningNotes": "The electric forklift match is correct. The DCFC and Level 2 charger matches are false positives for this opportunity because they are a separate program."
    },
    "existingSimpleRules": [
      {
        "id": "oir_aa009aac4213ecd3_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 25000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$250 per eligible Class 3 electric forklift",
        "evidenceText": "Alabama Power electric forklift materials list $250 per qualifying Class 3 forklift.",
        "sourceUrlsChecked": [
          "https://www.alabamapower.com/business/business-customers-and-services/electric-transportation-business-programs/electric-forklifts.html"
        ],
        "reasoningNotes": "Returned separately because Class 3 forklifts have a lower published amount.",
        "mapping": {
          "primarySavingsModelId": "fleet_fuel_replacement",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_f772a51e2c7b382e_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 100000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$1,000 per eligible Class 1, 2, 6, or 7 electric forklift",
        "evidenceText": "Alabama Power electric forklift materials list $1,000 per qualifying Class 1, 2, 6, or 7 forklift.",
        "sourceUrlsChecked": [
          "https://www.alabamapower.com/business/business-customers-and-services/electric-transportation-business-programs/electric-forklifts.html"
        ],
        "reasoningNotes": "Matched electric forklift term. Use one unit as one qualifying forklift.",
        "mapping": {
          "primarySavingsModelId": "fleet_fuel_replacement",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3681",
    "opportunityName": "Entergy Arkansas - CitySmart Energy Efficiency Program",
    "state": "AR",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3681/entergy-arkansas-citysmart-energy-efficiency-program",
    "websiteUrl": "https://www.entergyarkansas.com/energyefficiency/business/citysmart",
    "applicationUrl": null,
    "administrator": "Entergy Arkansas",
    "programType": "Custom Rebate And Technical Assistance",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 4,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "building_benchmarking_compliance",
        "displayName": "Building benchmarking compliance",
        "parentCategory": "certifications_compliance",
        "isPhysicalRetrofit": false,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "benchmarking"
        ]
      },
      {
        "retrofitTypeId": "energy_management_system",
        "displayName": "Energy management system",
        "parentCategory": "building_controls_energy_management",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "energy management"
        ]
      },
      {
        "retrofitTypeId": "led_lighting_retrofit",
        "displayName": "LED lighting retrofit",
        "parentCategory": "lighting",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
      },
      {
        "retrofitTypeId": "low_flow_fixture_retrofit",
        "displayName": "Low-flow fixture retrofit",
        "parentCategory": "water_efficiency",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "low flow"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "AR"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Entergy Arkansas"
        ],
        "notes": "Eligible participants must receive electric service from Entergy Arkansas and meet CitySmart-SCORE participant rules."
      },
      "eligibleApplicantTypes": [
        "government_entity",
        "government_owned_institution",
        "public_k12_school",
        "private_k12_school",
        "higher_education_institution",
        "municipality",
        "local_government",
        "state_government",
        "federal_government",
        "eligible_501c3_mission_based_organization"
      ],
      "eligibleSectors": [
        "public_sector",
        "education",
        "municipal",
        "institutional",
        "nonprofit"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "exterior_site_lighting_retrofit",
        "lighting_controls_retrofit",
        "hvac_controls_and_upgrades",
        "advanced_wifi_thermostat",
        "vfd_motor_drive_retrofit",
        "commercial_refrigeration_upgrade",
        "refrigeration_gaskets_and_strip_curtains",
        "commercial_kitchen_equipment",
        "low_flow_faucet_aerator",
        "low_flow_showerhead",
        "pre_rinse_spray_valve",
        "air_sealing_weatherization",
        "overhead_door_infiltration_reduction",
        "wastewater_treatment_plant_fan_blower_pump_retrofit",
        "pc_power_management",
        "retro_commissioning_lite",
        "continuous_energy_improvement",
        "green_commissioning",
        "custom_energy_efficiency_measure"
      ],
      "hardRequirements": [
        "Participant must be a current institutional or public/private entity receiving electric service from Entergy Arkansas.",
        "CitySmart-SCORE is designed for governmental entities, government-owned institutions and public/private education entities; the 2026 manual adds a mission-based 501(c)(3) offering excluding religious facilities.",
        "Measures must produce measurable, verifiable kWh savings and generally target at least 25,000 kWh annual savings for incentive treatment.",
        "New equipment must exceed minimum efficiency standards and cannot claim savings from fuel switching.",
        "Projects require program enrollment, application, pre-installation confirmation and post-installation verification."
      ],
      "blockers": [
        "Building benchmarking and energy master planning are technical-assistance benefits, not physical retrofit categories or compliance mandates.",
        "Do not match residential customers or private commercial facilities unless they meet CitySmart-SCORE or mission-based eligibility.",
        "Low-flow measures are limited to listed direct-install faucet aerators, shower heads and pre-rinse spray valves; do not generalize to broad water-conservation projects.",
        "Incentives may be unavailable if the program is fully subscribed at project completion."
      ],
      "programType": "Custom Rebate And Technical Assistance",
      "administrator": "Entergy Arkansas",
      "applicationUrl": null,
      "websiteUrl": "https://www.entergyarkansas.com/energyefficiency/business/citysmart",
      "sourceUrlsChecked": [
        "https://www.entergyarkansas.com/energyefficiency/business/citysmart",
        "https://www.entergyarkansas.com/wp-content/uploads/2025/06/CitySmart_Program_Manual.pdf"
      ],
      "evidenceText": "Entergy]( Arkansas’ current CitySmart page lists eligible upgrades including lighting, HVAC controls, VFDs, refrigeration, kitchen upgrades, low-flow direct install measures, wastewater retrofits and commissioning.",
      "reasoningNotes": "Benchmarking was removed as a retrofit category because the official manual frames it as assistance for identifying and planning energy-efficiency projects, not as an incentivized physical retrofit itself."
    },
    "existingSimpleRules": [
      {
        "id": "oir_260d8a460bd78bf9_v1",
        "incentiveType": "custom_efficiency_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "rate_per_kwh",
          "amountCentsPerKwh": 5,
          "kwhSource": "annual_kwh_delta_abs"
        },
        "basisPolicy": {
          "basis": "eligible_cost_categories",
          "applicationOrder": 10
        },
        "cap": {
          "maxPercentOfBasis": 1
        },
        "confidence": "high",
        "formula": "$0.05 per kWh saved for green commissioning measures",
        "evidenceText": "Entergy Arkansas CitySmart materials list green commissioning incentives at $0.05 per kWh saved.",
        "sourceUrlsChecked": [
          "https://www.entergyarkansas.com/energyefficiency/business/citysmart",
          "https://cdn.entergy-arkansas.com/userfiles/content/energy_efficiency/docs/2026_CitySmart_Manual.pdf"
        ],
        "reasoningNotes": "Matched commissioning/energy-management terms. Returned separately because commissioning has a lower published rate.",
        "mapping": {
          "primarySavingsModelId": "controls_building_automation",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_fbd6dd737ef68a56_v1",
        "incentiveType": "custom_efficiency_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "rate_per_kwh",
          "amountCentsPerKwh": 14,
          "kwhSource": "annual_kwh_delta_abs"
        },
        "basisPolicy": {
          "basis": "eligible_cost_categories",
          "applicationOrder": 10
        },
        "cap": {
          "maxPercentOfBasis": 1
        },
        "confidence": "high",
        "formula": "$0.14 per first-year kWh saved for typical non-lighting CitySmart measures",
        "evidenceText": "Entergy Arkansas CitySmart materials list all other measures at $0.14-$0.18 per kWh saved depending on project type.",
        "sourceUrlsChecked": [
          "https://www.entergyarkansas.com/energyefficiency/business/citysmart",
          "https://cdn.entergy-arkansas.com/userfiles/content/energy_efficiency/docs/2026_CitySmart_Manual.pdf"
        ],
        "reasoningNotes": "Matched energy-management and benchmarking-related custom efficiency terms. Selected the lower non-lighting rate as safer general candidate.",
        "mapping": {
          "primarySavingsModelId": "controls_building_automation",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1665",
    "opportunityName": "City of Lompoc Utilities - Commercial Energy Efficiency Rebate Program",
    "state": "CA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1665/city-of-lompoc-utilities-commercial-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.cityoflompoc.com/government/departments/utilities/conservation",
    "applicationUrl": "https://directefficiency.com/lompoc-rebates/",
    "administrator": "City of Lompoc Utilities",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 4,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "heat_pump_hvac_retrofit",
        "displayName": "Heat pump HVAC retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "heat pump"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "air conditioner"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_refrigeration_equipment",
        "displayName": "High-efficiency refrigeration equipment",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
      },
      {
        "retrofitTypeId": "led_lighting_retrofit",
        "displayName": "LED lighting retrofit",
        "parentCategory": "lighting",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
      }
    ],
    "repairedOpportunityData": {
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "CA"
        ],
        "counties": [
          "Santa Barbara County"
        ],
        "cities": [
          "Lompoc"
        ],
        "utilityTerritories": [
          "City of Lompoc electric utility service territory"
        ],
        "notes": "Program is for eligible City of Lompoc utility customers, with commercial rebates administered through the city's conservation program and Direct Efficiency."
      },
      "eligibleApplicantTypes": [
        "commercial_electric_customer",
        "industrial_electric_customer",
        "business_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "food_service"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "commercial_lighting_retrofit",
        "high_efficiency_hvac_replacement",
        "commercial_heating_cooling_equipment",
        "commercial_kitchen_food_service_equipment",
        "commercial_custom_energy_efficiency_retrofit",
        "commercial_business_improvement_rebate"
      ],
      "hardRequirements": [
        "Customer must be served by the City of Lompoc utility.",
        "Existing equipment inspection is required for custom energy efficient retrofit projects.",
        "Commercial rebate eligibility must be processed through the current City of Lompoc or Direct Efficiency rebate process."
      ],
      "blockers": [
        "Do not match heat_pump_hvac_retrofit as a specific category unless the current commercial application confirms the proposed heat pump measure.",
        "Do not match broad high_efficiency_refrigeration_equipment from the current commercial list; kitchen and food service equipment is narrower and refrigeration is not separately named in the reviewed current city list.",
        "Water conservation and low-flow fixtures are separate from this commercial electric efficiency rebate."
      ],
      "programType": "Rebate",
      "administrator": "City of Lompoc Utilities",
      "applicationUrl": "https://directefficiency.com/lompoc-rebates/",
      "websiteUrl": "https://www.cityoflompoc.com/government/departments/utilities/conservation",
      "sourceUrlsChecked": [
        "https://www.cityoflompoc.com/government/departments/utilities/conservation",
        "https://directefficiency.com/lompoc-rebates/"
      ],
      "evidenceText": "The City of Lompoc conservation page lists commercial lighting, business improvement, product, and custom project rebates. The linked rebate administrator identifies commercial rebates for custom projects, lighting, heating and cooling, and kitchen and food service equipment.",
      "reasoningNotes": "Commercial lighting and high-efficiency HVAC/heating-cooling are supported. Heat pump HVAC and broad commercial refrigeration are too specific or too broad without clearer current application support."
    },
    "existingSimpleRules": [
      {
        "id": "oir_d9895c5fbb7074c2_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 22500,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "equipment_plus_labor",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "$225 per ton for packaged or split air-source heat pump under 65,000 Btuh",
        "evidenceText": "Lompoc commercial heating and cooling rebate materials list air-source heat pump under 65,000 Btuh at $225/ton.",
        "sourceUrlsChecked": [
          "http://www.cityoflompoc.com/utilities/conservation/",
          "https://directefficiency.com/lompoc-commercial-heating-cooling-rebates/"
        ],
        "reasoningNotes": "Matched air conditioner and heat pump terms. Confidence is medium because the detailed table is on the program implementer page.",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_ef858fbe3f715abf_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 10000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "equipment_plus_labor",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "$100 per ton for central air conditioner under 65,000 Btuh",
        "evidenceText": "Lompoc commercial heating and cooling rebate materials list central air conditioner under 65,000 Btuh at $100/ton.",
        "sourceUrlsChecked": [
          "http://www.cityoflompoc.com/utilities/conservation/",
          "https://directefficiency.com/lompoc-commercial-heating-cooling-rebates/"
        ],
        "reasoningNotes": "Returned separately from heat pump candidate. Use unit_count as eligible tons.",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:6849d4cc60567610:customer-directed-electrification-rebate",
    "opportunityName": "Customer Directed Electrification Rebate",
    "state": "CA",
    "sourceName": "Silicon Valley Power Business Programs",
    "sourceUrl": "https://www.siliconvalleypower.com/businesses/electrification-programs-rebates",
    "websiteUrl": "https://www.siliconvalleypower.com/businesses/electrification-programs-rebates",
    "applicationUrl": "https://www.siliconvalleypower.com/home/showpublisheddocument/77781/638886947877900000",
    "administrator": "Silicon Valley Power",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 4,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "combined_heat_and_power_system",
        "displayName": "Combined heat and power system",
        "parentCategory": "solar_renewable_electricity",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "cogeneration"
        ]
      },
      {
        "retrofitTypeId": "heat_pump_hvac_retrofit",
        "displayName": "Heat pump HVAC retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "heat pump"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
      },
      {
        "retrofitTypeId": "low_flow_fixture_retrofit",
        "displayName": "Low-flow fixture retrofit",
        "parentCategory": "water_efficiency",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "fixture"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "CA"
        ],
        "counties": [
          "Santa Clara County"
        ],
        "cities": [
          "Santa Clara"
        ],
        "utilityTerritories": [
          "Silicon Valley Power"
        ],
        "notes": "Limited to nonresidential Silicon Valley Power customers in the City of Santa Clara electric utility service area."
      },
      "eligibleApplicantTypes": [
        "nonresidential_customer",
        "business_customer",
        "commercial_customer",
        "industrial_customer",
        "institutional_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "institutional",
        "nonresidential"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "heat_pump_water_heater",
        "process_equipment_electrification",
        "heat_recovery_chiller",
        "heat_pump_pool_heater",
        "custom_gas_to_electric_equipment_replacement"
      ],
      "hardRequirements": [
        "Customer must be a nonresidential Silicon Valley Power customer.",
        "Electric equipment must replace natural-gas-fired equipment and perform the same function.",
        "Preapproval is required before purchase, installation, or construction.",
        "Project is subject to SVP technical review and pre- and post-installation inspections.",
        "Equipment must reduce natural gas use and meet measure-specific requirements."
      ],
      "blockers": [
        "Self-generation and cogeneration are explicitly ineligible.",
        "Do not match combined heat and power to this rebate.",
        "Low-flow fixtures and water-conservation-only projects are not supported by this electrification rebate.",
        "Food service equipment is a separate SVP rebate boundary.",
        "EV charging is a separate SVP program and should not be matched to this record."
      ],
      "programType": "Rebate",
      "administrator": "Silicon Valley Power",
      "applicationUrl": "https://www.siliconvalleypower.com/home/showpublisheddocument/77781/638886947877900000",
      "websiteUrl": "https://www.siliconvalleypower.com/businesses/electrification-programs-rebates",
      "sourceUrlsChecked": [
        "https://www.siliconvalleypower.com/businesses/electrification-programs-rebates",
        "https://www.siliconvalleypower.com/home/showpublisheddocument/77781/638886947877900000"
      ],
      "evidenceText": "SVP]( describes the rebate as offsetting replacement of natural-gas-fired nonresidential equipment with efficient all-electric equipment, including heat pumps, heat pump water heaters and custom gas-reducing process measures.",
      "reasoningNotes": "The original cogeneration and low-flow fixture matches are false positives; the supported boundary is gas-to-electric nonresidential electrification."
    },
    "existingSimpleRules": [
      {
        "id": "oir_c302e1dc7846d521_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 65000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "$650 per eligible unit",
        "evidenceText": "Rebates of up to $650 per ton are available",
        "sourceUrlsChecked": [
          "https://www.siliconvalleypower.com/businesses/electrification-programs-rebates",
          "https://www.siliconvalleypower.com/home/showpublisheddocument/77781/638886947877900000"
        ],
        "reasoningNotes": "",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null,
          "businessRelevance": "business_relevant",
          "v1Readiness": "needs_project_scope"
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:energy-efficiency-grant-program-for-nonprofit-organizations",
    "opportunityName": "Energy Efficiency Grant Program for Nonprofit Organizations",
    "state": "CA",
    "sourceName": "Silicon Valley Power Business Programs",
    "sourceUrl": "https://www.siliconvalleypower.com/businesses/rebates",
    "websiteUrl": "https://www.siliconvalleypower.com/businesses/rebates",
    "applicationUrl": "https://www.siliconvalleypower.com/home/showpublisheddocument/65401/638892913182770000",
    "administrator": "Silicon Valley Power",
    "programType": "Grant",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 4,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "air_sealing_weatherization",
        "displayName": "Air sealing / weatherization",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "weatherization"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
      },
      {
        "retrofitTypeId": "led_lighting_retrofit",
        "displayName": "LED lighting retrofit",
        "parentCategory": "lighting",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
      },
      {
        "retrofitTypeId": "low_flow_fixture_retrofit",
        "displayName": "Low-flow fixture retrofit",
        "parentCategory": "water_efficiency",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "fixture"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "CA"
        ],
        "counties": [
          "Santa Clara County"
        ],
        "cities": [
          "Santa Clara"
        ],
        "utilityTerritories": [
          "Silicon Valley Power"
        ],
        "notes": "Limited to eligible nonprofit organizations that are SVP electric utility billing customers of record in Santa Clara."
      },
      "eligibleApplicantTypes": [
        "nonprofit_501c3",
        "nonprofit_501c19",
        "svppower_customer_of_record"
      ],
      "eligibleSectors": [
        "nonprofit",
        "institutional"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "high_efficiency_hvac_replacement",
        "air_sealing_weatherization"
      ],
      "hardRequirements": [
        "Applicant must be the SVP electric utility billing customer of record.",
        "Applicant must be a 501(c)(3) or 501(c)(19) nonprofit and listed as active with the California Franchise Tax Board.",
        "Applicant must meet operating history or utility-bill history requirements and have at least one full-time employee.",
        "Applicant must own the facility or have at least five years remaining on the lease.",
        "Projects must save electricity and are subject to SVP energy-engineer review, audit if required, and pre- and post-installation inspections.",
        "Applications are accepted twice per calendar year with June 30 and December 31 deadlines; maximum funding is capped per project and per period."
      ],
      "blockers": [
        "Do not match for-profit businesses, residential customers, or nonprofits outside SVP service territory.",
        "Low-flow fixture or water-conservation-only work is not supported; projects must save electricity.",
        "Solar, EV charging, and electrification rebates are separate SVP programs.",
        "Funding is limited and may be forfeited if final documentation and inspection deadlines are missed."
      ],
      "programType": "Grant",
      "administrator": "Silicon Valley Power",
      "applicationUrl": "https://www.siliconvalleypower.com/home/showpublisheddocument/65401/638892913182770000",
      "websiteUrl": "https://www.siliconvalleypower.com/businesses/rebates",
      "sourceUrlsChecked": [
        "https://www.siliconvalleypower.com/businesses/rebates",
        "https://www.siliconvalleypower.com/home/showpublisheddocument/65401/638892913182770000"
      ],
      "evidenceText": "SVP’s]( 2025-2026 nonprofit grant application says eligible projects must save electricity and typical funded projects include lighting, HVAC and weatherization improvements.",
      "reasoningNotes": "The weatherization, HVAC and lighting matches are supported; low-flow fixtures were removed because the official grant is limited to electricity-saving projects."
    },
    "existingSimpleRules": [
      {
        "id": "oir_01ab80878d51bbd9_v1",
        "incentiveType": "grant",
        "timing": "upfront",
        "amountRule": {
          "kind": "percent_of_basis",
          "percent": 1
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": {
          "maxAmountCents": 25000000
        },
        "confidence": "medium",
        "formula": "up to $250,000 of eligible project cost",
        "evidenceText": "Grant award limits will be paid based on energy saved, subject to a maximum of 85 percent of project cost up to a $250,000 limit per customer",
        "sourceUrlsChecked": [
          "https://www.siliconvalleypower.com/businesses/rebates",
          "https://www.siliconvalleypower.com/home/showpublisheddocument/65401/638892913182770000"
        ],
        "reasoningNotes": "",
        "mapping": {
          "primarySavingsModelId": "grant_funding",
          "incentiveValueMethod": "grant_amount",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null,
          "businessRelevance": "public_nonprofit_only",
          "v1Readiness": "not_v1_relevant"
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:food-service-equipment-rebate-program",
    "opportunityName": "Food Service Equipment Rebate Program",
    "state": "CA",
    "sourceName": "Silicon Valley Power Business Programs",
    "sourceUrl": "https://www.siliconvalleypower.com/businesses/rebates",
    "websiteUrl": "https://www.siliconvalleypower.com/businesses/rebates",
    "applicationUrl": "https://www.siliconvalleypower.com/home/showpublisheddocument/53816/638222676983930000",
    "administrator": "Silicon Valley Power",
    "programType": "Commercial Food Service Equipment Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 4,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "battery_storage_system",
        "displayName": "Battery storage system",
        "parentCategory": "energy_storage_resilience",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
      },
      {
        "retrofitTypeId": "demand_controlled_kitchen_ventilation",
        "displayName": "Demand-controlled kitchen ventilation",
        "parentCategory": "commercial_kitchen_foodservice",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "kitchen ventilation"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_refrigeration_equipment",
        "displayName": "High-efficiency refrigeration equipment",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "refrigeration",
          "refrigerator"
        ]
      },
      {
        "retrofitTypeId": "low_flow_fixture_retrofit",
        "displayName": "Low-flow fixture retrofit",
        "parentCategory": "water_efficiency",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "fixture"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "CA"
        ],
        "counties": [
          "Santa Clara County"
        ],
        "cities": [
          "Santa Clara"
        ],
        "utilityTerritories": [
          "Silicon Valley Power"
        ],
        "notes": "Business customer facility must be served by Silicon Valley Power in Santa Clara."
      },
      "eligibleApplicantTypes": [
        "business_customers",
        "commercial_food_service_customers",
        "restaurants",
        "grocery_food_service_facilities",
        "institutional_food_service_facilities"
      ],
      "eligibleSectors": [
        "commercial",
        "institutional",
        "public_sector",
        "nonprofit",
        "restaurants",
        "grocery",
        "hospitality"
      ],
      "eligibleRetrofitCategories": [
        "demand_controlled_kitchen_ventilation",
        "commercial_foodservice_refrigeration_equipment",
        "commercial_ice_machine",
        "commercial_refrigeration_controls",
        "commercial_foodservice_electric_cooking_equipment",
        "commercial_insulated_holding_cabinet",
        "commercial_induction_cooktop",
        "walk_in_cooler_freezer_ecm_motor",
        "anti_sweat_heater_controls",
        "refrigerated_case_door_retrofit"
      ],
      "hardRequirements": [
        "Pre-approval is required before installation.",
        "Equipment must be new, qualifying commercial food service equipment and installed at the SVP-served facility.",
        "Measures must remain operational and saving energy for the required retention period.",
        "Project completion, inspection, invoices and product qualification documentation are required.",
        "Program year, rebate levels and budget must be verified on the latest SVP application because terms are subject to change after June 30, 2026."
      ],
      "blockers": [
        "Battery storage is not part of the food service equipment rebate.",
        "Low-flow plumbing fixtures or water conservation measures are not part of this food service equipment rebate.",
        "Do not broaden commercial refrigerators/freezers into unrelated residential or non-food-service refrigeration.",
        "Used, rebuilt, inventory-only, resale or installed-before-preapproval equipment is not eligible."
      ],
      "programType": "Commercial Food Service Equipment Rebate",
      "administrator": "Silicon Valley Power",
      "applicationUrl": "https://www.siliconvalleypower.com/home/showpublisheddocument/53816/638222676983930000",
      "websiteUrl": "https://www.siliconvalleypower.com/businesses/rebates",
      "sourceUrlsChecked": [
        "https://www.siliconvalleypower.com/businesses/rebates",
        "https://www.siliconvalleypower.com/home/showpublisheddocument/53816/638222676983930000"
      ],
      "evidenceText": "SVP describes rebates for qualifying energy-efficient commercial food service cooking, hot and cold storage, refrigeration controls and demand-controlled kitchen ventilation, with pre-approval and program-term requirements.",
      "reasoningNotes": "Kept food-service refrigeration and kitchen ventilation, but removed battery and water-fixture false positives. Confidence is medium because the checked application was the 2025-2026 form with post-June 30 terms subject to update."
    },
    "existingSimpleRules": [
      {
        "id": "oir_0c21735ba5f92cf8_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 140000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "equipment_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$1,400 per exhaust fan horsepower for demand-controlled kitchen ventilation",
        "evidenceText": "SVP 2025-2026 Food Service Rebate Application lists rebate level of $1,400 per exhaust fan hp.",
        "sourceUrlsChecked": [
          "https://www.siliconvalleypower.com/businesses/rebates",
          "https://www.siliconvalleypower.com/home/showpublisheddocument/53816/638222676983930000"
        ],
        "reasoningNotes": "Matched kitchen ventilation and food-service equipment terms. Use unit_count as eligible exhaust fan horsepower.",
        "mapping": {
          "primarySavingsModelId": "refrigeration_electric_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1431",
    "opportunityName": "SDG&E - Residential Efficiency Rebate Program",
    "state": "CA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1431/sdg-and-e-residential-efficiency-rebate-program",
    "websiteUrl": "https://www.sdge.com/rebates",
    "applicationUrl": "https://goldenstaterebates.clearesult.com/",
    "administrator": "San Diego Gas & Electric",
    "programType": "Point Of Sale Rebate Coupon",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 4,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "heat_pump_hvac_retrofit",
        "displayName": "Heat pump HVAC retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "heat pump"
        ]
      },
      {
        "retrofitTypeId": "heat_pump_water_heater",
        "displayName": "Heat pump water heater",
        "parentCategory": "water_heating",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "heat pump water heater"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "air conditioner"
        ]
      },
      {
        "retrofitTypeId": "smart_thermostat_zoning_retrofit",
        "displayName": "Smart thermostat / zoning retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "smart thermostat",
          "thermostat"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "CA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "San Diego Gas & Electric"
        ],
        "notes": "Available to eligible SDG&E residential customers through Golden State Rebates for qualifying home products."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "homeowner",
        "renter"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_water_heater",
        "smart_thermostat",
        "room_air_conditioner"
      ],
      "hardRequirements": [
        "Customer must purchase an eligible product through the current Golden State Rebates process.",
        "Heat pump water heater rebate applies to qualifying units replacing an electric water heater.",
        "Room air conditioner support applies only to qualifying ENERGY STAR Advanced room air conditioners.",
        "No post-purchase rebate is available through the current listed program."
      ],
      "blockers": [
        "Central heat pump HVAC retrofit is not supported by the current SDG&E listed residential product rebates.",
        "High-efficiency central HVAC replacement is not supported by the current product list.",
        "Smart thermostat support is a product rebate and should not be generalized to zoning controls.",
        "Room air conditioner support is not a broad building HVAC replacement rebate."
      ],
      "programType": "Point Of Sale Rebate Coupon",
      "administrator": "San Diego Gas & Electric",
      "applicationUrl": "https://goldenstaterebates.clearesult.com/",
      "websiteUrl": "https://www.sdge.com/rebates",
      "sourceUrlsChecked": [
        "https://www.sdge.com/rebates",
        "https://goldenstaterebates.clearesult.com/"
      ],
      "evidenceText": "SDG&E's rebate page lists Golden State Rebates for qualifying smart thermostats, heat pump water heaters replacing electric water heaters, and ENERGY STAR Advanced room air conditioners; it says no post-purchase rebates are offered.",
      "reasoningNotes": "The match should be narrowed to the product-specific rebates now listed by SDG&E. Central HVAC replacement and heat pump HVAC retrofits are not supported by the current page."
    },
    "existingSimpleRules": [
      {
        "id": "oir_d5395a402f44c0b3_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 7500,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$75 per ENERGY STAR certified smart thermostat",
        "evidenceText": "SDG&E residential rebates list a $75 rebate for ENERGY STAR smart thermostats.",
        "sourceUrlsChecked": [
          "https://www.sdge.com/residential/savings-center/rebates",
          "https://www.sdge.com/residential/savings-center/rebates/smart-thermostats"
        ],
        "reasoningNotes": "Matched smart thermostat/control terms. Use one unit as one qualifying thermostat.",
        "mapping": {
          "primarySavingsModelId": "controls_building_automation",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1917",
    "opportunityName": "SMUD - Commercial Energy Efficiency Rebate Program",
    "state": "CA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1917/smud-commercial-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.smud.org/Business-Solutions-and-Rebates/Business-Rebates",
    "applicationUrl": "https://smudcompleteenergysolutions.customerapplication.com/",
    "administrator": "Sacramento Municipal Utility District",
    "programType": "Commercial Energy Efficiency Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 4,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "heat_pump_hvac_retrofit",
        "displayName": "Heat pump HVAC retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "heat pump"
        ]
      },
      {
        "retrofitTypeId": "heat_pump_water_heater",
        "displayName": "Heat pump water heater",
        "parentCategory": "water_heating",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "heat pump water heater"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_refrigeration_equipment",
        "displayName": "High-efficiency refrigeration equipment",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "refrigeration"
        ]
      },
      {
        "retrofitTypeId": "induction_cooking_equipment",
        "displayName": "Induction cooking equipment",
        "parentCategory": "commercial_kitchen_foodservice",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "induction"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "CA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Sacramento Municipal Utility District"
        ],
        "notes": "Available to eligible SMUD non-residential customers in SMUD electric service territory."
      },
      "eligibleApplicantTypes": [
        "business_customer",
        "commercial_property_owner",
        "industrial_customer",
        "nonprofit",
        "public_entity",
        "institutional_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "institutional",
        "nonprofit",
        "government"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "heat_pump_water_heater",
        "high_efficiency_refrigeration_equipment",
        "induction_cooking_equipment",
        "high_efficiency_hvac_replacement",
        "high_efficiency_chiller_replacement",
        "variable_frequency_drive_retrofit",
        "hvac_controls_retrofit",
        "energy_management_system"
      ],
      "hardRequirements": [
        "Applicant must be an eligible SMUD non-residential customer.",
        "Complete Energy Solutions projects require the program assessment and approval process.",
        "Custom incentives require preapproval before purchase or installation.",
        "Equipment must meet SMUD technical requirements and current program incentive terms.",
        "Funds and incentive levels are subject to current program availability."
      ],
      "blockers": [
        "Projects installed before required approval are ineligible for custom incentives.",
        "Building envelope and solar water heating are excluded from current custom incentive eligibility.",
        "Lighting projects are not supported as a new matched category because SMUD indicates lighting incentives are being discontinued.",
        "EV charging is listed by SMUD separately and should not be inferred unless specifically using the EV charging program pathway."
      ],
      "programType": "Commercial Energy Efficiency Rebate",
      "administrator": "Sacramento Municipal Utility District",
      "applicationUrl": "https://smudcompleteenergysolutions.customerapplication.com/",
      "websiteUrl": "https://www.smud.org/Business-Solutions-and-Rebates/Business-Rebates",
      "sourceUrlsChecked": [
        "https://www.smud.org/Business-Solutions-and-Rebates/Business-Rebates",
        "https://www.smud.org/Business-Solutions-and-Rebates/Business-Rebates/Complete-Energy-Solutions-Program",
        "https://www.smud.org/Business-Solutions-and-Rebates/Business-Rebates/Custom-Incentives"
      ],
      "evidenceText": "SMUD business rebate pages list Complete Energy Solutions and custom incentives covering refrigeration, food service, heat pump HVAC, heat pump water heating, induction cooking, chillers, controls, VSDs and industrial equipment.",
      "reasoningNotes": "The original matched categories are supported, and custom incentives add closely related non-residential HVAC, chiller, VSD and controls categories. Residential or envelope measures should not be inferred."
    },
    "existingSimpleRules": [
      {
        "id": "oir_29ff65bfd3681c7a_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 700000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$7,000 per commercial heat pump water heater replacing gas equipment",
        "evidenceText": "SMUD Complete Energy Solutions lists $7,000 for heat pump water heater, 50 gallons and up, replacing gas equipment.",
        "sourceUrlsChecked": [
          "https://www.smud.org/Business-Solutions-and-Rebates/Business-Rebates/Complete-Energy-Solutions-Program"
        ],
        "reasoningNotes": "Matched heat pump water heater term. Use one unit as one qualifying commercial HPWH.",
        "mapping": {
          "primarySavingsModelId": "hvac_electric_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1461",
    "opportunityName": "SoCalGas - Residential Energy Efficiency Rebate Programs",
    "state": "CA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1461/socalgas-residential-energy-efficiency-rebate-programs",
    "websiteUrl": "https://www.socalgas.com/save-money-and-energy/rebates-and-incentives/natural-gas-appliance-rebates",
    "applicationUrl": null,
    "administrator": "Southern California Gas Company",
    "programType": "Residential Natural Gas Appliance Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 4,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "high_efficiency_furnace_retrofit",
        "displayName": "High-efficiency furnace retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "furnace"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
      },
      {
        "retrofitTypeId": "high_efficiency_oven",
        "displayName": "High-efficiency oven",
        "parentCategory": "commercial_kitchen_foodservice",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "oven"
        ]
      },
      {
        "retrofitTypeId": "solar_water_heating_system",
        "displayName": "Solar water heating system",
        "parentCategory": "water_heating",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "solar thermal"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "CA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Southern California Gas Company"
        ],
        "notes": "Limited to eligible SoCalGas residential natural gas customers in California service territory."
      },
      "eligibleApplicantTypes": [
        "residential_gas_customer",
        "homeowner",
        "tenant_with_owner_permission"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_furnace_retrofit",
        "natural_gas_tankless_water_heater",
        "natural_gas_storage_water_heater",
        "solar_water_heating_system",
        "residential_natural_gas_clothes_dryer",
        "residential_natural_gas_oven",
        "natural_gas_fireplace_insert",
        "natural_gas_pool_heater",
        "natural_gas_patio_heater"
      ],
      "hardRequirements": [
        "Applicant must be an eligible SoCalGas residential customer.",
        "Equipment must meet listed efficiency standards and installation requirements.",
        "Furnaces require licensed contractor installation, permit compliance, and the listed AFUE threshold.",
        "Solar thermal water heating must meet current program requirements, including qualifying system performance and related water heater requirements.",
        "Rebates are available until the stated program deadline or until funds are exhausted."
      ],
      "blockers": [
        "Do not match commercial kitchen equipment; residential oven rebates are appliance-specific and not a commercial foodservice retrofit.",
        "Do not match broad HVAC replacement beyond eligible residential natural gas furnace measures.",
        "Do not match electric heat pumps or non-gas appliance rebates to this SoCalGas natural gas appliance program."
      ],
      "programType": "Residential Natural Gas Appliance Rebate Program",
      "administrator": "Southern California Gas Company",
      "applicationUrl": null,
      "websiteUrl": "https://www.socalgas.com/save-money-and-energy/rebates-and-incentives/natural-gas-appliance-rebates",
      "sourceUrlsChecked": [
        "https://www.socalgas.com/save-money-and-energy/rebates-and-incentives/natural-gas-appliance-rebates",
        "https://www.socalgas.com/save-money-and-energy/rebates-and-incentives"
      ],
      "evidenceText": "SoCalGas residential rebate page lists natural gas appliance rebates including qualifying furnaces, water heaters, ovens, dryers, fireplace inserts, pool heaters, patio heaters, and solar thermal water heating.",
      "reasoningNotes": "The furnace and solar water heating matches are supported. The oven match must be narrowed to residential natural gas ovens and blocked from commercial kitchen matching."
    },
    "existingSimpleRules": [
      {
        "id": "oir_ed6bdcee48ff5dcc_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 50000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$500 per qualifying residential natural gas wall oven",
        "evidenceText": "SoCalGas 2026 residential rebate application states a $500 rebate for qualifying energy-efficient natural gas wall ovens.",
        "sourceUrlsChecked": [
          "https://www.socalgas.com/sites/default/files/2026-03/SCG-HEER-Application.pdf.pdf",
          "https://www.socalgas.com/save-money-and-energy/rebates-and-incentives/natural-gas-appliance-rebates"
        ],
        "reasoningNotes": "Matched oven term. Use one unit as one qualifying replacement wall oven.",
        "mapping": {
          "primarySavingsModelId": "commercial_kitchen_equipment_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5398",
    "opportunityName": "City of Winter Park Energy Conservation Rebates & Incentive Program",
    "state": "FL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5398/city-of-winter-park-energy-conservation-rebates-and-incentive-program",
    "websiteUrl": "https://cityofwinterpark.org/residents-guests/residents/rebates/",
    "applicationUrl": null,
    "administrator": "City of Winter Park",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 4,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "energy_audit",
        "displayName": "Energy audit",
        "parentCategory": "audits_studies_planning",
        "isPhysicalRetrofit": false,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "energy audit",
          "audit"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_toilet_urinal",
        "displayName": "High-efficiency toilet / urinal replacement",
        "parentCategory": "water_efficiency",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "toilet"
        ]
      },
      {
        "retrofitTypeId": "insulation_upgrade",
        "displayName": "Insulation upgrade",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "insulation"
        ]
      },
      {
        "retrofitTypeId": "smart_irrigation_controller",
        "displayName": "Smart irrigation controller",
        "parentCategory": "water_efficiency",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "smart irrigation",
          "irrigation controller"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "FL"
        ],
        "counties": [
          "Orange County"
        ],
        "cities": [
          "Winter Park"
        ],
        "utilityTerritories": [
          "City of Winter Park Electric Utility"
        ],
        "notes": "Energy rebate eligibility is tied to City of Winter Park residential electric utility customers; water rebates are administered separately."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customer",
        "homeowner",
        "resident"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "energy_audit",
        "duct_repair_and_sealing",
        "attic_insulation_upgrade"
      ],
      "hardRequirements": [
        "Applicant must be a City of Winter Park electric utility customer for energy rebates.",
        "Duct repair and attic insulation rebates require a city home energy audit and recommendation.",
        "Rebate applications and required documentation must be submitted under current city rules."
      ],
      "blockers": [
        "Do not match toilets, irrigation controllers, or washing machines to this energy conservation opportunity; those are separate city water conservation rebates.",
        "The irrigation audit and controller-adjustment service was on hold due staffing, so it should not drive active matching.",
        "Do not match commercial or industrial facilities."
      ],
      "programType": "Rebate",
      "administrator": "City of Winter Park",
      "applicationUrl": null,
      "websiteUrl": "https://cityofwinterpark.org/residents-guests/residents/rebates/",
      "sourceUrlsChecked": [
        "https://cityofwinterpark.org/residents-guests/residents/rebates/",
        "https://cityofwinterpark.org/departments/natural-resources-sustainability/sustainability-division/buildings-energy-water/energy-conservation-rebates-incentive-program/",
        "https://cityofwinterpark.org/departments/water-wastewater-utilities/water-conservation-information/"
      ],
      "evidenceText": "Winter]( Park lists residential energy audits, duct repair, and attic insulation energy rebates for electric utility customers; water conservation rebates are listed separately.",
      "reasoningNotes": "Insulation and audit are valid; toilet and smart irrigation matches should be segregated into separate water conservation programs, not this energy rebate record."
    },
    "existingSimpleRules": [
      {
        "id": "oir_ddd24643ed4a55af_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 10000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": {
          "maxPercentOfBasis": 1
        },
        "confidence": "high",
        "formula": "Up to $100 per WaterSense high-efficiency toilet",
        "evidenceText": "Winter Park toilet rebate page states up to $100 per qualifying toilet.",
        "sourceUrlsChecked": [
          "https://cityofwinterpark.org/departments/water-wastewater-utilities/water-conservation-information/high-efficiency-toilet-retrofit-rebate/",
          "https://cityofwinterpark.org/residents-guests/residents/rebates/"
        ],
        "reasoningNotes": "Matched toilet/water fixture term. Rebate cannot exceed purchase price and is limited by property count.",
        "mapping": {
          "primarySavingsModelId": "water_sewer_reduction",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_dfe4e437ba3a14ed_v1",
        "incentiveType": "percent_of_basis_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "percent_of_basis",
          "percent": 0.5
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": {
          "maxAmountCents": 20000
        },
        "confidence": "high",
        "formula": "50% of attic insulation upgrade cost, capped at $200",
        "evidenceText": "Winter Park energy conservation page says attic insulation is paid at 50% of upgrade cost up to $200.",
        "sourceUrlsChecked": [
          "https://cityofwinterpark.org/departments/natural-resources-sustainability/sustainability-division/buildings-energy-water/energy-conservation-rebates-incentive-program/",
          "https://cityofwinterpark.org/residents-guests/residents/rebates/"
        ],
        "reasoningNotes": "Matched insulation term. Use after required home energy audit recommends attic insulation.",
        "mapping": {
          "primarySavingsModelId": "water_sewer_reduction",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2266",
    "opportunityName": "Diverse Power - Energy Efficient New Construction Rebate Programs",
    "state": "GA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2266/diverse-power-energy-efficient-new-construction-rebate-programs",
    "websiteUrl": "https://www.diversepower.com/energy-tools/rebates/",
    "applicationUrl": null,
    "administrator": "Diverse Power",
    "programType": "New Construction Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 4,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "ground_source_geothermal_heat_pump",
        "displayName": "Ground-source / geothermal heat pump",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "geothermal heat pump",
          "geothermal"
        ]
      },
      {
        "retrofitTypeId": "heat_pump_hvac_retrofit",
        "displayName": "Heat pump HVAC retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "heat pump"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
      },
      {
        "retrofitTypeId": "waste_heat_recovery",
        "displayName": "Waste heat recovery",
        "parentCategory": "compressed_air_industrial",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "heat recovery"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "GA",
          "AL"
        ],
        "counties": [
          "Calhoun County",
          "Clay County",
          "Coweta County",
          "Dougherty County",
          "Early County",
          "Harris County",
          "Heard County",
          "Meriwether County",
          "Muscogee County",
          "Quitman County",
          "Randolph County",
          "Stewart County",
          "Terrell County",
          "Troup County",
          "Chambers County"
        ],
        "cities": [],
        "utilityTerritories": [
          "Diverse Power"
        ],
        "notes": "Diverse Power serves listed Georgia counties and Chambers County, Alabama; rebates require service in the cooperative territory."
      },
      "eligibleApplicantTypes": [
        "diverse_power_residential_member",
        "homeowner",
        "builder"
      ],
      "eligibleSectors": [
        "residential_new_construction"
      ],
      "eligibleRetrofitCategories": [
        "new_construction_air_source_heat_pump",
        "new_construction_geothermal_heat_pump",
        "new_construction_mini_split_heat_pump",
        "new_construction_electric_water_heater",
        "new_construction_ev_ready_outlet"
      ],
      "hardRequirements": [
        "Applies to new construction homes served by Diverse Power, not general existing-building retrofits.",
        "Home must meet or exceed applicable energy code requirements.",
        "Rebate request must be submitted within the program deadline after house completion.",
        "Heat pump rebates require an eligible electric water heater in the new home.",
        "Geothermal systems must meet contractor and equipment requirements stated by Diverse Power."
      ],
      "blockers": [
        "Do not match commercial or industrial retrofit projects to this residential new-construction rebate.",
        "Do not match generic heat pump HVAC retrofit or high-efficiency HVAC replacement unless the project is an eligible new home under this program.",
        "Waste heat recovery is not verified as a current standalone rebate for this new-construction record.",
        "The EV-ready outlet rebate is not the same as an installed EV charger rebate."
      ],
      "programType": "New Construction Rebate",
      "administrator": "Diverse Power",
      "applicationUrl": null,
      "websiteUrl": "https://www.diversepower.com/energy-tools/rebates/",
      "sourceUrlsChecked": [
        "https://www.diversepower.com/energy-tools/rebates/",
        "https://www.diversepower.com/your-meter/service-area/"
      ],
      "evidenceText": "Diverse]( Power’s current rebate page separates existing-home and new-construction rebates and lists new-home air-source heat pump, geothermal heat pump, electric water heater and EV outlet incentives.",
      "reasoningNotes": "The matched heat pump categories were converted to new-construction-specific categories; waste heat recovery was removed because current official program details do not support it as a standalone measure."
    },
    "existingSimpleRules": [
      {
        "id": "oir_6f1ab1375864e2c0_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 35000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "$350 per eligible unit",
        "evidenceText": "Geothermal Heat Pump | $350/Ton This rebate amount is per ton, and can be combined with rebates for other systems installed, such as an all-electric heat pump or waste heat recovery system",
        "sourceUrlsChecked": [
          "http://www.diversepower.com/energy-tools/rebates/"
        ],
        "reasoningNotes": "",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null,
          "businessRelevance": "residential_only",
          "v1Readiness": "not_v1_relevant"
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5236",
    "opportunityName": "Jackson EMC - Residential Energy Efficiency Rebate Program",
    "state": "GA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5236/jackson-emc-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.jacksonemc.com/member-services/home-services/rebates-incentives-loans",
    "applicationUrl": null,
    "administrator": "Jackson Electric Membership Corporation",
    "programType": "Residential Rebate And Home Energy Evaluation",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 4,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "ev_charger_installation",
        "displayName": "EV charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
      },
      {
        "retrofitTypeId": "heat_pump_hvac_retrofit",
        "displayName": "Heat pump HVAC retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "heat pump",
          "mini split"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
      },
      {
        "retrofitTypeId": "level_2_ev_charger_installation",
        "displayName": "Level 2 EV charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "level 2",
          "level-2"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "GA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Jackson EMC"
        ],
        "notes": "Jackson EMC residential member homes in the cooperative's northeast Georgia service territory."
      },
      "eligibleApplicantTypes": [
        "residential_members",
        "homeowners"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation",
        "heat_pump_hvac_retrofit",
        "energy_audit",
        "insulation_upgrade",
        "air_sealing_weatherization",
        "duct_sealing_and_replacement",
        "smart_thermostat_zoning_retrofit"
      ],
      "hardRequirements": [
        "Applicant must be a Jackson EMC residential member.",
        "Heat pump rebate requires qualifying ENERGY STAR all-electric equipment meeting minimum efficiency requirements.",
        "Dual-fuel heat pump systems are not eligible for the heat pump replacement rebate.",
        "Home Energy Evaluation improvements must follow participating-contractor recommendations and verification.",
        "EV charger match should be limited to qualifying residential Level 2 chargers."
      ],
      "blockers": [
        "Do not duplicate Level 2 EV charging as both broad EV charger and Level 2 charger; use the product-specific Level 2 category.",
        "Do not match commercial measures to this residential member program.",
        "Broad high-efficiency HVAC replacement should be narrowed to the eligible electric heat pump rebate."
      ],
      "programType": "Residential Rebate And Home Energy Evaluation",
      "administrator": "Jackson Electric Membership Corporation",
      "applicationUrl": null,
      "websiteUrl": "https://www.jacksonemc.com/member-services/home-services/rebates-incentives-loans",
      "sourceUrlsChecked": [
        "https://www.jacksonemc.com/member-services/home-services/rebates-incentives-loans",
        "https://www.jacksonemc.com/member-services/home-services/rebates-incentives-loans/heat-pump-rebate",
        "https://www.jacksonemc.com/assets/uploads/main/Home-Energy-Evaluation-2024.pdf",
        "https://www.jacksonemc.com/assets/uploads/pdfs/rates/2026/Heat-Pump-Rebate-Application-2026_FINAL.pdf",
        "https://www.jacksonemc.com/member-services/ev-and-renewable-energy/electric-vehicles"
      ],
      "evidenceText": "Jackson EMC lists residential heat pump rebates, home energy evaluation and improvement rebates, smart thermostat incentives and a residential Level 2 EV charger rebate for members.",
      "reasoningNotes": "Kept Level 2 EV charging, heat pumps and home evaluation-related improvements; removed broad duplicate EV and HVAC interpretations."
    },
    "existingSimpleRules": [
      {
        "id": "oir_058c7ddf24ddab3b_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 25000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$250 per Level 2 electric vehicle charger",
        "evidenceText": "Jackson EMC rebate page says residential members can save on Level 2 EV chargers with a $250 rebate.",
        "sourceUrlsChecked": [
          "https://www.jacksonemc.com/member-services/home-services/rebates-incentives-loans",
          "https://www.jacksonemc.com/assets/uploads/pdfs/Electric-Vehicle-Rebate-Application-2024-ENGLISH.pdf"
        ],
        "reasoningNotes": "Matched Level 2 EV charging terms. Application lists $250 per charger, maximum two per home.",
        "mapping": {
          "primarySavingsModelId": "ev_charging_site_load",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1574",
    "opportunityName": "Alliant Energy Interstate Power and Light - Farm Equipment Energy Efficiency Incentives",
    "state": "IA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1574/alliant-energy-interstate-power-and-light-farm-equipment-energy-efficiency-incentives",
    "websiteUrl": "https://www.alliantenergy.com/ways-to-save/instant-discounts/iowa",
    "applicationUrl": null,
    "administrator": "Alliant Energy",
    "programType": "Instant Discount/Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 4,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "high_efficiency_refrigeration_equipment",
        "displayName": "High-efficiency refrigeration equipment",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "refrigeration"
        ]
      },
      {
        "retrofitTypeId": "led_lighting_retrofit",
        "displayName": "LED lighting retrofit",
        "parentCategory": "lighting",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
      },
      {
        "retrofitTypeId": "pump_fan_controls_retrofit",
        "displayName": "Pump/fan controls retrofit",
        "parentCategory": "motors_pumps_fans_drives",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "fan controls"
        ]
      },
      {
        "retrofitTypeId": "variable_frequency_drive_retrofit",
        "displayName": "Variable frequency drive retrofit",
        "parentCategory": "motors_pumps_fans_drives",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "variable frequency drive",
          "variable speed drive"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "IA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Alliant Energy Iowa service territory"
        ],
        "notes": "Agricultural instant discounts require a valid Alliant Energy or MidAmerican Energy customer address, depending on distributor program rules."
      },
      "eligibleApplicantTypes": [
        "agricultural_customer",
        "farm_customer",
        "commercial_customer",
        "industrial_customer",
        "installing_contractor"
      ],
      "eligibleSectors": [
        "agricultural",
        "commercial",
        "industrial"
      ],
      "eligibleRetrofitCategories": [
        "grain_dryer_efficiency",
        "grain_bin_aeration_fan_controller",
        "grain_bin_aeration_fan_controls",
        "high_volume_low_speed_fan",
        "ventilation_fan_efficiency",
        "circulation_fan_efficiency",
        "swine_heat_mat",
        "agricultural_led_grow_lighting",
        "pump_fan_controls_retrofit"
      ],
      "hardRequirements": [
        "Iowa instant discounts are applied at the point of purchase through participating distributors.",
        "Qualifying customers or installing contractors must purchase qualifying equipment from a participating distributor.",
        "Installation premise must be a valid Alliant Energy or MidAmerican Energy customer address under the agriculture instant-discount rules.",
        "Purchase must be for a planned upcoming project, not stock.",
        "New construction projects do not qualify for the Instant Discounts program.",
        "LED grow lights must be one-for-one replacements of existing non-LED products and listed on the current DLC Qualified Products List."
      ],
      "blockers": [
        "Commercial VFDs may be eligible under Alliant's separate Custom Rebates program, not the agriculture instant discount list.",
        "Refrigeration systems appear under general Custom Rebates or rebate locator categories, not the current agriculture instant discount equipment list.",
        "General commercial LED lighting discounts are separate; this farm equipment path supports LED grow lights only.",
        "Alliant says it no longer processes claim-form rebates and uses instant discounts or custom rebate intake."
      ],
      "programType": "Instant Discount/Rebate Program",
      "administrator": "Alliant Energy",
      "applicationUrl": null,
      "websiteUrl": "https://www.alliantenergy.com/ways-to-save/instant-discounts/iowa",
      "sourceUrlsChecked": [
        "https://www.alliantenergy.com/ways-to-save/instant-discounts/iowa",
        "https://www.alliantenergy.com/-/media/alliant/documents/waystosave/rebate-ref-guides/instant-discounts-ag.pdf?hash=C2C7D29EA08B6E2992003A511B9560A2&sc_lang=en",
        "https://www.alliantenergy.com/ways-to-save/rebates/terms",
        "https://www.alliantenergy.com/waystosave/rebatesandmarketplace/rebatelocatortool",
        "https://www.alliantenergy.com/waystosave/rebatesandmarketplace/rebatelocatortool/commercialvariablefrequencydrives",
        "https://www.alliantenergy.com/ways-to-save/custom-rebates"
      ],
      "evidenceText": "Alliant Iowa agriculture instant discounts cover grain dryers, grain-bin fan controls, HVLS and ventilation fans, circulation fans, swine heat mats and LED grow lights.",
      "reasoningNotes": "The current farm equipment path supports fan controls and agricultural equipment. VFD and refrigeration are separate custom or general rebate categories, not this farm instant-discount list."
    },
    "existingSimpleRules": [
      {
        "id": "oir_6c30b3e3a7e6ec3a_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 7500,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$75 per horsepower for grain-bin aeration fans with integrated controls",
        "evidenceText": "Alliant Iowa instant discounts list grain-bin aeration fans with integrated controls at $75/horsepower.",
        "sourceUrlsChecked": [
          "https://www.alliantenergy.com/ways-to-save/instant-discounts/iowa",
          "https://www.alliantenergy.com/waystosave/rebatesandmarketplace/rebatelocatortool"
        ],
        "reasoningNotes": "Matched fan controls term. Use unit_count as eligible controlled horsepower.",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_d998dda4ca044405_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 75000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$750 per grain-bin aeration fan controller",
        "evidenceText": "Alliant Iowa instant discounts list grain bin aeration fan controller at $750/unit.",
        "sourceUrlsChecked": [
          "https://www.alliantenergy.com/ways-to-save/instant-discounts/iowa",
          "https://www.alliantenergy.com/waystosave/rebatesandmarketplace/rebatelocatortool"
        ],
        "reasoningNotes": "Matched fan controls term. Use one unit as one qualifying controller.",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4569",
    "opportunityName": "Liberty Utilities Iowa - High Efficiency Equipment Rebate",
    "state": "IA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4569/liberty-utilities-iowa-high-efficiency-equipment-rebate",
    "websiteUrl": "https://iowa.libertyutilities.com/keokuk/residential/smart-energy-use/natural-gas/high-efficiency-equipment-rebate.html",
    "applicationUrl": "https://iowa.libertyutilities.com/uploads/IA%20Rebate%20Updated%202025.03.06.pdf",
    "administrator": "Liberty Utilities",
    "programType": "Natural Gas Equipment Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 4,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "air_sealing_weatherization",
        "displayName": "Air sealing / weatherization",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "weatherization"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_furnace_retrofit",
        "displayName": "High-efficiency furnace retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "furnace"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
      },
      {
        "retrofitTypeId": "smart_thermostat_zoning_retrofit",
        "displayName": "Smart thermostat / zoning retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "programmable thermostat",
          "thermostat"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "IA"
        ],
        "counties": [],
        "cities": [
          "Keokuk"
        ],
        "utilityTerritories": [
          "Liberty Utilities Iowa natural gas"
        ],
        "notes": "Iowa Liberty natural gas customers served under eligible residential or small commercial rate schedules."
      },
      "eligibleApplicantTypes": [
        "residential_customers",
        "small_commercial_customers",
        "homeowners",
        "builders"
      ],
      "eligibleSectors": [
        "residential",
        "small_commercial"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_furnace_retrofit",
        "wifi_learning_thermostat"
      ],
      "hardRequirements": [
        "Applicant must be a current or future Liberty Iowa natural gas customer on an eligible rate schedule.",
        "Eligible work is for natural gas equipment upgrades in an existing home or business or qualifying new construction.",
        "Furnace must meet the listed AFUE and capacity requirements.",
        "Equipment must be installed by a qualified dealer; homeowner self-installation is not eligible.",
        "Rebate form, recent Liberty bill and required documentation must be submitted; funds are limited."
      ],
      "blockers": [
        "Weatherization and air sealing are not listed in the current rebate form.",
        "Do not match broad HVAC beyond qualifying natural gas forced-air furnace rebates.",
        "Water-heating rebates are mentioned generally on the page but were not verified in the current checked form, so do not match them unless a current form lists them."
      ],
      "programType": "Natural Gas Equipment Rebate",
      "administrator": "Liberty Utilities",
      "applicationUrl": "https://iowa.libertyutilities.com/uploads/IA%20Rebate%20Updated%202025.03.06.pdf",
      "websiteUrl": "https://iowa.libertyutilities.com/keokuk/residential/smart-energy-use/natural-gas/high-efficiency-equipment-rebate.html",
      "sourceUrlsChecked": [
        "https://iowa.libertyutilities.com/keokuk/residential/smart-energy-use/natural-gas/high-efficiency-equipment-rebate.html",
        "https://iowa.libertyutilities.com/uploads/IA%20Rebate%20Updated%202025.03.06.pdf"
      ],
      "evidenceText": "Liberty Iowa's current rebate form lists natural gas forced-air furnace rebates and Wi-Fi or learning thermostat rebates, with qualified dealer installation and eligible gas-customer rate requirements.",
      "reasoningNotes": "Removed weatherization and narrowed HVAC to qualifying gas furnaces; thermostat kept as a Wi-Fi or learning thermostat measure."
    },
    "existingSimpleRules": [
      {
        "id": "oir_fa97808efe594821_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 7500,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "$75 per eligible unit",
        "evidenceText": "00 Thermostat Rebate Amount Wi-Fi/Learning Thermostat Up to $75",
        "sourceUrlsChecked": [
          "https://iowa.libertyutilities.com/keokuk/residential/smart-energy-use/natural-gas/high-efficiency-equipment-rebate.html"
        ],
        "reasoningNotes": "",
        "mapping": {
          "primarySavingsModelId": "controls_building_automation",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null,
          "businessRelevance": "mixed",
          "v1Readiness": "needs_project_scope"
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2662",
    "opportunityName": "Bartholomew County REMC - Residential Energy Efficiency Rebate Program",
    "state": "IN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2662/bartholomew-county-remc-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.bcremc.com/save-energy-money/incentives/",
    "applicationUrl": "https://www.bcremc.com/save-energy-money/incentives/residential-heat-pump-installation-application/",
    "administrator": "Bartholomew County REMC",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 4,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "ground_source_geothermal_heat_pump",
        "displayName": "Ground-source / geothermal heat pump",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "geothermal heat pump",
          "geothermal"
        ]
      },
      {
        "retrofitTypeId": "heat_pump_hvac_retrofit",
        "displayName": "Heat pump HVAC retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "heat pump",
          "mini split"
        ]
      },
      {
        "retrofitTypeId": "heat_pump_water_heater",
        "displayName": "Heat pump water heater",
        "parentCategory": "water_heating",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "heat pump water heater"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
      }
    ],
    "repairedOpportunityData": {
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "IN"
        ],
        "counties": [
          "Bartholomew County"
        ],
        "cities": [],
        "utilityTerritories": [
          "Bartholomew County REMC electric service territory"
        ],
        "notes": "Program is for eligible Bartholomew County REMC residential members in Indiana."
      },
      "eligibleApplicantTypes": [
        "residential_electric_member",
        "residential_electric_customer"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "air_source_heat_pump",
        "ground_source_geothermal_heat_pump",
        "ductless_mini_split_heat_pump",
        "heat_pump_water_heater",
        "hvac_tune_up"
      ],
      "hardRequirements": [
        "Applicant must be a Bartholomew County REMC residential member or electric customer.",
        "Equipment must meet the REMC rebate category requirements in effect at the time of application.",
        "Rebate applications and supporting documentation are required."
      ],
      "blockers": [
        "Do not match broad high_efficiency_hvac_replacement unless the project is an eligible heat pump or geothermal heat pump measure.",
        "Do not infer commercial measures from this residential program.",
        "Current official pages were blocked by access restrictions, so unsupported categories beyond heat pumps, heat pump water heaters, and HVAC tune-ups should not be inferred."
      ],
      "programType": "Rebate",
      "administrator": "Bartholomew County REMC",
      "applicationUrl": "https://www.bcremc.com/save-energy-money/incentives/residential-heat-pump-installation-application/",
      "websiteUrl": "https://www.bcremc.com/save-energy-money/incentives/",
      "sourceUrlsChecked": [
        "https://www.bcremc.com/save-energy-money/incentives/",
        "https://www.bcremc.com/save-energy-money/incentives/residential-heat-pump-installation-application/",
        "https://www.bcremc.com/save-energy-money/incentives/residential-hvac-tune-up-application/"
      ],
      "evidenceText": "Official Bartholomew County REMC pages were access-blocked, but official search snippets identify residential incentives for heat pump water heaters, mini-split heat pumps, geothermal heat pumps, air source heat pumps, and HVAC tune-ups.",
      "reasoningNotes": "The main supported retrofit scope is heat-pump-specific. The original high-efficiency HVAC category was too broad unless narrowed to eligible heat pump technologies."
    },
    "existingSimpleRules": [
      {
        "id": "oir_607088dc16eafc6b_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 200000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "$2,000 per eligible unit",
        "evidenceText": "no minimum SEER2 rating – Incentive will be flat $2,000/unit Air Source Heat Pump (Whole Home): Tier 1 &#8211",
        "sourceUrlsChecked": [
          "http://www.bcremc.com/incentives/"
        ],
        "reasoningNotes": "",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null,
          "businessRelevance": "residential_only",
          "v1Readiness": "not_v1_relevant"
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2670",
    "opportunityName": "WIN Energy REMC - Residential Rebate Program",
    "state": "IN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2670/win-energy-remc-residential-rebate-program",
    "websiteUrl": "https://www.winenergyremc.com/residential-rebate-program",
    "applicationUrl": "https://hepn.eecp.us/OnlineApp/",
    "administrator": "WIN Energy REMC",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 4,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "ground_source_geothermal_heat_pump",
        "displayName": "Ground-source / geothermal heat pump",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "geothermal heat pump",
          "geothermal"
        ]
      },
      {
        "retrofitTypeId": "heat_pump_hvac_retrofit",
        "displayName": "Heat pump HVAC retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "heat pump",
          "mini split"
        ]
      },
      {
        "retrofitTypeId": "heat_pump_water_heater",
        "displayName": "Heat pump water heater",
        "parentCategory": "water_heating",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "heat pump water heater"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "IN"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "WIN Energy REMC"
        ],
        "notes": "Available to WIN Energy REMC residential electric members for qualifying equipment at an account served by the cooperative."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "electric_cooperative_member",
        "homeowner"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "air_source_heat_pump",
        "dual_fuel_heat_pump",
        "ductless_mini_split_heat_pump",
        "ground_source_geothermal_heat_pump",
        "heat_pump_water_heater",
        "wifi_enabled_electric_storage_water_heater",
        "electric_storage_water_heater"
      ],
      "hardRequirements": [
        "Applicant must be a WIN Energy REMC residential member.",
        "Rebate applications require qualifying new equipment, documentation, and submission through WIN Energy REMC's rebate process.",
        "HVAC equipment must satisfy the eligibility terms in the current HVAC application and terms document.",
        "Water-heater equipment must satisfy the eligibility terms in the current water-heater application and terms document."
      ],
      "blockers": [
        "Do not match broad high_efficiency_hvac_replacement except for the specific eligible heat-pump categories listed by WIN Energy REMC.",
        "Do not match gas water heaters, commercial equipment, or general appliance measures not listed in the residential rebate program.",
        "Projects outside WIN Energy REMC territory are ineligible."
      ],
      "programType": "Rebate Program",
      "administrator": "WIN Energy REMC",
      "applicationUrl": "https://hepn.eecp.us/OnlineApp/",
      "websiteUrl": "https://www.winenergyremc.com/residential-rebate-program",
      "sourceUrlsChecked": [
        "https://www.winenergyremc.com/residential-rebate-program",
        "https://www.winenergyremc.com/sites/default/files/Rebate%20Information/HVAC%20Application%20and%20Terms%20and%20Conditions.pdf",
        "https://www.winenergyremc.com/sites/default/files/Rebate%20Information/WH%20Application%20and%20Terms%20and%20Conditions.pdf",
        "https://hepn.eecp.us/OnlineApp/"
      ],
      "evidenceText": "WIN]( Energy REMC's residential rebate page and application documents list rebates for qualifying air-source, dual-fuel, mini-split, geothermal heat pumps, heat-pump water heaters, Wi-Fi electric storage, and electric storage water heaters.",
      "reasoningNotes": "The geothermal, heat-pump HVAC, and heat-pump water-heater matches are supported. The generic high-efficiency HVAC replacement category should be narrowed to the listed heat-pump measures."
    },
    "existingSimpleRules": [
      {
        "id": "oir_dda0a88f69e6b449_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 50000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$500 per heat pump water heater",
        "evidenceText": "WIN Energy REMC residential HVAC and water heating incentive page lists Heat Pump Water Heater at $500.",
        "sourceUrlsChecked": [
          "https://www.winenergyremc.com/residential-hvac-and-water-heating-incentive-program",
          "https://www.winenergyremc.com/residential-rebate-program"
        ],
        "reasoningNotes": "Matched heat pump water heater term. Use one unit as one qualifying HPWH.",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2301",
    "opportunityName": "Owen Electric - Residential Energy Efficiency Rebate Program",
    "state": "KY",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2301/owen-electric-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://owenelectric.com/energy-efficiency-rebates",
    "applicationUrl": null,
    "administrator": "Owen Electric Cooperative, Inc.",
    "programType": "Rebate And Demand Response Incentive",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 4,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "air_sealing_weatherization",
        "displayName": "Air sealing / weatherization",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "weatherization"
        ]
      },
      {
        "retrofitTypeId": "heat_pump_hvac_retrofit",
        "displayName": "Heat pump HVAC retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "heat pump",
          "mini split"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "air conditioner"
        ]
      },
      {
        "retrofitTypeId": "smart_thermostat_zoning_retrofit",
        "displayName": "Smart thermostat / zoning retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "thermostat"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "KY"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Owen Electric Cooperative service territory"
        ],
        "notes": "Rebates are for Owen Electric Cooperative residential members meeting program-specific requirements."
      },
      "eligibleApplicantTypes": [
        "residential_member",
        "homeowner",
        "residential_electric_customer"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "ductless_mini_split_heat_pump",
        "ground_source_geothermal_heat_pump",
        "heat_pump_water_heater",
        "insulation_upgrade",
        "air_sealing_weatherization",
        "duct_sealing_repair",
        "smart_thermostat_demand_response"
      ],
      "hardRequirements": [
        "Applicant must be an Owen Electric member and meet the specific rebate conditions for the measure.",
        "Heat pump retrofit must replace qualifying electric resistance, ceiling cable, baseboard, or electric thermal storage equipment that has been in place for the required period.",
        "Button-Up weatherization requires qualifying home age, primary electric heat, audit, and pre/post heat-loss or blower-door documentation.",
        "SimpleSaver thermostat incentives require enrollment and approved thermostat controls."
      ],
      "blockers": [
        "Do not match central air conditioner replacement as an equipment rebate; central AC SimpleSaver is a demand-response participation credit, not a new AC rebate.",
        "Touchstone Energy Home is new construction and should not be matched as a retrofit.",
        "Do not match commercial, industrial, or non-member accounts."
      ],
      "programType": "Rebate And Demand Response Incentive",
      "administrator": "Owen Electric Cooperative, Inc.",
      "applicationUrl": null,
      "websiteUrl": "https://owenelectric.com/energy-efficiency-rebates",
      "sourceUrlsChecked": [
        "https://www.owenelectric.com/energy-efficiency-info-programs-rebates",
        "https://owenelectric.com/energy-efficiency-rebates",
        "https://owenelectric.com/simplesaver-programs",
        "https://owenelectric.com/touchstone-energy-home",
        "https://owenelectric.com/news/smarter-energy-bigger-savings-how-owen-electrics-energy-efficiency-programs-help-you-save"
      ],
      "evidenceText": "Owen]( Electric lists residential heat pump, mini-split, geothermal, heat pump water heater, Button-Up weatherization, duct sealing, air sealing, and thermostat programs.",
      "reasoningNotes": "Heat pump, weatherization, and thermostat categories are valid with product-specific limits. Central AC should be treated as demand response, not equipment replacement."
    },
    "existingSimpleRules": [
      {
        "id": "oir_d7f7840b26d01e4c_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 75000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "Up to $750 for replacing electric resistance heat with a heat pump",
        "evidenceText": "Owen Electric materials say the heat pump retrofit program pays $500-$750 for replacing electric resistance heating.",
        "sourceUrlsChecked": [
          "https://owenelectric.com/energy-efficiency-rebates",
          "https://owenelectric.com/hey-jude"
        ],
        "reasoningNotes": "Matched heat pump term. Confidence is medium because final amount depends on equipment/pathway.",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_d9ef7f4f64a49f7d_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 25000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": {
          "maxAmountCents": 75000
        },
        "confidence": "high",
        "formula": "$250 per mini-split indoor head, capped at $750",
        "evidenceText": "Owen Electric materials state mini-split rebate pays $250 per indoor head, maximum $750.",
        "sourceUrlsChecked": [
          "https://owenelectric.com/energy-efficiency-rebates",
          "https://owenelectric.com/hey-jude"
        ],
        "reasoningNotes": "Matched mini-split term. Use unit_count as indoor head count.",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  }
]
