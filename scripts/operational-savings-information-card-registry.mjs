const CARD_COPY = {
  "ITC-01": {
    title: "Commercial Building Upgrade Resource Savings",
    overview: "These building envelope, lighting, heating, cooling, and ventilation upgrades reduce annual electricity or fuel use compared with a matched commercial-building baseline."
  },
  "ITC-02": {
    title: "Exterior Lighting Replacement",
    overview: "Exterior lighting replacement reduces electricity use by lowering fixture input power while preserving the required lighting application and operating schedule."
  },
  "ITC-03": {
    title: "High-Efficiency Furnace Replacement",
    overview: "A high-efficiency furnace supplies the same heating service with less annual fuel by improving the certified conversion efficiency."
  },
  "ITC-04": {
    title: "Boiler Controls and Burner Improvements",
    overview: "Improved boiler controls and burner operation reduce fuel use by changing how the boiler responds to load and operating conditions."
  },
  "ITC-05": {
    title: "Duct Sealing and Insulation",
    overview: "Duct sealing and insulation reduce heating and cooling losses between the HVAC equipment and the occupied space."
  },
  "ITC-06": {
    title: "Heat Pump Water Heater",
    overview: "A heat pump water heater replaces part or all of the existing water-heating fuel or electricity with efficient electric heat-pump operation."
  },
  "ITC-07": {
    title: "High-Efficiency Gas Water Heater",
    overview: "A higher-efficiency gas water heater reduces the gas required to deliver the same annual hot-water load."
  },
  "ITC-08": {
    title: "Solar Water Heating",
    overview: "A solar water-heating system supplies useful thermal energy that displaces electricity, gas, or liquid fuel otherwise used by the backup water heater."
  },
  "ITC-09": {
    title: "Water-Heating Recirculation Controls",
    overview: "Recirculation controls reduce pipe heat loss and pump electricity by limiting hot-water circulation to the periods when it is needed."
  },
  "ITC-10": {
    title: "High-Efficiency Refrigeration Equipment",
    overview: "Certified high-efficiency refrigeration equipment reduces annual electricity use for the same refrigerated service."
  },
  "ITC-11": {
    title: "Refrigeration Controls and Heat-Loss Reduction",
    overview: "Refrigeration controls, anti-sweat heater controls, gaskets, curtains, and night covers reduce the affected refrigeration load."
  },
  "ITC-12": {
    title: "Refrigeration EC Motor Replacement",
    overview: "Electronically commutated refrigeration motors reduce input power while providing the same motor and fan duty."
  },
  "ITC-13": {
    title: "Efficient Ice Machine",
    overview: "An efficient ice machine uses less electricity and potable water for the same annual quantity and type of ice production."
  },
  "ITC-14": {
    title: "Building Envelope and Control Upgrade Screening",
    overview: "These envelope, roof, door, automation, and energy-management measures reduce modeled building electricity or fuel use when an exact supported measure and building segment are available."
  },
  "ITC-15": {
    title: "Studies, Monitoring, Certifications, and Enabling Work",
    overview: "These activities may identify or enable future improvements, but they do not directly reduce a purchased operating resource on their own."
  },
  "ITC-16": {
    title: "Automated Demand Response",
    overview: "Automated demand response changes interval electric load during eligible events and can reduce utility charges under the applicable tariff."
  },
  "ITC-17": {
    title: "Solar Photovoltaic Generation",
    overview: "Rooftop, ground-mounted, and carport solar arrays generate electricity that offsets site purchases and may create credited exports."
  },
  "ITC-18": {
    title: "Community Solar Subscription",
    overview: "A community solar subscription changes the electric bill through contracted energy credits and subscription charges."
  },
  "ITC-19": {
    title: "Small Wind Generation",
    overview: "A small wind turbine generates electricity that offsets site purchases and may create credited exports when the wind resource and turbine are specified."
  },
  "ITC-20": {
    title: "Fuel Cell Electricity Generation",
    overview: "A fuel cell converts purchased fuel into onsite electricity, reducing grid purchases while adding fuel use."
  },
  "ITC-21": {
    title: "Combined Heat and Power",
    overview: "Combined heat and power produces onsite electricity and useful heat from fuel, displacing grid electricity and boiler fuel when both outputs coincide with site demand."
  },
  "ITC-22": {
    title: "Biomass or Biogas Energy System",
    overview: "A biomass or biogas system converts an available fuel into electricity and useful heat that can displace purchased site resources."
  },
  "ITC-23": {
    title: "Battery Storage Dispatch",
    overview: "Battery storage shifts electric imports across time and changes energy and demand charges under a complete interval tariff."
  },
  "ITC-24": {
    title: "Solar Plus Storage",
    overview: "A combined solar and battery system coordinates onsite generation, charging, discharging, imports, and exports to change the annual electric bill."
  },
  "ITC-25": {
    title: "Thermal Energy Storage",
    overview: "Thermal storage shifts heating or cooling production across time and changes the electricity required during different tariff periods."
  },
  "ITC-26": {
    title: "Microgrid System",
    overview: "A microgrid coordinates selected generation, storage, fuel, and grid resources as one interval system to change direct energy purchases."
  },
  "ITC-27": {
    title: "Public Electric Vehicle Charging",
    overview: "Public charging equipment adds active charging and standby electricity to the site load, producing an annual bill impact rather than an automatic savings value."
  },
  "ITC-28": {
    title: "Fleet Charging Infrastructure",
    overview: "Fleet charging infrastructure converts vehicle travel needs and charging schedules into added interval electric load and utility cost."
  },
  "ITC-29": {
    title: "Electric Vehicle Purchase",
    overview: "Replacing a light-duty fuel vehicle with an electric vehicle avoids gasoline use and adds electricity use for the same confirmed annual service."
  },
  "ITC-30": {
    title: "Electric Forklift or Material Handling Equipment",
    overview: "Electric material-handling equipment replaces hourly fuel use with charging electricity for the same operating duty."
  },
  "ITC-31": {
    title: "Managed Fleet Charging",
    overview: "Managed charging shifts fleet electricity use within vehicle availability windows to reduce tariff costs without missing required departure energy."
  },
  "ITC-32": {
    title: "Low-Flow Plumbing Fixtures",
    overview: "Low-flow fixtures reduce potable water use and may also reduce the energy needed to heat the avoided hot water."
  },
  "ITC-33": {
    title: "High-Efficiency Toilets and Urinals",
    overview: "High-efficiency toilets and urinals reduce potable water use by lowering gallons per flush for the same annual use."
  },
  "ITC-34": {
    title: "Efficient Irrigation and Smart Controls",
    overview: "Efficient irrigation methods and smart controls reduce the modeled landscape water allowance for the same climate and planted area."
  },
  "ITC-35": {
    title: "Measured Water Leak Repair",
    overview: "A leak detection system produces attributable water savings only after a measured leak is identified and repaired."
  },
  "ITC-36": {
    title: "Cooling Tower Optimization",
    overview: "Cooling tower optimization reduces makeup water through improved cycles of concentration and may reduce fan electricity through better control."
  },
  "ITC-37": {
    title: "Demand-Controlled Kitchen Ventilation",
    overview: "Demand-controlled kitchen ventilation reduces fan power and conditioned makeup-air load by matching airflow to cooking activity."
  },
  "ITC-38": {
    title: "High-Efficiency Motor Replacement",
    overview: "A high-efficiency motor reduces electric input while delivering the same shaft power, speed, load, and operating hours."
  },
  "ITC-39": {
    title: "Variable Frequency Drives and Pump or Fan Controls",
    overview: "Variable-speed controls reduce pump or fan electricity by matching equipment speed and input power to the annual load profile."
  },
  "ITC-40": {
    title: "Efficient Pump Replacement",
    overview: "An efficient pump and motor reduce electric input while preserving the required flow and total dynamic head."
  },
  "ITC-41": {
    title: "Efficient Fan or Ventilation System",
    overview: "An efficient fan, blower, or ventilation system reduces electric input while preserving required airflow and pressure."
  },
  "ITC-42": {
    title: "Efficient Air Compressor",
    overview: "An efficient air compressor reduces electricity per unit of delivered compressed air at the required pressure."
  },
  "ITC-43": {
    title: "Compressed Air Leak Repair",
    overview: "Repairing measured compressed-air leaks avoids the compressor electricity previously required to supply the lost air."
  },
  "ITC-44": {
    title: "Compressed Air Controls",
    overview: "Improved compressor controls reduce input power across the annual load profile while preserving flow and pressure requirements."
  },
  "ITC-45": {
    title: "Waste Heat Recovery",
    overview: "Waste heat recovery captures otherwise discarded thermal energy to displace purchased heating resources, net of auxiliary electricity."
  },
  "ITC-46": {
    title: "Industrial Process Electrification",
    overview: "Industrial heat pumps and other thermal process electrification replace purchased fuel with electricity for the same useful process heat."
  },
  "ITC-47": {
    title: "Steam Trap Replacement",
    overview: "Replacing failed steam traps reduces steam loss and the boiler fuel needed to produce that lost steam."
  },
  "ITC-48": {
    title: "Induction Cooking Equipment",
    overview: "Induction cooking replaces an existing cooking fuel with electricity for an identical tested cooking duty."
  },
  "ITC-49": {
    title: "Walk-In Cooler or Freezer Upgrade",
    overview: "A walk-in refrigeration upgrade reduces annual electricity for explicitly in-scope panels, doors, or refrigeration components with the same duty boundary."
  },
  "ITC-50": {
    title: "High-Efficiency Commercial Cooking Equipment",
    overview: "Efficient fryers, ovens, and steamers reduce active and idle electricity or gas use for the same certified cooking duty."
  },
  "ITC-51": {
    title: "Air Filtration System",
    overview: "An air filtration project changes fan electricity through its airflow, filter pressure rise, fan efficiency, and operating schedule."
  },
  "ITC-52": {
    title: "High-Efficiency Commercial Dishwasher",
    overview: "An efficient commercial dishwasher reduces water, water-heating input, and idle electricity for the same certified washing activity."
  },
  "ITC-53": {
    title: "High-Efficiency Commercial Laundry Equipment",
    overview: "Efficient commercial laundry equipment reduces water, machine electricity, and water-heating input for the same annual cycle duty."
  },
  "ITC-54": {
    title: "Backup Power Routine Resource Use",
    overview: "Backup power equipment can add routine testing fuel and standby electricity even when outage operation and resilience value are excluded."
  }
};

const PROCESS_LIBRARY = {
  "STD-COMSTOCK-ANNUAL-DELTA": {
    name: "Commercial Building Upgrade Resource Model",
    sourceName: "National Laboratory of the Rockies - ComStock 2025 Release 3",
    valueNeeded: "Annual electricity and fuel-use change per square foot for the approved measure and building segment, with source version and units",
    match: /ComStock/i,
    strategy: "Versioned local dataset lookup with an approved retrofit-to-measure crosswalk.",
    method: "Download the documented ComStock release, apply the reviewed building and measure filters, and calculate the eligible weighted resource delta locally.",
    difficulty: "Medium to Hard",
    validation: "The official release pages, upgrade documentation, and reference method were checked. A retained aggregate fixture and reviewed category crosswalk do not yet exist, so this process cannot currently return a project estimate or claim project-specific equipment performance."
  },
  "STD-SCOUT-ECM-SCREEN": {
    name: "Building Measure Performance Screen",
    sourceName: "U.S. Department of Energy - Scout",
    valueNeeded: "Documented resource-reduction factor for the approved measure and market segment, with source version and units",
    match: /Scout|ECM factor/i,
    strategy: "Versioned local lookup of an explicitly approved Scout measure and market segment.",
    method: "Load the pinned Scout definitions, apply the reviewed retrofit crosswalk and segment filters, and return the documented resource-reduction factor.",
    difficulty: "Medium",
    validation: "The official Scout program, summaries, and source repository were checked. The exact category crosswalk and performance-field fixtures remain unverified, so keyword matching and generic reduction defaults are not supported."
  },
  "STD-DOE-CCMS-RATINGS": {
    name: "DOE Certified Equipment Rating Lookup",
    sourceName: "U.S. Department of Energy - Compliance Certification Database",
    valueNeeded: "Certified performance fields for one exact compatible basic model, with units and record provenance",
    match: /DOE|CCMS|certified|rating/i,
    strategy: "Product-specific certification export matched to an exact basic model.",
    method: "Download the applicable product export, normalize manufacturer and model details, require one active compatible record, and return only the certified fields for that product family.",
    difficulty: "Medium",
    validation: "The public certification database and product-specific templates were checked. A retained product export and category adapter are not yet present, and the source does not provide a representative installed-equipment baseline, so only a later exact-record path can be supported."
  },
  "STD-ENERGY-STAR-PRODUCT-DATA": {
    name: "ENERGY STAR Product Rating Lookup",
    sourceName: "U.S. Environmental Protection Agency - ENERGY STAR Product Finder",
    valueNeeded: "Current certified product performance fields for one exact compatible model, with units and record provenance",
    match: /ENERGY STAR|charger|product|certified/i,
    strategy: "Product-family dataset lookup with exact model and specification filters.",
    method: "Use the official download or API, normalize product identifiers, filter to the applicable active specification, reject ambiguous matches, and return the required certified fields.",
    difficulty: "Easy to Medium",
    validation: "The official Product Finder access path and product-family datasets were checked. The commercial dishwasher fixture validates selected proposed-product fields, but other product-family adapters and all generic existing-equipment baselines remain unverified."
  },
  "STD-DOE-MEASUR": {
    name: "DOE MEASUR Engineering Calculation",
    sourceName: "U.S. Department of Energy - MEASUR",
    valueNeeded: "Existing and proposed annual resource use or avoided resource use, with calculator version, input units, and warnings",
    match: /MEASUR|motor performance|pump assessment|fan assessment|compressed-air|steam-loss|process-heat/i,
    strategy: "Pinned local execution of the exact MEASUR calculator for this category.",
    method: "Map the supplied project facts and units to the named calculator, run the versioned open-source calculation locally, reject incomplete or incompatible inputs, and return its existing and proposed resource results.",
    difficulty: "Medium to Hard",
    validation: "The official MEASUR tool page, calculator descriptions, and open-source implementation were checked, so local automation is feasible. The exact category module, input and output mapping, and golden example have not yet been pinned, so this process must not imply executable validation."
  },
  "STD-SAM-SOLAR-THERMAL": {
    name: "Solar Thermal Production Simulation",
    sourceName: "National Laboratory of the Rockies - System Advisor Model",
    valueNeeded: "Annual useful solar thermal output and displaced backup resource, with simulation inputs, units, and source version",
    match: /SAM solar|solar-thermal/i,
    strategy: "Versioned local SAM simulation using explicit system, weather, load, and backup inputs.",
    method: "Validate the project configuration, select the site weather data, run the solar water-heating model, cap useful output at the delivered load, and convert displaced backup energy to its billed unit.",
    difficulty: "Hard",
    validation: "The official SAM tool and open-source repository were checked, and local simulation is possible. No retained category fixture or golden calculation exists, and SAM does not supply missing collector design, hot-water load, or backup-system inputs."
  },
  "STD-PVWATTS-V8": {
    name: "PVWatts Solar Production Calculation",
    sourceName: "National Laboratory of the Rockies - PVWatts V8",
    valueNeeded: "Interval or annual AC electricity generation, with model inputs, warnings, units, and source version",
    match: /PVWatts|PV .*generation/i,
    strategy: "PVWatts V8 API or pinned local SAM execution with the same explicit array inputs.",
    method: "Validate site coordinates and array design, run the documented V8 field contract, check warnings, and return interval or annual AC generation with source provenance.",
    difficulty: "Medium",
    validation: "The official V8 field contract was checked and the retained fixture validates required fields, units, source version, and unsupported defaults. The source can calculate generation but cannot choose system capacity or array configuration for the project. The category adapter and formula-level golden test have not yet been added."
  },
  "STD-WIND-SAM": {
    name: "Small Wind Production Simulation",
    sourceName: "National Laboratory of the Rockies - WIND Toolkit and System Advisor Model",
    valueNeeded: "Interval and annual AC electricity generation, with wind resource, turbine, loss, unit, and source provenance",
    match: /WIND|wind .*generation/i,
    strategy: "Versioned wind-resource retrieval followed by a local SAM turbine power-curve simulation.",
    method: "Resolve site resource data at the selected height and year, validate the exact turbine power curve and losses, run the model, and return interval and annual AC generation.",
    difficulty: "Hard",
    validation: "The official WIND Toolkit access path and SAM implementation were checked. A retained turbine and resource fixture is still absent, and the source cannot choose the turbine, power curve, hub height, or losses for the project."
  },
  "STD-INTERVAL-TARIFF": {
    name: "Interval Tariff Resolution",
    sourceName: "U.S. Department of Energy OpenEI Utility Rate Database and exact published utility tariffs",
    valueNeeded: "One complete tariff input set with energy periods, demand rules, seasons, tiers, ratchets, export treatment, effective date, and reconciliation status",
    match: /tariff|rate schedule|demand charge|export credit/i,
    strategy: "Exact published-tariff resolution followed by itemized bill reconciliation, with a separate conservative screening method when exact tariff execution is unavailable.",
    method: "Match utility, schedule, customer class, and effective date; normalize the published tariff rules; apply them to aligned interval data; and reconcile itemized monthly results to source bills.",
    difficulty: "Hard",
    validation: "The official OpenEI Utility Rate Database and API documentation were checked. The source and method are verified, but no retained utility tariff, parser fixture, or bill-reconciliation golden case currently proves category execution."
  },
  "STD-REOPT-LOCAL-DISPATCH": {
    name: "Interval Dispatch and Bill Comparison",
    sourceName: "National Laboratory of the Rockies - REopt V3 and REopt.jl",
    valueNeeded: "Baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance",
    match: /REopt|dispatch|bill result/i,
    strategy: "Pinned local REopt.jl optimization after complete chronological load, tariff, and technology inputs pass validation.",
    method: "Align the interval load and tariff calendar, apply the category constraints, solve baseline and proposed cases, compare bill components, and retain solver and input provenance.",
    difficulty: "Hard",
    validation: "The official V3 input documentation and open-source solver were checked, so local optimization is technically possible. No category dispatch adapter or golden result is retained, and REopt cannot supply a missing load profile, tariff, or technology design."
  },
  "STD-EPA-CHP-PERFORMANCE": {
    name: "Onsite Generation Performance Balance",
    sourceName: "U.S. Environmental Protection Agency - CHP technologies and calculator",
    valueNeeded: "Annual electricity generation, input fuel, and useful recovered heat for the selected technology and capacity",
    match: /CHP|fuel-cell|technology and fuel|performance by technology|Electric efficiency/i,
    strategy: "Versioned technology-class lookup followed by a transparent heat-and-power energy balance.",
    method: "Select the compatible technology and capacity row, apply the explicit operating and coincidence constraints, calculate electricity, fuel, and useful heat, and cap outputs at site loads.",
    difficulty: "Medium to Hard",
    validation: "The official technology pages, efficiency method, and calculator download were checked. The category adapter and retained source fixture are still absent, and the source does not identify an exact unit or supply site capacity, schedule, or thermal coincidence."
  },
  "STD-FUELECONOMY-VEHICLES": {
    name: "Exact Vehicle Efficiency Lookup",
    sourceName: "U.S. Department of Energy and U.S. Environmental Protection Agency - FuelEconomy.gov",
    valueNeeded: "Exact-record fuel economy or electricity use per distance, with units and vehicle-record provenance",
    match: /Vehicle|FuelEconomy/i,
    strategy: "Local exact-record lookup from the official downloadable vehicle table.",
    method: "Normalize make, model, approximate year, and needed drivetrain details, require one compatible existing and proposed record, convert the returned efficiencies to per-mile use, and store the matched record provenance.",
    difficulty: "Easy to Medium",
    validation: "The official downloadable schema and exact records were checked. The retained fixture validates record identity, efficiency fields, units, source version, and the golden calculation. Class-based estimates remain disabled because no compatible population and sample-size fixture has been reviewed."
  },
  "STD-WATERSENSE-FIXTURES": {
    name: "WaterSense Fixture Rating Resolution",
    sourceName: "U.S. Environmental Protection Agency - WaterSense",
    valueNeeded: "Applicable proposed flow rate or flush volume for the exact product or compatible requirement set, with units and source provenance",
    match: /Rated flow|Rated gallons|fixture performance/i,
    strategy: "Specification lookup for an exact proposed fixture or a compatible WaterSense requirement.",
    method: "Identify the fixture type and application, validate an exact model or requirement set, return the applicable rated flow or flush volume, and retain the specification and source location.",
    difficulty: "Easy to Medium",
    validation: "The official WaterSense commercial resources, best-practice guide, and fixture criteria were checked. Proposed performance can be supported after an exact specification match, but existing installed ratings and commercial usage frequency remain separate unresolved inputs."
  },
  "STD-WATERSENSE-LANDSCAPE": {
    name: "Landscape Water Budget Calculation",
    sourceName: "U.S. Environmental Protection Agency - WaterSense Water Budget Tool",
    valueNeeded: "Baseline and proposed annual design water allowances, with climate, hydrozone, efficiency, unit, and method provenance",
    match: /Water Budget|Climate data/i,
    strategy: "Deterministic implementation of the versioned Water Budget Tool equations.",
    method: "Resolve climate data, validate hydrozone areas and plant factors, apply existing and proposed irrigation efficiencies, and compare the two annual design allowances.",
    difficulty: "Medium",
    validation: "The official Version 2.0 scope and equations were checked, and the retained fixture validates the design-method boundary. The tool compares designed allowances and does not prove actual existing consumption, irrigation scheduling, or whole-site bill allocation. The category adapter and formula-level golden test have not yet been added."
  },
  "STD-WATERSENSE-CI-OPERATIONS": {
    name: "WaterSense Commercial Operations Calculation",
    sourceName: "U.S. Environmental Protection Agency - WaterSense at Work",
    valueNeeded: "Annual avoidable water for the selected commercial-facility equation, with measured inputs, units, and dates",
    match: /WaterSense|water balance|measured-leak/i,
    strategy: "Deterministic implementation of the exact applicable WaterSense commercial-facility equation.",
    method: "Validate measured project inputs, apply the selected equation with explicit units and dates, reject missing physical observations, and return annual avoidable water.",
    difficulty: "Medium",
    validation: "The official commercial best-practice and facility-tool pages were checked. Exact page, equation, and worked-example fixtures have not yet been retained, so the process cannot use generic site defaults or claim an executable default path."
  },
  "STD-FEMP-EXTERIOR-LIGHTING": {
    name: "Exterior Lighting Product Resolution",
    sourceName: "U.S. Department of Energy FEMP and DesignLights Consortium",
    valueNeeded: "Documented input watts for the compatible exterior-lighting product or requirement path",
    match: /fixture|lighting|Product Resolution/i,
    strategy: "Application-specific source lookup with explicit exact-product or requirement-based routing.",
    method: "Identify the lighting application, apply the opportunity restrictions, query an approved product source when available, reject incompatible candidates, and return documented fixture input power.",
    difficulty: "Medium",
    validation: "The reviewed FEMP tables validate proposed efficacy requirements and one narrow wall-mounted example. They do not supply a general installed legacy-wattage distribution or an exact product catalog, so those inputs continue to the separate DOE application benchmark or requirements-filtered DLC process."
  },
  "STD-OPERATING-SCHEDULE": {
    name: "Annual Operating Hours Calculation",
    sourceName: "U.S. Department of Energy reference buildings and U.S. Naval Observatory daylight data",
    valueNeeded: "Annual operating hours, exact or estimated status, schedule formula, analysis year, uncertainty, and source provenance",
    match: /operating-hours|Schedule Resolution|Annual operating hours/i,
    strategy: "Deterministic calendar or daylight calculation from a recognizable operating pattern.",
    method: "Route the stated pattern to a fixed-schedule or daylight method, apply all supplied days and seasonal details, validate the annual-hour result, and retain the method and analysis year.",
    difficulty: "Easy to Medium",
    validation: "The DOE schedule context and USNO daylight definitions and API were checked. Exact calendar arithmetic and daylight calculation are feasible when all inputs are supplied, but a business label alone is not a validated annual-hours value and no category golden fixture exists."
  },
  "STD-DISHWASHER-WATER-HEATING": {
    name: "Commercial Dishwasher Water-Heating Conversion",
    sourceName: "U.S. Environmental Protection Agency - ENERGY STAR Commercial Food Service Equipment Calculator",
    valueNeeded: "One complete rack or flight-machine water-heating input set and purchased-resource result in the same native activity unit",
    match: /dishwasher water-heating|purchased water-heating resource|incoming water temperature/i,
    strategy: "Deterministic native-unit execution of the retained ENERGY STAR dishwasher building and booster water-heating equations.",
    method: "Select the rack or flight branch, validate water quantities, temperatures, resource, and efficiency, and calculate purchased resource per rack or per operating hour without cross-converting activity units.",
    difficulty: "Medium",
    validation: "The retained March 2024 ENERGY STAR calculator fixture proves the building and booster conversion equations and numeric inputs. The category adapter and end-to-end golden fixture are still pending, and incompatible or incomplete project boundaries remain blocked."
  },
  "STD-CONTEXT-BENCHMARKS": {
    name: "Context-Matched Benchmark Selection",
    sourceName: "U.S. DOE, U.S. EPA, and National Laboratory of the Rockies benchmark sources",
    valueNeeded: "One selected technical or activity value in the formula's required unit, with the eligible population and selection rule retained internally",
    match: /Context-Matched Benchmark|usage benchmark|operating-profile benchmark|routine-use benchmark|existing fixture wattage benchmark/i,
    strategy: "Category-specific deterministic selection from an explicitly implemented and evidenced compatible source population or equation.",
    method: "Apply the category's documented source-version and compatibility filters, execute its exact numeric rule, and retain the selected output, unit, scope, fixture, and population or equation provenance. Report a limitation when that source-specific implementation is absent.",
    difficulty: "Medium",
    validation: "The authoritative source access paths and category boundaries are documented. Only fixture-backed source fields are implementation-proven; each remaining category adapter must retain an inspected artifact or clearly disclose that source-field execution is pending."
  }
};

