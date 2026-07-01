{
"schemaVersion": "opportunity_data_research_repairs.v1",
"researchedAt": "2026-07-01",
"source": "gpt_pro",
"repairs": [
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3589",
"confidence": "medium",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"NC"
],
"counties": [],
"cities": [],
"utilityTerritories": [
"Haywood EMC"
],
"notes": "Limited to Haywood EMC members and properties in the cooperative service territory."
},
"eligibleApplicantTypes": [
"residential_property_owner",
"cooperative_member",
"credit_union_member"
],
"eligibleSectors": [
"residential"
],
"eligibleRetrofitCategories": [
"heat_pump_hvac_retrofit",
"air_sealing_weatherization",
"insulation_upgrade",
"window_replacement",
"door_replacement"
],
"hardRequirements": [
"Applicant must be a Haywood EMC member or otherwise qualify through ElecTel Cooperative Federal Credit Union.",
"Financing is subject to ElecTel membership, underwriting, and credit approval.",
"Property must be a qualifying residential dwelling.",
"Program is loan financing, not a rebate.",
"Haywood-specific scope is heat pump and weatherization financing."
],
"blockers": [
"Do not match as a rebate or grant.",
"Do not match generic HVAC measures unless the measure is a heat pump or clearly weatherization-related.",
"Do not generalize ElecTel's broader loan list into unrelated Haywood rebate categories.",
"EV loans and other sustainability financing are separate ElecTel products.",
"Haywood EMC's program page was not readable in the browser, so unsupported categories should remain excluded."
],
"programType": "Loan Program",
"administrator": "Haywood EMC / ElecTel Cooperative Federal Credit Union",
"applicationUrl": "[https://electel.org/apply/energy-efficient-loans/](https://electel.org/apply/energy-efficient-loans/)",
"websiteUrl": "[https://www.haywoodemc.com/heat-pumpweatherization-loan](https://www.haywoodemc.com/heat-pumpweatherization-loan)",
"sourceUrlsChecked": [
"[https://www.haywoodemc.com/heat-pumpweatherization-loan](https://www.haywoodemc.com/heat-pumpweatherization-loan)",
"[https://www.haywoodemc.com/energy-efficiency/heat-pumps/heat-pump-weatherization-loan/](https://www.haywoodemc.com/energy-efficiency/heat-pumps/heat-pump-weatherization-loan/)",
"[https://electel.org/apply/energy-efficient-loans/](https://electel.org/apply/energy-efficient-loans/)",
"[https://electel.org/apply/current-rates/](https://electel.org/apply/current-rates/)"
],
"evidenceText": "Haywood’s page could not be read by the browser, but the program points members to ElecTel. ElecTel’s current loan page covers residential heat pumps and weatherization-related measures with up to 100% financing for qualifying property owners.",
"reasoningNotes": "Target batch supplied in uploaded prompt file . The Haywood-specific page was inaccessible, so categories are limited to the named heat pump and weatherization loan scope rather than ElecTel's entire loan catalog."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2692",
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
"Heartland REMC"
],
"notes": "Installation address must be served by Heartland REMC and have an active account."
},
"eligibleApplicantTypes": [
"residential_customer",
"cooperative_member"
],
"eligibleSectors": [
"residential"
],
"eligibleRetrofitCategories": [
"air_source_heat_pump",
"ground_source_geothermal_heat_pump",
"electric_water_heater"
],
"hardRequirements": [
"Installation address must be served by Heartland REMC.",
"Applicant must have an active Heartland REMC account.",
"Application and documentation must be submitted within the required program period and post-purchase window.",
"Heat pump rebates require qualifying AHRI documentation.",
"Equipment must satisfy the efficiency and sizing requirements listed on the current rebate form."
],
"blockers": [
"Do not match generic high-efficiency HVAC unless the measure is an eligible air-source or geothermal heat pump.",
"Do not match furnaces, boilers, central air conditioners alone, or residential weatherization.",
"Do not match commercial or industrial measures.",
"Duplicate Heartland or wholesale power-provider rebates for the same equipment are not eligible."
],
"programType": "Rebate Program",
"administrator": "Heartland REMC",
"applicationUrl": "[https://www.heartlandremc.com/s/2026-Residential-Energy-Efficiency-Program.pdf](https://www.heartlandremc.com/s/2026-Residential-Energy-Efficiency-Program.pdf)",
"websiteUrl": "[https://www.heartlandremc.com/rebates/](https://www.heartlandremc.com/rebates/)",
"sourceUrlsChecked": [
"[https://www.heartlandremc.com/rebates/](https://www.heartlandremc.com/rebates/)",
"[https://www.heartlandremc.com/s/2026-Residential-Energy-Efficiency-Program.pdf](https://www.heartlandremc.com/s/2026-Residential-Energy-Efficiency-Program.pdf)"
],
"evidenceText": "Heartland’s 2026 residential form lists rebates for electric water heaters, geothermal heat pumps, and air-source heat pumps, with active account, Heartland service-address, and AHRI requirements for heat pumps.",
"reasoningNotes": "The heat pump and geothermal matches are correct, but generic HVAC replacement should be narrowed to the listed heat pump equipment. No envelope, furnace, or commercial categories were verified."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2045",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"CO"
],
"counties": [],
"cities": [],
"utilityTerritories": [
"Holy Cross Energy"
],
"notes": "Equipment must be installed in Holy Cross Energy service territory for a member in good standing."
},
"eligibleApplicantTypes": [
"residential_member",
"income_qualified_residential_member"
],
"eligibleSectors": [
"residential"
],
"eligibleRetrofitCategories": [
"air_sealing_weatherization",
"insulation_upgrade",
"heat_pump_hvac_retrofit",
"ground_source_geothermal_heat_pump",
"heat_pump_water_heater",
"heat_pump_clothes_dryer",
"induction_cooktop_range",
"residential_energy_management_system",
"smart_panel_or_load_controller",
"smart_thermostat_zoning_retrofit",
"new_all_electric_construction",
"battery_storage_system",
"plug_sharing_device"
],
"hardRequirements": [
"Applicant must be a Holy Cross Energy member in good standing.",
"Equipment must be installed and working in the Holy Cross Energy service territory.",
"Residential rebate applications must be submitted within the stated post-installation deadline.",
"Members must enroll in the applicable Holy Cross flexible-load program where required.",
"Air sealing and insulation rebates have additional building-heating, blower-door, and insulation-performance requirements."
],
"blockers": [
"Colorado HEAR rebates are a separate program and should not be merged into this opportunity.",
"Commercial rebates are separate from this residential rebate page.",
"EV, e-bike, and electric lawn equipment incentives are separate program areas.",
"Battery incentives are tied to Holy Cross battery or time-of-use program requirements.",
"Do not match generic fossil-fuel HVAC replacement where the listed measure is electrification-focused."
],
"programType": "Rebate Program",
"administrator": "Holy Cross Energy",
"applicationUrl": "[https://www.holycross.com/member-programs/energy-efficiency-and-rebates/residential-rebate-application](https://www.holycross.com/member-programs/energy-efficiency-and-rebates/residential-rebate-application)",
"websiteUrl": "[https://www.holycross.com/member-programs/energy-efficiency-and-rebates/residential-rebates-2026](https://www.holycross.com/member-programs/energy-efficiency-and-rebates/residential-rebates-2026)",
"sourceUrlsChecked": [
"[https://www.holycross.com/member-programs/energy-efficiency-and-rebates/residential-rebates-2026](https://www.holycross.com/member-programs/energy-efficiency-and-rebates/residential-rebates-2026)",
"[https://www.holycross.com/member-programs/energy-efficiency-and-rebates/residential-rebate-application](https://www.holycross.com/member-programs/energy-efficiency-and-rebates/residential-rebate-application)",
"[https://www.holycross.com/rebate-rules](https://www.holycross.com/rebate-rules)"
],
"evidenceText": "Holy Cross Energy’s 2026 residential rebate page lists air sealing, insulation, heat pumps, heat pump water heaters and dryers, induction cooking, thermostats, smart panels, load controllers, all-electric construction, and batteries.",
"reasoningNotes": "The original envelope matches are supported. Generic HVAC should be narrowed to the supported heat pump and electrification categories, with separate-program boundaries preserved."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3939",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"MO"
],
"counties": [],
"cities": [
"Independence"
],
"utilityTerritories": [
"Independence Power and Light"
],
"notes": "Available to qualifying nonresidential Independence Power and Light customers."
},
"eligibleApplicantTypes": [
"commercial_customer",
"industrial_customer",
"nonresidential_customer"
],
"eligibleSectors": [
"commercial",
"industrial",
"institutional"
],
"eligibleRetrofitCategories": [
"high_efficiency_air_conditioning",
"lighting_controls_retrofit",
"fluorescent_lighting_retrofit",
"hid_lighting_retrofit",
"custom_energy_efficiency_project"
],
"hardRequirements": [
"Applicant must be an existing or new Independence Power and Light customer not eligible for residential rates.",
"Customer must be current on utility payments and not shut off for non-payment.",
"Prescriptive projects generally require application review and pre-inspection before work begins.",
"Custom projects must meet payback and cost-effectiveness requirements.",
"Program-year incentive caps and project-cost caps apply."
],
"blockers": [
"Residential customers are not eligible.",
"LED lighting is not listed as a current prescriptive category on the checked application and should only match if custom-approved.",
"Do not match generic HVAC; current prescriptive HVAC scope is air conditioning.",
"Work started before approval may be ineligible except where the program expressly allows recent air-conditioning replacement."
],
"programType": "Rebate Program",
"administrator": "Independence Power and Light",
"applicationUrl": "[https://www.independencemo.gov/sites/default/files/2023-08/Commercial%20Rebate%20Prescriptive%20Application.pdf](https://www.independencemo.gov/sites/default/files/2023-08/Commercial%20Rebate%20Prescriptive%20Application.pdf)",
"websiteUrl": "[https://www.independencemo.gov/customers/commercial-programs](https://www.independencemo.gov/customers/commercial-programs)",
"sourceUrlsChecked": [
"[https://www.independencemo.gov/government/city-departments/power-and-light/commercial-programs](https://www.independencemo.gov/government/city-departments/power-and-light/commercial-programs)",
"[https://www.independencemo.gov/customers/commercial-programs](https://www.independencemo.gov/customers/commercial-programs)",
"[https://www.independencemo.gov/sites/default/files/2023-08/Commercial%20Rebate%20Prescriptive%20Application.pdf](https://www.independencemo.gov/sites/default/files/2023-08/Commercial%20Rebate%20Prescriptive%20Application.pdf)"
],
"evidenceText": "Independence’s commercial page and prescriptive application cover air-conditioning measures, lighting technologies, occupancy-sensor controls, and custom efficiency projects for nonresidential IPL customers.",
"reasoningNotes": "Lighting controls and air-conditioning are supported. The original LED match is not preserved because the checked current prescriptive form lists fluorescent, HID, and controls rather than LED as a named prescriptive measure."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:4618",
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
"Indiana Michigan Power Indiana electric service territory"
],
"notes": "Available to eligible Indiana commercial and industrial electric customers of Indiana Michigan Power."
},
"eligibleApplicantTypes": [
"commercial_customer",
"industrial_customer",
"nonresidential_electric_customer"
],
"eligibleSectors": [
"commercial",
"industrial",
"institutional"
],
"eligibleRetrofitCategories": [
"led_lighting_retrofit",
"lighting_controls_retrofit",
"high_efficiency_hvac_replacement",
"heat_pump_hvac_retrofit",
"high_efficiency_refrigeration_equipment",
"commercial_kitchen_equipment",
"variable_frequency_drive",
"compressed_air_efficiency",
"heat_pump_water_heater",
"window_film",
"low_flow_showerhead",
"industrial_process_insulation"
],
"hardRequirements": [
"Applicant must be a current Indiana Michigan Power electric business customer in Indiana.",
"Opt-out customers are not eligible.",
"Projects over listed incentive or savings thresholds require preapproval.",
"Final applications must be submitted within the required post-installation window and by the annual program deadline.",
"Incentive caps by project, site, and company apply."
],
"blockers": [
"Residential customers are not eligible under this commercial and industrial opportunity.",
"Do not infer home appliances, home weatherization, or residential rebates.",
"Demand-reduction-only, peak shaving, fuel switching, power generation, and renewable energy projects are not eligible prescriptive measures.",
"Equipment must meet the current measure-selection form requirements."
],
"programType": "Rebate Program",
"administrator": "Indiana Michigan Power Company",
"applicationUrl": "[https://electricideas.com/wp-content/uploads/2026/06/2026AEPIM_Prescriptive-Business-Application_V11.pdf](https://electricideas.com/wp-content/uploads/2026/06/2026AEPIM_Prescriptive-Business-Application_V11.pdf)",
"websiteUrl": "[https://electricideas.com/at-work/prescriptive/](https://electricideas.com/at-work/prescriptive/)",
"sourceUrlsChecked": [
"[https://electricideas.com/at-work/prescriptive/](https://electricideas.com/at-work/prescriptive/)",
"[https://electricideas.com/wp-content/uploads/2026/06/2026AEPIM_Prescriptive-Business-Application_V11.pdf](https://electricideas.com/wp-content/uploads/2026/06/2026AEPIM_Prescriptive-Business-Application_V11.pdf)",
"[https://electricideas.com/wp-content/uploads/2026/05/AEPIN26-09_Prescriptive-Lighting-Measure-Selection-Form_V3_DIGITAL.pdf](https://electricideas.com/wp-content/uploads/2026/05/AEPIN26-09_Prescriptive-Lighting-Measure-Selection-Form_V3_DIGITAL.pdf)",
"[https://electricideas.com/wp-content/uploads/2026/05/AEPIN26-14_HVAC_Measure-Selection-Form_V6_DIGITAL.pdf](https://electricideas.com/wp-content/uploads/2026/05/AEPIN26-14_HVAC_Measure-Selection-Form_V6_DIGITAL.pdf)",
"[https://electricideas.com/wp-content/uploads/2026/06/2026AEPIM_Prescriptive-Miscellaneous-Measure-Selection-Form_V5.pdf](https://electricideas.com/wp-content/uploads/2026/06/2026AEPIM_Prescriptive-Miscellaneous-Measure-Selection-Form_V5.pdf)"
],
"evidenceText": "Indiana Michigan Power’s business prescriptive program lists lighting, HVAC, VFDs, refrigeration, cooking, compressed air, and miscellaneous efficiency measures for eligible Indiana business electric customers.",
"reasoningNotes": "The refrigeration, lighting, and HVAC matches are supported for C&I customers. The repaired category list preserves only current business prescriptive measure families and excludes residential-only measures."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:4615",
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
"Indiana Michigan Power Indiana residential electric service territory"
],
"notes": "Applies to eligible Indiana residential electric customers; some offers are limited to electric-only or income-qualified customers."
},
"eligibleApplicantTypes": [
"residential_customer",
"income_qualified_residential_customer",
"electric_only_residential_customer"
],
"eligibleSectors": [
"residential"
],
"eligibleRetrofitCategories": [
"smart_thermostat_zoning_retrofit",
"air_source_heat_pump",
"cold_climate_heat_pump",
"ductless_heat_pump",
"high_efficiency_air_conditioning",
"heat_pump_water_heater",
"dehumidifier",
"air_sealing_weatherization",
"insulation_upgrade",
"led_lighting_retrofit",
"low_flow_aerator",
"advanced_power_strip",
"door_sweep_weatherstripping",
"spray_foam_caulk"
],
"hardRequirements": [
"Customer must be in Indiana Michigan Power's Indiana residential service area.",
"Some post-purchase rebates apply only to electric-only residential customers.",
"Instant discounts require qualifying equipment and participating channels or contractors.",
"Income-qualified home weatherproofing requires income eligibility and residential-account requirements.",
"Home weatherproofing measures may require a home energy checkup or program-installed measures."
],
"blockers": [
"Do not match window replacement; window air conditioner and window-related text are energy tips, not a verified window replacement rebate.",
"Power Rewards demand response is a separate bill-credit program.",
"EV and solar offers are separate from the home energy products and weatherproofing offers.",
"Do not match commercial kitchen, refrigeration, motors, VFDs, or industrial measures.",
"Do not infer generic HVAC beyond the listed heat pump, air conditioning, thermostat, and water-heating offers."
],
"programType": "Rebate Program",
"administrator": "Indiana Michigan Power Company",
"applicationUrl": null,
"websiteUrl": "[https://electricideas.com/at-home/](https://electricideas.com/at-home/)",
"sourceUrlsChecked": [
"[https://electricideas.com/at-home/](https://electricideas.com/at-home/)",
"[https://electricideas.com/at-home/in-store-products/](https://electricideas.com/at-home/in-store-products/)",
"[https://electricideas.com/at-home/instant-discounts/](https://electricideas.com/at-home/instant-discounts/)",
"[https://electricideas.com/at-home/home-energy-checkup/](https://electricideas.com/at-home/home-energy-checkup/)",
"[https://improducts.customerapplication.com](https://improducts.customerapplication.com)"
],
"evidenceText": "I&M’s residential pages list smart thermostats, dehumidifiers, HVAC and heat pump water-heating instant discounts, and income-qualified weatherproofing with insulation, LEDs, aerators, and air-sealing products.",
"reasoningNotes": "The thermostat match is supported. The window replacement match is a false positive caused by window air-conditioner or window-tip language, so it is blocked."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3153",
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
"Pacific Power",
"NW Natural",
"Cascade Natural Gas",
"Avista"
],
"notes": "Available to eligible Oregon industrial and agricultural customers served by participating Energy Trust utilities."
},
"eligibleApplicantTypes": [
"industrial_customer",
"agricultural_customer",
"manufacturing_business",
"farm_or_greenhouse_operator"
],
"eligibleSectors": [
"industrial",
"agricultural"
],
"eligibleRetrofitCategories": [
"industrial_lighting_retrofit",
"lighting_controls_retrofit",
"building_pipe_insulation",
"variable_frequency_drive",
"irrigation_efficiency",
"drip_irrigation",
"greenhouse_efficiency",
"indoor_ag_dehumidifier",
"boiler_radiant_heating_efficiency",
"industrial_battery_charger_efficiency",
"smart_thermostat_zoning_retrofit",
"steam_trap_repair_replacement",
"efficient_welder",
"custom_energy_efficiency_project"
],
"hardRequirements": [
"Customer must be an eligible Oregon industrial or agricultural customer of a participating Energy Trust utility.",
"Measures must satisfy the current Energy Trust form or custom-project requirements.",
"Custom projects require Energy Trust review and savings-based approval.",
"Incentive availability and rates are subject to the current program year forms and funding."
],
"blockers": [
"Do not match residential appliances, residential weatherization, or home HVAC measures.",
"Do not match solar or renewable generation under this production-efficiency opportunity.",
"Broad building energy management systems are not preserved unless the project is specifically supported as a custom or listed control measure.",
"Commercial office lighting should not be inferred unless it fits the industrial or agricultural program requirements."
],
"programType": "Rebate Program",
"administrator": "Energy Trust of Oregon",
"applicationUrl": "[https://insider.energytrust.org/programs/industry-ag/forms/](https://insider.energytrust.org/programs/industry-ag/forms/)",
"websiteUrl": "[https://insider.energytrust.org/programs/industry-ag/](https://insider.energytrust.org/programs/industry-ag/)",
"sourceUrlsChecked": [
"[http://www.energytrust.org/industry-agriculture/](http://www.energytrust.org/industry-agriculture/)",
"[https://insider.energytrust.org/programs/industry-ag/](https://insider.energytrust.org/programs/industry-ag/)",
"[https://insider.energytrust.org/programs/industry-ag/forms/](https://insider.energytrust.org/programs/industry-ag/forms/)",
"[https://insider.energytrust.org/production-efficiency-program-announces-updated-2026-incentive-forms-and-project-support/](https://insider.energytrust.org/production-efficiency-program-announces-updated-2026-incentive-forms-and-project-support/)",
"[https://blog.energytrust.org/2026-incentives-easier-ways-to-save-energy-and-money/](https://blog.energytrust.org/2026-incentives-easier-ways-to-save-energy-and-money/)"
],
"evidenceText": "Energy Trust’s current Industry and Agriculture pages and 2026 forms list lighting controls, insulation, VFDs, irrigation, greenhouse, boiler, battery charger, steam trap, welder, and custom efficiency measures.",
"reasoningNotes": "Lighting controls are supported. The original broad energy management system match was narrowed because current official pages support specific controls, forms, and custom projects rather than a general EMS category."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22079",
"confidence": "medium",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"ID"
],
"counties": [],
"cities": [],
"utilityTerritories": [
"Kootenai Electric Cooperative"
],
"notes": "Limited to Kootenai Electric Cooperative nonresidential customers."
},
"eligibleApplicantTypes": [
"commercial_customer",
"nonresidential_cooperative_member"
],
"eligibleSectors": [
"commercial",
"institutional",
"lodging",
"residential_care"
],
"eligibleRetrofitCategories": [
"led_lighting_retrofit",
"lighting_controls_retrofit",
"ductless_heat_pump",
"packaged_terminal_heat_pump",
"advanced_rooftop_unit_controls",
"custom_energy_efficiency_project"
],
"hardRequirements": [
"Applicant must be a Kootenai Electric Cooperative nonresidential customer.",
"Applications generally must be submitted within the stated post-installation deadline.",
"Lighting incentives require the applicable lighting calculator and supporting documentation.",
"Ductless heat pump and packaged terminal heat pump projects must meet equipment and baseline-heating requirements.",
"Advanced rooftop unit controls apply only to qualifying retrofit rooftop units."
],
"blockers": [
"Residential customers are not eligible under the checked commercial pages.",
"Do not match generic HVAC; current HVAC support is limited to listed ductless heat pump, packaged terminal heat pump, advanced rooftop controls, or custom-approved measures.",
"Packaged terminal heat pumps are limited to eligible lodging or residential-care applications.",
"Advanced rooftop unit controls exclude split systems and variable-speed equipment where the program excludes them.",
"The main Kootenai site was access-limited, so unsupported categories should not be inferred."
],
"programType": "Rebate Program",
"administrator": "Kootenai Electric Cooperative / Direct Efficiency",
"applicationUrl": null,
"websiteUrl": "[https://www.directefficiency.com/kec-commercial-rebates/](https://www.directefficiency.com/kec-commercial-rebates/)",
"sourceUrlsChecked": [
"[https://www.kec.com/energy-solutions/](https://www.kec.com/energy-solutions/)",
"[https://www.directefficiency.com/kec-commercial-rebates/](https://www.directefficiency.com/kec-commercial-rebates/)",
"[https://directefficiency.com/kec-commercial-ductless-heat-pump-rebate/](https://directefficiency.com/kec-commercial-ductless-heat-pump-rebate/)",
"[https://directefficiency.com/kec-commercial-lighting-rebate/](https://directefficiency.com/kec-commercial-lighting-rebate/)",
"[https://directefficiency.com/kec-commercial-advanced-rooftop-unit-control-rebate/](https://directefficiency.com/kec-commercial-advanced-rooftop-unit-control-rebate/)",
"[https://directefficiency.com/kec-commercial-packaged-terminal-heat-pump-rebate/](https://directefficiency.com/kec-commercial-packaged-terminal-heat-pump-rebate/)",
"[https://directefficiency.com/kec-commercial-custom-projects-rebates/](https://directefficiency.com/kec-commercial-custom-projects-rebates/)"
],
"evidenceText": "KEC-branded Direct Efficiency commercial pages list nonresidential rebates for lighting, ductless heat pumps, packaged terminal heat pumps, advanced rooftop unit controls, and custom efficiency projects.",
"reasoningNotes": "The ductless heat pump and lighting matches are supported. Generic high-efficiency HVAC was narrowed to the specific heat pump and rooftop-control measures verified on KEC-branded program pages."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5564",
"confidence": "medium",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"CO"
],
"counties": [
"Lake"
],
"cities": [
"Leadville"
],
"utilityTerritories": [],
"notes": "C4 describes free home energy assessments for full-time Lake County residents, including renters; retrofit funding is tied to assessment findings and available support."
},
"eligibleApplicantTypes": [
"residential_homeowner",
"residential_renter",
"income_qualified_household"
],
"eligibleSectors": [
"residential"
],
"eligibleRetrofitCategories": [
"home_energy_assessment",
"air_sealing_weatherization",
"insulation_upgrade",
"led_lighting_retrofit",
"health_safety_energy_repair"
],
"hardRequirements": [
"Participant must be a full-time Lake County resident for the C4 home energy assessment offer.",
"Retrofit support is generally connected to audit findings, program coaching, or identified health, safety, and energy needs.",
"Renters may participate in assessments, but property modifications may require owner permission.",
"Funding, rebate amounts, and eligible measures are subject to C4 and partner program availability."
],
"blockers": [
"Smart or programmable thermostat rebates were not verified on the current C4 core pages and should not be matched here.",
"CARE, WAP, LIHEAP, Xcel, and other assistance resources listed by C4 are separate programs unless specifically applied through this opportunity.",
"Do not match commercial or industrial projects.",
"Do not infer broad HVAC replacement or appliance rebates from separate assistance-program descriptions."
],
"programType": "Rebate Program / Home Energy Assessment Support",
"administrator": "Cloud City Conservation Center",
"applicationUrl": "[https://energysmartcolorado.formstack.com/forms/residential_enrollment](https://energysmartcolorado.formstack.com/forms/residential_enrollment)",
"websiteUrl": "[https://www.c4leadville.org/home-energy-assessment](https://www.c4leadville.org/home-energy-assessment)",
"sourceUrlsChecked": [
"[https://www.c4leadville.org/home-energy-assessment](https://www.c4leadville.org/home-energy-assessment)",
"[https://www.c4leadville.org/energy-resource-center](https://www.c4leadville.org/energy-resource-center)",
"[https://www.c4leadville.org/energy-assistance](https://www.c4leadville.org/energy-assistance)",
"[https://energysmartcolorado.formstack.com/forms/residential_enrollment](https://energysmartcolorado.formstack.com/forms/residential_enrollment)"
],
"evidenceText": "Cloud City Conservation Center describes Energy Smart Colorado assessments, QuickFix installs, reports, coaching, and financial support for critical home health, safety, and energy improvements in Lake County.",
"reasoningNotes": "Insulation and weatherization are supported as audit-related improvements. LED lighting is supported through QuickFix-type installs. The thermostat match is not preserved because it was not verified in current C4 program text."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2122",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"NC"
],
"counties": [
"Cumberland",
"Hoke",
"Robeson",
"Moore",
"Scotland"
],
"cities": [],
"utilityTerritories": [
"Lumbee River EMC"
],
"notes": "Limited to Lumbee River EMC members who qualify for ElecTel energy-efficiency home-improvement financing."
},
"eligibleApplicantTypes": [
"residential_property_owner",
"cooperative_member",
"credit_union_member"
],
"eligibleSectors": [
"residential"
],
"eligibleRetrofitCategories": [
"window_replacement",
"door_replacement",
"heat_pump_hvac_retrofit",
"high_efficiency_air_conditioning",
"gas_pack_hvac",
"electric_water_heater",
"solar_water_heater",
"gas_water_heater",
"insulation_upgrade",
"air_sealing_weatherization",
"energy_star_appliance",
"generator",
"solar_energy_system"
],
"hardRequirements": [
"Applicant must be an eligible Lumbee River EMC member and qualify through ElecTel Cooperative Federal Credit Union.",
"Loan approval is subject to credit union membership, credit review, and underwriting.",
"Eligible property must be a qualifying residential dwelling.",
"Program is financing for energy-efficiency and sustainability home improvements, not a rebate.",
"Mobile homes are subject to a lower financing cap than other qualifying homes."
],
"blockers": [
"Do not match as a rebate; Lumbee River EMC rebate programs are separate.",
"Do not match commercial or industrial measures.",
"Do not merge EV loans or other separate ElecTel loan products into this energy-efficient home-improvement opportunity.",
"Loan financing does not guarantee measure eligibility without ElecTel approval."
],
"programType": "Loan Program",
"administrator": "Lumbee River Electric Membership Corporation / ElecTel Cooperative Federal Credit Union",
"applicationUrl": "[https://electel.org/apply/energy-efficient-loans/](https://electel.org/apply/energy-efficient-loans/)",
"websiteUrl": "[https://www.lumbeeriver.com/energy-efficient-loans](https://www.lumbeeriver.com/energy-efficient-loans)",
"sourceUrlsChecked": [
"[https://www.lumbeeriver.com/energy-efficient-loans](https://www.lumbeeriver.com/energy-efficient-loans)",
"[https://electel.org/apply/energy-efficient-loans/](https://electel.org/apply/energy-efficient-loans/)",
"[https://electel.org/apply/current-rates/](https://electel.org/apply/current-rates/)",
"[https://www.lumbeeriver.com/rebate-programs](https://www.lumbeeriver.com/rebate-programs)"
],
"evidenceText": "Lumbee River’s loan page directs members to ElecTel financing for residential windows, doors, heating and cooling, water heaters, insulation, weatherizing, appliances, generators, and solar projects.",
"reasoningNotes": "The weatherization, insulation, and HVAC-related matches are supported as financing categories. Rebate-program categories from Lumbee's separate rebate page should not be conflated with this loan record."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22704",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"ME"
],
"counties": [],
"cities": [],
"utilityTerritories": [],
"notes": "Statewide Maine program administered by Efficiency Maine, with initiative-specific limits for affordable multifamily properties and designated mobile-home locations."
},
"eligibleApplicantTypes": [
"income_qualified_homeowner",
"affordable_multifamily_owner",
"affordable_housing_developer",
"public_housing_authority",
"lihtc_owner"
],
"eligibleSectors": [
"residential",
"affordable_multifamily",
"manufactured_housing"
],
"eligibleRetrofitCategories": [
"ducted_heat_pump",
"mini_split_heat_pump",
"variable_refrigerant_flow_heat_pump",
"heat_pump_rooftop_unit",
"single_package_heat_pump"
],
"hardRequirements": [
"Program is administered by Efficiency Maine under the federal Home Electrification and Appliance Rebates allocation.",
"Current initiative focus is electrification of space heating with heat pump systems.",
"Affordable multifamily projects must meet income-restricted property and unit-count requirements.",
"Mobile-home initiative participants must meet income, residence, installer, preapproval, and location requirements.",
"Projects must follow the applicable Efficiency Maine initiative rules and inspections."
],
"blockers": [
"Do not match industrial or process electrification equipment.",
"Do not treat this as a general commercial rebate.",
"Do not generalize to all HEAR appliance categories unless Efficiency Maine has opened that specific offer.",
"Standard Efficiency Maine heat pump and insulation rebates are separate from the checked HEAR initiative pages.",
"Mobile-home eligibility excludes several nonqualifying heating and housing situations."
],
"programType": "Rebate Program",
"administrator": "Efficiency Maine Trust",
"applicationUrl": null,
"websiteUrl": "[https://www.efficiencymaine.com/IRA-Home-Energy-Rebates/](https://www.efficiencymaine.com/IRA-Home-Energy-Rebates/)",
"sourceUrlsChecked": [
"[https://www.efficiencymaine.com/IRA-Home-Energy-Rebates/](https://www.efficiencymaine.com/IRA-Home-Energy-Rebates/)",
"[https://www.maine.gov/energy/initiatives/infrastructure/home-energy-rebates](https://www.maine.gov/energy/initiatives/infrastructure/home-energy-rebates)",
"[https://www.efficiencymaine.com/initiative-for-electrification-in-new-affordable-multifamily-housing/](https://www.efficiencymaine.com/initiative-for-electrification-in-new-affordable-multifamily-housing/)",
"[https://www.efficiencymaine.com/at-home/mobile-home-initiative/](https://www.efficiencymaine.com/at-home/mobile-home-initiative/)"
],
"evidenceText": "Efficiency Maine and the state describe Maine HEAR as active, with current initiatives prioritizing heat pump space-heating electrification in new affordable multifamily housing and eligible mobile homes.",
"reasoningNotes": "Heat pump HVAC categories are supported. The original process electrification match is a false positive because the official HEAR pages describe residential heat pump space-heating initiatives, not industrial process equipment."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5828",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"MA"
],
"counties": [],
"cities": [],
"utilityTerritories": [
"Berkshire Gas",
"Cape Light Compact",
"Eversource",
"Liberty",
"National Grid",
"Unitil"
],
"notes": "Available through participating Mass Save Sponsors for qualifying small business accounts in Massachusetts."
},
"eligibleApplicantTypes": [
"small_business_customer",
"commercial_customer",
"nonprofit",
"landlord",
"renter"
],
"eligibleSectors": [
"small_business",
"commercial",
"nonprofit"
],
"eligibleRetrofitCategories": [
"air_sealing_weatherization",
"insulation_upgrade",
"led_lighting_retrofit",
"lighting_controls_retrofit",
"high_efficiency_hvac_replacement",
"heat_pump_hvac_retrofit",
"high_efficiency_refrigeration_equipment",
"motor_drive_controls",
"compressed_air_efficiency",
"pipe_insulation",
"low_flow_showerhead",
"low_flow_aerator",
"high_efficiency_water_heating",
"heating_controls_retrofit",
"custom_energy_efficiency_project"
],
"hardRequirements": [
"Business must be served by a participating Mass Save Sponsor.",
"Small business eligibility generally depends on annual electric or gas usage thresholds.",
"A no-cost assessment and sponsor Energy Savings Proposal are typically required before installation.",
"Measures and incentive levels depend on sponsor approval and the assessment results.",
"Renter and landlord participation may require property-owner authorization."
],
"blockers": [
"Do not match single-family residential home weatherization under this business program.",
"Customers above the small-business usage thresholds may need a different Mass Save pathway.",
"Exact measures are not guaranteed until the assessment and proposal are completed.",
"Do not infer measures outside Mass Save Sponsor-approved business offerings."
],
"programType": "Direct Install / Rebate Program",
"administrator": "Mass Save Sponsors",
"applicationUrl": "[https://www.masssave.com/business/rebates-offers-services/energy-assessments-technical-assistance/small-business-assessments](https://www.masssave.com/business/rebates-offers-services/energy-assessments-technical-assistance/small-business-assessments)",
"websiteUrl": "[https://www.masssave.com/business/rebates-offers-services/energy-assessments-technical-assistance/small-business-assessments](https://www.masssave.com/business/rebates-offers-services/energy-assessments-technical-assistance/small-business-assessments)",
"sourceUrlsChecked": [
"[https://www.masssave.com/business/programs-and-services/building-energy-assessments/small-business-assessments](https://www.masssave.com/business/programs-and-services/building-energy-assessments/small-business-assessments)",
"[https://www.masssave.com/business/rebates-offers-services/energy-assessments-technical-assistance/small-business-assessments](https://www.masssave.com/business/rebates-offers-services/energy-assessments-technical-assistance/small-business-assessments)",
"[https://www.masssave.com/business/solutions-by-sector/landlord-renters](https://www.masssave.com/business/solutions-by-sector/landlord-renters)",
"[https://www.capelightcompact.org/program/business-energy-assessments/](https://www.capelightcompact.org/program/business-energy-assessments/)"
],
"evidenceText": "Mass Save’s small business assessment pages describe no-cost assessments and Sponsor-supported upgrades such as air sealing, weatherization, lighting, HVAC, refrigeration, water heating, controls, and custom measures.",
"reasoningNotes": "The original insulation, HVAC, and LED matches are supported for qualifying small businesses, but they depend on assessment findings and Sponsor approval rather than an unrestricted rebate catalog."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:4193",
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
"MidAmerican Energy natural gas service territory in Nebraska"
],
"notes": "Limited to Nebraska residential natural gas customers for the listed gas equipment rebates."
},
"eligibleApplicantTypes": [
"residential_natural_gas_customer"
],
"eligibleSectors": [
"residential"
],
"eligibleRetrofitCategories": [
"high_efficiency_furnace_retrofit",
"furnace_tune_up",
"gas_storage_water_heater",
"gas_tankless_water_heater"
],
"hardRequirements": [
"Applicant must be an eligible Nebraska residential customer of MidAmerican Energy for natural gas service.",
"Equipment must meet the current Nebraska residential rebate qualifications.",
"Application must include required manufacturer, model, serial, AHRI, receipt, or invoice documentation where applicable.",
"Applications must be submitted by the stated program deadline.",
"Rebates are limited to listed qualifying natural gas equipment."
],
"blockers": [
"Do not match boiler retrofits; boilers were not listed on the current Nebraska residential gas rebate page.",
"Do not match electric HVAC, heat pumps, or commercial equipment under this gas residential record.",
"Do not generalize to MidAmerican rebates in other states or sectors.",
"Incomplete documentation or nonqualifying equipment blocks rebate eligibility."
],
"programType": "Rebate Program",
"administrator": "MidAmerican Energy",
"applicationUrl": "[https://midamerican.ri-esuite.com](https://midamerican.ri-esuite.com)",
"websiteUrl": "[https://www.midamericanenergy.com/ne-residential-rebates](https://www.midamericanenergy.com/ne-residential-rebates)",
"sourceUrlsChecked": [
"[https://www.midamericanenergy.com/ne-residential-rebates](https://www.midamericanenergy.com/ne-residential-rebates)",
"[https://www.midamericanenergy.com/home-discounts-and-rebates](https://www.midamericanenergy.com/home-discounts-and-rebates)",
"[https://midamerican.ri-esuite.com](https://midamerican.ri-esuite.com)"
],
"evidenceText": "MidAmerican’s Nebraska residential gas page lists rebates for natural gas furnaces, furnace tune-ups, gas storage water heaters, and gas tankless water heaters; boilers are not listed.",
"reasoningNotes": "The furnace match is supported. The original boiler and generic HVAC matches should be removed or narrowed because the current Nebraska residential gas page supports only the listed gas equipment."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5753",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"MN"
],
"counties": [],
"cities": [],
"utilityTerritories": [],
"notes": "Statewide Minnesota C-PACE financing where the property is in the MinnPACE service area and local participation requirements are satisfied."
},
"eligibleApplicantTypes": [
"commercial_property_owner",
"industrial_property_owner",
"multifamily_property_owner",
"agricultural_property_owner",
"nonprofit_property_owner",
"faith_based_organization"
],
"eligibleSectors": [
"commercial",
"industrial",
"multifamily",
"agricultural",
"nonprofit",
"faith_based"
],
"eligibleRetrofitCategories": [
"high_efficiency_hvac_replacement",
"led_lighting_retrofit",
"insulation_upgrade",
"window_replacement",
"solar_photovoltaic",
"wind_energy_system",
"geothermal_energy_system",
"low_flow_fixture",
"irrigation_efficiency",
"water_treatment_efficiency",
"stormwater_resilience",
"flood_protection_resilience",
"backup_power_system",
"ev_charging_infrastructure"
],
"hardRequirements": [
"Applicant must be the current owner of an eligible property type.",
"Property must be in the MinnPACE service area.",
"Financing amount must not exceed the current property-value limit.",
"Property taxes, mortgage payments, and liens must be current and acceptable.",
"Licensed contractor bids and mortgage lender acknowledgement are required.",
"A qualifying energy, renewable, water, or resiliency study must demonstrate eligible savings or benefits.",
"Program is special-assessment financing, not a rebate."
],
"blockers": [
"Single-family residential properties are not supported by the checked eligibility pages.",
"Do not match as a rebate, grant, or utility incentive.",
"Projects outside the service area or lacking lender acknowledgement are blocked.",
"Battery storage is not separately verified except where a project qualifies as backup power or another approved resiliency measure.",
"Generic measures without a qualifying study should not match."
],
"programType": "PACE Financing",
"administrator": "MinnPACE / Saint Paul Port Authority",
"applicationUrl": "[https://minnpace.com/apply/apply-for-minnpace-loan/minnpace-application/](https://minnpace.com/apply/apply-for-minnpace-loan/minnpace-application/)",
"websiteUrl": "[https://minnpace.com/](https://minnpace.com/)",
"sourceUrlsChecked": [
"[https://minnpace.com/](https://minnpace.com/)",
"[https://minnpace.com/eligibility/](https://minnpace.com/eligibility/)",
"[https://minnpace.com/about-minnpace/](https://minnpace.com/about-minnpace/)",
"[https://minnpace.com/lending/](https://minnpace.com/lending/)",
"[https://minnpace.com/apply/apply-for-minnpace-loan/](https://minnpace.com/apply/apply-for-minnpace-loan/)",
"[https://minnpace.com/apply/apply-for-minnpace-loan/minnpace-application/](https://minnpace.com/apply/apply-for-minnpace-loan/minnpace-application/)",
"[https://minnpace.com/about-minnpace/service-area-and-project-examples/](https://minnpace.com/about-minnpace/service-area-and-project-examples/)",
"[https://sppa.com/portfinancing/minnpace](https://sppa.com/portfinancing/minnpace)"
],
"evidenceText": "MinnPACE describes C-PACE financing for commercial, industrial, multifamily, agricultural, nonprofit, and faith-based property owners, covering energy efficiency, renewables, water conservation, resiliency, and EV charging.",
"reasoningNotes": "HVAC and lighting are supported as financing-eligible improvements. Battery storage was not preserved as a standalone verified category; the supported resiliency category is backup power."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3916",
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
"Montana-Dakota Utilities Co."
],
"notes": "This repair is limited to Montana commercial gas and electric customers of Montana-Dakota Utilities."
},
"eligibleApplicantTypes": [
"commercial_customer",
"industrial_customer",
"nonresidential_customer"
],
"eligibleSectors": [
"commercial",
"industrial"
],
"eligibleRetrofitCategories": [
"high_efficiency_furnace_retrofit",
"led_lighting_retrofit",
"lighting_controls_retrofit",
"fluorescent_lighting_retrofit",
"custom_natural_gas_efficiency_project",
"custom_electric_efficiency_project"
],
"hardRequirements": [
"Customer must be an eligible Montana commercial customer of Montana-Dakota Utilities.",
"Furnace rebate applies to replacement of an existing natural gas furnace with qualifying high-efficiency equipment.",
"Fuel conversion and new construction are not eligible for the Montana furnace rebate.",
"Lighting incentives require an active Montana MDU electric account and current lighting application requirements.",
"Custom gas and electric projects require preapproval and savings or economics review.",
"Funding is limited and program terms may change."
],
"blockers": [
"Do not match North Dakota or Wyoming commercial customers; MDU states no commercial incentives there on the checked page.",
"South Dakota commercial gas incentives are separate from this Montana target record.",
"Do not match generic HVAC replacement beyond the verified high-efficiency natural gas furnace rebate or custom-approved projects.",
"Montana large electric customers are not eligible for the lighting program due to funding rules.",
"Work lacking required preapproval or documentation may be ineligible."
],
"programType": "Rebate Program",
"administrator": "Montana-Dakota Utilities Co.",
"applicationUrl": null,
"websiteUrl": "[https://www.montana-dakota.com/energy-efficiency/savings-for-your-business/](https://www.montana-dakota.com/energy-efficiency/savings-for-your-business/)",
"sourceUrlsChecked": [
"[https://www.montana-dakota.com/energy-efficiency/savings-for-your-business/](https://www.montana-dakota.com/energy-efficiency/savings-for-your-business/)",
"[https://www.montana-dakota.com/wp-content/uploads/PDFs/Conservation/commercial/2022/2022-01_MDU-MT_CommHeating.pdf](https://www.montana-dakota.com/wp-content/uploads/PDFs/Conservation/commercial/2022/2022-01_MDU-MT_CommHeating.pdf)",
"[https://www.montana-dakota.com/wp-content/uploads/PDFs/Conservation/commercial/2022/2022-01_MDU-MT_CommercialCustom.pdf](https://www.montana-dakota.com/wp-content/uploads/PDFs/Conservation/commercial/2022/2022-01_MDU-MT_CommercialCustom.pdf)",
"[https://www.montana-dakota.com/wp-content/uploads/PDFs/Conservation/commercial/2022/2022_MDU_MT_CommlLighting.pdf](https://www.montana-dakota.com/wp-content/uploads/PDFs/Conservation/commercial/2022/2022_MDU_MT_CommlLighting.pdf)",
"[https://www.montana-dakota.com/wp-content/uploads/PDFs/Conservation/commercial/2022/2022_MT_CommercialElectricPartnership.pdf](https://www.montana-dakota.com/wp-content/uploads/PDFs/Conservation/commercial/2022/2022_MT_CommercialElectricPartnership.pdf)"
],
"evidenceText": "Montana-Dakota’s business page lists Montana commercial natural gas furnace and custom gas incentives, plus Montana commercial electric lighting and partnership incentives with preapproval and funding limits.",
"reasoningNotes": "The furnace and lighting matches are supported. Generic high-efficiency HVAC should be narrowed to the listed natural gas furnace rebate or custom-approved business efficiency projects."
}
],
"continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:3918"
}
