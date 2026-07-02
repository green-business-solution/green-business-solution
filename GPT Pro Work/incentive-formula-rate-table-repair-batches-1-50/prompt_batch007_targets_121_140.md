You are helping RetroFi repair incentive formulas, rate tables, grant estimates, tax credits, and non-cash workflow value rules.

Return strict JSON only. Do not include markdown, code fences, commentary, or citations outside JSON fields.

Batch: 7
Targets in this prompt: 121-140 of 984
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
  "batchNumber": 7,
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
  "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:22122"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3029",
    "opportunityName": "City of Tallahassee Utilities - Residential Energy Efficiency Rebate Program",
    "state": "FL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3029/city-of-tallahassee-utilities-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.talgov.com/you/you-products-home-index",
    "applicationUrl": null,
    "administrator": "City of Tallahassee Utilities",
    "programType": "Municipal Utility Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 8,
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
        "retrofitTypeId": "high_efficiency_commercial_dishwasher",
        "displayName": "High-efficiency commercial dishwasher",
        "parentCategory": "commercial_kitchen_foodservice",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "dishwasher"
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
          "FL"
        ],
        "counties": [],
        "cities": [
          "Tallahassee"
        ],
        "utilityTerritories": [
          "City of Tallahassee Utilities electric service territory"
        ],
        "notes": "Equipment must serve a permanent residence receiving City of Tallahassee permanent residential electric service."
      },
      "eligibleApplicantTypes": [
        "residential municipal utility customer",
        "residential electric customer",
        "homeowner"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "central_air_conditioner_replacement",
        "heat_pump_hvac_retrofit",
        "water_source_heat_pump",
        "heat_pump_water_heater",
        "residential_dishwasher",
        "residential_freezer",
        "residential_refrigerator",
        "high_efficiency_laundry_equipment",
        "variable_speed_pool_pump"
      ],
      "hardRequirements": [
        "Applicant must be a City of Tallahassee residential electric customer.",
        "Equipment must be installed at a permanent residence receiving City permanent residential electric service.",
        "Appliance rebates require ENERGY STAR-certified products and City application procedures.",
        "HVAC rebates require listed efficiency ratings, permit and inspection compliance, contractor invoice, and AHRI documentation where applicable.",
        "Heat pump water heater rebate is not available when replacing natural gas water heating."
      ],
      "blockers": [
        "Do not match commercial dishwasher or commercial kitchen equipment; dishwasher is a residential ENERGY STAR appliance rebate.",
        "Do not match commercial refrigeration; refrigerator and freezer rebates are residential appliances.",
        "Natural gas appliance rebates are separate from the electric residential energy-efficiency rebate path.",
        "Solar water heater rebates, grants, loans, and energy audits are separate City products.",
        "No LED lighting retrofit support was verified on the official residential rebate pages checked."
      ],
      "programType": "Municipal Utility Rebate Program",
      "administrator": "City of Tallahassee Utilities",
      "applicationUrl": null,
      "websiteUrl": "https://www.talgov.com/you/you-products-home-index",
      "sourceUrlsChecked": [
        "https://www.talgov.com/you/you-products-home-index",
        "https://www.talgov.com/you/you-products-home-hvac-rebates.aspx",
        "https://www.talgov.com/you/you-products-home-es-rebates",
        "https://www.talgov.com/you/you-products-home-es-rebates-terms",
        "https://www.talgov.com/you/you-products-home-solar-water-rebates.aspx",
        "https://www.talgov.com/you/naturalgas-rebates",
        "https://www.talgov.com/you/you-products-home-energy-audit",
        "https://www.talgov.com/Uploads/Public/Documents/you/es_hvac_exist.pdf"
      ],
      "evidenceText": "Tallahassee residential pages list electric HVAC rebates for heat pumps, water-source heat pumps, and heat pump water heaters, plus ENERGY STAR appliance rebates for dishwashers, freezers, refrigerators, clothes washers, and pool pumps.",
      "reasoningNotes": "Narrowed appliance matches to residential appliance categories and treated solar water heating, natural gas appliances, loans, grants, and audits as separate City products."
    },
    "existingSimpleRules": [
      {
        "id": "oir_88e737ae1494f9fa_v1",
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
        "formula": "$300 per ENERGY STAR heat pump water heater",
        "evidenceText": "Tallahassee Utilities HVAC rebate page lists heat pump-style water heater at $300.",
        "sourceUrlsChecked": [
          "https://www.talgov.com/you/you-products-home-hvac-rebates.aspx"
        ],
        "reasoningNotes": "Matched heat pump water heater term. Rebate is credited on the utility bill for existing homes.",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_a1085993a7840dc9_v1",
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
        "formula": "$750 per qualifying water-source heat pump",
        "evidenceText": "Tallahassee Utilities lists water-source heat pump rebate at $750.",
        "sourceUrlsChecked": [
          "https://www.talgov.com/you/you-products-home-hvac-rebates.aspx"
        ],
        "reasoningNotes": "Matched heat pump term. Returned separately because it is a distinct HVAC system measure.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4656",
    "opportunityName": "Georgia Power -  Commercial Energy Efficiency Rebate Program",
    "state": "GA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4656/georgia-power-commercial-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.georgiapower.com/business/products-programs/efficiency-maintenance/ceep.html",
    "applicationUrl": "https://georgiapowercommercialrebates.com/",
    "administrator": "Georgia Power Company",
    "programType": "Commercial Energy-Efficiency Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 8,
    "targetKind": "existing_simple_rule_v2_repair",
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
          "chiller"
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
        "retrofitTypeId": "refrigeration_ec_motor_retrofit",
        "displayName": "Refrigeration EC motor retrofit",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "electronically commutated motor"
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
          "GA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Georgia Power commercial service territory"
        ],
        "notes": "Facility must be an active Georgia Power commercial-class customer on an eligible commercial tariff."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "business_customer",
        "institutional_customer",
        "commercial_property_owner"
      ],
      "eligibleSectors": [
        "commercial",
        "institutional"
      ],
      "eligibleRetrofitCategories": [
        "energy_management_system",
        "building_tune_up",
        "guest_room_energy_management_controls",
        "heat_pump_hvac_retrofit",
        "heat_pump_water_heater",
        "high_efficiency_hvac_replacement",
        "high_efficiency_chiller_retrofit",
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "variable_frequency_drive_retrofit",
        "demand_control_ventilation_retrofit",
        "refrigeration_controls_retrofit",
        "commercial_dishwasher",
        "commercial_kitchen_equipment",
        "building_envelope_upgrade"
      ],
      "hardRequirements": [
        "Applicant must be an active Georgia Power customer with a commercial-class facility on a Georgia Power commercial tariff.",
        "Qualifying equipment must be measurable and verifiable and meet the applicable 2026 CEEP specifications.",
        "Applications are submitted through the commercial rebate portal with required project documentation.",
        "Prescriptive categories have cost caps, annual building caps and technology-specific requirements.",
        "VFDs and ECM measures are limited to specified HVAC or building-equipment applications."
      ],
      "blockers": [
        "Do not match residential projects.",
        "Electronically commutated motor matching should not be treated as refrigeration EC motor replacement; the checked HVAC sheet supports ECMs on VAV fan-powered boxes.",
        "EV charger rebates on Georgia Power business pages are separate from the CEEP efficiency opportunity.",
        "Heat-pump water heater is commercial water heating only and does not imply residential HPWH eligibility."
      ],
      "programType": "Commercial Energy-Efficiency Rebate Program",
      "administrator": "Georgia Power Company",
      "applicationUrl": "https://georgiapowercommercialrebates.com/",
      "websiteUrl": "https://www.georgiapower.com/business/products-programs/efficiency-maintenance/ceep.html",
      "sourceUrlsChecked": [
        "https://www.georgiapower.com/business/products-programs/efficiency-maintenance/ceep.html",
        "https://www.georgiapower.com/business/save-money-and-energy/commercial-rebates-and-incentives.html",
        "https://www.georgiapower.com/content/dam/georgia-power/pdfs/programs/ceep/57401_GP_Commercial_26-28_Heating_and_Cooling_v05_Release_Web.pdf",
        "https://www.georgiapower.com/content/dam/georgia-power/pdfs/programs/ceep/57401_GP_Commercial_26-28_Water_Heater_v05_Release_Web.pdf",
        "https://www.georgiapower.com/content/dam/georgia-power/pdfs/programs/ceep/57401_GP_Commercial_26-28_Existing_Building_Lighting_v05_Release_Web.pdf",
        "https://www.georgiapower.com/content/dam/georgia-power/pdfs/programs/ceep/57401_GP_Commercial_26-28_Food_Service_and_Grocery_v05_Release_Web.pdf"
      ],
      "evidenceText": "Georgia]( Power’s CEEP page lists commercial lighting, heating and cooling, food service and grocery, water heaters, building tune-up, envelope and custom categories for commercial-tariff customers.",
      "reasoningNotes": "Retained commercial HVAC, lighting, controls, HPWH and food-service/grocery measures. Recast ECM as HVAC/building equipment rather than refrigeration EC motor because the current HVAC sheet supports VAV-box ECMs."
    },
    "existingSimpleRules": [
      {
        "id": "oir_106f82f31cc55719_v1",
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
        "formula": "$500 per eligible commercial heat pump water heater",
        "evidenceText": "Georgia Power business rebate table lists Heat Pump Water Heater at $500 per unit.",
        "sourceUrlsChecked": [
          "https://www.georgiapower.com/business/products-programs/efficiency-maintenance/ceep.html"
        ],
        "reasoningNotes": "Matched heat pump water heater term from the commercial efficiency table.",
        "mapping": {
          "primarySavingsModelId": "commercial_kitchen_equipment_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_cfba7dea68f31ada_v1",
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
        "confidence": "high",
        "formula": "$350 per ENERGY STAR commercial dishwasher",
        "evidenceText": "Georgia Power business rebate table lists Commercial Dishwasher at $350 per unit.",
        "sourceUrlsChecked": [
          "https://www.georgiapower.com/business/products-programs/efficiency-maintenance/ceep.html"
        ],
        "reasoningNotes": "Matched commercial kitchen and dishwasher terms.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2278",
    "opportunityName": "Sawnee EMC - Residential Energy Efficiency Rebate Program",
    "state": "GA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2278/sawnee-emc-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://sawnee.coop/rebates-and-incentives",
    "applicationUrl": null,
    "administrator": "Sawnee Electric Membership Corporation",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 8,
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
          "GA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Sawnee EMC service territory"
        ],
        "notes": "Eligibility is limited to Sawnee EMC residential members and measure-specific service addresses. Commercial lighting and DC fast charging are separate Sawnee programs."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "homeowner",
        "cooperative_member"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "insulation_upgrade",
        "heat_pump_water_heater",
        "hvac_tune_up",
        "variable_speed_pool_pump",
        "smart_thermostat_zoning_retrofit",
        "central_ac_load_management",
        "level_2_ev_charger_installation",
        "air_source_heat_pump",
        "high_efficiency_central_air_conditioner",
        "battery_demand_response_program"
      ],
      "hardRequirements": [
        "Member must submit invoices or receipts and required documentation for 2026 work by the stated deadline.",
        "Attic insulation must meet the listed R-value requirement and is excluded for newer homes under the current rule.",
        "Heat pump and central air conditioner rebates require qualifying SEER2 performance and load-management participation.",
        "Smart thermostat rebates require Smart Savers or Load Management enrollment.",
        "Level 2 charger rebates require a qualifying fully electric vehicle, a new eligible charger, and a time-of-use or similar rate commitment."
      ],
      "blockers": [
        "Air sealing and duct sealing were not listed on the current 2026 Sawnee residential rebate page and should be blocked.",
        "EV matching must be Level 2 only; commercial DC fast charging is a separate program.",
        "Commercial lighting and equipment rebates are separate from this residential program.",
        "HVAC tune-up does not cover gas furnaces.",
        "Smart thermostat rebates cannot match unless the required demand-response enrollment is included."
      ],
      "programType": "Rebate Program",
      "administrator": "Sawnee Electric Membership Corporation",
      "applicationUrl": null,
      "websiteUrl": "https://sawnee.coop/rebates-and-incentives",
      "sourceUrlsChecked": [
        "https://sawnee.coop/rebates-and-incentives",
        "https://sawnee.coop/level-2-charger-rebate-requirements"
      ],
      "evidenceText": "Sawnee's]( current rebate page lists 2026 residential incentives for attic insulation, hybrid or heat pump water heaters, HVAC tune-ups, variable-speed pool pumps, smart thermostats with program enrollment, load management, Level 2 EV chargers, heat pumps, and central air conditioners.",
      "reasoningNotes": "The original EV, heat pump, HVAC, insulation, and thermostat matches are supported with restrictions. Air sealing and duct sealing are not supported by the current source."
    },
    "existingSimpleRules": [
      {
        "id": "oir_4a4ea8647a8857a2_v1",
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
          "maxAmountCents": 20000
        },
        "confidence": "high",
        "formula": "50% of Level 2 EV charger installation cost, capped at $200",
        "evidenceText": "Sawnee EMC lists one-half of total cost up to a maximum $200 rebate for installing a Level 2 PEV charger.",
        "sourceUrlsChecked": [
          "https://sawnee.coop/rebates-and-incentives",
          "https://sawnee.coop/level-2-charger-rebate-requirements"
        ],
        "reasoningNotes": "Matched Level 2 EV charger terms. Requires participation in TOU, PEV, or CPPR rate.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5035",
    "opportunityName": "Dominion Energy - ThermWise Residential Energy Efficiency Rebate Programs",
    "state": "ID",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5035/dominion-energy-thermwise-residential-energy-efficiency-rebate-programs",
    "websiteUrl": "https://www.enbridgegas.com/utwyid/save-money/thermwise",
    "applicationUrl": null,
    "administrator": "Enbridge Gas ThermWise",
    "programType": "Residential Natural Gas Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 8,
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
          "ID"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Enbridge Gas ThermWise Idaho natural gas service territory"
        ],
        "notes": "ThermWise also covers Utah and Wyoming, but this record should match eligible Idaho gas customers only."
      },
      "eligibleApplicantTypes": [
        "residential_natural_gas_customer",
        "homeowner",
        "tenant_where_allowed"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "air_sealing_weatherization",
        "boiler_controls_burner_retrofit",
        "duct_sealing_and_insulation",
        "energy_recovery_ventilation_retrofit",
        "high_efficiency_boiler_retrofit",
        "high_efficiency_furnace_retrofit",
        "dual_fuel_heat_pump_system",
        "insulation_upgrade",
        "exterior_wall_insulation",
        "pipe_insulation",
        "smart_thermostat",
        "high_efficiency_gas_water_heater",
        "tankless_gas_water_heater",
        "smart_water_heater_controller",
        "solar_assisted_gas_water_heater",
        "window_replacement"
      ],
      "hardRequirements": [
        "Applicant must be an eligible Idaho ThermWise residential natural gas customer.",
        "Measures must use qualifying gas equipment or listed weatherization.",
        "Dual-fuel heat pump systems must meet ThermWise criteria."
      ],
      "blockers": [
        "Do not match standalone all-electric heat pumps or HPWHs.",
        "Do not treat Utah or Wyoming eligibility as Idaho eligibility.",
        "Solar is limited to solar-assisted gas water heating."
      ],
      "programType": "Residential Natural Gas Rebate Program",
      "administrator": "Enbridge Gas ThermWise",
      "applicationUrl": null,
      "websiteUrl": "https://www.enbridgegas.com/utwyid/save-money/thermwise",
      "sourceUrlsChecked": [
        "https://www.enbridgegas.com/utwyid/save-money/thermwise",
        "https://www.enbridgegas.com/utwyid/save-money/thermwise/appliance-rebates",
        "https://www.enbridgegas.com/utwyid/save-money/thermwise/weatherization-rebates"
      ],
      "evidenceText": "Current]( ThermWise pages list residential gas appliance and weatherization rebates including furnaces, boilers, thermostats, ERV, ducts, insulation, air sealing, windows, and gas water heating.",
      "reasoningNotes": "Administrator updated to Enbridge Gas ThermWise; categories limited to gas and weatherization measures."
    },
    "existingSimpleRules": [
      {
        "id": "oir_680d05e3d7877077_v1",
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
        "formula": "$100 per residential gas boiler reset control",
        "evidenceText": "ThermWise appliance rebates list Residential Gas Boiler Reset Control at $100.",
        "sourceUrlsChecked": [
          "https://www.enbridgegas.com/utwyid/save-money/thermwise/appliance-rebates"
        ],
        "reasoningNotes": "Matched boiler reset term. Applies to eligible after-market controls.",
        "mapping": {
          "primarySavingsModelId": "gas_usage_reduction",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_d9cfe53da93956b9_v1",
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
        "evidenceText": "ThermWise appliance rebates list Smart Thermostat Tier 2 at $75.",
        "sourceUrlsChecked": [
          "https://www.enbridgegas.com/utwyid/save-money/thermwise/appliance-rebates"
        ],
        "reasoningNotes": "Matched smart thermostat term. Tier 2 is the relevant connected-control candidate.",
        "mapping": {
          "primarySavingsModelId": "gas_usage_reduction",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_f077f725b9a5ecea_v1",
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
        "formula": "$300 per residential energy recovery ventilation system",
        "evidenceText": "ThermWise appliance rebates list Energy Recovery Ventilation at $300.",
        "sourceUrlsChecked": [
          "https://www.enbridgegas.com/utwyid/save-money/thermwise/appliance-rebates"
        ],
        "reasoningNotes": "Matched energy recovery ventilation term. Returned as a separate candidate.",
        "mapping": {
          "primarySavingsModelId": "gas_usage_reduction",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5233",
    "opportunityName": "Peoples Gas - Residential Rebate Program",
    "state": "IL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5233/peoples-gas-residential-rebate-program",
    "websiteUrl": "https://www.peoplesgasdelivery.com/savings/rebates-residential",
    "applicationUrl": "https://customerrebate-efficiencynavigator.azurewebsites.net/PartnerLink?clientProgramId=304",
    "administrator": "Peoples Gas",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 8,
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
          "IL"
        ],
        "counties": [],
        "cities": [
          "Chicago"
        ],
        "utilityTerritories": [
          "Peoples Gas natural gas service territory"
        ],
        "notes": "Eligibility is limited to Peoples Gas residential gas customers, including eligible single-family homes, two-flats, and individually metered condos or townhomes."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "homeowner",
        "renter",
        "landlord",
        "property_owner"
      ],
      "eligibleSectors": [
        "residential",
        "multifamily_residential"
      ],
      "eligibleRetrofitCategories": [
        "air_sealing_weatherization",
        "insulation_upgrade",
        "high_efficiency_furnace_retrofit",
        "high_efficiency_boiler_retrofit",
        "high_efficiency_gas_water_heater",
        "smart_thermostat_zoning_retrofit",
        "gas_heat_pump",
        "space_heating_pipe_insulation",
        "domestic_hot_water_pipe_insulation"
      ],
      "hardRequirements": [
        "Applicant must be an eligible Peoples Gas residential customer in the service territory.",
        "Equipment must be new and installed at an eligible residence, with old equipment removed where required.",
        "Measures must meet the efficiency, installation, and documentation requirements in the current Peoples Gas rebate materials.",
        "Rebate may not exceed the project cost, and required invoices and product data must be submitted."
      ],
      "blockers": [
        "Duct sealing was not verified as a current Peoples Gas residential rebate category and should not be matched unless a current official source is found.",
        "Do not match electric heat pumps, EV chargers, lighting, or general appliances to this natural gas residential program.",
        "Do not infer broad HVAC replacement beyond listed gas furnaces, boilers, gas water heating, gas heat pumps, thermostats, and pipe insulation.",
        "Commercial and industrial gas measures are separate programs and should not match this residential opportunity."
      ],
      "programType": "Rebate Program",
      "administrator": "Peoples Gas",
      "applicationUrl": "https://customerrebate-efficiencynavigator.azurewebsites.net/PartnerLink?clientProgramId=304",
      "websiteUrl": "https://www.peoplesgasdelivery.com/savings/rebates-residential",
      "sourceUrlsChecked": [
        "https://www.peoplesgasdelivery.com/savings/rebates-residential",
        "https://www.peoplesgasdelivery.com/savings/pdf/residential_hvac.pdf",
        "https://customerrebate-efficiencynavigator.azurewebsites.net/PartnerLink?clientProgramId=304"
      ],
      "evidenceText": "The]( current Peoples Gas residential rebate page lists furnaces, boilers, water heaters, smart thermostats, insulation, air sealing, weatherization, gas heat pumps, and space-heating or domestic-hot-water pipe insulation for eligible residential gas customers.",
      "reasoningNotes": "Most original matches are supported except duct sealing. The category list should stay gas-residential specific and should not be generalized to electric or commercial measures."
    },
    "existingSimpleRules": [
      {
        "id": "oir_dc593601ec000314_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 2500,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$25 per smart thermostat",
        "evidenceText": "Peoples Gas residential rebate portal lists smart thermostat rebate at $25.",
        "sourceUrlsChecked": [
          "https://www.peoplesgasdelivery.com/savings/rebates-residential",
          "https://customerrebate-efficiencynavigator.azurewebsites.net/PartnerLink?clientProgramId=304"
        ],
        "reasoningNotes": "Matched smart thermostat/control terms. Use one unit as one eligible thermostat.",
        "mapping": {
          "primarySavingsModelId": "controls_building_automation",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_f06d957880a5169a_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 22500,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$225 per 97%+ AFUE furnace",
        "evidenceText": "Peoples Gas rebate portal lists 97% efficient or greater furnaces at $225.",
        "sourceUrlsChecked": [
          "https://www.peoplesgasdelivery.com/savings/rebates-residential",
          "https://customerrebate-efficiencynavigator.azurewebsites.net/PartnerLink?clientProgramId=304"
        ],
        "reasoningNotes": "Matched furnace term. Returned separately from thermostat.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1806",
    "opportunityName": "Chicopee Electric Light Department - Residential Energy Efficiency Rebate Program",
    "state": "MA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1806/chicopee-electric-light-department-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.celd.com/energy-star-appliance-rates",
    "applicationUrl": "https://rebates.nextzero.org/",
    "administrator": "Chicopee Electric Light Department",
    "programType": "Municipal Utility Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 8,
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
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "air conditioner"
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
          "MA"
        ],
        "counties": [],
        "cities": [
          "Chicopee"
        ],
        "utilityTerritories": [
          "Chicopee Electric Light Department service territory"
        ],
        "notes": "Limited to CEL residential customers in Chicopee service territory."
      },
      "eligibleApplicantTypes": [
        "residential municipal utility customer",
        "residential electric customer",
        "homeowner"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "energy_audit",
        "air_sealing_weatherization",
        "insulation_upgrade",
        "duct_sealing_and_insulation",
        "qualified_energy_star_heating_system",
        "heat_pump_hvac_retrofit",
        "heat_pump_water_heater",
        "room_air_conditioner",
        "smart_thermostat_zoning_retrofit",
        "high_efficiency_laundry_equipment",
        "heat_pump_clothes_dryer",
        "residential_refrigerator",
        "induction_range",
        "pool_heat_pump",
        "variable_speed_pool_pump",
        "air_purifier",
        "dehumidifier",
        "rechargeable_yard_equipment"
      ],
      "hardRequirements": [
        "Applicant must be a Chicopee Electric Light Department customer.",
        "Home efficiency work requires a NextZero or program audit before contractor work begins.",
        "Self-installed home-efficiency projects are not eligible for the home efficiency incentive.",
        "Post-installation inspection is required for home-efficiency projects.",
        "Appliance and equipment rebates require ENERGY STAR or other qualifying product criteria and cannot be combined with other offers where prohibited."
      ],
      "blockers": [
        "Battery storage is not a purchase or installation rebate in this opportunity; connected battery participation belongs to a separate demand-response program.",
        "EV chargers are handled through the separate Connected Homes demand-response enrollment, not this appliance or home-efficiency rebate.",
        "Induction is a residential range rebate, not commercial kitchen equipment.",
        "Refrigerator is a residential appliance rebate, not commercial refrigeration equipment.",
        "Energy audit is a service/prerequisite and should not be treated as a physical retrofit."
      ],
      "programType": "Municipal Utility Rebate Program",
      "administrator": "Chicopee Electric Light Department",
      "applicationUrl": "https://rebates.nextzero.org/",
      "websiteUrl": "https://www.celd.com/energy-star-appliance-rates",
      "sourceUrlsChecked": [
        "https://www.celd.com/energy-star-appliance-rates",
        "https://www.celd.com/home-efficiency-incentive-program",
        "https://www.celd.com/residential-engery-conservation",
        "https://www.celd.com/connected-homes"
      ],
      "evidenceText": "CEL lists ENERGY STAR appliance rebates for clothes washers, dryers, heat pump water heaters, room air conditioners, refrigerators, Wi-Fi thermostats, and induction ranges, plus home-efficiency incentives for air sealing, insulation, duct sealing, and heating systems.",
      "reasoningNotes": "Separated the residential appliance and home-efficiency rebates from Connected Homes demand response. Narrowed induction and refrigeration to residential products."
    },
    "existingSimpleRules": [
      {
        "id": "oir_65b3eb3db5fce86d_v1",
        "incentiveType": "percent_of_basis_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "percent_of_basis",
          "percent": 0.5
        },
        "basisPolicy": {
          "basis": "eligible_cost_categories",
          "applicationOrder": 10
        },
        "cap": {
          "maxAmountCents": 75000
        },
        "confidence": "medium",
        "formula": "50% of qualifying home efficiency project cost, capped at $750 per project",
        "evidenceText": "CEL Home Efficiency Incentive Program lists 50% of installed cost up to $750 per project.",
        "sourceUrlsChecked": [
          "https://www.celd.com/home-efficiency-incentive-program",
          "https://www.celd.com/rebates"
        ],
        "reasoningNotes": "Matched whole-home efficiency terms. The annual customer cap is separate and not modeled as a per-project rule.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1808",
    "opportunityName": "Concord Municipal Light Plant - Commercial Energy Efficiency Rebate Program",
    "state": "MA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1808/concord-municipal-light-plant-commercial-energy-efficiency-rebate-program",
    "websiteUrl": "https://concordma.gov/1989/Rebates-for-your-Business",
    "applicationUrl": null,
    "administrator": "Concord Municipal Light Plant",
    "programType": "Municipal Utility Business Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 8,
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
        "retrofitTypeId": "lighting_controls_retrofit",
        "displayName": "Lighting controls retrofit",
        "parentCategory": "lighting",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "lighting controls"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "MA"
        ],
        "counties": [],
        "cities": [
          "Concord"
        ],
        "utilityTerritories": [
          "Concord Municipal Light Plant service territory"
        ],
        "notes": "Limited to CMLP business, commercial, and qualifying multi-unit dwelling customers."
      },
      "eligibleApplicantTypes": [
        "commercial municipal utility customer",
        "business customer",
        "multi-unit dwelling property owner",
        "fleet customer",
        "institutional customer"
      ],
      "eligibleSectors": [
        "commercial",
        "multifamily",
        "institutional",
        "municipal"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "heat_pump_hvac_retrofit",
        "air_source_heat_pump",
        "ground_source_geothermal_heat_pump",
        "heat_pump_water_heater",
        "level_2_ev_charger_installation",
        "commercial_ev_charging_station",
        "energy_assessment_service"
      ],
      "hardRequirements": [
        "Applicant must be a CMLP business or qualifying commercial customer.",
        "Lighting projects must meet HELP program eligibility and demand-reduction rules.",
        "Heat pump projects are subject to per-ton incentives, technical specifications, and three-year customer caps.",
        "Commercial EV charging station rebates require pre-approval and an award letter before installation.",
        "Heat pump water heater rebates have commercial annual quantity limits and qualifying equipment requirements."
      ],
      "blockers": [
        "Residential home heat pump and residential EV charger incentives are separate from this business record.",
        "Solar panel incentives are a separate renewable energy offering and should not be matched unless that program is selected.",
        "Water-saving and Public Works rebates are separate programs.",
        "EV charging is a distinct CMLP commercial station rebate, not a generic energy-efficiency measure.",
        "Do not match broad water heating beyond heat pump water heaters."
      ],
      "programType": "Municipal Utility Business Rebate Program",
      "administrator": "Concord Municipal Light Plant",
      "applicationUrl": null,
      "websiteUrl": "https://concordma.gov/1989/Rebates-for-your-Business",
      "sourceUrlsChecked": [
        "https://concordma.gov/1989/Rebates-for-your-Business",
        "https://concordma.gov/2003/Commercial-Lighting-Rebates---HELP",
        "https://concordma.gov/3372/Heat-Pump-Rebates-for-Your-Business",
        "https://concordma.gov/2024/Heat-Pump-Water-Heaters",
        "https://concordma.gov/3201/Commercial-EV-Charging-Station-Rebate",
        "https://concordma.gov/3400/Electric-Vehicles-and-Charging-for-Comme",
        "https://concordma.gov/1753/Your-Business"
      ],
      "evidenceText": "CMLP business pages list HELP lighting upgrades with controls, commercial heat pump rebates, heat pump water heater rebates, and commercial Level 2 EV charging station rebates requiring pre-approval.",
      "reasoningNotes": "Kept EV charging because it is an official business rebate path on the same CMLP business rebate area, but marked it as a distinct station rebate."
    },
    "existingSimpleRules": [
      {
        "id": "oir_2fbd2b27cd72f519_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 600000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "Up to $6,000 for installation of a Level 2 commercial EV charging station",
        "evidenceText": "Concord commercial EV page says businesses and multi-unit properties can get up to $6,000 for Level 2 EV charging station installation.",
        "sourceUrlsChecked": [
          "https://concordma.gov/3201/Commercial-EV-Charging-Station-Rebate",
          "https://concordma.gov/1989/Rebates-for-your-Business"
        ],
        "reasoningNotes": "Matched commercial EV charging and Level 2 terms. Modeled per charging station with medium confidence because source says up to.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4429",
    "opportunityName": "Coldwater Board of Public Utilities - Commercial & Industrial Energy Efficiency Rebate Program",
    "state": "MI",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4429/coldwater-board-of-public-utilities-commercial-and-industrial-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.coldwater.org/232/Energy-Efficiency-Rebates",
    "applicationUrl": "https://www.coldwater.org/DocumentCenter/View/4344/2026-Business--Industrial-Energy-Efficiency-Rebate-Application",
    "administrator": "Coldwater Board of Public Utilities",
    "programType": "Commercial Industrial Utility Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 8,
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
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "chiller"
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
          "hvac controls"
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
        "retrofitTypeId": "lighting_controls_retrofit",
        "displayName": "Lighting controls retrofit",
        "parentCategory": "lighting",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "lighting controls"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "MI"
        ],
        "counties": [],
        "cities": [
          "Coldwater"
        ],
        "utilityTerritories": [
          "Coldwater Board of Public Utilities electric service territory"
        ],
        "notes": "Limited to CBPU commercial and industrial electric customers."
      },
      "eligibleApplicantTypes": [
        "commercial electric customer",
        "industrial electric customer",
        "business customer",
        "municipal utility customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "institutional",
        "municipal"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "hvac_controls_retrofit",
        "building_energy_management_system",
        "variable_frequency_drive_retrofit",
        "high_efficiency_hvac_replacement",
        "heat_pump_hvac_retrofit",
        "ductless_mini_split_heat_pump",
        "packaged_terminal_heat_pump",
        "heat_pump_water_heater",
        "chiller_maintenance",
        "high_efficiency_refrigeration_equipment",
        "commercial_kitchen_equipment",
        "commercial_dishwasher",
        "low_flow_pre_rinse_sprayer",
        "compressed_air_efficiency",
        "compressed_air_leak_repair",
        "electric_forklift_material_handling",
        "level_2_ev_charger_installation",
        "level_3_ev_charger_installation",
        "electric_lawn_equipment"
      ],
      "hardRequirements": [
        "Applicant must be a CBPU commercial or industrial electric customer.",
        "Equipment must be installed and operational by the program deadline and documentation submitted by the stated deadline.",
        "Pre-approval is required for custom projects and may be required before purchase or installation.",
        "Lighting and non-lighting measures must meet minimum annual operating-hour requirements.",
        "Incentives are capped by project cost, meter, and annual program limits; inspections and documentation are required."
      ],
      "blockers": [
        "Do not match broad energy audits; only specified compressed-air evaluation and leak-repair measures were verified.",
        "Low-flow pre-rinse spray valve is product-specific and requires electric water heating; it is not a broad plumbing or water-conservation retrofit.",
        "Do not infer residential rebates from this commercial and industrial application.",
        "Peak shaving, demand limiting, and operating schedule changes are not eligible."
      ],
      "programType": "Commercial Industrial Utility Rebate Program",
      "administrator": "Coldwater Board of Public Utilities",
      "applicationUrl": "https://www.coldwater.org/DocumentCenter/View/4344/2026-Business--Industrial-Energy-Efficiency-Rebate-Application",
      "websiteUrl": "https://www.coldwater.org/232/Energy-Efficiency-Rebates",
      "sourceUrlsChecked": [
        "https://www.coldwater.org/232/Energy-Efficiency-Rebates",
        "https://www.coldwater.org/DocumentCenter/View/4344/2026-Business--Industrial-Energy-Efficiency-Rebate-Application"
      ],
      "evidenceText": "CBPU's 2026 business and industrial application covers lighting, controls, VFDs, compressed air, HVAC, heat pumps, heat pump water heaters, refrigeration, commercial kitchen equipment, EV chargers, and forklifts.",
      "reasoningNotes": "Retained C&I equipment categories with application support and removed the broad audit/plumbing interpretations."
    },
    "existingSimpleRules": [
      {
        "id": "oir_98857540c194f3d7_v1",
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
        "confidence": "medium",
        "formula": "$100 per eligible unit",
        "evidenceText": "__ 2026 CBPU Business & Industrial Rebate Program Application 6 of 14 Simply Efficient Controls Worksheet Measure Specs Quantity $/Unit Total HVAC Controls Programmable Smart Thermostat Must control central A/C & replace non-programmable thermostat $100/unit $ Must control central AC and replace a non-programmable building management system",
        "sourceUrlsChecked": [
          "http://www.coldwater.org/DocumentCenter/View/4344/2025-Business-Solutions-Energy-Efficiency-Rebate-Form?bidId="
        ],
        "reasoningNotes": "",
        "mapping": {
          "primarySavingsModelId": "refrigeration_electric_efficiency",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4275",
    "opportunityName": "Coldwater Board of Public Utilities - Residential Energy Efficiency Rebate Program",
    "state": "MI",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4275/coldwater-board-of-public-utilities-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.coldwater.org/232/Energy-Efficiency-Rebates",
    "applicationUrl": "https://www.coldwater.org/DocumentCenter/View/5127/2026-CBPU-Residential-Rebate-Application-fillable-PDF",
    "administrator": "Coldwater Board of Public Utilities",
    "programType": "Residential Energy Efficiency Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 8,
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
          "mini split",
          "ductless"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_commercial_dishwasher",
        "displayName": "High-efficiency commercial dishwasher",
        "parentCategory": "commercial_kitchen_foodservice",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "dishwasher"
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
          "air conditioner",
          "air conditioning"
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
          "refrigerator",
          "freezer"
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
          "led lighting",
          "led lamp"
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
          "MI"
        ],
        "counties": [],
        "cities": [
          "Coldwater"
        ],
        "utilityTerritories": [
          "Coldwater Board of Public Utilities electric service territory"
        ],
        "notes": "Eligible Coldwater Board of Public Utilities residential customers."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customer"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "ductless_mini_split_heat_pump",
        "heat_pump_water_heater",
        "high_efficiency_hvac_replacement",
        "high_efficiency_clothes_washer",
        "heat_pump_clothes_dryer",
        "residential_dishwasher",
        "residential_refrigerator_freezer_rebate",
        "led_lighting_retrofit",
        "smart_thermostat",
        "residential_induction_cooking",
        "room_air_conditioner",
        "dehumidifier",
        "pool_pump",
        "level_2_ev_charger_installation"
      ],
      "hardRequirements": [
        "Applicant must be an eligible CBPU residential customer.",
        "Measures must meet the 2026 residential rebate list and application requirements.",
        "EV rebate applies only to qualifying Level 2 chargers."
      ],
      "blockers": [
        "Residential dishwasher is not commercial kitchen equipment.",
        "Residential refrigerator/freezer is not commercial refrigeration.",
        "Low-flow fixture retrofit is not supported."
      ],
      "programType": "Residential Energy Efficiency Rebate Program",
      "administrator": "Coldwater Board of Public Utilities",
      "applicationUrl": "https://www.coldwater.org/DocumentCenter/View/5127/2026-CBPU-Residential-Rebate-Application-fillable-PDF",
      "websiteUrl": "https://www.coldwater.org/232/Energy-Efficiency-Rebates",
      "sourceUrlsChecked": [
        "https://www.coldwater.org/232/Energy-Efficiency-Rebates",
        "https://www.coldwater.org/DocumentCenter/View/5128/2026-Residential-Rebates-List",
        "https://www.coldwater.org/DocumentCenter/View/5127/2026-CBPU-Residential-Rebate-Application-fillable-PDF"
      ],
      "evidenceText": "Coldwater's]( 2026 list includes HVAC, HPWHs, thermostats, laundry, dishwashers, refrigerator/freezer, LEDs, induction, room AC, pool pumps, and Level 2 EV chargers.",
      "reasoningNotes": "Narrowed appliance matches to residential products and removed low-flow plumbing."
    },
    "existingSimpleRules": [
      {
        "id": "oir_0a32fca81b3022d6_v1",
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
        "formula": "$50 per ENERGY STAR refrigerator or freezer",
        "evidenceText": "The 2026 CBPU application lists ENERGY STAR Refrigerator and ENERGY STAR Freezer rebates at $50.",
        "sourceUrlsChecked": [
          "https://www.coldwater.org/232/Energy-Efficiency-Rebates",
          "https://www.coldwater.org/DocumentCenter/View/5127/2026-CBPU-Residential-Rebate-Application-fillable-PDF"
        ],
        "reasoningNotes": "Matched refrigerator/freezer terms. Use one unit as one eligible appliance.",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_af17df29bbc7ced9_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 15000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$150 per ENERGY STAR heat pump water heater",
        "evidenceText": "The 2026 CBPU application lists ENERGY STAR Heat Pump Water Heater rebate at $150.",
        "sourceUrlsChecked": [
          "https://www.coldwater.org/232/Energy-Efficiency-Rebates",
          "https://www.coldwater.org/DocumentCenter/View/5127/2026-CBPU-Residential-Rebate-Application-fillable-PDF"
        ],
        "reasoningNotes": "Matched heat pump water heater term. Use one unit as one qualifying HPWH.",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_b30371dbc3839533_v1",
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
        "formula": "$50 per smart or Wi-Fi thermostat",
        "evidenceText": "The 2026 CBPU residential application lists Smart/Wi-Fi Thermostat rebate at $50.",
        "sourceUrlsChecked": [
          "https://www.coldwater.org/232/Energy-Efficiency-Rebates",
          "https://www.coldwater.org/DocumentCenter/View/5127/2026-CBPU-Residential-Rebate-Application-fillable-PDF"
        ],
        "reasoningNotes": "Matched thermostat term from the official 2026 residential rebate application.",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_cb92f8eb71690a27_v1",
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
        "formula": "Up to $500 per central air-source heat pump system at SEER2 19+",
        "evidenceText": "The 2026 CBPU application lists central air-source heat pump system tiers up to $500.",
        "sourceUrlsChecked": [
          "https://www.coldwater.org/232/Energy-Efficiency-Rebates",
          "https://www.coldwater.org/DocumentCenter/View/5127/2026-CBPU-Residential-Rebate-Application-fillable-PDF"
        ],
        "reasoningNotes": "Matched heat pump term. Returned the highest published tier as a candidate where equipment efficiency is known.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2448",
    "opportunityName": "Connexus Energy - Commercial Energy Efficiency Rebate Programs",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2448/connexus-energy-commercial-energy-efficiency-rebate-programs",
    "websiteUrl": "https://www.connexusenergy.com/business/save-money-and-energy/programs-and-rebates",
    "applicationUrl": null,
    "administrator": "Connexus Energy",
    "programType": "Commercial Utility Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 8,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
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
          "chiller"
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
          "fixture"
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
        "cities": [],
        "utilityTerritories": [
          "Connexus Energy service territory"
        ],
        "notes": "Limited to Connexus Energy commercial, business, and eligible agricultural members."
      },
      "eligibleApplicantTypes": [
        "commercial electric member",
        "business customer",
        "industrial customer",
        "agricultural customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "agricultural",
        "institutional"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "variable_frequency_drive_retrofit",
        "premium_efficiency_motor",
        "high_efficiency_hvac_replacement",
        "central_air_conditioner_replacement",
        "chiller_upgrade",
        "hvac_economizer",
        "heat_pump_hvac_retrofit",
        "ground_source_geothermal_heat_pump",
        "water_source_heat_pump",
        "ductless_mini_split_heat_pump",
        "packaged_terminal_heat_pump",
        "commercial_kitchen_equipment",
        "induction_cooking_equipment",
        "electric_forklift_material_handling",
        "compressed_air_efficiency",
        "commercial_new_construction_energy_study",
        "custom_energy_efficiency_project",
        "energy_management_system",
        "high_efficiency_refrigeration_equipment",
        "level_2_ev_charger_installation",
        "agricultural_vfd",
        "irrigation_pump_vfd",
        "ventilation_fan_upgrade",
        "engine_block_heater_timer"
      ],
      "hardRequirements": [
        "Applicant must be a Connexus Energy business or eligible member.",
        "Applications and supporting documents must be submitted by the stated program deadline.",
        "Pre-approval is required for prescriptive rebates above the threshold and for all custom incentives.",
        "Invoices, specification sheets, and W-9 documentation are required as applicable.",
        "Rebates are capped by equipment cost, member annual limit, funding availability, and program cost-effectiveness rules."
      ],
      "blockers": [
        "Do not match low-flow fixture retrofit; the verified fixture references are lighting fixtures, not water fixtures.",
        "EV charger support is for qualifying Level 2 workplace or public chargers, not vehicle purchase.",
        "Custom incentives require pre-approval and cost-effectiveness or payback review.",
        "Whole-building study is planning or new construction support and should not be treated as a physical retrofit unless installed measures are separately eligible."
      ],
      "programType": "Commercial Utility Rebate Program",
      "administrator": "Connexus Energy",
      "applicationUrl": null,
      "websiteUrl": "https://www.connexusenergy.com/business/save-money-and-energy/programs-and-rebates",
      "sourceUrlsChecked": [
        "https://www.connexusenergy.com/business/save-money-and-energy/programs-and-rebates",
        "https://www.connexusenergy.com/download_file/view/38611c9e-ee81-4309-abf4-b1185a6a31d4/412",
        "https://www.connexusenergy.com/download_file/view/1de1032f-e866-4038-a9dc-1717edf0868d/445",
        "https://www.connexusenergy.com/download_file/view/3a2223f2-42b6-4942-bbce-f68e9ed251ad/412"
      ],
      "evidenceText": "Connexus business pages list LED lighting, VFDs, HVAC, heat pumps, commercial kitchen equipment, forklifts, compressed air, custom incentives, refrigeration, agricultural rebates, and Level 2 EV chargers.",
      "reasoningNotes": "Removed the water-fixture false positive and retained only business, commercial, agricultural, and custom measures supported by Connexus sources."
    },
    "existingSimpleRules": [
      {
        "id": "oir_d36b0e339c1da812_v1",
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
        "confidence": "medium",
        "formula": "$1,000 per eligible unit",
        "evidenceText": "Apply for a Level 2 Charger Rebate Qualify for a Level 2 EV Charger Rebate between $500 and $1,000 depending on the charging station installed",
        "sourceUrlsChecked": [
          "https://www.connexusenergy.com/business/save-money-and-energy/programs-and-rebates"
        ],
        "reasoningNotes": "",
        "mapping": {
          "primarySavingsModelId": "fleet_fuel_replacement",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3282",
    "opportunityName": "Minnesota Power - Residential New Construction Rebate Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3282/minnesota-power-residential-new-construction-rebate-program",
    "websiteUrl": "https://www.mnpower.com/RNC",
    "applicationUrl": null,
    "administrator": "Minnesota Power",
    "programType": "Residential New-Construction Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 8,
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
        "retrofitTypeId": "energy_recovery_ventilation_retrofit",
        "displayName": "Energy recovery ventilation retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "erv",
          "hrv"
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
          "MN"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Minnesota Power"
        ],
        "notes": "Applies to qualifying residential new construction in Minnesota Power territory, not existing-home retrofit work."
      },
      "eligibleApplicantTypes": [
        "home_builder",
        "homeowner",
        "residential_customer"
      ],
      "eligibleSectors": [
        "residential_new_construction"
      ],
      "eligibleRetrofitCategories": [
        "new_construction_air_sealing",
        "new_construction_insulation",
        "new_construction_window",
        "new_construction_heat_pump_hvac",
        "new_construction_ground_source_heat_pump",
        "new_construction_heat_pump_water_heater",
        "new_construction_energy_recovery_ventilation",
        "new_construction_building_certification",
        "ecm_circulator_pump"
      ],
      "hardRequirements": [
        "Home must be new construction in Minnesota Power territory.",
        "Home must be heated primarily with electric heat.",
        "Home must include an ERV or HRV with at least the required sensible recovery efficiency.",
        "Program participation includes plan review, inspections, blower-door testing and thermal-scan requirements.",
        "Measure incentives must meet Minnesota Power’s R-value, U-value, heat-pump, ERV or HRV and equipment specifications."
      ],
      "blockers": [
        "Do not match existing-building retrofit projects; this is a residential new-construction program.",
        "Do not match LED lighting because the current Residential New Construction page checked did not list a LED lighting incentive.",
        "Air sealing, insulation, windows, heat pumps and HPWH are construction-stage measures, not standalone retrofit rebates.",
        "Do not match homes not primarily heated by electricity."
      ],
      "programType": "Residential New-Construction Rebate Program",
      "administrator": "Minnesota Power",
      "applicationUrl": null,
      "websiteUrl": "https://www.mnpower.com/RNC",
      "sourceUrlsChecked": [
        "https://www.mnpower.com/RNC",
        "https://www.mnpower.com/rebates"
      ],
      "evidenceText": "Minnesota]( Power’s Residential New Construction page requires primary electric heat and ERV or HRV and lists incentives for air sealing, insulation, windows, heat pumps, HPWH and certification.",
      "reasoningNotes": "The original retrofit categories are technically measure-related but should not match existing-home retrofits. They were converted to new-construction-specific categories and LED was removed."
    },
    "existingSimpleRules": [
      {
        "id": "oir_10c80035bf86f097_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 120000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$1,200 per ton for ground-source heat pump installed by MNGHPA Master Installer",
        "evidenceText": "Minnesota Power new construction page lists GSHP by MNGHPA Master Installer at $1,200 per ton.",
        "sourceUrlsChecked": [
          "https://www.mnpower.com/RNC"
        ],
        "reasoningNotes": "Matched ground-source/geothermal heat pump term. Use unit_count as qualifying tons.",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_7ee097ae50b42e31_v1",
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
        "formula": "$300 per qualifying ERV/HRV",
        "evidenceText": "Minnesota Power new construction page lists ERV/HRV meeting program requirements at $300.",
        "sourceUrlsChecked": [
          "https://www.mnpower.com/RNC"
        ],
        "reasoningNotes": "Matched ERV/HRV term. Returned separately from heat pump candidates.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2182",
    "opportunityName": "Intercounty Electric Cooperative - Energy Efficiency Rebate Program",
    "state": "MO",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2182/intercounty-electric-cooperative-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.ieca.coop/rebates",
    "applicationUrl": null,
    "administrator": "Intercounty Electric Cooperative",
    "programType": "Energy Efficiency Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 8,
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
          "ground source heat pump",
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
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "air conditioner"
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
          "MO"
        ],
        "counties": [
          "Crawford",
          "Dent",
          "Gasconade",
          "Laclede",
          "Maries",
          "Phelps",
          "Pulaski",
          "Shannon",
          "Texas",
          "Wright"
        ],
        "cities": [],
        "utilityTerritories": [
          "Intercounty Electric Cooperative Association service territory"
        ],
        "notes": "Members with permanent facilities served directly by Intercounty Electric Cooperative."
      },
      "eligibleApplicantTypes": [
        "member_customer",
        "residential_electric_customer",
        "farm_customer_where_served",
        "small_commercial_customer_where_served"
      ],
      "eligibleSectors": [
        "residential",
        "agricultural",
        "commercial"
      ],
      "eligibleRetrofitCategories": [
        "ground_source_geothermal_heat_pump",
        "heat_pump_hvac_retrofit",
        "ductless_mini_split_heat_pump",
        "heat_pump_water_heater",
        "high_efficiency_hvac_replacement",
        "attic_insulation_upgrade",
        "basement_crawlspace_slab_insulation",
        "smart_thermostat"
      ],
      "hardRequirements": [
        "Applicant must be an Intercounty member served directly by the cooperative.",
        "Applications generally must be submitted within 60 days.",
        "After July 1, 2025, ducted ASHP and ducted mini-splits must be dual fuel with no electric backup."
      ],
      "blockers": [
        "Level 2 EV charger rebate ended December 31, 2025.",
        "Standard water heater and room AC rebates ended after June 30, 2025.",
        "Insulation is limited to listed attic or basement/crawl/slab conditions."
      ],
      "programType": "Energy Efficiency Rebate Program",
      "administrator": "Intercounty Electric Cooperative",
      "applicationUrl": null,
      "websiteUrl": "https://www.ieca.coop/rebates",
      "sourceUrlsChecked": [
        "https://www.ieca.coop/rebates"
      ],
      "evidenceText": "Intercounty's]( page lists current heat pump, geothermal, HPWH, insulation, and thermostat rebates, while noting EV, room AC, and standard water heater end dates.",
      "reasoningNotes": "EV charger removed as active because the official page says the rebate ended December 31, 2025."
    },
    "existingSimpleRules": [
      {
        "id": "oir_547dc2f9ed7380fb_v1",
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
        "formula": "$500 per eligible unit",
        "evidenceText": "To qualify for the $500/ton rebate a receipt from your gas provider must be submitted showing where new installation has taken place for the location otherwise only the $300/ton will be paid",
        "sourceUrlsChecked": [
          "https://www.ieca.coop/rebates"
        ],
        "reasoningNotes": "",
        "mapping": {
          "primarySavingsModelId": "ev_charging_site_load",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null,
          "businessRelevance": "mixed",
          "v1Readiness": "needs_quote"
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2966",
    "opportunityName": "Platte-Clay Electric Cooperative - Residential and Commercial Energy Efficiency Rebates",
    "state": "MO",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2966/platte-clay-electric-cooperative-residential-and-commercial-energy-efficiency-rebates",
    "websiteUrl": "https://pcec.coop/products/energy-product-rebates/",
    "applicationUrl": null,
    "administrator": "Platte-Clay Electric Cooperative",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 8,
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
          "MO"
        ],
        "counties": [
          "Buchanan",
          "Caldwell",
          "Clay",
          "Clinton",
          "DeKalb",
          "Platte",
          "Ray"
        ],
        "cities": [],
        "utilityTerritories": [
          "Platte-Clay Electric Cooperative service territory"
        ],
        "notes": "The official PCEC page states the cooperative serves members across the listed Missouri counties. Eligibility requires a PCEC member account."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "commercial_customer",
        "industrial_customer",
        "agricultural_customer",
        "cooperative_member"
      ],
      "eligibleSectors": [
        "residential",
        "commercial",
        "industrial",
        "agricultural"
      ],
      "eligibleRetrofitCategories": [
        "business_led_lighting_retrofit",
        "ground_source_geothermal_heat_pump",
        "dual_fuel_heat_pump",
        "ducted_mini_split_heat_pump",
        "ductless_mini_split_heat_pump",
        "heat_pump_water_heater",
        "smart_thermostat_zoning_retrofit",
        "level_2_ev_charger_installation"
      ],
      "hardRequirements": [
        "Applicant must be a PCEC member, and some measures require the member to be in good standing.",
        "Heat pump rebates require the listed minimum efficiency ratings, qualifying system type, and certified dealer installation where specified.",
        "Several heat pump categories require an electric storage water heater to be installed at the site.",
        "Business lighting applies to existing non-new-construction facilities with more than ten bulbs or fixtures and requires an energy audit.",
        "EV charger rebates require a new UL-listed Level 2 charger, qualifying annual usage, and off-peak charging requirements."
      ],
      "blockers": [
        "Do not match broad HVAC replacement unless the project is a listed geothermal, dual-fuel, ducted mini-split, or ductless mini-split heat pump.",
        "Business LED lighting is not a residential lighting rebate.",
        "EV eligibility is Level 2 charging only; do not infer DC fast charging or fleet electrification.",
        "Heat pump water heater rebates have cost caps, equipment limits, and replacement-type restrictions.",
        "Do not match non-electric fuel measures outside the specified dual-fuel heat pump backup requirement."
      ],
      "programType": "Rebate Program",
      "administrator": "Platte-Clay Electric Cooperative",
      "applicationUrl": null,
      "websiteUrl": "https://pcec.coop/products/energy-product-rebates/",
      "sourceUrlsChecked": [
        "https://pcec.coop/products/energy-product-rebates/",
        "https://pcec.coop/wp-content/uploads/2024/06/Electric-Vehicle-Charging-Station-Rebate-7.24.pdf",
        "https://pcec.coop/energy/pcec-electric-vehicle-program/"
      ],
      "evidenceText": "PCEC's]( current rebate page lists business lighting, ground-source heat pumps, dual-fuel heat pumps, ducted and ductless mini-splits, heat pump water heaters, and smart thermostats. Its EV charging form covers new Level 2 chargers for members meeting usage and off-peak conditions.",
      "reasoningNotes": "The original matches are mostly correct, but lighting and EV charging must be narrowed to business lighting and Level 2 chargers, and HVAC should be limited to listed heat pump categories."
    },
    "existingSimpleRules": [
      {
        "id": "oir_2decb3c1df577fee_v1",
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
        "formula": "$750 per eligible unit",
        "evidenceText": "Ground Source Heat Pump Rebate New ground source installations are eligible for a rebate of $750 per ton",
        "sourceUrlsChecked": [
          "http://www.pcec.coop/products/energy-product-rebates/"
        ],
        "reasoningNotes": "",
        "mapping": {
          "primarySavingsModelId": "ev_charging_site_load",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null,
          "businessRelevance": "mixed",
          "v1Readiness": "needs_quote"
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2990",
    "opportunityName": "PNM - Residential Energy Efficiency Rebate Program",
    "state": "NM",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2990/pnm-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.pnm.com/rebates",
    "applicationUrl": null,
    "administrator": "PNM",
    "programType": "Rebate And Midstream Instant Discount Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 8,
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
        "retrofitTypeId": "high_efficiency_commercial_dishwasher",
        "displayName": "High-efficiency commercial dishwasher",
        "parentCategory": "commercial_kitchen_foodservice",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "dishwasher"
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
          "NM"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "PNM electric service territory"
        ],
        "notes": "Available to eligible PNM residential electric customers in New Mexico."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customer",
        "homeowner",
        "renter_with_owner_or_account_authorization"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "heat_pump_water_heater",
        "high_efficiency_hvac_replacement",
        "advanced_evaporative_cooler",
        "residential_clothes_washer",
        "residential_clothes_dryer",
        "heat_pump_clothes_dryer",
        "residential_dishwasher",
        "induction_cooktop_range",
        "residential_refrigerator_freezer",
        "energy_star_window_replacement",
        "smart_thermostat",
        "variable_speed_pool_pump"
      ],
      "hardRequirements": [
        "Customer must be a PNM residential electric customer.",
        "Appliance and window rebates require qualifying ENERGY STAR or program-listed products and timely submission.",
        "HVAC, heat pump water heater, and thermostat incentives may be delivered through participating contractor or distributor channels."
      ],
      "blockers": [
        "Do not match commercial dishwasher, commercial refrigeration, or commercial kitchen equipment.",
        "Do not generalize residential induction cooktop or range rebates into commercial induction cooking equipment.",
        "Window eligibility is for ENERGY STAR residential windows, not broad envelope work."
      ],
      "programType": "Rebate And Midstream Instant Discount Program",
      "administrator": "PNM",
      "applicationUrl": null,
      "websiteUrl": "https://www.pnm.com/rebates",
      "sourceUrlsChecked": [
        "https://www.pnm.com/homerebates",
        "https://www.pnm.com/midstream",
        "https://www.pnm.com/rebates"
      ],
      "evidenceText": "PNM residential pages list appliance, induction, window, smart thermostat, pool pump, HVAC, heat pump system, and heat pump water heater incentives for residential electric customers.",
      "reasoningNotes": "Residential appliance names caused commercial false positives. Preserve window replacement only as ENERGY STAR residential window replacement."
    },
    "existingSimpleRules": [
      {
        "id": "oir_9ffcb282cfe05143_v1",
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
        "formula": "$50 per ENERGY STAR certified smart thermostat",
        "evidenceText": "PNM smart thermostat brochure states residential customers are eligible to get $50 back per eligible thermostat.",
        "sourceUrlsChecked": [
          "https://www.pnm.com/documents/d/pnm.com/3-7-8-2-18-1125_pnm_res_6208505_2026-smart-thermostat-brochure_resreb_br_clean-1-22",
          "https://www.pnm.com/homerebates"
        ],
        "reasoningNotes": "Matched smart thermostat term. Use one unit as one eligible thermostat.",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_ecb3fe55a83576e6_v1",
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
        "formula": "$300 per ENERGY STAR heat pump water heater",
        "evidenceText": "PNM Home Checkup rebates list ENERGY STAR heat pump water heater at $300.",
        "sourceUrlsChecked": [
          "https://pnmhomecheckup.com/rebates",
          "https://www.pnm.com/homerebates"
        ],
        "reasoningNotes": "Matched heat pump water heater term. Use one unit as one qualifying HPWH.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4371",
    "opportunityName": "National Grid (Gas) - Commercial Energy Efficiency Rebate Programs (Metro New York)",
    "state": "NY",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4371/national-grid-gas-commercial-energy-efficiency-rebate-programs-metro-new-york",
    "websiteUrl": "https://www.nationalgridus.com/Services-Rebates?customerType=View+All&fuelType=Natural+Gas&locations=New+York+City&page=1&r=10",
    "applicationUrl": "https://www.amplifyincentives.com/NationalGridNYGas/",
    "administrator": "National Grid",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 8,
    "targetKind": "existing_simple_rule_v2_repair",
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
      },
      {
        "retrofitTypeId": "steam_trap_replacement",
        "displayName": "Steam trap replacement",
        "parentCategory": "compressed_air_industrial",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "steam trap"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "NY"
        ],
        "counties": [],
        "cities": [
          "New York City"
        ],
        "utilityTerritories": [
          "National Grid Metro New York natural gas service territory"
        ],
        "notes": "National Grid distinguishes New York City, Long Island, and upstate natural gas service areas. Matching should require the customer's National Grid gas account and the correct downstate territory."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "industrial_customer",
        "small_business_customer",
        "non_residential_gas_customer",
        "institutional_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "institutional",
        "small_business"
      ],
      "eligibleRetrofitCategories": [
        "commercial_weatherization",
        "duct_sealing_and_insulation",
        "pipe_insulation",
        "commercial_gas_custom_efficiency_measures",
        "facility_energy_check",
        "engineering_study",
        "steam_trap_survey",
        "commercial_gas_heating_hot_water_equipment",
        "commercial_kitchen_gas_efficiency_equipment"
      ],
      "hardRequirements": [
        "Applicant must be a National Grid nonresidential natural gas customer in the applicable Metro New York service area.",
        "Weatherization and custom measures must follow the current National Grid program guide and receive any required preapproval before construction.",
        "Engineering studies, facility checks, and steam trap surveys are technical assistance offerings and should not be treated as physical retrofits unless the resulting installation is separately approved.",
        "Incentives and eligible equipment must be verified in the current National Grid New York gas rebate portal or program guide before commitment."
      ],
      "blockers": [
        "Readable current official sources did not fully verify current boiler reset, smart thermostat, boiler replacement, or steam trap replacement prescriptive rebates for Metro New York C&I; require portal confirmation before matching those product-specific categories.",
        "Demand response is a separate program and should not be matched as this gas retrofit rebate.",
        "Multifamily rebate forms are separate from this C&I gas program and should not be used to infer commercial eligibility.",
        "Do not match electric measures or National Grid non-Metro service territories to this opportunity."
      ],
      "programType": "Rebate Program",
      "administrator": "National Grid",
      "applicationUrl": "https://www.amplifyincentives.com/NationalGridNYGas/",
      "websiteUrl": "https://www.nationalgridus.com/Services-Rebates?customerType=View+All&fuelType=Natural+Gas&locations=New+York+City&page=1&r=10",
      "sourceUrlsChecked": [
        "https://www.nationalgridus.com/business",
        "https://www.nationalgridus.com/ProNet/EE-Solutions-and-Incentives/Commercial-and-Industrial",
        "https://www.nationalgridus.com/Services-Rebates?customerType=View+All&fuelType=Natural+Gas&locations=New+York+City&page=1&r=10",
        "https://www.nationalgridus.com/media/pdfs/bus-ways-to-save/2026-national-grid-large-commercial-gas-and-electric-weatherization-programs-guidebook.pdf",
        "https://nyc-business.nyc.gov/nycbusiness/description/national-grid-bir-adr",
        "https://www.amplifyincentives.com/NationalGridNYGas/"
      ],
      "evidenceText": "Current]( National Grid sources show New York City business natural gas rebates, a gas rebate portal, commercial weatherization guidance, facility checks, engineering studies, steam trap surveys, heating and hot-water incentives, kitchen equipment, and custom rewards.",
      "reasoningNotes": "The program is active, but the current official rebate catalog details were only partly readable. Unsupported original matches should be blocked unless confirmed in the live National Grid gas portal."
    },
    "existingSimpleRules": [
      {
        "id": "oir_9d738b65f38c296b_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 250000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "$2,500 per eligible commercial boiler",
        "evidenceText": "DSIRE summary for National Grid Metro NY commercial gas lists boilers at $2,500.",
        "sourceUrlsChecked": [
          "https://www.nationalgridus.com/Services-Rebates?r=10&page=1&customerType=For+Businesses&locations=New+York+City&fuelType=Natural+Gas",
          "https://programs.dsireusa.org/system/program/detail/4371"
        ],
        "reasoningNotes": "Matched boiler term. Confidence is medium pending current official application table extraction.",
        "mapping": {
          "primarySavingsModelId": "controls_building_automation",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_f1914db5b2681cc9_v1",
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
        "formula": "$75 per thermostat",
        "evidenceText": "DSIRE summary for National Grid Metro NY commercial gas lists thermostat rebate at $75.",
        "sourceUrlsChecked": [
          "https://www.nationalgridus.com/Services-Rebates?r=10&page=1&customerType=For+Businesses&locations=New+York+City&fuelType=Natural+Gas",
          "https://programs.dsireusa.org/system/program/detail/4371"
        ],
        "reasoningNotes": "Matched thermostat term. Confidence is medium because the current official landing page did not expose the full measure table.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3291",
    "opportunityName": "Consolidated Electric Cooperative - Residential Rebate Program",
    "state": "OH",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3291/consolidated-electric-cooperative-residential-rebate-program",
    "websiteUrl": "https://www.consolidated.coop/electric/residential/rebates/",
    "applicationUrl": null,
    "administrator": "Consolidated Cooperative",
    "programType": "Utility Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 8,
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
          "OH"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Consolidated Cooperative electric service territory"
        ],
        "notes": "Limited to Consolidated Cooperative residential electric members/customers."
      },
      "eligibleApplicantTypes": [
        "residential electric cooperative member",
        "residential customer",
        "homeowner"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "electric_storage_water_heater_with_load_control",
        "heat_pump_water_heater",
        "heat_pump_hvac_retrofit",
        "dual_fuel_heat_pump_system",
        "ductless_mini_split_heat_pump",
        "ground_source_geothermal_heat_pump",
        "residential_refrigerator",
        "residential_freezer",
        "level_2_ev_charger_installation",
        "central_air_conditioner_replacement",
        "smart_thermostat_zoning_retrofit"
      ],
      "hardRequirements": [
        "Applicant must have a Consolidated Cooperative residential electric account.",
        "Receipts or proof of purchase must be submitted within the specified period.",
        "Many measures require inspection before rebate approval.",
        "Remote-control switch and five-year agreement requirements apply to listed water heater and dual-fuel heat pump measures.",
        "ENERGY STAR, size, efficiency, new-unused, UL or ETL, Wi-Fi, and other product requirements apply by measure."
      ],
      "blockers": [
        "Residential refrigerator and freezer rebates are appliance rebates, not commercial refrigeration equipment.",
        "EV charger support is for Level 2 chargers only; do not match DC fast charging or vehicle rebates.",
        "Ductless mini-split equipment must provide heating and cooling, not cooling-only service.",
        "On-demand and solar water heaters are excluded from the heat pump water heater rebate.",
        "Commercial equipment and large commercial air conditioning units are outside this residential record."
      ],
      "programType": "Utility Rebate Program",
      "administrator": "Consolidated Cooperative",
      "applicationUrl": null,
      "websiteUrl": "https://www.consolidated.coop/electric/residential/rebates/",
      "sourceUrlsChecked": [
        "https://www.consolidated.coop/electric/residential/rebates/"
      ],
      "evidenceText": "Consolidated lists residential rebates for heat pump water heaters, dual-fuel heat pumps, ductless mini-splits, geothermal, refrigerators, freezers, Level 2 EV chargers, central air conditioners, and smart thermostats.",
      "reasoningNotes": "Narrowed refrigeration and EV charger matches to residential appliances and Level 2 chargers. Kept geothermal and ductless because the official residential page lists them."
    },
    "existingSimpleRules": [
      {
        "id": "oir_7db94727ace66664_v1",
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
        "confidence": "medium",
        "formula": "$250 as a bill credit for a qualifying electric water heater or Level 2 charger candidate",
        "evidenceText": "Consolidated Cooperative residential rebate page lists a $250 bill-credit rebate for qualifying controlled electric water heater equipment.",
        "sourceUrlsChecked": [
          "https://www.consolidated.coop/electric/residential/rebates/",
          "https://programs.dsireusa.org/system/program/detail/3291"
        ],
        "reasoningNotes": "Target includes EV/HPWH/refrigeration terms. Confidence is medium because the exact current Level 2 charger amount was not confirmed on the official page.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22702",
    "opportunityName": "Ashland Electric Utility - Commercial Energy Efficiency Rebate Program",
    "state": "OR",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22702/ashland-electric-utility-commercial-energy-efficiency-rebate-program",
    "websiteUrl": "https://ashlandoregon.gov/590/Commercial-Incentives",
    "applicationUrl": "https://ashlandoregon.gov/FormCenter/Electric-Department-8/Climate-and-Energy-Incentive-Programs-On-81",
    "administrator": "Ashland Electric Utility",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 8,
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
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "OR"
        ],
        "counties": [],
        "cities": [
          "Ashland"
        ],
        "utilityTerritories": [
          "Ashland Electric Utility service territory"
        ],
        "notes": "Commercial Ashland Electric Utility customers; some programs also allow industrial, government, lodging or multifamily parameters by measure."
      },
      "eligibleApplicantTypes": [
        "commercial_electric_customers",
        "industrial_electric_customers",
        "government_electric_customers",
        "business_electric_customers",
        "registered_transient_occupancy_tax_contributors"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "government",
        "hospitality",
        "multifamily"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "heat_pump_water_heater",
        "packaged_terminal_heat_pump",
        "variable_refrigerant_flow_hvac",
        "level_2_ev_charger_installation",
        "induction_cooking_equipment",
        "rooftop_solar_pv",
        "high_efficiency_refrigeration_equipment",
        "commercial_building_shell_upgrade"
      ],
      "hardRequirements": [
        "Must have an active commercial Ashland Electric Utility account except commercial/workplace charging can also use transient occupancy tax contributor eligibility.",
        "Heating/cooling, refrigeration, building shell and lighting require free pre- and post-installation inspection by city staff.",
        "Equipment must meet appliance standards, replacement, storage/disposal and documentation requirements.",
        "EV chargers must be new Level 2 units; electrical upgrades must be by licensed electrician and code-compliant with required permits and invoices.",
        "Solar PV must be interconnected and net-metered, pass electric inspections, meet minimum 2500 W and TSRF requirements, and submit required forms and permits."
      ],
      "blockers": [
        "The fluorescent-to-LED replacement incentive had an August 31 2025 completion deadline and should be treated as unavailable for new LED retrofit matches.",
        "Refrigeration and building shell categories are listed by the city but require staff contact and pre/post inspection; do not infer specific equipment without staff or program confirmation.",
        "EV charging and solar PV are distinct sections on the same city commercial incentives page; do not generalize them to non-energy-efficiency rebates.",
        "Induction incentives apply only to permanent non-dual-fuel cooktops or ranges, not portable induction equipment."
      ],
      "programType": "Rebate Program",
      "administrator": "Ashland Electric Utility",
      "applicationUrl": "https://ashlandoregon.gov/FormCenter/Electric-Department-8/Climate-and-Energy-Incentive-Programs-On-81",
      "websiteUrl": "https://ashlandoregon.gov/590/Commercial-Incentives",
      "sourceUrlsChecked": [
        "https://ashlandoregon.gov/590/Commercial-Incentives",
        "https://ashlandoregon.gov/FormCenter/Electric-Department-8/Climate-and-Energy-Incentive-Programs-On-81"
      ],
      "evidenceText": "Ashland’s commercial page lists current incentives for ductless and air-source heat pumps, VRF, HPWH, PTHP, solar PV, workplace Level 2 charging and induction cooktops/ranges. Refrigeration/building shell require staff contact, and fluorescent-to-LED had an August 2025 deadline.",
      "reasoningNotes": "Kept the program active but removed active LED matching because the official LED completion deadline has passed."
    },
    "existingSimpleRules": [
      {
        "id": "oir_050dd27bf118bce7_v1",
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
        "confidence": "medium",
        "formula": "$1,000 per eligible unit",
        "evidenceText": "Current Incentives Ductless Heat Pump - Switching from Natural Gas - $300/ton Electric Resistance Replacement - $1000/ton Air-Source Heat Pump Switching from Natural Gas - $150/ton Electric Resistance Replacement - $700/ton Variable Refrigerant System Electric Replacement - $1000/ton Heat Pump Water Heater $600 - Tier 3 Packaged Terminal Heat Pump This incentive is applicable for both apartments and lodging in hotels/motels",
        "sourceUrlsChecked": [
          "https://ashlandoregon.gov/590/Commercial-Incentives"
        ],
        "reasoningNotes": "",
        "mapping": {
          "primarySavingsModelId": "ev_charging_site_load",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null,
          "businessRelevance": "business_relevant",
          "v1Readiness": "needs_quote"
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1674",
    "opportunityName": "Portland General Electric - Residential Energy Efficiency Rebate Program",
    "state": "OR",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1674/portland-general-electric-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://portlandgeneral.com/save-money/save-money-home/special-offers-incentives",
    "applicationUrl": null,
    "administrator": "Portland General Electric",
    "programType": "Rebate/Partner Incentive Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 8,
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
          "duct sealing",
          "duct insulation"
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
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "OR"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Portland General Electric electric service territory"
        ],
        "notes": "PGE residential offers often route customers to Energy Trust of Oregon or PGE Plus partner offerings. Eligibility depends on PGE service address and the relevant partner program."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "homeowner",
        "renter",
        "income_qualified_customer"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "ducted_heat_pump",
        "ductless_mini_split_heat_pump",
        "smart_thermostat_zoning_retrofit",
        "air_sealing_weatherization",
        "insulation_upgrade",
        "window_replacement",
        "energy_star_appliance_rebate"
      ],
      "hardRequirements": [
        "Customer must be eligible under PGE residential service and the applicable PGE, PGE Plus, or Energy Trust offer.",
        "Heat pump rebates must follow the current Energy Trust or PGE-linked equipment and contractor requirements.",
        "Weatherization assistance may require income qualification, an eligible home, and partner-program approval.",
        "Smart thermostat offers and rewards must follow the current PGE marketplace or demand-response enrollment rules where applicable."
      ],
      "blockers": [
        "Gas furnace and gas water heater retrofits were not supported by the current PGE electric residential offer pages checked.",
        "Heat pump water heater eligibility was not verified in the current PGE offer pages checked and should not be matched without a current source.",
        "EV charging, solar, and other PGE Plus services are separate offers and should not be matched to this old residential efficiency rebate record unless specifically intended.",
        "Do not infer generic high-efficiency HVAC beyond listed ducted or ductless heat pumps.",
        "Because incentives are often administered by Energy Trust or PGE Plus, matching should preserve the partner-program boundary."
      ],
      "programType": "Rebate/Partner Incentive Program",
      "administrator": "Portland General Electric",
      "applicationUrl": null,
      "websiteUrl": "https://portlandgeneral.com/save-money/save-money-home/special-offers-incentives",
      "sourceUrlsChecked": [
        "https://portlandgeneral.com/save-money/save-money-home/special-offers-incentives",
        "https://portlandgeneral.com/save-money/save-money-home/heating-cooling/high-efficiency-heat-pumps",
        "https://portlandgeneral.com/save-money/save-money-home/weatherization/weatherization-assistance"
      ],
      "evidenceText": "Current]( PGE residential offer pages point to cash back for ducted and ductless heat pumps, Energy Trust weatherization including insulation and windows, PGE marketplace thermostat offers, and weatherization assistance for qualifying customers.",
      "reasoningNotes": "The opportunity remains active as a PGE residential offers hub, but many incentives are partner-administered. Original gas furnace and gas water heater matches should be removed."
    },
    "existingSimpleRules": [
      {
        "id": "oir_65bac1f70126b09d_v1",
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
        "formula": "Up to $1,800 per qualifying ductless heat pump",
        "evidenceText": "PGE heat pump rebate page lists ductless heat pump rebates up to $1,800.",
        "sourceUrlsChecked": [
          "https://portlandgeneral.com/save-money/save-money-home/energy-efficiency-programs/heat-pump-cash-incentive"
        ],
        "reasoningNotes": "Matched ductless heat pump term. Source uses up to, so amount depends on equipment and project eligibility.",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_735963782f139a09_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 300000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "Up to $3,000 per qualifying ducted heat pump",
        "evidenceText": "PGE heat pump rebate page lists ducted heat pump rebates up to $3,000.",
        "sourceUrlsChecked": [
          "https://portlandgeneral.com/save-money/save-money-home/energy-efficiency-programs/heat-pump-cash-incentive"
        ],
        "reasoningNotes": "Returned separately because ducted heat pumps have a distinct maximum incentive.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2084",
    "opportunityName": "United Cooperative Services - Residential Energy Efficiency Rebate Program",
    "state": "TX",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2084/united-cooperative-services-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://ucs.net/rebate-programs",
    "applicationUrl": "https://ucs.net/rebate-programs",
    "administrator": "United Cooperative Services",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 8,
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
          "TX"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "United Cooperative Services electric service territory"
        ],
        "notes": "Eligibility is limited to United Cooperative Services residential members at eligible service locations."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "homeowner",
        "cooperative_member"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation",
        "smart_thermostat_zoning_retrofit",
        "insulation_upgrade",
        "air_source_heat_pump",
        "ground_source_geothermal_heat_pump",
        "heat_pump_water_heater",
        "hvac_tune_up",
        "water_heater_blanket"
      ],
      "hardRequirements": [
        "Applicant must be a United Cooperative Services residential member at the installation location.",
        "Rebate submissions must include required documents within the stated submission period and are first come, first served subject to funding.",
        "Attic insulation requires a free audit and qualifying existing insulation depth before installation.",
        "Heat pump rebates require complete qualifying system change-outs, AHRI ratings, listed efficiency minimums, and licensed contractor installation.",
        "EV charger rebates require a new Level 2 charger, Beat the Peak text participation, and programmable delayed charging away from summer peak periods."
      ],
      "blockers": [
        "Do not match broad high-efficiency HVAC replacement unless the project is a qualifying air-source or ground-source heat pump system.",
        "Heat pump water heaters must be qualifying 40-gallon-or-larger electric units and cannot be gas, propane, tankless, or existing heat pump water heater replacements if excluded by the rules.",
        "EV eligibility is Level 2 residential charging only and requires off-peak delayed-charging behavior.",
        "Smart thermostat and BYOT incentives are distinct from HVAC replacement.",
        "Do not infer commercial, industrial, or nonresidential measures."
      ],
      "programType": "Rebate Program",
      "administrator": "United Cooperative Services",
      "applicationUrl": "https://ucs.net/rebate-programs",
      "websiteUrl": "https://ucs.net/rebate-programs",
      "sourceUrlsChecked": [
        "https://ucs.net/rebate-programs",
        "https://ucs.net/sites/default/files/2026%20REBATE%20BROCHURE%20FINAL.pdf"
      ],
      "evidenceText": "United's]( current rebate page and 2026 brochure list residential rebates for Level 2 EV chargers, smart thermostats, attic insulation, air-source and ground-source heat pumps, heat pump water heaters, HVAC tune-ups, and water-heater blankets.",
      "reasoningNotes": "The original heat pump, geothermal, HPWH, insulation, thermostat, and Level 2 EV matches are supported, with strong off-peak, audit, and equipment-specific requirements."
    },
    "existingSimpleRules": [
      {
        "id": "oir_002f6c714c97dcee_v1",
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
        "confidence": "medium",
        "formula": "$250 per eligible unit",
        "evidenceText": "Back Electric Vehicle Chargers More info Electric Vehicle (EV) Charger Rebate 50 percent up to $250 on a Level 2 (240 volt) EV charger Equipment must be new The recipient must be a member of United, and the EV charger must be installed at a location served by United Member must sign up for Beat the Peak notifications via text messages Charging equipment",
        "sourceUrlsChecked": [
          "https://www.united-cs.com/rebate-programs"
        ],
        "reasoningNotes": "",
        "mapping": {
          "primarySavingsModelId": "ev_charging_site_load",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null,
          "businessRelevance": "residential_only",
          "v1Readiness": "not_v1_relevant"
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22565",
    "opportunityName": "Columbia REA Residential Efficiency Rebate Program",
    "state": "WA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22565/columbia-rea-residential-efficiency-rebate-program",
    "websiteUrl": "https://www.columbiarea.coop/energy-efficiency/rebate-offers/",
    "applicationUrl": null,
    "administrator": "Columbia Rural Electric Association",
    "programType": "Utility Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 8,
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
        "retrofitTypeId": "duct_sealing_and_insulation",
        "displayName": "Duct sealing and duct insulation",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "duct sealing",
          "duct insulation"
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
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Columbia Rural Electric Association service territory"
        ],
        "notes": "Installation address must be in Columbia REA service territory; current rebate form dates and funding should be verified."
      },
      "eligibleApplicantTypes": [
        "residential electric cooperative member",
        "residential customer",
        "homeowner"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "ductless_mini_split_heat_pump",
        "duct_sealing_and_insulation",
        "smart_thermostat_zoning_retrofit",
        "insulation_upgrade",
        "exterior_door_replacement",
        "window_replacement",
        "heat_pump_water_heater",
        "high_efficiency_laundry_equipment",
        "neem_certified_manufactured_home"
      ],
      "hardRequirements": [
        "Applicant must be a Columbia REA member/customer at a service location in the utility territory.",
        "Measure-specific applications, invoices, product specifications, and qualified product lists apply.",
        "Heating and cooling projects require licensed or approved contractor installation and documentation submitted within the required period.",
        "Ductless heat pump rebates have restrictions on existing heating type, existing ducted systems, and replacement of non-electric fuels.",
        "Current form dates and remaining funding must be verified before final eligibility determination."
      ],
      "blockers": [
        "EV charger rebates are listed as a separate application and should not be included in this residential efficiency record.",
        "Agriculture and commercial rebates, including VFDs, commercial lighting, and commercial ductless heat pumps, are separate.",
        "Do not match broad air sealing unless the current weatherization form supports it; the current page lists insulation, doors, and windows.",
        "Ductless heat pump support is specific and should not be generalized to all mini-split projects."
      ],
      "programType": "Utility Rebate Program",
      "administrator": "Columbia Rural Electric Association",
      "applicationUrl": null,
      "websiteUrl": "https://www.columbiarea.coop/energy-efficiency/rebate-offers/",
      "sourceUrlsChecked": [
        "https://www.columbiarea.coop/energy-efficiency/rebate-offers/",
        "https://www.columbiarea.coop/wp-content/uploads/Residential-Heating-and-Cooling-HVAC-04212025.pdf",
        "https://www.columbiarea.coop/wp-content/uploads/Ductless-Heat-Pump-Project-Information-Form_updated.pdf",
        "https://www.columbiarea.coop/news-releases/conservation-corner-march-2023/"
      ],
      "evidenceText": "Columbia REA's residential rebate page lists heating and cooling, duct sealing, smart thermostat, weatherization for insulation, doors and windows, heat pump water heaters, ENERGY STAR laundry, and NEEM homes.",
      "reasoningNotes": "The current page supports residential categories, but one linked heating form had a prior validity window; current forms and funding should be checked before automated matching."
    },
    "existingSimpleRules": [
      {
        "id": "oir_e62bd998b2a1857c_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 110000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "Up to $1,100 per heat pump water heater",
        "evidenceText": "Columbia REA materials say heat pump water heater rebates range from $700 to $1,100.",
        "sourceUrlsChecked": [
          "https://www.columbiarea.coop/energy-efficiency/rebate-offers/",
          "https://www.columbiarea.coop/news-releases/conservation-corner-january-2024/"
        ],
        "reasoningNotes": "Matched heat pump water heater term. Modeled as the highest published tier; final amount depends on product tier.",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  }
]
