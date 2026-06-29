# Opportunity Incentive Rule Repair Report

Generated: 2026-06-29T02:27:52.340Z
Targets reviewed: 1058
Rules generated: 503
Manual repair targets: 333
Research-reviewed no-rule targets: 351

## Rule Extraction Counts

```json
{
  "source_url_fetch": 125,
  "gpt_pro_research": 378
}
```

## Rule Confidence Counts

```json
{
  "medium": 253,
  "high": 249,
  "low": 1
}
```

## Remaining Gap Reason Counts

```json
{
  "formula_not_found_in_source_text": 275,
  "source_text_unavailable": 58
}
```

## Research No-Rule Status Counts

```json
{
  "manual_review_required": 111,
  "formula_not_found": 151,
  "not_applicable_for_one_time_savings": 65,
  "unavailable": 4,
  "source_inaccessible": 20
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
  },
  {
    "batchId": "gpt_pro_2026-06-28_batch3",
    "appliedAt": "2026-06-28T23:42:32.982Z",
    "repairsPath": "data/opportunity_incentive_rule_research_repairs_gpt_pro_2026-06-28_batch3.json",
    "ruleCount": 53,
    "reviewedNoRuleCount": 39,
    "reviewedOpportunityCount": 75,
    "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:2534"
  },
  {
    "batchId": "gpt_pro_2026-06-28_batch4",
    "appliedAt": "2026-06-29T00:20:07.076Z",
    "repairsPath": "data/opportunity_incentive_rule_research_repairs_gpt_pro_2026-06-28_batch4.json",
    "ruleCount": 50,
    "reviewedNoRuleCount": 40,
    "reviewedOpportunityCount": 75,
    "continueFromOpportunityId": "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-605"
  },
  {
    "batchId": "gpt_pro_2026-06-28_batch5",
    "appliedAt": "2026-06-29T00:35:29.421Z",
    "repairsPath": "data/opportunity_incentive_rule_research_repairs_gpt_pro_2026-06-28_batch5.json",
    "ruleCount": 26,
    "reviewedNoRuleCount": 56,
    "reviewedOpportunityCount": 75,
    "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:2553"
  },
  {
    "batchId": "gpt_pro_2026-06-28_batch6",
    "appliedAt": "2026-06-29T02:21:01.661Z",
    "repairsPath": "data/opportunity_incentive_rule_research_repairs_gpt_pro_2026-06-28_batch6.json",
    "ruleCount": 48,
    "reviewedNoRuleCount": 45,
    "reviewedOpportunityCount": 75,
    "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:3135"
  },
  {
    "batchId": "gpt_pro_2026-06-28_batch7",
    "appliedAt": "2026-06-29T02:27:01.604Z",
    "repairsPath": "data/opportunity_incentive_rule_research_repairs_gpt_pro_2026-06-28_batch7.json",
    "ruleCount": 67,
    "reviewedNoRuleCount": 35,
    "reviewedOpportunityCount": 75,
    "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:2590"
  },
  {
    "batchId": "gpt_pro_2026-06-28_batch8",
    "appliedAt": "2026-06-29T02:27:52.335Z",
    "repairsPath": "data/opportunity_incentive_rule_research_repairs_gpt_pro_2026-06-28_batch8.json",
    "ruleCount": 60,
    "reviewedNoRuleCount": 41,
    "reviewedOpportunityCount": 75,
    "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:22647"
  }
]
```

## Notes

- Rules are generated only when deterministic source text or GPT Pro research contains an extractable amount, rate, percentage, or cap.
- GPT Pro research repairs are stored with `extractionMethod: gpt_pro_research` and include source URLs plus short evidence text.
- Targets reviewed by GPT Pro without a safe one-time rule are moved to `researchReviewedNoRule` instead of being repeatedly sent through the same repair queue.
- Broad programs with measure-specific tables often need manual or LLM-assisted extraction because one opportunity can contain many rates.

## First Manual Repair Targets

- Michigan - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program (SOURCE_DSIRE:dsire_program_id:22647)
  - reason: formula_not_found_in_source_text; method: grant_amount; source: https://www.michigan.gov/mdot/travel/mobility/initiatives/nevi
- Lighting Rebate (SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:lighting-rebate)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.siliconvalleypower.com/businesses/rebates
- Kootenai Electric Cooperative - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:22079)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.directefficiency.com/kec-commercial-rebates/
- Pay for Performance Program (SOURCE_DSIRE:dsire_program_id:3330)
  - reason: source_text_unavailable; method: per_unit; source: https://www.njcleanenergy.com/commercial-industrial/programs/pay-performance/new-construction/new-construction
- Orlando Utilities Commission - Solar Programs (SOURCE_DSIRE:dsire_program_id:2867)
  - reason: formula_not_found_in_source_text; method: per_kw; source: https://www.ouc.com/solutions-programs/savings/rebates/solar-thermal-water-heater/
