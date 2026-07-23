# Information Card — Microgrid System

**Retrofits included:** Microgrid system

**Overview:** A microgrid coordinates selected generation, storage, fuel, and grid resources as one interval system to change direct energy purchases.

**Broader Formula**

```text
Annual Operational Savings =
Baseline Annual Bill − Proposed Annual Bill
```

**Expanded Formula**

```text
Annual Operational Savings = Baseline Grid and Fuel Bill - Proposed Grid and Fuel Bill

Apply the ITC-17, ITC-20 or ITC-21, and ITC-23 resource balances inside one optimization.
```

**Information Tree**

```text
Annual Operational Savings
├─ Chronological Electricity Load and Tariff
│  ├─ Timestamped Interval Utility Data (Bill)
│  ├─ Time Zone and Daylight-Saving Metadata from the Uploaded Utility Artifact (Bill)
│  ├─ Rate Schedule and Customer Class (Bill)
│  ├─ Published Utility Tariff and Effective-Date Mapping (Derived)
│  ├─ One Selected Interval Tariff Value (Derived)
│  └─ Monthly Bill Reconciliation When Tariff Mapping Exists (Derived)
├─ Included component types (User)
├─ Opportunity Equipment or Performance Requirements (Linked Opportunity)
├─ Component site and operating inputs
│  ├─ Site Location when PV or wind is included (Profile)
│  ├─ PV array configuration when PV is included
│  │  ├─ DC capacity (Linked Opportunity)
│  │  ├─ Module Type (Linked Opportunity)
│  │  ├─ Array type (Linked Opportunity)
│  │  ├─ System losses (Linked Opportunity)
│  │  ├─ Tilt (Linked Opportunity)
│  │  └─ Azimuth (Linked Opportunity)
│  ├─ Wind configuration when wind is included
│  │  ├─ Wind Turbine Class or Intended Application (Linked Opportunity)
│  │  ├─ Exact Turbine Model or Power Curve (Linked Opportunity)
│  │  ├─ Hub Height (Linked Opportunity)
│  │  ├─ Loss factor (Linked Opportunity)
│  │  └─ Analysis Year (User)
│  ├─ Fuel-cell or CHP configuration when fuel generation is included
│  │  ├─ Prime mover (Linked Opportunity)
│  │  ├─ Input fuel (Linked Opportunity)
│  │  ├─ Selected Unit Model, if known (Linked Opportunity)
│  │  ├─ Installed capacity (Linked Opportunity)
│  │  ├─ Annual operating profile (Linked Opportunity)
│  │  └─ Documented Coincident useful thermal-load constraint when heat recovery is included from Nameplate, Measurement, Audit, or Contractor Specification (Project Document)
│  └─ Storage configuration when storage is included
│     ├─ Power capacity (Linked Opportunity)
│     ├─ Usable-energy capacity (Linked Opportunity)
│     ├─ Charge efficiency (Linked Opportunity)
│     ├─ Discharge efficiency (Linked Opportunity)
│     ├─ Initial state of charge (Linked Opportunity)
│     ├─ Terminal state-of-charge constraint (Linked Opportunity)
│     └─ Reserve constraint (Linked Opportunity)
├─ PV or wind interval generation when included
│  ├─ Standard 1.1 — PVWatts Solar Production Calculation
│  └─ Standard 1.2 — Small Wind Production Simulation
├─ Standard 1.3 — Microgrid System Performance Balance
└─ Standard 1.4 — Microgrid System Interval Bill Calculation
```

**■ Standard 1.1 — PVWatts Solar Production Calculation**

**Purpose:**
Use National Laboratory of the Rockies - PVWatts V8 to resolve interval or annual AC electricity generation, with model inputs, warnings, units, and source version from the listed category inputs.

**Source:**
National Laboratory of the Rockies - PVWatts V8

