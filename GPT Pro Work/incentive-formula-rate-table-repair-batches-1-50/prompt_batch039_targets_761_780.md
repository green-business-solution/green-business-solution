You are helping RetroFi repair incentive formulas, rate tables, grant estimates, tax credits, and non-cash workflow value rules.

Return strict JSON only. Do not include markdown, code fences, commentary, or citations outside JSON fields.

Batch: 39
Targets in this prompt: 761-780 of 984
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
  "batchNumber": 39,
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
  "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:3831"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2307",
    "opportunityName": "South Kentucky RECC - Residential Energy Efficiency Rebate Program",
    "state": "KY",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2307/south-kentucky-recc-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.skrecc.com/",
    "applicationUrl": null,
    "administrator": "South Kentucky Rural Electric Cooperative Corporation",
    "programType": "Residential Energy Efficiency Rebate And Weatherization Assistance",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
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
          "KY"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "South Kentucky RECC"
        ],
        "notes": "Available to eligible South Kentucky RECC residential members, with weatherization assistance routed through participating community action agencies."
      },
      "eligibleApplicantTypes": [
        "residential_member",
        "homeowner",
        "income_qualified_customer"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "smart_thermostat",
        "air_sealing_weatherization"
      ],
      "hardRequirements": [
        "Heat pump retrofit applies to qualifying residential members replacing electric resistance heating in existing electrically heated homes.",
        "Existing homes generally must be at least two years old, except qualifying manufactured homes under stated rules.",
        "Smart thermostats must be enrolled in the SimpleSaver program to receive incentives or bill credits.",
        "Weatherization support is through the CARES program for qualifying members and local community action agencies.",
        "Program limits, qualifying equipment rules and funding availability apply."
      ],
      "blockers": [
        "Central air conditioner SimpleSaver participation is demand response enrollment, not a general high-efficiency HVAC replacement rebate.",
        "Do not match high-efficiency HVAC replacement unless the project specifically replaces electric resistance heat with a qualifying heat pump.",
        "Weatherization is not a standard open rebate for all residential customers."
      ],
      "programType": "Residential Energy Efficiency Rebate And Weatherization Assistance",
      "administrator": "South Kentucky Rural Electric Cooperative Corporation",
      "applicationUrl": null,
      "websiteUrl": "https://www.skrecc.com/",
      "sourceUrlsChecked": [
        "https://www.skrecc.com/simple-saver-programs",
        "https://www.skrecc.com/heat-pump-retrofit-0",
        "https://www.skrecc.com/cares-2025"
      ],
      "evidenceText": "South Kentucky RECC pages show heat pump retrofit incentives for replacing electric resistance heat, SimpleSaver smart thermostat enrollment incentives, and CARES weatherization assistance for qualifying members.",
      "reasoningNotes": "The match should be narrowed. Heat pump and thermostat matches are supported, but central AC is a demand response credit and not a replacement rebate."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "South Kentucky RECC source did not expose current heat pump or smart thermostat values in accessible text.",
        "sourceUrlsChecked": [
          "https://www.skrecc.com/"
        ],
        "reasoningNotes": "No official current HVAC measure table was verified.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22327",
    "opportunityName": "National Grid (Electric) - Electric Vehicle Charging Station  Program",
    "state": "MA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22327/national-grid-electric-electric-vehicle-charging-station-program",
    "websiteUrl": "https://www.nationalgridus.com/MA-Business/Commercial-and-Fleet-EV-Programs",
    "applicationUrl": "https://nationalgridcleanenergy.my.site.com/tradepartners",
    "administrator": "National Grid",
    "programType": "Rebate Make Ready Incentive",
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
          "charging station",
          "electric vehicle charging",
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
          "MA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "National Grid Massachusetts electric service territory"
        ],
        "notes": "Applies to National Grid Massachusetts business, public, fleet, and multifamily customer sites subject to program track limits and funding."
      },
      "eligibleApplicantTypes": [
        "business_customer",
        "public_site_host",
        "workplace_site_host",
        "multifamily_property_owner",
        "fleet_operator",
        "municipality",
        "public_fleet"
      ],
      "eligibleSectors": [
        "commercial",
        "multifamily",
        "government",
        "institutional",
        "fleet",
        "public_sector"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation",
        "dc_fast_charger_installation",
        "ev_make_ready_electrical_upgrade",
        "multifamily_ev_charger_installation",
        "fleet_ev_charger_installation"
      ],
      "hardRequirements": [
        "Applicant must be in National Grid Massachusetts electric territory and receive program pre-approval before construction or purchase commitments.",
        "Equipment must meet applicable Level 2 or DCFC qualified equipment and networking requirements.",
        "MUD sites generally require five or more units, and Level 1 charging is not eligible for the MUD program.",
        "Program incentives are subject to funding, application requirements, and deadlines such as signed pre-approval by the stated program date."
      ],
      "blockers": [
        "Do not match replacement of existing Level 2 or DCFC stations where replacement is ineligible.",
        "Public and workplace new applications may be waitlisted and funded only if resources remain.",
        "Do not match standalone battery storage or broader fleet electrification costs outside EV charging make-ready and eligible chargers.",
        "Do not match sites outside National Grid's Massachusetts electric territory."
      ],
      "programType": "Rebate Make Ready Incentive",
      "administrator": "National Grid",
      "applicationUrl": "https://nationalgridcleanenergy.my.site.com/tradepartners",
      "websiteUrl": "https://www.nationalgridus.com/MA-Business/Commercial-and-Fleet-EV-Programs",
      "sourceUrlsChecked": [
        "https://www.nationalgridus.com/MA-Business/Energy-Saving-Programs/Electric-Vehicle-Charging-Station-Program",
        "https://www.nationalgridus.com/MA-Business/Commercial-and-Fleet-EV-Programs",
        "https://www.nationalgridus.com/MA-Business/Commercial-and-Fleet-EV-Programs/Public/Public-Workplace-Programs",
        "https://www.nationalgridus.com/MA-Business/Commercial-and-Fleet-EV-Programs/Multi-Unit-Dwelling-Programs",
        "https://www.nationalgridus.com/MA-Business/Commercial-and-Fleet-EV-Programs/Fleet-Programs",
        "https://www.nationalgridus.com/MA-Business/Commercial-and-Fleet-EV-Programs/Frequently-Asked-Questions",
        "https://www.nationalgridus.com/media/pdfs/bus-ways-to-save/cm8215-ev-application-requirement-ma.pdf"
      ],
      "evidenceText": "National]( Grid Massachusetts EV programs support Level 2 and DC fast charging make-ready for public, workplace, multifamily, and fleet sites with pre-approval requirements.",
      "reasoningNotes": "The original EV categories are broadly correct, but matching should enforce territory, site-track, waitlist, pre-approval, and replacement-equipment limits."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "National Grid make-ready funding covers eligible electrical infrastructure, not necessarily all equipment and installation costs.",
        "sourceUrlsChecked": [
          "https://www.nationalgridus.com/MA-Business/Commercial-and-Fleet-EV-Programs/Public/Public-Workplace-Programs"
        ],
        "reasoningNotes": "Deferred because current engine lacks a dedicated infrastructure-cost basis and could overstate savings.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3385",
    "opportunityName": "Baltimore Gas & Electric Company (Electric) - Commercial Energy Efficiency Program",
    "state": "MD",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3385/baltimore-gas-and-electric-company-electric-commercial-energy-efficiency-program",
    "websiteUrl": "https://bgesmartenergy.com/business/business-programs/energy-solutions-business",
    "applicationUrl": "https://bgeiconline.customerapplication.com/",
    "administrator": "Baltimore Gas and Electric",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
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
          "MD"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Baltimore Gas and Electric electric service territory"
        ],
        "notes": "Eligibility is tied to qualifying BGE non-residential electric rate schedules."
      },
      "eligibleApplicantTypes": [
        "commercial_electric_customer",
        "industrial_electric_customer",
        "government_electric_customer",
        "institutional_electric_customer",
        "nonprofit_electric_customer",
        "multifamily_property_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "government",
        "institutional",
        "nonprofit",
        "multifamily",
        "food_service"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_hvac_replacement",
        "high_efficiency_refrigeration_equipment",
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "commercial_kitchen_equipment",
        "plug_load_equipment",
        "commercial_appliances",
        "multifamily_tenant_equipment",
        "new_construction_energy_star_design",
        "custom_electric_energy_efficiency"
      ],
      "hardRequirements": [
        "Customer must be an eligible BGE non-residential electric customer.",
        "Eligible rate schedules include G, GS, GL, P, and T.",
        "Custom measures must exceed standards, not be code-required or standard practice, and produce verifiable electric savings.",
        "Lighting products must meet applicable DLC or ENERGY STAR qualification requirements where required."
      ],
      "blockers": [
        "Do not match purely gas-saving measures without eligible BGE electric savings.",
        "Do not match standard practice or code-required equipment as custom measures.",
        "Do not infer residential single-family rebates from this commercial program."
      ],
      "programType": "Rebate",
      "administrator": "Baltimore Gas and Electric",
      "applicationUrl": "https://bgeiconline.customerapplication.com/",
      "websiteUrl": "https://bgesmartenergy.com/business/business-programs/energy-solutions-business",
      "sourceUrlsChecked": [
        "https://bgesmartenergy.com/business/business-programs/energy-solutions-business",
        "https://bgesmartenergy.com/business/business-programs/energy-solutions-business/lighting-controls",
        "https://bgesmartenergy.com/business/business-programs/energy-solutions-business/custom-measures",
        "https://bgesmartenergy.com/business/business-programs/energy-solutions-business/faqs",
        "https://bgeiconline.customerapplication.com/"
      ],
      "evidenceText": "BGE Energy Solutions for Business lists direct incentives for appliances, HVAC systems, kitchen equipment, lighting and controls, multifamily tenant equipment, plug load equipment, refrigeration equipment, and custom measures for eligible non-residential electric customers.",
      "reasoningNotes": "All original retrofit matches are supported by current BGE business program sources, with the important limitation that the program is for eligible BGE non-residential electric accounts and electric savings."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "BGE business program page describes energy solutions but did not expose a clear refrigeration measure amount.",
        "sourceUrlsChecked": [
          "https://bgesmartenergy.com/business/business-programs/energy-solutions-business",
          "https://bgesmartenergy.com/"
        ],
        "reasoningNotes": "No source-backed refrigeration per-unit value was verified.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22319",
    "opportunityName": "Delmarva - EVsmart",
    "state": "MD",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22319/delmarva-evsmart",
    "websiteUrl": "https://www.delmarva.com/SmartEnergy/InnovationTechnology/Pages/ElectricVehicleProgramMD.aspx",
    "applicationUrl": null,
    "administrator": "Delmarva Power",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
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
      }
    ],
    "repairedOpportunityData": {
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "MD"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Delmarva Power Maryland electric service territory"
        ],
        "notes": "Applies to Delmarva Power Maryland residential and multifamily electric customers."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customer",
        "multifamily_property_owner",
        "multifamily_property_operator"
      ],
      "eligibleSectors": [
        "residential",
        "multifamily"
      ],
      "eligibleRetrofitCategories": [
        "residential_level_2_ev_charger_installation",
        "multifamily_level_2_ev_charger_installation",
        "level_2_ev_charger_installation"
      ],
      "hardRequirements": [
        "Applicant must be an active Delmarva Power Maryland electric customer.",
        "Residential participants must install an eligible Level 2 smart charger with Wi-Fi or cellular connectivity and provide charging data access.",
        "Multifamily participants must provide charging data and driver cost information.",
        "Eligible charger, network, warranty, installation, and documentation requirements apply."
      ],
      "blockers": [
        "Do not match DC fast chargers; current official Delmarva sources reviewed did not verify an active DCFC rebate under this program.",
        "Do not match broad make-ready electrical upgrades unless tied to documented eligible Level 2 installations.",
        "Do not match non-Maryland Delmarva customers or non-electric customers."
      ],
      "programType": "Rebate",
      "administrator": "Delmarva Power",
      "applicationUrl": null,
      "websiteUrl": "https://www.delmarva.com/SmartEnergy/InnovationTechnology/Pages/ElectricVehicleProgramMD.aspx",
      "sourceUrlsChecked": [
        "https://www.delmarva.com/SmartEnergy/InnovationTechnology/Pages/ElectricVehicleProgramMD.aspx",
        "https://homeenergysavings.delmarva.com/md/residential/SmartEnergy/InnovationTechnology/Pages/FAQs",
        "https://secure.delmarva.com/SmartEnergy/SmartMeterSmartGrid/Pages/RegisterYourElectronicVehicle.aspx",
        "https://delmarva.chooseev.com/commercial/promos/"
      ],
      "evidenceText": "Delmarva]( Maryland FAQ verifies residential and multifamily Level 2 smart charger rebates with customer, connectivity, data, and equipment requirements.",
      "reasoningNotes": "Level 2 EV charging is supported. DCFC and broad make-ready matches were not verified from current official Delmarva sources and should be blocked."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "source_inaccessible",
        "confidence": "low",
        "evidenceText": "Official Delmarva EVsmart program page did not expose rebate formula text.",
        "sourceUrlsChecked": [
          "https://www.delmarva.com/SmartEnergy/InnovationTechnology/Pages/ElectricVehicleProgramMD.aspx"
        ],
        "reasoningNotes": "No source-backed upfront EVSE rule could be verified.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3577",
    "opportunityName": "Lake Region Electric Cooperative - Agriculture and Commercial Energy Efficiency Grant Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3577/lake-region-electric-cooperative-agriculture-and-commercial-energy-efficiency-grant-program",
    "websiteUrl": "https://www.lrec.coop/energy-services/ag-commercial-energy-grants/",
    "applicationUrl": "https://www.lrec.coop/energy-services/rebates-loans-and-tax-credits/",
    "administrator": "Lake Region Electric Cooperative",
    "programType": "Grant/Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
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
          "vending machine controls"
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
          "Lake Region Electric Cooperative service territory"
        ],
        "notes": "Applies to qualifying Lake Region Electric Cooperative commercial, industrial and agricultural customers."
      },
      "eligibleApplicantTypes": [
        "Lake Region Electric Cooperative commercial customers",
        "agricultural customers",
        "industrial customers",
        "dairy operations",
        "business customers pursuing efficiency improvements",
        "customers seeking audits or engineering/design assistance"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "agriculture",
        "dairy",
        "food_and_beverage",
        "cold_storage",
        "manufacturing"
      ],
      "eligibleRetrofitCategories": [
        "commercial_energy_efficiency_grant",
        "custom_energy_efficiency",
        "energy_audit",
        "engineering_design_assistance",
        "premium_efficiency_motors",
        "adjustable_speed_drives",
        "compressed_air_systems",
        "commercial_refrigeration",
        "vending_machine_controls",
        "anti_sweat_door_heater_controls",
        "commercial_hvac",
        "dairy_well_water_precooler",
        "dairy_waste_heat_recovery",
        "commercial_led_lighting",
        "new_lighting",
        "retrofit_lighting"
      ],
      "hardRequirements": [
        "Applicant must be a qualifying Lake Region Electric Cooperative commercial, industrial or agricultural customer.",
        "Grant funding is project-specific and requires engagement with Lake Region Electric Cooperative energy management staff.",
        "Eligible grant uses must be for electric energy-efficiency improvements, audits, or engineering and design assistance for new or existing facilities.",
        "Current 2026 rebate forms and funding are subject to program availability and deadlines stated by LREC or its Energy Wise partner.",
        "Measure-specific rebate forms and documentation are required for commercial LED lighting, custom energy rebates, dairy, motors and drives, commercial EV charging or other current offerings."
      ],
      "blockers": [
        "This is not a residential rebate and should not be mapped to home HVAC, appliances or weatherization.",
        "Grant amount and eligibility are project-specific; the record should not be converted into a deterministic per-unit rebate without a current form and project scope.",
        "Vending-machine support is limited to controllers for beverage machines and door heaters on refrigerated cases, not general vending equipment replacement.",
        "EV charging appears as a separate commercial EV charging rebate form on LREC's rebate page and was not merged into the agriculture/commercial energy-efficiency grant categories unless matched to that separate form."
      ],
      "programType": "Grant/Rebate Program",
      "administrator": "Lake Region Electric Cooperative",
      "applicationUrl": "https://www.lrec.coop/energy-services/rebates-loans-and-tax-credits/",
      "websiteUrl": "https://www.lrec.coop/energy-services/ag-commercial-energy-grants/",
      "sourceUrlsChecked": [
        "https://www.lrec.coop/energy-services/ag-commercial-energy-grants/",
        "https://www.lrec.coop/energy-services/rebates-loans-and-tax-credits/",
        "http://www.lrec.coop/products-service/ag-commercial-energy-grants",
        "https://programs.dsireusa.org/system/program/detail/3577/lake-region-electric-cooperative-agriculture-and-commercial-energy-efficiency-grant-program"
      ],
      "evidenceText": "Lake Region Electric Cooperative's Ag & Commercial Energy Grants page says grants are available to qualifying commercial customers for electric efficiency improvements, audits, and engineering/design assistance, and lists motors, adjustable-speed drives, compressed air, refrigeration, HVAC, beverage-machine controllers, refrigerated-case door-heater controls, dairy heat-recovery or pre-cooling measures, and lighting.",
      "reasoningNotes": "The current official replacement page verifies the program as active and commercial/agricultural. Measures were retained only where LREC explicitly listed them."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Lake Region lists eligible commercial and agricultural measures but did not publish a reusable refrigeration or control formula.",
        "sourceUrlsChecked": [
          "https://www.lrec.coop/energy-services/rebates-loans-and-tax-credits/",
          "https://programs.dsireusa.org/system/program/detail/3577"
        ],
        "reasoningNotes": "No safe one-time rule was verified for target refrigeration or vending control measures.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5143",
    "opportunityName": "Minnesota Energy Services (25 Member Cooperatives) - Residential Energy Efficiency Rebate",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5143/minnesota-energy-services-25-member-cooperatives-residential-energy-efficiency-rebate",
    "websiteUrl": "https://www.brightenergysolutions.com/find-a-rebate/",
    "applicationUrl": "https://www.brightenergysolutions.com/find-a-rebate/",
    "administrator": "Bright Energy Solutions / Missouri River Energy Services",
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
          "MN"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Adrian Public Utilities",
          "ALP Utilities",
          "Barnesville Municipal Utilities",
          "Benson Municipal Utilities",
          "Breckenridge Public Utilities",
          "Detroit Lakes Public Utilities",
          "Elbow Lake Municipal Power",
          "Henning Municipal Utilities",
          "Hutchinson Utilities Commission",
          "Jackson Municipal Utilities",
          "Lake Park Public Utilities",
          "Lakefield Public Utilities",
          "Luverne Municipal Utilities",
          "Madison Municipal Utilities",
          "Marshall Municipal Utilities",
          "Melrose Public Utilities",
          "Moorhead Public Service",
          "Ortonville Municipal Utilities",
          "Sauk Centre Public Utilities",
          "St. James Public Utilities",
          "Staples Water & Light",
          "Wadena Utilities Department",
          "Westbrook Public Utilities",
          "Willmar Municipal Utilities",
          "Worthington Public Utilities"
        ],
        "notes": "Bright Energy Solutions rebates vary by participating Missouri River Energy Services member utility; the Minnesota member utilities listed are current official participants."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customer",
        "participating_municipal_utility_customer"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "air_source_heat_pump",
        "ductless_mini_split_heat_pump",
        "ground_source_geothermal_heat_pump",
        "central_air_conditioner_replacement",
        "heat_pump_water_heater",
        "smart_thermostat_zoning_retrofit",
        "residential_led_downlights",
        "ev_level_2_charger",
        "energy_star_residential_appliances",
        "hvac_tune_up"
      ],
      "hardRequirements": [
        "Customer must select and qualify through a participating Bright Energy Solutions member utility.",
        "Rebate availability, amounts, and forms vary by local municipal utility.",
        "Some appliance rebates have product-specific limits, such as clothes washers requiring electric water heating.",
        "Heating and cooling rebates have equipment-efficiency and local-form requirements."
      ],
      "blockers": [
        "Do not match commercial refrigeration equipment to this residential rebate record.",
        "No current official home rebate list verified refrigerator or freezer rebates for this residential program.",
        "Commercial/business rebates are separate from the residential member-utility program.",
        "Do not generalize product-specific residential appliance rebates into commercial kitchen or refrigeration measures."
      ],
      "programType": "Rebate Program",
      "administrator": "Bright Energy Solutions / Missouri River Energy Services",
      "applicationUrl": "https://www.brightenergysolutions.com/find-a-rebate/",
      "websiteUrl": "https://www.brightenergysolutions.com/find-a-rebate/",
      "sourceUrlsChecked": [
        "https://www.brightenergysolutions.com/members",
        "https://www.brightenergysolutions.com/members/hutchinson-utilities-commission?rebates=residential",
        "https://www.brightenergysolutions.com/find-a-rebate/"
      ],
      "evidenceText": "The official member list identifies Minnesota participating municipal utilities. A current Minnesota member home-rebate page lists air-source, mini-split and geothermal heat pumps, smart thermostats, heat-pump water heaters, LED downlights, EV chargers, appliances, and tune-ups.",
      "reasoningNotes": "The old refrigerator/freezer match should be blocked for residential matching because current home rebate evidence does not support that category; commercial refrigeration belongs to business rebate contexts."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Program uses Bright Energy Solutions member utilities with many appliance and HVAC values varying by utility.",
        "sourceUrlsChecked": [
          "https://www.brightenergysolutions.com/find-a-rebate/",
          "https://programs.dsireusa.org/system/program/detail/5143"
        ],
        "reasoningNotes": "Target is refrigeration; a utility-specific refrigerator or freezer value should be selected before merging a rule.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2434",
    "opportunityName": "Columbia Water & Light - Residential HVAC Rebates",
    "state": "MO",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2434/columbia-water-and-light-residential-hvac-rebates",
    "websiteUrl": "https://www.como.gov/utilities/columbia-power-partners/residential-programs-and-tools/air-conditioner-and-heat-pump-rebates/",
    "applicationUrl": "https://www.como.gov/utilities/columbia-power-partners/residential-programs-and-tools/air-conditioner-and-heat-pump-rebates/",
    "administrator": "Columbia Water and Light",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 4,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
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
          "Boone County"
        ],
        "cities": [
          "Columbia"
        ],
        "utilityTerritories": [
          "Columbia Water and Light electric service territory"
        ],
        "notes": "Program is for qualifying City of Columbia Utilities residential electric customers."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customer",
        "homeowner",
        "residential_utility_customer"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_air_conditioner",
        "heat_pump_hvac_retrofit",
        "ground_source_geothermal_heat_pump",
        "dual_fuel_heat_pump",
        "electric_auxiliary_heat_pump",
        "high_efficiency_hvac_replacement"
      ],
      "hardRequirements": [
        "Applicant must be a City of Columbia Utilities electric customer.",
        "Rebate is for replacing an existing system with a new eligible unit.",
        "New construction is not eligible for the AC and air-source heat pump rebate.",
        "Heat pump systems must meet at least 15.2 SEER2 and applicable AHRI documentation requirements.",
        "Mechanical permits and proper equipment sizing are required.",
        "Efficient electrification rebates have separate limits, invoice timing requirements, and one-rebate-per-residence rules."
      ],
      "blockers": [
        "Do not match efficient_pump_replacement; the word pump refers to heat pumps, not process pumps, water pumps, or motor-driven pump replacement.",
        "Do not infer commercial motors, VFDs, or pump efficiency measures from this residential HVAC rebate.",
        "Do not match heat pump rebates for new AC or heat pump systems that do not replace an existing system unless a separate efficient electrification new-construction category applies."
      ],
      "programType": "Rebate",
      "administrator": "Columbia Water and Light",
      "applicationUrl": "https://www.como.gov/utilities/columbia-power-partners/residential-programs-and-tools/air-conditioner-and-heat-pump-rebates/",
      "websiteUrl": "https://www.como.gov/utilities/columbia-power-partners/residential-programs-and-tools/air-conditioner-and-heat-pump-rebates/",
      "sourceUrlsChecked": [
        "https://www.como.gov/utilities/columbia-power-partners/residential-programs-and-tools/air-conditioner-and-heat-pump-incentives/",
        "https://www.como.gov/utilities/columbia-power-partners/residential-programs-and-tools/air-conditioner-and-heat-pump-rebates/",
        "https://www.como.gov/utilities/columbia-power-partners/residential-programs-and-tools/efficient-electrification/",
        "https://www.como.gov/archive/2024/11/Residential_ACHeatPump_Form.pdf"
      ],
      "evidenceText": "Columbia's residential AC and heat pump rebate page lists air conditioners, air-source heat pumps, and geothermal units. The efficient electrification page separately supports qualifying dual-fuel and electric auxiliary heat pump replacements for residential electric customers.",
      "reasoningNotes": "The heat pump, geothermal, and high-efficiency HVAC matches are supported when narrowed to residential AC, heat pump, and geothermal systems. Efficient pump replacement is a false positive."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Official page confirms HVAC rebate eligibility and application requirements, but accessible text did not verify amounts.",
        "sourceUrlsChecked": [
          "https://www.como.gov/utilities/columbia-power-partners/residential-programs-and-tools/air-conditioner-and-heat-pump-rebates/"
        ],
        "reasoningNotes": "A later pass should extract current application/table values before creating a per-unit or per-ton rule.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3897",
    "opportunityName": "Spire - Residential Rebates",
    "state": "MO",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3897/spire-residential-rebates",
    "websiteUrl": "https://www.spireenergy.com/rebates",
    "applicationUrl": "https://www.spireenergy.com/rebates",
    "administrator": "Spire",
    "programType": "Rebate Program",
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
          "Spire Missouri East natural gas service territory",
          "Spire Missouri West natural gas service territory"
        ],
        "notes": "Eligibility is tied to Spire natural gas service in Missouri; Spire's rebate interface distinguishes Missouri East and Missouri West offer codes."
      },
      "eligibleApplicantTypes": [
        "Spire residential natural gas customers",
        "homeowners",
        "residential account holders",
        "residential customers using qualified installers",
        "landlords or property owners for eligible residential premises"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "natural_gas_furnace",
        "natural_gas_water_heater",
        "tankless_natural_gas_water_heater",
        "smart_thermostat_limited",
        "insulation_limited",
        "furnace_or_water_heater_financing_limited"
      ],
      "hardRequirements": [
        "Applicant must be a Spire residential natural gas customer in the applicable Missouri service area.",
        "Eligible equipment must be qualifying natural gas equipment or an eligible measure under the selected Spire rebate offer.",
        "Application documentation must include the correct Spire account and service address, receipt or invoice, model and installation information.",
        "Unlicensed-contractor installations may not be processed under Spire's application guidance.",
        "Missouri applications must use the appropriate Spire Missouri East or Missouri West offer path or code."
      ],
      "blockers": [
        "Matched heat pump is not retained because current Spire residential rebate sources checked support natural gas appliances and related residential measures, not electric heat pump installation.",
        "This is a gas utility residential program and should not be mapped to electric HVAC, EV charging, lighting, refrigeration, or commercial measures.",
        "Gas water heater eligibility should not be generalized to heat pump water heaters.",
        "Insulation and thermostat support are retained only as limited current Spire residential paths, not as broad whole-home retrofit grants."
      ],
      "programType": "Rebate Program",
      "administrator": "Spire",
      "applicationUrl": "https://www.spireenergy.com/rebates",
      "websiteUrl": "https://www.spireenergy.com/rebates",
      "sourceUrlsChecked": [
        "https://www.spireenergy.com/rebates",
        "https://www.spireenergy.com/water-heater-rebates",
        "https://www.spireenergy.com/furnace-rebates",
        "https://www.spireenergy.com/rebate-application-guide",
        "https://programs.dsireusa.org/system/program/detail/3897/spire-residential-rebates"
      ],
      "evidenceText": "Spire's current rebate pages direct residential customers to rebates for qualifying natural gas appliances and related home measures. Current Spire pages include furnace, water heater, thermostat, insulation and financing paths, and the application guide identifies Missouri East and Missouri West offer handling and required invoice, model, account and installation documentation.",
      "reasoningNotes": "The record is active but the imported heat-pump match is a false positive for this gas-utility residential rebate. Categories were narrowed to natural gas residential equipment and limited related measures."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "GPT Pro found a natural gas furnace rebate, but this target is mapped to electric HVAC efficiency.",
        "sourceUrlsChecked": [
          "https://www.spireenergy.com/rebates",
          "https://www.spireenergy.com/rebates/missouri-rebates"
        ],
        "reasoningNotes": "Gas furnace rebates should not be attached to an electric HVAC target.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22542",
    "opportunityName": "Entergy Mississippi - Low-to-Moderate Income Residential Incentive Program",
    "state": "MS",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22542/entergy-mississippi-low-to-moderate-income-residential-incentive-program",
    "websiteUrl": "https://www.entergy-mississippi.com/your_home/tariffs/",
    "applicationUrl": null,
    "administrator": "Entergy Mississippi",
    "programType": "Renewable Distributed Generation Cash Incentive",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
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
          "demand response"
        ]
      },
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
          "Entergy Mississippi"
        ],
        "notes": "Entergy Mississippi service territory; NEM-2 excludes the Downtown Jackson Network where applicable."
      },
      "eligibleApplicantTypes": [
        "low_to_moderate_income_residential_customers",
        "residential_landlords_of_qualifying_low_income_rental_units",
        "residential_distributed_generation_interconnection_customers"
      ],
      "eligibleSectors": [
        "residential",
        "affordable_housing"
      ],
      "eligibleRetrofitCategories": [
        "renewable_distributed_generation",
        "solar_pv_system",
        "small_wind_generation"
      ],
      "hardRequirements": [
        "Customer must qualify under Entergy Mississippi NEM-2 and the LMI Energy Independence Incentive.",
        "Residential distributed generation must be on premises, interconnection-approved, at least 4 kWDC and no more than 110% of prior-year annual usage.",
        "Residential customer income or qualifying rental-unit status must meet the tariff LMI requirements.",
        "A Company-approved energy efficiency audit and proof of installation are required.",
        "Incentive is first-come, budget-limited and subject to tariff sunset or extension."
      ],
      "blockers": [
        "Battery storage and demand-response battery incentives are separate and mutually exclusive with this LMI incentive.",
        "Do not match automated demand response controls, battery storage, geothermal heat pumps, biomass or biogas systems to this LMI renewable DG incentive.",
        "Downtown Jackson Network customers and facilities failing NEM interconnection requirements are excluded."
      ],
      "programType": "Renewable Distributed Generation Cash Incentive",
      "administrator": "Entergy Mississippi",
      "applicationUrl": null,
      "websiteUrl": "https://www.entergy-mississippi.com/your_home/tariffs/",
      "sourceUrlsChecked": [
        "https://www.entergy-mississippi.com/your_home/tariffs/",
        "https://www.entergymississippi.com/wp-content/uploads/eml_nem.pdf"
      ],
      "evidenceText": "The NEM tariff provides a one-time $3,000 LMI Energy Independence incentive for qualifying residential distributed-generation customers installing eligible renewable generation, subject to audit, income, sizing, budget and service-area limits.",
      "reasoningNotes": "Matched technologies were overbroad; the current tariff supports renewable distributed generation, while battery demand response is a separate mutually exclusive program. Prompt source file citation:"
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Official sources checked did not provide a current solar, geothermal, demand-response, or biomass one-time formula.",
        "sourceUrlsChecked": [
          "https://www.mississippipower.com/residential/pricing---rates.html",
          "https://entergyetech.com/"
        ],
        "reasoningNotes": "No safe source-backed rule could be created for the target renewable/storage terms.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2007",
    "opportunityName": "City of Statesville Electric Utility Department - Residential and Commercial Energy Efficiency Rebate Program",
    "state": "NC",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2007/city-of-statesville-electric-utility-department-residential-and-commercial-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.statesvillenc.net/electric-utility-rebates/",
    "applicationUrl": null,
    "administrator": "City of Statesville Electric Utility Department",
    "programType": "Rebate",
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
          "NC"
        ],
        "counties": [
          "Iredell County"
        ],
        "cities": [
          "Statesville"
        ],
        "utilityTerritories": [
          "City of Statesville electric utility service territory"
        ],
        "notes": "Residential rebates apply to City of Statesville Electric service addresses; commercial and industrial rebates apply to qualifying City electric customers through the public power program."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customer",
        "commercial_electric_customer",
        "industrial_electric_customer",
        "utility_account_holder"
      ],
      "eligibleSectors": [
        "residential",
        "commercial",
        "industrial"
      ],
      "eligibleRetrofitCategories": [
        "ground_source_geothermal_heat_pump",
        "heat_pump_hvac_retrofit",
        "high_efficiency_hvac_replacement",
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "compressed_air_efficiency",
        "motors_and_drives_efficiency",
        "high_efficiency_electric_water_heater"
      ],
      "hardRequirements": [
        "Residential heat pump rebates require installation at a City of Statesville Electric service address.",
        "Residential heat pump equipment must be solely electric, installed by a licensed HVAC contractor, and meet applicable SEER2 requirements.",
        "Residential applications must be submitted within 90 days with proof of payment.",
        "Commercial and industrial projects require preapproval before the project starts.",
        "Commercial and industrial customers must meet operating-hour and account-holder requirements.",
        "New commercial and industrial equipment is required."
      ],
      "blockers": [
        "Do not infer residential geothermal or heat pump rebates for non-electric systems.",
        "Commercial and industrial rebates are limited to lighting, lighting controls, compressed air, HVAC systems, and motors and drives.",
        "Do not match commercial or industrial projects that begin before required preapproval."
      ],
      "programType": "Rebate",
      "administrator": "City of Statesville Electric Utility Department",
      "applicationUrl": null,
      "websiteUrl": "https://www.statesvillenc.net/electric-utility-rebates/",
      "sourceUrlsChecked": [
        "https://www.statesvillenc.net/electric-utility-rebates/",
        "https://www.statesvillenc.net/electric-heat-pump-rebates/",
        "https://www.statesvillenc.net/frequently-asked-questions/",
        "https://assets.locable.com/pdfs/9905/attachments-original-1771509458-UPDATED_residential_rebate_form.pdf?1771509458="
      ],
      "evidenceText": "Statesville's rebate page lists residential electric heat pump and electric water heater rebates, plus commercial and industrial lighting upgrades, lighting controls, compressed air, HVAC systems, and motors and drives. The heat pump page includes geothermal heat pumps.",
      "reasoningNotes": "All original heat pump, geothermal, HVAC, and LED lighting matches are supported, and the current program also supports commercial lighting controls, compressed air, motors and drives, and residential electric water heaters."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Official current geothermal or heat-pump rebate amounts were not verified from accessible source text.",
        "sourceUrlsChecked": [
          "https://www.statesvillenc.net/departments/electric-utilities/energy-efficiency"
        ],
        "reasoningNotes": "No safe motor/HVAC measure rule was found.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3841",
    "opportunityName": "El Paso Electric Company - Commercial Efficiency Program",
    "state": "NM",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3841/el-paso-electric-company-commercial-efficiency-program",
    "websiteUrl": "https://www.epelectric.com/energy-efficiency/new-mexico-business-energy-efficiency",
    "applicationUrl": null,
    "administrator": "El Paso Electric Company",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 4,
    "targetKind": "reviewed_no_rule_reclassification",
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
          "El Paso Electric New Mexico service territory"
        ],
        "notes": "New Mexico business energy efficiency programs serve eligible El Paso Electric business customers, with subprograms by customer size and sector."
      },
      "eligibleApplicantTypes": [
        "commercial_electric_customer",
        "industrial_electric_customer",
        "school",
        "municipality",
        "county_government",
        "institutional_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "institutional",
        "government",
        "education"
      ],
      "eligibleRetrofitCategories": [
        "commercial_high_efficiency_hvac_cooling_equipment",
        "evaporative_cooling_equipment",
        "hvac_variable_frequency_drive",
        "guest_room_hvac_energy_management_controls",
        "commercial_refrigeration_equipment",
        "commercial_food_service_equipment",
        "commercial_lighting_retrofit",
        "cool_roof",
        "air_infiltration_measures",
        "faucet_aerator",
        "low_flow_showerhead",
        "pre_rinse_spray_valve",
        "pool_pump_replacement"
      ],
      "hardRequirements": [
        "Applicant must be an eligible El Paso Electric New Mexico business customer.",
        "Commercial Comprehensive generally serves customers at or below the stated demand threshold; SCORE Plus serves larger customers and public-sector participants.",
        "Program rules, eligible equipment lists, pre-approval, inspections, and documentation requirements apply."
      ],
      "blockers": [
        "Do not match residential measures.",
        "Do not match cooling tower controls; official measures reviewed did not verify a cooling tower control rebate.",
        "Do not match generic heat pump replacement unless specifically listed in current measure details.",
        "Do not match window replacement; official measures include solar screens or film, not replacement windows.",
        "Water measures are product-specific and should not be generalized to whole-building plumbing retrofits."
      ],
      "programType": "Rebate",
      "administrator": "El Paso Electric Company",
      "applicationUrl": null,
      "websiteUrl": "https://www.epelectric.com/energy-efficiency/new-mexico-business-energy-efficiency",
      "sourceUrlsChecked": [
        "http://www.epesaver.com/",
        "https://www.epelectric.com/energy-efficiency",
        "https://www.epelectric.com/energy-efficiency/new-mexico-business-energy-efficiency",
        "https://www.epelectric.com/energy-efficiency/new-mexico-business-energy-efficiency/commercial-comprehensive",
        "https://www.epelectric.com/energy-efficiency/new-mexico-business-energy-efficiency/new-mexico-score-plus"
      ],
      "evidenceText": "EPE]( lists New Mexico business efficiency programs with commercial HVAC, refrigeration, food service, lighting, envelope, and product-specific water measures.",
      "reasoningNotes": "HVAC and refrigeration categories are valid only as commercial business measures. Cooling tower controls, window replacement, and broad heat-pump matching are unsupported."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "EPE commercial program page did not expose a current cooling-tower or commercial kitchen amount in accessible source text.",
        "sourceUrlsChecked": [
          "http://www.epesaver.com/",
          "https://www.epelectric.com/energy-efficiency"
        ],
        "reasoningNotes": "No safe one-time rule was found for the matched commercial measures.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3905",
    "opportunityName": "Orange and Rockland Utilities (Gas) - Residential Efficiency Program",
    "state": "NY",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3905/orange-and-rockland-utilities-gas-residential-efficiency-program",
    "websiteUrl": "https://www.oru.com/en/save-money/rebates-incentives-credits/new-york-customers/incentives-for-residential-customers-ny/energy-efficient-equipment-rebates/gas-appliance-rebates",
    "applicationUrl": null,
    "administrator": "Orange and Rockland Utilities, Inc.",
    "programType": "Rebate Program",
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
          "Orange & Rockland Utilities New York gas service territory"
        ],
        "notes": "Eligible equipment must be installed on a New York residential O&R gas account."
      },
      "eligibleApplicantTypes": [
        "residential_gas_customer"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_furnace_retrofit",
        "high_efficiency_boiler_retrofit",
        "natural_gas_tankless_water_heater",
        "combination_furnace_water_heater"
      ],
      "hardRequirements": [
        "New equipment must be a natural gas system installed on a New York residential O&R gas account.",
        "Customer must work with an O&R participating contractor for eligible HVAC gas equipment.",
        "O&R no longer provides downloadable rebate applications or online portal applications for this program.",
        "Equipment must meet listed AFUE or tankless water-heater efficiency thresholds."
      ],
      "blockers": [
        "Do not match air sealing or broad weatherization to this current gas appliance rebate page.",
        "Do not match heat pumps, EV charging, demand response, or electric equipment; those are separate O&R program areas.",
        "Do not match commercial or New Jersey customers to this New York residential gas rebate."
      ],
      "programType": "Rebate Program",
      "administrator": "Orange and Rockland Utilities, Inc.",
      "applicationUrl": null,
      "websiteUrl": "https://www.oru.com/en/save-money/rebates-incentives-credits/new-york-customers/incentives-for-residential-customers-ny/energy-efficient-equipment-rebates/gas-appliance-rebates",
      "sourceUrlsChecked": [
        "https://www.oru.com/en/save-money/rebates-incentives-credits/new-york-customers/incentives-for-residential-customers-ny/energy-efficient-equipment-rebates/gas-appliance-rebates",
        "https://cdnc-dcxprod2-sitecore.azureedge.net/-/media/files/oru/documents/saveenergyandmoney/incentives-and-rebates/for-renters-and-homeowners/res-hvac-terms-and-conditions.pdf?hash=A05D26F4C1146AAE2D2318C790F9BD90&rev=688f1299606543f2b51a89bedf7b8216"
      ],
      "evidenceText": "The current O&R gas rebate page says eligible equipment must be a natural gas system on a New York residential O&R gas account and lists tankless water heaters, gas furnaces, hydronic boilers, combination units, and steam boilers.",
      "reasoningNotes": "Current official evidence supports gas equipment only. Air sealing appears to be an old or separate-program match and should be blocked."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "O&R rebate pages reference gas appliance and weatherization rebates, but accessible text did not show exact amounts.",
        "sourceUrlsChecked": [
          "https://www.oru.com/en/save-money/rebates-incentives-credits/new-york-customers/incentives-for-residential-customers-ny/energy-efficient-equipment-rebates/gas-appliance-rebates"
        ],
        "reasoningNotes": "No safe gas usage reduction rule was selected without the measure table.",
        "originalGapReason": "source_text_unavailable",
        "mapping": {
          "primarySavingsModelId": "gas_usage_reduction",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2008",
    "opportunityName": "Edmond Electric - Energy Efficiency Rebate Programs",
    "state": "OK",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2008/edmond-electric-energy-efficiency-rebate-programs",
    "websiteUrl": "https://www.edmondok.gov/1271/Rebates-Programs",
    "applicationUrl": "https://www.edmondok.gov/1271/Rebates-Programs",
    "administrator": "City of Edmond Utility Office / Edmond Electric",
    "programType": "Rebate Program",
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
          "OK"
        ],
        "counties": [
          "Oklahoma County"
        ],
        "cities": [
          "Edmond"
        ],
        "utilityTerritories": [
          "Edmond Electric service territory"
        ],
        "notes": "Eligibility is tied to Edmond Electric service and City of Edmond utility customer classification."
      },
      "eligibleApplicantTypes": [
        "Edmond Electric residential customers",
        "commercial customers",
        "industrial customers",
        "institutional customers",
        "multifamily customers where allowed by program rules",
        "licensed contractors submitting required documentation"
      ],
      "eligibleSectors": [
        "residential",
        "commercial",
        "industrial",
        "institutional",
        "multifamily"
      ],
      "eligibleRetrofitCategories": [
        "air_source_heat_pump",
        "dual_fuel_heat_pump",
        "ducted_mini_split_heat_pump",
        "ductless_mini_split_heat_pump",
        "ground_source_geothermal_heat_pump",
        "heat_pump_hvac",
        "heat_pump_water_heater_limited",
        "ceiling_insulation",
        "home_energy_audit"
      ],
      "hardRequirements": [
        "Applicant must be an Edmond Electric customer and the installation must be in the Edmond Electric service area.",
        "Residential heat pump rebates require a free home energy audit before installation.",
        "Heat pump equipment must meet Edmond Electric/AHRI minimum efficiency requirements and be installed by a licensed mechanical contractor.",
        "Applications require forms, invoices and documentation submitted within 90 days of installation.",
        "Rebates are not approved when replacement equipment increases kW at the same site.",
        "Repeat rebates at the same location are limited unless the prior rebate is old enough or the project is for an addition or new area."
      ],
      "blockers": [
        "Matched energy audit is a required service or planning step and should not be treated as a physical retrofit.",
        "Do not map this record to motor, VFD, pump or compressed-air measures despite prior automated savings-model text.",
        "Geothermal support is specifically ground-source heat pump equipment, not general geothermal power or district energy.",
        "Ductless and mini-split categories are retained only as eligible heat pump configurations."
      ],
      "programType": "Rebate Program",
      "administrator": "City of Edmond Utility Office / Edmond Electric",
      "applicationUrl": "https://www.edmondok.gov/1271/Rebates-Programs",
      "websiteUrl": "https://www.edmondok.gov/1271/Rebates-Programs",
      "sourceUrlsChecked": [
        "https://www.edmondok.gov/1271/Rebates-Programs",
        "https://www.edmondok.gov/1278/Heat-Pump-Rebates",
        "https://programs.dsireusa.org/system/program/detail/2008/edmond-electric-energy-efficiency-rebate-programs"
      ],
      "evidenceText": "Edmond's current rebates page lists Heat Pump Rebate, Ceiling Insulation, Home Energy Audit and Water Heater rebate programs. The Heat Pump Rebates page states air-source dual fuel, ducted and non-ducted mini-split heat pumps and geothermal systems can qualify across residential, commercial, industrial, institutional and multifamily classifications, subject to audit, AHRI, contractor and 90-day submission rules.",
      "reasoningNotes": "The current official source verifies active heat pump and related efficiency programs. The repair removes false motor/VFD interpretations and treats audits as a prerequisite or service."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Edmond source did not verify exact heat pump, geothermal or audit-linked incentive values in accessible text.",
        "sourceUrlsChecked": [
          "https://www.edmondok.gov/1290/Rebates-Programs"
        ],
        "reasoningNotes": "No source-backed motor/HVAC rule could be created.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4528",
    "opportunityName": "Oklahoma Municipal Power Authority - Demand and Energy Efficiency Program (DEEP)",
    "state": "OK",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4528/oklahoma-municipal-power-authority-demand-and-energy-efficiency-program-deep",
    "websiteUrl": "https://www.ompa.com/services/rebate-programs/",
    "applicationUrl": "https://www.ompa.com/wp-content/uploads/2025/12/DEEP-Application-Ver.-12-2025.pdf",
    "administrator": "Oklahoma Municipal Power Authority",
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
          "OK"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Oklahoma Municipal Power Authority member municipal electric utilities"
        ],
        "notes": "Facility must exist in Oklahoma and be served by an OMPA member utility."
      },
      "eligibleApplicantTypes": [
        "non_residential_electric_customer",
        "municipal_utility_customer",
        "government_entity",
        "nonprofit",
        "commercial_customer",
        "industrial_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "government",
        "nonprofit",
        "public",
        "educational"
      ],
      "eligibleRetrofitCategories": [
        "air_source_heat_pump",
        "dual_fuel_heat_pump",
        "ground_source_geothermal_heat_pump",
        "led_lighting_retrofit"
      ],
      "hardRequirements": [
        "Facility must be in Oklahoma and served by an OMPA member electric utility.",
        "Customer classification must be other than residential; residential customers do not qualify.",
        "Applications must be signed by both the customer representative and municipal electric utility representative.",
        "Existing equipment projects require OMPA inspection before replacement or removal.",
        "Standard HVAC systems, ground-source-to-ground-source replacements, and listed nonqualifying lighting projects do not qualify."
      ],
      "blockers": [
        "Do not match residential rebates.",
        "Do not match EV chargers, electric charging equipment, variable speed drives, motors, appliances, exterior lighting, screw-in/pin/pluggable bulbs, or older LED-to-new LED upgrades.",
        "Do not treat standard HVAC replacement as eligible; only qualifying air-source, dual-fuel, or ground-source heat pump parameters are supported."
      ],
      "programType": "Rebate Program",
      "administrator": "Oklahoma Municipal Power Authority",
      "applicationUrl": "https://www.ompa.com/wp-content/uploads/2025/12/DEEP-Application-Ver.-12-2025.pdf",
      "websiteUrl": "https://www.ompa.com/services/rebate-programs/",
      "sourceUrlsChecked": [
        "https://www.ompa.com/services/rebate-programs/",
        "https://www.ompa.com/wp-content/uploads/2026/01/DEEP-Rebate-Program-Trifold-Brochure-2025-WEB.pdf",
        "https://www.ompa.com/wp-content/uploads/2025/12/DEEP-Policy-Guidlines-2025.pdf",
        "https://www.ompa.com/wp-content/uploads/2025/12/DEEP-Application-Ver.-12-2025.pdf"
      ],
      "evidenceText": "OMPA’s current DEEP policy limits eligibility to non-residential OMPA-member-utility facilities in Oklahoma and supports qualified air-source, dual-fuel, and ground-source heat pumps plus LED lighting replacing ballasted technologies.",
      "reasoningNotes": "The repair keeps heat-pump and LED measures but narrows eligibility to nonresidential customers and blocks EV chargers, motors, appliances, and standard HVAC."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "OMPA DEEP page describes municipal efficiency programs but no clear heat pump or geothermal formula was verified.",
        "sourceUrlsChecked": [
          "https://www.ompa.com/programs/deep/"
        ],
        "reasoningNotes": "No source-backed amount could be selected.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2437",
    "opportunityName": "Commercial Energy Efficiency Rebate for Existing Buildings",
    "state": "OR",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2437/commercial-energy-efficiency-rebate-for-existing-buildings",
    "websiteUrl": "https://www.energytrust.org/existingbuildings",
    "applicationUrl": null,
    "administrator": "Energy Trust of Oregon",
    "programType": "Rebate",
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
          "OR",
          "WA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Portland General Electric",
          "Pacific Power",
          "NW Natural",
          "Cascade Natural Gas",
          "Avista",
          "Energy Trust participating utility service territory"
        ],
        "notes": "Eligible business and multifamily projects must be in Oregon or Southwest Washington and served by an Energy Trust participating utility."
      },
      "eligibleApplicantTypes": [
        "business_customer",
        "commercial_property_owner",
        "commercial_tenant",
        "multifamily_property_owner_or_manager",
        "trade_ally_or_contractor_as_applicant_designee"
      ],
      "eligibleSectors": [
        "commercial",
        "institutional",
        "multifamily_common_areas",
        "industrial",
        "agriculture"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "high_efficiency_hvac_replacement",
        "server_room_mini_split",
        "smart_thermostat_zoning_retrofit",
        "pump_vfd_retrofit",
        "irrigation_pump_vfd",
        "insulation_upgrade",
        "commercial_vent_hood_demand_control_ventilation",
        "commercial_pool_heater_efficiency",
        "greenhouse_envelope_or_heating_efficiency",
        "commercial_water_heating_efficiency",
        "commercial_foodservice_equipment"
      ],
      "hardRequirements": [
        "Customer must be served by an Energy Trust participating utility in the eligible Oregon or Southwest Washington territory.",
        "Measures must meet current Existing Buildings incentive forms and measure-specific performance requirements.",
        "Projects using standard post-install incentives generally must submit the current application and documentation within the program deadline after installation.",
        "Multifamily-only measures must be matched to the multifamily program forms rather than generalized to all commercial buildings."
      ],
      "blockers": [
        "Do not match residential home weatherization or residential appliance-only work to this commercial Existing Buildings record.",
        "Business lighting is not retained from the low-confidence match unless the current Energy Trust lighting offer or form specifically covers the project; lighting may be a separate Energy Trust offer.",
        "Do not match solar, EV charging, or self-generation measures to this record.",
        "Pipe insulation and flat-roof insulation measures may be multifamily-only and should not be generalized to all commercial existing buildings."
      ],
      "programType": "Rebate",
      "administrator": "Energy Trust of Oregon",
      "applicationUrl": null,
      "websiteUrl": "https://www.energytrust.org/existingbuildings",
      "sourceUrlsChecked": [
        "https://insider.energytrust.org/updated-existing-buildings-incentive-go-into-effect-january-1-2026/",
        "https://blog.energytrust.org/2026-existing-buildings-incentive-updates/",
        "https://blog.energytrust.org/a-step-by-step-guide-to-applying-for-existing-buildings-cash-incentives/"
      ],
      "evidenceText": "Current]( 2026 Existing Buildings sources list commercial heat pumps, smart thermostats, VFDs, insulation, vent-hood controls, pool heaters, greenhouse measures, water-heating and foodservice incentives for Oregon and Southwest Washington.",
      "reasoningNotes": "Input target came from the uploaded batch prompt. LED lighting was not retained from the low-confidence match because the reviewed Existing Buildings sources point to separate lighting offers rather than this record."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Energy Trust commercial page points to many offers but did not verify a single insulation or energy-management formula.",
        "sourceUrlsChecked": [
          "https://www.energytrust.org/commercial/"
        ],
        "reasoningNotes": "No safe one-time rule was selected.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2426",
    "opportunityName": "Home Energy Solutions for Existing Homes",
    "state": "OR",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2426/home-energy-solutions-for-existing-homes",
    "websiteUrl": "https://insider.energytrust.org/programs/home-retrofit/forms/",
    "applicationUrl": null,
    "administrator": "Energy Trust of Oregon",
    "programType": "Residential Energy Efficiency Rebate",
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
          "battery storage"
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
          "OR",
          "WA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Portland General Electric",
          "Pacific Power",
          "NW Natural",
          "Cascade Natural Gas",
          "Avista"
        ],
        "notes": "Energy Trust serves customers of participating Oregon utilities and some Washington natural gas customers."
      },
      "eligibleApplicantTypes": [
        "residential_customers",
        "homeowners",
        "renters",
        "landlords",
        "multifamily_property_owners",
        "trade_ally_contractors"
      ],
      "eligibleSectors": [
        "residential",
        "multifamily"
      ],
      "eligibleRetrofitCategories": [
        "insulation_upgrade",
        "air_sealing_weatherization",
        "heat_pump_hvac_retrofit",
        "smart_thermostat_zoning_retrofit",
        "high_efficiency_windows",
        "heat_pump_water_heater",
        "gas_tankless_water_heater",
        "high_efficiency_gas_furnace",
        "gas_fireplace"
      ],
      "hardRequirements": [
        "Customer must be served by a participating Energy Trust utility and meet measure-specific fuel and residence requirements.",
        "Contractors submit applicable Home Retrofit forms and paid invoices.",
        "2026 Home Retrofit incentive changes and measure discontinuations must be applied.",
        "Smart thermostat incentives are limited to eligible gas forced-air furnace applications.",
        "Heat pump, weatherization, window and water-heating measures must meet current specifications."
      ],
      "blockers": [
        "Battery storage belongs to Energy Trust solar-plus-storage programs, not Home Energy Solutions for existing homes.",
        "Electric-heating smart thermostat and heat pump advanced control incentives were discontinued under 2026 changes.",
        "Do not infer commercial or industrial measures from this residential and multifamily program."
      ],
      "programType": "Residential Energy Efficiency Rebate",
      "administrator": "Energy Trust of Oregon",
      "applicationUrl": null,
      "websiteUrl": "https://insider.energytrust.org/programs/home-retrofit/forms/",
      "sourceUrlsChecked": [
        "https://insider.energytrust.org/home-retrofit-incentive-changes-coming-january-1-2026-2/",
        "https://insider.energytrust.org/programs/home-retrofit/forms/",
        "https://insider.energytrust.org/existing-multifamily-incentive-changes-coming-january-1-2026/",
        "https://insider.energytrust.org/energy-trust-announces-solar-incentives-for-2026-and-key-end-of-year-dates-for-2025/",
        "https://insider.energytrust.org/eight-things-to-look-forward-to-in-oregons-solar-industry-in-2026/"
      ],
      "evidenceText": "Official Energy Trust Insider pages identify 2026 Home Retrofit incentives and forms for weatherization, windows, heating, cooling and water heating; solar and storage are handled in separate program communications.",
      "reasoningNotes": "The public residential page was not fully accessible in browser, but current official Insider program pages were accessible and sufficient to repair the measure scope."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Energy Trust existing-home offers are measure-specific; battery storage and thermostat terms do not expose one safe upfront formula.",
        "sourceUrlsChecked": [
          "https://www.energytrust.org/residential/",
          "https://www.energytrust.org/incentives/"
        ],
        "reasoningNotes": "The target is battery/demand related, but source offers mostly efficiency services and measure rebates.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3211",
    "opportunityName": "McMinnville Water & Light - Commercial Energy Efficiency Rebate Programs",
    "state": "OR",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3211/mcminnville-water-and-light-commercial-energy-efficiency-rebate-programs",
    "websiteUrl": "https://www.mc-power.com/energy-efficiency/commercial-energy-programs/",
    "applicationUrl": null,
    "administrator": "McMinnville Water & Light",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
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
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "OR"
        ],
        "counties": [],
        "cities": [
          "McMinnville"
        ],
        "utilityTerritories": [
          "McMinnville Water & Light electric service territory"
        ],
        "notes": "Official commercial pages are for McMinnville Water & Light customers; incentives are not statewide Oregon programs."
      },
      "eligibleApplicantTypes": [
        "commercial_electric_customer",
        "non_residential_electric_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "institutional",
        "nonprofit",
        "government"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "lighting_controls",
        "commercial_window_replacement",
        "insulation_upgrade",
        "air_source_heat_pump",
        "ductless_mini_split_heat_pump",
        "packaged_terminal_heat_pump",
        "hvac_rooftop_unit_controls"
      ],
      "hardRequirements": [
        "Commercial projects must be in McMinnville Water & Light service territory.",
        "Official snippets state projects must be pre-approved.",
        "Replacement window and insulation rebates are limited to existing commercial or non-residential buildings with electric heating.",
        "Packaged terminal heat pump rebates are limited to lodging or residential care buildings."
      ],
      "blockers": [
        "Do not match residential weatherization or residential appliance rebates to this commercial program.",
        "Do not treat insulation as broad air sealing unless the specific air-sealing measure is separately verified.",
        "Demand response, solar, EV charging, or water conservation offerings are not part of this repaired C&I efficiency rebate record."
      ],
      "programType": "Rebate Program",
      "administrator": "McMinnville Water & Light",
      "applicationUrl": null,
      "websiteUrl": "https://www.mc-power.com/energy-efficiency/commercial-energy-programs/",
      "sourceUrlsChecked": [
        "https://www.mc-power.com/energy-efficiency/commercial-energy-programs/",
        "https://www.mc-power.com/energy-efficiency/commercial-energy-programs/lighting-retrofit-rebate/",
        "https://www.mc-power.com/energy-efficiency/energy-efficiency-rebates-incentives/"
      ],
      "evidenceText": "Official MW&L commercial snippets list lighting retrofit, replacement windows, insulation, air-source and ductless heat pumps, packaged terminal heat pumps, rooftop unit controls, and energy audits, with preapproval and electric-heating limits for some measures.",
      "reasoningNotes": "The official site was partially blocked, but current official search snippets were specific enough to repair categories. Keep commercial envelope/HVAC/lighting; remove unsupported broad weatherization."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "McMinnville commercial energy program source did not expose a current insulation or weatherization formula.",
        "sourceUrlsChecked": [
          "https://www.mc-power.com/energy-efficiency/commercial-energy-programs/"
        ],
        "reasoningNotes": "No motor/VFD or envelope rule could be safely selected.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1299",
    "opportunityName": "Midstate Electric Cooperative - Commercial and Industrial Energy Efficiency Rebate Program",
    "state": "OR",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1299/midstate-electric-cooperative-commercial-and-industrial-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.midstateelectric.coop/energy-efficiency/incentives/commercial-industrial/",
    "applicationUrl": null,
    "administrator": "Midstate Electric Cooperative",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
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
          "OR"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Midstate Electric Cooperative service territory"
        ],
        "notes": "Program is limited to Midstate Electric Cooperative commercial and industrial accounts."
      },
      "eligibleApplicantTypes": [
        "commercial_member",
        "industrial_member",
        "non_residential_electric_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "agricultural",
        "institutional"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "motor_replacement_or_vfd",
        "high_efficiency_hvac_replacement",
        "insulation_upgrade",
        "custom_energy_efficiency_measures"
      ],
      "hardRequirements": [
        "Projects must be for Midstate Electric Cooperative commercial or industrial members.",
        "Official snippets state projects must be submitted within 180 days of completion.",
        "Measure eligibility and incentive amounts require Midstate review."
      ],
      "blockers": [
        "Do not match residential weatherization, residential appliances, or home audits to this C&I program.",
        "Energy audits are not verified as a rebated retrofit measure on the current official snippets.",
        "Do not infer solar, EV charging, or demand response from this C&I efficiency rebate record."
      ],
      "programType": "Rebate Program",
      "administrator": "Midstate Electric Cooperative",
      "applicationUrl": null,
      "websiteUrl": "https://www.midstateelectric.coop/energy-efficiency/incentives/commercial-industrial/",
      "sourceUrlsChecked": [
        "https://www.midstateelectric.coop/commercial-industrial",
        "https://www.midstateelectric.coop/energy-efficiency/incentives/commercial-industrial/"
      ],
      "evidenceText": "Official Midstate snippets say C&I incentives cover upgrades to lighting, motors, HVAC systems, insulation, and more, and that projects must be submitted within 180 days of completion.",
      "reasoningNotes": "The official page was access-restricted, so confidence is medium. Current official snippets support C&I lighting, motors, HVAC, insulation, and custom efficiency, but not an energy-audit retrofit."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Midstate commercial source describes energy audits and consultations, but no direct insulation or HVAC rebate formula was found.",
        "sourceUrlsChecked": [
          "https://midstateelectric.coop/energy-efficiency/"
        ],
        "reasoningNotes": "Audit/consultation services are not direct upfront incentive formulas.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3873",
    "opportunityName": "Duquesne Light Company - Commercial and Industrial Energy Efficiency Program",
    "state": "PA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3873/duquesne-light-company-commercial-and-industrial-energy-efficiency-program",
    "websiteUrl": "https://www.duqenergyefficiency.com/",
    "applicationUrl": null,
    "administrator": "Duquesne Light Company",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
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
          "PA"
        ],
        "counties": [],
        "cities": [
          "Pittsburgh"
        ],
        "utilityTerritories": [
          "Duquesne Light Company"
        ],
        "notes": "Limited to qualifying Duquesne Light Company business customers in the utility service territory."
      },
      "eligibleApplicantTypes": [
        "large_business_customer",
        "commercial_customer",
        "industrial_customer",
        "institutional_customer",
        "trade_ally_or_contractor_as_applicant_designee"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "institutional",
        "nonresidential"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "exterior_site_lighting_retrofit",
        "lighting_controls_retrofit",
        "high_efficiency_hvac_replacement",
        "hvac_vfd_retrofit",
        "compressed_air_vfd",
        "high_efficiency_refrigeration_equipment",
        "refrigeration_controls",
        "refrigeration_case_door_retrofit",
        "commercial_foodservice_equipment",
        "custom_energy_efficiency_measure"
      ],
      "hardRequirements": [
        "Business Solutions rebates are for large business customers unless another Duquesne Light business pathway applies.",
        "All measures must result in kWh reduction.",
        "Code-required installations and equipment already receiving instant discounts are not eligible for catalog incentives.",
        "Applications must be submitted within the current program deadline after project completion.",
        "Custom and new-construction projects require program review."
      ],
      "blockers": [
        "Do not match residential refrigerator recycling or residential appliance rebates to this C&I program.",
        "Solar array offers shown on the business site are separate from the C&I efficiency rebate catalog unless using the specific solar program.",
        "New construction is custom and should not be treated as the same as prescriptive retrofit measures.",
        "Refrigeration pipe insulation is limited to refrigeration suction lines and is not broad building-envelope insulation."
      ],
      "programType": "Rebate",
      "administrator": "Duquesne Light Company",
      "applicationUrl": null,
      "websiteUrl": "https://www.duqenergyefficiency.com/",
      "sourceUrlsChecked": [
        "https://www.duqenergyefficiency.com/",
        "https://www.duqenergyefficiency.com/rebates-available",
        "https://www.duqenergyefficiency.com/hvac-incentives",
        "https://www.duqenergyefficiency.com/lighting-incentives",
        "https://www.duqenergyefficiency.com/refrigeration-incentives"
      ],
      "evidenceText": "Duquesne’s]( 2026 business site lists large-customer Business Solutions rebates and catalog measures for LED lighting, lighting controls, HVAC VFD/PTAC/PTHP, refrigeration, food service and custom projects.",
      "reasoningNotes": "The low-confidence lighting, controls, HVAC and refrigeration matches are supported; building-envelope insulation was not part of the supplied target and should not be inferred from refrigeration line insulation."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Official business page describes rebate programs but fetched text did not include refrigeration measure values.",
        "sourceUrlsChecked": [
          "https://www.duqenergyefficiency.com/business-solutions"
        ],
        "reasoningNotes": "No clear refrigeration-specific one-time formula was found.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3021",
    "opportunityName": "Rhode Island Energy (Gas) - Commercial Energy Efficiency Programs",
    "state": "RI",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3021/rhode-island-energy-gas-commercial-energy-efficiency-programs",
    "websiteUrl": "https://www.rienergy.com/site/ways-to-save/save-money-with-rebates-and-incentives/natural-gas-heating",
    "applicationUrl": null,
    "administrator": "Rhode Island Energy",
    "programType": "Commercial Natural Gas Energy Efficiency Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 4,
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
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "RI"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Rhode Island Energy natural gas service territory"
        ],
        "notes": "Limited to Rhode Island Energy commercial natural gas customers in Rhode Island."
      },
      "eligibleApplicantTypes": [
        "commercial_gas_customer",
        "business_customer",
        "institutional_customer",
        "multifamily_property_owner"
      ],
      "eligibleSectors": [
        "commercial",
        "institutional",
        "multifamily",
        "nonresidential"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_boiler_retrofit",
        "high_efficiency_furnace_retrofit",
        "natural_gas_heating_equipment",
        "boiler_controls",
        "heating_controls",
        "programmable_thermostat",
        "gas_water_heater"
      ],
      "hardRequirements": [
        "Applicant must be a Rhode Island Energy commercial natural gas customer.",
        "Equipment must meet the efficiency and documentation requirements of the applicable commercial gas rebate form.",
        "Qualifying installations may require licensed contractor installation, invoices, and customer account documentation."
      ],
      "blockers": [
        "Do not match residential gas heating rebates to this commercial opportunity.",
        "Do not match electric heat pumps or electric demand response programs; those are separate offerings.",
        "Smart thermostat matching should be limited to eligible commercial heating controls or thermostats supported by the current gas program."
      ],
      "programType": "Commercial Natural Gas Energy Efficiency Rebate Program",
      "administrator": "Rhode Island Energy",
      "applicationUrl": null,
      "websiteUrl": "https://www.rienergy.com/site/ways-to-save/save-money-with-rebates-and-incentives/natural-gas-heating",
      "sourceUrlsChecked": [
        "https://energy.ri.gov/energy-incentives/commercial-incentives",
        "https://www.rienergy.com/site/ways-to-save/save-money-with-rebates-and-incentives/natural-gas-heating",
        "https://www.rienergy.com/RI-Business/Energy-Saving-Programs/Commercial-Gas"
      ],
      "evidenceText": "Rhode Island Energy and state energy incentive materials identify business natural gas incentives for furnaces, water heaters, boilers, and heating controls.",
      "reasoningNotes": "Current public pages were difficult to access directly, so confidence is medium. Boiler, furnace, gas heating controls, and related commercial gas measures are supported."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "GPT Pro found furnace and boiler maximum amounts, but this target is mapped to controls/building automation.",
        "sourceUrlsChecked": [
          "https://www.rienergy.com/site/ways-to-save/save-money-with-rebates-and-incentives/savings-for-your-business"
        ],
        "reasoningNotes": "HVAC equipment rebates should not be attached to a controls target without a controls-specific value.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "controls_building_automation",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ]
  }
]
