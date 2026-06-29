# Opportunity Incentive Rule Repair Report

Generated: 2026-06-29T00:35:29.427Z
Targets reviewed: 1058
Rules generated: 328
Manual repair targets: 558
Research-reviewed no-rule targets: 230

## Rule Extraction Counts

```json
{
  "source_url_fetch": 125,
  "gpt_pro_research": 203
}
```

## Rule Confidence Counts

```json
{
  "medium": 180,
  "high": 147,
  "low": 1
}
```

## Remaining Gap Reason Counts

```json
{
  "formula_not_found_in_source_text": 463,
  "source_text_unavailable": 95
}
```

## Research No-Rule Status Counts

```json
{
  "manual_review_required": 66,
  "formula_not_found": 108,
  "not_applicable_for_one_time_savings": 38,
  "unavailable": 2,
  "source_inaccessible": 16
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
  }
]
```

## Notes

- Rules are generated only when deterministic source text or GPT Pro research contains an extractable amount, rate, percentage, or cap.
- GPT Pro research repairs are stored with `extractionMethod: gpt_pro_research` and include source URLs plus short evidence text.
- Targets reviewed by GPT Pro without a safe one-time rule are moved to `researchReviewedNoRule` instead of being repeatedly sent through the same repair queue.
- Broad programs with measure-specific tables often need manual or LLM-assisted extraction because one opportunity can contain many rates.

## First Manual Repair Targets

- Preston Public Utilities - Commercial & Industrial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2553)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: http://www.SaveEnergyInPreston.com
- TXU - Commercial Energy Efficiency Program (SOURCE_DSIRE:dsire_program_id:5352)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.txu.com/en/business/medium-large-business/business-rewards.aspx
- NV Energy (Northern Nevada) - Business Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:4629)
  - reason: source_text_unavailable; method: per_unit; source: https://www.nvenergy.com/save-with-powershift/business-energy-services
- Inland Power & Light Company - Residential Energy Efficiency Rebate Programs (SOURCE_DSIRE:dsire_program_id:2320)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: https://www.inlandpower.com/residential-incentives-rebates
- California - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program (SOURCE_DSIRE:dsire_program_id:22629)
  - reason: formula_not_found_in_source_text; method: grant_amount; source: https://www.energy.ca.gov/programs-and-topics/programs/national-electric-vehicle-infrastructure-nevi-formula-program
- SRP - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:4051)
  - reason: source_text_unavailable; method: per_unit; source: https://srpnet.com/menu/savings/rebates_discounts.aspx
- Entergy Arkansas - Residential Energy Efficiency Programs (SOURCE_DSIRE:dsire_program_id:3680)
  - reason: source_text_unavailable; method: per_unit; source: https://www.entergy-arkansas.com/your_home/save_money/ee/residential-solutions/
- Georgia - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program (SOURCE_DSIRE:dsire_program_id:22635)
  - reason: source_text_unavailable; method: grant_amount; source: https://nevi-gdot.hub.arcgis.com/
- Hingham Municipal Lighting Plant Solar Rebate Program (SOURCE_DSIRE:dsire_program_id:22734)
  - reason: formula_not_found_in_source_text; method: per_kw; source: https://www.hmlp.com/rebates/solar/
- Citizens Electric Corporation - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:3985)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.cecmo.com/residential-rebates
- Tillamook County PUD - Dairy Lighting Retrofit Rebate Program (SOURCE_DSIRE:dsire_program_id:2187)
  - reason: formula_not_found_in_source_text; method: per_unit; source: http://www.tpud.org/energy-efficiency/commercial-dairy-programs/
- Plumas-Sierra REC - Commercial and Irrigation Rebate Program (SOURCE_DSIRE:dsire_program_id:22067)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.psrec.coop/energy/rebates/
- AES Indiana - Business Energy Incentives Program (SOURCE_DSIRE:dsire_program_id:4365)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: https://www.aesindiana.com/your-business
- New Prague Utilities Commission - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2548)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://smmpa.com/members/new-prague
- JEA - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:4723)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: https://www.jea.com/Ways_to_Save/Residential_Rebates/
- Xcel Energy - Agriculture, Schools and Government Incentive Program (SOURCE_DSIRE:dsire_program_id:5770)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://focusonenergy.com/Business
- Anaheim Public Utilities - EV Fleet Charger and Infrastructure Rebate (SOURCE_DSIRE:dsire_program_id:22277)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.anaheim.net/5889/EV-Fleet-Charger-Infrastructure-Rebate
- Austin Energy - Residential Solar PV Rebate Program (SOURCE_DSIRE:dsire_program_id:1088)
  - reason: formula_not_found_in_source_text; method: per_kw; source: https://austinenergy.com/green-power/solar-solutions/for-your-home
- Weatherization Program (SOURCE_DSIRE:dsire_program_id:5618)
  - reason: formula_not_found_in_source_text; method: grant_amount; source: http://www.ahfc.us/efficiency/energy-programs/weatherization/
- Florida Keys Electric Cooperative - Residential Rebate Program (SOURCE_DSIRE:dsire_program_id:5241)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://fkec.com/services/residential-rebate-program/
- Dominion Energy - Residential Solar Assisted Water Heating Rebate Program (SOURCE_DSIRE:dsire_program_id:3316)
  - reason: formula_not_found_in_source_text; method: per_kw; source: https://www.thermwise.com/appliance-applications/
