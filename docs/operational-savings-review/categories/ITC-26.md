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
│  ├─ Standard 1.1 — Interval Tariff Resolution
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
│  ├─ Standard 1.2 — PVWatts Solar Production Calculation
│  └─ Standard 1.3 — Small Wind Production Simulation
├─ Standard 1.4 — Microgrid System Performance Balance
└─ Standard 1.5 — Microgrid System Interval Bill Calculation
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

* Serving electric utility from the bill ← Bill at `Annual Operational Savings > Chronological Electricity Load and Tariff > Time Zone and Daylight-Saving Metadata from the Uploaded Utility Artifact`. Pass the exact bound Serving electric utility from the bill to Interval Tariff Resolution when computing One complete tariff input set with exact or conservative-screening provenance; do not substitute a value from another tree path.
* Published rate schedule and customer class from the bill ← Bill at `Annual Operational Savings > Chronological Electricity Load and Tariff > Rate Schedule and Customer Class`. Pass the exact bound Published rate schedule and customer class from the bill to Interval Tariff Resolution when computing One complete tariff input set with exact or conservative-screening provenance; do not substitute a value from another tree path.
* Tariff effective date covering the analysis period ← Bill at `Annual Operational Savings > Chronological Electricity Load and Tariff > Rate Schedule and Customer Class`. Pass the exact bound Tariff effective date covering the analysis period to Interval Tariff Resolution when computing One complete tariff input set with exact or conservative-screening provenance; do not substitute a value from another tree path.
* Continuous interval energy and demand aligned to the tariff timezone ← Bill at `Annual Operational Savings > Chronological Electricity Load and Tariff > Timestamped Interval Utility Data`. Pass the exact bound Continuous interval energy and demand aligned to the tariff timezone to Interval Tariff Resolution when computing One complete tariff input set with exact or conservative-screening provenance; do not substitute a value from another tree path.

**Output Bindings:**

* One complete tariff input set with exact or conservative-screening provenance → `tariff_input_set` (record set; RECORD_SET) at `Annual Operational Savings > Chronological Electricity Load and Tariff > Standard 1.1 - Interval Tariff Resolution`.

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

**■ Standard 1.2 — PVWatts Solar Production Calculation**

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

**Input Bindings:**

* DC capacity ← Linked Opportunity at `Annual Operational Savings > Component site and operating inputs > PV array configuration when PV is included > DC capacity`. Pass the exact bound DC capacity to PVWatts Solar Production Calculation when computing Interval or annual AC electricity generation, with model inputs, warnings, units, and source version; do not substitute a value from another tree path.
* Module Type ← Linked Opportunity at `Annual Operational Savings > Component site and operating inputs > PV array configuration when PV is included > Module Type`. Pass the exact bound Module Type to PVWatts Solar Production Calculation when computing Interval or annual AC electricity generation, with model inputs, warnings, units, and source version; do not substitute a value from another tree path.
* Array type ← Linked Opportunity at `Annual Operational Savings > Component site and operating inputs > PV array configuration when PV is included > Array type`. Pass the exact bound Array type to PVWatts Solar Production Calculation when computing Interval or annual AC electricity generation, with model inputs, warnings, units, and source version; do not substitute a value from another tree path.
* System losses ← Linked Opportunity at `Annual Operational Savings > Component site and operating inputs > PV array configuration when PV is included > System losses`. Pass the exact bound System losses to PVWatts Solar Production Calculation when computing Interval or annual AC electricity generation, with model inputs, warnings, units, and source version; do not substitute a value from another tree path.
* Tilt ← Linked Opportunity at `Annual Operational Savings > Component site and operating inputs > PV array configuration when PV is included > Tilt`. Pass the exact bound Tilt to PVWatts Solar Production Calculation when computing Interval or annual AC electricity generation, with model inputs, warnings, units, and source version; do not substitute a value from another tree path.
* Azimuth ← Linked Opportunity at `Annual Operational Savings > Component site and operating inputs > PV array configuration when PV is included > Azimuth`. Pass the exact bound Azimuth to PVWatts Solar Production Calculation when computing Interval or annual AC electricity generation, with model inputs, warnings, units, and source version; do not substitute a value from another tree path.
* Site Location when PV or wind is included ← Profile at `Annual Operational Savings > Component site and operating inputs > Site Location when PV or wind is included`. Pass the exact bound Site Location when PV or wind is included to PVWatts Solar Production Calculation when computing Interval or annual AC electricity generation, with model inputs, warnings, units, and source version; do not substitute a value from another tree path.

**Output Bindings:**

