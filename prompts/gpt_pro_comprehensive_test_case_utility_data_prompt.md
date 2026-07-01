You are helping RetroFi convert its 50 public matching test cases into comprehensive intake-like test users.

Return strict JSON only. Do not include markdown, commentary, or footnotes outside the JSON.

Current date: 2026-06-30.

Goal:
For every supplied RetroFi sample test case, create realistic synthetic utility-bill data in the same shape used by RetroFi client intake records. These are test fixtures, not actual customer bills. They should be plausible enough for calculator, user-preview, and client-intake-summary testing.

Important context:
- RetroFi currently has 50 sample matching profiles in `data/sample_user_profiles.json`.
- Existing test cases have intake profile fields such as companyName, siteAddress, utility providers, buildingType, squareFootage, organizationType, NAICS, and notes.
- They do not currently have the richer utility data format used by real/fake client intake records.
- Real/fake client intake records use:
  - `uploadedUtilityFiles`
  - `utilityExtractedValues`
  - `siteEnergyProfile`
- Codex can rebuild `siteEnergyProfile` deterministically from `uploadedUtilityFiles` and `utilityExtractedValues`, so your most important job is to generate high-quality `uploadedUtilityFiles` and `utilityExtractedValues`.

Required input:
I will provide the current contents of `data/sample_user_profiles.json` after this prompt. Use that JSON as the source of the 50 profiles. Return exactly one utility-data patch per `sampleUserId`.

Current expected sampleUserIds:
[
  "california-endowment-hq",
  "ikea-burbank",
  "juniper-and-ivy-san-diego",
  "northgate-market-anaheim",
  "melissas-vernon-distribution",
  "fender-corona-plant",
  "westin-pasadena",
  "one-community-health-midtown",
  "santa-clara-university-campus",
  "seghesio-healdsburg-winery",
  "via-verde-bronx-renter-household",
  "hoa-mai-gardens-seattle-household",
  "tapiz-mariposa-denver-household",
  "keauhou-lane-honolulu-renter",
  "the-rose-minneapolis-household",
  "bens-chili-bowl-dc",
  "zingermans-deli-ann-arbor",
  "big-dipper-missoula",
  "burlington-beer-company",
  "bluebird-cafe-nashville",
  "la-montanita-nob-hill-albuquerque",
  "food-bank-rockies-aurora-dc",
  "eastern-market-detroit",
  "okc-national-memorial-museum",
  "museum-life-science-durham",
  "portland-food-coop-maine",
  "phipps-conservatory-pittsburgh",
  "boise-coop-north-end",
  "common-ground-coop-urbana",
  "trees-atlanta-kendeda-treehouse",
  "boeing-everett-factory",
  "intel-ocotillo-chandler",
  "bmw-spartanburg-plant",
  "whirlpool-clyde-operations",
  "gm-factory-zero-detroit",
  "microsoft-columbia-data-center-quincy",
  "fedex-world-hub-memphis",
  "qts-richmond-data-center",
  "hersheys-chocolate-world-hershey",
  "quaker-oats-cedar-rapids",
  "austin-central-library",
  "uw-madison-main-campus",
  "boston-latin-school",
  "uaf-akasofu-building",
  "salt-lake-public-safety-building",
  "kauai-coffee-kalaheo",
  "cherokee-ww-hastings-hospital",
  "organic-valley-lafarge-hq",
  "ocracoke-school-island",
  "ntua-fort-defiance-headquarters"
]

Output schema:
{
  "schemaVersion": "retrofi_sample_test_case_utility_data.v1",
  "generatedAt": "2026-06-30T00:00:00.000Z",
  "source": "gpt_pro",
  "dataStatus": "synthetic_estimated_not_actual_bills",
  "globalAssumptions": [],
  "profiles": [
    {
      "sampleUserId": "string",
      "confidence": "high|medium|low",
      "syntheticUtilityDataNotice": "Synthetic estimated utility profile for test fixtures; not an actual bill.",
      "uploadedUtilityFiles": [],
      "utilityExtractedValues": [],
      "siteEnergyProfileDraft": null,
      "modelingNotes": [],
      "sourceUrlsChecked": []
    }
  ],
  "missingOrSkippedProfiles": []
}

Use this exact `uploadedUtilityFiles` object shape:
{
  "fileId": "sample_bill_<sampleUserId>_<utilityCategory>_2026",
  "clientIntakeId": "intake_sample_<sampleUserId>",
  "siteId": "intake_sample_<sampleUserId>:primary_site",
  "originalFilename": "<sampleUserId>-<utilityCategory>-synthetic-utility-profile-2026.json",
  "fileType": "unknown",
  "utilityCategory": "electric|gas|water_sewer|waste",
  "utilityProvider": "string or null",
  "s3Key": "synthetic/sample-test-cases/<sampleUserId>/<utilityCategory>-2026.json",
  "processingStatus": "processed",
  "uploadedAt": "2026-06-30T00:00:00.000Z",
  "processedAt": "2026-06-30T00:00:00.000Z",
  "errorMessage": null
}

