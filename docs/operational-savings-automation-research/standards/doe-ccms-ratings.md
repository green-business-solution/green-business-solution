# STD-DOE-CCMS-RATINGS - DOE certified equipment ratings

## 1. RetroFi role

This Standard is used by 8 categories and 24 category-local process instances.
The categories are ITC-03, ITC-06, ITC-07, ITC-10, ITC-13, ITC-50, ITC-52, ITC-53.
The process keys are exact-existing-dishwasher-record, exact-proposed-dishwasher-record, exact-proposed-product-rating, existing-product-rating, requirement-proposed-dishwasher-record, requirement-proposed-product-rating.
The formula terms supplied are UEF_or_COP_proposed, active_intensity_existing,r, active_intensity_proposed,r, active_kWh_per_hour_existing, active_kWh_per_hour_proposed, active_kWh_per_rack_existing, active_kWh_per_rack_proposed, existing_annual_kWh, existing_dishwasher_record, hot_water_per_cycle_existing, hot_water_per_cycle_proposed, idle_kW_existing, idle_kW_proposed, idle_rate_existing,r, idle_rate_proposed,r, kWh_per_100lb_existing, kWh_per_100lb_proposed, machine_kWh_per_cycle_existing, machine_kWh_per_cycle_proposed, proposed_annual_kWh, proposed_dishwasher_record, water_gallons_per_100lb_existing, water_gallons_per_100lb_proposed, water_per_cycle_existing, water_per_cycle_proposed, water_per_hour_existing, water_per_hour_proposed, water_per_rack_existing, water_per_rack_proposed, η_existing, η_proposed.
The current claimed output set contains 39 distinct output descriptions.
The present automation limitation is: Unknown existing equipment, historical status without retained exports, and requirement-based baselines inferred from current certified products.

| Evidence ID | Source title | Version | Status | Exact artifact |
| --- | --- | --- | --- | --- |
| E-CCMS-CURRENT | DOE Compliance Certification Database | Current interactive database | UNVERIFIED | Product-specific analyst export and DOE test-result template |
| E-CCMS-EXISTING-UNSUPPORTED | DOE Compliance Certification Database | Current interactive database | UNSUPPORTED | No reviewed retained historical export |

## 2. Official source inventory

The primary organization is U.S. Department of Energy.
The selected official source is Compliance Certification Management System certification database.
The pinned version is Current product-specific certification exports.
The release date or release state is Continuously updated.
The expected update cadence is Certification event based.
The license finding is Federal certification records; access terms and product-export reuse should receive legal review.
The legal-review requirement is Required before redistributing bulk normalized certification records.

- https://www.regulations.doe.gov/certification-data/
- https://www.regulations.doe.gov/ccms/templates

## 3. What can actually be acquired

- Interactive certification database
- Product-specific analyst export
- Product-specific certification templates
- Authenticated CCMS portal for submitters

| Route | Exact endpoint or source | Authentication, registration, and key | Rate limit and pagination | Observed size, format, compression, and partition | History and URL stability | Automation assessment | Research result |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Interactive certification database | https://www.regulations.doe.gov/certification-data/ | No authentication, registration, or API key observed for this route | Not applicable to a static artifact, repository, local package, or manual export | 118 bytes observed; HTML error; Route-specific source structure | Current product-specific certification exports; Certification event based; UI route is change-prone | Human-mediated acquisition only; automate validation and import after export | Unauthenticated direct certification-data probe returned HTTP 403 with a 118-byte response |
| Product-specific analyst export | https://www.regulations.doe.gov/certification-data/ | Operator interaction; account requirement depends on the source UI | Not applicable to a static artifact, repository, local package, or manual export | Not separately sized; Route-specific source structure | Current product-specific certification exports; Certification event based; Monitor URL and checksum drift | Human-mediated acquisition only; automate validation and import after export | Not separately probed; retained as a documented alternative |
| Product-specific certification templates | https://www.regulations.doe.gov/ccms/templates | No authentication, registration, or API key observed for this route | Not applicable to a static artifact, repository, local package, or manual export | Not separately sized; Route-specific source structure | Current product-specific certification exports; Certification event based; Monitor URL and checksum drift | Public acquisition appears automatable, subject to artifact-specific license review | Not separately probed; retained as a documented alternative |
| Authenticated CCMS portal for submitters | https://www.regulations.doe.gov/certification-data/ | Authorized source account; registration and credentials required | Not applicable to a static artifact, repository, local package, or manual export | Not separately sized; Route-specific source structure | Current product-specific certification exports; Certification event based; Monitor URL and checksum drift | Do not automate without source authorization and approved credential handling | Not separately probed; retained as a documented alternative |

The tested access result is: Unauthenticated direct certification-data probe returned HTTP 403 with a 118-byte response.
The retained inspected artifact is HTTP 403 response from certification-data root, HTML error; source repository content is pinned by commit where applicable.
The access-cost classification is free with manual export.

## 4. Real source structure

The observed source-native fields or model inputs are:

- `product or equipment type`
- `manufacturer`
- `brand`
- `basic model number`
- `certification status`
- `certified performance fields`
- `test procedure`
- `submission date`

