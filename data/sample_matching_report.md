# Sample Matching Report

Generated: 2026-07-04T01:05:27.748Z
Matcher clock: 2026-07-04T01:04:57.530Z
Opportunities evaluated: 1707
Archived opportunities skipped: 294
Upcoming opportunities hidden: 93
Sample users evaluated: 50
Pairings evaluated: 85350
Opportunity incentive rules loaded: 49

This is a deterministic first-pass matcher audit. It is not a human-reviewed ground-truth label set yet.
The script evaluates every current visible opportunity against each sample profile, then reports eligible matches and common blockers.
Full JSON output: `/tmp/retrofi-sample-matching-results.json`

## Global Notes

- Hard failures are limited to explicit unavailable status/deadline, state mismatch, utility mismatch, residential-only mismatch, applicant mismatch, technology mismatch, and parsed numeric threshold failure.
- Utility restrictions use the generated review artifact when present. `required` gates matching; `none`, `not_applicable`, and `none_found_after_review` are treated as pass; only unresolved ambiguous utility evidence remains `unknown`.
- Facility eligibility uses the generated review artifact when present. Artifact: `/Users/neer_kuchlous/Code/Green Business Solution/data/facility_eligibility_reviews.json` (2096 reviewed opportunities).
- Utility review artifact: `/Users/neer_kuchlous/Code/Green Business Solution/data/utility_restriction_reviews.json` (2096 reviewed opportunities).
- One-time opportunity savings use extracted source-backed incentive rules when available. Artifact: `/Users/neer_kuchlous/Code/Green Business Solution/data/opportunity_incentive_rules.json` (49 active rules).
- The admin fixture intentionally fails generation if visible results contain any status other than `eligible` or `ineligible`.
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
  }
}
```

Status counts:
```json
{
  "eligible": 24,
  "ineligible": 1683
}
```

Eligible matches:
- eligible / 100: City of San Diego - Sustainable Building Expedited Permit Program (SOURCE_DSIRE:dsire_program_id:4790)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; No utility restriction was found after source review.
- eligible / 100: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - matched: Opportunity appears rolling or no-deadline.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: GFO-25-307 - Direct Air Capture Pre-Commercial Demonstration and Community Engagement (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-307)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: LADWP - Feed-in Tariff (FiT) Program (SOURCE_DSIRE:dsire_program_id:5685)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches LADWP.
- eligible / 100: GFO-25-607 - Clean Transportation Program Hydrogen Infrastructure Project Opportunity (HIPO) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-607)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible / 100: RFQ-25-401 - Energy Code Compliance Evaluation Support (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:RFQ-25-401)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible / 100: GFO-25-902 - Cost-Share for Federal Geothermal Energy Funding Opportunities (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-902)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible / 100: GFO-25-605 – Reliable Electric Charging for Eligible School-bus Sites (RECESS) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-605)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible / 100: San Diego County - Green Building Program (SOURCE_DSIRE:dsire_program_id:1105)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; No utility restriction was found after source review.
- eligible / 100: California - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program (SOURCE_DSIRE:dsire_program_id:22629)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Plumas-Sierra REC - Commercial and Irrigation Rebate Program (SOURCE_DSIRE:dsire_program_id:22067)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; No utility restriction was found after source review.

Common next questions:

Common unresolved requirements among promising matches:

Retrofit types inferred from promising matches:
- EV charger installation: 6
- Ground-source / geothermal heat pump: 6
- LED lighting retrofit: 5
- Battery storage system: 4
- Biomass / biogas energy system: 4
- High-efficiency HVAC replacement: 4
- Solar water heating system: 3
- Combined heat and power system: 2

Common blockers across rejected/unavailable opportunities:
- User site or facility type (office_admin) does not match broad_residential eligibility.: 552
- Project site state CA does not match opportunity geography MN.: 110
- Opportunity appears residential-only and the user profile is nonresidential.: 98
- Project site state CA does not match opportunity geography CO.: 74
- Project site state CA does not match opportunity geography MA.: 70

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
  }
}
```

Status counts:
```json
{
  "eligible": 23,
  "ineligible": 1684
}
```

Eligible matches:
- eligible / 100: City of San Diego - Sustainable Building Expedited Permit Program (SOURCE_DSIRE:dsire_program_id:4790)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; No utility restriction was found after source review.
- eligible / 100: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - matched: Opportunity appears rolling or no-deadline.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: GFO-25-307 - Direct Air Capture Pre-Commercial Demonstration and Community Engagement (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-307)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Burbank Water & Power - Energy Solutions Business Rebate Program (SOURCE_DSIRE:dsire_program_id:1630)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches Burbank Water and Power.
- eligible / 100: GFO-25-607 - Clean Transportation Program Hydrogen Infrastructure Project Opportunity (HIPO) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-607)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible / 100: RFQ-25-401 - Energy Code Compliance Evaluation Support (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:RFQ-25-401)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible / 100: GFO-25-902 - Cost-Share for Federal Geothermal Energy Funding Opportunities (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-902)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible / 100: GFO-25-605 – Reliable Electric Charging for Eligible School-bus Sites (RECESS) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-605)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible / 100: San Diego County - Green Building Program (SOURCE_DSIRE:dsire_program_id:1105)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; No utility restriction was found after source review.
- eligible / 100: California - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program (SOURCE_DSIRE:dsire_program_id:22629)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Plumas-Sierra REC - Commercial and Irrigation Rebate Program (SOURCE_DSIRE:dsire_program_id:22067)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; No utility restriction was found after source review.

Common next questions:

Common unresolved requirements among promising matches:

Retrofit types inferred from promising matches:
- EV charger installation: 6
- Ground-source / geothermal heat pump: 6
- Battery storage system: 5
- High-efficiency HVAC replacement: 5
- LED lighting retrofit: 5
- Biomass / biogas energy system: 4
- Solar water heating system: 3
- Combined heat and power system: 2

Common blockers across rejected/unavailable opportunities:
- User site or facility type (retail_storefront) does not match broad_residential eligibility.: 552
- Project site state CA does not match opportunity geography MN.: 110
- Opportunity appears residential-only and the user profile is nonresidential.: 98
- Project site state CA does not match opportunity geography CO.: 74
- Project site state CA does not match opportunity geography MA.: 70

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
  }
}
```

Status counts:
```json
{
  "eligible": 51,
  "ineligible": 1656
}
```

Eligible matches:
- eligible / 100: City of San Diego - Sustainable Building Expedited Permit Program (SOURCE_DSIRE:dsire_program_id:4790)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; No utility restriction was found after source review.
- eligible / 100: GoGreen Financing (SOURCE_SDGE_BUSINESS:program_url:gogreenfinancing_com_sdge)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches SDG&E.
- eligible / 100: Power Your Drive for Fleets (SOURCE_SDGE_BUSINESS:program_url:sdge_com_node_15131)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches SDG&E.
- eligible / 100: Emergency Load Reduction Program (ELRP) (SOURCE_SDGE_BUSINESS:program_url:sdge_com_node_19551)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches SDG&E.
- eligible / 100: Comfortably CA (SOURCE_SDGE_BUSINESS:program_url:comfortablyca_com)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches SDG&E.
- eligible / 100: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - matched: Opportunity appears rolling or no-deadline.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: GFO-25-307 - Direct Air Capture Pre-Commercial Demonstration and Community Engagement (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-307)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible / 100: GRID-Lodging (SOURCE_SDGE_BUSINESS:program_url:mendotagroup_com_sdge_grid_lodging)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches SDG&E.
- eligible / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: SD Energy Edge (SOURCE_SDGE_BUSINESS:program_url:sdenergyedge_com)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches SDG&E.
- eligible / 100: GFO-25-607 - Clean Transportation Program Hydrogen Infrastructure Project Opportunity (HIPO) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-607)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible / 100: RFQ-25-401 - Energy Code Compliance Evaluation Support (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:RFQ-25-401)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.

Common next questions:

Common unresolved requirements among promising matches:

Retrofit types inferred from promising matches:
- EV charger installation: 12
- High-efficiency HVAC replacement: 8
- Automated demand response controls: 6
- Battery storage system: 6
- Ground-source / geothermal heat pump: 6
- Biomass / biogas energy system: 5
- LED lighting retrofit: 5
- Combined heat and power system: 3

Common blockers across rejected/unavailable opportunities:
- User site or facility type (restaurant_foodservice) does not match broad_residential eligibility.: 552
- Project site state CA does not match opportunity geography MN.: 110
- Opportunity appears residential-only and the user profile is nonresidential.: 98
- Project site state CA does not match opportunity geography CO.: 74
- Project site state CA does not match opportunity geography MA.: 70

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
  }
}
```

Status counts:
```json
{
  "eligible": 27,
  "ineligible": 1680
}
```

Eligible matches:
- eligible / 100: City of San Diego - Sustainable Building Expedited Permit Program (SOURCE_DSIRE:dsire_program_id:4790)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; No utility restriction was found after source review.
- eligible / 100: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - matched: Opportunity appears rolling or no-deadline.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: GFO-25-307 - Direct Air Capture Pre-Commercial Demonstration and Community Engagement (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-307)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Anaheim Public Utilities - Small Business Energy & Water Direct Install Program (SOURCE_DSIRE:dsire_program_id:1625)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches Anaheim Public Utilities.
- eligible / 100: GFO-25-607 - Clean Transportation Program Hydrogen Infrastructure Project Opportunity (HIPO) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-607)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible / 100: RFQ-25-401 - Energy Code Compliance Evaluation Support (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:RFQ-25-401)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible / 100: GFO-25-902 - Cost-Share for Federal Geothermal Energy Funding Opportunities (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-902)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible / 100: GFO-25-605 – Reliable Electric Charging for Eligible School-bus Sites (RECESS) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-605)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible / 100: San Diego County - Green Building Program (SOURCE_DSIRE:dsire_program_id:1105)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; No utility restriction was found after source review.
- eligible / 100: Anaheim Public Utilities - Personal Use EV Charger Rebates (SOURCE_DSIRE:dsire_program_id:22275)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches Anaheim Public Utilities.
- eligible / 100: California - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program (SOURCE_DSIRE:dsire_program_id:22629)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Utility provider is not applicable to this opportunity.

Common next questions:

Common unresolved requirements among promising matches:

Retrofit types inferred from promising matches:
- EV charger installation: 9
- Ground-source / geothermal heat pump: 6
- High-efficiency HVAC replacement: 6
- LED lighting retrofit: 6
- Battery storage system: 4
- Biomass / biogas energy system: 4
- Level 2 EV charger installation: 4
- Solar water heating system: 3

Common blockers across rejected/unavailable opportunities:
- User site or facility type (grocery_food_retail) does not match broad_residential eligibility.: 552
- Project site state CA does not match opportunity geography MN.: 110
- Opportunity appears residential-only and the user profile is nonresidential.: 98
- Project site state CA does not match opportunity geography CO.: 74
- Project site state CA does not match opportunity geography MA.: 70

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
  }
}
```

Status counts:
```json
{
  "eligible": 23,
  "ineligible": 1684
}
```

Eligible matches:
- eligible / 100: City of San Diego - Sustainable Building Expedited Permit Program (SOURCE_DSIRE:dsire_program_id:4790)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; No utility restriction was found after source review.
- eligible / 100: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - matched: Opportunity appears rolling or no-deadline.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: GFO-25-307 - Direct Air Capture Pre-Commercial Demonstration and Community Engagement (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-307)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: GFO-25-607 - Clean Transportation Program Hydrogen Infrastructure Project Opportunity (HIPO) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-607)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible / 100: Property Tax Exclusion for Solar Energy Systems and Solar Plus Storage System (SOURCE_DSIRE:dsire_program_id:558)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: RFQ-25-401 - Energy Code Compliance Evaluation Support (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:RFQ-25-401)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible / 100: GFO-25-902 - Cost-Share for Federal Geothermal Energy Funding Opportunities (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-902)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible / 100: GFO-25-605 – Reliable Electric Charging for Eligible School-bus Sites (RECESS) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-605)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible / 100: San Diego County - Green Building Program (SOURCE_DSIRE:dsire_program_id:1105)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; No utility restriction was found after source review.
- eligible / 100: California - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program (SOURCE_DSIRE:dsire_program_id:22629)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Plumas-Sierra REC - Commercial and Irrigation Rebate Program (SOURCE_DSIRE:dsire_program_id:22067)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; No utility restriction was found after source review.

Common next questions:

Common unresolved requirements among promising matches:

Retrofit types inferred from promising matches:
- EV charger installation: 6
- Ground-source / geothermal heat pump: 6
- Battery storage system: 5
- Biomass / biogas energy system: 4
- High-efficiency HVAC replacement: 4
- LED lighting retrofit: 4
- Solar water heating system: 4
- Combined heat and power system: 2

Common blockers across rejected/unavailable opportunities:
- User site or facility type (warehouse_logistics) does not match broad_residential eligibility.: 552
- Project site state CA does not match opportunity geography MN.: 110
- Opportunity appears residential-only and the user profile is nonresidential.: 98
- Project site state CA does not match opportunity geography CO.: 74
- Project site state CA does not match opportunity geography MA.: 70

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
  }
}
```

Status counts:
```json
{
  "eligible": 23,
  "ineligible": 1684
}
```

Eligible matches:
- eligible / 100: USDA - Biorefinery, Renewable Chemical, and Biobased Product Manufacturing Assistance Program (SOURCE_DSIRE:dsire_program_id:5313)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: City of San Diego - Sustainable Building Expedited Permit Program (SOURCE_DSIRE:dsire_program_id:4790)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; No utility restriction was found after source review.
- eligible / 100: Emergency Load Reduction Program (ELRP) (SOURCE_SCE_BUSINESS:sce_source_section:56574423e5e2b946:emergency-load-reduction-program-elrp)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches Southern California Edison.
- eligible / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Property Tax Exclusion for Solar Energy Systems and Solar Plus Storage System (SOURCE_DSIRE:dsire_program_id:558)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Alternative Fuel Vehicle Refueling Property Tax Credit (Personal) (SOURCE_DSIRE:dsire_program_id:22475)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Sales and Use Tax Exemption for Electric Power Generation and Storage Equipment (SOURCE_DSIRE:dsire_program_id:22048)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: California - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program (SOURCE_DSIRE:dsire_program_id:22629)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Self-Generation Incentive Program (SOURCE_DSIRE:dsire_program_id:552)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches Southern California Edison.
- eligible / 100: GFO-25-308 - Distributed Clean Hydrogen Production with Onsite End Use (H2ONSITE) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-308)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible / 100: U.S. Department of Energy - Loan Guarantee Program (SOURCE_DSIRE:dsire_program_id:3071)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Azusa Light & Water - EV Charger Rebate (SOURCE_DSIRE:dsire_program_id:22278)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; No utility restriction was found after source review.

Common next questions:

Common unresolved requirements among promising matches:

Retrofit types inferred from promising matches:
- Battery storage system: 7
- Biomass / biogas energy system: 5
- EV charger installation: 5
- Ground-source / geothermal heat pump: 4
- Combined heat and power system: 3
- Solar water heating system: 3
- High-efficiency HVAC replacement: 2
- Rooftop solar PV: 2

Common blockers across rejected/unavailable opportunities:
- User site or facility type (industrial_manufacturing) does not match broad_residential eligibility.: 552
- User site or facility type (industrial_manufacturing) does not match broad_commercial eligibility.: 362
- Project site state CA does not match opportunity geography MN.: 110
- Opportunity appears residential-only and the user profile is nonresidential.: 98
- Project site state CA does not match opportunity geography CO.: 74

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
  }
}
```

Status counts:
```json
{
  "eligible": 24,
  "ineligible": 1683
}
```

Eligible matches:
- eligible / 100: City of San Diego - Sustainable Building Expedited Permit Program (SOURCE_DSIRE:dsire_program_id:4790)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; No utility restriction was found after source review.
- eligible / 100: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - matched: Opportunity appears rolling or no-deadline.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: GFO-25-307 - Direct Air Capture Pre-Commercial Demonstration and Community Engagement (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-307)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible / 100: Pasadena Water and Power - Commercial Charger Incentive Program (SOURCE_DSIRE:dsire_program_id:22289)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches Pasadena Water and Power.
- eligible / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: GFO-25-607 - Clean Transportation Program Hydrogen Infrastructure Project Opportunity (HIPO) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-607)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible / 100: RFQ-25-401 - Energy Code Compliance Evaluation Support (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:RFQ-25-401)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible / 100: GFO-25-902 - Cost-Share for Federal Geothermal Energy Funding Opportunities (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-902)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible / 100: GFO-25-605 – Reliable Electric Charging for Eligible School-bus Sites (RECESS) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-605)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible / 100: San Diego County - Green Building Program (SOURCE_DSIRE:dsire_program_id:1105)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; No utility restriction was found after source review.
- eligible / 100: California - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program (SOURCE_DSIRE:dsire_program_id:22629)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Plumas-Sierra REC - Commercial and Irrigation Rebate Program (SOURCE_DSIRE:dsire_program_id:22067)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; No utility restriction was found after source review.

Common next questions:

Common unresolved requirements among promising matches:

Retrofit types inferred from promising matches:
- EV charger installation: 7
- Ground-source / geothermal heat pump: 6
- High-efficiency HVAC replacement: 5
- LED lighting retrofit: 5
- Battery storage system: 4
- Biomass / biogas energy system: 4
- Solar water heating system: 3
- Combined heat and power system: 2

Common blockers across rejected/unavailable opportunities:
- User site or facility type (hospitality_lodging) does not match broad_residential eligibility.: 552
- Project site state CA does not match opportunity geography MN.: 110
- Opportunity appears residential-only and the user profile is nonresidential.: 98
- Project site state CA does not match opportunity geography CO.: 74
- Project site state CA does not match opportunity geography MA.: 70

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
  }
}
```

Status counts:
```json
{
  "eligible": 25,
  "ineligible": 1682
}
```

Eligible matches:
- eligible / 100: City of San Diego - Sustainable Building Expedited Permit Program (SOURCE_DSIRE:dsire_program_id:4790)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; No utility restriction was found after source review.
- eligible / 100: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - matched: Opportunity appears rolling or no-deadline.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: GFO-25-307 - Direct Air Capture Pre-Commercial Demonstration and Community Engagement (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-307)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: GFO-25-607 - Clean Transportation Program Hydrogen Infrastructure Project Opportunity (HIPO) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-607)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible / 100: RFQ-25-401 - Energy Code Compliance Evaluation Support (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:RFQ-25-401)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible / 100: GFO-25-902 - Cost-Share for Federal Geothermal Energy Funding Opportunities (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-902)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible / 100: PON-17-401 - Financing for Energy Efficiency and Renewable Energy Generation Projects (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:PON-17-401)
  - matched: Opportunity appears rolling or no-deadline.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible / 100: GFO-25-605 – Reliable Electric Charging for Eligible School-bus Sites (RECESS) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-605)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible / 100: San Diego County - Green Building Program (SOURCE_DSIRE:dsire_program_id:1105)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; No utility restriction was found after source review.
