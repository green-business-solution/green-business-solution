# Information Card — Refrigeration Controls and Heat-Loss Reduction

**Retrofits included:** Refrigeration controls retrofit; Anti-sweat heater controls; Door gasket / strip curtain / night cover retrofit

**Overview:** Refrigeration controls, anti-sweat heater controls, gaskets, curtains, and night covers reduce the affected refrigeration load.

**Broader Formula**

```text
Annual Operational Savings =
Annual Electricity Reduction × Bill-Derived Electricity Rate
```

**Expanded Formula**

```text
Annual Operational Savings = Affected Annual Refrigeration Electricity × Resource-Reduction Fraction × Bill-Derived Electricity Rate

Resource-Reduction Fraction = 1 - Proposed Annual Electricity / Baseline Annual Electricity
```

**Information Tree**

```text
Annual Operational Savings
├─ Annual refrigeration electricity reduction
│  ├─ Affected refrigeration annual kWh
│  │  ├─ Annual Billed Resource Use
│  │  │  ├─ Annual Electricity Use (Bill)
│  │  │  └─ Billing Period Coverage (Bill)
│  │  └─ Documented Affected-load share, if known from Submeter, Controls Trend, Audit, or Contractor Specification (Linked Opportunity)
│  ├─ Opportunity Equipment or Performance Requirements (Linked Opportunity)
│  ├─ Building Type (Profile)
│  ├─ Site Climate Zone (Profile)
│  ├─ Existing building vintage class (User)
│  ├─ Existing condition or control (User)
│  ├─ Proposed scope or sequence (Linked Opportunity)
│  └─ Standard 1.1 — Building Measure Performance Screen
└─ Applicable Resource Rates
   └─ Bill-Derived Electricity Rate
      ├─ Electricity Use (Bill)
      ├─ Variable Delivery Charges (Bill)
      ├─ Variable Generation Charges (Bill)
      └─ Avoidable Electricity Rate (Derived)
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

* Affected-load share, if known
* Existing building vintage class
* Existing condition or control
* Proposed scope or sequence
* Building Type
* Site Climate Zone

**Value Needed:**

* Documented resource-reduction factor for the approved measure and market segment, with source version and units

**How to Use:**

1. Map the Refrigeration Controls and Heat-Loss Reduction inputs to the documented Building Measure Performance Screen source fields or model inputs: Affected-load share, if known; Existing building vintage class; Existing condition or control; Proposed scope or sequence; Building Type; Site Climate Zone.
2. Load the pinned Scout definitions, apply the reviewed retrofit crosswalk and segment filters, and return the documented resource-reduction factor.
3. Reject the Refrigeration Controls and Heat-Loss Reduction path when a required source field, project design input, compatible record, or native unit is absent; do not insert a cross-category default.
4. Return documented resource-reduction factor for the approved measure and market segment, with source version and units.
5. Retain the Building Measure Performance Screen source version, exact fields or model inputs, native units, selected records, warnings, and category-specific rejection reason.

**Automation:**

* **Selected Strategy:** Versioned local lookup of an explicitly approved Scout measure and market segment.
* **Automation Method:** Load the pinned Scout definitions, apply the reviewed retrofit crosswalk and segment filters, and return the documented resource-reduction factor.
* **Difficulty:** Medium

**Validation:**
The official Scout program, summaries, and source repository were checked. The exact category crosswalk and performance-field fixtures remain unverified, so keyword matching and generic reduction defaults are not supported.