const PRODUCT_CATEGORY_LABELS = {
  "ITC-03": "Furnace",
  "ITC-06": "Water Heater",
  "ITC-07": "Gas Water Heater",
  "ITC-10": "Refrigeration Equipment",
  "ITC-13": "Ice Machine",
  "ITC-50": "Cooking Equipment",
  "ITC-52": "Commercial Dishwasher",
  "ITC-53": "Commercial Washer"
};

const ENERGY_STAR_LINK_SELECTIONS = {
  "ITC-06": ["ENERGY STAR Product Finder datasets and API"],
  "ITC-07": ["ENERGY STAR Product Finder datasets and API"],
  "ITC-10": ["ENERGY STAR Product Finder datasets and API"],
  "ITC-13": ["ENERGY STAR Product Finder datasets and API", "commercial ice machine dataset"],
  "ITC-27": ["ENERGY STAR Product Finder datasets and API", "EV charger product criteria and finder"],
  "ITC-28": ["ENERGY STAR Product Finder datasets and API", "EV charger product criteria and finder"],
  "ITC-50": [
    "ENERGY STAR Product Finder datasets and API",
    "commercial fryer dataset",
    "commercial oven dataset",
    "commercial steam cooker dataset"
  ],
  "ITC-52": ["ENERGY STAR Product Finder datasets and API", "commercial dishwasher dataset"],
  "ITC-53": ["ENERGY STAR Product Finder datasets and API", "commercial clothes washer dataset"]
};

const CCMS_LINK_SELECTIONS = [
  "Compliance Certification Database",
  "CCMS and database description",
  "product-specific certification and test-result templates"
];

const MEASUR_CATEGORY_MODULES = {
  "ITC-04": "Steam System Assessment Tool boiler and operating-state model",
  "ITC-09": "Pumping System Assessment Tool for pump electricity plus the displayed local thermal-loss calculation",
  "ITC-12": "Motor Inventory and Motor Performance calculators",
  "ITC-36": "Cooling Tower Water Assessment",
  "ITC-37": "Fan System Assessment Tool",
  "ITC-38": "Motor Inventory and Motor Performance calculators",
  "ITC-39": "Pumping System Assessment Tool for pumps or Fan System Assessment Tool for fans",
  "ITC-40": "Pumping System Assessment Tool",
  "ITC-41": "Fan System Assessment Tool",
  "ITC-42": "Compressed Air Assessment",
  "ITC-43": "Compressed Air Assessment leak-loss calculation",
  "ITC-44": "Compressed Air Assessment control-profile calculation",
  "ITC-45": "Process Heating Assessment waste-heat calculation",
  "ITC-46": "Process Heating Assessment",
  "ITC-47": "Steam System Assessment Tool steam-loss calculation",
  "ITC-51": "Fan System Assessment Tool"
};

const CONTEXT_BENCHMARK_LINK_SELECTIONS = {
  "ITC-02": ["2015 U.S. Lighting Market Characterization"],
  "ITC-08": ["Commercial Reference Buildings"],
  "ITC-16": ["ComStock data lake and documentation", "Commercial Reference Buildings"],
  "ITC-23": ["REopt.jl input reference"],
  "ITC-27": ["EVI-Pro Lite API and model documentation"],
  "ITC-28": ["Fleet DNA commercial fleet operating data"],
  "ITC-30": ["Argonne forklift propulsion comparison"],
  "ITC-32": ["WaterSense at Work fixture methods"],
  "ITC-33": ["WaterSense at Work fixture methods"],
  "ITC-39": ["ComStock data lake and documentation"],
  "ITC-48": ["ENERGY STAR CFS Equipment Calculator"],
  "ITC-49": ["DOE walk-in energy conservation standards NOPR"],
  "ITC-52": [
    "WaterSense at Work commercial-kitchen methods",
    "ENERGY STAR CFS Equipment Calculator"
  ],
  "ITC-54": [
    "Federal emergency-generator operations guidance",
    "FEMA full-load diesel generator fuel formula"
  ]
};

const SINGLE_VALUE_FALLBACK_ORDER = [
  "EXACT_MEASURED_OR_DOCUMENTED",
  "EXACT_PRODUCT_OR_PROJECT_SPECIFICATION",
  "EXACT_AUTHORITATIVE_DATABASE_LOOKUP",
  "CONTEXT_MATCHED_AUTHORITATIVE_BENCHMARK",
  "DETERMINISTIC_RETROFI_BENCHMARK"
];

const SINGLE_VALUE_RETAINED_METADATA = [
  "selected_value",
  "unit",
  "source",
  "source_version",
  "context_filters",
  "eligible_population",
  "population_size",
  "selection_rule",
  "fallback_level",
  "value_provenance"
];

const IDENTIFIER_LABELS = new Map([
  ["annual_energized_hours_per_unit", "Annual Energized Hours per Unit"],
  ["annual_active_wash_hours_per_unit", "Annual Active Wash Hours per Unit"],
  ["annual_idle_hours_per_unit", "Annual Idle Hours per Unit"],
  ["baseline_design_allowance_gallons", "Baseline Design Water Allowance"],
  ["proposed_design_allowance_gallons", "Proposed Design Water Allowance"],
  ["current_annual_refrigeration_kWh", "Current Annual Refrigeration Electricity"],
  ["proposed_annual_refrigeration_kWh", "Proposed Annual Refrigeration Electricity"],
  ["current_annual_cooking_fuel", "Current Annual Cooking Fuel"],
  ["proposed_annual_induction_kWh", "Proposed Annual Induction Electricity"],
  ["annual_cooking_activity", "Annual Cooking Activity"],
  ["proposed_tested_kWh_per_activity_unit", "Proposed Tested Electricity per Activity Unit"],
  ["annual_hot_water_load", "Annual Hot-Water Load"],
  ["SAM_output", "Simulated Solar Thermal Output"],
  ["useful_solar_thermal_output", "Useful Solar Thermal Output"],
  ["avoided_backup_resource", "Avoided Backup Resource"],
  ["backup_efficiency", "Backup-System Efficiency"],
  ["backup_resource_unit", "Backup-Resource Unit"],
  ["annual_delivered_hot_water_load", "Annual Delivered Hot-Water Load"],
  ["avoided_distribution_heat", "Avoided Distribution Heat"],
  ["existing_distribution_heat", "Existing Distribution Heat"],
  ["proposed_distribution_heat", "Proposed Distribution Heat"],
  ["avoided_thermal_input", "Avoided Heating Input"],
  ["heater_efficiency", "Water-Heater Efficiency"],
  ["heating_resource_unit", "Heating-Resource Unit"],
  ["avoided_pump_kWh", "Avoided Pump Electricity"],
  ["pump_kW", "Pump Input Power"],
  ["avoided_run_hours", "Avoided Pump Run Hours"],
  ["state_of_charge_t", "Battery State of Charge in Each Interval"],
  ["state_of_charge_(t-1)", "Battery State of Charge in the Prior Interval"],
  ["thermal_state_t", "Thermal Storage State in Each Interval"],
  ["thermal_state_(t-1)", "Thermal Storage State in the Prior Interval"],
  ["charging_input_kWh_t", "Charging Electricity in Each Interval"],
  ["standby_kWh_t", "Standby Electricity in Each Interval"],
  ["charge_t", "Charging Energy in Each Interval"],
  ["discharge_t", "Discharging Energy in Each Interval"],
  ["standing_loss_t", "Standing Thermal Loss in Each Interval"],
  ["delivered_kWh_t", "Delivered Charging Energy in Each Interval"],
  ["active_efficiency", "Active Charging Efficiency"],
  ["standby_power_kW", "Standby Power"],
  ["noncharging_interval_hours_t", "Noncharging Hours in Each Interval"],
  ["vehicle_kWh_per_mile", "Vehicle Electricity per Mile"],
  ["proposed_combE", "Proposed Vehicle Electricity per 100 Miles"],
  ["annual_vehicle_kWh", "Annual Vehicle Electricity"],
  ["fleet_annual_miles", "Annual Fleet Miles"],
  ["standby_kWh", "Annual Standby Electricity"],
  ["installed_ports", "Installed Charging Ports"],
  ["standby_kW_per_port", "Standby Power per Port"],
  ["noncharging_hours", "Annual Noncharging Hours"],
  ["avoided_gallons", "Avoided Gallons"],
  ["annual_miles", "Annual Miles"],
  ["existing_combined_mpg", "Existing Vehicle Combined Fuel Economy"],
  ["added_kWh", "Added Electricity"],
  ["annual_racks_per_unit", "Annual Racks per Unit"],
  ["water_per_rack_existing", "Existing Water per Rack"],
  ["water_per_rack_proposed", "Proposed Water per Rack"],
  ["idle_kW_existing", "Existing Idle Power"],
  ["idle_kW_proposed", "Proposed Idle Power"],
  ["water_per_cycle_existing", "Existing Water per Cycle"],
  ["water_per_cycle_proposed", "Proposed Water per Cycle"],
  ["machine_kWh_per_cycle_existing", "Existing Machine Electricity per Cycle"],
  ["machine_kWh_per_cycle_proposed", "Proposed Machine Electricity per Cycle"],
  ["quantity", "In-Scope Equipment Count"],
  ["annual_hours", "Annual Operating Hours"],
  ["annual_on_hours", "Annual Operating Hours"],
  ["annual_operating_hours", "Annual Operating Hours"],
  ["annual_pressurized_hours", "Annual Pressurized Hours"],
  ["annual_test_hours_per_unit", "Annual Test Hours per Unit"],
  ["annual_billed_R_r", "Annual Billed Resource Use"],
  ["billed_displaced_resource", "Billed Displaced Resource Use"],
  ["current_annual_fuel", "Current Annual Fuel Use"],
  ["measured_equipment_fuel", "Measured Equipment Fuel Use"],
  ["current_annual_gas", "Current Annual Gas Use"],
  ["current_annual_input", "Current Annual Water-Heating Input"],
  ["annual_boiler_fuel", "Annual Boiler Fuel Use"],
  ["annual_HVAC_R_r", "Annual HVAC Resource Use"],
  ["annual_affected_refrigeration_kWh", "Affected Annual Refrigeration Electricity"],
  ["existing_annual_kWh", "Existing Annual Electricity"],
  ["proposed_annual_kWh", "Proposed Annual Electricity"],
  ["annual_ice_100lb_units_per_machine", "Annual Hundred-Pound Ice Units per Machine"],
  ["annual_ice_production_lb_per_machine", "Annual Ice Production per Machine"],
  ["kWh_per_100lb_existing", "Existing Electricity per 100 Pounds of Ice"],
  ["kWh_per_100lb_proposed", "Proposed Electricity per 100 Pounds of Ice"],
  ["water_gallons_per_100lb_existing", "Existing Water per 100 Pounds of Ice"],
  ["water_gallons_per_100lb_proposed", "Proposed Water per 100 Pounds of Ice"],
  ["baseline_annual_kWh", "Baseline Annual Electricity"],
  ["Scout_reduction_fraction_r", "Scout Resource-Reduction Fraction"],
  ["annual_flow_hours", "Annual Delivered-Air Volume"],
  ["mean_flow", "Mean Airflow"],
  ["annual_hours", "Annual Operating Hours"],
  ["existing_input_kW", "Existing Input Power"],
  ["proposed_input_kW", "Proposed Input Power"],
  ["existing_fan_kW_period", "Existing Fan Input Power by Period"],
  ["proposed_fan_kW_period", "Proposed Fan Input Power by Period"],
  ["hours_period", "Operating Hours by Period"],
  ["avoided_makeup_air_R_r", "Avoided Makeup-Air Resource Use"],
  ["shaft_kW", "Shaft Power"],
  ["load_fraction", "Operating Load Fraction"],
  ["existing_kW_i", "Existing Input Power in Each Load Bin"],
  ["proposed_kW_i", "Proposed Input Power in Each Load Bin"],
  ["hours_i", "Annual Hours in Each Load Bin"],
  ["specific_power_existing", "Existing Specific Power"],
  ["specific_power_proposed", "Proposed Specific Power"],
  ["leak_flow", "Measured Leak Flow"],
  ["compressor_specific_power", "Compressor Specific Power"],
  ["test_fuel_per_hour", "Test Fuel Use per Hour"],
  ["standby_kW_per_unit", "Standby Power per Unit"],
  ["annual_test_fuel", "Annual Test Fuel"],
  ["annual_standby_kWh", "Annual Standby Electricity"],
  ["control_reduction_fraction", "Control Resource-Reduction Fraction"],
  ["duct_loss_reduction_fraction", "Duct-Loss Reduction Fraction"],
  ["reduction_fraction", "Resource-Reduction Fraction"],
  ["existing_duct_loss_fraction", "Existing Duct-Loss Fraction"],
  ["proposed_duct_loss_fraction", "Proposed Duct-Loss Fraction"],
  ["existing_kW", "Existing Input Power"],
  ["proposed_kW", "Proposed Input Power"],
  ["fixture_input_W", "Fixture Input Watts"],
  ["fixture_input_kW", "Fixture Input Kilowatts"],
  ["existing_resource_unit", "Existing Resource Unit"],
  ["avoided_existing_resource", "Avoided Existing Resource"],
  ["added_fuel", "Added Fuel"],
  ["annual_generation", "Annual Onsite Generation"],
  ["generation", "Annual Onsite Generation"],
  ["capacity_kW", "Installed Capacity"],
  ["load_fraction", "Operating Load Fraction"],
  ["electric_efficiency", "Electric Efficiency"],
  ["coincident_onsite_electric_load", "Coincident Onsite Electric Load"],
  ["avoided_grid_kWh", "Avoided Grid Electricity"],
  ["useful_heat", "Useful Recovered Heat"],
  ["recoverable_heat_ratio", "Recoverable Heat Ratio"],
  ["coincident_thermal_load", "Coincident Thermal Load"],
  ["avoided_boiler_fuel", "Avoided Boiler Fuel"],
  ["existing_boiler_efficiency", "Existing Boiler Efficiency"],
  ["total_capacity_kW", "Installed Capacity"],
  ["annual_capacity_factor", "Annual Capacity Factor"],
  ["CHP_input_fuel", "CHP Input Fuel"],
  ["annual_available_fuel", "Annual Available Fuel"],
  ["scheduled_input_fuel", "Scheduled Input Fuel"],
  ["input_biomass_or_biogas", "Biomass or Biogas Input"],
  ["lower_heating_value", "Fuel Lower Heating Value"],
  ["recoverable_heat_fraction", "Recoverable Heat Fraction"],
  ["available_waste_heat", "Available Waste Heat"],
  ["recovery_efficiency", "Recovery Efficiency"],
  ["coincident_useful_heat_load", "Coincident Useful-Heat Load"],
  ["useful_recovered_heat", "Useful Recovered Heat"],
  ["displaced_system_efficiency", "Displaced-System Efficiency"],
  ["displaced_resource_unit", "Displaced-Resource Unit"],
  ["avoided_displaced_resource", "Avoided Displaced Resource"],
  ["added_auxiliary_kWh", "Added Auxiliary Electricity"],
  ["current_fuel_input", "Current Fuel Input"],
  ["proposed_electric_input", "Proposed Electric Input"],
  ["useful_process_heat", "Useful Process Heat"],
  ["current_fuel_unit", "Current Fuel Unit"],
  ["current_efficiency", "Current Process Efficiency"],
  ["proposed_COP_or_efficiency", "Proposed Coefficient of Performance or Efficiency"],
  ["electricity_unit", "Electricity Unit"],
  ["avoided_steam_loss", "Avoided Steam Loss"],
  ["steam_loss_rate", "Steam Loss Rate"],
  ["boiler_fuel_per_steam_unit", "Boiler Fuel per Unit of Steam"],
  ["steam_enthalpy_rise", "Steam Enthalpy Rise"],
  ["boiler_efficiency", "Boiler Efficiency"],
  ["boiler_fuel_unit", "Boiler Fuel Unit"],
  ["avoided_water", "Avoided Water"],
  ["avoided_hot_water_input", "Avoided Water-Heating Input"],
  ["hot_fraction", "Hot-Water Fraction"],
  ["thermal_energy_per_gallon", "Thermal Energy per Gallon"],
  ["uses_per_year", "Annual Uses per Fixture"],
  ["duration_minutes", "Minutes per Use"],
  ["gpm_existing", "Existing Flow Rate"],
  ["gpm_proposed", "Proposed Flow Rate"],
  ["flushes_per_year", "Annual Flushes per Fixture"],
  ["gpf_existing", "Existing Gallons per Flush"],
  ["gpf_proposed", "Proposed Gallons per Flush"],
  ["measured_leak_gpm", "Measured Leak Flow"],
  ["confirmed_leak_minutes_per_year", "Confirmed Annual Leak Duration"],
  ["avoided_makeup_gallons", "Avoided Cooling-Tower Makeup Water"],
  ["avoided_fan_kWh", "Avoided Fan Electricity"],
  ["annual_activity_per_unit", "Annual Activity per Unit"],
  ["active_intensity_existing,r", "Existing Active Resource Intensity"],
  ["active_intensity_proposed,r", "Proposed Active Resource Intensity"],
  ["annual_idle_hours", "Annual Idle Hours"],
  ["idle_rate_existing,r", "Existing Idle Resource Rate"],
  ["idle_rate_proposed,r", "Proposed Idle Resource Rate"],
  ["avoided_water_heating_R_r", "Avoided Water-Heating Resource"],
  ["water_heating_R_per_rack_existing", "Existing Water-Heating Resource per Rack"],
  ["water_heating_R_per_rack_proposed", "Proposed Water-Heating Resource per Rack"],
  ["avoided_idle_kWh", "Avoided Idle Electricity"],
  ["avoided_machine_kWh", "Avoided Machine Electricity"],
  ["avoided_water_heating_input", "Avoided Water-Heating Input"],
  ["baseline_annual_bill", "Baseline Annual Bill"],
  ["proposed_annual_bill", "Proposed Annual Bill"],
  ["proposed_unmanaged_charging_bill", "Proposed Unmanaged-Charging Bill"],
  ["unmanaged_annual_bill", "Unmanaged Annual Bill"],
  ["managed_annual_bill", "Managed Annual Bill"],
  ["baseline_grid_and_fuel_bill", "Baseline Grid and Fuel Bill"],
  ["proposed_grid_and_fuel_bill", "Proposed Grid and Fuel Bill"],
  ["annual_bill_credits", "Annual Bill Credits"],
  ["annual_subscription_charges", "Annual Subscription Charges"],
  ["credited_kWh_period", "Credited Electricity by Period"],
  ["contract_credit_rate_period", "Contract Credit Rate by Period"],
  ["onsite_offset_kWh_t", "Onsite Electricity Offset in Each Interval"],
  ["export_kWh_t", "Exported Electricity in Each Interval"],
  ["baseline_import_kWh_t", "Baseline Imported Electricity in Each Interval"],
  ["PV_AC_kWh_t", "Solar AC Generation in Each Interval"],
  ["wind_kWh_t", "Wind Generation in Each Interval"],
  ["import_rate_t", "Import Rate in Each Interval"],
  ["export_credit_t", "Export Credit in Each Interval"],
  ["baseline_load_t", "Baseline Load in Each Interval"],
  ["proposed_load_t", "Proposed Load in Each Interval"],
  ["shed_t", "Shed Load in Each Interval"],
  ["rebound_t", "Rebound Load in Each Interval"],
  ["p_electric", "Bill-Derived Electricity Rate"],
  ["p_gas", "Bill-Derived Gas Rate"],
  ["p_fuel", "Current Fuel Price"],
  ["p_existing", "Existing Resource Rate"],
  ["p_backup_resource", "Backup-Resource Rate"],
  ["p_heating_resource", "Heating-Resource Rate"],
  ["p_water", "Bill-Derived Water Rate"],
  ["p_water_sewer", "Bill-Derived Water and Sewer Rate"],
  ["p_displaced_resource", "Displaced-Resource Rate"],
  ["p_input_fuel", "Input-Fuel Price"],
  ["p_CHP_fuel", "CHP Fuel Price"],
  ["p_r", "Bill-Derived Resource Rate"],
  ["makeup", "Makeup Water"],
  ["evaporation", "Evaporation Water"],
  ["blowdown", "Blowdown Water"],
  ["drift", "Drift Water"],
  ["airflow", "Airflow"],
  ["water_per_cycle_case", "Water per Cycle for Each Case"],
  ["hot_water_per_cycle_case", "Hot Water per Cycle for Each Case"],
  ["hot_fraction_case", "Hot-Water Fraction for Each Case"],
  ["η_existing", "Existing Efficiency"],
  ["η_proposed", "Proposed Efficiency"],
  ["η_charge", "Charge Efficiency"],
  ["η_discharge", "Discharge Efficiency"],
  ["ΔR_r", "Annual Resource Reduction by Resource"],
  ["valued_R_r", "Bill-Capped Annual Resource Reduction"],
  ["billed_R_r", "Annual Billed Resource Use"],
  ["floor_area", "Building Area"],
  ["median_ComStock_delta_r_per_ft²", "Median ComStock Resource Change per Square Foot"],
  ["S", "Annual Operational Savings"]
]);

export function buildInformationCardProjection(category) {
  const copy = CARD_COPY[category.id];
  if (!copy) throw new Error(`Missing Information Card copy for ${category.id}`);
  const processDefinitions = buildProcessDefinitions(category);
  const tree = buildPresentationTree(category, processDefinitions);
  attachIntervalTariffProcess(tree, processDefinitions);
  ensureProcessInputTreeBindings(category, tree, processDefinitions);
  const referencedKeys = collectProcessReferences(tree);
  const processByKey = new Map(processDefinitions.map((process) => [process.key, process]));
  const orderedProcesses = referencedKeys.map((key) => processByKey.get(key)).filter(Boolean);
  const numbers = assignProcessNumbers(category.id, orderedProcesses);
  for (const process of orderedProcesses) process.displayNumber = numbers.get(process.key);
  finalizeProcessBindings(category, tree, orderedProcesses);
  return {
    categoryId: category.id,
    title: copy.title,
    retrofitNames: category.retrofits.map((retrofit) => retrofit.name),
    overview: copy.overview,
    broaderFormula: buildBroaderFormula(category),
    expandedFormula: buildExpandedFormula(category),
    tree,
    processes: orderedProcesses
  };
}

export function renderPresentationTree(root, processByKey) {
  const lines = [];
  const visit = (node, prefix, isLast, isRoot) => {
    const process = node.processKey ? processByKey.get(node.processKey) : null;
    const text = process
      ? `Standard ${process.displayNumber} — ${process.name}`
      : node.text;
    lines.push(isRoot ? text : `${prefix}${isLast ? "└─ " : "├─ "}${text}`);
    const nextPrefix = isRoot ? "" : `${prefix}${isLast ? "   " : "│  "}`;
    node.children.forEach((child, index) => {
      visit(child, nextPrefix, index === node.children.length - 1, false);
    });
  };
  visit(root, "", true, true);
  return lines.join("\n");
}

