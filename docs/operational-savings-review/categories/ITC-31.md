# Information Card — Managed Fleet Charging

**Retrofits included:** Fleet telematics / charging management system

**Overview:** Managed charging shifts fleet electricity use within vehicle availability windows to reduce tariff costs without missing required departure energy.

**Broader Formula**

```text
Annual Operational Savings =
Baseline Annual Bill − Proposed Annual Bill
```

**Expanded Formula**

```text
Annual Operational Savings = Unmanaged Annual Bill - Managed Annual Bill

Sum Across Available Intervals of Delivered Charging Energy in Each Interval ≥ Required Departure Energy
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
├─ Documented Vehicle-arrival schedule from Submeter, Controls Trend, Audit, or Contractor Specification (Project Document)
├─ Documented Vehicle-departure schedule from Submeter, Controls Trend, Audit, or Contractor Specification (Project Document)
├─ Documented Required energy by departure from Submeter, Controls Trend, Audit, or Contractor Specification (Project Document)
├─ Documented Charger power limit from Nameplate, Measurement, Audit, or Contractor Specification (Project Document)
├─ Documented Site power limit from Nameplate, Measurement, Audit, or Contractor Specification (Project Document)
├─ Documented Managed charging template from Submeter, Controls Trend, Audit, or Contractor Specification (Project Document)
├─ Documented Unmanaged charging template from Submeter, Controls Trend, Audit, or Contractor Specification (Project Document)
└─ Standard 1.1 — Managed Fleet Charging Interval Bill Calculation
```

**■ Standard 1.1 — Managed Fleet Charging Interval Bill Calculation**

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
* Vehicle-arrival schedule
* Vehicle-departure schedule
* Required energy by departure
* Charger power limit
* Site power limit
* Managed charging template
* Unmanaged charging template

**Value Needed:**

* Baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance

**How to Use:**

1. Map the Managed Fleet Charging inputs to the documented Managed Fleet Charging Interval Bill Calculation source fields or model inputs: Timestamped interval utility data from the uploaded utility artifact; Time zone and daylight-saving metadata from the uploaded utility artifact; Authoritative tariff mapping, which is not yet verified; Vehicle-arrival schedule; Vehicle-departure schedule; Required energy by departure; Charger power limit; Site power limit; Managed charging template; Unmanaged charging template.
2. Align the interval load and tariff calendar, apply the category constraints, solve baseline and proposed cases, compare bill components, and retain solver and input provenance.
3. When an exact value is unavailable, select one context-matched authoritative benchmark and then one deterministic RetroFi benchmark if needed; do not insert an unexplained cross-category default.
4. Return one selected baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance.
5. Retain the Managed Fleet Charging Interval Bill Calculation source version, exact fields or model inputs, native units, eligible population, population size, selected-value rule, fallback level, selected record, and warnings.

**Automation:**

* **Selected Strategy:** Pinned local REopt.jl optimization after complete chronological load, tariff, and technology inputs pass validation.
* **Automation Method:** Align the interval load and tariff calendar, apply the category constraints, solve baseline and proposed cases, compare bill components, and retain solver and input provenance.
* **Difficulty:** Hard

**Validation:**
The official V3 input documentation and open-source solver were checked, so local optimization is technically possible. No category dispatch adapter or golden result is retained, and REopt cannot supply a missing load profile, tariff, or technology design.
