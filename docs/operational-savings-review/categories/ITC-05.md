# Information Card — Duct Sealing and Insulation

**Retrofits included:** Duct sealing and duct insulation

**Overview:** Duct sealing and insulation reduce heating and cooling losses between the HVAC equipment and the occupied space.

**Broader Formula**

```text
Annual Operational Savings =
Annual Resource Reduction × Applicable Bill-Derived Resource Rate
```

**Expanded Formula**

```text
Annual Operational Savings = Sum Across Resources of (Annual HVAC Resource Use × Duct-Loss Reduction Fraction × Bill-Derived Resource Rate)

Duct-Loss Reduction Fraction = Existing Duct-Loss Fraction - Proposed Duct-Loss Fraction
```

**Information Tree**

```text
Annual Operational Savings
├─ Annual HVAC resource reduction
│  ├─ Annual HVAC resource by end use and fuel
│  │  ├─ Annual Billed Resource Use
│  │  │  ├─ Annual Electricity Use (Bill)
│  │  │  ├─ Annual Gas Use (Bill)
│  │  │  └─ Billing Period Coverage (Bill)
│  │  └─ Documented HVAC share of billed resource, if known from Submeter, Controls Trend, Audit, or Contractor Specification (Project Document)
│  ├─ Opportunity Equipment or Performance Requirements (Linked Opportunity)
│  ├─ Building Type (Profile)
│  ├─ Site Climate Zone (Profile)
│  ├─ Existing building vintage class (User)
│  ├─ Existing duct location and condition (User)
│  ├─ Proposed sealing and insulation scope (Linked Opportunity)
│  └─ Standard 1.1 — Building Measure Performance Screen
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

**■ Standard 1.1 — Building Measure Performance Screen**

**Purpose:**
Use U.S. Department of Energy - Scout to resolve documented resource-reduction factor for the approved measure and market segment, with source version and units from the listed category inputs.

**Source:**
U.S. Department of Energy - Scout

**Scout program description:**
[https://www.energy.gov/cmei/buildings/scout](https://www.energy.gov/cmei/buildings/scout)

**Scout ECM summaries:**
[https://scout.energy.gov/](https://scout.energy.gov/)

**Scout source repository:**
[https://github.com/scout-bto/scout](https://github.com/scout-bto/scout)

**Lookup Inputs:**

* HVAC share of billed resource, if known
* Existing building vintage class
* Existing duct location and condition
* Proposed sealing and insulation scope
* Building Type
* Site Climate Zone

**Value Needed:**

* Documented resource-reduction factor for the approved measure and market segment, with source version and units

**How to Use:**

1. Map the Duct Sealing and Insulation inputs to the documented Building Measure Performance Screen source fields or model inputs: HVAC share of billed resource, if known; Existing building vintage class; Existing duct location and condition; Proposed sealing and insulation scope; Building Type; Site Climate Zone.
2. Load the pinned Scout definitions, apply the reviewed retrofit crosswalk and segment filters, and return the documented resource-reduction factor.
3. When an exact value is unavailable, use only a source-specific retained population or equation with documented filters, numeric rule, unit, scope, and version; otherwise report the implementation limitation.
4. Return one selected documented resource-reduction factor for the approved measure and market segment, with source version and units.
5. Retain the Building Measure Performance Screen source version, exact fields or model inputs, native units, eligible population, population size, selected-value rule, fallback level, selected record, and warnings.

**Automation:**

* **Selected Strategy:** Versioned local lookup of an explicitly approved Scout measure and market segment.
* **Automation Method:** Load the pinned Scout definitions, apply the reviewed retrofit crosswalk and segment filters, and return the documented resource-reduction factor.
* **Difficulty:** Medium

**Validation:**
The official Scout program, summaries, and source repository were checked. The exact category crosswalk and performance-field fixtures remain unverified, so keyword matching and generic reduction defaults are not supported.
