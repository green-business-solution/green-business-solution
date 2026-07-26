using HiGHS
using JSON
using JuMP
using MathOptInterface
using Pkg
using REopt
using SHA

const MOI = MathOptInterface
const REOPT_COMMIT = "f952cabdf3e60f6e88eef80bb7bc9e7e24bac643"
const REOPT_IMAGE_DIGEST =
    "sha256:3f894dad8b57d0b9a4e89d7401b882a17a067b1f4b186b7da155f0aa6d89e717"
const EXPECTED_SERIES_FILE_SHA256 =
    "d57fd0f03e904bebe7b6056c9e41385fd081eb313b165681c5ca2533bc9c65f0"
const EXPECTED_SERIES_SHA256 =
    "a842a7a51583fca8b7c559a1ed12b16aa9d396ec7c6b92dbfabfc282dbaf0f1c"
const EXPECTED_PVWATTS_INPUT_SHA256 =
    "e3f415eb40b37927dd12a9aa4c48ffa5512b09f7a5c18c97386e539a843b180e"
const EXPECTED_PVWATTS_OUTPUT_SHA256 =
    "4447dfd0255ba2194a685c2ed2221325c0d7f3488d2a6a82a1166a37e0614532"

function proof_error(message)
    error("REOPT_SOLAR_STORAGE_INPUT_INVALID: " * message)
end

function require_condition(condition, message)
    condition || proof_error(message)
end

function require_number(value, label; minimum=nothing, maximum=nothing)
    require_condition(value isa Real && isfinite(value), "$label must be finite")
    if !isnothing(minimum)
        require_condition(value >= minimum, "$label below minimum")
    end
    if !isnothing(maximum)
        require_condition(value <= maximum, "$label above maximum")
    end
    return Float64(value)
end

function sha256_file(path)
    return bytes2hex(sha256(read(path)))
end

function sha256_json(value)
    return bytes2hex(sha256(JSON.json(value)))
end

function package_versions()
    wanted = Set(["REopt", "HiGHS", "HiGHS_jll", "JuMP", "MathOptInterface"])
    versions = Dict{String, String}()
    for dependency in values(Pkg.dependencies())
        if dependency.name in wanted
            versions[dependency.name] = string(dependency.version)
        end
    end
    versions["Julia"] = string(VERSION)
    return versions
end

function optimizer_model()
    return Model(
        optimizer_with_attributes(
            HiGHS.Optimizer,
            "output_flag" => false,
            "log_to_console" => false
        )
    )
end

function finish_model(model)
    finalize(backend(model))
    empty!(model)
    GC.gc()
end