function buildProcessDefinitions(category) {
  if (category.id === "ITC-02") return buildExteriorLightingProcesses(category);
  if (category.id === "ITC-39") return buildVariableSpeedProcesses(category);
  if (category.id === "ITC-29") {
    return [
      makeProcess(
        category,
        "STD-FUELECONOMY-VEHICLES",
        "fueleconomy_vehicles",
        "Exact Vehicle Efficiency Lookup",
        {
          purpose: "Match the existing and proposed light-duty vehicles to exact official records and return comparable fuel and electricity use per mile.",
          lookupInputs: [
            "Existing vehicle make and model",
            "Proposed vehicle make and model",
            "Approximate model years",
            "Version or drivetrain details only when needed to resolve an ambiguous match"
          ],
          valueNeeded: [
            "Existing combined fuel economy in miles per gallon",
            "Proposed electricity use in kilowatt-hours per 100 miles at the wall"
          ],
          validation: "The official downloadable schema and the two exact vehicle records were checked. The retained fixture validates record identity, efficiency fields, units, source version, and the exact-model golden calculation of $1,617 per year. Class-based estimates remain disabled because no compatible population and sample-size fixture has been reviewed."
        }
      )
    ];
  }
  if (PRODUCT_CATEGORY_LABELS[category.id]) {
    return buildCertifiedProductProcesses(category);
  }

  const processes = [];
  for (const standard of category.tracedStandards) {
    if (standard.id === "STD-INTERVAL-TARIFF") {
      processes.push(buildIntervalTariffProcess(category));
      continue;
    }
    if (standard.id === "STD-CONTEXT-BENCHMARKS") {
      if (category.id === "ITC-27") {
        processes.push(...buildPublicChargingContextProcesses(category));
      } else if (category.id === "ITC-32") {
        processes.push(...buildFlowFixtureContextProcesses(category));
      } else if (category.id === "ITC-33") {
        processes.push(...buildFlushFixtureContextProcesses(category));
      } else if (category.id === "ITC-54") {
        processes.push(...buildBackupPowerContextProcesses(category));
      } else {
        processes.push(buildContextBenchmarkProcess(category));
      }
      continue;
    }
    if (
      standard.id === "STD-WATERSENSE-FIXTURES" &&
      ["ITC-32", "ITC-33"].includes(category.id)
    ) {
      const fixtureLabel = category.id === "ITC-32" ? "Flow Fixture" : "Flush Fixture";
      const ratedValue = category.id === "ITC-32" ? "rated flow" : "rated gallons per flush";
      processes.push(
        makeProcess(category, standard.id, "exact-proposed-fixture-rating", `Exact Proposed ${fixtureLabel} Rating Lookup`, {
          sourceLinkLabels: category.id === "ITC-32"
            ? ["WaterSense Product Search and downloadable model list", "EPA pre-rinse spray valve archive"]
            : ["WaterSense Product Search and downloadable model list", "WaterSense urinal criteria"],
          purpose: `Resolve the proposed ${ratedValue} when the linked opportunity names an exact fixture.`,
          lookupInputs: ["Exact proposed fixture make and model from the linked opportunity", "Fixture type and application"],
          valueNeeded: [`Proposed ${ratedValue} with units and product provenance`],
          howToUse: category.id === "ITC-32"
            ? [
                "Read the exact manufacturer, model, and fixture type from the linked opportunity.",
                "For private lavatory faucets and showerheads, search the official WaterSense Product Search or download its complete model list.",
                "For commercial pre-rinse spray valves, use the separate EPA archived model list because the WaterSense specification sunset in 2019; do not represent these as current WaterSense listings.",
                "Require one exact compatible model and native gallons-per-minute field. Route any other fixture type to a separately validated authoritative product source or the explicit RetroFi benchmark.",
                "Return one exact proposed rated flow with source version, record identity, product type, native units, and provenance."
              ]
            : [
                "Read the exact manufacturer, model, and toilet or urinal type from the linked opportunity.",
                "Search the official WaterSense Product Search or download its complete model list.",
                "Require one exact compatible tank-type toilet, flushometer-valve toilet, or flushing-urinal record and its native gallons-per-flush field.",
                "Route any other fixture type to a separately validated authoritative product source or the explicit RetroFi benchmark.",
                "Return one exact proposed gallons-per-flush value with source version, record identity, fixture type, native units, and provenance."
              ],
          validation: category.id === "ITC-32"
            ? `The official WaterSense Product Search exposes a downloadable complete model list for currently supported fixture categories, and EPA retains a separate pre-rinse spray valve archive. No retained product export or category adapter currently proves the exact ${ratedValue} lookup, so source access is verified while field-level execution remains pending. The product sources do not supply existing installed performance or usage frequency.`
            : `The official WaterSense Product Search exposes a downloadable complete model list for supported toilet and urinal categories. No retained product export or category adapter currently proves the exact ${ratedValue} lookup, so source access is verified while field-level execution remains pending. The product source does not supply existing installed performance or usage frequency.`
        }),
        makeProcess(category, standard.id, "requirement-proposed-fixture-rating", `Requirement-Based Proposed ${fixtureLabel} Resolution`, {
          sourceLinkLabels: category.id === "ITC-32"
            ? ["WaterSense Product Search and downloadable model list", "EPA pre-rinse spray valve archive"]
            : ["WaterSense Product Search and downloadable model list", "WaterSense urinal criteria"],
          purpose: `Interpret the linked opportunity requirements and determine whether they identify a compatible ${fixtureLabel.toLowerCase()} rating.`,
          lookupInputs: ["Fixture requirements from the linked opportunity", "Fixture type and application", "Required water-use criterion"],
          valueNeeded: [`One selected proposed ${ratedValue}, with the eligible compatible fixture population, selection rule, units, and source provenance retained internally`],
          howToUse: [
            "Extract fixture type, application, certification, and maximum water-use criteria from the linked opportunity.",
            category.id === "ITC-32"
              ? "Use current WaterSense Product Search records only for private lavatory faucets and showerheads, and use the separate EPA archived list for pre-rinse spray valves."
              : "Use current WaterSense Product Search records only for compatible tank-type toilets, flushometer-valve toilets, and flushing urinals.",
            "Filter the authoritative population by every mandatory requirement, active or archived source status as applicable, compatible native unit, and fixture-family boundary.",
            "Use an official criterion or typical value when the source provides one; otherwise select the weighted median when valid weights exist or the ordinary median of the eligible compatible population.",
            "Return one selected proposed rating and retain the source version, full eligible population, filters, population size, selection rule, selected value, native unit, and fallback level.",
            "Route unsupported fixture types to a separately validated authoritative product source or the explicit RetroFi benchmark rather than implying WaterSense coverage."
          ],
          validation: `The official WaterSense criteria define compatible proposed ${ratedValue} requirements. The official product-search or downloadable-product adapter and retained compatible population are not yet implemented, so the source-supported filtering method is verified but execution proof for the selected median is pending. The source does not supply existing ratings or usage frequency.`
        })
      );
      continue;
    }
    if (
      standard.id === "STD-ENERGY-STAR-PRODUCT-DATA" &&
      ["ITC-27", "ITC-28"].includes(category.id)
    ) {
      processes.push(
        makeProcess(category, standard.id, "exact-charger-rating", "Exact Charger Rating Lookup", {
          sourceLinkLabels: ENERGY_STAR_LINK_SELECTIONS[category.id],
          purpose: "Resolve native AC-output or DC-output charging and low-power fields when the opportunity names an exact certified charger.",
          lookupInputs: ["Exact charger make and model", "Charger product type: AC-output or DC-output", "Rated charger power and application", "Opportunity product information"],
          valueNeeded: category.id === "ITC-27"
            ? [
                "Rated output power per port",
                "Applicable AC mode-specific total loss in watts when the record is AC-output",
                "DC loading-adjusted efficiency as a fraction when the record is DC-output",
                "Applicable no-vehicle or idle standby power per port"
              ]
            : [
                "For AC-output chargers: maximum output power, no-vehicle or idle power, and mode-specific total-loss fields",
                "For DC-output chargers: maximum output power, no-vehicle or idle power, and loading-adjusted efficiency"
              ],
          howToUse: [
            "Match the exact manufacturer and model, require active certification, and preserve whether the record is AC-output or DC-output.",
            "For an AC-output charger, retain maximum output power, no-vehicle or idle input power, and the applicable current-specific operation-mode total-loss field.",
            "Normalize AC active input power as output power plus the applicable mode-specific total loss, with units converted consistently.",
            "For a DC-output charger, retain maximum output power, no-vehicle or idle AC input power, and average loading-adjusted efficiency.",
            "Normalize DC active input power as output power divided by loading-adjusted efficiency, then apply native no-vehicle or idle input only to the corresponding non-charging duration.",
            "Return one exact compatible native-field record and retain the product ID, source version, fields, units, and charger-type normalization path."
          ],
          validation: "The retained official ENERGY STAR fixture inspects separate AC-output and DC-output certified records and binds maximum output power, AC mode-specific total loss, native idle or no-vehicle input, and DC loading-adjusted efficiency as the fraction 0.95. The category adapter and formula-level golden test have not yet been added, so source-field support is verified while category execution proof remains pending.",
          outputBindings: category.id === "ITC-27" ? [
            {
              outputName: "Rated output power per port",
              formulaTerm: "rated_output_power_kW",
              outputScope: "PER_PORT"
            },
            {
              outputName:
                "Applicable AC mode-specific total loss in watts when the record is AC-output",
              formulaTerm: "ac_total_loss_W",
              outputScope: "PER_PORT"
            },
            {
              outputName:
                "DC loading-adjusted efficiency as a fraction when the record is DC-output",
              formulaTerm: "dc_efficiency_fraction",
              outputScope: "PER_PORT"
            },
            {
              outputName:
                "Applicable no-vehicle or idle standby power per port",
              formulaTerm: "standby_power_kW_per_port",
              outputScope: "PER_PORT"
            }
          ] : undefined
        }),
        makeProcess(category, standard.id, "requirement-charger-rating", "Requirement-Based Charger Resolution", {
          sourceLinkLabels: ENERGY_STAR_LINK_SELECTIONS[category.id],
          purpose: "Interpret charger requirements from the opportunity, separate AC-output and DC-output products, and select one compatible certified record value for each required native field.",
          lookupInputs: ["Charger product type: AC-output or DC-output", "Charger class and intended application", "Rated power requirement", "Opportunity performance requirements"],
          valueNeeded: category.id === "ITC-27"
            ? [
                "Rated output power per port",
                "Applicable AC mode-specific total loss in watts when the selected record is AC-output",
                "DC loading-adjusted efficiency as a fraction when the selected record is DC-output",
                "Applicable no-vehicle or idle standby power per port"
              ]
            : [
                "One selected native-field performance record from the compatible AC-output or DC-output population",
                "The eligible population, filters, population size, and median selection rule retained internally"
              ],
          howToUse: [
            "Extract the charger type, application, rated-power requirement, certification requirement, and every mandatory performance limit from the opportunity.",
            "Filter AC-output and DC-output records separately and preserve each source's native field family and unit.",
            "Use an official recommended or typical compatible record when the source designates one; otherwise use a valid weighted median or the ordinary median of the eligible compatible population.",
            "For AC-output records, calculate active input as output power plus the selected mode-specific total loss and keep idle or no-vehicle input separate.",
            "For DC-output records, calculate active input as output power divided by loading-adjusted efficiency and keep idle or no-vehicle AC input separate.",
            "Return one selected compatible native-field record without choosing a future contractor product, and retain the complete population and selection trace."
          ],
          validation: "The official ENERGY STAR EV charger criteria and Product Finder access path were checked. The source distinguishes AC-output total-loss fields from DC-output loading-adjusted efficiency, which is normalized to a fraction. No retained category export currently proves the requirement filters, eligible population, population size, or selected median, so implementation proof remains pending.",
          outputBindings: category.id === "ITC-27" ? [
            {
              outputName: "Rated output power per port",
              formulaTerm: "rated_output_power_kW",
              outputScope: "PER_PORT"
            },
            {
              outputName:
                "Applicable AC mode-specific total loss in watts when the selected record is AC-output",
              formulaTerm: "ac_total_loss_W",
              outputScope: "PER_PORT"
            },
            {
              outputName:
                "DC loading-adjusted efficiency as a fraction when the selected record is DC-output",
              formulaTerm: "dc_efficiency_fraction",
              outputScope: "PER_PORT"
            },
            {
              outputName:
                "Applicable no-vehicle or idle standby power per port",
              formulaTerm: "standby_power_kW_per_port",
              outputScope: "PER_PORT"
            }
          ] : undefined
        })
      );
      continue;
    }
    if (
      category.id === "ITC-28" &&
      standard.id === "STD-FUELECONOMY-VEHICLES"
    ) {
      processes.push(
        makeProcess(
          category,
          standard.id,
          "fueleconomy_vehicles",
          "Vehicle Electricity-Intensity Resolution",
          {
            purpose: "Resolve one fleet-vehicle electricity intensity from a measured fleet study, an exact proposed model, or the connected class-matched benchmark.",
            lookupInputs: [
              "Measured kilowatt-hours per mile from a Project Document, when available",
              "Exact proposed vehicle make, model, year, and drivetrain from the linked opportunity, when named",
              "Vehicle class and service need",
              "Class-matched electricity intensity from the connected Fleet DNA benchmark"
            ],
            valueNeeded: [
              "One selected vehicle electricity intensity in kilowatt-hours per mile at the wall"
            ],
            howToUse: [
              "Use measured kilowatt-hours per mile from a fleet study or contractor charging design when available.",
              "Otherwise match an exact opportunity-named vehicle to the official FuelEconomy.gov record and convert its wall-energy field to kilowatt-hours per mile without applying charging efficiency twice.",
              "When no exact model is named, use the one class- and vocation-matched electricity intensity selected by the connected Fleet DNA benchmark.",
              "If the authoritative context population is unavailable, apply the deterministic RetroFi vehicle-class benchmark derived from the closest reviewed source.",
              "Return one selected electricity-intensity value and retain its source version, exact record or eligible population, filters, population size, selection rule, native unit, conversion, and fallback level."
            ],
            selectedStrategy: "Measured fleet value, then exact FuelEconomy.gov model, then the connected class-matched authoritative benchmark.",
            automationMethod: "Normalize measured or exact-model inputs first; otherwise consume the connected Fleet DNA class result and apply the deterministic single-value fallback.",
            selectionPolicy: {
              selectedValueMethod: "Use a measured Project Document value, then one exact compatible FuelEconomy.gov record, then the connected official typical, valid weighted median, or ordinary median benchmark."
            },
            validation: "The retained FuelEconomy.gov fixture proves the exact-record field and unit method. Fleet DNA documents class- and vocation-based operating populations, but the retained fleet population and category adapter are not yet present, so exact lookup is verified while benchmark execution remains pending."
          }
        )
      );
      continue;
    }
    const publicChargingDispatch =
      category.id === "ITC-27" &&
      standard.id === "STD-REOPT-LOCAL-DISPATCH";
    const solarWaterHeating =
      category.id === "ITC-08" &&
      standard.id === "STD-SAM-SOLAR-THERMAL";
    const demandResponseDispatch =
      category.id === "ITC-16" &&
      standard.id === "STD-REOPT-LOCAL-DISPATCH";
    const batteryDispatch =
      category.id === "ITC-23" &&
      standard.id === "STD-REOPT-LOCAL-DISPATCH";
    processes.push(makeProcess(category, standard.id, processKeyForStandard(standard.id), processNameForCategory(category, standard.id), {
      sourceName: standard.id === "STD-OPERATING-SCHEDULE"
        ? "U.S. Department of Energy - Commercial Reference Buildings"
        : undefined,
      sourceLinkLabels: standard.id === "STD-ENERGY-STAR-PRODUCT-DATA"
        ? ENERGY_STAR_LINK_SELECTIONS[category.id]
        : standard.id === "STD-OPERATING-SCHEDULE"
          ? ["Commercial Reference Buildings"]
          : undefined,
      selectedStrategy: standard.id === "STD-OPERATING-SCHEDULE"
        ? "Deterministic calendar calculation from a recognizable business, shift, seasonal, or usage pattern."
        : publicChargingDispatch
          ? "Pinned local REopt.jl bill comparison using a documented site-study or contractor charging profile."
        : undefined,
      automationMethod: standard.id === "STD-OPERATING-SCHEDULE"
        ? "Apply the supplied operating days, shifts, active weeks, holidays, and measured-hour overrides to a versioned local calendar calculation."
        : publicChargingDispatch
          ? "Validate the uploaded interval load, verified tariff mapping, documented charging profile, and resolved charger ratings; add the charging profile to baseline load and compare the versioned REopt.jl bill cases."
        : undefined,
      lookupInputs: publicChargingDispatch
        ? [
            "Timestamped interval utility data from the uploaded utility artifact",
            "Time zone and daylight-saving metadata from the uploaded utility artifact",
            "Resolved interval tariff input set from the connected tariff process",
            "Installed charger count",
            "Public operating hours",
            "Site daily delivered charging energy from the connected exact project resolver",
            "Normalized weekday and weekend 15-minute shape from the connected EVI-Pro resolver",
            "Resolved native AC-output or DC-output charger fields from the connected product process"
          ]
        : solarWaterHeating
          ? [
              "Site location",
              "Collector and storage design from the linked opportunity or a Project Document",
              "Annual hot-water load from a Project Document or the connected context benchmark",
              "Backup fuel type",
              "Backup-system efficiency from a Project Document or the connected context benchmark"
            ]
        : demandResponseDispatch
          ? [
              "Timestamped interval utility data from the uploaded utility artifact",
              "Time zone and daylight-saving metadata from the uploaded utility artifact",
              "Resolved interval tariff input set from the connected tariff process",
              "Controllable-load definition from a Project Document or the connected context benchmark",
              "Maximum shed from a Project Document, the linked opportunity, or the connected context benchmark",
              "Event-availability schedule from a Project Document, the linked opportunity, or the connected context benchmark",
              "Maximum event duration from a Project Document, the linked opportunity, or the connected context benchmark",
              "Rebound or recovery constraint from a Project Document or the connected context benchmark"
            ]
        : batteryDispatch
          ? [
              "Timestamped interval utility data from the uploaded utility artifact",
              "Time zone and daylight-saving metadata from the uploaded utility artifact",
              "Resolved interval tariff input set from the connected tariff process",
              "Power capacity",
              "Usable-energy capacity",
              "Charge efficiency from a nameplate, measurement, audit, or contractor specification",
              "Discharge efficiency from a nameplate, measurement, audit, or contractor specification",
              "Initial state of charge",
              "Terminal state-of-charge constraint from the linked opportunity, a Project Document, or the connected context benchmark",
              "Dispatch-availability schedule",
              "Reserve constraint"
            ]
          : undefined,
      howToUse: solarWaterHeating
        ? [
            "Resolve the collector and storage design from the linked opportunity when it prescribes the system, or from a contractor specification, proposed construction document, or engineering assessment.",
            "Resolve annual hot-water load from an audit, measurement, operating record, or the connected context benchmark.",
            "Resolve backup fuel and efficiency from the existing equipment nameplate, commissioning record, or the connected context benchmark.",
            "Run the pinned SAM solar-water-heating module to calculate useful thermal production and displaced backup-resource quantity.",
            "Apply the Bill-derived utility rate or documented non-utility fuel price only after SAM returns the displaced physical resource quantity, and retain all inputs, versions, and warnings."
          ]
        : publicChargingDispatch
          ? [
              "Validate the timestamped utility load, timezone treatment, monthly reconciliation, and authoritative tariff mapping before any dollar calculation.",
              "Require site daily delivered energy from the connected exact project resolver and reject the calculation when it is unavailable.",
              "Use the connected EVI-Pro resolver only for a normalized weekday and weekend 15-minute time-of-day shape, never for utilization or daily energy.",
              "Resolve the charger through the exact-product or requirements-based process, preserving AC-output total-loss fields separately from DC-output loading-adjusted efficiency.",
              "Cap documented daily energy by charger count, rated output power, public hours, and the explicit capacity-cap fraction, then distribute it over intervals with the normalized shape.",
              "For AC-output EVSE, add the applicable total-loss field during charging. For DC-output EVSE, divide delivered energy by the efficiency fraction. Apply standby only in non-charging intervals.",
              "Add the resulting import load to the baseline, run the pinned REopt.jl baseline and proposed bill cases, and retain the complete utility, tariff, energy, shape, charger-field, solver, warning, and reconciliation trace."
            ]
        : demandResponseDispatch
          ? [
              "Validate interval utility data, time-zone treatment, monthly reconciliation, and authoritative tariff mapping before the dollar calculation.",
              "Resolve the controllable-load definition, maximum shed, event availability, maximum event duration, and rebound or recovery constraint from audits, controls trends, engineering studies, opportunity restrictions, or the connected benchmark.",
              "Apply every resolved event constraint to one baseline and one proposed interval-load case.",
              "Run the pinned local REopt.jl bill comparison and return one selected annual savings value.",
              "Retain the exact or benchmark source for every constraint, tariff provenance, solver version, warnings, and monthly bill reconciliation."
            ]
        : batteryDispatch
          ? [
              "Validate interval utility data, time-zone treatment, monthly reconciliation, and authoritative tariff mapping.",
              "Resolve power capacity, usable-energy capacity, charge and discharge efficiency, availability, and reserve constraints from the linked opportunity or Project Documents.",
              "Resolve both initial and terminal state of charge; when no exact terminal rule exists, use the connected benchmark that sets terminal state of charge equal to initial state of charge for the screening horizon.",
              "Run one deterministic baseline and proposed REopt.jl dispatch with every state and operating constraint applied.",
              "Return one selected annual bill-savings value and retain all design sources, fallback levels, solver status, warnings, and reconciliation results."
            ]
          : undefined,
      validation: standard.id === "STD-OPERATING-SCHEDULE"
        ? "The DOE commercial reference-building schedule context was checked. Calendar arithmetic is deterministic when the operating pattern is complete, but a business label alone is not a validated annual-hours value and no category golden fixture exists."
        : undefined
    }));
  }
  return processes;
}

function buildBackupPowerContextProcesses(category) {
  const sourceLinkLabels = CONTEXT_BENCHMARK_LINK_SELECTIONS[category.id];
  return [
    makeProcess(
      category,
      "STD-CONTEXT-BENCHMARKS",
      "exact-backup-routine-inputs",
      "Exact Backup-Power Routine-Use Input Resolution",
      {
        sourceLinkLabels,
        purpose:
          "Resolve one complete project-specific routine-test and standby input set without replacing missing technical fields with generic maintenance guidance.",
        lookupInputs: [
          "Tested fuel use per operating hour per unit",
          "Scheduled annual test operating hours per unit",
          "Standby electric input kilowatts per unit",
          "Annual standby energized hours per unit"
        ],
        valueNeeded: [
          "One exact backup-power routine-use input set"
        ],
        howToUse: [
          "Read fuel use per hour and annual test hours per unit from a manufacturer document, commissioning record, maintenance plan, or contractor specification.",
          "Read standby input and annual energized hours per unit from a product document, controls schedule, or commissioning record.",
          "Require compatible equipment identity, fuel unit, operating state, and reporting period for every retained field.",
          "Return one complete exact input set for the supported fuel and standby components.",
          "If a required component is absent, report it as unresolved. Do not substitute general maintenance guidance, zero, or a nearby technology value."
        ],
        validation:
          "The exact path is deterministic when compatible Project Documents supply the required fields. No category golden fixture is retained, so implementation proof remains pending.",
        selectionPolicy: {
          outputCardinality: "ONE_SELECTED_INPUT_SET"
        },
        outputBindings: [
          {
            outputName: "One exact backup-power routine-use input set",
            formulaTerm: "exact_backup_routine_input_set",
            outputScope: "RECORD_SET"
          }
        ]
      }
    ),
    makeProcess(
      category,
      "STD-CONTEXT-BENCHMARKS",
      "fema-full-load-diesel-test-fuel",
      "FEMA Full-Load Diesel Test-Fuel Calculation",
      {
        sourceLinkLabels,
        purpose:
          "Calculate annual routine-test diesel fuel per equipment unit from the FEMA full-load coefficient, rated generator capacity, and separately documented annual full-load test hours.",
        lookupInputs: [
          "Confirmed diesel-generator technology and fuel type",
          "Diesel generator rated capacity in kilowatts",
          "Scheduled annual full-load test operating hours per unit"
        ],
        valueNeeded: [
          "Annual full-load diesel test fuel per equipment unit"
        ],
        howToUse: [
          "Require a diesel generator and a documented full-load routine-test condition.",
          "Read rated generator capacity in kilowatts and annual full-load test hours per equipment unit from Project Documents.",
          "Calculate test fuel gallons per hour as 0.07 gallon per kilowatt-hour multiplied by rated generator kilowatts.",
          "Multiply the calculated gallons per hour by annual full-load test hours per equipment unit to return annual gallons per equipment unit.",
          "Do not use the result for part-load operation, another fuel or technology, outage operation, annual test-hour selection, or standby electricity."
        ],
        validation:
          "The retained FEMA page and deep source fixture prove the 0.07 full-load diesel coefficient and formula. The source does not supply annual test hours or standby electricity, and no category golden fixture is retained, so only the narrow formula is verified while full category execution remains pending.",
        selectionPolicy: {
          multipleRecordRule: "NOT_APPLICABLE_DETERMINISTIC_SELECTION",
          selectedValueMethod:
            "Execute the one retained source formula for a confirmed compatible full-load diesel-generator test. No population selection or median is used."
        },
        outputBindings: [
          {
            outputName:
              "Annual full-load diesel test fuel per equipment unit",
            formulaTerm: "benchmark_annual_test_fuel_per_unit",
            outputScope: "PER_EQUIPMENT_UNIT"
          }
        ]
      }
    )
  ];
}

function buildPublicChargingContextProcesses(category) {
  const sourceLinkLabels = CONTEXT_BENCHMARK_LINK_SELECTIONS[category.id];
  return [
    makeProcess(
      category,
      "STD-CONTEXT-BENCHMARKS",
      "public_charging_site_energy",
      "Site Daily Delivered-Energy Resolution",
      {
        sourceLinkLabels,
        purpose:
          "Resolve the site's total daily delivered charging energy without treating a normalized time-of-day shape as utilization.",
        lookupInputs: [
          "Selected site daily delivered energy from a charging study or contractor design",
          "Installed charger count",
          "Rated output power per port",
          "Public operating hours",
          "Capacity cap fraction"
        ],
        valueNeeded: [
          "One site-total daily delivered charging-energy value in kilowatt-hours per day"
        ],
        howToUse: [
          "Require site daily delivered energy from a charging study, utilization study, metered pilot, or contractor design.",
          "Calculate the physical daily capacity cap as installed charger count multiplied by rated output power, public operating hours, and the explicit capacity cap fraction.",
          "Return the lesser of the documented site daily delivered energy and the physical capacity cap.",
          "Do not infer daily energy from EVI-Pro Lite's normalized time-of-day shape, a charger nameplate, or a business label.",
          "When the exact project daily-energy value is unavailable, report the implementation limitation and leave the category blocked."
        ],
        selectedStrategy:
          "Exact site study or contractor-design daily energy, capped by documented installed capacity and operating hours.",
        automationMethod:
          "Validate the exact project daily-energy record, calculate the physical capacity cap, select the lesser value, and retain the complete source and cap trace.",
        selectionPolicy: {
          multipleRecordRule: "NOT_APPLICABLE_DETERMINISTIC_SELECTION",
          selectedValueMethod:
            "Use one exact site-total daily-energy value and cap it deterministically. No benchmark, median, or nearby-process fallback is allowed.",
          missingExactValueBehavior:
            "Report an implementation limitation when exact site daily delivered energy is unavailable."
        },
        validation:
          "EVI-Pro Lite does not provide site daily energy or site utilization. This resolver therefore supports only an exact project record plus a physical cap, remains blocked when that record is absent, and has no retained category golden fixture, so implementation proof is pending.",
        outputBindings: [
          {
            outputName:
              "One site-total daily delivered charging-energy value in kilowatt-hours per day",
            formulaTerm: "site_daily_delivered_kWh",
            outputScope: "SITE_TOTAL"
          }
        ]
      }
    ),
    makeProcess(
      category,
      "STD-CONTEXT-BENCHMARKS",
      "evi_charging_shape",
      "EVI-Pro Normalized Charging-Shape Resolution",
      {
        sourceLinkLabels,
        purpose:
          "Resolve a normalized weekday and weekend 15-minute time-of-day charging shape without assigning a site utilization level.",
        lookupInputs: [
          "Site location and charging scenario",
          "AC-output or DC-output charger type",
          "Public operating hours"
        ],
        valueNeeded: [
          "One normalized weekday and weekend 15-minute charging-shape profile"
        ],
        howToUse: [
          "Submit the supported location and charging-scenario inputs to the versioned EVI-Pro Lite endpoint.",
          "Retain separate weekday and weekend 15-minute normalized time-of-day values.",
          "Validate the interval timestamps and normalize each applicable daily shape so its interval values sum to one.",
          "Multiply the selected site daily delivered energy by the normalized shape to produce delivered energy by interval.",
          "Do not interpret the shape as sessions per day, utilization, delivered kilowatt-hours, or a site load magnitude."
        ],
        selectedStrategy:
          "Versioned EVI-Pro Lite weekday and weekend normalized time-of-day shape.",
        automationMethod:
          "Call the official endpoint, validate and normalize the 15-minute response profile, and retain the request, response, version, and warnings.",
        selectionPolicy: {
          outputCardinality: "ONE_SELECTED_PROFILE",
          selectedValueMethod:
            "Select one EVI-Pro Lite scenario response compatible with the documented site location and charger scenario."
        },
        validation:
          "The official EVI-Pro Lite API documents normalized 24-hour weekday and weekend charging shapes in 15-minute steps. A retained request and response fixture is still pending, so endpoint semantics are verified while execution proof remains incomplete.",
        outputBindings: [
          {
            outputName:
              "One normalized weekday and weekend 15-minute charging-shape profile",
            formulaTerm: "normalized_shape_t",
            outputScope: "PROFILE"
          }
        ]
      }
    )
  ];
}