- eligible / 100: California - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program (SOURCE_DSIRE:dsire_program_id:22629)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Plumas-Sierra REC - Commercial and Irrigation Rebate Program (SOURCE_DSIRE:dsire_program_id:22067)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; No utility restriction was found after source review.

Common next questions:

Common unresolved requirements among promising matches:

Retrofit types inferred from promising matches:
- EV charger installation: 7
- Ground-source / geothermal heat pump: 6
- Battery storage system: 4
- Biomass / biogas energy system: 4
- High-efficiency HVAC replacement: 4
- LED lighting retrofit: 4
- Solar water heating system: 3
- Combined heat and power system: 2

Common blockers across rejected/unavailable opportunities:
- User site or facility type (healthcare) does not match broad_residential eligibility.: 552
- Project site state CA does not match opportunity geography MN.: 110
- Opportunity appears residential-only and the user profile is nonresidential.: 98
- Project site state CA does not match opportunity geography CO.: 74
- Project site state CA does not match opportunity geography MA.: 70

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
  }
}
```

Status counts:
```json
{
  "eligible": 26,
  "ineligible": 1681
}
```

Eligible matches:
- eligible / 100: City of San Diego - Sustainable Building Expedited Permit Program (SOURCE_DSIRE:dsire_program_id:4790)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; No utility restriction was found after source review.
- eligible / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Hybrid and Zero-Emission Truck and Bus Voucher Incentive Project (HVIP) (SOURCE_DSIRE:dsire_program_id:22155)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; No utility restriction was found after source review.
- eligible / 100: PON-17-401 - Financing for Energy Efficiency and Renewable Energy Generation Projects (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:PON-17-401)
  - matched: Opportunity appears rolling or no-deadline.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible / 100: Silicon Valley Power - Emerging Technologies Grant Program (SOURCE_DSIRE:dsire_program_id:22068)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches Silicon Valley Power.
- eligible / 100: GFO-25-608 - Electric Vehicle Hub, Outreach, Messaging, and Equipment (EV HOME) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-608)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible / 100: Energy Design Assistance (SOURCE_SILICON_VALLEY_POWER:svp_source_section:f69ab77394818965:energy-design-assistance)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches Silicon Valley Power.
- eligible / 100: PON-24-002 - K–12 Energy Efficiency Program (KTEP) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:PON-24-002)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible / 100: California - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program (SOURCE_DSIRE:dsire_program_id:22629)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: New Construction Incentives (SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:new-construction-incentives)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches Silicon Valley Power.
- eligible / 100: GFO-25-308 - Distributed Clean Hydrogen Production with Onsite End Use (H2ONSITE) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-308)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible / 100: Energy Efficiency Grant Program for Nonprofit Organizations (SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:energy-efficiency-grant-program-for-nonprofit-organizations)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches Silicon Valley Power.

Common next questions:

Common unresolved requirements among promising matches:

Retrofit types inferred from promising matches:
- High-efficiency HVAC replacement: 8
- Low-flow fixture retrofit: 7
- Battery storage system: 4
- EV charger installation: 4
- Ground-source / geothermal heat pump: 4
- LED lighting retrofit: 4
- Biomass / biogas energy system: 3
- Air sealing / weatherization: 2

Common blockers across rejected/unavailable opportunities:
- User site or facility type (education_campus) does not match broad_residential eligibility.: 552
- User site or facility type (education_campus) does not match broad_commercial eligibility.: 362
- Project site state CA does not match opportunity geography MN.: 110
- Opportunity appears residential-only and the user profile is nonresidential.: 98
- Project site state CA does not match opportunity geography CO.: 74

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
  }
}
```

Status counts:
```json
{
  "eligible": 15,
  "ineligible": 1692
}
```

Eligible matches:
- eligible / 100: USDA - Biorefinery, Renewable Chemical, and Biobased Product Manufacturing Assistance Program (SOURCE_DSIRE:dsire_program_id:5313)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: City of San Diego - Sustainable Building Expedited Permit Program (SOURCE_DSIRE:dsire_program_id:4790)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; No utility restriction was found after source review.
- eligible / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Alternative Fuel Vehicle Refueling Property Tax Credit (Personal) (SOURCE_DSIRE:dsire_program_id:22475)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: California - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program (SOURCE_DSIRE:dsire_program_id:22629)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: GFO-25-308 - Distributed Clean Hydrogen Production with Onsite End Use (H2ONSITE) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-308)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible / 100: U.S. Department of Energy - Loan Guarantee Program (SOURCE_DSIRE:dsire_program_id:3071)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Azusa Light & Water - EV Charger Rebate (SOURCE_DSIRE:dsire_program_id:22278)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; No utility restriction was found after source review.
- eligible / 100: Local Option - Municipal Energy Districts (SOURCE_DSIRE:dsire_program_id:3527)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Modified Accelerated Cost-Recovery System (MACRS) (SOURCE_DSIRE:dsire_program_id:676)
  - matched: Opportunity appears rolling or no-deadline.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: GFO-22-903 - Cost Share for Federal Funding Opportunities Clean Hydrogen Program (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-22-903)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible / 100: Clean Transportation Program (SOURCE_DSIRE:dsire_program_id:22149)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Utility provider is not applicable to this opportunity.

Common next questions:

Common unresolved requirements among promising matches:

Retrofit types inferred from promising matches:
- EV charger installation: 5
- Biomass / biogas energy system: 4
- Ground-source / geothermal heat pump: 4
- Battery storage system: 3
- High-efficiency HVAC replacement: 2
- Solar water heating system: 2
- Combined heat and power system: 1
- Electric vehicle purchase: 1

Common blockers across rejected/unavailable opportunities:
- User site or facility type (industrial_manufacturing) does not match broad_residential eligibility.: 552
- User site or facility type (industrial_manufacturing) does not match broad_commercial eligibility.: 362
- Project site state CA does not match opportunity geography MN.: 110
- Opportunity appears residential-only and the user profile is nonresidential.: 98
- Project site state CA does not match opportunity geography CO.: 74

### via-verde-bronx-renter-household

Anonymized renter household in Bronx mixed-income multifamily housing with ConEd electric and gas service.

Normalized profile:
```json
{
  "organizationTypes": [
    "residential"
  ],
  "stateCode": "NY",
  "zip5": "10455",
  "utility": {
    "selfReportedName": "Consolidated Edison Company of New York",
    "distributionUtilityId": "UTIL_CONED",
    "territoryCandidates": [
      "UTIL_CONED"
    ],
    "verificationStatus": "self_reported_unverified",
    "customerClass": null
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
```

Status counts:
```json
{
  "eligible": 14,
  "ineligible": 1693
}
```

Eligible matches:
- eligible / 100: ConEd - Multifamily Energy Efficiency Incentives Program (SOURCE_DSIRE:dsire_program_id:3821)
  - matched: Opportunity appears active.; Project site state NY matches opportunity geography.; Self-reported utility matches ConEd.
- eligible / 100: Energy-Efficient Mortgages (SOURCE_DSIRE:dsire_program_id:742)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: New York City - Residential Solar Sales Tax Exemption (SOURCE_DSIRE:dsire_program_id:4703)
  - matched: Opportunity appears active.; Project site state NY matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Town of Babylon - Long Island Green Homes Program (SOURCE_DSIRE:dsire_program_id:3652)
  - matched: Opportunity appears active.; Project site state NY matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: RG&E - Smart Energy Residential Efficiency Rebate Programs (SOURCE_DSIRE:dsire_program_id:3464)
  - matched: Opportunity appears active.; Project site state NY matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Fannie Mae Green Financing – Loan Program (SOURCE_DSIRE:dsire_program_id:5780)
  - matched: Opportunity appears rolling or no-deadline.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: New York City - Residential Solar Sales Tax Exemption (SOURCE_DSIRE:dsire_program_code_title_hash:NY98F:8923b34ebfda)
  - matched: Opportunity appears active.; Project site state NY matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: NYSERDA - Drive Clean Rebate (SOURCE_DSIRE:dsire_program_id:22208)
  - matched: Opportunity appears active.; Project site state NY matches opportunity geography.; No utility restriction was found after source review.
- eligible / 100: Consolidated Edison - SmartCharge New York (SOURCE_DSIRE:dsire_program_id:22388)
  - matched: Opportunity appears active.; Project site state NY matches opportunity geography.; Self-reported utility matches ConEd.
- eligible / 100: Residential Energy Conservation Subsidy Exclusion (Corporate) (SOURCE_DSIRE:dsire_program_id:727)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Alternative Fuel Vehicle Refueling Property Tax Credit (Corporate) (SOURCE_DSIRE:dsire_program_id:22474)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Residential Energy Conservation Subsidy Exclusion (Personal) (SOURCE_DSIRE:dsire_program_id:666)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.

Common next questions:

Common unresolved requirements among promising matches:

Retrofit types inferred from promising matches:
- EV charger installation: 3
- Level 2 EV charger installation: 2
- Rooftop solar PV: 2
- Solar water heating system: 2
- Battery storage system: 1
- Duct sealing and duct insulation: 1
- EV make-ready electrical upgrade: 1
- High-efficiency boiler retrofit: 1

Common blockers across rejected/unavailable opportunities:
- User site or facility type (multifamily_residential) does not match broad_commercial eligibility.: 362
- User site or facility type (multifamily_residential) does not match broad_nonresidential eligibility.: 208
- Project site state NY does not match opportunity geography CA.: 176
- Project site state NY does not match opportunity geography MN.: 110
- Applicant type residential does not match eligible sectors commercial.: 79

### hoa-mai-gardens-seattle-household

Anonymized household in Seattle public housing with municipal electric service.

Normalized profile:
```json
{
  "organizationTypes": [
    "residential"
  ],
  "stateCode": "WA",
  "zip5": "98104",
  "utility": {
    "selfReportedName": "Seattle City Light",
    "distributionUtilityId": "UTIL_SEATTLE_CITY_LIGHT",
    "territoryCandidates": [
      "UTIL_SEATTLE_CITY_LIGHT"
    ],
    "verificationStatus": "self_reported_unverified",
    "customerClass": null
  },
  "ownershipRelationship": "tenant",
  "buildingTypes": [
    "multifamily_residential"
  ],
  "squareFootage": {
    "value": 150730,
    "raw": "150,730",
    "parsingStatus": "parsed"
  }
}
```

Status counts:
```json
{
  "eligible": 11,
  "ineligible": 1696
}
```

Eligible matches:
- eligible / 100: WSHFC Sustainable Energy Program (SOURCE_DSIRE:dsire_program_id:5840)
  - matched: Opportunity appears active.; Project site state WA matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Richland Energy Services - Residential Energy Conservation & Solar Loan Program (SOURCE_DSIRE:dsire_program_id:2512)
  - matched: Opportunity appears active.; Project site state WA matches opportunity geography.; No utility restriction was found after source review.
- eligible / 100: Energy-Efficient Mortgages (SOURCE_DSIRE:dsire_program_id:742)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Seattle City Light - Multifamily New Construction Rebate Program (SOURCE_DSIRE:dsire_program_id:4479)
  - matched: Opportunity appears active.; Project site state WA matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Richland Energy Services - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2837)
  - matched: Opportunity appears active.; Project site state WA matches opportunity geography.; No utility restriction was found after source review.
- eligible / 100: Seattle HomeWise: Weatherization (SOURCE_DSIRE:dsire_program_id:5622)
  - matched: Opportunity appears active.; Project site state WA matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Fannie Mae Green Financing – Loan Program (SOURCE_DSIRE:dsire_program_id:5780)
  - matched: Opportunity appears rolling or no-deadline.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Residential Energy Conservation Subsidy Exclusion (Corporate) (SOURCE_DSIRE:dsire_program_id:727)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Alternative Fuel Vehicle Refueling Property Tax Credit (Corporate) (SOURCE_DSIRE:dsire_program_id:22474)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Residential Energy Conservation Subsidy Exclusion (Personal) (SOURCE_DSIRE:dsire_program_id:666)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: EnergySpark Home Loan (SOURCE_DSIRE:dsire_program_id:5800)
  - matched: Opportunity appears active.; Project site state WA matches opportunity geography.; No utility restriction was found after source review.

Common next questions:

Common unresolved requirements among promising matches:

Retrofit types inferred from promising matches:
- Insulation upgrade: 3
- EV charger installation: 2
- Heat pump HVAC retrofit: 2
- High-efficiency HVAC replacement: 2
- Rooftop solar PV: 2
- Solar water heating system: 2
- Air sealing / weatherization: 1
- Biomass / biogas energy system: 1

Common blockers across rejected/unavailable opportunities:
- User site or facility type (multifamily_residential) does not match broad_commercial eligibility.: 362
- User site or facility type (multifamily_residential) does not match broad_nonresidential eligibility.: 208
- Project site state WA does not match opportunity geography CA.: 176
- Project site state WA does not match opportunity geography MN.: 110
- Applicant type residential does not match eligible sectors commercial.: 79

### tapiz-mariposa-denver-household

Anonymized senior or disabled household in Denver public multifamily housing.

Normalized profile:
```json
{
  "organizationTypes": [
    "residential"
  ],
  "stateCode": "CO",
  "zip5": "80204",
  "utility": {
    "selfReportedName": "Xcel Energy",
    "distributionUtilityId": "UTIL_XCEL",
    "territoryCandidates": [
      "UTIL_XCEL"
    ],
    "verificationStatus": "self_reported_unverified",
    "customerClass": null
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
```

Status counts:
```json
{
  "eligible": 25,
  "ineligible": 1682
}
```

Eligible matches:
- eligible / 100: City of Boulder - Solar Grant Program (SOURCE_DSIRE:dsire_program_id:2948)
  - matched: Opportunity appears rolling or no-deadline.; Project site state CO matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Colorado - Home Electrification and Appliance Rebate (HEAR) Program (SOURCE_DSIRE:dsire_program_id:22718)
  - matched: Opportunity appears rolling or no-deadline.; Project site state CO matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Property Tax Exemption for Residential Renewable Energy Equipment (SOURCE_DSIRE:dsire_program_id:4210)
  - matched: Opportunity appears rolling or no-deadline.; Project site state CO matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Electric Vehicle Income Tax Credit (SOURCE_DSIRE:dsire_program_id:22156)
  - matched: Opportunity appears rolling or no-deadline.; Project site state CO matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Summit County - Energy Smart Colorado Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:5562)
  - matched: Opportunity appears active.; Project site state CO matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Colorado Residential Energy Upgrade (RENU) Loan program (SOURCE_DSIRE:dsire_program_id:5349)
  - matched: Opportunity appears active.; Project site state CO matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Energy-Efficient Mortgages (SOURCE_DSIRE:dsire_program_id:742)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Boulder County - EnergySmart Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:4630)
  - matched: Opportunity appears rolling or no-deadline.; Project site state CO matches opportunity geography.; No utility restriction was found after source review.
- eligible / 100: Energy Smart Colorado Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:5565)
  - matched: Opportunity appears active.; Project site state CO matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: City of Aspen and Pitkin County - Renewable Energy Mitigation Program Grants (SOURCE_DSIRE:dsire_program_id:5558)
  - matched: Opportunity appears active.; Project site state CO matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Fannie Mae Green Financing – Loan Program (SOURCE_DSIRE:dsire_program_id:5780)
  - matched: Opportunity appears rolling or no-deadline.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Xcel Energy - Residential Energy Efficiency Rebate Programs (SOURCE_DSIRE:dsire_program_id:1581)
  - matched: Opportunity appears active.; Project site state CO matches opportunity geography.; Self-reported utility matches Xcel Energy.

Common next questions:

Common unresolved requirements among promising matches:

Retrofit types inferred from promising matches:
- Rooftop solar PV: 9
- High-efficiency HVAC replacement: 7
- Air sealing / weatherization: 6
- Insulation upgrade: 6
- Ground-source / geothermal heat pump: 5
- Solar water heating system: 5
- Heat pump HVAC retrofit: 4
- Heat pump water heater: 4

Common blockers across rejected/unavailable opportunities:
- User site or facility type (multifamily_residential) does not match broad_commercial eligibility.: 362
- User site or facility type (multifamily_residential) does not match broad_nonresidential eligibility.: 208
- Project site state CO does not match opportunity geography CA.: 176
- Project site state CO does not match opportunity geography MN.: 110
- Applicant type residential does not match eligible sectors commercial.: 79

### keauhou-lane-honolulu-renter

Anonymized workforce-housing household in a mixed-use Honolulu multifamily building.

Normalized profile:
```json
{
  "organizationTypes": [
    "residential"
  ],
  "stateCode": "HI",
  "zip5": "96813",
  "utility": {
    "selfReportedName": "Hawaiian Electric",
    "distributionUtilityId": "UTIL_HAWAIIAN_ELECTRIC",
    "territoryCandidates": [
      "UTIL_HAWAIIAN_ELECTRIC"
    ],
    "verificationStatus": "self_reported_unverified",
    "customerClass": null
  },
  "ownershipRelationship": "tenant",
  "buildingTypes": [
    "mixed_use"
  ],
  "squareFootage": {
    "value": 179800,
    "raw": "179,800",
    "parsingStatus": "parsed"
  }
}
```

Status counts:
```json
{
  "eligible": 8,
  "ineligible": 1699
}
```

Eligible matches:
- eligible / 100: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - matched: Opportunity appears rolling or no-deadline.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Hawaii C-PACE program (SOURCE_DSIRE:dsire_program_id:3870)
  - matched: Opportunity appears rolling or no-deadline.; Project site state HI matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Solar Water Heater Rebate (SOURCE_DSIRE:dsire_program_id:506)
  - matched: Opportunity appears active.; Project site state HI matches opportunity geography.; Self-reported utility matches Hawaiian Electric.
- eligible / 100: Solar and Wind Energy Credit (Personal) (SOURCE_DSIRE:dsire_program_id:50)
  - matched: Opportunity appears active.; Project site state HI matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible / 100: Solar and Wind Energy Credit (Corporate) (SOURCE_DSIRE:dsire_program_id:49)
  - matched: Opportunity appears active.; Project site state HI matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible / 100: Green Infrastructure Bonds (SOURCE_DSIRE:dsire_program_id:5437)
  - matched: Opportunity appears active.; Project site state HI matches opportunity geography.; Self-reported utility matches Hawaiian Electric.
- eligible / 100: Alternative Fuel Vehicle Refueling Property Tax Credit (Corporate) (SOURCE_DSIRE:dsire_program_id:22474)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.

Common next questions:

Common unresolved requirements among promising matches:

Retrofit types inferred from promising matches:
- Solar water heating system: 4
- Battery storage system: 2
- Biomass / biogas energy system: 2
- Ground-source / geothermal heat pump: 2
- Rooftop solar PV: 2
- Combined heat and power system: 1
- EV charger installation: 1
- High-efficiency HVAC replacement: 1

Common blockers across rejected/unavailable opportunities:
- User site or facility type (mixed_use) does not match broad_residential eligibility.: 552
- Project site state HI does not match opportunity geography CA.: 176
- Project site state HI does not match opportunity geography MN.: 110
- Applicant type residential does not match eligible sectors commercial.: 79
- Project site state HI does not match opportunity geography CO.: 74

### the-rose-minneapolis-household

Anonymized mixed-income multifamily household in Minneapolis with Xcel electric and CenterPoint gas.

