{
"schemaVersion": "retrofi_tax_gap_repair.v1",
"inputPromptSource": "",
"researchedAt": "2026-07-03",
"gapId": "ri_municipal_renewable_property_tax_ordinances",
"status": "partially_resolved",
"confidence": "medium",
"stateSources": [
{
"title": "Solar Guidance and Model Ordinance Development",
"url": "[https://energy.ri.gov/renewable-energy/solar/solar-guidance-and-model-ordinance-development](https://energy.ri.gov/renewable-energy/solar/solar-guidance-and-model-ordinance-development)",
"owner": "Rhode Island Office of Energy Resources",
"evidenceText": "Official OER page publishes the 2025 Inventory of Municipal Solar Ordinances, including ESS. Used as checklist/routing evidence only, not as direct municipal ordinance verification."
},
{
"title": "Inventory of Municipal Solar Ordinances Updated 2025 (Includes ESS)",
"url": "[https://energy.ri.gov/sites/g/files/xkgbur741/files/2025-07/Inventory%20of%20Municipal%20Solar%20Ordinances%20Updated%202025%20%28Includes%20ESS%29_0.pdf](https://energy.ri.gov/sites/g/files/xkgbur741/files/2025-07/Inventory%20of%20Municipal%20Solar%20Ordinances%20Updated%202025%20%28Includes%20ESS%29_0.pdf)",
"owner": "Rhode Island Office of Energy Resources",
"evidenceText": "Checklist source for municipalities where OER reports an adopted, addressed, or referenced solar/renewable tax ordinance."
},
{
"title": "R.I. Gen. Laws § 44-3-21 - Exemption from taxation of renewable energy systems",
"url": "[https://webserver.rilegislature.gov/Statutes/TITLE44/44-3/44-3-21.htm](https://webserver.rilegislature.gov/Statutes/TITLE44/44-3/44-3-21.htm)",
"owner": "Rhode Island General Assembly",
"evidenceText": "Authorizes city and town councils, by ordinance, to exempt from taxation any renewable energy system located in the city or town."
},
{
"title": "R.I. Gen. Laws § 44-5-3 - Levy of tax",
"url": "[https://webserver.rilegislature.gov/Statutes/TITLE44/44-5/44-5-3.htm](https://webserver.rilegislature.gov/Statutes/TITLE44/44-5/44-5-3.htm)",
"owner": "Rhode Island General Assembly",
"evidenceText": "Provides that renewable energy resources and associated equipment subject to tangible property taxation are taxed at $5.00 per kilowatt of AC nameplate capacity."
},
{
"title": "R.I. Gen. Laws § 44-5-12 - Valuation of real estate",
"url": "[https://webserver.rilegislature.gov/Statutes/TITLE44/44-5/44-5-12.htm](https://webserver.rilegislature.gov/Statutes/TITLE44/44-5/44-5-12.htm)",
"owner": "Rhode Island General Assembly",
"evidenceText": "Provides the real-property component formula for renewable energy resources where applicable, including the $3.50 per kilowatt AC capacity treatment."
},
{
"title": "R.I. Gen. Laws § 44-3-3 - Property exempt from taxation",
"url": "[https://webserver.rilegislature.gov/Statutes/TITLE44/44-3/44-3-3.htm](https://webserver.rilegislature.gov/Statutes/TITLE44/44-3/44-3-3.htm)",
"owner": "Rhode Island General Assembly",
"evidenceText": "Includes exemptions relevant to renewable energy resources, including residential renewable energy systems and associated equipment placed in service after December 31, 2015, and renewable energy resources employed by manufacturers."
},
{
"title": "300-RICR-00-00-2 - Tangible Tax Value for Commercial Renewable Energy Systems",
"url": "[https://rules.sos.ri.gov/regulations/part/300-00-00-2](https://rules.sos.ri.gov/regulations/part/300-00-00-2)",
"owner": "Rhode Island Department of State / Rhode Island Office of Energy Resources",
"evidenceText": "Implements the commercial renewable tangible tax formula, defines REG, net metering, and virtual net metering, and describes municipal waiver authority and required documentation such as interconnection and program enrollment materials."
}
],
"municipalityRows": [
{
"municipality": "Barrington",
"treatment": "waiver_or_exemption",
"directOfficialSource": {
"title": "Town Code Chapter 169, Article VII - Tax Exemption for Renewable Energy Systems",
"url": "[https://ecode360.com/30619893](https://ecode360.com/30619893)",
"owner": "Town of Barrington",
"evidenceText": "Adopts a §44-3-21 renewable energy exemption. Exempts the additional cost or value of a renewable energy device used as the primary or auxiliary power system for the energy needs of the property where located, not exceeding 250 kW. Systems over 250 kW primarily producing energy for sale beyond the property may be exempt only by Town Council-approved contract. Annual assessor application required by March 15."
},
"applicability": {
"commercial": true,
"residential": true,
"reg": null,
"netMetered": null,
"virtualNetMetered": null,
"batteryStorage": null,
"tangibleProperty": null,
"realProperty": true
},
"runtimeReady": false,
"requiredAssessorInputs": [
"installed renewable system capacity in kW",
"property use and class",
"whether system serves onsite energy needs",
"whether system primarily sells energy beyond the property",
"Town Council contract if system exceeds 250 kW or primarily sells energy",
"annual assessor exemption application by March 15"
]
},
{
"municipality": "Bristol",
"treatment": "unclear",
"directOfficialSource": {
"title": "Town Council agenda referencing Ordinance 2016-01 and Ordinance 2016-05 for renewable and solar tax exemptions",
"url": "[https://bristol-ri.municodemeetings.com/sites/bristol-ri.municodemeetings.com/files/fileattachments/town_council/meeting/8101/03-30-2016_council_agenda.pdf](https://bristol-ri.municodemeetings.com/sites/bristol-ri.municodemeetings.com/files/fileattachments/town_council/meeting/8101/03-30-2016_council_agenda.pdf)",
"owner": "Town of Bristol",
"evidenceText": "direct_source_missing_current_code_text. Official agenda references Chapter 27 Taxation amendments for renewable energy systems and a new Article II for solar energy systems, including residential solar equipment exemptions. Current Chapter 27 Article II text was not retrieved from an official rendered municipal code source."
},
"applicability": {
"commercial": null,
"residential": true,
"reg": null,
"netMetered": null,
"virtualNetMetered": null,
"batteryStorage": null,
"tangibleProperty": null,
"realProperty": null
},
"runtimeReady": false,
"requiredAssessorInputs": [
"current Chapter 27 Article II §§27-26 through 27-30 text",
"whether ordinance was finally adopted and remains current",
"system type and property class",
"residential solar equipment eligibility",
"assessor application requirements"
]
},
{
"municipality": "Burrillville",
"treatment": "no_direct_source_found",
"directOfficialSource": {
"title": "direct_source_missing - Chapter 25, Article II, Sec. 25-42 not located",
"url": "[https://burrillville.granicus.com/MediaPlayer.php?clip_id=673&view_id=3](https://burrillville.granicus.com/MediaPlayer.php?clip_id=673&view_id=3)",
"owner": "Town of Burrillville",
"evidenceText": "direct_source_missing. Official meeting page references Chapter 25 Taxation and discussion/advisory items related to adopting an ordinance for taxation of renewable energy systems, but current Sec. 25-42 ordinance text was not located from an official municipal code source."
},
"applicability": {
"commercial": null,
"residential": null,
"reg": null,
"netMetered": null,
"virtualNetMetered": null,
"batteryStorage": null,
"tangibleProperty": null,
"realProperty": null
},
"runtimeReady": false,
"requiredAssessorInputs": [
"current Chapter 25 Article II Sec. 25-42 text",
"whether renewable-specific language was adopted and remains in effect",
"system class and taxable property class",
"assessor documentation requirements"
]
},
{
"municipality": "Coventry",
"treatment": "adopted_tax_ordinance",
"directOfficialSource": {
"title": "Town Code Chapter 217, Article VII - Classification of Taxable Property",
"url": "[https://ecode360.com/6648206](https://ecode360.com/6648206)",
"owner": "Town of Coventry",
"evidenceText": "Authorizes the assessor, in accordance with §44-5-3(c), to levy tax on renewable energy tangible property under OER rules. Provides that commercial net-metered renewable energy systems whose sole purpose is to offset electricity bills and not sell power back to the distribution system are exempt under §44-3-21."
},
"applicability": {
"commercial": true,
"residential": null,
"reg": null,
"netMetered": true,
"virtualNetMetered": null,
"batteryStorage": null,
"tangibleProperty": true,
"realProperty": null
},
"runtimeReady": false,
"requiredAssessorInputs": [
"AC nameplate capacity if taxable",
"commercial status",
"net-metered status",
"whether system solely offsets electricity bills",
"whether system sells power back to the distribution system",
"interconnection and program enrollment documentation"
]
},
{
"municipality": "Cranston",
"treatment": "adopted_tax_ordinance",
"directOfficialSource": {
"title": "City Code §3.16.060 - Renewable Energy Systems",
"url": "[https://ecode360.com/46503900](https://ecode360.com/46503900)",
"owner": "City of Cranston",
"evidenceText": "Applies to renewable resource projects executing interconnection service agreements after January 1, 2017. Defines REG, net metering, and virtual net metering; sets tangible treatment at $5 per kW AC; contains local real estate rate language; and waives tax for commercial renewables or net-metered systems designed to offset or reduce bills and not developed for commercial revenue. Requires interconnection and program enrollment documentation."
},
"applicability": {
"commercial": true,
"residential": true,
"reg": true,
"netMetered": true,
"virtualNetMetered": true,
"batteryStorage": null,
"tangibleProperty": true,
"realProperty": true
},
"runtimeReady": false,
"requiredAssessorInputs": [
"final interconnection service agreement execution date",
"AC nameplate capacity",
"program enrollment type: REG, net metering, or virtual net metering",
"whether project is commercial revenue-generating or bill-offset only",
"decommissioned or abandoned status",
"reconciliation of local real-property rate language with current state $3.50 per AC kW formula"
]
},
{
"municipality": "Cumberland",
"treatment": "waiver_or_exemption",
"directOfficialSource": {
"title": "Town Code Chapter 36, §§36-6 through 36-9 - Renewable Energy Systems",
"url": "[https://ecode360.com/30179526](https://ecode360.com/30179526)",
"owner": "Town of Cumberland",
"evidenceText": "Adopts findings under §44-3-21. Exempts the additional cost or value of a renewable energy system used as the primary or auxiliary power system for the heating or energy needs of residential, commercial, or industrial property where located, not exceeding 250 kW. Systems over 250 kW primarily producing energy for sale beyond the property may be exempt only by Town Council-approved contract. Annual application required by January 1."
},
"applicability": {
"commercial": true,
"residential": true,
"reg": null,
"netMetered": null,
"virtualNetMetered": null,
"batteryStorage": null,
"tangibleProperty": null,
"realProperty": true
},
"runtimeReady": false,
"requiredAssessorInputs": [
"installed capacity in kW",
"residential, commercial, or industrial property class",
"onsite use versus sale beyond property",
"Town Council contract if system exceeds 250 kW or primarily sells energy",
"annual assessor application by January 1"
]
},
{
"municipality": "East Greenwich",
"treatment": "adopted_tax_ordinance",
"directOfficialSource": {
"title": "Town Code Chapter 227, Article XV - Exemption for Renewable Energy Systems",
"url": "[https://ecode360.com/32395981](https://ecode360.com/32395981)",
"owner": "Town of East Greenwich",
"evidenceText": "Adopts a §44-3-21 exemption effective January 1, 2017, for qualifying onsite renewable systems up to 250 kW, with Town Council contract required for systems over 250 kW primarily producing energy for sale beyond the property. Also adopts OER renewable tangible tax rules, recognizes residential and manufacturing exemptions, defines REG, net metering, and virtual net metering, and requires interconnection and program enrollment documentation."
},
"applicability": {
"commercial": true,
"residential": true,
"reg": true,
"netMetered": true,
"virtualNetMetered": true,
"batteryStorage": null,
"tangibleProperty": true,
"realProperty": true
},
"runtimeReady": false,
"requiredAssessorInputs": [
"installed capacity in kW",
"AC nameplate capacity",
"interconnection service agreement date",
"program enrollment type",
"onsite use versus sale beyond property",
"Town Council contract if system exceeds 250 kW or primarily sells energy",
"annual assessor application by March 15"
]
},
{
"municipality": "East Providence",
"treatment": "no_direct_source_found",
"directOfficialSource": {
"title": "direct_source_missing - Sec. 16-98 not located",
"url": "",
"owner": "City of East Providence",
"evidenceText": "direct_source_missing. OER inventory reports Sec. 16-98 with minor systems exempt and major systems fully taxable, but a direct official municipal source for the current ordinance text was not located."
},
"applicability": {
"commercial": null,
"residential": null,
"reg": null,
"netMetered": null,
"virtualNetMetered": null,
"batteryStorage": null,
"tangibleProperty": null,
"realProperty": null
},
"runtimeReady": false,
"requiredAssessorInputs": [
"current Sec. 16-98 ordinance text",
"definitions of minor and major systems",
"property class",
"whether exemption applies to tangible property, real property, or both"
]
},
{
"municipality": "Exeter",
"treatment": "adopted_tax_ordinance",
"directOfficialSource": {
"title": "Town Code Chapter 42, Article XI - Renewable Property Tax provisions",
"url": "[https://library.municode.com/ri/exeter/codes/code_of_ordinances?nodeId=PTIICOOR_CH42TA_ARTIIREPR_DIV2EXEL_S42-54APPR](https://library.municode.com/ri/exeter/codes/code_of_ordinances?nodeId=PTIICOOR_CH42TA_ARTIIREPR_DIV2EXEL_S42-54APPR)",
"owner": "Town of Exeter",
"evidenceText": "Official municipal code search result states that, pursuant to §44-5-3(c), commercial renewable energy systems are subject to tangible tax. Full current Chapter 42 Article XI text was not retrieved in rendered form."
},
"applicability": {
"commercial": true,
"residential": null,
"reg": null,
"netMetered": null,
"virtualNetMetered": null,
"batteryStorage": null,
"tangibleProperty": true,
"realProperty": null
},
"runtimeReady": false,
"requiredAssessorInputs": [
"current Chapter 42 Article XI text",
"AC nameplate capacity",
"commercial status",
"interconnection and program enrollment documentation if required by local code"
]
},
{
"municipality": "Glocester",
"treatment": "adopted_tax_ordinance",
"directOfficialSource": {
"title": "Town Code Chapter 247, Article XI - Renewable Energy Tax and Exemption",
"url": "[https://ecode360.com/30421077](https://ecode360.com/30421077)",
"owner": "Town of Glocester",
"evidenceText": "Authorizes the assessor to levy tax on renewable energy tangible property under §44-5-3(c) and OER rules. Recognizes residential and manufacturing exemptions under §44-3-3(a)(48) and (49). Exempts commercial net-metered renewable systems whose sole purpose is to offset electricity bills and not sell power back. Requires interconnection application, program enrollment, and final interconnection service agreement documentation."
},
"applicability": {
"commercial": true,
"residential": true,
"reg": true,
"netMetered": true,
"virtualNetMetered": null,
"batteryStorage": null,
"tangibleProperty": true,
"realProperty": null
},
"runtimeReady": false,
"requiredAssessorInputs": [
"AC nameplate capacity",
"commercial, residential, or manufacturing status",
"net-metered status",
"REG versus net metering program enrollment",
"whether system solely offsets bills and does not sell power back",
"interconnection application and final interconnection service agreement"
]
},
{
"municipality": "Hopkinton",
"treatment": "adopted_tax_ordinance",
"directOfficialSource": {
"title": "Solar Taxation",
"url": "[https://www.hopkintonri.gov/tax-assessor/pages/solar-taxation](https://www.hopkintonri.gov/tax-assessor/pages/solar-taxation)",
"owner": "Town of Hopkinton Tax Assessor",
"evidenceText": "Town assessor page states that, under §44-5-3, equipment used for a commercially operating solar array can be taxed at $5.00 per kilowatt of nameplate capacity and billed separately as tangible property. It also states that net-metered solar arrays used solely to meet residential consumption needs are tax exempt."
},
"applicability": {
"commercial": true,
"residential": true,
"reg": null,
"netMetered": true,
"virtualNetMetered": null,
"batteryStorage": null,
"tangibleProperty": true,
"realProperty": null
},
"runtimeReady": false,
"requiredAssessorInputs": [
"commercial operating status",
"nameplate capacity in kW",
"net-metering status",
"whether generation solely meets residence consumption needs",
"assessor classification and billing determination"
]
},
{
"municipality": "Lincoln",
"treatment": "adopted_tax_ordinance",
"directOfficialSource": {
"title": "Town Code Chapter 228, Article XI - Renewable Energy Exemption",
"url": "[https://ecode360.com/36631777](https://ecode360.com/36631777)",
"owner": "Town of Lincoln",
"evidenceText": "Authorizes assessor to levy tax on renewable energy tangible property under §44-5-3(c) and OER rules. Recognizes residential and manufacturing exemptions under §44-3-3(a)(48) and (49). Exempts commercial net-metered renewable systems whose sole purpose is to offset electricity bills and not sell power back. Requires National Grid interconnection application, REG or net metering program enrollment documentation, and final interconnection service agreement."
},
"applicability": {
"commercial": true,
"residential": true,
"reg": true,
"netMetered": true,
"virtualNetMetered": null,
"batteryStorage": null,
"tangibleProperty": true,
"realProperty": null
},
"runtimeReady": false,
"requiredAssessorInputs": [
"AC nameplate capacity",
"property and taxpayer class",
"REG or net-metering program enrollment",
"commercial revenue purpose versus bill-offset purpose",
"interconnection application",
"final interconnection service agreement"
]
},
{
"municipality": "North Kingstown",
"treatment": "adopted_tax_ordinance",
"directOfficialSource": {
"title": "Town Council agenda and second-reading agenda for Sec. 19-41 - Taxation of Renewable Energy Systems",
"url": "[https://www.northkingstownri.gov/AgendaCenter/ViewFile/Agenda/_03052018-1317](https://www.northkingstownri.gov/AgendaCenter/ViewFile/Agenda/_03052018-1317)",
"owner": "Town of North Kingstown",
"evidenceText": "Official agenda materials report addition of Sec. 19-41, Taxation of Renewable Energy Systems. Earlier official agenda text states the assessor would be authorized under §44-5-3(c) to levy tax on renewable energy tangible property of commercial energy systems according to OER rules, with an exception not fully captured in retrieved text."
},
"applicability": {
"commercial": true,
"residential": null,
"reg": null,
"netMetered": null,
"virtualNetMetered": null,
"batteryStorage": null,
"tangibleProperty": true,
"realProperty": null
},
"runtimeReady": false,
"requiredAssessorInputs": [
"current Sec. 19-41 ordinance text",
"full exception language",
"AC nameplate capacity",
"commercial status",
"program enrollment and interconnection documentation"
]
},
{
"municipality": "North Providence",
"treatment": "no_direct_source_found",
"directOfficialSource": {
"title": "direct_source_missing - Chapter 32, Article I, Sec. 32-151 not located",
"url": "[https://clerkshq.com/NorthProvidence-ri](https://clerkshq.com/NorthProvidence-ri)",
"owner": "Town of North Providence",
"evidenceText": "direct_source_missing. Official ClerkBase town code portal located, but the renewable energy exemption or stabilization text reported by OER for Chapter 32/Sec. 32-151 was not retrieved. OER reports that, if the Town Council makes the determination in Sec. 32-151, an exemption or stabilization may be granted for personal property taxes for a renewable energy system in town."
},
"applicability": {
"commercial": null,
"residential": null,
"reg": null,
"netMetered": null,
"virtualNetMetered": null,
"batteryStorage": null,
"tangibleProperty": null,
"realProperty": null
},
"runtimeReady": false,
"requiredAssessorInputs": [
"current Chapter 32/Sec. 32-151 text",
"Town Council determination or approval record",
"whether exemption or stabilization is for personal/tangible property only",
"system class and capacity"
]
},
{
"municipality": "North Smithfield",
"treatment": "adopted_tax_ordinance",
"directOfficialSource": {
"title": "Town Code Chapter 301, Article VII - Taxation of Renewable Energy Systems",
"url": "[https://ecode360.com/37921965](https://ecode360.com/37921965)",
"owner": "Town of North Smithfield",
"evidenceText": "Authorizes assessor to levy tax on renewable energy tangible property under §44-5-3(c) and OER rules. States payment is $5 per kW of AC capacity for commercial renewable energy systems. Recognizes residential and manufacturing exemptions under §44-3-3(a)(48) and (49). Exempts commercial net-metered systems whose sole purpose is to offset electricity bills and not sell power back. Requires interconnection, program enrollment, and final ISA documentation."
},
"applicability": {
"commercial": true,
"residential": true,
"reg": true,
"netMetered": true,
"virtualNetMetered": null,
"batteryStorage": null,
"tangibleProperty": true,
"realProperty": null
},
"runtimeReady": false,
"requiredAssessorInputs": [
"AC nameplate capacity",
"commercial, residential, or manufacturing status",
"REG or net-metering program enrollment",
"bill-offset versus power-sale purpose",
"interconnection application",
"final interconnection service agreement",
"any additional assessor-required documentation"
]
},
{
"municipality": "Richmond",
"treatment": "unclear",
"directOfficialSource": {
"title": "Town Code table of contents - Chapter 3.55 Taxation of Commercial Renewable Energy Systems",
"url": "[https://clerkshq.com/Content/Richmond-ri/code/RichmondRI-TOC.htm](https://clerkshq.com/Content/Richmond-ri/code/RichmondRI-TOC.htm)",
"owner": "Town of Richmond",
"evidenceText": "direct_source_missing_full_section_text. Official town code table of contents confirms Chapter 3.55, Taxation of Commercial Renewable Energy Systems, including purpose, definitions, valuation, and applicability sections. OER reports that systems covered under §44-3-3(a)(22), (48), and (49) are exempt under Sec. 3.55.040, but the full current section text was not retrieved."
},
"applicability": {
"commercial": true,
"residential": null,
"reg": null,
"netMetered": null,
"virtualNetMetered": null,
"batteryStorage": null,
"tangibleProperty": true,
"realProperty": null
},
"runtimeReady": false,
"requiredAssessorInputs": [
"current §§3.55.030 and 3.55.040 text",
"whether system falls under §44-3-3(a)(22), (48), or (49)",
"commercial status",
"AC nameplate capacity",
"program enrollment and interconnection documentation if required"
]
},
{
"municipality": "Smithfield",
"treatment": "waiver_or_exemption",
"directOfficialSource": {
"title": "Town Code §321-11.3 - Renewable energy tax exemption",
"url": "[https://ecode360.com/8257147](https://ecode360.com/8257147)",
"owner": "Town of Smithfield",
"evidenceText": "Exempts the additional cost or value of a renewable energy device used as the primary or auxiliary power system for the energy needs of the property where located, not exceeding 250 kW. For systems over 250 kW primarily producing energy for sale beyond the property, the Town Council may approve a contractual agreement specifying the amount to be exempt."
},
"applicability": {
"commercial": true,
"residential": true,
"reg": null,
"netMetered": null,
"virtualNetMetered": null,
"batteryStorage": null,
"tangibleProperty": null,
"realProperty": true
},
"runtimeReady": false,
"requiredAssessorInputs": [
"installed system capacity in kW",
"onsite energy use versus sale beyond property",
"property class",
"Town Council contract for systems over 250 kW or primarily selling energy",
"assessor exemption determination"
]
},
{
"municipality": "South Kingstown",
"treatment": "unclear",
"directOfficialSource": {
"title": "Town Council minutes referencing Chapter 17 Taxation solar energy systems taxation ordinance",
"url": "[https://clerkshq.com/Content/SouthKingstown-ri/council/2018/nov13_18tc.htm](https://clerkshq.com/Content/SouthKingstown-ri/council/2018/nov13_18tc.htm)",
"owner": "Town of South Kingstown",
"evidenceText": "Official minutes show authorization to advertise a public hearing for proposed Chapter 17 Taxation amendments establishing a solar energy systems taxation ordinance in accordance with OER Commercial Renewable Energy Systems Tangible Tax Value rules, effective January 1, 2017. OER reports adopted Chapter 17, Article VI, Sec. 17-70, but current full code text and final adoption text were not retrieved."
},
"applicability": {
"commercial": true,
"residential": null,
"reg": null,
"netMetered": null,
"virtualNetMetered": null,
"batteryStorage": null,
"tangibleProperty": true,
"realProperty": null
},
"runtimeReady": false,
"requiredAssessorInputs": [
"current Chapter 17 Article VI Sec. 17-70 text",
"final adoption record",
"commercial status",
"AC nameplate capacity",
"interconnection and program enrollment documentation"
]
},
{
"municipality": "Warren",
"treatment": "waiver_or_exemption",
"directOfficialSource": {
"title": "Town Code Sec. 7-122 - Solar device exemption",
"url": "[https://library.municode.com/ri/warren/codes/code_of_ordinances?nodeId=THCO_CH7FITA_ARTVIREESNILTA_S7-145DE](https://library.municode.com/ri/warren/codes/code_of_ordinances?nodeId=THCO_CH7FITA_ARTVIREESNILTA_S7-145DE)",
"owner": "Town of Warren",
"evidenceText": "Official municipal code search route identifies Sec. 7-122 referencing §44-3-21 and exemption of additional value of solar devices. OER reports this as a 20-year exemption for residential systems. Full rendered Sec. 7-122 text was not retrieved."
},
"applicability": {
"commercial": false,
"residential": true,
"reg": null,
"netMetered": null,
"virtualNetMetered": null,
"batteryStorage": null,
"tangibleProperty": null,
"realProperty": true
},
"runtimeReady": false,
"requiredAssessorInputs": [
"current Sec. 7-122 text",
"residential property status",
"installation date",
"whether solar device is primary or auxiliary power system for residential property needs",
"20-year exemption period start and end",
"assessor application requirements"
]
},
{
"municipality": "Warwick",
"treatment": "adopted_tax_ordinance",
"directOfficialSource": {
"title": "City Council minutes approving PCO-35-21 amendment to Sec. 74-52 - Renewable energy system tax exemption",
"url": "[https://www.warwickri.gov/city-council-legislative-department/minutes/regular-businessregular-public-hearing-minutes-7](https://www.warwickri.gov/city-council-legislative-department/minutes/regular-businessregular-public-hearing-minutes-7)",
"owner": "City of Warwick",
"evidenceText": "Official minutes show approval of PCO-35-21 amending Sec. 74-52 to conform tax levies and exemptions of renewable energy systems with Rhode Island General Laws and to require documentation to be submitted to the City of Warwick. Current full Sec. 74-52 code text was not retrieved from an official code source."
},
"applicability": {
"commercial": true,
"residential": true,
"reg": null,
"netMetered": null,
"virtualNetMetered": null,
"batteryStorage": null,
"tangibleProperty": true,
"realProperty": null
},
"runtimeReady": false,
"requiredAssessorInputs": [
"current Sec. 74-52 text",
"required city documentation",
"commercial, residential, or manufacturing status",
"AC nameplate capacity",
"program enrollment and interconnection documentation",
"revenue-generating versus bill-offset purpose"
]
},
{
"municipality": "West Greenwich",
"treatment": "adopted_tax_ordinance",
"directOfficialSource": {
"title": "Town Code Chapter 325, Article VII - Renewable Energy Systems",
"url": "[https://ecode360.com/33211768](https://ecode360.com/33211768)",
"owner": "Town of West Greenwich",
"evidenceText": "Authorizes Town Council to enter tax stabilization agreements up to 25 years and to exempt or set PILOT treatment for renewable energy systems under §44-3-21. Authorizes assessor to levy tax on renewable energy tangible property under OER rules. Exempts commercial net-metered systems whose sole purpose is to offset electricity bills and not sell power back. Requires interconnection, REG or net-metering enrollment, and final ISA documentation."
},
"applicability": {
"commercial": true,
"residential": true,
"reg": true,
"netMetered": true,
"virtualNetMetered": null,
"batteryStorage": null,
"tangibleProperty": true,
"realProperty": null
},
"runtimeReady": false,
"requiredAssessorInputs": [
"AC nameplate capacity",
"REG or net-metering enrollment",
"commercial revenue purpose versus bill-offset purpose",
"interconnection application",
"final interconnection service agreement",
"Town Council stabilization, exemption, or PILOT agreement if applicable"
]
},
{
"municipality": "West Warwick",
"treatment": "adopted_tax_ordinance",
"directOfficialSource": {
"title": "Ordinance No. 2017-12 / Article V Sec. 18-54 - Renewable energy systems",
"url": "[https://mcclibraryfunctions.azurewebsites.us/api/ordinanceDownload/10269/835757/pdf?forceDownload=true](https://mcclibraryfunctions.azurewebsites.us/api/ordinanceDownload/10269/835757/pdf?forceDownload=true)",
"owner": "Town of West Warwick / Municode",
"evidenceText": "Official ordinance download route identifies Ordinance No. 2017-12. Search result text states that West Warwick exempts from taxation commercial net-metered renewable energy systems whose sole purpose is to offset electricity bills and not sell power back. The PDF/source could not be fetched in full during verification, and current Sec. 18-54 text was not retrieved."
},
"applicability": {
"commercial": true,
"residential": null,
"reg": null,
"netMetered": true,
"virtualNetMetered": null,
"batteryStorage": null,
"tangibleProperty": true,
"realProperty": null
},
"runtimeReady": false,
"requiredAssessorInputs": [
"current Article V Sec. 18-54 text",
"AC nameplate capacity",
"commercial status",
"net-metered status",
"whether system solely offsets electricity bills",
"whether system sells power back",
"interconnection and program enrollment documentation"
]
},
{
"municipality": "Westerly",
"treatment": "adopted_tax_ordinance",
"directOfficialSource": {
"title": "Town Code Chapter 229, Article IV - Exemption for Renewable Energy Systems",
"url": "[https://ecode360.com/7755689](https://ecode360.com/7755689)",
"owner": "Town of Westerly",
"evidenceText": "Recognizes residential and manufacturing exemptions under §44-3-3(a)(48) and (49). Authorizes assessor to levy tax on renewable energy tangible property under OER rules. Exempts commercial net-metered renewable systems whose sole purpose is to offset electricity bills and not sell power back. Requires interconnection application, REG or net-metering program enrollment, and final ISA documentation."
},
"applicability": {
"commercial": true,
"residential": true,
"reg": true,
"netMetered": true,
"virtualNetMetered": null,
"batteryStorage": null,
"tangibleProperty": true,
"realProperty": null
},
"runtimeReady": false,
"requiredAssessorInputs": [
"AC nameplate capacity",
"commercial, residential, or manufacturing status",
"REG or net-metering program enrollment",
"bill-offset versus power-sale purpose",
"interconnection application",
"final interconnection service agreement"
]
},
{
"municipality": "Woonsocket",
"treatment": "adopted_tax_ordinance",
"directOfficialSource": {
"title": "City Code Article V, Secs. 2-76 through 2-78 - Tax Exemption for Wholesaler's Inventory and Certain Renewable Energy Systems",
"url": "[https://clerkshq.com/Content/Woonsocket-ri/books/code/woonc02.htm](https://clerkshq.com/Content/Woonsocket-ri/books/code/woonc02.htm)",
"owner": "City of Woonsocket",
"evidenceText": "Establishes a program to stabilize taxation upon the valuation of solar energy systems. Defines solar energy projects and systems to include physical assets needed to convert sunlight into electrical energy and assets required to connect generation to the grid or building distribution equipment. Requires application at or before permit application, including installed capacity in kW and system plans. Applies a PILOT-style rate to installed capacity, payable on the tangible property tax bill schedule, with 20-year enrollment. Also addresses property exempt under §44-3-3 and City Council approval before certain exempt property is deemed taxable or assessed on a real estate bill."
},
"applicability": {
"commercial": true,
"residential": null,
"reg": null,
"netMetered": null,
"virtualNetMetered": null,
"batteryStorage": null,
"tangibleProperty": true,
"realProperty": true
},
"runtimeReady": false,
"requiredAssessorInputs": [
"installed capacity in kW",
"permit application date",
"system plans and description",
"current assessor PILOT/stabilization rate cycle",
"20-year enrollment status",
"whether property is exempt under §44-3-3",
"City Council resolution if exempt property is to be treated as taxable or assessed on a real estate bill"
]
}
],
"runtimePatch": {
"targetDataFile": "data/tax_local_workflow_rules.json",
"workflowId": "local_tax_ri_renewable_property_tax_dsire_22798_v1",
"fieldsToUpdate": {
"sourceVerificationStatus": "municipal_source_checklist_partially_resolved",
"runtimeImportBlockedReason": "Rows require assessor-specific inputs and several OER-listed municipalities still lack direct current municipal ordinance text. Do not calculate user-facing savings from these rows."
},
"municipalRowsToAddOrUpdate": []
},
"remainingGaps": [
"Bristol: direct current Chapter 27 Article II §§27-26 through 27-30 text was not retrieved; official agenda verifies ordinance activity only.",
"Burrillville: current Chapter 25 Article II Sec. 25-42 municipal code text was not found; official meeting page and OER inventory route to it.",
"East Providence: direct Sec. 16-98 municipal source was not found.",
"Exeter: official municipal code search result confirms commercial tangible renewable tax language, but full Chapter 42 Article XI text was not retrieved.",
"North Kingstown: official agendas verify route and passage for Sec. 19-41, but full current code and exception text were not retrieved.",
"North Providence: direct Chapter 32/Sec. 32-151 code text was not found in official ClerkBase materials retrieved.",
"Richmond: official table of contents confirms Chapter 3.55, but sections 3.55.030 and 3.55.040 full text were not retrieved.",
"South Kingstown: official minutes show Chapter 17 solar taxation ordinance process, but current Sec. 17-70 text and final adoption text were not retrieved.",
"Warren: direct rendered Municode text for Sec. 7-122 was not retrieved; OER and official search routing indicate a residential solar additional-value exemption.",
"Warwick: official adoption minutes were located, but current Sec. 74-52 full code text was not retrieved from an official code host.",
"West Warwick: official ordinance download route was located, but the PDF could not be fetched in full and current Sec. 18-54 text was not retrieved."
]
}
