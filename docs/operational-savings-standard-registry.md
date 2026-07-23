# Operational Savings Standard Registry

This registry is the canonical source for every external lookup or calculation method referenced by the operational-savings information trees.
It specifies screening-grade annual direct resource value, not project cost, incentives, emissions, resilience value, or investment-grade engineering.
External data must be ingested or executed locally unless a Standard explicitly says otherwise.

## Status rules

Allowed Standard statuses are `DRAFT`, `RESEARCHED — READY FOR HUMAN REVIEW`, `BLOCKED`, and `LIMITED`.
`LIMITED` means the source is usable only within the stated coverage or access boundary.
No Standard is finalized by this document.

## Canonical Standards

### ■ STD-COMSTOCK-ANNUAL-DELTA - ComStock annual upgrade resource delta

**Status:** LIMITED

**Purpose:** Return annual electricity and fuel deltas for a documented commercial-building upgrade scenario matched to a Stage 1 building archetype.

**Source:** National Laboratory of the Rockies, [ComStock 2025 Release 3 data](https://natlabrockies.github.io/ComStock.github.io/docs/data.html), [upgrade-measure crosswalk and documentation](https://natlabrockies.github.io/ComStock.github.io/docs/upgrade_measures/upgrade_measures.html), and [2025 Release 3 reference documentation](https://natlabrockies.github.io/ComStock.github.io/assets/files/comstock_reference_documentation_2025_3.pdf).
The data page identifies the OEDI release, directory layout, data dictionary, enumerations, upgrade lookup, and crosswalk.
The measure page identifies the stable measure IDs and the assumptions behind each scenario.
The reference PDF supplies the model, sampling, and applicability method.

**Lookup Inputs:**

- `canonical_retrofit` - [Required] Canonical retrofit ID from the linked opportunity.
- `site_geography` - [Required] Site state or county.
- `building_type` - [Required] Canonical commercial building type.
- `floor_area` - [Required] Profile floor area used to select the floor-area bin and scale the result.
- `existing_condition` - [Required] Existing-condition selector for the documented measure.
- `proposed_option` - [Required] Proposed-option selector for the documented measure.

**Value Needed:** Weighted median annual resource delta per square foot for each modeled resource, plus the 25th and 75th percentiles, applicability share, sample count, release ID, and measure ID.

**Resolution Contract:**

- **Resolver Type:** Method resolver.
- **Supported Scenarios:** exact-input; class-or-context-estimate; linked-opportunity-constrained-input; insufficient-data.
- **Scenario Output Behavior:** Return no estimate until the exact release crosswalk and eligible baseline-upgrade population are materialized in a reviewed aggregate fixture.
- **Low/Base/High Rule:** The intended weighted 25th percentile, median, and 75th percentile remain disabled until the eligible population, filters, weights, and sample count are captured in that fixture.
- **Uncertainty Rule:** Low for an exact documented archetype match with strong applicability, moderate for broader bins, and high when applicability is sparse.
- **Exact Override:** A validated exact model, measurement, or project specification overrides the corresponding estimated value and records the exact source.
- **Source Version:** Pinned ComStock release ID, upgrade ID, and source-file checksum.
- **Selected Class or Candidate Set:** Use only the reviewed retrofit-to-measure allowlist and the matching geography, building type, and floor-area bin.
- **Assumptions:** The source sample represents the screened site within the displayed applicability and distribution limits.
- **Editable:** Yes. Every estimated input and result remains visible and can be replaced by a validated exact value.
- **No-Estimate Rule:** Return no estimate for a retrofit outside the allowlist or when the required source bin is empty.

**How to Use:** Download `measure_name_crosswalk.csv`, `upgrades_lookup.json`, `data_dictionary.tsv`, `enumeration_dictionary.tsv`, and the individual-building `metadata_and_annual_results` files for `2025/comstock_amy2018_release_3` from OEDI.
Map only taxonomy types listed for ITC-01 to an explicit universal measure ID documented on the upgrade-measure page.
Return no lookup record when the linked opportunity's physical scope does not exactly match that documented measure, even when the taxonomy label is broader.
Filter by geography, building type, and floor-area bin, then retain applicable baseline and upgrade pairs.
For each resource `r`, calculate `delta_r = baseline_annual_r - upgrade_annual_r` and summarize the building-weighted distribution.
Store one local versioned record keyed by release, measure ID, geography level, building type, and area bin with median, quartiles, applicability share, and sample count.
Scale the selected per-square-foot delta by profile floor area, but cap avoided consumption at the corresponding annual bill resource use.
Do not combine separately modeled ComStock measures, and do not use California service-water-heating fields from Release 3.

The reviewed taxonomy-to-measure allowlist is:

| Canonical retrofit ID | Allowed ComStock universal measure ID selections |
|---|---|
| `led_lighting_retrofit` | `ltg_0001` |
| `lighting_controls_retrofit` | `ltg_0002` |
| `high_efficiency_hvac_replacement` | `hvac_0024`, `hvac_0028` |
| `heat_pump_hvac_retrofit` | `hvac_0003`, `hvac_0004`, `hvac_0005`, `hvac_0006`, `hvac_0010`, `hvac_0018`, `hvac_0020`, `hvac_0025` |
| `smart_thermostat_zoning_retrofit` | `hvac_0030` only when the linked scope is thermostat setback control |
| `hvac_controls_retrofit` | `hvac_0012`, `hvac_0014`, `hvac_0031` |
| `energy_recovery_ventilation_retrofit` | `hvac_0008` |
| `high_efficiency_boiler_retrofit` | `hvac_0026` |
| `ground_source_geothermal_heat_pump` | `hvac_0015`, `hvac_0016`, `hvac_0017` |
| `insulation_upgrade` | `env_0001`, `env_0002` |
| `window_replacement` | `env_0005` |
| `window_film_shading_retrofit` | `env_0004` only when the linked scope is window film |
| `demand_controlled_ventilation` | `hvac_0007` |

The adapter must reject package IDs and any unlisted measure ID.

**Automation:**

- **Selected Strategy:** Periodic OEDI ingestion into a compact local aggregate lookup.
- **Automation Method:** A build-time downloader validates checksums and release metadata, reads only dictionary-selected columns from individual-building Parquet files, joins baseline and upgrade rows by building ID, computes weighted summaries, and emits a compact versioned artifact plus provenance manifest.
- **Difficulty:** Medium.
- **Efficient Build-Time Estimate:** 2 to 3 developer days.
- **Expected Accuracy or Uncertainty:** Moderate to high uncertainty for an individual building and lower uncertainty for archetype screening.
- **Basis:** ComStock is calibrated stock simulation, but published guidance warns that individual buildings lack many characteristics that govern measure applicability and that small samples require care.
- **Why This Is the Best Value-for-Time Strategy:** It supplies physics-based, climate- and building-sensitive resource deltas without operating millions of simulations or adding many Stage 1 questions.
- **Access, Refresh, Versioning, and Maintenance Requirements:** Public download with no runtime credential; pin a release, retain checksums and crosswalk, ingest only after known-issue review, and reassess mappings on each release.

**Used By:** ITC-01.

### ■ STD-SCOUT-ECM-SCREEN - Scout ECM performance screen

**Status:** LIMITED

**Purpose:** Resolve a screening resource-reduction factor for building measures that lack an exact current ComStock upgrade record.

**Source:** U.S. Department of Energy, [Scout program description](https://www.energy.gov/cmei/buildings/scout), [Scout ECM summaries](https://scout.energy.gov/), and [Scout source repository](https://github.com/scout-bto/scout).
DOE establishes Scout as a building ECM impact model.
The ECM summaries expose measure definitions.
The repository supplies versioned definitions and processing code.

**Lookup Inputs:**

- `canonical_retrofit` - [Required] Canonical retrofit ID from the linked opportunity.
- `building_type` - [Required] Commercial building type.
- `climate_zone` - [Required] Climate zone resolved from the site location.
- `building_vintage` - [Required] Existing building vintage class.
- `end_use_and_fuel` - [Required] Affected end use and fuel.
- `existing_condition` - [Required] Existing-condition selector.
- `proposed_option` - [Required] Proposed-option selector.

**Value Needed:** Applicable annual fractional resource reduction by fuel and end use, the underlying performance assumption, Scout version, and supported market segment.

**Resolution Contract:**

- **Resolver Type:** Method resolver.
- **Supported Scenarios:** exact-input; class-or-context-estimate; linked-opportunity-constrained-input; insufficient-data.
- **Scenario Output Behavior:** Return no estimate until an exact ECM definition, performance field, and market segment are captured in a reviewed fixture.
- **Low/Base/High Rule:** Use only source-explicit low, typical, and high cases after the exact definition is pinned. Do not calculate an inferred distribution.
- **Uncertainty Rule:** High unless the ECM definition and market segment match exactly.
- **Exact Override:** A validated exact model, measurement, or project specification overrides the corresponding estimated value and records the exact source.
- **Source Version:** Pinned Scout release, ECM definition identifier, and source checksum.
- **Selected Class or Candidate Set:** Use an exact ECM definition, fuel, end use, climate, building type, and vintage match.
- **Assumptions:** The selected Scout segment is applicable to the screened building and retrofit scope.
- **Editable:** Yes. Every estimated input and result remains visible and can be replaced by a validated exact value.
- **No-Estimate Rule:** Return no estimate when matching would depend on keywords, interpolation outside source coverage, or an unsupported segment.

**How to Use:** Pin a Scout release, inspect `ecm_definitions` for an exact measure definition, and reject semantic keyword matches.
Extract performance, market, end use, fuel, climate, and vintage fields from the definition and compute the implied fractional reduction with the pinned Scout code.
Store a local record keyed by Scout version, canonical retrofit ID, building type, climate zone, vintage class, end use, and fuel.
Return no estimate when an exact definition, supported segment, or valid performance field is absent.
Do not import Scout costs, emissions, adoption, or national market totals.

**Automation:**

- **Selected Strategy:** Version-pinned local definition ingestion with an explicit reviewed taxonomy crosswalk.
- **Automation Method:** Parse the open-source ECM definitions, validate required fields against Scout schemas, and build a compact resource-factor table.
- **Difficulty:** Medium.
- **Efficient Build-Time Estimate:** 2 developer days after the five crosswalk decisions are approved.
- **Expected Accuracy or Uncertainty:** High uncertainty for individual sites.
- **Basis:** Scout is designed for national and segment impacts, not individual-building prediction, and the exact five taxonomy mappings have not yet been human-approved.
- **Why This Is the Best Value-for-Time Strategy:** It is the strongest open federal fallback for these gaps while making unsupported site precision impossible.
- **Access, Refresh, Versioning, and Maintenance Requirements:** Public source; pin tags and definition commit, keep the crosswalk under review, and block a record when its schema or definition changes.

**Used By:** ITC-05, ITC-11, and ITC-14.

### ■ STD-DOE-CCMS-RATINGS - DOE certified equipment ratings

**Status:** LIMITED

**Purpose:** Resolve certified current or proposed equipment energy and water performance by basic model.

**Source:** U.S. Department of Energy, [Compliance Certification Database](https://www.regulations.doe.gov/certification-data/), [CCMS and database description](https://www.energy.gov/cmei/buildings/implementation-certification-and-enforcement), and [product-specific certification and test-result templates](https://www.energy.gov/cmei/buildings/standardized-templates-recording-test-results).
The database is the public source of manufacturer certification reports.
The templates define product-specific fields and units.

**Lookup Inputs:**

- `ccms_product_context` - [Required] Recognizable product group or application and proposed scope needed to select a compatible equipment class.
- `ccms_exact_product` - [Optional] Exact manufacturer, basic model number, certified rating, and capacity or size when known.
- `linked_opportunity` - [Conditional] Product, certification, class, or minimum-performance restriction when a Linked Opportunity supplies one.

**Value Needed:** The certified efficiency, capacity, annual or daily resource use, test-procedure identifier, units, certification date, and active-record status required by the category.

**Resolution Contract:**

- **Resolver Type:** Equipment resolver.
- **Supported Scenarios:** exact-current-model; linked-opportunity-exact-product; linked-opportunity-product-class; no-product-restriction; no-linked-opportunity; exact-proposed-model; insufficient-data.
- **Scenario Output Behavior:** Return an exact certified value only for an unambiguous model present in a reviewed snapshot; apply proposed-product restrictions only to compatible current records; otherwise return no estimate.
- **Low/Base/High Rule:** For an exact reviewed record set low, base, and high to the certified value. No generic percentile is supported until a product-specific eligible population, filters, and sample size have a reviewed fixture.
- **Uncertainty Rule:** Low for the certified value of an exact active record, moderate for a verified compatible proposed class, and unresolved for an unknown existing model.
- **Exact Override:** A validated exact model, measurement, or project specification overrides the corresponding estimated value and records the exact source.
- **Source Version:** Export date, product group, certification record identifiers, test procedure, and export checksum.
- **Selected Class or Candidate Set:** Filter active records by product-specific fields, equipment class, capacity or service requirement, opportunity restrictions, and compatibility. Record filters and sample size before any distribution is enabled.
- **Assumptions:** Certified test values are comparable only inside the same product group, test procedure, and compatible service class.
- **Editable:** Yes. Every estimated input and result remains visible and can be replaced by a validated exact value.
- **No-Estimate Rule:** Return no estimate when no compatible active record or defensible equipment class remains after filtering.

**How to Use:** An analyst exports the requested product-group report from the public Compliance Certification Database because anonymous automated requests to the direct database returned HTTP 403 during this audit.
Select an exact normalized manufacturer and basic-model match, then disambiguate with equipment class and capacity.
Read only fields defined in the current product-specific template and preserve the reported units and test-procedure version.
Store a local slowly changing dimension keyed by product group, manufacturer, basic model, class, and certification effective date.
Return no model rating on ambiguous or withdrawn matches.
An existing model may use this Standard only when that exact model is present in a retained reviewed snapshot.
Current efficient records must not be used as an installed existing-equipment distribution.
Type-only, Profile, and Bill fallbacks are unsupported until a separate installed-baseline source and mapping are reviewed.
When a Linked Opportunity names exact products, restrict the candidate set to those products.
When it specifies a class, certification, or minimum performance, filter active compatible records to those requirements.
When it has no product restriction or no Linked Opportunity exists, build the compatible candidate set from application, service need, site context, and source data without claiming an exact model.
An exact proposed model overrides a proposed candidate set after compatibility validation.
Usage and operating schedules require separate evidence and must not be inferred from certification records.
Return no estimate when product compatibility or a required usage basis cannot be established.

**Automation:**

- **Selected Strategy:** Analyst-exported, versioned local snapshots for only the covered product groups.
- **Automation Method:** Product-specific adapters ingest saved database exports into a normalized rating table while retaining raw field names and provenance.
- **Difficulty:** Medium.
- **Efficient Build-Time Estimate:** 3 to 5 developer days for the product groups used here.
- **Expected Accuracy or Uncertainty:** Low uncertainty for a correctly matched certified model; high uncertainty when the current model is unknown.
- **Basis:** Manufacturers certify the values under DOE test procedures, but model identity is project-specific and cannot be inferred safely.
- **Why This Is the Best Value-for-Time Strategy:** It reuses mandatory federal certifications without building a brittle scraper against an interface that blocks anonymous automation.
- **Access, Refresh, Versioning, and Maintenance Requirements:** The public interactive database is human-accessible, while anonymous automated retrieval returned HTTP 403; export quarterly until DOE provides a stable approved machine endpoint, record retrieval date and template version, retain superseded records, and monitor product-field changes.

**Used By:** ITC-03, ITC-06, ITC-07, ITC-10, ITC-13, ITC-50, ITC-52, and ITC-53.

### ■ STD-ENERGY-STAR-PRODUCT-DATA - ENERGY STAR product datasets

**Status:** LIMITED

**Purpose:** Resolve current certified high-efficiency product performance and EVSE standby or charging efficiency.

**Source:** U.S. Environmental Protection Agency, [ENERGY STAR Product Finder datasets and API](https://www.energystar.gov/productfinder/advanced), [EV charger product criteria and finder](https://www.energystar.gov/products/ev_chargers), [commercial clothes washer dataset](https://data.energystar.gov/Active-Specifications/ENERGY-STAR-Certified-Commercial-Clothes-Washers/9g6r-cpdt), [commercial ice machine dataset](https://data.energystar.gov/Active-Specifications/ENERGY-STAR-Certified-Commercial-Ice-Machines/nak5-fsjf), [commercial dishwasher dataset](https://data.energystar.gov/Active-Specifications/ENERGY-STAR-Certified-Commercial-Dishwashers/pk8q-dim8), [commercial fryer dataset](https://data.energystar.gov/Active-Specifications/ENERGY-STAR-Certified-Commercial-Fryers/edi8-b5vk), [commercial oven dataset](https://data.energystar.gov/Active-Specifications/ENERGY-STAR-Certified-Commercial-Ovens/c8av-ccf7), and [commercial steam cooker dataset](https://data.energystar.gov/Active-Specifications/ENERGY-STAR-Certified-Commercial-Steam-Cookers/vtsv-aq9u).
The advanced page exposes downloadable datasets that are updated daily.
The product pages define fields and certified-product scope.

**Lookup Inputs:**

- `energy_star_product_context` - [Required] Recognizable product category or application and proposed scope needed to select a compatible certified class.
- `energy_star_exact_product` - [Optional] Exact manufacturer, model, certified rating, and capacity or size when known.
- `linked_opportunity` - [Conditional] Product, certification, class, or minimum-performance restriction when a Linked Opportunity supplies one.

**Value Needed:** Category-specific certified energy, water, capacity, efficiency, and low-power-state fields with units and certification dates.

**Resolution Contract:**

- **Resolver Type:** Equipment resolver.
- **Supported Scenarios:** linked-opportunity-exact-product; linked-opportunity-product-class; no-product-restriction; no-linked-opportunity; exact-proposed-model; insufficient-data.
- **Scenario Output Behavior:** Return current certified fields for an exact proposed model or a compatible proposed-product set; never use the current certified set as an existing installed baseline.
- **Low/Base/High Rule:** For an exact proposed model use the certified value in all three positions. A proposed-product distribution remains disabled until the adapter records the eligible population, filters, sample size, and fixture.
- **Uncertainty Rule:** Low for a certified field from an exact proposed model, moderate for a fixture-backed compatible proposed class, and unresolved for existing equipment or site usage.
- **Exact Override:** A validated exact model, measurement, or project specification overrides the corresponding estimated value and records the exact source.
- **Source Version:** Dataset update date, certification identifier, category schema version, and downloaded-file checksum.
- **Selected Class or Candidate Set:** Filter proposed products by exact dataset fields for application, subtype, capacity or service requirement, opportunity certification or product constraints, and active certification status. Preserve the sample size.
- **Assumptions:** Candidate records are technically compatible after the declared filters, but no exact purchase is implied until a model is selected.
- **Editable:** Yes. Every estimated input and result remains visible and can be replaced by a validated exact value.
- **No-Estimate Rule:** Return no estimate when no compatible candidate set exists or the required performance field is absent.

**How to Use:** Download the category dataset rather than calling the API at calculation time.
Keep the EPA field names in raw storage and normalize only fields used by a documented category adapter.
Select exact manufacturer and model matches, then validate subtype and capacity.
Do not return a proposed generic median or quartiles until the exact subtype and capacity filters, eligible population, sample size, and representative source rows are fixture-tested.
Store dataset publication date, specification version, and product status.

The adapter contracts use these source-reported field families:

| Category | Required source-reported field families |
|---|---|
| `ITC-13` ice machines | Harvest rate, energy use per 100 pounds of ice, and potable water per 100 pounds of ice |
| `ITC-53` commercial clothes washers | Tub volume, modified or integrated energy factor, integrated water factor, and certified annual energy assumptions |
| `ITC-27` and `ITC-28` EVSE | Equipment subtype, rated output, active efficiency where reported, and low-power-state demand |
| `ITC-50` fryers, ovens, and steamers | Product subtype, fuel, cooking energy efficiency, idle energy rate, and reported water rate where applicable |
| `ITC-52` commercial dishwashers | Machine type, sanitation method, water per rack or hour, machine idle rate, and booster-heater idle rate |

Do not infer a missing source-reported field from another product family.
Do not use the active certified dataset as an existing-equipment source.
Existing ratings require an exact retained historical record, nameplate, measurement, or a separate installed-baseline source.
Profile and Bill fallbacks are unsupported because the current canonical schemas do not identify a product model or source-defined product class.
When a Linked Opportunity names exact products, restrict the candidate set to those products.
When it specifies a class, certification, or minimum performance, filter compatible current records to those requirements.
When it has no product restriction or no Linked Opportunity exists, build the candidate set from application, service need, site context, and current certified data without claiming an exact model.
An exact proposed model overrides a proposed candidate set after compatibility validation.
Usage and operating schedules require separate evidence and must not be inferred from product records.
Return no estimate when product compatibility or a required usage basis cannot be established.

**Automation:**

- **Selected Strategy:** Nightly or weekly bulk-dataset ingestion into local category adapters.
- **Automation Method:** Download, schema-diff, validate units, deduplicate model records, and publish a versioned normalized table.
- **Difficulty:** Easy to Medium.
- **Efficient Build-Time Estimate:** 2 to 3 developer days for all referenced categories.
- **Expected Accuracy or Uncertainty:** Low for exact model matches and moderate for generic proposed selections.
- **Basis:** Values are certified, while generic selection spans real product variation.
- **Why This Is the Best Value-for-Time Strategy:** Daily downloadable authoritative data avoids runtime network dependence and covers several categories with one maintained pipeline.
- **Access, Refresh, Versioning, and Maintenance Requirements:** Public; capture download date and specification version, alert on column changes, and retain inactive models for existing-equipment matching.

**Used By:** ITC-06, ITC-07, ITC-10, ITC-13, ITC-27, ITC-28, ITC-50, ITC-52, and ITC-53.

### ■ STD-DOE-MEASUR - DOE MEASUR engineering calculators

**Status:** LIMITED

**Purpose:** Calculate equipment and industrial-system resource use from the minimum measured or confirmed operating inputs.

**Source:** U.S. Department of Energy, [MEASUR tool and downloads](https://www.energy.gov/cmei/ito/measur), [calculator list and descriptions](https://www.energy.gov/cmei/amo/measur-calculator-list-and-descriptions), and [ORNL MEASUR source repository](https://github.com/ORNL-AMO/AMO-Tools-Desktop).
The tool page identifies the open-source assessment modules.
The calculator page identifies the supported lighting, motor, pump, fan, compressed-air, process-heating, and steam calculations.

**Lookup Inputs:**

- `measur_calculator_inputs` - [Required] Every calculator-specific equipment, operating-point, schedule, and resource input shown as an atomic leaf in the applicable category tree; the category contract deterministically selects the calculator ID.

**Value Needed:** Existing and proposed annual resource use or avoided resource use, with the calculator version, input units, and warnings.

**Resolution Contract:**

- **Resolver Type:** Method resolver.
- **Supported Scenarios:** exact-input; insufficient-data.
- **Scenario Output Behavior:** Return calculator output only for a complete measured or user-confirmed input set; otherwise return no estimate.
- **Low/Base/High Rule:** Run the calculator independently for explicit low, base, and high input sets supplied for the project; never create ranges from generic defaults.
- **Uncertainty Rule:** Low to moderate with complete measured inputs and no estimate when a required operating condition is unresolved.
- **Exact Override:** A validated exact model, measurement, or project specification overrides the corresponding estimated value and records the exact source.
- **Source Version:** Pinned MEASUR release, calculator identifier, source commit, and adapter version.
- **Selected Class or Candidate Set:** Select the calculator by category contract; no equipment class supplies a missing project input in the current evidence contract.
- **Assumptions:** Units, operating point, schedule, and system boundaries match the selected calculator.
- **Editable:** Yes. Every estimated input and result remains visible and can be replaced by a validated exact value.
- **No-Estimate Rule:** Return no estimate when any calculator input required by the category contract is missing.

**How to Use:** Pin a MEASUR release and invoke its local calculation modules or port a formula only when its source implementation and tests are retained as executable fixtures.
Create one adapter per referenced calculator and reject incomplete required input sets.
Persist calculator ID, MEASUR version, normalized inputs, raw units, results, and warning codes.
Never substitute a calculator's typical default for a high-sensitivity project value without showing it as an editable estimate.

**Automation:**

- **Selected Strategy:** Local version-pinned calculator execution behind typed adapters.
- **Automation Method:** Package the supported open-source calculation functions, add golden tests from DOE examples, and expose only the approved minimum inputs.
- **Difficulty:** Medium.
- **Efficient Build-Time Estimate:** 5 to 7 developer days for the adapters used by this registry.
- **Expected Accuracy or Uncertainty:** Moderate uncertainty with field measurements and high uncertainty with estimated operating points.
- **Basis:** The equations are engineering-grade, but project inputs dominate uncertainty.
- **Why This Is the Best Value-for-Time Strategy:** One maintained federal tool covers the industrial families and preserves tested formulas without duplicating them in application code.
- **Access, Refresh, Versioning, and Maintenance Requirements:** Public and open source; pin releases, run golden tests before upgrades, retain input schema versions, and review changes annually.

**Used By:** ITC-04, ITC-09, ITC-12, ITC-36 through ITC-47, and ITC-51.

### ■ STD-SAM-SOLAR-THERMAL - SAM solar water-heating simulation

**Status:** LIMITED

**Purpose:** Return annual solar-thermal output and backup-resource displacement for a specified solar water-heating system.

**Source:** National Laboratory of the Rockies, [System Advisor Model](https://sam.nlr.gov/) and [SAM open-source repository](https://github.com/NatLabRockies/SAM).

**Lookup Inputs:**

- `site_coordinates` - [Required] Resolved site latitude and longitude.
- `solar_thermal_configuration` - [Required] Collector type, collector area, tilt, azimuth, and storage volume.
- `hot_water_load` - [Required] Annual delivered hot-water thermal load.
- `backup_resource` - [Required] Backup fuel and backup efficiency.

**Value Needed:** Monthly and annual useful solar thermal energy, backup-resource displacement, and unmet-load warnings.

**Resolution Contract:**

- **Resolver Type:** Method resolver.
- **Supported Scenarios:** exact-input; linked-opportunity-constrained-input; insufficient-data.
- **Scenario Output Behavior:** Return configured simulation output only when the complete collector design, load, backup system, and site inputs are supplied; otherwise return no estimate.
- **Low/Base/High Rule:** Run only explicit project-supplied low, base, and high configurations independently.
- **Uncertainty Rule:** Moderate with a specified configuration and no estimate when load or system geometry is unresolved.
- **Exact Override:** A validated exact model, measurement, or project specification overrides the corresponding estimated value and records the exact source.
- **Source Version:** Pinned SAM and SSC versions, weather-file identifier, and weather-file checksum.
- **Selected Class or Candidate Set:** Use only the supplied collector, storage, backup-resource, and load configuration for the declared application.
- **Assumptions:** Typical weather and the supplied load shape are representative for screening.
- **Editable:** Yes. Every estimated input and result remains visible and can be replaced by a validated exact value.
- **No-Estimate Rule:** Return no estimate when any required collector, storage, backup-resource, hot-water-load, or site input is missing.

**How to Use:** Run the pinned SAM solar-water-heating compute module locally with a weather file selected by coordinates.
Use the customer-confirmed system and hot-water-load inputs, convert useful thermal output to avoided backup resource with the confirmed backup efficiency, and cap displacement at the modeled delivered load.
Store SAM version, weather-file identifier, full inputs, annual output, and warnings.

**Automation:**

- **Selected Strategy:** Local SAM compute-module execution.
- **Automation Method:** Package a pinned SSC/PySAM module and weather-file cache with deterministic input and output schemas.
- **Difficulty:** Medium.
- **Efficient Build-Time Estimate:** 2 developer days.
- **Expected Accuracy or Uncertainty:** Moderate uncertainty.
- **Basis:** Weather and physics are modeled, while collector configuration and hot-water load remain project-sensitive.
- **Why This Is the Best Value-for-Time Strategy:** It is an authoritative maintained simulator and avoids a new solar-thermal model.
- **Access, Refresh, Versioning, and Maintenance Requirements:** Public and local; pin SAM and weather versions, refresh typical weather on a controlled cadence, and regression-test upgrades.

**Used By:** ITC-08.

### ■ STD-PVWATTS-V8 - PVWatts photovoltaic production

**Status:** LIMITED

**Purpose:** Resolve hourly and annual AC generation for a specified grid-connected PV array.

**Source:** National Laboratory of the Rockies, [PVWatts V8 API documentation](https://developer.nlr.gov/docs/solar/pvwatts/v8/) and [System Advisor Model repository](https://github.com/NatLabRockies/SAM).
PVWatts documents the required inputs and outputs.
SAM supplies the local PVWatts compute module.

**Lookup Inputs:**

- `site_coordinates` - [Required] Resolved site latitude and longitude.
- `pv_array_configuration` - [Required] DC capacity, module type, array type, losses, tilt, and azimuth.

**Value Needed:** Hourly or monthly AC kWh, annual AC kWh, capacity factor, weather-file identifier, and warnings.

**Resolution Contract:**

- **Resolver Type:** Method resolver.
- **Supported Scenarios:** exact-input; linked-opportunity-constrained-input; insufficient-data.
- **Scenario Output Behavior:** Return configured PVWatts output only for a complete supplied array design and site; otherwise return no estimate.
- **Low/Base/High Rule:** Run PVWatts only for explicit project-supplied low, base, and high configurations, with losses and geometry visible in every case.
- **Uncertainty Rule:** Moderate for screening with a complete design and no estimate when capacity, losses, geometry, or location is unresolved.
- **Exact Override:** A validated exact model, measurement, or project specification overrides the corresponding estimated value and records the exact source.
- **Source Version:** PVWatts V8 module version, SAM or SSC version, and weather-file identifier and checksum.
- **Selected Class or Candidate Set:** Use only the supplied project array configuration and any explicit Linked Opportunity constraints.
- **Assumptions:** Typical weather is representative; detailed shading remains outside PVWatts unless reflected in the supplied loss input.
- **Editable:** Yes. Every estimated input and result remains visible and can be replaced by a validated exact value.
- **No-Estimate Rule:** Return no estimate when any required PVWatts configuration or location input is missing.

**How to Use:** Execute the pinned PVWatts V8 compute module locally, using coordinates from the profile and customer-confirmed array configuration.
Retain hourly output when tariff export, demand, storage, or coincidence is evaluated.
For annual energy-only value, cap same-period onsite consumption offset at imported load and treat exported energy only under an explicit bill export-credit rule.

**Automation:**

- **Selected Strategy:** Local PVWatts module with a versioned weather cache.
- **Automation Method:** Wrap the SAM compute module in a deterministic service and persist inputs, outputs, version, and weather provenance.
- **Difficulty:** Easy to Medium.
- **Efficient Build-Time Estimate:** 1 to 2 developer days.
- **Expected Accuracy or Uncertainty:** Moderate uncertainty for screening.
- **Basis:** Production is weather- and configuration-sensitive, and no shading or detailed design is available at Stage 1.
- **Why This Is the Best Value-for-Time Strategy:** It matches the official API math without runtime API keys or availability risk.
- **Access, Refresh, Versioning, and Maintenance Requirements:** Public code; pin module and weather versions, refresh weather deliberately, and regression-test against documented API examples.

**Used By:** ITC-17, ITC-24, and ITC-26.

### ■ STD-WIND-SAM - Wind Toolkit and SAM small-wind production

**Status:** LIMITED

**Purpose:** Resolve annual generation for a specified small wind turbine at a specified hub height.

**Source:** National Laboratory of the Rockies, [WIND Toolkit](https://www.nlr.gov/grid/wind-toolkit), [WIND Toolkit download API](https://developer.nlr.gov/docs/wind/wind-toolkit/wtk-download/), and [System Advisor Model repository](https://github.com/NatLabRockies/SAM).
The Toolkit supplies location and height resource data.
SAM supplies the turbine power-curve simulation.

**Lookup Inputs:**

- `site_coordinates` - [Required] Resolved site latitude and longitude.
- `wind_system_configuration` - [Required] Hub height, exact turbine model or power curve, and losses.
- `analysis_year` - [Required] Analysis year used to select the wind-resource series.

**Value Needed:** Hourly and annual AC kWh, capacity factor, resource dataset version, and warnings.

**Resolution Contract:**

- **Resolver Type:** Method resolver.
- **Supported Scenarios:** exact-input; linked-opportunity-constrained-input; insufficient-data.
- **Scenario Output Behavior:** Return exact-curve simulation output only when the compatible turbine curve, hub height, losses, analysis year, and site are supplied; otherwise return no estimate.
- **Low/Base/High Rule:** Simulate only explicit project-supplied low, base, and high curve or loss cases after identical resource treatment.
- **Uncertainty Rule:** High without onsite resource validation and moderate only with a confirmed curve and representative resource point.
- **Exact Override:** A validated exact model, measurement, or project specification overrides the corresponding estimated value and records the exact source.
- **Source Version:** WIND Toolkit dataset version, resource point and height, SAM version, and turbine-curve identifier.
- **Selected Class or Candidate Set:** Use only the supplied compatible source-documented turbine curve and explicit opportunity restrictions.
- **Assumptions:** The gridded wind resource represents the microsite within the stated uncertainty.
- **Editable:** Yes. Every estimated input and result remains visible and can be replaced by a validated exact value.
- **No-Estimate Rule:** Return no estimate without a supplied valid height, compatible documented power curve, loss factor, and analysis year.

**How to Use:** Ingest the needed WIND Toolkit points and heights at build time or on a controlled analyst job, cache the weather series, and run the pinned SAM wind module locally against the exact turbine curve.
Reject estimates without a valid hub height and turbine curve.
Use hourly output for tariff coincidence and cap onsite offset at imported load for each interval.

**Automation:**

- **Selected Strategy:** Controlled WIND Toolkit ingestion plus local SAM execution.
- **Automation Method:** A credentialed build job downloads requested points, stores immutable resource files, and runs a versioned compute module at calculation time without network access.
- **Difficulty:** Hard.
- **Efficient Build-Time Estimate:** 3 to 4 developer days.
- **Expected Accuracy or Uncertainty:** High uncertainty without onsite resource validation.
- **Basis:** Gridded resource and terrain can differ materially from a turbine's actual microsite.
- **Why This Is the Best Value-for-Time Strategy:** It is the authoritative public resource while refusing false precision from generic capacity factors.
- **Access, Refresh, Versioning, and Maintenance Requirements:** API key and email are required for downloads; cache all source files, pin dataset and SAM versions, and refresh only when the resource dataset changes.

**Used By:** ITC-19 and ITC-26.

### ■ STD-REOPT-LOCAL-DISPATCH - REopt interval dispatch and bill optimization

**Status:** LIMITED

**Purpose:** Resolve direct bill change from storage, demand flexibility, managed charging, and composite distributed-energy dispatch.

**Source:** National Laboratory of the Rockies, [REopt API V3 documentation](https://developer.nlr.gov/docs/energy-optimization/reopt/v3/), [REopt.jl input reference](https://natlabrockies.github.io/REopt.jl/dev/reopt/inputs/), and [REopt.jl open-source package](https://github.com/NatLabRockies/REopt.jl).
The API documentation defines stable V3 inputs and outputs.
REopt.jl is the local optimization engine used by the API.

**Lookup Inputs:**

- `chronological_load_and_tariff` - [Required] Chronological site load, complete tariff, timezone, and analysis-year calendar.
- `reopt_category_constraints` - [Required] Applicable technology power, energy, efficiency, state, availability, event, or fixed-load-template constraints shown as atomic leaves in the category tree.

**Value Needed:** Baseline and proposed annual bill components, interval dispatch, imported and exported energy, monthly peaks, and solver status.

**Resolution Contract:**

- **Resolver Type:** Method resolver.
- **Supported Scenarios:** exact-input; linked-opportunity-constrained-input; insufficient-data.
- **Scenario Output Behavior:** Return baseline and proposed bill components only for an optimal deterministic run with complete chronological load and tariff inputs.
- **Low/Base/High Rule:** Run only explicit project-supplied low, base, and high technology or availability cases independently; exact fixed inputs use identical values in all cases.
- **Uncertainty Rule:** Moderate with complete interval, tariff, technology, and operating inputs and no estimate when a required constraint is missing.
- **Exact Override:** A validated exact model, measurement, or project specification overrides the corresponding estimated value and records the exact source.
- **Source Version:** Pinned REopt.jl release, solver version, tariff version, and category-adapter version.
- **Selected Class or Candidate Set:** Use only the supplied technology design, fixed-load adapter, and any explicit Linked Opportunity constraints.
- **Assumptions:** The analysis year, tariff calendar, interval load, and project-supplied constraints are aligned and future operations follow the declared case.
- **Editable:** Yes. Every estimated input and result remains visible and can be replaced by a validated exact value.
- **No-Estimate Rule:** Return no estimate without continuous interval data, a verified complete tariff, required constraints, or optimal solver status.

**How to Use:** Run a pinned REopt.jl release locally with an explicit baseline case and a proposed case that differ only by the modeled technology or fixed proposed load series.
Use the same chronological load and full tariff in both cases.
For native REopt technologies, set each user-specified power or energy size as both its minimum and maximum, set project costs and incentives to zero, disable outage and non-bill objectives, and compare one-year bill outputs.
For ITC-16, ITC-27, ITC-28, and ITC-31, REopt has no generic demand-response, public-charging session, or EV managed-charging object.
Construct the fixed proposed load series in an audited category adapter from the stated constraints, then run load-only baseline and proposed cases so REopt performs tariff valuation rather than unsupported device dispatch.
Return `baseline_bill - proposed_bill` and the component differences, but exclude incentives, tax, financing, capital, emissions, outage, and resilience objectives.
Require an optimal solver status and preserve the exact input payload and tariff provenance.
Do not produce demand or time-of-use value from annual or monthly energy totals.

**Automation:**

- **Selected Strategy:** Local REopt.jl service with constrained category templates.
- **Automation Method:** Containerize a pinned solver and package, validate typed inputs, execute two deterministic cases, and store solver and provenance metadata.
- **Difficulty:** Hard.
- **Efficient Build-Time Estimate:** 9 to 11 developer days, including the shared public and fleet charging load-template adapters.
- **Expected Accuracy or Uncertainty:** Moderate uncertainty with complete interval data and high uncertainty otherwise.
- **Basis:** Dispatch is mathematically reproducible, while tariffs, degradation, availability, and future load control the result.
- **Why This Is the Best Value-for-Time Strategy:** It supplies tested interval optimization and avoids fragile runtime API dependence or duplicated dispatch logic.
- **Access, Refresh, Versioning, and Maintenance Requirements:** Public open source; pin package, solver, and tariff versions, maintain regression fixtures, and review model changes before upgrades.

**Used By:** ITC-16, ITC-23 through ITC-28, and ITC-31.

### ■ STD-EPA-CHP-PERFORMANCE - EPA CHP and fuel-cell performance

**Status:** LIMITED

**Purpose:** Resolve electric efficiency, useful-heat ratio, and representative operating limits for onsite fuel generation.

**Source:** U.S. Environmental Protection Agency, [CHP technologies and current catalog links](https://www.epa.gov/chp/chp-technologies), [CHP efficiency method and resources](https://www.epa.gov/chp/chp-resources), and [current CHP calculator download](https://www.epa.gov/chp/download-chp-energy-and-emissions-savings-calculator).
The technology page supplies prime-mover and fuel-cell performance characteristics.
The methodology supplies the separate heat-and-power energy balance.
The calculator provides a reviewable workbook implementation.

**Lookup Inputs:**

- `prime_mover_and_fuel` - [Required] Prime-mover technology and input fuel.
- `chp_exact_model` - [Optional] Exact selected prime-mover, CHP, fuel-cell, biomass, or biogas conversion-unit model when known.
- `generation_capacity` - [Optional] Exact total installed capacity when known; otherwise use only a defensible source-supported service or capacity class.
- `operating_profile` - [Conditional] Recognizable operating pattern or exact capacity factor used when the category formula requires annual operation.
- `thermal_load_coincidence` - [Conditional] Coincident useful thermal-load limit when recovered heat is modeled.
- `linked_opportunity` - [Conditional] Product, technology, fuel, capacity, or minimum-performance restriction when a Linked Opportunity supplies one.

**Value Needed:** Annual electricity generation, annual input fuel, useful recovered heat, displaced boiler fuel, and source table or workbook version.

**Resolution Contract:**

- **Resolver Type:** Equipment resolver.
- **Supported Scenarios:** exact-input; source-table-technology-and-capacity-class; linked-opportunity-constrained-input; insufficient-data.
- **Scenario Output Behavior:** Calculate from exact project inputs or use only a documented EPA technology and capacity row as a proposed screening class; return no estimate when capacity, fuel, or heat coincidence is unresolved.
- **Low/Base/High Rule:** Use the documented range bounds and representative midpoint for the matched technology and capacity bin; exact specifications use one value in all positions.
- **Uncertainty Rule:** Low for exact specifications, moderate for a matched catalog bin, and high for generic biomass or biogas screening.
- **Exact Override:** A validated exact model, measurement, or project specification overrides the corresponding estimated value and records the exact source.
- **Source Version:** EPA catalog or workbook publication date, table or worksheet identifier, and local table version.
- **Selected Class or Candidate Set:** Filter by prime mover, fuel, capacity or service requirement, heat-recovery need, and opportunity constraints.
- **Assumptions:** Catalog-bin performance represents the proposed class and useful heat remains capped by the coincident load.
- **Editable:** Yes. Every estimated input and result remains visible and can be replaced by a validated exact value.
- **No-Estimate Rule:** Return no estimate when the technology, fuel, capacity class, or required fuel availability cannot be resolved.

**How to Use:** Extract only energy-performance values from the current catalog section or exact project equipment specification.
Calculate input fuel from electric output and electric efficiency, cap useful recovered heat at the coincident thermal load, and convert that heat to displaced boiler fuel with the existing boiler efficiency.
For biomass or biogas, require confirmed annual available fuel quantity and heating value and never infer it from organization type.
Exclude emissions and all cost assumptions in EPA tools.
An exact existing or proposed unit requires project documentation because the EPA catalog is a representative technology table, not a model catalog.
Profile and Bill context do not supply generation capacity, operating profile, or thermal coincidence.
A Linked Opportunity may constrain a documented technology class only when the EPA row and all calculation inputs remain compatible.

**Automation:**

- **Selected Strategy:** Versioned local performance table plus a transparent energy-balance function.
- **Automation Method:** Manually review the small catalog tables once, encode provenance-rich bins, and regression-test calculations against the EPA workbook energy fields.
- **Difficulty:** Medium.
- **Efficient Build-Time Estimate:** 2 to 3 developer days.
- **Expected Accuracy or Uncertainty:** Moderate for a specified unit and high for generic biomass or biogas screening.
- **Basis:** Catalog values are representative bins, while actual heat coincidence and fuel supply are project-specific.
- **Why This Is the Best Value-for-Time Strategy:** A small validated lookup captures the useful federal data without automating a PDF parser or importing out-of-scope economics.
- **Access, Refresh, Versioning, and Maintenance Requirements:** Public; store source publication and page/table, review annually, and prefer exact vendor-certified values when confirmed by the user.

**Used By:** ITC-20, ITC-21, ITC-22, and ITC-26.

### ■ STD-FUELECONOMY-VEHICLES - FuelEconomy.gov vehicle efficiency data

**Status:** LIMITED

**Purpose:** Resolve comparable existing and electric light-duty vehicle fuel or electricity consumption per mile.

**Source:** U.S. Department of Energy and U.S. Environmental Protection Agency, [FuelEconomy.gov web services and bulk downloads](https://www.fueleconomy.gov/feg/ws/index.shtml).
The page defines the downloadable current vehicle table and the `comb08` and `combE` fields used here.

**Lookup Inputs:**

- `vehicle_context` - [Required] Recognizable vehicle class, service need, and existing or proposed fuel or drive needed to select compatible records.
- `vehicle_exact_model` - [Optional] Exact model year, make, model, drive, or option when known.
- `linked_opportunity` - [Conditional] Vehicle, class, drive, certification, or minimum-performance restriction when a Linked Opportunity supplies one.

**Value Needed:** Combined gallons per mile or kWh per mile, vehicle record ID, model year, and update date.

**Resolution Contract:**

- **Resolver Type:** Equipment resolver.
- **Supported Scenarios:** exact-existing-model; exact-proposed-model; insufficient-data.
- **Scenario Output Behavior:** Return rated consumption only for an unambiguous vehicle record. Class distributions remain unsupported until compatibility rules and a fixture-backed eligible population are approved.
- **Low/Base/High Rule:** For an exact match use one rated value. Do not calculate percentiles without declared vehicle-class, model-year, drive, fuel, and service-compatibility filters plus sample size.
- **Uncertainty Rule:** Moderate for rated exact models and high for class estimates because duty, payload, weather, and charging losses vary.
- **Exact Override:** A validated exact model, measurement, or project specification overrides the corresponding estimated value and records the exact source.
- **Source Version:** FuelEconomy.gov bulk-file update date, vehicle record identifiers, and file checksum.
- **Selected Class or Candidate Set:** Exact records are selected by vehicle ID or unambiguous year, make, model, and option. A class candidate set is not yet approved.
- **Assumptions:** Standardized combined ratings are suitable for screening the declared use and do not represent site-specific duty.
- **Editable:** Yes. Every estimated input and result remains visible and can be replaced by a validated exact value.
- **No-Estimate Rule:** Return no estimate when vehicle class or service compatibility cannot be established.

**How to Use:** Download the unzipped vehicle CSV periodically and select exact vehicle records through year, make, model, and option.
For combustion vehicles use `gallons_per_mile = 1 / comb08`.
For electric vehicles use `kwh_per_mile = combE / 100`.
Do not use the dataset's annual cost fields because they embed generic mileage and prices.
For an exact existing vehicle, use the unambiguous source record and assign the rating uncertainty documented in the Resolution Contract.
`combE` is reported in kWh per 100 miles and the EPA label methodology includes wall-to-vehicle charging losses.
Do not divide by an additional charging-efficiency factor.
Vehicle-class, service-need, Profile, Bill, and Linked Opportunity fallbacks remain unsupported until exact dataset filters and an eligible population fixture are approved.

**Automation:**

- **Selected Strategy:** Periodic bulk CSV ingestion.
- **Automation Method:** Download, schema-check, normalize selection fields, and retain the EPA vehicle ID and source update date.
- **Difficulty:** Easy.
- **Efficient Build-Time Estimate:** 1 developer day.
- **Expected Accuracy or Uncertainty:** Moderate uncertainty.
- **Basis:** Ratings are standardized and exact by model, while real duty cycle, weather, payload, and charging losses vary.
- **Why This Is the Best Value-for-Time Strategy:** The official bulk data is comprehensive, simple, and avoids runtime requests.
- **Access, Refresh, Versioning, and Maintenance Requirements:** Public; refresh monthly, retain historical model records, and alert on source field changes.

**Used By:** ITC-28 and ITC-29.

### ■ STD-WATERSENSE-FIXTURES - WaterSense fixture performance

**Status:** LIMITED

**Purpose:** Resolve proposed rated flow or flush volume for compatible plumbing fixtures.

**Source:** U.S. Environmental Protection Agency, [WaterSense commercial-building resources](https://www.epa.gov/watersense/commercial-buildings), [WaterSense at Work best-management-practice guide](https://www.epa.gov/watersense/best-management-practices), and [WaterSense urinal criteria](https://www.epa.gov/watersense/urinals).
The guide contains fixture inventory methods, equations, and replacement-performance values.

**Lookup Inputs:**

- `fixture_context` - [Required] Recognizable existing and proposed fixture types and applications needed to select compatible rating classes.
- `fixture_exact_rating` - [Optional] Exact existing or proposed model, rated flow, or flush volume when known.
- `linked_opportunity` - [Conditional] Product, certification, or minimum-performance restrictions when a Linked Opportunity supplies them.

**Value Needed:** Proposed gallons per minute or gallons per flush with units, specification, and source location.

**Resolution Contract:**

- **Resolver Type:** Equipment resolver.
- **Supported Scenarios:** linked-opportunity-exact-product; linked-opportunity-product-class; no-product-restriction; no-linked-opportunity; exact-proposed-model; insufficient-data.
- **Scenario Output Behavior:** Return a proposed WaterSense criterion or current certified proposed-product rating. Existing fixture ratings and commercial usage require exact inputs or separate evidence.
- **Low/Base/High Rule:** Use one value for an exact proposed rating. No existing-class range, usage range, or proposed-product percentile is supported without a reviewed population fixture.
- **Uncertainty Rule:** Low for exact ratings, moderate for a matched fixture type, and high when context alone selects the class.
- **Exact Override:** A validated exact model, measurement, or project specification overrides the corresponding estimated value and records the exact source.
- **Source Version:** WaterSense specification or guide version, source section, product-list update date when used, and local criteria-table version.
- **Selected Class or Candidate Set:** Filter proposed products by fixture application, service type, compatibility, certification or opportunity restrictions, and proposed scope. Record all filters and sample size before enabling a distribution.
- **Assumptions:** Rated flow or flush volume represents the installed operating point for screening.
- **Editable:** Yes. Every estimated input and result remains visible and can be replaced by a validated exact value.
- **No-Estimate Rule:** Return no estimate when neither an exact rating nor a defensible fixture application class is available.

**How to Use:** Prefer the existing fixture's label or exact model rating.
Use the WaterSense specification or current product data only for proposed performance.
Store fixture type, unit, rating, source section, and specification version.
Never substitute a flush frequency for a rated flush volume.
Commercial use frequency and duration remain separate unresolved terms until an exact source section and fixture are approved.
Keep usage frequency and duration assumptions separate from rated flow or flush volume.
When a Linked Opportunity names exact products, restrict candidates to those products and use the selected exact rating.
When it specifies a fixture class, certification, or maximum rating, filter compatible WaterSense criteria or candidates to those requirements.
When it has no product restriction or no Linked Opportunity exists, a proposed criterion may be used only for a compatible documented fixture type.
Exact ratings and measured use patterns override proposed criteria.
Return no estimate when existing performance or the commercial usage pattern is unresolved.

**Automation:**

- **Selected Strategy:** Small manually reviewed local criteria table, with exact models overriding it.
- **Automation Method:** Encode current specification maxima and guide values with page or section provenance, then review against source revisions.
- **Difficulty:** Easy.
- **Efficient Build-Time Estimate:** 0.5 developer day.
- **Expected Accuracy or Uncertainty:** Low for rated flow and moderate for actual use.
- **Basis:** Ratings are defined, while duration and uses are customer-operational inputs.
- **Why This Is the Best Value-for-Time Strategy:** The source table is small and stable, so a PDF scraper would add cost without value.
- **Access, Refresh, Versioning, and Maintenance Requirements:** Public; review annually and on WaterSense specification changes.

**Used By:** ITC-32 and ITC-33.

### ■ STD-WATERSENSE-LANDSCAPE - WaterSense landscape water budget

**Status:** LIMITED

**Purpose:** Resolve baseline and proposed landscape water requirements from climate, area, plant, and irrigation method.

**Source:** U.S. Environmental Protection Agency, [Water Budget Tool and data download](https://www.epa.gov/watersense/water-budget-tool) and [commercial outdoor-water tools](https://www.epa.gov/watersense/tools-ci-facilities).

**Lookup Inputs:**

- `site_zip` - [Required] Site ZIP code used for the climate lookup.
- `hydrozone_definition` - [Required] Approximate landscape area and recognizable plant or landscape type for each hydrozone.
- `irrigation_configuration` - [Required] Existing and proposed irrigation methods and controller treatment.
- `irrigation_efficiency` - [Optional] Exact existing or proposed irrigation efficiency when known.

**Value Needed:** Annual baseline and proposed landscape water allowance in gallons, with climate-data and tool version.

**Resolution Contract:**

- **Resolver Type:** Method resolver.
- **Supported Scenarios:** exact-input; class-or-context-estimate; linked-opportunity-constrained-input; insufficient-data.
- **Scenario Output Behavior:** Return baseline and proposed water budgets for complete hydrozone inputs; use visible ranges only for source-supported plant or irrigation classes.
- **Low/Base/High Rule:** Calculate each low, base, and high case from the declared plant factor and irrigation-efficiency bounds.
- **Uncertainty Rule:** Moderate with mapped hydrozones and high when plant mix or irrigation condition is estimated.
- **Exact Override:** A validated exact model, measurement, or project specification overrides the corresponding estimated value and records the exact source.
- **Source Version:** Water Budget Tool workbook version, climate-data version, and downloaded-file checksum.
- **Selected Class or Candidate Set:** Use the site ZIP climate record and only the declared hydrozones, plant classes, irrigation methods, and project scope.
- **Assumptions:** The climate record and declared landscape composition represent the analysis year.
- **Editable:** Yes. Every estimated input and result remains visible and can be replaced by a validated exact value.
- **No-Estimate Rule:** Return no estimate without defensible irrigated area, plant class, irrigation method, and site climate.

**How to Use:** Implement the equations and lookup data from the current Water Budget Tool workbook and data download.
Select climate by ZIP, calculate each hydrozone, sum annual gallons, and compare the existing and proposed design under identical landscape area and climate.
Represent controller and distribution changes only through documented tool fields or WaterSense at Work equations.
Store workbook version and input hydrozones.

**Automation:**

- **Selected Strategy:** Periodic local ingestion of the Water Budget Tool data with a tested formula port.
- **Automation Method:** Extract the ZIP climate table and workbook equations, then verify results against a fixed set of workbook examples.
- **Difficulty:** Medium.
- **Efficient Build-Time Estimate:** 1.5 to 2 developer days.
- **Expected Accuracy or Uncertainty:** Moderate uncertainty.
- **Basis:** Climate and area are resolvable, while plant mix, irrigation condition, and actual schedules vary.
- **Why This Is the Best Value-for-Time Strategy:** It preserves the federal method and works without live requests or many user questions.
- **Access, Refresh, Versioning, and Maintenance Requirements:** Public downloadable workbook and data; pin version, retain checksum, and review when the EPA page publishes a replacement.

**Used By:** ITC-34.

### ■ STD-WATERSENSE-CI-OPERATIONS - WaterSense commercial operations methods

**Status:** LIMITED

**Purpose:** Resolve cooling-tower makeup and leak-avoidance water with WaterSense commercial facility equations.

**Source:** U.S. Environmental Protection Agency, [WaterSense at Work best-management practices](https://www.epa.gov/watersense/best-management-practices) and [tools for commercial and institutional facilities](https://www.epa.gov/watersense/tools-ci-facilities).

**Lookup Inputs:**

- `watersense_method_inputs` - [Required] Measured leak flow and duration, or cooling-tower evaporation, cycles of concentration, blowdown, and drift inputs required by the method selected by the category contract.

**Value Needed:** Annual avoidable gallons and the exact WaterSense equation or worksheet version.

**Resolution Contract:**

- **Resolver Type:** Method resolver.
- **Supported Scenarios:** exact-input; linked-opportunity-constrained-input; insufficient-data.
- **Scenario Output Behavior:** Return the direct equation result for complete measured inputs; otherwise return no estimate.
- **Low/Base/High Rule:** Use identical values when inputs are measured, or run explicit project-supplied sensitivity inputs independently.
- **Uncertainty Rule:** Moderate with measured inputs and no estimate without them.
- **Exact Override:** A validated exact model, measurement, or project specification overrides the corresponding estimated value and records the exact source.
- **Source Version:** WaterSense at Work publication version, worksheet or equation identifier, and local adapter version.
- **Selected Class or Candidate Set:** Select only the leak or cooling-tower equation named by the category contract.
- **Assumptions:** The measurement period and operating conditions represent the annualized period.
- **Editable:** Yes. Every estimated input and result remains visible and can be replaced by a validated exact value.
- **No-Estimate Rule:** Return no estimate when the selected equation's minimum measured operating inputs are missing.

**How to Use:** For a known leak, multiply measured flow by confirmed annual leak duration and stop at zero after the repair date.
For a cooling tower, apply the WaterSense at Work water-balance equations to existing and proposed cycles of concentration and consistent heat-rejection conditions.
Return no estimate for a detection system without a measured leak or for a cooling tower without the minimum operating data.

**Automation:**

- **Selected Strategy:** Local transparent formula adapters sourced to the WaterSense guide.
- **Automation Method:** Encode the small equations with unit validation and golden examples from the worksheets.
- **Difficulty:** Easy.
- **Efficient Build-Time Estimate:** 1 developer day.
- **Expected Accuracy or Uncertainty:** Moderate with measured inputs and high without them.
- **Basis:** Equations are direct, but leak duration and tower operating conditions dominate results.
- **Why This Is the Best Value-for-Time Strategy:** A small tested adapter is clearer and safer than a broad generalized water model.
- **Access, Refresh, Versioning, and Maintenance Requirements:** Public; pin guide version and verify formulas on publication updates.

**Used By:** ITC-35 and ITC-36.

### ■ STD-FEMP-EXTERIOR-LIGHTING - Exterior fixture wattage and proposed-product resolution

**Status:** LIMITED

**Purpose:** Resolve proposed exterior luminaire input watts from an exact model or compatible qualified-product candidate set.
Existing input watts require a nameplate, measurement, photometric report, or a separately validated historical source.

**Source:** U.S. Department of Energy FEMP, [Purchasing Energy-Efficient Exterior Lighting](https://www.energy.gov/cmei/femp/purchasing-energy-efficient-exterior-lighting), and DesignLights Consortium, [DLC API and data download user guide](https://designlights.org/wp-content/uploads/2021/08/DLC_API-and-Data-Access-User-Guide_FINAL_08022021.pdf) and [SSL V6.0 and LUNA V2.0 Technical Requirements](https://designlights.org/wp-content/uploads/2025/11/SSL-V6-LUNA-V2-TR_final_12082025.pdf).
FEMP defines covered exterior applications and application-specific efficacy requirements.
The DLC access guide documents tokenized QPL CSV downloads.
The DLC requirements define the QPL model, application, photometric, electrical, listing-status, and technical-version fields needed for exact and requirement-based filtering.

**Lookup Inputs:**

- `exterior_fixture_context` - [Required] Recognizable existing fixture application plus relevant building and project context.
- `existing_fixture_model` - [Optional] Exact existing fixture model or documented input watts when known.
- `linked_opportunity` - [Conditional] Product, certification, class, or minimum-performance restriction when a Linked Opportunity supplies one.
- `proposed_fixture_model` - [Optional] Exact selected proposed model when known.

**Value Needed:** Existing and proposed fixture input watts, application class, low/base/high values, match status, candidate criteria, uncertainty, and source provenance.

**Resolution Contract:**

- **Resolver Type:** Equipment resolver.
- **Supported Scenarios:** proposed-application-threshold; linked-opportunity-product-class; no-product-restriction; no-linked-opportunity; insufficient-data.
- **Scenario Output Behavior:** Return the FEMP proposed efficacy threshold for a covered application or the narrow documented wall-mounted example. Return no existing fixture watts and no generic proposed input watts.
- **Low/Base/High Rule:** No percentile distribution is supported. The FEMP threshold or narrow example is a single documented value with its exact application limits.
- **Uncertainty Rule:** Low for exact documented models, moderate for a recognizable application and compatible candidate set, and high for a context-only application selection.
- **Exact Override:** A validated exact existing or proposed model or documented input-watt measurement overrides the corresponding estimate and records the exact source.
- **Source Version:** FEMP exterior-lighting guidance updated June 2023, DLC SSL V6.0 and LUNA V2.0 release, QPL extract date, record identifiers, and source checksum.
- **Selected Class or Candidate Set:** Match only a proposed application to a FEMP covered class. Any later DLC candidate set requires a separate schema fixture and documented light-output, distribution, mounting, controls, efficacy, and status filters.
- **Assumptions:** Candidate products satisfy the same service and photometric application; a photometric design is still required before purchase.
- **Editable:** Yes. Every class selection, candidate filter, and estimated wattage remains visible and can be replaced by a validated exact value.
- **No-Estimate Rule:** Return no estimate when model, application, and site context cannot establish a defensible existing class, or when no compatible proposed candidate set remains.

**How to Use:** Resolve existing watts from a nameplate, measurement, or separately verified historical source.
FEMP Table 1 supports only proposed application-specific efficacy requirements.
FEMP Table 2 is a narrow wall-mounted 9,900 to 10,100 lumen example and must not be generalized into an installed-baseline distribution.
A Linked Opportunity may constrain the proposed application class, but the current evidence does not resolve an exact product or input wattage.
Profile and Bill fallbacks are unsupported.
Do not add savings for entirely new fixtures, and do not treat lighting quality as a monetary benefit.

**Automation:**

- **Selected Strategy:** Controlled DLC SSL QPL ingestion for proposed products plus documented existing nameplate or measured input power.
- **Automation Method:** Download a versioned SSL QPL CSV through the documented coded URL and bearer-token method, map model, application, light-output, efficacy, input-power, listing-status, and technical-version fields, and calculate a deterministic compatible candidate population.
- **Difficulty:** Medium.
- **Efficient Build-Time Estimate:** 2 to 3 developer days.
- **Expected Accuracy or Uncertainty:** Moderate for class-based screening and low for exact documented matches.
- **Basis:** Input power and efficacy are source fields, while service compatibility and photometric suitability depend on the application.
- **Why This Is the Best Value-for-Time Strategy:** It uses maintained authoritative criteria and verified product data without inventing a fixture model.
- **Access, Refresh, Versioning, and Maintenance Requirements:** Pin every criteria and QPL extract, retain checksums and record IDs, review DLC schema transitions, and refresh on controlled source updates.

**Used By:** ITC-02.

### ■ STD-OPERATING-SCHEDULE - Recognizable schedule to annual operating hours

**Status:** LIMITED

**Purpose:** Resolve annual operating hours from recognizable business, shift, seasonal, or exterior-lighting control patterns, with an exact schedule or measurement as an optional override.

**Source:** U.S. Department of Energy, [Commercial Reference Buildings](https://www.energy.gov/cmei/buildings/commercial-reference-buildings), and U.S. Naval Observatory, [Rise, Set, and Twilight Definitions](https://aa.usno.navy.mil/faq/RST_defs) and [Data Services API](https://aa.usno.navy.mil/data/api.html).
DOE reference buildings provide building-type operating-schedule context.
USNO defines and computes sunrise, sunset, and civil-twilight times for location-specific exterior schedules.

**Lookup Inputs:**

- `operating_schedule` - [Required] Recognizable usage or control pattern and available Profile context.
- `operating_schedule_details` - [Optional] Detailed operating days, shifts, or active season when known.
- `measured_annual_operating_hours` - [Optional] Exact annual schedule or measured annual operating hours when known.

**Value Needed:** Low, base, and high annual operating hours, exact or estimated status, schedule formula, analysis year, uncertainty, and source provenance.

**Resolution Contract:**

- **Resolver Type:** Method resolver.
- **Supported Scenarios:** measured-exact-input; explicit-calendar-calculation; daylight-control-calculation; insufficient-data.
- **Scenario Output Behavior:** Return the exact validated schedule total when supplied; otherwise return a deterministic low/base/high range from the recognizable schedule and context.
- **Low/Base/High Rule:** Calculate each value from visible hours-per-day, days-per-week, active-weeks, shift, setback, or daylight assumptions; never apply an unexplained annual-hours constant.
- **Uncertainty Rule:** Low for an exact validated schedule, moderate for a complete recognizable schedule, and high for a broad context-derived range.
- **Exact Override:** A validated exact schedule or measured annual operating-hours value overrides the estimated range.
- **Source Version:** Calculation policy version, DOE schedule source version when used, USNO retrieval or algorithm version when used, analysis year, and timezone rules.
- **Selected Class or Candidate Set:** Select only a declared business, shift, seasonal, continuous, intermittent, or exterior-control pattern supported by the supplied facts.
- **Assumptions:** Operating days, active weeks, holidays, setbacks, and daylight or control offsets are visible and editable.
- **Editable:** Yes. Every schedule component remains visible and can be replaced by a validated exact schedule.
- **No-Estimate Rule:** Return no estimate when the user-recognizable schedule and available context cannot bound annual operation defensibly.

**How to Use:** Use a validated exact schedule or measured annual hours when supplied.
Otherwise calculate business-hours operation from hours per day, operating days per week, and active weeks per year.
Calculate shift operation from shift length, shifts per day, operating days, and active weeks.
For seasonal equipment, apply the user-selected active season rather than a full-year assumption.
For dusk-to-dawn or photocell exterior lighting, calculate annual darkness or twilight-controlled hours from site coordinates, analysis year, timezone, and the declared control offset.
Use a visible range for timer, occupancy, or unknown-control behavior.
Do not infer annual hours solely from an industry label when site operation can vary materially.

**Automation:**

- **Selected Strategy:** Transparent schedule formulas with a versioned daylight calculation adapter.
- **Automation Method:** Implement typed schedule patterns, calendar and timezone handling, and a tested USNO-compatible daylight calculation or controlled API cache.
- **Difficulty:** Easy to Medium.
- **Efficient Build-Time Estimate:** 1 to 2 developer days.
- **Expected Accuracy or Uncertainty:** Low with an exact schedule and moderate to high for context-derived schedules.
- **Basis:** The arithmetic is deterministic, while holidays, overrides, and actual controls can change operation.
- **Why This Is the Best Value-for-Time Strategy:** It replaces a difficult annual-hours question with recognizable facts and preserves every assumption.
- **Access, Refresh, Versioning, and Maintenance Requirements:** Version formulas and timezone rules, retain source and analysis-year metadata, and regression-test daylight and calendar edge cases.

**Used By:** ITC-02, ITC-09, ITC-12, ITC-20, ITC-30, ITC-37, ITC-38, ITC-40 through ITC-43, ITC-47, and ITC-51.

## Registry totals

- Canonical Standards: 16.
- Standards with one selected automation strategy: 16.
- `RESEARCHED — READY FOR HUMAN REVIEW`: 0.
- `LIMITED`: 16.
- `BLOCKED`: 0.
- High-uncertainty Standards: STD-SCOUT-ECM-SCREEN, STD-WIND-SAM, and generic biomass or biogas use of STD-EPA-CHP-PERFORMANCE.
