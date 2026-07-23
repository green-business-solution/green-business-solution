# Information Card — Solar Photovoltaic Generation

**Retrofits included:** Rooftop solar PV; Ground-mounted solar PV; Solar carport

**Overview:** Rooftop, ground-mounted, and carport solar arrays generate electricity that offsets site purchases and may create credited exports.

**Broader Formula**

```text
Annual Operational Savings =
Onsite Electricity Offset Value + Credited Export Value
```

**Expanded Formula**

```text
Annual Operational Savings = Sum Across Intervals of (Onsite Electricity Offset in Each Interval × Import Rate in Each Interval + Exported Electricity in Each Interval × Export Credit in Each Interval)

Onsite Electricity Offset in Each Interval = Minimum of (Solar AC Generation in Each Interval, Baseline Imported Electricity in Each Interval)

Exported Electricity in Each Interval = Maximum of (Solar AC Generation in Each Interval - Baseline Imported Electricity in Each Interval, 0)
```

**Information Tree**

```text
Annual Operational Savings
├─ Site Location (Profile)
├─ PV array configuration
│  ├─ DC capacity (Linked Opportunity)
│  ├─ Module Type (Linked Opportunity)
│  ├─ Array type (Linked Opportunity)
│  ├─ System losses (Linked Opportunity)
│  ├─ Tilt (Linked Opportunity)
│  └─ Azimuth (Linked Opportunity)
├─ Standard 1.1 — PVWatts Solar Production Calculation
├─ Interval onsite-offset and export calculation (Derived)
└─ Chronological Electricity Load and Tariff
   ├─ Timestamped Interval Electricity Data (User)
   ├─ Time Zone and Daylight-Saving Treatment from the Uploaded Data (User)
   ├─ Rate Schedule and Customer Class (Bill)
   ├─ Complete Tariff Calendar and Billing Rules (User)
   └─ Monthly Bill Reconciliation (Derived)
```

**■ Standard 1.1 — PVWatts Solar Production Calculation**

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
* Timestamped Interval Electricity Data
* Time Zone and Daylight-Saving Treatment from Uploaded Interval Data

**Value Needed:**

* Interval or annual AC electricity generation, with model inputs, warnings, units, and source version

**How to Use:**

1. Validate these inputs and preserve the source of each supplied value: DC capacity; Module Type; Array type.
2. Validate site coordinates and array design, run the documented V8 field contract, check warnings, and return interval or annual AC generation with source provenance.
3. Reject missing, ambiguous, incompatible, or out-of-scope records instead of inserting a generic default.
4. Return interval or annual AC electricity generation, with model inputs, warnings, units, and source version.
5. Store the source version, selected record or method, input units, and any warnings with the result.

**Automation:**

* **Selected Strategy:** PVWatts V8 API or pinned local SAM execution with the same explicit array inputs.
* **Automation Method:** Validate site coordinates and array design, run the documented V8 field contract, check warnings, and return interval or annual AC generation with source provenance.
* **Difficulty:** Medium

**Validation:**
The official V8 field contract was checked and the retained fixture validates required fields, units, source version, and unsupported defaults. The source can calculate generation but cannot choose system capacity or array configuration for the project.