function buildFlowFixtureContextProcesses(category) {
  const sourceLinkLabels = CONTEXT_BENCHMARK_LINK_SELECTIONS[category.id];
  return [
    makeProcess(
      category,
      "STD-CONTEXT-BENCHMARKS",
      "flow_fixture_activity",
      "Flow Fixture Activity Resolution",
      {
        sourceLinkLabels,
        purpose:
          "Resolve total annual active minutes across the complete in-scope fixture group.",
        lookupInputs: [
          "Supported fixture type",
          "In-scope fixture count",
          "Recognizable occupants, customers, rooms, meals, or another source-compatible activity",
          "Operating days and hours",
          "Observed fixture-use study when available"
        ],
        valueNeeded: [
          "Total annual active minutes across the in-scope fixture group"
        ],
        howToUse: [
          "Use an observed fixture-use study when it supplies total annual active minutes for the complete in-scope group.",
          "Otherwise require a supported bathroom faucet, showerhead, or pre-rinse spray-valve method and its exact source-compatible activity driver.",
          "Calculate per-fixture activity only as an intermediate, multiply by fixture count exactly once inside this resolver, and return the group total.",
          "Do not multiply the returned group total by fixture count again in the savings formula.",
          "Retain fixture type, source equation, activity driver, fixture count, operating calendar, selected assumptions, unit, and warnings."
        ],
        validation:
          "WaterSense at Work documents commercial fixture inventory and savings methods, but the retained source fixture does not yet prove the flow-fixture activity fields and equations. The group-total contract and no-double-count boundary are explicit while source-field execution remains pending.",
        outputBindings: [
          {
            outputName:
              "Total annual active minutes across the in-scope fixture group",
            formulaTerm: "total_annual_active_minutes",
            outputScope: "PROJECT_TOTAL"
          }
        ]
      }
    ),
    makeProcess(
      category,
      "STD-CONTEXT-BENCHMARKS",
      "existing_flow_rate",
      "Existing Flow Rate Resolution",
      {
        sourceLinkLabels,
        purpose:
          "Resolve one existing gallons-per-minute value without using the proposed efficient-product population as the installed baseline.",
        lookupInputs: [
          "Existing fixture type and application",
          "Existing label, specification, audit, or measurement when available",
          "Installed fixture class and vintage when exact data are unavailable"
        ],
        valueNeeded: [
          "One existing rated flow in gallons per minute"
        ],
        howToUse: [
          "Use the exact existing label, specification, audit, or measurement when available.",
          "Otherwise require a separately retained installed-fixture population compatible with fixture type, application, and vintage.",
          "Do not use the current WaterSense efficient-product population as the unknown existing baseline.",
          "Return one gallons-per-minute value only after the exact record or eligible installed population is documented.",
          "If no compatible installed population is retained, report the implementation limitation instead of inventing a flow rate."
        ],
        validation:
          "WaterSense proposed-product criteria do not supply an installed existing-flow population. No retained installed-flow fixture currently proves a benchmark, so only exact project evidence is supported and the benchmark path remains implementation-pending.",
        outputBindings: [
          {
            outputName: "One existing rated flow in gallons per minute",
            formulaTerm: "gpm_existing",
            outputScope: "PER_FIXTURE"
          }
        ]
      }
    ),
    makeProcess(
      category,
      "STD-CONTEXT-BENCHMARKS",
      "water_heating_inputs",
      "Water-Heating Input Resolution",
      {
        sourceLinkLabels,
        purpose:
          "Resolve one complete hot-water input set, or a legitimate cold-only zero boundary, separately from fixture activity and flow.",
        lookupInputs: [
          "Confirmed hot-water or cold-only fixture service",
          "Water-heating resource",
          "Hot-water fraction",
          "Temperature rise",
          "Water-heater efficiency"
        ],
        valueNeeded: [
          "One hot-water fraction",
          "One hot-water temperature rise",
          "One water-heater efficiency"
        ],
        howToUse: [
          "Use zero hot-water contribution only when the fixture is confirmed cold-only.",
          "For a hot-water fixture, use exact audit, commissioning, nameplate, or engineering values when available.",
          "Keep hot-water fraction, temperature rise, resource, and heater efficiency as one internally consistent input set.",
          "Do not borrow a nearby fixture or water-heater process value when any required field is missing.",
          "If no source-specific compatible input set is retained, report the implementation limitation and leave the hot-water component unresolved."
        ],
        validation:
          "The physical conversion is explicit, but no retained commercial flow-fixture and water-heater population currently proves a complete hot-water input set. Exact project inputs and a confirmed cold-only zero boundary are supported; context execution remains pending.",
        selectionPolicy: {
          outputCardinality: "ONE_SELECTED_INPUT_SET"
        },
        outputBindings: [
          {
            outputName: "One hot-water fraction",
            formulaTerm: "hot_fraction",
            outputScope: "RECORD_SET"
          },
          {
            outputName: "One hot-water temperature rise",
            formulaTerm: "thermal_energy_per_gallon",
            outputScope: "RECORD_SET"
          },
          {
            outputName: "One water-heater efficiency",
            formulaTerm: "heater_efficiency",
            outputScope: "RECORD_SET"
          }
        ]
      }
    )
  ];
}

function buildFlushFixtureContextProcesses(category) {
  const sourceLinkLabels = CONTEXT_BENCHMARK_LINK_SELECTIONS[category.id];
  return [
    makeProcess(
      category,
      "STD-CONTEXT-BENCHMARKS",
      "flush_activity",
      "Flush Activity Resolution",
      {
        sourceLinkLabels,
        purpose:
          "Resolve total annual flushes across the complete in-scope toilet or urinal group.",
        lookupInputs: [
          "Toilet or urinal type",
          "Female and male eligible populations",
          "Customer or visitor population when applicable",
          "In-scope fixture count",
          "Operating days",
          "Observed restroom study when available"
        ],
        valueNeeded: [
          "Total annual flushes across the in-scope fixture group"
        ],
        howToUse: [
          "Use an observed restroom study when it supplies group-level annual flushes.",
          "Otherwise apply the retained EPA daily assumptions separately: three female toilet flushes, one male toilet flush, and two male urinal flushes per eligible person per operating day.",
          "Apply the source equation to the eligible population and operating days, allocate to the explicitly in-scope fixture group when required, and return one group total.",
          "Do not multiply the returned group total by fixture count again in the savings formula.",
          "Retain population inputs, fixture type, daily assumptions, operating days, allocation method, annual total, source version, and warnings."
        ],
        validation:
          "The retained WaterSense fixture proves the female toilet, male toilet, and male urinal daily assumptions and annual flush-count equation. A category calculation golden fixture remains pending, but the source fields and no-double-count boundary are explicit.",
        outputBindings: [
          {
            outputName:
              "Total annual flushes across the in-scope fixture group",
            formulaTerm: "total_annual_flushes_group",
            outputScope: "PROJECT_TOTAL"
          }
        ]
      }
    ),
    makeProcess(
      category,
      "STD-CONTEXT-BENCHMARKS",
      "existing_flush_rate",
      "Existing Flush Volume Resolution",
      {
        sourceLinkLabels,
        purpose:
          "Resolve one existing gallons-per-flush value separately from the activity benchmark.",
        lookupInputs: [
          "Existing toilet or urinal type",
          "Existing label, specification, audit, or measurement when available",
          "Installed fixture class and vintage when exact data are unavailable"
        ],
        valueNeeded: [
          "One existing gallons-per-flush value"
        ],
        howToUse: [
          "Use the exact installed label, specification, audit, or measurement when available.",
          "Otherwise require a retained installed-fixture population compatible with toilet or urinal type and vintage.",
          "Do not use the current efficient-product population as the unknown installed baseline.",
          "Return one gallons-per-flush value with the exact record or population selection trace.",
          "If no installed population is retained, report the implementation limitation instead of inventing a flush volume."
        ],
        validation:
          "The retained EPA activity fixture does not supply installed gallons-per-flush values. Exact project evidence is supported, while an installed-volume benchmark remains implementation-pending.",
        outputBindings: [
          {
            outputName: "One existing gallons-per-flush value",
            formulaTerm: "gpf_existing",
            outputScope: "PER_FIXTURE"
          }
        ]
      }
    )
  ];
}

function buildIntervalTariffProcess(category) {
  const exportCapable = (category.semanticContract?.rate_components || []).some(
    (component) =>
      component === "electric-export" ||
      component === "electric-export-non-bypassable"
  );
  const lookupInputs = [
    "Serving electric utility from the bill",
    "Published rate schedule and customer class from the bill",
    "Tariff effective date covering the analysis period",
    "Continuous interval energy and demand aligned to the tariff timezone"
  ];
  if (exportCapable) {
    lookupInputs.push(
      "Interconnection and export-credit configuration from the project agreement"
    );
  }
  return makeProcess(
    category,
    "STD-INTERVAL-TARIFF",
    "interval_tariff",
    "Interval Tariff Resolution",
    {
      sourceLinkLabels: [
        "Utility Rate Database",
        "Utility Rates API documentation"
      ],
      purpose:
        "Resolve one complete interval tariff input set before calculating time-of-use, demand, or export value.",
      lookupInputs,
      valueNeeded: [
        "One complete tariff input set with exact or conservative-screening provenance"
      ],
      howToUse: [
        "Verify the serving utility, published schedule identifier, customer class, and analysis date against the source bill.",
        "Resolve the exact published tariff by matching the OpenEI record and controlling utility tariff sheet to the same utility, schedule, customer class, and effective date.",
        "Normalize energy periods, demand windows, ratchets, seasons, tiers, minimums, non-bypassable charges, and export rules into one versioned input set.",
        "Apply the tariff to the aligned interval series as itemized bill components and reconcile monthly energy, billed demand, and variable charges to source bills.",
        "If exact tariff execution is unavailable, use only the disclosed conservative screening path: a bill-derived blended variable energy rate, an effective demand rate when both demand charges and billed demand are present, and zero export credit only as an explicit downside assumption.",
        "Return the scenario label, complete fields, missing terms, source versions, exact tariff URL, reconciliation residuals, and warnings. Never substitute a fabricated rate schedule or use zero as a missing-rate placeholder."
      ],
      selectedStrategy:
        "Exact published-tariff adapter with itemized bill reconciliation and a separate conservative screening adapter.",
      automationMethod:
        "Match utility identity and effective date, normalize typed tariff rules, execute the itemized bill kernel, reconcile monthly components, and emit one exact or explicitly conservative input set with full provenance.",
      validation:
        "The official OpenEI Utility Rate Database and API documentation define structured utility-rate access. No retained utility tariff, parser fixture, or bill-reconciliation golden case currently proves this category adapter, so exact execution remains implementation-pending and the conservative screen must remain explicitly labeled.",
      selectionPolicy: {
        outputCardinality: "ONE_SELECTED_INPUT_SET"
      },
      outputBindings: [
        {
          outputName:
            "One complete tariff input set with exact or conservative-screening provenance",
          formulaTerm: "tariff_input_set",
          outputScope: "RECORD_SET"
        }
      ]
    }
  );
}

function buildVariableSpeedProcesses(category) {
  const context = buildContextBenchmarkProcess(category);
  const shared = {
    sourceLinkLabels: ["MEASUR tool page", "Calculator list and descriptions", "ORNL MEASUR source repository"],
    difficulty: "Medium to Hard"
  };
  return [
    context,
    makeProcess(category, "STD-DOE-MEASUR", "doe_measur_pump", "Pump Variable-Speed Engineering Calculation", {
      ...shared,
      purpose: "Calculate pump electricity for the documented baseline and variable-speed proposal with the MEASUR Pumping System Assessment Tool.",
      lookupInputs: [
        "In-scope pump count",
        "Pump nameplate and measured input from a Project Document",
        "Required flow and total dynamic head from a Project Document",
        "Pump curve or documented operating points",
        "Load or speed profile from a Project Document or the connected operating-profile benchmark",
        "Proposed minimum speed and pump control rule from the linked opportunity"
      ],
      valueNeeded: ["One selected baseline and proposed annual pump-electricity result"],
      howToUse: [
        "Map documented pump flow, total dynamic head, pump curve or operating points, motor and drive data, and baseline schedule into the Pumping System Assessment Tool input schema.",
        "Use the measured load or speed profile when available; otherwise use the one context-matched pump profile from the connected benchmark.",
        "Apply the opportunity-prescribed minimum speed and pump control rule to the proposed case.",
        "Run one pinned baseline and proposed Pumping System Assessment Tool case and return one annual electricity reduction.",
        "Retain the MEASUR version, exact input object, unit conversions, benchmark provenance, warnings, and both annual results."
      ],
      selectedStrategy: "Pinned local execution of the MEASUR Pumping System Assessment Tool.",
      automationMethod: "Validate the pump-specific hydraulic and operating inputs, resolve one profile, run the versioned pump module, and preserve the complete input and output trace.",
      validation: "The official MEASUR calculator list identifies the Pumping System Assessment Tool and the open-source implementation is available. The exact input mapping and category golden example have not yet been pinned, so module-level execution proof remains pending."
    }),
    makeProcess(category, "STD-DOE-MEASUR", "doe_measur_fan", "Fan Variable-Speed Engineering Calculation", {
      ...shared,
      purpose: "Calculate fan electricity for the documented baseline and variable-speed proposal with the MEASUR Fan System Assessment Tool.",
      lookupInputs: [
        "In-scope fan count",
        "Fan nameplate and measured input from a Project Document",
        "Required airflow and pressure rise from a Project Document",
        "Fan curve or documented operating points",
        "Load or speed profile from a Project Document or the connected operating-profile benchmark",
        "Proposed minimum speed and fan control rule from the linked opportunity"
      ],
      valueNeeded: ["One selected baseline and proposed annual fan-electricity result"],
      howToUse: [
        "Map documented fan airflow, pressure rise, fan curve or operating points, motor and drive data, and baseline schedule into the Fan System Assessment Tool input schema.",
        "Use the measured load or speed profile when available; otherwise use the one context-matched fan profile from the connected benchmark.",
        "Apply the opportunity-prescribed minimum speed and fan control rule to the proposed case.",
        "Run one pinned baseline and proposed Fan System Assessment Tool case and return one annual electricity reduction.",
        "Retain the MEASUR version, exact input object, unit conversions, benchmark provenance, warnings, and both annual results."
      ],
      selectedStrategy: "Pinned local execution of the MEASUR Fan System Assessment Tool.",
      automationMethod: "Validate the fan-specific aerodynamic and operating inputs, resolve one profile, run the versioned fan module, and preserve the complete input and output trace.",
      validation: "The official MEASUR calculator list identifies the Fan System Assessment Tool and the open-source implementation is available. The exact input mapping and category golden example have not yet been pinned, so module-level execution proof remains pending."
    })
  ];
}

function buildCertifiedProductProcesses(category) {
  if (category.id === "ITC-52") return buildDishwasherProcesses(category);
  const label = PRODUCT_CATEGORY_LABELS[category.id];
  const canonicalStandardIds = category.tracedStandards
    .map((standard) => standard.id)
    .filter((standardId) => standardId !== "STD-CONTEXT-BENCHMARKS");
  const includesEnergyStar = canonicalStandardIds.includes("STD-ENERGY-STAR-PRODUCT-DATA");
  const combinedSourceOverrides = {
    sourceName: includesEnergyStar
      ? "U.S. Department of Energy CCMS and U.S. Environmental Protection Agency ENERGY STAR Product Finder"
      : "U.S. Department of Energy - Compliance Certification Database",
    sourceLinkLabels: [
      ...CCMS_LINK_SELECTIONS,
      ...(includesEnergyStar
        ? ENERGY_STAR_LINK_SELECTIONS[category.id] || ["ENERGY STAR Product Finder datasets and API"]
        : [])
    ]
  };
  const processes = [
    makeCombinedProcess(category, canonicalStandardIds, "existing-product-rating", `Existing ${label} Rating Resolution`, {
      ...combinedSourceOverrides,
      purpose: `Resolve the existing ${label.toLowerCase()} performance only from a documented exact model or retained certification record.`,
      lookupInputs: [`Existing ${label.toLowerCase()} type or application`, "Existing make and model, when available", "Existing capacity or size class"],
      valueNeeded: [`One selected existing ${label.toLowerCase()} performance value with its exact unit and provenance`],
      validation: `The official certification access paths and native product-family fields were checked. Current efficient-product records do not represent the installed baseline. An exact documented existing model is preferred; when it is unavailable, a separately sourced context-matched installed-equipment benchmark is required. That benchmark adapter and the category golden test have not yet been added.`
    }),
    makeCombinedProcess(category, canonicalStandardIds, "exact-proposed-product-rating", `Exact Proposed ${label} Rating Lookup`, {
      ...combinedSourceOverrides,
      purpose: `Resolve proposed ${label.toLowerCase()} performance when the linked opportunity names an exact product.`,
      lookupInputs: ["Exact proposed make and model from the linked opportunity", "Product type and capacity", "Applicable certified test method"],
      valueNeeded: [`Proposed certified ${label.toLowerCase()} performance with its exact unit`],
      validation: category.id === "ITC-52"
        ? "The official commercial dishwasher dataset and access method were checked. The retained fixture validates model, machine-type, sanitation, water-use, active-energy, idle-power, date, unit, version, and checksum fields. The exact-product adapter and formula-level golden test have not yet been added, and rack and flight-machine units must remain separate."
        : `The official certification access path and applicable ${label.toLowerCase()} product-family fields were checked. Exact active-model matching is technically possible, but the category-specific adapter, retained product fixture, and golden test have not yet been added.`,
      evidenceState: category.id === "ITC-52"
        ? "METHOD_VERIFIED_IMPLEMENTATION_PENDING"
        : undefined
    }),
    makeCombinedProcess(category, canonicalStandardIds, "requirement-proposed-product-rating", `Requirement-Based Proposed ${label} Resolution`, {
      ...combinedSourceOverrides,
      purpose: `Interpret the linked opportunity requirements and determine whether they identify a compatible certified ${label.toLowerCase()} record.`,
      lookupInputs: ["Product requirements from the linked opportunity", "Required application and capacity", "Applicable efficiency or resource-use criteria"],
      valueNeeded: [`One selected proposed ${label.toLowerCase()} native-unit performance value, with the compatible population, filters, population size, and selection rule retained internally`],
      validation: category.id === "ITC-52"
        ? "The official commercial dishwasher dataset and access method were checked, and the retained schema fixture validates the fields required to filter machine type, sanitation method, water use, active energy, and idle power. A retained candidate population and category golden test have not yet been added, so the requirements path cannot claim an implemented selection."
        : `The official certification access path and applicable ${label.toLowerCase()} product-family filters were checked. Candidate-set automation is technically possible, but no retained category export proves the eligible population, filters, population size, or selected median result.`
    })
  ];
  if (
    category.tracedStandards.some(
      (standard) => standard.id === "STD-CONTEXT-BENCHMARKS"
    )
  ) {
    processes.push(buildContextBenchmarkProcess(category));
  }
  return processes;
}

function buildDishwasherProcesses(category) {
  const productStandards = [
    "STD-DOE-CCMS-RATINGS",
    "STD-ENERGY-STAR-PRODUCT-DATA"
  ];
  const productSource = {
    sourceName:
      "U.S. Department of Energy CCMS and U.S. Environmental Protection Agency ENERGY STAR Product Finder",
    sourceLinkLabels: [
      ...CCMS_LINK_SELECTIONS,
      ...ENERGY_STAR_LINK_SELECTIONS[category.id]
    ]
  };
  const productRecordOutput = (outputName, formulaTerm) => [
    {
      outputName,
      formulaTerm,
      outputScope: "RECORD_SET"
    }
  ];
  return [
    makeCombinedProcess(
      category,
      productStandards,
      "exact-existing-dishwasher-record",
      "Exact Existing Dishwasher Native-Field Resolution",
      {
        ...productSource,
        purpose:
          "Resolve one exact existing dishwasher record or project measurement while preserving rack and flight fields in their native units.",
        lookupInputs: [
          "Existing dishwasher machine type and sanitation method",
          "Existing exact make and model, retained certification record, or measured native performance from a Project Document"
        ],
        valueNeeded: [
          "One exact existing dishwasher native-field record"
        ],
        howToUse: [
          "Require an exact existing model in a retained historical certification snapshot or a project measurement that reports compatible native fields.",
          "Classify the record as rack or flight/conveyor before reading performance fields.",
          "For rack machines, retain gallons per rack, active kilowatt-hours per rack, and idle kilowatts.",
          "For flight/conveyor machines, retain gallons per hour, active kilowatt-hours per hour when explicitly reported, and idle kilowatts.",
          "If the exact record does not expose a required native field, report that field as unresolved and block the affected formula branch. Never convert rack fields to hourly fields."
        ],
        validation:
          "Current efficient-product records do not represent the installed baseline. No retained historical existing-model population or category golden fixture is present, so only an exact project record can support this process and implementation proof remains pending.",
        selectionPolicy: {
          outputCardinality: "ONE_SELECTED_RECORD",
          multipleRecordRule: "NOT_APPLICABLE_DETERMINISTIC_SELECTION",
          selectedValueMethod:
            "Return one exact existing project or retained historical certification record. No population fallback is allowed."
        },
        outputBindings: productRecordOutput(
          "One exact existing dishwasher native-field record",
          "existing_dishwasher_record"
        )
      }
    ),
    makeCombinedProcess(
      category,
      productStandards,
      "exact-proposed-dishwasher-record",
      "Exact Proposed Dishwasher Native-Field Resolution",
      {
        ...productSource,
        purpose:
          "Resolve one exact opportunity-named proposed dishwasher record while preserving rack and flight fields in their native units.",
        lookupInputs: [
          "Exact proposed dishwasher make and model from the linked opportunity",
          "Machine type, sanitation method, application, and capacity"
        ],
        valueNeeded: [
          "One exact proposed dishwasher native-field record"
        ],
        howToUse: [
          "Match the exact manufacturer and model and require an active compatible certification record.",
          "Classify the record as rack or flight/conveyor before reading performance fields.",
          "For rack machines, retain gallons per rack, active kilowatt-hours per rack, and idle kilowatts.",
          "For flight/conveyor machines, retain gallons per hour, active kilowatt-hours per hour only when explicitly reported, and idle kilowatts.",
          "Reject any calculation that would convert gallons per rack to gallons per hour or active kilowatt-hours per rack to an hourly value."
        ],
        validation:
          "The retained ENERGY STAR schema fixture proves machine type, sanitation, rack water, flight water, rack active electricity, and idle-power fields. It does not prove a flight active-electricity-per-hour field, an exact category adapter, or an end-to-end golden case, so unsupported flight fields remain blocked and implementation proof is pending.",
        outputBindings: productRecordOutput(
          "One exact proposed dishwasher native-field record",
          "proposed_dishwasher_record"
        )
      }
    ),
    makeCombinedProcess(
      category,
      productStandards,
      "requirement-proposed-dishwasher-record",
      "Requirement-Based Proposed Dishwasher Native-Field Resolution",
      {
        ...productSource,
        purpose:
          "Select one compatible proposed dishwasher record from explicit opportunity requirements without mixing rack and flight populations.",
        lookupInputs: [
          "Dishwasher requirements from the linked opportunity",
          "Required machine type, sanitation method, application, and capacity"
        ],
        valueNeeded: [
          "One selected compatible proposed dishwasher native-field record"
        ],
        howToUse: [
          "Extract every mandatory machine-type, sanitation, application, capacity, and performance restriction from the linked opportunity.",
          "Filter rack and flight/conveyor records as separate populations.",
          "Preserve each eligible record's native gallons-per-rack or gallons-per-hour, active-energy, and idle-power fields.",
          "Use an official recommended or typical record when available, otherwise use a valid weighted median or the ordinary median of the eligible compatible population.",
          "Return one complete compatible record and retain the source version, filters, population, population size, selection rule, fields, native units, and limitations."
        ],
        validation:
          "The retained ENERGY STAR schema fixture proves the native field families and filter fields. No retained eligible candidate population or category golden fixture proves the selected record, and the published schema does not prove flight active electricity per hour, so implementation remains pending.",
        outputBindings: productRecordOutput(
          "One selected compatible proposed dishwasher native-field record",
          "proposed_dishwasher_record"
        )
      }
    ),
    makeProcess(
      category,
      "STD-CONTEXT-BENCHMARKS",
      "rack-dishwasher-activity",
      "Rack-Machine Activity Resolution",
      {
        sourceLinkLabels: CONTEXT_BENCHMARK_LINK_SELECTIONS[category.id],
        purpose:
          "Resolve annual racks per equipment unit for one compatible rack-machine type and sanitation method.",
        lookupInputs: [
          "Rack-machine type and sanitation method",
          "Approximate racks per operating day, when known",
          "Operating days per week",
          "Active weeks per year"
        ],
        valueNeeded: [
          "Annual racks per equipment unit"
        ],
        howToUse: [
          "Use exact project racks per operating day when available.",
          "Otherwise select the exact retained ENERGY STAR calculator default for the compatible rack-machine type and sanitation method.",
          "Calculate annual racks per equipment unit as selected racks per day multiplied by operating days per week and active weeks per year.",
          "Return the per-equipment-unit annual rack value and multiply by equipment quantity exactly once in the formula.",
          "Do not use this resolver for flight or conveyor machines and do not convert the result to operating hours."
        ],
        validation:
          "The retained ENERGY STAR calculator fixture proves explicit rack-machine daily defaults for supported types and the annualization equation. The category adapter and end-to-end golden fixture remain pending.",
        outputBindings: [
          {
            outputName: "Annual racks per equipment unit",
            formulaTerm: "annual_racks_per_unit",
            outputScope: "PER_EQUIPMENT_UNIT"
          }
        ]
      }
    ),
    makeProcess(
      category,
      "STD-CONTEXT-BENCHMARKS",
      "flight-dishwasher-activity",
      "Flight or Conveyor Activity Resolution",
      {
        sourceLinkLabels: CONTEXT_BENCHMARK_LINK_SELECTIONS[category.id],
        purpose:
          "Resolve annual operating hours per equipment unit for a flight or conveyor machine without translating rack activity.",
        lookupInputs: [
          "Exact annual operating hours per equipment unit from controls, an audit, or another Project Document"
        ],
        valueNeeded: [
          "Annual flight or conveyor operating hours per equipment unit"
        ],
        howToUse: [
          "Require exact annual operating hours per equipment unit from controls, an operating record, or an audit.",
          "Validate that the hours apply to the same flight or conveyor machine and period as the native gallons-per-hour and active-electricity-per-hour fields.",
          "Return annual operating hours per equipment unit.",
          "Multiply by equipment quantity exactly once in the flight formula.",
          "When exact hours are unavailable, report the implementation limitation. The retained rack defaults are not a flight-machine fallback."
        ],
        validation:
          "The retained calculator fixture does not supply a defensible flight-machine annual-hours population. Only an exact project record is supported, and no category golden fixture exists, so implementation proof remains pending.",
        selectionPolicy: {
          multipleRecordRule: "NOT_APPLICABLE_DETERMINISTIC_SELECTION",
          selectedValueMethod:
            "Return one exact per-equipment-unit annual-hours value. No rack or generic activity fallback is allowed."
        },
        outputBindings: [
          {
            outputName:
              "Annual flight or conveyor operating hours per equipment unit",
            formulaTerm: "annual_operating_hours_per_unit",
            outputScope: "PER_EQUIPMENT_UNIT"
          }
        ]
      }
    ),
    makeProcess(
      category,
      "STD-DISHWASHER-WATER-HEATING",
      "dishwasher-water-heating-conversion",
      "Dishwasher Water-Heating Conversion",
      {
        purpose:
          "Convert existing and proposed native water quantities to purchased building and booster heating resource in the selected machine's same rack or hourly activity unit.",
        lookupInputs: [
          "Rack or flight/conveyor machine type and sanitation method",
          "Existing and proposed native water quantity from the connected product records",
          "Incoming water temperature",
          "Wash, rinse, or booster temperature or certified hot-water quantity",
          "Water-heating resource type",
          "Water-heater efficiency"
        ],
        valueNeeded: [
          "One native-unit existing and proposed dishwasher water-heating result set"
        ],
        howToUse: [
          "Select the rack or flight/conveyor branch before calculating water heating.",
          "Use gallons per rack for the rack branch or gallons per operating hour for the flight branch.",
          "Resolve incoming and wash, rinse, or booster temperatures, purchased resource, and heater efficiency from complete project engineering inputs or the compatible retained ENERGY STAR calculator input set.",
          "Calculate purchased building and booster resource from water volume, water density, specific heat, temperature rise, resource conversion, and heater efficiency.",
          "Return existing and proposed resource per rack or per hour in the same native activity unit and retain the complete input set, equation, units, source version, and warnings."
        ],
        validation:
          "The retained March 2024 ENERGY STAR calculator fixture proves the building and booster temperature-rise and efficiency equations. The category adapter and end-to-end golden fixture remain pending, and incompatible or incomplete project boundaries remain blocked.",
        selectionPolicy: {
          outputCardinality: "ONE_SELECTED_RESULT_SET"
        },
        outputBindings: [
          {
            outputName:
              "One native-unit existing and proposed dishwasher water-heating result set",
            formulaTerm: "dishwasher_water_heating_result",
            outputScope: "RECORD_SET"
          }
        ]
      }
    )
  ];
}

