# Sample Matching Report

Generated: 2026-06-25T23:16:09.585Z
Matcher clock: 2026-06-25T23:15:55.275Z
Opportunities evaluated: 2096
Sample users evaluated: 10
Pairings evaluated: 20960

This is a deterministic first-pass matcher audit. It is not a human-reviewed ground-truth label set yet.
The script evaluates every current opportunity against each sample profile, then reports the strongest matches and the most common unknowns/blockers.
Full JSON output: `/tmp/retrofi-sample-matching-results.json`

## Global Notes

- Hard failures are limited to explicit unavailable status/deadline, state mismatch, utility mismatch, residential-only mismatch, applicant mismatch, technology mismatch, and parsed numeric threshold failure.
- Missing utility restriction, missing building specificity, and ambiguous opportunity geography return `unknown` rather than a false rejection.
- Current form limitations are visible for municipal-utility sample users because the utility picker does not include every California municipal utility.
- This report is designed to be iterated: manually inspect top false positives/false negatives, update extraction/ontology rules, rerun.

## Sample User Results

### sample-ca-pge-cupertino-office-ev

Commercial office site in Cupertino exploring employee and fleet EV charging.

Normalized profile:
```json
{
  "organizationTypes": [
    "commercial"
  ],
  "stateCode": "CA",
  "zip5": "95014",
  "utility": {
    "selfReportedName": "PG&E",
    "distributionUtilityId": "UTIL_PGE",
    "territoryCandidates": [
      "UTIL_PGE"
    ],
    "verificationStatus": "self_reported_unverified",
    "customerClass": null
  },
  "ownershipRelationship": "tenant",
  "buildingTypes": [
    "office"
  ],
  "squareFootage": {
    "value": 12000,
    "raw": "12,000",
    "parsingStatus": "parsed"
  },
  "technologyIds": [
    "ev_charging"
  ]
}
```

Status counts:
```json
{
  "eligible_active": 0,
  "likely_eligible": 18,
  "needs_information": 0,
  "upcoming": 9,
  "manual_review": 10,
  "ineligible": 1850,
  "unavailable": 209
}
```

Top matches requiring no hard blocker:
- likely_eligible / 96: PG&E - EV Fleet Program (SOURCE_DSIRE:dsire_program_id:22283)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches PG&E.
  - unresolved: No specific eligible building type was normalized.
- likely_eligible / 87: Lodi Electric Utility - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:4583)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; Opportunity building specificity (multifamily) does not directly match the user's site type.
- likely_eligible / 87: Truckee Donner Public Utility District - Energy Conservation Rebate Program (SOURCE_DSIRE:dsire_program_id:1925)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: Alameda Municipal Power - Electric Vehicle Rebate Program (SOURCE_DSIRE:dsire_program_id:22274)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; Opportunity building specificity (multifamily) does not directly match the user's site type.
- likely_eligible / 87: Pasadena Water and Power - Commercial Charger Incentive Program (SOURCE_DSIRE:dsire_program_id:22289)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: GFO-25-607 - Clean Transportation Program Hydrogen Infrastructure Project Opportunity (HIPO) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-607)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; Opportunity building specificity (other) does not directly match the user's site type.
- likely_eligible / 87: Modesto Irrigation District - Electric Vehicle  Charger Rebate Program (SOURCE_DSIRE:dsire_program_id:22525)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; Opportunity building specificity (multifamily) does not directly match the user's site type.
- likely_eligible / 87: GFO-25-605 – Reliable Electric Charging for Eligible School-bus Sites (RECESS) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-605)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; Opportunity building specificity (other) does not directly match the user's site type.
- likely_eligible / 87: GFO-25-608 - Electric Vehicle Hub, Outreach, Messaging, and Equipment (EV HOME) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-608)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; Opportunity building specificity (other) does not directly match the user's site type.
- likely_eligible / 87: Anaheim Public Utilities - Personal Use EV Charger Rebates (SOURCE_DSIRE:dsire_program_id:22275)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: Anaheim Public Utilities - EV Fleet Charger and Infrastructure Rebate (SOURCE_DSIRE:dsire_program_id:22277)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: Pasadena Water and Power - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:1889)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; Opportunity building specificity (retail) does not directly match the user's site type.

Common next questions:
- site.utility.electric.distributionUtilityId: 26

Common unresolved requirements among promising matches:
- No explicit utility restriction was normalized.: 26
- Opportunity building specificity (other) does not directly match the user's site type.: 13
- Opportunity appears upcoming; application timing should be verified.: 9
- No specific eligible building type was normalized.: 8
- No project technology was normalized.: 7

Common blockers across rejected/unavailable opportunities:
- Opportunity appears residential-only and the user profile is nonresidential.: 451
- Selected improvements do not match opportunity technologies (energy_efficiency).: 211
- Opportunity appears unavailable or the application deadline has passed.: 209
- Selected improvements do not match opportunity technologies (solar).: 162
- Project site state CA does not match opportunity geography MN.: 86

### sample-ca-pge-mountain-view-office-hvac-led

Large Mountain View office campus evaluating HVAC, LED lighting, and building controls.

