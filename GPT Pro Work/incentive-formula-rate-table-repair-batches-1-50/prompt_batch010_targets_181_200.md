You are helping RetroFi repair incentive formulas, rate tables, grant estimates, tax credits, and non-cash workflow value rules.

Return strict JSON only. Do not include markdown, code fences, commentary, or citations outside JSON fields.

Batch: 10
Targets in this prompt: 181-200 of 984
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
  "batchNumber": 10,
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
  "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:1715"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3592",
    "opportunityName": "Verdigris Valley Electric Cooperative - Residential Energy Efficiency Rebate Program",
    "state": "OK",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3592/verdigris-valley-electric-cooperative-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.vvec.com/rebates",
    "applicationUrl": null,
    "administrator": "Verdigris Valley Electric Cooperative",
    "programType": "Rebate",
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
          "OK"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Verdigris Valley Electric Cooperative service territory"
        ],
        "notes": "Eligibility is limited to VVEC members and current official rebate forms."
      },
      "eligibleApplicantTypes": [
        "residential_electric_cooperative_member"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_water_heater",
        "smart_thermostat_zoning_retrofit",
        "ground_source_geothermal_heat_pump",
        "heat_pump_hvac_retrofit",
        "ductless_mini_split_heat_pump",
        "level_2_ev_charger_installation"
      ],
      "hardRequirements": [
        "Applicant must be a VVEC member for the qualifying residential rebate.",
        "Heat pump water heaters must be ENERGY STAR certified and cannot be tankless.",
        "Mini-split and ducted heat pump measures must meet listed efficiency, installation, and backup-heat requirements.",
        "Smart thermostats must be ENERGY STAR certified and Wi-Fi enabled.",
        "Used or refurbished equipment is not eligible, and forms must meet submission deadlines."
      ],
      "blockers": [
        "Window replacement is not listed on the current VVEC rebate page and should be removed.",
        "Broad air-conditioner or generic HVAC replacement should not match unless the equipment is an eligible heat pump or listed measure.",
        "EV charging should be matched only to the separate eligible charging station form and not generalized to all EV-related work."
      ],
      "programType": "Rebate",
      "administrator": "Verdigris Valley Electric Cooperative",
      "applicationUrl": null,
      "websiteUrl": "https://www.vvec.com/rebates",
      "sourceUrlsChecked": [
        "https://www.vvec.com/rebates",
        "https://www.vvec.com/sites/default/files/Rebates/JULY_25_Electric%20Vehicle%20Charging%20Station%20Rebate.pdf"
      ],
      "evidenceText": "VVEC's]( rebate page lists HPWHs, smart thermostats, ground-source heat pumps, ductless mini-splits, and air-source heat pump measures; a current EV charging form supports charging-station rebates.",
      "reasoningNotes": "Remove windows and non-heat-pump HVAC. Keep EV charging only as a specific charging-station measure."
    },
    "existingSimpleRules": [
      {
        "id": "oir_95a90e6cfea6a7b7_v1",
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
          "maxAmountCents": 25000
        },
        "confidence": "high",
        "formula": "50% of Level 2 EV charger cost, capped at $250",
        "evidenceText": "VVEC EV charging station rebate form lists 50% of charger cost up to $250.",
        "sourceUrlsChecked": [
          "https://vvec.com/rebates/",
          "https://vvec.com/wp-content/uploads/EVChargingStationRebateForm.pdf"
        ],
        "reasoningNotes": "Matched Level 2 EV charger terms. Basis is charger equipment cost.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22567",
    "opportunityName": "Lane Electric - Residential Energy Efficiency Rebate Program",
    "state": "OR",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22567/lane-electric-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://laneelectric.com/programs-services/energy-efficiency/",
    "applicationUrl": "https://laneelectric.chooseev.com/promos/",
    "administrator": "Lane Electric Cooperative",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
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
          "Lane Electric Cooperative service territory"
        ],
        "notes": "Applies to Lane Electric Cooperative members; core energy-efficiency pages were partly inaccessible, while Lane-branded EV rebate content was readable."
      },
      "eligibleApplicantTypes": [
        "Lane Electric Cooperative members",
        "residential members installing eligible Level 2 EV charging equipment"
      ],
      "eligibleSectors": [
        "residential",
        "transportation"
      ],
      "eligibleRetrofitCategories": [
        "ev_charging_level_2_residential"
      ],
      "hardRequirements": [
        "Applicant must be a Lane Electric Cooperative member.",
        "Residential charger rebate applies to eligible Level 2 charging equipment shown through Lane Electric's EV rebate materials.",
        "Application requires documentation such as installation photos and the current Lane Electric rebate form or submission process.",
        "Eligibility and rebate availability are subject to current Lane Electric program funding and requirements."
      ],
      "blockers": [
        "The core Lane Electric energy-efficiency pages for heat pumps, ductless heat pumps, heat pump water heaters and weatherization returned inaccessible or blocked responses in the checked environment.",
        "Matched heat pump, mini split, ductless, heat pump water heater, insulation and weatherization categories were not retained because current official measure details could not be verified from readable official pages.",
        "EV charging appears to be a separate transportation/charger rebate path and should not be merged into building energy-efficiency categories.",
        "This residential program should not be mapped to commercial EVSE or commercial building retrofits."
      ],
      "programType": "Rebate Program",
      "administrator": "Lane Electric Cooperative",
      "applicationUrl": "https://laneelectric.chooseev.com/promos/",
      "websiteUrl": "https://laneelectric.com/programs-services/energy-efficiency/",
      "sourceUrlsChecked": [
        "https://laneelectric.com/programs-services/energy-efficiency/",
        "https://www.laneelectric.com/energy-efficiency/",
        "https://www.laneelectric.com/energy-efficiency/energy-saving-programs/",
        "https://www.laneelectric.com/energy-efficiency/heat-pump-program/",
        "https://www.laneelectric.com/energy-efficiency/heat-pump-water-heaters/",
        "https://laneelectric.chooseev.com/promos/",
        "https://laneelectric.chooseev.com/recommendations/print/5406/?c=laneelectric",
        "https://programs.dsireusa.org/system/program/detail/22567/lane-electric-residential-energy-efficiency-rebate-program"
      ],
      "evidenceText": "Lane-branded ChooseEV rebate materials identify a residential Level 2 charger rebate for Lane Electric members and require member and installation documentation. The core Lane Electric building-efficiency pages checked were inaccessible or blocked, so building-measure categories could not be verified.",
      "reasoningNotes": "Kept only the officially readable Lane Electric EV charging category and blocked DSIRE/snippet-only home-efficiency matches."
    },
    "existingSimpleRules": [
      {
        "id": "oir_c7c2e37e9775d663_v1",
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
        "formula": "$500 per eligible Level 2 EV charger",
        "evidenceText": "Lane Electric EV incentive materials list a $500 residential Level 2 charger rebate.",
        "sourceUrlsChecked": [
          "https://laneelectric.com/programs-services/current-programs/",
          "https://ev.chooseev.com/lane-electric/rebates/"
        ],
        "reasoningNotes": "Matched EV charger and Level 2 terms. Confidence is medium because application eligibility controls availability.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:21861",
    "opportunityName": "Agricultural Energy Program",
    "state": "RI",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/21861/agricultural-energy-program",
    "websiteUrl": "https://energy.ri.gov/energy-efficiency/farm-energy-programs",
    "applicationUrl": null,
    "administrator": "Rhode Island Office of Energy Resources",
    "programType": "Grant Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 7,
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
        "retrofitTypeId": "biomass_biogas_energy_system",
        "displayName": "Biomass / biogas energy system",
        "parentCategory": "solar_renewable_electricity",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "biomass"
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
          "RI"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [],
        "notes": "Program is statewide for eligible Rhode Island agricultural operations with a physical location and proposed investment in Rhode Island."
      },
      "eligibleApplicantTypes": [
        "agricultural_producer",
        "farm_owner",
        "agribusiness",
        "nonprofit_agricultural_operation"
      ],
      "eligibleSectors": [
        "agricultural",
        "commercial"
      ],
      "eligibleRetrofitCategories": [
        "solar_pv_system",
        "small_scale_wind",
        "biomass_energy_system",
        "battery_storage_system",
        "insulation_upgrade",
        "led_lighting_retrofit",
        "high_efficiency_hvac_replacement",
        "heat_pump_hvac_retrofit",
        "automatic_temperature_controls",
        "variable_speed_motor_drive_pump",
        "solar_water_heating_system",
        "energy_audit"
      ],
      "hardRequirements": [
        "Applicant must be an eligible Rhode Island agricultural operation with a qualifying physical location and agricultural activity.",
        "Applicant must generally have at least the required agricultural income unless a nonprofit exemption applies.",
        "Grant requires a 10 percent cost share and a received or committed agricultural energy audit unless waived.",
        "Projects must use new approved equipment, comply with permits and codes, and be completed within the required contract period.",
        "Renewable projects must meet interconnection or net-metering requirements and cannot be paired with prohibited renewable tariff participation."
      ],
      "blockers": [
        "The grant does not reimburse energy audits or feasibility studies as project costs; audits are a requirement or separate free technical-assistance component.",
        "Completed or already interconnected projects are ineligible.",
        "Do not match non-farm residential or ordinary commercial buildings to this agricultural program.",
        "Renewable energy projects using the prohibited renewable energy growth tariff pathway are not eligible under the grant guidance.",
        "Do not generalize biomass, storage, or solar thermal to non-agricultural energy projects."
      ],
      "programType": "Grant Program",
      "administrator": "Rhode Island Office of Energy Resources",
      "applicationUrl": null,
      "websiteUrl": "https://energy.ri.gov/energy-efficiency/farm-energy-programs",
      "sourceUrlsChecked": [
        "https://energy.ri.gov/energy-efficiency/farm-energy-programs",
        "https://energy.ri.gov/sites/g/files/xkgbur741/files/2026-06/Farm%20Energy%20Program%20Guidance%20Doc%20V4.pdf",
        "https://energy.ri.gov/energy-efficiency/farm-energy-programs/agricultural-energy-audits"
      ],
      "evidenceText": "RI]( OER's June 2026 farm page says rolling Agricultural Energy Grant applications are due November 6, 2026. Guidance lists PV, wind, biomass, storage, insulation, LED lighting, HVAC and heat pumps, controls, VSD motors, drives, pumps, and solar thermal.",
      "reasoningNotes": "The opportunity is active and agricultural-only. Energy audits should be represented as a required or related free service, not as a reimbursable grant-funded retrofit."
    },
    "existingSimpleRules": [
      {
        "id": "oir_66ff9fab7989c3c7_v1",
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
          "maxAmountCents": 2000000
        },
        "confidence": "medium",
        "formula": "up to $20,000 of eligible project cost",
        "evidenceText": "Funding for the Agricultural Energy Program is made possible through Regional Greenhouse Gas Initiative (RGGI) auction proceeds, with a maximum award amount of $20,000 per project to support the agricultural sector's clean energy transformation",
        "sourceUrlsChecked": [
          "https://energy.ri.gov/energy-efficiency/farm-energy-programs"
        ],
        "reasoningNotes": "",
        "mapping": {
          "primarySavingsModelId": "grant_funding",
          "incentiveValueMethod": "grant_amount",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5703",
    "opportunityName": "TVA - Residential Energy Efficiency Rebate Program",
    "state": "TN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5703/tva-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://energyright.com/residential/rebates/",
    "applicationUrl": null,
    "administrator": "TVA EnergyRight",
    "programType": "Rebate",
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
          "TN",
          "AL",
          "MS",
          "KY",
          "GA",
          "NC",
          "VA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "TVA local power company service territories"
        ],
        "notes": "Actual eligibility depends on the participating local power company and EnergyRight program availability."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customer",
        "homeowner"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "air_sealing_weatherization",
        "insulation_upgrade",
        "duct_sealing_and_insulation",
        "hvac_tune_up",
        "ground_source_geothermal_heat_pump",
        "ductless_mini_split_heat_pump",
        "heat_pump_hvac_retrofit",
        "high_efficiency_central_air_conditioner",
        "smart_thermostat_demand_response"
      ],
      "hardRequirements": [
        "Customer must be served by a participating TVA local power company.",
        "Many rebates require a Quality Contractor Network contractor.",
        "Equipment and installation must meet TVA EnergyRight standards.",
        "Financing availability varies by service area and is separate from equipment rebates."
      ],
      "blockers": [
        "Window replacement is not supported by the current residential rebates page; window references are related to sealing gaps during air sealing.",
        "Do not treat financing as a rebate measure.",
        "Do not infer commercial or industrial measures from this residential program."
      ],
      "programType": "Rebate",
      "administrator": "TVA EnergyRight",
      "applicationUrl": null,
      "websiteUrl": "https://energyright.com/residential/rebates/",
      "sourceUrlsChecked": [
        "https://energyright.com/residential/rebates/"
      ],
      "evidenceText": "TVA]( EnergyRight lists residential rebates for air sealing and insulation, HVAC tune-up and duct sealing, central AC, geothermal heat pumps, mini splits, heat pumps, and smart thermostat rewards.",
      "reasoningNotes": "The official page supports HVAC, duct, insulation, and air-sealing measures; remove window replacement."
    },
    "existingSimpleRules": [
      {
        "id": "oir_072d3e4e9649ce95_v1",
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
        "reasoningNotes": "Matched heat pump term. Returned higher published efficiency tier.",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_1e596352f9971802_v1",
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
        "reasoningNotes": "Matched duct sealing and insulation terms. Use as a distinct duct measure.",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_c18b64cdd3a0ab0e_v1",
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
        "reasoningNotes": "Matched geothermal heat pump term. Use one unit as one qualifying system.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2039",
    "opportunityName": "Denton Municipal Electric - Residential GreenSense Energy Efficiency Rebate Program",
    "state": "TX",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2039/denton-municipal-electric-residential-greensense-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.cityofdenton.com/1192/Sustainability-Incentives",
    "applicationUrl": "https://www.cityofdenton.com/1192/Sustainability-Incentives",
    "administrator": "Denton Municipal Electric",
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
          "air sealing",
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
        "retrofitTypeId": "rooftop_solar_pv",
        "displayName": "Rooftop solar PV",
        "parentCategory": "solar_renewable_electricity",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "solar pv",
          "photovoltaic"
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
        "counties": [
          "Denton County"
        ],
        "cities": [
          "Denton"
        ],
        "utilityTerritories": [
          "Denton Municipal Electric service territory"
        ],
        "notes": "GreenSense rebates are available to eligible Denton Municipal Electric customers."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "homeowner",
        "renter_with_required_property_approval"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "central_air_conditioner_replacement",
        "heat_pump_hvac_retrofit",
        "ductless_heat_pump",
        "hvac_tune_up",
        "smart_thermostat_zoning_retrofit",
        "weatherization_materials",
        "radiant_barrier",
        "insulation_upgrade",
        "air_duct_improvement",
        "solar_screen_shading_retrofit",
        "window_replacement",
        "solar_water_heating_system",
        "heat_pump_water_heater"
      ],
      "hardRequirements": [
        "Must be a Denton Municipal Electric customer.",
        "Application must be submitted within 90 days after installation or purchase.",
        "Measures marked by the program require permit and inspection where applicable.",
        "Rebates are subject to available GreenSense funds and current program limits."
      ],
      "blockers": [
        "Do not match rooftop_solar_pv; the current GreenSense table does not list photovoltaic solar rebates.",
        "Do not match EV, e-bike, lawn equipment or WaterWise incentives to this GreenSense energy-efficiency record because those are separate programs.",
        "Do not overgeneralize weatherization materials into all air sealing unless the material qualifies under current program rules."
      ],
      "programType": "Rebate Program",
      "administrator": "Denton Municipal Electric",
      "applicationUrl": "https://www.cityofdenton.com/1192/Sustainability-Incentives",
      "websiteUrl": "https://www.cityofdenton.com/1192/Sustainability-Incentives",
      "sourceUrlsChecked": [
        "https://www.cityofdenton.com/1192/Sustainability-Incentives"
      ],
      "evidenceText": "Denton’s current GreenSense page lists rebates for AC, heat pumps, mini-splits, thermostats, weatherization materials, radiant barrier, attic insulation, air ducts, solar screens, windows, solar hot water and HPWH.",
      "reasoningNotes": "Removed solar PV because the current official GreenSense list supports solar hot water but not photovoltaic rebates."
    },
    "existingSimpleRules": [
      {
        "id": "oir_18ce6c62b246ee01_v1",
        "incentiveType": "percent_of_basis_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "percent_of_basis",
          "percent": 0.3
        },
        "basisPolicy": {
          "basis": "equipment_plus_labor",
          "applicationOrder": 10
        },
        "cap": {
          "maxAmountCents": 30000
        },
        "confidence": "high",
        "formula": "30% of solar hot water heater cost, capped at $300",
        "evidenceText": "Denton sustainability incentives list Solar Hot Water Heater at 30% up to $300.",
        "sourceUrlsChecked": [
          "https://www.cityofdenton.com/1192/Sustainability-Incentives"
        ],
        "reasoningNotes": "Returned separately because the source gives a solar-water-heating value.",
        "mapping": {
          "primarySavingsModelId": "fleet_fuel_replacement",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_e59667e2335a1e46_v1",
        "incentiveType": "percent_of_basis_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "percent_of_basis",
          "percent": 0.3
        },
        "basisPolicy": {
          "basis": "equipment_plus_labor",
          "applicationOrder": 10
        },
        "cap": {
          "maxAmountCents": 30000
        },
        "confidence": "high",
        "formula": "30% of heat pump water heater cost, capped at $300",
        "evidenceText": "Denton sustainability incentives list Heat Pump Water Heater at 30% up to $300.",
        "sourceUrlsChecked": [
          "https://www.cityofdenton.com/1192/Sustainability-Incentives"
        ],
        "reasoningNotes": "Matched heat pump water heater term. Use eligible installed project cost where permitted.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2688",
    "opportunityName": "Dominion Energy - Residential Energy Efficiency Rebate Programs",
    "state": "UT",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2688/dominion-energy-residential-energy-efficiency-rebate-programs",
    "websiteUrl": "https://www.enbridgegas.com/utwyid/save-money/thermwise",
    "applicationUrl": "https://questar.dsmcentral.com/",
    "administrator": "Enbridge Gas ThermWise",
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
          "Enbridge Gas Utah natural gas service territory",
          "former Dominion Energy Utah natural gas service territory"
        ],
        "notes": "ThermWise rebates apply to eligible Utah natural gas customers in the Enbridge Gas service territory."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "homeowner",
        "multifamily_property_owner",
        "business_customer_where_applicable"
      ],
      "eligibleSectors": [
        "residential",
        "multifamily_residential",
        "limited_commercial_where_applicable"
      ],
      "eligibleRetrofitCategories": [
        "smart_thermostat_zoning_retrofit",
        "high_efficiency_furnace_retrofit",
        "dual_fuel_heat_pump_system",
        "high_efficiency_boiler_retrofit",
        "boiler_reset_control",
        "energy_recovery_ventilation_retrofit",
        "direct_vent_gas_fireplace",
        "combined_space_water_heating_system",
        "high_efficiency_gas_water_heater",
        "solar_assisted_gas_water_heating",
        "smart_water_heater_controller",
        "window_replacement",
        "insulation_upgrade",
        "duct_sealing_and_insulation",
        "air_sealing_weatherization",
        "continuous_exterior_insulation",
        "pipe_insulation"
      ],
      "hardRequirements": [
        "Must be an eligible Enbridge Gas Utah ThermWise natural gas customer.",
        "Appliance rebate requests must be submitted within the current program deadline after purchase or installation.",
        "Weatherization measures must meet ThermWise standards and authorized contractor or prequalification rules where required.",
        "Energy recovery ventilation requires qualifying gas space heating.",
        "Dual-fuel heat pump systems must include qualifying ducted heat pump equipment with gas backup."
      ],
      "blockers": [
        "Do not match standalone electric heat pump HVAC; supported heat-pump category is dual-fuel with natural gas backup.",
        "Do not match generic high_efficiency_hvac_replacement beyond listed gas equipment and dual-fuel systems.",
        "Do not match customers outside the eligible natural gas service territory.",
        "Do not match measures requiring authorized contractors or prequalification unless those requirements are met."
      ],
      "programType": "Rebate Program",
      "administrator": "Enbridge Gas ThermWise",
      "applicationUrl": "https://questar.dsmcentral.com/",
      "websiteUrl": "https://www.enbridgegas.com/utwyid/save-money/thermwise",
      "sourceUrlsChecked": [
        "https://www.thermwise.com/",
        "https://www.enbridgegas.com/utwyid/save-money/thermwise",
        "https://www.enbridgegas.com/utwyid/save-money/thermwise/appliance-rebates",
        "https://www.enbridgegas.com/utwyid/save-money/thermwise/weatherization-rebates",
        "https://questar.dsmcentral.com/"
      ],
      "evidenceText": "ThermWise pages list smart thermostats, gas furnaces, dual-fuel heat pump systems, gas boilers, boiler reset, ERV, gas water heating and weatherization rebates for Utah gas customers.",
      "reasoningNotes": "Updated administrator to current Enbridge Gas ThermWise branding while preserving the former Dominion/Questar service context."
    },
    "existingSimpleRules": [
      {
        "id": "oir_40069ed836b2ac04_v1",
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
        "formula": "$100 per after-market residential boiler reset control",
        "evidenceText": "ThermWise appliance rebates list Residential Gas Boiler Reset Control at $100.",
        "sourceUrlsChecked": [
          "https://www.enbridgegas.com/utwyid/save-money/thermwise/appliance-rebates"
        ],
        "reasoningNotes": "Matched boiler reset term. Applies to eligible after-market boiler reset controls.",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_59e26394780af82a_v1",
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
        "reasoningNotes": "Matched smart thermostat term. Tier 2 is the higher-feature thermostat with occupancy sensor technology.",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_7c27c025d3a75588_v1",
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
        "reasoningNotes": "Matched energy recovery ventilation. Separate relevant candidate from the same measure table.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2364",
    "opportunityName": "Rocky Mountain Power - wattsmart Residential Efficiency Program",
    "state": "UT",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2364/rocky-mountain-power-wattsmart-residential-efficiency-program",
    "websiteUrl": "https://wattsmarthomes.com/",
    "applicationUrl": "https://wattsmarthomes.capturesportal.com/",
    "administrator": "Rocky Mountain Power",
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
          "Rocky Mountain Power Utah residential service territory"
        ],
        "notes": "Residential Utah customers on approved Rocky Mountain Power residential rate schedules."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "homeowner",
        "landlord_for_eligible_rental_property"
      ],
      "eligibleSectors": [
        "residential",
        "small_multifamily_up_to_three_units_per_foundation"
      ],
      "eligibleRetrofitCategories": [
        "air_sealing_weatherization",
        "duct_sealing_and_insulation",
        "advanced_duct_sealing",
        "insulation_upgrade",
        "heat_pump_hvac_retrofit",
        "ductless_mini_split_heat_pump",
        "dual_fuel_heat_pump",
        "heat_pump_water_heater",
        "window_replacement",
        "low_e_storm_window",
        "window_heat_pump",
        "all_in_one_heat_pump_washer_dryer"
      ],
      "hardRequirements": [
        "Home must be in Rocky Mountain Power Utah residential service territory on an approved residential rate schedule.",
        "Existing-home and dwelling-type restrictions apply by measure.",
        "Applications must be submitted within the applicable program deadline after installation.",
        "Air-source heat pumps must meet AHRI and program service-area requirements.",
        "Heat pump water heater and weatherization measures must meet current Wattsmart Homes specifications."
      ],
      "blockers": [
        "Current Wattsmart Homes Utah pages do not list geothermal or ground-source heat pump rebates.",
        "Fossil-fuel space-heating conversions to air-source heat pumps generally do not qualify.",
        "Manufactured homes and larger multifamily properties are excluded from some measures.",
        "Do not match business or commercial equipment to this residential program."
      ],
      "programType": "Rebate Program",
      "administrator": "Rocky Mountain Power",
      "applicationUrl": "https://wattsmarthomes.capturesportal.com/",
      "websiteUrl": "https://wattsmarthomes.com/",
      "sourceUrlsChecked": [
        "https://wattsmarthomes.com/",
        "https://wattsmarthomes.com/rebate-categories/heating-and-cooling/",
        "https://wattsmarthomes.com/rebate-categories/weatherization/",
        "https://wattsmarthomes.com/rebates/air-source-heat-pumps-ut/",
        "https://wattsmarthomes.com/rebates/heat-pump-water-heaters-ut/",
        "https://wattsmarthomes.com/rebates/windows-ut/",
        "https://wattsmarthomes.com/utah-program-changes-february-2026/"
      ],
      "evidenceText": "Wattsmart Homes current Utah pages verify residential rebates for air-source heat pumps, heat pump water heaters, weatherization and windows. 2026 updates add all-in-one washer/dryers, window heat pumps, Low-E storm windows, advanced duct sealing and ductless heat pump changes; geothermal is not listed.",
      "reasoningNotes": "Remove geothermal as unsupported by current official pages. Keep the target weatherization, duct, heat pump, heat pump water heater, insulation and high-efficiency HVAC categories with current residential limitations."
    },
    "existingSimpleRules": [
      {
        "id": "oir_45d4531441c2f246_v1",
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
        "evidenceText": "Rocky Mountain Power says Wattsmart Homes offers rebates up to $1,800 for air-source heat pumps.",
        "sourceUrlsChecked": [
          "https://www.rockymountainpower.net/savings-energy-choices/home/green-housing.html",
          "https://wattsmarthomes.com/"
        ],
        "reasoningNotes": "Matched heat pump term. Amount depends on equipment and eligibility tier.",
        "mapping": {
          "primarySavingsModelId": "refrigeration_electric_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_c20c1d3443880976_v1",
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
        "confidence": "medium",
        "formula": "Up to $550 per heat pump water heater",
        "evidenceText": "Rocky Mountain Power says Wattsmart Homes offers rebates up to $550 for heat pump water heaters.",
        "sourceUrlsChecked": [
          "https://www.rockymountainpower.net/savings-energy-choices/home/green-housing.html",
          "https://wattsmarthomes.com/rebates/heat-pump-water-heaters-ut/"
        ],
        "reasoningNotes": "Matched heat pump water heater term. Final amount depends on product and replacement path.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4474",
    "opportunityName": "Washington Gas - Residential Energy Efficiency Rebate Program",
    "state": "VA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4474/washington-gas-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://wgsmartsavings.com/programs-rebates/home/va",
    "applicationUrl": null,
    "administrator": "Washington Gas",
    "programType": "Residential Natural Gas Efficiency Rebate Program",
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
          "VA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Washington Gas Virginia residential natural gas service territory"
        ],
        "notes": "Limited to eligible Washington Gas residential customers in Virginia."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "natural_gas_customer"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_furnace_retrofit",
        "high_efficiency_boiler_retrofit",
        "dual_fuel_heat_pump_with_gas_furnace",
        "smart_thermostat_zoning_retrofit",
        "window_replacement",
        "storm_window_retrofit",
        "cellular_window_treatment",
        "high_efficiency_gas_water_heater"
      ],
      "hardRequirements": [
        "Applicant must be an eligible Washington Gas residential customer in Virginia.",
        "Heating equipment must meet listed AFUE or dual-fuel heat pump requirements.",
        "Dual-fuel heat pump rebate requires qualifying gas furnace conditions and replacement of central air conditioning with a qualifying heat pump system.",
        "Smart thermostat rebate has minimum cost and quantity limits.",
        "Window and window treatment rebates require qualifying product standards."
      ],
      "blockers": [
        "Standalone electric heat pump replacement should not be matched unless it is the listed dual-fuel heat pump configuration.",
        "Insulation is not supported by the current Virginia residential rebate pages.",
        "Commercial measures are not eligible under this residential program.",
        "General weatherization should not be inferred from the home conservation kit or window treatment offers."
      ],
      "programType": "Residential Natural Gas Efficiency Rebate Program",
      "administrator": "Washington Gas",
      "applicationUrl": null,
      "websiteUrl": "https://wgsmartsavings.com/programs-rebates/home/va",
      "sourceUrlsChecked": [
        "https://wgsmartsavings.com/programs-rebates/home/va",
        "https://wgsmartsavings.com/programs-rebates/va/home-heating",
        "https://wgsmartsavings.com/programs-rebates/va/windows-and-window-treatments",
        "https://wgsmartsavings.com/programs-rebates/va/smart-thermostats",
        "https://wgsmartsavings.com/programs-rebates/va/water-heaters"
      ],
      "evidenceText": "Washington Gas Virginia pages list home heating, dual-fuel heat pump, water heater, smart thermostat, window, storm window, and cellular shade rebates for residential customers.",
      "reasoningNotes": "The original heat pump match is only valid as a dual-fuel gas furnace and heat pump measure. The insulation match is not supported by current official Virginia pages."
    },
    "existingSimpleRules": [
      {
        "id": "oir_449829d4d202859c_v1",
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
        "confidence": "high",
        "formula": "$700 per Tier 2 residential furnace at 97%+ AFUE",
        "evidenceText": "Washington Gas Virginia home heating page lists Furnace Tier 2, 97%+ AFUE, at $700.",
        "sourceUrlsChecked": [
          "https://wgsmartsavings.com/programs-rebates/va/home-heating",
          "https://wgsmartsavings.com/programs-rebates/home/va"
        ],
        "reasoningNotes": "Matched furnace term. Returned the higher furnace tier as a candidate.",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_4b64bc562195e57d_v1",
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
        "formula": "$100 per ENERGY STAR certified smart thermostat",
        "evidenceText": "Washington Gas Virginia programs page says save $100 on an ENERGY STAR certified smart thermostat.",
        "sourceUrlsChecked": [
          "https://wgsmartsavings.com/programs-rebates/home/va"
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
        "id": "oir_889b0324c88006e3_v1",
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
        "formula": "$750 per 95%+ AFUE boiler",
        "evidenceText": "Washington Gas Virginia home heating page lists Boiler, 95%+ AFUE, at $750.",
        "sourceUrlsChecked": [
          "https://wgsmartsavings.com/programs-rebates/va/home-heating",
          "https://wgsmartsavings.com/programs-rebates/home/va"
        ],
        "reasoningNotes": "Matched boiler term. Returned separately from furnace candidate.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3901",
    "opportunityName": "Cascade Natural Gas - Commercial Efficiency Rebate Program",
    "state": "WA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3901/cascade-natural-gas-commercial-efficiency-rebate-program",
    "websiteUrl": "https://www.cngc.com/energy-efficiency/commercial-rebate-offerings/",
    "applicationUrl": null,
    "administrator": "Cascade Natural Gas",
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
          "boiler",
          "condensing boiler"
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
        "retrofitTypeId": "water_heating_controls_recirculation",
        "displayName": "Water-heating controls / recirculation controls",
        "parentCategory": "water_heating",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "recirculation controls"
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
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Cascade Natural Gas Washington commercial and industrial service territory"
        ],
        "notes": "Limited to eligible Washington CNGC commercial and industrial gas accounts on specified rate schedules."
      },
      "eligibleApplicantTypes": [
        "commercial_gas_customer",
        "industrial_gas_customer",
        "business_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_boiler_retrofit",
        "boiler_steam_trap",
        "high_efficiency_furnace_retrofit",
        "hvac_unit_heater",
        "radiant_heating",
        "demand_control_ventilation",
        "commercial_window_replacement",
        "attic_insulation",
        "wall_insulation",
        "hot_fluid_pipe_insulation",
        "tankless_gas_water_heater",
        "condensing_gas_water_heater",
        "water_heating_controls_recirculation",
        "ozone_laundry",
        "high_efficiency_oven",
        "commercial_griddle",
        "pre_rinse_spray_valve",
        "custom_natural_gas_efficiency_retrofit"
      ],
      "hardRequirements": [
        "Customer must be an eligible Cascade Natural Gas commercial or industrial customer on an eligible Washington rate schedule.",
        "Equipment must use natural gas and meet current CNGC specifications.",
        "Custom measures and many commercial projects require application review and qualifying gas savings."
      ],
      "blockers": [
        "Do not match generic air sealing; current weatherization support is for windows and insulation measures.",
        "Do not match broad low-flow fixture retrofits; the listed fixture measure is a kitchen pre-rinse spray valve.",
        "Do not match electric heat pumps or electric HVAC measures."
      ],
      "programType": "Commercial Natural Gas Rebate Program",
      "administrator": "Cascade Natural Gas",
      "applicationUrl": null,
      "websiteUrl": "https://www.cngc.com/energy-efficiency/commercial-rebate-offerings/",
      "sourceUrlsChecked": [
        "https://www.cngc.com/energy-efficiency/commercial-rebate-offerings/",
        "https://www.cngc.com/energy-efficiency/commercial-rebate-offerings/incentives-for-heating-equipment/",
        "https://www.cngc.com/energy-efficiency/commercial-rebate-offerings/incentives-for-weatherization-equipment/",
        "https://www.cngc.com/energy-efficiency/commercial-rebate-offerings/incentives-for-hot-water-equipment/",
        "https://www.cngc.com/energy-efficiency/commercial-rebate-offerings/incentives-for-food-service-and-kitchen-equipment/"
      ],
      "evidenceText": "CNGC's Washington commercial pages list heating, food service, weatherization, hot water, and custom categories including boilers, steam traps, windows, insulation, gas water heating, laundry ozone, ovens, and pre-rinse sprayers.",
      "reasoningNotes": "The gas program supports commercial natural-gas measures only. Air-sealing and broad plumbing matches should be narrowed."
    },
    "existingSimpleRules": [
      {
        "id": "oir_45b45fc7f285c347_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 12500,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$125 per eligible boiler steam trap",
        "evidenceText": "Cascade commercial heating incentives list Boiler Steam Trap at $125.",
        "sourceUrlsChecked": [
          "https://www.cngc.com/energy-efficiency/commercial-rebate-offerings/",
          "https://www.cngc.com/energy-efficiency/commercial-rebate-offerings/incentives-for-heating-equipment/"
        ],
        "reasoningNotes": "Matched steam trap term. Use one unit as one qualifying steam trap in a retrofit.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2077",
    "opportunityName": "Cowlitz County PUD - Commercial and Industrial Energy Efficiency Rebate Programs",
    "state": "WA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2077/cowlitz-county-pud-commercial-and-industrial-energy-efficiency-rebate-programs",
    "websiteUrl": "https://www.cowlitzpud.org/efficiency/commercial-programs/commercial-efficiency-programs/",
    "applicationUrl": null,
    "administrator": "Cowlitz County Public Utility District",
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
          "WA"
        ],
        "counties": [
          "Cowlitz County"
        ],
        "cities": [],
        "utilityTerritories": [
          "Cowlitz County Public Utility District electric service territory"
        ],
        "notes": "Available to eligible commercial and industrial Cowlitz PUD electric customers."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "industrial_customer",
        "business_customer",
        "nonresidential_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "nonresidential"
      ],
      "eligibleRetrofitCategories": [
        "ductless_heat_pump",
        "heat_pump_hvac_retrofit",
        "packaged_terminal_heat_pump",
        "heat_pump_water_heater",
        "advanced_rooftop_unit_controls",
        "led_lighting_retrofit",
        "insulation_upgrade",
        "window_replacement",
        "connected_thermostat",
        "custom_energy_efficiency_project",
        "industrial_process_efficiency"
      ],
      "hardRequirements": [
        "Must be an eligible Cowlitz PUD commercial or industrial customer.",
        "Commercial HVAC and shell measures must meet current rebate specifications.",
        "Lighting retrofits require pre-approval or program verification.",
        "Connected thermostat rebate requires eligible electric forced-air furnace or heat pump equipment.",
        "Custom and industrial measures require program review and savings validation."
      ],
      "blockers": [
        "Do not match residential measures to this commercial and industrial program.",
        "Do not treat the word window as window AC; it refers to commercial shell/window replacement measures.",
        "Do not match smart thermostat unless the commercial connected thermostat eligibility conditions are satisfied.",
        "Do not match heat pump water heaters outside qualifying commercial program rules."
      ],
      "programType": "Rebate Program",
      "administrator": "Cowlitz County Public Utility District",
      "applicationUrl": null,
      "websiteUrl": "https://www.cowlitzpud.org/efficiency/commercial-programs/commercial-efficiency-programs/",
      "sourceUrlsChecked": [
        "https://www.cowlitzpud.org/efficiency/commercial-programs/commercial-efficiency-programs/",
        "https://www.cowlitzpud.org/efficiency/contractors/",
        "https://www.cowlitzpud.org/efficiency/commercial-rebates/",
        "https://www.cowlitzpud.org/efficiency/industrial-efficiency-programs/"
      ],
      "evidenceText": "Cowlitz PUD contractor and commercial pages list commercial ductless and ducted heat pumps, packaged-terminal heat pumps, HPWH, LED lighting, connected thermostats, insulation/windows and custom or industrial projects.",
      "reasoningNotes": "Preserved shell, HVAC, lighting and custom industrial categories. Corrected window matching to window replacement, not window air conditioning."
    },
    "existingSimpleRules": [
      {
        "id": "oir_77967c620c0c1922_v1",
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
        "formula": "$2,000 per unitary commercial heat pump water heater",
        "evidenceText": "Cowlitz PUD commercial program page lists commercial heat pump water heaters, any size, at $2,000.",
        "sourceUrlsChecked": [
          "https://www.cowlitzpud.org/efficiency/commercial-programs/commercial-efficiency-programs/",
          "https://www.cowlitzpud.org/efficiency/commercial-rebates/"
        ],
        "reasoningNotes": "Matched heat pump water heater term. Use one unit as one eligible commercial HPWH.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4227",
    "opportunityName": "Peninsula Light Company - Residential Energy Efficiency  Rebate Program",
    "state": "WA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4227/peninsula-light-company-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.penlight.org/energy-efficiency/incentives/",
    "applicationUrl": null,
    "administrator": "Peninsula Light Company",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
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
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Peninsula Light Company"
        ],
        "notes": "Available to eligible PenLight residential electric customers in the cooperative service area; detailed requirements are measure-specific."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customers",
        "income_qualified_customers"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "ductless_mini_split_heat_pump",
        "heat_pump_water_heater",
        "smart_thermostat_zoning_retrofit",
        "insulation_upgrade",
        "window_replacement",
        "residential_energy_star_clothes_washer"
      ],
      "hardRequirements": [
        "Applicant must be an eligible Peninsula Light Company customer.",
        "Heat pump, ductless heat pump, heat pump water heater, smart thermostat, insulation, window, and appliance incentives have separate program requirements.",
        "Heat pump water heater incentives require replacing an existing electric standard tank where specified.",
        "Window rebates require qualifying existing electric-heated residence and qualifying window specifications."
      ],
      "blockers": [
        "PenLight official pages returned 403 to the browser, so detailed requirements should be verified before automated approval.",
        "Do not infer duct sealing or air sealing unless current PenLight requirements explicitly list them.",
        "Do not generalize smart thermostat or appliance offers into broad HVAC or commercial equipment categories."
      ],
      "programType": "Rebate Program",
      "administrator": "Peninsula Light Company",
      "applicationUrl": null,
      "websiteUrl": "https://www.penlight.org/energy-efficiency/incentives/",
      "sourceUrlsChecked": [
        "https://www.penlight.org/energy-efficiency/incentives/",
        "https://www.penlight.org/energy-efficiency/incentives/heat-pump-incentives/",
        "https://www.penlight.org/energy-efficiency/incentives/heat-pump-hybrid-water-heater-incentives-600-incentive/",
        "https://www.penlight.org/energy-efficiency/incentives/window-incentives/",
        "https://www.penlight.org/news-releases/energy-efficiency-programs/"
      ],
      "evidenceText": "Official]( PenLight search snippets list incentives for heat pumps, ductless heat pumps, heat pump water heaters, smart thermostats, insulation, windows and ENERGY STAR clothes washers.",
      "reasoningNotes": "Because the official pages were blocked to direct browser access, preserve only categories visible in official snippets and avoid adding unsupported air sealing or duct sealing."
    },
    "existingSimpleRules": [
      {
        "id": "oir_177443d7f145c5ed_v1",
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
        "formula": "$100 per eligible smart thermostat",
        "evidenceText": "Peninsula Light residential incentives list a $100 smart thermostat incentive.",
        "sourceUrlsChecked": [
          "https://www.penlight.org/energy-efficiency/incentives/residential-incentives/"
        ],
        "reasoningNotes": "Matched smart thermostat term. Use one unit as one qualifying thermostat.",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_9e5219d04a117212_v1",
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
        "formula": "Up to $1,800 per heat pump water heater",
        "evidenceText": "Peninsula Light residential incentives list heat pump water heater incentives up to $1,800.",
        "sourceUrlsChecked": [
          "https://www.penlight.org/energy-efficiency/incentives/residential-incentives/"
        ],
        "reasoningNotes": "Matched HPWH term. Source uses up to, so final amount depends on project type.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2837",
    "opportunityName": "Richland Energy Services - Residential Energy Efficiency Rebate Program",
    "state": "WA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2837/richland-energy-services-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.richlandwa.gov/departments/energy-services/energy-efficiency/residential-programs-and-rebates",
    "applicationUrl": "https://www.richlandwa.gov/home/showpublisheddocument/18065/639100479801730000",
    "administrator": "City of Richland",
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
          "WA"
        ],
        "counties": [],
        "cities": [
          "Richland"
        ],
        "utilityTerritories": [
          "Richland Energy Services"
        ],
        "notes": "Limited to City of Richland electric utility residential customers."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "homeowner",
        "income_qualified_household",
        "multifamily_property_owner"
      ],
      "eligibleSectors": [
        "residential",
        "multifamily_residential"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "ductless_mini_split_heat_pump",
        "heat_pump_water_heater",
        "insulation_upgrade",
        "air_sealing_weatherization",
        "window_replacement",
        "energy_star_exterior_door_replacement"
      ],
      "hardRequirements": [
        "Applicant must be a Richland Energy Services electric customer.",
        "Program forms and installed equipment must meet current residential rebate specifications.",
        "Weatherization rebates require the primary space-heating system to be electric.",
        "Pre-approval, contractor participation, or inspection may be required by measure.",
        "Rebates are subject to funding availability."
      ],
      "blockers": [
        "Level 2 EV charger rebates are on a separate Richland electric-vehicle program page, not the residential HVAC/weatherization rebate page.",
        "Do not match gas-primary-heating homes to weatherization rebates unless current program rules allow the specific measure.",
        "Do not generalize door or window specifications beyond listed program-qualified replacements."
      ],
      "programType": "Rebate Program",
      "administrator": "City of Richland",
      "applicationUrl": "https://www.richlandwa.gov/home/showpublisheddocument/18065/639100479801730000",
      "websiteUrl": "https://www.richlandwa.gov/departments/energy-services/energy-efficiency/residential-programs-and-rebates",
      "sourceUrlsChecked": [
        "https://www.richlandwa.gov/departments/energy-services/energy-efficiency/residential-programs-and-rebates",
        "https://www.richlandwa.gov/departments/energy-services/energy-efficiency/contractor-info-and-forms",
        "https://www.richlandwa.gov/home/showpublisheddocument/18065/639100479801730000",
        "https://www.richlandwa.gov/home/showpublisheddocument/4026/639100481455170000",
        "https://www.richlandwa.gov/departments/energy-services/electric-vehicles"
      ],
      "evidenceText": "Current Richland pages list residential rebates and loans for HVAC heat pumps, insulation, windows, doors and hybrid water heaters. The 2026 application includes heat pump conversion or upgrade, ductless heat pumps, insulation, air sealing and window or door replacement; EV charging is separate.",
      "reasoningNotes": "Retain heat pump, heat pump water heater, insulation, air sealing and window/door categories. Treat EV charging as a separate program boundary even though the same utility offers it."
    },
    "existingSimpleRules": [
      {
        "id": "oir_ae71cf4a1e2a85a5_v1",
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
        "formula": "$300 per ENERGY STAR certified Level 2 smart charger",
        "evidenceText": "Richland electric vehicle page lists a $300 rebate for ENERGY STAR certified Level 2 smart chargers.",
        "sourceUrlsChecked": [
          "https://www.ci.richland.wa.us/departments/energy-services/energy-efficiency-programs/electric-vehicles"
        ],
        "reasoningNotes": "Matched Level 2 charger term. Use one unit as one qualifying charger.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2239",
    "opportunityName": "Snohomish County PUD No 1 - Commercial and Industrial Energy Efficiency Program",
    "state": "WA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2239/snohomish-county-pud-no-1-commercial-and-industrial-energy-efficiency-program",
    "websiteUrl": "https://www.snopud.com/save-energy/business/rebates/all/",
    "applicationUrl": "https://www.snopud.com/save-energy/business/rebates/rebate-portal/",
    "administrator": "Snohomish County PUD",
    "programType": "Rebate Program",
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
          "refrigeration",
          "display case"
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
          "WA"
        ],
        "counties": [
          "Snohomish County"
        ],
        "cities": [],
        "utilityTerritories": [
          "Snohomish County PUD electric service territory"
        ],
        "notes": "Business rebates apply to qualifying Snohomish PUD commercial and industrial electric customers."
      },
      "eligibleApplicantTypes": [
        "business_customer",
        "commercial_customer",
        "industrial_customer",
        "contractor_or_trade_ally"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "institutional",
        "multifamily_common_area_or_business_facility"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "ductless_mini_split_heat_pump",
        "packaged_terminal_heat_pump",
        "variable_refrigerant_flow_retrofit",
        "smart_thermostat_zoning_retrofit",
        "heat_recovery_ventilation",
        "variable_frequency_drive_retrofit",
        "motors_pumps_fans_drives",
        "insulation_upgrade",
        "window_replacement",
        "anti_sweat_heater_controls",
        "high_efficiency_refrigeration_equipment",
        "refrigeration_controls_retrofit",
        "display_case_door_retrofit",
        "walk_in_cooler_freezer_upgrade",
        "commercial_kitchen_ventilation_controls",
        "heat_pump_water_heater",
        "compressed_air_system_upgrade",
        "building_controls_energy_management"
      ],
      "hardRequirements": [
        "Applicant must be a Snohomish PUD business electric customer.",
        "All projects require pre-approval before installation.",
        "Rebates may not exceed 100 percent of project cost.",
        "Windows and insulation apply to electrically heated facilities.",
        "Measures must meet PUD business rebate or custom project specifications."
      ],
      "blockers": [
        "Do not match residential measures to this commercial and industrial program.",
        "Commercial and industrial EV charger rebates are a separate portal line and should not be inferred from this efficiency match.",
        "Windows and insulation are limited to electrically heated facilities.",
        "Custom and equipment projects need PUD review and pre-approval."
      ],
      "programType": "Rebate Program",
      "administrator": "Snohomish County PUD",
      "applicationUrl": "https://www.snopud.com/save-energy/business/rebates/rebate-portal/",
      "websiteUrl": "https://www.snopud.com/save-energy/business/rebates/all/",
      "sourceUrlsChecked": [
        "https://www.snopud.com/save-energy/business/rebates/",
        "https://www.snopud.com/save-energy/business/rebates/all/",
        "https://www.snopud.com/save-energy/business/rebates/rebate-portal/",
        "https://www.snopud.com/save-energy/business/rebates/equipment/",
        "https://www.snopud.com/save-energy/business/rebates/lighting/"
      ],
      "evidenceText": "Snohomish PUD’s current business rebate page lists heat pumps, ductless heat pumps, connected thermostats, VFDs, VRF, heat-recovery ventilators, insulation/windows for electrically heated facilities, refrigeration controls and cases, kitchen ventilation and heat pump water heaters. All projects require pre-approval.",
      "reasoningNotes": "Most target C&I categories are supported. Interpret heat recovery as heat-recovery ventilation or approved custom savings, not as generic industrial waste-heat recovery without review."
    },
    "existingSimpleRules": [
      {
        "id": "oir_7aafac830e669fb8_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "rate_per_kwh",
          "amountCentsPerKwh": 25,
          "kwhSource": "annual_kwh_delta_abs"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "25 cents per kWh",
        "evidenceText": "ft of doorway Evaporator Fan ECM controller: $60 & $120 per motor controlled Industrial Water system leak abatement: 25¢ / kWh Commercial Kitchen Demand controlled kitchen ventilation: $400 per fan HP (1 sensor), $800 per fan HP (2+ sensors) Water Heating Consumer Heat Pump Water Heater: up to $2,200 per unit Unitary Heat Pump Water Heater $2,000 per unit Engine Block Heater & Controls Generator block heater: $400 per heater (&lt",
        "sourceUrlsChecked": [
          "https://www.snopud.com/?p=2048"
        ],
        "reasoningNotes": "",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3172",
    "opportunityName": "Tacoma Power - Commercial and Industrial Energy Efficiency Rebate Programs",
    "state": "WA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3172/tacoma-power-commercial-and-industrial-energy-efficiency-rebate-programs",
    "websiteUrl": "https://www.mytpu.org/ways-to-save/business-rebates/",
    "applicationUrl": null,
    "administrator": "Tacoma Power",
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
        "counties": [],
        "cities": [
          "Tacoma"
        ],
        "utilityTerritories": [
          "Tacoma Power electric service territory"
        ],
        "notes": "Business location must be served by Tacoma Power."
      },
      "eligibleApplicantTypes": [
        "business_customer",
        "commercial_customer",
        "industrial_customer",
        "governmental_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "government",
        "institutional"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "ductless_mini_split_heat_pump",
        "packaged_terminal_heat_pump",
        "variable_refrigerant_flow_retrofit",
        "high_efficiency_hvac_replacement",
        "heat_pump_water_heater",
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "high_efficiency_refrigeration_equipment",
        "refrigeration_controls_retrofit",
        "insulation_upgrade",
        "smart_thermostat_zoning_retrofit",
        "variable_frequency_drive_retrofit",
        "motors_pumps_fans_drives",
        "waste_heat_recovery",
        "compressed_air_system_upgrade",
        "industrial_process_efficiency",
        "walk_through_energy_assessment"
      ],
      "hardRequirements": [
        "Applicant must have a qualifying business location in Tacoma Power territory.",
        "Product rebate applications must be submitted before or within the allowed post-installation deadline.",
        "Custom projects for existing commercial, industrial and governmental buildings require pre-approval before installation.",
        "Equipment must meet Tacoma Power specifications and funding limits."
      ],
      "blockers": [
        "Do not match residential HVAC, appliances or home weatherization to this business program.",
        "Insulation is supported as a custom additional-insulation project, not a general residential envelope rebate.",
        "Connected thermostat means qualifying web-connected thermostat equipment.",
        "Custom refrigeration, industrial process, heat recovery and compressed-air projects require documented energy savings and utility review."
      ],
      "programType": "Rebate Program",
      "administrator": "Tacoma Power",
      "applicationUrl": null,
      "websiteUrl": "https://www.mytpu.org/ways-to-save/business-rebates/",
      "sourceUrlsChecked": [
        "https://www.mytpu.org/ways-to-save/business-rebates/",
        "https://www.mytpu.org/ways-to-save/business-rebates/save-with-hvac/",
        "https://www.mytpu.org/ways-to-save/business-rebates/custom-projects/"
      ],
      "evidenceText": "Tacoma Power’s business pages list current rebates for heat pumps, connected thermostats, commercial heat pump water heaters, lighting and custom C/I projects. Custom projects for existing commercial, industrial and governmental buildings cover HVAC, insulation, drive power, refrigeration, industrial processes and compressed air.",
      "reasoningNotes": "The target categories are mostly supported for business customers. Retain insulation and refrigeration only with the custom or commercial equipment constraints."
    },
    "existingSimpleRules": [
      {
        "id": "oir_68b7b4c1cfa630c3_v1",
        "incentiveType": "custom_efficiency_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "rate_per_kwh",
          "amountCentsPerKwh": 23,
          "kwhSource": "annual_kwh_delta_abs"
        },
        "basisPolicy": {
          "basis": "eligible_cost_categories",
          "applicationOrder": 10
        },
        "cap": {
          "maxPercentOfBasis": 0.7
        },
        "confidence": "high",
        "formula": "$0.23 per first-year annual kWh saved, capped at 70% of approved project cost",
        "evidenceText": "Tacoma Power custom projects list $0.23 per annual kWh saved, up to 70% of total approved project cost.",
        "sourceUrlsChecked": [
          "https://www.mytpu.org/ways-to-save/business-rebates/custom-projects/",
          "https://www.mytpu.org/wp-content/uploads/5197_TP_CEP_CommercialRebateGuide_0324_WEB_OUT.pdf"
        ],
        "reasoningNotes": "Matched broad C&I custom efficiency scope. Use only for preapproved custom projects with verified kWh savings.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22729",
    "opportunityName": "Wisconsin - Home Electrification and Appliance Rebate (HEAR) Program",
    "state": "WI",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22729/wisconsin-home-electrification-and-appliance-rebate-hear-program",
    "websiteUrl": "https://focusonenergy.com/ira-hear",
    "applicationUrl": "https://focus-ira.clearesult.com/",
    "administrator": "Focus on Energy",
    "programType": "Income-Qualified Residential Electrification Rebate Program",
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
          "WI"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [],
        "notes": "Statewide Wisconsin program administered through Focus on Energy for eligible households."
      },
      "eligibleApplicantTypes": [
        "low_income_household",
        "moderate_income_household",
        "single_family_homeowner",
        "multifamily_resident",
        "multifamily_property_owner"
      ],
      "eligibleSectors": [
        "residential",
        "multifamily"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "heat_pump_water_heater",
        "insulation_upgrade",
        "air_sealing_weatherization",
        "mechanical_ventilation_upgrade",
        "electrical_panel_upgrade",
        "electrical_wiring_for_electrification",
        "heat_pump_clothes_dryer",
        "electric_cooking_appliance"
      ],
      "hardRequirements": [
        "Household income must be less than 150 percent of area median income.",
        "Maximum HEAR rebate is generally capped at 14000 dollars per household or address.",
        "Rebate percentage depends on whether income is below 80 percent or between 80 and 150 percent of area median income.",
        "Certain equipment must be installed by an IRA Registered Contractor.",
        "A household cannot receive both HOMES and HEAR rebates for the same upgrade."
      ],
      "blockers": [
        "Households above 150 percent of area median income are not eligible.",
        "LED lighting is not an eligible HEAR category.",
        "Commercial or industrial process electrification equipment is not part of this residential program.",
        "Do not match nonresidential applicants or general commercial electrification projects."
      ],
      "programType": "Income-Qualified Residential Electrification Rebate Program",
      "administrator": "Focus on Energy",
      "applicationUrl": "https://focus-ira.clearesult.com/",
      "websiteUrl": "https://focusonenergy.com/ira-hear",
      "sourceUrlsChecked": [
        "https://focusonenergy.com/ira-hear",
        "https://focus-ira.clearesult.com/"
      ],
      "evidenceText": "Focus on Energy lists HEAR rebates for heat pumps, heat pump water heaters, insulation, air sealing, ventilation, electric panels, wiring, heat pump dryers, and electric cooking appliances.",
      "reasoningNotes": "The current DSIRE-derived matches include false positives for LED lighting and process electrification. HEAR is residential and income-limited, not a commercial or industrial electrification program."
    },
    "existingSimpleRules": [
      {
        "id": "oir_0b6b1a82fa8ab99a_v1",
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
        "formula": "Up to $1,750 per eligible heat pump water heater",
        "evidenceText": "Focus on Energy HEAR materials list up to $1,750 for heat pump water heaters.",
        "sourceUrlsChecked": [
          "https://focusonenergy.com/home-energy-rebates",
          "https://focusonenergy.com/residential"
        ],
        "reasoningNotes": "Matched heat pump water heater term. Returned separately from heat pump HVAC.",
        "mapping": {
          "primarySavingsModelId": "hvac_electric_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_9068ac6c48e5b47e_v1",
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
        "formula": "Up to $8,000 per eligible heat pump",
        "evidenceText": "Focus on Energy HEAR materials list up to $8,000 for heat pump space heating and cooling.",
        "sourceUrlsChecked": [
          "https://focusonenergy.com/home-energy-rebates",
          "https://focusonenergy.com/residential"
        ],
        "reasoningNotes": "Matched heat pump term. HEAR amount depends on income, eligibility, and project pathway.",
        "mapping": {
          "primarySavingsModelId": "hvac_electric_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_dcb86bfd09703e39_v1",
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
        "evidenceText": "Focus on Energy HEAR materials list up to $1,600 for insulation, air sealing, and ventilation.",
        "sourceUrlsChecked": [
          "https://focusonenergy.com/home-energy-rebates",
          "https://focusonenergy.com/residential"
        ],
        "reasoningNotes": "Matched insulation and air sealing terms. Modeled as a project-level cap.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4835",
    "opportunityName": "AEP Appalachian Power - Residential Energy Efficiency Rebate Program",
    "state": "WV",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4835/aep-appalachian-power-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://takechargewv.com/rebates",
    "applicationUrl": null,
    "administrator": "Appalachian Power",
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
          "WV"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Appalachian Power West Virginia service territory"
        ],
        "notes": "TakeCharge WV applies to eligible Appalachian Power residential customers in West Virginia."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customer",
        "homeowner",
        "renter_with_account_or_owner_authorization"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "central_air_conditioner",
        "room_air_conditioner",
        "mini_split_heat_pump",
        "heat_pump_water_heater",
        "diy_insulation",
        "smart_thermostat",
        "furnace_fan_motor",
        "residential_clothes_washer",
        "ventilation_fan",
        "air_purifier",
        "dehumidifier",
        "water_dispenser"
      ],
      "hardRequirements": [
        "Customer must be an eligible Appalachian Power residential customer in West Virginia.",
        "Products must meet ENERGY STAR or TakeCharge WV listed requirements.",
        "Applications must use the current online portal or mail-in forms and comply with measure limits."
      ],
      "blockers": [
        "Do not match whole-furnace replacement; the supported furnace-related measure is a furnace fan motor.",
        "Do not match commercial laundry equipment.",
        "Do not infer broad weatherization beyond the DIY insulation measure."
      ],
      "programType": "Rebate Program",
      "administrator": "Appalachian Power",
      "applicationUrl": null,
      "websiteUrl": "https://takechargewv.com/rebates",
      "sourceUrlsChecked": [
        "https://takechargewv.com/rebates",
        "https://takechargewv.dsmtracker.com/rebates/appliance-rebates/smart-thermostat.html"
      ],
      "evidenceText": "TakeCharge WV lists residential rebate forms for appliances, central and room A/C, mini-split heat pumps, heat pump water heaters, DIY insulation, smart thermostats, ventilation fans, and furnace fan motors.",
      "reasoningNotes": "Keep residential HVAC, HPWH, insulation, thermostat, and washer categories. Remove furnace replacement and commercial laundry interpretations."
    },
    "existingSimpleRules": [
      {
        "id": "oir_cbf049fb1336675c_v1",
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
        "cap": {
          "maxPercentOfBasis": 0.5
        },
        "confidence": "medium",
        "formula": "Up to $50 per eligible smart thermostat, capped at 50% of purchase price",
        "evidenceText": "TakeCharge WV smart thermostat rebate page says rebate is up to $50 and cannot exceed 50% of purchase price.",
        "sourceUrlsChecked": [
          "https://takechargewv.com/rebates",
          "https://takechargewv.dsmtracker.com/rebates/appliance-rebates/smart-thermostat.html"
        ],
        "reasoningNotes": "Matched smart thermostat term. Source gives a clear amount and cost cap.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4774",
    "opportunityName": "Questar Gas - Residential Energy Efficiency Rebate Programs",
    "state": "WY",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4774/questar-gas-residential-energy-efficiency-rebate-programs",
    "websiteUrl": "https://www.enbridgegas.com/utwyid/save-money/thermwise",
    "applicationUrl": "https://questar.dsmcentral.com/",
    "administrator": "Enbridge Gas Wyoming ThermWise",
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
          "Enbridge Gas Wyoming natural gas service territory"
        ],
        "notes": "ThermWise Wyoming applies to eligible Enbridge Gas customers on qualifying residential gas service schedules."
      },
      "eligibleApplicantTypes": [
        "residential_gas_customers",
        "homeowners",
        "multifamily_property_owners",
        "homebuilders"
      ],
      "eligibleSectors": [
        "residential",
        "multifamily_residential"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_furnace_retrofit",
        "dual_fuel_heat_pump_heating_system",
        "high_efficiency_boiler_retrofit",
        "boiler_reset_control",
        "smart_thermostat_zoning_retrofit",
        "energy_recovery_ventilation_retrofit",
        "gas_water_heater_replacement",
        "smart_water_heater_controller",
        "solar_assisted_gas_water_heating",
        "insulation_upgrade",
        "air_sealing_weatherization",
        "duct_sealing_and_insulation",
        "window_replacement",
        "pipe_insulation"
      ],
      "hardRequirements": [
        "Applicant must receive eligible Enbridge Gas Wyoming residential service on a qualifying rate schedule.",
        "Rebate requests generally must be submitted within six months of installation with required invoices, model data, and account information.",
        "Weatherization measures require existing natural gas heat and measure-specific R-value or U-factor requirements.",
        "Duct sealing, air sealing, and many insulation measures require ThermWise authorized contractor installation or specified self-install rules.",
        "ERV requires gas space heating and cannot be required by code."
      ],
      "blockers": [
        "Do not match this gas program to standalone electric heat pumps except qualifying dual-fuel systems with natural gas backup.",
        "Generic high-efficiency HVAC is too broad; use gas furnace, gas boiler, dual-fuel heat pump, or ERV categories.",
        "Questar/Dominion branding is stale; current program is Enbridge Gas ThermWise for Utah, Idaho and Wyoming."
      ],
      "programType": "Rebate Program",
      "administrator": "Enbridge Gas Wyoming ThermWise",
      "applicationUrl": "https://questar.dsmcentral.com/",
      "websiteUrl": "https://www.enbridgegas.com/utwyid/save-money/thermwise",
      "sourceUrlsChecked": [
        "https://www.enbridgegas.com/utwyid/save-money/thermwise",
        "https://www.enbridgegas.com/utwyid/save-money/thermwise/appliance-rebates",
        "https://www.enbridgegas.com/utwyid/save-money/thermwise/weatherization-rebates",
        "https://www.enbridgegas.com/-/media/Extranet-Pages/utidwy/save-money/thermwise/Equipment-Specs-Wyoming.pdf"
      ],
      "evidenceText": "ThermWise]( Wyoming lists residential gas furnace, dual-fuel heating, gas boiler, smart thermostat, boiler reset, ERV, water heating, windows, insulation, duct sealing, air sealing and pipe insulation rebates.",
      "reasoningNotes": "The original categories are valid when narrowed to gas-service ThermWise measures; add water heating, windows and dual-fuel heat pump context while excluding standalone electric HVAC."
    },
    "existingSimpleRules": [
      {
        "id": "oir_18d277fb6ba90872_v1",
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
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_3191657e76ea87e2_v1",
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
        "reasoningNotes": "Matched smart thermostat term. Tier 2 is the relevant connected thermostat candidate.",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_d43035109f54a52d_v1",
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
        "reasoningNotes": "Matched boiler reset term. Applies to eligible after-market boiler reset controls.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5706",
    "opportunityName": "TVA - Residential Energy Efficiency Rebate Program",
    "state": "AL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5706/tva-residential-energy-efficiency-rebate-program",
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
          "AL"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "TVA-served local power company territories in Alabama"
        ],
        "notes": "Not statewide Alabama; only homes served by participating TVA local power companies qualify."
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
        "https://programs.dsireusa.org/system/program/detail/5706/tva-residential-energy-efficiency-rebate-program"
      ],
      "evidenceText": "TVA EnergyRight current residential rebate pages list air sealing, insulation, duct sealing, HVAC tune-up, central AC, geothermal heat pump, mini-split and heat pump rebates through QCN contractors.",
      "reasoningNotes": "These five DSIRE state records share the same TVA EnergyRight residential rebate structure; geography differs by TVA-served territory in each state."
    },
    "existingSimpleRules": [
      {
        "id": "oir_53b378779e6166ac_v1",
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
        "reasoningNotes": "Matched duct sealing and insulation terms. Use as a distinct duct measure.",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_62c77c518e30a567_v1",
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
        "reasoningNotes": "Matched geothermal heat pump term. Use one unit as one qualifying system.",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_97fee395eb977f0d_v1",
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
        "reasoningNotes": "Matched heat pump term. Returned higher published efficiency tier.",
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
    "opportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:6849d4cc60567610:custom-measure-rebates-heat-recovery-chillers-and-heat-pump-pool-heaters",
    "opportunityName": "Custom Measure Rebates - Heat Recovery Chillers and Heat Pump Pool Heaters",
    "state": "CA",
    "sourceName": "Silicon Valley Power Business Programs",
    "sourceUrl": "https://www.siliconvalleypower.com/businesses/electrification-programs-rebates",
    "websiteUrl": "https://www.siliconvalleypower.com/businesses/electrification-programs-rebates",
    "applicationUrl": "https://www.siliconvalleypower.com/home/showpublisheddocument/71429/637902891309870000",
    "administrator": "Silicon Valley Power",
    "programType": "Custom Measure Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 6,
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
          "chiller"
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
        "counties": [
          "Santa Clara County"
        ],
        "cities": [
          "Santa Clara"
        ],
        "utilityTerritories": [
          "Silicon Valley Power electric service territory"
        ],
        "notes": "Program is for non-residential Silicon Valley Power customers in Santa Clara."
      },
      "eligibleApplicantTypes": [
        "non_residential_electric_customer",
        "business_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "institutional"
      ],
      "eligibleRetrofitCategories": [
        "heat_recovery_chiller",
        "heat_pump_pool_heater",
        "waste_heat_recovery"
      ],
      "hardRequirements": [
        "Applicant must be a non-residential Silicon Valley Power customer.",
        "Heat recovery chiller projects must reduce or eliminate natural gas use and use recovered heat for heating needs.",
        "Heat pump pool heaters must replace natural gas-fired boilers as the primary source of pool water heating.",
        "Custom measure projects require program review and pre-approval."
      ],
      "blockers": [
        "This opportunity is specific to heat recovery chillers and heat pump pool heaters, not general HVAC heat pump retrofits.",
        "Heat pump water heaters, boiler replacements, and low-flow fixtures are not supported by this opportunity.",
        "The checked application PDF is dated for an older program year, so a current application URL should not be assumed from it."
      ],
      "programType": "Custom Measure Rebate",
      "administrator": "Silicon Valley Power",
      "applicationUrl": null,
      "websiteUrl": "https://www.siliconvalleypower.com/businesses/electrification-programs-rebates",
      "sourceUrlsChecked": [
        "https://www.siliconvalleypower.com/businesses/electrification-programs-rebates",
        "https://www.siliconvalleypower.com/home/showpublisheddocument/71429/637902891309870000",
        "https://www.siliconvalleypower.com/home/showpublisheddocument/74272/637595252919970000"
      ],
      "evidenceText": "Silicon]( Valley Power's business electrification page lists custom rebates for heat recovery chillers and heat pump pool heaters that replace or reduce natural gas heating.",
      "reasoningNotes": "Narrow this section to the two named custom measures and waste-heat recovery function; remove unrelated water-heater, boiler, and fixture matches."
    },
    "existingSimpleRules": [
      {
        "id": "oir_837b7794383ddeb7_v1",
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
          "https://www.siliconvalleypower.com/home/showpublisheddocument/71429/637902891309870000"
        ],
        "reasoningNotes": "",
        "mapping": {
          "primarySavingsModelId": "hvac_electric_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null,
          "businessRelevance": "business_relevant",
          "v1Readiness": "needs_bill_data"
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:heat-pump-water-heater-rebate",
    "opportunityName": "Heat Pump Water Heater Rebate",
    "state": "CA",
    "sourceName": "Silicon Valley Power Business Programs",
    "sourceUrl": "https://www.siliconvalleypower.com/businesses/rebates",
    "websiteUrl": "https://www.siliconvalleypower.com/businesses/rebates",
    "applicationUrl": "https://www.siliconvalleypower.com/home/showpublisheddocument/75953/638881818060600000",
    "administrator": "Silicon Valley Power",
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
        "notes": "Available to qualifying Silicon Valley Power non-residential customers in the City of Santa Clara electric utility service territory."
      },
      "eligibleApplicantTypes": [
        "nonresidential_svp_customer",
        "business_customer",
        "commercial_customer",
        "institutional_customer",
        "government_customer",
        "authorized_account_holder"
      ],
      "eligibleSectors": [
        "commercial",
        "institutional",
        "government",
        "industrial",
        "nonprofit"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_water_heater"
      ],
      "hardRequirements": [
        "Applicant must be a nonresidential Silicon Valley Power customer.",
        "Project must replace an existing electric resistance water heater or natural gas water heater with a qualifying heat pump water heater.",
        "Preapproval by Silicon Valley Power is required before installation.",
        "A pre-installation inspection, qualifying equipment efficiency, new equipment, operating installation and timely invoice submission are required.",
        "Projects are subject to funding availability and program deadlines."
      ],
      "blockers": [
        "Do not match battery storage, heat pump HVAC, high-efficiency gas water heaters or low-flow fixtures to this heat pump water heater rebate.",
        "The gas water heater term refers to replacing existing gas equipment with a heat pump water heater, not rebating new gas water heaters.",
        "Silicon Valley Power heat pump HVAC and refrigeration rebates are separate programs and should not be merged into this opportunity.",
        "Residential rebates should not be inferred from this business program record."
      ],
      "programType": "Rebate Program",
      "administrator": "Silicon Valley Power",
      "applicationUrl": "https://www.siliconvalleypower.com/home/showpublisheddocument/75953/638881818060600000",
      "websiteUrl": "https://www.siliconvalleypower.com/businesses/rebates",
      "sourceUrlsChecked": [
        "https://www.siliconvalleypower.com/businesses/rebates",
        "https://www.siliconvalleypower.com/home/showpublisheddocument/75953/638881818060600000",
        "https://www.siliconvalleypower.com/businesses/electrification-programs-rebates"
      ],
      "evidenceText": "Silicon]( Valley Power's business rebate application covers nonresidential heat pump water heaters replacing existing electric resistance or natural gas water heaters, with preapproval required before installation.",
      "reasoningNotes": "Only the heat pump water heater category is supported for this opportunity. Other matched terms came from nearby SVP electrification programs or from describing the replaced equipment, so they should be blocked for this specific listing."
    },
    "existingSimpleRules": [
      {
        "id": "oir_47f473db4875fc23_v1",
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
        "formula": "$1,000 per electric heat pump water heater replacing an electric resistance water heater",
        "evidenceText": "SVP business rebate materials state customers replacing an existing electric resistance water heater receive a $1,000 rebate.",
        "sourceUrlsChecked": [
          "https://www.siliconvalleypower.com/businesses/rebates",
          "https://www.siliconvalleypower.com/businesses/electrification-programs-rebates"
        ],
        "reasoningNotes": "Matched heat pump water heater term. Use one unit as one qualifying HPWH replacement.",
        "mapping": {
          "primarySavingsModelId": "hvac_electric_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  }
]
