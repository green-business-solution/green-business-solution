# Information Card — Small Wind Generation

**Retrofits included:** Small wind turbine

**Overview:** A small wind turbine generates electricity that offsets site purchases and may create credited exports when the wind resource and turbine are specified.

**Broader Formula**

```text
Annual Operational Savings =
Onsite Electricity Offset Value + Credited Export Value
```

**Expanded Formula**

```text
Annual Operational Savings = Sum Across Intervals of (Onsite Electricity Offset in Each Interval × Import Rate in Each Interval + Exported Electricity in Each Interval × Export Credit in Each Interval)

Onsite Electricity Offset in Each Interval = Minimum of (Wind Generation in Each Interval, Baseline Imported Electricity in Each Interval)

Exported Electricity in Each Interval = Maximum of (Wind Generation in Each Interval - Baseline Imported Electricity in Each Interval, 0)
```

**Information Tree**

```text
Annual Operational Savings
├─ Site Location (Profile)
├─ Wind Turbine Class or Intended Application (Linked Opportunity)
├─ Exact Turbine Model or Power Curve (Linked Opportunity)
├─ Hub Height (Linked Opportunity)
├─ Loss factor (Linked Opportunity)
├─ Analysis Year (User)
├─ Standard 1.1 — Small Wind Production Simulation
├─ Interval onsite-offset and export calculation (Derived)
├─ Chronological Electricity Load and Tariff
│  ├─ Serving Electric Utility (Bill)
│  ├─ Billing Period Start and End (Bill)
│  ├─ Timestamped Interval Utility Data (Bill)
│  ├─ Time Zone and Daylight-Saving Metadata from the Uploaded Utility Artifact (Bill)
│  ├─ Rate Schedule and Customer Class (Bill)
│  ├─ Standard 1.2 — Interval Tariff Resolution
│  └─ Monthly Bill Reconciliation When Tariff Mapping Exists (Derived)
└─ Interconnection and Export-Credit Configuration (Linked Opportunity)
```

**■ Standard 1.1 — Small Wind Production Simulation**

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
* Site Location

**Value Needed:**

* Interval and annual AC electricity generation, with wind resource, turbine, loss, unit, and source provenance

**How to Use:**

1. Map the Small Wind Generation inputs to the documented Small Wind Production Simulation source fields or model inputs: Wind Turbine Class or Intended Application; Exact Turbine Model or Power Curve; Hub Height; Loss factor; Analysis Year; Site Location.
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
* Interconnection and export-credit configuration from the project agreement

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