Normalized profile:
```json
{
  "organizationTypes": [
    "commercial"
  ],
  "stateCode": "CA",
  "zip5": "94043",
  "utility": {
    "selfReportedName": "PG&E",
    "distributionUtilityId": "UTIL_PGE",
    "territoryCandidates": [
      "UTIL_PGE"
    ],
    "verificationStatus": "self_reported_unverified",
    "customerClass": null
  },
  "ownershipRelationship": "property_manager",
  "buildingTypes": [
    "office"
  ],
  "squareFootage": {
    "value": 95000,
    "raw": "95,000",
    "parsingStatus": "parsed"
  },
  "technologyIds": [
    "hvac",
    "lighting",
    "building_controls"
  ]
}
```

Status counts:
```json
{
  "eligible_active": 0,
  "likely_eligible": 50,
  "needs_information": 0,
  "upcoming": 18,
  "manual_review": 11,
  "ineligible": 1808,
  "unavailable": 209
}
```

Top matches requiring no hard blocker:
- likely_eligible / 96: PG&E - Non-Residential Energy Efficiency Rebates (SOURCE_DSIRE:dsire_program_id:4899)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches PG&E.
  - unresolved: No specific eligible building type was normalized.
- likely_eligible / 96: California Energy Design Assistance (CEDA) (SOURCE_DSIRE:dsire_program_id:1455)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches PG&E.
  - unresolved: Opportunity building specificity (multifamily) does not directly match the user's site type.
- likely_eligible / 91: U.S. Department of Energy - Loan Guarantee Program (SOURCE_DSIRE:dsire_program_id:3071)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.
- likely_eligible / 91: Energy Efficiency Financing for Public Sector Projects (SOURCE_DSIRE:dsire_program_id:5131)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.
- likely_eligible / 91: USDA - Rural Energy for America Program (REAP) Energy Audit and Renewable Energy Development Assistance (EA/REDA) Program (SOURCE_DSIRE:dsire_program_id:5681)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.
- likely_eligible / 91: Turlock Irrigation District - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:22071)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.
- likely_eligible / 87: USDA - Biorefinery, Renewable Chemical, and Biobased Product Manufacturing Assistance Program (SOURCE_DSIRE:dsire_program_id:5313)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: Lodi Electric Utility - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:4583)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; Opportunity building specificity (multifamily) does not directly match the user's site type.
- likely_eligible / 87: Alameda Municipal Power - Commercial New Construction Rebate Program (SOURCE_DSIRE:dsire_program_id:1611)
  - matched: Opportunity appears rolling or no-deadline.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: Truckee Donner Public Utility District - Energy Conservation Rebate Program (SOURCE_DSIRE:dsire_program_id:1925)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: SoCalGas - Custom Non-Residential Energy Efficiency Program (SOURCE_DSIRE:dsire_program_id:4952)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: Lodi Electric Utility - Commercial and Industrial Energy Efficiency Loan Program (SOURCE_DSIRE:dsire_program_id:5854)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.

Common next questions:
- site.utility.electric.distributionUtilityId: 66

Common unresolved requirements among promising matches:
- No explicit utility restriction was normalized.: 66
- No specific eligible building type was normalized.: 30
- Opportunity building specificity (other) does not directly match the user's site type.: 21
- Opportunity appears upcoming; application timing should be verified.: 18
- No project technology was normalized.: 7

Common blockers across rejected/unavailable opportunities:
- Opportunity appears residential-only and the user profile is nonresidential.: 451
- Opportunity appears unavailable or the application deadline has passed.: 209
- Selected improvements do not match opportunity technologies (solar).: 162
- Selected improvements do not match opportunity technologies (ev_charging).: 153
- Project site state CA does not match opportunity geography MN.: 86

### sample-ca-other-burbank-studio-efficiency

Burbank studio and production facility with utility provider to be confirmed.

Normalized profile:
```json
{
  "organizationTypes": [
    "commercial"
  ],
  "stateCode": "CA",
  "zip5": "91521",
  "utility": {
    "selfReportedName": "Other / Not sure",
    "distributionUtilityId": null,
    "territoryCandidates": [],
    "verificationStatus": "unknown",
    "customerClass": null
  },
  "ownershipRelationship": "owner",
  "buildingTypes": [
    "warehouse"
  ],
  "squareFootage": {
    "value": 90000,
    "raw": "90,000",
    "parsingStatus": "parsed"
  },
  "technologyIds": [
    "hvac",
    "lighting",
    "building_controls"
  ]
}
```

Status counts:
```json
{
  "eligible_active": 0,
  "likely_eligible": 98,
  "needs_information": 0,
  "upcoming": 18,
  "manual_review": 16,
  "ineligible": 1755,
  "unavailable": 209
}
```

