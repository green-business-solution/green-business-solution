# Opportunity Incentive Rule Repair Report

Generated: 2026-06-28T21:42:37.869Z
Targets reviewed: 1058
Rules generated: 125
Manual repair targets: 933

## Rule Extraction Counts

```json
{
  "source_url_fetch": 125
}
```

## Rule Confidence Counts

```json
{
  "medium": 102,
  "high": 22,
  "low": 1
}
```

## Gap Reason Counts

```json
{
  "formula_not_found_in_source_text": 767,
  "source_text_unavailable": 166
}
```

## Notes

- Rules are generated only when deterministic source text contains an extractable amount, rate, percentage, or cap.
- Manual repair targets should be researched with official program documents before they are shown as customer-facing one-time savings.
- Broad programs with measure-specific tables often need manual or LLM-assisted extraction because one opportunity can contain many rates.

## First Manual Repair Targets

- NextZero EV Charger Program (SOURCE_DSIRE:dsire_program_id:22328)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://nextzero.org/
- OTEC - Agricultural Energy Efficiency Rebate Programs (SOURCE_DSIRE:dsire_program_id:3136)
  - reason: source_text_unavailable; method: per_unit; source: https://www.directefficiency.com/otec-rebates/
- Consumers Energy (Gas) - Residential Energy Efficiency Program (SOURCE_DSIRE:dsire_program_id:4300)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: https://www.consumersenergy.com/residential/save-money-and-energy/rebates
- Duke Energy Indiana Off-Peak Charging Credit (SOURCE_DSIRE:dsire_program_id:22551)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.duke-energy.com/home/products/ev-complete/off-peak-credit
- Illinois - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program (SOURCE_DSIRE:dsire_program_id:22643)
  - reason: formula_not_found_in_source_text; method: grant_amount; source: https://idot.illinois.gov/transportation-system/environment/drive-electric.html
- Minnesota Energy Resources (Gas) - Home Energy Excellence Program for Builders or Homeowners (SOURCE_DSIRE:dsire_program_id:3312)
  - reason: formula_not_found_in_source_text; method: per_unit; source: http://www.minnesotaenergyresources.com/home/homeenergy.aspx
- Oregon Clean Vehicle Rebate Program (SOURCE_DSIRE:dsire_program_id:22224)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.oregon.gov/deq/aq/programs/Pages/ZEV-Rebate.aspx
- Questar Gas - Home Builder Gas Appliance Rebate Program (SOURCE_DSIRE:dsire_program_id:4786)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.thermwise.com/builder-applications-wyoming/
- Clean Fleet EV Incentive Program (SOURCE_DSIRE:dsire_program_id:22200)
  - reason: source_text_unavailable; method: grant_amount; source: https://www.njcleanenergy.com/commercial-industrial/programs/electric-vehicle-programs
- Duke Energy Progress - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:3968)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: https://www.duke-energy.com/home/products/smart-saver
- Entergy Arkansas - Agricultural Energy Solutions Program Rebates (SOURCE_DSIRE:dsire_program_id:5532)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.entergyarkansas.com/energyefficiency/business/agricultural-solutions
- Evergy - Residential Programmable Thermostat Program (SOURCE_DSIRE:dsire_program_id:1467)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.evergy.com/ways-to-save/discounts/thermostats
- Energy Smart - Residential Energy Efficiency Rebate Program (19 Municipalities) (SOURCE_DSIRE:dsire_program_id:3947)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://mienergysmart.com/residential-programs/
- MassSAVE (Electric) - Commercial New Construction/Major Renovation Program (SOURCE_DSIRE:dsire_program_id:4791)
  - reason: formula_not_found_in_source_text; method: per_unit; source: http://www.masssave.com/en/business/incentive-programs/new-construction-renovation
- Lodi Electric Utility - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:4583)
  - reason: formula_not_found_in_source_text; method: per_unit; source: http://lodielectric.com/906/Commercial-Rebates
- Residential Energy Efficiency Rebates (Offered by 5 Utilities) (SOURCE_DSIRE:dsire_program_id:5100)
  - reason: formula_not_found_in_source_text; method: per_unit; source: http://www.brightenergysolutions.com/find-a-rebate/
- Mountain View Electric Association, Inc - Energy Efficiency Rebates Program (SOURCE_DSIRE:dsire_program_id:2103)
  - reason: source_text_unavailable; method: per_unit; source: https://www.mvea.coop/save-energy-money/rebates/
- Residential Energy Efficiency Rebates (Offered by 12 Utilities) (SOURCE_DSIRE:dsire_program_id:5141)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.brightenergysolutions.com/find-a-rebate/
- Appalachian Power (Electric)- Non-Residential Energy Efficiency Program (SOURCE_DSIRE:dsire_program_id:5853)
  - reason: formula_not_found_in_source_text; method: per_unit; source: http://takechargeva.com/business/default.aspx
- Duke Energy (Electric) - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:3605)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: https://www.duke-energy.com/home/products/smart-saver
- Electric Vehicle Fleet Fee Exemption (SOURCE_DSIRE:dsire_program_id:22174)
  - reason: source_text_unavailable; method: per_unit; source: https://www.ilga.gov/legislation/ilcs/fulltext.asp?DocName=041501200K35
- Commercial Solar Rebate Program (SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:commercial-solar-rebate-program)
  - reason: formula_not_found_in_source_text; method: per_kw; source: https://www.siliconvalleypower.com/businesses/rebates
