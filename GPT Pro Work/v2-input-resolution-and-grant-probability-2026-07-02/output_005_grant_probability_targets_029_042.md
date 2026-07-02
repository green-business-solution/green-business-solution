{
"schemaVersion": "retrofi_grant_probability_repair.v1",
"researchedAt": "2026-07-02",
"promptId": "grant_probability_029_042",
"batchRange": "029-042",
"repairs": [
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22772",
"effectId": "effect_grant_expected_value_1_9221facf5f8b2349",
"programName": "Leading by Example Solar-Decarbonization Grant Program",
"availabilityStatus": "active",
"cashValueClassification": "cash_grant",
"sourceConfidence": "medium",
"grantValueModelKind": "hybrid_rate_plus_cap",
"conditionalAward": {
"status": "needs_project_scope",
"formulaText": "For an approved eligible Massachusetts state-portfolio project, calculate approved components: battery storage = 50,000 cents per approved battery kWh; additional eligible EVSE = 500,000 cents per approved port; decarbonization component = approved solar funding amount; then apply a 10% Environmental Justice adder where approved. Final amount is subject to LBE approval, current opportunity-notice terms, and available funds.",
"conditionalAwardCents": null,
"minAwardCents": null,
"maxAwardCents": null,
"costSharePercent": null,
"requiredProjectInputs": [
"eligible_state_entity_status",
"approved_project_components",
"battery_kwh",
"eligible_evse_port_count",
"approved_solar_funding_amount_cents",
"environmental_justice_adder_eligibility",
"current_funding_and_cap_confirmation"
],
"calculationTrace": [
"COMMBUYS confirms an open LBE Solar-Decarbonization Grant Program for State Entities with a 06/30/2027 bid opening date.",
"Official mass.gov program page was checked but was not directly fetchable; available official search text and DSIRE corroborate component adders."
]
},
"probabilityEvidence": {
"status": "first_come_funding_unknown",
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funding_unknown",
"historicalAwardsCount": null,
"historicalApplicationsCount": null,
"totalProgramBudgetCents": null,
"expectedAwardCount": null,
"competitionScope": "sector_specific",
"probabilityNotes": "No historical application count, award count, current remaining funding amount, or success rate was found in accessible sources. Treat as conditional award math only until LBE confirms approval and funding."
},
"fallbackPriorSuggestion": {
"probabilityDiscount": null,
"basis": "No automated fallback prior recommended; the program is narrow and formula-like but accessible sources do not expose enough award or funding data.",
"shouldRetroFiUseWithoutHumanApproval": false
},
"expectedValueRecommendation": {
"estimateStatus": "needs_project_scope",
"expectedValueCents": null,
"estimateConfidence": "low",
"includeInUserFacingTotalDefault": false,
"reasonCodes": [
"missing_component_quantities",
"needs_current_funding_check",
"no_probability_discount_supported"
]
},
"sourceUrlsChecked": [
"[https://www.mass.gov/info-details/leading-by-example-solar-decarbonization-grant-program](https://www.mass.gov/info-details/leading-by-example-solar-decarbonization-grant-program)",
"[https://www.commbuys.com/bso/external/bidDetail.sdo?docId=BD-25-1041-ENE01-ENE01-107704&external=true&parentUrl=bid](https://www.commbuys.com/bso/external/bidDetail.sdo?docId=BD-25-1041-ENE01-ENE01-107704&external=true&parentUrl=bid)",
"[https://programs.dsireusa.org/system/program/detail/22772/leading-by-example-solar-decarbonization-grant-program](https://programs.dsireusa.org/system/program/detail/22772/leading-by-example-solar-decarbonization-grant-program)"
],
"evidenceText": "COMMBUYS identifies the LBE Solar-Decarbonization Grant Program for State Entities as an open grant opportunity. The mass.gov page was checked but returned 403 in direct fetch; available official search text and DSIRE corroborate the component-adder structure.",
"reasoningNotes": "Target record supplied in uploaded prompt file . Keep the component formula separate from expected value; do not include a user-facing EV without project quantities and funding/approval confirmation."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22783",
"effectId": "effect_grant_expected_value_1_c8247b1ced6ec8db",
"programName": "Public Charger Grants",
"availabilityStatus": "active",
"cashValueClassification": "reimbursement",
"sourceConfidence": "high",
"grantValueModelKind": "competitive_cost_share",
"conditionalAward": {
"status": "needs_project_cost",
"formulaText": "If selected under Efficiency Maine RFP EM-008-2026, reimbursement is the lesser of 80% of total eligible project costs or 20,000,000 cents per site for eligible public Level 2 EV charger projects with at least four ports.",
"conditionalAwardCents": null,
"minAwardCents": null,
"maxAwardCents": 20000000,
"costSharePercent": 0.8,
"requiredProjectInputs": [
"eligible_project_cost_cents",
"site_location_in_maine",
"public_level_2_charger_design",
"number_of_ports_at_least_4",
"host_site_public_access_agreement",
"award_selection"
],
"calculationTrace": [
"eligible_project_cost_cents × 0.80",
"Apply 20,000,000-cent per-site cap."
]
},
"probabilityEvidence": {
"status": "evidence_not_found",
"probabilityDiscount": null,
"probabilityEvidenceType": "scoring_criteria_only",
"historicalAwardsCount": null,
"historicalApplicationsCount": null,
"totalProgramBudgetCents": 960000000,
"expectedAwardCount": null,
"competitionScope": "statewide_broad",
"probabilityNotes": "RFP EM-008-2026 publishes a $9.6 million budget, scoring/award process, monthly awards, and a closing date of 12/03/2026 or until funds are committed, but does not publish expected award count, application volume, or success rate."
},
"fallbackPriorSuggestion": {
"probabilityDiscount": null,
"basis": "A human-reviewed prior could be developed from proposal pipeline data or comparable Efficiency Maine EVSE RFP award rates; do not infer EV from the cap or budget alone.",
"shouldRetroFiUseWithoutHumanApproval": false
},
"expectedValueRecommendation": {
"estimateStatus": "human_review_required",
"expectedValueCents": null,
"estimateConfidence": "low",
"includeInUserFacingTotalDefault": false,
"reasonCodes": [
"competitive_grant_no_success_rate",
"budget_without_expected_award_count",
"max_cap_not_expected_value"
]
},
"sourceUrlsChecked": [
"[https://www.efficiencymaine.com/opportunities/](https://www.efficiencymaine.com/opportunities/)",
"[https://www.efficiencymaine.com/at-work/electric-vehicle-supply-equipment-initiative/](https://www.efficiencymaine.com/at-work/electric-vehicle-supply-equipment-initiative/)",
"[https://www.efficiencymaine.com/rfp-em-008-2026/](https://www.efficiencymaine.com/rfp-em-008-2026/)",
"[https://www.efficiencymaine.com/docs/RFP-EM-008-2026-Public-L2-EV-Chargers-EM-008-2026.pdf](https://www.efficiencymaine.com/docs/RFP-EM-008-2026-Public-L2-EV-Chargers-EM-008-2026.pdf)"
],
"evidenceText": "Efficiency Maine's RFP page/PDF state that EM-008-2026 funds public Level 2 EV chargers up to 80% of eligible costs, capped at $200,000 per site, with at least four ports per site and a $9.6 million budget.",
"reasoningNotes": "Conditional award is calculable from project cost if selected. Probability evidence is insufficient, so suppress automated expected value."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22811",
"effectId": "effect_grant_expected_value_1_54a6dbe585e8fc1f",
"programName": "Cobb Electric Membership Corporation - Business EV Charger Grant Program",
"availabilityStatus": "active",
"cashValueClassification": "cash_grant",
"sourceConfidence": "high",
"grantValueModelKind": "competitive_award_range",
"conditionalAward": {
"status": "not_calculable",
"formulaText": "If Cobb EMC approves the business EV charger grant application, the award is discretionary within the published 50,000- to 500,000-cent range. Cobb EMC determines the amount based on charger classification, ports, installation price, user benefit, documentation, and funding availability.",
"conditionalAwardCents": null,
"minAwardCents": 50000,
"maxAwardCents": 500000,
"costSharePercent": null,
"requiredProjectInputs": [
"cobb_emc_business_member_status",
"charger_classification",
"port_count",
"installation_price",
"site_user_benefit",
"cobb_emc_award_determination",
"funding_availability"
],
"calculationTrace": [
"Published minimum award is 50,000 cents.",
"Published maximum award is 500,000 cents.",
"No deterministic tier table or probability model is published."
]
},
"probabilityEvidence": {
"status": "first_come_funding_unknown",
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funding_unknown",
"historicalAwardsCount": null,
"historicalApplicationsCount": null,
"totalProgramBudgetCents": null,
"expectedAwardCount": null,
"competitionScope": "utility_territory",
"probabilityNotes": "Cobb EMC states applications are accepted until funds are exhausted and that it will notify applicants whether a grant will be awarded and in what amount. No program budget, application count, historical award count, or success rate was found."
},
"fallbackPriorSuggestion": {
"probabilityDiscount": null,
"basis": "A low-confidence human-reviewed prior could be created from Cobb EMC budget utilization or past approvals if obtained from the utility. Do not infer expected value from the $500-$5,000 range alone.",
"shouldRetroFiUseWithoutHumanApproval": false
},
"expectedValueRecommendation": {
"estimateStatus": "human_review_required",
"expectedValueCents": null,
"estimateConfidence": "low",
"includeInUserFacingTotalDefault": false,
"reasonCodes": [
"discretionary_award_amount",
"first_come_funding_unknown",
"no_award_probability_evidence"
]
},
"sourceUrlsChecked": [
"[https://www.cobbemc.com/ev-charging-business](https://www.cobbemc.com/ev-charging-business)",
"[https://www.cobbemc.com/sites/default/files/documents/ev/EVGrantApplicationFinal.pdf](https://www.cobbemc.com/sites/default/files/documents/ev/EVGrantApplicationFinal.pdf)",
"[https://www.cobbemc.com/sites/default/files/documents/ev/Program%20Requirements%20and%20Acknowledgements.pdf](https://www.cobbemc.com/sites/default/files/documents/ev/Program%20Requirements%20and%20Acknowledgements.pdf)"
],
"evidenceText": "Cobb EMC's official business EV charging materials state that business EV charger grants range from $500 to $5,000, applications are accepted until funds are exhausted, and Cobb EMC determines whether a grant is awarded and the amount.",
"reasoningNotes": "Use the range only as conditional award evidence. Suppress automated EV because both approval probability and dollar amount are discretionary."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2469",
"effectId": "effect_one_time_savings_1_271dd59527790857",
"programName": "Lane Electric Cooperative - Commercial/Residential Weatherization & Energy Efficiency Program",
"availabilityStatus": "active",
"cashValueClassification": "cash_grant",
"sourceConfidence": "medium",
"grantValueModelKind": "capped_percent_of_eligible_cost",
"conditionalAward": {
"status": "needs_project_cost",
"formulaText": "For an approved Lane Electric weatherization cash grant, award equals the lesser of 25% of eligible measure cost or 100,000 cents.",
"conditionalAwardCents": null,
"minAwardCents": null,
"maxAwardCents": 100000,
"costSharePercent": 0.25,
"requiredProjectInputs": [
"lane_electric_member_status",
"approved_weatherization_measure",
"eligible_measure_cost_cents",
"preapproval_status"
],
"calculationTrace": [
"eligible_measure_cost_cents × 0.25",
"Apply 100,000-cent cap."
]
},
"probabilityEvidence": {
"status": "not_required_deterministic",
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required",
"historicalAwardsCount": null,
"historicalApplicationsCount": null,
"totalProgramBudgetCents": null,
"expectedAwardCount": null,
"competitionScope": "utility_territory",
"probabilityNotes": "The grant formula is deterministic once membership, measure eligibility, preapproval, and eligible cost are confirmed. No competitive probability discount is required."
},
"fallbackPriorSuggestion": {
"probabilityDiscount": null,
"basis": "No fallback probability prior needed for a deterministic capped cost-share grant.",
"shouldRetroFiUseWithoutHumanApproval": false
},
"expectedValueRecommendation": {
"estimateStatus": "needs_quote",
"expectedValueCents": null,
"estimateConfidence": "medium",
"includeInUserFacingTotalDefault": false,
"reasonCodes": [
"deterministic_formula_missing_cost",
"requires_member_and_preapproval_check"
]
},
"sourceUrlsChecked": [
"[https://www.laneelectric.com/energy-efficiency/energy-saving-programs/](https://www.laneelectric.com/energy-efficiency/energy-saving-programs/)",
"[https://www.laneelectric.com/energy-efficiency/weatherization-programs/](https://www.laneelectric.com/energy-efficiency/weatherization-programs/)",
"[https://www.laneelectric.com/energy-efficiency/heat-pump-program/](https://www.laneelectric.com/energy-efficiency/heat-pump-program/)",
"[https://www.laneelectric.com/energy-efficiency/heat-pump-water-heaters/](https://www.laneelectric.com/energy-efficiency/heat-pump-water-heaters/)",
"[https://www.laneelectric.com/energy-efficiency/renewable-energy/member-renewable-programs/](https://www.laneelectric.com/energy-efficiency/renewable-energy/member-renewable-programs/)",
"[https://programs.dsireusa.org/system/program/detail/2469/lane-electric-cooperative-commercialresidential-weatherization-energy-efficiency-program](https://programs.dsireusa.org/system/program/detail/2469/lane-electric-cooperative-commercialresidential-weatherization-energy-efficiency-program)"
],
"evidenceText": "Lane Electric official pages were checked; direct page access was limited, but official search-result text and DSIRE corroborate a cash grant covering 25% of eligible weatherization measure costs up to $1,000.",
"reasoningNotes": "This is deterministic conditional award math, not a competitive expected-value grant."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2503",
"effectId": "effect_one_time_savings_2_2513d551481d76a4",
"programName": "We Energies - Focus-On-Energy Agriculture Rebate Program",
"availabilityStatus": "active",
"cashValueClassification": "rebate",
"sourceConfidence": "high",
"grantValueModelKind": "formula_grant",
"conditionalAward": {
"status": "needs_project_scope",
"formulaText": "For a Focus-approved renewable custom project, preliminary incentive equals (12,500 cents × approved peak kW) + (10 cents × approved annual kWh saved or generated) + (125 cents × approved annual therms saved or generated), capped at the lesser of 30,000,000 cents, 50% of eligible project cost, or the one-year-payback limit.",
"conditionalAwardCents": null,
"minAwardCents": null,
"maxAwardCents": 30000000,
"costSharePercent": 0.5,
"requiredProjectInputs": [
"focus_approved_peak_kw",
"focus_approved_annual_kwh_saved_or_generated",
"focus_approved_annual_therms_saved_or_generated",
"eligible_project_cost_cents",
"one_year_payback_cap",
"preapproval_status"
],
"calculationTrace": [
"Apply renewable custom rates: $125/peak kW, $0.10/kWh, and $1.25/therm.",
"Cap by $300,000, 50% of eligible project cost, and one-year payback."
]
},
"probabilityEvidence": {
"status": "not_required_deterministic",
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required",
"historicalAwardsCount": null,
"historicalApplicationsCount": null,
"totalProgramBudgetCents": null,
"expectedAwardCount": null,
"competitionScope": "statewide_broad",
"probabilityNotes": "The custom incentive is formula-based after Focus preapproval and approved savings/generation. No competitive probability discount is required."
},
"fallbackPriorSuggestion": {
"probabilityDiscount": null,
"basis": "No fallback probability prior needed for a formula rebate; use Focus-approved inputs.",
"shouldRetroFiUseWithoutHumanApproval": false
},
"expectedValueRecommendation": {
"estimateStatus": "needs_project_scope",
"expectedValueCents": null,
"estimateConfidence": "medium",
"includeInUserFacingTotalDefault": false,
"reasonCodes": [
"deterministic_formula_missing_focus_approved_inputs",
"requires_preapproval",
"requires_cost_and_payback_cap"
]
},
"sourceUrlsChecked": [
"[https://focusonenergy.com/business/renewables](https://focusonenergy.com/business/renewables)",
"[https://assets.focusonenergy.com/production/docs/business/Focus-2026_Custom_Incentives_Guide_Fillable.pdf](https://assets.focusonenergy.com/production/docs/business/Focus-2026_Custom_Incentives_Guide_Fillable.pdf)",
"[https://focusonenergy.com/business/agribusiness](https://focusonenergy.com/business/agribusiness)",
"[https://programs.dsireusa.org/system/program/detail/2503/we-energies-focus-on-energy-agriculture-rebate-program](https://programs.dsireusa.org/system/program/detail/2503/we-energies-focus-on-energy-agriculture-rebate-program)"
],
"evidenceText": "Focus on Energy's official 2026 custom incentives guide lists renewable custom rates of $125/peak kW, $0.10/kWh saved or generated, and $1.25/therm saved or generated, with caps at the lesser of $300,000, 50% of project cost, or one-year payback.",
"reasoningNotes": "Classify as a deterministic formula rebate/incentive. Do not treat the cap as expected value."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3021",
"effectId": "effect_one_time_savings_1_68fd9ee9771b56ee",
"programName": "Rhode Island Energy (Gas) - Commercial Energy Efficiency Programs",
"availabilityStatus": "active",
"cashValueClassification": "rebate",
"sourceConfidence": "medium",
"grantValueModelKind": "fixed_tier_amount",
"conditionalAward": {
"status": "needs_project_scope",
"formulaText": "Use the current Rhode Island Energy commercial natural-gas heating rebate form tier for qualifying equipment. Official state incentive materials support a commercial natural-gas heating rebate range from 30,000 to 1,000,000 cents for eligible furnaces, water heaters, boilers, and controls; exact amount depends on equipment type, efficiency, size, quantity, and the current form.",
"conditionalAwardCents": null,
"minAwardCents": 30000,
"maxAwardCents": 1000000,
"costSharePercent": null,
"requiredProjectInputs": [
"rhode_island_energy_commercial_gas_account",
"equipment_type",
"efficiency_rating",
"capacity_or_size",
"quantity",
"eligible_cost_or_invoice",
"current_form_amount"
],
"calculationTrace": [
"Published source supports only range metadata.",
"Exact tier cannot be selected without the current form and equipment details."
]
},
"probabilityEvidence": {
"status": "not_required_deterministic",
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required",
"historicalAwardsCount": null,
"historicalApplicationsCount": null,
"totalProgramBudgetCents": null,
"expectedAwardCount": null,
"competitionScope": "utility_territory",
"probabilityNotes": "This is a published equipment rebate/tier program rather than a competitive grant. No probability discount is required once eligibility and the current tier are confirmed."
},
"fallbackPriorSuggestion": {
"probabilityDiscount": null,
"basis": "No fallback probability prior needed for an equipment rebate; obtain the current form tier.",
"shouldRetroFiUseWithoutHumanApproval": false
},
"expectedValueRecommendation": {
"estimateStatus": "needs_project_scope",
"expectedValueCents": null,
"estimateConfidence": "low",
"includeInUserFacingTotalDefault": false,
"reasonCodes": [
"tier_amount_requires_current_form",
"equipment_details_missing",
"source_direct_page_partly_inaccessible"
]
},
"sourceUrlsChecked": [
"[https://energy.ri.gov/energy-incentives/commercial-incentives](https://energy.ri.gov/energy-incentives/commercial-incentives)",
"[https://energy.ri.gov/incentives](https://energy.ri.gov/incentives)",
"[https://www.rienergy.com/site/ways-to-save/save-money-with-rebates-and-incentives/natural-gas-heating](https://www.rienergy.com/site/ways-to-save/save-money-with-rebates-and-incentives/natural-gas-heating)",
"[https://www.rienergy.com/RI-Business/Energy-Saving-Programs/Commercial-Gas](https://www.rienergy.com/RI-Business/Energy-Saving-Programs/Commercial-Gas)"
],
"evidenceText": "Rhode Island state energy incentive materials and Rhode Island Energy pages were checked. Available official materials support commercial natural-gas heating rebates for qualifying business equipment, but exact current tier requires the current RI Energy form.",
"reasoningNotes": "Do not treat the $300-$10,000 range as expected value. It is only a conditional range until equipment details and form tier are known."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3323",
"effectId": "effect_no_cash_value_2_24d6848bb3d44ec8",
"programName": "Nebraska Public Power District - Residential Energy Efficiency Rebate Programs",
"availabilityStatus": "active",
"cashValueClassification": "financing",
"sourceConfidence": "high",
"grantValueModelKind": "loan_or_financing_labeled_as_grant",
"conditionalAward": {
"status": "zero_value",
"formulaText": "The Nebraska Dollar and Energy Savings Loan is a financing product for eligible work. This effect has no published grant, rebate, forgiveness, or buy-down amount to count as cash value.",
"conditionalAwardCents": 0,
"minAwardCents": 0,
"maxAwardCents": 0,
"costSharePercent": null,
"requiredProjectInputs": [],
"calculationTrace": [
"Classified as financing/loan rather than a cash grant.",
"Set automated grant value to zero for this effect."
]
},
"probabilityEvidence": {
"status": "not_applicable",
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required",
"historicalAwardsCount": null,
"historicalApplicationsCount": null,
"totalProgramBudgetCents": null,
"expectedAwardCount": null,
"competitionScope": "unknown",
"probabilityNotes": "Probability evidence is not applicable because this effect is financing, not a cash grant or rebate expected-value opportunity."
},
"fallbackPriorSuggestion": {
"probabilityDiscount": null,
"basis": "No probability prior applies to a zero-value loan/financing classification.",
"shouldRetroFiUseWithoutHumanApproval": false
},
"expectedValueRecommendation": {
"estimateStatus": "zero_value",
"expectedValueCents": 0,
"estimateConfidence": "high",
"includeInUserFacingTotalDefault": false,
"reasonCodes": [
"loan_or_financing_not_cash_grant",
"no_grant_or_forgiveness_value_published"
]
},
"sourceUrlsChecked": [
"[https://nppd.energywisenebraska.com/residential/](https://nppd.energywisenebraska.com/residential/)",
"[https://nppd.energywisenebraskagoev.com/residential-incentives/](https://nppd.energywisenebraskagoev.com/residential-incentives/)",
"[https://www.nppd.com/save-money](https://www.nppd.com/save-money)",
"[https://neo.ne.gov/programs/st-loans/dollar-and-energy-saving-loans](https://neo.ne.gov/programs/st-loans/dollar-and-energy-saving-loans)"
],
"evidenceText": "NPPD official materials list rebates separately and refer customers to the Nebraska Dollar and Energy Savings Loan as low-interest financing. No forgiveness or grant value is published for this loan effect.",
"reasoningNotes": "Keep separate from NPPD cash rebate effects. This specific effect should remain zero-value in automated savings totals."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3409",
"effectId": "effect_one_time_savings_1_ca163786a4aef968",
"programName": "Anoka Municipal Utility - Commercial Energy Efficiency Rebate Program",
"availabilityStatus": "active",
"cashValueClassification": "rebate",
"sourceConfidence": "high",
"grantValueModelKind": "formula_grant",
"conditionalAward": {
"status": "needs_project_scope",
"formulaText": "Commercial retrofit lighting rebate equals calculated annual kWh savings × 10 cents/kWh, where savings are derived from removed lighting minus new lighting and divided by 1,000, with a 1.1 adjustment for qualifying air-conditioned spaces. Final rebate is capped at the lesser of 60% of eligible equipment cost excluding labor or 10,000,000 cents.",
"conditionalAwardCents": null,
"minAwardCents": null,
"maxAwardCents": 10000000,
"costSharePercent": 0.6,
"requiredProjectInputs": [
"old_fixture_count",
"old_watts_per_fixture",
"old_annual_hours",
"new_fixture_count",
"new_watts_per_fixture",
"new_annual_hours",
"air_conditioned_area_flag",
"eligible_equipment_cost_excluding_labor_cents",
"amu_account_eligibility",
"funding_availability"
],
"calculationTrace": [
"Compute annual kWh savings from removed lighting minus new lighting.",
"Apply 1.1 A/C adjustment where eligible.",
"Multiply annual kWh savings by 10 cents.",
"Cap by 60% of eligible equipment cost excluding labor and 10,000,000 cents."
]
},
"probabilityEvidence": {
"status": "not_required_deterministic",
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required",
"historicalAwardsCount": null,
"historicalApplicationsCount": null,
"totalProgramBudgetCents": null,
"expectedAwardCount": null,
"competitionScope": "narrow_local",
"probabilityNotes": "The lighting rebate is formula-based and first-come during the program term. No competitive grant probability discount is required; funding should be checked before presentation."
},
"fallbackPriorSuggestion": {
"probabilityDiscount": null,
"basis": "No fallback probability prior needed for a formula rebate; verify funds and calculate from lighting inputs.",
"shouldRetroFiUseWithoutHumanApproval": false
},
"expectedValueRecommendation": {
"estimateStatus": "needs_project_scope",
"expectedValueCents": null,
"estimateConfidence": "high",
"includeInUserFacingTotalDefault": false,
"reasonCodes": [
"deterministic_formula_missing_lighting_inputs",
"requires_equipment_cost",
"funding_availability_must_be_checked"
]
},
"sourceUrlsChecked": [
"[https://www.anokamn.gov/381/Commercial-Rebates](https://www.anokamn.gov/381/Commercial-Rebates)",
"[https://www.anokamn.gov/819/Commercial-Retrofit-Lighting-Rebate](https://www.anokamn.gov/819/Commercial-Retrofit-Lighting-Rebate)",
"[https://www.anokamn.gov/DocumentCenter/View/1170/2024-Commercial-Retrofit-Lighting-Rebate-PDF](https://www.anokamn.gov/DocumentCenter/View/1170/2024-Commercial-Retrofit-Lighting-Rebate-PDF)",
"[https://www.anokamn.gov/818/Commercial-New-Lighting-Rebate](https://www.anokamn.gov/818/Commercial-New-Lighting-Rebate)",
"[https://www.anokamn.gov/DocumentCenter/View/4567/2024-Commercial-New-Lighting-Rebate-PDF](https://www.anokamn.gov/DocumentCenter/View/4567/2024-Commercial-New-Lighting-Rebate-PDF)",
"[https://www.anokamn.gov/820/Commercial-Cooling-Rebate](https://www.anokamn.gov/820/Commercial-Cooling-Rebate)",
"[https://www.anokamn.gov/DocumentCenter/View/2238](https://www.anokamn.gov/DocumentCenter/View/2238)"
],
"evidenceText": "Anoka Municipal Utility's commercial retrofit lighting materials publish the $0.10/kWh-saved formula, removed-versus-new lighting method, 1.1 A/C adjustment, and caps at 60% of eligible equipment cost excluding labor and $100,000.",
"reasoningNotes": "Automated value can be deterministic after lighting inventory and cost inputs are available; no grant probability discount should be applied."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3577",
"effectId": "effect_one_time_savings_1_1710faf590c563a5",
"programName": "Lake Region Electric Cooperative - Agriculture and Commercial Energy Efficiency Grant Program",
"availabilityStatus": "active",
"cashValueClassification": "rebate",
"sourceConfidence": "high",
"grantValueModelKind": "per_unit_award",
"conditionalAward": {
"status": "needs_project_scope",
"formulaText": "For eligible commercial/agricultural/industrial lighting, calculate the sum of 2026 LREC lighting measure-catalog amounts for qualifying LED lamps, fixtures, and controls, including per-lamp/fixture tiers and control rebates per connected kW. Final rebate may not exceed 50% of material/equipment cost and may not exceed 500,000 cents per member annually.",
"conditionalAwardCents": null,
"minAwardCents": null,
"maxAwardCents": 500000,
"costSharePercent": 0.5,
"requiredProjectInputs": [
"lrec_commercial_or_agricultural_member_status",
"lighting_measure_type",
"new_fixture_or_lamp_wattage",
"quantity",
"connected_control_kw",
"material_or_equipment_cost_cents",
"dlc_or_energy_star_listing",
"invoice_date",
"funding_availability"
],
"calculationTrace": [
"Select applicable 2026 LREC lighting catalog rate.",
"Multiply per-unit or per-kW rate by eligible quantity.",
"Cap by 50% of material/equipment cost and 500,000 cents per member annually."
]
},
"probabilityEvidence": {
"status": "not_required_deterministic",
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required",
"historicalAwardsCount": null,
"historicalApplicationsCount": null,
"totalProgramBudgetCents": null,
"expectedAwardCount": null,
"competitionScope": "utility_territory",
"probabilityNotes": "The lighting rebate is deterministic after eligibility, equipment, cost, and funding availability are confirmed. No competitive grant probability discount is required."
},
"fallbackPriorSuggestion": {
"probabilityDiscount": null,
"basis": "No fallback probability prior needed for a measure-catalog rebate; use the published 2026 catalog and live funding check.",
"shouldRetroFiUseWithoutHumanApproval": false
},
"expectedValueRecommendation": {
"estimateStatus": "needs_project_scope",
"expectedValueCents": null,
"estimateConfidence": "medium",
"includeInUserFacingTotalDefault": false,
"reasonCodes": [
"measure_catalog_inputs_missing",
"requires_material_cost",
"funding_availability_must_be_checked"
]
},
"sourceUrlsChecked": [
"[https://www.lrec.coop/energy-services/ag-commercial-energy-grants/](https://www.lrec.coop/energy-services/ag-commercial-energy-grants/)",
"[https://www.lrec.coop/energy-services/rebates-loans-and-tax-credits/](https://www.lrec.coop/energy-services/rebates-loans-and-tax-credits/)",
"[https://www.lrec.coop/wp-content/uploads/2026/02/2026-LREC-Com-Lighting-Fillable.pdf](https://www.lrec.coop/wp-content/uploads/2026/02/2026-LREC-Com-Lighting-Fillable.pdf)"
],
"evidenceText": "LREC's 2026 commercial LED lighting form states that eligible commercial, agricultural, or industrial members can receive rebates by lamp/fixture/control measure, subject to a cap of 50% of material/equipment cost and $5,000 per member annually.",
"reasoningNotes": "Existing cap percent should be stored as 0.50, not 50. Treat as rebate/measure-catalog calculation, not competitive grant EV."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3577",
"effectId": "effect_one_time_savings_2_8f47bd53eecfe786",
"programName": "Lake Region Electric Cooperative - Agriculture and Commercial Energy Efficiency Grant Program",
"availabilityStatus": "active",
"cashValueClassification": "rebate",
"sourceConfidence": "high",
"grantValueModelKind": "per_unit_award",
"conditionalAward": {
"status": "needs_project_scope",
"formulaText": "For eligible dairy measures, calculate 200 cents per cow for a dairy plate/pre-cooler, 200 cents per cow for a milk pump VFD, and 2,000 cents per horsepower for a vacuum pump VFD. The robotic milking system line is shown as $X.XX per stall and is not calculable without LREC confirmation.",
"conditionalAwardCents": null,
"minAwardCents": null,
"maxAwardCents": null,
"costSharePercent": null,
"requiredProjectInputs": [
"lrec_agricultural_or_commercial_member_status",
"dairy_measure_type",
"cow_count",
"horsepower",
"project_cost_and_invoices",
"equipment_specifications",
"funding_availability"
],
"calculationTrace": [
"Plate/pre-cooler: cow_count × 200 cents.",
"Milk pump VFD: cow_count × 200 cents.",
"Vacuum pump VFD: horsepower × 2,000 cents.",
"Robotic milking system requires LREC-specific confirmation."
]
},
"probabilityEvidence": {
"status": "not_required_deterministic",
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required",
"historicalAwardsCount": null,
"historicalApplicationsCount": null,
"totalProgramBudgetCents": null,
"expectedAwardCount": null,
"competitionScope": "utility_territory",
"probabilityNotes": "The published dairy rates are deterministic per-unit rebates for listed measures once eligibility, counts, specifications, and funding availability are confirmed. No competitive grant probability discount is required."
},
"fallbackPriorSuggestion": {
"probabilityDiscount": null,
"basis": "No fallback probability prior needed for the published per-unit dairy rebates.",
"shouldRetroFiUseWithoutHumanApproval": false
},
"expectedValueRecommendation": {
"estimateStatus": "needs_project_scope",
"expectedValueCents": null,
"estimateConfidence": "medium",
"includeInUserFacingTotalDefault": false,
"reasonCodes": [
"per_unit_inputs_missing",
"rms_amount_not_published",
"funding_availability_must_be_checked"
]
},
"sourceUrlsChecked": [
"[https://www.lrec.coop/energy-services/ag-commercial-energy-grants/](https://www.lrec.coop/energy-services/ag-commercial-energy-grants/)",
"[https://www.lrec.coop/energy-services/rebates-loans-and-tax-credits/](https://www.lrec.coop/energy-services/rebates-loans-and-tax-credits/)",
"[https://www.lrec.coop/wp-content/uploads/2026/02/2026-LREC-Dairy-Fillable.pdf](https://www.lrec.coop/wp-content/uploads/2026/02/2026-LREC-Dairy-Fillable.pdf)"
],
"evidenceText": "LREC's 2026 dairy form lists $2/cow for dairy plate cooler, $2/cow for milk pump VFD, and $20/hp for vacuum pump VFD; it shows robotic milking system as $X.XX/stall, requiring confirmation.",
"reasoningNotes": "Conditional award is calculable only for published dairy measure lines. Do not infer a robotic milking amount."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3577",
"effectId": "effect_one_time_savings_3_15fcad37f2268e40",
"programName": "Lake Region Electric Cooperative - Agriculture and Commercial Energy Efficiency Grant Program",
"availabilityStatus": "active",
"cashValueClassification": "rebate",
"sourceConfidence": "high",
"grantValueModelKind": "other",
"conditionalAward": {
"status": "needs_quote",
"formulaText": "Custom energy rebate value is determined by LREC based on project demand (kW), energy (kWh), annual hours of operation, nameplate data, specifications, pre-inspection, and pre-approval. Maximum rebate is limited to 50% of project costs and to a maximum dollar amount deemed by the cooperative; no public rate table or fixed dollar cap was found.",
"conditionalAwardCents": null,
"minAwardCents": null,
"maxAwardCents": null,
"costSharePercent": 0.5,
"requiredProjectInputs": [
"lrec_commercial_or_agricultural_member_status",
"preapproval_status",
"equipment_nameplate_data",
"equipment_specifications",
"eligible_project_cost_cents",
"coincidental_kw_saved_or_growth",
"annual_kwh_saved_or_sales",
"annual_operating_hours",
"lrec_preinspection_or_review",
"funding_availability"
],
"calculationTrace": [
"LREC determines rebate value project by project.",
"Apply 50% of project cost cap.",
"Maximum dollar amount must be confirmed by LREC."
]
},
"probabilityEvidence": {
"status": "not_required_deterministic",
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required",
"historicalAwardsCount": null,
"historicalApplicationsCount": null,
"totalProgramBudgetCents": null,
"expectedAwardCount": null,
"competitionScope": "utility_territory",
"probabilityNotes": "This is not a competitive grant EV, but the public source does not provide a complete formula. Probability discount is not required after LREC approval; the amount requires LREC review and funding confirmation."
},
"fallbackPriorSuggestion": {
"probabilityDiscount": null,
"basis": "No automated probability prior should be used. Obtain LREC preapproval or a project-specific rebate determination.",
"shouldRetroFiUseWithoutHumanApproval": false
},
"expectedValueRecommendation": {
"estimateStatus": "needs_quote",
"expectedValueCents": null,
"estimateConfidence": "low",
"includeInUserFacingTotalDefault": false,
"reasonCodes": [
"custom_review_required",
"public_formula_incomplete",
"funding_availability_must_be_checked"
]
},
"sourceUrlsChecked": [
"[https://www.lrec.coop/energy-services/ag-commercial-energy-grants/](https://www.lrec.coop/energy-services/ag-commercial-energy-grants/)",
"[https://www.lrec.coop/energy-services/rebates-loans-and-tax-credits/](https://www.lrec.coop/energy-services/rebates-loans-and-tax-credits/)",
"[https://www.lrec.coop/wp-content/uploads/2026/02/2026-LREC-Custom-Fillable.pdf](https://www.lrec.coop/wp-content/uploads/2026/02/2026-LREC-Custom-Fillable.pdf)"
],
"evidenceText": "LREC's custom energy rebate form says pre-approval is required, rebate value is determined from demand, energy, and annual operating hours, and maximum rebate is limited to 50% of project costs up to a dollar amount deemed by the cooperative.",
"reasoningNotes": "Because no public rate conversion is available, use needs_quote/custom review rather than automated expected value."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5361",
"effectId": "effect_grant_expected_value_1_4b087fae3c03d391",
"programName": "Small Scale Solar Grants (Commerce RI)",
"availabilityStatus": "active",
"cashValueClassification": "cash_grant",
"sourceConfidence": "high",
"grantValueModelKind": "hybrid_rate_plus_cap",
"conditionalAward": {
"status": "needs_project_scope",
"formulaText": "For 2026 small-scale direct-ownership solar PV, REF grant equals 165 cents per rated DC watt up to 8.8 kW; systems above 8.8 kW receive the 1,450,000-cent per-project maximum. The 2026 RFP separately states SDHW grants equal 25% of total contract price capped at 400,000 cents per housing or small business unit. Applications are subject to REF approval, round timing, and available funds.",
"conditionalAwardCents": null,
"minAwardCents": null,
"maxAwardCents": 1450000,
"costSharePercent": null,
"requiredProjectInputs": [
"eligible_renewable_measure_type",
"approved_system_dc_watts_for_pv",
"eligible_contract_price_cents_for_sdhw_if_applicable",
"net_metered_direct_ownership_confirmation",
"rhode_island_project_and_property_ownership",
"ref_approval_before_installation",
"application_round_and_fund_availability"
],
"calculationTrace": [
"PV: approved_system_watts × 165 cents, capped at 1,450,000 cents per project.",
"SDHW: eligible contract price × 0.25, capped at 400,000 cents per unit.",
"Blocks close on the application close date or when available funds are reached."
]
},
"probabilityEvidence": {
"status": "not_required_deterministic",
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required",
"historicalAwardsCount": null,
"historicalApplicationsCount": null,
"totalProgramBudgetCents": null,
"expectedAwardCount": null,
"competitionScope": "statewide_broad",
"probabilityNotes": "The REF small-scale award formula is deterministic after application approval and fund reservation. Program blocks are first-come/subject to available funds, so live funding status or an award letter is required before user-facing inclusion."
},
"fallbackPriorSuggestion": {
"probabilityDiscount": null,
"basis": "No fallback probability prior should be used. Use the fixed formula only after REF round/funding status and pre-installation approval are confirmed.",
"shouldRetroFiUseWithoutHumanApproval": false
},
"expectedValueRecommendation": {
"estimateStatus": "needs_funding_check",
"expectedValueCents": null,
"estimateConfidence": "medium",
"includeInUserFacingTotalDefault": false,
"reasonCodes": [
"deterministic_formula_requires_ref_approval",
"first_come_funding_availability",
"project_type_inputs_missing"
]
},
"sourceUrlsChecked": [
"[https://commerceri.com/renewable-energy-fund/](https://commerceri.com/renewable-energy-fund/)",
"[https://assets.simpleviewinc.com/simpleview/image/upload/v1/clients/rhodeisland/Small_Scale_RFP_c9b2126b-7a3b-47db-941a-9f576e78237c.pdf](https://assets.simpleviewinc.com/simpleview/image/upload/v1/clients/rhodeisland/Small_Scale_RFP_c9b2126b-7a3b-47db-941a-9f576e78237c.pdf)",
"[https://assets.simpleviewinc.com/simpleview/image/upload/v1/clients/rhodeisland/Small_Scale_Flyer_38730e17-9e3b-4e0f-b749-f9b8352c70bc.pdf](https://assets.simpleviewinc.com/simpleview/image/upload/v1/clients/rhodeisland/Small_Scale_Flyer_38730e17-9e3b-4e0f-b749-f9b8352c70bc.pdf)"
],
"evidenceText": "Commerce RI's 2026 small-scale REF RFP/flyer list $1.65/W for direct-ownership solar PV up to 8.8 kW, a $14,500 per-project maximum, and a $375,000 per-application cap; the RFP also lists SDHW at 25% of contract price capped at $4,000 per unit.",
"reasoningNotes": "Repair the target label for solar hot water: SDHW is not $1.65/W; it is a 25% contract-price grant capped at $4,000 per unit."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5361",
"effectId": "effect_grant_expected_value_2_5d165cb2af3b1006",
"programName": "Small Scale Solar Grants (Commerce RI)",
"availabilityStatus": "active",
"cashValueClassification": "cash_grant",
"sourceConfidence": "high",
"grantValueModelKind": "fixed_amount",
"conditionalAward": {
"status": "calculable",
"formulaText": "For an eligible energy storage component paired with a renewable energy component concurrently awarded REF Small-Scale funding, the storage adder is fixed at 500,000 cents per project, subject to storage eligibility, REF review/approval, and funding availability.",
"conditionalAwardCents": 500000,
"minAwardCents": 500000,
"maxAwardCents": 500000,
"costSharePercent": null,
"requiredProjectInputs": [
"qualifying_concurrent_ref_small_scale_renewable_project_award",
"battery_storage_integration",
"energy_storage_eligibility",
"connected_solutions_enrollment_or_opt_out",
"storage_adder_approval",
"funding_availability"
],
"calculationTrace": [
"Fixed small-scale storage adder = 500,000 cents.",
"Requires concurrent REF Small-Scale renewable award and storage approval.",
"Funding is first-come and subject to availability."
]
},
"probabilityEvidence": {
"status": "not_required_deterministic",
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required",
"historicalAwardsCount": null,
"historicalApplicationsCount": null,
"totalProgramBudgetCents": 150000000,
"expectedAwardCount": null,
"competitionScope": "statewide_broad",
"probabilityNotes": "The amount is fixed after approval. The storage adder is supported by limited first-come funds and all awards are subject to availability, so do not include it before confirming concurrent REF award and storage approval."
},
"fallbackPriorSuggestion": {
"probabilityDiscount": null,
"basis": "No fallback probability prior needed for the fixed adder; use only after approval and funding confirmation.",
"shouldRetroFiUseWithoutHumanApproval": false
},
"expectedValueRecommendation": {
"estimateStatus": "needs_funding_check",
"expectedValueCents": null,
"estimateConfidence": "medium",
"includeInUserFacingTotalDefault": false,
"reasonCodes": [
"fixed_amount_but_requires_concurrent_ref_award",
"storage_adder_approval_required",
"first_come_funding_availability"
]
},
"sourceUrlsChecked": [
"[https://commerceri.com/renewable-energy-fund/](https://commerceri.com/renewable-energy-fund/)",
"[https://assets.simpleviewinc.com/simpleview/image/upload/v1/clients/rhodeisland/Small_Scale_Flyer_38730e17-9e3b-4e0f-b749-f9b8352c70bc.pdf](https://assets.simpleviewinc.com/simpleview/image/upload/v1/clients/rhodeisland/Small_Scale_Flyer_38730e17-9e3b-4e0f-b749-f9b8352c70bc.pdf)",
"[https://assets.simpleviewinc.com/simpleview/image/upload/v1/clients/rhodeisland/REF_Storage_Adder_RFP_FINAL_d448fb12-1769-48fd-a04f-2d9922beff15.pdf](https://assets.simpleviewinc.com/simpleview/image/upload/v1/clients/rhodeisland/REF_Storage_Adder_RFP_FINAL_d448fb12-1769-48fd-a04f-2d9922beff15.pdf)"
],
"evidenceText": "Commerce RI's small-scale flyer and storage-adder RFP state that REF awards a flat $5,000 storage adder for an eligible storage component paired with a renewable energy component concurrently awarded REF Small-Scale funding. The storage-adder RFP states funding is first-come, first-served and contingent on availability.",
"reasoningNotes": "Conditional amount is fixed, but automated expected value remains suppressed until the paired REF renewable award and storage approval are confirmed."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5362",
"effectId": "effect_grant_expected_value_1_6968bbfaaabe9e9d",
"programName": "Commercial Scale Renewable Energy Grants (Commerce RI)",
"availabilityStatus": "active",
"cashValueClassification": "cash_grant",
"sourceConfidence": "high",
"grantValueModelKind": "hybrid_rate_plus_cap",
"conditionalAward": {
"status": "needs_project_scope",
"formulaText": "For 2026 commercial-scale REF projects, calculate the direct-ownership solar base grant by DC capacity tiers from the current RFP: 70 cents/W for the first 0-50 kW, 40 cents/W for the second 50 kW up to 100 kW, 30 cents/W for the third 50 kW up to 150 kW, and 20 cents/W for the fourth 50 kW up to 200 kW, capped at 7,500,000 cents per project and 15,000,000 cents per installer/block. Approved solar carport capacity may receive an additional 55 cents/W subject to a 20,000,000-cent per-project carport maximum and 60,000,000-cent installer/block cap. Approved commercial storage receives 50 cents/W of maximum continuous three-hour deliverable power, capped at 4,000,000 cents per project. SDHW, if applicable, is 25% of contract price capped at 400,000 cents per unit. All awards are subject to REF review and available funds.",
"conditionalAwardCents": null,
"minAwardCents": null,
"maxAwardCents": null,
"costSharePercent": null,
"requiredProjectInputs": [
"ownership_model",
"project_dc_watts_by_tier",
"solar_carport_watts",
"storage_total_battery_capacity_wh",
"storage_inverter_max_continuous_power_watts",
"eligible_contract_price_for_sdhw_if_applicable",
"installer_round_cap_status",
"application_round",
"funding_availability",
"ref_approval_before_installation"
],
"calculationTrace": [
"Base direct-ownership PV tier calculation uses current RFP rate table and 7,500,000-cent project cap.",
"Carport adder = eligible carport watts × 55 cents, subject to 20,000,000-cent project cap.",
"Storage adder = min(total battery capacity Wh / 3 hours, inverter max continuous power W) × 50 cents, capped at 4,000,000 cents.",
"Apply installer/block and available-fund constraints."
]
},
"probabilityEvidence": {
"status": "not_required_deterministic",
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required",
"historicalAwardsCount": null,
"historicalApplicationsCount": null,
"totalProgramBudgetCents": null,
"expectedAwardCount": null,
"competitionScope": "statewide_broad",
"probabilityNotes": "The REF commercial-scale formulas are rate-table formulas after approval, but blocks close on the application closing date or when funds are reached. No historical success rate, application count, or expected award count was found."
},
"fallbackPriorSuggestion": {
"probabilityDiscount": null,
"basis": "No automated fallback prior recommended. If RetroFi wants a pre-approval EV, it should be human-reviewed using Commerce RI block funding and application pipeline data.",
"shouldRetroFiUseWithoutHumanApproval": false
},
"expectedValueRecommendation": {
"estimateStatus": "needs_project_scope",
"expectedValueCents": null,
"estimateConfidence": "medium",
"includeInUserFacingTotalDefault": false,
"reasonCodes": [
"rate_table_inputs_missing",
"round_and_funding_check_required",
"adder_caps_require_program_confirmation"
]
},
"sourceUrlsChecked": [
"[https://commerceri.com/renewable-energy-fund/](https://commerceri.com/renewable-energy-fund/)",
"[https://assets.simpleviewinc.com/simpleview/image/upload/v1/clients/rhodeisland/Commercial_RFP_1__0ab2622e-1f9a-44af-b983-3fe495aab483.pdf](https://assets.simpleviewinc.com/simpleview/image/upload/v1/clients/rhodeisland/Commercial_RFP_1__0ab2622e-1f9a-44af-b983-3fe495aab483.pdf)",
"[https://assets.simpleviewinc.com/simpleview/image/upload/v1/clients/rhodeisland/Commercial_Flyer_778e7b33-c575-431c-9973-44bc372ed4cc.pdf](https://assets.simpleviewinc.com/simpleview/image/upload/v1/clients/rhodeisland/Commercial_Flyer_778e7b33-c575-431c-9973-44bc372ed4cc.pdf)",
"[https://assets.simpleviewinc.com/simpleview/image/upload/v1/clients/rhodeisland/REF_Storage_Adder_RFP_FINAL_d448fb12-1769-48fd-a04f-2d9922beff15.pdf](https://assets.simpleviewinc.com/simpleview/image/upload/v1/clients/rhodeisland/REF_Storage_Adder_RFP_FINAL_d448fb12-1769-48fd-a04f-2d9922beff15.pdf)",
"[https://programs.dsireusa.org/system/program/detail/5362/commercial-scale-renewable-energy-grants-commerce-ri](https://programs.dsireusa.org/system/program/detail/5362/commercial-scale-renewable-energy-grants-commerce-ri)"
],
"evidenceText": "Commerce RI's 2026 commercial REF page/RFP/flyer publish commercial-scale rounds, direct-ownership capacity tiers, a $75,000 base project cap, carport adder/caps, a commercial storage adder of $0.50/W capped at $40,000, and availability/funding constraints.",
"reasoningNotes": "Treat the tier table and adders as conditional award math only. Since round funding can close when funds are reached and no award probability evidence was found, do not include a pre-approval EV by default."
}
],
"continueFromOpportunityId": null
}
