# Information Card — Boiler Controls and Burner Improvements

**Retrofits included:** Boiler controls / burner retrofit

**Overview:** Improved boiler controls and burner operation reduce fuel use by changing how the boiler responds to load and operating conditions.

**Broader Formula**

```text
Annual Operational Savings =
Annual Gas Reduction × Bill-Derived Gas Rate
```

**Expanded Formula**

```text
Annual Operational Savings = Annual Boiler Fuel Use × Control Resource-Reduction Fraction × Bill-Derived Gas Rate

Control Resource-Reduction Fraction = 1 - Proposed Annual Fuel / Baseline Annual Fuel
```

**Information Tree**

```text
Annual Operational Savings
├─ Annual fuel reduction
│  ├─ Annual boiler fuel
│  │  ├─ Annual Billed Resource Use
│  │  │  ├─ Annual Gas Use (Bill)
│  │  │  └─ Billing Period Coverage (Bill)
│  │  └─ Documented Boiler share of billed fuel from Submeter, Controls Trend, Audit, or Contractor Specification (Project Document)
│  ├─ Documented Existing control sequence from Nameplate, Measurement, Audit, or Contractor Specification (Project Document)
│  ├─ Documented Proposed control sequence from Nameplate, Measurement, Audit, or Contractor Specification (Project Document)
│  └─ Standard 1.1 — Boiler Controls and Burner Improvements Engineering Calculation
└─ Applicable Resource Rates
   └─ Bill-Derived Gas Rate
      ├─ Gas Use (Bill)
      ├─ Variable Delivery Charges (Bill)
      ├─ Variable Procurement Charges (Bill)
      └─ Avoidable Gas Rate (Derived)
```

**■ Standard 1.1 — Boiler Controls and Burner Improvements Engineering Calculation**

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

* Boiler share of billed fuel
* Existing control sequence
* Proposed control sequence

**Value Needed:**

* Existing and proposed annual resource use or avoided resource use, with calculator version, input units, and warnings

**How to Use:**

1. Load the Boiler Controls and Burner Improvements project facts from documented nameplates, measurements, controls trends, or contractor specifications and map their units to the MEASUR Steam System Assessment Tool boiler and operating-state model.
2. When an exact technical input is unavailable, use one context-matched value selected from the closest authoritative equipment or application population before running the Steam System Assessment Tool boiler and operating-state model; the simulator does not invent that input.
3. Run the pinned open-source Steam System Assessment Tool boiler and operating-state model baseline and proposed cases using the category formula boundary shown in this card.
4. Return one selected existing and proposed annual resource use or avoided resource use, with calculator version, input units, and warnings.
5. Retain the MEASUR version, Steam System Assessment Tool boiler and operating-state model input object, exact and benchmark input provenance, context filters, eligible populations, selection rules, unit conversions, warnings, and baseline and proposed outputs.

**Automation:**

* **Selected Strategy:** Pinned local execution of the MEASUR Steam System Assessment Tool boiler and operating-state model for Boiler Controls and Burner Improvements.
* **Automation Method:** Map reviewed project evidence into the Steam System Assessment Tool boiler and operating-state model input schema, fill unresolved inputs through the single-value authoritative benchmark policy, execute the versioned local module, and preserve its warnings and native outputs.
* **Difficulty:** Medium to Hard

**Validation:**
The official MEASUR tool page, calculator descriptions, and open-source implementation were checked, so local automation is feasible. The exact category module, input and output mapping, and golden example have not yet been pinned, so this process must not imply executable validation.
