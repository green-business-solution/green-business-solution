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
Annual Operational Savings = Avoided Water × Bill-Derived Water and Sewer Rate + Sum Across Resources of (Avoided Water-Heating Resource × Bill-Derived Resource Rate) + Avoided Idle Electricity × Bill-Derived Electricity Rate

Avoided Water = In-Scope Equipment Count × Annual Racks per Unit × (Existing Water per Rack - Proposed Water per Rack)

Avoided Water-Heating Resource = In-Scope Equipment Count × Annual Racks per Unit × (Existing Water-Heating Resource per Rack - Proposed Water-Heating Resource per Rack)

Avoided Idle Electricity = In-Scope Equipment Count × Annual Idle Hours per Unit × (Existing Idle Power - Proposed Idle Power)

Annual Idle Hours per Unit may be confirmed directly or derived as Annual Energized Hours per Unit - Annual Active Wash Hours per Unit.
```

**Information Tree**

```text
Annual Operational Savings
├─ Annual Commercial Dishwasher Resource Reduction
│  ├─ In-Scope Equipment Count (User)
│  ├─ Commercial Dishwasher Performance
│  │  ├─ Existing Commercial Dishwasher
│  │  │  ├─ Existing Commercial Dishwasher Type or Application (User)
│  │  │  ├─ Existing Make and Model, when available (User)
│  │  │  ├─ Existing Capacity or Size Class, when available (User)
│  │  │  └─ Standard 1.1 — Existing Commercial Dishwasher Rating Resolution
│  │  └─ Proposed Commercial Dishwasher
│  │     ├─ Linked Opportunity names an exact product
│  │     │  ├─ Exact Product Information (Linked Opportunity)
│  │     │  └─ Standard 1.2 — Exact Proposed Commercial Dishwasher Rating Lookup
│  │     └─ Linked Opportunity specifies requirements but no exact product
│  │        ├─ Product Requirements (Linked Opportunity)
│  │        └─ Standard 1.3 — Requirement-Based Proposed Commercial Dishwasher Resolution
│  ├─ Certified Activity Basis
│  │  ├─ Rack Machines
│  │  │  ├─ Approximate Racks per Operating Day (User)
│  │  │  ├─ Operating Days per Week (User)
│  │  │  └─ Active Weeks per Year (User)
│  │  ├─ Flight or Conveyor Machines
│  │  │  └─ Documented Conveyor Operating Hours and Throughput from Controls or Audit (Project Document)
│  │  ├─ Recognizable Meals, Trays, Racks, Seats, Rooms, or Beds (User)
│  │  ├─ Standard 1.4 — Commercial Dishwasher Activity Benchmark
│  │  └─ Do Not Convert Gallons per Rack to Gallons per Hour (Derived)
│  ├─ Idle Operation
│  │  ├─ Documented Energized and Active-Wash Hours from Controls or Operating Records (Project Document)
│  │  └─ Annual Idle Hours (Derived)
│  ├─ Certified Native Performance Difference (Derived)
│  └─ Separate Water-Heating Resource Impact
│     └─ One Selected Water-Heating Conversion from Project Documents or the Context Benchmark (Derived)
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

**■ Standard 1.1 — Existing Commercial Dishwasher Rating Resolution**

**Purpose:**
Resolve the existing commercial dishwasher performance only from a documented exact model or retained certification record.

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

* Existing commercial dishwasher type or application
* Existing make and model, when available
* Existing capacity or size class

**Value Needed:**

* One selected existing commercial dishwasher performance value with its exact unit and provenance

**How to Use:**

1. Normalize the documented existing manufacturer and model for the high-efficiency commercial dishwasher when it is available.
2. Search the applicable certification export for that exact model and filter by the displayed product type, capacity or size class, and native test procedure.
3. If an exact record is unavailable, select one context-matched existing-equipment benchmark from an authoritative historical or installed-stock source; never substitute the current efficient-product population for the installed baseline.
4. Return one selected existing commercial dishwasher performance value with its exact unit and provenance.
5. Retain the dataset version, record identity or benchmark population, context filters, population size, selection rule, native fields, units, and fallback level.

**Automation:**

* **Selected Strategy:** Exact-record lookup followed by a context-matched installed-equipment benchmark for high-efficiency commercial dishwasher.
* **Automation Method:** Normalize the submitted model, query the applicable certification export, and use one exact compatible native-unit record when available; otherwise apply reviewed installed-stock filters and select the official typical value, weighted median, or median.
* **Difficulty:** Medium

**Validation:**
The official certification access paths and native product-family fields were checked. Current efficient-product records do not represent the installed baseline. An exact documented existing model is preferred; when it is unavailable, a separately sourced context-matched installed-equipment benchmark is required. That benchmark adapter and the category golden test have not yet been added.

**■ Standard 1.2 — Exact Proposed Commercial Dishwasher Rating Lookup**

**Purpose:**
Resolve proposed commercial dishwasher performance when the linked opportunity names an exact product.

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

* Exact proposed make and model from the linked opportunity
* Product type and capacity
* Applicable certified test method

**Value Needed:**

* Proposed certified commercial dishwasher performance with its exact unit

