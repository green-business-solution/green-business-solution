# Opportunity Incentive Rule Repair Report

Generated: 2026-06-29T00:20:07.084Z
Targets reviewed: 1058
Rules generated: 302
Manual repair targets: 633
Research-reviewed no-rule targets: 174

## Rule Extraction Counts

```json
{
  "source_url_fetch": 125,
  "gpt_pro_research": 177
}
```

## Rule Confidence Counts

```json
{
  "medium": 171,
  "high": 130,
  "low": 1
}
```

## Remaining Gap Reason Counts

```json
{
  "formula_not_found_in_source_text": 523,
  "source_text_unavailable": 110
}
```

## Research No-Rule Status Counts

```json
{
  "manual_review_required": 36,
  "formula_not_found": 89,
  "not_applicable_for_one_time_savings": 32,
  "unavailable": 2,
  "source_inaccessible": 15
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
  }
]
```

## Notes

- Rules are generated only when deterministic source text or GPT Pro research contains an extractable amount, rate, percentage, or cap.
- GPT Pro research repairs are stored with `extractionMethod: gpt_pro_research` and include source URLs plus short evidence text.
- Targets reviewed by GPT Pro without a safe one-time rule are moved to `researchReviewedNoRule` instead of being repeatedly sent through the same repair queue.
- Broad programs with measure-specific tables often need manual or LLM-assisted extraction because one opportunity can contain many rates.

## First Manual Repair Targets

- GFO-25-605 – Reliable Electric Charging for Eligible School-bus Sites (RECESS) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-605)
  - reason: formula_not_found_in_source_text; method: grant_amount; source: https://www.energy.ca.gov/solicitations/2026-04/gfo-25-605-reliable-electric-charging-eligible-school-bus-sites-recess
- Flathead Electric Cooperative - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2178)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.flatheadelectric.com/save-money-save-energy/rebates/
- Tacoma Power - Commercial and Industrial Energy Efficiency Rebate Programs (SOURCE_DSIRE:dsire_program_id:3172)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.mytpu.org/your-business/ways-to-save/rebate-forms-information.htm
- Kissimmee Utility Authority - Residential & Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:3169)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://kua.com/energy-conservation-and-renewables/kua-rebates-and-participating-contractors/
- Dixie Electric Cooperative - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:1970)
  - reason: formula_not_found_in_source_text; method: per_unit; source: http://www.dixie.coop/content.cfm?id=2049&download_id=58#attached_content
- Duke Energy Florida - Smart $aver Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:1421)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.duke-energy.com/business/products/smartsaver
- U.S. Virgin Islands - Equitable E-Mobility Rebate Program (SOURCE_DSIRE:dsire_program_id:22595)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://energy.vi.gov/eem/
- Chugach Electric - Commercial EV Charging Program (SOURCE_DSIRE:dsire_program_id:22265)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.chugachelectric.com/energy-solutions/electric-vehicles
- Monmouth Power & Light - Residential Energy Efficiency Program (SOURCE_DSIRE:dsire_program_id:3337)
  - reason: source_text_unavailable; method: per_unit; source: http://www.ci.monmouth.or.us/pview.aspx?id=4776
- Minnesota Energy Services (25 Member Cooperatives) - Residential Energy Efficiency Rebate (SOURCE_DSIRE:dsire_program_id:5143)
  - reason: formula_not_found_in_source_text; method: per_unit; source: http://www.brightenergysolutions.com/find-a-rebate/
- City of San Marcos - Distributed Generation Rebate Program (SOURCE_DSIRE:dsire_program_id:5117)
  - reason: formula_not_found_in_source_text; method: per_kw; source: https://www.sanmarcostx.gov/3720/Energy-Rebate-Programs
- Rochester Public Utilities - Residential Conserve and Save Rebate (SOURCE_DSIRE:dsire_program_id:2865)
  - reason: source_text_unavailable; method: per_kwh_saved; source: http://www.rpu.org/your-home/rebates-programs/conserve-and-save.html
- Ride Clean Mass (SOURCE_DSIRE:dsire_program_id:22733)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.ridecleanmass.org/
- Massachusetts - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program (SOURCE_DSIRE:dsire_program_id:22638)
  - reason: formula_not_found_in_source_text; method: grant_amount; source: https://www.mass.gov/massdot-nevi-plan
- Washington Gas - Residential Rebate Program (SOURCE_DSIRE:dsire_program_id:5819)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://wgsmartsavings.com/programs-rebates/home/md
- City of Aspen and Pitkin County - Renewable Energy Mitigation Program Grants (SOURCE_DSIRE:dsire_program_id:5558)
  - reason: source_text_unavailable; method: grant_amount; source: http://aspencore.org/grants/
- San Miguel Power Association - Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:4312)
  - reason: source_text_unavailable; method: per_unit; source: https://www.ecoactionpartners.org/smparebates
- Building Optimization Rebate (SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:building-optimization-rebate)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.siliconvalleypower.com/businesses/rebates
- Mora Municipal Utilities - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2547)
  - reason: formula_not_found_in_source_text; method: per_unit; source: http://www.SaveEnergyInMora.com
