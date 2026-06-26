# Sample Matching Report

Generated: 2026-06-26T05:44:25.639Z
Matcher clock: 2026-06-26T05:41:37.982Z
Opportunities evaluated: 1887
Archived opportunities skipped: 209
Sample users evaluated: 10
Pairings evaluated: 18870

This is a deterministic first-pass matcher audit. It is not a human-reviewed ground-truth label set yet.
The script evaluates every current opportunity against each sample profile, then reports the strongest matches and the most common unknowns/blockers.
Full JSON output: `/tmp/retrofi-sample-matching-results.json`

## Global Notes

- Hard failures are limited to explicit unavailable status/deadline, state mismatch, utility mismatch, residential-only mismatch, applicant mismatch, technology mismatch, and parsed numeric threshold failure.
- Utility restrictions use the generated review artifact when present. `required` gates matching; `none`, `not_applicable`, and `none_found_after_review` are treated as pass; only unresolved ambiguous utility evidence remains `unknown`.
- Facility eligibility uses the generated review artifact when present. Artifact: not loaded.
- Utility review artifact: not loaded.
- Missing building specificity and ambiguous opportunity geography return `unknown` rather than a false rejection.
- Current form limitations are visible for municipal-utility sample users because the utility picker does not include every California municipal utility.
- This report is designed to be iterated: manually inspect top false positives/false negatives, update extraction/ontology rules, rerun.

## Sample User Results

### california-endowment-hq

Owner-controlled nonprofit office headquarters and conference center in LADWP electric territory.

Normalized profile:
```json
{
  "organizationTypes": [
    "nonprofit"
  ],
  "stateCode": "CA",
  "zip5": "90012",
  "utility": {
    "selfReportedName": "Los Angeles Department of Water and Power",
    "distributionUtilityId": "UTIL_LADWP",
    "territoryCandidates": [
      "UTIL_LADWP"
    ],
    "verificationStatus": "self_reported_unverified",
    "customerClass": null
  },
  "ownershipRelationship": "owner",
  "buildingTypes": [
    "office_admin"
  ],
  "squareFootage": {
    "value": 210459,
    "raw": "210,459",
    "parsingStatus": "parsed"
  },
  "technologyIds": [
    "lighting",
    "hvac",
    "building_controls",
    "commercial_kitchen",
    "ev_charging",
    "solar",
    "battery_storage",
    "water_efficiency"
  ]
}
```

Status counts:
```json
{
  "eligible_active": 20,
  "likely_eligible": 0,
  "needs_information": 0,
  "upcoming": 18,
  "manual_review": 6,
  "ineligible": 1843,
  "unavailable": 0
}
```

Top matches requiring no hard blocker:
- eligible_active / 100: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible_active / 100: LADWP - Feed-in Tariff (FiT) Program (SOURCE_DSIRE:dsire_program_id:5685)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches LADWP.
- eligible_active / 100: GFO-25-607 - Clean Transportation Program Hydrogen Infrastructure Project Opportunity (HIPO) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-607)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible_active / 100: RFQ-25-401 - Energy Code Compliance Evaluation Support (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:RFQ-25-401)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible_active / 100: GFO-25-605 – Reliable Electric Charging for Eligible School-bus Sites (RECESS) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-605)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible_active / 100: San Diego County - Green Building Program (SOURCE_DSIRE:dsire_program_id:1105)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; No utility restriction was found after source review.
- eligible_active / 100: Plumas-Sierra REC - Commercial and Irrigation Rebate Program (SOURCE_DSIRE:dsire_program_id:22067)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; No utility restriction was found after source review.
- eligible_active / 100: GFO-25-305 - Non-Energy Impacts of Integrated Energy Retrofit Packages from the Equitable Building Decarbonization Program (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-305)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible_active / 100: GFO-25-308 - Distributed Clean Hydrogen Production with Onsite End Use (H2ONSITE) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-308)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Energy Audit and Renewable Energy Development Assistance (EA/REDA) Program (SOURCE_DSIRE:dsire_program_id:5681)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible_active / 100: GFO-25-603 - California’s National Electric Vehicle Infrastructure Formula Program – Solicitation 6 Community Charging (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-603)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.

Common next questions:
- project.technologyIds: 6

Common unresolved requirements among promising matches:
- Opportunity appears upcoming; application timing should be verified.: 18
- No project technology was normalized.: 6

Retrofit types inferred from promising matches:
- Ground-source / geothermal heat pump: 6
- Battery storage system: 5
- Biomass / biogas energy system: 5
- EV charger installation: 5
- High-efficiency HVAC replacement: 5
- LED lighting retrofit: 5
- Solar water heating system: 3
- Combined heat and power system: 2

Common blockers across rejected/unavailable opportunities:
- User site or facility type (office_admin) does not match broad_residential eligibility.: 581
- Opportunity appears residential-only and the user profile is nonresidential.: 438
- Project site state CA does not match opportunity geography MN.: 86
- Opportunity site or facility specificity (multifamily_residential) does not match the user's site type (office_admin).: 71
- Project site state CA does not match opportunity geography OR.: 59