Top matches requiring no hard blocker:
- likely_eligible / 91: Turlock Irrigation District - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:22071)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.
- likely_eligible / 87: USDA - Biorefinery, Renewable Chemical, and Biobased Product Manufacturing Assistance Program (SOURCE_DSIRE:dsire_program_id:5313)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: PG&E - Non-Residential Energy Efficiency Rebates (SOURCE_DSIRE:dsire_program_id:4899)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: User electric distribution utility is unknown.; No specific eligible building type was normalized.
- likely_eligible / 87: Lodi Electric Utility - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:4583)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; Opportunity building specificity (multifamily) does not directly match the user's site type.
- likely_eligible / 87: Commercial Solar Rebate Program (SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:commercial-solar-rebate-program)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: User electric distribution utility is unknown.; Opportunity building specificity (other) does not directly match the user's site type.
- likely_eligible / 87: Alameda Municipal Power - Commercial New Construction Rebate Program (SOURCE_DSIRE:dsire_program_id:1611)
  - matched: Opportunity appears rolling or no-deadline.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: Truckee Donner Public Utility District - Energy Conservation Rebate Program (SOURCE_DSIRE:dsire_program_id:1925)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: SoCalGas - Custom Non-Residential Energy Efficiency Program (SOURCE_DSIRE:dsire_program_id:4952)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: Nonprofit Solar Grant (SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:nonprofit-solar-grant)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: User electric distribution utility is unknown.; Opportunity building specificity (other) does not directly match the user's site type.
- likely_eligible / 87: Lodi Electric Utility - Commercial and Industrial Energy Efficiency Loan Program (SOURCE_DSIRE:dsire_program_id:5854)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: HVAC Optimization Program (SOURCE_SCE_BUSINESS:sce_source_section:bcdeae04c5863d3b:hvac-optimization-program)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: User electric distribution utility is unknown.; Opportunity building specificity (other) does not directly match the user's site type.
- likely_eligible / 87: Emerging Technologies Grant (SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:emerging-technologies-grant)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: User electric distribution utility is unknown.; Opportunity building specificity (other) does not directly match the user's site type.

Common next questions:
- site.utility.electric.distributionUtilityId: 116

Common unresolved requirements among promising matches:
- No explicit utility restriction was normalized.: 66
- Opportunity building specificity (other) does not directly match the user's site type.: 51
- User electric distribution utility is unknown.: 50
- No specific eligible building type was normalized.: 34
- Opportunity appears upcoming; application timing should be verified.: 18

Common blockers across rejected/unavailable opportunities:
- Opportunity appears residential-only and the user profile is nonresidential.: 451
- Opportunity appears unavailable or the application deadline has passed.: 209
- Selected improvements do not match opportunity technologies (solar).: 162
- Selected improvements do not match opportunity technologies (ev_charging).: 153
- Project site state CA does not match opportunity geography MN.: 86

### sample-ca-pge-menlo-park-office-solar-ev

Menlo Park office site considering solar, battery storage, and EV charging.

Normalized profile:
```json
{
  "organizationTypes": [
    "commercial"
  ],
  "stateCode": "CA",
  "zip5": "94025",
  "utility": {
    "selfReportedName": "PG&E",
    "distributionUtilityId": "UTIL_PGE",
    "territoryCandidates": [
      "UTIL_PGE"
    ],
    "verificationStatus": "self_reported_unverified",
    "customerClass": null
  },
  "ownershipRelationship": "owner",
  "buildingTypes": [
    "office"
  ],
  "squareFootage": {
    "value": 120000,
    "raw": "120,000",
    "parsingStatus": "parsed"
  },
  "technologyIds": [
    "solar",
    "battery_storage",
    "ev_charging"
  ]
}
```

Status counts:
```json
{
  "eligible_active": 0,
  "likely_eligible": 35,
  "needs_information": 0,
  "upcoming": 12,
  "manual_review": 12,
  "ineligible": 1828,
  "unavailable": 209
}
```

Top matches requiring no hard blocker:
- likely_eligible / 96: PG&E - EV Fleet Program (SOURCE_DSIRE:dsire_program_id:22283)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches PG&E.
  - unresolved: No specific eligible building type was normalized.
- likely_eligible / 91: Energy Efficiency Financing for Public Sector Projects (SOURCE_DSIRE:dsire_program_id:5131)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.
- likely_eligible / 87: Lodi Electric Utility - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:4583)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; Opportunity building specificity (multifamily) does not directly match the user's site type.
- likely_eligible / 87: Truckee Donner Public Utility District - Energy Conservation Rebate Program (SOURCE_DSIRE:dsire_program_id:1925)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: SoCalGas - Custom Non-Residential Energy Efficiency Program (SOURCE_DSIRE:dsire_program_id:4952)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: Alameda Municipal Power - Electric Vehicle Rebate Program (SOURCE_DSIRE:dsire_program_id:22274)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; Opportunity building specificity (multifamily) does not directly match the user's site type.
- likely_eligible / 87: Pasadena Water and Power - Commercial Charger Incentive Program (SOURCE_DSIRE:dsire_program_id:22289)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: Burbank Water & Power - Energy Solutions Business Rebate Program (SOURCE_DSIRE:dsire_program_id:1630)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: GFO-25-607 - Clean Transportation Program Hydrogen Infrastructure Project Opportunity (HIPO) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-607)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; Opportunity building specificity (other) does not directly match the user's site type.
- likely_eligible / 87: Modesto Irrigation District - Electric Vehicle  Charger Rebate Program (SOURCE_DSIRE:dsire_program_id:22525)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; Opportunity building specificity (multifamily) does not directly match the user's site type.

