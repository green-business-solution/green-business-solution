# Information Card — Industrial Process Electrification

**Retrofits included:** Industrial heat pump; Process electrification equipment

**Overview:** Industrial heat pumps and other thermal process electrification replace purchased fuel with electricity for the same useful process heat.

**Broader Formula**

```text
Annual Operational Savings =
Avoided Existing Resource Cost − Added New Resource Cost
```

**Expanded Formula**

```text
Annual Operational Savings = Current Fuel Input × Current Fuel Price - Proposed Electric Input × Bill-Derived Electricity Rate

Useful Process Heat = Convert to Common Energy Units (Current Fuel Input, Current Fuel Unit) × Current Process Efficiency

Proposed Electric Input = Convert to Billed Resource Units (Useful Process Heat / Proposed Coefficient of Performance or Efficiency, Electricity Unit)
```

**Information Tree**

```text
Annual Operational Savings
├─ Annual process resource switch
│  ├─ Annual Billed Resource Use
│  │  ├─ Annual Electricity Use (Bill)
│  │  ├─ Annual Gas Use (Bill)
│  │  └─ Billing Period Coverage (Bill)
│  ├─ Documented Process share of billed fuel from Submeter, Controls Trend, Audit, or Contractor Specification (Linked Opportunity)
│  ├─ Existing Process or Fuel Type (User)
│  ├─ Documented Required Process Temperature from Nameplate, Measurement, Audit, or Contractor Specification (Linked Opportunity)
│  ├─ Documented Useful Process Load from Submeter, Controls Trend, Audit, or Contractor Specification (Linked Opportunity)
│  ├─ Existing Process Nameplate or Test Information (User)
│  ├─ Proposed technology (Linked Opportunity)
│  ├─ Proposed COP or efficiency (Linked Opportunity)
│  └─ Standard 1.1 — Industrial Process Electrification Engineering Calculation
└─ Applicable Resource Rates
   ├─ Bill-Derived Electricity Rate
   │  ├─ Electricity Use (Bill)
   │  ├─ Variable Delivery Charges (Bill)
   │  ├─ Variable Generation Charges (Bill)
   │  └─ Avoidable Electricity Rate (Derived)
   ├─ Bill-Derived Gas Rate
   │  ├─ Gas Use (Bill)
   │  ├─ Variable Delivery Charges (Bill)
   │  ├─ Variable Procurement Charges (Bill)
   │  └─ Avoidable Gas Rate (Derived)
   └─ Documented Current Fuel Price (User)
```

**■ Standard 1.1 — Industrial Process Electrification Engineering Calculation**

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

* Process share of billed fuel
* Existing Process or Fuel Type
* Required Process Temperature from a nameplate, measurement, audit, or contractor specification
* Useful Process Load
* Existing Process Nameplate or Test Information
* Proposed technology
* Proposed COP or efficiency from a nameplate, measurement, audit, or contractor specification

**Value Needed:**

* Existing and proposed annual resource use or avoided resource use, with calculator version, input units, and warnings

**How to Use:**

1. Load the Industrial Process Electrification project facts from documented nameplates, measurements, controls trends, or contractor specifications and map their units to the MEASUR Process Heating Assessment.
2. Run the pinned open-source Process Heating Assessment baseline and proposed cases using the category formula boundary shown in this card.
3. Return no result when the Process Heating Assessment requires a flow, pressure, load profile, duty point, efficiency, or schedule that is absent from the project evidence.
4. Return existing and proposed annual resource use or avoided resource use, with calculator version, input units, and warnings.
5. Retain the MEASUR version, Process Heating Assessment input object, unit conversions, warnings, baseline and proposed outputs, and project-document provenance.

**Automation:**

* **Selected Strategy:** Pinned local execution of the MEASUR Process Heating Assessment for Industrial Process Electrification.
* **Automation Method:** Map reviewed project evidence into the Process Heating Assessment input schema, execute the versioned local module, and preserve its warnings and native outputs without supplying missing design inputs.
* **Difficulty:** Medium to Hard

**Validation:**
The official MEASUR tool page, calculator descriptions, and open-source implementation were checked, so local automation is feasible. The exact category module, input and output mapping, and golden example have not yet been pinned, so this process must not imply executable validation.