* Interval or annual AC electricity generation, with model inputs, warnings, units, and source version → `tariff_input_set` (record set; PROFILE) at `Annual Operational Savings > PV or wind interval generation when included > Standard 1.2 - PVWatts Solar Production Calculation`.

**How to Use:**

1. Map the Microgrid System inputs to the documented PVWatts Solar Production Calculation source fields or model inputs: DC capacity; Module Type; Array type; System losses; Tilt; Azimuth; Site Location when PV or wind is included.
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

**■ Standard 1.3 — Small Wind Production Simulation**

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

**Input Bindings:**

* Wind Turbine Class or Intended Application ← Linked Opportunity at `Annual Operational Savings > Component site and operating inputs > Wind configuration when wind is included > Wind Turbine Class or Intended Application`. Pass the exact bound Wind Turbine Class or Intended Application to Small Wind Production Simulation when computing Interval and annual AC electricity generation, with wind resource, turbine, loss, unit, and source provenance; do not substitute a value from another tree path.
* Exact Turbine Model or Power Curve ← Linked Opportunity at `Annual Operational Savings > Component site and operating inputs > Wind configuration when wind is included > Exact Turbine Model or Power Curve`. Pass the exact bound Exact Turbine Model or Power Curve to Small Wind Production Simulation when computing Interval and annual AC electricity generation, with wind resource, turbine, loss, unit, and source provenance; do not substitute a value from another tree path.
* Hub Height ← Linked Opportunity at `Annual Operational Savings > Component site and operating inputs > Wind configuration when wind is included > Hub Height`. Pass the exact bound Hub Height to Small Wind Production Simulation when computing Interval and annual AC electricity generation, with wind resource, turbine, loss, unit, and source provenance; do not substitute a value from another tree path.
* Loss factor ← Linked Opportunity at `Annual Operational Savings > Component site and operating inputs > Wind configuration when wind is included > Loss factor`. Pass the exact bound Loss factor to Small Wind Production Simulation when computing Interval and annual AC electricity generation, with wind resource, turbine, loss, unit, and source provenance; do not substitute a value from another tree path.
* Analysis Year ← User at `Annual Operational Savings > Component site and operating inputs > Wind configuration when wind is included > Analysis Year`. Pass the exact bound Analysis Year to Small Wind Production Simulation when computing Interval and annual AC electricity generation, with wind resource, turbine, loss, unit, and source provenance; do not substitute a value from another tree path.
* Site Location when PV or wind is included ← Profile at `Annual Operational Savings > Component site and operating inputs > Site Location when PV or wind is included`. Pass the exact bound Site Location when PV or wind is included to Small Wind Production Simulation when computing Interval and annual AC electricity generation, with wind resource, turbine, loss, unit, and source provenance; do not substitute a value from another tree path.

**Output Bindings:**

* Interval and annual AC electricity generation, with wind resource, turbine, loss, unit, and source provenance → `tariff_input_set` (record set; PROFILE) at `Annual Operational Savings > PV or wind interval generation when included > Standard 1.3 - Small Wind Production Simulation`.

**How to Use:**

1. Map the Microgrid System inputs to the documented Small Wind Production Simulation source fields or model inputs: Wind Turbine Class or Intended Application; Exact Turbine Model or Power Curve; Hub Height; Loss factor; Analysis Year; Site Location when PV or wind is included.
2. Resolve site resource data at the selected height and year, validate the exact turbine power curve and losses, run the model, and return interval and annual AC generation.
3. When an exact value is unavailable, use only a source-specific retained population or equation with documented filters, numeric rule, unit, scope, and version; otherwise report the implementation limitation.
4. Return one selected interval and annual AC electricity generation, with wind resource, turbine, loss, unit, and source provenance.
5. Retain the Small Wind Production Simulation source version, exact fields or model inputs, native units, eligible population, population size, selected-value rule, fallback level, selected record, and warnings.

**Automation:**

* **Selected Strategy:** Versioned wind-resource retrieval followed by a local SAM turbine power-curve simulation.
* **Automation Method:** Resolve site resource data at the selected height and year, validate the exact turbine power curve and losses, run the model, and return interval and annual AC generation.
* **Difficulty:** Hard

**Validation:**
The official WIND Toolkit access path and SAM implementation were checked. A retained turbine and resource fixture is still absent, and the source cannot choose the turbine, power curve, hub height, or losses for the project.

**■ Standard 1.4 — Microgrid System Performance Balance**

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

**Input Bindings:**