Common next questions:
- site.utility.electric.distributionUtilityId: 46

Common unresolved requirements among promising matches:
- No explicit utility restriction was normalized.: 46
- No specific eligible building type was normalized.: 20
- Opportunity building specificity (other) does not directly match the user's site type.: 16
- Opportunity appears upcoming; application timing should be verified.: 12
- No project technology was normalized.: 7

Common blockers across rejected/unavailable opportunities:
- Opportunity appears residential-only and the user profile is nonresidential.: 451
- Selected improvements do not match opportunity technologies (energy_efficiency).: 211
- Opportunity appears unavailable or the application deadline has passed.: 209
- Project site state CA does not match opportunity geography MN.: 86
- Selected improvements do not match opportunity technologies (hvac, energy_efficiency).: 72

### sample-ca-pge-san-francisco-office-lighting-hvac

San Francisco office tenant evaluating lighting, HVAC, and controls.

Normalized profile:
```json
{
  "organizationTypes": [
    "commercial"
  ],
  "stateCode": "CA",
  "zip5": "94105",
  "utility": {
    "selfReportedName": "PG&E",
    "distributionUtilityId": "UTIL_PGE",
    "territoryCandidates": [
      "UTIL_PGE"
    ],
    "verificationStatus": "self_reported_unverified",
    "customerClass": null
  },
  "ownershipRelationship": "tenant",
  "buildingTypes": [
    "office"
  ],
  "squareFootage": {
    "value": 30000,
    "raw": "30,000",
    "parsingStatus": "parsed"
  },
  "technologyIds": [
    "lighting",
    "hvac",
    "building_controls"
  ]
}
```

Status counts:
```json
{
  "eligible_active": 0,
  "likely_eligible": 50,
  "needs_information": 0,
  "upcoming": 18,
  "manual_review": 11,
  "ineligible": 1808,
  "unavailable": 209
}
```

Top matches requiring no hard blocker:
- likely_eligible / 96: PG&E - Non-Residential Energy Efficiency Rebates (SOURCE_DSIRE:dsire_program_id:4899)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches PG&E.
  - unresolved: No specific eligible building type was normalized.
- likely_eligible / 96: California Energy Design Assistance (CEDA) (SOURCE_DSIRE:dsire_program_id:1455)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches PG&E.
  - unresolved: Opportunity building specificity (multifamily) does not directly match the user's site type.
- likely_eligible / 91: U.S. Department of Energy - Loan Guarantee Program (SOURCE_DSIRE:dsire_program_id:3071)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.
- likely_eligible / 91: Energy Efficiency Financing for Public Sector Projects (SOURCE_DSIRE:dsire_program_id:5131)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.
- likely_eligible / 91: USDA - Rural Energy for America Program (REAP) Energy Audit and Renewable Energy Development Assistance (EA/REDA) Program (SOURCE_DSIRE:dsire_program_id:5681)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.
- likely_eligible / 91: Turlock Irrigation District - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:22071)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.
- likely_eligible / 87: USDA - Biorefinery, Renewable Chemical, and Biobased Product Manufacturing Assistance Program (SOURCE_DSIRE:dsire_program_id:5313)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: Lodi Electric Utility - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:4583)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; Opportunity building specificity (multifamily) does not directly match the user's site type.
- likely_eligible / 87: Alameda Municipal Power - Commercial New Construction Rebate Program (SOURCE_DSIRE:dsire_program_id:1611)
  - matched: Opportunity appears rolling or no-deadline.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: Truckee Donner Public Utility District - Energy Conservation Rebate Program (SOURCE_DSIRE:dsire_program_id:1925)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: SoCalGas - Custom Non-Residential Energy Efficiency Program (SOURCE_DSIRE:dsire_program_id:4952)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: Lodi Electric Utility - Commercial and Industrial Energy Efficiency Loan Program (SOURCE_DSIRE:dsire_program_id:5854)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.

Common next questions:
- site.utility.electric.distributionUtilityId: 66

Common unresolved requirements among promising matches:
- No explicit utility restriction was normalized.: 66
- No specific eligible building type was normalized.: 30
- Opportunity building specificity (other) does not directly match the user's site type.: 21
- Opportunity appears upcoming; application timing should be verified.: 18
- No project technology was normalized.: 7

Common blockers across rejected/unavailable opportunities:
- Opportunity appears residential-only and the user profile is nonresidential.: 451
- Opportunity appears unavailable or the application deadline has passed.: 209
- Selected improvements do not match opportunity technologies (solar).: 162
- Selected improvements do not match opportunity technologies (ev_charging).: 153
- Project site state CA does not match opportunity geography MN.: 86

### sample-ca-svp-santa-clara-nonprofit-solar

Santa Clara nonprofit office in Silicon Valley Power territory considering solar and storage.

