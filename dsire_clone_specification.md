# DSIRE Database Clone Specification

Prepared June 22, 2026 from public DSIRE sources and the official DSIRE Read-Me.xlsx field-definition workbook. This is a source-grounded implementation brief for building a legally distinct DSIRE-like incentives/policies database.

## Contents
- 1. Executive summary
- 2. Source basis and legal constraints
- 3. What DSIRE stores
- 4. Record anatomy: how a program is composed
- 5. Classification variables and taxonomies
- 6. Official storage model from the field-definition workbook
- 7. Recommended normalized schema for a clone
- 8. Filter system and search semantics
- 9. Pages, endpoints, and UI behavior
- 10. Data ingestion and update workflow
- 11. Codex implementation brief
- 12. Acceptance tests
- 13. Appendices: program types, field definitions, API examples, source bibliography

## 1. Executive summary
DSIRE is best modeled as a program-centric database. Each public record is a Program: a government, utility, nonprofit, or other administrator policy/incentive that supports renewable energy, energy efficiency, energy storage, electric vehicles, or related technologies. Official public guidance describes the database as covering federal, state, territory, local-government, and larger utility programs, with public filters for state, incentive/program type, technology type, implementing sector, and eligible sector. [S1]

The official field-definition workbook confirms that the core table is program, with one-to-many or many-to-many child tables for contacts, authorities, program details, eligible sectors, eligible technologies, cities, counties, utilities, zip codes, incentive parameter sets, and analyst update memos. [S4]

A clone should separate stable taxonomy entities from program records. Program classification is not a single category value; it is the intersection of geography, category, program type, implementing sector, eligible sectors, eligible technologies, technology categories, energy categories, publication/status dates, zip-code reach, and optional quantitative incentive parameters.

The highest-value implementation decision is to store program details and incentive parameters flexibly. DSIRE uses typed templates for Program Overview fields because different program types need different labels. DSIRE also uses parameter sets because a single program can have multiple technology/sector/system-size-specific incentive amounts. [S4][S6]

Filtering should be implemented as faceted search: AND across different facets, OR within the same facet. Geography requires special handling: federal programs are global, state programs match state/ZIP, local programs match city/county/ZIP, and utility programs match utility service ZIPs.

### 1.1 One-page implementation map

- **Primary record**: Program/policy/incentive -> programs table with public id, name, code, state, category, type, implementing sector, summary, dates, source URL, administrator, publication status.
- **Record detail**: Program Overview section -> program_detail rows driven by program_detail_template labels per program_type.
- **Quantitative incentives**: Incentives / parameter sets -> parameter_set, parameter, parameter_set_sector, parameter_set_technology. Use this for rebates, tax credits, PBIs, feed-in tariffs, etc.
- **Taxonomies**: Category, type, sector, technology, technology category, energy category -> Lookup tables with active flags; preserve historical/legacy IDs where possible.
- **Geography**: State, territory, city, county, utility, ZIP -> states, cities, counties, utilities, zipcodes plus program_* join tables and derived program_zipcode coverage.
- **Filter engine**: State/ZIP/type/technology/sectors -> Faceted SQL/GraphQL query builder with geography expansion and facet-count cache.
- **Detail page**: Overview, incentives, summary, authorities, contact, memos -> Program-detail endpoint returns fully hydrated record and child arrays.
- **Updates**: DSIRE analyst review/update cadence -> Raw source snapshot, normalized tables, revision history, analyst memos, scheduled refresh.


## 2. Source basis and legal constraints
Official sources used: DSIRE FAQ, API page, Glossary, Database Archives, About/License page, public Programs UI templates, Summary Maps, Summary Tables, and the official Read-Me.xlsx field-definition workbook linked from Database Archives. Historical/deprecated API documentation was used only as compatibility evidence. [S1]-[S8]

The Database Archives page says exports of the DSIRE database are created monthly and links to the Excel field-definition workbook. That workbook is the strongest public evidence for actual table and column names. [S4]

The current public API page states that API subscribers receive real-time access to full content including all 50 states, quantitative incentive data, qualitative policy/incentive details, ZIP-code association, and filtering by 124 specific energy technologies. [S2]

The old public JSON/XML endpoints listed by earlier resource pages are not a current source of truth. The historical GetPrograms endpoint now responds that it is no longer in service and points users to current licensing/API documentation.

Licensing/trademark: DSIRE states that its database is public under CC-BY-SA 4.0; it also states that the DSIRE mark is a registered trademark and is not licensed. A clone should include attribution/share-alike terms if it reuses DSIRE data, and it should use a different product name/brand. [S5]

## 3. What DSIRE stores
A DSIRE record is not merely a rebate or tax credit; it is any program, incentive, or policy within DSIRE scope. Public FAQ language groups renewable records into Financial Incentives and Rules/Regulations & Policies; energy-efficiency records also include financial incentives, rules/regulations, and policies. [S1]

Official glossary language says DSIRE has two general categories and roughly 30 specific types. The current glossary lists financial types such as tax incentives, grants, loans, rebates, PACE, performance-based incentives, feed-in tariffs, RECs/SRECs, and property/sales tax incentives; it also lists regulatory/policy types such as building codes, RPS, net metering, interconnection, public benefit funds, community solar, and permitting/licensing standards. [S3]

The FAQ states that DSIRE tracks federal, state/territory, local-government, and larger utility programs. Utility coverage is focused on investor-owned electric and gas utilities, with smaller cooperatives/municipals usually tracked only above a customer threshold; local-government incentives are limited to large or innovative local governments. [S1]

Program pages are rendered with sections for Program Overview, Incentives, Summary, Authorities, Recommended Next Steps, Contact, Share, and Memos. The public page template exposes that Program Overview and Incentives are field arrays, Authorities are child records with enactment/effective/expiration dates, and Contacts are child records. [S6]

## 4. Record anatomy

- **Program header** (`program`): Name, DSIRE numeric ID, legacy code, state, category, program type, implementing sector, administrator, source website, start/end dates, status, summary.
- **Program overview details** (`program_detail + program_detail_template`): Label/value facts displayed above the summary. Varies by program type, so it cannot be hardcoded globally.
- **Eligible sectors** (`sector + program_sector`): Who can use the program: residential, commercial, industrial, government, nonprofit, utility, etc.
- **Eligible technologies** (`technology_category + technology + program_technology`): What technology qualifies: solar PV, solar thermal, storage, wind, geothermal, HVAC, lighting, EV charging, etc.
- **Incentive parameter sets** (`parameter_set + parameter + parameter_set_sector + parameter_set_technology`): Machine-readable incentive amount/system-size rows. A single program can have multiple incentive rows.
- **Geographic reach** (`state, city, county, utility, zipcode + program_city/program_county/program_utility/program_zipcode`): Controls state, ZIP, city/county, and utility matching.
- **Authorities** (`authority`): Citations to statutes, bills, administrative code, orders, files, and effective/enacted/expiration dates.
- **Contacts** (`contact + program_contact`): Administrator/public contact information at the bottom of the program page.
- **Memos/revisions** (`subscription_memo + optional clone revision tables`): Analyst change notes, update summaries, and audit trail.