function validate_and_expand(spec_path, series_path)
    require_condition(
        sha256_file(series_path) == EXPECTED_SERIES_FILE_SHA256,
        "PVWatts interval-series file checksum"
    )
    spec = JSON.parsefile(spec_path)
    source = JSON.parsefile(series_path)
    require_condition(
        spec["schemaVersion"] == "retrofi/reopt-solar-storage-proof-v1",
        "specification schema version"
    )
    time_basis = spec["timeBasis"]
    require_condition(
        time_basis["intervalHours"] == 1 &&
            time_basis["intervalCount"] == 8760 &&
            time_basis["timeZone"] == "America/Phoenix" &&
            time_basis["utcOffsetHours"] == -7 &&
            time_basis["observesDaylightSavingTime"] == false,
        "hourly Phoenix no-DST time basis"
    )
    require_condition(spec["year"] == 2023, "non-leap proof year")
    require_condition(
        source["schemaVersion"] == "retrofi/pvwatts-interval-series-v1" &&
            source["standardId"] == "STD-PVWATTS-V8" &&
            source["processKey"] == "pvwatts_v8" &&
            source["formulaTerm"] == "PV_AC_kWh_t" &&
            source["unit"] == "kWh/interval" &&
            source["intervalHours"] == 1 &&
            source["count"] == 8760,
        "PVWatts source contract"
    )
    require_condition(
        source["seriesSha256"] == EXPECTED_SERIES_SHA256 &&
            source["sourceInputSha256"] == EXPECTED_PVWATTS_INPUT_SHA256 &&
            source["sourceOutputSha256"] == EXPECTED_PVWATTS_OUTPUT_SHA256 &&
            source["modelVersion"] == "303",
        "PVWatts source identity"
    )
    require_condition(
        source["site"] == merge(spec["site"], Dict(
            "timeZone" => time_basis["timeZone"],
            "utcOffsetHours" => time_basis["utcOffsetHours"],
            "observesDaylightSavingTime" =>
                time_basis["observesDaylightSavingTime"]
        )),
        "PVWatts and scenario site/time alignment"
    )
    pv = spec["pv"]
    require_condition(
        pv["sourceStandardId"] == source["standardId"] &&
            pv["sourceFormulaTerm"] == source["formulaTerm"] &&
            pv["intervalSeriesSha256"] == source["seriesSha256"] &&
            pv["systemCapacityDcKw"] == source["systemCapacityDcKw"],
        "PVWatts linkage"
    )
    generation_kwh = Float64.(source["values"])
    require_condition(
        length(generation_kwh) == 8760 &&
            all(isfinite, generation_kwh) &&
            all(value -> value >= 0, generation_kwh),
        "PVWatts interval values"
    )
    require_condition(
        isapprox(
            sum(generation_kwh),
            source["annualEnergyKwh"];
            atol=0.01,
            rtol=0
        ),
        "PVWatts annual reconciliation"
    )
    pv_capacity_kw = require_number(
        pv["systemCapacityDcKw"],
        "PV capacity";
        minimum=eps()
    )
    production_factor_series = generation_kwh ./ pv_capacity_kw
    require_condition(
        all(value -> 0 <= value <= 1, production_factor_series),
        "PV production-factor range"
    )
    load_day = Float64.(spec["loadProfile"]["hourlyKw"])
    energy_rate_day = Float64.(spec["tariff"]["hourlyEnergyRateUsdPerKwh"])
    demand_rates = Float64.(spec["tariff"]["monthlyDemandRateUsdPerKw"])
    require_condition(
        spec["loadProfile"]["construction"] ==
            "repeat-hour-of-day-for-365-days" &&
            length(load_day) == 24 &&
            all(value -> isfinite(value) && value > 0, load_day),
        "load profile"
    )
    require_condition(
        spec["tariff"]["construction"] ==
            "repeat-hour-of-day-for-365-days" &&
            length(energy_rate_day) == 24 &&
            all(value -> isfinite(value) && value >= 0, energy_rate_day) &&
            length(demand_rates) == 12 &&
            all(value -> isfinite(value) && value >= 0, demand_rates),
        "tariff"
    )
    storage = spec["storage"]
    power_kw = require_number(
        storage["powerKw"],
        "storage power";
        minimum=eps()
    )
    usable_energy_kwh = require_number(
        storage["usableEnergyKwh"],
        "usable storage energy";
        minimum=eps()
    )
    reserve_fraction = require_number(
        storage["reserveFraction"],
        "reserve fraction";
        minimum=0,
        maximum=1 - eps()
    )
    initial_soc_fraction = require_number(
        storage["initialSocFraction"],
        "initial state of charge";
        minimum=reserve_fraction,
        maximum=1
    )
    charge_efficiency = require_number(
        storage["chargeEfficiency"],
        "charge efficiency";
        minimum=eps(),
        maximum=1
    )
    discharge_efficiency = require_number(
        storage["dischargeEfficiency"],
        "discharge efficiency";
        minimum=eps(),
        maximum=1
    )
    require_condition(
        storage["canGridCharge"] == false,
        "grid charging must remain disabled"
    )
    nameplate_energy_kwh = usable_energy_kwh / (1 - reserve_fraction)
    return (
        spec=spec,
        source=source,
        loads_kw=repeat(load_day, 365),
        rates=repeat(energy_rate_day, 365),
        demand_rates=demand_rates,
        generation_kwh=generation_kwh,
        production_factor_series=production_factor_series,
        pv_capacity_kw=pv_capacity_kw,
        storage_power_kw=power_kw,
        usable_energy_kwh=usable_energy_kwh,
        nameplate_energy_kwh=nameplate_energy_kwh,
        reserve_fraction=reserve_fraction,
        initial_soc_fraction=initial_soc_fraction,
        charge_efficiency=charge_efficiency,
        discharge_efficiency=discharge_efficiency
    )
end