- OG&E - Residential Energy Efficiency Program (SOURCE_DSIRE:dsire_program_id:4565)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.oge.com/wps/portal/oge/save-energy/residential/heep/!ut/p/z1/04_Sj9CPykssy0xPLMnMz0vMAfIjo8ziLYwMnA08TYy8DLyATEdnCxfvQEsnYwNLE_1wVAXu3kauBo7eLi6BpgEuhp7GZvpRlOh3MiFOvwEO4GhAov2YCqLwGx-uH0VISRReN3iYoCvADIOC3NDQ0AiDTE9HRUUATRXbwg!!/dz/d5/L2dJQSE
- NV Energy (Southern Nevada) - Business Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2601)
  - reason: source_text_unavailable; method: per_unit; source: https://www.nvenergy.com/save-with-powershift/business-energy-services
- City of Tallahassee Utilities - Solar Water Heating Rebate (SOURCE_DSIRE:dsire_program_id:2847)
  - reason: formula_not_found_in_source_text; method: per_kw; source: http://www.talgov.com/you/you-products-home-solar-water-rebates.aspx
- Delta-Montrose Electric Association - Residential Weatherization Rebate Program (SOURCE_DSIRE:dsire_program_id:3580)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://dmea.com/free-home-weatherization
- Entergy Arkansas - Small Business Energy Efficiency Programs (SOURCE_DSIRE:dsire_program_id:5494)
  - reason: formula_not_found_in_source_text; method: per_unit; source: http://www.entergyarkansas.com/smallbusiness
- Duke Energy Carolinas - Non-Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:3606)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: https://www.duke-energy.com/business/products/smartsaver#tab-bd1ef7f8-8e8a-440e-b0ac-6ceb84106a07
- Electric Cargo Handling Grant Program (SOURCE_DSIRE:dsire_program_id:22228)
  - reason: source_text_unavailable; method: grant_amount; source: https://gis.dep.pa.gov/DrivingPAForward/
- Blooming Prairie Public Utilities - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2532)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: https://smmpa.com/members/blooming-prairie
- National Electric Vehicle Infrastructure (NEVI) Program (SOURCE_SDGE_BUSINESS:program_url:sdge_com_node_23891)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.sdge.com/node/23891
- Dakota Electric Association - Residential EV Charger Rebate (SOURCE_DSIRE:dsire_program_id:22334)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.dakotaelectric.com/member-services/programs-rebates/for-your-home/electric-vehicle-charging/
- Indiana Michigan Power - Commercial and Industrial Rebate Program (SOURCE_DSIRE:dsire_program_id:4618)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://electricideas.com/at-work/rebates/prescriptive-rebates/
- IID Energy - Commercial Rebate Program (SOURCE_DSIRE:dsire_program_id:3086)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.iid.com/customer-service/save-energy-and-money/your-business/custom-program
- Utah - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program (SOURCE_DSIRE:dsire_program_id:22661)
  - reason: formula_not_found_in_source_text; method: grant_amount; source: https://udotinput.utah.gov/evplan?HTTPSRedirected=true
- DTE Energy (Electric) - Charging Forward Program (SOURCE_DSIRE:dsire_program_id:22330)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://newlook.dteenergy.com/wps/wcm/connect/dte-web/home/service-request/residential/electric/pev/pev-res-charge-frwd
- Oklahoma Natural Gas - Residential Efficiency Rebates (SOURCE_DSIRE:dsire_program_id:5015)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.oklahomanaturalgas.com/save-money/rebates-and-incentives/residential-rebates
- Energize Connecticut Residential and Commercial Rebates (SOURCE_DSIRE:dsire_program_id:5737)
  - reason: source_text_unavailable; method: per_unit; source: https://energizect.com/rebates-and-incentives
- CenterPoint Energy (Gas) - Residential Energy Efficiency Rebates (SOURCE_DSIRE:dsire_program_id:3668)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: https://midwest.centerpointenergy.com/savings/oh-home
- Wright-Hennepin Cooperative Electric Association - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2249)
  - reason: source_text_unavailable; method: per_unit; source: http://www.whe.org/for-my-home/resources/rebates.html
- Consumers Power, Inc - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2475)
  - reason: formula_not_found_in_source_text; method: per_unit; source: http://www.cpi.coop/rebate/
- River Falls Municipal Utilities - Business Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:4851)
  - reason: formula_not_found_in_source_text; method: per_unit; source: http://www.rfmu.org/index.aspx?nid=710