## 5. Classification variables and taxonomies
Every program should be classified by the variables below. These variables drive the public filter system, summary maps/tables, ZIP search, API facets, and detail-page rendering.


### Classification matrix

- **Program category**: `program.program_category_id -> program_category.id`; 1 per program; Two high-level categories in official glossary: Financial Incentive and Rules/Regulations & Policies / Regulatory Policy.
- **Program type**: `program.program_type_id -> program_type.id`; 1 per program; Specific policy/incentive type: rebate, loan, RPS, net metering, interconnection, etc. Program type belongs to a category.
- **Implementing sector**: `program.implementing_sector_id -> implementing_sector.id`; 1 per program; Administering organization type: state, federal, utility, local government, nonprofit, etc.
- **Eligible sector**: `program_sector.program_id/sector_id`; many per program; Who can use it. Use parent_id for grouping related sector types and is_selectable for active filters.
- **State/territory**: `program.state_id -> state.id`; 1 primary jurisdiction per program; Public programs can also be federal, statewide, local, or utility-specific. Use state.is_territory.
- **Entire-state flag**: `program.is_entire_state`; boolean; ZIP logic shortcut: program applies to every ZIP in its state.
- **City/county coverage**: `program_city, program_county`; many per local program; Needed for local-government programs and derived ZIP mapping.
- **Utility coverage**: `program_utility + utility_zipcode`; many per utility program; Needed for utility incentives and ZIP matching.
- **ZIP coverage**: `program_zipcode`; many per program; Materialized mapping for fast ZIP search. Should be regenerated when program geography or ZIP data changes.
- **Technology category**: `technology.technology_category_id -> technology_category.id`; many via technologies; Parent technologies such as Solar Technologies, HVAC, Wind, Biomass, etc. Current clone should add Energy Storage and EV/EVSE categories if present in licensed data.
- **Technology**: `program_technology.program_id/technology_id`; many per program; Specific eligible technologies. Current API page states 124 specific energy technologies; seed exact values from current export/API.
- **Energy category**: `technology_category.energy_category_id -> energy_category.id`; derived through technology category; Historical workbook says renewable/efficiency; current DSIRE scope includes storage and EVs, so clone should make this extensible.
- **Publication/status**: `program.published plus start/end dates`; 1 status per program; DSIRE hides expired programs from public side instead of deleting them. Clone should preserve inactive rows for audit/history.
- **Program details**: `program_detail.label/value/template_id`; many per program; Program-type-specific classification/details fields shown in Program Overview.
- **Quantitative parameters**: `parameter.source/qualifier/amount/units`; many per parameter set; Used for machine-readable incentive values, max/min incentive, min/max system size, and units.


### 5.1 Program categories and types

**Financial Incentive:** Corporate Tax Incentives, Feed-in Tariff, Grant Programs, Green Building Incentives, Industry Recruitment/Support, Loan Programs, PACE Financing, Performance-Based Incentives, Personal Tax Incentives, Property Tax Incentives, Rebate Programs, Renewable Energy Credits, Sales Tax Incentives, Solar Renewable Energy Credits

**Rules/Regulations & Policies:** Appliance/Equipment Efficiency Standards, Building Energy Codes, Community Solar Rules, Energy Efficiency Resource Standards, Energy Standards for Public Buildings, Energy Storage Targets, Equipment Certification Requirements, Generation Disclosure, Green Power Purchasing Policies, Interconnection Standards, Line Extension Analysis, Mandatory Utility Green Power Option, Net Metering, Public Benefit Funds, Renewable Portfolio Standards, Solar & Wind Access Policies, Solar & Wind Contractor Licensing, Solar & Wind Permitting Standards, Value of Solar Tariff

### 5.2 Technology taxonomy
The official field-definition workbook stores technology hierarchy as energy_category -> technology_category -> technology, with program_technology joining programs to eligible technologies. [S4]

The current DSIRE API page states that subscribers can filter by 124 specific energy technologies. Public sources available without an API key did not expose the full current 124-value lookup table. For an accurate clone, seed technology, technology_category, and energy_category tables from licensed DSIRE export/API data; do not rely solely on historical public API options. [S2]

Historical public API documentation provides useful legacy examples: technology categories included appliances, biomass, building envelope, fuel cells, geothermal technologies, HVAC, hydroelectric, industrial equipment, lighting, ocean technologies, solar technologies, wind, and other; specific legacy technologies included solar photovoltaics, solar thermal electric, solar water heat, wind all/small/large, geothermal heat pumps, anaerobic digestion, landfill gas, fuel cells, lighting, HVAC, and appliances. Treat this as backward-compatibility evidence, not current completeness. [S8]

## 6. Official storage model from the field-definition workbook
The table below condenses the official Read-Me.xlsx field-definition workbook. Appendix B includes the full table-by-table field definitions. The source workbook is linked from DSIRE Database Archives. [S4]


### Official table summary

