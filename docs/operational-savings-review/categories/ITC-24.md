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
│  ├─ Standard 1.2 — Interval Tariff Resolution
│  └─ Monthly Bill Reconciliation When Tariff Mapping Exists (Derived)
└─ Standard 1.3 — Solar Plus Storage Interval Bill Calculation
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

**Input Bindings:**

* DC capacity ← Linked Opportunity at `Annual Operational Savings > PV array configuration > DC capacity`. Pass the exact bound DC capacity to PVWatts Solar Production Calculation when computing Interval or annual AC electricity generation, with model inputs, warnings, units, and source version; do not substitute a value from another tree path.
* Module Type ← Linked Opportunity at `Annual Operational Savings > PV array configuration > Module Type`. Pass the exact bound Module Type to PVWatts Solar Production Calculation when computing Interval or annual AC electricity generation, with model inputs, warnings, units, and source version; do not substitute a value from another tree path.
* Array type ← Linked Opportunity at `Annual Operational Savings > PV array configuration > Array type`. Pass the exact bound Array type to PVWatts Solar Production Calculation when computing Interval or annual AC electricity generation, with model inputs, warnings, units, and source version; do not substitute a value from another tree path.
* System losses ← Linked Opportunity at `Annual Operational Savings > PV array configuration > System losses`. Pass the exact bound System losses to PVWatts Solar Production Calculation when computing Interval or annual AC electricity generation, with model inputs, warnings, units, and source version; do not substitute a value from another tree path.
* Tilt ← Linked Opportunity at `Annual Operational Savings > PV array configuration > Tilt`. Pass the exact bound Tilt to PVWatts Solar Production Calculation when computing Interval or annual AC electricity generation, with model inputs, warnings, units, and source version; do not substitute a value from another tree path.
* Azimuth ← Linked Opportunity at `Annual Operational Savings > PV array configuration > Azimuth`. Pass the exact bound Azimuth to PVWatts Solar Production Calculation when computing Interval or annual AC electricity generation, with model inputs, warnings, units, and source version; do not substitute a value from another tree path.
* Site Location ← Profile at `Annual Operational Savings > Site Location`. Pass the exact bound Site Location to PVWatts Solar Production Calculation when computing Interval or annual AC electricity generation, with model inputs, warnings, units, and source version; do not substitute a value from another tree path.

**Output Bindings:**

* Interval or annual AC electricity generation, with model inputs, warnings, units, and source version → `PV_AC_kWh_t` (kWh/interval; PROFILE) at `Annual Operational Savings > Standard 1.1 - PVWatts Solar Production Calculation`.

**How to Use:**

1. Map the Solar Plus Storage inputs to the documented PVWatts Solar Production Calculation source fields or model inputs: DC capacity; Module Type; Array type; System losses; Tilt; Azimuth; Site Location.
2. Validate site coordinates and array design, run the documented V8 field contract, check warnings, and return interval or annual AC generation with source provenance.
3. When an exact value is unavailable, use only a source-specific retained population or equation with documented filters, numeric rule, unit, scope, and version; otherwise report the implementation limitation.
4. Return one selected interval or annual AC electricity generation, with model inputs, warnings, units, and source version.
5. Retain the PVWatts Solar Production Calculation source version, exact fields or model inputs, native units, eligible population, population size, selected-value rule, fallback level, selected record, and warnings.

**Automation:**

* **Selected Strategy:** PVWatts V8 API or pinned local SAM execution with the same explicit array inputs.
* **Automation Method:** Validate site coordinates and array design, run the documented V8 field contract, check warnings, and return interval or annual AC generation with source provenance.
* **Difficulty:** Medium

**Validation:**
The official V8 field contract was checked and the retained fixture validates required fields, units, source version, and unsupported defaults. The source can calculate generation but cannot choose system capacity or array configuration for the project. The category adapter and formula-level golden test have not yet been added.

**■ Standard 1.2 — Interval Tariff Resolution**

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

* Serving electric utility from the bill ← Bill at `Annual Operational Savings > Chronological Electricity Load and Tariff > Time Zone and Daylight-Saving Metadata from the Uploaded Utility Artifact`. Pass the exact bound Serving electric utility from the bill to Interval Tariff Resolution when computing One complete tariff input set with exact or conservative-screening provenance; do not substitute a value from another tree path.
* Published rate schedule and customer class from the bill ← Bill at `Annual Operational Savings > Chronological Electricity Load and Tariff > Rate Schedule and Customer Class`. Pass the exact bound Published rate schedule and customer class from the bill to Interval Tariff Resolution when computing One complete tariff input set with exact or conservative-screening provenance; do not substitute a value from another tree path.
* Tariff effective date covering the analysis period ← Bill at `Annual Operational Savings > Chronological Electricity Load and Tariff > Rate Schedule and Customer Class`. Pass the exact bound Tariff effective date covering the analysis period to Interval Tariff Resolution when computing One complete tariff input set with exact or conservative-screening provenance; do not substitute a value from another tree path.
* Continuous interval energy and demand aligned to the tariff timezone ← Bill at `Annual Operational Savings > Chronological Electricity Load and Tariff > Timestamped Interval Utility Data`. Pass the exact bound Continuous interval energy and demand aligned to the tariff timezone to Interval Tariff Resolution when computing One complete tariff input set with exact or conservative-screening provenance; do not substitute a value from another tree path.