Normalized profile:
```json
{
  "organizationTypes": [
    "nonprofit"
  ],
  "stateCode": "CA",
  "zip5": "95051",
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
    "office"
  ],
  "squareFootage": {
    "value": 18000,
    "raw": "18,000",
    "parsingStatus": "parsed"
  },
  "technologyIds": [
    "solar",
    "battery_storage"
  ]
}
```

Status counts:
```json
{
  "eligible_active": 0,
  "likely_eligible": 19,
  "needs_information": 0,
  "upcoming": 10,
  "manual_review": 12,
  "ineligible": 1846,
  "unavailable": 209
}
```

Top matches requiring no hard blocker:
- likely_eligible / 96: Commercial Solar Rebate Program (SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:commercial-solar-rebate-program)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches Silicon Valley Power.
  - unresolved: Opportunity building specificity (other) does not directly match the user's site type.
- likely_eligible / 96: Nonprofit Solar Grant (SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:nonprofit-solar-grant)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches Silicon Valley Power.
  - unresolved: Opportunity building specificity (other) does not directly match the user's site type.
- likely_eligible / 91: Energy Efficiency Financing for Public Sector Projects (SOURCE_DSIRE:dsire_program_id:5131)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Nonresidential applicant is compatible with broad commercial eligibility.
  - unresolved: No explicit utility restriction was normalized.
- likely_eligible / 87: SoCalGas - Custom Non-Residential Energy Efficiency Program (SOURCE_DSIRE:dsire_program_id:4952)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Nonresidential applicant is compatible with broad commercial eligibility.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Applicant type overlaps eligible sector: nonprofit.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Nonresidential applicant is compatible with broad commercial eligibility.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: Burbank Water & Power - Energy Solutions Business Rebate Program (SOURCE_DSIRE:dsire_program_id:1630)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: nonprofit.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: Self-Generation Incentive Program (SOURCE_DSIRE:dsire_program_id:552)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: nonprofit.
  - unresolved: No explicit utility restriction was normalized.; Opportunity building specificity (retail) does not directly match the user's site type.
- likely_eligible / 87: GFO-25-308 - Distributed Clean Hydrogen Production with Onsite End Use (H2ONSITE) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-308)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Nonresidential applicant is compatible with broad commercial eligibility.
  - unresolved: No explicit utility restriction was normalized.; Opportunity building specificity (retail, other) does not directly match the user's site type.
- likely_eligible / 87: USDA - Rural Energy for America Program (REAP) Grants (SOURCE_DSIRE:dsire_program_id:917)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Nonresidential applicant is compatible with broad commercial eligibility.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: Local Option - Municipal Energy Districts (SOURCE_DSIRE:dsire_program_id:3527)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Nonresidential applicant is compatible with broad commercial eligibility.
  - unresolved: No explicit utility restriction was normalized.; Opportunity building specificity (medical) does not directly match the user's site type.
- likely_eligible / 87: Modified Accelerated Cost-Recovery System (MACRS) (SOURCE_DSIRE:dsire_program_id:676)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Nonresidential applicant is compatible with broad commercial eligibility.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.

Common next questions:
- site.utility.electric.distributionUtilityId: 27

Common unresolved requirements among promising matches:
- No explicit utility restriction was normalized.: 27
- No specific eligible building type was normalized.: 12
- Opportunity building specificity (other) does not directly match the user's site type.: 12
- Opportunity appears upcoming; application timing should be verified.: 10
- No project technology was normalized.: 7

Common blockers across rejected/unavailable opportunities:
- Opportunity appears residential-only and the user profile is nonresidential.: 451
- Selected improvements do not match opportunity technologies (energy_efficiency).: 211
- Opportunity appears unavailable or the application deadline has passed.: 209
- Selected improvements do not match opportunity technologies (ev_charging).: 153
- Project site state CA does not match opportunity geography MN.: 86

### sample-ca-pge-los-gatos-retail-refrigeration

Los Gatos retail market evaluating refrigeration, lighting, and HVAC.

Normalized profile:
```json
{
  "organizationTypes": [
    "commercial"
  ],
  "stateCode": "CA",
  "zip5": "95032",
  "utility": {
    "selfReportedName": "PG&E",
    "distributionUtilityId": "UTIL_PGE",
    "territoryCandidates": [
      "UTIL_PGE"
    ],
    "verificationStatus": "self_reported_unverified",
    "customerClass": null
  },
  "ownershipRelationship": "tenant",
  "buildingTypes": [
    "grocery"
  ],
  "squareFootage": {
    "value": 15000,
    "raw": "15,000",
    "parsingStatus": "parsed"
  },
  "technologyIds": [
    "refrigeration",
    "lighting",
    "hvac"
  ]
}
```

Status counts:
```json
{
  "eligible_active": 0,
  "likely_eligible": 49,
  "needs_information": 0,
  "upcoming": 17,
  "manual_review": 11,
  "ineligible": 1810,
  "unavailable": 209
}
```

Top matches requiring no hard blocker:
- likely_eligible / 96: PG&E - Non-Residential Energy Efficiency Rebates (SOURCE_DSIRE:dsire_program_id:4899)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches PG&E.
  - unresolved: No specific eligible building type was normalized.
