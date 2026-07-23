# Information Card — High-Efficiency Toilets and Urinals

**Retrofits included:** High-efficiency toilet / urinal replacement

**Overview:** High-efficiency toilets and urinals reduce potable water use by lowering gallons per flush for the same annual use.

**Broader Formula**

```text
Annual Operational Savings =
Annual Water Reduction × Applicable Bill-Derived Water and Sewer Rate
```

**Expanded Formula**

```text
Annual Operational Savings = In-Scope Equipment Count × Annual Flushes per Fixture × (Existing Gallons per Flush - Proposed Gallons per Flush) × Bill-Derived Water and Sewer Rate
```

**Information Tree**

```text
Annual Operational Savings
├─ Annual Water Reduction
│  ├─ In-Scope Fixture Count (User)
│  ├─ Recognizable Facility Activity
│  │  ├─ Business Activity and Building Type (Profile)
│  │  ├─ Approximate Occupants or Employees and Customers or Visitors (User)
│  │  ├─ Operating Days per Week (User)
│  │  ├─ Active Weeks per Year (User)
│  │  ├─ Observed Restroom Study or Audit, when available (Project Document)
│  │  └─ Standard 1.1 — Commercial Flush-Activity Benchmark
│  ├─ Existing Fixture
│  │  ├─ Existing Toilet or Urinal Type (User)
│  │  ├─ Existing Gallons per Flush from Label, Specification, or Measurement (Project Document)
│  │  └─ Standard 1.1 — Commercial Flush-Activity Benchmark
│  └─ Flush Fixture Performance
│     ├─ Linked Opportunity names an exact flush fixture
│     │  ├─ Exact Flush Fixture Product Information (Linked Opportunity)
│     │  └─ Standard 1.2 — Exact Proposed Flush Fixture Rating Lookup
│     └─ Linked Opportunity specifies flush fixture requirements but no exact product
│        ├─ Flush Fixture Requirements (Linked Opportunity)
│        └─ Standard 1.3 — Requirement-Based Proposed Flush Fixture Resolution
└─ Applicable Resource Rates
   ├─ Bill-Derived Water Rate
   │  ├─ Water Use and Unit (Bill)
   │  ├─ Variable Water Charges (Bill)
   │  └─ Avoidable Water Rate (Derived)
   └─ Bill-Derived Sewer Rate
      ├─ Sewer-Billed Water Use (Bill)
      ├─ Variable Sewer Charges (Bill)
      └─ Avoidable Sewer Rate (Derived)
```

**■ Standard 1.1 — Commercial Flush-Activity Benchmark**

**Purpose:**
Select one annual toilet or urinal flush count from recognizable facility activity.

**Source:**
U.S. DOE, U.S. EPA, and National Laboratory of the Rockies benchmark sources

