# Facility Eligibility Review Runbook

This runbook records the process used to normalize opportunity site, facility, and building-type eligibility. It mirrors the utility-restriction workflow but keeps applicant/sector classification separate from actual site/facility restrictions.

## Canonical Taxonomy

The intake form still stores one `buildingType` value, but the matcher normalizes it into canonical facility IDs:

- `any_site`
- `residential`
- `multifamily_residential`
- `nonresidential`
- `commercial`
- `public_institutional`
- `office_admin`
- `retail_storefront`
- `restaurant_foodservice`
- `grocery_food_retail`
- `warehouse_logistics`
- `industrial_manufacturing`
- `hospitality_lodging`
- `healthcare`
- `education_campus`
- `agricultural_facility`
- `data_center`
- `mixed_use`
- `other`

Use broad types only when the source genuinely states broad eligibility. Do not turn applicant classes such as `government`, `nonprofit`, `public_sector`, or `small_business` into facility restrictions.

## Status Model

Each opportunity can store a generated `facilityEligibilityReview` object:

- `required`: one or more specific eligible facility types were found.
- `broad_nonresidential`: nonresidential, commercial-and-industrial, or C&I facility eligibility.
- `broad_commercial`: broad commercial customer/building/facility eligibility.
- `broad_residential`: broad residential/homeowner eligibility.
- `none`: source explicitly says there is no site/facility type restriction.
- `not_applicable`: opportunity type is not gated by facility type, such as many tax credits, loans, broad grants, and financing programs.
- `none_found_after_review`: source corpus and fetched source pages were checked and no facility-type restriction language was found.
- `unknown`: source references facility/property/building type but no supported value could be normalized.

The matcher treats `none`, `not_applicable`, and `none_found_after_review` as a site/facility pass. Broad statuses pass when the user's canonical facility type falls under that broad category.

## Repeatable Workflow

1. Refresh opportunity data.

   ```sh
   npm run gather:dsire:aws
   ```

2. Research and generate facility eligibility reviews.

   ```sh
   npm run matching:facility-reviews
   ```

   This writes:

   - `data/facility_eligibility_reviews.json`
   - `data/facility_eligibility_review_report.md`

3. Inspect the status counts and high-impact `unknown` / `required` rows.

4. Write the accepted normalized facility layer to DynamoDB.

   ```sh
   npm run matching:facility-reviews:write
   ```

   This stores `facilityEligibilityReview`, `facilityEligibilityReviewUpdatedAt`, and `facilityEligibilityReviewSchemaVersion` on each opportunity without changing source-ingestion `updatedAt`.

5. Regenerate sample matching fixtures.

   ```sh
   npm run matching:sample
   ```

6. Run quick checks.

   ```sh
   npm test
   npm run build
   ```

7. Commit, push, and deploy the updated admin fixture if public sample output changed.

## Useful Environment Variables

- `OPPORTUNITY_SOURCE_PATH`: read opportunities from local JSON instead of DynamoDB.
- `FACILITY_REVIEW_OUTPUT_PATH`: override the generated review JSON path.
- `FACILITY_REVIEW_REPORT_PATH`: override the generated markdown report path.
- `FACILITY_REVIEW_FETCH=0`: skip source-page fetches.
- `FACILITY_REVIEW_CONCURRENCY=8`: control opportunity review concurrency.
- `FACILITY_REVIEW_FETCH_TIMEOUT_MS=12000`: control source fetch timeout.
- `FACILITY_REVIEWS_PATH`: point `npm run matching:sample` at a non-default review artifact.
- `FACILITY_REVIEW_WRITE_CONCURRENCY=4`: control DynamoDB write concurrency.

## Review Method

The review script:

1. Builds a record-wide extraction corpus.
2. Fetches source, website, application, and evidence URLs when available.
3. Normalizes true facility/site terms such as restaurant, grocery, warehouse, industrial, healthcare, education, multifamily, agriculture, and data center.
4. Separates applicant-only values from facility values.
5. Converts broad commercial/nonresidential/residential eligibility into broad statuses instead of fake concrete building types.
6. Stores evidence text, reviewed URLs, fetch errors, confidence, review method, and timestamp.

For future automation, review only opportunities whose `contentHash` changed or whose stored `facilityEligibilityReviewSchemaVersion` is stale.