- likely_eligible / 96: California Energy Design Assistance (CEDA) (SOURCE_DSIRE:dsire_program_id:1455)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches PG&E.
  - unresolved: Opportunity building specificity (multifamily) does not directly match the user's site type.
- likely_eligible / 87: USDA - Biorefinery, Renewable Chemical, and Biobased Product Manufacturing Assistance Program (SOURCE_DSIRE:dsire_program_id:5313)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: Lodi Electric Utility - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:4583)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; Opportunity building specificity (multifamily) does not directly match the user's site type.
- likely_eligible / 87: Alameda Municipal Power - Commercial New Construction Rebate Program (SOURCE_DSIRE:dsire_program_id:1611)
  - matched: Opportunity appears rolling or no-deadline.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: Truckee Donner Public Utility District - Energy Conservation Rebate Program (SOURCE_DSIRE:dsire_program_id:1925)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: SoCalGas - Custom Non-Residential Energy Efficiency Program (SOURCE_DSIRE:dsire_program_id:4952)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: Lodi Electric Utility - Commercial and Industrial Energy Efficiency Loan Program (SOURCE_DSIRE:dsire_program_id:5854)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: Burbank Water & Power - Business Bucks Energy Efficiency Grant Program (SOURCE_DSIRE:dsire_program_id:1631)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: City of Palo Alto Utilities - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:1684)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; Opportunity building specificity (restaurant) does not directly match the user's site type.
- likely_eligible / 87: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.

Common next questions:
- site.utility.electric.distributionUtilityId: 64

Common unresolved requirements among promising matches:
- No explicit utility restriction was normalized.: 64
- No specific eligible building type was normalized.: 29
- Opportunity building specificity (other) does not directly match the user's site type.: 20
- Opportunity appears upcoming; application timing should be verified.: 17
- No project technology was normalized.: 7

Common blockers across rejected/unavailable opportunities:
- Opportunity appears residential-only and the user profile is nonresidential.: 451
- Opportunity appears unavailable or the application deadline has passed.: 209
- Selected improvements do not match opportunity technologies (solar).: 162
- Selected improvements do not match opportunity technologies (ev_charging).: 153
- Project site state CA does not match opportunity geography MN.: 86

### sample-ca-pge-san-ramon-office-water-controls

San Ramon office campus considering water efficiency, building controls, and EV charging.

Normalized profile:
```json
{
  "organizationTypes": [
    "commercial"
  ],
  "stateCode": "CA",
  "zip5": "94583",
  "utility": {
    "selfReportedName": "PG&E",
    "distributionUtilityId": "UTIL_PGE",
    "territoryCandidates": [
      "UTIL_PGE"
    ],
    "verificationStatus": "self_reported_unverified",
    "customerClass": null
  },
  "ownershipRelationship": "property_manager",
  "buildingTypes": [
    "office"
  ],
  "squareFootage": {
    "value": 60000,
    "raw": "60,000",
    "parsingStatus": "parsed"
  },
  "technologyIds": [
    "water_efficiency",
    "building_controls",
    "ev_charging"
  ]
}
```

Status counts:
```json
{
  "eligible_active": 0,
  "likely_eligible": 61,
  "needs_information": 0,
  "upcoming": 18,
  "manual_review": 11,
  "ineligible": 1797,
  "unavailable": 209
}
```

Top matches requiring no hard blocker:
- likely_eligible / 96: PG&E - Non-Residential Energy Efficiency Rebates (SOURCE_DSIRE:dsire_program_id:4899)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches PG&E.
  - unresolved: No specific eligible building type was normalized.
- likely_eligible / 96: California Energy Design Assistance (CEDA) (SOURCE_DSIRE:dsire_program_id:1455)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches PG&E.
  - unresolved: Opportunity building specificity (multifamily) does not directly match the user's site type.
- likely_eligible / 96: PG&E - EV Fleet Program (SOURCE_DSIRE:dsire_program_id:22283)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches PG&E.
  - unresolved: No specific eligible building type was normalized.
- likely_eligible / 91: U.S. Department of Energy - Loan Guarantee Program (SOURCE_DSIRE:dsire_program_id:3071)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.
- likely_eligible / 91: Energy Efficiency Financing for Public Sector Projects (SOURCE_DSIRE:dsire_program_id:5131)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.
- likely_eligible / 91: USDA - Rural Energy for America Program (REAP) Energy Audit and Renewable Energy Development Assistance (EA/REDA) Program (SOURCE_DSIRE:dsire_program_id:5681)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.
- likely_eligible / 91: Turlock Irrigation District - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:22071)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.
- likely_eligible / 87: USDA - Biorefinery, Renewable Chemical, and Biobased Product Manufacturing Assistance Program (SOURCE_DSIRE:dsire_program_id:5313)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: Lodi Electric Utility - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:4583)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; Opportunity building specificity (multifamily) does not directly match the user's site type.
- likely_eligible / 87: Alameda Municipal Power - Commercial New Construction Rebate Program (SOURCE_DSIRE:dsire_program_id:1611)
  - matched: Opportunity appears rolling or no-deadline.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: Truckee Donner Public Utility District - Energy Conservation Rebate Program (SOURCE_DSIRE:dsire_program_id:1925)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: SoCalGas - Custom Non-Residential Energy Efficiency Program (SOURCE_DSIRE:dsire_program_id:4952)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.

