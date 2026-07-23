# Information Card — Water-Heating Recirculation Controls

**Retrofits included:** Water-heating controls / recirculation controls

**Overview:** Recirculation controls reduce pipe heat loss and pump electricity by limiting hot-water circulation to the periods when it is needed.

**Broader Formula**

```text
Annual Operational Savings =
Annual Resource Reduction × Applicable Bill-Derived Resource Rate
```

**Expanded Formula**

```text
Annual Operational Savings = Avoided Heating Input × Heating-Resource Rate + Avoided Pump Electricity × Bill-Derived Electricity Rate

Avoided Distribution Heat = Existing Distribution Heat - Proposed Distribution Heat

Avoided Heating Input = Convert to Billed Resource Units (Avoided Distribution Heat / Water-Heater Efficiency, Heating-Resource Unit)

Avoided Pump Electricity = Pump Input Power × Avoided Pump Run Hours
```

**Information Tree**

```text
Annual Operational Savings
├─ Annual thermal-input and pump-electricity reduction
│  ├─ Existing annual distribution heat loss (User)
│  ├─ Proposed annual distribution heat loss (User)
│  ├─ Existing Water-Heater Nameplate or Test Information (User)
│  ├─ Existing control schedule (User)
│  ├─ Proposed control schedule (Linked Opportunity)
│  ├─ Pump Nameplate or Measured Input (User)
│  ├─ Annual operating hours
│  │  ├─ Recognizable Business, Shift, Seasonal, or Usage Pattern (User)
│  │  ├─ Detailed Operating Days, Shifts, or Active Season, if known (User)
│  │  ├─ Measured Annual Operating Hours, if known (User)
│  │  ├─ Site Location and Business Activity (Profile)
│  │  └─ Standard 1.1 — Water-Heating Recirculation Controls Annual Operating Hours
│  └─ Standard 1.2 — Water-Heating Recirculation Controls Engineering Calculation
└─ Applicable Resource Rates
   ├─ Bill-Derived Electricity Rate
   │  ├─ Electricity Use (Bill)
   │  ├─ Variable Delivery Charges (Bill)
   │  ├─ Variable Generation Charges (Bill)
   │  └─ Avoidable Electricity Rate (Derived)
   └─ Bill-Derived Gas Rate
      ├─ Gas Use (Bill)
      ├─ Variable Delivery Charges (Bill)
      ├─ Variable Procurement Charges (Bill)
      └─ Avoidable Gas Rate (Derived)
```

**■ Standard 1.1 — Water-Heating Recirculation Controls Annual Operating Hours**

**Purpose:**
Use U.S. Department of Energy reference buildings and U.S. Naval Observatory daylight data to resolve annual operating hours, exact or estimated status, schedule formula, analysis year, uncertainty, and source provenance from the listed category inputs.

**Source:**
U.S. Department of Energy - Commercial Reference Buildings

**Commercial Reference Buildings:**
[https://www.energy.gov/cmei/buildings/commercial-reference-buildings](https://www.energy.gov/cmei/buildings/commercial-reference-buildings)

**Lookup Inputs:**

* Existing annual distribution heat loss
* Proposed annual distribution heat loss
* Existing Water-Heater Nameplate or Test Information
* Existing control schedule
* Proposed control schedule
* Pump Nameplate or Measured Input
* Recognizable Business, Shift, Seasonal, or Usage Pattern
* Detailed Operating Days, Shifts, or Active Season, if known

**Value Needed:**

* Annual operating hours, exact or estimated status, schedule formula, analysis year, uncertainty, and source provenance

**How to Use:**

1. Validate these inputs and preserve the source of each supplied value: Existing annual distribution heat loss; Proposed annual distribution heat loss; Existing Water-Heater Nameplate or Test Information.
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

**■ Standard 1.2 — Water-Heating Recirculation Controls Engineering Calculation**

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

* Existing annual distribution heat loss
* Proposed annual distribution heat loss
* Existing Water-Heater Nameplate or Test Information
* Existing control schedule
* Proposed control schedule
* Pump Nameplate or Measured Input
* Recognizable Business, Shift, Seasonal, or Usage Pattern
* Detailed Operating Days, Shifts, or Active Season, if known

**Value Needed:**

* Existing and proposed annual resource use or avoided resource use, with calculator version, input units, and warnings

**How to Use:**

1. Validate these inputs and preserve the source of each supplied value: Existing annual distribution heat loss; Proposed annual distribution heat loss; Existing Water-Heater Nameplate or Test Information.
2. Map the supplied project facts and units to the named calculator, run the versioned open-source calculation locally, reject incomplete or incompatible inputs, and return its existing and proposed resource results.
3. Reject missing, ambiguous, incompatible, or out-of-scope records instead of inserting a generic default.
4. Return existing and proposed annual resource use or avoided resource use, with calculator version, input units, and warnings.
5. Store the source version, selected record or method, input units, and any warnings with the result.

**Automation:**

* **Selected Strategy:** Pinned local execution of the exact MEASUR calculator for this category.
* **Automation Method:** Map the supplied project facts and units to the named calculator, run the versioned open-source calculation locally, reject incomplete or incompatible inputs, and return its existing and proposed resource results.
* **Difficulty:** Medium to Hard

**Validation:**
The official MEASUR tool page, calculator descriptions, and open-source implementation were checked, so local automation is feasible. The exact category module, input and output mapping, and golden example have not yet been pinned, so this process must not imply executable validation.
