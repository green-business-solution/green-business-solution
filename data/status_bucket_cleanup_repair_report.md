# Status Bucket Cleanup Repair Report

Generated: 2026-06-26T23:27:30.942Z
DynamoDB writes: yes

## Repair Standard

- Visible admin sample matching should only publish `eligible_active` and `ineligible` statuses.
- Resolve `likely_eligible` by repairing the specific unknown canonical field, not by hiding the status in the UI.
- If an opportunity is a duplicate generic update row or informational page rather than a matchable incentive/advisory/financing record, archive it with a lifecycle reason.
- If an official source is blocked, rate-limited, times out, or returns HTTP 403/429/5xx, wait for the retry window, retry, and use alternate official or program-partner sources before accepting an unresolved repair.
- Keep `upcoming` records hidden and unarchived unless the record is also duplicate, non-matchable, or low-information.

## Availability Repairs

- GoGreen Financing (SOURCE_SDGE_BUSINESS:program_url:gogreenfinancing_com_sdge)
  - status: active
  - evidence: GoGreen Business and SDG&E source pages present financing in current tense for eligible business clean-energy, EV-charging, and efficiency upgrades.
  - sources: https://gogreenfinancing.com/SDGE, https://gogreenfinancing.com/business, https://www.treasurer.ca.gov/caeatfa/cheef/sblp/index.asp
- Power Your Drive for Fleets (SOURCE_SDGE_BUSINESS:program_url:sdge_com_node_15131)
  - status: active
  - evidence: SDG&E's current Power Your Drive for Fleets page includes application language and states that SDG&E customers operating medium- and heavy-duty vehicles are eligible in SDG&E service territory.
  - sources: https://www.sdge.com/business/electric-vehicles/power-your-drive-for-fleets, https://www.sdge.com/node/15131
- SMART Industrials (SOURCE_SDGE_BUSINESS:program_url:sdsmartindustrials_com)
  - status: upcoming
  - evidence: SMART Industrials states that Strategic Energy Management is not accepting new participants and that the program is 100% subscribed for incentives in 2026, with possible additional availability in 2027.
  - sources: https://www.sdsmartindustrials.com/
- Transportation Electrification Advisory Services (TEAS) (SOURCE_SDGE_BUSINESS:program_url:teas_sdge_com)
  - status: active
  - evidence: TEAS is presented as an active SDG&E advisory service for fleet electrification planning, with the current site inviting business users to work with an SDG&E advisor.
  - sources: https://teas.sdge.com/, https://www.sdge.com/business/electric-vehicles/lovelectric

## Utility Repairs

- EmPower New York (SOURCE_DSIRE:dsire_program_id:2324)
  - status: none_found_after_review
  - required utilities: none
  - evidence: NYSERDA EmPower+ eligibility is based on household income, property/renter status, landlord approval for rentals, and New York geography; no electric distribution utility gate was found after reviewing NYSERDA and DSIRE sources.
  - sources: https://programs.dsireusa.org/system/program/detail/2324/empower-new-york, https://www.nyserda.ny.gov/All-Programs/EmPower-New-York-Program
- City and County of Denver - All-Electric New Construction Rebates (SOURCE_DSIRE:dsire_program_id:22758)
  - status: none_found_after_review
  - required utilities: none
  - evidence: Denver's building-decarbonization rebate materials describe City and County of Denver project eligibility and incentive stacking, including Xcel stacking, but do not make Xcel service a distribution-utility eligibility gate.
  - sources: https://programs.dsireusa.org/system/program/detail/22758/city-and-county-of-denver-all-electric-new-construction-rebates, https://denvergov.org/Government/Agencies-Departments-Offices/Agencies-Departments-Offices-Directory/Climate-Action-Sustainability-and-Resiliency/Cutting-Denvers-Carbon-Pollution/Efficient-Commercial-Buildings/Rebates-for-Building-Decarbonization
- Green Infrastructure Bonds (SOURCE_DSIRE:dsire_program_id:5437)
  - status: required
  - required utilities: UTIL_HAWAIIAN_ELECTRIC, Hawaiian Electric Companies
  - evidence: Hawaii GEM$/Green Infrastructure financing is repaid through the electric bill and applies to eligible Hawaiian Electric Companies customers, so the customer's electric utility relationship is a real gate.
  - sources: https://programs.dsireusa.org/system/program/detail/5437/green-infrastructure-bonds, https://gems.hawaii.gov/, https://gems.hawaii.gov/participating-contractors/
- Green Mountain Power EV Charging Station Program (SOURCE_DSIRE:dsire_program_id:22404)
  - status: required
  - required utilities: UTIL_GMP, Green Mountain Power
  - evidence: Green Mountain Power's EV charger program is a GMP customer program and requires the charger/account relationship to be with Green Mountain Power.
  - sources: https://programs.dsireusa.org/system/program/detail/22404/green-mountain-power-ev-charging-station-program, https://greenmountainpower.com/rebates-programs/electric-vehicles/in-home-ev-charger/
- Electric Vehicle Fast-Charging Plazas Program (SOURCE_DSIRE:dsire_program_id:22160)
  - status: none_found_after_review
  - required utilities: none
  - evidence: Colorado Energy Office/Drive Clean Colorado program materials describe a statewide competitive grant for DC fast-charging plazas; no electric distribution utility gate was found after retrying official and partner sources.
  - sources: https://programs.dsireusa.org/system/program/detail/22160/electric-vehicle-fast-charging-plazas-program, https://energyoffice.colorado.gov/ev-fast-charging-plazas, https://drivecleancolorado.org/dcfc-plazas-grant-application-round-open-until-december-5-2025/
- Power Project Loan Fund (SOURCE_DSIRE:dsire_program_id:115)
  - status: not_applicable
  - required utilities: none
  - evidence: Alaska's Power Project Fund lends to utilities, local governments, regional/village corporations, village councils, and independent power producers for power projects; eligibility is applicant/project based, not based on the user's distribution utility.
  - sources: https://programs.dsireusa.org/system/program/detail/115/power-project-loan-fund, https://www.akenergyauthority.org/What-We-Do/Grants-Loans/Power-Project-Fund

## Archive Repairs

- Hydrogen 101 for Fleets (SOURCE_SDGE_BUSINESS:program_url:sdge_com_node_26181)
  - archive reason: non_incentive_information_page
  - evidence: The SDG&E Hydrogen 101 page is an informational fleet education page, not a clean current rebate, loan, grant, or advisory incentive record for matching.
  - sources: https://www.sdge.com/node/26181, https://www.sdge.com/business/electric-vehicles/lovelectric
- Colorado - Home Electrification and Appliance Rebate (HEAR) Program (SOURCE_DSIRE:dsire_program_code_title_hash:CO78F:4ce622607633)
  - archive reason: low_information_duplicate_update_record
  - evidence: This row points only to the generic DSIRE program listing and contains an update note. The matchable Colorado HEAR detail record is SOURCE_DSIRE:dsire_program_id:22718.
  - sources: https://programs.dsireusa.org/system/program, https://programs.dsireusa.org/system/program/detail/22718/colorado-home-electrification-and-appliance-rebate-hear-program

## Updated Status Counts

Utility restriction reviews:

```json
{
  "required": 1156,
  "not_applicable": 505,
  "none_found_after_review": 205,
  "unknown": 57,
  "none": 173
}
```

Availability reviews:

```json
{
  "active": 13,
  "rolling": 1,
  "unavailable": 1,
  "upcoming": 1
}
```