| Field or structure | Shape to validate and pin | Native unit | Key or filter role | Null handling | Enumeration handling |
| --- | --- | --- | --- | --- | --- |
| product or equipment type | String, identifier, or source enumeration | Not unit-bearing or unit is source-specific | Mandatory filter or version dimension | Preserve source nulls; reject null only when the process requires the field | Preserve and pin native enumeration values per release |
| manufacturer | String, identifier, or source enumeration | Not unit-bearing or unit is source-specific | Payload, calculation input, or output | Preserve source nulls; reject null only when the process requires the field | Not treated as an enumeration unless the source schema declares one |
| brand | String, identifier, or source enumeration | Not unit-bearing or unit is source-specific | Payload, calculation input, or output | Preserve source nulls; reject null only when the process requires the field | Not treated as an enumeration unless the source schema declares one |
| basic model number | String, identifier, or source enumeration | Not unit-bearing or unit is source-specific | Natural-key candidate or key component | Preserve source nulls; reject null only when the process requires the field | Not treated as an enumeration unless the source schema declares one |
| certification status | String, identifier, or source enumeration | Not unit-bearing or unit is source-specific | Mandatory filter or version dimension | Preserve source nulls; reject null only when the process requires the field | Preserve and pin native enumeration values per release |
| certified performance fields | String, identifier, or source enumeration | Not unit-bearing or unit is source-specific | Payload, calculation input, or output | Preserve source nulls; reject null only when the process requires the field | Not treated as an enumeration unless the source schema declares one |
| test procedure | String, identifier, or source enumeration | Not unit-bearing or unit is source-specific | Mandatory filter or version dimension | Preserve source nulls; reject null only when the process requires the field | Preserve and pin native enumeration values per release |
| submission date | Date, timestamp, or source date string | Not unit-bearing or unit is source-specific | Mandatory filter or version dimension | Preserve source nulls; reject null only when the process requires the field | Not treated as an enumeration unless the source schema declares one |

Product and record sources must preserve a natural source identifier plus a release identifier as the composite natural key.
Model sources must preserve the complete input schema, package version, configuration, warnings, and output schema.
Dates remain source-native timestamps in raw snapshots and normalize to UTC timestamps or date-only effective intervals in query tables.
Enumerations remain source-native in raw storage and map through versioned crosswalk rows.
Null means unknown or not reported and must never be converted to zero.
Withdrawn, expired, superseded, and inactive records remain historically retained but are excluded from current resolution by default.
Duplicate manufacturer and model strings are normalized for search only, while the original source text remains immutable.

## 5. RetroFi field coverage

