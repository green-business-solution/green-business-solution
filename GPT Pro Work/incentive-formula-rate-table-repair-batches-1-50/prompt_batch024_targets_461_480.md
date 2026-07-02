You are helping RetroFi repair incentive formulas, rate tables, grant estimates, tax credits, and non-cash workflow value rules.

Return strict JSON only. Do not include markdown, code fences, commentary, or citations outside JSON fields.

Batch: 24
Targets in this prompt: 461-480 of 984
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
  "batchNumber": 24,
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
  "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:506"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22282",
    "opportunityName": "LADWP - Charge Up LA Used Electric Vehicle Program",
    "state": "CA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22282/ladwp-charge-up-la-used-electric-vehicle-program",
    "websiteUrl": "https://www.ladwp.com/residential-services/programs-and-rebates-residential/electric-vehicles/used-electric-vehicle-rebate-program",
    "applicationUrl": "https://www.ladwp.com/residential-services/programs-and-rebates-residential/electric-vehicles/used-electric-vehicle-rebate-program",
    "administrator": "Los Angeles Department of Water and Power",
    "programType": "Vehicle Rebate",
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
          "CA"
        ],
        "counties": [
          "Los Angeles County"
        ],
        "cities": [
          "Los Angeles"
        ],
        "utilityTerritories": [
          "Los Angeles Department of Water and Power"
        ],
        "notes": "Applicant's permanent or primary residence must receive electric service from LADWP."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customers",
        "ladwp_served_residents",
        "ez_save_customers",
        "lifeline_customers"
      ],
      "eligibleSectors": [
        "residential",
        "transportation"
      ],
      "eligibleRetrofitCategories": [
        "used_electric_vehicle_purchase",
        "used_plug_in_hybrid_vehicle_purchase"
      ],
      "hardRequirements": [
        "Applicant's permanent residence must receive LADWP electric service.",
        "Application must be submitted within 12 months of used vehicle purchase.",
        "Vehicle must be on LADWP's eligible vehicle list.",
        "Vehicle model year must meet LADWP age requirements.",
        "Higher rebate requires qualifying EZ-SAVE or Lifeline status.",
        "Funds are available on a first-come, first-served basis."
      ],
      "blockers": [
        "EV charger installation is a separate LADWP residential and commercial program.",
        "This opportunity is for a used electric or plug-in hybrid vehicle purchase, not a building retrofit.",
        "Do not match commercial EV charging or charger hardware to this record."
      ],
      "programType": "Vehicle Rebate",
      "administrator": "Los Angeles Department of Water and Power",
      "applicationUrl": "https://www.ladwp.com/residential-services/programs-and-rebates-residential/electric-vehicles/used-electric-vehicle-rebate-program",
      "websiteUrl": "https://www.ladwp.com/residential-services/programs-and-rebates-residential/electric-vehicles/used-electric-vehicle-rebate-program",
      "sourceUrlsChecked": [
        "https://www.ladwp.com/residential-services/programs-and-rebates-residential/electric-vehicles/used-electric-vehicle-rebate-program",
        "https://www.ladwp.com/residential-services/programs-and-rebates-residential/electric-vehicles/residential-ev-charger-rebate-program",
        "https://www.ladwp.com/commercial-services/programs-and-rebates-commercial/commercial-ev-charging/commercial-ev-charger-rebate-program"
      ],
      "evidenceText": "LADWP]( offers up to $1,500, or up to $4,000 for EZ-SAVE or Lifeline households, for qualifying used electric or plug-in hybrid vehicle purchases. Applications are due within 12 months. EV charger rebates are separate programs.",
      "reasoningNotes": "The queued EV charger match is a false positive because the official page is a used vehicle rebate page, not an equipment installation incentive."
    },
    "existingSimpleRules": [
      {
        "id": "oir_9955e39faae0c4a2_v1",
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
        "confidence": "medium",
        "formula": "$4,000 per eligible unit",
        "evidenceText": "The article is under Electric Vehicles (EVs) Used Electric Vehicle Rebate Program Up to $4,000 for qualifying used EVs",
        "sourceUrlsChecked": [
          "https://www.ladwp.com/residential-services/programs-and-rebates-residential/electric-vehicles/used-electric-vehicle-rebate-program"
        ],
        "reasoningNotes": "",
        "mapping": {
          "primarySavingsModelId": "project_cost_reduction_only",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1866",
    "opportunityName": "LADWP - Non-Residential Energy Efficiency Incentive Program",
    "state": "CA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1866/ladwp-non-residential-energy-efficiency-incentive-program",
    "websiteUrl": "https://www.ladwp.com/commercial-services/programs-and-rebates-commercial/commercial-lighting-incentive-program",
    "applicationUrl": "https://www.ladwp.com/commercial-services/programs-and-rebates-commercial/commercial-lighting-incentive-program",
    "administrator": "Los Angeles Department of Water and Power",
    "programType": "Commercial Lighting Rebate",
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
          "CA"
        ],
        "counties": [
          "Los Angeles County"
        ],
        "cities": [
          "Los Angeles"
        ],
        "utilityTerritories": [
          "Los Angeles Department of Water and Power"
        ],
        "notes": "Limited to LADWP non-residential electric customers meeting program demand requirements."
      },
      "eligibleApplicantTypes": [
        "non_residential_electric_customers",
        "commercial_electric_customers"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "institutional",
        "municipal"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "lighting_controls"
      ],
      "hardRequirements": [
        "Applicant must be a current LADWP commercial customer in good standing.",
        "Monthly electrical use or facilities charge must exceed 200 kW.",
        "DLC or LADWP-qualified products are required where applicable.",
        "LADWP approval is required before purchase, installation, or operation.",
        "Project must achieve at least 25% energy savings.",
        "Project must meet LADWP completion deadlines."
      ],
      "blockers": [
        "Limit this opportunity to lighting and lighting controls.",
        "Commercial EV chargers, demand response, direct install, and other LADWP business programs are separate opportunities.",
        "Do not infer residential lighting or non-lighting equipment."
      ],
      "programType": "Commercial Lighting Rebate",
      "administrator": "Los Angeles Department of Water and Power",
      "applicationUrl": "https://www.ladwp.com/commercial-services/programs-and-rebates-commercial/commercial-lighting-incentive-program",
      "websiteUrl": "https://www.ladwp.com/commercial-services/programs-and-rebates-commercial/commercial-lighting-incentive-program",
      "sourceUrlsChecked": [
        "https://www.ladwp.com/commercial-services/programs-and-rebates-commercial",
        "https://www.ladwp.com/commercial-services/programs-and-rebates-commercial/commercial-lighting-incentive-program"
      ],
      "evidenceText": "LADWP's]( commercial lighting program provides rebates for newly purchased and installed energy-efficient lighting and controls, including LED fixtures, exterior LEDs, LED lamp replacements and controls. Projects need pre-approval, qualifying equipment, high demand and 25% energy savings.",
      "reasoningNotes": "The LED lighting match is supported, but the record should be narrowed to LADWP's commercial lighting incentive rather than generalized non-residential efficiency."
    },
    "existingSimpleRules": [
      {
        "id": "oir_1d9e80b57ef0edc0_v1",
        "incentiveType": "custom_efficiency_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "rate_per_kwh",
          "amountCentsPerKwh": 40,
          "kwhSource": "annual_kwh_delta_abs"
        },
        "basisPolicy": {
          "basis": "eligible_cost_categories",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "$0.40 per annualized kWh saved for LADWP Preferred lighting projects",
        "evidenceText": "LADWP lighting incentive page lists LADWP Preferred fixture replacements at $0.40/kWh annualized savings.",
        "sourceUrlsChecked": [
          "https://www.ladwp.com/commercial-services/programs-and-rebates-commercial/commercial-lighting-incentive-program",
          "https://www.ladwp.com/commercial-services/programs-and-rebates-commercial/business-offerings-sustainable-solutions-boss"
        ],
        "reasoningNotes": "Use only for verified nonresidential lighting projects; target lacks a clearer commercial-kitchen amount.",
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
    "opportunityId": "SOURCE_SDGE_BUSINESS:program_url:sdge_com_node_23891",
    "opportunityName": "National Electric Vehicle Infrastructure (NEVI) Program",
    "state": "CA",
    "sourceName": "San Diego Gas & Electric Business Programs",
    "sourceUrl": "https://www.sdge.com/business/electric-vehicles/lovelectric",
    "websiteUrl": "https://www.sdge.com/business/electric-vehicles/nevi",
    "applicationUrl": "https://www.energy.ca.gov/solicitations/2026-02/gfo-25-603-californias-national-electric-vehicle-infrastructure-formula",
    "administrator": "SDG&E",
    "programType": "Technical Assistance",
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
        "counties": [
          "San Diego County",
          "Orange County"
        ],
        "cities": [],
        "utilityTerritories": [
          "San Diego Gas & Electric"
        ],
        "notes": "SDG&E provides application support in its service area; California NEVI funding is administered statewide by the California Energy Commission and Caltrans."
      },
      "eligibleApplicantTypes": [
        "business_owner",
        "site_host",
        "charging_station_developer",
        "public_private_partnership"
      ],
      "eligibleSectors": [
        "transportation",
        "commercial",
        "public_private_partnership"
      ],
      "eligibleRetrofitCategories": [
        "dc_fast_ev_charger",
        "ev_charger_installation",
        "nevi_application_support"
      ],
      "hardRequirements": [
        "Applicants seeking funding must apply through the California Energy Commission NEVI solicitation, not an SDG&E rebate form.",
        "Projects must meet California NEVI requirements for publicly accessible high-powered DC fast charging along eligible corridors.",
        "CEC GFO-25-603 submissions are due October 16, 2026."
      ],
      "blockers": [
        "Do not treat SDG&E’s page as a direct utility rebate for chargers.",
        "Do not match residential chargers or Level 2-only workplace chargers.",
        "Do not match outside California NEVI solicitation requirements even if the customer is in SDG&E territory."
      ],
      "programType": "Technical Assistance",
      "administrator": "SDG&E",
      "applicationUrl": "https://www.energy.ca.gov/solicitations/2026-02/gfo-25-603-californias-national-electric-vehicle-infrastructure-formula",
      "websiteUrl": "https://www.sdge.com/business/electric-vehicles/nevi",
      "sourceUrlsChecked": [
        "https://www.sdge.com/business/electric-vehicles/nevi",
        "https://www.energy.ca.gov/solicitations/2026-02/gfo-25-603-californias-national-electric-vehicle-infrastructure-formula",
        "https://www.energy.ca.gov/programs-and-topics/programs/federal-ev-infrastructure-programs"
      ],
      "evidenceText": "SDG&E]( describes support for businesses pursuing NEVI opportunities, while the California Energy Commission’s 2026 solicitation funds publicly accessible high-powered DC fast charging with submissions due October 16, 2026.",
      "reasoningNotes": "The EV charging match is valid, but the SDG&E opportunity is technical assistance and application support; the actual funding is the CEC-administered NEVI solicitation."
    },
    "existingSimpleRules": [
      {
        "id": "oir_99f17b891d2a0c86_v1",
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
        "evidenceText": "USDOT NEVI funding guidance lists the federal share of eligible project costs at 80%; NEVI awards remain solicitation- and site-specific.",
        "sourceUrlsChecked": [
          "https://www.transportation.gov/rural/ev/toolkit/ev-infrastructure-funding-and-financing/federal-funding-programs",
          "https://www.sdge.com/node/23891"
        ],
        "reasoningNotes": "Modeled as possible grant money, not deterministic one-time savings, because award selection and approved eligible cost are project-specific.",
        "mapping": null
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22526",
    "opportunityName": "Redding Electric - Electric Vehicle Rebate Program",
    "state": "CA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22526/redding-electric-electric-vehicle-rebate-program",
    "websiteUrl": "https://www.cityofredding.gov/government/departments/redding_electric_utility/going_green/electric_vehicles.php",
    "applicationUrl": null,
    "administrator": "Redding Electric Utility",
    "programType": "Vehicle Rebate Voucher",
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
          "CA"
        ],
        "counties": [
          "Shasta County"
        ],
        "cities": [
          "Redding"
        ],
        "utilityTerritories": [
          "Redding Electric Utility"
        ],
        "notes": "Residential EV voucher eligibility is limited to active REU residential customers; commercial EV charging assistance is a separate REU pathway."
      },
      "eligibleApplicantTypes": [
        "income_qualified_residential_reu_customer"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "electric_vehicle_purchase_or_lease"
      ],
      "hardRequirements": [
        "Applicant must be an active Redding Electric Utility residential customer.",
        "Applicant must meet income qualification rules.",
        "Vehicle must be an eligible battery-electric or plug-in hybrid model.",
        "Vehicle must be purchased or leased from a participating dealership.",
        "Applicant must provide customer agreement, recent REU bill, and vehicle registration at the REU service address."
      ],
      "blockers": [
        "Do not match EV charger installation to this residential vehicle voucher record.",
        "Traditional hybrids do not qualify.",
        "Commercial EV charging projects require separate REU project information review and building permits.",
        "Do not match non-REU customers or vehicles registered outside the qualifying service address."
      ],
      "programType": "Vehicle Rebate Voucher",
      "administrator": "Redding Electric Utility",
      "applicationUrl": null,
      "websiteUrl": "https://www.cityofredding.gov/government/departments/redding_electric_utility/going_green/electric_vehicles.php",
      "sourceUrlsChecked": [
        "https://www.cityofredding.gov/government/departments/redding_electric_utility/going_green/electric_vehicles.php",
        "https://www.cityofredding.gov/Document%20Center/Departments/Redding%20Electric%20Utility/Residential/Residential%20Electrification%20Rebates/REU-Flier-EV.pdf",
        "https://files.cityofredding.gov/government/departments/redding_electric_utility/going_green/commercial_ev_charging_program.php",
        "https://www.cityofredding.gov/Document%20Center/Departments/Redding%20Electric%20Utility/Residential/Residential%20Electrification%20Rebates/EV%20Charging%20Project%20Info%20Form.pdf?t=202404241439060"
      ],
      "evidenceText": "REU's]( current EV voucher flyer describes an income-qualified vehicle voucher for BEV or PHEV purchases or leases from participating dealers; charger installation is handled on a separate commercial EV charging page.",
      "reasoningNotes": "The EV charger match is a false positive for the residential vehicle voucher; charger-related assistance belongs to a separate commercial charging process."
    },
    "existingSimpleRules": [
      {
        "id": "oir_cb68c77b93534e2e_v1",
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
        "confidence": "medium",
        "formula": "$3,000 time-of-sale voucher for a qualified EV purchase or lease",
        "evidenceText": "REU EV voucher materials state a $3,000 time-of-sale voucher for a qualifying battery-electric or plug-in hybrid vehicle.",
        "sourceUrlsChecked": [
          "https://cityofredding.gov/government/departments/redding_electric_utility/electric_vehicle.php"
        ],
        "reasoningNotes": "Matched EV purchase incentive. Use one unit as one qualifying vehicle.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22800",
    "opportunityName": "SMUD - Battery Storage Incentive Program",
    "state": "CA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22800/smud-battery-storage-incentive-program",
    "websiteUrl": "https://www.smud.org/Going-Green/Battery-storage/Homeowner",
    "applicationUrl": "https://smud.formstack.com/forms/my_energy_optimizer_incentive_enrollment",
    "administrator": "Sacramento Municipal Utility District",
    "programType": "Battery Storage Incentive",
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
          "CA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Sacramento Municipal Utility District"
        ],
        "notes": "Limited to SMUD residential electric customers with eligible home battery systems."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "homeowner",
        "multifamily_owner"
      ],
      "eligibleSectors": [
        "residential",
        "multifamily_residential"
      ],
      "eligibleRetrofitCategories": [
        "battery_storage_system",
        "residential_battery_virtual_power_plant"
      ],
      "hardRequirements": [
        "Customer must have a battery storage unit installed at home.",
        "Customer must participate in SMUD's Solar and Storage Rate.",
        "Enrollment incentive requires enrollment within 90 days after SMUD permission to operate.",
        "Eligible battery brands are limited by SMUD.",
        "MED Rate customers are not eligible."
      ],
      "blockers": [
        "Individual rental units are ineligible until SMUD creates a way for owners and tenants to mutually benefit.",
        "Income-qualified customers whose battery or solar costs are fully covered by SMUD may participate but do not receive the one-time enrollment incentive.",
        "A grid interconnection fee may apply for new solar-plus-storage or battery-only systems."
      ],
      "programType": "Battery Storage Incentive",
      "administrator": "Sacramento Municipal Utility District",
      "applicationUrl": "https://smud.formstack.com/forms/my_energy_optimizer_incentive_enrollment",
      "websiteUrl": "https://www.smud.org/Going-Green/Battery-storage/Homeowner",
      "sourceUrlsChecked": [
        "https://www.smud.org/Going-Green/Battery-storage/Homeowner",
        "https://smud.formstack.com/forms/my_energy_optimizer_incentive_enrollment",
        "https://www.tesla.com/support/energy/virtual-power-plant/smud"
      ],
      "evidenceText": "SMUD]( offers My Energy Optimizer Partner+ battery storage incentives for residential customers, with up to $10,000 enrollment incentive and eligible battery brands listed.",
      "reasoningNotes": "The battery_storage_system match is source-backed and should remain, narrowed to residential SMUD customers and eligible battery/VPP enrollment requirements."
    },
    "existingSimpleRules": [
      {
        "id": "oir_b1edbf9fca312fbc_v1",
        "incentiveType": "fixed_amount_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_amount",
          "amountCents": 1000000
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "Up to $10,000 one-time enrollment incentive for eligible new battery storage",
        "evidenceText": "SMUD battery program materials state new BESS customers may receive a one-time enrollment incentive up to $10,000 per household.",
        "sourceUrlsChecked": [
          "https://www.smud.org/Rebates-and-Savings-Tips/Rebates-for-My-Home/Battery-Storage",
          "https://www.smud.org/Rebates-and-Savings-Tips/Rebates-for-My-Home"
        ],
        "reasoningNotes": "Matched battery storage term. Excludes recurring virtual-power-plant or dispatch payments; modeled only the one-time incentive.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2508",
    "opportunityName": "SoCalGas - Multi-Family Residential Rebate Program",
    "state": "CA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2508/socalgas-multi-family-residential-rebate-program",
    "websiteUrl": "https://www.socalgas.com/savings/multifamily-rebates",
    "applicationUrl": null,
    "administrator": "Southern California Gas Company",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
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
          "Southern California Gas Company"
        ],
        "notes": "Limited to SoCalGas service territory and eligible multifamily residential properties."
      },
      "eligibleApplicantTypes": [
        "multifamily_property_owner",
        "property_manager",
        "multifamily_residential_customer"
      ],
      "eligibleSectors": [
        "multifamily_residential"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_residential_natural_gas_oven",
        "multifamily_tankless_natural_gas_water_heater",
        "central_natural_gas_boiler"
      ],
      "hardRequirements": [
        "Residential natural gas oven rebate requires replacing an existing natural gas oven.",
        "Residential natural gas oven rebate is limited to one per household.",
        "Equipment must meet the specific rebate requirements for the listed multifamily measure.",
        "Applicant must be in SoCalGas territory."
      ],
      "blockers": [
        "Commercial kitchen or foodservice ovens are not supported by this multifamily residential rebate source.",
        "Electric ovens are not supported for the natural gas oven rebate.",
        "Do not generalize the residential oven measure into broad commercial_kitchen_foodservice categories."
      ],
      "programType": "Rebate Program",
      "administrator": "Southern California Gas Company",
      "applicationUrl": null,
      "websiteUrl": "https://www.socalgas.com/savings/multifamily-rebates",
      "sourceUrlsChecked": [
        "https://www.socalgas.com/savings/multifamily-rebates",
        "https://www.socalgas.com/business/savings/rebates-and-incentives/property-managers-and-owners"
      ],
      "evidenceText": "SoCalGas]( multifamily rebates include an energy-efficient residential natural gas oven measure, plus residential multifamily water-heating and boiler measures.",
      "reasoningNotes": "The prior high_efficiency_oven match was too broad and misclassified as commercial kitchen; keep only residential multifamily natural-gas oven and related verified measures."
    },
    "existingSimpleRules": [
      {
        "id": "oir_12e59c4427471716_v1",
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
        "formula": "$500 per qualifying natural gas oven",
        "evidenceText": "SoCalGas 2026 rebate form lists $500 for qualifying natural gas wall ovens.",
        "sourceUrlsChecked": [
          "https://www.socalgas.com/save-money-and-energy/rebates-and-incentives/multifamily",
          "https://www.socalgas.com/sites/default/files/2026-Residential-Rebate-Application.pdf"
        ],
        "reasoningNotes": "Matched oven term. Use one unit as one qualifying oven.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4220",
    "opportunityName": "Colorado Springs Utilities - Builder Incentive Program",
    "state": "CO",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4220/colorado-springs-utilities-builder-incentive-program",
    "websiteUrl": "https://www.csu.org/business-efficiency/builder-incentives",
    "applicationUrl": "https://www.csu.org/hubfs/Document%20Library/BIPBuilderParticipationApp.pdf",
    "administrator": "Colorado Springs Utilities",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
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
          "El Paso County"
        ],
        "cities": [
          "Colorado Springs"
        ],
        "utilityTerritories": [
          "Colorado Springs Utilities electric and gas service territory"
        ],
        "notes": "Eligible homes must be in the Colorado Springs Utilities electric and gas service area with an active account."
      },
      "eligibleApplicantTypes": [
        "homebuilder",
        "residential_builder"
      ],
      "eligibleSectors": [
        "residential_new_construction"
      ],
      "eligibleRetrofitCategories": [
        "high_performance_new_home",
        "hers_rated_home",
        "leed_certification",
        "energy_star_new_home_certification",
        "national_green_building_standard_certification",
        "passive_house_certification",
        "heat_pump_water_heater_new_home",
        "heat_pump_hvac_new_home",
        "all_electric_new_home"
      ],
      "hardRequirements": [
        "Builder must register for the program and meet current participation requirements.",
        "Home must be residential under the applicable IECC definition and served by Colorado Springs Utilities electric and gas service.",
        "HERS rating and program documentation are required for base incentives.",
        "Certification and equipment bonuses require the listed qualifying certification or measure."
      ],
      "blockers": [
        "This is a builder incentive for new homes, not an existing-home retrofit rebate.",
        "HERS is calculated before PV, so rooftop solar should not match as an eligible measure from this program.",
        "Do not match homebuyers directly unless the builder participation requirement is satisfied."
      ],
      "programType": "Rebate Program",
      "administrator": "Colorado Springs Utilities",
      "applicationUrl": "https://www.csu.org/hubfs/Document%20Library/BIPBuilderParticipationApp.pdf",
      "websiteUrl": "https://www.csu.org/business-efficiency/builder-incentives",
      "sourceUrlsChecked": [
        "https://www.csu.org/business-efficiency/builder-incentives",
        "https://www.csu.org/hubfs/Document%20Library/BIPBuilderParticipationApp.pdf"
      ],
      "evidenceText": "Colorado]( Springs Utilities’ 2026 builder packet provides incentives for high-performance new homes, with bonuses for ENERGY STAR, NGBS, LEED, Passive House, heat pumps, and electrification.",
      "reasoningNotes": "The LEED match is supported only as an optional certification bonus within a new-construction builder program. It should not match general retrofit projects."
    },
    "existingSimpleRules": [
      {
        "id": "oir_c7cbc369525811cf_v1",
        "incentiveType": "fixed_amount_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_amount",
          "amountCents": 35000
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$350 bonus per home for LEED, Passive House, NGBS, or ENERGY STAR v3.2+ certification",
        "evidenceText": "CSU 2026 Builder Incentive form lists $350 for LEED and other home building standards.",
        "sourceUrlsChecked": [
          "https://www.csu.org/business-efficiency/builder-incentives",
          "https://www.csu.org/hubfs/Document%20Library/BIPBuilderParticipationApp.pdf"
        ],
        "reasoningNotes": "Matched LEED term. Use as a certification bonus for an eligible rated home.",
        "mapping": {
          "primarySavingsModelId": "project_cost_reduction_only",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22786",
    "opportunityName": "Eagle County - Walking Mountains Science Center Solar PV Rebate",
    "state": "CO",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22786/eagle-county-walking-mountains-science-center-solar-pv-rebate",
    "websiteUrl": "https://www.walkingmountains.org/sustainability-hub/energy-efficiency-programs/rebates-incentives/",
    "applicationUrl": null,
    "administrator": "Walking Mountains Science Center and Energy Smart Colorado",
    "programType": "Rebate",
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
          "solar pv"
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
          "Eagle County"
        ],
        "cities": [
          "Vail",
          "Avon",
          "Eagle"
        ],
        "utilityTerritories": [
          "Holy Cross Energy"
        ],
        "notes": "Eligible Eagle River Valley areas include Vail, Avon, Edwards Metro District, Eagle, and unincorporated Eagle County; program is not available to all residents."
      },
      "eligibleApplicantTypes": [
        "residential_property_owner",
        "business_customer",
        "multifamily_property_owner"
      ],
      "eligibleSectors": [
        "residential",
        "commercial",
        "multifamily"
      ],
      "eligibleRetrofitCategories": [
        "solar_pv_system"
      ],
      "hardRequirements": [
        "Project must be a grid-tied and net-metered solar PV system.",
        "Applicant must be in an eligible Eagle River Valley jurisdiction or area.",
        "Applicant must receive the Holy Cross Energy solar rebate to receive the matching local rebate.",
        "Application and required documentation should be submitted before project completion.",
        "Annual rebate caps apply by residential, business, and multifamily applicant type."
      ],
      "blockers": [
        "Not all Eagle County residents are eligible.",
        "Battery storage is not supported by this solar PV rebate unless covered by a separate program.",
        "Off-grid systems are not supported by the cited rebate language.",
        "Projects without the Holy Cross Energy rebate are not eligible for the matching rebate."
      ],
      "programType": "Rebate",
      "administrator": "Walking Mountains Science Center and Energy Smart Colorado",
      "applicationUrl": null,
      "websiteUrl": "https://www.walkingmountains.org/sustainability-hub/energy-efficiency-programs/rebates-incentives/",
      "sourceUrlsChecked": [
        "https://www.walkingmountains.org/sustainability-hub/energy-efficiency-programs/rebates-incentives/",
        "https://www.walkingmountains.org/sustainability-hub/energy-efficiency-programs/solar-energy-and-storage/solarize-eagle-county/solar-and-storage-rebates/",
        "https://programs.dsireusa.org/system/program/detail/22786/eagle-county-walking-mountains-science-center-solar-pv-rebate"
      ],
      "evidenceText": "Walking Mountains lists Eagle County solar PV rebates that match the Holy Cross Energy rebate for grid-tied, net-metered PV, with eligible local areas and caps.",
      "reasoningNotes": "The solar PV match is correct, but geography is narrower than statewide Colorado and eligibility depends on local area and Holy Cross Energy participation."
    },
    "existingSimpleRules": [
      {
        "id": "oir_d62a31d422e3dda3_v1",
        "incentiveType": "fixed_amount_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_amount",
          "amountCents": 100000
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": {
          "maxAmountCents": 100000
        },
        "confidence": "medium",
        "formula": "Match Holy Cross Energy solar PV incentive up to $1,000",
        "evidenceText": "Walking Mountains says it will match the Holy Cross Energy solar PV rebate up to $1,000.",
        "sourceUrlsChecked": [
          "https://www.walkingmountains.org/sustainability-hub/energy-efficiency-programs/rebates-incentives/"
        ],
        "reasoningNotes": "Matched solar PV. Modeled as fixed project-level maximum because source expresses the incentive as a match up to $1,000.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22163",
    "opportunityName": "Connecticut Hydrogen and Electric Automobile Purchase Rebate (CHEAPR)",
    "state": "CT",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22163/connecticut-hydrogen-and-electric-automobile-purchase-rebate-cheapr",
    "websiteUrl": "https://portal.ct.gov/DEEP/Air/Mobile-Sources/CHEAPR/CHEAPR---Home",
    "applicationUrl": "https://apply.drivecheapr-ct.org/",
    "administrator": "Connecticut Department of Energy and Environmental Protection",
    "programType": "Rebate",
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
          "CT"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [],
        "notes": "Statewide Connecticut clean vehicle rebate program."
      },
      "eligibleApplicantTypes": [
        "connecticut_resident",
        "income_qualified_resident",
        "licensed_connecticut_dealer",
        "eligible_original_equipment_manufacturer"
      ],
      "eligibleSectors": [
        "residential",
        "transportation"
      ],
      "eligibleRetrofitCategories": [
        "electric_vehicle_purchase",
        "plug_in_hybrid_vehicle_purchase"
      ],
      "hardRequirements": [
        "Vehicle must be an eligible new or used battery electric or plug-in hybrid electric vehicle.",
        "Applicant must meet Connecticut residency and program eligibility requirements.",
        "Vehicle purchase or lease must be processed through an eligible dealer or manufacturer process.",
        "Vehicle must satisfy program price, eligibility, and documentation requirements.",
        "Rebate Plus incentives require additional income or participation eligibility."
      ],
      "blockers": [
        "Stationary fuel cell systems are not eligible under this vehicle rebate.",
        "Hydrogen fueling or EV charger installation is not part of this opportunity.",
        "A generic fuel cell system retrofit match is a false positive.",
        "Commercial building or renewable generation projects are outside the program scope."
      ],
      "programType": "Rebate",
      "administrator": "Connecticut Department of Energy and Environmental Protection",
      "applicationUrl": "https://apply.drivecheapr-ct.org/",
      "websiteUrl": "https://portal.ct.gov/DEEP/Air/Mobile-Sources/CHEAPR/CHEAPR---Home",
      "sourceUrlsChecked": [
        "https://portal.ct.gov/DEEP/Air/Mobile-Sources/CHEAPR/CHEAPR---Home",
        "https://apply.drivecheapr-ct.org/",
        "https://programs.dsireusa.org/system/program/detail/22163/connecticut-hydrogen-and-electric-automobile-purchase-rebate-cheapr"
      ],
      "evidenceText": "CHEAPR provides rebates for eligible new and used battery electric and plug-in hybrid electric vehicles purchased or leased by Connecticut residents.",
      "reasoningNotes": "The source-backed opportunity is a clean vehicle purchase rebate. The supplied match to a stationary fuel_cell_system is unsupported and should be blocked."
    },
    "existingSimpleRules": [
      {
        "id": "oir_11aae91187b6685a_v1",
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
        "confidence": "medium",
        "formula": "$1,000 per eligible new fuel cell electric vehicle",
        "evidenceText": "CHEAPR/DSIRE lists Fuel Cell Electric Vehicle rebate at $1,000.",
        "sourceUrlsChecked": [
          "https://portal.ct.gov/deep/air/mobile-sources/cheapr",
          "https://programs.dsireusa.org/system/program/detail/22163/connecticut-hydrogen-and-electric-automobile-purchase-rebate-cheapr"
        ],
        "reasoningNotes": "Matched fuel-cell vehicle term. Confidence is medium because CHEAPR rebate levels changed in 2025 and should be checked at application.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22165",
    "opportunityName": "Delaware Clean Vehicle Rebate Program",
    "state": "DE",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22165/delaware-clean-vehicle-rebate-program",
    "websiteUrl": "https://dnrec.delaware.gov/climate-coastal-energy/clean-transportation/vehicle-rebates/",
    "applicationUrl": "https://driveelectricdelaware.org/",
    "administrator": "Delaware Department of Natural Resources and Environmental Control",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "electric_vehicle_purchase",
        "displayName": "Electric vehicle purchase",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": false,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "clean vehicle"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "DE"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [],
        "notes": "Statewide Delaware clean transportation rebate program."
      },
      "eligibleApplicantTypes": [
        "delaware_resident",
        "delaware_business",
        "participating_dealer"
      ],
      "eligibleSectors": [
        "residential",
        "commercial",
        "transportation"
      ],
      "eligibleRetrofitCategories": [
        "electric_vehicle_purchase",
        "plug_in_hybrid_vehicle_purchase"
      ],
      "hardRequirements": [
        "Vehicle must be an eligible battery electric or plug-in hybrid electric vehicle.",
        "Purchase or lease must meet Delaware program timing and documentation requirements.",
        "Lease terms must satisfy the minimum program term requirement.",
        "Applicant must meet Delaware residency or business eligibility requirements.",
        "Applications must be submitted through the approved dealer or rebate portal process."
      ],
      "blockers": [
        "EV charger installation is a separate type of measure and is not supported by this vehicle rebate.",
        "Building retrofits are outside the program scope.",
        "Natural gas, propane, or conventional vehicles are not eligible under the current clean vehicle rebate.",
        "Do not match this to stationary battery or renewable energy systems."
      ],
      "programType": "Rebate",
      "administrator": "Delaware Department of Natural Resources and Environmental Control",
      "applicationUrl": "https://driveelectricdelaware.org/",
      "websiteUrl": "https://dnrec.delaware.gov/climate-coastal-energy/clean-transportation/vehicle-rebates/",
      "sourceUrlsChecked": [
        "https://dnrec.delaware.gov/climate-coastal-energy/clean-transportation/vehicle-rebates/",
        "https://driveelectricdelaware.org/",
        "https://programs.dsireusa.org/system/program/detail/22165/delaware-clean-vehicle-rebate-program"
      ],
      "evidenceText": "Delaware offers rebates to residents and businesses for eligible new battery electric and plug-in hybrid vehicles, plus used eligible vehicles for residents.",
      "reasoningNotes": "The electric_vehicle_purchase match is accurate but is not a building retrofit. Keep it as a transportation purchase category and block charger or building matches."
    },
    "existingSimpleRules": [
      {
        "id": "oir_3fcbc259b1ec0228_v1",
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
        "formula": "$1,500 per new BEV with base MSRP between $40,000 and $50,000",
        "evidenceText": "DNREC table effective May 1, 2026 lists $1,500 for new BEVs with base MSRP between $40,000 and $50,000.",
        "sourceUrlsChecked": [
          "https://dnrec.delaware.gov/climate-coastal-energy/clean-transportation/vehicle-rebates/",
          "https://driveelectricdelaware.org/faqs"
        ],
        "reasoningNotes": "Returned separately because higher-MSRP new BEVs have a lower rebate.",
        "mapping": {
          "primarySavingsModelId": "fleet_fuel_replacement",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_5a53caad14db918b_v1",
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
        "formula": "$1,000 per qualifying new or used plug-in hybrid electric vehicle",
        "evidenceText": "DNREC table effective May 1, 2026 lists $1,000 for new and used plug-in hybrid vehicles meeting price limits.",
        "sourceUrlsChecked": [
          "https://dnrec.delaware.gov/climate-coastal-energy/clean-transportation/vehicle-rebates/",
          "https://driveelectricdelaware.org/faqs"
        ],
        "reasoningNotes": "Returned separately because PHEVs have a distinct amount.",
        "mapping": {
          "primarySavingsModelId": "fleet_fuel_replacement",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_8f3618a1f19804ea_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 250000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$2,500 per new BEV below $40,000 MSRP or used BEV with fair market purchase price of $40,000 or less",
        "evidenceText": "DNREC table effective May 1, 2026 lists $2,500 for qualifying new low-MSRP BEVs and used BEVs.",
        "sourceUrlsChecked": [
          "https://dnrec.delaware.gov/climate-coastal-energy/clean-transportation/vehicle-rebates/",
          "https://driveelectricdelaware.org/faqs"
        ],
        "reasoningNotes": "Matched clean vehicle term. Use one unit as one eligible battery electric vehicle.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4438",
    "opportunityName": "Beaches Energy Services - Solar Water Heating Rebate Program",
    "state": "FL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4438/beaches-energy-services-solar-water-heating-rebate-program",
    "websiteUrl": "https://www.beachesenergy.com/energy-savings/energy-rebates",
    "applicationUrl": "https://www.beachesenergy.com/sites/default/files/documents/2025-08/solar-water-heater-rebate-form-2022.pdf",
    "administrator": "Beaches Energy Services",
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
          "FL"
        ],
        "counties": [
          "Duval County"
        ],
        "cities": [
          "Jacksonville Beach"
        ],
        "utilityTerritories": [
          "Beaches Energy Services"
        ],
        "notes": "Available to qualifying residential retail electric customers in Beaches Energy Services service territory."
      },
      "eligibleApplicantTypes": [
        "residential_customers",
        "homeowners"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "solar_water_heating_system"
      ],
      "hardRequirements": [
        "Applicant must be a residential retail electric customer of Beaches Energy Services.",
        "Equipment must be Florida Solar Energy Center certified solar domestic water heating equipment.",
        "System must replace an electric hot water heater.",
        "System components must be new and not rebuilt, refurbished, relocated, or previously placed in service.",
        "Installation must be by a licensed Florida contractor with required permits.",
        "System must be at least 80 percent shade-free and guaranteed against freeze damage.",
        "Rebate form and contractor invoice must be submitted within 90 days of installation."
      ],
      "blockers": [
        "Solar pool heating systems, including spas and commercial or institutional pool systems, are ineligible.",
        "New construction homes are not eligible.",
        "Commercial, institutional, non-domestic, non-solar, and heat-pump water heaters should not match this record.",
        "Only one rebate per residential customer account is allowed."
      ],
      "programType": "Rebate Program",
      "administrator": "Beaches Energy Services",
      "applicationUrl": "https://www.beachesenergy.com/sites/default/files/documents/2025-08/solar-water-heater-rebate-form-2022.pdf",
      "websiteUrl": "https://www.beachesenergy.com/energy-savings/energy-rebates",
      "sourceUrlsChecked": [
        "https://www.beachesenergy.com/energy-savings/energy-rebates",
        "https://beachesenergy.com/about-us/resources/forms",
        "https://www.beachesenergy.com/sites/default/files/documents/2025-08/solar-water-heater-rebate-form-2022.pdf"
      ],
      "evidenceText": "Beaches Energy's solar water heater form supports a residential rebate for certified solar domestic water heaters replacing electric water heaters.",
      "reasoningNotes": "The solar water heating match is source-backed and should remain product-specific; it should not generalize to pool heating or non-solar water heaters."
    },
    "existingSimpleRules": [
      {
        "id": "oir_f58a9861aa2ebde8_v1",
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
        "formula": "$500 per residential solar water heater",
        "evidenceText": "Beaches Energy rebate brochure lists residential solar water heater rebate at $500.",
        "sourceUrlsChecked": [
          "https://www.beachesenergy.com/energy-savings/energy-rebates",
          "https://beachesenergy.com/sites/default/files/documents/2025-09/rebates-brochure.pdf"
        ],
        "reasoningNotes": "Matched solar water heating term. Use one unit as one qualifying FSEC-certified solar domestic water heater.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1774",
    "opportunityName": "City of Tallahassee Utilities - Grant Programs",
    "state": "FL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1774/city-of-tallahassee-utilities-grant-programs",
    "websiteUrl": "https://www.talgov.com/you/you-products-home-ceiling-insulation",
    "applicationUrl": "https://www.talgov.com/you/you-products-home-ceiling-insulation",
    "administrator": "City of Tallahassee Utilities",
    "programType": "Grant Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
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
          "FL"
        ],
        "counties": [
          "Leon County"
        ],
        "cities": [
          "Tallahassee"
        ],
        "utilityTerritories": [
          "City of Tallahassee Utilities electric service territory"
        ],
        "notes": "Limited to eligible City of Tallahassee Utilities electric customers and certain small commercial customers with suitable attics."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customer",
        "homeowner",
        "renter",
        "landlord",
        "commercial_electric_customer"
      ],
      "eligibleSectors": [
        "residential",
        "small_commercial"
      ],
      "eligibleRetrofitCategories": [
        "attic_insulation",
        "ceiling_insulation"
      ],
      "hardRequirements": [
        "Customer must start with a City of Tallahassee home energy audit.",
        "Eligible work must be installed by an approved contractor.",
        "Existing detached homes, duplexes, triplexes, and quadruplexes may qualify; new construction is excluded.",
        "Grant applies to qualifying blown fiberglass or loose-fill cellulose ceiling insulation to specified R-value targets."
      ],
      "blockers": [
        "Do not match broad insulation categories beyond attic or ceiling insulation for this grant.",
        "Foam, rockwool, batts, radiant barriers, and insulation removal are not supported by this grant.",
        "Energy audit is a prerequisite, not the funded retrofit itself."
      ],
      "programType": "Grant Program",
      "administrator": "City of Tallahassee Utilities",
      "applicationUrl": "https://www.talgov.com/you/you-products-home-ceiling-insulation",
      "websiteUrl": "https://www.talgov.com/you/you-products-home-ceiling-insulation",
      "sourceUrlsChecked": [
        "https://www.talgov.com/you/you-products-home-ceiling-insulation",
        "https://www.talgov.com/you/you-products-home-energy-audit"
      ],
      "evidenceText": "Tallahassee’s]( ceiling insulation grant pays a share of qualifying installed attic or ceiling insulation costs after a required utility energy audit.",
      "reasoningNotes": "The insulation match is supported but should be narrowed to attic or ceiling insulation. Other Tallahassee rebates and loans on separate pages should remain separate opportunities."
    },
    "existingSimpleRules": [
      {
        "id": "oir_8c31c19d8abc7457_v1",
        "incentiveType": "percent_of_basis_grant",
        "timing": "upfront",
        "amountRule": {
          "kind": "percent_of_basis",
          "percent": 1
        },
        "basisPolicy": {
          "basis": "equipment_plus_labor",
          "applicationOrder": 10
        },
        "cap": {
          "maxAmountCents": 50000,
          "maxPercentOfBasis": 1
        },
        "confidence": "high",
        "formula": "100% of ceiling insulation installation cost, capped at $500 for income-eligible customers",
        "evidenceText": "City of Tallahassee ceiling insulation grant covers 100% up to $500 for income-eligible participants.",
        "sourceUrlsChecked": [
          "https://www.talgov.com/you/you-products-home-insulation"
        ],
        "reasoningNotes": "Returned separately because income-eligible customers have a higher cost-share.",
        "mapping": {
          "primarySavingsModelId": "grant_funding",
          "incentiveValueMethod": "grant_amount",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_918e1ba209fd4605_v1",
        "incentiveType": "percent_of_basis_grant",
        "timing": "upfront",
        "amountRule": {
          "kind": "percent_of_basis",
          "percent": 0.8
        },
        "basisPolicy": {
          "basis": "equipment_plus_labor",
          "applicationOrder": 10
        },
        "cap": {
          "maxAmountCents": 40000
        },
        "confidence": "high",
        "formula": "80% of ceiling insulation installation cost, capped at $400",
        "evidenceText": "City of Tallahassee ceiling insulation grant covers 80% of installed cost up to $400 for standard participants.",
        "sourceUrlsChecked": [
          "https://www.talgov.com/you/you-products-home-insulation"
        ],
        "reasoningNotes": "Matched insulation term. Returned standard grant amount.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3695",
    "opportunityName": "Florida Public Utilities (Gas) - Residential Energy Efficiency Rebate Programs",
    "state": "FL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3695/florida-public-utilities-gas-residential-energy-efficiency-rebate-programs",
    "websiteUrl": "https://fpuc.com/residential/rebates/",
    "applicationUrl": "https://rebate.fpuc.com/",
    "administrator": "Florida Public Utilities",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
    "targetKind": "existing_simple_rule_v2_repair",
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
          "Florida Public Utilities natural gas service territory"
        ],
        "notes": "Florida Public Utilities residential natural gas customers."
      },
      "eligibleApplicantTypes": [
        "residential_natural_gas_customer"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "natural_gas_furnace_rebate",
        "natural_gas_water_heater_rebate",
        "natural_gas_tankless_water_heater",
        "natural_gas_range_rebate",
        "natural_gas_clothes_dryer_rebate"
      ],
      "hardRequirements": [
        "Customer must be served by Florida Public Utilities natural gas service.",
        "Eligible natural gas appliance must be purchased and installed.",
        "Rebate must be filed within the program-required period after installation.",
        "Program terms and rebate availability apply by appliance type and service status."
      ],
      "blockers": [
        "Do not match to electric heat pumps or broad HVAC replacements.",
        "Furnace support is for eligible natural gas furnace rebates, not a generic high-efficiency furnace retrofit.",
        "Do not infer commercial kitchen or commercial process equipment."
      ],
      "programType": "Rebate",
      "administrator": "Florida Public Utilities",
      "applicationUrl": "https://rebate.fpuc.com/",
      "websiteUrl": "https://fpuc.com/residential/rebates/",
      "sourceUrlsChecked": [
        "https://fpuc.com/residential/rebates/",
        "https://rebate.fpuc.com/"
      ],
      "evidenceText": "FPUC’s residential rebate page lists natural gas appliance rebates including furnace, water heaters, range, and dryer for eligible residential customers.",
      "reasoningNotes": "Keep furnace support but narrow it to natural gas furnace rebate rather than generic high-efficiency furnace retrofit."
    },
    "existingSimpleRules": [
      {
        "id": "oir_c7ceb7cade76d6fa_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 120000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "$1,200 per eligible unit",
        "evidenceText": "Also, earn up to $1,200 per unit when you install eligible residential natural gas space conditioning units",
        "sourceUrlsChecked": [
          "http://www.fpuc.com/naturalgas/rebates-conservation/rebates/"
        ],
        "reasoningNotes": "",
        "mapping": {
          "primarySavingsModelId": "gas_usage_reduction",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null,
          "businessRelevance": "residential_only",
          "v1Readiness": "not_v1_relevant"
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5166",
    "opportunityName": "Fort Pierce Utilities Authority - Solar Water Heating Rebate",
    "state": "FL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5166/fort-pierce-utilities-authority-solar-water-heating-rebate",
    "websiteUrl": "https://fpua.com/ways-to-save/",
    "applicationUrl": "https://fpua.com/wp-content/uploads/2025/10/Residential-Electric-Rebate-Form-Updated-10-2-25.pdf",
    "administrator": "Fort Pierce Utilities Authority",
    "programType": "Rebate",
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
          "FL"
        ],
        "counties": [
          "St. Lucie"
        ],
        "cities": [
          "Fort Pierce"
        ],
        "utilityTerritories": [
          "Fort Pierce Utilities Authority electric service territory"
        ],
        "notes": "FPUA residential electric customers."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customer"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "solar_water_heating_system"
      ],
      "hardRequirements": [
        "Applicant must be an FPUA residential electric customer.",
        "Solar hot water heater must be new.",
        "System must be installed by a licensed Florida contractor.",
        "Customer must provide the original contractor invoice and FSEC certification.",
        "One rebate per residential electric customer and availability limits apply."
      ],
      "blockers": [
        "Do not match to solar PV.",
        "Submittal of a rebate form does not guarantee payment.",
        "Program availability should be checked before application."
      ],
      "programType": "Rebate",
      "administrator": "Fort Pierce Utilities Authority",
      "applicationUrl": "https://fpua.com/wp-content/uploads/2025/10/Residential-Electric-Rebate-Form-Updated-10-2-25.pdf",
      "websiteUrl": "https://fpua.com/ways-to-save/",
      "sourceUrlsChecked": [
        "https://fpua.com/ways-to-save/",
        "https://fpua.com/wp-content/uploads/2025/10/Residential-Electric-Rebate-Form-Updated-10-2-25.pdf"
      ],
      "evidenceText": "FPUA’s current electric rebate materials list a solar hot water heater rebate and require a new system, licensed Florida contractor, invoice, and FSEC certification.",
      "reasoningNotes": "The solar water heating match is source-backed and product-specific."
    },
    "existingSimpleRules": [
      {
        "id": "oir_0f2cf7df86926677_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 45000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$450 per new solar hot water heater system",
        "evidenceText": "FPUA rebate materials list Solar Hot Water Heater at $450.",
        "sourceUrlsChecked": [
          "https://fpua.com/ways-to-save/",
          "https://fpua.com/wp-content/uploads/2025/10/Residential-Electric-Rebate-Form-Updated-10-2-25.pdf"
        ],
        "reasoningNotes": "Matched solar water heating term. Use one unit as one qualifying system.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22751",
    "opportunityName": "JEA - Commercial Fleet Electrification Program",
    "state": "FL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22751/jea-commercial-fleet-electrification-program",
    "websiteUrl": "https://www.jea.com/business_resources/fleet_electrification_program/",
    "applicationUrl": "https://www.jea.com/Business_Resources/2023_JEA_MakeReady_Application_FINAL/",
    "administrator": "JEA",
    "programType": "Rebate Technical Assistance",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
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
          "Jacksonville"
        ],
        "utilityTerritories": [
          "JEA"
        ],
        "notes": "JEA non-residential electric service customers and commercial fleet sites in the JEA service area."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "fleet_owner",
        "site_host",
        "non_residential_electric_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "public",
        "transportation"
      ],
      "eligibleRetrofitCategories": [
        "ev_make_ready_electrical_upgrade",
        "commercial_ev_charger_installation",
        "fleet_electrification_planning"
      ],
      "hardRequirements": [
        "Make-ready applicants must have an active JEA non-residential electric service account and the facility must be within JEA electric service territory.",
        "Make-ready infrastructure must support EVSE for fleet electrification and generally requires new or upgraded electric service.",
        "Eligible make-ready costs are limited to specified utility-side or up-to-meter customer responsibilities and capped by program rules."
      ],
      "blockers": [
        "Not a residential EV charging program.",
        "Make-ready incentives do not cover behind-the-meter electrical upgrades, chargers, networking equipment, bollards, maintenance, or software under the make-ready category; separate ERP charger rebates may apply."
      ],
      "programType": "Rebate Technical Assistance",
      "administrator": "JEA",
      "applicationUrl": "https://www.jea.com/Business_Resources/2023_JEA_MakeReady_Application_FINAL/",
      "websiteUrl": "https://www.jea.com/business_resources/fleet_electrification_program/",
      "sourceUrlsChecked": [
        "https://www.jea.com/business_resources/fleet_electrification_program/",
        "https://www.jea.com/Business_Resources/2023_JEA_MakeReady_Application_FINAL/",
        "https://www.jea.com/Business_Resources/Rebates_for_Businesses/Electrification_Rebates_Program/",
        "https://jeaconnect.my.site.com/fleet/s/interest-form"
      ],
      "evidenceText": "JEA’s fleet program offers fleet conversion support plus a make-ready incentive up to $15,000 or 60% of eligible project cost.",
      "reasoningNotes": "The original make-ready match is supported. Added boundaries between fleet planning, make-ready infrastructure, and separate ERP charger/electrification rebates."
    },
    "existingSimpleRules": [
      {
        "id": "oir_277a5dd841471b7c_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 85000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "$850 minimum per Level 2 EV charger",
        "evidenceText": "JEA EV charger rebate sheet lists $850 minimum per Level 2 charger.",
        "sourceUrlsChecked": [
          "https://www.jea.com/uploadedFiles/jea.com/Business_Resources/Commercial_Rebates/ElectrificationRebateProgram_EV%20Chargers_v2_12.25.pdf",
          "https://www.jea.com/business_resources/rebates_for_businesses/electrification_rebates_program/"
        ],
        "reasoningNotes": "Returned separately for charger hardware rebate; final incentive may vary with projected kWh.",
        "mapping": {
          "primarySavingsModelId": "fleet_fuel_replacement",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_53dac508e86a8ae7_v1",
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
          "maxAmountCents": 1500000,
          "maxPercentOfBasis": 0.6
        },
        "confidence": "high",
        "formula": "60% of customer-side make-ready costs, capped at $15,000",
        "evidenceText": "JEA fleet electrification page lists Make Ready Incentive up to $15,000, capped at 60% of project cost.",
        "sourceUrlsChecked": [
          "https://www.jea.com/business_resources/fleet_electrification_program/",
          "https://www.jea.com/Business_Resources/2023_JEA_MakeReady_Application_FINAL/"
        ],
        "reasoningNotes": "Matched make-ready terms. Applies to eligible customer-side make-ready infrastructure, not charger revenue.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22307",
    "opportunityName": "Orlando Utilities Commission - Electric Vehicle Rebate Program",
    "state": "FL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22307/orlando-utilities-commission-electric-vehicle-rebate-program",
    "websiteUrl": "https://www.ouc.com/solutions-programs/electric-vehicles/",
    "applicationUrl": "https://www.ouc.com/solutions-programs/savings/rebates/electric-vehicle-purchase-lease/",
    "administrator": "Orlando Utilities Commission",
    "programType": "Bill Credit/Rebate Program",
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
          "FL"
        ],
        "counties": [],
        "cities": [
          "Orlando"
        ],
        "utilityTerritories": [
          "Orlando Utilities Commission electric service territory"
        ],
        "notes": "Eligibility is tied to OUC electric service; OUC water-only customers are not eligible for the EV purchase or lease rebate."
      },
      "eligibleApplicantTypes": [
        "OUC electric customers",
        "residential electric customers",
        "OUC account holders or authorized account users purchasing or leasing eligible passenger EVs"
      ],
      "eligibleSectors": [
        "residential",
        "transportation"
      ],
      "eligibleRetrofitCategories": [
        "electric_vehicle_purchase_or_lease_bill_credit",
        "passenger_ev_purchase_or_lease"
      ],
      "hardRequirements": [
        "Applicant must be an OUC electric customer for the rebate account.",
        "Application must be submitted within six months of the eligible EV purchase or lease.",
        "Proof of purchase or lease must show the OUC customer or authorized person on the account.",
        "Eligible vehicles are passenger electric vehicles; scooters, skateboards and bicycles are not eligible.",
        "Rebate is applied as a bill credit and is not available to OUC water-only customers."
      ],
      "blockers": [
        "The old DSIRE-linked OUC electric-vehicle URL returned 404 and has been replaced by current OUC EV pages.",
        "OUC states there is no separate rebate for an EV charger or charging station under this EV purchase or lease rebate.",
        "This record should not be mapped to building energy-efficiency retrofits, commercial EV charging infrastructure, or fleet infrastructure projects.",
        "Only passenger EV purchase or lease support was retained."
      ],
      "programType": "Bill Credit/Rebate Program",
      "administrator": "Orlando Utilities Commission",
      "applicationUrl": "https://www.ouc.com/solutions-programs/savings/rebates/electric-vehicle-purchase-lease/",
      "websiteUrl": "https://www.ouc.com/solutions-programs/electric-vehicles/",
      "sourceUrlsChecked": [
        "https://www.ouc.com/residential/save-energy-water-money/electric-vehicles",
        "https://www.ouc.com/solutions-programs/electric-vehicles/",
        "https://www.ouc.com/solutions-programs/savings/rebates/electric-vehicle-purchase-lease/",
        "https://programs.dsireusa.org/system/program/detail/22307/orlando-utilities-commission-electric-vehicle-rebate-program"
      ],
      "evidenceText": "OUC's current EV Purchase or Lease Rebate page states customers can receive a rebate when they buy or lease an EV, requires submission within six months, limits eligibility to OUC electric customers and passenger vehicles, excludes water-only customers, and says there is no separate charger rebate.",
      "reasoningNotes": "The active current OUC source supports only EV purchase or lease bill-credit matching. Charger, building retrofit and fleet-infrastructure interpretations were removed."
    },
    "existingSimpleRules": [
      {
        "id": "oir_6452960c81fc2e88_v1",
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
        "formula": "$200 per eligible electric vehicle purchase or lease",
        "evidenceText": "OUC electric vehicle materials list a $200 rebate for eligible EV purchase or lease.",
        "sourceUrlsChecked": [
          "https://www.ouc.com/solutions-programs/electric-vehicles/",
          "https://www.ouc.com/solutions-programs/savings/rebates/"
        ],
        "reasoningNotes": "Matched vehicle fuel replacement. Use one unit as one qualifying vehicle.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2867",
    "opportunityName": "Orlando Utilities Commission - Solar Programs",
    "state": "FL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2867/orlando-utilities-commission-solar-programs",
    "websiteUrl": "https://www.ouc.com/solutions-programs/savings/rebates/solar-thermal-water-heater/",
    "applicationUrl": null,
    "administrator": "Orlando Utilities Commission",
    "programType": "Solar Thermal Water Heater Rebate",
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
          "FL"
        ],
        "counties": [],
        "cities": [
          "Orlando"
        ],
        "utilityTerritories": [
          "Orlando Utilities Commission electric service territory"
        ],
        "notes": "Available to OUC electric customers; water-only customers are excluded."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customer"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "solar_water_heating_system"
      ],
      "hardRequirements": [
        "Customer must be an OUC electric customer.",
        "Solar thermal water heater must be FSEC or SRCC certified.",
        "Invoice must be submitted within six months of installation.",
        "Rebate is up to 100 percent of cost, capped at $900."
      ],
      "blockers": [
        "Water-only OUC customers are not eligible.",
        "Pool heating systems are not eligible.",
        "This program is for solar thermal water heating, not solar PV."
      ],
      "programType": "Solar Thermal Water Heater Rebate",
      "administrator": "Orlando Utilities Commission",
      "applicationUrl": null,
      "websiteUrl": "https://www.ouc.com/solutions-programs/savings/rebates/solar-thermal-water-heater/",
      "sourceUrlsChecked": [
        "https://www.ouc.com/solutions-programs/savings/rebates/solar-thermal-water-heater/",
        "https://programs.dsireusa.org/system/program/detail/2867/orlando-utilities-commission-solar-programs"
      ],
      "evidenceText": "OUC offers up to $900 for qualifying solar thermal water heaters for OUC electric customers. The current page requires FSEC or SRCC certification and excludes water-only customers and pool heating.",
      "reasoningNotes": "The original solar thermal water heater match is source-backed and should be preserved."
    },
    "existingSimpleRules": [
      {
        "id": "oir_e3310fdbde510f04_v1",
        "incentiveType": "solar_thermal_rebate",
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
          "maxAmountCents": 90000,
          "maxPercentOfBasis": 1
        },
        "confidence": "high",
        "formula": "100% of solar thermal water heater cost, capped at $900",
        "evidenceText": "OUC solar thermal rebate page states \"Rebate Amount: 100% of the cost, up to $900.\"",
        "sourceUrlsChecked": [
          "https://www.ouc.com/solutions-programs/savings/rebates/solar-thermal-water-heater/"
        ],
        "reasoningNotes": "Matched solar thermal water heater terms. Use eligible installed system cost as basis.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22635",
    "opportunityName": "Georgia - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
    "state": "GA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22635/georgia-national-electric-vehicle-infrastructure-nevi-formula-grant-program",
    "websiteUrl": "https://nevi-gdot.hub.arcgis.com/",
    "applicationUrl": null,
    "administrator": "Georgia Department of Transportation",
    "programType": "Grant",
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
          "GA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [],
        "notes": "Georgia NEVI locations on or near designated alternative fuel corridors, generally within one mile of the corridor and spaced to NEVI requirements."
      },
      "eligibleApplicantTypes": [
        "charging_station_developer",
        "site_host",
        "private_partner"
      ],
      "eligibleSectors": [
        "transportation",
        "public_ev_charging",
        "charging_infrastructure"
      ],
      "eligibleRetrofitCategories": [
        "ev_charger_installation",
        "dc_fast_charging_station",
        "public_ev_charging_infrastructure"
      ],
      "hardRequirements": [
        "Project must meet NEVI-compliant DC fast charging requirements.",
        "Stations must be publicly accessible and generally available 24 hours per day.",
        "Each station must include at least four high-power charging ports.",
        "Locations must satisfy Georgia corridor and spacing rules.",
        "Applicants must comply with GDOT procurement and federal NEVI requirements."
      ],
      "blockers": [
        "Do not match to home chargers, workplace-only chargers, or general Level 2 rebates.",
        "Do not match outside Georgia NEVI corridor and site requirements.",
        "Awards or procurement rounds may be site-specific and should not be treated as open-ended customer rebates."
      ],
      "programType": "Grant",
      "administrator": "Georgia Department of Transportation",
      "applicationUrl": null,
      "websiteUrl": "https://nevi-gdot.hub.arcgis.com/",
      "sourceUrlsChecked": [
        "https://nevi-gdot.hub.arcgis.com/",
        "https://www.dot.ga.gov/systems/ProjectDocuments/GANEVI/NEVI%20Fact%20Sheet.pdf",
        "https://www.dot.ga.gov/systems/ProjectDocuments/GANEVI/GDOT%20NEVI%20Plan.pdf",
        "https://nevi-gdot.hub.arcgis.com/pages/round2"
      ],
      "evidenceText": "GDOT NEVI materials describe deployment of publicly accessible DC fast charging stations with at least four high-power ports along Georgia alternative fuel corridors.",
      "reasoningNotes": "The EV charging match is source-backed, but only for NEVI public DC fast charging infrastructure under GDOT procurement."
    },
    "existingSimpleRules": [
      {
        "id": "oir_2cc922298131371c_v1",
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
          "https://nevi-gdot.hub.arcgis.com/"
        ],
        "reasoningNotes": "Modeled as possible grant money, not deterministic one-time savings, because award selection and approved eligible cost are project-specific.",
        "mapping": null
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22630",
    "opportunityName": "Hawaii - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
    "state": "HI",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22630/hawaii-national-electric-vehicle-infrastructure-nevi-formula-grant-program",
    "websiteUrl": "https://hidot.hawaii.gov/highways/hawaii-nevi-state-plan/",
    "applicationUrl": null,
    "administrator": "Hawaii Department of Transportation",
    "programType": "Federal Formula Grant Deployment",
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
          "charging station",
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
          "HI"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [],
        "notes": "Statewide Hawaii NEVI deployment focused on designated Alternative Fuel Corridors and public fast-charging sites."
      },
      "eligibleApplicantTypes": [
        "charging_infrastructure_vendor",
        "site_host",
        "state_procurement_awardee"
      ],
      "eligibleSectors": [
        "transportation",
        "public",
        "commercial"
      ],
      "eligibleRetrofitCategories": [
        "dc_fast_charging_station",
        "ev_charger_installation"
      ],
      "hardRequirements": [
        "NEVI-funded chargers must satisfy federal and state corridor, availability, power, reliability, and payment-access requirements.",
        "Initial deployments prioritize public DC fast charging along designated Alternative Fuel Corridors or state-selected sites."
      ],
      "blockers": [
        "Not a residential, workplace, or general Level 2 charger rebate.",
        "No current public grant application URL was verified; matching should not imply an open customer rebate."
      ],
      "programType": "Federal Formula Grant Deployment",
      "administrator": "Hawaii Department of Transportation",
      "applicationUrl": null,
      "websiteUrl": "https://hidot.hawaii.gov/highways/hawaii-nevi-state-plan/",
      "sourceUrlsChecked": [
        "https://hidot.hawaii.gov/highways/hawaii-nevi-state-plan/",
        "https://hidot.hawaii.gov/highways/kahului-ev-charging-station-opens-feb-28/",
        "https://hidot.hawaii.gov/highways/files/2025/09/20250911-HDOT-letter-Submitting-2025-NEVI-Plan-for-FY26-funding-approved-by-FHWA.pdf"
      ],
      "evidenceText": "HDOT’s Hawaii NEVI page and plan describe formula funding for EV charging infrastructure and public DC fast-charging deployment under NEVI requirements.",
      "reasoningNotes": "The EV-charger match is source-backed, but this is a state NEVI implementation program rather than an open building retrofit rebate."
    },
    "existingSimpleRules": [
      {
        "id": "oir_673532394529451d_v1",
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
          "https://hidot.hawaii.gov/highways/hawaii-nevi-state-plan/"
        ],
        "reasoningNotes": "Modeled as possible grant money, not deterministic one-time savings, because award selection and approved eligible cost are project-specific.",
        "mapping": null
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2113",
    "opportunityName": "KIUC - Energy Wise Commercial Energy Efficiency Program",
    "state": "HI",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2113/kiuc-energy-wise-commercial-energy-efficiency-program",
    "websiteUrl": "https://kiuc.coop/commercial-programs",
    "applicationUrl": null,
    "administrator": "Kauai Island Utility Cooperative",
    "programType": "Commercial Energy Efficiency Incentive",
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
          "HI"
        ],
        "counties": [
          "Kauai County"
        ],
        "cities": [],
        "utilityTerritories": [
          "Kauai Island Utility Cooperative"
        ],
        "notes": "Limited to KIUC commercial members on Kauai."
      },
      "eligibleApplicantTypes": [
        "commercial_electric_customers",
        "business_customers"
      ],
      "eligibleSectors": [
        "commercial"
      ],
      "eligibleRetrofitCategories": [
        "commercial_hvac",
        "motors",
        "commercial_refrigeration",
        "lighting_controls"
      ],
      "hardRequirements": [
        "Applicant must be a KIUC commercial member.",
        "Customer must contact KIUC and submit the project before purchase or installation.",
        "Project must pass KIUC cost-effectiveness screening, including TRC review.",
        "Customer must work with a KIUC-approved trade ally or supplier.",
        "Funding and incentive level are project-specific and subject to KIUC approval."
      ],
      "blockers": [
        "Current KIUC page lists lighting controls, not broad LED fixture or lamp replacement.",
        "The page states the program does not offer rebates; do not model as a standard rebate unless project documents show otherwise.",
        "Do not infer residential appliances, home weatherization, or commercial kitchen equipment."
      ],
      "programType": "Commercial Energy Efficiency Incentive",
      "administrator": "Kauai Island Utility Cooperative",
      "applicationUrl": null,
      "websiteUrl": "https://kiuc.coop/commercial-programs",
      "sourceUrlsChecked": [
        "https://kiuc.coop/commercial-programs"
      ],
      "evidenceText": "KIUC]( says commercial members may receive 50%-100% incentives for eligible projects submitted before purchase or installation. The listed retrofit areas are air conditioning, motors, refrigeration and lighting controls, and the page says the program does not offer rebates.",
      "reasoningNotes": "The queued LED match is too broad. Current official language supports lighting controls and other commercial efficiency categories, but not a standalone LED lighting retrofit category."
    },
    "existingSimpleRules": [
      {
        "id": "oir_ff5df0c0748a855f_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "percent_of_basis",
          "percent": 0.8
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "low",
        "formula": "80% of eligible project cost",
        "evidenceText": "KIUC will cover 80% of the incremental cost difference between the standard and high efficiency replacement equipment",
        "sourceUrlsChecked": [
          "https://kiuc.coop/commercial-programs"
        ],
        "reasoningNotes": "",
        "mapping": {
          "primarySavingsModelId": "electric_usage_reduction",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null,
          "businessRelevance": "business_relevant",
          "v1Readiness": "needs_bill_data"
        }
      }
    ],
    "reviewedNoRule": []
  }
]