### ikea-burbank

Large-format Burbank retail store with showroom, warehouse, restaurant, and EV/solar potential.

Normalized profile:
```json
{
  "organizationTypes": [
    "commercial"
  ],
  "stateCode": "CA",
  "zip5": "91502",
  "utility": {
    "selfReportedName": "Burbank Water and Power",
    "distributionUtilityId": "UTIL_BWP",
    "territoryCandidates": [
      "UTIL_BWP"
    ],
    "verificationStatus": "self_reported_unverified",
    "customerClass": null
  },
  "ownershipRelationship": "unknown",
  "buildingTypes": [
    "retail_storefront"
  ],
  "squareFootage": {
    "value": 456000,
    "raw": "456,000",
    "parsingStatus": "parsed"
  },
  "technologyIds": [
    "lighting",
    "hvac",
    "building_controls",
    "commercial_kitchen",
    "solar",
    "battery_storage",
    "ev_charging",
    "water_efficiency"
  ]
}
```

Status counts:
```json
{
  "eligible_active": 18,
  "likely_eligible": 0,
  "needs_information": 0,
  "upcoming": 18,
  "manual_review": 5,
  "ineligible": 1846,
  "unavailable": 0
}
```

Top matches requiring no hard blocker:
- eligible_active / 100: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible_active / 100: Burbank Water & Power - Energy Solutions Business Rebate Program (SOURCE_DSIRE:dsire_program_id:1630)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches Burbank Water and Power.
- eligible_active / 100: GFO-25-607 - Clean Transportation Program Hydrogen Infrastructure Project Opportunity (HIPO) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-607)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible_active / 100: RFQ-25-401 - Energy Code Compliance Evaluation Support (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:RFQ-25-401)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible_active / 100: GFO-25-605 – Reliable Electric Charging for Eligible School-bus Sites (RECESS) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-605)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible_active / 100: San Diego County - Green Building Program (SOURCE_DSIRE:dsire_program_id:1105)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; No utility restriction was found after source review.
- eligible_active / 100: Plumas-Sierra REC - Commercial and Irrigation Rebate Program (SOURCE_DSIRE:dsire_program_id:22067)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; No utility restriction was found after source review.
- eligible_active / 100: GFO-25-305 - Non-Energy Impacts of Integrated Energy Retrofit Packages from the Equitable Building Decarbonization Program (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-305)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible_active / 100: GFO-25-308 - Distributed Clean Hydrogen Production with Onsite End Use (H2ONSITE) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-308)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible_active / 100: GFO-25-603 - California’s National Electric Vehicle Infrastructure Formula Program – Solicitation 6 Community Charging (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-603)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Grants (SOURCE_DSIRE:dsire_program_id:917)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.

Common next questions:
- project.technologyIds: 6

Common unresolved requirements among promising matches:
- Opportunity appears upcoming; application timing should be verified.: 18
- No project technology was normalized.: 6

Retrofit types inferred from promising matches:
- Battery storage system: 6
- Ground-source / geothermal heat pump: 6
- High-efficiency HVAC replacement: 6
- Biomass / biogas energy system: 5
- EV charger installation: 5
- LED lighting retrofit: 5
- Solar water heating system: 3
- Combined heat and power system: 2

Common blockers across rejected/unavailable opportunities:
- User site or facility type (retail_storefront) does not match broad_residential eligibility.: 581
- Opportunity appears residential-only and the user profile is nonresidential.: 438
- Project site state CA does not match opportunity geography MN.: 86
- Opportunity site or facility specificity (multifamily_residential) does not match the user's site type (retail_storefront).: 71
- Project site state CA does not match opportunity geography OR.: 59

### juniper-and-ivy-san-diego

Independent San Diego restaurant and commercial kitchen in SDG&E distribution territory.

Normalized profile:
```json
{
  "organizationTypes": [
    "commercial"
  ],
  "stateCode": "CA",
  "zip5": "92101",
  "utility": {
    "selfReportedName": "San Diego Gas & Electric",
    "distributionUtilityId": "UTIL_SDGE",
    "territoryCandidates": [
      "UTIL_SDGE"
    ],
    "verificationStatus": "self_reported_unverified",
    "customerClass": null
  },
  "ownershipRelationship": "tenant",
  "buildingTypes": [
    "restaurant_foodservice"
  ],
  "squareFootage": {
    "value": 7580,
    "raw": "7,580",
    "parsingStatus": "parsed"
  },
  "technologyIds": [
    "commercial_kitchen",
    "hvac",
    "building_controls",
    "refrigeration",
    "lighting",
    "water_efficiency"
  ]
}
```

Status counts:
```json
{
  "eligible_active": 19,
  "likely_eligible": 10,
  "needs_information": 0,
  "upcoming": 15,
  "manual_review": 6,
  "ineligible": 1837,
  "unavailable": 0
}
```

