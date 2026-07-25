# DOE MEASUR source adapter

This adapter verifies the official AMO Tools Suite repository at commit `bdc33b837d39e3b30d2ad802cde9f49ec5df1e6b`.
It pins the compressed-air leak survey headers, implementations, WebAssembly binding, official C++ golden test, and license by SHA-256 and byte size.
It extracts the exact native constructor fields, method enumeration, units, and output fields from those retained source interfaces.
All module publishers reference one canonical pinned-repository source schema, while module-specific interfaces remain in their typed model input schemas.
This keeps source and release metadata independent of module publication order.

The adapter validates reviewed estimate-method project inputs and compiles the retained `CompressedAirLeakSurvey` and `CompressedAirReduction` C++ sources with a minimal harness matching the official golden fixture.
It runs both compilation and native execution under a macOS `sandbox-exec` profile that denies network access.
Validated values are passed as runtime arguments to a constant harness rather than embedded in generated C++ source.
The macOS linker UUID is disabled so the same pinned harness and compiler produce a stable executable identity across valid project inputs.
The retained fixture produces 0.1 flow per leak, 51,840 annual flow-volume, 138.24 kWh per year, and 16.5888 annual utility cost.

The supported adapter boundary maps the native `totalFlowRate` output to ITC-43 `leak_flow` and the validated native compressor-specific-power input to `compressor_specific_power`.
The adapter is designed to publish the pinned source release, source files, schema, model version, model input contract, calculation run, selected values, provenance, and an estimate-only scope warning to the research database.
The manifest declares `END_TO_END_REAL` evidence for the reviewed estimate-method path in ITC-43.
That level is current execution-verified evidence only when the content-bound run record covers every exact retained test against the same source fingerprint.

The equipment adapter also pins the native `MotorEfficiency`, `PSATResult`, and `FanResult` headers, implementations, WebAssembly bindings, upstream C++ golden tests, complete compiled-source Git tree, and source interfaces.
It rejects a dirty source checkout, verifies every critical retained file by byte size and SHA-256, compiles the exact pinned dependency set, and executes one combined native harness under the same network-denied sandbox.
Its constant harness parses validated runtime arguments, which keeps the recorded executable identity independent of calculation inputs.

The retained motor fixture compares a 150 hp, 1,600 rpm standard motor with an exact specified-efficiency replacement at the same 25 percent load.
The native efficiencies are 0.8867837735583464 and 0.9226247725330855, which map directly to ITC-38 `η_existing` and `η_proposed`.

The retained PSAT fixture holds the exact 1,000 gpm and 277 foot pump duty constant across the official baseline and modified calculation.
The native input-power outputs are 150 kW and 149.64012475884022 kW, which map directly to ITC-40 `existing_input_kW` and `proposed_input_kW`.

The retained fan fixture holds the exact 129,691 cfm airflow and pressure duty constant across the official baseline and modified calculation.
The native input-power outputs are 460 kW and 460.00014402241186 kW, which map directly to ITC-41 `existing_input_kW` and `proposed_input_kW`.
The slightly higher proposed value is retained because a real engineering model result must not be altered to manufacture positive savings.

The retained cooling-tower fixture compares the official one-speed and variable-speed control branches at the same rated fan power, water temperatures, wet-bulb temperature, and operating hours.
The native avoided fan energy is 7.7288189657612065 kWh, which maps directly to ITC-36 `avoided_fan_kWh`.
Compatible control profiles that increase energy retain the model's negative avoided-energy result instead of being presented as savings.

All four equipment paths are designed to publish distinct calculation runs, typed module input schemas, selected values, formula bindings, source-artifact provenance, and exact-boundary warnings to the research database.
Together with the compressed-air path, the manifests declare five independent `END_TO_END_REAL` category proofs from the pinned official implementation.
Those declarations fail closed to `DOCUMENTATION_ONLY` unless the current content-bound run record verifies every required exact test.

The decibel, bag, and orifice measurement branches are not accepted by this adapter until each has an independent project-input contract and retained native fixture.
The boiler, recirculation, refrigeration EC motor, kitchen ventilation, variable-speed, compressed-air equipment and controls, waste-heat, process-heating, steam-trap, and filtration paths remain unproved until their exact calculator modules, input mappings, project fixtures, and normalized publications are implemented.
