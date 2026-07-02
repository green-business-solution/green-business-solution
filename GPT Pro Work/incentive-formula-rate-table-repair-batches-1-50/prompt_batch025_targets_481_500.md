You are helping RetroFi repair incentive formulas, rate tables, grant estimates, tax credits, and non-cash workflow value rules.

Return strict JSON only. Do not include markdown, code fences, commentary, or citations outside JSON fields.

Batch: 25
Targets in this prompt: 481-500 of 984
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
  "batchNumber": 25,
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
  "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:22377"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:506",
    "opportunityName": "Solar Water Heater Rebate",
    "state": "HI",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/506/solar-water-heater-rebate",
    "websiteUrl": "https://hawaiienergy.com/for-homes/rebates/water-heating/",
    "applicationUrl": null,
    "administrator": "Hawaii Energy",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
    "targetKind": "existing_simple_rule_v2_repair",
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
          "HI"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Hawaii Energy program territory"
        ],
        "notes": "Residential rebates are in Hawaii Energy's covered service territory; customers should verify island and utility eligibility."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "homeowner"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "solar_water_heating_system",
        "solar_water_heater_tune_up"
      ],
      "hardRequirements": [
        "Installation must use a participating Hawaii Energy Clean Energy Ally contractor.",
        "For instant rebates, the contractor deducts the rebate from the invoice and submits the application.",
        "Solar water heater offer cannot be combined with other Hawaii Energy rebates or offers."
      ],
      "blockers": [
        "Do not treat this as a solar PV rebate.",
        "Non-participating contractor installations may not qualify for the instant rebate.",
        "Rebate amount and participation are subject to current Hawaii Energy program rules."
      ],
      "programType": "Rebate Program",
      "administrator": "Hawaii Energy",
      "applicationUrl": null,
      "websiteUrl": "https://hawaiienergy.com/for-homes/rebates/water-heating/",
      "sourceUrlsChecked": [
        "https://hawaiienergy.com/for-homes/rebates/water-heating/",
        "https://www.hawaiienergy.com/for-homes/rebates/water-heating"
      ],
      "evidenceText": "Hawaii]( Energy's water-heating rebate page lists an instant solar water heating rebate and explains contractor-based installation and application steps.",
      "reasoningNotes": "The solar_water_heating_system match is source-backed. Keep it residential and avoid generalizing to unrelated PV or water-heating technologies."
    },
    "existingSimpleRules": [
      {
        "id": "oir_fe185811306429cd_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 275000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "Up to $2,750 instant rebate for a solar water heater",
        "evidenceText": "Hawaii Energy solar water heating page states NEW INCREASE: Up to $2,750 INSTANT REBATE.",
        "sourceUrlsChecked": [
          "https://hawaiienergy.com/for-homes/rebates/solar-water-heating"
        ],
        "reasoningNotes": "Matched solar water heating term. Medium because amount varies by system size and county.",
        "mapping": {
          "primarySavingsModelId": "gas_usage_reduction",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22311",
    "opportunityName": "Indiana Michigan Power - Residential Electric Vehicle Charging Rebate",
    "state": "IN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22311/indiana-michigan-power-residential-electric-vehicle-charging-rebate",
    "websiteUrl": "https://www.indianamichiganpower.com/clean-energy/electric-cars/charge-at-home-indiana",
    "applicationUrl": "https://charge.weavegrid.com/indianamichiganpower/invite/6dabfc58-9b93-435c-811e-50d96df1309d/",
    "administrator": "Indiana Michigan Power",
    "programType": "Bill Credit Managed Charging",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
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
          "Indiana Michigan Power"
        ],
        "notes": "Indiana Michigan Power residential customers in Indiana."
      },
      "eligibleApplicantTypes": [
        "residential_customer"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "ev_managed_charging"
      ],
      "hardRequirements": [
        "Customer must be a residential I&M customer with an EV and Level 2 charger.",
        "Customer may not be enrolled in Net Metering Service Rider or Excess Distributed Generation Rider.",
        "Charging must occur during the designated 11 p.m. to 6 a.m. window or through managed Charge Sync Plus events to earn credits."
      ],
      "blockers": [
        "Remove ev_charger_installation match; current program is a managed/off-peak charging bill-credit program, not a charger purchase or installation rebate.",
        "Only supported EVs or chargers may enroll; customers may be in only one I&M EV program at a time."
      ],
      "programType": "Bill Credit Managed Charging",
      "administrator": "Indiana Michigan Power",
      "applicationUrl": "https://charge.weavegrid.com/indianamichiganpower/invite/6dabfc58-9b93-435c-811e-50d96df1309d/",
      "websiteUrl": "https://www.indianamichiganpower.com/clean-energy/electric-cars/charge-at-home-indiana",
      "sourceUrlsChecked": [
        "https://www.indianamichiganpower.com/clean-energy/electric-cars/charge-at-home-indiana",
        "https://charge.weavegrid.com/indianamichiganpower/invite/6dabfc58-9b93-435c-811e-50d96df1309d/"
      ],
      "evidenceText": "I&M’s current Indiana page offers Charge Sync Rewards bill credits for residential customers with EVs and Level 2 chargers who charge at approved times.",
      "reasoningNotes": "The current official page no longer supports a physical charger-installation rebate match; retained only managed charging as the eligible category."
    },
    "existingSimpleRules": [
      {
        "id": "oir_abaa9c885f749c17_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 50000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "equipment_plus_labor",
          "applicationOrder": 10
        },
        "cap": {
          "maxPercentOfBasis": 1
        },
        "confidence": "medium",
        "formula": "$500 residential EV charging incentive toward wiring a residential EV meter",
        "evidenceText": "Indiana Michigan Power says Hoosiers may receive a $500 incentive toward wiring a residential EV meter.",
        "sourceUrlsChecked": [
          "https://www.indianamichiganpower.com/clean-energy/electric-cars/charge-at-home-indiana",
          "https://www.indianamichiganpower.com/company/news/view?releaseID=7262"
        ],
        "reasoningNotes": "Matched residential EV charging. Confidence is medium because current page emphasizes recurring Charge Sync credits.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22735",
    "opportunityName": "Belmont Light - Battery Storage Rebate Program",
    "state": "MA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22735/belmont-light-battery-storage-rebate-program",
    "websiteUrl": "https://www.belmontlight.com/residential-programs/battery-storage-system-incentive-program/",
    "applicationUrl": "https://www.belmontlight.com/wp-content/uploads/2024/07/Battery-Storage-Rebate-Application-Form-fillable-2024.pdf",
    "administrator": "Belmont Light",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
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
          "MA"
        ],
        "counties": [
          "Middlesex County"
        ],
        "cities": [
          "Belmont"
        ],
        "utilityTerritories": [
          "Belmont Light"
        ],
        "notes": "Available to qualifying Belmont Light residential customers or eligible property owners in Belmont Light service territory."
      },
      "eligibleApplicantTypes": [
        "residential_customers",
        "homeowners",
        "property_owners"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "battery_storage_system"
      ],
      "hardRequirements": [
        "Battery storage system must be installed at a residential address in Belmont Light territory.",
        "Standard Interconnection Application process must be followed.",
        "Application must be submitted within six months of installation.",
        "Approved rebate is applied as a bill credit.",
        "Additional ConnectedHomes incentives require approved interconnection, permission to energize, qualifying battery type, and demand-response enrollment."
      ],
      "blockers": [
        "Commercial battery projects are referenced separately and are not supported by this residential rebate page.",
        "Battery systems outside Belmont Light service territory do not qualify.",
        "Solar PV alone, EV chargers, and non-battery resilience measures should not match this battery rebate.",
        "ConnectedHomes incentive amounts should not be inferred unless the battery is enrolled and meets additional requirements."
      ],
      "programType": "Rebate Program",
      "administrator": "Belmont Light",
      "applicationUrl": "https://www.belmontlight.com/wp-content/uploads/2024/07/Battery-Storage-Rebate-Application-Form-fillable-2024.pdf",
      "websiteUrl": "https://www.belmontlight.com/residential-programs/battery-storage-system-incentive-program/",
      "sourceUrlsChecked": [
        "https://www.belmontlight.com/residential-programs/",
        "https://www.belmontlight.com/residential-programs/battery-storage-system-incentive-program/",
        "https://www.belmontlight.com/wp-content/uploads/2024/07/Battery-Storage-Rebate-Application-Form-fillable-2024.pdf",
        "https://www.belmontlight.com/solar-options/"
      ],
      "evidenceText": "Belmont Light's battery storage page and application support a residential battery storage rebate, with interconnection and six-month application requirements.",
      "reasoningNotes": "The battery storage match is source-backed for residential Belmont Light customers; separate ConnectedHomes incentives should be modeled as additional conditions, not generalized categories."
    },
    "existingSimpleRules": [
      {
        "id": "oir_d350ba71f819be19_v1",
        "incentiveType": "fixed_amount_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_amount",
          "amountCents": 50000
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$500 per account per calendar year for battery storage",
        "evidenceText": "Belmont Light states: Rebate is $500 per account per calendar year, regardless of total system size.",
        "sourceUrlsChecked": [
          "https://www.belmontlight.com/residential-programs/battery-storage-system-incentive-program/"
        ],
        "reasoningNotes": "Use only the upfront battery storage rebate. The ConnectedHomes monthly/annual incentives are recurring demand-response payments and excluded.",
        "mapping": {
          "primarySavingsModelId": "battery_tou_demand_savings",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22734",
    "opportunityName": "Hingham Municipal Lighting Plant Solar Rebate Program",
    "state": "MA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22734/hingham-municipal-lighting-plant-solar-rebate-program",
    "websiteUrl": "https://www.hmlp.com/rebates/solar/",
    "applicationUrl": null,
    "administrator": "Hingham Municipal Lighting Plant",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
    "targetKind": "existing_simple_rule_v2_repair",
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
        "cities": [
          "Hingham"
        ],
        "utilityTerritories": [
          "Hingham Municipal Lighting Plant"
        ],
        "notes": "Installed at an HMLP electric account location in Hingham."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "commercial_customer",
        "business",
        "property_owner"
      ],
      "eligibleSectors": [
        "residential",
        "commercial"
      ],
      "eligibleRetrofitCategories": [
        "solar_photovoltaic"
      ],
      "hardRequirements": [
        "Applicant must be an active HMLP electric customer with an account in good standing.",
        "Photovoltaic system must be installed at the HMLP account location in Hingham.",
        "Customer must install and own the photovoltaic system.",
        "Rebate is based on AC rated output at $0.60 per watt up to 10 kW, with a $6,000 lifetime account cap.",
        "Application must be submitted in the same calendar year or within three months of purchase, under HMLP rebate rules.",
        "HMLP interconnection, metering, and program documentation requirements apply."
      ],
      "blockers": [
        "LED lighting is not eligible under this solar rebate; commercial LED rebates are a separate HMLP program.",
        "Battery storage is not eligible under this solar rebate; HMLP Connected Homes battery demand response is separate.",
        "Federal tax credits are separate from this rebate.",
        "Projects outside HMLP service territory or outside Hingham should not match.",
        "Third-party-owned systems should not match where the customer does not own the photovoltaic system."
      ],
      "programType": "Rebate Program",
      "administrator": "Hingham Municipal Lighting Plant",
      "applicationUrl": null,
      "websiteUrl": "https://www.hmlp.com/rebates/solar/",
      "sourceUrlsChecked": [
        "https://www.hmlp.com/rebates/solar/",
        "https://www.hmlp.com/rebates/",
        "https://www.hmlp.com/solar/residential/",
        "https://www.hmlp.com/solar/commercial/"
      ],
      "evidenceText": "HMLP’s]( solar rebate is for customer-owned photovoltaic systems at homes or businesses in Hingham, paid at $0.60 per AC watt up to 10 kW with a $6,000 lifetime cap.",
      "reasoningNotes": "The supplied LED lighting retrofit match is a false positive. This opportunity should match solar PV only."
    },
    "existingSimpleRules": [
      {
        "id": "oir_d7b0fd1c93d64161_v1",
        "incentiveType": "solar_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "rate_per_kw",
          "amountCentsPerKw": 60000,
          "kwSource": "system_kw"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": {
          "maxAmountCents": 600000
        },
        "confidence": "high",
        "formula": "$0.60 per watt AC for qualifying solar PV, capped at $6,000 lifetime per account",
        "evidenceText": "HMLP solar page says rebate is calculated at $0.60/W rated output AC up to 10 kW.",
        "sourceUrlsChecked": [
          "https://www.hmlp.com/rebates/solar/"
        ],
        "reasoningNotes": "Matched solar PV. $0.60/W equals $600/kW AC; 10 kW AC cap equals $6,000 lifetime per account.",
        "mapping": {
          "primarySavingsModelId": "solar_electric_offset",
          "incentiveValueMethod": "per_kw",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22770",
    "opportunityName": "Leading By Example Restoration Grant for Solar PV & Decarbonized Systems",
    "state": "MA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22770/leading-by-example-restoration-grant-for-solar-pv-and-decarbonized-systems",
    "websiteUrl": "https://www.mass.gov/info-details/leading-by-example-restoration-grant-for-solar-pv-decarbonized-systems",
    "applicationUrl": "https://www.commbuys.com/bso/external/bidDetail.sdo?docId=BD-25-1041-ENE01-ENE01-109288&external=true&parentUrl=bid",
    "administrator": "Massachusetts Department of Energy Resources",
    "programType": "Grant Program",
    "availabilityStatus": "rolling",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "rooftop_solar_pv",
        "displayName": "Rooftop solar PV",
        "parentCategory": "solar_renewable_electricity",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "solar pv"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "rolling",
      "geography": {
        "country": "US",
        "states": [
          "MA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [],
        "notes": "Projects must be at Commonwealth/state facilities in Massachusetts."
      },
      "eligibleApplicantTypes": [
        "massachusetts_state_entity",
        "state_agency",
        "public_higher_education_institution"
      ],
      "eligibleSectors": [
        "government",
        "public_higher_education"
      ],
      "eligibleRetrofitCategories": [
        "solar_pv_system_restoration",
        "decarbonized_heating_system_restoration",
        "solar_thermal_system_restoration",
        "geothermal_system_restoration",
        "air_source_heat_pump_restoration"
      ],
      "hardRequirements": [
        "Applicant must be an eligible Massachusetts state entity.",
        "Project must restore, repair, or replace existing state-owned solar PV or decarbonized systems at state facilities.",
        "Applications are accepted on a rolling basis until June 30, 2027, or until funding is exhausted.",
        "Per-site grants are capped by the program opportunity notice."
      ],
      "blockers": [
        "Not for private, residential, municipal, or commercial applicants.",
        "New solar deployment belongs to the separate LBE Solar-Decarbonization Grant Program unless the project restores an existing system.",
        "Do not generalize to generic rooftop solar where the source only supports existing system restoration."
      ],
      "programType": "Grant Program",
      "administrator": "Massachusetts Department of Energy Resources",
      "applicationUrl": "https://www.commbuys.com/bso/external/bidDetail.sdo?docId=BD-25-1041-ENE01-ENE01-109288&external=true&parentUrl=bid",
      "websiteUrl": "https://www.mass.gov/info-details/leading-by-example-restoration-grant-for-solar-pv-decarbonized-systems",
      "sourceUrlsChecked": [
        "https://www.mass.gov/info-details/leading-by-example-restoration-grant-for-solar-pv-decarbonized-systems",
        "https://www.mass.gov/leading-by-example-grants",
        "https://www.commbuys.com/bso/external/bidDetail.sdo?docId=BD-25-1041-ENE01-ENE01-109288&external=true&parentUrl=bid"
      ],
      "evidenceText": "COMMBUYS lists the LBE Restoration Grant Program for Solar and Decarbonized Systems as an open DOER grant opportunity with a June 30, 2027 bid opening date.",
      "reasoningNotes": "Solar PV is supported, but the opportunity is narrower than generic rooftop solar: it funds restoration of existing state-owned solar PV and decarbonized systems."
    },
    "existingSimpleRules": [
      {
        "id": "oir_a82d3db9fa2d22a4_v1",
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
        "cap": null,
        "confidence": "high",
        "formula": "100% of eligible project cost",
        "evidenceText": "PON Response Deadline June 30, 2027 Additional Information Projects must comply with all program requirements detailed in the program opportunity notice (PON) on COMMBUYS Eligible Costs by Project Category Grant requests may cover up to 100% of eligible project costs",
        "sourceUrlsChecked": [
          "https://www.mass.gov/info-details/leading-by-example-restoration-grant-for-solar-pv-decarbonized-systems"
        ],
        "reasoningNotes": "",
        "mapping": {
          "primarySavingsModelId": "grant_funding",
          "incentiveValueMethod": "grant_amount",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null,
          "businessRelevance": "public_nonprofit_only",
          "v1Readiness": "not_v1_relevant"
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22185",
    "opportunityName": "MassEVIP Fleets Charging Program",
    "state": "MA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22185/massevip-fleets-charging-program",
    "websiteUrl": "https://www.mass.gov/how-to/apply-for-massevip-workplace-fleet-charging-incentives",
    "applicationUrl": "https://www.mass.gov/forms/massevip-workplace-and-fleet-wpf-charging-program-application",
    "administrator": "Massachusetts Department of Environmental Protection",
    "programType": "Grant Program",
    "availabilityStatus": "rolling",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 1,
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
      }
    ],
    "repairedOpportunityData": {
      "confidence": "medium",
      "availabilityStatus": "rolling",
      "geography": {
        "country": "US",
        "states": [
          "MA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [],
        "notes": "Massachusetts program for eligible workplace and fleet charging sites."
      },
      "eligibleApplicantTypes": [
        "business_owner",
        "fleet_operator",
        "nonprofit",
        "public_agency",
        "educational_institution",
        "multiunit_dwelling_owner"
      ],
      "eligibleSectors": [
        "commercial",
        "public",
        "nonprofit",
        "institutional",
        "multifamily"
      ],
      "eligibleRetrofitCategories": [
        "level_1_ev_charger",
        "level_2_ev_charger",
        "ev_charger_installation"
      ],
      "hardRequirements": [
        "Applicant and site must meet MassEVIP Workplace and Fleet Charging Program eligibility requirements.",
        "Incentives are for eligible Level 1 or Level 2 workplace and fleet charging equipment and installation costs.",
        "Application must be submitted through the MassEVIP program process before relying on funding."
      ],
      "blockers": [
        "Do not match to DC fast-charging unless a separate MassEVIP offer explicitly supports it.",
        "Do not match to residential single-family chargers or vehicle purchases.",
        "Do not treat this as a general building energy efficiency rebate."
      ],
      "programType": "Grant Program",
      "administrator": "Massachusetts Department of Environmental Protection",
      "applicationUrl": "https://www.mass.gov/forms/massevip-workplace-and-fleet-wpf-charging-program-application",
      "websiteUrl": "https://www.mass.gov/how-to/apply-for-massevip-workplace-fleet-charging-incentives",
      "sourceUrlsChecked": [
        "https://www.mass.gov/how-to/apply-for-massevip-workplace-fleet-charging-incentives",
        "https://www.mass.gov/forms/massevip-workplace-and-fleet-wpf-charging-program-application"
      ],
      "evidenceText": "MassEVIP]( Workplace and Fleet materials describe incentives and an application process for eligible Massachusetts workplace and fleet Level 1 and Level 2 charging projects.",
      "reasoningNotes": "Official pages were difficult to access directly, but official Mass.gov application and program references support the EV charging match. Confidence is medium rather than high due limited readable source detail."
    },
    "existingSimpleRules": [
      {
        "id": "oir_99b253d855edf999_v1",
        "incentiveType": "percent_of_basis_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "percent_of_basis",
          "percent": 0.6
        },
        "basisPolicy": {
          "basis": "eligible_cost_categories",
          "applicationOrder": 10
        },
        "cap": {
          "maxAmountCents": 5000000,
          "maxPercentOfBasis": 0.6
        },
        "confidence": "high",
        "formula": "60% of Level 1 or Level 2 EVSE hardware and installation costs, capped at $50,000 per street address",
        "evidenceText": "MassEVIP Workplace & Fleet Charging page says MassDEP provides up to 60% to $50,000 per street address.",
        "sourceUrlsChecked": [
          "https://www.mass.gov/how-to/apply-for-massevip-workplace-fleet-charging-incentives",
          "https://www.mass.gov/how-to/apply-for-massevip-fleets-incentives"
        ],
        "reasoningNotes": "Matched fleet charging. Use eligible hardware and installation cost basis for Level 1 or Level 2 AC chargers.",
        "mapping": {
          "primarySavingsModelId": "grant_funding",
          "incentiveValueMethod": "grant_amount",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4605",
    "opportunityName": "Reading Municipal Light Department - Residential and Small Commercial Solar Rebate Program",
    "state": "MA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4605/reading-municipal-light-department-residential-and-small-commercial-solar-rebate-program",
    "websiteUrl": "https://www.rmld.com/189/Residential-Small-Commercial-Solar-Rebat",
    "applicationUrl": null,
    "administrator": "Reading Municipal Light Department",
    "programType": "Residential Small Commercial Solar PV Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
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
        "cities": [
          "Reading",
          "North Reading",
          "Wilmington",
          "Lynnfield Center"
        ],
        "utilityTerritories": [
          "Reading Municipal Light Department service territory"
        ],
        "notes": "RMLD serves Reading, North Reading, Wilmington, and Lynnfield Center."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "small_commercial_customer",
        "customer_of_record"
      ],
      "eligibleSectors": [
        "residential",
        "small_commercial"
      ],
      "eligibleRetrofitCategories": [
        "solar_pv_system"
      ],
      "hardRequirements": [
        "System must be grid-connected solar installed at a qualifying RMLD customer home or business.",
        "Residential and small commercial rebate is limited to systems up to 20 kW DC.",
        "Interconnection approval is required before installation.",
        "Application must be submitted within 180 days of final wiring inspection.",
        "Customer must assign 100 percent of renewable energy credits to RMLD."
      ],
      "blockers": [
        "Third-party owned systems and systems installed for resale are not eligible.",
        "Systems over 20 kW fall under a separate commercial solar rebate pathway.",
        "Do not match solar thermal or non-PV renewable systems."
      ],
      "programType": "Residential Small Commercial Solar PV Rebate",
      "administrator": "Reading Municipal Light Department",
      "applicationUrl": null,
      "websiteUrl": "https://www.rmld.com/189/Residential-Small-Commercial-Solar-Rebat",
      "sourceUrlsChecked": [
        "https://www.rmld.com/189/Residential-Small-Commercial-Solar-Rebat",
        "https://www.rmld.com/194/Commercial-Solar-Rebate-20-kW",
        "https://www.rmld.com/158/Mission-History-Supply",
        "https://programs.dsireusa.org/system/program/detail/4605/reading-municipal-light-department-residential-and-small-commercial-solar-rebate-program"
      ],
      "evidenceText": "RMLD offers residential and small commercial customers rebates for grid-connected solar PV systems up to 20 kW DC, with interconnection approval and application timing requirements.",
      "reasoningNotes": "The photovoltaic match is supported. Use a general solar PV category rather than requiring rooftop installation."
    },
    "existingSimpleRules": [
      {
        "id": "oir_14e53de9fcfa42fb_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "rate_per_kw",
          "amountCentsPerKw": 120000,
          "kwSource": "system_kw"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$1,200 per kW",
        "evidenceText": "Incentive Amount: $1,200 per kilowatt (DC) Maximum Incentive: Not to exceed 50% of total installed (labor and materials) costs, excluding tax, up to $24,000",
        "sourceUrlsChecked": [
          "https://www.rmld.com/efficiency-electrification-programs/renewable-generation"
        ],
        "reasoningNotes": "",
        "mapping": {
          "primarySavingsModelId": "solar_electric_offset",
          "incentiveValueMethod": "per_kw",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22733",
    "opportunityName": "Ride Clean Mass",
    "state": "MA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22733/ride-clean-mass",
    "websiteUrl": "https://www.ridecleanmass.org/",
    "applicationUrl": "https://ridecleanmass.formtitan.com/",
    "administrator": "CALSTART",
    "programType": "Vehicle Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
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
        "utilityTerritories": [],
        "notes": "Statewide Massachusetts program for eligible high-mileage for-hire drivers and fleets; funding is contingent on availability."
      },
      "eligibleApplicantTypes": [
        "uber_driver",
        "lyft_driver",
        "taxi_driver",
        "livery_driver",
        "for_hire_fleet"
      ],
      "eligibleSectors": [
        "transportation",
        "commercial_fleet"
      ],
      "eligibleRetrofitCategories": [
        "electric_vehicle_purchase_or_lease",
        "electric_vehicle_rental"
      ],
      "hardRequirements": [
        "Applicant must be an eligible Uber, Lyft, taxi, or livery driver or business in Massachusetts.",
        "Vehicle purchase must be on or after November 12, 2024 for listed purchase pathways.",
        "Applicant must submit the required incentive application and documents.",
        "Rideshare drivers must meet passenger-trip or mileage thresholds for qualifying Massachusetts trips.",
        "Taxi and livery applicants must provide proof of license, medallion, or livery business as applicable.",
        "Funding is contingent on availability."
      ],
      "blockers": [
        "Do not match EV charger installation; charging infrastructure links on the site point to other funding sources.",
        "Do not match general residents who are not eligible high-mileage drivers or fleets.",
        "Do not match gasoline hybrids or non-electric vehicles.",
        "Do not treat MOR-EV, utility charger rebates, or federal charger tax credits as part of this Ride Clean Mass record."
      ],
      "programType": "Vehicle Rebate Program",
      "administrator": "CALSTART",
      "applicationUrl": "https://ridecleanmass.formtitan.com/",
      "websiteUrl": "https://www.ridecleanmass.org/",
      "sourceUrlsChecked": [
        "https://www.ridecleanmass.org/",
        "https://ridecleanmass.org/funding/",
        "https://calstart.org/ride-clean-mass-program-for-ev-ride-share-drivers/"
      ],
      "evidenceText": "Ride]( Clean Mass provides EV purchase and rental rebates for Uber, Lyft, taxi and livery drivers across Massachusetts; its funding page treats charging infrastructure as separate outside funding.",
      "reasoningNotes": "The EV charger installation match is a false positive; this opportunity is a vehicle purchase, lease, or rental incentive."
    },
    "existingSimpleRules": [
      {
        "id": "oir_0582771d608332b1_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 1400000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$14,000 per new EV for Uber or Lyft drivers",
        "evidenceText": "Ride Clean Mass lists Uber and Lyft new EV rebates at $14,000.",
        "sourceUrlsChecked": [
          "https://ridecleanmass.org/",
          "https://ridecleanmass.org/funding/"
        ],
        "reasoningNotes": "Matched EV fleet fuel replacement. Use one unit as one eligible vehicle.",
        "mapping": {
          "primarySavingsModelId": "fleet_fuel_replacement",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_1efa96092914537a_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 650000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$6,500 per used EV for Uber or Lyft drivers",
        "evidenceText": "Ride Clean Mass lists Uber and Lyft used EV rebates at $6,500.",
        "sourceUrlsChecked": [
          "https://ridecleanmass.org/",
          "https://ridecleanmass.org/funding/"
        ],
        "reasoningNotes": "Returned separately because used ride-hail vehicles have a distinct amount.",
        "mapping": {
          "primarySavingsModelId": "fleet_fuel_replacement",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_3cc1eba3e1fc1878_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 1250000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$12,500 per used EV for taxi or livery businesses",
        "evidenceText": "Ride Clean Mass lists taxi and livery used EV rebates at $12,500.",
        "sourceUrlsChecked": [
          "https://ridecleanmass.org/",
          "https://ridecleanmass.org/funding/"
        ],
        "reasoningNotes": "Returned separately because used taxi/livery vehicles have a distinct amount.",
        "mapping": {
          "primarySavingsModelId": "fleet_fuel_replacement",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_fae421d14dbd2e0f_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 1750000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$17,500 per new EV for taxi or livery businesses",
        "evidenceText": "Ride Clean Mass lists taxi and livery new EV rebates at $17,500.",
        "sourceUrlsChecked": [
          "https://ridecleanmass.org/",
          "https://ridecleanmass.org/funding/"
        ],
        "reasoningNotes": "Returned separately because taxis and livery businesses receive a higher new-vehicle amount.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22494",
    "opportunityName": "Wakefield Municipal Gas & Light Department - Solar Rebate Program",
    "state": "MA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22494/wakefield-municipal-gas-and-light-department-solar-rebate-program",
    "websiteUrl": "https://wmgld.com/residential/solar-rebate-form/",
    "applicationUrl": "https://nextzero.org/wakefield/solar-rebates/",
    "administrator": "Wakefield Municipal Gas & Light Department",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "window_film_shading_retrofit",
        "displayName": "Window film / shading retrofit",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "shading"
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
          "Middlesex County"
        ],
        "cities": [
          "Wakefield"
        ],
        "utilityTerritories": [
          "Wakefield Municipal Gas & Light Department"
        ],
        "notes": "Limited to eligible WMGLD customers in good standing."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "commercial_customer",
        "municipal_customer",
        "multifamily_customer",
        "industrial_customer"
      ],
      "eligibleSectors": [
        "residential",
        "commercial",
        "municipal",
        "multifamily",
        "industrial"
      ],
      "eligibleRetrofitCategories": [
        "solar_photovoltaic_system"
      ],
      "hardRequirements": [
        "Applicant must be a WMGLD customer in good standing.",
        "Project must be customer-owned.",
        "Rebate is limited by installed system size, installed cost, and annual program funding.",
        "Solar access or shading requirements must be met.",
        "Projects should not begin until program approval is received."
      ],
      "blockers": [
        "The word shading refers to solar access or shade analysis, not window film or window shading.",
        "Do not match window film, window treatment, or building-envelope shading retrofit.",
        "Do not match battery storage unless a separate WMGLD program supports it."
      ],
      "programType": "Rebate Program",
      "administrator": "Wakefield Municipal Gas & Light Department",
      "applicationUrl": "https://nextzero.org/wakefield/solar-rebates/",
      "websiteUrl": "https://wmgld.com/residential/solar-rebate-form/",
      "sourceUrlsChecked": [
        "https://wmgld.com/residential/solar-rebate-form/",
        "https://nextzero.org/wakefield/solar-rebates/"
      ],
      "evidenceText": "WMGLD and NextZero describe a solar rebate for customer-owned photovoltaic systems with caps, funding limits, and shade or solar-access requirements.",
      "reasoningNotes": "The original window-film/shading match is a false positive. The opportunity is for solar photovoltaic systems; shading is an eligibility constraint for solar production."
    },
    "existingSimpleRules": [
      {
        "id": "oir_cc661f2db4286cc9_v1",
        "incentiveType": "solar_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "rate_per_kw",
          "amountCentsPerKw": 80000,
          "kwSource": "system_kw"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": {
          "maxAmountCents": 800000
        },
        "confidence": "high",
        "formula": "$0.80 per watt for approved solar projects, capped by residential 10 kW eligibility",
        "evidenceText": "WMGLD says approved solar projects receive one-time rebates up to $0.80 per watt.",
        "sourceUrlsChecked": [
          "https://wmgld.com/residential/solar-rebate-form/"
        ],
        "reasoningNotes": "Target source is the residential solar rebate form. At $0.80/W, the stated residential 10 kW cap implies an $8,000 maximum rebate.",
        "mapping": {
          "primarySavingsModelId": "solar_electric_offset",
          "incentiveValueMethod": "per_kw",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22181",
    "opportunityName": "Electric Vehicle Rebate Program",
    "state": "ME",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22181/electric-vehicle-rebate-program",
    "websiteUrl": "https://www.efficiencymaine.com/em-electric-vehicle-incentives/",
    "applicationUrl": null,
    "administrator": "Efficiency Maine",
    "programType": "EV And Charger Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
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
        "utilityTerritories": [],
        "notes": "Statewide Maine incentives for qualifying applicants; charger incentives require Maine shipment or installation."
      },
      "eligibleApplicantTypes": [
        "income_qualified_individual",
        "business",
        "nonprofit",
        "governmental_entity"
      ],
      "eligibleSectors": [
        "residential",
        "commercial",
        "nonprofit",
        "government",
        "fleet"
      ],
      "eligibleRetrofitCategories": [
        "off_peak_level_2_ev_charger"
      ],
      "hardRequirements": [
        "Vehicle rebates require eligible all-electric vehicle purchase; leases, plug-in hybrids, and conventional hybrids are excluded for the current limited-time offers.",
        "Low- and moderate-income applicants must complete income verification before purchase.",
        "Business and nonprofit applicants must meet Maine good-standing and vehicle-use requirements.",
        "Off-peak charger must be purchased before the qualifying EV rebate where required, then installed at the parking location and connected to the internet within the required timeline.",
        "Off-peak charger-only incentives require the charger to be shipped to or installed in Maine and configured through the required app.",
        "Maine registration and ownership retention requirements apply to vehicle rebates."
      ],
      "blockers": [
        "Do not match generic EV charger installation; only qualifying off-peak Level 2 chargers are supported.",
        "Charger-only claims should be treated under the separate off-peak charger incentive boundary.",
        "Plug-in hybrids, hybrids, leased vehicles, and non-Maine installations are not supported by the current limited-time EV rebate terms.",
        "Applicants without a viable charger installation and internet connection location may be ineligible.",
        "Program funds and bonus amounts are subject to deadlines and funding availability."
      ],
      "programType": "EV And Charger Rebate Program",
      "administrator": "Efficiency Maine",
      "applicationUrl": null,
      "websiteUrl": "https://www.efficiencymaine.com/em-electric-vehicle-incentives/",
      "sourceUrlsChecked": [
        "https://www.efficiencymaine.com/em-electric-vehicle-incentives/",
        "https://www.efficiencymaine.com/electric-vehicle-incentives-for-low-and-moderate-income/",
        "https://www.efficiencymaine.com/electric-vehicle-incentives-for-businesses-and-organizations/",
        "https://www.efficiencymaine.com/category/ev-announcements/",
        "https://www.efficiencymaine.com/off-peak-charger-incentives/"
      ],
      "evidenceText": "Efficiency]( Maine offers EV rebates paired with required off-peak Level 2 chargers and a separate $400 off-peak charger incentive; vehicles must be all-electric and chargers installed in Maine.",
      "reasoningNotes": "Keep only the narrow charger category supported by official sources: off-peak Level 2 chargers. Do not generalize to all EV charger installations."
    },
    "existingSimpleRules": [
      {
        "id": "oir_44c3a830ff3f2261_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 1400000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "$14,000 per eligible commercial electric van over 100 kWh when paired with off-peak charging",
        "evidenceText": "Efficiency Maine lists commercial electric van rebates at $12,000-$14,000 depending on battery capacity.",
        "sourceUrlsChecked": [
          "https://www.efficiencymaine.com/electric-vehicle-incentives-for-businesses-and-organizations/",
          "https://afdc.energy.gov/laws/all?state=ME"
        ],
        "reasoningNotes": "Returned highest published commercial electric van tier. Eligibility requires pairing with off-peak charging.",
        "mapping": {
          "primarySavingsModelId": "fleet_fuel_replacement",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_71bd8e722012f561_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 300000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$3,000 per used eligible EV for businesses and nonprofits",
        "evidenceText": "Efficiency Maine lists business and nonprofit used EV rebates at $3,000, including the temporary bonus.",
        "sourceUrlsChecked": [
          "https://www.efficiencymaine.com/electric-vehicle-incentives-for-businesses-and-organizations/",
          "https://www.efficiencymaine.com/electric-vehicle-rebates/"
        ],
        "reasoningNotes": "Returned separately because new and used EV rebates differ.",
        "mapping": {
          "primarySavingsModelId": "fleet_fuel_replacement",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_87bf5439f24e361a_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 400000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$4,000 per new eligible EV for businesses and nonprofits",
        "evidenceText": "Efficiency Maine lists business and nonprofit new EV rebates at $4,000, including the temporary bonus.",
        "sourceUrlsChecked": [
          "https://www.efficiencymaine.com/electric-vehicle-incentives-for-businesses-and-organizations/",
          "https://www.efficiencymaine.com/electric-vehicle-rebates/"
        ],
        "reasoningNotes": "Matched fleet fuel replacement. Use one unit as one qualifying new EV.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22647",
    "opportunityName": "Michigan - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
    "state": "MI",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22647/michigan-national-electric-vehicle-infrastructure-nevi-formula-grant-program",
    "websiteUrl": "https://www.michigan.gov/mdot/travel/mobility/initiatives/nevi",
    "applicationUrl": "https://www.michigan.gov/mdot/business/contractors/innovativecontracting/national-electric-vehicle-infrastructure-3",
    "administrator": "Michigan Department of Transportation",
    "programType": "Grant Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
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
          "ev charging",
          "electric vehicle charging"
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
        "utilityTerritories": [],
        "notes": "Michigan NEVI projects are tied to federally designated alternative fuel corridors and MDOT procurement requirements."
      },
      "eligibleApplicantTypes": [
        "charging_station_developer",
        "site_host",
        "business_owner",
        "public_private_partnership"
      ],
      "eligibleSectors": [
        "transportation",
        "commercial",
        "public_private_partnership"
      ],
      "eligibleRetrofitCategories": [
        "dc_fast_ev_charger",
        "ev_charger_installation"
      ],
      "hardRequirements": [
        "Project must satisfy Michigan NEVI Round 3 RFP requirements.",
        "Proposals for the 2026 Round 3 solicitation are due August 7, 2026.",
        "Stations must meet NEVI corridor, equipment, uptime, payment, networking, and federal cost-share requirements."
      ],
      "blockers": [
        "Do not match to Level 2-only charging projects.",
        "Do not match to residential EV chargers or vehicle purchases.",
        "Do not match outside MDOT-designated NEVI corridors or outside an active MDOT procurement."
      ],
      "programType": "Grant Program",
      "administrator": "Michigan Department of Transportation",
      "applicationUrl": "https://www.michigan.gov/mdot/business/contractors/innovativecontracting/national-electric-vehicle-infrastructure-3",
      "websiteUrl": "https://www.michigan.gov/mdot/travel/mobility/initiatives/nevi",
      "sourceUrlsChecked": [
        "https://www.michigan.gov/mdot/travel/mobility/initiatives/nevi",
        "https://www.michigan.gov/mdot/business/contractors/innovativecontracting/national-electric-vehicle-infrastructure-3",
        "https://content.govdelivery.com/accounts/MIDOT/bulletins/41afcf3"
      ],
      "evidenceText": "MDOT’s]( 2026 Round 3 NEVI materials state that the RFP was issued June 8, 2026, proposals are due August 7, 2026, and remaining NEVI funds will support EV charging deployment.",
      "reasoningNotes": "The EV charger match is valid, narrowed to NEVI-compliant DC fast-charging infrastructure under the active MDOT solicitation."
    },
    "existingSimpleRules": [
      {
        "id": "oir_3b02229564744171_v1",
        "incentiveType": "possible_grant",
        "timing": "upfront",
        "amountRule": {
          "kind": "percent_of_basis",
          "percent": 0.8
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": {
          "maxPercentOfBasis": 0.8
        },
        "confidence": "medium",
        "formula": "Possible grant up to 80% of eligible NEVI EV charging project cost",
        "evidenceText": "USDOT NEVI funding guidance lists the federal share of eligible project costs at 80%; state NEVI awards remain solicitation- and site-specific.",
        "sourceUrlsChecked": [
          "https://www.transportation.gov/rural/ev/toolkit/ev-infrastructure-funding-and-financing/federal-funding-programs",
          "https://www.michigan.gov/mdot/travel/mobility/initiatives/nevi"
        ],
        "reasoningNotes": "Modeled as possible grant money, not deterministic one-time savings, because award selection and approved eligible cost are project-specific.",
        "mapping": null
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22194",
    "opportunityName": "E-ZPass Minnesota Electric Vehicle Incentive",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22194/e-zpass-minnesota-electric-vehicle-incentive",
    "websiteUrl": "https://www.dot.state.mn.us/ezpassmn/news.html",
    "applicationUrl": null,
    "administrator": "Minnesota Department of Transportation",
    "programType": "Toll Credit Incentive",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
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
        "utilityTerritories": [],
        "notes": "Credit applies only to Minnesota E-ZPass lanes."
      },
      "eligibleApplicantTypes": [
        "individual_driver",
        "vehicle_owner",
        "vehicle_lessee"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [],
      "hardRequirements": [
        "Applicant must purchase or lease a battery electric vehicle or plug-in hybrid between November 1, 2019 and October 31, 2027.",
        "Applicant must have or open an E-ZPass Minnesota account.",
        "Applicant must submit proof of purchase, lease, or title transfer.",
        "Only one EV incentive is allowed per person.",
        "Battery electric vehicles receive a larger credit than plug-in hybrids.",
        "Electric motorcycles are excluded."
      ],
      "blockers": [
        "No EV charger installation is funded.",
        "No building or property retrofit is supported.",
        "Credits do not apply to toll systems outside Minnesota E-ZPass lanes.",
        "Electric motorcycles are not eligible."
      ],
      "programType": "Toll Credit Incentive",
      "administrator": "Minnesota Department of Transportation",
      "applicationUrl": null,
      "websiteUrl": "https://www.dot.state.mn.us/ezpassmn/news.html",
      "sourceUrlsChecked": [
        "https://www.dot.state.mn.us/ezpassmn/news.html",
        "https://www.dot.state.mn.us/ezpassmn/"
      ],
      "evidenceText": "MnDOT’s]( E-ZPass page offers a one-time toll credit for qualifying EV purchases or leases through October 31, 2027: $250 for battery EVs and $125 for plug-in hybrids.",
      "reasoningNotes": "The EV charger match is a false positive. This is a vehicle-related toll credit with no physical retrofit category."
    },
    "existingSimpleRules": [
      {
        "id": "oir_1ebf48f3464d36a7_v1",
        "incentiveType": "fixed_per_unit_credit",
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
        "formula": "$125 one-time E-ZPass Minnesota credit per plug-in hybrid purchaser or lessee",
        "evidenceText": "MnDOT says plug-in hybrid electric vehicles receive a one-time E-ZPass Minnesota credit of $125.",
        "sourceUrlsChecked": [
          "https://www.dot.state.mn.us/ezpassmn/news.html"
        ],
        "reasoningNotes": "Returned separately because PHEV and BEV credits differ.",
        "mapping": {
          "primarySavingsModelId": "fleet_fuel_replacement",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_672187db3222bc47_v1",
        "incentiveType": "fixed_per_unit_credit",
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
        "formula": "$250 one-time E-ZPass Minnesota credit per battery electric vehicle purchaser or lessee",
        "evidenceText": "MnDOT says battery electric vehicles receive a one-time E-ZPass Minnesota credit of $250.",
        "sourceUrlsChecked": [
          "https://www.dot.state.mn.us/ezpassmn/news.html"
        ],
        "reasoningNotes": "Matched EV purchase incentive. Credit is one-time, non-recurring, and valid for purchases/leases through October 31, 2027.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22606",
    "opportunityName": "Mississippi Power - Battery Storage Incentive Program",
    "state": "MS",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22606/mississippi-power-battery-storage-incentive-program",
    "websiteUrl": "https://www.mississippipower.com/residential/pricing---rates.html",
    "applicationUrl": null,
    "administrator": "Mississippi Power",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
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
          "MS"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Mississippi Power"
        ],
        "notes": "Applies to eligible Mississippi Power residential customers under the applicable renewable energy net metering tariff."
      },
      "eligibleApplicantTypes": [
        "residential_customer"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "battery_storage_system"
      ],
      "hardRequirements": [
        "Customer must qualify under Mississippi Power’s RENM-2 tariff and interconnection requirements.",
        "Battery system must meet tariff requirements, including applicable UL 1741 and utility control or demand-response provisions.",
        "Incentives are subject to program budgets and tariff limits through the applicable program period."
      ],
      "blockers": [
        "Do not match to commercial battery storage unless the current tariff explicitly supports it.",
        "Do not match to solar alone; this record is for the battery storage incentive component.",
        "Do not treat required audit, interconnection, or demand-response terms as separate retrofit categories."
      ],
      "programType": "Rebate Program",
      "administrator": "Mississippi Power",
      "applicationUrl": null,
      "websiteUrl": "https://www.mississippipower.com/residential/pricing---rates.html",
      "sourceUrlsChecked": [
        "https://www.mississippipower.com/residential/pricing---rates.html",
        "https://www.mississippipower.com/content/dam/mississippi-power/pdfs/residential-pdfs/pricing-and-rates/renm/RENM-I.pdf"
      ],
      "evidenceText": "Mississippi]( Power’s renewable energy tariff materials describe a residential battery storage incentive tied to RENM eligibility, interconnection, equipment standards, and available incentive budgets.",
      "reasoningNotes": "The battery-storage match is valid and should be limited to Mississippi Power residential tariff participants rather than broad solar or resilience work."
    },
    "existingSimpleRules": [
      {
        "id": "oir_876f215f632c97f0_v1",
        "incentiveType": "fixed_amount_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_amount",
          "amountCents": 200000
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$2,000 one-time battery storage incentive",
        "evidenceText": "Mississippi Power battery storage materials state a one-time $2,000 cash battery incentive is available.",
        "sourceUrlsChecked": [
          "https://www.mississippipower.com/residential/ways-to-save/battery-storage.html",
          "https://programs.dsireusa.org/system/program/detail/22606"
        ],
        "reasoningNotes": "Matched battery storage. Excludes any recurring demand-response or dispatch value.",
        "mapping": {
          "primarySavingsModelId": "battery_tou_demand_savings",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22656",
    "opportunityName": "Montana - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
    "state": "MT",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22656/montana-national-electric-vehicle-infrastructure-nevi-formula-grant-program",
    "websiteUrl": "https://www.mdt.mt.gov/publications/plans/ev/",
    "applicationUrl": "https://www.mdt.mt.gov/business/contracting/qacurrent.aspx",
    "administrator": "Montana Department of Transportation and Montana Department of Environmental Quality",
    "programType": "Grant Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
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
          "ev charging",
          "electric vehicle charging"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "MT"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [],
        "notes": "Montana NEVI projects are located along designated alternative fuel corridors and subject to MDT contracting requirements."
      },
      "eligibleApplicantTypes": [
        "charging_station_developer",
        "site_host",
        "contractor",
        "public_private_partnership"
      ],
      "eligibleSectors": [
        "transportation",
        "commercial",
        "public_private_partnership"
      ],
      "eligibleRetrofitCategories": [
        "dc_fast_ev_charger",
        "ev_charger_installation"
      ],
      "hardRequirements": [
        "Project must be in the current MDT NEVI RFQ/RFP process or otherwise selected through Montana NEVI procurement.",
        "Each station must provide at least four network-connected DC fast-charging ports at 150 kW or greater as specified by MDT.",
        "Selected contractors must meet public access, payment, data-sharing, operation, maintenance, and cost-share requirements."
      ],
      "blockers": [
        "Do not match to residential or Level 2-only charging projects.",
        "Do not match to vehicle purchases.",
        "Do not match outside the current MDT procurement or shortlisted proposal process."
      ],
      "programType": "Grant Program",
      "administrator": "Montana Department of Transportation and Montana Department of Environmental Quality",
      "applicationUrl": "https://www.mdt.mt.gov/business/contracting/qacurrent.aspx",
      "websiteUrl": "https://www.mdt.mt.gov/publications/plans/ev/",
      "sourceUrlsChecked": [
        "https://www.mdt.mt.gov/business/contracting/qacurrent.aspx",
        "https://www.mdt.mt.gov/publications/plans/ev/",
        "https://www.mdt.mt.gov/publications/plans/ev/docs/2022-26-NEVI-State-Plan.pdf?v=1"
      ],
      "evidenceText": "Montana]( MDT’s current contracting Q&A describes a NEVI project to design, construct, operate, and maintain public DC fast-charging stations along corridors, with four 150 kW ports, five-year O&M, payment, data, and cost-share requirements.",
      "reasoningNotes": "The EV charging match is valid and current, but only for NEVI-compliant DC fast-charging projects selected through MDT’s procurement process."
    },
    "existingSimpleRules": [
      {
        "id": "oir_f4dcc306aa7f6c6b_v1",
        "incentiveType": "possible_grant",
        "timing": "upfront",
        "amountRule": {
          "kind": "percent_of_basis",
          "percent": 0.8
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": {
          "maxPercentOfBasis": 0.8
        },
        "confidence": "medium",
        "formula": "Possible grant up to 80% of eligible NEVI EV charging project cost",
        "evidenceText": "USDOT NEVI funding guidance lists the federal share of eligible project costs at 80%; state NEVI awards remain solicitation- and site-specific.",
        "sourceUrlsChecked": [
          "https://www.transportation.gov/rural/ev/toolkit/ev-infrastructure-funding-and-financing/federal-funding-programs",
          "https://deq.mt.gov/energy/Programs/fuels"
        ],
        "reasoningNotes": "Modeled as possible grant money, not deterministic one-time savings, because award selection and approved eligible cost are project-specific.",
        "mapping": null
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22640",
    "opportunityName": "New Hampshire - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
    "state": "NH",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22640/new-hampshire-national-electric-vehicle-infrastructure-nevi-formula-grant-program",
    "websiteUrl": "https://www.dot.nh.gov/projects-plans-and-programs/ev-charging-infrastructure",
    "applicationUrl": "https://www.dot.nh.gov/news-and-media/nhdot-releases-nevi-round-ii-rfp",
    "administrator": "New Hampshire Department of Transportation",
    "programType": "Grant Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 1,
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
          "ev charging",
          "charging station"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "NH"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [],
        "notes": "New Hampshire NEVI projects are tied to state procurement and designated EV charging infrastructure priorities."
      },
      "eligibleApplicantTypes": [
        "charging_station_developer",
        "site_host",
        "public_private_partnership"
      ],
      "eligibleSectors": [
        "transportation",
        "commercial",
        "public_private_partnership"
      ],
      "eligibleRetrofitCategories": [
        "dc_fast_ev_charger",
        "ev_charger_installation"
      ],
      "hardRequirements": [
        "Project must comply with New Hampshire DOT Round II NEVI RFP requirements.",
        "Proposals are due August 21, 2026, according to NHDOT’s Round II release.",
        "Stations must meet federal NEVI equipment, access, uptime, payment, and corridor requirements."
      ],
      "blockers": [
        "Do not match Level 2-only, residential, or vehicle purchase projects.",
        "Do not match outside NHDOT’s current procurement requirements.",
        "Official pages were not fully readable, so downstream matching should preserve the procurement-specific constraints."
      ],
      "programType": "Grant Program",
      "administrator": "New Hampshire Department of Transportation",
      "applicationUrl": "https://www.dot.nh.gov/news-and-media/nhdot-releases-nevi-round-ii-rfp",
      "websiteUrl": "https://www.dot.nh.gov/projects-plans-and-programs/ev-charging-infrastructure",
      "sourceUrlsChecked": [
        "https://www.dot.nh.gov/projects-plans-and-programs/ev-charging-infrastructure",
        "https://www.dot.nh.gov/news-and-media/nhdot-releases-nevi-round-ii-rfp",
        "https://www.dot.nh.gov/doing-business-nhdot/procurement-information"
      ],
      "evidenceText": "NHDOT’s]( Round II NEVI release states that proposals are being accepted until August 21, 2026 for EV charging infrastructure under the state program.",
      "reasoningNotes": "The EV charging match is valid, but confidence is medium because some official NHDOT pages were not fully accessible for detailed verification."
    },
    "existingSimpleRules": [
      {
        "id": "oir_fddabea404cf7f45_v1",
        "incentiveType": "possible_grant",
        "timing": "upfront",
        "amountRule": {
          "kind": "percent_of_basis",
          "percent": 0.8
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": {
          "maxPercentOfBasis": 0.8
        },
        "confidence": "medium",
        "formula": "Possible grant up to 80% of eligible NEVI EV charging project cost",
        "evidenceText": "USDOT NEVI funding guidance lists the federal share of eligible project costs at 80%; state NEVI awards remain solicitation- and site-specific.",
        "sourceUrlsChecked": [
          "https://www.transportation.gov/rural/ev/toolkit/ev-infrastructure-funding-and-financing/federal-funding-programs",
          "https://www.nh.gov/dot/projects/nevi/"
        ],
        "reasoningNotes": "Modeled as possible grant money, not deterministic one-time savings, because award selection and approved eligible cost are project-specific.",
        "mapping": null
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4079",
    "opportunityName": "Xcel Energy - Residential Energy Efficiency Rebate Program",
    "state": "NM",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4079/xcel-energy-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://nm.my.xcelenergy.com/s/residential/heating-cooling/thermostat-rewards",
    "applicationUrl": "https://nm.my.xcelenergy.com/s/residential/heating-cooling/thermostat-rewards",
    "administrator": "Xcel Energy",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 1,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
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
          "NM"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Xcel Energy New Mexico electric service territory",
          "Southwestern Public Service Company"
        ],
        "notes": "Limited to eligible Xcel Energy New Mexico residential electric customers."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customer"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "smart_thermostat_zoning_retrofit",
        "smart_thermostat_demand_response"
      ],
      "hardRequirements": [
        "Applicant must be an eligible Xcel Energy New Mexico residential electric customer.",
        "Customer generally must have eligible central air conditioning or electric heat for thermostat rewards participation.",
        "Thermostat must be an eligible Wi-Fi or smart thermostat.",
        "Customer must comply with Xcel Energy rebate and demand-response enrollment rules."
      ],
      "blockers": [
        "Do not match commercial HVAC, commercial controls, or industrial energy-management systems.",
        "Do not infer broad HVAC replacement from a smart thermostat program.",
        "Other Xcel rebates, solar, EV charging, and financing are separate programs unless explicitly included on the current residential rebate page."
      ],
      "programType": "Rebate Program",
      "administrator": "Xcel Energy",
      "applicationUrl": "https://nm.my.xcelenergy.com/s/residential/heating-cooling/thermostat-rewards",
      "websiteUrl": "https://nm.my.xcelenergy.com/s/residential/heating-cooling/thermostat-rewards",
      "sourceUrlsChecked": [
        "https://nm.my.xcelenergy.com/s/residential/heating-cooling/thermostat-rewards",
        "https://www.xcelenergy.com/staticfiles/xe-responsive/Company/Rates%20%26%20Regulations/SPS%20NM%20IRP%20Stakeholder%20Slides-%20EE_LM.pdf",
        "https://www.xcelenergy.com/staticfiles/xe-responsive/Programs%20and%20Rebates/Residential/22-08-605%20It%20Pays%20To%20Save%20Booklet_NM%202022.pdf"
      ],
      "evidenceText": "Xcel New Mexico sources identify Thermostat Rewards and eligible smart thermostats for residential customers, including rebate and demand-response participation.",
      "reasoningNotes": "The thermostat match is supported, but current official pages are dynamic and not all rebate details were fully readable. Keep only thermostat and thermostat demand-response categories."
    },
    "existingSimpleRules": [
      {
        "id": "oir_d5c2fa239993c0f2_v1",
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
        "confidence": "medium",
        "formula": "$50 instant rebate per qualifying smart thermostat",
        "evidenceText": "Xcel New Mexico thermostat page says an additional $50 instant rebate is available for eligible devices.",
        "sourceUrlsChecked": [
          "https://nm.my.xcelenergy.com/s/residential/heating-cooling/thermostat-rewards"
        ],
        "reasoningNotes": "Matched smart thermostat term. Excludes ongoing thermostat rewards and annual bill credits.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4306",
    "opportunityName": "NYSEG (Electric) - Small Business Lighting Retrofit Program",
    "state": "NY",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4306/nyseg-electric-small-business-lighting-retrofit-program",
    "websiteUrl": "https://www.nyseg.com/w/small-business-direct-install",
    "applicationUrl": "https://tradeally.efficiencynavigator.com/",
    "administrator": "NYSEG",
    "programType": "Small Business Direct Install Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "led_lighting_retrofit",
        "displayName": "LED lighting retrofit",
        "parentCategory": "lighting",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "lighting retrofit"
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
          "NYSEG electric service territory"
        ],
        "notes": "Small business eligibility is tied to NYSEG service and demand or usage thresholds."
      },
      "eligibleApplicantTypes": [
        "small_business_customer",
        "nonresidential_electric_customer"
      ],
      "eligibleSectors": [
        "small_business",
        "commercial"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "lighting_controls"
      ],
      "hardRequirements": [
        "Small business electric customers generally must use no more than 110 kW per month.",
        "Eligible equipment must meet current NYSEG rebate catalog requirements.",
        "Projects must be submitted through the program application or approved channel."
      ],
      "blockers": [
        "Residential customers are not eligible under this small business lighting program.",
        "Do not infer unrelated residential appliances or industrial measures from the business rebate catalog.",
        "Demand response and other NYSEG offerings are separate programs."
      ],
      "programType": "Small Business Direct Install Rebate",
      "administrator": "NYSEG",
      "applicationUrl": "https://tradeally.efficiencynavigator.com/",
      "websiteUrl": "https://www.nyseg.com/w/small-business-direct-install",
      "sourceUrlsChecked": [
        "https://www.nyseg.com/w/small-business-direct-install",
        "https://www.nyseg.com/smartenergy/businesssolutions/smallbusiness",
        "https://www.nyseg.com/business-rebates-and-programs",
        "https://www.nyseg.com/documents/40132/5898896/FINAL%2BGSBC001%2BNYSEG%2BRGE%2BSmall%2BBusiness%2BProgram.pdf/7276f14f-220f-44da-d27c-5ede552bcff6?t=1752673731880",
        "https://programs.dsireusa.org/system/program/detail/4306/nyseg-electric-small-business-lighting-retrofit-program"
      ],
      "evidenceText": "NYSEG's small business program provides rebates for qualifying lighting and HVAC equipment, and current business catalogs list LED lamps, fixtures, refrigerated case lighting, exterior fixtures, and lighting controls.",
      "reasoningNotes": "The LED lighting retrofit match is supported. Lighting controls are also source-backed, but categories should remain lighting-specific."
    },
    "existingSimpleRules": [
      {
        "id": "oir_c6839b9b3b249c60_v1",
        "incentiveType": "percent_of_basis_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "percent_of_basis",
          "percent": 0.6
        },
        "basisPolicy": {
          "basis": "eligible_cost_categories",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "Up to 60% of eligible small-business electric equipment upgrade cost",
        "evidenceText": "NYSEG business rebate page says eligible small businesses can receive up to 60% of electric equipment rebates.",
        "sourceUrlsChecked": [
          "https://www.nyseg.com/smartenergy/businesssolutions/smallbusinessdirectinstall"
        ],
        "reasoningNotes": "Matched small business lighting retrofit/direct-install target. Medium because measure-level costs depend on approved project scope.",
        "mapping": {
          "primarySavingsModelId": "electric_usage_reduction",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5250",
    "opportunityName": "East Central Electric Cooperative - Residential Rebate Program",
    "state": "OK",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5250/east-central-electric-cooperative-residential-rebate-program",
    "websiteUrl": "https://ecoec.com/rebates",
    "applicationUrl": null,
    "administrator": "East Central Electric Cooperative",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
    "targetKind": "existing_simple_rule_v2_repair",
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
          "OK"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "East Central Electric Cooperative"
        ],
        "notes": "Available to qualifying East Central Electric Cooperative residential members."
      },
      "eligibleApplicantTypes": [
        "residential_electric_member",
        "cooperative_member"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "energy_audit",
        "weatherization",
        "air_source_heat_pump",
        "ductless_mini_split_heat_pump",
        "ground_source_geothermal_heat_pump",
        "smart_thermostat",
        "heat_pump_water_heater"
      ],
      "hardRequirements": [
        "Applicant must be an East Central Electric Cooperative member in good standing.",
        "Weatherization rebate requires a current ECE energy audit.",
        "Weatherization repairs must be identified on the ECE audit report.",
        "Rebates are issued as bill credits and are subject to cooperative program rules.",
        "Eligible equipment must meet the cooperative's efficiency and installation requirements."
      ],
      "blockers": [
        "Weatherization rebate excludes HVAC equipment and appliances.",
        "Commercial customers are not supported by this residential program.",
        "Weatherization work completed without the required ECE audit should not match.",
        "Projects outside ECE service territory are not eligible."
      ],
      "programType": "Rebate",
      "administrator": "East Central Electric Cooperative",
      "applicationUrl": null,
      "websiteUrl": "https://ecoec.com/rebates",
      "sourceUrlsChecked": [
        "https://ecoec.com/rebates",
        "https://www.ecoec.com/energy-efficiency-services",
        "https://programs.dsireusa.org/system/program/detail/5250/east-central-electric-cooperative-residential-rebate-program"
      ],
      "evidenceText": "ECE lists residential bill-credit rebates for heat pumps, thermostats, heat pump water heaters, and weatherization, with a free home energy audit service.",
      "reasoningNotes": "The energy_audit match is correct. Add the actual eligible residential measures and block weatherization claims that are not tied to the required ECE audit."
    },
    "existingSimpleRules": [
      {
        "id": "oir_c0f6607dbbcdec9f_v1",
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
        "confidence": "medium",
        "formula": "$750 per eligible unit",
        "evidenceText": "*Must be ENERGY STAR® rated Click here for the Smart Thermostat rebate form ENERGY STAR RATED HEAT PUMP WATER HEATERS $750 rebate for members",
        "sourceUrlsChecked": [
          "https://ecoec.com/rebates"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22568",
    "opportunityName": "Oklahoma Municipal Power Authority - Turn Down the Watts",
    "state": "OK",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22568/oklahoma-municipal-power-authority-turn-down-the-watts",
    "websiteUrl": "https://www.ompa.com/turn-down-the-watts/",
    "applicationUrl": "https://ompa.virtualpeaker.io/overview/",
    "administrator": "Oklahoma Municipal Power Authority",
    "programType": "Residential Demand Response Incentive",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
    "targetKind": "existing_simple_rule_v2_repair",
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
          "OK"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Oklahoma Municipal Power Authority participating member utilities"
        ],
        "notes": "Available to customers of participating OMPA member utilities."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customer"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "smart_thermostat_demand_response"
      ],
      "hardRequirements": [
        "Customer must be served by a participating OMPA member utility.",
        "Customer must have a qualifying Wi-Fi smart thermostat.",
        "Residence must have a compatible central HVAC or heat pump system.",
        "Customer must allow thermostat adjustments during demand response events, with opt-out allowed."
      ],
      "blockers": [
        "Do not generalize this to commercial automated demand response controls.",
        "Customers outside participating OMPA member utilities are not eligible.",
        "Non-thermostat building controls are not source-backed under this program."
      ],
      "programType": "Residential Demand Response Incentive",
      "administrator": "Oklahoma Municipal Power Authority",
      "applicationUrl": "https://ompa.virtualpeaker.io/overview/",
      "websiteUrl": "https://www.ompa.com/turn-down-the-watts/",
      "sourceUrlsChecked": [
        "https://www.ompa.com/turn-down-the-watts/",
        "https://www.ompa.com/services/rebate-programs/",
        "https://ompa.virtualpeaker.io/overview/",
        "https://programs.dsireusa.org/system/program/detail/22568/oklahoma-municipal-power-authority-turn-down-the-watts"
      ],
      "evidenceText": "OMPA describes Turn Down the Watts as an incentive-based demand response program using qualifying Wi-Fi smart thermostats for customers of member utilities.",
      "reasoningNotes": "The demand response concept is correct, but the eligible retrofit category should be narrowed to smart thermostat demand response."
    },
    "existingSimpleRules": [
      {
        "id": "oir_b0c1c58c34b0e167_v1",
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
        "confidence": "medium",
        "formula": "$50 per eligible unit",
        "evidenceText": "Turn Down the Watts Smart Thermostat rebates The Turn Down the Watts Smart Thermostat rebate program offers up to $50",
        "sourceUrlsChecked": [
          "https://www.ompa.com/services/rebate-programs/"
        ],
        "reasoningNotes": "",
        "mapping": {
          "primarySavingsModelId": "controls_building_automation",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null,
          "businessRelevance": "residential_only",
          "v1Readiness": "not_v1_relevant"
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22232",
    "opportunityName": "Alternative Fuel Vehicle Rebate Program",
    "state": "PA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22232/alternative-fuel-vehicle-rebate-program",
    "websiteUrl": "https://www.pa.gov/agencies/dep/programs-and-services/grants-loans-rebates/alternative-fuel-vehicle-rebates-for-consumers",
    "applicationUrl": "https://grants.pa.gov/",
    "administrator": "Pennsylvania Department of Environmental Protection",
    "programType": "Vehicle Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
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
          "PA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [],
        "notes": "Statewide Pennsylvania consumer vehicle rebate; funding is first-come and limited."
      },
      "eligibleApplicantTypes": [
        "individuals",
        "pennsylvania_residents"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [],
      "hardRequirements": [
        "Applicant must be a Pennsylvania resident.",
        "Application must be submitted no later than six months after eligible vehicle purchase.",
        "Vehicle must meet final purchase-price and eligible-fuel requirements.",
        "Companies, nonprofits, and government entities are directed to the separate Alternative Fuels Incentive Grant program."
      ],
      "blockers": [
        "This rebate is for purchasing eligible alternative fuel vehicles, not installing stationary fuel cell systems.",
        "Building energy, fuel-cell generation, EV charging, and refueling equipment categories should not match this opportunity.",
        "Program remains limited by available rebate funds."
      ],
      "programType": "Vehicle Rebate",
      "administrator": "Pennsylvania Department of Environmental Protection",
      "applicationUrl": "https://grants.pa.gov/",
      "websiteUrl": "https://www.pa.gov/agencies/dep/programs-and-services/grants-loans-rebates/alternative-fuel-vehicle-rebates-for-consumers",
      "sourceUrlsChecked": [
        "https://www.pa.gov/agencies/dep/programs-and-services/grants-loans-rebates/alternative-fuel-vehicle-rebates-for-consumers",
        "https://grants.pa.gov/",
        "https://revenue-pa.custhelp.com/app/answers/detail/a_id/3635/~/alternative-fuels-incentive-grant-program%3A-alternative-fuel-vehicle-rebates"
      ],
      "evidenceText": "Pennsylvania DEP identifies this as a consumer rebate for eligible alternative fuel vehicles, with limited remaining funds and vehicle purchase requirements.",
      "reasoningNotes": "The fuel-cell term refers to possible vehicle fuel types, not stationary fuel-cell retrofit eligibility."
    },
    "existingSimpleRules": [
      {
        "id": "oir_6f5f01a92eb98820_v1",
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
        "formula": "$500 per eligible non-BEV/PHEV alternative fuel vehicle or electric motorcycle",
        "evidenceText": "PA DEP lists all other alternative fuel vehicles and electric motorcycles at $500.",
        "sourceUrlsChecked": [
          "https://www.pa.gov/agencies/dep/programs-and-services/grants-loans-rebates/alternative-fuel-vehicle-rebates-for-consumers"
        ],
        "reasoningNotes": "Matched fuel-cell/alternative fuel vehicle term. BEV and PHEV have separate higher amounts not selected for this target.",
        "mapping": {
          "primarySavingsModelId": "fleet_fuel_replacement",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  }
]