| Required RetroFi field | Process and category | Source artifact or owner | Source-native field | Transformation | Target unit | Support classification | Limitation |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Existing furnace type or application | existing-product-rating; ITC-03 | User | Annual Operational Savings > Annual fuel reduction > Furnace Performance > Existing Furnace > Existing Furnace Type or Application | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROFILE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Existing make and model, when available | existing-product-rating; ITC-03, ITC-06, ITC-07, ITC-10, ITC-13, ITC-50, ITC-53 | User | Annual Operational Savings > Annual fuel reduction > Furnace Performance > Existing Furnace > Existing Make and Model, when available | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROFILE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Existing capacity or size class | existing-product-rating; ITC-03, ITC-06, ITC-07, ITC-10, ITC-13, ITC-50, ITC-53 | User | Annual Operational Savings > Annual fuel reduction > Furnace Performance > Existing Furnace > Existing Capacity or Size Class, when available | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROFILE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Exact proposed make and model from the linked opportunity | exact-proposed-product-rating; ITC-03, ITC-06, ITC-07, ITC-10, ITC-13, ITC-50, ITC-53 | Linked Opportunity | Annual Operational Savings > Annual fuel reduction > Furnace Performance > Proposed Furnace > Linked Opportunity names an exact product > Exact Product Information | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Product type and capacity | exact-proposed-product-rating; ITC-03, ITC-06, ITC-07, ITC-10, ITC-13, ITC-50, ITC-53 | Linked Opportunity | Annual Operational Savings > Annual fuel reduction > Furnace Performance > Proposed Furnace > Linked Opportunity names an exact product > Exact Product Information | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Applicable certified test method | exact-proposed-product-rating; ITC-03, ITC-06, ITC-07, ITC-10, ITC-13, ITC-50, ITC-53 | Linked Opportunity | Annual Operational Savings > Annual fuel reduction > Furnace Performance > Proposed Furnace > Linked Opportunity names an exact product > Exact Product Information | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Product requirements from the linked opportunity | requirement-proposed-product-rating; ITC-03, ITC-06, ITC-07, ITC-10, ITC-13, ITC-50, ITC-53 | Linked Opportunity | Annual Operational Savings > Annual fuel reduction > Furnace Performance > Proposed Furnace > Linked Opportunity specifies requirements but no exact product > Product Requirements | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Required application and capacity | requirement-proposed-product-rating; ITC-03, ITC-06, ITC-07, ITC-10, ITC-13, ITC-50, ITC-53 | Linked Opportunity | Annual Operational Savings > Annual fuel reduction > Furnace Performance > Proposed Furnace > Linked Opportunity specifies requirements but no exact product > Product Requirements | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Applicable efficiency or resource-use criteria | requirement-proposed-product-rating; ITC-03, ITC-06, ITC-07, ITC-10, ITC-13, ITC-50, ITC-53 | Linked Opportunity | Annual Operational Savings > Annual fuel reduction > Furnace Performance > Proposed Furnace > Linked Opportunity specifies requirements but no exact product > Product Requirements | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Existing water heater type or application | existing-product-rating; ITC-06 | User | Annual Operational Savings > Added heat-pump water-heater electricity > Water Heater Performance > Existing Water Heater > Existing Water Heater Type or Application | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROFILE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Existing gas water heater type or application | existing-product-rating; ITC-07 | User | Annual Operational Savings > Annual gas reduction > Gas Water Heater Performance > Existing Gas Water Heater > Existing Gas Water Heater Type or Application | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROFILE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Existing refrigeration equipment type or application | existing-product-rating; ITC-10 | User | Annual Operational Savings > Annual electricity reduction > Refrigeration Equipment Performance > Existing Refrigeration Equipment > Existing Refrigeration Equipment Type or Application | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROFILE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Existing ice machine type or application | existing-product-rating; ITC-13 | User | Annual Operational Savings > Annual ice-machine electricity and water reduction > Ice Machine Performance > Existing Ice Machine > Existing Ice Machine Type or Application | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROFILE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Existing cooking equipment type or application | existing-product-rating; ITC-50 | User | Annual Operational Savings > Annual commercial cooking resource reduction > Cooking Equipment Performance > Existing Cooking Equipment > Existing Cooking Equipment Type or Application | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROFILE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Existing dishwasher machine type and sanitation method | exact-existing-dishwasher-record; ITC-52 | User | Annual Operational Savings > Annual Commercial Dishwasher Resource Reduction > Existing Dishwasher Native Performance > Existing Dishwasher Machine Type and Sanitation Method | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROFILE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Existing exact make and model, retained certification record, or measured native performance from a Project Document | exact-existing-dishwasher-record; ITC-52 | Project Document | Annual Operational Savings > Annual Commercial Dishwasher Resource Reduction > Existing Dishwasher Native Performance > Existing Exact Make and Model, Certification Record, or Measured Native Performance | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROJECT_DOCUMENT | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Exact proposed dishwasher make and model from the linked opportunity | exact-proposed-dishwasher-record; ITC-52 | Linked Opportunity | Annual Operational Savings > Annual Commercial Dishwasher Resource Reduction > Proposed Dishwasher Native Performance > Linked Opportunity names an exact dishwasher > Exact Proposed Dishwasher Product Information | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Proposed machine type, sanitation method, application, and capacity from the linked opportunity | exact-proposed-dishwasher-record; ITC-52 | Linked Opportunity | Annual Operational Savings > Annual Commercial Dishwasher Resource Reduction > Proposed Dishwasher Native Performance > Linked Opportunity names an exact dishwasher > Exact Proposed Dishwasher Product Information | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Dishwasher requirements from the linked opportunity | requirement-proposed-dishwasher-record; ITC-52 | Linked Opportunity | Annual Operational Savings > Annual Commercial Dishwasher Resource Reduction > Proposed Dishwasher Native Performance > Linked Opportunity specifies dishwasher requirements but no exact product > Dishwasher Requirements | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Required machine type, sanitation method, application, and capacity from the linked opportunity | requirement-proposed-dishwasher-record; ITC-52 | Linked Opportunity | Annual Operational Savings > Annual Commercial Dishwasher Resource Reduction > Proposed Dishwasher Native Performance > Linked Opportunity specifies dishwasher requirements but no exact product > Dishwasher Requirements | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Existing commercial washer type or application | existing-product-rating; ITC-53 | User | Annual Operational Savings > Annual commercial laundry resource reduction > Commercial Washer Performance > Existing Commercial Washer > Existing Commercial Washer Type or Application | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROFILE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Existing certified efficiency | existing-product-rating; ITC-03, ITC-06, ITC-07 | HTTP 403 response from certification-data root | product or equipment type; manufacturer; brand; basic model number; certification status; certified performance fields; test procedure; submission date | normalized_rating = source_native_rating * exact unit conversion factor; no representative installed baseline is derived from current certification rows | fraction | SOURCE_INCOMPATIBLE | Unknown existing equipment, historical status without retained exports, and requirement-based baselines inferred from current certified products |
| Proposed certified efficiency | exact-proposed-product-rating; ITC-03, ITC-07 | HTTP 403 response from certification-data root | product or equipment type; manufacturer; brand; basic model number; certification status; certified performance fields; test procedure; submission date | normalized_rating = source_native_rating * exact unit conversion factor; no representative installed baseline is derived from current certification rows | fraction | DIRECTLY_AVAILABLE | Unknown existing equipment, historical status without retained exports, and requirement-based baselines inferred from current certified products |
| Selected proposed certified efficiency | requirement-proposed-product-rating; ITC-03, ITC-07 | HTTP 403 response from certification-data root | product or equipment type; manufacturer; brand; basic model number; certification status; certified performance fields; test procedure; submission date | normalized_rating = source_native_rating * exact unit conversion factor; no representative installed baseline is derived from current certification rows | fraction | DIRECTLY_AVAILABLE | Unknown existing equipment, historical status without retained exports, and requirement-based baselines inferred from current certified products |
| Proposed certified efficiency | exact-proposed-product-rating; ITC-06 | HTTP 403 response from certification-data root | product or equipment type; manufacturer; brand; basic model number; certification status; certified performance fields; test procedure; submission date | normalized_rating = source_native_rating * exact unit conversion factor; no representative installed baseline is derived from current certification rows | fraction | DIRECTLY_AVAILABLE | Unknown existing equipment, historical status without retained exports, and requirement-based baselines inferred from current certified products |
| Selected proposed certified efficiency | requirement-proposed-product-rating; ITC-06 | HTTP 403 response from certification-data root | product or equipment type; manufacturer; brand; basic model number; certification status; certified performance fields; test procedure; submission date | normalized_rating = source_native_rating * exact unit conversion factor; no representative installed baseline is derived from current certification rows | fraction | DIRECTLY_AVAILABLE | Unknown existing equipment, historical status without retained exports, and requirement-based baselines inferred from current certified products |
| Existing annual electricity use per equipment unit | existing-product-rating; ITC-10 | HTTP 403 response from certification-data root | product or equipment type; manufacturer; brand; basic model number; certification status; certified performance fields; test procedure; submission date | normalized_rating = source_native_rating * exact unit conversion factor; no representative installed baseline is derived from current certification rows | kWh/unit-year | SOURCE_INCOMPATIBLE | Unknown existing equipment, historical status without retained exports, and requirement-based baselines inferred from current certified products |
| Proposed annual electricity use per equipment unit | exact-proposed-product-rating; ITC-10 | HTTP 403 response from certification-data root | product or equipment type; manufacturer; brand; basic model number; certification status; certified performance fields; test procedure; submission date | normalized_rating = source_native_rating * exact unit conversion factor; no representative installed baseline is derived from current certification rows | kWh/unit-year | DIRECTLY_AVAILABLE | Unknown existing equipment, historical status without retained exports, and requirement-based baselines inferred from current certified products |
| Selected proposed annual electricity use per equipment unit | requirement-proposed-product-rating; ITC-10 | HTTP 403 response from certification-data root | product or equipment type; manufacturer; brand; basic model number; certification status; certified performance fields; test procedure; submission date | normalized_rating = source_native_rating * exact unit conversion factor; no representative installed baseline is derived from current certification rows | kWh/unit-year | DIRECTLY_AVAILABLE | Unknown existing equipment, historical status without retained exports, and requirement-based baselines inferred from current certified products |
| Existing electricity use per 100 pounds of ice | existing-product-rating; ITC-13 | HTTP 403 response from certification-data root | product or equipment type; manufacturer; brand; basic model number; certification status; certified performance fields; test procedure; submission date | normalized_rating = source_native_rating * exact unit conversion factor; no representative installed baseline is derived from current certification rows | kWh/100 lb | SOURCE_INCOMPATIBLE | Unknown existing equipment, historical status without retained exports, and requirement-based baselines inferred from current certified products |
| Existing potable water use per 100 pounds of ice | existing-product-rating; ITC-13 | HTTP 403 response from certification-data root | product or equipment type; manufacturer; brand; basic model number; certification status; certified performance fields; test procedure; submission date | normalized_rating = source_native_rating * exact unit conversion factor; no representative installed baseline is derived from current certification rows | gallons/100 lb | SOURCE_INCOMPATIBLE | Unknown existing equipment, historical status without retained exports, and requirement-based baselines inferred from current certified products |
| Proposed electricity use per 100 pounds of ice | exact-proposed-product-rating; ITC-13 | HTTP 403 response from certification-data root | product or equipment type; manufacturer; brand; basic model number; certification status; certified performance fields; test procedure; submission date | normalized_rating = source_native_rating * exact unit conversion factor; no representative installed baseline is derived from current certification rows | kWh/100 lb | DIRECTLY_AVAILABLE | Unknown existing equipment, historical status without retained exports, and requirement-based baselines inferred from current certified products |
| Proposed potable water use per 100 pounds of ice | exact-proposed-product-rating; ITC-13 | HTTP 403 response from certification-data root | product or equipment type; manufacturer; brand; basic model number; certification status; certified performance fields; test procedure; submission date | normalized_rating = source_native_rating * exact unit conversion factor; no representative installed baseline is derived from current certification rows | gallons/100 lb | DIRECTLY_AVAILABLE | Unknown existing equipment, historical status without retained exports, and requirement-based baselines inferred from current certified products |
| Selected proposed electricity use per 100 pounds of ice | requirement-proposed-product-rating; ITC-13 | HTTP 403 response from certification-data root | product or equipment type; manufacturer; brand; basic model number; certification status; certified performance fields; test procedure; submission date | normalized_rating = source_native_rating * exact unit conversion factor; no representative installed baseline is derived from current certification rows | kWh/100 lb | DIRECTLY_AVAILABLE | Unknown existing equipment, historical status without retained exports, and requirement-based baselines inferred from current certified products |
| Selected proposed potable water use per 100 pounds of ice | requirement-proposed-product-rating; ITC-13 | HTTP 403 response from certification-data root | product or equipment type; manufacturer; brand; basic model number; certification status; certified performance fields; test procedure; submission date | normalized_rating = source_native_rating * exact unit conversion factor; no representative installed baseline is derived from current certification rows | gallons/100 lb | DIRECTLY_AVAILABLE | Unknown existing equipment, historical status without retained exports, and requirement-based baselines inferred from current certified products |
| Existing active resource intensity | existing-product-rating; ITC-50 | HTTP 403 response from certification-data root | product or equipment type; manufacturer; brand; basic model number; certification status; certified performance fields; test procedure; submission date | normalized_rating = source_native_rating * exact unit conversion factor; no representative installed baseline is derived from current certification rows | resource/certified activity | SOURCE_INCOMPATIBLE | Unknown existing equipment, historical status without retained exports, and requirement-based baselines inferred from current certified products |
| Existing idle resource rate | existing-product-rating; ITC-50 | HTTP 403 response from certification-data root | product or equipment type; manufacturer; brand; basic model number; certification status; certified performance fields; test procedure; submission date | normalized_rating = source_native_rating * exact unit conversion factor; no representative installed baseline is derived from current certification rows | resource/hour | SOURCE_INCOMPATIBLE | Unknown existing equipment, historical status without retained exports, and requirement-based baselines inferred from current certified products |
| Proposed active resource intensity | exact-proposed-product-rating; ITC-50 | HTTP 403 response from certification-data root | product or equipment type; manufacturer; brand; basic model number; certification status; certified performance fields; test procedure; submission date | normalized_rating = source_native_rating * exact unit conversion factor; no representative installed baseline is derived from current certification rows | resource/certified activity | DIRECTLY_AVAILABLE | Unknown existing equipment, historical status without retained exports, and requirement-based baselines inferred from current certified products |
| Proposed idle resource rate | exact-proposed-product-rating; ITC-50 | HTTP 403 response from certification-data root | product or equipment type; manufacturer; brand; basic model number; certification status; certified performance fields; test procedure; submission date | normalized_rating = source_native_rating * exact unit conversion factor; no representative installed baseline is derived from current certification rows | resource/hour | DIRECTLY_AVAILABLE | Unknown existing equipment, historical status without retained exports, and requirement-based baselines inferred from current certified products |
| Selected proposed active resource intensity | requirement-proposed-product-rating; ITC-50 | HTTP 403 response from certification-data root | product or equipment type; manufacturer; brand; basic model number; certification status; certified performance fields; test procedure; submission date | normalized_rating = source_native_rating * exact unit conversion factor; no representative installed baseline is derived from current certification rows | resource/certified activity | DIRECTLY_AVAILABLE | Unknown existing equipment, historical status without retained exports, and requirement-based baselines inferred from current certified products |
| Selected proposed idle resource rate | requirement-proposed-product-rating; ITC-50 | HTTP 403 response from certification-data root | product or equipment type; manufacturer; brand; basic model number; certification status; certified performance fields; test procedure; submission date | normalized_rating = source_native_rating * exact unit conversion factor; no representative installed baseline is derived from current certification rows | resource/hour | DIRECTLY_AVAILABLE | Unknown existing equipment, historical status without retained exports, and requirement-based baselines inferred from current certified products |
| Existing dishwasher native-field record | exact-existing-dishwasher-record; ITC-52 | HTTP 403 response from certification-data root | product or equipment type; manufacturer; brand; basic model number; certification status; certified performance fields; test procedure; submission date | normalized_rating = source_native_rating * exact unit conversion factor; no representative installed baseline is derived from current certification rows | record set | SOURCE_INCOMPATIBLE | Unknown existing equipment, historical status without retained exports, and requirement-based baselines inferred from current certified products |
| Existing rack-machine water use per rack | exact-existing-dishwasher-record; ITC-52 | HTTP 403 response from certification-data root | product or equipment type; manufacturer; brand; basic model number; certification status; certified performance fields; test procedure; submission date | normalized_rating = source_native_rating * exact unit conversion factor; no representative installed baseline is derived from current certification rows | gallons/rack | SOURCE_INCOMPATIBLE | Unknown existing equipment, historical status without retained exports, and requirement-based baselines inferred from current certified products |
| Existing rack-machine active electricity per rack | exact-existing-dishwasher-record; ITC-52 | HTTP 403 response from certification-data root | product or equipment type; manufacturer; brand; basic model number; certification status; certified performance fields; test procedure; submission date | normalized_rating = source_native_rating * exact unit conversion factor; no representative installed baseline is derived from current certification rows | kWh/rack | SOURCE_INCOMPATIBLE | Unknown existing equipment, historical status without retained exports, and requirement-based baselines inferred from current certified products |
| Existing flight or conveyor water use per operating hour | exact-existing-dishwasher-record; ITC-52 | HTTP 403 response from certification-data root | product or equipment type; manufacturer; brand; basic model number; certification status; certified performance fields; test procedure; submission date | normalized_rating = source_native_rating * exact unit conversion factor; no representative installed baseline is derived from current certification rows | gallons/hour | SOURCE_INCOMPATIBLE | Unknown existing equipment, historical status without retained exports, and requirement-based baselines inferred from current certified products |
| Existing flight or conveyor active electricity per operating hour | exact-existing-dishwasher-record; ITC-52 | HTTP 403 response from certification-data root | product or equipment type; manufacturer; brand; basic model number; certification status; certified performance fields; test procedure; submission date | normalized_rating = source_native_rating * exact unit conversion factor; no representative installed baseline is derived from current certification rows | kWh/hour | SOURCE_INCOMPATIBLE | Unknown existing equipment, historical status without retained exports, and requirement-based baselines inferred from current certified products |
| Existing idle power | exact-existing-dishwasher-record; ITC-52 | HTTP 403 response from certification-data root | product or equipment type; manufacturer; brand; basic model number; certification status; certified performance fields; test procedure; submission date | normalized_rating = source_native_rating * exact unit conversion factor; no representative installed baseline is derived from current certification rows | kW | SOURCE_INCOMPATIBLE | Unknown existing equipment, historical status without retained exports, and requirement-based baselines inferred from current certified products |
| Proposed dishwasher native-field record | exact-proposed-dishwasher-record, requirement-proposed-dishwasher-record; ITC-52 | HTTP 403 response from certification-data root | product or equipment type; manufacturer; brand; basic model number; certification status; certified performance fields; test procedure; submission date | normalized_rating = source_native_rating * exact unit conversion factor; no representative installed baseline is derived from current certification rows | record set | DIRECTLY_AVAILABLE | Unknown existing equipment, historical status without retained exports, and requirement-based baselines inferred from current certified products |
| Proposed rack-machine water use per rack | exact-proposed-dishwasher-record, requirement-proposed-dishwasher-record; ITC-52 | HTTP 403 response from certification-data root | product or equipment type; manufacturer; brand; basic model number; certification status; certified performance fields; test procedure; submission date | normalized_rating = source_native_rating * exact unit conversion factor; no representative installed baseline is derived from current certification rows | gallons/rack | DIRECTLY_AVAILABLE | Unknown existing equipment, historical status without retained exports, and requirement-based baselines inferred from current certified products |
| Proposed rack-machine active electricity per rack | exact-proposed-dishwasher-record, requirement-proposed-dishwasher-record; ITC-52 | HTTP 403 response from certification-data root | product or equipment type; manufacturer; brand; basic model number; certification status; certified performance fields; test procedure; submission date | normalized_rating = source_native_rating * exact unit conversion factor; no representative installed baseline is derived from current certification rows | kWh/rack | DIRECTLY_AVAILABLE | Unknown existing equipment, historical status without retained exports, and requirement-based baselines inferred from current certified products |
| Proposed flight or conveyor water use per operating hour | exact-proposed-dishwasher-record, requirement-proposed-dishwasher-record; ITC-52 | HTTP 403 response from certification-data root | product or equipment type; manufacturer; brand; basic model number; certification status; certified performance fields; test procedure; submission date | normalized_rating = source_native_rating * exact unit conversion factor; no representative installed baseline is derived from current certification rows | gallons/hour | DIRECTLY_AVAILABLE | Unknown existing equipment, historical status without retained exports, and requirement-based baselines inferred from current certified products |
| Proposed flight or conveyor active electricity per operating hour | exact-proposed-dishwasher-record, requirement-proposed-dishwasher-record; ITC-52 | HTTP 403 response from certification-data root | product or equipment type; manufacturer; brand; basic model number; certification status; certified performance fields; test procedure; submission date | normalized_rating = source_native_rating * exact unit conversion factor; no representative installed baseline is derived from current certification rows | kWh/hour | DIRECTLY_AVAILABLE | Unknown existing equipment, historical status without retained exports, and requirement-based baselines inferred from current certified products |
| Proposed idle power | exact-proposed-dishwasher-record, requirement-proposed-dishwasher-record; ITC-52 | HTTP 403 response from certification-data root | product or equipment type; manufacturer; brand; basic model number; certification status; certified performance fields; test procedure; submission date | normalized_rating = source_native_rating * exact unit conversion factor; no representative installed baseline is derived from current certification rows | kW | DIRECTLY_AVAILABLE | Unknown existing equipment, historical status without retained exports, and requirement-based baselines inferred from current certified products |
| Existing water use per cycle | existing-product-rating; ITC-53 | HTTP 403 response from certification-data root | product or equipment type; manufacturer; brand; basic model number; certification status; certified performance fields; test procedure; submission date | normalized_rating = source_native_rating * exact unit conversion factor; no representative installed baseline is derived from current certification rows | gallons/cycle | SOURCE_INCOMPATIBLE | Unknown existing equipment, historical status without retained exports, and requirement-based baselines inferred from current certified products |
| Existing hot-water use per cycle | existing-product-rating; ITC-53 | HTTP 403 response from certification-data root | product or equipment type; manufacturer; brand; basic model number; certification status; certified performance fields; test procedure; submission date | normalized_rating = source_native_rating * exact unit conversion factor; no representative installed baseline is derived from current certification rows | gallons/cycle | SOURCE_INCOMPATIBLE | Unknown existing equipment, historical status without retained exports, and requirement-based baselines inferred from current certified products |
| Existing machine electricity per cycle | existing-product-rating; ITC-53 | HTTP 403 response from certification-data root | product or equipment type; manufacturer; brand; basic model number; certification status; certified performance fields; test procedure; submission date | normalized_rating = source_native_rating * exact unit conversion factor; no representative installed baseline is derived from current certification rows | kWh/cycle | SOURCE_INCOMPATIBLE | Unknown existing equipment, historical status without retained exports, and requirement-based baselines inferred from current certified products |
| Proposed water use per cycle | exact-proposed-product-rating; ITC-53 | HTTP 403 response from certification-data root | product or equipment type; manufacturer; brand; basic model number; certification status; certified performance fields; test procedure; submission date | normalized_rating = source_native_rating * exact unit conversion factor; no representative installed baseline is derived from current certification rows | gallons/cycle | DIRECTLY_AVAILABLE | Unknown existing equipment, historical status without retained exports, and requirement-based baselines inferred from current certified products |
| Proposed hot-water use per cycle | exact-proposed-product-rating; ITC-53 | HTTP 403 response from certification-data root | product or equipment type; manufacturer; brand; basic model number; certification status; certified performance fields; test procedure; submission date | normalized_rating = source_native_rating * exact unit conversion factor; no representative installed baseline is derived from current certification rows | gallons/cycle | DIRECTLY_AVAILABLE | Unknown existing equipment, historical status without retained exports, and requirement-based baselines inferred from current certified products |
| Proposed machine electricity per cycle | exact-proposed-product-rating; ITC-53 | HTTP 403 response from certification-data root | product or equipment type; manufacturer; brand; basic model number; certification status; certified performance fields; test procedure; submission date | normalized_rating = source_native_rating * exact unit conversion factor; no representative installed baseline is derived from current certification rows | kWh/cycle | DIRECTLY_AVAILABLE | Unknown existing equipment, historical status without retained exports, and requirement-based baselines inferred from current certified products |
| Selected proposed water use per cycle | requirement-proposed-product-rating; ITC-53 | HTTP 403 response from certification-data root | product or equipment type; manufacturer; brand; basic model number; certification status; certified performance fields; test procedure; submission date | normalized_rating = source_native_rating * exact unit conversion factor; no representative installed baseline is derived from current certification rows | gallons/cycle | DIRECTLY_AVAILABLE | Unknown existing equipment, historical status without retained exports, and requirement-based baselines inferred from current certified products |
| Selected proposed hot-water use per cycle | requirement-proposed-product-rating; ITC-53 | HTTP 403 response from certification-data root | product or equipment type; manufacturer; brand; basic model number; certification status; certified performance fields; test procedure; submission date | normalized_rating = source_native_rating * exact unit conversion factor; no representative installed baseline is derived from current certification rows | gallons/cycle | DIRECTLY_AVAILABLE | Unknown existing equipment, historical status without retained exports, and requirement-based baselines inferred from current certified products |
| Selected proposed machine electricity per cycle | requirement-proposed-product-rating; ITC-53 | HTTP 403 response from certification-data root | product or equipment type; manufacturer; brand; basic model number; certification status; certified performance fields; test procedure; submission date | normalized_rating = source_native_rating * exact unit conversion factor; no representative installed baseline is derived from current certification rows | kWh/cycle | DIRECTLY_AVAILABLE | Unknown existing equipment, historical status without retained exports, and requirement-based baselines inferred from current certified products |