Top matches requiring no hard blocker:
- eligible_active / 100: Comfortably CA (SOURCE_SDGE_BUSINESS:program_url:comfortablyca_com)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches SDG&E.
- eligible_active / 100: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible_active / 100: GRID-Lodging (SOURCE_SDGE_BUSINESS:program_url:mendotagroup_com_sdge_grid_lodging)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches SDG&E.
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible_active / 100: SD Energy Edge (SOURCE_SDGE_BUSINESS:program_url:sdenergyedge_com)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches SDG&E.
- eligible_active / 100: RFQ-25-401 - Energy Code Compliance Evaluation Support (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:RFQ-25-401)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible_active / 100: San Diego County - Green Building Program (SOURCE_DSIRE:dsire_program_id:1105)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; No utility restriction was found after source review.
- eligible_active / 100: Small Business Saver Program (SBS) (SOURCE_SDGE_BUSINESS:program_url:smallbusinesssaver_net)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches SDG&E.
- eligible_active / 100: Plumas-Sierra REC - Commercial and Irrigation Rebate Program (SOURCE_DSIRE:dsire_program_id:22067)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; No utility restriction was found after source review.
- eligible_active / 100: GFO-25-305 - Non-Energy Impacts of Integrated Energy Retrofit Packages from the Equitable Building Decarbonization Program (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-305)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible_active / 100: California Foodservice Instant Rebates (SOURCE_SDGE_BUSINESS:program_url:caenergywise_com_instant_rebates)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches SDG&E.
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Grants (SOURCE_DSIRE:dsire_program_id:917)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.

Common next questions:
- project.technologyIds: 6

Common unresolved requirements among promising matches:
- Opportunity appears upcoming; application timing should be verified.: 15
- Availability is uncertain.: 10
- No project technology was normalized.: 6

Retrofit types inferred from promising matches:
- High-efficiency HVAC replacement: 8
- Ground-source / geothermal heat pump: 5
- LED lighting retrofit: 5
- Biomass / biogas energy system: 4
- Automated demand response controls: 3
- Battery storage system: 3
- Combined heat and power system: 2
- Resilience / backup power system: 2

Common blockers across rejected/unavailable opportunities:
- User site or facility type (restaurant_foodservice) does not match broad_residential eligibility.: 581
- Opportunity appears residential-only and the user profile is nonresidential.: 438
- Selected improvements do not match opportunity technologies (solar).: 158
- Selected improvements do not match opportunity technologies (ev_charging).: 140
- Project site state CA does not match opportunity geography MN.: 86

### northgate-market-anaheim

Anaheim full-service grocery store with refrigeration, HVAC, lighting, and food-prep loads.

Normalized profile:
```json
{
  "organizationTypes": [
    "commercial"
  ],
  "stateCode": "CA",
  "zip5": "92806",
  "utility": {
    "selfReportedName": "Anaheim Public Utilities",
    "distributionUtilityId": "UTIL_ANAHEIM",
    "territoryCandidates": [
      "UTIL_ANAHEIM"
    ],
    "verificationStatus": "self_reported_unverified",
    "customerClass": null
  },
  "ownershipRelationship": "tenant",
  "buildingTypes": [
    "grocery_food_retail"
  ],
  "squareFootage": {
    "value": 45000,
    "raw": "45,000",
    "parsingStatus": "parsed"
  },
  "technologyIds": [
    "refrigeration",
    "building_controls",
    "hvac",
    "lighting",
    "solar",
    "battery_storage",
    "ev_charging",
    "water_efficiency"
  ]
}
```

Status counts:
```json
{
  "eligible_active": 22,
  "likely_eligible": 0,
  "needs_information": 0,
  "upcoming": 18,
  "manual_review": 5,
  "ineligible": 1842,
  "unavailable": 0
}
```

Top matches requiring no hard blocker:
- eligible_active / 100: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible_active / 100: Anaheim Public Utilities - Small Business Energy & Water Direct Install Program (SOURCE_DSIRE:dsire_program_id:1625)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches Anaheim Public Utilities.
- eligible_active / 100: GFO-25-607 - Clean Transportation Program Hydrogen Infrastructure Project Opportunity (HIPO) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-607)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible_active / 100: RFQ-25-401 - Energy Code Compliance Evaluation Support (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:RFQ-25-401)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible_active / 100: GFO-25-605 – Reliable Electric Charging for Eligible School-bus Sites (RECESS) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-605)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible_active / 100: San Diego County - Green Building Program (SOURCE_DSIRE:dsire_program_id:1105)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; No utility restriction was found after source review.
- eligible_active / 100: Anaheim Public Utilities - Personal Use EV Charger Rebates (SOURCE_DSIRE:dsire_program_id:22275)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches Anaheim Public Utilities.
- eligible_active / 100: Plumas-Sierra REC - Commercial and Irrigation Rebate Program (SOURCE_DSIRE:dsire_program_id:22067)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; No utility restriction was found after source review.
- eligible_active / 100: Anaheim Public Utilities - EV Fleet Charger and Infrastructure Rebate (SOURCE_DSIRE:dsire_program_id:22277)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches Anaheim Public Utilities.
- eligible_active / 100: Anaheim Public Utilities - Commercial & Industrial New Construction Rebate Program (SOURCE_DSIRE:dsire_program_id:4809)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches Anaheim Public Utilities.
- eligible_active / 100: GFO-25-305 - Non-Energy Impacts of Integrated Energy Retrofit Packages from the Equitable Building Decarbonization Program (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-305)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.

