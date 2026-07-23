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
│  ├─ Observed Flush Activity
│  │  ├─ Approximate Flushes per Operating Day (User)
│  │  ├─ Operating Days per Week (User)
│  │  ├─ Active Weeks per Year (User)
│  │  └─ No Usage Estimate Without Observed or Documented Activity (Derived)
│  ├─ Existing Fixture
│  │  ├─ Existing Toilet or Urinal Type (User)
│  │  ├─ Existing Gallons per Flush from Label, Specification, or Measurement (User)
│  │  └─ No Existing Flush-Volume Value Without a Label, Specification, or Measurement (Derived)
│  └─ Flush Fixture Performance
│     ├─ Linked Opportunity names an exact flush fixture
│     │  ├─ Exact Flush Fixture Product Information (Linked Opportunity)
│     │  └─ Standard 1.1 — Exact Proposed Flush Fixture Rating Lookup
│     └─ Linked Opportunity specifies flush fixture requirements but no exact product
│        ├─ Flush Fixture Requirements (Linked Opportunity)
│        └─ Standard 1.2 — Requirement-Based Proposed Flush Fixture Resolution
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

**■ Standard 1.1 — Exact Proposed Flush Fixture Rating Lookup**

**Purpose:**
Resolve the proposed rated gallons per flush when the linked opportunity names an exact fixture.

**Source:**
U.S. Environmental Protection Agency - WaterSense

**WaterSense commercial-building resources:**
[https://www.epa.gov/watersense/commercial-buildings](https://www.epa.gov/watersense/commercial-buildings)

**WaterSense at Work best-management-practice guide:**
[https://www.epa.gov/watersense/best-management-practices](https://www.epa.gov/watersense/best-management-practices)

**WaterSense urinal criteria:**
[https://www.epa.gov/watersense/urinals](https://www.epa.gov/watersense/urinals)

**Lookup Inputs:**

* Exact proposed fixture make and model from the linked opportunity
* Fixture type and application

**Value Needed:**

* Proposed rated gallons per flush with units and product provenance

**How to Use:**

1. Read the exact manufacturer, model, and product configuration from the linked high-efficiency toilets and urinals opportunity.
2. Query the official source for the exact model and filter by application, capacity, active specification, and the native certified fields required by this formula.
3. Require one compatible record; reject partial model matches, inactive listings, incompatible configurations, and records whose native test unit does not match the formula.
4. Return proposed rated gallons per flush with units and product provenance.
5. Retain the source version, exact record identity, matched model text, returned native fields and units, and any ambiguity decision.

**Automation:**

* **Selected Strategy:** Exact linked-opportunity product match against the official U.S. Environmental Protection Agency - WaterSense records.
* **Automation Method:** Normalize the opportunity model identifiers, perform an exact active-record lookup, apply category compatibility filters, and return only the required native source fields.
* **Difficulty:** Easy to Medium

**Validation:**
The official WaterSense commercial guidance and fixture criteria were checked. An exact product specification can supply proposed rated gallons per flush, but no retained exact-product fixture or category adapter currently proves the lookup. The source does not supply existing installed performance or usage frequency.

**■ Standard 1.2 — Requirement-Based Proposed Flush Fixture Resolution**

**Purpose:**
Interpret the linked opportunity requirements and determine whether they identify a compatible flush fixture rating.

**Source:**
U.S. Environmental Protection Agency - WaterSense

**WaterSense commercial-building resources:**
[https://www.epa.gov/watersense/commercial-buildings](https://www.epa.gov/watersense/commercial-buildings)

**WaterSense at Work best-management-practice guide:**
[https://www.epa.gov/watersense/best-management-practices](https://www.epa.gov/watersense/best-management-practices)

**WaterSense urinal criteria:**
[https://www.epa.gov/watersense/urinals](https://www.epa.gov/watersense/urinals)

**Lookup Inputs:**

* Fixture requirements from the linked opportunity
* Fixture type and application
* Required water-use criterion

**Value Needed:**

* Eligible compatible proposed fixture population and a documented low, median, and high rated gallons per flush, or no value when no compatible fixture remains

**How to Use:**

1. Extract the application, capacity, certification, and performance limits from the linked high-efficiency toilets and urinals opportunity requirements.
2. Filter the official current-product population by every mandatory requirement, product-family boundary, active specification, and native test unit.
3. Reject the path when no compatible record remains; when several records remain, keep the eligible population and calculate a documented low, median, and high value without selecting the contractor's future product.
4. Return eligible compatible proposed fixture population and a documented low, median, and high rated gallons per flush, or no value when no compatible fixture remains.
5. Retain the source version, complete filters, eligible record identities, population size, native units, summary rule, and no-result reason.

**Automation:**

* **Selected Strategy:** Requirement-based candidate-set resolution from the official U.S. Environmental Protection Agency - WaterSense population.
* **Automation Method:** Parse the opportunity requirements, apply exact product-family and performance filters, preserve the eligible population, and calculate deterministic low, median, and high native-unit results.
* **Difficulty:** Easy to Medium

**Validation:**
The official WaterSense criteria define compatible proposed rated gallons per flush requirements. No retained qualified-product population currently proves the requirement filters, population size, or low, median, and high result, and the source does not supply existing ratings or usage frequency.
