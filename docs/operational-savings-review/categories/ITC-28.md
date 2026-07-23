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
│  ├─ Authoritative Tariff Mapping Is Not Yet Verified (Derived)
│  ├─ No Interval Dollar Estimate Until Tariff Rules Are Resolved (Derived)
│  └─ Monthly Bill Reconciliation When Tariff Mapping Exists (Derived)
├─ Annual fleet miles (User)
├─ Documented Depot allocation fraction from Nameplate, Measurement, Audit, or Contractor Specification (Linked Opportunity)
├─ Vehicle Class and Service Need (User)
├─ Selected Vehicle Model, if known (Linked Opportunity)
├─ Measured kWh per Mile from Fleet Study or Contractor Charging Design (Linked Opportunity)
├─ Vehicle-arrival schedule from Fleet Study or Contractor Charging Design (Linked Opportunity)
├─ Vehicle-departure schedule from Fleet Study or Contractor Charging Design (Linked Opportunity)
├─ Uncontrolled charging rule from Fleet Study or Contractor Charging Design (Linked Opportunity)
├─ Installed port count (Linked Opportunity)
├─ Charger Performance
│  ├─ Standard 1.1 — Exact Vehicle Efficiency Lookup
│  ├─ Linked Opportunity names an exact charger
│  │  ├─ Exact Charger Product Information (Linked Opportunity)
│  │  └─ Standard 1.2 — Exact Charger Rating Lookup
│  └─ Linked Opportunity specifies charger requirements but no exact product
│     ├─ Charger Requirements (Linked Opportunity)
│     └─ Standard 1.3 — Requirement-Based Charger Resolution
├─ EVSE standby energy (Derived)
└─ Standard 1.4 — Fleet Charging Infrastructure Interval Bill Calculation
```

**■ Standard 1.1 — Exact Vehicle Efficiency Lookup**

**Purpose:**
Use U.S. Department of Energy and U.S. Environmental Protection Agency - FuelEconomy.gov to resolve exact-record fuel economy or electricity use per distance, with units and vehicle-record provenance from the listed category inputs.

**Source:**
U.S. Department of Energy and U.S. Environmental Protection Agency - FuelEconomy.gov

**FuelEconomy.gov web services and bulk downloads:**
[https://www.fueleconomy.gov/feg/ws/index.shtml](https://www.fueleconomy.gov/feg/ws/index.shtml)

**Lookup Inputs:**

* Vehicle Class and Service Need
* Selected Vehicle Model, if known
* Measured kWh per Mile from the fleet study or contractor charging design

**Value Needed:**

* Exact-record fuel economy or electricity use per distance, with units and vehicle-record provenance

**How to Use:**

1. Read the exact manufacturer, model, and product configuration from the linked fleet charging infrastructure opportunity.
2. Query the official source for the exact model and filter by application, capacity, active specification, and the native certified fields required by this formula.
3. Require one compatible record; reject partial model matches, inactive listings, incompatible configurations, and records whose native test unit does not match the formula.
4. Return exact-record fuel economy or electricity use per distance, with units and vehicle-record provenance.
5. Retain the source version, exact record identity, matched model text, returned native fields and units, and any ambiguity decision.

**Automation:**

* **Selected Strategy:** Exact linked-opportunity product match against the official U.S. Department of Energy and U.S. Environmental Protection Agency - FuelEconomy.gov records.
* **Automation Method:** Normalize the opportunity model identifiers, perform an exact active-record lookup, apply category compatibility filters, and return only the required native source fields.
* **Difficulty:** Easy to Medium

**Validation:**
The official downloadable vehicle schema and exact-record method were checked, and the retained source fixture validates the technical fields and units. The fleet-charging category adapter and formula-level golden test have not yet been added, and class-based estimates remain disabled.

**■ Standard 1.2 — Exact Charger Rating Lookup**

**Purpose:**
Resolve active charging efficiency, standby power, and rated capacity when the opportunity names an exact certified charger.

**Source:**
U.S. Environmental Protection Agency - ENERGY STAR Product Finder

**ENERGY STAR Product Finder datasets and API:**
[https://www.energystar.gov/productfinder/advanced](https://www.energystar.gov/productfinder/advanced)

**EV charger product criteria and finder:**
[https://www.energystar.gov/products/ev_chargers](https://www.energystar.gov/products/ev_chargers)

**Lookup Inputs:**

* Exact charger make and model
* Rated charger power and application
* Opportunity product information

**Value Needed:**

* Certified active efficiency, standby power, and rated capacity with units

**How to Use:**

1. Read the exact manufacturer, model, and product configuration from the linked fleet charging infrastructure opportunity.
2. Query the official source for the exact model and filter by application, capacity, active specification, and the native certified fields required by this formula.
3. Require one compatible record; reject partial model matches, inactive listings, incompatible configurations, and records whose native test unit does not match the formula.
4. Return certified active efficiency, standby power, and rated capacity with units.
5. Retain the source version, exact record identity, matched model text, returned native fields and units, and any ambiguity decision.

**Automation:**

* **Selected Strategy:** Exact linked-opportunity product match against the official U.S. Environmental Protection Agency - ENERGY STAR Product Finder records.
* **Automation Method:** Normalize the opportunity model identifiers, perform an exact active-record lookup, apply category compatibility filters, and return only the required native source fields.
* **Difficulty:** Easy to Medium

**Validation:**
The official ENERGY STAR EV charger criteria and Product Finder access path were checked. Exact active-model lookup is technically possible, but the category-specific adapter, retained EV charger record, and formula-level golden test have not yet been added.

**■ Standard 1.3 — Requirement-Based Charger Resolution**

**Purpose:**
Interpret charger requirements from the opportunity and determine whether a compatible certified product record can supply the needed performance values.

**Source:**
U.S. Environmental Protection Agency - ENERGY STAR Product Finder

**ENERGY STAR Product Finder datasets and API:**
[https://www.energystar.gov/productfinder/advanced](https://www.energystar.gov/productfinder/advanced)

**EV charger product criteria and finder:**
[https://www.energystar.gov/products/ev_chargers](https://www.energystar.gov/products/ev_chargers)

**Lookup Inputs:**

* Charger class and intended application
* Rated power requirement
* Opportunity performance requirements

**Value Needed:**

* Eligible compatible certified charger population with documented low, median, and high performance, or no value when no compatible record remains

**How to Use:**

1. Extract the application, capacity, certification, and performance limits from the linked fleet charging infrastructure opportunity requirements.
2. Filter the official current-product population by every mandatory requirement, product-family boundary, active specification, and native test unit.
3. Reject the path when no compatible record remains; when several records remain, keep the eligible population and calculate a documented low, median, and high value without selecting the contractor's future product.
4. Return eligible compatible certified charger population with documented low, median, and high performance, or no value when no compatible record remains.
5. Retain the source version, complete filters, eligible record identities, population size, native units, summary rule, and no-result reason.

**Automation:**

* **Selected Strategy:** Requirement-based candidate-set resolution from the official U.S. Environmental Protection Agency - ENERGY STAR Product Finder population.
* **Automation Method:** Parse the opportunity requirements, apply exact product-family and performance filters, preserve the eligible population, and calculate deterministic low, median, and high native-unit results.
* **Difficulty:** Easy to Medium

**Validation:**
The official ENERGY STAR EV charger criteria and Product Finder access path were checked. No retained category export currently proves the requirement filters, eligible population, population size, or low, median, and high result.

**■ Standard 1.4 — Fleet Charging Infrastructure Interval Bill Calculation**

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
3. Reject the Fleet Charging Infrastructure path when a required source field, project design input, compatible record, or native unit is absent; do not insert a cross-category default.
4. Return baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance.
5. Retain the Fleet Charging Infrastructure Interval Bill Calculation source version, exact fields or model inputs, native units, selected records, warnings, and category-specific rejection reason.

**Automation:**

* **Selected Strategy:** Pinned local REopt.jl optimization after complete chronological load, tariff, and technology inputs pass validation.
* **Automation Method:** Align the interval load and tariff calendar, apply the category constraints, solve baseline and proposed cases, compare bill components, and retain solver and input provenance.
* **Difficulty:** Hard

**Validation:**
The official V3 input documentation and open-source solver were checked, so local optimization is technically possible. No category dispatch adapter or golden result is retained, and REopt cannot supply a missing load profile, tariff, or technology design.
