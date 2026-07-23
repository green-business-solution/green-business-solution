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
│  ├─ Published Utility Tariff and Effective-Date Mapping (Derived)
│  ├─ One Selected Interval Tariff Value (Derived)
│  └─ Monthly Bill Reconciliation When Tariff Mapping Exists (Derived)
├─ Annual fleet miles (User)
├─ Vehicle Class and Service Need (User)
├─ Documented Depot Allocation Fraction from Fleet Study or Contractor Design (Project Document)
├─ Vehicle Electricity Intensity
│  ├─ Measured Kilowatt-Hours per Mile from Fleet Study or Contractor Charging Design (Project Document)
│  ├─ Exact Proposed Vehicle Model, Year, and Drivetrain, when Named by the Opportunity (Linked Opportunity)
│  └─ Standard 1.1 — Vehicle Electricity-Intensity Resolution
├─ Fleet Charging Activity
│  ├─ Vehicle-Arrival Schedule from Fleet Study or Contractor Charging Design (Project Document)
│  ├─ Vehicle-Departure Schedule from Fleet Study or Contractor Charging Design (Project Document)
│  ├─ Uncontrolled Charging Rule from Fleet Study or Contractor Charging Design (Project Document)
│  └─ Standard 1.2 — Fleet Charging Activity and Vehicle Benchmark
├─ Installed Port Count (Linked Opportunity)
├─ Charger Performance
│  ├─ Linked Opportunity names an exact charger
│  │  ├─ Exact Charger Product Information (Linked Opportunity)
│  │  └─ Standard 1.3 — Exact Charger Rating Lookup
│  └─ Linked Opportunity specifies charger requirements but no exact product
│     ├─ Charger Requirements (Linked Opportunity)
│     └─ Standard 1.4 — Requirement-Based Charger Resolution
├─ Electric Vehicle Supply Equipment Standby Energy (Derived)
└─ Standard 1.5 — Fleet Charging Infrastructure Interval Bill Calculation
```

**■ Standard 1.1 — Vehicle Electricity-Intensity Resolution**

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

**■ Standard 1.2 — Fleet Charging Activity and Vehicle Benchmark**

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

**How to Use:**

1. Map the Fleet Charging Infrastructure inputs to the documented Fleet Charging Activity and Vehicle Benchmark source fields or model inputs: Vehicle class and service need; Annual fleet miles; Business operating schedule; Fleet vocation; Installed port count.
2. Apply the category's reviewed context fields and source-version filters, use an official recommended or typical value when available, otherwise use a valid weighted median or ordinary median, and retain the selected value plus population provenance.
3. When an exact value is unavailable, select one context-matched authoritative benchmark and then one deterministic RetroFi benchmark if needed; do not insert an unexplained cross-category default.
4. Return one selected representative arrival and departure schedule; One uncontrolled charging profile; One class-matched vehicle electricity intensity.
5. Retain the Fleet Charging Activity and Vehicle Benchmark source version, exact fields or model inputs, native units, eligible population, population size, selected-value rule, fallback level, selected record, and warnings.

**Automation:**

* **Selected Strategy:** Category-specific deterministic selection from the closest authoritative compatible population.
* **Automation Method:** Apply the category's reviewed context fields and source-version filters, use an official recommended or typical value when available, otherwise use a valid weighted median or ordinary median, and retain the selected value plus population provenance.
* **Difficulty:** Medium

**Validation:**
NLR Fleet DNA provides real-world commercial duty-cycle populations by vocation and vehicle class. A retained eligible-population extract and fleet-charging adapter are not yet present, so the context filters are defined but the selected median schedule is implementation-pending.

**■ Standard 1.3 — Exact Charger Rating Lookup**

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
The retained official ENERGY STAR fixture inspects separate AC-output and DC-output certified records and binds maximum output power, AC mode-specific total loss, native idle or no-vehicle input, and DC loading-adjusted efficiency fields. The category adapter and formula-level golden test have not yet been added, so source-field support is verified while category execution proof remains pending.

**■ Standard 1.4 — Requirement-Based Charger Resolution**

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
The official ENERGY STAR EV charger criteria and Product Finder access path were checked. The source distinguishes AC-output total-loss fields from DC-output loading-adjusted efficiency. No retained category export currently proves the requirement filters, eligible population, population size, or selected median, so implementation proof remains pending.

**■ Standard 1.5 — Fleet Charging Infrastructure Interval Bill Calculation**

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
* Authoritative tariff mapping, which is not yet verified
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

**How to Use:**

1. Map the Fleet Charging Infrastructure inputs to the documented Fleet Charging Infrastructure Interval Bill Calculation source fields or model inputs: Timestamped interval utility data from the uploaded utility artifact; Time zone and daylight-saving metadata from the uploaded utility artifact; Authoritative tariff mapping, which is not yet verified; Annual fleet miles; Depot allocation fraction; Vehicle Class and Service Need; Measured kWh per Mile from the fleet study or contractor charging design; Vehicle-arrival schedule from the fleet study or contractor charging design; Vehicle-departure schedule from the fleet study or contractor charging design; Uncontrolled charging rule from the fleet study or contractor charging design; Rated Charger Power or Capacity; Installed port count; Resolved vehicle electricity intensity from the connected vehicle process; Resolved charger efficiency, standby power, and rated capacity from the connected product process.
2. Align the interval load and tariff calendar, apply the category constraints, solve baseline and proposed cases, compare bill components, and retain solver and input provenance.
3. When an exact value is unavailable, select one context-matched authoritative benchmark and then one deterministic RetroFi benchmark if needed; do not insert an unexplained cross-category default.
4. Return one selected baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance.
5. Retain the Fleet Charging Infrastructure Interval Bill Calculation source version, exact fields or model inputs, native units, eligible population, population size, selected-value rule, fallback level, selected record, and warnings.

**Automation:**

* **Selected Strategy:** Pinned local REopt.jl optimization after complete chronological load, tariff, and technology inputs pass validation.
* **Automation Method:** Align the interval load and tariff calendar, apply the category constraints, solve baseline and proposed cases, compare bill components, and retain solver and input provenance.
* **Difficulty:** Hard

**Validation:**
The official V3 input documentation and open-source solver were checked, so local optimization is technically possible. No category dispatch adapter or golden result is retained, and REopt cannot supply a missing load profile, tariff, or technology design.
