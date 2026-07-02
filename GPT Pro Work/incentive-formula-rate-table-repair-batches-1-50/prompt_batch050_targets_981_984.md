You are helping RetroFi repair incentive formulas, rate tables, grant estimates, tax credits, and non-cash workflow value rules.

Return strict JSON only. Do not include markdown, code fences, commentary, or citations outside JSON fields.

Batch: 50
Targets in this prompt: 981-984 of 984
Repair objects required: 4

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
  "batchNumber": 50,
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
  "continueFromOpportunityId": null
}

Validation before responding:
- JSON.parse must succeed.
- repairs.length must equal 4.
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2813",
    "opportunityName": "Richland Energy Services - Energy Efficient Commercial Lighting Program",
    "state": "WA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2813/richland-energy-services-energy-efficient-commercial-lighting-program",
    "websiteUrl": "https://www.richlandwa.gov/departments/energy-services/energy-efficiency/commercial-industrial-programs",
    "applicationUrl": null,
    "administrator": "City of Richland Energy Services",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
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
        "counties": [
          "Benton County"
        ],
        "cities": [
          "Richland"
        ],
        "utilityTerritories": [
          "Richland Energy Services"
        ],
        "notes": "Limited to nonresidential accounts served by Richland Energy Services."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "industrial_customer",
        "nonresidential_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "lighting_controls",
        "high_efficiency_hvac_replacement",
        "motor_efficiency_upgrade",
        "custom_energy_efficiency_retrofit",
        "web_enabled_thermostat"
      ],
      "hardRequirements": [
        "Project must be served by Richland Energy Services for a nonresidential account.",
        "Application must be submitted and approved before work begins.",
        "Lighting incentives cannot exceed 70 percent of total project cost.",
        "Lighting projects must show at least 30 percent wattage reduction.",
        "Project must have a simple payback of one year or more before incentive.",
        "Pre-installation inspection or review is required.",
        "Work must be completed within 120 days of RES approval."
      ],
      "blockers": [
        "Do not match residential lighting, residential appliances, or home weatherization.",
        "Do not match projects outside Richland Energy Services territory.",
        "Do not match work started before application approval.",
        "Do not infer battery storage, EV charging, or solar incentives."
      ],
      "programType": "Rebate Program",
      "administrator": "City of Richland Energy Services",
      "applicationUrl": null,
      "websiteUrl": "https://www.richlandwa.gov/departments/energy-services/energy-efficiency/commercial-industrial-programs",
      "sourceUrlsChecked": [
        "https://www.richlandwa.gov/departments/energy-services/energy-efficiency/commercial-industrial-programs",
        "https://www.richlandwa.gov/home/showpublisheddocument/440/639096075459570000"
      ],
      "evidenceText": "Richland]( Energy Services offers commercial and industrial rebates for lighting and custom projects, with eligible projects including HVAC, motor-efficiency upgrades and lighting for nonresidential accounts.",
      "reasoningNotes": "The LED lighting match is valid, but the program is nonresidential and requires preapproval and wattage-reduction rules."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Richland commercial programs page says rebates are available for lighting and custom projects but gives no calculable formula.",
        "sourceUrlsChecked": [
          "https://www.richlandwa.gov/departments/energy-services/energy-efficiency/commercial-industrial-programs"
        ],
        "reasoningNotes": "No per-fixture, percent, or per-kWh rate was verified from official text.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:381",
    "opportunityName": "Tax Abatement for Solar Manufacturers",
    "state": "WA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/381/tax-abatement-for-solar-manufacturers",
    "websiteUrl": "https://dor.wa.gov/education/industry-guides/manufacturing-guide/manufacturing-solar-energy-systems-and-components-solar-energy-systems",
    "applicationUrl": null,
    "administrator": "Washington State Department of Revenue",
    "programType": "Industry Tax Preference",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
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
        "utilityTerritories": [],
        "notes": "Washington statewide B&O tax classification for qualifying solar energy system and component manufacturers or wholesalers."
      },
      "eligibleApplicantTypes": [
        "solar_equipment_manufacturer",
        "solar_component_manufacturer",
        "processor_for_hire",
        "solar_equipment_wholesaler"
      ],
      "eligibleSectors": [
        "industrial",
        "manufacturing"
      ],
      "eligibleRetrofitCategories": [],
      "hardRequirements": [
        "Business must manufacture or process for hire qualifying solar energy systems or listed solar components.",
        "Wholesale sales of qualifying systems/components may use the specified solar energy B&O classification.",
        "Businesses using the preferential rate must file the Annual Tax Performance Report.",
        "Preferential tax rate expires July 1, 2032."
      ],
      "blockers": [
        "Not available to property owners installing rooftop solar PV.",
        "Not a rebate, grant, or tax credit for end-use solar PV installation.",
        "Do not match to rooftop_solar_pv retrofit opportunities."
      ],
      "programType": "Industry Tax Preference",
      "administrator": "Washington State Department of Revenue",
      "applicationUrl": null,
      "websiteUrl": "https://dor.wa.gov/education/industry-guides/manufacturing-guide/manufacturing-solar-energy-systems-and-components-solar-energy-systems",
      "sourceUrlsChecked": [
        "https://dor.wa.gov/education/industry-guides/manufacturing-guide/manufacturing-solar-energy-systems-and-components-solar-energy-systems",
        "https://dor.wa.gov/open-business/apply-business-license/plan-taxes/business-and-occupation-bo-tax-classification-definitions"
      ],
      "evidenceText": "Washington]( DOR says manufacturers and processors of qualifying solar energy systems or components are taxed at preferential B&O classifications that expire July 1, 2032.",
      "reasoningNotes": "This is not a building retrofit opportunity. Clear rooftop_solar_pv from eligibleRetrofitCategories and retain only industry tax-preference context."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "medium",
        "evidenceText": "Business tax abatement for solar manufacturers, not a direct customer solar project rebate.",
        "sourceUrlsChecked": [
          "http://dor.wa.gov/content/findtaxesandrates/bandotax"
        ],
        "reasoningNotes": "Manufacturer tax preferences do not map to customer project incentives.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5218",
    "opportunityName": "Commercial Retro-Commissioning and New Construction Program",
    "state": "WI",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5218/commercial-retro-commissioning-and-new-construction-program",
    "websiteUrl": "https://focusonenergy.com/business/new-construction",
    "applicationUrl": "https://focusonenergy.com/business/building-optimization",
    "administrator": "Focus on Energy",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
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
          "WI"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Focus on Energy participating Wisconsin utilities"
        ],
        "notes": "Available to eligible customers of participating Wisconsin utilities through Focus on Energy business programs."
      },
      "eligibleApplicantTypes": [
        "business_customer",
        "commercial_property_owner",
        "facility_manager",
        "developer",
        "design_team"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "institutional",
        "multifamily_residential"
      ],
      "eligibleRetrofitCategories": [
        "retro_commissioning_study",
        "building_optimization",
        "building_performance_optimization",
        "energy_design_assistance",
        "energy_design_review",
        "new_construction_energy_efficiency"
      ],
      "hardRequirements": [
        "Customer must be served by a participating Wisconsin utility.",
        "Building optimization applies to existing facilities and is best suited to buildings at least six years old and over 5,000 square feet.",
        "New construction and renovation support applies to qualifying projects in appropriate design or construction stages."
      ],
      "blockers": [
        "Do not merge new construction design assistance and existing-building retro-commissioning into one physical retrofit measure.",
        "Do not match residential appliance or home weatherization measures to this business program.",
        "Eligibility depends on Focus on Energy program path and participating utility service."
      ],
      "programType": "Rebate Program",
      "administrator": "Focus on Energy",
      "applicationUrl": "https://focusonenergy.com/business/building-optimization",
      "websiteUrl": "https://focusonenergy.com/business/new-construction",
      "sourceUrlsChecked": [
        "https://focusonenergy.com/business",
        "https://focusonenergy.com/business/building-optimization",
        "https://focusonenergy.com/business/new-construction"
      ],
      "evidenceText": "Focus]( on Energy business pages describe building optimization for existing facilities and new construction or renovation support for qualifying commercial, industrial, multifamily, and other projects.",
      "reasoningNotes": "The retro-commissioning or building optimization match is supported for the existing-facility path. New construction measures should remain separately scoped within the same business program family."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "medium",
        "evidenceText": "Focus on Energy new construction/retro-commissioning offerings are project-specific services and design incentives.",
        "sourceUrlsChecked": [
          "https://focusonenergy.com/business/new-construction"
        ],
        "reasoningNotes": "Commissioning services and project-specific awards should not be forced into one-time equipment rules.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "project_cost_reduction_only",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22545",
    "opportunityName": "Madison Gas & Electric - Charge Ahead Program",
    "state": "WI",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22545/madison-gas-and-electric-charge-ahead-program",
    "websiteUrl": "https://mge.ev.energy/",
    "applicationUrl": "https://web.ev.energy/",
    "administrator": "Madison Gas and Electric",
    "programType": "Performance-Based Incentive / Managed Charging Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
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
          "charging station"
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
          "Madison Gas and Electric"
        ],
        "notes": "Limited to MGE residential electric customers charging an EV at the registered home address."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customer",
        "ev_owner",
        "ev_lessee"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "ev_managed_charging",
        "ev_charging_demand_response",
        "home_ev_charging_optimization"
      ],
      "hardRequirements": [
        "Customer must be an MGE residential electric customer who owns or leases an EV and charges at home.",
        "Customer must connect a compatible EV or compatible home charger through the ev.energy app.",
        "Smart charging must remain enabled to earn standard-rate customer rewards.",
        "Standard-rate customers must charge at least 80% off-peak and have no more than three unmanaged sessions in a month to earn monthly rewards.",
        "MGE only manages charging at the registered home address."
      ],
      "blockers": [
        "Not an EV charger installation rebate.",
        "Public and workplace charging are not managed by the program.",
        "A separate MGE EV charging rebate effort, if approved, should not be merged into Charge Ahead."
      ],
      "programType": "Performance-Based Incentive / Managed Charging Program",
      "administrator": "Madison Gas and Electric",
      "applicationUrl": "https://web.ev.energy/",
      "websiteUrl": "https://mge.ev.energy/",
      "sourceUrlsChecked": [
        "https://www.mge.com/our-environment/electric-vehicles/charging/charge-ahead",
        "https://www.mge.com/smart-energy/electric-vehicles/ev-programs/charge-ahead",
        "https://mge.ev.energy/"
      ],
      "evidenceText": "MGE Charge Ahead lets residential EV customers earn rewards by connecting a compatible EV or charger and smart charging at home during off-peak periods.",
      "reasoningNotes": "The prior ev_charger_installation match is a false positive. The source supports managed charging behavior and performance rewards, not charger purchase or installation."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "high",
        "evidenceText": "Charge Ahead provides off-peak managed charging credits, not an upfront charger rebate.",
        "sourceUrlsChecked": [
          "https://www.mge.com/smart-energy/electric-vehicles/ev-programs/charge-ahead"
        ],
        "reasoningNotes": "Monthly/seasonal bill credits are excluded from one-time savings rules.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "project_cost_reduction_only",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ]
  }
]
