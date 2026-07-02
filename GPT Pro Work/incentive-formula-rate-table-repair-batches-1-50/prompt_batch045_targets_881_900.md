You are helping RetroFi repair incentive formulas, rate tables, grant estimates, tax credits, and non-cash workflow value rules.

Return strict JSON only. Do not include markdown, code fences, commentary, or citations outside JSON fields.

Batch: 45
Targets in this prompt: 881-900 of 984
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
  "batchNumber": 45,
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
  "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:5138"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2591",
    "opportunityName": "Southern Minnesota Municipal Power Agency  - (17 Municipal Utilities) Commercial & Industrial Energy Efficiency Rebate Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2591/southern-minnesota-municipal-power-agency-17-municipal-utilities-commercial-and-industrial-energy-efficiency-rebate-program",
    "websiteUrl": "https://smmpa.com/energy-efficiency",
    "applicationUrl": null,
    "administrator": "Southern Minnesota Municipal Power Agency",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
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
          "energy management"
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
          "MN"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Austin Utilities",
          "Blooming Prairie Public Utilities",
          "Fairmont Public Utilities",
          "Grand Marais Public Utilities",
          "Lake City Public Utilities",
          "Litchfield Public Utilities",
          "Mora Municipal Utilities",
          "New Prague Utilities",
          "Owatonna Public Utilities",
          "Preston Public Utilities",
          "Princeton Public Utilities",
          "Redwood Falls Public Utilities",
          "Rochester Public Utilities",
          "Saint Peter Municipal Utilities",
          "Spring Valley Public Utilities",
          "Waseca Utilities",
          "Wells Public Utilities"
        ],
        "notes": "Rebates are administered through participating Southern Minnesota Municipal Power Agency member municipal utilities."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "industrial_customer",
        "municipal_utility_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial"
      ],
      "eligibleRetrofitCategories": [
        "guestroom_energy_management_controls",
        "high_efficiency_refrigeration_equipment"
      ],
      "hardRequirements": [
        "Applicant must be a commercial or industrial electric customer of a participating SMMPA member utility.",
        "Measure must appear on the current local member utility rebate form or qualify through a custom program.",
        "Customer must submit required equipment documentation and utility rebate forms.",
        "Preapproval may be required for some measures."
      ],
      "blockers": [
        "Not a residential appliance or home weatherization program.",
        "Energy management should be narrowed to listed guestroom energy management controls or specifically approved custom measures, not broad EMS software or controls.",
        "Refrigeration rebates apply to commercial refrigeration equipment, not household refrigerators."
      ],
      "programType": "Rebate Program",
      "administrator": "Southern Minnesota Municipal Power Agency",
      "applicationUrl": null,
      "websiteUrl": "https://smmpa.com/energy-efficiency",
      "sourceUrlsChecked": [
        "https://smmpa.com/energy-efficiency",
        "https://smmpa.com/members/lake-city",
        "https://smmpa.com/"
      ],
      "evidenceText": "SMMPA]( member utility materials list business rebates including refrigeration equipment and guestroom energy management, alongside other commercial and industrial efficiency measures.",
      "reasoningNotes": "The refrigeration match is supported for C&I customers. Narrow the broad energy-management match to guestroom energy-management controls because that is the product-specific official measure."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "SMMPA/Bright Energy business rebates vary by utility and measure; no current refrigeration value was selected.",
        "sourceUrlsChecked": [
          "https://www.brightenergysolutions.com/resources/business",
          "https://smmpa.com/"
        ],
        "reasoningNotes": "Target refrigeration and energy-management terms require current utility-specific form extraction.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4213",
    "opportunityName": "Columbia Water & Light - HVAC and Lighting Efficiency Rebates",
    "state": "MO",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4213/columbia-water-and-light-hvac-and-lighting-efficiency-rebates",
    "websiteUrl": "https://www.como.gov/utilities/columbia-power-partners/commercial-programs-and-tools/",
    "applicationUrl": null,
    "administrator": "Columbia Water & Light",
    "programType": "Rebate",
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
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "high efficiency hvac"
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
        "cities": [
          "Columbia"
        ],
        "utilityTerritories": [
          "Columbia Water & Light electric service territory"
        ],
        "notes": "Limited to Columbia Water & Light commercial electric customers in Columbia, Missouri."
      },
      "eligibleApplicantTypes": [
        "commercial_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "business",
        "institutional"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "high_efficiency_hvac_replacement",
        "heat_pump_hvac_replacement",
        "ground_source_heat_pump"
      ],
      "hardRequirements": [
        "Applicant must be a Columbia Water & Light commercial electric customer.",
        "Commercial lighting incentive applies to upgrading old lighting fixtures to LED.",
        "Commercial air conditioner and heat pump rebates apply to qualifying efficient HVAC units from 1 to 20 tons.",
        "Projects are subject to program rules, documentation, approval, and available funding."
      ],
      "blockers": [
        "Residential customers are not eligible under this commercial opportunity.",
        "Commercial kitchen, heat pump water heater, EVSE, daylight harvesting, variable speed drive, custom, and loan offerings on the same page are separate programs.",
        "No broad plumbing or low-flow water fixture retrofit is supported by this HVAC and lighting opportunity."
      ],
      "programType": "Rebate",
      "administrator": "Columbia Water & Light",
      "applicationUrl": null,
      "websiteUrl": "https://www.como.gov/utilities/columbia-power-partners/commercial-programs-and-tools/",
      "sourceUrlsChecked": [
        "https://www.como.gov/utilities/columbia-power-partners/commercial-programs-and-tools/"
      ],
      "evidenceText": "The official commercial programs page lists LED lighting incentives and commercial air conditioner, heat pump, and ground-source heat pump rebates for Columbia Water & Light commercial customers.",
      "reasoningNotes": "The two supplied matches are supported; other measures listed on the same page are separate programs. Input targets:"
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Columbia commercial programs page did not expose a clear high-efficiency HVAC or LED amount.",
        "sourceUrlsChecked": [
          "https://www.como.gov/utilities/columbia-power-partners/commercial-programs-and-tools/"
        ],
        "reasoningNotes": "No safe motor/HVAC one-time rule was found in accessible text.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3936",
    "opportunityName": "Independence Power and Light - Residential Energy Efficiency Rebate Program",
    "state": "MO",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3936/independence-power-and-light-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.independencemo.gov/government/city-departments/power-and-light/residential-programs",
    "applicationUrl": null,
    "administrator": "Independence Power and Light",
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
        "cities": [
          "Independence"
        ],
        "utilityTerritories": [
          "Independence Power & Light service territory"
        ],
        "notes": "Applies to eligible Independence Power & Light residential customers."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customers"
      ],
      "eligibleSectors": [
        "residential",
        "multifamily"
      ],
      "eligibleRetrofitCategories": [
        "central_air_conditioner_replacement",
        "heat_pump_hvac_retrofit",
        "heat_pump_water_heater"
      ],
      "hardRequirements": [
        "Equipment must meet Independence Power & Light program standards.",
        "Applicant must submit the required rebate application and purchase or installation documentation.",
        "Rebates are issued as account credits and may be subject to inspection."
      ],
      "blockers": [
        "Commercial customers are not eligible under this residential program.",
        "Net metering and HELP loans are separate programs.",
        "Do not match generic HVAC improvements beyond qualifying central air conditioners, heat pumps, and heat pump water heaters."
      ],
      "programType": "Rebate Program",
      "administrator": "Independence Power and Light",
      "applicationUrl": null,
      "websiteUrl": "https://www.independencemo.gov/government/city-departments/power-and-light/residential-programs",
      "sourceUrlsChecked": [
        "https://www.independencemo.gov/government/city-departments/power-and-light/residential-programs"
      ],
      "evidenceText": "Independence]( Power & Light’s residential page lists rebate applications for air conditioners, heat pumps, and heat pump water heaters for single- and multifamily homes.",
      "reasoningNotes": "Both HVAC-related matches are supported, with narrower categories for central air-conditioning replacement and heat-pump HVAC rather than unrestricted high-efficiency HVAC."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Official residential programs page checked but no current heat-pump or air-conditioning formula was verified.",
        "sourceUrlsChecked": [
          "https://www.independencemo.gov/government/city-departments/power-and-light/residential-programs"
        ],
        "reasoningNotes": "Do not use unrelated commercial custom formula.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3101",
    "opportunityName": "Spire Energy  - Residential High Efficiency Heating Rebate Program",
    "state": "MO",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3101/spire-energy-residential-high-efficiency-heating-rebate-program",
    "websiteUrl": "https://www.spireenergy.com/rebates",
    "applicationUrl": "https://www.spireenergy.com/rebates",
    "administrator": "Spire Energy",
    "programType": "Residential Natural Gas Heating Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 2,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
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
          "MO"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Spire Missouri East",
          "Spire Missouri West"
        ],
        "notes": "Spire rebate pages also show Alabama and Mississippi regions, but this DSIRE record is for Missouri service territory customers."
      },
      "eligibleApplicantTypes": [
        "residential_natural_gas_customers",
        "homeowners"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_furnace_retrofit",
        "high_efficiency_boiler_retrofit",
        "gas_water_heater_retrofit",
        "smart_thermostat_rebate",
        "insulation_upgrade"
      ],
      "hardRequirements": [
        "Applicant must be a Spire residential natural gas customer in an eligible region.",
        "Qualifying natural gas appliances must be purchased and installed.",
        "A qualified natural gas contractor or properly documented installation is required.",
        "Application requires Spire service address, account information, model, cost, and purchase and installation dates."
      ],
      "blockers": [
        "Do not match broad high_efficiency_hvac_replacement; the official pages are for natural gas equipment such as furnaces and related measures.",
        "Do not match electric heat pumps or air-conditioning-only equipment under this natural gas heating rebate.",
        "Equipment installed by an unlicensed contractor may not be processed where contractor licensing is required."
      ],
      "programType": "Residential Natural Gas Heating Rebate",
      "administrator": "Spire Energy",
      "applicationUrl": "https://www.spireenergy.com/rebates",
      "websiteUrl": "https://www.spireenergy.com/rebates",
      "sourceUrlsChecked": [
        "https://www.spireenergy.com/rebates",
        "https://www.spireenergy.com/furnace-rebates",
        "https://www.spireenergy.com/rebate-application-guide",
        "https://www.spireenergy.com/rebates-offers"
      ],
      "evidenceText": "Spire]( describes home rebates for upgrading or replacing natural gas appliances, including furnace rebates, and requires qualifying equipment and application documentation.",
      "reasoningNotes": "Retain the furnace retrofit match. Remove or narrow broad HVAC replacement because eligible measures are natural gas equipment and related residential offers."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Spire residential heating rebates vary by state, service area, and equipment tier; a current furnace table was not safely extracted.",
        "sourceUrlsChecked": [
          "https://www.spireenergy.com/rebates",
          "https://www.spireenergy.com/rebates/missouri-rebates"
        ],
        "reasoningNotes": "No single furnace amount was selected for this target.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2180",
    "opportunityName": "Flathead Electric Cooperative - Commercial Incentive Programs",
    "state": "MT",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2180/flathead-electric-cooperative-commercial-incentive-programs",
    "websiteUrl": "https://www.flatheadelectric.com/energy-solutions/energy-efficiency-rebate-programs/commercial-rebate-programs/",
    "applicationUrl": null,
    "administrator": "Flathead Electric Cooperative",
    "programType": "Commercial And Industrial Electric Cooperative Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
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
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "MT"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Flathead Electric Cooperative electric service territory"
        ],
        "notes": "Limited to Flathead Electric Cooperative members; exact commercial and industrial eligibility must be verified from current program materials."
      },
      "eligibleApplicantTypes": [
        "commercial_member",
        "industrial_member"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit"
      ],
      "hardRequirements": [
        "Applicant must be a Flathead Electric Cooperative commercial or industrial member.",
        "Project must qualify under the Commercial and Industrial Lighting Program or current commercial rebate materials.",
        "Current application, inspection, equipment, and incentive rules must be verified with Flathead Electric before matching or payment."
      ],
      "blockers": [
        "Do not match high-efficiency HVAC replacement from this commercial target unless current commercial rebate materials verify HVAC eligibility.",
        "Do not infer residential heat pump, kitchen, insulation, window, or refrigeration rebates from the commercial lighting program.",
        "On-bill financing is a separate support mechanism and should not be treated as a lighting rebate unless tied to the same measure."
      ],
      "programType": "Commercial And Industrial Electric Cooperative Rebate Program",
      "administrator": "Flathead Electric Cooperative",
      "applicationUrl": null,
      "websiteUrl": "https://www.flatheadelectric.com/energy-solutions/energy-efficiency-rebate-programs/commercial-rebate-programs/",
      "sourceUrlsChecked": [
        "https://www.flatheadelectric.com/energy-solutions/energy-efficiency-rebate-programs/commercial-rebate-programs/",
        "https://www.flatheadelectric.com/energy-solutions/energy-efficiency-rebate-programs/",
        "https://www.flatheadelectric.com/glacier-park-international-airport/",
        "https://www.flatheadelectric.com/energy-solutions/understanding-your-electricity-usage/energy-conservation-ways-to-save/"
      ],
      "evidenceText": "Official]( Flathead snippets identify a Commercial and Industrial Lighting Program, and a 2025 official project article states a rebate was received through the commercial lighting program.",
      "reasoningNotes": "Current official evidence supported commercial and industrial lighting only. HVAC and other non-lighting retrofit categories were removed pending current Flathead confirmation."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Flathead commercial incentives appear measure-specific and no target terms were provided to select a value.",
        "sourceUrlsChecked": [
          "https://www.flatheadelectric.com/energy-solutions/energy-efficiency-rebate-programs/business-rebate-programs/"
        ],
        "reasoningNotes": "No safe formula should be created without a matched measure or current application table.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2006",
    "opportunityName": "City of New Bern Electric Department - Residential Energy Efficiency Rebate Program",
    "state": "NC",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2006/city-of-new-bern-electric-department-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.newbernnc.gov/departments/utilities/electric/energy_rebate_program.php",
    "applicationUrl": "https://www.cognitoforms.com/CityOfNewBern2/ResidentialRebateCreditApplication",
    "administrator": "City of New Bern",
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
          "NC"
        ],
        "counties": [],
        "cities": [
          "New Bern"
        ],
        "utilityTerritories": [
          "City of New Bern Electric Department"
        ],
        "notes": "Available for qualifying existing residential homes served by New Bern electric utility."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customer",
        "residential_landlord",
        "residential_property_owner"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "central_electric_heat_pump_hvac_retrofit",
        "electric_water_heater_replacement"
      ],
      "hardRequirements": [
        "Rebate applies to replacement units on existing homes.",
        "Central heat pump must include heat strips and meet minimum SEER2 and size requirements.",
        "Load management switch must be installed or reconnected for the rebated appliance.",
        "Required documentation and receipt must be submitted with the application."
      ],
      "blockers": [
        "Do not match generic HVAC replacement unless it is a qualifying central electric heat pump with heat strips.",
        "New construction and nonresidential projects are not supported by the checked rebate page.",
        "Removing the load management switch can trigger rebate chargeback under the program terms."
      ],
      "programType": "Rebate Program",
      "administrator": "City of New Bern",
      "applicationUrl": "https://www.cognitoforms.com/CityOfNewBern2/ResidentialRebateCreditApplication",
      "websiteUrl": "https://www.newbernnc.gov/departments/utilities/electric/energy_rebate_program.php",
      "sourceUrlsChecked": [
        "https://www.newbernnc.gov/departments/utilities/electric/energy_rebate_program.php",
        "https://www.cognitoforms.com/CityOfNewBern2/ResidentialRebateCreditApplication",
        "https://cms7files.revize.com/newbernnc/document_center/utilities/Residentidential%20Rebate%20Credit%20Application.pdf"
      ],
      "evidenceText": "New Bern's rebate page lists central heat pump replacements and high-efficiency electric water heaters, with load management switch requirements and credits to electric accounts.",
      "reasoningNotes": "Heat pump is supported but should be narrowed to existing-home central electric heat pump replacements. Add electric water heater if opportunity data allows more complete coverage."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Official New Bern source did not expose a current heat pump rebate formula in accessible text.",
        "sourceUrlsChecked": [
          "http://www.newbernnc.gov/departments/utilities/electric/energy_rebate_program.php"
        ],
        "reasoningNotes": "No source-backed per-unit heat pump rule was verified.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22522",
    "opportunityName": "Energy United - Residential Heat Pump Rebate",
    "state": "NC",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22522/energy-united-residential-heat-pump-rebate",
    "websiteUrl": "https://www.energyunited.com/wp-content/uploads/2024/04/HVAC-Guidelines-Internet-April-2024.pdf",
    "applicationUrl": "https://www.energyunited.com/heat-pump-rebate-form/",
    "administrator": "EnergyUnited",
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
          "NC"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "EnergyUnited"
        ],
        "notes": "Limited to eligible EnergyUnited residential accounts."
      },
      "eligibleApplicantTypes": [
        "energyunited_residential_member",
        "single_family_homeowner",
        "installing_hvac_contractor"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "high_efficiency_air_source_heat_pump",
        "geothermal_heat_pump",
        "ducted_heat_pump_system"
      ],
      "hardRequirements": [
        "Residence must have an active EnergyUnited account.",
        "Eligible dwelling must be a single-family permanent primary dwelling.",
        "Heat pump must meet the current SEER, SEER2, HSPF, HSPF2, AHRI, and capacity requirements.",
        "Application must be submitted electronically by the installing HVAC contractor within 60 days.",
        "Required attachments include AHRI certification, passed inspection, and invoice.",
        "Limit of up to 2 qualifying units per dwelling."
      ],
      "blockers": [
        "Do not match commercial, multifamily, or non-primary residences.",
        "Do not match generic HVAC replacement unless the project is a qualifying heat pump system.",
        "Furnaces, boilers, AC-only replacements, and unrelated PEV or EV programs are outside this opportunity.",
        "Paper applications are not accepted under the reviewed guidelines."
      ],
      "programType": "Rebate Program",
      "administrator": "EnergyUnited",
      "applicationUrl": "https://www.energyunited.com/heat-pump-rebate-form/",
      "websiteUrl": "https://www.energyunited.com/wp-content/uploads/2024/04/HVAC-Guidelines-Internet-April-2024.pdf",
      "sourceUrlsChecked": [
        "https://www.energyunited.com/wp-content/uploads/2024/04/HVAC-Guidelines-Internet-April-2024.pdf",
        "https://www.energyunited.com/heat-pump-rebate-form/",
        "https://www.energyunited.com/energy-services/rebates/pev-programs/"
      ],
      "evidenceText": "EnergyUnited]( heat pump guidelines specify residential single-family eligibility, heat-pump efficiency thresholds, AHRI documentation, contractor electronic submission, inspection, invoice, and a two-unit limit.",
      "reasoningNotes": "The target website URL points to a PEV-related page and is not the correct heat-pump rebate page. Categories were limited to qualifying heat-pump systems."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "source_inaccessible",
        "confidence": "low",
        "evidenceText": "The checked EnergyUnited rebate URL returned inaccessible/outdated content and no current official heat pump amount was verified.",
        "sourceUrlsChecked": [
          "https://www.energyunited.com/energy-services/rebates/pev-programs/",
          "https://www.energyunited.com/energy-efficiency/"
        ],
        "reasoningNotes": "Do not rely on DSIRE-only values without an accessible current official source.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22749",
    "opportunityName": "North Carolina - Home Efficiency Rebate (HER) Program",
    "state": "NC",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22749/north-carolina-home-efficiency-rebate-her-program",
    "websiteUrl": "https://energysavernc.org/",
    "applicationUrl": "https://www.energysavernc.org/",
    "administrator": "North Carolina Department of Environmental Quality State Energy Office",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 2,
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
          "NC"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [],
        "notes": "Statewide North Carolina program available across all counties, subject to income, property, contractor, and program-pathway rules."
      },
      "eligibleApplicantTypes": [
        "homeowners",
        "renters_with_owner_authorization",
        "multifamily_property_owners",
        "income_eligible_households"
      ],
      "eligibleSectors": [
        "residential",
        "multifamily_residential"
      ],
      "eligibleRetrofitCategories": [
        "air_sealing_weatherization",
        "insulation_upgrade",
        "heat_pump_hvac_retrofit",
        "high_efficiency_hvac_replacement",
        "mechanical_ventilation",
        "heat_pump_water_heater"
      ],
      "hardRequirements": [
        "Household income generally must be at or below 150% of area median income",
        "Renters need property owner authorization",
        "Work must use program-approved or registered contractors",
        "Home assessment and modeled savings may be required for the Home Efficiency path",
        "Self-install projects are not eligible"
      ],
      "blockers": [
        "Commercial and industrial properties are not eligible",
        "Households above income limits are blocked",
        "Do-it-yourself installations are not eligible",
        "Emergency repairs, bill assistance, and unrelated appliance rebates are separate from this opportunity",
        "Duplicate rebates for the same measure are not allowed"
      ],
      "programType": "Rebate",
      "administrator": "North Carolina Department of Environmental Quality State Energy Office",
      "applicationUrl": "https://www.energysavernc.org/",
      "websiteUrl": "https://energysavernc.org/",
      "sourceUrlsChecked": [
        "https://www.energysavernc.org/",
        "https://www.deq.nc.gov/energy-climate/state-energy-office/energy-saver-north-carolina",
        "https://www.deq.nc.gov/energy-climate/state-energy-office/energy-saver-north-carolina/energy-efficiency-rebates",
        "https://www.energysavernc.org/about-the-program/homeowners-managing-efficiency-savings-homes/"
      ],
      "evidenceText": "Energy Saver NC identifies income-qualified homeowners and renters as eligible for home energy upgrades including insulation, air sealing, HVAC or heat pumps, ventilation, and heat pump water heaters.",
      "reasoningNotes": "Air sealing and insulation are source-backed. Additional home-efficiency categories are included only where official program pages identify them."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Energy Saver NC HOMES offers up to $16,000, but amount depends on income and modeled energy savings.",
        "sourceUrlsChecked": [
          "https://energysavernc.org/",
          "https://www.deq.nc.gov/energy-climate/state-energy-office/energy-saver-north-carolina"
        ],
        "reasoningNotes": "The target lacks modeled savings and income pathway; no safe percent/cap rule should be created.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22576",
    "opportunityName": "Eversource - Home Battery Storage Rebate",
    "state": "NH",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22576/eversource-home-battery-storage-rebate",
    "websiteUrl": "https://www.eversource.com/residential/save-money-energy/energy-efficiency-programs/demand-response/nhcef-home-battery",
    "applicationUrl": null,
    "administrator": "Eversource",
    "programType": "Residential Battery Rebate And Demand Response",
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
        "retrofitTypeId": "battery_storage_system",
        "displayName": "Battery storage system",
        "parentCategory": "energy_storage_resilience",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "battery storage",
          "storage system"
        ]
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
          "Eversource"
        ],
        "notes": "Limited to eligible Eversource New Hampshire residential customers."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customers",
        "homeowners"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "battery_storage_system",
        "battery_storage_demand_response_participation"
      ],
      "hardRequirements": [
        "Customer must be an eligible New Hampshire Eversource residential customer.",
        "Battery system must use approved manufacturer equipment.",
        "Customer must enroll the battery in Eversource demand response participation.",
        "System must receive Eversource permission to operate or acceptance into the demand response pathway.",
        "Customer must participate for the required minimum term."
      ],
      "blockers": [
        "This is not a general automated demand response controls or energy management system rebate.",
        "Standalone solar PV, generators, and non-battery backup systems are not eligible under this rebate.",
        "Program does not provide annual performance payments under the current NH home battery offer."
      ],
      "programType": "Residential Battery Rebate And Demand Response",
      "administrator": "Eversource",
      "applicationUrl": null,
      "websiteUrl": "https://www.eversource.com/residential/save-money-energy/energy-efficiency-programs/demand-response/nhcef-home-battery",
      "sourceUrlsChecked": [
        "https://www.eversource.com/residential/save-money-energy/energy-efficiency-programs/demand-response/nhcef-home-battery"
      ],
      "evidenceText": "Eversource New Hampshire offers an upfront home battery incentive for approved battery systems enrolled in demand response.",
      "reasoningNotes": "Battery storage is valid, but the automated controls match is too broad and should be replaced by battery demand response participation."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "medium",
        "evidenceText": "Eversource battery storage demand response rewards depend on dispatch/performance participation rather than a direct upfront rebate formula.",
        "sourceUrlsChecked": [
          "https://www.eversource.com/content/residential/save-money-energy/energy-efficiency-programs/demand-response/battery-storage-demand-response/nh"
        ],
        "reasoningNotes": "Battery demand-response payments should not be converted to one-time rules.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5568",
    "opportunityName": "Large Energy Users Program",
    "state": "NJ",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5568/large-energy-users-program",
    "websiteUrl": "https://cleanenergy.nj.gov/programs/energy-efficiency/large-energy-users-program-leup",
    "applicationUrl": null,
    "administrator": "New Jersey Clean Energy Program",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 2,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "combined_heat_and_power_system",
        "displayName": "Combined heat and power system",
        "parentCategory": "solar_renewable_electricity",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "combined heat and power",
          "chp"
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
          "NJ"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [],
        "notes": "Statewide New Jersey program for eligible large non-hospital commercial and industrial utility customers."
      },
      "eligibleApplicantTypes": [
        "large_commercial_customer",
        "industrial_customer",
        "public_entity",
        "public_school",
        "private_nonresidential_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "government",
        "education"
      ],
      "eligibleRetrofitCategories": [
        "combined_heat_and_power_system",
        "led_lighting_retrofit",
        "custom_energy_efficiency_project"
      ],
      "hardRequirements": [
        "Facility must be an existing large non-hospital commercial or industrial facility in New Jersey.",
        "Applicant must meet large energy user eligibility thresholds such as annual energy cost and peak demand or therm usage.",
        "Project must meet applicable minimum performance standards.",
        "Program is first-come, first-served and subject to funding availability.",
        "New construction and substantial renovation are not eligible."
      ],
      "blockers": [
        "Hospitals are not eligible.",
        "Do not match residential projects.",
        "Do not match renewable energy projects; renewable energy is excluded from LEUP incentives.",
        "Do not match new construction or substantial renovation.",
        "Do not classify CHP as solar or renewable electricity for this program."
      ],
      "programType": "Rebate",
      "administrator": "New Jersey Clean Energy Program",
      "applicationUrl": null,
      "websiteUrl": "https://cleanenergy.nj.gov/programs/energy-efficiency/large-energy-users-program-leup",
      "sourceUrlsChecked": [
        "https://cleanenergy.nj.gov/programs/energy-efficiency/large-energy-users-program-leup",
        "https://www.nj.gov/bpu/pdf/boardorders/2025/20250630/8B%20NJCEP%20Programs%20and%20Budget%20Fiscal%20Year%202026%20final.pdf",
        "https://www.njcleanenergy.com/LEUP"
      ],
      "evidenceText": "NJCEP describes LEUP as open for large non-hospital commercial and industrial facilities and supporting energy efficiency and combined heat and power projects.",
      "reasoningNotes": "CHP and LED lighting are supported, but CHP should not inherit a solar or renewable parent category, and renewable-energy projects are explicitly blocked."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "NJ Large Energy Users Program incentives are custom/project-specific for large users and CHP-related scope needs program manual review.",
        "sourceUrlsChecked": [
          "https://www.njcleanenergy.com/LEUP"
        ],
        "reasoningNotes": "No reusable one-time CHP formula was verified from accessible source text.",
        "originalGapReason": "source_text_unavailable",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4629",
    "opportunityName": "NV Energy (Northern Nevada) - Business Energy Efficiency Rebate Program",
    "state": "NV",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4629/nv-energy-northern-nevada-business-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.nvenergy.com/save-with-powershift/business-energy-services",
    "applicationUrl": null,
    "administrator": "Sierra Pacific Power Company d/b/a NV Energy",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 2,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
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
          "NV"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "NV Energy northern Nevada electric service territory"
        ],
        "notes": "Business Energy Services eligibility depends on NV Energy account, rate, project type, and available incentive funds."
      },
      "eligibleApplicantTypes": [
        "commercial_customers",
        "industrial_customers",
        "public_entities",
        "institutional_customers",
        "nonprofit_customers"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "public_sector",
        "institutional",
        "nonprofit"
      ],
      "eligibleRetrofitCategories": [
        "lighting_controls_retrofit",
        "occupancy_sensor_lighting_controls",
        "daylighting_controls",
        "programmable_thermostat_retrofit"
      ],
      "hardRequirements": [
        "Business customer must be served by NV Energy in the applicable service territory",
        "Project generally requires online prenotification before work",
        "Incentive reservation and final documentation deadlines apply",
        "Equipment must meet the applicable 2026 retrofit specification"
      ],
      "blockers": [
        "Residential projects are not eligible under Business Energy Services",
        "smart_thermostat_zoning_retrofit is too broad; source supports programmable thermostat measures with specific rules",
        "Hotel guestroom programmable thermostat measures are not eligible",
        "Lighting controls must control qualifying interior lighting",
        "Funding availability can block otherwise eligible projects"
      ],
      "programType": "Rebate",
      "administrator": "Sierra Pacific Power Company d/b/a NV Energy",
      "applicationUrl": null,
      "websiteUrl": "https://www.nvenergy.com/save-with-powershift/business-energy-services",
      "sourceUrlsChecked": [
        "https://www.nvenergy.com/save-with-powershift/business-energy-services",
        "https://www.nvenergy.com/publish/content/dam/nvenergy/brochures_arch/save-with-powershift/commercial-energy-services/application-documents/NVE_Retrofit_Specifications.pdf",
        "https://www.nvenergy.com/publish/content/dam/nvenergy/brochures_arch/save-with-powershift/commercial-energy-services/Retrofit-New-Construction-Policies-Procedures.pdf"
      ],
      "evidenceText": "NV Energy’s business retrofit specifications include occupancy sensors, daylighting and integrated lighting controls, and programmable thermostat measures, with prenotification and program documentation rules.",
      "reasoningNotes": "Preserve lighting controls and narrow thermostat matching to programmable thermostat retrofit rather than smart thermostat or zoning."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "NV Energy Business Energy Services incentives depend on project assessment; checked materials did not provide a simple thermostat or occupancy-sensor amount.",
        "sourceUrlsChecked": [
          "https://www.nvenergy.com/save-with-powershift/business-energy-services",
          "https://www.nvenergy.com/publish/content/dam/nvenergy/brochures_arch/save-with-powershift/commercial-energy-services/application-documents/NVE_Retrofit_Specifications.pdf"
        ],
        "reasoningNotes": "Specifications define eligibility but not a reusable incentive rate for this target.",
        "originalGapReason": "source_text_unavailable",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2601",
    "opportunityName": "NV Energy (Southern Nevada) - Business Energy Efficiency Rebate Program",
    "state": "NV",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2601/nv-energy-southern-nevada-business-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.nvenergy.com/save-with-powershift/business-energy-services",
    "applicationUrl": null,
    "administrator": "Nevada Power Company d/b/a NV Energy",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 2,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
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
          "NV"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "NV Energy southern Nevada electric service territory"
        ],
        "notes": "Business Energy Services eligibility depends on NV Energy account, rate, project type, and available incentive funds."
      },
      "eligibleApplicantTypes": [
        "commercial_customers",
        "industrial_customers",
        "public_entities",
        "institutional_customers",
        "nonprofit_customers"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "public_sector",
        "institutional",
        "nonprofit"
      ],
      "eligibleRetrofitCategories": [
        "lighting_controls_retrofit",
        "occupancy_sensor_lighting_controls",
        "daylighting_controls",
        "programmable_thermostat_retrofit"
      ],
      "hardRequirements": [
        "Business customer must be served by NV Energy in the applicable service territory",
        "Project generally requires online prenotification before work",
        "Incentive reservation and final documentation deadlines apply",
        "Equipment must meet the applicable 2026 retrofit specification"
      ],
      "blockers": [
        "Residential projects are not eligible under Business Energy Services",
        "smart_thermostat_zoning_retrofit is too broad; source supports programmable thermostat measures with specific rules",
        "Hotel guestroom programmable thermostat measures are not eligible",
        "Lighting controls must control qualifying interior lighting",
        "Funding availability can block otherwise eligible projects"
      ],
      "programType": "Rebate",
      "administrator": "Nevada Power Company d/b/a NV Energy",
      "applicationUrl": null,
      "websiteUrl": "https://www.nvenergy.com/save-with-powershift/business-energy-services",
      "sourceUrlsChecked": [
        "https://www.nvenergy.com/save-with-powershift/business-energy-services",
        "https://www.nvenergy.com/publish/content/dam/nvenergy/brochures_arch/save-with-powershift/commercial-energy-services/application-documents/NVE_Retrofit_Specifications.pdf",
        "https://www.nvenergy.com/publish/content/dam/nvenergy/brochures_arch/save-with-powershift/commercial-energy-services/Retrofit-New-Construction-Policies-Procedures.pdf"
      ],
      "evidenceText": "NV Energy’s business retrofit specifications include occupancy sensors, daylighting and integrated lighting controls, and programmable thermostat measures, with prenotification and program documentation rules.",
      "reasoningNotes": "Preserve lighting controls and narrow thermostat matching to programmable thermostat retrofit rather than smart thermostat or zoning."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "NV Energy business incentives require project assessment and did not expose a thermostat or occupancy-sensor formula.",
        "sourceUrlsChecked": [
          "https://www.nvenergy.com/save-with-powershift/business-energy-services"
        ],
        "reasoningNotes": "No safe commercial kitchen or controls rule was verified from the official source.",
        "originalGapReason": "source_text_unavailable",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1036",
    "opportunityName": "Portfolio Energy Credits",
    "state": "NV",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1036/portfolio-energy-credits",
    "websiteUrl": "https://www.nvtrec.com/",
    "applicationUrl": "https://www.nvtrec.com/",
    "administrator": "Public Utilities Commission of Nevada",
    "programType": "Performance Based Incentive Portfolio Energy Credit Tracking",
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
          "solar pv",
          "photovoltaic",
          "pv system"
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
          "NV"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [],
        "notes": "Nevada portfolio energy credit registration and tracking applies to qualifying renewable energy systems and market participants under Nevada RPS rules."
      },
      "eligibleApplicantTypes": [
        "renewable_energy_system_owners",
        "portfolio_energy_credit_aggregators",
        "electric_service_providers",
        "renewable_energy_market_participants"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "utility",
        "public_sector",
        "agriculture",
        "large_multifamily"
      ],
      "eligibleRetrofitCategories": [
        "solar_pv_system",
        "solar_thermal_system",
        "solar_water_heating_system"
      ],
      "hardRequirements": [
        "Owner must register an NVTREC account and submit the facility for approval",
        "Facility must qualify as a renewable energy system or approved solar thermal system under Nevada rules",
        "NVTREC currently tracks facilities larger than 150 kW",
        "Quarterly metered data or approved reporting is required for credit certification",
        "Credits are tracked, transferred, or retired in NVTREC rather than paid as an upfront rebate"
      ],
      "blockers": [
        "Not a rebate, grant, or direct installation incentive",
        "Small systems at or below the NVTREC tracking threshold should not be matched to this record",
        "Unregistered or unapproved facilities cannot earn tracked credits",
        "Rooftop solar PV is not specifically required and small rooftop systems may be blocked by tracking rules",
        "Nonrenewable efficiency retrofits should not be inferred from the credit-tracking program"
      ],
      "programType": "Performance Based Incentive Portfolio Energy Credit Tracking",
      "administrator": "Public Utilities Commission of Nevada",
      "applicationUrl": "https://www.nvtrec.com/",
      "websiteUrl": "https://www.nvtrec.com/",
      "sourceUrlsChecked": [
        "https://www.nvtrec.com/",
        "https://www.nvtrec.com/UI/Guest/FAQPage.aspx",
        "https://www.leg.state.nv.us/Register/2007Register/R104-07A.pdf"
      ],
      "evidenceText": "NVTREC lets renewable system owners register facilities and certify, track, transfer, or retire portfolio credits. It supports solar generation; Nevada regulations also credit eligible solar thermal heat as equivalent electricity.",
      "reasoningNotes": "Keep solar PV and solar thermal/water heating as credit-generating resources, but block rebate-style matching and small rooftop systems that do not meet NVTREC tracking requirements."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "high",
        "evidenceText": "Nevada Portfolio Energy Credits are tradable renewable energy credits rather than upfront project rebates.",
        "sourceUrlsChecked": [
          "https://www.nvtrec.com"
        ],
        "reasoningNotes": "REC revenue mechanisms are excluded from one-time savings rules.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22388",
    "opportunityName": "Consolidated Edison - SmartCharge New York",
    "state": "NY",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22388/consolidated-edison-smartcharge-new-york",
    "websiteUrl": "https://www.coned.com/en/save-money/rebates-incentives-tax-credits/rebates-incentives-tax-credits-for-residential-customers/electric-vehicle-rewards",
    "applicationUrl": "https://scny.ev.energy/",
    "administrator": "Consolidated Edison",
    "programType": "Managed Charging Rewards",
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
          "charging station"
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
          "NY"
        ],
        "counties": [
          "Bronx",
          "Kings",
          "New York",
          "Queens",
          "Richmond",
          "Westchester"
        ],
        "cities": [
          "New York"
        ],
        "utilityTerritories": [
          "Con Edison electric service territory"
        ],
        "notes": "Available to eligible EV drivers and light-duty fleets in the Con Edison service area."
      },
      "eligibleApplicantTypes": [
        "ev_driver",
        "light_duty_fleet_operator",
        "con_edison_customer"
      ],
      "eligibleSectors": [
        "residential",
        "light_duty_fleet",
        "transportation"
      ],
      "eligibleRetrofitCategories": [
        "ev_managed_charging_rewards"
      ],
      "hardRequirements": [
        "Participant must charge an EV in the Con Edison service area.",
        "Charging rewards depend on off-peak charging behavior and eligible rate status.",
        "Program requires charge data through vehicle telematics or a qualifying smart charging station.",
        "Rewards are tied to program enrollment and ongoing charging behavior."
      ],
      "blockers": [
        "This is not an EV charger installation rebate.",
        "This is not limited to, or specifically a rebate for, Level 2 charger installation.",
        "Hardware purchase and construction costs should not be matched to this managed charging rewards opportunity."
      ],
      "programType": "Managed Charging Rewards",
      "administrator": "Consolidated Edison",
      "applicationUrl": "https://scny.ev.energy/",
      "websiteUrl": "https://www.coned.com/en/save-money/rebates-incentives-tax-credits/rebates-incentives-tax-credits-for-residential-customers/electric-vehicle-rewards",
      "sourceUrlsChecked": [
        "https://www.coned.com/en/save-money/rebates-incentives-tax-credits/rebates-incentives-tax-credits-for-residential-customers/electric-vehicle-rewards",
        "https://scny.ev.energy/"
      ],
      "evidenceText": "Con Edison describes SmartCharge New York as cash incentives for EV drivers and light-duty fleets that charge during off-peak times.",
      "reasoningNotes": "Replace charger installation categories with a managed charging rewards category."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "high",
        "evidenceText": "SmartCharge New York is a managed/off-peak EV charging rewards program, not an upfront charger rebate.",
        "sourceUrlsChecked": [
          "https://www.coned.com/en/save-money/rebates-incentives-tax-credits/rebates-incentives-tax-credits-for-residential-customers/electric-vehicle-rewards"
        ],
        "reasoningNotes": "Charging rewards and recurring bill credits are excluded from one-time incentive rules.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5011",
    "opportunityName": "Orange and Rockland Utilities (Electric) - Energy Efficiency Program",
    "state": "NY",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5011/orange-and-rockland-utilities-electric-energy-efficiency-program",
    "websiteUrl": "https://www.oru.com/en/save-money/rebates-incentives-credits/new-york-customers/incentives-for-residential-customers-ny",
    "applicationUrl": "https://www.oru.com/en/save-money/rebates-incentives-credits/new-york-customers/incentives-for-residential-customers-ny/thermostat-rebate",
    "administrator": "Orange and Rockland Utilities, Inc.",
    "programType": "Rebate And Demand Response",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 2,
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
          "refrigerator"
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
          "NY"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Orange and Rockland Utilities New York electric service territory"
        ],
        "notes": "This repair applies to O&R New York residential electric customer incentives, not Rockland Electric Company New Jersey programs."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customers",
        "homeowners",
        "renters"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "smart_thermostat_demand_response_enrollment",
        "heat_pump_hvac_retrofit",
        "heat_pump_water_heater",
        "insulation_upgrade",
        "weatherization"
      ],
      "hardRequirements": [
        "Customer must have an eligible O&R New York electric account",
        "Smart thermostat incentive requires central air conditioning, Wi-Fi, eligible thermostat, and enrollment in Smart Savers",
        "Other listed measures must follow the applicable O&R New York incentive page and application requirements"
      ],
      "blockers": [
        "high_efficiency_refrigeration_equipment is unsupported for the current O&R New York residential page",
        "Current refrigerator/freezer rebates found under Rockland Electric New Jersey or expired legacy materials should not match this New York opportunity",
        "Thermostat matching should be narrowed to smart thermostat demand response enrollment, not zoning retrofit",
        "Commercial refrigeration is not supported"
      ],
      "programType": "Rebate And Demand Response",
      "administrator": "Orange and Rockland Utilities, Inc.",
      "applicationUrl": "https://www.oru.com/en/save-money/rebates-incentives-credits/new-york-customers/incentives-for-residential-customers-ny/thermostat-rebate",
      "websiteUrl": "https://www.oru.com/en/save-money/rebates-incentives-credits/new-york-customers/incentives-for-residential-customers-ny",
      "sourceUrlsChecked": [
        "https://www.oru.com/en/save-money/rebates-incentives-credits/new-york-customers/incentives-for-residential-customers-ny",
        "https://www.oru.com/en/save-money/rebates-incentives-credits/new-york-customers/incentives-for-residential-customers-ny/thermostat-rebate",
        "https://www.oru.com/en/save-money/rebates-incentives-credits/new-york-customers/incentives-for-residential-customers-ny/clean-heating-cooling-with-heat-pumps/heat-pump-equipment/swap-your-water-heater"
      ],
      "evidenceText": "O&R’s New York residential pages support smart thermostat enrollment and other home efficiency incentives; current refrigeration rebates were not found for this New York opportunity.",
      "reasoningNotes": "Block refrigeration. Keep thermostat only as a demand-response smart thermostat enrollment measure and include other current O&R New York residential efficiency categories."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "medium",
        "evidenceText": "O&R refrigerator item found was recycling/removal oriented, not a direct efficient-refrigerator purchase rebate.",
        "sourceUrlsChecked": [
          "https://www.oru.com/en/save-money/rebates-incentives-credits/new-york-customers/incentives-for-residential-customers-ny"
        ],
        "reasoningNotes": "Appliance recycling or pickup payments should not be used as an upfront retrofit equipment rule.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22206",
    "opportunityName": "VW Funding for Diesel Replacement and EVSE Projects",
    "state": "NY",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22206/vw-funding-for-diesel-replacement-and-evse-projects",
    "websiteUrl": "https://dec.ny.gov/environmental-protection/air-quality/controlling-motor-vehicle-pollution/vw-settlement-information/vw-funding-for-diesel-replacement-and-evse-projects",
    "applicationUrl": null,
    "administrator": "New York State Department of Environmental Conservation",
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
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "evse"
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
        "utilityTerritories": [],
        "notes": "New York Volkswagen settlement funding is administered through project-specific sponsors and solicitations."
      },
      "eligibleApplicantTypes": [
        "fleet_owner",
        "business",
        "public_agency",
        "local_government",
        "transit_agency",
        "eligible_project_sponsor"
      ],
      "eligibleSectors": [
        "commercial",
        "public",
        "transportation"
      ],
      "eligibleRetrofitCategories": [
        "diesel_vehicle_or_equipment_replacement",
        "zero_emission_vehicle_purchase",
        "ev_charging_infrastructure",
        "transit_bus_charging_infrastructure"
      ],
      "hardRequirements": [
        "Project must fit an eligible New York Volkswagen settlement funding category.",
        "Applicant must apply through the applicable project sponsor or solicitation.",
        "Vehicle projects must replace eligible diesel vehicles or equipment under program rules.",
        "EVSE projects must meet the open subprogram's technology, site, and use requirements."
      ],
      "blockers": [
        "Not a general passenger EV purchase rebate.",
        "Not a general building retrofit or energy-efficiency program.",
        "Completed or awarded subprograms, including earlier light-duty charging rounds, should not be matched for new applicants.",
        "Funding status must be checked at the subprogram level."
      ],
      "programType": "Grant Program",
      "administrator": "New York State Department of Environmental Conservation",
      "applicationUrl": null,
      "websiteUrl": "https://dec.ny.gov/environmental-protection/air-quality/controlling-motor-vehicle-pollution/vw-settlement-information/vw-funding-for-diesel-replacement-and-evse-projects",
      "sourceUrlsChecked": [
        "https://dec.ny.gov/environmental-protection/air-quality/controlling-motor-vehicle-pollution/vw-settlement-information/vw-funding-for-diesel-replacement-and-evse-projects",
        "https://programs.dsireusa.org/system/program/detail/22206/vw-funding-for-diesel-replacement-and-evse-projects"
      ],
      "evidenceText": "DEC]( lists Volkswagen settlement funding for diesel vehicle and equipment replacement projects and EVSE projects, with several sponsor-specific opportunities.",
      "reasoningNotes": "Both EVSE and vehicle replacement categories are source-backed, but availability is controlled by each subprogram and should not match generic EV purchases."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "NYSDEC VW funding lists multiple funding opportunities and sponsor-specific incentive amounts.",
        "sourceUrlsChecked": [
          "https://dec.ny.gov/environmental-protection/air-quality/controlling-motor-vehicle-pollution/vw-settlement-information/vw-funding-for-diesel-replacement-and-evse-projects"
        ],
        "reasoningNotes": "No single reusable formula applies across diesel replacement and EVSE sponsor opportunities.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22374",
    "opportunityName": "Portland General Electric (PGE) - Residential EV Charging Pilot Program",
    "state": "OR",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22374/portland-general-electric-pge-residential-ev-charging-pilot-program",
    "websiteUrl": "https://portlandgeneral.com/energy-choices/electric-vehicles-charging/charging-your-ev/charging-your-ev-at-home",
    "applicationUrl": "https://portlandgeneral.com/secure/pge-plus/ev-charger/rebate-only",
    "administrator": "Portland General Electric",
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
          "OR"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Portland General Electric"
        ],
        "notes": "Limited to PGE residential electric customers and eligible home charging sites in PGE service territory."
      },
      "eligibleApplicantTypes": [
        "residential_pge_customers",
        "homeowners",
        "ev_owners_or_lessees",
        "low_and_moderate_income_customers"
      ],
      "eligibleSectors": [
        "residential",
        "single_family"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation",
        "residential_ev_charger",
        "electric_panel_upgrade",
        "managed_ev_charging"
      ],
      "hardRequirements": [
        "Applicant must have a qualifying residential PGE electric account.",
        "Customer must own or lease an eligible electric vehicle or plug-in hybrid vehicle.",
        "Smart Charging participation requires an eligible connected charger, vehicle connection, or approved Tesla or WeaveGrid pathway.",
        "PGE Plus charger installation rebates require a qualified home installation path, account in good standing, and program documentation.",
        "Income-qualified rebate amounts require income verification where applicable."
      ],
      "blockers": [
        "Do not match commercial, fleet, public DC fast charging, or multifamily business projects to this residential home charging path.",
        "PGE Plus home installation terms exclude some multifamily apartment or condominium building configurations.",
        "Panel work is eligible only when tied to PGE Plus home charger installation rules, not as a standalone general panel upgrade."
      ],
      "programType": "Rebate Program",
      "administrator": "Portland General Electric",
      "applicationUrl": "https://portlandgeneral.com/secure/pge-plus/ev-charger/rebate-only",
      "websiteUrl": "https://portlandgeneral.com/energy-choices/electric-vehicles-charging/charging-your-ev/charging-your-ev-at-home",
      "sourceUrlsChecked": [
        "https://portlandgeneral.com/energy-choices/electric-vehicles-charging/charging-your-ev/charging-your-ev-at-home",
        "https://portlandgeneral.com/save-money/pge-plus",
        "https://portlandgeneral.com/pge-plus-static",
        "https://portlandgeneral.com/pge-plus-faq",
        "https://portlandgeneral.com/charge-faster",
        "https://portlandgeneral.com/secure/pge-plus/ev-charger/rebate-only",
        "https://portlandgeneral.com/secure/pge-plus-form/choose-account/?suppliedByCustomer=false"
      ],
      "evidenceText": "PGE Smart Charging and PGE Plus pages support rebates for qualified residential Level 2 charger purchase or installation, possible panel work, and bill credits for connected home charging.",
      "reasoningNotes": "The residential EV charger match is supported. Electric panel upgrade should be retained only as an enabling measure under the home EV charger installation program."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "medium",
        "evidenceText": "PGE residential EV charging pilot is a managed charging or pilot program, not a clearly published upfront charger rebate.",
        "sourceUrlsChecked": [
          "https://portlandgeneral.com/energy-choices/electric-vehicles-charging/charging-your-ev/ev-charging-pilot-program-home"
        ],
        "reasoningNotes": "Do not model pilot/managed-charging bill benefits as upfront project incentives.",
        "originalGapReason": "source_text_unavailable",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22798",
    "opportunityName": "Renewable Energy Tax Valuation",
    "state": "RI",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22798/renewable-energy-tax-valuation",
    "websiteUrl": "https://rules.sos.ri.gov/regulations/part/300-00-00-2",
    "applicationUrl": null,
    "administrator": "Rhode Island Office of Energy Resources and municipalities",
    "programType": "Property Tax Assessment",
    "availabilityStatus": "active",
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
          "RI"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [],
        "notes": "Statewide Rhode Island tangible tax valuation rule applied by municipalities to commercial renewable energy systems."
      },
      "eligibleApplicantTypes": [
        "commercial_renewable_energy_system_owners",
        "municipalities_taxing_systems",
        "residential_property_owners",
        "manufacturing_property_owners"
      ],
      "eligibleSectors": [
        "commercial",
        "residential",
        "manufacturing",
        "utility_scale_generation"
      ],
      "eligibleRetrofitCategories": [
        "commercial_renewable_energy_system_tax_valuation",
        "biomass_electric_generation",
        "biogas_electric_generation",
        "geothermal_power_generation",
        "solar_pv_system",
        "wind_energy_system",
        "small_hydroelectric_system",
        "fuel_cell_renewable_fuel_system"
      ],
      "hardRequirements": [
        "Commercial system must be a grid-connected renewable energy system subject to Rhode Island tangible tax valuation rules.",
        "Eligible resources must satisfy Rhode Island renewable energy statutory definitions.",
        "System owner must provide required interconnection and program documents to the municipality or assessor.",
        "Municipal tax treatment, exemptions, waivers, and valuation formula must be applied under Rhode Island law and rule."
      ],
      "blockers": [
        "Do not match ground-source geothermal HVAC; current sources support geothermal renewable generation, not ordinary building heat pump retrofits.",
        "Do not treat this as a grant, rebate, or direct equipment incentive.",
        "Do not match biomass or waste systems that do not use eligible biomass fuels under Rhode Island law."
      ],
      "programType": "Property Tax Assessment",
      "administrator": "Rhode Island Office of Energy Resources and municipalities",
      "applicationUrl": null,
      "websiteUrl": "https://rules.sos.ri.gov/regulations/part/300-00-00-2",
      "sourceUrlsChecked": [
        "https://rules.sos.ri.gov/regulations/part/300-00-00-2",
        "https://webserver.rilegislature.gov/Statutes/TITLE39/39-26/39-26-5.htm",
        "https://webserver.rilegislature.gov/Statutes/TITLE39/39-26/39-26-2.htm",
        "https://tax.ri.gov/"
      ],
      "evidenceText": "Rhode Island's active rule sets a $5 per kW tangible tax valuation for commercial renewable energy systems and ties eligible resources to statutory solar, wind, geothermal, small hydro, biomass, and renewable fuel cells.",
      "reasoningNotes": "Biomass and geothermal are supported only as renewable energy generation categories. The original ground-source geothermal heat pump category should be replaced."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "medium",
        "evidenceText": "Renewable energy tax valuation is a valuation/tax mechanism rather than a direct upfront rebate or grant.",
        "sourceUrlsChecked": [
          "https://tax.ri.gov/"
        ],
        "reasoningNotes": "No supported one-time rule can be calculated from project cost or system size alone.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3344",
    "opportunityName": "Berkeley Electric Cooperative - Energy Efficiency Rebate Program",
    "state": "SC",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3344/berkeley-electric-cooperative-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.berkeleyelectric.coop/smart-thermostat-rebates",
    "applicationUrl": "https://www.cognitoforms.com/BerkeleyElectricCooperativeMarketing/ParticipationAgreementAndReleaseOfLiability2",
    "administrator": "Berkeley Electric Cooperative",
    "programType": "Rebate And Bill Credit Program",
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
          "SC"
        ],
        "counties": [
          "Berkeley County",
          "Charleston County",
          "Dorchester County"
        ],
        "cities": [],
        "utilityTerritories": [
          "Berkeley Electric Cooperative"
        ],
        "notes": "Limited to Berkeley Electric Cooperative residential members in its South Carolina service territory."
      },
      "eligibleApplicantTypes": [
        "residential_member_customer"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "smart_thermostat_zoning_retrofit",
        "dual_fuel_heat_pump_hvac_retrofit",
        "electric_water_heater_replacement"
      ],
      "hardRequirements": [
        "Smart thermostat participants must have Wi-Fi and participate in peak-control events to earn ongoing bill credits.",
        "Dual-fuel HVAC rebates are limited to qualifying residential conversions and one rebate per home.",
        "Water heater incentives require qualifying electric water heater participation and program controls where applicable."
      ],
      "blockers": [
        "Do not generalize the dual-fuel heat pump offering into all high-efficiency HVAC replacement.",
        "Commercial customers, residential appliance rebates unrelated to listed measures, and stand-alone zoning systems are not supported by the checked sources.",
        "Smart thermostat credit is tied to demand-response participation, not only device purchase."
      ],
      "programType": "Rebate And Bill Credit Program",
      "administrator": "Berkeley Electric Cooperative",
      "applicationUrl": "https://www.cognitoforms.com/BerkeleyElectricCooperativeMarketing/ParticipationAgreementAndReleaseOfLiability2",
      "websiteUrl": "https://www.berkeleyelectric.coop/smart-thermostat-rebates",
      "sourceUrlsChecked": [
        "https://www.berkeleyelectric.coop/smart-thermostat-rebates",
        "https://www.berkeleyelectric.coop/dual-fuel-heating-system",
        "https://www.berkeleyelectric.coop/electric-water-heater-programs",
        "https://www.cognitoforms.com/BerkeleyElectricCooperativeMarketing/ParticipationAgreementAndReleaseOfLiability2",
        "https://www.berkeleyelectric.coop/sites/default/files/documents/2026%20dual%20fuel_residential%20application.pdf"
      ],
      "evidenceText": "Official pages show smart thermostat bill credits, dual-fuel heating system rebates, and electric water heater programs for Berkeley Electric residential members.",
      "reasoningNotes": "The thermostat match is supported. The HVAC match should be narrowed to dual-fuel heat pump conversions rather than generic high-efficiency HVAC replacement."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "medium",
        "evidenceText": "Berkeley smart thermostat offer is tied to Beat-the-Peak/thermostat rewards and annual bill credits.",
        "sourceUrlsChecked": [
          "https://www.berkeleyelectric.coop/smart-thermostat-rebates",
          "https://energysmartsc.org/enroll-a-smart-thermostat/"
        ],
        "reasoningNotes": "Demand-response enrollment credits are not direct upfront equipment rebates for one-time savings.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4200",
    "opportunityName": "Piedmont Natural Gas - Commercial Equipment Efficiency Rebates",
    "state": "SC",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4200/piedmont-natural-gas-commercial-equipment-efficiency-rebates",
    "websiteUrl": "https://gasadvantage.piedmontng.com/for-your-business/",
    "applicationUrl": "https://gasadvantage.piedmontng.com/docs/SC_application_rebate.pdf",
    "administrator": "Piedmont Natural Gas",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 2,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "high_efficiency_furnace_retrofit",
        "displayName": "High-efficiency furnace retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "furnace",
          "high efficiency furnace"
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
          "SC"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Piedmont Natural Gas"
        ],
        "notes": "South Carolina Piedmont Natural Gas commercial customers; current official snippets indicate commercial eligibility is limited to tankless water heaters."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "business_customer"
      ],
      "eligibleSectors": [
        "commercial"
      ],
      "eligibleRetrofitCategories": [
        "commercial_tankless_water_heater",
        "high_efficiency_natural_gas_water_heater"
      ],
      "hardRequirements": [
        "Applicant must be a Piedmont Natural Gas commercial customer in South Carolina.",
        "Current South Carolina application language indicates commercial customers are eligible only for tankless water heater rebates.",
        "Qualifying tankless water heaters must meet the program UEF tier requirements.",
        "Application must be postmarked within 90 days of equipment installation.",
        "Customer must purchase and install qualifying natural gas equipment and submit required documentation."
      ],
      "blockers": [
        "Do not match high-efficiency furnace retrofits to this South Carolina commercial record.",
        "Do not match residential furnace rebates, North Carolina-only measures, or general high-efficiency HVAC replacements.",
        "Official Gas Advantage pages and PDFs returned 403 when opened, so details are based on official search extracts and should remain narrowly constrained."
      ],
      "programType": "Rebate Program",
      "administrator": "Piedmont Natural Gas",
      "applicationUrl": "https://gasadvantage.piedmontng.com/docs/SC_application_rebate.pdf",
      "websiteUrl": "https://gasadvantage.piedmontng.com/for-your-business/",
      "sourceUrlsChecked": [
        "https://gasadvantage.piedmontng.com/for-your-business/",
        "https://gasadvantage-hpp.piedmontng.com/EnergyEfficiency/?utm_source=",
        "https://gasadvantage.piedmontng.com/docs/SC_application_rebate.pdf",
        "https://programs.dsireusa.org/system/program/detail/4200"
      ],
      "evidenceText": "Piedmont’s]( South Carolina application extract says commercial customers are eligible only for the tankless water heater rebate; furnace rebates should not match.",
      "reasoningNotes": "The supplied furnace and broad HVAC categories are false positives for current South Carolina commercial eligibility."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Piedmont commercial South Carolina materials found did not verify a current furnace rebate; commercial page emphasized tankless water-heater rebates.",
        "sourceUrlsChecked": [
          "https://www.piedmontng.com/business/save-energy-and-money/rebates-and-programs"
        ],
        "reasoningNotes": "Target matched furnace, but official commercial furnace amount was not verified.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "gas_usage_reduction",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      }
    ]
  }
]
