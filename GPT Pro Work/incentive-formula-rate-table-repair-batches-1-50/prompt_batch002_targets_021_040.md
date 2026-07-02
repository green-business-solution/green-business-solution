You are helping RetroFi repair incentive formulas, rate tables, grant estimates, tax credits, and non-cash workflow value rules.

Return strict JSON only. Do not include markdown, code fences, commentary, or citations outside JSON fields.

Batch: 2
Targets in this prompt: 21-40 of 984
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
  "batchNumber": 2,
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
  "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:1941"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3689",
    "opportunityName": "PEPCO - Commercial and Industrial Energy Efficiency Incentives Program",
    "state": "MD",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3689/pepco-commercial-and-industrial-energy-efficiency-incentives-program",
    "websiteUrl": "https://homeenergysavings.pepco.com/md/business/overview",
    "applicationUrl": "https://homeenergysavings.pepco.com/md/business/applyMLB",
    "administrator": "Potomac Electric Power Company",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 13,
    "targetKind": "existing_simple_rule_v2_repair",
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
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "air conditioner",
          "chiller"
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
        "retrofitTypeId": "refrigeration_controls_retrofit",
        "displayName": "Refrigeration controls retrofit",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "refrigeration controls"
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
          "vfd"
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
          "MD"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Pepco Maryland commercial electric service territory"
        ],
        "notes": "Offer is valid for Pepco commercial customers in Maryland only under the EmPOWER Maryland business program."
      },
      "eligibleApplicantTypes": [
        "Pepco Maryland commercial customers",
        "small business customers",
        "medium business customers",
        "large business customers",
        "multifamily property customers where applicable",
        "municipal and government customers",
        "institutional customers",
        "contractors or service providers with customer authorization"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "government",
        "municipal",
        "education",
        "healthcare",
        "office",
        "retail",
        "grocery and convenience",
        "multifamily",
        "hospitality",
        "food service"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "exterior_site_lighting_retrofit",
        "high_efficiency_hvac_replacement",
        "heat_pump_hvac_retrofit",
        "hvac_controls_retrofit",
        "smart_thermostat_zoning_retrofit",
        "ground_source_geothermal_heat_pump",
        "heat_pump_water_heater",
        "high_efficiency_refrigeration_equipment",
        "refrigeration_ec_motor_retrofit",
        "refrigeration_controls_retrofit",
        "anti_sweat_heater_controls",
        "door_gasket_strip_curtain_night_cover",
        "window_replacement",
        "window_film_shading_retrofit",
        "high_efficiency_laundry_equipment",
        "demand_controlled_kitchen_ventilation",
        "variable_frequency_drive_retrofit",
        "efficient_air_compressor",
        "efficient_ice_machine",
        "high_efficiency_commercial_dishwasher",
        "high_efficiency_fryer",
        "high_efficiency_oven",
        "high_efficiency_steamer",
        "combined_heat_and_power_system"
      ],
      "hardRequirements": [
        "Applicant must be a Pepco commercial customer in Maryland.",
        "Projects must follow the Energy Savings for Business program pathway applicable to small business, medium/large business, instant discounts, custom, new construction, building tune-up, CHP, or multifamily.",
        "All prescriptive and custom projects require preapproval before purchase or installation where stated in current materials.",
        "Existing equipment generally may not be removed, altered, purchased, or installed before the program preapproval letter for projects requiring preapproval.",
        "Qualifying equipment must meet program application specifications, technical sheets, and incentive-reference requirements.",
        "Incentives and rates are subject to change and program funding availability under EmPOWER Maryland."
      ],
      "blockers": [
        "Window units are HVAC equipment and should not be confused with building window replacement; only listed window glazing or window film measures should match building-envelope windows.",
        "Low-flow pre-rinse valves are product-specific commercial kitchen measures and should not be generalized into broad low-flow plumbing retrofits unless explicitly mapped.",
        "CHP is a separate pathway within the Pepco business program and requires project-specific review; do not match ordinary HVAC or boiler projects as CHP.",
        "Commercial clothes washer incentives are product-specific and should not be generalized to all laundry-room retrofits.",
        "Custom, building tune-up, monitoring-based commissioning, and new-construction measures have separate rules and savings verification requirements."
      ],
      "programType": "Rebate Program",
      "administrator": "Potomac Electric Power Company",
      "applicationUrl": "https://homeenergysavings.pepco.com/md/business/applyMLB",
      "websiteUrl": "https://homeenergysavings.pepco.com/md/business/overview",
      "sourceUrlsChecked": [
        "https://programs.dsireusa.org/system/program/detail/3689/pepco-commercial-and-industrial-energy-efficiency-incentives-program",
        "https://homeenergysavings.pepco.com/md/business/overview",
        "https://homeenergysavings.pepco.com/md/business/applyMLB",
        "https://homeenergysavings.pepco.com/sites/default/files/public/Pepco_CI_IncentiveReference_Sheet.pdf",
        "https://homeenergysavings.pepco.com/md/business/chp",
        "https://energy.maryland.gov/pages/facts/empower.aspx"
      ],
      "evidenceText": "Current Pepco Maryland Energy Savings for Business sources describe incentives for small, medium, and large businesses, instant discounts, new construction, building tune-up, CHP, and multifamily projects. The 2026 incentive reference sheet lists lighting and controls, thermostats, heat pump water heaters, commercial clothes washers, window film and glazing, heat pumps, geothermal heat pumps, VFDs, compressed air measures, refrigeration measures, ice machines, fryers, steam cookers, convection and combination ovens, commercial dishwashers, and preapproval requirements.",
      "reasoningNotes": "The current Pepco source supports a broad business portfolio. Matching should distinguish product-specific kitchen, refrigeration, window, laundry, CHP, and HVAC submeasures rather than treating them as generic building retrofits."
    },
    "existingSimpleRules": [
      {
        "id": "oir_0614e309a5dee43d_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "percent_of_basis",
          "percent": 0.5
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "50% of eligible project cost",
        "evidenceText": "If you are a customer with existing facilities, we offer financial incentives that can cover up to 50% of the project cost for a number of energy-efficient upgrades",
        "sourceUrlsChecked": [
          "https://homeenergysavings.pepco.com/business/applyMLB?_ga=2.121639691.1070240287.1533837187-1129095877.1533837187"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1882",
    "opportunityName": "Modesto Irrigation District - Residential Energy Efficiency Rebate Program",
    "state": "CA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1882/modesto-irrigation-district-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.mid.org/saving-energy-money/rebates/residential-rebates/",
    "applicationUrl": "https://www.mid.org/mid-home-rebate-application/",
    "administrator": "Modesto Irrigation District",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 12,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "air_filtration_system",
        "displayName": "Air filtration system",
        "parentCategory": "indoor_air_quality_ventilation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "filtration"
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
          "CA"
        ],
        "counties": [
          "Stanislaus County"
        ],
        "cities": [
          "Modesto"
        ],
        "utilityTerritories": [
          "Modesto Irrigation District electric service territory"
        ],
        "notes": "Limited to qualifying MID residential electric customers."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customer"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_hvac_replacement",
        "heat_pump_hvac_retrofit",
        "heat_pump_water_heater",
        "insulation_upgrade",
        "window_replacement",
        "window_sunscreen_shading",
        "smart_thermostat_demand_response",
        "residential_refrigerator_rebate",
        "high_efficiency_laundry_equipment",
        "residential_induction_cooking",
        "room_air_conditioner"
      ],
      "hardRequirements": [
        "Applicant must be an MID residential electric customer.",
        "Equipment must meet current MID residential rebate specifications.",
        "HVAC and heat-pump measures may have size, permit, and household quantity limits.",
        "Power Smart thermostat participation requires qualifying smart thermostat enrollment.",
        "Applications and supporting documentation must satisfy MID current application rules."
      ],
      "blockers": [
        "Do not match commercial kitchen equipment; induction support is residential cooktop support only.",
        "Do not match commercial refrigeration; refrigerator support is residential appliance support.",
        "Air filtration was not verified from current official MID sources.",
        "EV charger incentives appear separate and should not be matched to this residential home rebate.",
        "Energy management systems should not be inferred beyond smart thermostat demand response."
      ],
      "programType": "Rebate Program",
      "administrator": "Modesto Irrigation District",
      "applicationUrl": "https://www.mid.org/mid-home-rebate-application/",
      "websiteUrl": "https://www.mid.org/saving-energy-money/rebates/residential-rebates/",
      "sourceUrlsChecked": [
        "https://www.mid.org/saving-energy-money/rebates/residential-rebates/",
        "https://www.mid.org/mid-home-rebate-application/",
        "https://www.mid.org/saving-energy-money/rebates/power-smart/",
        "https://www.mid.org/saving-energy-money/rebates/power-smart/approved-thermostat-models/",
        "https://www.mid.org/saving-energy-money/home-saving-tips/three-easy-ways-to-help-manage-your-electric-bill/"
      ],
      "evidenceText": "Official MID pages and snippets identify residential rebates for HVAC, heat pumps, insulation, windows or sunscreens, appliances, heat pump water heaters, induction cooktops, and smart thermostats.",
      "reasoningNotes": "Direct page access was limited, but official MID snippets were stronger than the prior repair. Confidence can rise to medium while keeping residential-only and product-specific boundaries."
    },
    "existingSimpleRules": [
      {
        "id": "oir_193243e7dbc71200_v1",
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
        "formula": "Up to $350 per eligible Level 2 EV charger",
        "evidenceText": "MID EV charger rebate materials state customers may receive up to $350 for a Level 2 charger.",
        "sourceUrlsChecked": [
          "https://ev.chooseev.com/modesto/rebates/",
          "https://www.mid.org/electric-vehicles"
        ],
        "reasoningNotes": "Matched Level 2 EV charger term. Confidence is medium because the source says up to.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1924",
    "opportunityName": "Silicon Valley Power - Commercial Energy Efficiency Rebate Program",
    "state": "CA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1924/silicon-valley-power-commercial-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.siliconvalleypower.com/businesses/rebates",
    "applicationUrl": "https://siliconvalleypower2.my.site.com",
    "administrator": "Silicon Valley Power",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 12,
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
        "retrofitTypeId": "building_automation_system",
        "displayName": "Building automation system",
        "parentCategory": "building_controls_energy_management",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "building automation"
        ]
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
        "retrofitTypeId": "high_efficiency_fryer",
        "displayName": "High-efficiency fryer",
        "parentCategory": "commercial_kitchen_foodservice",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "fryer"
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
        "retrofitTypeId": "high_efficiency_refrigeration_equipment",
        "displayName": "High-efficiency refrigeration equipment",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "refrigeration",
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
        "retrofitTypeId": "led_lighting_retrofit",
        "displayName": "LED lighting retrofit",
        "parentCategory": "lighting",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
      },
      {
        "retrofitTypeId": "walk_in_cooler_freezer_upgrade",
        "displayName": "Walk-in cooler/freezer upgrade",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "walk in cooler"
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
          "Santa Clara"
        ],
        "cities": [
          "Santa Clara"
        ],
        "utilityTerritories": [
          "Silicon Valley Power electric service territory"
        ],
        "notes": "Program is for Silicon Valley Power nonresidential customers in the City of Santa Clara electric service territory."
      },
      "eligibleApplicantTypes": [
        "SVP nonresidential customers",
        "commercial customers",
        "industrial customers",
        "institutional customers",
        "nonprofit customers",
        "data center and high-load customers where eligible",
        "foodservice customers"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "institutional",
        "nonprofit",
        "food service",
        "data center",
        "multifamily common areas where eligible"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "high_efficiency_hvac_replacement",
        "heat_pump_hvac_retrofit",
        "heat_pump_water_heater",
        "high_efficiency_refrigeration_equipment",
        "building_automation_system",
        "high_efficiency_fryer",
        "demand_controlled_kitchen_ventilation"
      ],
      "hardRequirements": [
        "Project must be served by Silicon Valley Power.",
        "Most business rebate projects require contact with an SVP Energy Engineer, submitted application materials, savings calculations, pre-installation inspection, and written pre-approval before installation.",
        "Post-installation inspection and invoice/document upload are required before payment.",
        "Lighting equipment must meet current LED, controls, DLC, ENERGY STAR, UL/ETL, warranty, or equivalent program requirements.",
        "HVAC and heat pump measures must meet current SVP efficiency and application requirements.",
        "Building optimization requires existing HVAC controlled by a building automation or energy management system; new BAS or major BAS expansion belongs under the controls program, not building optimization.",
        "Custom customer-directed projects must reduce electric use in SVP territory and are subject to SVP review, savings verification, and program caps."
      ],
      "blockers": [
        "walk_in_cooler_freezer_upgrade is not separately supported by the current official page reviewed; keep only qualifying commercial refrigerator/freezer equipment or custom projects with SVP approval.",
        "anti_sweat_heater_controls is not supported by the current official source reviewed.",
        "high_efficiency_oven and induction_cooking_equipment are not explicit current foodservice rebate categories on the reviewed SVP page; they may be possible only if accepted under custom or electrification review, not automatic matching.",
        "Building automation optimization, controls-program projects, and customer-directed custom projects are separate paths with different preapproval requirements.",
        "Fuel-switching and self-generation/cogeneration exclusions apply where stated in SVP electrification or customer-directed program materials."
      ],
      "programType": "Rebate Program",
      "administrator": "Silicon Valley Power",
      "applicationUrl": "https://siliconvalleypower2.my.site.com",
      "websiteUrl": "https://www.siliconvalleypower.com/businesses/rebates",
      "sourceUrlsChecked": [
        "https://programs.dsireusa.org/system/program/detail/1924/silicon-valley-power-commercial-energy-efficiency-rebate-program",
        "https://www.siliconvalleypower.com/businesses/rebates",
        "https://www.siliconvalleypower.com/businesses/electrification-programs-rebates",
        "https://siliconvalleypower2.my.site.com"
      ],
      "evidenceText": "Silicon Valley Power's current business rebates page, updated June 30, 2026, lists lighting, HVAC, heat pump, heat pump water heater, building optimization, controls, customer-directed custom projects, and foodservice measures. Foodservice support visibly includes qualifying fryers, holding cabinets, commercial refrigerator/freezers, steam cookers, and demand-controlled kitchen ventilation. The process requires SVP engineer contact, pre-inspection, written pre-approval, installation, post-inspection, and documentation.",
      "reasoningNotes": "The repair preserves lighting, HVAC, heat pump, HPWH, refrigeration equipment, BAS/controls, fryer, and DCKV matches. It blocks unsupported or non-explicit kitchen and refrigeration subcategories unless separately approved as custom projects."
    },
    "existingSimpleRules": [
      {
        "id": "oir_3ec20178b72e5b03_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 140000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$1,400 per exhaust fan horsepower for demand-controlled kitchen ventilation",
        "evidenceText": "SVP food service rebate application lists demand-controlled kitchen ventilation at $1,400 per exhaust fan hp.",
        "sourceUrlsChecked": [
          "https://www.siliconvalleypower.com/businesses/rebates",
          "https://www.siliconvalleypower.com/home/showpublisheddocument/53816/638222676983930000"
        ],
        "reasoningNotes": "Matched kitchen ventilation and food-service terms. Use unit_count as eligible exhaust fan horsepower.",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_ee0652ad2ffcac96_v1",
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
        "formula": "$25 per linear foot for anti-sweat heater controls on vertical display cases",
        "evidenceText": "SVP food service/refrigeration materials list anti-sweat heater controls for display cases at $25 per linear foot.",
        "sourceUrlsChecked": [
          "https://www.siliconvalleypower.com/businesses/rebates",
          "https://www.siliconvalleypower.com/home/showpublisheddocument/53816/638222676983930000"
        ],
        "reasoningNotes": "Matched refrigeration and anti-sweat heater terms. Use unit_count as eligible linear feet.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1463",
    "opportunityName": "SoCalGas - Non-Residential Energy Efficiency Rebate Programs",
    "state": "CA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1463/socalgas-non-residential-energy-efficiency-rebate-programs",
    "websiteUrl": "https://www.socalgas.com/business/savings/equipment-rebates",
    "applicationUrl": "https://eecp.socalgas.com",
    "administrator": "Southern California Gas Company",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 12,
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
          "burner"
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
        "retrofitTypeId": "high_efficiency_commercial_dishwasher",
        "displayName": "High-efficiency commercial dishwasher",
        "parentCategory": "commercial_kitchen_foodservice",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "commercial dishwasher",
          "dishwasher"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_fryer",
        "displayName": "High-efficiency fryer",
        "parentCategory": "commercial_kitchen_foodservice",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "fryer"
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
        "retrofitTypeId": "high_efficiency_steamer",
        "displayName": "High-efficiency steamer",
        "parentCategory": "commercial_kitchen_foodservice",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "steamer"
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
          "CA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Southern California Gas Company natural gas service territory"
        ],
        "notes": "Program applies to eligible SoCalGas nonresidential natural gas customers and qualifying gas equipment installed in the service territory."
      },
      "eligibleApplicantTypes": [
        "SoCalGas nonresidential natural gas customers",
        "commercial customers",
        "industrial customers",
        "agricultural customers",
        "foodservice customers",
        "authorized third-party applicants"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "agricultural",
        "food service",
        "nonresidential multifamily common systems where eligible"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_boiler_retrofit",
        "boiler_controls_burner_retrofit",
        "solar_water_heating_system",
        "insulation_upgrade",
        "high_efficiency_commercial_dishwasher",
        "high_efficiency_fryer",
        "high_efficiency_oven",
        "high_efficiency_steamer",
        "waste_heat_recovery",
        "steam_trap_replacement"
      ],
      "hardRequirements": [
        "Applicant must be an eligible SoCalGas business customer or authorized third party.",
        "Equipment must be new qualifying energy-efficient natural gas equipment unless a listed measure states otherwise.",
        "Fuel switching does not qualify.",
        "Applications require applicable documentation such as W-9, receipts or proof of purchase, equipment specification sheets, and authorization forms where applicable.",
        "Equipment must meet current SoCalGas rebate guide, California Title 20, California Title 24, and measure-specific efficiency requirements.",
        "Most replacement measures must replace older equipment; commercial cooking equipment has measure-specific replacement rules.",
        "Applications and installation must meet current program-year deadlines and funding availability."
      ],
      "blockers": [
        "high_efficiency_hvac_replacement is too broad for this gas program; match only qualifying space-heating or boiler equipment.",
        "hvac_controls_retrofit is too broad; current controls are gas modulating controllers, boiler-related controls, recirculation controls, or economizers where specified.",
        "insulation_upgrade should be limited to pipe, fitting, and tank insulation or other listed gas-system insulation, not generic building envelope insulation.",
        "waste_heat_recovery should be limited to steam boiler stack economizers or approved process heat-recovery measures, not compressed-air heat recovery.",
        "Pre-rinse spray valves and laminar flow restrictors are product-specific water/gas-saving measures and should not be generalized into broad plumbing or low-flow fixture retrofits."
      ],
      "programType": "Rebate Program",
      "administrator": "Southern California Gas Company",
      "applicationUrl": "https://eecp.socalgas.com",
      "websiteUrl": "https://www.socalgas.com/business/savings/equipment-rebates",
      "sourceUrlsChecked": [
        "https://programs.dsireusa.org/system/program/detail/1463/socalgas-non-residential-energy-efficiency-rebate-programs",
        "https://www.socalgas.com/for-your-business/energy-savings/rebates-and-incentives",
        "https://www.socalgas.com/business/savings/equipment-rebates",
        "https://eecp.socalgas.com"
      ],
      "evidenceText": "SoCalGas current business equipment rebate materials list eligible gas measures including commercial and process boilers, space-heating boilers, gas modulating controllers, steam boiler stack economizers, steam traps, pipe/fittings insulation, tank insulation, commercial foodservice equipment including dishwashers, fryers, ovens, steamers, and commercial solar thermal water heating. The page states rebates are for new eligible energy-efficient natural gas equipment and that fuel switching does not qualify.",
      "reasoningNotes": "The repair keeps gas-specific boilers, controls, solar thermal water heating, listed insulation, foodservice, steam trap, and economizer/heat-recovery categories. Broad HVAC replacement and generic HVAC controls are false positives unless constrained to qualifying gas equipment."
    },
    "existingSimpleRules": [
      {
        "id": "oir_4019e70d11b92e88_v1",
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
        "formula": "Up to $1,200 per commercial fryer vat",
        "evidenceText": "SoCalGas 2026 business rebate guide lists commercial fryer rebates up to $1,200 per vat.",
        "sourceUrlsChecked": [
          "https://www.socalgas.com/business/savings/equipment-rebates",
          "https://www.socalgas.com/sites/default/files/2026_Business_Rebate_Guide.pdf"
        ],
        "reasoningNotes": "Matched fryer term. Returned as a distinct food-service candidate.",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_be6596bb0acf6374_v1",
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
        "formula": "Up to $750 per ENERGY STAR commercial dishwasher",
        "evidenceText": "SoCalGas 2026 business rebate guide lists commercial dishwasher rebates up to $750 per unit.",
        "sourceUrlsChecked": [
          "https://www.socalgas.com/business/savings/equipment-rebates",
          "https://www.socalgas.com/sites/default/files/2026_Business_Rebate_Guide.pdf"
        ],
        "reasoningNotes": "Matched commercial dishwasher term. Returned separately from steam traps.",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_c60984576d0c98d3_v1",
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
        "formula": "$100 per commercial steam trap",
        "evidenceText": "SoCalGas 2026 business equipment rebates list steam trap for commercial customers at $100 per unit.",
        "sourceUrlsChecked": [
          "https://www.socalgas.com/business/savings/equipment-rebates",
          "https://www.socalgas.com/sites/default/files/2026_Business_Rebate_Guide.pdf"
        ],
        "reasoningNotes": "Matched steam trap term. Use one unit as one eligible trap.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4281",
    "opportunityName": "Black Hills Energy (Electric) - Residential Energy Efficiency Program",
    "state": "CO",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4281/black-hills-energy-electric-residential-energy-efficiency-program",
    "websiteUrl": "https://www.blackhillsenergy.com/efficiency-and-savings/residential-rebates/colorado-electric-residential-rebates",
    "applicationUrl": "https://www.blackhillsenergy.com/sites/blackhillsenergy.com/files/2026-COE-EE-Residential-Precriptive-Rebate-App.pdf",
    "administrator": "Black Hills Energy",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 12,
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
        "retrofitTypeId": "energy_management_system",
        "displayName": "Energy management system",
        "parentCategory": "building_controls_energy_management",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "energy management system",
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
          "CO"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Black Hills Energy Colorado electric residential service territory"
        ],
        "notes": "This repair is for the Colorado electric residential rebate pathway, not Black Hills gas residential programs."
      },
      "eligibleApplicantTypes": [
        "Black Hills Energy Colorado electric residential customers",
        "homeowners",
        "residential property owners",
        "income-qualified residential customers where applicable",
        "builders or contractors for Ready Home Electric where applicable"
      ],
      "eligibleSectors": [
        "residential",
        "income-qualified residential",
        "single-family residential",
        "manufactured homes where eligible",
        "residential new construction where using the Ready Home Electric pathway"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_hvac_replacement",
        "heat_pump_hvac_retrofit",
        "smart_thermostat_zoning_retrofit",
        "high_efficiency_furnace_retrofit",
        "duct_sealing_and_insulation",
        "ground_source_geothermal_heat_pump",
        "heat_pump_water_heater",
        "insulation_upgrade",
        "air_sealing_weatherization",
        "energy_management_system",
        "high_efficiency_laundry_equipment",
        "high_efficiency_refrigeration_equipment",
        "efficient_fan_blower_replacement"
      ],
      "hardRequirements": [
        "Applicant must be a current Black Hills Energy Colorado electric residential customer for the residential electric rebate form.",
        "Equipment purchase and installation must be completed during the current 2026 program year and applications for 2026 work must be received by the stated 2027 deadline.",
        "Rebates are processed first-come, first-served and end when budget is depleted.",
        "Heating and cooling equipment must meet current efficiency requirements and include required AHRI or other documentation.",
        "Heat pump water heaters and smart thermostats must be ENERGY STAR rated.",
        "Envelope measures are retrofit-only and are not eligible for new construction or additions.",
        "Home must have a central cooling system to be eligible for insulation, air sealing, and duct sealing rebates.",
        "Rebates for envelope measures are for conditioned living spaces; measures for garages or shops are not eligible."
      ],
      "blockers": [
        "Do not use Colorado gas residential rebate pages to support this electric residential record.",
        "high_efficiency_furnace_retrofit should be limited to supported furnace blower motor ECM measures or gas-program records where applicable; do not infer a full furnace replacement rebate from the electric page.",
        "energy_management_system should be limited to listed smart power strips, smart thermostats, or home energy management measures, not commercial BAS.",
        "high_efficiency_refrigeration_equipment should be interpreted as listed residential refrigerator appliance rebates, not commercial refrigeration.",
        "high_efficiency_laundry_equipment should be interpreted as qualifying residential clothes washers, not commercial laundry equipment.",
        "EV charging may appear on other Black Hills residential pages, but it was not part of the current related-retrofit target for this record and should be handled as a separate EV charging opportunity if matched."
      ],
      "programType": "Rebate Program",
      "administrator": "Black Hills Energy",
      "applicationUrl": null,
      "websiteUrl": "https://www.blackhillsenergy.com/efficiency-and-savings/residential-rebates/colorado-electric-residential-rebates",
      "sourceUrlsChecked": [
        "https://programs.dsireusa.org/system/program/detail/4281/black-hills-energy-electric-residential-energy-efficiency-program",
        "https://www.blackhillsenergy.com/efficiency-and-savings/residential-rebates/colorado-electric-residential-rebates",
        "https://www.blackhillsenergy.com/sites/blackhillsenergy.com/files/2026-COE-EE-Residential-Precriptive-Rebate-App.pdf",
        "https://www.blackhillsenergy.com/sites/blackhillsenergy.com/files/2026-COE-EE-Ready-Home-Electric-Program-App.pdf",
        "https://www.blackhillsenergy.com/efficiency-and-savings/residential-rebates"
      ],
      "evidenceText": "Current Black Hills Energy Colorado electric residential sources list heat pumps, air conditioners, evaporative coolers, smart thermostats, water heaters, furnace blower motors, home appliances, insulation and sealing, Ready Home Electric, home energy evaluations, beneficial electrification, and income-qualified programs. The 2026 residential rebate form lists air-source, ductless, cold-climate and geothermal heat pumps, ENERGY STAR smart thermostats, ENERGY STAR heat pump water heaters, ECM furnace blower motors, insulation, air sealing, duct sealing, clothes washers, refrigerators, and other residential appliance measures.",
      "reasoningNotes": "The repair keeps the electric residential HVAC, heat pump, HPWH, thermostat, envelope, appliance, and ECM blower categories supported by the current 2026 form and blocks gas-program and commercial-control interpretations."
    },
    "existingSimpleRules": [
      {
        "id": "oir_3f0a82b0340af1db_v1",
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
        "formula": "$500 per ENERGY STAR heat pump water heater",
        "evidenceText": "Black Hills 2026 Colorado electric application lists ENERGY STAR heat pump water heater at $500.",
        "sourceUrlsChecked": [
          "https://www.blackhillsenergy.com/efficiency-and-savings/residential-rebates/colorado-electric-residential-rebates",
          "https://www.blackhillsenergy.com/sites/blackhillsenergy.com/files/2026-COE-EE-Residential-Precriptive-Rebate-App.pdf"
        ],
        "reasoningNotes": "Matched heat pump water heater term. Returned separately from thermostat.",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_b57d9c2e92aaadbf_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 6500,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$65 per ENERGY STAR smart thermostat",
        "evidenceText": "Black Hills 2026 Colorado electric application lists ENERGY STAR smart thermostat at $65.",
        "sourceUrlsChecked": [
          "https://www.blackhillsenergy.com/efficiency-and-savings/residential-rebates/colorado-electric-residential-rebates",
          "https://www.blackhillsenergy.com/sites/blackhillsenergy.com/files/2026-COE-EE-Residential-Precriptive-Rebate-App.pdf"
        ],
        "reasoningNotes": "Matched smart thermostat term. Use one unit as one qualifying thermostat.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4312",
    "opportunityName": "San Miguel Power Association - Energy Efficiency Rebate Program",
    "state": "CO",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4312/san-miguel-power-association-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.smpa.com/energy",
    "applicationUrl": null,
    "administrator": "San Miguel Power Association",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 12,
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
          "dc fast",
          "fast charger"
        ]
      },
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
          "ev charging",
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
        "cities": [],
        "utilityTerritories": [
          "San Miguel Power Association electric service territory"
        ],
        "notes": "Rebates are limited to current SMPA members for equipment installed at member accounts in SMPA territory."
      },
      "eligibleApplicantTypes": [
        "current SMPA residential members",
        "current SMPA commercial members",
        "public EV charger site hosts",
        "private commercial EV charger site hosts"
      ],
      "eligibleSectors": [
        "residential",
        "commercial",
        "transportation electrification"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "smart_thermostat_zoning_retrofit",
        "ground_source_geothermal_heat_pump",
        "heat_pump_water_heater",
        "ev_charger_installation",
        "level_2_ev_charger_installation",
        "dc_fast_charger_installation",
        "induction_cooking_equipment",
        "energy_audit"
      ],
      "hardRequirements": [
        "Applicant must be a current SMPA member.",
        "Equipment must be installed at the member account in SMPA territory.",
        "Applications require receipts, proof of purchase, make and model information, and any measure-specific documentation.",
        "Applications must be submitted within the current stated purchase/delivery window and annual program deadline.",
        "Rebates are subject to annual funding availability, inspection, per-category limits, and percentage-of-cost caps.",
        "Heat pumps and ground-source heat pumps must meet current SMPA efficiency, ENERGY STAR, AHRI, equipment-size, and cost-cap requirements.",
        "EV charger incentives apply only to new qualifying Level 2 or Level 3/DC fast charger equipment and require invoices, photos, and data-collection conditions for public or DC fast charging."
      ],
      "blockers": [
        "high_efficiency_hvac_replacement should not match as a broad category; current support is heat pump-specific.",
        "high_efficiency_refrigeration_equipment is a false positive for this record because the current refrigerator/freezer rebate is for disposal/recycling cost, not efficient replacement equipment.",
        "efficient_fan_blower_replacement is unsupported by the current official rebate page reviewed; do not confuse it with separate VSD or HVAC measures.",
        "Energy audit is an assessment rebate and should not be treated as installation of a physical retrofit.",
        "EV charging measures have Level 2 and DC fast charger-specific rules and should not be inferred for unrelated transportation work."
      ],
      "programType": "Rebate Program",
      "administrator": "San Miguel Power Association",
      "applicationUrl": null,
      "websiteUrl": "https://www.smpa.com/energy",
      "sourceUrlsChecked": [
        "https://programs.dsireusa.org/system/program/detail/4312/san-miguel-power-association-energy-efficiency-rebate-program",
        "https://www.ecoactionpartners.org/smparebates",
        "https://www.smpa.com/energy"
      ],
      "evidenceText": "The current SMPA energy page lists residential and commercial rebates for air-source, air-to-water, and ground-source heat pumps; heat pump water heaters; smart thermostats; induction cooktops; Level 2 and Level 3/DC fast EV charging; and residential/commercial energy audits. It also lists refrigerator/freezer disposal reimbursement rather than efficient refrigeration replacement.",
      "reasoningNotes": "The repair keeps heat pump, HPWH, thermostat, induction, EV charging, and audit matches. It removes broad HVAC, efficient refrigeration replacement, and fan/blower replacement because current official support is absent or product-specific in a different way."
    },
    "existingSimpleRules": [
      {
        "id": "oir_04f6ebdf96b58caa_v1",
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
          "maxAmountCents": 750000
        },
        "confidence": "high",
        "formula": "50% of 150+ kW DC fast charger equipment and installation cost, capped at $7,500",
        "evidenceText": "SMPA lists 150 kW and above Level 3 DC fast chargers at 50% cost up to $7,500.",
        "sourceUrlsChecked": [
          "https://www.smpa.com/energy",
          "https://smarthub.tfaforms.net/273"
        ],
        "reasoningNotes": "Matched DC fast charger terms. Returned the highest published DCFC tier for known 150+ kW chargers.",
        "mapping": {
          "primarySavingsModelId": "ev_charging_site_load",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_47f27845ceed198d_v1",
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
        "confidence": "high",
        "formula": "50% of public Level 2 EV charging equipment and installation cost, capped at $2,000",
        "evidenceText": "SMPA lists Level 2 Public Charger at 50% cost match up to $2,000 maximum.",
        "sourceUrlsChecked": [
          "https://www.smpa.com/energy",
          "https://smarthub.tfaforms.net/273"
        ],
        "reasoningNotes": "Returned separately because public chargers have a higher cap than private chargers.",
        "mapping": {
          "primarySavingsModelId": "ev_charging_site_load",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_718422edc358745c_v1",
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
          "maxAmountCents": 50000
        },
        "confidence": "high",
        "formula": "50% of private Level 2 EV charging equipment and installation cost, capped at $500",
        "evidenceText": "SMPA private Level 2 charger rebate covers 50% of equipment and installation up to $500 total.",
        "sourceUrlsChecked": [
          "https://www.smpa.com/energy",
          "https://smarthub.tfaforms.net/273"
        ],
        "reasoningNotes": "Matched Level 2 EV charging terms. Cap combines equipment and installation limits for private chargers.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4608",
    "opportunityName": "JEA - Commercial Energy Efficiency Rebate Program",
    "state": "FL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4608/jea-commercial-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.jea.com/business_resources/rebates_for_businesses/",
    "applicationUrl": "https://jeabusiness.customerapplication.com/",
    "administrator": "JEA",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 12,
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
          "cool roof"
        ]
      },
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
          "Jacksonville"
        ],
        "utilityTerritories": [
          "JEA electric service territory",
          "JEA water service territory for water measures"
        ],
        "notes": "Applies to eligible JEA commercial electric and water customers in the Jacksonville/Northeast Florida JEA service area; eligibility is tied to JEA service rather than county alone."
      },
      "eligibleApplicantTypes": [
        "JEA commercial electric customers",
        "JEA commercial water customers",
        "Small business customers on eligible rates",
        "Commercial property owners",
        "Business tenants with authority to install measures",
        "Trade allies and contractors",
        "Fleet or site hosts for electrification measures"
      ],
      "eligibleSectors": [
        "Commercial",
        "Industrial",
        "Small business",
        "Municipal",
        "Institutional"
      ],
      "eligibleRetrofitCategories": [
        "Lighting",
        "Lighting controls",
        "HVAC air conditioning",
        "Heat pump HVAC",
        "VFD",
        "Chillers",
        "HVAC tune-up",
        "Refrigeration",
        "Water heating",
        "Cool roof",
        "Window film",
        "Energy management systems",
        "Custom energy efficiency",
        "Water efficiency cooling towers",
        "Water efficiency ice machines",
        "Water efficiency restroom equipment",
        "Water efficiency kitchen equipment",
        "Smart irrigation controls",
        "Level 2 EV charging",
        "DC fast charging"
      ],
      "hardRequirements": [
        "Most Business Rebate Program projects require preapproval before purchase or installation.",
        "Commercial electric and water rebates are capped by annual program and customer limits stated by JEA.",
        "Electric rebates generally require a registered trade ally except emergency HVAC replacements under stated terms.",
        "Limited-time enhanced business rebate offer runs through August 31, 2026 according to JEA's current business rebate page.",
        "EV Level 2 and DCFC support is under JEA's separate business Electrification Rebate Program and has separate requirements."
      ],
      "blockers": [
        "Matched window maps to cool roof/window film only, not window replacement.",
        "Matched heat pump water heater was not retained as a separate category because the current readable JEA business pages checked list water heaters generally but did not confirm HPWH as a current distinct business measure.",
        "EV charging measures are not part of the core Business Rebate Program; they are a separate Electrification Rebate Program.",
        "Residential-only JEA rebates should not be mapped to this commercial record."
      ],
      "programType": "Rebate Program",
      "administrator": "JEA",
      "applicationUrl": "https://jeabusiness.customerapplication.com/",
      "websiteUrl": "https://www.jea.com/business_resources/rebates_for_businesses/",
      "sourceUrlsChecked": [
        "https://www.jea.com/business_resources/rebates_for_businesses/",
        "https://www.jea.com/business_resources/rebates_for_businesses/business_rebate_program/",
        "https://www.jea.com/Business_Resources/Rebates_for_Businesses/Electric_Savings/",
        "https://www.jea.com/business_resources/rebates_for_businesses/electrification_rebates_program/",
        "https://www.jea.com/uploadedFiles/jea.com/Business_Resources/Commercial_Rebates/JEA_BRP_flyer_v2_12.25-SH.pdf",
        "https://programs.dsireusa.org/system/program/detail/4608/jea-commercial-energy-efficiency-rebate-program"
      ],
      "evidenceText": "JEA's current business rebate pages list lighting, HVAC, refrigeration, water heaters, cool roof/window film, custom electric measures, and water-saving measures. JEA's business electrification page separately lists Level 2 and DC fast charging rebates, and the business rebate page states a limited-time enhanced offer through August 31, 2026.",
      "reasoningNotes": "The commercial record is active. Commercial and residential JEA measures were separated, and EV charging was retained only with the separate-program qualifier."
    },
    "existingSimpleRules": [
      {
        "id": "oir_306eab1a8e4e1931_v1",
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
        "confidence": "high",
        "formula": "$3,000 minimum per business DC fast charger",
        "evidenceText": "JEA electrification rebate table lists DC fast chargers at a $3,000 minimum rebate per charger.",
        "sourceUrlsChecked": [
          "https://www.jea.com/business_resources/rebates_for_businesses/electrification_rebates_program/",
          "https://www.jea.com/uploadedFiles/jea.com/Business_Resources/Commercial_Rebates/ElectrificationRebateProgram_EV%20Chargers_v2_12.25.pdf"
        ],
        "reasoningNotes": "Matched DC fast charging terms. Use one unit as one qualifying charger.",
        "mapping": {
          "primarySavingsModelId": "ev_charging_site_load",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_930d7dc78db91914_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 85000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$850 minimum per business Level 2 EV charger",
        "evidenceText": "JEA electrification rebate table lists Level 2 chargers at a $850 minimum rebate per charger.",
        "sourceUrlsChecked": [
          "https://www.jea.com/business_resources/rebates_for_businesses/electrification_rebates_program/",
          "https://www.jea.com/uploadedFiles/jea.com/Business_Resources/Commercial_Rebates/ElectrificationRebateProgram_EV%20Chargers_v2_12.25.pdf"
        ],
        "reasoningNotes": "Matched EV charging and Level 2 terms. Use one unit as one qualifying charger.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4723",
    "opportunityName": "JEA - Residential Energy Efficiency Rebate Program",
    "state": "FL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4723/jea-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.jea.com/ways_to_save/residential_rebates/",
    "applicationUrl": "https://customerrebate-efficiencynavigator.azurewebsites.net",
    "administrator": "JEA",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 12,
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
          "combined heat and power"
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
        "retrofitTypeId": "led_lighting_retrofit",
        "displayName": "LED lighting retrofit",
        "parentCategory": "lighting",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
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
          "smart thermostat",
          "thermostat"
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
          "solar water heating"
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
          "Jacksonville"
        ],
        "utilityTerritories": [
          "JEA electric service territory",
          "JEA water service territory for water measures"
        ],
        "notes": "Applies to eligible JEA residential electric or water customers in the JEA service area; measure eligibility depends on the customer's utility service."
      },
      "eligibleApplicantTypes": [
        "JEA residential electric customers",
        "JEA residential water customers",
        "Homeowners",
        "Residential account holders"
      ],
      "eligibleSectors": [
        "Residential"
      ],
      "eligibleRetrofitCategories": [
        "Attic insulation",
        "ENERGY STAR clothes washer",
        "Heat pump water heater",
        "Central air conditioner",
        "Heat pump HVAC",
        "Ductless mini-split heat pump",
        "HVAC tune-up",
        "Smart thermostat",
        "Smart irrigation controller",
        "Irrigation nozzles",
        "Room air conditioner",
        "Water-saving toilet",
        "Low-flow showerhead",
        "Air purifier",
        "Dehumidifier"
      ],
      "hardRequirements": [
        "Electric measures require JEA residential electric service; water measures require JEA residential water service.",
        "Many measures are limited to one or two rebates per product type per premise over a seven-year period.",
        "Applications generally must be submitted within 90 days of purchase or installation and by the stated 2026 program deadline.",
        "HVAC, heat pump, ductless mini-split and HPWH equipment must meet ENERGY STAR, AHRI, SEER2, HSPF2 or other JEA criteria where applicable.",
        "Attic insulation must be installed by a pre-qualified contractor and meet JEA R-value and existing-insulation criteria."
      ],
      "blockers": [
        "Matched combined heat and power is not supported by current JEA residential rebate sources.",
        "Matched dishwasher is not supported by current JEA residential rebate sources.",
        "Matched solar water heating is not supported by current JEA residential rebate sources.",
        "Matched toilet is limited to WaterSense toilet replacement for JEA residential water customers.",
        "This is a residential program and should not be matched to commercial JEA business rebate measures."
      ],
      "programType": "Rebate Program",
      "administrator": "JEA",
      "applicationUrl": "https://customerrebate-efficiencynavigator.azurewebsites.net",
      "websiteUrl": "https://www.jea.com/ways_to_save/residential_rebates/",
      "sourceUrlsChecked": [
        "https://www.jea.com/ways_to_save/residential_rebates/",
        "https://www.jea.com/residential_customers/residential_rebates/attic_insulation_rebates/",
        "https://www.jea.com/residential_customers/residential_rebates/clothes_washers_rebates/",
        "https://www.jea.com/residential_customers/residential_rebates/heat_pump_water_heaters/",
        "https://www.jea.com/residential_customers/residential_rebates/heating_and_cooling_rebates/",
        "https://www.jea.com/residential_customers/residential_rebates/irrigation_controller_and_nozzle_rebates/",
        "https://www.jea.com/residential_customers/residential_rebates/toilet_replacement_rebates/",
        "https://programs.dsireusa.org/system/program/detail/4723/jea-residential-energy-efficiency-rebate-program"
      ],
      "evidenceText": "JEA's residential rebates page lists attic insulation, clothes washer, HPWH, heating/cooling system, HVAC tune-up, smart thermostat, irrigation controller/nozzles, room AC, showerheads, toilet replacement, air purifier and dehumidifier. Measure pages give 2026 submission timing and customer-service requirements.",
      "reasoningNotes": "The record is active and residential. Unsupported matched terms such as CHP, dishwasher and solar water heating were removed, and water measures were limited to JEA water customers."
    },
    "existingSimpleRules": [
      {
        "id": "oir_b2001fd87f836183_v1",
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
        "evidenceText": "JEA heating and cooling page says it offers $50 rebates for ENERGY STAR certified Smart Thermostats.",
        "sourceUrlsChecked": [
          "https://www.jea.com/residential_customers/residential_rebates/heating_and_cooling_rebates/",
          "https://www.jea.com/Ways_to_Save/Residential_Rebates/"
        ],
        "reasoningNotes": "Matched smart thermostat term. Returned separately from the heat pump water heater candidate.",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_c21f0b997f9bae7b_v1",
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
        "formula": "$350 per ENERGY STAR heat pump water heater",
        "evidenceText": "JEA residential rebates list Heat Pump Water Heater at $350.",
        "sourceUrlsChecked": [
          "https://www.jea.com/ways_to_save/residential_rebates/",
          "https://www.jea.com/residential_customers/residential_rebates/heat_pump_water_heaters/"
        ],
        "reasoningNotes": "Matched heat pump water heater term. Selected a specific current JEA residential measure value.",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_e8a695a3448aa7d3_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 20000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$200 per ENERGY STAR certified HVAC system",
        "evidenceText": "JEA heating and cooling page says it offers $200 rebates on ENERGY STAR-certified HVAC systems.",
        "sourceUrlsChecked": [
          "https://www.jea.com/residential_customers/residential_rebates/heating_and_cooling_rebates/",
          "https://www.jea.com/Ways_to_Save/Residential_Rebates/"
        ],
        "reasoningNotes": "Matched air conditioner and heat pump terms. Use one unit as one qualifying HVAC system.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4130",
    "opportunityName": "Nicor Gas - Commercial Energy Efficiency Rebates",
    "state": "IL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4130/nicor-gas-commercial-energy-efficiency-rebates",
    "websiteUrl": "https://www.nicorgas.com/ways-to-save/business-savings/rebates.html",
    "applicationUrl": "https://apply.nicorgasrebates.com",
    "administrator": "Nicor Gas",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 12,
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
        "retrofitTypeId": "boiler_controls_burner_retrofit",
        "displayName": "Boiler controls / burner retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "boiler controls",
          "boiler reset"
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
        "retrofitTypeId": "exterior_door_replacement",
        "displayName": "Exterior door replacement",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "exterior door"
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
          "IL"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Nicor Gas natural gas service territory"
        ],
        "notes": "Program applies to eligible active Nicor Gas commercial, industrial, public/private-sector, small business, and multifamily natural gas customers, with measure-specific tracks."
      },
      "eligibleApplicantTypes": [
        "active commercial Nicor Gas customers",
        "small business customers",
        "public-sector customers",
        "private-sector customers",
        "industrial customers",
        "multifamily property owners and managers"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "public sector",
        "private sector",
        "small business",
        "multifamily",
        "food service",
        "agriculture"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_hvac_replacement",
        "smart_thermostat_zoning_retrofit",
        "high_efficiency_boiler_retrofit",
        "boiler_controls_burner_retrofit",
        "duct_sealing_and_insulation",
        "insulation_upgrade",
        "air_sealing_weatherization",
        "high_efficiency_laundry_equipment",
        "waste_heat_recovery",
        "steam_trap_replacement",
        "demand_controlled_ventilation"
      ],
      "hardRequirements": [
        "Customer must be an active Nicor Gas customer in the applicable eligible customer class.",
        "Qualifying equipment must be installed during the current program year and applications must be submitted by the program deadline or within the stated post-installation window.",
        "Equipment must meet Nicor Gas technical specifications for the applicable business or multifamily rebate category.",
        "Multifamily air sealing, attic insulation, duct sealing, and related weatherization measures are limited to the multifamily pathway and approved contractor requirements.",
        "Steam trap, boiler, water heating, foodservice, and efficiency-improvement measures require applicable worksheets, invoices, and technical documentation."
      ],
      "blockers": [
        "exterior_door_replacement is a false positive; current reviewed sources support door sweeps/weatherstripping and a garage-door hinge measure, not full exterior door replacement.",
        "duct_sealing_and_insulation should be limited to multifamily duct sealing or supported duct/pipe-related measures, not all C&I duct projects.",
        "insulation_upgrade is limited by measure type, such as pipe/tank insulation and multifamily attic insulation; do not match generic envelope insulation for all business customers.",
        "high_efficiency_laundry_equipment should be limited to ozone laundry and dryer modulation controls where eligible, not broad commercial washer replacement.",
        "waste_heat_recovery is supported as compressed-air heat recovery or specified efficiency-improvement equipment; do not generalize to all heat-recovery projects without utility confirmation."
      ],
      "programType": "Rebate Program",
      "administrator": "Nicor Gas",
      "applicationUrl": "https://apply.nicorgasrebates.com",
      "websiteUrl": "https://www.nicorgas.com/ways-to-save/business-savings/rebates.html",
      "sourceUrlsChecked": [
        "https://programs.dsireusa.org/system/program/detail/4130/nicor-gas-commercial-energy-efficiency-rebates",
        "https://www.nicorgas.com/business/ways-to-save/rebates.html",
        "https://www.nicorgas.com/ways-to-save/business-savings/rebates.html",
        "https://www.nicorgas.com/ways-to-save/multi-family-savings/multi-family-rebates.html",
        "https://apply.nicorgasrebates.com"
      ],
      "evidenceText": "Nicor Gas current business rebates cover space and water heating, steam traps, efficiency improvements, boiler tune-ups, commercial foodservice, and agriculture. Current pages and forms support boilers, boiler reset controls, thermostats, steam traps, pipe insulation, ozone laundry, dryer modulation controls, demand-controlled ventilation, demand-controlled kitchen ventilation, compressed-air heat recovery, and multifamily weatherization measures.",
      "reasoningNotes": "The repair preserves gas-related HVAC, boiler, controls, steam, selected envelope/weatherization, and specific efficiency-improvement measures. Exterior door replacement and overly broad laundry, insulation, and heat-recovery interpretations are blocked."
    },
    "existingSimpleRules": [
      {
        "id": "oir_5b1bca26dcace367_v1",
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
        "formula": "$100 per commercial steam trap with survey",
        "evidenceText": "Nicor 2026 commercial materials list commercial steam traps under 15 psig with survey at $100 per trap.",
        "sourceUrlsChecked": [
          "https://www.nicorgas.com/ways-to-save/business-savings/rebates.html",
          "https://www.nicorgas.com/content/dam/southern-co-gas/nicor-gas/docs/energy-efficiency/trade-ally/2026-nicor-gas-ee-trade-ally-launch-presentation.pdf"
        ],
        "reasoningNotes": "Matched steam trap term. Use one unit as one qualifying trap.",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_978cba609d6f28a3_v1",
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
        "confidence": "medium",
        "formula": "$25 per untested/no-survey commercial steam trap",
        "evidenceText": "Nicor 2026 commercial materials list no-survey/untested steam traps at $25 per trap.",
        "sourceUrlsChecked": [
          "https://www.nicorgas.com/ways-to-save/business-savings/rebates.html",
          "https://www.nicorgas.com/content/dam/southern-co-gas/nicor-gas/docs/energy-efficiency/commercial/20251219-commercial-steam-traps.pdf"
        ],
        "reasoningNotes": "Returned separately because the no-survey steam trap path has a lower amount.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2176",
    "opportunityName": "New Hampshire Electric Co-op - Commercial and Municipal Retrofit Energy Efficiency Programs",
    "state": "NH",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2176/new-hampshire-electric-co-op-commercial-and-municipal-retrofit-energy-efficiency-programs",
    "websiteUrl": "https://www.nhec.com/commercial-savings-programs/",
    "applicationUrl": null,
    "administrator": "New Hampshire Electric Co-op",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 12,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "efficient_ice_machine",
        "displayName": "Efficient ice machine",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "ice machine"
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
        "retrofitTypeId": "high_efficiency_fryer",
        "displayName": "High-efficiency fryer",
        "parentCategory": "commercial_kitchen_foodservice",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "fryer"
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
        "retrofitTypeId": "high_efficiency_refrigeration_equipment",
        "displayName": "High-efficiency refrigeration equipment",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "refrigeration",
          "refrigerator",
          "freezer"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_steamer",
        "displayName": "High-efficiency steamer",
        "parentCategory": "commercial_kitchen_foodservice",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "steamer"
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
          "NH"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "New Hampshire Electric Co-op electric service territory",
          "NHSaves participating utility territory where NHEC customers are eligible"
        ],
        "notes": "Eligibility is limited to NHEC commercial, industrial, and municipal/nonresidential electric accounts and related NHSaves C&I offers."
      },
      "eligibleApplicantTypes": [
        "commercial electric customers",
        "industrial electric customers",
        "municipal customers",
        "public-sector customers",
        "nonresidential utility customers",
        "participating foodservice distributors or dealers for point-of-sale foodservice offers",
        "EV charging site hosts served by NHEC"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "municipal",
        "public sector",
        "food service",
        "grocery and refrigeration",
        "laboratory and research",
        "institutional",
        "transportation electrification"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "high_efficiency_hvac_replacement",
        "heat_pump_hvac_retrofit",
        "hvac_controls_retrofit",
        "ground_source_geothermal_heat_pump",
        "high_efficiency_refrigeration_equipment",
        "efficient_ice_machine",
        "ev_charger_installation",
        "high_efficiency_commercial_dishwasher",
        "high_efficiency_fryer",
        "high_efficiency_oven",
        "high_efficiency_steamer"
      ],
      "hardRequirements": [
        "Customer or project must be in New Hampshire Electric Co-op service territory.",
        "Commercial and industrial prescriptive and custom projects generally require eligibility review and, for many measures, pre-approval before purchase or installation.",
        "Foodservice incentives apply only to qualifying equipment and participating distributor or dealer paths where required.",
        "EV charging incentive is limited to qualifying Level 2 or larger charging stations installed for eligible NHEC customers and is capped by station and property limits.",
        "Equipment must meet current NHSaves or NHEC technical requirements and documentation requirements."
      ],
      "blockers": [
        "Do not generalize foodservice product rebates into all commercial kitchen equipment; only listed qualifying equipment such as dishwashers, fryers, ovens, steamers, ice machines, and refrigeration should match.",
        "EV charging is a distinct NHEC transportation electrification incentive and should not be confused with core NHSaves C&I retrofit categories.",
        "Refrigeration matches should be limited to supported refrigeration equipment or lab-grade freezer/refrigerator measures; do not infer all cold-storage construction.",
        "Custom measures require utility review and cannot be matched solely from a generic technology keyword."
      ],
      "programType": "Rebate Program",
      "administrator": "New Hampshire Electric Co-op",
      "applicationUrl": null,
      "websiteUrl": "https://www.nhec.com/commercial-savings-programs/",
      "sourceUrlsChecked": [
        "https://programs.dsireusa.org/system/program/detail/2176/new-hampshire-electric-co-op-commercial-and-municipal-retrofit-energy-efficiency-programs",
        "https://www.nhec.com/commercial-savings-programs/",
        "https://nhsaves.com/businesses-towns/electric/",
        "https://nhsaves.com/businesses-towns/electric/electric-hvac-equipment/",
        "https://nhsaves.com/businesses-towns/commercial-food-service-equipment/",
        "https://nhsaves.com/wp-content/uploads/2026/01/NHSaves-FDSV-Customer-Flyer-v251230.pdf",
        "https://nhsaves.com/wp-content/uploads/2026/01/2026_HVACIncentive_NewEquipment-_1.20.26.pdf",
        "https://www.nhec.com/commercial-savings-programs/electric-vehicle-charging-incentive-application/",
        "https://www.nhec.com/wp-content/uploads/2026/03/2026-EV-CI-Changing-Instructions-Checklist-3-11-26kdc.pdf",
        "https://www.nhec.com/wp-content/uploads/2026/03/2026-EV-CI-Charging-Station-Term-Conditions-3-11-26-kdc.pdf"
      ],
      "evidenceText": "Current NHEC commercial savings information lists C&I upgrades including HVAC, lighting and controls, motors, VFDs, water heating, refrigeration, food service equipment, and weatherization. NHSaves current business electric materials support heat pumps, ground-source heat pumps, controls, refrigeration, and qualifying commercial foodservice equipment. NHEC also has a current EV charging incentive for Level 2 or larger charging stations.",
      "reasoningNotes": "The DSIRE match is mostly correct. The repair keeps the broad C&I retrofit categories only where current NHEC or NHSaves sources support them and notes EV charging and foodservice as product- or program-specific boundaries."
    },
    "existingSimpleRules": [
      {
        "id": "oir_91f1bbe5957cf462_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "percent_of_basis",
          "percent": 0.75
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": {
          "maxAmountCents": 250000
        },
        "confidence": "high",
        "formula": "75% of eligible project cost, capped at $2,500",
        "evidenceText": "Apply Now Instructions Checklist Terms & Conditions Install up to two (2) Level 2 or larger charging stations and qualify for an incentive of 75% of installed cost up to $2500",
        "sourceUrlsChecked": [
          "https://www.nhec.com/commercial-savings-programs/"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4644",
    "opportunityName": "Orange and Rockland Utilities (Electric) - Commercial Efficiency Programs",
    "state": "NY",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4644/orange-and-rockland-utilities-electric-commercial-efficiency-programs",
    "websiteUrl": "https://www.oru.com/en/save-money/rebates-incentives-credits/new-york-customers/incentives-for-business-customers-ny",
    "applicationUrl": null,
    "administrator": "Orange and Rockland Utilities",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 12,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "automated_demand_response_controls",
        "displayName": "Automated demand response controls",
        "parentCategory": "building_controls_energy_management",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "demand response"
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
        "retrofitTypeId": "high_efficiency_fryer",
        "displayName": "High-efficiency fryer",
        "parentCategory": "commercial_kitchen_foodservice",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "fryer"
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
        "retrofitTypeId": "high_efficiency_steamer",
        "displayName": "High-efficiency steamer",
        "parentCategory": "commercial_kitchen_foodservice",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "steamer"
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
          "NY"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Orange and Rockland Utilities New York service territory"
        ],
        "notes": "Applies to eligible O&R New York business customers with active electric and/or gas accounts depending on the measure."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "industrial_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial"
      ],
      "eligibleRetrofitCategories": [
        "custom_electric_efficiency_project",
        "custom_gas_efficiency_project",
        "energy_management_system",
        "hvac_controls_retrofit",
        "heat_pump_hvac_retrofit",
        "high_efficiency_hvac_replacement",
        "commercial_demand_response"
      ],
      "hardRequirements": [
        "Applicant must be an O&R New York business customer with active electric or gas service.",
        "Custom rebate projects require preapproval, engineering analysis, and pre-inspection.",
        "Custom electric and gas rebates are capped by current incentive, cost, and payback rules.",
        "Demand response is a separate Smart Usage Rewards business offering."
      ],
      "blockers": [
        "Foodservice equipment, low-flow fixtures, residential clothes washers, and prescriptive dishwasher, fryer, steamer, oven, boiler, or furnace matches were not verified on current O&R business pages.",
        "Demand response and EV infrastructure are separate O&R business offerings, not the custom efficiency rebate itself.",
        "Gas equipment can qualify only when supported by custom gas savings analysis and approval."
      ],
      "programType": "Rebate Program",
      "administrator": "Orange and Rockland Utilities",
      "applicationUrl": null,
      "websiteUrl": "https://www.oru.com/en/save-money/rebates-incentives-credits/new-york-customers/incentives-for-business-customers-ny",
      "sourceUrlsChecked": [
        "https://www.oru.com/en/save-money/rebates-incentives-credits/new-york-customers/incentives-for-business-customers-ny",
        "https://www.oru.com/en/save-money/rebates-incentives-credits/new-york-customers/incentives-for-business-customers-ny/custom-incentive-program",
        "https://www.oru.com/es/save-money/rebates-incentives-credits/new-york-customers/incentives-for-business-customers-ny/custom-incentive-program"
      ],
      "evidenceText": "O&R lists business custom electric and gas incentives requiring preapproval and analysis, plus separate heat pump, demand response, and EV infrastructure offerings.",
      "reasoningNotes": "The current official pages support custom business efficiency but not the specific prescriptive foodservice and plumbing categories in the original match."
    },
    "existingSimpleRules": [
      {
        "id": "oir_181cb5a5553cd79c_v1",
        "incentiveType": "custom_efficiency_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "rate_per_kwh",
          "amountCentsPerKwh": 16,
          "kwhSource": "annual_kwh_delta_abs"
        },
        "basisPolicy": {
          "basis": "eligible_cost_categories",
          "applicationOrder": 10
        },
        "cap": {
          "maxPercentOfBasis": 0.5
        },
        "confidence": "high",
        "formula": "Electric custom incentives are lesser of $0.16/kWh first-year savings or 50% of project cost",
        "evidenceText": "O&R custom rebate page states electric incentives use 50% of project cost or $0.16/kWh saved.",
        "sourceUrlsChecked": [
          "https://www.oru.com/en/save-money/rebates-incentives-credits/new-jersey-customers/incentives-for-business-customers-nj/custom-rebate-program"
        ],
        "reasoningNotes": "Matched commercial custom efficiency terms. Use for projects with verified annual kWh savings.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2593",
    "opportunityName": "EWEB - Commercial Energy Efficiency Rebates Program",
    "state": "OR",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2593/eweb-commercial-energy-efficiency-rebates-program",
    "websiteUrl": "https://www.eweb.org/business-rebates",
    "applicationUrl": "https://myaccount.eweb.org",
    "administrator": "Eugene Water & Electric Board",
    "programType": "Rebate and Loan Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 12,
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
        "retrofitTypeId": "energy_recovery_ventilation_retrofit",
        "displayName": "Energy recovery ventilation retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "heat recovery ventilation"
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
        "retrofitTypeId": "high_efficiency_toilet_urinal",
        "displayName": "High-efficiency toilet / urinal replacement",
        "parentCategory": "water_efficiency",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "toilet",
          "urinal"
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
          "OR"
        ],
        "counties": [],
        "cities": [
          "Eugene"
        ],
        "utilityTerritories": [
          "Eugene Water & Electric Board electric service territory",
          "Eugene Water & Electric Board water service territory for water measures"
        ],
        "notes": "Electric measures require EWEB commercial or general-service electric service as applicable; water conservation measures require EWEB water service."
      },
      "eligibleApplicantTypes": [
        "EWEB business electric customers",
        "EWEB general service metered customers",
        "Commercial property owners",
        "Industrial customers",
        "EWEB business water customers for water measures",
        "Multifamily property owners for eligible EV charging",
        "Developers for eligible new construction or custom projects"
      ],
      "eligibleSectors": [
        "Commercial",
        "Industrial",
        "Public",
        "Institutional",
        "Multifamily"
      ],
      "eligibleRetrofitCategories": [
        "LED lighting",
        "Heat pump HVAC",
        "Ductless mini-split heat pump",
        "Variable refrigerant flow heat pump",
        "Heat recovery ventilation",
        "Advanced rooftop unit controls",
        "VFD",
        "Connected thermostat",
        "Kitchen ventilation demand control",
        "Heat pump water heater",
        "Commercial refrigeration",
        "Anti-sweat heater controls",
        "Refrigeration case lighting",
        "Display case doors",
        "Strip curtains",
        "Building insulation",
        "Windows",
        "Level 2 multifamily/public EV charging",
        "Water efficiency toilets",
        "Water efficiency urinals",
        "Smart irrigation controller",
        "Custom energy efficiency",
        "Low-interest energy project financing"
      ],
      "hardRequirements": [
        "Commercial electric incentives are paid to the EWEB customer and generally require EWEB electric service for the affected facility.",
        "Rebates over 2500 dollars commonly require preapproval before equipment or materials are purchased.",
        "Lighting equipment must meet DLC, ENERGY STAR or EWEB-approved efficacy and warranty criteria.",
        "Heat pump water heater incentives require qualifying equipment and EWEB general service metering; consumer HPWH rebates are retrofit-only.",
        "Water conservation rebates require EWEB water service and specified WaterSense or performance criteria.",
        "Public or multifamily EV charging requires preapproval and is limited to eligible Level 2 infrastructure terms."
      ],
      "blockers": [
        "Matched DCFC was not retained; the EWEB business EV page checked supports Level 2 public or multifamily charging, not DC fast charging.",
        "EV charging is a separate EWEB electric mobility incentive, not a standard commercial efficiency measure.",
        "Solar electric is listed separately by EWEB and is not part of this commercial efficiency rebate repair.",
        "Toilet and urinal rebates apply only to eligible EWEB water customers and qualifying fixture replacements."
      ],
      "programType": "Rebate and Loan Program",
      "administrator": "Eugene Water & Electric Board",
      "applicationUrl": "https://myaccount.eweb.org",
      "websiteUrl": "https://www.eweb.org/business-rebates",
      "sourceUrlsChecked": [
        "https://www.eweb.org/business-rebates",
        "https://www.eweb.org/rebates-and-savings/business-incentives-rebates-and-conservation/lighting-upgrades",
        "https://www.eweb.org/rebates-and-savings/business-incentives-rebates-and-conservation/hvac-systems-rebates",
        "https://www.eweb.org/rebates-and-savings/business-incentives-rebates-and-conservation/refrigeration-rebates",
        "https://www.eweb.org/rebates-and-savings/business-incentives-rebates-and-conservation/windows-and-insulation",
        "https://www.eweb.org/rebates-and-savings/business-incentives-rebates-and-conservation/hpwh",
        "https://www.eweb.org/rebates-and-savings/business-incentives-rebates-and-conservation/water-conservation-rebates",
        "https://www.eweb.org/rebates-and-savings/electric-mobility/ev-incentives-business",
        "https://www.eweb.org/rebates-and-savings/business-incentives-rebates-and-conservation/new-construction-and-custom-projects",
        "https://programs.dsireusa.org/system/program/detail/2593/eweb-commercial-energy-efficiency-rebates-program"
      ],
      "evidenceText": "EWEB's business rebates page lists active lighting, HVAC, refrigeration, windows and insulation, heat pump water heaters, process and custom projects, business EV incentives, water conservation, new construction and multifamily offerings. Measure pages list DHP/mini-split, ASHP, VRF, HRV, RTU controls, VFDs, connected thermostats, kitchen ventilation, HPWH, refrigeration controls, insulation, windows and water fixture rebates.",
      "reasoningNotes": "The commercial record is active, but some matched terms belong to EWEB water conservation or electric mobility offerings rather than the core electric efficiency rebate. Categories were retained only where a current EWEB page supported them."
    },
    "existingSimpleRules": [
      {
        "id": "oir_05a37412dd010cfe_v1",
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
        "formula": "$1,500 per public or multifamily Level 2 EV charging port",
        "evidenceText": "EWEB business EV incentives list $1,500 per port for commercial public or multifamily Level 2 EVSE.",
        "sourceUrlsChecked": [
          "https://www.eweb.org/rebates-and-savings/electric-mobility/ev-incentives-business"
        ],
        "reasoningNotes": "Matched charging station and Level 2 terms. Use one unit as one charging port.",
        "mapping": {
          "primarySavingsModelId": "ev_charging_site_load",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_bd2578b2284e7b1d_v1",
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
        "formula": "$2,000 per affordable-housing Level 2 EV charging port",
        "evidenceText": "EWEB business EV incentives list $2,000 per port for affordable housing Level 2 EVSE.",
        "sourceUrlsChecked": [
          "https://www.eweb.org/rebates-and-savings/electric-mobility/ev-incentives-business"
        ],
        "reasoningNotes": "Returned separately because affordable housing receives a higher published amount.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4636",
    "opportunityName": "Burlington Electric Department - Residential Energy Efficiency Rebate Program",
    "state": "VT",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4636/burlington-electric-department-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.burlingtonelectric.com/rebate-form/",
    "applicationUrl": "https://www.burlingtonelectric.com/rebate-form/",
    "administrator": "Burlington Electric Department",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 12,
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
        "retrofitTypeId": "energy_recovery_ventilation_retrofit",
        "displayName": "Energy recovery ventilation retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "energy recovery ventilation",
          "heat recovery ventilation",
          "erv",
          "hrv"
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
          "VT"
        ],
        "counties": [],
        "cities": [
          "Burlington"
        ],
        "utilityTerritories": [
          "Burlington Electric Department"
        ],
        "notes": "Applies to BED customers in Burlington, Vermont; many rebates are limited to existing residential buildings or specific BED account types."
      },
      "eligibleApplicantTypes": [
        "BED residential electric customers",
        "Homeowners",
        "Residential building owners",
        "Rental property owners",
        "Multifamily property owners",
        "BED small business customers for specified heat pump equipment"
      ],
      "eligibleSectors": [
        "Residential",
        "Multifamily residential",
        "Small business limited"
      ],
      "eligibleRetrofitCategories": [
        "Heat pump HVAC",
        "Mini-split heat pump",
        "Central ducted heat pump",
        "Air-to-water heat pump",
        "Heat pump water heater",
        "HRV/ERV ventilation",
        "Bathroom exhaust fan controls",
        "Induction cooking",
        "ENERGY STAR clothes washer",
        "Refrigerator/freezer",
        "Window or room air conditioner",
        "Level 2 EV charging",
        "Smart thermostat limited"
      ],
      "hardRequirements": [
        "Applicant must be a Burlington Electric Department customer for the premises served.",
        "Most equipment rebates are capped at 75 percent of installed cost and must be submitted within the stated post-purchase or post-installation window.",
        "Heat pump and heat pump water heater equipment must meet BED and Efficiency Vermont qualified product or contractor requirements.",
        "Induction cooking incentive is limited to qualifying new homes or replacement of natural gas or propane cooking equipment and is limited to one per account.",
        "Residential EV charger incentive requires qualifying EV ownership or lease, specified equipment or permits, and enrollment in the residential EV rate where required."
      ],
      "blockers": [
        "Matched term blower is not supported as a building retrofit category.",
        "Matched term window maps only to window or room air conditioners, not window replacement or glazing.",
        "Heat recovery is only supported through HRV/ERV ventilation; generic heat-recovery equipment was not retained.",
        "Smart thermostats are referenced on BED home-cooling content but are not a prominent standalone line item on the main rebate form, so retained only as limited."
      ],
      "programType": "Rebate Program",
      "administrator": "Burlington Electric Department",
      "applicationUrl": "https://www.burlingtonelectric.com/rebate-form/",
      "websiteUrl": "https://www.burlingtonelectric.com/rebate-form/",
      "sourceUrlsChecked": [
        "https://www.burlingtonelectric.com/rebate-form/",
        "https://www.burlingtonelectric.com/rebates",
        "https://www.burlingtonelectric.com/coolhome/",
        "https://programs.dsireusa.org/system/program/detail/4636/burlington-electric-department-residential-energy-efficiency-rebate-program"
      ],
      "evidenceText": "BED's current rebate form lists residential and related incentives including EV charger, mini-split heat pump, centrally ducted heat pump, air-to-water heat pump, window AC, bathroom fan, HRV/ERV, heat pump water heater, laundry, refrigerator/freezer and induction cooktop. BED home-cooling content also references smart thermostat rebates.",
      "reasoningNotes": "The DSIRE residential record remains active but the current BED rebate form is broader than a simple residential efficiency list and includes measure-specific restrictions. False-positive building categories were removed where BED only supports a product such as window AC or HRV/ERV."
    },
    "existingSimpleRules": [
      {
        "id": "oir_1f31540aaa6a081c_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "percent_of_basis",
          "percent": 0.75
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "75% of eligible project cost",
        "evidenceText": "Total rebate amount (including contractor rebate, this online rebate) is limited to 75% of installed cost",
        "sourceUrlsChecked": [
          "https://www.burlingtonelectric.com/rebate-form"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2290",
    "opportunityName": "Carbon Power & Light - Residential Energy Efficiency Rebate Program",
    "state": "WY",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2290/carbon-power-and-light-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.carbonpower.com/rebates-2025",
    "applicationUrl": null,
    "administrator": "Carbon Power & Light, Inc.",
    "programType": "Bill Credit/Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 12,
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
          "WY"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Carbon Power & Light, Inc."
        ],
        "notes": "Applies to Carbon Power & Light member-owner or member-consumer service territory; current official pages checked did not define county boundaries."
      },
      "eligibleApplicantTypes": [
        "Carbon Power & Light member-owners",
        "Residential members",
        "Commercial and industrial members for motors or EV charging where specified",
        "Income-qualified households served through local weatherization agencies"
      ],
      "eligibleSectors": [
        "Residential",
        "Commercial limited",
        "Industrial limited",
        "Low-income residential"
      ],
      "eligibleRetrofitCategories": [
        "Electric thermal storage",
        "Thermal slab heating",
        "Electric water heater",
        "Heat pump water heater",
        "Air-source heat pump ductless",
        "Air-source heat pump ducted",
        "Air-to-water heat pump",
        "Ground-source heat pump",
        "Desuperheater",
        "Smart thermostat",
        "Induction cooking",
        "Clothes dryer",
        "Refrigerator/freezer recycling",
        "ENERGY STAR refrigerator/freezer",
        "Whole-house fan",
        "Evaporative cooler",
        "Low-income weatherization",
        "Electric motors",
        "Level 2 EV charging",
        "DC fast charging"
      ],
      "hardRequirements": [
        "Credits are applied to the Carbon Power & Light member-owner account.",
        "Applications generally must be submitted within 90 days of purchase or installation.",
        "Heat pump incentives require listed efficiency criteria and may require the heat pump to provide at least half of the heated area or load under specified conditions.",
        "Low-income weatherization is not a general rebate; it is matched through a local Weatherization Agency and federal or state income qualification.",
        "EV charging incentives require installed eligible charging equipment, code compliance, and one rebate per installed charger."
      ],
      "blockers": [
        "Original 2020 rebate URL is stale; the readable detailed official measure page found was the 2025 rebate page, while 2026 official site content only confirmed that rebates/credits continue.",
        "Matched term blower is not retained as a building retrofit; supported blower references are outdoor power equipment rather than building efficiency.",
        "Weatherization is limited to income-qualified Weatherization Agency work and should not match general market weatherization projects.",
        "Refrigerator/freezer support is limited to ENERGY STAR equipment or recycling terms, not broad appliance replacement."
      ],
      "programType": "Bill Credit/Rebate Program",
      "administrator": "Carbon Power & Light, Inc.",
      "applicationUrl": null,
      "websiteUrl": "https://www.carbonpower.com/rebates-2025",
      "sourceUrlsChecked": [
        "https://www.carbonpower.com/rebates-2025",
        "https://www.carbonpower.com/products",
        "https://www.carbonpower.com/light-lines-2026",
        "https://www.carbonpower.com/rebates-2020",
        "https://programs.dsireusa.org/system/program/detail/2290/carbon-power-and-light-residential-energy-efficiency-rebate-program"
      ],
      "evidenceText": "Carbon Power official pages continue to direct members to energy-efficiency credits/rebates. The readable rebate detail page lists electric thermal storage, water heaters including HPWH, air-source and ground-source heat pumps, smart thermostats, induction ranges, refrigerator/freezer measures, low-income weatherization, motors and EV charging incentives.",
      "reasoningNotes": "The program appears active but confidence is medium because the detailed measure schedule located is labeled 2025 and the original 2020 URL is stale. Categories were limited to official Carbon Power pages and measure-specific restrictions."
    },
    "existingSimpleRules": [
      {
        "id": "oir_0106987d1735ce12_v1",
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
        "evidenceText": "gov/ Electric Heat Pump – Ground Source Incentive • $500 per ton for new systems • $250 per ton for replacement systems • $100 per unit for ground source heat pump powered hot water (a",
        "sourceUrlsChecked": [
          "https://www.carbonpower.com/rebates-2020"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1615",
    "opportunityName": "Anaheim Public Utilities - Commercial Energy Efficiency Rebate Programs",
    "state": "CA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1615/anaheim-public-utilities-commercial-energy-efficiency-rebate-programs",
    "websiteUrl": "https://www.anaheim.net/5353/Business-Energy-Rebates",
    "applicationUrl": null,
    "administrator": "Anaheim Public Utilities",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 11,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "cooling_tower_controls_optimization",
        "displayName": "Cooling tower controls / optimization",
        "parentCategory": "water_efficiency",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "cooling tower"
        ]
      },
      {
        "retrofitTypeId": "dc_fast_charger_installation",
        "displayName": "DC fast charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "dc fast"
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
          "air conditioner",
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
      },
      {
        "retrofitTypeId": "variable_frequency_drive_retrofit",
        "displayName": "Variable frequency drive retrofit",
        "parentCategory": "motors_pumps_fans_drives",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "vfd"
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
          "Orange"
        ],
        "cities": [
          "Anaheim"
        ],
        "utilityTerritories": [
          "Anaheim Public Utilities electric service territory",
          "Anaheim Public Utilities water service territory for water-specific measures"
        ],
        "notes": "Energy rebates are limited to Anaheim Public Utilities electric customers; water-efficiency measures may be administered through separate APU water or SoCal Water$mart pathways."
      },
      "eligibleApplicantTypes": [
        "commercial customers",
        "industrial customers",
        "municipal customers",
        "public-sector customers",
        "small business customers",
        "multifamily property owners",
        "public EV charger site hosts"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "municipal",
        "public sector",
        "small business",
        "multifamily",
        "commercial refrigeration",
        "transportation electrification"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "high_efficiency_hvac_replacement",
        "heat_pump_hvac_retrofit",
        "high_efficiency_refrigeration_equipment",
        "ev_charger_installation",
        "level_2_ev_charger_installation",
        "dc_fast_charger_installation",
        "cooling_tower_controls_optimization",
        "variable_frequency_drive_retrofit",
        "energy_audit"
      ],
      "hardRequirements": [
        "Applicant must be an eligible Anaheim Public Utilities customer for the applicable electric rebate, or in the applicable APU water service area for water-specific measures.",
        "Air conditioner and heat pump incentives apply to qualifying high-efficiency replacements and are subject to savings calculations, caps, and funding availability.",
        "Lighting incentives apply to eligible LED fixtures, retrofit kits, LED bulbs, and controls meeting UL/ETL/DLC/ENERGY STAR, warranty, and program requirements.",
        "Customized energy incentives require APU review, savings calculations, and approval; examples include chillers, cooling towers, compressed air, air handler units, refrigeration systems, building envelope, process equipment, EMS, and VFDs.",
        "Public EV charger rebates require Level 2 or higher chargers, eligible public or shared access, reservation or approval process, permit completion, invoices, W-9, and utility account documentation where required.",
        "Energy assessments are provided through the Comprehensive Energy Assessment or small business direct-install pathways and are services rather than direct equipment rebates."
      ],
      "blockers": [
        "cooling_tower_controls_optimization is eligible only where supported as a custom electric-savings project or through a separate water-efficiency pathway; do not auto-match all cooling tower water projects to the energy rebate.",
        "high_efficiency_refrigeration_equipment is supported through custom incentives or small business refrigeration enhancements, not a broad prescriptive refrigeration rebate for all equipment.",
        "energy_audit is a separate assessment service and should not be treated as installation of a physical retrofit.",
        "Public EV charger page content contained inconsistent rebate amount and cap language; current reservation/agreement confirmation is needed before quoting amounts.",
        "Customized measures require Anaheim Public Utilities review and funding availability; keyword matches alone are insufficient."
      ],
      "programType": "Rebate Program",
      "administrator": "Anaheim Public Utilities",
      "applicationUrl": null,
      "websiteUrl": "https://www.anaheim.net/5353/Business-Energy-Rebates",
      "sourceUrlsChecked": [
        "https://programs.dsireusa.org/system/program/detail/1615/anaheim-public-utilities-commercial-energy-efficiency-rebate-programs",
        "http://www.anaheim.net/5353/Business-Energy-Rebates",
        "https://www.anaheim.net/5353/Business-Energy-Rebates",
        "https://www.anaheim.net/2543/Air-Conditioner-Incentive",
        "https://www.anaheim.net/1533/Customized-Energy-Incentives",
        "https://www.anaheim.net/3312/Public-EV-Charger-Rebate",
        "https://www.anaheim.net/958/Heat-Pump-Incentives-Program",
        "https://www.anaheim.net/961/Lighting-Incentives-Program",
        "https://www.anaheim.net/2544/Motor-Incentive-Program",
        "https://www.anaheim.net/940/Comprehensive-Energy-Assessment",
        "https://www.anaheim.net/965/Small-Business-Energy-Water-Direct-Insta",
        "https://www.anaheim.net/2500/Water-Rebates-Incentives"
      ],
      "evidenceText": "Anaheim Public Utilities' current Business Energy Rebates page lists air conditioner, customized energy, EV charger, multifamily, heat pump, lighting, and motor programs. Current pages support high-efficiency AC and heat pump replacements, LED lighting and lighting controls, custom measures such as cooling towers, refrigeration, EMS, and VFDs, motor and pump replacement, public Level 2 or higher EV charging, comprehensive energy assessments, and small-business direct-install measures including lighting, controls, refrigeration enhancements, HVAC tune-ups, thermostats, and water-efficient fixtures.",
      "reasoningNotes": "The DSIRE match is largely correct, but several categories are not simple prescriptive equipment rebates. The repair keeps supported energy categories and flags EV charging, water/cooling tower, custom refrigeration, and audit/assessment boundaries."
    },
    "existingSimpleRules": [
      {
        "id": "oir_308dcfa4ea9a4d80_v1",
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
        "confidence": "medium",
        "formula": "Up to $300 per Level 2 EV charger",
        "evidenceText": "Anaheim says Level 2 plug-in EV charger rebates are up to $300.",
        "sourceUrlsChecked": [
          "https://www.anaheim.net/593/Private-EV-Charger-Rebate",
          "http://www.anaheim.net/5353/Business-Energy-Rebates"
        ],
        "reasoningNotes": "Matched commercial EV charger and Level 2 terms. Applies to private-use home or business chargers, subject to fund availability.",
        "mapping": {
          "primarySavingsModelId": "ev_charging_site_load",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_7d777f18d61a7b42_v1",
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
        "formula": "Up to $600 per networked Level 2 EV charger on a time-of-use rate",
        "evidenceText": "Anaheim says networked charger rebates are up to $600 when the customer signs up for TOU.",
        "sourceUrlsChecked": [
          "https://www.anaheim.net/593/Private-EV-Charger-Rebate",
          "http://www.anaheim.net/5353/Business-Energy-Rebates"
        ],
        "reasoningNotes": "Returned separately because networked TOU-enrolled chargers receive a higher amount.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4815",
    "opportunityName": "Poudre Valley REA - Energy Efficiency Rebate Program",
    "state": "CO",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4815/poudre-valley-rea-energy-efficiency-rebate-program",
    "websiteUrl": "https://pvrea.coop/for-members/rebates/",
    "applicationUrl": null,
    "administrator": "Poudre Valley REA",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 11,
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
          "dc fast",
          "fast charger"
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
        "cities": [],
        "utilityTerritories": [
          "Poudre Valley REA electric service territory"
        ],
        "notes": "Rebates apply to qualifying PVREA members; some incentives are residential-only, commercial-only, or public-use only."
      },
      "eligibleApplicantTypes": [
        "cooperative_members",
        "residential_customers",
        "commercial_customers",
        "industrial_customers"
      ],
      "eligibleSectors": [
        "residential",
        "commercial",
        "industrial",
        "transportation"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "ground_source_geothermal_heat_pump",
        "heat_pump_water_heater",
        "electric_water_heater",
        "smart_thermostat_zoning_retrofit",
        "line_voltage_thermostat",
        "induction_cooking_equipment",
        "heat_pump_clothes_dryer",
        "refrigerator_freezer_recycling",
        "ev_charger_installation",
        "level_2_ev_charger_installation",
        "dc_fast_charger_installation",
        "variable_frequency_drive_retrofit",
        "high_efficiency_motor_replacement",
        "electric_forklift_pallet_jack"
      ],
      "hardRequirements": [
        "Applicant must be a PVREA member receiving electric service.",
        "Rebate applications must generally be submitted within 90 days of purchase or installation.",
        "EV chargers must be new, permanently installed, and meet program documentation requirements.",
        "DC fast charger incentives require public access and case-by-case program review."
      ],
      "blockers": [
        "No current PVREA lighting or lighting-control rebate was verified on the current main rebate page.",
        "Refrigerator and freezer incentive is recycling, not new high-efficiency refrigeration equipment.",
        "Induction is an electric appliance incentive and should not be generalized to commercial kitchen equipment.",
        "DC fast charging is limited to public-use eligible projects with review."
      ],
      "programType": "Rebate Program",
      "administrator": "Poudre Valley REA",
      "applicationUrl": null,
      "websiteUrl": "https://pvrea.coop/for-members/rebates/",
      "sourceUrlsChecked": [
        "https://pvrea.coop/for-members/rebates/",
        "https://pvrea.coop/for-members/rebates/appliance-rebates/",
        "https://pvrea.coop/for-members/rebates/heating-cooling-rebates/",
        "https://pvrea.coop/for-members/rebates/ev-rebates/",
        "https://smarthub.tfaforms.net/876"
      ],
      "evidenceText": "PVREA current rebate pages cover heating and cooling, water heaters, thermostats, induction cooking, appliance recycling, EV chargers, VFDs, motors, and electric forklifts.",
      "reasoningNotes": "Remove unsupported lighting matches and narrow refrigeration to recycling; EV categories are valid but have charger-type and public-access constraints."
    },
    "existingSimpleRules": [
      {
        "id": "oir_7d53e145d403ee72_v1",
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
        "formula": "$7,000 per public Level 3 DC fast charger rated 150+ kW",
        "evidenceText": "PVREA lists Level 3 DC Fast Charger tiers: 50-75 kW $3,000, 76-149 kW $5,000, 150+ kW $7,000.",
        "sourceUrlsChecked": [
          "https://pvrea.coop/for-members/rebates/ev-rebates/",
          "https://www.pvrea.com/rebates"
        ],
        "reasoningNotes": "Matched DC fast charger term. Returned the highest published tier as a candidate when charger power is known to be 150+ kW.",
        "mapping": {
          "primarySavingsModelId": "fleet_fuel_replacement",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_913a3bee4f7beb6f_v1",
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
          "maxPercentOfBasis": 0.5
        },
        "confidence": "high",
        "formula": "50% of equipment and electric service installation costs, capped at $1,000 for managed Level 2 EV charger",
        "evidenceText": "PVREA lists Level 2 EV Charger with Member Managed participation up to $1,000.",
        "sourceUrlsChecked": [
          "https://pvrea.coop/for-members/rebates/ev-rebates/",
          "https://www.pvrea.com/rebates"
        ],
        "reasoningNotes": "Matched Level 2 terms. The member-managed option is relevant to controllable EV charging.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3161",
    "opportunityName": "NIPSCO (Gas & Electric) - Residential Energy Efficiency Program",
    "state": "IN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3161/nipsco-gas-and-electric-residential-energy-efficiency-program",
    "websiteUrl": "https://www.nipsco.com/energy-efficiency/for-your-home/rebates",
    "applicationUrl": null,
    "administrator": "NIPSCO",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 11,
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
          "IN"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "NIPSCO"
        ],
        "notes": "Measure eligibility can depend on whether the customer receives NIPSCO electric service, natural gas service, or both."
      },
      "eligibleApplicantTypes": [
        "residential_customer"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "smart_thermostat_zoning_retrofit",
        "high_efficiency_furnace_retrofit",
        "high_efficiency_boiler_retrofit",
        "heat_pump_hvac_retrofit",
        "ductless_mini_split_heat_pump",
        "high_efficiency_hvac_replacement",
        "residential_room_air_conditioner",
        "heat_pump_water_heater",
        "residential_clothes_washer",
        "residential_clothes_dryer",
        "low_e_storm_window_insert",
        "hvac_tune_up",
        "energy_star_manufactured_home"
      ],
      "hardRequirements": [
        "Equipment must be purchased and installed within the current program year and submitted within the stated deadline.",
        "Customer must receive the applicable NIPSCO fuel service for the measure."
      ],
      "blockers": [
        "Low-E storm window pane base rebates are not full window replacement.",
        "Residential dishwashers were not verified in the current NIPSCO page checked.",
        "Residential appliances are not commercial dishwasher, commercial refrigeration, or commercial laundry equipment."
      ],
      "programType": "Rebate Program",
      "administrator": "NIPSCO",
      "applicationUrl": null,
      "websiteUrl": "https://www.nipsco.com/energy-efficiency/for-your-home/rebates",
      "sourceUrlsChecked": [
        "https://www.nipsco.com/energy-efficiency/for-your-home/rebates"
      ],
      "evidenceText": "NIPSCO's]( current residential rebate page lists smart thermostats, furnaces, boilers, HVAC, heat pumps, room AC, HPWH, clothes washers and dryers, storm windows, tune-ups, and manufactured homes.",
      "reasoningNotes": "Preserved NIPSCO residential HVAC, water-heating, thermostat, appliance, and storm-window categories; removed commercial and full-window false positives."
    },
    "existingSimpleRules": [
      {
        "id": "oir_320f6fd745286c24_v1",
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
        "formula": "$750 per ENERGY STAR heat pump water heater",
        "evidenceText": "NIPSCO residential rebates list $750 off an ENERGY STAR heat pump water heater >= 2.0 UEF.",
        "sourceUrlsChecked": [
          "https://www.nipsco.com/energy-efficiency/for-your-home/rebates",
          "https://www.nipsco.com/docs/librariesprovider11/energy-efficiency/available-rebates/applications/nipsco-energy-efficiency-home-rebate-application.pdf"
        ],
        "reasoningNotes": "Matched heat pump water heater term. Selected a clear measure-specific rebate rather than attempting a whole-building per-kWh rule.",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_53ea040ffb52b592_v1",
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
        "formula": "$1,000 per 17.1+ SEER2 air-source heat pump",
        "evidenceText": "NIPSCO residential rebates list 17.1+ SEER2 air-source heat pump at $1,000.",
        "sourceUrlsChecked": [
          "https://www.nipsco.com/energy-efficiency/for-your-home/rebates",
          "https://www.nipsco.com/docs/librariesprovider11/energy-efficiency/available-rebates/applications/nipsco-energy-efficiency-home-rebate-application.pdf"
        ],
        "reasoningNotes": "Matched heat pump term. Returned as a separate candidate because the source has multiple relevant HVAC values.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2288",
    "opportunityName": "Crow Wing Power - Residential Energy Efficiency Rebate Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2288/crow-wing-power-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.cwpower.com/rebates",
    "applicationUrl": null,
    "administrator": "Crow Wing Power",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 11,
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
          "led lighting"
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
          "Crow Wing Power electric service territory"
        ],
        "notes": "Rebates apply to eligible residential equipment installed where electricity is supplied by Crow Wing Power."
      },
      "eligibleApplicantTypes": [
        "residential_cooperative_members",
        "residential_electric_customers"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "central_air_conditioner_replacement",
        "heat_pump_hvac_retrofit",
        "ductless_mini_split_heat_pump",
        "smart_thermostat_zoning_retrofit",
        "electric_boiler_or_plenum_heater",
        "ground_source_geothermal_heat_pump",
        "heat_pump_water_heater",
        "electric_water_heater_off_peak",
        "residential_refrigerator_freezer_replacement",
        "residential_clothes_washer",
        "residential_electric_dryer",
        "ev_charger_installation",
        "level_2_ev_charger_installation",
        "ecm_hvac_motor_retrofit"
      ],
      "hardRequirements": [
        "Equipment must be installed where electricity is supplied by Crow Wing Power.",
        "Rebate forms and receipts must be submitted within the stated deadline.",
        "Several electric heating and water-heating measures require load management or off-peak service."
      ],
      "blockers": [
        "Battery storage was not verified in the current rebate list.",
        "Refrigerator and freezer incentives are residential appliance rebates, not commercial refrigeration retrofits.",
        "Clothes washer and dryer incentives are residential appliance rebates, not broad water-efficiency fixture retrofits.",
        "Boiler and plenum heater incentives require load-management participation."
      ],
      "programType": "Rebate Program",
      "administrator": "Crow Wing Power",
      "applicationUrl": null,
      "websiteUrl": "https://www.cwpower.com/rebates",
      "sourceUrlsChecked": [
        "https://www.cwpower.com/rebates"
      ],
      "evidenceText": "Crow Wing Power lists residential rebates for lighting, HVAC, heat pumps, smart thermostats, geothermal systems, heat pump water heaters, appliances, EV charging, and ECM motors.",
      "reasoningNotes": "The match should distinguish residential appliances and ECM motor products from commercial refrigeration, broad blower replacement, or battery storage categories."
    },
    "existingSimpleRules": [
      {
        "id": "oir_3dcbe4e60b5d082e_v1",
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
        "confidence": "medium",
        "formula": "$25 per eligible unit",
        "evidenceText": "EV Charger Rebate Form More about EV Chargers Electronically Commutated Motor (ECM) This residential rebate amount is $25 in the form of a credit issued to your Crow Wing Power electric account",
        "sourceUrlsChecked": [
          "https://www.cwpower.com/rebates"
        ],
        "reasoningNotes": "",
        "mapping": {
          "primarySavingsModelId": "refrigeration_electric_efficiency",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3348",
    "opportunityName": "Hutchinson Utilities Commission - Residential Energy Efficiency Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3348/hutchinson-utilities-commission-residential-energy-efficiency-program",
    "websiteUrl": "https://www.brightenergysolutions.com/members/hutchinson-utilities-commission",
    "applicationUrl": null,
    "administrator": "Hutchinson Utilities Commission",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 11,
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
          "MN"
        ],
        "counties": [
          "McLeod"
        ],
        "cities": [
          "Hutchinson"
        ],
        "utilityTerritories": [
          "Hutchinson Utilities Commission electric service territory",
          "Bright Energy Solutions participating utility territory for Hutchinson Utilities Commission customers"
        ],
        "notes": "Residential rebate eligibility is for Hutchinson Utilities Commission customers using Bright Energy Solutions residential rebate materials."
      },
      "eligibleApplicantTypes": [
        "Hutchinson Utilities Commission residential electric customers",
        "homeowners",
        "renters with owner approval where required",
        "residential property owners",
        "residential EV charger customers"
      ],
      "eligibleSectors": [
        "residential",
        "transportation electrification"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "high_efficiency_hvac_replacement",
        "heat_pump_hvac_retrofit",
        "smart_thermostat_zoning_retrofit",
        "ground_source_geothermal_heat_pump",
        "heat_pump_water_heater",
        "ev_charger_installation",
        "level_2_ev_charger_installation",
        "high_efficiency_laundry_equipment",
        "high_efficiency_residential_dishwasher"
      ],
      "hardRequirements": [
        "Applicant must be a Hutchinson Utilities Commission residential customer.",
        "Applications must be submitted through the current Bright Energy Solutions or Hutchinson Utilities rebate process.",
        "Equipment must meet applicable ENERGY STAR, AHRI, program, and measure-specific efficiency requirements.",
        "EV charger rebates are limited to qualifying residential Level 2 chargers and any charging-program or documentation requirements.",
        "Appliance rebates are residential product rebates and require qualifying equipment, invoices, and model documentation."
      ],
      "blockers": [
        "high_efficiency_commercial_dishwasher is a false-positive taxonomy match for this residential record; only qualifying residential ENERGY STAR dishwasher or appliance measures should match.",
        "low_flow_fixture_retrofit is not verified from the current official residential source reviewed and should not be inferred from generic fixture wording.",
        "Do not match commercial kitchen, commercial refrigeration, or business equipment categories to this residential program.",
        "EV charging is a residential Level 2 charger pathway and should not match DC fast charging or commercial/public charging.",
        "Broad HVAC replacement should be limited to the listed residential cooling, furnace fan, heat pump, and geothermal equipment measures."
      ],
      "programType": "Rebate Program",
      "administrator": "Hutchinson Utilities Commission",
      "applicationUrl": null,
      "websiteUrl": "https://www.brightenergysolutions.com/members/hutchinson-utilities-commission",
      "sourceUrlsChecked": [
        "https://programs.dsireusa.org/system/program/detail/3348/hutchinson-utilities-commission-residential-energy-efficiency-program",
        "https://www.brightenergysolutions.com/members/hutchinson-utilities-commission",
        "https://www.hutchinsonutilities.com/",
        "https://www.hutchinsonutilities.com/category/latest-news/"
      ],
      "evidenceText": "The current Bright Energy Solutions Hutchinson page states that incentives are offered for energy-saving projects and products for residential customers and businesses. The current rebate family includes residential HVAC, heat pumps, geothermal heat pumps, heat pump water heaters, ENERGY STAR products, EV chargers, and lighting-related forms.",
      "reasoningNotes": "The repair separates residential product rebates from commercial kitchen taxonomy and keeps EV charging only as a residential Level 2 charger pathway."
    },
    "existingSimpleRules": [
      {
        "id": "oir_11bbe8ceb31cf1be_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 90000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "$900 per eligible unit",
        "evidenceText": "$900 Residential Lighting (Gas) Download Form Earn up to $4 per fixture for ENERGY STAR LED recessed downlights",
        "sourceUrlsChecked": [
          "https://www.brightenergysolutions.com/members/hutchinson-utilities-commission?rebates=residential"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2256",
    "opportunityName": "Lake Country Power - Residential Energy Efficiency Rebate Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2256/lake-country-power-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://lakecountrypower.coop/rates-and-rebates",
    "applicationUrl": null,
    "administrator": "Lake Country Power",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 11,
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
        "retrofitTypeId": "ev_charger_installation",
        "displayName": "EV charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "ev charger",
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
          "Lake Country Power"
        ],
        "notes": "Applies where Lake Country Power supplies the member's electricity."
      },
      "eligibleApplicantTypes": [
        "residential_member",
        "member_owner"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "ductless_mini_split_heat_pump",
        "ground_source_geothermal_heat_pump",
        "heat_pump_water_heater",
        "smart_thermostat_zoning_retrofit",
        "residential_clothes_washer",
        "residential_clothes_dryer",
        "residential_dishwasher",
        "residential_dehumidifier",
        "residential_refrigerator_freezer",
        "residential_refrigerator_freezer_recycling",
        "residential_led_lighting",
        "level_2_ev_charger_installation",
        "cycled_air_conditioning_load_management"
      ],
      "hardRequirements": [
        "Equipment must be purchased and installed where Lake Country Power supplies electricity.",
        "Many forms require applications within 90 days and ENERGY STAR qualification where applicable."
      ],
      "blockers": [
        "No current furnace rebate was verified on checked 2026 materials.",
        "Efficient furnace blower or ECM replacement was not verified as a standalone current residential measure.",
        "Residential appliances are not commercial refrigeration equipment."
      ],
      "programType": "Rebate Program",
      "administrator": "Lake Country Power",
      "applicationUrl": null,
      "websiteUrl": "https://lakecountrypower.coop/rates-and-rebates",
      "sourceUrlsChecked": [
        "https://lakecountrypower.coop/rates-and-rebates",
        "https://lakecountrypower.coop/sites/default/files/2026-02/2026-energy-star-appliances-complete.pdf",
        "https://lakecountrypower.coop/sites/default/files/2026-02/2026-ground-source-hp-rebate-complete.pdf"
      ],
      "evidenceText": "Lake]( Country Power 2026 forms list residential heat pumps, ground-source heat pumps, appliances, thermostats, lighting, water heaters, and EV charging rebates.",
      "reasoningNotes": "Retained member residential categories supported by 2026 rebate forms and removed unsupported furnace, blower, and commercial refrigeration matches."
    },
    "existingSimpleRules": [
      {
        "id": "oir_c02e0521f936e405_v1",
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
        "formula": "$500 per qualifying hardwired Level 2 EV charger",
        "evidenceText": "Lake Country Power 2026 EV charger rebate form lists $500 per qualifying hardwired Level 2 car charger.",
        "sourceUrlsChecked": [
          "https://lakecountrypower.coop/electric-vehicles",
          "https://lakecountrypower.coop/sites/default/files/2026-02/2026-ev-car-charging-rebate-complete.pdf"
        ],
        "reasoningNotes": "Matched EV charger and Level 2 terms. Requires metered/off-peak program participation.",
        "mapping": {
          "primarySavingsModelId": "ev_charging_site_load",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  }
]
