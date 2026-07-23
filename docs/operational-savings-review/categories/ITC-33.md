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
├─ Annual water reduction
│  ├─ In-Scope Equipment Count (User)
│  ├─ Recognizable Flush Usage Pattern (User)
│  ├─ Annual flushes per fixture (User)
│  ├─ Business Activity (Profile)
│  ├─ Fixture selection
│  │  ├─ Existing fixture type (User)
│  │  └─ Existing rated gallons per flush (User)
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

1. Validate these inputs and preserve the source of each supplied value: Exact proposed fixture make and model from the linked opportunity; Fixture type and application.
2. Identify the fixture type and application, validate an exact model or requirement set, return the applicable rated flow or flush volume, and retain the specification and source location.
3. Reject missing, ambiguous, incompatible, or out-of-scope records instead of inserting a generic default.
4. Return proposed rated gallons per flush with units and product provenance.
5. Store the source version, selected record or method, input units, and any warnings with the result.

**Automation:**

* **Selected Strategy:** Specification lookup for an exact proposed fixture or a compatible WaterSense requirement.
* **Automation Method:** Identify the fixture type and application, validate an exact model or requirement set, return the applicable rated flow or flush volume, and retain the specification and source location.
* **Difficulty:** Easy to Medium

**Validation:**
The official WaterSense commercial resources, best-practice guide, and fixture criteria were checked. Proposed performance can be supported after an exact specification match, but existing installed ratings and commercial usage frequency remain separate unresolved inputs.

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

* One compatible proposed rated gallons per flush, or no value when the requirements do not identify a supported product

**How to Use:**

1. Validate these inputs and preserve the source of each supplied value: Fixture requirements from the linked opportunity; Fixture type and application; Required water-use criterion.
2. Identify the fixture type and application, validate an exact model or requirement set, return the applicable rated flow or flush volume, and retain the specification and source location.
3. Reject missing, ambiguous, incompatible, or out-of-scope records instead of inserting a generic default.
4. Return one compatible proposed rated gallons per flush, or no value when the requirements do not identify a supported product.
5. Store the source version, selected record or method, input units, and any warnings with the result.

**Automation:**

* **Selected Strategy:** Specification lookup for an exact proposed fixture or a compatible WaterSense requirement.
* **Automation Method:** Identify the fixture type and application, validate an exact model or requirement set, return the applicable rated flow or flush volume, and retain the specification and source location.
* **Difficulty:** Easy to Medium

**Validation:**
The official WaterSense commercial resources, best-practice guide, and fixture criteria were checked. Proposed performance can be supported after an exact specification match, but existing installed ratings and commercial usage frequency remain separate unresolved inputs.
