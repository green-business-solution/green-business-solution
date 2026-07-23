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
│  ├─ Authoritative Tariff Mapping Is Not Yet Verified (Derived)
│  ├─ No Interval Dollar Estimate Until Tariff Rules Are Resolved (Derived)
│  └─ Monthly Bill Reconciliation When Tariff Mapping Exists (Derived)
├─ Documented Interval HVAC thermal load or validated electric proxy from Submeter, Controls Trend, Audit, or Contractor Specification (Linked Opportunity)
├─ Thermal capacity (Linked Opportunity)
├─ Charge limit (Linked Opportunity)
├─ Discharge limit (Linked Opportunity)
├─ Charge efficiency (Linked Opportunity)
├─ Discharge efficiency (Linked Opportunity)
├─ Standing loss (Linked Opportunity)
├─ Initial Thermal State (Linked Opportunity)
├─ Terminal thermal-state constraint (Linked Opportunity)
└─ Standard 1.1 — Thermal Energy Storage Interval Bill Calculation
```

**■ Standard 1.1 — Thermal Energy Storage Interval Bill Calculation**

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

**How to Use:**

1. Map the Thermal Energy Storage inputs to the documented Thermal Energy Storage Interval Bill Calculation source fields or model inputs: Timestamped interval utility data from the uploaded utility artifact; Time zone and daylight-saving metadata from the uploaded utility artifact; Authoritative tariff mapping, which is not yet verified; Thermal capacity; Charge limit; Discharge limit; Charge efficiency from a nameplate, measurement, audit, or contractor specification; Discharge efficiency from a nameplate, measurement, audit, or contractor specification; Standing loss; Initial Thermal State; Terminal thermal-state constraint.
2. Align the interval load and tariff calendar, apply the category constraints, solve baseline and proposed cases, compare bill components, and retain solver and input provenance.
3. Reject the Thermal Energy Storage path when a required source field, project design input, compatible record, or native unit is absent; do not insert a cross-category default.
4. Return baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance.
5. Retain the Thermal Energy Storage Interval Bill Calculation source version, exact fields or model inputs, native units, selected records, warnings, and category-specific rejection reason.

**Automation:**

* **Selected Strategy:** Pinned local REopt.jl optimization after complete chronological load, tariff, and technology inputs pass validation.
* **Automation Method:** Align the interval load and tariff calendar, apply the category constraints, solve baseline and proposed cases, compare bill components, and retain solver and input provenance.
* **Difficulty:** Hard

**Validation:**
The official V3 input documentation and open-source solver were checked, so local optimization is technically possible. No category dispatch adapter or golden result is retained, and REopt cannot supply a missing load profile, tariff, or technology design.