Normalized profile:
```json
{
  "organizationTypes": [
    "residential"
  ],
  "stateCode": "MN",
  "zip5": "55404",
  "utility": {
    "selfReportedName": "Xcel Energy",
    "distributionUtilityId": "UTIL_XCEL",
    "territoryCandidates": [
      "UTIL_XCEL"
    ],
    "verificationStatus": "self_reported_unverified",
    "customerClass": null
  },
  "ownershipRelationship": "tenant",
  "buildingTypes": [
    "multifamily_residential"
  ],
  "squareFootage": {
    "value": 86195,
    "raw": "86,195",
    "parsingStatus": "parsed"
  }
}
```

Status counts:
```json
{
  "eligible": 18,
  "ineligible": 1689
}
```

Eligible matches:
- eligible / 100: Minnesota Energy Resources (Gas) - Home Energy Excellence Program for Builders or Homeowners (SOURCE_DSIRE:dsire_program_id:3312)
  - matched: Opportunity appears active.; Project site state MN matches opportunity geography.; Self-reported utility matches Xcel Energy.
- eligible / 100: Xcel Energy - Solar*Rewards Program (SOURCE_DSIRE:dsire_program_id:5417)
  - matched: Opportunity appears active.; Project site state MN matches opportunity geography.; Self-reported utility matches Xcel Energy.
- eligible / 100: Energy-Efficient Mortgages (SOURCE_DSIRE:dsire_program_id:742)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: East Central Energy - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2258)
  - matched: Opportunity appears active.; Project site state MN matches opportunity geography.; No utility restriction was found after source review.
- eligible / 100: Fix-Up Loan (SOURCE_DSIRE:dsire_program_id:4366)
  - matched: Opportunity appears active.; Project site state MN matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Fannie Mae Green Financing – Loan Program (SOURCE_DSIRE:dsire_program_id:5780)
  - matched: Opportunity appears rolling or no-deadline.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Princeton PUC - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2555)
  - matched: Opportunity appears active.; Project site state MN matches opportunity geography.; No utility restriction was found after source review.
- eligible / 100: Grand Marais PUC - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2539)
  - matched: Opportunity appears active.; Project site state MN matches opportunity geography.; No utility restriction was found after source review.
- eligible / 100: Wind Energy Sales Tax Exemption (SOURCE_DSIRE:dsire_program_id:601)
  - matched: Opportunity appears rolling or no-deadline.; Project site state MN matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: MMPA - Residential Energy Efficiency Program (SOURCE_DSIRE:dsire_program_id:4740)
  - matched: Opportunity appears active.; Project site state MN matches opportunity geography.; No utility restriction was found after source review.
- eligible / 100: Xcel Energy (Electric and Gas) - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:4813)
  - matched: Opportunity appears active.; Project site state MN matches opportunity geography.; Self-reported utility matches Xcel Energy.
- eligible / 100: Residential Energy Conservation Subsidy Exclusion (Corporate) (SOURCE_DSIRE:dsire_program_id:727)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.

Common next questions:

Common unresolved requirements among promising matches:

Retrofit types inferred from promising matches:
- High-efficiency HVAC replacement: 6
- EV charger installation: 5
- Heat pump HVAC retrofit: 5
- Heat pump water heater: 4
- High-efficiency refrigeration equipment: 4
- Rooftop solar PV: 4
- Ground-source / geothermal heat pump: 3
- High-efficiency commercial dishwasher: 3

Common blockers across rejected/unavailable opportunities:
- User site or facility type (multifamily_residential) does not match broad_commercial eligibility.: 362
- User site or facility type (multifamily_residential) does not match broad_nonresidential eligibility.: 208
- Project site state MN does not match opportunity geography CA.: 176
- Applicant type residential does not match eligible sectors commercial.: 79
- Project site state MN does not match opportunity geography CO.: 74

### bens-chili-bowl-dc

Small urban DC restaurant and commercial kitchen in Pepco electric and Washington Gas territory.

Normalized profile:
```json
{
  "organizationTypes": [
    "commercial"
  ],
  "stateCode": "DC",
  "zip5": "20009",
  "utility": {
    "selfReportedName": "Pepco",
    "distributionUtilityId": "UTIL_PEPCO",
    "territoryCandidates": [
      "UTIL_PEPCO"
    ],
    "verificationStatus": "self_reported_unverified",
    "customerClass": null
  },
  "ownershipRelationship": "unknown",
  "buildingTypes": [
    "restaurant_foodservice"
  ],
  "squareFootage": {
    "value": 3000,
    "raw": "3,000",
    "parsingStatus": "parsed"
  }
}
```

Status counts:
```json
{
  "eligible": 8,
  "ineligible": 1699
}
```

Eligible matches:
- eligible / 100: Solar Renewable Energy Credits (SOURCE_DSIRE:dsire_program_id:5686)
  - matched: Opportunity appears active.; Project site state DC matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - matched: Opportunity appears rolling or no-deadline.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Solar Energy System and Cogeneration System Personal Property Tax Credit (SOURCE_DSIRE:dsire_program_id:5245)
  - matched: Opportunity appears rolling or no-deadline.; Project site state DC matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: District of Columbia Property Assessed Clean Energy Financing (SOURCE_DSIRE:dsire_program_id:4206)
  - matched: Opportunity appears active.; Project site state DC matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Modified Accelerated Cost-Recovery System (MACRS) (SOURCE_DSIRE:dsire_program_id:676)
  - matched: Opportunity appears rolling or no-deadline.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Alternative Fuel Vehicle Refueling Property Tax Credit (Corporate) (SOURCE_DSIRE:dsire_program_id:22474)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Energy-Efficient Commercial Buildings Tax Deduction (SOURCE_DSIRE:dsire_program_id:1271)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.

Common next questions:

Common unresolved requirements among promising matches:

Retrofit types inferred from promising matches:
- LED lighting retrofit: 4
- Solar water heating system: 4
- Biomass / biogas energy system: 3
- Combined heat and power system: 3
- Ground-source / geothermal heat pump: 3
- High-efficiency HVAC replacement: 3
- Battery storage system: 2
- Energy audit: 1

Common blockers across rejected/unavailable opportunities:
- User site or facility type (restaurant_foodservice) does not match broad_residential eligibility.: 552
- Project site state DC does not match opportunity geography CA.: 176
- Project site state DC does not match opportunity geography MN.: 110
- Opportunity appears residential-only and the user profile is nonresidential.: 98
- Project site state DC does not match opportunity geography CO.: 74

### zingermans-deli-ann-arbor

Ann Arbor deli, restaurant, specialty grocery, and refrigeration-heavy food retail site.

Normalized profile:
```json
{
  "organizationTypes": [
    "commercial"
  ],
  "stateCode": "MI",
  "zip5": "48104",
  "utility": {
    "selfReportedName": "DTE Electric",
    "distributionUtilityId": "UTIL_DTE",
    "territoryCandidates": [
      "UTIL_DTE"
    ],
    "verificationStatus": "self_reported_unverified",
    "customerClass": null
  },
  "ownershipRelationship": "unknown",
  "buildingTypes": [
    "restaurant_foodservice"
  ],
  "squareFootage": {
    "value": 13000,
    "raw": "13,000",
    "parsingStatus": "parsed"
  }
}
```

Status counts:
```json
{
  "eligible": 11,
  "ineligible": 1696
}
```

Eligible matches:
- eligible / 100: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - matched: Opportunity appears rolling or no-deadline.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Nonrefundable Business Activity Tax Credit (SOURCE_DSIRE:dsire_program_id:333)
  - matched: Opportunity appears rolling or no-deadline.; Project site state MI matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Michigan Saves - Business Energy Financing (SOURCE_DSIRE:dsire_program_id:4633)
  - matched: Opportunity appears active.; Project site state MI matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Solar Energy Facility Exemption (SOURCE_DSIRE:dsire_program_id:22686)
  - matched: Opportunity appears active.; Project site state MI matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Modified Accelerated Cost-Recovery System (MACRS) (SOURCE_DSIRE:dsire_program_id:676)
  - matched: Opportunity appears rolling or no-deadline.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Fuel Transformation Program (SOURCE_DSIRE:dsire_program_id:22192)
  - matched: Opportunity appears active.; Project site state MI matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Alternative Energy Property Tax Exemption (SOURCE_DSIRE:dsire_program_id:22142)
  - matched: Opportunity appears active.; Project site state MI matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Alternative Fuel Vehicle Refueling Property Tax Credit (Corporate) (SOURCE_DSIRE:dsire_program_id:22474)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Michigan Local PACE Program (SOURCE_DSIRE:dsire_program_id:4521)
  - matched: Opportunity appears rolling or no-deadline.; Project site state MI matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Energy-Efficient Commercial Buildings Tax Deduction (SOURCE_DSIRE:dsire_program_id:1271)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.

Common next questions:

Common unresolved requirements among promising matches:

Retrofit types inferred from promising matches:
- Biomass / biogas energy system: 4
- Ground-source / geothermal heat pump: 4
- LED lighting retrofit: 4
- Solar water heating system: 4
- Combined heat and power system: 3
- High-efficiency HVAC replacement: 3
- Battery storage system: 2
- EV charger installation: 2

Common blockers across rejected/unavailable opportunities:
- User site or facility type (restaurant_foodservice) does not match broad_residential eligibility.: 552
- Project site state MI does not match opportunity geography CA.: 176
- Project site state MI does not match opportunity geography MN.: 110
- Opportunity appears residential-only and the user profile is nonresidential.: 98
- Project site state MI does not match opportunity geography CO.: 74

### big-dipper-missoula

Small Missoula ice-cream shop with freezer and refrigeration loads.

Normalized profile:
```json
{
  "organizationTypes": [
    "commercial"
  ],
  "stateCode": "MT",
  "zip5": "59801",
  "utility": {
    "selfReportedName": "NorthWestern Energy",
    "distributionUtilityId": "UTIL_NORTHWESTERN",
    "territoryCandidates": [
      "UTIL_NORTHWESTERN"
    ],
    "verificationStatus": "self_reported_unverified",
    "customerClass": null
  },
  "ownershipRelationship": "tenant",
  "buildingTypes": [
    "restaurant_foodservice"
  ],
  "squareFootage": {
    "value": 2000,
    "raw": "2,000",
    "parsingStatus": "parsed"
  }
}
```

Status counts:
```json
{
  "eligible": 13,
  "ineligible": 1694
}
```

Eligible matches:
- eligible / 100: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - matched: Opportunity appears rolling or no-deadline.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Deduction For Energy-Conserving Investment (SOURCE_DSIRE:dsire_program_id:1158)
  - matched: Opportunity appears active.; Project site state MT matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Renewable Energy Systems Exemption (SOURCE_DSIRE:dsire_program_id:154)
  - matched: Opportunity appears rolling or no-deadline.; Project site state MT matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: NorthWestern Energy (Gas) - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:5007)
  - matched: Opportunity appears active.; Project site state MT matches opportunity geography.; Self-reported utility matches NorthWestern Energy.
- eligible / 100: NorthWestern Energy (Electric) - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:1658)
  - matched: Opportunity appears active.; Project site state MT matches opportunity geography.; Self-reported utility matches NorthWestern Energy.
- eligible / 100: Modified Accelerated Cost-Recovery System (MACRS) (SOURCE_DSIRE:dsire_program_id:676)
  - matched: Opportunity appears rolling or no-deadline.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Generation Facility Corporate Tax Exemptions (SOURCE_DSIRE:dsire_program_id:978)
  - matched: Opportunity appears rolling or no-deadline.; Project site state MT matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Corporate Property Tax Reduction for New/Expanded Generating Facilities (SOURCE_DSIRE:dsire_program_id:496)
  - matched: Opportunity appears rolling or no-deadline.; Project site state MT matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Alternative Fuel Vehicle Refueling Property Tax Credit (Corporate) (SOURCE_DSIRE:dsire_program_id:22474)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Energy-Efficient Commercial Buildings Tax Deduction (SOURCE_DSIRE:dsire_program_id:1271)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Montana Commercial PACE Financing Program (SOURCE_DSIRE:dsire_program_id:22653)
  - matched: Opportunity appears active.; Project site state MT matches opportunity geography.; Utility provider is not applicable to this opportunity.

Common next questions:

Common unresolved requirements among promising matches:

Retrofit types inferred from promising matches:
- Biomass / biogas energy system: 6
- Ground-source / geothermal heat pump: 6
- LED lighting retrofit: 5
- Solar water heating system: 5
- High-efficiency HVAC replacement: 4
- Battery storage system: 3
- Insulation upgrade: 3
- Combined heat and power system: 2

Common blockers across rejected/unavailable opportunities:
- User site or facility type (restaurant_foodservice) does not match broad_residential eligibility.: 552
- Project site state MT does not match opportunity geography CA.: 176
- Project site state MT does not match opportunity geography MN.: 110
- Opportunity appears residential-only and the user profile is nonresidential.: 98
- Project site state MT does not match opportunity geography CO.: 74

### burlington-beer-company

Vermont craft brewery, restaurant, and taproom in Burlington Electric territory.

Normalized profile:
```json
{
  "organizationTypes": [
    "commercial"
  ],
  "stateCode": "VT",
  "zip5": "05401",
  "utility": {
    "selfReportedName": "Burlington Electric Department",
    "distributionUtilityId": "UTIL_BURLINGTON_ELECTRIC",
    "territoryCandidates": [
      "UTIL_BURLINGTON_ELECTRIC"
    ],
    "verificationStatus": "self_reported_unverified",
    "customerClass": null
  },
  "ownershipRelationship": "tenant",
  "buildingTypes": [
    "industrial_manufacturing"
  ],
  "squareFootage": {
    "value": 15000,
    "raw": "15,000",
    "parsingStatus": "parsed"
  }
}
```

Status counts:
```json
{
  "eligible": 10,
  "ineligible": 1697
}
```

Eligible matches:
- eligible / 100: USDA - Biorefinery, Renewable Chemical, and Biobased Product Manufacturing Assistance Program (SOURCE_DSIRE:dsire_program_id:5313)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Local Option - Property Tax Exemption (SOURCE_DSIRE:dsire_program_id:45)
  - matched: Opportunity appears rolling or no-deadline.; Project site state VT matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Alternative Fuel Vehicle Refueling Property Tax Credit (Personal) (SOURCE_DSIRE:dsire_program_id:22475)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Electric Vehicle Charging Station Loan Program (SOURCE_DSIRE:dsire_program_id:22250)
  - matched: Opportunity appears active.; Project site state VT matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: U.S. Department of Energy - Loan Guarantee Program (SOURCE_DSIRE:dsire_program_id:3071)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Residential Rental Property Rebate Program (SOURCE_DSIRE:dsire_program_id:2680)
  - matched: Opportunity appears active.; Project site state VT matches opportunity geography.; No utility restriction was found after source review.
- eligible / 100: Modified Accelerated Cost-Recovery System (MACRS) (SOURCE_DSIRE:dsire_program_id:676)
  - matched: Opportunity appears rolling or no-deadline.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Alternative Fuel Vehicle Refueling Property Tax Credit (Corporate) (SOURCE_DSIRE:dsire_program_id:22474)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Commercial Energy Efficiency Rebate Programs (SOURCE_DSIRE:dsire_program_id:22588)
  - matched: Opportunity appears active.; Project site state VT matches opportunity geography.; No utility restriction was found after source review.

Common next questions:

Common unresolved requirements among promising matches:

Retrofit types inferred from promising matches:
- Biomass / biogas energy system: 4
- EV charger installation: 3
- Ground-source / geothermal heat pump: 3
- Combined heat and power system: 2
- High-efficiency HVAC replacement: 2
- High-efficiency refrigeration equipment: 2
- LED lighting retrofit: 2
- Solar water heating system: 2

Common blockers across rejected/unavailable opportunities:
- User site or facility type (industrial_manufacturing) does not match broad_residential eligibility.: 552
- User site or facility type (industrial_manufacturing) does not match broad_commercial eligibility.: 362
- Project site state VT does not match opportunity geography CA.: 176
- Project site state VT does not match opportunity geography MN.: 110
- Opportunity appears residential-only and the user profile is nonresidential.: 98

### bluebird-cafe-nashville

Small Nashville restaurant, cafe, and live music venue with recent gas utility name-change edge case.

Normalized profile:
```json
{
  "organizationTypes": [
    "commercial"
  ],
  "stateCode": "TN",
  "zip5": "37215",
  "utility": {
    "selfReportedName": "Nashville Electric Service",
    "distributionUtilityId": "UTIL_NES",
    "territoryCandidates": [
      "UTIL_NES"
    ],
    "verificationStatus": "self_reported_unverified",
    "customerClass": null
  },
  "ownershipRelationship": "tenant",
  "buildingTypes": [
    "restaurant_foodservice"
  ],
  "squareFootage": {
    "value": 2500,
    "raw": "2,500",
    "parsingStatus": "parsed"
  }
}
```

Status counts:
```json
{
  "eligible": 7,
  "ineligible": 1700
}
```

Eligible matches:
- eligible / 100: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - matched: Opportunity appears rolling or no-deadline.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Modified Accelerated Cost-Recovery System (MACRS) (SOURCE_DSIRE:dsire_program_id:676)
  - matched: Opportunity appears rolling or no-deadline.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: TVA - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:22126)
  - matched: Opportunity appears active.; Project site state TN matches opportunity geography.; No utility restriction was found after source review.
- eligible / 100: Alternative Fuel Vehicle Refueling Property Tax Credit (Corporate) (SOURCE_DSIRE:dsire_program_id:22474)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: City of Memphis - PILOT Program (SOURCE_DSIRE:dsire_program_id:22676)
  - matched: Opportunity appears active.; Project site state TN matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Energy-Efficient Commercial Buildings Tax Deduction (SOURCE_DSIRE:dsire_program_id:1271)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.

Common next questions:

Common unresolved requirements among promising matches:

Retrofit types inferred from promising matches:
- LED lighting retrofit: 4
- Biomass / biogas energy system: 3
- Ground-source / geothermal heat pump: 3
- High-efficiency HVAC replacement: 3
- Combined heat and power system: 2
- Solar water heating system: 2
- Thermal energy storage: 2
- Battery storage system: 1

Common blockers across rejected/unavailable opportunities:
- User site or facility type (restaurant_foodservice) does not match broad_residential eligibility.: 552
- Project site state TN does not match opportunity geography CA.: 176
- Project site state TN does not match opportunity geography MN.: 110
- Opportunity appears residential-only and the user profile is nonresidential.: 98
- Project site state TN does not match opportunity geography CO.: 74

### la-montanita-nob-hill-albuquerque

Albuquerque grocery co-op with refrigeration and prepared-food loads.

Normalized profile:
```json
{
  "organizationTypes": [
    "commercial"
  ],
  "stateCode": "NM",
  "zip5": "87106",
  "utility": {
    "selfReportedName": "Public Service Company of New Mexico",
    "distributionUtilityId": "UTIL_PNM",
    "territoryCandidates": [
      "UTIL_PNM"
    ],
    "verificationStatus": "self_reported_unverified",
    "customerClass": null
  },
  "ownershipRelationship": "tenant",
  "buildingTypes": [
    "grocery_food_retail"
  ],
  "squareFootage": {
    "value": 15000,
    "raw": "15,000",
    "parsingStatus": "parsed"
  }
}
```