Common next questions:
- site.utility.electric.distributionUtilityId: 76

Common unresolved requirements among promising matches:
- No explicit utility restriction was normalized.: 76
- No specific eligible building type was normalized.: 35
- Opportunity building specificity (other) does not directly match the user's site type.: 25
- Opportunity appears upcoming; application timing should be verified.: 18
- Opportunity building specificity (multifamily) does not directly match the user's site type.: 8

Common blockers across rejected/unavailable opportunities:
- Opportunity appears residential-only and the user profile is nonresidential.: 451
- Opportunity appears unavailable or the application deadline has passed.: 209
- Selected improvements do not match opportunity technologies (solar).: 162
- Project site state CA does not match opportunity geography MN.: 86
- Project site state CA does not match opportunity geography OR.: 60

### sample-ca-svp-santa-clara-office-solar-storage

Large Santa Clara office in Silicon Valley Power territory considering solar and battery storage.

Normalized profile:
```json
{
  "organizationTypes": [
    "commercial"
  ],
  "stateCode": "CA",
  "zip5": "95054",
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
    "office"
  ],
  "squareFootage": {
    "value": 80000,
    "raw": "80,000",
    "parsingStatus": "parsed"
  },
  "technologyIds": [
    "solar",
    "battery_storage",
    "building_controls"
  ]
}
```

Status counts:
```json
{
  "eligible_active": 1,
  "likely_eligible": 73,
  "needs_information": 0,
  "upcoming": 19,
  "manual_review": 11,
  "ineligible": 1783,
  "unavailable": 209
}
```

Top matches requiring no hard blocker:
- eligible_active / 100: HVAC System and Heat Pump Rebates (SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:hvac-system-and-heat-pump-rebates)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches Silicon Valley Power.
- likely_eligible / 96: Commercial Solar Rebate Program (SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:commercial-solar-rebate-program)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches Silicon Valley Power.
  - unresolved: Opportunity building specificity (other) does not directly match the user's site type.
- likely_eligible / 96: Nonprofit Solar Grant (SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:nonprofit-solar-grant)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches Silicon Valley Power.
  - unresolved: Opportunity building specificity (other) does not directly match the user's site type.
- likely_eligible / 96: Emerging Technologies Grant (SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:emerging-technologies-grant)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches Silicon Valley Power.
  - unresolved: Opportunity building specificity (other) does not directly match the user's site type.
- likely_eligible / 96: Building Operator Certification Training Scholarships (SOURCE_SILICON_VALLEY_POWER:svp_source_section:ef0850c0e097a7f9:building-operator-certification-training-scholarships)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches Silicon Valley Power.
  - unresolved: Opportunity building specificity (multifamily, other) does not directly match the user's site type.
- likely_eligible / 96: Multifamily Boiler Electrification Pilot Program (SOURCE_SILICON_VALLEY_POWER:svp_source_section:6849d4cc60567610:multifamily-boiler-electrification-pilot-program)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches Silicon Valley Power.
  - unresolved: Opportunity building specificity (multifamily) does not directly match the user's site type.
- likely_eligible / 96: Building Optimization Rebate (SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:building-optimization-rebate)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches Silicon Valley Power.
  - unresolved: Opportunity building specificity (other) does not directly match the user's site type.
- likely_eligible / 96: Silicon Valley Power - Emerging Technologies Grant Program (SOURCE_DSIRE:dsire_program_id:22068)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches Silicon Valley Power.
  - unresolved: No specific eligible building type was normalized.
- likely_eligible / 96: Energy Design Assistance (SOURCE_SILICON_VALLEY_POWER:svp_source_section:f69ab77394818965:energy-design-assistance)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches Silicon Valley Power.
  - unresolved: Opportunity building specificity (other) does not directly match the user's site type.
- likely_eligible / 96: Food Service Equipment Rebate Program (SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:food-service-equipment-rebate-program)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches Silicon Valley Power.
  - unresolved: Opportunity building specificity (restaurant, other) does not directly match the user's site type.
- likely_eligible / 96: Energy Efficiency Grant Program for Nonprofit Organizations (SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:energy-efficiency-grant-program-for-nonprofit-organizations)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches Silicon Valley Power.
  - unresolved: Opportunity building specificity (other) does not directly match the user's site type.
- likely_eligible / 96: Custom Measure Rebates - Heat Recovery Chillers and Heat Pump Pool Heaters (SOURCE_SILICON_VALLEY_POWER:svp_source_section:6849d4cc60567610:custom-measure-rebates-heat-recovery-chillers-and-heat-pump-pool-heaters)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches Silicon Valley Power.
  - unresolved: Opportunity building specificity (other) does not directly match the user's site type.

Common next questions:
- site.utility.electric.distributionUtilityId: 71

