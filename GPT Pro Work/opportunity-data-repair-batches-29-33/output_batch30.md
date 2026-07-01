
{
"schemaVersion": "opportunity_data_research_repairs.v1",
"researchedAt": "2026-07-01",
"source": "gpt_pro",
"repairs": [
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:4362",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"VA"
],
"counties": [],
"cities": [],
"utilityTerritories": [],
"notes": "Virginia statewide personal income tax deduction for qualifying individual taxpayers."
},
"eligibleApplicantTypes": [
"individual_taxpayer",
"resident_tax_filer"
],
"eligibleSectors": [
"residential"
],
"eligibleRetrofitCategories": [
"energy_star_residential_clothes_washer",
"energy_star_residential_room_air_conditioner",
"energy_star_residential_dishwasher",
"energy_star_residential_refrigerator",
"fuel_cell_system",
"gas_heat_pump_hvac",
"electric_heat_pump_hvac",
"heat_pump_water_heater",
"central_air_conditioner_replacement",
"high_efficiency_gas_water_heater",
"high_efficiency_oil_water_heater",
"high_efficiency_oil_boiler",
"high_efficiency_oil_furnace",
"programmable_thermostat"
],
"hardRequirements": [
"Deduction is limited to 20% of Virginia sales tax paid on specified energy-efficient equipment or appliances.",
"Annual deduction cap is $500 for an individual filer or $1,000 for married taxpayers filing jointly.",
"Equipment must match the specific ENERGY STAR or statutory efficiency criteria listed in Virginia law.",
"Qualifying purchases must be for the taxpayer's own use."
],
"blockers": [
"Not a rebate program.",
"Do not match broad commercial refrigeration, commercial kitchen, or commercial dishwasher categories.",
"Do not generalize to all HVAC replacement; only the listed heat pumps, central air conditioners, boilers, furnaces, water heaters, and thermostats qualify.",
"Benefit is based only on the Virginia sales tax paid, not the full installed cost."
],
"programType": "Personal Tax Deduction",
"administrator": "Virginia Department of Taxation",
"applicationUrl": null,
"websiteUrl": "[https://www.tax.virginia.gov/deductions](https://www.tax.virginia.gov/deductions)",
"sourceUrlsChecked": [
"[https://www.tax.virginia.gov/deductions](https://www.tax.virginia.gov/deductions)",
"[https://law.lis.virginia.gov/vacodefull/title58.1/chapter3/article2/](https://law.lis.virginia.gov/vacodefull/title58.1/chapter3/article2/)",
"[https://programs.dsireusa.org/system/program/detail/4362/income-tax-deduction-for-energy-efficient-products](https://programs.dsireusa.org/system/program/detail/4362/income-tax-deduction-for-energy-efficient-products)"
],
"evidenceText": "Virginia Tax and current Virginia Code allow individuals to deduct 20% of sales tax paid on specified ENERGY STAR appliances and listed equipment, capped at $500 or $1,000 for joint filers.",
"reasoningNotes": "Official tax and statutory sources support a narrow personal income tax deduction, not a broad retrofit rebate. Prompt target citation retained: "
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5248",
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
"Jones-Onslow EMC"
],
"notes": "Available to residential Jones-Onslow EMC members in the cooperative's North Carolina service territory."
},
"eligibleApplicantTypes": [
"residential_member",
"electric_utility_customer"
],
"eligibleSectors": [
"residential"
],
"eligibleRetrofitCategories": [
"energy_star_residential_appliances",
"air_source_heat_pump_hvac",
"heat_pump_hvac_retrofit",
"heat_pump_water_heater",
"level_2_ev_charger_installation"
],
"hardRequirements": [
"Applicant must be a Jones-Onslow EMC residential member.",
"HVAC rebate applies to qualifying ENERGY STAR-rated heat pumps and air-to-air heat pumps meeting the stated SEER or SEER2 threshold.",
"Heat pump water heater rebate applies to newly installed units of 55 gallons or less.",
"Level 2 EV charger rebate applies to new residential chargers purchased and installed during the current program year."
],
"blockers": [
"Residential ENERGY STAR appliance rebates are not commercial kitchen or commercial dishwasher incentives.",
"No current official support found for commercial refrigeration equipment under this residential program.",
"Do not match broad HVAC replacement unless the project is a qualifying heat pump.",
"EV charging is limited to residential Level 2 chargers."
],
"programType": "Rebate Program",
"administrator": "Jones-Onslow EMC",
"applicationUrl": null,
"websiteUrl": "[https://joemc.com/energywise/products-rebates/](https://joemc.com/energywise/products-rebates/)",
"sourceUrlsChecked": [
"[https://joemc.com/energywise/products-rebates/](https://joemc.com/energywise/products-rebates/)",
"[https://formstack.io/1B5B7](https://formstack.io/1B5B7)",
"[https://formstack.io/D2646](https://formstack.io/D2646)",
"[https://formstack.io/B9CDF](https://formstack.io/B9CDF)",
"[https://programs.dsireusa.org/system/program/detail/5248/jones-onslow-emc-residential-energy-efficiency-rebate-program](https://programs.dsireusa.org/system/program/detail/5248/jones-onslow-emc-residential-energy-efficiency-rebate-program)"
],
"evidenceText": "Jones-Onslow EMC lists residential rebates for ENERGY STAR appliances, qualifying heat pumps, heat pump water heaters, and new Level 2 EV chargers for residential members.",
"reasoningNotes": "The correct matches are residential product categories. Commercial dishwasher and refrigeration matches are false positives from appliance terminology."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2541",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"MN"
],
"counties": [
"Wabasha"
],
"cities": [
"Lake City"
],
"utilityTerritories": [
"Lake City Utilities"
],
"notes": "Business rebates are offered through Lake City Utilities and Southern Minnesota Municipal Power Agency resources for Lake City utility customers."
},
"eligibleApplicantTypes": [
"commercial_customer",
"industrial_customer",
"municipal_utility_customer"
],
"eligibleSectors": [
"commercial",
"industrial"
],
"eligibleRetrofitCategories": [
"led_lighting_retrofit",
"commercial_cooling_equipment",
"air_source_heat_pump_hvac",
"ground_source_geothermal_heat_pump",
"water_source_heat_pump",
"heat_pump_hvac_retrofit",
"commercial_hvac_controls",
"variable_frequency_drive_retrofit",
"high_efficiency_hvac_fans_and_clean_water_pumps",
"commercial_refrigeration_equipment",
"commercial_food_service_equipment",
"vending_machine_controls",
"guestroom_energy_management",
"commercial_aerosol_duct_sealing",
"premium_efficiency_motors",
"compressed_air_equipment",
"compressed_air_leak_repair",
"retrocommissioning",
"custom_energy_efficiency"
],
"hardRequirements": [
"Applicant must be a Lake City Utilities business customer.",
"Measures must use the applicable SMMPA or Lake City business rebate forms and meet listed eligibility criteria.",
"Custom, industrial, compressed-air, and retrocommissioning measures may require preapproval or project-specific review.",
"Equipment must be commercial or industrial equipment where specified."
],
"blockers": [
"Do not infer residential appliances, home weatherization, or residential HVAC from this commercial and industrial program.",
"Refrigeration should be treated as commercial refrigeration equipment, not residential refrigeration.",
"Walk-in cooler or anti-sweat heater controls should be matched only if the current rebate form specifically supports those submeasures.",
"Tune-ups and retrocommissioning are service or optimization measures and should not be treated as simple equipment replacement."
],
"programType": "Rebate Program",
"administrator": "Lake City Utilities",
"applicationUrl": null,
"websiteUrl": "[https://smmpa.com/members/lake-city](https://smmpa.com/members/lake-city)",
"sourceUrlsChecked": [
"[https://www.saveenergyinlakecity.com](https://www.saveenergyinlakecity.com)",
"[https://smmpa.com/members/lake-city](https://smmpa.com/members/lake-city)",
"[https://www.ci.lake-city.mn.us/index.asp?DE=ECE0DA59-FB2C-4A85-BAF3-E31DB83E720D&SEC=F6B14231-8ACA-4C65-9BFE-81C8655E8120](https://www.ci.lake-city.mn.us/index.asp?DE=ECE0DA59-FB2C-4A85-BAF3-E31DB83E720D&SEC=F6B14231-8ACA-4C65-9BFE-81C8655E8120)",
"[https://programs.dsireusa.org/system/program/detail/2541/lake-city-utilities-commercial-and-industrial-energy-efficiency-rebate-program](https://programs.dsireusa.org/system/program/detail/2541/lake-city-utilities-commercial-and-industrial-energy-efficiency-rebate-program)"
],
"evidenceText": "The current SMMPA Lake City page lists 2026 business rebates for lighting, HVAC, refrigeration, food service, guestroom controls, motors, compressed air, retrocommissioning, and custom projects.",
"reasoningNotes": "The official current program is broad for business energy efficiency, but the target categories must remain commercial and industrial rather than residential."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3616",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"FL"
],
"counties": [
"Polk"
],
"cities": [
"Lakeland"
],
"utilityTerritories": [
"Lakeland Electric"
],
"notes": "Available to current residential Lakeland Electric customers in the Lakeland Electric service area."
},
"eligibleApplicantTypes": [
"residential_customer",
"electric_utility_customer"
],
"eligibleSectors": [
"residential"
],
"eligibleRetrofitCategories": [
"air_source_heat_pump_hvac",
"ductless_mini_split_heat_pump",
"high_efficiency_central_air_conditioner_with_gas_furnace",
"attic_insulation_upgrade",
"heat_pump_water_heater",
"energy_star_residential_refrigerator",
"energy_star_residential_clothes_washer",
"smart_wifi_thermostat",
"variable_speed_pool_pump"
],
"hardRequirements": [
"Applicant must be a current residential Lakeland Electric customer.",
"Rebate requests must be submitted within 90 days where the program specifies this deadline.",
"Heat pump replacement must meet the minimum SEER2 requirement and use required contractor documentation.",
"Attic insulation requires inspection before installation and must raise attic insulation to the required R-value.",
"Heat pump water heater, refrigerator, clothes washer, pool pump, and thermostat rebates must meet the listed qualifying product requirements."
],
"blockers": [
"Do not match commercial refrigeration or commercial laundry equipment.",
"HVAC maintenance rebates are service measures, not physical retrofit categories.",
"Straight-cool air conditioning with electric resistance heating is excluded from the heat-pump rebate.",
"New construction is excluded from the heat-pump replacement rebate."
],
"programType": "Rebate Program",
"administrator": "Lakeland Electric",
"applicationUrl": null,
"websiteUrl": "[https://lakelandelectric.com/programs-and-services/energy](https://lakelandelectric.com/programs-and-services/energy)",
"sourceUrlsChecked": [
"[https://lakelandelectric.com/programs-and-services/energy](https://lakelandelectric.com/programs-and-services/energy)",
"[https://cdn.kubra.com/a_published/lakelandelectric/assets-docs/rebate%20application%20october%201.2024.pdf](https://cdn.kubra.com/a_published/lakelandelectric/assets-docs/rebate%20application%20october%201.2024.pdf)",
"[https://cdn.kubra.com/a_published/LakelandElectric/assets-docs/Lakeland%20Electric%20Service%20Area%20Map.pdf](https://cdn.kubra.com/a_published/LakelandElectric/assets-docs/Lakeland%20Electric%20Service%20Area%20Map.pdf)",
"[https://programs.dsireusa.org/system/program/detail/3616/lakeland-electric-residential-conservation-rebate-program](https://programs.dsireusa.org/system/program/detail/3616/lakeland-electric-residential-conservation-rebate-program)"
],
"evidenceText": "Lakeland Electric lists residential rebates for ENERGY STAR appliances, heat pump water heaters, Wi-Fi thermostats, pool pumps, attic insulation, and qualifying heat-pump HVAC replacements.",
"reasoningNotes": "The residential appliance matches must be product-specific. Refrigeration is a household refrigerator rebate, not commercial refrigeration."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22120",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"FL"
],
"counties": [
"Polk"
],
"cities": [
"Lakeland"
],
"utilityTerritories": [
"Lakeland Electric"
],
"notes": "Available to qualifying Lakeland Electric residential customers who own and occupy the property in the utility service area."
},
"eligibleApplicantTypes": [
"residential_customer",
"homeowner",
"owner_occupant",
"electric_utility_customer"
],
"eligibleSectors": [
"residential"
],
"eligibleRetrofitCategories": [
"residential_energy_efficiency_financing",
"window_replacement",
"air_source_heat_pump_hvac",
"heat_pump_water_heater",
"air_sealing_weatherization",
"duct_sealing",
"insulation_upgrade",
"attic_insulation_upgrade",
"wall_insulation_upgrade",
"floor_insulation_upgrade",
"rooftop_solar_pv",
"ground_source_geothermal_heat_pump",
"solar_water_heating"
],
"hardRequirements": [
"Loan amount must be at least $500 and no more than $5,000.",
"Applicant must be a Lakeland Electric customer for at least one year.",
"Applicant must own and occupy the property full time.",
"Applicant must meet the utility's credit criteria and accept the lien, recording, and release requirements.",
"Solar PV financing is limited to homes with RESNET HERS rating of 80 or below.",
"Loan funds may be used only for eligible upgrades and rebates or incentives are deducted from the financed amount."
],
"blockers": [
"This is financing, not a rebate.",
"Renters and non-owner-occupied properties are not eligible.",
"Do not match commercial or industrial projects.",
"Solar PV is not broadly eligible unless the HERS-rating condition is met.",
"Projects must comply with current codes and program financing rules."
],
"programType": "Loan Program",
"administrator": "Lakeland Electric",
"applicationUrl": "[https://cdn.kubra.com/a/lakelandelectric/assets-docs/REEnergize%20Lakeland%20Finance%20Customer%20Application.pdf](https://cdn.kubra.com/a/lakelandelectric/assets-docs/REEnergize%20Lakeland%20Finance%20Customer%20Application.pdf)",
"websiteUrl": "[https://lakelandelectric.com/programs-and-services/energy](https://lakelandelectric.com/programs-and-services/energy)",
"sourceUrlsChecked": [
"[https://lakelandelectric.com/programs-and-services/energy](https://lakelandelectric.com/programs-and-services/energy)",
"[https://cdn.kubra.com/a/lakelandelectric/assets-docs/REEnergize%20Lakeland%20Finance%20Customer%20Application.pdf](https://cdn.kubra.com/a/lakelandelectric/assets-docs/REEnergize%20Lakeland%20Finance%20Customer%20Application.pdf)",
"[https://programs.dsireusa.org/system/program/detail/22120/lakeland-electric-residential-energy-efficiency-loan-program](https://programs.dsireusa.org/system/program/detail/22120/lakeland-electric-residential-energy-efficiency-loan-program)"
],
"evidenceText": "Lakeland Electric's REEnergize program offers interest-free residential loans for eligible windows, HVAC, water heating, air sealing, insulation, solar PV with HERS limits, geothermal, and solar water heating.",
"reasoningNotes": "Financing categories should not be treated like rebate measures. Eligibility is limited by ownership, occupancy, credit, customer history, and loan caps."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22080",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"NH"
],
"counties": [],
"cities": [],
"utilityTerritories": [
"Liberty Utilities New Hampshire natural gas"
],
"notes": "Applies to Liberty Utilities New Hampshire residential natural gas customers, with some measures delivered through NHSaves."
},
"eligibleApplicantTypes": [
"residential_gas_customer",
"homeowner",
"renter",
"income_qualified_customer"
],
"eligibleSectors": [
"residential"
],
"eligibleRetrofitCategories": [
"air_sealing_weatherization",
"insulation_upgrade",
"high_efficiency_gas_boiler",
"high_efficiency_gas_furnace",
"high_efficiency_gas_water_heater",
"tankless_gas_water_heater",
"indirect_gas_water_heater",
"boiler_reset_control",
"programmable_thermostat",
"smart_wifi_thermostat",
"weatherization_financing"
],
"hardRequirements": [
"Applicant must be a Liberty Utilities New Hampshire residential natural gas customer for gas equipment rebates.",
"Heating and water-heating equipment must meet listed NHSaves or Liberty program efficiency requirements.",
"Weatherization incentives require participation through the home energy audit or Home Performance pathway.",
"Funding is limited and offered first come, first served.",
"Installations may require licensed contractors, program inspections, or application deadlines."
],
"blockers": [
"Do not match residential clothes washer rebates to this Liberty gas program without a current official Liberty gas source.",
"Do not include electric heat pumps or electric heat pump water heaters unless covered by a separate electric utility program.",
"Measures must reduce natural gas use or meet the relevant gas-program rules.",
"Keene and other special gas-service cases may require fuel verification."
],
"programType": "Rebate Program",
"administrator": "Liberty Utilities New Hampshire",
"applicationUrl": null,
"websiteUrl": "[https://new-hampshire.libertyutilities.com/allenstown/residential/smart-energy-use/natural-gas/index.html](https://new-hampshire.libertyutilities.com/allenstown/residential/smart-energy-use/natural-gas/index.html)",
"sourceUrlsChecked": [
"[https://new-hampshire.libertyutilities.com/allenstown/residential/smart-energy-use/natural-gas/index.html](https://new-hampshire.libertyutilities.com/allenstown/residential/smart-energy-use/natural-gas/index.html)",
"[https://new-hampshire.libertyutilities.com/allenstown/residential/smart-energy-use/natural-gas/commercial-landing-gas-programs.html](https://new-hampshire.libertyutilities.com/allenstown/residential/smart-energy-use/natural-gas/commercial-landing-gas-programs.html)",
"[https://new-hampshire.libertyutilities.com/berlin/residential/smart-energy-use/natural-gas/rebates-heating-and-hot-water.html](https://new-hampshire.libertyutilities.com/berlin/residential/smart-energy-use/natural-gas/rebates-heating-and-hot-water.html)",
"[https://new-hampshire.libertyutilities.com/allenstown/residential/smart-energy-use/natural-gas/energy-audits-and-insulation.html](https://new-hampshire.libertyutilities.com/allenstown/residential/smart-energy-use/natural-gas/energy-audits-and-insulation.html)",
"[https://nhsaves.com/residential/natural-gas-heating-equipment/](https://nhsaves.com/residential/natural-gas-heating-equipment/)",
"[https://nhsaves.com/residential/weatherization/](https://nhsaves.com/residential/weatherization/)",
"[https://programs.dsireusa.org/system/program/detail/22080/liberty-utilities-gas-residential-energy-efficiency-programs](https://programs.dsireusa.org/system/program/detail/22080/liberty-utilities-gas-residential-energy-efficiency-programs)"
],
"evidenceText": "Liberty and NHSaves current pages list residential gas heating, gas water-heating, thermostats, boiler controls, air sealing, insulation, audits, and weatherization financing for eligible gas customers.",
"reasoningNotes": "The clothes washer match is not supported by current Liberty gas sources and should be blocked unless a separate current appliance program is verified."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22485",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"IA"
],
"counties": [
"Linn",
"Johnson",
"Jones",
"Cedar",
"Iowa",
"Benton"
],
"cities": [],
"utilityTerritories": [
"Corridor Energy Cooperative",
"Linn County Rural Electric Cooperative"
],
"notes": "Linn County REC now operates as Corridor Energy Cooperative. Service is primarily rural and suburban Linn and Johnson counties, with line extensions into nearby counties."
},
"eligibleApplicantTypes": [
"large_commercial_customer",
"industrial_customer",
"agricultural_customer",
"electric_cooperative_member"
],
"eligibleSectors": [
"commercial",
"industrial",
"agricultural"
],
"eligibleRetrofitCategories": [
"commercial_heat_pump_vrf_system",
"air_source_heat_pump_hvac",
"ground_source_geothermal_heat_pump",
"ductless_mini_split_heat_pump",
"level_2_ev_charger_installation",
"commercial_level_2_forklift_charger",
"variable_frequency_drive_retrofit",
"custom_demand_reduction_project"
],
"hardRequirements": [
"Program is designated for large commercial, industrial, and agricultural accounts with greater than 75 kW non-coincident 15-minute demand in specified summer and winter months.",
"Custom projects must be on eligible commercial rate classes and require preapproval.",
"Commercial heat pumps and VRF systems must meet the applicable program specifications and documentation requirements.",
"Level 2 EV and forklift chargers must be served by Corridor Energy Cooperative and are capped per program rules.",
"VFDs must serve qualifying fans or pumps and meet minimum operating-hour requirements."
],
"blockers": [
"Do not match residential or small commercial accounts below the demand threshold.",
"Generic EV charger installation must be narrowed to Level 2 or eligible forklift chargers.",
"VFD rebates are not for failed-drive replacements, soft-start-only applications, or power-factor-only improvements.",
"Do not treat broad HVAC replacement as eligible unless it is a qualifying heat pump or VRF measure."
],
"programType": "Rebate Program",
"administrator": "Corridor Energy Cooperative",
"applicationUrl": null,
"websiteUrl": "[https://corridorenergy.coop/rebates/commercial-custom/](https://corridorenergy.coop/rebates/commercial-custom/)",
"sourceUrlsChecked": [
"[https://corridorenergy.coop/rebates/commercial-custom/](https://corridorenergy.coop/rebates/commercial-custom/)",
"[https://corridorenergy.coop/wp-content/uploads/2026/01/2026-Commercial-Heat-Pumps.pdf](https://corridorenergy.coop/wp-content/uploads/2026/01/2026-Commercial-Heat-Pumps.pdf)",
"[https://corridorenergy.coop/wp-content/uploads/2026/01/2026-Commercial-Rebate-Flyer.pdf](https://corridorenergy.coop/wp-content/uploads/2026/01/2026-Commercial-Rebate-Flyer.pdf)",
"[https://corridorenergy.coop/wp-content/uploads/2026/01/2026-Commercial-VFD.pdf](https://corridorenergy.coop/wp-content/uploads/2026/01/2026-Commercial-VFD.pdf)",
"[https://corridorenergy.coop/wp-content/uploads/2026/01/2026-Commercial-EV-Charger.pdf](https://corridorenergy.coop/wp-content/uploads/2026/01/2026-Commercial-EV-Charger.pdf)",
"[https://programs.dsireusa.org/system/program/detail/22485/linn-county-rural-electric-cooperative-commercial-75kw-energy-efficiency-rebate-program](https://programs.dsireusa.org/system/program/detail/22485/linn-county-rural-electric-cooperative-commercial-75kw-energy-efficiency-rebate-program)"
],
"evidenceText": "Corridor Energy lists large commercial, industrial, and agricultural incentives for heat pumps and VRF, custom demand-reduction projects, Level 2 chargers, forklift chargers, and VFDs.",
"reasoningNotes": "The former Linn County REC program remains active under Corridor Energy Cooperative branding with large-account and measure-specific limits."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2199",
"confidence": "low",
"availabilityStatus": "source_inaccessible",
"geography": {
"country": "US",
"states": [
"WA"
],
"counties": [
"Mason"
],
"cities": [],
"utilityTerritories": [
"Mason County PUD 3"
],
"notes": "Official rebate and FAQ pages were identified for Mason County PUD 3 but could not be read well enough to verify current commercial and industrial measure eligibility."
},
"eligibleApplicantTypes": [],
"eligibleSectors": [],
"eligibleRetrofitCategories": [],
"hardRequirements": [],
"blockers": [
"Official PUD 3 rebate and FAQ pages returned access errors in the browser.",
"Do not match residential appliance, insulation, thermostat, or heat-pump snippets to this commercial and industrial target without readable current official sources.",
"Outdoor lighting, heat pump water heater, insulation, thermostat, and commercial HVAC categories were not verified from an accessible current official source."
],
"programType": "Rebate Program",
"administrator": "Mason County PUD 3",
"applicationUrl": null,
"websiteUrl": "[https://www.pud3.org/ways-to-save/rebates-incentives/](https://www.pud3.org/ways-to-save/rebates-incentives/)",
"sourceUrlsChecked": [
"[https://www.pud3.org/ways-to-save/rebates-incentives/](https://www.pud3.org/ways-to-save/rebates-incentives/)",
"[https://www.pud3.org/faqs/heat-pump-incentives/](https://www.pud3.org/faqs/heat-pump-incentives/)",
"[https://www.pud3.org/faqs/ductless-heat-pump-incentives/](https://www.pud3.org/faqs/ductless-heat-pump-incentives/)",
"[https://www.pud3.org/faqs/appliance-incentives/](https://www.pud3.org/faqs/appliance-incentives/)",
"[https://www.pud3.org/faqs/insulation-incentives/](https://www.pud3.org/faqs/insulation-incentives/)",
"[https://programs.dsireusa.org/system/program/detail/2199/mason-county-pud-3-commercial-and-industrial-energy-rebates](https://programs.dsireusa.org/system/program/detail/2199/mason-county-pud-3-commercial-and-industrial-energy-rebates)"
],
"evidenceText": "PUD 3 official rebate and FAQ pages returned 403 access errors. Search snippets mention commercial heat-pump inquiries but do not expose current C&I eligibility or requirements.",
"reasoningNotes": "Because official sources were inaccessible, unsupported categories were cleared rather than inferred from snippets or DSIRE."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22091",
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
"Minnesota Energy Resources natural gas"
],
"notes": "Available to Minnesota Energy Resources residential natural gas customers or property owners at eligible new-construction installation addresses."
},
"eligibleApplicantTypes": [
"residential_gas_customer",
"property_owner",
"home_builder",
"new_home_owner"
],
"eligibleSectors": [
"residential_new_construction"
],
"eligibleRetrofitCategories": [
"high_efficiency_natural_gas_furnace",
"high_efficiency_natural_gas_boiler",
"integrated_gas_space_water_heating_system",
"advanced_or_wifi_thermostat",
"high_efficiency_natural_gas_storage_water_heater",
"tankless_gas_water_heater",
"drain_water_heat_recovery",
"energy_star_window_replacement",
"direct_vent_gas_hearth_fireplace",
"heat_recovery_ventilation",
"energy_recovery_ventilation"
],
"hardRequirements": [
"Home must qualify as new construction under the program definition, generally built within the last two years.",
"Applicant must be a current Minnesota Energy Resources customer or property owner for the installation address.",
"Measures must reduce natural gas use unless explicitly listed otherwise.",
"Applications must be submitted within the stated deadline after installation.",
"Program funds are limited and rules may change or end without notice."
],
"blockers": [
"Do not match existing-home retrofit projects unless the home meets the new-construction definition.",
"Do not match industrial waste heat recovery; the current program supports HRV/ERV and drain-water heat recovery, not industrial waste-heat projects.",
"Thermostat rebate requires control of a qualifying natural gas heating system.",
"Water-heating rebates are for qualifying natural gas equipment and drain-water heat recovery, not electric heat pump water heaters."
],
"programType": "Rebate Program",
"administrator": "Minnesota Energy Resources",
"applicationUrl": "[https://www.minnesotaenergyresources.com/partners/builders/pdf/builders_construction_rebates.pdf](https://www.minnesotaenergyresources.com/partners/builders/pdf/builders_construction_rebates.pdf)",
"websiteUrl": "[https://www.minnesotaenergyresources.com/partners/builders/construction-rebates](https://www.minnesotaenergyresources.com/partners/builders/construction-rebates)",
"sourceUrlsChecked": [
"[https://www.minnesotaenergyresources.com/partners/builders/construction-rebates](https://www.minnesotaenergyresources.com/partners/builders/construction-rebates)",
"[https://www.minnesotaenergyresources.com/partners/builders/pdf/builders_construction_rebates.pdf](https://www.minnesotaenergyresources.com/partners/builders/pdf/builders_construction_rebates.pdf)",
"[https://programs.dsireusa.org/system/program/detail/22091/minnesota-energy-resources-gas-new-construction-rebates](https://programs.dsireusa.org/system/program/detail/22091/minnesota-energy-resources-gas-new-construction-rebates)"
],
"evidenceText": "The 2026 application covers newly constructed homes and lists natural gas furnaces, boilers, integrated systems, gas water heaters, thermostats, HRV/ERV, drain-water heat recovery, ENERGY STAR windows, and gas hearths.",
"reasoningNotes": "The phrase heat recovery caused a false-positive industrial waste heat match. The supported measures are residential HRV/ERV and drain-water heat recovery."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3904",
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
"National Fuel New York natural gas"
],
"notes": "Available in National Fuel's western New York natural gas service area for eligible non-residential customers."
},
"eligibleApplicantTypes": [
"non_residential_gas_customer",
"commercial_customer",
"industrial_customer",
"agricultural_customer",
"government_customer",
"institutional_customer",
"nonprofit_customer",
"multifamily_customer"
],
"eligibleSectors": [
"commercial",
"industrial",
"agricultural",
"government",
"institutional",
"nonprofit",
"multifamily"
],
"eligibleRetrofitCategories": [
"high_efficiency_natural_gas_furnace",
"natural_gas_unit_heater",
"infrared_gas_heater",
"condensing_hot_water_boiler",
"steam_boiler_replacement",
"demand_control_ventilation",
"duct_insulation_for_gas_heating",
"pipe_insulation_for_gas_heating",
"commercial_smart_thermostat",
"air_curtain",
"air_leakage_sealing",
"opaque_shell_insulation",
"heat_recovery_ventilation",
"steam_trap_replacement",
"steam_trap_monitoring_system",
"performance_based_custom_gas_efficiency"
],
"hardRequirements": [
"Applicant must be a National Fuel non-residential natural gas customer in the eligible New York service area.",
"Measures must replace or improve qualifying natural gas equipment or reduce natural gas use under the pre-qualified or performance-based pathway.",
"Contractor installation and required federal tax identification or certificate documentation may apply.",
"Pre-qualified applications specify submission within 90 days of installation.",
"Program caps, measure limits, and conditional funding rules apply."
],
"blockers": [
"Do not list NYSERDA as the administrator; the program is administered for National Fuel, with NYSERDA-related support only as applicable.",
"New construction should not be matched under the 2026 applications that state new construction is not eligible.",
"Do not match broad residential insulation or weatherization; envelope measures are non-residential gas-saving measures under program rules.",
"Broad HVAC replacement must be limited to qualifying gas furnaces, boilers, unit heaters, infrared heaters, and gas-saving controls.",
"Duct insulation must serve heating systems using gas combustion equipment."
],
"programType": "Rebate Program",
"administrator": "National Fuel Gas Distribution Corporation",
"applicationUrl": "[https://fuelingtomorrowtoday.com/wp-content/uploads/2026/02/59865-National-Fuels_Non-Residential_Pre-Qualified_Application_2026_M.pdf](https://fuelingtomorrowtoday.com/wp-content/uploads/2026/02/59865-National-Fuels_Non-Residential_Pre-Qualified_Application_2026_M.pdf)",
"websiteUrl": "[https://fuelingtomorrowtoday.com/non-residential-customers/about-the-non-residential-program/](https://fuelingtomorrowtoday.com/non-residential-customers/about-the-non-residential-program/)",
"sourceUrlsChecked": [
"[https://fuelingtomorrowtoday.com/non-residential-customers/about-the-non-residential-program/](https://fuelingtomorrowtoday.com/non-residential-customers/about-the-non-residential-program/)",
"[https://fuelingtomorrowtoday.com/wp-content/uploads/2026/02/59865-National-Fuels_Non-Residential_Pre-Qualified_Application_2026_M.pdf](https://fuelingtomorrowtoday.com/wp-content/uploads/2026/02/59865-National-Fuels_Non-Residential_Pre-Qualified_Application_2026_M.pdf)",
"[https://fuelingtomorrowtoday.com/wp-content/uploads/2026/04/National-Fuels_Non-Residential_PerformanceBased_Application_2026_M2.pdf](https://fuelingtomorrowtoday.com/wp-content/uploads/2026/04/National-Fuels_Non-Residential_PerformanceBased_Application_2026_M2.pdf)",
"[https://programs.dsireusa.org/system/program/detail/3904/national-fuel-gas-commercial-energy-efficiency-program](https://programs.dsireusa.org/system/program/detail/3904/national-fuel-gas-commercial-energy-efficiency-program)"
],
"evidenceText": "National Fuel's current non-residential materials list gas furnaces, boilers, unit heaters, thermostats, duct and pipe insulation, air curtains, ventilation, steam traps, and performance-based gas-saving projects.",
"reasoningNotes": "The supported categories are non-residential natural-gas measures. Duct and envelope insulation are eligible only within the program's gas-saving context."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3327",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"NE"
],
"counties": [],
"cities": [],
"utilityTerritories": [
"Nebraska Public Power District",
"participating wholesale utilities"
],
"notes": "EnergyWise incentives are available through NPPD and participating local utilities in Nebraska, subject to each program's rules."
},
"eligibleApplicantTypes": [
"commercial_customer",
"industrial_customer",
"large_commercial_customer",
"master_metered_multifamily_customer",
"participating_local_utility_customer"
],
"eligibleSectors": [
"commercial",
"industrial",
"large_commercial",
"multifamily"
],
"eligibleRetrofitCategories": [
"led_lighting_retrofit",
"commercial_hvac_equipment",
"air_source_heat_pump_hvac",
"ground_source_geothermal_heat_pump",
"water_source_heat_pump",
"heat_pump_water_heater",
"variable_frequency_drive_retrofit",
"industrial_process_efficiency",
"compressed_air_efficiency",
"commercial_refrigeration_efficiency",
"process_chiller_optimization",
"custom_led_lighting_retrofit",
"hvac_system_optimization"
],
"hardRequirements": [
"Lighting incentives generally apply to existing facilities and require qualifying listed products.",
"Commercial HVAC equipment must meet listed equipment categories and AHRI or program documentation requirements.",
"VFD incentives are limited to qualifying industrial or large commercial fan and pump applications and horsepower limits.",
"Industrial process incentives require preapproval and must meet payback and invoice limits.",
"Heat pump water heater incentives must meet the listed efficiency thresholds and be paid through the local utility where applicable."
],
"blockers": [
"Do not infer residential appliances or home weatherization from this commercial program.",
"New construction does not qualify for prescriptive lighting and some VFD applications.",
"VFD incentives do not cover existing VFD replacements, single-phase drives, or ineligible new-construction HVAC pumps and fans.",
"Industrial process projects need preapproval and cannot be projects already covered by other programs.",
"Heat pump water heater matching should follow the specific business-page terms and local utility delivery rules."
],
"programType": "Rebate Program",
"administrator": "Nebraska Public Power District",
"applicationUrl": null,
"websiteUrl": "[https://nppd.energywisenebraska.com/business/](https://nppd.energywisenebraska.com/business/)",
"sourceUrlsChecked": [
"[https://www.nppd.com/save-money](https://www.nppd.com/save-money)",
"[https://nppd.energywisenebraska.com/business/](https://nppd.energywisenebraska.com/business/)",
"[https://docs.nppd.com/FileDownload.aspx?Filename=Board%2F2026%2FMay4.pdf](https://docs.nppd.com/FileDownload.aspx?Filename=Board%2F2026%2FMay4.pdf)",
"[https://programs.dsireusa.org/system/program/detail/3327/nebraska-public-power-district-commercial-energy-efficiency-rebate-programs](https://programs.dsireusa.org/system/program/detail/3327/nebraska-public-power-district-commercial-energy-efficiency-rebate-programs)"
],
"evidenceText": "NPPD EnergyWise business pages list incentives for commercial lighting, HVAC, heat pumps, heat pump water heaters, VFDs, industrial process efficiency, refrigeration, compressed air, and HVAC optimization.",
"reasoningNotes": "The existing matches are mostly supported, but each should retain commercial, industrial, and program-specific restrictions rather than residential assumptions."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5727",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"IN"
],
"counties": [],
"cities": [],
"utilityTerritories": [
"NIPSCO"
],
"notes": "Available to eligible NIPSCO business gas and electric customers on qualifying rates in Indiana."
},
"eligibleApplicantTypes": [
"business_customer",
"commercial_customer",
"industrial_customer",
"agricultural_customer",
"government_customer",
"institutional_customer",
"nonprofit_customer",
"small_business_customer"
],
"eligibleSectors": [
"commercial",
"industrial",
"agricultural",
"government",
"institutional",
"nonprofit",
"small_business"
],
"eligibleRetrofitCategories": [
"led_lighting_retrofit",
"high_efficiency_natural_gas_furnace",
"high_efficiency_hot_water_boiler",
"steam_boiler_replacement",
"boiler_hot_water_lockout_reset_control",
"boiler_tune_up",
"furnace_tune_up",
"commercial_heating_steam_trap_replacement",
"pipe_insulation_for_gas_heating",
"commercial_smart_thermostat",
"high_efficiency_refrigeration_equipment",
"refrigerated_display_case_led_lighting",
"evaporator_fan_controls",
"walk_in_cooler_freezer_controls",
"door_heater_controls",
"ecm_refrigeration_motors",
"variable_speed_refrigeration_condenser_fans",
"custom_energy_efficiency",
"retrocommissioning"
],
"hardRequirements": [
"Applicant must be a NIPSCO business customer on an eligible electric or non-transport-only natural gas rate.",
"Prescriptive incentives over the stated threshold require preapproval.",
"Custom incentives require preapproval and must meet program rules.",
"Small business direct-install projects must meet the program's replacement and completion requirements.",
"Applications must be submitted within the applicable program deadline after project completion."
],
"blockers": [
"Do not match burner retrofit as a standalone category; current prescriptive materials support boilers, lockout/reset controls, tune-ups, furnaces, steam traps, and related gas measures.",
"Refrigeration measures are commercial refrigeration measures, not residential refrigerators.",
"Lighting measures must be eligible business measures and not residential lighting.",
"Program eligibility depends on NIPSCO rate class and whether the customer has opted out.",
"Steam trap measures are commercial heating measures, not compressed-air retrofits."
],
"programType": "Rebate Program",
"administrator": "NIPSCO",
"applicationUrl": "[https://www.nipsco.com/docs/librariesprovider11/energy-efficiency/prescriptive-incentive-program/prescriptive-incentive-list.pdf](https://www.nipsco.com/docs/librariesprovider11/energy-efficiency/prescriptive-incentive-program/prescriptive-incentive-list.pdf)",
"websiteUrl": "[https://www.nipsco.com/energy-efficiency/for-your-business](https://www.nipsco.com/energy-efficiency/for-your-business)",
"sourceUrlsChecked": [
"[https://www.nipsco.com/energy-efficiency/for-your-business](https://www.nipsco.com/energy-efficiency/for-your-business)",
"[https://www.nipsco.com/energy-efficiency/for-your-business/small-business-direct-install-program](https://www.nipsco.com/energy-efficiency/for-your-business/small-business-direct-install-program)",
"[https://www.nipsco.com/energy-efficiency/for-your-business/custom-incentive-program](https://www.nipsco.com/energy-efficiency/for-your-business/custom-incentive-program)",
"[https://www.nipsco.com/docs/librariesprovider11/energy-efficiency/prescriptive-incentive-program/prescriptive-incentive-list.pdf](https://www.nipsco.com/docs/librariesprovider11/energy-efficiency/prescriptive-incentive-program/prescriptive-incentive-list.pdf)",
"[https://programs.dsireusa.org/system/program/detail/5727/nipsco-gas-and-electric-commercial-and-industrial-energy-efficiency-program](https://programs.dsireusa.org/system/program/detail/5727/nipsco-gas-and-electric-commercial-and-industrial-energy-efficiency-program)"
],
"evidenceText": "NIPSCO business materials list prescriptive and custom incentives for lighting, gas HVAC, boilers, controls, steam traps, pipe insulation, thermostats, refrigeration, custom projects, and retrocommissioning.",
"reasoningNotes": "The boiler, refrigeration, lighting, and steam-trap matches are supported. The original burner match should be narrowed because no standalone burner retrofit was verified."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:4565",
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
"OG&E Oklahoma"
],
"notes": "This repair uses the Oklahoma residential rebate tab for OG&E customers; Arkansas measures are separate and should not be inferred for Oklahoma."
},
"eligibleApplicantTypes": [
"residential_customer",
"homeowner",
"renter"
],
"eligibleSectors": [
"residential"
],
"eligibleRetrofitCategories": [
"attic_insulation_upgrade",
"energy_star_window_replacement",
"energy_star_exterior_door_replacement",
"energy_star_smart_thermostat",
"hvac_burnout_replacement",
"air_sealing_weatherization",
"duct_sealing_and_repair"
],
"hardRequirements": [
"Applicant must be an eligible OG&E residential customer.",
"Renters need landlord approval where direct-install or home improvement services are provided.",
"Oklahoma rebate measures must follow the Oklahoma rebate tab and applicable program requirements.",
"Income-qualified upgrades are subject to program qualification and limits.",
"Equipment or envelope products must meet the listed ENERGY STAR or program criteria."
],
"blockers": [
"Level 2 EV charging is part of OG&E electric vehicle information or a separate offering and was not verified as part of this residential efficiency rebate target.",
"Do not use Arkansas-tab measures to match Oklahoma customers unless the opportunity is explicitly repaired for Arkansas.",
"HVAC burnout replacement is not a general HVAC upgrade rebate.",
"HVAC tune-ups are service measures and should not be treated as physical retrofit categories unless separately modeled."
],
"programType": "Rebate Program",
"administrator": "OG&E",
"applicationUrl": null,
"websiteUrl": "[https://www.oge.com/web/portal/label_ord/energy-solutions/efficiency-programs/rebates](https://www.oge.com/web/portal/label_ord/energy-solutions/efficiency-programs/rebates)",
"sourceUrlsChecked": [
"[https://www.oge.com/web/portal/label_ord/energy-solutions/efficiency-programs/rebates](https://www.oge.com/web/portal/label_ord/energy-solutions/efficiency-programs/rebates)",
"[https://www.oge.com/web/portal/label_ord/energy-solutions/efficiency-programs/residential-energy-efficiency](https://www.oge.com/web/portal/label_ord/energy-solutions/efficiency-programs/residential-energy-efficiency)",
"[https://www.oge.com/web/portal/label_ord/energy-solutions/electricvehicles](https://www.oge.com/web/portal/label_ord/energy-solutions/electricvehicles)",
"[https://programs.dsireusa.org/system/program/detail/4565/og-and-e-residential-energy-efficiency-program](https://programs.dsireusa.org/system/program/detail/4565/og-and-e-residential-energy-efficiency-program)"
],
"evidenceText": "OG&E's Oklahoma residential rebate page lists attic insulation, ENERGY STAR windows and doors, ENERGY STAR smart thermostats, and HVAC burnout replacement, with separate residential efficiency services.",
"reasoningNotes": "The envelope and thermostat matches are supported for Oklahoma. EV charging should be blocked for this opportunity because it belongs to a separate EV information or rebate context."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3590",
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
"Oklahoma Electric Cooperative"
],
"notes": "Available exclusively to Oklahoma Electric Cooperative electric members in the cooperative service territory."
},
"eligibleApplicantTypes": [
"residential_member",
"electric_cooperative_member",
"small_commercial_customer",
"school",
"nonprofit"
],
"eligibleSectors": [
"residential",
"small_commercial",
"education",
"nonprofit"
],
"eligibleRetrofitCategories": [
"modulating_dual_fuel_heat_pump_new_construction",
"ductless_mini_split_heat_pump",
"new_home_led_lighting_bundle",
"water_heater_timer",
"level_2_ev_charger_installation",
"ground_source_geothermal_heat_pump",
"programmable_thermostat",
"gas_heat_to_dual_fuel_heat_pump_conversion",
"electric_resistance_to_ductless_mini_split_conversion",
"small_commercial_led_lighting_retrofit"
],
"hardRequirements": [
"Applicant must be an OEC electric member, not only an OEC Fiber customer.",
"All rebates are subject to OEC verification and funding availability.",
"New home rebates require homes permitted within the stated recent-construction period.",
"EV charger rebate requires Level 2 charging and scheduled off-peak charging as specified.",
"Ductless mini-split and heat-pump conversion rebates must meet backup-heating and efficiency requirements.",
"Small commercial LED conversion is prioritized for schools and nonprofits and has account caps."
],
"blockers": [
"Do not match broad residential LED lighting retrofit except as part of the new-home bundle or eligible small-commercial conversion.",
"Do not match generic EV charging; only qualifying Level 2 charging with the required schedule is supported.",
"Ductless mini-split conversions with electric resistance backup do not qualify.",
"Home energy consultation is an audit or service and not a physical retrofit category.",
"OEC Fiber-only customers using another electric provider are not eligible."
],
"programType": "Rebate Program",
"administrator": "Oklahoma Electric Cooperative",
"applicationUrl": null,
"websiteUrl": "[https://okcoop.org/rebates/](https://okcoop.org/rebates/)",
"sourceUrlsChecked": [
"[https://okcoop.org/rebates/](https://okcoop.org/rebates/)",
"[https://okcoop.org/wp-content/uploads/2025/07/2025-Rebate-Program-Proposal-for-website.pdf](https://okcoop.org/wp-content/uploads/2025/07/2025-Rebate-Program-Proposal-for-website.pdf)",
"[https://programs.dsireusa.org/system/program/detail/3590/oklahoma-electric-cooperative-energy-efficiency-rebate-program](https://programs.dsireusa.org/system/program/detail/3590/oklahoma-electric-cooperative-energy-efficiency-rebate-program)"
],
"evidenceText": "OEC's rebate materials list member-only incentives for geothermal, Level 2 EV charging, water-heater timers, programmable thermostats, heat-pump conversions, new-home measures, and small commercial LED conversions.",
"reasoningNotes": "Most target categories are supported only with narrow OEC-specific conditions. LED and EV matches need strict program-boundary handling."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:4525",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"OK"
],
"counties": [],
"cities": [
"Altus",
"Blackwell",
"Comanche",
"Copan",
"Cordell",
"Duncan",
"Edmond",
"Eldorado",
"Fairview",
"Fort Supply",
"Frederick",
"Geary",
"Goltry",
"Granite",
"Hominy",
"Kingfisher",
"Laverne",
"Lexington",
"Mangum",
"Manitou",
"Marlow",
"Mooreland",
"Newkirk",
"Okeene",
"Olustee",
"Orlando",
"Pawhuska",
"Perry",
"Ponca City",
"Pond Creek",
"Prague",
"Purcell",
"Ryan",
"Spiro",
"Tecumseh",
"Tonkawa",
"Walters",
"Watonga",
"Waynoka",
"Wetumka",
"Wynnewood",
"Yale"
],
"utilityTerritories": [
"participating OMPA member municipal utilities"
],
"notes": "Rebates are only for electric customers of participating OMPA member cities. Participation differs by heat pump, ceiling insulation, water heater, smart thermostat, and related WISE offerings."
},
"eligibleApplicantTypes": [
"residential_electric_customer",
"municipal_utility_customer",
"subdivision_homebuilder",
"commercial_customer",
"industrial_customer"
],
"eligibleSectors": [
"residential",
"commercial",
"industrial",
"new_construction"
],
"eligibleRetrofitCategories": [
"ground_source_geothermal_heat_pump",
"air_source_heat_pump_hvac",
"dual_fuel_heat_pump",
"heat_pump_hvac_retrofit",
"ceiling_insulation_attic_upgrade",
"electric_resistance_water_heater",
"heat_pump_water_heater",
"gas_to_electric_water_heater_conversion",
"smart_thermostat",
"demand_response_smart_thermostat_enrollment"
],
"hardRequirements": [
"Applicant must be an electric customer of a participating OMPA member city.",
"Heat pump projects require a home energy audit before work is completed where specified.",
"Commercial and industrial WISE heat-pump eligibility is limited to HVAC units below the listed capacity threshold; larger projects use the separate DEEP pathway.",
"Ceiling insulation requires pre-installation audit, qualifying attic or roof area, and final insulation level requirements.",
"Water heater rebates require eligible electric or heat pump water heaters and inspections or documentation within program deadlines.",
"Smart thermostats must meet ENERGY STAR, Wi-Fi, control, usage, and functional requirements."
],
"blockers": [
"Air sealing is not verified as a WISE rebate measure and should not be matched under this opportunity.",
"Do not match broad weatherization; ceiling insulation is the supported envelope category.",
"Water heater rebates exclude tankless and gas water heaters.",
"Ceiling insulation generally excludes builders, new homes, garages, apartments, and mobile homes under the published guidelines.",
"Commercial or industrial heat pumps over the WISE capacity limit belong to OMPA DEEP, a separate program.",
"Customer city participation must be checked for the specific rebate type."
],
"programType": "Rebate Program",
"administrator": "Oklahoma Municipal Power Authority",
"applicationUrl": null,
"websiteUrl": "[https://www.ompa.com/services/rebate-programs/](https://www.ompa.com/services/rebate-programs/)",
"sourceUrlsChecked": [
"[https://www.ompa.com/services/rebate-programs/](https://www.ompa.com/services/rebate-programs/)",
"[https://www.ompa.com/wp-content/uploads/2025/03/WISE-Participation-By-City.pdf](https://www.ompa.com/wp-content/uploads/2025/03/WISE-Participation-By-City.pdf)",
"[https://www.ompa.com/wp-content/uploads/2026/01/WISE-Heat-Pump-Rebate-Program-Trifold-Brochure-2025-WEB.pdf](https://www.ompa.com/wp-content/uploads/2026/01/WISE-Heat-Pump-Rebate-Program-Trifold-Brochure-2025-WEB.pdf)",
"[https://www.ompa.com/wp-content/uploads/2025/12/Ceiling-Insulation-Rebate-Program-Guidlines-2025.pdf](https://www.ompa.com/wp-content/uploads/2025/12/Ceiling-Insulation-Rebate-Program-Guidlines-2025.pdf)",
"[https://www.ompa.com/wp-content/uploads/2025/12/WISE-Water-Heater-Rebate-Summary-2025.pdf](https://www.ompa.com/wp-content/uploads/2025/12/WISE-Water-Heater-Rebate-Summary-2025.pdf)",
"[https://www.ompa.com/wp-content/uploads/2025/12/Smart-Thermostat-Rebate-Summary-updated.pdf](https://www.ompa.com/wp-content/uploads/2025/12/Smart-Thermostat-Rebate-Summary-updated.pdf)",
"[https://programs.dsireusa.org/system/program/detail/4525/oklahoma-municipal-power-authority-wise-energy-efficiency-rebate-program](https://programs.dsireusa.org/system/program/detail/4525/oklahoma-municipal-power-authority-wise-energy-efficiency-rebate-program)"
],
"evidenceText": "OMPA WISE materials list rebates for participating member-city customers for heat pumps, ceiling insulation, electric and heat pump water heaters, smart thermostats, and related demand-response enrollment.",
"reasoningNotes": "The heat pump, insulation, water-heater, and thermostat matches are supported. Air sealing is a false positive, and larger commercial or industrial projects may fall under separate DEEP rules."
}
],
"continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:2130"
}