Status counts:
```json
{
  "eligible": 12,
  "ineligible": 1695
}
```

Eligible matches:
- eligible / 100: PNM EV Charger Rebate Program (SOURCE_DSIRE:dsire_program_id:22406)
  - matched: Opportunity appears active.; Project site state NM matches opportunity geography.; No utility restriction was found after source review.
- eligible / 100: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - matched: Opportunity appears rolling or no-deadline.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Gross Receipts Tax Exemption for Sales of Wind and Solar Systems to Government Entities (SOURCE_DSIRE:dsire_program_id:3980)
  - matched: Opportunity appears rolling or no-deadline.; Project site state NM matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Modified Accelerated Cost-Recovery System (MACRS) (SOURCE_DSIRE:dsire_program_id:676)
  - matched: Opportunity appears rolling or no-deadline.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Biomass Equipment & Materials Compensating Tax Deduction (SOURCE_DSIRE:dsire_program_id:359)
  - matched: Opportunity appears rolling or no-deadline.; Project site state NM matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Alternative Fuel Vehicle Refueling Property Tax Credit (Corporate) (SOURCE_DSIRE:dsire_program_id:22474)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Local Option - Renewable Energy Financing District/Solar Energy Improvement Special Assessments (SOURCE_DSIRE:dsire_program_id:3532)
  - matched: Opportunity appears rolling or no-deadline.; Project site state NM matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: 2021 Sustainable Building Tax Credit (Personal) (SOURCE_DSIRE:dsire_program_id:22424)
  - matched: Opportunity appears active.; Project site state NM matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: New Solar Market Development Tax Credit (SOURCE_DSIRE:dsire_program_id:22472)
  - matched: Opportunity appears active.; Project site state NM matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Energy-Efficient Commercial Buildings Tax Deduction (SOURCE_DSIRE:dsire_program_id:1271)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: 2021 Sustainable Building Tax Credit (Corporate) (SOURCE_DSIRE:dsire_program_id:22423)
  - matched: Opportunity appears active.; Project site state NM matches opportunity geography.; Utility provider is not applicable to this opportunity.

Common next questions:

Common unresolved requirements among promising matches:

Retrofit types inferred from promising matches:
- Solar water heating system: 5
- Biomass / biogas energy system: 4
- Ground-source / geothermal heat pump: 4
- Battery storage system: 3
- LED lighting retrofit: 3
- Rooftop solar PV: 3
- Combined heat and power system: 2
- EV charger installation: 2

Common blockers across rejected/unavailable opportunities:
- User site or facility type (grocery_food_retail) does not match broad_residential eligibility.: 552
- Project site state NM does not match opportunity geography CA.: 176
- Project site state NM does not match opportunity geography MN.: 110
- Opportunity appears residential-only and the user profile is nonresidential.: 98
- Project site state NM does not match opportunity geography CO.: 74

### food-bank-rockies-aurora-dc

Aurora nonprofit food distribution center with cold storage, fleet, warehouse, and solar/storage potential.

Normalized profile:
```json
{
  "organizationTypes": [
    "nonprofit"
  ],
  "stateCode": "CO",
  "zip5": "20600",
  "utility": {
    "selfReportedName": "Xcel Energy",
    "distributionUtilityId": "UTIL_XCEL",
    "territoryCandidates": [
      "UTIL_XCEL"
    ],
    "verificationStatus": "self_reported_unverified",
    "customerClass": null
  },
  "ownershipRelationship": "owner",
  "buildingTypes": [
    "warehouse_logistics"
  ],
  "squareFootage": {
    "value": 270000,
    "raw": "270,000",
    "parsingStatus": "parsed"
  }
}
```

Status counts:
```json
{
  "eligible": 19,
  "ineligible": 1688
}
```

Eligible matches:
- eligible / 100: Electric Vehicle Income Tax Credit (SOURCE_DSIRE:dsire_program_id:22156)
  - matched: Opportunity appears rolling or no-deadline.; Project site state CO matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - matched: Opportunity appears rolling or no-deadline.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Poudre Valley REA - Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:4815)
  - matched: Opportunity appears active.; Project site state CO matches opportunity geography.; No utility restriction was found after source review.
- eligible / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Electric Vehicle Fast-Charging Plazas Program (SOURCE_DSIRE:dsire_program_id:22160)
  - matched: Opportunity appears active.; Project site state CO matches opportunity geography.; No utility restriction was found after source review.
- eligible / 100: Xcel Energy - Solar*Rewards Program (SOURCE_DSIRE:dsire_program_id:1255)
  - matched: Opportunity appears active.; Project site state CO matches opportunity geography.; Self-reported utility matches Xcel Energy.
- eligible / 100: C-PACE: Colorado Commercial Property Assessed Clean Energy (SOURCE_DSIRE:dsire_program_id:5878)
  - matched: Opportunity appears active.; Project site state CO matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Xcel Energy - Commercial Energy Efficiency Financing (SOURCE_DSIRE:dsire_program_id:5628)
  - matched: Opportunity appears active.; Project site state CO matches opportunity geography.; Self-reported utility matches Xcel Energy.
- eligible / 100: Renewable Energy Property Tax Assessment (SOURCE_DSIRE:dsire_program_id:2388)
  - matched: Opportunity appears rolling or no-deadline.; Project site state CO matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Xcel Energy - Solar Rewards Program (SOURCE_DSIRE:dsire_program_id:5295)
  - matched: Opportunity appears active.; Project site state CO matches opportunity geography.; Self-reported utility matches Xcel Energy.
- eligible / 100: Eagle County - Walking Mountains Science Center Solar PV Rebate (SOURCE_DSIRE:dsire_program_id:22786)
  - matched: Opportunity appears active.; Project site state CO matches opportunity geography.; No utility restriction was found after source review.
- eligible / 100: Modified Accelerated Cost-Recovery System (MACRS) (SOURCE_DSIRE:dsire_program_id:676)
  - matched: Opportunity appears rolling or no-deadline.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.

Common next questions:

Common unresolved requirements among promising matches:

Retrofit types inferred from promising matches:
- Ground-source / geothermal heat pump: 7
- Biomass / biogas energy system: 5
- EV charger installation: 5
- LED lighting retrofit: 5
- High-efficiency HVAC replacement: 4
- Rooftop solar PV: 4
- Solar water heating system: 3
- Battery storage system: 2

Common blockers across rejected/unavailable opportunities:
- User site or facility type (warehouse_logistics) does not match broad_residential eligibility.: 552
- Project site state CO does not match opportunity geography CA.: 176
- Project site state CO does not match opportunity geography MN.: 110
- Opportunity appears residential-only and the user profile is nonresidential.: 98
- Project site state CO does not match opportunity geography MA.: 70

### eastern-market-detroit

Detroit nonprofit public market district with multi-building vendor, event, food, and common-area loads.

Normalized profile:
```json
{
  "organizationTypes": [
    "nonprofit"
  ],
  "stateCode": "MI",
  "zip5": "48207",
  "utility": {
    "selfReportedName": "DTE Electric",
    "distributionUtilityId": "UTIL_DTE",
    "territoryCandidates": [
      "UTIL_DTE"
    ],
    "verificationStatus": "self_reported_unverified",
    "customerClass": null
  },
  "ownershipRelationship": "unknown",
  "buildingTypes": [
    "mixed_use"
  ],
  "squareFootage": {
    "value": null,
    "raw": "Unknown",
    "parsingStatus": "needs_validation"
  }
}
```

Status counts:
```json
{
  "eligible": 13,
  "ineligible": 1694
}
```

Eligible matches:
- eligible / 100: USDA - Biorefinery, Renewable Chemical, and Biobased Product Manufacturing Assistance Program (SOURCE_DSIRE:dsire_program_id:5313)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - matched: Opportunity appears rolling or no-deadline.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Nonrefundable Business Activity Tax Credit (SOURCE_DSIRE:dsire_program_id:333)
  - matched: Opportunity appears rolling or no-deadline.; Project site state MI matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Michigan Saves - Business Energy Financing (SOURCE_DSIRE:dsire_program_id:4633)
  - matched: Opportunity appears active.; Project site state MI matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Solar Energy Facility Exemption (SOURCE_DSIRE:dsire_program_id:22686)
  - matched: Opportunity appears active.; Project site state MI matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Lean and Green Michigan PACE (SOURCE_DSIRE:dsire_program_id:5543)
  - matched: Opportunity appears active.; Project site state MI matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Modified Accelerated Cost-Recovery System (MACRS) (SOURCE_DSIRE:dsire_program_id:676)
  - matched: Opportunity appears rolling or no-deadline.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Fuel Transformation Program (SOURCE_DSIRE:dsire_program_id:22192)
  - matched: Opportunity appears active.; Project site state MI matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Alternative Energy Property Tax Exemption (SOURCE_DSIRE:dsire_program_id:22142)
  - matched: Opportunity appears active.; Project site state MI matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Alternative Fuel Vehicle Refueling Property Tax Credit (Corporate) (SOURCE_DSIRE:dsire_program_id:22474)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Michigan Local PACE Program (SOURCE_DSIRE:dsire_program_id:4521)
  - matched: Opportunity appears rolling or no-deadline.; Project site state MI matches opportunity geography.; Utility provider is not applicable to this opportunity.

Common next questions:

Common unresolved requirements among promising matches:

Retrofit types inferred from promising matches:
- Biomass / biogas energy system: 5
- Ground-source / geothermal heat pump: 4
- LED lighting retrofit: 4
- Solar water heating system: 4
- Combined heat and power system: 3
- High-efficiency HVAC replacement: 3
- Battery storage system: 2
- EV charger installation: 2

Common blockers across rejected/unavailable opportunities:
- User site or facility type (mixed_use) does not match broad_residential eligibility.: 552
- Project site state MI does not match opportunity geography CA.: 176
- Project site state MI does not match opportunity geography MN.: 110
- Opportunity appears residential-only and the user profile is nonresidential.: 98
- Project site state MI does not match opportunity geography CO.: 74

### okc-national-memorial-museum

Oklahoma City nonprofit museum and memorial with public visitor, exhibit, event, and office loads.

Normalized profile:
```json
{
  "organizationTypes": [
    "nonprofit"
  ],
  "stateCode": "OK",
  "zip5": "73102",
  "utility": {
    "selfReportedName": "Oklahoma Gas & Electric",
    "distributionUtilityId": "UTIL_OGE",
    "territoryCandidates": [
      "UTIL_OGE"
    ],
    "verificationStatus": "self_reported_unverified",
    "customerClass": null
  },
  "ownershipRelationship": "unknown",
  "buildingTypes": [
    "public_institutional"
  ],
  "squareFootage": {
    "value": 30000,
    "raw": "30,000",
    "parsingStatus": "parsed"
  }
}
```

Status counts:
```json
{
  "eligible": 6,
  "ineligible": 1701
}
```

Eligible matches:
- eligible / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: OG&E - Commercial Energy Efficiency Rebate Programs (SOURCE_DSIRE:dsire_program_id:3639)
  - matched: Opportunity appears active.; Project site state OK matches opportunity geography.; No utility restriction was found after source review.
- eligible / 100: Modified Accelerated Cost-Recovery System (MACRS) (SOURCE_DSIRE:dsire_program_id:676)
  - matched: Opportunity appears rolling or no-deadline.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Local Option - County Energy District Authority (SOURCE_DSIRE:dsire_program_id:3534)
  - matched: Opportunity appears active.; Project site state OK matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Alternative Fuel Vehicle Refueling Property Tax Credit (Corporate) (SOURCE_DSIRE:dsire_program_id:22474)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Clean-Burning Motor Vehicle Fuel Property Tax Credit - Corporate (SOURCE_DSIRE:dsire_program_id:22221)
  - matched: Opportunity appears rolling or no-deadline.; Project site state OK matches opportunity geography.; Utility provider is not applicable to this opportunity.

Common next questions:

Common unresolved requirements among promising matches:

Retrofit types inferred from promising matches:
- Biomass / biogas energy system: 2
- EV charger installation: 2
- Ground-source / geothermal heat pump: 2
- High-efficiency HVAC replacement: 2
- LED lighting retrofit: 2
- Building benchmarking compliance: 1
- Combined heat and power system: 1
- Energy audit: 1

Common blockers across rejected/unavailable opportunities:
- User site or facility type (public_institutional) does not match broad_residential eligibility.: 552
- User site or facility type (public_institutional) does not match broad_commercial eligibility.: 362
- Project site state OK does not match opportunity geography CA.: 176
- Project site state OK does not match opportunity geography MN.: 110
- Opportunity appears residential-only and the user profile is nonresidential.: 98

### museum-life-science-durham

Durham nonprofit science museum campus with indoor exhibits, outdoor water use, cafe, and animal-care loads.

Normalized profile:
```json
{
  "organizationTypes": [
    "nonprofit"
  ],
  "stateCode": "NC",
  "zip5": "27704",
  "utility": {
    "selfReportedName": "Duke Energy Progress",
    "distributionUtilityId": "UTIL_DUKE",
    "territoryCandidates": [
      "UTIL_DUKE"
    ],
    "verificationStatus": "self_reported_unverified",
    "customerClass": null
  },
  "ownershipRelationship": "unknown",
  "buildingTypes": [
    "public_institutional"
  ],
  "squareFootage": {
    "value": 100000,
    "raw": "100,000",
    "parsingStatus": "parsed"
  }
}
```

Status counts:
```json
{
  "eligible": 7,
  "ineligible": 1700
}
```

Eligible matches:
- eligible / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Active Solar Heating and Cooling Systems Exemption (SOURCE_DSIRE:dsire_program_id:183)
  - matched: Opportunity appears active.; Project site state NC matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Property Tax Abatement for Solar Electric Systems (SOURCE_DSIRE:dsire_program_id:3036)
  - matched: Opportunity appears rolling or no-deadline.; Project site state NC matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Duke Energy - Non-Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:3466)
  - matched: Opportunity appears active.; Project site state NC matches opportunity geography.; Self-reported utility matches Duke Energy.
- eligible / 100: Modified Accelerated Cost-Recovery System (MACRS) (SOURCE_DSIRE:dsire_program_id:676)
  - matched: Opportunity appears rolling or no-deadline.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Duke Energy - PowerPair (SOURCE_DSIRE:dsire_program_id:22607)
  - matched: Opportunity appears active.; Project site state NC matches opportunity geography.; Self-reported utility matches Duke Energy.
- eligible / 100: Alternative Fuel Vehicle Refueling Property Tax Credit (Corporate) (SOURCE_DSIRE:dsire_program_id:22474)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.

Common next questions:

Common unresolved requirements among promising matches:

Retrofit types inferred from promising matches:
- Biomass / biogas energy system: 2
- Ground-source / geothermal heat pump: 2
- Rooftop solar PV: 2
- Window replacement: 2
- Battery storage system: 1
- Combined heat and power system: 1
- Efficient air compressor: 1
- EV charger installation: 1

Common blockers across rejected/unavailable opportunities:
- User site or facility type (public_institutional) does not match broad_residential eligibility.: 552
- User site or facility type (public_institutional) does not match broad_commercial eligibility.: 362
- Project site state NC does not match opportunity geography CA.: 176
- Project site state NC does not match opportunity geography MN.: 110
- Opportunity appears residential-only and the user profile is nonresidential.: 98

### portland-food-coop-maine

Portland Maine urban grocery co-op with refrigeration and cold-climate gas utility ambiguity.

Normalized profile:
```json
{
  "organizationTypes": [
    "commercial"
  ],
  "stateCode": "ME",
  "zip5": "04101",
  "utility": {
    "selfReportedName": "Central Maine Power",
    "distributionUtilityId": "UTIL_CMP",
    "territoryCandidates": [
      "UTIL_CMP"
    ],
    "verificationStatus": "self_reported_unverified",
    "customerClass": null
  },
  "ownershipRelationship": "tenant",
  "buildingTypes": [
    "grocery_food_retail"
  ],
  "squareFootage": {
    "value": 10000,
    "raw": "10,000",
    "parsingStatus": "parsed"
  }
}
```

Status counts:
```json
{
  "eligible": 13,
  "ineligible": 1694
}
```

Eligible matches:
- eligible / 100: C-PACE: Efficiency Maine (SOURCE_DSIRE:dsire_program_id:22591)
  - matched: Opportunity appears active.; Project site state ME matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - matched: Opportunity appears rolling or no-deadline.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Maine - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program (SOURCE_DSIRE:dsire_program_id:22637)
  - matched: Opportunity appears active.; Project site state ME matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Small Business Energy Loans (SOURCE_DSIRE:dsire_program_id:22716)
  - matched: Opportunity appears active.; Project site state ME matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Public Charger Grants (SOURCE_DSIRE:dsire_program_id:22783)
  - matched: Opportunity appears active.; Project site state ME matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Efficiency Maine Appliance Rebate Program (SOURCE_DSIRE:dsire_program_id:5324)
  - matched: Opportunity appears active.; Project site state ME matches opportunity geography.; No utility restriction was found after source review.
- eligible / 100: Efficiency Maine Commercial and Industrial Prescriptive Program (SOURCE_DSIRE:dsire_program_id:1144)
  - matched: Opportunity appears active.; Project site state ME matches opportunity geography.; No utility restriction was found after source review.
- eligible / 100: Modified Accelerated Cost-Recovery System (MACRS) (SOURCE_DSIRE:dsire_program_id:676)
  - matched: Opportunity appears rolling or no-deadline.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Alternative Fuel Vehicle Refueling Property Tax Credit (Corporate) (SOURCE_DSIRE:dsire_program_id:22474)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Energy-Efficient Commercial Buildings Tax Deduction (SOURCE_DSIRE:dsire_program_id:1271)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Electric Vehicle Rebate Program (SOURCE_DSIRE:dsire_program_id:22181)
  - matched: Opportunity appears active.; Project site state ME matches opportunity geography.; Utility provider is not applicable to this opportunity.

Common next questions:

Common unresolved requirements among promising matches:

Retrofit types inferred from promising matches:
- EV charger installation: 5
- High-efficiency HVAC replacement: 5
- Biomass / biogas energy system: 4
- LED lighting retrofit: 4
- Ground-source / geothermal heat pump: 3
- Battery storage system: 2
- Combined heat and power system: 2
- DC fast charger installation: 2

Common blockers across rejected/unavailable opportunities:
- User site or facility type (grocery_food_retail) does not match broad_residential eligibility.: 552
- Project site state ME does not match opportunity geography CA.: 176
- Project site state ME does not match opportunity geography MN.: 110
- Opportunity appears residential-only and the user profile is nonresidential.: 98
- Project site state ME does not match opportunity geography CO.: 74

### phipps-conservatory-pittsburgh

Pittsburgh nonprofit botanical conservatory with greenhouse, humidity, water, exhibit, and visitor loads.