- `authority`: Authorities are the legislation, administrative code, commission rulings or other policy documentation which are related to a specific policy/incentive in DSIRE. This table includes every Authority found in DSIRE. Not all entries in DSIRE have authorities associated with them. Fields: id, program_id, order, code, website, enacted, enactedtext, effective, effectivetext, expired, expiredtext, file_key, file_name
- `city`: Every DSIRE entry with "Local Government" as the implementing sector will have at least one city or county associated with it in the database. This table provides the unique identifier for each city. Used by zipcode file. Fields: id, name, state_id
- `contact`: Every entry in DSIRE lists a contact at the bottom of the page. This table collects all the contacts listed in DSIRE Fields: id, created_ts, updated_ts, first_name, last_name, organization_name, web_visible_default, phone, email, website_url, address, city, state_id, zip
- `County`: Every DSIRE entry with "Local Government" as the implementing sector will have at least one city or county associated with it in the database. This table provides the unique identifier for each county. Used by zipcode file. Fields: id, name, state_id
- `energy_category`: All technologies in DSIRE are either renewable energy or energy efficiency technologies. This table provides a unique identifier to indicate whether a technology is a renewable energy or energy efficiency technology. Used by technology_category file. Fields: id
- `implementing_sector`: Implementing sector indicates the type of organzation that administers a certain policy or incentive, i.e. state, utility, local, federal, non-profit Fields: id, name, active
- `parameter`: DSIRE captures quantitative machine-readable data for the following program types: rebates, corporate tax credits, personal tax credits, performance-based incentives, feed-in tariffs. Within a specific program, these incentive parameters may vary by eligible sector and system size. The parameters include eligible technologies, eligible sectors, incentive value, incentive units, max and min incentive, minimum and maximum system size. Fields: id, parameter_set_id, source, qualifier, amount, units
- `parameter_set`: Table that matches Parameter sets to specific programs. A parameter set consists of a technology and eligible sector pairing, with at least an incentive amount, and where applicable, system size data and max/min incentive. A single program may have multiple parameter sets. Fields: id, program_id
- `parameter_set_sector`: Table that matches parameter sets with eligible sectors. Fields: sector_id, set_id
- `parameter_set_technology`: Table that matches parameter sets with eligible technologies. Fields: technology_id, set_id
- `program`: This is the main table for programs in DSIRE. It pulls from multiple tables to build program entries in the database. Fields: id, state_id, is_entire_state, implementing_sector_id, program_category_id, program_type_id, created_by_user_id, code, name, updated_ts, created_ts, published, websiteurl, administrator, fundingsource, budget, start_date, start_date_text, end_date, end_date_text, summary, additional_technologies
- `program_category`: All programs in DSIRE are either financial incentives or regulatory policies. This table provides a unique identifier to indicate whether a program is a financial incentive or a regulatory policy. Fields: id
- `program_city`: Match table used in assigning zip codes to programs. Pulls from Program table and City table. Matches specific programs with the zip codes located within specific cities. Fields: program_id, city_id
- `program_contact`: Match table used to assign contacts to programs. Pulls from Program table and Contact table. Fields: id, program_id, contact_id, webvisible
- `program_county`: Match table used in assigning zip codes to programs. Pulls from Program table and County table. Matches specific programs with the zip codes located within specific counties. Fields: program_id, county_id
- `program_detail`: "Program details" are found towards the top of every DSIRE entry, under "Program Overview". Different program types include different program details. This table provides the content of the program details for every entry in DSIRE. Fields: id, program_id, label, value, display_order, template_id
- `program_detail_template`: Program details are found towards the top of every DSIRE entry, under "Program Overview". Different program types include different program details. This table matches program types with details fields (labels). Fields: id, type_id, label, display_order
- `program_sector`: Match table used in matching eligible sectors to specific programs. Eligible sector are the types of people or entities (residential, commercial, etc.) that are eligible for a particular incentive/policy. Pulls from program table and sector table. Fields: program_id, sector_id
- `program_technology`: Match table used in matching eligible technologies to specific programs. Pulls from program table and technology table. Fields: program_id, technology_id
- `program_type`: Program type refers to the types of policies or incentives included in DSIRE (rebate, tax credit, renewable portfolio standard, etc) Fields: id, program_category_id
- `program_utility`: Match table used in assigning zip codes to programs. Pulls from Program table and utilty table. Matches specific programs with the zip codes associated with specific utilities. Fields: program_id, utility_id
- `program_zipcode`: Match table used to match program IDs with zipcode ID. Pulls from zipcode table and program table. Fields: program_id, zipcode_id
- `search_log`: Archives all filters applied to DSIRE's programs page by users. Not necessary for reconstructing DSIRE database. Fields: none listed
- `sector`: Includes all sectors that can be eleigible for an incentive or policy. Fields: id, name, fieldname, is_selectable, parent_id
- `state`: Table of states and territories Fields: id, abbreviation, name, is_territory
- `subscription_memo`: DSIRE analysts use this field to provide a short summary of changes whenever a policy or incentive is updated. Fields: id, program_id, added_by_user, Added, memo
- `technology`: Table of renewable energy and energy efficiency technology types contained in DSIRE Fields: id, name, technology_category_id, active
- `technology_category`: All technologies in DSIRE are organized under parent technologies --- solar technologies, HVAC, etc --- for easier sorting Fields: id, energy_category_id
- `utility`: Table of utilities. Fields: id, name, state_id, utility_id
- `utility_zipcode`: Assigns zip codes to utilities Fields: utility_id, zipcode_id
- `zipcode`: All policies/incentives in DSIRE are associated with zipcodes. This table is used to assign an id to every zipcode and to identify where those zip codes are located. Fields: id, zipcode, city_id, state_id, county_id


## 7. Recommended normalized schema for a clone
The clone should preserve DSIRE-like normalization while modernizing names and constraints. The official table structure is already relational and suitable for PostgreSQL. Add UUIDs only if needed; keep original numeric IDs in dsire_source_id columns if importing DSIRE content under license.

Use PostgreSQL plus PostGIS when service territories need polygons. If only ZIP matching is required, normalized ZIP tables and materialized program_zipcode rows are enough. Add full-text search on program name, code, summary, administrator, and program_detail values.

```sql
-- Core classification tables
program_category(id, name, slug, active)
program_type(id, program_category_id, name, slug, active, description)
implementing_sector(id, name, slug, active)
sector(id, name, field_name, parent_id, is_selectable, active)
energy_category(id, name, slug, active)
technology_category(id, energy_category_id, name, slug, active)
technology(id, technology_category_id, name, slug, active)
state(id, abbreviation, name, is_territory)
city(id, state_id, name)
county(id, state_id, name, fips)
utility(id, state_id, name, eia_utility_id, active)
zipcode(id, zipcode, city_id, county_id, state_id, latitude, longitude)

-- Primary record
program(
  id,
  source_system,
  source_program_id,
  state_id,
  is_entire_state,
  implementing_sector_id,
  program_category_id,
  program_type_id,
  code,
  name,
  slug,
  website_url,
  administrator,
  funding_source,
  budget,
  start_date,
  start_date_text,
  end_date,
  end_date_text,
  summary_html,
  summary_text,
  additional_technologies,
  published,
  created_at,
  updated_at,
  last_reviewed_at,
  search_vector
)

-- Many-to-many classification and geography joins
program_sector(program_id, sector_id)
program_technology(program_id, technology_id)
program_city(program_id, city_id)
program_county(program_id, county_id)
program_utility(program_id, utility_id)
program_zipcode(program_id, zipcode_id)
utility_zipcode(utility_id, zipcode_id)

-- Program-specific overview/details
program_detail_template(id, program_type_id, label, display_order, value_type, active)
program_detail(id, program_id, template_id, label, value, display_order)

-- Quantitative incentives
parameter_set(id, program_id, label, display_order)
parameter_set_sector(parameter_set_id, sector_id)
parameter_set_technology(parameter_set_id, technology_id)
parameter(id, parameter_set_id, source, qualifier, amount, units, display_value)

-- Authorities and contacts
authority(id, program_id, display_order, code, website, enacted, enacted_text,
          effective, effective_text, expired, expired_text, file_url, file_name)
contact(id, first_name, last_name, organization_name, phone, email, website_url,
        address, city, state_id, zip, web_visible_default, created_at, updated_at)
program_contact(id, program_id, contact_id, web_visible, display_order)

-- Change/audit data
subscription_memo(id, program_id, added_by_user, added_at, memo)
program_revision(id, program_id, source_hash, changed_at, change_summary, raw_snapshot_json)
search_log(id, created_at, filters_json, result_count, user_agent_hash) -- optional analytics only
```

### 7.1 Required indexes and constraints
- program: primary key on id; unique index on source_system + source_program_id when importing external data; btree indexes on state_id, program_type_id, program_category_id, implementing_sector_id, published, updated_at, start_date, end_date.
- Many-to-many joins: composite primary keys on (program_id, sector_id), (program_id, technology_id), (program_id, zipcode_id), (program_id, city_id), (program_id, county_id), and (program_id, utility_id). Add reverse indexes for facet counts.
- zipcode: unique index on zero-padded zipcode text. Preserve leading zeros; the historical field-definition workbook notes that old ZIP exports removed leading zeros, but a clone should store canonical five-character strings.
- Full-text search: generated tsvector over program.name, code, administrator, summary_text, and concatenated program_detail values; optionally add trigram indexes for fuzzy program names.
- Data integrity: enforce valid foreign keys for all taxonomy IDs, but allow inactive taxonomy values for historical/expired records.
- Facets: optionally maintain materialized views for active program counts by state, program_type, technology, sector, and implementing_sector.

