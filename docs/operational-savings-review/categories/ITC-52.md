# Information Card — High-Efficiency Commercial Dishwasher

**Retrofits included:** High-efficiency commercial dishwasher

**Overview:** An efficient commercial dishwasher reduces water, water-heating input, and idle electricity for the same certified washing activity.

**Broader Formula**

```text
Annual Operational Savings =
Annual Resource Reduction × Applicable Bill-Derived Resource Rate
```

**Expanded Formula**

```text
For rack machines:

Annual Operational Savings = Avoided Water Rack × Bill-Derived Water and Sewer Rate + Avoided Active kWh Rack × Bill-Derived Electricity Rate + Sum Across Resources of (Avoided Rack-Machine Water-Heating Resource by Resource × Bill-Derived Resource Rate) + Avoided Idle Electricity × Bill-Derived Electricity Rate

For flight/conveyor machines:

Annual Operational Savings = Avoided Water Flight × Bill-Derived Water and Sewer Rate + Avoided Active kWh Flight × Bill-Derived Electricity Rate + Sum Across Resources of (Avoided Flight-Machine Water-Heating Resource by Resource × Bill-Derived Resource Rate) + Avoided Idle Electricity × Bill-Derived Electricity Rate

Avoided Water Rack = In-Scope Equipment Count × Annual Racks per Unit × (Existing Water per Rack - Proposed Water per Rack)

Avoided Active kWh Rack = In-Scope Equipment Count × Annual Racks per Unit × (Active kWh Per Rack Existing - Active kWh Per Rack Proposed)

Avoided Rack-Machine Water-Heating Resource by Resource = In-Scope Equipment Count × Annual Racks per Unit × (Existing Water-Heating Resource per Rack - Proposed Water-Heating Resource per Rack)

Avoided Water Flight = In-Scope Equipment Count × Annual Operating Hours Per Unit × (Water Per Hour Existing - Water Per Hour Proposed)

Avoided Active kWh Flight = In-Scope Equipment Count × Annual Operating Hours Per Unit × (Active kWh Per Hour Existing - Active kWh Per Hour Proposed)

Avoided Flight-Machine Water-Heating Resource by Resource = In-Scope Equipment Count × Annual Operating Hours Per Unit × (Water Heating R Per Hour Existing - Water Heating R Per Hour Proposed)

Avoided Idle Electricity = In-Scope Equipment Count × Annual Idle Hours per Unit × (Existing Idle Power - Proposed Idle Power)

Annual Idle Hours per Unit may be confirmed directly or derived as Annual Energized Hours per Unit - Annual Active Wash Hours per Unit.
```

**Information Tree**

```text
Annual Operational Savings
├─ Annual Commercial Dishwasher Resource Reduction
│  ├─ In-Scope Equipment Count (User)
│  ├─ Existing Dishwasher Native Performance
│  │  ├─ Existing Dishwasher Machine Type and Sanitation Method (User)
│  │  ├─ Existing Exact Make and Model, Certification Record, or Measured Native Performance (Project Document)
│  │  └─ Standard 1.1 — Exact Existing Dishwasher Native-Field Resolution
│  ├─ Proposed Dishwasher Native Performance
│  │  ├─ Linked Opportunity names an exact dishwasher
│  │  │  ├─ Exact Proposed Dishwasher Product Information (Linked Opportunity)
│  │  │  └─ Standard 1.2 — Exact Proposed Dishwasher Native-Field Resolution
│  │  └─ Linked Opportunity specifies dishwasher requirements but no exact product
│  │     ├─ Dishwasher Requirements (Linked Opportunity)
│  │     └─ Standard 1.3 — Requirement-Based Proposed Dishwasher Native-Field Resolution
│  ├─ Native Activity Basis
│  │  ├─ Rack Machines Only
│  │  │  ├─ Rack-Machine Type and Sanitation Method (User)
│  │  │  ├─ Approximate Racks per Operating Day (User)
│  │  │  ├─ Operating Days per Week (User)
│  │  │  ├─ Active Weeks per Year (User)
│  │  │  └─ Standard 1.4 — Rack-Machine Activity Resolution
│  │  └─ Flight or Conveyor Machines Only
│  │     ├─ Flight or Conveyor Machine Type and Sanitation Method (User)
│  │     ├─ Exact Annual Operating Hours per Equipment Unit from Controls or Audit (Project Document)
│  │     └─ Standard 1.5 — Flight or Conveyor Activity Resolution
│  ├─ Idle Operation
│  │  ├─ Documented Energized and Active-Wash Hours from Controls or Operating Records (Project Document)
│  │  └─ Annual Idle Hours (Derived)
│  ├─ Dishwasher Water-Heating Conversion
│  │  ├─ Incoming Water Temperature (Project Document)
│  │  ├─ Wash, Rinse, or Booster Temperature or Certified Hot-Water Quantity (Project Document)
│  │  ├─ Water-Heating Resource Type (User)
│  │  ├─ Water-Heater Efficiency (Project Document)
│  │  └─ Standard 1.6 — Dishwasher Water-Heating Conversion
│  └─ Separate Rack, Flight, and Idle Resource Results (Derived)
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
   ├─ Bill-Derived Water Rate
   │  ├─ Water Use and Unit (Bill)
   │  ├─ Variable Water Charges (Bill)
   │  └─ Avoidable Water Rate (Derived)
   └─ Bill-Derived Sewer Rate
      ├─ Sewer-Billed Water Use (Bill)
      ├─ Variable Sewer Charges (Bill)
      └─ Avoidable Sewer Rate (Derived)
```