Normalized profile:
```json
{
  "organizationTypes": [
    "nonprofit"
  ],
  "stateCode": "PA",
  "zip5": "15213",
  "utility": {
    "selfReportedName": "Duquesne Light Company",
    "distributionUtilityId": "UTIL_DUQUESNE_LIGHT",
    "territoryCandidates": [
      "UTIL_DUQUESNE_LIGHT"
    ],
    "verificationStatus": "self_reported_unverified",
    "customerClass": null
  },
  "ownershipRelationship": "unknown",
  "buildingTypes": [
    "public_institutional"
  ],
  "squareFootage": {
    "value": 55500,
    "raw": "55,500",
    "parsingStatus": "parsed"
  }
}
```

Status counts:
```json
{
  "eligible": 9,
  "ineligible": 1698
}
```

Eligible matches:
- eligible / 100: Duquesne Light Company - Commercial and Industrial Energy Efficiency Program (SOURCE_DSIRE:dsire_program_id:3873)
  - matched: Opportunity appears active.; Project site state PA matches opportunity geography.; Self-reported utility matches Duquesne Light.
- eligible / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Level 2 EV Charging Rebate Program (SOURCE_DSIRE:dsire_program_id:22230)
  - matched: Opportunity appears active.; Project site state PA matches opportunity geography.; No utility restriction was found after source review.
- eligible / 100: The Green Energy Loan Fund (GELF) (SOURCE_DSIRE:dsire_program_id:22779)
  - matched: Opportunity appears active.; Project site state PA matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Modified Accelerated Cost-Recovery System (MACRS) (SOURCE_DSIRE:dsire_program_id:676)
  - matched: Opportunity appears rolling or no-deadline.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Electric Cargo Handling Grant Program (SOURCE_DSIRE:dsire_program_id:22228)
  - matched: Opportunity appears active.; Project site state PA matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Duquesne Light Company - PEV Bill Credit Program (SOURCE_DSIRE:dsire_program_id:22376)
  - matched: Opportunity appears active.; Project site state PA matches opportunity geography.; Self-reported utility matches Duquesne Light.
- eligible / 100: Alternative Fuel Vehicle Refueling Property Tax Credit (Corporate) (SOURCE_DSIRE:dsire_program_id:22474)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: DC Fast Charging and Hydrogen Fueling Grant Program (SOURCE_DSIRE:dsire_program_id:22229)
  - matched: Opportunity appears active.; Project site state PA matches opportunity geography.; Utility provider is not applicable to this opportunity.

Common next questions:

Common unresolved requirements among promising matches:

Retrofit types inferred from promising matches:
- EV charger installation: 4
- Biomass / biogas energy system: 2
- Ground-source / geothermal heat pump: 2
- High-efficiency HVAC replacement: 2
- LED lighting retrofit: 2
- Combined heat and power system: 1
- DC fast charger installation: 1
- Electric forklift / material handling equipment: 1

Common blockers across rejected/unavailable opportunities:
- User site or facility type (public_institutional) does not match broad_residential eligibility.: 552
- User site or facility type (public_institutional) does not match broad_commercial eligibility.: 362
- Project site state PA does not match opportunity geography CA.: 176
- Project site state PA does not match opportunity geography MN.: 110
- Opportunity appears residential-only and the user profile is nonresidential.: 98

### boise-coop-north-end

Boise grocery co-op with refrigeration, prepared food, and Idaho Power electric service.

Normalized profile:
```json
{
  "organizationTypes": [
    "commercial"
  ],
  "stateCode": "ID",
  "zip5": "83702",
  "utility": {
    "selfReportedName": "Idaho Power",
    "distributionUtilityId": "UTIL_IDAHO_POWER",
    "territoryCandidates": [
      "UTIL_IDAHO_POWER"
    ],
    "verificationStatus": "self_reported_unverified",
    "customerClass": null
  },
  "ownershipRelationship": "unknown",
  "buildingTypes": [
    "grocery_food_retail"
  ],
  "squareFootage": {
    "value": 26000,
    "raw": "26,000",
    "parsingStatus": "parsed"
  }
}
```

Status counts:
```json
{
  "eligible": 12,
  "ineligible": 1695
}
```

Eligible matches:
- eligible / 100: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - matched: Opportunity appears rolling or no-deadline.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Vehicle Replacement Program (SOURCE_DSIRE:dsire_program_id:22169)
  - matched: Opportunity appears active.; Project site state ID matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Northern Lights Inc. - Energy Conservation Rebate Program (SOURCE_DSIRE:dsire_program_id:4198)
  - matched: Opportunity appears active.; Project site state ID matches opportunity geography.; No utility restriction was found after source review.
- eligible / 100: Guam - Photovoltaic Property Tax Exemption (SOURCE_DSIRE:dsire_program_id:22589)
  - matched: Opportunity appears rolling or no-deadline.; Project site state ID matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Property Tax Exemption for Wind, Solar, and Geothermal Energy Producers (SOURCE_DSIRE:dsire_program_id:2786)
  - matched: Opportunity appears rolling or no-deadline.; Project site state ID matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Idaho Commercial PACE Financing Program (SOURCE_DSIRE:dsire_program_id:22652)
  - matched: Opportunity appears rolling or no-deadline.; Project site state ID matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Modified Accelerated Cost-Recovery System (MACRS) (SOURCE_DSIRE:dsire_program_id:676)
  - matched: Opportunity appears rolling or no-deadline.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Income Tax Deduction for Energy Efficiency Upgrades (SOURCE_DSIRE:dsire_program_id:1227)
  - matched: Opportunity appears rolling or no-deadline.; Project site state ID matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Alternative Fuel Vehicle Refueling Property Tax Credit (Corporate) (SOURCE_DSIRE:dsire_program_id:22474)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Energy-Efficient Commercial Buildings Tax Deduction (SOURCE_DSIRE:dsire_program_id:1271)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Idaho Power - Easy Upgrades for Simple Retrofits Rebate Program (SOURCE_DSIRE:dsire_program_id:2620)
  - matched: Opportunity appears active.; Project site state ID matches opportunity geography.; Self-reported utility matches Idaho Power.

Common next questions:

Common unresolved requirements among promising matches:

Retrofit types inferred from promising matches:
- Ground-source / geothermal heat pump: 5
- High-efficiency HVAC replacement: 4
- LED lighting retrofit: 4
- Biomass / biogas energy system: 3
- Battery storage system: 2
- Combined heat and power system: 2
- High-efficiency laundry equipment: 2
- Insulation upgrade: 2

Common blockers across rejected/unavailable opportunities:
- User site or facility type (grocery_food_retail) does not match broad_residential eligibility.: 552
- Project site state ID does not match opportunity geography CA.: 176
- Project site state ID does not match opportunity geography MN.: 110
- Opportunity appears residential-only and the user profile is nonresidential.: 98
- Project site state ID does not match opportunity geography CO.: 74

### common-ground-coop-urbana

Urbana Illinois grocery co-op tenant with Ameren delivery utility and supplier-choice ambiguity.

Normalized profile:
```json
{
  "organizationTypes": [
    "commercial"
  ],
  "stateCode": "IL",
  "zip5": "61801",
  "utility": {
    "selfReportedName": "Ameren Illinois",
    "distributionUtilityId": "UTIL_AMEREN_IL",
    "territoryCandidates": [
      "UTIL_AMEREN_IL"
    ],
    "verificationStatus": "self_reported_unverified",
    "customerClass": null
  },
  "ownershipRelationship": "tenant",
  "buildingTypes": [
    "grocery_food_retail"
  ],
  "squareFootage": {
    "value": 8000,
    "raw": "8,000",
    "parsingStatus": "parsed"
  }
}
```

Status counts:
```json
{
  "eligible": 15,
  "ineligible": 1692
}
```

Eligible matches:
- eligible / 100: Electric Vehicle Fleet Fee Exemption (SOURCE_DSIRE:dsire_program_id:22174)
  - matched: Opportunity appears rolling or no-deadline.; Project site state IL matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - matched: Opportunity appears rolling or no-deadline.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: City of Chicago - Green Building Permit Programs (SOURCE_DSIRE:dsire_program_id:2466)
  - matched: Opportunity appears active.; Project site state IL matches opportunity geography.; No utility restriction was found after source review.
- eligible / 100: Illinois PACE Financing Program (SOURCE_DSIRE:dsire_program_id:3626)
  - matched: Opportunity appears rolling or no-deadline.; Project site state IL matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Renewable Energy and Energy Efficiency Project Financing (SOURCE_DSIRE:dsire_program_id:3567)
  - matched: Opportunity appears rolling or no-deadline.; Project site state IL matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Sales Tax Exemption for Wind, Solar, and Storage - High Impact Business (SOURCE_DSIRE:dsire_program_id:3543)
  - matched: Opportunity appears active.; Project site state IL matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Ameren Illinois Distributed Generation Rebate Program (SOURCE_DSIRE:dsire_program_id:22553)
  - matched: Opportunity appears active.; Project site state IL matches opportunity geography.; Self-reported utility matches Ameren Illinois.
- eligible / 100: ComEd - Energy Efficiency Program for Commercial New Construction (SOURCE_DSIRE:dsire_program_id:3716)
  - matched: Opportunity appears active.; Project site state IL matches opportunity geography.; No utility restriction was found after source review.
- eligible / 100: City of Chicago - Small Business Improvement Fund (SOURCE_DSIRE:dsire_program_id:3388)
  - matched: Opportunity appears active.; Project site state IL matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Modified Accelerated Cost-Recovery System (MACRS) (SOURCE_DSIRE:dsire_program_id:676)
  - matched: Opportunity appears rolling or no-deadline.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Alternative Fuel Vehicle Refueling Property Tax Credit (Corporate) (SOURCE_DSIRE:dsire_program_id:22474)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.

Common next questions:

Common unresolved requirements among promising matches:

Retrofit types inferred from promising matches:
- Battery storage system: 6
- Biomass / biogas energy system: 4
- Ground-source / geothermal heat pump: 4
- LED lighting retrofit: 3
- Solar water heating system: 3
- Combined heat and power system: 2
- Community solar subscription: 2
- EV charger installation: 2

Common blockers across rejected/unavailable opportunities:
- User site or facility type (grocery_food_retail) does not match broad_residential eligibility.: 552
- Project site state IL does not match opportunity geography CA.: 176
- Project site state IL does not match opportunity geography MN.: 110
- Opportunity appears residential-only and the user profile is nonresidential.: 98
- Project site state IL does not match opportunity geography CO.: 74

### trees-atlanta-kendeda-treehouse

Atlanta nonprofit urban-forestry campus with office, education, event, operations, and landscape water loads.

Normalized profile:
```json
{
  "organizationTypes": [
    "nonprofit"
  ],
  "stateCode": "GA",
  "zip5": "30310",
  "utility": {
    "selfReportedName": "Georgia Power",
    "distributionUtilityId": "UTIL_GEORGIA_POWER",
    "territoryCandidates": [
      "UTIL_GEORGIA_POWER"
    ],
    "verificationStatus": "self_reported_unverified",
    "customerClass": null
  },
  "ownershipRelationship": "unknown",
  "buildingTypes": [
    "office_admin"
  ],
  "squareFootage": {
    "value": 22000,
    "raw": "22,000",
    "parsingStatus": "parsed"
  }
}
```

Status counts:
```json
{
  "eligible": 14,
  "ineligible": 1693
}
```

Eligible matches:
- eligible / 100: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - matched: Opportunity appears rolling or no-deadline.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Georgia Power -  Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:4656)
  - matched: Opportunity appears active.; Project site state GA matches opportunity geography.; Self-reported utility matches Georgia Power.
- eligible / 100: Georgia Power - Business EV Charger Plus Rebate Program (SOURCE_DSIRE:dsire_program_id:22309)
  - matched: Opportunity appears active.; Project site state GA matches opportunity geography.; Self-reported utility matches Georgia Power.
- eligible / 100: Biomass Sales and Use Tax Exemption (SOURCE_DSIRE:dsire_program_id:1952)
  - matched: Opportunity appears rolling or no-deadline.; Project site state GA matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Electric Vehicle Supply Equipment Tax Credit (SOURCE_DSIRE:dsire_program_id:22167)
  - matched: Opportunity appears active.; Project site state GA matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Georgia Power - Energy Assistance for Savings & Efficiency (EASE) (SOURCE_DSIRE:dsire_program_id:22509)
  - matched: Opportunity appears active.; Project site state GA matches opportunity geography.; Self-reported utility matches Georgia Power.
- eligible / 100: Local Option - Special Improvement Districts (SOURCE_DSIRE:dsire_program_id:4177)
  - matched: Opportunity appears rolling or no-deadline.; Project site state GA matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: TVA - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:22127)
  - matched: Opportunity appears active.; Project site state GA matches opportunity geography.; No utility restriction was found after source review.
- eligible / 100: ACE Georgia - Business Loan Program (SOURCE_DSIRE:dsire_program_id:22478)
  - matched: Opportunity appears active.; Project site state GA matches opportunity geography.; No utility restriction was found after source review.
- eligible / 100: Modified Accelerated Cost-Recovery System (MACRS) (SOURCE_DSIRE:dsire_program_id:676)
  - matched: Opportunity appears rolling or no-deadline.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Alternative Fuel Vehicle Refueling Property Tax Credit (Corporate) (SOURCE_DSIRE:dsire_program_id:22474)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.

Common next questions:

Common unresolved requirements among promising matches:

Retrofit types inferred from promising matches:
- LED lighting retrofit: 6
- Biomass / biogas energy system: 4
- High-efficiency HVAC replacement: 4
- EV charger installation: 3
- Ground-source / geothermal heat pump: 3
- Battery storage system: 2
- Combined heat and power system: 2
- Heat pump HVAC retrofit: 2

Common blockers across rejected/unavailable opportunities:
- User site or facility type (office_admin) does not match broad_residential eligibility.: 552
- Project site state GA does not match opportunity geography CA.: 176
- Project site state GA does not match opportunity geography MN.: 110
- Opportunity appears residential-only and the user profile is nonresidential.: 98
- Project site state GA does not match opportunity geography CO.: 74

### boeing-everett-factory

Enormous aerospace manufacturing complex in Snohomish PUD electric and Puget Sound Energy gas territory.

Normalized profile:
```json
{
  "organizationTypes": [
    "industrial"
  ],
  "stateCode": "WA",
  "zip5": "98204",
  "utility": {
    "selfReportedName": "Snohomish County Public Utility District",
    "distributionUtilityId": "UTIL_SNOHOMISH_PUD",
    "territoryCandidates": [
      "UTIL_SNOHOMISH_PUD"
    ],
    "verificationStatus": "self_reported_unverified",
    "customerClass": null
  },
  "ownershipRelationship": "owner",
  "buildingTypes": [
    "industrial_manufacturing"
  ],
  "squareFootage": {
    "value": 4281948,
    "raw": "4,281,948",
    "parsingStatus": "parsed"
  }
}
```

Status counts:
```json
{
  "eligible": 13,
  "ineligible": 1694
}
```

Eligible matches:
- eligible / 100: USDA - Biorefinery, Renewable Chemical, and Biobased Product Manufacturing Assistance Program (SOURCE_DSIRE:dsire_program_id:5313)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Snohomish County PUD No 1 - Commercial and Industrial Energy Efficiency Program (SOURCE_DSIRE:dsire_program_id:2239)
  - matched: Opportunity appears active.; Project site state WA matches opportunity geography.; Self-reported utility matches Snohomish County PUD.
- eligible / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Tax Abatement for Solar Manufacturers (SOURCE_DSIRE:dsire_program_id:381)
  - matched: Opportunity appears active.; Project site state WA matches opportunity geography.; No utility restriction was found after source review.
- eligible / 100: Seattle City Light - Commercial Energy Efficiency Rebate Programs (SOURCE_DSIRE:dsire_program_id:2208)
  - matched: Opportunity appears active.; Project site state WA matches opportunity geography.; No utility restriction was found after source review.
- eligible / 100: Alternative Fuel Vehicle Refueling Property Tax Credit (Personal) (SOURCE_DSIRE:dsire_program_id:22475)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Tax Credit for Forest Derived Biomass (SOURCE_DSIRE:dsire_program_id:5550)
  - matched: Opportunity appears active.; Project site state WA matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: U.S. Department of Energy - Loan Guarantee Program (SOURCE_DSIRE:dsire_program_id:3071)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Renewable Energy Sales and Use Tax Exemption (SOURCE_DSIRE:dsire_program_id:576)
  - matched: Opportunity appears active.; Project site state WA matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Modified Accelerated Cost-Recovery System (MACRS) (SOURCE_DSIRE:dsire_program_id:676)
  - matched: Opportunity appears rolling or no-deadline.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Washington - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program (SOURCE_DSIRE:dsire_program_id:22662)
  - matched: Opportunity appears rolling or no-deadline.; Project site state WA matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Office of Indian Energy Policy and Programs - Funding Opportunities (SOURCE_DSIRE:dsire_program_id:918)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.

Common next questions:

Common unresolved requirements among promising matches:

Retrofit types inferred from promising matches:
- Biomass / biogas energy system: 5
- EV charger installation: 3
- Ground-source / geothermal heat pump: 3
- High-efficiency HVAC replacement: 2
- High-efficiency refrigeration equipment: 2
- LED lighting retrofit: 2
- Rooftop solar PV: 2
- Solar water heating system: 2

Common blockers across rejected/unavailable opportunities:
- User site or facility type (industrial_manufacturing) does not match broad_residential eligibility.: 552
- User site or facility type (industrial_manufacturing) does not match broad_commercial eligibility.: 362
- Project site state WA does not match opportunity geography CA.: 176
- Project site state WA does not match opportunity geography MN.: 110
- Opportunity appears residential-only and the user profile is nonresidential.: 98

### intel-ocotillo-chandler

Semiconductor fabrication campus in SRP territory with cleanroom, process cooling, water, and large-load constraints.

Normalized profile:
```json
{
  "organizationTypes": [
    "industrial"
  ],
  "stateCode": "AZ",
  "zip5": "85248",
  "utility": {
    "selfReportedName": "Salt River Project",
    "distributionUtilityId": "UTIL_SRP",
    "territoryCandidates": [
      "UTIL_SRP"
    ],
    "verificationStatus": "self_reported_unverified",
    "customerClass": null
  },
  "ownershipRelationship": "owner",
  "buildingTypes": [
    "industrial_manufacturing"
  ],
  "squareFootage": {
    "value": null,
    "raw": "Unknown",
    "parsingStatus": "needs_validation"
  }
}
```

Status counts:
```json
{
  "eligible": 11,
  "ineligible": 1696
}
```

Eligible matches:
- eligible / 100: USDA - Biorefinery, Renewable Chemical, and Biobased Product Manufacturing Assistance Program (SOURCE_DSIRE:dsire_program_id:5313)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Energy Equipment Property Tax Exemption (SOURCE_DSIRE:dsire_program_id:1683)
  - matched: Opportunity appears rolling or no-deadline.; Project site state AZ matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Alternative Fuel Vehicle Refueling Property Tax Credit (Personal) (SOURCE_DSIRE:dsire_program_id:22475)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: U.S. Department of Energy - Loan Guarantee Program (SOURCE_DSIRE:dsire_program_id:3071)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Solar and Wind Equipment Sales Tax Exemption (SOURCE_DSIRE:dsire_program_id:119)
  - matched: Opportunity appears rolling or no-deadline.; Project site state AZ matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Modified Accelerated Cost-Recovery System (MACRS) (SOURCE_DSIRE:dsire_program_id:676)
  - matched: Opportunity appears rolling or no-deadline.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Office of Indian Energy Policy and Programs - Funding Opportunities (SOURCE_DSIRE:dsire_program_id:918)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Alternative Fuel Vehicle Refueling Property Tax Credit (Corporate) (SOURCE_DSIRE:dsire_program_id:22474)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Property Tax Assessment for Renewable Energy Equipment (SOURCE_DSIRE:dsire_program_id:2984)
  - matched: Opportunity appears active.; Project site state AZ matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Salt River Project - Business Energy Efficiency Programs (SOURCE_DSIRE:dsire_program_id:3256)
  - matched: Opportunity appears active.; Project site state AZ matches opportunity geography.; Self-reported utility matches Salt River Project.

