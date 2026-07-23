# Information Card — Automated Demand Response

**Retrofits included:** Automated demand response controls

**Overview:** Automated demand response changes interval electric load during eligible events and can reduce utility charges under the applicable tariff.

**Broader Formula**

```text
Annual Operational Savings =
Baseline Annual Bill − Proposed Annual Bill
```

**Expanded Formula**

```text
Annual Operational Savings = Baseline Annual Bill - Proposed Annual Bill

Proposed Load in Each Interval = Baseline Load in Each Interval - Shed Load in Each Interval + Rebound Load in Each Interval
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
├─ Documented Controllable-load definition from Nameplate, Measurement, Audit, or Contractor Specification (Project Document)
│  └─ Standard 1.1 — Demand-Response Event Behavior Benchmark
├─ Documented Maximum shed kW from Nameplate, Measurement, Audit, or Contractor Specification (Project Document)
├─ Documented Event-availability schedule from Nameplate, Measurement, Audit, or Contractor Specification (Project Document)
├─ Documented Maximum event duration from Nameplate, Measurement, Audit, or Contractor Specification (Project Document)
├─ Documented Rebound or recovery constraint from Nameplate, Measurement, Audit, or Contractor Specification (Project Document)
└─ Standard 1.2 — Automated Demand Response Interval Bill Calculation
```

**■ Standard 1.1 — Demand-Response Event Behavior Benchmark**

**Purpose:**
Select one conservative shed, availability, duration, and rebound profile when a Project Document does not provide exact event behavior.

**Source:**
U.S. DOE, U.S. EPA, and National Laboratory of the Rockies benchmark sources

**Commercial Reference Buildings:**
[https://www.energy.gov/cmei/buildings/commercial-reference-buildings](https://www.energy.gov/cmei/buildings/commercial-reference-buildings)

**ComStock data lake and documentation:**
[https://comstock.nrel.gov/](https://comstock.nrel.gov/)

**Lookup Inputs:**

* Business activity and building type
* Operating schedule
* Interval utility data
* Controllable equipment types
* Opportunity event and maximum-shed restrictions

**Value Needed:**

* One maximum shed value
* One event-availability schedule
* One maximum event duration
* One rebound or recovery profile

**How to Use:**

1. Map the Automated Demand Response inputs to the documented Demand-Response Event Behavior Benchmark source fields or model inputs: Business activity and building type; Operating schedule; Interval utility data; Controllable equipment types; Opportunity event and maximum-shed restrictions.
2. Apply the category's reviewed context fields and source-version filters, use an official recommended or typical value when available, otherwise use a valid weighted median or ordinary median, and retain the selected value plus population provenance.
3. When an exact value is unavailable, select one context-matched authoritative benchmark and then one deterministic RetroFi benchmark if needed; do not insert an unexplained cross-category default.
4. Return one selected maximum shed value; One event-availability schedule; One maximum event duration; One rebound or recovery profile.
5. Retain the Demand-Response Event Behavior Benchmark source version, exact fields or model inputs, native units, eligible population, population size, selected-value rule, fallback level, selected record, and warnings.

**Automation:**

* **Selected Strategy:** Category-specific deterministic selection from the closest authoritative compatible population.
* **Automation Method:** Apply the category's reviewed context fields and source-version filters, use an official recommended or typical value when available, otherwise use a valid weighted median or ordinary median, and retain the selected value plus population provenance.
* **Difficulty:** Medium

**Validation:**
DOE building-load datasets can support context-matched controllable-load profiles after the exact end-use filters and retained population are implemented. No retained demand-response population currently proves those filters, so the benchmark method is defined but execution proof remains pending.

**■ Standard 1.2 — Automated Demand Response Interval Bill Calculation**

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
* Controllable-load definition from a Project Document or the connected context benchmark
* Maximum shed from a Project Document, the linked opportunity, or the connected context benchmark
* Event-availability schedule from a Project Document, the linked opportunity, or the connected context benchmark
* Maximum event duration from a Project Document, the linked opportunity, or the connected context benchmark
* Rebound or recovery constraint from a Project Document or the connected context benchmark

**Value Needed:**

* Baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance

**How to Use:**

1. Validate interval utility data, time-zone treatment, monthly reconciliation, and authoritative tariff mapping before the dollar calculation.
2. Resolve the controllable-load definition, maximum shed, event availability, maximum event duration, and rebound or recovery constraint from audits, controls trends, engineering studies, opportunity restrictions, or the connected benchmark.
3. Apply every resolved event constraint to one baseline and one proposed interval-load case.
4. Run the pinned local REopt.jl bill comparison and return one selected annual savings value.
5. Retain the exact or benchmark source for every constraint, tariff provenance, solver version, warnings, and monthly bill reconciliation.

**Automation:**

* **Selected Strategy:** Pinned local REopt.jl optimization after complete chronological load, tariff, and technology inputs pass validation.
* **Automation Method:** Align the interval load and tariff calendar, apply the category constraints, solve baseline and proposed cases, compare bill components, and retain solver and input provenance.
* **Difficulty:** Hard

**Validation:**
The official V3 input documentation and open-source solver were checked, so local optimization is technically possible. No category dispatch adapter or golden result is retained, and REopt cannot supply a missing load profile, tariff, or technology design.
