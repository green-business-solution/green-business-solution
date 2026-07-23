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
│  ├─ Documented Existing annual distribution heat loss from Nameplate, Measurement, Audit, or Contractor Specification (Project Document)
│  ├─ Documented Proposed annual distribution heat loss from Nameplate, Measurement, Audit, or Contractor Specification (Project Document)
│  ├─ Existing Water-Heater Nameplate or Test Information (Project Document)
│  ├─ Existing control schedule (Project Document)
│  ├─ Proposed control schedule (Linked Opportunity)
│  ├─ Pump Nameplate or Measured Input (Project Document)
│  ├─ Annual operating hours
│  │  ├─ Recognizable Business, Shift, Seasonal, or Usage Pattern (User)
│  │  ├─ Detailed Operating Days, Shifts, or Active Season, if known (User)
│  │  ├─ Measured Annual Operating Hours, if known (Project Document)
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
Use U.S. Department of Energy reference buildings and U.S. Naval Observatory daylight data to resolve avoided annual recirculation pump run hours from the listed category inputs.

**Source:**
U.S. Department of Energy - Commercial Reference Buildings

**Commercial Reference Buildings:**
[https://www.energy.gov/cmei/buildings/commercial-reference-buildings](https://www.energy.gov/cmei/buildings/commercial-reference-buildings)

**Lookup Inputs:**

* Existing control schedule
* Proposed control schedule
* Recognizable Business, Shift, Seasonal, or Usage Pattern
* Detailed Operating Days, Shifts, or Active Season, if known
* Measured Annual Operating Hours, if known
* Site Location and Business Activity

**Value Needed:**

* Avoided annual recirculation pump run hours

**How to Use:**

1. Map the Water-Heating Recirculation Controls inputs to the documented Water-Heating Recirculation Controls Annual Operating Hours source fields or model inputs: Existing control schedule; Proposed control schedule; Recognizable Business, Shift, Seasonal, or Usage Pattern; Detailed Operating Days, Shifts, or Active Season, if known; Measured Annual Operating Hours, if known; Site Location and Business Activity.
2. Route the stated pattern to a fixed-schedule or daylight method, apply all supplied days and seasonal details, validate the annual-hour result, and retain the method and analysis year.
3. When an exact value is unavailable, use only a source-specific retained population or equation with documented filters, numeric rule, unit, scope, and version; otherwise report the implementation limitation.
4. Return one selected avoided annual recirculation pump run hours.
5. Retain the Water-Heating Recirculation Controls Annual Operating Hours source version, exact fields or model inputs, native units, eligible population, population size, selected-value rule, fallback level, selected record, and warnings.

**Automation:**

* **Selected Strategy:** Deterministic calendar calculation from a recognizable business, shift, seasonal, or usage pattern.
* **Automation Method:** Apply the supplied operating days, shifts, active weeks, holidays, and measured-hour overrides to a versioned local calendar calculation.
* **Difficulty:** Easy to Medium

**Validation:**
The DOE commercial reference-building schedule context was checked. Calendar arithmetic is deterministic when the operating pattern is complete, but a business label alone is not a validated annual-hours value and no category golden fixture exists.

**■ Standard 1.2 — Water-Heating Recirculation Controls Engineering Calculation**

**Purpose:**
Use U.S. Department of Energy - MEASUR to resolve avoided annual distribution heat; Avoided annual recirculation pump electricity from the listed category inputs.

**Source:**
U.S. Department of Energy - MEASUR

**MEASUR tool and downloads:**
[https://www.energy.gov/cmei/ito/measur](https://www.energy.gov/cmei/ito/measur)

**Calculator list and descriptions:**
[https://www.energy.gov/cmei/amo/measur-calculator-list-and-descriptions](https://www.energy.gov/cmei/amo/measur-calculator-list-and-descriptions)

**ORNL MEASUR source repository:**
[https://github.com/ORNL-AMO/AMO-Tools-Desktop](https://github.com/ORNL-AMO/AMO-Tools-Desktop)

**Lookup Inputs:**

* Existing annual distribution heat loss from an uploaded site study, controls trend, or engineering audit
* Proposed annual distribution heat loss from an uploaded site study, controls trend, or engineering audit
* Existing Water-Heater Nameplate or Test Information
* Pump Nameplate or Measured Input
* Annual operating hours from the connected schedule process

**Value Needed:**

* Avoided annual distribution heat
* Avoided annual recirculation pump electricity

**How to Use:**

1. Load the Water-Heating Recirculation Controls project facts from documented nameplates, measurements, controls trends, or contractor specifications and map their units to the MEASUR Pumping System Assessment Tool for pump electricity plus the displayed local thermal-loss calculation.
2. When an exact technical input is unavailable, use only a source-specific retained equipment or application population with documented filters, numeric rule, unit, scope, and version before running the Pumping System Assessment Tool for pump electricity plus the displayed local thermal-loss calculation; otherwise report the implementation limitation.
3. Run the pinned open-source Pumping System Assessment Tool for pump electricity plus the displayed local thermal-loss calculation baseline and proposed cases using the category formula boundary shown in this card.
4. Return one selected avoided annual distribution heat; Avoided annual recirculation pump electricity.
5. Retain the MEASUR version, Pumping System Assessment Tool for pump electricity plus the displayed local thermal-loss calculation input object, exact and benchmark input provenance, context filters, eligible populations, selection rules, unit conversions, warnings, and baseline and proposed outputs.

**Automation:**

* **Selected Strategy:** Pinned local execution of the MEASUR Pumping System Assessment Tool for pump electricity plus the displayed local thermal-loss calculation for Water-Heating Recirculation Controls.
* **Automation Method:** Map reviewed project evidence into the Pumping System Assessment Tool for pump electricity plus the displayed local thermal-loss calculation input schema, fill unresolved inputs through the single-value authoritative benchmark policy, execute the versioned local module, and preserve its warnings and native outputs.
* **Difficulty:** Medium to Hard

**Validation:**
The official MEASUR tool page, calculator descriptions, and open-source implementation were checked, so local automation is feasible. The exact category module, input and output mapping, and golden example have not yet been pinned, so this process must not imply executable validation.
