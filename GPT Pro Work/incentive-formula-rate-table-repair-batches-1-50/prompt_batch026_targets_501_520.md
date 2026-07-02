You are helping RetroFi repair incentive formulas, rate tables, grant estimates, tax credits, and non-cash workflow value rules.

Return strict JSON only. Do not include markdown, code fences, commentary, or citations outside JSON fields.

Batch: 26
Targets in this prompt: 501-520 of 984
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
  "batchNumber": 26,
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
  "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:1946"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22377",
    "opportunityName": "PECO - EV Rebate Program",
    "state": "PA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22377/peco-ev-rebate-program",
    "websiteUrl": "https://secure.peco.com/WaystoSave/ForYourHome/Pages/PECOSmartDriverRebate.aspx",
    "applicationUrl": "https://pecorebateportal.com/",
    "administrator": "PECO",
    "programType": "Rebate Program",
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
          "PA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "PECO electric service territory"
        ],
        "notes": "Applies to PECO customers in the utility's southeastern Pennsylvania electric service area; residential and business customer eligibility depends on the specific EV rebate path."
      },
      "eligibleApplicantTypes": [
        "PECO residential customers",
        "PECO business customers",
        "PECO electric customers who purchased an eligible electric vehicle"
      ],
      "eligibleSectors": [
        "residential",
        "commercial",
        "transportation"
      ],
      "eligibleRetrofitCategories": [
        "plug_in_electric_vehicle_purchase_notification_rebate",
        "electric_vehicle_purchase_or_lease_limited"
      ],
      "hardRequirements": [
        "Applicant must be a PECO customer under the applicable EV rebate terms.",
        "The Smart Driver rebate requires the customer to notify PECO of an eligible EV purchase and apply through the PECO rebate portal.",
        "Eligibility, vehicle type and documentation requirements are governed by PECO's current Smart Driver Rebate terms and conditions.",
        "Commercial EV charging incentives are separate and should be evaluated under the applicable PECO commercial charging pilot or EVsmart program, not this EV purchase-notification rebate record."
      ],
      "blockers": [
        "This record is for PECO EV customer rebate or Smart Driver rebate support, not a building energy-efficiency retrofit.",
        "EV charger installation, Level 2 charging and DC fast charging were not retained because PECO commercial charging and public-benefit charging pilots are separate opportunities.",
        "No HVAC, lighting, envelope, appliance, refrigeration or water retrofit categories are supported by this record.",
        "A PECO customer EV purchase rebate should not be modeled as generic fleet fuel replacement or site-load EV charging without vehicle and program documentation."
      ],
      "programType": "Rebate Program",
      "administrator": "PECO",
      "applicationUrl": "https://pecorebateportal.com/",
      "websiteUrl": "https://secure.peco.com/WaystoSave/ForYourHome/Pages/PECOSmartDriverRebate.aspx",
      "sourceUrlsChecked": [
        "https://secure.peco.com/WaystoSave/ForYourHome/Pages/PECOSmartDriverRebate.aspx",
        "https://peco.chooseev.com/promos/",
        "https://energycenter.org/program/peco-evsmart-charging-rebate",
        "https://afdc.energy.gov/laws/utilities/104",
        "https://programs.dsireusa.org/system/program/detail/22377/peco-ev-rebate-program"
      ],
      "evidenceText": "PECO's Smart Driver Rebate page says PECO customers can receive a rebate for letting PECO know they purchased an EV and directs applicants to terms and an online rebate portal. PECO's EV promotions page separately distinguishes Smart Driver rebates from commercial EV charging pilot incentives.",
      "reasoningNotes": "The active opportunity is EV-related but not a charger infrastructure rebate. Charging-station matches were blocked as separate PECO programs so this record does not create false-positive building or EVSE matches."
    },
    "existingSimpleRules": [
      {
        "id": "oir_fb1e4e9562197052_v1",
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
        "confidence": "high",
        "formula": "$50 per eligible EV registration or notification rebate",
        "evidenceText": "PECO driver rebate materials provide a $50 rebate for eligible EV customers.",
        "sourceUrlsChecked": [
          "https://solutions.peco-energy.com/EVinfo",
          "https://peco.chooseev.com/promos/"
        ],
        "reasoningNotes": "Matched EV project-cost reduction target. This is a vehicle-related one-time customer rebate, not a charger rule.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3023",
    "opportunityName": "Rhode Island Energy (Electric) - Small Business Energy Efficiency Program",
    "state": "RI",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3023/rhode-island-energy-electric-small-business-energy-efficiency-program",
    "websiteUrl": "https://www.rienergy.com/site/ways-to-save/save-money-with-rebates-and-incentives/savings-for-your-business/small-business-program",
    "applicationUrl": null,
    "administrator": "Rhode Island Energy",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
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
          "Rhode Island Energy"
        ],
        "notes": "Rhode Island Energy electric business service territory; related state grant and OER pages describe overlapping but separate support."
      },
      "eligibleApplicantTypes": [
        "small_business_customers",
        "commercial_customers",
        "nonprofit_customers"
      ],
      "eligibleSectors": [
        "commercial",
        "small_business",
        "nonprofit"
      ],
      "eligibleRetrofitCategories": [
        "energy_audit",
        "commercial_lighting",
        "lighting_controls",
        "hvac_controls",
        "energy_management_system",
        "food_service_equipment",
        "commercial_refrigeration",
        "building_envelope_improvements",
        "efficient_motors_pumps"
      ],
      "hardRequirements": [
        "Customer must be an eligible Rhode Island Energy business customer for utility-administered services.",
        "Small business participation is based on program screening and no-cost or subsidized assessment pathways.",
        "Installation incentives and grants require eligible cost-effective energy efficiency measures and program approval."
      ],
      "blockers": [
        "Primary Rhode Island Energy small business page was not fully readable, so avoid over-specific rebate amounts from inaccessible content.",
        "Do not treat Rhode Island Commerce grant rules as identical to Rhode Island Energy utility program rules.",
        "Solar and non-efficiency projects are separate and should not be matched here."
      ],
      "programType": "Rebate Program",
      "administrator": "Rhode Island Energy",
      "applicationUrl": null,
      "websiteUrl": "https://www.rienergy.com/site/ways-to-save/save-money-with-rebates-and-incentives/savings-for-your-business/small-business-program",
      "sourceUrlsChecked": [
        "https://programs.dsireusa.org/system/program/detail/3023/rhode-island-energy-electric-small-business-energy-efficiency-program",
        "https://www.rienergy.com/site/ways-to-save/save-money-with-rebates-and-incentives/savings-for-your-business/small-business-program",
        "https://energy.ri.gov/incentives",
        "https://commerceri.com/small-business-energy-efficiency-grant-program/"
      ],
      "evidenceText": "Rhode]( Island official energy and commerce pages reference Rhode Island Energy business efficiency incentives, no-cost assessments, and small business audit-based efficiency measures.",
      "reasoningNotes": "The energy audit match is supported, but confidence is medium because the primary utility page was not fully accessible. Categories are limited to efficiency measures corroborated by official state sources."
    },
    "existingSimpleRules": [
      {
        "id": "oir_3980f7ef8bea1f76_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "percent_of_basis",
          "percent": 0.7
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "70% of eligible project cost",
        "evidenceText": "Smart energy solutions for small businesses Rhode Island Energy LED Lighting We’ll cover up to 70% of the installation costs for indoor and outdoor LEDs and lighting occupancy sensors for your small business",
        "sourceUrlsChecked": [
          "https://www.rienergy.com/site/ways-to-save/save-money-with-rebates-and-incentives/savings-for-your-business/small-business-program"
        ],
        "reasoningNotes": "",
        "mapping": {
          "primarySavingsModelId": "project_cost_reduction_only",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null,
          "businessRelevance": "business_relevant",
          "v1Readiness": "needs_project_scope"
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5251",
    "opportunityName": "Aiken Electric Cooperative Inc - Residential Energy Efficiency Rebate Program",
    "state": "SC",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5251/aiken-electric-cooperative-inc-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.aikenco-op.org/water-heater/",
    "applicationUrl": null,
    "administrator": "Aiken Electric Cooperative Inc",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
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
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "SC"
        ],
        "counties": [
          "Aiken County",
          "Barnwell County",
          "Calhoun County",
          "Edgefield County",
          "Greenwood County",
          "Lexington County",
          "McCormick County",
          "Orangeburg County",
          "Saluda County"
        ],
        "cities": [],
        "utilityTerritories": [
          "Aiken Electric Cooperative"
        ],
        "notes": "Available only to qualifying Aiken Electric Cooperative residential members at served premises."
      },
      "eligibleApplicantTypes": [
        "residential_members",
        "property_owners"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "electric_water_heater",
        "water_heater_load_control_timer"
      ],
      "hardRequirements": [
        "Applicant must be an active Aiken Electric Cooperative member.",
        "Equipment must be at the member's primary residence served by Aiken Electric Cooperative.",
        "Member must own the property where the water heater or timer is installed.",
        "Member must sign the program agreement and keep eligible equipment active for the required term."
      ],
      "blockers": [
        "Smart thermostat incentives are on a separate Aiken Electric Cooperative Ecobee program and should not match this water-heater opportunity.",
        "Non-residential structures are not eligible for this residential water-heater program.",
        "Unsupported HVAC, thermostat, or general weatherization categories should be removed."
      ],
      "programType": "Rebate Program",
      "administrator": "Aiken Electric Cooperative Inc",
      "applicationUrl": null,
      "websiteUrl": "https://www.aikenco-op.org/water-heater/",
      "sourceUrlsChecked": [
        "https://www.aikenco-op.org/water-heater/",
        "https://www.aikenco-op.org/ecobee-smart-thermostat/"
      ],
      "evidenceText": "The official water-heater page supports Aiken's residential water heater and timer program; smart thermostat incentives are addressed on a separate Ecobee page.",
      "reasoningNotes": "The supplied thermostat match is a false positive for this DSIRE record because the current official URL is a water-heater program, not the separate thermostat program."
    },
    "existingSimpleRules": [
      {
        "id": "oir_0857fe3aeea27b4f_v1",
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
        "confidence": "high",
        "formula": "$50 per qualifying smart thermostat",
        "evidenceText": "Aiken Electric says members who enroll a smart thermostat can receive a $50 rebate.",
        "sourceUrlsChecked": [
          "https://www.aikenco-op.org/smart-thermostat/",
          "https://www.aikenco-op.org/rebates/"
        ],
        "reasoningNotes": "Matched smart thermostat term. Use one unit as one qualifying enrolled thermostat.",
        "mapping": {
          "primarySavingsModelId": "controls_building_automation",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:21862",
    "opportunityName": "Santee Cooper - Rooftop Solar Rebate Program",
    "state": "SC",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/21862/santee-cooper-rooftop-solar-rebate-program",
    "websiteUrl": "https://www.santeecooper.com/programs-incentives/empowersolar/solar-home/",
    "applicationUrl": "https://www.santeecooper.com/Programs-Incentives/EmpowerSolar/Solar-Home/_pdfs/2026-Solar-Residential-Program-Manual-v1-12012025.pdf",
    "administrator": "Santee Cooper",
    "programType": "Rebate Program",
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
          "rooftop solar",
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
          "SC"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Santee Cooper"
        ],
        "notes": "For eligible Santee Cooper residential electric customers."
      },
      "eligibleApplicantTypes": [
        "residential_customers",
        "homeowners",
        "authorized_owner_representatives",
        "multifamily_residential_account_holders"
      ],
      "eligibleSectors": [
        "residential",
        "multifamily"
      ],
      "eligibleRetrofitCategories": [
        "rooftop_solar_pv"
      ],
      "hardRequirements": [
        "Customer must be a Santee Cooper residential customer on an eligible residential rate.",
        "Solar PV project must receive required distributed generation rider and interconnection approval.",
        "Installer must meet Santee Cooper trade ally or NABCEP requirements.",
        "System size, application timing, insurance, ownership, and program-period requirements apply."
      ],
      "blockers": [
        "Battery costs are not eligible; only the solar electric portion may qualify.",
        "Third-party leased systems do not qualify under the residential program manual.",
        "Solar Share and business solar options are separate programs and should not be merged into this residential rebate."
      ],
      "programType": "Rebate Program",
      "administrator": "Santee Cooper",
      "applicationUrl": "https://www.santeecooper.com/Programs-Incentives/EmpowerSolar/Solar-Home/_pdfs/2026-Solar-Residential-Program-Manual-v1-12012025.pdf",
      "websiteUrl": "https://www.santeecooper.com/programs-incentives/empowersolar/solar-home/",
      "sourceUrlsChecked": [
        "https://programs.dsireusa.org/system/program/detail/21862/santee-cooper-rooftop-solar-rebate-program",
        "https://www.santeecooper.com/programs-incentives/empowersolar/solar-home/",
        "https://www.santeecooper.com/programs-incentives/empowersolar/",
        "https://www.santeecooper.com/Programs-Incentives/EmpowerSolar/Solar-Home/_pdfs/2026-Solar-Residential-Program-Manual-v1-12012025.pdf"
      ],
      "evidenceText": "Santee]( Cooper's Solar Home program manual supports rebates for eligible residential customers installing solar PV, with interconnection, installer, ownership, timing, and size requirements.",
      "reasoningNotes": "The rooftop solar PV match is valid. Keep Santee Cooper utility territory, residential-sector limits, and battery exclusions."
    },
    "existingSimpleRules": [
      {
        "id": "oir_e55b820718efbee9_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "rate_per_kw",
          "amountCentsPerKw": 95000,
          "kwSource": "system_kw"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$950 per kW",
        "evidenceText": "Qualifying systems are eligible for a rebate of $950/kW up to $5,700",
        "sourceUrlsChecked": [
          "https://www.santeecooper.com/programs-incentives/empowersolar/solar-home/"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22660",
    "opportunityName": "South Dakota - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
    "state": "SD",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22660/south-dakota-national-electric-vehicle-infrastructure-nevi-formula-grant-program",
    "websiteUrl": "https://dot.sd.gov/projects-studies/planning/south-dakota-ev-fast-charging-plan/",
    "applicationUrl": null,
    "administrator": "South Dakota Department of Transportation",
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
          "electric vehicle charging"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "SD"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Statewide South Dakota designated alternative fuel corridors",
          "Interstate corridors including I-90, I-29, I-229 and I-190"
        ],
        "notes": "South Dakota's NEVI plan focuses on DC fast charging along designated corridors and interstate locations; awards and site eligibility depend on SDDOT procurement or grant processes."
      },
      "eligibleApplicantTypes": [
        "EV charging developers",
        "charging site hosts",
        "businesses hosting corridor fast chargers",
        "local governments or public agencies where eligible under SDDOT solicitation terms",
        "utilities or charging network operators where eligible",
        "project teams able to meet NEVI and SDDOT requirements"
      ],
      "eligibleSectors": [
        "transportation",
        "commercial",
        "public_sector",
        "utility_limited",
        "corridor_charging"
      ],
      "eligibleRetrofitCategories": [
        "dc_fast_charging_nevi_corridor",
        "public_ev_charging_infrastructure",
        "ev_charging_networking_and_payment_systems",
        "ev_charging_operations_and_maintenance",
        "ev_charging_site_power_and_make_ready_limited"
      ],
      "hardRequirements": [
        "Projects must follow South Dakota Department of Transportation NEVI plan requirements and any current SDDOT solicitation, contract or award terms.",
        "NEVI-funded stations are focused on DC fast charging along designated alternative fuel corridors and interstate routes.",
        "Corridor buildout requirements include station spacing and proximity requirements under NEVI guidance, including the within-50-miles and within-one-travel-mile concepts used in SDDOT planning materials.",
        "Applicants must satisfy federal NEVI and FHWA requirements, including eligible costs, accessibility, uptime, data reporting, payment and network requirements where applicable.",
        "Funding is project-specific and generally requires non-federal cost share and SDDOT approval before reimbursement or award."
      ],
      "blockers": [
        "This is a formula-funded state corridor fast-charging grant program, not a residential or business customer rebate.",
        "Do not map to Level 2 workplace chargers, home chargers, EV purchases, HVAC, lighting, envelope, appliance or building-efficiency projects.",
        "No open, simple per-unit rebate application was verified in the current official sources checked; awards depend on SDDOT procurement or solicitation details.",
        "Funding amounts and eligible costs require project site, charger configuration, corridor status and contract terms.",
        "The older short URL https://dot.sd.gov/ev should be treated as a starting point; the current official EV Fast Charging Plan page and plan updates provide the program context."
      ],
      "programType": "Grant Program",
      "administrator": "South Dakota Department of Transportation",
      "applicationUrl": null,
      "websiteUrl": "https://dot.sd.gov/projects-studies/planning/south-dakota-ev-fast-charging-plan/",
      "sourceUrlsChecked": [
        "https://dot.sd.gov/ev",
        "https://dot.sd.gov/projects-studies/planning/south-dakota-ev-fast-charging-plan/",
        "https://dot.sd.gov/media/kxbe0f2h/final-sddot-nevi-plan_letterhead-090425_fhwa-approved.pdf",
        "https://afdc.energy.gov/laws/12744",
        "https://programs.dsireusa.org/system/program/detail/22660/south-dakota-national-electric-vehicle-infrastructure-nevi-formula-grant-program"
      ],
      "evidenceText": "South Dakota DOT's EV Fast Charging Plan page describes a framework for a network of EV fast chargers and states that NEVI funds support DC fast chargers along designated corridors, with initial focus on interstate corridors such as I-90, I-29, I-229 and I-190. SDDOT planning materials describe federal NEVI corridor spacing and proximity concepts and the state's multi-year NEVI funding context.",
      "reasoningNotes": "The opportunity is active as a state NEVI corridor fast-charging program, but confidence is medium because the current public materials checked describe planning and funding context rather than a single currently open application with reusable terms."
    },
    "existingSimpleRules": [
      {
        "id": "oir_50b0d43042e1907d_v1",
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
          "https://dot.sd.gov/projects-studies/planning/nevi"
        ],
        "reasoningNotes": "Modeled as possible grant money, not deterministic one-time savings, because award selection and approved eligible cost are project-specific.",
        "mapping": null
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22089",
    "opportunityName": "Austin Energy - Multifamily Solar PV Rebate Program",
    "state": "TX",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22089/austin-energy-multifamily-solar-pv-rebate-program",
    "websiteUrl": "https://austinenergy.com/green-power/solar-solutions/for-your-multifamily",
    "applicationUrl": null,
    "administrator": "Austin Energy",
    "programType": "Rebate Program",
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
          "TX"
        ],
        "counties": [],
        "cities": [
          "Austin"
        ],
        "utilityTerritories": [
          "Austin Energy"
        ],
        "notes": "Available to qualifying multifamily properties served by Austin Energy."
      },
      "eligibleApplicantTypes": [
        "multifamily_property_owners",
        "nonprofits"
      ],
      "eligibleSectors": [
        "multifamily",
        "residential",
        "nonprofit"
      ],
      "eligibleRetrofitCategories": [
        "solar_pv_system"
      ],
      "hardRequirements": [
        "Property must be a qualifying multifamily property in Austin Energy service territory.",
        "Project must use a participating Austin Energy solar contractor.",
        "Application and letter of intent must be completed before installation.",
        "Incentive generally applies to residentially metered multifamily units.",
        "Funding is limited and available on a first-come basis."
      ],
      "blockers": [
        "Commercial, master-metered, office, and common-area projects are directed to the commercial solar program.",
        "Leased systems and third-party power purchase agreements are not eligible.",
        "Single-family residential solar should use the residential rebate program."
      ],
      "programType": "Rebate Program",
      "administrator": "Austin Energy",
      "applicationUrl": null,
      "websiteUrl": "https://austinenergy.com/green-power/solar-solutions/for-your-multifamily",
      "sourceUrlsChecked": [
        "https://austinenergy.com/green-power/solar-solutions/for-your-multifamily",
        "https://austinenergy.com/-/media/project/websites/austinenergy/green-power/solar/multifamily_cbi_guidelines.pdf",
        "https://austinenergy.com/about/news/news-releases/2026/Austin-Energy-increases-solar-incentives-for-residential-and-commercial-customers"
      ],
      "evidenceText": "Austin Energy's multifamily solar materials support a capacity-based incentive for qualifying multifamily properties using participating contractors.",
      "reasoningNotes": "The solar PV match is source-backed but should be restricted to multifamily properties, not general commercial or single-family projects."
    },
    "existingSimpleRules": [
      {
        "id": "oir_7017af34cfd0ed89_v1",
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
          "maxAmountCents": 250000
        },
        "confidence": "high",
        "formula": "$0.60 per watt for multifamily solar serving five or more residential units, capped at $2,500 per unit",
        "evidenceText": "Austin Energy multifamily solar rebate table lists $0.60/W and $2,500 per unit cap.",
        "sourceUrlsChecked": [
          "https://savings.austinenergy.com/rebates/residential/multifamily-solar-rebate"
        ],
        "reasoningNotes": "Matched solar PV term. Current cap support records this as a total max cap.",
        "mapping": {
          "primarySavingsModelId": "solar_electric_offset",
          "incentiveValueMethod": "per_kw",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_905f620119bb27c1_v1",
        "incentiveType": "solar_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "rate_per_kw",
          "amountCentsPerKw": 100000,
          "kwSource": "system_kw"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": {
          "maxAmountCents": 250000
        },
        "confidence": "high",
        "formula": "$1.00 per watt for nonprofit multifamily solar serving five or more residential units, capped at $2,500 per unit",
        "evidenceText": "Austin Energy multifamily solar table lists nonprofit projects at $1.00/W and $2,500 per unit cap.",
        "sourceUrlsChecked": [
          "https://savings.austinenergy.com/rebates/residential/multifamily-solar-rebate"
        ],
        "reasoningNotes": "Higher nonprofit multifamily solar rate. Current cap support records this as a total max cap.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1088",
    "opportunityName": "Austin Energy - Residential Solar PV Rebate Program",
    "state": "TX",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1088/austin-energy-residential-solar-pv-rebate-program",
    "websiteUrl": "https://austinenergy.com/green-power/solar-solutions/for-your-home",
    "applicationUrl": "https://rebates.austinenergy.com/",
    "administrator": "Austin Energy",
    "programType": "Rebate Program",
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
          "TX"
        ],
        "counties": [],
        "cities": [
          "Austin"
        ],
        "utilityTerritories": [
          "Austin Energy"
        ],
        "notes": "Available to qualifying Austin Energy residential electric customers."
      },
      "eligibleApplicantTypes": [
        "residential_customers",
        "homeowners"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "solar_pv_system"
      ],
      "hardRequirements": [
        "Applicant must have an Austin Energy residential electric account.",
        "New solar system must be installed at the account premise.",
        "System must be at least 3 kW DC and meet shading requirements.",
        "Participating contractor must be used.",
        "Application and rebate confirmation must occur before installation.",
        "Third-party power purchase agreements are not allowed."
      ],
      "blockers": [
        "Systems installed before rebate submission or confirmation are not eligible.",
        "Commercial and multifamily projects have separate Austin Energy solar programs.",
        "Battery storage alone and non-PV measures are not covered by this rebate."
      ],
      "programType": "Rebate Program",
      "administrator": "Austin Energy",
      "applicationUrl": "https://rebates.austinenergy.com/",
      "websiteUrl": "https://austinenergy.com/green-power/solar-solutions/for-your-home",
      "sourceUrlsChecked": [
        "https://austinenergy.com/green-power/solar-solutions/for-your-home",
        "https://rebates.austinenergy.com/",
        "https://austinenergy.com/about/news/news-releases/2026/Austin-Energy-increases-solar-incentives-for-residential-and-commercial-customers"
      ],
      "evidenceText": "Austin Energy's residential solar page supports a home solar rebate for qualifying new solar PV systems installed by participating contractors.",
      "reasoningNotes": "The solar PV match is source-backed and should stay limited to Austin Energy residential solar installations."
    },
    "existingSimpleRules": [
      {
        "id": "oir_7dc296b40efe447c_v1",
        "incentiveType": "fixed_amount_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_amount",
          "amountCents": 250000
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$2,500 residential solar rebate for a qualifying solar system",
        "evidenceText": "Austin Energy says residential customers can earn a $2,500 rebate after solar education and qualifying installation.",
        "sourceUrlsChecked": [
          "https://austinenergy.com/green-power/solar-solutions/for-your-home"
        ],
        "reasoningNotes": "Matched solar PV. Current Austin Energy residential incentive is a flat rebate, while Value of Solar is a recurring bill credit and excluded.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5411",
    "opportunityName": "Bryan Texas Utilities - SmartHOME Residential Energy Efficiency Rebate Program",
    "state": "TX",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5411/bryan-texas-utilities-smarthome-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.btutilities.com/smarthome",
    "applicationUrl": null,
    "administrator": "Bryan Texas Utilities",
    "programType": "Residential Rebate",
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
          "TX"
        ],
        "counties": [],
        "cities": [
          "Bryan"
        ],
        "utilityTerritories": [
          "Bryan Texas Utilities"
        ],
        "notes": "Available for qualifying permanent dwellings in Bryan Texas Utilities service territory."
      },
      "eligibleApplicantTypes": [
        "residential_homeowners",
        "permanent_dwelling_owners"
      ],
      "eligibleSectors": [
        "residential",
        "multifamily"
      ],
      "eligibleRetrofitCategories": [
        "insulation_upgrade",
        "window_replacement",
        "solar_screens"
      ],
      "hardRequirements": [
        "Applicant must own a single-family or multi-family permanent dwelling in Bryan Texas Utilities service territory.",
        "Home must have electric central heat and air conditioning.",
        "Project must be completed and application submitted within the current fiscal year.",
        "Required documentation includes invoices or receipts and before-and-after pictures.",
        "Insulation, whole-window replacement, and qualifying solar screen specifications must be met."
      ],
      "blockers": [
        "Mobile homes, additions, RVs, garages, and other spaces without central air conditioning do not qualify.",
        "Window rebates require entire ENERGY STAR window unit replacement, not glass-only replacement.",
        "Door windows and other non-listed envelope measures are not supported."
      ],
      "programType": "Residential Rebate",
      "administrator": "Bryan Texas Utilities",
      "applicationUrl": null,
      "websiteUrl": "https://www.btutilities.com/smarthome",
      "sourceUrlsChecked": [
        "https://www.btutilities.com/smarthome",
        "https://www.btutilities.com/energy-efficiency/smarthome-programs/"
      ],
      "evidenceText": "Bryan Texas Utilities lists SmartHOME building-envelope rebates for insulation, ENERGY STAR window replacement, and solar screens for qualifying permanent dwellings in its service territory.",
      "reasoningNotes": "The insulation match is source-backed. Additional supported envelope categories should be retained, while non-listed residential improvements should not be inferred."
    },
    "existingSimpleRules": [
      {
        "id": "oir_cf8c39690d7e9bfc_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "percent_of_basis",
          "percent": 0.25
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "25% of eligible project cost",
        "evidenceText": "Each qualifying project is guaranteed ten percent (10%) up to a max of twenty-five percent (25%) of their total project cost based on the calculated incentive",
        "sourceUrlsChecked": [
          "https://www.btutilities.com/energy-efficiency/smarthome-programs/"
        ],
        "reasoningNotes": "",
        "mapping": {
          "primarySavingsModelId": "envelope_insulation_savings",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5117",
    "opportunityName": "City of San Marcos - Distributed Generation Rebate Program",
    "state": "TX",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5117/city-of-san-marcos-distributed-generation-rebate-program",
    "websiteUrl": "https://www.sanmarcostx.gov/3720/Energy-Rebate-Programs",
    "applicationUrl": "https://sanmarcostx.gov/DocumentCenter/View/5027/Distributed-Generation-Rebate-Program-PDF",
    "administrator": "City of San Marcos Electric Utility",
    "programType": "Rebate Program",
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
          "TX"
        ],
        "counties": [
          "Hays County",
          "Caldwell County",
          "Guadalupe County"
        ],
        "cities": [
          "San Marcos"
        ],
        "utilityTerritories": [
          "San Marcos Electric Utility"
        ],
        "notes": "Limited to San Marcos Electric Utility customers with eligible distributed generation at a served property."
      },
      "eligibleApplicantTypes": [
        "electric_utility_customer",
        "residential_property_owner",
        "commercial_property_owner"
      ],
      "eligibleSectors": [
        "residential",
        "commercial"
      ],
      "eligibleRetrofitCategories": [
        "grid_tied_solar_pv",
        "rooftop_solar_pv",
        "small_wind_generation"
      ],
      "hardRequirements": [
        "Applicant must be an existing San Marcos Electric Utility customer in good standing.",
        "Applicant must be the property owner and electric utility customer.",
        "Pre-approval is required before installation.",
        "System must generally be at least 1 kW and not exceed 100 percent of annual consumption.",
        "Solar PV installers must meet program certification requirements and systems must meet interconnection requirements."
      ],
      "blockers": [
        "Battery systems, leased systems, used equipment, reroofing, and structural costs are not eligible rebate measures.",
        "Do not match non-grid-tied renewable systems.",
        "Do not infer broad solar hot water or energy efficiency categories from this distributed generation rebate."
      ],
      "programType": "Rebate Program",
      "administrator": "City of San Marcos Electric Utility",
      "applicationUrl": "https://sanmarcostx.gov/DocumentCenter/View/5027/Distributed-Generation-Rebate-Program-PDF",
      "websiteUrl": "https://www.sanmarcostx.gov/3720/Energy-Rebate-Programs",
      "sourceUrlsChecked": [
        "https://www.sanmarcostx.gov/3720/Energy-Rebate-Programs",
        "https://sanmarcostx.gov/DocumentCenter/View/5027/Distributed-Generation-Rebate-Program-PDF"
      ],
      "evidenceText": "San]( Marcos’ distributed generation rebate supports grid-tied renewable systems such as solar PV and wind for qualifying SMTXU electric customers, with pre-approval and interconnection requirements.",
      "reasoningNotes": "The solar PV match is supported. Use utility-territory and customer-status blockers to prevent statewide or non-SMTXU matching."
    },
    "existingSimpleRules": [
      {
        "id": "oir_75c07bccd88e6b1d_v1",
        "incentiveType": "solar_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "rate_per_kw",
          "amountCentsPerKw": 100000,
          "kwSource": "system_kw"
        },
        "basisPolicy": {
          "basis": "equipment_plus_labor",
          "applicationOrder": 10
        },
        "cap": {
          "maxAmountCents": 500000,
          "maxPercentOfBasis": 0.5
        },
        "confidence": "high",
        "formula": "$1.00 per watt for commercial solar PV, capped at $5,000 and 50% of installed cost",
        "evidenceText": "San Marcos distributed generation form lists $1.00/W up to $5,000 for commercial customers.",
        "sourceUrlsChecked": [
          "https://sanmarcostx.gov/DocumentCenter/View/5027/Distributed-Generation-Rebate-Program-PDF",
          "https://www.sanmarcostx.gov/3720/Energy-Rebate-Programs"
        ],
        "reasoningNotes": "Returned separately because commercial solar has a higher published cap.",
        "mapping": {
          "primarySavingsModelId": "solar_electric_offset",
          "incentiveValueMethod": "per_kw",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_e6d636e8ef14fe41_v1",
        "incentiveType": "solar_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "rate_per_kw",
          "amountCentsPerKw": 100000,
          "kwSource": "system_kw"
        },
        "basisPolicy": {
          "basis": "equipment_plus_labor",
          "applicationOrder": 10
        },
        "cap": {
          "maxAmountCents": 250000,
          "maxPercentOfBasis": 0.5
        },
        "confidence": "high",
        "formula": "$1.00 per watt for residential solar PV, capped at $2,500 and 50% of installed cost",
        "evidenceText": "San Marcos distributed generation form lists $1.00/W up to $2,500 for single-family residential customers.",
        "sourceUrlsChecked": [
          "https://sanmarcostx.gov/DocumentCenter/View/5027/Distributed-Generation-Rebate-Program-PDF",
          "https://www.sanmarcostx.gov/3720/Energy-Rebate-Programs"
        ],
        "reasoningNotes": "Matched solar PV terms. Returned residential cap as one candidate.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3727",
    "opportunityName": "City of Sunset Valley - PV Rebate Program",
    "state": "TX",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3727/city-of-sunset-valley-pv-rebate-program",
    "websiteUrl": "https://www.sunsetvalley.gov/residents/community-programs/rebate-programs/solar-rebate-program",
    "applicationUrl": "https://www.sunsetvalley.gov/residents/community-programs/rebate-programs/solar-rebate-program",
    "administrator": "City of Sunset Valley",
    "programType": "Rebate Program",
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
          "TX"
        ],
        "counties": [
          "Travis County"
        ],
        "cities": [
          "Sunset Valley"
        ],
        "utilityTerritories": [
          "Austin Energy"
        ],
        "notes": "Applicant must be a residential customer in Sunset Valley and the system must also qualify for the Austin Energy rebate."
      },
      "eligibleApplicantTypes": [
        "homeowner",
        "residential_property_owner",
        "residential_customer"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "rooftop_solar_pv"
      ],
      "hardRequirements": [
        "Applicant must be a residential customer of the City of Sunset Valley.",
        "Solar installation must be within the City of Sunset Valley.",
        "System must qualify for the Austin Energy rebate.",
        "Application requires Austin Energy rebate documentation and a Sunset Valley permit.",
        "Installation cost must meet the program cost cap."
      ],
      "blockers": [
        "Not available for commercial customers under the cited program page.",
        "Not available outside Sunset Valley.",
        "Do not match solar water heating, storage, or community solar from this PV rebate."
      ],
      "programType": "Rebate Program",
      "administrator": "City of Sunset Valley",
      "applicationUrl": "https://www.sunsetvalley.gov/residents/community-programs/rebate-programs/solar-rebate-program",
      "websiteUrl": "https://www.sunsetvalley.gov/residents/community-programs/rebate-programs/solar-rebate-program",
      "sourceUrlsChecked": [
        "https://www.sunsetvalley.gov/residents/community-programs/rebate-programs/solar-rebate-program"
      ],
      "evidenceText": "Sunset]( Valley’s solar rebate page offers a residential PV rebate and requires the installation to qualify for Austin Energy’s rebate program.",
      "reasoningNotes": "The rooftop solar PV match is supported. The Austin Energy qualification is a hard requirement and should be used to block generic Texas PV matching."
    },
    "existingSimpleRules": [
      {
        "id": "oir_27b3b42af38465b7_v1",
        "incentiveType": "solar_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "rate_per_kw",
          "amountCentsPerKw": 100000,
          "kwSource": "system_kw"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": {
          "maxAmountCents": 300000
        },
        "confidence": "high",
        "formula": "$1.00 per watt for solar PV, capped at $3,000",
        "evidenceText": "Sunset Valley solar rebate page lists \"$1.00 per watt up to $3,000.\"",
        "sourceUrlsChecked": [
          "https://www.sunsetvalley.gov/residents/community-programs/rebate-programs/solar-rebate-program"
        ],
        "reasoningNotes": "Matched photovoltaic terms. $1.00/W equals $1,000/kW.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2794",
    "opportunityName": "CPS Energy - Solar PV Rebate Program",
    "state": "TX",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2794/cps-energy-solar-pv-rebate-program",
    "websiteUrl": "https://www.cpsenergy.com/en/my-home/savenow/solar-photovoltaic-rebate/comm-solar-rebate-incentive-tiers.html",
    "applicationUrl": null,
    "administrator": "CPS Energy",
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
          "TX"
        ],
        "counties": [],
        "cities": [
          "San Antonio"
        ],
        "utilityTerritories": [
          "CPS Energy"
        ],
        "notes": "Available to qualifying CPS Energy service customers under the commercial solar rebate tier."
      },
      "eligibleApplicantTypes": [
        "small_business_customer",
        "school",
        "nonprofit_organization",
        "commercial_electric_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "education",
        "nonprofit"
      ],
      "eligibleRetrofitCategories": [
        "solar_pv_system"
      ],
      "hardRequirements": [
        "Applicant must be an eligible CPS Energy customer.",
        "Commercial small business systems are limited to less than 100 kW AC under the cited tier.",
        "Project must meet CPS Energy solar PV rebate terms and documentation requirements.",
        "Rebate amount is calculated by installed AC wattage and is subject to a project cap.",
        "Funds and program guidelines are subject to change."
      ],
      "blockers": [
        "This commercial tier is not evidence for a residential solar PV match.",
        "Battery storage alone is not supported by this opportunity.",
        "Solar thermal or non-PV renewable equipment is not eligible.",
        "Projects outside CPS Energy service territory are not eligible."
      ],
      "programType": "Rebate",
      "administrator": "CPS Energy",
      "applicationUrl": null,
      "websiteUrl": "https://www.cpsenergy.com/en/my-home/savenow/solar-photovoltaic-rebate/comm-solar-rebate-incentive-tiers.html",
      "sourceUrlsChecked": [
        "https://www.cpsenergy.com/en/my-home/savenow/solar-photovoltaic-rebate/comm-solar-rebate-incentive-tiers.html",
        "https://programs.dsireusa.org/system/program/detail/2794/cps-energy-solar-pv-rebate-program"
      ],
      "evidenceText": "CPS Energy lists solar photovoltaic rebate tiers for small businesses, schools, and nonprofits, with incentives based on installed AC wattage.",
      "reasoningNotes": "The deterministic solar PV match is correct, but should be limited to eligible CPS Energy commercial, school, and nonprofit applicants for the cited page."
    },
    "existingSimpleRules": [
      {
        "id": "oir_4a3d18bff1e6f87c_v1",
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
          "maxAmountCents": 8000000,
          "maxPercentOfBasis": 0.5
        },
        "confidence": "medium",
        "formula": "$0.60 per AC watt for first 25 kW of qualifying commercial solar, capped at $80,000 and 50% of invoice cost",
        "evidenceText": "CPS Energy commercial solar incentives list $0.60/W for first 25 kW and $0.40/W thereafter.",
        "sourceUrlsChecked": [
          "https://www.cpsenergy.com/en/my-home/savenow/solar-photovoltaic-rebate/comm-solar-rebate-incentive-tiers.html",
          "https://www.cpsenergy.com/content/dam/corporate/en/Documents/EnergyEfficiency/solar-programs-general-terms-conditions.pdf"
        ],
        "reasoningNotes": "Residential solar rebate ended; this rule applies only to current commercial/school/nonprofit rooftop solar incentive tiers.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22595",
    "opportunityName": "U.S. Virgin Islands - Equitable E-Mobility Rebate Program",
    "state": "VI",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22595/u-s-virgin-islands-equitable-e-mobility-rebate-program",
    "websiteUrl": "https://energy.vi.gov/eem/",
    "applicationUrl": "https://app.smartsheet.com/b/form/0196260d0f937da4a1c0925cbdd82e5d",
    "administrator": "Virgin Islands Energy Office",
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
          "VI"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [],
        "notes": "U.S. Virgin Islands residents, small businesses, and nonprofits, subject to program funding and application rules."
      },
      "eligibleApplicantTypes": [
        "resident",
        "small_business",
        "nonprofit"
      ],
      "eligibleSectors": [
        "residential",
        "small_business",
        "nonprofit"
      ],
      "eligibleRetrofitCategories": [
        "electric_vehicle_purchase",
        "fuel_cell_vehicle_purchase",
        "electric_bicycle_purchase"
      ],
      "hardRequirements": [
        "Applicant must meet U.S. Virgin Islands residency, small business, or nonprofit eligibility rules.",
        "Eligible BEVs must satisfy price, model-year, mileage, title, dealership, and ownership-retention requirements.",
        "E-bike purchases must be from a VIEO-approved local vendor where applicable; funds are subject to availability."
      ],
      "blockers": [
        "ev_charger_installation is not part of the current Equitable E-Mobility rebate and should not match.",
        "Government purchases, dealer/manufacturer applicants, and vehicles outside price, mileage, title, or model-year limits are ineligible.",
        "Home charging recommendations are separate from this rebate and do not create charging-equipment eligibility."
      ],
      "programType": "Vehicle Rebate",
      "administrator": "Virgin Islands Energy Office",
      "applicationUrl": "https://app.smartsheet.com/b/form/0196260d0f937da4a1c0925cbdd82e5d",
      "websiteUrl": "https://energy.vi.gov/eem/",
      "sourceUrlsChecked": [
        "https://energy.vi.gov/eem/",
        "https://energy.vi.gov/wp-content/uploads/2025/11/EM-Rebate-Application-SEP-BIL_Nov-3rd_Draft_v2.pdf",
        "https://app.smartsheet.com/b/form/0196260d0f937da4a1c0925cbdd82e5d"
      ],
      "evidenceText": "Current]( VIEO materials offer rebates for eligible battery-electric vehicles and e-bikes, with applicant and vehicle limits; they do not provide charger rebates.",
      "reasoningNotes": "The original EV charger match is a false positive; the opportunity is a clean transportation purchase rebate."
    },
    "existingSimpleRules": [
      {
        "id": "oir_1020e4fe5383aada_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 750000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "$7,500 per approved new or used electric vehicle",
        "evidenceText": "Virgin Islands Energy Office program materials list a $7,500 rebate for approved new or used EVs.",
        "sourceUrlsChecked": [
          "https://energy.vi.gov/equitable-e-mobility-rebate-program/",
          "https://energy.vi.gov/"
        ],
        "reasoningNotes": "Matched vehicle fuel-replacement target. Confidence is medium because eligibility and approval control final payment.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3232",
    "opportunityName": "Columbia Rural Electric Association - Agriculture Energy Efficiency Rebate Program",
    "state": "WA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3232/columbia-rural-electric-association-agriculture-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.columbiarea.coop/energy-efficiency/rebate-offers/",
    "applicationUrl": "https://www.columbiarea.coop/wp-content/uploads/Variable-Frequency-Drives-10012025.pdf",
    "administrator": "Columbia Rural Electric Association",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
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
          "Columbia Rural Electric Association service territory"
        ],
        "notes": "Measures must be installed at an address served by Columbia REA."
      },
      "eligibleApplicantTypes": [
        "agricultural_customer",
        "electric_cooperative_member",
        "farm_operator"
      ],
      "eligibleSectors": [
        "agricultural"
      ],
      "eligibleRetrofitCategories": [
        "variable_frequency_drive_retrofit",
        "agricultural_irrigation_pump_upgrade",
        "irrigation_system_upgrade"
      ],
      "hardRequirements": [
        "Project must be served by Columbia REA.",
        "Pre-approval is required for applicable agriculture rebates.",
        "VFD rebates apply to qualifying turbine or centrifugal irrigation pumps within listed horsepower ranges.",
        "Equipment and installation must meet program technical requirements and documentation rules.",
        "Offers are subject to funding availability and current program-year deadlines."
      ],
      "blockers": [
        "Do not match residential, commercial, or industrial non-agricultural VFD projects to this agriculture rebate.",
        "Do not generalize irrigation measures to general plumbing or water conservation retrofits.",
        "Rebates are capped by program rules and may close when funds are exhausted."
      ],
      "programType": "Rebate Program",
      "administrator": "Columbia Rural Electric Association",
      "applicationUrl": "https://www.columbiarea.coop/wp-content/uploads/Variable-Frequency-Drives-10012025.pdf",
      "websiteUrl": "https://www.columbiarea.coop/energy-efficiency/rebate-offers/",
      "sourceUrlsChecked": [
        "https://www.columbiarea.coop/energy-efficiency/rebate-offers/",
        "https://www.columbiarea.coop/wp-content/uploads/Variable-Frequency-Drives-10012025.pdf",
        "https://www.columbiarea.coop/wp-content/uploads/Agricultural_Pump_Efficiency_Upgrade-10012025.pdf",
        "https://www.columbiarea.coop/wp-content/uploads/Irrigation-System-Upgrades-Rebate-Application-10012025.pdf"
      ],
      "evidenceText": "Columbia]( REA agriculture rebate applications support VFDs, agricultural pump upgrades, and irrigation system upgrades for served agricultural customers, subject to pre-approval and funding.",
      "reasoningNotes": "The VFD match is supported, but it must be constrained to agricultural irrigation pump applications in Columbia REA territory."
    },
    "existingSimpleRules": [
      {
        "id": "oir_18b2212a59543941_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 9500,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$95 per approved horsepower for agricultural pump VFD upgrades",
        "evidenceText": "Columbia REA agricultural pump/VFD application lists $95 per approved horsepower for VFDs.",
        "sourceUrlsChecked": [
          "https://www.columbiarea.coop/energy-efficiency/rebate-offers/",
          "https://www.columbiarea.coop/wp-content/uploads/Agricultural_Pump_Efficiency_Upgrade-10012025.pdf"
        ],
        "reasoningNotes": "Matched VFD term. Use unit_count as approved pump horsepower.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:740",
    "opportunityName": "Residential and Commercial Solar Rebate Program",
    "state": "WI",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/740/residential-and-commercial-solar-rebate-program",
    "websiteUrl": "https://focusonenergy.com/residential/solar-for-homes",
    "applicationUrl": null,
    "administrator": "Focus on Energy",
    "programType": "Rebate Program",
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
          "WI"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Focus on Energy participating electric utilities"
        ],
        "notes": "Available to eligible customers of participating Wisconsin Focus on Energy utilities."
      },
      "eligibleApplicantTypes": [
        "homeowners",
        "multifamily_property_owners",
        "business_customers",
        "nonprofit_customers",
        "government_customers"
      ],
      "eligibleSectors": [
        "residential",
        "multifamily",
        "commercial",
        "industrial",
        "public",
        "nonprofit"
      ],
      "eligibleRetrofitCategories": [
        "rooftop_solar_pv",
        "solar_pv_system"
      ],
      "hardRequirements": [
        "Customer must be served by a participating Focus on Energy electric utility.",
        "Solar PV system must be grid-tied and installed behind the customer's meter.",
        "Residential incentives require qualified equipment, installer documentation, warranty, and application deadlines.",
        "Business solar PV incentives have separate business incentive rules and caps."
      ],
      "blockers": [
        "Do not match battery storage; Focus solar PV incentives do not make batteries eligible in this opportunity.",
        "Do not merge separate business custom renewable incentives into residential Solar for Homes matching.",
        "Funding and deadlines are program-year specific and first-come, first-served."
      ],
      "programType": "Rebate Program",
      "administrator": "Focus on Energy",
      "applicationUrl": null,
      "websiteUrl": "https://focusonenergy.com/residential/solar-for-homes",
      "sourceUrlsChecked": [
        "https://programs.dsireusa.org/system/program/detail/740/residential-and-commercial-solar-rebate-program",
        "https://focusonenergy.com/residential/solar-for-homes",
        "https://focusonenergy.com/business/renewables"
      ],
      "evidenceText": "Focus]( on Energy lists residential Solar for Homes incentives for solar electric PV and business renewable incentives for solar PV projects, subject to participating utility and program requirements.",
      "reasoningNotes": "The solar PV match is correct. Use utility-territory and sector constraints to distinguish residential Solar for Homes from business renewable incentives."
    },
    "existingSimpleRules": [
      {
        "id": "oir_4d53859497724591_v1",
        "incentiveType": "fixed_per_unit_rebate",
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
        "cap": null,
        "confidence": "high",
        "formula": "$600 per kW",
        "evidenceText": "2026 Online Application 2026 Print Application Rebates Equipment Eligibility Educational Materials Terms & Requirements Residential Customer Solar PV Rebates Household Rebate Single-Family Home $600 per kW, up to $2,400 Rebates are for installing a qualifying solar electric system",
        "sourceUrlsChecked": [
          "https://focusonenergy.com/residential/solar-for-homes"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22650",
    "opportunityName": "Wisconsin - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
    "state": "WI",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22650/wisconsin-national-electric-vehicle-infrastructure-nevi-formula-grant-program",
    "websiteUrl": "https://wisconsindot.gov/Pages/projects/multimodal/electrification.aspx",
    "applicationUrl": "https://wisconsindot.gov/Pages/projects/multimodal/electrification.aspx",
    "administrator": "Wisconsin Department of Transportation",
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
          "WI"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [],
        "notes": "WEVI projects are corridor-based in Wisconsin and tied to NEVI Alternative Fuel Corridors or additional Connecting Corridors."
      },
      "eligibleApplicantTypes": [
        "charging_site_host",
        "business_customer",
        "public_entity",
        "private_entity",
        "tribal_entity",
        "nonprofit_organization"
      ],
      "eligibleSectors": [
        "transportation",
        "commercial",
        "public",
        "tribal",
        "nonprofit"
      ],
      "eligibleRetrofitCategories": [
        "public_dc_fast_ev_charging_station",
        "ev_charging_infrastructure"
      ],
      "hardRequirements": [
        "Project must meet NEVI and Wisconsin Electric Vehicle Infrastructure program requirements.",
        "Eligible projects must involve installation, ownership, operation, and maintenance of NEVI-compliant charging infrastructure.",
        "Federal funding is generally limited to 80 percent with required non-federal match.",
        "Projects must meet applicable federal corridor, procurement, labor, accessibility, and technical standards.",
        "For the 2026 Connecting Corridors round, applications are due by the WisDOT deadline."
      ],
      "blockers": [
        "Do not match residential Level 2 charging.",
        "Do not match EV purchase incentives.",
        "Do not match utility make-ready programs unless they are part of an eligible WEVI project."
      ],
      "programType": "Grant Program",
      "administrator": "Wisconsin Department of Transportation",
      "applicationUrl": "https://wisconsindot.gov/Pages/projects/multimodal/electrification.aspx",
      "websiteUrl": "https://wisconsindot.gov/Pages/projects/multimodal/electrification.aspx",
      "sourceUrlsChecked": [
        "https://wisconsindot.gov/Pages/projects/multimodal/electrification.aspx"
      ],
      "evidenceText": "WisDOT describes WEVI as competitive NEVI funding for eligible entities to install, own, operate, and maintain NEVI-compliant EV charging stations.",
      "reasoningNotes": "The EV charging match is correct and should be limited to public corridor fast-charging infrastructure under NEVI and WEVI rules."
    },
    "existingSimpleRules": [
      {
        "id": "oir_778844e961dc7f31_v1",
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
          "https://wisconsindot.gov/Pages/projects/multimodal/electrification.aspx"
        ],
        "reasoningNotes": "Modeled as possible grant money, not deterministic one-time savings, because award selection and approved eligible cost are project-specific.",
        "mapping": null
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4637",
    "opportunityName": "Avista Utilities (Gas) - Commercial Energy Efficiency Incentives Program",
    "state": "WA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4637/avista-utilities-gas-commercial-energy-efficiency-incentives-program",
    "websiteUrl": "https://www.myavista.com/energy-savings/energy-saving-programs-services-for-your-business/rebates-washington",
    "applicationUrl": null,
    "administrator": "Avista Utilities",
    "programType": "utility business energy efficiency rebate and custom incentive program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 20,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "demand_controlled_ventilation",
        "displayName": "Demand-controlled ventilation",
        "parentCategory": "indoor_air_quality_ventilation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "demand controlled ventilation"
        ]
      },
      {
        "retrofitTypeId": "door_gasket_strip_curtain_night_cover",
        "displayName": "Door gasket / strip curtain / night cover retrofit",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "door gasket"
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
        "retrofitTypeId": "high_efficiency_fryer",
        "displayName": "High-efficiency fryer",
        "parentCategory": "commercial_kitchen_foodservice",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "fryer"
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
        "retrofitTypeId": "high_efficiency_refrigeration_equipment",
        "displayName": "High-efficiency refrigeration equipment",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "refrigeration",
          "freezer",
          "display case"
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
          "led lighting",
          "led fixture",
          "led lamp",
          "lighting retrofit"
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
          "lighting controls",
          "occupancy sensor",
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
      },
      {
        "retrofitTypeId": "refrigeration_controls_retrofit",
        "displayName": "Refrigeration controls retrofit",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "floating head pressure"
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
          "evaporator fan"
        ]
      },
      {
        "retrofitTypeId": "walk_in_cooler_freezer_upgrade",
        "displayName": "Walk-in cooler/freezer upgrade",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "walk in cooler",
          "walk in freezer"
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
          "Avista Utilities Washington electric and/or natural gas service territory"
        ],
        "notes": "Official Avista page covers Washington business rebates for electricity and natural gas; fuel-specific eligibility depends on the measure."
      },
      "eligibleApplicantTypes": [
        "commercial",
        "industrial",
        "nonprofit",
        "government",
        "school"
      ],
      "eligibleSectors": [
        "business",
        "commercial",
        "industrial",
        "foodservice",
        "grocery",
        "small business"
      ],
      "eligibleRetrofitCategories": [
        "lighting",
        "HVAC / heat pump",
        "heat pump water heater",
        "insulation / air sealing",
        "refrigeration",
        "motors / VFD",
        "design assistance / study",
        "commercial foodservice",
        "compressed air leak reduction",
        "custom/site-specific energy efficiency",
        "pay-for-performance energy savings"
      ],
      "hardRequirements": [
        "Applicant must be an Avista business customer in Washington.",
        "Fuel and utility service eligibility vary by measure; some measures require electric service and others require natural gas service.",
        "Small business lighting is limited to customers on Avista rate schedules 11 or 12.",
        "Site-specific/custom projects require contacting Avista before purchasing equipment or beginning construction.",
        "Site-specific/custom incentives are not available for projects already under construction or developed without Avista involvement."
      ],
      "blockers": [
        "This DSIRE target is gas-specific, but the official current page combines electric and natural gas rebates; fuel-specific measure matching requires application-level review."
      ],
      "programType": "utility business energy efficiency rebate and custom incentive program",
      "administrator": "Avista Utilities",
      "applicationUrl": null,
      "websiteUrl": "https://www.myavista.com/energy-savings/energy-saving-programs-services-for-your-business/rebates-washington",
      "sourceUrlsChecked": [
        "https://www.myavista.com/energy-savings/tools-for-your-business/rebates-washington",
        "https://www.myavista.com/energy-savings/energy-saving-programs-services-for-your-business/rebates-washington"
      ],
      "evidenceText": "Avista lists Washington business rebates for foodservice, lighting, HVAC/water heating, insulation, grocer refrigeration, green motors, compressed air, pay-for-performance, and site-specific projects.",
      "reasoningNotes": "Official source confirms current business rebate categories, but the program is not purely gas-only on the current administrator page."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Avista commercial gas/electric incentives are measure- and state-specific; no whole-building per-kWh formula was verified.",
        "sourceUrlsChecked": [
          "https://www.myavista.com/energy-savings/tools-for-your-business/rebates-washington"
        ],
        "reasoningNotes": "The target has many matched measures; later pass should extract a current table.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4197",
    "opportunityName": "North Shore Gas - Commercial & Industrial Prescriptive Rebate Program",
    "state": "IL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4197/north-shore-gas-commercial-and-industrial-prescriptive-rebate-program",
    "websiteUrl": "https://www.northshoregasdelivery.com/savings/business/rebates-ci",
    "applicationUrl": "https://www.northshoregasdelivery.com/savings/business/pdf/prescriptive.pdf",
    "administrator": "North Shore Gas",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 19,
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
          "boiler controls",
          "burner",
          "boiler reset"
        ]
      },
      {
        "retrofitTypeId": "demand_controlled_kitchen_ventilation",
        "displayName": "Demand-controlled kitchen ventilation",
        "parentCategory": "commercial_kitchen_foodservice",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "kitchen ventilation"
        ]
      },
      {
        "retrofitTypeId": "demand_controlled_ventilation",
        "displayName": "Demand-controlled ventilation",
        "parentCategory": "indoor_air_quality_ventilation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "demand controlled ventilation",
          "dcv"
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
        "retrofitTypeId": "high_efficiency_fryer",
        "displayName": "High-efficiency fryer",
        "parentCategory": "commercial_kitchen_foodservice",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "fryer"
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
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "hvac replacement",
          "chiller"
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
        "retrofitTypeId": "high_efficiency_steamer",
        "displayName": "High-efficiency steamer",
        "parentCategory": "commercial_kitchen_foodservice",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "steamer"
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
          "economizer"
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
        "retrofitTypeId": "low_flow_fixture_retrofit",
        "displayName": "Low-flow fixture retrofit",
        "parentCategory": "water_efficiency",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "low flow",
          "aerator"
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
          "programmable thermostat",
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
          "variable speed drive"
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
          "IL"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "North Shore Gas"
        ],
        "notes": "North Shore Gas service territory; current prescriptive application also references Peoples Gas and North Shore Gas service territories."
      },
      "eligibleApplicantTypes": [
        "business_customer",
        "commercial_customer",
        "industrial_customer",
        "public_sector_customer",
        "small_business_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "public_sector",
        "small_business"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_boiler_retrofit",
        "high_efficiency_furnace_retrofit",
        "boiler_controls_burner_retrofit",
        "boiler_economizer",
        "boiler_tune_up",
        "rooftop_unit_tune_up",
        "steam_pipe_insulation",
        "steam_trap_replacement",
        "demand_controlled_kitchen_ventilation",
        "high_efficiency_commercial_dishwasher",
        "high_efficiency_fryer",
        "high_efficiency_oven",
        "high_efficiency_steamer",
        "demand_controlled_ventilation",
        "destratification_fan",
        "waste_heat_recovery",
        "dock_seal",
        "industrial_process_pipe_tank_insulation",
        "combined_heat_and_power",
        "hvac_optimization"
      ],
      "hardRequirements": [
        "Applicant must be an eligible North Shore Gas business customer in the applicable service territory.",
        "Prescriptive projects require preapproval before purchase or installation.",
        "Equipment must be new, installed, and operational in a qualifying private or public-sector facility."
      ],
      "blockers": [
        "Chillers, broad HVAC replacement, residential equipment, and electric-only measures should not match this gas program unless separately approved as custom gas-saving projects.",
        "low_flow_fixture_retrofit, high_efficiency_laundry_equipment, and broad envelope insulation were not verified in current official C&I sources checked.",
        "Commercial kitchen eligibility should be limited to listed high-efficiency foodservice equipment."
      ],
      "programType": "Rebate",
      "administrator": "North Shore Gas",
      "applicationUrl": "https://www.northshoregasdelivery.com/savings/business/pdf/prescriptive.pdf",
      "websiteUrl": "https://www.northshoregasdelivery.com/savings/business/rebates-ci",
      "sourceUrlsChecked": [
        "https://www.northshoregasdelivery.com/savings/business/rebates-ci",
        "https://www.northshoregasdelivery.com/savings/business/pdf/prescriptive.pdf",
        "https://www.northshoregasdelivery.com/savings/business/rebates",
        "https://www.northshoregasdelivery.com/savings/business/rebates-direct"
      ],
      "evidenceText": "North]( Shore Gas lists C&I rebates for boiler and furnace work, steam measures, kitchen hood controls, commercial kitchen equipment, and custom gas-saving projects.",
      "reasoningNotes": "Keep gas C&I measures and commercial kitchen categories; remove electric or broad water/envelope categories not supported by current official pages."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Official commercial rebate materials confirm prescriptive incentives but did not expose current target measure values.",
        "sourceUrlsChecked": [
          "https://www.northshoregasdelivery.com/savings/rebates-business"
        ],
        "reasoningNotes": "Matched gas and kitchen measures require exact application table values.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4559",
    "opportunityName": "Santee Cooper - Commercial Energy Efficiency Rebate Program",
    "state": "SC",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4559/santee-cooper-commercial-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.santeecooper.com/programs-incentives/empowerbusiness/",
    "applicationUrl": "https://www.santeecooper.com/Programs-Incentives/EmpowerBusiness/_pdfs/Commercial-Prescriptive-Rebate-Application.pdf",
    "administrator": "Santee Cooper",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 19,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "demand_controlled_ventilation",
        "displayName": "Demand-controlled ventilation",
        "parentCategory": "indoor_air_quality_ventilation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "demand controlled ventilation"
        ]
      },
      {
        "retrofitTypeId": "efficient_ventilation_system",
        "displayName": "Efficient ventilation system",
        "parentCategory": "indoor_air_quality_ventilation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "ventilation system"
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
          "air conditioner"
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
        "retrofitTypeId": "high_efficiency_refrigeration_equipment",
        "displayName": "High-efficiency refrigeration equipment",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "refrigeration",
          "refrigerator",
          "freezer"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_steamer",
        "displayName": "High-efficiency steamer",
        "parentCategory": "commercial_kitchen_foodservice",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "steamer"
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
          "economizer"
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
          "led lighting",
          "lighting retrofit"
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
      },
      {
        "retrofitTypeId": "low_flow_fixture_retrofit",
        "displayName": "Low-flow fixture retrofit",
        "parentCategory": "water_efficiency",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "fixture",
          "aerator",
          "showerhead"
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
          "SC"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Santee Cooper"
        ],
        "notes": "Commercial customers served under eligible Santee Cooper electric commercial rate schedules."
      },
      "eligibleApplicantTypes": [
        "commercial_electric_customer",
        "business_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "institutional",
        "public_sector",
        "hospitality",
        "foodservice",
        "retail"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "heat_pump_hvac_retrofit",
        "high_efficiency_hvac_replacement",
        "variable_refrigerant_flow_system",
        "hvac_controls_retrofit",
        "energy_management_system",
        "domestic_hot_water_controls",
        "heat_pump_water_heater",
        "high_efficiency_water_heater",
        "drain_water_heat_recovery",
        "led_display_case_lighting",
        "refrigeration_ec_motor_retrofit",
        "refrigerant_suction_line_insulation",
        "residential_style_refrigerator_freezer",
        "high_efficiency_commercial_dishwasher",
        "high_efficiency_oven",
        "high_efficiency_steamer",
        "high_efficiency_commercial_kitchen_equipment",
        "demand_controlled_kitchen_ventilation",
        "low_flow_aerator",
        "pipe_insulation",
        "variable_frequency_drive_retrofit",
        "variable_speed_pool_pump",
        "smart_thermostat_zoning_retrofit",
        "efficient_pump_motor_retrofit"
      ],
      "hardRequirements": [
        "Customer must be on an eligible Santee Cooper commercial electric rate schedule.",
        "Measure must be listed in the current Commercial Prescriptive Program manual and meet equipment qualifications.",
        "Lighting and non-lighting measures use separate workbooks/applications and deadlines."
      ],
      "blockers": [
        "Envelope insulation_upgrade is not supported by the current commercial prescriptive manual checked.",
        "efficient_ventilation_system should be limited to supported HVAC controls, energy recovery, or kitchen hood control measures.",
        "waste_heat_recovery should be narrowed to listed drain-water or other explicitly approved heat-recovery measures."
      ],
      "programType": "Rebate",
      "administrator": "Santee Cooper",
      "applicationUrl": "https://www.santeecooper.com/Programs-Incentives/EmpowerBusiness/_pdfs/Commercial-Prescriptive-Rebate-Application.pdf",
      "websiteUrl": "https://www.santeecooper.com/programs-incentives/empowerbusiness/",
      "sourceUrlsChecked": [
        "https://www.santeecooper.com/programs-incentives/empowerbusiness/",
        "https://www.santeecooper.com/Programs-Incentives/EmpowerBusiness/_pdfs/Commercial-Prescriptive-Program-Manual.pdf",
        "https://www.santeecooper.com/Programs-Incentives/EmpowerBusiness/_pdfs/Commercial-Prescriptive-Rebate-Application.pdf",
        "https://www.santeecooper.com/programs-incentives/empowerbusiness/hvac-improvements/"
      ],
      "evidenceText": "Santee]( Cooper's 2026 commercial manual lists lighting, HVAC, controls, domestic hot water, refrigeration, kitchen, pump, motor, aerator, and pipe-insulation measures.",
      "reasoningNotes": "Keep commercial prescriptive measures, but remove envelope insulation and avoid broad ventilation or heat-recovery generalizations."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Santee Cooper business rebate pages describe many efficiency offers but no single C&I per-kWh formula was verified for the broad target.",
        "sourceUrlsChecked": [
          "https://www.santeecooper.com/Save-Energy-Money/For-My-Business/Index.aspx",
          "https://www.santeecooper.com/"
        ],
        "reasoningNotes": "The target includes lighting, HVAC, refrigeration, water fixtures, food service and controls; measure table extraction is needed.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5737",
    "opportunityName": "Energize Connecticut Residential and Commercial Rebates",
    "state": "CT",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5737/energize-connecticut-residential-and-commercial-rebates",
    "websiteUrl": "https://www.energizect.com/rebates-and-incentives",
    "applicationUrl": null,
    "administrator": "Energize Connecticut utility sponsors",
    "programType": "Rebate Portal",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 18,
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
          "duct sealing"
        ]
      },
      {
        "retrofitTypeId": "efficient_ice_machine",
        "displayName": "Efficient ice machine",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "ice machine"
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
        "retrofitTypeId": "high_efficiency_commercial_dishwasher",
        "displayName": "High-efficiency commercial dishwasher",
        "parentCategory": "commercial_kitchen_foodservice",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "commercial dishwasher",
          "dishwasher"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_fryer",
        "displayName": "High-efficiency fryer",
        "parentCategory": "commercial_kitchen_foodservice",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "fryer"
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
          "gas water heater",
          "condensing water heater"
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
          "CT"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Eversource",
          "United Illuminating",
          "Connecticut Natural Gas",
          "Southern Connecticut Gas"
        ],
        "notes": "Energize Connecticut portal aggregates multiple sponsor utility programs; eligibility depends on customer utility, fuel, building type, and measure."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "income_eligible_resident",
        "commercial_customer",
        "business_customer",
        "multifamily_property_owner"
      ],
      "eligibleSectors": [
        "residential",
        "commercial",
        "multifamily",
        "small_business",
        "foodservice",
        "income_eligible_residential"
      ],
      "eligibleRetrofitCategories": [
        "air_sealing_weatherization",
        "insulation_upgrade",
        "duct_sealing_and_insulation",
        "window_replacement",
        "heat_pump_hvac_retrofit",
        "ground_source_geothermal_heat_pump",
        "high_efficiency_hvac_replacement",
        "high_efficiency_boiler_retrofit",
        "high_efficiency_furnace_retrofit",
        "heat_pump_water_heater",
        "high_efficiency_gas_water_heater",
        "residential_refrigerator_freezer_replacement",
        "residential_clothes_washer",
        "efficient_ice_machine",
        "high_efficiency_commercial_dishwasher",
        "high_efficiency_fryer",
        "high_efficiency_oven",
        "high_efficiency_steamer",
        "induction_cooking_equipment",
        "smart_thermostat_zoning_retrofit"
      ],
      "hardRequirements": [
        "Applicant must qualify under the specific Energize Connecticut sponsor utility and measure program.",
        "Residential window replacement is limited to eligible pathways, such as ENERGY STAR windows replacing single-pane windows for income-eligible customers.",
        "Commercial foodservice and residential appliance measures use separate program rules and application pathways."
      ],
      "blockers": [
        "Do not infer EV charging, solar, battery, or demand response from related resource pages unless a separate current program is selected.",
        "window_replacement must not be matched from window air conditioners; it is only supported under narrow income-eligible window criteria.",
        "Residential appliance rebates are not commercial kitchen equipment unless the current commercial foodservice incentive specifically lists the equipment."
      ],
      "programType": "Rebate Portal",
      "administrator": "Energize Connecticut utility sponsors",
      "applicationUrl": null,
      "websiteUrl": "https://www.energizect.com/rebates-and-incentives",
      "sourceUrlsChecked": [
        "https://www.energizect.com/rebates-and-incentives",
        "https://www.energizect.com/",
        "https://www.energizect.com/rebates-incentives/foodservice",
        "https://www.energizect.com/rebates-incentives/heating-cooling/heat-pumps/residential-air-source",
        "https://www.energizect.com/energy-evaluations/income-eligible-options",
        "https://www.energizect.com/multifamily"
      ],
      "evidenceText": "Energize]( Connecticut is a multi-program portal with residential and business incentives for insulation, heat pumps, appliances, foodservice equipment, weatherization, and narrow income-eligible window replacement.",
      "reasoningNotes": "Because this is an umbrella portal, matching should check the measure-specific sponsor page instead of treating every listed technology as universally available."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "source_inaccessible",
        "confidence": "low",
        "evidenceText": "EnergizeCT rebate listings were dynamic/inaccessible and did not expose exact refrigeration measure values.",
        "sourceUrlsChecked": [
          "https://energizect.com/rebates-and-incentives"
        ],
        "reasoningNotes": "Target spans many residential and commercial measures; official measure table extraction is needed.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1939",
    "opportunityName": "Elk River Municipal Utilities - Residential Energy Efficiency Rebate Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1939/elk-river-municipal-utilities-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.ermumn.com/programs-rebates/residential-rebates",
    "applicationUrl": null,
    "administrator": "Elk River Municipal Utilities",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 18,
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
        "retrofitTypeId": "high_efficiency_toilet_urinal",
        "displayName": "High-efficiency toilet / urinal replacement",
        "parentCategory": "water_efficiency",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "toilet"
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
        "retrofitTypeId": "smart_irrigation_controller",
        "displayName": "Smart irrigation controller",
        "parentCategory": "water_efficiency",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "smart irrigation",
          "irrigation controller"
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
          "MN"
        ],
        "counties": [
          "Sherburne"
        ],
        "cities": [
          "Elk River"
        ],
        "utilityTerritories": [
          "Elk River Municipal Utilities electric service territory",
          "Elk River Municipal Utilities water service territory for water conservation measures"
        ],
        "notes": "Residential rebates are available as account bill credits for qualifying ERMU customers; water conservation measures require applicable water-service eligibility."
      },
      "eligibleApplicantTypes": [
        "Elk River Municipal Utilities residential electric customers",
        "Elk River Municipal Utilities residential water customers for water measures",
        "homeowners",
        "residential property owners",
        "renters with owner approval where applicable",
        "residential EV charger customers"
      ],
      "eligibleSectors": [
        "residential",
        "transportation electrification",
        "residential water conservation"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "high_efficiency_hvac_replacement",
        "heat_pump_hvac_retrofit",
        "smart_thermostat_zoning_retrofit",
        "high_efficiency_furnace_retrofit",
        "efficient_fan_blower_replacement",
        "ground_source_geothermal_heat_pump",
        "heat_pump_water_heater",
        "high_efficiency_refrigeration_equipment",
        "ev_charger_installation",
        "level_2_ev_charger_installation",
        "high_efficiency_laundry_equipment",
        "high_efficiency_residential_dishwasher",
        "low_flow_fixture_retrofit",
        "smart_irrigation_controller"
      ],
      "hardRequirements": [
        "Applicant must be an ERMU residential customer for the applicable electric or water measure.",
        "Residential rebates are issued as bill credits and require current ERMU rebate application documentation.",
        "HVAC equipment must meet listed efficiency specifications for central air conditioners, mini-split or room units, qualifying heat pumps, geothermal heat pumps, or replacement furnaces with ECM blower motors.",
        "Heat pump water heater and ENERGY STAR appliance rebates require qualifying equipment.",
        "EV charger rebates are limited to qualifying residential 240-volt hardwired chargers and require compliance with ERMU metering, circuit, inspection, and charging-service requirements.",
        "Water conservation measures such as WaterSense fixtures or irrigation controls require applicable ERMU water customer eligibility and listed product requirements."
      ],
      "blockers": [
        "window_replacement is a false positive where the source supports room or window air conditioners; do not treat window AC as building window replacement.",
        "EV charging is residential 240-volt or Level 2 only; do not match DC fast charging or public/commercial charging.",
        "Furnace matches should be limited to replacement furnaces with qualifying ECM blower motors where supported, not broad gas furnace upgrades.",
        "Refrigerator, freezer, dishwasher, clothes washer, fixture, and irrigation categories are product-specific appliance or water-conservation rebates and should not be generalized to commercial kitchen or whole-building water retrofit projects.",
        "Do not infer commercial ERMU rebates from this residential record."
      ],
      "programType": "Rebate Program",
      "administrator": "Elk River Municipal Utilities",
      "applicationUrl": null,
      "websiteUrl": "https://www.ermumn.com/programs-rebates/residential-rebates",
      "sourceUrlsChecked": [
        "https://programs.dsireusa.org/system/program/detail/1939/elk-river-municipal-utilities-residential-energy-efficiency-rebate-program",
        "https://www.ermumn.com/programs-rebates/residential-rebates",
        "https://www.ermumn.com/programs-rebates/residential-rebates/hvac-equipment",
        "https://www.ermumn.com/programs-rebates/residential-rebates/heat-pumps",
        "https://www.ermumn.com/programs-rebates/residential-rebates/electric-vehicle-charger"
      ],
      "evidenceText": "ERMU's current residential rebates page lists account-credit rebate categories for appliances and home efficiency, EV chargers, heat pumps, HVAC equipment, lighting and controls, and yard tools. Current HVAC and heat pump pages support central AC, mini-splits, room/window AC, replacement furnaces with ECM blower motors, air-source heat pumps, cold-climate heat pumps, ground-source heat pumps, and heat pump water heaters. The EV charger page supports qualifying residential 240-volt chargers.",
      "reasoningNotes": "The repair keeps ERMU residential electric, appliance, HVAC, heat pump, HPWH, lighting, water-conservation, and residential EV charger categories. It blocks the window-replacement false positive caused by window air conditioner wording."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Elk River municipal rebate forms cover many residential measures, but current EV charger amount was not verified.",
        "sourceUrlsChecked": [
          "https://www.elkrivermn.gov/1568/Rebates",
          "https://www.brightenergysolutions.com/find-a-rebate/"
        ],
        "reasoningNotes": "Primary target is EV charging; a utility-specific Level 2 rebate table should be selected before creating a rule.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "ev_charging_site_load",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null
        }
      }
    ]
  }
]
