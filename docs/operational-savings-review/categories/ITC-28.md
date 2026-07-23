# Information Card — Fleet Charging Infrastructure

**Retrofits included:** Fleet charging infrastructure

**Overview:** Fleet charging infrastructure converts vehicle travel needs and charging schedules into added interval electric load and utility cost.

**Broader Formula**

```text
Annual Operational Savings =
Baseline Annual Bill − Proposed Annual Bill
```

**Expanded Formula**

```text
Annual Operational Savings = Baseline Annual Bill - Proposed Unmanaged-Charging Bill

Vehicle Electricity per Mile = Proposed Vehicle Electricity per 100 Miles / 100 when an exact FuelEconomy record is used.

Annual Vehicle Electricity = Annual Fleet Miles × Vehicle Electricity per Mile

Annual Standby Electricity = Installed Charging Ports × Standby Power per Port × Annual Noncharging Hours
```

**Information Tree**

```text
Annual Operational Cost Impact
├─ Chronological Electricity Load and Tariff
│  ├─ Timestamped Interval Utility Data (Bill)
│  ├─ Time Zone and Daylight-Saving Metadata from the Uploaded Utility Artifact (Bill)
│  ├─ Rate Schedule and Customer Class (Bill)
│  ├─ Standard 1.1 — Interval Tariff Resolution
│  └─ Monthly Bill Reconciliation When Tariff Mapping Exists (Derived)
├─ Annual fleet miles (User)
├─ Vehicle Class and Service Need (User)
├─ Documented Depot Allocation Fraction from Fleet Study or Contractor Design (Project Document)
├─ Vehicle Electricity Intensity
│  ├─ Measured Kilowatt-Hours per Mile from Fleet Study or Contractor Charging Design (Project Document)
│  ├─ Exact Proposed Vehicle Model, Year, and Drivetrain, when Named by the Opportunity (Linked Opportunity)
│  └─ Standard 1.2 — Vehicle Electricity-Intensity Resolution
├─ Fleet Charging Activity
│  ├─ Vehicle-Arrival Schedule from Fleet Study or Contractor Charging Design (Project Document)
│  ├─ Vehicle-Departure Schedule from Fleet Study or Contractor Charging Design (Project Document)
│  ├─ Uncontrolled Charging Rule from Fleet Study or Contractor Charging Design (Project Document)
│  └─ Standard 1.3 — Fleet Charging Activity and Vehicle Benchmark
├─ Installed Port Count (Linked Opportunity)
├─ Charger Performance
│  ├─ Linked Opportunity names an exact charger
│  │  ├─ Exact Charger Product Information (Linked Opportunity)
│  │  └─ Standard 1.4 — Exact Charger Rating Lookup
│  └─ Linked Opportunity specifies charger requirements but no exact product
│     ├─ Charger Requirements (Linked Opportunity)
│     └─ Standard 1.5 — Requirement-Based Charger Resolution
├─ Electric Vehicle Supply Equipment Standby Energy (Derived)
└─ Standard 1.6 — Fleet Charging Infrastructure Interval Bill Calculation
```

**■ Standard 1.1 — Interval Tariff Resolution**

**Purpose:**
Resolve one complete interval tariff input set before calculating time-of-use, demand, or export value.

**Source:**
U.S. Department of Energy OpenEI Utility Rate Database and exact published utility tariffs