Common next questions:

Common unresolved requirements among promising matches:

Retrofit types inferred from promising matches:
- Biomass / biogas energy system: 4
- EV charger installation: 3
- Ground-source / geothermal heat pump: 3
- Combined heat and power system: 2
- High-efficiency HVAC replacement: 2
- LED lighting retrofit: 2
- Solar water heating system: 2
- Air sealing / weatherization: 1

Common blockers across rejected/unavailable opportunities:
- User site or facility type (industrial_manufacturing) does not match broad_residential eligibility.: 552
- User site or facility type (industrial_manufacturing) does not match broad_commercial eligibility.: 362
- Project site state AZ does not match opportunity geography CA.: 176
- Project site state AZ does not match opportunity geography MN.: 110
- Opportunity appears residential-only and the user profile is nonresidential.: 98

### bmw-spartanburg-plant

Large South Carolina automotive manufacturing campus in Duke Energy Carolinas territory.

Normalized profile:
```json
{
  "organizationTypes": [
    "industrial"
  ],
  "stateCode": "SC",
  "zip5": "29651",
  "utility": {
    "selfReportedName": "Duke Energy Carolinas",
    "distributionUtilityId": "UTIL_DUKE",
    "territoryCandidates": [
      "UTIL_DUKE"
    ],
    "verificationStatus": "self_reported_unverified",
    "customerClass": null
  },
  "ownershipRelationship": "owner",
  "buildingTypes": [
    "industrial_manufacturing"
  ],
  "squareFootage": {
    "value": 8000000,
    "raw": "8,000,000",
    "parsingStatus": "parsed"
  }
}
```

Status counts:
```json
{
  "eligible": 16,
  "ineligible": 1691
}
```

Eligible matches:
- eligible / 100: USDA - Biorefinery, Renewable Chemical, and Biobased Product Manufacturing Assistance Program (SOURCE_DSIRE:dsire_program_id:5313)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Renewable Energy and Energy Storage Property Tax Exemption (SOURCE_DSIRE:dsire_program_id:22419)
  - matched: Opportunity appears rolling or no-deadline.; Project site state SC matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Alternative Fuel Vehicle Refueling Property Tax Credit (Personal) (SOURCE_DSIRE:dsire_program_id:22475)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: U.S. Department of Energy - Loan Guarantee Program (SOURCE_DSIRE:dsire_program_id:3071)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Energy Efficiency Revolving Loan Fund (SOURCE_DSIRE:dsire_program_id:5520)
  - matched: Opportunity appears active.; Project site state SC matches opportunity geography.; No utility restriction was found after source review.
- eligible / 100: Sales Tax Exemption for Hydrogen Fuel Cells (SOURCE_DSIRE:dsire_program_id:2755)
  - matched: Opportunity appears rolling or no-deadline.; Project site state SC matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Modified Accelerated Cost-Recovery System (MACRS) (SOURCE_DSIRE:dsire_program_id:676)
  - matched: Opportunity appears rolling or no-deadline.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Duke Energy Carolinas - Non-Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:3606)
  - matched: Opportunity appears active.; Project site state SC matches opportunity geography.; Self-reported utility matches Duke Energy.
- eligible / 100: Renewable Energy Manufacturing Tax Credit (SOURCE_DSIRE:dsire_program_id:5396)
  - matched: Opportunity appears active.; Project site state SC matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Office of Indian Energy Policy and Programs - Funding Opportunities (SOURCE_DSIRE:dsire_program_id:918)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Solar Energy, Small Hydropower, and Geothermal Tax Credit (Personal) (SOURCE_DSIRE:dsire_program_id:1803)
  - matched: Opportunity appears active.; Project site state SC matches opportunity geography.; Utility provider is not applicable to this opportunity.

Common next questions:

Common unresolved requirements among promising matches:

Retrofit types inferred from promising matches:
- Ground-source / geothermal heat pump: 5
- Biomass / biogas energy system: 3
- EV charger installation: 3
- High-efficiency HVAC replacement: 3
- Solar water heating system: 3
- Automated demand response controls: 2
- Battery storage system: 2
- LED lighting retrofit: 2

Common blockers across rejected/unavailable opportunities:
- User site or facility type (industrial_manufacturing) does not match broad_residential eligibility.: 552
- User site or facility type (industrial_manufacturing) does not match broad_commercial eligibility.: 362
- Project site state SC does not match opportunity geography CA.: 176
- Project site state SC does not match opportunity geography MN.: 110
- Opportunity appears residential-only and the user profile is nonresidential.: 98

### whirlpool-clyde-operations

Ohio appliance manufacturing plant served by municipal Clyde Light & Power rather than surrounding IOUs.

Normalized profile:
```json
{
  "organizationTypes": [
    "industrial"
  ],
  "stateCode": "OH",
  "zip5": "43410",
  "utility": {
    "selfReportedName": "Clyde Light & Power",
    "distributionUtilityId": "UTIL_CLYDE_LIGHT_POWER",
    "territoryCandidates": [
      "UTIL_CLYDE_LIGHT_POWER"
    ],
    "verificationStatus": "self_reported_unverified",
    "customerClass": null
  },
  "ownershipRelationship": "owner",
  "buildingTypes": [
    "industrial_manufacturing"
  ],
  "squareFootage": {
    "value": null,
    "raw": "Unknown",
    "parsingStatus": "needs_validation"
  }
}
```

Status counts:
```json
{
  "eligible": 14,
  "ineligible": 1693
}
```

Eligible matches:
- eligible / 100: USDA - Biorefinery, Renewable Chemical, and Biobased Product Manufacturing Assistance Program (SOURCE_DSIRE:dsire_program_id:5313)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Energy Loan Fund (SOURCE_DSIRE:dsire_program_id:5069)
  - matched: Opportunity appears active.; Project site state OH matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Alternative Fuel Vehicle Refueling Property Tax Credit (Personal) (SOURCE_DSIRE:dsire_program_id:22475)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Qualified Energy Property Tax Exemption for Projects 250 kW or Less (SOURCE_DSIRE:dsire_program_id:4217)
  - matched: Opportunity appears rolling or no-deadline.; Project site state OH matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Air-Quality Improvement Tax Incentives (SOURCE_DSIRE:dsire_program_id:78)
  - matched: Opportunity appears rolling or no-deadline.; Project site state OH matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: First Energy Ohio - Renewable Energy Credit Procurements (SOURCE_DSIRE:dsire_program_id:5005)
  - matched: Opportunity appears active.; Project site state OH matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: U.S. Department of Energy - Loan Guarantee Program (SOURCE_DSIRE:dsire_program_id:3071)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Modified Accelerated Cost-Recovery System (MACRS) (SOURCE_DSIRE:dsire_program_id:676)
  - matched: Opportunity appears rolling or no-deadline.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Office of Indian Energy Policy and Programs - Funding Opportunities (SOURCE_DSIRE:dsire_program_id:918)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Alternative Fuel Vehicle Refueling Property Tax Credit (Corporate) (SOURCE_DSIRE:dsire_program_id:22474)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: City of Cincinnati - Property Tax Abatement for Green Buildings (SOURCE_DSIRE:dsire_program_id:2809)
  - matched: Opportunity appears active.; Project site state OH matches opportunity geography.; Utility provider is not applicable to this opportunity.

Common next questions:

Common unresolved requirements among promising matches:

Retrofit types inferred from promising matches:
- Biomass / biogas energy system: 5
- Ground-source / geothermal heat pump: 3
- Battery storage system: 2
- EV charger installation: 2
- LED lighting retrofit: 2
- Small wind turbine: 2
- Solar water heating system: 2
- Air sealing / weatherization: 1

Common blockers across rejected/unavailable opportunities:
- User site or facility type (industrial_manufacturing) does not match broad_residential eligibility.: 552
- User site or facility type (industrial_manufacturing) does not match broad_commercial eligibility.: 362
- Project site state OH does not match opportunity geography CA.: 176
- Project site state OH does not match opportunity geography MN.: 110
- Opportunity appears residential-only and the user profile is nonresidential.: 98

### gm-factory-zero-detroit

Detroit EV assembly plant with facility efficiency, fleet charging, and clean-manufacturing overlap.

Normalized profile:
```json
{
  "organizationTypes": [
    "industrial"
  ],
  "stateCode": "MI",
  "zip5": "48211",
  "utility": {
    "selfReportedName": "DTE Electric",
    "distributionUtilityId": "UTIL_DTE",
    "territoryCandidates": [
      "UTIL_DTE"
    ],
    "verificationStatus": "self_reported_unverified",
    "customerClass": null
  },
  "ownershipRelationship": "owner",
  "buildingTypes": [
    "industrial_manufacturing"
  ],
  "squareFootage": {
    "value": 4000000,
    "raw": "4,000,000",
    "parsingStatus": "parsed"
  }
}
```

Status counts:
```json
{
  "eligible": 13,
  "ineligible": 1694
}
```

Eligible matches:
- eligible / 100: USDA - Biorefinery, Renewable Chemical, and Biobased Product Manufacturing Assistance Program (SOURCE_DSIRE:dsire_program_id:5313)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Renewable Energy Renaissance Zones (SOURCE_DSIRE:dsire_program_id:3216)
  - matched: Opportunity appears active.; Project site state MI matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Solar Energy Facility Exemption (SOURCE_DSIRE:dsire_program_id:22686)
  - matched: Opportunity appears active.; Project site state MI matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Alternative Fuel Vehicle Refueling Property Tax Credit (Personal) (SOURCE_DSIRE:dsire_program_id:22475)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: U.S. Department of Energy - Loan Guarantee Program (SOURCE_DSIRE:dsire_program_id:3071)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Michigan - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program (SOURCE_DSIRE:dsire_program_id:22647)
  - matched: Opportunity appears active.; Project site state MI matches opportunity geography.; Opportunity explicitly has no electric utility restriction.
- eligible / 100: Modified Accelerated Cost-Recovery System (MACRS) (SOURCE_DSIRE:dsire_program_id:676)
  - matched: Opportunity appears rolling or no-deadline.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Fuel Transformation Program (SOURCE_DSIRE:dsire_program_id:22192)
  - matched: Opportunity appears active.; Project site state MI matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Alternative Energy Property Tax Exemption (SOURCE_DSIRE:dsire_program_id:22142)
  - matched: Opportunity appears active.; Project site state MI matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Office of Indian Energy Policy and Programs - Funding Opportunities (SOURCE_DSIRE:dsire_program_id:918)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Alternative Fuel Vehicle Refueling Property Tax Credit (Corporate) (SOURCE_DSIRE:dsire_program_id:22474)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.

Common next questions:

Common unresolved requirements among promising matches:

Retrofit types inferred from promising matches:
- Biomass / biogas energy system: 4
- EV charger installation: 4
- Ground-source / geothermal heat pump: 2
- Solar water heating system: 2
- Air sealing / weatherization: 1
- Battery storage system: 1
- Combined heat and power system: 1
- Engineering feasibility study: 1

Common blockers across rejected/unavailable opportunities:
- User site or facility type (industrial_manufacturing) does not match broad_residential eligibility.: 552
- User site or facility type (industrial_manufacturing) does not match broad_commercial eligibility.: 362
- Project site state MI does not match opportunity geography CA.: 176
- Project site state MI does not match opportunity geography MN.: 110
- Opportunity appears residential-only and the user profile is nonresidential.: 98

### microsoft-columbia-data-center-quincy

Large Quincy Washington data center in Grant County PUD territory with gas unknown.

Normalized profile:
```json
{
  "organizationTypes": [
    "commercial"
  ],
  "stateCode": "WA",
  "zip5": "98848",
  "utility": {
    "selfReportedName": "Grant County Public Utility District",
    "distributionUtilityId": "UTIL_GRANT_COUNTY_PUD",
    "territoryCandidates": [
      "UTIL_GRANT_COUNTY_PUD"
    ],
    "verificationStatus": "self_reported_unverified",
    "customerClass": null
  },
  "ownershipRelationship": "owner",
  "buildingTypes": [
    "data_center"
  ],
  "squareFootage": {
    "value": 800000,
    "raw": "800,000",
    "parsingStatus": "parsed"
  }
}
```

Status counts:
```json
{
  "eligible": 8,
  "ineligible": 1699
}
```

Eligible matches:
- eligible / 100: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - matched: Opportunity appears rolling or no-deadline.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Clean Alternative Fuel Commercial Vehicle and Vehicle Infrastructure Tax Credit (SOURCE_DSIRE:dsire_program_id:22256)
  - matched: Opportunity appears active.; Project site state WA matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Seattle City Light - Commercial Energy Efficiency Rebate Programs (SOURCE_DSIRE:dsire_program_id:2208)
  - matched: Opportunity appears active.; Project site state WA matches opportunity geography.; No utility restriction was found after source review.
- eligible / 100: Washington Commercial PACER Program (SOURCE_DSIRE:dsire_program_id:22654)
  - matched: Opportunity appears rolling or no-deadline.; Project site state WA matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Modified Accelerated Cost-Recovery System (MACRS) (SOURCE_DSIRE:dsire_program_id:676)
  - matched: Opportunity appears rolling or no-deadline.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Alternative Fuel Vehicle Refueling Property Tax Credit (Corporate) (SOURCE_DSIRE:dsire_program_id:22474)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Energy-Efficient Commercial Buildings Tax Deduction (SOURCE_DSIRE:dsire_program_id:1271)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.

Common next questions:

Common unresolved requirements among promising matches:

Retrofit types inferred from promising matches:
- LED lighting retrofit: 4
- Biomass / biogas energy system: 3
- Ground-source / geothermal heat pump: 3
- Battery storage system: 2
- Combined heat and power system: 2
- EV charger installation: 2
- High-efficiency HVAC replacement: 2
- Solar water heating system: 2

Common blockers across rejected/unavailable opportunities:
- User site or facility type (data_center) does not match broad_residential eligibility.: 552
- Project site state WA does not match opportunity geography CA.: 176
- Project site state WA does not match opportunity geography MN.: 110
- Opportunity appears residential-only and the user profile is nonresidential.: 98
- Project site state WA does not match opportunity geography CO.: 74

### fedex-world-hub-memphis

Memphis airport cargo hub served by MLGW with warehouse, conveyor, aviation, fleet, and charging loads.

Normalized profile:
```json
{
  "organizationTypes": [
    "commercial"
  ],
  "stateCode": "TN",
  "zip5": "38118",
  "utility": {
    "selfReportedName": "Memphis Light, Gas and Water",
    "distributionUtilityId": "UTIL_MLGW",
    "territoryCandidates": [
      "UTIL_MLGW"
    ],
    "verificationStatus": "self_reported_unverified",
    "customerClass": null
  },
  "ownershipRelationship": "tenant",
  "buildingTypes": [
    "warehouse_logistics"
  ],
  "squareFootage": {
    "value": 1300000,
    "raw": "1,300,000",
    "parsingStatus": "parsed"
  }
}
```

Status counts:
```json
{
  "eligible": 7,
  "ineligible": 1700
}
```

Eligible matches:
- eligible / 100: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - matched: Opportunity appears rolling or no-deadline.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Modified Accelerated Cost-Recovery System (MACRS) (SOURCE_DSIRE:dsire_program_id:676)
  - matched: Opportunity appears rolling or no-deadline.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: TVA - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:22126)
  - matched: Opportunity appears active.; Project site state TN matches opportunity geography.; No utility restriction was found after source review.
- eligible / 100: Alternative Fuel Vehicle Refueling Property Tax Credit (Corporate) (SOURCE_DSIRE:dsire_program_id:22474)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: City of Memphis - PILOT Program (SOURCE_DSIRE:dsire_program_id:22676)
  - matched: Opportunity appears active.; Project site state TN matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Energy-Efficient Commercial Buildings Tax Deduction (SOURCE_DSIRE:dsire_program_id:1271)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.

Common next questions:

Common unresolved requirements among promising matches:

Retrofit types inferred from promising matches:
- LED lighting retrofit: 4
- Biomass / biogas energy system: 3
- Ground-source / geothermal heat pump: 3
- High-efficiency HVAC replacement: 3
- Combined heat and power system: 2
- Solar water heating system: 2
- Thermal energy storage: 2
- Battery storage system: 1

Common blockers across rejected/unavailable opportunities:
- User site or facility type (warehouse_logistics) does not match broad_residential eligibility.: 552
- Project site state TN does not match opportunity geography CA.: 176
- Project site state TN does not match opportunity geography MN.: 110
- Opportunity appears residential-only and the user profile is nonresidential.: 98
- Project site state TN does not match opportunity geography CO.: 74

### qts-richmond-data-center

Henrico County data center campus in Dominion Energy Virginia territory with gas unknown.

Normalized profile:
```json
{
  "organizationTypes": [
    "commercial"
  ],
  "stateCode": "VA",
  "zip5": "23150",
  "utility": {
    "selfReportedName": "Dominion Energy Virginia",
    "distributionUtilityId": "UTIL_DOMINION_VA",
    "territoryCandidates": [
      "UTIL_DOMINION_VA"
    ],
    "verificationStatus": "self_reported_unverified",
    "customerClass": null
  },
  "ownershipRelationship": "owner",
  "buildingTypes": [
    "data_center"
  ],
  "squareFootage": {
    "value": null,
    "raw": "Unknown",
    "parsingStatus": "needs_validation"
  }
}
```

Status counts:
```json
{
  "eligible": 12,
  "ineligible": 1695
}
```

Eligible matches:
- eligible / 100: Tax Exemption for Renewable Energy Generation (SOURCE_DSIRE:dsire_program_id:104)
  - matched: Opportunity appears rolling or no-deadline.; Project site state VA matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Small Business & Non-Profit Loan Program (SOURCE_DSIRE:dsire_program_id:5504)
  - matched: Opportunity appears active.; Project site state VA matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - matched: Opportunity appears rolling or no-deadline.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Local Option - Commercial Property Assessed Clean Energy (C-PACE) Financing (SOURCE_DSIRE:dsire_program_id:3531)
  - matched: Opportunity appears rolling or no-deadline.; Project site state VA matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Energy Project and Equipment Financing (SOURCE_DSIRE:dsire_program_id:4875)
  - matched: Opportunity appears active.; Project site state VA matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: VirginiaSAVES Green Community Loan Program (SOURCE_DSIRE:dsire_program_id:5834)
  - matched: Opportunity appears active.; Project site state VA matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Modified Accelerated Cost-Recovery System (MACRS) (SOURCE_DSIRE:dsire_program_id:676)
  - matched: Opportunity appears rolling or no-deadline.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Special Assessment for Wind Energy Systems (SOURCE_DSIRE:dsire_program_id:561)
  - matched: Opportunity appears rolling or no-deadline.; Project site state VA matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Alternative Fuel Vehicle Refueling Property Tax Credit (Corporate) (SOURCE_DSIRE:dsire_program_id:22474)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Energy-Efficient Commercial Buildings Tax Deduction (SOURCE_DSIRE:dsire_program_id:1271)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: TVA - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:22125)
  - matched: Opportunity appears active.; Project site state VA matches opportunity geography.; No utility restriction was found after source review.