For every `DERIVABLE_FROM_SOURCE` row, the governing derivation is: normalized_rating = source_native_rating * exact unit conversion factor; no representative installed baseline is derived from current certification rows.
No field owned by Profile, Bill, Linked Opportunity, Project Document, or User is silently replaced with a source default.

## 6. Acquisition workflow

```text
Compliance Certification Management System certification database
-> Interactive certification database
-> immutable raw snapshot
-> SHA-256 checksum and media-type validation
-> schema and enumeration validation
-> source-specific normalization and deduplication
-> equipment_products + equipment_certifications + equipment_performance_fields + source_releases + source_artifacts
-> deterministic doe-ccms-ratings adapter
-> typed formula input
-> calculation result with provenance
```

Acquisition runs under a scheduler or operator action and never during a customer estimate.
A failed checksum, schema drift, or incomplete artifact leaves the prior published release active.

## 7. Internal database schema

The source uses the shared registry tables plus these target tables: equipment_products, equipment_certifications, equipment_performance_fields, source_releases, source_artifacts.

```sql
CREATE TABLE os_doe_ccms_ratings_records (
  source_release_id uuid NOT NULL REFERENCES source_releases(id),
  source_record_key text NOT NULL,
  effective_from date,
  effective_to date,
  active boolean NOT NULL,
  native_payload jsonb NOT NULL,
  normalized_payload jsonb NOT NULL,
  unit_registry_version text NOT NULL,
  source_artifact_id uuid NOT NULL REFERENCES source_artifacts(id),
  created_at timestamptz NOT NULL,
  PRIMARY KEY (source_release_id, source_record_key)
);
CREATE INDEX os_doe_ccms_ratings_active_exact_idx
  ON os_doe_ccms_ratings_records ((normalized_payload->>'normalized_identifier'), effective_from, effective_to)
  WHERE active;
CREATE INDEX os_doe_ccms_ratings_requirements_idx
  ON os_doe_ccms_ratings_records USING gin (normalized_payload jsonb_path_ops)
  WHERE active;
```

