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
│  ├─ Serving Electric Utility (Bill)
│  ├─ Billing Period Start and End (Bill)
│  ├─ Timestamped Interval Utility Data (Bill)
│  ├─ Time Zone and Daylight-Saving Metadata from the Uploaded Utility Artifact (Bill)
│  ├─ Rate Schedule and Customer Class (Bill)
│  ├─ Standard 1.1 — Interval Tariff Resolution
│  └─ Monthly Bill Reconciliation When Tariff Mapping Exists (Derived)
├─ Documented Vehicle-arrival schedule from Submeter, Controls Trend, Audit, or Contractor Specification (Project Document)
├─ Documented Vehicle-departure schedule from Submeter, Controls Trend, Audit, or Contractor Specification (Project Document)
├─ Documented Required energy by departure from Submeter, Controls Trend, Audit, or Contractor Specification (Project Document)
├─ Documented Charger power limit from Nameplate, Measurement, Audit, or Contractor Specification (Project Document)
├─ Documented Site power limit from Nameplate, Measurement, Audit, or Contractor Specification (Project Document)
├─ Documented Managed charging template from Submeter, Controls Trend, Audit, or Contractor Specification (Project Document)
├─ Documented Unmanaged charging template from Submeter, Controls Trend, Audit, or Contractor Specification (Project Document)
└─ Standard 1.2 — Managed Fleet Charging Interval Bill Calculation
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

**■ Standard 1.2 — Managed Fleet Charging Interval Bill Calculation**

**Purpose:**
Use National Laboratory of the Rockies - REopt V3 and REopt.jl to resolve unmanaged annual bill; Managed annual bill from the listed category inputs.

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
* Vehicle-arrival schedule
* Vehicle-departure schedule
* Required energy by departure
* Charger power limit
* Site power limit
* Managed charging template
* Unmanaged charging template

**Value Needed:**

* Unmanaged annual bill
* Managed annual bill

**How to Use:**

1. Map the Managed Fleet Charging inputs to the documented Managed Fleet Charging Interval Bill Calculation source fields or model inputs: Timestamped interval utility data from the uploaded utility artifact; Time zone and daylight-saving metadata from the uploaded utility artifact; Vehicle-arrival schedule; Vehicle-departure schedule; Required energy by departure; Charger power limit; Site power limit; Managed charging template; Unmanaged charging template.
2. Align the interval load and tariff calendar, apply the category constraints, solve baseline and proposed cases, compare bill components, and retain solver and input provenance.
3. When an exact value is unavailable, use only a source-specific retained population or equation with documented filters, numeric rule, unit, scope, and version; otherwise report the implementation limitation.
4. Return one selected unmanaged annual bill; Managed annual bill.
5. Retain the Managed Fleet Charging Interval Bill Calculation source version, exact fields or model inputs, native units, eligible population, population size, selected-value rule, fallback level, selected record, and warnings.

**Automation:**

* **Selected Strategy:** Pinned local REopt.jl optimization after complete chronological load, tariff, and technology inputs pass validation.
* **Automation Method:** Align the interval load and tariff calendar, apply the category constraints, solve baseline and proposed cases, compare bill components, and retain solver and input provenance.
* **Difficulty:** Hard

**Validation:**
The official V3 input documentation and open-source solver were checked, so local optimization is technically possible. No category dispatch adapter or golden result is retained, and REopt cannot supply a missing load profile, tariff, or technology design.
