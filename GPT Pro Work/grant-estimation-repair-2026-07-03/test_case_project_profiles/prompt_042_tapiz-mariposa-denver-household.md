You are helping RetroFi create realistic synthetic project-profile data for grant estimation tests.

Prompt 42 of 50.

This is NOT source research for grant formulas. This is project/test-case enrichment. Use the supplied test-case facts, public/common-sense building assumptions, and realistic project planning assumptions. You may use the organization's public website only for basic context, but do not invent that a project qualifies for a grant just to make the estimate positive.

## Goal

Add realistic synthetic project-profile inputs for this test case so Codex can calculate or suppress grant estimates. The profile should look like a real customer record: some projects should qualify, some should not, some should need quote data, and some should have uncertainty.

Do not make every grant barely qualify. If the organization/building/project would not normally pursue a grant, mark that honestly.

## Current Test Case Context

```json
{
  "sampleUserId": "tapiz-mariposa-denver-household",
  "description": "Anonymized senior or disabled household in Denver public multifamily housing.",
  "sourceForm": {
    "sampleUserId": "tapiz-mariposa-denver-household",
    "description": "Anonymized senior or disabled household in Denver public multifamily housing.",
    "companyName": "Anonymized senior or disabled household at Tapiz at Mariposa",
    "website": "https://www.denverhousing.org/",
    "organizationType": "Residential",
    "organizationSize": "Household",
    "siteAddress": "1099 Osage Street, Denver, CO 80204, USA",
    "electricUtilityProvider": "Xcel Energy",
    "gasUtilityProvider": "Xcel Energy",
    "ownershipStatus": "Lease",
    "buildingType": "Multifamily / Apartment Building",
    "squareFootage": "Unknown",
    "primaryActivityText": "Residential occupancy in senior or disabled public housing",
    "naicsCodes": [
      "531110",
      "623312"
    ],
    "publicSourceNotes": "Denver Housing Authority identifies Tapiz at Mariposa at 1099 Osage Street with 100 units. Household is anonymized.",
    "notes": "Tests medically vulnerable and income-qualified residential matching, multifamily ownership ambiguity, and Denver electric/gas utility alignment.",
    "project": {
      "stage": "exploring"
    }
  },
  "normalizedProfile": {
    "site": {
      "addressStructured": {
        "raw": "1099 Osage Street, Denver, CO 80204, USA",
        "stateCode": "CO",
        "zip5": "80204"
      },
      "geo": {
        "stateCode": "CO",
        "zip5": "80204",
        "countyFips": null,
        "placeGeoid": null,
        "censusTractGeoid": null,
        "designations": []
      },
      "utility": {
        "electric": {
          "selfReportedName": "Xcel Energy",
          "distributionUtilityId": "UTIL_XCEL",
          "territoryCandidates": [
            "UTIL_XCEL"
          ],
          "verificationStatus": "self_reported_unverified",
          "customerClass": null
        }
      },
      "ownershipRelationship": "tenant",
      "buildingTypes": [
        "multifamily_residential"
      ],
      "squareFootage": {
        "value": null,
        "raw": "Unknown",
        "parsingStatus": "needs_validation"
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
      "customer_class",
      "gas_rate_schedule",
      "gas_utility_provider",
      "irrigation_meter_present",
      "meter_size",
      "monthly_kwh",
      "monthly_therms",
      "monthly_water_use",
      "rate_schedule",
      "service_address",
      "sewer_cost",
      "stormwater_fee",
      "total_electric_cost",
      "total_gas_cost",
      "total_water_cost",
      "utility_provider",
      "water_provider",
      "water_unit"
    ],
    "latestUtilityProvider": "Denver Water",
    "annualKwh": 3800,
    "annualElectricCost": 620,
    "averageCostPerKwh": 0.1632,
    "utilitySummaries": [
      {
        "utilityCategory": "electric",
        "annualCost": 620
      },
      {
        "utilityCategory": "gas",
        "annualCost": 420
      },
      {
        "utilityCategory": "water_sewer",
        "annualCost": 300
      }
    ]
  },
  "siteTaxProfile": {
    "availableFieldIds": [
      "state_code",
      "ownership_status",
      "direct_property_tax_bill_to_applicant",
      "household_priority_status",
      "building_type",
      "eligible_current_batch_tax_geography"
    ]
  },
  "existingTaxFacts": [
    {
      "inputKey": "state_code",
      "value": "CO",
      "sourceFileId": "taxfile_batch2_013_tenant_intake_2026",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "hidden_derived",
      "userOverrideAllowed": false,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "low"
    },
    {
      "inputKey": "ownership_status",
      "value": "Lease",
      "sourceFileId": "taxfile_batch2_013_tenant_intake_2026",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "organization_profile",
      "userOverrideAllowed": true,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "low"
    },
    {
      "inputKey": "taxpayer_has_direct_property_tax_bill",
      "value": false,
      "sourceFileId": "taxfile_batch2_013_tenant_intake_2026",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "property_tax_profile",
      "userOverrideAllowed": true,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "medium"
    },
    {
      "inputKey": "tenant_controls_common_area_or_roof_systems",
      "value": false,
      "sourceFileId": "taxfile_batch2_013_tenant_intake_2026",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "property_tax_profile",
      "userOverrideAllowed": true,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "medium"
    },
    {
      "inputKey": "income_or_medical_priority_status_needs_program_confirmation",
      "value": true,
      "sourceFileId": "taxfile_batch2_013_tenant_intake_2026",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "organization_profile",
      "userOverrideAllowed": true,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "medium"
    }
  ],
  "retrofitSummaries": [
    {
      "retrofitTypeId": "rooftop_solar_pv",
      "displayName": "Rooftop solar PV",
      "parentCategory": "solar_renewable_electricity",
      "opportunityCount": 8,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 10000000,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "Opportunity savings use source-backed incentive rules and reviewed v2 calculation packages when a matched rule is complete enough to include.",
          "This is not a customer quote or final savings estimate."
        ]
      }
    },
    {
      "retrofitTypeId": "high_efficiency_hvac_replacement",
      "displayName": "High-efficiency HVAC replacement",
      "parentCategory": "hvac_space_conditioning",
      "opportunityCount": 7,
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
        "SOURCE_DSIRE:dsire_program_id:5558"
      ]
    },
    {
      "retrofitTypeId": "air_sealing_weatherization",
      "displayName": "Air sealing / weatherization",
      "parentCategory": "building_envelope",
      "opportunityCount": 6,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 194600,
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
      "opportunityCount": 6,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 316000,
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
      "opportunityCount": 5,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 1576000,
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
      "opportunityCount": 5,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 680000,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "No source-backed OpportunityIncentiveRule or v2 calculation package matched this retrofit preview, so opportunity savings are shown as $0.",
          "This is not a customer quote or final savings estimate."
        ]
      },
      "grantOpportunityIds": [
        "SOURCE_DSIRE:dsire_program_id:2948"
      ]
    },
    {
      "retrofitTypeId": "heat_pump_hvac_retrofit",
      "displayName": "Heat pump HVAC retrofit",
      "parentCategory": "hvac_space_conditioning",
      "opportunityCount": 4,
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
      "opportunityCount": 4,
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
      "retrofitTypeId": "battery_storage_system",
      "displayName": "Battery storage system",
      "parentCategory": "energy_storage_resilience",
      "opportunityCount": 3,
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
      "retrofitTypeId": "ev_charger_installation",
      "displayName": "EV charger installation",
      "parentCategory": "ev_charging_transportation",
      "opportunityCount": 2,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 848000,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "No source-backed OpportunityIncentiveRule or v2 calculation package matched this retrofit preview, so opportunity savings are shown as $0.",
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
          "No source-backed OpportunityIncentiveRule or v2 calculation package matched this retrofit preview, so opportunity savings are shown as $0.",
          "This is not a customer quote or final savings estimate."
        ]
      }
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
      "retrofitTypeId": "led_lighting_retrofit",
      "displayName": "LED lighting retrofit",
      "parentCategory": "lighting",
      "opportunityCount": 2,
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
      "retrofitTypeId": "community_solar_subscription",
      "displayName": "Community solar subscription",
      "parentCategory": "solar_renewable_electricity",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 50000,
        "assumptions": [
          "Community solar preview models the subscribed annual bill credit value, not an owned onsite asset.",
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "No source-backed OpportunityIncentiveRule or v2 calculation package matched this retrofit preview, so opportunity savings are shown as $0.",
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
          "No source-backed OpportunityIncentiveRule or v2 calculation package matched this retrofit preview, so opportunity savings are shown as $0.",
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
          "No source-backed OpportunityIncentiveRule or v2 calculation package matched this retrofit preview, so opportunity savings are shown as $0.",
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
          "No source-backed OpportunityIncentiveRule or v2 calculation package matched this retrofit preview, so opportunity savings are shown as $0.",
          "This is not a customer quote or final savings estimate."
        ]
      }
    },
    {
      "retrofitTypeId": "low_flow_fixture_retrofit",
      "displayName": "Low-flow fixture retrofit",
      "parentCategory": "water_efficiency",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 116400,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:5558",
          "opportunityName": "City of Aspen and Pitkin County - Renewable Energy Mitigation Program Grants",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5558/city-of-aspen-and-pitkin-county-renewable-energy-mitigation-program-grants",
          "websiteUrl": "https://www.aspencore.org/grants-and-funding-programs",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Grant/Rebate Program",
          "administrator": "Community Office for Resource Efficiency (CORE)",
          "state": "CO",
          "rankScore": 100,
          "opportunityDataConfidence": 0.81,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CO matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: energy_efficiency, renewable_energy, solar, hvac."
          ]
        }
      ]
    },
    {
      "retrofitTypeId": "solar_water_heating_system",
      "displayName": "Solar water heating system",
      "grantOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2948",
          "opportunityName": "City of Boulder - Solar Grant Program",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2948/city-of-boulder-solar-grant-program",
          "websiteUrl": "https://bouldercolorado.gov/services/solar-grants",
          "applicationUrl": "https://energysmartyes.com/electrification/solar/cob-grant/",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "rolling",
          "programType": "Solar Grant",
          "administrator": "City of Boulder",
          "state": "CO",
          "rankScore": 100,
          "opportunityDataConfidence": 0.82,
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state CO matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: residential.",
            "Site or facility type matches: multifamily_residential.",
            "Opportunity technology is available for retrofit discovery: solar, energy_efficiency."
          ]
        }
      ]
    }
  ],
  "blockers": [
    {
      "value": "User site or facility type (multifamily_residential) does not match broad_commercial eligibility.",
      "count": 362
    },
    {
      "value": "User site or facility type (multifamily_residential) does not match broad_nonresidential eligibility.",
      "count": 208
    },
    {
      "value": "Project site state CO does not match opportunity geography CA.",
      "count": 176
    },
    {
      "value": "Project site state CO does not match opportunity geography MN.",
      "count": 112
    },
    {
      "value": "Applicant type residential does not match eligible sectors commercial.",
      "count": 80
    },
    {
      "value": "Project site state CO does not match opportunity geography MA.",
      "count": 70
    },
    {
      "value": "Project site state CO does not match opportunity geography OR.",
      "count": 70
    },
    {
      "value": "Project site state CO does not match opportunity geography TX.",
      "count": 67
    },
    {
      "value": "Project site state CO does not match opportunity geography WA.",
      "count": 61
    },
    {
      "value": "Applicant type residential does not match eligible sectors commercial, other, industrial.",
      "count": 55
    },
    {
      "value": "Project site state CO does not match opportunity geography FL.",
      "count": 55
    },
    {
      "value": "Project site state CO does not match opportunity geography MD.",
      "count": 53
    },
    {
      "value": "Project site state CO does not match opportunity geography IL.",
      "count": 47
    },
    {
      "value": "Project site state CO does not match opportunity geography IN.",
      "count": 46
    },
    {
      "value": "Project site state CO does not match opportunity geography PA.",
      "count": 46
    },
    {
      "value": "Project site state CO does not match opportunity geography NY.",
      "count": 43
    },
    {
      "value": "Project site state CO does not match opportunity geography NC.",
      "count": 40
    },
    {
      "value": "Applicant type residential does not match eligible sectors commercial, industrial.",
      "count": 38
    },
    {
      "value": "Opportunity site or facility specificity (agricultural_facility) does not match the user's site type (multifamily_residential).",
      "count": 38
    },
    {
      "value": "Opportunity site or facility specificity (education_campus) does not match the user's site type (multifamily_residential).",
      "count": 38
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
  "sampleUserId": "tapiz-mariposa-denver-household",
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