const CONTEXT_BENCHMARK_CONFIG = {
  "ITC-02": {
    name: "Existing Fixture Wattage Benchmark",
    purpose: "Select one existing exterior-fixture wattage when a nameplate, photometric report, or field measurement is unavailable.",
    lookupInputs: [
      "Existing fixture type or exterior application",
      "Building and site context",
      "Exact existing wattage from a Project Document, when available"
    ],
    valueNeeded: [
      "One existing input-watt value per fixture"
    ],
    howToUse: [
      "Use the exact nameplate, photometric report, or field measurement when available.",
      "Otherwise map the recognizable application to the reviewed DOE outdoor application classes, such as commercial building exterior, parking, roadway, billboard, or sports field.",
      "Select the published application-average system wattage for that class; do not reuse FEMP's proposed-efficacy table as an existing-equipment baseline.",
      "Return one wattage value and feed it to the displayed lighting replacement formula.",
      "Retain the source version, application mapping, selected row, unit, and fallback level."
    ],
    validation: "DOE's 2015 U.S. Lighting Market Characterization Table 4.29 reports application-specific outdoor average system wattages. The retained source fixture records the reviewed rows and scope. The values are screening benchmarks, not project-specific nameplate values, and a category calculation golden fixture has not yet been added."
  },
  "ITC-08": {
    name: "Solar Water-Heating Input Benchmark",
    purpose: "Select one screening collector, hot-water-load, and backup-system input set when exact project documents are incomplete.",
    lookupInputs: [
      "Business activity and building type",
      "Building area and operating schedule",
      "Bill water-heating resource use",
      "Collector requirements from the linked opportunity",
      "Available collector, load, and backup-system Project Documents"
    ],
    valueNeeded: [
      "One context-matched collector and storage configuration",
      "One annual hot-water load",
      "One backup-system efficiency"
    ],
    validation: "The DOE reference-building source supports context matching, while SAM supplies the simulation method only after inputs are selected. A retained category benchmark fixture is not yet present, so the selection adapter remains implementation-pending and must not be attributed to SAM."
  },
  "ITC-16": {
    name: "Demand-Response Event Behavior Benchmark",
    purpose: "Select one conservative shed, availability, duration, and rebound profile when a Project Document does not provide exact event behavior.",
    lookupInputs: [
      "Business activity and building type",
      "Operating schedule",
      "Interval utility data",
      "Controllable equipment types",
      "Opportunity event and maximum-shed restrictions"
    ],
    valueNeeded: [
      "One maximum shed value",
      "One event-availability schedule",
      "One maximum event duration",
      "One rebound or recovery profile"
    ],
    validation: "DOE building-load datasets can support context-matched controllable-load profiles after the exact end-use filters and retained population are implemented. No retained demand-response population currently proves those filters, so the benchmark method is defined but execution proof remains pending."
  },
  "ITC-23": {
    name: "Battery Dispatch Boundary Benchmark",
    purpose: "Select one screening dispatch boundary for a missing terminal state-of-charge rule without inventing battery power or energy capacity.",
    lookupInputs: [
      "Initial state of charge",
      "Dispatch horizon",
      "Opportunity or Project Document reserve requirement"
    ],
    valueNeeded: [
      "One terminal state-of-charge constraint"
    ],
    howToUse: [
      "Use the terminal state-of-charge constraint from the linked opportunity or Project Document when it is explicit.",
      "Otherwise set terminal state of charge equal to initial state of charge for the annual screening horizon so the optimizer cannot create savings by ending with less stored energy.",
      "Keep battery power, usable-energy capacity, efficiencies, availability, and reserve constraints separate and source them through the displayed project paths.",
      "Return one terminal state-of-charge constraint to the dispatch process.",
      "Retain the exact or benchmark source, horizon, initial value, terminal value, and fallback level."
    ],
    validation: "The REopt input reference confirms that storage state constraints are model inputs. Equality to the initial state is a deterministic RetroFi screening boundary, not a value supplied by REopt and not a substitute for missing battery design specifications. A retained category dispatch golden fixture has not yet been added."
  },
  "ITC-28": {
    name: "Fleet Charging Activity and Vehicle Benchmark",
    purpose: "Select one fleet arrival, departure, charging profile, and class-matched vehicle electricity intensity when a fleet utilization study or exact proposed model is unavailable.",
    lookupInputs: [
      "Vehicle class and service need",
      "Annual fleet miles",
      "Business operating schedule",
      "Fleet vocation",
      "Installed port count"
    ],
    valueNeeded: [
      "One representative arrival and departure schedule",
      "One uncontrolled charging profile",
      "One class-matched vehicle electricity intensity"
    ],
    validation: "NLR Fleet DNA provides real-world commercial duty-cycle populations by vocation and vehicle class. A retained eligible-population extract and fleet-charging adapter are not yet present, so the context filters are defined but the selected median schedule is implementation-pending."
  },
  "ITC-30": {
    name: "Material-Handling Resource-Intensity Resolver",
    purpose: "Resolve comparable existing-fuel and proposed-electric resource intensity for the same material-handling class, capacity, and duty.",
    lookupInputs: [
      "Exact measured or contractual hourly resource use from a Project Document",
      "Equipment class and rated capacity",
      "Fuel or electric propulsion type",
      "Comparable operating duty",
      "Annual operating hours from the connected schedule process"
    ],
    valueNeeded: [
      "One compatible existing fuel-use intensity",
      "One compatible proposed wall-electricity intensity"
    ],
    howToUse: [
      "Use exact measured or contractual hourly resource use for both systems when comparable records exist.",
      "Otherwise filter an authoritative population by equipment class, rated capacity, propulsion type, and operating duty before selecting any intensity.",
      "Use the retained Argonne 5,000-pound electric and propane hourly pair only when the project matches that capacity and duty boundary.",
      "Do not extrapolate the paired record to another capacity, duty, fuel, battery, charger, shift pattern, or annual schedule.",
      "Return one existing and one proposed intensity in native hourly units and retain the source version, filters, selected record, units, and limitation."
    ],
    validation: "The retained Argonne fixture proves a 5,000-pound electric forklift value of 7.5 kWh per operating hour and a paired propane value of 1.38 gallons per operating hour, plus separate useful-work intensities. The broad category remains blocked outside exact project inputs or this compatible record because the report documents material usage variability and limited operating data. No category calculation golden fixture is retained, so end-to-end execution proof remains pending.",
    outputBindings: [
      {
        outputName: "One compatible existing fuel-use intensity",
        formulaTerm: "existing_fuel_per_hour",
        outputScope: "PER_HOUR"
      },
      {
        outputName: "One compatible proposed wall-electricity intensity",
        formulaTerm: "proposed_kWh_per_hour",
        outputScope: "PER_HOUR"
      }
    ]
  },
  "ITC-39": {
    name: "Pump or Fan Operating-Profile Benchmark",
    purpose: "Select one representative operating profile when controls trends, measurements, or an engineering audit do not provide load bins.",
    lookupInputs: [
      "Pump or fan application",
      "Business activity and building type",
      "Equipment capacity class",
      "Operating schedule",
      "Climate and geography"
    ],
    valueNeeded: [
      "One normalized load or speed profile",
      "One annual-hours allocation across its bins"
    ],
    validation: "DOE building-load data can support application-specific operating-profile populations after equipment, building, schedule, climate, and geography filters are implemented. No retained eligible population currently proves those filters, so the benchmark adapter remains implementation-pending."
  },
  "ITC-48": {
    name: "Comparable Cooking-Duty Resolver",
    purpose: "Resolve existing and proposed cooking input only when both values represent the same published or project-tested cooking duty.",
    lookupInputs: [
      "Existing cooking equipment type and resource",
      "Proposed induction equipment type and resource",
      "Identical tested cooking duty definition",
      "Annual activity in that tested duty unit",
      "Exact project test records when available"
    ],
    valueNeeded: [
      "One existing resource intensity per identical tested cooking duty",
      "One proposed resource intensity per identical tested cooking duty"
    ],
    howToUse: [
      "Use exact project test records when existing and proposed equipment were measured under the same duty boundary.",
      "Otherwise require the commercial electric-cooktop scope and the retained 20-pound water-boil duty from 70 to 200 degrees Fahrenheit.",
      "For that compatible duty only, use the retained ENERGY STAR calculator values of 1.03 kWh per conventional electric boil and 0.91 kWh per efficient electric boil.",
      "Reject gas-to-electric, different batch, different temperature rise, different product family, and unmatched food-duty comparisons.",
      "Multiply the selected intensity difference by annual activity in the same duty unit and retain the source version, exact filters, native units, and unsupported-scope warning."
    ],
    validation: "The retained ENERGY STAR CFS calculator fixture proves the electric-cooktop 20-pound water-boil duty, conventional and efficient cooking efficiencies, 1.03 and 0.91 kWh per boil values, and annualization equation. It does not prove gas-to-induction savings or a different cooking duty, so those cases remain blocked without exact comparable project tests. No category calculation golden fixture is retained, so end-to-end execution proof remains pending.",
    outputBindings: [
      {
        outputName: "One existing resource intensity per identical tested cooking duty",
        formulaTerm: "existing_resource_per_activity_r",
        outputScope: "PER_EVENT"
      },
      {
        outputName: "One proposed resource intensity per identical tested cooking duty",
        formulaTerm: "proposed_resource_per_activity_r",
        outputScope: "PER_EVENT"
      }
    ]
  },
  "ITC-49": {
    name: "Walk-In Component Energy Benchmark",
    purpose: "Resolve class-matched baseline and proposed annual energy for the exact walk-in panel, door, or refrigeration component boundary.",
    lookupInputs: [
      "Component type and DOE equipment class",
      "Walk-in temperature class",
      "Indoor or outdoor configuration",
      "Panel area when a panel intensity is selected",
      "Existing and proposed efficiency levels"
    ],
    valueNeeded: [
      "One class-matched existing annual component energy",
      "One class-matched proposed annual component energy"
    ],
    howToUse: [
      "Identify the component as panel, door, or refrigeration system and resolve its exact DOE equipment-class code.",
      "Filter temperature class, indoor or outdoor placement, configuration, and baseline or proposed efficiency level before selecting a row.",
      "For panels, multiply the selected kWh per square foot per year by matched panel area exactly once.",
      "For doors and refrigeration systems, use the selected annual kWh value directly and do not multiply by operating hours.",
      "Sum only explicitly in-scope components and retain table number, row code, efficiency level, native unit, source version, and all class filters."
    ],
    validation: "The retained DOE fixture records reviewed class rows and native units from Tables IV.31, IV.32, and IV.33. It proves a class-matched component benchmark, not whole-box project energy. The category remains blocked when the component boundary, class filters, panel area, or same-duty project scope is unavailable. No category calculation golden fixture is retained, so end-to-end execution proof remains pending.",
    outputBindings: [
      {
        outputName: "One class-matched existing annual component energy",
        formulaTerm: "current_annual_refrigeration_kWh",
        outputScope: "PER_EQUIPMENT_UNIT"
      },
      {
        outputName: "One class-matched proposed annual component energy",
        formulaTerm: "proposed_annual_refrigeration_kWh",
        outputScope: "PER_EQUIPMENT_UNIT"
      }
    ]
  }
};

function buildContextBenchmarkProcess(category) {
  const config = CONTEXT_BENCHMARK_CONFIG[category.id];
  if (!config) {
    throw new Error(`Missing context-benchmark configuration for ${category.id}`);
  }
  return makeProcess(
    category,
    "STD-CONTEXT-BENCHMARKS",
    "context_benchmarks",
    config.name,
    {
      sourceLinkLabels: CONTEXT_BENCHMARK_LINK_SELECTIONS[category.id],
      purpose: config.purpose,
      lookupInputs: config.lookupInputs,
      valueNeeded: config.valueNeeded,
      howToUse: config.howToUse,
      validation: config.validation,
      outputBindings: config.outputBindings,
      selectionPolicy: config.selectionPolicy
    }
  );
}

function buildExteriorLightingProcesses(category) {
  return [
    buildContextBenchmarkProcess(category),
    makeProcess(category, "STD-FEMP-EXTERIOR-LIGHTING", "exact-new-fixture-watts", "Exact New Fixture Wattage Lookup", {
      sourceName: "DesignLights Consortium - Solid-State Lighting Qualified Products List",
      sourceLinkLabels: [
        "DLC API and data download user guide",
        "SSL V6.0 and LUNA V2.0 Technical Requirements"
      ],
      purpose: "Resolve input watts when the linked opportunity names an exact replacement luminaire.",
      lookupInputs: ["Exact replacement product information from the linked opportunity", "Exterior lighting application"],
      valueNeeded: ["Exact proposed input watts per fixture with product provenance"],
      validation: "The official DLC data-access guide documents tokenized SSL QPL CSV downloads, and the technical requirements define model, application, light-output, efficacy, input-power, status, and version fields. No authenticated QPL extract, retained exact-product fixture, or category adapter is present, so implementation execution is not yet proved."
    }),
    makeProcess(category, "STD-FEMP-EXTERIOR-LIGHTING", "requirement-new-fixture-watts", "Requirement-Based New Fixture Wattage Resolution", {
      sourceName: "DesignLights Consortium - Solid-State Lighting Qualified Products List",
      sourceLinkLabels: [
        "DLC API and data download user guide",
        "SSL V6.0 and LUNA V2.0 Technical Requirements"
      ],
      purpose: "Interpret performance requirements when the linked opportunity does not name an exact replacement product.",
      lookupInputs: ["Product requirements from the linked opportunity", "Exterior lighting application", "Required light output or performance criteria"],
      valueNeeded: ["One selected compatible QPL input-watt value, with the eligible population, filters, population size, and median rule retained internally"],
      validation: "The official DLC data-access guide and SSL technical requirements establish a candidate-filtering method. No retained QPL population currently proves the application, light-output, distribution, mounting, controls, active-status, and version filters or the resulting selected median wattage."
    }),
    makeProcess(category, "STD-OPERATING-SCHEDULE", "fixed-lighting-hours", "Fixed-Schedule Lighting Hours", {
      sourceName: "U.S. Department of Energy - Commercial Reference Buildings",
      sourceLinkLabels: ["Commercial Reference Buildings"],
      purpose: "Calculate annual exterior-lighting hours for a fixed business or calendar schedule.",
      lookupInputs: ["Lighting hours per operating day", "Operating days per week", "Active weeks per year"],
      valueNeeded: ["Annual operating hours"],
      selectedStrategy: "Deterministic calendar calculation from an explicit fixed operating schedule.",
      automationMethod: "Calculate annual hours from operating hours per day, operating days per week, active weeks, holidays, and any declared seasonal exceptions.",
      validation: "The DOE commercial reference-building schedule context was checked. The calendar arithmetic is deterministic when all schedule inputs are supplied, but no category golden fixture exists and a business label alone is not a validated annual-hours value."
    }),
    makeProcess(category, "STD-OPERATING-SCHEDULE", "daylight-lighting-hours", "Daylight-Based Lighting Hours", {
      sourceName: "U.S. Naval Observatory - daylight definitions and data services",
      sourceLinkLabels: ["Rise, Set, and Twilight Definitions", "Data Services API"],
      purpose: "Calculate annual exterior-lighting hours for dusk-to-dawn or photocell control.",
      lookupInputs: ["Control type and timing offset", "Site location", "Analysis year"],
      valueNeeded: ["Annual daylight-based operating hours"],
      selectedStrategy: "Versioned daylight calculation from site location, analysis year, and the declared exterior-lighting control rule.",
      automationMethod: "Resolve local sunrise, sunset, or civil-twilight times, apply the control offset and timezone rules for every day, and sum the resulting annual operating hours.",
      validation: "The USNO daylight definitions and data-services interface were checked. Location-specific calculation is feasible when location, year, timezone, and control offset are supplied, but no category golden fixture exists."
    }),
    makeCombinedProcess(
      category,
      ["STD-FEMP-EXTERIOR-LIGHTING", "STD-OPERATING-SCHEDULE"],
      "lighting-replacement-calculation",
      "Lighting-Replacement Calculation",
      {
        sourceName: "DOE FEMP, DesignLights Consortium, DOE reference buildings, and U.S. Naval Observatory",
        purpose: "Calculate annual electricity reduction from fixture count, existing and proposed watts, and the resolved annual schedule.",
        lookupInputs: ["Replacement fixture count", "Existing fixture watts", "New fixture watts", "Annual operating hours"],
        valueNeeded: ["Annual electricity reduction in kilowatt-hours"],
        howToUse: [
          "Confirm that all fixtures in the row share the same existing watts, proposed watts, and operating schedule.",
          "Subtract proposed fixture watts from existing fixture watts and divide the difference by 1,000.",
          "Multiply the kilowatt difference by fixture count and annual operating hours.",
          "Return annual electricity reduction in kilowatt-hours and keep negative results when the proposed design adds load.",
          "Store the fixture and schedule sources used by the calculation."
        ],
        selectedStrategy: "Deterministic local arithmetic after all connected fixture and schedule processes resolve.",
        automationMethod: "Apply the displayed replacement formula once to each homogeneous fixture group, then sum the annual electricity results.",
        difficulty: "Easy",
        validation: "The arithmetic and unit conversion are deterministic and correspond to the displayed formula. The result is executable only when fixture count, existing watts, proposed watts, and annual operating hours have all been resolved. A category-level golden test has not yet been added, and the reviewed source gaps for those inputs remain visible in the connected processes."
      }
    )
  ];
}

function makeProcess(category, standardId, key, name, overrides = {}) {
  return makeCombinedProcess(category, [standardId], key, name, overrides);
}

function makeCombinedProcess(category, standardIds, key, name, overrides = {}) {
  const primary = PROCESS_LIBRARY[standardIds[0]];
  if (!primary) throw new Error(`Missing process library entry for ${standardIds[0]}`);
  const valueNeeded = overrides.valueNeeded || [primary.valueNeeded];
  const lookupInputs = overrides.lookupInputs || inferLookupInputs(category, standardIds);
  const outputSummary = valueNeeded.join("; ").replace(/\.$/, "");
  const processSpecific = buildProcessSpecificContent(
    category,
    standardIds,
    key,
    name,
    lookupInputs,
    valueNeeded,
    primary
  );
  const process = {
    key,
    name,
    canonicalStandardIds: standardIds,
    sourceName: overrides.sourceName || primary.sourceName,
    purpose: overrides.purpose || `Use ${primary.sourceName} to resolve ${lowercaseFirst(outputSummary)} from the listed category inputs.`,
    lookupInputs,
    valueNeeded,
    howToUse: overrides.howToUse || processSpecific.howToUse,
    automation: {
      selectedStrategy: overrides.selectedStrategy || processSpecific.selectedStrategy || primary.strategy,
      automationMethod: overrides.automationMethod || processSpecific.automationMethod || primary.method,
      difficulty: overrides.difficulty || primary.difficulty
    },
    validation: overrides.validation || buildValidation(category, standardIds),
    evidenceState: overrides.evidenceState || processSpecific.evidenceState,
    inputBindings: overrides.inputBindings || lookupInputs.map((lookupInput) => ({
      lookupInput,
      use: describeLookupInputUse(category, key, lookupInput)
    })),
    outputBindings: overrides.outputBindings || [],
    selectionPolicy: buildSelectionPolicy(
      category,
      key,
      valueNeeded,
      overrides.selectionPolicy
    )
  };
  if (overrides.sourceLinkLabels) process.sourceLinkLabels = overrides.sourceLinkLabels;
  return process;
}

function describeLookupInputUse(category, processKey, lookupInput) {
  const purpose = /^requirement-/.test(processKey)
    ? "filter the compatible authoritative product population before selecting one value"
    : /^exact-/.test(processKey) || processKey === "fueleconomy_vehicles"
      ? "resolve and validate one exact authoritative record"
      : "filter the applicable authoritative benchmark or supply the displayed calculation";
  return `${lookupInput} is used by ${CARD_COPY[category.id].title} to ${purpose}.`;
}

function describeBoundInputUse(process, lookupInput) {
  const outputs = process.valueNeeded.join(" and ");
  if (/^requirement-/.test(process.key)) {
    return `Apply the exact bound ${lookupInput} as a compatibility filter before ${process.name} emits ${outputs}.`;
  }
  if (/^exact-/.test(process.key) || process.key === "fueleconomy_vehicles") {
    return `Apply the exact bound ${lookupInput} to resolve and validate the authoritative record before ${process.name} emits ${outputs}.`;
  }
  return `Pass the exact bound ${lookupInput} to ${process.name} when computing ${outputs}; do not substitute a value from another tree path.`;
}

function buildSelectionPolicy(category, key, valueNeeded, overrides = {}) {
  const exactProduct = /^exact-/.test(key) || key === "fueleconomy_vehicles";
  const requirementProduct = /^requirement-/.test(key);
  const existingProduct = key === "existing-product-rating";
  const outputCardinality =
    overrides.outputCardinality ||
    inferOutputCardinality(key, valueNeeded);
  const usesPopulationSelection = [
    "ONE_SELECTED_SCALAR",
    "ONE_SELECTED_RECORD"
  ].includes(outputCardinality) && !exactProduct;
  const selectedValueMethod = exactProduct
    ? "Return the one exact compatible authoritative record after all category filters pass."
    : requirementProduct
      ? "Use the source's official recommended or typical value when present; otherwise select the weighted median when valid weights exist, or the ordinary median of the eligible compatible population."
      : existingProduct
        ? "Use an exact documented existing value when available; otherwise select one context-matched installed-equipment benchmark without treating the current efficient-product population as the existing baseline."
        : usesPopulationSelection
          ? "Select one source-supported scalar or record at the highest implemented fallback level. Apply the official-value, weighted-median, then median rule only to an eligible authoritative population."
          : "Select one complete compatible profile, input set, or result set. Do not collapse a structured output to a median scalar.";
  const policy = {
    outputCardinality,
    fallbackOrder: [...SINGLE_VALUE_FALLBACK_ORDER],
    multipleRecordRule: usesPopulationSelection
      ? "OFFICIAL_RECOMMENDED_OR_TYPICAL_THEN_WEIGHTED_MEDIAN_THEN_MEDIAN"
      : "NOT_APPLICABLE_DETERMINISTIC_SELECTION",
    selectedValueMethod,
    missingExactValueBehavior: usesPopulationSelection
      ? "Continue only through implemented source-specific fallback levels. If no level has a documented population, filters, numeric rule, version, and evidence fixture, report the explicit implementation limitation. Never invent a value, choose an arbitrary future product, or use zero as a missing-data placeholder."
      : "Use only a complete compatible structured output from an implemented exact or source-specific fallback path. If none is available, report the explicit implementation limitation. Never synthesize a placeholder profile, input set, or result set.",
    retainedMetadata: [...SINGLE_VALUE_RETAINED_METADATA],
    ...overrides
  };
  const finalPopulationSelection = [
    "ONE_SELECTED_SCALAR",
    "ONE_SELECTED_RECORD"
  ].includes(policy.outputCardinality) &&
    policy.multipleRecordRule !== "NOT_APPLICABLE_DETERMINISTIC_SELECTION";
  policy.multipleRecordRule = finalPopulationSelection
    ? "OFFICIAL_RECOMMENDED_OR_TYPICAL_THEN_WEIGHTED_MEDIAN_THEN_MEDIAN"
    : "NOT_APPLICABLE_DETERMINISTIC_SELECTION";
  if (
    !finalPopulationSelection &&
    !["ONE_SELECTED_SCALAR", "ONE_SELECTED_RECORD"].includes(
      policy.outputCardinality
    )
  ) {
    policy.selectedValueMethod =
      "Select one complete compatible structured output using the documented source-specific method. Preserve its ordered records and internal relationships.";
    policy.missingExactValueBehavior =
      "Use only a complete compatible structured output from an implemented exact or source-specific fallback path. If none is available, report the explicit implementation limitation. Never synthesize a placeholder profile, input set, or result set.";
  }
  return policy;
}

