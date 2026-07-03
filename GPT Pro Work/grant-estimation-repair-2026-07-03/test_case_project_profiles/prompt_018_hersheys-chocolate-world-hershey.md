You are helping RetroFi create realistic synthetic project-profile data for grant estimation tests.

Prompt 18 of 50.

This is NOT source research for grant formulas. This is project/test-case enrichment. Use the supplied test-case facts, public/common-sense building assumptions, and realistic project planning assumptions. You may use the organization's public website only for basic context, but do not invent that a project qualifies for a grant just to make the estimate positive.

## Goal

Add realistic synthetic project-profile inputs for this test case so Codex can calculate or suppress grant estimates. The profile should look like a real customer record: some projects should qualify, some should not, some should need quote data, and some should have uncertainty.

Do not make every grant barely qualify. If the organization/building/project would not normally pursue a grant, mark that honestly.

## Current Test Case Context

```json
{
  "sampleUserId": "hersheys-chocolate-world-hershey",
  "description": "Hershey visitor attraction with retail, food service, events, and refrigeration loads, distinct from manufacturing.",
  "sourceForm": {
    "sampleUserId": "hersheys-chocolate-world-hershey",
    "description": "Hershey visitor attraction with retail, food service, events, and refrigeration loads, distinct from manufacturing.",
    "companyName": "Hershey's Chocolate World - Hershey",
    "website": "https://www.chocolateworld.com/",
    "organizationType": "Commercial Business",
    "organizationSize": "251-1,000 employees",
    "siteAddress": "101 Chocolate World Way, Hershey, PA 17033, USA",
    "electricUtilityProvider": "PPL Electric Utilities",
    "gasUtilityProvider": "UGI Utilities",
    "ownershipStatus": "Not sure",
    "buildingType": "Retail / Storefront",
    "squareFootage": "100,000",
    "primaryActivityText": "Chocolate-themed visitor attraction, retail, food service, events, and brand experiences",
    "naicsCodes": [
      "713110",
      "445292",
      "722511"
    ],
    "publicSourceNotes": "Hershey's Chocolate World lists 101 Chocolate World Way. Floor area is estimated for matching tests.",
    "notes": "Tests visitor/retail/food-service classification where parent manufacturing company context should not make the site industrial.",
    "project": {
      "stage": "exploring"
    }
  },
  "normalizedProfile": {
    "site": {
      "addressStructured": {
        "raw": "101 Chocolate World Way, Hershey, PA 17033, USA",
        "stateCode": "PA",
        "zip5": "17033"
      },
      "geo": {
        "stateCode": "PA",
        "zip5": "17033",
        "countyFips": null,
        "placeGeoid": null,
        "censusTractGeoid": null,
        "designations": []
      },
      "utility": {
        "electric": {
          "selfReportedName": "PPL Electric Utilities",
          "distributionUtilityId": "UTIL_PPL",
          "territoryCandidates": [
            "UTIL_PPL"
          ],
          "verificationStatus": "self_reported_unverified",
          "customerClass": null
        }
      },
      "ownershipRelationship": "unknown",
      "buildingTypes": [
        "retail_storefront"
      ],
      "squareFootage": {
        "value": 100000,
        "raw": "100,000",
        "parsingStatus": "parsed"
      }
    }
  },
  "siteEnergyProfile": {
    "availableFieldIds": [
      "account_number_masked",
      "annual_electric_cost",
      "annual_gas_cost",
      "annual_kwh",
      "annual_sewer_cost",
      "annual_therms",
      "annual_water_cost",
      "annual_water_use",
      "average_cost_per_kwh",
      "average_cost_per_therm",
      "billing_period_end",
      "billing_period_start",
      "bin_size",
      "contamination_fees",
      "customer_class",
      "delivery_charges",
      "demand_charge_rate",
      "demand_charges",
      "fixed_customer_charge",
      "fixed_gas_charge",
      "gas_delivery_charges",
      "gas_procurement_charges",
      "gas_rate_schedule",
      "gas_utility_provider",
      "generation_charges",
      "irrigation_meter_present",
      "landfill_service_cost",
      "meter_size",
      "monthly_kwh",
      "monthly_peak_kw",
      "monthly_therms",
      "monthly_water_use",
      "organics_service_cost",
      "overage_fees",
      "peak_kw",
      "pickup_frequency",
      "rate_schedule",
      "recycling_service_cost",
      "service_address",
      "sewer_cost",
      "stormwater_fee",
      "taxes_and_fees",
      "time_of_use_periods",
      "total_electric_cost",
      "total_gas_cost",
      "total_waste_cost",
      "total_water_cost",
      "utility_provider",
      "waste_hauler",
      "water_provider",
      "water_unit"
    ],
    "latestUtilityProvider": "Private commercial waste hauler",
    "annualKwh": 2965000,
    "annualElectricCost": 415450,
    "averageCostPerKwh": 0.1401,
    "utilitySummaries": [
      {
        "utilityCategory": "electric",
        "annualCost": 415450
      },
      {
        "utilityCategory": "gas",
        "annualCost": 101890
      },
      {
        "utilityCategory": "water_sewer",
        "annualCost": 59200
      },
      {
        "utilityCategory": "waste",
        "annualCost": 124700
      }
    ]
  },
  "siteTaxProfile": {
    "availableFieldIds": [
      "annual_property_tax_cents",
      "taxable_retail_sales_cents",
      "state_program_match_status"
    ]
  },
  "existingTaxFacts": [
    {
      "inputKey": "state_code",
      "value": "PA",
      "sourceFileId": "taxfile_hersheys_chocolate_world_2026_property_bill",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "hidden_derived",
      "userOverrideAllowed": false,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "low"
    },
    {
      "inputKey": "building_type",
      "value": "Retail / Storefront",
      "sourceFileId": "taxfile_hersheys_chocolate_world_2026_tax_workpaper",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "organization_profile",
      "userOverrideAllowed": true,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "medium"
    },
    {
      "inputKey": "annual_property_tax_cents",
      "value": 74200000,
      "sourceFileId": "taxfile_hersheys_chocolate_world_2026_property_bill",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "property_tax_profile",
      "userOverrideAllowed": true,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "high"
    }
  ],
  "retrofitSummaries": [
    {
      "retrofitTypeId": "high_efficiency_hvac_replacement",
      "displayName": "High-efficiency HVAC replacement",
      "parentCategory": "hvac_space_conditioning",
      "opportunityCount": 5,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 798000,
        "assumptions": [
          "HVAC preview uses an admin-modeled annual kWh reduction until equipment-specific efficiency inputs are collected.",
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "Opportunity savings use source-backed incentive rules and reviewed v2 calculation packages when a matched rule is complete enough to include.",
          "This is not a customer quote or final savings estimate."
        ]
      },
      "grantOpportunityIds": [
        "SOURCE_DSIRE:dsire_program_id:3354"
      ]
    },
    {
      "retrofitTypeId": "biomass_biogas_energy_system",
      "displayName": "Biomass / biogas energy system",
      "parentCategory": "solar_renewable_electricity",
      "opportunityCount": 5,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 9000000,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "No source-backed OpportunityIncentiveRule or v2 calculation package matched this retrofit preview, so opportunity savings are shown as $0.",
          "This is not a customer quote or final savings estimate."
        ]
      },
      "grantOpportunityIds": [
        "SOURCE_DSIRE:dsire_program_id:3354"
      ]
    },
    {
      "retrofitTypeId": "ev_charger_installation",
      "displayName": "EV charger installation",
      "parentCategory": "ev_charging_transportation",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 848000,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "Opportunity savings use source-backed incentive rules and reviewed v2 calculation packages when a matched rule is complete enough to include.",
          "This is not a customer quote or final savings estimate."
        ]
      }
    },
    {
      "retrofitTypeId": "led_lighting_retrofit",
      "displayName": "LED lighting retrofit",
      "parentCategory": "lighting",
      "opportunityCount": 5,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 160425,
        "assumptions": [
          "LED preview assumes 12 fixture replacements with fixed operating hours and fixture costs.",
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "No source-backed OpportunityIncentiveRule or v2 calculation package matched this retrofit preview, so opportunity savings are shown as $0.",
          "This is not a customer quote or final savings estimate."
        ]
      },
      "grantOpportunityIds": [
        "SOURCE_DSIRE:dsire_program_id:3354"
      ]
    },
    {
      "retrofitTypeId": "combined_heat_and_power_system",
      "displayName": "Combined heat and power system",
      "parentCategory": "solar_renewable_electricity",
      "opportunityCount": 4,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 12000000,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "Opportunity savings use source-backed incentive rules and reviewed v2 calculation packages when a matched rule is complete enough to include.",
          "This is not a customer quote or final savings estimate."
        ]
      }
    },
    {
      "retrofitTypeId": "ground_source_geothermal_heat_pump",
      "displayName": "Ground-source / geothermal heat pump",
      "parentCategory": "hvac_space_conditioning",
      "opportunityCount": 4,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 1576000,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "No source-backed OpportunityIncentiveRule or v2 calculation package matched this retrofit preview, so opportunity savings are shown as $0.",
          "This is not a customer quote or final savings estimate."
        ]
      },
      "grantOpportunityIds": [
        "SOURCE_DSIRE:dsire_program_id:3354"
      ]
    },
    {
      "retrofitTypeId": "retro_commissioning_study",
      "displayName": "Retro-commissioning study",
      "parentCategory": "audits_studies_planning",
      "opportunityCount": 3,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 91800,
        "assumptions": [
          "Retro-commissioning preview treats the study and implementation package as an admin-modeled kWh reduction.",
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "No source-backed OpportunityIncentiveRule or v2 calculation package matched this retrofit preview, so opportunity savings are shown as $0.",
          "This is not a customer quote or final savings estimate."
        ]
      },
      "grantOpportunityIds": [
        "SOURCE_DSIRE:dsire_program_id:3602",
        "SOURCE_DSIRE:dsire_program_id:3354"
      ]
    },
    {
      "retrofitTypeId": "leed_certification",
      "displayName": "LEED certification",
      "parentCategory": "certifications_compliance",
      "opportunityCount": 2,
      "savingsPreview": {
        "status": "unsupported"
      },
      "grantOpportunityIds": [
        "SOURCE_DSIRE:dsire_program_id:3602",
        "SOURCE_DSIRE:dsire_program_id:3354"
      ]
    },
    {
      "retrofitTypeId": "level_2_ev_charger_installation",
      "displayName": "Level 2 EV charger installation",
      "parentCategory": "ev_charging_transportation",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 848000,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "Opportunity savings use source-backed incentive rules and reviewed v2 calculation packages when a matched rule is complete enough to include.",
          "This is not a customer quote or final savings estimate."
        ]
      }
    },
    {
      "retrofitTypeId": "solar_water_heating_system",
      "displayName": "Solar water heating system",
      "parentCategory": "water_heating",
      "opportunityCount": 2,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 680000,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "No source-backed OpportunityIncentiveRule or v2 calculation package matched this retrofit preview, so opportunity savings are shown as $0.",
          "This is not a customer quote or final savings estimate."
        ]
      }
    },
    {
      "retrofitTypeId": "battery_storage_system",
      "displayName": "Battery storage system",
      "parentCategory": "energy_storage_resilience",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 7280000,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "No source-backed OpportunityIncentiveRule or v2 calculation package matched this retrofit preview, so opportunity savings are shown as $0.",
          "This is not a customer quote or final savings estimate."
        ]
      }
    },
    {
      "retrofitTypeId": "energy_audit",
      "displayName": "Energy audit",
      "parentCategory": "audits_studies_planning",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "unsupported"
      }
    },
    {
      "retrofitTypeId": "ev_make_ready_electrical_upgrade",
      "displayName": "EV make-ready electrical upgrade",
      "parentCategory": "ev_charging_transportation",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 732000,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "Opportunity savings use source-backed incentive rules and reviewed v2 calculation packages when a matched rule is complete enough to include.",
          "This is not a customer quote or final savings estimate."
        ]
      }
    },
    {
      "retrofitTypeId": "exterior_site_lighting_retrofit",
      "displayName": "Exterior/site lighting retrofit",
      "parentCategory": "lighting",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 201200,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "Opportunity savings use source-backed incentive rules and reviewed v2 calculation packages when a matched rule is complete enough to include.",
          "This is not a customer quote or final savings estimate."
        ]
      }
    },
    {
      "retrofitTypeId": "microgrid_system",
      "displayName": "Microgrid system",
      "parentCategory": "energy_storage_resilience",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 10920000,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "No source-backed OpportunityIncentiveRule or v2 calculation package matched this retrofit preview, so opportunity savings are shown as $0.",
          "This is not a customer quote or final savings estimate."
        ]
      }
    },
    {
      "retrofitTypeId": "small_wind_turbine",
      "displayName": "Small wind turbine",
      "parentCategory": "solar_renewable_electricity",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 8000000,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "No source-backed OpportunityIncentiveRule or v2 calculation package matched this retrofit preview, so opportunity savings are shown as $0.",
          "This is not a customer quote or final savings estimate."
        ]
      }
    },
    {
      "retrofitTypeId": "smart_thermostat_zoning_retrofit",
      "displayName": "Smart thermostat / zoning retrofit",
      "parentCategory": "hvac_space_conditioning",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 100600,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "Opportunity savings use source-backed incentive rules and reviewed v2 calculation packages when a matched rule is complete enough to include.",
          "This is not a customer quote or final savings estimate."
        ]
      }
    },
    {
      "retrofitTypeId": "thermal_energy_storage",
      "displayName": "Thermal energy storage",
      "parentCategory": "energy_storage_resilience",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 5510000,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "No source-backed OpportunityIncentiveRule or v2 calculation package matched this retrofit preview, so opportunity savings are shown as $0.",
          "This is not a customer quote or final savings estimate."
        ]
      }
    }
  ],
  "grantRelatedMatches": [
    {
      "retrofitTypeId": "high_efficiency_hvac_replacement",
      "displayName": "High-efficiency HVAC replacement",
      "grantOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3354",
          "opportunityName": "High Performance Building Incentives Program",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3354/high-performance-building-incentives-program",
          "websiteUrl": "https://dced.pa.gov/programs/high-performance-building-program-hpb/",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Grant Loan Loan Guarantee Program",
          "administrator": "Pennsylvania Department of Community and Economic Development and Department of Environmental Protection under the Commonwealth Financing Authority",
          "state": "PA",
          "rankScore": 100,
          "opportunityDataConfidence": 0.79,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state PA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, hvac, lighting, energy_efficiency, renewable_energy, biomass_biogas, building_envelope."
          ]
        }
      ]
    },
    {
      "retrofitTypeId": "biomass_biogas_energy_system",
      "displayName": "Biomass / biogas energy system",
      "grantOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3354",
          "opportunityName": "High Performance Building Incentives Program",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3354/high-performance-building-incentives-program",
          "websiteUrl": "https://dced.pa.gov/programs/high-performance-building-program-hpb/",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Grant Loan Loan Guarantee Program",
          "administrator": "Pennsylvania Department of Community and Economic Development and Department of Environmental Protection under the Commonwealth Financing Authority",
          "state": "PA",
          "rankScore": 100,
          "opportunityDataConfidence": 0.79,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state PA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, hvac, lighting, energy_efficiency, renewable_energy, biomass_biogas, building_envelope."
          ]
        }
      ]
    },
    {
      "retrofitTypeId": "led_lighting_retrofit",
      "displayName": "LED lighting retrofit",
      "grantOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3354",
          "opportunityName": "High Performance Building Incentives Program",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3354/high-performance-building-incentives-program",
          "websiteUrl": "https://dced.pa.gov/programs/high-performance-building-program-hpb/",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Grant Loan Loan Guarantee Program",
          "administrator": "Pennsylvania Department of Community and Economic Development and Department of Environmental Protection under the Commonwealth Financing Authority",
          "state": "PA",
          "rankScore": 100,
          "opportunityDataConfidence": 0.79,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state PA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, hvac, lighting, energy_efficiency, renewable_energy, biomass_biogas, building_envelope."
          ]
        }
      ]
    },
    {
      "retrofitTypeId": "ground_source_geothermal_heat_pump",
      "displayName": "Ground-source / geothermal heat pump",
      "grantOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3354",
          "opportunityName": "High Performance Building Incentives Program",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3354/high-performance-building-incentives-program",
          "websiteUrl": "https://dced.pa.gov/programs/high-performance-building-program-hpb/",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Grant Loan Loan Guarantee Program",
          "administrator": "Pennsylvania Department of Community and Economic Development and Department of Environmental Protection under the Commonwealth Financing Authority",
          "state": "PA",
          "rankScore": 100,
          "opportunityDataConfidence": 0.79,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state PA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, hvac, lighting, energy_efficiency, renewable_energy, biomass_biogas, building_envelope."
          ]
        }
      ]
    },
    {
      "retrofitTypeId": "retro_commissioning_study",
      "displayName": "Retro-commissioning study",
      "grantOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3602",
          "opportunityName": "High Performance Buildings Incentive Program",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3602/high-performance-buildings-incentive-program",
          "websiteUrl": "https://dced.pa.gov/programs/high-performance-building-program-hpb/",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Grant/Loan/Loan Guarantee Program",
          "administrator": "Pennsylvania Department of Community and Economic Development; Pennsylvania Department of Environmental Protection",
          "state": "PA",
          "rankScore": 100,
          "opportunityDataConfidence": 0.79,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state PA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: energy_efficiency, renewable_energy, solar, building_envelope."
          ]
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3354",
          "opportunityName": "High Performance Building Incentives Program",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3354/high-performance-building-incentives-program",
          "websiteUrl": "https://dced.pa.gov/programs/high-performance-building-program-hpb/",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Grant Loan Loan Guarantee Program",
          "administrator": "Pennsylvania Department of Community and Economic Development and Department of Environmental Protection under the Commonwealth Financing Authority",
          "state": "PA",
          "rankScore": 100,
          "opportunityDataConfidence": 0.79,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state PA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, hvac, lighting, energy_efficiency, renewable_energy, biomass_biogas, building_envelope."
          ]
        }
      ]
    },
    {
      "retrofitTypeId": "leed_certification",
      "displayName": "LEED certification",
      "grantOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3602",
          "opportunityName": "High Performance Buildings Incentive Program",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3602/high-performance-buildings-incentive-program",
          "websiteUrl": "https://dced.pa.gov/programs/high-performance-building-program-hpb/",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Grant/Loan/Loan Guarantee Program",
          "administrator": "Pennsylvania Department of Community and Economic Development; Pennsylvania Department of Environmental Protection",
          "state": "PA",
          "rankScore": 100,
          "opportunityDataConfidence": 0.79,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state PA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: energy_efficiency, renewable_energy, solar, building_envelope."
          ]
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3354",
          "opportunityName": "High Performance Building Incentives Program",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3354/high-performance-building-incentives-program",
          "websiteUrl": "https://dced.pa.gov/programs/high-performance-building-program-hpb/",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Grant Loan Loan Guarantee Program",
          "administrator": "Pennsylvania Department of Community and Economic Development and Department of Environmental Protection under the Commonwealth Financing Authority",
          "state": "PA",
          "rankScore": 100,
          "opportunityDataConfidence": 0.79,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state PA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, hvac, lighting, energy_efficiency, renewable_energy, biomass_biogas, building_envelope."
          ]
        }
      ]
    }
  ],
  "blockers": [
    {
      "value": "User site or facility type (retail_storefront) does not match broad_residential eligibility.",
      "count": 553
    },
    {
      "value": "Project site state PA does not match opportunity geography CA.",
      "count": 176
    },
    {
      "value": "Project site state PA does not match opportunity geography MN.",
      "count": 112
    },
    {
      "value": "Opportunity appears residential-only and the user profile is nonresidential.",
      "count": 93
    },
    {
      "value": "Project site state PA does not match opportunity geography CO.",
      "count": 74
    },
    {
      "value": "Project site state PA does not match opportunity geography MA.",
      "count": 70
    },
    {
      "value": "Project site state PA does not match opportunity geography OR.",
      "count": 70
    },
    {
      "value": "Project site state PA does not match opportunity geography TX.",
      "count": 67
    },
    {
      "value": "Opportunity site or facility specificity (multifamily_residential) does not match the user's site type (retail_storefront).",
      "count": 65
    },
    {
      "value": "Project site state PA does not match opportunity geography WA.",
      "count": 61
    },
    {
      "value": "Project site state PA does not match opportunity geography FL.",
      "count": 55
    },
    {
      "value": "Project site state PA does not match opportunity geography MD.",
      "count": 53
    },
    {
      "value": "Project site state PA does not match opportunity geography IL.",
      "count": 47
    },
    {
      "value": "Project site state PA does not match opportunity geography IN.",
      "count": 46
    },
    {
      "value": "Project site state PA does not match opportunity geography NY.",
      "count": 43
    },
    {
      "value": "Project site state PA does not match opportunity geography NC.",
      "count": 40
    },
    {
      "value": "Opportunity site or facility specificity (agricultural_facility) does not match the user's site type (retail_storefront).",
      "count": 38
    },
    {
      "value": "Opportunity site or facility specificity (education_campus) does not match the user's site type (retail_storefront).",
      "count": 38
    },
    {
      "value": "Project site state PA does not match opportunity geography VT.",
      "count": 37
    },
    {
      "value": "Project site state PA does not match opportunity geography MO.",
      "count": 36
    }
  ]
}
```

