# Information Card — Compressed Air Leak Repair

**Retrofits included:** Compressed air leak repair

**Overview:** Repairing measured compressed-air leaks avoids the compressor electricity previously required to supply the lost air.

**Broader Formula**

```text
Annual Operational Savings =
Annual Electricity Reduction × Bill-Derived Electricity Rate
```

**Expanded Formula**

```text
Annual Operational Savings = In-Scope Equipment Count × Measured Leak Flow × Compressor Specific Power × Annual Pressurized Hours × Bill-Derived Electricity Rate

Use the selected MEASUR leak-measurement method to resolve Measured Leak Flow.
```

**Information Tree**

```text
Annual Operational Savings
├─ Annual compressed-air leak electricity reduction
│  ├─ In-Scope Equipment Count (User)
│  ├─ Selected leak-measurement method (User)
│  ├─ Measurement Observations (User)
│  ├─ Documented System Pressure from Nameplate, Measurement, Audit, or Contractor Specification (Linked Opportunity)
│  ├─ Documented Compressor specific power from Nameplate, Measurement, Audit, or Contractor Specification (Linked Opportunity)
│  ├─ Annual operating hours
│  │  ├─ Recognizable Business, Shift, Seasonal, or Usage Pattern (User)
│  │  ├─ Detailed Operating Days, Shifts, or Active Season, if known (User)
│  │  ├─ Measured Annual Operating Hours, if known (User)
│  │  ├─ Site Location and Business Activity (Profile)
│  │  └─ Standard 1.1 — Compressed Air Leak Repair Annual Operating Hours
│  └─ Standard 1.2 — Compressed Air Leak Repair Engineering Calculation
└─ Applicable Resource Rates
   └─ Bill-Derived Electricity Rate
      ├─ Electricity Use (Bill)
      ├─ Variable Delivery Charges (Bill)
      ├─ Variable Generation Charges (Bill)
      └─ Avoidable Electricity Rate (Derived)
```

**■ Standard 1.1 — Compressed Air Leak Repair Annual Operating Hours**

**Purpose:**
Use U.S. Department of Energy reference buildings and U.S. Naval Observatory daylight data to resolve annual operating hours, exact or estimated status, schedule formula, analysis year, uncertainty, and source provenance from the listed category inputs.

**Source:**
U.S. Department of Energy - Commercial Reference Buildings

**Commercial Reference Buildings:**
[https://www.energy.gov/cmei/buildings/commercial-reference-buildings](https://www.energy.gov/cmei/buildings/commercial-reference-buildings)

**Lookup Inputs:**

* Recognizable Business, Shift, Seasonal, or Usage Pattern
* Detailed Operating Days, Shifts, or Active Season, if known
* Measured Annual Operating Hours, if known
* Site Location and Business Activity

**Value Needed:**

* Annual operating hours, exact or estimated status, schedule formula, analysis year, uncertainty, and source provenance

**How to Use:**

1. Map the Compressed Air Leak Repair inputs to the documented Compressed Air Leak Repair Annual Operating Hours source fields or model inputs: Recognizable Business, Shift, Seasonal, or Usage Pattern; Detailed Operating Days, Shifts, or Active Season, if known; Measured Annual Operating Hours, if known; Site Location and Business Activity.
2. Route the stated pattern to a fixed-schedule or daylight method, apply all supplied days and seasonal details, validate the annual-hour result, and retain the method and analysis year.
3. Reject the Compressed Air Leak Repair path when a required source field, project design input, compatible record, or native unit is absent; do not insert a cross-category default.
4. Return annual operating hours, exact or estimated status, schedule formula, analysis year, uncertainty, and source provenance.
5. Retain the Compressed Air Leak Repair Annual Operating Hours source version, exact fields or model inputs, native units, selected records, warnings, and category-specific rejection reason.

**Automation:**

* **Selected Strategy:** Deterministic calendar calculation from a recognizable business, shift, seasonal, or usage pattern.
* **Automation Method:** Apply the supplied operating days, shifts, active weeks, holidays, and measured-hour overrides to a versioned local calendar calculation.
* **Difficulty:** Easy to Medium

**Validation:**
The DOE commercial reference-building schedule context was checked. Calendar arithmetic is deterministic when the operating pattern is complete, but a business label alone is not a validated annual-hours value and no category golden fixture exists.

**■ Standard 1.2 — Compressed Air Leak Repair Engineering Calculation**

**Purpose:**
Use U.S. Department of Energy - MEASUR to resolve existing and proposed annual resource use or avoided resource use, with calculator version, input units, and warnings from the listed category inputs.

**Source:**
U.S. Department of Energy - MEASUR

**MEASUR tool and downloads:**
[https://www.energy.gov/cmei/ito/measur](https://www.energy.gov/cmei/ito/measur)

**Calculator list and descriptions:**
[https://www.energy.gov/cmei/amo/measur-calculator-list-and-descriptions](https://www.energy.gov/cmei/amo/measur-calculator-list-and-descriptions)

**ORNL MEASUR source repository:**
[https://github.com/ORNL-AMO/AMO-Tools-Desktop](https://github.com/ORNL-AMO/AMO-Tools-Desktop)

**Lookup Inputs:**

* In-Scope Equipment Count
* Selected leak-measurement method
* Measurement Observations
* System Pressure from a nameplate, measurement, audit, or contractor specification
* Compressor specific power from a nameplate, measurement, audit, or contractor specification
* Annual operating hours from the connected schedule process

**Value Needed:**

* Existing and proposed annual resource use or avoided resource use, with calculator version, input units, and warnings

**How to Use:**

1. Load the Compressed Air Leak Repair project facts from documented nameplates, measurements, controls trends, or contractor specifications and map their units to the MEASUR Compressed Air Assessment leak-loss calculation.
2. Run the pinned open-source Compressed Air Assessment leak-loss calculation baseline and proposed cases using the category formula boundary shown in this card.
3. Return no result when the Compressed Air Assessment leak-loss calculation requires a flow, pressure, load profile, duty point, efficiency, or schedule that is absent from the project evidence.
4. Return existing and proposed annual resource use or avoided resource use, with calculator version, input units, and warnings.
5. Retain the MEASUR version, Compressed Air Assessment leak-loss calculation input object, unit conversions, warnings, baseline and proposed outputs, and project-document provenance.

**Automation:**

* **Selected Strategy:** Pinned local execution of the MEASUR Compressed Air Assessment leak-loss calculation for Compressed Air Leak Repair.
* **Automation Method:** Map reviewed project evidence into the Compressed Air Assessment leak-loss calculation input schema, execute the versioned local module, and preserve its warnings and native outputs without supplying missing design inputs.
* **Difficulty:** Medium to Hard

**Validation:**
The official MEASUR tool page, calculator descriptions, and open-source implementation were checked, so local automation is feasible. The exact category module, input and output mapping, and golden example have not yet been pinned, so this process must not imply executable validation.
