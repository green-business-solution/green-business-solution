# Information Card — Biomass or Biogas Energy System

**Retrofits included:** Biomass / biogas energy system

**Overview:** A biomass or biogas system converts an available fuel into electricity and useful heat that can displace purchased site resources.

**Broader Formula**

```text
Annual Operational Savings =
Avoided Existing Resource Cost − Added New Resource Cost
```

**Expanded Formula**

```text
Annual Operational Savings = Avoided Grid Electricity × Bill-Derived Electricity Rate + Avoided Boiler Fuel × Current Fuel Price - Biomass or Biogas Input × Input-Fuel Price

Biomass or Biogas Input = Minimum of (Annual Available Fuel, Scheduled Input Fuel)

Annual Onsite Generation = Biomass or Biogas Input × Fuel Lower Heating Value × Electric Efficiency

Useful Recovered Heat = Minimum of (Biomass or Biogas Input × Fuel Lower Heating Value × Recoverable Heat Fraction, Coincident Thermal Load)

Avoided Boiler Fuel = Convert to Billed Resource Units (Useful Recovered Heat / Existing Boiler Efficiency, Boiler Fuel Unit)

Avoided Grid Electricity = Minimum of (Annual Onsite Generation, Coincident Onsite Electric Load)
```

**Information Tree**

```text
Annual Operational Savings
├─ Confirmed annual fuel availability, if known (User)
├─ Fuel unit (User)
├─ Documented Fuel lower heating value, if known from Nameplate, Measurement, Audit, or Contractor Specification (Linked Opportunity)
├─ Conversion technology (Linked Opportunity)
├─ Selected Unit Model, if known (Linked Opportunity)
├─ Installed capacity (Linked Opportunity)
├─ Opportunity Equipment or Performance Requirements (Linked Opportunity)
├─ Operating schedule (User)
├─ Documented Coincident onsite electric-load constraint, if known from Nameplate, Measurement, Audit, or Contractor Specification (Linked Opportunity)
├─ Documented Coincident useful thermal-load constraint from Nameplate, Measurement, Audit, or Contractor Specification (Linked Opportunity)
├─ Existing Boiler Nameplate or Combustion-Test Information, if known (User)
├─ Scheduled input fuel (Derived)
├─ Standard 1.1 — Biomass or Biogas Energy System Performance Balance
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

**■ Standard 1.1 — Biomass or Biogas Energy System Performance Balance**

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

* Confirmed annual fuel availability, if known
* Fuel unit
* Fuel lower heating value, if known from a nameplate, measurement, audit, or contractor specification
* Conversion technology
* Selected Unit Model, if known
* Installed capacity
* Coincident onsite electric-load constraint, if known
* Coincident useful thermal-load constraint
* Existing Boiler Nameplate or Combustion-Test Information, if known

**Value Needed:**

* Annual electricity generation, input fuel, and useful recovered heat for the selected technology and capacity

**How to Use:**

1. Map the Biomass or Biogas Energy System inputs to the documented Biomass or Biogas Energy System Performance Balance source fields or model inputs: Confirmed annual fuel availability, if known; Fuel unit; Fuel lower heating value, if known from a nameplate, measurement, audit, or contractor specification; Conversion technology; Selected Unit Model, if known; Installed capacity; Coincident onsite electric-load constraint, if known; Coincident useful thermal-load constraint; Existing Boiler Nameplate or Combustion-Test Information, if known.
2. Select the compatible technology and capacity row, apply the explicit operating and coincidence constraints, calculate electricity, fuel, and useful heat, and cap outputs at site loads.
3. Reject the Biomass or Biogas Energy System path when a required source field, project design input, compatible record, or native unit is absent; do not insert a cross-category default.
4. Return annual electricity generation, input fuel, and useful recovered heat for the selected technology and capacity.
5. Retain the Biomass or Biogas Energy System Performance Balance source version, exact fields or model inputs, native units, selected records, warnings, and category-specific rejection reason.

**Automation:**

* **Selected Strategy:** Versioned technology-class lookup followed by a transparent heat-and-power energy balance.
* **Automation Method:** Select the compatible technology and capacity row, apply the explicit operating and coincidence constraints, calculate electricity, fuel, and useful heat, and cap outputs at site loads.
* **Difficulty:** Medium to Hard

**Validation:**
The official technology pages, efficiency method, and calculator download were checked. The category adapter and retained source fixture are still absent, and the source does not identify an exact unit or supply site capacity, schedule, or thermal coincidence.