Use this exact `utilityExtractedValues` object shape:
{
  "extractedValueId": "sample_ev_<sampleUserId>_<utilityCategory>_<fieldId>_<sequence>",
  "clientIntakeId": "intake_sample_<sampleUserId>",
  "fileId": "sample_bill_<sampleUserId>_<utilityCategory>_2026",
  "fieldId": "one of the allowed field IDs below",
  "fieldDisplayName": "matching display name below",
  "value": "number|string|boolean",
  "unit": "matching unit or null",
  "periodStart": "YYYY-MM-DD or null",
  "periodEnd": "YYYY-MM-DD or null",
  "confidence": "high|medium|low",
  "sourceType": "unknown",
  "sourceText": "Synthetic GPT Pro estimate based on public profile, building type, location, utility provider, and square footage.",
  "sourcePath": "gpt_pro.synthetic_utility_profile.<utilityCategory>"
}

Allowed utility categories:
- `electric`
- `gas`
- `water_sewer`
- `waste`

Supported file types:
- Use `unknown` for synthetic records.

Allowed field IDs and display names:
Electric:
- `utility_provider`: Utility provider, unit `text`
- `service_address`: Service address, unit `text`
- `account_number_masked`: Masked account number, unit `masked text`
- `billing_period_start`: Billing period start, unit `date`
- `billing_period_end`: Billing period end, unit `date`
- `monthly_kwh`: Monthly kWh, unit `kWh`
- `annual_kwh`: Annual kWh, unit `kWh`
- `total_electric_cost`: Total electric cost, unit `USD`
- `annual_electric_cost`: Annual electric cost, unit `USD`
- `average_cost_per_kwh`: Average cost per kWh, unit `USD/kWh`
- `rate_schedule`: Rate schedule, unit `text`
- `customer_class`: Customer class, unit `text`
- `peak_kw`: Peak kW, unit `kW`
- `monthly_peak_kw`: Monthly peak kW, unit `kW`
- `demand_charge_rate`: Demand charge rate, unit `USD/kW`
- `demand_charges`: Demand charges, unit `USD`
- `time_of_use_periods`: Time-of-use periods, unit `structured rate periods`
- `delivery_charges`: Delivery charges, unit `USD`
- `generation_charges`: Generation charges, unit `USD`
- `fixed_customer_charge`: Fixed customer charge, unit `USD`
- `taxes_and_fees`: Taxes and fees, unit `USD`

Gas:
- `gas_utility_provider`: Gas utility provider, unit `text`
- `monthly_therms`: Monthly therms, unit `therms`
- `annual_therms`: Annual therms, unit `therms`
- `total_gas_cost`: Total gas cost, unit `USD`
- `annual_gas_cost`: Annual gas cost, unit `USD`
- `average_cost_per_therm`: Average cost per therm, unit `USD/therm`
- `gas_rate_schedule`: Gas rate schedule, unit `text`
- `fixed_gas_charge`: Fixed gas charge, unit `USD`
- `gas_delivery_charges`: Gas delivery charges, unit `USD`
- `gas_procurement_charges`: Gas procurement charges, unit `USD`

Water and sewer:
- `water_provider`: Water provider, unit `text`
- `monthly_water_use`: Monthly water use, unit `gallons or CCF`
- `annual_water_use`: Annual water use, unit `gallons or CCF`
- `water_unit`: Water unit, unit `text`
- `total_water_cost`: Total water cost, unit `USD`
- `annual_water_cost`: Annual water cost, unit `USD`
- `sewer_cost`: Sewer cost, unit `USD`
- `annual_sewer_cost`: Annual sewer cost, unit `USD`
- `stormwater_fee`: Stormwater fee, unit `USD`
- `meter_size`: Meter size, unit `inches`
- `irrigation_meter_present`: Irrigation meter present, unit `boolean`

Waste:
- `waste_hauler`: Waste hauler, unit `text`
- `landfill_service_cost`: Landfill service cost, unit `USD`
- `recycling_service_cost`: Recycling service cost, unit `USD`
- `organics_service_cost`: Organics service cost, unit `USD`
- `pickup_frequency`: Pickup frequency, unit `pickups/week`
- `bin_size`: Bin size, unit `yards or gallons`
- `contamination_fees`: Contamination fees, unit `USD`
- `overage_fees`: Overage fees, unit `USD`
- `total_waste_cost`: Total waste cost, unit `USD`

