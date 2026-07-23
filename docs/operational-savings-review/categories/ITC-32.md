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
│  ├─ Observed Fixture Activity
│  │  ├─ Approximate Uses per Operating Day (User)
│  │  ├─ Operating Days per Week (User)
│  │  ├─ Active Weeks per Year (User)
│  │  ├─ Typical Minutes per Use (User)
│  │  └─ No Usage Estimate Without Observed or Documented Activity (Derived)
│  ├─ Existing Fixture
│  │  ├─ Existing Fixture Type or Application (User)
│  │  ├─ Existing Rated Flow from Label, Specification, or Measurement (User)
│  │  └─ No Existing Flow Value Without a Label, Specification, or Measurement (Derived)
│  ├─ Water-Heating Service
│  │  ├─ Fixture Uses Hot Water (User)
│  │  ├─ Water-Heating Fuel Type (User)
│  │  ├─ Water-Heater Nameplate or Commissioning Information, if available (User)
│  │  └─ No Heating-Resource Estimate Without Documented Temperature and Efficiency Inputs (Derived)
│  └─ Flow Fixture Performance
│     ├─ Linked Opportunity names an exact flow fixture
│     │  ├─ Exact Flow Fixture Product Information (Linked Opportunity)
│     │  └─ Standard 1.1 — Exact Proposed Flow Fixture Rating Lookup
│     └─ Linked Opportunity specifies flow fixture requirements but no exact product
│        ├─ Flow Fixture Requirements (Linked Opportunity)
│        └─ Standard 1.2 — Requirement-Based Proposed Flow Fixture Resolution
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

**■ Standard 1.1 — Exact Proposed Flow Fixture Rating Lookup**

**Purpose:**
Resolve the proposed rated flow when the linked opportunity names an exact fixture.

**Source:**
U.S. Environmental Protection Agency - WaterSense

**WaterSense commercial-building resources:**
[https://www.epa.gov/watersense/commercial-buildings](https://www.epa.gov/watersense/commercial-buildings)

**WaterSense at Work best-management-practice guide:**
[https://www.epa.gov/watersense/best-management-practices](https://www.epa.gov/watersense/best-management-practices)

**Lookup Inputs:**

* Exact proposed fixture make and model from the linked opportunity
* Fixture type and application

**Value Needed:**

* Proposed rated flow with units and product provenance

**How to Use:**

1. Read the exact manufacturer, model, and product configuration from the linked low-flow plumbing fixtures opportunity.
2. Query the official source for the exact model and filter by application, capacity, active specification, and the native certified fields required by this formula.
3. Require one compatible record; reject partial model matches, inactive listings, incompatible configurations, and records whose native test unit does not match the formula.
4. Return proposed rated flow with units and product provenance.
5. Retain the source version, exact record identity, matched model text, returned native fields and units, and any ambiguity decision.

**Automation:**

* **Selected Strategy:** Exact linked-opportunity product match against the official U.S. Environmental Protection Agency - WaterSense records.
* **Automation Method:** Normalize the opportunity model identifiers, perform an exact active-record lookup, apply category compatibility filters, and return only the required native source fields.
* **Difficulty:** Easy to Medium

**Validation:**
The official WaterSense commercial guidance and fixture criteria were checked. An exact product specification can supply proposed rated flow, but no retained exact-product fixture or category adapter currently proves the lookup. The source does not supply existing installed performance or usage frequency.

**■ Standard 1.2 — Requirement-Based Proposed Flow Fixture Resolution**

**Purpose:**
Interpret the linked opportunity requirements and determine whether they identify a compatible flow fixture rating.

**Source:**
U.S. Environmental Protection Agency - WaterSense

**WaterSense commercial-building resources:**
[https://www.epa.gov/watersense/commercial-buildings](https://www.epa.gov/watersense/commercial-buildings)

**WaterSense at Work best-management-practice guide:**
[https://www.epa.gov/watersense/best-management-practices](https://www.epa.gov/watersense/best-management-practices)

**Lookup Inputs:**

* Fixture requirements from the linked opportunity
* Fixture type and application
* Required water-use criterion

**Value Needed:**

* Eligible compatible proposed fixture population and a documented low, median, and high rated flow, or no value when no compatible fixture remains

**How to Use:**

1. Extract the application, capacity, certification, and performance limits from the linked low-flow plumbing fixtures opportunity requirements.
2. Filter the official current-product population by every mandatory requirement, product-family boundary, active specification, and native test unit.
3. Reject the path when no compatible record remains; when several records remain, keep the eligible population and calculate a documented low, median, and high value without selecting the contractor's future product.
4. Return eligible compatible proposed fixture population and a documented low, median, and high rated flow, or no value when no compatible fixture remains.
5. Retain the source version, complete filters, eligible record identities, population size, native units, summary rule, and no-result reason.

**Automation:**

* **Selected Strategy:** Requirement-based candidate-set resolution from the official U.S. Environmental Protection Agency - WaterSense population.
* **Automation Method:** Parse the opportunity requirements, apply exact product-family and performance filters, preserve the eligible population, and calculate deterministic low, median, and high native-unit results.
* **Difficulty:** Easy to Medium

**Validation:**
The official WaterSense criteria define compatible proposed rated flow requirements. No retained qualified-product population currently proves the requirement filters, population size, or low, median, and high result, and the source does not supply existing ratings or usage frequency.