Source-native payloads remain queryable for audits, while formula adapters consume only validated normalized columns or pinned local-model results.

## 8. Exact resolution

Identifiers are Unicode-normalized, trimmed, case-folded for search, and compared with punctuation-insensitive aliases only after exact original matching fails.
Manufacturer aliases and model aliases are versioned rows, never destructive edits.
Equipment class, capacity, geography, effective date, active status, source version, and test procedure are mandatory filters whenever the source exposes them.
An exact path must return one compatible active record.
Zero records returns a typed unavailable result.
Multiple compatible records return an ambiguity error unless the source defines a deterministic edition or submodel key.
The original identifier, matched alias, filters, and rejected candidates remain in provenance.

## 9. Requirements-based resolution

Mandatory filters are the category's explicit equipment class, performance requirement, capacity boundary, geography, date, active status, test-procedure version, and source release.
The eligible population contains only records satisfying every mandatory filter.
Inactive, withdrawn, superseded, incompatible-unit, missing-required-field, and cross-test-procedure records are excluded.
The source release is never mixed with another release inside one population.
A single eligible record may be selected directly.
Multiple eligible records use an official recommended value only when the source defines one, then a weighted median only when a defensible source weight exists, then an ordinary median only for a true scalar benchmark population.
Structured records and model result sets are never median-selected.