function common_input(values)
    spec = values.spec
    return Dict(
        "Settings" => Dict("time_steps_per_hour" => 1),
        "Site" => Dict(
            "latitude" => spec["site"]["latitude"],
            "longitude" => spec["site"]["longitude"]
        ),
        "ElectricLoad" => Dict(
            "loads_kw" => values.loads_kw,
            "year" => spec["year"]
        ),
        "ElectricTariff" => Dict(
            "tou_energy_rates_per_kwh" => values.rates,
            "monthly_demand_rates" => values.demand_rates
        ),
        "ElectricUtility" => Dict(
            "emissions_factor_series_lb_CO2_per_kwh" => 0.0,
            "emissions_factor_series_lb_NOx_per_kwh" => 0.0,
            "emissions_factor_series_lb_SO2_per_kwh" => 0.0,
            "emissions_factor_series_lb_PM25_per_kwh" => 0.0,
            "renewable_energy_fraction_series" => zeros(8760)
        ),
        "Financial" => Dict(
            "analysis_years" => 1,
            "offtaker_tax_rate_fraction" => 0.0,
            "owner_tax_rate_fraction" => 0.0,
            "offtaker_discount_rate_fraction" => 0.0,
            "owner_discount_rate_fraction" => 0.0,
            "elec_cost_escalation_rate_fraction" => 0.0,
            "om_cost_escalation_rate_fraction" => 0.0
        )
    )
end

function expanded_input(values; proposed)
    input = common_input(values)
    if proposed
        input["PV"] = Dict(
            "min_kw" => values.pv_capacity_kw,
            "max_kw" => values.pv_capacity_kw,
            "production_factor_series" => values.production_factor_series,
            "installed_cost_per_kw" => 0.0,
            "om_cost_per_kw" => 0.0,
            "degradation_fraction" => 0.0,
            "macrs_option_years" => 0,
            "macrs_bonus_fraction" => 0.0,
            "federal_itc_fraction" => 0.0,
            "can_net_meter" => false,
            "can_wholesale" => false,
            "can_export_beyond_nem_limit" => false,
            "can_curtail" => true
        )
        input["ElectricStorage"] = Dict(
            "min_kw" => values.storage_power_kw,
            "max_kw" => values.storage_power_kw,
            "min_kwh" => values.nameplate_energy_kwh,
            "max_kwh" => values.nameplate_energy_kwh,
            "soc_init_fraction" => values.initial_soc_fraction,
            "soc_min_fraction" => values.reserve_fraction,
            "rectifier_efficiency_fraction" => values.charge_efficiency,
            "internal_efficiency_fraction" => 1.0,
            "inverter_efficiency_fraction" => values.discharge_efficiency,
            "can_grid_charge" => false,
            "installed_cost_per_kw" => 0.0,
            "installed_cost_per_kwh" => 0.0,
            "installed_cost_constant" => 0.0,
            "replace_cost_per_kw" => 0.0,
            "replace_cost_per_kwh" => 0.0,
            "replace_cost_constant" => 0.0,
            "om_cost_fraction_of_installed_cost" => 0.0,
            "total_itc_fraction" => 0.0,
            "macrs_option_years" => 0,
            "macrs_bonus_fraction" => 0.0
        )
    end
    return input
end

function solve_case(input; proposed)
    model = optimizer_model()
    results = run_reopt(model, input)
    require_condition(
        results["status"] == "optimal" &&
            string(termination_status(model)) == "OPTIMAL",
        proposed ? "proposed solver status" : "baseline solver status"
    )
    output = Dict(
        "status" => results["status"],
        "terminationStatus" => string(termination_status(model)),
        "solverSeconds" => results["solver_seconds"],
        "inputSha256" => sha256_json(input),
        "annualLoadKwh" => results["ElectricLoad"]["annual_calculated_kwh"],
        "yearOneEnergyCostBeforeTaxUsd" =>
            results["ElectricTariff"]["year_one_energy_cost_before_tax"],
        "yearOneDemandCostBeforeTaxUsd" =>
            results["ElectricTariff"]["year_one_demand_cost_before_tax"],
        "yearOneBillBeforeTaxUsd" =>
            results["ElectricTariff"]["year_one_bill_before_tax"]
    )
    if proposed
        pv = results["PV"]
        storage = results["ElectricStorage"]
        utility = results["ElectricUtility"]
        output["pvCapacityDcKw"] = pv["size_kw"]
        output["pvYearOneEnergyProducedKwh"] =
            pv["year_one_energy_produced_kwh"]
        output["pvToLoadKwh"] = sum(pv["electric_to_load_series_kw"])
        output["pvToStorageKwh"] =
            sum(pv["electric_to_storage_series_kw"])
        output["pvToGridKwh"] = sum(pv["electric_to_grid_series_kw"])
        output["pvCurtailedKwh"] =
            sum(pv["electric_curtailed_series_kw"])
        output["pvProductionFactorSeriesSha256"] =
            sha256_json(pv["production_factor_series"])
        output["storagePowerKw"] = storage["size_kw"]
        output["storageNameplateEnergyKwh"] = storage["size_kwh"]
        output["storageDischargeKwh"] =
            sum(storage["storage_to_load_series_kw"])
        output["storageSocInitialFraction"] =
            storage["soc_series_fraction"][1]
        output["storageSocTerminalFraction"] =
            storage["soc_series_fraction"][end]
        output["storageSocSeriesSha256"] =
            sha256_json(storage["soc_series_fraction"])
        output["storageDischargeSeriesSha256"] =
            sha256_json(storage["storage_to_load_series_kw"])
        output["gridToStorageKwh"] =
            sum(utility["electric_to_storage_series_kw"])
    end
    finish_model(model)
    return output