**Utility Rate Database:**
[https://apps.openei.org/USURDB/](https://apps.openei.org/USURDB/)

**Utility Rates API documentation:**
[https://developer.nlr.gov/docs/electricity/openei-utility-rates/](https://developer.nlr.gov/docs/electricity/openei-utility-rates/)

**Lookup Inputs:**

* Serving electric utility from the bill
* Published rate schedule and customer class from the bill
* Tariff effective date covering the analysis period
* Continuous interval energy and demand aligned to the tariff timezone

**Value Needed:**

* One complete tariff input set with exact or conservative-screening provenance

**Input Bindings:**

* Serving electric utility from the bill ← Bill at `Annual Operational Cost Impact > Chronological Electricity Load and Tariff > Time Zone and Daylight-Saving Metadata from the Uploaded Utility Artifact`. Pass the exact bound Serving electric utility from the bill to Interval Tariff Resolution when computing One complete tariff input set with exact or conservative-screening provenance; do not substitute a value from another tree path.
* Published rate schedule and customer class from the bill ← Bill at `Annual Operational Cost Impact > Chronological Electricity Load and Tariff > Rate Schedule and Customer Class`. Pass the exact bound Published rate schedule and customer class from the bill to Interval Tariff Resolution when computing One complete tariff input set with exact or conservative-screening provenance; do not substitute a value from another tree path.
* Tariff effective date covering the analysis period ← Bill at `Annual Operational Cost Impact > Chronological Electricity Load and Tariff > Rate Schedule and Customer Class`. Pass the exact bound Tariff effective date covering the analysis period to Interval Tariff Resolution when computing One complete tariff input set with exact or conservative-screening provenance; do not substitute a value from another tree path.
* Continuous interval energy and demand aligned to the tariff timezone ← Bill at `Annual Operational Cost Impact > Chronological Electricity Load and Tariff > Timestamped Interval Utility Data`. Pass the exact bound Continuous interval energy and demand aligned to the tariff timezone to Interval Tariff Resolution when computing One complete tariff input set with exact or conservative-screening provenance; do not substitute a value from another tree path.

**Output Bindings:**

* One complete tariff input set with exact or conservative-screening provenance → `tariff_input_set` (record set; RECORD_SET) at `Annual Operational Cost Impact > Chronological Electricity Load and Tariff > Standard 1.1 - Interval Tariff Resolution`.

**How to Use:**

1. Verify the serving utility, published schedule identifier, customer class, and analysis date against the source bill.
2. Resolve the exact published tariff by matching the OpenEI record and controlling utility tariff sheet to the same utility, schedule, customer class, and effective date.
3. Normalize energy periods, demand windows, ratchets, seasons, tiers, minimums, non-bypassable charges, and export rules into one versioned input set.
4. Apply the tariff to the aligned interval series as itemized bill components and reconcile monthly energy, billed demand, and variable charges to source bills.
5. If exact tariff execution is unavailable, use only the disclosed conservative screening path: a bill-derived blended variable energy rate, an effective demand rate when both demand charges and billed demand are present, and zero export credit only as an explicit downside assumption.
6. Return the scenario label, complete fields, missing terms, source versions, exact tariff URL, reconciliation residuals, and warnings. Never substitute a fabricated rate schedule or use zero as a missing-rate placeholder.

**Automation:**

* **Selected Strategy:** Exact published-tariff adapter with itemized bill reconciliation and a separate conservative screening adapter.
* **Automation Method:** Match utility identity and effective date, normalize typed tariff rules, execute the itemized bill kernel, reconcile monthly components, and emit one exact or explicitly conservative input set with full provenance.
* **Difficulty:** Hard

**Validation:**
The official OpenEI Utility Rate Database and API documentation define structured utility-rate access. No retained utility tariff, parser fixture, or bill-reconciliation golden case currently proves this category adapter, so exact execution remains implementation-pending and the conservative screen must remain explicitly labeled.

**■ Standard 1.2 — Vehicle Electricity-Intensity Resolution**

**Purpose:**
Resolve one fleet-vehicle electricity intensity from a measured fleet study, an exact proposed model, or the connected class-matched benchmark.

**Source:**
U.S. Department of Energy and U.S. Environmental Protection Agency - FuelEconomy.gov

**FuelEconomy.gov web services and bulk downloads:**
[https://www.fueleconomy.gov/feg/ws/index.shtml](https://www.fueleconomy.gov/feg/ws/index.shtml)

**Lookup Inputs:**

* Measured kilowatt-hours per mile from a Project Document, when available
* Exact proposed vehicle make, model, year, and drivetrain from the linked opportunity, when named
* Vehicle class and service need
* Class-matched electricity intensity from the connected Fleet DNA benchmark

**Value Needed:**

* One selected vehicle electricity intensity in kilowatt-hours per mile at the wall

**Input Bindings:**

* Measured kilowatt-hours per mile from a Project Document, when available ← Project Document at `Annual Operational Cost Impact > Vehicle Electricity Intensity > Measured Kilowatt-Hours per Mile from Fleet Study or Contractor Charging Design`. Apply the exact bound Measured kilowatt-hours per mile from a Project Document, when available to resolve and validate the authoritative record before Vehicle Electricity-Intensity Resolution emits One selected vehicle electricity intensity in kilowatt-hours per mile at the wall.
* Exact proposed vehicle make, model, year, and drivetrain from the linked opportunity, when named ← Linked Opportunity at `Annual Operational Cost Impact > Vehicle Electricity Intensity > Exact Proposed Vehicle Model, Year, and Drivetrain, when Named by the Opportunity`. Apply the exact bound Exact proposed vehicle make, model, year, and drivetrain from the linked opportunity, when named to resolve and validate the authoritative record before Vehicle Electricity-Intensity Resolution emits One selected vehicle electricity intensity in kilowatt-hours per mile at the wall.
* Vehicle class and service need ← User at `Annual Operational Cost Impact > Vehicle Class and Service Need`. Apply the exact bound Vehicle class and service need to resolve and validate the authoritative record before Vehicle Electricity-Intensity Resolution emits One selected vehicle electricity intensity in kilowatt-hours per mile at the wall.
* Class-matched electricity intensity from the connected Fleet DNA benchmark ← Standard Output at `Annual Operational Cost Impact > Fleet Charging Activity > Standard 1.3 - Fleet Charging Activity and Vehicle Benchmark`. Apply the exact bound Class-matched electricity intensity from the connected Fleet DNA benchmark to resolve and validate the authoritative record before Vehicle Electricity-Intensity Resolution emits One selected vehicle electricity intensity in kilowatt-hours per mile at the wall.

**Output Bindings:**

* One selected vehicle electricity intensity in kilowatt-hours per mile at the wall → `proposed_combE` (kWh/100 miles; PROJECT_TOTAL) at `Annual Operational Cost Impact > Vehicle Electricity Intensity > Standard 1.2 - Vehicle Electricity-Intensity Resolution`.

**How to Use:**

1. Use measured kilowatt-hours per mile from a fleet study or contractor charging design when available.
2. Otherwise match an exact opportunity-named vehicle to the official FuelEconomy.gov record and convert its wall-energy field to kilowatt-hours per mile without applying charging efficiency twice.
3. When no exact model is named, use the one class- and vocation-matched electricity intensity selected by the connected Fleet DNA benchmark.
4. If the authoritative context population is unavailable, apply the deterministic RetroFi vehicle-class benchmark derived from the closest reviewed source.
5. Return one selected electricity-intensity value and retain its source version, exact record or eligible population, filters, population size, selection rule, native unit, conversion, and fallback level.

**Automation:**

* **Selected Strategy:** Measured fleet value, then exact FuelEconomy.gov model, then the connected class-matched authoritative benchmark.
* **Automation Method:** Normalize measured or exact-model inputs first; otherwise consume the connected Fleet DNA class result and apply the deterministic single-value fallback.
* **Difficulty:** Easy to Medium

**Validation:**
The retained FuelEconomy.gov fixture proves the exact-record field and unit method. Fleet DNA documents class- and vocation-based operating populations, but the retained fleet population and category adapter are not yet present, so exact lookup is verified while benchmark execution remains pending.

**■ Standard 1.3 — Fleet Charging Activity and Vehicle Benchmark**

**Purpose:**
Select one fleet arrival, departure, charging profile, and class-matched vehicle electricity intensity when a fleet utilization study or exact proposed model is unavailable.

**Source:**
U.S. DOE, U.S. EPA, and National Laboratory of the Rockies benchmark sources

**Fleet DNA commercial fleet operating data:**
[https://www.nlr.gov/transportation/fleettest-fleet-dna](https://www.nlr.gov/transportation/fleettest-fleet-dna)

**Lookup Inputs:**

* Vehicle class and service need
* Annual fleet miles
* Business operating schedule
* Fleet vocation
* Installed port count

**Value Needed:**

* One representative arrival and departure schedule
* One uncontrolled charging profile
* One class-matched vehicle electricity intensity

**Input Bindings:**

* Vehicle class and service need ← User at `Annual Operational Cost Impact > Vehicle Class and Service Need`. Pass the exact bound Vehicle class and service need to Fleet Charging Activity and Vehicle Benchmark when computing One representative arrival and departure schedule and One uncontrolled charging profile and One class-matched vehicle electricity intensity; do not substitute a value from another tree path.
* Annual fleet miles ← User at `Annual Operational Cost Impact > Annual fleet miles`. Pass the exact bound Annual fleet miles to Fleet Charging Activity and Vehicle Benchmark when computing One representative arrival and departure schedule and One uncontrolled charging profile and One class-matched vehicle electricity intensity; do not substitute a value from another tree path.
* Business operating schedule ← Project Document at `Annual Operational Cost Impact > Fleet Charging Activity > Vehicle-Arrival Schedule from Fleet Study or Contractor Charging Design`. Pass the exact bound Business operating schedule to Fleet Charging Activity and Vehicle Benchmark when computing One representative arrival and departure schedule and One uncontrolled charging profile and One class-matched vehicle electricity intensity; do not substitute a value from another tree path.
* Fleet vocation ← Standard Output at `Annual Operational Cost Impact > Standard 1.6 - Fleet Charging Infrastructure Interval Bill Calculation`. Pass the exact bound Fleet vocation to Fleet Charging Activity and Vehicle Benchmark when computing One representative arrival and departure schedule and One uncontrolled charging profile and One class-matched vehicle electricity intensity; do not substitute a value from another tree path.
* Installed port count ← Linked Opportunity at `Annual Operational Cost Impact > Installed Port Count`. Pass the exact bound Installed port count to Fleet Charging Activity and Vehicle Benchmark when computing One representative arrival and departure schedule and One uncontrolled charging profile and One class-matched vehicle electricity intensity; do not substitute a value from another tree path.

**Output Bindings:**

* One representative arrival and departure schedule → `installed_ports` (count; PROJECT_TOTAL) at `Annual Operational Cost Impact > Fleet Charging Activity > Standard 1.3 - Fleet Charging Activity and Vehicle Benchmark`.
* One uncontrolled charging profile → `proposed_combE` (kWh/100 miles; PROJECT_TOTAL) at `Annual Operational Cost Impact > Fleet Charging Activity > Standard 1.3 - Fleet Charging Activity and Vehicle Benchmark`.
* One class-matched vehicle electricity intensity → `proposed_combE` (kWh/100 miles; PROJECT_TOTAL) at `Annual Operational Cost Impact > Fleet Charging Activity > Standard 1.3 - Fleet Charging Activity and Vehicle Benchmark`.

**How to Use:**

1. Map the Fleet Charging Infrastructure inputs to the documented Fleet Charging Activity and Vehicle Benchmark source fields or model inputs: Vehicle class and service need; Annual fleet miles; Business operating schedule; Fleet vocation; Installed port count.
2. Apply the category's documented source-version and compatibility filters, execute its exact numeric rule, and retain the selected output, unit, scope, fixture, and population or equation provenance. Report a limitation when that source-specific implementation is absent.
3. When an exact value is unavailable, use only a source-specific retained population or equation with documented filters, numeric rule, unit, scope, and version; otherwise report the implementation limitation.
4. Return one selected representative arrival and departure schedule; One uncontrolled charging profile; One class-matched vehicle electricity intensity.
5. Retain the Fleet Charging Activity and Vehicle Benchmark source version, exact fields or model inputs, native units, eligible population, population size, selected-value rule, fallback level, selected record, and warnings.

**Automation:**

* **Selected Strategy:** Category-specific deterministic selection from an explicitly implemented and evidenced compatible source population or equation.
* **Automation Method:** Apply the category's documented source-version and compatibility filters, execute its exact numeric rule, and retain the selected output, unit, scope, fixture, and population or equation provenance. Report a limitation when that source-specific implementation is absent.
* **Difficulty:** Medium

**Validation:**
NLR Fleet DNA provides real-world commercial duty-cycle populations by vocation and vehicle class. A retained eligible-population extract and fleet-charging adapter are not yet present, so the context filters are defined but the selected median schedule is implementation-pending.

**■ Standard 1.4 — Exact Charger Rating Lookup**

**Purpose:**
Resolve native AC-output or DC-output charging and low-power fields when the opportunity names an exact certified charger.

**Source:**
U.S. Environmental Protection Agency - ENERGY STAR Product Finder

**ENERGY STAR Product Finder datasets and API:**
[https://www.energystar.gov/productfinder/advanced](https://www.energystar.gov/productfinder/advanced)

**EV charger product criteria and finder:**
[https://www.energystar.gov/products/ev_chargers](https://www.energystar.gov/products/ev_chargers)

**Lookup Inputs:**

* Exact charger make and model
* Charger product type: AC-output or DC-output
* Rated charger power and application
* Opportunity product information

**Value Needed:**

* For AC-output chargers: maximum output power, no-vehicle or idle power, and mode-specific total-loss fields
* For DC-output chargers: maximum output power, no-vehicle or idle power, and loading-adjusted efficiency

**Input Bindings:**

* Exact charger make and model ← Linked Opportunity at `Annual Operational Cost Impact > Charger Performance > Linked Opportunity names an exact charger > Exact Charger Product Information`. Apply the exact bound Exact charger make and model to resolve and validate the authoritative record before Exact Charger Rating Lookup emits For AC-output chargers: maximum output power, no-vehicle or idle power, and mode-specific total-loss fields and For DC-output chargers: maximum output power, no-vehicle or idle power, and loading-adjusted efficiency.
* Charger product type: AC-output or DC-output ← Linked Opportunity at `Annual Operational Cost Impact > Charger Performance > Linked Opportunity names an exact charger > Exact Charger Product Information`. Apply the exact bound Charger product type: AC-output or DC-output to resolve and validate the authoritative record before Exact Charger Rating Lookup emits For AC-output chargers: maximum output power, no-vehicle or idle power, and mode-specific total-loss fields and For DC-output chargers: maximum output power, no-vehicle or idle power, and loading-adjusted efficiency.
* Rated charger power and application ← Linked Opportunity at `Annual Operational Cost Impact > Charger Performance > Linked Opportunity names an exact charger > Exact Charger Product Information`. Apply the exact bound Rated charger power and application to resolve and validate the authoritative record before Exact Charger Rating Lookup emits For AC-output chargers: maximum output power, no-vehicle or idle power, and mode-specific total-loss fields and For DC-output chargers: maximum output power, no-vehicle or idle power, and loading-adjusted efficiency.
* Opportunity product information ← Linked Opportunity at `Annual Operational Cost Impact > Charger Performance > Linked Opportunity names an exact charger > Exact Charger Product Information`. Apply the exact bound Opportunity product information to resolve and validate the authoritative record before Exact Charger Rating Lookup emits For AC-output chargers: maximum output power, no-vehicle or idle power, and mode-specific total-loss fields and For DC-output chargers: maximum output power, no-vehicle or idle power, and loading-adjusted efficiency.

**Output Bindings:**

* For AC-output chargers: maximum output power, no-vehicle or idle power, and mode-specific total-loss fields → `standby_kW_per_port` (kW/port; RECORD_SET) at `Annual Operational Cost Impact > Charger Performance > Linked Opportunity names an exact charger > Standard 1.4 - Exact Charger Rating Lookup`.
* For DC-output chargers: maximum output power, no-vehicle or idle power, and loading-adjusted efficiency → `standby_kW_per_port` (kW/port; RECORD_SET) at `Annual Operational Cost Impact > Charger Performance > Linked Opportunity names an exact charger > Standard 1.4 - Exact Charger Rating Lookup`.

**How to Use:**

1. Match the exact manufacturer and model, require active certification, and preserve whether the record is AC-output or DC-output.
2. For an AC-output charger, retain maximum output power, no-vehicle or idle input power, and the applicable current-specific operation-mode total-loss field.
3. Normalize AC active input power as output power plus the applicable mode-specific total loss, with units converted consistently.
4. For a DC-output charger, retain maximum output power, no-vehicle or idle AC input power, and average loading-adjusted efficiency.
5. Normalize DC active input power as output power divided by loading-adjusted efficiency, then apply native no-vehicle or idle input only to the corresponding non-charging duration.
6. Return one exact compatible native-field record and retain the product ID, source version, fields, units, and charger-type normalization path.

**Automation:**

* **Selected Strategy:** Exact linked-opportunity product match against the official U.S. Environmental Protection Agency - ENERGY STAR Product Finder records.
* **Automation Method:** Normalize the opportunity model identifiers, perform an exact active-record lookup, apply category compatibility filters, and return only the required native source fields.
* **Difficulty:** Easy to Medium

**Validation:**
The retained official ENERGY STAR fixture inspects separate AC-output and DC-output certified records and binds maximum output power, AC mode-specific total loss, native idle or no-vehicle input, and DC loading-adjusted efficiency as the fraction 0.95. The category adapter and formula-level golden test have not yet been added, so source-field support is verified while category execution proof remains pending.

**■ Standard 1.5 — Requirement-Based Charger Resolution**

**Purpose:**
Interpret charger requirements from the opportunity, separate AC-output and DC-output products, and select one compatible certified record value for each required native field.

**Source:**
U.S. Environmental Protection Agency - ENERGY STAR Product Finder

**ENERGY STAR Product Finder datasets and API:**
[https://www.energystar.gov/productfinder/advanced](https://www.energystar.gov/productfinder/advanced)

**EV charger product criteria and finder:**
[https://www.energystar.gov/products/ev_chargers](https://www.energystar.gov/products/ev_chargers)

**Lookup Inputs:**

* Charger product type: AC-output or DC-output
* Charger class and intended application
* Rated power requirement
* Opportunity performance requirements

**Value Needed:**

* One selected native-field performance record from the compatible AC-output or DC-output population
* The eligible population, filters, population size, and median selection rule retained internally

**Input Bindings:**

* Charger product type: AC-output or DC-output ← Linked Opportunity at `Annual Operational Cost Impact > Charger Performance > Linked Opportunity specifies charger requirements but no exact product > Charger Requirements`. Apply the exact bound Charger product type: AC-output or DC-output as a compatibility filter before Requirement-Based Charger Resolution emits One selected native-field performance record from the compatible AC-output or DC-output population and The eligible population, filters, population size, and median selection rule retained internally.
* Charger class and intended application ← Linked Opportunity at `Annual Operational Cost Impact > Charger Performance > Linked Opportunity specifies charger requirements but no exact product > Charger Requirements`. Apply the exact bound Charger class and intended application as a compatibility filter before Requirement-Based Charger Resolution emits One selected native-field performance record from the compatible AC-output or DC-output population and The eligible population, filters, population size, and median selection rule retained internally.
* Rated power requirement ← Linked Opportunity at `Annual Operational Cost Impact > Charger Performance > Linked Opportunity specifies charger requirements but no exact product > Charger Requirements`. Apply the exact bound Rated power requirement as a compatibility filter before Requirement-Based Charger Resolution emits One selected native-field performance record from the compatible AC-output or DC-output population and The eligible population, filters, population size, and median selection rule retained internally.
* Opportunity performance requirements ← Linked Opportunity at `Annual Operational Cost Impact > Charger Performance > Linked Opportunity specifies charger requirements but no exact product > Charger Requirements`. Apply the exact bound Opportunity performance requirements as a compatibility filter before Requirement-Based Charger Resolution emits One selected native-field performance record from the compatible AC-output or DC-output population and The eligible population, filters, population size, and median selection rule retained internally.

**Output Bindings:**

* One selected native-field performance record from the compatible AC-output or DC-output population → `standby_kW_per_port` (kW/port; RECORD_SET) at `Annual Operational Cost Impact > Charger Performance > Linked Opportunity specifies charger requirements but no exact product > Standard 1.5 - Requirement-Based Charger Resolution`.
* The eligible population, filters, population size, and median selection rule retained internally → `standby_kW_per_port` (kW/port; RECORD_SET) at `Annual Operational Cost Impact > Charger Performance > Linked Opportunity specifies charger requirements but no exact product > Standard 1.5 - Requirement-Based Charger Resolution`.

**How to Use:**

1. Extract the charger type, application, rated-power requirement, certification requirement, and every mandatory performance limit from the opportunity.
2. Filter AC-output and DC-output records separately and preserve each source's native field family and unit.
3. Use an official recommended or typical compatible record when the source designates one; otherwise use a valid weighted median or the ordinary median of the eligible compatible population.
4. For AC-output records, calculate active input as output power plus the selected mode-specific total loss and keep idle or no-vehicle input separate.
5. For DC-output records, calculate active input as output power divided by loading-adjusted efficiency and keep idle or no-vehicle AC input separate.
6. Return one selected compatible native-field record without choosing a future contractor product, and retain the complete population and selection trace.

**Automation:**

* **Selected Strategy:** Requirement-based candidate-set resolution from the official U.S. Environmental Protection Agency - ENERGY STAR Product Finder population.
* **Automation Method:** Parse the opportunity requirements, apply exact product-family and performance filters, preserve the eligible population, and select one official typical value, weighted median, or median in native units.
* **Difficulty:** Easy to Medium

**Validation:**
The official ENERGY STAR EV charger criteria and Product Finder access path were checked. The source distinguishes AC-output total-loss fields from DC-output loading-adjusted efficiency, which is normalized to a fraction. No retained category export currently proves the requirement filters, eligible population, population size, or selected median, so implementation proof remains pending.

**■ Standard 1.6 — Fleet Charging Infrastructure Interval Bill Calculation**

**Purpose:**
Use National Laboratory of the Rockies - REopt V3 and REopt.jl to resolve baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance from the listed category inputs.

**Source:**
National Laboratory of the Rockies - REopt V3 and REopt.jl

**REopt API V3 documentation:**
[https://developer.nlr.gov/docs/energy-optimization/reopt/v3/](https://developer.nlr.gov/docs/energy-optimization/reopt/v3/)

**REopt.jl input reference:**
[https://natlabrockies.github.io/REopt.jl/dev/reopt/inputs/](https://natlabrockies.github.io/REopt.jl/dev/reopt/inputs/)

**REopt.jl open-source package:**
[https://github.com/NatLabRockies/REopt.jl](https://github.com/NatLabRockies/REopt.jl)

**Lookup Inputs:**

* Timestamped interval utility data from the uploaded utility artifact
* Time zone and daylight-saving metadata from the uploaded utility artifact
* Annual fleet miles
* Depot allocation fraction
* Vehicle Class and Service Need
* Measured kWh per Mile from the fleet study or contractor charging design
* Vehicle-arrival schedule from the fleet study or contractor charging design
* Vehicle-departure schedule from the fleet study or contractor charging design
* Uncontrolled charging rule from the fleet study or contractor charging design
* Rated Charger Power or Capacity
* Installed port count
* Resolved vehicle electricity intensity from the connected vehicle process
* Resolved charger efficiency, standby power, and rated capacity from the connected product process

**Value Needed:**

* Baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance

**Input Bindings:**

* Timestamped interval utility data from the uploaded utility artifact ← Bill at `Annual Operational Cost Impact > Chronological Electricity Load and Tariff > Timestamped Interval Utility Data`. Pass the exact bound Timestamped interval utility data from the uploaded utility artifact to Fleet Charging Infrastructure Interval Bill Calculation when computing Baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance; do not substitute a value from another tree path.
* Time zone and daylight-saving metadata from the uploaded utility artifact ← Bill at `Annual Operational Cost Impact > Chronological Electricity Load and Tariff > Time Zone and Daylight-Saving Metadata from the Uploaded Utility Artifact`. Pass the exact bound Time zone and daylight-saving metadata from the uploaded utility artifact to Fleet Charging Infrastructure Interval Bill Calculation when computing Baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance; do not substitute a value from another tree path.
* Annual fleet miles ← User at `Annual Operational Cost Impact > Annual fleet miles`. Pass the exact bound Annual fleet miles to Fleet Charging Infrastructure Interval Bill Calculation when computing Baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance; do not substitute a value from another tree path.
* Depot allocation fraction ← Project Document at `Annual Operational Cost Impact > Documented Depot Allocation Fraction from Fleet Study or Contractor Design`. Pass the exact bound Depot allocation fraction to Fleet Charging Infrastructure Interval Bill Calculation when computing Baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance; do not substitute a value from another tree path.
* Vehicle Class and Service Need ← User at `Annual Operational Cost Impact > Vehicle Class and Service Need`. Pass the exact bound Vehicle Class and Service Need to Fleet Charging Infrastructure Interval Bill Calculation when computing Baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance; do not substitute a value from another tree path.
* Measured kWh per Mile from the fleet study or contractor charging design ← Project Document at `Annual Operational Cost Impact > Vehicle Electricity Intensity > Measured Kilowatt-Hours per Mile from Fleet Study or Contractor Charging Design`. Pass the exact bound Measured kWh per Mile from the fleet study or contractor charging design to Fleet Charging Infrastructure Interval Bill Calculation when computing Baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance; do not substitute a value from another tree path.
* Vehicle-arrival schedule from the fleet study or contractor charging design ← Project Document at `Annual Operational Cost Impact > Fleet Charging Activity > Vehicle-Arrival Schedule from Fleet Study or Contractor Charging Design`. Pass the exact bound Vehicle-arrival schedule from the fleet study or contractor charging design to Fleet Charging Infrastructure Interval Bill Calculation when computing Baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance; do not substitute a value from another tree path.
* Vehicle-departure schedule from the fleet study or contractor charging design ← Project Document at `Annual Operational Cost Impact > Fleet Charging Activity > Vehicle-Departure Schedule from Fleet Study or Contractor Charging Design`. Pass the exact bound Vehicle-departure schedule from the fleet study or contractor charging design to Fleet Charging Infrastructure Interval Bill Calculation when computing Baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance; do not substitute a value from another tree path.
* Uncontrolled charging rule from the fleet study or contractor charging design ← Project Document at `Annual Operational Cost Impact > Fleet Charging Activity > Uncontrolled Charging Rule from Fleet Study or Contractor Charging Design`. Pass the exact bound Uncontrolled charging rule from the fleet study or contractor charging design to Fleet Charging Infrastructure Interval Bill Calculation when computing Baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance; do not substitute a value from another tree path.
* Rated Charger Power or Capacity ← Standard Output at `Annual Operational Cost Impact > Charger Performance > Linked Opportunity names an exact charger > Standard 1.4 - Exact Charger Rating Lookup`. Pass the exact bound Rated Charger Power or Capacity to Fleet Charging Infrastructure Interval Bill Calculation when computing Baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance; do not substitute a value from another tree path.
* Installed port count ← Linked Opportunity at `Annual Operational Cost Impact > Installed Port Count`. Pass the exact bound Installed port count to Fleet Charging Infrastructure Interval Bill Calculation when computing Baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance; do not substitute a value from another tree path.
* Resolved vehicle electricity intensity from the connected vehicle process ← Standard Output at `Annual Operational Cost Impact > Vehicle Electricity Intensity > Standard 1.2 - Vehicle Electricity-Intensity Resolution`. Pass the exact bound Resolved vehicle electricity intensity from the connected vehicle process to Fleet Charging Infrastructure Interval Bill Calculation when computing Baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance; do not substitute a value from another tree path.
* Resolved charger efficiency, standby power, and rated capacity from the connected product process ← Standard Output at `Annual Operational Cost Impact > Charger Performance > Linked Opportunity specifies charger requirements but no exact product > Standard 1.5 - Requirement-Based Charger Resolution`. Pass the exact bound Resolved charger efficiency, standby power, and rated capacity from the connected product process to Fleet Charging Infrastructure Interval Bill Calculation when computing Baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance; do not substitute a value from another tree path.

**Output Bindings:**

* Baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance → `baseline_annual_bill` (USD/year; RECORD_SET) at `Annual Operational Cost Impact > Standard 1.6 - Fleet Charging Infrastructure Interval Bill Calculation`.

**How to Use:**

1. Map the Fleet Charging Infrastructure inputs to the documented Fleet Charging Infrastructure Interval Bill Calculation source fields or model inputs: Timestamped interval utility data from the uploaded utility artifact; Time zone and daylight-saving metadata from the uploaded utility artifact; Annual fleet miles; Depot allocation fraction; Vehicle Class and Service Need; Measured kWh per Mile from the fleet study or contractor charging design; Vehicle-arrival schedule from the fleet study or contractor charging design; Vehicle-departure schedule from the fleet study or contractor charging design; Uncontrolled charging rule from the fleet study or contractor charging design; Rated Charger Power or Capacity; Installed port count; Resolved vehicle electricity intensity from the connected vehicle process; Resolved charger efficiency, standby power, and rated capacity from the connected product process.
2. Align the interval load and tariff calendar, apply the category constraints, solve baseline and proposed cases, compare bill components, and retain solver and input provenance.
3. When an exact value is unavailable, use only a source-specific retained population or equation with documented filters, numeric rule, unit, scope, and version; otherwise report the implementation limitation.
4. Return one selected baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance.
5. Retain the Fleet Charging Infrastructure Interval Bill Calculation source version, exact fields or model inputs, native units, eligible population, population size, selected-value rule, fallback level, selected record, and warnings.

**Automation:**

* **Selected Strategy:** Pinned local REopt.jl optimization after complete chronological load, tariff, and technology inputs pass validation.
* **Automation Method:** Align the interval load and tariff calendar, apply the category constraints, solve baseline and proposed cases, compare bill components, and retain solver and input provenance.
* **Difficulty:** Hard

**Validation:**
The official V3 input documentation and open-source solver were checked, so local optimization is technically possible. No category dispatch adapter or golden result is retained, and REopt cannot supply a missing load profile, tariff, or technology design.