## 8. Filter system and search semantics
Official FAQ language says users can filter by state, incentive type, technology type, implementing sector, and eligible sector. The Programs UI exposes applied filter chips. The API documentation/search snippets describe filtering by geographical location, sector, category, type, and technology. Summary Maps filter by Program Type and Technology; Summary Tables filter by Category and Technology. [S1][S2][S6][S7]

Implement the public filter system as a faceted query builder. Across facets use AND; within a facet use OR. Example: state = CA AND category = Financial Incentive AND technology IN (Solar Photovoltaics, Battery Storage) AND eligible_sector IN (Residential, Commercial).

Always hide unpublished/expired public records by default. Support an admin/history mode where published = false records are visible for audit, historical analysis, and update diffing.


### Filter behavior table

- **State/Territory** (CA, NY, PR): program.state_id = selected state OR federal/global records if global inclusion is enabled. For territories, match state.is_territory.
- **ZIP code** (94105): Expand ZIP to state/city/county/utilities; include federal programs, statewide programs, local programs whose city/county/ZIP intersects, and utility programs whose utility_zipcode intersects.
- **Program category** (Financial Incentive; Rules/Regulations & Policies): program.program_category_id IN selected categories.
- **Program type** (Rebate Programs; Net Metering; RPS): program.program_type_id IN selected types. If category is also set, both must match.
- **Technology category** (Solar Technologies; HVAC; Wind): Match programs with at least one technology whose technology_category_id is selected.
- **Technology** (Solar Photovoltaics; Battery Storage; EV Charging): program_technology.technology_id IN selected technologies.
- **Implementing sector** (State; Federal; Utility; Local Government): program.implementing_sector_id IN selected sectors.
- **Eligible sector** (Residential; Commercial; Industrial; Local Government): EXISTS program_sector row for any selected sector; optionally include child sectors when parent selected.
- **Utility** (Pacific Gas & Electric, Duke Energy): EXISTS program_utility row or ZIP-expanded utility match.
- **Text search** (solar rebate): Full-text search against name, code, administrator, summary, and program_detail values; combine with facets using AND.
- **Updated since/date range** (updated_after=2026-01-01): Filter program.updated_at/last_reviewed_at. Useful for API sync and change feeds.


### 8.1 ZIP and geography matching algorithm
```ts
function findProgramsByZip(zip):
  z = lookup zipcode where zipcode = normalizeToFiveDigits(zip)
  utilityIds = select utility_id from utility_zipcode where zipcode_id = z.id

  return programs where published = true and (
       implementing_sector is Federal
    OR (state_id = z.state_id AND is_entire_state = true)
    OR exists program_zipcode(program_id = program.id, zipcode_id = z.id)
    OR exists program_city(program_id = program.id, city_id = z.city_id)
    OR exists program_county(program_id = program.id, county_id = z.county_id)
    OR exists program_utility(program_id = program.id, utility_id in utilityIds)
  )
  and applyOtherFacets()
```

Regenerate `program_zipcode` as a materialized join whenever city, county, utility, state, or program geography changes.

### 8.2 Facet-count rules
- Facet counts should be computed after applying all other active filters, but before applying that facet’s own selected values. This is the standard behavior users expect from faceted search.
- For multi-select values inside one facet, use OR. Example: technology = Solar PV OR Battery Storage.
- For multiple facets, use AND. Example: state = CA AND eligible sector = Residential AND technology = Solar PV.
- For technology category counts, count distinct programs, not technology rows, so one program with multiple solar technologies counts once.
- For Summary Maps, return a state-level count for each state after applying selected program type and technology; color a state if count > 0 and use count/intensity for legend if desired.
- For Summary Tables, group active programs by state and program type/category after applying selected category/technology filters.

## 9. Pages, endpoints, and UI behavior
The public clone should include a Programs search page, Program detail page, Summary Maps, Summary Tables, and API/documentation pages. The Programs page should expose filters and applied filter chips; the Detail page should render the child sections observed in the DSIRE template. [S6][S7]

The current DSIRE API is described as subscriber/API-key based. A clone can expose a public read API for its own data, but if it imports DSIRE data it must respect DSIRE license and API terms. [S2][S5]


### Endpoint map

- `GET /programs`: Search/list programs. Query params: q, state, zip, category, type, technology_category, technology, implementing_sector, eligible_sector, utility, updated_after, page, per_page, sort.
- `GET /programs/{id}`: Hydrated detail page. Return program, overview_details, eligible_sectors, technologies, parameter_sets, authorities, contacts, memos.
- `GET /facets`: Available filters and counts. Accept same filters as /programs and return counts by facet.
- `GET /states`: State/territory lookup. Include abbreviation, name, is_territory.
- `GET /program-types`: Program categories/types. Return category/type tree with active flags.
- `GET /technologies`: Technology category/technology tree. Return current 124-value technology list when seeded.
- `GET /sectors`: Eligible sector tree. Return parent/child sector hierarchy with selectable flag.
- `GET /summary/maps`: State counts for map. Params: program_type, technology. Return state abbreviation + count.
- `GET /summary/tables`: Counts by state/type. Params: category, technology. Return rows grouped by state and type.
- `GET /programs/updates`: Sync feed. Params: updated_after, updated_before. Return changed IDs and timestamps.
- `POST /admin/import`: Admin import job. Load licensed export/API snapshots into raw staging and normalized tables.


### 9.1 Detail endpoint JSON shape
```json
{
  "id": 658,
  "code": "US46F",
  "name": "Business Energy Investment Tax Credit (ITC)",
  "state": { "id": 0, "abbreviation": "US", "name": "Federal" },
  "implementing_sector": { "id": 1, "name": "Federal" },
  "category": { "id": 1, "name": "Financial Incentive" },
  "program_type": { "id": 25, "name": "Corporate Tax Incentive" },
  "administrator": "Internal Revenue Service",
  "website_url": "https://...",
  "published": true,
  "start_date": "YYYY-MM-DD",
  "end_date": null,
  "summary_html": "<p>...</p>",
  "overview_details": [
    { "label": "Eligible Technologies", "value": "Solar Photovoltaics; Wind; ...", "display_order": 1 },
    { "label": "Applicable Sectors", "value": "Commercial; Industrial; ...", "display_order": 2 }
  ],
  "eligible_sectors": [{ "id": 1, "name": "Commercial" }],
  "technologies": [{ "id": 12, "name": "Solar Photovoltaics", "category": "Solar Technologies" }],
  "parameter_sets": [
    {
      "id": 1001,
      "sectors": [{ "id": 1, "name": "Commercial" }],
      "technologies": [{ "id": 12, "name": "Solar Photovoltaics" }],
      "parameters": [
        { "source": "Incentive", "qualifier": null, "amount": 30, "units": "%" },
        { "source": "System", "qualifier": "max", "amount": 1, "units": "MW" }
      ]
    }
  ],
  "authorities": [
    { "code": "26 U.S.C. § 48", "website": "https://...", "enacted": "YYYY-MM-DD", "effective": "YYYY-MM-DD", "expired": null }
  ],
  "contacts": [
    { "organization_name": "...", "phone": "...", "email": "...", "website_url": "..." }
  ],
  "memos": [
    { "added_at": "YYYY-MM-DD", "memo": "Updated eligible technologies." }
  ]
}
```

