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
│  ├─ Serving Electric Utility (Bill)
│  ├─ Billing Period Start and End (Bill)
│  ├─ Timestamped Interval Utility Data (Bill)
│  ├─ Time Zone and Daylight-Saving Metadata from the Uploaded Utility Artifact (Bill)
│  ├─ Rate Schedule and Customer Class (Bill)
│  ├─ Standard 1.1 — Interval Tariff Resolution
│  └─ Monthly Bill Reconciliation When Tariff Mapping Exists (Derived)
├─ Demand-Response Event Inputs
│  ├─ Business Activity (Profile)
│  ├─ Building Type (Profile)
│  ├─ Operating Schedule (User)
│  ├─ Controllable Equipment Types (User)
│  ├─ Opportunity Event and Maximum-Shed Restrictions (Linked Opportunity)
│  ├─ Controllable-Load Definition from Audit, Controls Trend, or Engineering Study (Project Document)
│  ├─ Maximum Shed from Audit, Controls Trend, or Engineering Study (Project Document)
│  ├─ Event-Availability Schedule from Audit, Controls Trend, or Engineering Study (Project Document)
│  ├─ Maximum Event Duration from Audit, Controls Trend, or Engineering Study (Project Document)
│  ├─ Rebound or Recovery Constraint from Audit, Controls Trend, or Engineering Study (Project Document)
│  └─ Standard 1.2 — Demand-Response Event Behavior Benchmark
└─ Standard 1.3 — Automated Demand Response Interval Bill Calculation
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

**■ Standard 1.2 — Demand-Response Event Behavior Benchmark**

**Purpose:**
Select one conservative shed, availability, duration, and rebound profile when a Project Document does not provide exact event behavior.

**Source:**
U.S. DOE, U.S. EPA, and National Laboratory of the Rockies benchmark sources

**Commercial Reference Buildings:**
[https://www.energy.gov/cmei/buildings/commercial-reference-buildings](https://www.energy.gov/cmei/buildings/commercial-reference-buildings)

**ComStock data lake and documentation:**
[https://comstock.nrel.gov/](https://comstock.nrel.gov/)

**Lookup Inputs:**

* Business activity
* Building type
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

1. Map the Automated Demand Response inputs to the documented Demand-Response Event Behavior Benchmark source fields or model inputs: Business activity; Building type; Operating schedule; Interval utility data; Controllable equipment types; Opportunity event and maximum-shed restrictions.
2. Apply the category's documented source-version and compatibility filters, execute its exact numeric rule, and retain the selected output, unit, scope, fixture, and population or equation provenance. Report a limitation when that source-specific implementation is absent.
3. When an exact value is unavailable, use only a source-specific retained population or equation with documented filters, numeric rule, unit, scope, and version; otherwise report the implementation limitation.
4. Return one selected maximum shed value; One event-availability schedule; One maximum event duration; One rebound or recovery profile.
5. Retain the Demand-Response Event Behavior Benchmark source version, exact fields or model inputs, native units, eligible population, population size, selected-value rule, fallback level, selected record, and warnings.

**Automation:**

* **Selected Strategy:** Category-specific deterministic selection from an explicitly implemented and evidenced compatible source population or equation.
* **Automation Method:** Apply the category's documented source-version and compatibility filters, execute its exact numeric rule, and retain the selected output, unit, scope, fixture, and population or equation provenance. Report a limitation when that source-specific implementation is absent.
* **Difficulty:** Medium

**Validation:**
DOE building-load datasets can support context-matched controllable-load profiles after the exact end-use filters and retained population are implemented. No retained demand-response population currently proves those filters, so the benchmark method is defined but execution proof remains pending.

**■ Standard 1.3 — Automated Demand Response Interval Bill Calculation**

**Purpose:**
Use National Laboratory of the Rockies - REopt V3 and REopt.jl to resolve baseline annual bill; Proposed annual bill from the listed category inputs.

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
* Resolved interval tariff input set from the connected tariff process
* Controllable-load definition from a Project Document
* Controllable-load definition from the connected context benchmark
* Maximum shed from a Project Document
* Maximum shed restrictions from the linked opportunity
* Maximum shed from the connected context benchmark
* Event-availability schedule from a Project Document
* Event restrictions from the linked opportunity
* Event-availability schedule from the connected context benchmark
* Maximum event duration from a Project Document
* Maximum event duration restrictions from the linked opportunity
* Maximum event duration from the connected context benchmark
* Rebound or recovery constraint from a Project Document
* Rebound or recovery profile from the connected context benchmark

**Value Needed:**

* Baseline annual bill
* Proposed annual bill

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
