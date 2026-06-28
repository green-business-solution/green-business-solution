# Opportunity Incentive Rule Repair Report

Generated: 2026-06-28T23:07:13.061Z
Targets reviewed: 1058
Rules generated: 199
Manual repair targets: 783
Research-reviewed no-rule targets: 95

## Rule Extraction Counts

```json
{
  "source_url_fetch": 125,
  "gpt_pro_research": 74
}
```

## Rule Confidence Counts

```json
{
  "medium": 122,
  "high": 76,
  "low": 1
}
```

## Remaining Gap Reason Counts

```json
{
  "source_text_unavailable": 139,
  "formula_not_found_in_source_text": 644
}
```

## Research No-Rule Status Counts

```json
{
  "manual_review_required": 12,
  "formula_not_found": 50,
  "not_applicable_for_one_time_savings": 19,
  "unavailable": 1,
  "source_inaccessible": 13
}
```

## Applied Research Batches

```json
[
  {
    "batchId": "gpt_pro_2026-06-28_batch1",
    "appliedAt": "2026-06-28T22:32:51.325Z",
    "repairsPath": "data/opportunity_incentive_rule_research_repairs_gpt_pro_2026-06-28_batch1.json",
    "ruleCount": 28,
    "reviewedNoRuleCount": 54,
    "reviewedOpportunityCount": 75,
    "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:3838"
  },
  {
    "batchId": "gpt_pro_2026-06-28_batch2",
    "appliedAt": "2026-06-28T23:07:13.056Z",
    "repairsPath": "data/opportunity_incentive_rule_research_repairs_gpt_pro_2026-06-28_batch2.json",
    "ruleCount": 46,
    "reviewedNoRuleCount": 41,
    "reviewedOpportunityCount": 75,
    "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:22308"
  }
]
```

## Notes

- Rules are generated only when deterministic source text or GPT Pro research contains an extractable amount, rate, percentage, or cap.
- GPT Pro research repairs are stored with `extractionMethod: gpt_pro_research` and include source URLs plus short evidence text.
- Targets reviewed by GPT Pro without a safe one-time rule are moved to `researchReviewedNoRule` instead of being repeatedly sent through the same repair queue.
- Broad programs with measure-specific tables often need manual or LLM-assisted extraction because one opportunity can contain many rates.

## First Manual Repair Targets

- Georgia Power - Residential Electric Vehicle Charger Program (SOURCE_DSIRE:dsire_program_id:22308)
  - reason: source_text_unavailable; method: per_unit; source: https://www.georgiapower.com/residential/save-money-and-energy/products-programs/electric-vehicles/buying-an-ev.html
- Benton PUD -  ENERGY STAR Certified Manufactured Homes Rebate Program (SOURCE_DSIRE:dsire_program_id:4471)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.bentonpud.org/Energy-Programs/Rebates/Construction
- Princeton PUC - Commercial & Industrial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2554)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: http://www.SaveEnergyInPrinceton.com
- TVA - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:5709)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://energyright.com/residential/rebates/
- On-Farm Energy Efficiency Grant Program (SOURCE_DSIRE:dsire_program_id:3999)
  - reason: formula_not_found_in_source_text; method: grant_amount; source: https://mtassociation.org/energy/funding-for-farm-energy-projects-in-kentucky-in-2025/
- PECO Energy (Electric) - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:4040)
  - reason: source_text_unavailable; method: per_unit; source: https://www.peco.com/WaysToSave/ForYourHome/Pages/RebatesDiscounts.aspx
- TEP Business Energy Solutions (SOURCE_DSIRE:dsire_program_id:3118)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: https://www.tep.com/business-energy-solutions/commercial-program/program-process/
- City of Danville Utilities - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:4928)
  - reason: source_text_unavailable; method: per_unit; source: https://danvilleutilities.com/resources/homesave/homesave-rebate-program.html
