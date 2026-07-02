You are helping RetroFi repair incentive formulas, rate tables, grant estimates, tax credits, and non-cash workflow value rules.

Return strict JSON only. Do not include markdown, code fences, commentary, or citations outside JSON fields.

Batch: 8
Targets in this prompt: 141-160 of 984
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
  "batchNumber": 8,
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
  "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:1653"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22122",
    "opportunityName": "TVA - Commercial Energy Efficiency Rebate Program",
    "state": "AL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22122/tva-commercial-energy-efficiency-rebate-program",
    "websiteUrl": "https://energyright.com/business-industry/incentives/applying-for-incentives/",
    "applicationUrl": null,
    "administrator": "TVA EnergyRight",
    "programType": "Commercial And Industrial Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 7,
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
      },
      {
        "retrofitTypeId": "refrigeration_ec_motor_retrofit",
        "displayName": "Refrigeration EC motor retrofit",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "evaporator fan"
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
          "ice storage"
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
          "AL",
          "GA",
          "KY",
          "MS",
          "NC",
          "TN",
          "VA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "TVA EnergyRight participating local power companies"
        ],
        "notes": "Limited to business and industry customers served by TVA through participating local power companies."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "industrial_customer",
        "business_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_hvac_replacement",
        "led_lighting_retrofit",
        "high_efficiency_refrigeration_equipment",
        "thermal_ice_storage",
        "variable_frequency_drive_retrofit",
        "electric_forklift_material_handling",
        "custom_energy_efficiency_measures"
      ],
      "hardRequirements": [
        "Customer must be served by TVA through a participating local power company.",
        "Pre-approval is required for many incentive types before purchase or installation.",
        "Projects must meet TVA EnergyRight measure specifications and incentive minimums.",
        "Some measures must use TVA Preferred Partners Network contractors.",
        "Incentives are subject to funding availability and program caps."
      ],
      "blockers": [
        "Residential projects are not eligible under this business and industry incentive program.",
        "Solar, battery storage, EV charging, and demand response should not be inferred from this incentive page.",
        "Thermal storage match should be limited to thermal ice storage systems, not general battery storage.",
        "Projects outside TVA or nonparticipating local power company territory are ineligible."
      ],
      "programType": "Commercial And Industrial Rebate Program",
      "administrator": "TVA EnergyRight",
      "applicationUrl": null,
      "websiteUrl": "https://energyright.com/business-industry/incentives/applying-for-incentives/",
      "sourceUrlsChecked": [
        "https://energyright.com/business-industry/incentives/applying-for-incentives/",
        "https://energyright.com/business-industry/incentives/"
      ],
      "evidenceText": "TVA EnergyRight lists business and industry incentives for HVAC systems, LED lights, refrigeration, thermal ice storage systems, variable speed drives, electric forklifts, and custom projects.",
      "reasoningNotes": "The original categories were mostly supported, but thermal energy storage should be narrowed to thermal ice storage and electric forklifts/custom measures are explicitly listed. Battery storage and residential measures should be blocked."
    },
    "existingSimpleRules": [
      {
        "id": "oir_513829892330d814_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 2800,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "$28 per eligible unit",
        "evidenceText": "Up to $28/fixture with several qualifying fixture types",
        "sourceUrlsChecked": [
          "https://energyright.com/business-industry/incentives/"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22726",
    "opportunityName": "Arizona – Home Electrification and Appliance Rebate (HEAR) Program",
    "state": "AZ",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22726/arizona-home-electrification-and-appliance-rebate-hear-program",
    "websiteUrl": "https://efficiencyarizona.com/",
    "applicationUrl": null,
    "administrator": "Arizona Governor's Office of Resiliency",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 7,
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
        "retrofitTypeId": "process_electrification_equipment",
        "displayName": "Process electrification equipment",
        "parentCategory": "compressed_air_industrial",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "electrification equipment"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "AZ"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [],
        "notes": "Statewide Arizona residential HEAR program for eligible households. Current participation is limited to qualifying homeowners and approved retail or contractor pathways."
      },
      "eligibleApplicantTypes": [
        "low_income_homeowner",
        "moderate_income_homeowner",
        "owner_occupied_household"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "heat_pump_water_heater",
        "heat_pump_clothes_dryer",
        "electric_cooking_appliance",
        "induction_cooking_equipment",
        "insulation_upgrade",
        "air_sealing_weatherization",
        "duct_sealing_and_insulation",
        "ventilation_upgrade",
        "electric_panel_upgrade",
        "electrical_wiring_upgrade"
      ],
      "hardRequirements": [
        "Household must meet HEAR income or categorical eligibility, generally at or below 150 percent of area median income.",
        "Current active path is for homeowners who reside in the home; renter and multifamily participation is not active unless the program opens those paths.",
        "Contractor-installed measures must use qualified contractors, and retail coupons are limited to eligible products.",
        "Installations completed before approval are not eligible.",
        "Electrical panel and wiring upgrades are eligible only when needed for a qualified appliance or electrification measure."
      ],
      "blockers": [
        "Do not match commercial, industrial, or process electrification equipment to this residential HEAR program.",
        "Households above 150 percent of area median income are not eligible.",
        "Existing heat pumps, heat pump water heaters, heat pump dryers, or qualifying electric cooking appliances generally cannot be replaced with the same HEAR measure.",
        "Gas or non-electric appliances being replaced must be disconnected or removed as required by the program.",
        "Portable cooktops, completed installations, and financing-only requests are not eligible HEAR matches."
      ],
      "programType": "Rebate Program",
      "administrator": "Arizona Governor's Office of Resiliency",
      "applicationUrl": null,
      "websiteUrl": "https://efficiencyarizona.com/",
      "sourceUrlsChecked": [
        "https://efficiencyarizona.com/",
        "https://efficiencyarizona.com/eligibility/",
        "https://efficiencyarizona.com/products/",
        "https://efficiencyarizona.com/frequently-asked-questions/"
      ],
      "evidenceText": "Efficiency]( Arizona lists HEAR rebates for heat pumps, heat pump water heaters, heat pump dryers, electric cooking, insulation, air sealing, ventilation, electrical panels, and wiring, with income eligibility and owner-occupied homeowner restrictions under the active launch.",
      "reasoningNotes": "The original induction and electrification matches should be narrowed to residential electric cooking and home electrification measures. Process electrification is a false positive."
    },
    "existingSimpleRules": [
      {
        "id": "oir_40da4df4cb440d88_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 84000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "eligible_cost_categories",
          "applicationOrder": 10
        },
        "cap": {
          "maxPercentOfBasis": 1
        },
        "confidence": "medium",
        "formula": "Up to $840 for eligible electric stove, cooktop, range, or oven",
        "evidenceText": "Efficiency Arizona lists up to $840 for electric stove, cooktop, range, or oven.",
        "sourceUrlsChecked": [
          "https://efficiencyarizona.com/",
          "https://resilient.az.gov/clean-energy-hub/households/home-electrification-and-appliance-rebate"
        ],
        "reasoningNotes": "HEAR amount depends on income, eligibility, and project pathway.",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_4b0476c653ad3564_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 175000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "eligible_cost_categories",
          "applicationOrder": 10
        },
        "cap": {
          "maxPercentOfBasis": 1
        },
        "confidence": "medium",
        "formula": "Up to $1,750 for eligible heat pump water heater",
        "evidenceText": "Efficiency Arizona lists up to $1,750 for heat pump water heater.",
        "sourceUrlsChecked": [
          "https://efficiencyarizona.com/",
          "https://resilient.az.gov/clean-energy-hub/households/home-electrification-and-appliance-rebate"
        ],
        "reasoningNotes": "HEAR amount depends on income, eligibility, and project pathway.",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_b4d7dc3916c520b9_v1",
        "incentiveType": "fixed_amount_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_amount",
          "amountCents": 160000
        },
        "basisPolicy": {
          "basis": "eligible_cost_categories",
          "applicationOrder": 10
        },
        "cap": {
          "maxPercentOfBasis": 1
        },
        "confidence": "medium",
        "formula": "Up to $1,600 for eligible insulation, air sealing, and ventilation",
        "evidenceText": "Efficiency Arizona lists up to $1,600 for insulation, air sealing, and ventilation.",
        "sourceUrlsChecked": [
          "https://efficiencyarizona.com/",
          "https://resilient.az.gov/clean-energy-hub/households/home-electrification-and-appliance-rebate"
        ],
        "reasoningNotes": "HEAR amount depends on income, eligibility, and project pathway.",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_f72bfc6ab7d13403_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 800000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "eligible_cost_categories",
          "applicationOrder": 10
        },
        "cap": {
          "maxPercentOfBasis": 1
        },
        "confidence": "medium",
        "formula": "Up to $8,000 for eligible heat pump for space heating and cooling",
        "evidenceText": "Efficiency Arizona lists up to $8,000 for heat pump for space heating and cooling.",
        "sourceUrlsChecked": [
          "https://efficiencyarizona.com/",
          "https://resilient.az.gov/clean-energy-hub/households/home-electrification-and-appliance-rebate"
        ],
        "reasoningNotes": "HEAR amount depends on income, eligibility, and project pathway.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3118",
    "opportunityName": "TEP Business Energy Solutions",
    "state": "AZ",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3118/tep-business-energy-solutions",
    "websiteUrl": "https://www.tep.com/business-energy-solutions/",
    "applicationUrl": "https://docs.tep.com/wp-content/uploads/TEP-Business-Energy-Solution-Application.pdf",
    "administrator": "Tucson Electric Power",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 7,
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
        "retrofitTypeId": "low_flow_fixture_retrofit",
        "displayName": "Low-flow fixture retrofit",
        "parentCategory": "water_efficiency",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "low flow"
        ]
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
          "AZ"
        ],
        "counties": [],
        "cities": [
          "Tucson"
        ],
        "utilityTerritories": [
          "Tucson Electric Power service territory"
        ],
        "notes": "Existing commercial facilities on eligible TEP pricing plans or rate codes."
      },
      "eligibleApplicantTypes": [
        "business_customer",
        "commercial_customer",
        "school",
        "nonprofit",
        "institutional_customer",
        "trade_ally_assisted_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "institutional",
        "k_12_school",
        "small_business"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "high_efficiency_hvac_replacement",
        "heat_pump_hvac_retrofit",
        "hvac_controls_retrofit",
        "energy_management_system",
        "high_efficiency_refrigeration_equipment",
        "variable_frequency_drive_retrofit",
        "compressed_air_system_upgrade",
        "motors_pumps_fans_drives",
        "low_flow_fume_hood",
        "high_efficiency_refrigerator_or_freezer",
        "custom_energy_efficiency_project",
        "virtual_commissioning_service",
        "free_rebate_assessment"
      ],
      "hardRequirements": [
        "Customer must have an eligible TEP meter and pricing plan or rate code.",
        "Facility must be an existing eligible commercial facility unless a specific new-construction path applies.",
        "Pre-approval is required before work begins.",
        "Commercial projects must use a TEP-approved Commercial Trade Ally where required.",
        "Final documentation must be submitted within program deadlines and the project must meet 2026 program rules.",
        "Incentives are subject to limited funding."
      ],
      "blockers": [
        "This is not a residential program.",
        "Smart Rewards demand response and EV charging are separate TEP programs.",
        "Low-flow support is limited to items such as low-flow fume hoods or kit aerators, not broad plumbing retrofit.",
        "Virtual commissioning is a separate service within TEP business efficiency offerings and is not a physical equipment rebate.",
        "Projects designed primarily for fuel switching are not eligible."
      ],
      "programType": "Rebate Program",
      "administrator": "Tucson Electric Power",
      "applicationUrl": "https://docs.tep.com/wp-content/uploads/TEP-Business-Energy-Solution-Application.pdf",
      "websiteUrl": "https://www.tep.com/business-energy-solutions/",
      "sourceUrlsChecked": [
        "https://www.tep.com/business-energy-solutions/",
        "https://www.tep.com/business-energy-solutions/commercial-program/",
        "https://www.tep.com/business-energy-solutions/commercial-program/program-process/",
        "https://docs.tep.com/wp-content/uploads/TEP-Business-Energy-Solution-Application.pdf"
      ],
      "evidenceText": "TEP’s Business Energy Solutions pages list rebates for commercial businesses and schools for lighting, controls, HVAC, heat pumps, refrigeration, motors, motor drives and compressed air. The 2026 application requires eligible rate schedules, existing facilities, pre-approval before work and current-year completion.",
      "reasoningNotes": "Keep C&I lighting, HVAC, controls, refrigeration, motors and compressed-air categories. Narrow low-flow to fume hoods or kit aerators and treat virtual commissioning as a service boundary."
    },
    "existingSimpleRules": [
      {
        "id": "oir_5f18fd3abbefccd9_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 11500,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "eligible_cost_categories",
          "applicationOrder": 10
        },
        "cap": {
          "maxPercentOfBasis": 0.75
        },
        "confidence": "medium",
        "formula": "Up to $115 per ENERGY STAR commercial refrigerator or freezer",
        "evidenceText": "TEP business solutions page lists up to $115 per unit on ENERGY STAR refrigerators and freezers.",
        "sourceUrlsChecked": [
          "https://www.tep.com/business-energy-solutions/"
        ],
        "reasoningNotes": "Matched refrigeration terms. Source uses up to; prescriptive incentives are capped by program rules.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22682",
    "opportunityName": "Bay Area Regional Energy Network (BayREN) - Multifamily Residential Energy Efficiency Rebate Program",
    "state": "CA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22682/bay-area-regional-energy-network-bayren-multifamily-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.bayren.org/multifamily-property-owners/bambe-rebates",
    "applicationUrl": "https://www.bayren.org/mf/interest-eligibility",
    "administrator": "Bay Area Regional Energy Network",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 7,
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
        "retrofitTypeId": "resilience_backup_power_system",
        "displayName": "Resilience / backup power system",
        "parentCategory": "energy_storage_resilience",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "resilience"
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
          "Alameda County",
          "Contra Costa County",
          "Marin County",
          "Napa County",
          "San Francisco County",
          "San Mateo County",
          "Santa Clara County",
          "Solano County",
          "Sonoma County"
        ],
        "cities": [],
        "utilityTerritories": [],
        "notes": "BayREN serves multifamily properties in the nine San Francisco Bay Area counties."
      },
      "eligibleApplicantTypes": [
        "multifamily_property_owner",
        "multifamily_property_manager",
        "affordable_housing_provider"
      ],
      "eligibleSectors": [
        "multifamily_residential",
        "affordable_multifamily"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_water_heater",
        "hot_water_pipe_insulation",
        "heat_pump_hvac_retrofit",
        "duct_replacement",
        "insulation_upgrade",
        "window_replacement",
        "led_lighting_retrofit",
        "efficient_refrigerator_replacement",
        "induction_cooktop_or_range",
        "heat_pump_clothes_dryer",
        "efficient_clothes_washer",
        "efficient_dishwasher",
        "electric_panel_upgrade",
        "heat_pump_pool_heater",
        "duct_sealing_and_insulation",
        "low_flow_toilet_retrofit",
        "smart_thermostat_zoning_retrofit"
      ],
      "hardRequirements": [
        "Project must be an eligible multifamily property in a BayREN county.",
        "Base rebate requires at least two energy efficiency upgrades.",
        "Base rebate requires at least 10 percent modeled energy savings.",
        "Rebate reservation is required before purchase or installation.",
        "Additional requirements and priority-zone rules apply to certain adders and reimbursable measures."
      ],
      "blockers": [
        "Do not match resilience_backup_power_system; backup power is not a BAMBE rebate category supported by the current official page.",
        "Do not generalize laundry into broad water-efficiency laundry equipment; supported measures are specific clothes washers and heat pump dryers.",
        "Properties with propane or fuel-oil space or water heating systems are excluded from the BAMBE offering.",
        "Do not treat single-family homes as eligible."
      ],
      "programType": "Rebate Program",
      "administrator": "Bay Area Regional Energy Network",
      "applicationUrl": "https://www.bayren.org/mf/interest-eligibility",
      "websiteUrl": "https://www.bayren.org/multifamily-property-owners/bambe-rebates",
      "sourceUrlsChecked": [
        "https://www.bayren.org/multifamily-property-owners/bambe-rebates",
        "https://www.bayren.org/mf/interest-eligibility",
        "https://www.bayren.org/about"
      ],
      "evidenceText": "BayREN BAMBE lists multifamily rebates for HPWH, heat pump HVAC, duct replacement, insulation, windows, LEDs, efficient appliances and electric cooking, with a two-upgrade and 10% modeled-savings base requirement.",
      "reasoningNotes": "Expanded from the supplied matches to include official BAMBE measure examples and removed resilience backup power as an unsupported false positive."
    },
    "existingSimpleRules": [
      {
        "id": "oir_7f60d2f9483700cf_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "percent_of_basis",
          "percent": 0.4
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": {
          "maxAmountCents": 500000
        },
        "confidence": "high",
        "formula": "40% of eligible project cost, capped at $5,000",
        "evidenceText": "Generous Rebates BAMBE rebates start at $500/unit and can range to over $5,000/unit depending on project scope and location and on average cover 30-40% of total project cost, paid out after full project installation is complete",
        "sourceUrlsChecked": [
          "https://www.bayren.org/rebates-financing/multifamily-property-owners"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4899",
    "opportunityName": "PG&E - Non-Residential Energy Efficiency Rebates",
    "state": "CA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4899/pg-and-e-non-residential-energy-efficiency-rebates",
    "websiteUrl": "https://www.pge.com/en/save-energy-and-money/rebates-and-incentives/business-energy-efficiency-rebates.html",
    "applicationUrl": null,
    "administrator": "Pacific Gas & Electric Company",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 7,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "anti_sweat_heater_controls",
        "displayName": "Anti-sweat heater controls",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "anti sweat heater",
          "anti-sweat heater"
        ]
      },
      {
        "retrofitTypeId": "demand_controlled_ventilation",
        "displayName": "Demand-controlled ventilation",
        "parentCategory": "indoor_air_quality_ventilation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "demand controlled ventilation"
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
        "retrofitTypeId": "high_efficiency_refrigeration_equipment",
        "displayName": "High-efficiency refrigeration equipment",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "refrigeration",
          "display case"
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
          "CA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Pacific Gas and Electric Company service territory"
        ],
        "notes": "Applies to eligible PG&E business, non-residential, industrial, and agricultural customers subject to measure-specific electric or gas requirements."
      },
      "eligibleApplicantTypes": [
        "business_customer",
        "non_residential_utility_customer",
        "agricultural_customer",
        "industrial_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "agricultural",
        "institutional"
      ],
      "eligibleRetrofitCategories": [
        "anti_sweat_heater_controls",
        "demand_controlled_ventilation",
        "advanced_rooftop_hvac_controls",
        "variable_frequency_drive_retrofit",
        "high_efficiency_refrigeration_equipment",
        "refrigerated_display_case_doors",
        "ultra_low_temperature_freezer",
        "pipe_insulation",
        "ozone_laundry_system",
        "demand_control_kitchen_ventilation",
        "pre_rinse_spray_valve"
      ],
      "hardRequirements": [
        "Customer must be an eligible PG&E non-residential customer.",
        "Measures must meet PG&E Business Rebate Catalog specifications.",
        "Measure eligibility depends on equipment type, baseline conditions, installation date, and energy fuel requirements.",
        "Rebates are subject to current catalog rules and funding."
      ],
      "blockers": [
        "Insulation is supported only as specific pipe insulation, not broad building envelope insulation.",
        "Laundry support is for ozone laundry systems, not general high-efficiency laundry equipment.",
        "HVAC support is measure-specific controls, ventilation, rooftop controls, and VFDs, not broad HVAC replacement unless a catalog measure applies.",
        "Residential appliances and home weatherization should not match this non-residential program."
      ],
      "programType": "Rebate",
      "administrator": "Pacific Gas & Electric Company",
      "applicationUrl": null,
      "websiteUrl": "https://www.pge.com/en/save-energy-and-money/rebates-and-incentives/business-energy-efficiency-rebates.html",
      "sourceUrlsChecked": [
        "https://www.pge.com/en/save-energy-and-money/rebates-and-incentives/business-energy-efficiency-rebates.html",
        "https://www.pge.com/assets/pge/docs/save-energy-and-money/rebate-and-incentives/business-rebate-catalog.pdf"
      ],
      "evidenceText": "PG&E's]( business rebate catalog lists non-residential refrigeration controls, display case doors, ultra-low-temperature freezers, DCV, rooftop controls, HVAC fan VFDs, pipe insulation, and kitchen/laundry measures.",
      "reasoningNotes": "Narrow broad source terms to catalog measures. Do not use this record for residential appliances or whole-building insulation."
    },
    "existingSimpleRules": [
      {
        "id": "oir_ddd9190f3b0aae6f_v1",
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
        "confidence": "medium",
        "formula": "$600 per eligible unit",
        "evidenceText": "Receive up to $600 per unit",
        "sourceUrlsChecked": [
          "https://www.pge.com/en/save-energy-and-money/rebates-and-incentives/business-energy-efficiency-rebates.html"
        ],
        "reasoningNotes": "",
        "mapping": {
          "primarySavingsModelId": "hvac_electric_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null,
          "businessRelevance": "mixed",
          "v1Readiness": "needs_bill_data"
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22683",
    "opportunityName": "Tri-County Regional Energy Network (3C-REN) - Multifamily Residential Energy Efficiency Rebate Program",
    "state": "CA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22683/tri-county-regional-energy-network-3c-ren-multifamily-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.3c-ren.org/multifamily/",
    "applicationUrl": "https://www.3c-ren.org/multifamily-form/",
    "administrator": "Tri-County Regional Energy Network",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 7,
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
          "CA"
        ],
        "counties": [
          "San Luis Obispo County",
          "Santa Barbara County",
          "Ventura County"
        ],
        "cities": [],
        "utilityTerritories": [
          "PG&E",
          "Southern California Edison",
          "SoCalGas",
          "Central Coast Community Energy",
          "Clean Power Alliance",
          "Santa Barbara Clean Energy"
        ],
        "notes": "Existing multifamily properties with five or more units in 3C-REN counties and eligible utility or community-choice service."
      },
      "eligibleApplicantTypes": [
        "multifamily_property_owner",
        "multifamily_property_manager",
        "contractor"
      ],
      "eligibleSectors": [
        "multifamily_residential"
      ],
      "eligibleRetrofitCategories": [
        "energy_assessment",
        "heat_pump_hvac_retrofit",
        "heat_pump_water_heater",
        "heat_pump_pool_heater",
        "pool_pump_upgrade",
        "pipe_insulation",
        "domestic_hot_water_recirculation_controls",
        "low_flow_fixture_retrofit",
        "duct_sealing_and_insulation",
        "duct_replacement",
        "smart_thermostat_zoning_retrofit",
        "variable_speed_hydronic_circulator",
        "insulation_upgrade",
        "air_sealing_weatherization",
        "window_replacement",
        "energy_star_refrigerator",
        "energy_star_dishwasher",
        "heat_pump_clothes_dryer",
        "induction_cooking_equipment",
        "front_load_washing_machine",
        "low_flow_toilet",
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "electrical_panel_or_circuit_upgrade"
      ],
      "hardRequirements": [
        "Property must be an existing multifamily building with at least five units.",
        "Property must be in San Luis Obispo, Santa Barbara or Ventura County.",
        "Property must receive eligible utility or community-choice service.",
        "Owners should start through the multifamily interest form and technical assistant process.",
        "Project measures must meet 3C-REN requirements and rebate limits.",
        "The contractor heat pump water heater incentive applies only to qualifying projects not already under contract."
      ],
      "blockers": [
        "Current 3C-REN multifamily pages do not list furnace replacement.",
        "Single-family customers belong in separate 3C-REN residential offerings.",
        "Solar rebates are not offered through this multifamily energy-savings program.",
        "Do not match properties outside the three-county service territory or with fewer than five units."
      ],
      "programType": "Rebate Program",
      "administrator": "Tri-County Regional Energy Network",
      "applicationUrl": "https://www.3c-ren.org/multifamily-form/",
      "websiteUrl": "https://www.3c-ren.org/multifamily/",
      "sourceUrlsChecked": [
        "https://www.3c-ren.org/multifamily/",
        "https://www.3c-ren.org/multifamily-form/",
        "https://www.3c-ren.org/frequently-asked-questions/",
        "https://www.3c-ren.org/wp-content/uploads/2025/01/3CREN_Multifamily-Home-Energy-Savings_Flyer.pdf"
      ],
      "evidenceText": "3C-REN’s current multifamily page covers existing multifamily buildings with five or more units in San Luis Obispo, Santa Barbara or Ventura counties. Listed upgrades include heat pump water heating and HVAC, duct work, insulation, air sealing, windows, appliances, lighting and controls; furnace replacement is not listed.",
      "reasoningNotes": "Keep multifamily air sealing, heat pump, heat pump water heater, insulation and lighting categories. Remove furnace replacement as unsupported by current official sources."
    },
    "existingSimpleRules": [
      {
        "id": "oir_1b4bf096a0b19692_v1",
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
        "confidence": "medium",
        "formula": "$5,000 per eligible unit",
        "evidenceText": "No cost energy assessment helps you find where you can save the most Base rebates start at $1,000 per unit Adder rebates such as $1,500 for each unitary heat pump water heater or HVAC installed $5,000 incentive for your contractor when installing heat pump water heaters Get Started Today Rebates from $1,000 to $5,000+ per unit",
        "sourceUrlsChecked": [
          "https://www.3c-ren.org/multifamily"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1748",
    "opportunityName": "Colorado Springs Utilities - Commercial Energy Efficiency Rebate Program",
    "state": "CO",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1748/colorado-springs-utilities-commercial-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.csu.org/rebates-incentives/",
    "applicationUrl": null,
    "administrator": "Colorado Springs Utilities",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 7,
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
          "showerhead"
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
          "smart irrigation"
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
          "CO"
        ],
        "counties": [],
        "cities": [
          "Colorado Springs"
        ],
        "utilityTerritories": [
          "Colorado Springs Utilities commercial service territory"
        ],
        "notes": "Available to eligible Colorado Springs Utilities business customers for applicable electric, gas or water measures."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "business_customer",
        "small_business",
        "institutional_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "institutional",
        "small_business"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "ductless_heat_pump",
        "high_efficiency_furnace_retrofit",
        "heat_pump_water_heater",
        "high_efficiency_boiler_retrofit",
        "high_efficiency_cooling_equipment",
        "commercial_refrigeration_upgrade",
        "compressed_air_system_upgrade",
        "process_equipment_efficiency",
        "smart_thermostat_zoning_retrofit",
        "smart_irrigation_controller",
        "commercial_showerhead_retrofit",
        "faucet_aerator_retrofit",
        "ultra_high_efficiency_toilet",
        "pre_rinse_spray_valve_retrofit",
        "led_lighting_retrofit",
        "business_insulation_rebate",
        "commercial_clothes_washer",
        "commercial_kitchen_water_efficiency",
        "custom_water_efficiency_project"
      ],
      "hardRequirements": [
        "Must be an eligible Colorado Springs Utilities business customer.",
        "Custom energy and custom water rebates require qualifying calculated savings and program approval.",
        "Small Business Efficiency Program measures must be installed through the program process.",
        "Some rebates require pre-approval, site verification, eligible service type or qualifying existing equipment."
      ],
      "blockers": [
        "Do not generalize showerhead, faucet aerator or pre-rinse spray valve measures into broad plumbing retrofits.",
        "Do not treat smart irrigation as a general HVAC or controls measure.",
        "Do not match residential rental or multifamily properties to the Small Business Efficiency Program where excluded.",
        "Do not match measures requiring water service unless the customer has eligible Colorado Springs Utilities water service."
      ],
      "programType": "Rebate Program",
      "administrator": "Colorado Springs Utilities",
      "applicationUrl": null,
      "websiteUrl": "https://www.csu.org/rebates-incentives/",
      "sourceUrlsChecked": [
        "https://www.csu.org/rebates-incentives/",
        "https://www.csu.org/rebates-incentives/business-custom-energy",
        "https://www.csu.org/rebates-incentives/business-showerheads",
        "https://www.csu.org/rebates-incentives/business-irrigation-controller",
        "https://www.csu.org/rebates-incentives/small-business-efficiency-program",
        "https://www.csu.org/rebates-incentives/business-custom-water"
      ],
      "evidenceText": "Colorado Springs Utilities lists business custom energy and water rebates, HVAC and heat pump, cooling, smart thermostat, insulation, showerhead, smart irrigation and small-business direct-install measures.",
      "reasoningNotes": "Preserved commercial HVAC, thermostat, water and irrigation categories, and narrowed plumbing matches to the specific supported fixture measures."
    },
    "existingSimpleRules": [
      {
        "id": "oir_fc6bfbe3051915b4_v1",
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
        "formula": "Savings from $900 to $3,000 for eligible business HVAC and heat pump rebates",
        "evidenceText": "Colorado Springs Utilities rebates page lists Business HVAC & heat pump rebates with savings from $900 to $3,000.",
        "sourceUrlsChecked": [
          "https://www.csu.org/rebates-incentives/",
          "https://www.csu.org/rebates-incentives/business-custom-energy"
        ],
        "reasoningNotes": "Matched heat pump terms. Modeled at the top published business HVAC range with medium confidence because equipment tier determines final amount.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1753",
    "opportunityName": "Colorado Springs Utilities - Residential Energy Efficiency Rebate Program",
    "state": "CO",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1753/colorado-springs-utilities-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.csu.org/Pages/ResidentialRebates.aspx",
    "applicationUrl": null,
    "administrator": "Colorado Springs Utilities",
    "programType": "Residential Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 7,
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
          "smart irrigation"
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
          "CO"
        ],
        "counties": [],
        "cities": [
          "Colorado Springs"
        ],
        "utilityTerritories": [
          "Colorado Springs Utilities service territory"
        ],
        "notes": "Available to qualifying Colorado Springs Utilities residential electric, gas, or water customers depending on the measure."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "homeowner",
        "renter_with_account_or_owner_authorization"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "air_to_water_heat_pump",
        "cold_climate_air_source_heat_pump",
        "ductless_mini_split_heat_pump",
        "heat_pump_water_heater",
        "high_efficiency_furnace_retrofit",
        "high_efficiency_gas_water_heater",
        "high_efficiency_boiler_retrofit",
        "smart_thermostat_zoning_retrofit",
        "insulation_upgrade",
        "air_sealing_weatherization",
        "high_efficiency_toilet",
        "smart_irrigation_controller",
        "rain_sensor",
        "efficient_sprinkler_heads"
      ],
      "hardRequirements": [
        "Customer must receive the applicable Colorado Springs Utilities service for the measure.",
        "Equipment must meet current CSU efficiency, permit, inspection, contractor, and application requirements.",
        "Water conservation measures have product-specific limits and restrictions."
      ],
      "blockers": [
        "Do not generalize toilet rebates to urinals.",
        "Smart irrigation and sprinkler measures are water-conservation programs with their own rules.",
        "Do not match commercial customers under this residential record."
      ],
      "programType": "Residential Rebate Program",
      "administrator": "Colorado Springs Utilities",
      "applicationUrl": null,
      "websiteUrl": "https://www.csu.org/Pages/ResidentialRebates.aspx",
      "sourceUrlsChecked": [
        "https://www.csu.org/rebates-incentives/",
        "https://www.csu.org/rebates-incentives/residential-hvac",
        "https://www.csu.org/rebates-incentives/residential-water-heater",
        "https://www.csu.org/rebates-incentives/residential-insulation-air-sealing",
        "https://www.csu.org/rebates-incentives/residential-toilets",
        "https://www.csu.org/rebates-programs/smart-controllers",
        "https://www.csu.org/rebates-programs/rain-sensor",
        "https://www.csu.org/rebates-programs/residential-sprinkler-head"
      ],
      "evidenceText": "CSU residential materials list heat pumps, gas furnaces, water heaters, insulation and air sealing, smart thermostats, toilets, smart controllers, rain sensors, and sprinkler heads.",
      "reasoningNotes": "Preserve HVAC, HPWH, furnace, insulation, thermostat, toilet, and irrigation categories, but narrow each to residential utility-service rules."
    },
    "existingSimpleRules": [
      {
        "id": "oir_f707e0ccf4a72b40_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 655000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "$6,550 per eligible unit",
        "evidenceText": "ilable Water heater rebate Learn more Save & share your feedback with us Water use goals pilot program Learn more Free expert evaluations & recommendations Request an efficiency audit Learn more Up to $5,000 for eligible customers Small business efficiency program Learn more $50 rebate available Smart thermostat rebate Learn more Save up to $6,550 Builder incentive program Learn more More upgrades = more savings Business custom energy rebate Learn more Save",
        "sourceUrlsChecked": [
          "https://www.csu.org/Pages/ResidentialRebates.aspx"
        ],
        "reasoningNotes": "",
        "mapping": {
          "primarySavingsModelId": "hvac_electric_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null,
          "businessRelevance": "residential_only",
          "v1Readiness": "not_v1_relevant"
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5163",
    "opportunityName": "Empire Electric Association - Commercial Energy Efficiency Rebate Program",
    "state": "CO",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5163/empire-electric-association-commercial-energy-efficiency-rebate-program",
    "websiteUrl": "https://eea.coop/commercial-and-large-power-energy-efficiency-program",
    "applicationUrl": "https://eea.coop/electrify-save-program",
    "administrator": "Empire Electric Association",
    "programType": "Commercial And Large Power Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 7,
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
          "fast charger"
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
          "electric vehicle charging"
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
        "retrofitTypeId": "high_efficiency_refrigeration_equipment",
        "displayName": "High-efficiency refrigeration equipment",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
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
          "CO"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Empire Electric Association commercial and large power service territory"
        ],
        "notes": "Available to EEA commercial and large power members; EV charger incentives depend on rate class, accessibility, and charger type."
      },
      "eligibleApplicantTypes": [
        "commercial_member",
        "large_power_member",
        "business_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial"
      ],
      "eligibleRetrofitCategories": [
        "commercial_pole_mounted_led_lighting",
        "level_2_ev_charger_installation",
        "dc_fast_charger_installation",
        "air_source_heat_pump",
        "air_to_water_heat_pump",
        "ground_source_geothermal_heat_pump",
        "dual_fuel_heat_pump_bonus"
      ],
      "hardRequirements": [
        "Commercial product rebate applications must be submitted within 90 days of the purchase or install invoice date.",
        "Pole-mounted LED lighting must be new DLC-listed permanent fixtures with required controls.",
        "DC fast charger incentives require Large Power rate service and public accessibility."
      ],
      "blockers": [
        "Do not match refrigeration or freezer equipment; no current 2026 EEA commercial products source supported those measures.",
        "Do not match low-flow fixtures; the current EEA commercial products PDF did not list water-efficiency fixtures.",
        "Do not match generic indoor LED retrofits or screw-in LED lamps; current lighting support is pole-mounted LED fixtures only."
      ],
      "programType": "Commercial And Large Power Rebate Program",
      "administrator": "Empire Electric Association",
      "applicationUrl": "https://eea.coop/electrify-save-program",
      "websiteUrl": "https://eea.coop/commercial-and-large-power-energy-efficiency-program",
      "sourceUrlsChecked": [
        "https://eea.coop/commercial-and-large-power-energy-efficiency-program",
        "https://eea.coop/sites/default/files/2026_EEP_Commercial_Products_Program_2025_01_02.pdf"
      ],
      "evidenceText": "EEA's 2026 commercial products PDF lists pole-mounted LED lighting, Level 2 and DC fast EV charging incentives, and heat pump rebates for air-source, air-to-water, and ground-source systems.",
      "reasoningNotes": "EV and heat-pump matches are supported, but lighting must be narrowed and refrigeration and low-flow fixture matches removed."
    },
    "existingSimpleRules": [
      {
        "id": "oir_97c89ac9ed7f0c5d_v1",
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
          "maxAmountCents": 900000
        },
        "confidence": "medium",
        "formula": "50% of 150+ kW DC fast charger cost and installation, capped at $9,000",
        "evidenceText": "EEA 2026 form lists 150+ kW DCFC at 50% cost and installation, up to $9,000.",
        "sourceUrlsChecked": [
          "https://eea.coop/commercial-energy-efficiency-program"
        ],
        "reasoningNotes": "Matched DC fast charger term. Highest published DCFC tier for known 150+ kW chargers.",
        "mapping": {
          "primarySavingsModelId": "ev_charging_site_load",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_e3d33eab87408bcc_v1",
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
          "maxAmountCents": 200000
        },
        "confidence": "medium",
        "formula": "50% of networked Level 2 charger cost and installation, capped at $2,000",
        "evidenceText": "EEA 2026 form lists networked Level 2 chargers with fee collection at 50% cost and installation, up to $2,000.",
        "sourceUrlsChecked": [
          "https://eea.coop/commercial-energy-efficiency-program"
        ],
        "reasoningNotes": "Matched commercial Level 2 charging term.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3585",
    "opportunityName": "Empire Electric Association - Residential Energy Efficiency Rebate Program",
    "state": "CO",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3585/empire-electric-association-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://eea.coop/residential-energy-efficiency-program",
    "applicationUrl": null,
    "administrator": "Empire Electric Association, Inc.",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 7,
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
          "electric vehicle charging"
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
          "CO"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Empire Electric Association"
        ],
        "notes": "Available to qualifying Empire Electric Association residential members in the cooperative service territory."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "homeowner",
        "renter_with_owner_approval"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation",
        "heat_pump_hvac_retrofit",
        "ground_source_geothermal_heat_pump",
        "air_to_water_heat_pump",
        "heat_pump_water_heater",
        "smart_thermostat_zoning_retrofit",
        "residential_refrigerator_freezer_recycling",
        "residential_induction_cooking_appliance",
        "heat_pump_clothes_dryer",
        "whole_house_fan"
      ],
      "hardRequirements": [
        "Applicant must be an Empire Electric Association residential member.",
        "Equipment must satisfy the current residential product program requirements.",
        "Level 2 EV charging must meet the program’s residential charging restrictions.",
        "Applications must include required purchase and installation documentation."
      ],
      "blockers": [
        "Refrigerator and freezer support is recycling only, not a rebate for new commercial refrigeration or broad refrigeration equipment.",
        "Induction support is for residential cooking appliances, not commercial kitchen equipment.",
        "EV charging support is Level 2 only and cannot be used for resale or fee-collection charging arrangements.",
        "Broad high-efficiency HVAC should be narrowed to supported heat pump systems."
      ],
      "programType": "Rebate Program",
      "administrator": "Empire Electric Association, Inc.",
      "applicationUrl": null,
      "websiteUrl": "https://eea.coop/residential-energy-efficiency-program",
      "sourceUrlsChecked": [
        "https://eea.coop/residential-energy-efficiency-program",
        "https://eea.coop/sites/default/files/2026_EEP_Residential_Products_Program%20_2026_03_18.pdf",
        "https://programs.dsireusa.org/system/program/detail/3585/empire-electric-association-residential-energy-efficiency-rebate-program"
      ],
      "evidenceText": "EEA’s]( 2026 residential products sheet lists Level 2 EV charging, smart thermostats, refrigerator and freezer recycling, induction ranges, heat pump water heaters, dryers, and heat pump rebates for air-source, air-to-water and ground-source systems.",
      "reasoningNotes": "The original geothermal, heat pump, heat pump water heater and Level 2 EV matches are correct. Refrigeration and induction matches needed residential product-specific narrowing."
    },
    "existingSimpleRules": [
      {
        "id": "oir_53b9a6f75bc8d5b1_v1",
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
          "maxAmountCents": 25000
        },
        "confidence": "medium",
        "formula": "50% of Level 2 charger cost and installation, capped at $250 for standard residential service",
        "evidenceText": "EEA 2026 form lists Level 2 EV charger at 50% cost and installation up to $250 for All Energy Rate.",
        "sourceUrlsChecked": [
          "https://eea.coop/residential-energy-efficiency-program"
        ],
        "reasoningNotes": "Matched Level 2 charging term. Standard residential service is the most generally applicable value.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22084",
    "opportunityName": "La Plata Electric Association - Commercial Energy Efficiency Rebate Program",
    "state": "CO",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22084/la-plata-electric-association-commercial-energy-efficiency-rebate-program",
    "websiteUrl": "https://lpea.coop/rebates",
    "applicationUrl": null,
    "administrator": "La Plata Electric Association",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 7,
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
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "CO"
        ],
        "counties": [
          "La Plata County",
          "Archuleta County"
        ],
        "cities": [],
        "utilityTerritories": [
          "La Plata Electric Association"
        ],
        "notes": "Available to qualifying LPEA members in the cooperative service territory. Commercial EV and custom measures have additional site and operating restrictions."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "business",
        "multifamily_property_owner",
        "residential_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "multifamily",
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "ground_source_geothermal_heat_pump",
        "air_to_water_heat_pump",
        "heat_pump_water_heater",
        "custom_commercial_space_heating",
        "custom_commercial_water_heating",
        "level_2_ev_charger_installation",
        "multifamily_level_2_ev_charger_installation",
        "lighting_controls_retrofit",
        "energy_audit",
        "battery_storage_system",
        "electric_thermal_storage_heating",
        "heat_pump_clothes_dryer"
      ],
      "hardRequirements": [
        "Applicant must be an LPEA member.",
        "Rebate application must be submitted within the stated post-installation deadline unless preapproval is required.",
        "Commercial custom space- and water-heating projects must apply before purchase or installation and are evaluated case by case.",
        "Commercial EV charging applicants must contact LPEA before work begins and meet public or non-public charger requirements."
      ],
      "blockers": [
        "Do not match broad commercial LED fixture replacement; current commercial lighting support is for LED controls.",
        "Custom commercial space and water heating is case-by-case and should not automatically match every HVAC or water-heating replacement.",
        "Non-public EV chargers must avoid peak operation and may be limited in fee collection or data sharing.",
        "DC fast charging was not verified as a prescriptive rebate category."
      ],
      "programType": "Rebate Program",
      "administrator": "La Plata Electric Association",
      "applicationUrl": null,
      "websiteUrl": "https://lpea.coop/rebates",
      "sourceUrlsChecked": [
        "https://lpea.coop/rebates",
        "https://lpea.coop/heat-pump-water-heater-rebates",
        "https://lpea.coop/heat-pump-rebatesmini-split-system-rebates",
        "https://lpea.coop/public-or-commercial-ev-charging-station-rebates",
        "https://lpea.coop/sites/default/files/2026_03/2026%20LPEA%20Rebates%20One%20Pager.pdf",
        "https://programs.dsireusa.org/system/program/detail/22084/la-plata-electric-association-commercial-energy-efficiency-rebate-program"
      ],
      "evidenceText": "LPEA]( 2026 rebate pages list member rebates for heat pumps, heat pump water heaters, energy audits, battery storage, Level 2 commercial EV charging, multifamily EV charging and commercial LED controls.",
      "reasoningNotes": "The heat pump, heat pump water heater and Level 2 EV matches are supported. Broad LED lighting and broad high-efficiency HVAC should be narrowed to current LPEA categories."
    },
    "existingSimpleRules": [
      {
        "id": "oir_ce27fcb3861ca856_v1",
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
          "maxAmountCents": 25000
        },
        "confidence": "high",
        "formula": "50% of non-public commercial Level 2 charger and installation cost, capped at $250",
        "evidenceText": "LPEA commercial rebate page lists non-public or non-fee Level 2 chargers at 50% of cost and installation, up to $250.",
        "sourceUrlsChecked": [
          "https://lpea.coop/commercial-ev-charger-rebates"
        ],
        "reasoningNotes": "Source distinguishes public and non-public commercial charger amounts.",
        "mapping": {
          "primarySavingsModelId": "ev_charging_site_load",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_da470753828873cd_v1",
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
          "maxAmountCents": 100000
        },
        "confidence": "high",
        "formula": "50% of public Level 2 charger and installation cost, capped at $1,000",
        "evidenceText": "LPEA commercial rebate page lists public Level 2 EV chargers at 50% of cost and installation, up to $1,000.",
        "sourceUrlsChecked": [
          "https://lpea.coop/commercial-ev-charger-rebates"
        ],
        "reasoningNotes": "Matched EV charger and Level 2 terms. Public charger amount is the larger commercial candidate.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2106",
    "opportunityName": "United Power - Residential Energy Efficient Appliance Rebate Program",
    "state": "CO",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2106/united-power-residential-energy-efficient-appliance-rebate-program",
    "websiteUrl": "https://www.unitedpower.com/rebates",
    "applicationUrl": null,
    "administrator": "United Power",
    "programType": "Residential Rebate And Demand Response Incentive Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 7,
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
          "CO"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "United Power electric service territory"
        ],
        "notes": "Limited to United Power members with permanent residential electric service."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "electric_cooperative_member"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "ground_source_geothermal_heat_pump",
        "heat_pump_water_heater",
        "electric_water_heater_conversion",
        "ev_make_ready_electrical_upgrade",
        "ev_panel_upgrade_for_level_2_charging",
        "smart_thermostat_demand_response_enrollment"
      ],
      "hardRequirements": [
        "Applicant must be a United Power member with permanent residential electric service.",
        "Rebate requests generally must be submitted within 90 days of purchase or installation.",
        "Heat pump and water heater equipment must meet stated efficiency and documentation requirements.",
        "EV wiring and panel rebates require Level 2 charger-related installation by a licensed electrician.",
        "Smart thermostat incentive is tied to Smart Rewards demand response enrollment, not a purchase rebate."
      ],
      "blockers": [
        "United Power states it does not offer smart thermostat purchase rebates.",
        "Level 2 charger hardware should not be matched unless the measure is the eligible wiring or panel upgrade.",
        "New construction is excluded for several heat pump and water heater rebates.",
        "Commercial applicants and commercial equipment are not eligible under this residential program.",
        "Standard electric-to-standard electric water heater replacement is not supported."
      ],
      "programType": "Residential Rebate And Demand Response Incentive Program",
      "administrator": "United Power",
      "applicationUrl": null,
      "websiteUrl": "https://www.unitedpower.com/rebates",
      "sourceUrlsChecked": [
        "https://www.unitedpower.com/rebates",
        "https://www.unitedpower.com/ev-rebates",
        "https://www.unitedpower.com/heat-pumps",
        "https://www.unitedpower.com/water-heaters",
        "https://www.unitedpower.com/smart-rewards"
      ],
      "evidenceText": "United Power pages cover residential heat pumps, electric water heating, EV wiring and panel make-ready, and Smart Rewards thermostat enrollment; they say thermostat purchase rebates are not offered.",
      "reasoningNotes": "The EV and thermostat matches needed narrowing. This is not a broad EV charger rebate or generic energy management system rebate; the thermostat item is a demand response enrollment incentive."
    },
    "existingSimpleRules": [
      {
        "id": "oir_1e91f84f936512dc_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 100000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "equipment_plus_labor",
          "applicationOrder": 10
        },
        "cap": {
          "maxPercentOfBasis": 1
        },
        "confidence": "medium",
        "formula": "Up to $1,000 for Level 2 EV charger make-ready wiring for United EV participants",
        "evidenceText": "United Power EV rebates page lists United EV & Wiring Rebate up to $1,000 for Level 2 charger wiring.",
        "sourceUrlsChecked": [
          "https://www.unitedpower.com/ev-rebates",
          "https://www.unitedpower.com/unitedev"
        ],
        "reasoningNotes": "Matched Level 2 make-ready terms. Confidence is medium because invoice amount and United EV enrollment determine final value.",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_78a71778c4587f67_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 50000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "equipment_plus_labor",
          "applicationOrder": 10
        },
        "cap": {
          "maxPercentOfBasis": 1
        },
        "confidence": "medium",
        "formula": "Up to $500 for Level 2 EV charger make-ready wiring without United EV enrollment",
        "evidenceText": "United Power EV rebates page lists non-enrolled EV Home Charge Wiring Rebates up to $500 depending on invoice amount.",
        "sourceUrlsChecked": [
          "https://www.unitedpower.com/ev-rebates",
          "https://smarthub.tfaforms.net/2074"
        ],
        "reasoningNotes": "Returned separately because non-enrolled members have a lower make-ready cap.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5167",
    "opportunityName": "Sustainable Energy Utility (Electric & Gas) - Commercial and Multifamily Rebate Program",
    "state": "DC",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5167/sustainable-energy-utility-electric-and-gas-commercial-and-multifamily-rebate-program",
    "websiteUrl": "https://www.dcseu.com/business-rebates",
    "applicationUrl": null,
    "administrator": "District of Columbia Sustainable Energy Utility",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 7,
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
          "refrigeration",
          "refrigerator"
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
          "occupancy sensor"
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
          "DC"
        ],
        "counties": [],
        "cities": [
          "Washington"
        ],
        "utilityTerritories": [
          "District of Columbia Sustainable Energy Utility service area"
        ],
        "notes": "Available for qualifying District of Columbia commercial and multifamily properties."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "institutional_customer",
        "multifamily_property_owner",
        "small_business",
        "affordable_multifamily_property_owner"
      ],
      "eligibleSectors": [
        "commercial",
        "institutional",
        "multifamily_residential"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "ductless_mini_split_heat_pump",
        "high_efficiency_hvac_replacement",
        "hvac_controls_retrofit",
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "high_efficiency_refrigeration_equipment",
        "commercial_foodservice_equipment",
        "vending_machine_controls",
        "variable_frequency_drive_retrofit",
        "ecm_motor_retrofit",
        "high_efficiency_laundry_equipment",
        "energy_star_refrigerator",
        "energy_star_dehumidifier",
        "custom_energy_efficiency_project"
      ],
      "hardRequirements": [
        "Facility must be in the District of Columbia and meet DCSEU business rebate eligibility.",
        "Most projects require DCSEU pre-approval before installation.",
        "Equipment must be new and meet measure specifications.",
        "Rebated equipment must remain installed for the required term.",
        "Incentives are subject to fiscal-year terms, caps and funding availability."
      ],
      "blockers": [
        "Do not match single-family residential rebates to this commercial and multifamily program.",
        "Bulk appliance rebates are product-specific for qualifying multifamily, office or mixed-use settings.",
        "Central gas equipment is generally not rebated for market-rate, commercial, institutional or multifamily customers.",
        "Do not infer standalone smart thermostat zoning unless the current HVAC measure list supports it.",
        "EV and solar offerings are separate programs."
      ],
      "programType": "Rebate Program",
      "administrator": "District of Columbia Sustainable Energy Utility",
      "applicationUrl": null,
      "websiteUrl": "https://www.dcseu.com/business-rebates",
      "sourceUrlsChecked": [
        "https://www.dcseu.com/business-rebates",
        "https://www.dcseu.com/business-rebates/hvac",
        "https://www.dcseu.com/business-rebates/bulk-appliances",
        "https://www.dcseu.com/terms-and-conditions"
      ],
      "evidenceText": "DCSEU Business Rebates cover DC businesses, commercial property and multifamily, with rebates for lighting, HVAC, refrigeration, food service, vending, motors and bulk appliances. FY2026 terms require eligible customers, pre-approval, new equipment, utility-account connection and fund availability.",
      "reasoningNotes": "Keep commercial/multifamily HVAC, lighting, refrigeration, motors and bulk appliance categories. Narrow refrigerator and clothes-washer matches to product-specific bulk appliance measures."
    },
    "existingSimpleRules": [
      {
        "id": "oir_974b259c4a2b6c8d_v1",
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
        "formula": "$75 per ENERGY STAR certified commercial or multifamily refrigerator",
        "evidenceText": "DCSEU bulk appliance table lists ENERGY STAR refrigerators at $75.",
        "sourceUrlsChecked": [
          "https://www.dcseu.com/business-rebates/bulk-appliances"
        ],
        "reasoningNotes": "Matched refrigerator/refrigeration term. Use one unit as one qualifying refrigerator.",
        "mapping": {
          "primarySavingsModelId": "refrigeration_electric_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_f91cfc070865746c_v1",
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
        "formula": "$100 per ENERGY STAR Most Efficient refrigerator",
        "evidenceText": "DCSEU bulk appliance table lists ENERGY STAR Most Efficient refrigerators at $100.",
        "sourceUrlsChecked": [
          "https://www.dcseu.com/business-rebates/bulk-appliances"
        ],
        "reasoningNotes": "Higher refrigerator tier.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5412",
    "opportunityName": "Orlando Utilities Commission - Commercial Energy Efficiency Rebate Program",
    "state": "FL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5412/orlando-utilities-commission-commercial-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.ouc.com/solutions-programs/savings/rebates/",
    "applicationUrl": "https://my.ouc.com/",
    "administrator": "Orlando Utilities Commission",
    "programType": "Rebate And Commercial Incentive Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 7,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "cool_roof_reflective_roof",
        "displayName": "Cool roof / reflective roof coating",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "reflective roof"
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
          "FL"
        ],
        "counties": [
          "Orange",
          "Osceola"
        ],
        "cities": [
          "Orlando",
          "St. Cloud"
        ],
        "utilityTerritories": [
          "Orlando Utilities Commission electric service territory"
        ],
        "notes": "Energy rebates require the property to be in OUC electric service territory; water-only customers are excluded for energy measures."
      },
      "eligibleApplicantTypes": [
        "business_electric_customers",
        "commercial_property_owners",
        "landlords",
        "contractors",
        "builders"
      ],
      "eligibleSectors": [
        "commercial",
        "multifamily_residential",
        "industrial"
      ],
      "eligibleRetrofitCategories": [
        "cool_roof_reflective_roof",
        "heat_pump_hvac_retrofit",
        "heat_pump_water_heater",
        "commercial_cooling_equipment",
        "chiller_replacement",
        "insulation_upgrade",
        "duct_sealing_and_insulation",
        "window_film_shading_retrofit",
        "window_replacement",
        "led_lighting_retrofit",
        "fan_pump_motor_efficiency_upgrade",
        "industrial_process_efficiency"
      ],
      "hardRequirements": [
        "Applicant must be a qualifying OUC electric customer for energy rebates.",
        "Receipts or invoices must be dated and submitted within six months unless a specific new construction rule applies.",
        "Measures must meet OUC's individual efficiency specifications, documentation requirements, and local or state code requirements.",
        "C&I incentive projects require permanent demand reduction, summer energy savings, OUC approval, and may be capped at 50 percent of project cost."
      ],
      "blockers": [
        "Do not match OUC water-only customers to energy rebates.",
        "Cool roof is not generic roof replacement; window film is separate from ENERGY STAR window replacement.",
        "Battery storage, EV, solar, and self-generation are separate OUC offerings and should not be merged into the C&I efficiency incentive."
      ],
      "programType": "Rebate And Commercial Incentive Program",
      "administrator": "Orlando Utilities Commission",
      "applicationUrl": "https://my.ouc.com/",
      "websiteUrl": "https://www.ouc.com/solutions-programs/savings/rebates/",
      "sourceUrlsChecked": [
        "https://www.ouc.com/solutions-programs/savings/rebates/",
        "https://www.ouc.com/solutions-programs/savings/rebates/commercial-industrial-incentive-program/",
        "https://www.ouc.com/solutions-programs/savings/rebates/heat-pump-ac/",
        "https://www.ouc.com/solutions-programs/savings/rebates/heat-pump-water-heater/",
        "https://www.ouc.com/solutions-programs/savings/rebates/ceiling-insulation/",
        "https://www.ouc.com/solutions-programs/savings/rebates/window-film-solar-screen/",
        "https://www.ouc.com/solutions-programs/savings/rebates/windows/",
        "https://www.ouc.com/solutions-programs/savings/rebates/cool-reflective-roof/",
        "https://www.ouc.com/solutions-programs/savings/rebates/duct-repair-replacement/"
      ],
      "evidenceText": "OUC]( lists business electric rebates for heat pump A/C, ceiling insulation, duct repair, windows, window film, heat pump water heaters and cool roofs, plus C&I incentives for lighting, cooling and process savings.",
      "reasoningNotes": "The original categories are supported, including window replacement and window film as distinct measures. Add duct repair and custom C&I measures, but keep separate self-generation programs out."
    },
    "existingSimpleRules": [
      {
        "id": "oir_1ec6bc8242eda21b_v1",
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
        "formula": "$500 per ENERGY STAR heat pump water heater for new commercial construction",
        "evidenceText": "OUC new commercial construction page lists ENERGY STAR heat pump water heater at $500.",
        "sourceUrlsChecked": [
          "https://www.ouc.com/solutions-programs/savings/rebates/new-commercial-construction/",
          "http://www.ouc.com/business/business-rebates-programs/business-rebates-information"
        ],
        "reasoningNotes": "Matched heat pump water heater term. Use one unit as one qualifying water heater.",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_91926cd3990ab301_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 115000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "Up to $1,150 per ton for qualifying heat pump A/C",
        "evidenceText": "OUC rebates page lists heat pump A/C rebates from $45 to $1,150 based on size and SEER2 value.",
        "sourceUrlsChecked": [
          "https://www.ouc.com/solutions-programs/savings/rebates/",
          "http://www.ouc.com/business/business-rebates-programs/business-rebates-information"
        ],
        "reasoningNotes": "Matched heat pump and air-conditioning terms. Use unit_count as eligible tons only when size and efficiency tier are known.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22482",
    "opportunityName": "Orlando Utilities Commission - Efficiency Delivered®",
    "state": "FL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22482/orlando-utilities-commission-efficiency-delivered",
    "websiteUrl": "https://www.ouc.com/solutions-programs/savings/efficiency-delivered/homeowners-renter/",
    "applicationUrl": null,
    "administrator": "Orlando Utilities Commission",
    "programType": "Direct Install And Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 7,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "efficient_fan_blower_replacement",
        "displayName": "Efficient fan/blower replacement",
        "parentCategory": "motors_pumps_fans_drives",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "blower"
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
          "irrigation controller"
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
          "FL"
        ],
        "counties": [],
        "cities": [
          "Orlando"
        ],
        "utilityTerritories": [
          "Orlando Utilities Commission electric and water service territory"
        ],
        "notes": "Energy measures require OUC electric service; water measures require OUC water service."
      },
      "eligibleApplicantTypes": [
        "residential_utility_customer",
        "homeowner",
        "renter_with_owner_authorization"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "hvac_tune_up",
        "air_sealing_weatherization",
        "insulation_upgrade",
        "duct_sealing_and_insulation",
        "window_film_shading_retrofit",
        "smart_thermostat_zoning_retrofit",
        "high_efficiency_toilet_urinal",
        "smart_irrigation_controller",
        "low_flow_fixture_retrofit",
        "minor_plumbing_repairs",
        "hot_water_pipe_insulation"
      ],
      "hardRequirements": [
        "Customer must have an active OUC account in good standing.",
        "Customer must complete the required home audit and have at least six months of account history.",
        "Renters need lease and owner authorization.",
        "OUC contribution level is income-based and improvements are installed through the Efficiency Delivered process."
      ],
      "blockers": [
        "Blower match is a false positive; the program lists blower door testing, not fan or blower replacement.",
        "Window replacement is not supported; the program supports window film, caulking, and weather-stripping.",
        "A/C heat pump rebates and other OUC rebates are separate programs from Efficiency Delivered.",
        "Water measures are not available without OUC water service."
      ],
      "programType": "Direct Install And Rebate",
      "administrator": "Orlando Utilities Commission",
      "applicationUrl": null,
      "websiteUrl": "https://www.ouc.com/solutions-programs/savings/efficiency-delivered/homeowners-renter/",
      "sourceUrlsChecked": [
        "https://www.ouc.com/solutions-programs/savings/efficiency-delivered/homeowners-renter/",
        "https://www.ouc.com/solutions-programs/savings/rebates/"
      ],
      "evidenceText": "OUC]( describes Efficiency Delivered as audited energy and water improvements including insulation, duct leak repairs, thermostats, window film, toilet replacement, flow restrictors, and irrigation controllers.",
      "reasoningNotes": "Correct the false blower and window matches, and keep only the measures included in the Efficiency Delivered scope."
    },
    "existingSimpleRules": [
      {
        "id": "oir_bb5e422297abd247_v1",
        "incentiveType": "percent_of_basis_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "percent_of_basis",
          "percent": 0.85
        },
        "basisPolicy": {
          "basis": "eligible_cost_categories",
          "applicationOrder": 10
        },
        "cap": {
          "maxAmountCents": 250000
        },
        "confidence": "medium",
        "formula": "Up to 85% of eligible energy and water-saving home upgrade cost, capped at $2,500",
        "evidenceText": "OUC Efficiency Delivered says it offers up to $2,500 in upgrades and OUC covers up to 85% of cost.",
        "sourceUrlsChecked": [
          "https://www.ouc.com/solutions-programs/savings/efficiency-delivered/homeowners-renter/"
        ],
        "reasoningNotes": "Matched water and energy upgrade terms. Modeled as percent of eligible installed upgrade cost with the program cap.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1356",
    "opportunityName": "Tampa Electric - Residential Energy Efficiency Rebate Program",
    "state": "FL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1356/tampa-electric-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.tampaelectric.com/residential/saveenergy/",
    "applicationUrl": "https://saveenergy.tecoenergy.com/",
    "administrator": "Tampa Electric",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 7,
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
          "FL"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Tampa Electric service territory"
        ],
        "notes": "Residential Tampa Electric customers; some weatherization services are limited to selected communities or qualifying homes."
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
        "energy_audit",
        "high_efficiency_hvac_replacement",
        "heat_pump_hvac_retrofit",
        "ground_source_geothermal_heat_pump",
        "ceiling_insulation_upgrade",
        "smart_thermostat_zoning_retrofit",
        "duct_sealing_discount",
        "low_income_or_targeted_weatherization",
        "air_sealing_weatherization"
      ],
      "hardRequirements": [
        "Applicant must be a Tampa Electric residential customer.",
        "Heating and cooling rebate applications require qualifying equipment, AHRI documentation and timely submission.",
        "Ceiling insulation requires pre-approval attic inspection and timely documentation.",
        "Smart thermostat must be ENERGY STAR qualified and meet program documentation rules.",
        "Ductwork discount requires pre-approval inspection and a TECO-approved contractor.",
        "Neighborhood Weatherization is limited to selected qualifying communities or homes."
      ],
      "blockers": [
        "No current official Tampa Electric page lists a window replacement rebate.",
        "Energy audit is a nonphysical service.",
        "Neighborhood Weatherization is a no-cost targeted service, not a general rebate category.",
        "Current heating and cooling pages do not support a ductless mini-split match.",
        "Energy Planner participation can conflict with the smart thermostat rebate."
      ],
      "programType": "Rebate Program",
      "administrator": "Tampa Electric",
      "applicationUrl": "https://saveenergy.tecoenergy.com/",
      "websiteUrl": "https://www.tampaelectric.com/residential/saveenergy/",
      "sourceUrlsChecked": [
        "https://www.tampaelectric.com/residential/saveenergy/",
        "https://www.tampaelectric.com/residential/saveenergy/heatingcooling/",
        "https://www.tampaelectric.com/residential/saveenergy/ceilinginsulation/",
        "https://www.tampaelectric.com/residential/saveenergy/energystarsmartthermostat/",
        "https://www.tampaelectric.com/residential/saveenergy/ductwork/",
        "https://www.tampaelectric.com/residential/saveenergy/energyaudit/",
        "https://www.tampaelectric.com/residential/saveenergy/neighborhoodweatherization/"
      ],
      "evidenceText": "Tampa Electric’s Save Energy pages list residential rebates for heating/cooling, ceiling insulation and ENERGY STAR smart thermostats, plus ductwork discounts, free audits and targeted weatherization. Heating/cooling sources cover qualifying heat pumps, straight-cool or natural-gas heat and geothermal; no window rebate is listed.",
      "reasoningNotes": "Remove window replacement and ductless mini-split. Keep audit as nonphysical and weatherization only as targeted service or limited duct/ceiling measures."
    },
    "existingSimpleRules": [
      {
        "id": "oir_6b253cb0efbbb0c7_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 4000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$40 per lower-tier qualifying heat pump, AC, or geothermal system",
        "evidenceText": "Tampa Electric heating/cooling page lists $40 rebate for 16 SEER/15.2 SEER2 tier systems.",
        "sourceUrlsChecked": [
          "https://www.tampaelectric.com/residential/saveenergy/heatingcooling/",
          "https://www.tampaelectric.com/residential/saveenergy/"
        ],
        "reasoningNotes": "Returned separately because the source publishes two efficiency tiers.",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_d7e470294c29cb36_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 55000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$550 per high-efficiency heat pump, AC, or geothermal system",
        "evidenceText": "Tampa Electric heating/cooling page lists $550 rebate for 17 SEER/16.2 SEER2 tier systems.",
        "sourceUrlsChecked": [
          "https://www.tampaelectric.com/residential/saveenergy/heatingcooling/",
          "https://www.tampaelectric.com/residential/saveenergy/"
        ],
        "reasoningNotes": "Matched heat pump/geothermal terms. Use one unit as one qualifying replacement system.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4828",
    "opportunityName": "Diverse Power - Energy Efficient Existing Homes Rebate Program",
    "state": "GA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4828/diverse-power-energy-efficient-existing-homes-rebate-program",
    "websiteUrl": "https://www.diversepower.com/energy-tools/rebates/",
    "applicationUrl": "https://www.diversepower.com/content/uploads/Existing-Home-Rebates-revised-March-1-2021-2.pdf",
    "administrator": "Diverse Power",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 7,
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
          "duct sealing"
        ]
      },
      {
        "retrofitTypeId": "efficient_pump_replacement",
        "displayName": "Efficient pump replacement",
        "parentCategory": "motors_pumps_fans_drives",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "pump replacement"
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
          "GA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Diverse Power electric service territory"
        ],
        "notes": "Available to eligible Diverse Power member consumers for existing-home improvements."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "member_consumer",
        "homeowner"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "ductless_heat_pump",
        "ground_source_geothermal_heat_pump",
        "heat_pump_water_heater",
        "electric_water_heater",
        "programmable_thermostat",
        "insulation_upgrade",
        "blower_door_testing",
        "duct_leakage_testing"
      ],
      "hardRequirements": [
        "Must be an eligible Diverse Power member consumer.",
        "Existing-home rebate measures must meet current Diverse Power requirements.",
        "Whole-house improvement reimbursement requires blower door and duct leakage testing before the project.",
        "Equipment replacement must use qualifying electric or geothermal systems as specified."
      ],
      "blockers": [
        "Do not match efficient_pump_replacement; heat pump and water heater language does not support industrial pump replacement.",
        "Do not match waste_heat_recovery for this existing-home opportunity; waste heat recovery appears in new-construction water heating context, not existing-home retrofit.",
        "Do not infer industrial compressed-air or process categories from residential heat pump terms.",
        "Energy improvement loan is a separate financing offering."
      ],
      "programType": "Rebate Program",
      "administrator": "Diverse Power",
      "applicationUrl": "https://www.diversepower.com/content/uploads/Existing-Home-Rebates-revised-March-1-2021-2.pdf",
      "websiteUrl": "https://www.diversepower.com/energy-tools/rebates/",
      "sourceUrlsChecked": [
        "https://www.diversepower.com/energy-tools/rebates/",
        "https://www.diversepower.com/content/uploads/Existing-Home-Rebates-revised-March-1-2021-2.pdf",
        "https://www.diversepower.com/resources/energy-improvement-loan/"
      ],
      "evidenceText": "Diverse Power current rebate page lists existing-home heat pump, geothermal heat pump, electric or HP water heater, programmable thermostat and insulation incentives, with tests required before whole-house improvements.",
      "reasoningNotes": "Preserved residential HVAC, water heating, thermostat and insulation matches. Removed industrial pump and waste heat recovery false positives from this existing-home rebate."
    },
    "existingSimpleRules": [
      {
        "id": "oir_f0ee5a6bd84be7c0_v1",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22719",
    "opportunityName": "Georgia - Home Electrification and Appliance Rebate (HEAR) Program",
    "state": "GA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22719/georgia-home-electrification-and-appliance-rebate-hear-program",
    "websiteUrl": "https://energyrebates.georgia.gov/home-electrification-and-appliance-rebates",
    "applicationUrl": null,
    "administrator": "Georgia Environmental Finance Authority",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 7,
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
        "retrofitTypeId": "process_electrification_equipment",
        "displayName": "Process electrification equipment",
        "parentCategory": "compressed_air_industrial",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "electrification equipment"
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
        "utilityTerritories": [],
        "notes": "Statewide Georgia HEAR program for eligible Georgia households, subject to income and pathway requirements."
      },
      "eligibleApplicantTypes": [
        "homeowner",
        "renter",
        "income_eligible_household",
        "qualified_contractor"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "heat_pump_water_heater",
        "air_sealing_weatherization",
        "insulation_upgrade",
        "ventilation_upgrade",
        "residential_electric_stove_cooktop_range_oven",
        "heat_pump_clothes_dryer",
        "electric_combination_clothes_washer_dryer",
        "electrical_panel_upgrade",
        "electrical_wiring_upgrade"
      ],
      "hardRequirements": [
        "Household income must be at or below the program’s income eligibility threshold.",
        "Rebate percentage depends on whether household income is below 80 percent AMI or between 80 and 150 percent AMI.",
        "Most whole-home electrification measures must use the contractor pathway.",
        "Proof of purchase, installation and income eligibility is required.",
        "Replacing existing electric equipment with new electric equipment is generally prohibited except for stated exceptions."
      ],
      "blockers": [
        "Households above 150 percent AMI are not eligible.",
        "Commercial, industrial and process electrification measures are false positives for this residential HEAR program.",
        "High-efficiency oven must be narrowed to residential electric stove, cooktop, range or oven, not commercial kitchen equipment.",
        "Electric-to-electric replacements are blocked except for the listed dryer and water-heater exceptions."
      ],
      "programType": "Rebate Program",
      "administrator": "Georgia Environmental Finance Authority",
      "applicationUrl": null,
      "websiteUrl": "https://energyrebates.georgia.gov/home-electrification-and-appliance-rebates",
      "sourceUrlsChecked": [
        "https://energyrebates.georgia.gov/home-electrification-and-appliance-rebates",
        "https://programs.dsireusa.org/system/program/detail/22719/georgia-home-electrification-and-appliance-rebate-hear-program"
      ],
      "evidenceText": "Georgia]( HEAR lists income-based residential rebates for heat pumps, heat pump water heaters, electric cooking and dryer appliances, load centers, wiring, and insulation, air sealing and ventilation with contractor and DIY pathways.",
      "reasoningNotes": "Original heat pump, heat pump water heater, insulation and air sealing matches are correct. Commercial kitchen and process electrification matches are false positives and were narrowed or removed."
    },
    "existingSimpleRules": [
      {
        "id": "oir_2c0dc161f8f917f0_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "percent_of_basis",
          "percent": 1
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "100% of eligible project cost",
        "evidenceText": "Income Eligibility Rebate Below 80% AMI Up to 100% of the total project cost",
        "sourceUrlsChecked": [
          "https://energyrebates.georgia.gov/home-electrification-and-appliance-rebates"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2447",
    "opportunityName": "Linn County Rural Electric Cooperative - Residential and Small Commercial (<75kw) rebates",
    "state": "IA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2447/linn-county-rural-electric-cooperative-residential-and-small-commercial-75kw-rebates",
    "websiteUrl": "https://corridorenergy.coop/rebates/residential-small-commercial-rebates/",
    "applicationUrl": null,
    "administrator": "Corridor Energy Cooperative",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 7,
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
        "retrofitTypeId": "level_2_ev_charger_installation",
        "displayName": "Level 2 EV charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "level 2",
          "level-2",
          "level ii"
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
        "counties": [
          "Linn County",
          "Johnson County",
          "Jones County",
          "Cedar County",
          "Iowa County",
          "Benton County"
        ],
        "cities": [],
        "utilityTerritories": [
          "Corridor Energy Cooperative"
        ],
        "notes": "Corridor Energy Cooperative, formerly Linn County REC, serves rural and suburban Linn and Johnson counties with line extensions into Jones, Cedar, Iowa and Benton counties."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "small_commercial_customer",
        "member_owner"
      ],
      "eligibleSectors": [
        "residential",
        "small_commercial",
        "multifamily"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "ground_source_geothermal_heat_pump",
        "supplemental_mini_split_heat_pump",
        "heat_pump_water_heater",
        "level_2_ev_charger_installation",
        "fleet_level_2_ev_charger_installation",
        "residential_or_small_commercial_induction_cooktop_stove",
        "heat_pump_clothes_dryer",
        "balanced_ventilation_erv_hrv",
        "smart_plug_load_control",
        "water_heater_timer",
        "pool_pump_timer",
        "all_electric_new_construction_bonus"
      ],
      "hardRequirements": [
        "Account must be served by Corridor Energy Cooperative and fit the residential or small-commercial demand threshold.",
        "Applications must be submitted within the program’s stated purchase or installation window.",
        "EV charging must be Level II at the required voltage and meet rate, ownership and replacement restrictions.",
        "Heat pump water heater replacement and new-construction bonus measures must meet program-specific eligibility rules."
      ],
      "blockers": [
        "Air conditioner rebates ended and should not match this opportunity.",
        "Level 3 or DC fast charging is not supported by the current residential and small-commercial rebate page.",
        "Induction cooking is a residential or small-commercial appliance rebate and not commercial kitchen equipment.",
        "Accounts at or above the small-commercial demand threshold are excluded.",
        "Replacement EV chargers are not eligible, and heat pump water heater replacements are limited by prior HPWH history."
      ],
      "programType": "Rebate Program",
      "administrator": "Corridor Energy Cooperative",
      "applicationUrl": null,
      "websiteUrl": "https://corridorenergy.coop/rebates/residential-small-commercial-rebates/",
      "sourceUrlsChecked": [
        "https://corridorenergy.coop/rebates/residential-small-commercial-rebates/",
        "https://www.linncountyrec.com/energy-solutions/rebates/residential-rebates",
        "https://programs.dsireusa.org/system/program/detail/2447/linn-county-rural-electric-cooperative-residential-and-small-commercial-75kw-rebates"
      ],
      "evidenceText": "Corridor]( Energy’s 2026 page lists residential and small-commercial rebates for heat pumps, ground-source systems, heat pump water heaters, Level II EV charging, induction cooking, HP dryers, ventilation and smart controls.",
      "reasoningNotes": "The heat pump, geothermal, HPWH, Level 2 EV and induction matches are supported, but induction and EV must be narrowed to the listed residential and small-commercial product rules."
    },
    "existingSimpleRules": [
      {
        "id": "oir_aeacf6183154d7c5_v1",
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
        "evidenceText": "Heat Pump Rebate Supplemental Mini-Split Heat Pump Rebate Mini-Splits being installed as the primary heating source (whole-house mini-split system) will qualify as ENERGY STAR ($300/ton) or ENERGY STAR Cold Climate ($500/ton) if the existing heating source is electric",
        "sourceUrlsChecked": [
          "https://www.linncountyrec.com/energy-solutions/rebates/residential-rebates"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5037",
    "opportunityName": "Dominion Energy - ThermWise Commercial Energy Efficiency Rebate Program",
    "state": "ID",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5037/dominion-energy-thermwise-commercial-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.thermwise.com/business-rebates/",
    "applicationUrl": null,
    "administrator": "Enbridge Gas Utah, Idaho, and Wyoming",
    "programType": "Commercial Natural Gas Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 7,
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
          "Enbridge Gas Idaho ThermWise service territory"
        ],
        "notes": "ThermWise business rebates serve eligible Idaho gas customers through the Utah and Idaho business rebate pathway."
      },
      "eligibleApplicantTypes": [
        "commercial_gas_customer",
        "business_customer",
        "institutional_customer",
        "multifamily_business_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "institutional",
        "multifamily"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_boiler_retrofit",
        "high_efficiency_furnace_retrofit",
        "demand_control_ventilation",
        "advanced_rooftop_controls",
        "high_efficiency_gas_water_heater",
        "smart_thermostat_zoning_retrofit",
        "commercial_foodservice_equipment",
        "high_efficiency_laundry_equipment",
        "commercial_insulation_retrofit",
        "custom_natural_gas_efficiency_retrofit",
        "green_certified_new_building"
      ],
      "hardRequirements": [
        "Applicant must have an active Enbridge Gas Idaho business meter on an eligible general service rate schedule.",
        "Measures must meet current ThermWise business rebate requirements and use natural gas where applicable.",
        "Custom projects and multiple-measure applications require program review and approval."
      ],
      "blockers": [
        "Do not match residential appliances or residential weatherization.",
        "Do not match electric heat pumps, electric HVAC, or battery measures.",
        "Weatherization should be narrowed to commercial insulation retrofit; broad air sealing was not verified."
      ],
      "programType": "Commercial Natural Gas Rebate Program",
      "administrator": "Enbridge Gas Utah, Idaho, and Wyoming",
      "applicationUrl": null,
      "websiteUrl": "https://www.thermwise.com/business-rebates/",
      "sourceUrlsChecked": [
        "https://www.enbridgegas.com/utwyid/save-money/thermwise/business-rebates",
        "https://www.enbridgegas.com/utwyid/save-money/thermwise"
      ],
      "evidenceText": "ThermWise business rebate pages list Idaho business applications and measures for water heating, boilers, furnaces, demand-control ventilation, advanced rooftop controls, smart thermostats, food service, laundry, insulation retrofit, and custom projects.",
      "reasoningNotes": "Dominion branding has shifted to Enbridge, but ThermWise remains active. Categories should stay limited to business natural-gas measures."
    },
    "existingSimpleRules": [
      {
        "id": "oir_33b84885b803163f_v1",
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
        "formula": "$100 per commercial smart thermostat",
        "evidenceText": "ThermWise commercial smart thermostat application lists a $100 rebate.",
        "sourceUrlsChecked": [
          "https://www.enbridgegas.com/utwyid/save-money/thermwise/business-rebates"
        ],
        "reasoningNotes": "Matched commercial smart thermostat term. Medium because regional application routing may vary by state.",
        "mapping": {
          "primarySavingsModelId": "commercial_kitchen_equipment_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  }
]
