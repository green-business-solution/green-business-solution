{
"schemaVersion": "retrofi_tax_gap_repair.v1",
"inputPromptCitation": "",
"researchedAt": "2026-07-03",
"gapId": "ca_local_business_tax_edge_classes",
"status": "partially_resolved",
"confidence": "medium",
"cityRows": [
{
"city": "Burbank",
"state": "CA",
"officialSources": [
{
"title": "Business Tax",
"url": "[https://www.burbankca.gov/web/community-development/business-tax](https://www.burbankca.gov/web/community-development/business-tax)",
"owner": "City of Burbank",
"evidenceText": "Businesses doing business in Burbank must register and pay business tax. The city states that most business tax is a basic tax plus a per-employee amount, contractors are paid per job with a building permit, and rates adjust annually based on the Producer Price Index."
},
{
"title": "FY 2026-27 Adopted Fee Schedule",
"url": "[https://www.burbankca.gov/documents/d/financial-services/fy-2026-27-adopted-fee-schedule-final-revised?download=true](https://www.burbankca.gov/documents/d/financial-services/fy-2026-27-adopted-fee-schedule-final-revised?download=true)",
"owner": "City of Burbank Financial Services",
"evidenceText": "The schedule lists Business Tax Registration Fee 51.29, State Accessibility Fee 4.00, Zoning Review 77.52, manufacturing/wholesaling/retailing 130.70 plus 7.80 per employee, services 130.70 plus 12.20 per employee, professions 130.70 plus 15.85 per employee, contractors 1.00 per 1,000 valuation with 530 maximum, residential rental unit taxes, and commercial rental/leasing square-footage tax."
},
{
"title": "Burbank-Based Business License Application",
"url": "[https://www.burbankca.gov/documents/173607/1012764/Business%2BApp.pdf/71ba7809-969a-30d1-16a3-437525442457?download=true&t=1702348161337](https://www.burbankca.gov/documents/173607/1012764/Business%2BApp.pdf/71ba7809-969a-30d1-16a3-437525442457?download=true&t=1702348161337)",
"owner": "City of Burbank Community Development",
"evidenceText": "The application lists business activity checkboxes including Assembly/Manufacturing, Retail Sales, Services, Warehouse/Storage, Wholesale Sales, Medical/Dental Office, and General Office, and includes fields for base tax, employee levy, zoning review, registration/change fee, and state accessibility fee."
},
{
"title": "Commercial Rental Application",
"url": "[https://www.burbankca.gov/documents/173607/1012764/20210312%2BCommercial%2BRental%2BApplication.pdf/871eee75-3663-566e-8d14-d8c5af246c5f?download=true&t=1615572971892](https://www.burbankca.gov/documents/173607/1012764/20210312%2BCommercial%2BRental%2BApplication.pdf/871eee75-3663-566e-8d14-d8c5af246c5f?download=true&t=1615572971892)",
"owner": "City of Burbank Community Development",
"evidenceText": "Commercial rental class K03A applies to persons renting or leasing commercial, retail, office, wholesaling, or manufacturing property or space. The application asks for total building area in square feet and states each business location is taxed separately."
},
{
"title": "Contractors Business Tax",
"url": "[https://www.burbankca.gov/documents/173607/1012764/CONTRACTORS%2BBUSINESS%2BTAX%2B2023.pdf/ee239c63-1edb-4a8d-04df-6f58137a9940?t=1674838664965](https://www.burbankca.gov/documents/173607/1012764/CONTRACTORS%2BBUSINESS%2BTAX%2B2023.pdf/ee239c63-1edb-4a8d-04df-6f58137a9940?t=1674838664965)",
"owner": "City of Burbank Community Development",
"evidenceText": "Contractor business tax is calculated at 1.00 per 1,000 valuation, with a minimum of 10 and a maximum that may change each July 1."
},
{
"title": "Revenue",
"url": "[https://www.burbankca.gov/web/financial-services/revenue](https://www.burbankca.gov/web/financial-services/revenue)",
"owner": "City of Burbank Financial Services",
"evidenceText": "The city states that hotel and motel operators collect transient occupancy tax monthly and that the Burbank transient occupancy tax rate is 10 percent of rent. The page also links to T-BID filing."
},
{
"title": "Tourism Business Improvement District Renewal Materials",
"url": "[https://www.burbankca.gov/documents/d/city-clerks-office/att3-management-district-plan](https://www.burbankca.gov/documents/d/city-clerks-office/att3-management-district-plan)",
"owner": "City of Burbank City Clerk",
"evidenceText": "The management district plan describes a Burbank Tourism Business Improvement District assessment on lodging businesses with 25 or more rooms, using gross short-term sleeping room rental revenue, with an annual rate shown as 1.75 percent and authority to vary within a stated range during the term."
}
],
"calculationRows": [
{
"classKey": "burbank_mfg_wholesale_retail",
"displayName": "Manufacturing, wholesaling, and retailing business license tax",
"formulaKind": "base_plus_employee",
"formulaParameters": {
"currency": "USD",
"baseTaxPerBusinessLocation": 130.7,
"employeeLevyPerEmployee": 7.8,
"period": "annual",
"expression": "businessLocationCount * 130.70 + employeeCount * 7.80"
},
"requiredInputs": [
"businessLocationCount",
"employeeCount",
"cityClassificationOrNAICS"
],
"effectiveStartDate": "2026-07-01",
"runtimeReady": true,
"doNotIncludeByDefaultReasons": [
"Use only after the activity is classified by the city as manufacturing, wholesaling, or retailing.",
"Do not include penalties or late fees unless filingLate is an explicit input."
]
},
{
"classKey": "burbank_business_personal_services_entertainment",
"displayName": "Business services, personal services, motion picture, television, recreation, or entertainment business license tax",
"formulaKind": "base_plus_employee",
"formulaParameters": {
"currency": "USD",
"baseTaxPerBusinessLocation": 130.7,
"employeeLevyPerEmployee": 12.2,
"period": "annual",
"expression": "businessLocationCount * 130.70 + employeeCount * 12.20"
},
"requiredInputs": [
"businessLocationCount",
"employeeCount",
"cityClassificationOrNAICS"
],
"effectiveStartDate": "2026-07-01",
"runtimeReady": true,
"doNotIncludeByDefaultReasons": [
"Use only after the activity is classified by the city as a service, entertainment, recreation, motion-picture, or television class.",
"Do not include penalties or late fees unless filingLate is an explicit input."
]
},
{
"classKey": "burbank_professions_related_occupations",
"displayName": "Professions and related occupations business license tax",
"formulaKind": "base_plus_employee",
"formulaParameters": {
"currency": "USD",
"baseTaxPerBusinessLocation": 130.7,
"employeeLevyPerEmployee": 15.85,
"period": "annual",
"expression": "businessLocationCount * 130.70 + employeeCount * 15.85"
},
"requiredInputs": [
"businessLocationCount",
"employeeCount",
"cityClassificationOrNAICS"
],
"effectiveStartDate": "2026-07-01",
"runtimeReady": true,
"doNotIncludeByDefaultReasons": [
"Use only after the activity is classified by the city as a profession or related occupation.",
"Do not include penalties or late fees unless filingLate is an explicit input."
]
},
{
"classKey": "burbank_unclassified_business",
"displayName": "Unclassified business license tax",
"formulaKind": "base_plus_employee_requires_classification_review",
"formulaParameters": {
"currency": "USD",
"baseTaxPerBusinessLocation": 130.7,
"employeeLevyPerEmployee": 12.2,
"period": "annual",
"expression": "businessLocationCount * 130.70 + employeeCount * 12.20"
},
"requiredInputs": [
"businessLocationCount",
"employeeCount",
"cityClassificationReview"
],
"effectiveStartDate": "2026-07-01",
"runtimeReady": false,
"doNotIncludeByDefaultReasons": [
"Unclassified row should be used only after city classification review confirms no more specific class applies.",
"Do not include penalties or late fees unless filingLate is an explicit input."
]
},
{
"classKey": "burbank_out_of_town_contractor_per_job",
"displayName": "Contractor business tax per permitted job",
"formulaKind": "construction_valuation_rate_with_min_max",
"formulaParameters": {
"currency": "USD",
"ratePerThousandDollarsOfValuation": 1.0,
"minimumTax": 10.0,
"maximumTax": 530.0,
"period": "perJobOrPermit",
"expression": "min(max(constructionValuation / 1000 * 1.00, 10.00), 530.00)"
},
"requiredInputs": [
"constructionValuation",
"buildingPermitOrJobIdentifier"
],
"effectiveStartDate": "2026-07-01",
"runtimeReady": true,
"doNotIncludeByDefaultReasons": [
"Use for contractor jobs tied to a Burbank building permit, not for non-contractor business classifications.",
"Do not include penalties or late fees unless filingLate is an explicit input."
]
},
{
"classKey": "burbank_residential_rental_apartment_3_plus",
"displayName": "Residential rental apartments or bungalows, three or more units",
"formulaKind": "unit_rate",
"formulaParameters": {
"currency": "USD",
"unitRate": 13.05,
"minimumUnitCount": 3,
"period": "annual",
"expression": "rentalUnitCount * 13.05"
},
"requiredInputs": [
"rentalUnitCount"
],
"effectiveStartDate": "2026-07-01",
"runtimeReady": true,
"doNotIncludeByDefaultReasons": [
"Include only when the taxpayer operates residential rental units in Burbank.",
"Do not include penalties or late fees unless filingLate is an explicit input."
]
},
{
"classKey": "burbank_hotel_motel_business_tax_unit",
"displayName": "Hotel or motel business license unit tax",
"formulaKind": "unit_rate",
"formulaParameters": {
"currency": "USD",
"unitRate": 26.15,
"unitName": "roomOrUnit",
"period": "annual",
"expression": "roomOrUnitCount * 26.15"
},
"requiredInputs": [
"roomOrUnitCount"
],
"effectiveStartDate": "2026-07-01",
"runtimeReady": true,
"doNotIncludeByDefaultReasons": [
"Include only for hotel or motel operations.",
"Transient occupancy tax and T-BID are separate add-ons and should not be inferred for non-lodging businesses.",
"Do not include penalties or late fees unless filingLate is an explicit input."
]
},
{
"classKey": "burbank_commercial_rental_leasing",
"displayName": "Commercial rental or leasing business license tax",
"formulaKind": "area_tiered_base_plus_increment",
"formulaParameters": {
"currency": "USD",
"baseTaxFirstSquareFeet": 5000,
"baseTax": 130.7,
"incrementTax": 2.6,
"incrementSquareFeet": 100,
"rounding": "ceil_overage_to_next_100_square_feet",
"period": "annual",
"expression": "130.70 + 2.60 * ceil(max(grossLeasedSquareFeet - 5000, 0) / 100)"
},
"requiredInputs": [
"grossLeasedSquareFeet",
"businessLocationCount"
],
"effectiveStartDate": "2026-07-01",
"runtimeReady": true,
"doNotIncludeByDefaultReasons": [
"Use only for persons renting or leasing commercial, retail, office, wholesaling, or manufacturing property or space.",
"Each business location is taxed separately.",
"Do not include penalties or late fees unless filingLate is an explicit input."
]
},
{
"classKey": "burbank_state_accessibility_fee",
"displayName": "State accessibility fee",
"formulaKind": "flat_fee",
"formulaParameters": {
"currency": "USD",
"amount": 4.0,
"period": "perLicenseIssuanceOrRenewal"
},
"requiredInputs": [
"licenseIssuanceOrRenewal"
],
"effectiveStartDate": "2026-07-01",
"runtimeReady": true,
"doNotIncludeByDefaultReasons": [
"Include only when estimating a license issuance or renewal bill."
]
},
{
"classKey": "burbank_registration_change_fee",
"displayName": "Business tax registration or change fee",
"formulaKind": "flat_fee",
"formulaParameters": {
"currency": "USD",
"amount": 51.29,
"period": "perRegistrationOrChange"
},
"requiredInputs": [
"newRegistrationOrChange"
],
"effectiveStartDate": "2026-07-01",
"runtimeReady": true,
"doNotIncludeByDefaultReasons": [
"Do not include in recurring renewal-only estimates unless the user indicates a new registration or account change."
]
},
{
"classKey": "burbank_zoning_review_fee",
"displayName": "Zoning review fee",
"formulaKind": "flat_fee",
"formulaParameters": {
"currency": "USD",
"amount": 77.52,
"period": "perZoningReview"
},
"requiredInputs": [
"requiresZoningReview"
],
"effectiveStartDate": "2026-07-01",
"runtimeReady": true,
"doNotIncludeByDefaultReasons": [
"Do not include unless the business is Burbank-based or otherwise requires zoning review."
]
},
{
"classKey": "burbank_tot_lodging",
"displayName": "Transient occupancy tax",
"formulaKind": "percentage_of_taxable_rent",
"formulaParameters": {
"ratePercent": 10.0,
"taxBase": "taxableRoomRent",
"period": "monthlyRemittance"
},
"requiredInputs": [
"taxableRoomRent",
"transientOccupancyIndicator"
],
"effectiveStartDate": null,
"runtimeReady": true,
"doNotIncludeByDefaultReasons": [
"Include only for hotel, motel, or other taxable lodging operations.",
"This is a pass-through occupancy tax and not a default business license estimate row."
]
},
{
"classKey": "burbank_tbid_lodging_assessment",
"displayName": "Tourism Business Improvement District lodging assessment",
"formulaKind": "percentage_of_lodging_revenue_requires_account_review",
"formulaParameters": {
"defaultRatePercentFromManagementDistrictPlan": 1.75,
"authorizedRateRangePercent": {
"minimum": 0.5,
"maximum": 3.0
},
"taxBase": "grossShortTermSleepingRoomRentalRevenue",
"appliesTo": "lodgingBusinessesWith25OrMoreRooms",
"exemptionsOrExclusions": [
"staysLongerThan30ConsecutiveDays",
"certainGovernmentStays"
],
"period": "monthlyCollection"
},
"requiredInputs": [
"roomCount",
"grossShortTermSleepingRoomRentalRevenue",
"currentTBIDRateOrAccountStatement",
"lodgingStayExemptionDetails"
],
"effectiveStartDate": "2026-07-01",
"runtimeReady": false,
"doNotIncludeByDefaultReasons": [
"Management district materials allow rate changes within a range, so the current hotel account or city return should be checked before default inclusion.",
"Include only for lodging businesses that meet the district criteria."
]
}
],
"workflowId": "ca_burbank_business_license_tax"
},
{
"city": "Pasadena",
"state": "CA",
"officialSources": [
{
"title": "Business Licenses",
"url": "[https://www.cityofpasadena.net/finance/licenses/business-licenses/](https://www.cityofpasadena.net/finance/licenses/business-licenses/)",
"owner": "City of Pasadena Finance Department",
"evidenceText": "Pasadena states that most business license tax is computed as a flat rate plus employees, separate licenses are required for separate places or multiple activities, rental property of three or more units requires a business tax permit, and South Lake BID businesses may be assessed an annual fee based on employees, business type, and location."
},
{
"title": "FY 2027 Schedule of Taxes, Fees and Charges Adopted",
"url": "[https://www.cityofpasadena.net/finance/wp-content/uploads/sites/27/FY-2027-Schedule-of-Taxes-Fees-and-Charges-Adopted.pdf](https://www.cityofpasadena.net/finance/wp-content/uploads/sites/27/FY-2027-Schedule-of-Taxes-Fees-and-Charges-Adopted.pdf)",
"owner": "City of Pasadena Finance Department",
"evidenceText": "The adopted schedule lists business license maximum tax 82,311.66; general business 215.36 plus 42.73 per employee over one; professional business 571.98 for first professional, 285.24 each additional professional, and 42.73 each nonprofessional employee; service business 215.36 plus 42.73 per employee over one; contractors by subclass; rental accommodation rates; nonresidential building square-footage rates; and transient occupancy tax 12.11 percent."
},
{
"title": "Commercial Building Business Application",
"url": "[https://www.cityofpasadena.net/finance/wp-content/uploads/sites/27/commercial-bldg-business-application.pdf](https://www.cityofpasadena.net/finance/wp-content/uploads/sites/27/commercial-bldg-business-application.pdf)",
"owner": "City of Pasadena Finance Department",
"evidenceText": "The commercial building application applies to nonresidential buildings including office buildings, warehouses, commercial space, and industrial space used for purposes other than dwelling, sleeping, or lodging. It requires gross square footage, treats each building with a separate address as a separate business, and notes a 50 percent owner-occupied credit on the base tax."
},
{
"title": "Rental Accommodations Application",
"url": "[https://www.cityofpasadena.net/finance/wp-content/uploads/sites/27/Rental-Accommodations.pdf](https://www.cityofpasadena.net/finance/wp-content/uploads/sites/27/Rental-Accommodations.pdf)",
"owner": "City of Pasadena Finance Department",
"evidenceText": "The rental accommodations application uses the first-three-rental-accommodations amount plus an additional amount for each accommodation over three, with separate license treatment per place."
},
{
"title": "Short-Term Rental Regulations",
"url": "[https://www.cityofpasadena.net/planning/short-term-rental-regulations/](https://www.cityofpasadena.net/planning/short-term-rental-regulations/)",
"owner": "City of Pasadena Planning and Community Development",
"evidenceText": "The city states that Pasadena TBID applies to lodging businesses including short-term rentals, that the TBID rate is 4.89 percent in years two through ten from July 1, 2024 through June 30, 2033, and that Airbnb and VRBO collect TOT and TBID automatically for Pasadena booking-platform properties beginning April 1, 2026 while hosts still submit quarterly reports."
}
],
"calculationRows": [
{
"classKey": "pasadena_general_business",
"displayName": "General business license tax",
"formulaKind": "base_plus_employee_over_one_with_cap",
"formulaParameters": {
"currency": "USD",
"baseTax": 215.36,
"employeeTaxOverOne": 42.73,
"maximumTax": 82311.66,
"period": "annual",
"expression": "min(215.36 + 42.73 * max(employeeCount - 1, 0), 82311.66)"
},
"requiredInputs": [
"employeeCount",
"cityClassificationReview"
],
"effectiveStartDate": "2026-07-01",
"runtimeReady": true,
"doNotIncludeByDefaultReasons": [
"Manufacturing, retail, wholesale, warehouse, office, and other activities should be mapped to this row only when Pasadena classification review confirms the general business class.",
"Do not include penalties or late fees unless filingLate is an explicit input."
]
},
{
"classKey": "pasadena_service_business",
"displayName": "Service business license tax",
"formulaKind": "base_plus_employee_over_one_with_cap",
"formulaParameters": {
"currency": "USD",
"baseTax": 215.36,
"employeeTaxOverOne": 42.73,
"maximumTax": 82311.66,
"period": "annual",
"expression": "min(215.36 + 42.73 * max(employeeCount - 1, 0), 82311.66)"
},
"requiredInputs": [
"employeeCount",
"cityClassificationReview"
],
"effectiveStartDate": "2026-07-01",
"runtimeReady": true,
"doNotIncludeByDefaultReasons": [
"Use only after the activity is classified by Pasadena as a service business.",
"Do not include penalties or late fees unless filingLate is an explicit input."
]
},
{
"classKey": "pasadena_professional_business",
"displayName": "Professional business license tax",
"formulaKind": "professional_principal_plus_employee_with_cap",
"formulaParameters": {
"currency": "USD",
"firstProfessionalTax": 571.98,
"additionalProfessionalTax": 285.24,
"nonProfessionalEmployeeTax": 42.73,
"maximumTax": 82311.66,
"period": "annual",
"expression": "min(571.98 + 285.24 * max(professionalCount - 1, 0) + 42.73 * nonProfessionalEmployeeCount, 82311.66)"
},
"requiredInputs": [
"professionalCount",
"nonProfessionalEmployeeCount",
"cityClassificationReview"
],
"effectiveStartDate": "2026-07-01",
"runtimeReady": true,
"doNotIncludeByDefaultReasons": [
"Use only for professional business classifications.",
"Do not include penalties or late fees unless filingLate is an explicit input."
]
},
{
"classKey": "pasadena_take_out_service_business",
"displayName": "Business with take-out service license tax",
"formulaKind": "base_plus_employee_over_one_with_cap",
"formulaParameters": {
"currency": "USD",
"baseTax": 429.3,
"employeeTaxOverOne": 85.54,
"maximumTax": 82311.66,
"period": "annual",
"expression": "min(429.30 + 85.54 * max(employeeCount - 1, 0), 82311.66)"
},
"requiredInputs": [
"employeeCount",
"cityClassificationReview"
],
"effectiveStartDate": "2026-07-01",
"runtimeReady": true,
"doNotIncludeByDefaultReasons": [
"Include only when the business is classified as having take-out service.",
"Do not include penalties or late fees unless filingLate is an explicit input."
]
},
{
"classKey": "pasadena_retail_wholesale_delivery",
"displayName": "Retail and wholesale delivery business license tax",
"formulaKind": "flat_fee",
"formulaParameters": {
"currency": "USD",
"amount": 288.32,
"period": "annual"
},
"requiredInputs": [
"isRetailWholesaleDeliveryActivity"
],
"effectiveStartDate": "2026-07-01",
"runtimeReady": true,
"doNotIncludeByDefaultReasons": [
"Include only for retail or wholesale delivery activity specifically classified under this row.",
"Do not include penalties or late fees unless filingLate is an explicit input."
]
},
{
"classKey": "pasadena_contractors",
"displayName": "Contractor business license tax",
"formulaKind": "flat_fee_by_subclass_with_term_multiplier",
"formulaParameters": {
"currency": "USD",
"annualRates": {
"generalEngineeringContractor": 1723.68,
"generalBuildingContractor": 1149.56,
"specialtyContractor": 862.55,
"otherBuildingTradesman": 862.55
},
"termMultipliers": {
"annual": 1.0,
"sixMonth": 0.6,
"threeMonth": 0.3
},
"expression": "annualRates[contractorSubclass] * termMultipliers[licenseTerm]"
},
"requiredInputs": [
"contractorSubclass",
"licenseTerm"
],
"effectiveStartDate": "2026-07-01",
"runtimeReady": true,
"doNotIncludeByDefaultReasons": [
"Use only for contractor classifications.",
"Do not include penalties or late fees unless filingLate is an explicit input."
]
},
{
"classKey": "pasadena_rental_accommodations_hotel_roominghouse",
"displayName": "Rental accommodations, hotel, roominghouse, or similar lodging business license tax",
"formulaKind": "first_units_plus_additional_units",
"formulaParameters": {
"currency": "USD",
"firstUnitBlockCount": 3,
"firstUnitBlockTax": 211.8,
"additionalUnitTax": 22.85,
"period": "annual",
"expression": "211.80 + 22.85 * max(rentalAccommodationCount - 3, 0)"
},
"requiredInputs": [
"rentalAccommodationCount"
],
"effectiveStartDate": "2026-07-01",
"runtimeReady": true,
"doNotIncludeByDefaultReasons": [
"Include only for rental accommodation, hotel, roominghouse, or similar lodging classifications.",
"Do not include penalties or late fees unless filingLate is an explicit input."
]
},
{
"classKey": "pasadena_nonresidential_building_commercial_landlord",
"displayName": "Nonresidential building or commercial landlord business license tax",
"formulaKind": "square_footage_tiered_with_owner_occupied_credit",
"formulaParameters": {
"currency": "USD",
"under1000SquareFeet": {
"regularTax": 116.02,
"ownerOccupiedBaseCreditTax": 57.27
},
"first1000SquareFeet": {
"regularTax": 230.67,
"ownerOccupiedBaseCreditTax": 114.57
},
"additional1000SquareFeetTax": 22.85,
"rounding": "ceil_additional_square_feet_to_next_1000",
"period": "annual",
"regularExpression": "grossSquareFeet < 1000 ? 116.02 : 230.67 + 22.85 * ceil(max(grossSquareFeet - 1000, 0) / 1000)",
"ownerOccupiedExpression": "grossSquareFeet < 1000 ? 57.27 : 114.57 + 22.85 * ceil(max(grossSquareFeet - 1000, 0) / 1000)"
},
"requiredInputs": [
"grossSquareFeet",
"ownerOccupiedEligible",
"buildingAddressCount"
],
"effectiveStartDate": "2026-07-01",
"runtimeReady": true,
"doNotIncludeByDefaultReasons": [
"Use only for nonresidential building activity including office buildings, warehouses, commercial space, and industrial space used for purposes other than dwelling, sleeping, or lodging.",
"Surface lots and parking structures are excluded under the city application.",
"Each building with a separate address is a separate business.",
"Do not include penalties or late fees unless filingLate is an explicit input."
]
},
{
"classKey": "pasadena_tot_lodging",
"displayName": "Transient occupancy tax",
"formulaKind": "percentage_of_taxable_receipts",
"formulaParameters": {
"ratePercent": 12.11,
"taxBase": "taxableLodgingReceipts",
"period": "remittancePeriod"
},
"requiredInputs": [
"taxableLodgingReceipts",
"transientOccupancyIndicator"
],
"effectiveStartDate": "2026-07-01",
"runtimeReady": true,
"doNotIncludeByDefaultReasons": [
"Include only for lodging or short-term rental operations.",
"This is a pass-through occupancy tax and not a default business license estimate row."
]
},
{
"classKey": "pasadena_tbid_lodging_assessment",
"displayName": "Pasadena Tourism Business Improvement District lodging assessment",
"formulaKind": "percentage_of_taxable_lodging_receipts",
"formulaParameters": {
"currentRatePercent": 4.89,
"historicalYearOneRatePercent": 3.89,
"currentRatePeriod": "2024-07-01 through 2033-06-30",
"taxBase": "taxableLodgingReceipts",
"includedCharges": [
"nightlyOrWeeklyRent",
"cleaningFees",
"petFees",
"internetCharges",
"lateCheckoutFees",
"extraPersonFees",
"resortFees"
],
"platformCollectionNote": "Airbnb and VRBO collect TOT and TBID automatically for Pasadena booking-platform properties beginning 2026-04-01, but hosts still submit quarterly reports.",
"expression": "taxableLodgingReceipts * 0.0489"
},
"requiredInputs": [
"taxableLodgingReceipts",
"lodgingBusinessOrShortTermRentalIndicator",
"platformCollectionIndicator"
],
"effectiveStartDate": "2024-07-01",
"runtimeReady": true,
"doNotIncludeByDefaultReasons": [
"Include only for lodging businesses or short-term rentals.",
"Do not double-count amounts collected and remitted by a booking platform."
]
},
{
"classKey": "pasadena_south_lake_bid_assessment",
"displayName": "South Lake Business Improvement District assessment",
"formulaKind": "requires_bid_schedule_or_account_statement",
"formulaParameters": {
"assessmentFactors": [
"businessLocationWithinDistrict",
"numberOfEmployees",
"typeOfBusiness",
"location"
],
"period": "annual"
},
"requiredInputs": [
"businessAddress",
"southLakeDistrictIndicator",
"employeeCount",
"businessType",
"accountRenewalStatementOrDistrictAssessmentSchedule"
],
"effectiveStartDate": null,
"runtimeReady": false,
"doNotIncludeByDefaultReasons": [
"The city page identifies assessment factors but does not provide a normalized citywide formula for all businesses.",
"Require renewal statement, district schedule, or city classification review before estimating."
]
},
{
"classKey": "pasadena_state_accessibility_fee_unconfirmed",
"displayName": "State accessibility fee, Pasadena account verification required",
"formulaKind": "requires_account_statement_or_city_confirmation",
"formulaParameters": {
"expectedStateFeeType": "SB-1186 or successor state accessibility fee",
"amount": null
},
"requiredInputs": [
"licenseIssuanceOrRenewal",
"pasadenaRenewalStatementOrCityConfirmation"
],
"effectiveStartDate": null,
"runtimeReady": false,
"doNotIncludeByDefaultReasons": [
"A current official Pasadena business-license or adopted tax schedule row for the state accessibility fee was not located in the reviewed official sources.",
"Do not default a fee amount without a Pasadena renewal statement or city confirmation."
]
}
],
"workflowId": "ca_pasadena_business_license_tax"
},
{
"city": "Anaheim",
"state": "CA",
"officialSources": [
{
"title": "Business License",
"url": "[https://www.anaheim.net/494/Business-License](https://www.anaheim.net/494/Business-License)",
"owner": "City of Anaheim",
"evidenceText": "Anaheim states that a business license is required for businesses located in Anaheim and for businesses not physically located in Anaheim that conduct business in Anaheim."
},
{
"title": "Business License Application, In-Town",
"url": "[https://www.anaheim.net/DocumentCenter/View/5389/Business-License-Application-In-Town?bidId=](https://www.anaheim.net/DocumentCenter/View/5389/Business-License-Application-In-Town?bidId=)",
"owner": "City of Anaheim",
"evidenceText": "The application requests employee count for all businesses; estimated gross receipts for retail, wholesale, manufacturing, entertainment venues, telecommunications, motel, hotel, and miscellaneous sales; professional owners and employees; total square footage for commercial leasing, warehousing, and storage; and units for apartments and motel/hotel activity."
},
{
"title": "Anaheim Municipal Code Section 3.08.010, Gross Receipts Tax",
"url": "[https://codelibrary.amlegal.com/codes/anaheim/latest/anaheim_ca/0-0-0-54663](https://codelibrary.amlegal.com/codes/anaheim/latest/anaheim_ca/0-0-0-54663)",
"owner": "City of Anaheim via American Legal Publishing",
"evidenceText": "Manufacturing, wholesaling, and retailing businesses with gross receipts under 100,000 pay 40.00; otherwise manufacturing, wholesaling, and retailing pay 0.095 per 1,000 gross receipts or 60.00, whichever is greater. Hotel, motel, transient occupancy facilities, recreation, and entertainment pay 0.19 per 1,000 gross receipts or 60.00, whichever is greater, after the under-100,000 flat amount."
},
{
"title": "Anaheim Municipal Code Section 3.12.010, Professions",
"url": "[https://codelibrary.amlegal.com/codes/anaheim/latest/anaheim_ca/0-0-0-54692](https://codelibrary.amlegal.com/codes/anaheim/latest/anaheim_ca/0-0-0-54692)",
"owner": "City of Anaheim via American Legal Publishing",
"evidenceText": "Professional businesses pay 135.00 for the first practicing professional principal, 150.00 for each additional principal, 75.00 for each professional independent contractor or salaried professional employee, and 10.00 for each other employee."
},
{
"title": "Anaheim Municipal Code Section 3.16.010, Services",
"url": "[https://codelibrary.amlegal.com/codes/anaheim/latest/anaheim_ca/0-0-0-54706](https://codelibrary.amlegal.com/codes/anaheim/latest/anaheim_ca/0-0-0-54706)",
"owner": "City of Anaheim via American Legal Publishing",
"evidenceText": "Service businesses pay 68.00 plus 10.00 per employee based on average employee count."
},
{
"title": "Anaheim Municipal Code Section 3.24.010, Contractors",
"url": "[https://codelibrary.amlegal.com/codes/anaheim/latest/anaheim_ca/0-0-0-54743](https://codelibrary.amlegal.com/codes/anaheim/latest/anaheim_ca/0-0-0-54743)",
"owner": "City of Anaheim via American Legal Publishing",
"evidenceText": "General or engineering contractors pay 125.00 per year and subcontractors or specialty contractors pay 100.00 per year. The section applies to fixed-location city contractors and outside contractors coming into the city."
},
{
"title": "Anaheim Municipal Code Section 3.28.020, Nonresidential Property",
"url": "[https://codelibrary.amlegal.com/codes/anaheim/latest/anaheim_ca/0-0-0-54752](https://codelibrary.amlegal.com/codes/anaheim/latest/anaheim_ca/0-0-0-54752)",
"owner": "City of Anaheim via American Legal Publishing",
"evidenceText": "Rental of nonresidential property is taxed at 0.015 per square foot of gross rental space and includes office buildings, warehouses, commercial and industrial spaces rented to tenants, and persons whose primary business activity is warehousing or storage."
},
{
"title": "Anaheim Municipal Code Section 3.28.010, Apartments",
"url": "[https://codelibrary.amlegal.com/codes/anaheim/latest/anaheim_ca/0-0-0-54750](https://codelibrary.amlegal.com/codes/anaheim/latest/anaheim_ca/0-0-0-54750)",
"owner": "City of Anaheim via American Legal Publishing",
"evidenceText": "Apartment houses with five or more apartments pay 5.00 per apartment annually."
},
{
"title": "Transient Occupancy Tax",
"url": "[https://www.anaheim.net/575/Transient-Occupancy-Tax](https://www.anaheim.net/575/Transient-Occupancy-Tax)",
"owner": "City of Anaheim",
"evidenceText": "Each transient is subject to transient occupancy tax equal to 15 percent of the rent charged by the operator."
},
{
"title": "Anaheim Tourism Improvement District",
"url": "[https://www.anaheim.net/565/Anaheim-Tourism-Improvement-District-ATI](https://www.anaheim.net/565/Anaheim-Tourism-Improvement-District-ATI)",
"owner": "City of Anaheim",
"evidenceText": "Anaheim states that member hotels assess 2 percent on hotel stays for the Anaheim Tourism Improvement District and that the 2 percent rate remains unchanged."
},
{
"title": "CA Disability Access and Education Fund Fee",
"url": "[https://www.anaheim.net/5201/CA-Disability-Access-and-Education-Fund-](https://www.anaheim.net/5201/CA-Disability-Access-and-Education-Fund-)",
"owner": "City of Anaheim",
"evidenceText": "The city states that the California Disability Access and Education Fund fee increased from 1.00 to 4.00 effective January 1, 2018 under AB 1379 and SB 1186."
},
{
"title": "Anaheim Municipal Code Section 3.04.145, Application Processing Charge",
"url": "[https://codelibrary.amlegal.com/codes/anaheim/latest/anaheim_ca/0-0-0-54561](https://codelibrary.amlegal.com/codes/anaheim/latest/anaheim_ca/0-0-0-54561)",
"owner": "City of Anaheim via American Legal Publishing",
"evidenceText": "Anaheim requires a processing charge for each initial or renewed license, in addition to any applicable business license tax, and states that categories are set by resolution."
}
],
"calculationRows": [
{
"classKey": "anaheim_manufacturing_wholesale_gross_receipts",
"displayName": "Manufacturing or wholesaling gross receipts business license tax",
"formulaKind": "gross_receipts_threshold_flat_or_rate_minimum",
"formulaParameters": {
"currency": "USD",
"thresholdGrossReceipts": 100000,
"flatTaxBelowThreshold": 40.0,
"ratePerThousandGrossReceipts": 0.095,
"minimumTaxAtOrAboveThreshold": 60.0,
"period": "annual",
"expression": "annualGrossReceipts < 100000 ? 40.00 : max(annualGrossReceipts / 1000 * 0.095, 60.00)"
},
"requiredInputs": [
"annualGrossReceipts",
"cityClassificationReview"
],
"effectiveStartDate": null,
"runtimeReady": true,
"doNotIncludeByDefaultReasons": [
"Use only after city classification confirms manufacturing or wholesaling.",
"Do not include penalties or late fees unless filingLate is an explicit input."
]
},
{
"classKey": "anaheim_retailing_gross_receipts",
"displayName": "Retailing gross receipts business license tax",
"formulaKind": "gross_receipts_threshold_flat_or_rate_minimum",
"formulaParameters": {
"currency": "USD",
"thresholdGrossReceipts": 100000,
"flatTaxBelowThreshold": 40.0,
"ratePerThousandGrossReceipts": 0.095,
"minimumTaxAtOrAboveThreshold": 60.0,
"period": "annual",
"expression": "annualGrossReceipts < 100000 ? 40.00 : max(annualGrossReceipts / 1000 * 0.095, 60.00)"
},
"requiredInputs": [
"annualGrossReceipts",
"cityClassificationReview"
],
"effectiveStartDate": null,
"runtimeReady": true,
"doNotIncludeByDefaultReasons": [
"Use only after city classification confirms retailing.",
"Do not include penalties or late fees unless filingLate is an explicit input."
]
},
{
"classKey": "anaheim_miscellaneous_gross_receipts",
"displayName": "Miscellaneous business not specifically taxed gross receipts tax",
"formulaKind": "gross_receipts_threshold_flat_or_rate_minimum_requires_classification_review",
"formulaParameters": {
"currency": "USD",
"thresholdGrossReceipts": 100000,
"flatTaxBelowThreshold": 40.0,
"ratePerThousandGrossReceipts": 0.095,
"minimumTaxAtOrAboveThreshold": 60.0,
"period": "annual",
"expression": "annualGrossReceipts < 100000 ? 40.00 : max(annualGrossReceipts / 1000 * 0.095, 60.00)"
},
"requiredInputs": [
"annualGrossReceipts",
"cityClassificationReview"
],
"effectiveStartDate": null,
"runtimeReady": false,
"doNotIncludeByDefaultReasons": [
"Use only when Anaheim confirms the business is not specifically taxed under another class.",
"Do not include penalties or late fees unless filingLate is an explicit input."
]
},
{
"classKey": "anaheim_hotel_motel_business_license_gross_receipts",
"displayName": "Hotel, motel, or transient occupancy facility business license tax",
"formulaKind": "gross_receipts_threshold_flat_or_rate_minimum",
"formulaParameters": {
"currency": "USD",
"thresholdGrossReceipts": 100000,
"flatTaxBelowThreshold": 40.0,
"ratePerThousandGrossReceipts": 0.19,
"minimumTaxAtOrAboveThreshold": 60.0,
"period": "annual",
"expression": "annualGrossReceipts < 100000 ? 40.00 : max(annualGrossReceipts / 1000 * 0.19, 60.00)"
},
"requiredInputs": [
"annualGrossReceipts",
"cityClassificationReview"
],
"effectiveStartDate": null,
"runtimeReady": true,
"doNotIncludeByDefaultReasons": [
"This business license tax is separate from transient occupancy tax and ATID.",
"Include only for hotel, motel, or transient occupancy facility classifications.",
"Do not include penalties or late fees unless filingLate is an explicit input."
]
},
{
"classKey": "anaheim_recreation_entertainment_gross_receipts",
"displayName": "Recreation or entertainment gross receipts business license tax",
"formulaKind": "gross_receipts_threshold_flat_or_rate_minimum",
"formulaParameters": {
"currency": "USD",
"thresholdGrossReceipts": 100000,
"flatTaxBelowThreshold": 40.0,
"ratePerThousandGrossReceipts": 0.19,
"minimumTaxAtOrAboveThreshold": 60.0,
"period": "annual",
"expression": "annualGrossReceipts < 100000 ? 40.00 : max(annualGrossReceipts / 1000 * 0.19, 60.00)"
},
"requiredInputs": [
"annualGrossReceipts",
"cityClassificationReview"
],
"effectiveStartDate": null,
"runtimeReady": true,
"doNotIncludeByDefaultReasons": [
"Include only for recreation or entertainment classifications.",
"Do not include penalties or late fees unless filingLate is an explicit input."
]
},
{
"classKey": "anaheim_professions",
"displayName": "Professional business license tax",
"formulaKind": "professional_principal_employee_breakout",
"formulaParameters": {
"currency": "USD",
"firstProfessionalPrincipalTax": 135.0,
"additionalProfessionalPrincipalTax": 150.0,
"professionalEmployeeOrContractorTax": 75.0,
"otherEmployeeTax": 10.0,
"period": "annual",
"expression": "135.00 + 150.00 * max(professionalPrincipalCount - 1, 0) + 75.00 * professionalEmployeeOrContractorCount + 10.00 * otherEmployeeCount"
},
"requiredInputs": [
"professionalPrincipalCount",
"professionalEmployeeOrContractorCount",
"otherEmployeeCount",
"cityClassificationReview"
],
"effectiveStartDate": null,
"runtimeReady": true,
"doNotIncludeByDefaultReasons": [
"Use only for professional classifications.",
"Do not include penalties or late fees unless filingLate is an explicit input."
]
},
{
"classKey": "anaheim_services",
"displayName": "Service business license tax",
"formulaKind": "base_plus_employee",
"formulaParameters": {
"currency": "USD",
"baseTax": 68.0,
"employeeTax": 10.0,
"period": "annual",
"expression": "68.00 + 10.00 * averageEmployeeCount"
},
"requiredInputs": [
"averageEmployeeCount",
"cityClassificationReview"
],
"effectiveStartDate": null,
"runtimeReady": true,
"doNotIncludeByDefaultReasons": [
"Use only for service classifications.",
"Do not include penalties or late fees unless filingLate is an explicit input."
]
},
{
"classKey": "anaheim_contractors",
"displayName": "Contractor business license tax",
"formulaKind": "flat_fee_by_subclass",
"formulaParameters": {
"currency": "USD",
"annualRates": {
"generalOrEngineeringContractor": 125.0,
"subcontractorOrSpecialtyContractor": 100.0
},
"period": "annual",
"expression": "annualRates[contractorSubclass]"
},
"requiredInputs": [
"contractorSubclass",
"cityOrOutsideContractorIndicator"
],
"effectiveStartDate": null,
"runtimeReady": true,
"doNotIncludeByDefaultReasons": [
"Use only for contractor classifications.",
"Do not include penalties or late fees unless filingLate is an explicit input."
]
},
{
"classKey": "anaheim_nonresidential_rental_warehouse_storage",
"displayName": "Nonresidential rental, warehouse, or storage square-footage tax",
"formulaKind": "area_rate",
"formulaParameters": {
"currency": "USD",
"ratePerSquareFoot": 0.015,
"taxBase": "grossRentalSpaceSquareFeet",
"period": "annual",
"expression": "grossRentalSpaceSquareFeet * 0.015"
},
"requiredInputs": [
"grossRentalSpaceSquareFeet",
"cityClassificationReview"
],
"effectiveStartDate": null,
"runtimeReady": true,
"doNotIncludeByDefaultReasons": [
"Use for nonresidential rental property, office buildings, warehouses, commercial or industrial space rented to tenants, or primary warehousing/storage activity.",
"Do not include penalties or late fees unless filingLate is an explicit input."
]
},
{
"classKey": "anaheim_apartment_5_plus",
"displayName": "Apartment house business license tax",
"formulaKind": "unit_rate_with_minimum_unit_count",
"formulaParameters": {
"currency": "USD",
"minimumUnitCount": 5,
"unitRate": 5.0,
"period": "annual",
"expression": "apartmentUnitCount >= 5 ? apartmentUnitCount * 5.00 : 0.00"
},
"requiredInputs": [
"apartmentUnitCount"
],
"effectiveStartDate": null,
"runtimeReady": true,
"doNotIncludeByDefaultReasons": [
"Include only for apartment houses with five or more apartments.",
"Do not include penalties or late fees unless filingLate is an explicit input."
]
},
{
"classKey": "anaheim_business_license_processing_fee",
"displayName": "Business license application processing charge",
"formulaKind": "flat_fee_requires_current_resolution_or_account_check",
"formulaParameters": {
"currency": "USD",
"knownMinimumAmount": 37.0,
"period": "perInitialOrRenewedLicense",
"sourceBasis": "Municipal code requires a processing charge set by resolution; city FAQ materials identify a minimum 37.00 processing fee."
},
"requiredInputs": [
"initialOrRenewedLicense",
"currentFeeResolutionOrAccountStatement"
],
"effectiveStartDate": null,
"runtimeReady": false,
"doNotIncludeByDefaultReasons": [
"Anaheim code states the processing charge is set by resolution, so verify the current category and amount before default inclusion."
]
},
{
"classKey": "anaheim_ca_disability_access_fee",
"displayName": "California Disability Access and Education Fund fee",
"formulaKind": "flat_fee",
"formulaParameters": {
"currency": "USD",
"amount": 4.0,
"period": "perLicenseIssuanceOrRenewal"
},
"requiredInputs": [
"licenseIssuanceOrRenewal"
],
"effectiveStartDate": "2018-01-01",
"runtimeReady": true,
"doNotIncludeByDefaultReasons": [
"Include only when estimating a license issuance or renewal bill."
]
},
{
"classKey": "anaheim_tot_lodging",
"displayName": "Transient occupancy tax",
"formulaKind": "percentage_of_rent",
"formulaParameters": {
"ratePercent": 15.0,
"taxBase": "rentChargedByOperator",
"period": "remittancePeriod",
"expression": "rentChargedByOperator * 0.15"
},
"requiredInputs": [
"rentChargedByOperator",
"transientOccupancyIndicator"
],
"effectiveStartDate": null,
"runtimeReady": true,
"doNotIncludeByDefaultReasons": [
"Include only for taxable transient occupancy.",
"This is a pass-through occupancy tax and not a default business license estimate row."
]
},
{
"classKey": "anaheim_atid_lodging_assessment",
"displayName": "Anaheim Tourism Improvement District assessment",
"formulaKind": "percentage_of_hotel_stays_requires_member_hotel_confirmation",
"formulaParameters": {
"ratePercent": 2.0,
"taxBase": "hotelStayRent",
"period": "remittancePeriod",
"expression": "hotelStayRent * 0.02"
},
"requiredInputs": [
"memberHotelIndicator",
"hotelStayRent",
"accountStatementOrDistrictConfirmation"
],
"effectiveStartDate": null,
"runtimeReady": false,
"doNotIncludeByDefaultReasons": [
"Include only for Anaheim Tourism Improvement District member hotels.",
"Require hotel account or district confirmation before default inclusion."
]
}
],
"workflowId": "ca_anaheim_business_license_tax"
},
{
"city": "Vernon",
"state": "CA",
"officialSources": [
{
"title": "Licenses and Permits",
"url": "[https://www.cityofvernonca.gov/government/finance-treasury/licenses-permits](https://www.cityofvernonca.gov/government/finance-treasury/licenses-permits)",
"owner": "City of Vernon Finance and Treasury",
"evidenceText": "Vernon states that every sole proprietor or business entity must obtain a business license before operating, licenses are payable in advance and generally valid for the calendar year, and the amount depends on business classification and activity level."
},
{
"title": "Starting a Business",
"url": "[https://www.cityofvernonca.gov/government/finance-treasury/licenses-permits/starting-a-business](https://www.cityofvernonca.gov/government/finance-treasury/licenses-permits/starting-a-business)",
"owner": "City of Vernon Finance and Treasury",
"evidenceText": "The city requires a Certificate of Occupancy and business license before moving employees or equipment into the city, states that Certificate of Occupancy inspection fees are based on building area, explains SB 205 stormwater evidence for regulated industries, and notes a Special Parcel Tax assessment on non-refrigerated warehouses, truck terminals, freight terminals, and distribution facilities collected through the property tax bill."
},
{
"title": "General Fee Schedule FY 2025-2026",
"url": "[https://www.cityofvernonca.gov/home/showpublisheddocument/3965/638868989865830000](https://www.cityofvernonca.gov/home/showpublisheddocument/3965/638868989865830000)",
"owner": "City of Vernon",
"evidenceText": "The fee schedule is effective July 1, 2025 and states that business license rates are taxes found in Vernon Municipal Code Chapter 5. It also lists Certificate of Occupancy inspection fees by building area and Public Health permit fees including food processing and food warehouse square-footage bands."
},
{
"title": "Vernon Municipal Code Chapter 5.08, Business Licenses",
"url": "[https://ecode360.com/44468490](https://ecode360.com/44468490)",
"owner": "City of Vernon via eCode360",
"evidenceText": "Chapter 5.08 imposes business license tax on businesses in the city. The rate schedule uses average persons employed, while warehousing is taxed in lieu of the employee tax by square footage with a first 5,000 square foot amount, an over-5,000 square-foot rate, and minimum and maximum tax limits. Mixed warehouse and other business activity requires separate warehouse and employee-based calculations with apportionment."
},
{
"title": "Vernon Municipal Code Chapter 3.20, Special Parcel Taxes",
"url": "[https://ecode360.com/44468136](https://ecode360.com/44468136)",
"owner": "City of Vernon via eCode360",
"evidenceText": "Chapter 3.20 levies special parcel taxes on certain parcels improved with warehouse, truck terminal, freight terminal, railroad facility, or distribution facility uses and also contains a public safety special parcel tax on nonresidential taxable property. Annual rates and parcel lists are determined by council action and collected through the Los Angeles County property tax process."
},
{
"title": "Public Health Permits and Invoices",
"url": "[https://www.cityofvernonca.gov/government/health-and-environmental-control/permits-and-invoices](https://www.cityofvernonca.gov/government/health-and-environmental-control/permits-and-invoices)",
"owner": "City of Vernon Health and Environmental Control",
"evidenceText": "Vernon states that public health permits are consolidated, issued for the fiscal year July 1 through June 30, expire June 30, are non-transferable, and are not prorated."
}
],
"calculationRows": [
{
"classKey": "vernon_general_business_employee_band",
"displayName": "General business license tax by average employees",
"formulaKind": "employee_band_table_maximum_rate_requires_current_resolution",
"formulaParameters": {
"currency": "USD",
"period": "annual",
"ratesAreMaximumRates": true,
"fallbackWhenNoLowerResolution": "maximumRatesApply",
"bands": [
{
"minEmployees": 0,
"maxEmployees": 1,
"tax": 750.0
},
{
"minEmployees": 2,
"maxEmployees": 10,
"tax": 1150.0
},
{
"minEmployees": 11,
"maxEmployees": 25,
"tax": 1550.0
},
{
"minEmployees": 26,
"maxEmployees": 50,
"tax": 2150.0
},
{
"minEmployees": 51,
"maxEmployees": 75,
"tax": 2875.0
},
{
"minEmployees": 76,
"maxEmployees": 100,
"tax": 3575.0
},
{
"minEmployees": 101,
"maxEmployees": 150,
"tax": 4250.0
},
{
"minEmployees": 151,
"maxEmployees": 200,
"tax": 4975.0
},
{
"minEmployees": 201,
"maxEmployees": 250,
"tax": 5700.0
},
{
"minEmployees": 251,
"maxEmployees": 300,
"tax": 6425.0
},
{
"minEmployees": 301,
"maxEmployees": 400,
"tax": 7150.0
},
{
"minEmployees": 401,
"maxEmployees": 500,
"tax": 7850.0
},
{
"minEmployees": 501,
"maxEmployees": 600,
"tax": 8600.0
},
{
"minEmployees": 601,
"maxEmployees": 700,
"tax": 10000.0
},
{
"minEmployees": 701,
"maxEmployees": 800,
"tax": 11425.0
},
{
"minEmployees": 801,
"maxEmployees": 900,
"tax": 12850.0
},
{
"minEmployees": 901,
"maxEmployees": 1000,
"tax": 14275.0
},
{
"minEmployees": 1001,
"maxEmployees": 1100,
"tax": 15700.0
},
{
"minEmployees": 1101,
"maxEmployees": 1200,
"tax": 17100.0
},
{
"minEmployees": 1201,
"maxEmployees": 1300,
"tax": 18500.0
},
{
"minEmployees": 1301,
"maxEmployees": 1400,
"tax": 19950.0
},
{
"minEmployees": 1401,
"maxEmployees": 1500,
"tax": 21350.0
},
{
"minEmployees": 1501,
"maxEmployees": 1600,
"tax": 22775.0
},
{
"minEmployees": 1601,
"maxEmployees": 1700,
"tax": 24175.0
},
{
"minEmployees": 1701,
"maxEmployees": 1800,
"tax": 25625.0
},
{
"minEmployees": 1801,
"maxEmployees": 1900,
"tax": 27025.0
},
{
"minEmployees": 1901,
"maxEmployees": null,
"tax": 28450.0
}
]
},
"requiredInputs": [
"averageEmployeeCountInCity",
"businessLocationCount",
"cityClassificationReview",
"currentCityRateResolutionOrRenewalStatement"
],
"effectiveStartDate": null,
"runtimeReady": false,
"doNotIncludeByDefaultReasons": [
"Chapter 5.08 states these are maximum rates and annual rates may be set by resolution; use account renewal statement or current city rate resolution for production default.",
"Do not use for warehousing activity taxed in lieu of employee tax.",
"Do not include penalties or late fees unless filingLate is an explicit input."
]
},
{
"classKey": "vernon_warehouse_storage_square_footage",
"displayName": "Warehouse or storage business license tax by square footage",
"formulaKind": "area_base_increment_with_min_max",
"formulaParameters": {
"currency": "USD",
"firstSquareFeet": 5000,
"baseTax": 1200.0,
"overageRatePerSquareFoot": 0.21,
"minimumTax": 1200.0,
"maximumTax": 11950.0,
"squareFootageIncludes": [
"warehouseBuildingPortions",
"outdoorStorageAreas"
],
"squareFootageExcludes": [
"outdoorMotorVehicleParking"
],
"period": "annual",
"expression": "min(max(1200.00 + 0.21 * max(warehouseSquareFeet - 5000, 0), 1200.00), 11950.00)"
},
"requiredInputs": [
"warehouseSquareFeet",
"outdoorStorageSquareFeet",
"businessLocationCount",
"cityWarehouseClassificationReview"
],
"effectiveStartDate": null,
"runtimeReady": true,
"doNotIncludeByDefaultReasons": [
"Use only for warehousing as defined by Vernon, including storage of goods intended for distribution to other locations.",
"Do not use for storage of manufacturing materials or products manufactured at that location when excluded by the code definition.",
"Do not include penalties or late fees unless filingLate is an explicit input."
]
},
{
"classKey": "vernon_mixed_warehouse_other_business_apportionment",
"displayName": "Mixed warehouse and other business activity apportionment",
"formulaKind": "composite_requires_city_apportionment_review",
"formulaParameters": {
"components": [
"warehouseSquareFootageTaxForWarehousePortion",
"employeeBandTaxForOtherBusinessEmployees"
],
"apportionmentBasis": "warehouseSquareFeetAndNonWarehouseAverageEmployeesWithSharedAreaOrEmployeeApportionment",
"period": "annual"
},
"requiredInputs": [
"warehouseSquareFeet",
"nonWarehouseAverageEmployeeCount",
"sharedAreaApportionment",
"sharedEmployeeApportionment",
"cityClassificationReview"
],
"effectiveStartDate": null,
"runtimeReady": false,
"doNotIncludeByDefaultReasons": [
"Vernon requires apportionment where both warehousing and other business activity occur at the same location.",
"Shared areas and employees may require city rules or review."
]
},
{
"classKey": "vernon_passive_commercial_landlord_notice",
"displayName": "Leasing real property alone classification notice",
"formulaKind": "classification_notice",
"formulaParameters": {
"defaultTaxAmount": null,
"codeTreatment": "Leasing real property alone is not treated as a taxable business under Chapter 5.08 absent other business activity."
},
"requiredInputs": [
"landlordActivityDescription",
"cityClassificationReview"
],
"effectiveStartDate": null,
"runtimeReady": false,
"doNotIncludeByDefaultReasons": [
"Do not infer a Vernon business license tax solely from passive commercial leasing without city review."
]
},
{
"classKey": "vernon_certificate_of_occupancy_inspection_fee",
"displayName": "Certificate of Occupancy inspection fee",
"formulaKind": "building_area_band_fee",
"formulaParameters": {
"currency": "USD",
"period": "perInspection",
"bands": [
{
"minSquareFeet": 0,
"maxSquareFeet": 5000,
"fee": 400.0
},
{
"minSquareFeet": 5001,
"maxSquareFeet": 50000,
"fee": 600.0
},
{
"minSquareFeet": 50001,
"maxSquareFeet": 100000,
"fee": 865.0
},
{
"minSquareFeet": 100001,
"maxSquareFeet": null,
"fee": 1065.0
}
]
},
"requiredInputs": [
"buildingAreaSquareFeet",
"newOccupancyOrRelocationIndicator"
],
"effectiveStartDate": "2025-07-01",
"runtimeReady": true,
"doNotIncludeByDefaultReasons": [
"Include only for new occupancy, relocation, or a Certificate of Occupancy workflow.",
"Do not include reinspection, double fees, or penalties unless explicit user inputs indicate those conditions."
]
},
{
"classKey": "vernon_food_processing_public_health_permit",
"displayName": "Food processing public health permit",
"formulaKind": "square_footage_band_fee",
"formulaParameters": {
"currency": "USD",
"period": "fiscalYear",
"bands": [
{
"minSquareFeet": 0,
"maxSquareFeet": 1999,
"fee": 344.0
},
{
"minSquareFeet": 2000,
"maxSquareFeet": 9999,
"fee": 533.0
},
{
"minSquareFeet": 10000,
"maxSquareFeet": 49999,
"fee": 721.0
},
{
"minSquareFeet": 50000,
"maxSquareFeet": 99999,
"fee": 1224.0
},
{
"minSquareFeet": 100000,
"maxSquareFeet": null,
"fee": 1412.0
}
]
},
"requiredInputs": [
"foodProcessingSquareFeet",
"publicHealthPermitRequired"
],
"effectiveStartDate": "2025-07-01",
"runtimeReady": true,
"doNotIncludeByDefaultReasons": [
"This is a public health permit fee, not a default business license tax row.",
"Include only for food processing facilities requiring Vernon public health permits."
]
},
{
"classKey": "vernon_food_warehouse_public_health_permit",
"displayName": "Food warehouse public health permit",
"formulaKind": "square_footage_band_fee",
"formulaParameters": {
"currency": "USD",
"period": "fiscalYear",
"bands": [
{
"minSquareFeet": 0,
"maxSquareFeet": 1999,
"fee": 207.0
},
{
"minSquareFeet": 2000,
"maxSquareFeet": 9999,
"fee": 254.0
},
{
"minSquareFeet": 10000,
"maxSquareFeet": 49999,
"fee": 348.0
},
{
"minSquareFeet": 50000,
"maxSquareFeet": 99999,
"fee": 706.0
},
{
"minSquareFeet": 100000,
"maxSquareFeet": null,
"fee": 894.0
}
]
},
"requiredInputs": [
"foodWarehouseSquareFeet",
"publicHealthPermitRequired"
],
"effectiveStartDate": "2025-07-01",
"runtimeReady": true,
"doNotIncludeByDefaultReasons": [
"This is a public health permit fee, not a default business license tax row.",
"Include only for food warehouse facilities requiring Vernon public health permits."
]
},
{
"classKey": "vernon_sb205_stormwater_evidence",
"displayName": "SB 205 stormwater industrial permit evidence requirement",
"formulaKind": "compliance_evidence_required_no_tax_formula",
"formulaParameters": {
"acceptedEvidence": [
"WDID",
"WDIDApplication",
"NEC",
"NONA"
],
"monetaryAmount": null
},
"requiredInputs": [
"regulatedIndustryIndicator",
"WDIDOrWDIDApplicationOrNECOrNONA"
],
"effectiveStartDate": null,
"runtimeReady": false,
"doNotIncludeByDefaultReasons": [
"This is a compliance evidence requirement, not a local tax formula."
]
},
{
"classKey": "vernon_special_parcel_tax_warehouse_distribution",
"displayName": "Special parcel tax for warehouse, truck terminal, freight terminal, railroad facility, or distribution facility",
"formulaKind": "requires_property_tax_bill_or_current_council_rate",
"formulaParameters": {
"currency": "USD",
"originalMaximumRateFiscalYear1999": {
"amount": 20.0,
"perSquareFeetGrossLandArea": 100
},
"annualAdjustment": "CPI-adjusted maximum; council determines annual amount and taxable parcels",
"collectionMethod": "Los Angeles County property tax bill",
"period": "fiscalYear"
},
"requiredInputs": [
"assessorParcelNumber",
"grossLandAreaSquareFeet",
"taxableUseApportionment",
"currentCouncilRateResolutionOrPropertyTaxBill"
],
"effectiveStartDate": null,
"runtimeReady": false,
"doNotIncludeByDefaultReasons": [
"Annual rate and parcel applicability require current council action or property tax bill.",
"Certain accessory manufacturing storage, cold storage, refrigerated warehouse, and qualifying sales-tax-generating wholesale or distribution uses may be excluded."
]
},
{
"classKey": "vernon_public_safety_special_parcel_tax_nonresidential",
"displayName": "Public safety special parcel tax on nonresidential taxable property",
"formulaKind": "requires_property_tax_bill_or_current_council_rate",
"formulaParameters": {
"currency": "USD",
"initialMaximumRateFiscalYear2023_2024": {
"amount": 0.03683,
"perSquareFootTaxableParcelArea": 1
},
"annualAdjustment": "CPI-adjusted after FY2023-24; council determines annual amount and taxable parcels",
"collectionMethod": "Los Angeles County property tax bill",
"authorizedCollectionPeriod": "FY2023-24 through FY2027-28"
},
"requiredInputs": [
"assessorParcelNumber",
"taxableParcelAreaSquareFeet",
"currentCouncilRateResolutionOrPropertyTaxBill"
],
"effectiveStartDate": "2023-07-01",
"runtimeReady": false,
"doNotIncludeByDefaultReasons": [
"Annual rate and parcel applicability require current council action or property tax bill.",
"This is a parcel tax, not a default business license estimate row."
]
}
],
"workflowId": "ca_vernon_business_license_special_assessment_workflow"
},
{
"city": "San Diego",
"state": "CA",
"officialSources": [
{
"title": "Apply for a Business Tax Certificate",
"url": "[https://www.sandiego.gov/treasurer/taxesfees/btax/btaxhow](https://www.sandiego.gov/treasurer/taxesfees/btax/btaxhow)",
"owner": "City of San Diego Office of the City Treasurer",
"evidenceText": "All businesses operating in San Diego must register for a Business Tax Certificate. The city states that beginning July 1, 2025, an additional 1.47 per employee annual Minimum Wage Enforcement Fee applies, and that the city notifies applicants if additional taxes or fees are due such as BID assessments or large business tax."
},
{
"title": "Business Tax Rates and Fees",
"url": "[https://www.sandiego.gov/treasurer/taxesfees/btax/btaxfees](https://www.sandiego.gov/treasurer/taxesfees/btax/btaxfees)",
"owner": "City of San Diego Office of the City Treasurer",
"evidenceText": "Annual Business Tax Certificate tax is 34.00 for businesses with 12 employees or fewer and 125.00 plus 5.00 per employee for businesses with 13 or more employees. The SB 1186 fee is 4.00, the Minimum Wage Enforcement Fee is 1.47 per employee beginning July 1, 2025, and businesses located in BIDs may be subject to additional fees."
},
{
"title": "Rental Unit Business Tax Fees",
"url": "[https://www.sandiego.gov/treasurer/taxesfees/btax/rtaxfees](https://www.sandiego.gov/treasurer/taxesfees/btax/rtaxfees)",
"owner": "City of San Diego Office of the City Treasurer",
"evidenceText": "The city lists rental unit business tax base and per-unit fees by rental type and unit count, including single family and condo, apartments and multi-unit properties, hotel/motel/bed and breakfast, and mobile home categories. The page also identifies the 4.00 SB 1186 fee and possible BID fees."
},
{
"title": "Business Tax FAQ",
"url": "[https://www.sandiego.gov/treasurer/taxesfees/btax/btaxfaq](https://www.sandiego.gov/treasurer/taxesfees/btax/btaxfaq)",
"owner": "City of San Diego Office of the City Treasurer",
"evidenceText": "San Diego states that a Business Tax Certificate is required before engaging in any business, trade, calling, or occupation, and applies to self-employed persons, independent contractors, branches, and home-based businesses."
},
{
"title": "Business Improvement Districts",
"url": "[https://www.sandiego.gov/economic-development/about/bids](https://www.sandiego.gov/economic-development/about/bids)",
"owner": "City of San Diego Economic Development",
"evidenceText": "The city identifies 18 active Business Improvement Districts and states that assessment details vary by district and business activity."
},
{
"title": "Transient Occupancy Tax",
"url": "[https://www.sandiego.gov/treasurer/taxesfees/tot](https://www.sandiego.gov/treasurer/taxesfees/tot)",
"owner": "City of San Diego Office of the City Treasurer",
"evidenceText": "Effective May 1, 2025, San Diego transient occupancy tax rates are 11.75 percent, 12.75 percent, or 13.75 percent depending on tax zone. The Tourism Marketing District assessment is 2.00 percent for lodging businesses with 70 or more rooms. Both TOT and TMD are calculated as a percentage of rent."
}
],
"calculationRows": [
{
"classKey": "san_diego_business_tax_certificate_general",
"displayName": "General Business Tax Certificate, including manufacturing, warehouse, professional, contractor, retail, wholesale, service, and office businesses",
"formulaKind": "employee_threshold_flat_or_base_plus_employee",
"formulaParameters": {
"currency": "USD",
"smallBusinessEmployeeMaximum": 12,
"smallBusinessTax": 34.0,
"largeBusinessEmployeeMinimum": 13,
"largeBusinessBaseTax": 125.0,
"largeBusinessEmployeeTax": 5.0,
"period": "annual",
"expression": "employeeCount <= 12 ? 34.00 : 125.00 + 5.00 * employeeCount"
},
"requiredInputs": [
"employeeCount",
"businessLocationCount"
],
"effectiveStartDate": null,
"runtimeReady": true,
"doNotIncludeByDefaultReasons": [
"Apply per required Business Tax Certificate or location as applicable.",
"Do not include penalties or late fees unless filingLate is an explicit input."
]
},
{
"classKey": "san_diego_sb1186_fee",
"displayName": "State SB 1186 accessibility fee",
"formulaKind": "flat_fee",
"formulaParameters": {
"currency": "USD",
"amount": 4.0,
"period": "perBusinessTaxCertificateIssuanceOrRenewal"
},
"requiredInputs": [
"certificateIssuanceOrRenewal"
],
"effectiveStartDate": null,
"runtimeReady": true,
"doNotIncludeByDefaultReasons": [
"Include only when estimating a Business Tax Certificate issuance or renewal bill."
]
},
{
"classKey": "san_diego_minimum_wage_enforcement_fee",
"displayName": "Minimum Wage Enforcement Fee",
"formulaKind": "employee_rate",
"formulaParameters": {
"currency": "USD",
"ratePerEmployee": 1.47,
"taxBase": "employeesWorkingWithinSanDiegoBoundaries",
"period": "annual",
"expression": "employeesWorkingWithinSanDiegoBoundaries * 1.47"
},
"requiredInputs": [
"employeesWorkingWithinSanDiegoBoundaries"
],
"effectiveStartDate": "2025-07-01",
"runtimeReady": true,
"doNotIncludeByDefaultReasons": [
"Do not apply if the business has no employees working within San Diego city boundaries."
]
},
{
"classKey": "san_diego_rental_unit_business_tax",
"displayName": "Rental Unit Business Tax",
"formulaKind": "rental_type_unit_tiered_base_plus_unit",
"formulaParameters": {
"currency": "USD",
"period": "annual",
"tiers": [
{
"rentalType": "singleFamilyOrCondo",
"minUnits": 1,
"maxUnits": 1,
"baseFeePerParcel": 50.0,
"perUnitFee": 5.0
},
{
"rentalType": "apartmentOrMultiUnit",
"minUnits": 2,
"maxUnits": 10,
"baseFeePerParcel": 50.0,
"perUnitFee": 5.0
},
{
"rentalType": "apartmentOrMultiUnit",
"minUnits": 11,
"maxUnits": 100,
"baseFeePerParcel": 57.0,
"perUnitFee": 9.0
},
{
"rentalType": "apartmentOrMultiUnit",
"minUnits": 101,
"maxUnits": null,
"baseFeePerParcel": 150.0,
"perUnitFee": 8.0
},
{
"rentalType": "hotelMotelOrBedAndBreakfast",
"minUnits": 1,
"maxUnits": 250,
"baseFeePerParcel": 50.0,
"perUnitFee": 5.0
},
{
"rentalType": "hotelMotelOrBedAndBreakfast",
"minUnits": 251,
"maxUnits": null,
"baseFeePerParcel": 57.0,
"perUnitFee": 9.0
},
{
"rentalType": "mobileHome",
"minUnits": 1,
"maxUnits": 1,
"baseFeePerParcel": 40.0,
"perUnitFee": 3.0
}
],
"expression": "baseFeePerParcelForTier * parcelCount + perUnitFeeForTier * rentalUnitCount"
},
"requiredInputs": [
"rentalType",
"rentalUnitCount",
"parcelCount"
],
"effectiveStartDate": null,
"runtimeReady": true,
"doNotIncludeByDefaultReasons": [
"Use only for rental unit business tax classifications.",
"Potential BID assessments are separate and should not be inferred without district/account data.",
"Do not include penalties or late fees unless filingLate is an explicit input."
]
},
{
"classKey": "san_diego_business_improvement_district_assessment",
"displayName": "Business Improvement District assessment",
"formulaKind": "requires_bid_schedule_or_account_statement",
"formulaParameters": {
"activeBIDCount": 18,
"assessmentVariesBy": [
"district",
"businessActivity",
"location",
"districtAssessmentMethod"
],
"period": "annual"
},
"requiredInputs": [
"businessAddress",
"bidNameOrZone",
"businessActivity",
"accountRenewalStatementOrDistrictAssessmentSchedule"
],
"effectiveStartDate": null,
"runtimeReady": false,
"doNotIncludeByDefaultReasons": [
"San Diego BID assessments vary by district and business activity.",
"Require district schedule or renewal statement before calculating."
]
},
{
"classKey": "san_diego_tot_lodging",
"displayName": "Transient occupancy tax",
"formulaKind": "tax_zone_percentage_of_rent",
"formulaParameters": {
"taxBase": "taxableRent",
"effectiveRateDate": "2025-05-01",
"ratesByTaxZone": {
"zone1": 11.75,
"zone2": 12.75,
"zone3": 13.75
},
"transientThreshold": "lessThanOneMonth",
"period": "remittancePeriod",
"expression": "taxableRent * ratesByTaxZone[taxZone] / 100"
},
"requiredInputs": [
"taxableRent",
"taxZone",
"transientOccupancyUnderOneMonth"
],
"effectiveStartDate": "2025-05-01",
"runtimeReady": true,
"doNotIncludeByDefaultReasons": [
"Include only for lodging, short-term rental, campground, RV park, or other taxable transient occupancy.",
"This is a pass-through occupancy tax and not a default Business Tax Certificate estimate row."
]
},
{
"classKey": "san_diego_tmd_lodging_assessment",
"displayName": "Tourism Marketing District lodging assessment",
"formulaKind": "percentage_of_rent_with_room_count_threshold",
"formulaParameters": {
"ratePercent": 2.0,
"taxBase": "rent",
"minimumRoomCount": 70,
"effectiveRateDate": "2025-05-01",
"period": "remittancePeriod",
"expression": "roomCount >= 70 ? rent * 0.02 : 0.00"
},
"requiredInputs": [
"roomCount",
"rent",
"lodgingBusinessIndicator"
],
"effectiveStartDate": "2025-05-01",
"runtimeReady": true,
"doNotIncludeByDefaultReasons": [
"Include only for lodging businesses with 70 or more rooms.",
"Do not apply to non-lodging businesses or lodging businesses below the room threshold."
]
}
],
"workflowId": "ca_san_diego_business_tax_certificate"
}
],
"runtimePatch": {
"targetDataFile": "data/tax_local_workflow_rules.json",
"workflowUpdates": [
{
"workflowId": "ca_burbank_business_license_tax",
"operation": "add_edge_class_rows",
"classKeys": [
"burbank_mfg_wholesale_retail",
"burbank_business_personal_services_entertainment",
"burbank_professions_related_occupations",
"burbank_unclassified_business",
"burbank_out_of_town_contractor_per_job",
"burbank_residential_rental_apartment_3_plus",
"burbank_hotel_motel_business_tax_unit",
"burbank_commercial_rental_leasing",
"burbank_state_accessibility_fee",
"burbank_registration_change_fee",
"burbank_zoning_review_fee",
"burbank_tot_lodging",
"burbank_tbid_lodging_assessment"
],
"defaultGuardrails": [
"Do not include penalties or late fees unless filingLate is an explicit user input.",
"Do not include TOT or T-BID rows unless lodging inputs are present.",
"Require city classification review for ambiguous activity-to-class mappings."
]
},
{
"workflowId": "ca_pasadena_business_license_tax",
"operation": "add_edge_class_rows",
"classKeys": [
"pasadena_general_business",
"pasadena_service_business",
"pasadena_professional_business",
"pasadena_take_out_service_business",
"pasadena_retail_wholesale_delivery",
"pasadena_contractors",
"pasadena_rental_accommodations_hotel_roominghouse",
"pasadena_nonresidential_building_commercial_landlord",
"pasadena_tot_lodging",
"pasadena_tbid_lodging_assessment",
"pasadena_south_lake_bid_assessment",
"pasadena_state_accessibility_fee_unconfirmed"
],
"defaultGuardrails": [
"Do not include penalties or late fees unless filingLate is an explicit user input.",
"Do not include lodging TOT or TBID rows unless lodging or short-term-rental inputs are present.",
"Do not include South Lake BID without district/account inputs.",
"Require Pasadena review for mapping office, warehouse, manufacturing, retail, wholesale, or mixed activity to the correct license class."
]
},
{
"workflowId": "ca_anaheim_business_license_tax",
"operation": "add_edge_class_rows",
"classKeys": [
"anaheim_manufacturing_wholesale_gross_receipts",
"anaheim_retailing_gross_receipts",
"anaheim_miscellaneous_gross_receipts",
"anaheim_hotel_motel_business_license_gross_receipts",
"anaheim_recreation_entertainment_gross_receipts",
"anaheim_professions",
"anaheim_services",
"anaheim_contractors",
"anaheim_nonresidential_rental_warehouse_storage",
"anaheim_apartment_5_plus",
"anaheim_business_license_processing_fee",
"anaheim_ca_disability_access_fee",
"anaheim_tot_lodging",
"anaheim_atid_lodging_assessment"
],
"defaultGuardrails": [
"Do not include penalties or late fees unless filingLate is an explicit user input.",
"Do not include TOT or ATID unless lodging inputs are present.",
"Do not include ATID without member-hotel or account confirmation.",
"Require city classification review before using miscellaneous or overlapping gross-receipts classes."
]
},
{
"workflowId": "ca_vernon_business_license_special_assessment_workflow",
"operation": "add_edge_class_rows",
"classKeys": [
"vernon_general_business_employee_band",
"vernon_warehouse_storage_square_footage",
"vernon_mixed_warehouse_other_business_apportionment",
"vernon_passive_commercial_landlord_notice",
"vernon_certificate_of_occupancy_inspection_fee",
"vernon_food_processing_public_health_permit",
"vernon_food_warehouse_public_health_permit",
"vernon_sb205_stormwater_evidence",
"vernon_special_parcel_tax_warehouse_distribution",
"vernon_public_safety_special_parcel_tax_nonresidential"
],
"defaultGuardrails": [
"Do not include penalties, double fees, or reinspection fees unless explicit user inputs indicate those conditions.",
"Use current city rate resolution or renewal statement before defaulting Vernon employee-band maximum rates.",
"Require APN and property tax bill or current council rate for special parcel tax rows.",
"Require city apportionment review for mixed warehouse and manufacturing or other business activity."
]
},
{
"workflowId": "ca_san_diego_business_tax_certificate",
"operation": "add_edge_class_rows",
"classKeys": [
"san_diego_business_tax_certificate_general",
"san_diego_sb1186_fee",
"san_diego_minimum_wage_enforcement_fee",
"san_diego_rental_unit_business_tax",
"san_diego_business_improvement_district_assessment",
"san_diego_tot_lodging",
"san_diego_tmd_lodging_assessment"
],
"defaultGuardrails": [
"Do not include penalties or late fees unless filingLate is an explicit user input.",
"Use general Business Tax Certificate employee thresholds for manufacturing, warehouse, professional, contractor, retail, wholesale, service, and office businesses unless a separate rental or lodging workflow applies.",
"Do not include BID assessments without district/account schedule inputs.",
"Do not include TOT or TMD unless lodging inputs are present."
]
}
]
},
"remainingGaps": [
{
"city": "Burbank",
"gap": "T-BID lodging assessment should be verified against the current adopted resolution, hotel account, or return because official district materials show a variable authorized rate range."
},
{
"city": "Pasadena",
"gap": "A current official Pasadena business-license or adopted tax schedule row for the state accessibility fee was not located in the reviewed sources; require city confirmation or renewal statement before adding a default amount."
},
{
"city": "Pasadena",
"gap": "South Lake BID assessment is identified by the city, but a normalized all-business formula was not available from the reviewed city page; require district schedule, address, activity, and renewal statement."
},
{
"city": "Anaheim",
"gap": "Business license processing charge is required by municipal code and city materials identify a minimum amount, but the code says categories are set by resolution; verify current fee resolution or account statement before defaulting."
},
{
"city": "Anaheim",
"gap": "Anaheim Tourism Improvement District applies to member hotels only; require account or district confirmation before default inclusion."
},
{
"city": "Vernon",
"gap": "General business license employee-band amounts are maximum rates and may require current city resolution or renewal statement before production defaulting."
},
{
"city": "Vernon",
"gap": "Special parcel taxes require APN, taxable parcel area or gross land area, taxable-use apportionment, and current council rate or property tax bill."
},
{
"city": "San Diego",
"gap": "Business Improvement District assessments vary by district and business activity; require district schedule or account renewal statement before calculating."
},
{
"city": "All",
"gap": "Late penalties, delinquency surcharges, double fees, and reinspection penalties are intentionally excluded from default estimates unless filing-late, delinquent, or reinspection status is supplied explicitly."
}
]
}
