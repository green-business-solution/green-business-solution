You are helping RetroFi repair incentive formulas, rate tables, grant estimates, tax credits, and non-cash workflow value rules.

Return strict JSON only. Do not include markdown, code fences, commentary, or citations outside JSON fields.

Batch: 4
Targets in this prompt: 61-80 of 984
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
  "batchNumber": 4,
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
  "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:2592"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3571",
    "opportunityName": "La Plata Electric Association - Residential Energy Efficiency Rebate Program",
    "state": "CO",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3571/la-plata-electric-association-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://lpea.coop/rebates",
    "applicationUrl": null,
    "administrator": "La Plata Electric Association",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 10,
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
          "CO"
        ],
        "counties": [
          "La Plata",
          "Archuleta",
          "Hinsdale",
          "Mineral",
          "San Juan"
        ],
        "cities": [],
        "utilityTerritories": [
          "La Plata Electric Association"
        ],
        "notes": "Available in LPEA's southwest Colorado electric service territory; some pages also describe separate commercial custom incentives."
      },
      "eligibleApplicantTypes": [
        "residential_member",
        "income_qualified_residential_member",
        "homeowner"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "air_source_heat_pump",
        "air_to_water_heat_pump",
        "ground_source_geothermal_heat_pump",
        "weatherization_bonus_with_heat_pump",
        "income_qualified_weatherization",
        "heat_pump_water_heater",
        "standard_electric_water_heater_with_smart_controller_or_fuel_switch",
        "level_2_ev_charger",
        "induction_cooktop_or_range",
        "heat_pump_clothes_dryer",
        "energy_star_residential_appliances",
        "timers_and_smart_thermostats",
        "heat_tape_and_cable_timer",
        "energy_efficiency_audit_and_upgrade",
        "electric_thermal_storage_heating",
        "battery_energy_storage_system",
        "outdoor_electric_equipment",
        "e_bike"
      ],
      "hardRequirements": [
        "Applicant must be an eligible LPEA member in the LPEA service territory.",
        "Income-qualified rebates require current income qualification.",
        "Heat pump rebates apply to existing homes and require program timing, contractor, and equipment rules.",
        "EV charger incentive requires Level 2 equipment, scheduling capability evidence, and professional installation.",
        "Audit rebate requires a professional audit plus at least one recommended upgrade."
      ],
      "blockers": [
        "Induction is a residential cooktop or range measure, not commercial kitchen equipment.",
        "Residential ENERGY STAR appliances should not match commercial refrigeration.",
        "Weatherization is limited to income-qualified weatherization or heat-pump bonus context, not broad standalone weatherization for all customers.",
        "On-bill financing and commercial LED or custom commercial incentives are separate boundaries from the residential rebate target.",
        "Older refrigerator or LED details should not override current active rebate pages without active form verification."
      ],
      "programType": "Rebate",
      "administrator": "La Plata Electric Association",
      "applicationUrl": null,
      "websiteUrl": "https://lpea.coop/rebates",
      "sourceUrlsChecked": [
        "https://www.lpea.coop/rebate-programs",
        "https://lpea.coop/rebates",
        "https://lpea.coop/heat-pump-rebatesmini-split-system-rebates",
        "https://lpea.coop/heat-pump-water-heater-rebates",
        "https://lpea.coop/cooktop",
        "https://lpea.coop/appliances",
        "https://lpea.coop/energy-efficiency-audit-rebates",
        "https://lpea.coop/stackable-financial-incentives-home-electrification",
        "https://lpea.coop/lpea-member-perks"
      ],
      "evidenceText": "LPEA current rebate pages list heat pumps, weatherization bonuses, heat pump water heaters, EV chargers, induction cooking, heat pump dryers, appliances, timers, audits, ETS heating, batteries, e-bikes, and outdoor electric equipment.",
      "reasoningNotes": "Kept current residential electrification and efficiency measures while blocking commercial kitchen, commercial refrigeration, and standalone weatherization overmatches."
    },
    "existingSimpleRules": [
      {
        "id": "oir_32e3787d513ea124_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 25000,
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
        "formula": "50% of Level 2 charger and installation cost, capped at $250 standard rebate",
        "evidenceText": "LPEA standard residential rebate is 50% of Level 2 charger cost and installation up to $250.",
        "sourceUrlsChecked": [
          "https://lpea.coop/residential-ev-charger-rebates",
          "https://www.lpea.coop/rebate-programs"
        ],
        "reasoningNotes": "Matched EV charger and Level 2 terms. The standard non-income-qualified residential rebate is selected.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5241",
    "opportunityName": "Florida Keys Electric Cooperative - Residential Rebate Program",
    "state": "FL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5241/florida-keys-electric-cooperative-residential-rebate-program",
    "websiteUrl": "https://www.fkec.com/energy-efficiency/residential-rebate-program/",
    "applicationUrl": null,
    "administrator": "Florida Keys Electric Cooperative",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 10,
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
          "reflective roof",
          "roof coating"
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
          "mini split",
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
          "FL"
        ],
        "counties": [
          "Monroe"
        ],
        "cities": [
          "Key Largo",
          "Islamorada",
          "Marathon",
          "Tavernier",
          "Layton",
          "Key Colony Beach"
        ],
        "utilityTerritories": [
          "Florida Keys Electric Cooperative"
        ],
        "notes": "FKEC serves the Upper and Middle Keys, generally from the Monroe-Dade County line to the Seven Mile Bridge."
      },
      "eligibleApplicantTypes": [
        "residential_member",
        "residential_retail_electric_member_of_record"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "central_air_conditioner",
        "ductless_mini_split_air_conditioner",
        "room_air_conditioner",
        "solar_water_heating_system",
        "insulation_upgrade",
        "window_film_or_solar_screen",
        "caulk_weather_stripping",
        "cool_reflective_roof_coating",
        "level_2_ev_charger",
        "programmable_thermostat"
      ],
      "hardRequirements": [
        "Applicant must be the residential retail electric member of record receiving FKEC service.",
        "Qualifying equipment must be installed at the member's primary residence in the FKEC service territory.",
        "Existing residential homes only; new construction is not eligible where specified.",
        "Proof of purchase and application timing requirements apply; FKEC may require on-site verification."
      ],
      "blockers": [
        "Do not match window replacement; official support is for window film or solar screens.",
        "Do not match energy audit as a rebate category under this program.",
        "Do not generalize central AC, ductless mini-split AC, or room AC into broad heat pump HVAC unless the specific form supports heat pump equipment.",
        "Do not match commercial or industrial applicants."
      ],
      "programType": "Rebate",
      "administrator": "Florida Keys Electric Cooperative",
      "applicationUrl": null,
      "websiteUrl": "https://www.fkec.com/energy-efficiency/residential-rebate-program/",
      "sourceUrlsChecked": [
        "https://fkec.com/services/residential-rebate-program/",
        "https://www.fkec.com/energy-efficiency/residential-rebate-program/",
        "https://irp.cdn-website.com/7b073ef1/files/uploaded/Rebate-WindowFilm-Form%20%281%29.pdf"
      ],
      "evidenceText": "Current FKEC materials show residential rebates for AC equipment, insulation, window film or solar screens, caulk and weather-stripping, reflective roof coating, Level 2 EV charging, thermostats, and solar water heating.",
      "reasoningNotes": "Official pages were partially blocked, but official indexed pages and a current official rebate form supported the repaired categories."
    },
    "existingSimpleRules": [
      {
        "id": "oir_0e6894d1df3e8829_v1",
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
        "formula": "Up to $350 per UL-certified smart Level 2 EV charger",
        "evidenceText": "FKEC residential rebate page lists Electric Vehicle Charger Rebate up to $350 for UL-certified Level 2 smart chargers.",
        "sourceUrlsChecked": [
          "https://www.fkec.com/energy-efficiency/residential-rebate-program/"
        ],
        "reasoningNotes": "Matched EV charger and Level 2 terms. Confidence is medium because source uses up to.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1780",
    "opportunityName": "Orlando Utilities Commission - Residential Energy Efficiency Rebate Program",
    "state": "FL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1780/orlando-utilities-commission-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.ouc.com/solutions-programs/savings/rebates/",
    "applicationUrl": null,
    "administrator": "Orlando Utilities Commission",
    "programType": "Residential Energy And Water Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 10,
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
        "retrofitTypeId": "electric_vehicle_purchase",
        "displayName": "Electric vehicle purchase",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": false,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "electric vehicle purchase"
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
          "Orlando",
          "St. Cloud"
        ],
        "utilityTerritories": [
          "Orlando Utilities Commission electric service territory",
          "Orlando Utilities Commission water service territory"
        ],
        "notes": "Service-territory eligibility depends on electric or water rebate type; standard residential energy rebates apply to qualifying residential dwellings and OUC account holders."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "property_owner",
        "ouc_account_holder",
        "multifamily_property_owner"
      ],
      "eligibleSectors": [
        "residential",
        "multifamily"
      ],
      "eligibleRetrofitCategories": [
        "energy_audit",
        "heat_pump_hvac_retrofit",
        "heat_pump_water_heater",
        "solar_water_heating_system",
        "insulation_upgrade",
        "duct_sealing",
        "window_replacement",
        "window_film_shading_retrofit",
        "electric_vehicle_purchase",
        "battery_storage_system"
      ],
      "hardRequirements": [
        "Applicant must be a qualifying OUC customer in the relevant electric or water service territory.",
        "Residential energy rebates generally require qualifying single-family, condominium, or townhome classification unless using a multifamily pathway.",
        "Documentation such as invoice or proof of purchase must be submitted by the required deadline.",
        "Heat pump water heater rebate is available to OUC electric customers and excludes electric tankless, on-demand, gas, and water-only customers.",
        "Solar thermal water heater must be FSEC or SRCC certified and cannot be for pool heating."
      ],
      "blockers": [
        "EV charger installation is not verified on the current OUC residential rebate list; current EV item is purchase or lease rebate.",
        "Air sealing is not separately verified; duct repair or replacement is the supported leakage measure.",
        "HPWH rebate excludes water-only customers, electric tankless or on-demand water heaters, and gas water heaters.",
        "Solar thermal water heater rebate excludes pool heating and requires FSEC or SRCC certification.",
        "Water rebates and the multifamily efficiency program have separate water-service, property-assessment, and multifamily batch requirements."
      ],
      "programType": "Residential Energy And Water Rebate Program",
      "administrator": "Orlando Utilities Commission",
      "applicationUrl": null,
      "websiteUrl": "https://www.ouc.com/solutions-programs/savings/rebates/",
      "sourceUrlsChecked": [
        "https://www.ouc.com/solutions-programs/savings/rebates/",
        "https://www.ouc.com/getgreen/",
        "https://www.ouc.com/solutions-programs/savings/rebates/heat-pump-water-heater/",
        "https://www.ouc.com/solutions-programs/savings/rebates/solar-thermal-water-heater/",
        "https://www.ouc.com/solutions-programs/savings/rebates/multifamily-efficiency-program/"
      ],
      "evidenceText": "OUC's current rebate pages support heat pump A/C, heat pump water heaters, solar thermal water heaters, ceiling insulation, duct repair, ENERGY STAR windows, window film or solar screens, battery storage, EV purchase or lease, and assessments.",
      "reasoningNotes": "Kept OUC-listed residential energy measures. EV charger and broad air-sealing matches were blocked because current pages verify EV purchase and duct repair, not those broader categories."
    },
    "existingSimpleRules": [
      {
        "id": "oir_38f0c864995dab50_v1",
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
        "evidenceText": "OUC heat pump water heater rebate page lists a $500 rebate amount.",
        "sourceUrlsChecked": [
          "https://www.ouc.com/solutions-programs/savings/rebates/heat-pump-water-heater/"
        ],
        "reasoningNotes": "Matched heat pump water heater term. Use one unit as one qualifying water heater.",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_9fbb7d77b82d9b27_v1",
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
        "formula": "Up to $900 per solar thermal water heater",
        "evidenceText": "OUC rebate table lists solar thermal water heater rebates up to $900.",
        "sourceUrlsChecked": [
          "https://www.ouc.com/getgreen/"
        ],
        "reasoningNotes": "Matched solar thermal term. Medium because the source uses up to.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3175",
    "opportunityName": "Georgia Power - Home Energy Improvement Program",
    "state": "GA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3175/georgia-power-home-energy-improvement-program",
    "websiteUrl": "https://www.georgiapower.com/residential/solutions/home-solutions/heip.html",
    "applicationUrl": null,
    "administrator": "Georgia Power Company",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 10,
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
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "ev charger"
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
          "Georgia Power"
        ],
        "notes": "Applies to Georgia Power residential customers in the electric service territory."
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
        "energy_audit",
        "air_sealing_weatherization",
        "duct_sealing_and_insulation",
        "insulation_upgrade",
        "heat_pump_hvac_retrofit",
        "ground_source_geothermal_heat_pump",
        "hvac_tune_up",
        "solar_water_heater",
        "level_2_ev_charger_installation",
        "smart_thermostat_zoning_retrofit",
        "residential_dishwasher",
        "residential_clothes_washer",
        "residential_clothes_dryer",
        "residential_refrigerator",
        "residential_freezer",
        "residential_cooktop",
        "residential_oven",
        "advanced_power_strip",
        "ceiling_fan_replacement",
        "circulator_pump_ecm",
        "dehumidifier",
        "variable_speed_pool_pump",
        "low_flow_showerhead",
        "thermostatic_shower_restriction_valve",
        "air_purifier"
      ],
      "hardRequirements": [
        "Must be a Georgia Power residential customer and submit within current HEIP deadlines.",
        "Many installed measures require licensed or program-qualified contractors and documented preconditions."
      ],
      "blockers": [
        "Residential appliances are not commercial dishwasher, commercial oven, or commercial refrigeration equipment.",
        "EV charger must be ENERGY STAR Level 2 with a dedicated circuit under HEIP rules.",
        "Heat pump incentives are conversion-specific and should not be generalized to all HVAC replacement."
      ],
      "programType": "Rebate Program",
      "administrator": "Georgia Power Company",
      "applicationUrl": null,
      "websiteUrl": "https://www.georgiapower.com/residential/solutions/home-solutions/heip.html",
      "sourceUrlsChecked": [
        "https://www.georgiapower.com/residential/solutions/home-solutions/heip.html",
        "https://www.georgiapower.com/content/dam/georgia-power/pdfs/programs/heip/HEIP_Preconditions_Requirements_2026.pdf",
        "https://www.georgiapower.com/residential/solutions.html"
      ],
      "evidenceText": "Georgia]( Power HEIP lists home assessments, air sealing, duct sealing, attic insulation, heat pump conversions, GSHP conversion, tune-ups, solar water heating, smart thermostats, EV chargers, and residential products.",
      "reasoningNotes": "Kept HEIP residential envelope, HVAC, EV, and product categories while removing commercial foodservice and refrigeration false positives."
    },
    "existingSimpleRules": [
      {
        "id": "oir_34769314c9b0df62_v1",
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
          "maxAmountCents": 125000
        },
        "confidence": "high",
        "formula": "50% of Home Comfort Bundle cost, capped at $1,250",
        "evidenceText": "Georgia Power HEIP page lists the Home Comfort Bundle at 50% rebate up to $1,250.",
        "sourceUrlsChecked": [
          "https://www.georgiapower.com/residential/solutions/home-solutions/heip.html",
          "https://www.georgiapower.com/content/dam/georgia-power/pdfs/programs/heip/HEIP_Preconditions_Requirements_2026.pdf"
        ],
        "reasoningNotes": "Matched duct sealing, air sealing and insulation terms. Use for the bundled attic/ceiling insulation, air sealing and duct sealing measure.",
        "mapping": {
          "primarySavingsModelId": "ev_charging_site_load",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_c6728605a5216aec_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 7500,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "equipment_cost",
          "applicationOrder": 10
        },
        "cap": {
          "maxPercentOfBasis": 0.5
        },
        "confidence": "high",
        "formula": "50% of smart thermostat cost, capped at $75",
        "evidenceText": "Georgia Power HEIP rebate materials list smart thermostat at 50% off up to $75.",
        "sourceUrlsChecked": [
          "https://www.georgiapower.com/residential/solutions/home-solutions/heip.html",
          "https://www.georgiapower.com/content/dam/georgia-power/pdfs/programs/heip/HEIP_Preconditions_Requirements_2026.pdf"
        ],
        "reasoningNotes": "Matched smart thermostat term. Modeled as per-unit maximum with cost cap.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2896",
    "opportunityName": "Waverly Light & Power - Residential Energy Efficiency Rebates",
    "state": "IA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2896/waverly-light-and-power-residential-energy-efficiency-rebates",
    "websiteUrl": "https://www.waverlyutilities.com/electric/residential/rebates",
    "applicationUrl": null,
    "administrator": "Waverly Utilities",
    "programType": "Residential Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 10,
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
          "IA"
        ],
        "counties": [],
        "cities": [
          "Waverly"
        ],
        "utilityTerritories": [
          "Waverly Utilities electric service territory"
        ],
        "notes": "Limited to Waverly Utilities residential customers."
      },
      "eligibleApplicantTypes": [
        "residential_customers",
        "homeowners"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "appliance_recycling_refrigerator",
        "appliance_recycling_clothes_washer",
        "high_efficiency_air_conditioner",
        "heat_pump_hvac_retrofit",
        "ground_source_geothermal_heat_pump",
        "heat_pump_water_heater",
        "spray_foam_insulation_air_sealing",
        "ev_charger_installation"
      ],
      "hardRequirements": [
        "Customer must be current on the previous 12 months of Waverly Utilities billing where required.",
        "Purchases or installations must occur in the current program year and are subject to available funds.",
        "Spray foam insulation and air sealing applies only to new residential home construction and requires preapproval.",
        "Appliance recycling requires proof of refrigerator or clothes washer disposal."
      ],
      "blockers": [
        "Clothes washer and refrigerator language is for appliance recycling, not new high-efficiency laundry or refrigeration equipment.",
        "Spray foam insulation and air sealing should not match generic existing-home weatherization retrofits.",
        "EV charger page confirms a charger rebate but does not verify Level 2 installation requirements.",
        "Commercial dishwashers, commercial refrigeration, and commercial foodservice should not match this residential program."
      ],
      "programType": "Residential Rebate Program",
      "administrator": "Waverly Utilities",
      "applicationUrl": null,
      "websiteUrl": "https://www.waverlyutilities.com/electric/residential/rebates",
      "sourceUrlsChecked": [
        "https://www.waverlyutilities.com/electric/residential/rebates",
        "https://www.waverlyutilities.com/electric/residential/rebates/air-conditionerheat-pump-rebates",
        "https://www.waverlyutilities.com/electric/residential/rebates/appliance-recycling-rebate",
        "https://www.waverlyutilities.com/electric/residential/rebates/electric-vehicle-rebate",
        "https://www.waverlyutilities.com/electric/residential/rebates/heat-pump-water-heater",
        "https://www.waverlyutilities.com/electric/residential/rebates/spray-foam-insulation--air-sealing-rebate"
      ],
      "evidenceText": "Waverly residential pages list appliance recycling, air conditioner and heat pump rebates, geothermal heat pumps, heat pump water heaters, new-home spray foam air sealing and a $75 EV charger rebate.",
      "reasoningNotes": "Corrected appliance and insulation matches to recycling and new-construction spray-foam categories instead of broad retrofit categories."
    },
    "existingSimpleRules": [
      {
        "id": "oir_8312cff3cb331587_v1",
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
        "evidenceText": "Apply for a $75 EV charger rebate Electric Vehicle Rebate Learn More",
        "sourceUrlsChecked": [
          "http://www.waverlyutilities.com/electric/residential/rebates/"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4639",
    "opportunityName": "Avista Utilities (Electric) - Commercial Energy Efficiency Incentives Program",
    "state": "ID",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4639/avista-utilities-electric-commercial-energy-efficiency-incentives-program",
    "websiteUrl": "https://www.myavista.com/energy-savings/energy-saving-programs-services-for-your-business/rebates-idaho",
    "applicationUrl": null,
    "administrator": "Avista Utilities",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 10,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "demand_controlled_ventilation",
        "displayName": "Demand-controlled ventilation",
        "parentCategory": "indoor_air_quality_ventilation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "demand controlled ventilation",
          "dcv"
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
          "ID"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Avista Idaho electric service territory"
        ],
        "notes": "Applies to eligible Avista Idaho business customers; some foodservice equipment may require applicable Avista electric or natural gas service."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "industrial_customer",
        "business_customer",
        "small_business_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "grocery",
        "restaurant_foodservice",
        "lodging",
        "office",
        "manufacturing"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "custom_lighting_retrofit",
        "small_business_direct_install",
        "high_efficiency_hvac_replacement",
        "heat_pump_hvac_retrofit",
        "high_efficiency_water_heating",
        "high_efficiency_refrigeration_equipment",
        "commercial_grocery_refrigeration_retrofit",
        "high_efficiency_motor_rewind",
        "compressed_air_leak_repair",
        "pay_for_performance_whole_building_retrofit",
        "retrocommissioning",
        "custom_energy_efficiency_retrofit",
        "high_efficiency_food_service_equipment",
        "demand_controlled_ventilation",
        "high_efficiency_fryer",
        "high_efficiency_oven",
        "commercial_cooktop",
        "commercial_griddle",
        "commercial_ice_machine",
        "ultra_low_temperature_freezer",
        "commercial_induction_cooking_equipment",
        "variable_frequency_drive_retrofit"
      ],
      "hardRequirements": [
        "Applicant must be an eligible Avista Idaho business customer.",
        "Equipment must qualify under the applicable Avista business rebate, instant rebate, custom, or site-specific program.",
        "Site-specific and custom projects require contacting Avista before purchase or service and must meet savings and measure-life rules.",
        "Foodservice instant rebates require qualifying equipment through participating dealers and applicable Avista energy service.",
        "Lighting, HVAC, refrigeration, motors, compressed air, and pay-for-performance measures must satisfy their respective program rules."
      ],
      "blockers": [
        "Commercial dishwasher was not verified in the current accessible Avista pages and should not be matched without current form support.",
        "Residential insulation and home weatherization are not supported by this Idaho commercial electric opportunity.",
        "Induction support is limited to qualifying commercial foodservice equipment, not residential cooking equipment.",
        "Variable frequency drive matches should be treated as site-specific or supported where current measure rules confirm eligibility.",
        "No residential appliances should be inferred."
      ],
      "programType": "Rebate Program",
      "administrator": "Avista Utilities",
      "applicationUrl": null,
      "websiteUrl": "https://www.myavista.com/energy-savings/energy-saving-programs-services-for-your-business/rebates-idaho",
      "sourceUrlsChecked": [
        "https://www.myavista.com/energy-savings/energy-saving-programs-services-for-your-business/rebates-idaho",
        "https://www.myavista.com/energy-savings/energy-saving-programs-services-for-your-business/food-service-equipment-instant-rebates"
      ],
      "evidenceText": "Avista’s Idaho business page lists lighting, HVAC/water heating, grocery refrigeration, motors, compressed-air leak repair, pay-for-performance and site-specific rebates. Its foodservice page lists DCV, ovens, fryers and other equipment.",
      "reasoningNotes": "Most commercial categories are supportable, but dishwasher and insulation were over-broad or unsupported from current accessible official sources."
    },
    "existingSimpleRules": [
      {
        "id": "oir_f928e6dd99f52dc2_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 100,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "$1 per eligible unit",
        "evidenceText": "The service center will perform the rewind and then apply an instant discount worth $1 per horsepower on your invoice",
        "sourceUrlsChecked": [
          "https://www.myavista.com/energy-savings/tools-for-your-business/rebates-idaho"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3135",
    "opportunityName": "Idaho Power - Residential Energy Efficiency Rebate Programs",
    "state": "ID",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3135/idaho-power-residential-energy-efficiency-rebate-programs",
    "websiteUrl": "https://www.idahopower.com/energy-environment/ways-to-save/savings-for-your-home/rebates-and-offers/",
    "applicationUrl": null,
    "administrator": "Idaho Power",
    "programType": "Rebate And Discounted Audit",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 10,
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
          "ID",
          "OR"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Idaho Power"
        ],
        "notes": "Idaho Power residential service territory spans Idaho and Oregon; DSIRE target state is Idaho, but eligibility should be constrained to Idaho Power residential customers."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "homeowner",
        "property_owner"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "ductless_heat_pump",
        "ducted_air_source_heat_pump",
        "ground_source_geothermal_heat_pump",
        "open_loop_water_source_heat_pump",
        "heat_pump_water_heater",
        "duct_sealing",
        "air_handler_ecm_motor_replacement",
        "smart_thermostat",
        "central_air_conditioner",
        "evaporative_cooler",
        "whole_house_fan",
        "home_energy_audit"
      ],
      "hardRequirements": [
        "Applicant must be an Idaho Power residential customer.",
        "Heating and Cooling Efficiency Program measures must meet existing-home, new-home, or equipment-specific eligibility rules.",
        "Duct sealing requires qualifying electric resistance or heat pump systems and a participating contractor.",
        "Heat pump water heater must replace an existing electric resistance storage water heater and meet qualified product rules.",
        "Home energy audit is a discounted audit service, not a physical retrofit."
      ],
      "blockers": [
        "Do not match refrigerator or commercial refrigeration equipment.",
        "Do not match LED lighting.",
        "ECM support is for qualifying air-handler motor replacement, not refrigeration EC motors.",
        "Do not match non-residential customers to this residential opportunity.",
        "Do not treat the home energy audit itself as a physical retrofit."
      ],
      "programType": "Rebate And Discounted Audit",
      "administrator": "Idaho Power",
      "applicationUrl": null,
      "websiteUrl": "https://www.idahopower.com/energy-environment/ways-to-save/savings-for-your-home/rebates-and-offers/",
      "sourceUrlsChecked": [
        "https://www.idahopower.com/ways-to-save/savings-for-your-home/rebates-and-offers/",
        "https://www.idahopower.com/energy-environment/ways-to-save/savings-for-your-home/rebates-and-offers/",
        "https://www.idahopower.com/energy-environment/ways-to-save/savings-for-your-home/rebates-and-offers/heating-and-cooling-efficiency-program/",
        "https://www.idahopower.com/energy-environment/ways-to-save/savings-for-your-home/rebates-and-offers/heating-and-cooling-efficiency-program/existing-homes/",
        "https://www.idahopower.com/energy-environment/ways-to-save/savings-for-your-home/home-energy-audit/"
      ],
      "evidenceText": "Idaho Power residential pages list heating and cooling incentives for ductless and ducted heat pumps, geothermal, duct sealing, ECM motors, heat pump water heaters, smart thermostats, AC, evaporative cooling, whole-house fans, and home audits.",
      "reasoningNotes": "Refrigerator, LED lighting, and refrigeration EC motor matches were unsupported false positives."
    },
    "existingSimpleRules": [
      {
        "id": "oir_303d134e8f5ad24d_v1",
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
        "evidenceText": "Idaho Power smart thermostat page lists the incentive as $50.",
        "sourceUrlsChecked": [
          "https://www.idahopower.com/energy-environment/ways-to-save/savings-for-your-home/rebates-and-offers/heating-and-cooling-efficiency-program/smart-thermostat-existing-homes/"
        ],
        "reasoningNotes": "Matched smart thermostat terms. Use one unit as one eligible ENERGY STAR smart thermostat.",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_5e64f9a64967255c_v1",
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
        "formula": "$300 per qualifying hybrid heat pump water heater",
        "evidenceText": "Idaho Power heat pump water heater page lists the incentive as $300.",
        "sourceUrlsChecked": [
          "https://www.idahopower.com/energy-environment/ways-to-save/savings-for-your-home/rebates-and-offers/heating-and-cooling-efficiency-program/heat-pump-water-heater/"
        ],
        "reasoningNotes": "Matched heat pump water heater term. Use one unit as one eligible HPWH.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3171",
    "opportunityName": "Ameren Illinois (Electric) - Residential Energy Efficiency Incentives",
    "state": "IL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3171/ameren-illinois-electric-residential-energy-efficiency-incentives",
    "websiteUrl": "https://amerenillinoissavings.com/residential/products-discounts-and-rebates/",
    "applicationUrl": null,
    "administrator": "Ameren Illinois",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 10,
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
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "IL"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Ameren Illinois"
        ],
        "notes": "Most measures require Ameren Illinois electric delivery service; some gas water-heating or thermostat measures depend on delivered fuel."
      },
      "eligibleApplicantTypes": [
        "residential_customer"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "smart_thermostat_zoning_retrofit",
        "heat_pump_hvac_retrofit",
        "ducted_air_source_heat_pump",
        "heat_pump_water_heater",
        "high_efficiency_gas_water_heater",
        "residential_clothes_washer",
        "residential_electric_clothes_dryer",
        "residential_refrigerator_freezer",
        "residential_room_air_conditioner",
        "variable_speed_pool_pump",
        "residential_lighting",
        "advanced_power_strip",
        "air_purifier",
        "dehumidifier",
        "ventilation_fan",
        "water_cooler",
        "residential_induction_cooking",
        "level_2_ev_charger_installation"
      ],
      "hardRequirements": [
        "Must be an Ameren Illinois residential delivery service customer for applicable equipment.",
        "Applications and instant discounts must follow measure deadlines, limits, and ENERGY STAR or program specifications."
      ],
      "blockers": [
        "Residential appliances are not commercial dishwasher, foodservice, refrigeration, or laundry equipment.",
        "EV ChargeSmart and charging rates are separate transportation programs and should not be conflated with the product rebate.",
        "Gas water heater eligibility depends on fuel service and should not be matched to electric-only customers."
      ],
      "programType": "Rebate Program",
      "administrator": "Ameren Illinois",
      "applicationUrl": null,
      "websiteUrl": "https://amerenillinoissavings.com/residential/products-discounts-and-rebates/",
      "sourceUrlsChecked": [
        "https://amerenillinoissavings.com/residential/products-discounts-and-rebates/",
        "https://amerenillinoissavings.com/residential/products-discounts-and-rebates/hvac-and-water-heating-discounts/",
        "https://amerenillinoissavings.com/residential/ev-home-charger/"
      ],
      "evidenceText": "Ameren]( Illinois residential pages list smart thermostats, air-source heat pumps, heat pump water heaters, EV home charger offers, and residential product discounts.",
      "reasoningNotes": "Retained current residential product and HVAC categories, while removing commercial dishwasher and commercial refrigeration false positives."
    },
    "existingSimpleRules": [
      {
        "id": "oir_317ebeca6bdc75e7_v1",
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
        "formula": "$50 per Blink HQ 200 Level 2 home charger through Ameren Illinois marketplace",
        "evidenceText": "Ameren Illinois EV home charger page lists Blink HQ 200 Level 2 charger incentive at $50.",
        "sourceUrlsChecked": [
          "https://amerenillinoissavings.com/residential/ev-home-charger/",
          "https://www.ameren.com/electric-vehicles/savings"
        ],
        "reasoningNotes": "Matched EV charging and Level 2 terms. Use one unit as one eligible marketplace charger.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5822",
    "opportunityName": "AEP (SWEPCO) - Efficient Products Rebates Program",
    "state": "LA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5822/aep-swepco-efficient-products-rebates-program",
    "websiteUrl": "https://swepcosolutions.com/rebates/",
    "applicationUrl": null,
    "administrator": "AEP SWEPCO",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 10,
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
          "low flow"
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
          "LA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "SWEPCO Louisiana electric service territory"
        ],
        "notes": "Limited to eligible SWEPCO Louisiana residential electric customers for the current efficient-products rebate offering."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "homeowner",
        "renter",
        "tenant_with_owner_permission"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_water_heater",
        "level_2_ev_charger_installation",
        "energy_star_room_air_conditioner",
        "energy_star_residential_dishwasher",
        "energy_star_smart_thermostat",
        "induction_cooktop_range",
        "window_replacement",
        "energy_star_room_air_cleaner",
        "energy_star_residential_clothes_dryer"
      ],
      "hardRequirements": [
        "Applicant must be a SWEPCO Louisiana residential electric customer.",
        "Product must meet ENERGY STAR, NFRC, or program-specific qualification requirements.",
        "Customer must keep receipts, product labels, and required documentation.",
        "Application must be submitted through the applicable official rebate process while funding is available.",
        "Some products require home ownership, rental status, or owner permission as specified by the product page."
      ],
      "blockers": [
        "Louisiana weatherization and HVAC incentives are separate SWEPCO program paths and should not be inferred into this efficient-products opportunity.",
        "Business low-flow pre-rinse spray valves are separate business rebates, not residential low-flow fixture retrofits.",
        "Commercial lighting rebates are separate business programs and do not support a residential LED retrofit match here.",
        "Residential dishwasher support is not commercial dishwasher equipment.",
        "Window category is limited to qualifying residential ENERGY STAR replacement windows, not window air conditioners."
      ],
      "programType": "Rebate Program",
      "administrator": "AEP SWEPCO",
      "applicationUrl": null,
      "websiteUrl": "https://swepcosolutions.com/rebates/",
      "sourceUrlsChecked": [
        "https://swepcosolutions.com/rebates/",
        "https://swepcosolutions.com/rebates/energy-star-heat-pump-water-heaters-1150/",
        "https://swepcosolutions.com/rebates/energy-star-room-ac/",
        "https://swepcosolutions.com/rebates/energy-star-dishwashers/",
        "https://swepcosolutions.com/rebates/energy-star-smart-thermostats/",
        "https://swepcosolutions.com/rebates/energy-star-induction-cooktop/",
        "https://swepcosolutions.com/rebates/energy-star-window-replacements/",
        "https://swepcosolutions.com/rebates/low-flow-pre-rinse-spray-valves/",
        "https://swepcosolutions.com/programs/residential-programs/louisiana-weatherization-program/",
        "https://www.swepco.com/savings/home/money/incentives/hvac"
      ],
      "evidenceText": "SWEPCO Solutions product pages verify residential rebates for HPWHs, room ACs, dishwashers, smart thermostats, induction cooktops, replacement windows, air purifiers, clothes dryers and related Level 2 EV chargers.",
      "reasoningNotes": "The record should distinguish efficient-product rebates from separate SWEPCO HVAC, weatherization, business lighting and business pre-rinse programs."
    },
    "existingSimpleRules": [
      {
        "id": "oir_3c1c97badc8984a7_v1",
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
        "formula": "$250 per ENERGY STAR certified Level 2 EV charging station",
        "evidenceText": "SWEPCO says Louisiana residential customers can qualify for a $250 ENERGY STAR Level 2 EV charging station rebate.",
        "sourceUrlsChecked": [
          "https://www.swepco.com/savings/home/money/rebates/",
          "https://www.swepco.com/clean-energy/electric-cars/charging-station-rules"
        ],
        "reasoningNotes": "Matched Level 2 EV charging terms. Use one unit as one eligible home charging station.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4755",
    "opportunityName": "Lansing Board of Water & Light - Residential Energy Efficiency Rebates",
    "state": "MI",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4755/lansing-board-of-water-and-light-residential-energy-efficiency-rebates",
    "websiteUrl": "https://www.lbwl.com/energysavers?availability=Homeowners",
    "applicationUrl": "https://www.lbwl.com/sites/default/files/documents/BWL%20HES_Residential%20Application_2026_v01.09.pdf",
    "administrator": "Lansing Board of Water & Light",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 10,
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
          "MI"
        ],
        "counties": [
          "Ingham",
          "Eaton",
          "Clinton"
        ],
        "cities": [
          "Lansing",
          "East Lansing"
        ],
        "utilityTerritories": [
          "Lansing Board of Water & Light"
        ],
        "notes": "Available to eligible BWL residential electric customers in the utility's electric service territory."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customer",
        "homeowner"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "basement_wall_insulation",
        "attic_insulation",
        "wall_insulation",
        "air_sealing_infiltration_reduction",
        "duct_sealing",
        "energy_star_residential_room_air_conditioner",
        "central_air_conditioner",
        "central_air_source_heat_pump",
        "mini_split_heat_pump",
        "central_ac_tune_up",
        "smart_wifi_thermostat",
        "heat_pump_water_heater",
        "energy_star_pool_pump",
        "bathroom_exhaust_fan",
        "energy_star_residential_clothes_washer",
        "energy_star_residential_electric_clothes_dryer",
        "heat_pump_clothes_dryer",
        "energy_star_residential_refrigerator",
        "energy_star_residential_freezer",
        "energy_star_residential_dishwasher",
        "whole_home_dehumidifier",
        "residential_induction_cooktop",
        "smart_power_strip",
        "air_purifier",
        "electric_bike",
        "battery_powered_lawn_equipment"
      ],
      "hardRequirements": [
        "Applicant must be an eligible BWL residential electric customer.",
        "Measures must meet the 2026 residential rebate application efficiency and documentation requirements.",
        "Insulation and air-sealing rebates require qualifying residential electric service and specified HVAC conditions.",
        "Applications must use current BWL residential forms and observe purchase and submission requirements."
      ],
      "blockers": [
        "Do not match EV charging; the 2026 residential rebate flyer did not verify a residential EV charger rebate.",
        "Residential dishwasher is not commercial dishwasher.",
        "Residential refrigerator and freezer rebates are not commercial refrigeration equipment.",
        "Do not match commercial kitchen or commercial laundry categories.",
        "Do not match ground-source geothermal without current BWL residential measure support."
      ],
      "programType": "Rebate",
      "administrator": "Lansing Board of Water & Light",
      "applicationUrl": "https://www.lbwl.com/sites/default/files/documents/BWL%20HES_Residential%20Application_2026_v01.09.pdf",
      "websiteUrl": "https://www.lbwl.com/energysavers?availability=Homeowners",
      "sourceUrlsChecked": [
        "https://www.lbwl.com/energysavers?availability=Homeowners",
        "https://www.lbwl.com/documents/residential-rebate-incentives",
        "https://www.lbwl.com/sites/default/files/documents/BWL%20HES_Residential%20Application_2026_v01.09.pdf"
      ],
      "evidenceText": "BWL's 2026 residential rebate materials list insulation, infiltration reduction, duct sealing, HVAC, HPWH, thermostats, pool pumps, exhaust fans, residential appliances, induction, e-bikes, and lawn equipment.",
      "reasoningNotes": "The original match confused residential appliance rebates with commercial equipment and included unverified EV charging."
    },
    "existingSimpleRules": [
      {
        "id": "oir_a38a25c4bb7af99d_v1",
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
        "formula": "Up to $500 for installing a Level 2 charger and enrolling in Off-Peak Savers",
        "evidenceText": "BWL PEV Off-Peak Savers page says customers can qualify for up to a $500 rebate.",
        "sourceUrlsChecked": [
          "https://www.lbwl.com/pev-off-peak-savers-program-500-rebate",
          "https://www.lbwl.com/customers/save-money-energy/plug-electric-vehicles-pev"
        ],
        "reasoningNotes": "Matched Level 2 EV charging terms. Excludes recurring rate savings and models only the one-time charger rebate.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2534",
    "opportunityName": "Fairmont Public Utilities - Residential Energy Efficiency Rebate Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2534/fairmont-public-utilities-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://smmpa.com/members/fairmont",
    "applicationUrl": null,
    "administrator": "Fairmont Public Utilities",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 10,
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
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "MN"
        ],
        "counties": [
          "Martin"
        ],
        "cities": [
          "Fairmont"
        ],
        "utilityTerritories": [
          "Fairmont Public Utilities"
        ],
        "notes": "Available to eligible Fairmont Public Utilities residential electric customers through SMMPA member rebate forms."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customer",
        "homeowner",
        "renter_with_utility_account"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "energy_star_residential_products",
        "energy_star_level_2_ev_charger",
        "residential_cooling_equipment",
        "residential_cooling_tune_up",
        "ecm_circulator_pump",
        "furnace_fan_motor_ecm",
        "efficient_pool_pump",
        "aerosol_duct_sealing",
        "battery_powered_outdoor_equipment",
        "e_bike"
      ],
      "hardRequirements": [
        "Applicant must be an eligible Fairmont Public Utilities residential electric customer.",
        "Measures must use the current SMMPA/Fairmont residential rebate form for the specific product category.",
        "Business rebate categories are separate and must use separate business forms.",
        "Google Drive rebate forms may require browser access but are linked from the official SMMPA member page."
      ],
      "blockers": [
        "Do not match commercial dishwasher, commercial refrigeration, or commercial kitchen categories to this residential program.",
        "Do not match broad LED lighting unless the current residential product form specifically supports it.",
        "Do not match heat pump water heater, geothermal heat pump, or furnace replacement without current form support.",
        "Do not merge the separate SMMPA business rebate list into this residential opportunity."
      ],
      "programType": "Rebate",
      "administrator": "Fairmont Public Utilities",
      "applicationUrl": null,
      "websiteUrl": "https://smmpa.com/members/fairmont",
      "sourceUrlsChecked": [
        "https://smmpa.com/members/fairmont",
        "https://drive.google.com/file/d/17cLZnR1JVbw0fXGS2D5El_thl9r6MxQo/view?usp=drive_link",
        "https://drive.google.com/file/d/16YANBfBsL2GDB3jxOIW-t5GX1J50aOjj/view?usp=drive_link",
        "https://drive.google.com/file/d/1UN7PSFnrSvVmKOUp67LauA-LGnxhmOQy/view?usp=drive_link",
        "https://drive.google.com/file/d/1phpat4R5tWMY2MURkPNcwewXJ85P5yeP/view?usp=drive_link"
      ],
      "evidenceText": "The SMMPA Fairmont page links 2026 residential forms for ENERGY STAR products, EV chargers, cooling equipment and tune-ups, ECM pumps, furnace fan motors, pool pumps, aerosol sealing, e-bikes, and outdoor equipment.",
      "reasoningNotes": "Current official page supports category-level forms, but the linked Drive forms were not fully readable in the browser session, so measure detail confidence is medium."
    },
    "existingSimpleRules": [
      {
        "id": "oir_fbcdb80c4dc5559c_v1",
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
        "formula": "$500 per connected ChargePoint Home Flex Level 2 charger",
        "evidenceText": "Bright Energy Solutions 2026 EV charger form lists ChargePoint Home Flex connected charger at $500.",
        "sourceUrlsChecked": [
          "https://smmpa.com/members/fairmont",
          "https://www.brightenergysolutions.com/find-a-rebate/"
        ],
        "reasoningNotes": "Matched Level 2 EV charging terms. Confidence is medium because Bright Energy Solutions participation can vary by municipal utility.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2539",
    "opportunityName": "Grand Marais PUC - Residential Energy Efficiency Rebate Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2539/grand-marais-puc-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://smmpa.com/members/grand-marais",
    "applicationUrl": null,
    "administrator": "Grand Marais PUC",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 10,
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
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "MN"
        ],
        "counties": [
          "Cook"
        ],
        "cities": [
          "Grand Marais"
        ],
        "utilityTerritories": [
          "Grand Marais PUC"
        ],
        "notes": "Available to eligible Grand Marais PUC residential electric customers through SMMPA member rebate forms."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customer",
        "homeowner",
        "renter_with_utility_account"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "energy_star_residential_products",
        "energy_star_level_2_ev_charger",
        "residential_cooling_equipment",
        "residential_cooling_tune_up",
        "ecm_circulator_pump",
        "furnace_fan_motor_ecm",
        "efficient_pool_pump",
        "aerosol_duct_sealing",
        "battery_powered_outdoor_equipment",
        "e_bike"
      ],
      "hardRequirements": [
        "Applicant must be an eligible Grand Marais PUC residential electric customer.",
        "Measures must use the current SMMPA/Grand Marais residential rebate form for the specific product category.",
        "Business rebate categories are separate and must use separate business forms.",
        "Google Drive rebate forms may require browser access but are linked from the official SMMPA member page."
      ],
      "blockers": [
        "Do not match commercial dishwasher, commercial refrigeration, or commercial kitchen categories to this residential program.",
        "Do not match broad LED lighting unless the current residential product form specifically supports it.",
        "Do not match heat pump water heater, geothermal heat pump, or furnace replacement without current form support.",
        "Do not merge the separate SMMPA business rebate list into this residential opportunity."
      ],
      "programType": "Rebate",
      "administrator": "Grand Marais PUC",
      "applicationUrl": null,
      "websiteUrl": "https://smmpa.com/members/grand-marais",
      "sourceUrlsChecked": [
        "https://smmpa.com/members/grand-marais"
      ],
      "evidenceText": "The SMMPA Grand Marais page links 2026 residential forms for ENERGY STAR products, EV chargers, cooling equipment and tune-ups, ECM pumps, furnace fan motors, pool pumps, aerosol sealing, e-bikes, and outdoor equipment.",
      "reasoningNotes": "Current official page supports category-level forms; separate business rebate links should not be mixed into the residential opportunity."
    },
    "existingSimpleRules": [
      {
        "id": "oir_2ad05c0d5fad733e_v1",
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
        "confidence": "medium",
        "formula": "$150 per other qualifying Level 2 charger",
        "evidenceText": "Bright Energy Solutions EV materials list $150 for another qualifying Level 2 charger.",
        "sourceUrlsChecked": [
          "https://www.brightenergysolutions.com/electric-vehicles",
          "http://www.SaveEnergyInGrandMarais.com"
        ],
        "reasoningNotes": "Returned separately from the ChargePoint-specific Level 2 charger amount.",
        "mapping": {
          "primarySavingsModelId": "ev_charging_site_load",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_e06a061612be776d_v1",
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
        "formula": "$500 per connected ChargePoint Home Flex Level 2 charger",
        "evidenceText": "Bright Energy Solutions EV materials list $500 for a Wi-Fi-enabled ChargePoint Home Flex charger connected to local utility.",
        "sourceUrlsChecked": [
          "https://www.brightenergysolutions.com/electric-vehicles",
          "http://www.SaveEnergyInGrandMarais.com"
        ],
        "reasoningNotes": "Matched EV charging and Level 2 terms. Confidence is medium because municipal participation should be verified.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2543",
    "opportunityName": "Lake City Utilities - Residential Energy Efficiency Rebate Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2543/lake-city-utilities-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://smmpa.com/members/lake-city",
    "applicationUrl": null,
    "administrator": "Lake City Utilities",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 10,
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
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "MN"
        ],
        "counties": [
          "Wabasha",
          "Goodhue"
        ],
        "cities": [
          "Lake City"
        ],
        "utilityTerritories": [
          "Lake City Utilities"
        ],
        "notes": "Available to eligible Lake City Utilities residential electric customers through SMMPA member rebate forms."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customer",
        "homeowner",
        "renter_with_utility_account"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "energy_star_residential_products",
        "energy_star_level_2_ev_charger",
        "residential_cooling_equipment",
        "residential_cooling_tune_up",
        "ecm_circulator_pump",
        "furnace_fan_motor_ecm",
        "efficient_pool_pump",
        "aerosol_duct_sealing",
        "battery_powered_outdoor_equipment",
        "e_bike"
      ],
      "hardRequirements": [
        "Applicant must be an eligible Lake City Utilities residential electric customer.",
        "Measures must use the current SMMPA/Lake City residential rebate form for the specific product category.",
        "Business rebate categories are separate and must use separate business forms.",
        "Google Drive rebate forms may require browser access but are linked from the official SMMPA member page."
      ],
      "blockers": [
        "Do not match commercial dishwasher, commercial refrigeration, or commercial kitchen categories to this residential program.",
        "Do not match broad LED lighting unless the current residential product form specifically supports it.",
        "Do not match heat pump water heater, geothermal heat pump, or furnace replacement without current form support.",
        "Do not merge the separate SMMPA business rebate list into this residential opportunity."
      ],
      "programType": "Rebate",
      "administrator": "Lake City Utilities",
      "applicationUrl": null,
      "websiteUrl": "https://smmpa.com/members/lake-city",
      "sourceUrlsChecked": [
        "https://smmpa.com/members/lake-city"
      ],
      "evidenceText": "The SMMPA Lake City page links 2026 residential forms for ENERGY STAR products, EV chargers, cooling equipment and tune-ups, ECM pumps, furnace fan motors, pool pumps, aerosol sealing, e-bikes, and outdoor equipment.",
      "reasoningNotes": "Current official page supports category-level forms; separate business rebate links should not be mixed into the residential opportunity."
    },
    "existingSimpleRules": [
      {
        "id": "oir_a86be92bc7cb8b50_v1",
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
        "formula": "$500 per connected ChargePoint Home Flex Level 2 charger",
        "evidenceText": "Bright Energy Solutions says connecting a Wi-Fi-enabled ChargePoint Home Flex charger to local utility earns a $500 rebate.",
        "sourceUrlsChecked": [
          "https://www.brightenergysolutions.com/electric-vehicles",
          "http://www.SaveEnergyInLakeCity.com"
        ],
        "reasoningNotes": "Matched Level 2 EV charging terms. Municipal participation should be confirmed for final eligibility.",
        "mapping": {
          "primarySavingsModelId": "ev_charging_site_load",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_da82b33554647569_v1",
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
        "confidence": "medium",
        "formula": "$150 per other qualifying Level 2 charger",
        "evidenceText": "Bright Energy Solutions says other qualifying Level 2 chargers earn a $150 rebate.",
        "sourceUrlsChecked": [
          "https://www.brightenergysolutions.com/electric-vehicles",
          "http://www.SaveEnergyInLakeCity.com"
        ],
        "reasoningNotes": "Returned separately from the ChargePoint-specific amount.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2544",
    "opportunityName": "Litchfield Public Utilities - Residential Energy Efficiency Rebate Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2544/litchfield-public-utilities-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://smmpa.com/members/litchfield",
    "applicationUrl": null,
    "administrator": "Litchfield Public Utilities",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 10,
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
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "MN"
        ],
        "counties": [
          "Meeker"
        ],
        "cities": [
          "Litchfield"
        ],
        "utilityTerritories": [
          "Litchfield Public Utilities"
        ],
        "notes": "Available to eligible Litchfield Public Utilities residential electric customers through SMMPA member rebate forms."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customer",
        "homeowner",
        "renter_with_utility_account"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "energy_star_residential_products",
        "energy_star_level_2_ev_charger",
        "residential_cooling_equipment",
        "residential_cooling_tune_up",
        "ecm_circulator_pump",
        "furnace_fan_motor_ecm",
        "efficient_pool_pump",
        "aerosol_duct_sealing",
        "battery_powered_outdoor_equipment",
        "e_bike"
      ],
      "hardRequirements": [
        "Applicant must be an eligible Litchfield Public Utilities residential electric customer.",
        "Measures must use the current SMMPA/Litchfield residential rebate form for the specific product category.",
        "Business rebate categories are separate and must use separate business forms.",
        "Google Drive rebate forms may require browser access but are linked from the official SMMPA member page."
      ],
      "blockers": [
        "Do not match commercial dishwasher, commercial refrigeration, or commercial kitchen categories to this residential program.",
        "Do not match broad LED lighting unless the current residential product form specifically supports it.",
        "Do not match heat pump water heater, geothermal heat pump, or furnace replacement without current form support.",
        "Do not merge the separate SMMPA business rebate list into this residential opportunity."
      ],
      "programType": "Rebate",
      "administrator": "Litchfield Public Utilities",
      "applicationUrl": null,
      "websiteUrl": "https://smmpa.com/members/litchfield",
      "sourceUrlsChecked": [
        "https://smmpa.com/members/litchfield"
      ],
      "evidenceText": "The SMMPA Litchfield page links 2026 residential forms for ENERGY STAR products, EV chargers, cooling equipment and tune-ups, ECM pumps, furnace fan motors, pool pumps, aerosol sealing, e-bikes, and outdoor equipment.",
      "reasoningNotes": "Current official page supports category-level forms; separate business rebate links should not be mixed into the residential opportunity."
    },
    "existingSimpleRules": [
      {
        "id": "oir_6a3b4ee92f9c436e_v1",
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
        "confidence": "medium",
        "formula": "$150 per other qualifying Level 2 charger",
        "evidenceText": "Bright Energy Solutions EV materials list $150 for another qualifying Level 2 charger.",
        "sourceUrlsChecked": [
          "http://www.SaveEnergyInLitchfield.com",
          "https://www.brightenergysolutions.com/electric-vehicles/electric-vehicle-charging-program"
        ],
        "reasoningNotes": "Returned separately from the ChargePoint-specific Level 2 amount.",
        "mapping": {
          "primarySavingsModelId": "ev_charging_site_load",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_ac7e0088121be97d_v1",
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
        "formula": "$500 per connected ChargePoint Home Flex Level 2 charger",
        "evidenceText": "Bright Energy Solutions EV materials list $500 for a Wi-Fi-enabled ChargePoint Home Flex charger connected to local utility.",
        "sourceUrlsChecked": [
          "http://www.SaveEnergyInLitchfield.com",
          "https://www.brightenergysolutions.com/electric-vehicles/electric-vehicle-charging-program"
        ],
        "reasoningNotes": "Matched Level 2 EV charging. Confidence is medium because member utility participation should be verified.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22130",
    "opportunityName": "Minnesota Power - Business Rebates & Savings",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22130/minnesota-power-business-rebates-and-savings",
    "websiteUrl": "https://www.mnpower.com/ProgramsRebates/BusinessIncentives",
    "applicationUrl": null,
    "administrator": "Minnesota Power",
    "programType": "Business Energy Efficiency Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 10,
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
        "notes": "Eligible projects must be for Minnesota Power business electric customers in the utility service territory."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "industrial_customer",
        "agricultural_customer",
        "multifamily_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "agricultural",
        "multifamily"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "heat_pump_hvac_retrofit",
        "cold_climate_air_source_heat_pump",
        "ductless_mini_split_heat_pump",
        "hvac_tuneup",
        "ecm_circulator_pump",
        "efficient_ice_machine",
        "high_efficiency_refrigeration_equipment",
        "energy_star_residential_refrigerator_freezer",
        "energy_star_clothes_washer",
        "heat_pump_clothes_dryer",
        "energy_star_dehumidifier",
        "energy_star_room_air_cleaner",
        "high_efficiency_commercial_dishwasher",
        "high_efficiency_fryer",
        "high_efficiency_oven",
        "high_efficiency_steamer",
        "high_efficiency_griddle",
        "hot_food_holding_cabinet",
        "energy_analysis",
        "custom_electric_efficiency_project"
      ],
      "hardRequirements": [
        "Applicant must be a Minnesota Power business customer.",
        "Rebate applications and invoices must be submitted within the program's stated submission window.",
        "Rebates are contingent on verification and available funding.",
        "Some appliance and food-service measures require electric water heating at the facility."
      ],
      "blockers": [
        "Laundry rebates are product-specific clothes washer and heat pump dryer, not a broad water-efficiency retrofit category.",
        "Commercial clothes washer and dishwasher measures may require the facility to have an electric water heater.",
        "Gas furnace and boiler retrofits are not supported by this electric business rebate page.",
        "EVs, forklifts, e-buses, and other electrification projects are handled through separate contact or project pathways, not ordinary HVAC or food-service rebates.",
        "Custom and new-construction incentives require Minnesota Power review, verification, and available funding."
      ],
      "programType": "Business Energy Efficiency Rebate Program",
      "administrator": "Minnesota Power",
      "applicationUrl": null,
      "websiteUrl": "https://www.mnpower.com/ProgramsRebates/BusinessIncentives",
      "sourceUrlsChecked": [
        "https://www.mnpower.com/ProgramsRebates/BusinessIncentives",
        "https://www.mnpower.com/ProgramsRebates/Business"
      ],
      "evidenceText": "Minnesota Power's current business page lists 2026 rebates for commercial, industrial, multifamily, and agricultural customers including lighting, heat pumps, appliances, foodservice, refrigeration, and custom energy analysis.",
      "reasoningNotes": "Residential-only appliances were kept only where Minnesota Power lists residential-sized products within the business program. Fuel-switching and EV-related items were limited to stated pathways."
    },
    "existingSimpleRules": [
      {
        "id": "oir_0fccca90b3aff182_v1",
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
        "formula": "$75 per ENERGY STAR commercial refrigerator or freezer",
        "evidenceText": "Minnesota Power business appliance table lists commercial refrigerator/freezer at $75.",
        "sourceUrlsChecked": [
          "https://www.mnpower.com/ProgramsRebates/BusinessIncentives"
        ],
        "reasoningNotes": "Matched refrigerator/freezer terms. Use one unit as one qualifying self-contained commercial refrigerator or freezer.",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_28bb06d05972997b_v1",
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
        "formula": "$50 per ENERGY STAR clothes washer with electric water heating",
        "evidenceText": "Minnesota Power business appliance table lists Clothes Washer at $50 when facility has an electric water heater.",
        "sourceUrlsChecked": [
          "https://www.mnpower.com/ProgramsRebates/BusinessIncentives"
        ],
        "reasoningNotes": "Matched clothes washer term. Returned as a separate appliance candidate.",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_4faca808cfa98a07_v1",
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
        "formula": "$75 per ENERGY STAR commercial air-cooled ice machine",
        "evidenceText": "Minnesota Power business appliance table lists Ice Machine at $75.",
        "sourceUrlsChecked": [
          "https://www.mnpower.com/ProgramsRebates/BusinessIncentives"
        ],
        "reasoningNotes": "Matched ice machine term. Use one unit as one qualifying commercial ice machine.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2251",
    "opportunityName": "Minnesota Valley Electric Cooperative - Residential Energy Efficiency Rebate Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2251/minnesota-valley-electric-cooperative-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.mvec.net/savings/rebates/",
    "applicationUrl": null,
    "administrator": "Minnesota Valley Electric Cooperative",
    "programType": "Residential Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 10,
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
        "retrofitTypeId": "refrigeration_ec_motor_retrofit",
        "displayName": "Refrigeration EC motor retrofit",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "electronically commutated motor"
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
          "Minnesota Valley Electric Cooperative"
        ],
        "notes": "Eligible applicant must be an MVEC residential member-owner in the cooperative's electric service territory."
      },
      "eligibleApplicantTypes": [
        "residential_member_owner",
        "residential_customer"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "ev_charger_installation",
        "level_2_ev_charger_installation",
        "ground_source_geothermal_heat_pump",
        "heat_pump_hvac_retrofit",
        "ductless_mini_split_heat_pump",
        "heat_pump_water_heater",
        "central_air_conditioner_replacement",
        "furnace_ecm_motor_retrofit",
        "smart_thermostat_zoning_retrofit",
        "energy_star_clothes_washer",
        "energy_star_residential_dishwasher",
        "energy_star_residential_refrigerator_freezer",
        "electric_water_heater",
        "electric_resistance_zone_heater",
        "hvac_tuneup"
      ],
      "hardRequirements": [
        "Applicant must be an MVEC residential member-owner.",
        "Rebates apply to new equipment only.",
        "Most applications must be submitted within 90 days, with some heat-pump measures allowing a longer submission window.",
        "Many HVAC and water-heating measures require MVEC Energy Wise, off-peak, or control enrollment.",
        "EV charger rebate requires EV-24 enrollment."
      ],
      "blockers": [
        "Commercial dishwasher is a false positive; only residential ENERGY STAR dishwasher and appliance rebates are supported.",
        "High-efficiency refrigeration equipment must be limited to residential refrigerator or freezer appliances, not commercial refrigeration.",
        "ECM rebate is for furnace fan motors or pumps, not refrigeration EC motors.",
        "Heat pumps and central air generally require MVEC Energy Wise or off-peak enrollment and qualifying installation.",
        "Rebates are for MVEC residential member-owners and new equipment only."
      ],
      "programType": "Residential Rebate Program",
      "administrator": "Minnesota Valley Electric Cooperative",
      "applicationUrl": null,
      "websiteUrl": "https://www.mvec.net/savings/rebates/",
      "sourceUrlsChecked": [
        "https://www.mvec.net/savings/rebates/"
      ],
      "evidenceText": "MVEC's current residential rebate page covers ENERGY STAR appliances, heat pumps, water heaters, EV chargers, central air, furnace ECMs, HVAC tuneups, Wi-Fi thermostats, and electric heaters for residential member-owners.",
      "reasoningNotes": "Kept residential appliance and residential electric equipment categories only. Commercial kitchen and commercial refrigeration matches were blocked."
    },
    "existingSimpleRules": [
      {
        "id": "oir_e571f696fe57195b_v1",
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
        "confidence": "medium",
        "formula": "$200 per eligible unit",
        "evidenceText": "Ground Source Heat Pumps Rebate: $200/ton (5-ton limit) &#8211",
        "sourceUrlsChecked": [
          "https://www.mvec.net/rebates-3/"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2548",
    "opportunityName": "New Prague Utilities Commission - Residential Energy Efficiency Rebate Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2548/new-prague-utilities-commission-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://smmpa.com/members/new-prague",
    "applicationUrl": null,
    "administrator": "New Prague Utilities Commission",
    "programType": "Residential Energy Efficiency Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 10,
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
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "MN"
        ],
        "counties": [],
        "cities": [
          "New Prague"
        ],
        "utilityTerritories": [
          "New Prague Utilities Commission"
        ],
        "notes": "Eligible customer must receive electric service from New Prague Utilities Commission; SMMPA administers or hosts current member rebate forms."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customer"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "energy_star_residential_appliances",
        "energy_star_residential_dishwasher",
        "energy_star_residential_refrigerator_freezer",
        "heat_pump_water_heater",
        "ev_charger_installation",
        "level_2_ev_charger_installation",
        "central_air_conditioner_replacement",
        "heat_pump_hvac_retrofit",
        "hvac_tuneup",
        "ecm_circulator_pump",
        "furnace_fan_motor_ecm_retrofit",
        "pool_pump",
        "duct_sealing",
        "air_sealing_weatherization",
        "battery_powered_outdoor_equipment",
        "electric_bicycle"
      ],
      "hardRequirements": [
        "Applicant must be a New Prague Utilities Commission residential electric customer.",
        "Customer must use the applicable current SMMPA or utility rebate form.",
        "Eligibility is measure-specific and may depend on ENERGY STAR, qualified-product, or installation documentation."
      ],
      "blockers": [
        "Commercial dishwasher, commercial refrigeration, food-service equipment, motors, and lighting are business rebate categories, not this residential opportunity.",
        "Residential dishwasher, refrigerator, and freezer matches must be limited to ENERGY STAR residential products.",
        "Furnaces are not rebated as furnace replacements; current forms support furnace fan motor or ECM measures.",
        "LED lighting is not shown as a 2026 residential rebate form; it appears under business lighting or general resources.",
        "Google Drive PDFs were linked from SMMPA but not text-readable in the browser; categories are limited to visible official form titles."
      ],
      "programType": "Residential Energy Efficiency Rebate Program",
      "administrator": "New Prague Utilities Commission",
      "applicationUrl": null,
      "websiteUrl": "https://smmpa.com/members/new-prague",
      "sourceUrlsChecked": [
        "https://www.saveenergyinnewprague.com/",
        "https://smmpa.com/members/new-prague",
        "https://drive.google.com/file/d/1FIjjf8pjK3KR7BePl1V5l25zgiT_vEC2/view?usp=drive_link",
        "https://drive.google.com/file/d/1J5kf_b7Uu4gipphiXTsxLRPXBsAASDCA/view?usp=drive_link",
        "https://drive.google.com/file/d/1zvC_i0Pl_gmylAU8HOf2NiBrNwIM4ldG/view?usp=drive_link",
        "https://drive.google.com/file/d/1gLV4tt0iHYFBAfmQOifcqDWk3cDhYMUS/view?usp=drive_link",
        "https://drive.google.com/file/d/1sy55OUSK2FgQ9Vyt2p3RsqYFXAhKO8Lc/view?usp=drive_link"
      ],
      "evidenceText": "SMMPA's New Prague member page lists 2026 residential rebate forms for ENERGY STAR products, EV chargers, cooling equipment, cooling tune-ups, ECM circulator pumps, furnace fan motors, pool pumps, and aerosol sealing.",
      "reasoningNotes": "Kept residential categories visible from current SMMPA form titles. Business lighting, refrigeration, food service, and motor categories were blocked."
    },
    "existingSimpleRules": [
      {
        "id": "oir_a6f62eef77bc870f_v1",
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
        "formula": "$500 per connected ChargePoint Home Flex Level 2 charger",
        "evidenceText": "Bright Energy Solutions EV charger form lists ChargePoint Home Flex connected charger at $500.",
        "sourceUrlsChecked": [
          "https://smmpa.com/members/new-prague",
          "https://www.brightenergysolutions.com/find-a-rebate/"
        ],
        "reasoningNotes": "Matched EV charging and Level 2 terms. Confidence is medium because Bright Energy Solutions participation can vary by member utility.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2555",
    "opportunityName": "Princeton PUC - Residential Energy Efficiency Rebate Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2555/princeton-puc-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://smmpa.com/members/princeton",
    "applicationUrl": null,
    "administrator": "Princeton PUC",
    "programType": "Residential Energy Efficiency Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 10,
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
      }
    ],
    "repairedOpportunityData": {
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "MN"
        ],
        "counties": [],
        "cities": [
          "Princeton"
        ],
        "utilityTerritories": [
          "Princeton Public Utilities"
        ],
        "notes": "Eligible customer must receive electric service from Princeton Public Utilities; SMMPA hosts current member rebate forms."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customer"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "energy_star_residential_appliances",
        "energy_star_residential_dishwasher",
        "energy_star_residential_refrigerator_freezer",
        "heat_pump_water_heater",
        "ev_charger_installation",
        "level_2_ev_charger_installation",
        "central_air_conditioner_replacement",
        "heat_pump_hvac_retrofit",
        "hvac_tuneup",
        "ecm_circulator_pump",
        "furnace_fan_motor_ecm_retrofit",
        "pool_pump",
        "duct_sealing",
        "air_sealing_weatherization",
        "battery_powered_outdoor_equipment",
        "electric_bicycle"
      ],
      "hardRequirements": [
        "Applicant must be a Princeton Public Utilities residential electric customer.",
        "Customer must use the applicable current SMMPA or utility rebate form.",
        "Eligibility is measure-specific and may depend on ENERGY STAR, qualified-product, or installation documentation."
      ],
      "blockers": [
        "Commercial dishwasher and commercial refrigeration are false positives; the residential page only exposes ENERGY STAR product forms for household products.",
        "Furnace references should be limited to furnace fan motor or ECM rebates, not high-efficiency furnace replacement.",
        "Residential LED lighting is not shown as a 2026 residential rebate form; lighting forms are listed under business rebates.",
        "Ground-source or geothermal heat pump is not verified on the visible 2026 residential form titles and should not be matched unless the current cooling form confirms it.",
        "SMMPA Drive PDFs were linked but not text-readable in the browser; category repair is limited to visible official form titles."
      ],
      "programType": "Residential Energy Efficiency Rebate Program",
      "administrator": "Princeton PUC",
      "applicationUrl": null,
      "websiteUrl": "https://smmpa.com/members/princeton",
      "sourceUrlsChecked": [
        "https://smmpa.com/members/princeton"
      ],
      "evidenceText": "SMMPA's Princeton page lists 2026 residential forms for ENERGY STAR products and EV chargers plus cooling equipment, tune-ups, ECM circulator pumps, furnace fan motors, pool pumps, aerosol sealing, e-bikes, and battery outdoor equipment.",
      "reasoningNotes": "Kept residential categories visible from the current SMMPA page. Business lighting, refrigeration, food service, and motor forms were not treated as residential eligibility."
    },
    "existingSimpleRules": [
      {
        "id": "oir_1193932a2e3d7da3_v1",
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
        "formula": "$500 per connected ChargePoint Home Flex Level 2 charger",
        "evidenceText": "Bright Energy Solutions EV materials list $500 for a Wi-Fi-enabled ChargePoint Home Flex charger connected to local utility.",
        "sourceUrlsChecked": [
          "https://www.brightenergysolutions.com/electric-vehicles",
          "http://www.SaveEnergyInPrinceton.com"
        ],
        "reasoningNotes": "Matched Level 2 EV charging terms. Confidence is medium because municipal participation should be verified for Princeton.",
        "mapping": {
          "primarySavingsModelId": "ev_charging_site_load",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_3223d4f17d27ea0f_v1",
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
        "confidence": "medium",
        "formula": "$150 per other qualifying Level 2 charger",
        "evidenceText": "Bright Energy Solutions EV materials list $150 for a different qualifying Level 2 charger.",
        "sourceUrlsChecked": [
          "https://www.brightenergysolutions.com/electric-vehicles",
          "http://www.SaveEnergyInPrinceton.com"
        ],
        "reasoningNotes": "Returned separately from the ChargePoint-specific amount.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2582",
    "opportunityName": "Redwood Falls Public Utilities - Residential Energy Efficiency Rebate Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2582/redwood-falls-public-utilities-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://smmpa.com/members/redwood-falls",
    "applicationUrl": null,
    "administrator": "Redwood Falls Public Utilities",
    "programType": "Residential Energy Efficiency Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 10,
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
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "MN"
        ],
        "counties": [],
        "cities": [
          "Redwood Falls"
        ],
        "utilityTerritories": [
          "Redwood Falls Public Utilities"
        ],
        "notes": "Eligible customer must receive electric service from Redwood Falls Public Utilities; SMMPA hosts current member rebate forms."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customer"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "energy_star_residential_appliances",
        "energy_star_residential_dishwasher",
        "energy_star_residential_refrigerator_freezer",
        "heat_pump_water_heater",
        "ev_charger_installation",
        "level_2_ev_charger_installation",
        "central_air_conditioner_replacement",
        "heat_pump_hvac_retrofit",
        "hvac_tuneup",
        "ecm_circulator_pump",
        "furnace_fan_motor_ecm_retrofit",
        "pool_pump",
        "duct_sealing",
        "air_sealing_weatherization",
        "battery_powered_outdoor_equipment",
        "electric_bicycle"
      ],
      "hardRequirements": [
        "Applicant must be a Redwood Falls Public Utilities residential electric customer.",
        "Customer must use the applicable current SMMPA or utility rebate form.",
        "Eligibility is measure-specific and may depend on ENERGY STAR, qualified-product, or installation documentation."
      ],
      "blockers": [
        "Commercial dishwasher, commercial refrigeration, chillers, and LED lighting examples on the page relate to business or school rebates, not residential matching.",
        "Furnace category is limited to furnace fan motor or ECM, not furnace replacement.",
        "Ground-source or geothermal heat pump is not verified on the visible 2026 residential form titles and should not be matched unless the current cooling form confirms it.",
        "Residential LED lighting is not shown as a 2026 residential rebate form.",
        "SMMPA Drive PDFs were linked but not text-readable in the browser; category repair is limited to visible official form titles."
      ],
      "programType": "Residential Energy Efficiency Rebate Program",
      "administrator": "Redwood Falls Public Utilities",
      "applicationUrl": null,
      "websiteUrl": "https://smmpa.com/members/redwood-falls",
      "sourceUrlsChecked": [
        "https://smmpa.com/members/redwood-falls",
        "https://ci.redwood-falls.mn.us/public-utilities/energy-star-rebates/"
      ],
      "evidenceText": "SMMPA's Redwood Falls page lists 2026 residential forms for ENERGY STAR products, EV chargers, cooling equipment, tune-ups, ECM circulator pumps, furnace fan motors, pool pumps, aerosol sealing, e-bikes, and battery outdoor equipment.",
      "reasoningNotes": "Kept residential categories visible from the current SMMPA page. Business and school project examples were not generalized to the residential program."
    },
    "existingSimpleRules": [
      {
        "id": "oir_4c6d7eaa211039a4_v1",
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
        "formula": "$500 per connected ChargePoint Home Flex Level 2 charger",
        "evidenceText": "Bright Energy Solutions EV form lists ChargePoint Home Flex connected charger at $500.",
        "sourceUrlsChecked": [
          "https://www.brightenergysolutions.com/electric-vehicles/electric-vehicle-charging-program",
          "https://www.brightenergysolutions.com/find-a-rebate/"
        ],
        "reasoningNotes": "Matched residential EV charging terms. Utility-specific participation should be verified.",
        "mapping": {
          "primarySavingsModelId": "fleet_fuel_replacement",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_f0e22bdb19f5cc6d_v1",
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
        "confidence": "medium",
        "formula": "$150 per other qualifying Level 2 charger",
        "evidenceText": "Bright Energy Solutions EV form lists other qualifying Level 2 chargers at $150.",
        "sourceUrlsChecked": [
          "https://www.brightenergysolutions.com/electric-vehicles/electric-vehicle-charging-program",
          "https://www.brightenergysolutions.com/find-a-rebate/"
        ],
        "reasoningNotes": "Returned separately from the connected ChargePoint amount.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2586",
    "opportunityName": "Saint Peter Municipal Utilities - Residential Energy Efficiency Rebate Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2586/saint-peter-municipal-utilities-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://smmpa.com/members/saint-peter",
    "applicationUrl": null,
    "administrator": "Saint Peter Municipal Utilities",
    "programType": "Residential Energy Efficiency Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 10,
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
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "MN"
        ],
        "counties": [],
        "cities": [
          "Saint Peter"
        ],
        "utilityTerritories": [
          "Saint Peter Municipal Utilities"
        ],
        "notes": "Eligible customer must receive electric service from Saint Peter Municipal Utilities; SMMPA hosts current member rebate forms."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customer"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "energy_star_residential_appliances",
        "energy_star_residential_dishwasher",
        "energy_star_residential_refrigerator_freezer",
        "heat_pump_water_heater",
        "ev_charger_installation",
        "level_2_ev_charger_installation",
        "central_air_conditioner_replacement",
        "heat_pump_hvac_retrofit",
        "hvac_tuneup",
        "ecm_circulator_pump",
        "furnace_fan_motor_ecm_retrofit",
        "pool_pump",
        "duct_sealing",
        "air_sealing_weatherization",
        "battery_powered_outdoor_equipment",
        "electric_bicycle"
      ],
      "hardRequirements": [
        "Applicant must be a Saint Peter Municipal Utilities residential electric customer.",
        "Customer must use the applicable current SMMPA or utility rebate form.",
        "Eligibility is measure-specific and may depend on ENERGY STAR, qualified-product, or installation documentation."
      ],
      "blockers": [
        "Commercial dishwasher, food-service equipment, refrigeration, motors, and business lighting are separate business rebate forms, not this residential opportunity.",
        "Furnace references should be limited to furnace fan motor or ECM rebates, not high-efficiency furnace replacement.",
        "Ground-source or geothermal heat pump is not verified on visible 2026 residential form titles and should not be matched unless current cooling form confirms it.",
        "Residential LED lighting is not shown in the SMMPA 2026 residential form list; city rebate references may be separate or retail offers.",
        "SMMPA Drive PDFs were linked but not text-readable in the browser; category repair is limited to visible official form titles."
      ],
      "programType": "Residential Energy Efficiency Rebate Program",
      "administrator": "Saint Peter Municipal Utilities",
      "applicationUrl": null,
      "websiteUrl": "https://smmpa.com/members/saint-peter",
      "sourceUrlsChecked": [
        "https://smmpa.com/members/saint-peter",
        "https://www.saintpetermn.gov/216/Saint-Peter-Utility-Customer-Rebates"
      ],
      "evidenceText": "SMMPA's Saint Peter page lists 2026 residential forms for ENERGY STAR products, EV chargers, cooling equipment, tune-ups, ECM circulator pumps, furnace fan motors, pool pumps, aerosol sealing, e-bikes, and battery outdoor equipment.",
      "reasoningNotes": "Kept residential categories visible from the current SMMPA page. Business form categories and broad LED lighting were blocked for this residential opportunity."
    },
    "existingSimpleRules": [
      {
        "id": "oir_1d144e1a4d8cb77b_v1",
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
        "formula": "$500 per connected ChargePoint Home Flex Level 2 charger",
        "evidenceText": "Bright Energy Solutions says connecting a Wi-Fi-enabled ChargePoint Home Flex charger to local utility earns a $500 rebate.",
        "sourceUrlsChecked": [
          "https://www.brightenergysolutions.com/electric-vehicles",
          "http://www.SaveEnergyInSaintPeter.com"
        ],
        "reasoningNotes": "Matched Level 2 EV charging terms for a Bright Energy Solutions municipal utility.",
        "mapping": {
          "primarySavingsModelId": "ev_charging_site_load",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_8eadbab0be1b5623_v1",
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
        "confidence": "medium",
        "formula": "$150 per other qualifying Level 2 charger",
        "evidenceText": "Bright Energy Solutions says other qualifying Level 2 chargers earn a $150 rebate.",
        "sourceUrlsChecked": [
          "https://www.brightenergysolutions.com/electric-vehicles",
          "http://www.SaveEnergyInSaintPeter.com"
        ],
        "reasoningNotes": "Returned separately from the ChargePoint-specific amount.",
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
