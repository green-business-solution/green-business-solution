# Matching Review Repair Report

Generated: 2026-06-26T20:39:52.568Z
DynamoDB writes: yes

## Repair Standard

- Data repairs must resolve the canonical field when source evidence is sufficient; do not leave known-title or known-administrator utility programs as `unknown`.
- For utility-administered programs, use title, administrator, official program page, and customer/service-territory language together to set a stable utility ID or supported required utility names.
- For statewide loans, tax incentives, and agency programs with no customer-utility gate after source review, use `not_applicable` instead of `unknown`.
- For availability, use `active`, `rolling`, `upcoming`, or `unavailable` when current source evidence supports it; `uncertain` is temporary and must trigger another review.
- If a source site returns HTTP 429, HTTP 5xx, or times out, wait for the configured retry window and retry before accepting an unresolved review result.

## Utility Repairs

- Peninsula Light Company - Residential Energy Efficiency  Rebate Program (SOURCE_DSIRE:dsire_program_id:4227)
  - status: required
  - required utilities: UTIL_PENINSULA_LIGHT
  - evidence: Peninsula Light Company residential efficiency incentive pages identify PenLight energy-efficiency rebates and program requirements for existing electric-heated residences.
  - sources: https://programs.dsireusa.org/system/program/detail/4227/peninsula-light-company-residential-energy-efficiency-rebate-program, https://www.penlight.org/energy-efficiency/incentives/, https://www.penlight.org/energy-efficiency/incentives/heat-pump-incentives/
- Peninsula Light Company - Commercial Efficient Lighting  Rebate Program (SOURCE_DSIRE:dsire_program_id:4532)
  - status: required
  - required utilities: UTIL_PENINSULA_LIGHT
  - evidence: Program title and reviewed source text state that participating customers must be served by PLC commercial service.
  - sources: https://programs.dsireusa.org/system/program/detail/4532/peninsula-light-company-commercial-efficient-lighting-rebate-program, https://www.penlight.org/energy-efficiency/incentives/commercial-incentives/
- Energy Smart - Commercial and Industrial Energy Efficiency Rebate Program (17 Municipalities) (SOURCE_DSIRE:dsire_program_id:4581)
  - status: required
  - required utilities: Bay City, Charlevoix, Chelsea, Eaton Rapids, Escanaba, Harbor Springs, Hart, Lowell, Niles, Paw Paw, Petoskey, Portland, Sebewaing, South Haven, St. Louis, Sturgis, Wyandotte, Zeeland
  - evidence: DSIRE states eligible business electric customers must be served by participating utilities; Energy Smart's current cities page lists the participating municipal programs.
  - sources: https://programs.dsireusa.org/system/program/detail/4581/energy-smart-commercial-and-industrial-energy-efficiency-rebate-program-17-municipalities, https://mienergysmart.com/cities/
- NorthWestern Energy - Custom Business Efficiency Program (SOURCE_DSIRE:dsire_program_id:1655)
  - status: required
  - required utilities: UTIL_NORTHWESTERN
  - evidence: NorthWestern Energy's business rebates page says commercial electric rebates are available to NorthWestern Energy commercial electric supply customers and custom Business Partners incentives are available for electric and/or natural gas efficiency projects.
  - sources: https://programs.dsireusa.org/system/program/detail/1655/northwestern-energy-custom-business-efficiency-program, https://northwesternenergy.com/account-services/for-business/energy-efficiency-for-business/rebates-incentives, https://northwesternenergy.com/account-services/for-business/energy-efficiency-for-business/rebates-incentives/e-business-partners
- Electric Vehicle Charging Station Loan Program (SOURCE_DSIRE:dsire_program_id:22250)
  - status: not_applicable
  - required utilities: none
  - evidence: VEDA describes this as a State Infrastructure Bank financing program for public-use EV charging and natural-gas refueling stations, with eligibility based on applicant/project type rather than electric distribution utility.
  - sources: https://programs.dsireusa.org/system/program/detail/22250/electric-vehicle-charging-station-loan-program, https://www.veda.org/financing-options/vermont-commercial-financing/electric-vehicle-charging-station-loan-program/
- Electric Vehicle Rebate Program (SOURCE_DSIRE:dsire_program_id:22181)
  - status: not_applicable
  - required utilities: none
  - evidence: Efficiency Maine's EV rebate program is administered by Efficiency Maine for eligible Maine businesses, nonprofits, and organizations; reviewed terms do not gate eligibility by electric distribution utility.
  - sources: https://programs.dsireusa.org/system/program/detail/22181/electric-vehicle-rebate-program, https://www.efficiencymaine.com/electric-vehicle-incentives-for-businesses-and-organizations/
- Richland Energy Services - Energy Efficient Commercial Lighting Program (SOURCE_DSIRE:dsire_program_id:2813)
  - status: required
  - required utilities: UTIL_RICHLAND_ENERGY_SERVICES
  - evidence: Richland Energy Services says commercial and industrial projects must be served by Richland Energy Services for non-residential accounts.
  - sources: https://programs.dsireusa.org/system/program/detail/2813/richland-energy-services-energy-efficient-commercial-lighting-program, https://www.richlandwa.gov/departments/energy-services/energy-efficiency/commercial-industrial-programs
- West Penn Power SEF Commercial Loan Program (SOURCE_DSIRE:dsire_program_id:682)
  - status: required
  - required utilities: UTIL_WEST_PENN_POWER
  - evidence: West Penn Energy Fund says projects must benefit West Penn Power ratepayers and ACT 129 Energy Micro Loan applicants must attach a West Penn Power pre-approval letter.
  - sources: https://programs.dsireusa.org/system/program/detail/682/west-penn-power-sef-commercial-loan-program, https://www.westpennenergyfund.org/get-funding
- Concord Municipal Light Plant - Solar Photovoltaic Rebate Program (SOURCE_DSIRE:dsire_program_id:3728)
  - status: required
  - required utilities: UTIL_CONCORD_MLP
  - evidence: Concord's solar page identifies the CMLP Solar PV Rebate, lets CMLP issue the rebate to the electric account holder, and describes CMLP interconnection and approval steps.
  - sources: https://programs.dsireusa.org/system/program/detail/3728/concord-municipal-light-plant-solar-photovoltaic-rebate-program, https://concordma.gov/2029/Solar-Panels

## Availability Repairs

- New York City - Residential Solar Sales Tax Exemption (SOURCE_DSIRE:dsire_program_code_title_hash:NY98F:8923b34ebfda)
  - status: active
  - evidence: DSIRE currently publishes the New York City residential solar sales tax exemption, and NY Solar Map describes New York City/local sales-tax exemption availability in present tense for residential solar energy systems.
  - sources: https://programs.dsireusa.org/system/program/detail/4703/new-york-city-residential-solar-sales-tax-exemption, https://www.nysolarmap.com/financing-solar/incentives/residential/

## Updated Status Counts

Utility restriction reviews:

```json
{
  "required": 1154,
  "not_applicable": 504,
  "none_found_after_review": 202,
  "unknown": 63,
  "none": 173
}
```

Availability reviews:

```json
{
  "active": 10,
  "rolling": 1,
  "unavailable": 1
}
```

