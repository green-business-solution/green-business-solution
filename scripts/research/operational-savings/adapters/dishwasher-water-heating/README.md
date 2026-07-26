# Dishwasher water-heating adapter

This adapter verifies and reads the retained March 2024 ENERGY STAR Commercial Food Service Equipment Calculator.

It inspects exact cells and formulas in `Dishwasher Calcs` and `General Assumptions`.

The local equation preserves the workbook's water density, specific heat, building and booster temperature-rise stages, heater efficiency, and Btu conversion.

Rack-machine gallons per rack and flight or conveyor gallons per hour remain separate native activity bases.

Low-temperature machines use the building water-heating stage.

High-temperature machines use both the building and booster stages.

The proof case uses one resource across both stages because the current category formula exposes one scalar resource term per activity.

Mixed-resource building and booster systems fail closed until the category contract has resource-specific terms.

The adapter requires project water quantities, temperature rises, efficiencies, sanitation method, resource, and native activity basis.

The workbook's example inputs are retained as formula evidence and never substitute for missing project facts.

Run the focused proof offline:

```bash
OS_RESEARCH_NETWORK=disabled npx vitest run scripts/research/operational-savings/tests/dishwasher-water-heating-real.test.mjs
```