- Salt River Electric - Residential Energy Efficiency Rebate Programs (SOURCE_DSIRE:dsire_program_id:2306)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.srelectric.com/rebates/
- MOR-EV Trucks Program (SOURCE_DSIRE:dsire_program_id:22191)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://mor-ev.org/
- Zero-Emission Vehicle School Bus Transition Grant Program (SOURCE_DSIRE:dsire_program_id:22182)
  - reason: formula_not_found_in_source_text; method: grant_amount; source: http://mgaleg.maryland.gov/mgawebsite/Legislation/Details/hb1255/?ys=2019rs
- Clark Public Utilities - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2639)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.clarkpublicutilities.com/residential-customers/reduce-energy-waste-and-lower-your-bill/
- Moorhead Public Service Utility - Commercial and Industrial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:1942)
  - reason: formula_not_found_in_source_text; method: per_unit; source: http://www.brightenergysolutions.com/municipalities-container/mn/moorhead-public-service/?rebatetype=Business
- GFO-25-608 - Electric Vehicle Hub, Outreach, Messaging, and Equipment (EV HOME) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-608)
  - reason: formula_not_found_in_source_text; method: grant_amount; source: https://www.energy.ca.gov/solicitations/2026-05/gfo-25-608-electric-vehicle-hub-outreach-messaging-and-equipment-ev-home
- Duke Energy - Non-Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:1553)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.duke-energy.com/business/products/smartsaver
- Rocky Mountain Power - wattsmart Residential Efficiency Program (SOURCE_DSIRE:dsire_program_id:2410)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://wattsmarthomes.com/
- PECO - EV Rebate Program (SOURCE_DSIRE:dsire_program_id:22377)
  - reason: source_text_unavailable; method: per_unit; source: https://www.peco.com/SmartEnergy/InnovationTechnology/Pages/ElectricVehiclesL3.aspx
- Agricultural and Pumping Interruptible (AP-I) Program (SOURCE_SCE_BUSINESS:sce_source_section:56574423e5e2b946:agricultural-and-pumping-interruptible-ap-i-program)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.sce.com/business/save-costs-energy/savings-strategies/what-is-demand-response
- Nicor Gas - Residential Energy Efficiency Rebates (SOURCE_DSIRE:dsire_program_id:4128)
  - reason: source_text_unavailable; method: per_unit; source: https://www.nicorgas.com/residential/ways-to-save/rebates.html.html
- EV Infrastructure Rule (SOURCE_SDGE_BUSINESS:program_url:sdge_com_node_22121)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.sdge.com/node/22121
- Otter Tail Power Company - Residential and Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:3146)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.otpco.com/ways-to-save/programs/
- Northern Lights Inc. - Energy Conservation Rebate Program (SOURCE_DSIRE:dsire_program_id:4198)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: http://www.nli.coop/rebates/
- TVA - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:5704)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://energyright.com/residential/rebates/
- Lake Region Electric Cooperative - Agriculture and Commercial Energy Efficiency Grant Program (SOURCE_DSIRE:dsire_program_id:3577)
  - reason: formula_not_found_in_source_text; method: grant_amount; source: http://www.lrec.coop/products-service/ag-commercial-energy-grants
- Orlando Utilities Commission - Electric Vehicle Rebate Program (SOURCE_DSIRE:dsire_program_id:22307)
  - reason: source_text_unavailable; method: per_unit; source: https://www.ouc.com/residential/save-energy-water-money/electric-vehicles
- Loveland Water & Power - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:5018)
  - reason: formula_not_found_in_source_text; method: per_unit; source: http://www.lovelandwaterandpower.org/SAVEENERGY
- Lane Electric - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:22567)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://laneelectric.com/programs-services/energy-efficiency/
- Elk River Municipal Utilities - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:1939)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.ermumn.com/programs-rebates/residential-rebates
- PECO - Commercial Charger Rebate Program (SOURCE_DSIRE:dsire_program_id:22456)
  - reason: source_text_unavailable; method: per_unit; source: https://www.peco.com/SmartEnergy/InnovationTechnology/Pages/ElectricVehiclesL3.aspx
- Cedarburg Light & Water Utility - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2041)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://focusonenergy.com/residential
- Energy Design Assistance (SOURCE_SILICON_VALLEY_POWER:svp_source_section:f69ab77394818965:energy-design-assistance)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: https://www.siliconvalleypower.com/businesses/save-money
- Business Energy Efficiency Rebates (Offered by 5 Utilities) (SOURCE_DSIRE:dsire_program_id:5101)
  - reason: formula_not_found_in_source_text; method: per_unit; source: http://www.brightenergysolutions.com/find-a-rebate/
- Spire - Residential Rebates (SOURCE_DSIRE:dsire_program_id:3897)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.spireenergy.com/rebates
- SWEPCO - EV Residential Charging Station Rebate Program (SOURCE_DSIRE:dsire_program_id:22397)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.swepco.com/clean-energy/electric-cars/charging-station
- Otter Tail Power Company - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:4586)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.otpco.com/ways-to-save/residential/programs/
- Elk River Municipal Utilities - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:3415)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.ermumn.com/programs-rebates/commercial-rebates
- Roseville Electric - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:1902)
  - reason: source_text_unavailable; method: per_unit; source: https://www.roseville.ca.us/cms/One.aspx?portalId=7964922&pageId=20438359
- RG&E - Smart Energy Residential Efficiency Rebate Programs (SOURCE_DSIRE:dsire_program_id:3464)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.rge.com/smartenergy
- Black Hills Energy - Solar Power Program (SOURCE_DSIRE:dsire_program_id:1801)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.blackhillsenergy.com/services/electric-services/solar-program/colorado-solar-program