Common next questions:
- project.technologyIds: 6

Common unresolved requirements among promising matches:
- Opportunity appears upcoming; application timing should be verified.: 18
- No project technology was normalized.: 6

Retrofit types inferred from promising matches:
- EV charger installation: 8
- High-efficiency HVAC replacement: 7
- Ground-source / geothermal heat pump: 6
- LED lighting retrofit: 6
- Battery storage system: 5
- Biomass / biogas energy system: 5
- Level 2 EV charger installation: 3
- Solar water heating system: 3

Common blockers across rejected/unavailable opportunities:
- User site or facility type (grocery_food_retail) does not match broad_residential eligibility.: 581
- Opportunity appears residential-only and the user profile is nonresidential.: 438
- Project site state CA does not match opportunity geography MN.: 86
- Opportunity site or facility specificity (multifamily_residential) does not match the user's site type (grocery_food_retail).: 71
- Project site state CA does not match opportunity geography OR.: 59

### melissas-vernon-distribution

Vernon refrigerated produce distribution and packing facility served by municipal electric and gas utilities.

Normalized profile:
```json
{
  "organizationTypes": [
    "industrial"
  ],
  "stateCode": "CA",
  "zip5": "90058",
  "utility": {
    "selfReportedName": "Vernon Public Utilities",
    "distributionUtilityId": "UTIL_VPU",
    "territoryCandidates": [
      "UTIL_VPU"
    ],
    "verificationStatus": "self_reported_unverified",
    "customerClass": null
  },
  "ownershipRelationship": "unknown",
  "buildingTypes": [
    "warehouse_logistics"
  ],
  "squareFootage": {
    "value": 280000,
    "raw": "280,000",
    "parsingStatus": "parsed"
  },
  "technologyIds": [
    "refrigeration",
    "building_controls",
    "lighting",
    "solar",
    "battery_storage",
    "ev_charging",
    "water_efficiency"
  ]
}
```

Status counts:
```json
{
  "eligible_active": 17,
  "likely_eligible": 0,
  "needs_information": 0,
  "upcoming": 17,
  "manual_review": 5,
  "ineligible": 1848,
  "unavailable": 0
}
```

Top matches requiring no hard blocker:
- eligible_active / 100: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible_active / 100: GFO-25-607 - Clean Transportation Program Hydrogen Infrastructure Project Opportunity (HIPO) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-607)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible_active / 100: RFQ-25-401 - Energy Code Compliance Evaluation Support (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:RFQ-25-401)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible_active / 100: GFO-25-605 – Reliable Electric Charging for Eligible School-bus Sites (RECESS) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-605)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible_active / 100: San Diego County - Green Building Program (SOURCE_DSIRE:dsire_program_id:1105)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; No utility restriction was found after source review.
- eligible_active / 100: Plumas-Sierra REC - Commercial and Irrigation Rebate Program (SOURCE_DSIRE:dsire_program_id:22067)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; No utility restriction was found after source review.
- eligible_active / 100: GFO-25-305 - Non-Energy Impacts of Integrated Energy Retrofit Packages from the Equitable Building Decarbonization Program (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-305)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible_active / 100: GFO-25-308 - Distributed Clean Hydrogen Production with Onsite End Use (H2ONSITE) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-308)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible_active / 100: GFO-25-603 - California’s National Electric Vehicle Infrastructure Formula Program – Solicitation 6 Community Charging (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-603)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Grants (SOURCE_DSIRE:dsire_program_id:917)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible_active / 100: Local Option - Municipal Energy Districts (SOURCE_DSIRE:dsire_program_id:3527)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Utility provider is not applicable to this opportunity.

Common next questions:
- project.technologyIds: 6

Common unresolved requirements among promising matches:
- Opportunity appears upcoming; application timing should be verified.: 17
- No project technology was normalized.: 6

Retrofit types inferred from promising matches:
- Ground-source / geothermal heat pump: 6
- Battery storage system: 5
- Biomass / biogas energy system: 5
- EV charger installation: 5
- High-efficiency HVAC replacement: 4
- LED lighting retrofit: 4
- Solar water heating system: 3
- Combined heat and power system: 2

Common blockers across rejected/unavailable opportunities:
- User site or facility type (warehouse_logistics) does not match broad_residential eligibility.: 581
- Opportunity appears residential-only and the user profile is nonresidential.: 438
- Project site state CA does not match opportunity geography MN.: 86
- Opportunity site or facility specificity (multifamily_residential) does not match the user's site type (warehouse_logistics).: 71
- Project site state CA does not match opportunity geography OR.: 59

