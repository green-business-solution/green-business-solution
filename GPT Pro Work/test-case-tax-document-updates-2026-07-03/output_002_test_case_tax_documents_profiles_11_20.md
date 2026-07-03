{
"schemaVersion": "retrofi_test_case_tax_document_updates.v1",
"researchedAt": "2026-07-03",
"source": "gpt_pro",
"batchNumber": 2,
"profileTaxDocumentUpdates": [
{
"sampleUserId": "via-verde-bronx-renter-household",
"profileSummary": {
"companyName": "Anonymized renter household at Via Verde",
"siteAddress": "700 Brook Avenue, Bronx, NY 10455, USA",
"state": "NY",
"organizationType": "Residential",
"buildingType": "Multifamily / Apartment Building",
"squareFootage": null
},
"syntheticTaxFiles": [
{
"fileId": "taxfile_batch2_011_tenant_intake_2026",
"clientIntakeId": "ci_batch2_011_via_verde_bronx",
"siteId": "site_batch2_011_bronx_ny",
"originalFilename": "SYNTHETIC_2026_ViaVerde_Renter_Tenant_Tax_Intake_and_Utility_Responsibility.pdf",
"taxDocumentType": "other",
"taxYear": 2026,
"jurisdiction": "New York City, NY",
"issuingAuthority": "Synthetic tenant intake packet",
"syntheticNotice": "Synthetic estimated tax profile for test fixtures; not an actual tax document.",
"processingStatus": "processed",
"uploadedAt": "2026-07-03T00:00:00.000Z",
"processedAt": "2026-07-03T00:00:00.000Z"
}
],
"syntheticTaxExtractedValues": [
{
"extractedValueId": "xv_batch2_011_state_code",
"clientIntakeId": "ci_batch2_011_via_verde_bronx",
"fileId": "taxfile_batch2_011_tenant_intake_2026",
"fieldId": "state_code",
"fieldDisplayName": "State code",
"value": "NY",
"unit": "text",
"taxYear": 2026,
"periodStart": null,
"periodEnd": null,
"confidence": "high",
"sourceType": "synthetic_tax_document",
"sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
"sourcePath": "syntheticDocument.fields.state_code"
},
{
"extractedValueId": "xv_batch2_011_ownership_status",
"clientIntakeId": "ci_batch2_011_via_verde_bronx",
"fileId": "taxfile_batch2_011_tenant_intake_2026",
"fieldId": "ownership_status",
"fieldDisplayName": "Ownership status",
"value": "Lease",
"unit": "text",
"taxYear": 2026,
"periodStart": null,
"periodEnd": null,
"confidence": "high",
"sourceType": "synthetic_tax_document",
"sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
"sourcePath": "syntheticDocument.fields.ownership_status"
},
{
"extractedValueId": "xv_batch2_011_direct_property_tax_bill_to_applicant",
"clientIntakeId": "ci_batch2_011_via_verde_bronx",
"fileId": "taxfile_batch2_011_tenant_intake_2026",
"fieldId": "direct_property_tax_bill_to_applicant",
"fieldDisplayName": "Direct property tax bill to applicant",
"value": false,
"unit": "boolean",
"taxYear": 2026,
"periodStart": null,
"periodEnd": null,
"confidence": "high",
"sourceType": "synthetic_tax_document",
"sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
"sourcePath": "syntheticDocument.fields.direct_property_tax_bill_to_applicant"
},
{
"extractedValueId": "xv_batch2_011_tenant_unit_utility_responsibility",
"clientIntakeId": "ci_batch2_011_via_verde_bronx",
"fileId": "taxfile_batch2_011_tenant_intake_2026",
"fieldId": "tenant_unit_utility_responsibility",
"fieldDisplayName": "Tenant unit utility responsibility",
"value": "Tenant-paid or tenant-allocated electric, gas, and water; common-area and central-system tax treatment controlled by owner or property manager.",
"unit": "text",
"taxYear": 2026,
"periodStart": "2026-01-01",
"periodEnd": "2026-12-31",
"confidence": "medium",
"sourceType": "synthetic_tax_document",
"sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
"sourcePath": "syntheticDocument.fields.tenant_unit_utility_responsibility"
},
{
"extractedValueId": "xv_batch2_011_building_type",
"clientIntakeId": "ci_batch2_011_via_verde_bronx",
"fileId": "taxfile_batch2_011_tenant_intake_2026",
"fieldId": "building_type",
"fieldDisplayName": "Building type",
"value": "Multifamily / Apartment Building",
"unit": "text",
"taxYear": 2026,
"periodStart": null,
"periodEnd": null,
"confidence": "high",
"sourceType": "synthetic_tax_document",
"sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
"sourcePath": "syntheticDocument.fields.building_type"
},
{
"extractedValueId": "xv_batch2_011_eligible_current_batch_tax_geography",
"clientIntakeId": "ci_batch2_011_via_verde_bronx",
"fileId": "taxfile_batch2_011_tenant_intake_2026",
"fieldId": "eligible_current_batch_tax_geography",
"fieldDisplayName": "Eligible current batch tax geography",
"value": false,
"unit": "boolean",
"taxYear": 2026,
"periodStart": null,
"periodEnd": null,
"confidence": "high",
"sourceType": "synthetic_tax_document",
"sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
"sourcePath": "syntheticDocument.fields.eligible_current_batch_tax_geography"
}
],
"taxProfileFacts": [
{
"inputKey": "state_code",
"value": "NY",
"sourceFileId": "taxfile_batch2_011_tenant_intake_2026",
"sourceStrategy": "synthetic_tax_document",
"uiPlacement": "hidden_derived",
"userOverrideAllowed": false,
"defaultIsSynthetic": true,
"confidenceImpactUntilConfirmed": "low"
},
{
"inputKey": "ownership_status",
"value": "Lease",
"sourceFileId": "taxfile_batch2_011_tenant_intake_2026",
"sourceStrategy": "synthetic_tax_document",
"uiPlacement": "organization_profile",
"userOverrideAllowed": true,
"defaultIsSynthetic": true,
"confidenceImpactUntilConfirmed": "low"
},
{
"inputKey": "taxpayer_has_direct_property_tax_bill",
"value": false,
"sourceFileId": "taxfile_batch2_011_tenant_intake_2026",
"sourceStrategy": "synthetic_tax_document",
"uiPlacement": "property_tax_profile",
"userOverrideAllowed": true,
"defaultIsSynthetic": true,
"confidenceImpactUntilConfirmed": "medium"
},
{
"inputKey": "tenant_controls_common_area_or_roof_systems",
"value": false,
"sourceFileId": "taxfile_batch2_011_tenant_intake_2026",
"sourceStrategy": "synthetic_tax_document",
"uiPlacement": "property_tax_profile",
"userOverrideAllowed": true,
"defaultIsSynthetic": true,
"confidenceImpactUntilConfirmed": "medium"
},
{
"inputKey": "building_owner_or_landlord_tax_docs_required_for_property_incentives",
"value": true,
"sourceFileId": "taxfile_batch2_011_tenant_intake_2026",
"sourceStrategy": "synthetic_tax_document",
"uiPlacement": "property_tax_profile",
"userOverrideAllowed": false,
"defaultIsSynthetic": true,
"confidenceImpactUntilConfirmed": "high"
}
],
"opportunitySpecificTaxInputs": [],
"missingOrReviewInputs": [
"Landlord or property manager confirmation is required before using building-level property-tax, roof, common-area, or central-plant tax assumptions.",
"Tenant utility account or submetering documentation should be reviewed before attributing common-area loads to the household."
],
"sourceUrlsChecked": [
"[https://www.phippsny.org/locations/via-verde/](https://www.phippsny.org/locations/via-verde/)"
],
"reasoningNotes": "Synthetic renter fixture. New York is not one of the current batch tax geographies for the WA solar B&O preference, Rhode Island renewable property-tax workflow, or Michigan Renewable Energy Renaissance Zone workflow, so no opportunity input is pre-populated."
},
{
"sampleUserId": "hoa-mai-gardens-seattle-household",
"profileSummary": {
"companyName": "Anonymized household at Hoa Mai Gardens",
"siteAddress": "221 10th Avenue S, Seattle, WA 98104, USA",
"state": "WA",
"organizationType": "Residential",
"buildingType": "Multifamily / Apartment Building",
"squareFootage": 150730
},
"syntheticTaxFiles": [
{
"fileId": "taxfile_batch2_012_tenant_intake_2026",
"clientIntakeId": "ci_batch2_012_hoa_mai_gardens_seattle",
"siteId": "site_batch2_012_seattle_wa",
"originalFilename": "SYNTHETIC_2026_HoaMaiGardens_Renter_Tenant_Tax_Intake_and_Utility_Responsibility.pdf",
"taxDocumentType": "other",
"taxYear": 2026,
"jurisdiction": "Seattle, WA",
"issuingAuthority": "Synthetic tenant intake packet",
"syntheticNotice": "Synthetic estimated tax profile for test fixtures; not an actual tax document.",
"processingStatus": "processed",
"uploadedAt": "2026-07-03T00:00:00.000Z",
"processedAt": "2026-07-03T00:00:00.000Z"
}
],
"syntheticTaxExtractedValues": [
{
"extractedValueId": "xv_batch2_012_state_code",
"clientIntakeId": "ci_batch2_012_hoa_mai_gardens_seattle",
"fileId": "taxfile_batch2_012_tenant_intake_2026",
"fieldId": "state_code",
"fieldDisplayName": "State code",
"value": "WA",
"unit": "text",
"taxYear": 2026,
"periodStart": null,
"periodEnd": null,
"confidence": "high",
"sourceType": "synthetic_tax_document",
"sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
"sourcePath": "syntheticDocument.fields.state_code"
},
{
"extractedValueId": "xv_batch2_012_ownership_status",
"clientIntakeId": "ci_batch2_012_hoa_mai_gardens_seattle",
"fileId": "taxfile_batch2_012_tenant_intake_2026",
"fieldId": "ownership_status",
"fieldDisplayName": "Ownership status",
"value": "Lease",
"unit": "text",
"taxYear": 2026,
"periodStart": null,
"periodEnd": null,
"confidence": "high",
"sourceType": "synthetic_tax_document",
"sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
"sourcePath": "syntheticDocument.fields.ownership_status"
},
{
"extractedValueId": "xv_batch2_012_site_square_footage",
"clientIntakeId": "ci_batch2_012_hoa_mai_gardens_seattle",
"fileId": "taxfile_batch2_012_tenant_intake_2026",
"fieldId": "site_square_footage",
"fieldDisplayName": "Site square footage",
"value": 150730,
"unit": "square_feet",
"taxYear": 2026,
"periodStart": null,
"periodEnd": null,
"confidence": "medium",
"sourceType": "synthetic_tax_document",
"sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
"sourcePath": "syntheticDocument.fields.site_square_footage"
},
{
"extractedValueId": "xv_batch2_012_direct_property_tax_bill_to_applicant",
"clientIntakeId": "ci_batch2_012_hoa_mai_gardens_seattle",
"fileId": "taxfile_batch2_012_tenant_intake_2026",
"fieldId": "direct_property_tax_bill_to_applicant",
"fieldDisplayName": "Direct property tax bill to applicant",
"value": false,
"unit": "boolean",
"taxYear": 2026,
"periodStart": null,
"periodEnd": null,
"confidence": "high",
"sourceType": "synthetic_tax_document",
"sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
"sourcePath": "syntheticDocument.fields.direct_property_tax_bill_to_applicant"
},
{
"extractedValueId": "xv_batch2_012_business_excise_tax_return_present",
"clientIntakeId": "ci_batch2_012_hoa_mai_gardens_seattle",
"fileId": "taxfile_batch2_012_tenant_intake_2026",
"fieldId": "business_excise_tax_return_present",
"fieldDisplayName": "Washington business excise tax return present",
"value": false,
"unit": "boolean",
"taxYear": 2026,
"periodStart": "2026-01-01",
"periodEnd": "2026-12-31",
"confidence": "high",
"sourceType": "synthetic_tax_document",
"sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
"sourcePath": "syntheticDocument.fields.business_excise_tax_return_present"
},
{
"extractedValueId": "xv_batch2_012_solar_manufacturing_activity_indicated",
"clientIntakeId": "ci_batch2_012_hoa_mai_gardens_seattle",
"fileId": "taxfile_batch2_012_tenant_intake_2026",
"fieldId": "solar_manufacturing_activity_indicated",
"fieldDisplayName": "Solar manufacturing activity indicated",
"value": false,
"unit": "boolean",
"taxYear": 2026,
"periodStart": "2026-01-01",
"periodEnd": "2026-12-31",
"confidence": "high",
"sourceType": "synthetic_tax_document",
"sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
"sourcePath": "syntheticDocument.fields.solar_manufacturing_activity_indicated"
}
],
"taxProfileFacts": [
{
"inputKey": "state_code",
"value": "WA",
"sourceFileId": "taxfile_batch2_012_tenant_intake_2026",
"sourceStrategy": "synthetic_tax_document",
"uiPlacement": "hidden_derived",
"userOverrideAllowed": false,
"defaultIsSynthetic": true,
"confidenceImpactUntilConfirmed": "low"
},
{
"inputKey": "ownership_status",
"value": "Lease",
"sourceFileId": "taxfile_batch2_012_tenant_intake_2026",
"sourceStrategy": "synthetic_tax_document",
"uiPlacement": "organization_profile",
"userOverrideAllowed": true,
"defaultIsSynthetic": true,
"confidenceImpactUntilConfirmed": "low"
},
{
"inputKey": "qualifying_solar_b_and_o_classification",
"value": "not_applicable_residential_renter",
"sourceFileId": "taxfile_batch2_012_tenant_intake_2026",
"sourceStrategy": "synthetic_tax_document",
"uiPlacement": "organization_profile",
"userOverrideAllowed": true,
"defaultIsSynthetic": true,
"confidenceImpactUntilConfirmed": "high"
},
{
"inputKey": "has_washington_business_excise_tax_return",
"value": false,
"sourceFileId": "taxfile_batch2_012_tenant_intake_2026",
"sourceStrategy": "synthetic_tax_document",
"uiPlacement": "tax_profile",
"userOverrideAllowed": true,
"defaultIsSynthetic": true,
"confidenceImpactUntilConfirmed": "high"
},
{
"inputKey": "taxpayer_has_direct_property_tax_bill",
"value": false,
"sourceFileId": "taxfile_batch2_012_tenant_intake_2026",
"sourceStrategy": "synthetic_tax_document",
"uiPlacement": "property_tax_profile",
"userOverrideAllowed": true,
"defaultIsSynthetic": true,
"confidenceImpactUntilConfirmed": "medium"
}
],
"opportunitySpecificTaxInputs": [
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:381",
"inputKey": "qualifying_solar_b_and_o_classification",
"value": "not_applicable_residential_renter",
"sourceFileId": "taxfile_batch2_012_tenant_intake_2026",
"estimateStatusIfUsed": "suppressed",
"includeInUserFacingTotalBeforeConfirmation": false,
"notes": "Synthetic lease/intake document identifies a residential tenant, not a Washington solar manufacturer, processor for hire, or manufacturer wholesaler."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:381",
"inputKey": "qualifying_tax_base_after_deductions_and_matc_cents",
"value": null,
"sourceFileId": "taxfile_batch2_012_tenant_intake_2026",
"estimateStatusIfUsed": "suppressed",
"includeInUserFacingTotalBeforeConfirmation": false,
"notes": "No Washington B&O tax base appears in the household tenant fixture."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:381",
"inputKey": "annual_tax_performance_report_filed",
"value": null,
"sourceFileId": "taxfile_batch2_012_tenant_intake_2026",
"estimateStatusIfUsed": "suppressed",
"includeInUserFacingTotalBeforeConfirmation": false,
"notes": "Annual Tax Performance Report status is not relevant unless the applicant is a qualifying solar manufacturer claiming the WA preference."
}
],
"missingOrReviewInputs": [
"Do not request B&O tax workpapers from this residential household unless the organization profile is corrected to a Washington solar manufacturing business.",
"Housing-authority or landlord documents would be required for any building-owner tax review."
],
"sourceUrlsChecked": [
"[https://www.seattlehousing.org/](https://www.seattlehousing.org/)",
"[https://apps.leg.wa.gov/rcw/default.aspx?cite=82.04.294](https://apps.leg.wa.gov/rcw/default.aspx?cite=82.04.294)",
"[https://dor.wa.gov/education/industry-guides/manufacturing-guide/manufacturing-solar-energy-systems-and-components-solar-energy-systems](https://dor.wa.gov/education/industry-guides/manufacturing-guide/manufacturing-solar-energy-systems-and-components-solar-energy-systems)"
],
"reasoningNotes": "Washington geography matches one current batch rule, but the synthetic tax document classifies the applicant as a residential renter. The Washington solar manufacturing B&O preference is therefore suppressed rather than estimated."
},
{
"sampleUserId": "tapiz-mariposa-denver-household",
"profileSummary": {
"companyName": "Anonymized senior or disabled household at Tapiz at Mariposa",
"siteAddress": "1099 Osage Street, Denver, CO 80204, USA",
"state": "CO",
"organizationType": "Residential",
"buildingType": "Multifamily / Apartment Building",
"squareFootage": null
},
"syntheticTaxFiles": [
{
"fileId": "taxfile_batch2_013_tenant_intake_2026",
"clientIntakeId": "ci_batch2_013_tapiz_mariposa_denver",
"siteId": "site_batch2_013_denver_co",
"originalFilename": "SYNTHETIC_2026_TapizMariposa_Renter_Tenant_Tax_Intake_and_Utility_Responsibility.pdf",
"taxDocumentType": "other",
"taxYear": 2026,
"jurisdiction": "Denver, CO",
"issuingAuthority": "Synthetic tenant intake packet",
"syntheticNotice": "Synthetic estimated tax profile for test fixtures; not an actual tax document.",
"processingStatus": "processed",
"uploadedAt": "2026-07-03T00:00:00.000Z",
"processedAt": "2026-07-03T00:00:00.000Z"
}
],
"syntheticTaxExtractedValues": [
{
"extractedValueId": "xv_batch2_013_state_code",
"clientIntakeId": "ci_batch2_013_tapiz_mariposa_denver",
"fileId": "taxfile_batch2_013_tenant_intake_2026",
"fieldId": "state_code",
"fieldDisplayName": "State code",
"value": "CO",
"unit": "text",
"taxYear": 2026,
"periodStart": null,
"periodEnd": null,
"confidence": "high",
"sourceType": "synthetic_tax_document",
"sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
"sourcePath": "syntheticDocument.fields.state_code"
},
{
"extractedValueId": "xv_batch2_013_ownership_status",
"clientIntakeId": "ci_batch2_013_tapiz_mariposa_denver",
"fileId": "taxfile_batch2_013_tenant_intake_2026",
"fieldId": "ownership_status",
"fieldDisplayName": "Ownership status",
"value": "Lease",
"unit": "text",
"taxYear": 2026,
"periodStart": null,
"periodEnd": null,
"confidence": "high",
"sourceType": "synthetic_tax_document",
"sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
"sourcePath": "syntheticDocument.fields.ownership_status"
},
{
"extractedValueId": "xv_batch2_013_direct_property_tax_bill_to_applicant",
"clientIntakeId": "ci_batch2_013_tapiz_mariposa_denver",
"fileId": "taxfile_batch2_013_tenant_intake_2026",
"fieldId": "direct_property_tax_bill_to_applicant",
"fieldDisplayName": "Direct property tax bill to applicant",
"value": false,
"unit": "boolean",
"taxYear": 2026,
"periodStart": null,
"periodEnd": null,
"confidence": "high",
"sourceType": "synthetic_tax_document",
"sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
"sourcePath": "syntheticDocument.fields.direct_property_tax_bill_to_applicant"
},
{
"extractedValueId": "xv_batch2_013_household_priority_status",
"clientIntakeId": "ci_batch2_013_tapiz_mariposa_denver",
"fileId": "taxfile_batch2_013_tenant_intake_2026",
"fieldId": "household_priority_status",
"fieldDisplayName": "Household priority status",
"value": "Senior or disabled public-housing household; income-qualified status should be confirmed from program or lease records.",
"unit": "text",
"taxYear": 2026,
"periodStart": "2026-01-01",
"periodEnd": "2026-12-31",
"confidence": "medium",
"sourceType": "synthetic_tax_document",
"sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
"sourcePath": "syntheticDocument.fields.household_priority_status"
},
{
"extractedValueId": "xv_batch2_013_building_type",
"clientIntakeId": "ci_batch2_013_tapiz_mariposa_denver",
"fileId": "taxfile_batch2_013_tenant_intake_2026",
"fieldId": "building_type",
"fieldDisplayName": "Building type",
"value": "Multifamily / Apartment Building",
"unit": "text",
"taxYear": 2026,
"periodStart": null,
"periodEnd": null,
"confidence": "high",
"sourceType": "synthetic_tax_document",
"sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
"sourcePath": "syntheticDocument.fields.building_type"
},
{
"extractedValueId": "xv_batch2_013_eligible_current_batch_tax_geography",
"clientIntakeId": "ci_batch2_013_tapiz_mariposa_denver",
"fileId": "taxfile_batch2_013_tenant_intake_2026",
"fieldId": "eligible_current_batch_tax_geography",
"fieldDisplayName": "Eligible current batch tax geography",
"value": false,
"unit": "boolean",
"taxYear": 2026,
"periodStart": null,
"periodEnd": null,
"confidence": "high",
"sourceType": "synthetic_tax_document",
"sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
"sourcePath": "syntheticDocument.fields.eligible_current_batch_tax_geography"
}
],
"taxProfileFacts": [
{
"inputKey": "state_code",
"value": "CO",
"sourceFileId": "taxfile_batch2_013_tenant_intake_2026",
"sourceStrategy": "synthetic_tax_document",
"uiPlacement": "hidden_derived",
"userOverrideAllowed": false,
"defaultIsSynthetic": true,
"confidenceImpactUntilConfirmed": "low"
},
{
"inputKey": "ownership_status",
"value": "Lease",
"sourceFileId": "taxfile_batch2_013_tenant_intake_2026",
"sourceStrategy": "synthetic_tax_document",
"uiPlacement": "organization_profile",
"userOverrideAllowed": true,
"defaultIsSynthetic": true,
"confidenceImpactUntilConfirmed": "low"
},
{
"inputKey": "taxpayer_has_direct_property_tax_bill",
"value": false,
"sourceFileId": "taxfile_batch2_013_tenant_intake_2026",
"sourceStrategy": "synthetic_tax_document",
"uiPlacement": "property_tax_profile",
"userOverrideAllowed": true,
"defaultIsSynthetic": true,
"confidenceImpactUntilConfirmed": "medium"
},
{
"inputKey": "tenant_controls_common_area_or_roof_systems",
"value": false,
"sourceFileId": "taxfile_batch2_013_tenant_intake_2026",
"sourceStrategy": "synthetic_tax_document",
"uiPlacement": "property_tax_profile",
"userOverrideAllowed": true,
"defaultIsSynthetic": true,
"confidenceImpactUntilConfirmed": "medium"
},
{
"inputKey": "income_or_medical_priority_status_needs_program_confirmation",
"value": true,
"sourceFileId": "taxfile_batch2_013_tenant_intake_2026",
"sourceStrategy": "synthetic_tax_document",
"uiPlacement": "organization_profile",
"userOverrideAllowed": true,
"defaultIsSynthetic": true,
"confidenceImpactUntilConfirmed": "medium"
}
],
"opportunitySpecificTaxInputs": [],
"missingOrReviewInputs": [
"Denver Housing Authority or property manager confirmation is required before using building-level tax or common-area system assumptions.",
"Income-qualified or medically vulnerable status should be confirmed from program documentation before using eligibility-sensitive recommendations."
],
"sourceUrlsChecked": [
"[https://www.denverhousing.org/](https://www.denverhousing.org/)"
],
"reasoningNotes": "Synthetic tenant fixture. Colorado is outside the current batch tax geographies, so no WA, RI, or MI opportunity inputs are populated."
},
{
"sampleUserId": "keauhou-lane-honolulu-renter",
"profileSummary": {
"companyName": "Anonymized workforce-housing household at Keauhou Lane",
"siteAddress": "502 Keawe Street, Honolulu, HI 96813, USA",
"state": "HI",
"organizationType": "Residential",
"buildingType": "Mixed-use",
"squareFootage": 179800
},
"syntheticTaxFiles": [
{
"fileId": "taxfile_batch2_014_tenant_intake_2026",
"clientIntakeId": "ci_batch2_014_keauhou_lane_honolulu",
"siteId": "site_batch2_014_honolulu_hi",
"originalFilename": "SYNTHETIC_2026_KeauhouLane_Renter_Tenant_Tax_Intake_and_Utility_Responsibility.pdf",
"taxDocumentType": "other",
"taxYear": 2026,
"jurisdiction": "Honolulu, HI",
"issuingAuthority": "Synthetic tenant intake packet",
"syntheticNotice": "Synthetic estimated tax profile for test fixtures; not an actual tax document.",
"processingStatus": "processed",
"uploadedAt": "2026-07-03T00:00:00.000Z",
"processedAt": "2026-07-03T00:00:00.000Z"
}
],
"syntheticTaxExtractedValues": [
{
"extractedValueId": "xv_batch2_014_state_code",
"clientIntakeId": "ci_batch2_014_keauhou_lane_honolulu",
"fileId": "taxfile_batch2_014_tenant_intake_2026",
"fieldId": "state_code",
"fieldDisplayName": "State code",
"value": "HI",
"unit": "text",
"taxYear": 2026,
"periodStart": null,
"periodEnd": null,
"confidence": "high",
"sourceType": "synthetic_tax_document",
"sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
"sourcePath": "syntheticDocument.fields.state_code"
},
{
"extractedValueId": "xv_batch2_014_ownership_status",
"clientIntakeId": "ci_batch2_014_keauhou_lane_honolulu",
"fileId": "taxfile_batch2_014_tenant_intake_2026",
"fieldId": "ownership_status",
"fieldDisplayName": "Ownership status",
"value": "Lease",
"unit": "text",
"taxYear": 2026,
"periodStart": null,
"periodEnd": null,
"confidence": "high",
"sourceType": "synthetic_tax_document",
"sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
"sourcePath": "syntheticDocument.fields.ownership_status"
},
{
"extractedValueId": "xv_batch2_014_site_square_footage",
"clientIntakeId": "ci_batch2_014_keauhou_lane_honolulu",
"fileId": "taxfile_batch2_014_tenant_intake_2026",
"fieldId": "site_square_footage",
"fieldDisplayName": "Site square footage",
"value": 179800,
"unit": "square_feet",
"taxYear": 2026,
"periodStart": null,
"periodEnd": null,
"confidence": "medium",
"sourceType": "synthetic_tax_document",
"sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
"sourcePath": "syntheticDocument.fields.site_square_footage"
},
{
"extractedValueId": "xv_batch2_014_mixed_use_load_split_review_required",
"clientIntakeId": "ci_batch2_014_keauhou_lane_honolulu",
"fileId": "taxfile_batch2_014_tenant_intake_2026",
"fieldId": "mixed_use_load_split_review_required",
"fieldDisplayName": "Mixed-use load split review required",
"value": true,
"unit": "boolean",
"taxYear": 2026,
"periodStart": "2026-01-01",
"periodEnd": "2026-12-31",
"confidence": "high",
"sourceType": "synthetic_tax_document",
"sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
"sourcePath": "syntheticDocument.fields.mixed_use_load_split_review_required"
},
{
"extractedValueId": "xv_batch2_014_direct_property_tax_bill_to_applicant",
"clientIntakeId": "ci_batch2_014_keauhou_lane_honolulu",
"fileId": "taxfile_batch2_014_tenant_intake_2026",
"fieldId": "direct_property_tax_bill_to_applicant",
"fieldDisplayName": "Direct property tax bill to applicant",
"value": false,
"unit": "boolean",
"taxYear": 2026,
"periodStart": null,
"periodEnd": null,
"confidence": "high",
"sourceType": "synthetic_tax_document",
"sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
"sourcePath": "syntheticDocument.fields.direct_property_tax_bill_to_applicant"
},
{
"extractedValueId": "xv_batch2_014_eligible_current_batch_tax_geography",
"clientIntakeId": "ci_batch2_014_keauhou_lane_honolulu",
"fileId": "taxfile_batch2_014_tenant_intake_2026",
"fieldId": "eligible_current_batch_tax_geography",
"fieldDisplayName": "Eligible current batch tax geography",
"value": false,
"unit": "boolean",
"taxYear": 2026,
"periodStart": null,
"periodEnd": null,
"confidence": "high",
"sourceType": "synthetic_tax_document",
"sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
"sourcePath": "syntheticDocument.fields.eligible_current_batch_tax_geography"
}
],
"taxProfileFacts": [
{
"inputKey": "state_code",
"value": "HI",
"sourceFileId": "taxfile_batch2_014_tenant_intake_2026",
"sourceStrategy": "synthetic_tax_document",
"uiPlacement": "hidden_derived",
"userOverrideAllowed": false,
"defaultIsSynthetic": true,
"confidenceImpactUntilConfirmed": "low"
},
{
"inputKey": "ownership_status",
"value": "Lease",
"sourceFileId": "taxfile_batch2_014_tenant_intake_2026",
"sourceStrategy": "synthetic_tax_document",
"uiPlacement": "organization_profile",
"userOverrideAllowed": true,
"defaultIsSynthetic": true,
"confidenceImpactUntilConfirmed": "low"
},
{
"inputKey": "building_type",
"value": "Mixed-use",
"sourceFileId": "taxfile_batch2_014_tenant_intake_2026",
"sourceStrategy": "synthetic_tax_document",
"uiPlacement": "organization_profile",
"userOverrideAllowed": true,
"defaultIsSynthetic": true,
"confidenceImpactUntilConfirmed": "medium"
},
{
"inputKey": "site_square_footage",
"value": 179800,
"sourceFileId": "taxfile_batch2_014_tenant_intake_2026",
"sourceStrategy": "synthetic_tax_document",
"uiPlacement": "property_tax_profile",
"userOverrideAllowed": true,
"defaultIsSynthetic": true,
"confidenceImpactUntilConfirmed": "medium"
},
{
"inputKey": "mixed_use_residential_commercial_load_split_needs_review",
"value": true,
"sourceFileId": "taxfile_batch2_014_tenant_intake_2026",
"sourceStrategy": "synthetic_tax_document",
"uiPlacement": "property_tax_profile",
"userOverrideAllowed": true,
"defaultIsSynthetic": true,
"confidenceImpactUntilConfirmed": "high"
}
],
"opportunitySpecificTaxInputs": [],
"missingOrReviewInputs": [
"Landlord or property manager documents are required to allocate residential, commercial, rooftop solar, domestic hot water, and common-area tax treatment.",
"Workforce-housing status should be confirmed from lease or housing-program records before using income-restricted eligibility paths."
],
"sourceUrlsChecked": [
"[https://www.edlenandco.com/projects-middle-income/keauhou-lane](https://www.edlenandco.com/projects-middle-income/keauhou-lane)"
],
"reasoningNotes": "Synthetic mixed-use tenant fixture. Hawaii is not in the current WA, RI, or MI tax-rule batch, and the tenant does not have direct property-tax control."
},
{
"sampleUserId": "the-rose-minneapolis-household",
"profileSummary": {
"companyName": "Anonymized household at The Rose",
"siteAddress": "1928 Portland Avenue S, Minneapolis, MN 55404, USA",
"state": "MN",
"organizationType": "Residential",
"buildingType": "Multifamily / Apartment Building",
"squareFootage": 86195
},
"syntheticTaxFiles": [
{
"fileId": "taxfile_batch2_015_tenant_intake_2026",
"clientIntakeId": "ci_batch2_015_the_rose_minneapolis",
"siteId": "site_batch2_015_minneapolis_mn",
"originalFilename": "SYNTHETIC_2026_TheRose_Renter_Tenant_Tax_Intake_and_Utility_Responsibility.pdf",
"taxDocumentType": "other",
"taxYear": 2026,
"jurisdiction": "Minneapolis, MN",
"issuingAuthority": "Synthetic tenant intake packet",
"syntheticNotice": "Synthetic estimated tax profile for test fixtures; not an actual tax document.",
"processingStatus": "processed",
"uploadedAt": "2026-07-03T00:00:00.000Z",
"processedAt": "2026-07-03T00:00:00.000Z"
}
],
"syntheticTaxExtractedValues": [
{
"extractedValueId": "xv_batch2_015_state_code",
"clientIntakeId": "ci_batch2_015_the_rose_minneapolis",
"fileId": "taxfile_batch2_015_tenant_intake_2026",
"fieldId": "state_code",
"fieldDisplayName": "State code",
"value": "MN",
"unit": "text",
"taxYear": 2026,
"periodStart": null,
"periodEnd": null,
"confidence": "high",
"sourceType": "synthetic_tax_document",
"sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
"sourcePath": "syntheticDocument.fields.state_code"
},
{
"extractedValueId": "xv_batch2_015_ownership_status",
"clientIntakeId": "ci_batch2_015_the_rose_minneapolis",
"fileId": "taxfile_batch2_015_tenant_intake_2026",
"fieldId": "ownership_status",
"fieldDisplayName": "Ownership status",
"value": "Lease",
"unit": "text",
"taxYear": 2026,
"periodStart": null,
"periodEnd": null,
"confidence": "high",
"sourceType": "synthetic_tax_document",
"sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
"sourcePath": "syntheticDocument.fields.ownership_status"
},
{
"extractedValueId": "xv_batch2_015_site_square_footage",
"clientIntakeId": "ci_batch2_015_the_rose_minneapolis",
"fileId": "taxfile_batch2_015_tenant_intake_2026",
"fieldId": "site_square_footage",
"fieldDisplayName": "Site square footage",
"value": 86195,
"unit": "square_feet",
"taxYear": 2026,
"periodStart": null,
"periodEnd": null,
"confidence": "medium",
"sourceType": "synthetic_tax_document",
"sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
"sourcePath": "syntheticDocument.fields.site_square_footage"
},
{
"extractedValueId": "xv_batch2_015_direct_property_tax_bill_to_applicant",
"clientIntakeId": "ci_batch2_015_the_rose_minneapolis",
"fileId": "taxfile_batch2_015_tenant_intake_2026",
"fieldId": "direct_property_tax_bill_to_applicant",
"fieldDisplayName": "Direct property tax bill to applicant",
"value": false,
"unit": "boolean",
"taxYear": 2026,
"periodStart": null,
"periodEnd": null,
"confidence": "high",
"sourceType": "synthetic_tax_document",
"sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
"sourcePath": "syntheticDocument.fields.direct_property_tax_bill_to_applicant"
},
{
"extractedValueId": "xv_batch2_015_mixed_income_housing_status",
"clientIntakeId": "ci_batch2_015_the_rose_minneapolis",
"fileId": "taxfile_batch2_015_tenant_intake_2026",
"fieldId": "mixed_income_housing_status",
"fieldDisplayName": "Mixed-income housing status",
"value": "Mixed-income multifamily household; exact income qualification requires lease or program confirmation.",
"unit": "text",
"taxYear": 2026,
"periodStart": "2026-01-01",
"periodEnd": "2026-12-31",
"confidence": "medium",
"sourceType": "synthetic_tax_document",
"sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
"sourcePath": "syntheticDocument.fields.mixed_income_housing_status"
},
{
"extractedValueId": "xv_batch2_015_eligible_current_batch_tax_geography",
"clientIntakeId": "ci_batch2_015_the_rose_minneapolis",
"fileId": "taxfile_batch2_015_tenant_intake_2026",
"fieldId": "eligible_current_batch_tax_geography",
"fieldDisplayName": "Eligible current batch tax geography",
"value": false,
"unit": "boolean",
"taxYear": 2026,
"periodStart": null,
"periodEnd": null,
"confidence": "high",
"sourceType": "synthetic_tax_document",
"sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
"sourcePath": "syntheticDocument.fields.eligible_current_batch_tax_geography"
}
],
"taxProfileFacts": [
{
"inputKey": "state_code",
"value": "MN",
"sourceFileId": "taxfile_batch2_015_tenant_intake_2026",
"sourceStrategy": "synthetic_tax_document",
"uiPlacement": "hidden_derived",
"userOverrideAllowed": false,
"defaultIsSynthetic": true,
"confidenceImpactUntilConfirmed": "low"
},
{
"inputKey": "ownership_status",
"value": "Lease",
"sourceFileId": "taxfile_batch2_015_tenant_intake_2026",
"sourceStrategy": "synthetic_tax_document",
"uiPlacement": "organization_profile",
"userOverrideAllowed": true,
"defaultIsSynthetic": true,
"confidenceImpactUntilConfirmed": "low"
},
{
"inputKey": "site_square_footage",
"value": 86195,
"sourceFileId": "taxfile_batch2_015_tenant_intake_2026",
"sourceStrategy": "synthetic_tax_document",
"uiPlacement": "property_tax_profile",
"userOverrideAllowed": true,
"defaultIsSynthetic": true,
"confidenceImpactUntilConfirmed": "medium"
},
{
"inputKey": "taxpayer_has_direct_property_tax_bill",
"value": false,
"sourceFileId": "taxfile_batch2_015_tenant_intake_2026",
"sourceStrategy": "synthetic_tax_document",
"uiPlacement": "property_tax_profile",
"userOverrideAllowed": true,
"defaultIsSynthetic": true,
"confidenceImpactUntilConfirmed": "medium"
},
{
"inputKey": "income_qualification_needs_program_confirmation",
"value": true,
"sourceFileId": "taxfile_batch2_015_tenant_intake_2026",
"sourceStrategy": "synthetic_tax_document",
"uiPlacement": "organization_profile",
"userOverrideAllowed": true,
"defaultIsSynthetic": true,
"confidenceImpactUntilConfirmed": "medium"
}
],
"opportunitySpecificTaxInputs": [],
"missingOrReviewInputs": [
"Property owner tax bill and assessor data are required for property-level tax analysis.",
"Lease or affordable-housing program records are required before using household income-status assumptions."
],
"sourceUrlsChecked": [
"[https://aeon.org/communities/the-rose/](https://aeon.org/communities/the-rose/)"
],
"reasoningNotes": "Synthetic renter fixture. Minnesota is outside the current batch tax geographies, so no opportunity-specific fields are populated."
},
{
"sampleUserId": "bens-chili-bowl-dc",
"profileSummary": {
"companyName": "Ben's Chili Bowl - U Street Location",
"siteAddress": "1213 U Street NW, Washington, DC 20009, USA",
"state": "DC",
"organizationType": "Commercial Business",
"buildingType": "Restaurant / Commercial Kitchen",
"squareFootage": 3000
},
"syntheticTaxFiles": [
{
"fileId": "taxfile_batch2_016_dc_business_tax_summary_2026",
"clientIntakeId": "ci_batch2_016_bens_chili_bowl_dc",
"siteId": "site_batch2_016_washington_dc",
"originalFilename": "SYNTHETIC_2026_BensChiliBowl_DC_Business_Tax_Return_Summary.pdf",
"taxDocumentType": "business_tax_return_summary",
"taxYear": 2026,
"jurisdiction": "District of Columbia",
"issuingAuthority": "Synthetic DC Office of Tax and Revenue return summary",
"syntheticNotice": "Synthetic estimated tax profile for test fixtures; not an actual tax document.",
"processingStatus": "processed",
"uploadedAt": "2026-07-03T00:00:00.000Z",
"processedAt": "2026-07-03T00:00:00.000Z"
},
{
"fileId": "taxfile_batch2_016_lease_cam_tax_reconciliation_2026",
"clientIntakeId": "ci_batch2_016_bens_chili_bowl_dc",
"siteId": "site_batch2_016_washington_dc",
"originalFilename": "SYNTHETIC_2026_BensChiliBowl_Lease_CAM_Property_Tax_Reconciliation.pdf",
"taxDocumentType": "other",
"taxYear": 2026,
"jurisdiction": "Washington, DC",
"issuingAuthority": "Synthetic landlord CAM/property-tax reconciliation",
"syntheticNotice": "Synthetic estimated tax profile for test fixtures; not an actual tax document.",
"processingStatus": "processed",
"uploadedAt": "2026-07-03T00:00:00.000Z",
"processedAt": "2026-07-03T00:00:00.000Z"
}
],
"syntheticTaxExtractedValues": [
{
"extractedValueId": "xv_batch2_016_state_code",
"clientIntakeId": "ci_batch2_016_bens_chili_bowl_dc",
"fileId": "taxfile_batch2_016_dc_business_tax_summary_2026",
"fieldId": "state_code",
"fieldDisplayName": "State code",
"value": "DC",
"unit": "text",
"taxYear": 2026,
"periodStart": null,
"periodEnd": null,
"confidence": "high",
"sourceType": "synthetic_tax_document",
"sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
"sourcePath": "syntheticDocument.fields.state_code"
},
{
"extractedValueId": "xv_batch2_016_naics_primary",
"clientIntakeId": "ci_batch2_016_bens_chili_bowl_dc",
"fileId": "taxfile_batch2_016_dc_business_tax_summary_2026",
"fieldId": "naics_primary",
"fieldDisplayName": "Primary NAICS",
"value": "722513",
"unit": "text",
"taxYear": 2026,
"periodStart": "2026-01-01",
"periodEnd": "2026-12-31",
"confidence": "medium",
"sourceType": "synthetic_tax_document",
"sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
"sourcePath": "syntheticDocument.fields.naics_primary"
},
{
"extractedValueId": "xv_batch2_016_annual_gross_receipts_cents",
"clientIntakeId": "ci_batch2_016_bens_chili_bowl_dc",
"fileId": "taxfile_batch2_016_dc_business_tax_summary_2026",
"fieldId": "annual_gross_receipts_cents",
"fieldDisplayName": "Annual gross receipts",
"value": 320000000,
"unit": "cents",
"taxYear": 2026,
"periodStart": "2026-01-01",
"periodEnd": "2026-12-31",
"confidence": "medium",
"sourceType": "synthetic_tax_document",
"sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
"sourcePath": "syntheticDocument.fields.annual_gross_receipts_cents"
},
{
"extractedValueId": "xv_batch2_016_sales_use_tax_account_present",
"clientIntakeId": "ci_batch2_016_bens_chili_bowl_dc",
"fileId": "taxfile_batch2_016_dc_business_tax_summary_2026",
"fieldId": "sales_use_tax_account_present",
"fieldDisplayName": "Sales and use tax account present",
"value": true,
"unit": "boolean",
"taxYear": 2026,
"periodStart": "2026-01-01",
"periodEnd": "2026-12-31",
"confidence": "high",
"sourceType": "synthetic_tax_document",
"sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
"sourcePath": "syntheticDocument.fields.sales_use_tax_account_present"
},
{
"extractedValueId": "xv_batch2_016_leased_square_footage",
"clientIntakeId": "ci_batch2_016_bens_chili_bowl_dc",
"fileId": "taxfile_batch2_016_lease_cam_tax_reconciliation_2026",
"fieldId": "leased_square_footage",
"fieldDisplayName": "Leased square footage",
"value": 3000,
"unit": "square_feet",
"taxYear": 2026,
"periodStart": null,
"periodEnd": null,
"confidence": "medium",
"sourceType": "synthetic_tax_document",
"sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
"sourcePath": "syntheticDocument.fields.leased_square_footage"
},
{
"extractedValueId": "xv_batch2_016_lease_property_tax_cam_pass_through_cents",
"clientIntakeId": "ci_batch2_016_bens_chili_bowl_dc",
"fileId": "taxfile_batch2_016_lease_cam_tax_reconciliation_2026",
"fieldId": "lease_property_tax_cam_pass_through_cents",
"fieldDisplayName": "Lease property tax/CAM pass-through",
"value": 3800000,
"unit": "cents",
"taxYear": 2026,
"periodStart": "2026-01-01",
"periodEnd": "2026-12-31",
"confidence": "low",
"sourceType": "synthetic_tax_document",
"sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
"sourcePath": "syntheticDocument.fields.lease_property_tax_cam_pass_through_cents"
},
{
"extractedValueId": "xv_batch2_016_direct_property_tax_bill_to_applicant",
"clientIntakeId": "ci_batch2_016_bens_chili_bowl_dc",
"fileId": "taxfile_batch2_016_lease_cam_tax_reconciliation_2026",
"fieldId": "direct_property_tax_bill_to_applicant",
"fieldDisplayName": "Direct property tax bill to applicant",
"value": false,
"unit": "boolean",
"taxYear": 2026,
"periodStart": null,
"periodEnd": null,
"confidence": "medium",
"sourceType": "synthetic_tax_document",
"sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
"sourcePath": "syntheticDocument.fields.direct_property_tax_bill_to_applicant"
}
],
"taxProfileFacts": [
{
"inputKey": "state_code",
"value": "DC",
"sourceFileId": "taxfile_batch2_016_dc_business_tax_summary_2026",
"sourceStrategy": "synthetic_tax_document",
"uiPlacement": "hidden_derived",
"userOverrideAllowed": false,
"defaultIsSynthetic": true,
"confidenceImpactUntilConfirmed": "low"
},
{
"inputKey": "organization_type",
"value": "Commercial Business",
"sourceFileId": "taxfile_batch2_016_dc_business_tax_summary_2026",
"sourceStrategy": "synthetic_tax_document",
"uiPlacement": "organization_profile",
"userOverrideAllowed": true,
"defaultIsSynthetic": true,
"confidenceImpactUntilConfirmed": "low"
},
{
"inputKey": "primary_business_activity",
"value": "counter_service_restaurant_and_commercial_kitchen",
"sourceFileId": "taxfile_batch2_016_dc_business_tax_summary_2026",
"sourceStrategy": "synthetic_tax_document",
"uiPlacement": "organization_profile",
"userOverrideAllowed": true,
"defaultIsSynthetic": true,
"confidenceImpactUntilConfirmed": "medium"
},
{
"inputKey": "annual_gross_receipts_cents",
"value": 320000000,
"sourceFileId": "taxfile_batch2_016_dc_business_tax_summary_2026",
"sourceStrategy": "accountant_review",
"uiPlacement": "tax_profile",
"userOverrideAllowed": true,
"defaultIsSynthetic": true,
"confidenceImpactUntilConfirmed": "high"
},
{
"inputKey": "lease_property_tax_pass_through_cents",
"value": 3800000,
"sourceFileId": "taxfile_batch2_016_lease_cam_tax_reconciliation_2026",
"sourceStrategy": "accountant_review",
"uiPlacement": "property_tax_profile",
"userOverrideAllowed": true,
"defaultIsSynthetic": true,
"confidenceImpactUntilConfirmed": "high"
},
{
"inputKey": "taxpayer_has_direct_property_tax_bill",
"value": false,
"sourceFileId": "taxfile_batch2_016_lease_cam_tax_reconciliation_2026",
"sourceStrategy": "synthetic_tax_document",
"uiPlacement": "property_tax_profile",
"userOverrideAllowed": true,
"defaultIsSynthetic": true,
"confidenceImpactUntilConfirmed": "medium"
}
],
"opportunitySpecificTaxInputs": [],
"missingOrReviewInputs": [
"Accountant should confirm gross receipts, sales/use tax, and business personal property filings before any tax calculation.",
"Landlord property-tax bill is required before treating CAM tax pass-through as a property-tax basis."
],
"sourceUrlsChecked": [
"[https://www.benschilibowl.com/](https://www.benschilibowl.com/)"
],
"reasoningNotes": "Synthetic restaurant fixture. District of Columbia is outside the current batch tax geographies; business-tax and CAM fields are included only as realistic uploaded tax documents."
},
{
"sampleUserId": "zingermans-deli-ann-arbor",
"profileSummary": {
"companyName": "Zingerman's Delicatessen",
"siteAddress": "422 Detroit Street, Ann Arbor, MI 48104, USA",
"state": "MI",
"organizationType": "Commercial Business",
"buildingType": "Restaurant / Commercial Kitchen",
"squareFootage": 13000
},
"syntheticTaxFiles": [
{
"fileId": "taxfile_batch2_017_mi_business_tax_summary_2026",
"clientIntakeId": "ci_batch2_017_zingermans_deli_ann_arbor",
"siteId": "site_batch2_017_ann_arbor_mi",
"originalFilename": "SYNTHETIC_2026_Zingermans_MI_Business_Tax_Return_Summary.pdf",
"taxDocumentType": "business_tax_return_summary",
"taxYear": 2026,
"jurisdiction": "Michigan",
"issuingAuthority": "Synthetic Michigan business tax return summary",
"syntheticNotice": "Synthetic estimated tax profile for test fixtures; not an actual tax document.",
"processingStatus": "processed",
"uploadedAt": "2026-07-03T00:00:00.000Z",
"processedAt": "2026-07-03T00:00:00.000Z"
},
{
"fileId": "taxfile_batch2_017_ann_arbor_property_tax_summary_2026",
"clientIntakeId": "ci_batch2_017_zingermans_deli_ann_arbor",
"siteId": "site_batch2_017_ann_arbor_mi",
"originalFilename": "SYNTHETIC_2026_Zingermans_AnnArbor_Property_Tax_and_ESA_Workpaper.pdf",
"taxDocumentType": "property_tax_bill",
"taxYear": 2026,
"jurisdiction": "Ann Arbor, Washtenaw County, MI",
"issuingAuthority": "Synthetic local property tax and ESA workpaper",
"syntheticNotice": "Synthetic estimated tax profile for test fixtures; not an actual tax document.",
"processingStatus": "processed",
"uploadedAt": "2026-07-03T00:00:00.000Z",
"processedAt": "2026-07-03T00:00:00.000Z"
},
{
"fileId": "taxfile_batch2_017_rerz_absence_attestation_2026",
"clientIntakeId": "ci_batch2_017_zingermans_deli_ann_arbor",
"siteId": "site_batch2_017_ann_arbor_mi",
"originalFilename": "SYNTHETIC_2026_Zingermans_Renaissance_Zone_Document_Check.pdf",
"taxDocumentType": "other",
"taxYear": 2026,
"jurisdiction": "Michigan",
"issuingAuthority": "Synthetic taxpayer document checklist",
"syntheticNotice": "Synthetic estimated tax profile for test fixtures; not an actual tax document.",
"processingStatus": "processed",
"uploadedAt": "2026-07-03T00:00:00.000Z",
"processedAt": "2026-07-03T00:00:00.000Z"
}
],
"syntheticTaxExtractedValues": [
{
"extractedValueId": "xv_batch2_017_state_code",
"clientIntakeId": "ci_batch2_017_zingermans_deli_ann_arbor",
"fileId": "taxfile_batch2_017_mi_business_tax_summary_2026",
"fieldId": "state_code",
"fieldDisplayName": "State code",
"value": "MI",
"unit": "text",
"taxYear": 2026,
"periodStart": null,
"periodEnd": null,
"confidence": "high",
"sourceType": "synthetic_tax_document",
"sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
"sourcePath": "syntheticDocument.fields.state_code"
},
{
"extractedValueId": "xv_batch2_017_naics_primary",
"clientIntakeId": "ci_batch2_017_zingermans_deli_ann_arbor",
"fileId": "taxfile_batch2_017_mi_business_tax_summary_2026",
"fieldId": "naics_primary",
"fieldDisplayName": "Primary NAICS",
"value": "722513",
"unit": "text",
"taxYear": 2026,
"periodStart": "2026-01-01",
"periodEnd": "2026-12-31",
"confidence": "medium",
"sourceType": "synthetic_tax_document",
"sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
"sourcePath": "syntheticDocument.fields.naics_primary"
},
{
"extractedValueId": "xv_batch2_017_annual_gross_receipts_cents",
"clientIntakeId": "ci_batch2_017_zingermans_deli_ann_arbor",
"fileId": "taxfile_batch2_017_mi_business_tax_summary_2026",
"fieldId": "annual_gross_receipts_cents",
"fieldDisplayName": "Annual gross receipts",
"value": 920000000,
"unit": "cents",
"taxYear": 2026,
"periodStart": "2026-01-01",
"periodEnd": "2026-12-31",
"confidence": "medium",
"sourceType": "synthetic_tax_document",
"sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
"sourcePath": "syntheticDocument.fields.annual_gross_receipts_cents"
},
{
"extractedValueId": "xv_batch2_017_company_current_on_state_and_local_taxes",
"clientIntakeId": "ci_batch2_017_zingermans_deli_ann_arbor",
"fileId": "taxfile_batch2_017_mi_business_tax_summary_2026",
"fieldId": "company_current_on_state_and_local_taxes",
"fieldDisplayName": "Company current on state and local taxes",
"value": true,
"unit": "boolean",
"taxYear": 2026,
"periodStart": "2026-01-01",
"periodEnd": "2026-12-31",
"confidence": "low",
"sourceType": "synthetic_tax_document",
"sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
"sourcePath": "syntheticDocument.fields.company_current_on_state_and_local_taxes"
},
{
"extractedValueId": "xv_batch2_017_eligible_state_education_tax_cents",
"clientIntakeId": "ci_batch2_017_zingermans_deli_ann_arbor",
"fileId": "taxfile_batch2_017_ann_arbor_property_tax_summary_2026",
"fieldId": "eligible_state_education_tax_cents",
"fieldDisplayName": "State education tax otherwise due",
"value": 1194000,
"unit": "cents",
"taxYear": 2026,
"periodStart": "2026-01-01",
"periodEnd": "2026-12-31",
"confidence": "medium",
"sourceType": "synthetic_tax_document",
"sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
"sourcePath": "syntheticDocument.fields.eligible_state_education_tax_cents"
},
{
"extractedValueId": "xv_batch2_017_eligible_real_property_tax_cents",
"clientIntakeId": "ci_batch2_017_zingermans_deli_ann_arbor",
"fileId": "taxfile_batch2_017_ann_arbor_property_tax_summary_2026",
"fieldId": "eligible_real_property_tax_cents",
"fieldDisplayName": "Local real property tax otherwise due",
"value": 9246000,
"unit": "cents",
"taxYear": 2026,
"periodStart": "2026-01-01",
"periodEnd": "2026-12-31",
"confidence": "medium",
"sourceType": "synthetic_tax_document",
"sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
"sourcePath": "syntheticDocument.fields.eligible_real_property_tax_cents"
},
{
"extractedValueId": "xv_batch2_017_eligible_personal_property_tax_cents",
"clientIntakeId": "ci_batch2_017_zingermans_deli_ann_arbor",
"fileId": "taxfile_batch2_017_ann_arbor_property_tax_summary_2026",
"fieldId": "eligible_personal_property_tax_cents",
"fieldDisplayName": "Personal property tax otherwise due",
"value": 875000,
"unit": "cents",
"taxYear": 2026,
"periodStart": "2026-01-01",
"periodEnd": "2026-12-31",
"confidence": "low",
"sourceType": "synthetic_tax_document",
"sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
"sourcePath": "syntheticDocument.fields.eligible_personal_property_tax_cents"
},
{
"extractedValueId": "xv_batch2_017_eligible_local_income_tax_cents",
"clientIntakeId": "ci_batch2_017_zingermans_deli_ann_arbor",
"fileId": "taxfile_batch2_017_mi_business_tax_summary_2026",
"fieldId": "eligible_local_income_tax_cents",
"fieldDisplayName": "Local income tax otherwise due",
"value": 0,
"unit": "cents",
"taxYear": 2026,
"periodStart": "2026-01-01",
"periodEnd": "2026-12-31",
"confidence": "medium",
"sourceType": "synthetic_tax_document",
"sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
"sourcePath": "syntheticDocument.fields.eligible_local_income_tax_cents"
},
{
"extractedValueId": "xv_batch2_017_approved_rerz_designation",
"clientIntakeId": "ci_batch2_017_zingermans_deli_ann_arbor",
"fileId": "taxfile_batch2_017_rerz_absence_attestation_2026",
"fieldId": "approved_rerz_designation",
"fieldDisplayName": "Approved Renewable Energy Renaissance Zone designation present",
"value": false,
"unit": "boolean",
"taxYear": 2026,
"periodStart": "2026-01-01",
"periodEnd": "2026-12-31",
"confidence": "high",
"sourceType": "synthetic_tax_document",
"sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
"sourcePath": "syntheticDocument.fields.approved_rerz_designation"
},
{
"extractedValueId": "xv_batch2_017_qualified_company_operations",
"clientIntakeId": "ci_batch2_017_zingermans_deli_ann_arbor",
"fileId": "taxfile_batch2_017_rerz_absence_attestation_2026",
"fieldId": "qualified_company_operations",
"fieldDisplayName": "Qualified renewable-energy company operations",
"value": false,
"unit": "boolean",
"taxYear": 2026,
"periodStart": "2026-01-01",
"periodEnd": "2026-12-31",
"confidence": "high",
"sourceType": "synthetic_tax_document",
"sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
"sourcePath": "syntheticDocument.fields.qualified_company_operations"
}
],
"taxProfileFacts": [
{
"inputKey": "state_code",
"value": "MI",
"sourceFileId": "taxfile_batch2_017_mi_business_tax_summary_2026",
"sourceStrategy": "synthetic_tax_document",
"uiPlacement": "hidden_derived",
"userOverrideAllowed": false,
"defaultIsSynthetic": true,
"confidenceImpactUntilConfirmed": "low"
},
{
"inputKey": "primary_business_activity",
"value": "deli_cafe_prepared_foods_and_specialty_grocery",
"sourceFileId": "taxfile_batch2_017_mi_business_tax_summary_2026",
"sourceStrategy": "synthetic_tax_document",
"uiPlacement": "organization_profile",
"userOverrideAllowed": true,
"defaultIsSynthetic": true,
"confidenceImpactUntilConfirmed": "medium"
},
{
"inputKey": "approved_rerz_designation",
"value": false,
"sourceFileId": "taxfile_batch2_017_rerz_absence_attestation_2026",
"sourceStrategy": "admin_review",
"uiPlacement": "admin_only",
"userOverrideAllowed": false,
"defaultIsSynthetic": true,
"confidenceImpactUntilConfirmed": "high"
},
{
"inputKey": "qualified_company_operations",
"value": false,
"sourceFileId": "taxfile_batch2_017_rerz_absence_attestation_2026",
"sourceStrategy": "admin_review",
"uiPlacement": "organization_profile",
"userOverrideAllowed": false,
"defaultIsSynthetic": true,
"confidenceImpactUntilConfirmed": "high"
},
{
"inputKey": "company_current_on_state_and_local_taxes",
"value": true,
"sourceFileId": "taxfile_batch2_017_mi_business_tax_summary_2026",
"sourceStrategy": "accountant_review",
"uiPlacement": "tax_profile",
"userOverrideAllowed": true,
"defaultIsSynthetic": true,
"confidenceImpactUntilConfirmed": "high"
},
{
"inputKey": "eligible_state_education_tax_cents",
"value": 1194000,
"sourceFileId": "taxfile_batch2_017_ann_arbor_property_tax_summary_2026",
"sourceStrategy": "assessor_review",
"uiPlacement": "property_tax_profile",
"userOverrideAllowed": true,
"defaultIsSynthetic": true,
"confidenceImpactUntilConfirmed": "high"
},
{
"inputKey": "eligible_real_property_tax_cents",
"value": 9246000,
"sourceFileId": "taxfile_batch2_017_ann_arbor_property_tax_summary_2026",
"sourceStrategy": "assessor_review",
"uiPlacement": "property_tax_profile",
"userOverrideAllowed": true,
"defaultIsSynthetic": true,
"confidenceImpactUntilConfirmed": "high"
},
{
"inputKey": "eligible_personal_property_tax_cents",
"value": 875000,
"sourceFileId": "taxfile_batch2_017_ann_arbor_property_tax_summary_2026",
"sourceStrategy": "assessor_review",
"uiPlacement": "property_tax_profile",
"userOverrideAllowed": true,
"defaultIsSynthetic": true,
"confidenceImpactUntilConfirmed": "high"
},
{
"inputKey": "eligible_local_income_tax_cents",
"value": 0,
"sourceFileId": "taxfile_batch2_017_mi_business_tax_summary_2026",
"sourceStrategy": "accountant_review",
"uiPlacement": "tax_profile",
"userOverrideAllowed": true,
"defaultIsSynthetic": true,
"confidenceImpactUntilConfirmed": "medium"
}
],
"opportunitySpecificTaxInputs": [
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3216",
"inputKey": "approved_rerz_designation",
"value": false,
"sourceFileId": "taxfile_batch2_017_rerz_absence_attestation_2026",
"estimateStatusIfUsed": "suppressed",
"includeInUserFacingTotalBeforeConfirmation": false,
"notes": "Synthetic checklist contains no approved Renewable Energy Renaissance Zone designation. Suppress unless an approval letter, agreement, or certificate is uploaded."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3216",
"inputKey": "qualified_company_operations",
"value": false,
"sourceFileId": "taxfile_batch2_017_rerz_absence_attestation_2026",
"estimateStatusIfUsed": "suppressed",
"includeInUserFacingTotalBeforeConfirmation": false,
"notes": "Synthetic business activity is deli, cafe, prepared foods, and retail specialty grocery, not renewable-energy company operations in an approved zone."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3216",
"inputKey": "company_current_on_state_and_local_taxes",
"value": true,
"sourceFileId": "taxfile_batch2_017_mi_business_tax_summary_2026",
"estimateStatusIfUsed": "needs_accountant_review",
"includeInUserFacingTotalBeforeConfirmation": false,
"notes": "Synthetic return summary says current, but this should be accountant-confirmed before any RERZ calculation."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3216",
"inputKey": "approved_zone_term_years",
"value": null,
"sourceFileId": "taxfile_batch2_017_rerz_absence_attestation_2026",
"estimateStatusIfUsed": "suppressed",
"includeInUserFacingTotalBeforeConfirmation": false,
"notes": "No approved zone term appears in the synthetic document package."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3216",
"inputKey": "program_year",
"value": null,
"sourceFileId": "taxfile_batch2_017_rerz_absence_attestation_2026",
"estimateStatusIfUsed": "suppressed",
"includeInUserFacingTotalBeforeConfirmation": false,
"notes": "Cannot derive program year without an approved zone start date and term."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3216",
"inputKey": "phaseout_multiplier",
"value": null,
"sourceFileId": "taxfile_batch2_017_rerz_absence_attestation_2026",
"estimateStatusIfUsed": "suppressed",
"includeInUserFacingTotalBeforeConfirmation": false,
"notes": "Cannot derive phaseout multiplier without approved zone documents."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3216",
"inputKey": "eligible_state_education_tax_cents",
"value": 1194000,
"sourceFileId": "taxfile_batch2_017_ann_arbor_property_tax_summary_2026",
"estimateStatusIfUsed": "suppressed",
"includeInUserFacingTotalBeforeConfirmation": false,
"notes": "Otherwise-due tax line is present only for review; it is not an eligible abatement amount without approved RERZ designation."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3216",
"inputKey": "eligible_real_property_tax_cents",
"value": 9246000,
"sourceFileId": "taxfile_batch2_017_ann_arbor_property_tax_summary_2026",
"estimateStatusIfUsed": "suppressed",
"includeInUserFacingTotalBeforeConfirmation": false,
"notes": "Property-tax amount is synthetic and should not be used in a user-facing RERZ total unless eligibility is confirmed."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3216",
"inputKey": "eligible_personal_property_tax_cents",
"value": 875000,
"sourceFileId": "taxfile_batch2_017_ann_arbor_property_tax_summary_2026",
"estimateStatusIfUsed": "suppressed",
"includeInUserFacingTotalBeforeConfirmation": false,
"notes": "Personal-property tax line is synthetic and assessor review is required."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3216",
"inputKey": "eligible_local_income_tax_cents",
"value": 0,
"sourceFileId": "taxfile_batch2_017_mi_business_tax_summary_2026",
"estimateStatusIfUsed": "suppressed",
"includeInUserFacingTotalBeforeConfirmation": false,
"notes": "No local income-tax liability is shown in the synthetic Ann Arbor fixture."
}
],
"missingOrReviewInputs": [
"Approved Renewable Energy Renaissance Zone designation, agreement, certificate, or legal description is missing; keep the MI RERZ opportunity suppressed.",
"Assessor or program confirmation that the parcel/facility is inside an approved zone is missing.",
"Accountant confirmation that the company is current on state and local taxes is required if an approved RERZ document is later provided.",
"Actual property tax bill, ESA statement, and eligible/noneligible tax-line breakout require assessor review before any tax-relief estimate."
],
"sourceUrlsChecked": [
"[https://www.zingermansdeli.com/](https://www.zingermansdeli.com/)",
"[https://www.michiganbusiness.org/globalassets/documents/reports/fact-sheets/renewableenergyrenzones.pdf](https://www.michiganbusiness.org/globalassets/documents/reports/fact-sheets/renewableenergyrenzones.pdf)",
"[https://www.michigan.gov/taxes/property/ppt/esa/topics/esa-topic-special-millages-and-renaissance-zones](https://www.michigan.gov/taxes/property/ppt/esa/topics/esa-topic-special-millages-and-renaissance-zones)",
"[https://www.michiganbusiness.org/globalassets/documents/reports/legislative-reports/cy2023-renaissance-zone-annual-report.pdf](https://www.michiganbusiness.org/globalassets/documents/reports/legislative-reports/cy2023-renaissance-zone-annual-report.pdf)"
],
"reasoningNotes": "Michigan geography routes this profile to the RERZ workflow, but the synthetic document package does not include an approved designation and the business activity is not renewable-energy company operations. Otherwise-due property tax values are included as realistic review data only and are suppressed from user-facing totals."
},
{
"sampleUserId": "big-dipper-missoula",
"profileSummary": {
"companyName": "Big Dipper Ice Cream - Missoula",
"siteAddress": "631 S Higgins Avenue, Missoula, MT 59801, USA",
"state": "MT",
"organizationType": "Commercial Business",
"buildingType": "Restaurant / Commercial Kitchen",
"squareFootage": 2000
},
"syntheticTaxFiles": [
{
"fileId": "taxfile_batch2_018_mt_business_tax_summary_2026",
"clientIntakeId": "ci_batch2_018_big_dipper_missoula",
"siteId": "site_batch2_018_missoula_mt",
"originalFilename": "SYNTHETIC_2026_BigDipper_MT_Business_Tax_Return_Summary.pdf",
"taxDocumentType": "business_tax_return_summary",
"taxYear": 2026,
"jurisdiction": "Montana",
"issuingAuthority": "Synthetic Montana business tax return summary",
"syntheticNotice": "Synthetic estimated tax profile for test fixtures; not an actual tax document.",
"processingStatus": "processed",
"uploadedAt": "2026-07-03T00:00:00.000Z",
"processedAt": "2026-07-03T00:00:00.000Z"
},
{
"fileId": "taxfile_batch2_018_lease_cam_tax_reconciliation_2026",
"clientIntakeId": "ci_batch2_018_big_dipper_missoula",
"siteId": "site_batch2_018_missoula_mt",
"originalFilename": "SYNTHETIC_2026_BigDipper_Lease_CAM_Property_Tax_Reconciliation.pdf",
"taxDocumentType": "other",
"taxYear": 2026,
"jurisdiction": "Missoula, MT",
"issuingAuthority": "Synthetic landlord CAM/property-tax reconciliation",
"syntheticNotice": "Synthetic estimated tax profile for test fixtures; not an actual tax document.",
"processingStatus": "processed",
"uploadedAt": "2026-07-03T00:00:00.000Z",
"processedAt": "2026-07-03T00:00:00.000Z"
}
],
"syntheticTaxExtractedValues": [
{
"extractedValueId": "xv_batch2_018_state_code",
"clientIntakeId": "ci_batch2_018_big_dipper_missoula",
"fileId": "taxfile_batch2_018_mt_business_tax_summary_2026",
"fieldId": "state_code",
"fieldDisplayName": "State code",
"value": "MT",
"unit": "text",
"taxYear": 2026,
"periodStart": null,
"periodEnd": null,
"confidence": "high",
"sourceType": "synthetic_tax_document",
"sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
"sourcePath": "syntheticDocument.fields.state_code"
},
{
"extractedValueId": "xv_batch2_018_naics_primary",
"clientIntakeId": "ci_batch2_018_big_dipper_missoula",
"fileId": "taxfile_batch2_018_mt_business_tax_summary_2026",
"fieldId": "naics_primary",
"fieldDisplayName": "Primary NAICS",
"value": "722515",
"unit": "text",
"taxYear": 2026,
"periodStart": "2026-01-01",
"periodEnd": "2026-12-31",
"confidence": "medium",
"sourceType": "synthetic_tax_document",
"sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
"sourcePath": "syntheticDocument.fields.naics_primary"
},
{
"extractedValueId": "xv_batch2_018_annual_gross_receipts_cents",
"clientIntakeId": "ci_batch2_018_big_dipper_missoula",
"fileId": "taxfile_batch2_018_mt_business_tax_summary_2026",
"fieldId": "annual_gross_receipts_cents",
"fieldDisplayName": "Annual gross receipts",
"value": 72000000,
"unit": "cents",
"taxYear": 2026,
"periodStart": "2026-01-01",
"periodEnd": "2026-12-31",
"confidence": "medium",
"sourceType": "synthetic_tax_document",
"sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
"sourcePath": "syntheticDocument.fields.annual_gross_receipts_cents"
},
{
"extractedValueId": "xv_batch2_018_refrigeration_equipment_asset_basis_cents",
"clientIntakeId": "ci_batch2_018_big_dipper_missoula",
"fileId": "taxfile_batch2_018_mt_business_tax_summary_2026",
"fieldId": "refrigeration_equipment_asset_basis_cents",
"fieldDisplayName": "Refrigeration equipment tax basis",
"value": 9600000,
"unit": "cents",
"taxYear": 2026,
"periodStart": "2026-01-01",
"periodEnd": "2026-12-31",
"confidence": "low",
"sourceType": "synthetic_tax_document",
"sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
"sourcePath": "syntheticDocument.fields.refrigeration_equipment_asset_basis_cents"
},
{
"extractedValueId": "xv_batch2_018_leased_square_footage",
"clientIntakeId": "ci_batch2_018_big_dipper_missoula",
"fileId": "taxfile_batch2_018_lease_cam_tax_reconciliation_2026",
"fieldId": "leased_square_footage",
"fieldDisplayName": "Leased square footage",
"value": 2000,
"unit": "square_feet",
"taxYear": 2026,
"periodStart": null,
"periodEnd": null,
"confidence": "medium",
"sourceType": "synthetic_tax_document",
"sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
"sourcePath": "syntheticDocument.fields.leased_square_footage"
},
{
"extractedValueId": "xv_batch2_018_lease_property_tax_cam_pass_through_cents",
"clientIntakeId": "ci_batch2_018_big_dipper_missoula",
"fileId": "taxfile_batch2_018_lease_cam_tax_reconciliation_2026",
"fieldId": "lease_property_tax_cam_pass_through_cents",
"fieldDisplayName": "Lease property tax/CAM pass-through",
"value": 980000,
"unit": "cents",
"taxYear": 2026,
"periodStart": "2026-01-01",
"periodEnd": "2026-12-31",
"confidence": "low",
"sourceType": "synthetic_tax_document",
"sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
"sourcePath": "syntheticDocument.fields.lease_property_tax_cam_pass_through_cents"
},
{
"extractedValueId": "xv_batch2_018_direct_property_tax_bill_to_applicant",
"clientIntakeId": "ci_batch2_018_big_dipper_missoula",
"fileId": "taxfile_batch2_018_lease_cam_tax_reconciliation_2026",
"fieldId": "direct_property_tax_bill_to_applicant",
"fieldDisplayName": "Direct property tax bill to applicant",
"value": false,
"unit": "boolean",
"taxYear": 2026,
"periodStart": null,
"periodEnd": null,
"confidence": "medium",
"sourceType": "synthetic_tax_document",
"sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
"sourcePath": "syntheticDocument.fields.direct_property_tax_bill_to_applicant"
}
],
"taxProfileFacts": [
{
"inputKey": "state_code",
"value": "MT",
"sourceFileId": "taxfile_batch2_018_mt_business_tax_summary_2026",
"sourceStrategy": "synthetic_tax_document",
"uiPlacement": "hidden_derived",
"userOverrideAllowed": false,
"defaultIsSynthetic": true,
"confidenceImpactUntilConfirmed": "low"
},
{
"inputKey": "ownership_status",
"value": "Lease",
"sourceFileId": "taxfile_batch2_018_lease_cam_tax_reconciliation_2026",
"sourceStrategy": "synthetic_tax_document",
"uiPlacement": "organization_profile",
"userOverrideAllowed": true,
"defaultIsSynthetic": true,
"confidenceImpactUntilConfirmed": "low"
},
{
"inputKey": "primary_business_activity",
"value": "retail_ice_cream_food_service_and_frozen_storage",
"sourceFileId": "taxfile_batch2_018_mt_business_tax_summary_2026",
"sourceStrategy": "synthetic_tax_document",
"uiPlacement": "organization_profile",
"userOverrideAllowed": true,
"defaultIsSynthetic": true,
"confidenceImpactUntilConfirmed": "medium"
},
{
"inputKey": "annual_gross_receipts_cents",
"value": 72000000,
"sourceFileId": "taxfile_batch2_018_mt_business_tax_summary_2026",
"sourceStrategy": "accountant_review",
"uiPlacement": "tax_profile",
"userOverrideAllowed": true,
"defaultIsSynthetic": true,
"confidenceImpactUntilConfirmed": "high"
},
{
"inputKey": "lease_property_tax_pass_through_cents",
"value": 980000,
"sourceFileId": "taxfile_batch2_018_lease_cam_tax_reconciliation_2026",
"sourceStrategy": "accountant_review",
"uiPlacement": "property_tax_profile",
"userOverrideAllowed": true,
"defaultIsSynthetic": true,
"confidenceImpactUntilConfirmed": "high"
},
{
"inputKey": "taxpayer_has_direct_property_tax_bill",
"value": false,
"sourceFileId": "taxfile_batch2_018_lease_cam_tax_reconciliation_2026",
"sourceStrategy": "synthetic_tax_document",
"uiPlacement": "property_tax_profile",
"userOverrideAllowed": true,
"defaultIsSynthetic": true,
"confidenceImpactUntilConfirmed": "medium"
}
],
"opportunitySpecificTaxInputs": [],
"missingOrReviewInputs": [
"Accountant should confirm gross receipts and equipment basis before tax-sensitive recommendation ranking.",
"Landlord confirmation is required before using lease pass-through values as property-tax evidence."
],
"sourceUrlsChecked": [
"[https://www.bigdippericecream.com/](https://www.bigdippericecream.com/)"
],
"reasoningNotes": "Synthetic small-business refrigeration fixture. Montana is not part of the current WA, RI, or MI tax-target package."
},
{
"sampleUserId": "burlington-beer-company",
"profileSummary": {
"companyName": "Burlington Beer Company",
"siteAddress": "180 Flynn Avenue, Burlington, VT 05401, USA",
"state": "VT",
"organizationType": "Commercial Business",
"buildingType": "Industrial / Manufacturing",
"squareFootage": 15000
},
"syntheticTaxFiles": [
{
"fileId": "taxfile_batch2_019_vt_business_tax_summary_2026",
"clientIntakeId": "ci_batch2_019_burlington_beer_company",
"siteId": "site_batch2_019_burlington_vt",
"originalFilename": "SYNTHETIC_2026_BurlingtonBeer_VT_Business_Tax_Return_Summary.pdf",
"taxDocumentType": "business_tax_return_summary",
"taxYear": 2026,
"jurisdiction": "Vermont",
"issuingAuthority": "Synthetic Vermont business tax return summary",
"syntheticNotice": "Synthetic estimated tax profile for test fixtures; not an actual tax document.",
"processingStatus": "processed",
"uploadedAt": "2026-07-03T00:00:00.000Z",
"processedAt": "2026-07-03T00:00:00.000Z"
},
{
"fileId": "taxfile_batch2_019_sales_use_and_meals_tax_workpaper_2026",
"clientIntakeId": "ci_batch2_019_burlington_beer_company",
"siteId": "site_batch2_019_burlington_vt",
"originalFilename": "SYNTHETIC_2026_BurlingtonBeer_Sales_Use_Meals_Tax_Workpaper.pdf",
"taxDocumentType": "sales_use_tax_workpaper",
"taxYear": 2026,
"jurisdiction": "Vermont",
"issuingAuthority": "Synthetic sales/use and meals-tax workpaper",
"syntheticNotice": "Synthetic estimated tax profile for test fixtures; not an actual tax document.",
"processingStatus": "processed",
"uploadedAt": "2026-07-03T00:00:00.000Z",
"processedAt": "2026-07-03T00:00:00.000Z"
},
{
"fileId": "taxfile_batch2_019_lease_cam_tax_reconciliation_2026",
"clientIntakeId": "ci_batch2_019_burlington_beer_company",
"siteId": "site_batch2_019_burlington_vt",
"originalFilename": "SYNTHETIC_2026_BurlingtonBeer_Lease_CAM_Property_Tax_Reconciliation.pdf",
"taxDocumentType": "other",
"taxYear": 2026,
"jurisdiction": "Burlington, VT",
"issuingAuthority": "Synthetic landlord CAM/property-tax reconciliation",
"syntheticNotice": "Synthetic estimated tax profile for test fixtures; not an actual tax document.",
"processingStatus": "processed",
"uploadedAt": "2026-07-03T00:00:00.000Z",
"processedAt": "2026-07-03T00:00:00.000Z"
}
],
"syntheticTaxExtractedValues": [
{
"extractedValueId": "xv_batch2_019_state_code",
"clientIntakeId": "ci_batch2_019_burlington_beer_company",
"fileId": "taxfile_batch2_019_vt_business_tax_summary_2026",
"fieldId": "state_code",
"fieldDisplayName": "State code",
"value": "VT",
"unit": "text",
"taxYear": 2026,
"periodStart": null,
"periodEnd": null,
"confidence": "high",
"sourceType": "synthetic_tax_document",
"sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
"sourcePath": "syntheticDocument.fields.state_code"
},
{
"extractedValueId": "xv_batch2_019_naics_primary",
"clientIntakeId": "ci_batch2_019_burlington_beer_company",
"fileId": "taxfile_batch2_019_vt_business_tax_summary_2026",
"fieldId": "naics_primary",
"fieldDisplayName": "Primary NAICS",
"value": "312120",
"unit": "text",
"taxYear": 2026,
"periodStart": "2026-01-01",
"periodEnd": "2026-12-31",
"confidence": "medium",
"sourceType": "synthetic_tax_document",
"sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
"sourcePath": "syntheticDocument.fields.naics_primary"
},
{
"extractedValueId": "xv_batch2_019_annual_gross_receipts_cents",
"clientIntakeId": "ci_batch2_019_burlington_beer_company",
"fileId": "taxfile_batch2_019_vt_business_tax_summary_2026",
"fieldId": "annual_gross_receipts_cents",
"fieldDisplayName": "Annual gross receipts",
"value": 560000000,
"unit": "cents",
"taxYear": 2026,
"periodStart": "2026-01-01",
"periodEnd": "2026-12-31",
"confidence": "medium",
"sourceType": "synthetic_tax_document",
"sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
"sourcePath": "syntheticDocument.fields.annual_gross_receipts_cents"
},
{
"extractedValueId": "xv_batch2_019_manufacturing_and_taproom_sales_split",
"clientIntakeId": "ci_batch2_019_burlington_beer_company",
"fileId": "taxfile_batch2_019_sales_use_and_meals_tax_workpaper_2026",
"fieldId": "manufacturing_and_taproom_sales_split",
"fieldDisplayName": "Manufacturing and taproom sales split",
"value": "Beer production, taproom restaurant sales, and taxable retail sales are tracked separately in the synthetic workpaper.",
"unit": "text",
"taxYear": 2026,
"periodStart": "2026-01-01",
"periodEnd": "2026-12-31",
"confidence": "medium",
"sourceType": "synthetic_tax_document",
"sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
"sourcePath": "syntheticDocument.fields.manufacturing_and_taproom_sales_split"
},
{
"extractedValueId": "xv_batch2_019_process_equipment_asset_basis_cents",
"clientIntakeId": "ci_batch2_019_burlington_beer_company",
"fileId": "taxfile_batch2_019_sales_use_and_meals_tax_workpaper_2026",
"fieldId": "process_equipment_asset_basis_cents",
"fieldDisplayName": "Process equipment tax basis",
"value": 118000000,
"unit": "cents",
"taxYear": 2026,
"periodStart": "2026-01-01",
"periodEnd": "2026-12-31",
"confidence": "low",
"sourceType": "synthetic_tax_document",
"sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
"sourcePath": "syntheticDocument.fields.process_equipment_asset_basis_cents"
},
{
"extractedValueId": "xv_batch2_019_leased_square_footage",
"clientIntakeId": "ci_batch2_019_burlington_beer_company",
"fileId": "taxfile_batch2_019_lease_cam_tax_reconciliation_2026",
"fieldId": "leased_square_footage",
"fieldDisplayName": "Leased square footage",
"value": 15000,
"unit": "square_feet",
"taxYear": 2026,
"periodStart": null,
"periodEnd": null,
"confidence": "medium",
"sourceType": "synthetic_tax_document",
"sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
"sourcePath": "syntheticDocument.fields.leased_square_footage"
},
{
"extractedValueId": "xv_batch2_019_lease_property_tax_cam_pass_through_cents",
"clientIntakeId": "ci_batch2_019_burlington_beer_company",
"fileId": "taxfile_batch2_019_lease_cam_tax_reconciliation_2026",
"fieldId": "lease_property_tax_cam_pass_through_cents",
"fieldDisplayName": "Lease property tax/CAM pass-through",
"value": 6200000,
"unit": "cents",
"taxYear": 2026,
"periodStart": "2026-01-01",
"periodEnd": "2026-12-31",
"confidence": "low",
"sourceType": "synthetic_tax_document",
"sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
"sourcePath": "syntheticDocument.fields.lease_property_tax_cam_pass_through_cents"
},
{
"extractedValueId": "xv_batch2_019_direct_property_tax_bill_to_applicant",
"clientIntakeId": "ci_batch2_019_burlington_beer_company",
"fileId": "taxfile_batch2_019_lease_cam_tax_reconciliation_2026",
"fieldId": "direct_property_tax_bill_to_applicant",
"fieldDisplayName": "Direct property tax bill to applicant",
"value": false,
"unit": "boolean",
"taxYear": 2026,
"periodStart": null,
"periodEnd": null,
"confidence": "medium",
"sourceType": "synthetic_tax_document",
"sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
"sourcePath": "syntheticDocument.fields.direct_property_tax_bill_to_applicant"
}
],
"taxProfileFacts": [
{
"inputKey": "state_code",
"value": "VT",
"sourceFileId": "taxfile_batch2_019_vt_business_tax_summary_2026",
"sourceStrategy": "synthetic_tax_document",
"uiPlacement": "hidden_derived",
"userOverrideAllowed": false,
"defaultIsSynthetic": true,
"confidenceImpactUntilConfirmed": "low"
},
{
"inputKey": "ownership_status",
"value": "Lease",
"sourceFileId": "taxfile_batch2_019_lease_cam_tax_reconciliation_2026",
"sourceStrategy": "synthetic_tax_document",
"uiPlacement": "organization_profile",
"userOverrideAllowed": true,
"defaultIsSynthetic": true,
"confidenceImpactUntilConfirmed": "low"
},
{
"inputKey": "primary_business_activity",
"value": "brewery_taproom_restaurant_cold_storage_and_barrel_aging",
"sourceFileId": "taxfile_batch2_019_vt_business_tax_summary_2026",
"sourceStrategy": "synthetic_tax_document",
"uiPlacement": "organization_profile",
"userOverrideAllowed": true,
"defaultIsSynthetic": true,
"confidenceImpactUntilConfirmed": "medium"
},
{
"inputKey": "annual_gross_receipts_cents",
"value": 560000000,
"sourceFileId": "taxfile_batch2_019_vt_business_tax_summary_2026",
"sourceStrategy": "accountant_review",
"uiPlacement": "tax_profile",
"userOverrideAllowed": true,
"defaultIsSynthetic": true,
"confidenceImpactUntilConfirmed": "high"
},
{
"inputKey": "process_equipment_asset_basis_cents",
"value": 118000000,
"sourceFileId": "taxfile_batch2_019_sales_use_and_meals_tax_workpaper_2026",
"sourceStrategy": "accountant_review",
"uiPlacement": "tax_profile",
"userOverrideAllowed": true,
"defaultIsSynthetic": true,
"confidenceImpactUntilConfirmed": "high"
},
{
"inputKey": "lease_property_tax_pass_through_cents",
"value": 6200000,
"sourceFileId": "taxfile_batch2_019_lease_cam_tax_reconciliation_2026",
"sourceStrategy": "accountant_review",
"uiPlacement": "property_tax_profile",
"userOverrideAllowed": true,
"defaultIsSynthetic": true,
"confidenceImpactUntilConfirmed": "high"
}
],
"opportunitySpecificTaxInputs": [],
"missingOrReviewInputs": [
"Accountant should review the sales/use/meals-tax workpaper before using manufacturing versus restaurant sales allocations.",
"Landlord consent and property-tax bill are required before treating leased process-space tax pass-throughs as owner-level tax evidence."
],
"sourceUrlsChecked": [
"[https://www.burlingtonbeercompany.com/](https://www.burlingtonbeercompany.com/)"
],
"reasoningNotes": "Synthetic brewery/manufacturing fixture. Vermont is outside the current batch tax geographies; tax values are included to support later non-batch tax modules and review workflows."
},
{
"sampleUserId": "bluebird-cafe-nashville",
"profileSummary": {
"companyName": "The Bluebird Cafe",
"siteAddress": "4104 Hillsboro Pike, Nashville, TN 37215, USA",
"state": "TN",
"organizationType": "Commercial Business",
"buildingType": "Restaurant / Commercial Kitchen",
"squareFootage": 2500
},
"syntheticTaxFiles": [
{
"fileId": "taxfile_batch2_020_tn_business_tax_summary_2026",
"clientIntakeId": "ci_batch2_020_bluebird_cafe_nashville",
"siteId": "site_batch2_020_nashville_tn",
"originalFilename": "SYNTHETIC_2026_BluebirdCafe_TN_Business_Tax_Return_Summary.pdf",
"taxDocumentType": "business_tax_return_summary",
"taxYear": 2026,
"jurisdiction": "Tennessee",
"issuingAuthority": "Synthetic Tennessee business tax return summary",
"syntheticNotice": "Synthetic estimated tax profile for test fixtures; not an actual tax document.",
"processingStatus": "processed",
"uploadedAt": "2026-07-03T00:00:00.000Z",
"processedAt": "2026-07-03T00:00:00.000Z"
},
{
"fileId": "taxfile_batch2_020_lease_cam_tax_reconciliation_2026",
"clientIntakeId": "ci_batch2_020_bluebird_cafe_nashville",
"siteId": "site_batch2_020_nashville_tn",
"originalFilename": "SYNTHETIC_2026_BluebirdCafe_Lease_CAM_Property_Tax_Reconciliation.pdf",
"taxDocumentType": "other",
"taxYear": 2026,
"jurisdiction": "Nashville-Davidson County, TN",
"issuingAuthority": "Synthetic landlord CAM/property-tax reconciliation",
"syntheticNotice": "Synthetic estimated tax profile for test fixtures; not an actual tax document.",
"processingStatus": "processed",
"uploadedAt": "2026-07-03T00:00:00.000Z",
"processedAt": "2026-07-03T00:00:00.000Z"
}
],
"syntheticTaxExtractedValues": [
{
"extractedValueId": "xv_batch2_020_state_code",
"clientIntakeId": "ci_batch2_020_bluebird_cafe_nashville",
"fileId": "taxfile_batch2_020_tn_business_tax_summary_2026",
"fieldId": "state_code",
"fieldDisplayName": "State code",
"value": "TN",
"unit": "text",
"taxYear": 2026,
"periodStart": null,
"periodEnd": null,
"confidence": "high",
"sourceType": "synthetic_tax_document",
"sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
"sourcePath": "syntheticDocument.fields.state_code"
},
{
"extractedValueId": "xv_batch2_020_naics_primary",
"clientIntakeId": "ci_batch2_020_bluebird_cafe_nashville",
"fileId": "taxfile_batch2_020_tn_business_tax_summary_2026",
"fieldId": "naics_primary",
"fieldDisplayName": "Primary NAICS",
"value": "722511",
"unit": "text",
"taxYear": 2026,
"periodStart": "2026-01-01",
"periodEnd": "2026-12-31",
"confidence": "medium",
"sourceType": "synthetic_tax_document",
"sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
"sourcePath": "syntheticDocument.fields.naics_primary"
},
{
"extractedValueId": "xv_batch2_020_annual_gross_receipts_cents",
"clientIntakeId": "ci_batch2_020_bluebird_cafe_nashville",
"fileId": "taxfile_batch2_020_tn_business_tax_summary_2026",
"fieldId": "annual_gross_receipts_cents",
"fieldDisplayName": "Annual gross receipts",
"value": 205000000,
"unit": "cents",
"taxYear": 2026,
"periodStart": "2026-01-01",
"periodEnd": "2026-12-31",
"confidence": "medium",
"sourceType": "synthetic_tax_document",
"sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
"sourcePath": "syntheticDocument.fields.annual_gross_receipts_cents"
},
{
"extractedValueId": "xv_batch2_020_local_business_tax_cents",
"clientIntakeId": "ci_batch2_020_bluebird_cafe_nashville",
"fileId": "taxfile_batch2_020_tn_business_tax_summary_2026",
"fieldId": "local_business_tax_cents",
"fieldDisplayName": "Local business tax",
"value": 480000,
"unit": "cents",
"taxYear": 2026,
"periodStart": "2026-01-01",
"periodEnd": "2026-12-31",
"confidence": "low",
"sourceType": "synthetic_tax_document",
"sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
"sourcePath": "syntheticDocument.fields.local_business_tax_cents"
},
{
"extractedValueId": "xv_batch2_020_leased_square_footage",
"clientIntakeId": "ci_batch2_020_bluebird_cafe_nashville",
"fileId": "taxfile_batch2_020_lease_cam_tax_reconciliation_2026",
"fieldId": "leased_square_footage",
"fieldDisplayName": "Leased square footage",
"value": 2500,
"unit": "square_feet",
"taxYear": 2026,
"periodStart": null,
"periodEnd": null,
"confidence": "medium",
"sourceType": "synthetic_tax_document",
"sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
"sourcePath": "syntheticDocument.fields.leased_square_footage"
},
{
"extractedValueId": "xv_batch2_020_lease_property_tax_cam_pass_through_cents",
"clientIntakeId": "ci_batch2_020_bluebird_cafe_nashville",
"fileId": "taxfile_batch2_020_lease_cam_tax_reconciliation_2026",
"fieldId": "lease_property_tax_cam_pass_through_cents",
"fieldDisplayName": "Lease property tax/CAM pass-through",
"value": 1720000,
"unit": "cents",
"taxYear": 2026,
"periodStart": "2026-01-01",
"periodEnd": "2026-12-31",
"confidence": "low",
"sourceType": "synthetic_tax_document",
"sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
"sourcePath": "syntheticDocument.fields.lease_property_tax_cam_pass_through_cents"
},
{
"extractedValueId": "xv_batch2_020_direct_property_tax_bill_to_applicant",
"clientIntakeId": "ci_batch2_020_bluebird_cafe_nashville",
"fileId": "taxfile_batch2_020_lease_cam_tax_reconciliation_2026",
"fieldId": "direct_property_tax_bill_to_applicant",
"fieldDisplayName": "Direct property tax bill to applicant",
"value": false,
"unit": "boolean",
"taxYear": 2026,
"periodStart": null,
"periodEnd": null,
"confidence": "medium",
"sourceType": "synthetic_tax_document",
"sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
"sourcePath": "syntheticDocument.fields.direct_property_tax_bill_to_applicant"
}
],
"taxProfileFacts": [
{
"inputKey": "state_code",
"value": "TN",
"sourceFileId": "taxfile_batch2_020_tn_business_tax_summary_2026",
"sourceStrategy": "synthetic_tax_document",
"uiPlacement": "hidden_derived",
"userOverrideAllowed": false,
"defaultIsSynthetic": true,
"confidenceImpactUntilConfirmed": "low"
},
{
"inputKey": "ownership_status",
"value": "Lease",
"sourceFileId": "taxfile_batch2_020_lease_cam_tax_reconciliation_2026",
"sourceStrategy": "synthetic_tax_document",
"uiPlacement": "organization_profile",
"userOverrideAllowed": true,
"defaultIsSynthetic": true,
"confidenceImpactUntilConfirmed": "low"
},
{
"inputKey": "primary_business_activity",
"value": "restaurant_live_music_venue_and_small_commercial_kitchen",
"sourceFileId": "taxfile_batch2_020_tn_business_tax_summary_2026",
"sourceStrategy": "synthetic_tax_document",
"uiPlacement": "organization_profile",
"userOverrideAllowed": true,
"defaultIsSynthetic": true,
"confidenceImpactUntilConfirmed": "medium"
},
{
"inputKey": "annual_gross_receipts_cents",
"value": 205000000,
"sourceFileId": "taxfile_batch2_020_tn_business_tax_summary_2026",
"sourceStrategy": "accountant_review",
"uiPlacement": "tax_profile",
"userOverrideAllowed": true,
"defaultIsSynthetic": true,
"confidenceImpactUntilConfirmed": "high"
},
{
"inputKey": "local_business_tax_cents",
"value": 480000,
"sourceFileId": "taxfile_batch2_020_tn_business_tax_summary_2026",
"sourceStrategy": "accountant_review",
"uiPlacement": "tax_profile",
"userOverrideAllowed": true,
"defaultIsSynthetic": true,
"confidenceImpactUntilConfirmed": "high"
},
{
"inputKey": "lease_property_tax_pass_through_cents",
"value": 1720000,
"sourceFileId": "taxfile_batch2_020_lease_cam_tax_reconciliation_2026",
"sourceStrategy": "accountant_review",
"uiPlacement": "property_tax_profile",
"userOverrideAllowed": true,
"defaultIsSynthetic": true,
"confidenceImpactUntilConfirmed": "high"
}
],
"opportunitySpecificTaxInputs": [],
"missingOrReviewInputs": [
"Accountant should verify Tennessee business-tax classification and local business-tax amount before any tax calculation.",
"Landlord confirmation is required before using CAM property-tax pass-throughs for property-level tax workflows."
],
"sourceUrlsChecked": [
"[https://bluebirdcafe.com/](https://bluebirdcafe.com/)"
],
"reasoningNotes": "Synthetic event-driven restaurant fixture. Tennessee is not part of the current WA, RI, or MI target tax geography package."
}
],
"globalWarnings": [
"All tax files, extracted values, and tax-profile facts in this fixture are synthetic and must not be treated as real confidential tax documents.",
"Values are marked synthetic and should remain excluded from user-facing confirmed totals until the specified accountant, assessor, admin, landlord, or program-document review is completed.",
"Generated from the uploaded prompt and embedded rule package: "
]
}
