{
"schemaVersion": "opportunity_data_research_repairs.v1",
"researchedAt": "2026-07-01",
"source": "gpt_pro",
"repairs": [
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2130",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"WA"
],
"counties": [
"San Juan County"
],
"cities": [],
"utilityTerritories": [
"Orcas Power and Light Cooperative"
],
"notes": "OPALCO is a member-owned electric cooperative serving San Juan County; rebates are for qualifying OPALCO members and addresses in its service area."
},
"eligibleApplicantTypes": [
"opalco_members",
"residential_customers",
"homeowners"
],
"eligibleSectors": [
"residential"
],
"eligibleRetrofitCategories": [
"ductless_heat_pump",
"heat_pump_water_heater",
"level_2_ev_charger_installation",
"insulation_upgrade",
"window_replacement"
],
"hardRequirements": [
"Applicant must be an OPALCO member with the measure installed in OPALCO service territory.",
"Heat pump water heater rebates are for existing single-family homes and must replace an electric storage water heater.",
"Level 2 EV charger must be a 240V AC charging station; OPALCO's Switch It Up financing is optional and separate from the rebate match.",
"Applications must include the required measure-specific forms, receipts, and installation documentation; rebates are available while funds last."
],
"blockers": [
"Do not match broad high_efficiency_hvac_replacement; current support is for specific heat pump measures, not any HVAC replacement.",
"Do not match ducted PTCS heat pump rebates as current, because the OPALCO ducted heat pump page says the BPA/PTCS rebate stopped taking applications in 2023.",
"Gas water heater replacements and new construction do not qualify for OPALCO heat pump water heater rebates.",
"Do not treat OPALCO's on-bill Switch It Up financing as the same rebate opportunity."
],
"programType": "residential_rebate_program",
"administrator": "Orcas Power and Light Cooperative",
"applicationUrl": null,
"websiteUrl": "[https://www.opalco.com/save/residential-rebates/](https://www.opalco.com/save/residential-rebates/)",
"sourceUrlsChecked": [
"[https://www.opalco.com/save/residential-rebates/](https://www.opalco.com/save/residential-rebates/)",
"[https://www.opalco.com/save/residential-rebates/heat-pump-water-heater/](https://www.opalco.com/save/residential-rebates/heat-pump-water-heater/)",
"[https://www.opalco.com/save/residential-rebates/ev-charging-station/](https://www.opalco.com/save/residential-rebates/ev-charging-station/)",
"[https://www.opalco.com/save/residential-rebates/ductless-heat-pump/](https://www.opalco.com/save/residential-rebates/ductless-heat-pump/)",
"[https://www.opalco.com/save/residential-rebates/window/](https://www.opalco.com/save/residential-rebates/window/)",
"[https://www.opalco.com/save/residential-rebates/ducted-heat-pump/](https://www.opalco.com/save/residential-rebates/ducted-heat-pump/)"
],
"evidenceText": "OPALCO lists residential rebates for insulation, windows, heat pump water heaters, EV charging stations, and ductless heat pumps; the ducted PTCS rebate page states it stopped taking applications in 2023.",
"reasoningNotes": "Input target list came from the uploaded batch prompt . Retained product-specific supported measures and blocked the stale ducted heat pump and broad HVAC matches."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5068",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"PA"
],
"counties": [],
"cities": [
"Philadelphia"
],
"utilityTerritories": [
"Philadelphia Gas Works"
],
"notes": "Rebates are only for premises served by PGW firm natural gas rates."
},
"eligibleApplicantTypes": [
"pgw_firm_rate_commercial_customers",
"business_owners",
"building_owners",
"multifamily_property_owners",
"industrial_customers"
],
"eligibleSectors": [
"commercial",
"industrial",
"multifamily"
],
"eligibleRetrofitCategories": [
"high_efficiency_gas_boiler",
"commercial_gas_water_heater",
"commercial_vrf_heat_pump",
"low_flow_showerhead",
"low_flow_faucet_aerator",
"boiler_reset_controls",
"steam_trap_replacement",
"high_efficiency_gas_fryer",
"commercial_gas_steam_cooker",
"roof_insulation"
],
"hardRequirements": [
"Customer must be a PGW firm-rate natural gas customer.",
"EnergySense commercial rebates are available for qualified installations from 09/01/2024 through 08/31/2027, subject to available funds.",
"Low-flow showerhead and faucet aerator rebates are retrofit-only and require a minimum of 10 units per project.",
"Steam trap and roof insulation rebates are retrofit-only; roof insulation must meet the listed finished R-value and documentation requirements.",
"Applications must include invoices, PGW bill, and AHRI, ENERGY STAR, or manufacturer specifications as applicable."
],
"blockers": [
"Do not match residential appliance or home weatherization categories to this commercial and industrial PGW program.",
"Low-flow support is limited to showerheads and faucet aerators, not broad plumbing retrofits.",
"Steam traps are steam-system distribution measures, not compressed-air equipment.",
"Heat pump support is limited to commercial VRF heat pumps listed by PGW, not general residential heat pump HVAC."
],
"programType": "commercial_and_industrial_rebate_program",
"administrator": "Philadelphia Gas Works",
"applicationUrl": null,
"websiteUrl": "[https://pgwenergysense.com/commercial-rebates/](https://pgwenergysense.com/commercial-rebates/)",
"sourceUrlsChecked": [
"[https://pgwenergysense.com/commercial-rebates/](https://pgwenergysense.com/commercial-rebates/)",
"[https://pgwenergysense.com/program-updates/](https://pgwenergysense.com/program-updates/)",
"[https://www.pgworks.com/customer-care/efficiency](https://www.pgworks.com/customer-care/efficiency)"
],
"evidenceText": "PGW EnergySense commercial rebates cover firm-rate natural gas premises with measures such as boilers, commercial water heaters, VRF heat pumps, low-flow devices, steam traps, roof insulation, and ENERGY STAR gas fryers or steam cookers.",
"reasoningNotes": "Matched only C&I natural-gas and retrofit measures supported by PGW, with product-specific treatment for low-flow devices and steam traps."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:4786",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"WY"
],
"counties": [],
"cities": [],
"utilityTerritories": [
"Enbridge Gas Wyoming"
],
"notes": "Applies to qualifying new residential construction receiving Enbridge Gas service on the applicable Wyoming rate schedule."
},
"eligibleApplicantTypes": [
"home_builders",
"owner_builders"
],
"eligibleSectors": [
"new_residential_construction",
"single_family_new_construction",
"multifamily_new_construction"
],
"eligibleRetrofitCategories": [
"high_efficiency_gas_furnace",
"dual_fuel_heat_pump_system",
"high_efficiency_gas_boiler",
"high_efficiency_gas_water_heater",
"combined_space_water_heating_unit",
"energy_recovery_ventilation",
"smart_thermostat",
"smart_water_heater_controller",
"insulation_upgrade",
"high_performance_windows",
"solar_assisted_domestic_water_heater"
],
"hardRequirements": [
"Rebates are for new construction measures installed in dwellings receiving Enbridge Gas service in Wyoming.",
"Measures must be new, purchased and installed during the 2026 promotion period, and tied to an active Enbridge Gas meter.",
"Completed applications and required documentation must be received within six months of gas service turn-on.",
"Rebates for new construction measures are paid only to builders or owner-builders.",
"Equipment must meet measure-specific efficiency and model requirements, such as AFUE, ENERGY STAR, SRCC, geofencing, occupancy sensor, or U-factor criteria."
],
"blockers": [
"Do not match existing-home retrofit homeowner projects to this builder rebate opportunity.",
"Do not match broad high_efficiency_hvac_replacement; support is for listed gas furnaces, gas boilers, dual-fuel systems, ERV, and related builder measures.",
"Gas service is required; all-electric projects without Enbridge Gas service are ineligible.",
"Insulation, windows, and smart thermostat matches must meet the precise builder-program specifications, not generic envelope or controls upgrades."
],
"programType": "builder_rebate_program",
"administrator": "Enbridge Gas ThermWise",
"applicationUrl": "[https://www.enbridgegas.com/-/media/Extranet-Pages/utidwy/save-money/thermwise/builder-rebates/WYBuilderApp-SF.pdf?hash=0A6FD2539620A4B58A7EFED75A104881&la=en&rev=50d9b0a510a04690a51a81c639e6a305](https://www.enbridgegas.com/-/media/Extranet-Pages/utidwy/save-money/thermwise/builder-rebates/WYBuilderApp-SF.pdf?hash=0A6FD2539620A4B58A7EFED75A104881&la=en&rev=50d9b0a510a04690a51a81c639e6a305)",
"websiteUrl": "[https://www.enbridgegas.com/utwyid/save-money/thermwise/builder-rebates](https://www.enbridgegas.com/utwyid/save-money/thermwise/builder-rebates)",
"sourceUrlsChecked": [
"[https://www.enbridgegas.com/utwyid/save-money/thermwise/builder-rebates](https://www.enbridgegas.com/utwyid/save-money/thermwise/builder-rebates)",
"[https://www.enbridgegas.com/-/media/Extranet-Pages/utidwy/save-money/thermwise/builder-rebates/WYBuilderApp-SF.pdf?hash=0A6FD2539620A4B58A7EFED75A104881&la=en&rev=50d9b0a510a04690a51a81c639e6a305](https://www.enbridgegas.com/-/media/Extranet-Pages/utidwy/save-money/thermwise/builder-rebates/WYBuilderApp-SF.pdf?hash=0A6FD2539620A4B58A7EFED75A104881&la=en&rev=50d9b0a510a04690a51a81c639e6a305)",
"[https://www.enbridgegas.com/-/media/Extranet-Pages/utidwy/save-money/thermwise/builder-rebates/WYBuilderApp-MF.pdf?hash=7A29C0DCC76AA4818749ACC8CBFB3301&la=en&rev=25736d7ab425494e87367b00750436a4](https://www.enbridgegas.com/-/media/Extranet-Pages/utidwy/save-money/thermwise/builder-rebates/WYBuilderApp-MF.pdf?hash=7A29C0DCC76AA4818749ACC8CBFB3301&la=en&rev=25736d7ab425494e87367b00750436a4)"
],
"evidenceText": "The current ThermWise Wyoming builder materials describe 2026 builder rebates for new residential construction receiving Enbridge Gas service, including gas HVAC, water heating, ERV, smart thermostats, envelope measures, and solar-assisted water heating.",
"reasoningNotes": "The former Questar program is now administered under Enbridge Gas ThermWise; eligibility is builder/new-construction specific rather than a general retrofit rebate."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:248",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"UT"
],
"counties": [],
"cities": [],
"utilityTerritories": [],
"notes": "Statewide Utah corporate tax credit for qualifying commercial renewable energy systems."
},
"eligibleApplicantTypes": [
"corporate_taxpayers",
"businesses",
"commercial_property_owners",
"renewable_energy_system_owners"
],
"eligibleSectors": [
"commercial",
"industrial",
"agricultural"
],
"eligibleRetrofitCategories": [
"solar_pv_system",
"solar_thermal_system",
"wind_energy_system",
"geothermal_renewable_energy_system",
"hydroelectric_system",
"biomass_biogas_energy_system",
"renewable_thermal_system"
],
"hardRequirements": [
"Commercial system must use an eligible Utah renewable energy technology: solar PV, wind, geothermal, hydro, biomass, or certain renewable thermal technologies.",
"The remainder of the credit expires for systems completed and placed in service after January 1, 2028.",
"Commercial credit is refundable and calculated as 10 percent of eligible system cost or 50000 dollars, whichever is less.",
"OED application and the nonrefundable application fee are required before claiming the tax credit."
],
"blockers": [
"Home battery or other energy storage installations are not eligible for the Utah RESTC.",
"Do not match high_efficiency_hvac_replacement unless the project is specifically an eligible geothermal or renewable thermal system.",
"Do not treat this corporate tax credit as a rebate or grant.",
"Personal residential claims belong under the separate personal tax credit record."
],
"programType": "corporate_tax_credit",
"administrator": "Utah Office of Energy Development and Utah State Tax Commission",
"applicationUrl": null,
"websiteUrl": "[https://energy.utah.gov/homepage/tax-credits/renewable-energy-systems-tax-credit/](https://energy.utah.gov/homepage/tax-credits/renewable-energy-systems-tax-credit/)",
"sourceUrlsChecked": [
"[https://energy.utah.gov/homepage/tax-credits/renewable-energy-systems-tax-credit/](https://energy.utah.gov/homepage/tax-credits/renewable-energy-systems-tax-credit/)"
],
"evidenceText": "Utah OED lists the RESTC for commercial solar PV, wind, geothermal, hydro, biomass, and renewable thermal systems, with a 10 percent or 50000 dollar commercial credit and a January 1, 2028 service cutoff.",
"reasoningNotes": "Removed unsupported battery storage and generic HVAC; retained only renewable energy technologies currently listed by OED."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:83",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"UT"
],
"counties": [],
"cities": [],
"utilityTerritories": [],
"notes": "Statewide Utah personal tax credit for qualifying residential renewable energy systems; residential solar PV installed in 2024 or later is no longer eligible."
},
"eligibleApplicantTypes": [
"individual_taxpayers",
"homeowners",
"residential_system_owners"
],
"eligibleSectors": [
"residential"
],
"eligibleRetrofitCategories": [
"solar_thermal_system",
"solar_water_heating_system",
"wind_energy_system",
"geothermal_renewable_energy_system",
"hydroelectric_system",
"biomass_biogas_energy_system",
"renewable_thermal_system"
],
"hardRequirements": [
"Residential non-solar renewable systems must use eligible wind, geothermal, hydro, biomass, or certain renewable thermal technologies.",
"The remainder of the credit expires for systems completed and placed in service after January 1, 2028.",
"For non-solar residential eligible technologies, the credit is nonrefundable and equals 25 percent of eligible cost or 2000 dollars, whichever is less.",
"OED application and the nonrefundable application fee are required before claiming the tax credit."
],
"blockers": [
"Residential solar PV systems installed in 2024 and beyond are not eligible for the Utah state credit.",
"Home battery installations are not eligible for the Utah RESTC.",
"Do not match generic high_efficiency_hvac_replacement except for a qualifying geothermal or renewable thermal system.",
"Commercial claims belong under the corporate RESTC record."
],
"programType": "personal_tax_credit",
"administrator": "Utah Office of Energy Development and Utah State Tax Commission",
"applicationUrl": null,
"websiteUrl": "[https://energy.utah.gov/homepage/tax-credits/renewable-energy-systems-tax-credit/](https://energy.utah.gov/homepage/tax-credits/renewable-energy-systems-tax-credit/)",
"sourceUrlsChecked": [
"[https://energy.utah.gov/homepage/tax-credits/renewable-energy-systems-tax-credit/](https://energy.utah.gov/homepage/tax-credits/renewable-energy-systems-tax-credit/)"
],
"evidenceText": "Utah OED states residential solar PV installed in 2024 and later is not eligible, home batteries are not eligible, and other residential eligible technologies may receive a 25 percent credit up to 2000 dollars.",
"reasoningNotes": "Removed rooftop solar PV and battery storage as current residential matches while preserving qualifying non-solar renewable technologies."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:1289",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"WI"
],
"counties": [],
"cities": [],
"utilityTerritories": [
"Focus on Energy participating utilities"
],
"notes": "Available to Wisconsin residents served by participating utilities; some measures have utility fuel-share, trade ally, income, or IRA-program requirements."
},
"eligibleApplicantTypes": [
"wisconsin_residents",
"homeowners",
"renters",
"landlords",
"participating_utility_residential_customers"
],
"eligibleSectors": [
"residential"
],
"eligibleRetrofitCategories": [
"air_sealing_weatherization",
"insulation_upgrade",
"diy_attic_insulation",
"duct_sealing",
"air_source_heat_pump",
"cold_climate_air_source_heat_pump",
"ground_source_geothermal_heat_pump",
"high_efficiency_natural_gas_furnace",
"high_efficiency_natural_gas_boiler",
"smart_thermostat",
"heat_pump_water_heater"
],
"hardRequirements": [
"Customer must be a Wisconsin residential customer of a participating Focus on Energy utility.",
"Insulation and air sealing applications must be submitted within 60 days of project completion and no later than the stated 2026 program deadline.",
"Many installed measures require use of a participating Trade Ally or IRA-registered contractor, depending on rebate path.",
"Smart thermostats must be qualified models purchased on or after January 1, 2026 for the current rebate.",
"Rebates and IRA Home Energy Rebates are subject to income, equipment, and funding requirements."
],
"blockers": [
"Do not match broad LED lighting retrofit to this record based only on free packs or retail marketplace references; no current residential retrofit lighting rebate was verified in the core pages checked.",
"Do not infer commercial refrigeration, motors, or C&I measures from Focus business programs into this residential record.",
"Solar for Homes appears as a separate Focus offering and should not be used to justify renewable categories for this energy-efficiency match.",
"New construction and income-qualified IRA pathways have separate certification or eligibility rules."
],
"programType": "residential_rebate_program",
"administrator": "Focus on Energy",
"applicationUrl": "[https://focusonenergy.com/residential-rebates-and-discounts](https://focusonenergy.com/residential-rebates-and-discounts)",
"websiteUrl": "[https://focusonenergy.com/residential](https://focusonenergy.com/residential)",
"sourceUrlsChecked": [
"[https://focusonenergy.com/residential](https://focusonenergy.com/residential)",
"[https://focusonenergy.com/residential-rebates-and-discounts](https://focusonenergy.com/residential-rebates-and-discounts)",
"[https://focusonenergy.com/](https://focusonenergy.com/)",
"[https://focus-ira.clearesult.com/](https://focus-ira.clearesult.com/)"
],
"evidenceText": "Focus on Energy lists Wisconsin residential rebates for insulation and air sealing, DIY attic insulation, smart thermostats, heating and cooling, water heating, and federally funded home energy rebates.",
"reasoningNotes": "Kept residential envelope, HVAC, thermostat, and water-heating categories; blocked unrelated business, lighting, and renewable extrapolations."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3426",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"WY"
],
"counties": [],
"cities": [],
"utilityTerritories": [
"Rocky Mountain Power"
],
"notes": "Applies to qualifying nonresidential facilities on Rocky Mountain Power Wyoming service and rate schedules."
},
"eligibleApplicantTypes": [
"rocky_mountain_power_business_customers",
"commercial_customers",
"industrial_customers",
"agricultural_customers",
"multifamily_property_owners"
],
"eligibleSectors": [
"commercial",
"industrial",
"agricultural",
"multifamily"
],
"eligibleRetrofitCategories": [
"commercial_heat_pump_hvac_retrofit",
"commercial_ground_source_heat_pump",
"commercial_vrf_heat_pump",
"packaged_terminal_heat_pump",
"heat_pump_water_heater_residential_used_in_business",
"high_efficiency_commercial_clothes_washer",
"led_lighting_retrofit",
"lighting_controls_retrofit",
"refrigeration_controls_retrofit",
"fast_acting_refrigerated_door"
],
"hardRequirements": [
"Facility must be a qualifying Rocky Mountain Power Wyoming business customer.",
"Equipment must meet the current wattsmart Business Wyoming incentive list or custom incentive requirements.",
"Commercial clothes washers must meet ENERGY STAR and electric water-heating requirements where specified.",
"Heat pump water heater incentives are for residential heat pump water heaters used in a business and must use the wattsmart Homes qualified list.",
"Applications may require preapproval, trade ally involvement, W-9, invoices, and inspection depending on measure type."
],
"blockers": [
"Do not infer normal residential appliance rebates into this business program; residential appliances are only eligible where the business incentive list specifically allows them.",
"Do not treat heat pump water heaters as broad commercial water-heating equipment; the verified category is residential HPWH used in a business.",
"Refrigeration support checked here is controls and doors, not generic refrigerator or freezer replacement unless listed separately.",
"NEIF financing is a separate payment option and should not be modeled as a rebate category."
],
"programType": "business_rebate_program",
"administrator": "Rocky Mountain Power",
"applicationUrl": null,
"websiteUrl": "[https://www.rockymountainpower.net/savings-energy-choices/business/wattsmart-efficiency-incentives-wyoming.html](https://www.rockymountainpower.net/savings-energy-choices/business/wattsmart-efficiency-incentives-wyoming.html)",
"sourceUrlsChecked": [
"[https://www.rockymountainpower.net/savings-energy-choices/business/wattsmart-efficiency-incentives-wyoming.html](https://www.rockymountainpower.net/savings-energy-choices/business/wattsmart-efficiency-incentives-wyoming.html)",
"[https://www.rockymountainpower.net/content/dam/pcorp/documents/en/rockymountainpower/savings-energy-choices/wattsmart-business/wyoming/WY_wattsmart_Business_Incentive_Lists.pdf](https://www.rockymountainpower.net/content/dam/pcorp/documents/en/rockymountainpower/savings-energy-choices/wattsmart-business/wyoming/WY_wattsmart_Business_Incentive_Lists.pdf)",
"[https://www.rockymountainpower.net/content/dam/pcorp/documents/en/rockymountainpower/savings-energy-choices/wattsmart-business/wyoming/WY_wattsmart_Business_Appliance_Office_Equip_Application.pdf](https://www.rockymountainpower.net/content/dam/pcorp/documents/en/rockymountainpower/savings-energy-choices/wattsmart-business/wyoming/WY_wattsmart_Business_Appliance_Office_Equip_Application.pdf)"
],
"evidenceText": "Rocky Mountain Power's Wyoming wattsmart Business materials list current incentives for business lighting, controls, HVAC heat pumps, appliances used in business, commercial clothes washers, and selected refrigeration controls.",
"reasoningNotes": "Narrowed residential-looking appliance matches to the specific business-use categories stated by wattsmart Business."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:1903",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"CA"
],
"counties": [
"Placer County"
],
"cities": [
"Roseville"
],
"utilityTerritories": [
"Roseville Electric Utility"
],
"notes": "Measures must be installed at commercial accounts receiving Roseville Electric Utility service; multifamily eligibility is generally limited to common areas unless the utility directs otherwise."
},
"eligibleApplicantTypes": [
"roseville_electric_commercial_customers",
"business_customers",
"commercial_property_owners",
"multifamily_property_owners"
],
"eligibleSectors": [
"commercial",
"multifamily_common_areas"
],
"eligibleRetrofitCategories": [
"commercial_heat_pump_hvac_retrofit",
"high_efficiency_commercial_air_conditioning",
"commercial_hvac_tune_up",
"smart_thermostat",
"led_lighting_retrofit",
"commercial_reach_in_refrigerator",
"commercial_reach_in_freezer"
],
"hardRequirements": [
"Project site must receive Roseville Electric Utility service.",
"Commercial HVAC and smart thermostat projects require reservation approval; permits and final permits are required where applicable.",
"Commercial HVAC program rebates are subject to funding availability and reservation timelines.",
"For multifamily properties, commercial HVAC rebates are limited to common areas unless Roseville Electric approves otherwise.",
"Commercial refrigeration equipment must meet the program's qualifying product list or ENERGY STAR requirements as stated on the application."
],
"blockers": [
"EV site assessment and EV charger incentives are separate Low Carbon Fuel Standard funded EV programs, not this commercial energy efficiency retrofit match.",
"EV site assessment is planning support, not a physical retrofit.",
"Do not match residential HVAC or individual multifamily dwelling-unit measures without utility confirmation.",
"Do not generalize reach-in refrigerator and freezer rebates into all refrigeration equipment."
],
"programType": "commercial_rebate_program",
"administrator": "Roseville Electric Utility",
"applicationUrl": null,
"websiteUrl": "[https://www.roseville.ca.gov/electric_utility/commercial_rebates/index.php?id=1205&rz=catalogueDetails](https://www.roseville.ca.gov/electric_utility/commercial_rebates/index.php?id=1205&rz=catalogueDetails)",
"sourceUrlsChecked": [
"[https://www.roseville.ca.gov/electric_utility/commercial_rebates/index.php?id=1205&rz=catalogueDetails](https://www.roseville.ca.gov/electric_utility/commercial_rebates/index.php?id=1205&rz=catalogueDetails)",
"[https://www.roseville.ca.gov/electric_utility/commercial_rebates/commercial_hvac.php](https://www.roseville.ca.gov/electric_utility/commercial_rebates/commercial_hvac.php)",
"[https://www.roseville.ca.gov/electric_utility/commercial_rebates/ev_site_assessment.php](https://www.roseville.ca.gov/electric_utility/commercial_rebates/ev_site_assessment.php)"
],
"evidenceText": "Roseville Electric lists commercial programs for HVAC, smart thermostats, lighting, refrigeration, and EV site assessment, while the EV site assessment page identifies a separate LCFS-funded EV program.",
"reasoningNotes": "Retained commercial EE measures and blocked the EV site-assessment false positive from this retrofit category set."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3574",
"confidence": "medium",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"MD"
],
"counties": [
"Calvert County",
"Charles County",
"Prince George's County",
"St. Mary's County"
],
"cities": [],
"utilityTerritories": [
"Southern Maryland Electric Cooperative"
],
"notes": "SMECO residential programs serve active SMECO residential members in the cooperative service area; some official pages were partially inaccessible but official search snippets and linked terms were readable."
},
"eligibleApplicantTypes": [
"smeco_residential_members",
"homeowners",
"renters",
"landlords"
],
"eligibleSectors": [
"residential",
"multifamily_residential"
],
"eligibleRetrofitCategories": [
"heat_pump_water_heater",
"smart_thermostat",
"air_source_heat_pump",
"ductless_mini_split_heat_pump",
"residential_refrigerator_recycling",
"residential_freezer_recycling",
"smart_thermostat_demand_response_enrollment"
],
"hardRequirements": [
"Applicant must be an active SMECO residential member.",
"Heat pump water heater and smart thermostat rebates require new qualifying products, proof of purchase, serial/model information, and timely online or mailed submission.",
"Heating and cooling instant rebates require work with SMECO-authorized contractors or distributors.",
"Appliance recycling requires old working refrigerators or freezers to be picked up and recycled through SMECO's program.",
"SmartTemp or Switch2Earn incentives require enrollment and connection of an eligible smart thermostat."
],
"blockers": [
"Do not match commercial refrigeration equipment; SMECO support checked here is residential appliance recycling, not commercial refrigerator or freezer replacement.",
"Demand response support is residential smart thermostat enrollment, not broad automated demand response controls for buildings.",
"Do not infer C&I HVAC, motors, or lighting measures from unrelated programs.",
"Official SMECO pages were partly difficult to read directly, so unsupported extra categories were not added."
],
"programType": "residential_rebate_program",
"administrator": "Southern Maryland Electric Cooperative",
"applicationUrl": null,
"websiteUrl": "[https://www.smeco.coop/energy-efficiency/residential-programs/](https://www.smeco.coop/energy-efficiency/residential-programs/)",
"sourceUrlsChecked": [
"[https://www.smeco.coop/energy-efficiency/residential-programs/](https://www.smeco.coop/energy-efficiency/residential-programs/)",
"[https://www.smeco.coop/energy-efficiency/residential-programs/appliance-rebates/](https://www.smeco.coop/energy-efficiency/residential-programs/appliance-rebates/)",
"[https://www.smeco.coop/energy-efficiency/residential-programs/appliance-rebates/heat-pump-water-heaters/](https://www.smeco.coop/energy-efficiency/residential-programs/appliance-rebates/heat-pump-water-heaters/)",
"[https://www.smeco.coop/energy-efficiency/residential-programs/appliance-rebates/smart-thermostats/](https://www.smeco.coop/energy-efficiency/residential-programs/appliance-rebates/smart-thermostats/)",
"[https://www.smeco.coop/energy-efficiency/residential-programs/appliance-recycling/](https://www.smeco.coop/energy-efficiency/residential-programs/appliance-recycling/)",
"[https://www.smeco.coop/energy-efficiency/residential-programs/heating-cooling-rebates/](https://www.smeco.coop/energy-efficiency/residential-programs/heating-cooling-rebates/)",
"[https://icf-intake-docserver.sightline-icf.com/media/documents/SMECO/SMECO_AppRebate_TC.pdf](https://icf-intake-docserver.sightline-icf.com/media/documents/SMECO/SMECO_AppRebate_TC.pdf)"
],
"evidenceText": "Official SMECO results list residential appliance rebates for heat pump water heaters and smart thermostats, appliance recycling, heating and cooling rebates, and Switch2Earn smart thermostat participation.",
"reasoningNotes": "Confidence is medium because several SMECO pages were not fully readable directly, but official snippets and terms documents were sufficient to confirm the listed categories."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3861",
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
"South River Electric Membership Corporation"
],
"notes": "Available to South River EMC members at homes receiving South River EMC electric service."
},
"eligibleApplicantTypes": [
"south_river_emc_members",
"homeowners",
"low_income_residential_members"
],
"eligibleSectors": [
"residential",
"low_income_residential"
],
"eligibleRetrofitCategories": [
"air_source_heat_pump",
"dual_fuel_air_source_heat_pump",
"ductless_mini_split_heat_pump",
"central_air_conditioner_replacement",
"ground_source_geothermal_heat_pump",
"heat_pump_water_heater",
"solar_water_heating_system",
"low_income_weatherization_package",
"air_sealing_weatherization",
"insulation_upgrade",
"duct_sealing",
"programmable_thermostat",
"variable_speed_pool_pump"
],
"hardRequirements": [
"Member must receive South River EMC electric service in the home where the qualifying equipment is installed.",
"HVAC equipment must be newly installed within the 90 days preceding application, meet efficiency requirements, and be installed by a North Carolina licensed heating and cooling contractor.",
"HVAC application must include the certificate of product rating; systems may be inspected before bill-credit issuance.",
"Heat pump water heater must replace an existing electric water heater in the same home, with the old unit disconnected and removed.",
"Low-income weatherization is a package delivered through Community Action and may include air or duct sealing, insulation, HVAC work, and thermostat measures."
],
"blockers": [
"Do not treat weatherization as a standalone unrestricted insulation rebate; the verified weatherization path is a low-income package with program requirements.",
"Do not match non-electric or gas equipment that is outside South River EMC's electric service requirements.",
"Do not infer commercial or industrial measures from this residential member program.",
"If a member receives the low-income weatherization rebate and heat pump or central AC rebate, they may not receive an additional HVAC rebate for the same project."
],
"programType": "residential_rebate_program",
"administrator": "South River Electric Membership Corporation",
"applicationUrl": null,
"websiteUrl": "[https://www.sremc.com/rebates-efficiency-tips](https://www.sremc.com/rebates-efficiency-tips)",
"sourceUrlsChecked": [
"[https://www.sremc.com/energy-star-heating-cooling](https://www.sremc.com/energy-star-heating-cooling)",
"[https://www.sremc.com/energy-efficient-water-heating](https://www.sremc.com/energy-efficient-water-heating)",
"[https://www.sremc.com/weatherization](https://www.sremc.com/weatherization)",
"[https://www.sremc.com/form/hvac-rebate](https://www.sremc.com/form/hvac-rebate)",
"[https://sremc.com/form/water-heating-pool-pump-rebate](https://sremc.com/form/water-heating-pool-pump-rebate)"
],
"evidenceText": "South River EMC lists residential rebates for electric air-source, dual-fuel, ductless, and geothermal heat pumps, central AC, heat pump and solar water heaters, plus low-income weatherization handled through Community Action.",
"reasoningNotes": "Retained HVAC, water-heating, and weatherization categories but noted the package and member-service limitations."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5874",
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
"Spire Missouri East",
"Spire Missouri West"
],
"notes": "Applies to current Spire commercial or industrial natural gas customers in Missouri."
},
"eligibleApplicantTypes": [
"spire_commercial_customers",
"spire_industrial_customers",
"business_customers",
"nonprofit_customers",
"government_customers"
],
"eligibleSectors": [
"commercial",
"industrial",
"multifamily",
"government",
"nonprofit"
],
"eligibleRetrofitCategories": [
"high_efficiency_gas_furnace",
"high_efficiency_gas_boiler",
"boiler_controls_burner_retrofit",
"boiler_tune_up",
"steam_trap_replacement",
"commercial_gas_water_heater",
"programmable_thermostat",
"energy_audit",
"high_efficiency_gas_fryer",
"commercial_gas_steam_cooker",
"kitchen_demand_control_ventilation",
"low_flow_pre_rinse_spray_nozzle",
"custom_natural_gas_efficiency_project"
],
"hardRequirements": [
"Applicant must be a current Spire commercial or industrial customer in Missouri.",
"Rebates apply to eligible high-efficiency natural gas equipment and services; applications are first-come, first-served and subject to budget availability.",
"Program year runs October 1 through September 30, with prior-year documentation due by the listed deadline.",
"Steam trap replacement or rebuild must include a steam trap survey or failure study report and proof of purchase.",
"Energy audit rebates require at least one eligible measure identified by the audit to be installed."
],
"blockers": [
"Do not match electric heat pumps; this is a natural gas commercial and industrial rebate program.",
"Do not match smart thermostat zoning broadly; verified thermostat support is programmable or qualifying thermostat measures tied to gas efficiency.",
"Low-flow support is limited to pre-rinse spray nozzles or listed food-service measures, not broad water fixture retrofits.",
"Energy audit is not a standalone physical retrofit and requires follow-through with an eligible measure."
],
"programType": "commercial_and_industrial_rebate_program",
"administrator": "Spire Energy",
"applicationUrl": null,
"websiteUrl": "[https://www.spireenergy.com/commercial-rebates](https://www.spireenergy.com/commercial-rebates)",
"sourceUrlsChecked": [
"[https://www.spireenergy.com/commercial-rebates](https://www.spireenergy.com/commercial-rebates)",
"[https://www.spireenergy.com/rebates-offers](https://www.spireenergy.com/rebates-offers)",
"[https://www.spireenergy.com/sites/default/files/2025-09/25-CandIRebates-SteamTrap-FINAL-REV-1003.pdf](https://www.spireenergy.com/sites/default/files/2025-09/25-CandIRebates-SteamTrap-FINAL-REV-1003.pdf)"
],
"evidenceText": "Spire's Missouri business rebates cover natural gas commercial and industrial measures including boiler systems, boiler tune-ups, steam traps, thermostats, water heating, food service, audits, and custom gas efficiency.",
"reasoningNotes": "Kept gas C&I categories and blocked electric heat pump and overly broad thermostat or water-fixture interpretations."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3433",
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
"Stearns Electric Association"
],
"notes": "Available to Stearns Electric Association member-consumers where electricity is supplied by the cooperative."
},
"eligibleApplicantTypes": [
"stearns_electric_member_consumers",
"residential_members",
"homeowners"
],
"eligibleSectors": [
"residential"
],
"eligibleRetrofitCategories": [
"air_source_heat_pump",
"ductless_air_source_heat_pump",
"ground_source_geothermal_heat_pump",
"dual_fuel_heating_system",
"thermal_storage_space_heating",
"ecm_motor_replacement",
"heat_pump_water_heater",
"wifi_thermostat",
"residential_refrigerator",
"residential_freezer",
"residential_appliance_recycling",
"air_conditioner_tune_up",
"air_source_heat_pump_tune_up",
"led_yard_light_fixture",
"led_a19_bulb"
],
"hardRequirements": [
"Equipment must be installed where electricity is supplied by Stearns Electric Association.",
"Rebate applications must be submitted within 90 days of purchase.",
"EnergyWise rebates require enrollment in the associated program where applicable.",
"Appliance rebates are for new ENERGY STAR rated appliances purchased on or after January 1, 2026.",
"Refrigerator and freezer rebates require recycling of the old unit."
],
"blockers": [
"Do not match commercial refrigeration equipment; verified refrigerator and freezer rebates are residential ENERGY STAR appliances with old-unit recycling.",
"Do not match broad high_efficiency_hvac_replacement; support is for listed heat pump, dual-fuel, tune-up, and thermal-storage measures.",
"WiFi thermostat is a residential thermostat rebate, not a broad zoning or building automation category.",
"EV charger or ChargeWise enrollment is a separate supported offering and should not be inferred into unrelated categories."
],
"programType": "residential_rebate_program",
"administrator": "Stearns Electric Association",
"applicationUrl": null,
"websiteUrl": "[https://www.stearnselectric.org/save-money-and-energy/tools-and-resources/rebates-2/](https://www.stearnselectric.org/save-money-and-energy/tools-and-resources/rebates-2/)",
"sourceUrlsChecked": [
"[https://www.stearnselectric.org/save-money-and-energy/tools-and-resources/rebates-2/](https://www.stearnselectric.org/save-money-and-energy/tools-and-resources/rebates-2/)",
"[https://www.stearnselectric.org/wp-content/uploads/2026/01/SEA_RebatesInsert2026_web.pdf](https://www.stearnselectric.org/wp-content/uploads/2026/01/SEA_RebatesInsert2026_web.pdf)",
"[https://www.stearnselectric.org/save-money-and-energy/energystar-rebates/residential-appliance-rebates/](https://www.stearnselectric.org/save-money-and-energy/energystar-rebates/residential-appliance-rebates/)",
"[https://www.stearnselectric.org/save-money-and-energy/energywise-rebates/heating-and-cooling-rebates/](https://www.stearnselectric.org/save-money-and-energy/energywise-rebates/heating-and-cooling-rebates/)",
"[https://www.stearnselectric.org/save-money-and-energy/heating-and-cooling/smart-thermostats/](https://www.stearnselectric.org/save-money-and-energy/heating-and-cooling/smart-thermostats/)"
],
"evidenceText": "Stearns Electric's 2026 residential rebate materials list air-source, ductless, ground-source, dual-fuel, water-heating, WiFi thermostat, appliance, tune-up, and limited LED lighting rebates for member-consumers.",
"reasoningNotes": "Narrowed appliance and refrigeration matches to residential ENERGY STAR products and retained EnergyWise enrollment requirements."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:679",
"confidence": "medium",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"PA"
],
"counties": [],
"cities": [],
"utilityTerritories": [
"PPL Electric Utilities"
],
"notes": "The historical DSIRE record is PPL-territory specific, while the current administrator site describes financing and clean energy support across Pennsylvania without clearly restating a PPL-only boundary."
},
"eligibleApplicantTypes": [
"businesses",
"commercial_property_owners",
"nonprofit_organizations",
"municipalities",
"energy_companies"
],
"eligibleSectors": [
"commercial",
"industrial",
"government",
"nonprofit",
"multifamily"
],
"eligibleRetrofitCategories": [
"renewable_energy_project_financing",
"energy_efficiency_project_financing",
"biomass_energy_system_financing",
"solar_pv_financing",
"building_envelope_financing",
"hvac_efficiency_financing",
"lighting_efficiency_financing",
"energy_audit"
],
"hardRequirements": [
"Support is financing, not a rebate; projects must satisfy underwriting and financing terms.",
"Current site describes commercial loans, savings agreements, and purchase agreements for sustainable energy projects.",
"Eligible project examples include renewable energy such as biomass and solar, energy efficiency such as building envelope, HVAC, and lighting, and support for energy companies.",
"Energy audits are offered as a first step to assess building energy use and identify cost-effective measures.",
"Territory should be checked during intake because current official materials did not clearly confirm the older PPL-only limit."
],
"blockers": [
"Do not model this as a rebate, tax credit, or grant program.",
"Do not force unsupported retrofit categories such as battery storage, CHP, or geothermal from old taxonomy unless confirmed for a specific financing request.",
"Do not treat financing eligibility as automatic project approval; credit, savings, collateral, and program underwriting can block participation.",
"If a project is outside Pennsylvania or outside any administrator-required territory, it should be blocked pending administrator confirmation."
],
"programType": "loan_financing_program",
"administrator": "Regenerative Energy Initiative (formerly Sustainable Energy Fund)",
"applicationUrl": null,
"websiteUrl": "[https://thesef.org/](https://thesef.org/)",
"sourceUrlsChecked": [
"[https://thesef.org/](https://thesef.org/)",
"[https://thesef.org/nonprofit-energy-makeover-2/](https://thesef.org/nonprofit-energy-makeover-2/)"
],
"evidenceText": "The current SEF site, now Regenerative Energy Initiative, describes financing through commercial loans and agreements for renewable energy, energy efficiency, building envelope, HVAC, lighting, and energy-company projects.",
"reasoningNotes": "Kept financing-supported categories only and flagged the current source ambiguity around the older PPL-territory label."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22092",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"DC"
],
"counties": [],
"cities": [
"Washington"
],
"utilityTerritories": [
"District of Columbia Sustainable Energy Utility"
],
"notes": "Available to District of Columbia business, commercial property, institutional, and multifamily projects meeting DCSEU requirements."
},
"eligibleApplicantTypes": [
"district_businesses",
"commercial_property_owners",
"multifamily_property_owners",
"institutional_customers",
"small_businesses",
"affordable_multifamily_providers"
],
"eligibleSectors": [
"commercial",
"multifamily",
"institutional",
"small_business",
"affordable_housing"
],
"eligibleRetrofitCategories": [
"led_lighting_retrofit",
"lighting_controls_retrofit",
"occupancy_sensor_lighting_controls",
"daylight_sensor_lighting_controls",
"commercial_heat_pump_ductless_mini_split",
"commercial_heat_pump_hvac_retrofit",
"commercial_air_conditioning",
"commercial_reach_in_refrigerator",
"commercial_reach_in_freezer",
"refrigeration_controls_retrofit",
"display_case_lighting",
"commercial_kitchen_foodservice_equipment",
"low_flow_pre_rinse_spray_valve",
"vending_machine_controls",
"multifamily_bulk_refrigerator",
"multifamily_bulk_clothes_washer",
"heat_pump_clothes_dryer"
],
"hardRequirements": [
"Project must be in a District-based business, commercial, institutional, or multifamily building.",
"Business rebate projects generally must be submitted for preapproval before equipment purchase; applications not preapproved are not guaranteed rebates.",
"Total business rebates are generally capped at 100000 dollars per location per fiscal year unless program terms state otherwise.",
"Small-business enhanced rebates require the stated under-10000-square-foot business criteria.",
"DCSEU no longer offers rebates for new gas equipment in market-rate commercial, institutional, and multifamily buildings, except possible O&M support for existing gas equipment."
],
"blockers": [
"Do not match low_flow_fixture_retrofit broadly; the verified food-service water measure is a spray rinse valve at the listed flow rate.",
"The word fixture on lighting pages refers to LED or display-case lighting fixtures, not plumbing fixtures.",
"Do not infer single-family residential rebates into this commercial and multifamily record.",
"Solar and financing are separate DCSEU/custom offerings and should not be matched unless the project meets their separate requirements."
],
"programType": "commercial_multifamily_rebate_program",
"administrator": "District of Columbia Sustainable Energy Utility",
"applicationUrl": null,
"websiteUrl": "[https://www.dcseu.com/business-rebates](https://www.dcseu.com/business-rebates)",
"sourceUrlsChecked": [
"[https://www.dcseu.com/business-rebates](https://www.dcseu.com/business-rebates)",
"[https://www.dcseu.com/business-rebates/lighting](https://www.dcseu.com/business-rebates/lighting)",
"[https://www.dcseu.com/business-rebates/hvac](https://www.dcseu.com/business-rebates/hvac)",
"[https://www.dcseu.com/business-rebates/refrigeration](https://www.dcseu.com/business-rebates/refrigeration)",
"[https://www.dcseu.com/business-rebates/bulk-appliances](https://www.dcseu.com/business-rebates/bulk-appliances)",
"[https://www.dcseu.com/start-a-project](https://www.dcseu.com/start-a-project)",
"[https://www.dcseu.com/terms-and-conditions](https://www.dcseu.com/terms-and-conditions)"
],
"evidenceText": "DCSEU business pages list commercial and multifamily rebates for lighting controls and fixtures, HVAC heat pumps and air conditioning, refrigeration, food and vending equipment, and multifamily bulk appliances.",
"reasoningNotes": "Kept commercial and multifamily categories but narrowed the fixture and low-flow matches to lighting fixtures and a specific pre-rinse spray valve."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5399",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"DC"
],
"counties": [],
"cities": [
"Washington"
],
"utilityTerritories": [
"District of Columbia Sustainable Energy Utility"
],
"notes": "Available to District of Columbia residents, with measure-specific contractor, licensing, and electrification requirements."
},
"eligibleApplicantTypes": [
"district_residents",
"homeowners",
"renters"
],
"eligibleSectors": [
"residential"
],
"eligibleRetrofitCategories": [
"electric_heat_pump_hvac",
"ductless_mini_split_heat_pump",
"heat_pump_water_heater",
"window_air_conditioner",
"smart_thermostat",
"residential_refrigerator",
"residential_induction_stove",
"electric_stove",
"residential_clothes_washer",
"residential_clothes_dryer",
"heat_pump_clothes_dryer",
"home_electrification_service",
"electric_circuit_addition",
"electric_panel_upgrade"
],
"hardRequirements": [
"Applicant must be a DC resident and install qualifying equipment in a DC residence.",
"Heating, cooling, and water-heating equipment must be installed by a DC licensed contractor to qualify.",
"Cooling rebates require a valid DC Master Refrigeration and Air Conditioning Mechanic license; water-heating rebates require a valid DC Master Plumber license.",
"Appliance rebates are for select ENERGY STAR certified electric or induction appliances and electronics.",
"Electrification service rebates support heavy-ups and electric circuit additions tied to switching household equipment from gas to electric."
],
"blockers": [
"Do not match commercial refrigeration equipment; verified support is for residential refrigerators and household appliances.",
"Induction and electric stove rebates are residential appliances, not commercial kitchen equipment.",
"Window air conditioner rebates are product-specific and must not be interpreted as window replacement.",
"Do not match broad high_efficiency_hvac_replacement beyond qualifying electric heat pumps, heat pump water heaters, and air conditioners."
],
"programType": "residential_rebate_program",
"administrator": "District of Columbia Sustainable Energy Utility",
"applicationUrl": "[https://www.dcseu.com/residential-rebates/apply](https://www.dcseu.com/residential-rebates/apply)",
"websiteUrl": "[https://www.dcseu.com/residential-rebates](https://www.dcseu.com/residential-rebates)",
"sourceUrlsChecked": [
"[https://www.dcseu.com/residential-rebates](https://www.dcseu.com/residential-rebates)",
"[https://www.dcseu.com/residential-rebates/apply](https://www.dcseu.com/residential-rebates/apply)",
"[https://www.dcseu.com/residential-rebates/heating-cooling](https://www.dcseu.com/residential-rebates/heating-cooling)",
"[https://www.dcseu.com/residential-rebates/electrify](https://www.dcseu.com/residential-rebates/electrify)",
"[https://www.dcseu.com/terms-and-conditions](https://www.dcseu.com/terms-and-conditions)"
],
"evidenceText": "DCSEU residential pages list rebates for electric heat pumps, heat pump water heaters, window air conditioners, electrification services, smart thermostats, refrigerators, and electric or induction cooking appliances.",
"reasoningNotes": "Narrowed the refrigeration and induction matches to residential appliances and excluded commercial kitchen or commercial refrigeration interpretations."
}
],
"continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:4527"
}

