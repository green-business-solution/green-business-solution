# Information Card — Backup Power Routine Resource Use

**Retrofits included:** Resilience / backup power system

**Overview:** Backup power equipment can add routine testing fuel and standby electricity even when outage operation and resilience value are excluded.

**Broader Formula**

```text
Annual Operational Impact =
− Routine Fuel and Electricity Cost
```

**Expanded Formula**

```text
Annual Operational Impact = -(Selected Annual Test Fuel × Current Fuel Price + Selected Annual Standby kWh × Bill-Derived Electricity Rate)

Exact path:

Exact Annual Test Fuel = In-Scope Equipment Count × Test Fuel Use per Hour × Annual Test Hours per Unit

Exact Annual Standby kWh = In-Scope Equipment Count × Standby Power per Unit × Annual Energized Hours per Unit

Benchmark path:

Benchmark Annual Test Fuel = In-Scope Equipment Count × Benchmark Annual Test Fuel Per Unit

Benchmark Annual Standby kWh = In-Scope Equipment Count × Benchmark Annual Standby kWh Per Unit

Selected Annual Test Fuel is either Exact Annual Test Fuel or Benchmark Annual Test Fuel.

Selected Annual Standby kWh is either Exact Annual Standby kWh or Benchmark Annual Standby kWh.

For a documented full-load diesel-generator test only:

Benchmark Annual Test Fuel Per Unit = Full Load Diesel Coefficient × Rated Capacity kW × Annual Test Hours per Unit
```

**Information Tree**

```text
Annual Routine Backup-Power Resource Cost
├─ In-Scope Equipment Count (User)
├─ Backup Technology and Fuel Type (User)
├─ Exact Routine-Use Path
│  ├─ Tested Fuel Use per Operating Hour per Unit from Manufacturer or Commissioning Record (Project Document)
│  ├─ Scheduled Annual Test Operating Hours per Unit from Maintenance Plan or Contractor Specification (Project Document)
│  ├─ Standby Electric Input per Unit from Product or Commissioning Record (Project Document)
│  ├─ Annual Standby Energized Hours per Unit from Controls or Commissioning Record (Project Document)
│  └─ Standard 1.1 — Exact Backup-Power Routine-Use Input Resolution
├─ Full-Load Diesel Routine-Test Benchmark Path
│  ├─ Diesel Generator Rated Capacity in Kilowatts (Project Document)
│  ├─ Scheduled Annual Full-Load Test Operating Hours per Unit (Project Document)
│  └─ Standard 1.2 — FEMA Full-Load Diesel Test-Fuel Calculation
├─ No Defensible Annual Standby Benchmark Retained (Derived)
├─ Selected Exact or Benchmark Annual Routine-Use Result (Derived)
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
   └─ Current Fuel Price from Receipt, Contract, or Operating Record (Project Document)
```

**■ Standard 1.1 — Exact Backup-Power Routine-Use Input Resolution**

**Purpose:**
Resolve one complete project-specific routine-test and standby input set without replacing missing technical fields with generic maintenance guidance.

**Source:**
U.S. DOE, U.S. EPA, and National Laboratory of the Rockies benchmark sources

