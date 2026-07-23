# Information Card — Electric Vehicle Purchase

**Retrofits included:** Electric vehicle purchase

**Overview:** Replacing a light-duty fuel vehicle with an electric vehicle avoids gasoline use and adds electricity use for the same confirmed annual service.

**Broader Formula**

```text
Annual Operational Savings =
Avoided Existing Resource Cost − Added New Resource Cost
```

**Expanded Formula**

```text
Annual Operational Savings = In-Scope Equipment Count × (Avoided Fuel Units × Current Fuel Price - Added Electricity × Bill-Derived Electricity Rate)

Avoided Gallons = Annual Miles / Existing Vehicle Combined Fuel Economy

Added Electricity = Annual Miles × Proposed Vehicle Electricity per 100 Miles / 100
```

**Information Tree**

```text
Annual Operational Savings
├─ Avoided Gasoline Cost
│  ├─ Vehicles Replaced (User)
│  ├─ Annual Miles per Vehicle (User)
│  ├─ Existing Vehicle Make and Model (User)
│  ├─ Approximate Model Year (User)
│  ├─ Additional Version or Drivetrain Details, only when the match is ambiguous (User)
│  ├─ Standard 1.1 — Exact Vehicle Efficiency Lookup
│  ├─ Avoided Gasoline Use (Derived)
│  └─ Current Gasoline Price (User)
├─ Added Electricity Cost
│  ├─ Proposed Vehicle Make and Model (Linked Opportunity)
│  ├─ Approximate Model Year (Linked Opportunity)
│  ├─ Additional Version or Drivetrain Details, only when the match is ambiguous (Linked Opportunity)
│  ├─ Standard 1.1 — Exact Vehicle Efficiency Lookup
│  ├─ Added Electricity Use (Derived)
│  └─ Bill-Derived Electricity Rate
│     ├─ Electricity Use (Bill)
│     ├─ Variable Delivery Charges (Bill)
│     ├─ Variable Generation Charges (Bill)
│     └─ Avoidable Electricity Rate (Derived)
└─ Equivalent Required Vehicle Service Confirmed (User)
```

**■ Standard 1.1 — Exact Vehicle Efficiency Lookup**

**Purpose:**
Match the existing and proposed light-duty vehicles to exact official records and return comparable fuel and electricity use per mile.

**Source:**
U.S. Department of Energy and U.S. Environmental Protection Agency - FuelEconomy.gov

**FuelEconomy.gov web services and bulk downloads:**
[https://www.fueleconomy.gov/feg/ws/index.shtml](https://www.fueleconomy.gov/feg/ws/index.shtml)

**Lookup Inputs:**

* Existing vehicle make and model
* Proposed vehicle make and model
* Approximate model years
* Version or drivetrain details only when needed to resolve an ambiguous match

**Value Needed:**

* Existing combined fuel economy in miles per gallon
* Proposed electricity use in kilowatt-hours per 100 miles at the wall

**How to Use:**

1. Read the exact manufacturer, model, and product configuration from the linked electric vehicle purchase opportunity.
2. Query the official source for the exact model and filter by application, capacity, active specification, and the native certified fields required by this formula.
3. Require one compatible record; reject partial model matches, inactive listings, incompatible configurations, and records whose native test unit does not match the formula.
4. Return existing combined fuel economy in miles per gallon; Proposed electricity use in kilowatt-hours per 100 miles at the wall.
5. Retain the source version, exact record identity, matched model text, returned native fields and units, and any ambiguity decision.

**Automation:**

* **Selected Strategy:** Exact linked-opportunity product match against the official U.S. Department of Energy and U.S. Environmental Protection Agency - FuelEconomy.gov records.
* **Automation Method:** Normalize the opportunity model identifiers, perform an exact active-record lookup, apply category compatibility filters, and return only the required native source fields.
* **Difficulty:** Easy to Medium

**Validation:**
The official downloadable schema and the two exact vehicle records were checked. The retained fixture validates record identity, efficiency fields, units, source version, and the exact-model golden calculation of $1,617 per year. Class-based estimates remain disabled because no compatible population and sample-size fixture has been reviewed.