function inferOutputCardinality(key, valueNeeded) {
  const text = `${key} ${(valueNeeded || []).join(" ")}`;
  if (
    /\b(?:result set|bill result|resource results|outputs by resource|baseline and proposed)\b/i.test(text)
  ) {
    return "ONE_SELECTED_RESULT_SET";
  }
  if (/\b(?:interval|hourly|load profile|time-of-day|distribution|dispatch profile)\b/i.test(text)) {
    return "ONE_SELECTED_PROFILE";
  }
  if (
    /\b(?:input set|tariff|billing rules|calendar|configuration|assumptions)\b/i.test(text)
  ) {
    return "ONE_SELECTED_INPUT_SET";
  }
  if (/^(?:exact-|requirement-)/.test(key) || /\b(?:record|model match)\b/i.test(text)) {
    return "ONE_SELECTED_RECORD";
  }
  return "ONE_SELECTED_SCALAR";
}

function ensureProcessInputTreeBindings(category, tree, processes) {
  const processByKey = new Map(processes.map((process) => [process.key, process]));
  for (const process of processes) {
    const processNodes = [];
    const collect = (treeNode) => {
      if (treeNode.processKey === process.key) processNodes.push(treeNode);
      for (const child of treeNode.children || []) collect(child);
    };
    collect(tree);
    if (processNodes.length === 0) continue;
    for (const processNodeReference of processNodes) {
      const locations = collectBindingLocations(tree, processByKey);
      const processLocations = locations.filter(
        (location) => location.processKey === process.key
      );
      for (const lookupInput of process.lookupInputs) {
        const candidates = locations
          .filter(
            (location) =>
              location.processKey !== process.key &&
              location.sourceLabel
          )
          .map((location) => ({
            location,
            score: scoreBindingLocation(
              lookupInput,
              process,
              processLocations[0],
              location
            )
          }))
          .sort((left, right) => right.score - left.score);
        if (candidates[0]?.score > 0) continue;
        const sourceLabel = inferLookupInputSourceLabel(
          category,
          process,
          lookupInput
        );
        const visibleInput = friendlyTechnicalInput(
          stripInternalTreeText(lookupInput),
          sourceLabel
        );
        processNodeReference.children.push(
          node(`${visibleInput} (${sourceLabel})`)
        );
      }
    }
  }
}

function attachIntervalTariffProcess(tree, processes) {
  if (!processes.some((process) => process.key === "interval_tariff")) return;
  if (collectProcessReferences(tree).includes("interval_tariff")) return;
  let target = null;
  const visit = (treeNode) => {
    if (
      !target &&
      /(?:Chronological .*Tariff|Interval Tariff Value)/i.test(treeNode.text)
    ) {
      target = treeNode;
    }
    for (const child of treeNode.children || []) visit(child);
  };
  visit(tree);
  (target || tree).children.push(processNode("interval_tariff"));
}

function inferLookupInputSourceLabel(category, process, lookupInput) {
  if (/^exact-|^requirement-/.test(process.key)) return "Linked Opportunity";
  if (
    /\b(?:bill|tariff|rate schedule|utility data|utility artifact)\b/i.test(
      lookupInput
    )
  ) {
    return "Bill";
  }
  if (
    /\b(?:profile|building type|site context|site location|geography|floor area)\b/i.test(
      lookupInput
    ) &&
    (category.inputs?.Profile || []).length > 0
  ) {
    return "Profile";
  }
  if (
    /\bfrom the connected\b/i.test(lookupInput)
  ) {
    return "Derived";
  }
  return "Project Document";
}

const SOURCE_LABEL_PATTERN =
  /\s+\((User|Profile|Bill|Linked Opportunity|Project Document|Derived)\)$/;
const BINDING_STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "annual",
  "applicable",
  "by",
  "category",
  "connected",
  "current",
  "documented",
  "each",
  "exact",
  "for",
  "from",
  "in",
  "input",
  "inputs",
  "of",
  "one",
  "or",
  "per",
  "process",
  "project",
  "resolved",
  "selected",
  "site",
  "source",
  "the",
  "to",
  "value",
  "with"
]);

function finalizeProcessBindings(category, tree, processes) {
  const processByKey = new Map(processes.map((process) => [process.key, process]));
  const locations = collectBindingLocations(tree, processByKey);
  const formulaTerms = category.semanticContract?.formula_terms || [];
  for (const process of processes) {
    const processLocations = locations.filter(
      (location) => location.processKey === process.key
    );
    if (processLocations.length === 0) {
      throw new Error(`${category.id} process ${process.key} has no tree location`);
    }
    process.inputBindings = process.lookupInputs.map((lookupInput) => {
      const location = resolveInputBindingLocation(
        lookupInput,
        process,
        processLocations,
        locations
      );
      return {
        lookupInput,
        treePath: location.treePath,
        sourceLabel: location.sourceLabel,
        use: describeBoundInputUse(process, lookupInput)
      };
    });
    process.outputBindings = process.valueNeeded.map((outputName) => {
      const hint = (process.outputBindings || []).find(
        (binding) => binding.outputName === outputName
      );
      const term = resolveOutputFormulaTerm(
        category,
        process,
        outputName,
        formulaTerms,
        hint?.formulaTerm
      );
      return {
        outputName,
        treePath: processLocations[0].treePath,
        formulaTerm: term.name,
        outputUnit: term.display_unit,
        outputScope:
          hint?.outputScope ||
          inferOutputScope(process, outputName, term)
      };
    });
  }
}

function collectBindingLocations(tree, processByKey) {
  const locations = [];
  const visit = (treeNode, parentSegments) => {
    const process = treeNode.processKey
      ? processByKey.get(treeNode.processKey)
      : null;
    const sourceLabel = treeNode.processKey
      ? "Standard Output"
      : treeNode.text.match(SOURCE_LABEL_PATTERN)?.[1] || null;
    const segment = treeNode.processKey
      ? `Standard ${process?.displayNumber || "unassigned"} - ${process?.name || treeNode.processKey}`
      : stripInternalTreeText(treeNode.text).replace(SOURCE_LABEL_PATTERN, "");
    const segments = [...parentSegments, segment].filter(Boolean);
    locations.push({
      treePath: segments.join(" > "),
      segments,
      processKey: treeNode.processKey || null,
      sourceLabel,
      isTerminal: !treeNode.processKey && treeNode.children.length === 0,
      text: segment
    });
    for (const child of treeNode.children || []) visit(child, segments);
  };
  visit(tree, []);
  return locations;
}

function resolveInputBindingLocation(
  lookupInput,
  process,
  processLocations,
  locations
) {
  const processLocation = processLocations[0];
  const candidates = locations.filter(
    (location) =>
      location.processKey !== process.key &&
      location.sourceLabel
  );
  const scored = candidates
    .map((location) => ({
      location,
      score: scoreBindingLocation(
        lookupInput,
        process,
        processLocation,
        location
      )
    }))
    .sort((left, right) =>
      right.score - left.score ||
      left.location.treePath.localeCompare(right.location.treePath)
    );
  if (!scored.length || scored[0].score < 1) {
    throw new Error(
      `${process.key} lookup input ${lookupInput} has no exact tree-path candidate`
    );
  }
  return scored[0].location;
}

function scoreBindingLocation(lookupInput, process, processLocation, candidate) {
  const lookupTokens = bindingTokens(lookupInput);
  const candidateTokens = bindingTokens(
    `${candidate.text} ${candidate.treePath}`
  );
  let semanticScore =
    [...lookupTokens].filter((token) => candidateTokens.has(token)).length * 12;
  const commonDepth = commonPrefixDepth(
    processLocation.segments,
    candidate.segments
  );
  if (
    /\bfrom the connected\b/i.test(lookupInput) &&
    candidate.sourceLabel === "Standard Output"
  ) {
    semanticScore += 25;
  }
  const requestedSource = lookupInput.match(
    /\b(Profile|Bill|Linked Opportunity|Project Document)\b/i
  )?.[1];
  if (
    requestedSource &&
    requestedSource.toLowerCase() === candidate.sourceLabel.toLowerCase()
  ) {
    semanticScore += 25;
  }
  if (
    /(?:nameplate|measurement|measured|contractor|engineering|uploaded|study|audit|specification)/i.test(
      lookupInput
    ) &&
    candidate.sourceLabel === "Project Document"
  ) {
    semanticScore += 18;
  }
  if (
    /(?:requirement|linked opportunity|replacement product|proposed design)/i.test(
      lookupInput
    ) &&
    candidate.sourceLabel === "Linked Opportunity"
  ) {
    semanticScore += 18;
  }
  if (
    /\bproposed\b/i.test(lookupInput) &&
    candidate.sourceLabel === "Linked Opportunity"
  ) {
    semanticScore += 30;
  }
  if (
    /^exact-/.test(process.key) &&
    candidate.sourceLabel === "Linked Opportunity"
  ) {
    semanticScore += 20;
  }
  if (
    /^requirement-/.test(process.key) &&
    candidate.sourceLabel === "Linked Opportunity" &&
    /\brequirement/i.test(candidate.text)
  ) {
    semanticScore += 20;
  }
  if (
    /(?:rate|tariff|bill|utility)/i.test(lookupInput) &&
    candidate.sourceLabel === "Bill"
  ) {
    semanticScore += 12;
  }
  if (
    /(?:count|quantity|recognizable|user-confirmed|user confirmed)/i.test(
      lookupInput
    ) &&
    candidate.sourceLabel === "User"
  ) {
    semanticScore += 10;
  }
  if (
    /\bbuilding and site context\b/i.test(lookupInput) &&
    candidate.sourceLabel === "Profile"
  ) {
    semanticScore += 20;
  }
  if (
    candidate.sourceLabel === "Standard Output" &&
    bindingTokens(process.name).size > 0
  ) {
    semanticScore += [...bindingTokens(lookupInput)].filter((token) =>
      bindingTokens(candidate.text).has(token)
    ).length * 6;
  }
  if (semanticScore === 0) return 0;
  let score = semanticScore + commonDepth * 2;
  if (commonDepth >= Math.max(1, processLocation.segments.length - 2)) score += 10;
  return score;
}

