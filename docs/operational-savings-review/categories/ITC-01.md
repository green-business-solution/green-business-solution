# Information Card — Commercial Building Upgrade Resource Savings

**Retrofits included:** LED lighting retrofit; Lighting controls retrofit; High-efficiency HVAC replacement; Heat pump HVAC retrofit; Smart thermostat / zoning retrofit; HVAC controls retrofit; Energy recovery ventilation retrofit; High-efficiency boiler retrofit; Ground-source / geothermal heat pump; Insulation upgrade; Window replacement; Window film / shading retrofit; Demand-controlled ventilation

**Overview:** These building envelope, lighting, heating, cooling, and ventilation upgrades reduce annual electricity or fuel use compared with a matched commercial-building baseline.

**Broader Formula**

```text
Annual Operational Savings =
Annual Resource Reduction × Applicable Bill-Derived Resource Rate
```

**Expanded Formula**

```text
Annual Operational Savings = Sum Across Resources of (Bill-Capped Annual Resource Reduction × Bill-Derived Resource Rate)

Annual Resource Reduction by Resource = Building Area × Median ComStock Resource Change per Square Foot

Bill-Capped Annual Resource Reduction = Minimum of (Annual Resource Reduction by Resource, Annual Billed Resource Use) when Annual Resource Reduction by Resource ≥ 0; otherwise Bill-Capped Annual Resource Reduction = Annual Resource Reduction by Resource.
```

**Information Tree**

```text
Annual Operational Savings
├─ Annual resource delta by resource
│  ├─ Opportunity Equipment or Performance Requirements (Linked Opportunity)
│  ├─ Existing Building Condition (User)
│  ├─ Proposed Upgrade Option (Linked Opportunity)
│  ├─ Building Type (Profile)
│  ├─ Site State or County (Profile)
│  ├─ Building Area, approximate unless subsequently verified (Profile)
│  └─ Standard 1.1 — Commercial Building Upgrade Resource Model
├─ Annual Billed Resource Use
│  ├─ Annual Electricity Use (Bill)
│  ├─ Annual Gas Use (Bill)
│  └─ Billing Period Coverage (Bill)
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

**■ Standard 1.1 — Commercial Building Upgrade Resource Model**

**Purpose:**
Use National Laboratory of the Rockies - ComStock 2025 Release 3 to resolve annual electricity and fuel-use change per square foot for the approved measure and building segment, with source version and units from the listed category inputs.

**Source:**
National Laboratory of the Rockies - ComStock 2025 Release 3

**ComStock 2025 Release 3 data:**
[https://natlabrockies.github.io/ComStock.github.io/docs/data.html](https://natlabrockies.github.io/ComStock.github.io/docs/data.html)

**Upgrade-measure crosswalk and documentation:**
[https://natlabrockies.github.io/ComStock.github.io/docs/upgrade_measures/upgrade_measures.html](https://natlabrockies.github.io/ComStock.github.io/docs/upgrade_measures/upgrade_measures.html)

**2025 Release 3 reference documentation:**
[https://natlabrockies.github.io/ComStock.github.io/assets/files/comstock_reference_documentation_2025_3.pdf](https://natlabrockies.github.io/ComStock.github.io/assets/files/comstock_reference_documentation_2025_3.pdf)

**Lookup Inputs:**

* Existing Building Condition
* Proposed Upgrade Option
* Building Type
* Site State or County
* Building Area, approximate unless subsequently verified

**Value Needed:**

* Annual electricity and fuel-use change per square foot for the approved measure and building segment, with source version and units

**How to Use:**

1. Map the Commercial Building Upgrade Resource Savings inputs to the documented Commercial Building Upgrade Resource Model source fields or model inputs: Existing Building Condition; Proposed Upgrade Option; Building Type; Site State or County; Building Area, approximate unless subsequently verified.
2. Download the documented ComStock release, apply the reviewed building and measure filters, and calculate the eligible weighted resource delta locally.
3. When an exact value is unavailable, select one context-matched authoritative benchmark and then one deterministic RetroFi benchmark if needed; do not insert an unexplained cross-category default.
4. Return one selected annual electricity and fuel-use change per square foot for the approved measure and building segment, with source version and units.
5. Retain the Commercial Building Upgrade Resource Model source version, exact fields or model inputs, native units, eligible population, population size, selected-value rule, fallback level, selected record, and warnings.

**Automation:**

* **Selected Strategy:** Versioned local dataset lookup with an approved retrofit-to-measure crosswalk.
* **Automation Method:** Download the documented ComStock release, apply the reviewed building and measure filters, and calculate the eligible weighted resource delta locally.
* **Difficulty:** Medium to Hard

**Validation:**
The official release pages, upgrade documentation, and reference method were checked. A retained aggregate fixture and reviewed category crosswalk do not yet exist, so this process cannot currently return a project estimate or claim project-specific equipment performance.
