{
"schemaVersion": "retrofi_grant_package_repair.v1",
"researchedAt": "2026-07-03",
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5558",
"programName": "City of Aspen and Pitkin County - Renewable Energy Mitigation Program Grants",
"status": "suppress_max_only",
"sourceConfidence": "high",
"estimateConfidenceIfInputsPresent": "low",
"officialSources": [
{
"title": "Commercial & Multifamily Funding",
"url": "[https://www.aspencore.org/commercial-multifamily-funding](https://www.aspencore.org/commercial-multifamily-funding)",
"owner": "Community Office for Resource Efficiency (CORE)",
"accessed": "2026-07-03",
"evidenceText": "CORE lists commercial and multifamily grant awards as up to $200,000 with rolling applications, but grant-specific text says awards are for larger implementation projects, require greenhouse-gas impact analysis before applying, and are accepted as funds allow. ([AspenCORE][1])"
},
{
"title": "Funding Criteria",
"url": "[https://www.aspencore.org/funding-criteria](https://www.aspencore.org/funding-criteria)",
"owner": "Community Office for Resource Efficiency (CORE)",
"accessed": "2026-07-03",
"evidenceText": "CORE states funding is limited, grants provide funding up to $200,000, eligibility and funding amounts vary by project type, location, and participant qualifications, and applications are first-come, first-served. ([AspenCORE][2])"
},
{
"title": "Frequently Asked Questions",
"url": "[https://www.aspencore.org/faq](https://www.aspencore.org/faq)",
"owner": "Community Office for Resource Efficiency (CORE)",
"accessed": "2026-07-03",
"evidenceText": "CORE states it serves Pitkin, Eagle, and Garfield Counties; commercial or multifamily grant applications are rolling; applicants should contact CORE before drafting; and approved projects must be completed within 18 months. ([AspenCORE][3])"
},
{
"title": "Grants & Funding Programs",
"url": "[https://www.aspencore.org/grants-and-funding-programs](https://www.aspencore.org/grants-and-funding-programs)",
"owner": "Community Office for Resource Efficiency (CORE)",
"accessed": "2026-07-03",
"evidenceText": "CORE describes itself as providing funding for energy efficiency improvement projects for residential, commercial, and multifamily buildings, with commercial and multifamily funding linked as a primary program path. ([AspenCORE][4])"
},
{
"title": "CORE Offers Enhanced Funding & Services to Make Climate Action Accessible Across Three Counties",
"url": "[https://www.aspencore.org/core-offers-enhanced-funding-services-to-make-climate-action-accessible-across-three-counties](https://www.aspencore.org/core-offers-enhanced-funding-services-to-make-climate-action-accessible-across-three-counties)",
"owner": "Community Office for Resource Efficiency (CORE)",
"accessed": "2026-07-03",
"evidenceText": "CORE reported $920,536 in 2024 funding across 145 energy-saving projects and described up to $200,000 per project for high greenhouse-gas-reduction building projects, but this aggregate does not provide applications, success rates, grant-only award counts, or a current fund balance. ([AspenCORE][5])"
},
{
"title": "Our Impact",
"url": "[https://www.aspencore.org/impact](https://www.aspencore.org/impact)",
"owner": "Community Office for Resource Efficiency (CORE)",
"accessed": "2026-07-03",
"evidenceText": "CORE describes REMP as established with the City of Aspen and Pitkin County and says REMP funds are reinvested by CORE into the community for energy-efficient building solutions. ([AspenCORE][6])"
}
],
"sourceSummary": "The uploaded package context was reviewed.  Current primary administrator sources support that CORE has an active rolling commercial and multifamily grant path with a stated maximum of $200,000, limited funding, project-specific eligibility, CORE review, greenhouse-gas impact analysis, and funds-available constraints. The sources do not provide a formula, minimum award, award range, cost-share percentage, current fund balance, application counts, success rate, or expected award count. Therefore the grant expected value should remain suppressed and excluded from user-facing savings totals by default.",
"packagePatch": {
"calculation_status": "no_calculable_value",
"availability": {
"status": "rolling",
"fundingStatus": "open_while_funds_last"
},
"input_requirements_to_add_or_update": [
{
"input_key": "property_type",
"label": "Property type",
"value_type": "enum",
"required_for": [
"effect_grant_expected_value_2_a28bd747b9260955"
],
"allowed_values": [
"commercial",
"multifamily"
],
"missing_severity": "blocks_eligibility_screen",
"notes": "Commercial and multifamily grant path only for this retrofit package; multifamily buildings are four or more units."
},
{
"input_key": "project_location_county",
"label": "Project location county",
"value_type": "enum",
"required_for": [
"effect_grant_expected_value_2_a28bd747b9260955"
],
"allowed_values": [
"Pitkin County",
"Eagle County",
"Garfield County"
],
"missing_severity": "blocks_eligibility_screen",
"notes": "CORE service territory is Pitkin, Eagle, and Garfield Counties."
},
{
"input_key": "measure_type",
"label": "Measure type",
"value_type": "enum",
"required_for": [
"effect_grant_expected_value_2_a28bd747b9260955"
],
"allowed_values": [
"energy_efficiency",
"building_electrification",
"space_heating_heat_pump_replacing_fossil_fuel",
"water_heating_heat_pump_replacing_fossil_fuel",
"heat_recovery_or_heat_pump_ventilation",
"custom_significant_energy_savings_project"
],
"missing_severity": "blocks_eligibility_screen",
"notes": "Grant focus is larger energy efficiency and building electrification implementation projects."
},
{
"input_key": "eligible_project_cost_cents",
"label": "Eligible project cost",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_2_a28bd747b9260955"
],
"missing_severity": "informational_only_for_suppressed_estimate",
"notes": "No official grant percentage or cost-share formula was found; cost alone cannot calculate the grant."
},
{
"input_key": "rebate_insufficiency_rationale",
"label": "Why rebates are not sufficient",
"value_type": "text",
"required_for": [
"effect_grant_expected_value_2_a28bd747b9260955"
],
"missing_severity": "blocks_application_screen",
"notes": "Grant description says grants are for larger projects where rebates are not enough."
},
{
"input_key": "core_energy_concierge_contact_status",
"label": "CORE Energy Concierge contact status",
"value_type": "enum",
"required_for": [
"effect_grant_expected_value_2_a28bd747b9260955"
],
"allowed_values": [
"not_contacted",
"contacted_pre_application",
"core_invited_application",
"application_submitted",
"approved",
"denied"
],
"missing_severity": "blocks_application_screen",
"notes": "CORE recommends contacting them before drafting a grant application."
},
{
"input_key": "greenhouse_gas_impact_analysis_status",
"label": "Greenhouse-gas impact analysis status",
"value_type": "enum",
"required_for": [
"effect_grant_expected_value_2_a28bd747b9260955"
],
"allowed_values": [
"not_started",
"in_progress_with_core",
"completed_by_core",
"not_required_by_core"
],
"missing_severity": "blocks_application_screen",
"notes": "CORE staff works with interested parties to analyze GHG impact before grant application submission."
},
{
"input_key": "grant_funding_available_confirmation",
"label": "CORE grant funds currently available",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_2_a28bd747b9260955"
],
"missing_severity": "blocks_estimate",
"notes": "Official pages say funding is limited and grants are accepted as funds allow; no current fund balance was published."
},
{
"input_key": "core_award_decision_status",
"label": "CORE award decision status",
"value_type": "enum",
"required_for": [
"effect_grant_expected_value_2_a28bd747b9260955"
],
"allowed_values": [
"not_submitted",
"submitted",
"under_review",
"approved",
"denied",
"waitlisted"
],
"missing_severity": "blocks_estimate",
"notes": "Award depends on CORE review and available funds."
},
{
"input_key": "approved_grant_award_cents",
"label": "Approved CORE grant award",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_2_a28bd747b9260955"
],
"missing_severity": "blocks_calculation",
"notes": "Only use after an official CORE award decision or award letter; do not infer from the $200,000 maximum."
},
{
"input_key": "approved_project_completion_deadline",
"label": "Approved project completion deadline",
"value_type": "date",
"required_for": [
"effect_grant_expected_value_2_a28bd747b9260955"
],
"missing_severity": "blocks_post_award_validation",
"notes": "FAQ states approved projects must be completed within 18 months of application approval."
}
],
"effects_to_add_or_update": [
{
"effect_id": "effect_grant_expected_value_2_a28bd747b9260955",
"effect_type": "grant_expected_value",
"cash_value_classification": "cash_grant",
"value_model_kind": "competitive_max_only",
"calculation": {
"method": "expected_value",
"amount_cents": null,
"percent": null,
"conditional_award_cents": null,
"conditional_award_formula": "No defensible runtime formula. CORE publishes only an up-to maximum of $200,000 and states awards depend on project type, location, participant qualifications, grant review, greenhouse-gas impact analysis, and available funds. Before official approval, return null and suppress. After an official CORE approval, use approved_grant_award_cents as the cash grant amount, capped at 20000000 cents only as a validation check.",
"max_award_cents": 20000000,
"min_award_cents": null,
"rate_rows": [],
"probability_discount": null,
"probability_evidence_type": "first_come_funding_unknown"
},
"required_inputs": [
"property_type",
"project_location_county",
"measure_type",
"eligible_project_cost_cents",
"rebate_insufficiency_rationale",
"core_energy_concierge_contact_status",
"greenhouse_gas_impact_analysis_status",
"grant_funding_available_confirmation",
"core_award_decision_status",
"approved_grant_award_cents",
"approved_project_completion_deadline"
],
"missing_input_behavior": "suppress_until_review",
"includedInUserFacingTotalDefault": false,
"humanReviewRequired": true,
"reasonCodes": [
"source_says_up_to",
"competitive_max_only",
"no_conditional_award_formula",
"no_award_range",
"no_cost_share_formula",
"no_probability_evidence",
"first_come_funding_unknown",
"available_funds_dependency",
"award_depends_on_review",
"project_specific_ghg_analysis_required",
"approval_required_before_estimate",
"exclude_from_user_facing_total"
],
"calculationTrace": [
"CORE commercial and multifamily page states grant awards can be up to $200,000 and applications are accepted on a rolling basis.",
"CORE grant-specific text says grants are for larger, long-term, impactful projects where rebates are not enough and where grants can make the difference in completing the project.",
"CORE says grant applications are accepted as funds allow and that CORE staff works with applicants to analyze greenhouse-gas impact before application submission.",
"CORE funding criteria says funding is limited, funding amounts vary by project type, location, and participant qualifications, applications are first-come, first-served, and program aspects may change without notice.",
"CORE reports aggregate 2024 funding and project count, but not applications, success rates, grant-only award counts, current grant budget, or expected future award count; this is not a defensible probability anchor.",
"Because the only monetary value is an up-to maximum and no probability discount or conditional award formula exists, suppress the expected value until an official CORE award amount is available."
]
}
]
},
"testCaseInputHints": [
{
"inputKey": "property_type",
"valueType": "enum",
"whoProvides": "user",
"realisticDefaultGuidance": "Use commercial or multifamily for this grant path; do not default residential retrofit projects into this grant estimate."
},
{
"inputKey": "project_location_county",
"valueType": "enum",
"whoProvides": "user",
"realisticDefaultGuidance": "Pitkin County, Eagle County, or Garfield County."
},
{
"inputKey": "measure_type",
"valueType": "enum",
"whoProvides": "quote",
"realisticDefaultGuidance": "For HVAC replacement tests, use space_heating_heat_pump_replacing_fossil_fuel only if the project replaces fossil-fuel space heating with a heat pump."
},
{
"inputKey": "eligible_project_cost_cents",
"valueType": "money_cents",
"whoProvides": "quote",
"realisticDefaultGuidance": "Use the project cost from the contractor quote, but do not calculate a grant percentage from it."
},
{
"inputKey": "rebate_insufficiency_rationale",
"valueType": "text",
"whoProvides": "user",
"realisticDefaultGuidance": "Describe why the formula rebate is insufficient to complete a large or impactful implementation project."
},
{
"inputKey": "core_energy_concierge_contact_status",
"valueType": "enum",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Default to not_contacted unless there is evidence that CORE has been contacted before application drafting."
},
{
"inputKey": "greenhouse_gas_impact_analysis_status",
"valueType": "enum",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "Default to not_started unless CORE or the applicant has documented a completed GHG impact analysis."
},
{
"inputKey": "grant_funding_available_confirmation",
"valueType": "boolean",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "Do not assume funds are available; verify with CORE for the current project."
},
{
"inputKey": "core_award_decision_status",
"valueType": "enum",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Use approved only if an official CORE approval or award letter is present."
},
{
"inputKey": "approved_grant_award_cents",
"valueType": "money_cents",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Populate only from an official CORE award decision; null before approval."
},
{
"inputKey": "approved_project_completion_deadline",
"valueType": "date",
"whoProvides": "application_status",
"realisticDefaultGuidance": "If approved, deadline should reflect the 18-month completion requirement unless CORE states otherwise in the award terms."
}
],
"remainingGaps": [
"No official conditional award formula, fixed amount, percentage of cost, cost-share, or rate table was found for grants.",
"No official minimum award or expected award range was found; the only published grant amount is up to $200,000.",
"No official current grant fund balance, remaining funding, or exhaustion status was found.",
"No official commercial or multifamily grant application count, approval count, denial count, success rate, or expected award count was found.",
"CORE's reported 2024 funding of $920,536 across 145 energy-saving projects is aggregate grants-and-rebates information and cannot support a grant probability discount or typical award amount.",
"Project-specific CORE review, pre-application greenhouse-gas impact analysis, and available funds are required before any grant award can be known.",
"The package should remove duplicate or user-supplied probability inputs such as award_probability; probability should not be supplied by the homeowner or quote."
],
"doNotUseAsUserFacingEstimateReasons": [
"The official sources state only an up-to maximum, not a calculable award.",
"The award depends on CORE project review and greenhouse-gas impact analysis.",
"Funding is limited and grants are accepted only as funds allow.",
"No official probability evidence or success-rate anchor was found.",
"No current fund availability confirmation was found.",
"No official award amount exists until CORE approves the project."
]
}

[1]: https://www.aspencore.org/commercial-multifamily-funding "
    
    Energy-Saving Grants & Rebates | Roaring Fork Valley, CO
  
  "
[2]: https://www.aspencore.org/funding-criteria "
    
    Funding Criteria | Community Office for Resource Efficiency | Roaring Fork Valley, CO
  
  "
[3]: https://www.aspencore.org/faq "
    
    FAQs | Community Office for Resource Efficiency | Roaring Fork Valley, CO
  
  "
[4]: https://www.aspencore.org/grants-and-funding-programs "
    
    Grants & Funding Programs | Roaring Fork Valley, CO
  
  "
[5]: https://www.aspencore.org/core-offers-enhanced-funding-services-to-make-climate-action-accessible-across-three-counties "
    
    CORE Offers Enhanced Funding & Services Across Three Counties
  
  "
[6]: https://www.aspencore.org/impact "
    
    Our Impact | AspenCore of Colorado
  
  "