### fender-corona-plant

Corona musical-instrument manufacturing plant in SCE electric and SoCalGas gas territory.

Normalized profile:
```json
{
  "organizationTypes": [
    "industrial"
  ],
  "stateCode": "CA",
  "zip5": "92880",
  "utility": {
    "selfReportedName": "Southern California Edison",
    "distributionUtilityId": "UTIL_SCE",
    "territoryCandidates": [
      "UTIL_SCE"
    ],
    "verificationStatus": "self_reported_unverified",
    "customerClass": null
  },
  "ownershipRelationship": "unknown",
  "buildingTypes": [
    "industrial_manufacturing"
  ],
  "squareFootage": {
    "value": 181593,
    "raw": "181,593",
    "parsingStatus": "parsed"
  },
  "technologyIds": [
    "hvac",
    "building_controls",
    "lighting",
    "solar",
    "battery_storage",
    "ev_charging"
  ]
}
```

Status counts:
```json
{
  "eligible_active": 12,
  "likely_eligible": 0,
  "needs_information": 0,
  "upcoming": 5,
  "manual_review": 7,
  "ineligible": 1863,
  "unavailable": 0
}
```

Top matches requiring no hard blocker:
- eligible_active / 100: USDA - Biorefinery, Renewable Chemical, and Biobased Product Manufacturing Assistance Program (SOURCE_DSIRE:dsire_program_id:5313)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible_active / 100: Self-Generation Incentive Program (SOURCE_DSIRE:dsire_program_id:552)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches Southern California Edison.
- eligible_active / 100: GFO-25-308 - Distributed Clean Hydrogen Production with Onsite End Use (H2ONSITE) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-308)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible_active / 100: U.S. Department of Energy - Loan Guarantee Program (SOURCE_DSIRE:dsire_program_id:3071)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Grants (SOURCE_DSIRE:dsire_program_id:917)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible_active / 100: Local Option - Municipal Energy Districts (SOURCE_DSIRE:dsire_program_id:3527)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible_active / 100: Modified Accelerated Cost-Recovery System (MACRS) (SOURCE_DSIRE:dsire_program_id:676)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible_active / 100: GFO-22-903 - Cost Share for Federal Funding Opportunities Clean Hydrogen Program (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-22-903)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible_active / 100: SCE - Non-Residential On-Bill Financing Program (SOURCE_DSIRE:dsire_program_id:4250)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches Southern California Edison.
- eligible_active / 100: Sonoma County Energy Independence Program (SCEIP) (SOURCE_DSIRE:dsire_program_id:3334)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches Southern California Edison.
- eligible_active / 100: Marin Clean Energy - Feed-In Tariff Plus (SOURCE_DSIRE:dsire_program_id:22615)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; No utility restriction was found after source review.

Common next questions:
- project.technologyIds: 2

Common unresolved requirements among promising matches:
- Opportunity appears upcoming; application timing should be verified.: 5
- No project technology was normalized.: 2

Retrofit types inferred from promising matches:
- Biomass / biogas energy system: 6
- Ground-source / geothermal heat pump: 5
- Battery storage system: 4
- Combined heat and power system: 2
- High-efficiency HVAC replacement: 2
- Small wind turbine: 2
- Solar water heating system: 2
- Energy audit: 1

Common blockers across rejected/unavailable opportunities:
- User site or facility type (industrial_manufacturing) does not match broad_residential eligibility.: 581
- Opportunity appears residential-only and the user profile is nonresidential.: 438
- User site or facility type (industrial_manufacturing) does not match broad_commercial eligibility.: 396
- Project site state CA does not match opportunity geography MN.: 86
- Opportunity site or facility specificity (multifamily_residential) does not match the user's site type (industrial_manufacturing).: 71

### westin-pasadena

Full-service Pasadena hotel and conference venue in Pasadena Water and Power electric territory.

Normalized profile:
```json
{
  "organizationTypes": [
    "commercial"
  ],
  "stateCode": "CA",
  "zip5": "91101",
  "utility": {
    "selfReportedName": "Pasadena Water and Power",
    "distributionUtilityId": "UTIL_PWP",
    "territoryCandidates": [
      "UTIL_PWP"
    ],
    "verificationStatus": "self_reported_unverified",
    "customerClass": null
  },
  "ownershipRelationship": "unknown",
  "buildingTypes": [
    "hospitality_lodging"
  ],
  "squareFootage": {
    "value": 266000,
    "raw": "266,000",
    "parsingStatus": "parsed"
  },
  "technologyIds": [
    "hvac",
    "building_controls",
    "lighting",
    "commercial_kitchen",
    "water_efficiency",
    "ev_charging",
    "solar",
    "battery_storage"
  ]
}
```

