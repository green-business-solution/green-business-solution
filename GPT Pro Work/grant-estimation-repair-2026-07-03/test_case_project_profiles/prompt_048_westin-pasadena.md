You are helping RetroFi create realistic synthetic project-profile data for grant estimation tests.

Prompt 48 of 50.

This is NOT source research for grant formulas. This is project/test-case enrichment. Use the supplied test-case facts, public/common-sense building assumptions, and realistic project planning assumptions. You may use the organization's public website only for basic context, but do not invent that a project qualifies for a grant just to make the estimate positive.

## Goal

Add realistic synthetic project-profile inputs for this test case so Codex can calculate or suppress grant estimates. The profile should look like a real customer record: some projects should qualify, some should not, some should need quote data, and some should have uncertainty.

Do not make every grant barely qualify. If the organization/building/project would not normally pursue a grant, mark that honestly.

## Current Test Case Context

```json
{
  "sampleUserId": "westin-pasadena",
  "description": "Full-service Pasadena hotel and conference venue in Pasadena Water and Power electric territory.",
  "sourceForm": {
    "sampleUserId": "westin-pasadena",
    "description": "Full-service Pasadena hotel and conference venue in Pasadena Water and Power electric territory.",
    "companyName": "The Westin Pasadena",
    "website": "https://www.marriott.com/en-us/hotels/laxpw-the-westin-pasadena/overview/",
    "organizationType": "Commercial Business",
    "organizationSize": "51-250 employees",
    "siteAddress": "191 N Los Robles Avenue, Pasadena, CA 91101, USA",
    "electricUtilityProvider": "Pasadena Water and Power",
    "gasUtilityProvider": "Southern California Gas Company",
    "ownershipStatus": "Not sure",
    "buildingType": "Hotel / Hospitality",
    "squareFootage": "266,000",
    "primaryActivityText": "Lodging, food service, conferences and events, guest amenities, laundry, and pool operations",
    "naicsCodes": [
      "721110",
      "722511"
    ],
    "publicSourceNotes": "Marriott lists the property address; public transaction coverage describes a 350-room, roughly 266,000-square-foot hotel.",
    "notes": "Hotel case with guestroom, kitchen, laundry, event, pool, and central-plant loads. Use PWP for electric eligibility.",
    "project": {
      "stage": "exploring"
    }
  },
  "normalizedProfile": {
    "site": {
      "addressStructured": {
        "raw": "191 N Los Robles Avenue, Pasadena, CA 91101, USA",
        "stateCode": "CA",
        "zip5": "91101"
      },
      "geo": {
        "stateCode": "CA",
        "zip5": "91101",
        "countyFips": null,
        "placeGeoid": null,
        "censusTractGeoid": null,
        "designations": []
      },
      "utility": {
        "electric": {
          "selfReportedName": "Pasadena Water and Power",
          "distributionUtilityId": "UTIL_PWP",
          "territoryCandidates": [
            "UTIL_PWP"
          ],
          "verificationStatus": "self_reported_unverified",
          "customerClass": null
        }
      },
      "ownershipRelationship": "unknown",
      "buildingTypes": [
        "hospitality_lodging"
      ],
      "squareFootage": {
        "value": 266000,
        "raw": "266,000",
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
      "demand_charge_rate",
      "demand_charges",
      "gas_rate_schedule",
      "gas_utility_provider",
      "irrigation_meter_present",
      "landfill_service_cost",
      "meter_size",
      "monthly_kwh",
      "monthly_therms",
      "monthly_water_use",
      "organics_service_cost",
      "overage_fees",
      "peak_kw",
      "pickup_frequency",
      "rate_schedule",
      "recycling_service_cost",
      "service_address",
      "stormwater_fee",
      "total_electric_cost",
      "total_gas_cost",
      "total_waste_cost",
      "total_water_cost",
      "utility_provider",
      "waste_hauler",
      "water_provider",
      "water_unit"
    ],
    "latestUtilityProvider": "Athens Services",
    "annualKwh": 3990000,
    "annualElectricCost": 837900,
    "averageCostPerKwh": 0.21,
    "utilitySummaries": [
      {
        "utilityCategory": "electric",
        "annualCost": 837900
      },
      {
        "utilityCategory": "gas",
        "annualCost": 548625
      },
      {
        "utilityCategory": "water_sewer",
        "annualCost": 165000
      },
      {
        "utilityCategory": "waste",
        "annualCost": 131800
      }
    ]
  },
  "siteTaxProfile": {
    "availableFieldIds": [
      "total_real_property_assessed_value_cents",
      "annual_real_property_tax_due_cents",
      "business_personal_property_assessed_value_cents",
      "hotel_furniture_fixtures_equipment_value_cents",
      "taxable_room_revenue_cents",
      "transient_occupancy_tax_due_cents",
      "building_square_feet"
    ]
  },
  "existingTaxFacts": [
    {
      "inputKey": "property_tax_jurisdiction",
      "value": "Los Angeles County, CA",
      "sourceFileId": "synthetic_tax_file_westin_pasadena_2026_property_tax_bill",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "property_tax_profile",
      "userOverrideAllowed": true,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "medium"
    },
    {
      "inputKey": "annual_real_property_tax_due_cents",
      "value": 100198000,
      "sourceFileId": "synthetic_tax_file_westin_pasadena_2026_property_tax_bill",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "property_tax_profile",
      "userOverrideAllowed": true,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "medium"
    },
    {
      "inputKey": "business_personal_property_assessed_value_cents",
      "value": 1125000000,
      "sourceFileId": "synthetic_tax_file_westin_pasadena_2026_business_property_statement",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "property_tax_profile",
      "userOverrideAllowed": true,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "medium"
    },
    {
      "inputKey": "transient_occupancy_tax_due_cents",
      "value": 243100000,
      "sourceFileId": "synthetic_tax_file_westin_pasadena_2026_transient_occupancy_tax_summary",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "tax_profile",
      "userOverrideAllowed": true,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "low"
    }
  ],
  "retrofitSummaries": [
    {
      "retrofitTypeId": "ev_charger_installation",
      "displayName": "EV charger installation",
      "parentCategory": "ev_charging_transportation",
      "opportunityCount": 5,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 848000,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "Opportunity savings use source-backed incentive rules and reviewed v2 calculation packages when a matched rule is complete enough to include.",
          "This is not a customer quote or final savings estimate."
        ]
      },
      "grantOpportunityIds": [
        "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-605",
        "SOURCE_DSIRE:dsire_program_id:22629",
        "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-603"
      ]
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
      }
    },
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
          "Opportunity savings use source-backed incentive rules and reviewed v2 calculation packages when a matched rule is complete enough to include.",
          "This is not a customer quote or final savings estimate."
        ]
      }
    },
    {
      "retrofitTypeId": "battery_storage_system",
      "displayName": "Battery storage system",
      "parentCategory": "energy_storage_resilience",
      "opportunityCount": 3,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 7280000,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "Opportunity savings use source-backed incentive rules and reviewed v2 calculation packages when a matched rule is complete enough to include.",
          "This is not a customer quote or final savings estimate."
        ]
      }
    },
    {
      "retrofitTypeId": "biomass_biogas_energy_system",
      "displayName": "Biomass / biogas energy system",
      "parentCategory": "solar_renewable_electricity",
      "opportunityCount": 4,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 9000000,
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
      "retrofitTypeId": "combined_heat_and_power_system",
      "displayName": "Combined heat and power system",
      "parentCategory": "solar_renewable_electricity",
      "opportunityCount": 2,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 12000000,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "No source-backed OpportunityIncentiveRule or v2 calculation package matched this retrofit preview, so opportunity savings are shown as $0.",
          "This is not a customer quote or final savings estimate."
        ]
      }
    },
    {
      "retrofitTypeId": "heat_pump_hvac_retrofit",
      "displayName": "Heat pump HVAC retrofit",
      "parentCategory": "hvac_space_conditioning",
      "opportunityCount": 2,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 1172000,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "Opportunity savings use source-backed incentive rules and reviewed v2 calculation packages when a matched rule is complete enough to include.",
          "This is not a customer quote or final savings estimate."
        ]
      }
    },
    {
      "retrofitTypeId": "heat_pump_water_heater",
      "displayName": "Heat pump water heater",
      "parentCategory": "water_heating",
      "opportunityCount": 2,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 350000,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "Opportunity savings use source-backed incentive rules and reviewed v2 calculation packages when a matched rule is complete enough to include.",
          "This is not a customer quote or final savings estimate."
        ]
      }
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
      "retrofitTypeId": "cooling_tower_controls_optimization",
      "displayName": "Cooling tower controls / optimization",
      "parentCategory": "water_efficiency",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 179600,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "Opportunity savings use source-backed incentive rules and reviewed v2 calculation packages when a matched rule is complete enough to include.",
          "This is not a customer quote or final savings estimate."
        ]
      }
    },
    {
      "retrofitTypeId": "high_efficiency_commercial_dishwasher",
      "displayName": "High-efficiency commercial dishwasher",
      "parentCategory": "commercial_kitchen_foodservice",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 254400,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "Opportunity savings use source-backed incentive rules and reviewed v2 calculation packages when a matched rule is complete enough to include.",
          "This is not a customer quote or final savings estimate."
        ]
      }
    },
    {
      "retrofitTypeId": "high_efficiency_fryer",
      "displayName": "High-efficiency fryer",
      "parentCategory": "commercial_kitchen_foodservice",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 196200,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "Opportunity savings use source-backed incentive rules and reviewed v2 calculation packages when a matched rule is complete enough to include.",
          "This is not a customer quote or final savings estimate."
        ]
      }
    },
    {
      "retrofitTypeId": "high_efficiency_laundry_equipment",
      "displayName": "High-efficiency laundry equipment",
      "parentCategory": "water_efficiency",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 307600,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "Opportunity savings use source-backed incentive rules and reviewed v2 calculation packages when a matched rule is complete enough to include.",
          "This is not a customer quote or final savings estimate."
        ]
      }
    },
    {
      "retrofitTypeId": "high_efficiency_oven",
      "displayName": "High-efficiency oven",
      "parentCategory": "commercial_kitchen_foodservice",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 260200,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "Opportunity savings use source-backed incentive rules and reviewed v2 calculation packages when a matched rule is complete enough to include.",
          "This is not a customer quote or final savings estimate."
        ]
      }
    },
    {
      "retrofitTypeId": "high_efficiency_refrigeration_equipment",
      "displayName": "High-efficiency refrigeration equipment",
      "parentCategory": "refrigeration",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 345000,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "Opportunity savings use source-backed incentive rules and reviewed v2 calculation packages when a matched rule is complete enough to include.",
          "This is not a customer quote or final savings estimate."
        ]
      }
    },
    {
      "retrofitTypeId": "high_efficiency_steamer",
      "displayName": "High-efficiency steamer",
      "parentCategory": "commercial_kitchen_foodservice",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 169600,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "Opportunity savings use source-backed incentive rules and reviewed v2 calculation packages when a matched rule is complete enough to include.",
          "This is not a customer quote or final savings estimate."
        ]
      }
    },
    {
      "retrofitTypeId": "induction_cooking_equipment",
      "displayName": "Induction cooking equipment",
      "parentCategory": "commercial_kitchen_foodservice",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 232800,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "Opportunity savings use source-backed incentive rules and reviewed v2 calculation packages when a matched rule is complete enough to include.",
          "This is not a customer quote or final savings estimate."
        ]
      }
    },
    {
      "retrofitTypeId": "insulation_upgrade",
      "displayName": "Insulation upgrade",
      "parentCategory": "building_envelope",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 316000,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "No source-backed OpportunityIncentiveRule or v2 calculation package matched this retrofit preview, so opportunity savings are shown as $0.",
          "This is not a customer quote or final savings estimate."
        ]
      }
    },
    {
      "retrofitTypeId": "leed_certification",
      "displayName": "LEED certification",
      "parentCategory": "certifications_compliance",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "unsupported"
      }
    },
    {
      "retrofitTypeId": "lighting_controls_retrofit",
      "displayName": "Lighting controls retrofit",
      "parentCategory": "lighting",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 132200,
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
    },
    {
      "retrofitTypeId": "window_film_shading_retrofit",
      "displayName": "Window film / shading retrofit",
      "parentCategory": "building_envelope",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 127200,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "Opportunity savings use source-backed incentive rules and reviewed v2 calculation packages when a matched rule is complete enough to include.",
          "This is not a customer quote or final savings estimate."
        ]
      }
    }
  ],
  "grantRelatedMatches": [
    {
      "retrofitTypeId": "ev_charger_installation",
      "displayName": "EV charger installation",
      "grantOpportunities": [
        {
          "opportunityId": "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-605",
          "opportunityName": "GFO-25-605 – Reliable Electric Charging for Eligible School-bus Sites (RECESS)",
          "sourceUrl": "https://www.energy.ca.gov/solicitations/2026-04/gfo-25-605-reliable-electric-charging-eligible-school-bus-sites-recess",
          "websiteUrl": "https://www.energy.ca.gov/solicitations/2026-04/gfo-25-605-reliable-electric-charging-eligible-school-bus-sites-recess",
          "applicationUrl": "https://ecams.energy.ca.gov/s/login/",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Grant",
          "administrator": "California Energy Commission",
          "state": "CA",
          "rankScore": 100,
          "opportunityDataConfidence": 0.8,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CA matches opportunity geography.",
            "Opportunity explicitly has no electric utility restriction.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: ev_charging, fleet_electrification, clean_transportation."
          ]
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22629",
          "opportunityName": "California - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22629/california-national-electric-vehicle-infrastructure-nevi-formula-grant-program",
          "websiteUrl": "https://www.energy.ca.gov/programs-and-topics/programs/national-electric-vehicle-infrastructure-nevi-formula-program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Competitive EV Infrastructure Grant",
          "administrator": "California Energy Commission and California Department of Transportation",
          "state": "CA",
          "rankScore": 100,
          "opportunityDataConfidence": 0.79,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: commercial.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: ev_charging, fleet_electrification, clean_transportation."
          ]
        },
        {
          "opportunityId": "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-603",
          "opportunityName": "GFO-25-603 - California’s National Electric Vehicle Infrastructure Formula Program – Solicitation 6 Community Charging",
          "sourceUrl": "https://www.energy.ca.gov/solicitations/2026-02/gfo-25-603-californias-national-electric-vehicle-infrastructure-formula",
          "websiteUrl": "https://www.energy.ca.gov/solicitations/2026-02/gfo-25-603-californias-national-electric-vehicle-infrastructure-formula",
          "applicationUrl": "https://ecams.energy.ca.gov/s/login/",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Grant",
          "administrator": "California Energy Commission",
          "state": "CA",
          "rankScore": 100,
          "opportunityDataConfidence": 0.77,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CA matches opportunity geography.",
            "Opportunity explicitly has no electric utility restriction.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: ev_charging, fleet_electrification."
          ]
        }
      ]
    }
  ],
  "blockers": [
    {
      "value": "User site or facility type (hospitality_lodging) does not match broad_residential eligibility.",
      "count": 553
    },
    {
      "value": "Project site state CA does not match opportunity geography MN.",
      "count": 112
    },
    {
      "value": "Opportunity appears residential-only and the user profile is nonresidential.",
      "count": 93
    },
    {
      "value": "Project site state CA does not match opportunity geography CO.",
      "count": 74
    },
    {
      "value": "Project site state CA does not match opportunity geography MA.",
      "count": 70
    },
    {
      "value": "Project site state CA does not match opportunity geography OR.",
      "count": 70
    },
    {
      "value": "Project site state CA does not match opportunity geography TX.",
      "count": 67
    },
    {
      "value": "Opportunity site or facility specificity (multifamily_residential) does not match the user's site type (hospitality_lodging).",
      "count": 65
    },
    {
      "value": "Project site state CA does not match opportunity geography WA.",
      "count": 61
    },
    {
      "value": "Project site state CA does not match opportunity geography FL.",
      "count": 55
    },
    {
      "value": "Project site state CA does not match opportunity geography MD.",
      "count": 53
    },
    {
      "value": "Project site state CA does not match opportunity geography IL.",
      "count": 47
    },
    {
      "value": "Project site state CA does not match opportunity geography IN.",
      "count": 46
    },
    {
      "value": "Project site state CA does not match opportunity geography PA.",
      "count": 46
    },
    {
      "value": "Project site state CA does not match opportunity geography NY.",
      "count": 43
    },
    {
      "value": "Project site state CA does not match opportunity geography NC.",
      "count": 40
    },
    {
      "value": "Opportunity site or facility specificity (agricultural_facility) does not match the user's site type (hospitality_lodging).",
      "count": 38
    },
    {
      "value": "Opportunity site or facility specificity (education_campus) does not match the user's site type (hospitality_lodging).",
      "count": 38
    },
    {
      "value": "Project site state CA does not match opportunity geography VT.",
      "count": 37
    },
    {
      "value": "Project site state CA does not match opportunity geography MO.",
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
  "sampleUserId": "westin-pasadena",
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