* Prime mover ← Linked Opportunity at `Annual Operational Savings > Component site and operating inputs > Fuel-cell or CHP configuration when fuel generation is included > Prime mover`. Pass the exact bound Prime mover to Microgrid System Performance Balance when computing Annual electricity generation, input fuel, and useful recovered heat for the selected technology and capacity; do not substitute a value from another tree path.
* Input fuel ← Linked Opportunity at `Annual Operational Savings > Component site and operating inputs > Fuel-cell or CHP configuration when fuel generation is included > Annual operating profile`. Pass the exact bound Input fuel to Microgrid System Performance Balance when computing Annual electricity generation, input fuel, and useful recovered heat for the selected technology and capacity; do not substitute a value from another tree path.
* Selected Unit Model, if known ← Linked Opportunity at `Annual Operational Savings > Component site and operating inputs > Fuel-cell or CHP configuration when fuel generation is included > Selected Unit Model, if known`. Pass the exact bound Selected Unit Model, if known to Microgrid System Performance Balance when computing Annual electricity generation, input fuel, and useful recovered heat for the selected technology and capacity; do not substitute a value from another tree path.
* Installed capacity ← Linked Opportunity at `Annual Operational Savings > Component site and operating inputs > Fuel-cell or CHP configuration when fuel generation is included > Installed capacity`. Pass the exact bound Installed capacity to Microgrid System Performance Balance when computing Annual electricity generation, input fuel, and useful recovered heat for the selected technology and capacity; do not substitute a value from another tree path.
* Coincident useful thermal-load constraint when heat recovery is included ← Project Document at `Annual Operational Savings > Component site and operating inputs > Fuel-cell or CHP configuration when fuel generation is included > Documented Coincident useful thermal-load constraint when heat recovery is included from Nameplate, Measurement, Audit, or Contractor Specification`. Pass the exact bound Coincident useful thermal-load constraint when heat recovery is included to Microgrid System Performance Balance when computing Annual electricity generation, input fuel, and useful recovered heat for the selected technology and capacity; do not substitute a value from another tree path.

**Output Bindings:**

* Annual electricity generation, input fuel, and useful recovered heat for the selected technology and capacity → `baseline_grid_and_fuel_bill` (USD/year; PER_YEAR) at `Annual Operational Savings > Standard 1.4 - Microgrid System Performance Balance`.

**How to Use:**

1. Map the Microgrid System inputs to the documented Microgrid System Performance Balance source fields or model inputs: Prime mover; Input fuel; Selected Unit Model, if known; Installed capacity; Coincident useful thermal-load constraint when heat recovery is included.
2. Select the compatible technology and capacity row, apply the explicit operating and coincidence constraints, calculate electricity, fuel, and useful heat, and cap outputs at site loads.
3. When an exact value is unavailable, use only a source-specific retained population or equation with documented filters, numeric rule, unit, scope, and version; otherwise report the implementation limitation.
4. Return one selected annual electricity generation, input fuel, and useful recovered heat for the selected technology and capacity.
5. Retain the Microgrid System Performance Balance source version, exact fields or model inputs, native units, eligible population, population size, selected-value rule, fallback level, selected record, and warnings.

**Automation:**

* **Selected Strategy:** Versioned technology-class lookup followed by a transparent heat-and-power energy balance.
* **Automation Method:** Select the compatible technology and capacity row, apply the explicit operating and coincidence constraints, calculate electricity, fuel, and useful heat, and cap outputs at site loads.
* **Difficulty:** Medium to Hard

**Validation:**
The official technology pages, efficiency method, and calculator download were checked. The category adapter and retained source fixture are still absent, and the source does not identify an exact unit or supply site capacity, schedule, or thermal coincidence.

**■ Standard 1.5 — Microgrid System Interval Bill Calculation**

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

**Input Bindings:**

