{
"schemaVersion": "opportunity_data_research_repairs.v1",
"researchedAt": "2026-07-01",
"source": "gpt_pro",
"repairs": [
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22417",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"OR"
],
"counties": [],
"cities": [],
"utilityTerritories": [
"Portland General Electric",
"Pacific Power"
],
"notes": "Energy Trust of Oregon electric-service territory only; incentives differ by utility."
},
"eligibleApplicantTypes": [
"income_qualified_homeowners",
"residential_electric_customers"
],
"eligibleSectors": [
"residential"
],
"eligibleRetrofitCategories": [
"residential_solar_pv"
],
"hardRequirements": [
"Customer must be income-qualified under Solar Within Reach rules.",
"Project must serve a Portland General Electric or Pacific Power residential electric account in Energy Trust territory.",
"Solar PV system must meet the current minimum system-size and program technical requirements.",
"Funding is subject to Energy Trust reservation, incentive caps, approved contractor/process rules, and available funds."
],
"blockers": [
"battery_storage_system is a separate Energy Trust battery incentive, not Solar Within Reach.",
"solar_plus_storage_system should not match unless both the Solar Within Reach PV incentive and a separate battery incentive are independently eligible.",
"Standalone storage, non-income-qualified households, and sites outside PGE or Pacific Power territory are not eligible for this opportunity."
],
"programType": "rebate",
"administrator": "Energy Trust of Oregon",
"applicationUrl": null,
"websiteUrl": "[https://www.energytrust.org/incentives/solar-within-reach/#tab-one](https://www.energytrust.org/incentives/solar-within-reach/#tab-one)",
"sourceUrlsChecked": [
"[https://www.energytrust.org/incentives/solar-within-reach/#tab-one](https://www.energytrust.org/incentives/solar-within-reach/#tab-one)",
"[https://insider.energytrust.org/wp-content/uploads/solar_status_report.pdf](https://insider.energytrust.org/wp-content/uploads/solar_status_report.pdf)",
"[https://insider.energytrust.org/programs/solar/incentives/](https://insider.energytrust.org/programs/solar/incentives/)"
],
"evidenceText": "The current Energy Trust incentive status report lists Solar Within Reach for PGE and Pacific Power solar PV with separate income-qualified battery storage incentives.",
"reasoningNotes": "Prompt target source confirmed from uploaded batch file . The PV incentive is supported; storage and solar-plus-storage were split out because the current official status report lists battery storage separately."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2115",
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
"South Central Indiana REMC"
],
"notes": "Limited to single-family homes served by South Central Indiana REMC."
},
"eligibleApplicantTypes": [
"residential_member_consumers",
"single_family_home_occupants"
],
"eligibleSectors": [
"residential"
],
"eligibleRetrofitCategories": [
"air_source_heat_pump",
"dual_fuel_heat_pump",
"ductless_mini_split_heat_pump",
"ground_source_geothermal_heat_pump",
"heat_pump_water_heater"
],
"hardRequirements": [
"Applicant must be a current residential SCI REMC member-consumer in a single-family home.",
"Home must be served by SCI REMC and occupied year-round.",
"HVAC equipment must be new, qualifying, and documented with AHRI certification where required.",
"Application and invoice must be submitted within 90 days of installation and in the same calendar year.",
"Rebates are limited by program caps, annual limits, and available funds."
],
"blockers": [
"Do not match generic high_efficiency_hvac_replacement; only listed heat pump technologies are supported.",
"Furnaces, boilers, central air conditioning alone, LED lighting, and commercial measures are not part of this residential HVAC rebate.",
"Nonmembers, seasonal homes, and projects missing required documentation are not eligible."
],
"programType": "rebate",
"administrator": "South Central Indiana Rural Electric Membership Corporation",
"applicationUrl": "[https://www.sciremc.com/wp-content/uploads/2026_Residential_HVAC_Rebate_Application.pdf](https://www.sciremc.com/wp-content/uploads/2026_Residential_HVAC_Rebate_Application.pdf)",
"websiteUrl": "[https://www.sciremc.com/save-energy-money/rebates-credits/](https://www.sciremc.com/save-energy-money/rebates-credits/)",
"sourceUrlsChecked": [
"[https://www.sciremc.com/save-energy-money/rebates-credits/](https://www.sciremc.com/save-energy-money/rebates-credits/)",
"[https://www.sciremc.com/wp-content/uploads/2026_Residential_HVAC_Rebate_Application.pdf](https://www.sciremc.com/wp-content/uploads/2026_Residential_HVAC_Rebate_Application.pdf)",
"[https://www.sciremc.com/wp-content/uploads/2026_Residential_HVAC_Terms_Conditions.pdf](https://www.sciremc.com/wp-content/uploads/2026_Residential_HVAC_Terms_Conditions.pdf)"
],
"evidenceText": "SCI REMC's 2026 residential rebate materials list air-source, dual-fuel, ductless mini-split, and geothermal heat pumps with member, home, AHRI, and timing requirements.",
"reasoningNotes": "The supplied heat pump and geothermal matches are valid when narrowed to specific heat-pump measures. The broader HVAC replacement category is too broad."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:1465",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"NJ"
],
"counties": [],
"cities": [],
"utilityTerritories": [
"South Jersey Gas"
],
"notes": "Limited to South Jersey Gas residential service territory and qualifying residential properties."
},
"eligibleApplicantTypes": [
"residential_property_owners",
"south_jersey_gas_customers",
"income_qualified_customers"
],
"eligibleSectors": [
"residential",
"small_multifamily"
],
"eligibleRetrofitCategories": [
"high_efficiency_condensing_gas_furnace",
"high_efficiency_condensing_gas_boiler",
"gas_condensing_combi_heat_system",
"gas_water_heater_replacement",
"whole_home_energy_efficiency_upgrades"
],
"hardRequirements": [
"Applicant must be an owner listed on the deed and at least one applicant must be listed on the South Jersey Gas utility bill.",
"Customer must satisfy utility account, payment, credit, and service requirements.",
"Financed work must qualify through SJG HVAC Upgrade, HVAC New Customers, or Whole Home Energy Solutions.",
"Work generally must not start before financing approval.",
"Loan amount, repayment term, and equipment eligibility are capped by current program rules."
],
"blockers": [
"This is on-bill repayment financing, not a point-of-sale rebate.",
"Do not match electric-only heat pumps, central AC alone, generic high_efficiency_hvac_replacement, or standalone smart thermostats.",
"Non-SJG customers, non-owner applicants, already-started work, and measures not approved under eligible SJG program paths should not match."
],
"programType": "on_bill_repayment_loan",
"administrator": "South Jersey Gas",
"applicationUrl": "[https://nj.energyfinancesolutions.com/documents/102/13_South_Jersey_Gas_Residential_Credit_Application_02032026-Fillable.pdf](https://nj.energyfinancesolutions.com/documents/102/13_South_Jersey_Gas_Residential_Credit_Application_02032026-Fillable.pdf)",
"websiteUrl": "[https://nj.energyfinancesolutions.com/for-homeowners/south-jersey-gas-on-bill-repayment-program/](https://nj.energyfinancesolutions.com/for-homeowners/south-jersey-gas-on-bill-repayment-program/)",
"sourceUrlsChecked": [
"[https://nj.energyfinancesolutions.com/for-homeowners/south-jersey-gas-on-bill-repayment-program/](https://nj.energyfinancesolutions.com/for-homeowners/south-jersey-gas-on-bill-repayment-program/)",
"[https://nj.energyfinancesolutions.com/documents/102/13_South_Jersey_Gas_Residential_Credit_Application_02032026-Fillable.pdf](https://nj.energyfinancesolutions.com/documents/102/13_South_Jersey_Gas_Residential_Credit_Application_02032026-Fillable.pdf)",
"[https://sjgsaveenergy.clearesult.com/sjg/hvac-water-heating-rebates/](https://sjgsaveenergy.clearesult.com/sjg/hvac-water-heating-rebates/)",
"[https://sjgsaveenergy.clearesult.com/sjg/whole-home-energy-solutions/](https://sjgsaveenergy.clearesult.com/sjg/whole-home-energy-solutions/)"
],
"evidenceText": "Current program pages describe 0% on-bill repayment for eligible SJG HVAC and whole-home projects, including condensing gas furnaces, boilers, combi systems, and water heating.",
"reasoningNotes": "Furnace and boiler matches are supported when limited to high-efficiency gas equipment and loan financing. Generic HVAC replacement was narrowed."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5562",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"CO"
],
"counties": [
"Summit County"
],
"cities": [
"Breckenridge",
"Dillon",
"Frisco",
"Silverthorne"
],
"utilityTerritories": [],
"notes": "Applies to existing homes in Summit County jurisdictions; local rebate amounts vary by jurisdiction."
},
"eligibleApplicantTypes": [
"homeowners",
"residential_households",
"renters_with_landlord_approval"
],
"eligibleSectors": [
"residential"
],
"eligibleRetrofitCategories": [
"insulation_upgrade",
"air_sealing",
"balanced_ventilation",
"crawlspace_or_basement_improvement",
"duct_sealing",
"electrical_panel_or_wiring_upgrade",
"smart_heat_tape_controls",
"level_2_ev_charger_installation",
"induction_cooktop_or_range",
"cold_climate_air_source_heat_pump",
"heat_pump_water_heater",
"heat_pump_clothes_dryer",
"programmable_thermostat",
"residential_solar_pv",
"solar_thermal_water_heating",
"window_replacement"
],
"hardRequirements": [
"Home must be an existing residential building in Summit County.",
"Applicant must enroll with Energy Smart Colorado and schedule an Energy Coach call.",
"Many measures require an assessment before work.",
"Application must generally be submitted within 90 days of paid invoice.",
"Rebates are first-come, first-served and subject to local jurisdiction requirements."
],
"blockers": [
"LED lighting is not supported by the current Summit County rebate requirements.",
"Smart thermostat or zoning should not match unless the measure is a qualifying programmable thermostat.",
"Projects outside Summit County, new construction, or projects lacking required assessment/coach steps should not match."
],
"programType": "rebate",
"administrator": "High Country Conservation Center",
"applicationUrl": null,
"websiteUrl": "[https://highcountryconservation.org/home-energy-audits/](https://highcountryconservation.org/home-energy-audits/)",
"sourceUrlsChecked": [
"[https://highcountryconservation.org/home-energy-audits/](https://highcountryconservation.org/home-energy-audits/)",
"[https://highcountryconservation.org/wp-content/uploads/2026/01/2026-HC3-ESC-Rebate-Requirements.pdf](https://highcountryconservation.org/wp-content/uploads/2026/01/2026-HC3-ESC-Rebate-Requirements.pdf)",
"[http://www.energysmartcolorado.com/](http://www.energysmartcolorado.com/)"
],
"evidenceText": "The 2026 HC3 Energy Smart Colorado requirements list insulation, programmable thermostats, heat pumps, EV charging, solar, windows, and other home energy upgrades.",
"reasoningNotes": "The insulation and thermostat matches are supported. LED lighting was removed because the current Summit County requirements do not list it."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22807",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"MA"
],
"counties": [],
"cities": [
"Taunton"
],
"utilityTerritories": [
"Taunton Municipal Lighting Plant"
],
"notes": "Limited to eligible residential electric customers of TMLP."
},
"eligibleApplicantTypes": [
"residential_electric_customers"
],
"eligibleSectors": [
"residential"
],
"eligibleRetrofitCategories": [
"level_2_ev_charger_installation"
],
"hardRequirements": [
"Applicant must have an active residential TMLP electric account in good standing for the required account history period.",
"Level 2 charger must be new and installed at the customer's residence.",
"Installation must be performed by a licensed electrician or qualified professional where required.",
"Rebate is limited to one Level 2 charger per household and is subject to application timing and funds availability."
],
"blockers": [
"LED lighting is not part of the EV and Level 2 EV Charging Program.",
"Vehicle purchase rebates and off-peak charging credits are separate non-building measures within the EV program and should not be treated as charger installation.",
"Level 1 chargers, DC fast chargers, used chargers, nonresidential accounts, and non-TMLP customers should not match."
],
"programType": "rebate_and_bill_credit",
"administrator": "Taunton Municipal Lighting Plant",
"applicationUrl": null,
"websiteUrl": "[https://www.tmlp.com/178/EV-Program](https://www.tmlp.com/178/EV-Program)",
"sourceUrlsChecked": [
"[https://www.tmlp.com/178/EV-Program](https://www.tmlp.com/178/EV-Program)",
"[https://tmlp-ev.ene.org/ev-charging-guide/](https://tmlp-ev.ene.org/ev-charging-guide/)"
],
"evidenceText": "TMLP's EV program lists a Level 2 charger purchase and installation rebate, separate EV purchase rebates, and monthly off-peak charging credits.",
"reasoningNotes": "Only the Level 2 charger installation category is a physical retrofit here. The LED match is a false positive."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22805",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"MA"
],
"counties": [],
"cities": [
"Taunton"
],
"utilityTerritories": [
"Taunton Municipal Lighting Plant"
],
"notes": "Limited to eligible TMLP residential electric customers and qualifying owner-occupied or approved 2-4 unit rental properties."
},
"eligibleApplicantTypes": [
"residential_electric_customers",
"homeowners",
"landlords_2_to_4_unit_properties",
"low_and_moderate_income_customers"
],
"eligibleSectors": [
"residential",
"small_multifamily"
],
"eligibleRetrofitCategories": [
"cold_climate_air_source_heat_pump",
"ground_source_geothermal_heat_pump",
"weatherization_air_sealing",
"insulation_upgrade",
"barrier_mitigation_for_weatherization"
],
"hardRequirements": [
"Applicant must be an existing TMLP residential electric customer in good standing for the required account history period.",
"A no-cost home energy audit is required and recommended weatherization must be completed within the program timing rules.",
"Heat pumps must meet Mass Save Heat Pump Qualified Product List and sizing requirements.",
"Installation must use approved contractors and follow pre-approval rules for financing.",
"Gas customers and customers eligible through another utility or low-income program may be redirected and blocked from this TMLP offer."
],
"blockers": [
"LED lighting is not supported by this heat pump and zero-interest loan opportunity.",
"Generic high_efficiency_hvac_replacement, furnaces, boilers, central AC alone, and non-cold-climate heat pumps should not match.",
"Projects without required audit, weatherization, approved equipment, approved contractor, or TMLP eligibility should not match."
],
"programType": "zero_interest_loan_and_rebate",
"administrator": "Taunton Municipal Lighting Plant",
"applicationUrl": null,
"websiteUrl": "[https://www.tmlp.com/182/Heat-Pump-Zero-Interest-Loan-Residential](https://www.tmlp.com/182/Heat-Pump-Zero-Interest-Loan-Residential)",
"sourceUrlsChecked": [
"[https://www.tmlp.com/182/Heat-Pump-Zero-Interest-Loan-Residential](https://www.tmlp.com/182/Heat-Pump-Zero-Interest-Loan-Residential)",
"[https://www.tmlp.com/DocumentCenter/View/1206/Terms-and-Conditions-for-Residential-Customers-PDF](https://www.tmlp.com/DocumentCenter/View/1206/Terms-and-Conditions-for-Residential-Customers-PDF)"
],
"evidenceText": "TMLP's 2026 terms cover cold-climate air-source or ground-source heat pumps, related weatherization, barrier mitigation, and zero-interest loan support.",
"reasoningNotes": "The heat pump match is correct when narrowed to cold-climate ASHP or GSHP. LED and broad HVAC replacement were removed."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2668",
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
"Utilities District of Western Indiana REMC"
],
"notes": "Limited to single-family homes served by UDWI REMC."
},
"eligibleApplicantTypes": [
"residential_member_consumers",
"single_family_home_occupants"
],
"eligibleSectors": [
"residential"
],
"eligibleRetrofitCategories": [
"air_source_heat_pump",
"dual_fuel_heat_pump",
"ductless_mini_split_heat_pump",
"ground_source_geothermal_heat_pump",
"heat_pump_water_heater",
"wifi_enabled_electric_storage_water_heater"
],
"hardRequirements": [
"Applicant must be a current residential UDWI member-consumer in a single-family home served by UDWI.",
"Home must be occupied year-round.",
"HVAC equipment must be new and qualifying; whole-home requirement applies except eligible single-zone mini-splits.",
"AHRI documentation, invoice, and application are required.",
"Application must be submitted within 90 days and in the same calendar year, with rebates subject to caps and available funds."
],
"blockers": [
"Do not match generic high_efficiency_hvac_replacement; only listed heat pump equipment is supported.",
"Furnaces, boilers, LED lighting, and nonresidential measures are not part of this residential heat-pump rebate.",
"Nonmembers, seasonal homes, projects over rebate caps, or missing AHRI/invoice documentation should not match."
],
"programType": "rebate",
"administrator": "Utilities District of Western Indiana REMC",
"applicationUrl": "[https://www.udwiremc.com/wp-content/uploads/2026/01/2026_Res.HVAC-Rebate-App.pdf](https://www.udwiremc.com/wp-content/uploads/2026/01/2026_Res.HVAC-Rebate-App.pdf)",
"websiteUrl": "[https://www.udwiremc.com/my-services/member-programs/rebates/](https://www.udwiremc.com/my-services/member-programs/rebates/)",
"sourceUrlsChecked": [
"[https://www.udwiremc.com/my-services/member-programs/rebates/](https://www.udwiremc.com/my-services/member-programs/rebates/)",
"[https://www.udwiremc.com/my-services/member-programs/rebates/hvac-incentive-program/](https://www.udwiremc.com/my-services/member-programs/rebates/hvac-incentive-program/)",
"[https://www.udwiremc.com/wp-content/uploads/2026/01/2026_Res.HVAC-Rebate-App.pdf](https://www.udwiremc.com/wp-content/uploads/2026/01/2026_Res.HVAC-Rebate-App.pdf)",
"[https://www.udwiremc.com/wp-content/uploads/2026/01/2026_Residential_HVAC_Terms_Conditions.pdf](https://www.udwiremc.com/wp-content/uploads/2026/01/2026_Residential_HVAC_Terms_Conditions.pdf)"
],
"evidenceText": "UDWI's 2026 residential rebate pages and HVAC application list air-source, dual-fuel, mini-split, and geothermal heat pumps plus qualifying water heaters.",
"reasoningNotes": "Heat pump and geothermal matches are supported. The broad HVAC replacement category was narrowed and unrelated LED lighting excluded."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3601",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"PA"
],
"counties": [],
"cities": [],
"utilityTerritories": [],
"notes": "Statewide Pennsylvania program administered through the Commonwealth Financing Authority."
},
"eligibleApplicantTypes": [
"businesses",
"economic_development_organizations",
"individuals_for_geothermal_only",
"political_subdivisions",
"municipalities",
"counties",
"school_districts"
],
"eligibleSectors": [
"commercial",
"industrial",
"government",
"institutional",
"residential_geothermal_only"
],
"eligibleRetrofitCategories": [
"geothermal_system",
"ground_source_geothermal_heat_pump",
"wind_energy_generation_or_distribution",
"renewable_energy_component_manufacturing",
"renewable_energy_planning_feasibility_study"
],
"hardRequirements": [
"Project must assist geothermal technologies or wind energy projects in Pennsylvania.",
"Applicants must meet REP eligibility: business, economic development organization, individual for geothermal only, or political subdivision.",
"Program requires at least a one-to-one matching investment.",
"Application fee and loan commitment fee apply where relevant.",
"Awards are grants, loans, or loan guarantees subject to CFA approval and program caps."
],
"blockers": [
"Do not match generic heat_pump_hvac_retrofit or high_efficiency_hvac_replacement.",
"Non-geothermal HVAC equipment, conventional furnace or boiler replacements, and projects outside Pennsylvania are not eligible.",
"This is financing/grant support for renewable energy projects, not a utility HVAC rebate."
],
"programType": "grant_loan_loan_guarantee",
"administrator": "Pennsylvania Department of Community and Economic Development",
"applicationUrl": null,
"websiteUrl": "[https://dced.pa.gov/programs/renewable-energy-program-rep-geothermal-wind-projects/](https://dced.pa.gov/programs/renewable-energy-program-rep-geothermal-wind-projects/)",
"sourceUrlsChecked": [
"[https://dced.pa.gov/programs/renewable-energy-program-rep-geothermal-wind-projects/](https://dced.pa.gov/programs/renewable-energy-program-rep-geothermal-wind-projects/)",
"[https://dced.pa.gov/programs-funding/commonwealth-financing-authority-cfa/energy-programs/](https://dced.pa.gov/programs-funding/commonwealth-financing-authority-cfa/energy-programs/)"
],
"evidenceText": "DCED states that REP provides grants and loans for geothermal technologies, wind energy projects, component manufacturing, and feasibility studies.",
"reasoningNotes": "Geothermal was preserved only as geothermal systems/GSHP. Generic heat pump and HVAC replacement matches are false positives."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2250",
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
"Wright-Hennepin Cooperative Electric Association"
],
"notes": "Limited to commercial, industrial, and agricultural members served by Wright-Hennepin."
},
"eligibleApplicantTypes": [
"commercial_members",
"industrial_members",
"agricultural_members"
],
"eligibleSectors": [
"commercial",
"industrial",
"agricultural"
],
"eligibleRetrofitCategories": [
"led_lighting_retrofit",
"lighting_controls",
"high_efficiency_rooftop_unit",
"high_efficiency_split_system_hvac",
"air_source_heat_pump",
"ground_source_geothermal_heat_pump",
"packaged_terminal_air_conditioner",
"variable_air_volume_system",
"chiller_upgrade",
"variable_frequency_drive",
"motor_control_system",
"high_efficiency_ventilation",
"fractional_horsepower_motor",
"compressed_air_system",
"commercial_kitchen_equipment",
"commercial_ev_charging",
"facility_recommissioning",
"dairy_production_efficiency"
],
"hardRequirements": [
"Applicant must be a Wright-Hennepin commercial, industrial, or agricultural electric member.",
"Project must involve qualifying electric efficiency improvements and reduce energy use.",
"Pre-approval by a WH commercial account representative is strongly recommended and may be required for incentive assurance.",
"Measure-specific applications, worksheets, invoices, and equipment documentation apply.",
"Funding and incentive levels vary and are limited."
],
"blockers": [
"Residential appliance, refrigerator recycling, and home weatherization programs are separate and should not match this nonresidential opportunity.",
"Commercial refrigeration is not expressly listed on the current WH commercial rebate page; do not match high_efficiency_refrigeration_equipment without project-specific custom approval.",
"Projects without WH approval, outside WH service territory, or not reducing electric energy consumption should not match."
],
"programType": "rebate",
"administrator": "Wright-Hennepin Cooperative Electric Association",
"applicationUrl": null,
"websiteUrl": "[https://www.whe.org/commercial-programs-rebates](https://www.whe.org/commercial-programs-rebates)",
"sourceUrlsChecked": [
"[https://www.whe.org/commercial-programs-rebates](https://www.whe.org/commercial-programs-rebates)",
"[https://www.whe.org/sites/default/files/2026-retrofit-lighting-rebate-info-and-application.pdf](https://www.whe.org/sites/default/files/2026-retrofit-lighting-rebate-info-and-application.pdf)",
"[https://www.whe.org/sites/default/files/2026-02/2026-rtu-and-split-systems-rebate-application.pdf](https://www.whe.org/sites/default/files/2026-02/2026-rtu-and-split-systems-rebate-application.pdf)"
],
"evidenceText": "WH's commercial page lists lighting, HVAC, motor-control, EV charging, ventilation, kitchen equipment, compressed air, recommissioning, and dairy efficiency incentives.",
"reasoningNotes": "LED and nonresidential HVAC are supported. The refrigeration match was blocked because current official WH materials did not expressly list commercial refrigeration."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5770",
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
"Focus on Energy participating Wisconsin utilities",
"Xcel Energy (Northern States Power)"
],
"notes": "Statewide Focus on Energy business incentives are available only to customers of participating Wisconsin utilities; Xcel Energy is one listed participating utility."
},
"eligibleApplicantTypes": [
"business_customers",
"agricultural_customers",
"schools",
"government_customers",
"nonprofits",
"multifamily_property_owners",
"industrial_customers"
],
"eligibleSectors": [
"commercial",
"industrial",
"agricultural",
"education",
"government",
"nonprofit",
"multifamily"
],
"eligibleRetrofitCategories": [
"commercial_refrigeration",
"hvac_equipment_upgrade",
"led_lighting_retrofit",
"lighting_controls",
"agribusiness_efficiency",
"building_performance_optimization",
"laboratory_energy_efficiency",
"process_systems_efficiency",
"multifamily_efficiency",
"business_renewable_energy"
],
"hardRequirements": [
"Applicant must be served by a participating Wisconsin utility or cooperative.",
"Business rebates apply to qualifying products purchased and installed between January 1 and December 31, 2026.",
"Registered Trade Allies should be used where applicable to ensure qualifying equipment.",
"Applications and required supplemental data must be submitted by program deadlines.",
"Some natural gas measures require service from a participating natural gas utility."
],
"blockers": [
"Not exclusive to Xcel Energy; Xcel is one participating Wisconsin utility under Focus on Energy.",
"Residential rebates are separate and should not be inferred for this business-focused opportunity.",
"Projects outside Wisconsin or outside participating utility service are not eligible."
],
"programType": "rebate",
"administrator": "Focus on Energy",
"applicationUrl": "[https://assets.focusonenergy.com/production/docs/business/mktg-fillable-rebate-app-20260101.pdf](https://assets.focusonenergy.com/production/docs/business/mktg-fillable-rebate-app-20260101.pdf)",
"websiteUrl": "[https://focusonenergy.com/business/rebates](https://focusonenergy.com/business/rebates)",
"sourceUrlsChecked": [
"[https://focusonenergy.com/business/rebates](https://focusonenergy.com/business/rebates)",
"[https://focusonenergy.com/about/participating-utilities](https://focusonenergy.com/about/participating-utilities)",
"[https://assets.focusonenergy.com/production/docs/business/mktg-fillable-rebate-app-20260101.pdf](https://assets.focusonenergy.com/production/docs/business/mktg-fillable-rebate-app-20260101.pdf)"
],
"evidenceText": "Focus on Energy's 2026 business rebates include commercial refrigeration, HVAC, lighting, agribusiness, laboratory, multifamily, and process systems; Xcel is a participating utility.",
"reasoningNotes": "The refrigeration, HVAC, and lighting matches are supported for eligible Focus on Energy business customers, not as a standalone Xcel-only program."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:4816",
"confidence": "low",
"availabilityStatus": "source_inaccessible",
"geography": {
"country": "US",
"states": [
"ND"
],
"counties": [],
"cities": [],
"utilityTerritories": [
"Xcel Energy"
],
"notes": "Likely limited to Xcel Energy North Dakota residential service territory, but current official measure-level eligibility could not be verified from readable sources."
},
"eligibleApplicantTypes": [],
"eligibleSectors": [],
"eligibleRetrofitCategories": [],
"hardRequirements": [],
"blockers": [
"Current Xcel North Dakota heating-upgrade rebate page is JavaScript/dynamic and did not expose current eligibility details.",
"Do not match boiler, furnace, or generic HVAC replacement until current Xcel North Dakota measure terms are verified from an official readable source.",
"Older Xcel documents and search snippets are insufficient to confirm 2026 North Dakota eligibility."
],
"programType": "rebate",
"administrator": "Xcel Energy",
"applicationUrl": "[https://www.xcelenergy.com/digital_application](https://www.xcelenergy.com/digital_application)",
"websiteUrl": "[https://nd.my.xcelenergy.com/s/residential/heating-cooling/heating-upgrade-rebates](https://nd.my.xcelenergy.com/s/residential/heating-cooling/heating-upgrade-rebates)",
"sourceUrlsChecked": [
"[https://nd.my.xcelenergy.com/s/residential/heating-cooling/heating-upgrade-rebates](https://nd.my.xcelenergy.com/s/residential/heating-cooling/heating-upgrade-rebates)",
"[https://www.xcelenergy.com/digital_application](https://www.xcelenergy.com/digital_application)",
"[https://xcelenergy.com/staticfiles/xe/Marketing/Files/MN-Res-Heating-Rebate-Application.pdf](https://xcelenergy.com/staticfiles/xe/Marketing/Files/MN-Res-Heating-Rebate-Application.pdf)"
],
"evidenceText": "The current Xcel North Dakota rebate page could not be read beyond dynamic loading; the digital application is active but does not show measure-level eligibility.",
"reasoningNotes": "Marked source_inaccessible to prevent matching on outdated furnace/boiler assumptions. Current official details must be verified before restoring categories."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5823",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"LA"
],
"counties": [],
"cities": [],
"utilityTerritories": [
"SWEPCO Louisiana"
],
"notes": "Limited to eligible nonresidential facilities with SWEPCO Louisiana electric distribution service."
},
"eligibleApplicantTypes": [
"commercial_customers",
"project_sponsors",
"market_actors",
"escos",
"contractors"
],
"eligibleSectors": [
"commercial",
"industrial",
"nonresidential"
],
"eligibleRetrofitCategories": [
"led_lighting_retrofit",
"hvac_vrf_or_heat_pump",
"hvac_air_conditioning_upgrade",
"smart_thermostat",
"heat_pump_water_heater",
"high_efficiency_refrigeration_equipment",
"refrigeration_controls",
"commercial_kitchen_equipment",
"low_flow_pre_rinse_spray_valve",
"compressed_air_system",
"variable_frequency_drive",
"demand_controlled_ventilation",
"ecm_motor",
"level_2_ev_charger_installation",
"high_frequency_battery_charger",
"hvac_tune_up",
"custom_electric_efficiency"
],
"hardRequirements": [
"Facility must have nonresidential SWEPCO Louisiana electric distribution service.",
"Measures must reduce electric energy consumption and summer daytime peak demand.",
"Project Sponsor or Market Actor must register and obtain pre-approval before project installation.",
"Required agreements, W-9, equipment surveys, certifications, specifications, invoices, and photos must be submitted.",
"Program operates within 2026 program dates, budget, and sponsor incentive limits."
],
"blockers": [
"Self-generation, cogeneration, no-capital behavior changes, negative environmental or health impacts, fuel-switching to electric, and projects already receiving another SWEPCO incentive are excluded.",
"Residential measures are separate SWEPCO programs and should not match this commercial standard offer.",
"Pre-rinse spray valves are product-specific commercial kitchen measures and should not be generalized to broad plumbing retrofits."
],
"programType": "commercial_standard_offer_rebate",
"administrator": "SWEPCO",
"applicationUrl": "[https://swepcola.p3.enertrek.com/Users/Account/Register](https://swepcola.p3.enertrek.com/Users/Account/Register)",
"websiteUrl": "[https://swepcosolutions.com/programs/business-programs/louisiana-commercial-solutions-standard-offer-program/](https://swepcosolutions.com/programs/business-programs/louisiana-commercial-solutions-standard-offer-program/)",
"sourceUrlsChecked": [
"[https://swepcosolutions.com/programs/business-programs/louisiana-commercial-solutions-standard-offer-program/](https://swepcosolutions.com/programs/business-programs/louisiana-commercial-solutions-standard-offer-program/)",
"[https://swepcosolutions.com/wp-content/uploads/2026/05/2026-SWEPCO-Louisiana-Large-Commercial-Overview-1.pdf](https://swepcosolutions.com/wp-content/uploads/2026/05/2026-SWEPCO-Louisiana-Large-Commercial-Overview-1.pdf)",
"[https://swepcosolutions.com/wp-content/uploads/2026/05/2026-SWEPCO-Louisiana-Small-Commercial-Solutions-Overview-1.pdf](https://swepcosolutions.com/wp-content/uploads/2026/05/2026-SWEPCO-Louisiana-Small-Commercial-Solutions-Overview-1.pdf)",
"[https://swepcola.p3.enertrek.com/Users/Account/Register](https://swepcola.p3.enertrek.com/Users/Account/Register)"
],
"evidenceText": "SWEPCO's 2026 CSOL materials list nonresidential lighting, HVAC, refrigeration, kitchen, EV charging, compressed air, VFD, and custom electric efficiency measures.",
"reasoningNotes": "The supplied HVAC and LED matches are supported, and current official materials also support refrigeration and other specific nonresidential electric measures."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:78",
"confidence": "medium",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"OH"
],
"counties": [],
"cities": [],
"utilityTerritories": [],
"notes": "Statewide Ohio program for OAQDA-approved Air Quality Facility projects."
},
"eligibleApplicantTypes": [
"businesses",
"developers",
"property_owners",
"utilities",
"governments",
"institutions"
],
"eligibleSectors": [
"commercial",
"industrial",
"government",
"institutional",
"utility_scale_renewable"
],
"eligibleRetrofitCategories": [
"pollution_control_equipment",
"energy_conservation_measures",
"efficiently_designed_building",
"renewable_energy_generation",
"alternative_fuel_vehicle_refueling_or_recharging_infrastructure",
"solid_waste_recycling_or_disposal"
],
"hardRequirements": [
"Project must be approved by OAQDA as an Air Quality Facility under Chapter 3706 and CAIP guidelines.",
"Financing and tax benefits require OAQDA application review and board approval.",
"Tax exemptions generally apply only to qualifying project components and, for bond benefits, require OAQDA bond issuance before eligible purchases.",
"Energy conservation and renewable projects must meet technical, measurement, verification, and local-support requirements where applicable."
],
"blockers": [
"Standalone battery_storage_system is not supported by the current CAIP guidelines searched.",
"biomass_biogas_energy_system should not match as a general category; biomass is unsupported unless a specific project independently qualifies as renewable energy generation or an Air Quality Facility.",
"This is tax-exempt bond/financing support, not a direct retrofit rebate."
],
"programType": "tax_exempt_bond_financing",
"administrator": "Ohio Air Quality Development Authority",
"applicationUrl": "[https://dam.assets.ohio.gov/image/upload/ohioairquality.ohio.gov/About%20Us/RFQ/Clean_Air_Improvement_Project_CAIP_Application.pdf](https://dam.assets.ohio.gov/image/upload/ohioairquality.ohio.gov/About%20Us/RFQ/Clean_Air_Improvement_Project_CAIP_Application.pdf)",
"websiteUrl": null,
"sourceUrlsChecked": [
"[https://www.ohioairquality.org/](https://www.ohioairquality.org/)",
"[https://ohioairquality.ohio.gov/incentives-and-financing/clean-air-improvement-program](https://ohioairquality.ohio.gov/incentives-and-financing/clean-air-improvement-program)",
"[https://dam.assets.ohio.gov/image/upload/ohioairquality.ohio.gov/About%20Us/RFQ/Clean_Air_Improvement_Project_CAIP_Application.pdf](https://dam.assets.ohio.gov/image/upload/ohioairquality.ohio.gov/About%20Us/RFQ/Clean_Air_Improvement_Project_CAIP_Application.pdf)",
"[https://dam.assets.ohio.gov/image/upload/v1724937357/ohioairquality.ohio.gov/Incentives_Financing/CAIP/OAQDA_Economic_Development_Tools.png.pdf](https://dam.assets.ohio.gov/image/upload/v1724937357/ohioairquality.ohio.gov/Incentives_Financing/CAIP/OAQDA_Economic_Development_Tools.png.pdf)"
],
"evidenceText": "OAQDA's revised CAIP guidelines support bonds, tax exemptions, credit enhancement, and loans for approved Air Quality Facility projects and clean air improvements.",
"reasoningNotes": "Current readable official CAIP guidelines support broad clean air, energy conservation, renewable generation, and vehicle refueling/recharging infrastructure, not the specific battery or biomass matches supplied."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22739",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"AL"
],
"counties": [],
"cities": [],
"utilityTerritories": [
"Alabama Power"
],
"notes": "Limited to Alabama Power residential customers at qualifying single-family homes."
},
"eligibleApplicantTypes": [
"residential_electric_customers",
"single_family_home_customers",
"ev_owners_or_lessees"
],
"eligibleSectors": [
"residential"
],
"eligibleRetrofitCategories": [
"level_2_ev_charger_installation"
],
"hardRequirements": [
"Applicant must be a residential Alabama Power customer.",
"Residence must be a single-family home.",
"Customer must verify ownership or lease of a BEV or PHEV at the installation site.",
"Charger must be a new Level 2 240V charger on a dedicated circuit.",
"Required documents include installed-charger photo, serial number, proof of transaction, and applicable installation-cost documentation.",
"Charger must have been received within 90 days of rebate application date and only one charger rebate is allowed per installation site."
],
"blockers": [
"Level 1 chargers, used chargers, DC fast chargers, and multifamily or business sites are not eligible under this home rebate.",
"The separate business Make Ready Program and EV charging rewards should not be merged into this residential home charger rebate.",
"Do not match general EV purchase incentives; this opportunity is only for Level 2 home charger purchase and installation."
],
"programType": "rebate",
"administrator": "Alabama Power Co.",
"applicationUrl": "[https://apcevhomecharger.customerapplication.com/](https://apcevhomecharger.customerapplication.com/)",
"websiteUrl": "[https://www.alabamapower.com/residential/save-money-and-energy/electric-vehicles/ev-home-charger-rebate.html](https://www.alabamapower.com/residential/save-money-and-energy/electric-vehicles/ev-home-charger-rebate.html)",
"sourceUrlsChecked": [
"[https://www.alabamapower.com/residential/save-money-and-energy/electric-vehicles/ev-home-charger-rebate.html](https://www.alabamapower.com/residential/save-money-and-energy/electric-vehicles/ev-home-charger-rebate.html)",
"[https://www.alabamapower.com/residential/save-money-and-energy/rebates-and-incentives.html](https://www.alabamapower.com/residential/save-money-and-energy/rebates-and-incentives.html)",
"[https://apcevhomecharger.customerapplication.com/](https://apcevhomecharger.customerapplication.com/)"
],
"evidenceText": "Alabama Power offers a one-time $500 rebate for residential customers installing a new Level 2 240V charger at a single-family home.",
"reasoningNotes": "The Level 2 EV charger match is correct. The category was narrowed to residential Level 2 home charger installation."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22158",
"confidence": "high",
"availabilityStatus": "unavailable",
"geography": {
"country": "US",
"states": [
"CO"
],
"counties": [],
"cities": [],
"utilityTerritories": [],
"notes": "Historical statewide Colorado alternative fuel program; no current application source was verified."
},
"eligibleApplicantTypes": [],
"eligibleSectors": [],
"eligibleRetrofitCategories": [],
"hardRequirements": [],
"blockers": [
"AFDC lists the ALT Fuels Colorado program as expired on January 1, 2022.",
"The CleanAirFleets program URL supplied for current program information returns not found.",
"Do not match current Level 2 EV charger installation or EVSE projects to this inactive opportunity.",
"Current Colorado EV charging grants, if any, must be handled as separate programs."
],
"programType": "grant",
"administrator": "Regional Air Quality Council",
"applicationUrl": null,
"websiteUrl": "[https://raqc.org/our_programs/alt-fuels-colorado/](https://raqc.org/our_programs/alt-fuels-colorado/)",
"sourceUrlsChecked": [
"[http://cleanairfleets.org/programs/alt-fuels-colorado](http://cleanairfleets.org/programs/alt-fuels-colorado)",
"[https://raqc.org/our_programs/alt-fuels-colorado/](https://raqc.org/our_programs/alt-fuels-colorado/)",
"[https://afdc.energy.gov/laws/11488](https://afdc.energy.gov/laws/11488)"
],
"evidenceText": "RAQC still describes ALT Fuels Colorado historically, but the current CleanAirFleets link is not found and AFDC marks the program expired in 2022.",
"reasoningNotes": "Marked unavailable. Historical materials discuss alternative-fuel vehicles and fueling infrastructure, but no current active opportunity should be matched."
}
],
"continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:1625"
}
