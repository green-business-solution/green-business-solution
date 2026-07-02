You are helping RetroFi repair incentive formulas, rate tables, grant estimates, tax credits, and non-cash workflow value rules.

Return strict JSON only. Do not include markdown, code fences, commentary, or citations outside JSON fields.

Batch: 48
Targets in this prompt: 941-960 of 984
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
  "batchNumber": 48,
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
  "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:421"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2735",
    "opportunityName": "Clay Electric Cooperative, Inc - Energy Smart Solar Water Heater Rebate Program",
    "state": "FL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2735/clay-electric-cooperative-inc-energy-smart-solar-water-heater-rebate-program",
    "websiteUrl": "https://www.clayelectric.com/energy-rebates-loans",
    "applicationUrl": "https://www.clayelectric.com/energy-rebates-loans",
    "administrator": "Clay Electric Cooperative",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
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
        "cities": [],
        "utilityTerritories": [
          "Clay Electric Cooperative service territory"
        ],
        "notes": "Available for eligible residences or facilities receiving electric service from Clay Electric Cooperative."
      },
      "eligibleApplicantTypes": [
        "electric_cooperative_member",
        "residential_customer",
        "commercial_customer",
        "facility_owner"
      ],
      "eligibleSectors": [
        "residential",
        "commercial"
      ],
      "eligibleRetrofitCategories": [
        "solar_water_heating_system"
      ],
      "hardRequirements": [
        "Applicant must have an active Clay Electric account at the served residence or facility.",
        "Solar water heater must be installed on an existing residence or facility receiving Clay Electric service.",
        "System must meet Florida Solar Energy Center specifications.",
        "Installer must meet applicable Florida contractor certification requirements."
      ],
      "blockers": [
        "New construction is not eligible under the listed solar water heater rebate requirements.",
        "Do not match solar PV, heat pump water heaters, or general water heater replacements to this solar water heater rebate.",
        "Other Clay Electric rebates listed on the same page are separate measures."
      ],
      "programType": "Rebate Program",
      "administrator": "Clay Electric Cooperative",
      "applicationUrl": "https://www.clayelectric.com/energy-rebates-loans",
      "websiteUrl": "https://www.clayelectric.com/energy-rebates-loans",
      "sourceUrlsChecked": [
        "https://www.clayelectric.com/energy-rebates-loans"
      ],
      "evidenceText": "Clay]( Electric’s rebate page lists a solar water heater rebate for active account holders with qualifying systems installed on served existing residences or facilities.",
      "reasoningNotes": "The solar water heating match is source-backed. Keep the category narrow and do not merge separate Clay Electric heat pump water heater or insulation incentives into this record."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Official page confirms solar water heating rebates, but the DSIRE formula uses BTU output, which is unsupported by current rule shapes.",
        "sourceUrlsChecked": [
          "https://www.clayelectric.com/energy-rebates-loans",
          "https://programs.dsireusa.org/system/program/detail/2735"
        ],
        "reasoningNotes": "Supported rule schema lacks a BTU-output source; do not map this to solar PV kW.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1450",
    "opportunityName": "Gainesville Regional Utilities - Energy Efficiency Rebate Program",
    "state": "FL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1450/gainesville-regional-utilities-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.gru.com/MyBusiness/Content/Rebates/RebatesIncentivesforYourBusiness.aspx",
    "applicationUrl": null,
    "administrator": "Gainesville Regional Utilities",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
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
          "combined heat and power"
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
          "Alachua"
        ],
        "cities": [
          "Gainesville"
        ],
        "utilityTerritories": [
          "Gainesville Regional Utilities service territory"
        ],
        "notes": "GRU service territory; natural gas rebates require GRU natural gas availability or service."
      },
      "eligibleApplicantTypes": [
        "gru_customer",
        "business_customer",
        "rental_property_owner",
        "commercial_kitchen_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "rental_housing",
        "food_service"
      ],
      "eligibleRetrofitCategories": [
        "natural_gas_water_heater_conversion",
        "natural_gas_central_heat_conversion",
        "natural_gas_range_dryer_conversion",
        "commercial_kitchen_spray_nozzle"
      ],
      "hardRequirements": [
        "Applicant must be an eligible GRU customer.",
        "Natural gas conversion rebates require eligible GRU natural gas service and program terms.",
        "Some natural gas rebates require a GRU Natural Gas Partnering Contractor.",
        "Commercial kitchen spray nozzle support is product-specific.",
        "Separate solar net-metering and suspended feed-in tariff rules should not be merged into this rebate."
      ],
      "blockers": [
        "Remove combined_heat_and_power_system; no current official GRU rebate source for CHP was verified.",
        "Do not generalize commercial kitchen spray nozzles into broad plumbing or water-efficiency retrofits.",
        "Do not infer residential appliances unless listed in the current GRU customer program."
      ],
      "programType": "Rebate",
      "administrator": "Gainesville Regional Utilities",
      "applicationUrl": null,
      "websiteUrl": "https://www.gru.com/MyBusiness/Content/Rebates/RebatesIncentivesforYourBusiness.aspx",
      "sourceUrlsChecked": [
        "https://www.gru.com/MyBusiness/Content/Rebates/RebatesIncentivesforYourBusiness.aspx",
        "https://www.gru.com/My-Business/Lower-My-Bill/Save-Energy",
        "https://www.gru.com/My-Home/Content/Rebates-and-Incentives-for-Homes",
        "https://www.gru.com/My-Home/Content/Rebates/Natural-Gas-Central-Heat-Rebate"
      ],
      "evidenceText": "Current GRU rebate pages list natural gas conversion and commercial kitchen spray-nozzle measures; no official current combined heat and power rebate was found.",
      "reasoningNotes": "The CHP match is a false positive from older or mismatched data; preserve only current product-specific GRU rebate categories."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "GRU commercial source did not verify a current CHP one-time incentive formula.",
        "sourceUrlsChecked": [
          "https://www.gru.com/TabID/3659/Default.aspx"
        ],
        "reasoningNotes": "CHP terms require a source-backed grant or rebate formula, which was not found.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3617",
    "opportunityName": "Lakeland Electric - Commercial Conservation Rebate Program",
    "state": "FL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3617/lakeland-electric-commercial-conservation-rebate-program",
    "websiteUrl": "https://lakelandelectric.com/news/___commercial-customers-conservation-rebate",
    "applicationUrl": null,
    "administrator": "Lakeland Electric",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
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
          "Lakeland"
        ],
        "utilityTerritories": [
          "Lakeland Electric"
        ],
        "notes": "Limited to Lakeland Electric commercial customers on eligible GSLD, Interruptible, or ELDC rates."
      },
      "eligibleApplicantTypes": [
        "large_commercial_electric_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial"
      ],
      "eligibleRetrofitCategories": [
        "lighting_retrofit",
        "commercial_hvac_efficiency",
        "motor_efficiency",
        "custom_energy_conservation_measures"
      ],
      "hardRequirements": [
        "Must be a GSLD, Interruptible, or ELDC Lakeland Electric customer.",
        "Energy audit by Lakeland Electric or a qualified engineering or energy services provider is required before work begins.",
        "Account Executive must approve the energy-saving measures before rebate processing.",
        "Invoice and post-installation verification are required.",
        "Limit one rebate per customer; rebates depend on approval and fund availability."
      ],
      "blockers": [
        "Standalone energy audits are not the incentivized measure; the audit is a prerequisite.",
        "Residential and small general-service customers are outside the stated eligible rates.",
        "Measures outside lighting, HVAC, and motors require case-by-case approval."
      ],
      "programType": "Rebate Program",
      "administrator": "Lakeland Electric",
      "applicationUrl": null,
      "websiteUrl": "https://lakelandelectric.com/news/___commercial-customers-conservation-rebate",
      "sourceUrlsChecked": [
        "https://lakelandelectric.com/news/___commercial-customers-conservation-rebate"
      ],
      "evidenceText": "Lakeland Electric states the rebate is $150 per kW demand reduction for eligible energy conservation measures, specifically lighting systems, HVAC, and motors, after a required energy audit.",
      "reasoningNotes": "Targets came from the uploaded repair queue . The prior energy_audit match should be blocked as a standalone retrofit because the audit is only a prerequisite for physical conservation measures."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "medium",
        "evidenceText": "Matched term is energy audit; source points to conservation assistance rather than a direct upfront equipment formula.",
        "sourceUrlsChecked": [
          "https://lakelandelectric.com/news/___commercial-customers-conservation-rebate"
        ],
        "reasoningNotes": "Audit-only services are not one-time project savings rules.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22174",
    "opportunityName": "Electric Vehicle Fleet Fee Exemption",
    "state": "IL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22174/electric-vehicle-fleet-fee-exemption",
    "websiteUrl": "https://www.ilga.gov/Legislation/ILCS/Articles?ActID=1608&Chapter=ENVIRONMENTAL+SAFETY&ChapterID=36&MajorTopic=HEALTH+AND+SAFETY&Print=True",
    "applicationUrl": null,
    "administrator": "Illinois Secretary of State",
    "programType": "Fleet Fee Exemption",
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
          "IL"
        ],
        "counties": [
          "Cook County",
          "DuPage County",
          "Kane County",
          "Lake County",
          "McHenry County",
          "Will County"
        ],
        "cities": [],
        "utilityTerritories": [],
        "notes": "Also includes Aux Sable and Goose Lake townships in Grundy County and Oswego township in Kendall County."
      },
      "eligibleApplicantTypes": [
        "fleet_owner",
        "individual",
        "business",
        "association",
        "corporation",
        "federal_agency"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "government",
        "fleet"
      ],
      "eligibleRetrofitCategories": [],
      "hardRequirements": [
        "The fee applies to owners registering 10 or more covered vehicles in the Illinois covered area.",
        "Electric vehicles are exempt from the annual fleet user fee.",
        "Covered vehicle and exempt vehicle definitions in the statute control eligibility.",
        "Vehicles registered under the International Registration Plan are outside this fee section.",
        "The statutory covered area includes specified northeastern Illinois counties and townships."
      ],
      "blockers": [
        "No EV charger installation is funded.",
        "No building retrofit is supported.",
        "Vehicles outside the covered fleet fee area or outside the covered fleet rules should not match.",
        "Do not assume hybrid vehicles qualify where the statutory electric-vehicle definition excludes conventional or auxiliary engines."
      ],
      "programType": "Fleet Fee Exemption",
      "administrator": "Illinois Secretary of State",
      "applicationUrl": null,
      "websiteUrl": "https://www.ilga.gov/Legislation/ILCS/Articles?ActID=1608&Chapter=ENVIRONMENTAL+SAFETY&ChapterID=36&MajorTopic=HEALTH+AND+SAFETY&Print=True",
      "sourceUrlsChecked": [
        "https://www.ilga.gov/Legislation/ILCS/Articles?ActID=1608&Chapter=ENVIRONMENTAL+SAFETY&ChapterID=36&MajorTopic=HEALTH+AND+SAFETY&Print=True"
      ],
      "evidenceText": "Illinois]( law imposes a $20 annual user fee on fleets with 10 or more covered-area vehicles but exempts electric vehicles from that fee. It does not fund charger installation.",
      "reasoningNotes": "The original EV charger retrofit match is a false positive. This is a fleet vehicle fee exemption."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "medium",
        "evidenceText": "This is a fleet fee exemption statute, not a direct upfront equipment rebate or grant.",
        "sourceUrlsChecked": [
          "https://www.ilga.gov/legislation/ilcs/fulltext.asp?DocName=041501200K35"
        ],
        "reasoningNotes": "Fee exemptions do not fit the supported one-time rule shapes.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3294",
    "opportunityName": "Kansas City Board of Public Utilities - Commercial Energy Efficiency Rebate Program",
    "state": "KS",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3294/kansas-city-board-of-public-utilities-commercial-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.bpu.com/forbusiness.aspx",
    "applicationUrl": null,
    "administrator": "Kansas City Board of Public Utilities",
    "programType": "Commercial Heating/Energy Efficiency Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 1,
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
      }
    ],
    "repairedOpportunityData": {
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "KS"
        ],
        "counties": [],
        "cities": [
          "Kansas City"
        ],
        "utilityTerritories": [
          "Kansas City Board of Public Utilities"
        ],
        "notes": "BPU electric service territory in Kansas City, Kansas and served areas."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "business",
        "developer",
        "builder",
        "building_owner"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial"
      ],
      "eligibleRetrofitCategories": [
        "commercial_electric_space_heating",
        "commercial_heat_pump_space_heating"
      ],
      "hardRequirements": [
        "Project must be in a new or existing commercial building within the BPU service territory.",
        "Eligible equipment must provide electric space heating or heat pump space conditioning under the commercial heating program.",
        "New building applicants must adhere to Kansas Minimum Thermal Standards and submit required heat loss, heat gain, or certified load calculations.",
        "Existing building applicants must submit required heat loss, heat gain, or certified engineer load calculations.",
        "Installed equipment for any BPU customer receiving an incentive must be UL listed.",
        "Customer must arrange the appropriate BPU single-meter rate and electric heat rider where applicable."
      ],
      "blockers": [
        "Do not match generic high-efficiency HVAC unless the project is electric space heating or a heat pump under the BPU commercial heating program.",
        "Current official BPU sources checked do not verify lighting, motors, windows, refrigeration, or other broad commercial efficiency rebates under this opportunity.",
        "Residential projects are not part of this commercial program.",
        "Projects outside BPU service territory are ineligible.",
        "Resistance backup or emergency heat is not paid when used only as backup or emergency heat."
      ],
      "programType": "Commercial Heating/Energy Efficiency Rebate Program",
      "administrator": "Kansas City Board of Public Utilities",
      "applicationUrl": null,
      "websiteUrl": "https://www.bpu.com/forbusiness.aspx",
      "sourceUrlsChecked": [
        "https://www.bpu.com/forbusiness.aspx",
        "https://www.bpu.com/ResourcesServices/EnergySavings.aspx",
        "https://www.bpu.com/ResourcesServices/ProgramsResources.aspx",
        "https://www.bpu.com/Portals/0/Commercial-Heat-Rate-Program/HeatingProgramButton_02.pdf"
      ],
      "evidenceText": "BPU’s]( official commercial heating document supports incentives for electric space heating and heat pumps in new and existing commercial buildings; current pages do not verify a broader commercial rebate menu.",
      "reasoningNotes": "The original high-efficiency HVAC match is supported only as electric space heating or heat pump space conditioning. Broader commercial energy-efficiency categories could not be verified on current official pages."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "BPU business source did not expose a specific motor/VFD or measure formula for the target.",
        "sourceUrlsChecked": [
          "http://www.bpu.com/ForBusiness.aspx"
        ],
        "reasoningNotes": "No matched terms or clear official rule were available.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22707",
    "opportunityName": "Louisville Gas and Electric and Kentucky Utilities – Bring Your Own Thermostat",
    "state": "KY",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22707/louisville-gas-and-electric-and-kentucky-utilities-bring-your-own-thermostat",
    "websiteUrl": "https://greatergrid.com/enroll/programs/thermostats/lge-ku",
    "applicationUrl": "https://greatergrid.com/enroll/programs/thermostats/lge-ku",
    "administrator": "Louisville Gas and Electric and Kentucky Utilities",
    "programType": "Demand Response / Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
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
          "KY"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Louisville Gas and Electric",
          "Kentucky Utilities"
        ],
        "notes": "Limited to qualifying LG&E and KU residential electric and small business customers."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customer",
        "qualifying_small_business_electric_customer"
      ],
      "eligibleSectors": [
        "residential",
        "small_business"
      ],
      "eligibleRetrofitCategories": [
        "smart_thermostat_demand_response",
        "smart_thermostat"
      ],
      "hardRequirements": [
        "Customer must be a qualifying LG&E or KU residential or small business electric customer.",
        "Customer must have an eligible internet-connected smart thermostat connected to central air conditioning.",
        "Customer must allow brief thermostat adjustments during high-demand periods.",
        "Customer cannot also be enrolled in the LG&E and KU Demand Conservation program.",
        "Thermostat model must be on the approved list."
      ],
      "blockers": [
        "Not a general HVAC zoning retrofit program.",
        "Incentive is for enrolling an eligible smart thermostat in demand response, not for broad HVAC equipment replacement.",
        "Customers already enrolled in the conflicting demand conservation program must unenroll before enrolling."
      ],
      "programType": "Demand Response / Rebate Program",
      "administrator": "Louisville Gas and Electric and Kentucky Utilities",
      "applicationUrl": "https://greatergrid.com/enroll/programs/thermostats/lge-ku",
      "websiteUrl": "https://greatergrid.com/enroll/programs/thermostats/lge-ku",
      "sourceUrlsChecked": [
        "https://www.thermostatrewards.com/lge-ku/",
        "https://greatergrid.com/enroll/programs/thermostats/lge-ku",
        "https://greatergrid.com/enroll/programs/thermostats/lge-ku/faq"
      ],
      "evidenceText": "The FAQ says qualifying LG&E and KU residential electric and small business customers with eligible smart thermostats receive enrollment and event incentives for thermostat adjustments.",
      "reasoningNotes": "The thermostat match is supported, but it should be narrowed to smart thermostat demand response rather than general HVAC zoning."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "medium",
        "evidenceText": "Bring Your Own Thermostat is a thermostat rewards/enrollment program.",
        "sourceUrlsChecked": [
          "https://www.thermostatrewards.com/lge-ku/"
        ],
        "reasoningNotes": "Demand response or thermostat-control rewards should not be forced into one-time savings.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22699",
    "opportunityName": "Louisville Gas and Electric and Kentucky Utilities – Small Business Audit and Direct Install",
    "state": "KY",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22699/louisville-gas-and-electric-and-kentucky-utilities-small-business-audit-and-direct-install",
    "websiteUrl": "https://lge-ku.com/small-business-audit-self-install",
    "applicationUrl": null,
    "administrator": "Louisville Gas and Electric and Kentucky Utilities",
    "programType": "Energy Audit / Direct Install Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
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
        "notes": "Limited to eligible LG&E and KU small business account holders on listed rates."
      },
      "eligibleApplicantTypes": [
        "small_business_owner",
        "small_business_operator",
        "small_business_renter"
      ],
      "eligibleSectors": [
        "small_business",
        "commercial"
      ],
      "eligibleRetrofitCategories": [
        "energy_audit",
        "direct_install_energy_efficiency",
        "basic_energy_efficient_equipment"
      ],
      "hardRequirements": [
        "Customer must have an active LG&E or KU account with service under eligible General Service electric options or LG&E CGS or IGS rate options.",
        "Customer must own or operate a qualifying small business.",
        "Services may not be provided under this program more than once in a three-year period.",
        "Customer must enroll through the utility process and provide required account and tax information."
      ],
      "blockers": [
        "Not a residential program.",
        "Business Rebates is a separate program for additional incentives.",
        "Do not infer specific equipment categories beyond basic direct-install energy-efficient equipment unless the utility specifies measures for the site."
      ],
      "programType": "Energy Audit / Direct Install Program",
      "administrator": "Louisville Gas and Electric and Kentucky Utilities",
      "applicationUrl": null,
      "websiteUrl": "https://lge-ku.com/small-business-audit-self-install",
      "sourceUrlsChecked": [
        "https://lge-ku.com/small-business-audit-self-install"
      ],
      "evidenceText": "LG&E and KU state the program provides an energy audit and basic energy-efficient equipment at no additional cost to eligible small business customers.",
      "reasoningNotes": "The energy_audit match is supported and should be paired with direct_install_energy_efficiency, while downstream Business Rebates must remain separate."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "medium",
        "evidenceText": "Program is an audit/direct-install small-business offering rather than a published customer equipment rebate formula.",
        "sourceUrlsChecked": [
          "https://lge-ku.com/business/saving-energy-money/small-business-program"
        ],
        "reasoningNotes": "Audit and direct-install service programs should not be forced into a reusable one-time rule.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4798",
    "opportunityName": "Mass Save (Electric) - Large Commercial Retrofit Program",
    "state": "MA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4798/mass-save-electric-large-commercial-retrofit-program",
    "websiteUrl": "https://www.masssave.com/business/rebates-offers-services/deep-energy-retrofit",
    "applicationUrl": null,
    "administrator": "Mass Save sponsors",
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
          "MA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Berkshire Gas",
          "Cape Light Compact",
          "Eversource",
          "Liberty Utilities",
          "National Grid",
          "Unitil"
        ],
        "notes": "Mass Save business incentives are available to eligible Massachusetts commercial customers of participating Mass Save sponsors."
      },
      "eligibleApplicantTypes": [
        "business_owner",
        "commercial_property_owner",
        "institutional_customer",
        "multifamily_property_owner"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "institutional",
        "multifamily"
      ],
      "eligibleRetrofitCategories": [
        "energy_assessment",
        "retro_commissioning_study",
        "hvac_electrification",
        "building_envelope_upgrade",
        "ventilation_upgrade"
      ],
      "hardRequirements": [
        "Customer must be eligible through a participating Mass Save sponsor.",
        "Deep Energy Retrofit projects must pursue major greenhouse-gas reductions and typically require scoping, assessment, and verification.",
        "Existing building commissioning and monitoring-based commissioning must follow Mass Save program requirements."
      ],
      "blockers": [
        "Do not match to residential-only Mass Save rebates.",
        "Do not match to standalone EV charging, solar, storage, or water conservation programs.",
        "Commissioning is supported as part of Mass Save commercial commissioning and deep retrofit services, not as an unrelated certification-only measure."
      ],
      "programType": "Rebate Program",
      "administrator": "Mass Save sponsors",
      "applicationUrl": null,
      "websiteUrl": "https://www.masssave.com/business/rebates-offers-services/deep-energy-retrofit",
      "sourceUrlsChecked": [
        "https://www.masssave.com/business/rebates-offers-services/deep-energy-retrofit",
        "https://www.masssave.com/business/rebates-offers-services/other-energy-efficiency-services/existing-building-and-monitoring-based-commissioning"
      ],
      "evidenceText": "Mass]( Save business pages describe Deep Energy Retrofit support for commercial buildings and separate existing-building or monitoring-based commissioning services for eligible participating-sponsor customers.",
      "reasoningNotes": "The retro-commissioning match is valid, but the opportunity should be limited to Mass Save commercial retrofit, commissioning, and deep energy retrofit services."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Deep Energy Retrofit page describes additional incentives but no commissioning formula.",
        "sourceUrlsChecked": [
          "https://www.masssave.com/business/programs-and-services/deep-energy-retrofit"
        ],
        "reasoningNotes": "Commissioning/deep-retrofit incentives are project-specific.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22744",
    "opportunityName": "MassSAVE (Electric) - CI Connected Solutions Program",
    "state": "MA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22744/masssave-electric-ci-connected-solutions-program",
    "websiteUrl": "https://www.masssave.com/business/rebates-offers-services/commercialconnectedsolutions",
    "applicationUrl": "https://www.masssave.com/business/rebates-offers-services/commercialconnectedsolutions",
    "administrator": "Mass Save sponsors: Cape Light Compact, Eversource, National Grid, and Unitil",
    "programType": "Performance Based Demand Response Incentive",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "battery_storage_system",
        "displayName": "Battery storage system",
        "parentCategory": "energy_storage_resilience",
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
          "MA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Cape Light Compact",
          "Eversource",
          "National Grid",
          "Unitil"
        ],
        "notes": "Commercial or industrial customer must be served by a participating Mass Save electric sponsor and pay into the energy efficiency fund."
      },
      "eligibleApplicantTypes": [
        "commercial_electric_customers",
        "industrial_electric_customers",
        "business_electric_customers"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "institutional",
        "municipal"
      ],
      "eligibleRetrofitCategories": [
        "battery_storage_demand_response",
        "energy_storage_dispatch",
        "demand_response_controls",
        "active_load_curtailment",
        "peak_load_reduction",
        "energy_management_systems"
      ],
      "hardRequirements": [
        "Customer must be an existing commercial electric customer of a participating sponsor utility.",
        "Customer must pay into the Massachusetts energy efficiency fund.",
        "Participant must enroll through an approved curtailment service provider or direct utility participation path.",
        "Asset must be capable of reducing or shifting load during called peak-demand events.",
        "Incentive is based on average kW reduction over the season, not equipment cost."
      ],
      "blockers": [
        "This is a performance-based demand-response incentive, not an upfront battery installation rebate.",
        "Residential battery systems belong to the residential ConnectedSolutions program.",
        "Do not match solar-only, backup-only, or non-dispatchable storage projects."
      ],
      "programType": "Performance Based Demand Response Incentive",
      "administrator": "Mass Save sponsors: Cape Light Compact, Eversource, National Grid, and Unitil",
      "applicationUrl": "https://www.masssave.com/business/rebates-offers-services/commercialconnectedsolutions",
      "websiteUrl": "https://www.masssave.com/business/rebates-offers-services/commercialconnectedsolutions",
      "sourceUrlsChecked": [
        "https://www.masssave.com/business/rebates-offers-services/commercialconnectedsolutions",
        "https://www.nationalgridus.com/MA-Business/Energy-Saving-Programs/ConnectedSolutions"
      ],
      "evidenceText": "Mass]( Save says Commercial ConnectedSolutions pays businesses performance incentives for lowering or shifting electricity use during peak demand using controls, energy storage and active monitoring. Participants are paid on average kW reduction over the season.",
      "reasoningNotes": "The battery storage match should be modeled as dispatchable battery demand-response participation, not as a general storage purchase or installation rebate."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "high",
        "evidenceText": "ConnectedSolutions pays battery performance incentives based on event performance and average kW contribution.",
        "sourceUrlsChecked": [
          "https://www.masssave.com/residential/rebates-offers-services/connectedsolutions",
          "https://www.masssave.com/business/rebates-and-incentives/connectedsolutions"
        ],
        "reasoningNotes": "Performance-based demand-response payments are recurring, not upfront one-time incentives.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22743",
    "opportunityName": "MassSAVE (Electric) - Connected Solutions Program",
    "state": "MA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22743/masssave-electric-connected-solutions-program",
    "websiteUrl": "https://www.masssave.com/residential/rebates-offers-services/battery-storage-and-evs/batteries",
    "applicationUrl": "https://www.masssave.com/residential/rebates-offers-services/battery-storage-and-evs/batteries",
    "administrator": "Sponsors of Mass Save",
    "programType": "Demand Response Performance Incentive",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "battery_storage_system",
        "displayName": "Battery storage system",
        "parentCategory": "energy_storage_resilience",
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
          "MA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Cape Light Compact",
          "Eversource",
          "National Grid"
        ],
        "notes": "Mass Save electric ConnectedSolutions battery availability is limited to participating electric sponsors and customer eligibility; commercial batteries use the separate larger-system path."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customer",
        "homeowner",
        "tenant_with_account_holder_approval"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "battery_storage_system"
      ],
      "hardRequirements": [
        "Customer must be served by a participating Mass Save electric sponsor for the battery offer.",
        "Battery must be enrolled and dispatched for summer peak demand-response events.",
        "Residential battery systems generally must use the residential pathway for inverter sizes under 50 kW.",
        "Performance incentive depends on average battery contribution during called events."
      ],
      "blockers": [
        "Do not match to solar PV alone; batteries may be paired with solar but the incentive is for battery demand response.",
        "Do not match to EV charging or vehicle rebates.",
        "Do not generalize the battery offer to broad resilience work or backup generators.",
        "Smart thermostat demand response is a separate ConnectedSolutions pathway and should not be inferred from this battery-storage record."
      ],
      "programType": "Demand Response Performance Incentive",
      "administrator": "Sponsors of Mass Save",
      "applicationUrl": "https://www.masssave.com/residential/rebates-offers-services/battery-storage-and-evs/batteries",
      "websiteUrl": "https://www.masssave.com/residential/rebates-offers-services/battery-storage-and-evs/batteries",
      "sourceUrlsChecked": [
        "https://www.masssave.com/residential/rebates-offers-services/battery-storage-and-evs/batteries",
        "https://www.masssave.com/residential/rebates-offers-services/connectedsolutions",
        "https://www.nationalgridus.com/MA-Home/Connected-Solutions/BatteryProgram",
        "https://www.capelightcompact.org/program/enroll-my-battery/"
      ],
      "evidenceText": "Mass]( Save states residential ConnectedSolutions pays a summer demand-response incentive for qualifying batteries of customers of Cape Light Compact, Eversource, and National Grid; systems under 50 kW use the residential path.",
      "reasoningNotes": "The supplied battery-storage match is supported, but only as a demand-response enrollment incentive, not as a general battery rebate. Input target list supplied in uploaded file ."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "high",
        "evidenceText": "ConnectedSolutions pays battery performance incentives based on average kW during summer events.",
        "sourceUrlsChecked": [
          "https://www.masssave.com/residential/rebates-offers-services/battery-storage-and-evs/batteries",
          "https://www.masssave.com/residential/rebates-offers-services/connectedsolutions"
        ],
        "reasoningNotes": "Performance-based annual demand-response payments are excluded from one-time upfront rules.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4378",
    "opportunityName": "MMWEC Green Opportunity Commercial and Industrial Efficiency Program",
    "state": "MA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4378/mmwec-green-opportunity-commercial-and-industrial-efficiency-program",
    "websiteUrl": "https://nextzero.org/",
    "applicationUrl": null,
    "administrator": "Massachusetts Municipal Wholesale Electric Company",
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
          "MA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "MMWEC NextZero participating municipal light plants"
        ],
        "notes": "Availability and eligible measures vary by participating Massachusetts municipal utility."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "industrial_customer",
        "governmental_customer",
        "institutional_customer",
        "municipal_light_plant_customer",
        "multifamily_common_area_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "government",
        "institutional",
        "multifamily_common_area"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "lighting_controls",
        "high_efficiency_hvac_replacement",
        "custom_energy_efficiency_retrofit",
        "new_construction_energy_efficiency",
        "energy_audit"
      ],
      "hardRequirements": [
        "Customer must be served by a participating municipal light plant.",
        "Project must follow the applicable NextZero C&I rebate pathway.",
        "Lighting equipment must meet program requirements and generally be new qualifying LED or controls equipment.",
        "Incentives are capped by program cost and municipal utility rules."
      ],
      "blockers": [
        "Do not match non-participating investor-owned utility customers.",
        "Do not infer residential appliances or home weatherization from this C&I record.",
        "Do not match battery storage, solar PV, or EV charging to this lighting/HVAC/custom C&I program unless a separate municipal offer applies.",
        "New construction and major renovation incentives are separate from retrofit lighting projects."
      ],
      "programType": "Rebate Program",
      "administrator": "Massachusetts Municipal Wholesale Electric Company",
      "applicationUrl": null,
      "websiteUrl": "https://nextzero.org/",
      "sourceUrlsChecked": [
        "https://nextzero.org/",
        "https://nextzero.org/sterling/commercial/",
        "https://nextzero.org/wp-content/uploads/Winter-2026-NextZero-News-1.pdf",
        "https://nextzero.org/wp-content/uploads/2025_CEL_NZ_-Program_-Prescriptive_-Lighting_Description.pdf",
        "https://www.mmwec.org/how-we-are-green/energy-efficiency/"
      ],
      "evidenceText": "NextZero]( and MMWEC materials describe commercial Prescriptive Lighting, Prescriptive HVAC, Custom Retrofit, and New Construction or Major Renovation rebate programs for participating municipal utility C&I customers.",
      "reasoningNotes": "The LED lighting match is supported; other measures should remain limited to C&I NextZero program pathways."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "MMWEC/NextZero green-opportunity incentives vary by municipal light plant and measure type.",
        "sourceUrlsChecked": [
          "https://nextzero.org/",
          "https://www.mmwec.org/"
        ],
        "reasoningNotes": "No utility-specific commercial efficiency formula was verified for this target.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22737",
    "opportunityName": "Town of Ipswich Electric Light Department - Battery Storage Rebate",
    "state": "MA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22737/town-of-ipswich-electric-light-department-battery-storage-rebate",
    "websiteUrl": "https://www.ipswichma.gov/1035/Residential-Battery",
    "applicationUrl": null,
    "administrator": "Town of Ipswich Electric Light Department",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
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
        "counties": [
          "Essex County"
        ],
        "cities": [
          "Ipswich"
        ],
        "utilityTerritories": [
          "Ipswich Electric Light Department"
        ],
        "notes": "Limited to Town of Ipswich Electric Light Department residential electric accounts."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "homeowner"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "residential_battery_storage_system",
        "battery_storage_system",
        "connected_home_battery_demand_response"
      ],
      "hardRequirements": [
        "Applicant must be an IELD customer.",
        "One rebate per electric account.",
        "Battery must be a qualifying residential lithium-ion system from approved brands.",
        "Battery capacity must be within the program's listed kWh range.",
        "Customer must enroll the battery in Connected Homes before submitting rebate application."
      ],
      "blockers": [
        "Unapproved battery brands are not eligible.",
        "Battery systems outside the required capacity range are not eligible.",
        "A battery not enrolled in Connected Homes before rebate application is not eligible.",
        "Non-IELD customers are not eligible."
      ],
      "programType": "Rebate Program",
      "administrator": "Town of Ipswich Electric Light Department",
      "applicationUrl": null,
      "websiteUrl": "https://www.ipswichma.gov/1035/Residential-Battery",
      "sourceUrlsChecked": [
        "https://www.ipswichma.gov/1035/Residential-Battery",
        "https://nextzero.org/ipswich"
      ],
      "evidenceText": "Ipswich's]( residential battery page lists rebates for IELD customers, qualifying lithium-ion battery brands and capacities, and Connected Homes enrollment requirements.",
      "reasoningNotes": "The battery_storage_system match is source-backed with municipal utility territory and demand-response enrollment constraints."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Ipswich battery rebate is calculated as dollars per battery kWh and includes Connected Homes participation.",
        "sourceUrlsChecked": [
          "https://nextzero.org/ipswich/battery-program/",
          "https://www.ipswichma.gov/1035/Residential-Battery"
        ],
        "reasoningNotes": "Supported rule shapes do not include dollars per battery-storage-kWh; recurring Connected Homes incentives are also excluded.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22714",
    "opportunityName": "Efficiency Maine - Large Battery Management Program",
    "state": "ME",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22714/efficiency-maine-large-battery-management-program",
    "websiteUrl": "https://www.efficiencymaine.com/energy-storage-system-projects/",
    "applicationUrl": null,
    "administrator": "Efficiency Maine",
    "programType": "Performance Based Incentive",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
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
          "Maine electric utilities"
        ],
        "notes": "Available to eligible behind-the-meter demand-metered utility customers in Maine."
      },
      "eligibleApplicantTypes": [
        "commercial_demand_metered_customer",
        "nonprofit_demand_metered_customer",
        "institutional_demand_metered_customer",
        "government_demand_metered_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "nonprofit",
        "institutional",
        "government"
      ],
      "eligibleRetrofitCategories": [
        "battery_storage_system",
        "behind_the_meter_energy_storage",
        "peak_demand_management"
      ],
      "hardRequirements": [
        "Project must be behind the meter for a Maine utility account.",
        "Applicant must be a demand-metered customer; residential and small business customers are excluded.",
        "Battery system must be at least 20 kW and meet technical requirements including round-trip efficiency, data, warranty, and safety listing criteria.",
        "Project must be approved before installation.",
        "Incentive is based on validated peak demand reduction and dispatch performance."
      ],
      "blockers": [
        "Residential and small business customers are not eligible.",
        "Systems intended primarily to export to the grid are not eligible.",
        "This is not a generic backup-battery rebate.",
        "Projects outside Maine or without eligible interval data are not eligible.",
        "Payments are performance-based and require dispatch compliance."
      ],
      "programType": "Performance Based Incentive",
      "administrator": "Efficiency Maine",
      "applicationUrl": null,
      "websiteUrl": "https://www.efficiencymaine.com/energy-storage-system-projects/",
      "sourceUrlsChecked": [
        "https://www.efficiencymaine.com/energy-storage-system-projects/",
        "https://www.efficiencymaine.com/docs/PON-EM-003-2026-ESS-V1.pdf",
        "https://programs.dsireusa.org/system/program/detail/22714/efficiency-maine-large-battery-management-program"
      ],
      "evidenceText": "Efficiency Maine offers performance incentives for behind-the-meter energy storage projects by eligible demand-metered customers, excluding residential and small business accounts.",
      "reasoningNotes": "The battery storage match is source-backed, but the program should be narrowed to large behind-the-meter storage used for peak demand management."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "high",
        "evidenceText": "Large battery management incentives are dispatch/performance compensation for enrolled storage, not an upfront rebate formula.",
        "sourceUrlsChecked": [
          "https://www.efficiencymaine.com/at-work/large-battery-management-program/"
        ],
        "reasoningNotes": "Battery demand-response or managed-storage payments should not be forced into a one-time rule.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22712",
    "opportunityName": "Michigan - Home Efficiency Rebate (HER) Program",
    "state": "MI",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22712/michigan-home-efficiency-rebate-her-program",
    "websiteUrl": "https://www.michigan.gov/egle/about/organization/materials-management/energy/rfps-loans/home-energy-rebate-programs",
    "applicationUrl": "https://www.michigan.gov/egle/about/organization/materials-management/energy/rfps-loans/home-energy-rebate-programs/get-rebate",
    "administrator": "Michigan Department of Environment, Great Lakes, and Energy",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
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
        "utilityTerritories": [],
        "notes": "Statewide Michigan Home Energy Rebates program; eligibility depends on household income and program pathway."
      },
      "eligibleApplicantTypes": [
        "income_qualified_homeowner",
        "renter_with_landlord_participation",
        "multifamily_owner_or_resident"
      ],
      "eligibleSectors": [
        "residential",
        "multifamily"
      ],
      "eligibleRetrofitCategories": [
        "whole_home_energy_efficiency",
        "insulation",
        "air_sealing",
        "high_efficiency_hvac_replacement",
        "heat_pump_installation",
        "heat_pump_water_heater",
        "electric_stove",
        "electrical_wiring_upgrade"
      ],
      "hardRequirements": [
        "Applicant must meet MiHER income and household eligibility rules.",
        "HEAR enhanced rebates are limited by area median income thresholds.",
        "Work must be performed through a MiHER Registered Contractor.",
        "Contractor must assess the home and identify eligible upgrades before rebate approval.",
        "Rebates are paid to the contractor and applied to the customer's project cost."
      ],
      "blockers": [
        "Do not match commercial or industrial projects.",
        "Do not match solar PV, battery storage, or EV charging.",
        "Do not match DIY work or contractors not registered with MiHER.",
        "Do not generalize to non-income-qualified households until program phases expand."
      ],
      "programType": "Rebate Program",
      "administrator": "Michigan Department of Environment, Great Lakes, and Energy",
      "applicationUrl": "https://www.michigan.gov/egle/about/organization/materials-management/energy/rfps-loans/home-energy-rebate-programs/get-rebate",
      "websiteUrl": "https://www.michigan.gov/egle/about/organization/materials-management/energy/rfps-loans/home-energy-rebate-programs",
      "sourceUrlsChecked": [
        "https://www.michigan.gov/egle/about/organization/materials-management/energy/rfps-loans/home-energy-rebate-programs",
        "https://www.michigan.gov/egle/about/organization/materials-management/energy/rfps-loans/home-energy-rebate-programs/get-rebate"
      ],
      "evidenceText": "Michigan]( says MiHER applications are open to low- and moderate-income residents and cover whole-home efficiency and electrification upgrades through approved registered contractors.",
      "reasoningNotes": "The HVAC match is valid only within the residential income-qualified HER or HEAR pathways and contractor process."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Michigan HER amounts depend on household income, modeled savings and project pathway.",
        "sourceUrlsChecked": [
          "https://www.michigan.gov/egle/about/organization/materials-management/energy/rfps-loans/home-energy-rebate-programs"
        ],
        "reasoningNotes": "No safe rule can be created without income and modeled whole-home savings inputs.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1935",
    "opportunityName": "Austin Utilities (Gas and Electric) - Residential Conserve and Save Rebate Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1935/austin-utilities-gas-and-electric-residential-conserve-and-save-rebate-program",
    "websiteUrl": "https://www.austinutilities.com/pages/rebates-programs/",
    "applicationUrl": null,
    "administrator": "Austin Utilities",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
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
          "Mower County"
        ],
        "cities": [
          "Austin"
        ],
        "utilityTerritories": [
          "Austin Utilities"
        ],
        "notes": "Available to qualifying Austin Utilities residential customers."
      },
      "eligibleApplicantTypes": [
        "residential_customers",
        "homeowners"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "energy_audit",
        "air_sealing",
        "attic_insulation",
        "rim_joist_insulation",
        "wall_insulation"
      ],
      "hardRequirements": [
        "House Call energy audit is required for listed weatherization rebates.",
        "Rebated work must be recommended through the audit.",
        "Work must be completed by a qualified participating contractor when required.",
        "Customer must be served by Austin Utilities and meet residential program terms."
      ],
      "blockers": [
        "Energy audit is primarily an audit or prerequisite; do not treat it as a physical retrofit by itself.",
        "Commercial, industrial, and non-Austin Utilities customers are not eligible.",
        "Unsupported commercial kitchen, motor, refrigeration, or industrial measures should not match this residential program."
      ],
      "programType": "Rebate Program",
      "administrator": "Austin Utilities",
      "applicationUrl": null,
      "websiteUrl": "https://www.austinutilities.com/pages/rebates-programs/",
      "sourceUrlsChecked": [
        "https://www.austinutilities.com/pages/rebates-programs/",
        "https://www.austinutilities.com/pages/energyaudits",
        "https://www.austinutilities.com/assetmanager/downloads/newsletters/February%202026%20Newsletter.pdf",
        "https://www.austinutilities.com/assetmanager/downloads/documents/pdf/AU-OPU%20Participating%20Contractors%208-22-17.pdf"
      ],
      "evidenceText": "Austin Utilities describes House Call energy audits and related residential weatherization rebates requiring audit recommendations and qualified contractors.",
      "reasoningNotes": "The audit match is source-backed as a nonphysical audit service and prerequisite; physical retrofit matching should be limited to supported residential weatherization measures."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "medium",
        "evidenceText": "Matched target is energy audit; no direct upfront equipment rebate formula was selected.",
        "sourceUrlsChecked": [
          "https://www.austinutilities.com/pages/ways-to-save"
        ],
        "reasoningNotes": "Audit-only services should not be modeled as one-time project incentives.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22056",
    "opportunityName": "Empire District Electric (Gas) - Commercial and Industrial Gas Efficiency Program",
    "state": "MO",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22056/empire-district-electric-gas-commercial-and-industrial-gas-efficiency-program",
    "websiteUrl": "https://central.libertyutilities.com/all/commercial/ways-to-save/rebates.html",
    "applicationUrl": "https://empiremogas.customerapplication.com/",
    "administrator": "Liberty Utilities Missouri Gas",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 1,
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
          "audit"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "MO"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Liberty Utilities Missouri Gas",
          "Empire District Gas Company"
        ],
        "notes": "Available within Liberty Utilities Missouri natural gas service territory; specific commercial pathway varies by rate class and program portal."
      },
      "eligibleApplicantTypes": [
        "small_commercial_gas_customer",
        "large_commercial_gas_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial"
      ],
      "eligibleRetrofitCategories": [
        "energy_audit",
        "natural_gas_furnace",
        "natural_gas_boiler",
        "natural_gas_water_heater",
        "programmable_thermostat"
      ],
      "hardRequirements": [
        "Applicant must be an eligible Liberty Utilities Missouri gas customer.",
        "Equipment rebate applicants must provide required bill, invoice, customer, and contractor documentation.",
        "Small commercial appliance rebates require qualifying natural gas equipment or thermostat measures.",
        "Large commercial audit and rebate participation is handled through the program application portal.",
        "Rebates are subject to funding availability and program terms."
      ],
      "blockers": [
        "Energy audit details for the large commercial program were not fully accessible because the application portal requires JavaScript.",
        "Do not infer electric efficiency or building envelope measures from the gas rebate sources.",
        "Residential appliance rebates are separate from the commercial and industrial opportunity.",
        "Broad commercial and industrial gas retrofit categories are not fully verified from accessible official sources."
      ],
      "programType": "Rebate",
      "administrator": "Liberty Utilities Missouri Gas",
      "applicationUrl": "https://empiremogas.customerapplication.com/",
      "websiteUrl": "https://central.libertyutilities.com/all/commercial/ways-to-save/rebates.html",
      "sourceUrlsChecked": [
        "https://central.libertyutilities.com/all/commercial/ways-to-save/rebates.html",
        "https://central.libertyutilities.com/all/residential/ways-to-save/rebates.html",
        "https://central.libertyutilities.com/uploads/EDG%20Rebate%20Updated%202025.03.21.pdf",
        "https://central.libertyutilities.com/uploads/EDG%20GAS%20RULES%20081522.pdf",
        "https://empiremogas.customerapplication.com/",
        "https://programs.dsireusa.org/system/program/detail/22056/empire-district-electric-gas-commercial-and-industrial-gas-efficiency-program"
      ],
      "evidenceText": "Liberty's Missouri gas rebate sources list commercial gas rebate pathways, small-commercial equipment rebates, and a large commercial audit and rebate portal.",
      "reasoningNotes": "The energy_audit match is partially source-backed by the large commercial audit program name, but accessible official details are limited. Use medium confidence and block unsupported broad C&I measures."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "medium",
        "evidenceText": "Matched term is audit; source text did not provide a direct equipment rebate formula.",
        "sourceUrlsChecked": [
          "https://central.libertyutilities.com/all/residential/ways-to-save/rebates.html"
        ],
        "reasoningNotes": "Audit-only or non-measure services should not be forced into a one-time rule.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1467",
    "opportunityName": "Evergy - Residential Programmable Thermostat Program",
    "state": "MO",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1467/evergy-residential-programmable-thermostat-program",
    "websiteUrl": "https://www.evergy.com/ways-to-save/discounts/thermostats",
    "applicationUrl": "https://www.evergy.com/thermostat",
    "administrator": "Evergy",
    "programType": "Smart Thermostat Rebate And Demand Response",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
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
          "MO"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Evergy Missouri electric service territory"
        ],
        "notes": "Missouri residential Evergy electric customers; Evergy also operates related thermostat offerings in Kansas, but this DSIRE target is Missouri."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customer"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "smart_thermostat",
        "thermostat_demand_response"
      ],
      "hardRequirements": [
        "Customer must be an eligible Evergy residential electric customer.",
        "Customer must enroll an eligible Wi-Fi smart thermostat in the Thermostat Program.",
        "Program control and demand-response terms apply during Energy Savings Events.",
        "Incentives and annual participation rewards are limited per residential address.",
        "HVAC compatibility is required."
      ],
      "blockers": [
        "Do not generalize to HVAC replacement, zoning, or building automation.",
        "Some systems such as window or wall air conditioners, evaporative coolers, and ductless systems may be ineligible.",
        "This is a smart thermostat and demand-response offering, not a whole-home weatherization program."
      ],
      "programType": "Smart Thermostat Rebate And Demand Response",
      "administrator": "Evergy",
      "applicationUrl": "https://www.evergy.com/thermostat",
      "websiteUrl": "https://www.evergy.com/ways-to-save/discounts/thermostats",
      "sourceUrlsChecked": [
        "https://www.evergy.com/ways-to-save/discounts/thermostats",
        "https://www.evergy.com/-/media/documents/ways-to-save/discounts/thermostat-program-terms-and-conditions-mo.pdf",
        "https://www.evergy.com/-/media/documents/ways-to-save/discounts/evergy-thermostat-program-terms-and-conditions-mo.pdf"
      ],
      "evidenceText": "Evergy’s official Thermostat Program offers free or discounted smart thermostats and enrollment in Energy Savings Events for eligible residential customers.",
      "reasoningNotes": "The thermostat match is valid, but it should be narrowed from smart thermostat or zoning retrofit to smart thermostat with demand response."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "medium",
        "evidenceText": "Evergy thermostat program includes discounted/no-cost devices and an annual demand-response incentive.",
        "sourceUrlsChecked": [
          "https://www.evergy.com/ways-to-save/discounts/thermostats",
          "https://www.evergy.com/help-center/energy-savings-link/what-is-the-evergy-thermostat-program"
        ],
        "reasoningNotes": "Demand-response/annual incentives and variable device discounts should not be modeled as a one-time upfront rule.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5567",
    "opportunityName": "Local Energy Audit Program",
    "state": "NJ",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5567/local-energy-audit-program",
    "websiteUrl": "https://cleanenergy.nj.gov/programs/energy-efficiency/local-government-energy-audit-lgea-program",
    "applicationUrl": null,
    "administrator": "New Jersey Clean Energy Program",
    "programType": "Energy Audit Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
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
        "notes": "Statewide New Jersey program for eligible public and nonprofit entities."
      },
      "eligibleApplicantTypes": [
        "local_government_agency",
        "state_agency",
        "k_12_public_school",
        "public_agency",
        "state_college_university",
        "nonprofit_501c3"
      ],
      "eligibleSectors": [
        "government",
        "education",
        "nonprofit"
      ],
      "eligibleRetrofitCategories": [
        "energy_audit"
      ],
      "hardRequirements": [
        "Applicant must be one of the eligible public or 501(c)(3) nonprofit entity types.",
        "Program provides no-cost energy audits, not automatic retrofit funding.",
        "Audit participation and next steps are handled through NJ Clean Energy Program processes."
      ],
      "blockers": [
        "Not for residential households or private for-profit commercial customers.",
        "Physical retrofit incentives are separate from the audit unless a separate NJCEP funding path applies.",
        "Do not infer commercial equipment or weatherization measures from the audit program alone."
      ],
      "programType": "Energy Audit Program",
      "administrator": "New Jersey Clean Energy Program",
      "applicationUrl": null,
      "websiteUrl": "https://cleanenergy.nj.gov/programs/energy-efficiency/local-government-energy-audit-lgea-program",
      "sourceUrlsChecked": [
        "https://cleanenergy.nj.gov/programs/energy-efficiency/local-government-energy-audit-lgea-program",
        "https://www.njcleanenergy.com/lgea"
      ],
      "evidenceText": "NJCEP states LGEA offers no-cost energy audits to local and state agencies, K-12 public schools, public agencies, state colleges and universities, and 501(c)(3) nonprofits.",
      "reasoningNotes": "The energy_audit match is supported. Keep it narrow because implementation incentives and funded retrofit projects are separate downstream opportunities."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "high",
        "evidenceText": "New Jersey Local Energy Audit Program provides audits/technical assistance, not an upfront equipment rebate formula.",
        "sourceUrlsChecked": [
          "https://www.njcleanenergy.com/commercial-industrial/programs/local-government-energy-audit/local-government-energy-audit"
        ],
        "reasoningNotes": "Audit-only services should not be modeled as one-time project incentives.",
        "originalGapReason": "source_text_unavailable",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3954",
    "opportunityName": "Southwest Gas Corporation - Residential Energy Efficiency Rebate Program",
    "state": "NV",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3954/southwest-gas-corporation-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.swgas.com/en/rebates-and-promotions-search-residential-nevada",
    "applicationUrl": null,
    "administrator": "Southwest Gas Corporation",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 1,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
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
          "Southwest Gas Corporation"
        ],
        "notes": "Limited to Southwest Gas residential customers in Nevada; measure details should be verified against the current Nevada application."
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
        "natural_gas_tankless_water_heater",
        "solar_water_heating_system"
      ],
      "hardRequirements": [
        "Applicant must be a Southwest Gas Nevada residential customer.",
        "Qualifying equipment must meet current Southwest Gas rebate requirements.",
        "Solar water-heating systems must use natural-gas backup and program-qualified contractors when required.",
        "Rebates are subject to funding and current application terms."
      ],
      "blockers": [
        "Solar PV is not supported by this residential gas rebate program.",
        "Generic solar water heating without a qualifying natural-gas backup should not be matched.",
        "Current accessible materials were clearer for Nevada gas water-heater rebates than for Nevada solar water-heating rebate details."
      ],
      "programType": "Rebate Program",
      "administrator": "Southwest Gas Corporation",
      "applicationUrl": null,
      "websiteUrl": "https://www.swgas.com/en/rebates-and-promotions-search-residential-nevada",
      "sourceUrlsChecked": [
        "https://www.swgas.com/en/rebates-and-promotions-search-residential-nevada",
        "https://www.swgas.com/en/solar-water-heating",
        "https://www.swgas.com/en/solar-water-heating-program-contractor-information",
        "https://www.swgas.com/1409208977669/SWG_2026_NV_RES_Rebate_Application.pdf"
      ],
      "evidenceText": "Southwest]( Gas materials identify Nevada residential rebates and describe solar water-heating systems with natural-gas backup; contractor materials reference Arizona or Nevada solar water-heating eligibility.",
      "reasoningNotes": "Keep solar_water_heating_system only with medium confidence and natural-gas-backup constraints; current public pages are fragmented and rebate-search content is partly dynamic."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Official Nevada rebates search page did not expose a clear solar water heating formula.",
        "sourceUrlsChecked": [
          "https://www.swgas.com/en/rebates-and-promotions-search-residential-nevada"
        ],
        "reasoningNotes": "No current official amount was verified.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_code_title_hash:OK30F:e57fdd96f549",
    "opportunityName": "Oklahoma Municipal Power Authority - WISE Energy Efficiency Rebate Program",
    "state": "OK",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program",
    "websiteUrl": "https://www.ompa.com/services/rebate-programs/",
    "applicationUrl": null,
    "administrator": "Oklahoma Municipal Power Authority",
    "programType": "Residential Energy Efficiency Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 1,
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
      }
    ],
    "repairedOpportunityData": {
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "OK"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Oklahoma Municipal Power Authority participating member utilities"
        ],
        "notes": "Rebates are limited to electric customers of OMPA member cities participating in the relevant rebate."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customer",
        "subdivision_homebuilder"
      ],
      "eligibleSectors": [
        "residential",
        "new_residential_construction"
      ],
      "eligibleRetrofitCategories": [
        "air_sealing_weatherization",
        "attic_ceiling_insulation",
        "electric_heat_pump_hvac",
        "efficient_electric_water_heater"
      ],
      "hardRequirements": [
        "Customer must be served by a participating OMPA member city electric utility.",
        "Measure must be one of the current WISE rebate offerings and meet OMPA rebate specifications.",
        "Heat pump rebates may apply to residential customers and qualifying subdivision homebuilders.",
        "Water heater rebates are for participating member city residential electric customers."
      ],
      "blockers": [
        "No eligibility outside participating OMPA member utilities.",
        "Do not match non-WISE commercial or industrial measures.",
        "Air sealing support is retained with medium confidence because current official rebate-page evidence is stronger for WISE insulation, heat pump, and water heater measures."
      ],
      "programType": "Residential Energy Efficiency Rebate",
      "administrator": "Oklahoma Municipal Power Authority",
      "applicationUrl": null,
      "websiteUrl": "https://www.ompa.com/services/rebate-programs/",
      "sourceUrlsChecked": [
        "https://www.ompa.com/services/rebate-programs/",
        "https://www.ompa.com/turn-down-the-watts/",
        "https://programs.dsireusa.org/system/program"
      ],
      "evidenceText": "OMPA's rebate page describes WISE heat pump, ceiling insulation, and electric water heater rebates for customers of participating member cities. Air sealing appears to be a WISE measure but is less directly visible on the current page.",
      "reasoningNotes": "The air sealing match is plausible but not as directly supported by the currently accessible official rebate page as the other WISE measures."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Official OMPA page describes WISE rebates but does not expose a current air-sealing formula.",
        "sourceUrlsChecked": [
          "https://www.ompa.com/services/rebate-programs/",
          "https://programs.dsireusa.org/system/program/detail/4525"
        ],
        "reasoningNotes": "DSIRE suggests a cost-share, but no official source-backed air-sealing formula was verified.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "envelope_insulation_savings",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      }
    ]
  }
]
