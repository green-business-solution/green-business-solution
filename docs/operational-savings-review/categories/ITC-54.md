# Information Card — Backup Power Routine Resource Use

**Retrofits included:** Resilience / backup power system

**Overview:** Backup power equipment can add routine testing fuel and standby electricity even when outage operation and resilience value are excluded.

**Broader Formula**

```text
Annual Operational Impact =
− Routine Fuel and Electricity Cost
```

**Expanded Formula**

```text
Annual Operational Impact = -(Annual Test Fuel × Current Fuel Price + Annual Standby Electricity × Bill-Derived Electricity Rate)

Annual Test Fuel = In-Scope Equipment Count × Test Fuel Use per Hour × Annual Test Hours per Unit

Annual Standby Electricity = In-Scope Equipment Count × Standby Power per Unit × Annual Energized Hours per Unit
```

**Information Tree**

```text
Annual Routine Backup-Power Resource Cost
├─ In-Scope Equipment Count (User)
├─ Backup Technology and Fuel Type (User)
├─ Routine Test Fuel
│  ├─ Test Fuel Use from Product Label, Manufacturer Document, or Commissioning Record (Project Document)
│  ├─ Scheduled Test Hours from Maintenance Plan or Contractor Specification (Project Document)
│  └─ Standard 1.1 — Backup-Power Routine-Use Benchmark
├─ Standby Electricity
│  ├─ Standby Input from Product Label, Manufacturer Document, or Commissioning Record (Project Document)
│  ├─ Energized Hours from Controls Schedule or Commissioning Record (Project Document)
│  └─ Standard 1.1 — Backup-Power Routine-Use Benchmark
├─ One Selected Routine-Use Estimate (Derived)
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

**■ Standard 1.1 — Backup-Power Routine-Use Benchmark**

**Purpose:**
Select one conservative routine test-fuel and standby-electricity value when maintenance and commissioning documents are unavailable.

**Source:**
U.S. DOE, U.S. EPA, and National Laboratory of the Rockies benchmark sources

**Federal emergency-generator operations guidance:**
[https://www.energy.gov/cmei/femp/equipment-operations-and-maintenance-summaries](https://www.energy.gov/cmei/femp/equipment-operations-and-maintenance-summaries)

**Lookup Inputs:**

* Backup technology and fuel type
* Equipment capacity class
* Applicable maintenance or testing regime
* Operating environment

**Value Needed:**

* One annual routine-test fuel value
* One annual standby-electricity value

**How to Use:**

1. Map the Backup Power Routine Resource Use inputs to the documented Backup-Power Routine-Use Benchmark source fields or model inputs: Backup technology and fuel type; Equipment capacity class; Applicable maintenance or testing regime; Operating environment.
2. Apply the category's reviewed context fields and source-version filters, use an official recommended or typical value when available, otherwise use a valid weighted median or ordinary median, and retain the selected value plus population provenance.
3. When an exact value is unavailable, select one context-matched authoritative benchmark and then one deterministic RetroFi benchmark if needed; do not insert an unexplained cross-category default.
4. Return one selected annual routine-test fuel value; One annual standby-electricity value.
5. Retain the Backup-Power Routine-Use Benchmark source version, exact fields or model inputs, native units, eligible population, population size, selected-value rule, fallback level, selected record, and warnings.

**Automation:**

* **Selected Strategy:** Category-specific deterministic selection from the closest authoritative compatible population.
* **Automation Method:** Apply the category's reviewed context fields and source-version filters, use an official recommended or typical value when available, otherwise use a valid weighted median or ordinary median, and retain the selected value plus population provenance.
* **Difficulty:** Medium

**Validation:**
Federal emergency-generator operations guidance can establish maintenance and testing context, but a retained technology-and-capacity performance population is not yet present. The benchmark selection is therefore implementation-pending and must not be presented as a manufacturer-specific value.