### 9.2 GraphQL option
A GraphQL API is a good fit because detail pages need nested program data and filters can be expressed as typed where/page arguments. A public DSIRE-API repository snapshot shows a GraphQL-style program query with nested filters and pagination, but it should be treated as an implementation reference, not the current production contract. [S9]

For Codex, build REST first unless GraphQL is specifically required. REST endpoints are easier to test and document; GraphQL can be added above the same service/repository layer.

## 10. Data ingestion and update workflow
Use source priority: (1) licensed current DSIRE API or monthly export; (2) official original authorities/administrator pages for verification; (3) public DSIRE pages only when permitted; (4) historical/deprecated API docs only for compatibility assumptions.

Import should be idempotent. Preserve source_program_id and source_hash. Store raw snapshots before normalizing, then compare normalized records to create program_revision and subscription_memo-style change summaries.

DSIRE FAQ says analysts typically review and update each incentive at least annually and may update more frequently when needed. A clone should store last_reviewed_at separately from updated_at so UI users can distinguish data freshness from technical import time. [S1]


### Ingestion steps
1. Acquire licensed source export/API response. Save exact raw file/JSON and metadata.
2. Load lookup tables first: states, sectors, implementing sectors, program categories, program types, energy categories, technology categories, technologies, utilities, cities, counties, ZIP codes.
3. Load programs with stable source IDs and preserve published/status flags.
4. Load join tables: program_sector, program_technology, program_city, program_county, program_utility, and program_zipcode.
5. Load program_detail/template labels. Use templates to render Program Overview consistently by program type.
6. Load parameter sets and parameters for quantitative incentives. Validate amount/units/source/qualifier combinations.
7. Load authorities and contacts. Mark web_visible/web_visible_default correctly.
8. Generate derived fields: summary_text from summary_html, search_vector, technology_category joins, energy_category joins, and materialized ZIP coverage.
9. Run QA: missing FK checks, duplicate IDs, orphan joins, invalid ZIPs, hidden expired programs, missing program type/category, bad dates, invalid units.
10. Publish by atomically swapping materialized views or using an import_version column.

## 11. Codex implementation brief
Paste this section into Codex as the build brief. It is intentionally direct and implementation-oriented.

```text
Build a legally distinct DSIRE-like clean-energy incentives and policy database.

Core requirements:
1. Use PostgreSQL schema modeled on the DSIRE field-definition workbook.
2. Primary record is Program. Programs have category, program type, implementing sector, state, active/published status, start/end dates, administrator, website URL, summary HTML/text, overview details, eligible sectors, eligible technologies, geography joins, parameter sets, authorities, contacts, and memos.
3. Implement lookup tables for program_category, program_type, implementing_sector, sector, energy_category, technology_category, technology, state, city, county, utility, zipcode.
4. Implement join tables: program_sector, program_technology, program_city, program_county, program_utility, program_zipcode, utility_zipcode.
5. Implement parameter_set, parameter, parameter_set_sector, parameter_set_technology for quantitative incentives. A program can have many parameter sets; each set can apply to multiple sectors and technologies.
6. Implement program_detail_template and program_detail so different program types can have different overview fields.
7. Public filters: q, state, zip, category, type, technology_category, technology, implementing_sector, eligible_sector, utility, updated_after, updated_before, page, per_page, sort.
8. Filter logic: AND across different facets, OR within the same facet. Hide unpublished programs by default.
9. ZIP matching: normalize ZIP to five characters; include federal/global programs, statewide programs for the ZIP state, explicit program_zipcode matches, city/county matches, and utility matches through utility_zipcode.
10. API endpoints: GET /programs, GET /programs/{id}, GET /facets, GET /states, GET /program-types, GET /technologies, GET /sectors, GET /summary/maps, GET /summary/tables, GET /programs/updates.
11. UI pages: Programs list/search with filters and applied filter chips; Program detail page with Program Overview, Incentives, Summary, Authorities, Contact, and Memos; Summary Maps; Summary Tables.
12. Include import pipeline with raw snapshots, normalized load, generated ZIP coverage, search index generation, revision log, and validation checks.
13. Do not use DSIRE trademark/name/branding in the product. Include attribution/share-alike handling if importing DSIRE data under CC-BY-SA and respect any DSIRE API license terms.

Acceptance target:
- A user can search by ZIP and see all matching federal, state, local, and utility programs.
- A user can filter programs by category/type/technology/implementing sector/eligible sector and see correct facet counts.
- A user can open a program and see all child data rendered in the correct sections.
- Summary maps/tables return state-level counts based on program type/category and technology filters.
- Admin import can reload source data without duplicates and preserves inactive historical programs.
```

## 12. Acceptance tests

- **Program detail**: Open /programs/{id} for a program with multiple parameter sets. -> Page shows one Program Overview, multiple Incentives/parameter sets, Summary, Authorities, Contacts, and Memos without losing order.
- **Category/type filter**: Select Financial Incentive + Rebate Programs. -> Only published programs with category Financial Incentive and type Rebate Programs are returned.
- **Technology filter**: Select Solar Photovoltaics. -> Programs with at least one program_technology row for Solar Photovoltaics appear; counts are distinct by program.
- **Technology category filter**: Select Solar Technologies. -> Programs with any child technology in Solar Technologies appear.
- **Eligible sector filter**: Select Residential and Commercial. -> Programs with Residential OR Commercial sector appear, then are ANDed with other facets.
- **ZIP search**: Search a ZIP served by one utility in a given state. -> Results include federal/global, statewide, explicit ZIP/city/county programs, and utility programs for utilities serving that ZIP.
- **Statewide flag**: Program has is_entire_state = true. -> Program appears for every ZIP in that state.
- **Local government coverage**: Program has program_city row but no explicit ZIP rows. -> Import pipeline materializes all ZIPs in that city into program_zipcode or query expands city match.
- **Utility coverage**: Program has program_utility row. -> Program appears for ZIPs mapped to that utility through utility_zipcode.
- **Expired/unpublished**: Program published = false or end_date is past. -> Hidden from public search by default; visible in admin/history mode.
- **Summary map**: Request /summary/maps?program_type=Net Metering&technology=Solar PV. -> Returns count by state; states with zero count are gray/empty.
- **Import idempotency**: Import the same source snapshot twice. -> No duplicate programs, join rows, contacts, authorities, or parameter rows; revision log unchanged.
- **Search text**: Search phrase in administrator or summary. -> Results match full-text vector and remain filterable by facets.