**How to Use:**

1. Read the exact manufacturer, model, and product configuration from the linked high-efficiency commercial dishwasher opportunity.
2. Query the official source for the exact model and filter by application, capacity, active specification, and the native certified fields required by this formula.
3. Require one compatible record; reject partial model matches, inactive listings, incompatible configurations, and records whose native test unit does not match the formula.
4. Return proposed certified commercial dishwasher performance with its exact unit.
5. Retain the source version, exact record identity, matched model text, returned native fields and units, and any ambiguity decision.

**Automation:**

* **Selected Strategy:** Exact linked-opportunity product match against the official U.S. Department of Energy - Compliance Certification Database records.
* **Automation Method:** Normalize the opportunity model identifiers, perform an exact active-record lookup, apply category compatibility filters, and return only the required native source fields.
* **Difficulty:** Medium

**Validation:**
The official commercial dishwasher dataset and access method were checked. The retained fixture validates model, machine-type, sanitation, water-use, active-energy, idle-power, date, unit, version, and checksum fields. The exact-product adapter and formula-level golden test have not yet been added, and rack and flight-machine units must remain separate.

**■ Standard 1.3 — Requirement-Based Proposed Commercial Dishwasher Resolution**

**Purpose:**
Interpret the linked opportunity requirements and determine whether they identify a compatible certified commercial dishwasher record.

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

* Product requirements from the linked opportunity
* Required application and capacity
* Applicable efficiency or resource-use criteria

**Value Needed:**

* One selected proposed commercial dishwasher native-unit performance value, with the compatible population, filters, population size, and selection rule retained internally

**How to Use:**

1. Extract the application, capacity, certification, and performance limits from the linked high-efficiency commercial dishwasher opportunity requirements.
2. Filter the official current-product population by every mandatory requirement, product-family boundary, active specification, and native test unit.
3. Use the source's official recommended or typical value when it provides one; otherwise select the weighted median when valid weights exist, or the ordinary median of the eligible compatible population.
4. Return one selected proposed commercial dishwasher native-unit performance value, with the compatible population, filters, population size, and selection rule retained internally without choosing a future contractor product arbitrarily.
5. Retain the source version, complete filters, eligible record identities, population size, native units, selection rule, selected value, and fallback level.

**Automation:**

* **Selected Strategy:** Requirement-based candidate-set resolution from the official U.S. Department of Energy - Compliance Certification Database population.
* **Automation Method:** Parse the opportunity requirements, apply exact product-family and performance filters, preserve the eligible population, and select one official typical value, weighted median, or median in native units.
* **Difficulty:** Medium

**Validation:**
The official commercial dishwasher dataset and access method were checked, and the retained schema fixture validates the fields required to filter machine type, sanitation method, water use, active energy, and idle power. A retained candidate population and category golden test have not yet been added, so the requirements path cannot claim an implemented selection.

**■ Standard 1.4 — Commercial Dishwasher Activity Benchmark**

**Purpose:**
Select one dishwasher activity value from recognizable business throughput when exact controls or operating records are unavailable.

**Source:**
U.S. DOE, U.S. EPA, and National Laboratory of the Rockies benchmark sources

**WaterSense at Work commercial-kitchen methods:**
[https://www.epa.gov/watersense/best-management-practices](https://www.epa.gov/watersense/best-management-practices)

**Lookup Inputs:**

* Dishwasher machine type
* Business activity
* Meals, trays, racks, seats, rooms, beds, or another normally tracked throughput
* Operating days and hours
* In-scope equipment count

**Value Needed:**

* One annual rack count for rack machines, or one annual conveyor operating-hour and throughput value for flight machines

**How to Use:**

1. Map the High-Efficiency Commercial Dishwasher inputs to the documented Commercial Dishwasher Activity Benchmark source fields or model inputs: Dishwasher machine type; Business activity; Meals, trays, racks, seats, rooms, beds, or another normally tracked throughput; Operating days and hours; In-scope equipment count.
2. Apply the category's reviewed context fields and source-version filters, use an official recommended or typical value when available, otherwise use a valid weighted median or ordinary median, and retain the selected value plus population provenance.
3. When an exact value is unavailable, select one context-matched authoritative benchmark and then one deterministic RetroFi benchmark if needed; do not insert an unexplained cross-category default.
4. Return one selected annual rack count for rack machines, or one annual conveyor operating-hour and throughput value for flight machines.
5. Retain the Commercial Dishwasher Activity Benchmark source version, exact fields or model inputs, native units, eligible population, population size, selected-value rule, fallback level, selected record, and warnings.

**Automation:**

* **Selected Strategy:** Category-specific deterministic selection from the closest authoritative compatible population.
* **Automation Method:** Apply the category's reviewed context fields and source-version filters, use an official recommended or typical value when available, otherwise use a valid weighted median or ordinary median, and retain the selected value plus population provenance.
* **Difficulty:** Medium

**Validation:**
The WaterSense commercial-kitchen method can support activity conversion only after its exact dishwasher fields and units are retained. That source fixture is not yet present. ENERGY STAR product data remains limited to exact product performance and is not used to infer activity.
