# Information Card — Waste Heat Recovery

**Retrofits included:** Waste heat recovery

**Overview:** Waste heat recovery captures otherwise discarded thermal energy to displace purchased heating resources, net of auxiliary electricity.

**Broader Formula**

```text
Annual Operational Savings =
Avoided Existing Resource Cost − Added New Resource Cost
```

**Expanded Formula**

```text
Annual Operational Savings = Avoided Displaced Resource × Displaced-Resource Rate - Added Auxiliary Electricity × Bill-Derived Electricity Rate

Useful Recovered Heat = Minimum of (Available Waste Heat × Recovery Efficiency, Coincident Useful-Heat Load)

Avoided Displaced Resource = Minimum of (Convert to Billed Resource Units (Useful Recovered Heat / Displaced-System Efficiency, Displaced-Resource Unit), Billed Displaced Resource Use)
```

**Information Tree**

```text
Annual Operational Savings
├─ Documented Waste-stream flow from Nameplate, Measurement, Audit, or Contractor Specification (Project Document)
├─ Documented Waste-stream temperature from Nameplate, Measurement, Audit, or Contractor Specification (Project Document)
├─ Waste-stream schedule (User)
├─ Documented Coincident Useful-Heat Load from Submeter, Controls Trend, Audit, or Contractor Specification (Project Document)
├─ Recovery-equipment efficiency (Linked Opportunity)
├─ Documented Displaced heating-system efficiency from Nameplate, Measurement, Audit, or Contractor Specification (Project Document)
├─ Recovery auxiliary power (Linked Opportunity)
├─ Annual Billed Resource Use
│  ├─ Annual Electricity Use (Bill)
│  ├─ Annual Gas Use (Bill)
│  └─ Billing Period Coverage (Bill)
├─ Standard 1.1 — Waste Heat Recovery Engineering Calculation
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
   └─ Current Fuel Price from Receipt, Contract, or Operating Record (Project Document)
```

**■ Standard 1.1 — Waste Heat Recovery Engineering Calculation**

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

* Waste-stream flow from a nameplate, measurement, audit, or contractor specification
* Waste-stream temperature from a nameplate, measurement, audit, or contractor specification
* Waste-stream schedule
* Coincident Useful-Heat Load
* Recovery-equipment efficiency from a nameplate, measurement, audit, or contractor specification
* Displaced heating-system efficiency from a nameplate, measurement, audit, or contractor specification
* Recovery auxiliary power

**Value Needed:**

* Existing and proposed annual resource use or avoided resource use, with calculator version, input units, and warnings

**How to Use:**

1. Load the Waste Heat Recovery project facts from documented nameplates, measurements, controls trends, or contractor specifications and map their units to the MEASUR Process Heating Assessment waste-heat calculation.
2. When an exact technical input is unavailable, use one context-matched value selected from the closest authoritative equipment or application population before running the Process Heating Assessment waste-heat calculation; the simulator does not invent that input.
3. Run the pinned open-source Process Heating Assessment waste-heat calculation baseline and proposed cases using the category formula boundary shown in this card.
4. Return one selected existing and proposed annual resource use or avoided resource use, with calculator version, input units, and warnings.
5. Retain the MEASUR version, Process Heating Assessment waste-heat calculation input object, exact and benchmark input provenance, context filters, eligible populations, selection rules, unit conversions, warnings, and baseline and proposed outputs.

**Automation:**

* **Selected Strategy:** Pinned local execution of the MEASUR Process Heating Assessment waste-heat calculation for Waste Heat Recovery.
* **Automation Method:** Map reviewed project evidence into the Process Heating Assessment waste-heat calculation input schema, fill unresolved inputs through the single-value authoritative benchmark policy, execute the versioned local module, and preserve its warnings and native outputs.
* **Difficulty:** Medium to Hard

**Validation:**
The official MEASUR tool page, calculator descriptions, and open-source implementation were checked, so local automation is feasible. The exact category module, input and output mapping, and golden example have not yet been pinned, so this process must not imply executable validation.