* Timestamped interval utility data from the uploaded utility artifact ← Bill at `Annual Operational Savings > Chronological Electricity Load and Tariff > Timestamped Interval Utility Data`. Pass the exact bound Timestamped interval utility data from the uploaded utility artifact to Microgrid System Interval Bill Calculation when computing Baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance; do not substitute a value from another tree path.
* Time zone and daylight-saving metadata from the uploaded utility artifact ← Bill at `Annual Operational Savings > Chronological Electricity Load and Tariff > Time Zone and Daylight-Saving Metadata from the Uploaded Utility Artifact`. Pass the exact bound Time zone and daylight-saving metadata from the uploaded utility artifact to Microgrid System Interval Bill Calculation when computing Baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance; do not substitute a value from another tree path.
* Included component types ← User at `Annual Operational Savings > Included component types`. Pass the exact bound Included component types to Microgrid System Interval Bill Calculation when computing Baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance; do not substitute a value from another tree path.
* Annual operating profile ← Profile at `Annual Operational Savings > Component site and operating inputs > Site Location when PV or wind is included`. Pass the exact bound Annual operating profile to Microgrid System Interval Bill Calculation when computing Baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance; do not substitute a value from another tree path.
* Power capacity ← Linked Opportunity at `Annual Operational Savings > Component site and operating inputs > Storage configuration when storage is included > Power capacity`. Pass the exact bound Power capacity to Microgrid System Interval Bill Calculation when computing Baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance; do not substitute a value from another tree path.
* Usable-energy capacity ← Linked Opportunity at `Annual Operational Savings > Component site and operating inputs > Storage configuration when storage is included > Usable-energy capacity`. Pass the exact bound Usable-energy capacity to Microgrid System Interval Bill Calculation when computing Baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance; do not substitute a value from another tree path.
* Charge efficiency from a nameplate, measurement, audit, or contractor specification ← Project Document at `Annual Operational Savings > Component site and operating inputs > Fuel-cell or CHP configuration when fuel generation is included > Documented Coincident useful thermal-load constraint when heat recovery is included from Nameplate, Measurement, Audit, or Contractor Specification`. Pass the exact bound Charge efficiency from a nameplate, measurement, audit, or contractor specification to Microgrid System Interval Bill Calculation when computing Baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance; do not substitute a value from another tree path.
* Discharge efficiency from a nameplate, measurement, audit, or contractor specification ← Project Document at `Annual Operational Savings > Component site and operating inputs > Fuel-cell or CHP configuration when fuel generation is included > Documented Coincident useful thermal-load constraint when heat recovery is included from Nameplate, Measurement, Audit, or Contractor Specification`. Pass the exact bound Discharge efficiency from a nameplate, measurement, audit, or contractor specification to Microgrid System Interval Bill Calculation when computing Baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance; do not substitute a value from another tree path.
* Initial state of charge ← Linked Opportunity at `Annual Operational Savings > Component site and operating inputs > Storage configuration when storage is included > Initial state of charge`. Pass the exact bound Initial state of charge to Microgrid System Interval Bill Calculation when computing Baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance; do not substitute a value from another tree path.
* Reserve constraint ← Linked Opportunity at `Annual Operational Savings > Component site and operating inputs > Storage configuration when storage is included > Reserve constraint`. Pass the exact bound Reserve constraint to Microgrid System Interval Bill Calculation when computing Baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance; do not substitute a value from another tree path.
* Interval generation and resource profiles from the connected PVWatts, wind, and onsite-generation processes ← Standard Output at `Annual Operational Savings > PV or wind interval generation when included > Standard 1.2 - PVWatts Solar Production Calculation`. Pass the exact bound Interval generation and resource profiles from the connected PVWatts, wind, and onsite-generation processes to Microgrid System Interval Bill Calculation when computing Baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance; do not substitute a value from another tree path.

**Output Bindings:**

* Baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance → `baseline_grid_and_fuel_bill` (USD/year; RECORD_SET) at `Annual Operational Savings > Standard 1.5 - Microgrid System Interval Bill Calculation`.

**How to Use:**

1. Map the Microgrid System inputs to the documented Microgrid System Interval Bill Calculation source fields or model inputs: Timestamped interval utility data from the uploaded utility artifact; Time zone and daylight-saving metadata from the uploaded utility artifact; Included component types; Annual operating profile; Power capacity; Usable-energy capacity; Charge efficiency from a nameplate, measurement, audit, or contractor specification; Discharge efficiency from a nameplate, measurement, audit, or contractor specification; Initial state of charge; Reserve constraint; Interval generation and resource profiles from the connected PVWatts, wind, and onsite-generation processes.
2. Align the interval load and tariff calendar, apply the category constraints, solve baseline and proposed cases, compare bill components, and retain solver and input provenance.
3. When an exact value is unavailable, use only a source-specific retained population or equation with documented filters, numeric rule, unit, scope, and version; otherwise report the implementation limitation.
4. Return one selected baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance.
5. Retain the Microgrid System Interval Bill Calculation source version, exact fields or model inputs, native units, eligible population, population size, selected-value rule, fallback level, selected record, and warnings.

**Automation:**

* **Selected Strategy:** Pinned local REopt.jl optimization after complete chronological load, tariff, and technology inputs pass validation.
* **Automation Method:** Align the interval load and tariff calendar, apply the category constraints, solve baseline and proposed cases, compare bill components, and retain solver and input provenance.
* **Difficulty:** Hard

**Validation:**
The official V3 input documentation and open-source solver were checked, so local optimization is technically possible. No category dispatch adapter or golden result is retained, and REopt cannot supply a missing load profile, tariff, or technology design.
