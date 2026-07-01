{
"schemaVersion": "opportunity_data_research_repairs.v1",
"researchedAt": "2026-07-01",
"source": "gpt_pro",
"repairs": [
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3319",
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
"Four County EMC"
],
"notes": "Limited to Four County EMC residential members in North Carolina service territory."
},
"eligibleApplicantTypes": [
"residential_customer",
"utility_member",
"homeowner"
],
"eligibleSectors": [
"residential"
],
"eligibleRetrofitCategories": [
"heat_pump_hvac_retrofit",
"insulation_upgrade",
"ductwork_repair"
],
"hardRequirements": [
"Applicant must be a Four County EMC residential member.",
"Measure must be an approved residential energy-efficiency improvement.",
"Loan approval and program underwriting are required before financing.",
"The program is financing support, not a rebate."
],
"blockers": [
"Do not match nonresidential projects.",
"Do not treat this loan as an instant rebate or grant.",
"Do not broaden HVAC eligibility beyond approved heat pump or utility-approved efficiency loan measures.",
"Current official page could not be read directly because it returned access errors; categories are limited to official snippet and DSIRE-supported measures."
],
"programType": "loan",
"administrator": "Four County EMC",
"applicationUrl": null,
"websiteUrl": "[https://www.fourcty.org/energy-efficiency/energy-efficiency-loans/](https://www.fourcty.org/energy-efficiency/energy-efficiency-loans/)",
"sourceUrlsChecked": [
"[https://www.fourcty.org/energy-efficiency/energy-efficiency-loans/](https://www.fourcty.org/energy-efficiency/energy-efficiency-loans/)",
"[https://programs.dsireusa.org/system/program/detail/3319/four-county-emc-residential-energy-efficiency-loan-program](https://programs.dsireusa.org/system/program/detail/3319/four-county-emc-residential-energy-efficiency-loan-program)"
],
"evidenceText": "Official page access was limited, but official search text identifies comfort loans for heat pumps, insulation, and ductwork repair for Four County EMC residential members.",
"reasoningNotes": "The current match to insulation is supported, and HVAC should be narrowed to heat pump measures rather than general high-efficiency HVAC replacement."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22308",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"GA"
],
"counties": [],
"cities": [],
"utilityTerritories": [
"Georgia Power"
],
"notes": "Limited to Georgia Power residential electric customers."
},
"eligibleApplicantTypes": [
"residential_customer",
"utility_customer",
"homeowner",
"tenant_with_owner_permission"
],
"eligibleSectors": [
"residential"
],
"eligibleRetrofitCategories": [
"level_2_ev_charger_installation"
],
"hardRequirements": [
"Applicant must be a Georgia Power residential customer.",
"Charger must be a wall-mounted or pedestal Level 2 charger, not a mobile connector.",
"Installation must use a dedicated 208 or 240 volt circuit.",
"Eligible property must be a single-family home or townhouse.",
"Tenant applicants need property-owner authorization.",
"Rebate is subject to program dates, funding availability, and application terms."
],
"blockers": [
"Do not match generic EV charging if the charger is not Level 2.",
"Do not match mobile charging cords or connector-only equipment.",
"Third-party vendors and EV charging businesses are not eligible applicants.",
"Do not match commercial or multifamily common-area charging to this residential program."
],
"programType": "rebate",
"administrator": "Georgia Power",
"applicationUrl": "[https://etrebate.customerapplication.com/](https://etrebate.customerapplication.com/)",
"websiteUrl": "[https://www.georgiapower.com/residential/solutions/electric-vehicles/ev-rebates.html](https://www.georgiapower.com/residential/solutions/electric-vehicles/ev-rebates.html)",
"sourceUrlsChecked": [
"[https://www.georgiapower.com/residential/solutions/electric-vehicles/ev-rebates.html](https://www.georgiapower.com/residential/solutions/electric-vehicles/ev-rebates.html)",
"[https://www.georgiapower.com/content/dam/georgia-power/pdfs/programs/ev/terms-conditions-georgia-power-residential-ev-charger-rebate.pdf](https://www.georgiapower.com/content/dam/georgia-power/pdfs/programs/ev/terms-conditions-georgia-power-residential-ev-charger-rebate.pdf)"
],
"evidenceText": "Georgia Power states that residential customers can receive a rebate for purchasing and installing a qualifying Level 2 charger at a single-family home or townhouse.",
"reasoningNotes": "The broad EV charger category should be narrowed to Level 2 residential charger installation only."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5216",
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
"notes": "Statewide Tennessee tax assessment treatment for certified green energy production facilities."
},
"eligibleApplicantTypes": [
"property_owner",
"business",
"public_entity",
"utility",
"clean_energy_project_owner"
],
"eligibleSectors": [
"commercial",
"industrial",
"government",
"utility",
"agricultural"
],
"eligibleRetrofitCategories": [
"solar_electric_generation",
"wind_electric_generation",
"geothermal_electric_generation",
"hydrogen_electric_generation",
"clean_energy_electricity_storage"
],
"hardRequirements": [
"Facility must qualify as a certified green energy production facility.",
"Project must produce or store electricity using qualifying clean energy technology.",
"Storage must store electricity produced entirely from qualifying clean energy technology.",
"Certification through Tennessee environmental authorities is required."
],
"blockers": [
"Do not match ground-source geothermal heat pumps used only for building space conditioning.",
"Do not match general high-efficiency HVAC replacement.",
"Do not match standalone battery storage unless it stores electricity produced entirely from qualifying clean energy technology.",
"Do not treat geothermal wording as support for residential geothermal HVAC."
],
"programType": "property_tax_assessment",
"administrator": "Tennessee Department of Environment and Conservation; Tennessee Comptroller of the Treasury",
"applicationUrl": null,
"websiteUrl": "[https://www.tn.gov/environment/sustainability/funding/green-energy.html](https://www.tn.gov/environment/sustainability/funding/green-energy.html)",
"sourceUrlsChecked": [
"[https://www.tn.gov/environment/sustainability/funding/green-energy.html](https://www.tn.gov/environment/sustainability/funding/green-energy.html)",
"[https://codes.findlaw.com/tn/title-67-taxes-and-licenses/tn-code-sect-67-5-601/](https://codes.findlaw.com/tn/title-67-taxes-and-licenses/tn-code-sect-67-5-601/)"
],
"evidenceText": "Tennessee guidance covers certified facilities that produce or store electricity using clean energy technology, including geothermal, hydrogen, solar, and wind sources.",
"reasoningNotes": "The original geothermal HVAC and generic battery matches are false positives unless the project is electricity generation or qualifying clean-energy-linked storage."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22299",
"confidence": "medium",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"CO"
],
"counties": [],
"cities": [],
"utilityTerritories": [
"Gunnison County Electric Association"
],
"notes": "Limited to Gunnison County Electric Association member accounts."
},
"eligibleApplicantTypes": [
"utility_member",
"residential_customer",
"business_customer"
],
"eligibleSectors": [
"residential",
"commercial"
],
"eligibleRetrofitCategories": [
"level_2_ev_charger_installation",
"dc_fast_charger_installation"
],
"hardRequirements": [
"Applicant must be a Gunnison County Electric Association member.",
"Rebate applies to eligible installed EV charging equipment.",
"Member-account lifetime and per-installed-charger limits may apply.",
"Current incentive amounts and eligibility must be confirmed with GCEA before matching."
],
"blockers": [
"Do not match vehicle purchase incentives to this charger-focused opportunity unless the current GCEA program confirms vehicle eligibility.",
"Do not match non-installed portable EV accessories.",
"Official pages returned access errors during review, so categories should not be broadened beyond charger rebate evidence."
],
"programType": "rebate",
"administrator": "Gunnison County Electric Association",
"applicationUrl": null,
"websiteUrl": "[https://www.gcea.coop/energy-efficiency/electric-vehicles/ev-rebates/](https://www.gcea.coop/energy-efficiency/electric-vehicles/ev-rebates/)",
"sourceUrlsChecked": [
"[https://www.gcea.coop/energy-efficiency/electric-vehicles/ev-rebates/](https://www.gcea.coop/energy-efficiency/electric-vehicles/ev-rebates/)",
"[https://www.gcea.coop/faqs_category/ev-rebates/](https://www.gcea.coop/faqs_category/ev-rebates/)",
"[https://www.gcea.coop/faqs/gcea-level-2-ev-charging-station-rebates/](https://www.gcea.coop/faqs/gcea-level-2-ev-charging-station-rebates/)"
],
"evidenceText": "Official GCEA search results and FAQ titles identify rebates for installed Level 2 EV charging stations and EV charging equipment, but page access was limited.",
"reasoningNotes": "The Level 2 EV charger match is supported. Broader EV charging should remain narrowed because current official pages were not fully readable."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2832",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"MD"
],
"counties": [
"Harford County"
],
"cities": [],
"utilityTerritories": [],
"notes": "Applies to eligible real property in Harford County, Maryland."
},
"eligibleApplicantTypes": [
"property_owner",
"residential_property_owner",
"commercial_property_owner",
"nonresidential_property_owner"
],
"eligibleSectors": [
"residential",
"commercial",
"industrial",
"institutional"
],
"eligibleRetrofitCategories": [
"ground_source_geothermal_heat_pump",
"solar_photovoltaic_system",
"solar_water_heating"
],
"hardRequirements": [
"Device must be a solar energy device or geothermal energy device installed on eligible Harford County property.",
"Device must heat or cool a building, supply hot water, or generate electricity for use in the structure.",
"Application must be filed by the county deadline.",
"Credit is subject to per-device, per-property, and carry-forward limits."
],
"blockers": [
"Do not match general high-efficiency HVAC replacement.",
"Do not match air-source heat pumps or conventional HVAC equipment.",
"Do not match solar or geothermal projects outside Harford County.",
"Credit applies against county real property tax only."
],
"programType": "property_tax_incentive",
"administrator": "Harford County Department of the Treasury",
"applicationUrl": "[https://www.harfordcountymd.gov/DocumentCenter/View/27251/Solar-Geothermal-Energy-ApplicationPDF](https://www.harfordcountymd.gov/DocumentCenter/View/27251/Solar-Geothermal-Energy-ApplicationPDF)",
"websiteUrl": "[https://www.harfordcountymd.gov/3466/Real-Property-Tax-Credit-Information](https://www.harfordcountymd.gov/3466/Real-Property-Tax-Credit-Information)",
"sourceUrlsChecked": [
"[https://www.harfordcountymd.gov/3466/Real-Property-Tax-Credit-Information](https://www.harfordcountymd.gov/3466/Real-Property-Tax-Credit-Information)",
"[https://www.harfordcountymd.gov/DocumentCenter/View/27251/Solar-Geothermal-Energy-ApplicationPDF](https://www.harfordcountymd.gov/DocumentCenter/View/27251/Solar-Geothermal-Energy-ApplicationPDF)",
"[https://ecode360.com/9371765](https://ecode360.com/9371765)"
],
"evidenceText": "Harford County code provides a property tax credit for buildings using solar or geothermal devices for heating, cooling, hot water, or electricity generation.",
"reasoningNotes": "The geothermal match is valid only for qualifying geothermal devices. The high-efficiency HVAC match is too broad and should be blocked."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2674",
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
"Harrison REMC"
],
"notes": "Limited to Harrison REMC residential members."
},
"eligibleApplicantTypes": [
"residential_customer",
"utility_member",
"homeowner"
],
"eligibleSectors": [
"residential"
],
"eligibleRetrofitCategories": [
"heat_pump_hvac_retrofit",
"air_source_heat_pump_replacement",
"ductless_mini_split_heat_pump",
"ground_source_geothermal_heat_pump",
"dual_fuel_heat_pump_system"
],
"hardRequirements": [
"Applicant must be a Harrison REMC residential customer.",
"Installed equipment must be an eligible heat pump, dual-fuel system, or geothermal heat pump.",
"Required rebate form documentation must be submitted.",
"Program terms and qualifying equipment requirements must be met."
],
"blockers": [
"Do not match furnace-only, boiler-only, or central air conditioning-only replacements.",
"Do not match broad high-efficiency HVAC unless the installed system is a qualifying heat pump or dual-fuel heat pump system.",
"Do not match commercial or industrial HVAC projects."
],
"programType": "rebate",
"administrator": "Harrison REMC",
"applicationUrl": "[https://www.harrisonremc.com/hvac-heat-pump-rebate-form/](https://www.harrisonremc.com/hvac-heat-pump-rebate-form/)",
"websiteUrl": "[https://www.harrisonremc.com/hvac-heat-pump-rebate-form/](https://www.harrisonremc.com/hvac-heat-pump-rebate-form/)",
"sourceUrlsChecked": [
"[https://www.harrisonremc.com/hvac-heat-pump-rebate-form/](https://www.harrisonremc.com/hvac-heat-pump-rebate-form/)",
"[https://www.harrisonremc.com/?s=rebates](https://www.harrisonremc.com/?s=rebates)"
],
"evidenceText": "Harrison REMC identifies residential rebates for heat pumps, dual fuel systems, and geothermal heat pump units.",
"reasoningNotes": "The heat pump retrofit match is correct. The generic high-efficiency HVAC category should be narrowed to qualifying heat pump systems."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:1188",
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
"notes": "Available for eligible Minnesota owner-occupied one-to-four-unit primary residences through the CEE-administered loan program."
},
"eligibleApplicantTypes": [
"homeowner",
"owner_occupant",
"residential_property_owner"
],
"eligibleSectors": [
"residential"
],
"eligibleRetrofitCategories": [
"high_efficiency_hvac_replacement",
"insulation_upgrade",
"window_replacement",
"efficient_water_heater"
],
"hardRequirements": [
"Property must be a one-to-four-unit owner-occupied primary residence.",
"Loan approval is subject to credit and program guidelines.",
"Improvements must be energy-related and program-eligible.",
"Properties held in trust are not eligible.",
"This is loan financing, not a rebate."
],
"blockers": [
"Do not match commercial, industrial, or non-owner-occupied projects.",
"Do not treat as a grant or rebate.",
"Do not match measures outside the lender-approved energy improvement scope."
],
"programType": "loan",
"administrator": "Center for Energy and Environment",
"applicationUrl": null,
"websiteUrl": "[https://www.mncee.org/mhfa-home-energy-loan](https://www.mncee.org/mhfa-home-energy-loan)",
"sourceUrlsChecked": [
"[https://www.mncee.org/mhfa-home-energy-loan](https://www.mncee.org/mhfa-home-energy-loan)",
"[https://www.mnhousing.gov/home/homeownership/improve-your-home](https://www.mnhousing.gov/home/homeownership/improve-your-home)"
],
"evidenceText": "CEE states that eligible home energy loan improvements include heating and cooling systems, windows, water heaters, and insulation for owner-occupied one-to-four-unit homes.",
"reasoningNotes": "Both original matches are supportable, but the opportunity should remain typed as financing rather than rebate support."
},
{
"opportunityId": "SOURCE_SCE_BUSINESS:sce_source_section:bcdeae04c5863d3b:hvac-optimization-program",
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
"Southern California Edison"
],
"notes": "Limited to eligible SCE business customers and facilities in SCE service territory."
},
"eligibleApplicantTypes": [
"business_customer",
"commercial_building_owner",
"commercial_building_operator",
"contractor"
],
"eligibleSectors": [
"commercial",
"institutional"
],
"eligibleRetrofitCategories": [
"hvac_optimization",
"hvac_retrocommissioning",
"hvac_controls_optimization"
],
"hardRequirements": [
"Customer must be served by SCE and pay the public goods charge where required.",
"Program is for commercial buildings and business facilities.",
"Retrocommissioning eligibility may require at least 25000 square feet of conditioned space.",
"Eligible facilities generally need direct digital controls and central plant mechanical equipment in good condition.",
"Participation is through program consultation, contractor services, and approved optimization scope."
],
"blockers": [
"Do not match residential projects.",
"Do not match general high-efficiency HVAC replacement unless the program-approved scope specifically includes replacement.",
"Do not match standalone energy management system installation; continuous energy improvement is a separate SCE offering.",
"Do not treat technical assistance as a prescriptive equipment rebate."
],
"programType": "technical_assistance",
"administrator": "Southern California Edison",
"applicationUrl": null,
"websiteUrl": "[https://www.sce.com/business/save-costs-energy/savings-strategies/building-improvement](https://www.sce.com/business/save-costs-energy/savings-strategies/building-improvement)",
"sourceUrlsChecked": [
"[https://www.sce.com/business/save-costs-energy/savings-strategies/building-improvement](https://www.sce.com/business/save-costs-energy/savings-strategies/building-improvement)"
],
"evidenceText": "SCE describes HVAC Optimization as a holistic HVAC system service with consulting, installation standards, contractor training, quality control, and performance reporting for business customers.",
"reasoningNotes": "The energy management system match appears to come from a separate adjacent program, and high-efficiency HVAC replacement is broader than the HVAC optimization service."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3458",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"ID"
],
"counties": [],
"cities": [
"Idaho Falls"
],
"utilityTerritories": [
"Idaho Falls Power"
],
"notes": "Limited to commercial and industrial buildings receiving electric service from Idaho Falls Power."
},
"eligibleApplicantTypes": [
"business_customer",
"commercial_customer",
"industrial_customer"
],
"eligibleSectors": [
"commercial",
"industrial"
],
"eligibleRetrofitCategories": [
"led_lighting_retrofit",
"commercial_lighting_retrofit",
"heat_pump_hvac_retrofit",
"ductless_mini_split_heat_pump",
"hvac_controls_vfd",
"smart_thermostat",
"insulation_upgrade"
],
"hardRequirements": [
"Building must receive electric service from Idaho Falls Power.",
"Energy audit is required before purchase or installation.",
"Rebate is issued only after purchase, installation, and final inspection.",
"Program may offer either rebates or zero-interest loans depending on project type and approval."
],
"blockers": [
"Do not match residential projects.",
"Do not match work started before the required audit and approval.",
"Do not broaden HVAC to all equipment; official HVAC incentives identify heat pumps, controls, VFDs, thermostats, and insulation.",
"Do not treat the loan component as a rebate when financing is selected."
],
"programType": "rebate_and_loan",
"administrator": "Idaho Falls Power",
"applicationUrl": null,
"websiteUrl": "[https://www.ifpower.org/accounts-and-services/energy-efficiency/your-business/lighting/](https://www.ifpower.org/accounts-and-services/energy-efficiency/your-business/lighting/)",
"sourceUrlsChecked": [
"[https://www.ifpower.org/accounts-and-services/energy-efficiency/your-business](https://www.ifpower.org/accounts-and-services/energy-efficiency/your-business)",
"[https://www.ifpower.org/accounts-and-services/energy-efficiency/your-business/lighting/](https://www.ifpower.org/accounts-and-services/energy-efficiency/your-business/lighting/)",
"[https://www.ifpower.org/accounts-and-services/energy-efficiency/your-business/hvac/](https://www.ifpower.org/accounts-and-services/energy-efficiency/your-business/hvac/)"
],
"evidenceText": "Idaho Falls Power offers commercial and industrial incentives for lighting and HVAC projects, including heat pumps, ductless heat pumps, controls, VFDs, thermostats, and insulation.",
"reasoningNotes": "LED lighting is correct. HVAC should be limited to the specific commercial HVAC measures listed by Idaho Falls Power."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3879",
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
"Illinois Municipal Electric Agency member municipal electric systems"
],
"notes": "Limited to eligible customers served by IMEA or an IMEA member municipal electric system in Illinois."
},
"eligibleApplicantTypes": [
"business_customer",
"industrial_customer",
"public_sector_customer",
"municipal_customer"
],
"eligibleSectors": [
"commercial",
"industrial",
"government"
],
"eligibleRetrofitCategories": [
"led_lighting_retrofit",
"high_efficiency_refrigeration_equipment",
"compressed_air_efficiency",
"motor_vfd_for_hvac_pumps_and_motors",
"custom_electric_efficiency_project"
],
"hardRequirements": [
"Project must be in Illinois and served by IMEA or an IMEA member municipal electric system.",
"Commercial, industrial, and public-sector projects require preapproval before work starts.",
"Project must produce electricity savings through efficiency improvements.",
"Equipment must remain in place for the required life or program period.",
"Funding is subject to availability."
],
"blockers": [
"Do not match repairs or maintenance without qualifying efficiency improvement.",
"Do not match fuel switching, new generation, or demand-response-only projects.",
"Do not infer broad residential appliance eligibility from separate municipal residential offerings.",
"Do not match customers outside IMEA member municipal service territories."
],
"programType": "rebate",
"administrator": "Illinois Municipal Electric Agency",
"applicationUrl": "[https://www.imea.org/EE%20Incentives.asp](https://www.imea.org/EE%20Incentives.asp)",
"websiteUrl": "[https://www.imea.org/Electric%20Efficiency%20Program.html](https://www.imea.org/Electric%20Efficiency%20Program.html)",
"sourceUrlsChecked": [
"[https://www.imea.org/Electric%20Efficiency%20Program.html](https://www.imea.org/Electric%20Efficiency%20Program.html)",
"[https://www.imea.org/EE%20Incentives.asp](https://www.imea.org/EE%20Incentives.asp)"
],
"evidenceText": "IMEA lists incentives for businesses and public-sector facilities including LED lighting, refrigeration, compressed air, VSDs for HVAC pumps and motors, and custom projects.",
"reasoningNotes": "Both refrigeration and LED lighting are valid matches for the commercial, industrial, and public-sector program."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2272",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"GA"
],
"counties": [],
"cities": [],
"utilityTerritories": [
"Jackson EMC"
],
"notes": "Limited to homes served by Jackson EMC."
},
"eligibleApplicantTypes": [
"residential_customer",
"utility_member",
"homeowner"
],
"eligibleSectors": [
"residential"
],
"eligibleRetrofitCategories": [
"heat_pump_hvac_retrofit",
"efficient_water_heater",
"ductwork_repair",
"insulation_upgrade",
"air_sealing"
],
"hardRequirements": [
"Applicant must be a Jackson EMC member in good standing.",
"Improvements must be made at a home served by Jackson EMC.",
"Only approved energy-efficiency improvements are eligible.",
"Customer must use an approved contractor where required.",
"Work should not start until loan approval.",
"Financing is through the designated loan provider and subject to funding and credit approval."
],
"blockers": [
"Do not match commercial or industrial projects.",
"Do not treat as a rebate.",
"Do not match HVAC equipment beyond ENERGY STAR heat pump replacement or approved total-electric equipment.",
"Do not match projects started before required loan approval."
],
"programType": "loan",
"administrator": "Jackson Electric Membership Corporation",
"applicationUrl": "[https://connect.goenergyfinancial.com/](https://connect.goenergyfinancial.com/)",
"websiteUrl": "[https://www.jacksonemc.com/member-services/home-services/rebates-incentives-loans/loans](https://www.jacksonemc.com/member-services/home-services/rebates-incentives-loans/loans)",
"sourceUrlsChecked": [
"[https://www.jacksonemc.com/homeplus](https://www.jacksonemc.com/homeplus)",
"[https://www.jacksonemc.com/member-services/home-services/rebates-incentives-loans/loans](https://www.jacksonemc.com/member-services/home-services/rebates-incentives-loans/loans)"
],
"evidenceText": "Jackson EMC states that HomePlus financing can be used for heat pump replacement, water heater replacement, ductwork repair, insulation, and air sealing.",
"reasoningNotes": "The insulation match is correct, and HVAC should be narrowed to approved heat pump replacement rather than general HVAC."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22752",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"FL"
],
"counties": [],
"cities": [
"Kissimmee"
],
"utilityTerritories": [
"Kissimmee Utility Authority"
],
"notes": "Limited to KUA residential customers installing qualifying home Level 2 EV chargers."
},
"eligibleApplicantTypes": [
"residential_customer",
"utility_customer",
"homeowner"
],
"eligibleSectors": [
"residential"
],
"eligibleRetrofitCategories": [
"level_2_ev_charger_installation"
],
"hardRequirements": [
"Customer must purchase and install a Level 2 home EV charger.",
"Customer must submit proof of purchase.",
"Customer must submit a picture of the installed home charger.",
"KUA may require onsite post-verification.",
"Rebate amount and availability are subject to current KUA program terms."
],
"blockers": [
"Do not match commercial EV charging.",
"Do not match Level 1 chargers or portable charging accessories.",
"Do not add KUA heat pump, insulation, lighting, or other rebate-page categories to this EV charger opportunity.",
"Do not match EV vehicle purchase."
],
"programType": "rebate",
"administrator": "Kissimmee Utility Authority",
"applicationUrl": "[https://kua.com/energy-conservation/rebates/level-2-home-ev-charger-rebate/](https://kua.com/energy-conservation/rebates/level-2-home-ev-charger-rebate/)",
"websiteUrl": "[https://kua.com/energy-conservation/rebates/level-2-home-ev-charger-rebate/](https://kua.com/energy-conservation/rebates/level-2-home-ev-charger-rebate/)",
"sourceUrlsChecked": [
"[https://kua.com/energy-conservation/rebates/level-2-home-ev-charger-rebate/](https://kua.com/energy-conservation/rebates/level-2-home-ev-charger-rebate/)",
"[https://kua.com/energy-conservation/rebates/](https://kua.com/energy-conservation/rebates/)"
],
"evidenceText": "KUA states that customers must purchase and install a Level 2 home EV charger and submit proof of purchase and an installed-charger photo.",
"reasoningNotes": "Only Level 2 home EV charger installation belongs to this opportunity; other KUA rebate categories are separate opportunities."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5568",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"NJ"
],
"counties": [],
"cities": [],
"utilityTerritories": [],
"notes": "Statewide New Jersey program for eligible large non-hospital commercial and industrial utility customers."
},
"eligibleApplicantTypes": [
"large_commercial_customer",
"industrial_customer",
"public_entity",
"public_school",
"private_nonresidential_customer"
],
"eligibleSectors": [
"commercial",
"industrial",
"government",
"education"
],
"eligibleRetrofitCategories": [
"combined_heat_and_power_system",
"led_lighting_retrofit",
"custom_energy_efficiency_project"
],
"hardRequirements": [
"Facility must be an existing large non-hospital commercial or industrial facility in New Jersey.",
"Applicant must meet large energy user eligibility thresholds such as annual energy cost and peak demand or therm usage.",
"Project must meet applicable minimum performance standards.",
"Program is first-come, first-served and subject to funding availability.",
"New construction and substantial renovation are not eligible."
],
"blockers": [
"Hospitals are not eligible.",
"Do not match residential projects.",
"Do not match renewable energy projects; renewable energy is excluded from LEUP incentives.",
"Do not match new construction or substantial renovation.",
"Do not classify CHP as solar or renewable electricity for this program."
],
"programType": "rebate",
"administrator": "New Jersey Clean Energy Program",
"applicationUrl": null,
"websiteUrl": "[https://cleanenergy.nj.gov/programs/energy-efficiency/large-energy-users-program-leup](https://cleanenergy.nj.gov/programs/energy-efficiency/large-energy-users-program-leup)",
"sourceUrlsChecked": [
"[https://cleanenergy.nj.gov/programs/energy-efficiency/large-energy-users-program-leup](https://cleanenergy.nj.gov/programs/energy-efficiency/large-energy-users-program-leup)",
"[https://www.nj.gov/bpu/pdf/boardorders/2025/20250630/8B%20NJCEP%20Programs%20and%20Budget%20Fiscal%20Year%202026%20final.pdf](https://www.nj.gov/bpu/pdf/boardorders/2025/20250630/8B%20NJCEP%20Programs%20and%20Budget%20Fiscal%20Year%202026%20final.pdf)",
"[https://www.njcleanenergy.com/LEUP](https://www.njcleanenergy.com/LEUP)"
],
"evidenceText": "NJCEP describes LEUP as open for large non-hospital commercial and industrial facilities and supporting energy efficiency and combined heat and power projects.",
"reasoningNotes": "CHP and LED lighting are supported, but CHP should not inherit a solar or renewable parent category, and renewable-energy projects are explicitly blocked."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:1394",
"confidence": "medium",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"NH"
],
"counties": [],
"cities": [],
"utilityTerritories": [
"Liberty Utilities electric service territory in New Hampshire"
],
"notes": "Available to qualifying Liberty Utilities electric commercial, industrial, and municipal customers through Liberty and NHSaves programs."
},
"eligibleApplicantTypes": [
"commercial_customer",
"industrial_customer",
"municipal_customer",
"small_business_customer",
"large_business_customer"
],
"eligibleSectors": [
"commercial",
"industrial",
"government"
],
"eligibleRetrofitCategories": [
"high_efficiency_hvac_replacement",
"led_lighting_retrofit",
"lighting_controls",
"custom_energy_efficiency_project"
],
"hardRequirements": [
"Applicant must be an eligible Liberty Utilities electric customer in New Hampshire.",
"Small business and large business eligibility may depend on demand thresholds.",
"Equipment must qualify under current Liberty Utilities or NHSaves commercial electric program rules.",
"On-bill financing, when used, is separate financing support and subject to terms and availability."
],
"blockers": [
"Do not match residential projects.",
"Do not match gas-only measures to the electric commercial program.",
"Do not treat on-bill financing as a rebate.",
"Do not match projects outside Liberty Utilities electric territory.",
"Program offerings are subject to change or cancellation."
],
"programType": "rebate_and_financing",
"administrator": "Liberty Utilities",
"applicationUrl": null,
"websiteUrl": "[https://new-hampshire.libertyutilities.com/acworth/commercial/smart-energy-use/electric/electric-programs.html](https://new-hampshire.libertyutilities.com/acworth/commercial/smart-energy-use/electric/electric-programs.html)",
"sourceUrlsChecked": [
"[https://new-hampshire.libertyutilities.com/acworth/commercial/smart-energy-use/electric/electric-programs.html](https://new-hampshire.libertyutilities.com/acworth/commercial/smart-energy-use/electric/electric-programs.html)",
"[https://new-hampshire.libertyutilities.com/bath/commercial/smart-energy-use/electric/electric-programs.html](https://new-hampshire.libertyutilities.com/bath/commercial/smart-energy-use/electric/electric-programs.html)",
"[https://nhsaves.com/instant-rebates-new-or-replacement-equipment/](https://nhsaves.com/instant-rebates-new-or-replacement-equipment/)",
"[https://www.energy.nh.gov/consumers/energy-efficiency/energy-efficiency-rebates-and-incentives](https://www.energy.nh.gov/consumers/energy-efficiency/energy-efficiency-rebates-and-incentives)"
],
"evidenceText": "Liberty Utilities describes commercial electric efficiency programs for small, municipal, and large businesses, and NHSaves identifies qualifying commercial HVAC and lighting incentives.",
"reasoningNotes": "The HVAC and LED lighting matches are supportable for the commercial electric program, with territory and sector limits."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22045",
"confidence": "medium",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"CT"
],
"counties": [],
"cities": [],
"utilityTerritories": [],
"notes": "Connecticut-focused affordable multifamily lending, with priority for qualifying affordable and high-impact properties."
},
"eligibleApplicantTypes": [
"multifamily_property_owner",
"affordable_housing_developer",
"landlord",
"condominium_association",
"nonprofit_housing_owner"
],
"eligibleSectors": [
"multifamily_residential",
"affordable_housing"
],
"eligibleRetrofitCategories": [
"multifamily_energy_efficiency_improvements"
],
"hardRequirements": [
"Property must be multifamily or a condominium development with no fewer than five units.",
"At least 60 percent of units must be affordable to households at or below 80 percent of area median income, unless otherwise approved.",
"Loan scope must be approved by Capital for Change underwriting.",
"Program provides loan financing, not a rebate."
],
"blockers": [
"Do not match single-family or one-to-four-unit homeowner loans to this LIME opportunity.",
"Do not match ground-source geothermal heat pumps unless the current lender-approved LIME scope explicitly includes them.",
"Do not match general high-efficiency HVAC replacement without project-specific loan approval.",
"Do not treat financing as a rebate."
],
"programType": "loan",
"administrator": "Capital For Change Inc.",
"applicationUrl": null,
"websiteUrl": "[https://www.capitalforchange.org/affordable-housing-loan-program](https://www.capitalforchange.org/affordable-housing-loan-program)",
"sourceUrlsChecked": [
"[https://www.capitalforchange.org/affordable-housing-loan-program](https://www.capitalforchange.org/affordable-housing-loan-program)",
"[https://www.capitalforchange.org/copy-of-consumer-lending-1](https://www.capitalforchange.org/copy-of-consumer-lending-1)",
"[https://www.capitalforchange.org/property-owners](https://www.capitalforchange.org/property-owners)"
],
"evidenceText": "Capital for Change describes LIME loans for energy efficiency improvements to multifamily properties or condominium developments with at least five units and affordability requirements.",
"reasoningNotes": "The geothermal match appears to come from a separate homeowner or landlord loan context, not the LIME multifamily loan. Specific HVAC matches should require project-scope confirmation."
}
],
"continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:2234"
}
