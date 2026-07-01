
{
"schemaVersion": "opportunity_data_research_repairs.v1",
"researchedAt": "2026-07-01",
"source": "gpt_pro",
"repairs": [
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2051",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"WI"
],
"counties": [],
"cities": [
"Marshfield"
],
"utilityTerritories": [
"Marshfield Utilities electric service territory"
],
"notes": "Rebate is limited to customers with direct Marshfield Utilities electric service at the installation address."
},
"eligibleApplicantTypes": [
"residential_electric_utility_customer"
],
"eligibleSectors": [
"residential"
],
"eligibleRetrofitCategories": [
"ground_source_geothermal_heat_pump"
],
"hardRequirements": [
"Purchaser must be a Marshfield Utilities customer.",
"Ground-source heat pump must be installed where direct Marshfield electric service is provided.",
"Completed application, sales receipt, and customer and contractor information are required.",
"Utility may inspect installation and funds are limited."
],
"blockers": [
"Do not match standard air-source heat pumps, general HVAC replacement, furnaces, boilers, or central air conditioning to this specific rebate.",
"Smart thermostat rewards are a separate Focus on Energy-linked program on the same utility page.",
"No support found for a general thermostat or zoning retrofit under the heat pump rebate."
],
"programType": "rebate_program",
"administrator": "Marshfield Utilities",
"applicationUrl": "[https://marshfieldutilities.org/efficiency-conservation/pdf/ground-source-appplication.pdf](https://marshfieldutilities.org/efficiency-conservation/pdf/ground-source-appplication.pdf)",
"websiteUrl": "[https://marshfieldutilities.org/efficiency-conservation/save-energy-money.php](https://marshfieldutilities.org/efficiency-conservation/save-energy-money.php)",
"sourceUrlsChecked": [
"[https://marshfieldutilities.org/efficiency-conservation/save-energy-money.php](https://marshfieldutilities.org/efficiency-conservation/save-energy-money.php)",
"[https://marshfieldutilities.org/efficiency-conservation/pdf/ground-source-appplication.pdf](https://marshfieldutilities.org/efficiency-conservation/pdf/ground-source-appplication.pdf)"
],
"evidenceText": "The utility page lists a Ground-Source Heat Pump Rebate Application separately from Smart Thermostat Rewards. The application is for a ground-source heat pump rebate and requires direct Marshfield electric service.",
"reasoningNotes": "Keep only ground-source geothermal heat pumps. The prior smart thermostat and broad heat pump/HVAC matches were false positives for this opportunity."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3211",
"confidence": "medium",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"OR"
],
"counties": [],
"cities": [
"McMinnville"
],
"utilityTerritories": [
"McMinnville Water & Light electric service territory"
],
"notes": "Official commercial pages are for McMinnville Water & Light customers; incentives are not statewide Oregon programs."
},
"eligibleApplicantTypes": [
"commercial_electric_customer",
"non_residential_electric_customer"
],
"eligibleSectors": [
"commercial",
"industrial",
"institutional",
"nonprofit",
"government"
],
"eligibleRetrofitCategories": [
"led_lighting_retrofit",
"lighting_controls",
"commercial_window_replacement",
"insulation_upgrade",
"air_source_heat_pump",
"ductless_mini_split_heat_pump",
"packaged_terminal_heat_pump",
"hvac_rooftop_unit_controls"
],
"hardRequirements": [
"Commercial projects must be in McMinnville Water & Light service territory.",
"Official snippets state projects must be pre-approved.",
"Replacement window and insulation rebates are limited to existing commercial or non-residential buildings with electric heating.",
"Packaged terminal heat pump rebates are limited to lodging or residential care buildings."
],
"blockers": [
"Do not match residential weatherization or residential appliance rebates to this commercial program.",
"Do not treat insulation as broad air sealing unless the specific air-sealing measure is separately verified.",
"Demand response, solar, EV charging, or water conservation offerings are not part of this repaired C&I efficiency rebate record."
],
"programType": "rebate_program",
"administrator": "McMinnville Water & Light",
"applicationUrl": null,
"websiteUrl": "[https://www.mc-power.com/energy-efficiency/commercial-energy-programs/](https://www.mc-power.com/energy-efficiency/commercial-energy-programs/)",
"sourceUrlsChecked": [
"[https://www.mc-power.com/energy-efficiency/commercial-energy-programs/](https://www.mc-power.com/energy-efficiency/commercial-energy-programs/)",
"[https://www.mc-power.com/energy-efficiency/commercial-energy-programs/lighting-retrofit-rebate/](https://www.mc-power.com/energy-efficiency/commercial-energy-programs/lighting-retrofit-rebate/)",
"[https://www.mc-power.com/energy-efficiency/energy-efficiency-rebates-incentives/](https://www.mc-power.com/energy-efficiency/energy-efficiency-rebates-incentives/)"
],
"evidenceText": "Official MW&L commercial snippets list lighting retrofit, replacement windows, insulation, air-source and ductless heat pumps, packaged terminal heat pumps, rooftop unit controls, and energy audits, with preapproval and electric-heating limits for some measures.",
"reasoningNotes": "The official site was partially blocked, but current official search snippets were specific enough to repair categories. Keep commercial envelope/HVAC/lighting; remove unsupported broad weatherization."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:678",
"confidence": "high",
"availabilityStatus": "unavailable",
"geography": {
"country": "US",
"states": [
"PA"
],
"counties": [],
"cities": [],
"utilityTerritories": [
"Met-Ed electric service territory",
"Penelec electric service territory"
],
"notes": "Projects must be located in eligible Met-Ed or Penelec utility areas, generally verified by ZIP-code tools or downloadable lists."
},
"eligibleApplicantTypes": [
"nonprofit",
"government_entity",
"small_business",
"building_owner"
],
"eligibleSectors": [
"commercial",
"nonprofit",
"government",
"public"
],
"eligibleRetrofitCategories": [
"led_lighting_retrofit",
"lighting_controls",
"high_efficiency_hvac_replacement",
"air_source_heat_pump",
"ground_source_geothermal_heat_pump",
"commercial_kitchen_equipment",
"commercial_refrigeration_equipment"
],
"hardRequirements": [
"2026 grant is for existing buildings only, not new construction.",
"Applicant must own, not lease, the building.",
"A preliminary energy assessment must be completed.",
"Project must be within Met-Ed or Penelec territory.",
"Open Letter of Inquiry deadline was May 15, 2026; only invited applications proceed afterward."
],
"blockers": [
"New applicants are blocked because the open LOI window is closed as of the researched date.",
"Do not match batteries, CHP, biomass, solar thermal, or general renewable generation to the energy-efficiency grant.",
"Renewable pilots and broader sustainable-energy loans are separate PRI/loan opportunities, not this grant cycle.",
"Leased buildings and new construction are ineligible for the grant."
],
"programType": "grant_program",
"administrator": "Berks County Community Foundation",
"applicationUrl": null,
"websiteUrl": "[https://bccf.org/grants-energy-efficiency/](https://bccf.org/grants-energy-efficiency/)",
"sourceUrlsChecked": [
"[https://bccf.org/funds/sustainable-energy-fund/](https://bccf.org/funds/sustainable-energy-fund/)",
"[https://bccf.org/grants-energy-efficiency/](https://bccf.org/grants-energy-efficiency/)",
"[https://bccf.org/wp-content/uploads/2026/01/Lighting-Retrofit-One-Pager.pdf](https://bccf.org/wp-content/uploads/2026/01/Lighting-Retrofit-One-Pager.pdf)",
"[https://bccf.org/wp-content/uploads/2026/01/HVAC-One-Pager.pdf](https://bccf.org/wp-content/uploads/2026/01/HVAC-One-Pager.pdf)",
"[https://bccf.org/wp-content/uploads/2026/02/Kitchen-One-Pager.pdf](https://bccf.org/wp-content/uploads/2026/02/Kitchen-One-Pager.pdf)",
"[https://bccf.org/met-ed-penelec-sustainable-energy-fund-loan-opportunity/](https://bccf.org/met-ed-penelec-sustainable-energy-fund-loan-opportunity/)"
],
"evidenceText": "The 2026 grant page supports efficiency projects for existing owner-occupied buildings in Met-Ed/Penelec areas, with lighting, HVAC, and kitchen/refrigeration one-pagers. It also states LOIs closed May 15, 2026.",
"reasoningNotes": "Repair away from DSIRE renewable terms. The separate PRI loan can support broader sustainable-energy work, but this opportunity is the closed 2026 energy-efficiency grant cycle."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:1299",
"confidence": "medium",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"OR"
],
"counties": [],
"cities": [],
"utilityTerritories": [
"Midstate Electric Cooperative service territory"
],
"notes": "Program is limited to Midstate Electric Cooperative commercial and industrial accounts."
},
"eligibleApplicantTypes": [
"commercial_member",
"industrial_member",
"non_residential_electric_customer"
],
"eligibleSectors": [
"commercial",
"industrial",
"agricultural",
"institutional"
],
"eligibleRetrofitCategories": [
"led_lighting_retrofit",
"motor_replacement_or_vfd",
"high_efficiency_hvac_replacement",
"insulation_upgrade",
"custom_energy_efficiency_measures"
],
"hardRequirements": [
"Projects must be for Midstate Electric Cooperative commercial or industrial members.",
"Official snippets state projects must be submitted within 180 days of completion.",
"Measure eligibility and incentive amounts require Midstate review."
],
"blockers": [
"Do not match residential weatherization, residential appliances, or home audits to this C&I program.",
"Energy audits are not verified as a rebated retrofit measure on the current official snippets.",
"Do not infer solar, EV charging, or demand response from this C&I efficiency rebate record."
],
"programType": "rebate_program",
"administrator": "Midstate Electric Cooperative",
"applicationUrl": null,
"websiteUrl": "[https://www.midstateelectric.coop/energy-efficiency/incentives/commercial-industrial/](https://www.midstateelectric.coop/energy-efficiency/incentives/commercial-industrial/)",
"sourceUrlsChecked": [
"[https://www.midstateelectric.coop/commercial-industrial](https://www.midstateelectric.coop/commercial-industrial)",
"[https://www.midstateelectric.coop/energy-efficiency/incentives/commercial-industrial/](https://www.midstateelectric.coop/energy-efficiency/incentives/commercial-industrial/)"
],
"evidenceText": "Official Midstate snippets say C&I incentives cover upgrades to lighting, motors, HVAC systems, insulation, and more, and that projects must be submitted within 180 days of completion.",
"reasoningNotes": "The official page was access-restricted, so confidence is medium. Current official snippets support C&I lighting, motors, HVAC, insulation, and custom efficiency, but not an energy-audit retrofit."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5143",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"MN"
],
"counties": [],
"cities": [],
"utilityTerritories": [
"Adrian Public Utilities",
"ALP Utilities",
"Barnesville Municipal Utilities",
"Benson Municipal Utilities",
"Breckenridge Public Utilities",
"Detroit Lakes Public Utilities",
"Elbow Lake Municipal Power",
"Henning Municipal Utilities",
"Hutchinson Utilities Commission",
"Jackson Municipal Utilities",
"Lake Park Public Utilities",
"Lakefield Public Utilities",
"Luverne Municipal Utilities",
"Madison Municipal Utilities",
"Marshall Municipal Utilities",
"Melrose Public Utilities",
"Moorhead Public Service",
"Ortonville Municipal Utilities",
"Sauk Centre Public Utilities",
"St. James Public Utilities",
"Staples Water & Light",
"Wadena Utilities Department",
"Westbrook Public Utilities",
"Willmar Municipal Utilities",
"Worthington Public Utilities"
],
"notes": "Bright Energy Solutions rebates vary by participating Missouri River Energy Services member utility; the Minnesota member utilities listed are current official participants."
},
"eligibleApplicantTypes": [
"residential_electric_customer",
"participating_municipal_utility_customer"
],
"eligibleSectors": [
"residential"
],
"eligibleRetrofitCategories": [
"air_source_heat_pump",
"ductless_mini_split_heat_pump",
"ground_source_geothermal_heat_pump",
"central_air_conditioner_replacement",
"heat_pump_water_heater",
"smart_thermostat_zoning_retrofit",
"residential_led_downlights",
"ev_level_2_charger",
"energy_star_residential_appliances",
"hvac_tune_up"
],
"hardRequirements": [
"Customer must select and qualify through a participating Bright Energy Solutions member utility.",
"Rebate availability, amounts, and forms vary by local municipal utility.",
"Some appliance rebates have product-specific limits, such as clothes washers requiring electric water heating.",
"Heating and cooling rebates have equipment-efficiency and local-form requirements."
],
"blockers": [
"Do not match commercial refrigeration equipment to this residential rebate record.",
"No current official home rebate list verified refrigerator or freezer rebates for this residential program.",
"Commercial/business rebates are separate from the residential member-utility program.",
"Do not generalize product-specific residential appliance rebates into commercial kitchen or refrigeration measures."
],
"programType": "rebate_program",
"administrator": "Bright Energy Solutions / Missouri River Energy Services",
"applicationUrl": "[https://www.brightenergysolutions.com/find-a-rebate/](https://www.brightenergysolutions.com/find-a-rebate/)",
"websiteUrl": "[https://www.brightenergysolutions.com/find-a-rebate/](https://www.brightenergysolutions.com/find-a-rebate/)",
"sourceUrlsChecked": [
"[https://www.brightenergysolutions.com/members](https://www.brightenergysolutions.com/members)",
"[https://www.brightenergysolutions.com/members/hutchinson-utilities-commission?rebates=residential](https://www.brightenergysolutions.com/members/hutchinson-utilities-commission?rebates=residential)",
"[https://www.brightenergysolutions.com/find-a-rebate/](https://www.brightenergysolutions.com/find-a-rebate/)"
],
"evidenceText": "The official member list identifies Minnesota participating municipal utilities. A current Minnesota member home-rebate page lists air-source, mini-split and geothermal heat pumps, smart thermostats, heat-pump water heaters, LED downlights, EV chargers, appliances, and tune-ups.",
"reasoningNotes": "The old refrigerator/freezer match should be blocked for residential matching because current home rebate evidence does not support that category; commercial refrigeration belongs to business rebate contexts."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:4238",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"AZ"
],
"counties": [],
"cities": [],
"utilityTerritories": [
"Mohave Electric Cooperative service territory"
],
"notes": "Current rebate pages are for Mohave Electric Cooperative members; the utility notes a renewed focus on income-qualified members after ACC-approved program changes."
},
"eligibleApplicantTypes": [
"electric_cooperative_member",
"income_qualified_member"
],
"eligibleSectors": [
"residential"
],
"eligibleRetrofitCategories": [
"heat_pump_hvac_retrofit",
"ductless_mini_split_heat_pump",
"high_efficiency_air_conditioner_replacement"
],
"hardRequirements": [
"Applicant must be a Mohave Electric Cooperative member and meet current program eligibility.",
"Applications must include invoice, receipt, required photos, and contractor or member information.",
"Heat pump and A/C rebates require qualifying SEER tiers; window units are excluded from the A/C rebate.",
"Mini-split rebates have separate cooling-only and heat-pump forms and must be for qualifying home areas."
],
"blockers": [
"Do not match EV chargers; the current Mohave Charged rebate is for battery storage, not EV charging equipment.",
"Do not match LED lighting to this rebate page.",
"Battery storage and SunWatts renewable incentives are separate programs from the HVAC efficiency rebates.",
"Mini-split units for garages or non-home areas are blocked by the official requirements."
],
"programType": "rebate_program",
"administrator": "Mohave Electric Cooperative",
"applicationUrl": null,
"websiteUrl": "[https://www.mohaveelectric.com/energy-solutions/rebates/](https://www.mohaveelectric.com/energy-solutions/rebates/)",
"sourceUrlsChecked": [
"[https://www.mohaveelectric.com/energy-solutions/rebates/](https://www.mohaveelectric.com/energy-solutions/rebates/)",
"[https://www.mohaveelectric.com/energy-solutions/rebates/heat-pump-rebate/](https://www.mohaveelectric.com/energy-solutions/rebates/heat-pump-rebate/)",
"[https://www.mohaveelectric.com/energy-solutions/rebates/air-conditioning-rebate/](https://www.mohaveelectric.com/energy-solutions/rebates/air-conditioning-rebate/)",
"[https://www.mohaveelectric.com/energy-solutions/rebates/mini-split-rebate/](https://www.mohaveelectric.com/energy-solutions/rebates/mini-split-rebate/)",
"[https://www.mohaveelectric.com/energy-solutions/rebates/mohave-charged-rebates/](https://www.mohaveelectric.com/energy-solutions/rebates/mohave-charged-rebates/)"
],
"evidenceText": "Current MEC rebate pages list heat pump, air-conditioning, and ductless mini-split rebates with SEER tiers and documentation rules. The Mohave Charged page is a battery rebate, not EV-charging equipment.",
"reasoningNotes": "Repair by keeping HVAC measures and blocking EV charging and lighting. Separate battery and solar offerings should not be collapsed into this energy-efficiency rebate."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3909",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"MT"
],
"counties": [],
"cities": [],
"utilityTerritories": [
"Montana-Dakota Utilities electric and natural gas service territory in Montana"
],
"notes": "The current page also discusses South Dakota, but this DSIRE target is Montana; North Dakota and Wyoming residential incentives are not offered on the current page."
},
"eligibleApplicantTypes": [
"residential_natural_gas_customer",
"residential_electric_customer"
],
"eligibleSectors": [
"residential"
],
"eligibleRetrofitCategories": [
"high_efficiency_furnace_retrofit",
"programmable_or_wifi_thermostat",
"residential_led_bulbs"
],
"hardRequirements": [
"Montana natural gas furnace rebate is for existing-home furnace replacement at 95 percent AFUE or greater.",
"Fuel conversion and new construction do not qualify for the Montana furnace rebate.",
"Tier 1 thermostat must be contractor-installed with a qualifying new high-efficiency furnace; Tier 2 Wi-Fi thermostat can qualify separately.",
"LED bulb rebates are for Montana residential electric customers and are capped by bulb type and account limits."
],
"blockers": [
"Do not match heat pumps, boilers, central air conditioning, or broad HVAC replacement.",
"Do not match whole-building lighting retrofits; the current electric measure is residential LED bulbs.",
"North Dakota and Wyoming residential incentive matches are blocked by the official page."
],
"programType": "rebate_program",
"administrator": "Montana-Dakota Utilities Co.",
"applicationUrl": null,
"websiteUrl": "[https://www.montana-dakota.com/energy-efficiency/savings-for-your-home/](https://www.montana-dakota.com/energy-efficiency/savings-for-your-home/)",
"sourceUrlsChecked": [
"[https://www.montana-dakota.com/energy-efficiency/savings-for-your-home/](https://www.montana-dakota.com/energy-efficiency/savings-for-your-home/)"
],
"evidenceText": "The current MDU home page lists Montana residential natural-gas furnace replacement, programmable/Wi-Fi thermostat incentives, and residential electric LED bulb rebates, while stating no residential incentives are available in North Dakota or Wyoming.",
"reasoningNotes": "Narrow the HVAC match to natural gas furnace replacement and qualifying thermostats. LED should be treated as bulbs, not a commercial lighting retrofit."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:333",
"confidence": "medium",
"availabilityStatus": "unknown",
"geography": {
"country": "US",
"states": [
"MI"
],
"counties": [],
"cities": [],
"utilityTerritories": [],
"notes": "Credit is tied to Michigan business tax and Michigan Next Energy Authority certification, not utility territory or a building-location rebate."
},
"eligibleApplicantTypes": [
"certified_alternative_energy_business",
"michigan_business_taxpayer_with_medc_certificate"
],
"eligibleSectors": [
"business",
"industrial"
],
"eligibleRetrofitCategories": [],
"hardRequirements": [
"Taxpayer must be certified under the Michigan Next Energy Authority Act.",
"Qualified activity must be research, development, or manufacturing of an alternative energy marine propulsion system, alternative energy system, alternative energy vehicle, alternative energy technology, or renewable fuel.",
"The Michigan Economic Development Corporation certificate must be attached to the tax return or the credit is disallowed.",
"Available official forms verify claim mechanics for certified taxpayers but do not verify a current open new-applicant intake."
],
"blockers": [
"No building retrofit, equipment installation, rebate, loan, or grant measure is supported.",
"Do not match biomass, CHP, solar thermal, or battery storage installations to this industry tax credit.",
"Do not match residential, commercial building, utility-customer, or weatherization projects.",
"Treat as industry support for certified business activity, not an energy retrofit opportunity."
],
"programType": "industry_support_tax_credit",
"administrator": "Michigan Department of Treasury / Michigan Economic Development Corporation",
"applicationUrl": "[https://www.michigan.gov/taxes/-/media/Project/Websites/taxes/Forms/MBT/TY2025/4573_ty2025.pdf](https://www.michigan.gov/taxes/-/media/Project/Websites/taxes/Forms/MBT/TY2025/4573_ty2025.pdf)",
"websiteUrl": "[https://www.michigan.gov/taxes/business-taxes/mbt](https://www.michigan.gov/taxes/business-taxes/mbt)",
"sourceUrlsChecked": [
"[https://www.michigan.gov/taxes/-/media/Project/Websites/taxes/Forms/MBT/TY2025/4573_ty2025-instructions.pdf?hash=B7E69F971945ABBB0F0B8A5078045FF9&rev=0da0aafcb89a481aa55a5478172aceb0](https://www.michigan.gov/taxes/-/media/Project/Websites/taxes/Forms/MBT/TY2025/4573_ty2025-instructions.pdf?hash=B7E69F971945ABBB0F0B8A5078045FF9&rev=0da0aafcb89a481aa55a5478172aceb0)",
"[https://www.michigan.gov/taxes/-/media/Project/Websites/taxes/Forms/MBT/TY2025/4573_ty2025.pdf](https://www.michigan.gov/taxes/-/media/Project/Websites/taxes/Forms/MBT/TY2025/4573_ty2025.pdf)",
"[https://www.michigan.gov/taxes/business-taxes/mbt](https://www.michigan.gov/taxes/business-taxes/mbt)"
],
"evidenceText": "Michigan’s 2025 MBT instructions describe the Next Energy Business Activity Credit as a certified credit for research, development, or manufacturing of alternative energy systems, vehicles, technology, marine propulsion, or renewable fuel.",
"reasoningNotes": "The old DSIRE technology terms are manufacturing/R&D topics, not retrofit categories. Availability for new certification was not verified, so set unknown and block all retrofit matches."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:4528",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"OK"
],
"counties": [],
"cities": [],
"utilityTerritories": [
"Oklahoma Municipal Power Authority member municipal electric utilities"
],
"notes": "Facility must exist in Oklahoma and be served by an OMPA member utility."
},
"eligibleApplicantTypes": [
"non_residential_electric_customer",
"municipal_utility_customer",
"government_entity",
"nonprofit",
"commercial_customer",
"industrial_customer"
],
"eligibleSectors": [
"commercial",
"industrial",
"government",
"nonprofit",
"public",
"educational"
],
"eligibleRetrofitCategories": [
"air_source_heat_pump",
"dual_fuel_heat_pump",
"ground_source_geothermal_heat_pump",
"led_lighting_retrofit"
],
"hardRequirements": [
"Facility must be in Oklahoma and served by an OMPA member electric utility.",
"Customer classification must be other than residential; residential customers do not qualify.",
"Applications must be signed by both the customer representative and municipal electric utility representative.",
"Existing equipment projects require OMPA inspection before replacement or removal.",
"Standard HVAC systems, ground-source-to-ground-source replacements, and listed nonqualifying lighting projects do not qualify."
],
"blockers": [
"Do not match residential rebates.",
"Do not match EV chargers, electric charging equipment, variable speed drives, motors, appliances, exterior lighting, screw-in/pin/pluggable bulbs, or older LED-to-new LED upgrades.",
"Do not treat standard HVAC replacement as eligible; only qualifying air-source, dual-fuel, or ground-source heat pump parameters are supported."
],
"programType": "rebate_program",
"administrator": "Oklahoma Municipal Power Authority",
"applicationUrl": "[https://www.ompa.com/wp-content/uploads/2025/12/DEEP-Application-Ver.-12-2025.pdf](https://www.ompa.com/wp-content/uploads/2025/12/DEEP-Application-Ver.-12-2025.pdf)",
"websiteUrl": "[https://www.ompa.com/services/rebate-programs/](https://www.ompa.com/services/rebate-programs/)",
"sourceUrlsChecked": [
"[https://www.ompa.com/services/rebate-programs/](https://www.ompa.com/services/rebate-programs/)",
"[https://www.ompa.com/wp-content/uploads/2026/01/DEEP-Rebate-Program-Trifold-Brochure-2025-WEB.pdf](https://www.ompa.com/wp-content/uploads/2026/01/DEEP-Rebate-Program-Trifold-Brochure-2025-WEB.pdf)",
"[https://www.ompa.com/wp-content/uploads/2025/12/DEEP-Policy-Guidlines-2025.pdf](https://www.ompa.com/wp-content/uploads/2025/12/DEEP-Policy-Guidlines-2025.pdf)",
"[https://www.ompa.com/wp-content/uploads/2025/12/DEEP-Application-Ver.-12-2025.pdf](https://www.ompa.com/wp-content/uploads/2025/12/DEEP-Application-Ver.-12-2025.pdf)"
],
"evidenceText": "OMPA’s current DEEP policy limits eligibility to non-residential OMPA-member-utility facilities in Oklahoma and supports qualified air-source, dual-fuel, and ground-source heat pumps plus LED lighting replacing ballasted technologies.",
"reasoningNotes": "The repair keeps heat-pump and LED measures but narrows eligibility to nonresidential customers and blocks EV chargers, motors, appliances, and standard HVAC."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5015",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"OK"
],
"counties": [],
"cities": [],
"utilityTerritories": [
"Oklahoma Natural Gas service territory"
],
"notes": "Residential rebates require an active Oklahoma Natural Gas account for the qualifying address."
},
"eligibleApplicantTypes": [
"residential_natural_gas_customer",
"prospective_residential_natural_gas_customer",
"builder"
],
"eligibleSectors": [
"residential"
],
"eligibleRetrofitCategories": [
"high_efficiency_furnace_retrofit",
"high_efficiency_boiler_retrofit",
"natural_gas_water_heater",
"natural_gas_clothes_dryer",
"natural_gas_range_or_oven"
],
"hardRequirements": [
"Heating rebate is for a new natural gas furnace or boiler, or conversion from electric resistance or electric heat pump to natural gas furnace and air conditioner.",
"Heating-system application requires an Oklahoma-licensed contractor, AHRI certificate, receipt, and contractor invoice within 180 days after installation.",
"Applicant must have an active Oklahoma Natural Gas account for rebate eligibility.",
"Rebates are first-come, first-served until funds are depleted."
],
"blockers": [
"Do not match heat pump installation; the heat-pump references are for replacement of an electric heat pump with a natural gas furnace and A/C.",
"Only qualified natural gas equipment is supported.",
"Do not match commercial or industrial equipment to this residential rebate program."
],
"programType": "rebate_program",
"administrator": "Oklahoma Natural Gas",
"applicationUrl": "[https://www.oklahomanaturalgas.com/rebate-application](https://www.oklahomanaturalgas.com/rebate-application)",
"websiteUrl": "[https://www.oklahomanaturalgas.com/save-money/rebates-and-incentives/residential-rebates](https://www.oklahomanaturalgas.com/save-money/rebates-and-incentives/residential-rebates)",
"sourceUrlsChecked": [
"[https://www.oklahomanaturalgas.com/save-money/rebates-and-incentives/residential-rebates](https://www.oklahomanaturalgas.com/save-money/rebates-and-incentives/residential-rebates)",
"[https://www.oklahomanaturalgas.com/save-money/rebates-and-incentives/residential-rebates/residential-rebates-heating-system](https://www.oklahomanaturalgas.com/save-money/rebates-and-incentives/residential-rebates/residential-rebates-heating-system)",
"[https://www.oklahomanaturalgas.com/rebate-application](https://www.oklahomanaturalgas.com/rebate-application)"
],
"evidenceText": "The current ONG residential page lists natural gas appliance rebates. The heating page offers rebates for new efficient natural gas furnaces or boilers and for replacing electric heating or heat pumps with natural gas systems.",
"reasoningNotes": "Repair the administrator to Oklahoma Natural Gas and block heat pump retrofit matching; heat-pump language describes a conversion away from electric heat pumps."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3905",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"NY"
],
"counties": [],
"cities": [],
"utilityTerritories": [
"Orange & Rockland Utilities New York gas service territory"
],
"notes": "Eligible equipment must be installed on a New York residential O&R gas account."
},
"eligibleApplicantTypes": [
"residential_gas_customer"
],
"eligibleSectors": [
"residential"
],
"eligibleRetrofitCategories": [
"high_efficiency_furnace_retrofit",
"high_efficiency_boiler_retrofit",
"natural_gas_tankless_water_heater",
"combination_furnace_water_heater"
],
"hardRequirements": [
"New equipment must be a natural gas system installed on a New York residential O&R gas account.",
"Customer must work with an O&R participating contractor for eligible HVAC gas equipment.",
"O&R no longer provides downloadable rebate applications or online portal applications for this program.",
"Equipment must meet listed AFUE or tankless water-heater efficiency thresholds."
],
"blockers": [
"Do not match air sealing or broad weatherization to this current gas appliance rebate page.",
"Do not match heat pumps, EV charging, demand response, or electric equipment; those are separate O&R program areas.",
"Do not match commercial or New Jersey customers to this New York residential gas rebate."
],
"programType": "rebate_program",
"administrator": "Orange and Rockland Utilities, Inc.",
"applicationUrl": null,
"websiteUrl": "[https://www.oru.com/en/save-money/rebates-incentives-credits/new-york-customers/incentives-for-residential-customers-ny/energy-efficient-equipment-rebates/gas-appliance-rebates](https://www.oru.com/en/save-money/rebates-incentives-credits/new-york-customers/incentives-for-residential-customers-ny/energy-efficient-equipment-rebates/gas-appliance-rebates)",
"sourceUrlsChecked": [
"[https://www.oru.com/en/save-money/rebates-incentives-credits/new-york-customers/incentives-for-residential-customers-ny/energy-efficient-equipment-rebates/gas-appliance-rebates](https://www.oru.com/en/save-money/rebates-incentives-credits/new-york-customers/incentives-for-residential-customers-ny/energy-efficient-equipment-rebates/gas-appliance-rebates)",
"[https://cdnc-dcxprod2-sitecore.azureedge.net/-/media/files/oru/documents/saveenergyandmoney/incentives-and-rebates/for-renters-and-homeowners/res-hvac-terms-and-conditions.pdf?hash=A05D26F4C1146AAE2D2318C790F9BD90&rev=688f1299606543f2b51a89bedf7b8216](https://cdnc-dcxprod2-sitecore.azureedge.net/-/media/files/oru/documents/saveenergyandmoney/incentives-and-rebates/for-renters-and-homeowners/res-hvac-terms-and-conditions.pdf?hash=A05D26F4C1146AAE2D2318C790F9BD90&rev=688f1299606543f2b51a89bedf7b8216)"
],
"evidenceText": "The current O&R gas rebate page says eligible equipment must be a natural gas system on a New York residential O&R gas account and lists tankless water heaters, gas furnaces, hydronic boilers, combination units, and steam boilers.",
"reasoningNotes": "Current official evidence supports gas equipment only. Air sealing appears to be an old or separate-program match and should be blocked."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2181",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"MO"
],
"counties": [],
"cities": [],
"utilityTerritories": [
"Ozark Border Electric Cooperative service territory"
],
"notes": "Program is limited to cooperative members in good standing at qualifying metered services."
},
"eligibleApplicantTypes": [
"electric_cooperative_member",
"member_in_good_standing"
],
"eligibleSectors": [
"residential"
],
"eligibleRetrofitCategories": [
"ductless_mini_split_heat_pump",
"heat_pump_water_heater",
"smart_thermostat_zoning_retrofit",
"air_source_heat_pump",
"dual_fuel_heat_pump",
"ground_source_geothermal_heat_pump"
],
"hardRequirements": [
"Member must be in good standing of the cooperative.",
"Rebates are limited to cooperative services purchasing at least 6,000 kWh annually.",
"Structure must be permanent, on a permanent foundation, and on land owned by the member.",
"Signed application and original dated sales receipt must be submitted within 90 days of purchase.",
"Used equipment and dealer or distributor applicants do not qualify."
],
"blockers": [
"Do not match general HVAC replacement unless it is one of the supported heat pump categories.",
"Do not match tankless water heaters; heat-pump water heater rules explicitly exclude tankless water heaters.",
"Do not match commercial C&I retrofits broadly; commercial tonnage references in heat-pump rules do not create a general C&I program.",
"DX ground-source heat pump installations are not eligible."
],
"programType": "rebate_program",
"administrator": "Ozark Border Electric Cooperative",
"applicationUrl": "[https://www.ozarkborder.org/rebate-info.php](https://www.ozarkborder.org/rebate-info.php)",
"websiteUrl": "[https://www.ozarkborder.org/rebate-info.php](https://www.ozarkborder.org/rebate-info.php)",
"sourceUrlsChecked": [
"[https://www.ozarkborder.org/rebate-info.php](https://www.ozarkborder.org/rebate-info.php)"
],
"evidenceText": "The current cooperative rebate page lists ductless mini-splits, heat-pump water heaters, smart thermostats, air-source and dual-fuel heat pumps, and ground-source heat pumps, with member, kWh, receipt, and equipment limits.",
"reasoningNotes": "Current categories support heat pumps, HPWH, and smart thermostats. Keep thermostat but block broad HVAC and unsupported commercial matching."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:1429",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"CA"
],
"counties": [],
"cities": [],
"utilityTerritories": [
"Pacific Power California non-residential electric service territory"
],
"notes": "Program applies to Pacific Power California non-residential customers; it is not a statewide California incentive."
},
"eligibleApplicantTypes": [
"commercial_electric_customer",
"industrial_electric_customer",
"irrigation_customer",
"agricultural_customer",
"non_residential_customer"
],
"eligibleSectors": [
"commercial",
"industrial",
"agricultural",
"institutional"
],
"eligibleRetrofitCategories": [
"energy_management_services",
"led_lighting_retrofit",
"lighting_controls",
"air_source_heat_pump",
"packaged_terminal_heat_pump",
"high_efficiency_hvac_replacement",
"hvac_controls",
"motor_vfd",
"commercial_food_service_equipment",
"commercial_refrigeration_equipment",
"heat_pump_water_heater",
"compressed_air_system_efficiency",
"irrigation_pump_efficiency",
"farm_and_dairy_equipment"
],
"hardRequirements": [
"Customer must be a Pacific Power California non-residential customer.",
"Qualifying measures must deliver verifiable electric energy-efficiency improvements relative to an approved baseline.",
"Pacific Power review and approval are required for many incentive calculations, project costs, and custom incentives.",
"Some lighting incentives require qualifying product lists and are capped by project cost or payback rules.",
"Project financing is available only for select situations and is not itself a rebate measure."
],
"blockers": [
"Do not match residential projects.",
"Do not match ground-source geothermal heat pumps; the current California incentive table found air-cooled heat pumps and PTHP, but no geothermal term.",
"Do not match solar, batteries, EV charging, or general renewables to Wattsmart Business.",
"Energy management is services/operational improvement unless a specific capital control measure is separately approved."
],
"programType": "rebate_program",
"administrator": "Pacific Power",
"applicationUrl": null,
"websiteUrl": "[https://www.pacificpower.net/savings-energy-choices/business/wattsmart-efficiency-incentives-california.html](https://www.pacificpower.net/savings-energy-choices/business/wattsmart-efficiency-incentives-california.html)",
"sourceUrlsChecked": [
"[https://www.pacificpower.net/savings-energy-choices/business/wattsmart-efficiency-incentives-california.html](https://www.pacificpower.net/savings-energy-choices/business/wattsmart-efficiency-incentives-california.html)",
"[https://www.pacificorp.com/content/dam/pcorp/documents/en/pacificorp/environment/dsm/california/CA_Wattsmart_Business_2025.pdf](https://www.pacificorp.com/content/dam/pcorp/documents/en/pacificorp/environment/dsm/california/CA_Wattsmart_Business_2025.pdf)",
"[https://www.pacificpower.net/content/dam/pcorp/documents/en/pacificpower/savings-energy-choices/wattsmart-business/california/CA_wattsmartBusiness_Definitions_Incentive_Tables_Information.pdf](https://www.pacificpower.net/content/dam/pcorp/documents/en/pacificpower/savings-energy-choices/wattsmart-business/california/CA_wattsmartBusiness_Definitions_Incentive_Tables_Information.pdf)"
],
"evidenceText": "Pacific Power’s current California Wattsmart Business materials describe non-residential incentives for lighting, HVAC, motors, food service, irrigation, compressed air, refrigeration and other technologies, plus energy management services.",
"reasoningNotes": "Keep LED, HVAC, motors and energy management, but remove the geothermal match because current California incentive materials did not support ground-source geothermal."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2097",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"SC"
],
"counties": [],
"cities": [],
"utilityTerritories": [
"MPD Electric Cooperative service territory"
],
"notes": "The current site brands the administrator as MPD Electric Cooperative, formerly Pee Dee Electric Cooperative."
},
"eligibleApplicantTypes": [
"homeowner_member",
"electric_cooperative_member"
],
"eligibleSectors": [
"residential"
],
"eligibleRetrofitCategories": [
"insulation_upgrade",
"duct_insulation",
"water_heater_insulation",
"storm_windows_and_doors",
"thermal_window_replacement",
"insulated_door_replacement",
"attic_ventilation",
"heat_pump_hvac_retrofit",
"dual_fuel_heat_pump",
"ground_source_geothermal_heat_pump"
],
"hardRequirements": [
"Loan is for MPD Electric Cooperative homeowner members.",
"Loan finances materials and labor up to $7,500 for cost-effective energy-saving home improvements.",
"Loan is simple interest at a fixed 7 percent rate and secured with a lien on real property.",
"Checklist and application are linked by the utility but the PDF was access-restricted during review."
],
"blockers": [
"This is financing only, not a rebate or grant.",
"Do not match commercial or industrial retrofits.",
"Do not count an energy audit as a funded retrofit category; the current loan page lists improvement measures, not audits.",
"Do not match solar, batteries, generators, or EV charging unless separately listed in another program."
],
"programType": "loan_program",
"administrator": "MPD Electric Cooperative (formerly Pee Dee Electric Cooperative)",
"applicationUrl": "[https://www.mpd.coop/wp-content/uploads/ERC-Loan-Checklist-App-2023.pdf](https://www.mpd.coop/wp-content/uploads/ERC-Loan-Checklist-App-2023.pdf)",
"websiteUrl": "[https://www.pdec.com/energy-center/erc-loan/](https://www.pdec.com/energy-center/erc-loan/)",
"sourceUrlsChecked": [
"[https://www.pdec.com/energy-center/erc-loan/](https://www.pdec.com/energy-center/erc-loan/)",
"[https://www.mpd.coop/wp-content/uploads/ERC-Loan-Checklist-App-2023.pdf](https://www.mpd.coop/wp-content/uploads/ERC-Loan-Checklist-App-2023.pdf)"
],
"evidenceText": "The current MPD/Pee Dee ERC Loan page says homeowner members can finance up to $7,500 of materials and labor for insulation, windows, doors, attic ventilation, high-efficiency heat pumps, dual-fuel systems, and ground-source heat pumps.",
"reasoningNotes": "Treat as a loan/financing record. Keep supported measures but do not present it as a rebate and do not use the old audit match as a retrofit category."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2121",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"NC"
],
"counties": [],
"cities": [],
"utilityTerritories": [
"Piedmont Electric Cooperative service territory"
],
"notes": "Rebates are for eligible Piedmont Electric Cooperative members and existing primary residences in the cooperative service territory."
},
"eligibleApplicantTypes": [
"residential_electric_cooperative_member"
],
"eligibleSectors": [
"residential"
],
"eligibleRetrofitCategories": [
"smart_thermostat_zoning_retrofit",
"attic_insulation",
"duct_sealing",
"heat_pump_hvac_retrofit",
"ductless_mini_split_heat_pump",
"heat_pump_water_heater",
"high_efficiency_air_conditioner_replacement",
"variable_speed_pool_pump",
"ev_rebate_or_time_of_day_enrollment",
"load_management"
],
"hardRequirements": [
"Rebate receipts must be dated within one calendar year of the rebate application date.",
"Heat pump rebate is for replacement electric heat pump systems only; no new home builds qualify.",
"Heat pump system must be installed on a primary residence with at least 800 kWh average monthly usage and condition at least 1,000 square feet.",
"HVAC and insulation or duct sealing work requires licensed and insured contractors with proof of purchase.",
"Pool pump rebate requires participation in the time-of-day rate."
],
"blockers": [
"Do not match standalone EV charger installation to the rebate page; the current rebate is a bill credit for notifying the co-op about an EV or enrolling in the EV time-of-day rate.",
"Do not match new construction heat pumps.",
"Low-interest home upgrade loans are a separate financing program and should not be conflated with these rebates.",
"Federal tax credits listed on the page are informational and separate from Piedmont Electric rebates."
],
"programType": "rebate_program",
"administrator": "Piedmont Electric Membership Corporation",
"applicationUrl": "[https://pemc.coop/smart_energy/rebate-to-help-you-save/](https://pemc.coop/smart_energy/rebate-to-help-you-save/)",
"websiteUrl": "[https://pemc.coop/smart_energy/rebate-to-help-you-save/](https://pemc.coop/smart_energy/rebate-to-help-you-save/)",
"sourceUrlsChecked": [
"[https://pemc.coop/smart_energy/rebate-to-help-you-save/](https://pemc.coop/smart_energy/rebate-to-help-you-save/)",
"[https://pemc.coop/smart_energy/loan-program/](https://pemc.coop/smart_energy/loan-program/)"
],
"evidenceText": "The current Piedmont rebate page lists smart thermostat, attic insulation and duct sealing, replacement electric heat pumps including mini-splits, heat-pump water heaters, A/C systems, pool pumps, EV bill credits, and load management.",
"reasoningNotes": "The prior EV charger match should be narrowed: rebates support EV notification or EV time-of-day enrollment, while Level 2 charger financing appears in the separate loan program."
}
],
"continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:4554"
}
