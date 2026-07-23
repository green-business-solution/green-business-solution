# Information Card — Walk-In Cooler or Freezer Upgrade

**Retrofits included:** Walk-in cooler/freezer upgrade

**Overview:** A walk-in refrigeration upgrade reduces annual electricity for explicitly in-scope panels, doors, or refrigeration components with the same duty boundary.

**Broader Formula**

```text
Annual Operational Savings =
Annual Electricity Reduction × Bill-Derived Electricity Rate
```

**Expanded Formula**

```text
Annual Operational Savings = (Current Annual Refrigeration Electricity - Proposed Annual Refrigeration Electricity) × Bill-Derived Electricity Rate

Component Annual kWh = Panel Area × Panel kWh Per Ft2 Year for a class-matched panel row, or the class-matched annual kWh value for a door or refrigeration-system row.
```

**Information Tree**

```text
Annual Operational Savings
├─ Annual Walk-In Component Electricity Reduction
│  ├─ Walk-In Component Type and DOE Equipment Class (User)
│  ├─ Temperature Class and Indoor or Outdoor Configuration (User)
│  ├─ Panel Area, when a Panel Intensity Is Selected (Project Document)
│  ├─ Existing Efficiency Level (Project Document)
│  ├─ Proposed Efficiency Level (Linked Opportunity)
│  ├─ Exact Existing or Proposed Annual Component Energy (Project Document)
│  ├─ Existing and Proposed Duty-Equivalence Confirmation (User)
│  └─ Standard 1.1 — Walk-In Component Energy Benchmark
└─ Applicable Resource Rates
   └─ Bill-Derived Electricity Rate
      ├─ Electricity Use (Bill)
      ├─ Variable Delivery Charges (Bill)
      ├─ Variable Generation Charges (Bill)
      └─ Avoidable Electricity Rate (Derived)
```

**■ Standard 1.1 — Walk-In Component Energy Benchmark**

**Purpose:**
Resolve class-matched baseline and proposed annual energy for the exact walk-in panel, door, or refrigeration component boundary.

**Source:**
U.S. DOE, U.S. EPA, and National Laboratory of the Rockies benchmark sources

**DOE walk-in energy conservation standards NOPR:**
[https://www.energy.gov/sites/default/files/2023-08/Walk-In%20Coolers%20and%20Freezers%20ECS%20NOPR.pdf](https://www.energy.gov/sites/default/files/2023-08/Walk-In%20Coolers%20and%20Freezers%20ECS%20NOPR.pdf)

**Lookup Inputs:**

* Component type and DOE equipment class
* Walk-in temperature class
* Indoor or outdoor configuration
* Panel area when a panel intensity is selected
* Existing efficiency level from a Project Document
* Proposed efficiency level from the linked opportunity

**Value Needed:**

* One class-matched existing annual component energy
* One class-matched proposed annual component energy

**How to Use:**

1. Identify the component as panel, door, or refrigeration system and resolve its exact DOE equipment-class code.
2. Filter temperature class, indoor or outdoor placement, configuration, and baseline or proposed efficiency level before selecting a row.
3. For panels, multiply the selected kWh per square foot per year by matched panel area exactly once.
4. For doors and refrigeration systems, use the selected annual kWh value directly and do not multiply by operating hours.
5. Sum only explicitly in-scope components and retain table number, row code, efficiency level, native unit, source version, and all class filters.

**Automation:**

* **Selected Strategy:** Category-specific deterministic selection from an explicitly implemented and evidenced compatible source population or equation.
* **Automation Method:** Apply the category's documented source-version and compatibility filters, execute its exact numeric rule, and retain the selected output, unit, scope, fixture, and population or equation provenance. Report a limitation when that source-specific implementation is absent.
* **Difficulty:** Medium

**Validation:**
The retained DOE fixture records reviewed class rows and native units from Tables IV.31, IV.32, and IV.33. It proves a class-matched component benchmark, not whole-box project energy. The category remains blocked when the component boundary, class filters, panel area, or same-duty project scope is unavailable. No category calculation golden fixture is retained, so end-to-end execution proof remains pending.