Status counts:
```json
{
  "eligible_active": 19,
  "likely_eligible": 0,
  "needs_information": 0,
  "upcoming": 18,
  "manual_review": 5,
  "ineligible": 1845,
  "unavailable": 0
}
```

Top matches requiring no hard blocker:
- eligible_active / 100: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible_active / 100: Pasadena Water and Power - Commercial Charger Incentive Program (SOURCE_DSIRE:dsire_program_id:22289)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches Pasadena Water and Power.
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible_active / 100: GFO-25-607 - Clean Transportation Program Hydrogen Infrastructure Project Opportunity (HIPO) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-607)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible_active / 100: RFQ-25-401 - Energy Code Compliance Evaluation Support (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:RFQ-25-401)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible_active / 100: GFO-25-605 – Reliable Electric Charging for Eligible School-bus Sites (RECESS) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-605)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible_active / 100: San Diego County - Green Building Program (SOURCE_DSIRE:dsire_program_id:1105)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; No utility restriction was found after source review.
- eligible_active / 100: Plumas-Sierra REC - Commercial and Irrigation Rebate Program (SOURCE_DSIRE:dsire_program_id:22067)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; No utility restriction was found after source review.
- eligible_active / 100: GFO-25-305 - Non-Energy Impacts of Integrated Energy Retrofit Packages from the Equitable Building Decarbonization Program (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-305)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible_active / 100: GFO-25-308 - Distributed Clean Hydrogen Production with Onsite End Use (H2ONSITE) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-308)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible_active / 100: GFO-25-603 - California’s National Electric Vehicle Infrastructure Formula Program – Solicitation 6 Community Charging (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-603)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Grants (SOURCE_DSIRE:dsire_program_id:917)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.

Common next questions:
- project.technologyIds: 6

Common unresolved requirements among promising matches:
- Opportunity appears upcoming; application timing should be verified.: 18
- No project technology was normalized.: 6

Retrofit types inferred from promising matches:
- EV charger installation: 6
- Ground-source / geothermal heat pump: 6
- High-efficiency HVAC replacement: 6
- Battery storage system: 5
- Biomass / biogas energy system: 5
- LED lighting retrofit: 5
- Solar water heating system: 3
- Combined heat and power system: 2

Common blockers across rejected/unavailable opportunities:
- User site or facility type (hospitality_lodging) does not match broad_residential eligibility.: 581
- Opportunity appears residential-only and the user profile is nonresidential.: 438
- Project site state CA does not match opportunity geography MN.: 86
- Opportunity site or facility specificity (multifamily_residential) does not match the user's site type (hospitality_lodging).: 71
- Project site state CA does not match opportunity geography OR.: 59

### one-community-health-midtown

Sacramento nonprofit community health center with SMUD electric service and PG&E gas service.

Normalized profile:
```json
{
  "organizationTypes": [
    "nonprofit"
  ],
  "stateCode": "CA",
  "zip5": "95811",
  "utility": {
    "selfReportedName": "Sacramento Municipal Utility District",
    "distributionUtilityId": "UTIL_SMUD",
    "territoryCandidates": [
      "UTIL_SMUD"
    ],
    "verificationStatus": "self_reported_unverified",
    "customerClass": null
  },
  "ownershipRelationship": "unknown",
  "buildingTypes": [
    "healthcare"
  ],
  "squareFootage": {
    "value": 59000,
    "raw": "59,000",
    "parsingStatus": "parsed"
  },
  "technologyIds": [
    "hvac",
    "building_controls",
    "lighting",
    "refrigeration",
    "solar",
    "battery_storage",
    "ev_charging",
    "water_efficiency"
  ]
}
```

Status counts:
```json
{
  "eligible_active": 20,
  "likely_eligible": 1,
  "needs_information": 0,
  "upcoming": 18,
  "manual_review": 6,
  "ineligible": 1842,
  "unavailable": 0
}
```

Top matches requiring no hard blocker:
- eligible_active / 100: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible_active / 100: GFO-25-607 - Clean Transportation Program Hydrogen Infrastructure Project Opportunity (HIPO) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-607)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible_active / 100: RFQ-25-401 - Energy Code Compliance Evaluation Support (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:RFQ-25-401)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible_active / 100: GFO-25-605 – Reliable Electric Charging for Eligible School-bus Sites (RECESS) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-605)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible_active / 100: San Diego County - Green Building Program (SOURCE_DSIRE:dsire_program_id:1105)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; No utility restriction was found after source review.
- eligible_active / 100: Plumas-Sierra REC - Commercial and Irrigation Rebate Program (SOURCE_DSIRE:dsire_program_id:22067)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; No utility restriction was found after source review.
- eligible_active / 100: GFO-25-305 - Non-Energy Impacts of Integrated Energy Retrofit Packages from the Equitable Building Decarbonization Program (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-305)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible_active / 100: GFO-25-308 - Distributed Clean Hydrogen Production with Onsite End Use (H2ONSITE) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-308)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible_active / 100: Energy Efficiency Financing for Public Sector Projects (SOURCE_DSIRE:dsire_program_id:5131)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible_active / 100: GFO-25-603 - California’s National Electric Vehicle Infrastructure Formula Program – Solicitation 6 Community Charging (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-603)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Grants (SOURCE_DSIRE:dsire_program_id:917)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.

