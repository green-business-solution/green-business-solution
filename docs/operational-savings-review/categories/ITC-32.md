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

Avoided Water = Total Annual Active Minutes × (Existing Flow Rate - Proposed Flow Rate)

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
│  │  └─ Standard 1.1 — Flow Fixture Activity Resolution
│  ├─ Existing Fixture
│  │  ├─ Existing Fixture Type or Application (User)
│  │  ├─ Existing Rated Flow from Label, Specification, or Measurement (Project Document)
│  │  └─ Standard 1.2 — Existing Flow Rate Resolution
│  ├─ Water-Heating Service
│  │  ├─ Fixture Uses Hot Water (User)
│  │  ├─ Water-Heating Fuel Type (User)
│  │  ├─ Water-Heater Nameplate or Commissioning Information, if available (Project Document)
│  │  └─ Standard 1.3 — Water-Heating Input Resolution
│  │     └─ Temperature rise (Project Document)
│  └─ Flow Fixture Performance
│     ├─ Linked Opportunity names an exact flow fixture
│     │  ├─ Exact Flow Fixture Product Information (Linked Opportunity)
│     │  └─ Standard 1.4 — Exact Proposed Flow Fixture Rating Lookup
│     └─ Linked Opportunity specifies flow fixture requirements but no exact product
│        ├─ Flow Fixture Requirements (Linked Opportunity)
│        └─ Standard 1.5 — Requirement-Based Proposed Flow Fixture Resolution
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

**■ Standard 1.1 — Flow Fixture Activity Resolution**

**Purpose:**
Resolve total annual active minutes across the complete in-scope fixture group.

**Source:**
U.S. DOE, U.S. EPA, and National Laboratory of the Rockies benchmark sources