Generation rules:
1. Generate at least electric utility data for every profile.
2. Generate gas utility data when `gasUtilityProvider` is not `None`, `No gas`, `Unknown`, empty, or clearly unavailable.
3. Generate water/sewer data when it is plausible for the site type. For household, restaurant, grocery, hotel, healthcare, school, campus, agriculture, food processing, public institution, and industrial profiles, include it unless there is a strong reason not to.
4. Generate waste data when it is plausible for the site type. For restaurants, grocery, retail, hotel, campus, school, healthcare, public institution, industrial, agriculture, logistics, and data center profiles, include it unless there is a strong reason not to.
5. For residential tenant profiles, keep values household-scale unless the sample profile clearly describes common-area/building-owner loads. Use modeling notes to distinguish tenant-paid versus landlord/common-area utilities.
6. For campus, industrial, data center, hospital, logistics, and municipal profiles, use larger commercial or institutional scale. Use demand fields for larger electric customers.
7. For `squareFootage: "Unknown"`, infer a conservative plausible range from public context, company type, and notes, then choose one synthetic baseline. Explain the assumption in `modelingNotes`.
8. Do not invent actual private account numbers. Use deterministic masked values like `XXXX-<last4>`.
9. Use annual period `2025-06-01` to `2026-05-31` for annual values.
10. Include 12 monthly records for `monthly_kwh` and matching 12 monthly `total_electric_cost` records for electric.
11. Include 12 monthly records for `monthly_therms` and matching 12 monthly `total_gas_cost` records for gas.
12. Include 12 monthly records for `monthly_water_use` and matching 12 monthly `total_water_cost` records for water/sewer when included.
13. Monthly periods should be calendar months from `2025-06-01` through `2026-05-31`.
14. Annual totals must approximately equal the sum of monthly values.
15. Average unit costs must match annual cost divided by annual usage.
16. Use plausible local utility cost levels, climate, building type, operating intensity, and square footage.
17. Do not make every profile look the same. Show realistic variation by sector:
    - restaurants: high gas, electric kitchen/refrigeration, water, waste
    - grocery/cold storage: high refrigeration electric and waste
    - data centers: very high electric, low gas and water unless cooling assumptions justify water
    - schools/campuses: seasonal HVAC, large electric, water, waste
    - hotels: electric, gas, water, laundry, kitchen, waste
    - healthcare: high electric, gas, water, critical loads
    - residential households: small electric/gas/water values
    - industrial/manufacturing: high electric, gas/process load where plausible
    - agriculture: irrigation/water and seasonal load where plausible
18. Mark confidence:
    - `high` when the utility provider, size, building type, and public profile are clear.
    - `medium` when square footage or service category is inferred.
    - `low` when multiple important assumptions are unknown.
19. Include `sourceUrlsChecked` only for URLs actually checked. If you rely only on supplied profile data, use an empty array and explain in `modelingNotes`.
20. Do not use unknown field IDs.
21. Do not include markdown links.
22. Do not return commentary outside JSON.

Optional `siteEnergyProfileDraft`:
You may set `siteEnergyProfileDraft` to null for every profile. Codex will rebuild this exactly from the extracted values. If you include it, use this shape:
{
  "siteId": "intake_sample_<sampleUserId>:primary_site",
  "uploadedFileCount": 0,
  "processedFileCount": 0,
  "availableFieldIds": [],
  "latestUtilityProvider": "string or null",
  "latestBillingPeriodStart": "YYYY-MM-DD or null",
  "latestBillingPeriodEnd": "YYYY-MM-DD or null",
  "annualKwh": 0,
  "annualElectricCost": 0,
  "averageCostPerKwh": 0,
  "monthlySummaries": [],
  "utilitySummaries": [],
  "lastUpdatedAt": "2026-06-30T00:00:00.000Z"
}

Validation checks before returning:
- Exactly 50 profiles unless the supplied input has a different count.
- Every input `sampleUserId` appears once.
- No extra `sampleUserId`.
- Every extracted value references an existing `fileId`.
- Every `fieldId` is in the allowed field list.
- Annual totals match monthly totals within 2 percent.
- Average unit costs match annual cost divided by annual usage within 2 percent.
- All JSON strings are valid JSON strings, with no comments.

If response length prevents all 50 profiles:
Return the first 10 complete profiles, include:
{
  "continueFromSampleUserId": "<next unprocessed sampleUserId>"
}
and no partial profile objects.

Now wait for the contents of `data/sample_user_profiles.json`, then return the JSON utility-data patch.
