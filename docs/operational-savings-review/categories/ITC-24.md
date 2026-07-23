# Information Card — Solar Plus Storage

**Retrofits included:** Solar-plus-storage system

**Overview:** A combined solar and battery system coordinates onsite generation, charging, discharging, imports, and exports to change the annual electric bill.

**Broader Formula**

```text
Annual Operational Savings =
Baseline Annual Bill − Proposed Annual Bill
```

**Expanded Formula**

```text
Annual Operational Savings = Baseline Annual Bill - Proposed Annual Bill

PV Annual Onsite Generation follows ITC-17 and storage state follows ITC-23 inside one dispatch optimization.
```

**Information Tree**

```text
Annual Operational Savings
├─ Site Location (Profile)
├─ PV array configuration
│  ├─ DC capacity (Linked Opportunity)
│  ├─ Module Type (Linked Opportunity)
│  ├─ Array type (Linked Opportunity)
│  ├─ System losses (Linked Opportunity)
│  ├─ Tilt (Linked Opportunity)
│  └─ Azimuth (Linked Opportunity)
├─ Battery configuration
│  ├─ Power capacity (Linked Opportunity)
│  ├─ Usable-energy capacity (Linked Opportunity)
│  ├─ Charge efficiency (Linked Opportunity)
│  ├─ Discharge efficiency (Linked Opportunity)
│  ├─ Initial state of charge (Linked Opportunity)
│  ├─ Terminal state-of-charge constraint (Linked Opportunity)
│  └─ Reserve constraint (Linked Opportunity)
├─ Standard 1.1 — PVWatts Solar Production Calculation
├─ Chronological Electricity Load and Tariff
│  ├─ Timestamped Interval Utility Data (Bill)
│  ├─ Time Zone and Daylight-Saving Metadata from the Uploaded Utility Artifact (Bill)
│  ├─ Rate Schedule and Customer Class (Bill)
│  ├─ Published Utility Tariff and Effective-Date Mapping (Derived)
│  ├─ One Selected Interval Tariff Value (Derived)
│  └─ Monthly Bill Reconciliation When Tariff Mapping Exists (Derived)
└─ Standard 1.2 — Solar Plus Storage Interval Bill Calculation
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
* Site Location

**Value Needed:**

* Interval or annual AC electricity generation, with model inputs, warnings, units, and source version

**How to Use:**

1. Map the Solar Plus Storage inputs to the documented PVWatts Solar Production Calculation source fields or model inputs: DC capacity; Module Type; Array type; System losses; Tilt; Azimuth; Site Location.
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

**■ Standard 1.2 — Solar Plus Storage Interval Bill Calculation**

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

* Power capacity
* Usable-energy capacity
* Charge efficiency from a nameplate, measurement, audit, or contractor specification
* Discharge efficiency from a nameplate, measurement, audit, or contractor specification
* Initial state of charge
* Reserve constraint
* Timestamped interval utility data from the uploaded utility artifact
* Time zone and daylight-saving metadata from the uploaded utility artifact
* Authoritative tariff mapping, which is not yet verified
* Interval solar generation from the connected PVWatts process

**Value Needed:**

* Baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance

**How to Use:**

1. Map the Solar Plus Storage inputs to the documented Solar Plus Storage Interval Bill Calculation source fields or model inputs: Power capacity; Usable-energy capacity; Charge efficiency from a nameplate, measurement, audit, or contractor specification; Discharge efficiency from a nameplate, measurement, audit, or contractor specification; Initial state of charge; Reserve constraint; Timestamped interval utility data from the uploaded utility artifact; Time zone and daylight-saving metadata from the uploaded utility artifact; Authoritative tariff mapping, which is not yet verified; Interval solar generation from the connected PVWatts process.
2. Align the interval load and tariff calendar, apply the category constraints, solve baseline and proposed cases, compare bill components, and retain solver and input provenance.
3. When an exact value is unavailable, select one context-matched authoritative benchmark and then one deterministic RetroFi benchmark if needed; do not insert an unexplained cross-category default.
4. Return one selected baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance.
5. Retain the Solar Plus Storage Interval Bill Calculation source version, exact fields or model inputs, native units, eligible population, population size, selected-value rule, fallback level, selected record, and warnings.

**Automation:**

* **Selected Strategy:** Pinned local REopt.jl optimization after complete chronological load, tariff, and technology inputs pass validation.
* **Automation Method:** Align the interval load and tariff calendar, apply the category constraints, solve baseline and proposed cases, compare bill components, and retain solver and input provenance.
* **Difficulty:** Hard

**Validation:**
The official V3 input documentation and open-source solver were checked, so local optimization is technically possible. No category dispatch adapter or golden result is retained, and REopt cannot supply a missing load profile, tariff, or technology design.