## Inputs To Add Where Realistic

Think about these categories, but only add values that make sense for this specific customer:

- project stage, procurement stage, preapproval/application status
- eligible project cost by retrofit
- unit quantities: charger ports, fixtures, HVAC units, system kW, battery kWh, audit/study cost
- selected equipment/measure types and conservative sizing
- applicant facts: nonprofit, public entity, school, state entity, agricultural producer, tribal entity, fleet owner, utility customer, etc.
- ownership/control facts and tenant/landlord constraints
- grant-specific inputs for matched grant opportunities
- explicit nonqualification facts where realistic
- missing quote/bill/application facts that should keep estimates suppressed

## Required Output

Return JSON only. Values are synthetic unless already present in the test case. Amounts must be cents. Use null when the value should remain unknown.

```json
{
  "schemaVersion": "retrofi_test_case_grant_profile_repair.v1",
  "researchedAt": "YYYY-MM-DD",
  "sampleUserId": "hersheys-chocolate-world-hershey",
  "profileConfidence": "high | medium | low",
  "profileNotes": "",
  "organizationFactsToAddOrUpdate": [
    {
      "inputKey": "",
      "value": null,
      "valueType": "number | boolean | text | date | enum | money_cents | array",
      "sourceStrategy": "existing_test_case | synthetic_realistic_default | public_context | should_ask_user | quote_required | application_status_required",
      "confidence": "high | medium | low",
      "userOverrideAllowed": true,
      "reasoning": ""
    }
  ],
  "retrofitProjectInputs": [
    {
      "retrofitTypeId": "",
      "projectScopeSummary": "",
      "inputFacts": [
        {
          "inputKey": "",
          "value": null,
          "valueType": "number | boolean | text | date | enum | money_cents | array",
          "sourceStrategy": "synthetic_realistic_default | derived_from_building_size | derived_from_utility_profile | should_ask_user | quote_required",
          "confidence": "high | medium | low",
          "userOverrideAllowed": true,
          "reasoning": ""
        }
      ],
      "shouldQualifyForTypicalGrants": true,
      "qualificationCaveats": []
    }
  ],
  "grantOpportunitySpecificInputs": [
    {
      "opportunityId": "",
      "expectedHandling": "calculate_if_formula_ready | needs_quote | needs_project_scope | needs_application_status | likely_ineligible | suppress_no_probability_evidence | not_relevant_to_this_profile",
      "inputFacts": [],
      "reasoning": ""
    }
  ],
  "missingInputsThatShouldRemainMissing": [
    {
      "inputKey": "",
      "reason": "quote not available | application not submitted | source requires agency approval | unrealistic for this customer | needs user decision"
    }
  ],
  "doNotForceQualificationReasons": []
}
```
