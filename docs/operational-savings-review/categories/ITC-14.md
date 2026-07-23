# Information Card — Building Envelope and Control Upgrade Screening

**Retrofits included:** Air sealing / weatherization; Exterior door replacement; Cool roof / reflective roof coating; Building automation system; Energy management system

**Overview:** These envelope, roof, door, automation, and energy-management measures reduce modeled building electricity or fuel use when an exact supported measure and building segment are available.

**Broader Formula**

```text
Annual Operational Savings =
Annual Resource Reduction × Applicable Bill-Derived Resource Rate
```

**Expanded Formula**

```text
Annual Operational Savings = Sum Across Resources of (Annual Billed Resource Use × Scout Resource-Reduction Fraction × Bill-Derived Resource Rate)
```

**Information Tree**

```text
Annual Operational Savings
├─ Annual direct resource reduction by end use and fuel
│  ├─ Annual Billed Resource Use
│  │  ├─ Annual Electricity Use (Bill)
│  │  ├─ Annual Gas Use (Bill)
│  │  └─ Billing Period Coverage (Bill)
│  ├─ Opportunity Equipment or Performance Requirements (Linked Opportunity)
│  ├─ Existing Building Condition (User)
│  ├─ Proposed Upgrade Option (Linked Opportunity)
│  ├─ Building Type (Profile)
│  ├─ Site Climate Zone (Profile)
│  ├─ Existing building vintage class (User)
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

* Existing Building Condition
* Proposed Upgrade Option
* Existing building vintage class
* Building Type
* Site Climate Zone

**Value Needed:**

* Documented resource-reduction factor for the approved measure and market segment, with source version and units

**Input Bindings:**

* Existing Building Condition ← User at `Annual Operational Savings > Annual direct resource reduction by end use and fuel > Existing Building Condition`. Pass the exact bound Existing Building Condition to Building Measure Performance Screen when computing Documented resource-reduction factor for the approved measure and market segment, with source version and units; do not substitute a value from another tree path.
* Proposed Upgrade Option ← Linked Opportunity at `Annual Operational Savings > Annual direct resource reduction by end use and fuel > Proposed Upgrade Option`. Pass the exact bound Proposed Upgrade Option to Building Measure Performance Screen when computing Documented resource-reduction factor for the approved measure and market segment, with source version and units; do not substitute a value from another tree path.
* Existing building vintage class ← User at `Annual Operational Savings > Annual direct resource reduction by end use and fuel > Existing building vintage class`. Pass the exact bound Existing building vintage class to Building Measure Performance Screen when computing Documented resource-reduction factor for the approved measure and market segment, with source version and units; do not substitute a value from another tree path.
* Building Type ← Profile at `Annual Operational Savings > Annual direct resource reduction by end use and fuel > Building Type`. Pass the exact bound Building Type to Building Measure Performance Screen when computing Documented resource-reduction factor for the approved measure and market segment, with source version and units; do not substitute a value from another tree path.
* Site Climate Zone ← Profile at `Annual Operational Savings > Annual direct resource reduction by end use and fuel > Site Climate Zone`. Pass the exact bound Site Climate Zone to Building Measure Performance Screen when computing Documented resource-reduction factor for the approved measure and market segment, with source version and units; do not substitute a value from another tree path.

**Output Bindings:**

* Documented resource-reduction factor for the approved measure and market segment, with source version and units → `Scout_reduction_fraction_r` (fraction; PROJECT_TOTAL) at `Annual Operational Savings > Annual direct resource reduction by end use and fuel > Standard 1.1 - Building Measure Performance Screen`.

**How to Use:**

1. Map the Building Envelope and Control Upgrade Screening inputs to the documented Building Measure Performance Screen source fields or model inputs: Existing Building Condition; Proposed Upgrade Option; Existing building vintage class; Building Type; Site Climate Zone.
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