- DTE Energy (Electric) - Residential Energy Efficiency Program (SOURCE_DSIRE:dsire_program_id:3593)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://newlook.dteenergy.com/wps/wcm/connect/dte-web/home/save-energy/residential/rebates/air+conditioning+rebates
- Duke Energy - Park and Plug Program (SOURCE_DSIRE:dsire_program_id:22305)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.duke-energy.com/home/products/park-and-plug#tab-f55b54cf-e657-4add-ae66-5c4495d5f052
- Delaware Electric Cooperative - Beat the Peak With Electric Vehicles (SOURCE_DSIRE:dsire_program_id:22304)
  - reason: source_text_unavailable; method: per_unit; source: https://www.delaware.coop/btp
- LADWP - Feed-in Tariff (FiT) Program (SOURCE_DSIRE:dsire_program_id:5685)
  - reason: formula_not_found_in_source_text; method: per_kw; source: https://www.ladwp.com/fit
- Orlando Utilities Commission - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:1780)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: https://www.ouc.com/residential/save-energy-water-money/residential-rebates-information
- The Energy Cooperative - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:1510)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://myenergycoop.com/rebate-programs/
- El Paso Electric Company - Residential Efficiency Program (SOURCE_DSIRE:dsire_program_id:3842)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.epesaver.com/residential-comprehensive/
- Intermountain Gas Company (IGC) - Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:1653)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: https://www.intgas.com/energy-efficiency_program/residential-energy-efficiency/
- NYSEG (Electric) - Small Business Lighting Retrofit Program (SOURCE_DSIRE:dsire_program_id:4306)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.nyseg.com/smartenergy/businesssolutions/smallbusinessdirectinstall
- Energy Smart - Commercial and Industrial Energy Efficiency Rebate Program (17 Municipalities) (SOURCE_DSIRE:dsire_program_id:4581)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://mienergysmart.com/cities/
- Alternative Fuel Vehicle Rebate Program (SOURCE_DSIRE:dsire_program_id:22232)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.dep.pa.gov/Citizens/GrantsLoansRebates/Alternative-Fuels-Incentive-Grant/Pages/Alternative-Fuel-Vehicles.aspx#.Vl9K83arSUk
- PECO Energy (Gas) - Residential Heating Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:3240)
  - reason: source_text_unavailable; method: per_unit; source: https://www.peco.com/WaystoSave/ForYourHome/Pages/NaturalGasRebatesCredits.aspx
- PECO Energy (Electric) - Non-Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:4052)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: https://solutions.peco-energy.com/equipment-incentives
- MidAmerican Energy - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:3508)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.midamericanenergy.com/business-discounts-and-rebates
- SMECO - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:3574)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.smeco.coop/energy-efficiency/residential-programs/
- Tax Abatement for Solar Manufacturers (SOURCE_DSIRE:dsire_program_id:381)
  - reason: formula_not_found_in_source_text; method: per_kw; source: http://dor.wa.gov/content/findtaxesandrates/bandotax
- ConEd (Gas and Electric) - Small Business Direct Install Program (SOURCE_DSIRE:dsire_program_id:5424)
  - reason: source_text_unavailable; method: per_unit; source: https://www.coned.com/en/save-money/rebates-incentives-tax-credits/rebates-incentives-tax-credits-for-commercial-industrial-buildings-customers/small-business
- Maine - Home Electrification and Appliance Rebate (HEAR) Program (SOURCE_DSIRE:dsire_program_id:22704)
  - reason: formula_not_found_in_source_text; method: grant_amount; source: https://www.efficiencymaine.com/IRA-Home-Energy-Rebates/
- Philadelphia Gas Works - Commercial and Industrial Equipment Rebate Program (SOURCE_DSIRE:dsire_program_id:5068)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://pgwenergysense.com/commercial-rebates/
- Duquesne Light Company - Residential Energy Efficiency Program (SOURCE_DSIRE:dsire_program_id:3876)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: https://duquesne.clearesult.com/
- Riverside Public Utilities - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:1896)
  - reason: formula_not_found_in_source_text; method: per_unit; source: http://www.riversidepublicutilities.com/residents/rebates.asp
