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
│  ├─ Timestamped Interval Electricity Data (User)
│  ├─ Time Zone and Daylight-Saving Treatment from the Uploaded Data (User)
│  ├─ Rate Schedule and Customer Class (Bill)
│  ├─ Complete Tariff Calendar and Billing Rules (User)
│  └─ Monthly Bill Reconciliation (Derived)
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
│  │  └─ Coincident useful thermal-load constraint when heat recovery is included (User)
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

* Timestamped Interval Electricity Data
* Time Zone and Daylight-Saving Treatment from Uploaded Interval Data
* Complete Tariff Calendar and Billing Rules
* Billing-Demand and Ratchet Rules
* Documented current project fuel price for the matching fuel and geography
* Included component types
* DC capacity
* Module Type

**Value Needed:**

* Interval or annual AC electricity generation, with model inputs, warnings, units, and source version

**How to Use:**

1. Validate these inputs and preserve the source of each supplied value: Timestamped Interval Electricity Data; Time Zone and Daylight-Saving Treatment from Uploaded Interval Data; Complete Tariff Calendar and Billing Rules.
2. Validate site coordinates and array design, run the documented V8 field contract, check warnings, and return interval or annual AC generation with source provenance.
3. Reject missing, ambiguous, incompatible, or out-of-scope records instead of inserting a generic default.
4. Return interval or annual AC electricity generation, with model inputs, warnings, units, and source version.
5. Store the source version, selected record or method, input units, and any warnings with the result.

**Automation:**

* **Selected Strategy:** PVWatts V8 API or pinned local SAM execution with the same explicit array inputs.
* **Automation Method:** Validate site coordinates and array design, run the documented V8 field contract, check warnings, and return interval or annual AC generation with source provenance.
* **Difficulty:** Medium

**Validation:**
The official V8 field contract was checked and the retained fixture validates required fields, units, source version, and unsupported defaults. The source can calculate generation but cannot choose system capacity or array configuration for the project.

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

* Timestamped Interval Electricity Data
* Time Zone and Daylight-Saving Treatment from Uploaded Interval Data
* Complete Tariff Calendar and Billing Rules
* Billing-Demand and Ratchet Rules
* Documented current project fuel price for the matching fuel and geography
* Included component types
* DC capacity
* Module Type

**Value Needed:**

* Interval and annual AC electricity generation, with wind resource, turbine, loss, unit, and source provenance

**How to Use:**

1. Validate these inputs and preserve the source of each supplied value: Timestamped Interval Electricity Data; Time Zone and Daylight-Saving Treatment from Uploaded Interval Data; Complete Tariff Calendar and Billing Rules.
2. Resolve site resource data at the selected height and year, validate the exact turbine power curve and losses, run the model, and return interval and annual AC generation.
3. Reject missing, ambiguous, incompatible, or out-of-scope records instead of inserting a generic default.
4. Return interval and annual AC electricity generation, with wind resource, turbine, loss, unit, and source provenance.
5. Store the source version, selected record or method, input units, and any warnings with the result.

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

* Timestamped Interval Electricity Data
* Time Zone and Daylight-Saving Treatment from Uploaded Interval Data
* Complete Tariff Calendar and Billing Rules
* Billing-Demand and Ratchet Rules
* Documented current project fuel price for the matching fuel and geography
* Included component types
* DC capacity
* Module Type

**Value Needed:**

* Annual electricity generation, input fuel, and useful recovered heat for the selected technology and capacity

**How to Use:**

1. Validate these inputs and preserve the source of each supplied value: Timestamped Interval Electricity Data; Time Zone and Daylight-Saving Treatment from Uploaded Interval Data; Complete Tariff Calendar and Billing Rules.
2. Select the compatible technology and capacity row, apply the explicit operating and coincidence constraints, calculate electricity, fuel, and useful heat, and cap outputs at site loads.
3. Reject missing, ambiguous, incompatible, or out-of-scope records instead of inserting a generic default.
4. Return annual electricity generation, input fuel, and useful recovered heat for the selected technology and capacity.
5. Store the source version, selected record or method, input units, and any warnings with the result.

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

* Timestamped Interval Electricity Data
* Time Zone and Daylight-Saving Treatment from Uploaded Interval Data
* Complete Tariff Calendar and Billing Rules
* Billing-Demand and Ratchet Rules
* Documented current project fuel price for the matching fuel and geography
* Included component types
* DC capacity
* Module Type

**Value Needed:**

* Baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance

**How to Use:**

1. Validate these inputs and preserve the source of each supplied value: Timestamped Interval Electricity Data; Time Zone and Daylight-Saving Treatment from Uploaded Interval Data; Complete Tariff Calendar and Billing Rules.
2. Align the interval load and tariff calendar, apply the category constraints, solve baseline and proposed cases, compare bill components, and retain solver and input provenance.
3. Reject missing, ambiguous, incompatible, or out-of-scope records instead of inserting a generic default.
4. Return baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance.
5. Store the source version, selected record or method, input units, and any warnings with the result.

**Automation:**

* **Selected Strategy:** Pinned local REopt.jl optimization after complete chronological load, tariff, and technology inputs pass validation.
* **Automation Method:** Align the interval load and tariff calendar, apply the category constraints, solve baseline and proposed cases, compare bill components, and retain solver and input provenance.
* **Difficulty:** Hard

**Validation:**
The official V3 input documentation and open-source solver were checked, so local optimization is technically possible. No category dispatch adapter or golden result is retained, and REopt cannot supply a missing load profile, tariff, or technology design.