## Appendix A. Program type seed list

### Financial Incentive
- Corporate Tax Incentives
- Feed-in Tariff
- Grant Programs
- Green Building Incentives
- Industry Recruitment/Support
- Loan Programs
- PACE Financing
- Performance-Based Incentives
- Personal Tax Incentives
- Property Tax Incentives
- Rebate Programs
- Renewable Energy Credits
- Sales Tax Incentives
- Solar Renewable Energy Credits

### Rules/Regulations & Policies
- Appliance/Equipment Efficiency Standards
- Building Energy Codes
- Community Solar Rules
- Energy Efficiency Resource Standards
- Energy Standards for Public Buildings
- Energy Storage Targets
- Equipment Certification Requirements
- Generation Disclosure
- Green Power Purchasing Policies
- Interconnection Standards
- Line Extension Analysis
- Mandatory Utility Green Power Option
- Net Metering
- Public Benefit Funds
- Renewable Portfolio Standards
- Solar & Wind Access Policies
- Solar & Wind Contractor Licensing
- Solar & Wind Permitting Standards
- Value of Solar Tariff

## Appendix B. Official field-definition workbook, table by table

### `authority`
Authorities are the legislation, administrative code, commission rulings or other policy documentation which are related to a specific policy/incentive in DSIRE. This table includes every Authority found in DSIRE. Not all entries in DSIRE have authorities associated with them.

- `id`: A unique identifier for each authority found in DSIRE
- `program_id`: Pulled from Program file. Each program in DSIRE has a unique identifier. Program_id in this file indicates the program in DSIRE that is associated with the authority.
- `order`: The order in which the authority appears within the heirarchy of authorities for a particular policy/incentive
- `code`: the statutory reference, bill number, commission ruling, etc.
- `website`: Link to the legislation, commission ruling, etc.
- `enacted`: Date the legislation, regulation, etc. was first enacted
- `enactedtext`: Text that may be needed to explain the enacted date, i.e. "subsequently amended". During data migration from the old version of DSIRE, the new system did not recognize some of our dates, and imported them into this field. We will be moving dates from this field to the enacted field as we update each individual program
- `effective`: Effective date for the legislation, regulation, etc.
- `effectivetext`: Text that may be needed to explain the effective date. During data migration from the old version of DSIRE, the new system did not recognize some of our dates, and imported them into this field. We will be moving dates from this field to the effective field as we update each individual program
- `expired`: Date the legislation, regulation, etc. expires
- `expiredtext`: Text that may be needed to explain the expiration date. During data migration from the old version of DSIRE, the new system did not recognize some of our dates, and imported them into this field. We will be moving dates from this field to the expired field as we update each individual program
- `file_key`: legacy data. Null
- `file_name`: legacy data. Null


### `city`
Every DSIRE entry with "Local Government" as the implementing sector will have at least one city or county associated with it in the database. This table provides the unique identifier for each city. Used by zipcode file.

- `id`: A unique identifier for each city
- `name`: City name
- `state_id`: Unique identifier for the city's state. State IDs can be found in the state table.


### `contact`
Every entry in DSIRE lists a contact at the bottom of the page. This table collects all the contacts listed in DSIRE

- `id`: A unique identifier for each contact
- `created_ts`: date and time the contact was created in the database
- `updated_ts`: date and time the contact was updated in the database
- `first_name`: exactly what it sounds like
- `last_name`: exactly what it sounds like
- `organization_name`: exactly what it sounds like
- `web_visible_default`: Some contacts are only viewable to DSIRE staff. "1" in this field indicates that the contact is visible to the public.
- `phone`: exactly what it sounds like
- `email`: exactly what it sounds like
- `website_url`: exactly what it sounds like
- `address`: exactly what it sounds like
- `city`: exactly what it sounds like
- `state_id`: Unique identifier for the city's state. State IDs can be found in the state file.
- `zip`: exactly what it sounds like


### `County`
Every DSIRE entry with "Local Government" as the implementing sector will have at least one city or county associated with it in the database. This table provides the unique identifier for each county. Used by zipcode file.

- `id`: A unique identifier for each county
- `name`: County name
- `state_id`: Unique identifier for the city's state. State IDs can be found in the state file.


### `energy_category`
All technologies in DSIRE are either renewable energy or energy efficiency technologies. This table provides a unique identifier to indicate whether a technology is a renewable energy or energy efficiency technology. Used by technology_category file.

- `id`: A unique identifier to indicate whether a technology is a renewable energy or energy efficiency technology.


### `implementing_sector`
Implementing sector indicates the type of organzation that administers a certain policy or incentive, i.e. state, utility, local, federal, non-profit

- `id`: A unique identifier for each implementing sector
- `name`: name of the implementing sector
- `active`: "1" indicates that the particular implementing sector is still within the scope of DSIRE. "0" indicates that the particular implementing sector is not used in DSIRE.


### `parameter`
DSIRE captures quantitative machine-readable data for the following program types: rebates, corporate tax credits, personal tax credits, performance-based incentives, feed-in tariffs. Within a specific program, these incentive parameters may vary by eligible sector and system size. The parameters include eligible technologies, eligible sectors, incentive value, incentive units, max and min incentive, minimum and maximum system size.

- `id`: A unique identifier for each incentive parameter
- `parameter_set_id`: A unique identifier for each set of parameters.
- `source`: Either Incenitve or System. Incentive indicates that the values for that parameter are describing the incentive amount. System indicates that the values for that parameter are describing the system, eg. Maximum PV system size for that incentive.
- `qualifier`: Either max, min or blank. Descriptor for the parameter source. Could indicate that the parameter reprents the maximum or minimum system size or the maximum or minimum incentive amount.
- `amount`: Numerical value for the system or incentive.
- `units`: Units for the amount


### `parameter_set`
Table that matches Parameter sets to specific programs. A parameter set consists of a technology and eligible sector pairing, with at least an incentive amount, and where applicable, system size data and max/min incentive. A single program may have multiple parameter sets.

- `id`: A unique identifier for each parameter set. Parameter set details are found in the parameter table.
- `program_id`: A unique identifier for each program in DSIRE. Used here to indicate which program contains each parameter set.


### `parameter_set_sector`
Table that matches parameter sets with eligible sectors.

- `sector_id`: A unique identifier for each eligible sector. IDs can be found in the Sector table.
- `set_id`: A unique identifier for each set of parameters. IDs can be found in the parameter_set table.


### `parameter_set_technology`
Table that matches parameter sets with eligible technologies.

- `technology_id`: A unique identifier for each eligible technology. IDs can be found in the technology table.
- `set_id`: A unique identifier for each set of parameters. IDs can be found in the parameter_set table.


### `program`
This is the main table for programs in DSIRE. It pulls from multiple tables to build program entries in the database.