## 10. Benchmark resolution

The benchmark population must be authoritative, category-specific, unit-compatible, and filtered to the same context dimensions used by the formula.
The minimum sample size is five unless an official source explicitly publishes one typical value or a category-specific report approves a different threshold.
The weighting field must come from the source and is never inferred from record order.
The weighted median is the first value whose cumulative positive weight reaches at least half of total eligible weight after sorting by value.
The ordinary median is permitted only when no defensible weight exists and the population is an exchangeable scalar population.
The selected value retains filters, population size, sample size, method, fallback level, and uncertainty.
The unsupported boundary is Unknown existing equipment, historical status without retained exports, and requirement-based baselines inferred from current certified products.

## 11. Calculation or local-model execution

The exact output contract contains: Existing certified efficiency; Proposed certified efficiency; Selected proposed certified efficiency; Existing annual electricity use per equipment unit; Proposed annual electricity use per equipment unit; Selected proposed annual electricity use per equipment unit; Existing electricity use per 100 pounds of ice; Existing potable water use per 100 pounds of ice; Proposed electricity use per 100 pounds of ice; Proposed potable water use per 100 pounds of ice; Selected proposed electricity use per 100 pounds of ice; Selected proposed potable water use per 100 pounds of ice; Existing active resource intensity; Existing idle resource rate; Proposed active resource intensity; Proposed idle resource rate; Selected proposed active resource intensity; Selected proposed idle resource rate; Existing dishwasher native-field record; Existing rack-machine water use per rack; Existing rack-machine active electricity per rack; Existing flight or conveyor water use per operating hour; Existing flight or conveyor active electricity per operating hour; Existing idle power; Proposed dishwasher native-field record; Proposed rack-machine water use per rack; Proposed rack-machine active electricity per rack; Proposed flight or conveyor water use per operating hour; Proposed flight or conveyor active electricity per operating hour; Proposed idle power; Existing water use per cycle; Existing hot-water use per cycle; Existing machine electricity per cycle; Proposed water use per cycle; Proposed hot-water use per cycle; Proposed machine electricity per cycle; Selected proposed water use per cycle; Selected proposed hot-water use per cycle; Selected proposed machine electricity per cycle.
The governing source equation or transformation is normalized_rating = source_native_rating * exact unit conversion factor; no representative installed baseline is derived from current certification rows.
The local execution mode is Operator-exported manual seed with automated validation, normalization, and immutable publication.
Inputs are rejected for missing required fields, incompatible units, ambiguous identifiers, invalid effective dates, out-of-range physical values, or a mismatched model version.
Outputs retain their native unit and a normalized unit from the repository unit registry.
Warnings are first-class result fields and cannot be dropped by the category adapter.
Reproducibility requires the raw-artifact checksum, source release, adapter version, input hash, model or formula version, and output hash.

