
{
"schemaVersion": "opportunity_data_research_repairs.v1",
"researchedAt": "2026-07-01",
"source": "gpt_pro",
"repairs": [
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:4554",
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
"Piedmont Electric Cooperative"
],
"notes": "Existing homes served by Piedmont Electric Cooperative in North Carolina only."
},
"eligibleApplicantTypes": [
"piedmont_electric_member",
"residential_customer",
"homeowner"
],
"eligibleSectors": [
"residential"
],
"eligibleRetrofitCategories": [
"level_2_ev_charger_installation",
"ev_charging_240v_outlet",
"electric_water_heater",
"electric_well_pump",
"heat_pump_hvac_retrofit",
"high_efficiency_central_air_conditioning",
"insulation_upgrade",
"crawl_space_sealing",
"window_door_replacement",
"solar_pv_system",
"solar_water_heating_system",
"weather_stripping",
"standby_generator",
"energy_star_home_upgrade"
],
"hardRequirements": [
"Eligible Piedmont Electric Cooperative member must receive credit approval through ElecTel Cooperative Federal Credit Union.",
"Only existing homes served by Piedmont Electric qualify.",
"New construction does not qualify.",
"Loan is for purchase and installation of listed home upgrades, up to the current loan cap and term."
],
"blockers": [
"Do not match broad commercial or industrial pump and motor projects; the pump support is limited to electric well pumps for homes.",
"Do not present this as a rebate; it is loan financing at market interest rates.",
"Do not match new construction."
],
"programType": "Loan financing program",
"administrator": "Piedmont Electric Cooperative",
"applicationUrl": null,
"websiteUrl": "[https://pemc.coop/smart_energy/loan-program/](https://pemc.coop/smart_energy/loan-program/)",
"sourceUrlsChecked": [
"[https://pemc.coop/smart_energy/loan-program/](https://pemc.coop/smart_energy/loan-program/)"
],
"evidenceText": "Official program page lists eligible home upgrade loans for existing Piedmont-served homes, including EV charging, electric water heaters, electric well pumps, central A/C and heat pumps, insulation, windows, doors, solar, and weather stripping.",
"reasoningNotes": "Input targets came from the uploaded batch file . The original efficient_pump_replacement match should be narrowed to electric well pumps."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22067",
"confidence": "medium",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"CA"
],
"counties": [],
"cities": [],
"utilityTerritories": [
"Plumas-Sierra Rural Electric Cooperative"
],
"notes": "Program is limited to Plumas-Sierra Rural Electric Cooperative commercial and irrigation accounts in its California service territory."
},
"eligibleApplicantTypes": [
"commercial_customer",
"irrigation_customer",
"agricultural_customer"
],
"eligibleSectors": [
"commercial",
"agricultural",
"irrigation"
],
"eligibleRetrofitCategories": [
"commercial_heat_pump_hvac",
"high_efficiency_commercial_hvac",
"heat_pump_water_heater",
"led_lighting_retrofit",
"commercial_lighting_retrofit",
"commercial_kitchen_foodservice_equipment",
"custom_energy_efficiency_project"
],
"hardRequirements": [
"Applicant must be a Plumas-Sierra Rural Electric Cooperative commercial or irrigation customer.",
"Equipment must be in an eligible commercial or irrigation rebate category and meet the applicable rebate form requirements.",
"Detailed incentive amounts and documentation requirements must be checked on the current rebate form before approval."
],
"blockers": [
"Residential heat pump water heater and other residential rebate pages are separate and should not match this commercial and irrigation opportunity.",
"Do not infer broad water conservation or irrigation pump replacement unless the current PSREC commercial or irrigation form supports it.",
"Official pages returned 403 in the browser, so measure details should be rechecked before final payment matching."
],
"programType": "Commercial and irrigation rebate program",
"administrator": "Plumas-Sierra Rural Electric Cooperative",
"applicationUrl": null,
"websiteUrl": "[https://www.psrec.coop/energy-solutions/rebates/](https://www.psrec.coop/energy-solutions/rebates/)",
"sourceUrlsChecked": [
"[https://www.psrec.coop/energy-solutions/rebates/](https://www.psrec.coop/energy-solutions/rebates/)",
"[https://www.psrec.coop/energy-solutions/rebates/commercial-heating-cooling-rebates/](https://www.psrec.coop/energy-solutions/rebates/commercial-heating-cooling-rebates/)",
"[https://www.psrec.coop/energy-solutions/rebates/commercial-heat-pump-water-heater-rebate/](https://www.psrec.coop/energy-solutions/rebates/commercial-heat-pump-water-heater-rebate/)",
"[https://www.psrec.coop/energy-solutions/rebates/commercial-lighting-rebate/](https://www.psrec.coop/energy-solutions/rebates/commercial-lighting-rebate/)",
"[https://www.psrec.coop/energy-solutions/rebates/commercial-kitchen-food-service-equipment-rebate/](https://www.psrec.coop/energy-solutions/rebates/commercial-kitchen-food-service-equipment-rebate/)",
"[https://www.psrec.coop/energy-solutions/rebates/commercial-custom-project-rebate/](https://www.psrec.coop/energy-solutions/rebates/commercial-custom-project-rebate/)"
],
"evidenceText": "Official PSREC search snippets identify commercial lighting, custom projects, commercial HVAC, commercial heat pump water heater, and commercial kitchen or food-service equipment rebate pages.",
"reasoningNotes": "Current official PSREC pages were present in search results but returned 403 when opened. Categories are therefore kept only where official snippets identified the current rebate page."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3853",
"confidence": "high",
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
"notes": "Limited to eligible PPL Electric Utilities business customer facilities in Pennsylvania."
},
"eligibleApplicantTypes": [
"small_business_customer",
"large_business_customer",
"commercial_customer",
"industrial_customer",
"agricultural_customer",
"institutional_customer"
],
"eligibleSectors": [
"commercial",
"industrial",
"agricultural",
"institutional",
"nonresidential"
],
"eligibleRetrofitCategories": [
"combined_heat_and_power_system",
"solar_pv_system",
"battery_storage_system",
"fuel_cell_system",
"led_lighting_retrofit",
"exterior_site_lighting_retrofit",
"lighting_controls",
"high_efficiency_hvac_replacement",
"hvac_tune_up",
"smart_thermostat_zoning_retrofit",
"commercial_kitchen_foodservice_equipment",
"high_efficiency_refrigeration_equipment",
"motor_pump_vfd_retrofit",
"compressed_air_system_efficiency",
"domestic_hot_water_efficiency"
],
"hardRequirements": [
"Applicant must be a PPL Electric business customer with an eligible business facility.",
"Projects must use the applicable instant, direct discount, prescriptive, custom, or DER incentive pathway.",
"Applications, savings calculations, and preapproval may be required before purchase or installation depending on the measure."
],
"blockers": [
"This is a business program; residential appliances and home weatherization belong to separate PPL residential offerings.",
"CHP is a distributed energy resource or efficiency measure and should not be parented under solar-only categories.",
"Solar and battery measures are supported only within PPL business DER incentive rules, not as a generic residential renewable rebate."
],
"programType": "Business energy efficiency rebate and incentive program",
"administrator": "PPL Electric Utilities",
"applicationUrl": "[https://cr101.my.salesforce-sites.com/](https://cr101.my.salesforce-sites.com/)",
"websiteUrl": "[https://www.pplelectricbusinesssavings.com/ppl-business/incentives-overview/](https://www.pplelectricbusinesssavings.com/ppl-business/incentives-overview/)",
"sourceUrlsChecked": [
"[https://www.pplelectricbusinesssavings.com/ppl-business/incentives-overview/](https://www.pplelectricbusinesssavings.com/ppl-business/incentives-overview/)",
"[https://www.pplelectricbusinesssavings.com/ppl-business/incentives-overview/heating-cooling-smart-controls/](https://www.pplelectricbusinesssavings.com/ppl-business/incentives-overview/heating-cooling-smart-controls/)",
"[https://www.pplelectricbusinesssavings.com/ppl-business/incentives-overview/lighting/](https://www.pplelectricbusinesssavings.com/ppl-business/incentives-overview/lighting/)",
"[https://www.pplelectricbusinesssavings.com/ppl-business/incentives-overview/distributed-energy-resources/](https://www.pplelectricbusinesssavings.com/ppl-business/incentives-overview/distributed-energy-resources/)",
"[https://www.pplelectricbusinesssavings.com/ppl-business/incentives-overview/prescriptive-incentives/](https://www.pplelectricbusinesssavings.com/ppl-business/incentives-overview/prescriptive-incentives/)"
],
"evidenceText": "PPL’s business incentives page lists solar and CHP, smart thermostats, HVAC tune-ups, prescriptive and custom projects, lighting, agriculture, DER, HVAC, kitchen and refrigeration, motors and pumps, and compressed air.",
"reasoningNotes": "The original matches are supported, but CHP should be classified as CHP or DER, not solar. PPL offers a broad nonresidential efficiency portfolio."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:154",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"MT"
],
"counties": [],
"cities": [],
"utilityTerritories": [],
"notes": "Statewide Montana property tax incentive for qualifying alternative energy systems."
},
"eligibleApplicantTypes": [
"property_owner",
"residential_property_owner",
"commercial_property_owner",
"multifamily_property_owner"
],
"eligibleSectors": [
"residential",
"commercial",
"multifamily",
"nonresidential"
],
"eligibleRetrofitCategories": [
"solar_pv_system",
"wind_energy_system",
"geothermal_energy_system",
"low_emission_wood_biomass_combustion_device",
"biomass_energy_system",
"solar_water_heating_system",
"alternative_energy_generation_system"
],
"hardRequirements": [
"Applicant must file Montana Department of Revenue Form AB-14 for the tax incentive assessment.",
"System must meet Montana Code Annotated 15-6-224 and implementing rule requirements.",
"Eligible value is exempt for 10 years after installation, subject to statutory dollar caps.",
"The system or component must be unique to energy generation or use recognized nonfossil energy generation or qualifying low-emission wood or biomass combustion."
],
"blockers": [
"Do not match generic high-efficiency HVAC replacement.",
"Ground-source heat pump matching should be limited to geothermal machinery or systems that qualify under the alternative energy property rules, not ordinary HVAC efficiency replacement.",
"Do not match biomass unless it is a qualifying low-emission wood or biomass combustion device or energy system under Montana law."
],
"programType": "Property tax exemption",
"administrator": "Montana Department of Revenue",
"applicationUrl": "[https://mtrevenue.gov/wp-content/uploads/mdocs/form_ab-14.pdf](https://mtrevenue.gov/wp-content/uploads/mdocs/form_ab-14.pdf)",
"websiteUrl": "[https://mtrevenue.gov/publications/application-for-tax-incentive-assessment-of-energy-generating-property-form-ab-14/](https://mtrevenue.gov/publications/application-for-tax-incentive-assessment-of-energy-generating-property-form-ab-14/)",
"sourceUrlsChecked": [
"[https://mtrevenue.gov/publications/application-for-tax-incentive-assessment-of-energy-generating-property-form-ab-14/](https://mtrevenue.gov/publications/application-for-tax-incentive-assessment-of-energy-generating-property-form-ab-14/)",
"[https://mtrevenue.gov/wp-content/uploads/mdocs/form_ab-14.pdf](https://mtrevenue.gov/wp-content/uploads/mdocs/form_ab-14.pdf)",
"[https://leg.mt.gov/bills/mca/title_0150/chapter_0060/part_0020/section_0240/0150-0060-0020-0240.html](https://leg.mt.gov/bills/mca/title_0150/chapter_0060/part_0020/section_0240/0150-0060-0020-0240.html)",
"[https://rules.mt.gov/gateway/ruleno.asp?RN=42.19.1104](https://rules.mt.gov/gateway/ruleno.asp?RN=42.19.1104)"
],
"evidenceText": "Montana’s AB-14 materials and statute provide a 10-year property tax exemption for qualifying recognized nonfossil energy generation and low-emission wood or biomass combustion equipment.",
"reasoningNotes": "The source supports renewable and alternative energy property, not a broad HVAC rebate. Solar thermal and qualifying biomass are supported; generic high-efficiency HVAC is not."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5152",
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
"Ameren Illinois",
"ComEd",
"Nicor Gas",
"North Shore Gas",
"Peoples Gas"
],
"notes": "Residential on-bill loans are limited to customers of participating Illinois utilities and eligible one-to-four-unit homes, condos, and mobile homes."
},
"eligibleApplicantTypes": [
"residential_customer",
"homeowner",
"tenant_with_owner_permission"
],
"eligibleSectors": [
"residential"
],
"eligibleRetrofitCategories": [
"high_efficiency_furnace_retrofit",
"high_efficiency_boiler_retrofit",
"central_air_conditioner_replacement",
"air_source_heat_pump",
"ductless_mini_split_heat_pump",
"ground_source_geothermal_heat_pump",
"air_sealing_weatherization",
"attic_insulation",
"wall_insulation",
"crawl_space_insulation",
"rim_joist_insulation",
"smart_thermostat",
"ecm_blower_motor",
"bathroom_exhaust_fan"
],
"hardRequirements": [
"Applicant must be an eligible residential customer of a participating utility.",
"Property must be an eligible single-family, one-to-four-unit residential building, condo, or mobile home.",
"Loan amount, interest rate, and repayment are governed by the IL Energy Loan on-bill financing rules.",
"Measures must be listed as eligible for the applicant’s participating utility."
],
"blockers": [
"Battery storage is not an eligible measure in the current IL Energy Loan materials.",
"Do not match commercial or industrial measures.",
"Do not present as a rebate; this is residential loan financing repaid on the utility bill.",
"Measure eligibility varies by utility and should not be generalized across all participating utilities."
],
"programType": "Residential on-bill loan financing program",
"administrator": "Renew Financial",
"applicationUrl": "[https://www.ilenergyloan.com/apply](https://www.ilenergyloan.com/apply)",
"websiteUrl": "[https://www.ilenergyloan.com/](https://www.ilenergyloan.com/)",
"sourceUrlsChecked": [
"[https://www.ilenergyloan.com/](https://www.ilenergyloan.com/)",
"[https://www.ilenergyloan.com/for-homeowners](https://www.ilenergyloan.com/for-homeowners)",
"[https://www.ilenergyloan.com/eligible-improvements](https://www.ilenergyloan.com/eligible-improvements)",
"[https://www.ilenergyloan.com/program-overview](https://www.ilenergyloan.com/program-overview)"
],
"evidenceText": "IL Energy Loan materials list participating Illinois utilities, residential eligibility, on-bill loan terms, and utility-specific eligible improvements such as furnaces, boilers, central A/C, heat pumps, insulation, air sealing, thermostats, and geothermal.",
"reasoningNotes": "Original furnace, HVAC, and insulation matches are supported. The battery storage match is a false positive and should be removed."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3021",
"confidence": "medium",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"RI"
],
"counties": [],
"cities": [],
"utilityTerritories": [
"Rhode Island Energy natural gas service territory"
],
"notes": "Limited to Rhode Island Energy commercial natural gas customers in Rhode Island."
},
"eligibleApplicantTypes": [
"commercial_gas_customer",
"business_customer",
"institutional_customer",
"multifamily_property_owner"
],
"eligibleSectors": [
"commercial",
"institutional",
"multifamily",
"nonresidential"
],
"eligibleRetrofitCategories": [
"high_efficiency_boiler_retrofit",
"high_efficiency_furnace_retrofit",
"natural_gas_heating_equipment",
"boiler_controls",
"heating_controls",
"programmable_thermostat",
"gas_water_heater"
],
"hardRequirements": [
"Applicant must be a Rhode Island Energy commercial natural gas customer.",
"Equipment must meet the efficiency and documentation requirements of the applicable commercial gas rebate form.",
"Qualifying installations may require licensed contractor installation, invoices, and customer account documentation."
],
"blockers": [
"Do not match residential gas heating rebates to this commercial opportunity.",
"Do not match electric heat pumps or electric demand response programs; those are separate offerings.",
"Smart thermostat matching should be limited to eligible commercial heating controls or thermostats supported by the current gas program."
],
"programType": "Commercial natural gas energy efficiency rebate program",
"administrator": "Rhode Island Energy",
"applicationUrl": null,
"websiteUrl": "[https://www.rienergy.com/site/ways-to-save/save-money-with-rebates-and-incentives/natural-gas-heating](https://www.rienergy.com/site/ways-to-save/save-money-with-rebates-and-incentives/natural-gas-heating)",
"sourceUrlsChecked": [
"[https://energy.ri.gov/energy-incentives/commercial-incentives](https://energy.ri.gov/energy-incentives/commercial-incentives)",
"[https://www.rienergy.com/site/ways-to-save/save-money-with-rebates-and-incentives/natural-gas-heating](https://www.rienergy.com/site/ways-to-save/save-money-with-rebates-and-incentives/natural-gas-heating)",
"[https://www.rienergy.com/RI-Business/Energy-Saving-Programs/Commercial-Gas](https://www.rienergy.com/RI-Business/Energy-Saving-Programs/Commercial-Gas)"
],
"evidenceText": "Rhode Island Energy and state energy incentive materials identify business natural gas incentives for furnaces, water heaters, boilers, and heating controls.",
"reasoningNotes": "Current public pages were difficult to access directly, so confidence is medium. Boiler, furnace, gas heating controls, and related commercial gas measures are supported."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3024",
"confidence": "medium",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"RI"
],
"counties": [],
"cities": [],
"utilityTerritories": [
"Rhode Island Energy natural gas service territory"
],
"notes": "Limited to eligible Rhode Island Energy residential natural gas customers in Rhode Island."
},
"eligibleApplicantTypes": [
"residential_gas_customer",
"homeowner",
"landlord",
"tenant_with_owner_permission"
],
"eligibleSectors": [
"residential"
],
"eligibleRetrofitCategories": [
"high_efficiency_boiler_retrofit",
"high_efficiency_furnace_retrofit",
"natural_gas_water_heater",
"combination_boiler_water_heater",
"smart_thermostat",
"programmable_thermostat"
],
"hardRequirements": [
"Applicant must be an eligible Rhode Island Energy residential natural gas customer.",
"Equipment must meet current efficiency, installation, and documentation requirements.",
"Rebate applications generally require account information, proof of purchase, and contractor or installation documentation."
],
"blockers": [
"Do not match commercial gas equipment to this residential opportunity.",
"Do not match generic high-efficiency HVAC beyond eligible natural gas boilers and furnaces.",
"Do not match electric heat pumps or electric appliance rebates to this gas heating program."
],
"programType": "Residential natural gas heating rebate program",
"administrator": "Rhode Island Energy",
"applicationUrl": null,
"websiteUrl": "[https://www.rienergy.com/site/ways-to-save/save-money-with-rebates-and-incentives/natural-gas-heating](https://www.rienergy.com/site/ways-to-save/save-money-with-rebates-and-incentives/natural-gas-heating)",
"sourceUrlsChecked": [
"[https://energy.ri.gov/energy-incentives/residential-incentives](https://energy.ri.gov/energy-incentives/residential-incentives)",
"[https://www.rienergy.com/site/ways-to-save/save-money-with-rebates-and-incentives/natural-gas-heating](https://www.rienergy.com/site/ways-to-save/save-money-with-rebates-and-incentives/natural-gas-heating)",
"[https://www.rienergy.com/media/pdfs/billing-payments/rebate-forms/gas-heat-ri.pdf](https://www.rienergy.com/media/pdfs/billing-payments/rebate-forms/gas-heat-ri.pdf)"
],
"evidenceText": "State and Rhode Island Energy materials identify residential natural gas rebates for boilers, furnaces, water heaters, combination boiler-water heaters, and smart or programmable thermostats.",
"reasoningNotes": "The matched boiler, furnace, and thermostat categories are supported when narrowed to residential natural gas equipment. Generic HVAC should not be broader than eligible gas heating."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2664",
"confidence": "medium",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"IN"
],
"counties": [],
"cities": [],
"utilityTerritories": [
"RushShelby Energy"
],
"notes": "Limited to RushShelby Energy residential members in Indiana."
},
"eligibleApplicantTypes": [
"residential_member",
"homeowner",
"rushshelby_energy_member"
],
"eligibleSectors": [
"residential"
],
"eligibleRetrofitCategories": [
"ground_source_geothermal_heat_pump",
"air_source_heat_pump",
"ductless_mini_split_heat_pump",
"heat_pump_water_heater",
"hvac_tune_up",
"electric_water_heater"
],
"hardRequirements": [
"Applicant must be a RushShelby Energy residential member.",
"Equipment must meet the applicable rebate form requirements.",
"Member must submit the current rebate application and required purchase or installation documentation."
],
"blockers": [
"Do not infer commercial HVAC or commercial water heating from this residential rebate program.",
"Official pages returned 403 in the browser, so final incentive levels and documentation requirements must be verified from the current form.",
"Do not broaden ductless or mini-split rebates into unrelated generic HVAC measures not listed by the current program."
],
"programType": "Residential energy efficiency rebate program",
"administrator": "RushShelby Energy",
"applicationUrl": null,
"websiteUrl": "[https://www.rse.coop/energy-savings/rebates/residential/](https://www.rse.coop/energy-savings/rebates/residential/)",
"sourceUrlsChecked": [
"[https://www.rse.coop/energy-savings/rebates/residential/](https://www.rse.coop/energy-savings/rebates/residential/)",
"[https://www.rse.coop/energy-savings/rebates/residential/residential-equipment-rebate-form/](https://www.rse.coop/energy-savings/rebates/residential/residential-equipment-rebate-form/)"
],
"evidenceText": "Official RushShelby search snippets identify residential rebates for geothermal, air-to-air and mini-split heat pumps, heat pump water heaters, HVAC tune-ups, and electric water heaters.",
"reasoningNotes": "The main heat pump and heat pump water heater matches are supported, but current pages were not fully readable due 403 access restrictions."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:4919",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"TN"
],
"counties": [],
"cities": [],
"utilityTerritories": [],
"notes": "Statewide Tennessee sales and use tax credit for certified green energy production or storage facilities."
},
"eligibleApplicantTypes": [
"certified_green_energy_production_facility",
"certified_green_energy_storage_facility",
"business_taxpayer",
"manufacturer",
"electricity_producer"
],
"eligibleSectors": [
"commercial",
"industrial",
"utility",
"nonresidential"
],
"eligibleRetrofitCategories": [
"solar_pv_system",
"wind_energy_system",
"geothermal_electric_generation",
"hydrogen_energy_system",
"nuclear_energy_facility",
"combined_heat_and_power_system",
"clean_energy_storage_system"
],
"hardRequirements": [
"Facility must be certified as a green energy production or storage facility under Tennessee requirements.",
"Clean energy production must use qualifying clean energy technologies such as geothermal, hydrogen, solar, wind, or nuclear.",
"Storage systems must store electricity produced entirely from clean energy technologies.",
"Applications and certification forms must be submitted through the Tennessee Department of Environment and Conservation process."
],
"blockers": [
"Do not match biomass; current Tennessee clean energy technology materials do not list biomass as an eligible clean energy technology.",
"Do not match ordinary ground-source heat pump HVAC unless it is part of qualifying geothermal electricity production or certified facility equipment.",
"Do not match generic battery storage unless it stores electricity produced entirely from qualifying clean energy technologies.",
"This is a sales and use tax credit certification program, not a utility rebate."
],
"programType": "Sales and use tax credit",
"administrator": "Tennessee Department of Environment and Conservation",
"applicationUrl": "[https://www.tn.gov/environment/sustainability/funding/green-energy.html](https://www.tn.gov/environment/sustainability/funding/green-energy.html)",
"websiteUrl": "[https://www.tn.gov/environment/sustainability/funding/green-energy.html](https://www.tn.gov/environment/sustainability/funding/green-energy.html)",
"sourceUrlsChecked": [
"[https://www.tn.gov/environment/sustainability/funding/green-energy.html](https://www.tn.gov/environment/sustainability/funding/green-energy.html)",
"[https://www.tn.gov/revenue/taxes/sales-and-use-tax/filing-and-paying-sales-and-use-tax/sales-and-use-tax-forms.html](https://www.tn.gov/revenue/taxes/sales-and-use-tax/filing-and-paying-sales-and-use-tax/sales-and-use-tax-forms.html)"
],
"evidenceText": "Tennessee green energy materials define qualifying clean energy technologies as geothermal, hydrogen, solar, wind, and nuclear, with certified storage limited to electricity from clean energy technologies.",
"reasoningNotes": "The biomass and generic geothermal HVAC matches are false positives. CHP remains supported only where the official CHP certification pathway and tax-credit criteria apply."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2306",
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
"Salt River Electric Cooperative"
],
"notes": "Limited to Salt River Electric Cooperative residential members and eligible homes in Kentucky."
},
"eligibleApplicantTypes": [
"residential_member",
"homeowner",
"salt_river_electric_member"
],
"eligibleSectors": [
"residential"
],
"eligibleRetrofitCategories": [
"heat_pump_hvac_retrofit",
"air_source_heat_pump",
"heat_pump_upgrade",
"smart_thermostat",
"insulation_upgrade",
"air_sealing_weatherization",
"window_door_replacement",
"attic_access_weatherization"
],
"hardRequirements": [
"Applicant must be a Salt River Electric residential member.",
"Heat pump retrofit or upgrade must meet program eligibility and AHRI documentation requirements.",
"Button Up weatherization projects require contacting the cooperative before improvements, qualifying home age and electric primary heat, receipts, and heat-loss calculation documentation.",
"Final eligibility is determined by the cooperative."
],
"blockers": [
"Do not match LED lighting; current Salt River rebate page did not list residential lighting rebates under this program.",
"Do not match geothermal unless a current Salt River rebate form separately verifies geothermal eligibility.",
"Do not match generic high-efficiency HVAC outside the listed heat pump retrofit or upgrade measures."
],
"programType": "Residential energy efficiency rebate program",
"administrator": "Salt River Electric Cooperative",
"applicationUrl": null,
"websiteUrl": "[https://www.srelectric.com/rebates/](https://www.srelectric.com/rebates/)",
"sourceUrlsChecked": [
"[https://www.srelectric.com/rebates/](https://www.srelectric.com/rebates/)",
"[https://www.srelectric.com/heat-pump-retrofit/](https://www.srelectric.com/heat-pump-retrofit/)",
"[https://www.srelectric.com/heat-pump-upgrades/](https://www.srelectric.com/heat-pump-upgrades/)",
"[https://www.srelectric.com/button-up/](https://www.srelectric.com/button-up/)",
"[https://www.srelectric.com/bring-your-own-thermostat/](https://www.srelectric.com/bring-your-own-thermostat/)"
],
"evidenceText": "Salt River’s rebate pages list heat pump retrofit, heat pump upgrades, Button Up weatherization, and Bring Your Own Thermostat incentives for members.",
"reasoningNotes": "The current official pages support heat pumps, thermostat, and weatherization. Geothermal and LED lighting should be removed unless a newer official form separately confirms them."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22809",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"MA"
],
"counties": [],
"cities": [
"Shrewsbury"
],
"utilityTerritories": [
"Shrewsbury Electric and Cable Operations"
],
"notes": "Limited to eligible SELCO commercial, municipal, and industrial general service customers in Shrewsbury, Massachusetts."
},
"eligibleApplicantTypes": [
"commercial_customer",
"municipal_customer",
"industrial_customer",
"developer",
"selco_general_service_customer"
],
"eligibleSectors": [
"commercial",
"industrial",
"municipal",
"nonresidential"
],
"eligibleRetrofitCategories": [
"level_1_ev_charger_installation",
"level_2_ev_charger_installation",
"dc_fast_charger_installation",
"commercial_heat_pump_hvac"
],
"hardRequirements": [
"Applicant must be a SELCO commercial, municipal, or industrial general service customer, or an eligible developer.",
"Customer account must be active and in good standing with no late payments within the relevant eligibility period.",
"Level 2 and DC fast chargers must meet demand response, networking, connector, and public listing requirements where applicable.",
"Commercial heat pump projects require preapproval, qualifying equipment, and documentation such as AHRI records."
],
"blockers": [
"Do not match residential EV charger or residential heat pump incentives to this commercial program.",
"Do not match broad high-efficiency HVAC except for SELCO’s qualifying commercial heat pump incentive.",
"Mass Save gas-customer restrictions may block certain heat pump claims where Eversource gas service applies."
],
"programType": "Commercial rebate and incentive program",
"administrator": "Shrewsbury Electric and Cable Operations",
"applicationUrl": null,
"websiteUrl": "[https://selco.shrewsburyma.gov/commercial-rebates-incentives/](https://selco.shrewsburyma.gov/commercial-rebates-incentives/)",
"sourceUrlsChecked": [
"[https://selco.shrewsburyma.gov/commercial-rebates-incentives/](https://selco.shrewsburyma.gov/commercial-rebates-incentives/)",
"[https://selco.shrewsburyma.gov/commercial-ev-charger-rebates/](https://selco.shrewsburyma.gov/commercial-ev-charger-rebates/)",
"[https://selco.shrewsburyma.gov/commercial-heat-pump-rebates/](https://selco.shrewsburyma.gov/commercial-heat-pump-rebates/)"
],
"evidenceText": "SELCO commercial pages list Level 1, Level 2, and DC fast charger rebates, plus commercial heat pump rebates for eligible commercial, municipal, industrial, and developer applicants.",
"reasoningNotes": "The EV charger matches are supported. High-efficiency HVAC should be narrowed to commercial heat pump installations that satisfy SELCO heat pump requirements."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:4266",
"confidence": "medium",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"MD"
],
"counties": [],
"cities": [],
"utilityTerritories": [
"Southern Maryland Electric Cooperative"
],
"notes": "Limited to eligible SMECO nonresidential customers in Southern Maryland."
},
"eligibleApplicantTypes": [
"commercial_customer",
"small_business_customer",
"institutional_customer",
"nonresidential_customer"
],
"eligibleSectors": [
"commercial",
"institutional",
"nonresidential"
],
"eligibleRetrofitCategories": [
"led_lighting_retrofit",
"lighting_controls",
"exterior_site_lighting_retrofit",
"high_efficiency_hvac_replacement",
"commercial_hvac_controls",
"commercial_kitchen_foodservice_equipment",
"high_efficiency_refrigeration_equipment",
"refrigeration_controls_retrofit"
],
"hardRequirements": [
"Applicant must be an eligible SMECO nonresidential customer.",
"Project must follow the applicable SMECO Business Solutions or Small Business Solutions pathway.",
"Prequalified contractors, preapproval, equipment eligibility, and customer rate or demand limits may apply depending on the pathway."
],
"blockers": [
"Do not match residential appliances or home weatherization.",
"Vending machine controls should not be matched unless the current SMECO business manual or application specifically lists them.",
"Official SMECO pages were partially inaccessible, so measure-level payment matching should verify the current application or program manual."
],
"programType": "Nonresidential energy efficiency rebate program",
"administrator": "Southern Maryland Electric Cooperative",
"applicationUrl": null,
"websiteUrl": "[https://www.smeco.coop/energy-efficiency/commercial-programs/business-solutions/](https://www.smeco.coop/energy-efficiency/commercial-programs/business-solutions/)",
"sourceUrlsChecked": [
"[https://www.smeco.coop/energy-efficiency/commercial-programs/business-solutions/](https://www.smeco.coop/energy-efficiency/commercial-programs/business-solutions/)",
"[https://www.smeco.coop/energy-efficiency/commercial-programs/small-business-solutions/](https://www.smeco.coop/energy-efficiency/commercial-programs/small-business-solutions/)",
"[https://www.smeco.coop/energy-efficiency/commercial-programs/](https://www.smeco.coop/energy-efficiency/commercial-programs/)"
],
"evidenceText": "SMECO business program snippets identify incentives for lighting, HVAC, kitchen equipment, refrigeration, and refrigeration retrofits for eligible business customers.",
"reasoningNotes": "Lighting, HVAC, refrigeration, and refrigeration controls are supported at a program level. Vending machine controls were not verified in current official materials and should be blocked."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:1461",
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
"Southern California Gas Company"
],
"notes": "Limited to eligible SoCalGas residential natural gas customers in California service territory."
},
"eligibleApplicantTypes": [
"residential_gas_customer",
"homeowner",
"tenant_with_owner_permission"
],
"eligibleSectors": [
"residential"
],
"eligibleRetrofitCategories": [
"high_efficiency_furnace_retrofit",
"natural_gas_tankless_water_heater",
"natural_gas_storage_water_heater",
"solar_water_heating_system",
"residential_natural_gas_clothes_dryer",
"residential_natural_gas_oven",
"natural_gas_fireplace_insert",
"natural_gas_pool_heater",
"natural_gas_patio_heater"
],
"hardRequirements": [
"Applicant must be an eligible SoCalGas residential customer.",
"Equipment must meet listed efficiency standards and installation requirements.",
"Furnaces require licensed contractor installation, permit compliance, and the listed AFUE threshold.",
"Solar thermal water heating must meet current program requirements, including qualifying system performance and related water heater requirements.",
"Rebates are available until the stated program deadline or until funds are exhausted."
],
"blockers": [
"Do not match commercial kitchen equipment; residential oven rebates are appliance-specific and not a commercial foodservice retrofit.",
"Do not match broad HVAC replacement beyond eligible residential natural gas furnace measures.",
"Do not match electric heat pumps or non-gas appliance rebates to this SoCalGas natural gas appliance program."
],
"programType": "Residential natural gas appliance rebate program",
"administrator": "Southern California Gas Company",
"applicationUrl": null,
"websiteUrl": "[https://www.socalgas.com/save-money-and-energy/rebates-and-incentives/natural-gas-appliance-rebates](https://www.socalgas.com/save-money-and-energy/rebates-and-incentives/natural-gas-appliance-rebates)",
"sourceUrlsChecked": [
"[https://www.socalgas.com/save-money-and-energy/rebates-and-incentives/natural-gas-appliance-rebates](https://www.socalgas.com/save-money-and-energy/rebates-and-incentives/natural-gas-appliance-rebates)",
"[https://www.socalgas.com/save-money-and-energy/rebates-and-incentives](https://www.socalgas.com/save-money-and-energy/rebates-and-incentives)"
],
"evidenceText": "SoCalGas residential rebate page lists natural gas appliance rebates including qualifying furnaces, water heaters, ovens, dryers, fireplace inserts, pool heaters, patio heaters, and solar thermal water heating.",
"reasoningNotes": "The furnace and solar water heating matches are supported. The oven match must be narrowed to residential natural gas ovens and blocked from commercial kitchen matching."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:1803",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"SC"
],
"counties": [],
"cities": [],
"utilityTerritories": [],
"notes": "Statewide South Carolina personal tax credit for qualifying solar, small hydropower, and geothermal energy property."
},
"eligibleApplicantTypes": [
"individual_taxpayer",
"personal_income_taxpayer",
"residential_property_owner"
],
"eligibleSectors": [
"residential",
"personal"
],
"eligibleRetrofitCategories": [
"solar_pv_system",
"solar_water_heating_system",
"small_hydropower_system",
"ground_source_geothermal_heat_pump",
"geothermal_water_heating",
"geothermal_space_heating_cooling",
"geothermal_heat_reclamation",
"energy_efficient_daylighting",
"energy_efficient_demand_response_within_eligible_system"
],
"hardRequirements": [
"Taxpayer must own and install a qualifying solar energy system, small hydropower system, or geothermal machinery and equipment.",
"Credit is claimed using the South Carolina Department of Revenue TC-38 process.",
"Credit is limited by the statutory percentage, annual dollar cap, tax liability limitation, and carryforward rules.",
"Leased solar systems are not eligible for the owner tax credit."
],
"blockers": [
"Do not match standalone automated demand response controls; demand response is supported only when part of qualifying geothermal machinery and equipment language.",
"Do not match generic high-efficiency HVAC replacement.",
"Do not match commercial or corporate tax-credit cases to this personal tax credit record."
],
"programType": "Personal tax credit",
"administrator": "South Carolina Department of Revenue",
"applicationUrl": "[https://dor.sc.gov/forms-site/Forms/TC38.pdf](https://dor.sc.gov/forms-site/Forms/TC38.pdf)",
"websiteUrl": "[https://dor.sc.gov/taxcredits](https://dor.sc.gov/taxcredits)",
"sourceUrlsChecked": [
"[https://dor.sc.gov/taxcredits](https://dor.sc.gov/taxcredits)",
"[https://dor.sc.gov/forms-site/Forms/TC38.pdf](https://dor.sc.gov/forms-site/Forms/TC38.pdf)",
"[https://solar.sc.gov/financing-system/tax-credits-incentives-and-net-metering](https://solar.sc.gov/financing-system/tax-credits-incentives-and-net-metering)",
"[https://dor.sc.gov/resources-site/lawandpolicy/Advisory%20Opinions/RR14-12.pdf](https://dor.sc.gov/resources-site/lawandpolicy/Advisory%20Opinions/RR14-12.pdf)"
],
"evidenceText": "South Carolina tax credit materials cover qualifying solar, small hydropower, and geothermal machinery used for water heating, space conditioning, daylighting, heat reclamation, demand response, or energy generation.",
"reasoningNotes": "Geothermal and solar thermal matches are supported. Demand response must be constrained to eligible geothermal machinery language, not treated as a separate ADR incentive."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2445",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"SD"
],
"counties": [],
"cities": [],
"utilityTerritories": [
"Southeastern Electric Cooperative"
],
"notes": "Limited to Southeastern Electric Cooperative members in South Dakota."
},
"eligibleApplicantTypes": [
"cooperative_member",
"residential_member",
"business_member",
"homeowner"
],
"eligibleSectors": [
"residential",
"commercial",
"agricultural",
"nonresidential"
],
"eligibleRetrofitCategories": [
"ground_source_geothermal_heat_pump",
"air_source_heat_pump",
"electric_heating_system",
"duct_system_installation",
"electrical_wiring_for_heating_cooling",
"insulation_upgrade",
"air_sealing_weatherization",
"window_door_replacement"
],
"hardRequirements": [
"Applicant must be a Southeastern Electric Cooperative member.",
"Loans are subject to credit check and board approval.",
"No fossil-fueled equipment is eligible.",
"Mortgage collateral is required and funds are not provided until equipment is installed and operating.",
"Payments are made by automatic bank withdrawal with the monthly electric bill.",
"Loan amount, term, and rate depend on the equipment or conservation category."
],
"blockers": [
"Do not present this as a rebate; it is loan financing.",
"Do not match fossil-fuel heating equipment.",
"Do not match generic high-efficiency HVAC unless it is qualifying electric heating or cooling equipment listed by the loan program.",
"Weatherization financing is limited to qualifying home improvements such as doors, windows, insulation, and related conservation work."
],
"programType": "Electric equipment and conservation loan program",
"administrator": "Southeastern Electric Cooperative",
"applicationUrl": null,
"websiteUrl": "[https://southeasternelectric.com/member-rebates-incentives/](https://southeasternelectric.com/member-rebates-incentives/)",
"sourceUrlsChecked": [
"[https://southeasternelectric.com/member-rebates-incentives/](https://southeasternelectric.com/member-rebates-incentives/)"
],
"evidenceText": "Southeastern Electric’s loan section offers low-interest loans for members installing efficient electric heating and cooling equipment, geothermal or air-to-air heat pumps, ducts, wiring, doors, windows, insulation, and conservation improvements.",
"reasoningNotes": "Geothermal, insulation, weatherization, and electric HVAC financing are supported. The record should remain a loan program rather than a rebate-style opportunity."
}
],
"continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:3573"
}
