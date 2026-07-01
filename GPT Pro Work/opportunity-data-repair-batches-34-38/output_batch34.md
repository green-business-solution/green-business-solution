{
"schemaVersion": "opportunity_data_research_repairs.v1",
"researchedAt": "2026-07-01",
"source": "gpt_pro",
"repairs": [
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:1338",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"MA"
],
"counties": [],
"cities": [
"Holyoke"
],
"utilityTerritories": [
"Holyoke Gas and Electric Department"
],
"notes": "Limited to buildings that receive HG&E electric or gas service."
},
"eligibleApplicantTypes": [
"commercial_customer",
"industrial_customer",
"owner_of_residential_investment_property"
],
"eligibleSectors": [
"commercial",
"industrial",
"multifamily"
],
"eligibleRetrofitCategories": [
"air_sealing_weatherization",
"duct_sealing_and_insulation",
"insulation_upgrade",
"window_and_door_replacement",
"high_efficiency_hvac_replacement",
"heat_pump_hvac_retrofit",
"high_efficiency_boiler_retrofit",
"smart_thermostat",
"high_efficiency_water_heater",
"heat_pump_water_heater",
"solar_water_heating_system",
"rooftop_solar_pv",
"led_lighting_retrofit"
],
"hardRequirements": [
"Applicant must be the property owner or an eligible HG&E commercial or industrial utility customer.",
"Building must receive HG&E gas or electric service.",
"HG&E accounts must be in good standing.",
"Project must qualify under CEAP and receive HG&E approval."
],
"blockers": [
"Renting or leasing entities are not eligible unless they own the property.",
"This is financing or zero-interest assistance, not a rebate.",
"Demand response, audits, EV charging, and general business rebates are separate HG&E offerings and should not be merged into this record."
],
"programType": "Loan Program",
"administrator": "Holyoke Gas and Electric Department",
"applicationUrl": null,
"websiteUrl": "[https://www.hged.com/commercial/ee-business/ceap/default.aspx](https://www.hged.com/commercial/ee-business/ceap/default.aspx)",
"sourceUrlsChecked": [
"[https://www.hged.com/commercial/ee-business/ceap/default.aspx](https://www.hged.com/commercial/ee-business/ceap/default.aspx)",
"[https://www.hged.com/commercial/ee-business/ceap/ceap-supplemental-apps-main-webpage.aspx](https://www.hged.com/commercial/ee-business/ceap/ceap-supplemental-apps-main-webpage.aspx)",
"[https://www.hged.com/commercial/ee-business/default.aspx](https://www.hged.com/commercial/ee-business/default.aspx)"
],
"evidenceText": "HG&E describes CEAP as zero-interest assistance for commercial and industrial energy efficiency, electrification, and renewable projects. Supplemental applications cover HVAC, water heating, weatherization, windows and doors, solar PV, solar hot water, and lighting.",
"reasoningNotes": "Input target metadata came from uploaded batch prompt . Treat CEAP as financing with strict HG&E service and property-owner limits."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3130",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"ID",
"OR"
],
"counties": [],
"cities": [],
"utilityTerritories": [
"Idaho Power Company"
],
"notes": "Available to qualifying commercial and industrial Idaho Power electric customers in Idaho and Oregon service territory."
},
"eligibleApplicantTypes": [
"commercial_customer",
"industrial_customer",
"agricultural_customer"
],
"eligibleSectors": [
"commercial",
"industrial",
"agricultural",
"municipal",
"institutional"
],
"eligibleRetrofitCategories": [
"custom_electric_efficiency_project",
"energy_management_system",
"retro_commissioning",
"high_efficiency_hvac_replacement",
"high_efficiency_refrigeration_equipment",
"motor_pump_fan_vfd_retrofit",
"compressed_air_system_improvement",
"industrial_process_efficiency",
"water_leak_repair_efficiency"
],
"hardRequirements": [
"Project must save electric energy and be preapproved through Idaho Power custom project procedures.",
"Applicant must be an Idaho Power commercial or industrial electric customer.",
"Savings and incentive amounts must be calculated under program procedures."
],
"blockers": [
"Prescriptive lighting retrofits and specific equipment rebates are separate Idaho Power offerings unless handled as a custom project.",
"Do not match residential measures.",
"Do not infer natural gas savings or non-electric fuel-switching measures."
],
"programType": "Rebate Program",
"administrator": "Idaho Power Company",
"applicationUrl": null,
"websiteUrl": "[https://www.idahopower.com/energy-environment/ways-to-save/savings-for-your-business/custom-projects/](https://www.idahopower.com/energy-environment/ways-to-save/savings-for-your-business/custom-projects/)",
"sourceUrlsChecked": [
"[https://www.idahopower.com/energy-environment/ways-to-save/savings-for-your-business/custom-projects/](https://www.idahopower.com/energy-environment/ways-to-save/savings-for-your-business/custom-projects/)",
"[https://docs.idahopower.com/pdfs/energyefficiency/business/proceduresManual.pdf](https://docs.idahopower.com/pdfs/energyefficiency/business/proceduresManual.pdf)"
],
"evidenceText": "Idaho Power custom projects support qualifying electric energy-saving improvements for commercial and industrial customers. Official materials list process equipment, motors, controls, fans, pumps, compressors, air conditioning, refrigeration, energy management, and retro-commissioning.",
"reasoningNotes": "Keep custom electric efficiency categories. Remove stand-alone LED and lighting controls unless a project is evaluated through the custom path rather than a prescriptive retrofit program."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3428",
"confidence": "medium",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"VT"
],
"counties": [],
"cities": [],
"utilityTerritories": [],
"notes": "Credit applies to the Vermont-property portion of qualifying federal investment tax credit property."
},
"eligibleApplicantTypes": [
"business_taxpayer",
"individual_business_owner",
"estate",
"trust",
"pass_through_entity_owner"
],
"eligibleSectors": [
"commercial",
"industrial",
"agricultural"
],
"eligibleRetrofitCategories": [
"rooftop_solar_pv",
"solar_water_heating_system",
"ground_source_geothermal_heat_pump",
"combined_heat_and_power_system",
"qualified_biogas_energy_system"
],
"hardRequirements": [
"Taxpayer must qualify for the applicable federal investment tax credit.",
"Credit is limited to the Vermont-property portion of the qualifying investment.",
"Claimant must meet Vermont Department of Taxes filing and documentation requirements."
],
"blockers": [
"Generic high-efficiency HVAC replacement is not supported unless it qualifies as federal energy property, such as geothermal heat pump property.",
"Generic biomass heating should not be matched unless it qualifies under the applicable federal energy credit category.",
"The current Vermont Department of Taxes tax-credit page could not be fully read, so statute and federal credit definitions control."
],
"programType": "Personal Tax Credit",
"administrator": "Vermont Department of Taxes",
"applicationUrl": null,
"websiteUrl": "[https://legislature.vermont.gov/statutes/section/32/151/05822](https://legislature.vermont.gov/statutes/section/32/151/05822)",
"sourceUrlsChecked": [
"[https://legislature.vermont.gov/statutes/section/32/151/05822](https://legislature.vermont.gov/statutes/section/32/151/05822)",
"[https://legislature.vermont.gov/statutes/section/32/151/05813](https://legislature.vermont.gov/statutes/section/32/151/05813)",
"[https://uscode.house.gov/view.xhtml?req=%28title%3A26+section%3A48+edition%3Aprelim%29](https://uscode.house.gov/view.xhtml?req=%28title%3A26+section%3A48+edition%3Aprelim%29)",
"[https://tax.vermont.gov/business-and-corp/corp-and-business-income-taxes/tax-credits](https://tax.vermont.gov/business-and-corp/corp-and-business-income-taxes/tax-credits)"
],
"evidenceText": "Vermont statute provides an investment tax credit tied to a percentage of the federal investment tax credit attributable to Vermont property. Federal energy-credit property includes solar, solar thermal, geothermal, combined heat and power, and qualified biogas property.",
"reasoningNotes": "Use medium confidence because the Vermont tax department page was not readable, but current state statute and federal code verify the core eligible energy-property categories."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3696",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"KY"
],
"counties": [],
"cities": [],
"utilityTerritories": [
"Kentucky Power"
],
"notes": "Limited to qualifying Kentucky Power residential customers served through local Community Action agencies."
},
"eligibleApplicantTypes": [
"income_qualified_residential_customer"
],
"eligibleSectors": [
"residential"
],
"eligibleRetrofitCategories": [
"energy_audit",
"air_sealing_weatherization",
"duct_sealing_and_insulation",
"insulation_upgrade",
"led_lighting_retrofit",
"heat_pump_hvac_retrofit",
"heat_pump_water_heater",
"water_heater_insulation",
"low_flow_water_fixtures",
"window_and_door_replacement",
"room_air_conditioner_replacement"
],
"hardRequirements": [
"Customer must meet income eligibility requirements.",
"Customer must be a Kentucky Power residential customer.",
"Home must meet electric-heating or qualifying electric water-heating usage rules.",
"Services are delivered through participating Community Action agencies."
],
"blockers": [
"Do not match commercial or multifamily owner programs.",
"Do not treat the audit as a stand-alone rebate separate from program-delivered measures.",
"Do not broaden room air conditioner replacement into general HVAC replacement."
],
"programType": "Rebate Program",
"administrator": "Kentucky Power",
"applicationUrl": null,
"websiteUrl": "[https://www.kentuckypower.com/savings/home/targeted-energy-efficiency](https://www.kentuckypower.com/savings/home/targeted-energy-efficiency)",
"sourceUrlsChecked": [
"[https://www.kentuckypower.com/savings/home/targeted-energy-efficiency](https://www.kentuckypower.com/savings/home/targeted-energy-efficiency)",
"[https://www.kentuckypower.com/lib/docs/savings/energyefficiencyprograms/TEE_Program_Quick_Reference_Guide.pdf](https://www.kentuckypower.com/lib/docs/savings/energyefficiencyprograms/TEE_Program_Quick_Reference_Guide.pdf)"
],
"evidenceText": "Kentucky Power describes income-qualified residential services including an energy audit, air sealing, insulation, duct work, efficient lighting, hot-water measures, and other weatherization measures delivered through Community Action agencies.",
"reasoningNotes": "Program supports the listed weatherization and direct-install measures, but matching must respect income and Kentucky Power residential territory limits."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2469",
"confidence": "low",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"OR"
],
"counties": [],
"cities": [],
"utilityTerritories": [
"Lane Electric Cooperative"
],
"notes": "Limited to Lane Electric Cooperative members; weatherization eligibility is tied to qualifying electric heat and building type."
},
"eligibleApplicantTypes": [
"residential_member",
"commercial_member"
],
"eligibleSectors": [
"residential",
"commercial",
"multifamily"
],
"eligibleRetrofitCategories": [
"air_sealing_weatherization",
"insulation_upgrade",
"ductless_heat_pump",
"heat_pump_hvac_retrofit",
"heat_pump_water_heater"
],
"hardRequirements": [
"Applicant must be a Lane Electric Cooperative member.",
"Weatherization measures require qualifying electric heat and program approval.",
"Heat pump and related incentives require preapproval before installation.",
"Project must meet Lane Electric and Bonneville Power Administration requirements."
],
"blockers": [
"Do not match renewable energy incentives; Lane Electric indicates member renewable incentives ended January 1, 2023.",
"Do not broaden ductless heat pump support into all HVAC replacements.",
"Official Lane Electric pages returned access restrictions during review, so source confidence is low."
],
"programType": "Grant Program",
"administrator": "Lane Electric Cooperative",
"applicationUrl": null,
"websiteUrl": "[https://www.laneelectric.com/energy-efficiency/energy-saving-programs/](https://www.laneelectric.com/energy-efficiency/energy-saving-programs/)",
"sourceUrlsChecked": [
"[https://www.laneelectric.com/energy-efficiency/energy-saving-programs/](https://www.laneelectric.com/energy-efficiency/energy-saving-programs/)",
"[https://www.laneelectric.com/energy-efficiency/weatherization-programs/](https://www.laneelectric.com/energy-efficiency/weatherization-programs/)",
"[https://www.laneelectric.com/energy-efficiency/heat-pump-program/](https://www.laneelectric.com/energy-efficiency/heat-pump-program/)",
"[https://www.laneelectric.com/energy-efficiency/heat-pump-water-heaters/](https://www.laneelectric.com/energy-efficiency/heat-pump-water-heaters/)",
"[https://www.laneelectric.com/energy-efficiency/renewable-energy/member-renewable-programs/](https://www.laneelectric.com/energy-efficiency/renewable-energy/member-renewable-programs/)"
],
"evidenceText": "Official Lane Electric result text identifies current energy-saving, weatherization, heat pump, and heat pump water heater programs for members. The renewable-energy page states member renewable incentives ended in 2023.",
"reasoningNotes": "Use low confidence because current official pages were not fully readable. Keep only categories repeatedly verified by official Lane Electric page snippets and do not preserve solar."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:1406",
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
"Liberty Utilities natural gas service territory in New Hampshire"
],
"notes": "Limited to eligible New Hampshire Liberty natural gas commercial, industrial, and municipal customers."
},
"eligibleApplicantTypes": [
"commercial_gas_customer",
"industrial_gas_customer",
"municipal_gas_customer"
],
"eligibleSectors": [
"commercial",
"industrial",
"municipal",
"institutional",
"multifamily"
],
"eligibleRetrofitCategories": [
"energy_audit",
"air_sealing_weatherization",
"insulation_upgrade",
"high_efficiency_boiler_retrofit",
"high_efficiency_furnace_retrofit",
"boiler_controls_burner_retrofit",
"high_efficiency_water_heater",
"steam_trap_replacement",
"commercial_kitchen_equipment",
"custom_gas_efficiency_project"
],
"hardRequirements": [
"Customer must be an eligible Liberty New Hampshire natural gas customer.",
"Project may require pre-qualification and is subject to available funds.",
"Equipment must meet NHSaves gas program eligibility and efficiency requirements."
],
"blockers": [
"Do not match electric lighting, electric motors, VFDs, or compressed air to this gas-program record unless they are part of a separate NHSaves electric program.",
"Do not infer residential-only weatherization from this commercial gas program.",
"On-bill financing is a related payment option, not a separate rebate category."
],
"programType": "Rebate Program",
"administrator": "Liberty Utilities",
"applicationUrl": null,
"websiteUrl": "[https://new-hampshire.libertyutilities.com/allenstown/commercial/smart-energy-use/natural-gas/natural-gas-programs.html](https://new-hampshire.libertyutilities.com/allenstown/commercial/smart-energy-use/natural-gas/natural-gas-programs.html)",
"sourceUrlsChecked": [
"[https://new-hampshire.libertyutilities.com/allenstown/commercial/smart-energy-use/natural-gas/natural-gas-programs.html](https://new-hampshire.libertyutilities.com/allenstown/commercial/smart-energy-use/natural-gas/natural-gas-programs.html)",
"[https://new-hampshire.libertyutilities.com/uploads/Commercial%20Heaters%20Water%20Heating%202022%20Rebates.pdf](https://new-hampshire.libertyutilities.com/uploads/Commercial%20Heaters%20Water%20Heating%202022%20Rebates.pdf)",
"[https://new-hampshire.libertyutilities.com/uploads/On%20Bill%20Financing%20Flyer%202022.pdf](https://new-hampshire.libertyutilities.com/uploads/On%20Bill%20Financing%20Flyer%202022.pdf)",
"[https://nhsaves.com/wp-content/uploads/2025/01/2025-NHSaves-Gas_Locked.pdf](https://nhsaves.com/wp-content/uploads/2025/01/2025-NHSaves-Gas_Locked.pdf)"
],
"evidenceText": "Liberty and NHSaves gas materials identify rebates and assistance for commercial gas heating, water heating, building insulation, air sealing, thermostats, steam measures, custom gas projects, energy assessments, and commercial kitchen equipment.",
"reasoningNotes": "The original matches for air sealing, boilers, insulation, and weatherization are supported. Remove broad electric efficiency categories that belong to separate electric programs."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3532",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"NM"
],
"counties": [],
"cities": [],
"utilityTerritories": [],
"notes": "Available only in New Mexico jurisdictions that opt in by ordinance and participate in the C-PACE or improvement special assessment structure."
},
"eligibleApplicantTypes": [
"commercial_property_owner",
"industrial_property_owner",
"agricultural_property_owner",
"multifamily_property_owner",
"nonprofit_property_owner",
"tax_exempt_property_owner"
],
"eligibleSectors": [
"commercial",
"industrial",
"agricultural",
"multifamily",
"nonprofit"
],
"eligibleRetrofitCategories": [
"energy_efficiency_improvements",
"water_efficiency_improvements",
"rooftop_solar_pv",
"solar_water_heating_system",
"ground_source_geothermal_heat_pump",
"biomass_biogas_energy_system",
"battery_storage_system",
"microgrid_controller",
"wind_energy_system",
"ev_charging_infrastructure"
],
"hardRequirements": [
"Property must be in an opt-in New Mexico local jurisdiction.",
"Eligible property generally must be privately owned commercial, industrial, agricultural, or multifamily with five or more units.",
"Project must be permanently affixed and financed through the special assessment or C-PACE process.",
"Property owner must meet lien, tax, lender-consent, and certification requirements."
],
"blockers": [
"Do not match one-to-four-unit residential properties.",
"Do not present this as a rebate; it is financing through a local assessment mechanism.",
"Energy audits and engineering may be ancillary project costs, not stand-alone retrofit categories."
],
"programType": "PACE Financing",
"administrator": "Locally administered New Mexico C-PACE and special assessment programs",
"applicationUrl": null,
"websiteUrl": "[https://www.edd.newmexico.gov/programs-and-services/c-pace/](https://www.edd.newmexico.gov/programs-and-services/c-pace/)",
"sourceUrlsChecked": [
"[https://www.edd.newmexico.gov/programs-and-services/c-pace/](https://www.edd.newmexico.gov/programs-and-services/c-pace/)",
"[https://www.nmlegis.gov/sessions/23%20Regular/bills/house/HB0228.HTML](https://www.nmlegis.gov/sessions/23%20Regular/bills/house/HB0228.HTML)",
"[https://law.justia.com/codes/new-mexico/chapter-5/article-18/section-5-18-4/](https://law.justia.com/codes/new-mexico/chapter-5/article-18/section-5-18-4/)"
],
"evidenceText": "New Mexico C-PACE materials and statute support financing for energy efficiency, renewable energy, water efficiency, and resiliency improvements on qualifying commercial, industrial, agricultural, nonprofit, and five-plus-unit multifamily properties in opt-in jurisdictions.",
"reasoningNotes": "Preserve solar, geothermal, storage, and efficiency categories, but frame all matches as financing subject to local opt-in and property eligibility."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3554",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"OH"
],
"counties": [],
"cities": [],
"utilityTerritories": [],
"notes": "Available only through locally created Ohio special energy improvement districts."
},
"eligibleApplicantTypes": [
"property_owner",
"commercial_property_owner",
"industrial_property_owner",
"multifamily_property_owner"
],
"eligibleSectors": [
"commercial",
"industrial",
"multifamily",
"institutional"
],
"eligibleRetrofitCategories": [
"energy_efficiency_improvements",
"rooftop_solar_pv",
"solar_water_heating_system",
"ground_source_geothermal_heat_pump",
"biomass_biogas_energy_system",
"customer_generated_energy_system",
"wind_energy_system"
],
"hardRequirements": [
"Project must be located in a valid Ohio special energy improvement district.",
"Assessment and financing must follow Ohio Revised Code Chapter 1710 and local district procedures.",
"Customer-generated energy systems must meet statutory on-site and size limits."
],
"blockers": [
"Battery storage is not supported by the reviewed statutory definition unless a local district independently documents eligibility.",
"Energy audits and planning are financeable project costs, not stand-alone retrofit categories.",
"Do not treat this local-option financing authority as a statewide automatic rebate."
],
"programType": "PACE Financing",
"administrator": "Locally administered Ohio special energy improvement districts",
"applicationUrl": null,
"websiteUrl": "[https://codes.ohio.gov/ohio-revised-code/section-1710.01](https://codes.ohio.gov/ohio-revised-code/section-1710.01)",
"sourceUrlsChecked": [
"[https://codes.ohio.gov/ohio-revised-code/section-1710.01](https://codes.ohio.gov/ohio-revised-code/section-1710.01)",
"[https://codes.ohio.gov/ohio-revised-code/chapter-1710](https://codes.ohio.gov/ohio-revised-code/chapter-1710)"
],
"evidenceText": "Ohio statute defines special energy improvement projects to include solar photovoltaic, solar thermal, geothermal, customer-generated energy, and energy-efficiency improvements. Customer-generated energy includes wind, biomass, and gasification systems meeting statutory limits.",
"reasoningNotes": "Retain renewable and general efficiency categories supported by statute. Remove battery storage unless a specific local district source verifies it."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22696",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"KY"
],
"counties": [],
"cities": [],
"utilityTerritories": [
"Louisville Gas and Electric",
"Kentucky Utilities"
],
"notes": "Limited to eligible multifamily buildings in LG&E or KU service territory."
},
"eligibleApplicantTypes": [
"apartment_building_owner",
"multifamily_property_manager"
],
"eligibleSectors": [
"multifamily",
"affordable_housing"
],
"eligibleRetrofitCategories": [
"energy_audit",
"air_sealing_weatherization",
"duct_sealing_and_insulation",
"insulation_upgrade",
"led_lighting_retrofit",
"smart_thermostat",
"low_flow_water_fixtures",
"whole_building_energy_efficiency"
],
"hardRequirements": [
"Building must have four or more units.",
"Property must have an eligible common-area LG&E or KU account.",
"At least 50 percent of tenants must receive income-based assistance or have income at or below 200 percent of federal poverty guidelines.",
"Tenant notification and program participation requirements apply.",
"Buildings are generally eligible no more than once every three years."
],
"blockers": [
"Doors and windows are excluded and should not be matched.",
"Do not match single-family homes or general commercial properties.",
"Audit is part of the WeCare process and should not be treated as a separate stand-alone rebate."
],
"programType": "Rebate Program",
"administrator": "Louisville Gas and Electric and Kentucky Utilities",
"applicationUrl": null,
"websiteUrl": "[https://lge-ku.com/wecare](https://lge-ku.com/wecare)",
"sourceUrlsChecked": [
"[https://lge-ku.com/wecare](https://lge-ku.com/wecare)",
"[https://lge-ku.com/energy-efficiency-programs](https://lge-ku.com/energy-efficiency-programs)"
],
"evidenceText": "LG&E and KU describe WeCare for Apartment Buildings as supporting eligible multifamily properties with an audit report, education, installation of measures in common areas and occupied units, and incentives toward whole-building improvements.",
"reasoningNotes": "Original weatherization, duct, insulation, audit, and lighting matches are supported, but windows and doors should be blocked because the official page excludes them."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:215",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"MS"
],
"counties": [],
"cities": [],
"utilityTerritories": [],
"notes": "Statewide Mississippi loan program for qualifying borrowers and existing facilities."
},
"eligibleApplicantTypes": [
"commercial_business",
"industrial_business",
"nonprofit",
"public_entity",
"institutional_owner"
],
"eligibleSectors": [
"commercial",
"industrial",
"institutional",
"public",
"nonprofit"
],
"eligibleRetrofitCategories": [
"energy_efficiency_improvements",
"high_efficiency_hvac_replacement",
"high_efficiency_refrigeration_equipment",
"insulation_upgrade",
"window_replacement",
"led_lighting_retrofit",
"lighting_controls_retrofit",
"energy_management_system",
"high_efficiency_boiler_retrofit",
"combined_heat_and_power_system",
"renewable_energy_system",
"compressed_air_system_improvement",
"industrial_process_efficiency"
],
"hardRequirements": [
"Borrower must be financially sound and approved by the Mississippi Development Authority.",
"Existing structure generally must have been occupied for at least one year.",
"A qualified Mississippi engineer or MDA-approved professional must provide an energy analysis.",
"Project payback must be ten years or less.",
"Loan size and terms must meet current MDA program limits."
],
"blockers": [
"Do not present this as a rebate or grant.",
"Do not match projects without qualifying energy-conserving capital improvements.",
"Residential appliance or home-weatherization rebates are not supported by this business loan record."
],
"programType": "Loan Program",
"administrator": "Mississippi Development Authority",
"applicationUrl": null,
"websiteUrl": "[https://mississippi.org/doing-business/incentives/](https://mississippi.org/doing-business/incentives/)",
"sourceUrlsChecked": [
"[https://mississippi.org/doing-business/incentives/](https://mississippi.org/doing-business/incentives/)",
"[https://mississippi.org/wp-content/uploads/Energy-Infrastructure-Revolving-Loan-May-2026.pdf](https://mississippi.org/wp-content/uploads/Energy-Infrastructure-Revolving-Loan-May-2026.pdf)",
"[https://www.mdeq.ms.gov/wp-content/uploads/2018/10/MDA-Energy-Efficiency-Revolving-Loan-Fund-Program-Guidelines.pdf](https://www.mdeq.ms.gov/wp-content/uploads/2018/10/MDA-Energy-Efficiency-Revolving-Loan-Fund-Program-Guidelines.pdf)"
],
"evidenceText": "MDA describes low-interest financing for energy-conserving capital improvements and renewable technology. Current fact sheet examples include heating and cooling, lighting, windows, insulation, cogeneration, renewables, controls, kilns, boilers, refrigeration, compressed air, and demand reductions.",
"reasoningNotes": "Keep broad commercial and industrial efficiency categories because this is a financing program, but matching should identify loan support rather than rebate eligibility."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22041",
"confidence": "high",
"availabilityStatus": "unavailable",
"geography": {
"country": "US",
"states": [
"MD"
],
"counties": [],
"cities": [],
"utilityTerritories": [
"EmPOWER Maryland electric utility territories"
],
"notes": "FY26 application round closed; future rounds may reopen with different funding documents."
},
"eligibleApplicantTypes": [
"business",
"nonprofit",
"commercial_property_owner",
"industrial_facility_owner",
"data_center_operator",
"multifamily_property_owner",
"private_school_or_institution"
],
"eligibleSectors": [
"commercial",
"industrial",
"data_center",
"multifamily",
"institutional",
"nonprofit"
],
"eligibleRetrofitCategories": [
"data_center_efficiency",
"server_virtualization",
"data_center_airflow_management",
"ups_efficiency_upgrade",
"high_efficiency_hvac_replacement",
"insulation_upgrade",
"air_sealing_weatherization",
"window_film",
"led_lighting_retrofit",
"lighting_controls_retrofit",
"motor_pump_fan_vfd_retrofit",
"high_efficiency_refrigeration_equipment",
"industrial_process_efficiency"
],
"hardRequirements": [
"FY26 application deadline was January 30, 2026.",
"Applicant must be an eligible Maryland business, nonprofit, or property owner and be registered and in good standing.",
"Project must meet the FY26 funding opportunity announcement requirements and utility territory rules.",
"Owner concurrence is required when the applicant is not the building owner."
],
"blockers": [
"FY26 funding round is closed, so current matching should be blocked unless a new open round is verified.",
"Solar and other renewables are excluded and handled by separate MEA programs.",
"Building automation systems, retrocommissioning, and mechanical insulation are excluded in the FY26 FOA.",
"Government buildings, public schools, one-to-four-unit residential buildings, repairs, completed work, and fossil-fuel life-extension projects are ineligible.",
"Do not preserve combined heat and power for this FOA; it is handled separately."
],
"programType": "Grant Program",
"administrator": "Maryland Energy Administration",
"applicationUrl": null,
"websiteUrl": "[https://energy.maryland.gov/business/Pages/incentives/empowermdcigp.aspx](https://energy.maryland.gov/business/Pages/incentives/empowermdcigp.aspx)",
"sourceUrlsChecked": [
"[https://energy.maryland.gov/business/Pages/incentives/empowermdcigp.aspx](https://energy.maryland.gov/business/Pages/incentives/empowermdcigp.aspx)",
"[https://energy.maryland.gov/business/SiteAssets/Pages/incentives/empowermdcigp/FY26%20C%26I%20Grant%20Program%20FOA%20V02.pdf](https://energy.maryland.gov/business/SiteAssets/Pages/incentives/empowermdcigp/FY26%20C%26I%20Grant%20Program%20FOA%20V02.pdf)"
],
"evidenceText": "MEA's FY26 commercial, industrial, and data center FOA closed January 30, 2026. Eligible measures included data center efficiency, HVAC, shell, lighting, controls, motors, refrigeration, and process equipment, while renewables and several other categories were excluded.",
"reasoningNotes": "Mark unavailable because the reviewed official round is closed. Keep categories only to support historical taxonomy and avoid active-opportunity matching."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22711",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"MI"
],
"counties": [],
"cities": [],
"utilityTerritories": [],
"notes": "Statewide Michigan program, with application and rollout conditions; Detroit District income-qualified applications were temporarily suspended on the portal at review."
},
"eligibleApplicantTypes": [
"low_income_household",
"moderate_income_household",
"owner_occupant",
"renter_with_owner_approval"
],
"eligibleSectors": [
"residential",
"multifamily"
],
"eligibleRetrofitCategories": [
"heat_pump_hvac_retrofit",
"ductless_heat_pump",
"heat_pump_water_heater",
"electric_stove_range_or_oven",
"heat_pump_clothes_dryer",
"electrical_panel_upgrade",
"electrical_wiring_upgrade",
"insulation_upgrade",
"air_sealing_weatherization",
"ventilation_upgrade"
],
"hardRequirements": [
"Household must meet HEAR income eligibility, generally at or below 150 percent of area median income.",
"Applicant must use the Michigan rebate process and an approved contractor where required.",
"Assessment and approval are required before eligible work.",
"Rebate is paid through the program process and may be paid to the contractor."
],
"blockers": [
"Do not match generic high-efficiency HVAC unless it is an eligible electric heat pump measure.",
"Do not match windows, doors, furnaces, standard central air conditioners, or refrigerators to the HEAR record.",
"Do not combine HOMES and HEAR rebates for the same single upgrade.",
"New construction is not eligible.",
"Detroit District application pause may block matching for affected applicants until official portal status changes."
],
"programType": "Rebate Program",
"administrator": "Michigan Department of Environment, Great Lakes, and Energy",
"applicationUrl": "[https://mienergyrebates.clearesult.com/help-center](https://mienergyrebates.clearesult.com/help-center)",
"websiteUrl": "[https://www.michigan.gov/egle/about/organization/materials-management/energy/rfps-loans/home-energy-rebate-programs](https://www.michigan.gov/egle/about/organization/materials-management/energy/rfps-loans/home-energy-rebate-programs)",
"sourceUrlsChecked": [
"[https://www.michigan.gov/egle/about/organization/materials-management/energy/rfps-loans/home-energy-rebate-programs](https://www.michigan.gov/egle/about/organization/materials-management/energy/rfps-loans/home-energy-rebate-programs)",
"[https://www.michigan.gov/egle/about/organization/materials-management/energy/rfps-loans/home-energy-rebate-programs/get-rebate](https://www.michigan.gov/egle/about/organization/materials-management/energy/rfps-loans/home-energy-rebate-programs/get-rebate)",
"[https://www.michigan.gov/egle/faqs/climate-and-energy/home-energy-rebates-program](https://www.michigan.gov/egle/faqs/climate-and-energy/home-energy-rebates-program)",
"[https://www.michigan.gov/egle/about/organization/materials-management/energy/rfps-loans/home-energy-rebate-programs/contractors/incentives](https://www.michigan.gov/egle/about/organization/materials-management/energy/rfps-loans/home-energy-rebate-programs/contractors/incentives)",
"[https://mienergyrebates.clearesult.com/help-center](https://mienergyrebates.clearesult.com/help-center)"
],
"evidenceText": "Michigan describes active home energy rebates for eligible households. HEAR contractor incentives cover electric heat pumps, heat pump water heaters, electric cooking, heat pump dryers, load service center upgrades, insulation, air sealing, ventilation, and wiring.",
"reasoningNotes": "Separate HEAR from HOMES. The supplied air sealing, heat pump, heat pump water heater, and insulation matches are supported; broad HVAC should be narrowed to heat-pump equipment."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3508",
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
"MidAmerican Energy Iowa service territory"
],
"notes": "Applies to eligible MidAmerican Energy business customers in Iowa, subject to fuel-delivery and program requirements."
},
"eligibleApplicantTypes": [
"commercial_customer",
"industrial_customer",
"agricultural_customer"
],
"eligibleSectors": [
"commercial",
"industrial",
"agricultural",
"institutional"
],
"eligibleRetrofitCategories": [
"air_source_heat_pump",
"cold_climate_heat_pump",
"ductless_heat_pump",
"ground_source_geothermal_heat_pump",
"central_air_conditioner_replacement",
"high_efficiency_boiler_retrofit",
"high_efficiency_furnace_retrofit",
"heat_pump_water_heater",
"led_lighting_retrofit",
"exterior_site_lighting_retrofit",
"lighting_controls_retrofit",
"commercial_refrigeration_equipment",
"commercial_kitchen_equipment",
"agricultural_fan_controls",
"agricultural_led_grow_lighting"
],
"hardRequirements": [
"Customer must meet MidAmerican Energy business rebate qualifications.",
"Equipment must meet current program efficiency and installation requirements.",
"Equipment must generally be installed during the current program year and submitted within the required time window.",
"Custom non-listed projects require preapproval through the nonresidential energy solutions path."
],
"blockers": [
"Do not match residential rebates to this commercial program.",
"New construction and custom projects may be separate or require different approval.",
"Existing LED-to-new LED replacements are not eligible under listed lighting rules.",
"Do not generalize product-specific food-service or refrigeration rebates into unrelated kitchen or process retrofits."
],
"programType": "Rebate Program",
"administrator": "MidAmerican Energy",
"applicationUrl": null,
"websiteUrl": "[https://www.midamericanenergy.com/business-discounts-and-rebates](https://www.midamericanenergy.com/business-discounts-and-rebates)",
"sourceUrlsChecked": [
"[https://www.midamericanenergy.com/business-discounts-and-rebates](https://www.midamericanenergy.com/business-discounts-and-rebates)"
],
"evidenceText": "MidAmerican's business page lists 2026 discounts and rebates for heat pumps, central air, geothermal, boilers, furnaces, heat pump water heaters, interior and exterior lighting, lighting controls, commercial kitchen equipment, refrigeration, and agricultural efficiency measures.",
"reasoningNotes": "Supplied commercial HVAC, geothermal, heat pump, exterior lighting, and LED matches are supported. Add narrow product categories where official source is product-specific."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3507",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"IL"
],
"counties": [],
"cities": [],
"utilityTerritories": [
"MidAmerican Energy Illinois service territory"
],
"notes": "Limited to eligible MidAmerican Energy residential customers in Illinois; MidAmerican must deliver the applicable primary electric or gas service to the equipment."
},
"eligibleApplicantTypes": [
"residential_customer",
"homeowner",
"renter_with_required_account_or_owner_conditions"
],
"eligibleSectors": [
"residential"
],
"eligibleRetrofitCategories": [
"air_source_heat_pump",
"ductless_heat_pump",
"ground_source_geothermal_heat_pump",
"central_air_conditioner_replacement",
"high_efficiency_furnace_retrofit",
"heat_pump_water_heater",
"smart_thermostat",
"residential_refrigerator_rebate",
"residential_freezer_rebate",
"clothes_washer_rebate",
"electric_clothes_dryer_rebate",
"air_purifier_rebate"
],
"hardRequirements": [
"Customer must be an eligible MidAmerican Energy Illinois residential customer.",
"MidAmerican must deliver the applicable primary electric or gas service to the rebated equipment.",
"Equipment must be new, meet program efficiency requirements, and be installed during the applicable program year.",
"Application must be submitted within the required deadline and incentives are subject to funding."
],
"blockers": [
"Do not match commercial refrigeration equipment; official residential appliance rebates are limited to household refrigerators and freezers.",
"Do not match commercial kitchen, motors, VFDs, or industrial measures.",
"Do not broaden residential air conditioner or furnace rebates into all high-efficiency HVAC without equipment-specific eligibility.",
"The older Illinois EE rebates URL now redirects or is obsolete; use the current home discounts and Illinois qualifications pages."
],
"programType": "Rebate Program",
"administrator": "MidAmerican Energy Company",
"applicationUrl": "[https://midamerican.ri-esuite.com/about/programs/residential](https://midamerican.ri-esuite.com/about/programs/residential)",
"websiteUrl": "[https://www.midamericanenergy.com/home-discounts-and-rebates](https://www.midamericanenergy.com/home-discounts-and-rebates)",
"sourceUrlsChecked": [
"[https://www.midamericanenergy.com/il-ee-rebates](https://www.midamericanenergy.com/il-ee-rebates)",
"[https://www.midamericanenergy.com/home-discounts-and-rebates](https://www.midamericanenergy.com/home-discounts-and-rebates)",
"[https://www.midamericanenergy.com/il_qualifications-and-conditions](https://www.midamericanenergy.com/il_qualifications-and-conditions)",
"[https://www.midamericanenergy.com/media/pdf/mec-hvac-reference-res.pdf](https://www.midamericanenergy.com/media/pdf/mec-hvac-reference-res.pdf)",
"[https://midamerican.ri-esuite.com/about/programs/residential](https://midamerican.ri-esuite.com/about/programs/residential)"
],
"evidenceText": "MidAmerican's current home rebates include residential heat pumps, central air conditioners, geothermal heat pumps, heat pump water heaters, gas furnaces, smart thermostats, air purifiers, clothes washers and dryers, refrigerators, and freezers.",
"reasoningNotes": "Original geothermal, ductless, heat pump, and heat pump water heater matches are supported. Replace commercial refrigeration with narrow residential refrigerator and freezer appliance rebates."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22552",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"IL"
],
"counties": [],
"cities": [],
"utilityTerritories": [
"MidAmerican Energy Illinois service territory"
],
"notes": "Duplicate or overlapping MidAmerican Illinois residential rebate record; current program page is the home discounts and rebates page."
},
"eligibleApplicantTypes": [
"residential_customer",
"homeowner",
"renter_with_required_account_or_owner_conditions"
],
"eligibleSectors": [
"residential"
],
"eligibleRetrofitCategories": [
"air_source_heat_pump",
"ductless_heat_pump",
"ground_source_geothermal_heat_pump",
"central_air_conditioner_replacement",
"high_efficiency_furnace_retrofit",
"heat_pump_water_heater",
"smart_thermostat",
"residential_refrigerator_rebate",
"residential_freezer_rebate",
"clothes_washer_rebate",
"electric_clothes_dryer_rebate",
"air_purifier_rebate"
],
"hardRequirements": [
"Customer must be an eligible MidAmerican Energy Illinois residential customer.",
"MidAmerican must deliver the applicable primary electric or gas service to the rebated equipment.",
"Equipment must be new, meet current efficiency requirements, and be installed during the applicable program year.",
"Application must be submitted within the required deadline and incentives are subject to funding."
],
"blockers": [
"Do not match commercial refrigeration equipment; residential appliance rebates are product-specific household refrigerator and freezer rebates.",
"Do not match commercial kitchen, motors, VFDs, or industrial measures.",
"Do not match standard electric or gas water heaters where the current record supports heat pump water heaters.",
"Treat this as overlapping with SOURCE_DSIRE:dsire_program_id:3507 unless RetroFi keeps separate DSIRE records by source."
],
"programType": "Rebate Program",
"administrator": "MidAmerican Energy",
"applicationUrl": "[https://midamerican.ri-esuite.com/about/programs/residential](https://midamerican.ri-esuite.com/about/programs/residential)",
"websiteUrl": "[https://www.midamericanenergy.com/home-discounts-and-rebates](https://www.midamericanenergy.com/home-discounts-and-rebates)",
"sourceUrlsChecked": [
"[https://www.midamericanenergy.com/il-residential-rebates](https://www.midamericanenergy.com/il-residential-rebates)",
"[https://www.midamericanenergy.com/home-discounts-and-rebates](https://www.midamericanenergy.com/home-discounts-and-rebates)",
"[https://www.midamericanenergy.com/il_qualifications-and-conditions](https://www.midamericanenergy.com/il_qualifications-and-conditions)",
"[https://www.midamericanenergy.com/media/pdf/mec-hvac-reference-res.pdf](https://www.midamericanenergy.com/media/pdf/mec-hvac-reference-res.pdf)",
"[https://midamerican.ri-esuite.com/about/programs/residential](https://midamerican.ri-esuite.com/about/programs/residential)"
],
"evidenceText": "The current MidAmerican home rebates page and residential application cover Illinois residential HVAC, heat pump water heaters, smart thermostats, air purifiers, clothes washers and dryers, refrigerators, and freezers.",
"reasoningNotes": "This appears to duplicate the MidAmerican Illinois residential rebate record. Preserve residential heat pump and geothermal categories, but narrow refrigeration to household appliance rebates."
}
],
"continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:4739"
}