**Federal emergency-generator operations guidance:**
[https://www.energy.gov/cmei/femp/equipment-operations-and-maintenance-summaries](https://www.energy.gov/cmei/femp/equipment-operations-and-maintenance-summaries)

**FEMA full-load diesel generator fuel formula:**
[https://emilms.fema.gov/IS0815/groups/90.html](https://emilms.fema.gov/IS0815/groups/90.html)

**Lookup Inputs:**

* Tested fuel use per operating hour per unit
* Scheduled annual test operating hours per unit
* Standby electric input kilowatts per unit
* Annual standby energized hours per unit

**Value Needed:**

* One exact backup-power routine-use input set

**Input Bindings:**

* Tested fuel use per operating hour per unit ← Project Document at `Annual Routine Backup-Power Resource Cost > Exact Routine-Use Path > Tested Fuel Use per Operating Hour per Unit from Manufacturer or Commissioning Record`. Apply the exact bound Tested fuel use per operating hour per unit to resolve and validate the authoritative record before Exact Backup-Power Routine-Use Input Resolution emits One exact backup-power routine-use input set.
* Scheduled annual test operating hours per unit ← Project Document at `Annual Routine Backup-Power Resource Cost > Exact Routine-Use Path > Scheduled Annual Test Operating Hours per Unit from Maintenance Plan or Contractor Specification`. Apply the exact bound Scheduled annual test operating hours per unit to resolve and validate the authoritative record before Exact Backup-Power Routine-Use Input Resolution emits One exact backup-power routine-use input set.
* Standby electric input kilowatts per unit ← Project Document at `Annual Routine Backup-Power Resource Cost > Exact Routine-Use Path > Standby Electric Input per Unit from Product or Commissioning Record`. Apply the exact bound Standby electric input kilowatts per unit to resolve and validate the authoritative record before Exact Backup-Power Routine-Use Input Resolution emits One exact backup-power routine-use input set.
* Annual standby energized hours per unit ← Project Document at `Annual Routine Backup-Power Resource Cost > Exact Routine-Use Path > Annual Standby Energized Hours per Unit from Controls or Commissioning Record`. Apply the exact bound Annual standby energized hours per unit to resolve and validate the authoritative record before Exact Backup-Power Routine-Use Input Resolution emits One exact backup-power routine-use input set.

**Output Bindings:**

* One exact backup-power routine-use input set → `exact_backup_routine_input_set` (record set; RECORD_SET) at `Annual Routine Backup-Power Resource Cost > Exact Routine-Use Path > Standard 1.1 - Exact Backup-Power Routine-Use Input Resolution`.

**How to Use:**

1. Read fuel use per hour and annual test hours per unit from a manufacturer document, commissioning record, maintenance plan, or contractor specification.
2. Read standby input and annual energized hours per unit from a product document, controls schedule, or commissioning record.
3. Require compatible equipment identity, fuel unit, operating state, and reporting period for every retained field.
4. Return one complete exact input set for the supported fuel and standby components.
5. If a required component is absent, report it as unresolved. Do not substitute general maintenance guidance, zero, or a nearby technology value.

**Automation:**

* **Selected Strategy:** Exact linked-opportunity product match against the official U.S. DOE, U.S. EPA, and National Laboratory of the Rockies benchmark sources records.
* **Automation Method:** Normalize the opportunity model identifiers, perform an exact active-record lookup, apply category compatibility filters, and return only the required native source fields.
* **Difficulty:** Medium

**Validation:**
The exact path is deterministic when compatible Project Documents supply the required fields. No category golden fixture is retained, so implementation proof remains pending.

**■ Standard 1.2 — FEMA Full-Load Diesel Test-Fuel Calculation**

**Purpose:**
Calculate annual routine-test diesel fuel per equipment unit from the FEMA full-load coefficient, rated generator capacity, and separately documented annual full-load test hours.

**Source:**
U.S. DOE, U.S. EPA, and National Laboratory of the Rockies benchmark sources

**Federal emergency-generator operations guidance:**
[https://www.energy.gov/cmei/femp/equipment-operations-and-maintenance-summaries](https://www.energy.gov/cmei/femp/equipment-operations-and-maintenance-summaries)

**FEMA full-load diesel generator fuel formula:**
[https://emilms.fema.gov/IS0815/groups/90.html](https://emilms.fema.gov/IS0815/groups/90.html)

**Lookup Inputs:**

* Confirmed diesel-generator technology and fuel type
* Diesel generator rated capacity in kilowatts
* Scheduled annual full-load test operating hours per unit

**Value Needed:**

* Annual full-load diesel test fuel per equipment unit

**Input Bindings:**

* Confirmed diesel-generator technology and fuel type ← User at `Annual Routine Backup-Power Resource Cost > Backup Technology and Fuel Type`. Pass the exact bound Confirmed diesel-generator technology and fuel type to FEMA Full-Load Diesel Test-Fuel Calculation when computing Annual full-load diesel test fuel per equipment unit; do not substitute a value from another tree path.
* Diesel generator rated capacity in kilowatts ← Project Document at `Annual Routine Backup-Power Resource Cost > Full-Load Diesel Routine-Test Benchmark Path > Diesel Generator Rated Capacity in Kilowatts`. Pass the exact bound Diesel generator rated capacity in kilowatts to FEMA Full-Load Diesel Test-Fuel Calculation when computing Annual full-load diesel test fuel per equipment unit; do not substitute a value from another tree path.
* Scheduled annual full-load test operating hours per unit ← Project Document at `Annual Routine Backup-Power Resource Cost > Full-Load Diesel Routine-Test Benchmark Path > Scheduled Annual Full-Load Test Operating Hours per Unit`. Pass the exact bound Scheduled annual full-load test operating hours per unit to FEMA Full-Load Diesel Test-Fuel Calculation when computing Annual full-load diesel test fuel per equipment unit; do not substitute a value from another tree path.

**Output Bindings:**

* Annual full-load diesel test fuel per equipment unit → `benchmark_annual_test_fuel_per_unit` (fuel-unit/year; PER_EQUIPMENT_UNIT) at `Annual Routine Backup-Power Resource Cost > Full-Load Diesel Routine-Test Benchmark Path > Standard 1.2 - FEMA Full-Load Diesel Test-Fuel Calculation`.

**How to Use:**

1. Require a diesel generator and a documented full-load routine-test condition.
2. Read rated generator capacity in kilowatts and annual full-load test hours per equipment unit from Project Documents.
3. Calculate test fuel gallons per hour as 0.07 gallon per kilowatt-hour multiplied by rated generator kilowatts.
4. Multiply the calculated gallons per hour by annual full-load test hours per equipment unit to return annual gallons per equipment unit.
5. Do not use the result for part-load operation, another fuel or technology, outage operation, annual test-hour selection, or standby electricity.

**Automation:**

* **Selected Strategy:** Category-specific deterministic selection from an explicitly implemented and evidenced compatible source population or equation.
* **Automation Method:** Apply the category's documented source-version and compatibility filters, execute its exact numeric rule, and retain the selected output, unit, scope, fixture, and population or equation provenance. Report a limitation when that source-specific implementation is absent.
* **Difficulty:** Medium

**Validation:**
The retained FEMA page and deep source fixture prove the 0.07 full-load diesel coefficient and formula. The source does not supply annual test hours or standby electricity, and no category golden fixture is retained, so only the narrow formula is verified while full category execution remains pending.
