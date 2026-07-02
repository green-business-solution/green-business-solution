You are helping RetroFi repair incentive formulas, rate tables, grant estimates, tax credits, and non-cash workflow value rules.

Return strict JSON only. Do not include markdown, code fences, commentary, or citations outside JSON fields.

Batch: 43
Targets in this prompt: 841-860 of 984
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
  "batchNumber": 43,
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
  "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:2817"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2208",
    "opportunityName": "Seattle City Light - Commercial Energy Efficiency Rebate Programs",
    "state": "WA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2208/seattle-city-light-commercial-energy-efficiency-rebate-programs",
    "websiteUrl": "https://www.seattle.gov/city-light/business-solutions/large-commercial-and-industrial-business-solutions",
    "applicationUrl": null,
    "administrator": "Seattle City Light",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 3,
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
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "WA"
        ],
        "counties": [],
        "cities": [
          "Seattle"
        ],
        "utilityTerritories": [
          "Seattle City Light electric service territory"
        ],
        "notes": "Eligible facilities must be served by Seattle City Light; service territory includes Seattle and some surrounding communities."
      },
      "eligibleApplicantTypes": [
        "seattle_city_light_business_customers",
        "commercial_customers",
        "industrial_customers",
        "institutional_customers",
        "nonprofit_customers",
        "multifamily_building_customers"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "institutional",
        "nonprofit",
        "multifamily"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "networked_lighting_controls",
        "building_automation_system_upgrade",
        "energy_management_system",
        "hvac_controls_retrofit",
        "variable_speed_drive_retrofit",
        "fan_and_pump_system_efficiency",
        "commercial_refrigeration_efficiency_retrofit",
        "refrigeration_controls_retrofit",
        "high_efficiency_refrigeration_equipment",
        "heat_pump_water_heater_system",
        "compressed_air_efficiency_retrofit",
        "data_center_efficiency_retrofit"
      ],
      "hardRequirements": [
        "Customer must have qualifying Seattle City Light electric service.",
        "Commercial retrofit incentives generally require City Light review, approval and a signed participation agreement before purchase or installation.",
        "Measures must meet City Light specifications and applicable code, safety and product requirements.",
        "Projects are subject to savings review, verification and final City Light discretion.",
        "Incentives are capped by project-cost and program rules."
      ],
      "blockers": [
        "Residential home rebates are separate from this commercial and industrial program.",
        "Simple rebates and Lighting to Go measures may have separate application paths and requirements.",
        "EV charging and renewable generation are separate offerings.",
        "Do not infer broad gas-to-electric or non-electric measures unless current City Light materials support them."
      ],
      "programType": "Rebate Program",
      "administrator": "Seattle City Light",
      "applicationUrl": null,
      "websiteUrl": "https://www.seattle.gov/city-light/business-solutions/large-commercial-and-industrial-business-solutions",
      "sourceUrlsChecked": [
        "https://www.seattle.gov/city-light/business-solutions/large-commercial-and-industrial-business-solutions",
        "https://www.seattle.gov/city-light/business-solutions/small-and-medium-business-solutions",
        "https://www.seattle.gov/documents/Departments/CityLight/CommercialRetrofitIncentives.pdf",
        "https://www.seattle.gov/documents/Departments/CityLight/CommIndustrialRetrofitReqs.pdf",
        "https://www.seattle.gov/documents/Departments/CityLight/Business/CIPrograms.pdf"
      ],
      "evidenceText": "Seattle City Light's commercial retrofit materials cover lighting, controls, building automation, variable-speed drives, HVAC controls, refrigeration, water-heating, compressed-air and data-center efficiency measures for qualifying business customers.",
      "reasoningNotes": "Preserved energy management, refrigeration and lighting matches, and expanded to other listed commercial retrofit measures while keeping the record within City Light electric customer and preapproval boundaries."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Seattle City Light confirms financial incentives but does not publish a reusable energy-management formula in checked text.",
        "sourceUrlsChecked": [
          "https://www.seattle.gov/city-light/business-solutions/large-commercial-and-industrial-business-solutions"
        ],
        "reasoningNotes": "Strategic energy management incentives are program-specific.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22264",
    "opportunityName": "Chugach Electric - Residential EV Charging Program",
    "state": "AK",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22264/chugach-electric-residential-ev-charging-program",
    "websiteUrl": "https://www.chugachelectric.com/energy-solutions/beneficial-electrification/electric-vehicles/residential-ev-charging-program",
    "applicationUrl": null,
    "administrator": "Chugach Electric",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 2,
    "targetKind": "reviewed_no_rule_reclassification",
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
          "AK"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Chugach Electric"
        ],
        "notes": "Applies to residential Chugach Electric locations."
      },
      "eligibleApplicantTypes": [
        "residential_members",
        "residential_electric_customers"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation",
        "ev_charger_240v_receptacle_installation"
      ],
      "hardRequirements": [
        "Charging must be at a residential location.",
        "Customer must provide proof of home charging with a Level 2 charger or 240-volt receptacle and mobile Level 2 connector.",
        "Program credit is limited to one credit per charger.",
        "No more than two credits are allowed per location or account."
      ],
      "blockers": [
        "Nonresidential charging is not eligible under this residential program.",
        "Level 1-only charging is not eligible.",
        "Credits beyond the per-charger or per-location limits are not eligible.",
        "Locations outside Chugach Electric service territory are not eligible."
      ],
      "programType": "Rebate",
      "administrator": "Chugach Electric",
      "applicationUrl": null,
      "websiteUrl": "https://www.chugachelectric.com/energy-solutions/beneficial-electrification/electric-vehicles/residential-ev-charging-program",
      "sourceUrlsChecked": [
        "https://www.chugachelectric.com/energy-solutions/electric-vehicles",
        "https://www.chugachelectric.com/energy-solutions/beneficial-electrification/electric-vehicles/residential-ev-charging-program"
      ],
      "evidenceText": "Chugach offers a bill credit for residential Level 2 charging, including a Level 2 charger or a 240-volt receptacle with mobile connector.",
      "reasoningNotes": "The EV charging match is correct and should include the 240-volt receptacle pathway explicitly."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "source_inaccessible",
        "confidence": "low",
        "evidenceText": "A current official Chugach residential EV charging rebate amount was not verified from accessible source text.",
        "sourceUrlsChecked": [
          "https://www.chugachelectric.com/",
          "https://programs.dsireusa.org/system/program/detail/22264"
        ],
        "reasoningNotes": "Do not rely on DSIRE-only charger values without official proof.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1970",
    "opportunityName": "Dixie Electric Cooperative - Residential Energy Efficiency Rebate Program",
    "state": "AL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1970/dixie-electric-cooperative-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.dixie.coop/energy-efficiency-program",
    "applicationUrl": null,
    "administrator": "Dixie Electric Cooperative",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 2,
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
      }
    ],
    "repairedOpportunityData": {
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "AL"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Dixie Electric Cooperative"
        ],
        "notes": "Applies to eligible Dixie Electric Cooperative residential members in Alabama; current detailed measure sheets could not be fully read from the official page."
      },
      "eligibleApplicantTypes": [
        "residential_member",
        "homeowner",
        "manufactured_home_owner"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "ductless_mini_split_heat_pump",
        "dual_fuel_heat_pump",
        "manufactured_home_heat_pump_conversion"
      ],
      "hardRequirements": [
        "Applicant must be an eligible Dixie Electric Cooperative residential member.",
        "Rebate applies to high-efficiency dual-fuel or mini-split heat pump installation according to official snippets.",
        "Manufactured-home heat pump upgrade snippets indicate replacement of an electric furnace with a high-efficiency heat pump.",
        "Exact current efficiency thresholds, rebate caps, and paperwork must be verified with the cooperative."
      ],
      "blockers": [
        "Do not match generic HVAC work, furnaces, boilers, window air conditioners, or commercial equipment.",
        "Do not infer lighting, refrigeration, or non-heat-pump weatherization measures from this opportunity.",
        "The official detail page returned access errors, so current specifications and rebate amounts are not fully verified."
      ],
      "programType": "Rebate Program",
      "administrator": "Dixie Electric Cooperative",
      "applicationUrl": null,
      "websiteUrl": "https://www.dixie.coop/energy-efficiency-program",
      "sourceUrlsChecked": [
        "https://www.dixie.coop/energy-efficiency-program",
        "https://www.dixie.coop/manufacturedhomeprogram",
        "http://www.dixie.coop/content.cfm?id=2049&download_id=58#attached_content"
      ],
      "evidenceText": "Official]( snippets identify rebates for high-efficiency dual-fuel and mini-split heat pumps, plus manufactured-home heat pump upgrades replacing electric furnaces.",
      "reasoningNotes": "The original heat-pump match is supported. High-efficiency HVAC should remain only insofar as the equipment is a qualifying heat-pump system."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Official cooperative sources confirmed heat-pump rebate availability but did not verify a current mini-split amount.",
        "sourceUrlsChecked": [
          "https://www.dixie.coop/",
          "https://programs.dsireusa.org/system/program/detail/1970"
        ],
        "reasoningNotes": "No official calculable one-time rule was verified for the target mini-split measure.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5532",
    "opportunityName": "Entergy Arkansas - Agricultural Energy Solutions Program Rebates",
    "state": "AR",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5532/entergy-arkansas-agricultural-energy-solutions-program-rebates",
    "websiteUrl": "https://www.entergyarkansas.com/energyefficiency/business/agricultural-solutions",
    "applicationUrl": null,
    "administrator": "Entergy Arkansas",
    "programType": "Rebate Program / Custom Incentive",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 2,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
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
        "notes": "Available to qualifying Entergy Arkansas agribusiness electric customers on eligible agricultural, commercial, or industrial rate schedules."
      },
      "eligibleApplicantTypes": [
        "entergy_arkansas_agribusiness_customer",
        "nonresidential_electric_customer",
        "agricultural_pumping_customer",
        "farm_service_customer"
      ],
      "eligibleSectors": [
        "agricultural",
        "commercial",
        "industrial"
      ],
      "eligibleRetrofitCategories": [
        "agricultural_led_lighting_retrofit",
        "lighting_controls",
        "irrigation_pump_vfd",
        "irrigation_pump_tune_up",
        "ventilation_fan_efficiency",
        "agricultural_vacuum_pump_variable_speed_controller",
        "milk_pre_cooler",
        "low_energy_livestock_waterer",
        "scroll_compressor_replacement",
        "custom_agricultural_energy_efficiency"
      ],
      "hardRequirements": [
        "Customer must be an eligible Entergy Arkansas agribusiness electric customer on an eligible rate schedule.",
        "Custom projects require verifiable electric energy savings and cost-effectiveness.",
        "Pre-approval is required before purchasing or installing custom measures.",
        "Applications may be waitlisted if program funds are oversubscribed.",
        "Measures must comply with current agricultural program manual rules."
      ],
      "blockers": [
        "Residential projects are not eligible.",
        "Do not generalize milk pre-coolers or scroll compressor replacements into broad commercial refrigeration equipment.",
        "Free riders are disqualified.",
        "Fossil-fuel-only or non-electric-saving projects should not match.",
        "LED lighting is supported only as agricultural or eligible nonresidential program lighting, not as a residential lighting offer."
      ],
      "programType": "Rebate Program / Custom Incentive",
      "administrator": "Entergy Arkansas",
      "applicationUrl": null,
      "websiteUrl": "https://www.entergyarkansas.com/energyefficiency/business/agricultural-solutions",
      "sourceUrlsChecked": [
        "https://www.entergyarkansas.com/energyefficiency/business/agricultural-solutions",
        "https://www.entergyarkansas.com/wp-content/uploads/2025/06/AG_program_manual.pdf"
      ],
      "evidenceText": "Official]( Entergy materials list agribusiness measures including LED lighting, controls, irrigation pump VFDs and tune-ups, fans, milk pre-coolers, vacuum pump controls, and custom savings projects.",
      "reasoningNotes": "The LED lighting match is supported. Broad high-efficiency refrigeration was replaced with product-specific agricultural cooling and compressor measures shown in official materials."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Official page describes incentives but did not expose a clear reusable formula.",
        "sourceUrlsChecked": [
          "https://www.entergyarkansas.com/energyefficiency/business/agricultural-solutions"
        ],
        "reasoningNotes": "No measure-specific value could be safely selected.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4345",
    "opportunityName": "Mohave Electric Cooperative - Renewable Energy Incentive Program",
    "state": "AZ",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4345/mohave-electric-cooperative-renewable-energy-incentive-program",
    "websiteUrl": "https://www.mohaveelectric.com/energy-solutions/renewable-energy/sunwatts-renewable-energy-program/",
    "applicationUrl": "https://www.mohaveelectric.com/energy-solutions/renewable-energy/sunwatts-renewable-energy-program/",
    "administrator": "Mohave Electric Cooperative",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 2,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "rooftop_solar_pv",
        "displayName": "Rooftop solar PV",
        "parentCategory": "solar_renewable_electricity",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "photovoltaic"
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
          "AZ"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Mohave Electric Cooperative"
        ],
        "notes": "Available to eligible Mohave Electric Cooperative members."
      },
      "eligibleApplicantTypes": [
        "residential_utility_customer",
        "small_commercial_utility_customer"
      ],
      "eligibleSectors": [
        "residential",
        "commercial"
      ],
      "eligibleRetrofitCategories": [
        "rooftop_solar_pv",
        "solar_water_heating_system",
        "small_wind_turbine",
        "battery_storage_system"
      ],
      "hardRequirements": [
        "Applicant must be an eligible Mohave Electric Cooperative member.",
        "Renewable system must meet SunWatts program requirements and application documentation rules.",
        "Solar PV and wind incentive amounts are capped by system size and program limits; leased systems are not eligible.",
        "Battery incentive is tied to qualifying renewable energy system requirements."
      ],
      "blockers": [
        "Do not match non-member installations.",
        "Do not match solar thermal space heating beyond the supported solar water-heating program.",
        "Do not match general battery storage unless it meets the SunWatts renewable-system requirements."
      ],
      "programType": "Rebate Program",
      "administrator": "Mohave Electric Cooperative",
      "applicationUrl": "https://www.mohaveelectric.com/energy-solutions/renewable-energy/sunwatts-renewable-energy-program/",
      "websiteUrl": "https://www.mohaveelectric.com/energy-solutions/renewable-energy/sunwatts-renewable-energy-program/",
      "sourceUrlsChecked": [
        "https://www.mohaveelectric.com/energy-solutions/renewable-energy/sunwatts-renewable-energy-program/",
        "https://www.mohaveelectric.com/energy-solutions/renewable-energy/sunwatts-renewable-energy-program/solar-water-heating-rebate-application/",
        "https://programs.dsireusa.org/system/program/detail/4345"
      ],
      "evidenceText": "Mohave Electric's SunWatts program identifies rebates for member-installed renewable systems, including solar PV, wind, solar water heating, and battery incentives tied to program rules.",
      "reasoningNotes": "The two supplied categories are valid; add wind and battery categories because the current official program page supports them."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Mohave renewable incentive source did not verify a current solar water heating or PV per-kW formula.",
        "sourceUrlsChecked": [
          "https://www.mohaveelectric.com/energy-solutions/rebates/"
        ],
        "reasoningNotes": "No current source-backed renewable rebate amount was found.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "solar_electric_offset",
          "incentiveValueMethod": "per_kw",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22149",
    "opportunityName": "Clean Transportation Program",
    "state": "CA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22149/clean-transportation-program",
    "websiteUrl": "https://www.energy.ca.gov/programs-and-topics/programs/clean-transportation-program",
    "applicationUrl": null,
    "administrator": "California Energy Commission",
    "programType": "Grant Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 2,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "electric_vehicle_purchase",
        "displayName": "Electric vehicle purchase",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": false,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "zero emission vehicle"
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
        "utilityTerritories": [],
        "notes": "California statewide program, but funding is delivered through specific California Energy Commission solicitations, block grants, and funding areas."
      },
      "eligibleApplicantTypes": [
        "public_agency",
        "business",
        "nonprofit",
        "fleet_operator",
        "charging_provider",
        "fueling_infrastructure_developer"
      ],
      "eligibleSectors": [
        "transportation",
        "commercial",
        "government",
        "nonprofit",
        "public"
      ],
      "eligibleRetrofitCategories": [
        "ev_charger_installation",
        "hydrogen_refueling_infrastructure",
        "medium_heavy_duty_zero_emission_vehicle_deployment",
        "biofuels_infrastructure",
        "natural_gas_vehicle_deployment",
        "workforce_training_for_clean_transportation"
      ],
      "hardRequirements": [
        "Applicant and project must meet the requirements of an open CEC solicitation, block grant, or funding opportunity.",
        "Funding must support clean transportation, zero-emission technology, fueling infrastructure, deployment, or related workforce purposes within the program scope.",
        "Eligibility, match, and application windows vary by funding area."
      ],
      "blockers": [
        "This is not a standing residential electric vehicle purchase rebate.",
        "Do not match passenger EV purchase unless a specific current CEC solicitation under this program supports that vehicle class.",
        "EV charging incentives under CALeVIP or Communities in Charge may be separate block-grant opportunities under the broader Clean Transportation Program umbrella."
      ],
      "programType": "Grant Program",
      "administrator": "California Energy Commission",
      "applicationUrl": null,
      "websiteUrl": "https://www.energy.ca.gov/programs-and-topics/programs/clean-transportation-program",
      "sourceUrlsChecked": [
        "https://www.energy.ca.gov/programs-and-topics/programs/clean-transportation-program",
        "https://www.energy.ca.gov/programs-and-topics/programs/clean-transportation-program/clean-transportation-funding-areas-0"
      ],
      "evidenceText": "CEC describes the Clean Transportation Program as statewide funding for zero-emission transportation, EV and hydrogen infrastructure, vehicles, fuels, deployment, and workforce areas through specific funding opportunities.",
      "reasoningNotes": "EV charger installation is within scope. Replace broad electric vehicle purchase matching with solicitation-specific medium-heavy-duty or clean-transportation deployment categories."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "California Clean Transportation Program funds competitive solicitations across multiple project types.",
        "sourceUrlsChecked": [
          "https://www.energy.ca.gov/programs-and-topics/programs/clean-transportation-program"
        ],
        "reasoningNotes": "No generic per-vehicle or per-project grant formula applies without a solicitation.",
        "originalGapReason": "formula_not_found_in_source_text",
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
    "opportunityId": "SOURCE_SDGE_BUSINESS:program_url:myenergycenter_com",
    "opportunityName": "Critical Peak Pricing Plans",
    "state": "CA",
    "sourceName": "San Diego Gas & Electric Business Programs",
    "sourceUrl": "https://www.sdge.com/businesses/savings-center/energy-management-programs/demand-response",
    "websiteUrl": "https://www.sdge.com/businesses/savings-center/energy-management-programs/demand-response/critical-peak-pricing",
    "applicationUrl": "https://myenergycenter.com/",
    "administrator": "SDG&E",
    "programType": "Demand Response Rate Plan",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 2,
    "targetKind": "reviewed_no_rule_reclassification",
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
        "retrofitTypeId": "energy_management_system",
        "displayName": "Energy management system",
        "parentCategory": "building_controls_energy_management",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "energy management"
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
          "San Diego",
          "Orange"
        ],
        "cities": [],
        "utilityTerritories": [
          "San Diego Gas & Electric electric service territory"
        ],
        "notes": "Limited to eligible bundled SDG&E business customers receiving electric generation and delivery from SDG&E."
      },
      "eligibleApplicantTypes": [
        "sdge_bundled_business_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "business"
      ],
      "eligibleRetrofitCategories": [
        "critical_peak_pricing_demand_response_rate"
      ],
      "hardRequirements": [
        "Customer must be eligible for SDG&E Critical Peak Pricing plans such as CPP-D or TOU-P.",
        "Customer must reduce or shift electric use during called event days.",
        "Critical peak events may occur up to program limits and generally apply during the 4 p.m. to 9 p.m. event window.",
        "Event notifications are provided through My Energy Center or related SDG&E notification channels."
      ],
      "blockers": [
        "This is a rate and demand response plan, not a rebate for automated demand response controls.",
        "No energy management system installation incentive is offered by this Critical Peak Pricing opportunity.",
        "Separate SDG&E demand response or technology programs should not be merged into this rate plan."
      ],
      "programType": "Demand Response Rate Plan",
      "administrator": "SDG&E",
      "applicationUrl": "https://myenergycenter.com/",
      "websiteUrl": "https://www.sdge.com/businesses/savings-center/energy-management-programs/demand-response/critical-peak-pricing",
      "sourceUrlsChecked": [
        "https://www.sdge.com/businesses/savings-center/energy-management-programs/demand-response",
        "https://www.sdge.com/businesses/savings-center/energy-management-programs/demand-response/critical-peak-pricing",
        "https://myenergycenter.com/"
      ],
      "evidenceText": "SDG&E describes Critical Peak Pricing as a business rate plan for shifting or reducing use on event days, with event notifications through My Energy Center.",
      "reasoningNotes": "Remove physical controls categories; the eligible match is a demand response pricing plan."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "high",
        "evidenceText": "Critical peak pricing is a rate/tariff or demand response mechanism, not an upfront rebate.",
        "sourceUrlsChecked": [
          "https://myenergycenter.com/",
          "https://www.sdge.com/business/save-energy-and-money"
        ],
        "reasoningNotes": "Recurring rate design and demand-response programs are excluded.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "electric_usage_reduction",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_SDGE_BUSINESS:program_url:sdge_com_node_25406",
    "opportunityName": "Electric Vehicle Submeter Billing",
    "state": "CA",
    "sourceName": "San Diego Gas & Electric Business Programs",
    "sourceUrl": "https://www.sdge.com/business/electric-vehicles/lovelectric",
    "websiteUrl": "https://www.sdge.com/business/electric-vehicles/lovelectric/ev-charging-station-submeter-billing",
    "applicationUrl": "https://www.sdge.com/business/electric-vehicles/lovelectric/ev-charging-station-submeter-billing",
    "administrator": "SDG&E",
    "programType": "Rate Billing Option",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 2,
    "targetKind": "reviewed_no_rule_reclassification",
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
        "retrofitTypeId": "submetering_energy_monitoring",
        "displayName": "Submetering / energy monitoring system",
        "parentCategory": "building_controls_energy_management",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "submeter"
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
          "San Diego",
          "Orange"
        ],
        "cities": [],
        "utilityTerritories": [
          "San Diego Gas & Electric electric service territory"
        ],
        "notes": "Applies to eligible SDG&E customers or EV charging sites using approved EV charging station submeters."
      },
      "eligibleApplicantTypes": [
        "sdge_customer",
        "third_party_ev_charging_operator",
        "approved_meter_data_management_agent"
      ],
      "eligibleSectors": [
        "commercial",
        "multifamily",
        "residential",
        "ev_charging"
      ],
      "eligibleRetrofitCategories": [
        "ev_charging_submeter_billing"
      ],
      "hardRequirements": [
        "Submetering must measure EV charging station energy use.",
        "Only approved submetering products may be used.",
        "SDG&E uses the approved product list process identified for EV submeter billing.",
        "Meter data services must be provided by SDG&E or an approved Meter Data Management Agent.",
        "Participation is subject to SDG&E billing option rules."
      ],
      "blockers": [
        "This is not an EV charger installation incentive.",
        "This is not a general building energy monitoring or non-EV submetering program.",
        "No rebate for EVSE hardware or construction cost is supported.",
        "Rate treatment depends on approved EV submeter equipment and data processes."
      ],
      "programType": "Rate Billing Option",
      "administrator": "SDG&E",
      "applicationUrl": "https://www.sdge.com/business/electric-vehicles/lovelectric/ev-charging-station-submeter-billing",
      "websiteUrl": "https://www.sdge.com/business/electric-vehicles/lovelectric/ev-charging-station-submeter-billing",
      "sourceUrlsChecked": [
        "https://www.sdge.com/business/electric-vehicles/lovelectric/ev-charging-station-submeter-billing",
        "https://www.sdge.com/sites/default/files/documents/2025-05/S2590016-EVSubmeterBillingOptionInformation-FS.Final_.pdf"
      ],
      "evidenceText": "SDG&E describes EV Charging Station Submeter Billing as a billing option using approved submeters and approved meter data services for EV charging energy.",
      "reasoningNotes": "Replace generic EV charger installation and broad submetering categories with EV charging submeter billing only."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "high",
        "evidenceText": "SDG&E describes EV submeter billing as a billing option to isolate charging usage, not an upfront rebate.",
        "sourceUrlsChecked": [
          "https://www.sdge.com/node/25406",
          "https://www.sdge.com/business/electric-vehicles/lovelectric"
        ],
        "reasoningNotes": "Billing plans and tariffs should not be modeled as one-time project incentives.",
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
    "opportunityId": "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-607",
    "opportunityName": "GFO-25-607 - Clean Transportation Program Hydrogen Infrastructure Project Opportunity (HIPO)",
    "state": "CA",
    "sourceName": "California Energy Commission",
    "sourceUrl": "https://www.energy.ca.gov/solicitations/2026-04/gfo-25-607-clean-transportation-program-hydrogen-infrastructure-project",
    "websiteUrl": "https://www.energy.ca.gov/solicitations/2026-04/gfo-25-607-clean-transportation-program-hydrogen-infrastructure-project",
    "applicationUrl": "https://ecams.energy.ca.gov/s/login/",
    "administrator": "California Energy Commission",
    "programType": "Grant",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 2,
    "targetKind": "reviewed_no_rule_reclassification",
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
        "retrofitTypeId": "fuel_cell_system",
        "displayName": "Fuel cell system",
        "parentCategory": "solar_renewable_electricity",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "fuel cell"
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
        "utilityTerritories": [],
        "notes": "California projects only; solicitation materials note emphasis locations but do not limit all awards to those cities."
      },
      "eligibleApplicantTypes": [
        "public_entities",
        "private_entities",
        "hydrogen_station_developers",
        "fleet_fueling_operators",
        "transportation_infrastructure_developers"
      ],
      "eligibleSectors": [
        "transportation",
        "commercial",
        "public_sector"
      ],
      "eligibleRetrofitCategories": [
        "hydrogen_refueling_infrastructure"
      ],
      "hardRequirements": [
        "Application must be submitted through ECAMS by the solicitation deadline.",
        "Project must deploy eligible hydrogen refueling infrastructure in California.",
        "Applicant must be registered and in good standing with the California Secretary of State when required.",
        "Projects must support eligible light-, medium-, or heavy-duty fuel cell electric vehicles.",
        "Operations and maintenance funding is only eligible as part of an eligible infrastructure project."
      ],
      "blockers": [
        "EV charging is a false match; this solicitation funds hydrogen refueling infrastructure, not battery-electric EVSE.",
        "Stationary fuel cell power systems are not the funded retrofit category.",
        "Operations and maintenance alone is not an eligible standalone project."
      ],
      "programType": "Grant",
      "administrator": "California Energy Commission",
      "applicationUrl": "https://ecams.energy.ca.gov/s/login/",
      "websiteUrl": "https://www.energy.ca.gov/solicitations/2026-04/gfo-25-607-clean-transportation-program-hydrogen-infrastructure-project",
      "sourceUrlsChecked": [
        "https://www.energy.ca.gov/solicitations/2026-04/gfo-25-607-clean-transportation-program-hydrogen-infrastructure-project",
        "https://www.energy.ca.gov/funding-opportunities/solicitations",
        "https://www.energy.ca.gov/sites/default/files/2026-04/GFO-25-607_Pre-Application_Workshop_Presentation_ada.pdf",
        "https://www.energy.ca.gov/event/funding-workshop/2026-04/pre-application-workshop-gfo-25-607-clean-transportation-program"
      ],
      "evidenceText": "CEC GFO-25-607 funds deployment of hydrogen refueling infrastructure for on-road fuel cell electric vehicles in California.",
      "reasoningNotes": "Replace EV charging and stationary fuel cell matches with hydrogen refueling infrastructure."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "CEC HIPO is a competitive solicitation for hydrogen infrastructure projects with award details by application.",
        "sourceUrlsChecked": [
          "https://www.energy.ca.gov/solicitations/2026-04/gfo-25-607-clean-transportation-program-hydrogen-infrastructure-project"
        ],
        "reasoningNotes": "No generic one-time rule without solicitation category and award limits.",
        "originalGapReason": "formula_not_found_in_source_text",
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
    "opportunityId": "SOURCE_SCE_BUSINESS:sce_source_section:bcdeae04c5863d3b:hvac-optimization-program",
    "opportunityName": "HVAC Optimization Program",
    "state": "CA",
    "sourceName": "Southern California Edison Business Programs",
    "sourceUrl": "https://www.sce.com/business/save-costs-energy/savings-strategies/building-improvement",
    "websiteUrl": "https://www.sce.com/business/save-costs-energy/savings-strategies/building-improvement",
    "applicationUrl": null,
    "administrator": "Southern California Edison",
    "programType": "Technical Assistance",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 2,
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
          "energy management system",
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
          "Southern California Edison"
        ],
        "notes": "Limited to eligible SCE business customers and facilities in SCE service territory."
      },
      "eligibleApplicantTypes": [
        "business_customer",
        "commercial_building_owner",
        "commercial_building_operator",
        "contractor"
      ],
      "eligibleSectors": [
        "commercial",
        "institutional"
      ],
      "eligibleRetrofitCategories": [
        "hvac_optimization",
        "hvac_retrocommissioning",
        "hvac_controls_optimization"
      ],
      "hardRequirements": [
        "Customer must be served by SCE and pay the public goods charge where required.",
        "Program is for commercial buildings and business facilities.",
        "Retrocommissioning eligibility may require at least 25000 square feet of conditioned space.",
        "Eligible facilities generally need direct digital controls and central plant mechanical equipment in good condition.",
        "Participation is through program consultation, contractor services, and approved optimization scope."
      ],
      "blockers": [
        "Do not match residential projects.",
        "Do not match general high-efficiency HVAC replacement unless the program-approved scope specifically includes replacement.",
        "Do not match standalone energy management system installation; continuous energy improvement is a separate SCE offering.",
        "Do not treat technical assistance as a prescriptive equipment rebate."
      ],
      "programType": "Technical Assistance",
      "administrator": "Southern California Edison",
      "applicationUrl": null,
      "websiteUrl": "https://www.sce.com/business/save-costs-energy/savings-strategies/building-improvement",
      "sourceUrlsChecked": [
        "https://www.sce.com/business/save-costs-energy/savings-strategies/building-improvement"
      ],
      "evidenceText": "SCE describes HVAC Optimization as a holistic HVAC system service with consulting, installation standards, contractor training, quality control, and performance reporting for business customers.",
      "reasoningNotes": "The energy management system match appears to come from a separate adjacent program, and high-efficiency HVAC replacement is broader than the HVAC optimization service."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "SCE building improvement page did not expose a calculable HVAC optimization incentive formula.",
        "sourceUrlsChecked": [
          "https://www.sce.com/business/save-costs-energy/savings-strategies/building-improvement"
        ],
        "reasoningNotes": "HVAC optimization may be custom or performance-based.",
        "originalGapReason": "formula_not_found_in_source_text",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5665",
    "opportunityName": "Renewable Market Adjusting Tariff (ReMAT)",
    "state": "CA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5665/renewable-market-adjusting-tariff-remat",
    "websiteUrl": "https://www.cpuc.ca.gov/industries-and-topics/electrical-energy/electric-power-procurement/rps/rps-procurement-programs/renewable-market-adjusting-tariff",
    "applicationUrl": null,
    "administrator": "California Public Utilities Commission",
    "programType": "Feed In Tariff",
    "availabilityStatus": "rolling",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 2,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "biomass_biogas_energy_system",
        "displayName": "Biomass / biogas energy system",
        "parentCategory": "solar_renewable_electricity",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "biogas"
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
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "rolling",
      "geography": {
        "country": "US",
        "states": [
          "CA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Pacific Gas and Electric",
          "Southern California Edison",
          "San Diego Gas & Electric"
        ],
        "notes": "California CPUC ReMAT applies to eligible generators selling to the investor-owned utilities, subject to remaining IOU capacity and tariff rules."
      },
      "eligibleApplicantTypes": [
        "rps_eligible_generators",
        "renewable_energy_project_developers",
        "independent_power_producers",
        "public_entities",
        "businesses"
      ],
      "eligibleSectors": [
        "renewable_electric_generation",
        "commercial",
        "utility"
      ],
      "eligibleRetrofitCategories": [
        "biomass_biogas_electric_generation",
        "biomethane_electric_generation",
        "geothermal_power_generation",
        "solar_pv_system",
        "wind_energy_system",
        "small_hydroelectric_system",
        "fuel_cell_renewable_fuel_system"
      ],
      "hardRequirements": [
        "Project must be an RPS-eligible renewable electricity generator.",
        "Generator must meet the ReMAT size limit and sell electricity to a participating investor-owned utility under the ReMAT tariff and standard contract.",
        "Project must fit an eligible ReMAT product category and meet California RPS eligibility requirements.",
        "Availability depends on the applicable utility's remaining ReMAT capacity, queue, contract, and tariff rules."
      ],
      "blockers": [
        "Do not match ground-source geothermal heat pump HVAC; ReMAT is for renewable electricity generation.",
        "Do not treat ReMAT as a rebate, grant, or building retrofit incentive.",
        "Do not match retail net-metered residential solar or behind-the-meter projects that are not selling under ReMAT."
      ],
      "programType": "Feed In Tariff",
      "administrator": "California Public Utilities Commission",
      "applicationUrl": null,
      "websiteUrl": "https://www.cpuc.ca.gov/industries-and-topics/electrical-energy/electric-power-procurement/rps/rps-procurement-programs/renewable-market-adjusting-tariff",
      "sourceUrlsChecked": [
        "https://www.cpuc.ca.gov/industries-and-topics/electrical-energy/electric-power-procurement/rps/rps-procurement-programs/renewable-market-adjusting-tariff"
      ],
      "evidenceText": "CPUC describes ReMAT as a feed-in tariff for RPS-eligible generators up to 3 MW selling electricity to IOUs, with eligible technologies including biomass, biomethane and geothermal.",
      "reasoningNotes": "Biogas and geothermal matches are supported only for renewable electricity generation. Ground-source heat pump and building-retrofit interpretations are false positives."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "high",
        "evidenceText": "ReMAT is a renewable feed-in tariff/procurement mechanism, not an upfront rebate.",
        "sourceUrlsChecked": [
          "https://www.cpuc.ca.gov/industries-and-topics/electrical-energy/electric-power-procurement/rps/rps-procurement-programs/renewable-market-adjusting-tariff"
        ],
        "reasoningNotes": "Feed-in tariffs and recurring energy sales revenues are excluded from one-time savings rules.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "electric_usage_reduction",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4377",
    "opportunityName": "SCE - Residential Energy Efficiency Rebate Program",
    "state": "CA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4377/sce-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.sce.com/save-money/rebates-financial-assistance/rebates-sce-marketplace",
    "applicationUrl": null,
    "administrator": "Southern California Edison",
    "programType": "Residential Rebate And Bill Credit Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 2,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
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
          "CA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Southern California Edison"
        ],
        "notes": "Applies to eligible SCE service customers; some product coupons are offered through statewide Golden State Rebates channels."
      },
      "eligibleApplicantTypes": [
        "residential_customers"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "smart_thermostat_demand_response",
        "room_air_conditioner_rebate",
        "heat_pump_water_heater_rebate",
        "gas_water_heater_rebate"
      ],
      "hardRequirements": [
        "Smart thermostat bill credit requires an eligible smart thermostat and enrollment in a qualifying demand-response program.",
        "Smart Energy Program residential credit requires central air conditioning controlled by a qualifying smart thermostat.",
        "Product coupon rebates must be for qualifying equipment through participating rebate channels."
      ],
      "blockers": [
        "Do not match as broad high_efficiency_hvac_replacement; current SCE material only supports specific products and demand-response thermostat enrollment.",
        "Comfortably California is listed as not offering direct customer incentives.",
        "EV managed charging and water-heater demand-response offerings are separate SCE programs."
      ],
      "programType": "Residential Rebate And Bill Credit Program",
      "administrator": "Southern California Edison",
      "applicationUrl": null,
      "websiteUrl": "https://www.sce.com/save-money/rebates-financial-assistance/rebates-sce-marketplace",
      "sourceUrlsChecked": [
        "https://www.sce.com/save-money/rebates-financial-assistance/rebates-sce-marketplace",
        "https://www.sce.com/save-money/savings-programs/ways-to-save-at-home/what-is-demand-response"
      ],
      "evidenceText": "SCE]( lists smart thermostat bill credits tied to demand-response enrollment and Golden State Rebates coupons for air conditioners, smart thermostats, and water heaters.",
      "reasoningNotes": "Retain smart thermostat only in the demand-response sense. Remove broad HVAC replacement because no current official SCE source supports full HVAC replacement under this residential rebate listing. Input target list cited as ."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "medium",
        "evidenceText": "SCE smart thermostat offer is a demand-response enrollment bill credit plus annual event credits.",
        "sourceUrlsChecked": [
          "https://www.sce.com/save-money/rebates-financial-assistance/rebates-sce-marketplace",
          "https://www.sce.com/save-money/savings-programs/enroll-in-savings-programs/smart-energy-program"
        ],
        "reasoningNotes": "Demand response and recurring bill-credit programs should not be converted into upfront equipment rebates.",
        "originalGapReason": "formula_not_found_in_source_text",
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
    "opportunityId": "SOURCE_SDGE_BUSINESS:program_url:sdenergyedge_com",
    "opportunityName": "SD Energy Edge",
    "state": "CA",
    "sourceName": "San Diego Gas & Electric Business Programs",
    "sourceUrl": "https://www.sdge.com/business/save-energy-and-money",
    "websiteUrl": "https://sdenergyedge.com/rebates/",
    "applicationUrl": "https://sdenergyedge.com/apply-now/",
    "administrator": "San Diego Gas & Electric / TRC",
    "programType": "Business Rebate And Custom Incentive Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 2,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
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
        "notes": "For eligible SDG&E business customers served by the SD Energy Edge program."
      },
      "eligibleApplicantTypes": [
        "business_customers",
        "commercial_facility_owners",
        "industrial_facility_owners",
        "public_agencies",
        "agricultural_customers"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "public",
        "agricultural"
      ],
      "eligibleRetrofitCategories": [
        "commercial_hvac_unit_replacement",
        "heat_pump_hvac_retrofit",
        "exterior_led_lighting_retrofit",
        "commercial_heat_pump_water_heater_retrofit",
        "tankless_water_heater_retrofit",
        "hot_water_pipe_tank_insulation",
        "commercial_refrigeration_controls",
        "refrigerated_case_door_retrofit",
        "variable_speed_drive_retrofit",
        "pool_heater_retrofit",
        "pool_cover",
        "custom_energy_efficiency_project"
      ],
      "hardRequirements": [
        "Customer must be an eligible SDG&E business customer.",
        "Custom incentives require preapproval before purchase, installation, or operation.",
        "Rebate funds are limited and available on a first-come basis.",
        "Equipment must meet SD Energy Edge rebate specifications."
      ],
      "blockers": [
        "Do not match indoor LED lighting; the application page states SD Energy Edge does not offer rebates for indoor LED lighting.",
        "Do not infer residential rebates from this business program.",
        "Financing is described as an option but should not be treated as the rebate itself."
      ],
      "programType": "Business Rebate And Custom Incentive Program",
      "administrator": "San Diego Gas & Electric / TRC",
      "applicationUrl": "https://sdenergyedge.com/apply-now/",
      "websiteUrl": "https://sdenergyedge.com/rebates/",
      "sourceUrlsChecked": [
        "https://sdenergyedge.com/rebates/",
        "https://sdenergyedge.com/apply-now/",
        "https://www.sdge.com/businesses/savings-center/rebates-incentives"
      ],
      "evidenceText": "SD]( Energy Edge lists business rebates for qualifying HVAC units, outdoor Type B LED lighting, water-heating, refrigeration, VSD, and custom efficiency projects.",
      "reasoningNotes": "The HVAC match is valid only for qualifying commercial equipment. The LED match must be narrowed to eligible outdoor or specified Type B LED measures, not broad indoor LED lighting."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "SD EnergyEdge says rebate amount is based on energy saved, but no reusable rate was verified.",
        "sourceUrlsChecked": [
          "https://sdenergyedge.com/"
        ],
        "reasoningNotes": "No published per-kWh or measure table.",
        "originalGapReason": "formula_not_found_in_source_text",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22684",
    "opportunityName": "Southern California Regional Energy Network (SoCalREN) - Multifamily Residential Energy Efficiency Rebate Program",
    "state": "CA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22684/southern-california-regional-energy-network-socalren-multifamily-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://socalren.org/multifamily/property-owners",
    "applicationUrl": "https://socalren.org/multifamily/property-owners",
    "administrator": "Southern California Regional Energy Network",
    "programType": "Multifamily Energy Efficiency Rebate And Direct Install Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 2,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
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
          "Southern California Edison",
          "SoCalGas"
        ],
        "notes": "Southern California multifamily eligibility is tied to SCE and/or SoCalGas service and specific SoCalREN pathway requirements."
      },
      "eligibleApplicantTypes": [
        "multifamily_property_owners",
        "multifamily_property_managers",
        "contractors",
        "trade_allies"
      ],
      "eligibleSectors": [
        "multifamily_residential"
      ],
      "eligibleRetrofitCategories": [
        "multifamily_whole_building_efficiency",
        "multifamily_common_area_efficiency",
        "led_lighting_retrofit",
        "high_efficiency_hvac_replacement",
        "smart_thermostat_zoning_retrofit",
        "duct_sealing",
        "heat_pump_water_heater_retrofit",
        "boiler_replacement",
        "hot_water_pipe_tank_insulation",
        "low_flow_showerhead",
        "faucet_aerator",
        "brushless_fan_motor_replacement"
      ],
      "hardRequirements": [
        "Property must be multifamily with at least 5 units for the main multifamily offering.",
        "Property must be served by SCE and/or SoCalGas.",
        "Whole-building upgrades require at least three eligible measures and minimum energy savings thresholds.",
        "Small hard-to-reach direct install requires 5 to 50 connected tenant units and hard-to-reach or disadvantaged-community eligibility."
      ],
      "blockers": [
        "Do not match single-family homes.",
        "Do not match general commercial properties outside multifamily residential programs.",
        "No-cost hard-to-reach direct install measures are limited to eligible small multifamily properties in qualifying communities."
      ],
      "programType": "Multifamily Energy Efficiency Rebate And Direct Install Program",
      "administrator": "Southern California Regional Energy Network",
      "applicationUrl": "https://socalren.org/multifamily/property-owners",
      "websiteUrl": "https://socalren.org/multifamily/property-owners",
      "sourceUrlsChecked": [
        "https://socalren.org/multifamily/property-owners",
        "https://socalren.org/multifamily/small_multifamily_hard-to_reach_program",
        "https://socalren.org/multifamily/contractors"
      ],
      "evidenceText": "SoCalREN]( offers incentives and technical assistance for multifamily properties served by SCE or SoCalGas, with whole-building, common-area, and hard-to-reach direct-install pathways.",
      "reasoningNotes": "HVAC and lighting categories are supported in multifamily context. The opportunity should not match non-multifamily residential or general commercial projects."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Official page describes multifamily services and incentives but did not expose a clear HVAC per-unit rule.",
        "sourceUrlsChecked": [
          "https://socalren.org/multifamily/property-owners"
        ],
        "reasoningNotes": "No source-backed measure amount could be selected from accessible text.",
        "originalGapReason": "formula_not_found_in_source_text",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1801",
    "opportunityName": "Black Hills Energy - Solar Power Program",
    "state": "CO",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1801/black-hills-energy-solar-power-program",
    "websiteUrl": "https://www.blackhillsenergy.com/services/electric-services/solar-program/colorado-solar-program",
    "applicationUrl": "https://distributedsolar.programprocessing.com/",
    "administrator": "Black Hills Energy",
    "programType": "Performance-Based Incentive / Solar Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 2,
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
          "storage system"
        ]
      },
      {
        "retrofitTypeId": "rooftop_solar_pv",
        "displayName": "Rooftop solar PV",
        "parentCategory": "solar_renewable_electricity",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "photovoltaic"
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
          "Black Hills Energy Colorado Electric service territory",
          "Southern Colorado electric service territory"
        ],
        "notes": "Applies to Black Hills Energy Colorado Electric customers in Southern Colorado; not a statewide Colorado solar program."
      },
      "eligibleApplicantTypes": [
        "Black Hills Energy Colorado Electric residential customers",
        "Black Hills Energy Colorado Electric business customers",
        "income-qualified solar customers where eligible",
        "disproportionately impacted community participants where eligible",
        "solar developers or installers supporting eligible customer applications"
      ],
      "eligibleSectors": [
        "residential",
        "commercial",
        "low_income_residential_limited",
        "transportation_not_applicable"
      ],
      "eligibleRetrofitCategories": [
        "solar_pv_system",
        "distributed_generation_interconnection",
        "solar_performance_based_incentive",
        "net_metering_or_banked_energy",
        "paired_battery_storage_limited"
      ],
      "hardRequirements": [
        "Customer must take electric service from Black Hills Energy Colorado Electric at the installation site.",
        "Customer account must be active and current under the program's eligibility terms.",
        "Solar equipment must satisfy required technical standards such as UL 1741 and IEEE requirements stated by Black Hills Energy.",
        "The proposed solar system may not be sized to supply more than 200 percent of the customer's reasonable expected annual electricity consumption at the site.",
        "Paired storage incentives apply only under the applicable paired solar/storage terms and are subject to program caps.",
        "Application and interconnection must follow Black Hills Energy's current solar program process and incentive category."
      ],
      "blockers": [
        "Matched storage system is limited to paired storage under the solar program; standalone battery storage was not retained.",
        "This is a solar PV/net-energy and performance-based incentive program, not a building energy-efficiency retrofit rebate.",
        "Do not map this record to HVAC, lighting, appliances, EV charging, weatherization or commercial custom efficiency.",
        "System-size and incentive treatment differ by project size and customer category; do not infer a single universal rebate amount for all PV systems."
      ],
      "programType": "Performance-Based Incentive / Solar Program",
      "administrator": "Black Hills Energy",
      "applicationUrl": "https://distributedsolar.programprocessing.com/",
      "websiteUrl": "https://www.blackhillsenergy.com/services/electric-services/solar-program/colorado-solar-program",
      "sourceUrlsChecked": [
        "https://www.blackhillsenergy.com/services/electric-services/solar-program/colorado-solar-program",
        "https://www.blackhillsenergy.com/services/electric-services/solar-program",
        "https://distributedsolar.programprocessing.com/",
        "https://programs.dsireusa.org/system/program/detail/1801/black-hills-energy-solar-power-program"
      ],
      "evidenceText": "Black Hills Energy's Colorado Solar Program page says eligible customers must be Black Hills Energy Colorado Electric customers in Southern Colorado, with active accounts and qualifying solar equipment. The page states the proposed solar system may be sized to no more than 200 percent of expected annual kWh consumption and describes performance-based incentive categories, netting or banking of excess generation, and paired storage incentives under specified caps.",
      "reasoningNotes": "The opportunity is active and should be matched to solar PV and limited paired storage only. Automated battery-storage economics should not be applied unless the storage is part of an eligible solar program installation."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "medium",
        "evidenceText": "Black Hills solar materials describe solar interconnection or solar power options rather than an upfront storage rebate.",
        "sourceUrlsChecked": [
          "https://www.blackhillsenergy.com/efficiency-and-savings/renewable-ready/solar",
          "https://programs.dsireusa.org/system/program/detail/1801"
        ],
        "reasoningNotes": "Solar rates, interconnection, or program participation do not fit a one-time battery incentive rule.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22300",
    "opportunityName": "Holy Cross Energy - EV Charger Incentives",
    "state": "CO",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22300/holy-cross-energy-ev-charger-incentives",
    "websiteUrl": "https://www.holycross.com/member-programs",
    "applicationUrl": null,
    "administrator": "Holy Cross Energy",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 2,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "ev_charger_installation",
        "displayName": "EV charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "ev charger",
          "evse"
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
          "Holy Cross Energy service territory"
        ],
        "notes": "Applies only to eligible Holy Cross Energy members."
      },
      "eligibleApplicantTypes": [
        "residential_members",
        "commercial_members",
        "multifamily_housing_complexes"
      ],
      "eligibleSectors": [
        "residential",
        "commercial",
        "multifamily",
        "fleet"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation",
        "workplace_ev_charging",
        "multifamily_ev_charging"
      ],
      "hardRequirements": [
        "Residential chargers must be approved Level 2 equipment and allow Holy Cross Energy to manage or delay charging during peak-demand events.",
        "Residential applicant must be a member in good standing and meet application, receipt, activation, and timing requirements.",
        "Commercial Charge at Work incentives require eligible Level 2 ports and either utility control or separate time-of-use metering, depending on option."
      ],
      "blockers": [
        "DC fast charging is not supported by this opportunity.",
        "Non-Holy Cross Energy customers are not eligible.",
        "Approved equipment, tariff participation, and funding availability can block matching.",
        "Do not broaden this EV charging program into building energy efficiency measures."
      ],
      "programType": "Rebate Program",
      "administrator": "Holy Cross Energy",
      "applicationUrl": null,
      "websiteUrl": "https://www.holycross.com/member-programs",
      "sourceUrlsChecked": [
        "https://www.holycross.com/member-programs",
        "https://www.holycross.com/member-programs/charge-at-home",
        "https://www.holycross.com/member-programs/charge-at-work"
      ],
      "evidenceText": "Holy]( Cross lists residential Level 2 charger rebates and Charge at Work incentives per port, with membership and program control or metering requirements.",
      "reasoningNotes": "The Level 2 EV charger match is correct. Generic EV charger matching should be narrowed because current source support is for Level 2 residential, workplace, and multifamily charging."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Holy Cross Charge at Home/Work funding is available by program application, but current per-charger amount was not verified in official text.",
        "sourceUrlsChecked": [
          "https://www.holycross.com/member-programs/charge-at-home/apply-for-ev-charger",
          "https://www.holycross.com/member-programs/charge-at-work"
        ],
        "reasoningNotes": "Search results indicate charger rebates, but a current source-backed amount should be confirmed before merging.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22580",
    "opportunityName": "Energy Storage Solutions Program",
    "state": "CT",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22580/energy-storage-solutions-program",
    "websiteUrl": "https://energystoragect.com/",
    "applicationUrl": null,
    "administrator": "Connecticut Green Bank",
    "programType": "Battery Storage Rebate And Performance Incentive",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 2,
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
          "battery storage",
          "energy storage",
          "storage system"
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
          "CT"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Eversource Energy",
          "United Illuminating"
        ],
        "notes": "Program serves eligible Connecticut Eversource and United Illuminating customers."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customers",
        "commercial_electric_customers",
        "industrial_electric_customers",
        "critical_facility_owners"
      ],
      "eligibleSectors": [
        "residential",
        "commercial",
        "industrial",
        "critical_facilities"
      ],
      "eligibleRetrofitCategories": [
        "battery_storage_system",
        "resilience_backup_power_system",
        "battery_storage_demand_response_participation"
      ],
      "hardRequirements": [
        "Customer must be served by Eversource or United Illuminating in Connecticut.",
        "Battery system must use eligible equipment and an eligible contractor or approved program pathway.",
        "System must participate in program dispatch or performance requirements for grid benefit.",
        "Incentives are subject to current residential or commercial program rules and budgets."
      ],
      "blockers": [
        "Standalone solar PV is outside this battery storage program.",
        "Generic backup generators and non-battery resilience equipment do not qualify.",
        "EV charging or vehicle-to-grid equipment should not match unless expressly part of a separate approved storage application."
      ],
      "programType": "Battery Storage Rebate And Performance Incentive",
      "administrator": "Connecticut Green Bank",
      "applicationUrl": null,
      "websiteUrl": "https://energystoragect.com/",
      "sourceUrlsChecked": [
        "https://portal.ct.gov/pura/electric/office-of-technical-and-regulatory-analysis/clean-energy-programs/energy-storage-solutions-program",
        "https://energystoragect.com/",
        "https://energystoragect.com/program-changes-for-april-1-2026/"
      ],
      "evidenceText": "Connecticut Energy Storage Solutions supports Eversource and UI customers installing battery storage at homes, businesses, and critical facilities with upfront and performance incentives.",
      "reasoningNotes": "Both battery storage and resilience backup categories are supported, narrowed to battery systems with required grid participation."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Connecticut Energy Storage Solutions uses battery storage incentives tied to storage capacity/performance.",
        "sourceUrlsChecked": [
          "https://energystoragect.com/"
        ],
        "reasoningNotes": "Supported rule shapes do not include dollars per battery kWh, and recurring performance payments should be excluded.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1773",
    "opportunityName": "Groton Utilities - Commercial & Industrial Energy Efficiency Rebate Programs",
    "state": "CT",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1773/groton-utilities-commercial-and-industrial-energy-efficiency-rebate-programs",
    "websiteUrl": "https://ct-grotonutilities.civicplus.com/209/Commercial-Industrial-Incentives",
    "applicationUrl": null,
    "administrator": "Groton Utilities",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 2,
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
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "CT"
        ],
        "counties": [],
        "cities": [
          "Groton"
        ],
        "utilityTerritories": [
          "Groton Utilities electric service territory"
        ],
        "notes": "Official page also references Bozrah Light & Power business programs, but the eligibility text for this opportunity is limited to Groton Utilities commercial electric customers."
      },
      "eligibleApplicantTypes": [
        "commercial_electric_customers"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial"
      ],
      "eligibleRetrofitCategories": [
        "commercial_lighting",
        "commercial_hvac_replacement",
        "heat_pump_hvac_retrofit",
        "heat_pump_water_heater",
        "motors_and_variable_frequency_drives",
        "custom_energy_efficiency"
      ],
      "hardRequirements": [
        "Customer must be a commercial electric customer of Groton Utilities.",
        "Pre-approval is mandatory before equipment purchase or installation.",
        "Application must be submitted within 30 days of installation.",
        "Customer account must be paid in full with no outstanding balance.",
        "Rebates are capped by customer and may not exceed 80% of total project cost."
      ],
      "blockers": [
        "Residential customers are not eligible under this commercial and industrial program.",
        "Availability is constrained because 2026 commercial incentive funds are limited and applications are reviewed case by case.",
        "Do not match broad residential HVAC, home weatherization, or unrelated water-heating measures beyond heat pump water heaters."
      ],
      "programType": "Rebate Program",
      "administrator": "Groton Utilities",
      "applicationUrl": null,
      "websiteUrl": "https://ct-grotonutilities.civicplus.com/209/Commercial-Industrial-Incentives",
      "sourceUrlsChecked": [
        "https://ct-grotonutilities.civicplus.com/209/Commercial-Industrial-Incentives"
      ],
      "evidenceText": "Official]( page says 2026 funds are limited but commercial lighting, HVAC, heat pump water heater, and custom efficiency applications continue to be reviewed case by case with mandatory pre-approval.",
      "reasoningNotes": "Input target list from uploaded prompt ; current official source supports both heat pump HVAC and heat pump water heater matches, narrowed to commercial electric customers."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Groton commercial materials include project caps but no direct C&I heat pump formula was verified.",
        "sourceUrlsChecked": [
          "https://www.grotonutilities.com/rebates/",
          "https://programs.dsireusa.org/system/program/detail/1773"
        ],
        "reasoningNotes": "A cap alone is not a calculable incentive formula; measure-specific table review is needed.",
        "originalGapReason": "formula_not_found_in_source_text",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22304",
    "opportunityName": "Delaware Electric Cooperative - Beat the Peak With Electric Vehicles",
    "state": "DE",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22304/delaware-electric-cooperative-beat-the-peak-with-electric-vehicles",
    "websiteUrl": "https://www.delaware.coop/btp",
    "applicationUrl": null,
    "administrator": "Delaware Electric Cooperative",
    "programType": "Bill Credit / Demand Response Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 2,
    "targetKind": "reviewed_no_rule_reclassification",
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
          "DE"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Delaware Electric Cooperative"
        ],
        "notes": "Limited to Delaware Electric Cooperative members taking qualifying cooperative electric service."
      },
      "eligibleApplicantTypes": [
        "delaware_electric_cooperative_member",
        "residential_electric_customer",
        "ev_owner"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "ev_managed_charging_bill_credit",
        "ev_charging_demand_response"
      ],
      "hardRequirements": [
        "Participant must be a Delaware Electric Cooperative member with qualifying combined distribution and supply service.",
        "Program participation is limited to Optiwatt users under the EV rider.",
        "Participant must permit EV charging control during Beat the Peak events.",
        "Tariff participation includes control-event rules, opt-out limitations, and a 12-month participation term."
      ],
      "blockers": [
        "This opportunity does not fund EV charger installation or electrical make-ready work.",
        "Smart thermostat credits are a separate Beat the Peak thermostat rider and should not be matched here.",
        "Commercial fleet charging incentives are separate from this residential EV managed-charging credit.",
        "Participants cannot receive simultaneous duplicative Optiwatt and ChargePoint credits where prohibited."
      ],
      "programType": "Bill Credit / Demand Response Program",
      "administrator": "Delaware Electric Cooperative",
      "applicationUrl": null,
      "websiteUrl": "https://www.delaware.coop/btp",
      "sourceUrlsChecked": [
        "https://www.delaware.coop/btp",
        "https://www.delaware.coop/btp/thermostats",
        "https://www.delaware.coop/sites/default/files/2025-03/Tariff%20-%20Revised%20March%202025.pdf"
      ],
      "evidenceText": "The]( cooperative tariff describes an EV rider using Optiwatt to control EV charging during events, with one-time and monthly bill credits for controlled charging.",
      "reasoningNotes": "EV charger installation was replaced by a managed-charging credit category. Smart thermostat matching is a false positive because thermostats are in a separate Beat the Peak program."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "medium",
        "evidenceText": "Beat the Peak is a managed charging/peak reduction program rather than an upfront charger or vehicle rebate.",
        "sourceUrlsChecked": [
          "https://www.delaware.coop/btp"
        ],
        "reasoningNotes": "Managed charging and recurring peak programs should not be forced into one-time incentive rules.",
        "originalGapReason": "source_text_unavailable",
        "mapping": {
          "primarySavingsModelId": "fleet_fuel_replacement",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22741",
    "opportunityName": "Duke Energy Florida - Off-Peak Charging Credit",
    "state": "FL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22741/duke-energy-florida-off-peak-charging-credit",
    "websiteUrl": "https://www.duke-energy.com/home/products/ev-complete/off-peak-credit",
    "applicationUrl": null,
    "administrator": "Duke Energy Florida",
    "programType": "Performance-Based Incentive / Bill Credit",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 2,
    "targetKind": "reviewed_no_rule_reclassification",
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
          "FL"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Duke Energy Florida"
        ],
        "notes": "Limited to eligible Duke Energy Florida residential electric customers."
      },
      "eligibleApplicantTypes": [
        "duke_energy_florida_residential_customer",
        "ev_owner"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "ev_off_peak_charging_bill_credit",
        "ev_charging_demand_response"
      ],
      "hardRequirements": [
        "Customer must be an eligible Duke Energy Florida residential electric customer.",
        "Participant must have a qualifying Level 2 EV charging setup or eligible charger under program rules.",
        "Charging must occur during the specified off-peak periods to receive the monthly credit.",
        "Customer must enroll under the current Duke Energy program terms."
      ],
      "blockers": [
        "This is not a charger installation rebate.",
        "Duke Energy's Charger Prep Credit is a separate program for electrical make-ready work.",
        "Business fleet advisory services are separate from this residential off-peak charging credit.",
        "Do not match non-EV building retrofits or smart thermostat measures."
      ],
      "programType": "Performance-Based Incentive / Bill Credit",
      "administrator": "Duke Energy Florida",
      "applicationUrl": null,
      "websiteUrl": "https://www.duke-energy.com/home/products/ev-complete/off-peak-credit",
      "sourceUrlsChecked": [
        "https://www.duke-energy.com/home/products/ev-complete/off-peak-credit",
        "https://investors.duke-energy.com/news/news-details/2025/New-Duke-Energy-programs-offer-Florida-customers-more-choices-related-to-electric-vehicles/default.aspx"
      ],
      "evidenceText": "Duke]( Energy describes a Florida residential off-peak charging credit for customers with eligible Level 2 EV charging, separate from charger-prep and fleet programs.",
      "reasoningNotes": "The EV charger installation match was narrowed to an operational bill credit for off-peak EV charging. The presence of Level 2 equipment is a requirement, not a funded installation category."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "medium",
        "evidenceText": "Duke page identifies an EV charging bill credit/off-peak credit program, not an upfront charger rebate.",
        "sourceUrlsChecked": [
          "https://www.duke-energy.com/home/products/ev-complete/off-peak-credit"
        ],
        "reasoningNotes": "Recurring bill credits should not be modeled as one-time project cost savings.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "ev_charging_site_load",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null
        }
      }
    ]
  }
]