- `id`: Unique Id for each individual policy/incentive in DSIRE. This number is also located at the end of the URLs for each program entry. (i.e. http://programs.dsireusa.org/system/program/detail/81
- `state_id`: Indicates the state in which this program is available. State IDs can be found in the state table.
- `is_entire_state`: This is used by the zip code table to indicate that an incentive is available in all zip codes in a state
- `implementing_sector_id`: Indicates the sector that administers this program. Implementing sector IDs can be found in the implementing_sector table.
- `program_category_id`: Indicates whether the program is an incentive or a regulatory policy. Program category IDs can be found in the program_category table.
- `program_type_id`: Indicates the type of program (rebate, tax credit, renewable portfolio standard, etc). Program type IDs can be found in the program_type table.
- `created_by_user_id`: Indicates the DSIRE staff member who created the entry.
- `code`: Legacy incentive/policy IDs from old DSIRE
- `name`: The name of the policy or incentive
- `updated_ts`: Date for when the entry was last reviewed and updated by a DSIRE staff member
- `created_ts`: Date for when the entry was first created by a DSIRE staff member
- `published`: Indicates whether or not the entry appears on the public site. DSIRE never displays programs after they expire. DSIRE also never deletes old prorgams when they expire, we just remove them from the public site. "1" indicates that the program is visible on the public side of DSIRE, thus currently available. "0" indicates that the program is hidden from the public site, and thus, not available.
- `websiteurl`: Source page for the program, where users can go for more details.
- `administrator`: Name of the company, organization, etc that administers the program.
- `fundingsource`: When availabile, indicates where the funding for a program comes from.
- `budget`: When availabile, indicates the total funding for a program.
- `start_date`: Date field that indicates when the program started
- `start_date_text`: Text that may be needed to explain the state date.
- `end_date`: Date field that indicates when the program will end
- `end_date_text`: Text that may be needed to explain the end date.
- `summary`: Narative summary of the policy/incentive. Text includes HTML code.
- `additional_technologies`: Text field that captures any one-off technologies that are eligible for a certain policy/incentive, but are not included in the technology table.


### `program_category`
All programs in DSIRE are either financial incentives or regulatory policies. This table provides a unique identifier to indicate whether a program is a financial incentive or a regulatory policy.

- `id`: A unique identifier to indicate whether a program is a financial incentive or a regulatory policy.


### `program_city`
Match table used in assigning zip codes to programs. Pulls from Program table and City table. Matches specific programs with the zip codes located within specific cities.

- `program_id`: A unique identifier for each policy/incenitve in DSIRE. Program IDs can be found in the Program table.
- `city_id`: A unique identifier for each city. City IDs can be found in the City table.


### `program_contact`
Match table used to assign contacts to programs. Pulls from Program table and Contact table.

- `id`: A unique identifier for each combination of contacts and programs.
- `program_id`: A unique identifier for specific programs. Pulls from Program table.
- `contact_id`: Match table used to assign contacts to programs. Pulls from Program table and Contact table.
- `webvisible`: Some contacts are only viewable to DSIRE staff. "1" in this field indicates that the contact is visible to the public.


### `program_county`
Match table used in assigning zip codes to programs. Pulls from Program table and County table. Matches specific programs with the zip codes located within specific counties.

- `program_id`: A unique identifier for each policy/incenitve in DSIRE. Program IDs can be found in the Program table.
- `county_id`: A unique identifier for each county. County IDs can be found in the County table.


### `program_detail`
"Program details" are found towards the top of every DSIRE entry, under "Program Overview". Different program types include different program details. This table provides the content of the program details for every entry in DSIRE.

- `id`: A unique identifier for every combination of program IDs and corresponding program detail.
- `program_id`: Pulled from Program file. Each program in DSIRE has a unique identifier. Program_id in this file indicates the program in DSIRE that is associated with the program detail id.
- `label`: Name of the Program Detail
- `value`: Content for the corresponding program detail label for that program ID
- `display_order`: Order in which the program details are displayed in a DSIRE entry
- `template_id`: Pulled from program_detail_template table. An identifier that matches program types to program detail labels.


### `program_detail_template`
Program details are found towards the top of every DSIRE entry, under "Program Overview". Different program types include different program details. This table matches program types with details fields (labels).

- `id`: A unique identifier for matching program types with program details (labels)
- `type_id`: A unique identifier for each type of program in DSIRE. Pulled from program_type table.
- `label`: Name of the Program Detail
- `display_order`: Order in which the program details are displayed in a DSIRE entry


### `program_sector`
Match table used in matching eligible sectors to specific programs. Eligible sector are the types of people or entities (residential, commercial, etc.) that are eligible for a particular incentive/policy. Pulls from program table and sector table.

- `program_id`: A unique identifier for each policy/incenitve in DSIRE. Program IDs can be found in the Program table.
- `sector_id`: A unique identifier for each eligible sector found in DSIRE. Pulled from sector table.


### `program_technology`
Match table used in matching eligible technologies to specific programs. Pulls from program table and technology table.

- `program_id`: A unique identifier for each policy/incenitve in DSIRE. Program IDs can be found in the Program table.
- `technology_id`: A unique identifier for each eligible technology found in DSIRE. Pulled from technology table.


### `program_type`
Program type refers to the types of policies or incentives included in DSIRE (rebate, tax credit, renewable portfolio standard, etc)

- `id`: A unique identifier for every type of policy/incentive in DSIRE
- `program_category_id`: Indicates whether the program is an incentive or a regulatory policy. Program category IDs can be found in the program_category table.


### `program_utility`
Match table used in assigning zip codes to programs. Pulls from Program table and utilty table. Matches specific programs with the zip codes associated with specific utilities.

- `program_id`: A unique identifier for each policy/incenitve in DSIRE. Program IDs can be found in the Program table.
- `utility_id`: A unique identifier for each utility. Utility IDs can be found in the utility table.


### `program_zipcode`
Match table used to match program IDs with zipcode ID. Pulls from zipcode table and program table.

- `program_id`: A unique identifier for each policy/incenitve in DSIRE. Program IDs can be found in the Program table.
- `zipcode_id`: A unique identifier for each zip code.


### `search_log`
Archives all filters applied to DSIRE's programs page by users. Not necessary for reconstructing DSIRE database.

- No field definitions listed; not required for public clone except optional analytics.


### `sector`
Includes all sectors that can be eleigible for an incentive or policy.

- `id`: A unique identifier for each eligible sector
- `name`: Name of the eligible sector as it is displayed on the public site
- `fieldname`: Name of the eligible sector as it is logged in the database
- `is_selectable`: Some sectors are legacy sectors transferred over from the old version of DSIRE. Is_selectable determines whether or not this sector is active in DSIRE. 1 = active; 0 = not active
- `parent_id`: Used for grouping similar sector types.


### `state`
Table of states and territories

- `id`: A unique identifier for each state/territory
- `abbreviation`: Postal abbreviation
- `name`: State name
- `is_territory`: 0 = not territory; 1= is territory


### `subscription_memo`
DSIRE analysts use this field to provide a short summary of changes whenever a policy or incentive is updated.

- `id`: A unique identifier for each subscription memo entry
- `program_id`: Pulled from Program table. Each program in DSIRE has a unique identifier. Program_id in this file indicates the program in DSIRE that is associated with the subscription memo.
- `added_by_user`: identifier for the DSIRE analyst who added the memo
- `Added`: Timestamp for when the memo was added
- `memo`: Content of the memo; description of what changed with the policy/incentive.


### `technology`
Table of renewable energy and energy efficiency technology types contained in DSIRE

- `id`: A unique identifier for every technology type
- `name`: name of the technology
- `technology_category_id`: Pulled from Technology_Category file. Indicates the parent technology for the specific technology type
- `active`: Indicates whether the technology is currently being used by DSIRE. 1 = yes; 0 = No, legacy technology no longer within the scope of DSIRE.


### `technology_category`
All technologies in DSIRE are organized under parent technologies --- solar technologies, HVAC, etc --- for easier sorting

- `id`: A unique identifier for technology categories
- `energy_category_id`: Pulled from energy_category table. A unique identifier to indicate whether a technology is a renewable energy or energy efficiency technology.


### `utility`
Table of utilities.

- `id`: A unique identifier for each utility, which used by DSIRE
- `name`: Utility name
- `state_id`: Pulled from state table. A unique identifier for every state/territory
- `utility_id`: Different than column A. This is the Utility ID used by EIA.


### `utility_zipcode`
Assigns zip codes to utilities

- `utility_id`: Pulled from utility table. A unique identifier for each utility.
- `zipcode_id`: Pulled from zipcode table. A unique identifier for every zipcode.


### `zipcode`
All policies/incentives in DSIRE are associated with zipcodes. This table is used to assign an id to every zipcode and to identify where those zip codes are located.

- `id`: A unique identifier for every zipcode
- `zipcode`: Actual zip code. Leading zeros have been removed from zipcodes that start with one or more zeros.
- `city_id`: Pulled from city table. A unique identifier for each city. Used here to indicate which city the zipcode is located within.
- `state_id`: Pulled from state table. A unique identifier for each city. Used here to indicate which state the zipcode is located within.
- `county_id`: Pulled from county table. A unique identifier for each city. Used here to indicate which county the zipcode is located within.


## Appendix C. Historical/deprecated public API compatibility notes
The deprecated NLR Energy Incentives v2 API returned a service metadata wrapper plus an array of incentives. Result fields included category_name, incentive_code, program_id, program_name, summary, public_url, regions with name/type, and technologies with category/name. [S8]

Historical category query options included appliances, biomass, building_envelope, fuel_cells, geothermal_technologies, HVAC, hydroelectric, industrial_equipment, lighting, ocean_technologies, other, solar_technologies, and wind. [S8]

Use these historical fields only to support import/compatibility for old public exports. Current clone behavior should be based on current licensed DSIRE data/API or your own source data.

## Appendix D. Example SQL for faceted program search
```sql
WITH zip_context AS (
  SELECT z.id AS zipcode_id, z.state_id, z.city_id, z.county_id
  FROM zipcode z
  WHERE z.zipcode = :zip
), zip_utilities AS (
  SELECT uz.utility_id
  FROM utility_zipcode uz
  JOIN zip_context zc ON zc.zipcode_id = uz.zipcode_id
), base AS (
  SELECT DISTINCT p.id
  FROM program p
  LEFT JOIN zip_context zc ON true
  WHERE p.published = true
    AND (:category_ids IS NULL OR p.program_category_id = ANY(:category_ids))
    AND (:type_ids IS NULL OR p.program_type_id = ANY(:type_ids))
    AND (:implementing_sector_ids IS NULL OR p.implementing_sector_id = ANY(:implementing_sector_ids))
    AND (:state_ids IS NULL OR p.state_id = ANY(:state_ids))
    AND (:eligible_sector_ids IS NULL OR EXISTS (
      SELECT 1 FROM program_sector ps
      WHERE ps.program_id = p.id AND ps.sector_id = ANY(:eligible_sector_ids)
    ))
    AND (:technology_ids IS NULL OR EXISTS (
      SELECT 1 FROM program_technology pt
      WHERE pt.program_id = p.id AND pt.technology_id = ANY(:technology_ids)
    ))
    AND (:technology_category_ids IS NULL OR EXISTS (
      SELECT 1
      FROM program_technology pt
      JOIN technology t ON t.id = pt.technology_id
      WHERE pt.program_id = p.id AND t.technology_category_id = ANY(:technology_category_ids)
    ))
    AND (:zip IS NULL OR (
         p.implementing_sector_id IN (SELECT id FROM implementing_sector WHERE slug = 'federal')
      OR (p.state_id = zc.state_id AND p.is_entire_state = true)
      OR EXISTS (SELECT 1 FROM program_zipcode pz WHERE pz.program_id = p.id AND pz.zipcode_id = zc.zipcode_id)
      OR EXISTS (SELECT 1 FROM program_city pc WHERE pc.program_id = p.id AND pc.city_id = zc.city_id)
      OR EXISTS (SELECT 1 FROM program_county pc WHERE pc.program_id = p.id AND pc.county_id = zc.county_id)
      OR EXISTS (SELECT 1 FROM program_utility pu WHERE pu.program_id = p.id AND pu.utility_id IN (SELECT utility_id FROM zip_utilities))
    ))
)
SELECT p.*
FROM program p
JOIN base b ON b.id = p.id
ORDER BY p.updated_at DESC, p.name ASC
LIMIT :limit OFFSET :offset;
```

## Appendix E. Source bibliography

- [S1] DSIRE FAQ: https://dsireusa.org/support/frequently-asked-questions-faq/ — Official description of database scope, public filters, update practices, utility/local coverage rules, and incentive/policy categories.
- [S2] DSIRE API page: https://dsireusa.org/dsire-api/ — Official description of subscriber API, real-time access, zip-code association, quantitative incentive data, qualitative details, and filtering by 124 technologies.
- [S3] DSIRE Glossary: https://dsireusa.org/support/glossary/ — Official program-category and program-type definitions.
- [S4] DSIRE Database Archives and Read-Me.xlsx field-definition workbook: https://dsireusa.org/resources/database-archives/ — Official monthly-export page and workbook describing table names, table purposes, and field definitions.
- [S5] DSIRE About Us / license notice: https://dsireusa.org/about-us/ — Official attribution, operator, disclaimer, CC-BY-SA 4.0 database license, and trademark notice.
- [S6] DSIRE Programs and detail-page templates: https://programs.dsireusa.org/system/program/detail/1235 — Public UI layout showing Program Overview, Incentives/parameter sets, Summary, Authorities, Contact, and Memos sections.
- [S7] DSIRE Summary Maps and Summary Tables: https://programs.dsireusa.org/system/program/maps — Public summary-map/table behavior and high-level filters: Program Type, Category, Technology.
- [S8] NLR deprecated DSIRE Energy Incentives API documentation: https://developer.nlr.gov/docs/electricity/energy-incentives-v2/ — Historical public API field evidence; useful for compatibility, but not a current source of truth.
- [S9] Public DSIRE-API repository snapshot: https://github.com/DSSD-Madison/DSIRE-API — Public implementation reference for a GraphQL API shape; not treated as the authoritative current production schema.