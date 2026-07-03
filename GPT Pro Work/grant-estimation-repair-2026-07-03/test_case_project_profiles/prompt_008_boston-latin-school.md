You are helping RetroFi create realistic synthetic project-profile data for grant estimation tests.

Prompt 8 of 50.

This is NOT source research for grant formulas. This is project/test-case enrichment. Use the supplied test-case facts, public/common-sense building assumptions, and realistic project planning assumptions. You may use the organization's public website only for basic context, but do not invent that a project qualifies for a grant just to make the estimate positive.

## Goal

Add realistic synthetic project-profile inputs for this test case so Codex can calculate or suppress grant estimates. The profile should look like a real customer record: some projects should qualify, some should not, some should need quote data, and some should have uncertainty.

Do not make every grant barely qualify. If the organization/building/project would not normally pursue a grant, mark that honestly.

## Current Test Case Context

```json
{
  "sampleUserId": "boston-latin-school",
  "description": "Large urban public school in Boston with IAQ-sensitive HVAC, cafeteria, gym, and auditorium loads.",
  "sourceForm": {
    "sampleUserId": "boston-latin-school",
    "description": "Large urban public school in Boston with IAQ-sensitive HVAC, cafeteria, gym, and auditorium loads.",
    "companyName": "Boston Latin School",
    "website": "https://www.bls.org/",
    "organizationType": "Government / Public Agency",
    "organizationSize": "51-250 employees",
    "siteAddress": "78 Avenue Louis Pasteur, Boston, MA 02115, USA",
    "electricUtilityProvider": "Eversource",
    "gasUtilityProvider": "National Grid",
    "ownershipStatus": "Own",
    "buildingType": "School / Education Campus",
    "squareFootage": "325,000",
    "primaryActivityText": "Public secondary education, cafeteria operations, athletics, auditorium events, and school administration",
    "naicsCodes": [
      "611110"
    ],
    "publicSourceNotes": "Boston Latin School publicly lists 78 Avenue Louis Pasteur. Floor area is estimated for matching tests.",
    "notes": "Tests public school eligibility, Boston electric/gas supplier confusion, and IAQ-sensitive school HVAC matching.",
    "project": {
      "stage": "exploring"
    }
  },
  "normalizedProfile": {
    "site": {
      "addressStructured": {
        "raw": "78 Avenue Louis Pasteur, Boston, MA 02115, USA",
        "stateCode": "MA",
        "zip5": "02115"
      },
      "geo": {
        "stateCode": "MA",
        "zip5": "02115",
        "countyFips": null,
        "placeGeoid": null,
        "censusTractGeoid": null,
        "designations": []
      },
      "utility": {
        "electric": {
          "selfReportedName": "Eversource",
          "distributionUtilityId": "UTIL_EVERSOURCE",
          "territoryCandidates": [
            "UTIL_EVERSOURCE"
          ],
          "verificationStatus": "self_reported_unverified",
          "customerClass": null
        }
      },
      "ownershipRelationship": "owner",
      "buildingTypes": [
        "education_campus"
      ],
      "squareFootage": {
        "value": 325000,
        "raw": "325,000",
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
    "latestUtilityProvider": "City of Boston Public Schools contracted waste and recycling",
    "annualKwh": 3785000,
    "annualElectricCost": 813775,
    "averageCostPerKwh": 0.215,
    "utilitySummaries": [
      {
        "utilityCategory": "electric",
        "annualCost": 813775
      },
      {
        "utilityCategory": "gas",
        "annualCost": 346850
      },
      {
        "utilityCategory": "water_sewer",
        "annualCost": 62000
      },
      {
        "utilityCategory": "waste",
        "annualCost": 92000
      }
    ]
  },
  "siteTaxProfile": {
    "availableFieldIds": [
      "owner_name",
      "property_tax_account_status",
      "assessed_reference_value_cents",
      "taxable_assessed_value_cents",
      "annual_property_tax_due_cents",
      "building_square_footage",
      "sales_use_tax_exemption_status",
      "state_code"
    ]
  },
  "existingTaxFacts": [
    {
      "inputKey": "state_code",
      "value": "MA",
      "sourceFileId": "taxfile_043_boston_latin_school_01",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "hidden_derived",
      "userOverrideAllowed": false,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "low"
    },
    {
      "inputKey": "site_ownership_status",
      "value": "Own",
      "sourceFileId": "taxfile_043_boston_latin_school_01",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "organization_profile",
      "userOverrideAllowed": true,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "medium"
    },
    {
      "inputKey": "building_square_footage",
      "value": 325000,
      "sourceFileId": "taxfile_043_boston_latin_school_01",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "property_tax_profile",
      "userOverrideAllowed": true,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "medium"
    },
    {
      "inputKey": "property_tax_status",
      "value": "municipal_public_school_property_exempt",
      "sourceFileId": "taxfile_043_boston_latin_school_01",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "property_tax_profile",
      "userOverrideAllowed": true,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "medium"
    },
    {
      "inputKey": "annual_property_tax_due_cents",
      "value": 0,
      "sourceFileId": "taxfile_043_boston_latin_school_01",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "property_tax_profile",
      "userOverrideAllowed": true,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "medium"
    },
    {
      "inputKey": "sales_use_tax_exempt_status",
      "value": true,
      "sourceFileId": "taxfile_043_boston_latin_school_02",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "tax_profile",
      "userOverrideAllowed": true,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "medium"
    },
    {
      "inputKey": "retrofi_supplied_target_state_match",
      "value": false,
      "sourceFileId": "taxfile_043_boston_latin_school_01",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "hidden_derived",
      "userOverrideAllowed": false,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "low"
    }
  ],
  "existingTaxOpportunitySpecificInputs": [
    {
      "opportunityId": "SOURCE_DSIRE:dsire_program_id:3216",
      "inputKey": "approved_rerz_designation",
      "value": false,
      "sourceFileId": "taxfile_043_boston_latin_school_01",
      "estimateStatusIfUsed": "suppressed",
      "includeInUserFacingTotalBeforeConfirmation": false,
      "notes": "Suppress Michigan Renewable Energy Renaissance Zone treatment because the synthetic site state is MA, not Michigan, and no approved Michigan zone designation document is present."
    },
    {
      "opportunityId": "SOURCE_DSIRE:dsire_program_id:22798",
      "inputKey": "municipality",
      "value": "Boston, MA",
      "sourceFileId": "taxfile_043_boston_latin_school_01",
      "estimateStatusIfUsed": "suppressed",
      "includeInUserFacingTotalBeforeConfirmation": false,
      "notes": "Suppress Rhode Island renewable property-tax valuation because the synthetic site is in MA, not Rhode Island."
    },
    {
      "opportunityId": "SOURCE_DSIRE:dsire_program_id:381",
      "inputKey": "qualifying_solar_b_and_o_classification",
      "value": "not_applicable_out_of_state_and_no_synthetic_solar_manufacturing_activity",
      "sourceFileId": "taxfile_043_boston_latin_school_01",
      "estimateStatusIfUsed": "suppressed",
      "includeInUserFacingTotalBeforeConfirmation": false,
      "notes": "Suppress Washington solar-manufacturing B&O treatment because the synthetic site is in MA, not Washington, and the profile does not include a WA solar manufacturing B&O tax return."
    }
  ],
  "retrofitSummaries": [
    {
      "retrofitTypeId": "ev_charger_installation",
      "displayName": "EV charger installation",
      "parentCategory": "ev_charging_transportation",
      "opportunityCount": 4,
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
        "SOURCE_DSIRE:dsire_program_id:22187",
        "SOURCE_DSIRE:dsire_program_id:22185",
        "SOURCE_DSIRE:dsire_program_id:22186",
        "SOURCE_DSIRE:dsire_program_id:22188"
      ]
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
      "retrofitTypeId": "level_2_ev_charger_installation",
      "displayName": "Level 2 EV charger installation",
      "parentCategory": "ev_charging_transportation",
      "opportunityCount": 3,
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
        "SOURCE_DSIRE:dsire_program_id:22187",
        "SOURCE_DSIRE:dsire_program_id:22186",
        "SOURCE_DSIRE:dsire_program_id:22188"
      ]
    },
    {
      "retrofitTypeId": "biomass_biogas_energy_system",
      "displayName": "Biomass / biogas energy system",
      "parentCategory": "solar_renewable_electricity",
      "opportunityCount": 2,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 9000000,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "No source-backed OpportunityIncentiveRule or v2 calculation package matched this retrofit preview, so opportunity savings are shown as $0.",
          "This is not a customer quote or final savings estimate."
        ]
      }
    },
    {
      "retrofitTypeId": "fuel_cell_system",
      "displayName": "Fuel cell system",
      "parentCategory": "solar_renewable_electricity",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 11000000,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "No source-backed OpportunityIncentiveRule or v2 calculation package matched this retrofit preview, so opportunity savings are shown as $0.",
          "This is not a customer quote or final savings estimate."
        ]
      }
    },
    {
      "retrofitTypeId": "ground_source_geothermal_heat_pump",
      "displayName": "Ground-source / geothermal heat pump",
      "parentCategory": "hvac_space_conditioning",
      "opportunityCount": 2,
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
      "retrofitTypeId": "air_sealing_weatherization",
      "displayName": "Air sealing / weatherization",
      "parentCategory": "building_envelope",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 194600,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "Opportunity savings use source-backed incentive rules and reviewed v2 calculation packages when a matched rule is complete enough to include.",
          "This is not a customer quote or final savings estimate."
        ]
      },
      "grantOpportunityIds": [
        "SOURCE_DSIRE:dsire_program_id:5712"
      ]
    },
    {
      "retrofitTypeId": "combined_heat_and_power_system",
      "displayName": "Combined heat and power system",
      "parentCategory": "solar_renewable_electricity",
      "opportunityCount": 1,
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
      "retrofitTypeId": "fleet_charging_infrastructure",
      "displayName": "Fleet charging infrastructure",
      "parentCategory": "ev_charging_transportation",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 2760000,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "Opportunity savings use source-backed incentive rules and reviewed v2 calculation packages when a matched rule is complete enough to include.",
          "This is not a customer quote or final savings estimate."
        ]
      },
      "grantOpportunityIds": [
        "SOURCE_DSIRE:dsire_program_id:22186"
      ]
    },
    {
      "retrofitTypeId": "high_efficiency_hvac_replacement",
      "displayName": "High-efficiency HVAC replacement",
      "parentCategory": "hvac_space_conditioning",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 798000,
        "assumptions": [
          "HVAC preview uses an admin-modeled annual kWh reduction until equipment-specific efficiency inputs are collected.",
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "No source-backed OpportunityIncentiveRule or v2 calculation package matched this retrofit preview, so opportunity savings are shown as $0.",
          "This is not a customer quote or final savings estimate."
        ]
      }
    },
    {
      "retrofitTypeId": "led_lighting_retrofit",
      "displayName": "LED lighting retrofit",
      "parentCategory": "lighting",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 160425,
        "assumptions": [
          "LED preview assumes 12 fixture replacements with fixed operating hours and fixture costs.",
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "No source-backed OpportunityIncentiveRule or v2 calculation package matched this retrofit preview, so opportunity savings are shown as $0.",
          "This is not a customer quote or final savings estimate."
        ]
      }
    },
    {
      "retrofitTypeId": "rooftop_solar_pv",
      "displayName": "Rooftop solar PV",
      "parentCategory": "solar_renewable_electricity",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 10000000,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "Opportunity savings use source-backed incentive rules and reviewed v2 calculation packages when a matched rule is complete enough to include.",
          "This is not a customer quote or final savings estimate."
        ]
      },
      "grantOpportunityIds": [
        "SOURCE_DSIRE:dsire_program_id:22770"
      ]
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
    }
  ],
  "grantRelatedMatches": [
    {
      "retrofitTypeId": "ev_charger_installation",
      "displayName": "EV charger installation",
      "grantOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22187",
          "opportunityName": "MassEVIP Public Access Charging (PAC) Program",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22187/massevip-public-access-charging-pac-program",
          "websiteUrl": "https://www.mass.gov/how-to/apply-for-massevip-public-access-charging-incentives",
          "applicationUrl": "https://www.mass.gov/forms/massevip-public-access-charging-pac-program-application",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "rolling",
          "programType": "Grant Program",
          "administrator": "Massachusetts Department of Environmental Protection",
          "state": "MA",
          "rankScore": 100,
          "opportunityDataConfidence": 0.82,
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state MA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: government.",
            "No site or facility type restriction was found after source review.",
            "Opportunity technology is available for retrofit discovery: ev_charging."
          ]
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22185",
          "opportunityName": "MassEVIP Fleets Charging Program",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22185/massevip-fleets-charging-program",
          "websiteUrl": "https://www.mass.gov/how-to/apply-for-massevip-workplace-fleet-charging-incentives",
          "applicationUrl": "https://www.mass.gov/forms/massevip-workplace-and-fleet-wpf-charging-program-application",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "rolling",
          "programType": "Grant Program",
          "administrator": "Massachusetts Department of Environmental Protection",
          "state": "MA",
          "rankScore": 100,
          "opportunityDataConfidence": 0.82,
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state MA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: government.",
            "No site or facility type restriction was found after source review.",
            "Opportunity technology is available for retrofit discovery: fleet_electrification, ev_charging, clean_transportation."
          ]
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22186",
          "opportunityName": "MassEVIP Workplace and Fleet Charging Program",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22186/massevip-workplace-and-fleet-charging-program",
          "websiteUrl": "https://www.mass.gov/how-to/apply-for-massevip-workplace-fleet-charging-incentives",
          "applicationUrl": "https://www.mass.gov/how-to/apply-for-massevip-workplace-fleet-charging-incentives",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Grant",
          "administrator": "Massachusetts Department of Environmental Protection",
          "state": "MA",
          "rankScore": 100,
          "opportunityDataConfidence": 0.82,
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state MA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: government.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: ev_charging, fleet_electrification."
          ]
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22188",
          "opportunityName": "MassEVIP Multi-Unit Dwelling (MUD) and Educational Campus Charging Program",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22188/massevip-multi-unit-dwelling-mud-and-educational-campus-charging-program",
          "websiteUrl": "https://www.mass.gov/how-to/apply-for-massevip-multi-unit-dwelling-educational-campus-charging-incentives",
          "applicationUrl": "https://www.mass.gov/forms/massevip-multi-unit-dwelling-and-educational-campus-mudc-charging-program-application",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "rolling",
          "programType": "Grant Program",
          "administrator": "Massachusetts Department of Environmental Protection",
          "state": "MA",
          "rankScore": 100,
          "opportunityDataConfidence": 0.82,
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state MA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: government.",
            "Site or facility type matches: education_campus.",
            "Opportunity technology is available for retrofit discovery: ev_charging."
          ]
        }
      ]
    },
    {
      "retrofitTypeId": "level_2_ev_charger_installation",
      "displayName": "Level 2 EV charger installation",
      "grantOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22187",
          "opportunityName": "MassEVIP Public Access Charging (PAC) Program",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22187/massevip-public-access-charging-pac-program",
          "websiteUrl": "https://www.mass.gov/how-to/apply-for-massevip-public-access-charging-incentives",
          "applicationUrl": "https://www.mass.gov/forms/massevip-public-access-charging-pac-program-application",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "rolling",
          "programType": "Grant Program",
          "administrator": "Massachusetts Department of Environmental Protection",
          "state": "MA",
          "rankScore": 100,
          "opportunityDataConfidence": 0.82,
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state MA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: government.",
            "No site or facility type restriction was found after source review.",
            "Opportunity technology is available for retrofit discovery: ev_charging."
          ]
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22186",
          "opportunityName": "MassEVIP Workplace and Fleet Charging Program",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22186/massevip-workplace-and-fleet-charging-program",
          "websiteUrl": "https://www.mass.gov/how-to/apply-for-massevip-workplace-fleet-charging-incentives",
          "applicationUrl": "https://www.mass.gov/how-to/apply-for-massevip-workplace-fleet-charging-incentives",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Grant",
          "administrator": "Massachusetts Department of Environmental Protection",
          "state": "MA",
          "rankScore": 100,
          "opportunityDataConfidence": 0.82,
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state MA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: government.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: ev_charging, fleet_electrification."
          ]
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22188",
          "opportunityName": "MassEVIP Multi-Unit Dwelling (MUD) and Educational Campus Charging Program",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22188/massevip-multi-unit-dwelling-mud-and-educational-campus-charging-program",
          "websiteUrl": "https://www.mass.gov/how-to/apply-for-massevip-multi-unit-dwelling-educational-campus-charging-incentives",
          "applicationUrl": "https://www.mass.gov/forms/massevip-multi-unit-dwelling-and-educational-campus-mudc-charging-program-application",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "rolling",
          "programType": "Grant Program",
          "administrator": "Massachusetts Department of Environmental Protection",
          "state": "MA",
          "rankScore": 100,
          "opportunityDataConfidence": 0.82,
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state MA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: government.",
            "Site or facility type matches: education_campus.",
            "Opportunity technology is available for retrofit discovery: ev_charging."
          ]
        }
      ]
    },
    {
      "retrofitTypeId": "air_sealing_weatherization",
      "displayName": "Air sealing / weatherization",
      "grantOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:5712",
          "opportunityName": "Low Income Home Energy Assistance Program (LIHEAP)",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5712/low-income-home-energy-assistance-program-liheap",
          "websiteUrl": "https://www.acf.hhs.gov/ocs/low-income-home-energy-assistance-program-liheap",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Federal Assistance / Grant Program",
          "administrator": "U.S. Department of Health and Human Services, Administration for Children and Families, Office of Community Services",
          "rankScore": 100,
          "opportunityDataConfidence": 0.77,
          "matchedReasons": [
            "Opportunity appears active.",
            "Opportunity appears nationwide.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: government.",
            "Site or facility type matches: education_campus.",
            "Opportunity technology is available for retrofit discovery: building_envelope, energy_efficiency."
          ]
        }
      ]
    },
    {
      "retrofitTypeId": "fleet_charging_infrastructure",
      "displayName": "Fleet charging infrastructure",
      "grantOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22186",
          "opportunityName": "MassEVIP Workplace and Fleet Charging Program",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22186/massevip-workplace-and-fleet-charging-program",
          "websiteUrl": "https://www.mass.gov/how-to/apply-for-massevip-workplace-fleet-charging-incentives",
          "applicationUrl": "https://www.mass.gov/how-to/apply-for-massevip-workplace-fleet-charging-incentives",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Grant",
          "administrator": "Massachusetts Department of Environmental Protection",
          "state": "MA",
          "rankScore": 100,
          "opportunityDataConfidence": 0.82,
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state MA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: government.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: ev_charging, fleet_electrification."
          ]
        }
      ]
    },
    {
      "retrofitTypeId": "rooftop_solar_pv",
      "displayName": "Rooftop solar PV",
      "grantOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22770",
          "opportunityName": "Leading By Example Restoration Grant for Solar PV & Decarbonized Systems",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22770/leading-by-example-restoration-grant-for-solar-pv-and-decarbonized-systems",
          "websiteUrl": "https://www.mass.gov/info-details/leading-by-example-restoration-grant-for-solar-pv-decarbonized-systems",
          "applicationUrl": "https://www.commbuys.com/bso/external/bidDetail.sdo?docId=BD-25-1041-ENE01-ENE01-109288&external=true&parentUrl=bid",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "rolling",
          "programType": "Grant Program",
          "administrator": "Massachusetts Department of Energy Resources",
          "state": "MA",
          "rankScore": 100,
          "opportunityDataConfidence": 0.82,
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state MA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: government.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: solar, renewable_energy."
          ]
        }
      ]
    }
  ],
  "blockers": [
    {
      "value": "User site or facility type (education_campus) does not match broad_residential eligibility.",
      "count": 553
    },
    {
      "value": "User site or facility type (education_campus) does not match broad_commercial eligibility.",
      "count": 362
    },
    {
      "value": "Project site state MA does not match opportunity geography CA.",
      "count": 176
    },
    {
      "value": "Project site state MA does not match opportunity geography MN.",
      "count": 112
    },
    {
      "value": "Opportunity appears residential-only and the user profile is nonresidential.",
      "count": 93
    },
    {
      "value": "Project site state MA does not match opportunity geography CO.",
      "count": 74
    },
    {
      "value": "Project site state MA does not match opportunity geography OR.",
      "count": 70
    },
    {
      "value": "Project site state MA does not match opportunity geography TX.",
      "count": 67
    },
    {
      "value": "Opportunity site or facility specificity (multifamily_residential) does not match the user's site type (education_campus).",
      "count": 65
    },
    {
      "value": "Project site state MA does not match opportunity geography WA.",
      "count": 61
    },
    {
      "value": "Project site state MA does not match opportunity geography FL.",
      "count": 55
    },
    {
      "value": "Project site state MA does not match opportunity geography MD.",
      "count": 53
    },
    {
      "value": "Project site state MA does not match opportunity geography IL.",
      "count": 47
    },
    {
      "value": "Project site state MA does not match opportunity geography IN.",
      "count": 46
    },
    {
      "value": "Project site state MA does not match opportunity geography PA.",
      "count": 46
    },
    {
      "value": "Project site state MA does not match opportunity geography NY.",
      "count": 43
    },
    {
      "value": "Project site state MA does not match opportunity geography NC.",
      "count": 40
    },
    {
      "value": "Opportunity site or facility specificity (agricultural_facility) does not match the user's site type (education_campus).",
      "count": 38
    },
    {
      "value": "Project site state MA does not match opportunity geography VT.",
      "count": 37
    },
    {
      "value": "Project site state MA does not match opportunity geography MO.",
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
  "sampleUserId": "boston-latin-school",
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
