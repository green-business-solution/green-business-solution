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
├─ Annual water and heating-resource reduction
│  ├─ In-Scope Equipment Count (User)
│  ├─ Recognizable Fixture Usage Pattern (User)
│  ├─ Annual uses per fixture (User)
│  ├─ Typical minutes per use (User)
│  ├─ Business Activity (Profile)
│  ├─ Water-heating resource or cold-only selection (User)
│  ├─ Hot-water fraction when nonzero (User)
│  ├─ Hot-water temperature rise when nonzero (User)
│  ├─ Water-heater efficiency when nonzero (User)
│  ├─ Fixture selection
│  │  ├─ Existing fixture type (User)
│  │  └─ Existing rated flow (User)
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

1. Validate these inputs and preserve the source of each supplied value: Exact proposed fixture make and model from the linked opportunity; Fixture type and application.
2. Identify the fixture type and application, validate an exact model or requirement set, return the applicable rated flow or flush volume, and retain the specification and source location.
3. Reject missing, ambiguous, incompatible, or out-of-scope records instead of inserting a generic default.
4. Return proposed rated flow with units and product provenance.
5. Store the source version, selected record or method, input units, and any warnings with the result.

**Automation:**

* **Selected Strategy:** Specification lookup for an exact proposed fixture or a compatible WaterSense requirement.
* **Automation Method:** Identify the fixture type and application, validate an exact model or requirement set, return the applicable rated flow or flush volume, and retain the specification and source location.
* **Difficulty:** Easy to Medium

**Validation:**
The official WaterSense commercial resources, best-practice guide, and fixture criteria were checked. Proposed performance can be supported after an exact specification match, but existing installed ratings and commercial usage frequency remain separate unresolved inputs.

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

* One compatible proposed rated flow, or no value when the requirements do not identify a supported product

**How to Use:**

1. Validate these inputs and preserve the source of each supplied value: Fixture requirements from the linked opportunity; Fixture type and application; Required water-use criterion.
2. Identify the fixture type and application, validate an exact model or requirement set, return the applicable rated flow or flush volume, and retain the specification and source location.
3. Reject missing, ambiguous, incompatible, or out-of-scope records instead of inserting a generic default.
4. Return one compatible proposed rated flow, or no value when the requirements do not identify a supported product.
5. Store the source version, selected record or method, input units, and any warnings with the result.

**Automation:**

* **Selected Strategy:** Specification lookup for an exact proposed fixture or a compatible WaterSense requirement.
* **Automation Method:** Identify the fixture type and application, validate an exact model or requirement set, return the applicable rated flow or flush volume, and retain the specification and source location.
* **Difficulty:** Easy to Medium

**Validation:**
The official WaterSense commercial resources, best-practice guide, and fixture criteria were checked. Proposed performance can be supported after an exact specification match, but existing installed ratings and commercial usage frequency remain separate unresolved inputs.