Common next questions:

Common unresolved requirements among promising matches:

Retrofit types inferred from promising matches:
- LED lighting retrofit: 4
- Biomass / biogas energy system: 3
- Ground-source / geothermal heat pump: 3
- High-efficiency HVAC replacement: 3
- Small wind turbine: 3
- Battery storage system: 2
- Combined heat and power system: 2
- Solar water heating system: 2

Common blockers across rejected/unavailable opportunities:
- User site or facility type (data_center) does not match broad_residential eligibility.: 552
- Project site state VA does not match opportunity geography CA.: 176
- Project site state VA does not match opportunity geography MN.: 110
- Opportunity appears residential-only and the user profile is nonresidential.: 98
- Project site state VA does not match opportunity geography CO.: 74

### hersheys-chocolate-world-hershey

Hershey visitor attraction with retail, food service, events, and refrigeration loads, distinct from manufacturing.

Normalized profile:
```json
{
  "organizationTypes": [
    "commercial"
  ],
  "stateCode": "PA",
  "zip5": "17033",
  "utility": {
    "selfReportedName": "PPL Electric Utilities",
    "distributionUtilityId": "UTIL_PPL",
    "territoryCandidates": [
      "UTIL_PPL"
    ],
    "verificationStatus": "self_reported_unverified",
    "customerClass": null
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
```

Status counts:
```json
{
  "eligible": 18,
  "ineligible": 1689
}
```

Eligible matches:
- eligible / 100: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - matched: Opportunity appears rolling or no-deadline.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: High Performance Buildings Incentive Program (SOURCE_DSIRE:dsire_program_id:3602)
  - matched: Opportunity appears active.; Project site state PA matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Property Tax Assessment for Commercial Wind Farms (SOURCE_DSIRE:dsire_program_id:2369)
  - matched: Opportunity appears active.; Project site state PA matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: PECO - EV Rebate Program (SOURCE_DSIRE:dsire_program_id:22377)
  - matched: Opportunity appears active.; Project site state PA matches opportunity geography.; No utility restriction was found after source review.
- eligible / 100: PECO - Commercial Charger Rebate Program (SOURCE_DSIRE:dsire_program_id:22456)
  - matched: Opportunity appears active.; Project site state PA matches opportunity geography.; No utility restriction was found after source review.
- eligible / 100: Small Business Advantage Grant Program (SOURCE_DSIRE:dsire_program_id:1185)
  - matched: Opportunity appears active.; Project site state PA matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: PPL Electric Utilities - Business Incentive Program (SOURCE_DSIRE:dsire_program_id:22438)
  - matched: Opportunity appears active.; Project site state PA matches opportunity geography.; Self-reported utility matches PPL Electric Utilities.
- eligible / 100: Level 2 EV Charging Rebate Program (SOURCE_DSIRE:dsire_program_id:22230)
  - matched: Opportunity appears active.; Project site state PA matches opportunity geography.; No utility restriction was found after source review.
- eligible / 100: The Green Energy Loan Fund (GELF) (SOURCE_DSIRE:dsire_program_id:22779)
  - matched: Opportunity appears active.; Project site state PA matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Modified Accelerated Cost-Recovery System (MACRS) (SOURCE_DSIRE:dsire_program_id:676)
  - matched: Opportunity appears rolling or no-deadline.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Electric Cargo Handling Grant Program (SOURCE_DSIRE:dsire_program_id:22228)
  - matched: Opportunity appears active.; Project site state PA matches opportunity geography.; Utility provider is not applicable to this opportunity.

Common next questions:

Common unresolved requirements among promising matches:

Retrofit types inferred from promising matches:
- High-efficiency HVAC replacement: 6
- Biomass / biogas energy system: 5
- EV charger installation: 5
- LED lighting retrofit: 5
- Combined heat and power system: 4
- Ground-source / geothermal heat pump: 4
- Retro-commissioning study: 3
- LEED certification: 2

Common blockers across rejected/unavailable opportunities:
- User site or facility type (retail_storefront) does not match broad_residential eligibility.: 552
- Project site state PA does not match opportunity geography CA.: 176
- Project site state PA does not match opportunity geography MN.: 110
- Opportunity appears residential-only and the user profile is nonresidential.: 98
- Project site state PA does not match opportunity geography CO.: 74

### quaker-oats-cedar-rapids

Cedar Rapids food manufacturing and grain milling plant with process, dust collection, and steam loads.

Normalized profile:
```json
{
  "organizationTypes": [
    "industrial"
  ],
  "stateCode": "IA",
  "zip5": "52401",
  "utility": {
    "selfReportedName": "Alliant Energy / Interstate Power and Light",
    "distributionUtilityId": "UTIL_ALLIANT",
    "territoryCandidates": [
      "UTIL_ALLIANT"
    ],
    "verificationStatus": "self_reported_unverified",
    "customerClass": null
  },
  "ownershipRelationship": "owner",
  "buildingTypes": [
    "industrial_manufacturing"
  ],
  "squareFootage": {
    "value": 1900000,
    "raw": "1,900,000",
    "parsingStatus": "parsed"
  }
}
```

Status counts:
```json
{
  "eligible": 10,
  "ineligible": 1697
}
```

Eligible matches:
- eligible / 100: USDA - Biorefinery, Renewable Chemical, and Biobased Product Manufacturing Assistance Program (SOURCE_DSIRE:dsire_program_id:5313)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Alternative Fuel Vehicle Refueling Property Tax Credit (Personal) (SOURCE_DSIRE:dsire_program_id:22475)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Energy Replacement Generation Tax Exemption (SOURCE_DSIRE:dsire_program_id:966)
  - matched: Opportunity appears active.; Project site state IA matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: U.S. Department of Energy - Loan Guarantee Program (SOURCE_DSIRE:dsire_program_id:3071)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: IADG Energy Bank Revolving Loan Program (SOURCE_DSIRE:dsire_program_id:5410)
  - matched: Opportunity appears rolling or no-deadline.; Project site state IA matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Modified Accelerated Cost-Recovery System (MACRS) (SOURCE_DSIRE:dsire_program_id:676)
  - matched: Opportunity appears rolling or no-deadline.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Alliant Energy Interstate Power and Light - Commercial and Industrial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:4971)
  - matched: Opportunity appears active.; Project site state IA matches opportunity geography.; Self-reported utility matches Alliant Energy / Interstate Power and Light.
- eligible / 100: Office of Indian Energy Policy and Programs - Funding Opportunities (SOURCE_DSIRE:dsire_program_id:918)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Alternative Fuel Vehicle Refueling Property Tax Credit (Corporate) (SOURCE_DSIRE:dsire_program_id:22474)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.

Common next questions:

Common unresolved requirements among promising matches:

Retrofit types inferred from promising matches:
- Biomass / biogas energy system: 3
- Ground-source / geothermal heat pump: 3
- EV charger installation: 2
- High-efficiency HVAC replacement: 2
- LED lighting retrofit: 2
- Air sealing / weatherization: 1
- Anti-sweat heater controls: 1
- Combined heat and power system: 1

Common blockers across rejected/unavailable opportunities:
- User site or facility type (industrial_manufacturing) does not match broad_residential eligibility.: 552
- User site or facility type (industrial_manufacturing) does not match broad_commercial eligibility.: 362
- Project site state IA does not match opportunity geography CA.: 176
- Project site state IA does not match opportunity geography MN.: 110
- Opportunity appears residential-only and the user profile is nonresidential.: 98

### austin-central-library

Municipal public library in Austin Energy territory with civic, cafe, parking, IT, and event loads.

Normalized profile:
```json
{
  "organizationTypes": [
    "government"
  ],
  "stateCode": "TX",
  "zip5": "78701",
  "utility": {
    "selfReportedName": "Austin Energy",
    "distributionUtilityId": "UTIL_AUSTIN_ENERGY",
    "territoryCandidates": [
      "UTIL_AUSTIN_ENERGY"
    ],
    "verificationStatus": "self_reported_unverified",
    "customerClass": null
  },
  "ownershipRelationship": "owner",
  "buildingTypes": [
    "public_institutional"
  ],
  "squareFootage": {
    "value": 198210,
    "raw": "198,210",
    "parsingStatus": "parsed"
  }
}
```

Status counts:
```json
{
  "eligible": 5,
  "ineligible": 1702
}
```

Eligible matches:
- eligible / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Austin Energy - Home Energy Savings Rebate Program (SOURCE_DSIRE:dsire_program_id:2011)
  - matched: Opportunity appears active.; Project site state TX matches opportunity geography.; Self-reported utility matches Austin Energy.
- eligible / 100: Modified Accelerated Cost-Recovery System (MACRS) (SOURCE_DSIRE:dsire_program_id:676)
  - matched: Opportunity appears rolling or no-deadline.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Light-Duty Motor Vehicle Purchase or Lease Incentive Program (SOURCE_DSIRE:dsire_program_id:22241)
  - matched: Opportunity appears active.; Project site state TX matches opportunity geography.; No utility restriction was found after source review.
- eligible / 100: Alternative Fuel Vehicle Refueling Property Tax Credit (Corporate) (SOURCE_DSIRE:dsire_program_id:22474)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.

Common next questions:

Common unresolved requirements among promising matches:

Retrofit types inferred from promising matches:
- Biomass / biogas energy system: 2
- Ground-source / geothermal heat pump: 2
- High-efficiency HVAC replacement: 2
- Air sealing / weatherization: 1
- Automated demand response controls: 1
- Combined heat and power system: 1
- Duct sealing and duct insulation: 1
- EV charger installation: 1

Common blockers across rejected/unavailable opportunities:
- User site or facility type (public_institutional) does not match broad_residential eligibility.: 552
- User site or facility type (public_institutional) does not match broad_commercial eligibility.: 362
- Project site state TX does not match opportunity geography CA.: 176
- Project site state TX does not match opportunity geography MN.: 110
- Opportunity appears residential-only and the user profile is nonresidential.: 98

### uw-madison-main-campus

Large public university campus with labs, residence halls, dining, athletics, and district energy complexity.

Normalized profile:
```json
{
  "organizationTypes": [
    "government"
  ],
  "stateCode": "WI",
  "zip5": "53706",
  "utility": {
    "selfReportedName": "Madison Gas and Electric",
    "distributionUtilityId": "UTIL_MGE",
    "territoryCandidates": [
      "UTIL_MGE"
    ],
    "verificationStatus": "self_reported_unverified",
    "customerClass": null
  },
  "ownershipRelationship": "owner",
  "buildingTypes": [
    "education_campus"
  ],
  "squareFootage": {
    "value": 17000000,
    "raw": "17,000,000",
    "parsingStatus": "parsed"
  }
}
```

Status counts:
```json
{
  "eligible": 9,
  "ineligible": 1698
}
```

Eligible matches:
- eligible / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Biogas, Solar, and Wind Energy Equipment Exemption (SOURCE_DSIRE:dsire_program_id:178)
  - matched: Opportunity appears rolling or no-deadline.; Project site state WI matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Madison Gas & Electric - Electric Vehicle Charger Leasing Program (SOURCE_DSIRE:dsire_program_id:22363)
  - matched: Opportunity appears active.; Project site state WI matches opportunity geography.; Self-reported utility matches Madison Gas and Electric.
- eligible / 100: Low Income Home Energy Assistance Program (LIHEAP) (SOURCE_DSIRE:dsire_program_id:5712)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Local Option - Energy-Efficiency Improvement Loans (SOURCE_DSIRE:dsire_program_id:3538)
  - matched: Opportunity appears rolling or no-deadline.; Project site state WI matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Renewable Energy Sales Tax Exemptions (SOURCE_DSIRE:dsire_program_id:3223)
  - matched: Opportunity appears active.; Project site state WI matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Modified Accelerated Cost-Recovery System (MACRS) (SOURCE_DSIRE:dsire_program_id:676)
  - matched: Opportunity appears rolling or no-deadline.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Alternative Fuel Vehicle Refueling Property Tax Credit (Corporate) (SOURCE_DSIRE:dsire_program_id:22474)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Energy Innovation Grant Program (SOURCE_DSIRE:dsire_program_id:22074)
  - matched: Opportunity appears active.; Project site state WI matches opportunity geography.; Utility provider is not applicable to this opportunity.

Common next questions:

Common unresolved requirements among promising matches:

Retrofit types inferred from promising matches:
- Battery storage system: 4
- Biomass / biogas energy system: 4
- EV charger installation: 2
- Ground-source / geothermal heat pump: 2
- Solar water heating system: 2
- Air sealing / weatherization: 1
- Combined heat and power system: 1
- High-efficiency HVAC replacement: 1

Common blockers across rejected/unavailable opportunities:
- User site or facility type (education_campus) does not match broad_residential eligibility.: 552
- User site or facility type (education_campus) does not match broad_commercial eligibility.: 362
- Project site state WI does not match opportunity geography CA.: 176
- Project site state WI does not match opportunity geography MN.: 110
- Opportunity appears residential-only and the user profile is nonresidential.: 98

### boston-latin-school

Large urban public school in Boston with IAQ-sensitive HVAC, cafeteria, gym, and auditorium loads.

Normalized profile:
```json
{
  "organizationTypes": [
    "government"
  ],
  "stateCode": "MA",
  "zip5": "02115",
  "utility": {
    "selfReportedName": "Eversource",
    "distributionUtilityId": "UTIL_EVERSOURCE",
    "territoryCandidates": [
      "UTIL_EVERSOURCE"
    ],
    "verificationStatus": "self_reported_unverified",
    "customerClass": null
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
```

Status counts:
```json
{
  "eligible": 15,
  "ineligible": 1692
}
```

Eligible matches:
- eligible / 100: PACE Massachusetts Financing (SOURCE_DSIRE:dsire_program_id:22037)
  - matched: Opportunity appears active.; Project site state MA matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: MOR-EV Trucks Program (SOURCE_DSIRE:dsire_program_id:22191)
  - matched: Opportunity appears active.; Project site state MA matches opportunity geography.; No utility restriction was found after source review.
- eligible / 100: Excise Tax Exemption for Solar or Wind Powered Systems (SOURCE_DSIRE:dsire_program_id:147)
  - matched: Opportunity appears active.; Project site state MA matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Renewable Energy Property Tax Exemption (SOURCE_DSIRE:dsire_program_id:146)
  - matched: Opportunity appears active.; Project site state MA matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: MassEVIP Public Access Charging (PAC) Program (SOURCE_DSIRE:dsire_program_id:22187)
  - matched: Opportunity appears rolling or no-deadline.; Project site state MA matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Low Income Home Energy Assistance Program (LIHEAP) (SOURCE_DSIRE:dsire_program_id:5712)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: MassEVIP Fleets Charging Program (SOURCE_DSIRE:dsire_program_id:22185)
  - matched: Opportunity appears rolling or no-deadline.; Project site state MA matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: MassEVIP Workplace and Fleet Charging Program (SOURCE_DSIRE:dsire_program_id:22186)
  - matched: Opportunity appears rolling or no-deadline.; Project site state MA matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Excise Tax Deduction for Solar or Wind Powered Systems (SOURCE_DSIRE:dsire_program_id:148)
  - matched: Opportunity appears active.; Project site state MA matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Modified Accelerated Cost-Recovery System (MACRS) (SOURCE_DSIRE:dsire_program_id:676)
  - matched: Opportunity appears rolling or no-deadline.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Alternative Fuel Vehicle Refueling Property Tax Credit (Corporate) (SOURCE_DSIRE:dsire_program_id:22474)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.

Common next questions:

Common unresolved requirements among promising matches:

Retrofit types inferred from promising matches:
- EV charger installation: 6
- Solar water heating system: 4
- Battery storage system: 3
- Level 2 EV charger installation: 3
- Biomass / biogas energy system: 2
- Fuel cell system: 2
- Ground-source / geothermal heat pump: 2
- Air sealing / weatherization: 1

Common blockers across rejected/unavailable opportunities:
- User site or facility type (education_campus) does not match broad_residential eligibility.: 552
- User site or facility type (education_campus) does not match broad_commercial eligibility.: 362
- Project site state MA does not match opportunity geography CA.: 176
- Project site state MA does not match opportunity geography MN.: 110
- Opportunity appears residential-only and the user profile is nonresidential.: 98

### uaf-akasofu-building

Fairbanks public university research building in cooperative electric territory with cold-climate resilience.

Normalized profile:
```json
{
  "organizationTypes": [
    "government"
  ],
  "stateCode": "AK",
  "zip5": "99775",
  "utility": {
    "selfReportedName": "Golden Valley Electric Association",
    "distributionUtilityId": "UTIL_GVEA",
    "territoryCandidates": [
      "UTIL_GVEA"
    ],
    "verificationStatus": "self_reported_unverified",
    "customerClass": null
  },
  "ownershipRelationship": "owner",
  "buildingTypes": [
    "education_campus"
  ],
  "squareFootage": {
    "value": 100000,
    "raw": "100,000",
    "parsingStatus": "parsed"
  }
}
```

Status counts:
```json
{
  "eligible": 10,
  "ineligible": 1697
}
```

Eligible matches:
- eligible / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Local Option - Property Tax Exemption for Renewable Energy Systems (SOURCE_DSIRE:dsire_program_id:4449)
  - matched: Opportunity appears active.; Project site state AK matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Power Project Loan Fund (SOURCE_DSIRE:dsire_program_id:115)
  - matched: Opportunity appears active.; Project site state AK matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Low Income Home Energy Assistance Program (LIHEAP) (SOURCE_DSIRE:dsire_program_id:5712)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Energy Efficiency Interest Rate Reduction Program (SOURCE_DSIRE:dsire_program_id:1497)
  - matched: Opportunity appears active.; Project site state AK matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Modified Accelerated Cost-Recovery System (MACRS) (SOURCE_DSIRE:dsire_program_id:676)
  - matched: Opportunity appears rolling or no-deadline.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Alternative Fuel Vehicle Refueling Property Tax Credit (Corporate) (SOURCE_DSIRE:dsire_program_id:22474)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Alaska - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program (SOURCE_DSIRE:dsire_program_id:22666)
  - matched: Opportunity appears active.; Project site state AK matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Renewable Energy Grant Program (SOURCE_DSIRE:dsire_program_id:3080)
  - matched: Opportunity appears active.; Project site state AK matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Energy Efficiency Revolving Loan Fund Program (SOURCE_DSIRE:dsire_program_id:4448)
  - matched: Opportunity appears active.; Project site state AK matches opportunity geography.; No utility restriction was found after source review.

Common next questions:

