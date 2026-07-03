{
"schemaVersion": "retrofi_tax_dataset_import_validation_refresh_plan.v1",
"researchedAt": "2026-07-03",
"source": "gpt_pro",
"recommendedDatabaseTables": [
{
"tableName": "source_catalog",
"purpose": "Registry of source families, source owners, source URLs, machine-readable endpoints, refresh cadence, official status, and precedence tier.",
"requiredFields": [
"sourceId",
"sourceOwner",
"sourceFamily",
"jurisdictionScope",
"url",
"officialStatus",
"machineReadable",
"accessMethod",
"precedenceTier",
"refreshCadence",
"lastCheckedAt",
"sourceConfidence"
],
"hardValidation": [
"officialStatus must distinguish official_statute, official_regulation, official_tax_agency, official_assessor, official_treasurer, official_utility_commission, filed_tariff, official_boundary, official_form_or_instruction, official_notice, and non_authoritative_discovery_only.",
"non_authoritative_discovery_only sources may seed research but may not back imported rates, formulas, jurisdictions, effective dates, or eligibility determinations."
],
"sourceEvidence": [
{
"sourceUrl": "[https://www.irs.gov/privacy-disclosure/tax-code-regulations-and-official-guidance](https://www.irs.gov/privacy-disclosure/tax-code-regulations-and-official-guidance)",
"evidenceText": "IRS identifies tax authority families including the Internal Revenue Code, Treasury regulations, and IRS official guidance.",
"citation": "([IRS][1])"
},
{
"sourceUrl": "[https://www.ecfr.gov/current/title-26](https://www.ecfr.gov/current/title-26)",
"evidenceText": "eCFR is continuously updated but is not the official legal edition, so source precedence must distinguish current access from final legal authority.",
"citation": "([eCFR][2])"
}
]
},
{
"tableName": "source_documents",
"purpose": "Immutable capture of every source artifact used for a material claim, including HTML, PDF, CSV, API payloads, official lookup results, screenshots where allowed, parser version, checksum, retrieval timestamp, and extracted evidence text.",
"requiredFields": [
"sourceDocumentId",
"sourceId",
"sourceUrl",
"retrievedAt",
"publishedAt",
"effectiveDateText",
"contentHash",
"mimeType",
"rawStorageUri",
"parserVersion",
"extractedEvidenceText"
],
"hardValidation": [
"Every imported rule, rate, formula, jurisdiction, boundary, tariff, exemption, filing artifact, or effective date must link to at least one source_documents row.",
"Mutable URLs are insufficient without archived payload hash and retrieval timestamp."
],
"sourceEvidence": [
{
"sourceUrl": "[https://www.ferc.gov/ferc-online/etariff](https://www.ferc.gov/ferc-online/etariff)",
"evidenceText": "FERC requires tariffs, revisions, and rate-change applications to be filed electronically in eTariff.",
"citation": "([Federal Energy Regulatory Commission][3])"
}
]
},
{
"tableName": "jurisdictions",
"purpose": "Canonical government, taxing, utility, and tribal authority entities with source-backed names, identifiers, parent/child relationships, and validity periods.",
"requiredFields": [
"jurisdictionId",
"name",
"jurisdictionType",
"state",
"countyFips",
"placeFips",
"parentJurisdictionId",
"sourceDocumentId",
"validFrom",
"validTo"
],
"hardValidation": [
"jurisdictionType must distinguish federal, state, county, municipality, special_district, school_district, tribal_government, utility_commission, and utility_service_provider.",
"Do not infer tax authority from postal city or ZIP alone."
],
"sourceEvidence": [
{
"sourceUrl": "[https://www.census.gov/data/developers/guidance/api-user-guide.html](https://www.census.gov/data/developers/guidance/api-user-guide.html)",
"evidenceText": "Census TIGERweb can return boundaries using hierarchical FIPS codes or latitude/longitude.",
"citation": "([Census.gov][4])"
},
{
"sourceUrl": "[https://www.federalregister.gov/documents/2026/01/30/2026-01899/indian-entities-recognized-by-and-eligible-to-receive-services-from-the-united-states-bureau-of](https://www.federalregister.gov/documents/2026/01/30/2026-01899/indian-entities-recognized-by-and-eligible-to-receive-services-from-the-united-states-bureau-of)",
"evidenceText": "The Federal Register notice publishes the current official list of federally recognized tribal entities.",
"citation": "([Federal Register][5])"
}
]
},
{
"tableName": "jurisdiction_boundaries",
"purpose": "Versioned geometries used for point-in-polygon joins and tax-area determinations.",
"requiredFields": [
"boundaryId",
"jurisdictionId",
"geometryUri",
"geometryHash",
"boundaryVintage",
"sourceDocumentId",
"crs",
"validFrom",
"validTo",
"boundaryConfidence"
],
"hardValidation": [
"boundaryVintage, CRS, geometryHash, and sourceDocumentId are required.",
"Do not mix boundary vintages in one estimate unless each joined fact stores its own vintage."
],
"sourceEvidence": [
{
"sourceUrl": "[https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.html](https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.html)",
"evidenceText": "Census TIGER/Line files state legal-boundary names as of a specific vintage and release date.",
"citation": "([Census.gov][6])"
},
{
"sourceUrl": "[https://catalog.data.gov/dataset/tiger-line-shapefile-current-nation-u-s-american-indian-alaska-native-native-hawaiian-area](https://catalog.data.gov/dataset/tiger-line-shapefile-current-nation-u-s-american-indian-alaska-native-native-hawaiian-area)",
"evidenceText": "The AIANNH shapefile includes federally recognized reservations, off-reservation trust lands, state-recognized reservations, and Hawaiian home lands.",
"citation": "([Data.gov][7])"
}
]
},
{
"tableName": "addresses",
"purpose": "Raw and standardized addresses, geocoder results, and match metadata. This table must not contain tax eligibility conclusions.",
"requiredFields": [
"addressId",
"rawAddress",
"standardizedAddress",
"standardizationSource",
"lat",
"lon",
"geocoder",
"geocoderBenchmark",
"geocoderVintage",
"matchType",
"matchScore",
"createdAt"
],
"hardValidation": [
"rawAddress is immutable.",
"Every geocoded result must store benchmark/vintage and match evidence.",
"Lat/lon alone cannot prove parcel, APN, tax-rate area, service class, or taxpayer eligibility."
],
"sourceEvidence": [
{
"sourceUrl": "[https://geocoding.geo.census.gov/geocoder/Geocoding_Services_API.html](https://geocoding.geo.census.gov/geocoder/Geocoding_Services_API.html)",
"evidenceText": "The Census Geocoding Services API codes addresses to coordinates using data loaded from a MAF/TIGER benchmark database.",
"citation": "([Census Geocoder][8])"
},
{
"sourceUrl": "[https://www.census.gov/programs-surveys/geography/technical-documentation/complete-technical-documentation/census-geocoder.html](https://www.census.gov/programs-surveys/geography/technical-documentation/complete-technical-documentation/census-geocoder.html)",
"evidenceText": "Census geocoder results derive from address ranges, and ranges can include possible structure numbers even when actual structures may not exist.",
"citation": "([Census.gov][9])"
}
]
},
{
"tableName": "address_geography_facts",
"purpose": "Geography-derived facts from address, coordinate, parcel, boundary, tax locator, and utility territory joins.",
"requiredFields": [
"addressGeographyFactId",
"addressId",
"factType",
"factValue",
"jurisdictionId",
"sourceDocumentId",
"derivationMethod",
"confidence",
"validFrom",
"validTo"
],
"hardValidation": [
"Allowed factType values include state, county, municipality, special_district, school_district, tax_area_code, parcel_apn, tribal_area, utility_territory, and rate_locator_code.",
"Taxpayer identity, nonprofit status, government status, ownership, placed-in-service date, project cost, prevailing-wage compliance, and elective-pay eligibility are forbidden in this table."
],
"sourceEvidence": [
{
"sourceUrl": "[https://dor.wa.gov/taxes-rates/gis-data-downloads](https://dor.wa.gov/taxes-rates/gis-data-downloads)",
"evidenceText": "Washington DOR provides GIS downloads for address/sales-tax-rate data, sales-tax jurisdiction boundaries, and property-tax district boundaries.",
"citation": "([Washington Department of Revenue][10])"
}
]
},
{
"tableName": "taxpayer_project_facts",
"purpose": "Taxpayer- and project-specific facts supplied by user attestation, documents, utility bills, tax forms, contracts, certifications, or workflow questionnaires.",
"requiredFields": [
"factId",
"sampleUserId",
"factType",
"factValue",
"sourceType",
"sourceDocumentId",
"attestationRequired",
"confidence",
"createdAt"
],
"hardValidation": [
"Organization type and building type from sample profiles may seed questionnaires but may not become eligibility facts without confirmation.",
"Facts such as owner/tenant, tax-exempt entity, applicable entity, residential renter, project cost, cost basis, placed-in-service date, utility tariff class, prevailing wage, apprenticeship, domestic content, registration number, and certification must be validated separately."
],
"sourceEvidence": [
{
"sourceUrl": "[https://www.irs.gov/credits-deductions/elective-pay-and-transferability](https://www.irs.gov/credits-deductions/elective-pay-and-transferability)",
"evidenceText": "IRS explains that elective pay treats certain clean-energy credit amounts as tax payments and refunds overpayments, which depends on credit and entity facts rather than geography alone.",
"citation": "([IRS][11])"
}
]
},
{
"tableName": "tax_programs",
"purpose": "Program-level records for credits, deductions, exemptions, sales/use tax regimes, property tax regimes, local taxes, and utility tariff charge families.",
"requiredFields": [
"programId",
"programName",
"taxType",
"administeringAuthorityId",
"legalAuthoritySourceDocumentId",
"programStatus",
"validFrom",
"validTo"
],
"hardValidation": [
"programStatus must distinguish active, scheduled, expired, repealed, superseded, suspended, unknown, and pending.",
"A program cannot be active without source-backed legal authority or official agency authority."
],
"sourceEvidence": [
{
"sourceUrl": "[https://www.irs.gov/credits-and-deductions-under-the-inflation-reduction-act-of-2022](https://www.irs.gov/credits-and-deductions-under-the-inflation-reduction-act-of-2022)",
"evidenceText": "IRS maintains official information for federal credits and deductions affected by the Inflation Reduction Act.",
"citation": "([IRS][12])"
}
]
},
{
"tableName": "tax_rule_versions",
"purpose": "Append-only normalized rule versions with bitemporal validity, source lineage, calculation metadata, confidence, and promotion state.",
"requiredFields": [
"ruleVersionId",
"programId",
"ruleNaturalKey",
"versionHash",
"importBatchId",
"transactionValidFrom",
"transactionValidTo",
"effectiveStart",
"effectiveEnd",
"ruleStatus",
"sourceConfidence",
"estimateApplicabilityNotes"
],
"hardValidation": [
"Never update imported legal content in place; create a superseding version.",
"versionHash must include normalized conditions, rates/formulas, effective dates, jurisdiction IDs, source hashes, and parser version."
],
"sourceEvidence": [
{
"sourceUrl": "[https://www.irs.gov/instructions/i3468](https://www.irs.gov/instructions/i3468)",
"evidenceText": "IRS Form 3468 instructions require separate facility/property information and computation for investment credit claims, supporting property-level rule keys.",
"citation": "([IRS][13])"
}
]
},
{
"tableName": "rule_conditions",
"purpose": "Structured eligibility, taxability, exemption, cap, phaseout, election, filing, and documentation predicates.",
"requiredFields": [
"conditionId",
"ruleVersionId",
"conditionType",
"fieldPath",
"operator",
"value",
"requiresUserFact",
"sourceDocumentId",
"evidenceText"
],
"hardValidation": [
"Any condition depending on taxpayer/project data must set requiresUserFact=true.",
"A condition that affects calculation or eligibility cannot live only in prose."
],
"sourceEvidence": [
{
"sourceUrl": "[https://www.irs.gov/instructions/i7205](https://www.irs.gov/instructions/i7205)",
"evidenceText": "IRS Form 7205 instructions require identifying building owner or designer, certification person, and allocation information for section 179D.",
"citation": "([IRS][14])"
}
]
},
{
"tableName": "rate_components",
"purpose": "Atomic rates, charges, caps, multipliers, thresholds, credits, deductions, surcharges, and formula terms tied to source-backed effective periods.",
"requiredFields": [
"rateComponentId",
"ruleVersionId",
"componentType",
"numericValue",
"unit",
"basis",
"minValue",
"maxValue",
"roundingRule",
"effectiveStart",
"effectiveEnd",
"sourceDocumentId"
],
"hardValidation": [
"unit must be explicit, such as percent, mills, dollars_per_100_assessed_value, dollars_per_kWh, dollars_per_kW, dollars_per_therm, fixed_dollars, or boolean.",
"Reject a rate if unit, taxable basis, formula basis, or effective period is missing."
],
"sourceEvidence": [
{
"sourceUrl": "[https://comptroller.texas.gov/taxes/sales/](https://comptroller.texas.gov/taxes/sales/)",
"evidenceText": "Texas Comptroller publishes city, county, transit, special-purpose district, combined-area rates, local codes, and effective-date resources.",
"citation": "([Texas Comptroller][15])"
}
]
},
{
"tableName": "filing_artifacts",
"purpose": "Forms, instructions, registration steps, certification forms, assessor notices, treasurer documents, tariff sheets, advice letters, and user-action artifacts.",
"requiredFields": [
"artifactId",
"programId",
"artifactType",
"artifactName",
"sourceUrl",
"sourceDocumentId",
"taxYear",
"validFrom",
"validTo",
"requiresUserAction"
],
"hardValidation": [
"Draft forms or proposed guidance must be marked draft and excluded from final calculations.",
"Tax year must match the estimate year when the artifact affects eligibility, filing, or computation."
],
"sourceEvidence": [
{
"sourceUrl": "[https://www.irs.gov/forms-pubs/about-form-5695](https://www.irs.gov/forms-pubs/about-form-5695)",
"evidenceText": "IRS Form 5695 is used to figure residential energy credits.",
"citation": "([IRS][16])"
},
{
"sourceUrl": "[https://www.irs.gov/forms-pubs/about-form-3468](https://www.irs.gov/forms-pubs/about-form-3468)",
"evidenceText": "IRS Form 3468 is used to claim the investment credit.",
"citation": "([IRS][17])"
},
{
"sourceUrl": "[https://www.irs.gov/forms-pubs/about-form-7205](https://www.irs.gov/forms-pubs/about-form-7205)",
"evidenceText": "IRS Form 7205 is used to calculate and claim the section 179D deduction.",
"citation": "([IRS][18])"
}
]
},
{
"tableName": "validation_events",
"purpose": "Audit trail for machine and human validation of every source, rule, rate, formula, geography join, import batch, and estimate run.",
"requiredFields": [
"validationEventId",
"importBatchId",
"targetTable",
"targetId",
"validationRuleId",
"severity",
"result",
"message",
"evidence",
"createdAt"
],
"hardValidation": [
"Any blocker prevents promotion.",
"Any reviewer override must include reviewer identity, scope, reason, evidence, and expiration."
],
"sourceEvidence": []
},
{
"tableName": "refresh_jobs",
"purpose": "Scheduled and event-triggered refresh state for source polling, diff detection, staleness, failed checks, and impacted rule versions.",
"requiredFields": [
"refreshJobId",
"sourceId",
"datasetFamily",
"scheduledFor",
"startedAt",
"completedAt",
"status",
"sourceHashBefore",
"sourceHashAfter",
"affectedRuleVersionIds",
"nextRefreshAt"
],
"hardValidation": [
"A changed source hash must create a diff event.",
"Source unavailability is not proof of no change.",
"Refresh failures mark staleness without overwriting last validated rules."
],
"sourceEvidence": [
{
"sourceUrl": "[https://dor.wa.gov/taxes-rates/sales-use-tax-rates/local-sales-use-tax](https://dor.wa.gov/taxes-rates/sales-use-tax-rates/local-sales-use-tax)",
"evidenceText": "Washington DOR provides quarterly local sales and use tax rates and change lists.",
"citation": "([Washington Department of Revenue][19])"
}
]
},
{
"tableName": "admin_review_queue",
"purpose": "Human review workflow for conflicts, missing official sources, ambiguous geography, incomplete local coverage, tariff class uncertainty, effective-date gaps, and taxpayer fact dependencies.",
"requiredFields": [
"reviewId",
"entityType",
"entityId",
"reasonCode",
"severity",
"recommendedAction",
"createdAt",
"assignedTo",
"resolvedAt",
"resolution",
"resolutionEvidence"
],
"hardValidation": [
"Admin resolution cannot mutate imported legal content directly.",
"Resolution must reject the batch, create a superseding rule version, or attach a scoped waiver event."
],
"sourceEvidence": []
},
{
"tableName": "estimate_runs",
"purpose": "User-facing calculation runs referencing a frozen rule-version set, address-geography facts, taxpayer/project facts, source confidence, estimate confidence, and warnings.",
"requiredFields": [
"estimateRunId",
"sampleUserId",
"addressId",
"ruleVersionSetHash",
"inputFactsHash",
"sourceConfidenceSummary",
"estimateConfidence",
"warnings",
"createdAt"
],
"hardValidation": [
"Estimate confidence must be calculated separately from source confidence.",
"Missing taxpayer/project facts become warnings or blockers, not inferred values."
],
"sourceEvidence": []
}
],
"ruleVersioningModel": {
"model": "append_only_bitemporal_rule_versions",
"naturalKeyComponents": [
"taxType",
"programId",
"jurisdictionId",
"taxAuthorityId",
"ruleCategory",
"serviceOrPropertyClass",
"taxpayerClass",
"projectTechnology",
"effectiveStart",
"sourceDocumentId"
],
"versionHashInputs": [
"normalized rule conditions",
"rate components",
"formula text",
"effectiveStart",
"effectiveEnd",
"jurisdiction identifiers",
"source document hashes",
"parser version"
],
"states": [
"received_from_gpt_pro",
"parsed",
"machine_validated",
"cross_source_checked",
"staged",
"imported",
"superseded",
"rejected",
"retired"
],
"immutabilityRules": [
"After import, never update rate, formula, jurisdiction, source evidence, or effective-date columns in place.",
"Corrections create a new tax_rule_versions row with supersedesRuleVersionId and a validation event.",
"Metadata-only corrections may use metadata_patch only when versionHash is unchanged.",
"Every rule version must be reproducible from source_documents plus parser version."
],
"retroactivityRules": [
"Store sourcePublishedAt, sourceRetrievedAt, legalEffectiveStart, and legalEffectiveEnd separately.",
"Retroactive official changes create superseding versions and mark affected estimate_runs for re-evaluation.",
"Expired, repealed, or superseded rules are closed by effectiveEnd/status, not deleted."
],
"sourceEvidence": [
{
"sourceUrl": "[https://www.irs.gov/instructions/i3468](https://www.irs.gov/instructions/i3468)",
"evidenceText": "IRS investment credit instructions require facility/property-level reporting and computation.",
"citation": "([IRS][13])"
},
{
"sourceUrl": "[https://services.maps.cdtfa.ca.gov/docs.html](https://services.maps.cdtfa.ca.gov/docs.html)",
"evidenceText": "California CDTFA exposes address-based tax-rate API operations, so imports should preserve endpoint, input, payload hash, and effective period.",
"citation": "([CDTFA Tax Rate API][20])"
}
]
},
"effectiveDateModel": {
"requiredDateFields": [
"sourcePublishedAt",
"sourceRetrievedAt",
"legalEffectiveStart",
"legalEffectiveEnd",
"filingEffectiveDate",
"taxYear",
"ratePeriod",
"formTaxYear"
],
"dateSemantics": [
{
"dateType": "legalEffectiveStart",
"meaning": "First date the statute, regulation, tax agency rate, assessor levy, local ordinance, approved tariff, or official form rule applies.",
"importPolicy": "Block current calculable imports if missing. Allow unknown only for discovery records excluded from estimates."
},
{
"dateType": "sourcePublishedAt",
"meaning": "Date the official source was posted, released, filed, approved, or last updated.",
"importPolicy": "Required when shown by source. If absent, store null with evidenceText saying the source displayed no published date."
},
{
"dateType": "taxYear",
"meaning": "Return year, assessment year, or filing year.",
"importPolicy": "Required for federal forms, property tax rolls, annual credits/deductions, and tax-year-specific filing artifacts."
},
{
"dateType": "ratePeriod",
"meaning": "Period for sales/use tax rates, utility tariff sheets, surcharge statements, and recurring rate changes.",
"importPolicy": "Must include start date and either end date or open-ended current marker."
}
],
"overlapPolicy": [
"Two imported rules with the same natural key and overlapping legalEffectiveStart/legalEffectiveEnd are blockers unless they are explicitly different components of the same formula.",
"Open-ended effectiveEnd is allowed only for current rules and must be closed when a superseding official source is found.",
"Proposed, draft, pending, or requested effective dates cannot drive final user-facing calculations until official final status is source-backed."
],
"sourceEvidence": [
{
"sourceUrl": "[https://cdtfa.ca.gov/taxes-and-fees/rates.aspx](https://cdtfa.ca.gov/taxes-and-fees/rates.aspx)",
"evidenceText": "CDTFA current rate pages carry effective-date and data-last-updated context.",
"citation": "([CDTFA][21])"
},
{
"sourceUrl": "[https://www.cpuc.ca.gov/industries-and-topics/electrical-energy/electric-rates/rate-change-advisories](https://www.cpuc.ca.gov/industries-and-topics/electrical-energy/electric-rates/rate-change-advisories)",
"evidenceText": "CPUC says electric and gas utilities submit requests throughout the year to change rates and that tariff changes implement authorized CPUC orders.",
"citation": "([California Public Utilities Commission][22])"
},
{
"sourceUrl": "[https://www.irs.gov/instructions/i5695](https://www.irs.gov/instructions/i5695)",
"evidenceText": "IRS Form 5695 instructions are tax-year computation instructions for residential energy credits.",
"citation": "([IRS][23])"
}
]
},
"sourceConfidenceModel": {
"principle": "Source confidence scores the authority and completeness of evidence. Estimate confidence scores whether the specific address, taxpayer, project, date, utility class, and facts support a user-facing result.",
"sourceConfidenceLevels": [
{
"level": "A",
"label": "official_machine_readable_final",
"criteria": [
"Official government, tax agency, assessor, treasurer, utility commission, statutory, regulatory, or filed-tariff source.",
"Machine-readable endpoint or downloadable official table.",
"Explicit effective date, rate period, or source vintage.",
"Stable identifiers, jurisdiction codes, or source field paths.",
"Archived payload hash."
],
"examples": [
"Census Geocoder/TIGERweb",
"TIGER/Line shapefiles",
"CDTFA Tax Rate API",
"Washington DOR GIS/rate files",
"Texas Comptroller rate files"
],
"estimateImplication": "Can support high source confidence, but estimate confidence still depends on address, parcel, taxpayer/project facts, and service class."
},
{
"level": "B",
"label": "official_final_web_or_pdf",
"criteria": [
"Official agency, assessor, treasurer, Federal Register, statutory, regulatory, form, instruction, or PUC/tariff source.",
"Final rather than draft/proposed.",
"Evidence text extracted and archived.",
"Dates captured when visible."
],
"examples": [
"IRS form instructions",
"Federal Register notices",
"county assessor PDFs",
"PUC tariff pages"
],
"estimateImplication": "Can support high source confidence if date, unit, and jurisdiction are unambiguous."
},
{
"level": "C",
"label": "official_lookup_without_bulk_download",
"criteria": [
"Official address/rate/parcel lookup.",
"No public bulk export or API.",
"Lookup input, output, timestamp, and screenshot/PDF capture stored where allowed."
],
"examples": [
"state address tax-rate lookup",
"county parcel lookup"
],
"estimateImplication": "Useful for sample profile validation, but weaker reproducibility requires periodic re-check."
},
{
"level": "D",
"label": "official_pending_or_proposed",
"criteria": [
"Official draft, proposed regulation, pending advice letter, proposed tariff, future unapproved rate, or draft form."
],
"examples": [
"pending tariff filing",
"draft IRS form",
"proposed rule"
],
"estimateImplication": "Admin-only context; cannot support final calculations."
},
{
"level": "E",
"label": "non_authoritative_discovery_only",
"criteria": [
"Third-party summary, aggregator, news, law firm article, vendor page, or undocumented GPT output."
],
"examples": [
"tax blogs",
"commercial tax-rate aggregators",
"incentive summaries not verified against official sources"
],
"estimateImplication": "May seed research only; cannot import rates, formulas, dates, or eligibility determinations."
}
],
"estimateConfidenceLevels": [
{
"level": "high",
"criteria": [
"A or B source confidence for all material rules.",
"Address matched to authoritative jurisdiction and parcel/tax area where required.",
"Effective date covers requested date.",
"Taxpayer/project facts are confirmed or not needed.",
"No unresolved official-source conflicts."
],
"userFacingBehavior": "May show calculated result with source links, effective dates, and assumptions."
},
{
"level": "medium",
"criteria": [
"Official sources exist but one non-blocking project fact, service class, parcel detail, or boundary precision issue remains.",
"Calculation can be bounded or conditioned."
],
"userFacingBehavior": "Show conditional result or range with explicit missing facts."
},
{
"level": "low",
"criteria": [
"Official source is incomplete, boundary or parcel match is ambiguous, formula component is unresolved, or a material taxpayer/project fact is missing."
],
"userFacingBehavior": "Do not present a numeric result as final; show unavailable or manual-review state."
},
{
"level": "blocked",
"criteria": [
"No official source, no effective date, no jurisdiction match, unresolved source conflict, or validation blocker failed."
],
"userFacingBehavior": "Suppress calculation and send to admin review."
}
],
"sourceEvidence": [
{
"sourceUrl": "[https://geocoding.geo.census.gov/geocoder/](https://geocoding.geo.census.gov/geocoder/)",
"evidenceText": "Census Geocoder provides interactive and REST access for matching U.S. addresses to geographic locations and entities.",
"citation": "([Census Geocoder][24])"
},
{
"sourceUrl": "[https://www.bia.gov/service/tribal-leaders-directory/tld-csvexcel-dataset](https://www.bia.gov/service/tribal-leaders-directory/tld-csvexcel-dataset)",
"evidenceText": "BIA notes the Tribal Leaders Directory dataset is not the official listing of federally recognized tribes and should be used with the Federal Register notice.",
"citation": "([Indian Affairs][25])"
}
]
},
"importValidationRules": [
{
"id": "V001_SCHEMA_AND_REQUIRED_FIELDS",
"severity": "blocker",
"datasetFamilies": [
"all"
],
"rule": "Reject any GPT Pro-researched record that lacks required identifiers, source links, evidence text, effective-date fields, units, or required schema fields for its dataset family.",
"codexImplementation": "Run JSON Schema plus custom validators before any database write. Emit validation_events for every missing field.",
"safestUserFacingBehavior": "Do not import and do not show a tax result for the affected rule.",
"sourceEvidence": [
{
"sourceUrl": "uploaded_prompt",
"evidenceText": "The task contract requires official sources where possible, no invented rates, JSON-only output, source URLs/evidence, separation of geography facts from taxpayer/project facts, and separation of source confidence from estimate confidence. "
}
]
},
{
"id": "V002_OFFICIAL_SOURCE_REQUIRED",
"severity": "blocker",
"datasetFamilies": [
"all"
],
"rule": "A material rule, rate, formula, jurisdiction, boundary, effective date, filing artifact, or tariff may be imported only when backed by official source evidence.",
"codexImplementation": "Verify each material field links to source_catalog.officialStatus other than non_authoritative_discovery_only.",
"safestUserFacingBehavior": "Suppress calculation and place record in admin review.",
"sourceEvidence": [
{
"sourceUrl": "[https://www.irs.gov/privacy-disclosure/tax-code-regulations-and-official-guidance](https://www.irs.gov/privacy-disclosure/tax-code-regulations-and-official-guidance)",
"evidenceText": "IRS identifies official tax authority families including the Code, regulations, and IRS guidance.",
"citation": "([IRS][1])"
},
{
"sourceUrl": "[https://www.ferc.gov/ferc-online/etariff](https://www.ferc.gov/ferc-online/etariff)",
"evidenceText": "FERC requires covered tariffs and rate-change applications to be filed through eTariff.",
"citation": "([Federal Energy Regulatory Commission][3])"
}
]
},
{
"id": "V003_NO_INVENTED_NUMERIC_VALUES",
"severity": "blocker",
"datasetFamilies": [
"sales_use_tax",
"property_tax",
"utility_tax_or_tariff",
"tax_credit",
"deduction",
"exemption"
],
"rule": "Reject any numeric rate, cap, threshold, credit percentage, deduction amount, levy, millage, surcharge, or formula term whose exact value, unit, basis, and effective period are not present in official evidence or an auditable official payload field.",
"codexImplementation": "For every rate_components row require numericValue, unit, basis, effectiveStart, and sourceDocumentId. Evidence must contain the value or a machine-readable field path.",
"safestUserFacingBehavior": "Show unavailable; never fill missing values from neighboring jurisdictions, old rates, averages, or model guesses.",
"sourceEvidence": [
{
"sourceUrl": "[https://www.irs.gov/instructions/i3468](https://www.irs.gov/instructions/i3468)",
"evidenceText": "IRS Form 3468 instructions require separate facility/property computation for investment credits.",
"citation": "([IRS][13])"
}
]
},
{
"id": "V004_EFFECTIVE_DATE_REQUIRED",
"severity": "blocker",
"datasetFamilies": [
"all_calculable"
],
"rule": "A calculable rule must have a source-backed effective period or tax year, and the requested calculation date must fall within that period.",
"codexImplementation": "Check legalEffectiveStart <= requestedDate and legalEffectiveEnd is null or requestedDate <= legalEffectiveEnd. For tax-year forms, match formTaxYear.",
"safestUserFacingBehavior": "Do not calculate for dates outside source-backed periods.",
"sourceEvidence": [
{
"sourceUrl": "[https://cdtfa.ca.gov/taxes-and-fees/rates.aspx](https://cdtfa.ca.gov/taxes-and-fees/rates.aspx)",
"evidenceText": "CDTFA publishes California sales/use tax rates with effective-date context.",
"citation": "([CDTFA][21])"
},
{
"sourceUrl": "[https://dor.wa.gov/taxes-rates/sales-use-tax-rates/local-sales-use-tax](https://dor.wa.gov/taxes-rates/sales-use-tax-rates/local-sales-use-tax)",
"evidenceText": "Washington DOR publishes local sales/use tax rates and changes by quarter.",
"citation": "([Washington Department of Revenue][19])"
}
]
},
{
"id": "V005_GEOGRAPHY_FACTS_NOT_TAXPAYER_FACTS",
"severity": "blocker",
"datasetFamilies": [
"all"
],
"rule": "Address-derived county, municipality, parcel, tax area, district, tribal area, and utility territory facts must be stored separately from taxpayer/project facts.",
"codexImplementation": "Enforce allowed factType lists for address_geography_facts and taxpayer_project_facts. Reject records that infer eligibility from organizationType, companyName, or siteAddress alone.",
"safestUserFacingBehavior": "Ask for missing taxpayer/project evidence rather than inferring eligibility.",
"sourceEvidence": [
{
"sourceUrl": "[https://www.irs.gov/credits-deductions/elective-pay-and-transferability-frequently-asked-questions-elective-pay](https://www.irs.gov/credits-deductions/elective-pay-and-transferability-frequently-asked-questions-elective-pay)",
"evidenceText": "IRS elective-pay eligibility depends on applicable entity status and special credit rules, not address alone.",
"citation": "([IRS][26])"
}
]
},
{
"id": "V006_ADDRESS_GEOCODER_REPRODUCIBLE",
"severity": "blocker",
"datasetFamilies": [
"geography",
"sales_use_tax",
"property_tax",
"utility_tax_or_tariff"
],
"rule": "Every address-to-geography join must store raw address, standardized address, lat/lon, geocoder name, benchmark, vintage, match type, match score, retrieval timestamp, and source payload hash.",
"codexImplementation": "Require addresses.geocoderBenchmark and addresses.geocoderVintage for Census results and payload hash for official locators.",
"safestUserFacingBehavior": "Do not use non-reproducible address matches for final tax determinations.",
"sourceEvidence": [
{
"sourceUrl": "[https://geocoding.geo.census.gov/geocoder/Geocoding_Services_API.html](https://geocoding.geo.census.gov/geocoder/Geocoding_Services_API.html)",
"evidenceText": "Census Geocoding Services are tied to MAF/TIGER benchmark data.",
"citation": "([Census Geocoder][8])"
}
]
},
{
"id": "V007_CENSUS_NOT_PARCEL_AUTHORITY",
"severity": "warning",
"datasetFamilies": [
"property_tax",
"geography"
],
"rule": "Census geocoder output can support jurisdiction joins but cannot prove parcel existence, APN, ownership, assessment value, or exact property tax area.",
"codexImplementation": "For property-tax calculations, require county assessor/treasurer parcel or tax-area evidence where material. Otherwise downgrade estimateConfidence.",
"safestUserFacingBehavior": "Show parcel/tax-area unavailable and route to admin review when parcel is material.",
"sourceEvidence": [
{
"sourceUrl": "[https://www.census.gov/programs-surveys/geography/technical-documentation/complete-technical-documentation/census-geocoder.html](https://www.census.gov/programs-surveys/geography/technical-documentation/complete-technical-documentation/census-geocoder.html)",
"evidenceText": "Census states its geocoder is based on address ranges that include possible structure numbers even when actual structures may not exist.",
"citation": "([Census.gov][9])"
}
]
},
{
"id": "V008_BOUNDARY_VINTAGE_REQUIRED",
"severity": "blocker",
"datasetFamilies": [
"geography",
"sales_use_tax",
"property_tax"
],
"rule": "Boundary-derived jurisdiction facts must record source, geometry version, vintage date, CRS, and geometry hash.",
"codexImplementation": "Require jurisdiction_boundaries.boundaryVintage, crs, geometryHash, and sourceDocumentId. Fail if null.",
"safestUserFacingBehavior": "Do not rely on unstamped boundary data for current tax determinations.",
"sourceEvidence": [
{
"sourceUrl": "[https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.html](https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.html)",
"evidenceText": "Census TIGER/Line shapefiles publish source-vintaged legal boundaries.",
"citation": "([Census.gov][6])"
}
]
},
{
"id": "V009_TRIBAL_AND_HAWAIIAN_LAND_REVIEW",
"severity": "review",
"datasetFamilies": [
"geography",
"sales_use_tax",
"property_tax",
"tax_credit",
"utility_tax_or_tariff"
],
"rule": "Addresses on or near tribal areas, trust lands, Alaska Native areas, or Hawaiian home lands must be flagged because jurisdiction, taxability, utility service, and documentation rules may differ and cannot be inferred from state/county alone.",
"codexImplementation": "Join against AIANNH geometries and Federal Register/BIA sources. If within tolerance band or conflicting sources, enqueue admin review.",
"safestUserFacingBehavior": "Show manual-review state for affected local tax/utility determinations until jurisdiction is confirmed.",
"sourceEvidence": [
{
"sourceUrl": "[https://catalog.data.gov/dataset/tiger-line-shapefile-current-nation-u-s-american-indian-alaska-native-native-hawaiian-area](https://catalog.data.gov/dataset/tiger-line-shapefile-current-nation-u-s-american-indian-alaska-native-native-hawaiian-area)",
"evidenceText": "AIANNH boundary data includes reservations, off-reservation trust lands, state-recognized reservations, and Hawaiian home lands.",
"citation": "([Data.gov][7])"
},
{
"sourceUrl": "[https://www.federalregister.gov/documents/2026/01/30/2026-01899/indian-entities-recognized-by-and-eligible-to-receive-services-from-the-united-states-bureau-of](https://www.federalregister.gov/documents/2026/01/30/2026-01899/indian-entities-recognized-by-and-eligible-to-receive-services-from-the-united-states-bureau-of)",
"evidenceText": "The Federal Register notice publishes the current federally recognized tribal entity list.",
"citation": "([Federal Register][5])"
}
]
},
{
"id": "V010_SALES_TAX_COMPONENTS_AND_TOTAL",
"severity": "blocker",
"datasetFamilies": [
"sales_use_tax"
],
"rule": "Sales/use tax imports must store either official combined rate plus component jurisdictions or official evidence that only a combined address result is published for that source.",
"codexImplementation": "If components are present, validate sum(componentRates) equals combinedRate within configured precision. If not, require evidence that source is combined-only.",
"safestUserFacingBehavior": "Do not calculate sales/use tax amount when component and total conflict is unresolved.",
"sourceEvidence": [
{
"sourceUrl": "[https://www.cdtfa.ca.gov/taxes-and-fees/sales-use-tax-rates.htm](https://www.cdtfa.ca.gov/taxes-and-fees/sales-use-tax-rates.htm)",
"evidenceText": "CDTFA offers address lookup, county/city rate information, current rates, and historical rates.",
"citation": "([CDTFA][27])"
},
{
"sourceUrl": "[https://tax.colorado.gov/GIS-info](https://tax.colorado.gov/GIS-info)",
"evidenceText": "Colorado DOR GIS includes state, county, municipality, and special taxation district sales tax information for a complete rate.",
"citation": "([Colorado Department of Revenue][28])"
}
]
},
{
"id": "V011_HOME_RULE_LOCAL_TAX_GAPS",
"severity": "review",
"datasetFamilies": [
"sales_use_tax"
],
"rule": "If a state identifies home-rule, self-collected, or locally administered sales/use taxes, store administration status and require local source coverage when state data is incomplete.",
"codexImplementation": "Add jurisdictionAdministrationType. If local source is missing, mark coverageStatus=partial and block total-tax claim.",
"safestUserFacingBehavior": "Show partial state-administered result only when clearly labeled partial; do not claim total tax.",
"sourceEvidence": [
{
"sourceUrl": "[https://tax.colorado.gov/sales-tax-guide](https://tax.colorado.gov/sales-tax-guide)",
"evidenceText": "Colorado DOR states sales may be subject to self-collected home-rule city sales taxes not administered by the Department.",
"citation": "([Colorado Department of Revenue][29])"
}
]
},
{
"id": "V012_PROPERTY_TAX_PARCEL_AND_TAX_AREA",
"severity": "blocker",
"datasetFamilies": [
"property_tax"
],
"rule": "Property-tax estimates that depend on parcel, assessed value, levy code, tax-rate area, or special district must be backed by county assessor/treasurer, state property tax, or official tax-rate-area sources.",
"codexImplementation": "Require APN or official parcel/tax-area match for parcel-level property tax outputs. Estimate confidence cannot exceed low without it.",
"safestUserFacingBehavior": "Do not compute a property tax bill estimate when parcel/tax-area is missing.",
"sourceEvidence": [
{
"sourceUrl": "[https://www.boe.ca.gov/proptaxes/proptax.htm](https://www.boe.ca.gov/proptaxes/proptax.htm)",
"evidenceText": "California BOE Property Tax Department oversees county assessors and property tax laws, regulations, and assessment issues.",
"citation": "([California State Board of Equalization][30])"
},
{
"sourceUrl": "[https://www.boe.ca.gov/proptaxes/sprdcont.htm](https://www.boe.ca.gov/proptaxes/sprdcont.htm)",
"evidenceText": "California BOE Tax Area Services Section maintains and reports jurisdictional boundary changes for revenue districts to county auditors and assessors.",
"citation": "([California State Board of Equalization][31])"
}
]
},
{
"id": "V013_PROPERTY_TAX_LOCAL_AUTHORITY_PRECEDENCE",
"severity": "review",
"datasetFamilies": [
"property_tax"
],
"rule": "When state property-tax summaries and local assessor/treasurer records differ, do not average. Use deterministic precedence or admin review.",
"codexImplementation": "Compare state, county, assessor, treasurer, and tax-rate-area sources. Queue conflicts with source tiers and field-level differences.",
"safestUserFacingBehavior": "Suppress numeric property-tax result until conflict is resolved.",
"sourceEvidence": [
{
"sourceUrl": "[https://comptroller.texas.gov/taxes/property-tax/](https://comptroller.texas.gov/taxes/property-tax/)",
"evidenceText": "Texas Comptroller states Texas has no state property tax and that local taxing units set and collect property taxes.",
"citation": "([Texas Comptroller][32])"
},
{
"sourceUrl": "[https://comptroller.texas.gov/taxes/property-tax/rates/](https://comptroller.texas.gov/taxes/property-tax/rates/)",
"evidenceText": "Texas Comptroller prepares lists of total tax rates imposed by taxing units as reported by appraisal districts.",
"citation": "([Texas Comptroller][33])"
}
]
},
{
"id": "V014_UTILITY_TARIFF_SERVICE_CLASS",
"severity": "blocker",
"datasetFamilies": [
"utility_tax_or_tariff"
],
"rule": "Utility tariff taxes, riders, demand charges, public-purpose charges, NEM/NBT credits, and rate schedules require source-backed utility, service territory, customer class, tariff sheet, and effective date.",
"codexImplementation": "Require utility_service_provider, tariff schedule identifier, customer class, rate component units, approval status, and source document. Pending tariffs get status=pending.",
"safestUserFacingBehavior": "Do not calculate utility charges or credits until utility and tariff class are confirmed.",
"sourceEvidence": [
{
"sourceUrl": "[https://www.utc.wa.gov/regulated-industries/utilities/energy/energy-company-tariffs](https://www.utc.wa.gov/regulated-industries/utilities/energy/energy-company-tariffs)",
"evidenceText": "Washington UTC states regulated energy companies file tariffs with the commission outlining services and rates.",
"citation": "([WUTC][34])"
},
{
"sourceUrl": "[https://iuc.iowa.gov/records-documents/utility-tariffs-filed-iuc](https://iuc.iowa.gov/records-documents/utility-tariffs-filed-iuc)",
"evidenceText": "Iowa Utilities Commission states filed utility tariffs show rates, charges, and rules/regulations for public utility services.",
"citation": "([Iowa Utilities Commission][35])"
}
]
},
{
"id": "V015_PUC_APPROVAL_STATUS",
"severity": "review",
"datasetFamilies": [
"utility_tax_or_tariff"
],
"rule": "For regulated utilities, distinguish utility-posted tariff books from commission-approved rates, advice letters, and ratemaking orders. Utility pages are supporting sources unless approval status is resolved.",
"codexImplementation": "Store approvalStatus and approvalSourceDocumentId. If source is utility web page only, require commission cross-check where available.",
"safestUserFacingBehavior": "Show pending/manual review when approval is uncertain.",
"sourceEvidence": [
{
"sourceUrl": "[https://www.cpuc.ca.gov/industries-and-topics/electrical-energy/electric-rates](https://www.cpuc.ca.gov/industries-and-topics/electrical-energy/electric-rates)",
"evidenceText": "CPUC states it must approve all rates that each California electric utility charges customers.",
"citation": "([California Public Utilities Commission][36])"
},
{
"sourceUrl": "[https://www.cpuc.ca.gov/industries-and-topics/electrical-energy/energy-utility-advice-letter-and-tariff-information](https://www.cpuc.ca.gov/industries-and-topics/electrical-energy/energy-utility-advice-letter-and-tariff-information)",
"evidenceText": "CPUC energy advice-letter/tariff information includes requested effective date and tariff-sheet fields.",
"citation": "([California Public Utilities Commission][37])"
}
]
},
{
"id": "V016_FEDERAL_CREDIT_CROSSCHECK",
"severity": "blocker",
"datasetFamilies": [
"tax_credit",
"deduction"
],
"rule": "Federal credit and deduction rules must cross-check legal authority with current IRS program page and form/instruction for the relevant tax year.",
"codexImplementation": "For section 48, 48E, 179D, 25C, 25D, elective pay, and transferability records, require legalAuthoritySourceDocumentId plus current form/instruction or program page where applicable.",
"safestUserFacingBehavior": "Do not claim eligibility or amount if statute/guidance and form instructions conflict or one is missing.",
"sourceEvidence": [
{
"sourceUrl": "[https://uscode.house.gov/view.xhtml?edition=prelim&num=0&req=granuleid%3AUSC-prelim-title26-section48E](https://uscode.house.gov/view.xhtml?edition=prelim&num=0&req=granuleid%3AUSC-prelim-title26-section48E)",
"evidenceText": "The House U.S. Code page provides section 48E clean electricity investment credit statutory text.",
"citation": "([U.S. Code][38])"
},
{
"sourceUrl": "[https://www.irs.gov/credits-deductions/clean-electricity-investment-credit](https://www.irs.gov/credits-deductions/clean-electricity-investment-credit)",
"evidenceText": "IRS describes the Clean Electricity Investment Credit as a technology-neutral investment credit replacing the energy investment credit once it phases out.",
"citation": "([IRS][39])"
}
]
},
{
"id": "V017_RESIDENTIAL_CREDIT_TAXPAYER_FACTS",
"severity": "review",
"datasetFamilies": [
"tax_credit"
],
"rule": "Residential energy credit records must not infer homeowner, renter, primary residence, second home, placed-in-service date, or qualified expense facts from a multifamily address alone.",
"codexImplementation": "Set requiresUserFact=true for ownership/use/qualified expense facts and validate against IRS residential credit form/instructions for the tax year.",
"safestUserFacingBehavior": "Prompt for residential taxpayer facts and show no final credit estimate until facts are confirmed.",
"sourceEvidence": [
{
"sourceUrl": "[https://www.irs.gov/instructions/i5695](https://www.irs.gov/instructions/i5695)",
"evidenceText": "IRS Form 5695 instructions are used to figure residential energy credits.",
"citation": "([IRS][23])"
},
{
"sourceUrl": "[https://www.irs.gov/credits-deductions/home-energy-tax-credits](https://www.irs.gov/credits-deductions/home-energy-tax-credits)",
"evidenceText": "IRS states homeowners have the most opportunities and renters may be able to claim credits, showing taxpayer status must be validated.",
"citation": "([IRS][40])"
}
]
},
{
"id": "V018_ELECTIVE_PAY_TRANSFERABILITY",
"severity": "review",
"datasetFamilies": [
"tax_credit"
],
"rule": "Elective pay and transferability must be modeled separately from base credit eligibility and require entity type, credit type, tax year, registration status, and registration number where applicable.",
"codexImplementation": "Create rule_conditions for applicable entity, electing taxpayer, eligible taxpayer, credit type, and tax year. Create filing_artifacts for Energy Credits Online registration where required.",
"safestUserFacingBehavior": "Show elective-pay/transferability as unavailable or action-required until facts and registration requirements are satisfied.",
"sourceEvidence": [
{
"sourceUrl": "[https://www.irs.gov/credits-deductions/elective-pay-and-transferability](https://www.irs.gov/credits-deductions/elective-pay-and-transferability)",
"evidenceText": "IRS states elective pay makes certain clean energy credits effectively refundable by treating the credit amount as a tax payment.",
"citation": "([IRS][11])"
},
{
"sourceUrl": "[https://www.irs.gov/credits-deductions/register-for-elective-payment-or-transfer-of-credits](https://www.irs.gov/credits-deductions/register-for-elective-payment-or-transfer-of-credits)",
"evidenceText": "IRS states elective payment or transfer elections require Energy Credits Online registration numbers for applicable credit property and inclusion on the return.",
"citation": "([IRS][41])"
}
]
},
{
"id": "V019_179D_OWNER_DESIGNER_ALLOCATION",
"severity": "review",
"datasetFamilies": [
"deduction"
],
"rule": "Section 179D-like deductions must model owner/designer identity, certification, allocation, placed-in-service year, and building type as separate required facts where material.",
"codexImplementation": "Require rule_conditions and filing_artifacts for Form 7205 fields. Government/public-agency sample profiles cannot auto-assign deduction to a designer without allocation evidence.",
"safestUserFacingBehavior": "Show potential eligibility workflow rather than final deduction amount until owner/designer/allocation facts are confirmed.",
"sourceEvidence": [
{
"sourceUrl": "[https://www.irs.gov/credits-deductions/energy-efficient-commercial-buildings-deduction](https://www.irs.gov/credits-deductions/energy-efficient-commercial-buildings-deduction)",
"evidenceText": "IRS states building owners who place in service qualifying property may be able to claim section 179D and that increased deductions may depend on energy savings or prevailing wage/apprenticeship.",
"citation": "([IRS][42])"
},
{
"sourceUrl": "[https://www.irs.gov/instructions/i7205](https://www.irs.gov/instructions/i7205)",
"evidenceText": "IRS Form 7205 instructions require owner/designer, certification, and allocation information.",
"citation": "([IRS][14])"
}
]
},
{
"id": "V020_UNITS_BASIS_ROUNDING",
"severity": "blocker",
"datasetFamilies": [
"all_calculable"
],
"rule": "All imported numeric values must specify unit, taxable basis, inclusion/exclusion basis, rounding rule, and precision.",
"codexImplementation": "Use enumerated unit and basis columns plus validators by taxType. Reject free-text-only units.",
"safestUserFacingBehavior": "Do not calculate where unit, basis, or rounding is ambiguous.",
"sourceEvidence": [
{
"sourceUrl": "[https://iuc.iowa.gov/records-documents/utility-tariffs-filed-iuc](https://iuc.iowa.gov/records-documents/utility-tariffs-filed-iuc)",
"evidenceText": "Iowa Utilities Commission identifies filed tariffs as showing utility rates, charges, and rules/regulations, which can have different units and charge bases.",
"citation": "([Iowa Utilities Commission][35])"
}
]
},
{
"id": "V021_SAMPLE_PROFILE_PRIORITY_COVERAGE",
"severity": "warning",
"datasetFamilies": [
"all"
],
"rule": "Initial validation coverage must prioritize the sample states and profiles in the prompt: AK, AZ, CA, CO, DC, GA, HI, IA, ID, IL, MA, ME, MI, MN, MT, NC, NM, NY, OH, OK, PA, SC, TN, TX, UT, VA, VT, WA, and WI.",
"codexImplementation": "Generate sample_profile_jurisdiction_snapshot rows and run coverage tests by state, tax type, source availability, address match, and confidence.",
"safestUserFacingBehavior": "Expose coverage status by profile and tax family; do not imply national completeness.",
"sourceEvidence": [
{
"sourceUrl": "uploaded_prompt",
"evidenceText": "The task prompt lists sample profile jurisdictions and asks that practical coverage be prioritized from them. "
}
]
},
{
"id": "V022_STALE_SOURCE_BLOCKER",
"severity": "blocker",
"datasetFamilies": [
"all_current_estimates"
],
"rule": "For current estimates, the source family must be refreshed within configured TTL and must not have a known newer source hash or published effective change.",
"codexImplementation": "Compare refreshedAt to source_catalog.refreshCadence and known source-change dates. Fail closed on stale-blocking families such as sales rates and utility tariffs.",
"safestUserFacingBehavior": "Show stale-source/manual-review message and do not silently use old rates as current.",
"sourceEvidence": [
{
"sourceUrl": "[https://dor.wa.gov/taxes-rates/sales-use-tax-rates/local-sales-use-tax-change-notices-previous-quarters](https://dor.wa.gov/taxes-rates/sales-use-tax-rates/local-sales-use-tax-change-notices-previous-quarters)",
"evidenceText": "Washington DOR maintains prior-quarter local sales/use tax change notices, showing old rates can remain accessible but not current.",
"citation": "([Washington Department of Revenue][43])"
}
]
},
{
"id": "V023_SOURCE_CONFLICT_NO_AVERAGING",
"severity": "blocker",
"datasetFamilies": [
"all"
],
"rule": "When official sources conflict on a material field, do not average, interpolate, or automatically choose the newest page unless precedence rules identify a controlling source.",
"codexImplementation": "Create source_conflict validation_event with compared values, source tiers, dates, and recommended precedence. Require admin resolution or deterministic precedence rule.",
"safestUserFacingBehavior": "Suppress affected result and show official-source conflict if needed.",
"sourceEvidence": [
{
"sourceUrl": "[https://www.ecfr.gov/current/title-26](https://www.ecfr.gov/current/title-26)",
"evidenceText": "eCFR's continuously updated status but non-official legal-edition caveat illustrates why source precedence must be explicit.",
"citation": "([eCFR][2])"
}
]
},
{
"id": "V024_AUDITABLE_ARCHIVE_REQUIRED",
"severity": "blocker",
"datasetFamilies": [
"all"
],
"rule": "Every imported source and normalized record must be auditable to the exact payload used at import time, not merely a mutable URL.",
"codexImplementation": "Archive raw payloads, response metadata, parser version, content hash, extracted text spans, and screenshots for official non-machine-readable lookups where allowed.",
"safestUserFacingBehavior": "If a source cannot be audited, keep record in staging and exclude from calculations.",
"sourceEvidence": [
{
"sourceUrl": "[https://www.ferc.gov/view-individual-tariffs](https://www.ferc.gov/view-individual-tariffs)",
"evidenceText": "FERC provides a Public Tariff Viewer for individual tariffs, supporting retrieval and audit trails for filed tariffs.",
"citation": "([Federal Energy Regulatory Commission][44])"
}
]
}
],
"crossSourceConsistencyChecks": [
{
"id": "C001_SALES_RATE_ADDRESS_API_VS_RATE_TABLE",
"appliesTo": [
"sales_use_tax"
],
"check": "For states with both official address lookup/API and rate tables, compare address-specific result against component jurisdiction tables for the same effective period.",
"blockOn": [
"combined rate mismatch",
"jurisdiction code mismatch",
"effective date mismatch"
],
"exampleOfficialSources": [
{
"sourceUrl": "[https://services.maps.cdtfa.ca.gov/docs.html](https://services.maps.cdtfa.ca.gov/docs.html)",
"evidenceText": "CDTFA Tax Rate API exposes address-based rate retrieval.",
"citation": "([CDTFA Tax Rate API][20])"
},
{
"sourceUrl": "[https://www.cdtfa.ca.gov/taxes-and-fees/sales-use-tax-rates.htm](https://www.cdtfa.ca.gov/taxes-and-fees/sales-use-tax-rates.htm)",
"evidenceText": "CDTFA publishes current and historical sales/use tax rate resources.",
"citation": "([CDTFA][27])"
}
]
},
{
"id": "C002_STATE_TAX_GIS_VS_CENSUS_BOUNDARY",
"appliesTo": [
"geography",
"sales_use_tax"
],
"check": "Compare state tax GIS jurisdiction code and Census county/place joins. If tax agency boundary differs from civil boundary, tax agency jurisdiction code controls for that tax family.",
"blockOn": [
"state tax locator returns no match",
"Census address match ambiguous",
"state tax jurisdiction code missing for calculable sales/use tax"
],
"exampleOfficialSources": [
{
"sourceUrl": "[https://tax.colorado.gov/GIS-info](https://tax.colorado.gov/GIS-info)",
"evidenceText": "Colorado GIS identifies the specific sales tax rate for an address or map location and includes special taxation districts.",
"citation": "([Colorado Department of Revenue][28])"
},
{
"sourceUrl": "[https://www.census.gov/data/developers/guidance/api-user-guide.html](https://www.census.gov/data/developers/guidance/api-user-guide.html)",
"evidenceText": "Census TIGERweb returns boundaries by FIPS code or latitude/longitude.",
"citation": "([Census.gov][4])"
}
]
},
{
"id": "C003_PROPERTY_PARCEL_VS_TAX_DISTRICT",
"appliesTo": [
"property_tax"
],
"check": "Compare parcel/APN match, assessor tax-rate area, treasurer bill, state levy/rate tables, and taxing district boundaries before computing property tax.",
"blockOn": [
"parcel not found",
"multiple parcels without unit/APN selection",
"tax-rate area conflict",
"assessed value year mismatch"
],
"exampleOfficialSources": [
{
"sourceUrl": "[https://dor.wa.gov/about/statistics-reports/property-tax-statistics](https://dor.wa.gov/about/statistics-reports/property-tax-statistics)",
"evidenceText": "Washington DOR property tax statistics present levy information for taxing districts and district codes by year.",
"citation": "([Washington Department of Revenue][45])"
},
{
"sourceUrl": "[https://www.boe.ca.gov/proptaxes/sprdcont.htm](https://www.boe.ca.gov/proptaxes/sprdcont.htm)",
"evidenceText": "California BOE Tax Area Services Section handles revenue-district boundary changes for county auditors and assessors.",
"citation": "([California State Board of Equalization][31])"
}
]
},
{
"id": "C004_TRIBAL_AREA_VS_STATE_LOCAL_TAX",
"appliesTo": [
"sales_use_tax",
"property_tax",
"utility_tax_or_tariff",
"tax_credit"
],
"check": "For addresses on or near AIANNH/Hawaiian home land geometries or profile names indicating tribal entities, compare federal recognition, tribal boundary, state tax locator, and local authority sources before importing state/local assumptions.",
"blockOn": [
"tribal boundary overlap without taxability source",
"Federal Register/BIA/Census mismatch",
"state locator unable to classify address"
],
"exampleOfficialSources": [
{
"sourceUrl": "[https://www.federalregister.gov/documents/2026/01/30/2026-01899/indian-entities-recognized-by-and-eligible-to-receive-services-from-the-united-states-bureau-of](https://www.federalregister.gov/documents/2026/01/30/2026-01899/indian-entities-recognized-by-and-eligible-to-receive-services-from-the-united-states-bureau-of)",
"evidenceText": "Federal Register publishes the current official list of federally recognized tribal entities.",
"citation": "([Federal Register][5])"
},
{
"sourceUrl": "[https://catalog.data.gov/dataset/tiger-line-shapefile-current-nation-u-s-american-indian-alaska-native-native-hawaiian-area](https://catalog.data.gov/dataset/tiger-line-shapefile-current-nation-u-s-american-indian-alaska-native-native-hawaiian-area)",
"evidenceText": "AIANNH shapefile covers relevant tribal and Hawaiian home land geographies.",
"citation": "([Data.gov][7])"
}
]
},
{
"id": "C005_UTILITY_TERRITORY_VS_TARIFF_SCHEDULE",
"appliesTo": [
"utility_tax_or_tariff"
],
"check": "Verify site is in utility territory and customer/building class maps to the imported tariff schedule; separately validate commission approval and effective date.",
"blockOn": [
"utility provider unknown",
"service class ambiguous",
"tariff sheet not current or only proposed",
"rate unit incompatible with calculation basis"
],
"exampleOfficialSources": [
{
"sourceUrl": "[https://www.utc.wa.gov/regulated-industries/utilities/energy/energy-company-tariffs](https://www.utc.wa.gov/regulated-industries/utilities/energy/energy-company-tariffs)",
"evidenceText": "Washington UTC hosts energy company tariff links for services and rates.",
"citation": "([WUTC][34])"
},
{
"sourceUrl": "[https://www.cpuc.ca.gov/industries-and-topics/electrical-energy/electric-rates](https://www.cpuc.ca.gov/industries-and-topics/electrical-energy/electric-rates)",
"evidenceText": "CPUC must approve rates charged by California electric utilities.",
"citation": "([California Public Utilities Commission][36])"
}
]
},
{
"id": "C006_FEDERAL_STATUTE_REGULATION_FORM_ALIGNMENT",
"appliesTo": [
"tax_credit",
"deduction"
],
"check": "For federal programs, compare statute, regulations/final guidance, IRS program page, current forms, and current instructions. Flag if a form instruction changes eligibility, computation, or filing artifact relative to normalized rule.",
"blockOn": [
"tax year mismatch",
"expired credit/deduction used as active",
"form missing required property-level or registration data",
"statute/form conflict unresolved"
],
"exampleOfficialSources": [
{
"sourceUrl": "[https://www.irs.gov/instructions/i3468](https://www.irs.gov/instructions/i3468)",
"evidenceText": "IRS Form 3468 instructions specify property/facility information and computation requirements for investment credits.",
"citation": "([IRS][13])"
},
{
"sourceUrl": "[https://www.irs.gov/instructions/i7205](https://www.irs.gov/instructions/i7205)",
"evidenceText": "IRS Form 7205 instructions specify section 179D claim, certification, owner/designer, and allocation information.",
"citation": "([IRS][14])"
}
]
},
{
"id": "C007_RATE_PERIOD_CONTINUITY",
"appliesTo": [
"sales_use_tax",
"property_tax",
"utility_tax_or_tariff"
],
"check": "When a new rate period is imported, verify prior open-ended period closes exactly before new effective date unless official source allows overlap.",
"blockOn": [
"overlapping periods for same natural key",
"gap in mandatory rate period",
"source says prior period still current"
],
"exampleOfficialSources": [
{
"sourceUrl": "[https://dor.wa.gov/taxes-rates/sales-use-tax-rates/local-sales-use-tax-change-notices-previous-quarters](https://dor.wa.gov/taxes-rates/sales-use-tax-rates/local-sales-use-tax-change-notices-previous-quarters)",
"evidenceText": "Washington DOR retains prior-quarter local sales/use tax change notices, enabling period continuity checks.",
"citation": "([Washington Department of Revenue][43])"
}
]
},
{
"id": "C008_LOCAL_COMPONENTS_VS_STATE_TOTAL",
"appliesTo": [
"sales_use_tax",
"property_tax"
],
"check": "Where official sources publish component rates and total rates, validate mathematical totals and jurisdiction codes. Allow official total to control only when component discrepancy is documented and reviewed.",
"blockOn": [
"component sum differs from official total beyond precision",
"unknown special district component",
"unit mismatch"
],
"exampleOfficialSources": [
{
"sourceUrl": "[https://comptroller.texas.gov/taxes/sales/](https://comptroller.texas.gov/taxes/sales/)",
"evidenceText": "Texas Comptroller publishes city, county, transit, special-purpose district, combined-area rates, and quarterly updates.",
"citation": "([Texas Comptroller][15])"
}
]
},
{
"id": "C009_FORM_DRAFT_VS_FINAL",
"appliesTo": [
"tax_credit",
"deduction",
"filing_artifacts"
],
"check": "Compare IRS current forms/instructions pages with any PDF artifact. Reject draft forms for final calculations unless explicitly marked draft and excluded from user-facing final results.",
"blockOn": [
"draft artifact mapped as final",
"current form tax year missing",
"post-release change indicates material update not ingested"
],
"exampleOfficialSources": [
{
"sourceUrl": "[https://www.irs.gov/forms-pubs/about-form-3468](https://www.irs.gov/forms-pubs/about-form-3468)",
"evidenceText": "IRS About Form 3468 page distinguishes current/prior forms and instructions and post-release changes.",
"citation": "([IRS][17])"
}
]
},
{
"id": "C010_SAMPLE_PROFILE_REGRESSION",
"appliesTo": [
"all"
],
"check": "Run a fixed regression suite for every sample profile address and supported tax family, recording source availability, address match, jurisdiction stack, tariff class status, property parcel status, and user-fact blockers.",
"blockOn": [
"previously high-confidence sample profile drops to low without source-diff explanation",
"new source update changes rate or jurisdiction without affected-profile diff",
"sample address geocoding result changes materially"
],
"exampleOfficialSources": [
{
"sourceUrl": "uploaded_prompt",
"evidenceText": "The sample profiles define the initial practical coverage set and include commercial, residential, government, nonprofit, agricultural, industrial, data center, hospitality, healthcare, school, warehouse, and restaurant use cases. "
}
]
}
],
"addressGeographyJoinPlan": [
{
"step": 1,
"name": "ingest_and_standardize_addresses",
"objective": "Store raw address exactly as supplied, then create standardized address candidates without overwriting raw input.",
"implementation": [
"Persist rawAddress.",
"Run Census Geocoder and any state tax-agency address locator available for the tax family.",
"Store benchmark, vintage, match score, and source payload."
],
"outputs": [
"addresses row",
"geocoder result document",
"candidate lat/lon"
],
"blockers": [
"no geocode match",
"multiple high-confidence candidates without tie-breaker",
"address outside supported U.S. geography"
],
"sourceEvidence": [
{
"sourceUrl": "[https://geocoding.geo.census.gov/geocoder/](https://geocoding.geo.census.gov/geocoder/)",
"evidenceText": "Census Geocoder provides interactive and REST access for matching U.S. addresses to geographic locations and entities.",
"citation": "([Census Geocoder][24])"
}
]
},
{
"step": 2,
"name": "derive_baseline_census_geography",
"objective": "Derive state, county, place, tract/block, and baseline geographies from coordinates using a versioned Census vintage.",
"implementation": [
"Call Census Geographies endpoint or TIGERweb layers by coordinate.",
"Persist FIPS codes and vintage.",
"Run point-in-polygon against stored TIGER/Line geometries for reproducibility."
],
"outputs": [
"address_geography_facts for FIPS-backed geographies"
],
"blockers": [
"no county/state FIPS",
"coordinate on boundary tolerance band"
],
"sourceEvidence": [
{
"sourceUrl": "[https://www.census.gov/data/developers/guidance/api-user-guide.html](https://www.census.gov/data/developers/guidance/api-user-guide.html)",
"evidenceText": "Census TIGERweb can return boundaries by FIPS code or latitude/longitude.",
"citation": "([Census.gov][4])"
},
{
"sourceUrl": "[https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.html](https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.html)",
"evidenceText": "TIGER/Line files provide source-vintaged legal boundaries.",
"citation": "([Census.gov][6])"
}
]
},
{
"step": 3,
"name": "join_sales_tax_jurisdictions",
"objective": "Use tax-agency-controlled boundaries or address/rate APIs for sales/use tax, not civil boundaries alone.",
"implementation": [
"For California, use CDTFA API/address tools where available.",
"For Washington, use DOR lookup/downloadable files and quarterly rate changes.",
"For Colorado, use DOR GIS/SUTS and mark self-collected home-rule gaps.",
"For Texas, use Comptroller rate locator and local code/rate tables.",
"For other sample states, build equivalent state-revenue source adapters before importing."
],
"outputs": [
"tax area code",
"combined rate",
"component jurisdictions if source provides them",
"effective period"
],
"blockers": [
"official tax locator unavailable and no authoritative table",
"home-rule local tax not sourced",
"component sum conflict"
],
"sourceEvidence": [
{
"sourceUrl": "[https://services.maps.cdtfa.ca.gov/docs.html](https://services.maps.cdtfa.ca.gov/docs.html)",
"evidenceText": "CDTFA Tax Rate API includes address-based tax-rate operations.",
"citation": "([CDTFA Tax Rate API][20])"
},
{
"sourceUrl": "[https://dor.wa.gov/taxes-rates/sales-use-tax-rates](https://dor.wa.gov/taxes-rates/sales-use-tax-rates)",
"evidenceText": "Washington DOR tax-rate lookup can find rates and location codes by address, ZIP+4, or map.",
"citation": "([Washington Department of Revenue][46])"
},
{
"sourceUrl": "[https://tax.colorado.gov/GIS-info](https://tax.colorado.gov/GIS-info)",
"evidenceText": "Colorado DOR GIS identifies sales tax rates for individual addresses or map locations.",
"citation": "([Colorado Department of Revenue][28])"
},
{
"sourceUrl": "[https://comptroller.texas.gov/taxes/sales/](https://comptroller.texas.gov/taxes/sales/)",
"evidenceText": "Texas Comptroller provides address lookup and local rate tables with local codes and effective dates.",
"citation": "([Texas Comptroller][15])"
}
]
},
{
"step": 4,
"name": "join_property_tax_parcels_and_tax_areas",
"objective": "Use county assessor/treasurer or state property-tax authority records to identify APN, assessed value year, levy/tax-rate area, and taxing districts.",
"implementation": [
"Load county parcel/assessor data where machine-readable.",
"For non-machine-readable official lookups, capture input, timestamp, result, and screenshot/PDF if allowed.",
"Use state property-tax district/rate files as cross-checks.",
"Require parcel/tax-area for parcel-specific estimates."
],
"outputs": [
"APN",
"tax-rate area",
"assessed value year",
"levy district stack",
"property-tax source confidence"
],
"blockers": [
"parcel not found",
"multiple possible parcels",
"assessed year mismatch",
"private or unavailable parcel data"
],
"sourceEvidence": [
{
"sourceUrl": "[https://www.boe.ca.gov/proptaxes/proptax.htm](https://www.boe.ca.gov/proptaxes/proptax.htm)",
"evidenceText": "California BOE oversees county assessor compliance with property tax laws and regulations.",
"citation": "([California State Board of Equalization][30])"
},
{
"sourceUrl": "[https://dor.wa.gov/taxes-rates/gis-data-downloads](https://dor.wa.gov/taxes-rates/gis-data-downloads)",
"evidenceText": "Washington DOR provides property-tax district boundary downloads.",
"citation": "([Washington Department of Revenue][10])"
}
]
},
{
"step": 5,
"name": "join_tribal_and_special_land_geographies",
"objective": "Detect addresses on or near AIANNH, tribal trust, Alaska Native, and Hawaiian home land geographies and route to review.",
"implementation": [
"Load current Census AIANNH geometries.",
"Load Federal Register federally recognized tribe list and BIA directory as supporting reference data.",
"Flag sample profiles that are tribal-sensitive by name or location for manual confirmation."
],
"outputs": [
"tribalAreaFact",
"boundaryConfidence",
"adminReview if within buffer or conflicting sources"
],
"blockers": [
"boundary overlap unresolved",
"official source conflict",
"taxability source missing"
],
"sourceEvidence": [
{
"sourceUrl": "[https://catalog.data.gov/dataset/tiger-line-shapefile-current-nation-u-s-american-indian-alaska-native-native-hawaiian-area](https://catalog.data.gov/dataset/tiger-line-shapefile-current-nation-u-s-american-indian-alaska-native-native-hawaiian-area)",
"evidenceText": "AIANNH geographies include reservations, trust lands, and Hawaiian home lands.",
"citation": "([Data.gov][7])"
},
{
"sourceUrl": "[https://www.bia.gov/service/tribal-leaders-directory](https://www.bia.gov/service/tribal-leaders-directory)",
"evidenceText": "BIA Tribal Leaders Directory provides Tribe contact information and BIA service-region/agency information.",
"citation": "([Indian Affairs][47])"
}
]
},
{
"step": 6,
"name": "join_utility_territory_and_tariff_class",
"objective": "Determine utility provider, regulated status, tariff schedule, service class, and effective tariff sheets before using utility taxes, riders, or bill credits.",
"implementation": [
"Use state utility commission regulated utility lists and tariff pages.",
"Use utility tariff books only as lower-precedence supporting sources unless commission approval/source status is established.",
"Map buildingType and load facts to possible tariff classes but require user/utility bill confirmation for final class."
],
"outputs": [
"utility territory fact",
"candidate tariff class",
"tariff rule versions",
"service class review flag"
],
"blockers": [
"utility provider unknown",
"customer class not confirmed",
"tariff status pending/proposed"
],
"sourceEvidence": [
{
"sourceUrl": "[https://www.utc.wa.gov/regulated-industries/utilities/energy/energy-company-tariffs](https://www.utc.wa.gov/regulated-industries/utilities/energy/energy-company-tariffs)",
"evidenceText": "Washington UTC provides regulated energy company tariffs and rate information.",
"citation": "([WUTC][34])"
},
{
"sourceUrl": "[https://www.cpuc.ca.gov/industries-and-topics/electrical-energy/electric-rates](https://www.cpuc.ca.gov/industries-and-topics/electrical-energy/electric-rates)",
"evidenceText": "CPUC approves rates charged by California electric utilities.",
"citation": "([California Public Utilities Commission][36])"
}
]
},
{
"step": 7,
"name": "separate_sample_profile_seed_facts",
"objective": "Use prompt sample profile fields only as seed metadata and test fixtures, not as verified tax facts.",
"implementation": [
"Create sample_profile_jurisdiction_snapshot rows.",
"Map organizationType/buildingType to possible workflows only.",
"Require user/project documentation before eligibility logic uses those facts."
],
"outputs": [
"coverage test inputs",
"not eligibility facts"
],
"blockers": [
"attempt to infer tax-exempt status, owner status, or credit eligibility from sample profile metadata alone"
],
"sourceEvidence": [
{
"sourceUrl": "uploaded_prompt",
"evidenceText": "The prompt supplies sampleUserId, companyName, siteAddress, organizationType, and buildingType for coverage prioritization, not verified taxpayer/project documentation. "
}
]
},
{
"step": 8,
"name": "profile_priority_groups",
"objective": "Prioritize source adapters and regression tests by coverage density and edge-case risk in the sample profile list.",
"implementation": [
"Tier 1 coverage-density states: CA and WA.",
"Tier 2 edge-case states: AZ, OK, HI, AK, CO, TX, DC, NY.",
"Tier 3 remaining sample states: GA, IA, ID, IL, MA, ME, MI, MN, MT, NC, NM, OH, PA, SC, TN, UT, VA, VT, WI."
],
"outputs": [
"adapter roadmap",
"sample regression suite",
"coverage matrix by tax family"
],
"blockers": [
"any tier promoted as complete without tax-family coverage matrix"
],
"sourceEvidence": [
{
"sourceUrl": "uploaded_prompt",
"evidenceText": "The sample profile list contains the state/address/building-type distribution used for coverage prioritization. "
}
]
}
],
"refreshSchedulesByDatasetFamily": [
{
"datasetFamily": "federal_statutes_regulations_and_irs_guidance",
"cadence": "daily lightweight monitor during filing-season/release windows; weekly otherwise; full diff monthly",
"triggers": [
"IRS form/instruction current-year update",
"Federal Register final/proposed rule",
"Treasury/IRS notice or FAQ update",
"statutory amendment"
],
"ttlForCurrentEstimates": "14 days for active federal clean-energy credit/deduction programs; 3 days during IRS form release windows",
"refreshActions": [
"check IRS About Form pages and instructions",
"check IRS program pages",
"check legal authority sources",
"re-run federal rule cross-checks"
],
"sourceEvidence": [
{
"sourceUrl": "[https://www.irs.gov/forms-pubs/about-form-3468](https://www.irs.gov/forms-pubs/about-form-3468)",
"evidenceText": "IRS About Form pages provide current/prior forms, instructions, and post-release changes.",
"citation": "([IRS][17])"
},
{
"sourceUrl": "[https://www.irs.gov/inflation-reduction-act-of-2022](https://www.irs.gov/inflation-reduction-act-of-2022)",
"evidenceText": "IRS maintains Inflation Reduction Act tax-law implementation information.",
"citation": "([IRS][48])"
}
]
},
{
"datasetFamily": "federal_forms_and_filing_artifacts",
"cadence": "weekly; daily once a draft/current-year form is detected until final artifact is stable",
"triggers": [
"new form PDF",
"new instruction page",
"post-release change",
"registration guidance update"
],
"ttlForCurrentEstimates": "7 days during tax season or when source hash changes; 30 days otherwise",
"refreshActions": [
"compare current and prior-year artifacts",
"mark drafts as draft only",
"revalidate filing_artifacts and rule_conditions"
],
"sourceEvidence": [
{
"sourceUrl": "[https://www.irs.gov/instructions/i5695](https://www.irs.gov/instructions/i5695)",
"evidenceText": "IRS Form 5695 instructions define residential energy credit computation for the form year.",
"citation": "([IRS][23])"
},
{
"sourceUrl": "[https://www.irs.gov/instructions/i7205](https://www.irs.gov/instructions/i7205)",
"evidenceText": "IRS Form 7205 instructions define section 179D filing information.",
"citation": "([IRS][14])"
}
]
},
{
"datasetFamily": "state_sales_use_tax_rates",
"cadence": "nightly hash check for machine-readable APIs/files; quarterly full reload where state publishes quarterly changes; immediate reload when official change notice appears",
"triggers": [
"rate table update",
"address locator schema change",
"local jurisdiction update",
"new quarter effective date"
],
"ttlForCurrentEstimates": "7 days for current sales/use tax; 1 day during first and last two weeks of a quarter",
"refreshActions": [
"pull official state revenue tables/APIs",
"rerun sample addresses",
"diff combined and component rates",
"close/open rate periods"
],
"sourceEvidence": [
{
"sourceUrl": "[https://dor.wa.gov/taxes-rates/sales-use-tax-rates/local-sales-use-tax](https://dor.wa.gov/taxes-rates/sales-use-tax-rates/local-sales-use-tax)",
"evidenceText": "Washington DOR publishes quarterly local sales/use tax rates and change lists.",
"citation": "([Washington Department of Revenue][19])"
},
{
"sourceUrl": "[https://www.cdtfa.ca.gov/taxes-and-fees/sales-use-tax-rates.htm](https://www.cdtfa.ca.gov/taxes-and-fees/sales-use-tax-rates.htm)",
"evidenceText": "CDTFA publishes current and historical California sales/use tax rate resources.",
"citation": "([CDTFA][27])"
}
]
},
{
"datasetFamily": "home_rule_local_sales_use_tax",
"cadence": "monthly source check plus quarterly full review; event-driven refresh for local ordinance or state-local publication updates",
"triggers": [
"state source marks home-rule/self-collected gap",
"local ordinance/rate page update",
"new local participation in state centralized system"
],
"ttlForCurrentEstimates": "30 days when official local source is available; blocked when no official local source is identified",
"refreshActions": [
"check state revenue home-rule notes",
"check local government tax pages",
"flag incomplete local coverage"
],
"sourceEvidence": [
{
"sourceUrl": "[https://tax.colorado.gov/sales-tax-guide](https://tax.colorado.gov/sales-tax-guide)",
"evidenceText": "Colorado DOR notes self-collected home-rule city sales taxes may apply and are not administered by the Department.",
"citation": "([Colorado Department of Revenue][29])"
}
]
},
{
"datasetFamily": "property_tax_rates_levies_and_assessments",
"cadence": "annual full reload after levy/assessment certification season; monthly watch during assessment and budget adoption windows; quarterly otherwise",
"triggers": [
"new assessment roll",
"new levy/rate table",
"new tax bill year",
"parcel data update",
"taxing district boundary update"
],
"ttlForCurrentEstimates": "90 days for static prior-year records; 30 days during current levy adoption season; blocked if assessment year mismatches requested year",
"refreshActions": [
"pull assessor/treasurer/state/county files",
"reconcile parcel/APN and tax-rate area",
"diff levy/taxing district codes",
"rerun property sample profiles"
],
"sourceEvidence": [
{
"sourceUrl": "[https://dor.wa.gov/about/statistics-reports/property-tax-statistics](https://dor.wa.gov/about/statistics-reports/property-tax-statistics)",
"evidenceText": "Washington DOR publishes annual property tax statistics and levy tables by taxing district/year.",
"citation": "([Washington Department of Revenue][45])"
},
{
"sourceUrl": "[https://comptroller.texas.gov/taxes/property-tax/rates/](https://comptroller.texas.gov/taxes/property-tax/rates/)",
"evidenceText": "Texas Comptroller prepares annual taxing-unit rate lists reported by appraisal districts.",
"citation": "([Texas Comptroller][33])"
}
]
},
{
"datasetFamily": "jurisdiction_boundaries_and_geocoder_vintages",
"cadence": "annual full reload when Census TIGER/Line vintage is released; quarterly check for state tax boundary datasets; immediate refresh for state tax agency GIS updates",
"triggers": [
"new TIGER/Line release",
"new state tax GIS file",
"city annexation or special district boundary change notice",
"geocoder benchmark/vintage update"
],
"ttlForCurrentEstimates": "365 days for Census civil boundary joins if source vintage is explicit; source-specific TTL for tax agency GIS boundaries",
"refreshActions": [
"load new geometry vintage",
"re-run point-in-polygon regression for sample addresses",
"produce boundary-diff impact report"
],
"sourceEvidence": [
{
"sourceUrl": "[https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.html](https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.html)",
"evidenceText": "Census TIGER/Line publishes annual legal-boundary vintages and release dates.",
"citation": "([Census.gov][6])"
},
{
"sourceUrl": "[https://dor.wa.gov/taxes-rates/gis-data-downloads](https://dor.wa.gov/taxes-rates/gis-data-downloads)",
"evidenceText": "Washington DOR publishes GIS downloads for tax jurisdiction boundaries and address/rate data.",
"citation": "([Washington Department of Revenue][10])"
}
]
},
{
"datasetFamily": "tribal_recognition_and_special_land_boundaries",
"cadence": "annual full refresh after Federal Register federally recognized tribe list; quarterly check of BIA directory and Census AIANNH boundary data",
"triggers": [
"Federal Register recognition list update",
"BIA directory dataset update",
"new AIANNH boundary vintage",
"sample address intersects tribal/HHL boundary"
],
"ttlForCurrentEstimates": "365 days for recognition list after annual notice unless later Federal Register notice appears; 90 days for directory contact data",
"refreshActions": [
"load Federal Register recognition list",
"load BIA directory as supporting reference",
"load AIANNH boundaries",
"re-run tribal-sensitive sample profiles"
],
"sourceEvidence": [
{
"sourceUrl": "[https://www.federalregister.gov/documents/2026/01/30/2026-01899/indian-entities-recognized-by-and-eligible-to-receive-services-from-the-united-states-bureau-of](https://www.federalregister.gov/documents/2026/01/30/2026-01899/indian-entities-recognized-by-and-eligible-to-receive-services-from-the-united-states-bureau-of)",
"evidenceText": "The Federal Register notice publishes the current federally recognized tribal entity list.",
"citation": "([Federal Register][5])"
},
{
"sourceUrl": "[https://www.bia.gov/service/tribal-leaders-directory/tld-csvexcel-dataset](https://www.bia.gov/service/tribal-leaders-directory/tld-csvexcel-dataset)",
"evidenceText": "BIA directory dataset is not the official recognition list and must be used with the Federal Register notice.",
"citation": "([Indian Affairs][25])"
}
]
},
{
"datasetFamily": "utility_tariffs_rates_riders_and_net_metering",
"cadence": "weekly commission/tariff-page monitor; daily for pending/advice-letter queues in states where sample profiles depend on tariff charges; full tariff diff monthly",
"triggers": [
"new tariff filing",
"approved advice letter",
"rate-change advisory",
"tariff sheet effective date",
"utility class/rider update"
],
"ttlForCurrentEstimates": "7 days for current tariff estimates; blocked for pending-tariff-only records",
"refreshActions": [
"ingest commission tariff/advice-letter pages",
"archive tariff PDFs/sheets",
"diff rate schedules and riders",
"rerun sample profiles by utility class"
],
"sourceEvidence": [
{
"sourceUrl": "[https://www.ferc.gov/ferc-online/etariff](https://www.ferc.gov/ferc-online/etariff)",
"evidenceText": "FERC eTariff is an electronic filing system for tariffs and tariff revisions.",
"citation": "([Federal Energy Regulatory Commission][3])"
},
{
"sourceUrl": "[https://www.cpuc.ca.gov/industries-and-topics/electrical-energy/electric-rates/rate-change-advisories](https://www.cpuc.ca.gov/industries-and-topics/electrical-energy/electric-rates/rate-change-advisories)",
"evidenceText": "CPUC says utilities submit rate/tariff-change requests throughout the year.",
"citation": "([California Public Utilities Commission][22])"
}
]
},
{
"datasetFamily": "state_and_local_tax_incentives_exemptions",
"cadence": "monthly official-source watch; weekly during legislative sessions or budget enactment periods when source monitors detect changes",
"triggers": [
"state tax agency bulletin",
"statutory amendment",
"local ordinance update",
"new form/instruction",
"program cap or exhaustion notice"
],
"ttlForCurrentEstimates": "30 days for active incentives; blocked if program cap, funding availability, or application window status is unknown and material",
"refreshActions": [
"monitor official agency, statute, and form pages",
"diff eligibility conditions and application windows",
"separate taxpayer facts from geography facts"
],
"sourceEvidence": [
{
"sourceUrl": "[https://www.irs.gov/credits-and-deductions-under-the-inflation-reduction-act-of-2022](https://www.irs.gov/credits-and-deductions-under-the-inflation-reduction-act-of-2022)",
"evidenceText": "IRS federal incentive pages illustrate the need to track program-specific credits, deductions, and bonus incentives separately.",
"citation": "([IRS][12])"
}
]
},
{
"datasetFamily": "sample_profile_regression_suite",
"cadence": "run on every import batch and every source refresh that touches a sample state, tax type, geocoder, boundary, property, or utility source",
"triggers": [
"source hash change",
"parser version change",
"new sample profile",
"boundary refresh",
"tariff refresh"
],
"ttlForCurrentEstimates": "not applicable; this is a CI/regression control",
"refreshActions": [
"recompute jurisdiction stacks",
"compare prior confidence and source IDs",
"open admin review on unexplained changes"
],
"sourceEvidence": [
{
"sourceUrl": "uploaded_prompt",
"evidenceText": "The task prompt provides the sample profile set used for initial regression coverage. "
}
]
}
],
"failureAndStalenessPolicy": [
{
"id": "F001_FAIL_CLOSED_ON_MISSING_OFFICIAL_SOURCE",
"condition": "A material rule, rate, formula, jurisdiction, effective date, or filing artifact lacks an official source.",
"systemAction": "Do not import into calculable tables; keep as discovery_only; create admin_review_queue item.",
"userFacingBehavior": "Show unavailable or manual-review status; do not present a rate or eligibility conclusion."
},
{
"id": "F002_FAIL_CLOSED_ON_MISSING_EFFECTIVE_DATE",
"condition": "A calculable record lacks legalEffectiveStart or applicable taxYear/ratePeriod.",
"systemAction": "Reject promotion and emit V004 blocker.",
"userFacingBehavior": "Do not use the record for current or historical estimates."
},
{
"id": "F003_LAST_KNOWN_SOURCE_IS_NOT_CURRENT_SOURCE",
"condition": "A source refresh fails or active source TTL expires.",
"systemAction": "Preserve last imported version, mark stalenessState=stale_or_unverified, and block current estimates if the dataset family is stale-blocking.",
"userFacingBehavior": "Show source stale/manual-review state; do not silently reuse old rates as current."
},
{
"id": "F004_PARTIAL_OFFICIAL_DATA",
"condition": "Official source provides only partial rate, partial geography, or partial local-tax coverage.",
"systemAction": "Import only the source-backed partial component with coverageStatus=partial; block total estimate unless missing component is immaterial.",
"userFacingBehavior": "Show partial coverage and missing component; never present partial result as total."
},
{
"id": "F005_SOURCE_CONFLICT",
"condition": "Two or more official sources conflict on a material field.",
"systemAction": "Apply deterministic precedence if configured; otherwise enqueue admin review and block affected record.",
"userFacingBehavior": "Suppress numeric estimate or label as unresolved official-source conflict."
},
{
"id": "F006_GEOCODE_OR_BOUNDARY_AMBIGUITY",
"condition": "Address match is ambiguous, coordinate lies near boundary, or state tax locator and Census/county geography disagree.",
"systemAction": "Create low-confidence geography fact only if useful for review; block tax-family joins that depend on disputed boundary.",
"userFacingBehavior": "Request more precise address, parcel, or utility bill; otherwise show manual review."
},
{
"id": "F007_PROPERTY_PARCEL_UNAVAILABLE",
"condition": "Property-tax estimate requires parcel/tax area but official parcel/assessor data is missing, private, unavailable, or ambiguous.",
"systemAction": "Do not compute parcel-level property tax; mark propertyTaxCoverage=parcel_required.",
"userFacingBehavior": "Show no property-tax estimate and request parcel/APN or admin review."
},
{
"id": "F008_TAXPAYER_FACT_MISSING",
"condition": "Eligibility depends on taxpayer/project-specific fact not present in taxpayer_project_facts.",
"systemAction": "Set estimateConfidence to low or blocked depending on materiality; create user questionnaire requirement.",
"userFacingBehavior": "Prompt for fact; do not infer from organization name or building type."
},
{
"id": "F009_PENDING_OR_DRAFT_SOURCE",
"condition": "Only draft/proposed/pending source is available for a material rule.",
"systemAction": "Import as pending_context only if useful; exclude from current calculations.",
"userFacingBehavior": "Show pending change only in context, not as final tax result."
},
{
"id": "F010_TARIFF_CLASS_UNKNOWN",
"condition": "Utility service provider or tariff class is unknown or inferred only from building type.",
"systemAction": "Block tariff charge calculation; require utility bill, account class, or official utility confirmation.",
"userFacingBehavior": "Show utility tariff estimate unavailable until tariff class is confirmed."
},
{
"id": "F011_UNIT_OR_BASIS_GAP",
"condition": "Numeric source value lacks unit, taxable basis, formula basis, or rounding rule needed for calculation.",
"systemAction": "Do not normalize value into rate_components until resolved.",
"userFacingBehavior": "Suppress numeric output and show manual-review status."
},
{
"id": "F012_ROLLBACK_AND_REPLAY",
"condition": "Import batch is later found invalid due to parser error, source misclassification, or official-source correction.",
"systemAction": "Rollback by superseding affected rule versions, not deleting rows; replay sample profile regressions and mark estimate_runs for recalculation.",
"userFacingBehavior": "Show updated source-backed result only after revalidation; preserve audit history."
}
],
"adminReviewQueueReasons": [
{
"reasonCode": "MISSING_OFFICIAL_SOURCE",
"severity": "blocker",
"description": "Material claim has only GPT, third-party, or non-authoritative source.",
"recommendedAction": "Find official source or reject record."
},
{
"reasonCode": "SOURCE_CONFLICT",
"severity": "blocker",
"description": "Official sources disagree on rate, formula, jurisdiction, effective date, or current status.",
"recommendedAction": "Resolve using precedence model or legal/admin review; do not average."
},
{
"reasonCode": "EFFECTIVE_DATE_GAP",
"severity": "blocker",
"description": "Source has value but missing, ambiguous, proposed, or outdated effective date.",
"recommendedAction": "Find source-backed effective period or mark unavailable."
},
{
"reasonCode": "ADDRESS_AMBIGUOUS",
"severity": "review",
"description": "Geocoder returns multiple candidates, low match, coordinate boundary buffer, or conflicting state/Census/county result.",
"recommendedAction": "Request unit/APN/parcel/utility bill or manually verify official locator."
},
{
"reasonCode": "TRIBAL_OR_SPECIAL_LAND",
"severity": "review",
"description": "Address overlaps or is near tribal land, trust land, Alaska Native area, or Hawaiian home land boundary, or profile name indicates tribal government/entity.",
"recommendedAction": "Verify jurisdiction and taxability from tribal, federal, state, and local official sources."
},
{
"reasonCode": "HOME_RULE_LOCAL_TAX",
"severity": "review",
"description": "State source says local or home-rule tax may be self-collected or outside state administration.",
"recommendedAction": "Find official local source or mark total local tax unavailable."
},
{
"reasonCode": "PROPERTY_PARCEL_REQUIRED",
"severity": "blocker",
"description": "Property-tax calculation requires parcel, tax-rate area, assessment value, or levy code that was not source-backed.",
"recommendedAction": "Use county assessor/treasurer source or request APN."
},
{
"reasonCode": "UTILITY_TARIFF_CLASS_UNKNOWN",
"severity": "blocker",
"description": "Utility rate or tax depends on customer class, rate schedule, meter type, demand, or service territory not confirmed by official source or user bill.",
"recommendedAction": "Request utility bill or tariff classification evidence."
},
{
"reasonCode": "PENDING_TARIFF_OR_RATE",
"severity": "review",
"description": "Record is from pending advice letter, proposed tariff, proposed regulation, draft form, or future rate not final.",
"recommendedAction": "Track as pending context; do not use for final calculations."
},
{
"reasonCode": "TAXPAYER_FACT_REQUIRED",
"severity": "review",
"description": "Eligibility depends on nonprofit/government/tax-exempt status, ownership, renter/owner status, placed-in-service date, cost basis, or other taxpayer/project fact.",
"recommendedAction": "Collect attestation or document; do not infer from companyName or organizationType."
},
{
"reasonCode": "ELECTIVE_PAY_OR_TRANSFER_REGISTRATION",
"severity": "review",
"description": "Elective pay or transferability result depends on IRS registration, applicable entity status, credit type, or tax-year-specific filing steps.",
"recommendedAction": "Require registration/fact workflow before final claim guidance."
},
{
"reasonCode": "FORM_TAX_YEAR_MISMATCH",
"severity": "blocker",
"description": "Rule points to a form or instruction for a different tax year than the estimate or import target.",
"recommendedAction": "Load correct-year form/instruction or mark unavailable."
},
{
"reasonCode": "SOURCE_STALE",
"severity": "blocker",
"description": "A source family TTL expired or refresh failed for a stale-blocking dataset family.",
"recommendedAction": "Refresh official source; until resolved, suppress current estimate."
},
{
"reasonCode": "UNIT_OR_BASIS_AMBIGUOUS",
"severity": "blocker",
"description": "Imported number lacks unit, basis, or rounding rule needed for computation.",
"recommendedAction": "Return to source; reject if source does not support numeric use."
},
{
"reasonCode": "SAMPLE_PROFILE_REGRESSION_CHANGE",
"severity": "review",
"description": "A source refresh changes a sample profile jurisdiction stack, rate, tariff, or confidence unexpectedly.",
"recommendedAction": "Review source diff, geocoder change, or boundary update before promoting."
}
],
"firstImplementationMilestones": [
{
"id": "M0_LOCK_INPUT_CONTRACT",
"goal": "Create the import contract, validation severity taxonomy, and sample-profile fixture file from the task prompt.",
"deliverables": [
"JSON Schema definitions for source_catalog, source_documents, tax_rule_versions, rate_components, address_geography_facts, taxpayer_project_facts, validation_events",
"sample profile fixture keyed by sampleUserId",
"blocker/review/warning severity definitions"
],
"acceptanceCriteria": [
"All required top-level schema keys are represented in code.",
"Every sample profile address is present as a regression input.",
"Tests verify that GPT-only material claims fail import."
],
"sourceEvidence": [
{
"sourceUrl": "uploaded_prompt",
"evidenceText": "The task prompt supplies the required schema, official-source rules, confidence separation, and sample profile list. "
}
]
},
{
"id": "M1_BUILD_SOURCE_CATALOG_AND_PRECEDENCE_ENGINE",
"goal": "Implement source_catalog, source precedence tiers, and source_document archival before any tax data import.",
"deliverables": [
"source_catalog seed for IRS/Treasury, Census/TIGER, BIA/Federal Register, sample-state revenue agencies, property tax sources, and utility tariff sources",
"source precedence resolver",
"raw payload archival and content hashing"
],
"acceptanceCriteria": [
"A non-authoritative source cannot be linked to a promoted calculable rule.",
"Mutable URLs are archived with content hashes and retrieval timestamps.",
"eCFR, Federal Register, IRS, form, assessor, treasurer, PUC, and tariff source types are distinguishable."
],
"sourceEvidence": [
{
"sourceUrl": "[https://www.irs.gov/privacy-disclosure/tax-code-regulations-and-official-guidance](https://www.irs.gov/privacy-disclosure/tax-code-regulations-and-official-guidance)",
"evidenceText": "IRS identifies tax code, regulations, and official guidance source families.",
"citation": "([IRS][1])"
}
]
},
{
"id": "M2_IMPLEMENT_ADDRESS_AND_BOUNDARY_PIPELINE",
"goal": "Build reproducible address geocoding and boundary joins with source vintage tracking.",
"deliverables": [
"Census Geocoder adapter",
"TIGER/Line/TIGERweb boundary loader",
"AIANNH boundary loader",
"address_geography_facts table and confidence reason codes",
"sample profile geocode regression tests"
],
"acceptanceCriteria": [
"Every address result stores geocoder benchmark/vintage.",
"Boundary joins store geometry hash and vintage.",
"Addresses near boundaries or tribal/HHL areas create review events."
],
"sourceEvidence": [
{
"sourceUrl": "[https://geocoding.geo.census.gov/geocoder/Geocoding_Services_API.html](https://geocoding.geo.census.gov/geocoder/Geocoding_Services_API.html)",
"evidenceText": "Census Geocoder API uses MAF/TIGER benchmark data for geocoding.",
"citation": "([Census Geocoder][8])"
},
{
"sourceUrl": "[https://catalog.data.gov/dataset/tiger-line-shapefile-current-nation-u-s-american-indian-alaska-native-native-hawaiian-area](https://catalog.data.gov/dataset/tiger-line-shapefile-current-nation-u-s-american-indian-alaska-native-native-hawaiian-area)",
"evidenceText": "AIANNH boundary data covers tribal and Hawaiian home land geographies.",
"citation": "([Data.gov][7])"
}
]
},
{
"id": "M3_IMPLEMENT_FIRST_OFFICIAL_RATE_ADAPTERS",
"goal": "Prioritize machine-readable or official locator adapters that cover high-density sample states and reusable validation patterns.",
"deliverables": [
"California CDTFA sales/use tax adapter",
"Washington DOR sales/use tax/GIS adapter",
"Colorado DOR GIS/SUTS adapter with home-rule gap handling",
"Texas Comptroller sales/property rate adapter",
"adapter interface for remaining sample states"
],
"acceptanceCriteria": [
"Each adapter stores raw payload, endpoint/input, effective period, jurisdiction code, and component/combined rates where available.",
"Home-rule gaps are imported only as partial coverage.",
"Sample profile rates are regression-tested without inventing missing local components."
],
"sourceEvidence": [
{
"sourceUrl": "[https://services.maps.cdtfa.ca.gov/docs.html](https://services.maps.cdtfa.ca.gov/docs.html)",
"evidenceText": "CDTFA exposes a tax-rate API.",
"citation": "([CDTFA Tax Rate API][20])"
},
{
"sourceUrl": "[https://dor.wa.gov/taxes-rates/sales-use-tax-rates](https://dor.wa.gov/taxes-rates/sales-use-tax-rates)",
"evidenceText": "Washington DOR provides tax-rate lookup by address, ZIP+4, or map.",
"citation": "([Washington Department of Revenue][46])"
},
{
"sourceUrl": "[https://tax.colorado.gov/GIS-info](https://tax.colorado.gov/GIS-info)",
"evidenceText": "Colorado DOR GIS supports address/map-location sales-tax lookup.",
"citation": "([Colorado Department of Revenue][28])"
},
{
"sourceUrl": "[https://comptroller.texas.gov/taxes/sales/](https://comptroller.texas.gov/taxes/sales/)",
"evidenceText": "Texas Comptroller publishes sales-tax rate locator and local rate resources.",
"citation": "([Texas Comptroller][15])"
}
]
},
{
"id": "M4_IMPLEMENT_FEDERAL_CREDIT_AND_DEDUCTION_VALIDATORS",
"goal": "Normalize federal tax-credit/deduction rules only when legal authority, IRS program page, forms/instructions, effective dates, and taxpayer/project fact dependencies align.",
"deliverables": [
"Form 3468 validator",
"Form 5695 validator",
"Form 7205/179D validator",
"elective-pay/transferability condition model",
"taxpayer_project_facts questionnaire mapping"
],
"acceptanceCriteria": [
"Residential facts cannot be inferred from address alone.",
"179D owner/designer/allocation facts are modeled.",
"Elective-pay registration action is separate from base credit eligibility.",
"Federal source conflicts block import."
],
"sourceEvidence": [
{
"sourceUrl": "[https://www.irs.gov/instructions/i3468](https://www.irs.gov/instructions/i3468)",
"evidenceText": "Form 3468 instructions require facility/property-level credit information and computation.",
"citation": "([IRS][13])"
},
{
"sourceUrl": "[https://www.irs.gov/instructions/i5695](https://www.irs.gov/instructions/i5695)",
"evidenceText": "Form 5695 instructions are used to figure residential energy credits.",
"citation": "([IRS][23])"
},
{
"sourceUrl": "[https://www.irs.gov/instructions/i7205](https://www.irs.gov/instructions/i7205)",
"evidenceText": "Form 7205 instructions cover section 179D calculation and claim information.",
"citation": "([IRS][14])"
}
]
},
{
"id": "M5_IMPLEMENT_PROPERTY_AND_UTILITY_VALIDATION_SHELLS",
"goal": "Create shared validation shells for property-tax and utility-tariff imports before broad state/county/utility coverage is attempted.",
"deliverables": [
"parcel/APN required validation",
"tax-rate-area and levy validation",
"utility tariff schedule/service class validation",
"commission approval status model",
"tariff source archiver"
],
"acceptanceCriteria": [
"Property-tax estimate blocks without parcel/tax-area when material.",
"Utility charge estimate blocks without provider, class, tariff, and effective date.",
"Pending tariffs are excluded from current calculations."
],
"sourceEvidence": [
{
"sourceUrl": "[https://www.boe.ca.gov/proptaxes/proptax.htm](https://www.boe.ca.gov/proptaxes/proptax.htm)",
"evidenceText": "California BOE oversees property-tax assessment compliance.",
"citation": "([California State Board of Equalization][30])"
},
{
"sourceUrl": "[https://www.utc.wa.gov/regulated-industries/utilities/energy/energy-company-tariffs](https://www.utc.wa.gov/regulated-industries/utilities/energy/energy-company-tariffs)",
"evidenceText": "Washington UTC regulated energy company tariffs outline services and rates.",
"citation": "([WUTC][34])"
}
]
},
{
"id": "M6_BUILD_IMPORT_CI_AND_SAMPLE_PROFILE_REGRESSION",
"goal": "Make validation automatic in CI so every source refresh and GPT Pro import is tested against sample profiles and edge cases.",
"deliverables": [
"validation test harness",
"golden sample jurisdiction snapshots",
"source diff reports",
"estimate confidence regression",
"admin queue fixtures"
],
"acceptanceCriteria": [
"Any blocker prevents promotion.",
"Any sample profile confidence drop is explained by source diff or queued for review.",
"Coverage matrix reports per sample state and tax family."
],
"sourceEvidence": [
{
"sourceUrl": "uploaded_prompt",
"evidenceText": "The sample profiles cover the practical initial regression set across states, entity types, and building types. "
}
]
},
{
"id": "M7_ENABLE_STAGED_IMPORT_PROMOTION_AND_ROLLBACK",
"goal": "Support safe staged promotion, rollback, and superseding rule versions when a source or parser changes.",
"deliverables": [
"staging tables",
"promotion gate",
"rollback/supersede workflow",
"affected-estimate-run revalidation",
"admin waiver audit"
],
"acceptanceCriteria": [
"No imported rule is updated in place.",
"Rollback creates superseding or retirement events.",
"Affected estimates can be traced to exact ruleVersionSetHash."
],
"sourceEvidence": []
},
{
"id": "M8_PRODUCE_COVERAGE_GAP_REPORT_BEFORE_USER_RESULTS",
"goal": "Before exposing any calculation for sample profiles, publish an internal coverage report separating source coverage, geography confidence, taxpayer/project fact completeness, and estimate confidence.",
"deliverables": [
"coverageStatus by sampleUserId and tax family",
"missing official sources",
"missing taxpayer/project facts",
"review queue export",
"safe user-facing fallback messages"
],
"acceptanceCriteria": [
"No profile shows a tax amount unless all blockers are clear.",
"Partial coverage is labeled partial.",
"Source confidence and estimate confidence are displayed separately."
],
"sourceEvidence": [
{
"sourceUrl": "uploaded_prompt",
"evidenceText": "The task requires separating geography-derived facts from taxpayer/project-specific facts and separating source confidence from estimate confidence. "
}
]
}
]
}

