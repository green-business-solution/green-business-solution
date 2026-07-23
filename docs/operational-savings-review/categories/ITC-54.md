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
Annual Operational Impact = -(Annual Test Fuel × Current Fuel Price + Annual Standby Electricity × Bill-Derived Electricity Rate)

Annual Test Fuel = In-Scope Equipment Count × Test Fuel Use per Hour × Annual Test Hours per Unit

Annual Standby Electricity = In-Scope Equipment Count × Standby Power per Unit × Annual Energized Hours per Unit
```

**Information Tree**

```text
Annual Routine Backup-Power Resource Cost
├─ In-Scope Equipment Count (User)
├─ Backup technology (User)
├─ Fuel type (User)
├─ Tested fuel use per operating hour per unit, if known (User)
├─ Standby electric input kW per unit, if known (User)
├─ Scheduled annual test operating hours per unit, if known (User)
├─ Annual standby energized hours per unit, if known (User)
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
   └─ Documented Current Fuel Price (User)
```