- Philadelphia Gas Works - Residential and Small Business Equipment Rebate Program (SOURCE_DSIRE:dsire_program_id:4831)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://pgwenergysense.com/residential-rebates/
- National Grid (Electric) - Residential Energy Efficiency Rebate Programs (Upstate New York) (SOURCE_DSIRE:dsire_program_id:3462)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.nationalgridus.com/Upstate-NY-Home/Default
- CA Clean Fuel Reward (SOURCE_SCE_BUSINESS:sce_source_section:d049d8b8e95077d7:ca-clean-fuel-reward)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.sce.com/business/smart-energy-solar/evs-for-business
- Charge Ready Program (SOURCE_SCE_BUSINESS:sce_source_section:d049d8b8e95077d7:charge-ready-program)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.sce.com/business/smart-energy-solar/evs-for-business
- Independence Power and Light - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:3936)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.independencemo.gov/government/city-departments/power-and-light/residential-programs
- Gunnison County Electric - Electric Vehicle Rebates (SOURCE_DSIRE:dsire_program_id:22299)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.gcea.coop/ev-rebates
- Anaheim Public Utilities - Small Business Energy & Water Direct Install Program (SOURCE_DSIRE:dsire_program_id:1625)
  - reason: formula_not_found_in_source_text; method: per_unit; source: http://www.anaheim.net/965/Small-Business-Energy-Water-Direct-Insta
- Lower Valley Energy - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:4713)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: https://www.lvenergy.com/energy-efficiency/conservation-residential/
- Entergy New Orleans - Residential Energy Efficiency Program (SOURCE_DSIRE:dsire_program_id:3752)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: https://www.energysmartnola.info/residents/
- Clay Electric Cooperative, Inc - Energy Smart Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2734)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.clayelectric.com/energy-rebates-loans
- RG&E (Gas) - Commercial and Industrial Efficiency Program (SOURCE_DSIRE:dsire_program_id:4575)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.rge.com/web/rge/smartenergy/businesssolutions/commercialandindustrialrebates/commercial-and-industrial-rebate-catalogs
- Muscatine Power and Water - Commercial and Industrial Energy Efficiency Rebates (SOURCE_DSIRE:dsire_program_id:2862)
  - reason: source_text_unavailable; method: per_unit; source: https://mpw.org/rebates/#section-1-slider-commercial-lighting-and-fixtures
- Mason County PUD 3 - Commercial and Industrial Energy Rebates (SOURCE_DSIRE:dsire_program_id:2199)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.pud3.org/ways-to-save/rebates-incentives/
- Unitil (Electric) - Residential Energy Efficiency Programs (SOURCE_DSIRE:dsire_program_id:1373)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.unitil.com/ways-to-save/rebates-incentives
- Douglas Electric Cooperative - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2489)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: https://www.dec.coop/energy-efficiency/rebate-programs/
- National Grid (Electric) - Electric Vehicle Charging Station  Program (SOURCE_DSIRE:dsire_program_id:22327)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.nationalgridus.com/MA-Business/Energy-Saving-Programs/Electric-Vehicle-Charging-Station-Program
- Southwest Gas Corporation - Commercial Energy Efficient Equipment Rebate Program (SOURCE_DSIRE:dsire_program_id:3880)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.swgas.com/en/rebates-and-promotions-search-business-nevada
- College Station Utilities - Residential Energy Efficiency Rebate Programs (SOURCE_DSIRE:dsire_program_id:2029)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.cstx.gov/cms/One.aspx?portalId=12410917&pageId=13471018
- Commercial Scale Renewable Energy Grants (Commerce RI) (SOURCE_DSIRE:dsire_program_id:5362)
  - reason: formula_not_found_in_source_text; method: grant_amount; source: https://commerceri.com/renewable-energy-fund/
- Capacity Bidding Program Elect (CBP-E) (SOURCE_SCE_BUSINESS:sce_source_section:11acbe9699c17ca1:capacity-bidding-program-elect-cbp-e)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.sce.com/business/save-costs-energy/savings-strategies-for-businesses/what-is-demand-response/capacity-bidding-program-elect-aggregators
- SD Energy Edge (SOURCE_SDGE_BUSINESS:program_url:sdenergyedge_com)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.sdenergyedge.com/