Common unresolved requirements among promising matches:
- No explicit utility restriction was normalized.: 71
- Opportunity building specificity (other) does not directly match the user's site type.: 38
- No specific eligible building type was normalized.: 34
- Opportunity appears upcoming; application timing should be verified.: 19
- No project technology was normalized.: 7

Common blockers across rejected/unavailable opportunities:
- Opportunity appears residential-only and the user profile is nonresidential.: 451
- Opportunity appears unavailable or the application deadline has passed.: 209
- Selected improvements do not match opportunity technologies (ev_charging).: 153
- Project site state CA does not match opportunity geography MN.: 86
- Selected improvements do not match opportunity technologies (ev_charging, fleet_electrification).: 71

### sample-ca-pge-san-jose-restaurant-kitchen

San Jose restaurant and commercial kitchen evaluating kitchen equipment and lighting.

Normalized profile:
```json
{
  "organizationTypes": [
    "commercial"
  ],
  "stateCode": "CA",
  "zip5": "95110",
  "utility": {
    "selfReportedName": "PG&E",
    "distributionUtilityId": "UTIL_PGE",
    "territoryCandidates": [
      "UTIL_PGE"
    ],
    "verificationStatus": "self_reported_unverified",
    "customerClass": null
  },
  "ownershipRelationship": "tenant",
  "buildingTypes": [
    "restaurant"
  ],
  "squareFootage": {
    "value": 8500,
    "raw": "8,500",
    "parsingStatus": "parsed"
  },
  "technologyIds": [
    "commercial_kitchen",
    "lighting"
  ]
}
```

Status counts:
```json
{
  "eligible_active": 0,
  "likely_eligible": 48,
  "needs_information": 0,
  "upcoming": 16,
  "manual_review": 10,
  "ineligible": 1813,
  "unavailable": 209
}
```

Top matches requiring no hard blocker:
- likely_eligible / 96: PG&E - Non-Residential Energy Efficiency Rebates (SOURCE_DSIRE:dsire_program_id:4899)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches PG&E.
  - unresolved: No specific eligible building type was normalized.
- likely_eligible / 96: California Energy Design Assistance (CEDA) (SOURCE_DSIRE:dsire_program_id:1455)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Self-reported utility matches PG&E.
  - unresolved: Opportunity building specificity (multifamily) does not directly match the user's site type.
- likely_eligible / 91: City of Palo Alto Utilities - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:1684)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.
- likely_eligible / 91: Pasadena Water and Power - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:3260)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.
- likely_eligible / 87: USDA - Biorefinery, Renewable Chemical, and Biobased Product Manufacturing Assistance Program (SOURCE_DSIRE:dsire_program_id:5313)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: Lodi Electric Utility - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:4583)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; Opportunity building specificity (multifamily) does not directly match the user's site type.
- likely_eligible / 87: Alameda Municipal Power - Commercial New Construction Rebate Program (SOURCE_DSIRE:dsire_program_id:1611)
  - matched: Opportunity appears rolling or no-deadline.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: Truckee Donner Public Utility District - Energy Conservation Rebate Program (SOURCE_DSIRE:dsire_program_id:1925)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: SoCalGas - Custom Non-Residential Energy Efficiency Program (SOURCE_DSIRE:dsire_program_id:4952)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: Lodi Electric Utility - Commercial and Industrial Energy Efficiency Loan Program (SOURCE_DSIRE:dsire_program_id:5854)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - matched: Opportunity appears active.; Opportunity appears nationwide.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.
- likely_eligible / 87: Burbank Water & Power - Business Bucks Energy Efficiency Grant Program (SOURCE_DSIRE:dsire_program_id:1631)
  - matched: Opportunity appears active.; Project site state CA matches opportunity geography.; Applicant type overlaps eligible sector: commercial.
  - unresolved: No explicit utility restriction was normalized.; No specific eligible building type was normalized.

Common next questions:
- site.utility.electric.distributionUtilityId: 62

Common unresolved requirements among promising matches:
- No explicit utility restriction was normalized.: 62
- No specific eligible building type was normalized.: 29
- Opportunity building specificity (other) does not directly match the user's site type.: 19
- Opportunity appears upcoming; application timing should be verified.: 16
- No project technology was normalized.: 7

Common blockers across rejected/unavailable opportunities:
- Opportunity appears residential-only and the user profile is nonresidential.: 451
- Opportunity appears unavailable or the application deadline has passed.: 209
- Selected improvements do not match opportunity technologies (solar).: 162
- Selected improvements do not match opportunity technologies (ev_charging).: 153
- Project site state CA does not match opportunity geography MN.: 86

## Immediate Iteration Targets

1. Improve utility resolution for `Other / Not sure` users by geocoding and service-territory lookup instead of relying on the current form option.
2. Split offer-level sectors/technologies more carefully for DSIRE parameter sets to reduce residential/commercial leakage.
3. Add source-specific availability handling for CEC awarded solicitations and utility pages with no explicit deadline.
4. Add a small hand-reviewed truth fixture for the top 20 matches per sample user; this is the realistic way to approach exhaustive validation without pretending all 20,960 pairings were manually adjudicated.