- Alameda Municipal Power - Commercial New Construction Rebate Program (SOURCE_DSIRE:dsire_program_id:1611)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.alamedamp.com/243/New-Construction
- Gulf Power - Residential Energy Efficiency Programs (SOURCE_DSIRE:dsire_program_id:2817)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.fpl.com/save/lower-my-bill.html?=icidHT6
- Truckee Donner Public Utility District - Energy Conservation Rebate Program (SOURCE_DSIRE:dsire_program_id:1925)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.tdpud.org/customer-service/conservation
- SoCalGas - Custom Non-Residential Energy Efficiency Program (SOURCE_DSIRE:dsire_program_id:4952)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.socalgas.com/for-your-business/energy-savings/rebates-and-incentives
- Rocky Mountain Power - wattsmart Business Program (SOURCE_DSIRE:dsire_program_id:2412)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.rockymountainpower.net/savings-energy-choices/business.html
- Alameda Municipal Power - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:3357)
  - reason: formula_not_found_in_source_text; method: per_kw; source: https://www.alamedamp.com/407/Rebates-and-Incentives
- NextZero Residential Battery Rebate Program (SOURCE_DSIRE:dsire_program_id:22736)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://nextzero.org/
- Wakefield Municipal Gas & Light Department - Solar Rebate Program (SOURCE_DSIRE:dsire_program_id:22494)
  - reason: formula_not_found_in_source_text; method: per_kw; source: https://wmgld.com/residential/solar-rebate-form/
- Duquesne Light Company - Commercial and Industrial Energy Efficiency Program (SOURCE_DSIRE:dsire_program_id:3873)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.duqenergyefficiency.com/business-solutions?hsCtaTracking=c4804d28-e40a-4d93-ba28-a722391fbbc3%7Cdb4edea8-f2cd-4d44-8711-d175e436bbe5
- Grays Harbor PUD - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2478)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: https://www.ghpud.org/energy-efficiency/residential-programs/
- Delmarva - EVsmart (SOURCE_DSIRE:dsire_program_id:22319)
  - reason: source_text_unavailable; method: per_unit; source: https://www.delmarva.com/SmartEnergy/InnovationTechnology/Pages/ElectricVehicleProgramMD.aspx
- Shakopee Public Utilities - Commercial and Industrial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:1948)
  - reason: source_text_unavailable; method: per_unit; source: https://shakopeeutilities.com/business/2024-commercial-rebates/
- Brainerd Public Utilities - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:22119)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: http://bpu.org/rebates/
- Cascade Natural Gas - Commercial Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:3901)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.cngc.com/energy-efficiency/commercial-rebate-offerings/
- Sustainable Energy Utility - Commercial and Multifamily Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:22092)
  - reason: source_text_unavailable; method: per_unit; source: https://www.dcseu.com/business-rebates/lighting-instant
- Efficiency Works - Residential Energy Efficiency Rebate Program (Offered by 4 Utilities) (SOURCE_DSIRE:dsire_program_id:5798)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://efficiencyworks.org/homes/rebates/
- Mass Save (Electric) - Large Commercial Retrofit Program (SOURCE_DSIRE:dsire_program_id:4798)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.masssave.com/business/programs-and-services/deep-energy-retrofit
- La Plata Electric Association - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:3571)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.lpea.coop/rebate-programs
- River Falls Municipal Utilities - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:4194)
  - reason: formula_not_found_in_source_text; method: per_unit; source: http://www.rfmu.org/928/RFMU-Efficiency-Programs---Residential
- Central Lincoln People's Utility District - Residential Energy Efficiency Rebate Programs (SOURCE_DSIRE:dsire_program_id:3629)
  - reason: source_text_unavailable; method: per_kwh_saved; source: https://clpud.org/energy-efficiency/residential-rebate-programs/
- Public Service Company of Oklahoma Electric Car Charger Rebate (SOURCE_DSIRE:dsire_program_id:22369)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://powerforwardwithpso.com/rebate/energy-star-certified-electric-vehicle-ev-level-2-charger/?category=Appliances+%26amp%3B+Equipment&link=appliances-equipment
- Austin Energy - Commercial Energy Management Rebate Program (SOURCE_DSIRE:dsire_program_id:2013)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://savings.austinenergy.com/rebates/commercial/
- Ashland Electric Utility - Photovoltaic Rebate Program (SOURCE_DSIRE:dsire_program_id:421)
  - reason: formula_not_found_in_source_text; method: per_kw; source: https://ashlandoregon.gov/589/Solar
- Emergency Load Reduction Program (ELRP) (SOURCE_SCE_BUSINESS:sce_source_section:56574423e5e2b946:emergency-load-reduction-program-elrp)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.sce.com/business/save-costs-energy/savings-strategies/what-is-demand-response
- Colorado - Home Electrification and Appliance Rebate (HEAR) Program (SOURCE_DSIRE:dsire_program_id:22718)
  - reason: source_text_unavailable; method: per_kwh_saved; source: https://energyoffice.colorado.gov/home-energy-rebates
- Vermont Electric Coop - Heat Pump Bill Credit (SOURCE_DSIRE:dsire_program_id:22585)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://vermontelectric.coop/energy-transformation-programs
- DTE Energy (Electric) - Commercial and Industrial Energy Efficiency Program (SOURCE_DSIRE:dsire_program_id:4547)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.dteenergy.com/us/en/business/energy-efficiency/getting-started/rebate-programs/Energy-Efficiency-Programs-for-Business.html
- Salt River Project - Business EV Charger Rebate (SOURCE_DSIRE:dsire_program_id:22270)
  - reason: source_text_unavailable; method: per_unit; source: https://savewithsrpbiz.com/rebates/evcharger.aspx