**Output Bindings:**

* One complete tariff input set with exact or conservative-screening provenance → `tariff_input_set` (record set; RECORD_SET) at `Annual Operational Savings > Chronological Electricity Load and Tariff > Standard 1.2 - Interval Tariff Resolution`.

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

**■ Standard 1.3 — Solar Plus Storage Interval Bill Calculation**

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
* Interval solar generation from the connected PVWatts process

**Value Needed:**

* Baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance

**Input Bindings:**

* Power capacity ← Linked Opportunity at `Annual Operational Savings > Battery configuration > Power capacity`. Pass the exact bound Power capacity to Solar Plus Storage Interval Bill Calculation when computing Baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance; do not substitute a value from another tree path.
* Usable-energy capacity ← Linked Opportunity at `Annual Operational Savings > Battery configuration > Usable-energy capacity`. Pass the exact bound Usable-energy capacity to Solar Plus Storage Interval Bill Calculation when computing Baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance; do not substitute a value from another tree path.
* Charge efficiency from a nameplate, measurement, audit, or contractor specification ← Linked Opportunity at `Annual Operational Savings > Battery configuration > Charge efficiency`. Pass the exact bound Charge efficiency from a nameplate, measurement, audit, or contractor specification to Solar Plus Storage Interval Bill Calculation when computing Baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance; do not substitute a value from another tree path.
* Discharge efficiency from a nameplate, measurement, audit, or contractor specification ← Linked Opportunity at `Annual Operational Savings > Battery configuration > Discharge efficiency`. Pass the exact bound Discharge efficiency from a nameplate, measurement, audit, or contractor specification to Solar Plus Storage Interval Bill Calculation when computing Baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance; do not substitute a value from another tree path.
* Initial state of charge ← Linked Opportunity at `Annual Operational Savings > Battery configuration > Initial state of charge`. Pass the exact bound Initial state of charge to Solar Plus Storage Interval Bill Calculation when computing Baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance; do not substitute a value from another tree path.
* Reserve constraint ← Linked Opportunity at `Annual Operational Savings > Battery configuration > Reserve constraint`. Pass the exact bound Reserve constraint to Solar Plus Storage Interval Bill Calculation when computing Baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance; do not substitute a value from another tree path.
* Timestamped interval utility data from the uploaded utility artifact ← Bill at `Annual Operational Savings > Chronological Electricity Load and Tariff > Timestamped Interval Utility Data`. Pass the exact bound Timestamped interval utility data from the uploaded utility artifact to Solar Plus Storage Interval Bill Calculation when computing Baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance; do not substitute a value from another tree path.
* Time zone and daylight-saving metadata from the uploaded utility artifact ← Bill at `Annual Operational Savings > Chronological Electricity Load and Tariff > Time Zone and Daylight-Saving Metadata from the Uploaded Utility Artifact`. Pass the exact bound Time zone and daylight-saving metadata from the uploaded utility artifact to Solar Plus Storage Interval Bill Calculation when computing Baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance; do not substitute a value from another tree path.
* Interval solar generation from the connected PVWatts process ← Standard Output at `Annual Operational Savings > Standard 1.1 - PVWatts Solar Production Calculation`. Pass the exact bound Interval solar generation from the connected PVWatts process to Solar Plus Storage Interval Bill Calculation when computing Baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance; do not substitute a value from another tree path.

**Output Bindings:**

* Baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance → `baseline_annual_bill` (USD/year; RECORD_SET) at `Annual Operational Savings > Standard 1.3 - Solar Plus Storage Interval Bill Calculation`.

**How to Use:**

1. Map the Solar Plus Storage inputs to the documented Solar Plus Storage Interval Bill Calculation source fields or model inputs: Power capacity; Usable-energy capacity; Charge efficiency from a nameplate, measurement, audit, or contractor specification; Discharge efficiency from a nameplate, measurement, audit, or contractor specification; Initial state of charge; Reserve constraint; Timestamped interval utility data from the uploaded utility artifact; Time zone and daylight-saving metadata from the uploaded utility artifact; Interval solar generation from the connected PVWatts process.
2. Align the interval load and tariff calendar, apply the category constraints, solve baseline and proposed cases, compare bill components, and retain solver and input provenance.
3. When an exact value is unavailable, use only a source-specific retained population or equation with documented filters, numeric rule, unit, scope, and version; otherwise report the implementation limitation.
4. Return one selected baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance.
5. Retain the Solar Plus Storage Interval Bill Calculation source version, exact fields or model inputs, native units, eligible population, population size, selected-value rule, fallback level, selected record, and warnings.

**Automation:**

* **Selected Strategy:** Pinned local REopt.jl optimization after complete chronological load, tariff, and technology inputs pass validation.
* **Automation Method:** Align the interval load and tariff calendar, apply the category constraints, solve baseline and proposed cases, compare bill components, and retain solver and input provenance.
* **Difficulty:** Hard

**Validation:**
The official V3 input documentation and open-source solver were checked, so local optimization is technically possible. No category dispatch adapter or golden result is retained, and REopt cannot supply a missing load profile, tariff, or technology design.
