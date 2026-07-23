# Information Card — Thermal Energy Storage

**Retrofits included:** Thermal energy storage

**Overview:** Thermal storage shifts heating or cooling production across time and changes the electricity required during different tariff periods.

**Broader Formula**

```text
Annual Operational Savings =
Baseline Annual Bill − Proposed Annual Bill
```

**Expanded Formula**

```text
Annual Operational Savings = Baseline Annual Bill - Proposed Annual Bill

Thermal Storage State in Each Interval = Thermal Storage State in the Prior Interval + Charging Energy in Each Interval × Charge Efficiency - Discharging Energy in Each Interval / Discharge Efficiency - Standing Thermal Loss in Each Interval
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
├─ Documented Interval HVAC thermal load or validated electric proxy from Submeter, Controls Trend, Audit, or Contractor Specification (Project Document)
├─ Thermal capacity (Linked Opportunity)
├─ Charge limit (Linked Opportunity)
├─ Discharge limit (Linked Opportunity)
├─ Charge efficiency (Linked Opportunity)
├─ Discharge efficiency (Linked Opportunity)
├─ Standing loss (Linked Opportunity)
├─ Initial Thermal State (Linked Opportunity)
├─ Terminal thermal-state constraint (Linked Opportunity)
└─ Standard 1.2 — Thermal Energy Storage Interval Bill Calculation
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

**■ Standard 1.2 — Thermal Energy Storage Interval Bill Calculation**

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
* Thermal capacity
* Charge limit
* Discharge limit
* Charge efficiency from a nameplate, measurement, audit, or contractor specification
* Discharge efficiency from a nameplate, measurement, audit, or contractor specification
* Standing loss
* Initial Thermal State
* Terminal thermal-state constraint

**Value Needed:**

* Baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance

**Input Bindings:**

* Timestamped interval utility data from the uploaded utility artifact ← Bill at `Annual Operational Savings > Chronological Electricity Load and Tariff > Timestamped Interval Utility Data`. Pass the exact bound Timestamped interval utility data from the uploaded utility artifact to Thermal Energy Storage Interval Bill Calculation when computing Baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance; do not substitute a value from another tree path.
* Time zone and daylight-saving metadata from the uploaded utility artifact ← Bill at `Annual Operational Savings > Chronological Electricity Load and Tariff > Time Zone and Daylight-Saving Metadata from the Uploaded Utility Artifact`. Pass the exact bound Time zone and daylight-saving metadata from the uploaded utility artifact to Thermal Energy Storage Interval Bill Calculation when computing Baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance; do not substitute a value from another tree path.
* Thermal capacity ← Linked Opportunity at `Annual Operational Savings > Thermal capacity`. Pass the exact bound Thermal capacity to Thermal Energy Storage Interval Bill Calculation when computing Baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance; do not substitute a value from another tree path.
* Charge limit ← Linked Opportunity at `Annual Operational Savings > Charge limit`. Pass the exact bound Charge limit to Thermal Energy Storage Interval Bill Calculation when computing Baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance; do not substitute a value from another tree path.
* Discharge limit ← Linked Opportunity at `Annual Operational Savings > Discharge limit`. Pass the exact bound Discharge limit to Thermal Energy Storage Interval Bill Calculation when computing Baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance; do not substitute a value from another tree path.
* Charge efficiency from a nameplate, measurement, audit, or contractor specification ← Project Document at `Annual Operational Savings > Documented Interval HVAC thermal load or validated electric proxy from Submeter, Controls Trend, Audit, or Contractor Specification`. Pass the exact bound Charge efficiency from a nameplate, measurement, audit, or contractor specification to Thermal Energy Storage Interval Bill Calculation when computing Baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance; do not substitute a value from another tree path.
* Discharge efficiency from a nameplate, measurement, audit, or contractor specification ← Project Document at `Annual Operational Savings > Documented Interval HVAC thermal load or validated electric proxy from Submeter, Controls Trend, Audit, or Contractor Specification`. Pass the exact bound Discharge efficiency from a nameplate, measurement, audit, or contractor specification to Thermal Energy Storage Interval Bill Calculation when computing Baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance; do not substitute a value from another tree path.
* Standing loss ← Linked Opportunity at `Annual Operational Savings > Standing loss`. Pass the exact bound Standing loss to Thermal Energy Storage Interval Bill Calculation when computing Baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance; do not substitute a value from another tree path.
* Initial Thermal State ← Linked Opportunity at `Annual Operational Savings > Initial Thermal State`. Pass the exact bound Initial Thermal State to Thermal Energy Storage Interval Bill Calculation when computing Baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance; do not substitute a value from another tree path.
* Terminal thermal-state constraint ← Linked Opportunity at `Annual Operational Savings > Terminal thermal-state constraint`. Pass the exact bound Terminal thermal-state constraint to Thermal Energy Storage Interval Bill Calculation when computing Baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance; do not substitute a value from another tree path.

**Output Bindings:**

* Baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance → `baseline_annual_bill` (USD/year; RECORD_SET) at `Annual Operational Savings > Standard 1.2 - Thermal Energy Storage Interval Bill Calculation`.

**How to Use:**

1. Map the Thermal Energy Storage inputs to the documented Thermal Energy Storage Interval Bill Calculation source fields or model inputs: Timestamped interval utility data from the uploaded utility artifact; Time zone and daylight-saving metadata from the uploaded utility artifact; Thermal capacity; Charge limit; Discharge limit; Charge efficiency from a nameplate, measurement, audit, or contractor specification; Discharge efficiency from a nameplate, measurement, audit, or contractor specification; Standing loss; Initial Thermal State; Terminal thermal-state constraint.
2. Align the interval load and tariff calendar, apply the category constraints, solve baseline and proposed cases, compare bill components, and retain solver and input provenance.
3. When an exact value is unavailable, use only a source-specific retained population or equation with documented filters, numeric rule, unit, scope, and version; otherwise report the implementation limitation.
4. Return one selected baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance.
5. Retain the Thermal Energy Storage Interval Bill Calculation source version, exact fields or model inputs, native units, eligible population, population size, selected-value rule, fallback level, selected record, and warnings.

**Automation:**

* **Selected Strategy:** Pinned local REopt.jl optimization after complete chronological load, tariff, and technology inputs pass validation.
* **Automation Method:** Align the interval load and tariff calendar, apply the category constraints, solve baseline and proposed cases, compare bill components, and retain solver and input provenance.
* **Difficulty:** Hard

**Validation:**
The official V3 input documentation and open-source solver were checked, so local optimization is technically possible. No category dispatch adapter or golden result is retained, and REopt cannot supply a missing load profile, tariff, or technology design.