end

function main()
    length(ARGS) == 2 ||
        error("usage: solar-storage-runner.jl SPEC PVWATTS_SERIES")
    spec_path, series_path = ARGS
    values = validate_and_expand(spec_path, series_path)
    baseline = solve_case(
        expanded_input(values; proposed=false);
        proposed=false
    )
    proposed = solve_case(
        expanded_input(values; proposed=true);
        proposed=true
    )
    require_condition(
        baseline["annualLoadKwh"] == proposed["annualLoadKwh"],
        "baseline and proposed load mismatch"
    )
    require_condition(
        proposed["pvCapacityDcKw"] == values.pv_capacity_kw &&
            proposed["storagePowerKw"] == values.storage_power_kw &&
            isapprox(
                proposed["storageNameplateEnergyKwh"],
                values.nameplate_energy_kwh;
                atol=1e-9,
                rtol=0
            ),
        "fixed PV and storage capacities"
    )
    require_condition(
        proposed["pvToStorageKwh"] > 0 &&
            proposed["storageDischargeKwh"] > 0 &&
            isapprox(proposed["gridToStorageKwh"], 0; atol=1e-9, rtol=0),
        "PV-only storage dispatch"
    )
    require_condition(
        baseline["yearOneBillBeforeTaxUsd"] >
            proposed["yearOneBillBeforeTaxUsd"],
        "positive bounded bill savings"
    )
    output = Dict(
        "schemaVersion" => "retrofi/reopt-solar-storage-proof-v1",
        "scenarioKind" => "retrofi_pvwatts_fixed_solar_storage_pair",
        "sourceCommit" => REOPT_COMMIT,
        "imageDigest" => REOPT_IMAGE_DIGEST,
        "networkEnforcement" => "DOCKER_NONE",
        "runtimeUser" => "65532:65532",
        "specPath" => "retrofi-solar-storage-spec.json",
        "specSha256" => sha256_file(spec_path),
        "pvwattsSeriesPath" => "pvwatts-interval-series.json",
        "pvwattsSeriesFileSha256" => sha256_file(series_path),
        "pvwattsSeriesSha256" => values.source["seriesSha256"],
        "pvwattsInputSha256" => values.source["sourceInputSha256"],
        "pvwattsOutputSha256" => values.source["sourceOutputSha256"],
        "pvwattsAnnualEnergyKwh" => values.source["annualEnergyKwh"],
        "packageVersions" => package_versions(),
        "inputBoundaries" => Dict(
            "intervalCount" => 8760,
            "intervalHours" => 1,
            "timeZone" => values.spec["timeBasis"]["timeZone"],
            "utcOffsetHours" =>
                values.spec["timeBasis"]["utcOffsetHours"],
            "observesDaylightSavingTime" =>
                values.spec["timeBasis"]["observesDaylightSavingTime"],
            "pvCapacityDcKw" => values.pv_capacity_kw,
            "storagePowerKw" => values.storage_power_kw,
            "storageUsableEnergyKwh" => values.usable_energy_kwh,
            "storageNameplateEnergyKwh" =>
                values.nameplate_energy_kwh,
            "storageReserveFraction" => values.reserve_fraction,
            "storageInitialSocFraction" =>
                values.initial_soc_fraction,
            "storageChargeEfficiency" => values.charge_efficiency,
            "storageDischargeEfficiency" =>
                values.discharge_efficiency,
            "canGridCharge" => false
        ),
        "baseline" => baseline,
        "proposed" => proposed,
        "formulaBindings" => Dict(
            "baseline_annual_bill" => Dict(
                "value" => baseline["yearOneBillBeforeTaxUsd"],
                "unit" => "USD/year"
            ),
            "proposed_annual_bill" => Dict(
                "value" => proposed["yearOneBillBeforeTaxUsd"],
                "unit" => "USD/year"
            )
        )
    )
    stable_output = deepcopy(output)
    delete!(stable_output["baseline"], "solverSeconds")
    delete!(stable_output["proposed"], "solverSeconds")
    output["outputSha256"] = sha256_json(stable_output)
    println(JSON.json(output))
end

main()