Common unresolved requirements among promising matches:

Retrofit types inferred from promising matches:
- Biomass / biogas energy system: 4
- Ground-source / geothermal heat pump: 4
- EV charger installation: 2
- LED lighting retrofit: 2
- Air sealing / weatherization: 1
- Battery storage system: 1
- Combined heat and power system: 1
- Energy audit: 1

Common blockers across rejected/unavailable opportunities:
- User site or facility type (education_campus) does not match broad_residential eligibility.: 552
- User site or facility type (education_campus) does not match broad_commercial eligibility.: 362
- Project site state AK does not match opportunity geography CA.: 176
- Project site state AK does not match opportunity geography MN.: 110
- Opportunity appears residential-only and the user profile is nonresidential.: 98

### salt-lake-public-safety-building

Salt Lake City public safety facility with net-zero, emergency operations, and updated gas utility naming.

Normalized profile:
```json
{
  "organizationTypes": [
    "government"
  ],
  "stateCode": "UT",
  "zip5": "84111",
  "utility": {
    "selfReportedName": "Rocky Mountain Power",
    "distributionUtilityId": "UTIL_ROCKY_MOUNTAIN_POWER",
    "territoryCandidates": [
      "UTIL_ROCKY_MOUNTAIN_POWER"
    ],
    "verificationStatus": "self_reported_unverified",
    "customerClass": null
  },
  "ownershipRelationship": "owner",
  "buildingTypes": [
    "public_institutional"
  ],
  "squareFootage": {
    "value": 172000,
    "raw": "172,000",
    "parsingStatus": "parsed"
  }
}
```

Status counts:
```json
{
  "eligible": 7,
  "ineligible": 1700
}
```

Eligible matches:
- eligible / 100: Rocky Mountain Power - wattsmart Business Program (SOURCE_DSIRE:dsire_program_id:2412)
  - matched: Opportunity appears active.; Project site state UT matches opportunity geography.; Self-reported utility matches Rocky Mountain Power.
- eligible / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Modified Accelerated Cost-Recovery System (MACRS) (SOURCE_DSIRE:dsire_program_id:676)
  - matched: Opportunity appears rolling or no-deadline.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Utah - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program (SOURCE_DSIRE:dsire_program_id:22661)
  - matched: Opportunity appears active.; Project site state UT matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Alternative Fuel Vehicle Refueling Property Tax Credit (Corporate) (SOURCE_DSIRE:dsire_program_id:22474)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Renewable Energy Systems Tax Credit (Personal) (SOURCE_DSIRE:dsire_program_id:83)
  - matched: Opportunity appears active.; Project site state UT matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Renewable Energy Systems Tax Credit (Corporate) (SOURCE_DSIRE:dsire_program_id:248)
  - matched: Opportunity appears active.; Project site state UT matches opportunity geography.; Utility provider is not applicable to this opportunity.

Common next questions:

Common unresolved requirements among promising matches:

Retrofit types inferred from promising matches:
- Biomass / biogas energy system: 4
- Ground-source / geothermal heat pump: 4
- High-efficiency HVAC replacement: 4
- Solar water heating system: 3
- Battery storage system: 2
- EV charger installation: 2
- LED lighting retrofit: 2
- Rooftop solar PV: 2

Common blockers across rejected/unavailable opportunities:
- User site or facility type (public_institutional) does not match broad_residential eligibility.: 552
- User site or facility type (public_institutional) does not match broad_commercial eligibility.: 362
- Project site state UT does not match opportunity geography CA.: 176
- Project site state UT does not match opportunity geography MN.: 110
- Opportunity appears residential-only and the user profile is nonresidential.: 98

### kauai-coffee-kalaheo

Kauai agricultural coffee estate and visitor center in KIUC cooperative electric territory with no piped gas assumption.

Normalized profile:
```json
{
  "organizationTypes": [
    "agricultural"
  ],
  "stateCode": "HI",
  "zip5": "96741",
  "utility": {
    "selfReportedName": "Kauai Island Utility Cooperative",
    "distributionUtilityId": "UTIL_KIUC",
    "territoryCandidates": [
      "UTIL_KIUC"
    ],
    "verificationStatus": "self_reported_unverified",
    "customerClass": null
  },
  "ownershipRelationship": "unknown",
  "buildingTypes": [
    "agricultural_facility"
  ],
  "squareFootage": {
    "value": null,
    "raw": "Unknown",
    "parsingStatus": "needs_validation"
  }
}
```

Status counts:
```json
{
  "eligible": 10,
  "ineligible": 1697
}
```

Eligible matches:
- eligible / 100: USDA - Biorefinery, Renewable Chemical, and Biobased Product Manufacturing Assistance Program (SOURCE_DSIRE:dsire_program_id:5313)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Hawaii C-PACE program (SOURCE_DSIRE:dsire_program_id:3870)
  - matched: Opportunity appears rolling or no-deadline.; Project site state HI matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: KIUC - Solar Water Heating Rebate Program (SOURCE_DSIRE:dsire_program_id:598)
  - matched: Opportunity appears active.; Project site state HI matches opportunity geography.; Self-reported utility matches Kauai Island Utility Cooperative.
- eligible / 100: Farm and Aquaculture Alternative Energy Loan (SOURCE_DSIRE:dsire_program_id:2997)
  - matched: Opportunity appears active.; Project site state HI matches opportunity geography.; No utility restriction was found after source review.
- eligible / 100: U.S. Department of Energy - Loan Guarantee Program (SOURCE_DSIRE:dsire_program_id:3071)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Modified Accelerated Cost-Recovery System (MACRS) (SOURCE_DSIRE:dsire_program_id:676)
  - matched: Opportunity appears rolling or no-deadline.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Alternative Fuel Vehicle Refueling Property Tax Credit (Corporate) (SOURCE_DSIRE:dsire_program_id:22474)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Hawaii - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program (SOURCE_DSIRE:dsire_program_id:22630)
  - matched: Opportunity appears active.; Project site state HI matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Renewable Electricity Production Tax Credit (PTC) (SOURCE_DSIRE:dsire_program_id:734)
  - matched: Opportunity appears rolling or no-deadline.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.

Common next questions:

Common unresolved requirements among promising matches:

Retrofit types inferred from promising matches:
- Biomass / biogas energy system: 4
- Ground-source / geothermal heat pump: 3
- Battery storage system: 2
- Combined heat and power system: 2
- EV charger installation: 2
- Solar water heating system: 2
- Engineering feasibility study: 1
- High-efficiency HVAC replacement: 1

Common blockers across rejected/unavailable opportunities:
- User site or facility type (agricultural_facility) does not match broad_residential eligibility.: 552
- User site or facility type (agricultural_facility) does not match broad_commercial eligibility.: 362
- Project site state HI does not match opportunity geography CA.: 176
- Project site state HI does not match opportunity geography MN.: 110
- Opportunity appears residential-only and the user profile is nonresidential.: 98

### cherokee-ww-hastings-hospital

Tribal healthcare campus in Tahlequah with municipal electric service and healthcare critical-load resilience.

Normalized profile:
```json
{
  "organizationTypes": [
    "government"
  ],
  "stateCode": "OK",
  "zip5": "74464",
  "utility": {
    "selfReportedName": "Tahlequah Public Works Authority",
    "distributionUtilityId": "UTIL_TAHLEQUAH_PWA",
    "territoryCandidates": [
      "UTIL_TAHLEQUAH_PWA"
    ],
    "verificationStatus": "self_reported_unverified",
    "customerClass": null
  },
  "ownershipRelationship": "owner",
  "buildingTypes": [
    "healthcare"
  ],
  "squareFootage": {
    "value": 469000,
    "raw": "469,000",
    "parsingStatus": "parsed"
  }
}
```

Status counts:
```json
{
  "eligible": 8,
  "ineligible": 1699
}
```

Eligible matches:
- eligible / 100: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - matched: Opportunity appears rolling or no-deadline.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: OG&E - Commercial Energy Efficiency Rebate Programs (SOURCE_DSIRE:dsire_program_id:3639)
  - matched: Opportunity appears active.; Project site state OK matches opportunity geography.; No utility restriction was found after source review.
- eligible / 100: Modified Accelerated Cost-Recovery System (MACRS) (SOURCE_DSIRE:dsire_program_id:676)
  - matched: Opportunity appears rolling or no-deadline.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Local Option - County Energy District Authority (SOURCE_DSIRE:dsire_program_id:3534)
  - matched: Opportunity appears active.; Project site state OK matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Alternative Fuel Vehicle Refueling Property Tax Credit (Corporate) (SOURCE_DSIRE:dsire_program_id:22474)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Clean-Burning Motor Vehicle Fuel Property Tax Credit - Corporate (SOURCE_DSIRE:dsire_program_id:22221)
  - matched: Opportunity appears rolling or no-deadline.; Project site state OK matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Energy-Efficient Commercial Buildings Tax Deduction (SOURCE_DSIRE:dsire_program_id:1271)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.

Common next questions:

Common unresolved requirements among promising matches:

Retrofit types inferred from promising matches:
- LED lighting retrofit: 4
- Biomass / biogas energy system: 3
- Ground-source / geothermal heat pump: 3
- High-efficiency HVAC replacement: 3
- Combined heat and power system: 2
- EV charger installation: 2
- Solar water heating system: 2
- Battery storage system: 1

Common blockers across rejected/unavailable opportunities:
- User site or facility type (healthcare) does not match broad_residential eligibility.: 552
- Project site state OK does not match opportunity geography CA.: 176
- Project site state OK does not match opportunity geography MN.: 110
- Opportunity appears residential-only and the user profile is nonresidential.: 98
- Project site state OK does not match opportunity geography CO.: 74

### organic-valley-lafarge-hq

Rural Wisconsin agricultural cooperative headquarters in electric cooperative territory with gas unknown.

Normalized profile:
```json
{
  "organizationTypes": [
    "agricultural"
  ],
  "stateCode": "WI",
  "zip5": "54639",
  "utility": {
    "selfReportedName": "Vernon Electric Cooperative",
    "distributionUtilityId": "UTIL_VERNON_ELECTRIC_COOP",
    "territoryCandidates": [
      "UTIL_VERNON_ELECTRIC_COOP"
    ],
    "verificationStatus": "self_reported_unverified",
    "customerClass": null
  },
  "ownershipRelationship": "unknown",
  "buildingTypes": [
    "office_admin"
  ],
  "squareFootage": {
    "value": null,
    "raw": "Unknown",
    "parsingStatus": "needs_validation"
  }
}
```

Status counts:
```json
{
  "eligible": 11,
  "ineligible": 1696
}
```

Eligible matches:
- eligible / 100: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - matched: Opportunity appears rolling or no-deadline.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Biogas, Solar, and Wind Energy Equipment Exemption (SOURCE_DSIRE:dsire_program_id:178)
  - matched: Opportunity appears rolling or no-deadline.; Project site state WI matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Commercial Retro-Commissioning and New Construction Program (SOURCE_DSIRE:dsire_program_id:5218)
  - matched: Opportunity appears active.; Project site state WI matches opportunity geography.; No utility restriction was found after source review.
- eligible / 100: Local Option - Energy-Efficiency Improvement Loans (SOURCE_DSIRE:dsire_program_id:3538)
  - matched: Opportunity appears rolling or no-deadline.; Project site state WI matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Renewable Energy Sales Tax Exemptions (SOURCE_DSIRE:dsire_program_id:3223)
  - matched: Opportunity appears active.; Project site state WI matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Modified Accelerated Cost-Recovery System (MACRS) (SOURCE_DSIRE:dsire_program_id:676)
  - matched: Opportunity appears rolling or no-deadline.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Alternative Fuel Vehicle Refueling Property Tax Credit (Corporate) (SOURCE_DSIRE:dsire_program_id:22474)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Energy Innovation Grant Program (SOURCE_DSIRE:dsire_program_id:22074)
  - matched: Opportunity appears active.; Project site state WI matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Focus on Energy - Business Incentive Program (SOURCE_DSIRE:dsire_program_id:1292)
  - matched: Opportunity appears active.; Project site state WI matches opportunity geography.; No utility restriction was found after source review.
- eligible / 100: Energy-Efficient Commercial Buildings Tax Deduction (SOURCE_DSIRE:dsire_program_id:1271)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.

Common next questions:

Common unresolved requirements among promising matches:

Retrofit types inferred from promising matches:
- Battery storage system: 5
- Biomass / biogas energy system: 5
- Ground-source / geothermal heat pump: 3
- LED lighting retrofit: 3
- Solar water heating system: 3
- Combined heat and power system: 2
- High-efficiency HVAC replacement: 2
- EV charger installation: 1

Common blockers across rejected/unavailable opportunities:
- User site or facility type (office_admin) does not match broad_residential eligibility.: 552
- Project site state WI does not match opportunity geography CA.: 176
- Project site state WI does not match opportunity geography MN.: 110
- Opportunity appears residential-only and the user profile is nonresidential.: 98
- Project site state WI does not match opportunity geography CO.: 74

### ocracoke-school-island

Remote North Carolina island public school in Tideland EMC territory with no natural gas distribution assumption.

Normalized profile:
```json
{
  "organizationTypes": [
    "government"
  ],
  "stateCode": "NC",
  "zip5": "27960",
  "utility": {
    "selfReportedName": "Tideland Electric Membership Corporation",
    "distributionUtilityId": "UTIL_TIDELAND_EMC",
    "territoryCandidates": [
      "UTIL_TIDELAND_EMC"
    ],
    "verificationStatus": "self_reported_unverified",
    "customerClass": null
  },
  "ownershipRelationship": "owner",
  "buildingTypes": [
    "education_campus"
  ],
  "squareFootage": {
    "value": 19117,
    "raw": "19,117",
    "parsingStatus": "parsed"
  }
}
```

Status counts:
```json
{
  "eligible": 8,
  "ineligible": 1699
}
```

Eligible matches:
- eligible / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Active Solar Heating and Cooling Systems Exemption (SOURCE_DSIRE:dsire_program_id:183)
  - matched: Opportunity appears active.; Project site state NC matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Clean Fuel Advanced Technology (CFAT) Project (SOURCE_DSIRE:dsire_program_id:22215)
  - matched: Opportunity appears active.; Project site state NC matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Property Tax Abatement for Solar Electric Systems (SOURCE_DSIRE:dsire_program_id:3036)
  - matched: Opportunity appears rolling or no-deadline.; Project site state NC matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Low Income Home Energy Assistance Program (LIHEAP) (SOURCE_DSIRE:dsire_program_id:5712)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Modified Accelerated Cost-Recovery System (MACRS) (SOURCE_DSIRE:dsire_program_id:676)
  - matched: Opportunity appears rolling or no-deadline.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: South River EMC - Solar Water Heating Rebate Program (SOURCE_DSIRE:dsire_program_id:3351)
  - matched: Opportunity appears active.; Project site state NC matches opportunity geography.; No utility restriction was found after source review.
- eligible / 100: Alternative Fuel Vehicle Refueling Property Tax Credit (Corporate) (SOURCE_DSIRE:dsire_program_id:22474)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.

Common next questions:

Common unresolved requirements among promising matches:

Retrofit types inferred from promising matches:
- Biomass / biogas energy system: 2
- EV charger installation: 2
- Ground-source / geothermal heat pump: 2
- Solar water heating system: 2
- Air sealing / weatherization: 1
- Combined heat and power system: 1
- EV make-ready electrical upgrade: 1
- High-efficiency HVAC replacement: 1

Common blockers across rejected/unavailable opportunities:
- User site or facility type (education_campus) does not match broad_residential eligibility.: 552
- User site or facility type (education_campus) does not match broad_commercial eligibility.: 362
- Project site state NC does not match opportunity geography CA.: 176
- Project site state NC does not match opportunity geography MN.: 110
- Opportunity appears residential-only and the user profile is nonresidential.: 98

### ntua-fort-defiance-headquarters

Navajo Tribal Utility Authority headquarters where the applicant is also the electric distribution utility.

Normalized profile:
```json
{
  "organizationTypes": [
    "government"
  ],
  "stateCode": "AZ",
  "zip5": "86504",
  "utility": {
    "selfReportedName": "Navajo Tribal Utility Authority",
    "distributionUtilityId": "UTIL_NTUA",
    "territoryCandidates": [
      "UTIL_NTUA"
    ],
    "verificationStatus": "self_reported_unverified",
    "customerClass": null
  },
  "ownershipRelationship": "owner",
  "buildingTypes": [
    "office_admin"
  ],
  "squareFootage": {
    "value": null,
    "raw": "Unknown",
    "parsingStatus": "needs_validation"
  }
}
```

Status counts:
```json
{
  "eligible": 8,
  "ineligible": 1699
}
```

Eligible matches:
- eligible / 100: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - matched: Opportunity appears rolling or no-deadline.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Energy Equipment Property Tax Exemption (SOURCE_DSIRE:dsire_program_id:1683)
  - matched: Opportunity appears rolling or no-deadline.; Project site state AZ matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: APS - Energy Efficiency Solutions for Business (SOURCE_DSIRE:dsire_program_id:2458)
  - matched: Opportunity appears active.; Project site state AZ matches opportunity geography.; No utility restriction was found after source review.
- eligible / 100: Solar and Wind Equipment Sales Tax Exemption (SOURCE_DSIRE:dsire_program_id:119)
  - matched: Opportunity appears rolling or no-deadline.; Project site state AZ matches opportunity geography.; Utility provider is not applicable to this opportunity.
- eligible / 100: Modified Accelerated Cost-Recovery System (MACRS) (SOURCE_DSIRE:dsire_program_id:676)
  - matched: Opportunity appears rolling or no-deadline.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Alternative Fuel Vehicle Refueling Property Tax Credit (Corporate) (SOURCE_DSIRE:dsire_program_id:22474)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.
- eligible / 100: Energy-Efficient Commercial Buildings Tax Deduction (SOURCE_DSIRE:dsire_program_id:1271)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Utility provider is not applicable to this opportunity.

Common next questions:

Common unresolved requirements among promising matches:

Retrofit types inferred from promising matches:
- Biomass / biogas energy system: 4
- Ground-source / geothermal heat pump: 4
- LED lighting retrofit: 4
- Combined heat and power system: 3
- High-efficiency HVAC replacement: 3
- Solar water heating system: 3
- Battery storage system: 1
- EV charger installation: 1

Common blockers across rejected/unavailable opportunities:
- User site or facility type (office_admin) does not match broad_residential eligibility.: 552
- Project site state AZ does not match opportunity geography CA.: 176
- Project site state AZ does not match opportunity geography MN.: 110
- Opportunity appears residential-only and the user profile is nonresidential.: 98
- Project site state AZ does not match opportunity geography CO.: 74

## Immediate Iteration Targets

1. Improve utility resolution for `Other / Not sure` users by geocoding and service-territory lookup instead of relying on the current form option.
2. Split offer-level sectors/technologies more carefully for DSIRE parameter sets to reduce residential/commercial leakage.
3. Re-run availability review daily so hidden upcoming opportunities automatically re-enter matching once source evidence classifies them as active or rolling.
4. Add a small hand-reviewed truth fixture for the top 20 matches per sample user; this is the realistic way to approach exhaustive validation without pretending all pairings were manually adjudicated.
