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

**Status:** RESEARCHED — READY FOR HUMAN REVIEW

**Purpose:** Return annual electricity and fuel deltas for a documented commercial-building upgrade scenario matched to a Stage 1 building archetype.

**Source:** National Laboratory of the Rockies, [ComStock 2025 Release 3 data](https://natlabrockies.github.io/ComStock.github.io/docs/data.html), [upgrade-measure crosswalk and documentation](https://natlabrockies.github.io/ComStock.github.io/docs/upgrade_measures/upgrade_measures.html), and [2025 Release 3 reference documentation](https://natlabrockies.github.io/ComStock.github.io/assets/files/comstock_reference_documentation_2025_3.pdf).
The data page identifies the OEDI release, directory layout, data dictionary, enumerations, upgrade lookup, and crosswalk.
The measure page identifies the stable measure IDs and the assumptions behind each scenario.
The reference PDF supplies the model, sampling, and applicability method.

**Lookup Inputs:**

- `canonical_retrofit` - Canonical retrofit ID from the linked opportunity.
- `site_geography` - Site state or county.
- `building_type` - Canonical commercial building type.
- `floor_area` - Profile floor area used to select the floor-area bin and scale the result.
- `existing_condition` - Existing-condition selector for the documented measure.
- `proposed_option` - Proposed-option selector for the documented measure.

**Value Needed:** Weighted median annual resource delta per square foot for each modeled resource, plus the 25th and 75th percentiles, applicability share, sample count, release ID, and measure ID.

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

- `canonical_retrofit` - Canonical retrofit ID from the linked opportunity.
- `building_type` - Commercial building type.
- `climate_zone` - Climate zone resolved from the site location.
- `building_vintage` - Existing building vintage class.
- `end_use_and_fuel` - Affected end use and fuel.
- `existing_condition` - Existing-condition selector.
- `proposed_option` - Proposed-option selector.

**Value Needed:** Applicable annual fractional resource reduction by fuel and end use, the underlying performance assumption, Scout version, and supported market segment.

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

- `ccms_product_selection` - Product group, manufacturer, basic model number, equipment class, and capacity for each existing or proposed product record.

**Value Needed:** The certified efficiency, capacity, annual or daily resource use, test-procedure identifier, units, certification date, and active-record status required by the category.

**How to Use:** An analyst exports the requested product-group report from the public Compliance Certification Database because anonymous automated requests to the direct database returned HTTP 403 during this audit.
Select an exact normalized manufacturer and basic-model match, then disambiguate with equipment class and capacity.
Read only fields defined in the current product-specific template and preserve the reported units and test-procedure version.
Store a local slowly changing dimension keyed by product group, manufacturer, basic model, class, and certification effective date.
Return no model rating on ambiguous or withdrawn matches.

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

**Status:** RESEARCHED — READY FOR HUMAN REVIEW

**Purpose:** Resolve current certified high-efficiency product performance and EVSE standby or charging efficiency.

**Source:** U.S. Environmental Protection Agency, [ENERGY STAR Product Finder datasets and API](https://www.energystar.gov/productfinder/advanced), [EV charger product criteria and finder](https://www.energystar.gov/products/ev_chargers), [commercial clothes washer dataset](https://data.energystar.gov/Active-Specifications/ENERGY-STAR-Certified-Commercial-Clothes-Washers/9g6r-cpdt), [commercial ice machine dataset](https://data.energystar.gov/Active-Specifications/ENERGY-STAR-Certified-Commercial-Ice-Machines/nak5-fsjf), [commercial dishwasher dataset](https://data.energystar.gov/Active-Specifications/ENERGY-STAR-Certified-Commercial-Dishwashers/pk8q-dim8), [commercial fryer dataset](https://data.energystar.gov/Active-Specifications/ENERGY-STAR-Certified-Commercial-Fryers/edi8-b5vk), [commercial oven dataset](https://data.energystar.gov/Active-Specifications/ENERGY-STAR-Certified-Commercial-Ovens/c8av-ccf7), and [commercial steam cooker dataset](https://data.energystar.gov/Active-Specifications/ENERGY-STAR-Certified-Commercial-Steam-Cookers/vtsv-aq9u).
The advanced page exposes downloadable datasets that are updated daily.
The product pages define fields and certified-product scope.

**Lookup Inputs:**

- `energy_star_product_selection` - Product category, manufacturer, model, equipment subtype, and capacity or size class for each selected product record.

**Value Needed:** Category-specific certified energy, water, capacity, efficiency, and low-power-state fields with units and certification dates.

**How to Use:** Download the category dataset rather than calling the API at calculation time.
Keep the EPA field names in raw storage and normalize only fields used by a documented category adapter.
Select exact manufacturer and model matches, then validate subtype and capacity.
For a proposed generic selection, return the median and quartiles of currently certified products within the exact subtype and capacity bin, not the best model.
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

**Status:** RESEARCHED — READY FOR HUMAN REVIEW

**Purpose:** Calculate equipment and industrial-system resource use from the minimum measured or confirmed operating inputs.

**Source:** U.S. Department of Energy, [MEASUR tool and downloads](https://www.energy.gov/cmei/ito/measur), [calculator list and descriptions](https://www.energy.gov/cmei/amo/measur-calculator-list-and-descriptions), and [ORNL MEASUR source repository](https://github.com/ORNL-AMO/AMO-Tools-Desktop).
The tool page identifies the open-source assessment modules.
The calculator page identifies the supported lighting, motor, pump, fan, compressed-air, process-heating, and steam calculations.

**Lookup Inputs:**

- `measur_calculator_inputs` - Every calculator-specific equipment, operating-point, schedule, and resource input shown as an atomic leaf in the applicable category tree; the category contract deterministically selects the calculator ID.

**Value Needed:** Existing and proposed annual resource use or avoided resource use, with the calculator version, input units, and warnings.

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

**Used By:** ITC-02, ITC-04, ITC-09, ITC-12, ITC-36 through ITC-47, and ITC-51.

### ■ STD-SAM-SOLAR-THERMAL - SAM solar water-heating simulation

**Status:** RESEARCHED — READY FOR HUMAN REVIEW

**Purpose:** Return annual solar-thermal output and backup-resource displacement for a specified solar water-heating system.

**Source:** National Laboratory of the Rockies, [System Advisor Model](https://sam.nlr.gov/) and [SAM open-source repository](https://github.com/NatLabRockies/SAM).

**Lookup Inputs:**

- `site_coordinates` - Resolved site latitude and longitude.
- `solar_thermal_configuration` - Collector type, collector area, tilt, azimuth, and storage volume.
- `hot_water_load` - Annual delivered hot-water thermal load.
- `backup_resource` - Backup fuel and backup efficiency.

**Value Needed:** Monthly and annual useful solar thermal energy, backup-resource displacement, and unmet-load warnings.

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

**Status:** RESEARCHED — READY FOR HUMAN REVIEW

**Purpose:** Resolve hourly and annual AC generation for a specified grid-connected PV array.

**Source:** National Laboratory of the Rockies, [PVWatts V8 API documentation](https://developer.nlr.gov/docs/solar/pvwatts/v8/) and [System Advisor Model repository](https://github.com/NatLabRockies/SAM).
PVWatts documents the required inputs and outputs.
SAM supplies the local PVWatts compute module.

**Lookup Inputs:**

- `site_coordinates` - Resolved site latitude and longitude.
- `pv_array_configuration` - DC capacity, module type, array type, losses, tilt, and azimuth.

**Value Needed:** Hourly or monthly AC kWh, annual AC kWh, capacity factor, weather-file identifier, and warnings.

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

**Status:** RESEARCHED — READY FOR HUMAN REVIEW

**Purpose:** Resolve annual generation for a specified small wind turbine at a specified hub height.

**Source:** National Laboratory of the Rockies, [WIND Toolkit](https://www.nlr.gov/grid/wind-toolkit), [WIND Toolkit download API](https://developer.nlr.gov/docs/wind/wind-toolkit/wtk-download/), and [System Advisor Model repository](https://github.com/NatLabRockies/SAM).
The Toolkit supplies location and height resource data.
SAM supplies the turbine power-curve simulation.

**Lookup Inputs:**

- `site_coordinates` - Resolved site latitude and longitude.
- `wind_system_configuration` - Hub height, exact turbine model or power curve, and losses.
- `analysis_year` - Analysis year used to select the wind-resource series.

**Value Needed:** Hourly and annual AC kWh, capacity factor, resource dataset version, and warnings.

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

**Status:** RESEARCHED — READY FOR HUMAN REVIEW

**Purpose:** Resolve direct bill change from storage, demand flexibility, managed charging, and composite distributed-energy dispatch.

**Source:** National Laboratory of the Rockies, [REopt API V3 documentation](https://developer.nlr.gov/docs/energy-optimization/reopt/v3/), [REopt.jl input reference](https://natlabrockies.github.io/REopt.jl/dev/reopt/inputs/), and [REopt.jl open-source package](https://github.com/NatLabRockies/REopt.jl).
The API documentation defines stable V3 inputs and outputs.
REopt.jl is the local optimization engine used by the API.

**Lookup Inputs:**

- `chronological_load_and_tariff` - Chronological site load, complete tariff, timezone, and analysis-year calendar.
- `reopt_category_constraints` - Applicable technology power, energy, efficiency, state, availability, event, or fixed-load-template constraints shown as atomic leaves in the category tree.

**Value Needed:** Baseline and proposed annual bill components, interval dispatch, imported and exported energy, monthly peaks, and solver status.

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

**Status:** RESEARCHED — READY FOR HUMAN REVIEW

**Purpose:** Resolve electric efficiency, useful-heat ratio, and representative operating limits for onsite fuel generation.

**Source:** U.S. Environmental Protection Agency, [CHP technologies and current catalog links](https://www.epa.gov/chp/chp-technologies), [CHP efficiency method and resources](https://www.epa.gov/chp/chp-resources), and [current CHP calculator download](https://www.epa.gov/chp/download-chp-energy-and-emissions-savings-calculator).
The technology page supplies prime-mover and fuel-cell performance characteristics.
The methodology supplies the separate heat-and-power energy balance.
The calculator provides a reviewable workbook implementation.

**Lookup Inputs:**

- `prime_mover_and_fuel` - Prime-mover technology and input fuel.
- `generation_capacity` - Total installed capacity used to select the performance bin.
- `operating_profile` - Annual operating hours, load fraction, or capacity factor.
- `thermal_load_coincidence` - [Conditional] Coincident useful thermal-load limit when recovered heat is modeled.

**Value Needed:** Annual electricity generation, annual input fuel, useful recovered heat, displaced boiler fuel, and source table or workbook version.

**How to Use:** Extract only energy-performance values from the current catalog section or exact project equipment specification.
Calculate input fuel from electric output and electric efficiency, cap useful recovered heat at the coincident thermal load, and convert that heat to displaced boiler fuel with the existing boiler efficiency.
For biomass or biogas, require confirmed annual available fuel quantity and heating value and never infer it from organization type.
Exclude emissions and all cost assumptions in EPA tools.

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

**Status:** RESEARCHED — READY FOR HUMAN REVIEW

**Purpose:** Resolve comparable existing and electric light-duty vehicle fuel or electricity consumption per mile.

**Source:** U.S. Department of Energy and U.S. Environmental Protection Agency, [FuelEconomy.gov web services and bulk downloads](https://www.fueleconomy.gov/feg/ws/index.shtml).
The page defines the downloadable current vehicle table and the `comb08` and `combE` fields used here.

**Lookup Inputs:**

- `vehicle_selection` - Model year, make, model, drive or option, and fuel type for each selected vehicle record.

**Value Needed:** Combined gallons per mile or kWh per mile, vehicle record ID, model year, and update date.

**How to Use:** Download the unzipped vehicle CSV periodically and select exact vehicle records through year, make, model, and option.
For combustion vehicles use `gallons_per_mile = 1 / comb08`.
For electric vehicles use `kwh_per_mile = combE / 100`.
Do not use the dataset's annual cost fields because they embed generic mileage and prices.

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

**Status:** RESEARCHED — READY FOR HUMAN REVIEW

**Purpose:** Resolve rated flow or flush volume for existing and proposed plumbing fixtures.

**Source:** U.S. Environmental Protection Agency, [WaterSense commercial-building resources](https://www.epa.gov/watersense/commercial-buildings), [WaterSense at Work best-management-practice guide](https://www.epa.gov/watersense/best-management-practices), and [WaterSense urinal criteria](https://www.epa.gov/watersense/urinals).
The guide contains fixture inventory methods, equations, and replacement-performance values.

**Lookup Inputs:**

- `fixture_selection` - Fixture type and existing and proposed rated flow or flush volume.

**Value Needed:** Gallons per minute or gallons per flush with specification and source location.

**How to Use:** Prefer the existing fixture's label or exact model rating.
Use the WaterSense at Work plumbing sections and current product specification for a proposed generic value.
Store fixture type, unit, rating, source section, and specification version.
Never substitute a flush frequency for a rated flush volume.

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

**Status:** RESEARCHED — READY FOR HUMAN REVIEW

**Purpose:** Resolve baseline and proposed landscape water requirements from climate, area, plant, and irrigation method.

**Source:** U.S. Environmental Protection Agency, [Water Budget Tool and data download](https://www.epa.gov/watersense/water-budget-tool) and [commercial outdoor-water tools](https://www.epa.gov/watersense/tools-ci-facilities).

**Lookup Inputs:**

- `site_zip` - Site ZIP code used for the climate lookup.
- `hydrozone_definition` - Landscape area and plant factor for each hydrozone.
- `irrigation_configuration` - Existing and proposed irrigation method, efficiency, and controller treatment.

**Value Needed:** Annual baseline and proposed landscape water allowance in gallons, with climate-data and tool version.

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

**Status:** RESEARCHED — READY FOR HUMAN REVIEW

**Purpose:** Resolve cooling-tower makeup and leak-avoidance water with WaterSense commercial facility equations.

**Source:** U.S. Environmental Protection Agency, [WaterSense at Work best-management practices](https://www.epa.gov/watersense/best-management-practices) and [tools for commercial and institutional facilities](https://www.epa.gov/watersense/tools-ci-facilities).

**Lookup Inputs:**

- `watersense_method_inputs` - Measured leak flow and duration, or cooling-tower evaporation, cycles of concentration, blowdown, and drift inputs required by the method selected by the category contract.

**Value Needed:** Annual avoidable gallons and the exact WaterSense equation or worksheet version.

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

## Registry totals

- Canonical Standards: 14.
- Standards with one selected automation strategy: 14.
- `RESEARCHED — READY FOR HUMAN REVIEW`: 12.
- `LIMITED`: 2.
- `BLOCKED`: 0.
- High-uncertainty Standards: STD-SCOUT-ECM-SCREEN, STD-WIND-SAM, and generic biomass or biogas use of STD-EPA-CHP-PERFORMANCE.
