# Information Card — Electric Forklift or Material Handling Equipment

**Retrofits included:** Electric forklift / material handling equipment

**Overview:** Electric material-handling equipment replaces hourly fuel use with charging electricity for the same operating duty.

**Broader Formula**

```text
Annual Operational Savings =
Annual Resource Reduction × Applicable Bill-Derived Resource Rate
```

**Expanded Formula**

```text
Annual Operational Savings = In-Scope Equipment Count × Annual Operating Hours × (Existing Fuel Per Hour × Current Fuel Price - Proposed kWh Per Hour × Bill-Derived Electricity Rate)
```

**Information Tree**

```text
Annual Operational Savings
├─ Annual forklift resource switch
│  ├─ In-Scope Equipment Count (User)
│  ├─ Annual operating hours
│  │  ├─ Recognizable Business, Shift, Seasonal, or Usage Pattern (User)
│  │  ├─ Detailed Operating Days, Shifts, or Active Season, if known (User)
│  │  ├─ Measured Annual Operating Hours, if known (User)
│  │  ├─ Site Location and Business Activity (Profile)
│  │  └─ Standard 1.1 — Electric Forklift or Material Handling Equipment Annual Operating Hours
│  ├─ Existing fuel use per operating hour, if known (User)
│  └─ Proposed charging kWh per operating hour, if known (User)
└─ Applicable Resource Rates
   ├─ Bill-Derived Electricity Rate
   │  ├─ Electricity Use (Bill)
   │  ├─ Variable Delivery Charges (Bill)
   │  ├─ Variable Generation Charges (Bill)
   │  └─ Avoidable Electricity Rate (Derived)
   └─ Documented Current Fuel Price (User)
```

**■ Standard 1.1 — Electric Forklift or Material Handling Equipment Annual Operating Hours**

**Purpose:**
Use U.S. Department of Energy reference buildings and U.S. Naval Observatory daylight data to resolve annual operating hours, exact or estimated status, schedule formula, analysis year, uncertainty, and source provenance from the listed category inputs.

**Source:**
U.S. Department of Energy - Commercial Reference Buildings

**Commercial Reference Buildings:**
[https://www.energy.gov/cmei/buildings/commercial-reference-buildings](https://www.energy.gov/cmei/buildings/commercial-reference-buildings)

**Lookup Inputs:**

* In-Scope Equipment Count
* Recognizable Business, Shift, Seasonal, or Usage Pattern
* Detailed Operating Days, Shifts, or Active Season, if known
* Measured Annual Operating Hours, if known
* Existing fuel use per operating hour, if known
* Proposed charging kWh per operating hour, if known
* Documented current project fuel price for the matching fuel and geography
* Site Location and Business Activity

**Value Needed:**

* Annual operating hours, exact or estimated status, schedule formula, analysis year, uncertainty, and source provenance

**How to Use:**

1. Validate these inputs and preserve the source of each supplied value: In-Scope Equipment Count; Recognizable Business, Shift, Seasonal, or Usage Pattern; Detailed Operating Days, Shifts, or Active Season, if known.
2. Route the stated pattern to a fixed-schedule or daylight method, apply all supplied days and seasonal details, validate the annual-hour result, and retain the method and analysis year.
3. Reject missing, ambiguous, incompatible, or out-of-scope records instead of inserting a generic default.
4. Return annual operating hours, exact or estimated status, schedule formula, analysis year, uncertainty, and source provenance.
5. Store the source version, selected record or method, input units, and any warnings with the result.

**Automation:**

* **Selected Strategy:** Deterministic calendar calculation from a recognizable business, shift, seasonal, or usage pattern.
* **Automation Method:** Apply the supplied operating days, shifts, active weeks, holidays, and measured-hour overrides to a versioned local calendar calculation.
* **Difficulty:** Easy to Medium

**Validation:**
The DOE commercial reference-building schedule context was checked. Calendar arithmetic is deterministic when the operating pattern is complete, but a business label alone is not a validated annual-hours value and no category golden fixture exists.
