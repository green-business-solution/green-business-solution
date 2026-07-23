# Information Card — Exterior Lighting Replacement

**Retrofits included:** Exterior/site lighting retrofit

**Overview:** Exterior lighting replacement reduces electricity use by lowering fixture input power while preserving the required lighting application and operating schedule.

**Broader Formula**

```text
Annual Operational Savings =
Annual Electricity Reduction × Bill-Derived Electricity Rate
```

**Expanded Formula**

```text
Annual Operational Savings = In-Scope Equipment Count × (Existing Input Power - Proposed Input Power) × Annual Operating Hours × Bill-Derived Electricity Rate

Fixture Input Kilowatts = Fixture Input Watts / 1000
```

**Information Tree**

```text
Annual Operational Savings
├─ Annual Electricity Reduction
│  ├─ Replacement Fixture Count (User)
│  ├─ Existing Fixture Watts
│  │  ├─ Existing Fixture Type or Application (User)
│  │  ├─ Existing Nameplate, Photometric Report, or Field Measurement (Project Document)
│  │  └─ Standard 1.1 — Existing Fixture Wattage Benchmark
│  ├─ New Fixture Watts
│  │  ├─ Linked Opportunity names an exact replacement product
│  │  │  ├─ Exact Product Information (Linked Opportunity)
│  │  │  └─ Standard 1.2 — Exact New Fixture Wattage Lookup
│  │  └─ Linked Opportunity specifies requirements but no exact product
│  │     ├─ Product Requirements (Linked Opportunity)
│  │     └─ Standard 1.3 — Requirement-Based New Fixture Wattage Resolution
│  ├─ Annual Operating Hours
│  │  └─ Exterior Lighting Operating Pattern (User)
│  │     ├─ Lighting follows a fixed or business schedule
│  │     │  ├─ Lighting Hours per Operating Day (User)
│  │     │  ├─ Operating Days per Week (User)
│  │     │  ├─ Active Weeks per Year (User)
│  │     │  └─ Standard 2.1 — Fixed-Schedule Lighting Hours
│  │     └─ Lighting is dusk-to-dawn or photocell-controlled
│  │        ├─ Control Type and Timing Offset (User)
│  │        ├─ Site Location (Profile)
│  │        └─ Standard 2.2 — Daylight-Based Lighting Hours
│  └─ Standard 3.1 — Lighting-Replacement Calculation
└─ Bill-Derived Electricity Rate
   ├─ Electricity Use (Bill)
   ├─ Variable Delivery Charges (Bill)
   ├─ Variable Generation Charges (Bill)
   └─ Avoidable Electricity Rate (Derived)
```

**■ Standard 1.1 — Existing Fixture Wattage Benchmark**

**Purpose:**
Select one existing exterior-fixture wattage when a nameplate, photometric report, or field measurement is unavailable.

**Source:**
U.S. DOE, U.S. EPA, and National Laboratory of the Rockies benchmark sources