## 12. Refresh and versioning

Refresh follows Certification event based.
Release detection compares official release metadata and artifact checksums.
A changed checksum under an unchanged source version is quarantined for review.
Schema drift compares columns, types, required fields, enumeration values, workbook sheets, or model input declarations against the prior accepted fingerprint.
Raw snapshots, normalized releases, crosswalks, and selection outputs are immutable.
Publication uses an atomic pointer to the accepted release.
Rollback changes only that pointer and records an operator reason.
Deprecated releases remain available for historical calculation replay.
Stale data is labeled and blocked when an effective-date or certification-status guarantee can no longer be made.

## 13. Runtime design

The selected runtime design is Operator-exported manual seed with automated validation, normalization, and immutable publication.
The required number of external calls during a customer estimate is zero.
The adapter reads a published internal release or executes a pinned local model only.
If the source is offline, existing published releases and reproducible historical calculations continue to work.

## 14. Cost

One-time engineering effort is 100-170 hours.
Estimated raw storage is 2 GB.
Estimated published storage is 1 GB.
Refresh effort is 6-12 monthly plus operator time.
Maintenance burden is High.
External source cost is $0 per month.
Estimated internal storage and compute cost is $0.20 at 100 calculations per month, $0.30 at 1,000, and $0.80 at 10,000.
These figures exclude ordinary shared database and observability overhead and are planning estimates, not vendor quotes.

