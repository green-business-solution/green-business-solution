# Information Card — Battery Storage Dispatch

**Retrofits included:** Battery storage system

**Overview:** Battery storage shifts electric imports across time and changes energy and demand charges under a complete interval tariff.

**Broader Formula**

```text
Annual Operational Savings =
Baseline Annual Bill − Proposed Annual Bill
```

**Expanded Formula**

```text
Annual Operational Savings = Baseline Annual Bill - Proposed Annual Bill

Battery State of Charge in Each Interval = Battery State of Charge in the Prior Interval + Charging Energy in Each Interval × Charge Efficiency - Discharging Energy in Each Interval / Discharge Efficiency
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
├─ Battery Design and Operating Constraints
│  ├─ Opportunity-Prescribed Battery Design
│  │  ├─ Power Capacity (Linked Opportunity)
│  │  ├─ Usable-Energy Capacity (Linked Opportunity)
│  │  ├─ Charge Efficiency (Linked Opportunity)
│  │  ├─ Discharge Efficiency (Linked Opportunity)
│  │  ├─ Initial State of Charge (Linked Opportunity)
│  │  ├─ Terminal State-of-Charge Constraint (Linked Opportunity)
│  │  ├─ Dispatch-Availability Schedule (Linked Opportunity)
│  │  └─ Reserve Constraint (Linked Opportunity)
│  ├─ Contractor or Engineering Battery Design (Project Document)
│  ├─ Dispatch Horizon (User)
│  └─ Standard 1.2 — Battery Dispatch Boundary Benchmark
└─ Standard 1.3 — Battery Storage Dispatch Interval Bill Calculation
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

**■ Standard 1.2 — Battery Dispatch Boundary Benchmark**

**Purpose:**
Select one screening dispatch boundary for a missing terminal state-of-charge rule without inventing battery power or energy capacity.

**Source:**
U.S. DOE, U.S. EPA, and National Laboratory of the Rockies benchmark sources

**REopt.jl input reference:**
[https://natlabrockies.github.io/REopt.jl/dev/reopt/inputs/](https://natlabrockies.github.io/REopt.jl/dev/reopt/inputs/)

**Lookup Inputs:**

* Initial state of charge
* Dispatch horizon
* Opportunity reserve requirement
* Project Document reserve requirement

**Value Needed:**

* One terminal state-of-charge constraint

**How to Use:**

1. Use the terminal state-of-charge constraint from the linked opportunity or Project Document when it is explicit.
2. Otherwise set terminal state of charge equal to initial state of charge for the annual screening horizon so the optimizer cannot create savings by ending with less stored energy.
3. Keep battery power, usable-energy capacity, efficiencies, availability, and reserve constraints separate and source them through the displayed project paths.
4. Return one terminal state-of-charge constraint to the dispatch process.
5. Retain the exact or benchmark source, horizon, initial value, terminal value, and fallback level.

**Automation:**

* **Selected Strategy:** Category-specific deterministic selection from an explicitly implemented and evidenced compatible source population or equation.
* **Automation Method:** Apply the category's documented source-version and compatibility filters, execute its exact numeric rule, and retain the selected output, unit, scope, fixture, and population or equation provenance. Report a limitation when that source-specific implementation is absent.
* **Difficulty:** Medium

**Validation:**
The REopt input reference confirms that storage state constraints are model inputs. Equality to the initial state is a deterministic RetroFi screening boundary, not a value supplied by REopt and not a substitute for missing battery design specifications. A retained category dispatch golden fixture has not yet been added.

**■ Standard 1.3 — Battery Storage Dispatch Interval Bill Calculation**

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
* Power capacity
* Usable-energy capacity
* Charge efficiency from a nameplate, measurement, audit, or contractor specification
* Discharge efficiency from a nameplate, measurement, audit, or contractor specification
* Initial state of charge
* Terminal state-of-charge constraint from the linked opportunity
* Terminal state-of-charge constraint from a Project Document
* Terminal state-of-charge constraint from the connected context benchmark
* Dispatch-availability schedule
* Reserve constraint

**Value Needed:**

* Baseline annual bill
* Proposed annual bill

**How to Use:**

1. Validate interval utility data, time-zone treatment, monthly reconciliation, and authoritative tariff mapping.
2. Resolve power capacity, usable-energy capacity, charge and discharge efficiency, availability, and reserve constraints from the linked opportunity or Project Documents.
3. Resolve both initial and terminal state of charge; when no exact terminal rule exists, use the connected benchmark that sets terminal state of charge equal to initial state of charge for the screening horizon.
4. Run one deterministic baseline and proposed REopt.jl dispatch with every state and operating constraint applied.
5. Return one selected annual bill-savings value and retain all design sources, fallback levels, solver status, warnings, and reconciliation results.

**Automation:**

* **Selected Strategy:** Pinned local REopt.jl optimization after complete chronological load, tariff, and technology inputs pass validation.
* **Automation Method:** Align the interval load and tariff calendar, apply the category constraints, solve baseline and proposed cases, compare bill components, and retain solver and input provenance.
* **Difficulty:** Hard

**Validation:**
The official V3 input documentation and open-source solver were checked, so local optimization is technically possible. No category dispatch adapter or golden result is retained, and REopt cannot supply a missing load profile, tariff, or technology design.