**WaterSense at Work fixture methods:**
[https://www.epa.gov/watersense/best-management-practices](https://www.epa.gov/watersense/best-management-practices)

**Lookup Inputs:**

* Toilet or urinal type
* Business activity and building type
* Occupants or employees and customers or visitors
* In-scope fixture count
* Operating days

**Value Needed:**

* One selected annual flush count

**How to Use:**

1. Map the High-Efficiency Toilets and Urinals inputs to the documented Commercial Flush-Activity Benchmark source fields or model inputs: Toilet or urinal type; Business activity and building type; Occupants or employees and customers or visitors; In-scope fixture count; Operating days.
2. Apply the category's reviewed context fields and source-version filters, use an official recommended or typical value when available, otherwise use a valid weighted median or ordinary median, and retain the selected value plus population provenance.
3. When an exact value is unavailable, select one context-matched authoritative benchmark and then one deterministic RetroFi benchmark if needed; do not insert an unexplained cross-category default.
4. Return one selected annual flush count.
5. Retain the Commercial Flush-Activity Benchmark source version, exact fields or model inputs, native units, eligible population, population size, selected-value rule, fallback level, selected record, and warnings.

**Automation:**

* **Selected Strategy:** Category-specific deterministic selection from the closest authoritative compatible population.
* **Automation Method:** Apply the category's reviewed context fields and source-version filters, use an official recommended or typical value when available, otherwise use a valid weighted median or ordinary median, and retain the selected value plus population provenance.
* **Difficulty:** Medium

**Validation:**
EPA WaterSense at Work 2023 toilet and urinal methods provide fixture-specific daily-use assumptions and annual equations. The retained fixture records the reviewed assumptions, formulas, and scope, but a category formula golden fixture has not yet been added.

**■ Standard 1.2 — Exact Proposed Flush Fixture Rating Lookup**

**Purpose:**
Resolve the proposed rated gallons per flush when the linked opportunity names an exact fixture.

**Source:**
U.S. Environmental Protection Agency - WaterSense

**WaterSense Product Search and downloadable model list:**
[https://lookforwatersense.epa.gov/](https://lookforwatersense.epa.gov/)

**WaterSense urinal criteria:**
[https://www.epa.gov/watersense/urinals](https://www.epa.gov/watersense/urinals)

**Lookup Inputs:**

* Exact proposed fixture make and model from the linked opportunity
* Fixture type and application

**Value Needed:**

* Proposed rated gallons per flush with units and product provenance

**How to Use:**

1. Read the exact manufacturer, model, and toilet or urinal type from the linked opportunity.
2. Search the official WaterSense Product Search or download its complete model list.
3. Require one exact compatible tank-type toilet, flushometer-valve toilet, or flushing-urinal record and its native gallons-per-flush field.
4. Route any other fixture type to a separately validated authoritative product source or the explicit RetroFi benchmark.
5. Return one exact proposed gallons-per-flush value with source version, record identity, fixture type, native units, and provenance.

**Automation:**

* **Selected Strategy:** Exact linked-opportunity product match against the official U.S. Environmental Protection Agency - WaterSense records.
* **Automation Method:** Normalize the opportunity model identifiers, perform an exact active-record lookup, apply category compatibility filters, and return only the required native source fields.
* **Difficulty:** Easy to Medium

**Validation:**
The official WaterSense Product Search exposes a downloadable complete model list for supported toilet and urinal categories. No retained product export or category adapter currently proves the exact rated gallons per flush lookup, so source access is verified while field-level execution remains pending. The product source does not supply existing installed performance or usage frequency.

**■ Standard 1.3 — Requirement-Based Proposed Flush Fixture Resolution**

**Purpose:**
Interpret the linked opportunity requirements and determine whether they identify a compatible flush fixture rating.

**Source:**
U.S. Environmental Protection Agency - WaterSense

**WaterSense Product Search and downloadable model list:**
[https://lookforwatersense.epa.gov/](https://lookforwatersense.epa.gov/)

**WaterSense urinal criteria:**
[https://www.epa.gov/watersense/urinals](https://www.epa.gov/watersense/urinals)

**Lookup Inputs:**

* Fixture requirements from the linked opportunity
* Fixture type and application
* Required water-use criterion

**Value Needed:**

* One selected proposed rated gallons per flush, with the eligible compatible fixture population, selection rule, units, and source provenance retained internally

**How to Use:**

1. Extract fixture type, application, certification, and maximum water-use criteria from the linked opportunity.
2. Use current WaterSense Product Search records only for compatible tank-type toilets, flushometer-valve toilets, and flushing urinals.
3. Filter the authoritative population by every mandatory requirement, active or archived source status as applicable, compatible native unit, and fixture-family boundary.
4. Use an official criterion or typical value when the source provides one; otherwise select the weighted median when valid weights exist or the ordinary median of the eligible compatible population.
5. Return one selected proposed rating and retain the source version, full eligible population, filters, population size, selection rule, selected value, native unit, and fallback level.
6. Route unsupported fixture types to a separately validated authoritative product source or the explicit RetroFi benchmark rather than implying WaterSense coverage.

**Automation:**

* **Selected Strategy:** Requirement-based candidate-set resolution from the official U.S. Environmental Protection Agency - WaterSense population.
* **Automation Method:** Parse the opportunity requirements, apply exact product-family and performance filters, preserve the eligible population, and select one official typical value, weighted median, or median in native units.
* **Difficulty:** Easy to Medium

**Validation:**
The official WaterSense criteria define compatible proposed rated gallons per flush requirements. The official product-search or downloadable-product adapter and retained compatible population are not yet implemented, so the source-supported filtering method is verified but execution proof for the selected median is pending. The source does not supply existing ratings or usage frequency.