## 15. Prototype proof

The offline command is:

```bash
node scripts/research/operational-savings/run-prototypes.mjs --json
```

The acquired or inspected source evidence is Direct official database probe.
The retained compact sample is `docs/operational-savings-automation-research/samples/doe-ccms-ratings.sample.json`.
The source or model interface inspected is HTTP 403 response from certification-data root.
The local output kind is `unavailable`, the selection rule is `EXPLICIT_UNAVAILABLE_RESULT`, and the output unit is `unavailable`.
The prototype runs without network access after acquisition.
The prototype warning is HTTP_403_MANUAL_EXPORT_REQUIRED.
The prototype proves parsing, filtering, or calculation behavior only within the retained sample boundary.

## 16. Feasibility verdict

**FEASIBLE_AFTER_MANUAL_SEED**

The supported boundary is Exact active compatible basic-model records from a retained product export.
The unsupported boundary is Unknown existing equipment, historical status without retained exports, and requirement-based baselines inferred from current certified products.

## 17. Final recommended strategy

Create one operator runbook per product family, export the official certification table, validate its template fingerprint, normalize exact basic models, and publish an approved immutable release.
This is the single recommended production path for this Standard.
The rejected alternative is: Browser scraping is rejected because the source blocks direct unauthenticated acquisition and official export paths exist.

## 18. Potential later Information Card changes

No Information Card change is made on this research branch.
Later review may update the visible source version, fallback wording, input ownership, category scope, or status to match the supported boundary documented above.
Any formula change must be separately researched, reviewed, and approved.
Any fallback must name its authoritative population and exact numeric selection rule.