Common next questions:
- project.technologyIds: 6

Common unresolved requirements among promising matches:
- Opportunity appears upcoming; application timing should be verified.: 18
- No project technology was normalized.: 6
- Availability is uncertain.: 1

Retrofit types inferred from promising matches:
- EV charger installation: 7
- Battery storage system: 6
- Ground-source / geothermal heat pump: 6
- High-efficiency HVAC replacement: 6
- Biomass / biogas energy system: 5
- LED lighting retrofit: 5
- Combined heat and power system: 3
- Solar water heating system: 3

Common blockers across rejected/unavailable opportunities:
- User site or facility type (healthcare) does not match broad_residential eligibility.: 581
- Opportunity appears residential-only and the user profile is nonresidential.: 438
- Project site state CA does not match opportunity geography MN.: 86
- Opportunity site or facility specificity (multifamily_residential) does not match the user's site type (healthcare).: 71
- Project site state CA does not match opportunity geography OR.: 59

### santa-clara-university-campus

Large nonprofit university campus in Silicon Valley Power electric territory.

Normalized profile:
```json
{
  "organizationTypes": [
    "nonprofit"
  ],
  "stateCode": "CA",
  "zip5": "95053",
  "utility": {
    "selfReportedName": "Silicon Valley Power",
    "distributionUtilityId": "UTIL_SVP",
    "territoryCandidates": [
      "UTIL_SVP"
    ],
    "verificationStatus": "self_reported_unverified",
    "customerClass": null
  },
  "ownershipRelationship": "owner",
  "buildingTypes": [
    "education_campus"
  ],
  "squareFootage": {
    "value": 3210000,
    "raw": "3,210,000",
    "parsingStatus": "parsed"
  },
  "technologyIds": [
    "hvac",
    "building_controls",
    "lighting",
    "commercial_kitchen",
    "solar",
    "battery_storage",
    "ev_charging",
    "water_efficiency"
  ]
}
```

Status counts:
```json
{
  "eligible_active": 17,
  "likely_eligible": 1,
  "needs_information": 0,
  "upcoming": 5,
  "manual_review": 5,
  "ineligible": 1859,
  "unavailable": 0
}
```

Top matches requiring no hard blocker:
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible_active / 100: Silicon Valley Power - Emerging Technologies Grant Program (SOURCE_DSIRE:dsire_program_id:22068)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches Silicon Valley Power.
- eligible_active / 100: GFO-25-608 - Electric Vehicle Hub, Outreach, Messaging, and Equipment (EV HOME) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-608)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible_active / 100: Energy Design Assistance (SOURCE_SILICON_VALLEY_POWER:svp_source_section:f69ab77394818965:energy-design-assistance)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches Silicon Valley Power.
- eligible_active / 100: PON-24-002 - K–12 Energy Efficiency Program (KTEP) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:PON-24-002)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible_active / 100: New Construction Incentives (SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:new-construction-incentives)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches Silicon Valley Power.
- eligible_active / 100: GFO-25-308 - Distributed Clean Hydrogen Production with Onsite End Use (H2ONSITE) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-308)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible_active / 100: Energy Efficiency Grant Program for Nonprofit Organizations (SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:energy-efficiency-grant-program-for-nonprofit-organizations)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches Silicon Valley Power.
- eligible_active / 100: Energy Efficiency Financing for Public Sector Projects (SOURCE_DSIRE:dsire_program_id:5131)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Grants (SOURCE_DSIRE:dsire_program_id:917)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible_active / 100: Local Option - Municipal Energy Districts (SOURCE_DSIRE:dsire_program_id:3527)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible_active / 100: Modified Accelerated Cost-Recovery System (MACRS) (SOURCE_DSIRE:dsire_program_id:676)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.

Common next questions:
- project.technologyIds: 2

Common unresolved requirements among promising matches:
- Opportunity appears upcoming; application timing should be verified.: 5
- No project technology was normalized.: 2
- Availability is uncertain.: 1

Retrofit types inferred from promising matches:
- High-efficiency HVAC replacement: 9
- Low-flow fixture retrofit: 6
- Ground-source / geothermal heat pump: 5
- LED lighting retrofit: 5
- Battery storage system: 4
- Biomass / biogas energy system: 4
- Combined heat and power system: 3
- Energy management system: 2

Common blockers across rejected/unavailable opportunities:
- User site or facility type (education_campus) does not match broad_residential eligibility.: 581
- Opportunity appears residential-only and the user profile is nonresidential.: 438
- User site or facility type (education_campus) does not match broad_commercial eligibility.: 396
- Project site state CA does not match opportunity geography MN.: 86
- Opportunity site or facility specificity (multifamily_residential) does not match the user's site type (education_campus).: 71