- Sustainable Energy Utility - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:5399)
  - reason: source_text_unavailable; method: per_kwh_saved; source: https://www.dcseu.com/homes
- Riverland Energy Cooperative - Electric Vehicle Charging Station Rebate (SOURCE_DSIRE:dsire_program_id:22366)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.riverlandenergy.com/rebates
- New Construction Incentives (SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:new-construction-incentives)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.siliconvalleypower.com/businesses/rebates
- Santee Cooper - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:4559)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: https://www.santeecooper.com/Save-Energy-Money/For-My-Business/Index.aspx
- California Energy Design Assistance (CEDA) (SOURCE_DSIRE:dsire_program_id:1455)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://energyassistance.willdan.com/CEDA
- Plumas-Sierra REC - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2289)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: https://www.psrec.coop/energy/rebates/
- New Braunfels Utilities - Energy Efficiency and Water Conservation Rebate Programs (SOURCE_DSIRE:dsire_program_id:3630)
  - reason: formula_not_found_in_source_text; method: per_kw; source: https://www.nbutexas.com/rebates/
- Affordable Home Electrification Program (AHEP) (SOURCE_DSIRE:dsire_program_id:22775)
  - reason: source_text_unavailable; method: per_unit; source: https://www.dcseu.com/affordable-home-electrification
- Heartland REMC - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2692)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.heartlandremc.com/rebates/?rq=rebate
- Alabama Power - Make Ready Program (SOURCE_DSIRE:dsire_program_id:22546)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.alabamapower.com/business/business-customers-and-services/electric-transportation-business-programs/make-ready-program.html
- Southern Indiana Power - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2667)
  - reason: source_text_unavailable; method: per_unit; source: http://www.sinpwr.com/content/2020-residential-rebates
- Renewable Energy Tax Valuation (SOURCE_DSIRE:dsire_program_id:22798)
  - reason: formula_not_found_in_source_text; method: per_kw; source: https://tax.ri.gov/
- Jackson County REMC - Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2677)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.jacksonremc.com/energy-services/rebates/
- Multifamily Home Energy Solutions Program (SOURCE_DSIRE:dsire_program_id:5183)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: http://www.energytrust.org/programs/multifamily/
- Barron Electric Cooperative - Commercial, Industrial, and Agricultural Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:3277)
  - reason: source_text_unavailable; method: per_unit; source: https://www.barronelectric.com/2024-energy-rebates
- Unitil (Gas) - Commercial and Industrial Energy Efficiency Programs (SOURCE_DSIRE:dsire_program_id:4820)
  - reason: formula_not_found_in_source_text; method: per_unit; source: http://www.unitil.com/energy-efficiency/natural-gas-programs-rebates-assistance-for-businesses
- Wright-Hennepin Cooperative Electric Association - Non-Residential Energy Efficient Rebate Program (SOURCE_DSIRE:dsire_program_id:2250)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.whe.org/energy-savings-rebates/commercial-programs-and-rebates/commercial-rebates.html
- Anaheim Public Utilities - Residential Home Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:1614)
  - reason: formula_not_found_in_source_text; method: per_unit; source: http://anaheim.net/936/Energy-Rebates-Incentives
- SMUD - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:1916)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.smud.org/en/Rebates-and-Savings-Tips/Rebates-for-My-Home
- Orlando Utilities Commission - Efficiency Delivered® (SOURCE_DSIRE:dsire_program_id:22482)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.ouc.com/residential/save-energy-water-money/efficiency-delivered-from-ouc
- Cowlitz County PUD - Commercial and Industrial Energy Efficiency Rebate Programs (SOURCE_DSIRE:dsire_program_id:2077)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: https://www.cowlitzpud.org/commercial-efficiency-programs
- Transportation Electrification Advisory Services (TEAS) (SOURCE_SDGE_BUSINESS:program_url:teas_sdge_com)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://teas.sdge.com/
- Litchfield Public Utilities - Commercial & Industrial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2545)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: http://www.SaveEnergyInLitchfield.com
- PPL Electric Utilities - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:3854)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: https://www.pplelectricsavings.com/HomeEquipment/Products
- Washington Gas - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:4474)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: https://wgsmartsavings.com/programs-rebates/home/va
- Lansing Board of Water & Light - Residential Energy Efficiency Rebates (SOURCE_DSIRE:dsire_program_id:4755)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.lbwl.com/energysavers?availability=Homeowners
- APS - Energy Efficiency Solutions for Business (SOURCE_DSIRE:dsire_program_id:2458)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: https://www.aps.com/en/Business/Save-Money-and-Energy/Business-Solutions
- Colorado Springs Utilities - Builder Incentive Program (SOURCE_DSIRE:dsire_program_id:4220)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.csu.org/Pages/BuilderIncentiveProgram.aspx
- Home Performance with Energy Star (Existing Residential) (SOURCE_DSIRE:dsire_program_id:3581)
  - reason: source_text_unavailable; method: per_unit; source: https://www.efficiencyvermont.com/rebates/list/home-performance-with-energy-star
