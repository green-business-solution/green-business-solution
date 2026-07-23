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
├─ Backup Technology and Fuel Type (User)
├─ Routine Test Fuel
│  ├─ Test Fuel Use from Product Label, Manufacturer Document, or Commissioning Record (Linked Opportunity)
│  ├─ Scheduled Test Hours from Maintenance Plan or Contractor Specification (Linked Opportunity)
│  └─ No Routine Fuel Estimate Without Both Documented Values (Derived)
├─ Standby Electricity
│  ├─ Standby Input from Product Label, Manufacturer Document, or Commissioning Record (Linked Opportunity)
│  ├─ Energized Hours from Controls Schedule or Commissioning Record (Linked Opportunity)
│  └─ No Standby Electricity Estimate Without Both Documented Values (Derived)
├─ Blocked Until Routine-Use Documentation Is Available (Derived)
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
