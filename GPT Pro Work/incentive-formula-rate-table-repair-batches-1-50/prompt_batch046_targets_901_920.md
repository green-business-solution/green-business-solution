You are helping RetroFi repair incentive formulas, rate tables, grant estimates, tax credits, and non-cash workflow value rules.

Return strict JSON only. Do not include markdown, code fences, commentary, or citations outside JSON fields.

Batch: 46
Targets in this prompt: 901-920 of 984
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
  "batchNumber": 46,
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
  "continueFromOpportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:f69ab77394818965:energy-survey"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5138",
    "opportunityName": "Southeastern Electric - Energy Efficiency Rebate Program",
    "state": "SD",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5138/southeastern-electric-energy-efficiency-rebate-program",
    "websiteUrl": "https://southeasternelectric.com/member-rebates-incentives/",
    "applicationUrl": null,
    "administrator": "Southeastern Electric Cooperative",
    "programType": "Member Rebate And Efficiency Loan Program",
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
          "SD"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Southeastern Electric Cooperative"
        ],
        "notes": "Limited to Southeastern Electric Cooperative member accounts and measure-specific residential or commercial eligibility."
      },
      "eligibleApplicantTypes": [
        "electric_cooperative_members",
        "residential_customers",
        "commercial_customers"
      ],
      "eligibleSectors": [
        "residential",
        "commercial"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "geothermal_heat_pump_retrofit",
        "ductless_mini_split_heat_pump",
        "commercial_electric_heat_rebate",
        "commercial_lighting_replacement_led",
        "residential_electric_water_heater_rebate",
        "energy_efficiency_project_financing"
      ],
      "hardRequirements": [
        "Heat pump rebates require electric heat as the primary heat source and qualifying installed equipment.",
        "Heat pump applications require invoice documentation and AHRI certificate where applicable.",
        "Commercial lighting is for replacement fixtures only and requires invoice, recycling or destruction of old fixtures, and inspection.",
        "Residential water heater rebates require installation at a Southeastern-served location and load-management connection."
      ],
      "blockers": [
        "Do not match broad residential LED lighting; the LED support found is commercial lighting replacement fixtures.",
        "Do not match fossil-fueled equipment for the financing program.",
        "Do not generalize electric water heater rebates to agricultural or commercial water heaters where the page excludes them."
      ],
      "programType": "Member Rebate And Efficiency Loan Program",
      "administrator": "Southeastern Electric Cooperative",
      "applicationUrl": null,
      "websiteUrl": "https://southeasternelectric.com/member-rebates-incentives/",
      "sourceUrlsChecked": [
        "https://southeasternelectric.com/member-rebates-incentives/",
        "https://southeasternelectric.com/member-rebates-incentives/heat-pumps/"
      ],
      "evidenceText": "Southeastern]( lists member incentives for heat pumps, commercial electric heat, commercial lighting replacement fixtures, residential electric water heaters, and energy-efficiency loans.",
      "reasoningNotes": "The original LED match is valid only as commercial lighting replacement. The HVAC match should be narrowed to heat pumps or commercial electric heat, not broad HVAC."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Target has no matched terms and official source did not expose a specific measure value.",
        "sourceUrlsChecked": [
          "https://southeasternelectric.com/member-rebates-incentives/"
        ],
        "reasoningNotes": "Measure selection is required before creating a rule.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5745",
    "opportunityName": "CenterPoint Energy A/C Distributor Program",
    "state": "TX",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5745/centerpoint-energy-a-c-distributor-program",
    "websiteUrl": "https://www.centerpointenergy.com/en-us/residential/save-energy-money/electric-efficiency-programs/heating-and-cooling?sa=ho",
    "applicationUrl": null,
    "administrator": "CenterPoint Energy",
    "programType": "Rebate",
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
          "TX"
        ],
        "counties": [],
        "cities": [
          "Houston"
        ],
        "utilityTerritories": [
          "CenterPoint Energy Houston Electric"
        ],
        "notes": "Applies to eligible residential customers in the CenterPoint Energy Houston Electric service area."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customers",
        "participating_contractors"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_central_ac_replacement",
        "air_source_heat_pump_hvac_retrofit",
        "ductless_mini_split_heat_pump_retrofit"
      ],
      "hardRequirements": [
        "Customer must be in the CenterPoint Energy Houston Electric service area.",
        "HVAC replacement incentives must be delivered through a participating contractor.",
        "Eligible equipment includes qualifying central air conditioners, heat pumps, and mini-split systems.",
        "Equipment must meet current program efficiency requirements.",
        "Incentive is applied directly to the installation invoice."
      ],
      "blockers": [
        "This is not available to customers outside CenterPoint Energy Houston Electric territory.",
        "Do not use Indiana or gas-service rebate rules for this Texas electric program.",
        "Equipment installed without a participating contractor may not receive the program incentive.",
        "Commercial or industrial HVAC retrofits are not supported by the reviewed residential source."
      ],
      "programType": "Rebate",
      "administrator": "CenterPoint Energy",
      "applicationUrl": null,
      "websiteUrl": "https://www.centerpointenergy.com/en-us/residential/save-energy-money/electric-efficiency-programs/heating-and-cooling?sa=ho",
      "sourceUrlsChecked": [
        "https://www.centerpointenergy.com/en-us/residential/save-energy-money/electric-efficiency-programs/heating-and-cooling?sa=ho",
        "https://www.centerpointenergy.com/en-us/residential/save-energy-money/electric-efficiency-programs/residential-electric-efficiency?sa=ho"
      ],
      "evidenceText": "CenterPoint Energy Houston Electric lists residential HVAC replacement incentives for high-efficiency central AC, heat pumps, and mini-split systems through participating contractors.",
      "reasoningNotes": "The HVAC and heat pump matches are valid for residential electric HVAC replacement in the Houston Electric service territory."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "medium",
        "evidenceText": "CenterPoint A/C Distributor Program is a distributor or midstream channel, not a direct customer upfront rebate formula.",
        "sourceUrlsChecked": [
          "https://www.centerpointenergy.com/en-us/business/services/dealers-distributors/efficiency-programs-rebates?sa=ho",
          "https://programs.dsireusa.org/system/program/detail/5745"
        ],
        "reasoningNotes": "Midstream distributor incentives should not be modeled as direct project savings.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3316",
    "opportunityName": "Dominion Energy - Residential Solar Assisted Water Heating Rebate Program",
    "state": "UT",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3316/dominion-energy-residential-solar-assisted-water-heating-rebate-program",
    "websiteUrl": "https://www.enbridgegas.com/utwyid/save-money/thermwise",
    "applicationUrl": "https://www.enbridgegas.com/-/media/Extranet-Pages/utidwy/save-money/thermwise/appliance-rebates/Appl_WaterHeating-SF_UT.pdf?hash=4DDEE6CBE412C0B8E6D7CD7868EAD1FC&rev=2ac02cda64b547daaea67f2aa9b64f9c",
    "administrator": "Enbridge Gas Utah ThermWise",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 2,
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
          "UT"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Enbridge Gas Utah service territory"
        ],
        "notes": "Applies to eligible existing residential dwellings with active Enbridge Gas service in Utah."
      },
      "eligibleApplicantTypes": [
        "enbridge_gas_residential_customer",
        "property_owner"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "solar_assisted_water_heating_system"
      ],
      "hardRequirements": [
        "Applies to existing residential dwellings with active Enbridge Gas service.",
        "Household must use qualifying natural gas service and primary gas heating under applicable ThermWise rules.",
        "Solar-assisted domestic water heating must be an active system certified OG-300 by SRCC.",
        "Solar-assisted pool heating must use OG-100 collectors where applicable.",
        "Application must meet installation date, submission deadline, invoice, and program documentation requirements."
      ],
      "blockers": [
        "High-efficiency boiler retrofit is not supported by this opportunity.",
        "Boiler wording refers only to gas water heating appliances supported by the solar-assisted system.",
        "Used, rebuilt, leased, or non-qualifying equipment is not eligible.",
        "Commercial water heating should not be inferred from this residential ThermWise form."
      ],
      "programType": "Rebate",
      "administrator": "Enbridge Gas Utah ThermWise",
      "applicationUrl": "https://www.enbridgegas.com/-/media/Extranet-Pages/utidwy/save-money/thermwise/appliance-rebates/Appl_WaterHeating-SF_UT.pdf?hash=4DDEE6CBE412C0B8E6D7CD7868EAD1FC&rev=2ac02cda64b547daaea67f2aa9b64f9c",
      "websiteUrl": "https://www.enbridgegas.com/utwyid/save-money/thermwise",
      "sourceUrlsChecked": [
        "https://www.enbridgegas.com/utwyid/save-money/thermwise",
        "https://www.enbridgegas.com/-/media/Extranet-Pages/utidwy/save-money/thermwise/appliance-rebates/Appl_WaterHeating-SF_UT.pdf?hash=4DDEE6CBE412C0B8E6D7CD7868EAD1FC&rev=2ac02cda64b547daaea67f2aa9b64f9c"
      ],
      "evidenceText": "The 2026 ThermWise residential water heating form lists a solar-assisted water heating rebate and related certification and gas-service requirements.",
      "reasoningNotes": "Remove boiler retrofit; the supported measure is solar-assisted water heating."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "DSIRE suggests a solar-assisted water heating amount, but an official current ThermWise formula was not verified in accessible text.",
        "sourceUrlsChecked": [
          "https://www.thermwise.com/appliance-applications/",
          "https://programs.dsireusa.org/system/program/detail/3316"
        ],
        "reasoningNotes": "Do not rely on DSIRE alone where official application proof is available but not extracted.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22481",
    "opportunityName": "Dominion Energy Virginia - EV Charger Rewards",
    "state": "VA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22481/dominion-energy-virginia-ev-charger-rewards",
    "websiteUrl": "https://www.dominionenergy.com/virginia/save-energy/ev-charger-rewards",
    "applicationUrl": "https://www.chargingrewards.com/dominionenergy-ev/",
    "administrator": "Dominion Energy Virginia",
    "programType": "Equipment Rebate And Managed Charging Rewards",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
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
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "VA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Dominion Energy Virginia electric service territory"
        ],
        "notes": "Limited to eligible Dominion Energy Virginia residential electric customers with compatible Level 2 EVSE."
      },
      "eligibleApplicantTypes": [
        "dominion_energy_virginia_residential_customer"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "level_2_evse_purchase_rebate",
        "ev_managed_charging_rewards"
      ],
      "hardRequirements": [
        "Customer must have a compatible Level 2 EVSE charger.",
        "Equipment rebate is tied to applying within the stated purchase window.",
        "Ongoing annual rewards require participation in EV Charger Rewards managed charging events or schedule adjustments.",
        "Customer must be in the Dominion Energy Virginia electric service area."
      ],
      "blockers": [
        "Do not merge the separate Residential Charger Installation Program into this EV Charger Rewards opportunity.",
        "The income-qualifying Residential Charger Installation option is separately listed as fully subscribed.",
        "The EV pricing pilot is separate and closed.",
        "This is not a generic EV charger installation rebate for all charger or wiring costs."
      ],
      "programType": "Equipment Rebate And Managed Charging Rewards",
      "administrator": "Dominion Energy Virginia",
      "applicationUrl": "https://www.chargingrewards.com/dominionenergy-ev/",
      "websiteUrl": "https://www.dominionenergy.com/virginia/save-energy/ev-charger-rewards",
      "sourceUrlsChecked": [
        "https://www.dominionenergy.com/virginia/save-energy/ev-charger-rewards",
        "http://www.dominionenergy.com/virginia/save-energy/electric-vehicles",
        "https://www.chargingrewards.com/dominionenergy-ev/",
        "http://www.dominionenergy.com/virginia/save-energy/electric-vehicles/residential-charger-program"
      ],
      "evidenceText": "The EV Charger Rewards page and partner enrollment page describe a compatible Level 2 EVSE equipment rebate and annual managed charging rewards.",
      "reasoningNotes": "Confidence is medium because the official target URL redirects, but Dominion pages and the rewards enrollment source support an active EVSE rewards program."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "high",
        "evidenceText": "EV Charger Rewards is a managed-charging/rewards program rather than a direct upfront charger rebate.",
        "sourceUrlsChecked": [
          "https://www.dominionenergy.com/virginia/save-energy/electric-vehicles/ev-charger-rewards"
        ],
        "reasoningNotes": "Recurring charging rewards and demand-response credits are excluded from one-time savings rules.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22345",
    "opportunityName": "Vermont Electric Coop - Electric Vehicle Purchase Bill Credit",
    "state": "VT",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22345/vermont-electric-coop-electric-vehicle-purchase-bill-credit",
    "websiteUrl": "https://vermontelectric.coop/energy-transformation-programs",
    "applicationUrl": "https://vermontelectric.coop/energy-transformation-programs",
    "administrator": "Vermont Electric Cooperative",
    "programType": "Bill Credit Program",
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
        "cities": [],
        "utilityTerritories": [
          "Vermont Electric Cooperative service territory"
        ],
        "notes": "Applies to VEC members; income adders and public/workplace charging options have separate eligibility rules."
      },
      "eligibleApplicantTypes": [
        "Vermont Electric Cooperative members",
        "residential members purchasing or leasing eligible EVs",
        "income-qualified VEC members for adders",
        "business or public entity members only for separate charging station incentives"
      ],
      "eligibleSectors": [
        "residential",
        "transportation",
        "commercial_limited",
        "public_sector_limited"
      ],
      "eligibleRetrofitCategories": [
        "battery_electric_vehicle_purchase_or_lease_bill_credit",
        "plug_in_hybrid_vehicle_purchase_or_lease_bill_credit",
        "income_qualified_ev_bill_credit_adder"
      ],
      "hardRequirements": [
        "Applicant must be a Vermont Electric Cooperative member.",
        "Vehicle must be a qualifying new or used electric vehicle or plug-in hybrid that is purchased or leased under the program rules.",
        "Incentive is delivered as a VEC bill credit rather than a cash rebate unless otherwise specified by the program.",
        "Income-qualified adders require proof of eligibility under VEC's stated criteria."
      ],
      "blockers": [
        "This DSIRE record is for EV purchase bill credits and should not be matched to building energy retrofits.",
        "EV chargers, public charging stations, induction cooktops, heat pump pool heaters and electric forklifts appear as separate VEC Energy Transformation Program line items and were not merged into this EV purchase record.",
        "This is a bill credit program, not a direct upfront vehicle rebate for arbitrary savings calculations.",
        "Do not map this record to HVAC, appliances, weatherization or commercial facility retrofits."
      ],
      "programType": "Bill Credit Program",
      "administrator": "Vermont Electric Cooperative",
      "applicationUrl": "https://vermontelectric.coop/energy-transformation-programs",
      "websiteUrl": "https://vermontelectric.coop/energy-transformation-programs",
      "sourceUrlsChecked": [
        "https://vermontelectric.coop/energy-transformation-programs",
        "https://vermontelectric.coop/latest-news/heres-a-rundown-on-vecs-2026-energy-transformation-incentives-01-21-26",
        "https://programs.dsireusa.org/system/program/detail/22345/vermont-electric-coop-electric-vehicle-purchase-bill-credit"
      ],
      "evidenceText": "VEC's Energy Transformation Programs page says it provides bill credits for members who buy fossil-fuel-displacing devices. The 2026 program rundown lists bill credits for all-electric vehicles and plug-in hybrids, with an income-qualified adder, and lists EV charger incentives separately.",
      "reasoningNotes": "The opportunity is active but is not a building retrofit rebate. Only EV purchase or lease bill-credit categories were retained, with charging equipment blocked as a separate VEC line item."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "medium",
        "evidenceText": "Program is an electric vehicle purchase bill credit, not an upfront vehicle rebate.",
        "sourceUrlsChecked": [
          "https://vermontelectric.coop/energy-transformation-programs"
        ],
        "reasoningNotes": "Bill credits are recurring/account credits and should not be encoded as upfront incentives.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22344",
    "opportunityName": "Vermont Electric Coop - EV Charging Station Bill Credit",
    "state": "VT",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22344/vermont-electric-coop-ev-charging-station-bill-credit",
    "websiteUrl": "https://vermontelectric.coop/energy-transformation-programs",
    "applicationUrl": null,
    "administrator": "Vermont Electric Cooperative",
    "programType": "Other Incentive",
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
          "ev charging",
          "charging station",
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
          "level-2",
          "level ii"
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
        "cities": [],
        "utilityTerritories": [
          "Vermont Electric Cooperative"
        ],
        "notes": "Limited to Vermont Electric Cooperative members or qualifying public charging sites in VEC territory."
      },
      "eligibleApplicantTypes": [
        "electric_cooperative_member",
        "residential_customer",
        "business",
        "public_entity",
        "school",
        "municipality"
      ],
      "eligibleSectors": [
        "residential",
        "commercial",
        "public",
        "institutional"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation",
        "public_ev_charging_station"
      ],
      "hardRequirements": [
        "Home charger incentives require VEC membership and Level II charger participation in VEC peak-management terms.",
        "Members using their own Level II charger must meet scheduling or platform-enrollment requirements.",
        "Public charging station bill credits require qualifying Level II or Level III public charging stations.",
        "Public charging stations must be publicly available and meet VEC program conditions."
      ],
      "blockers": [
        "Non-VEC customers should not match.",
        "Home chargers that cannot be scheduled or enrolled for peak management should not match.",
        "Private workplace or fleet chargers should not match the public-station bill credit unless public-access rules are met."
      ],
      "programType": "Other Incentive",
      "administrator": "Vermont Electric Cooperative",
      "applicationUrl": null,
      "websiteUrl": "https://vermontelectric.coop/energy-transformation-programs",
      "sourceUrlsChecked": [
        "https://vermontelectric.coop/energy-transformation-programs",
        "https://vermontelectric.coop/latest-news/heres-a-rundown-on-vecs-2026-energy-transformation-incentives-01-21-26",
        "https://programs.dsireusa.org/system/program/detail/22344/vermont-electric-coop-ev-charging-station-bill-credit"
      ],
      "evidenceText": "VEC]( lists Level II home charger incentives and public Level II or Level III charging station bill credits with peak-management or public-access conditions.",
      "reasoningNotes": "EV charging is source-backed. The broad EV charger category should be narrowed to VEC-member Level II chargers or qualifying public charging stations."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "medium",
        "evidenceText": "Program title and official page identify an EV charging station bill credit.",
        "sourceUrlsChecked": [
          "https://vermontelectric.coop/energy-transformation-programs"
        ],
        "reasoningNotes": "Bill credits are recurring/account credits rather than direct upfront charger rebates.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22585",
    "opportunityName": "Vermont Electric Coop - Heat Pump Bill Credit",
    "state": "VT",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22585/vermont-electric-coop-heat-pump-bill-credit",
    "websiteUrl": "https://vermontelectric.coop/energy-transformation-programs",
    "applicationUrl": "https://smarthub.tfaforms.net/1917",
    "administrator": "Vermont Electric Cooperative",
    "programType": "Heat Pump Thermal Efficiency Bill Credit",
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
          "VT"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Vermont Electric Cooperative"
        ],
        "notes": "Available to VEC members at qualifying service addresses."
      },
      "eligibleApplicantTypes": [
        "electric_cooperative_members",
        "residential_customers",
        "commercial_customers"
      ],
      "eligibleSectors": [
        "residential",
        "commercial"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_thermal_efficiency_bill_credit"
      ],
      "hardRequirements": [
        "Member must purchase a qualifying heat pump or pellet stove installed in a thermally efficient building.",
        "Thermal efficiency documentation must show Home Performance with ENERGY STAR, WAP weatherization, a 2011 or newer RBES certificate, or blower-door test below the stated ACH threshold.",
        "Applicant must submit the VEC thermal efficiency bonus form with proof of purchase.",
        "Larger heat pump systems and heat pump water heaters use Efficiency Vermont single-credit or point-of-purchase pathways."
      ],
      "blockers": [
        "Do not match broad high_efficiency_hvac_replacement; VEC says no direct heat pump incentive is available other than a possible 150 dollar thermal efficiency adder.",
        "Do not treat Efficiency Vermont base heat pump or heat pump water heater incentives as this VEC bill credit.",
        "Do not match non-thermally-efficient buildings that cannot document eligibility."
      ],
      "programType": "Heat Pump Thermal Efficiency Bill Credit",
      "administrator": "Vermont Electric Cooperative",
      "applicationUrl": "https://smarthub.tfaforms.net/1917",
      "websiteUrl": "https://vermontelectric.coop/energy-transformation-programs",
      "sourceUrlsChecked": [
        "https://vermontelectric.coop/energy-transformation-programs",
        "https://smarthub.tfaforms.net/1917"
      ],
      "evidenceText": "VEC]( says heat pump incentives are generally through Efficiency Vermont, with only a possible 150 dollar thermal efficiency adder directly through VEC for qualifying buildings.",
      "reasoningNotes": "The heat pump concept is correct only for VEC's narrow thermal-efficiency bill credit. Remove broad HVAC replacement."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "medium",
        "evidenceText": "Program title and source identify a heat pump bill credit.",
        "sourceUrlsChecked": [
          "https://vermontelectric.coop/energy-transformation-programs"
        ],
        "reasoningNotes": "A bill credit is not an upfront one-time rebate unless the source clearly provides one.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4851",
    "opportunityName": "River Falls Municipal Utilities - Business Energy Efficiency Rebate Program",
    "state": "WI",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4851/river-falls-municipal-utilities-business-energy-efficiency-rebate-program",
    "websiteUrl": "https://rfmu.org/929/RFMU-Efficiency-Programs---Businesses",
    "applicationUrl": "https://www.rfcity.org/DocumentCenter/View/7127/RiverFalls_PowerfulChoices_Business-Incentive_Flyer_85x11_Final",
    "administrator": "River Falls Municipal Utilities",
    "programType": "Rebate And Custom Incentive Program",
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
          "WI"
        ],
        "counties": [],
        "cities": [
          "River Falls"
        ],
        "utilityTerritories": [
          "River Falls Municipal Utilities electric service territory"
        ],
        "notes": "RFMU incentives apply to qualifying projects in the City of River Falls and RFMU or Focus on Energy business service territory."
      },
      "eligibleApplicantTypes": [
        "business_customers",
        "commercial_customers",
        "industrial_customers",
        "agricultural_customers",
        "multifamily_property_owners",
        "school_customers"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "agricultural",
        "multifamily",
        "public",
        "education"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "commercial_hvac_efficiency",
        "motors_and_drives",
        "compressed_air_system_efficiency",
        "electric_chiller_upgrade",
        "commercial_food_service_equipment",
        "agricultural_process_equipment_efficiency",
        "commercial_refrigeration_controls_and_led_case_lighting",
        "building_energy_management_controls",
        "energy_efficiency_study",
        "custom_large_energy_efficiency_project"
      ],
      "hardRequirements": [
        "Project must be for a qualifying RFMU or River Falls business customer.",
        "Many projects require Focus on Energy eligibility and preapproval before implementation.",
        "RFMU business incentive is a bonus match to Focus on Energy business incentives, subject to caps and funding.",
        "Large custom RFP projects must meet the stated annual kWh savings or peak-demand reduction threshold.",
        "Equipment must meet applicable Focus on Energy and RFMU technical requirements."
      ],
      "blockers": [
        "Do not match residential home weatherization or residential appliances.",
        "RFMU EV charging and solar incentives are separate programs and should not be inferred from this business energy-efficiency rebate record.",
        "Do not match measures outside Focus on Energy or RFMU business program rules.",
        "Preapproval-dependent measures should not match as automatic rebates."
      ],
      "programType": "Rebate And Custom Incentive Program",
      "administrator": "River Falls Municipal Utilities",
      "applicationUrl": "https://www.rfcity.org/DocumentCenter/View/7127/RiverFalls_PowerfulChoices_Business-Incentive_Flyer_85x11_Final",
      "websiteUrl": "https://rfmu.org/929/RFMU-Efficiency-Programs---Businesses",
      "sourceUrlsChecked": [
        "https://rfmu.org/922/Efficiency-Programs",
        "https://rfmu.org/929/RFMU-Efficiency-Programs---Businesses",
        "https://rfcity.org/930/Focus-on-Energy-Programs---Businesses",
        "https://focusonenergy.com/utility-partners/river-falls-municipal-utilities",
        "https://focusonenergy.com/business/rebates"
      ],
      "evidenceText": "RFMU and Focus pages show business incentives for River Falls projects, with measures including lighting, HVAC, motors, compressed air, chillers, food service, refrigeration controls, and studies.",
      "reasoningNotes": "Both lighting and commercial HVAC efficiency matches are supported. Keep the record business-only and block residential or separate EV and solar programs."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "RFMU business incentive offers up to $5,000 as a bonus match to Focus on Energy business programs.",
        "sourceUrlsChecked": [
          "https://rfmu.org/929/RFMU-Efficiency-Programs---Businesses"
        ],
        "reasoningNotes": "The exact formula depends on the underlying Focus on Energy project and match calculation; no direct kitchen-equipment rule created.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22263",
    "opportunityName": "Alaska Power and Telephone - AMP-UP Program",
    "state": "AK",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22263/alaska-power-and-telephone-amp-up-program",
    "websiteUrl": "https://aptalaska.com/power/incentives/",
    "applicationUrl": null,
    "administrator": "Alaska Power and Telephone",
    "programType": "Rebate Program",
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
          "AK"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Alaska Power and Telephone electric service areas"
        ],
        "notes": "Limited to AP&T electric service communities, primarily in Southeast Alaska and other AP&T served areas."
      },
      "eligibleApplicantTypes": [
        "local_government",
        "tribal_government",
        "electric_customer",
        "employee"
      ],
      "eligibleSectors": [
        "local_government",
        "tribal",
        "residential_customer_vehicle_purchase"
      ],
      "eligibleRetrofitCategories": [
        "public_ev_charging_station"
      ],
      "hardRequirements": [
        "Public charging station incentive is limited to local and tribal governments installing community charging stations.",
        "Project must be in an AP&T electric service area.",
        "EV purchase incentives require a 100% electric vehicle, minimum battery capacity, customer title, physical presence verification, and application within the stated deadline.",
        "Plug-in hybrids and extended-range electric vehicles are not eligible for the EV purchase incentive."
      ],
      "blockers": [
        "Do not match private residential EV charger installation.",
        "Do not match EV purchase rebates as a building retrofit.",
        "Do not include AP&T heat pump or e-bike incentives in this AMP-UP EV record unless modeled as separate opportunities.",
        "Do not match plug-in hybrid vehicles."
      ],
      "programType": "Rebate Program",
      "administrator": "Alaska Power and Telephone",
      "applicationUrl": null,
      "websiteUrl": "https://aptalaska.com/power/incentives/",
      "sourceUrlsChecked": [
        "https://programs.dsireusa.org/system/program/detail/22263/alaska-power-and-telephone-amp-up-program",
        "https://www.aptalaska.com/amp-up/",
        "https://aptalaska.com/power/incentives/"
      ],
      "evidenceText": "AP&T lists AMP-UP EV incentives and states community charging stations are eligible for local and tribal governments, while EV purchase incentives have separate vehicle requirements.",
      "reasoningNotes": "The EV charger match should be narrowed to public or community charging stations. The main EV purchase incentive is not a property retrofit."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Official AMP-UP page did not expose a clear current per-vehicle or per-charger one-time formula in accessible text.",
        "sourceUrlsChecked": [
          "https://www.aptalaska.com/amp-up/"
        ],
        "reasoningNotes": "No safe fleet fuel replacement rule was found.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5618",
    "opportunityName": "Weatherization Program",
    "state": "AK",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5618/weatherization-program",
    "websiteUrl": "https://www.ahfc.us/efficiency/weatherization",
    "applicationUrl": "https://www.ahfc.us/efficiency/weatherization/weatherization-service-providers",
    "administrator": "Alaska Housing Finance Corporation",
    "programType": "Grant Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
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
          "weatherization"
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
        "utilityTerritories": [],
        "notes": "Alaska Weatherization is delivered through regional service providers statewide."
      },
      "eligibleApplicantTypes": [
        "low_income_household",
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
        "energy_audit",
        "weatherization_health_safety_repairs"
      ],
      "hardRequirements": [
        "Applicant household must meet AHFC income eligibility limits.",
        "Applications are submitted through the appropriate regional weatherization service provider.",
        "Rental and multifamily work must meet AHFC program requirements.",
        "Previously weatherized homes may have priority limitations."
      ],
      "blockers": [
        "Do not match commercial or industrial energy-efficiency measures.",
        "Do not infer solar, EV charging, or general appliance rebates.",
        "Measures must be part of AHFC weatherization scope and provider approval."
      ],
      "programType": "Grant Program",
      "administrator": "Alaska Housing Finance Corporation",
      "applicationUrl": "https://www.ahfc.us/efficiency/weatherization/weatherization-service-providers",
      "websiteUrl": "https://www.ahfc.us/efficiency/weatherization",
      "sourceUrlsChecked": [
        "https://www.ahfc.us/efficiency/weatherization",
        "https://www.ahfc.us/efficiency/weatherization/weatherization-service-providers",
        "https://www.ahfc.us/efficiency/weatherization/weatherization-operations-manual"
      ],
      "evidenceText": "AHFC states eligible individuals apply through weatherization providers and receive no-cost weatherization services under AHFC program rules.",
      "reasoningNotes": "The weatherization match is supported by current AHFC sources. Eligibility is residential and income-based, with service-provider delivery and AHFC measure requirements."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "medium",
        "evidenceText": "Weatherization program provides income-qualified weatherization services rather than a published customer rebate formula.",
        "sourceUrlsChecked": [
          "http://www.ahfc.us/efficiency/energy-programs/weatherization/"
        ],
        "reasoningNotes": "No-cost service delivery and eligibility-based assistance should not be converted to a fixed upfront grant amount without a source formula.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3682",
    "opportunityName": "Entergy Arkansas - Commercial and Industrial Energy Efficiency Programs",
    "state": "AR",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3682/entergy-arkansas-commercial-and-industrial-energy-efficiency-programs",
    "websiteUrl": "https://www.entergyarkansas.com/energyefficiency/business",
    "applicationUrl": null,
    "administrator": "Entergy Arkansas",
    "programType": "Rebate And Technical Assistance",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "engineering_feasibility_study",
        "displayName": "Engineering feasibility study",
        "parentCategory": "audits_studies_planning",
        "isPhysicalRetrofit": false,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "feasibility study"
        ]
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
          "Entergy Arkansas electric service territory"
        ],
        "notes": "Commercial and industrial customers served by Entergy Arkansas."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "industrial_customer",
        "public_sector_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "public"
      ],
      "eligibleRetrofitCategories": [
        "engineering_feasibility_study",
        "commercial_industrial_energy_efficiency_measures",
        "custom_energy_efficiency_project"
      ],
      "hardRequirements": [
        "Applicant must be an eligible Entergy Arkansas business customer.",
        "Project must meet program manual requirements.",
        "Pre-approval is generally required before installation or study reimbursement.",
        "Feasibility studies are for complex measures and must support eligible energy savings."
      ],
      "blockers": [
        "Do not infer residential appliance, home weatherization, or water programs.",
        "Feasibility study support is tied to eligible commercial and industrial efficiency projects.",
        "Separate Entergy program tracks may have distinct eligibility and incentive rules."
      ],
      "programType": "Rebate And Technical Assistance",
      "administrator": "Entergy Arkansas",
      "applicationUrl": null,
      "websiteUrl": "https://www.entergyarkansas.com/energyefficiency/business",
      "sourceUrlsChecked": [
        "https://www.entergyarkansas.com/energyefficiency/business",
        "https://www.entergyarkansas.com/wp-content/uploads/2025/06/CitySmart_Program_Manual.pdf",
        "https://www.entergyarkansas.com/wp-content/uploads/2025/06/Small_Business_Program_Manual.pdf"
      ],
      "evidenceText": "Entergy Arkansas business program manuals define feasibility studies as comprehensive energy savings evaluations for complex commercial or industrial measures.",
      "reasoningNotes": "The engineering feasibility study match is source-backed and should remain limited to business efficiency project planning."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "medium",
        "evidenceText": "Matched term is feasibility study; official business page does not provide a direct upfront equipment rebate formula.",
        "sourceUrlsChecked": [
          "https://www.entergyarkansas.com/energyefficiency/business"
        ],
        "reasoningNotes": "Feasibility studies and audits should not be forced into a one-time savings rule.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3638",
    "opportunityName": "OGE - Commercial Energy Efficiency Rebate Programs",
    "state": "AR",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3638/oge-commercial-energy-efficiency-rebate-programs",
    "websiteUrl": "https://www.oge.com/web/portal/label_ord/energy-solutions/efficiency-programs/commercial-industrial-energy-efficiency",
    "applicationUrl": null,
    "administrator": "OG&E",
    "programType": "Commercial Industrial Efficiency Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
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
          "AR"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "OG&E Arkansas electric service territory"
        ],
        "notes": "The official OG&E business efficiency page also covers Oklahoma; this repair follows the Arkansas target state."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "industrial_customer",
        "small_business_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "small_business"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "hvac_tune_up",
        "smart_thermostat",
        "commercial_refrigeration_equipment",
        "commercial_kitchen_equipment",
        "building_controls"
      ],
      "hardRequirements": [
        "Customer must be in OG&E's eligible business electric service territory.",
        "Measures must meet current OG&E commercial and industrial efficiency program requirements.",
        "Some measures are delivered through midstream, small business, or direct program channels."
      ],
      "blockers": [
        "The matched term fixture refers to lighting fixtures, not plumbing or low-flow water fixtures.",
        "No official source support was found for low_flow_fixture_retrofit or water-conservation measures in this OG&E program.",
        "Do not infer residential appliance or home weatherization eligibility from this commercial and industrial program."
      ],
      "programType": "Commercial Industrial Efficiency Rebate",
      "administrator": "OG&E",
      "applicationUrl": null,
      "websiteUrl": "https://www.oge.com/web/portal/label_ord/energy-solutions/efficiency-programs/commercial-industrial-energy-efficiency",
      "sourceUrlsChecked": [
        "https://www.oge.com/web/portal/label_ord/energy-solutions/efficiency-programs/commercial-industrial-energy-efficiency",
        "https://programs.dsireusa.org/system/program/detail/3638/oge-commercial-energy-efficiency-rebate-programs"
      ],
      "evidenceText": "OG&E describes business efficiency incentives for LED lighting, outdated lighting fixtures, HVAC tune-ups, smart thermostats, refrigeration, kitchen equipment, and building controls. No source-backed water fixture rebate was found.",
      "reasoningNotes": "The original low-flow fixture match is a false positive caused by a generic fixture term in lighting context."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "OG&E commercial source did not expose a water-fixture rebate amount for this target.",
        "sourceUrlsChecked": [
          "https://www.oge.com/wps/portal/ord/energy-solutions/efficiency-programs/commercial-industrial-energy-efficiency/",
          "https://programs.dsireusa.org/system/program/detail/3638"
        ],
        "reasoningNotes": "No source-backed water fixture rule was verified.",
        "originalGapReason": "source_text_unavailable",
        "mapping": {
          "primarySavingsModelId": "water_sewer_reduction",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22774",
    "opportunityName": "Tucson Electric Power - Energy Storage Rewards Program",
    "state": "AZ",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22774/tucson-electric-power-energy-storage-rewards-program",
    "websiteUrl": "https://www.tep.com/energy-storage-rewards/",
    "applicationUrl": null,
    "administrator": "Tucson Electric Power",
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
          "battery storage",
          "energy storage",
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
          "AZ"
        ],
        "counties": [],
        "cities": [
          "Tucson"
        ],
        "utilityTerritories": [
          "Tucson Electric Power"
        ],
        "notes": "Limited to TEP residential electric customers with qualifying grid-connected batteries."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customer",
        "homeowner"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "battery_storage_system",
        "residential_battery_virtual_power_plant",
        "battery_demand_response"
      ],
      "hardRequirements": [
        "Customer must be a TEP residential electric customer with service in their name.",
        "Battery must be grid-connected, qualifying, and compliant with the TEP interconnection agreement.",
        "Account and battery names and addresses must match.",
        "Customer must allow manufacturer signals to charge and discharge the battery.",
        "System must maintain continuous internet connection."
      ],
      "blockers": [
        "Commercial customers are not supported by this residential program.",
        "Non-TEP customers are not eligible.",
        "Unsupported battery manufacturers or non-qualifying systems are not eligible.",
        "This is an ongoing bill-credit rewards program, not a simple purchase rebate."
      ],
      "programType": "Performance Based Incentive",
      "administrator": "Tucson Electric Power",
      "applicationUrl": null,
      "websiteUrl": "https://www.tep.com/energy-storage-rewards/",
      "sourceUrlsChecked": [
        "https://www.tep.com/energy-storage-rewards/"
      ],
      "evidenceText": "TEP's]( Energy Storage Rewards page lists annual rewards for residential customers with qualifying batteries and detailed control, interconnection, account, and internet requirements.",
      "reasoningNotes": "The battery_storage_system match is source-backed, narrowed to residential TEP demand-response/VPP participation."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "medium",
        "evidenceText": "TEP Energy Storage Rewards pays $120 per kW per season for battery dispatch during peak events.",
        "sourceUrlsChecked": [
          "https://www.tep.com/energy-storage-rewards/"
        ],
        "reasoningNotes": "Recurring/performance battery demand-response reward, not an upfront storage rebate.",
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
    "opportunityId": "SOURCE_SCE_BUSINESS:sce_source_section:56574423e5e2b946:agricultural-and-pumping-interruptible-ap-i-program",
    "opportunityName": "Agricultural and Pumping Interruptible (AP-I) Program",
    "state": "CA",
    "sourceName": "Southern California Edison Business Programs",
    "sourceUrl": "https://www.sce.com/business/save-costs-energy/savings-strategies/what-is-demand-response",
    "websiteUrl": "https://www.sce.com/business/save-costs-energy/savings-strategies/what-is-demand-response",
    "applicationUrl": "https://cloud.sce.com/demand_response_api",
    "administrator": "Southern California Edison",
    "programType": "Demand Response / Bill Credit Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
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
          "Southern California Edison electric service territory"
        ],
        "notes": "Applies to eligible SCE agricultural and pumping customers on qualifying agricultural and pumping rate schedules."
      },
      "eligibleApplicantTypes": [
        "Southern California Edison agricultural customers",
        "Southern California Edison pumping customers",
        "customers on eligible agricultural and pumping rate schedules",
        "business customers with qualifying pumping load"
      ],
      "eligibleSectors": [
        "agriculture",
        "water_pumping",
        "commercial",
        "industrial"
      ],
      "eligibleRetrofitCategories": [
        "demand_response_interruptible_pumping_load",
        "load_control_device_for_pumping_equipment"
      ],
      "hardRequirements": [
        "Customer must be served by SCE on an eligible agricultural and pumping rate schedule.",
        "Customer must allow SCE to temporarily interrupt pumping equipment during AP-I demand response events in exchange for monthly bill credits.",
        "SCE installs or uses a load-control device near the meter or pumping equipment to turn off load during events.",
        "Eligibility includes demand or connected-load thresholds stated by SCE, including at least 37 kW demand or at least 50 horsepower connected load in the checked SCE materials.",
        "Certain agricultural or pumping rate options are excluded, including SCE options identified in the AP-I materials."
      ],
      "blockers": [
        "This is a demand response bill-credit program, not an upfront rebate for lighting, HVAC, pumps or motors.",
        "The program does not fund LED lighting or other physical retrofits merely because it reduces electric usage.",
        "Savings depend on enrolled pumping load, event participation, tariff terms and bill credits rather than a deterministic equipment rebate.",
        "Do not match to residential or general commercial retrofit categories."
      ],
      "programType": "Demand Response / Bill Credit Program",
      "administrator": "Southern California Edison",
      "applicationUrl": "https://cloud.sce.com/demand_response_api",
      "websiteUrl": "https://www.sce.com/business/save-costs-energy/savings-strategies/what-is-demand-response",
      "sourceUrlsChecked": [
        "https://www.sce.com/business/save-costs-energy/savings-strategies/what-is-demand-response",
        "https://www.sce.com/customer-service-center/help-center/rebate-savings/business-savings/agricultural-pumping-interruptible-program",
        "https://www.sce.com/sites/default/files/custom-files/PDF_Files/AP-I_Fact_Sheet_0601_WCAG.pdf",
        "https://scedrweb.openadr.com/dr.website/scepr-event-status.jsf",
        "https://cloud.sce.com/demand_response_api"
      ],
      "evidenceText": "SCE's AP-I materials describe monthly bill credits for agricultural and pumping customers who allow temporary interruption of pumping equipment during peak demand. SCE states a control device turns off load during events, and eligibility is tied to agricultural and pumping rate schedules and load thresholds.",
      "reasoningNotes": "The record is active but not a retrofit rebate. It should be matched only to demand-response or interruptible pumping-load enrollment, not to physical efficiency measures."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "high",
        "evidenceText": "SCE AP-I is an interruptible or demand response program for agricultural and pumping load.",
        "sourceUrlsChecked": [
          "https://www.sce.com/business/save-costs-energy/savings-strategies/what-is-demand-response"
        ],
        "reasoningNotes": "Interruptible load and demand-response payments are not upfront one-time rebates.",
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
    "opportunityId": "SOURCE_SCE_BUSINESS:sce_source_section:d049d8b8e95077d7:ca-clean-fuel-reward",
    "opportunityName": "CA Clean Fuel Reward",
    "state": "CA",
    "sourceName": "Southern California Edison Business Programs",
    "sourceUrl": "https://www.sce.com/business/smart-energy-solar/evs-for-business",
    "websiteUrl": "https://cleanfuelreward.com/site/home",
    "applicationUrl": "https://cleanfuelreward.com/site/home",
    "administrator": "California Air Resources Board and program administrator",
    "programType": "Point Of Sale Vehicle Rebate",
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
          "ev charging"
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
        "notes": "California statewide point-of-sale reward; not limited to Southern California Edison territory."
      },
      "eligibleApplicantTypes": [
        "commercial_vehicle_buyers",
        "commercial_vehicle_lessees",
        "businesses",
        "nonprofits",
        "public_agencies",
        "government_agencies"
      ],
      "eligibleSectors": [
        "transportation",
        "commercial",
        "nonprofit",
        "public_sector"
      ],
      "eligibleRetrofitCategories": [
        "commercial_battery_electric_vehicle_purchase"
      ],
      "hardRequirements": [
        "Vehicle must be a new eligible battery-electric commercial vehicle purchased or leased through a participating retailer.",
        "Eligible vehicles are medium- and heavy-duty Class 2b through Class 8 commercial vehicles.",
        "The reward is applied at the point of sale or lease.",
        "Class 2b eligibility is limited under program rules for public fleets subject to applicable state fleet requirements."
      ],
      "blockers": [
        "Does not fund EV charger installation or charging infrastructure.",
        "Pre-owned vehicles, hybrids, fuel-cell vehicles, buses, motorcycles, off-road vehicles, and ePTOs are excluded unless program rules change.",
        "Not funded by SCE ratepayers and not an SCE infrastructure rebate."
      ],
      "programType": "Point Of Sale Vehicle Rebate",
      "administrator": "California Air Resources Board and program administrator",
      "applicationUrl": "https://cleanfuelreward.com/site/home",
      "websiteUrl": "https://cleanfuelreward.com/site/home",
      "sourceUrlsChecked": [
        "https://cleanfuelreward.com/site/home",
        "https://cleanfuelreward.com/site/program-details",
        "https://cleanfuelreward.com/site/vehicles",
        "https://cleanfuelreward.com/pdf/PROGRAM-GUIDE.pdf"
      ],
      "evidenceText": "The current Clean Fuel Reward provides point-of-sale rewards for eligible new battery-electric Class 2b through Class 8 commercial vehicles.",
      "reasoningNotes": "The original EV charging match is a false positive. The current program is for eligible commercial battery-electric vehicle purchase or lease, not charger installation."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "unavailable",
        "confidence": "medium",
        "evidenceText": "California Clean Fuel Reward was a vehicle point-of-sale reward and no current SCE business upfront charger formula was found.",
        "sourceUrlsChecked": [
          "https://www.sce.com/business/smart-energy-solar/evs-for-business"
        ],
        "reasoningNotes": "Not a current one-time business retrofit rebate for the savings engine.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1455",
    "opportunityName": "California Energy Design Assistance (CEDA)",
    "state": "CA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1455/california-energy-design-assistance-ceda",
    "websiteUrl": "https://californiaeda.com/",
    "applicationUrl": "https://ceda.expresseda.com/",
    "administrator": "Pacific Gas and Electric with California investor-owned utility partners and Willdan",
    "programType": "Technical Assistance And Incentive Program",
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
          "CA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Pacific Gas and Electric",
          "Southern California Edison",
          "Southern California Gas",
          "San Diego Gas & Electric"
        ],
        "notes": "Project must be in an eligible California investor-owned utility service territory and pay the Public Purpose Program surcharge."
      },
      "eligibleApplicantTypes": [
        "commercial_project_owner",
        "public_project_owner",
        "industrial_project_owner",
        "agricultural_project_owner",
        "high_rise_multifamily_project_owner",
        "design_team"
      ],
      "eligibleSectors": [
        "commercial",
        "public",
        "industrial",
        "agricultural",
        "high_rise_multifamily_4_plus_stories",
        "new_construction",
        "major_alteration"
      ],
      "eligibleRetrofitCategories": [
        "whole_building_energy_efficiency_design_assistance",
        "new_construction_decarbonization",
        "major_alteration_decarbonization",
        "heat_pump_hvac_retrofit",
        "mechanical_system_efficiency_design",
        "lighting_system_efficiency_design",
        "building_envelope_efficiency_design"
      ],
      "hardRequirements": [
        "Project must be qualifying new construction or qualifying major alteration.",
        "Project must be in PG&E, SCE, SoCalGas, or SDG&E service territory.",
        "Customer must pay the Public Purpose Program surcharge.",
        "Project team must be committed to energy efficiency and decarbonization analysis.",
        "Measures may not receive duplicate incentives for the same equipment from another utility program.",
        "Program participation and incentives depend on CEDA eligibility review."
      ],
      "blockers": [
        "Do not match standalone LED lighting retrofits.",
        "Do not match routine existing-building retrofit projects that are not qualifying major alterations.",
        "Do not match low-rise residential projects.",
        "Do not generalize design assistance into a rebate for installed lighting, HVAC, or envelope measures without qualifying CEDA scope."
      ],
      "programType": "Technical Assistance And Incentive Program",
      "administrator": "Pacific Gas and Electric with California investor-owned utility partners and Willdan",
      "applicationUrl": "https://ceda.expresseda.com/",
      "websiteUrl": "https://californiaeda.com/",
      "sourceUrlsChecked": [
        "https://programs.dsireusa.org/system/program/detail/1455/california-energy-design-assistance-ceda",
        "https://energyassistance.willdan.com/CEDA",
        "https://californiaeda.com/",
        "https://californiaeda.com/eligibility/"
      ],
      "evidenceText": "CEDA supports eligible California new construction and major alteration projects with energy-design assistance and incentives for whole-building decarbonization, including mechanical, lighting, envelope, and heat-pump analysis.",
      "reasoningNotes": "The LED retrofit match is too broad and product-specific. CEDA is design assistance and possible incentives for qualifying new construction or major alterations."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "medium",
        "evidenceText": "CEDA provides design assistance and energy analysis for new construction or major renovation, not a direct published equipment rebate formula.",
        "sourceUrlsChecked": [
          "https://californiaeda.com/",
          "https://energyassistance.willdan.com/CEDA"
        ],
        "reasoningNotes": "Design-assistance services should not be modeled as upfront one-time savings.",
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
    "opportunityId": "SOURCE_SCE_BUSINESS:sce_source_section:11acbe9699c17ca1:capacity-bidding-program-elect-cbp-e",
    "opportunityName": "Capacity Bidding Program Elect (CBP-E)",
    "state": "CA",
    "sourceName": "Southern California Edison Business Programs",
    "sourceUrl": "https://www.sce.com/business/save-costs-energy/savings-strategies-for-businesses/what-is-demand-response/capacity-bidding-program-elect-aggregators",
    "websiteUrl": "https://www.sce.com/business/save-costs-energy/savings-strategies-for-businesses/what-is-demand-response/capacity-bidding-program-elect-aggregators",
    "applicationUrl": "https://www.sce.com/sites/default/files/custom-files/PDF_Files/ELECTRIC_SCHEDULES_CBP-E.pdf",
    "administrator": "Southern California Edison",
    "programType": "Demand Response",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
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
        "notes": "Applies within SCE electric service territory subject to tariff and enrollment restrictions."
      },
      "eligibleApplicantTypes": [
        "business_customers",
        "agricultural_service_customers",
        "aggregators",
        "self_aggregators"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "agricultural"
      ],
      "eligibleRetrofitCategories": [
        "demand_response_participation"
      ],
      "hardRequirements": [
        "Customer must enroll through a CBP-E aggregator or qualify to self-aggregate.",
        "Eligible accounts must meet tariff requirements, including applicable service classifications and metering.",
        "Participants must nominate capacity and reduce load during called demand response events.",
        "Certain rates, programs, and service arrangements are excluded by the tariff."
      ],
      "blockers": [
        "Does not fund automated demand response controls or other physical equipment.",
        "Automated controls may help operations but are not the program benefit being offered.",
        "Do not match as a retrofit installation incentive."
      ],
      "programType": "Demand Response",
      "administrator": "Southern California Edison",
      "applicationUrl": "https://www.sce.com/sites/default/files/custom-files/PDF_Files/ELECTRIC_SCHEDULES_CBP-E.pdf",
      "websiteUrl": "https://www.sce.com/business/save-costs-energy/savings-strategies-for-businesses/what-is-demand-response/capacity-bidding-program-elect-aggregators",
      "sourceUrlsChecked": [
        "https://www.sce.com/business/save-costs-energy/savings-strategies-for-businesses/what-is-demand-response/capacity-bidding-program-elect-aggregators",
        "https://www.sce.com/sites/default/files/custom-files/PDF_Files/ELECTRIC_SCHEDULES_CBP-E.pdf"
      ],
      "evidenceText": "SCE describes CBP-E as a demand response program where eligible business customers participate through aggregators or self-aggregation and reduce load during events.",
      "reasoningNotes": "The original automated controls match is a false positive. The correct category is demand response participation, with no physical retrofit funded."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "high",
        "evidenceText": "SCE Capacity Bidding is a demand response program for committed load reductions.",
        "sourceUrlsChecked": [
          "https://www.sce.com/business/save-costs-energy/savings-strategies-for-businesses/what-is-demand-response/capacity-bidding-program-elect-aggregators"
        ],
        "reasoningNotes": "Demand response payments are not upfront one-time incentives.",
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
    "opportunityId": "SOURCE_SDGE_BUSINESS:program_url:sdge_com_node_16456",
    "opportunityName": "Charge with lower pricing",
    "state": "CA",
    "sourceName": "San Diego Gas & Electric Business Programs",
    "sourceUrl": "https://www.sdge.com/business/electric-vehicles/lovelectric",
    "websiteUrl": "https://www.sdge.com/business/electric-vehicles/power-your-drive-for-fleets/ev-hp",
    "applicationUrl": "https://www.sdge.com/business/electric-vehicles/power-your-drive-for-fleets/ev-hp",
    "administrator": "SDG&E",
    "programType": "Rate Plan",
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
          "ev charging"
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
          "San Diego Gas & Electric"
        ],
        "notes": "Available to eligible EV charging customers in SDG&E service territory under the applicable EV rate plan."
      },
      "eligibleApplicantTypes": [
        "eligible_ev_charging_customers",
        "fleet_customers",
        "business_customers"
      ],
      "eligibleSectors": [
        "transportation",
        "commercial"
      ],
      "eligibleRetrofitCategories": [
        "ev_charging_rate_plan"
      ],
      "hardRequirements": [
        "Customer must qualify for SDG&E's EV-HP or applicable EV charging rate.",
        "Rate applies to eligible EV charging load and subscription or pricing requirements.",
        "Eligibility depends on customer equipment, account configuration, and SDG&E rate rules."
      ],
      "blockers": [
        "Does not provide a rebate or incentive for EV charger installation.",
        "Does not pay for vehicle purchase.",
        "Do not match as a physical retrofit; it is an electric rate plan."
      ],
      "programType": "Rate Plan",
      "administrator": "SDG&E",
      "applicationUrl": "https://www.sdge.com/business/electric-vehicles/power-your-drive-for-fleets/ev-hp",
      "websiteUrl": "https://www.sdge.com/business/electric-vehicles/power-your-drive-for-fleets/ev-hp",
      "sourceUrlsChecked": [
        "https://www.sdge.com/business/electric-vehicles/lovelectric",
        "https://www.sdge.com/business/electric-vehicles/power-your-drive-for-fleets/ev-hp",
        "https://www.sdge.com/node/16456"
      ],
      "evidenceText": "SDG&E describes EV-HP as a lower-pricing EV charging rate option for eligible EV charging customers, including fleet charging use cases.",
      "reasoningNotes": "The original EV charger installation match is a false positive. The opportunity should be represented as an EV charging rate plan only."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "high",
        "evidenceText": "SDG&E charge-with-lower-pricing materials are EV rate/pricing guidance, not upfront charger or vehicle rebates.",
        "sourceUrlsChecked": [
          "https://www.sdge.com/node/16456",
          "https://www.sdge.com/residential/lovelectric"
        ],
        "reasoningNotes": "Rates and tariffs are recurring bill mechanisms and should not be modeled as one-time incentives.",
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
    "opportunityId": "SOURCE_SDGE_BUSINESS:program_url:comfortablyca_com",
    "opportunityName": "Comfortably CA",
    "state": "CA",
    "sourceName": "San Diego Gas & Electric Business Programs",
    "sourceUrl": "https://www.sdge.com/business/save-energy-and-money",
    "websiteUrl": "https://www.comfortablyca.com/",
    "applicationUrl": "https://www.comfortablyca.com/",
    "administrator": "SDG&E and CLEAResult for participating California investor-owned utilities",
    "programType": "Rebate",
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
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "high efficiency hvac"
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
          "San Diego Gas & Electric",
          "Pacific Gas and Electric",
          "Southern California Edison",
          "Southern California Gas"
        ],
        "notes": "Comfortably CA is administered for participating California investor-owned utility territories; the supplied record is SDG&E business-program sourced."
      },
      "eligibleApplicantTypes": [
        "hvac_distributor",
        "hvac_contractor",
        "manufacturer",
        "retailer"
      ],
      "eligibleSectors": [
        "commercial",
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_hvac_replacement",
        "commercial_air_cooled_air_conditioner",
        "commercial_heat_pump_air_conditioner",
        "commercial_space_heating_boiler",
        "air_cooled_screw_chiller",
        "residential_heat_pump",
        "high_efficiency_furnace"
      ],
      "hardRequirements": [
        "Incentives are provided through eligible distributors and market actors, not as direct customer rebates.",
        "Equipment must meet Comfortably CA qualifying product and utility documentation requirements.",
        "Program funds are first-come, first-served and may be changed or terminated."
      ],
      "blockers": [
        "No direct customer rebate is offered by Comfortably CA.",
        "Do not match non-HVAC measures such as insulation, windows, lighting, refrigeration, or water heaters.",
        "Only listed qualifying HVAC product types should match."
      ],
      "programType": "Rebate",
      "administrator": "SDG&E and CLEAResult for participating California investor-owned utilities",
      "applicationUrl": "https://www.comfortablyca.com/",
      "websiteUrl": "https://www.comfortablyca.com/",
      "sourceUrlsChecked": [
        "https://www.comfortablyca.com/",
        "https://www.comfortablyca.com/sdge/contractors/",
        "https://www.comfortablyca.com/sdge/faqs/"
      ],
      "evidenceText": "Comfortably]( CA provides incentives and training for market actors selling qualifying high-efficiency HVAC equipment; its FAQ states there are no direct customer rebates.",
      "reasoningNotes": "The high-efficiency HVAC match is supported, but the applicant and payment path must be modeled as distributor or contractor-facing rather than customer-facing."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "medium",
        "evidenceText": "Comfortably CA provides resources, training, and incentives to distributors, manufacturers and retailers.",
        "sourceUrlsChecked": [
          "https://www.comfortablyca.com/",
          "https://www.sdge.com/business/save-energy-and-money"
        ],
        "reasoningNotes": "This is a market/midstream support program, not a direct upfront customer project rebate rule.",
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
    "opportunityId": "SOURCE_SCE_BUSINESS:sce_source_section:56574423e5e2b946:emergency-load-reduction-program-elrp",
    "opportunityName": "Emergency Load Reduction Program (ELRP)",
    "state": "CA",
    "sourceName": "Southern California Edison Business Programs",
    "sourceUrl": "https://www.sce.com/business/save-costs-energy/savings-strategies/what-is-demand-response",
    "websiteUrl": "https://www.sce.com/business/save-costs-energy/savings-strategies/what-is-demand-response",
    "applicationUrl": "https://elrp.sce.com/",
    "administrator": "Southern California Edison",
    "programType": "Demand Response",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
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
          "demand response",
          "load reduction"
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
        "notes": "Available to eligible SCE non-residential bundled-service customers with qualifying interval metering and load-reduction capability."
      },
      "eligibleApplicantTypes": [
        "non_residential_bundled_service_customer",
        "commercial_electric_customer",
        "industrial_electric_customer",
        "agricultural_electric_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "agricultural"
      ],
      "eligibleRetrofitCategories": [
        "demand_response_enrollment",
        "load_reduction"
      ],
      "hardRequirements": [
        "Customer must be an eligible SCE non-residential bundled-service customer.",
        "Customer must be able to reduce at least the required minimum load during emergency events.",
        "Customer must have SCE-approved interval or SmartConnect metering capable of measuring hourly load or export.",
        "Events occur under program-defined grid emergency or alert conditions.",
        "Payments are based on measured kWh reduction during called events."
      ],
      "blockers": [
        "This is not an automated demand response controls rebate.",
        "Control equipment installation is not required or directly incentivized by the cited ELRP page.",
        "Residential equipment measures are outside this opportunity.",
        "Energy efficiency retrofits are separate from voluntary emergency load reduction participation."
      ],
      "programType": "Demand Response",
      "administrator": "Southern California Edison",
      "applicationUrl": "https://elrp.sce.com/",
      "websiteUrl": "https://www.sce.com/business/save-costs-energy/savings-strategies/what-is-demand-response",
      "sourceUrlsChecked": [
        "https://www.sce.com/business/save-costs-energy/savings-strategies/what-is-demand-response",
        "https://elrp.sce.com/"
      ],
      "evidenceText": "SCE describes ELRP as a voluntary program that pays bill credits for verified load reduction during emergency events, with no penalties for nonperformance.",
      "reasoningNotes": "The source supports demand response enrollment and load reduction, not a physical automated demand response controls retrofit."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "high",
        "evidenceText": "ELRP is a demand-response program that pays for emergency load reductions.",
        "sourceUrlsChecked": [
          "https://www.sce.com/business/save-costs-energy/savings-strategies/what-is-demand-response",
          "https://elrp.sce.com/"
        ],
        "reasoningNotes": "Demand response payments are performance/recurring incentives and should not be modeled as upfront rebates.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "electric_usage_reduction",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      }
    ]
  }
]
