{
"schemaVersion": "opportunity_data_research_repairs.v1",
"researchedAt": "2026-07-01",
"source": "gpt_pro",
"repairs": [
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:4527",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"MI"
],
"counties": [],
"cities": [],
"utilityTerritories": [
"Upper Peninsula Power Company"
],
"notes": "UPPCO residential electric customers in the utility service territory."
},
"eligibleApplicantTypes": [
"residential_customers",
"homeowners",
"renters",
"income_qualified_households",
"multifamily_property_owners"
],
"eligibleSectors": [
"residential",
"multifamily"
],
"eligibleRetrofitCategories": [
"heat_pump_hvac_retrofit",
"heat_pump_water_heater",
"residential_energy_star_appliances",
"residential_refrigerator_freezer_rebate",
"residential_dishwasher_rebate",
"residential_clothes_washer_rebate",
"residential_clothes_dryer_rebate",
"residential_heat_pump_clothes_dryer",
"appliance_recycling_refrigerator_freezer",
"led_lighting_retrofit",
"insulation_upgrade",
"duct_sealing",
"low_flow_fixture_retrofit"
],
"hardRequirements": [
"Applicant must be a UPPCO residential customer for residential offerings.",
"ENERGY STAR appliance rebates must be submitted within the calendar year of purchase and meet listed equipment specifications.",
"Appliance recycling is limited to working residential refrigerators, freezers, dehumidifiers, mini-fridges and room air conditioners, with program quantity limits.",
"Heat pump incentives require qualifying equipment efficiency ratings and applicable bonus criteria.",
"Empower Program upgrades require income qualification."
],
"blockers": [
"Commercial dishwasher, commercial refrigeration and commercial laundry matches are false positives for this residential program.",
"Room air conditioner recycling is not window replacement.",
"Commercial and industrial accounts are excluded from the appliance recycling offer.",
"Broad HVAC replacement should match only qualifying heat pump or listed residential equipment."
],
"programType": "Rebate Program",
"administrator": "Upper Peninsula Power Company",
"applicationUrl": null,
"websiteUrl": "[https://ee.uppco.com/uppco-residential-energy/](https://ee.uppco.com/uppco-residential-energy/)",
"sourceUrlsChecked": [
"[https://ee.uppco.com/uppco-residential-energy/](https://ee.uppco.com/uppco-residential-energy/)",
"[https://ee.uppco.com/heatpump/](https://ee.uppco.com/heatpump/)",
"[https://ee.uppco.com/uppco-energy-star/](https://ee.uppco.com/uppco-energy-star/)",
"[https://ee.uppco.com/appliance-recycling/](https://ee.uppco.com/appliance-recycling/)",
"[https://ee.uppco.com/uppco-empower-program/](https://ee.uppco.com/uppco-empower-program/)",
"[https://ee.uppco.com/uppco-residential-energy-insights/](https://ee.uppco.com/uppco-residential-energy-insights/)"
],
"evidenceText": "UPPCO residential pages list heat pump, ENERGY STAR appliance, appliance recycling, Empower and energy-insights offerings. Appliance recycling is residential-only; Empower adds income-qualified LED, insulation and duct-sealing measures.",
"reasoningNotes": "Kept residential heat pumps, heat pump water heaters, ENERGY STAR appliances and income-qualified weatherization; removed commercial appliance and refrigeration interpretations."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5819",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"MD"
],
"counties": [],
"cities": [],
"utilityTerritories": [
"Washington Gas"
],
"notes": "Maryland residential Washington Gas customers under EmPOWER Maryland."
},
"eligibleApplicantTypes": [
"residential_customers",
"homeowners",
"renters",
"income_qualified_households",
"multifamily_property_owners"
],
"eligibleSectors": [
"residential",
"multifamily"
],
"eligibleRetrofitCategories": [
"high_efficiency_furnace_retrofit",
"high_efficiency_boiler_retrofit",
"combination_heating_unit",
"furnace_boiler_tune_up",
"high_efficiency_gas_water_heater",
"gas_storage_water_heater",
"gas_tankless_water_heater",
"residential_gas_clothes_dryer",
"insulation_upgrade",
"lighting_retrofit",
"home_energy_audit",
"weatherization_assistance",
"furnace_safety_repair",
"refrigerator_retrofit"
],
"hardRequirements": [
"Applicant must be a Washington Gas Maryland residential customer for direct residential rebates.",
"Existing home heating, water-heating and tune-up rebates require qualifying gas equipment and participating-contractor submission.",
"Furnaces, boilers and water heaters must meet listed ENERGY STAR, AFUE or UEF criteria.",
"Income-qualified weatherization is administered through Maryland DHCD programs and requires income or property eligibility.",
"Multifamily income-qualified offerings require applicable affordable-housing eligibility."
],
"blockers": [
"Automated demand response should not match because Smart Energy Rewards ended March 31, 2026.",
"No broad HVAC replacement beyond listed gas furnace, boiler, combination heating unit and tune-up measures.",
"No electric heat pump rebate in this residential gas program.",
"Insulation and broader weatherization are limited to income-qualified or DHCD-administered pathways."
],
"programType": "Rebate Program",
"administrator": "Washington Gas",
"applicationUrl": "[https://wghomesavings.com/](https://wghomesavings.com/)",
"websiteUrl": "[https://wgsmartsavings.com/programs-rebates/home/md](https://wgsmartsavings.com/programs-rebates/home/md)",
"sourceUrlsChecked": [
"[https://wgsmartsavings.com/programs-rebates/home/md](https://wgsmartsavings.com/programs-rebates/home/md)",
"[https://wgsmartsavings.com/programs-rebates/md/home-heating](https://wgsmartsavings.com/programs-rebates/md/home-heating)",
"[https://wgsmartsavings.com/programs-rebates/md/water-heaters](https://wgsmartsavings.com/programs-rebates/md/water-heaters)",
"[https://wgsmartsavings.com/programs-rebates/md/smart-energy-rewards](https://wgsmartsavings.com/programs-rebates/md/smart-energy-rewards)",
"[https://wgsmartsavings.com/programs-rebates/md/income-qualifying-energy-efficiency-program](https://wgsmartsavings.com/programs-rebates/md/income-qualifying-energy-efficiency-program)",
"[https://wghomesavings.com/](https://wghomesavings.com/)"
],
"evidenceText": "Maryland residential pages verify gas furnace, boiler, water-heater, tune-up and clothes-dryer rebates plus DHCD income-qualified weatherization. Smart Energy Rewards shows an end date of March 31, 2026.",
"reasoningNotes": "Kept gas equipment, selected income-qualified weatherization and audit pathways; blocked demand response because the current source marks that offer ended."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2249",
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
"notes": "Residential members in Wright-Hennepin's electric service territory."
},
"eligibleApplicantTypes": [
"residential_members",
"homeowners",
"renters"
],
"eligibleSectors": [
"residential"
],
"eligibleRetrofitCategories": [
"level_2_ev_charger_installation",
"ground_source_geothermal_heat_pump",
"air_source_heat_pump",
"ductless_mini_split_heat_pump",
"air_source_heat_pump_tune_up",
"dual_fuel_heating",
"electric_water_heater",
"heat_pump_water_heater",
"variable_speed_pool_pump",
"electronically_commutated_motor",
"refrigerator_freezer_recycling"
],
"hardRequirements": [
"Applicant must be a Wright-Hennepin residential member and meet the applicable ESP or ECO program rules.",
"Level 2 EV charger rebate requires a qualifying 240-volt wall-mounted charger, separate outdoor meter and enrollment in the EV time-of-use rate.",
"Ground-source heat pumps must meet COP and service requirements and be enrolled in the cooperative program.",
"Heat pump rebates require qualifying equipment and installation requirements.",
"Rebates are subject to current program forms, inspection, metering and funding rules."
],
"blockers": [
"EV charging belongs to the cooperative's EV charging and time-of-use offering, not a generic residential efficiency rebate.",
"Electronically commutated motor support is not specifically a refrigeration EC motor retrofit.",
"No broad commercial refrigeration, commercial HVAC or industrial measures should match this residential program.",
"High-efficiency HVAC replacement should be limited to qualifying heat pump or dual-fuel measures."
],
"programType": "Rebate Program",
"administrator": "Wright-Hennepin Cooperative Electric Association",
"applicationUrl": null,
"websiteUrl": "[https://www.whe.org/rebates](https://www.whe.org/rebates)",
"sourceUrlsChecked": [
"[https://www.whe.org/rebates](https://www.whe.org/rebates)",
"[https://www.whe.org/electric-vehicle-charging-program](https://www.whe.org/electric-vehicle-charging-program)",
"[https://www.whe.org/ground-source-heat-pumps](https://www.whe.org/ground-source-heat-pumps)"
],
"evidenceText": "Wright-Hennepin's 2026 rebate list includes EV charging, ground-source and air-source heat pumps, ASHP tune-ups, water heating, pool pump, dual fuel, ECM and refrigerator/freezer recycling measures.",
"reasoningNotes": "Preserved heat pump, geothermal and Level 2 EV charger categories with program boundaries; narrowed ECM and recycling categories to residential context."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5171",
"confidence": "medium",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"TX"
],
"counties": [],
"cities": [],
"utilityTerritories": [
"AEP Texas Central Division"
],
"notes": "AEP Texas Central Division facilities; CitySmart is aimed at government, municipal and other public-sector institutions."
},
"eligibleApplicantTypes": [
"local_governments",
"municipalities",
"government_institutions",
"public_agencies"
],
"eligibleSectors": [
"non_residential",
"public_sector",
"local_government"
],
"eligibleRetrofitCategories": [
"building_benchmarking_compliance",
"energy_master_planning",
"led_lighting_retrofit",
"lighting_controls_retrofit",
"hvac_controls_retrofit",
"high_efficiency_hvac_replacement",
"electric_chiller_upgrade",
"variable_frequency_drive",
"building_envelope_retrofit",
"energy_star_roof",
"air_infiltration_reduction"
],
"hardRequirements": [
"Facility must receive AEP Texas Central electric delivery service.",
"Applicant must be a qualifying public-sector or government customer for CitySmart.",
"Projects generally require program approval, savings documentation and inspection or verification.",
"Incentives depend on current funding availability and measure-specific energy savings."
],
"blockers": [
"Efficient air compressor was not verified for the current CitySmart public-sector offering.",
"Benchmarking and master planning are technical assistance, not physical retrofits.",
"This is not a residential or general small-business program.",
"Food service and refrigeration measures appear in separate AEP commercial offerings unless specifically accepted through CitySmart."
],
"programType": "Rebate Program",
"administrator": "AEP Texas",
"applicationUrl": null,
"websiteUrl": "[https://aeptxsaves.com/commercial-programs/](https://aeptxsaves.com/commercial-programs/)",
"sourceUrlsChecked": [
"[https://aeptxsaves.com/](https://aeptxsaves.com/)",
"[https://aeptxsaves.com/commercial-programs/](https://aeptxsaves.com/commercial-programs/)",
"[https://aeptxsaves.com/commercial-programs/commercial-standard-offer/](https://aeptxsaves.com/commercial-programs/commercial-standard-offer/)",
"[https://aeptexasefficiency.com/#/](https://aeptexasefficiency.com/#/)"
],
"evidenceText": "AEP Texas commercial pages still list CitySmart and show public-sector efficiency offerings centered on HVAC, lighting, controls and building-envelope measures. The CitySmart detail page did not render usable content.",
"reasoningNotes": "Kept categories supported by current AEP commercial/public-sector references; downgraded confidence because the CitySmart detail page was not fully readable."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22775",
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
"notes": "District of Columbia residents and buildings subject to DOEE and DCSEU approval."
},
"eligibleApplicantTypes": [
"income_qualified_homeowners",
"income_qualified_renters",
"multifamily_property_owners",
"affordable_housing_owners",
"tenants"
],
"eligibleSectors": [
"residential",
"multifamily",
"affordable_housing"
],
"eligibleRetrofitCategories": [
"heat_pump_hvac_retrofit",
"ductless_mini_split_heat_pump",
"heat_pump_water_heater",
"induction_cooking_equipment",
"heat_pump_clothes_dryer",
"programmable_thermostat",
"electrical_panel_upgrade",
"home_electrification"
],
"hardRequirements": [
"Applicant or building must be in the District of Columbia.",
"Single-family applicants must meet income or categorical eligibility criteria.",
"Measures must generally replace gas or oil heating, water heating or cooking equipment with electric equipment.",
"Projects require DCSEU assessment, DOEE approval and use of program contractors.",
"Multifamily FY2026 applications are limited and may be placed on a waitlist."
],
"blockers": [
"Not a commercial or industrial process-electrification program.",
"Not a general weatherization, insulation or air-sealing rebate.",
"Solar for All and other solar programs are separate from AHEP.",
"Multifamily projects must follow the separate AHEP multifamily process and current waitlist status."
],
"programType": "No-cost electrification program",
"administrator": "DC Sustainable Energy Utility",
"applicationUrl": "[https://www.dcseu.com/ahep-sfa-apply](https://www.dcseu.com/ahep-sfa-apply)",
"websiteUrl": "[https://www.dcseu.com/affordable-home-electrification](https://www.dcseu.com/affordable-home-electrification)",
"sourceUrlsChecked": [
"[https://www.dcseu.com/affordable-home-electrification](https://www.dcseu.com/affordable-home-electrification)",
"[https://www.dcseu.com/ahep-sfa-apply](https://www.dcseu.com/ahep-sfa-apply)",
"[https://www.dcseu.com/affordable-multifamily-electrification](https://www.dcseu.com/affordable-multifamily-electrification)",
"[https://www.dcseu.com/ahep-mf-apply](https://www.dcseu.com/ahep-mf-apply)",
"[https://doee.dc.gov/service/federal-home-energy-rebates-and-healthy-homes-act-2024](https://doee.dc.gov/service/federal-home-energy-rebates-and-healthy-homes-act-2024)"
],
"evidenceText": "AHEP covers income-qualified District residents replacing gas or oil space heating, water heating and cooking equipment with heat pumps, induction, thermostats and related electrical work; multifamily applications are waitlisted.",
"reasoningNotes": "Kept residential and multifamily electrification equipment; removed weatherization and industrial process electrification matches."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:4056",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"VT"
],
"counties": [],
"cities": [],
"utilityTerritories": [
"Efficiency Vermont participating electric utility service territories"
],
"notes": "Statewide Vermont electric-utility customers served by Efficiency Vermont; some gas-related hot-water projects may be directed to Vermont Gas."
},
"eligibleApplicantTypes": [
"farms",
"agricultural_businesses",
"dairy_farms",
"greenhouses",
"indoor_growing_operations",
"maple_producers",
"businesses"
],
"eligibleSectors": [
"agricultural",
"commercial"
],
"eligibleRetrofitCategories": [
"agricultural_led_lighting",
"indoor_growing_led_lighting",
"efficient_agricultural_ventilation_fans",
"ventilation_fan_vfd_controls",
"agricultural_heat_recovery_unit",
"plate_cooler",
"milk_vacuum_pump_vfd",
"maple_sap_vacuum_pump_vfd",
"maple_reverse_osmosis_system",
"high_efficiency_refrigeration_condensing_unit",
"greenhouse_equipment",
"custom_agricultural_efficiency_project"
],
"hardRequirements": [
"Applicant must be a Vermont farm, agricultural operation or qualifying business served through Efficiency Vermont.",
"Measures must meet Efficiency Vermont's product-specific eligibility criteria.",
"Dairy heat recovery, plate cooler and VFD measures have herd-size, new-construction or equipment restrictions.",
"Custom projects and certain equipment require Efficiency Vermont review or preapproval.",
"Funding and eligibility can vary by measure and utility service."
],
"blockers": [
"Low-flow fixture is a false positive from the word fixture and is not supported by this agricultural equipment program.",
"Heat recovery means dairy or agricultural heat-recovery units, not generic industrial waste heat recovery.",
"Refrigeration support is product-specific, such as condensing units and plate coolers, not broad commercial refrigeration replacement.",
"This program is not residential weatherization."
],
"programType": "Rebate Program",
"administrator": "Efficiency Vermont",
"applicationUrl": "[https://rebates.efficiencyvermont.com/](https://rebates.efficiencyvermont.com/)",
"websiteUrl": "[https://www.efficiencyvermont.com/rebates/list?cat=agricultural+equipment&type=](https://www.efficiencyvermont.com/rebates/list?cat=agricultural+equipment&type=)",
"sourceUrlsChecked": [
"[https://www.efficiencyvermont.com/rebates/list?cat=agricultural+equipment&type=](https://www.efficiencyvermont.com/rebates/list?cat=agricultural+equipment&type=)",
"[https://www.efficiencyvermont.com/rebates/list/ventilation-fans-agriculture](https://www.efficiencyvermont.com/rebates/list/ventilation-fans-agriculture)",
"[https://www.efficiencyvermont.com/rebates/list/heat-recovery-units-agriculture](https://www.efficiencyvermont.com/rebates/list/heat-recovery-units-agriculture)",
"[https://www.efficiencyvermont.com/rebates/list/plate-coolers-agriculture](https://www.efficiencyvermont.com/rebates/list/plate-coolers-agriculture)",
"[https://www.efficiencyvermont.com/rebates/list/variable-frequency-drives-milk-vacuum-pumps](https://www.efficiencyvermont.com/rebates/list/variable-frequency-drives-milk-vacuum-pumps)",
"[https://www.efficiencyvermont.com/rebates/list/high-efficiency-condensing-unit](https://www.efficiencyvermont.com/rebates/list/high-efficiency-condensing-unit)"
],
"evidenceText": "Efficiency Vermont's agricultural equipment list verifies farm lighting, ventilation fans, dairy heat recovery, plate coolers, VFDs, maple RO, greenhouse or indoor-growing and condensing-unit measures.",
"reasoningNotes": "Narrowed fixtures, heat recovery and refrigeration to agriculture-specific products and removed unsupported water-fixture interpretations."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5799",
"confidence": "medium",
"availabilityStatus": "unknown",
"geography": {
"country": "US",
"states": [
"AL"
],
"counties": [],
"cities": [],
"utilityTerritories": [],
"notes": "Alabama PIER/C-PACE is enabled statewide but implemented by local governments that adopt a program or district; current participating jurisdictions were not verified."
},
"eligibleApplicantTypes": [
"commercial_property_owners",
"industrial_property_owners",
"multifamily_property_owners"
],
"eligibleSectors": [
"commercial",
"industrial",
"multifamily"
],
"eligibleRetrofitCategories": [
"commercial_pace_financing",
"energy_efficiency_financing",
"resilience_improvement_financing",
"wind_resistance_improvements",
"flood_mitigation_improvements"
],
"hardRequirements": [
"A local government must adopt or participate in a qualifying C-PACE or PIER program.",
"Financing is repaid through a voluntary property assessment rather than a rebate.",
"Existing mortgage or lien holders must provide required written consent and subordination.",
"Projects must qualify as energy-efficiency or resilience improvements under Alabama PIER/C-PACE rules.",
"Current ADECA materials indicate Alabama's statute did not allow new construction financing at the time reviewed."
],
"blockers": [
"Do not match as a rebate.",
"No current statewide applicant portal or adopted local program list was verified.",
"Discrete retrofit matches such as air sealing, insulation, LED lighting and EV charging are unsupported unless a local program guideline specifically includes them.",
"An energy audit alone is planning work and should not be treated as an eligible retrofit."
],
"programType": "PACE Financing",
"administrator": "Alabama Department of Economic and Community Affairs",
"applicationUrl": null,
"websiteUrl": "[https://adeca.alabama.gov/es/ley-de-seguros-de-propiedad-y-reduccion-de-energia-pier/](https://adeca.alabama.gov/es/ley-de-seguros-de-propiedad-y-reduccion-de-energia-pier/)",
"sourceUrlsChecked": [
"[https://adeca.alabama.gov/es/ley-de-seguros-de-propiedad-y-reduccion-de-energia-pier/](https://adeca.alabama.gov/es/ley-de-seguros-de-propiedad-y-reduccion-de-energia-pier/)",
"[https://adeca.alabama.gov/wp-content/uploads/C-PACE-Stakeholder-Kickoff.pdf](https://adeca.alabama.gov/wp-content/uploads/C-PACE-Stakeholder-Kickoff.pdf)",
"[https://adeca.alabama.gov/wp-content/uploads/Alabama-C-PACE-Considerations-Final.pdf](https://adeca.alabama.gov/wp-content/uploads/Alabama-C-PACE-Considerations-Final.pdf)",
"[https://www.pacenation.org/pace-programs/](https://www.pacenation.org/pace-programs/)"
],
"evidenceText": "ADECA describes PIER/C-PACE as long-term financing through special property-tax assessments for energy efficiency and resilience. Current statewide applicant portal or adopted local program list was not found.",
"reasoningNotes": "Treated as financing rather than measure-specific rebates; availability is unknown because current official implementation and local adoption could not be verified."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:4577",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"MD"
],
"counties": [
"Anne Arundel County"
],
"cities": [],
"utilityTerritories": [],
"notes": "County real property tax credit for high-performance buildings located in Anne Arundel County."
},
"eligibleApplicantTypes": [
"property_owners",
"commercial_property_owners",
"residential_property_owners"
],
"eligibleSectors": [
"residential",
"commercial"
],
"eligibleRetrofitCategories": [
"leed_certification",
"ngbs_certification",
"high_performance_building_certification"
],
"hardRequirements": [
"Property must be located in Anne Arundel County.",
"The building must qualify as a high-performance building under accepted certification standards such as LEED or NGBS at eligible levels.",
"Credit applies to county real property taxes on the building, not land.",
"Residential or commercial application must be filed with required certification documentation by the county deadline."
],
"blockers": [
"Individual equipment such as biomass, geothermal, HVAC and LED lighting does not qualify by itself under this high-performance-building credit.",
"Anne Arundel County geothermal and solar tax credits are separate programs.",
"This is a property tax credit, not an equipment rebate.",
"Do not infer renewable-energy or HVAC categories unless the project separately earns the building certification."
],
"programType": "Property Tax Incentive",
"administrator": "Anne Arundel County Office of Finance",
"applicationUrl": null,
"websiteUrl": "[https://www.aacounty.org/finance/tax-information/tax-credits-exemptions](https://www.aacounty.org/finance/tax-information/tax-credits-exemptions)",
"sourceUrlsChecked": [
"[https://www.aacounty.org/finance/tax-information/tax-credits-exemptions](https://www.aacounty.org/finance/tax-information/tax-credits-exemptions)",
"[https://www.aacounty.org/sites/default/files/2023-10/high-performance-building-residential.pdf](https://www.aacounty.org/sites/default/files/2023-10/high-performance-building-residential.pdf)",
"[https://www.aacounty.org/sites/default/files/2023-08/Bill%20No.%2054-23%20FINAL.pdf](https://www.aacounty.org/sites/default/files/2023-08/Bill%20No.%2054-23%20FINAL.pdf)"
],
"evidenceText": "County tax-credit page lists a High Performance Building Property Tax Credit with residential and commercial applications; separate geothermal and solar credits are listed apart from this certification-based credit.",
"reasoningNotes": "Reduced retrofit categories to certification-based building performance and blocked separate equipment tax credits from this opportunity."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5853",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"VA"
],
"counties": [],
"cities": [],
"utilityTerritories": [
"Appalachian Power Virginia service territory"
],
"notes": "Most non-residential Appalachian Power customers with facilities in Virginia; exclusions apply."
},
"eligibleApplicantTypes": [
"business_customers",
"commercial_customers",
"industrial_customers",
"agricultural_customers",
"non_residential_customers"
],
"eligibleSectors": [
"commercial",
"industrial",
"agricultural",
"non_residential"
],
"eligibleRetrofitCategories": [
"led_lighting_retrofit",
"lighting_controls_retrofit",
"refrigerated_case_lighting",
"high_efficiency_hvac_replacement",
"heat_pump_hvac_retrofit",
"hvac_controls_retrofit",
"smart_thermostat_controls",
"hvac_tune_up",
"electric_chiller_upgrade",
"variable_frequency_drive",
"heat_pump_water_heater",
"efficient_air_compressor",
"compressed_air_controls",
"high_efficiency_refrigeration_equipment",
"refrigeration_controls_retrofit",
"refrigeration_ec_motor_retrofit",
"vending_machine_controls",
"commercial_kitchen_equipment",
"high_efficiency_commercial_dishwasher",
"commercial_pre_rinse_spray_valve",
"commercial_ice_machine",
"agricultural_efficiency_equipment"
],
"hardRequirements": [
"Facility must be a non-residential Appalachian Power customer in Virginia.",
"Customer must not be opted out or served under excluded Public Authority or Commonwealth of Virginia tariffs.",
"Projects cannot receive another Appalachian Power rebate for the same measure.",
"Fuel switching, on-site generation, gas-driven equipment and used or rebuilt equipment are excluded.",
"Custom or non-lighting measures may require preapproval, documentation, inspection and savings verification."
],
"blockers": [
"Insulation is not listed in the current Business Energy Solutions eligible measures.",
"Residential measures and home weatherization are separate and should not match.",
"Pre-rinse spray valve is product-specific and should not be generalized to broad plumbing retrofits.",
"Fuel switching and on-site generation are explicitly excluded."
],
"programType": "Rebate Program",
"administrator": "Appalachian Power",
"applicationUrl": "[https://businessenergysolutions.takechargesavingsgateway.com/](https://businessenergysolutions.takechargesavingsgateway.com/)",
"websiteUrl": "[https://takechargeva.com/programs/for-your-business/business-energy-solutions](https://takechargeva.com/programs/for-your-business/business-energy-solutions)",
"sourceUrlsChecked": [
"[https://takechargeva.com/programs/for-your-business/business-energy-solutions](https://takechargeva.com/programs/for-your-business/business-energy-solutions)",
"[https://takechargeva.com/resources/docs/2026.04_Appalachian%20Power_VA%20BES%20Incentive%20Guide_Limited%20Time%20Offer.pdf](https://takechargeva.com/resources/docs/2026.04_Appalachian%20Power_VA%20BES%20Incentive%20Guide_Limited%20Time%20Offer.pdf)",
"[https://takechargeva.com/](https://takechargeva.com/)",
"[https://www.appalachianpower.com/savings/business/](https://www.appalachianpower.com/savings/business/)"
],
"evidenceText": "TakeChargeVA Business Energy Solutions offers non-residential incentives for lighting, controls, HVAC, VFDs, compressed air, refrigeration and food-service equipment; current exclusions remove fuel switching, generation and certain tariffs.",
"reasoningNotes": "Kept non-residential business measures; removed insulation and prevented food-service product matches from becoming broad plumbing or kitchen-general categories."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5785",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"AR",
"OK"
],
"counties": [],
"cities": [],
"utilityTerritories": [
"Arkansas Oklahoma Gas"
],
"notes": "AOG residential customers in Arkansas and Oklahoma; the DSIRE record state is Arkansas, but current official residential materials cover both states."
},
"eligibleApplicantTypes": [
"residential_customers",
"homeowners",
"renters",
"leaseholders",
"liheap_eligible_households"
],
"eligibleSectors": [
"residential"
],
"eligibleRetrofitCategories": [
"high_efficiency_furnace_retrofit",
"high_efficiency_gas_water_heater",
"gas_tankless_water_heater",
"smart_thermostat_zoning_retrofit",
"air_sealing_weatherization",
"insulation_upgrade",
"thermal_envelope_weatherization"
],
"hardRequirements": [
"Applicant must be an AOG customer in Arkansas or Oklahoma for applicable residential offers.",
"Heating and water-heating measures require qualifying natural gas equipment and listed efficiency levels.",
"Smart thermostats must be ENERGY STAR qualified and follow current timing and budget rules.",
"Weatherization is limited to homes meeting program criteria, including older single-family homes or duplexes for the AOG weatherization program.",
"Arkansas low-income weatherization requires applicable LIHEAP or income eligibility."
],
"blockers": [
"Do not match electric heat pumps or broad HVAC replacement beyond qualifying gas furnaces.",
"Weatherization is not automatic for all customers and requires program screening.",
"Smart thermostat rebate is not demand response.",
"This DSIRE residential repair does not generalize to broader commercial equipment, even though some AOG equipment materials mention small commercial eligibility."
],
"programType": "Rebate Program",
"administrator": "Arkansas Oklahoma Gas",
"applicationUrl": "[https://summitutilities.clearesult.com/](https://summitutilities.clearesult.com/)",
"websiteUrl": "[https://aogc.com/ResidentialRebates](https://aogc.com/ResidentialRebates)",
"sourceUrlsChecked": [
"[https://www.aogc.com/energyefficiency.aspx](https://www.aogc.com/energyefficiency.aspx)",
"[https://aogc.com/ResidentialRebates](https://aogc.com/ResidentialRebates)",
"[https://aogc.com/Article/618/](https://aogc.com/Article/618/)",
"[https://www.aogc.com/Documents/AOG_Rebate_HeatingEquipment_2026.pdf](https://www.aogc.com/Documents/AOG_Rebate_HeatingEquipment_2026.pdf)"
],
"evidenceText": "AOG's residential rebate page verifies Arkansas/Oklahoma gas furnace, tankless water-heater, ENERGY STAR smart-thermostat and qualifying residential weatherization offerings, with rebates subject to budget and rules.",
"reasoningNotes": "Kept gas space heating, gas water heating, smart thermostat and weatherization; constrained weatherization and excluded electric or broad commercial interpretations."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:1659",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"CA"
],
"counties": [
"Los Angeles County"
],
"cities": [
"Burbank"
],
"utilityTerritories": [
"Burbank Water & Power"
],
"notes": "Burbank Water and Power residential electric and water customers and Burbank residents; some water measures use partner programs."
},
"eligibleApplicantTypes": [
"residential_customers",
"homeowners",
"renters",
"multifamily_property_owners",
"low_income_customers",
"affordable_housing_providers"
],
"eligibleSectors": [
"residential",
"multifamily"
],
"eligibleRetrofitCategories": [
"level_2_ev_charger_installation",
"electrical_panel_upgrade",
"residential_refrigerator_freezer_rebate",
"room_air_conditioner_rebate",
"smart_thermostat_zoning_retrofit",
"smart_thermostat_demand_response",
"insulation_upgrade",
"attic_insulation",
"wall_insulation",
"duct_sealing",
"led_lighting_retrofit",
"low_flow_fixture_retrofit",
"high_efficiency_toilet",
"variable_speed_pool_pump",
"pool_cover"
],
"hardRequirements": [
"Applicant must be a BWP residential customer or eligible Burbank resident for the specific program.",
"Level 2 EV charger rebate requires a 240-volt Level 2 charger, active BWP electric account and agreement to the applicable time-of-use rate.",
"Insulation rebates exclude new construction and require listed R-value or installation criteria.",
"Refrigerator and freezer rebates require ENERGY STAR replacement and required proof of purchase and delivery.",
"Cool Rewards requires an eligible Wi-Fi thermostat controlling air conditioning or heat pump equipment."
],
"blockers": [
"Commercial refrigeration equipment is a false positive; the supported refrigerator/freezer measure is residential appliance replacement.",
"EV charging is residential Level 2 or panel-upgrade support, not a fleet or commercial charging program.",
"Water-saving toilets, washers and fixtures may be administered through partner programs rather than BWP's direct electric rebate.",
"Cool Rewards demand response is separate from the smart thermostat purchase rebate."
],
"programType": "Rebate Program",
"administrator": "Burbank Water & Power",
"applicationUrl": "[https://www.burbankwaterandpower.com/residential-rebates](https://www.burbankwaterandpower.com/residential-rebates)",
"websiteUrl": "[https://www.burbankwaterandpower.com/residential-rebates](https://www.burbankwaterandpower.com/residential-rebates)",
"sourceUrlsChecked": [
"[https://www.burbankwaterandpower.com/residential-rebates](https://www.burbankwaterandpower.com/residential-rebates)",
"[https://www.burbankwaterandpower.com/residents](https://www.burbankwaterandpower.com/residents)",
"[https://www.burbankwaterandpower.com/home-improvement-program](https://www.burbankwaterandpower.com/home-improvement-program)",
"[https://www.burbankwaterandpower.com/cool-rewards](https://www.burbankwaterandpower.com/cool-rewards)"
],
"evidenceText": "BWP residential pages list ENERGY STAR refrigerator/freezer, smart thermostat, insulation, variable-speed pool pump, Level 2 EV charger and no-cost home-improvement measures; Cool Rewards is separate thermostat load management.",
"reasoningNotes": "Kept residential appliances, EV charging, insulation, thermostat and selected no-cost measures; blocked commercial refrigeration and separated thermostat demand response."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5145",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"IA"
],
"counties": [],
"cities": [],
"utilityTerritories": [
"Alton Municipal Utilities",
"Atlantic Municipal Utilities",
"Denison Municipal Utilities",
"Hartley Municipal Utilities",
"Hawarden Municipal Utilities",
"Kimballton Municipal Utilities",
"Lake Park Municipal Utilities",
"Manilla Municipal Utilities",
"Orange City Municipal Utilities",
"Paullina Municipal Utilities",
"Pella Municipal Electric Utility",
"Primghar Municipal Utilities",
"Remsen Municipal Utilities",
"Rock Rapids Municipal Utilities",
"Sanborn Municipal Utilities",
"Shelby Municipal Utilities",
"Sioux Center Municipal Utilities",
"Woodbine Municipal Light And Power"
],
"notes": "Bright Energy Solutions is a multi-state public-power platform, but this DSIRE Iowa record is limited to the listed Iowa participating utilities."
},
"eligibleApplicantTypes": [
"business_customers",
"commercial_customers",
"industrial_customers",
"agricultural_customers",
"public_power_utility_customers"
],
"eligibleSectors": [
"commercial",
"industrial",
"agricultural",
"non_residential"
],
"eligibleRetrofitCategories": [
"ground_source_geothermal_heat_pump",
"air_source_heat_pump",
"variable_refrigerant_flow_heat_pump",
"heat_pump_water_heater",
"high_efficiency_hvac_replacement",
"electric_chiller_upgrade",
"demand_controlled_ventilation",
"energy_recovery_ventilation",
"hvac_controls_retrofit",
"guest_room_energy_management",
"led_lighting_retrofit",
"lighting_controls_retrofit",
"indoor_growing_led_lighting",
"high_efficiency_refrigeration_equipment",
"refrigeration_controls_retrofit",
"refrigeration_ec_motor_retrofit",
"refrigerated_case_lighting",
"commercial_ice_machine",
"efficient_air_compressor",
"compressed_air_leak_repair",
"compressed_air_controls",
"variable_frequency_drive",
"efficient_pumps",
"commercial_kitchen_equipment",
"high_efficiency_commercial_dishwasher",
"induction_cooking_equipment",
"electric_forklift",
"industrial_process_electrification",
"infrared_curing_and_drying",
"custom_energy_efficiency_project",
"custom_electrification_project"
],
"hardRequirements": [
"Applicant must be a business customer of a participating Bright Energy Solutions public-power utility.",
"Measure availability, rebate amount and forms vary by local utility.",
"Custom efficiency, custom electrification and infrared process projects require preapproval.",
"Equipment must meet listed certifications or specifications such as ENERGY STAR, DLC or measure-specific criteria.",
"Funding and rebate rules are administered through the participating utility and Bright Energy Solutions."
],
"blockers": [
"Weatherization and air sealing are not shown for current business rebate pages.",
"Residential rebates are separate and should not match this business opportunity.",
"Geothermal is supported as business HVAC or custom electrification, not as a generic renewable-energy grant.",
"Product-specific food-service and refrigeration measures should not be generalized beyond listed equipment."
],
"programType": "Rebate Program",
"administrator": "Bright Energy Solutions/Missouri River Energy Services",
"applicationUrl": "[https://www.brightenergysolutions.com/members](https://www.brightenergysolutions.com/members)",
"websiteUrl": "[https://www.brightenergysolutions.com/resources/business](https://www.brightenergysolutions.com/resources/business)",
"sourceUrlsChecked": [
"[https://www.brightenergysolutions.com/members](https://www.brightenergysolutions.com/members)",
"[https://www.brightenergysolutions.com/members/alton-municipal-utilities](https://www.brightenergysolutions.com/members/alton-municipal-utilities)",
"[https://www.brightenergysolutions.com/resources/business](https://www.brightenergysolutions.com/resources/business)"
],
"evidenceText": "Bright Energy Solutions lists business rebates for participating public-power utilities, including Iowa utilities, covering lighting, HVAC and heat pumps, refrigeration, compressed air, food service, VFDs, custom efficiency and electrification.",
"reasoningNotes": "Preserved the Iowa utility scope for this DSIRE record while using current Bright Energy Solutions business-measure lists; removed unsupported weatherization categories."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3329",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"OH"
],
"counties": [
"Butler County",
"Hamilton County",
"Preble County",
"Montgomery County"
],
"cities": [],
"utilityTerritories": [
"Butler Rural Electric Cooperative"
],
"notes": "Residential member-owners in Butler Rural Electric Cooperative service territory in southwest Ohio."
},
"eligibleApplicantTypes": [
"residential_members",
"homeowners"
],
"eligibleSectors": [
"residential"
],
"eligibleRetrofitCategories": [
"ground_source_geothermal_heat_pump",
"air_source_heat_pump",
"dual_fuel_heat_pump",
"high_efficiency_hvac_replacement",
"central_air_conditioner_rebate",
"heat_pump_water_heater",
"grid_enabled_electric_water_heater",
"level_2_ev_charger_installation",
"insulation_upgrade",
"air_sealing_weatherization",
"energy_star_refrigerator_freezer",
"smart_thermostat_zoning_retrofit"
],
"hardRequirements": [
"Applicant must be a qualifying Butler Rural residential member.",
"Geothermal systems require listed closed-loop, all-electric, ENERGY STAR and efficiency requirements and use of qualified contractors.",
"Air-source heat pump rebates require qualifying homes and equipment; ductless systems do not qualify.",
"Appliance rebates are residential only, limited by equipment type, size and purchase period.",
"Applicants should contact the cooperative before installation because program rules, funding and inspection requirements apply."
],
"blockers": [
"High-efficiency furnace alone is not a supported rebate except as backup in a qualifying dual-fuel heat pump system.",
"Ductless mini-splits do not qualify under the current heat pump rebate rules.",
"Commercial and industrial buildings are excluded from the ENERGY STAR appliance rebate.",
"Low-interest loans are separate financing and should not be treated as rebates.",
"Distributed generation, seasonal, net-metering and net-billing accounts are excluded from some HVAC programs."
],
"programType": "Rebate Program",
"administrator": "Butler Rural Electric Cooperative, Inc.",
"applicationUrl": "[https://butlerrural.coop/co-op-rebates](https://butlerrural.coop/co-op-rebates)",
"websiteUrl": "[https://butlerrural.coop/co-op-rebates](https://butlerrural.coop/co-op-rebates)",
"sourceUrlsChecked": [
"[https://butlerrural.coop/co-op-rebates](https://butlerrural.coop/co-op-rebates)",
"[https://butlerrural.coop/geothermal-rebates](https://butlerrural.coop/geothermal-rebates)",
"[https://butlerrural.coop/heat-pump-rebates](https://butlerrural.coop/heat-pump-rebates)",
"[https://butlerrural.coop/energy-star-appliance-rebates](https://butlerrural.coop/energy-star-appliance-rebates)",
"[https://butlerrural.coop/low-interest-loans](https://butlerrural.coop/low-interest-loans)"
],
"evidenceText": "Butler Rural's current rebate page lists geothermal, air-source or dual-fuel heat pumps, Level 2 EV chargers, water heaters, insulation and air sealing, ENERGY STAR appliances and smart thermostats.",
"reasoningNotes": "Kept current residential rebate categories and blocked furnace-only, ductless mini-split and commercial appliance matches; treated loans as separate financing."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:4858",
"confidence": "medium",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"WI"
],
"counties": [
"Ozaukee County"
],
"cities": [
"Cedarburg"
],
"utilityTerritories": [
"Cedarburg Light & Water Utility"
],
"notes": "Cedarburg Light & Water business electric customers, with WPPI Energy program support."
},
"eligibleApplicantTypes": [
"business_customers",
"commercial_customers",
"industrial_customers",
"agricultural_customers"
],
"eligibleSectors": [
"commercial",
"industrial",
"agricultural",
"non_residential"
],
"eligibleRetrofitCategories": [
"commercial_energy_efficiency_financing",
"on_bill_financing",
"custom_energy_efficiency_project"
],
"hardRequirements": [
"Applicant must be a Cedarburg Light & Water business utility customer.",
"Financing is for qualifying energy-efficiency improvements and is repaid through regular utility-bill installments.",
"Official Cedarburg materials state upfront capital is available up to 50000 dollars.",
"Projects must produce energy savings sufficient to support the repayment plan.",
"Specific equipment eligibility should be confirmed with the utility or WPPI Energy before project commitment."
],
"blockers": [
"Do not treat this as a rebate; it is on-bill financing.",
"Current official sources did not verify specific retrofit categories such as lighting controls, refrigeration or vending-machine controls for this loan record.",
"Backup generator, curtailment, market pricing and RFP incentives are separate Cedarburg or WPPI business programs.",
"Focus on Energy rebates are separate from the Shared Savings loan."
],
"programType": "Loan Program",
"administrator": "Cedarburg Light and Water Utility",
"applicationUrl": null,
"websiteUrl": "[https://www.cedarburglightandwater.org/shared-savings-program](https://www.cedarburglightandwater.org/shared-savings-program)",
"sourceUrlsChecked": [
"[https://www.cedarburglightandwater.org/shared-savings-program](https://www.cedarburglightandwater.org/shared-savings-program)",
"[https://www.cedarburglightandwater.org/sites/cedarburglightandwater.org/files/Shared%20Savings.pdf](https://www.cedarburglightandwater.org/sites/cedarburglightandwater.org/files/Shared%20Savings.pdf)",
"[https://www.cityofcedarburg.wi.gov/sites/g/files/vyhlif4241/f/pages/cedarburg_esm_2024_flyer_2.pdf](https://www.cityofcedarburg.wi.gov/sites/g/files/vyhlif4241/f/pages/cedarburg_esm_2024_flyer_2.pdf)",
"[https://wppienergy.org/program-type/business/](https://wppienergy.org/program-type/business/)",
"[https://www.cedarburglightandwater.org/efficiency-improvement-incentives](https://www.cedarburglightandwater.org/efficiency-improvement-incentives)"
],
"evidenceText": "Cedarburg and WPPI materials describe Shared Savings as upfront capital for business energy-efficiency improvements, repaid on the monthly utility bill. Current official sources did not enumerate specific equipment categories.",
"reasoningNotes": "Limited categories to financing and custom energy-efficiency projects because current official shared-savings sources verify financing, not measure-specific rebates."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3749",
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
"CenterPoint Energy Minnesota natural gas service territory"
],
"notes": "Minnesota commercial and industrial customers receiving natural gas service from CenterPoint Energy."
},
"eligibleApplicantTypes": [
"commercial_customers",
"industrial_customers",
"business_customers",
"multifamily_property_owners",
"foodservice_customers"
],
"eligibleSectors": [
"commercial",
"industrial",
"multifamily",
"foodservice"
],
"eligibleRetrofitCategories": [
"high_efficiency_boiler_retrofit",
"boiler_tune_up",
"boiler_controls_retrofit",
"steam_trap_repair_replacement",
"pipe_insulation",
"high_efficiency_furnace_retrofit",
"smart_thermostat_zoning_retrofit",
"condensing_unit_heater",
"infrared_heater",
"demand_controlled_ventilation",
"energy_recovery_ventilation",
"carbon_monoxide_garage_sensors",
"garage_air_curtain",
"high_efficiency_gas_water_heater",
"commercial_laundry_ozone_retrofit",
"commercial_modulating_clothes_dryer_retrofit",
"industrial_process_boiler",
"industrial_stack_economizer",
"industrial_process_equipment",
"waste_heat_recovery",
"process_tank_insulation",
"custom_natural_gas_savings_project",
"commercial_kitchen_equipment",
"high_efficiency_commercial_dishwasher",
"commercial_kitchen_hood_demand_control_ventilation",
"energy_audit",
"commissioning_retrocommissioning",
"engineering_assistance",
"building_energy_benchmarking"
],
"hardRequirements": [
"Applicant must be a CenterPoint Energy Minnesota commercial or industrial natural gas customer.",
"Rebates must be submitted in the same calendar year the equipment is installed and operational.",
"Equipment must meet program specifications and be new where required.",
"Rebate funds are limited and paid first-come, first-served.",
"Custom rebates and engineering assistance require early contact or preapproval before project commitment."
],
"blockers": [
"General building insulation is not a broad commercial envelope rebate; current commercial support is pipe insulation and process tank insulation, with separate multifamily or residential weatherization pathways.",
"Laundry support is limited to ozone laundry retrofit and modulating clothes dryer retrofit, not broad laundry equipment replacement.",
"This is a natural-gas program; electric HVAC, electric refrigeration and lighting measures should not match.",
"Smart thermostat is a commercial gas-heating control rebate, not demand response."
],
"programType": "Rebate Program",
"administrator": "CenterPoint Energy",
"applicationUrl": "[https://www.centerpointenergy.com/en-us/business/save-energy-money/efficiency-programs-rebates/equipment-programs-and-rebates?sa=mn](https://www.centerpointenergy.com/en-us/business/save-energy-money/efficiency-programs-rebates/equipment-programs-and-rebates?sa=mn)",
"websiteUrl": "[https://www.centerpointenergy.com/en-us/business/save-energy-money/efficiency-programs-rebates/programs-and-rebates-by-industry/commercial?sa=MN](https://www.centerpointenergy.com/en-us/business/save-energy-money/efficiency-programs-rebates/programs-and-rebates-by-industry/commercial?sa=MN)",
"sourceUrlsChecked": [
"[https://www.centerpointenergy.com/en-us/business/save-energy-money/efficiency-programs-rebates/equipment-programs-and-rebates?sa=mn](https://www.centerpointenergy.com/en-us/business/save-energy-money/efficiency-programs-rebates/equipment-programs-and-rebates?sa=mn)",
"[https://www.centerpointenergy.com/en-us/business/save-energy-money/efficiency-programs-rebates/programs-and-rebates-by-industry/commercial?sa=MN](https://www.centerpointenergy.com/en-us/business/save-energy-money/efficiency-programs-rebates/programs-and-rebates-by-industry/commercial?sa=MN)",
"[https://www.centerpointenergy.com/en-us/business/save-energy-money/efficiency-programs-rebates/equipment-programs-and-rebates/pipe-insulation?sa=mn](https://www.centerpointenergy.com/en-us/business/save-energy-money/efficiency-programs-rebates/equipment-programs-and-rebates/pipe-insulation?sa=mn)",
"[https://www.centerpointenergy.com/en-us/Documents/251104-08-MNTA-ECO-Book-Web.pdf](https://www.centerpointenergy.com/en-us/Documents/251104-08-MNTA-ECO-Book-Web.pdf)",
"[https://www.centerpointenergy.com/en-us/business/save-energy-money/efficiency-programs-rebates/equipment-programs-and-rebates/foodservice-equipment-rebates?sa=MN](https://www.centerpointenergy.com/en-us/business/save-energy-money/efficiency-programs-rebates/equipment-programs-and-rebates/foodservice-equipment-rebates?sa=MN)",
"[https://www.centerpointenergy.com/en-us/business/save-energy-money/efficiency-programs-rebates/equipment-programs-and-rebates/custom-rebates?sa=mn](https://www.centerpointenergy.com/en-us/business/save-energy-money/efficiency-programs-rebates/equipment-programs-and-rebates/custom-rebates?sa=mn)"
],
"evidenceText": "CenterPoint's Minnesota business pages list natural-gas rebates for boilers, heating systems, smart thermostats, pipe insulation, water heaters, commercial laundry, foodservice, industrial process equipment and custom projects.",
"reasoningNotes": "Kept commercial natural-gas measures and narrowed insulation and laundry to the product-specific measures shown in current official materials."
}
],
"continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:22132"
}