**PVWatts V8 API documentation:**
[https://developer.nlr.gov/docs/solar/pvwatts/v8/](https://developer.nlr.gov/docs/solar/pvwatts/v8/)

**System Advisor Model repository:**
[https://github.com/NatLabRockies/SAM](https://github.com/NatLabRockies/SAM)

**Lookup Inputs:**

* DC capacity
* Module Type
* Array type
* System losses
* Tilt
* Azimuth
* Site Location when PV or wind is included

**Value Needed:**

* Interval or annual AC electricity generation, with model inputs, warnings, units, and source version

**How to Use:**

1. Map the Microgrid System inputs to the documented PVWatts Solar Production Calculation source fields or model inputs: DC capacity; Module Type; Array type; System losses; Tilt; Azimuth; Site Location when PV or wind is included.
2. Validate site coordinates and array design, run the documented V8 field contract, check warnings, and return interval or annual AC generation with source provenance.
3. When an exact value is unavailable, select one context-matched authoritative benchmark and then one deterministic RetroFi benchmark if needed; do not insert an unexplained cross-category default.
4. Return one selected interval or annual AC electricity generation, with model inputs, warnings, units, and source version.
5. Retain the PVWatts Solar Production Calculation source version, exact fields or model inputs, native units, eligible population, population size, selected-value rule, fallback level, selected record, and warnings.

**Automation:**

* **Selected Strategy:** PVWatts V8 API or pinned local SAM execution with the same explicit array inputs.
* **Automation Method:** Validate site coordinates and array design, run the documented V8 field contract, check warnings, and return interval or annual AC generation with source provenance.
* **Difficulty:** Medium

**Validation:**
The official V8 field contract was checked and the retained fixture validates required fields, units, source version, and unsupported defaults. The source can calculate generation but cannot choose system capacity or array configuration for the project. The category adapter and formula-level golden test have not yet been added.

**■ Standard 1.2 — Small Wind Production Simulation**

**Purpose:**
Use National Laboratory of the Rockies - WIND Toolkit and System Advisor Model to resolve interval and annual AC electricity generation, with wind resource, turbine, loss, unit, and source provenance from the listed category inputs.

**Source:**
National Laboratory of the Rockies - WIND Toolkit and System Advisor Model

**WIND Toolkit:**
[https://www.nlr.gov/grid/wind-toolkit](https://www.nlr.gov/grid/wind-toolkit)

**WIND Toolkit download API:**
[https://developer.nlr.gov/docs/wind/wind-toolkit/wtk-download/](https://developer.nlr.gov/docs/wind/wind-toolkit/wtk-download/)

**System Advisor Model repository:**
[https://github.com/NatLabRockies/SAM](https://github.com/NatLabRockies/SAM)

**Lookup Inputs:**

* Wind Turbine Class or Intended Application
* Exact Turbine Model or Power Curve
* Hub Height
* Loss factor
* Analysis Year
* Site Location when PV or wind is included

**Value Needed:**

* Interval and annual AC electricity generation, with wind resource, turbine, loss, unit, and source provenance

**How to Use:**

1. Map the Microgrid System inputs to the documented Small Wind Production Simulation source fields or model inputs: Wind Turbine Class or Intended Application; Exact Turbine Model or Power Curve; Hub Height; Loss factor; Analysis Year; Site Location when PV or wind is included.
2. Resolve site resource data at the selected height and year, validate the exact turbine power curve and losses, run the model, and return interval and annual AC generation.
3. When an exact value is unavailable, select one context-matched authoritative benchmark and then one deterministic RetroFi benchmark if needed; do not insert an unexplained cross-category default.
4. Return one selected interval and annual AC electricity generation, with wind resource, turbine, loss, unit, and source provenance.
5. Retain the Small Wind Production Simulation source version, exact fields or model inputs, native units, eligible population, population size, selected-value rule, fallback level, selected record, and warnings.

**Automation:**

* **Selected Strategy:** Versioned wind-resource retrieval followed by a local SAM turbine power-curve simulation.
* **Automation Method:** Resolve site resource data at the selected height and year, validate the exact turbine power curve and losses, run the model, and return interval and annual AC generation.
* **Difficulty:** Hard

**Validation:**
The official WIND Toolkit access path and SAM implementation were checked. A retained turbine and resource fixture is still absent, and the source cannot choose the turbine, power curve, hub height, or losses for the project.

**■ Standard 1.3 — Microgrid System Performance Balance**

**Purpose:**
Use U.S. Environmental Protection Agency - CHP technologies and calculator to resolve annual electricity generation, input fuel, and useful recovered heat for the selected technology and capacity from the listed category inputs.

**Source:**
U.S. Environmental Protection Agency - CHP technologies and calculator

**CHP technologies and current catalog links:**
[https://www.epa.gov/chp/chp-technologies](https://www.epa.gov/chp/chp-technologies)

**CHP efficiency method and resources:**
[https://www.epa.gov/chp/chp-resources](https://www.epa.gov/chp/chp-resources)

**Current CHP calculator download:**
[https://www.epa.gov/chp/download-chp-energy-and-emissions-savings-calculator](https://www.epa.gov/chp/download-chp-energy-and-emissions-savings-calculator)

**Lookup Inputs:**

* Prime mover
* Input fuel
* Selected Unit Model, if known
* Installed capacity
* Coincident useful thermal-load constraint when heat recovery is included

**Value Needed:**

* Annual electricity generation, input fuel, and useful recovered heat for the selected technology and capacity

**How to Use:**

1. Map the Microgrid System inputs to the documented Microgrid System Performance Balance source fields or model inputs: Prime mover; Input fuel; Selected Unit Model, if known; Installed capacity; Coincident useful thermal-load constraint when heat recovery is included.
2. Select the compatible technology and capacity row, apply the explicit operating and coincidence constraints, calculate electricity, fuel, and useful heat, and cap outputs at site loads.
3. When an exact value is unavailable, select one context-matched authoritative benchmark and then one deterministic RetroFi benchmark if needed; do not insert an unexplained cross-category default.
4. Return one selected annual electricity generation, input fuel, and useful recovered heat for the selected technology and capacity.
5. Retain the Microgrid System Performance Balance source version, exact fields or model inputs, native units, eligible population, population size, selected-value rule, fallback level, selected record, and warnings.

**Automation:**

* **Selected Strategy:** Versioned technology-class lookup followed by a transparent heat-and-power energy balance.
* **Automation Method:** Select the compatible technology and capacity row, apply the explicit operating and coincidence constraints, calculate electricity, fuel, and useful heat, and cap outputs at site loads.
* **Difficulty:** Medium to Hard

**Validation:**
The official technology pages, efficiency method, and calculator download were checked. The category adapter and retained source fixture are still absent, and the source does not identify an exact unit or supply site capacity, schedule, or thermal coincidence.

**■ Standard 1.4 — Microgrid System Interval Bill Calculation**

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
* Included component types
* Annual operating profile
* Power capacity
* Usable-energy capacity
* Charge efficiency from a nameplate, measurement, audit, or contractor specification
* Discharge efficiency from a nameplate, measurement, audit, or contractor specification
* Initial state of charge
* Reserve constraint
* Interval generation and resource profiles from the connected PVWatts, wind, and onsite-generation processes

**Value Needed:**

* Baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance

**How to Use:**

1. Map the Microgrid System inputs to the documented Microgrid System Interval Bill Calculation source fields or model inputs: Timestamped interval utility data from the uploaded utility artifact; Time zone and daylight-saving metadata from the uploaded utility artifact; Authoritative tariff mapping, which is not yet verified; Included component types; Annual operating profile; Power capacity; Usable-energy capacity; Charge efficiency from a nameplate, measurement, audit, or contractor specification; Discharge efficiency from a nameplate, measurement, audit, or contractor specification; Initial state of charge; Reserve constraint; Interval generation and resource profiles from the connected PVWatts, wind, and onsite-generation processes.
2. Align the interval load and tariff calendar, apply the category constraints, solve baseline and proposed cases, compare bill components, and retain solver and input provenance.
3. When an exact value is unavailable, select one context-matched authoritative benchmark and then one deterministic RetroFi benchmark if needed; do not insert an unexplained cross-category default.
4. Return one selected baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance.
5. Retain the Microgrid System Interval Bill Calculation source version, exact fields or model inputs, native units, eligible population, population size, selected-value rule, fallback level, selected record, and warnings.

**Automation:**

* **Selected Strategy:** Pinned local REopt.jl optimization after complete chronological load, tariff, and technology inputs pass validation.
* **Automation Method:** Align the interval load and tariff calendar, apply the category constraints, solve baseline and proposed cases, compare bill components, and retain solver and input provenance.
* **Difficulty:** Hard

**Validation:**
The official V3 input documentation and open-source solver were checked, so local optimization is technically possible. No category dispatch adapter or golden result is retained, and REopt cannot supply a missing load profile, tariff, or technology design.
