{
"schemaVersion": "opportunity_data_research_repairs.v1",
"researchedAt": "2026-07-02",
"source": "gpt_pro",
"repairs": [
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22383",
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
"New Hampshire Electric Cooperative electric service territory"
],
"notes": "Limited to NHEC residential member properties with active electric service."
},
"eligibleApplicantTypes": [
"residential_members",
"homeowners"
],
"eligibleSectors": [
"residential"
],
"eligibleRetrofitCategories": [
"level_2_ev_charger_installation"
],
"hardRequirements": [
"NHEC residential member with active account",
"Preapproval required before installation",
"UL-listed Level 2 EV charging station",
"Charger must be on an NHEC time-of-use EV rate",
"NHEC submeter line and meter socket required",
"Documentation due by program deadline"
],
"blockers": [
"Generic EV charger matching is too broad; source supports Level 2 only",
"Non-NHEC customers are not eligible",
"Nonresidential installations are not covered by this residential rebate",
"Installations started before preapproval are not eligible",
"Level 1 chargers and DC fast chargers are not supported by this opportunity"
],
"programType": "rebate",
"administrator": "New Hampshire Electric Cooperative",
"applicationUrl": null,
"websiteUrl": "[https://www.nhec.com/electric-vehicle-charging/](https://www.nhec.com/electric-vehicle-charging/)",
"sourceUrlsChecked": [
"[https://www.nhec.com/electric-vehicle-charging/](https://www.nhec.com/electric-vehicle-charging/)",
"[https://www.nhec.com/wp-content/uploads/2026/03/2026-EV-Residential-Changing-Station-Terms-Conditions-3-11-26-kdc.pdf](https://www.nhec.com/wp-content/uploads/2026/03/2026-EV-Residential-Changing-Station-Terms-Conditions-3-11-26-kdc.pdf)",
"[https://www.nhec.com/wp-content/uploads/2026/03/2026-EV-Residential-Changing-Instructions-Checklist-3-11-26-kdc.pdf](https://www.nhec.com/wp-content/uploads/2026/03/2026-EV-Residential-Changing-Instructions-Checklist-3-11-26-kdc.pdf)"
],
"evidenceText": "NHEC’s 2026 EV charging materials limit the incentive to preapproved residential members installing UL-listed Level 2 charging stations on an NHEC time-of-use EV rate with submetering.",
"reasoningNotes": "Keep only the Level 2 EVSE category. The generic EV charger category is blocked because the official terms are Level 2-specific."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22328",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"MA"
],
"counties": [],
"cities": [
"Ashburnham",
"Belmont",
"Boylston",
"Chicopee",
"Concord",
"Groton",
"Hingham",
"Holyoke",
"Hull",
"Ipswich",
"Mansfield",
"Marblehead",
"Paxton",
"Peabody",
"Princeton",
"Reading",
"Russell",
"Shrewsbury",
"South Hadley",
"Sterling",
"Templeton",
"Wakefield",
"West Boylston"
],
"utilityTerritories": [
"participating NextZero/MMWEC municipal light plant service territories"
],
"notes": "Town participation and rebate details vary by municipal light plant."
},
"eligibleApplicantTypes": [
"residential_customers",
"municipal_light_plant_customers"
],
"eligibleSectors": [
"residential"
],
"eligibleRetrofitCategories": [
"level_2_ev_charger_installation"
],
"hardRequirements": [
"Customer must be served by a participating municipal light plant",
"Eligible smart Level 2 charger required",
"Enrollment in NextZero scheduled charging or equivalent managed charging required",
"Charger must remain connected and controllable as required by the local program"
],
"blockers": [
"Not statewide Massachusetts; investor-owned utility customers are not eligible through this opportunity",
"Generic EV charger category is too broad; source supports eligible smart Level 2 chargers",
"Installation labor is generally not the rebated item unless local terms state otherwise",
"Nonparticipating municipal utilities and DC fast chargers are not supported"
],
"programType": "rebate",
"administrator": "Massachusetts Municipal Wholesale Electric Company / NextZero",
"applicationUrl": "[https://rebates.nextzero.org](https://rebates.nextzero.org)",
"websiteUrl": "[https://nextzero.org/](https://nextzero.org/)",
"sourceUrlsChecked": [
"[https://nextzero.org/](https://nextzero.org/)",
"[https://nextzero.org/west-boylston/ev-charger-program/](https://nextzero.org/west-boylston/ev-charger-program/)",
"[https://rebates.nextzero.org](https://rebates.nextzero.org)"
],
"evidenceText": "NextZero municipal light plant pages describe rebates for eligible smart Level 2 chargers, paired with scheduled charging requirements that curtail charging during specified weekday evening hours.",
"reasoningNotes": "Preserve Level 2 EV charging only and constrain geography to participating municipal light plant customers."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5811",
"confidence": "medium",
"availabilityStatus": "unavailable",
"geography": {
"country": "US",
"states": [
"NJ"
],
"counties": [],
"cities": [],
"utilityTerritories": [],
"notes": "The legacy Residential New Construction Program has closed; current applicants are directed to a separate New Construction Program."
},
"eligibleApplicantTypes": [
"builders",
"developers",
"property_owners"
],
"eligibleSectors": [
"residential_new_construction"
],
"eligibleRetrofitCategories": [],
"hardRequirements": [
"Legacy program is closed and should not be matched as an active retrofit opportunity",
"Use the current New Construction Program only as a separate opportunity"
],
"blockers": [
"Closed new-construction program should not match existing-home retrofit work",
"Insulation is not supported as a standalone retrofit under this closed opportunity",
"ENERGY STAR certification is a new-construction pathway, not a physical retrofit category",
"Current successor program is separate and should not be merged into this record"
],
"programType": "new_construction_incentive",
"administrator": "New Jersey Board of Public Utilities / New Jersey Clean Energy Program",
"applicationUrl": null,
"websiteUrl": "[https://cleanenergy.nj.gov/programs/energy-efficiency/new-construction-program](https://cleanenergy.nj.gov/programs/energy-efficiency/new-construction-program)",
"sourceUrlsChecked": [
"[https://www.njcleanenergy.com/residential/programs/residential-new-construction](https://www.njcleanenergy.com/residential/programs/residential-new-construction)",
"[https://cleanenergy.nj.gov/programs/energy-efficiency/new-construction-program](https://cleanenergy.nj.gov/programs/energy-efficiency/new-construction-program)"
],
"evidenceText": "Official NJCEP sources no longer present the legacy Residential New Construction Program as the current application pathway and direct users to the newer New Construction Program.",
"reasoningNotes": "Clear retrofit categories because the supplied DSIRE opportunity is a closed new-construction record, not an active retrofit rebate."
},
{
"opportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:nonprofit-solar-grant",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"CA"
],
"counties": [],
"cities": [
"Santa Clara"
],
"utilityTerritories": [
"Silicon Valley Power electric service territory"
],
"notes": "Limited to qualifying nonprofit SVP customers in the City of Santa Clara."
},
"eligibleApplicantTypes": [
"nonprofit_organizations",
"nonprofit_commercial_customers"
],
"eligibleSectors": [
"nonprofit",
"commercial"
],
"eligibleRetrofitCategories": [
"solar_pv_system",
"rooftop_solar_pv"
],
"hardRequirements": [
"Applicant must be a qualifying nonprofit SVP customer",
"Grant is for installation of solar photovoltaic generation at an eligible facility",
"Project must receive SVP approval and meet program documentation requirements",
"Grant cannot exceed program caps or the share of facility electricity allowed by the program"
],
"blockers": [
"low_flow_fixture_retrofit is a false positive; water fixtures are not eligible",
"Building repairs are only ancillary PV-ready costs and not standalone retrofits",
"Battery storage and other non-PV measures are not supported by this grant",
"Nonprofit and SVP territory requirements block general commercial matching"
],
"programType": "grant",
"administrator": "Silicon Valley Power",
"applicationUrl": "[https://www.siliconvalleypower.com/home/showpublisheddocument/82370/638409969485570000](https://www.siliconvalleypower.com/home/showpublisheddocument/82370/638409969485570000)",
"websiteUrl": "[https://www.siliconvalleypower.com/businesses/rebates](https://www.siliconvalleypower.com/businesses/rebates)",
"sourceUrlsChecked": [
"[https://www.siliconvalleypower.com/businesses/rebates](https://www.siliconvalleypower.com/businesses/rebates)",
"[https://www.siliconvalleypower.com/home/showpublisheddocument/82370/638409969485570000](https://www.siliconvalleypower.com/home/showpublisheddocument/82370/638409969485570000)"
],
"evidenceText": "SVP’s nonprofit grant application supports solar photovoltaic installation for qualifying nonprofit electric customers, with PV-ready infrastructure allowed only as a limited ancillary cost.",
"reasoningNotes": "Preserve solar PV. Remove water-fixture matching caused by the word fixture in the application context."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22749",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"NC"
],
"counties": [],
"cities": [],
"utilityTerritories": [],
"notes": "Statewide North Carolina program available across all counties, subject to income, property, contractor, and program-pathway rules."
},
"eligibleApplicantTypes": [
"homeowners",
"renters_with_owner_authorization",
"multifamily_property_owners",
"income_eligible_households"
],
"eligibleSectors": [
"residential",
"multifamily_residential"
],
"eligibleRetrofitCategories": [
"air_sealing_weatherization",
"insulation_upgrade",
"heat_pump_hvac_retrofit",
"high_efficiency_hvac_replacement",
"mechanical_ventilation",
"heat_pump_water_heater"
],
"hardRequirements": [
"Household income generally must be at or below 150% of area median income",
"Renters need property owner authorization",
"Work must use program-approved or registered contractors",
"Home assessment and modeled savings may be required for the Home Efficiency path",
"Self-install projects are not eligible"
],
"blockers": [
"Commercial and industrial properties are not eligible",
"Households above income limits are blocked",
"Do-it-yourself installations are not eligible",
"Emergency repairs, bill assistance, and unrelated appliance rebates are separate from this opportunity",
"Duplicate rebates for the same measure are not allowed"
],
"programType": "rebate",
"administrator": "North Carolina Department of Environmental Quality State Energy Office",
"applicationUrl": "[https://www.energysavernc.org/](https://www.energysavernc.org/)",
"websiteUrl": "[https://energysavernc.org/](https://energysavernc.org/)",
"sourceUrlsChecked": [
"[https://www.energysavernc.org/](https://www.energysavernc.org/)",
"[https://www.deq.nc.gov/energy-climate/state-energy-office/energy-saver-north-carolina](https://www.deq.nc.gov/energy-climate/state-energy-office/energy-saver-north-carolina)",
"[https://www.deq.nc.gov/energy-climate/state-energy-office/energy-saver-north-carolina/energy-efficiency-rebates](https://www.deq.nc.gov/energy-climate/state-energy-office/energy-saver-north-carolina/energy-efficiency-rebates)",
"[https://www.energysavernc.org/about-the-program/homeowners-managing-efficiency-savings-homes/](https://www.energysavernc.org/about-the-program/homeowners-managing-efficiency-savings-homes/)"
],
"evidenceText": "Energy Saver NC identifies income-qualified homeowners and renters as eligible for home energy upgrades including insulation, air sealing, HVAC or heat pumps, ventilation, and heat pump water heaters.",
"reasoningNotes": "Air sealing and insulation are source-backed. Additional home-efficiency categories are included only where official program pages identify them."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5402",
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
"North Shore Gas residential service territory"
],
"notes": "Delivered with ComEd coordination where electric measures are involved."
},
"eligibleApplicantTypes": [
"residential_customers",
"homeowners",
"renters_with_landlord_permission"
],
"eligibleSectors": [
"residential"
],
"eligibleRetrofitCategories": [
"smart_thermostat_retrofit",
"programmable_thermostat_retrofit",
"water_heater_pipe_insulation",
"low_flow_showerhead_faucet_aerator",
"weatherstripping_door_sweep",
"advanced_power_strip"
],
"hardRequirements": [
"Applicant must be an eligible North Shore Gas residential customer",
"Home type must meet the program’s residential eligibility rules",
"Renters need landlord permission where required",
"Measures are installed or provided through the utility home energy savings process"
],
"blockers": [
"insulation_upgrade is a false positive for this Jumpstart/direct-install record; broader insulation rebates are separate",
"Large multifamily and commercial accounts are not covered by this residential program",
"General HVAC replacement and appliance rebates should not be inferred",
"Thermostat matching should not imply zoning retrofit work"
],
"programType": "direct_install_and_rebate",
"administrator": "North Shore Gas",
"applicationUrl": "[https://www.northshoregasdelivery.com/savings/rebates-direct](https://www.northshoregasdelivery.com/savings/rebates-direct)",
"websiteUrl": "[https://www.northshoregasdelivery.com/savings/rebates-direct](https://www.northshoregasdelivery.com/savings/rebates-direct)",
"sourceUrlsChecked": [
"[https://www.northshoregasdelivery.com/savings/rebates-direct](https://www.northshoregasdelivery.com/savings/rebates-direct)",
"[https://www.northshoregasdelivery.com/savings/rebates](https://www.northshoregasdelivery.com/savings/rebates)",
"[https://www.northshoregasdelivery.com/savings/rebates-residential](https://www.northshoregasdelivery.com/savings/rebates-residential)"
],
"evidenceText": "North Shore Gas describes a residential home energy savings visit with direct-install or discounted products such as programmable or smart thermostats, pipe insulation, aerators, showerheads, door sweeps, and power strips.",
"reasoningNotes": "Narrow the thermostat category and block broad insulation because insulation is handled through other rebate pathways, not this direct-install opportunity."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22303",
"confidence": "high",
"availabilityStatus": "temporarily_closed",
"geography": {
"country": "US",
"states": [
"CT"
],
"counties": [],
"cities": [
"Norwich"
],
"utilityTerritories": [
"Norwich Public Utilities electric service territory"
],
"notes": "Limited to new EVSE installed in NPU electric territory."
},
"eligibleApplicantTypes": [
"residential_electric_customers",
"commercial_electric_customers",
"multifamily_property_owners",
"workplace_charging_hosts",
"public_charging_site_hosts"
],
"eligibleSectors": [
"residential",
"commercial",
"multifamily_residential",
"public_sector"
],
"eligibleRetrofitCategories": [
"level_2_ev_charger_installation"
],
"hardRequirements": [
"Applicant must be an NPU electric customer",
"EVSE must be new and installed in NPU territory",
"2026 form covers purchases from January 1 through June 30, 2026",
"Required documentation must be submitted by July 15, 2026",
"Preapproval is required for rebate requests over the program threshold"
],
"blockers": [
"New purchases after June 30, 2026 are not covered by the 2026 form checked",
"Installation labor and tax are excluded from the EVSE rebate amount",
"Level 1 chargers and DC fast chargers are not supported by the checked form",
"Non-NPU customers are not eligible"
],
"programType": "rebate",
"administrator": "Norwich Public Utilities",
"applicationUrl": "[https://norwichpublicutilities.com/DocumentCenter/View/655/2026-EVSE-Rebate](https://norwichpublicutilities.com/DocumentCenter/View/655/2026-EVSE-Rebate)",
"websiteUrl": "[https://norwichpublicutilities.com/216/Efficiency-Programs-Rebates](https://norwichpublicutilities.com/216/Efficiency-Programs-Rebates)",
"sourceUrlsChecked": [
"[https://norwichpublicutilities.com/216/Efficiency-Programs-Rebates](https://norwichpublicutilities.com/216/Efficiency-Programs-Rebates)",
"[https://norwichpublicutilities.com/DocumentCenter/View/655/2026-EVSE-Rebate](https://norwichpublicutilities.com/DocumentCenter/View/655/2026-EVSE-Rebate)",
"[https://norwichpublicutilities.com/QuickLinks.aspx?CID=29](https://norwichpublicutilities.com/QuickLinks.aspx?CID=29)"
],
"evidenceText": "NPU’s 2026 EVSE form supports Level II residential, commercial, workplace, multifamily, and public-use charging rebates for NPU electric customers, but the purchase window ended June 30, 2026.",
"reasoningNotes": "Keep Level 2 EVSE only. Mark temporarily closed because, on the research date, the checked purchase window had closed while final paperwork was still allowed."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:4629",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"NV"
],
"counties": [],
"cities": [],
"utilityTerritories": [
"NV Energy northern Nevada electric service territory"
],
"notes": "Business Energy Services eligibility depends on NV Energy account, rate, project type, and available incentive funds."
},
"eligibleApplicantTypes": [
"commercial_customers",
"industrial_customers",
"public_entities",
"institutional_customers",
"nonprofit_customers"
],
"eligibleSectors": [
"commercial",
"industrial",
"public_sector",
"institutional",
"nonprofit"
],
"eligibleRetrofitCategories": [
"lighting_controls_retrofit",
"occupancy_sensor_lighting_controls",
"daylighting_controls",
"programmable_thermostat_retrofit"
],
"hardRequirements": [
"Business customer must be served by NV Energy in the applicable service territory",
"Project generally requires online prenotification before work",
"Incentive reservation and final documentation deadlines apply",
"Equipment must meet the applicable 2026 retrofit specification"
],
"blockers": [
"Residential projects are not eligible under Business Energy Services",
"smart_thermostat_zoning_retrofit is too broad; source supports programmable thermostat measures with specific rules",
"Hotel guestroom programmable thermostat measures are not eligible",
"Lighting controls must control qualifying interior lighting",
"Funding availability can block otherwise eligible projects"
],
"programType": "rebate",
"administrator": "Sierra Pacific Power Company d/b/a NV Energy",
"applicationUrl": null,
"websiteUrl": "[https://www.nvenergy.com/save-with-powershift/business-energy-services](https://www.nvenergy.com/save-with-powershift/business-energy-services)",
"sourceUrlsChecked": [
"[https://www.nvenergy.com/save-with-powershift/business-energy-services](https://www.nvenergy.com/save-with-powershift/business-energy-services)",
"[https://www.nvenergy.com/publish/content/dam/nvenergy/brochures_arch/save-with-powershift/commercial-energy-services/application-documents/NVE_Retrofit_Specifications.pdf](https://www.nvenergy.com/publish/content/dam/nvenergy/brochures_arch/save-with-powershift/commercial-energy-services/application-documents/NVE_Retrofit_Specifications.pdf)",
"[https://www.nvenergy.com/publish/content/dam/nvenergy/brochures_arch/save-with-powershift/commercial-energy-services/Retrofit-New-Construction-Policies-Procedures.pdf](https://www.nvenergy.com/publish/content/dam/nvenergy/brochures_arch/save-with-powershift/commercial-energy-services/Retrofit-New-Construction-Policies-Procedures.pdf)"
],
"evidenceText": "NV Energy’s business retrofit specifications include occupancy sensors, daylighting and integrated lighting controls, and programmable thermostat measures, with prenotification and program documentation rules.",
"reasoningNotes": "Preserve lighting controls and narrow thermostat matching to programmable thermostat retrofit rather than smart thermostat or zoning."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2601",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"NV"
],
"counties": [],
"cities": [],
"utilityTerritories": [
"NV Energy southern Nevada electric service territory"
],
"notes": "Business Energy Services eligibility depends on NV Energy account, rate, project type, and available incentive funds."
},
"eligibleApplicantTypes": [
"commercial_customers",
"industrial_customers",
"public_entities",
"institutional_customers",
"nonprofit_customers"
],
"eligibleSectors": [
"commercial",
"industrial",
"public_sector",
"institutional",
"nonprofit"
],
"eligibleRetrofitCategories": [
"lighting_controls_retrofit",
"occupancy_sensor_lighting_controls",
"daylighting_controls",
"programmable_thermostat_retrofit"
],
"hardRequirements": [
"Business customer must be served by NV Energy in the applicable service territory",
"Project generally requires online prenotification before work",
"Incentive reservation and final documentation deadlines apply",
"Equipment must meet the applicable 2026 retrofit specification"
],
"blockers": [
"Residential projects are not eligible under Business Energy Services",
"smart_thermostat_zoning_retrofit is too broad; source supports programmable thermostat measures with specific rules",
"Hotel guestroom programmable thermostat measures are not eligible",
"Lighting controls must control qualifying interior lighting",
"Funding availability can block otherwise eligible projects"
],
"programType": "rebate",
"administrator": "Nevada Power Company d/b/a NV Energy",
"applicationUrl": null,
"websiteUrl": "[https://www.nvenergy.com/save-with-powershift/business-energy-services](https://www.nvenergy.com/save-with-powershift/business-energy-services)",
"sourceUrlsChecked": [
"[https://www.nvenergy.com/save-with-powershift/business-energy-services](https://www.nvenergy.com/save-with-powershift/business-energy-services)",
"[https://www.nvenergy.com/publish/content/dam/nvenergy/brochures_arch/save-with-powershift/commercial-energy-services/application-documents/NVE_Retrofit_Specifications.pdf](https://www.nvenergy.com/publish/content/dam/nvenergy/brochures_arch/save-with-powershift/commercial-energy-services/application-documents/NVE_Retrofit_Specifications.pdf)",
"[https://www.nvenergy.com/publish/content/dam/nvenergy/brochures_arch/save-with-powershift/commercial-energy-services/Retrofit-New-Construction-Policies-Procedures.pdf](https://www.nvenergy.com/publish/content/dam/nvenergy/brochures_arch/save-with-powershift/commercial-energy-services/Retrofit-New-Construction-Policies-Procedures.pdf)"
],
"evidenceText": "NV Energy’s business retrofit specifications include occupancy sensors, daylighting and integrated lighting controls, and programmable thermostat measures, with prenotification and program documentation rules.",
"reasoningNotes": "Preserve lighting controls and narrow thermostat matching to programmable thermostat retrofit rather than smart thermostat or zoning."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:4290",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"FL"
],
"counties": [],
"cities": [
"Ocala"
],
"utilityTerritories": [
"Ocala Electric Utility residential electric service territory"
],
"notes": "Rebates are applied to the municipal utility account for eligible residential customers."
},
"eligibleApplicantTypes": [
"residential_electric_customers",
"homeowners"
],
"eligibleSectors": [
"residential"
],
"eligibleRetrofitCategories": [
"solar_water_heating_system"
],
"hardRequirements": [
"Applicant must receive residential electric service from Ocala Electric Utility",
"Solar water heater must meet the qualifying energy-efficiency requirements on the application",
"Rebate application and required receipt or model documentation must be submitted within the specified deadline",
"Equipment must be new and installed at the permanent residence"
],
"blockers": [
"high_efficiency_hvac_replacement is a false positive for this solar hot water opportunity",
"Air conditioner and heat pump rebates are separate Ocala appliance rebate lines",
"Non-Ocala Electric Utility customers are not eligible",
"Used equipment and incomplete documentation are not eligible"
],
"programType": "rebate",
"administrator": "Ocala Electric Utility",
"applicationUrl": "[https://www.ocalafl.gov/home/showpublisheddocument/26388/638665758851870000](https://www.ocalafl.gov/home/showpublisheddocument/26388/638665758851870000)",
"websiteUrl": "[https://www.ocalafl.gov/government/electric-utility/rebates](https://www.ocalafl.gov/government/electric-utility/rebates)",
"sourceUrlsChecked": [
"[https://www.ocalafl.gov/government/electric-utility/rebates](https://www.ocalafl.gov/government/electric-utility/rebates)",
"[https://www.ocalafl.gov/home/showpublisheddocument/26388/638665758851870000](https://www.ocalafl.gov/home/showpublisheddocument/26388/638665758851870000)"
],
"evidenceText": "Ocala’s residential rebate application includes a distinct solar water heater rebate for OEU residential electric customers, while air conditioner and heat pump incentives are separate rebate lines.",
"reasoningNotes": "Keep solar water heating only for this DSIRE opportunity and block HVAC matching caused by the shared rebate page."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3168",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"TX"
],
"counties": [],
"cities": [],
"utilityTerritories": [
"Oncor Electric Delivery service territory"
],
"notes": "Available only where Oncor is the electric delivery provider and the project uses an approved participating service provider."
},
"eligibleApplicantTypes": [
"residential_electric_customers",
"homeowners"
],
"eligibleSectors": [
"residential"
],
"eligibleRetrofitCategories": [
"rooftop_solar_pv",
"battery_storage_system"
],
"hardRequirements": [
"Home must have Oncor as the electric delivery provider",
"New photovoltaic system must be installed with energy storage backup",
"Project must use an Oncor-approved participating service provider",
"Interconnection requirements apply",
"System size limit applies under program rules"
],
"blockers": [
"Existing solar arrays are not eligible",
"Solar-only projects without required storage are not supported by the checked program",
"Standalone battery storage unrelated to new PV is not eligible",
"Non-Oncor delivery customers are not eligible",
"Projects outside program year, funding, or size limits are blocked"
],
"programType": "rebate",
"administrator": "Oncor Electric Delivery",
"applicationUrl": null,
"websiteUrl": "[https://www.oncor.com/content/oncorwww/talot/en/home/get-started/residential/residentialsolar.html](https://www.oncor.com/content/oncorwww/talot/en/home/get-started/residential/residentialsolar.html)",
"sourceUrlsChecked": [
"[https://www.oncor.com/content/oncorwww/talot/en/home/get-started/residential/residentialsolar.html](https://www.oncor.com/content/oncorwww/talot/en/home/get-started/residential/residentialsolar.html)",
"[https://www.oncor.com/content/oncorwww/talot/en/home/residential.html](https://www.oncor.com/content/oncorwww/talot/en/home/residential.html)"
],
"evidenceText": "Oncor’s Residential Solar Program provides incentives through participating service providers for new photovoltaic systems with energy storage backup at homes served by Oncor.",
"reasoningNotes": "Both solar PV and battery storage are supported, but storage should be matched only when paired with the required new PV project."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5011",
"confidence": "medium",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"NY"
],
"counties": [],
"cities": [],
"utilityTerritories": [
"Orange and Rockland Utilities New York electric service territory"
],
"notes": "This repair applies to O&R New York residential electric customer incentives, not Rockland Electric Company New Jersey programs."
},
"eligibleApplicantTypes": [
"residential_electric_customers",
"homeowners",
"renters"
],
"eligibleSectors": [
"residential"
],
"eligibleRetrofitCategories": [
"smart_thermostat_demand_response_enrollment",
"heat_pump_hvac_retrofit",
"heat_pump_water_heater",
"insulation_upgrade",
"weatherization"
],
"hardRequirements": [
"Customer must have an eligible O&R New York electric account",
"Smart thermostat incentive requires central air conditioning, Wi-Fi, eligible thermostat, and enrollment in Smart Savers",
"Other listed measures must follow the applicable O&R New York incentive page and application requirements"
],
"blockers": [
"high_efficiency_refrigeration_equipment is unsupported for the current O&R New York residential page",
"Current refrigerator/freezer rebates found under Rockland Electric New Jersey or expired legacy materials should not match this New York opportunity",
"Thermostat matching should be narrowed to smart thermostat demand response enrollment, not zoning retrofit",
"Commercial refrigeration is not supported"
],
"programType": "rebate_and_demand_response",
"administrator": "Orange and Rockland Utilities, Inc.",
"applicationUrl": "[https://www.oru.com/en/save-money/rebates-incentives-credits/new-york-customers/incentives-for-residential-customers-ny/thermostat-rebate](https://www.oru.com/en/save-money/rebates-incentives-credits/new-york-customers/incentives-for-residential-customers-ny/thermostat-rebate)",
"websiteUrl": "[https://www.oru.com/en/save-money/rebates-incentives-credits/new-york-customers/incentives-for-residential-customers-ny](https://www.oru.com/en/save-money/rebates-incentives-credits/new-york-customers/incentives-for-residential-customers-ny)",
"sourceUrlsChecked": [
"[https://www.oru.com/en/save-money/rebates-incentives-credits/new-york-customers/incentives-for-residential-customers-ny](https://www.oru.com/en/save-money/rebates-incentives-credits/new-york-customers/incentives-for-residential-customers-ny)",
"[https://www.oru.com/en/save-money/rebates-incentives-credits/new-york-customers/incentives-for-residential-customers-ny/thermostat-rebate](https://www.oru.com/en/save-money/rebates-incentives-credits/new-york-customers/incentives-for-residential-customers-ny/thermostat-rebate)",
"[https://www.oru.com/en/save-money/rebates-incentives-credits/new-york-customers/incentives-for-residential-customers-ny/clean-heating-cooling-with-heat-pumps/heat-pump-equipment/swap-your-water-heater](https://www.oru.com/en/save-money/rebates-incentives-credits/new-york-customers/incentives-for-residential-customers-ny/clean-heating-cooling-with-heat-pumps/heat-pump-equipment/swap-your-water-heater)"
],
"evidenceText": "O&R’s New York residential pages support smart thermostat enrollment and other home efficiency incentives; current refrigeration rebates were not found for this New York opportunity.",
"reasoningNotes": "Block refrigeration. Keep thermostat only as a demand-response smart thermostat enrollment measure and include other current O&R New York residential efficiency categories."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3136",
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
"Oregon Trail Electric Cooperative service territory"
],
"notes": "Agriculture rebates are limited to OTEC member accounts and agricultural uses."
},
"eligibleApplicantTypes": [
"agricultural_members",
"farmers",
"ranchers",
"otec_member_owners"
],
"eligibleSectors": [
"agriculture"
],
"eligibleRetrofitCategories": [
"efficient_pump_replacement",
"variable_frequency_drive_retrofit",
"agricultural_irrigation_sprinkler_upgrade",
"agricultural_stock_water_tank",
"thermostatically_controlled_outlet"
],
"hardRequirements": [
"Applicant must be an OTEC member with qualifying agricultural use",
"Online rebate application and invoice are required",
"VFD measures must be installed on qualifying agricultural pumps and meet horsepower and equipment rules",
"Pump replacement measures must replace an old pump and meet pump-curve and horsepower rules",
"Inspection or harmonics testing may be required for specified pump projects"
],
"blockers": [
"Residential and standard commercial rebates are separate OTEC programs",
"Non-agricultural pump and VFD projects are not eligible under this opportunity",
"Equipment outside horsepower or pump-type requirements is blocked",
"Applications without required invoice or documentation are not eligible"
],
"programType": "rebate",
"administrator": "Oregon Trail Electric Cooperative",
"applicationUrl": "[https://www.otec.coop/agriculture-rebates](https://www.otec.coop/agriculture-rebates)",
"websiteUrl": "[https://www.otec.coop/agriculture-rebates](https://www.otec.coop/agriculture-rebates)",
"sourceUrlsChecked": [
"[https://www.otec.coop/agriculture-rebates](https://www.otec.coop/agriculture-rebates)",
"[https://www.otec.coop/agricultural](https://www.otec.coop/agricultural)"
],
"evidenceText": "OTEC’s agriculture rebate page supports VFDs added to agricultural pumps, pump upgrades, irrigation sprinkler upgrades, stock water tanks, and thermostatically controlled outlets for agricultural members.",
"reasoningNotes": "Pump replacement and VFD matches are source-backed, but only in agricultural OTEC service contexts."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22336",
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
"Otter Tail Power Company Minnesota electric service territory"
],
"notes": "This repair follows the Minnesota rebate form for the target state."
},
"eligibleApplicantTypes": [
"residential_electric_customers",
"homeowners"
],
"eligibleSectors": [
"residential"
],
"eligibleRetrofitCategories": [
"level_2_ev_charger_installation"
],
"hardRequirements": [
"Electricity at the installation site must be supplied by Otter Tail Power",
"New hardwired Level 2 charger required",
"Charger must be served on a qualifying controlled or off-peak rate",
"Receipt, invoice, equipment information, and account details required",
"Rebate request due by the stated annual deadline after purchase year"
],
"blockers": [
"Level 1, portable, and non-hardwired chargers are not supported by the checked form",
"No qualifying controlled or off-peak rate blocks eligibility",
"Non-Otter Tail Power customers are not eligible",
"DC fast chargers and vehicle purchase rebates are separate from this opportunity"
],
"programType": "rebate",
"administrator": "Otter Tail Power Company",
"applicationUrl": "[https://www.otpco.com/media/0i1awkwg/mn-electric-vehicle-charging-rebate-form-2026-fillable.pdf](https://www.otpco.com/media/0i1awkwg/mn-electric-vehicle-charging-rebate-form-2026-fillable.pdf)",
"websiteUrl": "[https://www.otpco.com/rebates-and-efficiency-programs/programs/electric-vehicle-rate/](https://www.otpco.com/rebates-and-efficiency-programs/programs/electric-vehicle-rate/)",
"sourceUrlsChecked": [
"[https://www.otpco.com/rebates-and-efficiency-programs/programs/electric-vehicle-rate/](https://www.otpco.com/rebates-and-efficiency-programs/programs/electric-vehicle-rate/)",
"[https://www.otpco.com/media/0i1awkwg/mn-electric-vehicle-charging-rebate-form-2026-fillable.pdf](https://www.otpco.com/media/0i1awkwg/mn-electric-vehicle-charging-rebate-form-2026-fillable.pdf)"
],
"evidenceText": "Otter Tail’s Minnesota EV charging rebate form supports a rebate for new hardwired Level 2 chargers installed where Otter Tail supplies electricity and served on a qualifying controlled rate.",
"reasoningNotes": "Preserve Level 2 EVSE only and block generic EV charging matches that do not meet hardwired and off-peak rate requirements."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5351",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"CA"
],
"counties": [],
"cities": [],
"utilityTerritories": [],
"notes": "Statewide California partial sales and use tax exemption for qualifying agricultural solar facilities and qualifying purchasers."
},
"eligibleApplicantTypes": [
"farmers",
"ranchers",
"agricultural_businesses",
"qualified_persons"
],
"eligibleSectors": [
"agriculture"
],
"eligibleRetrofitCategories": [
"agricultural_solar_pv_system",
"solar_pv_system"
],
"hardRequirements": [
"Purchaser must be a qualified person engaged in qualifying agricultural activity",
"Solar facility must be designed to provide power to qualified farm equipment or machinery",
"At least 50% of electricity generated must be used in production and harvesting of agricultural products",
"Purchaser must provide and retain the required exemption documentation"
],
"blockers": [
"submetering_energy_monitoring is a false positive; metering is documentation for eligibility, not an incentivized retrofit",
"rooftop_solar_pv is too narrow because qualifying agricultural solar can be ground-mounted or otherwise configured",
"Solar used primarily for non-agricultural loads is not eligible",
"This is a partial tax exemption, not a rebate"
],
"programType": "sales_tax_exemption",
"administrator": "California Department of Tax and Fee Administration",
"applicationUrl": null,
"websiteUrl": "[https://www.cdtfa.ca.gov/industry/green-technology/solar.htm](https://www.cdtfa.ca.gov/industry/green-technology/solar.htm)",
"sourceUrlsChecked": [
"[https://www.cdtfa.ca.gov/formspubs/pub235g.pdf](https://www.cdtfa.ca.gov/formspubs/pub235g.pdf)",
"[https://www.cdtfa.ca.gov/industry/agriculture/farming-exemptions.htm](https://www.cdtfa.ca.gov/industry/agriculture/farming-exemptions.htm)",
"[https://www.cdtfa.ca.gov/industry/green-technology/solar.htm](https://www.cdtfa.ca.gov/industry/green-technology/solar.htm)",
"[https://www.cdtfa.ca.gov/lawguides/vol2/suta/229-0010.html](https://www.cdtfa.ca.gov/lawguides/vol2/suta/229-0010.html)"
],
"evidenceText": "CDTFA guidance supports a partial sales and use tax exemption for agricultural solar facilities when the system primarily powers qualified farm equipment or machinery used in production or harvesting.",
"reasoningNotes": "Keep agricultural solar PV but block submetering and energy-monitoring categories because metering only substantiates primary use."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22289",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"CA"
],
"counties": [],
"cities": [
"Pasadena"
],
"utilityTerritories": [
"Pasadena Water and Power electric service territory"
],
"notes": "Limited to eligible nonresidential PWP electric customers within Pasadena."
},
"eligibleApplicantTypes": [
"commercial_electric_customers",
"multifamily_property_owners",
"workplace_charging_hosts",
"fleet_operators",
"schools",
"public_entities",
"nonprofit_customers"
],
"eligibleSectors": [
"commercial",
"multifamily_residential",
"public_sector",
"nonprofit",
"fleet"
],
"eligibleRetrofitCategories": [
"level_2_ev_charger_installation",
"dc_fast_charger_installation"
],
"hardRequirements": [
"Applicant must have an active eligible PWP commercial electric account in good standing",
"Charging equipment must be installed in PWP territory",
"Permits, licensed contractor installation, and final documentation are required",
"Level 2 networked equipment must meet connector, voltage, capacity, and listing requirements",
"DC fast chargers must meet the program’s higher-power and connector requirements"
],
"blockers": [
"Residential charger projects are covered by a separate PWP residential program",
"Non-PWP customers are not eligible",
"Leased, rebuilt, replacement, prize, or otherwise ineligible charging equipment is blocked",
"No permits, inspections, or required documentation blocks payment",
"Funding availability and public-access or use requirements can block matching"
],
"programType": "rebate",
"administrator": "Pasadena Water and Power",
"applicationUrl": "[https://pwp.cityofpasadena.net/wp-content/uploads/2022/01/CEVSE-Incentive-Application-form-fillable-10-1-2021.pdf](https://pwp.cityofpasadena.net/wp-content/uploads/2022/01/CEVSE-Incentive-Application-form-fillable-10-1-2021.pdf)",
"websiteUrl": "[https://pwp.cityofpasadena.net/commercialchargerrebate/](https://pwp.cityofpasadena.net/commercialchargerrebate/)",
"sourceUrlsChecked": [
"[https://pwp.cityofpasadena.net/commercialchargerrebate/](https://pwp.cityofpasadena.net/commercialchargerrebate/)",
"[https://pwp.cityofpasadena.net/wp-content/uploads/2022/01/CEVSE-Incentive-Application-form-fillable-10-1-2021.pdf](https://pwp.cityofpasadena.net/wp-content/uploads/2022/01/CEVSE-Incentive-Application-form-fillable-10-1-2021.pdf)",
"[https://pwp.cityofpasadena.net/wp-content/uploads/2022/07/Commercial-EV-Charging-Incentive-Program-TC-11-2-2023.pdf](https://pwp.cityofpasadena.net/wp-content/uploads/2022/07/Commercial-EV-Charging-Incentive-Program-TC-11-2-2023.pdf)"
],
"evidenceText": "PWP’s commercial charger program supports smart Level 2 charging and DC fast charging incentives for eligible nonresidential PWP customers, including workplace, multifamily, fleet, school, and public-use sites.",
"reasoningNotes": "Level 2 EV charging is source-backed. Add DC fast charging because official commercial terms include DC fast charger incentives."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22288",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"CA"
],
"counties": [],
"cities": [
"Pasadena"
],
"utilityTerritories": [
"Pasadena Water and Power residential electric service territory"
],
"notes": "Limited to PWP residential electric customers at the service address."
},
"eligibleApplicantTypes": [
"residential_electric_customers",
"homeowners"
],
"eligibleSectors": [
"residential"
],
"eligibleRetrofitCategories": [
"level_2_ev_charger_installation"
],
"hardRequirements": [
"Applicant must be an eligible PWP residential electric customer",
"Charger must be new Level 2 equipment installed at the service address",
"Wi-Fi or internet-connected chargers qualify for the higher charger rebate",
"Permit and inspection requirements apply for hardwired or new/modified 240-volt installations",
"Application must be submitted within the stated post-purchase deadline"
],
"blockers": [
"Commercial charging is a separate PWP program",
"EV purchase incentives are separate from charger installation matching",
"Level 1, socket-only, portable, leased, resold, rebuilt, and switchable Level 1/Level 2 equipment are not eligible",
"Non-PWP customers are not eligible",
"Unpermitted work or missing inspection documentation blocks eligibility"
],
"programType": "rebate",
"administrator": "Pasadena Water and Power",
"applicationUrl": "[https://myaccount.pwpweb.com](https://myaccount.pwpweb.com)",
"websiteUrl": "[https://pwp.cityofpasadena.net/residentialevrebate/](https://pwp.cityofpasadena.net/residentialevrebate/)",
"sourceUrlsChecked": [
"[https://pwp.cityofpasadena.net/residentialevrebate/](https://pwp.cityofpasadena.net/residentialevrebate/)",
"[https://pwp.cityofpasadena.net/evchargers/](https://pwp.cityofpasadena.net/evchargers/)",
"[https://myaccount.pwpweb.com](https://myaccount.pwpweb.com)"
],
"evidenceText": "PWP residential materials support rebates for new Level 2 home chargers, including higher rebates for Wi-Fi or internet-connected chargers, with permit, equipment, and submission requirements.",
"reasoningNotes": "Keep Level 2 charger installation. Block vehicle rebate and commercial charger matching because those are separate PWP opportunities."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5872",
"confidence": "high",
"availabilityStatus": "temporarily_closed",
"geography": {
"country": "US",
"states": [
"OR"
],
"counties": [],
"cities": [],
"utilityTerritories": [
"Portland General Electric service territory"
],
"notes": "PGE customer or PGE service-area location is favored or required by program design; RDF projects must deliver qualifying local renewable benefits."
},
"eligibleApplicantTypes": [
"nonprofit_organizations",
"public_entities",
"commercial_customers",
"multifamily_property_owners",
"community_organizations",
"for_profit_entities"
],
"eligibleSectors": [
"nonprofit",
"public_sector",
"commercial",
"multifamily_residential",
"community_facilities"
],
"eligibleRetrofitCategories": [
"solar_pv_system",
"battery_storage_system",
"micro_hydropower_system",
"renewable_energy_research_and_development"
],
"hardRequirements": [
"Project must be a new local renewable energy project, qualifying connected storage, or approved renewable market transformation project",
"Retroactive or already-completed projects are not eligible",
"Project must meet RDF application, OPUC approval, and completion requirements",
"Energy storage is required or encouraged for specified solar project types",
"Funding round deadlines and grant limits apply"
],
"blockers": [
"2025 application window closed June 30, 2025",
"window_replacement is a false positive",
"RDF does not fund roof, structural, window, or other retrofit costs as standalone measures",
"Standalone battery storage unrelated to a qualifying renewable project is not supported",
"Individual residential home projects are not eligible"
],
"programType": "grant",
"administrator": "Portland General Electric",
"applicationUrl": null,
"websiteUrl": "[https://portlandgeneral.com/about/who-we-are/community/renewable-dev-fund](https://portlandgeneral.com/about/who-we-are/community/renewable-dev-fund)",
"sourceUrlsChecked": [
"[https://portlandgeneral.com/about/who-we-are/community/renewable-dev-fund](https://portlandgeneral.com/about/who-we-are/community/renewable-dev-fund)",
"[https://portlandgeneral.com/about/who-we-are/community/renewable-dev-fund/rdf-frequently-asked-questions](https://portlandgeneral.com/about/who-we-are/community/renewable-dev-fund/rdf-frequently-asked-questions)"
],
"evidenceText": "PGE’s RDF funds new local renewable projects and connected storage through competitive grants; the 2025 application round closed June 30, 2025 and structural retrofits are not funded.",
"reasoningNotes": "Preserve renewable generation and storage only within RDF project boundaries. Block window replacement and general building retrofit matches."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2212",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"WA"
],
"counties": [],
"cities": [
"Port Angeles"
],
"utilityTerritories": [
"City of Port Angeles electric utility service territory"
],
"notes": "Residential rebates require City electric service and other Weatherwise eligibility rules."
},
"eligibleApplicantTypes": [
"residential_electric_customers",
"homeowners",
"renters"
],
"eligibleSectors": [
"residential"
],
"eligibleRetrofitCategories": [
"insulation_upgrade",
"ductless_heat_pump_hvac_retrofit",
"variable_speed_heat_pump_retrofit",
"heat_pump_water_heater",
"window_replacement"
],
"hardRequirements": [
"Home must currently be served electricity by the City of Port Angeles",
"Home must have electric heating equipment capable of heating the building",
"Advance written approval and a Notice to Proceed are required before work",
"City-authorized contractor process applies to core weatherization and heat pump measures",
"New construction is not eligible for insulation rebates"
],
"blockers": [
"Work performed before written City approval is not eligible",
"Homes outside City electric service are not eligible",
"Commercial and industrial rebates are handled on a separate conservation page",
"Non-electric heating conversions may require removal of non-electric heating equipment",
"Water conservation and stormwater rebates on the same page should not be merged into energy retrofit matching"
],
"programType": "rebate",
"administrator": "City of Port Angeles Public Works and Utilities",
"applicationUrl": null,
"websiteUrl": "[https://www.cityofpa.us/790/Residential-Conservation-and-Rebates-Opp](https://www.cityofpa.us/790/Residential-Conservation-and-Rebates-Opp)",
"sourceUrlsChecked": [
"[https://www.cityofpa.us/790/Residential-Conservation-and-Rebates-Opp](https://www.cityofpa.us/790/Residential-Conservation-and-Rebates-Opp)",
"[https://www.cityofpa.us/1329/Free-Weatherization-Program](https://www.cityofpa.us/1329/Free-Weatherization-Program)",
"[https://www.cityofpa.us/DocumentCenter/View/13745/Insulation-Rebate-Application-2023-V1](https://www.cityofpa.us/DocumentCenter/View/13745/Insulation-Rebate-Application-2023-V1)",
"[https://www.cityofpa.us/DocumentCenter/View/13741/Heat-Pump-Rebate-Application-2023-V1](https://www.cityofpa.us/DocumentCenter/View/13741/Heat-Pump-Rebate-Application-2023-V1)"
],
"evidenceText": "Port Angeles residential conservation pages list insulation, windows, heat pumps, and heat pump water heaters, with City electric service, electric heating, and written approval before work.",
"reasoningNotes": "Heat pump and insulation matches are source-backed. Additional window and heat pump water heater categories are included because they are on the same residential conservation program page."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:1036",
"confidence": "high",
"availabilityStatus": "active",
"geography": {
"country": "US",
"states": [
"NV"
],
"counties": [],
"cities": [],
"utilityTerritories": [],
"notes": "Nevada portfolio energy credit registration and tracking applies to qualifying renewable energy systems and market participants under Nevada RPS rules."
},
"eligibleApplicantTypes": [
"renewable_energy_system_owners",
"portfolio_energy_credit_aggregators",
"electric_service_providers",
"renewable_energy_market_participants"
],
"eligibleSectors": [
"commercial",
"industrial",
"utility",
"public_sector",
"agriculture",
"large_multifamily"
],
"eligibleRetrofitCategories": [
"solar_pv_system",
"solar_thermal_system",
"solar_water_heating_system"
],
"hardRequirements": [
"Owner must register an NVTREC account and submit the facility for approval",
"Facility must qualify as a renewable energy system or approved solar thermal system under Nevada rules",
"NVTREC currently tracks facilities larger than 150 kW",
"Quarterly metered data or approved reporting is required for credit certification",
"Credits are tracked, transferred, or retired in NVTREC rather than paid as an upfront rebate"
],
"blockers": [
"Not a rebate, grant, or direct installation incentive",
"Small systems at or below the NVTREC tracking threshold should not be matched to this record",
"Unregistered or unapproved facilities cannot earn tracked credits",
"Rooftop solar PV is not specifically required and small rooftop systems may be blocked by tracking rules",
"Nonrenewable efficiency retrofits should not be inferred from the credit-tracking program"
],
"programType": "performance_based_incentive_portfolio_energy_credit_tracking",
"administrator": "Public Utilities Commission of Nevada",
"applicationUrl": "[https://www.nvtrec.com/](https://www.nvtrec.com/)",
"websiteUrl": "[https://www.nvtrec.com/](https://www.nvtrec.com/)",
"sourceUrlsChecked": [
"[https://www.nvtrec.com/](https://www.nvtrec.com/)",
"[https://www.nvtrec.com/UI/Guest/FAQPage.aspx](https://www.nvtrec.com/UI/Guest/FAQPage.aspx)",
"[https://www.leg.state.nv.us/Register/2007Register/R104-07A.pdf](https://www.leg.state.nv.us/Register/2007Register/R104-07A.pdf)"
],
"evidenceText": "NVTREC lets renewable system owners register facilities and certify, track, transfer, or retire portfolio credits. It supports solar generation; Nevada regulations also credit eligible solar thermal heat as equivalent electricity.",
"reasoningNotes": "Keep solar PV and solar thermal/water heating as credit-generating resources, but block rebate-style matching and small rooftop systems that do not meet NVTREC tracking requirements."
}
],
"continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:22375"
}
