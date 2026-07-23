# Information Card — Solar Water Heating

**Retrofits included:** Solar water heating system

**Overview:** A solar water-heating system supplies useful thermal energy that displaces electricity, gas, or liquid fuel otherwise used by the backup water heater.

**Broader Formula**

```text
Annual Operational Savings =
Annual Backup-Resource Reduction × Applicable Backup-Resource Rate
```

**Expanded Formula**

```text
Annual Operational Savings = Avoided Backup Resource × Backup-Resource Rate

Useful Solar Thermal Output = Minimum of (Simulated Solar Thermal Output, Annual Delivered Hot-Water Load)

Avoided Backup Resource = Convert to Billed Resource Units (Useful Solar Thermal Output / Backup-System Efficiency, Backup-Resource Unit)
```

**Information Tree**

```text
Annual Operational Savings
├─ Annual Backup-Resource Reduction
│  ├─ Site Location (Profile)
│  ├─ Collector and Storage Design
│  │  ├─ Collector and Storage Requirements Prescribed by the Opportunity (Linked Opportunity)
│  │  ├─ Collector and Storage Design from Contractor Specification, Engineering Assessment, or Proposed Construction Document (Project Document)
│  │  └─ Standard 1.1 — Solar Water-Heating Input Benchmark
│  ├─ Annual Hot-Water Load
│  │  ├─ Hot-Water Load from Audit, Measurement, Engineering Assessment, or Operating Record (Project Document)
│  │  ├─ Business Activity and Building Type (Profile)
│  │  └─ Standard 1.1 — Solar Water-Heating Input Benchmark
│  ├─ Backup Water-Heating System
│  │  ├─ Backup Fuel Type (User)
│  │  ├─ Backup Equipment Nameplate, Commissioning Record, or Engineering Assessment (Project Document)
│  │  └─ Standard 1.1 — Solar Water-Heating Input Benchmark
│  └─ Standard 1.2 — Solar Thermal Production Simulation
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

**■ Standard 1.1 — Solar Water-Heating Input Benchmark**

**Purpose:**
Select one screening collector, hot-water-load, and backup-system input set when exact project documents are incomplete.

**Source:**
U.S. DOE, U.S. EPA, and National Laboratory of the Rockies benchmark sources

**Commercial Reference Buildings:**
[https://www.energy.gov/cmei/buildings/commercial-reference-buildings](https://www.energy.gov/cmei/buildings/commercial-reference-buildings)

**Lookup Inputs:**

* Business activity and building type
* Building area and operating schedule
* Bill water-heating resource use
* Collector requirements from the linked opportunity
* Available collector, load, and backup-system Project Documents

**Value Needed:**

* One context-matched collector and storage configuration
* One annual hot-water load
* One backup-system efficiency

**How to Use:**

1. Map the Solar Water Heating inputs to the documented Solar Water-Heating Input Benchmark source fields or model inputs: Business activity and building type; Building area and operating schedule; Bill water-heating resource use; Collector requirements from the linked opportunity; Available collector, load, and backup-system Project Documents.
2. Apply the category's reviewed context fields and source-version filters, use an official recommended or typical value when available, otherwise use a valid weighted median or ordinary median, and retain the selected value plus population provenance.
3. When an exact value is unavailable, select one context-matched authoritative benchmark and then one deterministic RetroFi benchmark if needed; do not insert an unexplained cross-category default.
4. Return one selected context-matched collector and storage configuration; One annual hot-water load; One backup-system efficiency.
5. Retain the Solar Water-Heating Input Benchmark source version, exact fields or model inputs, native units, eligible population, population size, selected-value rule, fallback level, selected record, and warnings.

**Automation:**

* **Selected Strategy:** Category-specific deterministic selection from the closest authoritative compatible population.
* **Automation Method:** Apply the category's reviewed context fields and source-version filters, use an official recommended or typical value when available, otherwise use a valid weighted median or ordinary median, and retain the selected value plus population provenance.
* **Difficulty:** Medium

**Validation:**
The DOE reference-building source supports context matching, while SAM supplies the simulation method only after inputs are selected. A retained category benchmark fixture is not yet present, so the selection adapter remains implementation-pending and must not be attributed to SAM.

**■ Standard 1.2 — Solar Thermal Production Simulation**

**Purpose:**
Use National Laboratory of the Rockies - System Advisor Model to resolve annual useful solar thermal output and displaced backup resource, with simulation inputs, units, and source version from the listed category inputs.

**Source:**
National Laboratory of the Rockies - System Advisor Model

**System Advisor Model:**
[https://sam.nlr.gov/](https://sam.nlr.gov/)

**SAM open-source repository:**
[https://github.com/NatLabRockies/SAM](https://github.com/NatLabRockies/SAM)

**Lookup Inputs:**

* Site location
* Collector and storage design from the linked opportunity or a Project Document
* Annual hot-water load from a Project Document or the connected context benchmark
* Backup fuel type
* Backup-system efficiency from a Project Document or the connected context benchmark

**Value Needed:**

* Annual useful solar thermal output and displaced backup resource, with simulation inputs, units, and source version

**How to Use:**

1. Resolve the collector and storage design from the linked opportunity when it prescribes the system, or from a contractor specification, proposed construction document, or engineering assessment.
2. Resolve annual hot-water load from an audit, measurement, operating record, or the connected context benchmark.
3. Resolve backup fuel and efficiency from the existing equipment nameplate, commissioning record, or the connected context benchmark.
4. Run the pinned SAM solar-water-heating module to calculate useful thermal production and displaced backup-resource quantity.
5. Apply the Bill-derived utility rate or documented non-utility fuel price only after SAM returns the displaced physical resource quantity, and retain all inputs, versions, and warnings.

**Automation:**

* **Selected Strategy:** Versioned local SAM simulation using explicit system, weather, load, and backup inputs.
* **Automation Method:** Validate the project configuration, select the site weather data, run the solar water-heating model, cap useful output at the delivered load, and convert displaced backup energy to its billed unit.
* **Difficulty:** Hard

**Validation:**
The official SAM tool and open-source repository were checked, and local simulation is possible. No retained category fixture or golden calculation exists, and SAM does not supply missing collector design, hot-water load, or backup-system inputs.