**WaterSense at Work fixture methods:**
[https://www.epa.gov/watersense/best-management-practices](https://www.epa.gov/watersense/best-management-practices)

**Lookup Inputs:**

* Supported fixture type
* In-scope fixture count
* Recognizable occupants, customers, rooms, meals, or another source-compatible activity
* Operating days and hours
* Observed fixture-use study when available

**Value Needed:**

* Total annual active minutes across the in-scope fixture group

**Input Bindings:**

* Supported fixture type ← User at `Annual Operational Savings > Annual Water and Heating-Resource Reduction > Existing Fixture > Existing Fixture Type or Application`. Pass the exact bound Supported fixture type to Flow Fixture Activity Resolution when computing Total annual active minutes across the in-scope fixture group; do not substitute a value from another tree path.
* In-scope fixture count ← User at `Annual Operational Savings > Annual Water and Heating-Resource Reduction > In-Scope Fixture Count`. Pass the exact bound In-scope fixture count to Flow Fixture Activity Resolution when computing Total annual active minutes across the in-scope fixture group; do not substitute a value from another tree path.
* Recognizable occupants, customers, rooms, meals, or another source-compatible activity ← User at `Annual Operational Savings > Annual Water and Heating-Resource Reduction > Recognizable Facility Activity > Approximate Occupants, Employees, Customers, Rooms, Beds, or Meals`. Pass the exact bound Recognizable occupants, customers, rooms, meals, or another source-compatible activity to Flow Fixture Activity Resolution when computing Total annual active minutes across the in-scope fixture group; do not substitute a value from another tree path.
* Operating days and hours ← User at `Annual Operational Savings > Annual Water and Heating-Resource Reduction > Recognizable Facility Activity > Operating Days per Week`. Pass the exact bound Operating days and hours to Flow Fixture Activity Resolution when computing Total annual active minutes across the in-scope fixture group; do not substitute a value from another tree path.
* Observed fixture-use study when available ← Project Document at `Annual Operational Savings > Annual Water and Heating-Resource Reduction > Recognizable Facility Activity > Observed Fixture-Use Study or Audit, when available`. Pass the exact bound Observed fixture-use study when available to Flow Fixture Activity Resolution when computing Total annual active minutes across the in-scope fixture group; do not substitute a value from another tree path.

**Output Bindings:**

* Total annual active minutes across the in-scope fixture group → `total_annual_active_minutes` (minutes/year; PROJECT_TOTAL) at `Annual Operational Savings > Annual Water and Heating-Resource Reduction > Recognizable Facility Activity > Standard 1.1 - Flow Fixture Activity Resolution`.

**How to Use:**

1. Use an observed fixture-use study when it supplies total annual active minutes for the complete in-scope group.
2. Otherwise require a supported bathroom faucet, showerhead, or pre-rinse spray-valve method and its exact source-compatible activity driver.
3. Calculate per-fixture activity only as an intermediate, multiply by fixture count exactly once inside this resolver, and return the group total.
4. Do not multiply the returned group total by fixture count again in the savings formula.
5. Retain fixture type, source equation, activity driver, fixture count, operating calendar, selected assumptions, unit, and warnings.

**Automation:**

* **Selected Strategy:** Category-specific deterministic selection from an explicitly implemented and evidenced compatible source population or equation.
* **Automation Method:** Apply the category's documented source-version and compatibility filters, execute its exact numeric rule, and retain the selected output, unit, scope, fixture, and population or equation provenance. Report a limitation when that source-specific implementation is absent.
* **Difficulty:** Medium

**Validation:**
WaterSense at Work documents commercial fixture inventory and savings methods, but the retained source fixture does not yet prove the flow-fixture activity fields and equations. The group-total contract and no-double-count boundary are explicit while source-field execution remains pending.

**■ Standard 1.2 — Existing Flow Rate Resolution**

**Purpose:**
Resolve one existing gallons-per-minute value without using the proposed efficient-product population as the installed baseline.

**Source:**
U.S. DOE, U.S. EPA, and National Laboratory of the Rockies benchmark sources

**WaterSense at Work fixture methods:**
[https://www.epa.gov/watersense/best-management-practices](https://www.epa.gov/watersense/best-management-practices)

**Lookup Inputs:**

* Existing fixture type and application
* Existing label, specification, audit, or measurement when available
* Installed fixture class and vintage when exact data are unavailable

**Value Needed:**

* One existing rated flow in gallons per minute

**Input Bindings:**

* Existing fixture type and application ← User at `Annual Operational Savings > Annual Water and Heating-Resource Reduction > Existing Fixture > Existing Fixture Type or Application`. Pass the exact bound Existing fixture type and application to Existing Flow Rate Resolution when computing One existing rated flow in gallons per minute; do not substitute a value from another tree path.
* Existing label, specification, audit, or measurement when available ← Project Document at `Annual Operational Savings > Annual Water and Heating-Resource Reduction > Existing Fixture > Existing Rated Flow from Label, Specification, or Measurement`. Pass the exact bound Existing label, specification, audit, or measurement when available to Existing Flow Rate Resolution when computing One existing rated flow in gallons per minute; do not substitute a value from another tree path.
* Installed fixture class and vintage when exact data are unavailable ← Project Document at `Annual Operational Savings > Annual Water and Heating-Resource Reduction > Recognizable Facility Activity > Observed Fixture-Use Study or Audit, when available`. Pass the exact bound Installed fixture class and vintage when exact data are unavailable to Existing Flow Rate Resolution when computing One existing rated flow in gallons per minute; do not substitute a value from another tree path.

**Output Bindings:**

* One existing rated flow in gallons per minute → `gpm_existing` (gallons/minute; PER_FIXTURE) at `Annual Operational Savings > Annual Water and Heating-Resource Reduction > Existing Fixture > Standard 1.2 - Existing Flow Rate Resolution`.

**How to Use:**

1. Use the exact existing label, specification, audit, or measurement when available.
2. Otherwise require a separately retained installed-fixture population compatible with fixture type, application, and vintage.
3. Do not use the current WaterSense efficient-product population as the unknown existing baseline.
4. Return one gallons-per-minute value only after the exact record or eligible installed population is documented.
5. If no compatible installed population is retained, report the implementation limitation instead of inventing a flow rate.

**Automation:**

* **Selected Strategy:** Category-specific deterministic selection from an explicitly implemented and evidenced compatible source population or equation.
* **Automation Method:** Apply the category's documented source-version and compatibility filters, execute its exact numeric rule, and retain the selected output, unit, scope, fixture, and population or equation provenance. Report a limitation when that source-specific implementation is absent.
* **Difficulty:** Medium

**Validation:**
WaterSense proposed-product criteria do not supply an installed existing-flow population. No retained installed-flow fixture currently proves a benchmark, so only exact project evidence is supported and the benchmark path remains implementation-pending.

**■ Standard 1.3 — Water-Heating Input Resolution**

**Purpose:**
Resolve one complete hot-water input set, or a legitimate cold-only zero boundary, separately from fixture activity and flow.

**Source:**
U.S. DOE, U.S. EPA, and National Laboratory of the Rockies benchmark sources

**WaterSense at Work fixture methods:**
[https://www.epa.gov/watersense/best-management-practices](https://www.epa.gov/watersense/best-management-practices)

**Lookup Inputs:**

* Confirmed hot-water or cold-only fixture service
* Water-heating resource
* Hot-water fraction
* Temperature rise
* Water-heater efficiency

**Value Needed:**

* One hot-water fraction
* One hot-water temperature rise
* One water-heater efficiency

**Input Bindings:**

* Confirmed hot-water or cold-only fixture service ← User at `Annual Operational Savings > Annual Water and Heating-Resource Reduction > Water-Heating Service > Fixture Uses Hot Water`. Pass the exact bound Confirmed hot-water or cold-only fixture service to Water-Heating Input Resolution when computing One hot-water fraction and One hot-water temperature rise and One water-heater efficiency; do not substitute a value from another tree path.
* Water-heating resource ← Project Document at `Annual Operational Savings > Annual Water and Heating-Resource Reduction > Water-Heating Service > Standard 1.3 - Water-Heating Input Resolution > Temperature rise`. Pass the exact bound Water-heating resource to Water-Heating Input Resolution when computing One hot-water fraction and One hot-water temperature rise and One water-heater efficiency; do not substitute a value from another tree path.
* Hot-water fraction ← User at `Annual Operational Savings > Annual Water and Heating-Resource Reduction > Water-Heating Service > Fixture Uses Hot Water`. Pass the exact bound Hot-water fraction to Water-Heating Input Resolution when computing One hot-water fraction and One hot-water temperature rise and One water-heater efficiency; do not substitute a value from another tree path.
* Temperature rise ← Project Document at `Annual Operational Savings > Annual Water and Heating-Resource Reduction > Water-Heating Service > Standard 1.3 - Water-Heating Input Resolution > Temperature rise`. Pass the exact bound Temperature rise to Water-Heating Input Resolution when computing One hot-water fraction and One hot-water temperature rise and One water-heater efficiency; do not substitute a value from another tree path.
* Water-heater efficiency ← Project Document at `Annual Operational Savings > Annual Water and Heating-Resource Reduction > Water-Heating Service > Water-Heater Nameplate or Commissioning Information, if available`. Pass the exact bound Water-heater efficiency to Water-Heating Input Resolution when computing One hot-water fraction and One hot-water temperature rise and One water-heater efficiency; do not substitute a value from another tree path.

**Output Bindings:**

* One hot-water fraction → `hot_fraction` (fraction; RECORD_SET) at `Annual Operational Savings > Annual Water and Heating-Resource Reduction > Water-Heating Service > Standard 1.3 - Water-Heating Input Resolution`.
* One hot-water temperature rise → `thermal_energy_per_gallon` (energy/gallon; RECORD_SET) at `Annual Operational Savings > Annual Water and Heating-Resource Reduction > Water-Heating Service > Standard 1.3 - Water-Heating Input Resolution`.
* One water-heater efficiency → `heater_efficiency` (fraction; RECORD_SET) at `Annual Operational Savings > Annual Water and Heating-Resource Reduction > Water-Heating Service > Standard 1.3 - Water-Heating Input Resolution`.

**How to Use:**

1. Use zero hot-water contribution only when the fixture is confirmed cold-only.
2. For a hot-water fixture, use exact audit, commissioning, nameplate, or engineering values when available.
3. Keep hot-water fraction, temperature rise, resource, and heater efficiency as one internally consistent input set.
4. Do not borrow a nearby fixture or water-heater process value when any required field is missing.
5. If no source-specific compatible input set is retained, report the implementation limitation and leave the hot-water component unresolved.

**Automation:**

* **Selected Strategy:** Category-specific deterministic selection from an explicitly implemented and evidenced compatible source population or equation.
* **Automation Method:** Apply the category's documented source-version and compatibility filters, execute its exact numeric rule, and retain the selected output, unit, scope, fixture, and population or equation provenance. Report a limitation when that source-specific implementation is absent.
* **Difficulty:** Medium

**Validation:**
The physical conversion is explicit, but no retained commercial flow-fixture and water-heater population currently proves a complete hot-water input set. Exact project inputs and a confirmed cold-only zero boundary are supported; context execution remains pending.

**■ Standard 1.4 — Exact Proposed Flow Fixture Rating Lookup**

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

**Input Bindings:**

* Exact proposed fixture make and model from the linked opportunity ← Linked Opportunity at `Annual Operational Savings > Annual Water and Heating-Resource Reduction > Flow Fixture Performance > Linked Opportunity names an exact flow fixture > Exact Flow Fixture Product Information`. Apply the exact bound Exact proposed fixture make and model from the linked opportunity to resolve and validate the authoritative record before Exact Proposed Flow Fixture Rating Lookup emits Proposed rated flow with units and product provenance.
* Fixture type and application ← Linked Opportunity at `Annual Operational Savings > Annual Water and Heating-Resource Reduction > Flow Fixture Performance > Linked Opportunity names an exact flow fixture > Exact Flow Fixture Product Information`. Apply the exact bound Fixture type and application to resolve and validate the authoritative record before Exact Proposed Flow Fixture Rating Lookup emits Proposed rated flow with units and product provenance.

**Output Bindings:**

* Proposed rated flow with units and product provenance → `gpm_proposed` (gallons/minute; RECORD_SET) at `Annual Operational Savings > Annual Water and Heating-Resource Reduction > Flow Fixture Performance > Linked Opportunity names an exact flow fixture > Standard 1.4 - Exact Proposed Flow Fixture Rating Lookup`.

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

**■ Standard 1.5 — Requirement-Based Proposed Flow Fixture Resolution**

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

**Input Bindings:**

* Fixture requirements from the linked opportunity ← Linked Opportunity at `Annual Operational Savings > Annual Water and Heating-Resource Reduction > Flow Fixture Performance > Linked Opportunity specifies flow fixture requirements but no exact product > Flow Fixture Requirements`. Apply the exact bound Fixture requirements from the linked opportunity as a compatibility filter before Requirement-Based Proposed Flow Fixture Resolution emits One selected proposed rated flow, with the eligible compatible fixture population, selection rule, units, and source provenance retained internally.
* Fixture type and application ← Linked Opportunity at `Annual Operational Savings > Annual Water and Heating-Resource Reduction > Flow Fixture Performance > Linked Opportunity specifies flow fixture requirements but no exact product > Flow Fixture Requirements`. Apply the exact bound Fixture type and application as a compatibility filter before Requirement-Based Proposed Flow Fixture Resolution emits One selected proposed rated flow, with the eligible compatible fixture population, selection rule, units, and source provenance retained internally.
* Required water-use criterion ← Linked Opportunity at `Annual Operational Savings > Annual Water and Heating-Resource Reduction > Flow Fixture Performance > Linked Opportunity specifies flow fixture requirements but no exact product > Flow Fixture Requirements`. Apply the exact bound Required water-use criterion as a compatibility filter before Requirement-Based Proposed Flow Fixture Resolution emits One selected proposed rated flow, with the eligible compatible fixture population, selection rule, units, and source provenance retained internally.

**Output Bindings:**

* One selected proposed rated flow, with the eligible compatible fixture population, selection rule, units, and source provenance retained internally → `gpm_proposed` (gallons/minute; RECORD_SET) at `Annual Operational Savings > Annual Water and Heating-Resource Reduction > Flow Fixture Performance > Linked Opportunity specifies flow fixture requirements but no exact product > Standard 1.5 - Requirement-Based Proposed Flow Fixture Resolution`.

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