**■ Standard 1.1 — Exact Existing Dishwasher Native-Field Resolution**

**Purpose:**
Resolve one exact existing dishwasher record or project measurement while preserving rack and flight fields in their native units.

**Source:**
U.S. Department of Energy CCMS and U.S. Environmental Protection Agency ENERGY STAR Product Finder

**Compliance Certification Database:**
[https://www.regulations.doe.gov/certification-data/](https://www.regulations.doe.gov/certification-data/)

**CCMS and database description:**
[https://www.energy.gov/cmei/buildings/implementation-certification-and-enforcement](https://www.energy.gov/cmei/buildings/implementation-certification-and-enforcement)

**Product-specific certification and test-result templates:**
[https://www.energy.gov/cmei/buildings/standardized-templates-recording-test-results](https://www.energy.gov/cmei/buildings/standardized-templates-recording-test-results)

**ENERGY STAR Product Finder datasets and API:**
[https://www.energystar.gov/productfinder/advanced](https://www.energystar.gov/productfinder/advanced)

**Commercial dishwasher dataset:**
[https://data.energystar.gov/Active-Specifications/ENERGY-STAR-Certified-Commercial-Dishwashers/pk8q-dim8](https://data.energystar.gov/Active-Specifications/ENERGY-STAR-Certified-Commercial-Dishwashers/pk8q-dim8)

**Lookup Inputs:**

* Existing dishwasher machine type and sanitation method
* Existing exact make and model, retained certification record, or measured native performance from a Project Document

**Value Needed:**

* Existing dishwasher native-field record
* Existing rack-machine water use per rack
* Existing rack-machine active electricity per rack
* Existing flight or conveyor water use per operating hour
* Existing flight or conveyor active electricity per operating hour
* Existing idle power

**How to Use:**

1. Require an exact existing model in a retained historical certification snapshot or a project measurement that reports compatible native fields.
2. Classify the record as rack or flight/conveyor before reading performance fields.
3. For rack machines, retain gallons per rack, active kilowatt-hours per rack, and idle kilowatts.
4. For flight/conveyor machines, retain gallons per hour, active kilowatt-hours per hour when explicitly reported, and idle kilowatts.
5. If the exact record does not expose a required native field, report that field as unresolved and block the affected formula branch. Never convert rack fields to hourly fields.

**Automation:**

* **Selected Strategy:** Exact linked-opportunity product match against the official U.S. Department of Energy - Compliance Certification Database records.
* **Automation Method:** Normalize the opportunity model identifiers, perform an exact active-record lookup, apply category compatibility filters, and return only the required native source fields.
* **Difficulty:** Medium

**Validation:**
Current efficient-product records do not represent the installed baseline. No retained historical existing-model population or category golden fixture is present, so only an exact project record can support this process and implementation proof remains pending.

**■ Standard 1.2 — Exact Proposed Dishwasher Native-Field Resolution**

**Purpose:**
Resolve one exact opportunity-named proposed dishwasher record while preserving rack and flight fields in their native units.

**Source:**
U.S. Department of Energy CCMS and U.S. Environmental Protection Agency ENERGY STAR Product Finder

**Compliance Certification Database:**
[https://www.regulations.doe.gov/certification-data/](https://www.regulations.doe.gov/certification-data/)

**CCMS and database description:**
[https://www.energy.gov/cmei/buildings/implementation-certification-and-enforcement](https://www.energy.gov/cmei/buildings/implementation-certification-and-enforcement)

**Product-specific certification and test-result templates:**
[https://www.energy.gov/cmei/buildings/standardized-templates-recording-test-results](https://www.energy.gov/cmei/buildings/standardized-templates-recording-test-results)

**ENERGY STAR Product Finder datasets and API:**
[https://www.energystar.gov/productfinder/advanced](https://www.energystar.gov/productfinder/advanced)

**Commercial dishwasher dataset:**
[https://data.energystar.gov/Active-Specifications/ENERGY-STAR-Certified-Commercial-Dishwashers/pk8q-dim8](https://data.energystar.gov/Active-Specifications/ENERGY-STAR-Certified-Commercial-Dishwashers/pk8q-dim8)

**Lookup Inputs:**

* Exact proposed dishwasher make and model from the linked opportunity
* Proposed machine type, sanitation method, application, and capacity from the linked opportunity

**Value Needed:**

* Proposed dishwasher native-field record
* Proposed rack-machine water use per rack
* Proposed rack-machine active electricity per rack
* Proposed flight or conveyor water use per operating hour
* Proposed flight or conveyor active electricity per operating hour
* Proposed idle power

**How to Use:**

1. Match the exact manufacturer and model and require an active compatible certification record.
2. Classify the record as rack or flight/conveyor before reading performance fields.
3. For rack machines, retain gallons per rack, active kilowatt-hours per rack, and idle kilowatts.
4. For flight/conveyor machines, retain gallons per hour, active kilowatt-hours per hour only when explicitly reported, and idle kilowatts.
5. Reject any calculation that would convert gallons per rack to gallons per hour or active kilowatt-hours per rack to an hourly value.

**Automation:**

* **Selected Strategy:** Exact linked-opportunity product match against the official U.S. Department of Energy - Compliance Certification Database records.
* **Automation Method:** Normalize the opportunity model identifiers, perform an exact active-record lookup, apply category compatibility filters, and return only the required native source fields.
* **Difficulty:** Medium

**Validation:**
The retained ENERGY STAR schema fixture proves machine type, sanitation, rack water, flight water, rack active electricity, and idle-power fields. It does not prove a flight active-electricity-per-hour field, an exact category adapter, or an end-to-end golden case, so unsupported flight fields remain blocked and implementation proof is pending.

**■ Standard 1.3 — Requirement-Based Proposed Dishwasher Native-Field Resolution**

**Purpose:**
Select one compatible proposed dishwasher record from explicit opportunity requirements without mixing rack and flight populations.

**Source:**
U.S. Department of Energy CCMS and U.S. Environmental Protection Agency ENERGY STAR Product Finder

**Compliance Certification Database:**
[https://www.regulations.doe.gov/certification-data/](https://www.regulations.doe.gov/certification-data/)

**CCMS and database description:**
[https://www.energy.gov/cmei/buildings/implementation-certification-and-enforcement](https://www.energy.gov/cmei/buildings/implementation-certification-and-enforcement)

**Product-specific certification and test-result templates:**
[https://www.energy.gov/cmei/buildings/standardized-templates-recording-test-results](https://www.energy.gov/cmei/buildings/standardized-templates-recording-test-results)

**ENERGY STAR Product Finder datasets and API:**
[https://www.energystar.gov/productfinder/advanced](https://www.energystar.gov/productfinder/advanced)

**Commercial dishwasher dataset:**
[https://data.energystar.gov/Active-Specifications/ENERGY-STAR-Certified-Commercial-Dishwashers/pk8q-dim8](https://data.energystar.gov/Active-Specifications/ENERGY-STAR-Certified-Commercial-Dishwashers/pk8q-dim8)

**Lookup Inputs:**

* Dishwasher requirements from the linked opportunity
* Required machine type, sanitation method, application, and capacity from the linked opportunity

**Value Needed:**

* Proposed dishwasher native-field record
* Proposed rack-machine water use per rack
* Proposed rack-machine active electricity per rack
* Proposed flight or conveyor water use per operating hour
* Proposed flight or conveyor active electricity per operating hour
* Proposed idle power

**How to Use:**

1. Extract every mandatory machine-type, sanitation, application, capacity, and performance restriction from the linked opportunity.
2. Filter rack and flight/conveyor records as separate populations.
3. Preserve each eligible record's native gallons-per-rack or gallons-per-hour, active-energy, and idle-power fields.
4. Use an official recommended or typical record when available, otherwise use a valid weighted median or the ordinary median of the eligible compatible population.
5. Return one complete compatible record and retain the source version, filters, population, population size, selection rule, fields, native units, and limitations.

**Automation:**

* **Selected Strategy:** Requirement-based candidate-set resolution from the official U.S. Department of Energy - Compliance Certification Database population.
* **Automation Method:** Parse the opportunity requirements, apply exact product-family and performance filters, preserve the eligible population, and select one official typical value, weighted median, or median in native units.
* **Difficulty:** Medium

**Validation:**
The retained ENERGY STAR schema fixture proves the native field families and filter fields. No retained eligible candidate population or category golden fixture proves the selected record, and the published schema does not prove flight active electricity per hour, so implementation remains pending.

**■ Standard 1.4 — Rack-Machine Activity Resolution**

**Purpose:**
Resolve annual racks per equipment unit for one compatible rack-machine type and sanitation method.

**Source:**
U.S. DOE, U.S. EPA, and National Laboratory of the Rockies benchmark sources

**WaterSense at Work commercial-kitchen methods:**
[https://www.epa.gov/watersense/best-management-practices](https://www.epa.gov/watersense/best-management-practices)

**ENERGY STAR CFS Equipment Calculator:**
[https://www.energystar.gov/sites/default/files/2024-03/CFS%20Equipment%20Calculator.xlsx](https://www.energystar.gov/sites/default/files/2024-03/CFS%20Equipment%20Calculator.xlsx)

**Lookup Inputs:**

* Rack-machine type and sanitation method
* Approximate racks per operating day, when known
* Operating days per week
* Active weeks per year

**Value Needed:**

* Annual racks per equipment unit

**How to Use:**

1. Use exact project racks per operating day when available.
2. Otherwise select the exact retained ENERGY STAR calculator default for the compatible rack-machine type and sanitation method.
3. Calculate annual racks per equipment unit as selected racks per day multiplied by operating days per week and active weeks per year.
4. Return the per-equipment-unit annual rack value and multiply by equipment quantity exactly once in the formula.
5. Do not use this resolver for flight or conveyor machines and do not convert the result to operating hours.

**Automation:**

* **Selected Strategy:** Category-specific deterministic selection from an explicitly implemented and evidenced compatible source population or equation.
* **Automation Method:** Apply the category's documented source-version and compatibility filters, execute its exact numeric rule, and retain the selected output, unit, scope, fixture, and population or equation provenance. Report a limitation when that source-specific implementation is absent.
* **Difficulty:** Medium

**Validation:**
The retained ENERGY STAR calculator fixture proves explicit rack-machine daily defaults for supported types and the annualization equation. The category adapter and end-to-end golden fixture remain pending.

**■ Standard 1.5 — Flight or Conveyor Activity Resolution**

**Purpose:**
Resolve annual operating hours per equipment unit for a flight or conveyor machine without translating rack activity.

**Source:**
U.S. DOE, U.S. EPA, and National Laboratory of the Rockies benchmark sources

**WaterSense at Work commercial-kitchen methods:**
[https://www.epa.gov/watersense/best-management-practices](https://www.epa.gov/watersense/best-management-practices)

**ENERGY STAR CFS Equipment Calculator:**
[https://www.energystar.gov/sites/default/files/2024-03/CFS%20Equipment%20Calculator.xlsx](https://www.energystar.gov/sites/default/files/2024-03/CFS%20Equipment%20Calculator.xlsx)

**Lookup Inputs:**

* Exact annual operating hours per equipment unit from controls, an audit, or another Project Document

**Value Needed:**

* Annual flight or conveyor operating hours per equipment unit

**How to Use:**

1. Require exact annual operating hours per equipment unit from controls, an operating record, or an audit.
2. Validate that the hours apply to the same flight or conveyor machine and period as the native gallons-per-hour and active-electricity-per-hour fields.
3. Return annual operating hours per equipment unit.
4. Multiply by equipment quantity exactly once in the flight formula.
5. When exact hours are unavailable, report the implementation limitation. The retained rack defaults are not a flight-machine fallback.

**Automation:**

* **Selected Strategy:** Category-specific deterministic selection from an explicitly implemented and evidenced compatible source population or equation.
* **Automation Method:** Apply the category's documented source-version and compatibility filters, execute its exact numeric rule, and retain the selected output, unit, scope, fixture, and population or equation provenance. Report a limitation when that source-specific implementation is absent.
* **Difficulty:** Medium

**Validation:**
The retained calculator fixture does not supply a defensible flight-machine annual-hours population. Only an exact project record is supported, and no category golden fixture exists, so implementation proof remains pending.

**■ Standard 1.6 — Dishwasher Water-Heating Conversion**

**Purpose:**
Convert existing and proposed native water quantities to purchased building and booster heating resource in the selected machine's same rack or hourly activity unit.

**Source:**
U.S. Environmental Protection Agency - ENERGY STAR Commercial Food Service Equipment Calculator

**ENERGY STAR Commercial Food Service Equipment Calculator:**
[https://www.energystar.gov/sites/default/files/2024-03/CFS%20Equipment%20Calculator.xlsx](https://www.energystar.gov/sites/default/files/2024-03/CFS%20Equipment%20Calculator.xlsx)

**Lookup Inputs:**

* Rack-machine type and sanitation method, when the rack branch is used
* Flight or conveyor machine type and sanitation method, when the flight branch is used
* Existing native water quantity from the connected existing dishwasher record
* Proposed native water quantity from the connected exact proposed dishwasher record, when used
* Proposed native water quantity from the connected requirement-selected dishwasher record, when used
* Incoming water temperature
* Wash, rinse, or booster temperature or certified hot-water quantity
* Water-heating resource type
* Water-heater efficiency

**Value Needed:**

* Dishwasher water-heating result set
* Existing rack-machine water-heating resource per rack
* Proposed rack-machine water-heating resource per rack
* Existing flight or conveyor water-heating resource per operating hour
* Proposed flight or conveyor water-heating resource per operating hour

**How to Use:**

1. Select the rack or flight/conveyor branch before calculating water heating.
2. Use gallons per rack for the rack branch or gallons per operating hour for the flight branch.
3. Resolve incoming and wash, rinse, or booster temperatures, purchased resource, and heater efficiency from complete project engineering inputs or the compatible retained ENERGY STAR calculator input set.
4. Calculate purchased building and booster resource from water volume, water density, specific heat, temperature rise, resource conversion, and heater efficiency.
5. Return existing and proposed resource per rack or per hour in the same native activity unit and retain the complete input set, equation, units, source version, and warnings.

**Automation:**

* **Selected Strategy:** Deterministic native-unit execution of the retained ENERGY STAR dishwasher building and booster water-heating equations.
* **Automation Method:** Select the rack or flight branch, validate water quantities, temperatures, resource, and efficiency, and calculate purchased resource per rack or per operating hour without cross-converting activity units.
* **Difficulty:** Medium

**Validation:**
The retained March 2024 ENERGY STAR calculator fixture proves the building and booster temperature-rise and efficiency equations. The category adapter and end-to-end golden fixture remain pending, and incompatible or incomplete project boundaries remain blocked.
