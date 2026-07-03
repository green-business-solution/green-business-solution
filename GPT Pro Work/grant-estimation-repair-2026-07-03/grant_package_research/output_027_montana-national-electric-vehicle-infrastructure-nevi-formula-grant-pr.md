{
"schemaVersion": "retrofi_grant_package_repair.v1",
"researchedAt": "2026-07-03",
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22656",
"programName": "Montana - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
"status": "suppress_no_probability_evidence",
"sourceConfidence": "high",
"estimateConfidenceIfInputsPresent": "medium",
"officialSources": [
{
"title": "National Electric Vehicle Infrastructure Program (NEVI)",
"url": "[https://www.mdt.mt.gov/publications/plans/ev/](https://www.mdt.mt.gov/publications/plans/ev/)",
"owner": "Montana Department of Transportation",
"accessed": "2026-07-03",
"evidenceText": "MDT describes Montana NEVI as about $43 million for DC fast chargers along designated Alternative Fuel Corridors."
},
{
"title": "Alternative Fuels & Transportation - National Electric Vehicle Infrastructure",
"url": "[https://deq.mt.gov/energy/Programs/fuels](https://deq.mt.gov/energy/Programs/fuels)",
"owner": "Montana Department of Environmental Quality",
"accessed": "2026-07-03",
"evidenceText": "DEQ identifies NEVI as funding fast-charging infrastructure along key Montana travel corridors over five years."
},
{
"title": "Montana Electric Vehicle Infrastructure Deployment Plan FY 2022-2026, amended March 11, 2026",
"url": "[https://www.mdt.mt.gov/publications/plans/ev/docs/2022-26-NEVI-State-Plan.pdf?v=1](https://www.mdt.mt.gov/publications/plans/ev/docs/2022-26-NEVI-State-Plan.pdf?v=1)",
"owner": "Montana Department of Transportation and Montana Department of Environmental Quality",
"accessed": "2026-07-03",
"evidenceText": "The plan says MDT will use competitive two-phase Design-Build solicitations, private owners/operators will provide match, and 80/20 is an assumption until awards are made."
},
{
"title": "Contractor's System Project Question and Answer Forum - 301 NEVI Program - Interstate System",
"url": "[https://www.mdt.mt.gov/business/contracting/qacurrent.aspx](https://www.mdt.mt.gov/business/contracting/qacurrent.aspx)",
"owner": "Montana Department of Transportation",
"accessed": "2026-07-03",
"evidenceText": "MDT identifies Project No. EV STWD(983), Control No. 10436000, with at least four 150 kW DCFC ports per station, public access, five-year operation and maintenance, and at least 20% eligible-cost contribution."
},
{
"title": "Contractor's System Project Question and Answer Forum - NEVI Clarifications",
"url": "[https://www.mdt.mt.gov/business/contracting/qacurrent.aspx](https://www.mdt.mt.gov/business/contracting/qacurrent.aspx)",
"owner": "Montana Department of Transportation",
"accessed": "2026-07-03",
"evidenceText": "MDT clarifies that MTC will select one NEVI Contractor, that three firms were shortlisted, and that federal share must not exceed $800,000 for each EV charging station."
},
{
"title": "FHWA Notice N 4510.909 - FY 2026 NEVI Formula Program Apportionment",
"url": "[https://highways.dot.gov/laws-regulations/directives/notices/n-4510909](https://highways.dot.gov/laws-regulations/directives/notices/n-4510909)",
"owner": "Federal Highway Administration",
"accessed": "2026-07-03",
"evidenceText": "FHWA states NEVI funds are available until expended, private entities may provide non-Federal share, and the Federal share payable is 80%."
},
{
"title": "23 CFR Part 680 - National Electric Vehicle Infrastructure Standards and Requirements",
"url": "[https://www.ecfr.gov/current/title-23/chapter-I/subchapter-G/part-680](https://www.ecfr.gov/current/title-23/chapter-I/subchapter-G/part-680)",
"owner": "Electronic Code of Federal Regulations",
"accessed": "2026-07-03",
"evidenceText": "NEVI corridor DCFC stations must have at least four network-connected DCFC ports, 150 kW per DCFC port, and public 24/7 availability."
},
{
"title": "National Electric Vehicle Infrastructure Formula Program Guidance",
"url": "[https://www.federalregister.gov/documents/2025/08/13/2025-15370/national-electric-vehicle-infrastructure-formula-program-guidance](https://www.federalregister.gov/documents/2025/08/13/2025-15370/national-electric-vehicle-infrastructure-formula-program-guidance)",
"owner": "Federal Highway Administration / Federal Register",
"accessed": "2026-07-03",
"evidenceText": "FHWA issued revised NEVI Interim Final Guidance effective August 13, 2025, initially directing funds to designated EV Alternative Fuel Corridors."
}
],
"sourceSummary": "Input package context reviewed from the uploaded prompt: . Official MDT, DEQ, FHWA, Federal Register, and eCFR sources show that Montana NEVI is a state-administered competitive design-build procurement for public DC fast-charging stations, not a guaranteed rebate. Public sources support maximum Federal participation of 80% of eligible costs, at least 20% non-Federal/contractor contribution, and an MDT clarification capping Federal share at $800,000 per EV charging station. The visible official sources do not support using 80% as a guaranteed award because the RFP price proposal/approved Federal share and station-specific agreements determine the actual reimbursement. The current procurement has a shortlist and one expected NEVI contractor, but no official success probability, no historical award/application success rate, and no defensible probability discount for generic users. Suppress default expected value.",
"packagePatch": {
"calculation_status": "calculable_with_missing_inputs",
"availability": {
"status": "active",
"fundingStatus": "unknown"
},
"input_requirements_to_add_or_update": [
{
"input_key": "mdt_contract_award_status",
"label": "MDT/MTC contract award status for Montana NEVI project",
"value_type": "enum",
"required_for": [
"effect_grant_expected_value_1_0f0a763b480029a9"
],
"allowed_values": [
"not_applied",
"not_shortlisted",
"shortlisted_not_selected",
"selected_pending_agreement",
"selected_agreement_executed"
],
"source_precedence": [
"application_status",
"admin_research"
],
"missing_severity": "blocks_calculation",
"supersedes": [
"mdt_procurement_selection",
"procurement_selection"
]
},
{
"input_key": "approved_federal_share_by_station_cents",
"label": "MDT-approved Federal share by EV charging station",
"value_type": "array",
"required_for": [
"effect_grant_expected_value_1_0f0a763b480029a9"
],
"source_precedence": [
"final_mdt_agreement",
"application_status",
"admin_research"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "approved_eligible_cost_by_station_cents",
"label": "MDT-approved eligible cost by EV charging station",
"value_type": "array",
"required_for": [
"effect_grant_expected_value_1_0f0a763b480029a9"
],
"source_precedence": [
"final_mdt_agreement",
"quote",
"application_status",
"admin_research"
],
"missing_severity": "blocks_calculation",
"supersedes": [
"eligible_project_cost"
]
},
{
"input_key": "ev_charging_station_count",
"label": "number of awarded EV charging stations",
"value_type": "number",
"required_for": [
"effect_grant_expected_value_1_0f0a763b480029a9"
],
"source_precedence": [
"final_mdt_agreement",
"admin_research"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "non_federal_match_confirmed",
"label": "non-Federal match or contractor contribution confirmed at 20% or higher",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_0f0a763b480029a9"
],
"source_precedence": [
"final_mdt_agreement",
"application_status",
"admin_research"
],
"missing_severity": "blocks_calculation",
"supersedes": [
"non_federal_match"
]
},
{
"input_key": "nevi_station_compliance_confirmed",
"label": "NEVI station compliance confirmed by MDT/FHWA requirements",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_0f0a763b480029a9"
],
"source_precedence": [
"final_mdt_agreement",
"quote",
"admin_research"
],
"missing_severity": "blocks_calculation",
"supersedes": [
"nevi_equipment_compliance",
"alternative_fuel_corridor_site"
]
},
{
"input_key": "final_mdt_station_specific_agreement",
"label": "final MDT station-specific agreement terms",
"value_type": "text",
"required_for": [
"effect_grant_expected_value_1_0f0a763b480029a9"
],
"source_precedence": [
"final_mdt_agreement",
"admin_research"
],
"missing_severity": "blocks_calculation",
"supersedes": [
"final_solicitation_terms"
]
}
],
"effects_to_add_or_update": [
{
"effect_id": "effect_grant_expected_value_1_0f0a763b480029a9",
"effect_type": "grant_expected_value",
"cash_value_classification": "reimbursement",
"value_model_kind": "competitive_cost_share",
"calculation": {
"method": "expected_value",
"amount_cents": null,
"percent": null,
"conditional_award_cents": null,
"conditional_award_formula": "Do not calculate from the public 80% maximum alone. Calculate only after MDT/MTC selection and station-specific agreement. For each awarded EV charging station i: station_award_cents = min(approved_federal_share_by_station_cents[i], round(0.80 * approved_eligible_cost_by_station_cents[i]), 80000000). conditional_award_cents = sum(station_award_cents). If approved Federal share by station is unavailable, suppress as max-only. If MDT contract award status is not selected_agreement_executed, suppress.",
"max_award_cents": null,
"min_award_cents": null,
"rate_rows": [
{
"row_id": "montana_nevi_per_awarded_ev_charging_station_cap",
"unit": "ev_charging_station",
"maximum_percent_of_eligible_cost": 0.8,
"minimum_non_federal_match_percent": 0.2,
"maximum_award_cents": 80000000,
"cost_basis": "approved_eligible_cost_by_station_cents",
"award_amount_basis": "approved_federal_share_by_station_cents"
}
],
"probability_discount": null,
"probability_evidence_type": "none"
},
"required_inputs": [
{
"input_key": "mdt_contract_award_status",
"required_value": "selected_agreement_executed"
},
{
"input_key": "approved_federal_share_by_station_cents",
"required_value": "array of MDT-approved Federal-share amounts"
},
{
"input_key": "approved_eligible_cost_by_station_cents",
"required_value": "array of MDT-approved eligible costs by station"
},
{
"input_key": "ev_charging_station_count",
"required_value": "number matching station cost arrays"
},
{
"input_key": "non_federal_match_confirmed",
"required_value": true
},
{
"input_key": "nevi_station_compliance_confirmed",
"required_value": true
},
{
"input_key": "final_mdt_station_specific_agreement",
"required_value": "executed or administratively verified agreement terms"
}
],
"missing_input_behavior": "suppress_until_review",
"includedInUserFacingTotalDefault": false,
"humanReviewRequired": true,
"reasonCodes": [
"competitive_procurement",
"not_a_rebate_or_first_come_program",
"requires_mdt_mtc_selection",
"requires_station_specific_agreement",
"cost_share_cap_only",
"approved_federal_share_required",
"per_station_cap_required",
"missing_probability_anchor",
"shortlist_count_not_used_as_probability",
"do_not_assume_80_percent_award",
"not_in_user_facing_total_by_default"
],
"calculationTrace": [
"Verify the current Montana NEVI procurement stage and whether the applicant/project is covered by an executed MDT station-specific agreement.",
"If the project is not selected and agreement-executed, return suppressed with reason code requires_mdt_mtc_selection.",
"Use the MDT-approved Federal share by station; do not infer an award from the 80% maximum alone.",
"For each awarded station, cap the Federal share at the lesser of approved Federal share, 80% of approved eligible station cost, or $800,000.",
"Require confirmed non-Federal contribution of at least 20% of eligible cost.",
"Require NEVI station compliance, including public DCFC corridor requirements and applicable MDT/FHWA terms.",
"Do not calculate competitive expected value because official sources do not provide a defensible probability discount."
]
}
]
},
"testCaseInputHints": [
{
"inputKey": "mdt_contract_award_status",
"valueType": "enum",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Default to not_applied or unknown; calculate only when selected_agreement_executed is administratively verified."
},
{
"inputKey": "approved_federal_share_by_station_cents",
"valueType": "array",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "Use amounts from executed MDT station-specific agreement or official award documentation; do not default to 80% of cost."
},
{
"inputKey": "approved_eligible_cost_by_station_cents",
"valueType": "array",
"whoProvides": "quote",
"realisticDefaultGuidance": "Use MDT-approved eligible costs by station, not total project cost unless final terms explicitly allow aggregate treatment."
},
{
"inputKey": "ev_charging_station_count",
"valueType": "number",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "Use the count of awarded EV charging stations in the MDT agreement; MDT clarification indicates station-specific agreements."
},
{
"inputKey": "non_federal_match_confirmed",
"valueType": "boolean",
"whoProvides": "application_status",
"realisticDefaultGuidance": "True only if the final proposal/agreement confirms contractor or other non-Federal contribution of at least 20%."
},
{
"inputKey": "nevi_station_compliance_confirmed",
"valueType": "boolean",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "True only if station scope meets MDT/FHWA NEVI requirements, including public DCFC service, AFC siting where applicable, and operation/maintenance duties."
},
{
"inputKey": "final_mdt_station_specific_agreement",
"valueType": "text",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "Reference executed MDT agreement, award notice, or equivalent official documentation before any value is calculated."
},
{
"inputKey": "montana_nevi_per_station_federal_cap_cents",
"valueType": "money_cents",
"whoProvides": "server_derived",
"realisticDefaultGuidance": "Use 80000000 cents per EV charging station from MDT clarification unless later official RFP/contract terms supersede it."
},
{
"inputKey": "maximum_federal_share_percent",
"valueType": "number",
"whoProvides": "server_derived",
"realisticDefaultGuidance": "Use 0.8 only as a cap, not as a guaranteed reimbursement percentage."
}
],
"remainingGaps": [
"The public MDT Q&A forum links to RFQ/RFP ZIP attachments; the ZIP attachments were not fully parsed in this research pass, so final agreement terms should be verified before calculation.",
"No official historical Montana NEVI success rate, final proposal count, or defensible probability discount was found.",
"The current 2026 procurement appears to be in a shortlist/RFP stage rather than open to new general applicants; availability for future rounds was not verified.",
"Actual reimbursement depends on MDT-approved Federal share, station-specific eligible costs, agreement terms, and compliance checks.",
"The public 80% Federal share and $800,000 per-station amount are caps; they are not a guaranteed award for unselected or merely eligible projects."
],
"doNotUseAsUserFacingEstimateReasons": [
"Competitive MDT procurement, not a guaranteed EV charger rebate.",
"Requires MDT/MTC selection and executed station-specific agreement.",
"No official probability discount or success rate supports expected-value calculation.",
"Public materials provide maximum cost-share limits, not guaranteed award amounts.",
"Approved Federal share by station and approved eligible costs are project-specific and missing for generic users.",
"Do not include in user-facing savings totals by default."
]
}