### seghesio-healdsburg-winery

Healdsburg winery and tasting-room operation in a small municipal electric territory.

Normalized profile:
```json
{
  "organizationTypes": [
    "agricultural"
  ],
  "stateCode": "CA",
  "zip5": "95448",
  "utility": {
    "selfReportedName": "City of Healdsburg Electric Utility",
    "distributionUtilityId": "UTIL_HEALDSBURG",
    "territoryCandidates": [
      "UTIL_HEALDSBURG"
    ],
    "verificationStatus": "self_reported_unverified",
    "customerClass": null
  },
  "ownershipRelationship": "unknown",
  "buildingTypes": [
    "industrial_manufacturing"
  ],
  "squareFootage": {
    "value": 60000,
    "raw": "60,000",
    "parsingStatus": "parsed"
  },
  "technologyIds": [
    "refrigeration",
    "building_controls",
    "lighting",
    "solar",
    "battery_storage",
    "ev_charging",
    "water_efficiency"
  ]
}
```

Status counts:
```json
{
  "eligible_active": 9,
  "likely_eligible": 0,
  "needs_information": 0,
  "upcoming": 5,
  "manual_review": 6,
  "ineligible": 1867,
  "unavailable": 0
}
```

Top matches requiring no hard blocker:
- eligible_active / 100: USDA - Biorefinery, Renewable Chemical, and Biobased Product Manufacturing Assistance Program (SOURCE_DSIRE:dsire_program_id:5313)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible_active / 100: GFO-25-308 - Distributed Clean Hydrogen Production with Onsite End Use (H2ONSITE) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-308)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible_active / 100: U.S. Department of Energy - Loan Guarantee Program (SOURCE_DSIRE:dsire_program_id:3071)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Grants (SOURCE_DSIRE:dsire_program_id:917)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible_active / 100: Local Option - Municipal Energy Districts (SOURCE_DSIRE:dsire_program_id:3527)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible_active / 100: Modified Accelerated Cost-Recovery System (MACRS) (SOURCE_DSIRE:dsire_program_id:676)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible_active / 100: GFO-22-903 - Cost Share for Federal Funding Opportunities Clean Hydrogen Program (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-22-903)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible_active / 100: Marin Clean Energy - Feed-In Tariff Plus (SOURCE_DSIRE:dsire_program_id:22615)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; No utility restriction was found after source review.
- upcoming / 100: Lithium-ion Battery Reuse and Recycling (SOURCE_CA_ENERGY_COMMISSION:cec_url_hash:url_hash:d308e28f76570b57)
  - matched: Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.; Nonresidential applicant is compatible with broad commercial eligibility.
  - unresolved: Opportunity appears upcoming; application timing should be verified.
- upcoming / 100: Food Production Investment Program (FPIP) 2026 (SOURCE_CA_ENERGY_COMMISSION:cec_url_hash:url_hash:101687e9640f6a8c)
  - matched: Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.; Applicant type overlaps eligible sector: agricultural.
  - unresolved: Opportunity appears upcoming; application timing should be verified.
- upcoming / 100: Developing and Demonstrating Advanced Combustion Systems for the Industrial Sector Round 2 (SOURCE_CA_ENERGY_COMMISSION:cec_url_hash:url_hash:d8a7ede4eb110628)
  - matched: Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.; Nonresidential applicant is compatible with broad commercial eligibility.
  - unresolved: Opportunity appears upcoming; application timing should be verified.

Common next questions:
- project.technologyIds: 2

Common unresolved requirements among promising matches:
- Opportunity appears upcoming; application timing should be verified.: 5
- No project technology was normalized.: 2

Retrofit types inferred from promising matches:
- Biomass / biogas energy system: 5
- Ground-source / geothermal heat pump: 5
- Battery storage system: 3
- High-efficiency HVAC replacement: 2
- Solar water heating system: 2
- Combined heat and power system: 1
- Engineering feasibility study: 1
- Insulation upgrade: 1

Common blockers across rejected/unavailable opportunities:
- User site or facility type (industrial_manufacturing) does not match broad_residential eligibility.: 581
- Opportunity appears residential-only and the user profile is nonresidential.: 438
- User site or facility type (industrial_manufacturing) does not match broad_commercial eligibility.: 396
- Project site state CA does not match opportunity geography MN.: 86
- Opportunity site or facility specificity (multifamily_residential) does not match the user's site type (industrial_manufacturing).: 71

## Immediate Iteration Targets

1. Improve utility resolution for `Other / Not sure` users by geocoding and service-territory lookup instead of relying on the current form option.
2. Split offer-level sectors/technologies more carefully for DSIRE parameter sets to reduce residential/commercial leakage.
3. Add source-specific availability handling for CEC awarded solicitations and utility pages with no explicit deadline.
4. Add a small hand-reviewed truth fixture for the top 20 matches per sample user; this is the realistic way to approach exhaustive validation without pretending all 20,960 pairings were manually adjudicated.
