# Information Card — Combined Heat and Power

**Retrofits included:** Combined heat and power system

**Overview:** Combined heat and power produces onsite electricity and useful heat from fuel, displacing grid electricity and boiler fuel when both outputs coincide with site demand.

**Broader Formula**

```text
Annual Operational Savings =
Avoided Existing Resource Cost − Added New Resource Cost
```

**Expanded Formula**

```text
Annual Operational Savings = Avoided Grid Electricity × Bill-Derived Electricity Rate + Avoided Boiler Fuel × Current Fuel Price - CHP Input Fuel × CHP Fuel Price

Useful Recovered Heat = Minimum of (Annual Onsite Generation × Recoverable Heat Ratio, Coincident Thermal Load)

Avoided Boiler Fuel = Convert to Billed Resource Units (Useful Recovered Heat / Existing Boiler Efficiency, Boiler Fuel Unit)

Annual Onsite Generation = Installed Capacity × 8760 × Annual Capacity Factor

CHP Input Fuel = Convert to Billed Resource Units (Annual Onsite Generation / Electric Efficiency, CHP Fuel Unit)

Avoided Grid Electricity = Minimum of (Annual Onsite Generation, Coincident Onsite Electric Load)
```

**Information Tree**

```text
Annual Operational Savings
├─ Prime mover (Linked Opportunity)
├─ Input fuel (Linked Opportunity)
├─ Selected Unit Model, if known (Linked Opportunity)
├─ Total installed capacity (Linked Opportunity)
├─ Opportunity Equipment or Performance Requirements (Linked Opportunity)
├─ Annual capacity factor (Linked Opportunity)
├─ Documented Coincident onsite electric-load constraint, if known from Nameplate, Measurement, Audit, or Contractor Specification (Linked Opportunity)
├─ Documented Coincident useful thermal-load constraint from Nameplate, Measurement, Audit, or Contractor Specification (Linked Opportunity)
├─ Existing Boiler Nameplate or Combustion-Test Information, if known (User)
├─ Standard 1.1 — Combined Heat and Power Performance Balance
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

**■ Standard 1.1 — Combined Heat and Power Performance Balance**

**Purpose:**
Use U.S. Environmental Protection Agency - CHP technologies and calculator to resolve annual electricity generation, input fuel, and useful recovered heat for the selected technology and capacity from the listed category inputs.

**Source:**
U.S. Environmental Protection Agency - CHP technologies and calculator

**CHP technologies and current catalog links:**
[https://www.epa.gov/chp/chp-technologies](https://www.epa.gov/chp/chp-technologies)

**CHP efficiency method and resources:**
[https://www.epa.gov/chp/chp-resources](https://www.epa.gov/chp/chp-resources)

**Current CHP calculator download:**
[https://www.epa.gov/chp/download-chp-energy-and-emissions-savings-calculator](https://www.epa.gov/chp/download-chp-energy-and-emissions-savings-calculator)

**Lookup Inputs:**

* Prime mover
* Input fuel
* Selected Unit Model, if known
* Total installed capacity
* Annual capacity factor
* Coincident onsite electric-load constraint, if known
* Coincident useful thermal-load constraint
* Existing Boiler Nameplate or Combustion-Test Information, if known

**Value Needed:**

* Annual electricity generation, input fuel, and useful recovered heat for the selected technology and capacity

**How to Use:**

1. Map the Combined Heat and Power inputs to the documented Combined Heat and Power Performance Balance source fields or model inputs: Prime mover; Input fuel; Selected Unit Model, if known; Total installed capacity; Annual capacity factor; Coincident onsite electric-load constraint, if known; Coincident useful thermal-load constraint; Existing Boiler Nameplate or Combustion-Test Information, if known.
2. Select the compatible technology and capacity row, apply the explicit operating and coincidence constraints, calculate electricity, fuel, and useful heat, and cap outputs at site loads.
3. Reject the Combined Heat and Power path when a required source field, project design input, compatible record, or native unit is absent; do not insert a cross-category default.
4. Return annual electricity generation, input fuel, and useful recovered heat for the selected technology and capacity.
5. Retain the Combined Heat and Power Performance Balance source version, exact fields or model inputs, native units, selected records, warnings, and category-specific rejection reason.

**Automation:**

* **Selected Strategy:** Versioned technology-class lookup followed by a transparent heat-and-power energy balance.
* **Automation Method:** Select the compatible technology and capacity row, apply the explicit operating and coincidence constraints, calculate electricity, fuel, and useful heat, and cap outputs at site loads.
* **Difficulty:** Medium to Hard

**Validation:**
The official technology pages, efficiency method, and calculator download were checked. The category adapter and retained source fixture are still absent, and the source does not identify an exact unit or supply site capacity, schedule, or thermal coincidence.
