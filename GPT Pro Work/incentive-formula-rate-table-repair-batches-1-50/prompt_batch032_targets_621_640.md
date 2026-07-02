You are helping RetroFi repair incentive formulas, rate tables, grant estimates, tax credits, and non-cash workflow value rules.

Return strict JSON only. Do not include markdown, code fences, commentary, or citations outside JSON fields.

Batch: 32
Targets in this prompt: 621-640 of 984
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
  "batchNumber": 32,
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
  "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:2680"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5381",
    "opportunityName": "Johnson County REMC - Residential Energy Efficiency Rebate Program",
    "state": "IN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5381/johnson-county-remc-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://jcremc.com/savings/rebates/",
    "applicationUrl": null,
    "administrator": "Johnson County REMC",
    "programType": "Residential Cooperative Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 8,
    "targetKind": "reviewed_no_rule_reclassification",
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
          "IN"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Johnson County REMC"
        ],
        "notes": "Limited to Johnson County REMC residential members; some measures require the Single-Phase Time-of-Use rate."
      },
      "eligibleApplicantTypes": [
        "residential_member",
        "homeowner"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "duct_sealing_and_insulation",
        "ev_charging_outlet_installation",
        "ground_source_geothermal_heat_pump",
        "heat_pump_hvac_retrofit",
        "heat_pump_water_heater",
        "insulation_upgrade",
        "smart_thermostat_zoning_retrofit",
        "hvac_tune_up",
        "efficient_pool_pump"
      ],
      "hardRequirements": [
        "Applicant must be a Johnson County REMC member and submit the 2026 rebate form with required invoices and equipment documentation.",
        "Heat pumps, mini-splits and geothermal systems must meet listed efficiency thresholds and AHRI or installer requirements.",
        "Attic insulation and duct-sealing rebates apply to residences older than two years and require professional installation or leakage reports as specified.",
        "Smart thermostat, EV outlet and pool-pump measures require the Single-Phase Time-of-Use rate.",
        "EV measure is for a 240-volt charging outlet for battery-electric vehicles only, not hybrids."
      ],
      "blockers": [
        "Do not treat the EV measure as DC fast charging or a generic charger-hardware rebate; it is a 240-volt outlet incentive.",
        "Do not match commercial buildings.",
        "Do not generalize attic insulation and duct sealing into unrelated envelope measures.",
        "Smart thermostat rebate is rate-limited and should not match customers who are not on the required time-of-use rate."
      ],
      "programType": "Residential Cooperative Rebate Program",
      "administrator": "Johnson County REMC",
      "applicationUrl": null,
      "websiteUrl": "https://jcremc.com/savings/rebates/",
      "sourceUrlsChecked": [
        "https://jcremc.com/savings/rebates/"
      ],
      "evidenceText": "Johnson]( County REMC’s 2026 rebate page lists ASHP, mini-split, geothermal, heat-pump water-heater, attic insulation, duct sealing, smart thermostat, HVAC tune-up, pool pump and EV 240-volt outlet incentives.",
      "reasoningNotes": "The original categories were mostly valid, but EV charging was narrowed to a 240-volt outlet and rate-dependent measures were added as blockers."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Johnson County REMC source did not expose current whole-building or exact heat-pump values in accessible text.",
        "sourceUrlsChecked": [
          "https://jcremc.com/savings/rebates/"
        ],
        "reasoningNotes": "No reusable per-kWh rule was found.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4799",
    "opportunityName": "Mass Save  - Residential Energy Efficiency Programs",
    "state": "MA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4799/mass-save-residential-energy-efficiency-programs",
    "websiteUrl": "https://www.masssave.com/residential/rebates-offers-services",
    "applicationUrl": null,
    "administrator": "Mass Save sponsors",
    "programType": "Residential Rebate And Zero-Interest Financing Portfolio",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 8,
    "targetKind": "reviewed_no_rule_reclassification",
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
        "cities": [],
        "utilityTerritories": [
          "Berkshire Gas",
          "Cape Light Compact",
          "Eversource",
          "Liberty",
          "National Grid",
          "Unitil"
        ],
        "notes": "Eligibility depends on the customer’s Mass Save sponsor, fuel type, residence type and measure-specific rules."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "homeowner",
        "renter",
        "landlord"
      ],
      "eligibleSectors": [
        "residential",
        "multifamily"
      ],
      "eligibleRetrofitCategories": [
        "air_sealing_weatherization",
        "insulation_upgrade",
        "window_replacement",
        "heat_pump_hvac_retrofit",
        "ground_source_geothermal_heat_pump",
        "heat_pump_water_heater",
        "smart_thermostat_zoning_retrofit",
        "residential_clothes_washer",
        "residential_induction_cooktop",
        "residential_appliance_recycling",
        "low_flow_showerheads_and_aerators",
        "zero_interest_financing"
      ],
      "hardRequirements": [
        "Applicant must be a residential customer of a participating Mass Save sponsor utility or energy-efficiency provider.",
        "Measure-specific 2026 purchase, installation and submission deadlines apply.",
        "Heat-pump water heaters require qualifying equipment, eligible residence type, licensed installation where required and cannot be combined with certain other incentives.",
        "Some appliance rebates require verification of the existing appliance before removal.",
        "Certain weatherization, heat-pump and window measures require a Home Energy Assessment before rebate or HEAT Loan eligibility."
      ],
      "blockers": [
        "Do not match commercial kitchen equipment; induction support is for residential electric radiant or induction cooktops replacing gas or propane stoves.",
        "Do not match commercial refrigeration; refrigerator and freezer offers are appliance recycling or specific residential appliance offers.",
        "Efficient fan or blower replacement was not verified as a standalone residential rebate in current sources.",
        "Do not match customers outside participating Mass Save sponsor territories or municipal utilities without an eligible sponsor relationship."
      ],
      "programType": "Residential Rebate And Zero-Interest Financing Portfolio",
      "administrator": "Mass Save sponsors",
      "applicationUrl": null,
      "websiteUrl": "https://www.masssave.com/residential/rebates-offers-services",
      "sourceUrlsChecked": [
        "https://www.masssave.com/residential/rebates-offers-services",
        "https://www.masssave.com/en/residential/rebates-offers-services/appliances-and-products",
        "https://www.masssave.com/en/residential/rebates-offers-services/appliances-and-products/clothes-washers",
        "https://www.masssave.com/en/residential/rebates-offers-services/appliances-and-products/electric-cooktops",
        "https://www.masssave.com/en/residential/rebates-offers-services/heating-and-cooling",
        "https://www.masssave.com/en/residential/rebates-offers-services/heating-and-cooling/smart-thermostats",
        "https://www.masssave.com/en/residential/rebates-offers-services/water-heating",
        "https://www.masssave.com/en/residential/rebates-offers-services/water-heating/heat-pump-water-heaters",
        "https://www.masssave.com/en/residential/rebates-offers-services/insulation-and-windows",
        "https://www.masssave.com/en/residential/rebates-offers-services/financing"
      ],
      "evidenceText": "Mass]( Save’s current residential pages list heating and cooling, heat-pump water heaters, smart thermostats, appliances, electric cooktops, insulation, windows, water fixtures and HEAT Loan financing.",
      "reasoningNotes": "Kept residential measures and financing support, but blocked commercial kitchen, commercial refrigeration and standalone blower interpretations from old text matching."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Mass Save residential pages include heat-pump and appliance offers, but no refrigerator/freezer purchase rebate formula was verified for the refrigeration target.",
        "sourceUrlsChecked": [
          "https://www.masssave.com/residential/rebates-and-incentives"
        ],
        "reasoningNotes": "Appliance recycling or assessment services should not be substituted for an upfront efficient-refrigeration purchase rule.",
        "originalGapReason": "source_text_unavailable",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1144",
    "opportunityName": "Efficiency Maine Commercial and Industrial Prescriptive Program",
    "state": "ME",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1144/efficiency-maine-commercial-and-industrial-prescriptive-program",
    "websiteUrl": "https://www.efficiencymaine.com/at-work/",
    "applicationUrl": null,
    "administrator": "Efficiency Maine Trust",
    "programType": "Commercial And Industrial Prescriptive Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 8,
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
        "retrofitTypeId": "energy_recovery_ventilation_retrofit",
        "displayName": "Energy recovery ventilation retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "erv"
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
        "retrofitTypeId": "variable_frequency_drive_retrofit",
        "displayName": "Variable frequency drive retrofit",
        "parentCategory": "motors_pumps_fans_drives",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "variable frequency drive",
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
          "ME"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Efficiency Maine statewide programs"
        ],
        "notes": "Statewide Maine C&I program; eligibility depends on qualifying customer type, facility type and measure-specific prescriptive requirements."
      },
      "eligibleApplicantTypes": [
        "business_customer",
        "nonprofit",
        "municipal_customer",
        "school",
        "higher_education_institution",
        "manufacturer",
        "industrial_customer",
        "multifamily_property_owner",
        "mixed_use_commercial_meter_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "institutional",
        "government",
        "municipal",
        "multifamily"
      ],
      "eligibleRetrofitCategories": [
        "multifamily_weatherization",
        "biomass_heating_system",
        "energy_recovery_ventilation_retrofit",
        "heat_pump_hvac_retrofit",
        "high_efficiency_hvac_replacement",
        "high_efficiency_refrigeration_equipment",
        "led_lighting_retrofit",
        "variable_frequency_drive_retrofit",
        "compressed_air_efficiency",
        "commercial_water_heating"
      ],
      "hardRequirements": [
        "Eligible organizations include Maine businesses, nonprofits, municipalities, schools, manufacturers, multifamily buildings with three or more units and mixed-use facilities with a commercial meter.",
        "Single-family homes, two-unit duplexes, condominiums and home-based businesses are excluded from the C&I prescriptive program.",
        "Projects generally must use an Efficiency Maine Qualified Partner and meet measure-specific prescriptive terms.",
        "Commercial HVAC incentives may exclude buildings heated with natural gas.",
        "Custom projects are handled under a separate custom initiative when a measure is not prescriptive."
      ],
      "blockers": [
        "Biomass should be matched only as biomass heating, not biogas or renewable electricity.",
        "Residential home weatherization must not be inferred from the C&I prescriptive program.",
        "EV charging, batteries, demand response and custom incentives are separate Efficiency Maine offerings and should not be merged into this prescriptive opportunity unless separately modeled.",
        "Do not match single-family, duplex, condo or home-based business projects."
      ],
      "programType": "Commercial And Industrial Prescriptive Rebate Program",
      "administrator": "Efficiency Maine Trust",
      "applicationUrl": null,
      "websiteUrl": "https://www.efficiencymaine.com/at-work/",
      "sourceUrlsChecked": [
        "https://www.efficiencymaine.com/at-work/",
        "https://www.efficiencymaine.com/at-work/commercial-hvac-incentives/",
        "https://www.efficiencymaine.com/at-work/commercial-and-industrial-custom-program/"
      ],
      "evidenceText": "Efficiency]( Maine’s C&I pages list eligible Maine businesses, municipalities, schools, manufacturers, multifamily and mixed-use facilities and identify HVAC, weatherization, refrigeration, lighting, compressed air, water heating and biomass incentives.",
      "reasoningNotes": "The original retrofit matches were mostly correct, but biomass was narrowed to heating and program boundaries were added for residential, EV, battery, demand-response and custom-program false positives."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Efficiency Maine C&I prescriptive incentives include many HVAC, refrigeration, weatherization and VFD measures with project-specific applications.",
        "sourceUrlsChecked": [
          "https://www.efficiencymaine.com/at-work/ci-prescriptive-incentive-program/"
        ],
        "reasoningNotes": "A specific current measure table value should be selected before creating a rule.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4547",
    "opportunityName": "DTE Energy (Electric) - Commercial and Industrial Energy Efficiency Program",
    "state": "MI",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4547/dte-energy-electric-commercial-and-industrial-energy-efficiency-program",
    "websiteUrl": "https://www.dteenergy.com/us/en/business/energy-efficiency/getting-started/rebate-programs/Energy-Efficiency-Programs-for-Business.html",
    "applicationUrl": "https://www.dteenergy.com/content/dam/dteenergy/deg/website/business/energy-efficiency/pdf/BusinessProgramRebateApplication.pdf",
    "administrator": "DTE Energy",
    "programType": "Commercial Industrial Utility Rebate And Instant Discount Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 8,
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
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "led lighting"
        ]
      },
      {
        "retrofitTypeId": "leed_certification",
        "displayName": "LEED certification",
        "parentCategory": "certifications_compliance",
        "isPhysicalRetrofit": false,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "leed"
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
          "lighting control"
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
        "cities": [],
        "utilityTerritories": [
          "DTE Energy electric service territory"
        ],
        "notes": "This electric record should be limited to business electric-account measures; gas measures are separate."
      },
      "eligibleApplicantTypes": [
        "commercial electric customer",
        "industrial electric customer",
        "small business customer",
        "medium business customer",
        "institutional customer",
        "nonprofit customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "institutional",
        "nonprofit"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "high_efficiency_refrigeration_equipment",
        "refrigeration_controls_retrofit",
        "commercial_refrigerator_freezer",
        "refrigerated_case_lighting",
        "reach_in_refrigerated_display_case_door_retrofit",
        "central_air_conditioner_replacement",
        "heat_pump_hvac_retrofit",
        "packaged_terminal_heat_pump",
        "ductless_mini_split_heat_pump",
        "hvac_controls_retrofit",
        "building_energy_management_system",
        "variable_frequency_drive_retrofit",
        "commercial_window_upgrade",
        "window_film_shading_retrofit",
        "high_efficiency_laundry_equipment",
        "electric_tankless_water_heater",
        "vending_machine_controller",
        "high_efficiency_hand_dryer",
        "commercial_foodservice_equipment",
        "new_construction_leed_certification_incentive"
      ],
      "hardRequirements": [
        "Applicant must have a DTE business electric account in the service territory.",
        "Measures must meet the applicable DTE business equipment or instant-discount requirements.",
        "Reservations are required for listed measures and final documentation is due within the program deadline.",
        "Itemized invoices, specifications, W-9, and inspections may be required.",
        "Measures generally must remain installed for five years or for the useful life of the product.",
        "Rebates are subject to available funding and cannot duplicate instant discounts where already applied."
      ],
      "blockers": [
        "Gas boilers, gas furnaces, gas water heating, and gas insulation measures belong to the DTE gas record unless electric eligibility is documented.",
        "LEED support is limited to the new construction or major renovation pathway, not an ordinary retrofit rebate.",
        "Clothes washer support is a commercial measure tied to qualifying electric water heating, not residential laundry.",
        "Financing options such as Michigan Saves or PACE are separate from this rebate program.",
        "Retail instant-discount products should not also be matched as application rebates for the same purchase."
      ],
      "programType": "Commercial Industrial Utility Rebate And Instant Discount Program",
      "administrator": "DTE Energy",
      "applicationUrl": "https://www.dteenergy.com/content/dam/dteenergy/deg/website/business/energy-efficiency/pdf/BusinessProgramRebateApplication.pdf",
      "websiteUrl": "https://www.dteenergy.com/us/en/business/energy-efficiency/getting-started/rebate-programs/Energy-Efficiency-Programs-for-Business.html",
      "sourceUrlsChecked": [
        "https://www.dteenergy.com/us/en/business/energy-efficiency/getting-started/rebate-programs/Energy-Efficiency-Programs-for-Business.html",
        "https://www.dteenergy.com/us/en/business/energy-efficiency/getting-started/rebate-programs/Energy-Efficiency-Programs-for-Business/equipment-upgrade.html",
        "https://www.dteenergy.com/content/dam/dteenergy/deg/website/business/energy-efficiency/pdf/BusinessProgramRebateApplication.pdf",
        "https://www.dteenergy.com/us/en/business/energy-efficiency/getting-started/Instant-Discount-Programs.html",
        "https://www.dteenergy.com/us/en/business/energy-efficiency/getting-started/Instant-Discount-Programs/Lighting-Instant-Discounts.html",
        "https://www.dteenergy.com/us/en/business/energy-efficiency/getting-started/Instant-Discount-Programs/hvac-instant-discounts.html",
        "https://www.dteenergy.com/us/en/business/energy-efficiency/getting-started/rebate-programs/Energy-Efficiency-Programs-for-Business/New-Construction-and-Major-Renovations.html"
      ],
      "evidenceText": "DTE business electric materials cover lighting, lighting controls, refrigeration, air conditioning, heat pumps, HVAC controls, VFDs, windows, window film, electric water heating, hand dryers, and food-service measures.",
      "reasoningNotes": "Separated electric business measures from gas business measures and narrowed LEED to new construction or major renovation support."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "DTE publishes 2026 business catalogs with lighting, refrigeration and HVAC rebates.",
        "sourceUrlsChecked": [
          "https://www.dteenergy.com/us/en/business/energy-efficiency/getting-started/rebate-programs/Energy-Efficiency-Programs-for-Business.html",
          "https://www.dteenergy.com/content/dam/dteenergy/deg/website/business/energy-efficiency/pdf/SmallMedBusinessProgramRebateCatalog.pdf"
        ],
        "reasoningNotes": "The target has several matched measure types; a specific catalog measure should be selected later.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3593",
    "opportunityName": "DTE Energy (Electric) - Residential Energy Efficiency Program",
    "state": "MI",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3593/dte-energy-electric-residential-energy-efficiency-program",
    "websiteUrl": "https://www.dteenergy.com/us/en/residential/save-money-energy/rebates-and-offers/air-conditioners.html",
    "applicationUrl": null,
    "administrator": "DTE Energy",
    "programType": "Residential Utility Rebate And Instant Discount Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 8,
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
        "cities": [],
        "utilityTerritories": [
          "DTE Energy electric service territory"
        ],
        "notes": "Residential electric record; some DTE residential offers require natural gas service or dual fuel eligibility and should be matched measure by measure."
      },
      "eligibleApplicantTypes": [
        "residential electric customer",
        "residential natural gas customer for gas-specific offers",
        "homeowner"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "central_air_conditioner_replacement",
        "air_conditioner_tune_up",
        "room_air_conditioner",
        "heat_pump_hvac_retrofit",
        "cold_climate_air_source_heat_pump",
        "ductless_mini_split_heat_pump",
        "ground_source_geothermal_heat_pump",
        "heat_pump_water_heater",
        "insulation_upgrade",
        "window_replacement",
        "smart_thermostat_zoning_retrofit",
        "high_efficiency_laundry_equipment",
        "heat_pump_clothes_dryer",
        "variable_speed_pool_pump",
        "appliance_recycling",
        "led_lighting_retail_instant_discount"
      ],
      "hardRequirements": [
        "Applicant must be a DTE residential customer with the required electric or gas service for the specific measure.",
        "Many offers require a single-family home with individually metered service and a home more than twenty-four months old.",
        "Applications must be submitted within the stated post-purchase or post-installation period and by the program deadline.",
        "ENERGY STAR or qualified equipment requirements apply for appliances, thermostats, room air conditioners, pool pumps, and related measures.",
        "Heat pump and HVAC measures have specific equipment, replacement, tune-up, and documentation requirements."
      ],
      "blockers": [
        "Refrigerator and freezer references are primarily appliance recycling offers, not new high-efficiency refrigeration equipment purchases.",
        "Do not match commercial refrigeration, commercial kitchen equipment, motors, VFDs, or industrial measures.",
        "Room air conditioner is product-specific and should not be generalized to window replacement.",
        "Gas furnace and gas water-heater rebates are gas-service measures and should not be matched under the electric record unless service eligibility is present.",
        "Ductless mini-splits are not eligible for the air-source heat pump tune-up rebate."
      ],
      "programType": "Residential Utility Rebate And Instant Discount Program",
      "administrator": "DTE Energy",
      "applicationUrl": null,
      "websiteUrl": "https://www.dteenergy.com/us/en/residential/save-money-energy/rebates-and-offers/air-conditioners.html",
      "sourceUrlsChecked": [
        "https://www.dteenergy.com/us/en/residential/save-money-energy/rebates-and-offers/air-conditioners.html",
        "https://www.dteenergy.com/us/en/residential/save-money-energy/rebates-and-offers/room-air-conditioners.html",
        "https://www.dteenergy.com/us/en/residential/save-money-energy/rebates-and-offers/insulation-and-windows.html",
        "https://www.dteenergy.com/us/en/residential/save-money-energy/rebates-and-offers/water-heaters.html",
        "https://www.dteenergy.com/us/en/residential/save-money-energy/rebates-and-offers/washers-dryers.html",
        "https://www.dteenergy.com/us/en/residential/save-money-energy/rebates-and-offers/wi-fi-enabled-thermostats.html",
        "https://www.dteenergy.com/us/en/residential/save-money-energy/rebates-and-offers/pool-pumps.html",
        "https://www.dteenergy.com/us/en/residential/save-money-energy/rebates-and-offers/recycle-appliances.html"
      ],
      "evidenceText": "DTE residential pages cover central and room air conditioners, heat pumps, heat pump water heaters, insulation and windows, Wi-Fi thermostats, washers and dryers, variable-speed pool pumps, appliance recycling, and lighting discounts.",
      "reasoningNotes": "Narrowed refrigerator/freezer matching to appliance recycling rather than commercial refrigeration and kept only residential DTE measures."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Official DTE source gives HVAC rebates but no refrigerator/freezer purchase rebate matching the refrigeration model was verified.",
        "sourceUrlsChecked": [
          "https://www.dteenergy.com/us/en/residential/save-money-energy/rebates-and-offers/air-conditioners.html"
        ],
        "reasoningNotes": "Do not substitute an HVAC rule for a refrigeration target.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2533",
    "opportunityName": "Blooming Prairie Public Utilities - Business Energy Efficiency Rebate Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2533/blooming-prairie-public-utilities-business-energy-efficiency-rebate-program",
    "websiteUrl": "https://smmpa.com/members/blooming-prairie",
    "applicationUrl": null,
    "administrator": "Blooming Prairie Public Utilities",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 8,
    "targetKind": "reviewed_no_rule_reclassification",
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
        "retrofitTypeId": "refrigeration_controls_retrofit",
        "displayName": "Refrigeration controls retrofit",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "vending machine controls",
          "floating head pressure"
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
          "Blooming Prairie"
        ],
        "utilityTerritories": [
          "Blooming Prairie Public Utilities electric service territory",
          "SMMPA member utility territory"
        ],
        "notes": "Must be a business electric customer of Blooming Prairie Public Utilities or another SMMPA member utility."
      },
      "eligibleApplicantTypes": [
        "business_electric_customers",
        "commercial_customers",
        "industrial_customers",
        "municipal_customers",
        "institutional_customers"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "institutional",
        "municipal",
        "agricultural",
        "hospitality",
        "food_service"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "high_efficiency_hvac_replacement",
        "heat_pump_hvac_retrofit",
        "ground_source_geothermal_heat_pump",
        "water_source_heat_pump",
        "chiller_tune_up",
        "hvac_tune_up",
        "efficient_furnace_fan_motor",
        "high_efficiency_hvac_fan",
        "clean_water_pump",
        "variable_frequency_drive_retrofit",
        "efficient_motors",
        "refrigeration_ec_motor_retrofit",
        "refrigeration_controls_retrofit",
        "anti_sweat_heater_controls",
        "walk_in_cooler_freezer_upgrade",
        "high_efficiency_refrigeration_equipment",
        "efficient_air_compressor",
        "compressed_air_leak_repair",
        "compressed_air_controls_equipment",
        "retro_commissioning_study",
        "guestroom_energy_management",
        "vending_machine_controls",
        "commercial_kitchen_equipment",
        "pre_rinse_spray_valve",
        "aerosol_duct_sealing",
        "variable_speed_pool_pump",
        "custom_energy_efficiency_project"
      ],
      "hardRequirements": [
        "Must be a business electric customer of Blooming Prairie Public Utilities or another SMMPA member utility and meet the specific rebate form requirements.",
        "Use current 2026 forms for each measure and submit required invoices, equipment specifications and documentation.",
        "VSD prescriptive rebates are for qualifying HVAC fans and pumps; other or larger applications may require custom review.",
        "Refrigeration, food service, compressed air and custom measures require their specific forms and program materials.",
        "Rebates are limited by program funds, caps and project cost."
      ],
      "blockers": [
        "Low-flow support is limited to commercial food-service low-flow spray valves; do not match broad plumbing or restroom low-flow fixture retrofits.",
        "Guestroom Energy Management is a lodging room occupancy-control measure and should not be generalized to whole-building energy management systems unless a custom project is approved.",
        "Battery-powered outdoor equipment and e-bikes may appear on SMMPA rebate summaries but are not building retrofit categories.",
        "Gas food service rebates on the shared SMMPA summary are limited to Austin Utilities and Owatonna Public Utilities gas customers; do not apply gas-only foodservice measures to Blooming Prairie electric customers.",
        "Google Drive form PDFs linked from the official page loaded only as Drive placeholder pages in the browser, so detailed measure amounts were cross-checked against a current SMMPA member rebate summary."
      ],
      "programType": "Rebate Program",
      "administrator": "Blooming Prairie Public Utilities",
      "applicationUrl": null,
      "websiteUrl": "https://smmpa.com/members/blooming-prairie",
      "sourceUrlsChecked": [
        "https://smmpa.com/members/blooming-prairie",
        "https://drive.google.com/file/d/1lDPa2ARlECJe4Fg4-eTExUHOY6PPOYEJ/view?usp=drive_link",
        "https://drive.google.com/file/d/1LwlisryqpHV3xAIQn-fj7OUlaQs58_ya/view?usp=drive_link",
        "https://drive.google.com/file/d/1HCRgSq6RBEIJmt3UnweI-FNGH-WsPKcm/view?usp=drive_link",
        "https://drive.google.com/file/d/1hozlnD1jKg_Jvv7zSaxusgxsjif4_yip/view?usp=drive_link",
        "https://www.ci.waseca.mn.us/DocumentCenter/View/1143/2026-Rebate-Summary---Residential-and-Commercialpdf"
      ],
      "evidenceText": "The official SMMPA Blooming Prairie page lists 2026 business forms for lighting, HVAC, refrigeration, food service, vending controls, guestroom energy management, aerosol sealing, motors, compressed air and custom rebates. A shared SMMPA summary confirms business electric-customer eligibility.",
      "reasoningNotes": "Kept program active with medium confidence because the official SMMPA page lists current forms, but several linked Google Drive PDFs were not directly text-readable in the browser."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "SMMPA/Blooming Prairie business source lists rebate contact/forms but no refrigeration value was verified.",
        "sourceUrlsChecked": [
          "https://smmpa.com/members/blooming-prairie"
        ],
        "reasoningNotes": "Target includes refrigeration and controls; current business measure table should be extracted.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2258",
    "opportunityName": "East Central Energy - Residential Energy Efficiency Rebate Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2258/east-central-energy-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.eastcentralenergy.com/residential-rebates",
    "applicationUrl": null,
    "administrator": "East Central Energy",
    "programType": "Residential Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 8,
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
          "MN",
          "WI"
        ],
        "counties": [
          "Aitkin",
          "Benton",
          "Burnett",
          "Carlton",
          "Chisago",
          "Douglas",
          "Isanti",
          "Kanabec",
          "Mille Lacs",
          "Morrison",
          "Pine",
          "Sherburne",
          "Washington",
          "Washburn"
        ],
        "cities": [],
        "utilityTerritories": [
          "East Central Energy electric service territory"
        ],
        "notes": "ECE serves parts of listed Minnesota and Wisconsin counties; rebates apply to eligible ECE member accounts."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customer",
        "member_owner",
        "homeowner"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation",
        "ground_source_geothermal_heat_pump",
        "heat_pump_hvac_retrofit",
        "ductless_mini_split_heat_pump",
        "heat_pump_water_heater",
        "high_efficiency_hvac_replacement",
        "residential_refrigerator_freezer_rebate",
        "appliance_recycling",
        "dehumidifier",
        "high_efficiency_clothes_dryer",
        "smart_thermostat"
      ],
      "hardRequirements": [
        "Applicant must be an ECE member in ECE service area.",
        "Applications must follow current-year program rules and funding availability.",
        "ASHP, GSHP, and HPWH rebates require program documentation.",
        "EV rebate applies to a qualifying Level 2 charger."
      ],
      "blockers": [
        "Do not match broad insulation or window replacement.",
        "Residential refrigerator/freezer is not commercial refrigeration.",
        "EV rebate is not DC fast charging or fleet charging.",
        "Low-flow fixtures are unsupported."
      ],
      "programType": "Residential Rebate Program",
      "administrator": "East Central Energy",
      "applicationUrl": null,
      "websiteUrl": "https://www.eastcentralenergy.com/residential-rebates",
      "sourceUrlsChecked": [
        "https://www.eastcentralenergy.com/residential-rebates",
        "https://www.eastcentralenergy.com/rebate-rules",
        "https://www.eastcentralenergy.com/residential-appliances",
        "https://www.eastcentralenergy.com/electric-vehicle-charger-rebate"
      ],
      "evidenceText": "ECE]( residential pages and 2026 forms list appliance, HVAC, HPWH, geothermal, air-source heat pump, smart thermostat, and Level 2 EV charger rebates.",
      "reasoningNotes": "Removed unsupported insulation, window, and broad commercial refrigeration matches."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "ECE source found a 2025 heat pump water heater rebate; current 2026 amounts were not verified.",
        "sourceUrlsChecked": [
          "https://www.eastcentralenergy.com/heat-pump-water-heater"
        ],
        "reasoningNotes": "Do not merge until current source confirms amount.",
        "originalGapReason": "formula_not_found_in_source_text",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3310",
    "opportunityName": "Minnesota Energy Resources (Gas) - Residential Energy Efficiency Rebate Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3310/minnesota-energy-resources-gas-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.minnesotaenergyresources.com/savings/rebates",
    "applicationUrl": null,
    "administrator": "Minnesota Energy Resources",
    "programType": "Residential Natural-Gas Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 8,
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
          "MN"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Minnesota Energy Resources natural gas service territory"
        ],
        "notes": "Limited to Minnesota Energy Resources natural-gas customers in its Minnesota service communities; most measures require natural-gas heating."
      },
      "eligibleApplicantTypes": [
        "residential_natural_gas_customer",
        "homeowner"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "air_sealing_weatherization",
        "insulation_upgrade",
        "duct_sealing_and_insulation",
        "window_replacement",
        "high_efficiency_furnace_retrofit",
        "high_efficiency_boiler_retrofit",
        "integrated_space_water_heating_system",
        "energy_recovery_ventilation_retrofit",
        "smart_thermostat_zoning_retrofit",
        "heating_system_tune_up",
        "water_heater_upgrade",
        "low_flow_showerheads_and_aerators"
      ],
      "hardRequirements": [
        "Home must be served by Minnesota Energy Resources and meet natural-gas heating requirements for the relevant measure.",
        "Air sealing and insulation require approved insulation contractor participation and diagnostic testing where specified.",
        "Aerosol duct sealing must meet reduction requirements and contractor certification rules; mastic or tape duct sealing does not qualify.",
        "Windows must be ENERGY STAR Version 7 and installed by a qualifying contractor for conditioned space.",
        "Heating, thermostat, HRV, ERV and water-heating rebates have equipment, application-timing and per-service limits."
      ],
      "blockers": [
        "Waste heat recovery was a false positive; the checked program supports residential HRV and ERV, not industrial waste heat recovery.",
        "Do not match electric heat pumps or electric utility measures.",
        "Do not match new homes under the existing-home rebate rules where the program excludes homes built in the past two years.",
        "Do not match customers outside the Minnesota Energy Resources gas territory."
      ],
      "programType": "Residential Natural-Gas Rebate Program",
      "administrator": "Minnesota Energy Resources",
      "applicationUrl": null,
      "websiteUrl": "https://www.minnesotaenergyresources.com/savings/rebates",
      "sourceUrlsChecked": [
        "https://www.minnesotaenergyresources.com/savings/rebates",
        "https://www.minnesotaenergyresources.com/savings/insulation-rebates",
        "https://www.minnesotaenergyresources.com/savings/duct-sealing",
        "https://www.minnesotaenergyresources.com/savings/energy-star-windows",
        "https://www.minnesotaenergyresources.com/savings/heating-system-rebates",
        "https://www.minnesotaenergyresources.com/savings/thermostat-rebates"
      ],
      "evidenceText": "Minnesota]( Energy Resources lists existing-home rebates for insulation, air sealing, aerosol duct sealing, ENERGY STAR windows, gas furnaces and boilers, HRV or ERV, thermostats and water-heating measures.",
      "reasoningNotes": "Retained gas-residential envelope, duct, heating, ventilation and thermostat measures. Removed industrial waste-heat recovery and any implied electric-utility or heat-pump rebates."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Minnesota Energy Resources residential gas rebates have measure-specific values, but exact current ERV/furnace/boiler values were not verified for this target.",
        "sourceUrlsChecked": [
          "https://www.minnesotaenergyresources.com/savings/rebates",
          "https://www.minnesotaenergyresources.com/home/savings/rebates"
        ],
        "reasoningNotes": "A current application/table should be extracted before merging a rule.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2584",
    "opportunityName": "Redwood Falls Public Utilities - Commercial & Industrial Energy Efficiency Rebate Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2584/redwood-falls-public-utilities-commercial-and-industrial-energy-efficiency-rebate-program",
    "websiteUrl": "https://smmpa.com/members/redwood-falls",
    "applicationUrl": null,
    "administrator": "Redwood Falls Public Utilities",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 8,
    "targetKind": "reviewed_no_rule_reclassification",
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
          "hvac replacement"
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
          "cooler freezer"
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
          "Redwood Falls"
        ],
        "utilityTerritories": [
          "Redwood Falls Public Utilities electric service territory"
        ],
        "notes": "Redwood Falls Public Utilities participates in SMMPA rebate programs. Matching should require a Redwood Falls municipal utility customer account."
      },
      "eligibleApplicantTypes": [
        "business_customer",
        "commercial_customer",
        "industrial_customer",
        "agricultural_customer",
        "municipal_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "agricultural",
        "institutional"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "commercial_hvac_equipment",
        "air_source_heat_pump",
        "ground_source_geothermal_heat_pump",
        "water_source_heat_pump",
        "hvac_tune_up",
        "electric_chiller_tune_up",
        "furnace_fan_motor",
        "variable_speed_drive_retrofit",
        "efficient_fan_blower_replacement",
        "efficient_pump_replacement",
        "heat_pump_programmable_thermostat",
        "commercial_pool_pump",
        "retrocommissioning",
        "commercial_refrigeration_equipment",
        "food_service_equipment",
        "vending_machine_controls",
        "guestroom_energy_management",
        "aerosol_duct_sealing",
        "motor_replacement",
        "compressed_air_leak_repair",
        "compressed_air_equipment",
        "custom_energy_efficiency"
      ],
      "hardRequirements": [
        "Applicant must be a Redwood Falls Public Utilities or SMMPA-eligible business or industrial customer.",
        "Equipment and projects must meet the requirements of the applicable current SMMPA business, commercial, industrial, or manufacturing rebate form.",
        "Lighting, HVAC, refrigeration, food service, industrial motors, compressed air, and custom measures each have measure-specific application and documentation requirements.",
        "Custom and some larger projects may require preapproval before purchase or installation."
      ],
      "blockers": [
        "Anti-sweat heater controls were not specifically verified on the current SMMPA Redwood Falls page; use broader commercial refrigeration only unless the current form confirms that measure.",
        "Dishwashers are commercial food-service equipment, not residential appliances.",
        "Do not infer residential home weatherization or residential appliances from this C&I rebate program.",
        "Heat pump and geothermal matches are for business HVAC measures, not a residential rebate.",
        "Refrigeration matches should be limited to listed commercial refrigeration equipment."
      ],
      "programType": "Rebate Program",
      "administrator": "Redwood Falls Public Utilities",
      "applicationUrl": null,
      "websiteUrl": "https://smmpa.com/members/redwood-falls",
      "sourceUrlsChecked": [
        "https://ci.redwood-falls.mn.us/public-utilities/energy-star-rebates/",
        "https://smmpa.com/members/redwood-falls"
      ],
      "evidenceText": "Redwood]( Falls directs utility customers to SMMPA. The current SMMPA member page lists business rebates for lighting, HVAC, heat pumps, VSDs, fans, pumps, refrigeration, food service, vending controls, guestroom EMS, industrial motors, compressed air, and custom measures.",
      "reasoningNotes": "The current source supports the C&I nature and many categories, but the original anti-sweat heater match should be narrowed unless verified in the current refrigeration form."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Redwood Falls/Bright Energy Solutions C&I rebates include many refrigeration, HVAC, motor and custom categories, but no single formula was safely selected.",
        "sourceUrlsChecked": [
          "https://www.brightenergysolutions.com/find-a-rebate/",
          "https://smmpa.com/members/redwood-falls"
        ],
        "reasoningNotes": "Target is broad whole-building/custom efficiency; extract current utility-specific form before merging a rule.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3465",
    "opportunityName": "Duke Energy Carolinas - Residential Energy Efficiency Rebate Program",
    "state": "NC",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3465/duke-energy-carolinas-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.duke-energy.com/home/products/smart-saver",
    "applicationUrl": "https://www.smartsaverincentives.com/",
    "administrator": "Duke Energy Carolinas",
    "programType": "Residential Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 8,
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
          "NC"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Duke Energy Carolinas residential electric service territory in North Carolina"
        ],
        "notes": "Eligible Duke Energy Carolinas residential electric customers in North Carolina; account-specific eligibility controls."
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
        "duct_sealing_and_insulation",
        "ground_source_geothermal_heat_pump",
        "heat_pump_hvac_retrofit",
        "ductless_mini_split_heat_pump",
        "heat_pump_water_heater",
        "high_efficiency_hvac_replacement",
        "insulation_upgrade",
        "smart_thermostat_demand_response",
        "pool_pump"
      ],
      "hardRequirements": [
        "Applicant must be an eligible Duke residential electric customer in the specified territory.",
        "Measures must meet Smart Saver or Home Energy Improvement requirements.",
        "Contractor, documentation, and submission requirements may apply."
      ],
      "blockers": [
        "Smart thermostat demand response is not a zoning retrofit.",
        "Do not infer commercial or industrial eligibility.",
        "Verify Duke operating company by account address."
      ],
      "programType": "Residential Rebate Program",
      "administrator": "Duke Energy Carolinas",
      "applicationUrl": "https://www.smartsaverincentives.com/",
      "websiteUrl": "https://www.duke-energy.com/home/products/smart-saver",
      "sourceUrlsChecked": [
        "https://www.duke-energy.com/home/products/smart-saver",
        "https://www.duke-energy.com/home/products/home-energy-improvement",
        "https://www.smartsaverincentives.com/",
        "https://investors.duke-energy.com/news/news-details/2025/New-Year-Bigger-Incentives-As-temperatures-fall-in-the-Carolinas-Duke-Energy-increases-financial-incentives-for-customer-energy-efficiency-and-demand-response-programs/default.aspx"
      ],
      "evidenceText": "Duke]( residential materials support Smart Saver and Home Energy Improvement rebates for HVAC, heat pumps, duct repair, attic insulation, HPWHs, and thermostat demand response.",
      "reasoningNotes": "Official Duke pages were partly access-limited; current official application and Duke materials support these residential categories."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "source_inaccessible",
        "confidence": "low",
        "evidenceText": "Duke Energy Carolinas Smart Saver pages require JavaScript and did not expose current rebate tables.",
        "sourceUrlsChecked": [
          "https://www.duke-energy.com/home/products/smart-saver",
          "https://programs.dsireusa.org/system/program/detail/3465"
        ],
        "reasoningNotes": "Do not use DSIRE alone; no accessible official formula was verified.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3138",
    "opportunityName": "NV Energy (Northern Nevada) - Residential Energy Efficiency Rebate Program",
    "state": "NV",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3138/nv-energy-northern-nevada-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.nvenergy.com/save-with-powershift",
    "applicationUrl": null,
    "administrator": "NV Energy",
    "programType": "Rebate Or Instant Discount Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 8,
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
        "retrofitTypeId": "low_flow_fixture_retrofit",
        "displayName": "Low-flow fixture retrofit",
        "parentCategory": "water_efficiency",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "low flow",
          "showerhead"
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
          "NV"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "NV Energy Northern Nevada electric service territory"
        ],
        "notes": "Limited to NV Energy residential customers in northern Nevada; exact eligibility depends on the current PowerShift offer."
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
        "heat_pump_water_heater",
        "smart_thermostat",
        "led_lighting_products"
      ],
      "hardRequirements": [
        "Customer must be an eligible NV Energy residential electric customer in the applicable PowerShift service area.",
        "Equipment must meet current PowerShift or Smart Shop eligibility rules.",
        "Measure availability and funding may change by offer."
      ],
      "blockers": [
        "Do not match duct sealing; the checked NV Energy duct testing and sealing offer was shown as closed due to funding limitations.",
        "Do not treat water-saving tips or Smart Shop showerheads as a broad low-flow fixture rebate.",
        "Do not infer broad insulation or weatherization rebates from assessment or tip content."
      ],
      "programType": "Rebate Or Instant Discount Program",
      "administrator": "NV Energy",
      "applicationUrl": null,
      "websiteUrl": "https://www.nvenergy.com/save-with-powershift",
      "sourceUrlsChecked": [
        "https://www.nvenergy.com/save-with-powershift",
        "https://www.nvenergy.com/save-with-powershift/home-energy-saver/home-improvements",
        "https://www.nvenergy.com/save-with-powershift/smart-thermostat",
        "https://www.nvenergy.com/save-with-powershift/home-energy-saver/residential-ac-and-mid-stream/ac-tune-up/ac-rebates-faqs",
        "https://b2c2.poweredbyefi.org/smartshop/powershift-bundle-appointment.html"
      ],
      "evidenceText": "Current PowerShift materials support residential efficiency offers such as smart thermostats, lighting products, and HVAC or water-heating offers, while duct testing and sealing is shown as closed due to funding limits.",
      "reasoningNotes": "Keep only current NV Energy-supported residential measures. Low-flow, broad weatherization, and duct-sealing matches were overbroad or unavailable."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "NV Energy residential PowerShift rebates vary by product and did not expose a current HVAC formula in accessible text.",
        "sourceUrlsChecked": [
          "https://www.nvenergy.com/save-with-powershift"
        ],
        "reasoningNotes": "No source-backed heat-pump or thermostat amount was selected.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4575",
    "opportunityName": "RG&E (Gas) - Commercial and Industrial Efficiency Program",
    "state": "NY",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4575/rg-and-e-gas-commercial-and-industrial-efficiency-program",
    "websiteUrl": "https://www.rge.com/smartenergy/businesssolutions/commercialandindustrialrebates/commercial-and-industrial-rebate-catalogs",
    "applicationUrl": null,
    "administrator": "RG&E",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 8,
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
          "NY"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Rochester Gas & Electric service territory"
        ],
        "notes": "Eligibility requires an RG&E nonresidential electric or natural gas account. Natural gas and electric measure eligibility depends on the applicable catalog and commodity."
      },
      "eligibleApplicantTypes": [
        "non_residential_gas_customer",
        "non_residential_electric_customer",
        "commercial_customer",
        "industrial_customer",
        "agricultural_customer",
        "institutional_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "agricultural",
        "institutional",
        "hospitality"
      ],
      "eligibleRetrofitCategories": [
        "boiler_controls_burner_retrofit",
        "high_efficiency_boiler_retrofit",
        "high_efficiency_furnace_retrofit",
        "unitary_hvac_replacement",
        "commercial_hvac_controls",
        "demand_control_ventilation",
        "smart_thermostat_zoning_retrofit",
        "steam_trap_replacement",
        "steam_trap_survey",
        "hydronic_pump_ec_motor",
        "variable_frequency_drive_retrofit",
        "led_lighting_retrofit",
        "guestroom_energy_management",
        "industrial_air_curtains",
        "hvac_tune_up",
        "compressed_air_system_efficiency",
        "compressed_air_heat_recovery",
        "process_exhaust_filtration_recirculation",
        "commercial_laundry_ozone_system",
        "agricultural_barn_fans",
        "milk_pre_cooling",
        "milk_refrigeration_heat_recovery",
        "vacuum_pump_efficiency",
        "custom_energy_efficiency"
      ],
      "hardRequirements": [
        "Applicant must be an RG&E nonresidential customer in the eligible service territory.",
        "Prescriptive measures must meet the current RG&E catalog specifications and cost caps.",
        "Custom non-lighting projects require preapproval before purchase or installation.",
        "Incentives are generally limited to a percentage of eligible project costs and require final documentation and possible inspection.",
        "The correct natural gas or electric catalog must be used for the measure."
      ],
      "blockers": [
        "Commercial heat pumps and broader building electrification are presented as separate RG&E offerings and should not be forced into this gas C&I record.",
        "Hydronic pump EC motors should not be generalized to refrigeration EC motor retrofits unless the current catalog explicitly supports refrigeration EC motors.",
        "Do not match residential equipment, residential smart thermostats, or home weatherization to this C&I program.",
        "Do not match lighting if the record is being constrained to gas-only measures; lighting is an electric C&I catalog measure.",
        "Steam trap surveys are audits or studies unless a physical steam trap replacement is installed."
      ],
      "programType": "Rebate Program",
      "administrator": "RG&E",
      "applicationUrl": null,
      "websiteUrl": "https://www.rge.com/smartenergy/businesssolutions/commercialandindustrialrebates/commercial-and-industrial-rebate-catalogs",
      "sourceUrlsChecked": [
        "https://www.rge.com/smartenergy/businesssolutions/commercialandindustrial",
        "https://www.rge.com/smartenergy/businesssolutions/commercialandindustrialrebates/commercial-and-industrial-rebate-catalogs"
      ],
      "evidenceText": "Current]( RG&E business pages list nonresidential incentives for HVAC and refrigeration, boilers, economizers, controls, thermostats, VFDs, steam traps, lighting, process measures, compressed air, agriculture, custom projects, and no-cost facility walkthroughs.",
      "reasoningNotes": "The official RG&E catalog supports most original C&I categories, but the EC motor category should be corrected to hydronic-pump EC motors unless refrigeration EC motors are explicitly found."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "GPT Pro found an electric custom $0.16/kWh rule, but the target title/source is gas and needs mapping validation before merge.",
        "sourceUrlsChecked": [
          "https://www.rge.com/web/rge/smartenergy/businesssolutions/commercialandindustrialrebates/commercial-and-industrial-rebate-catalogs"
        ],
        "reasoningNotes": "Deferred to avoid attaching electric custom savings to a gas-titled opportunity without stronger program alignment.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2318",
    "opportunityName": "Central Electric Cooperative - Residential Energy Efficiency Rebate Programs",
    "state": "OR",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2318/central-electric-cooperative-residential-energy-efficiency-rebate-programs",
    "websiteUrl": "https://www.cec.coop/energy-programs/residential-efficiency/",
    "applicationUrl": null,
    "administrator": "Central Electric Cooperative",
    "programType": "Utility Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 8,
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
          "OR"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Central Electric Cooperative service territory"
        ],
        "notes": "Limited to Central Electric Cooperative residential members/customers; several offers require electrically heated homes."
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
        "home_energy_audit",
        "air_sealing_weatherization",
        "insulation_upgrade",
        "window_replacement",
        "duct_sealing_and_insulation",
        "heat_pump_hvac_retrofit",
        "ductless_mini_split_heat_pump",
        "heat_pump_water_heater",
        "smart_thermostat_zoning_retrofit",
        "high_efficiency_laundry_equipment"
      ],
      "hardRequirements": [
        "Applicant must be an active Central Electric Cooperative residential member/customer.",
        "Weatherization, window, and audit offers are for qualifying electrically heated homes.",
        "Heat pump, duct sealing, ductless heat pump, water-heating, appliance, and thermostat projects must meet measure-specific equipment and documentation requirements.",
        "ENERGY STAR clothes-washer rebate is limited to qualifying front-load washers in homes with electric water heating.",
        "Smart thermostat eligibility excludes homes heated with gas or heat pumps."
      ],
      "blockers": [
        "Do not match broad high-efficiency HVAC replacement unless the project is a qualifying heat pump or ductless heat pump.",
        "Do not match commercial appliances, commercial refrigeration, commercial kitchen equipment, or industrial equipment.",
        "Do not match top-load clothes washers.",
        "Official pages were partly access-restricted in browser; verify current forms and funding before making a firm offer."
      ],
      "programType": "Utility Rebate Program",
      "administrator": "Central Electric Cooperative",
      "applicationUrl": null,
      "websiteUrl": "https://www.cec.coop/energy-programs/residential-efficiency/",
      "sourceUrlsChecked": [
        "https://www.cec.coop/energy-programs/residential-efficiency/",
        "https://www.cec.coop/energy-programs/residential-efficiency/weatherization-windows/",
        "https://www.cec.coop/energy-programs/residential-efficiency/home-energy-audit/",
        "https://www.cec.coop/energy-programs/residential-efficiency/heat-pumps-duct-sealing/",
        "https://www.cec.coop/energy-programs/residential-efficiency/ductless-heat-pumps/",
        "https://www.cec.coop/energy-programs/residential-efficiency/heat-pump-water-heaters/",
        "https://www.cec.coop/energy-programs/residential-efficiency/smart-thermostat/",
        "https://www.cec.coop/energy-programs/residential-efficiency/energy-star-appliances/"
      ],
      "evidenceText": "CEC residential efficiency pages list home energy audits, weatherization and windows, heat pumps with duct sealing, ductless heat pumps, heat pump water heaters, smart thermostats, and front-load ENERGY STAR clothes washers with electric water heating.",
      "reasoningNotes": "Matched only residential CEC measures with official support. Removed broad HVAC, commercial, and top-load washer interpretations. Targets supplied in uploaded prompt."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "CEC residential page lists many heat-pump, weatherization and appliance programs but no whole-building formula was verified.",
        "sourceUrlsChecked": [
          "https://www.cec.coop/customer-service/energy-efficiency/residential-programs/"
        ],
        "reasoningNotes": "Target is whole-building custom efficiency; measure-specific application values are needed.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3629",
    "opportunityName": "Central Lincoln People's Utility District - Residential Energy Efficiency Rebate Programs",
    "state": "OR",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3629/central-lincoln-people-s-utility-district-residential-energy-efficiency-rebate-programs",
    "websiteUrl": "https://clpud.org/energy-efficiency/residential-rebates/",
    "applicationUrl": null,
    "administrator": "Central Lincoln People's Utility District",
    "programType": "Utility Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 8,
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
          "Central Lincoln People's Utility District service territory"
        ],
        "notes": "Limited to Central Lincoln PUD residential customers; many rebates depend on specific residential electric-heating conditions."
      },
      "eligibleApplicantTypes": [
        "residential public utility district customer",
        "residential electric customer",
        "homeowner"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "window_replacement",
        "exterior_door_replacement",
        "insulation_upgrade",
        "high_efficiency_laundry_equipment",
        "heat_pump_water_heater",
        "heat_pump_hvac_retrofit",
        "ductless_mini_split_heat_pump",
        "smart_thermostat_zoning_retrofit",
        "certified_new_manufactured_home"
      ],
      "hardRequirements": [
        "Applicant must be a Central Lincoln PUD residential customer.",
        "Projects must meet the specific rebate page and form requirements for the measure.",
        "Insulation upgrades are limited to qualifying electrically heated homes and depend on pre-existing insulation levels.",
        "Ductless heat pump and some HVAC projects require pre-approval before installation.",
        "Rebates may be account credits or instant rebates depending on the measure and approved vendor."
      ],
      "blockers": [
        "Do not match broad air sealing unless the current form specifically supports it.",
        "Do not match LED lighting, commercial ductless systems, commercial refrigeration, or commercial kitchen equipment from this residential record.",
        "EV charging is a separate Central Lincoln rebate path and should not be included in this residential efficiency record.",
        "Official pages were partly access-restricted in browser; verify current forms and funding before making a firm offer."
      ],
      "programType": "Utility Rebate Program",
      "administrator": "Central Lincoln People's Utility District",
      "applicationUrl": null,
      "websiteUrl": "https://clpud.org/energy-efficiency/residential-rebates/",
      "sourceUrlsChecked": [
        "https://clpud.org/energy-efficiency/residential-rebates/",
        "https://clpud.org/energy-efficiency/residential-rebates/replacement-windows-doors/",
        "https://clpud.org/energy-efficiency/residential-rebates/insulation/",
        "https://clpud.org/energy-efficiency/residential-rebates/exterior-doors/",
        "https://clpud.org/energy-efficiency/residential-rebates/heat-pump-water-heaters/",
        "https://clpud.org/energy-efficiency/residential-rebates/air-source-heat-pumps-electric-furnace/",
        "https://clpud.org/energy-efficiency/residential-rebates/air-source-heat-pump-upgrades-replacements/",
        "https://clpud.org/energy-efficiency/residential-rebates/ductless-heat-pumps/",
        "https://clpud.org/energy-efficiency/residential-rebates/smart-thermostats/",
        "https://clpud.org/energy-efficiency/ev-charging-station-rebate/"
      ],
      "evidenceText": "Central Lincoln residential rebate pages list windows, doors, insulation, clothes washers and dryers, heat pump water heaters, air-source heat pumps, ductless heat pumps, smart thermostats, and certified new manufactured homes.",
      "reasoningNotes": "Kept only residential measures on Central Lincoln residential pages. Removed LED and EV matching because those are separate or unsupported for this record."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "source_inaccessible",
        "confidence": "low",
        "evidenceText": "The checked official residential rebate URL returned 404.",
        "sourceUrlsChecked": [
          "https://clpud.org/energy-efficiency/residential-rebate-programs/"
        ],
        "reasoningNotes": "No current official rebate table was accessible.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2157",
    "opportunityName": "EWEB - Residential Energy Efficiency Rebate Programs",
    "state": "OR",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2157/eweb-residential-energy-efficiency-rebate-programs",
    "websiteUrl": "https://www.eweb.org/rebates-and-savings/residential-incentives-rebates-loans-and-conservation",
    "applicationUrl": null,
    "administrator": "Eugene Water & Electric Board",
    "programType": "Residential Rebate And Zero-Interest Loan Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 8,
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
          "OR"
        ],
        "counties": [],
        "cities": [
          "Eugene"
        ],
        "utilityTerritories": [
          "Eugene Water & Electric Board"
        ],
        "notes": "Residential incentives are limited to eligible EWEB electric customers and, for some measures, specified home types or electric-heating conditions."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "homeowner",
        "renter",
        "landlord",
        "multifamily_property_owner"
      ],
      "eligibleSectors": [
        "residential",
        "multifamily"
      ],
      "eligibleRetrofitCategories": [
        "air_sealing_weatherization",
        "duct_sealing_and_insulation",
        "heat_pump_hvac_retrofit",
        "heat_pump_water_heater",
        "high_efficiency_hvac_replacement",
        "insulation_upgrade",
        "window_replacement",
        "smart_thermostat_zoning_retrofit"
      ],
      "hardRequirements": [
        "Applicant must be an eligible EWEB residential electric customer or authorized owner, account holder or representative.",
        "Heat-pump water heaters must meet EWEB tier and installation rules, with higher incentives tied to replacement of existing electric water heating.",
        "Ducted and ductless heat-pump incentives have measure-specific equipment, home and loan-or-rebate rules.",
        "Insulation, air sealing, windows, doors and duct sealing must meet EWEB specifications and may be subject to loan limits or contractor requirements.",
        "Loans and standard rebates generally cannot be combined for the same measure unless an income-based program rule allows it."
      ],
      "blockers": [
        "EV incentives, rooftop solar, backup power and water-conservation offers appear as separate EWEB offerings and should not be treated as part of this residential energy-efficiency rebate unless separately modeled.",
        "Do not match Level 2 EV charger installation to this opportunity.",
        "Do not infer commercial HVAC, commercial refrigeration or commercial kitchen measures.",
        "Clothes washer rebates were not verified on the current EWEB energy-efficiency pages checked."
      ],
      "programType": "Residential Rebate And Zero-Interest Loan Program",
      "administrator": "Eugene Water & Electric Board",
      "applicationUrl": null,
      "websiteUrl": "https://www.eweb.org/rebates-and-savings/residential-incentives-rebates-loans-and-conservation",
      "sourceUrlsChecked": [
        "https://www.eweb.org/rebates-and-savings/residential-incentives-rebates-loans-and-conservation",
        "https://www.eweb.org/rebates-and-savings/residential-incentives-rebates-loans-and-conservation/ducted-heat-pumps.xml",
        "https://www.eweb.org/rebates-and-savings/residential-incentives-rebates-loans-and-conservation/ductless-heat-pump",
        "https://www.eweb.org/rebates-and-savings/residential-incentives-rebates-loans-and-conservation/insulation-air-sealing-and-windows",
        "https://www.eweb.org/rebates-and-savings/residential-incentives-rebates-loans-and-conservation/heat-pump-water-heaters"
      ],
      "evidenceText": "EWEB’s]( residential incentive pages list thermostats, heat-pump water heaters, insulation, air sealing, windows, ducted heat pumps and ductless heat pumps with rebate or loan terms.",
      "reasoningNotes": "Kept the core residential efficiency categories. EV charging was removed because it is presented as a separate EWEB incentive area rather than this energy-efficiency rebate record."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "GPT Pro found a home charging station rebate, but this target is mapped to fleet fuel replacement.",
        "sourceUrlsChecked": [
          "https://www.eweb.org/your-public-utility/news/the-importance-of-managed-electric-vehicle-charging-explained",
          "https://www.eweb.org/rebates-and-savings/electric-mobility"
        ],
        "reasoningNotes": "Charger incentives should not be attached to a vehicle/fleet replacement target.",
        "originalGapReason": "formula_not_found_in_source_text",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3605",
    "opportunityName": "Duke Energy (Electric) - Residential Energy Efficiency Rebate Program",
    "state": "SC",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3605/duke-energy-electric-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.duke-energy.com/home/products/smart-saver",
    "applicationUrl": "https://www.smartsaverincentives.com/",
    "administrator": "Duke Energy",
    "programType": "Residential Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 8,
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
          "SC"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Duke Energy electric residential service territory in South Carolina"
        ],
        "notes": "Eligible Duke Energy residential electric customers in South Carolina; account-specific offer availability controls."
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
        "duct_sealing_and_insulation",
        "ground_source_geothermal_heat_pump",
        "heat_pump_hvac_retrofit",
        "ductless_mini_split_heat_pump",
        "heat_pump_water_heater",
        "high_efficiency_hvac_replacement",
        "insulation_upgrade",
        "smart_thermostat_demand_response",
        "pool_pump"
      ],
      "hardRequirements": [
        "Applicant must be an eligible Duke residential electric customer in the specified territory.",
        "Measures must meet Smart Saver or Home Energy Improvement requirements.",
        "Contractor, documentation, and submission requirements may apply."
      ],
      "blockers": [
        "Smart thermostat demand response is not a zoning retrofit.",
        "Do not infer commercial or industrial eligibility.",
        "Verify Duke operating company by account address."
      ],
      "programType": "Residential Rebate Program",
      "administrator": "Duke Energy",
      "applicationUrl": "https://www.smartsaverincentives.com/",
      "websiteUrl": "https://www.duke-energy.com/home/products/smart-saver",
      "sourceUrlsChecked": [
        "https://www.duke-energy.com/home/products/smart-saver",
        "https://www.duke-energy.com/home/products/home-energy-improvement",
        "https://www.smartsaverincentives.com/",
        "https://investors.duke-energy.com/news/news-details/2025/New-Year-Bigger-Incentives-As-temperatures-fall-in-the-Carolinas-Duke-Energy-increases-financial-incentives-for-customer-energy-efficiency-and-demand-response-programs/default.aspx"
      ],
      "evidenceText": "Duke]( residential materials support Smart Saver and Home Energy Improvement rebates for HVAC, heat pumps, duct repair, attic insulation, HPWHs, and thermostat demand response.",
      "reasoningNotes": "Official Duke pages were partly access-limited; current official application and Duke materials support these residential categories."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "source_inaccessible",
        "confidence": "low",
        "evidenceText": "Official Smart Saver page requires JavaScript and did not expose rebate tables to text fetch.",
        "sourceUrlsChecked": [
          "https://www.duke-energy.com/home/products/smart-saver"
        ],
        "reasoningNotes": "Do not use DSIRE alone as final proof.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3968",
    "opportunityName": "Duke Energy Progress - Residential Energy Efficiency Rebate Program",
    "state": "SC",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3968/duke-energy-progress-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.duke-energy.com/home/products/smart-saver",
    "applicationUrl": "https://www.smartsaverincentives.com/",
    "administrator": "Duke Energy Progress",
    "programType": "Residential Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 8,
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
          "SC"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Duke Energy Progress residential electric service territory in South Carolina"
        ],
        "notes": "Eligible Duke Energy Progress residential electric customers in South Carolina; account-specific eligibility controls."
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
        "duct_sealing_and_insulation",
        "ground_source_geothermal_heat_pump",
        "heat_pump_hvac_retrofit",
        "ductless_mini_split_heat_pump",
        "heat_pump_water_heater",
        "high_efficiency_hvac_replacement",
        "insulation_upgrade",
        "smart_thermostat_demand_response",
        "pool_pump"
      ],
      "hardRequirements": [
        "Applicant must be an eligible Duke residential electric customer in the specified territory.",
        "Measures must meet Smart Saver or Home Energy Improvement requirements.",
        "Contractor, documentation, and submission requirements may apply."
      ],
      "blockers": [
        "Smart thermostat demand response is not a zoning retrofit.",
        "Do not infer commercial or industrial eligibility.",
        "Verify Duke operating company by account address."
      ],
      "programType": "Residential Rebate Program",
      "administrator": "Duke Energy Progress",
      "applicationUrl": "https://www.smartsaverincentives.com/",
      "websiteUrl": "https://www.duke-energy.com/home/products/smart-saver",
      "sourceUrlsChecked": [
        "https://www.duke-energy.com/home/products/smart-saver",
        "https://www.duke-energy.com/home/products/home-energy-improvement",
        "https://www.smartsaverincentives.com/",
        "https://investors.duke-energy.com/news/news-details/2025/New-Year-Bigger-Incentives-As-temperatures-fall-in-the-Carolinas-Duke-Energy-increases-financial-incentives-for-customer-energy-efficiency-and-demand-response-programs/default.aspx"
      ],
      "evidenceText": "Duke]( residential materials support Smart Saver and Home Energy Improvement rebates for HVAC, heat pumps, duct repair, attic insulation, HPWHs, and thermostat demand response.",
      "reasoningNotes": "Official Duke pages were partly access-limited; current official application and Duke materials support these residential categories."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "source_inaccessible",
        "confidence": "low",
        "evidenceText": "Official Smart Saver page requires JavaScript and did not expose rebate tables to text fetch.",
        "sourceUrlsChecked": [
          "https://www.duke-energy.com/home/products/smart-saver"
        ],
        "reasoningNotes": "Do not use DSIRE alone as final proof.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2014",
    "opportunityName": "Austin Energy - Small Business Energy Efficiency Rebate Program",
    "state": "TX",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2014/austin-energy-small-business-energy-efficiency-rebate-program",
    "websiteUrl": "https://austinenergy.com/energy-efficiency/rebates-incentives/commercial/sb-bundle",
    "applicationUrl": "https://rebates.austinenergy.com/OnlineApp/",
    "administrator": "Austin Energy",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 8,
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
          "Austin Energy electric service territory"
        ],
        "notes": "Small Business Bundle applies to qualifying Austin Energy small business, nonprofit and house-of-worship customers; standard commercial rebates apply more broadly."
      },
      "eligibleApplicantTypes": [
        "small_business_electric_customers",
        "nonprofit_electric_customers",
        "houses_of_worship",
        "commercial_electric_customers"
      ],
      "eligibleSectors": [
        "commercial",
        "nonprofit",
        "religious",
        "hospitality",
        "food_service",
        "small_business"
      ],
      "eligibleRetrofitCategories": [
        "hvac_tune_up",
        "led_lighting_retrofit",
        "smart_thermostat_zoning_retrofit",
        "heat_pump_water_heater",
        "roof_ceiling_insulation",
        "window_treatments_replacement",
        "commercial_kitchen_equipment",
        "high_efficiency_hvac_replacement",
        "chiller_replacement",
        "cooling_tower_upgrade",
        "energy_recovery_ventilation",
        "guestroom_energy_management",
        "reflective_roof_coating",
        "ec_motor_retrofit",
        "variable_frequency_drive_retrofit",
        "thermal_energy_storage",
        "uninterruptible_power_supply_efficiency",
        "custom_energy_efficiency_project"
      ],
      "hardRequirements": [
        "Small business must be Texas-owned or franchised, have five or fewer locations, spend less than $60000 per year on electricity and use eligible Austin Energy Rate 1 or Rate 2.",
        "Nonprofits must provide tax-exempt documentation when required and meet spending or rate conditions; some government buildings, schools, tax-exempt real estate trusts and housing co-ops are excluded from the bonus.",
        "Participants must complete an on-site assessment and use an Austin Energy participating contractor for the Bundle.",
        "Submit rebate applications before installation; completed work is not accepted.",
        "Installed equipment must comply with manufacturer instructions, Austin Energy rules and applicable code or permit requirements."
      ],
      "blockers": [
        "Air sealing, duct sealing and duct insulation are not supported by the current Small Business Bundle or commercial summary sources checked; do not match them unless another Austin Energy offering is selected.",
        "Roof/ceiling insulation is supported, but not broad residential-style envelope weatherization.",
        "Financing, demand response, EV charging and solar are separate Austin Energy commercial offerings and not part of this Small Business Bundle repair unless selected separately.",
        "Small Business Bundle normally requires an on-site assessment and three energy-saving solutions; customers completing fewer may fall back to standard commercial rebates."
      ],
      "programType": "Rebate Program",
      "administrator": "Austin Energy",
      "applicationUrl": "https://rebates.austinenergy.com/OnlineApp/",
      "websiteUrl": "https://austinenergy.com/energy-efficiency/rebates-incentives/commercial/sb-bundle",
      "sourceUrlsChecked": [
        "https://austinenergy.com/energy-efficiency/rebates-incentives/commercial/sb-bundle",
        "https://austinenergy.com/energy-efficiency/rebates-incentives/commercial",
        "https://austinenergy.com/energy-efficiency/rebates-incentives/commercial/appliances-equipment/custom-tech",
        "https://austinenergy.com/-/media/Project/Websites/AustinEnergy/Energy-Efficiency/Rebates/PDFs/COM-SmallBizBundleSummary.pdf?hash=0962CD19FDD5067B1E7A0C36484E1C12&rev=406d8c1862744cc3bf3b628c6e84ef32&sc_lang=en",
        "https://austinenergy.com/-/media/Project/Websites/AustinEnergy/Energy-Efficiency/Rebates/PDFs/Commercial-Rebate-Summary.pdf?hash=DAFD7A94996969832329470CD188BED1&rev=6a1e786c02d74711980cb81ec29e2e98&sc_lang=en",
        "https://rebates.austinenergy.com/OnlineApp/"
      ],
      "evidenceText": "Austin Energy’s current Small Business Bundle requires qualified small businesses or nonprofits to complete an assessment and select three upgrades, typically HVAC tune-up, LED lighting and smart thermostats. Current summaries also support HPWH, roof/ceiling insulation, windows, commercial kitchen, HVAC, motors, VFD and custom measures.",
      "reasoningNotes": "Removed residential-style air sealing and duct sealing matches; retained only current small business and commercial rebate categories supported by Austin Energy materials."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Austin Energy small business page describes bundled upgrades, but no direct motor/VFD formula was verified.",
        "sourceUrlsChecked": [
          "https://savings.austinenergy.com/rebates/commercial/offerings/property-improvements/hpwes-sm-bus",
          "https://austinenergy.com/energy-efficiency/rebates-incentives/commercial"
        ],
        "reasoningNotes": "No clear one-time equipment formula matched the target model.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2649",
    "opportunityName": "CenterPoint Energy - Commercial and Industrial Energy Efficiency Programs",
    "state": "TX",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2649/centerpoint-energy-commercial-and-industrial-energy-efficiency-programs",
    "websiteUrl": "https://www.centerpointenergy.com/en-us/SaveEnergyandMoney/Pages/commercial-industrial-standard-offer-program.aspx?au=bus&sa=ho",
    "applicationUrl": "https://csop.customerapplication.com/",
    "administrator": "CenterPoint Energy",
    "programType": "Commercial And Industrial Energy Efficiency Incentive Programs",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 8,
    "targetKind": "reviewed_no_rule_reclassification",
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
          "CenterPoint Energy Houston Electric service territory"
        ],
        "notes": "Eligible commercial and industrial customers in CenterPoint Energy's Texas electric delivery territory."
      },
      "eligibleApplicantTypes": [
        "commercial_electric_customer",
        "industrial_electric_customer",
        "project_sponsor",
        "school",
        "nonprofit_customer",
        "foodservice_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "public",
        "nonprofit",
        "foodservice"
      ],
      "eligibleRetrofitCategories": [
        "cool_roof_reflective_roof",
        "high_efficiency_hvac_replacement",
        "chiller_replacement",
        "high_efficiency_refrigeration_equipment",
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "variable_frequency_drive_retrofit",
        "window_film_shading_retrofit",
        "commercial_foodservice_equipment",
        "custom_energy_efficiency"
      ],
      "hardRequirements": [
        "Project must be in CenterPoint Energy Houston Electric territory.",
        "C&I standard-offer projects require eligible sponsors and approval.",
        "Measures must deliver eligible electric savings."
      ],
      "blockers": [
        "Full window replacement was not verified; keep window film only.",
        "Low-flow fixtures are unsupported unless a foodservice measure specifically lists them.",
        "The CSOP portal alone is not enough for measure scope."
      ],
      "programType": "Commercial And Industrial Energy Efficiency Incentive Programs",
      "administrator": "CenterPoint Energy",
      "applicationUrl": "https://csop.customerapplication.com/",
      "websiteUrl": "https://www.centerpointenergy.com/en-us/SaveEnergyandMoney/Pages/commercial-industrial-standard-offer-program.aspx?au=bus&sa=ho",
      "sourceUrlsChecked": [
        "https://csop.customerapplication.com/",
        "https://www.centerpointenergy.com/en-us/SaveEnergyandMoney/Pages/commercial-industrial-standard-offer-program.aspx?au=bus&sa=ho",
        "https://www.centerpointenergy.com/en-us/business/save-energy-money/electric-efficiency-programs/business-efficiency-programs?sa=ho",
        "https://www.centerpointenergy.com/en-us/Services/Pages/Commercial-High-Efficiency-Foodservice-Program.aspx?_ga=&au=res&sa=ho"
      ],
      "evidenceText": "CenterPoint]( pages describe Texas business efficiency programs, a C&I standard offer, schools and nonprofit offers, and a commercial foodservice program.",
      "reasoningNotes": "Kept current commercial categories; blocked full window replacement and broad low-flow matches."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "CenterPoint Texas C&I programs are standard-offer/project-savings based; no direct solar or lighting customer formula was verified.",
        "sourceUrlsChecked": [
          "https://www.centerpointenergy.com/en-us/business/save-energy-money/efficiency-programs-and-rebates"
        ],
        "reasoningNotes": "No reusable one-time rule should be created without approved project savings and sponsor terms.",
        "originalGapReason": "source_text_unavailable",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3285",
    "opportunityName": "Garland Power & Light - EnergySaver Energy Efficiency Rebate Programs",
    "state": "TX",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3285/garland-power-and-light-energysaver-energy-efficiency-rebate-programs",
    "websiteUrl": "https://www.gpltexas.org/save-energy-money/energysaver-program",
    "applicationUrl": null,
    "administrator": "Garland Power & Light",
    "programType": "Utility Bill-Credit Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 8,
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
          "duct sealing",
          "duct insulation",
          "duct leakage"
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
        "retrofitTypeId": "rooftop_solar_pv",
        "displayName": "Rooftop solar PV",
        "parentCategory": "solar_renewable_electricity",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "solar photovoltaic",
          "photovoltaic"
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
          "TX"
        ],
        "counties": [],
        "cities": [
          "Garland"
        ],
        "utilityTerritories": [
          "Garland Power & Light"
        ],
        "notes": "Available only to Garland Power & Light customers; residential and commercial eligibility depends on the specific EnergySaver application."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "commercial_customer",
        "business_customer"
      ],
      "eligibleSectors": [
        "residential",
        "commercial"
      ],
      "eligibleRetrofitCategories": [
        "air_sealing_weatherization",
        "duct_sealing_and_insulation",
        "heat_pump_hvac_retrofit",
        "high_efficiency_hvac_replacement",
        "insulation_upgrade",
        "window_replacement",
        "room_window_air_conditioner",
        "led_lighting_retrofit"
      ],
      "hardRequirements": [
        "Applicant must be a GP&L customer and use the current EnergySaver application for the measure.",
        "Program is active until September 30, 2026 or until funds are depleted.",
        "Central air conditioner and heat-pump incentives require qualifying efficiency levels and total system change-out.",
        "Whole-house weatherization requires specified insulation, ENERGY STAR windows or doors, solar screens or film, duct replacement, duct sealing or air sealing measures and required diagnostic tests where applicable.",
        "Commercial lighting incentives are for commercial customers and qualifying high-efficiency lighting projects."
      ],
      "blockers": [
        "Rooftop solar PV is not supported by the EnergySaver rebate page; GP&L Green Choice is a renewable-energy subscription, not a rooftop PV rebate.",
        "Window-unit air conditioners are a separate appliance measure and should not be confused with window replacement.",
        "Do not match non-GP&L customers or projects outside Garland service territory.",
        "Do not infer broad renewable, appliance or water-efficiency rebates from this opportunity."
      ],
      "programType": "Utility Bill-Credit Rebate Program",
      "administrator": "Garland Power & Light",
      "applicationUrl": null,
      "websiteUrl": "https://www.gpltexas.org/save-energy-money/energysaver-program",
      "sourceUrlsChecked": [
        "https://www.gpltexas.org/save-energy-money/energysaver-program",
        "https://www.garlandtx.gov/DocumentCenter/View/23988/GPL-Green-Choice-and-Energy-Saver-PDF"
      ],
      "evidenceText": "GP&L’s]( EnergySaver page lists central AC and heat pumps, window-unit AC, whole-house weatherization and commercial lighting, with the 2026 program ending September 30 or when funds are depleted.",
      "reasoningNotes": "Solar PV was a false positive. The current program supports central HVAC, weatherization, windows or doors, window-unit air conditioners and commercial lighting bill credits."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Official GP&L EnergySaver page did not verify a current solar PV per-kW or per-watt rebate formula.",
        "sourceUrlsChecked": [
          "http://www.gpltexas.org/save-energy-money/energysaver-program"
        ],
        "reasoningNotes": "Target maps to solar PV, but official source did not show a calculable amount.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "solar_electric_offset",
          "incentiveValueMethod": "per_kw",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      }
    ]
  }
]