[1]: https://www.irs.gov/privacy-disclosure/tax-code-regulations-and-official-guidance "https://www.irs.gov/privacy-disclosure/tax-code-regulations-and-official-guidance"
[2]: https://www.ecfr.gov/current/title-26 "https://www.ecfr.gov/current/title-26"
[3]: https://www.ferc.gov/ferc-online/etariff?utm_source=chatgpt.com "eTariff | Federal Energy Regulatory Commission"
[4]: https://www.census.gov/data/developers/guidance/api-user-guide.html?utm_source=chatgpt.com "Census Data API User Guide"
[5]: https://www.federalregister.gov/documents/2026/01/30/2026-01899/indian-entities-recognized-by-and-eligible-to-receive-services-from-the-united-states-bureau-of?utm_source=chatgpt.com "Indian Entities Recognized by and Eligible To Receive ..."
[6]: https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.html?utm_source=chatgpt.com "TIGER/Line Shapefiles"
[7]: https://catalog.data.gov/dataset/tiger-line-shapefile-current-nation-u-s-american-indian-alaska-native-native-hawaiian-area?from_hint=eyJxIjoiSGF3YWlpYW4gSG9tZSBMYW5kcyJ9&utm_source=chatgpt.com "TIGER/Line Shapefile, Current, Nation, U.S., American ..."
[8]: https://geocoding.geo.census.gov/geocoder/Geocoding_Services_API.html?utm_source=chatgpt.com "Census Geocoding Services API"
[9]: https://www.census.gov/programs-surveys/geography/technical-documentation/complete-technical-documentation/census-geocoder.html?utm_source=chatgpt.com "Census Geocoder Documentation"
[10]: https://dor.wa.gov/taxes-rates/gis-data-downloads?utm_source=chatgpt.com "GIS data downloads | Washington Department of Revenue"
[11]: https://www.irs.gov/credits-deductions/elective-pay-and-transferability "https://www.irs.gov/credits-deductions/elective-pay-and-transferability"
[12]: https://www.irs.gov/credits-and-deductions-under-the-inflation-reduction-act-of-2022?utm_source=chatgpt.com "Credits and deductions under the Inflation Reduction Act of ..."
[13]: https://www.irs.gov/instructions/i3468?utm_source=chatgpt.com "Instructions for Form 3468 (2025) | Internal Revenue Service"
[14]: https://www.irs.gov/instructions/i7205?utm_source=chatgpt.com "Instructions for Form 7205 (12/2025)"
[15]: https://comptroller.texas.gov/taxes/sales/?utm_source=chatgpt.com "Sales and Use Tax - Texas Comptroller"
[16]: https://www.irs.gov/forms-pubs/about-form-5695?utm_source=chatgpt.com "About Form 5695, Residential Energy Credits"
[17]: https://www.irs.gov/forms-pubs/about-form-3468?utm_source=chatgpt.com "About Form 3468, Investment Credit"
[18]: https://www.irs.gov/forms-pubs/about-form-7205?utm_source=chatgpt.com "About Form 7205, Energy Efficient Commercial Buildings ..."
[19]: https://dor.wa.gov/taxes-rates/sales-use-tax-rates/local-sales-use-tax?utm_source=chatgpt.com "Local sales & use tax | Washington Department of Revenue"
[20]: https://services.maps.cdtfa.ca.gov/docs.html?utm_source=chatgpt.com "CDTFA Tax Rate API Request Tool"
[21]: https://cdtfa.ca.gov/taxes-and-fees/rates.aspx?utm_source=chatgpt.com "California City and County Sales and Use Tax Rates - CDTFA"
[22]: https://www.cpuc.ca.gov/industries-and-topics/electrical-energy/electric-rates/rate-change-advisories "https://www.cpuc.ca.gov/industries-and-topics/electrical-energy/electric-rates/rate-change-advisories"
[23]: https://www.irs.gov/instructions/i5695?utm_source=chatgpt.com "Instructions for Form 5695 (2025) | Internal Revenue Service"
[24]: https://geocoding.geo.census.gov/geocoder/?utm_source=chatgpt.com "Census Geocoder - Census Bureau"
[25]: https://www.bia.gov/service/tribal-leaders-directory/tld-csvexcel-dataset?utm_source=chatgpt.com "Tribal Leaders Directory CSV/Excel Dataset | Indian Affairs"
[26]: https://www.irs.gov/credits-deductions/elective-pay-and-transferability-frequently-asked-questions-elective-pay "https://www.irs.gov/credits-deductions/elective-pay-and-transferability-frequently-asked-questions-elective-pay"
[27]: https://cdtfa.ca.gov/taxes-and-fees/sales-use-tax-rates.htm?utm_source=chatgpt.com "California City & County Sales & Use Tax Rate Information"
[28]: https://tax.colorado.gov/GIS-info?utm_source=chatgpt.com "Geographic Information System (GIS) Information"
[29]: https://tax.colorado.gov/sales-tax-guide?utm_source=chatgpt.com "Sales Tax Guide | Department of Revenue - Taxation"
[30]: https://www.boe.ca.gov/proptaxes/proptax.htm?utm_source=chatgpt.com "Property Tax Department - California State Board of Equalization"
[31]: https://www.boe.ca.gov/proptaxes/sprdcont.htm?utm_source=chatgpt.com "Tax Area Services Section"
[32]: https://comptroller.texas.gov/taxes/property-tax/?utm_source=chatgpt.com "Property Tax Assistance - Texas Comptroller"
[33]: https://comptroller.texas.gov/taxes/property-tax/rates/?utm_source=chatgpt.com "Tax Rates and Levies - Texas Comptroller"
[34]: https://www.utc.wa.gov/regulated-industries/utilities/energy/energy-company-tariffs?utm_source=chatgpt.com "Energy Company Tariffs"
[35]: https://iuc.iowa.gov/records-documents/utility-tariffs-filed-iuc?utm_source=chatgpt.com "Utility Tariffs | Iowa Utilities Commission"
[36]: https://www.cpuc.ca.gov/industries-and-topics/electrical-energy/electric-rates "https://www.cpuc.ca.gov/industries-and-topics/electrical-energy/electric-rates"
[37]: https://www.cpuc.ca.gov/industries-and-topics/electrical-energy/energy-utility-advice-letter-and-tariff-information "https://www.cpuc.ca.gov/industries-and-topics/electrical-energy/energy-utility-advice-letter-and-tariff-information"
[38]: https://uscode.house.gov/view.xhtml?edition=prelim&num=0&req=granuleid%3AUSC-prelim-title26-section48E "https://uscode.house.gov/view.xhtml?edition=prelim&num=0&req=granuleid%3AUSC-prelim-title26-section48E"
[39]: https://www.irs.gov/credits-deductions/clean-electricity-investment-credit "https://www.irs.gov/credits-deductions/clean-electricity-investment-credit"
[40]: https://www.irs.gov/credits-deductions/home-energy-tax-credits?utm_source=chatgpt.com "Home energy tax credits | Internal Revenue Service"
[41]: https://www.irs.gov/credits-deductions/register-for-elective-payment-or-transfer-of-credits "https://www.irs.gov/credits-deductions/register-for-elective-payment-or-transfer-of-credits"
[42]: https://www.irs.gov/credits-deductions/energy-efficient-commercial-buildings-deduction?utm_source=chatgpt.com "Energy efficient commercial buildings deduction"
[43]: https://dor.wa.gov/taxes-rates/sales-use-tax-rates/local-sales-use-tax-change-notices-previous-quarters?utm_source=chatgpt.com "Local sales & use tax change notices from previous quarters"
[44]: https://www.ferc.gov/view-individual-tariffs?utm_source=chatgpt.com "View Individual Tariffs"
[45]: https://dor.wa.gov/about/statistics-reports/property-tax-statistics?utm_source=chatgpt.com "Property tax statistics | Washington Department of Revenue"
[46]: https://dor.wa.gov/taxes-rates/sales-use-tax-rates?utm_source=chatgpt.com "Sales & use tax rates | Washington Department of Revenue"
[47]: https://www.bia.gov/service/tribal-leaders-directory?utm_source=chatgpt.com "Tribal Leaders Directory | Indian Affairs"
[48]: https://www.irs.gov/inflation-reduction-act-of-2022?utm_source=chatgpt.com "Inflation Reduction Act of 2022 | Internal Revenue Service"