function bindingTokens(value) {
  const aliases = new Map([
    ["chargers", "charger"],
    ["charging", "charger"],
    ["fixtures", "fixture"],
    ["hours", "hour"],
    ["models", "model"],
    ["operating", "operation"],
    ["required", "requirement"],
    ["requirements", "requirement"],
    ["schedules", "schedule"],
    ["vehicles", "vehicle"],
    ["watts", "watt"]
  ]);
  return new Set(
    String(value || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .trim()
      .split(/\s+/)
      .map((token) => aliases.get(token) || token)
      .filter((token) => token.length > 1 && !BINDING_STOP_WORDS.has(token))
  );
}

function commonPrefixDepth(left, right) {
  let depth = 0;
  while (depth < left.length && depth < right.length && left[depth] === right[depth]) {
    depth += 1;
  }
  return depth;
}

function resolveOutputFormulaTerm(
  category,
  process,
  outputName,
  formulaTerms,
  preferredName
) {
  if (preferredName) {
    const preferred = formulaTerms.find((term) => term.name === preferredName);
    if (!preferred) {
      throw new Error(
        `${category.id} process ${process.key} references unknown formula term ${preferredName}`
      );
    }
    return preferred;
  }
  const processEvidence = new Set(
    process.canonicalStandardIds.flatMap((standardId) =>
      (category.sourceEvidence?.records || [])
        .filter((record) => record.standard_id === standardId)
        .map((record) => record.output_key)
    )
  );
  const scored = formulaTerms
    .map((term) => {
      const targetTokens = bindingTokens(
        `${outputName} ${process.name} ${process.purpose}`
      );
      const termTokens = bindingTokens(
        `${term.name} ${(term.tree_nodes || []).join(" ")} ${term.formula_use || ""}`
      );
      let score = [...targetTokens].filter((token) => termTokens.has(token)).length * 10;
      if (term.standard_output_key && processEvidence.has(term.standard_output_key)) {
        score += 40;
      }
      if (
        /(?:price|rate|bill)/i.test(term.name) !==
        /(?:price|rate|bill)/i.test(outputName)
      ) {
        score -= 10;
      }
      return { term, score };
    })
    .sort((left, right) =>
      right.score - left.score ||
      left.term.name.localeCompare(right.term.name)
    );
  if (!scored.length) {
    throw new Error(`${category.id} process ${process.key} has no formula term contract`);
  }
  return scored[0].term;
}

function inferOutputScope(process, outputName, term) {
  const text = `${outputName} ${term.name} ${term.display_unit}`;
  const outputCardinality = process.selectionPolicy.outputCardinality;
  if (outputCardinality === "ONE_SELECTED_PROFILE") {
    return "PROFILE";
  }
  if (
    [
      "ONE_SELECTED_INPUT_SET",
      "ONE_SELECTED_RECORD",
      "ONE_SELECTED_RESULT_SET"
    ].includes(outputCardinality)
  ) {
    return "RECORD_SET";
  }
  if (/\bper fixture\b|\/fixture\b/i.test(text)) return "PER_FIXTURE";
  if (/\bper port\b|\/port\b/i.test(text)) return "PER_PORT";
  if (/\bper event\b|\/event\b/i.test(text)) return "PER_EVENT";
  if (/\bper hour\b|\/hour\b/i.test(text)) return "PER_HOUR";
  if (/\bper (?:equipment )?unit\b|\/unit\b/i.test(text)) {
    return "PER_EQUIPMENT_UNIT";
  }
  if (/\/year\b|\bannual\b/i.test(text)) return "PER_YEAR";
  if (/site|utility bill|tariff/i.test(text)) return "SITE_TOTAL";
  return "PROJECT_TOTAL";
}

function buildValidation(category, standardIds) {
  const summaries = standardIds.map((standardId) => PROCESS_LIBRARY[standardId].validation);
  if (standardIds.includes("STD-ENERGY-STAR-PRODUCT-DATA") && category.id !== "ITC-52") {
    summaries[summaries.indexOf(PROCESS_LIBRARY["STD-ENERGY-STAR-PRODUCT-DATA"].validation)] =
      "The official Product Finder access path and applicable product-family datasets were checked. The category adapter and generic existing-equipment baseline remain unverified, so only a later exact compatible product-record path can be supported.";
  }
  if (standardIds.includes("STD-ENERGY-STAR-PRODUCT-DATA") && category.id === "ITC-52") {
    summaries[summaries.indexOf(PROCESS_LIBRARY["STD-ENERGY-STAR-PRODUCT-DATA"].validation)] =
      "The official commercial dishwasher dataset was checked, and the retained fixture validates its source schema, units, source version, water-per-cycle field, and idle-energy fields. Existing installed-equipment baselines, annual rack activity, and the complete category adapter remain unverified.";
  }
  if (standardIds.includes("STD-FUELECONOMY-VEHICLES") && category.id !== "ITC-29") {
    summaries[summaries.indexOf(PROCESS_LIBRARY["STD-FUELECONOMY-VEHICLES"].validation)] =
      "The official downloadable vehicle schema and exact-record method were checked, and the retained source fixture validates the technical fields and units. The fleet-charging category adapter and formula-level golden test have not yet been added, and class-based estimates remain disabled.";
  }
  return [...new Set(summaries)].join(" ");
}

function buildProcessSpecificContent(
  category,
  standardIds,
  key,
  name,
  lookupInputs,
  valueNeeded,
  library
) {
  const categoryName = CARD_COPY[category.id].title;
  const outputSummary = lowercaseFirst(valueNeeded.join("; ").replace(/\.$/, ""));
  const singleValueSummary = outputSummary
    .replace(/^one selected\s+/i, "")
    .replace(/^one\s+/i, "");
  const inputSummary = lookupInputs.join("; ");
  const exactProduct = /^exact-|^fueleconomy_vehicles$/.test(key);
  const requirementProduct = /^requirement-/.test(key);
  const existingProduct = /^existing-product-rating$/.test(key);
  const measurModule = standardIds.includes("STD-DOE-MEASUR")
    ? MEASUR_CATEGORY_MODULES[category.id]
    : null;

  if (existingProduct) {
    return {
      howToUse: [
        `Normalize the documented existing manufacturer and model for the ${categoryName.toLowerCase()} when it is available.`,
        `Search the applicable certification export for that exact model and filter by the displayed product type, capacity or size class, and native test procedure.`,
        "If an exact record is unavailable, select one context-matched existing-equipment benchmark from an authoritative historical or installed-stock source; never substitute the current efficient-product population for the installed baseline.",
        `Return one selected ${singleValueSummary}.`,
        "Retain the dataset version, record identity or benchmark population, context filters, population size, selection rule, native fields, units, and fallback level."
      ],
      selectedStrategy: `Exact-record lookup followed by a context-matched installed-equipment benchmark for ${categoryName.toLowerCase()}.`,
      automationMethod: `Normalize the submitted model, query the applicable certification export, and use one exact compatible native-unit record when available; otherwise apply reviewed installed-stock filters and select the official typical value, weighted median, or median.`,
      evidenceState: "METHOD_VERIFIED_IMPLEMENTATION_PENDING"
    };
  }

  if (exactProduct) {
    return {
      howToUse: [
        `Read the exact manufacturer, model, and product configuration from the linked ${categoryName.toLowerCase()} opportunity.`,
        `Query the official source for the exact model and filter by application, capacity, active specification, and the native certified fields required by this formula.`,
        "Require one compatible record; reject partial model matches, inactive listings, incompatible configurations, and records whose native test unit does not match the formula.",
        `Return ${outputSummary}.`,
        "Retain the source version, exact record identity, matched model text, returned native fields and units, and any ambiguity decision."
      ],
      selectedStrategy: `Exact linked-opportunity product match against the official ${library.sourceName} records.`,
      automationMethod: `Normalize the opportunity model identifiers, perform an exact active-record lookup, apply category compatibility filters, and return only the required native source fields.`,
      evidenceState: category.id === "ITC-29"
        ? "EXECUTABLE_PROOF_PRESENT"
        : "METHOD_VERIFIED_IMPLEMENTATION_PENDING"
    };
  }

  if (requirementProduct) {
    return {
      howToUse: [
        `Extract the application, capacity, certification, and performance limits from the linked ${categoryName.toLowerCase()} opportunity requirements.`,
        "Filter the official current-product population by every mandatory requirement, product-family boundary, active specification, and native test unit.",
        "Use the source's official recommended or typical value when it provides one; otherwise select the weighted median when valid weights exist, or the ordinary median of the eligible compatible population.",
        `Return one selected ${singleValueSummary} without choosing a future contractor product arbitrarily.`,
        "Retain the source version, complete filters, eligible record identities, population size, native units, selection rule, selected value, and fallback level."
      ],
      selectedStrategy: `Requirement-based candidate-set resolution from the official ${library.sourceName} population.`,
      automationMethod: `Parse the opportunity requirements, apply exact product-family and performance filters, preserve the eligible population, and select one official typical value, weighted median, or median in native units.`,
      evidenceState: "METHOD_VERIFIED_IMPLEMENTATION_PENDING"
    };
  }

  if (measurModule) {
    return {
      howToUse: [
        `Load the ${categoryName} project facts from documented nameplates, measurements, controls trends, or contractor specifications and map their units to the MEASUR ${measurModule}.`,
        `When an exact technical input is unavailable, use only a source-specific retained equipment or application population with documented filters, numeric rule, unit, scope, and version before running the ${measurModule}; otherwise report the implementation limitation.`,
        `Run the pinned open-source ${measurModule} baseline and proposed cases using the category formula boundary shown in this card.`,
        `Return one selected ${singleValueSummary}.`,
        `Retain the MEASUR version, ${measurModule} input object, exact and benchmark input provenance, context filters, eligible populations, selection rules, unit conversions, warnings, and baseline and proposed outputs.`
      ],
      selectedStrategy: `Pinned local execution of the MEASUR ${measurModule} for ${categoryName}.`,
      automationMethod: `Map reviewed project evidence into the ${measurModule} input schema, fill unresolved inputs through the single-value authoritative benchmark policy, execute the versioned local module, and preserve its warnings and native outputs.`,
      evidenceState: "METHOD_VERIFIED_IMPLEMENTATION_PENDING"
    };
  }

  return {
    howToUse: [
      `Map the ${categoryName} inputs to the documented ${name} source fields or model inputs: ${inputSummary}.`,
      library.method,
      "When an exact value is unavailable, use only a source-specific retained population or equation with documented filters, numeric rule, unit, scope, and version; otherwise report the implementation limitation.",
      `Return one selected ${singleValueSummary}.`,
      `Retain the ${name} source version, exact fields or model inputs, native units, eligible population, population size, selected-value rule, fallback level, selected record, and warnings.`
    ],
    selectedStrategy: library.strategy,
    automationMethod: library.method,
    evidenceState: "METHOD_VERIFIED_IMPLEMENTATION_PENDING"
  };
}

function lowercaseFirst(value) {
  return value ? `${value.charAt(0).toLowerCase()}${value.slice(1)}` : value;
}

const LOOKUP_INPUT_PATTERNS_BY_STANDARD = {
  "STD-OPERATING-SCHEDULE": /(?:schedule|pattern|operating days|shifts|active season|annual operating hours|site location|business activity)/i,
  "STD-PVWATTS-V8": /(?:DC capacity|module type|array type|system losses|tilt|azimuth|site location)/i,
  "STD-WIND-SAM": /(?:wind turbine|turbine model|power curve|hub height|loss factor|analysis year|site location)/i,
  "STD-EPA-CHP-PERFORMANCE": /(?:prime[- ]mover|input fuel|unit model|installed capacity|operating load|capacity factor|fuel availability|fuel unit|heating value|conversion technology|coincident|thermal load|boiler)/i,
  "STD-FUELECONOMY-VEHICLES": /(?:vehicle class|vehicle model|kWh per mile)/i,
  "STD-WATERSENSE-CI-OPERATIONS": /(?:leak|cycles of concentration|evaporation|heat rejection)/i
};

function inferLookupInputs(category, standardIds) {
  const inputs = [];
  for (const value of category.inputs.User) {
    const label = semanticLookupInput(
      category.id,
      friendlyTechnicalInput(
      friendlyTreeLabel(value.split(" > ").at(-1), category.id),
      "User"
      )
    );
    if (!label) continue;
    if (!inputs.includes(label)) inputs.push(label);
  }
  for (const value of category.inputs.Profile) {
    const label = friendlyTreeLabel(value.split(" > ").at(-1), category.id);
    if (!inputs.includes(label)) inputs.push(label);
  }
  const standardId = standardIds[0];
  if (standardId === "STD-DOE-MEASUR") {
    const engineeringInputs = inputs.filter(
      (input) =>
        !/(?:Timestamped interval|Time zone|tariff mapping|current project fuel price)/i.test(
          input
        ) &&
        !(
          category.standardIds.includes("STD-OPERATING-SCHEDULE") &&
          LOOKUP_INPUT_PATTERNS_BY_STANDARD["STD-OPERATING-SCHEDULE"].test(input)
        )
    );
    if (category.standardIds.includes("STD-OPERATING-SCHEDULE")) {
      engineeringInputs.push("Annual operating hours from the connected schedule process");
    }
    return engineeringInputs;
  }
  if (standardId === "STD-REOPT-LOCAL-DISPATCH") {
    const dispatchInputs = inputs.filter((input) =>
      /(?:Timestamped interval|Time zone|tariff mapping|power capacity|energy capacity|efficiency|state of charge|state constraint|dispatch|reserve|availability|thermal capacity|charge limit|discharge limit|standing loss|thermal state|component types|annual operating profile|site power|charger power|arrival|departure|required energy|charging template|uncontrolled charging|port count|fleet miles|depot allocation|vehicle class|kWh per mile)/i.test(
        input
      )
    );
    if (category.id === "ITC-24") {
      dispatchInputs.push("Interval solar generation from the connected PVWatts process");
    }
    if (category.id === "ITC-26") {
      dispatchInputs.push(
        "Interval generation and resource profiles from the connected PVWatts, wind, and onsite-generation processes"
      );
    }
    if (category.id === "ITC-28") {
      dispatchInputs.push(
        "Resolved vehicle electricity intensity from the connected vehicle process",
        "Resolved charger efficiency, standby power, and rated capacity from the connected product process"
      );
    }
    return [...new Set(dispatchInputs)];
  }
  const standardPattern = LOOKUP_INPUT_PATTERNS_BY_STANDARD[standardId];
  if (standardPattern) {
    const selected = inputs.filter((input) => standardPattern.test(input));
    if (
      standardId === "STD-EPA-CHP-PERFORMANCE" &&
      category.standardIds.includes("STD-OPERATING-SCHEDULE")
    ) {
      selected.push("Annual operating hours from the connected schedule process");
    }
    return [...new Set(selected)];
  }
  return inputs;
}

function semanticLookupInput(categoryId, input) {
  const label = String(input || "").replace(/\s+\((?:User|Profile|Bill|Linked Opportunity|Project Document)\)$/, "");
  if (/^Timestamped Interval Electricity Data$/i.test(label)) {
    return "Timestamped interval utility data from the uploaded utility artifact";
  }
  if (/^Time Zone and Daylight-Saving Treatment/i.test(label)) {
    return "Time zone and daylight-saving metadata from the uploaded utility artifact";
  }
  if (/^(?:Complete Tariff Calendar and Billing Rules|Billing-Demand and Ratchet Rules)$/i.test(label)) {
    return "Resolved interval tariff input set from the connected tariff process";
  }
  if (/(?:distribution|load or speed fraction|load fraction|annual hours for each bin)/i.test(label)) {
    return `${label} from an uploaded site study, controls trend, or engineering audit`;
  }
  if (
    categoryId === "ITC-28" &&
    /^(?:Measured kWh per Mile|Vehicle-arrival schedule|Vehicle-departure schedule|Uncontrolled charging rule)$/i.test(label)
  ) {
    return `${label} from the fleet study or contractor charging design`;
  }
  if (
    /(?:specific power|pressure|flow|efficiency|temperature|load fraction|standby|tested fuel|heating value|rated shaft|rated speed)/i.test(
      label
    )
  ) {
    return `${label} from a nameplate, measurement, audit, or contractor specification`;
  }
  return label;
}

function processKeyForStandard(standardId) {
  return standardId.toLowerCase().replace(/^std-/, "").replaceAll("-", "_");
}

function processNameForCategory(category, standardId) {
  const base = PROCESS_LIBRARY[standardId].name;
  if (standardId === "STD-DOE-MEASUR") {
    return `${shortCategorySubject(category)} Engineering Calculation`;
  }
  if (standardId === "STD-OPERATING-SCHEDULE") {
    return `${shortCategorySubject(category)} Annual Operating Hours`;
  }
  if (standardId === "STD-REOPT-LOCAL-DISPATCH") {
    return `${shortCategorySubject(category)} Interval Bill Calculation`;
  }
  if (standardId === "STD-EPA-CHP-PERFORMANCE") {
    return `${shortCategorySubject(category)} Performance Balance`;
  }
  return base;
}

function shortCategorySubject(category) {
  return CARD_COPY[category.id].title
    .replace(/High-Efficiency /, "")
    .replace(/ Resource Savings$/, "")
    .replace(/ Routine Resource Use$/, "");
}

function buildPresentationTree(category, processes) {
  if (category.id === "ITC-02") return buildExteriorLightingTree();
  if (category.id === "ITC-15") {
    return node("Annual Direct Operational Savings: $0", [
      node("Study, Monitoring, Certification, or Enabling Activity (Linked Opportunity)"),
      node("No direct purchased-resource reduction is assigned to this activity (Derived)")
    ]);
  }
  if (category.id === "ITC-29") return buildVehicleTree();
  if (category.id === "ITC-08") return buildSolarWaterHeatingTree(category);
  if (category.id === "ITC-23") return buildBatteryStorageTree();
  if (category.id === "ITC-27") return buildPublicChargingTree();
  if (category.id === "ITC-28") return buildFleetChargingTree();
  if (category.id === "ITC-30") return buildMaterialHandlingTree();
  if (category.id === "ITC-32") return buildFlowFixtureTree();
  if (category.id === "ITC-33") return buildFlushFixtureTree();
  if (category.id === "ITC-39") return buildVariableSpeedTree();
  if (category.id === "ITC-48") return buildInductionCookingTree();
  if (category.id === "ITC-49") return buildWalkInTree();
  if (category.id === "ITC-52") return buildDishwasherTree();
  if (category.id === "ITC-54") return buildBackupPowerTree();

  const transformed = transformTreeNode(category.expandedTree, category, processes);
  transformed.text = rootLabelFor(category);
  attachIntervalTariffProcess(transformed, processes);
  ensureEveryProcessIsReferenced(transformed, processes);
  return applySemanticOwnership(category.id, transformed);
}

function buildSolarWaterHeatingTree(category) {
  return node("Annual Operational Savings", [
    node("Annual Backup-Resource Reduction", [
      node("Site Location (Profile)"),
      node("Collector and Storage Design", [
        node("Collector and Storage Requirements Prescribed by the Opportunity (Linked Opportunity)"),
        node("Collector and Storage Design from Contractor Specification, Engineering Assessment, or Proposed Construction Document (Project Document)"),
        processNode("context_benchmarks")
      ]),
      node("Annual Hot-Water Load", [
        node("Hot-Water Load from Audit, Measurement, Engineering Assessment, or Operating Record (Project Document)"),
        node("Business Activity and Building Type (Profile)"),
        processNode("context_benchmarks")
      ]),
      node("Backup Water-Heating System", [
        node("Backup Fuel Type (User)"),
        node("Backup Equipment Nameplate, Commissioning Record, or Engineering Assessment (Project Document)"),
        processNode("context_benchmarks")
      ]),
      processNode("sam_solar_thermal")
    ]),
    buildBillRateTreeForComponents(category.semanticContract.rate_components || [])
  ]);
}

function buildExteriorLightingTree() {
  return node("Annual Operational Savings", [
    node("Annual Electricity Reduction", [
      node("Replacement Fixture Count (User)"),
      node("Existing Fixture Watts", [
        node("Existing Fixture Type or Application (User)"),
        node("Existing Nameplate, Photometric Report, or Field Measurement (Project Document)"),
        processNode("context_benchmarks")
      ]),
      node("New Fixture Watts", [
        node("Linked Opportunity names an exact replacement product", [
          node("Exact Product Information (Linked Opportunity)"),
          processNode("exact-new-fixture-watts")
        ]),
        node("Linked Opportunity specifies requirements but no exact product", [
          node("Product Requirements (Linked Opportunity)"),
          processNode("requirement-new-fixture-watts")
        ])
      ]),
      node("Annual Operating Hours", [
        node("Exterior Lighting Operating Pattern (User)", [
          node("Lighting follows a fixed or business schedule", [
            node("Lighting Hours per Operating Day (User)"),
            node("Operating Days per Week (User)"),
            node("Active Weeks per Year (User)"),
            processNode("fixed-lighting-hours")
          ]),
          node("Lighting is dusk-to-dawn or photocell-controlled", [
            node("Control Type and Timing Offset (User)"),
            node("Site Location (Profile)"),
            processNode("daylight-lighting-hours")
          ])
        ])
      ]),
      processNode("lighting-replacement-calculation")
    ]),
    node("Bill-Derived Electricity Rate", [
      node("Electricity Use (Bill)"),
      node("Variable Delivery Charges (Bill)"),
      node("Variable Generation Charges (Bill)"),
      node("Avoidable Electricity Rate (Derived)")
    ])
  ]);
}

function buildPublicChargingTree() {
  return node("Annual Operational Cost Impact", [
    buildIntervalLoadTree(),
    node("Installed Charger Count (User)"),
    node("Public Operating Hours (User)"),
    node("Site Daily Delivered Energy", [
      node("Selected Site Daily Delivered Energy from Charging Study or Contractor Design (Project Document)"),
      node("Capacity Cap Fraction (Project Document)"),
      processNode("public_charging_site_energy")
    ]),
    node("Normalized Time-of-Day Charging Shape", [
      node("Site Location and Charging Scenario (Profile)"),
      processNode("evi_charging_shape")
    ]),
    node("Charger Performance", [
      node("Linked Opportunity names an exact charger", [
        node("Exact Charger Product Information (Linked Opportunity)"),
        processNode("exact-charger-rating")
      ]),
      node("Linked Opportunity specifies charger requirements but no exact product", [
        node("Charger Requirements (Linked Opportunity)"),
        processNode("requirement-charger-rating")
      ])
    ]),
    node("Charging-Station Interval Load Profile with Separate AC, DC, and Standby Normalization (Derived)"),
    processNode("reopt_local_dispatch")
  ]);
}

function buildBatteryStorageTree() {
  return node("Annual Operational Savings", [
    buildIntervalLoadTree(),
    node("Battery Design and Operating Constraints", [
      node("Opportunity-Prescribed Battery Design", [
        node("Power Capacity (Linked Opportunity)"),
        node("Usable-Energy Capacity (Linked Opportunity)"),
        node("Charge Efficiency (Linked Opportunity)"),
        node("Discharge Efficiency (Linked Opportunity)"),
        node("Initial State of Charge (Linked Opportunity)"),
        node("Terminal State-of-Charge Constraint (Linked Opportunity)"),
        node("Dispatch-Availability Schedule (Linked Opportunity)"),
        node("Reserve Constraint (Linked Opportunity)")
      ]),
      node("Contractor or Engineering Battery Design (Project Document)"),
      processNode("context_benchmarks")
    ]),
    processNode("reopt_local_dispatch")
  ]);
}

function buildFleetChargingTree() {
  return node("Annual Operational Cost Impact", [
    buildIntervalLoadTree(),
    node("Annual fleet miles (User)"),
    node("Vehicle Class and Service Need (User)"),
    node("Documented Depot Allocation Fraction from Fleet Study or Contractor Design (Project Document)"),
    node("Vehicle Electricity Intensity", [
      node("Measured Kilowatt-Hours per Mile from Fleet Study or Contractor Charging Design (Project Document)"),
      node("Exact Proposed Vehicle Model, Year, and Drivetrain, when Named by the Opportunity (Linked Opportunity)"),
      processNode("fueleconomy_vehicles")
    ]),
    node("Fleet Charging Activity", [
      node("Vehicle-Arrival Schedule from Fleet Study or Contractor Charging Design (Project Document)"),
      node("Vehicle-Departure Schedule from Fleet Study or Contractor Charging Design (Project Document)"),
      node("Uncontrolled Charging Rule from Fleet Study or Contractor Charging Design (Project Document)"),
      processNode("context_benchmarks")
    ]),
    node("Installed Port Count (Linked Opportunity)"),
    node("Charger Performance", [
      node("Linked Opportunity names an exact charger", [
        node("Exact Charger Product Information (Linked Opportunity)"),
        processNode("exact-charger-rating")
      ]),
      node("Linked Opportunity specifies charger requirements but no exact product", [
        node("Charger Requirements (Linked Opportunity)"),
        processNode("requirement-charger-rating")
      ])
    ]),
    node("Electric Vehicle Supply Equipment Standby Energy (Derived)"),
    processNode("reopt_local_dispatch")
  ]);
}

function buildMaterialHandlingTree() {
  return node("Annual Operational Savings", [
    node("Annual Material-Handling Resource Switch", [
      node("In-Scope Equipment Count (User)"),
      node("Equipment Class and Rated Capacity (User)"),
      node("Comparable Operating Duty (User)"),
      node("Annual Operating Hours", [
        node("Recognizable Business, Shift, Seasonal, or Usage Pattern (User)"),
        node("Measured Annual Operating Hours, if known (Project Document)"),
        processNode("operating_schedule")
      ]),
      node("Exact Existing and Proposed Hourly Resource Use (Project Document)"),
      processNode("context_benchmarks")
    ]),
    buildBillRateTreeForComponents([
      "electric-volumetric",
      "fuel-price"
    ])
  ]);
}

function buildInductionCookingTree() {
  return node("Annual Operational Savings", [
    node("Annual Comparable-Duty Cooking Resource Difference", [
      node("Existing Cooking Equipment Type and Resource (User)"),
      node("Proposed Induction Equipment Requirements (Linked Opportunity)"),
      node("Identical Tested Cooking Duty Definition (Project Document)"),
      node("Exact Existing and Proposed Comparable Test Records (Project Document)"),
      node("Annual Activity in the Identical Tested Duty Unit (User)"),
      processNode("context_benchmarks")
    ]),
    buildBillRateTreeForComponents([
      "electric-volumetric",
      "gas-volumetric"
    ])
  ]);
}

function buildWalkInTree() {
  return node("Annual Operational Savings", [
    node("Annual Walk-In Component Electricity Reduction", [
      node("Walk-In Component Type and DOE Equipment Class (User)"),
      node("Temperature Class and Indoor or Outdoor Configuration (User)"),
      node("Panel Area, when a Panel Intensity Is Selected (Project Document)"),
      node("Existing and Proposed Efficiency Levels (Linked Opportunity)"),
      node("Exact Existing or Proposed Annual Component Energy (Project Document)"),
      node("Existing and Proposed Duty-Equivalence Confirmation (User)"),
      processNode("context_benchmarks")
    ]),
    buildBillRateTreeForComponents(["electric-volumetric"])
  ]);
}

function buildFlowFixtureTree() {
  return node("Annual Operational Savings", [
    node("Annual Water and Heating-Resource Reduction", [
      node("In-Scope Fixture Count (User)"),
      node("Recognizable Facility Activity", [
        node("Business Activity and Building Type (Profile)"),
        node("Approximate Occupants, Employees, Customers, Rooms, Beds, or Meals (User)"),
        node("Operating Days per Week (User)"),
        node("Active Weeks per Year (User)"),
        node("Observed Fixture-Use Study or Audit, when available (Project Document)"),
        processNode("flow_fixture_activity")
      ]),
      node("Existing Fixture", [
        node("Existing Fixture Type or Application (User)"),
        node("Existing Rated Flow from Label, Specification, or Measurement (Project Document)"),
        processNode("existing_flow_rate")
      ]),
      node("Water-Heating Service", [
        node("Fixture Uses Hot Water (User)"),
        node("Water-Heating Fuel Type (User)"),
        node("Water-Heater Nameplate or Commissioning Information, if available (Project Document)"),
        processNode("water_heating_inputs")
      ]),
      node("Flow Fixture Performance", [
        node("Linked Opportunity names an exact flow fixture", [
          node("Exact Flow Fixture Product Information (Linked Opportunity)"),
          processNode("exact-proposed-fixture-rating")
        ]),
        node("Linked Opportunity specifies flow fixture requirements but no exact product", [
          node("Flow Fixture Requirements (Linked Opportunity)"),
          processNode("requirement-proposed-fixture-rating")
        ])
      ])
    ]),
    buildBillRateTreeForComponents([
      "electric-volumetric",
      "gas-volumetric",
      "water-volumetric",
      "sewer-volumetric"
    ])
  ]);
}

function buildFlushFixtureTree() {
  return node("Annual Operational Savings", [
    node("Annual Water Reduction", [
      node("In-Scope Fixture Count (User)"),
      node("Recognizable Facility Activity", [
        node("Business Activity and Building Type (Profile)"),
        node("Approximate Occupants or Employees and Customers or Visitors (User)"),
        node("Operating Days per Week (User)"),
        node("Active Weeks per Year (User)"),
        node("Observed Restroom Study or Audit, when available (Project Document)"),
        processNode("flush_activity")
      ]),
      node("Existing Fixture", [
        node("Existing Toilet or Urinal Type (User)"),
        node("Existing Gallons per Flush from Label, Specification, or Measurement (Project Document)"),
        processNode("existing_flush_rate")
      ]),
      node("Flush Fixture Performance", [
        node("Linked Opportunity names an exact flush fixture", [
          node("Exact Flush Fixture Product Information (Linked Opportunity)"),
          processNode("exact-proposed-fixture-rating")
        ]),
        node("Linked Opportunity specifies flush fixture requirements but no exact product", [
          node("Flush Fixture Requirements (Linked Opportunity)"),
          processNode("requirement-proposed-fixture-rating")
        ])
      ])
    ]),
    buildBillRateTreeForComponents(["water-volumetric", "sewer-volumetric"])
  ]);
}

function buildVariableSpeedTree() {
  return node("Annual Operational Savings", [
    node("Annual Variable-Speed Electricity Reduction", [
      node("In-Scope Equipment Count (User)"),
      node("Existing Equipment Nameplate and Load Information from Uploaded Audit or Measurement (Project Document)"),
      node("Measured Load-Bin Profile", [
        node("Load or Speed Fractions from Controls Trends or Engineering Audit (Project Document)"),
        node("Annual Hours by Bin from Controls Trends or Engineering Audit (Project Document)"),
        processNode("context_benchmarks")
      ]),
      node("Equipment is a Pump", [
        node("Required Flow and Total Dynamic Head from Engineering Assessment or Measurement (Project Document)"),
        node("Pump Curve or Documented Operating Points (Project Document)"),
        node("Proposed Minimum Speed and Pump Control Rule (Linked Opportunity)"),
        processNode("doe_measur_pump")
      ]),
      node("Equipment is a Fan", [
        node("Required Airflow and Pressure Rise from Engineering Assessment or Measurement (Project Document)"),
        node("Fan Curve or Documented Operating Points (Project Document)"),
        node("Proposed Minimum Speed and Fan Control Rule (Linked Opportunity)"),
        processNode("doe_measur_fan")
      ])
    ]),
    buildBillRateTreeForComponents(["electric-volumetric"])
  ]);
}

function buildDishwasherTree() {
  return node("Annual Operational Savings", [
    node("Annual Commercial Dishwasher Resource Reduction", [
      node("In-Scope Equipment Count (User)"),
      node("Existing Dishwasher Native Performance", [
        node("Existing Dishwasher Machine Type and Sanitation Method (User)"),
        node("Existing Exact Make and Model, Certification Record, or Measured Native Performance (Project Document)"),
        processNode("exact-existing-dishwasher-record")
      ]),
      node("Proposed Dishwasher Native Performance", [
        node("Linked Opportunity names an exact dishwasher", [
          node("Exact Proposed Dishwasher Product Information (Linked Opportunity)"),
          processNode("exact-proposed-dishwasher-record")
        ]),
        node("Linked Opportunity specifies dishwasher requirements but no exact product", [
          node("Dishwasher Requirements (Linked Opportunity)"),
          processNode("requirement-proposed-dishwasher-record")
        ])
      ]),
      node("Native Activity Basis", [
        node("Rack Machines Only", [
          node("Rack-Machine Type and Sanitation Method (User)"),
          node("Approximate Racks per Operating Day (User)"),
          node("Operating Days per Week (User)"),
          node("Active Weeks per Year (User)"),
          processNode("rack-dishwasher-activity")
        ]),
        node("Flight or Conveyor Machines Only", [
          node("Exact Annual Operating Hours per Equipment Unit from Controls or Audit (Project Document)"),
          processNode("flight-dishwasher-activity")
        ])
      ]),
      node("Idle Operation", [
        node("Documented Energized and Active-Wash Hours from Controls or Operating Records (Project Document)"),
        node("Annual Idle Hours (Derived)")
      ]),
      node("Dishwasher Water-Heating Conversion", [
        node("Incoming Water Temperature (Project Document)"),
        node("Wash, Rinse, or Booster Temperature or Certified Hot-Water Quantity (Project Document)"),
        node("Water-Heating Resource Type (User)"),
        node("Water-Heater Efficiency (Project Document)"),
        processNode("dishwasher-water-heating-conversion")
      ]),
      node("Separate Rack, Flight, and Idle Resource Results (Derived)")
    ]),
    buildBillRateTreeForComponents([
      "electric-volumetric",
      "gas-volumetric",
      "water-volumetric",
      "sewer-volumetric"
    ])
  ]);
}

function buildBackupPowerTree() {
  return node("Annual Routine Backup-Power Resource Cost", [
    node("In-Scope Equipment Count (User)"),
    node("Backup Technology and Fuel Type (User)"),
    node("Exact Routine-Use Path", [
      node("Tested Fuel Use per Operating Hour per Unit from Manufacturer or Commissioning Record (Project Document)"),
      node("Scheduled Annual Test Operating Hours per Unit from Maintenance Plan or Contractor Specification (Project Document)"),
      node("Standby Electric Input per Unit from Product or Commissioning Record (Project Document)"),
      node("Annual Standby Energized Hours per Unit from Controls or Commissioning Record (Project Document)"),
      processNode("exact-backup-routine-inputs")
    ]),
    node("Full-Load Diesel Routine-Test Benchmark Path", [
      node("Diesel Generator Rated Capacity in Kilowatts (Project Document)"),
      node("Scheduled Annual Full-Load Test Operating Hours per Unit (Project Document)"),
      processNode("fema-full-load-diesel-test-fuel")
    ]),
    node("No Defensible Annual Standby Benchmark Retained (Derived)"),
    node("Selected Exact or Benchmark Annual Routine-Use Result (Derived)"),
    buildBillRateTreeForComponents(["electric-volumetric", "gas-volumetric", "fuel-price"])
  ]);
}

function buildVehicleTree() {
  return node("Annual Operational Savings", [
    node("Avoided Gasoline Cost", [
      node("Vehicles Replaced (User)"),
      node("Annual Miles per Vehicle (User)"),
      node("Existing Vehicle Make and Model (User)"),
      node("Approximate Model Year (User)"),
      node("Additional Version or Drivetrain Details, only when the match is ambiguous (User)"),
      processNode("fueleconomy_vehicles"),
      node("Avoided Gasoline Use (Derived)"),
      node("Current Gasoline Price (User)")
    ]),
    node("Added Electricity Cost", [
      node("Proposed Vehicle Make and Model (Linked Opportunity)"),
      node("Approximate Model Year (Linked Opportunity)"),
      node("Additional Version or Drivetrain Details, only when the match is ambiguous (Linked Opportunity)"),
      processNode("fueleconomy_vehicles"),
      node("Added Electricity Use (Derived)"),
      node("Bill-Derived Electricity Rate", [
        node("Electricity Use (Bill)"),
        node("Variable Delivery Charges (Bill)"),
        node("Variable Generation Charges (Bill)"),
        node("Avoidable Electricity Rate (Derived)")
      ])
    ]),
    node("Equivalent Required Vehicle Service Confirmed (User)")
  ]);
}

function transformTreeNode(original, category, processes) {
  const clean = stripInternalTreeText(original.text);
  if (/^Annual billed resource/i.test(clean)) return buildAnnualBillTree(category);
  if (/^Avoidable marginal resource price/i.test(clean)) return buildBillRateTree(category);
  if (/^Chronological load and tariff/i.test(clean)) return buildIntervalLoadTree();
  if (/^In-scope quantity/i.test(clean)) return node("In-Scope Equipment Count (User)");
  if (/^Certified existing and proposed product resolution/i.test(clean)) {
    return buildCertifiedProductTree(category);
  }

  const children = [];
  for (const child of original.children) {
    const childClean = stripInternalTreeText(child.text);
    if (
      ["ITC-27", "ITC-28"].includes(category.id) &&
      /^(?:Linked Opportunity|Charger Class or Intended Application|Selected Charger Model, if known|Rated (?:Charger )?Power or Capacity)(?:\s*\(User\))?$/i.test(childClean)
    ) {
      continue;
    }
    if (
      ["ITC-32", "ITC-33"].includes(category.id) &&
      /^Fixture selection$/i.test(clean) &&
      /^(?:Linked Opportunity|Proposed fixture type|Proposed rated)/i.test(childClean)
    ) {
      continue;
    }
    if (
      PRODUCT_CATEGORY_LABELS[category.id] &&
      child.children.length === 0 &&
      /\(Standard\)$/.test(childClean) &&
      /certified|rating/i.test(childClean)
    ) {
      children.push(node("Certified Performance Difference (Derived)"));
      continue;
    }
    const transformed = transformTreeNode(child, category, processes);
    if (Array.isArray(transformed)) children.push(...transformed);
    else children.push(transformed);
  }

  if (category.id === "ITC-34" && /^Proposed irrigation configuration$/i.test(clean)) {
    return node(
      friendlyTreeLabel(clean, category.id),
      children.map((child) => relabelLeafSource(child, "User", "Linked Opportunity"))
    );
  }

  if (/\(Standard\)$/.test(clean)) {
    const matches = matchProcesses(clean, processes);
    if (matches.length === 1) return processNode(matches[0].key);
    if (matches.length > 1) {
      if (matches.some((match) => /^(?:exact|requirement)-.*(?:charger|fixture)-rating$/.test(match.key))) {
        return buildExactRequirementTree(category, matches);
      }
      return node(friendlyTreeLabel(clean.replace(/\s*\(Standard\)$/, ""), category.id), matches.map((match) => processNode(match.key)));
    }
  }
  if (/\{\{intermediate:/.test(original.text)) {
    if (/Linked Opportunity|Canonical retrofit ID/i.test(clean)) {
      return node("Opportunity Equipment or Performance Requirements (Linked Opportunity)");
    }
    return node(`${friendlyTreeLabel(clean, category.id)} (Derived)`, children);
  }
  return node(friendlyTreeLabel(clean, category.id), children);
}

function buildExactRequirementTree(category, matches) {
  const exact = matches.find((match) => /^exact-.*(?:charger|fixture)-rating$/.test(match.key));
  const requirement = matches.find((match) => /^requirement-.*(?:charger|fixture)-rating$/.test(match.key));
  const otherProcesses = matches.filter((match) => ![exact?.key, requirement?.key].includes(match.key));
  const subject = ["ITC-27", "ITC-28"].includes(category.id)
    ? "Charger"
    : category.id === "ITC-32"
      ? "Flow Fixture"
      : "Flush Fixture";
  return node(`${subject} Performance`, [
    ...otherProcesses.map((process) => processNode(process.key)),
    node(`Linked Opportunity names an exact ${subject.toLowerCase()}`, [
      node(`Exact ${subject} Product Information (Linked Opportunity)`),
      processNode(exact.key)
    ]),
    node(`Linked Opportunity specifies ${subject.toLowerCase()} requirements but no exact product`, [
      node(`${subject} Requirements (Linked Opportunity)`),
      processNode(requirement.key)
    ])
  ]);
}

function relabelLeafSource(treeNode, from, to) {
  if (treeNode.processKey) return treeNode;
  return node(
    treeNode.text.replace(new RegExp(`\\s*\\(${from}\\)$`), ` (${to})`),
    treeNode.children.map((child) => relabelLeafSource(child, from, to))
  );
}

function buildCertifiedProductTree(category) {
  const label = PRODUCT_CATEGORY_LABELS[category.id];
  return buildCertifiedProductTreeForLabel(label);
}

function buildCertifiedProductTreeForLabel(label) {
  return node(`${label} Performance`, [
    node(`Existing ${label}`, [
      node(`Existing ${label} Type or Application (User)`),
      node("Existing Make and Model, when available (User)"),
      node("Existing Capacity or Size Class, when available (User)"),
      processNode("existing-product-rating")
    ]),
    node(`Proposed ${label}`, [
      node("Linked Opportunity names an exact product", [
        node("Exact Product Information (Linked Opportunity)"),
        processNode("exact-proposed-product-rating")
      ]),
      node("Linked Opportunity specifies requirements but no exact product", [
        node("Product Requirements (Linked Opportunity)"),
        processNode("requirement-proposed-product-rating")
      ])
    ])
  ]);
}

function buildAnnualBillTree(category) {
  const children = [];
  if (category.resources.includes("electricity")) children.push(node("Annual Electricity Use (Bill)"));
  if (category.resources.includes("gas")) children.push(node("Annual Gas Use (Bill)"));
  if (category.resources.includes("water-sewer")) children.push(node("Annual Water Use and Unit (Bill)"));
  children.push(node("Billing Period Coverage (Bill)"));
  return node("Annual Billed Resource Use", children);
}

function buildBillRateTree(category) {
  return buildBillRateTreeForComponents(category.semanticContract.rate_components || []);
}

function buildBillRateTreeForComponents(rateComponents) {
  const components = new Set(rateComponents);
  const children = [];
  if (components.has("electric-volumetric")) {
    children.push(node("Bill-Derived Electricity Rate", [
      node("Electricity Use (Bill)"),
      node("Variable Delivery Charges (Bill)"),
      node("Variable Generation Charges (Bill)"),
      node("Avoidable Electricity Rate (Derived)")
    ]));
  }
  if (
    components.has("electric-time-of-use") ||
    components.has("electric-demand") ||
    components.has("electric-export") ||
    components.has("electric-export-non-bypassable")
  ) {
    children.push(node("Interval Tariff Value", [
      node("Rate Schedule and Customer Class (Bill)"),
      processNode("interval_tariff")
    ]));
  }
  if (components.has("gas-volumetric")) {
    children.push(node("Bill-Derived Gas Rate", [
      node("Gas Use (Bill)"),
      node("Variable Delivery Charges (Bill)"),
      node("Variable Procurement Charges (Bill)"),
      node("Avoidable Gas Rate (Derived)")
    ]));
  }
  if (components.has("water-volumetric")) {
    children.push(node("Bill-Derived Water Rate", [
      node("Water Use and Unit (Bill)"),
      node("Variable Water Charges (Bill)"),
      node("Avoidable Water Rate (Derived)")
    ]));
  }
  if (components.has("sewer-volumetric")) {
    children.push(node("Bill-Derived Sewer Rate", [
      node("Sewer-Billed Water Use (Bill)"),
      node("Variable Sewer Charges (Bill)"),
      node("Avoidable Sewer Rate (Derived)")
    ]));
  }
  if (components.has("fuel-price")) {
    children.push(node("Current Fuel Price from Receipt, Contract, or Operating Record (Project Document)"));
  }
  return node("Applicable Resource Rates", children);
}

function buildIntervalLoadTree() {
  return node("Chronological Electricity Load and Tariff", [
    node("Timestamped Interval Utility Data (Bill)"),
    node("Time Zone and Daylight-Saving Metadata from the Uploaded Utility Artifact (Bill)"),
    node("Rate Schedule and Customer Class (Bill)"),
    processNode("interval_tariff"),
    node("Monthly Bill Reconciliation When Tariff Mapping Exists (Derived)")
  ]);
}

function applySemanticOwnership(categoryId, treeNode) {
  if (treeNode.processKey) return treeNode;
  const children = treeNode.children.map((child) => applySemanticOwnership(categoryId, child));
  if (!treeNode.text.endsWith("(User)")) return node(treeNode.text, children);

  const label = treeNode.text.replace(/\s+\(User\)$/, "");
  if (/^Timestamped Interval Electricity Data$/i.test(label)) {
    return node("Timestamped Interval Utility Data (Bill)", children);
  }
  if (/^Time Zone and Daylight-Saving Treatment/i.test(label)) {
    return node("Time Zone and Daylight-Saving Metadata from the Uploaded Utility Artifact (Bill)", children);
  }
  if (/^(?:Complete Tariff Calendar and Billing Rules|Billing-Demand and Ratchet Rules)$/i.test(label)) {
    return node("Published Utility Tariff and Effective-Date Mapping (Derived)", children);
  }
  if (
    /(?:nameplate|product label|field measurement|measured input|measured annual operating hours|measurement observations|leak-measurement method|uploaded audit|energy audit|water audit|engineering assessment|controls trend|control schedule|commissioning record|maintenance plan|manufacturer document|contractor quote|contractor specification|construction document|operating record|site study|existing fan input data|existing filtration input data|separately reported or measured machine electricity)/i.test(
      label
    )
  ) {
    return node(`${label} (Project Document)`, children);
  }
  if (
    /(?:session-(?:arrival|duration)|delivered-kWh) distribution|probability distribution/i.test(label)
  ) {
    return node(`Documented ${label.replace(/ distribution/i, " profile")} from Site Study or Contractor Design (Project Document)`, children);
  }
  if (/(?:load or speed fraction|load fraction|annual hours for each bin|load-bin)/i.test(label)) {
    return node(`Documented ${label} from Controls Trends or Engineering Audit (Project Document)`, children);
  }
  if (
    /(?:specific power|pressure rise|total dynamic head|required pressure|required flow|required airflow|system pressure|steam pressure|mean flow|water-heater efficiency|temperature rise|hot-water fraction|purchased water-heating input per certified|certified resource input per|standby electric input|tested fuel use)/i.test(
      label
    )
  ) {
    return node(`Documented ${label} from Nameplate, Measurement, Audit, or Contractor Specification (Project Document)`, children);
  }
  if (
    categoryId === "ITC-28" &&
    /^(?:Measured kWh per Mile|Vehicle-arrival schedule|Vehicle-departure schedule|Uncontrolled charging rule)$/i.test(label)
  ) {
    return node(`${label} from Fleet Study or Contractor Charging Design (Project Document)`, children);
  }
  if (
    /(?:\befficiency\b|\bCOP\b|\bpower\b|\bkW\b|\bkWh\b|\bflow\b|\bpressure\b|\btemperature\b|\bheat loss\b|\bload fraction\b|\bcapacity factor\b|\bheating value\b|\bcycles of concentration\b|\bevaporation\b|\bthermal-load constraint\b|\belectric-load constraint\b|\bcontrol sequence\b|\bcontrol profile\b|\bsite power limit\b|\bdepot allocation fraction\b|\brebound or recovery constraint\b|\bmaximum shed\b|\bmaximum event duration\b|\bevent-availability schedule\b|\bcontrollable-load definition\b)/i.test(
      label
    )
  ) {
    return node(`Documented ${label} from Nameplate, Measurement, Audit, or Contractor Specification (Project Document)`, children);
  }
  if (
    /(?:share of billed|Affected-load share|Coincident (?:Onsite Electric|Useful-Heat) Load|Interval HVAC thermal load|Existing Design Airflow|Existing airflow schedule|Motor rated speed|Useful Process Load|(?:Certified Test|Tested Duty) Unit|Annual Idle Hours|Existing fuel use per operating hour|Required energy by departure|Managed charging template|Unmanaged charging template|Vehicle-(?:arrival|departure) schedule|Water-heating share)/i.test(
      label
    )
  ) {
    return node(`Documented ${label} from Submeter, Controls Trend, Audit, or Contractor Specification (Project Document)`, children);
  }
  return node(treeNode.text, children);
}

function matchProcesses(text, processes) {
  const matches = processes.filter((process) =>
    process.canonicalStandardIds.some((standardId) => PROCESS_LIBRARY[standardId].match.test(text))
  );
  if (matches.length > 0) return matches;
  return processes.length === 1 ? processes : [];
}

function ensureEveryProcessIsReferenced(root, processes) {
  const referenced = new Set(collectProcessReferences(root));
  const missing = processes.filter((process) => !referenced.has(process.key));
  if (missing.length === 0) return;
  const target = root.children.find((child) => !/Rate|Price|Tariff/.test(child.text)) || root;
  target.children.push(...missing.map((process) => processNode(process.key)));
}

function collectProcessReferences(root, ordered = [], seen = new Set()) {
  if (root.processKey && !seen.has(root.processKey)) {
    seen.add(root.processKey);
    ordered.push(root.processKey);
  }
  for (const child of root.children) collectProcessReferences(child, ordered, seen);
  return ordered;
}

function assignProcessNumbers(categoryId, processes) {
  if (categoryId === "ITC-02") {
    return new Map([
      ["context_benchmarks", "1.1"],
      ["exact-new-fixture-watts", "1.2"],
      ["requirement-new-fixture-watts", "1.3"],
      ["fixed-lighting-hours", "2.1"],
      ["daylight-lighting-hours", "2.2"],
      ["lighting-replacement-calculation", "3.1"]
    ]);
  }
  return new Map(processes.map((process, index) => [process.key, `1.${index + 1}`]));
}

function buildBroaderFormula(category) {
  if (category.id === "ITC-15") return "Annual Direct Operational Savings = $0";
  if (
    /baseline_annual_bill - proposed(?:_[a-z]+)*_bill|unmanaged_annual_bill - managed_annual_bill|baseline_grid_and_fuel_bill - proposed_grid_and_fuel_bill/.test(
      category.primaryFormula
    )
  ) {
    return "Annual Operational Savings =\nBaseline Annual Bill − Proposed Annual Bill";
  }
  if (/annual_bill_credits - annual_subscription_charges/.test(category.primaryFormula)) {
    return "Annual Operational Savings =\nAnnual Bill Credits − Annual Subscription Charges";
  }
  if (/^`S = -\(/.test(category.primaryFormula)) {
    return "Annual Operational Impact =\n− Routine Fuel and Electricity Cost";
  }
  if (/ - |−/.test(category.primaryFormula) && /(added_|proposed_electric|CHP_input|input_biomass|annual_induction)/.test(category.primaryFormula)) {
    return "Annual Operational Savings =\nAvoided Existing Resource Cost − Added New Resource Cost";
  }
  if (/Σ_t/.test(category.primaryFormula)) {
    return "Annual Operational Savings =\nOnsite Electricity Offset Value + Credited Export Value";
  }
  if (category.id === "ITC-08") {
    return "Annual Operational Savings =\nAnnual Backup-Resource Reduction × Applicable Backup-Resource Rate";
  }
  const rateComponents = new Set(category.semanticContract.rate_components || []);
  if (
    category.resources.length === 1 &&
    category.resources[0] === "electricity" &&
    [...rateComponents].every((component) => component.startsWith("electric-"))
  ) {
    return "Annual Operational Savings =\nAnnual Electricity Reduction × Bill-Derived Electricity Rate";
  }
  if (
    category.resources.length === 1 &&
    category.resources[0] === "gas" &&
    [...rateComponents].every((component) => component === "gas-volumetric")
  ) {
    return "Annual Operational Savings =\nAnnual Gas Reduction × Bill-Derived Gas Rate";
  }
  if (
    category.resources.length === 1 &&
    category.resources[0] === "water-sewer"
  ) {
    return rateComponents.has("sewer-volumetric")
      ? "Annual Operational Savings =\nAnnual Water Reduction × Applicable Bill-Derived Water and Sewer Rate"
      : "Annual Operational Savings =\nAnnual Water Reduction × Bill-Derived Water Rate";
  }
  return "Annual Operational Savings =\nAnnual Resource Reduction × Applicable Bill-Derived Resource Rate";
}

function buildExpandedFormula(category) {
  const formulas = [category.primaryFormula];
  if (!/^No (?:additional|supporting) formula is required\.$/i.test(category.supportingFormulas.trim())) {
    formulas.push(category.supportingFormulas);
  }
  return formulas
    .join("\n\n")
    .replaceAll("`", "")
    .split("\n")
    .map((line) => humanizeFormulaLine(line))
    .map((line) => applyCategoryFormulaLabels(line, category))
    .filter((line, index, lines) => line || (index > 0 && lines[index - 1]))
    .join("\n");
}

function humanizeFormulaLine(line) {
  let output = line;
  const sorted = [...IDENTIFIER_LABELS.entries()].sort(([left], [right]) => right.length - left.length);
  for (const [identifier, label] of sorted) {
    const escaped = identifier.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    output = output.replace(
      new RegExp(`(?<![A-Za-z0-9_])${escaped}(?![A-Za-z0-9_])`, "g"),
      label
    );
  }
  output = output
    .replaceAll("BR-ANNUAL-BILL-RESOURCE", "Annual Billed Resource Use")
    .replaceAll("BR-AVOIDABLE-RESOURCE-RATE", "Applicable Bill-Derived Resource Rate")
    .replaceAll("Σ_available_intervals", "Sum Across Available Intervals of")
    .replaceAll("Σ_period", "Sum Across Billing Periods of")
    .replaceAll("Σ_bins", "Sum Across Load Bins of")
    .replaceAll("Σ_r", "Sum Across Resources of")
    .replaceAll("Σ_t", "Sum Across Intervals of")
    .replaceAll("to_energy", "Convert to Common Energy Units")
    .replaceAll("to_billed_unit", "Convert to Billed Resource Units")
    .replaceAll("min(", "Minimum of (")
    .replaceAll("max(", "Maximum of (")
    .replace(/\b[A-Za-z][A-Za-z0-9]*(?:_[A-Za-z0-9]+)+\b/g, (identifier) => humanizeIdentifier(identifier))
    .replace(/\bperiod\b/g, "Billing Period")
    .replace(/\bbins\b/g, "Load Bins")
    .replace(/\br\b/g, "Resource")
    .replace(/\bt\b/g, "Interval")
    .replace(/\bKWh\b/g, "kWh")
    .replace(/\bKW\b/g, "kW")
    .replace(/\b100lb\b/g, "100 Pounds")
    .replace(/\b(Convert to (?:Common Energy Units|Billed Resource Units))\(/g, "$1 (");
  return output.trimEnd();
}

function applyCategoryFormulaLabels(line, category) {
  if (category.id === "ITC-54") {
    return line.replace(/^Annual Operational Savings = -\(/, "Annual Operational Impact = -(");
  }
  const rateComponents = new Set(category.semanticContract.rate_components || []);
  if (rateComponents.has("gas-volumetric") && !rateComponents.has("fuel-price")) {
    return line.replaceAll("Current Fuel Price", "Bill-Derived Gas Rate");
  }
  return line;
}

function humanizeIdentifier(value) {
  return IDENTIFIER_LABELS.get(value) ||
    value
      .replace(/[,_]/g, " ")
      .replace(/\b\w/g, (character) => character.toUpperCase());
}

function rootLabelFor(category) {
  if (category.id === "ITC-54") return "Annual Routine Backup-Power Resource Cost";
  if (["ITC-27", "ITC-28", "ITC-51"].includes(category.id)) return "Annual Operational Cost Impact";
  return "Annual Operational Savings";
}

function friendlyTreeLabel(value, categoryId) {
  let text = stripInternalTreeText(value)
    .replace(/\s*\((?:User|Profile|Bill|Project Document|Standard)\)$/, "")
    .replace(/\s*\[[A-Z0-9-]+\]\s*$/, "")
    .replace(/\bCanonical retrofit ID from linked-opportunity taxonomy match\b/i, "Applicable Upgrade Requirements")
    .replace(/\bLinked Opportunity\b/i, "Opportunity Equipment or Performance Requirements")
    .replace(/\bClimate zone resolved from site\.geo\.coordinates or site\.geo\.countyFips\b/i, "Site Climate Zone")
    .replace(/\bsite\.geo\.coordinates and business\.primaryActivityText\b/i, "Site Location and Business Activity")
    .replace(/\bsite\.geo coordinates and business\.primaryActivityText\b/i, "Site Location and Business Activity")
    .replace(/\bsite\.buildingTypes and site\.squareFootage\.value\b/i, "Building Type and Area")
    .replace(/\bsite\.geo\.coordinates(?:, verified rather than address-only)?\b/i, "Site Location")
    .replace(/\bsite\.geo\.stateCode or site\.geo\.countyFips\b/i, "Site State or County")
    .replace(/\bsite\.buildingTypes(?: canonical)? commercial building type\b/i, "Building Type")
    .replace(/\bsite\.buildingTypes canonical building type\b/i, "Building Type")
    .replace(/\bsite\.squareFootage\.value[^,]*/i, "Building Area")
    .replace(/\bbusiness\.primaryActivityText usage context\b/i, "Business Activity")
    .replace(/\bsite\.addressStructured\.zip5[^,]*/i, "Site ZIP Code")
    .replace(/\bsite\.geo coordinates\b/i, "Site Location")
    .replace(/\bFuelEconomy\.gov ID\b/gi, "Approximate Model Year")
    .replace(/\bcomb08\b/gi, "Existing Vehicle Combined Fuel Economy")
    .replace(/\bcombE\b/gi, "Proposed Vehicle Electricity per 100 Miles")
    .replace(/\bEVSE interval load profile\b/i, "Charging-Station Interval Load Profile")
    .replace(/\bBR-[A-Z0-9-]+\b/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();

  text = text.replace(/^Site ZIP Code, approximate only when parsed from an unmatched raw address$/i, "Site ZIP Code");

  text = text
    .replace(/^Existing-condition selector$/i, "Existing Building Condition")
    .replace(/^Proposed-option selector$/i, "Proposed Upgrade Option");
  if (categoryId === "ITC-08") {
    text = text.replace(
      /^Annual delivered hot-water thermal load$/i,
      "Hot-Water Load from Project Design or Measurement"
    );
  }

  const source = /\(Profile\)$/.test(value)
    ? "Profile"
    : /\(Bill\)$/.test(value)
      ? "Bill"
      : /\(Project Document\)$/.test(value)
        ? "Project Document"
      : /\(User\)$/.test(value)
        ? proposedSpecificationSource(text, categoryId)
        : null;
  if (source) text = `${friendlyTechnicalInput(text, source)} (${source})`;
  return text;
}

function proposedSpecificationSource(text, categoryId) {
  if (
    categoryId === "ITC-18" &&
    /^(?:Allocated or credited|Credit rate|Subscription charge|Contract escalation|Contract term)/i.test(text)
  ) {
    return "Linked Opportunity";
  }
  if (
    categoryId === "ITC-08" &&
    /^(?:Collector|Tilt$|Azimuth$|Storage volume$|Hot-Water Load from Project Design or Measurement$)/i.test(text)
  ) {
    return "Linked Opportunity";
  }
  if (/^Proposed Upgrade Option$/i.test(text)) {
    return "Linked Opportunity";
  }
  if (
    ["ITC-17", "ITC-24", "ITC-26"].includes(categoryId) &&
    /^(?:DC capacity|Module Type|Array type|System losses|Tilt|Azimuth)$/i.test(text)
  ) {
    return "Linked Opportunity";
  }
  if (
    ["ITC-19", "ITC-26"].includes(categoryId) &&
    /^(?:Wind Turbine Class or Intended Application|Exact Turbine Model or Power Curve|Hub Height|Loss factor)$/i.test(text)
  ) {
    return "Linked Opportunity";
  }
  if (
    ["ITC-23", "ITC-24", "ITC-26"].includes(categoryId) &&
    /^(?:Power capacity|Usable-energy capacity|Charge efficiency|Discharge efficiency|Initial state of charge|Terminal state-of-charge constraint|Dispatch-availability schedule|Reserve constraint)$/i.test(text)
  ) {
    return "Linked Opportunity";
  }
  if (
    categoryId === "ITC-25" &&
    /^(?:Thermal capacity|Charge limit|Discharge limit|Charge efficiency|Discharge efficiency|Standing loss|Initial Thermal State|Terminal thermal-state constraint)$/i.test(text)
  ) {
    return "Linked Opportunity";
  }
  if (
    ["ITC-20", "ITC-21", "ITC-22", "ITC-26"].includes(categoryId) &&
    /^(?:Prime mover|Prime-mover type|Input fuel|Conversion technology|Total installed capacity|Installed capacity|Annual capacity factor|Annual operating profile)$/i.test(text)
  ) {
    return "Linked Opportunity";
  }
  if (
    ["ITC-27", "ITC-28"].includes(categoryId) &&
    /^(?:Charger Class or Intended Application|Rated (?:Charger )?Power or Capacity|Installed port count)$/i.test(text)
  ) {
    return "Linked Opportunity";
  }
  if (
    categoryId === "ITC-45" &&
    /^(?:Recovery-equipment efficiency|Recovery auxiliary power)$/i.test(text)
  ) {
    return "Linked Opportunity";
  }
  if (
    /^(?:Proposed .*(?:efficiency|input|power|rating|rated|model|capacity|configuration|COP|type|class|mode|rule|technology|schedule|profile|minimum speed|cycles of concentration|kWh)|Selected .*(?:model|capacity|configuration)|New .*(?:efficiency|input|power|rating|model|capacity|configuration|COP)|Collector |PV array|Battery configuration)/i.test(text) &&
    !["ITC-30", "ITC-48", "ITC-49", "ITC-54"].includes(categoryId)
  ) {
    return "Linked Opportunity";
  }
  return "User";
}

function friendlyTechnicalInput(text, source) {
  if (source !== "User") return text;
  return text
    .replace(/\bCount of identical units in project scope\b/i, "In-Scope Equipment Count")
    .replace(/\bTimestamped Green Button interval kW or kWh artifact; no current canonical bill-dictionary field\b/i, "Timestamped Interval Electricity Data")
    .replace(/\bInterval timezone and daylight-saving treatment from the uploaded interval artifact\b/i, "Time Zone and Daylight-Saving Treatment from Uploaded Interval Data")
    .replace(/\bVerified tariff calendar for the modeled interval import energy; the current bill parser has no complete canonical tariff artifact\b/i, "Complete Tariff Calendar and Billing Rules")
    .replace(/\bVerified billing-demand and ratchet rules applied to interval kW\b/i, "Billing-Demand and Ratchet Rules")
    .replace(/\bExisting full-load input kW\b/i, "Existing Equipment Nameplate and Load Information")
    .replace(/\bExisting motor input or shaft rating\b/i, "Existing Motor Nameplate or Measurement")
    .replace(/\bPump input kW\b/i, "Pump Nameplate or Measured Input")
    .replace(/\bExisting fan input power\b/i, "Existing Fan Nameplate or Measured Input")
    .replace(/\bExisting compressor specific power\b/i, "Existing Compressor Nameplate or Test Information")
    .replace(/\bProposed compressor specific power\b/i, "Proposed Compressor Specifications")
    .replace(/\bExisting pump efficiency\b/i, "Existing Pump Nameplate or Test Information")
    .replace(/\bExisting motor efficiency\b/i, "Existing Motor Nameplate or Test Information")
    .replace(/\bProposed pump efficiency\b/i, "Proposed Pump Specifications")
    .replace(/\bProposed motor efficiency\b/i, "Proposed Motor Specifications")
    .replace(/\bExisting fan efficiency\b/i, "Existing Fan Nameplate or Test Information")
    .replace(/\bProposed fan efficiency\b/i, "Proposed Fan Specifications")
    .replace(/\bBackup efficiency\b/i, "Backup-System Nameplate or Test Information")
    .replace(/\bExisting water-heating system efficiency\b/i, "Existing Water-Heater Nameplate or Test Information")
    .replace(/\bBoiler efficiency\b/i, "Boiler Nameplate or Combustion-Test Information")
    .replace(/\bExisting process efficiency\b/i, "Existing Process Nameplate or Test Information");
}

function stripInternalTreeText(value) {
  return String(value || "")
    .replace(/\s*\{\{(?:lookup|constant|output|input|resource|component|intermediate):\s*[^}]+\}\}/g, "")
    .replace(/\s*\[BR-[A-Z0-9-]+\]\s*/g, " ")
    .trim();
}

function node(text, children = []) {
  return { text, children };
}

function processNode(processKey) {
  return { text: "", children: [], processKey };
}

export function buildUserInputRealismEntries(
  categoryId,
  tree,
  processes,
  decisionRegistry
) {
  const entries = [];
  const processByKey = new Map(processes.map((process) => [process.key, process]));
  const decisionByKey = new Map(
    (decisionRegistry?.inputs || []).map((decision) => [
      `${decision.category_id}\u0000${decision.tree_path}`,
      decision
    ])
  );

  const visit = (treeNode, path) => {
    const nextPath = [...path, treeNode];
    if (
      !treeNode.processKey &&
      treeNode.children.length === 0 &&
      treeNode.text.endsWith("(User)")
    ) {
      const visibleLabel = treeNode.text.replace(/\s+\(User\)$/, "");
      const treePath = nextPath
        .filter((item) => !item.processKey)
        .map((item) =>
          item.text.replace(
            /\s+\((?:User|Profile|Bill|Linked Opportunity|Project Document|Derived)\)$/,
            ""
          )
        )
        .join(" > ");
      const decision = decisionByKey.get(`${categoryId}\u0000${treePath}`);
      if (!decision) {
        throw new Error(
          `Missing explicit User-input decision for ${categoryId} ${treePath}`
        );
      }
      if (decision.visible_label !== visibleLabel) {
        throw new Error(
          `User-input decision label mismatch for ${categoryId} ${treePath}`
        );
      }
      if (decision.fallback_process_key) {
        const process = processByKey.get(decision.fallback_process_key);
        const hasExactInputBinding = process?.inputBindings?.some(
          (binding) => binding.treePath === treePath
        );
        const hasExactOutput = process?.outputBindings?.some(
          (binding) => binding.outputName === decision.fallback_output
        );
        if (!hasExactInputBinding || !hasExactOutput) {
          throw new Error(
            `Invalid explicit User-input fallback for ${categoryId} ${treePath}`
          );
        }
      } else if (decision.fallback_output !== null) {
        throw new Error(
          `User-input decision has an output without a process for ${categoryId} ${treePath}`
        );
      }
      entries.push({ ...decision });
    }
    for (const child of treeNode.children) visit(child, nextPath);
  };

  visit(tree, []);
  return entries;
}

export const INFORMATION_CARD_REGISTRY_METADATA = {
  registryType: "operational_savings_information_card_registry",
  schemaVersion: "1.1.0",
  categoryCount: Object.keys(CARD_COPY).length,
  requiredCardFields: [
    "categoryId",
    "title",
    "retrofitNames",
    "overview",
    "broaderFormula",
    "expandedFormula",
    "tree",
    "processes"
  ],
  requiredProcessFields: [
    "key",
    "displayNumber",
    "name",
    "canonicalStandardIds",
    "sourceName",
    "purpose",
    "lookupInputs",
    "valueNeeded",
    "howToUse",
    "automation",
    "validation",
    "evidenceState",
    "inputBindings",
    "outputBindings",
    "selectionPolicy"
  ]
};