**2015 U.S. Lighting Market Characterization:**
[https://www.energy.gov/cmei/ssl/2015-us-lighting-market-characterization](https://www.energy.gov/cmei/ssl/2015-us-lighting-market-characterization)

**Lookup Inputs:**

* Existing fixture type or exterior application
* Building and site context
* Exact existing wattage from a Project Document, when available

**Value Needed:**

* One existing input-watt value per fixture

**Input Bindings:**

* Existing fixture type or exterior application ← User at `Annual Operational Savings > Annual Electricity Reduction > Existing Fixture Watts > Existing Fixture Type or Application`. Pass the exact bound Existing fixture type or exterior application to Existing Fixture Wattage Benchmark when computing One existing input-watt value per fixture; do not substitute a value from another tree path.
* Building and site context ← Profile at `Annual Operational Savings > Annual Electricity Reduction > Annual Operating Hours > Exterior Lighting Operating Pattern > Lighting is dusk-to-dawn or photocell-controlled > Site Location`. Pass the exact bound Building and site context to Existing Fixture Wattage Benchmark when computing One existing input-watt value per fixture; do not substitute a value from another tree path.
* Exact existing wattage from a Project Document, when available ← Project Document at `Annual Operational Savings > Annual Electricity Reduction > Existing Fixture Watts > Existing Nameplate, Photometric Report, or Field Measurement`. Pass the exact bound Exact existing wattage from a Project Document, when available to Existing Fixture Wattage Benchmark when computing One existing input-watt value per fixture; do not substitute a value from another tree path.

**Output Bindings:**

* One existing input-watt value per fixture → `existing_kW` (kW/fixture; PER_FIXTURE) at `Annual Operational Savings > Annual Electricity Reduction > Existing Fixture Watts > Standard 1.1 - Existing Fixture Wattage Benchmark`.

**How to Use:**

1. Use the exact nameplate, photometric report, or field measurement when available.
2. Otherwise map the recognizable application to the reviewed DOE outdoor application classes, such as commercial building exterior, parking, roadway, billboard, or sports field.
3. Select the published application-average system wattage for that class; do not reuse FEMP's proposed-efficacy table as an existing-equipment baseline.
4. Return one wattage value and feed it to the displayed lighting replacement formula.
5. Retain the source version, application mapping, selected row, unit, and fallback level.

**Automation:**

* **Selected Strategy:** Category-specific deterministic selection from an explicitly implemented and evidenced compatible source population or equation.
* **Automation Method:** Apply the category's documented source-version and compatibility filters, execute its exact numeric rule, and retain the selected output, unit, scope, fixture, and population or equation provenance. Report a limitation when that source-specific implementation is absent.
* **Difficulty:** Medium

**Validation:**
DOE's 2015 U.S. Lighting Market Characterization Table 4.29 reports application-specific outdoor average system wattages. The retained source fixture records the reviewed rows and scope. The values are screening benchmarks, not project-specific nameplate values, and a category calculation golden fixture has not yet been added.

**■ Standard 1.2 — Exact New Fixture Wattage Lookup**

**Purpose:**
Resolve input watts when the linked opportunity names an exact replacement luminaire.

**Source:**
DesignLights Consortium - Solid-State Lighting Qualified Products List

**DLC API and data download user guide:**
[https://designlights.org/wp-content/uploads/2021/08/DLC_API-and-Data-Access-User-Guide_FINAL_08022021.pdf](https://designlights.org/wp-content/uploads/2021/08/DLC_API-and-Data-Access-User-Guide_FINAL_08022021.pdf)

**SSL V6.0 and LUNA V2.0 Technical Requirements:**
[https://designlights.org/wp-content/uploads/2025/11/SSL-V6-LUNA-V2-TR_final_12082025.pdf](https://designlights.org/wp-content/uploads/2025/11/SSL-V6-LUNA-V2-TR_final_12082025.pdf)

**Lookup Inputs:**

* Exact replacement product information from the linked opportunity
* Exterior lighting application

**Value Needed:**

* Exact proposed input watts per fixture with product provenance

**Input Bindings:**

* Exact replacement product information from the linked opportunity ← Linked Opportunity at `Annual Operational Savings > Annual Electricity Reduction > New Fixture Watts > Linked Opportunity names an exact replacement product > Exact Product Information`. Apply the exact bound Exact replacement product information from the linked opportunity to resolve and validate the authoritative record before Exact New Fixture Wattage Lookup emits Exact proposed input watts per fixture with product provenance.
* Exterior lighting application ← Linked Opportunity at `Annual Operational Savings > Annual Electricity Reduction > New Fixture Watts > Linked Opportunity names an exact replacement product > Exact Product Information`. Apply the exact bound Exterior lighting application to resolve and validate the authoritative record before Exact New Fixture Wattage Lookup emits Exact proposed input watts per fixture with product provenance.

**Output Bindings:**

* Exact proposed input watts per fixture with product provenance → `proposed_kW` (kW/fixture; RECORD_SET) at `Annual Operational Savings > Annual Electricity Reduction > New Fixture Watts > Linked Opportunity names an exact replacement product > Standard 1.2 - Exact New Fixture Wattage Lookup`.

**How to Use:**

1. Read the exact manufacturer, model, and product configuration from the linked exterior lighting replacement opportunity.
2. Query the official source for the exact model and filter by application, capacity, active specification, and the native certified fields required by this formula.
3. Require one compatible record; reject partial model matches, inactive listings, incompatible configurations, and records whose native test unit does not match the formula.
4. Return exact proposed input watts per fixture with product provenance.
5. Retain the source version, exact record identity, matched model text, returned native fields and units, and any ambiguity decision.

**Automation:**

* **Selected Strategy:** Exact linked-opportunity product match against the official U.S. Department of Energy FEMP and DesignLights Consortium records.
* **Automation Method:** Normalize the opportunity model identifiers, perform an exact active-record lookup, apply category compatibility filters, and return only the required native source fields.
* **Difficulty:** Medium

**Validation:**
The official DLC data-access guide documents tokenized SSL QPL CSV downloads, and the technical requirements define model, application, light-output, efficacy, input-power, status, and version fields. No authenticated QPL extract, retained exact-product fixture, or category adapter is present, so implementation execution is not yet proved.

**■ Standard 1.3 — Requirement-Based New Fixture Wattage Resolution**

**Purpose:**
Interpret performance requirements when the linked opportunity does not name an exact replacement product.

**Source:**
DesignLights Consortium - Solid-State Lighting Qualified Products List

**DLC API and data download user guide:**
[https://designlights.org/wp-content/uploads/2021/08/DLC_API-and-Data-Access-User-Guide_FINAL_08022021.pdf](https://designlights.org/wp-content/uploads/2021/08/DLC_API-and-Data-Access-User-Guide_FINAL_08022021.pdf)

**SSL V6.0 and LUNA V2.0 Technical Requirements:**
[https://designlights.org/wp-content/uploads/2025/11/SSL-V6-LUNA-V2-TR_final_12082025.pdf](https://designlights.org/wp-content/uploads/2025/11/SSL-V6-LUNA-V2-TR_final_12082025.pdf)

**Lookup Inputs:**

* Product requirements from the linked opportunity
* Exterior lighting application
* Required light output or performance criteria

**Value Needed:**

* One selected compatible QPL input-watt value, with the eligible population, filters, population size, and median rule retained internally

**Input Bindings:**

* Product requirements from the linked opportunity ← Linked Opportunity at `Annual Operational Savings > Annual Electricity Reduction > New Fixture Watts > Linked Opportunity specifies requirements but no exact product > Product Requirements`. Apply the exact bound Product requirements from the linked opportunity as a compatibility filter before Requirement-Based New Fixture Wattage Resolution emits One selected compatible QPL input-watt value, with the eligible population, filters, population size, and median rule retained internally.
* Exterior lighting application ← Linked Opportunity at `Annual Operational Savings > Annual Electricity Reduction > New Fixture Watts > Linked Opportunity specifies requirements but no exact product > Product Requirements`. Apply the exact bound Exterior lighting application as a compatibility filter before Requirement-Based New Fixture Wattage Resolution emits One selected compatible QPL input-watt value, with the eligible population, filters, population size, and median rule retained internally.
* Required light output or performance criteria ← Linked Opportunity at `Annual Operational Savings > Annual Electricity Reduction > New Fixture Watts > Linked Opportunity specifies requirements but no exact product > Product Requirements`. Apply the exact bound Required light output or performance criteria as a compatibility filter before Requirement-Based New Fixture Wattage Resolution emits One selected compatible QPL input-watt value, with the eligible population, filters, population size, and median rule retained internally.

**Output Bindings:**

* One selected compatible QPL input-watt value, with the eligible population, filters, population size, and median rule retained internally → `existing_kW` (kW/fixture; RECORD_SET) at `Annual Operational Savings > Annual Electricity Reduction > New Fixture Watts > Linked Opportunity specifies requirements but no exact product > Standard 1.3 - Requirement-Based New Fixture Wattage Resolution`.

**How to Use:**

1. Extract the application, capacity, certification, and performance limits from the linked exterior lighting replacement opportunity requirements.
2. Filter the official current-product population by every mandatory requirement, product-family boundary, active specification, and native test unit.
3. Use the source's official recommended or typical value when it provides one; otherwise select the weighted median when valid weights exist, or the ordinary median of the eligible compatible population.
4. Return one selected compatible QPL input-watt value, with the eligible population, filters, population size, and median rule retained internally without choosing a future contractor product arbitrarily.
5. Retain the source version, complete filters, eligible record identities, population size, native units, selection rule, selected value, and fallback level.

**Automation:**

* **Selected Strategy:** Requirement-based candidate-set resolution from the official U.S. Department of Energy FEMP and DesignLights Consortium population.
* **Automation Method:** Parse the opportunity requirements, apply exact product-family and performance filters, preserve the eligible population, and select one official typical value, weighted median, or median in native units.
* **Difficulty:** Medium

**Validation:**
The official DLC data-access guide and SSL technical requirements establish a candidate-filtering method. No retained QPL population currently proves the application, light-output, distribution, mounting, controls, active-status, and version filters or the resulting selected median wattage.

**■ Standard 2.1 — Fixed-Schedule Lighting Hours**

**Purpose:**
Calculate annual exterior-lighting hours for a fixed business or calendar schedule.

**Source:**
U.S. Department of Energy - Commercial Reference Buildings

**Commercial Reference Buildings:**
[https://www.energy.gov/cmei/buildings/commercial-reference-buildings](https://www.energy.gov/cmei/buildings/commercial-reference-buildings)

**Lookup Inputs:**

* Lighting hours per operating day
* Operating days per week
* Active weeks per year

**Value Needed:**

* Annual operating hours

**Input Bindings:**

* Lighting hours per operating day ← User at `Annual Operational Savings > Annual Electricity Reduction > Annual Operating Hours > Exterior Lighting Operating Pattern > Lighting follows a fixed or business schedule > Lighting Hours per Operating Day`. Pass the exact bound Lighting hours per operating day to Fixed-Schedule Lighting Hours when computing Annual operating hours; do not substitute a value from another tree path.
* Operating days per week ← User at `Annual Operational Savings > Annual Electricity Reduction > Annual Operating Hours > Exterior Lighting Operating Pattern > Lighting follows a fixed or business schedule > Operating Days per Week`. Pass the exact bound Operating days per week to Fixed-Schedule Lighting Hours when computing Annual operating hours; do not substitute a value from another tree path.
* Active weeks per year ← User at `Annual Operational Savings > Annual Electricity Reduction > Annual Operating Hours > Exterior Lighting Operating Pattern > Lighting follows a fixed or business schedule > Active Weeks per Year`. Pass the exact bound Active weeks per year to Fixed-Schedule Lighting Hours when computing Annual operating hours; do not substitute a value from another tree path.

**Output Bindings:**

* Annual operating hours → `annual_on_hours` (hours/year; PER_YEAR) at `Annual Operational Savings > Annual Electricity Reduction > Annual Operating Hours > Exterior Lighting Operating Pattern > Lighting follows a fixed or business schedule > Standard 2.1 - Fixed-Schedule Lighting Hours`.

**How to Use:**

1. Map the Exterior Lighting Replacement inputs to the documented Fixed-Schedule Lighting Hours source fields or model inputs: Lighting hours per operating day; Operating days per week; Active weeks per year.
2. Route the stated pattern to a fixed-schedule or daylight method, apply all supplied days and seasonal details, validate the annual-hour result, and retain the method and analysis year.
3. When an exact value is unavailable, use only a source-specific retained population or equation with documented filters, numeric rule, unit, scope, and version; otherwise report the implementation limitation.
4. Return one selected annual operating hours.
5. Retain the Fixed-Schedule Lighting Hours source version, exact fields or model inputs, native units, eligible population, population size, selected-value rule, fallback level, selected record, and warnings.

**Automation:**

* **Selected Strategy:** Deterministic calendar calculation from an explicit fixed operating schedule.
* **Automation Method:** Calculate annual hours from operating hours per day, operating days per week, active weeks, holidays, and any declared seasonal exceptions.
* **Difficulty:** Easy to Medium

**Validation:**
The DOE commercial reference-building schedule context was checked. The calendar arithmetic is deterministic when all schedule inputs are supplied, but no category golden fixture exists and a business label alone is not a validated annual-hours value.

**■ Standard 2.2 — Daylight-Based Lighting Hours**

**Purpose:**
Calculate annual exterior-lighting hours for dusk-to-dawn or photocell control.

**Source:**
U.S. Naval Observatory - daylight definitions and data services

**Rise, Set, and Twilight Definitions:**
[https://aa.usno.navy.mil/faq/RST_defs](https://aa.usno.navy.mil/faq/RST_defs)

**Data Services API:**
[https://aa.usno.navy.mil/data/api.html](https://aa.usno.navy.mil/data/api.html)

**Lookup Inputs:**

* Control type and timing offset
* Site location
* Analysis year

**Value Needed:**

* Annual daylight-based operating hours

**Input Bindings:**

* Control type and timing offset ← User at `Annual Operational Savings > Annual Electricity Reduction > Annual Operating Hours > Exterior Lighting Operating Pattern > Lighting is dusk-to-dawn or photocell-controlled > Control Type and Timing Offset`. Pass the exact bound Control type and timing offset to Daylight-Based Lighting Hours when computing Annual daylight-based operating hours; do not substitute a value from another tree path.
* Site location ← Profile at `Annual Operational Savings > Annual Electricity Reduction > Annual Operating Hours > Exterior Lighting Operating Pattern > Lighting is dusk-to-dawn or photocell-controlled > Site Location`. Pass the exact bound Site location to Daylight-Based Lighting Hours when computing Annual daylight-based operating hours; do not substitute a value from another tree path.
* Analysis year ← User at `Annual Operational Savings > Annual Electricity Reduction > Annual Operating Hours > Exterior Lighting Operating Pattern > Lighting follows a fixed or business schedule > Active Weeks per Year`. Pass the exact bound Analysis year to Daylight-Based Lighting Hours when computing Annual daylight-based operating hours; do not substitute a value from another tree path.

**Output Bindings:**

* Annual daylight-based operating hours → `annual_on_hours` (hours/year; PER_YEAR) at `Annual Operational Savings > Annual Electricity Reduction > Annual Operating Hours > Exterior Lighting Operating Pattern > Lighting is dusk-to-dawn or photocell-controlled > Standard 2.2 - Daylight-Based Lighting Hours`.

**How to Use:**

1. Map the Exterior Lighting Replacement inputs to the documented Daylight-Based Lighting Hours source fields or model inputs: Control type and timing offset; Site location; Analysis year.
2. Route the stated pattern to a fixed-schedule or daylight method, apply all supplied days and seasonal details, validate the annual-hour result, and retain the method and analysis year.
3. When an exact value is unavailable, use only a source-specific retained population or equation with documented filters, numeric rule, unit, scope, and version; otherwise report the implementation limitation.
4. Return one selected annual daylight-based operating hours.
5. Retain the Daylight-Based Lighting Hours source version, exact fields or model inputs, native units, eligible population, population size, selected-value rule, fallback level, selected record, and warnings.

**Automation:**

* **Selected Strategy:** Versioned daylight calculation from site location, analysis year, and the declared exterior-lighting control rule.
* **Automation Method:** Resolve local sunrise, sunset, or civil-twilight times, apply the control offset and timezone rules for every day, and sum the resulting annual operating hours.
* **Difficulty:** Easy to Medium

**Validation:**
The USNO daylight definitions and data-services interface were checked. Location-specific calculation is feasible when location, year, timezone, and control offset are supplied, but no category golden fixture exists.

**■ Standard 3.1 — Lighting-Replacement Calculation**

**Purpose:**
Calculate annual electricity reduction from fixture count, existing and proposed watts, and the resolved annual schedule.

**Source:**
DOE FEMP, DesignLights Consortium, DOE reference buildings, and U.S. Naval Observatory

**Purchasing Energy-Efficient Exterior Lighting:**
[https://www.energy.gov/cmei/femp/purchasing-energy-efficient-exterior-lighting](https://www.energy.gov/cmei/femp/purchasing-energy-efficient-exterior-lighting)

**DLC API and data download user guide:**
[https://designlights.org/wp-content/uploads/2021/08/DLC_API-and-Data-Access-User-Guide_FINAL_08022021.pdf](https://designlights.org/wp-content/uploads/2021/08/DLC_API-and-Data-Access-User-Guide_FINAL_08022021.pdf)

**SSL V6.0 and LUNA V2.0 Technical Requirements:**
[https://designlights.org/wp-content/uploads/2025/11/SSL-V6-LUNA-V2-TR_final_12082025.pdf](https://designlights.org/wp-content/uploads/2025/11/SSL-V6-LUNA-V2-TR_final_12082025.pdf)

**Commercial Reference Buildings:**
[https://www.energy.gov/cmei/buildings/commercial-reference-buildings](https://www.energy.gov/cmei/buildings/commercial-reference-buildings)

**Rise, Set, and Twilight Definitions:**
[https://aa.usno.navy.mil/faq/RST_defs](https://aa.usno.navy.mil/faq/RST_defs)

**Data Services API:**
[https://aa.usno.navy.mil/data/api.html](https://aa.usno.navy.mil/data/api.html)

**Lookup Inputs:**

* Replacement fixture count
* Existing fixture watts
* New fixture watts
* Annual operating hours

**Value Needed:**

* Annual electricity reduction in kilowatt-hours

**Input Bindings:**

* Replacement fixture count ← User at `Annual Operational Savings > Annual Electricity Reduction > Replacement Fixture Count`. Pass the exact bound Replacement fixture count to Lighting-Replacement Calculation when computing Annual electricity reduction in kilowatt-hours; do not substitute a value from another tree path.
* Existing fixture watts ← Standard Output at `Annual Operational Savings > Annual Electricity Reduction > Existing Fixture Watts > Standard 1.1 - Existing Fixture Wattage Benchmark`. Pass the exact bound Existing fixture watts to Lighting-Replacement Calculation when computing Annual electricity reduction in kilowatt-hours; do not substitute a value from another tree path.
* New fixture watts ← Standard Output at `Annual Operational Savings > Annual Electricity Reduction > New Fixture Watts > Linked Opportunity names an exact replacement product > Standard 1.2 - Exact New Fixture Wattage Lookup`. Pass the exact bound New fixture watts to Lighting-Replacement Calculation when computing Annual electricity reduction in kilowatt-hours; do not substitute a value from another tree path.
* Annual operating hours ← Standard Output at `Annual Operational Savings > Annual Electricity Reduction > Annual Operating Hours > Exterior Lighting Operating Pattern > Lighting follows a fixed or business schedule > Standard 2.1 - Fixed-Schedule Lighting Hours`. Pass the exact bound Annual operating hours to Lighting-Replacement Calculation when computing Annual electricity reduction in kilowatt-hours; do not substitute a value from another tree path.

**Output Bindings:**

* Annual electricity reduction in kilowatt-hours → `existing_kW` (kW/fixture; PER_FIXTURE) at `Annual Operational Savings > Annual Electricity Reduction > Standard 3.1 - Lighting-Replacement Calculation`.

**How to Use:**

1. Confirm that all fixtures in the row share the same existing watts, proposed watts, and operating schedule.
2. Subtract proposed fixture watts from existing fixture watts and divide the difference by 1,000.
3. Multiply the kilowatt difference by fixture count and annual operating hours.
4. Return annual electricity reduction in kilowatt-hours and keep negative results when the proposed design adds load.
5. Store the fixture and schedule sources used by the calculation.

**Automation:**

* **Selected Strategy:** Deterministic local arithmetic after all connected fixture and schedule processes resolve.
* **Automation Method:** Apply the displayed replacement formula once to each homogeneous fixture group, then sum the annual electricity results.
* **Difficulty:** Easy

**Validation:**
The arithmetic and unit conversion are deterministic and correspond to the displayed formula. The result is executable only when fixture count, existing watts, proposed watts, and annual operating hours have all been resolved. A category-level golden test has not yet been added, and the reviewed source gaps for those inputs remain visible in the connected processes.