- Minnesota Energy Resources (Gas) - New Construction Rebates (SOURCE_DSIRE:dsire_program_id:22091)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.minnesotaenergyresources.com/partners/builders/construction-rebates
- National Grid (Gas) - Commercial Energy Efficiency Rebate Programs (Upstate New York) (SOURCE_DSIRE:dsire_program_id:3018)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.nationalgridus.com/Upstate-NY-Business/Default
- Columbia Rural Electric Association - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:5765)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://columbiarea.coop/rebate-offers
- Austin Energy - Weatherization Assistance Program (SOURCE_DSIRE:dsire_program_id:2016)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: https://savings.austinenergy.com/rebates/residential/offerings/home-improvements/weatherization
- North Carolina - Home Efficiency Rebate (HER) Program (SOURCE_DSIRE:dsire_program_id:22749)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://energysavernc.org/
- Black Hills Energy (Electric) - Residential Energy Efficiency Program (SOURCE_DSIRE:dsire_program_id:4281)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: https://www.blackhillsenergy.com/efficiency-and-savings/residential-rebates/colorado-electric-residential-rebates
- Consolidated Edison - SmartCharge New York (SOURCE_DSIRE:dsire_program_id:22388)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.coned.com/en/save-money/rebates-incentives-tax-credits/rebates-incentives-tax-credits-for-residential-customers/electric-vehicle-rewards
- Norwich Public Utilities - Electric Vehicle & Charging Rebate Program (SOURCE_DSIRE:dsire_program_id:22303)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://norwichpublicutilities.com/216/Efficiency-Programs-Rebates
- Sangre De Cristo Electric Association - Energy Efficiency Credit Program (SOURCE_DSIRE:dsire_program_id:2399)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.myelectric.coop/energy-efficiency/energy-efficiency-credit-programs/
- City of Sunset Valley - PV Rebate Program (SOURCE_DSIRE:dsire_program_id:3727)
  - reason: formula_not_found_in_source_text; method: per_kw; source: https://www.sunsetvalley.gov/residents/community-programs/rebate-programs/solar-rebate-program
- PG&E - Residential Energy Savings Rebate Programs (SOURCE_DSIRE:dsire_program_id:1428)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.pge.com/en_US/residential/save-energy-money/savings-solutions-and-rebates/rebates-by-product/rebates-by-product.page
- Tacoma Power - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:3176)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.mytpu.org/ways-to-save/residential-incentives/
- Wellesley Municipal Light Plant - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:4807)
  - reason: formula_not_found_in_source_text; method: per_unit; source: http://wellesleyma.gov/799/Energy-Efficiency-Rebates
- SMUD - Commercial Electric Vehicle Incentive Program (SOURCE_DSIRE:dsire_program_id:22290)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.smud.org/en/Going-Green/Electric-Vehicles/Business
- Litchfield Public Utilities - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2544)
  - reason: formula_not_found_in_source_text; method: per_unit; source: http://www.SaveEnergyInLitchfield.com
- Central Electric Cooperative - Residential Energy Efficiency Rebate Programs (SOURCE_DSIRE:dsire_program_id:2318)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: https://www.cec.coop/customer-service/energy-efficiency/residential-programs/
- City of San Marcos - Commercial Lighting Retrofit Program (SOURCE_DSIRE:dsire_program_id:22058)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.sanmarcostx.gov/3720/Energy-Rebate-Programs
- Light-Duty Motor Vehicle Purchase or Lease Incentive Program (SOURCE_DSIRE:dsire_program_id:22241)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.tceq.texas.gov/airquality/terp/ld.html/
- MidAmerican Energy - Illinois Business Programs and Rebates (SOURCE_DSIRE:dsire_program_id:4730)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: https://www.midamericanenergy.com/il-business-rebates
- Washington - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program (SOURCE_DSIRE:dsire_program_id:22662)
  - reason: formula_not_found_in_source_text; method: grant_amount; source: https://wsdot.wa.gov/construction-planning/statewide-plans/washington-state-plan-electric-vehicle-infrastructure-deployment
- Renewable Market Adjusting Tariff (ReMAT) (SOURCE_DSIRE:dsire_program_id:5665)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.cpuc.ca.gov/industries-and-topics/electrical-energy/electric-power-procurement/rps/rps-procurement-programs/renewable-market-adjusting-tariff
- Portland General Electric (PGE) - Residential EV Charging Pilot Program (SOURCE_DSIRE:dsire_program_id:22374)
  - reason: source_text_unavailable; method: per_unit; source: https://portlandgeneral.com/energy-choices/electric-vehicles-charging/charging-your-ev/ev-charging-pilot-program-home
- New Mexico Gas Company - Commercial Efficiency Programs (SOURCE_DSIRE:dsire_program_id:4623)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: https://www.nmgco.com/en/business_energy_efficiency_savings_and_rebates
- Turlock Irrigation District - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:1926)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: https://www.tid.org/customer-service/save-energy-money/rebates/
- McMinnville Water & Light - Commercial Energy Efficiency Rebate Programs (SOURCE_DSIRE:dsire_program_id:3211)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.mc-power.com/energy-efficiency/commercial-energy-programs/
