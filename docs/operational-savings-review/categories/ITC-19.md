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
└─ Chronological Electricity Load and Tariff
   ├─ Timestamped Interval Utility Data (Bill)
   ├─ Time Zone and Daylight-Saving Metadata from the Uploaded Utility Artifact (Bill)
   ├─ Rate Schedule and Customer Class (Bill)
   ├─ Authoritative Tariff Mapping Is Not Yet Verified (Derived)
   ├─ No Interval Dollar Estimate Until Tariff Rules Are Resolved (Derived)
   └─ Monthly Bill Reconciliation When Tariff Mapping Exists (Derived)
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
3. Reject the Small Wind Generation path when a required source field, project design input, compatible record, or native unit is absent; do not insert a cross-category default.
4. Return interval and annual AC electricity generation, with wind resource, turbine, loss, unit, and source provenance.
5. Retain the Small Wind Production Simulation source version, exact fields or model inputs, native units, selected records, warnings, and category-specific rejection reason.

**Automation:**

* **Selected Strategy:** Versioned wind-resource retrieval followed by a local SAM turbine power-curve simulation.
* **Automation Method:** Resolve site resource data at the selected height and year, validate the exact turbine power curve and losses, run the model, and return interval and annual AC generation.
* **Difficulty:** Hard

**Validation:**
The official WIND Toolkit access path and SAM implementation were checked. A retained turbine and resource fixture is still absent, and the source cannot choose the turbine, power curve, hub height, or losses for the project.
