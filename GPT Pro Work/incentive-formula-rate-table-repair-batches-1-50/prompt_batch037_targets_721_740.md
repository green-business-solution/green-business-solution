You are helping RetroFi repair incentive formulas, rate tables, grant estimates, tax credits, and non-cash workflow value rules.

Return strict JSON only. Do not include markdown, code fences, commentary, or citations outside JSON fields.

Batch: 37
Targets in this prompt: 721-740 of 984
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
  "batchNumber": 37,
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
  "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:5853"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2673",
    "opportunityName": "NineStar Connect - Residential Energy Efficient Equipment Rebate Program",
    "state": "IN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2673/ninestar-connect-residential-energy-efficient-equipment-rebate-program",
    "websiteUrl": "https://www.powermoves.com/rebates/residential/",
    "applicationUrl": "https://wvpa.my.site.com/",
    "administrator": "NineStar Connect through PowerMoves",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 5,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "ground_source_geothermal_heat_pump",
        "displayName": "Ground-source / geothermal heat pump",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
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
          "IN"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "NineStar Connect electric service territory through the PowerMoves cooperative program"
        ],
        "notes": "PowerMoves incentives are offered through participating Wabash Valley Power Alliance electric cooperatives."
      },
      "eligibleApplicantTypes": [
        "residential_member",
        "homeowner"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "ground_source_geothermal_heat_pump",
        "air_source_heat_pump",
        "dual_fuel_heat_pump",
        "heat_pump_hvac_retrofit",
        "heat_pump_water_heater",
        "smart_thermostat_zoning_retrofit"
      ],
      "hardRequirements": [
        "Applicant must be a residential electric member of NineStar Connect or another participating cooperative for that offer.",
        "Equipment must meet PowerMoves residential eligibility rules and required efficiency documentation.",
        "Applications must be submitted through the current PowerMoves online or paper process.",
        "Thermostat rebates require a qualifying Wi-Fi thermostat under program rules."
      ],
      "blockers": [
        "High-efficiency HVAC should not be matched broadly; the supported HVAC categories are qualifying air-source, dual-fuel or geothermal heat pumps.",
        "Commercial, industrial and agricultural PowerMoves incentives are separate from this residential record.",
        "Battery storage, solar and business loans are not part of this residential equipment rebate match."
      ],
      "programType": "Rebate Program",
      "administrator": "NineStar Connect through PowerMoves",
      "applicationUrl": "https://wvpa.my.site.com/",
      "websiteUrl": "https://www.powermoves.com/rebates/residential/",
      "sourceUrlsChecked": [
        "https://www.powermoves.com/rebates/residential/",
        "https://www.ninestarconnect.com/faq/does-ninestar-offer-a-heat-pump-water-heater-lease/"
      ],
      "evidenceText": "PowerMoves residential materials list rebates for air-source, dual-fuel and geothermal heat pumps, heat pump water heaters and Wi-Fi thermostats for local cooperative members.",
      "reasoningNotes": "Removed broad HVAC replacement in favor of specific heat-pump categories; no support was found for storage or nonresidential measures in this record."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "NineStar Connect current rebate table values for heat pumps, geothermal and HPWHs were not found in accessible official text.",
        "sourceUrlsChecked": [
          "https://www.ninestarconnect.com/",
          "https://programs.dsireusa.org/system/program/detail/2673"
        ],
        "reasoningNotes": "No safe one-time rule should be created without the current application/table.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2667",
    "opportunityName": "Southern Indiana Power - Residential Energy Efficiency Rebate Program",
    "state": "IN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2667/southern-indiana-power-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.southernindianapower.com/energy-efficiency/rebates/",
    "applicationUrl": null,
    "administrator": "Southern Indiana Power",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 5,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
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
          "Southern Indiana Power electric service territory"
        ],
        "notes": "Program applies to Southern Indiana Power members and customers; residential and nonresidential offers are separate on the same rebates page."
      },
      "eligibleApplicantTypes": [
        "residential_members",
        "commercial_customers",
        "industrial_customers"
      ],
      "eligibleSectors": [
        "residential",
        "commercial",
        "industrial"
      ],
      "eligibleRetrofitCategories": [
        "ground_source_geothermal_heat_pump",
        "air_source_heat_pump",
        "ductless_mini_split_heat_pump",
        "dual_fuel_heat_pump",
        "heat_pump_hvac_retrofit",
        "heat_pump_water_heater",
        "hvac_tune_up",
        "led_lighting_retrofit",
        "variable_frequency_drive_retrofit",
        "custom_energy_efficiency_retrofit"
      ],
      "hardRequirements": [
        "Applicant must be a Southern Indiana Power member or eligible customer.",
        "Residential equipment must meet the posted 2026 rebate requirements and deadlines.",
        "HVAC tune-ups must be performed by a licensed contractor and cannot be self-performed.",
        "Nonresidential lighting, VFD, and custom rebates must follow separate program requirements."
      ],
      "blockers": [
        "Energy_management_system is not supported by the current official rebate list.",
        "Generic high_efficiency_hvac_replacement is too broad unless narrowed to qualifying heat pumps or applicable central AC tune-up.",
        "Outdoor electric equipment rebates are not building retrofits.",
        "Do not infer smart thermostats, commercial kitchen equipment, refrigeration, or building envelope weatherization."
      ],
      "programType": "Rebate Program",
      "administrator": "Southern Indiana Power",
      "applicationUrl": null,
      "websiteUrl": "https://www.southernindianapower.com/energy-efficiency/rebates/",
      "sourceUrlsChecked": [
        "https://www.southernindianapower.com/energy-efficiency/rebates/"
      ],
      "evidenceText": "Southern Indiana Power lists 2026 residential rebates for geothermal, air-source, mini-split and dual-fuel heat pumps plus heat pump water heaters; nonresidential rebates include lighting, VFD and custom.",
      "reasoningNotes": "Most heat pump and heat pump water-heater matches are supported. Energy management and broad HVAC replacement should be removed or narrowed."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "SIP confirms 2026 rebates for geothermal, air-source, mini-split, dual-fuel heat pumps and HPWHs, but accessible text did not expose current amounts.",
        "sourceUrlsChecked": [
          "https://www.southernindianapower.com/energy-efficiency/rebates/"
        ],
        "reasoningNotes": "Older amounts were not used as current proof.",
        "originalGapReason": "source_text_unavailable",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3696",
    "opportunityName": "Kentucky Power - Targeted Energy Efficiency Program",
    "state": "KY",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3696/kentucky-power-targeted-energy-efficiency-program",
    "websiteUrl": "https://www.kentuckypower.com/savings/home/targeted-energy-efficiency",
    "applicationUrl": null,
    "administrator": "Kentucky Power",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 5,
    "targetKind": "reviewed_no_rule_reclassification",
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
          "Kentucky Power"
        ],
        "notes": "Limited to qualifying Kentucky Power residential customers served through local Community Action agencies."
      },
      "eligibleApplicantTypes": [
        "income_qualified_residential_customer"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "energy_audit",
        "air_sealing_weatherization",
        "duct_sealing_and_insulation",
        "insulation_upgrade",
        "led_lighting_retrofit",
        "heat_pump_hvac_retrofit",
        "heat_pump_water_heater",
        "water_heater_insulation",
        "low_flow_water_fixtures",
        "window_and_door_replacement",
        "room_air_conditioner_replacement"
      ],
      "hardRequirements": [
        "Customer must meet income eligibility requirements.",
        "Customer must be a Kentucky Power residential customer.",
        "Home must meet electric-heating or qualifying electric water-heating usage rules.",
        "Services are delivered through participating Community Action agencies."
      ],
      "blockers": [
        "Do not match commercial or multifamily owner programs.",
        "Do not treat the audit as a stand-alone rebate separate from program-delivered measures.",
        "Do not broaden room air conditioner replacement into general HVAC replacement."
      ],
      "programType": "Rebate Program",
      "administrator": "Kentucky Power",
      "applicationUrl": null,
      "websiteUrl": "https://www.kentuckypower.com/savings/home/targeted-energy-efficiency",
      "sourceUrlsChecked": [
        "https://www.kentuckypower.com/savings/home/targeted-energy-efficiency",
        "https://www.kentuckypower.com/lib/docs/savings/energyefficiencyprograms/TEE_Program_Quick_Reference_Guide.pdf"
      ],
      "evidenceText": "Kentucky Power describes income-qualified residential services including an energy audit, air sealing, insulation, duct work, efficient lighting, hot-water measures, and other weatherization measures delivered through Community Action agencies.",
      "reasoningNotes": "Program supports the listed weatherization and direct-install measures, but matching must respect income and Kentucky Power residential territory limits."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "medium",
        "evidenceText": "Kentucky Power targeted efficiency programs are assistance/weatherization delivery programs, not a published per-measure customer rebate formula.",
        "sourceUrlsChecked": [
          "https://www.kentuckypower.com/savings/home/assistance/",
          "https://programs.dsireusa.org/system/program/detail/3696"
        ],
        "reasoningNotes": "No-cost or targeted service delivery should not be converted to a fixed upfront rule.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "envelope_insulation_savings",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3217",
    "opportunityName": "NextZero - Offered by 21 Utilities through the MMWEC",
    "state": "MA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3217/nextzero-offered-by-21-utilities-through-the-mmwec",
    "websiteUrl": "https://nextzero.org/",
    "applicationUrl": "https://rebates.nextzero.org/",
    "administrator": "MMWEC in collaboration with participating municipal utilities",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 5,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "battery_storage_system",
        "displayName": "Battery storage system",
        "parentCategory": "energy_storage_resilience",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "battery storage"
        ]
      },
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
          "MA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Participating MMWEC municipal light plant territories using NextZero"
        ],
        "notes": "Participating municipal light plants and available residential, commercial and battery measures vary by town."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "commercial_customer",
        "industrial_customer",
        "municipal_utility_customer"
      ],
      "eligibleSectors": [
        "residential",
        "commercial",
        "industrial",
        "institutional"
      ],
      "eligibleRetrofitCategories": [
        "energy_audit",
        "heat_pump_hvac_retrofit",
        "ground_source_geothermal_heat_pump",
        "heat_pump_water_heater",
        "battery_storage_system",
        "smart_thermostat_zoning_retrofit",
        "led_lighting_retrofit",
        "high_efficiency_hvac_replacement",
        "residential_energy_star_appliance",
        "energy_management_connected_device"
      ],
      "hardRequirements": [
        "Customer must be served by a participating municipal light plant and use the correct town-specific NextZero page or application.",
        "Residential heat pumps must meet the town's efficiency thresholds and contractor requirements.",
        "Residential battery rebates apply only where the town offers the battery subprogram and the battery meets brand, capacity and enrollment rules.",
        "Commercial lighting and HVAC measures apply only under the commercial program menu, not residential appliance rebates."
      ],
      "blockers": [
        "Do not assume every NextZero town offers every category; town-specific pages control eligibility.",
        "EV charging is a separate NextZero subprogram and should not be inferred from this energy-efficiency match unless explicitly selected.",
        "Residential appliance rebates do not support commercial refrigeration, commercial kitchen equipment or broad industrial measures.",
        "Energy audit is a non-physical service and should not be treated as an installed retrofit."
      ],
      "programType": "Rebate Program",
      "administrator": "MMWEC in collaboration with participating municipal utilities",
      "applicationUrl": "https://rebates.nextzero.org/",
      "websiteUrl": "https://nextzero.org/",
      "sourceUrlsChecked": [
        "https://nextzero.org/",
        "https://www.mmwec.org/how-we-are-green/energy-efficiency/",
        "https://nextzero.org/sterling/heat-pumps/",
        "https://nextzero.org/sterling/battery-program/",
        "https://nextzero.org/sterling/appliances/",
        "https://nextzero.org/russell/energy-audits/",
        "https://rebates.nextzero.org/"
      ],
      "evidenceText": "NextZero describes a residential and commercial/industrial municipal utility program; current pages show audits, heat pumps, appliances/thermostats, residential battery rebates and commercial prescriptive lighting/HVAC.",
      "reasoningNotes": "Kept battery only as a distinct residential battery subprogram where offered; kept LED and broad HVAC only for commercial prescriptive pages or qualifying heat-pump/HVAC pages."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "NextZero offerings vary by municipal light plant and may include rebates, loans, and performance programs.",
        "sourceUrlsChecked": [
          "https://nextzero.org/"
        ],
        "reasoningNotes": "Battery and demand-response portions are not one-time; local utility measure-specific pages must be reviewed.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "battery_tou_demand_savings",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3749",
    "opportunityName": "CenterPoint Energy (Gas) - Commercial Energy Efficiency Rebate Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3749/centerpoint-energy-gas-commercial-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.centerpointenergy.com/en-us/business/save-energy-money/efficiency-programs-rebates/programs-and-rebates-by-industry/commercial?sa=MN",
    "applicationUrl": "https://www.centerpointenergy.com/en-us/business/save-energy-money/efficiency-programs-rebates/equipment-programs-and-rebates?sa=mn",
    "administrator": "CenterPoint Energy",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 5,
    "targetKind": "reviewed_no_rule_reclassification",
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
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
      },
      {
        "retrofitTypeId": "high_efficiency_laundry_equipment",
        "displayName": "High-efficiency laundry equipment",
        "parentCategory": "water_efficiency",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "laundry"
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
          "MN"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "CenterPoint Energy Minnesota natural gas service territory"
        ],
        "notes": "Minnesota commercial and industrial customers receiving natural gas service from CenterPoint Energy."
      },
      "eligibleApplicantTypes": [
        "commercial_customers",
        "industrial_customers",
        "business_customers",
        "multifamily_property_owners",
        "foodservice_customers"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "multifamily",
        "foodservice"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_boiler_retrofit",
        "boiler_tune_up",
        "boiler_controls_retrofit",
        "steam_trap_repair_replacement",
        "pipe_insulation",
        "high_efficiency_furnace_retrofit",
        "smart_thermostat_zoning_retrofit",
        "condensing_unit_heater",
        "infrared_heater",
        "demand_controlled_ventilation",
        "energy_recovery_ventilation",
        "carbon_monoxide_garage_sensors",
        "garage_air_curtain",
        "high_efficiency_gas_water_heater",
        "commercial_laundry_ozone_retrofit",
        "commercial_modulating_clothes_dryer_retrofit",
        "industrial_process_boiler",
        "industrial_stack_economizer",
        "industrial_process_equipment",
        "waste_heat_recovery",
        "process_tank_insulation",
        "custom_natural_gas_savings_project",
        "commercial_kitchen_equipment",
        "high_efficiency_commercial_dishwasher",
        "commercial_kitchen_hood_demand_control_ventilation",
        "energy_audit",
        "commissioning_retrocommissioning",
        "engineering_assistance",
        "building_energy_benchmarking"
      ],
      "hardRequirements": [
        "Applicant must be a CenterPoint Energy Minnesota commercial or industrial natural gas customer.",
        "Rebates must be submitted in the same calendar year the equipment is installed and operational.",
        "Equipment must meet program specifications and be new where required.",
        "Rebate funds are limited and paid first-come, first-served.",
        "Custom rebates and engineering assistance require early contact or preapproval before project commitment."
      ],
      "blockers": [
        "General building insulation is not a broad commercial envelope rebate; current commercial support is pipe insulation and process tank insulation, with separate multifamily or residential weatherization pathways.",
        "Laundry support is limited to ozone laundry retrofit and modulating clothes dryer retrofit, not broad laundry equipment replacement.",
        "This is a natural-gas program; electric HVAC, electric refrigeration and lighting measures should not match.",
        "Smart thermostat is a commercial gas-heating control rebate, not demand response."
      ],
      "programType": "Rebate Program",
      "administrator": "CenterPoint Energy",
      "applicationUrl": "https://www.centerpointenergy.com/en-us/business/save-energy-money/efficiency-programs-rebates/equipment-programs-and-rebates?sa=mn",
      "websiteUrl": "https://www.centerpointenergy.com/en-us/business/save-energy-money/efficiency-programs-rebates/programs-and-rebates-by-industry/commercial?sa=MN",
      "sourceUrlsChecked": [
        "https://www.centerpointenergy.com/en-us/business/save-energy-money/efficiency-programs-rebates/equipment-programs-and-rebates?sa=mn",
        "https://www.centerpointenergy.com/en-us/business/save-energy-money/efficiency-programs-rebates/programs-and-rebates-by-industry/commercial?sa=MN",
        "https://www.centerpointenergy.com/en-us/business/save-energy-money/efficiency-programs-rebates/equipment-programs-and-rebates/pipe-insulation?sa=mn",
        "https://www.centerpointenergy.com/en-us/Documents/251104-08-MNTA-ECO-Book-Web.pdf",
        "https://www.centerpointenergy.com/en-us/business/save-energy-money/efficiency-programs-rebates/equipment-programs-and-rebates/foodservice-equipment-rebates?sa=MN",
        "https://www.centerpointenergy.com/en-us/business/save-energy-money/efficiency-programs-rebates/equipment-programs-and-rebates/custom-rebates?sa=mn"
      ],
      "evidenceText": "CenterPoint's Minnesota business pages list natural-gas rebates for boilers, heating systems, smart thermostats, pipe insulation, water heaters, commercial laundry, foodservice, industrial process equipment and custom projects.",
      "reasoningNotes": "Kept commercial natural-gas measures and narrowed insulation and laundry to the product-specific measures shown in current official materials."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "CenterPoint Minnesota business page lists many rebate categories but exact thermostat, boiler and laundry values require form/table selection.",
        "sourceUrlsChecked": [
          "https://www.centerpointenergy.com/en-us/business/save-energy-money/efficiency-programs-rebates/equipment-programs-and-rebates?sa=mn"
        ],
        "reasoningNotes": "No single commercial kitchen/gas rule was safely selected.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "commercial_kitchen_equipment_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4739",
    "opportunityName": "MMPA - Commercial and Industrial Energy Efficiency Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4739/mmpa-commercial-and-industrial-energy-efficiency-program",
    "websiteUrl": "https://www.mmpa.org/conservation/overview/",
    "applicationUrl": null,
    "administrator": "Minnesota Municipal Power Agency and participating member municipal utilities",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 5,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "exterior_site_lighting_retrofit",
        "displayName": "Exterior/site lighting retrofit",
        "parentCategory": "lighting",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "exterior lighting"
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
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "lighting retrofit"
        ]
      },
      {
        "retrofitTypeId": "lighting_controls_retrofit",
        "displayName": "Lighting controls retrofit",
        "parentCategory": "lighting",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "lighting controls"
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
          "variable frequency drive"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "MN"
        ],
        "counties": [],
        "cities": [
          "Anoka",
          "Arlington",
          "Brownton",
          "Buffalo",
          "Chaska",
          "East Grand Forks",
          "Elk River",
          "Le Sueur",
          "North St. Paul",
          "Olivia",
          "Shakopee",
          "Winthrop"
        ],
        "utilityTerritories": [
          "Participating Minnesota Municipal Power Agency member municipal electric utilities offering We Save Business rebates"
        ],
        "notes": "Local forms and eligible custom measures vary by participating municipal utility."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "industrial_customer",
        "non_residential_electric_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "municipal",
        "institutional"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "exterior_site_lighting_retrofit",
        "lighting_controls_retrofit",
        "variable_frequency_drive_retrofit",
        "high_efficiency_hvac_replacement",
        "high_efficiency_refrigeration_equipment",
        "commercial_food_service_equipment",
        "compressed_air_system_efficiency",
        "custom_energy_efficiency_project"
      ],
      "hardRequirements": [
        "Applicant must be a non-residential electric customer of a participating MMPA municipal utility.",
        "Customer must use the local utility's current form and follow its local deadline, inspection and documentation rules.",
        "Custom measures, including HVAC, refrigeration, food-service and compressed-air measures, require utility preapproval and verifiable energy savings.",
        "VFD rebates require a qualifying new drive that automatically controls fan or pump speed to match system changes."
      ],
      "blockers": [
        "Residential or home-weatherization work is not eligible under this business program.",
        "Broad HVAC matching should be allowed only for listed or preapproved custom high-efficiency equipment, not ordinary replacement.",
        "Replacement variable frequency drives are not eligible where the form requires a new drive.",
        "A measure offered by one MMPA city should not be assumed available in every member utility without checking the local form."
      ],
      "programType": "Rebate Program",
      "administrator": "Minnesota Municipal Power Agency and participating member municipal utilities",
      "applicationUrl": null,
      "websiteUrl": "https://www.mmpa.org/conservation/overview/",
      "sourceUrlsChecked": [
        "https://www.mmpa.org/conservation/overview/",
        "https://www.ci.buffalo.mn.us/DocumentCenter/View/2521/We-Save-Business-Lighting-Retrofit-Rebate-Form",
        "https://ci.buffalo.mn.us/DocumentCenter/View/2522/We-Save-Business-VFD-Rebate-Form",
        "https://northstpaul.org/DocumentCenter/View/7462/2026-We-Save-Business-Rebate-Information-Sheetpdf",
        "https://www.mmpa.org/communities/olivia/"
      ],
      "evidenceText": "MMPA says We Save Business rebates cover LED lighting, variable speed drives and custom projects; local 2026 forms list lighting controls, exterior LEDs, VFDs and preapproved custom measures.",
      "reasoningNotes": "Targets came from the uploaded queue prompt . Kept lighting and VFD matches; HVAC, refrigeration, food-service and compressed-air are custom or utility-specific measures."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "MMPA commercial program routes to local utility or custom rebate forms; exact VFD/lighting control values were not verified.",
        "sourceUrlsChecked": [
          "http://mmpa.org/conservation/we-save-business/"
        ],
        "reasoningNotes": "A member-utility measure table is needed before creating a rule.",
        "originalGapReason": "source_text_unavailable",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3985",
    "opportunityName": "Citizens Electric Corporation - Residential Energy Efficiency Rebate Program",
    "state": "MO",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3985/citizens-electric-corporation-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.cecmo.com/residential-rebates",
    "applicationUrl": "https://directefficiency.com/citizens-electric-corporation-powerful-paybacks-program-rules/",
    "administrator": "Citizens Electric Corporation",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 5,
    "targetKind": "reviewed_no_rule_reclassification",
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
          "MO"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Citizens Electric Corporation electric service territory"
        ],
        "notes": "Rebates are for Citizens Electric Corporation residential account holders."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "utility_member"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "ductless_mini_split_heat_pump",
        "air_source_heat_pump",
        "cold_climate_heat_pump",
        "dual_fuel_heat_pump",
        "ground_source_geothermal_heat_pump",
        "heat_pump_water_heater",
        "smart_thermostat_zoning_retrofit"
      ],
      "hardRequirements": [
        "Applicant must have an active Citizens Electric Corporation account in good standing.",
        "Equipment must be installed at the member premises and meet current program specifications.",
        "Applications and required documentation must be submitted within the stated program deadline after installation.",
        "Rebates are subject to annual funding and per-customer caps.",
        "New equipment, invoices, AHRI documentation, and Manual J documentation may be required depending on measure."
      ],
      "blockers": [
        "Do not match non-heat-pump generic HVAC replacement unless the installed equipment is an eligible heat pump type.",
        "Do not match efficient pump replacement; the supported pump terms refer to heat pumps, not process or water pumps.",
        "Existing geothermal replacement and new construction may be excluded under specific heat pump or thermostat rules.",
        "Residential program only; do not infer commercial equipment."
      ],
      "programType": "Rebate Program",
      "administrator": "Citizens Electric Corporation",
      "applicationUrl": "https://directefficiency.com/citizens-electric-corporation-powerful-paybacks-program-rules/",
      "websiteUrl": "https://www.cecmo.com/residential-rebates",
      "sourceUrlsChecked": [
        "https://www.cecmo.com/residential-rebates",
        "https://directefficiency.com/citizens-electric-corporation-powerful-paybacks-program-rules/",
        "https://directefficiency.com/cecmo-ductless-heat-pump-rebate/",
        "https://directefficiency.com/cecmo-ducted-air-source-heat-pump-rebate/",
        "https://directefficiency.com/cecmo-geothermal-heat-pump-rebate/",
        "https://directefficiency.com/cecmo-smart-thermostat-rebate/",
        "https://directefficiency.com/cecmo-heat-pump-water-heater-rebate/"
      ],
      "evidenceText": "CEC]( residential rebates cover air-source and ductless heat pumps, geothermal heat pumps, Wi-Fi smart thermostats, and heat pump water heaters, with account, equipment, deadline, and documentation requirements.",
      "reasoningNotes": "The current official and implementer pages support heat-pump-specific HVAC categories, HPWH, geothermal, and smart thermostats. Broad HVAC and non-HVAC pump categories should be blocked."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Citizens Electric page lists rebate categories but accessible text did not expose exact current heat-pump or thermostat values.",
        "sourceUrlsChecked": [
          "https://www.cecmo.com/residential-rebates"
        ],
        "reasoningNotes": "A current application table is needed before creating a rule.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4482",
    "opportunityName": "Missouri Rural Electric Cooperative - Residential Energy Efficiency Rebate Program",
    "state": "MO",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4482/missouri-rural-electric-cooperative-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.morec.org/rebates-products/",
    "applicationUrl": null,
    "administrator": "Missouri Rural Electric Cooperative",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 5,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "ground_source_geothermal_heat_pump",
        "displayName": "Ground-source / geothermal heat pump",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
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
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "air conditioning"
        ]
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
          "MO"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Missouri Rural Electric Cooperative"
        ],
        "notes": "Eligibility is limited to qualifying MREC member accounts and qualifying permanent residences."
      },
      "eligibleApplicantTypes": [
        "electric_cooperative_member",
        "residential_customer"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "ground_source_geothermal_heat_pump",
        "heat_pump_hvac_retrofit",
        "heat_pump_water_heater",
        "smart_thermostat_zoning_retrofit"
      ],
      "hardRequirements": [
        "Equipment must be installed in a qualifying permanent residence served by MREC.",
        "Heat pump and geothermal measures must meet program efficiency, insulation, backup heat, and sizing requirements.",
        "Heat pump water heater and thermostat rebates are capped by program limits and required documentation.",
        "Mobile homes must meet foundation and member-owned property requirements where applicable."
      ],
      "blockers": [
        "No current MREC official source supports Level 2 EV charger rebates under this residential efficiency program.",
        "Standard central air conditioning without heat-pump eligibility should not be matched as a broad HVAC replacement category.",
        "Commercial or industrial measures should not be inferred from this residential program."
      ],
      "programType": "Rebate Program",
      "administrator": "Missouri Rural Electric Cooperative",
      "applicationUrl": null,
      "websiteUrl": "https://www.morec.org/rebates-products/",
      "sourceUrlsChecked": [
        "https://www.morec.org/rebates-products/"
      ],
      "evidenceText": "MREC's]( rebate page supports ground-source heat pumps, air-source and mini-split heat pumps, heat pump water heaters, and ENERGY STAR advanced thermostats.",
      "reasoningNotes": "Remove Level 2 EV charging and broad non-heat-pump AC matching. The current official source supports residential heat-pump, geothermal, HPWH, and thermostat measures."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Official MOREC source did not verify a current Level 2 EV charger rebate formula.",
        "sourceUrlsChecked": [
          "https://www.morec.org/rebates-products/"
        ],
        "reasoningNotes": "No safe EV charging rule was selected.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "ev_charging_site_load",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2221",
    "opportunityName": "Pearl River Valley Electric Power Association - Residential Energy Efficiency Rebate Program",
    "state": "MS",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2221/pearl-river-valley-electric-power-association-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://help.prvepa.com/article/29-comfort-advantage",
    "applicationUrl": null,
    "administrator": "Pearl River Valley Electric Power Association",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 5,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "air_sealing_weatherization",
        "displayName": "Air sealing / weatherization",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "air sealing"
        ]
      },
      {
        "retrofitTypeId": "ground_source_geothermal_heat_pump",
        "displayName": "Ground-source / geothermal heat pump",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
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
          "MS"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Pearl River Valley Electric Power Association service territory"
        ],
        "notes": "Comfort Advantage eligibility is tied to PRVEPA service and program home standards."
      },
      "eligibleApplicantTypes": [
        "residential_member",
        "homeowner",
        "builder"
      ],
      "eligibleSectors": [
        "residential",
        "new_construction",
        "existing_home"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "ground_source_geothermal_heat_pump",
        "air_sealing_weatherization",
        "insulation_upgrade"
      ],
      "hardRequirements": [
        "Home energy requirements must be served by PRVEPA through one meter.",
        "Comfort Advantage homes must meet specified insulation, infiltration control, window and electric water-heating standards.",
        "Incentives are tied to qualifying electric heat pumps or qualifying ground-source heat pumps.",
        "Existing-home incentive applies to installing a qualifying heat pump in a non-Comfort Advantage home under current rules."
      ],
      "blockers": [
        "Air sealing and insulation are Comfort Advantage standards or requirements, not a broad standalone rebate.",
        "Broad high-efficiency HVAC replacement should be blocked unless the measure is a qualifying electric heat pump or ground-source heat pump.",
        "Commercial projects are not eligible under this residential Comfort Advantage record."
      ],
      "programType": "Rebate Program",
      "administrator": "Pearl River Valley Electric Power Association",
      "applicationUrl": null,
      "websiteUrl": "https://help.prvepa.com/article/29-comfort-advantage",
      "sourceUrlsChecked": [
        "https://help.prvepa.com/article/29-comfort-advantage"
      ],
      "evidenceText": "PRVEPA Comfort Advantage lists incentives for qualifying electric and ground-source heat pumps and sets required insulation, infiltration control, window and electric water-heating standards.",
      "reasoningNotes": "Kept heat-pump and geothermal matches. Insulation and air sealing are retained only as required home-performance standards, not separate prescriptive retrofit rebates."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Comfort Advantage page describes incentives for new homes but no clear matched heat pump/geothermal retrofit formula.",
        "sourceUrlsChecked": [
          "https://help.prvepa.com/article/29-comfort-advantage"
        ],
        "reasoningNotes": "Source text did not provide a safe one-time rule.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3466",
    "opportunityName": "Duke Energy - Non-Residential Energy Efficiency Rebate Program",
    "state": "NC",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3466/duke-energy-non-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.duke-energy.com/business/products/smartsaver/all-smartsaver-rebates",
    "applicationUrl": "https://dukeenergyefficiency.secure.force.com/onlineportal/",
    "administrator": "Duke Energy",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 5,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "efficient_air_compressor",
        "displayName": "Efficient air compressor",
        "parentCategory": "compressed_air_industrial",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "air compressor"
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
        "retrofitTypeId": "window_film_shading_retrofit",
        "displayName": "Window film / shading retrofit",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "window film"
        ]
      },
      {
        "retrofitTypeId": "window_replacement",
        "displayName": "Window replacement",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "window"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "NC"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Duke Energy Carolinas electric service territory",
          "Duke Energy Progress electric service territory"
        ],
        "notes": "North Carolina non-residential Smart Saver availability depends on the customer’s Duke Energy electric account and program rules."
      },
      "eligibleApplicantTypes": [
        "business_customer",
        "commercial_customer",
        "industrial_customer",
        "institutional_customer",
        "government_customer",
        "school_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "institutional",
        "government",
        "education"
      ],
      "eligibleRetrofitCategories": [
        "efficient_air_compressor",
        "compressed_air_leak_repair",
        "industrial_process_pump_vfd",
        "commercial_refrigeration_equipment",
        "commercial_foodservice_equipment",
        "window_film_shading_retrofit",
        "roof_insulation_upgrade",
        "custom_energy_efficiency_project"
      ],
      "hardRequirements": [
        "Applicant must be a non-residential Duke Energy electric customer with an active eligible account.",
        "Residential-rate customers and customers that opted out of applicable energy-efficiency riders are not eligible.",
        "Equipment must be new, installed and operating before payment unless preapproval is required.",
        "Applications generally require invoices, specifications and Duke verification; custom projects require preapproval."
      ],
      "blockers": [
        "Do not match window_replacement; accessible sources support window film, not replacement windows for this non-residential record.",
        "Do not match residential insulation or home weatherization.",
        "Do not infer all Smart Saver technologies where current Duke pages are not readable; maintain only supported or historically documented business categories.",
        "Do not match renewable generation."
      ],
      "programType": "Rebate Program",
      "administrator": "Duke Energy",
      "applicationUrl": "https://dukeenergyefficiency.secure.force.com/onlineportal/",
      "websiteUrl": "https://www.duke-energy.com/business/products/smartsaver/all-smartsaver-rebates",
      "sourceUrlsChecked": [
        "https://www.duke-energy.com/business/products/smartsaver/all-smartsaver-rebates",
        "https://www.duke-energy.com/business/products/smartsaver",
        "https://www.duke-energy.com/business/products/smartsaver/industrial-equipment",
        "https://energy-solution.com/fs-programs-duke/",
        "https://southernlightingservices.com/wp-content/uploads/2022/11/Rebate-Duke-Energy-Smart-Saver-Business-Industrial-Equipment-Application.pdf",
        "https://southernlightingservices.com/wp-content/uploads/2022/11/Rebates-Duke-Energy-Smart-Saver-Business-Heating-Cooling-Application.pdf"
      ],
      "evidenceText": "Duke’s public Smart Saver pages identify active business rebates; accessible application and implementer sources support compressed air, refrigeration, foodservice, window film and roof-insulation measures.",
      "reasoningNotes": "Confidence is medium because Duke public pages were difficult to read directly; categories were narrowed to accessible business program evidence and obvious false positives were blocked."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "source_inaccessible",
        "confidence": "low",
        "evidenceText": "Duke Energy Smart Saver pages require dynamic content and did not expose current refrigeration or compressed-air formulas.",
        "sourceUrlsChecked": [
          "https://www.duke-energy.com/business/products/smart-saver"
        ],
        "reasoningNotes": "Do not rely on DSIRE-only values without accessible official proof.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "refrigeration_electric_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4645",
    "opportunityName": "Eversource - Commercial New Construction Energy Efficiency Rebate Program",
    "state": "NH",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4645/eversource-commercial-new-construction-energy-efficiency-rebate-program",
    "websiteUrl": "https://nhsaves.com/learn/service/new-construction-high-performance-buildings/",
    "applicationUrl": null,
    "administrator": "Eversource / NHSaves",
    "programType": "Rebate/Incentive Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 5,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "boiler_controls_burner_retrofit",
        "displayName": "Boiler controls / burner retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "boiler reset"
        ]
      },
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
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
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
          "NH"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Eversource New Hampshire service territory",
          "NHSaves participating utility territories where applicable"
        ],
        "notes": "This repair treats the Eversource record as the New Hampshire NHSaves commercial new construction and high-performance buildings pathway for Eversource customers."
      },
      "eligibleApplicantTypes": [
        "Eversource business customers",
        "commercial building owners",
        "industrial customers",
        "municipal customers",
        "institutional customers",
        "developers",
        "design teams",
        "major renovation project sponsors"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "municipal",
        "institutional",
        "public_sector",
        "new_construction",
        "major_renovation"
      ],
      "eligibleRetrofitCategories": [
        "commercial_new_construction",
        "major_renovation",
        "high_performance_building",
        "net_zero_low_eui_building",
        "whole_building_energy_performance",
        "systems_pathway",
        "prescriptive_high_efficiency_equipment",
        "custom_energy_efficiency",
        "commercial_lighting",
        "lighting_controls",
        "air_compressors",
        "boilers",
        "boiler_reset_controls",
        "furnaces",
        "hvac_chillers",
        "commercial_kitchen_equipment",
        "variable_frequency_drives",
        "water_heaters",
        "weatherization_insulation",
        "programmable_thermostats_limited",
        "ecm_motors"
      ],
      "hardRequirements": [
        "Customer or project must be in the applicable Eversource/NHSaves service territory.",
        "New construction and major renovation projects should engage with the utility partner early in planning.",
        "Many commercial incentives require preapproval before equipment purchase and installation.",
        "Whole-building pathways have size thresholds and performance requirements such as minimum square footage or EUI/performance criteria.",
        "Prescriptive and custom measures are subject to current NHSaves program rates and utility review."
      ],
      "blockers": [
        "The DSIRE website URL points to a generic Eversource equipment rebates page with dynamic service-area selection and is not a complete current program manual by itself.",
        "Do not treat thermostat, boiler or boiler reset terms as standalone residential rebates; this record is commercial new construction, major renovation or eligible business equipment replacement.",
        "Do not merge the separate NHSaves Energy Rewards RFP demand-reduction solicitation into this new construction record.",
        "Residential Eversource or Mass Save measures are not eligible here."
      ],
      "programType": "Rebate/Incentive Program",
      "administrator": "Eversource / NHSaves",
      "applicationUrl": null,
      "websiteUrl": "https://nhsaves.com/learn/service/new-construction-high-performance-buildings/",
      "sourceUrlsChecked": [
        "https://www.eversource.com/content/business/save-money-energy/equipment-rebates-discounts",
        "https://nhsaves.com/learn/service/new-construction-high-performance-buildings/",
        "https://nhsaves.com/instant-rebates-new-or-replacement-equipment/",
        "https://programs.dsireusa.org/system/program/detail/4645/eversource-commercial-new-construction-energy-efficiency-rebate-program"
      ],
      "evidenceText": "NHSaves' New Construction High Performance Buildings page describes New Equipment and Construction support for new facilities, major renovations and replacement of failed end-of-life equipment. Current pathways include Net Zero and Low EUI, High Performance Building, Systems Pathway and prescriptive or custom equipment incentives. NHSaves commercial incentive pages list boilers, boiler reset controls, lighting and controls, HVAC and chillers, kitchen equipment, VFDs, water heaters and weatherization/insulation among eligible business measures.",
      "reasoningNotes": "The record remains active but the current official replacement source is NHSaves rather than the stale generic Eversource page alone. Categories were limited to commercial/new-construction and business equipment pathways."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Eversource commercial new-construction incentives are project-specific and no reusable per-kWh formula was verified.",
        "sourceUrlsChecked": [
          "https://www.eversource.com/content/business/save-money-energy/equipment-rebates-discounts"
        ],
        "reasoningNotes": "No safe one-time rule should be merged without the project pathway and application table.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4982",
    "opportunityName": "PSE&G - Government and Non-Profit Facility Direct Install Efficiency Program",
    "state": "NJ",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4982/pse-and-g-government-and-non-profit-facility-direct-install-efficiency-program",
    "websiteUrl": "https://bizenergy.pseg.com/direct-install-program",
    "applicationUrl": "https://bizsaveportal.pseg.com/",
    "administrator": "PSE&G",
    "programType": "Direct Install Efficiency Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 5,
    "targetKind": "reviewed_no_rule_reclassification",
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
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
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
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "NJ"
        ],
        "counties": [
          "Bergen",
          "Burlington",
          "Camden",
          "Essex",
          "Gloucester",
          "Hudson",
          "Hunterdon",
          "Mercer",
          "Middlesex",
          "Monmouth",
          "Morris",
          "Ocean",
          "Passaic",
          "Somerset",
          "Union"
        ],
        "cities": [],
        "utilityTerritories": [
          "PSE&G New Jersey business electric service territory",
          "PSE&G New Jersey business gas service territory"
        ],
        "notes": "Eligibility depends on PSE&G business service and program size thresholds."
      },
      "eligibleApplicantTypes": [
        "small_businesses",
        "midsize_businesses",
        "government_entities",
        "municipal_facilities",
        "state_facilities",
        "federal_facilities",
        "nonprofit_organizations",
        "public_entities"
      ],
      "eligibleSectors": [
        "commercial",
        "institutional",
        "government",
        "municipal",
        "nonprofit",
        "public_sector"
      ],
      "eligibleRetrofitCategories": [
        "energy_audit",
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "high_efficiency_hvac_replacement",
        "hvac_controls_retrofit",
        "high_efficiency_refrigeration_equipment",
        "motor_retrofit",
        "variable_frequency_drive_retrofit",
        "energy_management_system"
      ],
      "hardRequirements": [
        "Applicant must be a PSE&G New Jersey business customer.",
        "Direct Install is designed for smaller facilities under stated annual demand or therm thresholds.",
        "Program begins with a no-cost or free on-site energy assessment.",
        "Project costs, incentives, direct-install treatment, and on-bill repayment depend on PSE&G approval and measure eligibility."
      ],
      "blockers": [
        "Residential appliances and home weatherization are not eligible under this business direct-install record.",
        "Insulation or building envelope improvements should not be broadly matched unless part of a separately approved public-sector or engineered solution.",
        "Solar, battery storage, EV charging, and demand response are separate offerings, not this direct-install efficiency program."
      ],
      "programType": "Direct Install Efficiency Program",
      "administrator": "PSE&G",
      "applicationUrl": "https://bizsaveportal.pseg.com/",
      "websiteUrl": "https://bizenergy.pseg.com/direct-install-program",
      "sourceUrlsChecked": [
        "https://bizenergy.pseg.com/direct-install-program",
        "https://bizenergy.pseg.com/public-service",
        "https://bizsaveportal.pseg.com/"
      ],
      "evidenceText": "PSE&G Direct Install begins with a free on-site assessment for PSE&G New Jersey business customers under demand or therm thresholds and covers lighting, HVAC, refrigeration, motors and related retrofits.",
      "reasoningNotes": "The original energy audit, HVAC, refrigeration and lighting matches are supported. Insulation should be blocked as a broad match because it is not a default Direct Install measure."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Direct-install incentives depend on facility assessment and approved measures; no reusable one-time formula was verified.",
        "sourceUrlsChecked": [
          "https://bizsave.pseg.com/government-nonprofit-direct-install",
          "https://homeenergy.pseg.com/business"
        ],
        "reasoningNotes": "Project-specific direct-install services should not be encoded without final approved measure cost-share or table.",
        "originalGapReason": "source_text_unavailable",
        "mapping": {
          "primarySavingsModelId": "grant_funding",
          "incentiveValueMethod": "grant_amount",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2599",
    "opportunityName": "Central New Mexico Electric Cooperative - Residential Energy Efficiency Rebate Program",
    "state": "NM",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2599/central-new-mexico-electric-cooperative-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://cnmec.org/cnmec-member-rebates",
    "applicationUrl": "https://cnmec.org/cnmec-member-rebates",
    "administrator": "Central New Mexico Electric Cooperative",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 5,
    "targetKind": "reviewed_no_rule_reclassification",
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
          "refrigerator",
          "freezer"
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
          "NM"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Central New Mexico Electric Cooperative service territory"
        ],
        "notes": "Limited to CNMEC members and customers."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "electric_cooperative_member",
        "commercial_customer"
      ],
      "eligibleSectors": [
        "residential",
        "commercial"
      ],
      "eligibleRetrofitCategories": [
        "air_source_heat_pump",
        "ground_source_geothermal_heat_pump",
        "heat_pump_water_heater",
        "residential_induction_cooking",
        "smart_thermostat_zoning_retrofit",
        "refrigerator_freezer_recycling",
        "heat_pump_clothes_dryer"
      ],
      "hardRequirements": [
        "Applicant must be a CNMEC member or customer and include a CNMEC bill or account documentation.",
        "Residential appliance and heat pump water heater forms require qualifying ENERGY STAR or program-listed equipment.",
        "Most forms require submission within 90 days of purchase or installation.",
        "Commercial LED, refrigeration-case lighting and VFD measures are separate commercial rebate lines."
      ],
      "blockers": [
        "Do not match low_flow_fixture_retrofit; no current CNMEC residential water fixture rebate was verified.",
        "Do not match commercial kitchen induction; induction support is residential cooktop or range.",
        "Do not treat refrigerator/freezer recycling as commercial refrigeration equipment.",
        "Do not merge CNMEC EV charging equipment, commercial LED or VFD rebates into this residential appliance and HVAC matching record; those are separate rebate lines."
      ],
      "programType": "Rebate Program",
      "administrator": "Central New Mexico Electric Cooperative",
      "applicationUrl": "https://cnmec.org/cnmec-member-rebates",
      "websiteUrl": "https://cnmec.org/cnmec-member-rebates",
      "sourceUrlsChecked": [
        "https://cnmec.org/cnmec-member-rebates",
        "https://cnmec.org/sites/default/files/appliance-rebate-form-2025.pdf",
        "https://cnmec.org/sites/default/files/electric-heat-pump-water-heater-rebate-form-2025.pdf"
      ],
      "evidenceText": "CNMEC lists residential rebates for air-source and ground-source heat pumps, heat pump water heaters, induction cooking, smart thermostats, appliance recycling and heat pump dryers.",
      "reasoningNotes": "Residential and commercial categories were separated so product-specific appliance matches do not become broad refrigeration or fixture matches."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Central New Mexico EC lists appliance, HPWH, EV charging, induction and smart thermostat rebate forms, but exact 2026 amounts were not verified.",
        "sourceUrlsChecked": [
          "https://cnmec.org/cnmec-member-rebates",
          "https://programs.dsireusa.org/system/program/detail/2599"
        ],
        "reasoningNotes": "A current rebate form must be extracted before creating a refrigeration/HPWH rule.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "refrigeration_electric_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4524",
    "opportunityName": "NV Energy -Energy Smart Schools Program",
    "state": "NV",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4524/nv-energy-energy-smart-schools-program",
    "websiteUrl": "https://www.nvenergy.com/save-with-powershift/schools",
    "applicationUrl": null,
    "administrator": "NV Energy",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 5,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
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
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "air conditioning"
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
        "retrofitTypeId": "window_film_shading_retrofit",
        "displayName": "Window film / shading retrofit",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "window film"
        ]
      },
      {
        "retrofitTypeId": "window_replacement",
        "displayName": "Window replacement",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "window"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "NV"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "NV Energy electric service territory"
        ],
        "notes": "Eligible educational institutions must be located in NV Energy's service territory."
      },
      "eligibleApplicantTypes": [
        "public_k_12_school",
        "charter_k_12_school",
        "higher_education_institution"
      ],
      "eligibleSectors": [
        "education",
        "public_sector",
        "institutional"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "exterior_site_lighting_retrofit",
        "lighting_controls_retrofit",
        "window_film_shading_retrofit",
        "energy_management_system",
        "retrocommissioning",
        "high_efficiency_hvac_replacement",
        "variable_frequency_drive_retrofit",
        "high_efficiency_refrigeration_equipment",
        "commercial_kitchen_equipment",
        "custom_energy_efficiency_project"
      ],
      "hardRequirements": [
        "Eligible applicants are public and charter K-12 schools and higher education institutions in NV Energy territory.",
        "Projects must be selected from prescriptive measures or proposed as custom projects with verifiable energy savings.",
        "The process includes pre-application, pre-inspection, pre-approval, reservation of funds, final application and post-inspection.",
        "Funding is limited."
      ],
      "blockers": [
        "Window replacement is not supported by the current program summary; only window film is listed.",
        "Residential, private commercial and non-school projects are not eligible under this school program.",
        "Energy advisor assistance is not itself an installed retrofit.",
        "Do not treat programmable thermostats as broad smart-building controls outside eligible school projects."
      ],
      "programType": "Rebate Program",
      "administrator": "NV Energy",
      "applicationUrl": null,
      "websiteUrl": "https://www.nvenergy.com/save-with-powershift/schools",
      "sourceUrlsChecked": [
        "https://www.nvenergy.com/save-with-powershift/schools",
        "https://www.nvenergy.com/publish/content/dam/nvenergy/brochures_arch/save-with-powershift/smart-school/EnergySmartSchools_ProgramSummary.pdf"
      ],
      "evidenceText": "NV Energy's 2025 summary says eligible schools and higher education can receive rebates for lighting, window film, refrigeration, kitchen equipment, HVAC/VFDs and EMS optimization.",
      "reasoningNotes": "Kept window film but removed window replacement. Added refrigeration, kitchen, VFD and custom because the official school summary lists them."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "NV Energy schools materials describe lighting, cooling, controls and custom options, but no official current motor/VFD or energy-management amount was verified.",
        "sourceUrlsChecked": [
          "https://www.nvenergy.com/save-with-powershift/schools",
          "https://www.nvenergy.com/publish/content/dam/nvenergy/brochures_arch/save-with-powershift/smart-school/EnergySmartSchools_ProgramSummary.pdf",
          "https://programs.dsireusa.org/system/program/detail/4524"
        ],
        "reasoningNotes": "The DSIRE custom rate was not used as final proof without a current official rate table.",
        "originalGapReason": "source_text_unavailable",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4845",
    "opportunityName": "American Municipal Power (Public Electric Utilities) - Efficiency Smart Residential Program",
    "state": "OH",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4845/american-municipal-power-public-electric-utilities-efficiency-smart-residential-program",
    "websiteUrl": "https://www.efficiencysmart.org/home-energy-rebates",
    "applicationUrl": "https://www.efficiencysmart.org/home-energy-rebates/apply",
    "administrator": "Efficiency Smart",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 5,
    "targetKind": "reviewed_no_rule_reclassification",
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
        "retrofitTypeId": "high_efficiency_laundry_equipment",
        "displayName": "High-efficiency laundry equipment",
        "parentCategory": "water_efficiency",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "clothes washer"
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
          "refrigerator"
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
      },
      {
        "retrofitTypeId": "window_replacement",
        "displayName": "Window replacement",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "window"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "OH"
        ],
        "counties": [],
        "cities": [
          "Bowling Green",
          "Brewster",
          "Columbiana",
          "Edgerton",
          "Georgetown",
          "Jackson Center",
          "Lakeview",
          "Minster",
          "Napoleon",
          "Oak Harbor",
          "Oberlin",
          "St. Marys",
          "Versailles",
          "Wadsworth",
          "Wapakoneta",
          "Wellington"
        ],
        "utilityTerritories": [
          "Efficiency Smart participating Ohio municipal electric utilities"
        ],
        "notes": "Only customers of participating public power utilities are eligible."
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
        "air_source_heat_pump",
        "cold_climate_air_source_heat_pump",
        "central_air_conditioner_replacement",
        "window_room_air_conditioner",
        "heat_pump_water_heater",
        "smart_thermostat_zoning_retrofit",
        "residential_refrigerator_appliance",
        "residential_clothes_washer",
        "electric_clothes_dryer",
        "efficient_pool_pump",
        "dehumidifier",
        "air_purifier"
      ],
      "hardRequirements": [
        "Applicant must be served by a participating Efficiency Smart utility.",
        "Equipment must be new, qualifying and installed at the service address.",
        "Application must include required receipt or contractor documentation and be submitted within program deadlines.",
        "Rebates are subject to annual limits and funding availability."
      ],
      "blockers": [
        "Do not match window_replacement; the supported window-related product is a window air conditioner.",
        "Do not match commercial refrigeration; refrigerator incentives are residential appliance rebates.",
        "Do not treat residential clothes washer and dryer rebates as commercial laundry or water-efficiency retrofits."
      ],
      "programType": "Rebate Program",
      "administrator": "Efficiency Smart",
      "applicationUrl": "https://www.efficiencysmart.org/home-energy-rebates/apply",
      "websiteUrl": "https://www.efficiencysmart.org/home-energy-rebates",
      "sourceUrlsChecked": [
        "https://www.efficiencysmart.org/",
        "https://www.efficiencysmart.org/home-energy-rebates",
        "https://www.efficiencysmart.org/home-energy-rebates/apply"
      ],
      "evidenceText": "Efficiency Smart’s home rebate page lists residential heat pumps, central AC, window air conditioners, heat pump water heaters, smart thermostats, refrigerators and laundry appliances.",
      "reasoningNotes": "Ohio geography was restricted to participating municipal utilities rather than the entire state."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Efficiency Smart residential page lists rebate categories but no current whole-building per-kWh formula.",
        "sourceUrlsChecked": [
          "https://www.efficiencysmart.org/residential"
        ],
        "reasoningNotes": "Matched measures are individual equipment rebates; no single source-backed whole-building rule was verified.",
        "originalGapReason": "source_text_unavailable",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3639",
    "opportunityName": "OG&E - Commercial Energy Efficiency Rebate Programs",
    "state": "OK",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3639/og-and-e-commercial-energy-efficiency-rebate-programs",
    "websiteUrl": "https://www.oge.com/web/portal/label_ord/energy-solutions/efficiency-programs/commercial-industrial-energy-efficiency",
    "applicationUrl": null,
    "administrator": "OG&E",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 5,
    "targetKind": "reviewed_no_rule_reclassification",
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
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
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
        "retrofitTypeId": "led_lighting_retrofit",
        "displayName": "LED lighting retrofit",
        "parentCategory": "lighting",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "led lighting"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "OK"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "OG&E Oklahoma electric service territory"
        ],
        "notes": "The current business page is utility-account based and shows Oklahoma/Arkansas navigation; this DSIRE target is treated as Oklahoma unless an Arkansas account path is confirmed."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "industrial_customer",
        "small_business_customer",
        "school_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "education",
        "institutional"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "high_efficiency_refrigeration_equipment",
        "commercial_kitchen_equipment",
        "high_efficiency_hvac_replacement",
        "hvac_tune_up",
        "building_controls_energy_management",
        "smart_thermostat_zoning_retrofit",
        "building_energy_assessment",
        "building_benchmarking"
      ],
      "hardRequirements": [
        "Applicant must be an eligible OG&E business customer in the applicable service territory.",
        "Measures and discounts must follow the applicable C&I, Small Business, Midstream or education program path.",
        "Small Business installations and assessments are performed through program-approved channels.",
        "Midstream discounts require eligible products and participating distributors or retailers."
      ],
      "blockers": [
        "Insulation upgrade is not supported by the current OG&E commercial page and should be removed for this record.",
        "Benchmarking is a support or analysis feature, not a physical retrofit or building benchmarking compliance mandate.",
        "Residential appliance, home weatherization and residential HVAC offers are separate and should not be inferred here."
      ],
      "programType": "Rebate Program",
      "administrator": "OG&E",
      "applicationUrl": null,
      "websiteUrl": "https://www.oge.com/web/portal/label_ord/energy-solutions/efficiency-programs/commercial-industrial-energy-efficiency",
      "sourceUrlsChecked": [
        "https://www.oge.com/web/portal/label_ord/energy-solutions/efficiency-programs/commercial-industrial-energy-efficiency"
      ],
      "evidenceText": "OG&E's business efficiency page lists lighting, refrigeration, HVAC and building controls, plus benchmarking, Advanced A/C Tune-Up, LED retrofits, smart thermostats and midstream kitchen products.",
      "reasoningNotes": "Removed insulation and narrowed benchmarking to a nonphysical support category; kept commercial refrigeration and kitchen products only for business/midstream offers."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "OG&E commercial page describes rebates and instant discounts but no controls or refrigeration formula was verified.",
        "sourceUrlsChecked": [
          "https://www.oge.com/wps/portal/ogebusiness/save-energy/business-rebates"
        ],
        "reasoningNotes": "No source-backed one-time rule could be selected for the matched commercial measures.",
        "originalGapReason": "source_text_unavailable",
        "mapping": {
          "primarySavingsModelId": "controls_building_automation",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22431",
    "opportunityName": "OTEC - Commercial Energy Efficiency Rebate Program",
    "state": "OR",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22431/otec-commercial-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.otec.coop/commercial-rebates",
    "applicationUrl": "https://oregon.my.salesforce-sites.com/",
    "administrator": "Oregon Trail Electric Cooperative",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 5,
    "targetKind": "reviewed_no_rule_reclassification",
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
      },
      {
        "retrofitTypeId": "window_replacement",
        "displayName": "Window replacement",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "window"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "OR"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Oregon Trail Electric Cooperative service territory"
        ],
        "notes": "Commercial rebates are for OTEC commercial member-owners and are administered through OTEC's Oregon rebate platform."
      },
      "eligibleApplicantTypes": [
        "commercial_member",
        "business_customer",
        "non_residential_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "agricultural",
        "institutional",
        "small_business"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "ductless_heat_pump",
        "heat_pump_water_heater",
        "smart_thermostat_zoning_retrofit",
        "insulation_upgrade",
        "window_replacement",
        "led_lighting_retrofit",
        "energy_star_refrigerator_freezer",
        "commercial_ev_charging_station"
      ],
      "hardRequirements": [
        "Applicant must be an OTEC commercial member-owner.",
        "Weatherization incentives require the building's primary heating source to be electric.",
        "Insulation rebates apply where qualifying assemblies currently have no insulation.",
        "Window replacement cannot change window size and must meet the listed U-factor requirements.",
        "Smart thermostats must be on the qualified product list and are not eligible for lodging, 24/7 operation or semi-conditioned spaces."
      ],
      "blockers": [
        "Residential rebates are separate and should not be inferred from this commercial record.",
        "Broad HVAC replacement should be limited to qualifying heat pump or ductless heat pump measures.",
        "Window work that changes the size of the opening is not eligible.",
        "Commercial EV charging appears as a separate measure on the same commercial rebate page and should not be confused with HVAC or envelope measures."
      ],
      "programType": "Rebate Program",
      "administrator": "Oregon Trail Electric Cooperative",
      "applicationUrl": "https://oregon.my.salesforce-sites.com/",
      "websiteUrl": "https://www.otec.coop/commercial-rebates",
      "sourceUrlsChecked": [
        "https://www.otec.coop/commercial-rebates",
        "https://www.otec.coop/commercial"
      ],
      "evidenceText": "OTEC's commercial rebate page lists heat pumps, heat pump water heaters, smart thermostats, insulation, windows, lighting, appliances and EV charging, with electric-heat and product-list limits.",
      "reasoningNotes": "Kept window replacement because the current commercial page lists windows; limited refrigerator/freezer to ENERGY STAR appliance context rather than broad refrigeration systems."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Official OTEC commercial rebate materials were found, but no current HVAC formula was verified for the target terms.",
        "sourceUrlsChecked": [
          "https://www.otec.coop/business-rebates",
          "https://www.directefficiency.com/otec-rebates/#otec-commercial"
        ],
        "reasoningNotes": "Commercial HVAC incentives appear measure-specific; the accessible source text did not provide a safe reusable rule.",
        "originalGapReason": "source_text_unavailable",
        "mapping": {
          "primarySavingsModelId": "hvac_electric_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4132",
    "opportunityName": "FirstEnergy (Met-Ed, Penelec, Penn Power, and West Penn) - Commercial and Industrial Energy Efficiency Program",
    "state": "PA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4132/firstenergy-met-ed-penelec-penn-power-and-west-penn-commercial-and-industrial-energy-efficiency-program",
    "websiteUrl": "https://www.firstenergycorp.com/save_energy/save_energy_pennsylvania/for_your_business_pa.html",
    "applicationUrl": "https://www.energysavepa-bizsolutions.com/fepa/apply-now/",
    "administrator": "CLEAResult",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 5,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "combined_heat_and_power_system",
        "displayName": "Combined heat and power system",
        "parentCategory": "solar_renewable_electricity",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "combined heat and power"
        ]
      },
      {
        "retrofitTypeId": "energy_audit",
        "displayName": "Energy audit",
        "parentCategory": "audits_studies_planning",
        "isPhysicalRetrofit": false,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "audit"
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
        "retrofitTypeId": "retro_commissioning_study",
        "displayName": "Retro-commissioning study",
        "parentCategory": "audits_studies_planning",
        "isPhysicalRetrofit": false,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "retro commissioning",
          "retro-commissioning",
          "commissioning"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "PA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Met-Ed",
          "Penelec",
          "Penn Power",
          "West Penn Power"
        ],
        "notes": "Available to eligible nonresidential retail electric customers of the FirstEnergy Pennsylvania utilities."
      },
      "eligibleApplicantTypes": [
        "commercial_electric_customer",
        "industrial_electric_customer",
        "government_customer",
        "institutional_customer",
        "nonprofit_customer",
        "agricultural_customer",
        "multifamily_common_area_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "government",
        "institutional",
        "nonprofit",
        "agriculture",
        "multifamily"
      ],
      "eligibleRetrofitCategories": [
        "retro_commissioning_study",
        "virtual_commissioning",
        "building_tune_up",
        "energy_audit",
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "high_efficiency_hvac_replacement",
        "hvac_controls_retrofit",
        "refrigeration_controls_retrofit",
        "high_efficiency_refrigeration_equipment",
        "commercial_kitchen_equipment",
        "high_efficiency_commercial_dishwasher",
        "efficient_motor_replacement",
        "variable_frequency_drive",
        "domestic_hot_water_efficiency",
        "custom_energy_efficiency_project",
        "custom_building_improvement",
        "commercial_new_construction_efficiency",
        "solar_electric_system",
        "combined_heat_and_power_system",
        "agricultural_energy_efficiency"
      ],
      "hardRequirements": [
        "Customer must be an eligible nonresidential retail electric customer of Met-Ed, Penelec, Penn Power, or West Penn Power.",
        "Projects must meet the requirements of the applicable prescriptive, custom, tune-up, commissioning, new-construction, or instant-discount track.",
        "Applications typically require utility bill, W-9, quote, specification sheets, invoices, and possible pre- or post-inspections.",
        "Program phase transition began June 1, 2026; work completed under prior phase may need program guidance.",
        "Incentive caps, customer segment thresholds, and measure-specific requirements apply."
      ],
      "blockers": [
        "Do not match residential home energy rebates.",
        "Demand response and unrelated utility offerings are separate from this C&I efficiency program.",
        "Residentially metered agriculture is only eligible where the agriculture track explicitly allows it.",
        "Combined heat and power should be matched only under current eligible solar and CHP provisions, not old retired pages."
      ],
      "programType": "Rebate Program",
      "administrator": "CLEAResult",
      "applicationUrl": "https://www.energysavepa-bizsolutions.com/fepa/apply-now/",
      "websiteUrl": "https://www.firstenergycorp.com/save_energy/save_energy_pennsylvania/for_your_business_pa.html",
      "sourceUrlsChecked": [
        "https://www.firstenergycorp.com/save_energy/save_energy_pennsylvania/for_your_business_pa.html",
        "https://www.energysavepa-bizsolutions.com/",
        "https://www.energysavepa-bizsolutions.com/fepa/programs/",
        "https://www.energysavepa-bizsolutions.com/fepa/apply-now/",
        "https://energysavepa-programplacement.com/",
        "https://energysavepa-rcx.com/",
        "https://energysavepa-tuneup.com/program-ally"
      ],
      "evidenceText": "FirstEnergy]( Pennsylvania business pages describe active C&I incentives for lighting, refrigeration, HVAC, food service, motors, VFDs, domestic hot water, custom projects, commissioning, tune-ups, new construction, agriculture, solar, and CHP.",
      "reasoningNotes": "The current BizSolutions program replaces older site links. Keep C&I categories broad enough for the published tracks, with nonresidential utility territory limits."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "FirstEnergy PA business program materials are time-limited and measure/project-specific; current phase closeout requires application review.",
        "sourceUrlsChecked": [
          "https://www.firstenergycorp.com/save_energy/save_energy_pennsylvania/business.html"
        ],
        "reasoningNotes": "Target includes CHP, audits and retro-commissioning; no reusable one-time formula was verified.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "commercial_kitchen_equipment_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5756",
    "opportunityName": "Rhode Island Energy (Electric) Commercial and Industrial Rebate Program",
    "state": "RI",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5756/rhode-island-energy-electric-commercial-and-industrial-rebate-program",
    "websiteUrl": "https://energy.ri.gov/incentives",
    "applicationUrl": null,
    "administrator": "Rhode Island Energy",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 5,
    "targetKind": "reviewed_no_rule_reclassification",
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
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "refrigeration"
        ]
      },
      {
        "retrofitTypeId": "hvac_controls_retrofit",
        "displayName": "HVAC controls retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "economizer"
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
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "RI"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Rhode Island Energy commercial electric service territory",
          "Rhode Island Energy commercial gas service territory for gas measures"
        ],
        "notes": "Program eligibility depends on Rhode Island Energy commercial or industrial account type and measure-specific gas or electric service."
      },
      "eligibleApplicantTypes": [
        "commercial_customers",
        "industrial_customers",
        "municipal_customers",
        "restaurants",
        "grocery_stores",
        "small_businesses"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "municipal",
        "institutional"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "ground_source_geothermal_heat_pump",
        "high_efficiency_hvac_replacement",
        "hvac_controls_retrofit",
        "economizer_controls",
        "high_efficiency_refrigeration_equipment",
        "heat_energy_recovery_ventilator",
        "ecm_circulator_pump",
        "efficient_water_pump",
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "energy_management_system",
        "variable_frequency_drive_retrofit",
        "high_efficiency_commercial_kitchen_equipment",
        "commercial_gas_water_heating",
        "commercial_boiler_retrofit",
        "custom_energy_efficiency_retrofit",
        "vending_machine_controls"
      ],
      "hardRequirements": [
        "Applicant must be an eligible Rhode Island Energy commercial or industrial customer.",
        "Equipment must meet current Rhode Island Energy measure specifications.",
        "Large quantities or incentive totals may require preapproval.",
        "The same equipment generally cannot receive duplicate Rhode Island Energy incentives.",
        "Gas measures require applicable Rhode Island Energy gas service."
      ],
      "blockers": [
        "Residential appliance rebates are not eligible under this commercial and industrial record.",
        "ConnectedSolutions demand response, solar, EV charging, and financing are separate offerings.",
        "Do not infer broad building envelope retrofits unless a current custom or program-specific path explicitly approves the measure."
      ],
      "programType": "Rebate Program",
      "administrator": "Rhode Island Energy",
      "applicationUrl": null,
      "websiteUrl": "https://energy.ri.gov/incentives",
      "sourceUrlsChecked": [
        "https://energy.ri.gov/incentives",
        "https://www.rienergy.com/site/ways-to-save/save-money-with-rebates-and-incentives/savings-for-your-business/instant-commercial-rebates",
        "https://www.rienergy.com/site/-/media/rie-jss-app/home/ways-to-save/rebates-and-savings-programs/commercial-savings/0125-rie-hvac-ri_commercial_collateral-hvac-customerflyer.ashx?hash=44D7FCBEF644B6A4969EA7DD4B2E5A66&sc_lang=en",
        "https://www.rienergy.com/site/-/media/rie-jss-app/home/ways-to-save/rebates-and-savings-programs/commercial-savings/0125_RIE_CM_4747382_Foodservice_FLY_Updates_CLEAN-Final.ashx?hash=A71F781A400113CA76864FB28F2DC3DA&sc_lang=en"
      ],
      "evidenceText": "Current Rhode Island commercial incentive sources cover HVAC heat pumps, AC, VRF, heat and energy recovery, refrigeration, pumps, lighting, controls, foodservice, gas water heating, custom and EMS measures.",
      "reasoningNotes": "The original HVAC, refrigeration and lighting matches are supported. Category boundaries should remain commercial and industrial, not residential."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Rhode Island Energy commercial pages describe business incentives but no kitchen/refrigeration formula was verified.",
        "sourceUrlsChecked": [
          "https://www.rienergy.com/site/ways-to-save/save-money-with-rebates-and-incentives/savings-for-your-business"
        ],
        "reasoningNotes": "No source-backed commercial kitchen or refrigeration amount was safely selected.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "commercial_kitchen_equipment_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5171",
    "opportunityName": "AEP (Central) - CitySmart Program",
    "state": "TX",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5171/aep-central-citysmart-program",
    "websiteUrl": "https://aeptxsaves.com/commercial-programs/",
    "applicationUrl": null,
    "administrator": "AEP Texas",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 5,
    "targetKind": "reviewed_no_rule_reclassification",
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
        "retrofitTypeId": "efficient_air_compressor",
        "displayName": "Efficient air compressor",
        "parentCategory": "compressed_air_industrial",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "air compressor"
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
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "led lighting"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "TX"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "AEP Texas Central Division"
        ],
        "notes": "AEP Texas Central Division facilities; CitySmart is aimed at government, municipal and other public-sector institutions."
      },
      "eligibleApplicantTypes": [
        "local_governments",
        "municipalities",
        "government_institutions",
        "public_agencies"
      ],
      "eligibleSectors": [
        "non_residential",
        "public_sector",
        "local_government"
      ],
      "eligibleRetrofitCategories": [
        "building_benchmarking_compliance",
        "energy_master_planning",
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "hvac_controls_retrofit",
        "high_efficiency_hvac_replacement",
        "electric_chiller_upgrade",
        "variable_frequency_drive",
        "building_envelope_retrofit",
        "energy_star_roof",
        "air_infiltration_reduction"
      ],
      "hardRequirements": [
        "Facility must receive AEP Texas Central electric delivery service.",
        "Applicant must be a qualifying public-sector or government customer for CitySmart.",
        "Projects generally require program approval, savings documentation and inspection or verification.",
        "Incentives depend on current funding availability and measure-specific energy savings."
      ],
      "blockers": [
        "Efficient air compressor was not verified for the current CitySmart public-sector offering.",
        "Benchmarking and master planning are technical assistance, not physical retrofits.",
        "This is not a residential or general small-business program.",
        "Food service and refrigeration measures appear in separate AEP commercial offerings unless specifically accepted through CitySmart."
      ],
      "programType": "Rebate Program",
      "administrator": "AEP Texas",
      "applicationUrl": null,
      "websiteUrl": "https://aeptxsaves.com/commercial-programs/",
      "sourceUrlsChecked": [
        "https://aeptxsaves.com/",
        "https://aeptxsaves.com/commercial-programs/",
        "https://aeptxsaves.com/commercial-programs/commercial-standard-offer/",
        "https://aeptexasefficiency.com/#/"
      ],
      "evidenceText": "AEP Texas commercial pages still list CitySmart and show public-sector efficiency offerings centered on HVAC, lighting, controls and building-envelope measures. The CitySmart detail page did not render usable content.",
      "reasoningNotes": "Kept categories supported by current AEP commercial/public-sector references; downgraded confidence because the CitySmart detail page was not fully readable."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "CitySmart is a project-based public-sector efficiency program; no reusable refrigeration formula was verified.",
        "sourceUrlsChecked": [
          "https://www.aeptexasefficiency.com/#/commercial/citysmart",
          "https://programs.dsireusa.org/system/program/detail/5171"
        ],
        "reasoningNotes": "The target includes refrigeration and compressor terms, but the source does not publish one safe per-unit value.",
        "originalGapReason": "source_text_unavailable",
        "mapping": {
          "primarySavingsModelId": "refrigeration_electric_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ]
  }
]
