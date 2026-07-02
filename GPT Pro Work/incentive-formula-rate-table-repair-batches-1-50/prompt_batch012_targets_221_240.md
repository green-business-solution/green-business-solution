You are helping RetroFi repair incentive formulas, rate tables, grant estimates, tax credits, and non-cash workflow value rules.

Return strict JSON only. Do not include markdown, code fences, commentary, or citations outside JSON fields.

Batch: 12
Targets in this prompt: 221-240 of 984
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
  "batchNumber": 12,
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
  "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:4710"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5708",
    "opportunityName": "TVA - Residential Energy Efficiency Rebate Program",
    "state": "NC",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5708/tva-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://energyright.com/residential/rebates/",
    "applicationUrl": null,
    "administrator": "TVA EnergyRight",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 6,
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
          "air sealing"
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
          "mini split",
          "ductless"
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
          "NC"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "TVA-served local power company territories in North Carolina"
        ],
        "notes": "Not statewide North Carolina; only homes served by participating TVA local power companies qualify."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "homeowner",
        "tenant_with_required_permission"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "air_sealing_weatherization",
        "duct_sealing_and_insulation",
        "attic_insulation_upgrade",
        "wall_insulation_upgrade",
        "ground_source_geothermal_heat_pump",
        "heat_pump_hvac_retrofit",
        "ductless_mini_split_heat_pump",
        "central_air_conditioner_replacement",
        "hvac_tune_up",
        "smart_thermostat_rewards"
      ],
      "hardRequirements": [
        "Customer must be served by a participating TVA local power company in the listed state.",
        "All rebate-eligible upgrades must be completed by a member of TVA's Quality Contractor Network.",
        "Contractor submits the rebate to TVA EnergyRight, and customer claims the rebate using a redemption code.",
        "Equipment and envelope work must meet TVA standards effective on the installation date."
      ],
      "blockers": [
        "The state field is not statewide eligibility; only TVA-served local power company territories qualify.",
        "Do not match non-TVA utility customers.",
        "Financing and assessments are separate EnergyRight services and should not be treated as physical rebate categories.",
        "Do not infer water-heater, solar, EV charging or appliance rebates from these residential rebate pages unless separately verified."
      ],
      "programType": "Rebate Program",
      "administrator": "TVA EnergyRight",
      "applicationUrl": null,
      "websiteUrl": "https://energyright.com/residential/rebates/",
      "sourceUrlsChecked": [
        "https://energyright.com/residential/rebates/",
        "https://energyright.com/residential/rebates/geothermal-heat-pump/",
        "https://energyright.com/residential/rebates/heat-pump/",
        "https://energyright.com/residential/rebates/duct-sealing-hvac-tune-up/",
        "https://energyright.com/residential/rebates/home-insulation-air-sealing/",
        "https://programs.dsireusa.org/system/program/detail/5708/tva-residential-energy-efficiency-rebate-program"
      ],
      "evidenceText": "TVA EnergyRight current residential rebate pages list air sealing, insulation, duct sealing, HVAC tune-up, central AC, geothermal heat pump, mini-split and heat pump rebates through QCN contractors.",
      "reasoningNotes": "These five DSIRE state records share the same TVA EnergyRight residential rebate structure; geography differs by TVA-served territory in each state."
    },
    "existingSimpleRules": [
      {
        "id": "oir_4727ec4f7b36b0b6_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 30000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$300 for eligible duct sealing, duct insulation, repair, or replacement",
        "evidenceText": "TVA EnergyRight heat pump page lists duct sealing/repair, duct insulation, or replacement at $300.",
        "sourceUrlsChecked": [
          "https://energyright.com/residential/rebates/",
          "https://energyright.com/residential/rebates/heat-pump/"
        ],
        "reasoningNotes": "Matched duct sealing and insulation terms. Returned as a distinct measure rule.",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_a843ffe23896edbe_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 150000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$1,500 per eligible geothermal heat pump",
        "evidenceText": "TVA EnergyRight lists a $1,500 geothermal heat pump rebate.",
        "sourceUrlsChecked": [
          "https://energyright.com/residential/rebates/",
          "https://energyright.com/residential/rebates/geothermal-heat-pump/"
        ],
        "reasoningNotes": "Matched geothermal term. Use one unit as one qualifying geothermal heat pump.",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_ebc0fb9ae7070149_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 80000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$800 per 17+ SEER2 air-source or dual-fuel heat pump",
        "evidenceText": "TVA EnergyRight heat pump page lists 17+ SEER2 air-source or dual-fuel heat pumps at $800.",
        "sourceUrlsChecked": [
          "https://energyright.com/residential/rebates/",
          "https://energyright.com/residential/rebates/heat-pump/"
        ],
        "reasoningNotes": "Matched heat pump term. The higher published efficiency tier is returned.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3327",
    "opportunityName": "Nebraska Public Power District - Commercial Energy Efficiency Rebate Programs",
    "state": "NE",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3327/nebraska-public-power-district-commercial-energy-efficiency-rebate-programs",
    "websiteUrl": "https://nppd.energywisenebraska.com/business/",
    "applicationUrl": null,
    "administrator": "Nebraska Public Power District",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 6,
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
          "ground source heat pump",
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
        "retrofitTypeId": "led_lighting_retrofit",
        "displayName": "LED lighting retrofit",
        "parentCategory": "lighting",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
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
          "NE"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Nebraska Public Power District",
          "participating wholesale utilities"
        ],
        "notes": "EnergyWise incentives are available through NPPD and participating local utilities in Nebraska, subject to each program's rules."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "industrial_customer",
        "large_commercial_customer",
        "master_metered_multifamily_customer",
        "participating_local_utility_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "large_commercial",
        "multifamily"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "commercial_hvac_equipment",
        "air_source_heat_pump_hvac",
        "ground_source_geothermal_heat_pump",
        "water_source_heat_pump",
        "heat_pump_water_heater",
        "variable_frequency_drive_retrofit",
        "industrial_process_efficiency",
        "compressed_air_efficiency",
        "commercial_refrigeration_efficiency",
        "process_chiller_optimization",
        "custom_led_lighting_retrofit",
        "hvac_system_optimization"
      ],
      "hardRequirements": [
        "Lighting incentives generally apply to existing facilities and require qualifying listed products.",
        "Commercial HVAC equipment must meet listed equipment categories and AHRI or program documentation requirements.",
        "VFD incentives are limited to qualifying industrial or large commercial fan and pump applications and horsepower limits.",
        "Industrial process incentives require preapproval and must meet payback and invoice limits.",
        "Heat pump water heater incentives must meet the listed efficiency thresholds and be paid through the local utility where applicable."
      ],
      "blockers": [
        "Do not infer residential appliances or home weatherization from this commercial program.",
        "New construction does not qualify for prescriptive lighting and some VFD applications.",
        "VFD incentives do not cover existing VFD replacements, single-phase drives, or ineligible new-construction HVAC pumps and fans.",
        "Industrial process projects need preapproval and cannot be projects already covered by other programs.",
        "Heat pump water heater matching should follow the specific business-page terms and local utility delivery rules."
      ],
      "programType": "Rebate Program",
      "administrator": "Nebraska Public Power District",
      "applicationUrl": null,
      "websiteUrl": "https://nppd.energywisenebraska.com/business/",
      "sourceUrlsChecked": [
        "https://www.nppd.com/save-money",
        "https://nppd.energywisenebraska.com/business/",
        "https://docs.nppd.com/FileDownload.aspx?Filename=Board%2F2026%2FMay4.pdf",
        "https://programs.dsireusa.org/system/program/detail/3327/nebraska-public-power-district-commercial-energy-efficiency-rebate-programs"
      ],
      "evidenceText": "NPPD EnergyWise business pages list incentives for commercial lighting, HVAC, heat pumps, heat pump water heaters, VFDs, industrial process efficiency, refrigeration, compressed air, and HVAC optimization.",
      "reasoningNotes": "The existing matches are mostly supported, but each should retain commercial, industrial, and program-specific restrictions rather than residential assumptions."
    },
    "existingSimpleRules": [
      {
        "id": "oir_6adcfcd3c6cc2e58_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 3000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$30 per horsepower for eligible commercial variable frequency drives",
        "evidenceText": "EnergyWise Nebraska VFD materials list $30 per horsepower for eligible VFDs.",
        "sourceUrlsChecked": [
          "https://southernpd.com/variable-frequency-drive-incentive-program/",
          "http://www.nppd.com/save-energy/for-your-business/"
        ],
        "reasoningNotes": "Matched variable frequency drive term. Use unit_count as eligible controlled horsepower.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22080",
    "opportunityName": "Liberty Utilities (Gas) - Residential Energy Efficiency Programs",
    "state": "NH",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22080/liberty-utilities-gas-residential-energy-efficiency-programs",
    "websiteUrl": "https://new-hampshire.libertyutilities.com/allenstown/residential/smart-energy-use/natural-gas/index.html",
    "applicationUrl": null,
    "administrator": "Liberty Utilities New Hampshire",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 6,
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
          "air sealing"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_gas_water_heater",
        "displayName": "High-efficiency gas water heater",
        "parentCategory": "water_heating",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "gas water heater"
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
          "clothes washer"
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
          "Liberty Utilities New Hampshire natural gas"
        ],
        "notes": "Applies to Liberty Utilities New Hampshire residential natural gas customers, with some measures delivered through NHSaves."
      },
      "eligibleApplicantTypes": [
        "residential_gas_customer",
        "homeowner",
        "renter",
        "income_qualified_customer"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "air_sealing_weatherization",
        "insulation_upgrade",
        "high_efficiency_gas_boiler",
        "high_efficiency_gas_furnace",
        "high_efficiency_gas_water_heater",
        "tankless_gas_water_heater",
        "indirect_gas_water_heater",
        "boiler_reset_control",
        "programmable_thermostat",
        "smart_wifi_thermostat",
        "weatherization_financing"
      ],
      "hardRequirements": [
        "Applicant must be a Liberty Utilities New Hampshire residential natural gas customer for gas equipment rebates.",
        "Heating and water-heating equipment must meet listed NHSaves or Liberty program efficiency requirements.",
        "Weatherization incentives require participation through the home energy audit or Home Performance pathway.",
        "Funding is limited and offered first come, first served.",
        "Installations may require licensed contractors, program inspections, or application deadlines."
      ],
      "blockers": [
        "Do not match residential clothes washer rebates to this Liberty gas program without a current official Liberty gas source.",
        "Do not include electric heat pumps or electric heat pump water heaters unless covered by a separate electric utility program.",
        "Measures must reduce natural gas use or meet the relevant gas-program rules.",
        "Keene and other special gas-service cases may require fuel verification."
      ],
      "programType": "Rebate Program",
      "administrator": "Liberty Utilities New Hampshire",
      "applicationUrl": null,
      "websiteUrl": "https://new-hampshire.libertyutilities.com/allenstown/residential/smart-energy-use/natural-gas/index.html",
      "sourceUrlsChecked": [
        "https://new-hampshire.libertyutilities.com/allenstown/residential/smart-energy-use/natural-gas/index.html",
        "https://new-hampshire.libertyutilities.com/allenstown/residential/smart-energy-use/natural-gas/commercial-landing-gas-programs.html",
        "https://new-hampshire.libertyutilities.com/berlin/residential/smart-energy-use/natural-gas/rebates-heating-and-hot-water.html",
        "https://new-hampshire.libertyutilities.com/allenstown/residential/smart-energy-use/natural-gas/energy-audits-and-insulation.html",
        "https://nhsaves.com/residential/natural-gas-heating-equipment/",
        "https://nhsaves.com/residential/weatherization/",
        "https://programs.dsireusa.org/system/program/detail/22080/liberty-utilities-gas-residential-energy-efficiency-programs"
      ],
      "evidenceText": "Liberty and NHSaves current pages list residential gas heating, gas water-heating, thermostats, boiler controls, air sealing, insulation, audits, and weatherization financing for eligible gas customers.",
      "reasoningNotes": "The clothes washer match is not supported by current Liberty gas sources and should be blocked unless a separate current appliance program is verified."
    },
    "existingSimpleRules": [
      {
        "id": "oir_4764240ee6a6913c_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 8500,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "Up to $85 per eligible natural-gas smart thermostat",
        "evidenceText": "NHSaves/Liberty materials list natural gas thermostat rebates up to $85.",
        "sourceUrlsChecked": [
          "https://new-hampshire.libertyutilities.com/derry/residential/smart-energy-use/natural-gas/energy-efficiency-programs.html",
          "https://nhsaves.com/learn/rebates/"
        ],
        "reasoningNotes": "Matched thermostat term. Weatherization discounts were not modeled because they are delivered through program services.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3904",
    "opportunityName": "National Fuel (Gas) - Commercial Energy Efficiency Program",
    "state": "NY",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3904/national-fuel-gas-commercial-energy-efficiency-program",
    "websiteUrl": "https://fuelingtomorrowtoday.com/non-residential-customers/about-the-non-residential-program/",
    "applicationUrl": "https://fuelingtomorrowtoday.com/wp-content/uploads/2026/02/59865-National-Fuels_Non-Residential_Pre-Qualified_Application_2026_M.pdf",
    "administrator": "National Fuel Gas Distribution Corporation",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 6,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "duct_sealing_and_insulation",
        "displayName": "Duct sealing and duct insulation",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "duct insulation"
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
          "boiler",
          "condensing boiler"
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
          "NY"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "National Fuel New York natural gas"
        ],
        "notes": "Available in National Fuel's western New York natural gas service area for eligible non-residential customers."
      },
      "eligibleApplicantTypes": [
        "non_residential_gas_customer",
        "commercial_customer",
        "industrial_customer",
        "agricultural_customer",
        "government_customer",
        "institutional_customer",
        "nonprofit_customer",
        "multifamily_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "agricultural",
        "government",
        "institutional",
        "nonprofit",
        "multifamily"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_natural_gas_furnace",
        "natural_gas_unit_heater",
        "infrared_gas_heater",
        "condensing_hot_water_boiler",
        "steam_boiler_replacement",
        "demand_control_ventilation",
        "duct_insulation_for_gas_heating",
        "pipe_insulation_for_gas_heating",
        "commercial_smart_thermostat",
        "air_curtain",
        "air_leakage_sealing",
        "opaque_shell_insulation",
        "heat_recovery_ventilation",
        "steam_trap_replacement",
        "steam_trap_monitoring_system",
        "performance_based_custom_gas_efficiency"
      ],
      "hardRequirements": [
        "Applicant must be a National Fuel non-residential natural gas customer in the eligible New York service area.",
        "Measures must replace or improve qualifying natural gas equipment or reduce natural gas use under the pre-qualified or performance-based pathway.",
        "Contractor installation and required federal tax identification or certificate documentation may apply.",
        "Pre-qualified applications specify submission within 90 days of installation.",
        "Program caps, measure limits, and conditional funding rules apply."
      ],
      "blockers": [
        "Do not list NYSERDA as the administrator; the program is administered for National Fuel, with NYSERDA-related support only as applicable.",
        "New construction should not be matched under the 2026 applications that state new construction is not eligible.",
        "Do not match broad residential insulation or weatherization; envelope measures are non-residential gas-saving measures under program rules.",
        "Broad HVAC replacement must be limited to qualifying gas furnaces, boilers, unit heaters, infrared heaters, and gas-saving controls.",
        "Duct insulation must serve heating systems using gas combustion equipment."
      ],
      "programType": "Rebate Program",
      "administrator": "National Fuel Gas Distribution Corporation",
      "applicationUrl": "https://fuelingtomorrowtoday.com/wp-content/uploads/2026/02/59865-National-Fuels_Non-Residential_Pre-Qualified_Application_2026_M.pdf",
      "websiteUrl": "https://fuelingtomorrowtoday.com/non-residential-customers/about-the-non-residential-program/",
      "sourceUrlsChecked": [
        "https://fuelingtomorrowtoday.com/non-residential-customers/about-the-non-residential-program/",
        "https://fuelingtomorrowtoday.com/wp-content/uploads/2026/02/59865-National-Fuels_Non-Residential_Pre-Qualified_Application_2026_M.pdf",
        "https://fuelingtomorrowtoday.com/wp-content/uploads/2026/04/National-Fuels_Non-Residential_PerformanceBased_Application_2026_M2.pdf",
        "https://programs.dsireusa.org/system/program/detail/3904/national-fuel-gas-commercial-energy-efficiency-program"
      ],
      "evidenceText": "National Fuel's current non-residential materials list gas furnaces, boilers, unit heaters, thermostats, duct and pipe insulation, air curtains, ventilation, steam traps, and performance-based gas-saving projects.",
      "reasoningNotes": "The supported categories are non-residential natural-gas measures. Duct and envelope insulation are eligible only within the program's gas-saving context."
    },
    "existingSimpleRules": [
      {
        "id": "oir_67b65ef5304b750d_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 20000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "equipment_plus_labor",
          "applicationOrder": 10
        },
        "cap": {
          "maxPercentOfBasis": 1
        },
        "confidence": "high",
        "formula": "$200 per connected or ENERGY STAR rated smart thermostat",
        "evidenceText": "2026 application lists Connected Thermostat or ENERGY STAR rated Smart Thermostat at $200.",
        "sourceUrlsChecked": [
          "https://www.nationalfuel.com/utility/energy-efficiency-rebate-program/get-your-rebates-ny-business/",
          "https://www.nationalfuel.com/utility/energy-efficiency-rebate-program/get-your-rebates-ny-business/pre-qualified-application/"
        ],
        "reasoningNotes": "Matched smart thermostat term. Source terms say rebate cannot exceed procurement and installation cost.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3668",
    "opportunityName": "CenterPoint Energy (Gas) - Residential Energy Efficiency Rebates",
    "state": "OH",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3668/centerpoint-energy-gas-residential-energy-efficiency-rebates",
    "websiteUrl": "https://midwest.centerpointenergy.com/savings/oh-home",
    "applicationUrl": null,
    "administrator": "CenterPoint Energy",
    "programType": "Residential Natural Gas Efficiency Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 6,
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
          "air sealing"
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
          "programmable thermostat",
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
          "OH"
        ],
        "counties": [
          "Auglaize",
          "Champaign",
          "Clark",
          "Clinton",
          "Darke",
          "Fayette",
          "Greene",
          "Highland",
          "Logan",
          "Madison",
          "Miami",
          "Montgomery",
          "Pickaway",
          "Preble",
          "Shelby",
          "Warren"
        ],
        "cities": [
          "Dayton"
        ],
        "utilityTerritories": [
          "CenterPoint Energy Ohio natural gas service territory"
        ],
        "notes": "Limited to eligible CenterPoint Energy Ohio residential natural gas customers."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "natural_gas_customer",
        "income_qualified_customer"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_gas_furnace_retrofit",
        "high_efficiency_gas_boiler_retrofit",
        "air_sealing_weatherization",
        "insulation_upgrade",
        "smart_or_wifi_thermostat",
        "high_efficiency_gas_water_heater"
      ],
      "hardRequirements": [
        "Applicant must be a CenterPoint Energy Ohio residential natural gas customer.",
        "Heating equipment must meet listed AFUE and input capacity requirements.",
        "Weatherization must use program-approved contractors and is for existing homes.",
        "Air sealing may be required before insulation rebates.",
        "Thermostat and equipment applications are subject to timing, documentation, and quantity limits."
      ],
      "blockers": [
        "Electric heat pumps are not eligible under this natural gas rebate program.",
        "Weatherization rebates exclude new construction and certain dual-fuel gas furnace plus electric heat pump conditions.",
        "Commercial equipment should not be matched to this residential gas program.",
        "Do not infer broad HVAC replacement beyond listed high-efficiency natural gas furnace, boiler, and water heating equipment."
      ],
      "programType": "Residential Natural Gas Efficiency Rebate Program",
      "administrator": "CenterPoint Energy",
      "applicationUrl": null,
      "websiteUrl": "https://midwest.centerpointenergy.com/savings/oh-home",
      "sourceUrlsChecked": [
        "https://midwest.centerpointenergy.com/savings/oh-home",
        "https://www.centerpointenergy.com/en-us/Documents/Midwest/CNP_Customer_Booklet_Res-Comm_O_NG_digital.pdf",
        "https://www.occ.ohio.gov/factsheet/centerpoint-energys-energy-efficiency-programs"
      ],
      "evidenceText": "CenterPoint Ohio materials identify residential natural gas furnace, boiler, water heater, thermostat, air sealing, and insulation rebates for eligible gas customers.",
      "reasoningNotes": "The official current landing page is difficult to read, but official CenterPoint and Ohio consumer materials support the gas efficiency categories. Confidence is medium because some detailed materials were program-year dated."
    },
    "existingSimpleRules": [
      {
        "id": "oir_632e737ee7653aa5_v1",
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
        "confidence": "medium",
        "formula": "Up to $500 per eligible gas boiler",
        "evidenceText": "Ohio Consumers' Counsel summary states maximum gas boiler rebate is $500 for equipment purchased after Jan. 1, 2024.",
        "sourceUrlsChecked": [
          "https://midwest.centerpointenergy.com/savings/oh-home",
          "https://www.occ.ohio.gov/factsheet/centerpoint-energys-energy-efficiency-programs"
        ],
        "reasoningNotes": "Returned separately because boiler has a distinct maximum rebate.",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_d4e848b20ad06457_v1",
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
        "confidence": "medium",
        "formula": "Up to $400 per eligible gas furnace",
        "evidenceText": "Ohio Consumers' Counsel summary states maximum gas furnace rebate is $400 for equipment purchased after Jan. 1, 2024.",
        "sourceUrlsChecked": [
          "https://midwest.centerpointenergy.com/savings/oh-home",
          "https://www.occ.ohio.gov/factsheet/centerpoint-energys-energy-efficiency-programs"
        ],
        "reasoningNotes": "Matched furnace term. Confidence is medium because exact tier depends on AFUE and current utility program details.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1510",
    "opportunityName": "The Energy Cooperative - Residential Energy Efficiency Rebate Program",
    "state": "OH",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1510/the-energy-cooperative-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://myenergycoop.com/rebate-programs",
    "applicationUrl": null,
    "administrator": "The Energy Cooperative",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 6,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "ev_charger_installation",
        "displayName": "EV charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "ev charger"
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
          "air conditioning"
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
          "OH"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "The Energy Cooperative electric service territory"
        ],
        "notes": "At this time, rebates are offered only to The Energy Cooperative electric members."
      },
      "eligibleApplicantTypes": [
        "electric_member",
        "residential_member",
        "non_residential_member_for_ev_or_lighting"
      ],
      "eligibleSectors": [
        "residential",
        "commercial"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation",
        "ground_source_geothermal_heat_pump",
        "heat_pump_hvac_retrofit",
        "ductless_mini_split_heat_pump",
        "high_efficiency_air_conditioner",
        "residential_refrigerator_freezer",
        "air_conditioner_load_control_switch",
        "commercial_led_lighting_retrofit"
      ],
      "hardRequirements": [
        "Rebates are offered only to electric members.",
        "Electric members are eligible for a maximum of two total rebates per calendar year.",
        "Heat pump and geothermal rebates require supporting documentation and inspection.",
        "EV charger must be Level 2; residential homes are capped at two charger ports and nonresidential buildings at six charger ports.",
        "ENERGY STAR appliance rebates require proof of purchase, ENERGY STAR listing and old-unit removal for refrigerator or freezer rebates."
      ],
      "blockers": [
        "high_efficiency_refrigeration_equipment must be narrowed to residential ENERGY STAR refrigerator or stand-alone freezer with recycling of old unit.",
        "Do not match generic EV charging; source requires Level 2 chargers.",
        "Custom commercial lighting is a separate nonresidential section and should not be applied to residential members.",
        "Gas or propane-only members are directed to their electric provider and are not eligible for these rebates."
      ],
      "programType": "Rebate Program",
      "administrator": "The Energy Cooperative",
      "applicationUrl": null,
      "websiteUrl": "https://myenergycoop.com/rebate-programs",
      "sourceUrlsChecked": [
        "https://myenergycoop.com/rebate-programs",
        "https://programs.dsireusa.org/system/program/detail/1510/the-energy-cooperative-residential-energy-efficiency-rebate-program"
      ],
      "evidenceText": "The Energy Cooperative current rebate page lists electric-member rebates for heat pumps, geothermal, ENERGY STAR refrigerator or freezer, central AC, load-control switches, Level 2 EV chargers and commercial lighting.",
      "reasoningNotes": "Residential categories were narrowed to appliances, HVAC and Level 2 EV charging; commercial lighting remains separate for nonresidential member facilities."
    },
    "existingSimpleRules": [
      {
        "id": "oir_79209fcde9464cf3_v1",
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
          "maxAmountCents": 50000
        },
        "confidence": "high",
        "formula": "$250 per Level 2 electric vehicle charger, capped at $500 per residence",
        "evidenceText": "The Energy Cooperative rebate page lists New Electric Vehicle Charger at $250 per charger and $500 max per residence.",
        "sourceUrlsChecked": [
          "https://myenergycoop.com/rebate-programs/"
        ],
        "reasoningNotes": "Matched EV charger and Level 2 terms. Use one unit as one eligible charger.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4525",
    "opportunityName": "Oklahoma Municipal Power Authority - WISE Energy Efficiency Rebate Program",
    "state": "OK",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4525/oklahoma-municipal-power-authority-wise-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.ompa.com/services/rebate-programs/",
    "applicationUrl": null,
    "administrator": "Oklahoma Municipal Power Authority",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 6,
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
          "OK"
        ],
        "counties": [],
        "cities": [
          "Altus",
          "Blackwell",
          "Comanche",
          "Copan",
          "Cordell",
          "Duncan",
          "Edmond",
          "Eldorado",
          "Fairview",
          "Fort Supply",
          "Frederick",
          "Geary",
          "Goltry",
          "Granite",
          "Hominy",
          "Kingfisher",
          "Laverne",
          "Lexington",
          "Mangum",
          "Manitou",
          "Marlow",
          "Mooreland",
          "Newkirk",
          "Okeene",
          "Olustee",
          "Orlando",
          "Pawhuska",
          "Perry",
          "Ponca City",
          "Pond Creek",
          "Prague",
          "Purcell",
          "Ryan",
          "Spiro",
          "Tecumseh",
          "Tonkawa",
          "Walters",
          "Watonga",
          "Waynoka",
          "Wetumka",
          "Wynnewood",
          "Yale"
        ],
        "utilityTerritories": [
          "participating OMPA member municipal utilities"
        ],
        "notes": "Rebates are only for electric customers of participating OMPA member cities. Participation differs by heat pump, ceiling insulation, water heater, smart thermostat, and related WISE offerings."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customer",
        "municipal_utility_customer",
        "subdivision_homebuilder",
        "commercial_customer",
        "industrial_customer"
      ],
      "eligibleSectors": [
        "residential",
        "commercial",
        "industrial",
        "new_construction"
      ],
      "eligibleRetrofitCategories": [
        "ground_source_geothermal_heat_pump",
        "air_source_heat_pump_hvac",
        "dual_fuel_heat_pump",
        "heat_pump_hvac_retrofit",
        "ceiling_insulation_attic_upgrade",
        "electric_resistance_water_heater",
        "heat_pump_water_heater",
        "gas_to_electric_water_heater_conversion",
        "smart_thermostat",
        "demand_response_smart_thermostat_enrollment"
      ],
      "hardRequirements": [
        "Applicant must be an electric customer of a participating OMPA member city.",
        "Heat pump projects require a home energy audit before work is completed where specified.",
        "Commercial and industrial WISE heat-pump eligibility is limited to HVAC units below the listed capacity threshold; larger projects use the separate DEEP pathway.",
        "Ceiling insulation requires pre-installation audit, qualifying attic or roof area, and final insulation level requirements.",
        "Water heater rebates require eligible electric or heat pump water heaters and inspections or documentation within program deadlines.",
        "Smart thermostats must meet ENERGY STAR, Wi-Fi, control, usage, and functional requirements."
      ],
      "blockers": [
        "Air sealing is not verified as a WISE rebate measure and should not be matched under this opportunity.",
        "Do not match broad weatherization; ceiling insulation is the supported envelope category.",
        "Water heater rebates exclude tankless and gas water heaters.",
        "Ceiling insulation generally excludes builders, new homes, garages, apartments, and mobile homes under the published guidelines.",
        "Commercial or industrial heat pumps over the WISE capacity limit belong to OMPA DEEP, a separate program.",
        "Customer city participation must be checked for the specific rebate type."
      ],
      "programType": "Rebate Program",
      "administrator": "Oklahoma Municipal Power Authority",
      "applicationUrl": null,
      "websiteUrl": "https://www.ompa.com/services/rebate-programs/",
      "sourceUrlsChecked": [
        "https://www.ompa.com/services/rebate-programs/",
        "https://www.ompa.com/wp-content/uploads/2025/03/WISE-Participation-By-City.pdf",
        "https://www.ompa.com/wp-content/uploads/2026/01/WISE-Heat-Pump-Rebate-Program-Trifold-Brochure-2025-WEB.pdf",
        "https://www.ompa.com/wp-content/uploads/2025/12/Ceiling-Insulation-Rebate-Program-Guidlines-2025.pdf",
        "https://www.ompa.com/wp-content/uploads/2025/12/WISE-Water-Heater-Rebate-Summary-2025.pdf",
        "https://www.ompa.com/wp-content/uploads/2025/12/Smart-Thermostat-Rebate-Summary-updated.pdf",
        "https://programs.dsireusa.org/system/program/detail/4525/oklahoma-municipal-power-authority-wise-energy-efficiency-rebate-program"
      ],
      "evidenceText": "OMPA WISE materials list rebates for participating member-city customers for heat pumps, ceiling insulation, electric and heat pump water heaters, smart thermostats, and related demand-response enrollment.",
      "reasoningNotes": "The heat pump, insulation, water-heater, and thermostat matches are supported. Air sealing is a false positive, and larger commercial or industrial projects may fall under separate DEEP rules."
    },
    "existingSimpleRules": [
      {
        "id": "oir_2a514c2efda0878e_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 5000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "$50 per eligible unit",
        "evidenceText": "Turn Down the Watts Smart Thermostat rebates The Turn Down the Watts Smart Thermostat rebate program offers up to $50",
        "sourceUrlsChecked": [
          "https://www.ompa.com/services/rebate-programs/"
        ],
        "reasoningNotes": "",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2925",
    "opportunityName": "Austin Energy - Commercial New Construction Efficiency Rebates",
    "state": "TX",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2925/austin-energy-commercial-new-construction-efficiency-rebates",
    "websiteUrl": "https://austinenergy.com/energy-efficiency/rebates-incentives/commercial/new-construction-rebates",
    "applicationUrl": "https://rebates.austinenergy.com/",
    "administrator": "Austin Energy",
    "programType": "Commercial New Construction Efficiency Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 6,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "battery_storage_system",
        "displayName": "Battery storage system",
        "parentCategory": "energy_storage_resilience",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "energy storage"
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
        "retrofitTypeId": "led_lighting_retrofit",
        "displayName": "LED lighting retrofit",
        "parentCategory": "lighting",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "led lighting"
        ]
      },
      {
        "retrofitTypeId": "thermal_energy_storage",
        "displayName": "Thermal energy storage",
        "parentCategory": "energy_storage_resilience",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "thermal energy storage"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "TX"
        ],
        "counties": [],
        "cities": [
          "Austin"
        ],
        "utilityTerritories": [
          "Austin Energy commercial electric service territory"
        ],
        "notes": "Limited to Austin Energy commercial electric customers and qualifying new construction, additions, build-outs, finish-outs, and major remodels."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "business_owner",
        "nonprofit",
        "house_of_worship",
        "contractor",
        "design_professional",
        "authorized_agent"
      ],
      "eligibleSectors": [
        "commercial",
        "nonprofit",
        "institutional"
      ],
      "eligibleRetrofitCategories": [
        "new_construction_lighting",
        "high_efficiency_commercial_hvac",
        "thermal_energy_storage",
        "variable_frequency_drive_retrofit",
        "heat_pump_water_heater",
        "custom_energy_efficiency_technology",
        "guest_room_occupancy_controls"
      ],
      "hardRequirements": [
        "Project must be served by Austin Energy commercial electric service.",
        "Application must be submitted before installation or before certificate of occupancy when required.",
        "Measures must exceed code and produce qualifying peak demand or energy savings.",
        "Code-required equipment and building envelope measures are not eligible.",
        "Equipment must meet Austin Energy new construction rebate requirements and documentation rules."
      ],
      "blockers": [
        "Battery storage is not supported by this new construction efficiency rebate.",
        "Do not treat this as a general existing-building retrofit unless the project is an eligible major remodel or build-out.",
        "Broad energy management systems should not be matched unless the measure is a supported guest room control, custom technology, or similar eligible efficiency measure.",
        "Solar, EV charging, demand response, and storage programs are separate from this record."
      ],
      "programType": "Commercial New Construction Efficiency Rebate Program",
      "administrator": "Austin Energy",
      "applicationUrl": "https://rebates.austinenergy.com/",
      "websiteUrl": "https://austinenergy.com/energy-efficiency/rebates-incentives/commercial/new-construction-rebates",
      "sourceUrlsChecked": [
        "https://austinenergy.com/energy-efficiency/rebates-incentives/commercial",
        "https://austinenergy.com/energy-efficiency/rebates-incentives/commercial/new-construction-rebates",
        "https://rebates.austinenergy.com/"
      ],
      "evidenceText": "Austin Energy lists commercial new construction rebates for lighting, HVAC equipment, thermal energy storage, variable frequency drives, heat pump water heaters, guest room controls, and custom technologies.",
      "reasoningNotes": "This is a new construction and major remodel program, not a generic retrofit program. Battery storage is a false positive; thermal storage is supported."
    },
    "existingSimpleRules": [
      {
        "id": "oir_d5e7494721e86e27_v1",
        "incentiveType": "thermal_storage_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "rate_per_kw",
          "amountCentsPerKw": 35000,
          "kwSource": "demand_reduction_kw"
        },
        "basisPolicy": {
          "basis": "eligible_cost_categories",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$350 per kW shifted for eligible thermal energy storage projects",
        "evidenceText": "Austin Energy says Thermal Energy Storage rebates are paid at $350 per kW shifted.",
        "sourceUrlsChecked": [
          "https://austinenergy.com/energy-efficiency/rebates-incentives/commercial/cooling-heating/thermal-storage",
          "https://austinenergy.com/energy-efficiency/rebates-incentives/commercial/new-construction-rebates"
        ],
        "reasoningNotes": "Matched thermal energy storage terms. Use demand_reduction_kw as the approved kW shifted by the TES project.",
        "mapping": {
          "primarySavingsModelId": "battery_tou_demand_savings",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3322",
    "opportunityName": "Guadalupe Valley Electric Cooperative - Residential Energy Efficiency Rebate Programs",
    "state": "TX",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3322/guadalupe-valley-electric-cooperative-residential-energy-efficiency-rebate-programs",
    "websiteUrl": "https://www.gvec.org/electric/rebates/",
    "applicationUrl": null,
    "administrator": "Guadalupe Valley Electric Cooperative",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 6,
    "targetKind": "existing_simple_rule_v2_repair",
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
        "retrofitTypeId": "ev_charger_installation",
        "displayName": "EV charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "ev charging",
          "charging station"
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
          "TX"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Guadalupe Valley Electric Cooperative service territory"
        ],
        "notes": "Primarily residential GVEC electric members; some EV charging language also covers qualifying commercial installations."
      },
      "eligibleApplicantTypes": [
        "residential_member",
        "electric_cooperative_member",
        "commercial_member_for_ev_charger"
      ],
      "eligibleSectors": [
        "residential",
        "commercial"
      ],
      "eligibleRetrofitCategories": [
        "battery_storage_system",
        "level_2_ev_charger_installation",
        "heat_pump_hvac_retrofit",
        "high_efficiency_hvac_replacement",
        "smart_thermostat"
      ],
      "hardRequirements": [
        "EV charger must be Level 2 and installed for a GVEC member account.",
        "EV charging station must meet brand, listing, code and licensed-electrician requirements when applicable.",
        "Battery systems must be eligible systems and enroll in GVEC Peak-Time Payback to receive battery rewards.",
        "Thermostat incentives are tied to eligible thermostats and Peak-Time Payback participation."
      ],
      "blockers": [
        "Do not match Level 1 charging or unsupported EV charger brands.",
        "Do not treat the battery rebate as a general solar or generator incentive.",
        "Government-funded improvements are not eligible under the EV rebate requirements checked."
      ],
      "programType": "Rebate Program",
      "administrator": "Guadalupe Valley Electric Cooperative",
      "applicationUrl": null,
      "websiteUrl": "https://www.gvec.org/electric/rebates/",
      "sourceUrlsChecked": [
        "https://www.gvec.org/electric/rebates/",
        "https://www.gvec.org/electric/hvac_rebate/",
        "https://www.gvec.org/ev-rebate/",
        "https://www.gvec.org/peak-time-payback/",
        "https://programs.dsireusa.org/system/program/detail/3322/guadalupe-valley-electric-cooperative-residential-energy-efficiency-rebate-programs"
      ],
      "evidenceText": "GVEC official rebate materials list heat pump AC or heating systems, Level 2 EV charging stations, smart thermostats and eligible battery storage with Peak-Time Payback.",
      "reasoningNotes": "EV charging is retained only as Level 2. Battery storage is supported because GVEC has an explicit battery Peak-Time Payback incentive."
    },
    "existingSimpleRules": [
      {
        "id": "oir_3b359ba567cdabd2_v1",
        "incentiveType": "percent_of_basis_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "percent_of_basis",
          "percent": 0.5
        },
        "basisPolicy": {
          "basis": "equipment_plus_labor",
          "applicationOrder": 10
        },
        "cap": {
          "maxAmountCents": 300000
        },
        "confidence": "high",
        "formula": "50% of commercial Level 2 EV charging station installation cost, capped at $3,000",
        "evidenceText": "GVEC EV rebate page lists commercial installations at the lesser of $3,000 or 50% of total installation costs.",
        "sourceUrlsChecked": [
          "https://www.gvec.org/ev-rebate/",
          "https://www.gvec.org/electric/rebates/"
        ],
        "reasoningNotes": "Returned separately because commercial Level 2 charger installations have a higher cap.",
        "mapping": {
          "primarySavingsModelId": "ev_charging_site_load",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_c37579909994c08e_v1",
        "incentiveType": "percent_of_basis_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "percent_of_basis",
          "percent": 0.5
        },
        "basisPolicy": {
          "basis": "equipment_plus_labor",
          "applicationOrder": 10
        },
        "cap": {
          "maxAmountCents": 60000
        },
        "confidence": "high",
        "formula": "50% of residential Level 2 EV charging station installation cost, capped at $600",
        "evidenceText": "GVEC EV rebate page lists residential installations at the lesser of $600 or 50% of total installation costs.",
        "sourceUrlsChecked": [
          "https://www.gvec.org/ev-rebate/",
          "https://www.gvec.org/electric/rebates/"
        ],
        "reasoningNotes": "Matched residential Level 2 charging terms.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2690",
    "opportunityName": "Dominion Energy - Home Builder Gas Appliance Rebate Program",
    "state": "UT",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2690/dominion-energy-home-builder-gas-appliance-rebate-program",
    "websiteUrl": "https://www.enbridgegas.com/utwyid/save-money/thermwise/appliance-rebates",
    "applicationUrl": "https://www.enbridgegas.com/-/media/Extranet-Pages/utidwy/save-money/thermwise/builder-rebates/UTBuilderApp-SF.pdf?hash=8CB0CAFD6E9FAB2E306706BB084A3123&rev=0701dd92b34149d4bd79677db4dfc70e",
    "administrator": "Enbridge Gas ThermWise",
    "programType": "Residential New Construction Builder Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 6,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "energy_recovery_ventilation_retrofit",
        "displayName": "Energy recovery ventilation retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "energy recovery ventilation"
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
          "UT"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Enbridge Gas Utah natural gas service territory"
        ],
        "notes": "Legacy Dominion Energy ThermWise builder rebates now appear under Enbridge Gas; this repair is limited to the Utah builder rebate record."
      },
      "eligibleApplicantTypes": [
        "home_builder",
        "owner_builder"
      ],
      "eligibleSectors": [
        "residential_new_construction"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_gas_furnace_new_construction",
        "high_efficiency_gas_boiler_new_construction",
        "dual_fuel_heat_pump_new_construction",
        "energy_recovery_ventilation_new_construction",
        "continuous_exterior_rigid_insulation_new_construction",
        "high_efficiency_windows_new_construction",
        "smart_thermostat_new_construction",
        "high_efficiency_gas_water_heater_new_construction"
      ],
      "hardRequirements": [
        "Rebates are paid only to builders or owner-builders of qualifying new residential dwellings.",
        "Dwelling must receive qualifying Enbridge Gas service on the applicable Utah service schedule.",
        "Application and documentation must be submitted within six months of gas service turn-on.",
        "Measures must be purchased and installed in the eligible program year and meet ThermWise efficiency requirements.",
        "Same equipment cannot receive another ThermWise rebate."
      ],
      "blockers": [
        "This is a builder new-construction rebate, not an existing-home retrofit rebate.",
        "Standard homeowner retrofit applicants should not be matched unless they are owner-builders under the builder program.",
        "Insulation match should be limited to the listed new-construction wall or continuous exterior rigid insulation measures.",
        "Do not generalize the window measure into existing-home window replacement.",
        "Non-gas or non-Enbridge service homes are ineligible."
      ],
      "programType": "Residential New Construction Builder Rebate Program",
      "administrator": "Enbridge Gas ThermWise",
      "applicationUrl": "https://www.enbridgegas.com/-/media/Extranet-Pages/utidwy/save-money/thermwise/builder-rebates/UTBuilderApp-SF.pdf?hash=8CB0CAFD6E9FAB2E306706BB084A3123&rev=0701dd92b34149d4bd79677db4dfc70e",
      "websiteUrl": "https://www.enbridgegas.com/utwyid/save-money/thermwise/appliance-rebates",
      "sourceUrlsChecked": [
        "https://www.enbridgegas.com/utwyid/save-money/thermwise/appliance-rebates",
        "https://www.enbridgegas.com/-/media/Extranet-Pages/utidwy/save-money/thermwise/builder-rebates/UTBuilderApp-SF.pdf?hash=8CB0CAFD6E9FAB2E306706BB084A3123&rev=0701dd92b34149d4bd79677db4dfc70e",
        "https://pscdocs.utah.gov/gas/25docs/2505722/342527EGUExhbt1.9LgsltvTrfRvsns10-31-2025.pdf"
      ],
      "evidenceText": "ThermWise builder materials list new single-family rebates for gas furnaces, boilers, dual-fuel systems, ERV, insulation, windows, smart thermostats, and gas water heating.",
      "reasoningNotes": "The original categories are partly supported but must be constrained to new construction builder rebates. This should not match ordinary existing-home retrofit projects."
    },
    "existingSimpleRules": [
      {
        "id": "oir_684f0bb621f6d0e8_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 30000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$300 per energy recovery ventilation system",
        "evidenceText": "ThermWise builder rebate materials list energy recovery ventilation at $300.",
        "sourceUrlsChecked": [
          "https://www.enbridgegas.com/utwyid/save-money/thermwise/builder-rebates",
          "https://www.enbridgegas.com/-/media/Extranet-Pages/utidwy/save-money/thermwise/builder-rebates/UTBuilderApp-SF.pdf"
        ],
        "reasoningNotes": "Matched energy recovery ventilation term. Returned separately from thermostat candidate.",
        "mapping": {
          "primarySavingsModelId": "controls_building_automation",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_9c4927d629fd1c4b_v1",
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
        "formula": "$75 per Tier 2 smart thermostat",
        "evidenceText": "ThermWise builder rebate materials list Tier 2 smart thermostats at $75.",
        "sourceUrlsChecked": [
          "https://www.enbridgegas.com/utwyid/save-money/thermwise/builder-rebates",
          "https://www.enbridgegas.com/-/media/Extranet-Pages/utidwy/save-money/thermwise/builder-rebates/UTBuilderApp-SF.pdf"
        ],
        "reasoningNotes": "Matched smart thermostat term. Tier 2 is the higher-feature connected thermostat candidate.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5709",
    "opportunityName": "TVA - Residential Energy Efficiency Rebate Program",
    "state": "VA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5709/tva-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://energyright.com/residential/rebates/",
    "applicationUrl": null,
    "administrator": "TVA EnergyRight",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 6,
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
          "air sealing"
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
          "mini split",
          "ductless"
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
          "VA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "TVA-served local power company territories in Virginia"
        ],
        "notes": "Not statewide Virginia; only homes served by participating TVA local power companies qualify."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "homeowner",
        "tenant_with_required_permission"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "air_sealing_weatherization",
        "duct_sealing_and_insulation",
        "attic_insulation_upgrade",
        "wall_insulation_upgrade",
        "ground_source_geothermal_heat_pump",
        "heat_pump_hvac_retrofit",
        "ductless_mini_split_heat_pump",
        "central_air_conditioner_replacement",
        "hvac_tune_up",
        "smart_thermostat_rewards"
      ],
      "hardRequirements": [
        "Customer must be served by a participating TVA local power company in the listed state.",
        "All rebate-eligible upgrades must be completed by a member of TVA's Quality Contractor Network.",
        "Contractor submits the rebate to TVA EnergyRight, and customer claims the rebate using a redemption code.",
        "Equipment and envelope work must meet TVA standards effective on the installation date."
      ],
      "blockers": [
        "The state field is not statewide eligibility; only TVA-served local power company territories qualify.",
        "Do not match non-TVA utility customers.",
        "Financing and assessments are separate EnergyRight services and should not be treated as physical rebate categories.",
        "Do not infer water-heater, solar, EV charging or appliance rebates from these residential rebate pages unless separately verified."
      ],
      "programType": "Rebate Program",
      "administrator": "TVA EnergyRight",
      "applicationUrl": null,
      "websiteUrl": "https://energyright.com/residential/rebates/",
      "sourceUrlsChecked": [
        "https://energyright.com/residential/rebates/",
        "https://energyright.com/residential/rebates/geothermal-heat-pump/",
        "https://energyright.com/residential/rebates/heat-pump/",
        "https://energyright.com/residential/rebates/duct-sealing-hvac-tune-up/",
        "https://energyright.com/residential/rebates/home-insulation-air-sealing/",
        "https://programs.dsireusa.org/system/program/detail/5709/tva-residential-energy-efficiency-rebate-program"
      ],
      "evidenceText": "TVA EnergyRight current residential rebate pages list air sealing, insulation, duct sealing, HVAC tune-up, central AC, geothermal heat pump, mini-split and heat pump rebates through QCN contractors.",
      "reasoningNotes": "These five DSIRE state records share the same TVA EnergyRight residential rebate structure; geography differs by TVA-served territory in each state."
    },
    "existingSimpleRules": [
      {
        "id": "oir_14cd56ec535e0d6f_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 30000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$300 for eligible duct sealing, repair, insulation, or replacement",
        "evidenceText": "TVA EnergyRight heat pump page lists duct sealing/repair, duct insulation, or replacement at $300.",
        "sourceUrlsChecked": [
          "https://energyright.com/residential/rebates/heat-pump/"
        ],
        "reasoningNotes": "Matched duct sealing and insulation terms. Distinct eligible measure.",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_71dab9924c70ba45_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 150000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$1,500 per eligible geothermal heat pump",
        "evidenceText": "TVA EnergyRight lists a $1,500 geothermal heat pump rebate.",
        "sourceUrlsChecked": [
          "https://energyright.com/residential/rebates/geothermal-heat-pump/"
        ],
        "reasoningNotes": "Matched geothermal term. Use one unit as one qualifying geothermal heat pump system.",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_87e6d05b883b8675_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 80000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$800 per 17+ SEER2 air-source or dual-fuel heat pump",
        "evidenceText": "TVA EnergyRight heat pump page lists 17+ SEER2 air source or dual-fuel heat pumps at $800.",
        "sourceUrlsChecked": [
          "https://energyright.com/residential/rebates/heat-pump/"
        ],
        "reasoningNotes": "Matched heat pump term. The higher published efficiency tier is returned as a candidate.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3179",
    "opportunityName": "Chelan County PUD - Residential Weatherization Rebate Program",
    "state": "WA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3179/chelan-county-pud-residential-weatherization-rebate-program",
    "websiteUrl": "https://www.chelanpud.org/conservationhome/residential",
    "applicationUrl": "https://www.chelanpud.org/conservationhome/residential/rebate-application",
    "administrator": "Chelan County Public Utility District",
    "programType": "Residential Weatherization And Efficiency Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 6,
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
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "WA"
        ],
        "counties": [
          "Chelan"
        ],
        "cities": [],
        "utilityTerritories": [
          "Chelan County PUD electric service territory"
        ],
        "notes": "Limited to Chelan PUD residential customers with qualifying electrically heated homes in Chelan County."
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
        "ductless_mini_split_heat_pump",
        "duct_sealing",
        "insulation_upgrade",
        "window_replacement",
        "storm_window_retrofit",
        "exterior_entry_door_replacement",
        "smart_or_line_voltage_thermostat",
        "heat_pump_water_heater"
      ],
      "hardRequirements": [
        "Applicant must be a Chelan PUD electric customer with a home in Chelan County.",
        "Many measures require the home to have prior permanent electric heat.",
        "Heat pump, insulation, duct sealing, window, and door rebates have current program-year dates and measure specifications.",
        "Duct sealing requires eligible existing ducts and a licensed contractor.",
        "Applications require required documentation and must meet submission deadlines."
      ],
      "blockers": [
        "Standalone air sealing is not listed as a separate current rebate category.",
        "Gas-heated homes generally do not qualify for the electric-heated-home weatherization rebates.",
        "Commercial buildings are not eligible under this residential program.",
        "Do not match broad zoning systems beyond listed smart or line-voltage thermostat rebates.",
        "New construction is excluded for several listed weatherization measures."
      ],
      "programType": "Residential Weatherization And Efficiency Rebate Program",
      "administrator": "Chelan County Public Utility District",
      "applicationUrl": "https://www.chelanpud.org/conservationhome/residential/rebate-application",
      "websiteUrl": "https://www.chelanpud.org/conservationhome/residential",
      "sourceUrlsChecked": [
        "https://www.chelanpud.org/conservationhome/residential",
        "https://www.chelanpud.org/conservationhome/residential/heat-pump-rebates",
        "https://www.chelanpud.org/conservationhome/residential/insulation-rebates",
        "https://www.chelanpud.org/conservationhome/residential/site-built-home-duct-sealing",
        "https://www.chelanpud.org/conservationhome/residential/window-rebates",
        "https://www.chelanpud.org/conservationhome/residential/thermostats",
        "https://www.chelanpud.org/conservationhome/residential/rebate-application"
      ],
      "evidenceText": "Chelan PUD residential rebates include heat pumps, thermostats, duct sealing, heat pump water heaters, windows, storm windows, exterior doors, and insulation for qualifying electric-heated homes.",
      "reasoningNotes": "The original heat pump, duct, insulation, and thermostat matches are supported. Air sealing should be blocked as a standalone rebate because current official rebate pages do not list it separately."
    },
    "existingSimpleRules": [
      {
        "id": "oir_2176b8c8fc39a828_v1",
        "incentiveType": "fixed_amount_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_amount",
          "amountCents": 50000
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$500 for duct sealing in site-built single-family homes",
        "evidenceText": "Chelan PUD rebate updates list duct sealing incentive at $500 for existing single-family homes.",
        "sourceUrlsChecked": [
          "https://www.chelanpud.org/conservationhome/residential-conservation/ways-to-save/rebates-and-incentives"
        ],
        "reasoningNotes": "Matched duct sealing term. Modeled as a project-level duct sealing rebate.",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_c35c49222c30cd4f_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 130000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$1,300 per heat pump water heater conversion",
        "evidenceText": "Chelan PUD rebate updates list heat pump water heater conversion incentive at $1,300.",
        "sourceUrlsChecked": [
          "https://www.chelanpud.org/conservationhome/residential-conservation/ways-to-save/rebates-and-incentives",
          "https://www.chelanpud.org/conservationhome/residential-conservation/ways-to-save/heat-pump-water-heaters"
        ],
        "reasoningNotes": "Matched heat pump water heater term. Returned separately from weatherization.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2130",
    "opportunityName": "Orcas Power & Light - Residential Energy Efficiency Rebate Program",
    "state": "WA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2130/orcas-power-and-light-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.opalco.com/save/residential-rebates/",
    "applicationUrl": null,
    "administrator": "Orcas Power and Light Cooperative",
    "programType": "Residential Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 6,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "ev_charger_installation",
        "displayName": "EV charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "ev charging",
          "charging station"
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
          "mini split",
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
          "WA"
        ],
        "counties": [
          "San Juan County"
        ],
        "cities": [],
        "utilityTerritories": [
          "Orcas Power and Light Cooperative"
        ],
        "notes": "OPALCO is a member-owned electric cooperative serving San Juan County; rebates are for qualifying OPALCO members and addresses in its service area."
      },
      "eligibleApplicantTypes": [
        "opalco_members",
        "residential_customers",
        "homeowners"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "ductless_heat_pump",
        "heat_pump_water_heater",
        "level_2_ev_charger_installation",
        "insulation_upgrade",
        "window_replacement"
      ],
      "hardRequirements": [
        "Applicant must be an OPALCO member with the measure installed in OPALCO service territory.",
        "Heat pump water heater rebates are for existing single-family homes and must replace an electric storage water heater.",
        "Level 2 EV charger must be a 240V AC charging station; OPALCO's Switch It Up financing is optional and separate from the rebate match.",
        "Applications must include the required measure-specific forms, receipts, and installation documentation; rebates are available while funds last."
      ],
      "blockers": [
        "Do not match broad high_efficiency_hvac_replacement; current support is for specific heat pump measures, not any HVAC replacement.",
        "Do not match ducted PTCS heat pump rebates as current, because the OPALCO ducted heat pump page says the BPA/PTCS rebate stopped taking applications in 2023.",
        "Gas water heater replacements and new construction do not qualify for OPALCO heat pump water heater rebates.",
        "Do not treat OPALCO's on-bill Switch It Up financing as the same rebate opportunity."
      ],
      "programType": "Residential Rebate Program",
      "administrator": "Orcas Power and Light Cooperative",
      "applicationUrl": null,
      "websiteUrl": "https://www.opalco.com/save/residential-rebates/",
      "sourceUrlsChecked": [
        "https://www.opalco.com/save/residential-rebates/",
        "https://www.opalco.com/save/residential-rebates/heat-pump-water-heater/",
        "https://www.opalco.com/save/residential-rebates/ev-charging-station/",
        "https://www.opalco.com/save/residential-rebates/ductless-heat-pump/",
        "https://www.opalco.com/save/residential-rebates/window/",
        "https://www.opalco.com/save/residential-rebates/ducted-heat-pump/"
      ],
      "evidenceText": "OPALCO lists residential rebates for insulation, windows, heat pump water heaters, EV charging stations, and ductless heat pumps; the ducted PTCS rebate page states it stopped taking applications in 2023.",
      "reasoningNotes": "Input target list came from the uploaded batch prompt . Retained product-specific supported measures and blocked the stale ducted heat pump and broad HVAC matches."
    },
    "existingSimpleRules": [
      {
        "id": "oir_e7a7baed89008081_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 220000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$2,200 per split-system heat pump water heater",
        "evidenceText": "OPALCO heat pump water heater rebate page lists split-system HPWH, any tank size, at $2,200.",
        "sourceUrlsChecked": [
          "https://www.opalco.com/save/residential-rebates/heat-pump-water-heater/",
          "https://www.opalco.com/save/residential-rebates/"
        ],
        "reasoningNotes": "Matched heat pump water heater term. Returned highest published HPWH tier.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1289",
    "opportunityName": "Residential Energy Efficiency Rebate Program",
    "state": "WI",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1289/residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://focusonenergy.com/residential",
    "applicationUrl": "https://focusonenergy.com/residential-rebates-and-discounts",
    "administrator": "Focus on Energy",
    "programType": "Residential Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 6,
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
        "retrofitTypeId": "led_lighting_retrofit",
        "displayName": "LED lighting retrofit",
        "parentCategory": "lighting",
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
          "WI"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Focus on Energy participating utilities"
        ],
        "notes": "Available to Wisconsin residents served by participating utilities; some measures have utility fuel-share, trade ally, income, or IRA-program requirements."
      },
      "eligibleApplicantTypes": [
        "wisconsin_residents",
        "homeowners",
        "renters",
        "landlords",
        "participating_utility_residential_customers"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "air_sealing_weatherization",
        "insulation_upgrade",
        "diy_attic_insulation",
        "duct_sealing",
        "air_source_heat_pump",
        "cold_climate_air_source_heat_pump",
        "ground_source_geothermal_heat_pump",
        "high_efficiency_natural_gas_furnace",
        "high_efficiency_natural_gas_boiler",
        "smart_thermostat",
        "heat_pump_water_heater"
      ],
      "hardRequirements": [
        "Customer must be a Wisconsin residential customer of a participating Focus on Energy utility.",
        "Insulation and air sealing applications must be submitted within 60 days of project completion and no later than the stated 2026 program deadline.",
        "Many installed measures require use of a participating Trade Ally or IRA-registered contractor, depending on rebate path.",
        "Smart thermostats must be qualified models purchased on or after January 1, 2026 for the current rebate.",
        "Rebates and IRA Home Energy Rebates are subject to income, equipment, and funding requirements."
      ],
      "blockers": [
        "Do not match broad LED lighting retrofit to this record based only on free packs or retail marketplace references; no current residential retrofit lighting rebate was verified in the core pages checked.",
        "Do not infer commercial refrigeration, motors, or C&I measures from Focus business programs into this residential record.",
        "Solar for Homes appears as a separate Focus offering and should not be used to justify renewable categories for this energy-efficiency match.",
        "New construction and income-qualified IRA pathways have separate certification or eligibility rules."
      ],
      "programType": "Residential Rebate Program",
      "administrator": "Focus on Energy",
      "applicationUrl": "https://focusonenergy.com/residential-rebates-and-discounts",
      "websiteUrl": "https://focusonenergy.com/residential",
      "sourceUrlsChecked": [
        "https://focusonenergy.com/residential",
        "https://focusonenergy.com/residential-rebates-and-discounts",
        "https://focusonenergy.com/",
        "https://focus-ira.clearesult.com/"
      ],
      "evidenceText": "Focus on Energy lists Wisconsin residential rebates for insulation and air sealing, DIY attic insulation, smart thermostats, heating and cooling, water heating, and federally funded home energy rebates.",
      "reasoningNotes": "Kept residential envelope, HVAC, thermostat, and water-heating categories; blocked unrelated business, lighting, and renewable extrapolations."
    },
    "existingSimpleRules": [
      {
        "id": "oir_1f289d84f024847e_v1",
        "incentiveType": "fixed_amount_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_amount",
          "amountCents": 20000
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$200 for qualifying DIY attic insulation and air sealing",
        "evidenceText": "Focus on Energy DIY attic insulation and air sealing page lists $200 cash back.",
        "sourceUrlsChecked": [
          "https://focusonenergy.com/residential/diy-insulation-air-sealing",
          "https://focusonenergy.com/residential"
        ],
        "reasoningNotes": "Matched insulation and air sealing terms. This is a project-level rebate for eligible DIY work.",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_84791eee1df6f36b_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 5000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$50 per qualifying smart thermostat",
        "evidenceText": "Focus on Energy 2026 smart thermostat page lists a $50 rebate.",
        "sourceUrlsChecked": [
          "https://focusonenergy.com/residential/smart-thermostats",
          "https://focusonenergy.com/residential"
        ],
        "reasoningNotes": "Matched smart thermostat term. Use one unit as one qualifying thermostat.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4786",
    "opportunityName": "Questar Gas - Home Builder Gas Appliance Rebate Program",
    "state": "WY",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4786/questar-gas-home-builder-gas-appliance-rebate-program",
    "websiteUrl": "https://www.enbridgegas.com/utwyid/save-money/thermwise/builder-rebates",
    "applicationUrl": "https://www.enbridgegas.com/-/media/Extranet-Pages/utidwy/save-money/thermwise/builder-rebates/WYBuilderApp-SF.pdf?hash=0A6FD2539620A4B58A7EFED75A104881&la=en&rev=50d9b0a510a04690a51a81c639e6a305",
    "administrator": "Enbridge Gas ThermWise",
    "programType": "Builder Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 6,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "energy_recovery_ventilation_retrofit",
        "displayName": "Energy recovery ventilation retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "energy recovery ventilation"
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
          "WY"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Enbridge Gas Wyoming"
        ],
        "notes": "Applies to qualifying new residential construction receiving Enbridge Gas service on the applicable Wyoming rate schedule."
      },
      "eligibleApplicantTypes": [
        "home_builders",
        "owner_builders"
      ],
      "eligibleSectors": [
        "new_residential_construction",
        "single_family_new_construction",
        "multifamily_new_construction"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_gas_furnace",
        "dual_fuel_heat_pump_system",
        "high_efficiency_gas_boiler",
        "high_efficiency_gas_water_heater",
        "combined_space_water_heating_unit",
        "energy_recovery_ventilation",
        "smart_thermostat",
        "smart_water_heater_controller",
        "insulation_upgrade",
        "high_performance_windows",
        "solar_assisted_domestic_water_heater"
      ],
      "hardRequirements": [
        "Rebates are for new construction measures installed in dwellings receiving Enbridge Gas service in Wyoming.",
        "Measures must be new, purchased and installed during the 2026 promotion period, and tied to an active Enbridge Gas meter.",
        "Completed applications and required documentation must be received within six months of gas service turn-on.",
        "Rebates for new construction measures are paid only to builders or owner-builders.",
        "Equipment must meet measure-specific efficiency and model requirements, such as AFUE, ENERGY STAR, SRCC, geofencing, occupancy sensor, or U-factor criteria."
      ],
      "blockers": [
        "Do not match existing-home retrofit homeowner projects to this builder rebate opportunity.",
        "Do not match broad high_efficiency_hvac_replacement; support is for listed gas furnaces, gas boilers, dual-fuel systems, ERV, and related builder measures.",
        "Gas service is required; all-electric projects without Enbridge Gas service are ineligible.",
        "Insulation, windows, and smart thermostat matches must meet the precise builder-program specifications, not generic envelope or controls upgrades."
      ],
      "programType": "Builder Rebate Program",
      "administrator": "Enbridge Gas ThermWise",
      "applicationUrl": "https://www.enbridgegas.com/-/media/Extranet-Pages/utidwy/save-money/thermwise/builder-rebates/WYBuilderApp-SF.pdf?hash=0A6FD2539620A4B58A7EFED75A104881&la=en&rev=50d9b0a510a04690a51a81c639e6a305",
      "websiteUrl": "https://www.enbridgegas.com/utwyid/save-money/thermwise/builder-rebates",
      "sourceUrlsChecked": [
        "https://www.enbridgegas.com/utwyid/save-money/thermwise/builder-rebates",
        "https://www.enbridgegas.com/-/media/Extranet-Pages/utidwy/save-money/thermwise/builder-rebates/WYBuilderApp-SF.pdf?hash=0A6FD2539620A4B58A7EFED75A104881&la=en&rev=50d9b0a510a04690a51a81c639e6a305",
        "https://www.enbridgegas.com/-/media/Extranet-Pages/utidwy/save-money/thermwise/builder-rebates/WYBuilderApp-MF.pdf?hash=7A29C0DCC76AA4818749ACC8CBFB3301&la=en&rev=25736d7ab425494e87367b00750436a4"
      ],
      "evidenceText": "The current ThermWise Wyoming builder materials describe 2026 builder rebates for new residential construction receiving Enbridge Gas service, including gas HVAC, water heating, ERV, smart thermostats, envelope measures, and solar-assisted water heating.",
      "reasoningNotes": "The former Questar program is now administered under Enbridge Gas ThermWise; eligibility is builder/new-construction specific rather than a general retrofit rebate."
    },
    "existingSimpleRules": [
      {
        "id": "oir_031ed9e7c78925e4_v1",
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
        "formula": "$75 per Tier 2 smart thermostat",
        "evidenceText": "Wyoming builder application lists Smart Thermostat Tier 2 with qualifying occupancy sensor technology at $75.",
        "sourceUrlsChecked": [
          "https://www.thermwise.com/builder-applications-wyoming/",
          "https://www.enbridgegas.com/-/media/Extranet-Pages/utidwy/save-money/thermwise/builder-rebates/WYBuilderApp-MF.pdf"
        ],
        "reasoningNotes": "Matched smart thermostat terms. Tier 2 is the most relevant smart-thermostat measure; Tier 1 is lower-featured.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22546",
    "opportunityName": "Alabama Power - Make Ready Program",
    "state": "AL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22546/alabama-power-make-ready-program",
    "websiteUrl": "https://www.alabamapower.com/business/business-customers-and-services/electric-transportation-business-programs/make-ready-program.html",
    "applicationUrl": "https://apcmakeready.customerapplication.com/",
    "administrator": "Alabama Power Co.",
    "programType": "Make Ready Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 5,
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
        "retrofitTypeId": "ev_charger_installation",
        "displayName": "EV charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "evse"
        ]
      },
      {
        "retrofitTypeId": "ev_make_ready_electrical_upgrade",
        "displayName": "EV make-ready electrical upgrade",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "make ready",
          "make-ready"
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
          "AL"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Alabama Power electric service territory"
        ],
        "notes": "Applies to Alabama Power business customers developing qualifying EV charging sites."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "industrial_customer",
        "fleet_operator",
        "site_host",
        "business_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "transportation",
        "fleet"
      ],
      "eligibleRetrofitCategories": [
        "ev_make_ready_electrical_upgrade"
      ],
      "hardRequirements": [
        "Application must be approved before rebate construction is completed.",
        "Make-ready work must support EV charging infrastructure at the customer facility.",
        "Charging equipment must be installed and in service for Alabama Power verification, but the incentive is for make-ready infrastructure.",
        "Program funds are annual and first-come, first-served."
      ],
      "blockers": [
        "Do not match window_replacement; the matched term was an application or program window, not a building window measure.",
        "Do not match level_2_ev_charger_installation or dc_fast_charger_installation as funded equipment; customer remains responsible for chargers and behind-the-meter charging infrastructure beyond make-ready scope.",
        "Program covers infrastructure behind the meter up to but not including the charger."
      ],
      "programType": "Make Ready Rebate Program",
      "administrator": "Alabama Power Co.",
      "applicationUrl": "https://apcmakeready.customerapplication.com/",
      "websiteUrl": "https://www.alabamapower.com/business/business-customers-and-services/electric-transportation-business-programs/make-ready-program.html",
      "sourceUrlsChecked": [
        "https://www.alabamapower.com/business/business-customers-and-services/electric-transportation-business-programs/make-ready-program.html",
        "https://apcmakeready.customerapplication.com/"
      ],
      "evidenceText": "Alabama Power states applications are open and defines make-ready as infrastructure required to support EV charging, up to but not including the charger.",
      "reasoningNotes": "Keep only EV make-ready electrical upgrade. Charger installation may be required for verification but is not itself the funded measure."
    },
    "existingSimpleRules": [
      {
        "id": "oir_3718e0605e92d63f_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 2000000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$20,000 per 150 kW DC fast charging port",
        "evidenceText": "Alabama Power Make Ready table lists DCFC, 150 kW minimum, at $20,000 rebate per port.",
        "sourceUrlsChecked": [
          "https://www.alabamapower.com/business/business-customers-and-services/electric-transportation-business-programs/make-ready-program.html"
        ],
        "reasoningNotes": "Matched DCFC terms. Returned as the highest published power tier.",
        "mapping": {
          "primarySavingsModelId": "fleet_fuel_replacement",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_c9eaf213dfa12d3c_v1",
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
        "confidence": "high",
        "formula": "$2,000 per Level 2 charging port rated at least 6.6 kW",
        "evidenceText": "Alabama Power Make Ready table lists Level 2, 6.6 kW minimum, at $2,000 rebate per port.",
        "sourceUrlsChecked": [
          "https://www.alabamapower.com/business/business-customers-and-services/electric-transportation-business-programs/make-ready-program.html"
        ],
        "reasoningNotes": "Matched Level 2 EVSE and make-ready terms. Use one unit as one simultaneously charging port.",
        "mapping": {
          "primarySavingsModelId": "fleet_fuel_replacement",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_d7bf5844f9481379_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 500000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$5,000 per 20 kW DC fast charging port",
        "evidenceText": "Alabama Power Make Ready table lists DCFC, 20 kW minimum, at $5,000 rebate per port.",
        "sourceUrlsChecked": [
          "https://www.alabamapower.com/business/business-customers-and-services/electric-transportation-business-programs/make-ready-program.html"
        ],
        "reasoningNotes": "Matched DCFC terms. Returned as the lowest DC fast charging power tier.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5785",
    "opportunityName": "Arkansas Oklahoma Gas (AOG) Residential Rebate Program",
    "state": "AR",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5785/arkansas-oklahoma-gas-aog-residential-rebate-program",
    "websiteUrl": "https://aogc.com/ResidentialRebates",
    "applicationUrl": "https://summitutilities.clearesult.com/",
    "administrator": "Arkansas Oklahoma Gas",
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
        "retrofitTypeId": "high_efficiency_gas_water_heater",
        "displayName": "High-efficiency gas water heater",
        "parentCategory": "water_heating",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "gas water heater"
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
          "AR",
          "OK"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Arkansas Oklahoma Gas"
        ],
        "notes": "AOG residential customers in Arkansas and Oklahoma; the DSIRE record state is Arkansas, but current official residential materials cover both states."
      },
      "eligibleApplicantTypes": [
        "residential_customers",
        "homeowners",
        "renters",
        "leaseholders",
        "liheap_eligible_households"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_furnace_retrofit",
        "high_efficiency_gas_water_heater",
        "gas_tankless_water_heater",
        "smart_thermostat_zoning_retrofit",
        "air_sealing_weatherization",
        "insulation_upgrade",
        "thermal_envelope_weatherization"
      ],
      "hardRequirements": [
        "Applicant must be an AOG customer in Arkansas or Oklahoma for applicable residential offers.",
        "Heating and water-heating measures require qualifying natural gas equipment and listed efficiency levels.",
        "Smart thermostats must be ENERGY STAR qualified and follow current timing and budget rules.",
        "Weatherization is limited to homes meeting program criteria, including older single-family homes or duplexes for the AOG weatherization program.",
        "Arkansas low-income weatherization requires applicable LIHEAP or income eligibility."
      ],
      "blockers": [
        "Do not match electric heat pumps or broad HVAC replacement beyond qualifying gas furnaces.",
        "Weatherization is not automatic for all customers and requires program screening.",
        "Smart thermostat rebate is not demand response.",
        "This DSIRE residential repair does not generalize to broader commercial equipment, even though some AOG equipment materials mention small commercial eligibility."
      ],
      "programType": "Rebate Program",
      "administrator": "Arkansas Oklahoma Gas",
      "applicationUrl": "https://summitutilities.clearesult.com/",
      "websiteUrl": "https://aogc.com/ResidentialRebates",
      "sourceUrlsChecked": [
        "https://www.aogc.com/energyefficiency.aspx",
        "https://aogc.com/ResidentialRebates",
        "https://aogc.com/Article/618/",
        "https://www.aogc.com/Documents/AOG_Rebate_HeatingEquipment_2026.pdf"
      ],
      "evidenceText": "AOG's residential rebate page verifies Arkansas/Oklahoma gas furnace, tankless water-heater, ENERGY STAR smart-thermostat and qualifying residential weatherization offerings, with rebates subject to budget and rules.",
      "reasoningNotes": "Kept gas space heating, gas water heating, smart thermostat and weatherization; constrained weatherization and excluded electric or broad commercial interpretations."
    },
    "existingSimpleRules": [
      {
        "id": "oir_b184b1c4157645fb_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 70000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "$700 per eligible unit",
        "evidenceText": "90 UEF or Higher $700 $50 Online Form Download Form Smart Thermostat Rebate Program Start saving energy now with a smart thermostat",
        "sourceUrlsChecked": [
          "https://www.aogc.com/energyefficiency.aspx"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1659",
    "opportunityName": "Burbank Water & Power - Residential Energy Efficiency Rebate Program",
    "state": "CA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1659/burbank-water-and-power-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.burbankwaterandpower.com/residential-rebates",
    "applicationUrl": "https://www.burbankwaterandpower.com/residential-rebates",
    "administrator": "Burbank Water & Power",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 5,
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
        "counties": [
          "Los Angeles County"
        ],
        "cities": [
          "Burbank"
        ],
        "utilityTerritories": [
          "Burbank Water & Power"
        ],
        "notes": "Burbank Water and Power residential electric and water customers and Burbank residents; some water measures use partner programs."
      },
      "eligibleApplicantTypes": [
        "residential_customers",
        "homeowners",
        "renters",
        "multifamily_property_owners",
        "low_income_customers",
        "affordable_housing_providers"
      ],
      "eligibleSectors": [
        "residential",
        "multifamily"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation",
        "electrical_panel_upgrade",
        "residential_refrigerator_freezer_rebate",
        "room_air_conditioner_rebate",
        "smart_thermostat_zoning_retrofit",
        "smart_thermostat_demand_response",
        "insulation_upgrade",
        "attic_insulation",
        "wall_insulation",
        "duct_sealing",
        "led_lighting_retrofit",
        "low_flow_fixture_retrofit",
        "high_efficiency_toilet",
        "variable_speed_pool_pump",
        "pool_cover"
      ],
      "hardRequirements": [
        "Applicant must be a BWP residential customer or eligible Burbank resident for the specific program.",
        "Level 2 EV charger rebate requires a 240-volt Level 2 charger, active BWP electric account and agreement to the applicable time-of-use rate.",
        "Insulation rebates exclude new construction and require listed R-value or installation criteria.",
        "Refrigerator and freezer rebates require ENERGY STAR replacement and required proof of purchase and delivery.",
        "Cool Rewards requires an eligible Wi-Fi thermostat controlling air conditioning or heat pump equipment."
      ],
      "blockers": [
        "Commercial refrigeration equipment is a false positive; the supported refrigerator/freezer measure is residential appliance replacement.",
        "EV charging is residential Level 2 or panel-upgrade support, not a fleet or commercial charging program.",
        "Water-saving toilets, washers and fixtures may be administered through partner programs rather than BWP's direct electric rebate.",
        "Cool Rewards demand response is separate from the smart thermostat purchase rebate."
      ],
      "programType": "Rebate Program",
      "administrator": "Burbank Water & Power",
      "applicationUrl": "https://www.burbankwaterandpower.com/residential-rebates",
      "websiteUrl": "https://www.burbankwaterandpower.com/residential-rebates",
      "sourceUrlsChecked": [
        "https://www.burbankwaterandpower.com/residential-rebates",
        "https://www.burbankwaterandpower.com/residents",
        "https://www.burbankwaterandpower.com/home-improvement-program",
        "https://www.burbankwaterandpower.com/cool-rewards"
      ],
      "evidenceText": "BWP residential pages list ENERGY STAR refrigerator/freezer, smart thermostat, insulation, variable-speed pool pump, Level 2 EV charger and no-cost home-improvement measures; Cool Rewards is separate thermostat load management.",
      "reasoningNotes": "Kept residential appliances, EV charging, insulation, thermostat and selected no-cost measures; blocked commercial refrigeration and separated thermostat demand response."
    },
    "existingSimpleRules": [
      {
        "id": "oir_0938dce8e24292e3_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 20000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "equipment_cost",
          "applicationOrder": 10
        },
        "cap": {
          "maxPercentOfBasis": 1
        },
        "confidence": "high",
        "formula": "$200 per standard Level 2 residential EV charging station",
        "evidenceText": "BWP EV charger FAQ lists standard charger rebate of $200 for residential customers.",
        "sourceUrlsChecked": [
          "https://www.burbankwaterandpower.com/residential-ev-charging-station-rebate-program-faq"
        ],
        "reasoningNotes": "Standard and smart chargers have different rebate amounts.",
        "mapping": {
          "primarySavingsModelId": "fleet_fuel_replacement",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_55cdbacafc2fdbed_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 50000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "equipment_cost",
          "applicationOrder": 10
        },
        "cap": {
          "maxPercentOfBasis": 1
        },
        "confidence": "high",
        "formula": "$500 per smart Level 2 residential EV charging station",
        "evidenceText": "BWP EV charger FAQ lists smart charger rebate of $500 for residential customers.",
        "sourceUrlsChecked": [
          "https://www.burbankwaterandpower.com/residential-ev-charging-station-rebate-program-faq"
        ],
        "reasoningNotes": "Matched Level 2 EV charger term. Use one unit as one smart charger port.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3325",
    "opportunityName": "Pacific Power - Residential Energy Efficiency Rebate Programs",
    "state": "CA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3325/pacific-power-residential-energy-efficiency-rebate-programs",
    "websiteUrl": "https://wattsmartsavings.net/california-residential/",
    "applicationUrl": "https://wattsmartsavings.net/california-residential/",
    "administrator": "Pacific Power",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
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
          "CA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Pacific Power California service territory"
        ],
        "notes": "California residential Wattsmart incentives apply only to Pacific Power residential customers in California."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "homeowner",
        "tenant",
        "landlord"
      ],
      "eligibleSectors": [
        "residential",
        "multifamily",
        "manufactured_home"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "ductless_heat_pump",
        "heat_pump_conversion",
        "heat_pump_water_heater",
        "residential_refrigerator_freezer",
        "central_brushless_fan_motor",
        "room_air_conditioner",
        "room_air_cleaner",
        "smart_connected_power_strip",
        "residential_energy_star_appliance"
      ],
      "hardRequirements": [
        "Applicant or installation site must be an eligible Pacific Power California residential account.",
        "Equipment must meet current Wattsmart/Pacific Power qualifying specifications and product-list rules.",
        "Some incentives are limited to specific housing types, equity segments, manufactured homes or multifamily configurations.",
        "Program measures and amounts follow current California tariff and filing updates."
      ],
      "blockers": [
        "High-efficiency refrigeration equipment should be blocked; the supported category is residential refrigerator/freezer appliance incentives, not commercial refrigeration systems.",
        "LED lighting retrofit is not supported as a current standalone retrofit category for this record.",
        "Broad HVAC replacement should be limited to ductless heat pumps, heat pump conversions, room air conditioners or other listed residential HVAC measures.",
        "Oregon, Washington and Idaho Pacific Power offers are separate from this California record."
      ],
      "programType": "Rebate Program",
      "administrator": "Pacific Power",
      "applicationUrl": "https://wattsmartsavings.net/california-residential/",
      "websiteUrl": "https://wattsmartsavings.net/california-residential/",
      "sourceUrlsChecked": [
        "https://www.pacificpower.net/savings-energy-choices/home.html",
        "https://wattsmartsavings.net/california-residential/",
        "https://wattsmartsavings.net/california-residential/find-savings-manufactured-homes/",
        "https://www.pacificpower.net/content/dam/pcorp/documents/en/pacificpower/rates-regulation/california/filings/advice-797-e/Advice_797-E.pdf"
      ],
      "evidenceText": "Pacific Power's 2026 California filing lists residential incentives for ductless heat pumps, heat pump conversions, heat pump water heaters, refrigerators/freezers, room air conditioners and smart power strips.",
      "reasoningNotes": "Repaired false positives by replacing broad refrigeration and LED retrofit matches with product-specific residential appliance and HVAC categories."
    },
    "existingSimpleRules": [
      {
        "id": "oir_600198fd94863759_v1",
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
        "confidence": "medium",
        "formula": "Up to $400 per heat pump water heater",
        "evidenceText": "Pacific Power California residential Wattsmart materials say heat pump water heaters can receive up to $400 cash back.",
        "sourceUrlsChecked": [
          "https://www.pacificpower.net/savings-energy-choices/home.html",
          "https://wattsmartsavings.net/california-residential/find-savings-manufactured-homes/"
        ],
        "reasoningNotes": "Matched heat pump water heater term. Confidence is medium because California Wattsmart details vary by home type and current incentive table.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1428",
    "opportunityName": "PG&E - Residential Energy Savings Rebate Programs",
    "state": "CA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1428/pg-and-e-residential-energy-savings-rebate-programs",
    "websiteUrl": "https://www.pge.com/en/save-energy-and-money/rebates-and-incentives.html",
    "applicationUrl": null,
    "administrator": "Pacific Gas & Electric Company",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 5,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "ev_charger_installation",
        "displayName": "EV charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "ev charging"
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
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "CA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Pacific Gas & Electric Company"
        ],
        "notes": "Applies to eligible PG&E residential electric customers; some offers also cover CCA customers receiving PG&E delivery service."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "electric_vehicle_owner",
        "electric_vehicle_lessee"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "ev_charger_installation",
        "heat_pump_water_heater",
        "smart_thermostat_zoning_retrofit",
        "room_air_conditioner"
      ],
      "hardRequirements": [
        "EV charging rebate applicants must be PG&E residential electric customers, own or lease an eligible BEV or PHEV registered in California, and use approved equipment and installation rules.",
        "Golden State Rebates coupons require eligibility for the specific product and participating utility account.",
        "Heat pump water heater rebates must meet ENERGY STAR, replacement, and program documentation requirements.",
        "Golden State Rebates has posted final reservation and redemption deadlines in July 2026."
      ],
      "blockers": [
        "Central heat pump HVAC and broad high-efficiency HVAC replacement are not verified as current direct PG&E residential rebate categories on the checked pages.",
        "Room air conditioner rebates must not be generalized to central air conditioning or HVAC replacement.",
        "TECH Clean California heat pump HVAC is a separate statewide program and should not be folded into this PG&E opportunity."
      ],
      "programType": "Rebate Program",
      "administrator": "Pacific Gas & Electric Company",
      "applicationUrl": null,
      "websiteUrl": "https://www.pge.com/en/save-energy-and-money/rebates-and-incentives.html",
      "sourceUrlsChecked": [
        "https://www.pge.com/en/save-energy-and-money/rebates-and-incentives.html",
        "https://www.pge.com/en/clean-energy/electric-vehicles/getting-started-with-electric-vehicles/residential-electric-vehicle-charging-rebate.html",
        "https://goldenstaterebates.com/",
        "https://www.goldenstaterebates.com/goldenstaterebates/rebates/heat-pump-water-heaters"
      ],
      "evidenceText": "PG&E]( pages support residential EV charging rebates and link residential customers to Golden State Rebates for HPWH, smart thermostats, and room air conditioners.",
      "reasoningNotes": "Current sources support EV charging, HPWH, smart thermostat, and room AC. Remove unsupported central heat pump HVAC and broad HVAC replacement from this PG&E rebate opportunity."
    },
    "existingSimpleRules": [
      {
        "id": "oir_bd386e6a2f190288_v1",
        "incentiveType": "percent_of_basis_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "percent_of_basis",
          "percent": 0.5
        },
        "basisPolicy": {
          "basis": "equipment_cost",
          "applicationOrder": 10
        },
        "cap": {
          "maxPercentOfBasis": 0.5
        },
        "confidence": "medium",
        "formula": "Up to 50% of eligible residential EV charging equipment purchase price",
        "evidenceText": "PG&E residential EV charger page says standard applicants may qualify for up to 50% of eligible charging equipment purchase price.",
        "sourceUrlsChecked": [
          "https://www.pge.com/en/clean-energy/electric-vehicles/getting-started-with-electric-vehicles/residential-electric-vehicle-charging-rebate.html"
        ],
        "reasoningNotes": "Matched EV charging term. Rebate Plus installation/panel amounts are separate and income/pathway-specific.",
        "mapping": {
          "primarySavingsModelId": "fleet_fuel_replacement",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  }
]
