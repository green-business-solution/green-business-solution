You are helping RetroFi repair incentive formulas, rate tables, grant estimates, tax credits, and non-cash workflow value rules.

Return strict JSON only. Do not include markdown, code fences, commentary, or citations outside JSON fields.

Batch: 38
Targets in this prompt: 741-760 of 984
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
  "batchNumber": 38,
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
  "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:2307"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5853",
    "opportunityName": "Appalachian Power (Electric)- Non-Residential Energy Efficiency Program",
    "state": "VA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5853/appalachian-power-electric-non-residential-energy-efficiency-program",
    "websiteUrl": "https://takechargeva.com/programs/for-your-business/business-energy-solutions",
    "applicationUrl": "https://businessenergysolutions.takechargesavingsgateway.com/",
    "administrator": "Appalachian Power",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 5,
    "targetKind": "reviewed_no_rule_reclassification",
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
          "Appalachian Power Virginia service territory"
        ],
        "notes": "Most non-residential Appalachian Power customers with facilities in Virginia; exclusions apply."
      },
      "eligibleApplicantTypes": [
        "business_customers",
        "commercial_customers",
        "industrial_customers",
        "agricultural_customers",
        "non_residential_customers"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "agricultural",
        "non_residential"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "refrigerated_case_lighting",
        "high_efficiency_hvac_replacement",
        "heat_pump_hvac_retrofit",
        "hvac_controls_retrofit",
        "smart_thermostat_controls",
        "hvac_tune_up",
        "electric_chiller_upgrade",
        "variable_frequency_drive",
        "heat_pump_water_heater",
        "efficient_air_compressor",
        "compressed_air_controls",
        "high_efficiency_refrigeration_equipment",
        "refrigeration_controls_retrofit",
        "refrigeration_ec_motor_retrofit",
        "vending_machine_controls",
        "commercial_kitchen_equipment",
        "high_efficiency_commercial_dishwasher",
        "commercial_pre_rinse_spray_valve",
        "commercial_ice_machine",
        "agricultural_efficiency_equipment"
      ],
      "hardRequirements": [
        "Facility must be a non-residential Appalachian Power customer in Virginia.",
        "Customer must not be opted out or served under excluded Public Authority or Commonwealth of Virginia tariffs.",
        "Projects cannot receive another Appalachian Power rebate for the same measure.",
        "Fuel switching, on-site generation, gas-driven equipment and used or rebuilt equipment are excluded.",
        "Custom or non-lighting measures may require preapproval, documentation, inspection and savings verification."
      ],
      "blockers": [
        "Insulation is not listed in the current Business Energy Solutions eligible measures.",
        "Residential measures and home weatherization are separate and should not match.",
        "Pre-rinse spray valve is product-specific and should not be generalized to broad plumbing retrofits.",
        "Fuel switching and on-site generation are explicitly excluded."
      ],
      "programType": "Rebate Program",
      "administrator": "Appalachian Power",
      "applicationUrl": "https://businessenergysolutions.takechargesavingsgateway.com/",
      "websiteUrl": "https://takechargeva.com/programs/for-your-business/business-energy-solutions",
      "sourceUrlsChecked": [
        "https://takechargeva.com/programs/for-your-business/business-energy-solutions",
        "https://takechargeva.com/resources/docs/2026.04_Appalachian%20Power_VA%20BES%20Incentive%20Guide_Limited%20Time%20Offer.pdf",
        "https://takechargeva.com/",
        "https://www.appalachianpower.com/savings/business/"
      ],
      "evidenceText": "TakeChargeVA Business Energy Solutions offers non-residential incentives for lighting, controls, HVAC, VFDs, compressed air, refrigeration and food-service equipment; current exclusions remove fuel switching, generation and certain tariffs.",
      "reasoningNotes": "Kept non-residential business measures; removed insulation and prevented food-service product matches from becoming broad plumbing or kitchen-general categories."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "TakeCharge business page describes programs and rebates but no clear controls-specific formula was verified.",
        "sourceUrlsChecked": [
          "http://takechargeva.com/business/default.aspx"
        ],
        "reasoningNotes": "Matched controls require a measure table or application.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2458",
    "opportunityName": "APS - Energy Efficiency Solutions for Business",
    "state": "AZ",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2458/aps-energy-efficiency-solutions-for-business",
    "websiteUrl": "https://www.aps.com/en/Business/Save-Money-and-Energy/Business-Solutions",
    "applicationUrl": null,
    "administrator": "Arizona Public Service",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 4,
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
          "AZ"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Arizona Public Service electric service territory"
        ],
        "notes": "For APS non-residential customers that contribute to the DSMAC charge."
      },
      "eligibleApplicantTypes": [
        "commercial_electric_customer",
        "industrial_electric_customer",
        "government_electric_customer",
        "institutional_electric_customer",
        "nonprofit_electric_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "government",
        "institutional",
        "nonprofit",
        "agricultural"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "energy_management_system",
        "smart_thermostat_controls",
        "variable_speed_drive_non_hvac",
        "compressed_air_efficiency",
        "high_efficiency_refrigeration_equipment",
        "building_envelope_glazing_shade_screens",
        "non_hvac_custom_energy_efficiency",
        "electric_battery_charger_efficiency",
        "agriculture_led_lighting",
        "agriculture_dehumidification"
      ],
      "hardRequirements": [
        "Customer must be an APS non-residential electric customer contributing to DSMAC.",
        "Measures must meet APS Solutions for Business policies and preapproval requirements when applicable.",
        "Rebates are subject to program funding and Arizona Corporation Commission approval.",
        "Equipment must be installed and operating before final rebate payment."
      ],
      "blockers": [
        "Do not match heat_pump_hvac_retrofit or high_efficiency_hvac_replacement from the current Existing Facilities program because APS discontinued Business New Construction and HVAC rebates through Existing Facilities as of January 1, 2026.",
        "Do not match heat_pump_water_heater; the current general measures quick look does not list heat pump water heaters.",
        "Do not match natural_gas_equipment, fuel_switching, renewables, or onsite_generation under this program.",
        "Cool Rewards Business demand response and other EV or flexibility offerings are separate APS programs."
      ],
      "programType": "Rebate",
      "administrator": "Arizona Public Service",
      "applicationUrl": null,
      "websiteUrl": "https://www.aps.com/en/Business/Save-Money-and-Energy/Business-Solutions",
      "sourceUrlsChecked": [
        "https://www.aps.com/en/Business/Save-Money-and-Energy/Business-Solutions",
        "https://webtools.dnv.com/projects/Portals/15/APS_S4B_Policies_Procedures.pdf?ver=blAwnFHdP3chsBP2JS20UA%3D%3D",
        "https://webtools.dnv.com/projects/Portals/15/APS_S4B_General_Measures_Quick_Look.pdf?ver=DviwmIQoHKcTDDPVaZ5ADA%3D%3D"
      ],
      "evidenceText": "APS Solutions for Business is active for business customers and current program materials list lighting, controls, refrigeration, compressed air, non-HVAC drives, envelope glazing or shade screens, agriculture measures, and custom non-HVAC efficiency. HVAC rebates through Existing Facilities were discontinued January 1, 2026.",
      "reasoningNotes": "The original heat pump HVAC, heat pump water heater, and broad high-efficiency HVAC matches are not supported by current APS business efficiency materials. Lighting is supported, and several additional commercial electric efficiency categories are supported."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "APS business solutions source did not expose a clear heat pump or HPWH incentive formula.",
        "sourceUrlsChecked": [
          "https://www.aps.com/en/Business/Save-Money-and-Energy/Business-Solutions"
        ],
        "reasoningNotes": "No reusable whole-building or measure-specific rule was verified.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4238",
    "opportunityName": "Mohave Electric Cooperative - Energy Efficiency Rebate Program",
    "state": "AZ",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4238/mohave-electric-cooperative-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.mohaveelectric.com/energy-solutions/rebates/",
    "applicationUrl": null,
    "administrator": "Mohave Electric Cooperative",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 4,
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
          "AZ"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Mohave Electric Cooperative service territory"
        ],
        "notes": "Current rebate pages are for Mohave Electric Cooperative members; the utility notes a renewed focus on income-qualified members after ACC-approved program changes."
      },
      "eligibleApplicantTypes": [
        "electric_cooperative_member",
        "income_qualified_member"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "ductless_mini_split_heat_pump",
        "high_efficiency_air_conditioner_replacement"
      ],
      "hardRequirements": [
        "Applicant must be a Mohave Electric Cooperative member and meet current program eligibility.",
        "Applications must include invoice, receipt, required photos, and contractor or member information.",
        "Heat pump and A/C rebates require qualifying SEER tiers; window units are excluded from the A/C rebate.",
        "Mini-split rebates have separate cooling-only and heat-pump forms and must be for qualifying home areas."
      ],
      "blockers": [
        "Do not match EV chargers; the current Mohave Charged rebate is for battery storage, not EV charging equipment.",
        "Do not match LED lighting to this rebate page.",
        "Battery storage and SunWatts renewable incentives are separate programs from the HVAC efficiency rebates.",
        "Mini-split units for garages or non-home areas are blocked by the official requirements."
      ],
      "programType": "Rebate Program",
      "administrator": "Mohave Electric Cooperative",
      "applicationUrl": null,
      "websiteUrl": "https://www.mohaveelectric.com/energy-solutions/rebates/",
      "sourceUrlsChecked": [
        "https://www.mohaveelectric.com/energy-solutions/rebates/",
        "https://www.mohaveelectric.com/energy-solutions/rebates/heat-pump-rebate/",
        "https://www.mohaveelectric.com/energy-solutions/rebates/air-conditioning-rebate/",
        "https://www.mohaveelectric.com/energy-solutions/rebates/mini-split-rebate/",
        "https://www.mohaveelectric.com/energy-solutions/rebates/mohave-charged-rebates/"
      ],
      "evidenceText": "Current MEC rebate pages list heat pump, air-conditioning, and ductless mini-split rebates with SEER tiers and documentation rules. The Mohave Charged page is a battery rebate, not EV-charging equipment.",
      "reasoningNotes": "Repair by keeping HVAC measures and blocking EV charging and lighting. Separate battery and solar offerings should not be collapsed into this energy-efficiency rebate."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Mohave Electric says rebates are available and heat-pump incentives can be up to $2,000, but exact measure table was not verified.",
        "sourceUrlsChecked": [
          "https://www.mohaveelectric.com/energy-solutions/rebates/",
          "https://www.mohaveelectric.com/member-service/helping-you-save/"
        ],
        "reasoningNotes": "Target includes motor/EV/heat pump terms; measure-specific selection is required.",
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
    "opportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:f69ab77394818965:bright-start-for-new-business",
    "opportunityName": "Bright Start for New Business",
    "state": "CA",
    "sourceName": "Silicon Valley Power Business Programs",
    "sourceUrl": "https://www.siliconvalleypower.com/businesses/save-money",
    "websiteUrl": "https://www.siliconvalleypower.com/businesses/save-money",
    "applicationUrl": null,
    "administrator": "Silicon Valley Power",
    "programType": "Technical Assistance And Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 4,
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
          "Silicon Valley Power electric service territory"
        ],
        "notes": "Program is tied to businesses and prospective tenants in Santa Clara served by Silicon Valley Power."
      },
      "eligibleApplicantTypes": [
        "business_customer",
        "prospective_business_tenant",
        "broker",
        "property_manager",
        "building_owner"
      ],
      "eligibleSectors": [
        "commercial",
        "small_business",
        "property_management",
        "real_estate"
      ],
      "eligibleRetrofitCategories": [
        "energy_audit",
        "led_lighting_retrofit",
        "lighting_retrofit",
        "high_efficiency_hvac_replacement",
        "hvac_retrofit",
        "installation_management",
        "project_management_technical_assistance"
      ],
      "hardRequirements": [
        "Facility must be associated with a new business tenancy or prospective tenancy in Santa Clara.",
        "Rebates are paid after eligible retrofits are implemented and approved by Silicon Valley Power.",
        "Installation management is limited to qualifying facilities under 30000 square feet.",
        "Program participation depends on SVP review and approval."
      ],
      "blockers": [
        "Do not match low_flow_fixture_retrofit; the program references lighting and HVAC facility retrofits, not water fixtures.",
        "Energy audit is technical assistance and not a physical retrofit.",
        "Do not infer refrigeration, kitchen equipment, or water conservation measures from this Bright Start section."
      ],
      "programType": "Technical Assistance And Rebate",
      "administrator": "Silicon Valley Power",
      "applicationUrl": null,
      "websiteUrl": "https://www.siliconvalleypower.com/businesses/save-money",
      "sourceUrlsChecked": [
        "https://www.siliconvalleypower.com/businesses/save-money"
      ],
      "evidenceText": "Silicon Valley Power describes Bright Start as support for new businesses, brokers, property managers, owners, and prospective tenants, with free energy audit services and enhanced rebates for facility lighting and HVAC retrofits.",
      "reasoningNotes": "The audit, lighting, and HVAC retrofit matches are supported. The low-flow fixture match is a false positive from the word fixture and should be blocked."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "medium",
        "evidenceText": "SVP Bright Start is an energy audit/assessment service for new businesses, not a direct equipment rebate.",
        "sourceUrlsChecked": [
          "https://www.siliconvalleypower.com/businesses/save-money"
        ],
        "reasoningNotes": "Audit-only services should not be converted to one-time incentive rules.",
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
    "opportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:building-optimization-rebate",
    "opportunityName": "Building Optimization Rebate",
    "state": "CA",
    "sourceName": "Silicon Valley Power Business Programs",
    "sourceUrl": "https://www.siliconvalleypower.com/businesses/rebates",
    "websiteUrl": "https://www.siliconvalleypower.com/businesses/rebates",
    "applicationUrl": "https://siliconvalleypower2.my.site.com/eo3__PortalRegistrationSelectionV2",
    "administrator": "Silicon Valley Power",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 4,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
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
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "air conditioning"
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
        "notes": "Available to qualifying Silicon Valley Power business customers in Santa Clara."
      },
      "eligibleApplicantTypes": [
        "business_customer",
        "commercial_electric_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "institutional",
        "multifamily_common_area"
      ],
      "eligibleRetrofitCategories": [
        "hvac_controls_optimization",
        "existing_building_automation_system_optimization",
        "existing_energy_management_system_optimization",
        "retrocommissioning_existing_hvac_controls"
      ],
      "hardRequirements": [
        "Pre-approval is required before implementation.",
        "Project must optimize an existing building automation or energy management system controlling HVAC operations.",
        "An energy assessment, scope, savings calculations, implementation plan, and post-project verification may be required.",
        "Measures must reduce electric energy use for an SVP business account."
      ],
      "blockers": [
        "Do not match to high-efficiency HVAC equipment replacement; this rebate is for optimizing existing HVAC controls, not replacing air-conditioning equipment.",
        "Do not match to low-flow fixtures or other water-efficiency measures.",
        "Do not match to new building automation system installation or major controls expansion unless handled under a separate controls rebate.",
        "Repair of broken equipment or code-required work is not an efficiency optimization rebate match."
      ],
      "programType": "Rebate",
      "administrator": "Silicon Valley Power",
      "applicationUrl": "https://siliconvalleypower2.my.site.com/eo3__PortalRegistrationSelectionV2",
      "websiteUrl": "https://www.siliconvalleypower.com/businesses/rebates",
      "sourceUrlsChecked": [
        "https://www.siliconvalleypower.com/businesses/rebates",
        "https://www.siliconvalleypower.com/home/showpublisheddocument/74366/638868860247070000",
        "https://www.siliconvalleypower.com/home/showpublisheddocument/77723/638894793575200000",
        "https://siliconvalleypower2.my.site.com/eo3__PortalRegistrationSelectionV2"
      ],
      "evidenceText": "SVP]( describes Building Optimization as reprogramming, calibration, and adjustments to existing HVAC controls through a BAS or EMS, with application and verification requirements.",
      "reasoningNotes": "Prompt target list cited inside JSON per uploaded-file instruction: . Existing controls optimization is supported; broad HVAC replacement and water fixtures were false positives."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "SVP building optimization materials were checked but no calculable building-automation rebate formula was verified.",
        "sourceUrlsChecked": [
          "https://www.siliconvalleypower.com/businesses/rebates",
          "https://www.siliconvalleypower.com/businesses/save-money"
        ],
        "reasoningNotes": "Building optimization is likely custom or study-driven; no safe upfront rule should be created.",
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
    "opportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:lighting-rebate",
    "opportunityName": "Lighting Rebate",
    "state": "CA",
    "sourceName": "Silicon Valley Power Business Programs",
    "sourceUrl": "https://www.siliconvalleypower.com/businesses/rebates",
    "websiteUrl": "https://www.siliconvalleypower.com/businesses/rebates",
    "applicationUrl": "https://www.siliconvalleypower.com/home/showpublisheddocument/41518/638875751693230000",
    "administrator": "Silicon Valley Power",
    "programType": "Commercial Lighting Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 4,
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
          "exterior lighting",
          "outdoor lighting"
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
          "lighting controls",
          "networked lighting"
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
        "notes": "Business customer facilities served by Silicon Valley Power in the City of Santa Clara."
      },
      "eligibleApplicantTypes": [
        "business_customers",
        "commercial_customers",
        "industrial_customers",
        "government_customers",
        "nonprofit_customers",
        "institutional_customers"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "institutional",
        "government",
        "nonprofit",
        "education",
        "medical",
        "retail",
        "grocery",
        "warehouse",
        "manufacturing",
        "restaurants",
        "hospitality"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "exterior_site_lighting_retrofit",
        "lighting_controls_retrofit",
        "networked_lighting_controls",
        "delamping"
      ],
      "hardRequirements": [
        "Pre-approval is required before installation.",
        "Lighting equipment must be new and installed and operating at the SVP-served facility.",
        "Eligible products are limited to qualified LED fixtures, retrofit kits, linear replacement lamps, LED tubes and qualified networked lighting controls.",
        "Project must meet energy savings, technical, inspection, invoice and completion-deadline requirements.",
        "Current post-June 30, 2026 application, budget and exterior bonus terms must be verified before matching."
      ],
      "blockers": [
        "Low-flow fixture retrofit is a false positive; fixture refers to lighting fixtures, not plumbing fixtures.",
        "Screw-in bulbs, fluorescent products, inventory, resale, used or rebuilt equipment are not eligible.",
        "Exterior and networked lighting control bonuses have specific deadlines and should not be assumed if not renewed.",
        "No installation before pre-approval."
      ],
      "programType": "Commercial Lighting Rebate",
      "administrator": "Silicon Valley Power",
      "applicationUrl": "https://www.siliconvalleypower.com/home/showpublisheddocument/41518/638875751693230000",
      "websiteUrl": "https://www.siliconvalleypower.com/businesses/rebates",
      "sourceUrlsChecked": [
        "https://www.siliconvalleypower.com/businesses/rebates",
        "https://www.siliconvalleypower.com/home/showpublisheddocument/41518/638875751693230000",
        "https://www.siliconvalleypower.com/home/showpublisheddocument/15851/638894798046770000",
        "https://www.siliconvalleypower.com/home/showpublisheddocument/5082/638917985630870000"
      ],
      "evidenceText": "SVP's lighting materials describe rebates for new efficient lighting, exterior lighting and networked lighting controls, requiring pre-approval, qualified LED products, inspections and application deadlines.",
      "reasoningNotes": "Kept lighting and controls categories; removed water-fixture false positive. Confidence is medium because the checked application year ended June 30, 2026 and current terms should be reconfirmed."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "SVP lighting application requires its rebate calculator and M&V for approved savings and rebate amount.",
        "sourceUrlsChecked": [
          "https://www.siliconvalleypower.com/businesses/rebates",
          "https://www.siliconvalleypower.com/home/showpublisheddocument/41518/638875751693230000"
        ],
        "reasoningNotes": "No public fixed per-fixture or per-kWh lighting rate was verified; calculator/pre-approval determines the amount.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22615",
    "opportunityName": "Marin Clean Energy - Feed-In Tariff Plus",
    "state": "CA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22615/marin-clean-energy-feed-in-tariff-plus",
    "websiteUrl": "https://www.mcecleanenergy.org/feed-in-tariff/",
    "applicationUrl": null,
    "administrator": "MCE Clean Energy",
    "programType": "Feed In Tariff",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 4,
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
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "CA"
        ],
        "counties": [
          "Marin County",
          "Napa County",
          "Solano County",
          "Contra Costa County"
        ],
        "cities": [],
        "utilityTerritories": [
          "MCE service area"
        ],
        "notes": "Feed-in tariff is for local wholesale renewable projects in MCE's service area, not for customer behind-the-meter rebates."
      },
      "eligibleApplicantTypes": [
        "renewable_project_developer",
        "power_producer",
        "project_owner",
        "landowner"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "utility_scale",
        "agricultural"
      ],
      "eligibleRetrofitCategories": [
        "wholesale_solar_pv_generation_project",
        "solar_pv_plus_storage_generation_project",
        "wholesale_wind_generation_project",
        "wholesale_biomass_generation_project"
      ],
      "hardRequirements": [
        "Projects must be 1 MW to 5 MW local renewable generation projects under MCE's feed-in tariff rules.",
        "Solar projects require paired storage sized to program requirements, including four-hour duration.",
        "Projects use standardized long-term power purchase agreements and must satisfy interconnection, site control, and deliverability requirements."
      ],
      "blockers": [
        "Do not match behind-the-meter customer rooftop solar rebates or net-metering projects.",
        "Do not match standalone battery storage; storage is a required pairing for solar projects, not a separate storage rebate.",
        "Do not match ground-source geothermal heat pumps or solar water heating; this is a wholesale electricity feed-in tariff, not building HVAC or water heating.",
        "Do not match ordinary building retrofits."
      ],
      "programType": "Feed In Tariff",
      "administrator": "MCE Clean Energy",
      "applicationUrl": null,
      "websiteUrl": "https://www.mcecleanenergy.org/feed-in-tariff/",
      "sourceUrlsChecked": [
        "https://www.mcecleanenergy.org/feed-in-tariff/",
        "https://mcecleanenergy.org/feed-in-tariff/"
      ],
      "evidenceText": "MCE's]( feed-in tariff is a wholesale local renewable energy procurement program for 1 to 5 MW projects, with solar paired with storage requirements.",
      "reasoningNotes": "Storage is only valid as part of required solar-plus-storage project design. Geothermal heat pump and solar water heating matches are false positives."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "high",
        "evidenceText": "MCE FIT Plus is a feed-in tariff/power purchase mechanism for renewable generation paired with storage.",
        "sourceUrlsChecked": [
          "https://www.mcecleanenergy.org/feed-in-tariff/",
          "https://www.mcecleanenergy.org/fit-plus/"
        ],
        "reasoningNotes": "Feed-in tariffs and long-term energy revenue mechanisms are not upfront one-time rules.",
        "originalGapReason": "source_text_unavailable",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3219",
    "opportunityName": "Modesto Irrigation District - Commercial New Construction Rebate Program",
    "state": "CA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3219/modesto-irrigation-district-commercial-new-construction-rebate-program",
    "websiteUrl": "https://www.mid.org/power/new-construction/",
    "applicationUrl": null,
    "administrator": "Modesto Irrigation District",
    "programType": "Commercial New Construction Energy Efficiency Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 4,
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
          "load reduction"
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
        "notes": "Limited to MID electric business customers with eligible new construction, major remodel, or expansion projects."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "industrial_customer",
        "agricultural_customer",
        "developer",
        "new_construction_project_owner"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "agricultural",
        "new_construction"
      ],
      "eligibleRetrofitCategories": [
        "commercial_new_construction_energy_efficiency"
      ],
      "hardRequirements": [
        "Project must be in MID electric service territory.",
        "Project must involve new facilities, major remodel, expansion, or new construction with high-efficiency equipment above applicable codes and standards.",
        "Only complete applications are processed.",
        "Current measure-by-measure rebate terms must be verified with MID."
      ],
      "blockers": [
        "Block ordinary existing-building retrofit matching from this new-construction record.",
        "Do not match automated demand response controls, energy management systems, high-efficiency HVAC replacement, or refrigeration retrofits as standalone existing-building measures unless current MID materials explicitly include them.",
        "Do not merge this with MID's separate existing-business rebate program."
      ],
      "programType": "Commercial New Construction Energy Efficiency Rebate Program",
      "administrator": "Modesto Irrigation District",
      "applicationUrl": null,
      "websiteUrl": "https://www.mid.org/power/new-construction/",
      "sourceUrlsChecked": [
        "https://www.mid.org/power/new-construction/",
        "https://www.mid.org/saving-energy-money/rebates/business-rebates/",
        "https://www.mid.org/saving-energy-money/rebates/rebate-terms-conditions/",
        "https://www.mid.org/saving-energy-money/rebates/"
      ],
      "evidenceText": "Official]( MID snippets verify a business new-construction rebate for high-efficiency equipment above codes and standards in new facilities, major remodels, or expansions; full pages were access-blocked.",
      "reasoningNotes": "The match should be to a new-construction efficiency category only. Existing-building equipment categories were removed to avoid false positive retrofit matches."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "MID business rebate pages confirm commercial rebates but do not expose a current new-construction controls formula in accessible source text.",
        "sourceUrlsChecked": [
          "https://www.mid.org/saving-energy-money/rebates/business-rebates/",
          "http://www.mid.org/rebates/commercial/default.html"
        ],
        "reasoningNotes": "No source-backed energy-management or refrigeration rule was verified.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1429",
    "opportunityName": "Pacific Power - wattsmart Business",
    "state": "CA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1429/pacific-power-wattsmart-business",
    "websiteUrl": "https://www.pacificpower.net/savings-energy-choices/business/wattsmart-efficiency-incentives-california.html",
    "applicationUrl": null,
    "administrator": "Pacific Power",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 4,
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
          "CA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Pacific Power California non-residential electric service territory"
        ],
        "notes": "Program applies to Pacific Power California non-residential customers; it is not a statewide California incentive."
      },
      "eligibleApplicantTypes": [
        "commercial_electric_customer",
        "industrial_electric_customer",
        "irrigation_customer",
        "agricultural_customer",
        "non_residential_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "agricultural",
        "institutional"
      ],
      "eligibleRetrofitCategories": [
        "energy_management_services",
        "led_lighting_retrofit",
        "lighting_controls",
        "air_source_heat_pump",
        "packaged_terminal_heat_pump",
        "high_efficiency_hvac_replacement",
        "hvac_controls",
        "motor_vfd",
        "commercial_food_service_equipment",
        "commercial_refrigeration_equipment",
        "heat_pump_water_heater",
        "compressed_air_system_efficiency",
        "irrigation_pump_efficiency",
        "farm_and_dairy_equipment"
      ],
      "hardRequirements": [
        "Customer must be a Pacific Power California non-residential customer.",
        "Qualifying measures must deliver verifiable electric energy-efficiency improvements relative to an approved baseline.",
        "Pacific Power review and approval are required for many incentive calculations, project costs, and custom incentives.",
        "Some lighting incentives require qualifying product lists and are capped by project cost or payback rules.",
        "Project financing is available only for select situations and is not itself a rebate measure."
      ],
      "blockers": [
        "Do not match residential projects.",
        "Do not match ground-source geothermal heat pumps; the current California incentive table found air-cooled heat pumps and PTHP, but no geothermal term.",
        "Do not match solar, batteries, EV charging, or general renewables to Wattsmart Business.",
        "Energy management is services/operational improvement unless a specific capital control measure is separately approved."
      ],
      "programType": "Rebate Program",
      "administrator": "Pacific Power",
      "applicationUrl": null,
      "websiteUrl": "https://www.pacificpower.net/savings-energy-choices/business/wattsmart-efficiency-incentives-california.html",
      "sourceUrlsChecked": [
        "https://www.pacificpower.net/savings-energy-choices/business/wattsmart-efficiency-incentives-california.html",
        "https://www.pacificorp.com/content/dam/pcorp/documents/en/pacificorp/environment/dsm/california/CA_Wattsmart_Business_2025.pdf",
        "https://www.pacificpower.net/content/dam/pcorp/documents/en/pacificpower/savings-energy-choices/wattsmart-business/california/CA_wattsmartBusiness_Definitions_Incentive_Tables_Information.pdf"
      ],
      "evidenceText": "Pacific Power’s current California Wattsmart Business materials describe non-residential incentives for lighting, HVAC, motors, food service, irrigation, compressed air, refrigeration and other technologies, plus energy management services.",
      "reasoningNotes": "Keep LED, HVAC, motors and energy management, but remove the geothermal match because current California incentive materials did not support ground-source geothermal."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Pacific Power California business incentives include lighting, HVAC, and custom measures; exact current values require the incentive tables.",
        "sourceUrlsChecked": [
          "https://www.pacificpower.net/savings-energy-choices/business.html"
        ],
        "reasoningNotes": "Target maps to motor/VFD but matched terms include LED, geothermal and energy management; no single value selected.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22067",
    "opportunityName": "Plumas-Sierra REC - Commercial and Irrigation Rebate Program",
    "state": "CA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22067/plumas-sierra-rec-commercial-and-irrigation-rebate-program",
    "websiteUrl": "https://www.psrec.coop/energy-solutions/rebates/",
    "applicationUrl": null,
    "administrator": "Plumas-Sierra Rural Electric Cooperative",
    "programType": "Commercial And Irrigation Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 4,
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
          "Plumas-Sierra Rural Electric Cooperative"
        ],
        "notes": "Program is limited to Plumas-Sierra Rural Electric Cooperative commercial and irrigation accounts in its California service territory."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "irrigation_customer",
        "agricultural_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "agricultural",
        "irrigation"
      ],
      "eligibleRetrofitCategories": [
        "commercial_heat_pump_hvac",
        "high_efficiency_commercial_hvac",
        "heat_pump_water_heater",
        "led_lighting_retrofit",
        "commercial_lighting_retrofit",
        "commercial_kitchen_foodservice_equipment",
        "custom_energy_efficiency_project"
      ],
      "hardRequirements": [
        "Applicant must be a Plumas-Sierra Rural Electric Cooperative commercial or irrigation customer.",
        "Equipment must be in an eligible commercial or irrigation rebate category and meet the applicable rebate form requirements.",
        "Detailed incentive amounts and documentation requirements must be checked on the current rebate form before approval."
      ],
      "blockers": [
        "Residential heat pump water heater and other residential rebate pages are separate and should not match this commercial and irrigation opportunity.",
        "Do not infer broad water conservation or irrigation pump replacement unless the current PSREC commercial or irrigation form supports it.",
        "Official pages returned 403 in the browser, so measure details should be rechecked before final payment matching."
      ],
      "programType": "Commercial And Irrigation Rebate Program",
      "administrator": "Plumas-Sierra Rural Electric Cooperative",
      "applicationUrl": null,
      "websiteUrl": "https://www.psrec.coop/energy-solutions/rebates/",
      "sourceUrlsChecked": [
        "https://www.psrec.coop/energy-solutions/rebates/",
        "https://www.psrec.coop/energy-solutions/rebates/commercial-heating-cooling-rebates/",
        "https://www.psrec.coop/energy-solutions/rebates/commercial-heat-pump-water-heater-rebate/",
        "https://www.psrec.coop/energy-solutions/rebates/commercial-lighting-rebate/",
        "https://www.psrec.coop/energy-solutions/rebates/commercial-kitchen-food-service-equipment-rebate/",
        "https://www.psrec.coop/energy-solutions/rebates/commercial-custom-project-rebate/"
      ],
      "evidenceText": "Official PSREC search snippets identify commercial lighting, custom projects, commercial HVAC, commercial heat pump water heater, and commercial kitchen or food-service equipment rebate pages.",
      "reasoningNotes": "Current official PSREC pages were present in search results but returned 403 when opened. Categories are therefore kept only where official snippets identified the current rebate page."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Official PSREC rebate page did not provide a commercial heat pump or heat pump water heater value in accessible text.",
        "sourceUrlsChecked": [
          "https://www.psrec.coop/energy/rebates/"
        ],
        "reasoningNotes": "No commercial kitchen or HPWH rule was safely verified.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4342",
    "opportunityName": "(Electric and Gas)  Residential New Construction Program",
    "state": "CT",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4342/electric-and-gas-residential-new-construction-program",
    "websiteUrl": "https://www.energizect.com/explore-solutions/new-construction-building-efficiency/new-home-construction",
    "applicationUrl": "https://www.energizect.com/media/14596/download?inline=",
    "administrator": "Eversource Energy and United Illuminating",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 4,
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
          "CT"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Eversource electric service territory",
          "United Illuminating electric service territory"
        ],
        "notes": "Municipal utility customers are directed to municipal utility programs rather than this Eversource/UI RNC path."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "homeowner",
        "new_home_builder",
        "hers_rater_supported_applicant"
      ],
      "eligibleSectors": [
        "residential",
        "new_construction",
        "significant_rehabilitation"
      ],
      "eligibleRetrofitCategories": [
        "whole_home_new_construction_energy_efficiency",
        "significant_rehabilitation_whole_home_efficiency",
        "all_electric_new_home",
        "hers_rated_high_performance_home"
      ],
      "hardRequirements": [
        "Project must be a new all-electric home or qualifying gut rehab in Eversource or UI electric service territory.",
        "Certified HERS Rater must be contracted and involved during planning and construction.",
        "Application must be submitted before insulation to remain eligible.",
        "Homes must use all-electric equipment for space heating, water heating, oven or range and clothes drying.",
        "Fossil-fuel combustion appliances for those end uses are not permitted.",
        "Air-source heat pumps used for space heating must be on the Energize CT Heat Pump Qualified Product List.",
        "Insulation, thermal bypass, blower-door and duct testing inspections are part of the whole-home process."
      ],
      "blockers": [
        "Do not match this as a standalone retrofit rebate for heat pumps, geothermal heat pumps or insulation upgrades in existing homes.",
        "Existing-home air-source and ground-source heat pump rebates are separate Energize CT programs.",
        "This opportunity is a whole-home new construction or significant rehabilitation path, not a product-specific HVAC rebate.",
        "Gas utility presence in the historical title is obsolete for the current all-electric eligibility path."
      ],
      "programType": "Rebate Program",
      "administrator": "Eversource Energy and United Illuminating",
      "applicationUrl": "https://www.energizect.com/media/14596/download?inline=",
      "websiteUrl": "https://www.energizect.com/explore-solutions/new-construction-building-efficiency/new-home-construction",
      "sourceUrlsChecked": [
        "https://www.energizect.com/explore-solutions/new-construction-building-efficiency/new-home-construction",
        "https://www.energizect.com/media/14596/download?inline=",
        "https://energizect.com/your-home/solutions-list/residential-new-construction-program"
      ],
      "evidenceText": "Energize CT describes a residential new all-electric home and gut-rehab program with HERS rating, whole-home rebates and all-electric equipment requirements.",
      "reasoningNotes": "The target heat pump and insulation matches are false positives for retrofit matching because they are embedded in whole-home new construction eligibility."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "EnergizeCT residential new construction incentives are certification/project-path specific and no single heat-pump/geothermal formula was verified.",
        "sourceUrlsChecked": [
          "https://energizect.com/your-home/solutions-list/residential-new-construction-program"
        ],
        "reasoningNotes": "New construction program needs project qualification pathway rather than a generic one-time rule.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22766",
    "opportunityName": "EV Charging Program",
    "state": "CT",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22766/ev-charging-program",
    "websiteUrl": "https://portal.ct.gov/pura/electric/office-of-technical-and-regulatory-analysis/clean-energy-programs/electric-vehicle-charging-program",
    "applicationUrl": null,
    "administrator": "Connecticut PURA, Eversource, and United Illuminating",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 4,
    "targetKind": "reviewed_no_rule_reclassification",
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
          "ev charging",
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
          "Eversource Connecticut electric service territory",
          "United Illuminating electric service territory"
        ],
        "notes": "Statewide light-duty EV charging program is administered through Eversource and United Illuminating under PURA oversight."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customer",
        "commercial_electric_customer",
        "multifamily_property_owner",
        "fleet_operator",
        "site_host"
      ],
      "eligibleSectors": [
        "residential",
        "commercial",
        "multifamily",
        "fleet",
        "public_sector"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation",
        "dc_fast_charger_installation",
        "ev_make_ready_electrical_upgrade",
        "managed_ev_charging"
      ],
      "hardRequirements": [
        "Applicant must be an Eversource or United Illuminating Connecticut electric customer in the applicable program track.",
        "Eligible charger equipment, networking, managed-charging, application-window, and pre-approval rules apply.",
        "Eversource residential wiring and charger rebates in 2026 are narrowed to income-eligible or hardship protection customers, while other incentives may differ by track."
      ],
      "blockers": [
        "Do not match non-Connecticut customers or customers outside Eversource and UI territories.",
        "Do not assume every residential customer qualifies for charger or wiring rebates under current 2026 changes.",
        "Managed charging is not a physical retrofit and should not be used where a physical-only match is required.",
        "Program is for light-duty EV charging; do not infer medium- or heavy-duty fleet eligibility unless separately verified."
      ],
      "programType": "Rebate",
      "administrator": "Connecticut PURA, Eversource, and United Illuminating",
      "applicationUrl": null,
      "websiteUrl": "https://portal.ct.gov/pura/electric/office-of-technical-and-regulatory-analysis/clean-energy-programs/electric-vehicle-charging-program",
      "sourceUrlsChecked": [
        "https://portal.ct.gov/pura/electric/office-of-technical-and-regulatory-analysis/clean-energy-programs/electric-vehicle-charging-program",
        "https://www.eversource.com/residential/save-money-energy/clean-energy-options/electric-vehicles/charging-stations/ct",
        "https://www.eversource.com/residential/save-money-energy/clean-energy-options/electric-vehicles/charging-stations/connecticut-ev-program-changes",
        "https://www.uinet.com/w/find-the-best-electric-vehicle-charging-options-for-your-business",
        "https://www.uinet.com/single-family-residential-level-2-charging"
      ],
      "evidenceText": "Connecticut's]( EV charging program covers residential and commercial Level 2, DC fast charging, make-ready support, and managed charging through Eversource and UI.",
      "reasoningNotes": "All EV charging categories are generally supported, but residential eligibility became narrower in 2026 and managed charging should be treated as nonphysical."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Connecticut EV charging incentives depend on utility, site type, make-ready scope, and program application path.",
        "sourceUrlsChecked": [
          "https://portal.ct.gov/deep/air/mobile-sources/electric-vehicle-charging-program",
          "https://uinet.chooseev.com/"
        ],
        "reasoningNotes": "No single one-time Level 2/DCFC formula was verified for the broad statewide target.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22624",
    "opportunityName": "Duke Energy Florida - Commercial Charger Rebate",
    "state": "FL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22624/duke-energy-florida-commercial-charger-rebate",
    "websiteUrl": "https://www.duke-energy.com/business/products/ev-complete/charger-prep-credit",
    "applicationUrl": null,
    "administrator": "Duke Energy Florida",
    "programType": "EV Charger Prep Credit",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 4,
    "targetKind": "reviewed_no_rule_reclassification",
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
        "notes": "Applies to eligible Duke Energy Florida customers in the utility’s Florida service area; this repair is limited to the business/commercial charger-prep pathway."
      },
      "eligibleApplicantTypes": [
        "business_customer",
        "commercial_customer",
        "industrial_customer",
        "institutional_customer",
        "municipal_customer",
        "multifamily_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "institutional",
        "municipal",
        "multifamily"
      ],
      "eligibleRetrofitCategories": [
        "ev_charger_make_ready_infrastructure",
        "level_2_ev_charger_make_ready",
        "dc_fast_charger_make_ready"
      ],
      "hardRequirements": [
        "Customer must be served by Duke Energy Florida.",
        "Credit is for EV charging infrastructure required to support Level 2 or higher chargers.",
        "Eligible costs include new plug-in outlets, wiring improvements and electrical upgrades needed for charging infrastructure.",
        "Program does not cover charger hardware, charger software, or permit fees.",
        "Business applicants must use the Duke Energy Florida business Charger Prep Credit process."
      ],
      "blockers": [
        "Do not match refrigeration or any building energy-efficiency equipment to this EV charger-prep rebate.",
        "Do not treat the credit as a charger hardware rebate; it is make-ready infrastructure support.",
        "Residential Off-Peak Charging Credit and Fleet Advisory Program are separate programs.",
        "Non-Duke Energy Florida customers are not eligible."
      ],
      "programType": "EV Charger Prep Credit",
      "administrator": "Duke Energy Florida",
      "applicationUrl": null,
      "websiteUrl": "https://www.duke-energy.com/business/products/ev-complete/charger-prep-credit",
      "sourceUrlsChecked": [
        "https://investors.duke-energy.com/news/news-details/2025/New-Duke-Energy-programs-offer-Florida-customers-more-choices-related-to-electric-vehicles/default.aspx",
        "https://www.duke-energy.com/business/products/ev-complete/charger-prep-credit"
      ],
      "evidenceText": "Duke]( Energy Florida’s 2025 launch states the Charger Prep Credit helps residential and business customers defray wiring, outlet and electrical-upgrade costs for Level 2 or higher EV chargers.",
      "reasoningNotes": "The refrigerator match is a false positive. The supported category is EV charger make-ready infrastructure, not broad EVSE hardware or unrelated efficiency equipment."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Duke Energy commercial EV materials did not provide a clear reusable Level 2 or DCFC formula in accessible text.",
        "sourceUrlsChecked": [
          "https://www.duke-energy.com/business/products/electric-vehicles",
          "https://programs.dsireusa.org/system/program/detail/22624"
        ],
        "reasoningNotes": "Do not force a charger rule without official current per-port or per-charger amount.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3355",
    "opportunityName": "Tampa Electric - Commercial Energy Efficiency Rebate Programs",
    "state": "FL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3355/tampa-electric-commercial-energy-efficiency-rebate-programs",
    "websiteUrl": "https://www.tampaelectric.com/business/saveenergy/",
    "applicationUrl": "https://saveenergy.tecoenergy.com/",
    "administrator": "Tampa Electric",
    "programType": "Commercial Energy Efficiency Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 4,
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
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "chiller"
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
          "FL"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Tampa Electric"
        ],
        "notes": "Available to eligible Tampa Electric commercial and industrial electric customers."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "industrial_customer",
        "business_owner",
        "commercial_property_owner"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial"
      ],
      "eligibleRetrofitCategories": [
        "energy_audit",
        "variable_frequency_drive_retrofit",
        "custom_peak_demand_reduction",
        "commercial_heat_pump_water_heater",
        "led_lighting_retrofit",
        "lighting_controls_retrofit"
      ],
      "hardRequirements": [
        "Applicant must be a Tampa Electric commercial or industrial customer.",
        "Custom projects require prequalification before equipment purchase or installation.",
        "Custom projects must deliver peak demand shifting or reduction not covered by another program.",
        "VFD and motor control projects must meet eligible equipment and application requirements.",
        "Program funding, installation timing and documentation rules apply."
      ],
      "blockers": [
        "Cooling and chiller rebate programs ended for new applications and should not match as current HVAC replacement incentives.",
        "Facility energy management and smart thermostat programs ended for new applications and should not match as current energy management system rebates.",
        "Custom incentives exclude on-site generation, emergency generation, cogeneration, water conservation and operational-only changes.",
        "Projects purchased before required custom prequalification are ineligible."
      ],
      "programType": "Commercial Energy Efficiency Rebate",
      "administrator": "Tampa Electric",
      "applicationUrl": "https://saveenergy.tecoenergy.com/",
      "websiteUrl": "https://www.tampaelectric.com/business/saveenergy/",
      "sourceUrlsChecked": [
        "https://www.tampaelectric.com/business/saveenergy/",
        "https://www.tampaelectric.com/business/saveenergy/variablefrequencydriveandmotorcontrols/",
        "https://www.tampaelectric.com/business/saveenergy/customenergyefficiency/"
      ],
      "evidenceText": "Tampa Electric's current business page lists active audits, VFD, custom, water heating, lighting and occupancy sensor offerings, while showing cooling, chiller and facility energy management programs ended for new applications.",
      "reasoningNotes": "The opportunity remains active as a portfolio, but the target's chiller, HVAC replacement and energy management matches are stale and should be blocked for new matching."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Tampa Electric business page primarily routes customers to program participation and audits; no VFD/energy-management formula was verified.",
        "sourceUrlsChecked": [
          "http://www.tampaelectric.com/business/saveenergy/",
          "https://www.tampaelectric.com/business/saveenergy/"
        ],
        "reasoningNotes": "Matched audit and energy-management terms require project-specific review.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2665",
    "opportunityName": "Clark County REMC - Energy Efficiency Rebate Program",
    "state": "IN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2665/clark-county-remc-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.clarkremc.coop/energy-efficiency/rebates/",
    "applicationUrl": null,
    "administrator": "Clark County REMC",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 4,
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
          "Clark County"
        ],
        "cities": [],
        "utilityTerritories": [
          "Clark County REMC electric service territory"
        ],
        "notes": "Program applies to eligible Clark County REMC members in Indiana."
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
        "dual_fuel_heat_pump",
        "heat_pump_water_heater"
      ],
      "hardRequirements": [
        "Applicant must be an eligible Clark County REMC member.",
        "Equipment must meet the REMC rebate requirements in effect at the time of application.",
        "Rebate applications and supporting documentation are required."
      ],
      "blockers": [
        "Do not match broad high_efficiency_hvac_replacement unless the proposed measure is an eligible heat pump category.",
        "Do not infer commercial, lighting, refrigeration, or appliance measures from the reviewed Clark County REMC rebate snippets.",
        "Current official pages were blocked by access restrictions, so categories not shown in official snippets should be treated as unsupported."
      ],
      "programType": "Rebate",
      "administrator": "Clark County REMC",
      "applicationUrl": null,
      "websiteUrl": "https://www.clarkremc.coop/energy-efficiency/rebates/",
      "sourceUrlsChecked": [
        "https://www.clarkremc.coop/energy-efficiency/rebates/",
        "https://www.clarkremc.coop/energy-efficiency/rebates/hvac-rebates/",
        "https://www.clarkremc.coop/energy-efficiency/rebates/water-heaters/"
      ],
      "evidenceText": "Official Clark County REMC pages were access-blocked, but official search snippets identify HVAC rebates for air source, geothermal, ductless mini-split, and dual-fuel heat pumps, plus heat pump water heater rebates.",
      "reasoningNotes": "The heat pump, geothermal, mini-split, and heat pump water heater matches are supported from official snippets. The broad high-efficiency HVAC match should be narrowed to the named heat pump technologies."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Clark County REMC page references rebate programs but did not expose exact values.",
        "sourceUrlsChecked": [
          "https://www.clarkremc.coop/energy-efficiency/rebates/"
        ],
        "reasoningNotes": "No official current measure formula was verified.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2297",
    "opportunityName": "Duke Energy - Commercial Energy Efficiency Rebate Program",
    "state": "IN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2297/duke-energy-commercial-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.duke-energy.com/business/products/smartsaver",
    "applicationUrl": "https://www.duke-energy.com/business/products/smartsaver/application-question",
    "administrator": "Duke Energy Indiana",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 4,
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
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "IN"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Duke Energy Indiana electric service territory"
        ],
        "notes": "Limited to eligible Duke Energy Indiana business, school, institutional, industrial, and agricultural electric accounts."
      },
      "eligibleApplicantTypes": [
        "business_customer",
        "commercial_customer",
        "industrial_customer",
        "institutional_customer",
        "school_customer",
        "agricultural_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "institutional",
        "education",
        "agriculture"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "high_efficiency_hvac_replacement",
        "high_efficiency_chiller",
        "commercial_equipment_efficiency",
        "industrial_equipment_efficiency",
        "agricultural_equipment_efficiency",
        "custom_energy_efficiency_measure"
      ],
      "hardRequirements": [
        "Applicant must be an eligible Duke Energy Indiana business or institutional electric customer.",
        "Equipment must qualify under current Smart $aver Business requirements for Indiana.",
        "Applications must follow Duke Energy documentation, installation date, inspection, and incentive cap rules.",
        "Custom and nonstandard incentives require Duke Energy review and approval."
      ],
      "blockers": [
        "Do not match residential Smart $aver home rebates to this business record.",
        "Insulation and refrigeration were not retained without readable current Duke Indiana measure confirmation.",
        "EV charging, solar, and financing offers are separate Duke programs.",
        "Do not infer water or gas measures not supported by the Indiana electric Smart $aver business program."
      ],
      "programType": "Rebate Program",
      "administrator": "Duke Energy Indiana",
      "applicationUrl": "https://www.duke-energy.com/business/products/smartsaver/application-question",
      "websiteUrl": "https://www.duke-energy.com/business/products/smartsaver",
      "sourceUrlsChecked": [
        "https://www.duke-energy.com/business/products/smartsaver",
        "https://www.duke-energy.com/business/products/smartsaver/application-question",
        "https://www.duke-energy.com/business/products/smartsaver/application-calculation-assistance?jur=IN01",
        "https://www.duke-energy.com/business/products/smartsaver/all-smartsaver-rebates?jur=IN01",
        "https://www.duke-energy.com/business/products/smartsaver/hvac-incentives",
        "https://www.duke-energy.com/business/products/smartsaver/chiller"
      ],
      "evidenceText": "Duke Energy official snippets describe Smart $aver Business incentives for qualifying equipment, including lighting, HVAC, chiller, commercial, industrial, agricultural, and custom measures.",
      "reasoningNotes": "Direct Duke pages were partly blocked, but official snippets provide stronger evidence than the prior repair. Confidence rises to medium while unsupported refrigeration and insulation remain blocked."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Duke Energy commercial Smart Saver pages did not expose a current refrigeration or insulation formula in accessible text.",
        "sourceUrlsChecked": [
          "https://www.duke-energy.com/business/products/smart-saver"
        ],
        "reasoningNotes": "No official calculable rule was verified for the target commercial measures.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2664",
    "opportunityName": "RushShelby Energy - Residential Energy Efficiency Rebate Program",
    "state": "IN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2664/rushshelby-energy-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.rse.coop/energy-savings/rebates/residential/",
    "applicationUrl": null,
    "administrator": "RushShelby Energy",
    "programType": "Residential Energy Efficiency Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 4,
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
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "RushShelby Energy"
        ],
        "notes": "Limited to RushShelby Energy residential members in Indiana."
      },
      "eligibleApplicantTypes": [
        "residential_member",
        "homeowner",
        "rushshelby_energy_member"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "ground_source_geothermal_heat_pump",
        "air_source_heat_pump",
        "ductless_mini_split_heat_pump",
        "heat_pump_water_heater",
        "hvac_tune_up",
        "electric_water_heater"
      ],
      "hardRequirements": [
        "Applicant must be a RushShelby Energy residential member.",
        "Equipment must meet the applicable rebate form requirements.",
        "Member must submit the current rebate application and required purchase or installation documentation."
      ],
      "blockers": [
        "Do not infer commercial HVAC or commercial water heating from this residential rebate program.",
        "Official pages returned 403 in the browser, so final incentive levels and documentation requirements must be verified from the current form.",
        "Do not broaden ductless or mini-split rebates into unrelated generic HVAC measures not listed by the current program."
      ],
      "programType": "Residential Energy Efficiency Rebate Program",
      "administrator": "RushShelby Energy",
      "applicationUrl": null,
      "websiteUrl": "https://www.rse.coop/energy-savings/rebates/residential/",
      "sourceUrlsChecked": [
        "https://www.rse.coop/energy-savings/rebates/residential/",
        "https://www.rse.coop/energy-savings/rebates/residential/residential-equipment-rebate-form/"
      ],
      "evidenceText": "Official RushShelby search snippets identify residential rebates for geothermal, air-to-air and mini-split heat pumps, heat pump water heaters, HVAC tune-ups, and electric water heaters.",
      "reasoningNotes": "The main heat pump and heat pump water heater matches are supported, but current pages were not fully readable due 403 access restrictions."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Official RushShelby rebate sources did not verify a current heat pump or geothermal amount.",
        "sourceUrlsChecked": [
          "https://www.rse.coop/rebates"
        ],
        "reasoningNotes": "Do not create a rule without an official current measure amount.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3573",
    "opportunityName": "Southeastern Indiana REMC - Residential Energy Efficiency Rebate Program",
    "state": "IN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3573/southeastern-indiana-remc-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.seiremc.com/rebates",
    "applicationUrl": null,
    "administrator": "Southeastern Indiana REMC",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 4,
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
          "Southeastern Indiana REMC"
        ],
        "notes": "Available to qualifying residential electric members in Southeastern Indiana REMC service territory."
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
        "electric_storage_water_heater",
        "residential_hvac_tune_up"
      ],
      "hardRequirements": [
        "Must be a Southeastern Indiana REMC residential member for the rebated equipment location.",
        "HVAC and water-heater equipment must meet the efficiency and installation requirements stated on the specific SEIREMC rebate page or form.",
        "Mini-split, air-source, geothermal, and water-heater rebates are product-specific and require qualifying new equipment.",
        "Rebate requests are subject to program rules, inspection, documentation, and available funding."
      ],
      "blockers": [
        "Do not match broad high_efficiency_hvac_replacement unless the project is a qualifying air-source, dual-fuel, ductless mini-split, or geothermal heat pump installation.",
        "Do not match non-electric-fuel water heaters or general appliance measures not listed on SEIREMC's current rebate pages.",
        "Commercial, industrial, and new-construction projects are outside this residential rebate."
      ],
      "programType": "Rebate Program",
      "administrator": "Southeastern Indiana REMC",
      "applicationUrl": null,
      "websiteUrl": "https://www.seiremc.com/rebates",
      "sourceUrlsChecked": [
        "https://www.seiremc.com/rebates",
        "https://www.seiremc.com/airsourceheatpumprebate",
        "https://www.seiremc.com/minisplitheatpumprebate",
        "https://www.seiremc.com/geothermalheatpumprebate",
        "https://www.seiremc.com/waterheaterrebate"
      ],
      "evidenceText": "SEIREMC's]( rebate pages list residential member rebates for air-source and dual-fuel heat pumps, mini-split heat pumps, geothermal heat pumps, heat-pump water heaters, electric storage water heaters, and Wi-Fi electric water heaters.",
      "reasoningNotes": "The DSIRE matches for geothermal, heat-pump HVAC, and heat-pump water heaters are supported. The broad high-efficiency HVAC category should be narrowed to the listed heat-pump products and tune-up measures."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Southeastern Indiana REMC heat pump/geothermal/HPWH rebate values were not verified from current official source text.",
        "sourceUrlsChecked": [
          "https://www.seiremc.com/",
          "https://www.powermoves.com/rebates/"
        ],
        "reasoningNotes": "Extract current cooperative or PowerMoves table before creating a rule.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22695",
    "opportunityName": "Louisville Gas and Electric and Kentucky Utilities – WeCare for Homeowners and Renters",
    "state": "KY",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22695/louisville-gas-and-electric-and-kentucky-utilities-wecare-for-homeowners-and-renters",
    "websiteUrl": "https://lge-ku.com/wecare",
    "applicationUrl": "https://lge-ku.com/sites/default/files/media/files/downloads/WeCare-Application-English.pdf",
    "administrator": "Louisville Gas and Electric and Kentucky Utilities",
    "programType": "Income Qualified Weatherization Direct Install",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 4,
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
          "Louisville Gas and Electric",
          "Kentucky Utilities"
        ],
        "notes": "Available to eligible LG&E and KU residential customers and qualifying apartment building owners in Kentucky utility service territory."
      },
      "eligibleApplicantTypes": [
        "income_qualified_residential_customers",
        "homeowners",
        "renters",
        "apartment_building_owners",
        "multifamily_property_managers"
      ],
      "eligibleSectors": [
        "residential",
        "low_income_residential",
        "multifamily",
        "affordable_housing"
      ],
      "eligibleRetrofitCategories": [
        "energy_audit",
        "energy_efficiency_direct_install",
        "led_lighting_retrofit",
        "programmable_smart_thermostat",
        "low_flow_water_devices",
        "air_sealing_weatherization",
        "duct_sealing_and_insulation",
        "insulation_upgrade",
        "appliance_tune_up_or_replacement"
      ],
      "hardRequirements": [
        "Homeowners and renters must be LG&E or KU residential customers with at least one month of service.",
        "Homeowner or renter address must not have received WeCare services within the last three years.",
        "Customer must receive qualifying income-based assistance or self-attest to the applicable federal income threshold.",
        "Renters must provide property owner consent before services are scheduled.",
        "Apartment building owners need an LG&E or KU account for common areas, at least four units and at least 50% income-qualified tenants."
      ],
      "blockers": [
        "Doors and windows are explicitly excluded.",
        "This is no-cost weatherization, education and direct install, not a standard customer rebate.",
        "Weatherization products such as insulation and duct sealing are installed only in some cases based on assessment.",
        "Do not match commercial properties except the specific apartment-building-owner pathway.",
        "Do not match broad HVAC replacement unless the current WeCare assessment specifically approves appliance tune-up or replacement."
      ],
      "programType": "Income Qualified Weatherization Direct Install",
      "administrator": "Louisville Gas and Electric and Kentucky Utilities",
      "applicationUrl": "https://lge-ku.com/sites/default/files/media/files/downloads/WeCare-Application-English.pdf",
      "websiteUrl": "https://lge-ku.com/wecare",
      "sourceUrlsChecked": [
        "https://lge-ku.com/wecare",
        "https://lge-ku.com/sites/default/files/media/files/downloads/WeCare-Application-English.pdf"
      ],
      "evidenceText": "LG&E and KU describe WeCare as no-cost education and weatherization for income-qualified customers, with audits, LEDs, thermostats, water devices and possible insulation or duct sealing; doors and windows are excluded.",
      "reasoningNotes": "Kept weatherization, duct sealing, insulation and LED direct-install measures; added eligibility gates for renters and apartment building owners and blocked windows, doors and broad rebate-style matching."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "medium",
        "evidenceText": "WeCare provides eligible customers no-cost weatherization services rather than a published customer rebate formula.",
        "sourceUrlsChecked": [
          "https://lge-ku.com/wecare"
        ],
        "reasoningNotes": "No-cost service delivery should not be converted to a fixed upfront incentive amount without a source formula.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2306",
    "opportunityName": "Salt River Electric - Residential Energy Efficiency Rebate Programs",
    "state": "KY",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2306/salt-river-electric-residential-energy-efficiency-rebate-programs",
    "websiteUrl": "https://www.srelectric.com/rebates/",
    "applicationUrl": null,
    "administrator": "Salt River Electric Cooperative",
    "programType": "Residential Energy Efficiency Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 4,
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
          "KY"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Salt River Electric Cooperative"
        ],
        "notes": "Limited to Salt River Electric Cooperative residential members and eligible homes in Kentucky."
      },
      "eligibleApplicantTypes": [
        "residential_member",
        "homeowner",
        "salt_river_electric_member"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "air_source_heat_pump",
        "heat_pump_upgrade",
        "smart_thermostat",
        "insulation_upgrade",
        "air_sealing_weatherization",
        "window_door_replacement",
        "attic_access_weatherization"
      ],
      "hardRequirements": [
        "Applicant must be a Salt River Electric residential member.",
        "Heat pump retrofit or upgrade must meet program eligibility and AHRI documentation requirements.",
        "Button Up weatherization projects require contacting the cooperative before improvements, qualifying home age and electric primary heat, receipts, and heat-loss calculation documentation.",
        "Final eligibility is determined by the cooperative."
      ],
      "blockers": [
        "Do not match LED lighting; current Salt River rebate page did not list residential lighting rebates under this program.",
        "Do not match geothermal unless a current Salt River rebate form separately verifies geothermal eligibility.",
        "Do not match generic high-efficiency HVAC outside the listed heat pump retrofit or upgrade measures."
      ],
      "programType": "Residential Energy Efficiency Rebate Program",
      "administrator": "Salt River Electric Cooperative",
      "applicationUrl": null,
      "websiteUrl": "https://www.srelectric.com/rebates/",
      "sourceUrlsChecked": [
        "https://www.srelectric.com/rebates/",
        "https://www.srelectric.com/heat-pump-retrofit/",
        "https://www.srelectric.com/heat-pump-upgrades/",
        "https://www.srelectric.com/button-up/",
        "https://www.srelectric.com/bring-your-own-thermostat/"
      ],
      "evidenceText": "Salt River’s rebate pages list heat pump retrofit, heat pump upgrades, Button Up weatherization, and Bring Your Own Thermostat incentives for members.",
      "reasoningNotes": "The current official pages support heat pumps, thermostat, and weatherization. Geothermal and LED lighting should be removed unless a newer official form separately confirms them."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "GPT Pro found a cold-climate heat pump amount, but this target is mapped to motor/VFD efficiency.",
        "sourceUrlsChecked": [
          "https://www.srelectric.com/rebates-programs",
          "https://www.togetherwesaveky.com/programs"
        ],
        "reasoningNotes": "Do not attach HVAC rebates to a motor/VFD target without a matching source-backed motor rule.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ]
  }
]
