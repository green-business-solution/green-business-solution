# Information Card — Low-Flow Plumbing Fixtures

**Retrofits included:** Low-flow fixture retrofit

**Overview:** Low-flow fixtures reduce potable water use and may also reduce the energy needed to heat the avoided hot water.

**Broader Formula**

```text
Annual Operational Savings =
Annual Resource Reduction × Applicable Bill-Derived Resource Rate
```

**Expanded Formula**

```text
Annual Operational Savings = Avoided Water × Bill-Derived Water and Sewer Rate + Avoided Water-Heating Input × Heating-Resource Rate

Avoided Water = In-Scope Equipment Count × Annual Uses per Fixture × Minutes per Use × (Existing Flow Rate - Proposed Flow Rate)

Avoided Water-Heating Input = Convert to Billed Resource Units (Avoided Water × Hot-Water Fraction × Thermal Energy per Gallon / Water-Heater Efficiency, Heating-Resource Unit)
```

**Information Tree**

```text
Annual Operational Savings
├─ Annual Water and Heating-Resource Reduction
│  ├─ In-Scope Fixture Count (User)
│  ├─ Recognizable Facility Activity
│  │  ├─ Business Activity and Building Type (Profile)
│  │  ├─ Approximate Occupants, Employees, Customers, Rooms, Beds, or Meals (User)
│  │  ├─ Operating Days per Week (User)
│  │  ├─ Active Weeks per Year (User)
│  │  ├─ Observed Fixture-Use Study or Audit, when available (Project Document)
│  │  └─ Standard 1.1 — Commercial Flow-Fixture Usage Benchmark
│  ├─ Existing Fixture
│  │  ├─ Existing Fixture Type or Application (User)
│  │  ├─ Existing Rated Flow from Label, Specification, or Measurement (Project Document)
│  │  └─ Standard 1.1 — Commercial Flow-Fixture Usage Benchmark
│  ├─ Water-Heating Service
│  │  ├─ Fixture Uses Hot Water (User)
│  │  ├─ Water-Heating Fuel Type (User)
│  │  ├─ Water-Heater Nameplate or Commissioning Information, if available (Project Document)
│  │  └─ Standard 1.1 — Commercial Flow-Fixture Usage Benchmark
│  └─ Flow Fixture Performance
│     ├─ Linked Opportunity names an exact flow fixture
│     │  ├─ Exact Flow Fixture Product Information (Linked Opportunity)
│     │  └─ Standard 1.2 — Exact Proposed Flow Fixture Rating Lookup
│     └─ Linked Opportunity specifies flow fixture requirements but no exact product
│        ├─ Flow Fixture Requirements (Linked Opportunity)
│        └─ Standard 1.3 — Requirement-Based Proposed Flow Fixture Resolution
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

**■ Standard 1.1 — Commercial Flow-Fixture Usage Benchmark**

**Purpose:**
Select one commercial usage value from recognizable facility activity instead of asking for technical uses or minutes per fixture.

**Source:**
U.S. DOE, U.S. EPA, and National Laboratory of the Rockies benchmark sources

**WaterSense at Work fixture methods:**
[https://www.epa.gov/watersense/best-management-practices](https://www.epa.gov/watersense/best-management-practices)

**Lookup Inputs:**

* Supported fixture type: bathroom faucet, showerhead, or pre-rinse spray valve
* Business activity and building type
* Occupants, employees, customers, rooms, beds, meals, or another normally tracked activity
* In-scope fixture count
* Operating days and hours

**Value Needed:**

* One annual use count or one annual active-use duration in the fixture's native method

**How to Use:**

1. Map the Low-Flow Plumbing Fixtures inputs to the documented Commercial Flow-Fixture Usage Benchmark source fields or model inputs: Supported fixture type: bathroom faucet, showerhead, or pre-rinse spray valve; Business activity and building type; Occupants, employees, customers, rooms, beds, meals, or another normally tracked activity; In-scope fixture count; Operating days and hours.
2. Apply the category's reviewed context fields and source-version filters, use an official recommended or typical value when available, otherwise use a valid weighted median or ordinary median, and retain the selected value plus population provenance.
3. When an exact value is unavailable, select one context-matched authoritative benchmark and then one deterministic RetroFi benchmark if needed; do not insert an unexplained cross-category default.
4. Return one selected annual use count or one annual active-use duration in the fixture's native method.
5. Retain the Commercial Flow-Fixture Usage Benchmark source version, exact fields or model inputs, native units, eligible population, population size, selected-value rule, fallback level, selected record, and warnings.

**Automation:**

* **Selected Strategy:** Category-specific deterministic selection from the closest authoritative compatible population.
* **Automation Method:** Apply the category's reviewed context fields and source-version filters, use an official recommended or typical value when available, otherwise use a valid weighted median or ordinary median, and retain the selected value plus population provenance.
* **Difficulty:** Medium

**Validation:**
EPA WaterSense at Work provides commercial fixture inventory and savings-calculation methods. The retained source material establishes the supported fixture types and calculation fields, but the flow-fixture activity adapter fixture has not yet been added. Unsupported fixture types require a separately validated source or an explicit RetroFi benchmark and must not be represented as WaterSense-covered.

**■ Standard 1.2 — Exact Proposed Flow Fixture Rating Lookup**

**Purpose:**
Resolve the proposed rated flow when the linked opportunity names an exact fixture.

**Source:**
U.S. Environmental Protection Agency - WaterSense

**WaterSense Product Search and downloadable model list:**
[https://lookforwatersense.epa.gov/](https://lookforwatersense.epa.gov/)

**EPA pre-rinse spray valve archive:**
[https://www.epa.gov/watersense/pre-rinse-spray-valves](https://www.epa.gov/watersense/pre-rinse-spray-valves)

**Lookup Inputs:**

* Exact proposed fixture make and model from the linked opportunity
* Fixture type and application

**Value Needed:**

* Proposed rated flow with units and product provenance

**How to Use:**

1. Read the exact manufacturer, model, and fixture type from the linked opportunity.
2. For private lavatory faucets and showerheads, search the official WaterSense Product Search or download its complete model list.
3. For commercial pre-rinse spray valves, use the separate EPA archived model list because the WaterSense specification sunset in 2019; do not represent these as current WaterSense listings.
4. Require one exact compatible model and native gallons-per-minute field. Route any other fixture type to a separately validated authoritative product source or the explicit RetroFi benchmark.
5. Return one exact proposed rated flow with source version, record identity, product type, native units, and provenance.

**Automation:**

* **Selected Strategy:** Exact linked-opportunity product match against the official U.S. Environmental Protection Agency - WaterSense records.
* **Automation Method:** Normalize the opportunity model identifiers, perform an exact active-record lookup, apply category compatibility filters, and return only the required native source fields.
* **Difficulty:** Easy to Medium

**Validation:**
The official WaterSense Product Search exposes a downloadable complete model list for currently supported fixture categories, and EPA retains a separate pre-rinse spray valve archive. No retained product export or category adapter currently proves the exact rated flow lookup, so source access is verified while field-level execution remains pending. The product sources do not supply existing installed performance or usage frequency.

**■ Standard 1.3 — Requirement-Based Proposed Flow Fixture Resolution**

**Purpose:**
Interpret the linked opportunity requirements and determine whether they identify a compatible flow fixture rating.

**Source:**
U.S. Environmental Protection Agency - WaterSense

**WaterSense Product Search and downloadable model list:**
[https://lookforwatersense.epa.gov/](https://lookforwatersense.epa.gov/)

**EPA pre-rinse spray valve archive:**
[https://www.epa.gov/watersense/pre-rinse-spray-valves](https://www.epa.gov/watersense/pre-rinse-spray-valves)

**Lookup Inputs:**

* Fixture requirements from the linked opportunity
* Fixture type and application
* Required water-use criterion

**Value Needed:**

* One selected proposed rated flow, with the eligible compatible fixture population, selection rule, units, and source provenance retained internally

**How to Use:**

1. Extract fixture type, application, certification, and maximum water-use criteria from the linked opportunity.
2. Use current WaterSense Product Search records only for private lavatory faucets and showerheads, and use the separate EPA archived list for pre-rinse spray valves.
3. Filter the authoritative population by every mandatory requirement, active or archived source status as applicable, compatible native unit, and fixture-family boundary.
4. Use an official criterion or typical value when the source provides one; otherwise select the weighted median when valid weights exist or the ordinary median of the eligible compatible population.
5. Return one selected proposed rating and retain the source version, full eligible population, filters, population size, selection rule, selected value, native unit, and fallback level.
6. Route unsupported fixture types to a separately validated authoritative product source or the explicit RetroFi benchmark rather than implying WaterSense coverage.

**Automation:**

* **Selected Strategy:** Requirement-based candidate-set resolution from the official U.S. Environmental Protection Agency - WaterSense population.
* **Automation Method:** Parse the opportunity requirements, apply exact product-family and performance filters, preserve the eligible population, and select one official typical value, weighted median, or median in native units.
* **Difficulty:** Easy to Medium

**Validation:**
The official WaterSense criteria define compatible proposed rated flow requirements. The official product-search or downloadable-product adapter and retained compatible population are not yet implemented, so the source-supported filtering method is verified but execution proof for the selected median is pending. The source does not supply existing ratings or usage frequency.
