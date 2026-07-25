using HiGHS
using JSON
using JuMP
using MathOptInterface
using Pkg
using REopt
using SHA

const MOI = MathOptInterface
const OFFICIAL_SCENARIO = "/opt/reopt/test/scenarios/no_techs.json"
const RETROFI_SPEC = "/opt/reopt-proof/retrofi-storage-spec.json"

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

function official_proof()
    model = optimizer_model()
    results = run_reopt(model, OFFICIAL_SCENARIO)
    output = Dict(
        "schemaVersion" => "retrofi/reopt-official-proof-v1",
        "scenarioKind" => "official_shipped",
        "sourcePath" => "test/scenarios/no_techs.json",
        "sourceCommit" => "f952cabdf3e60f6e88eef80bb7bc9e7e24bac643",
        "inputSha256" => sha256_file(OFFICIAL_SCENARIO),
        "status" => results["status"],
        "terminationStatus" => string(termination_status(model)),
        "solverSeconds" => results["solver_seconds"],
        "packageVersions" => package_versions(),
        "metrics" => Dict(
            "annualLoadKwh" => results["ElectricLoad"]["annual_calculated_kwh"],
            "yearOneEnergyCostBeforeTaxUsd" =>
                results["ElectricTariff"]["year_one_energy_cost_before_tax"],
            "yearOneDemandCostBeforeTaxUsd" =>
                results["ElectricTariff"]["year_one_demand_cost_before_tax"],
            "yearOneBillBeforeTaxUsd" =>
                results["ElectricTariff"]["year_one_bill_before_tax"]
        )
    )
    output["outputSha256"] = sha256_json(output)
    finish_model(model)
    return output
end

function expanded_retrofi_input(spec; with_storage)
    loads_kw = repeat(Float64.(spec["loadProfile"]["hourlyKw"]), 365)
    rates = repeat(
        Float64.(spec["tariff"]["hourlyEnergyRateUsdPerKwh"]),
        365
    )
    input = Dict(
        "Settings" => Dict("time_steps_per_hour" => 1),
        "Site" => Dict(
            "latitude" => spec["site"]["latitude"],
            "longitude" => spec["site"]["longitude"]
        ),
        "ElectricLoad" => Dict(
            "loads_kw" => loads_kw,
            "year" => spec["year"]
        ),
        "ElectricTariff" => Dict(
            "tou_energy_rates_per_kwh" => rates,
            "monthly_demand_rates" =>
                Float64.(spec["tariff"]["monthlyDemandRateUsdPerKw"])
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
    if with_storage
        storage = spec["storage"]
        input["ElectricStorage"] = Dict(
            "min_kw" => storage["powerKw"],
            "max_kw" => storage["powerKw"],
            "min_kwh" => storage["energyKwh"],
            "max_kwh" => storage["energyKwh"],
            "soc_init_fraction" => storage["socInitialFraction"],
            "soc_min_fraction" => storage["socMinimumFraction"],
            "can_grid_charge" => true,
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

function solve_retrofi_case(input)
    model = optimizer_model()
    results = run_reopt(model, input)
    storage = get(
        results,
        "ElectricStorage",
        Dict(
            "size_kw" => 0.0,
            "size_kwh" => 0.0,
            "soc_series_fraction" => Float64[],
            "storage_to_load_series_kw" => Float64[]
        )
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
            results["ElectricTariff"]["year_one_bill_before_tax"],
        "storagePowerKw" => storage["size_kw"],
        "storageEnergyKwh" => storage["size_kwh"],
        "storageDischargeKwh" => sum(storage["storage_to_load_series_kw"]),
        "storageSocSeriesSha256" =>
            sha256_json(storage["soc_series_fraction"]),
        "storageDischargeSeriesSha256" =>
            sha256_json(storage["storage_to_load_series_kw"])
    )
    finish_model(model)
    return output
end

function retrofi_proof()
    spec = JSON.parsefile(RETROFI_SPEC)
    baseline = solve_retrofi_case(
        expanded_retrofi_input(spec; with_storage=false)
    )
    proposed = solve_retrofi_case(
        expanded_retrofi_input(spec; with_storage=true)
    )
    output = Dict(
        "schemaVersion" => "retrofi/reopt-storage-proof-v1",
        "scenarioKind" => "retrofi_local_storage_pair",
        "sourceCommit" => "f952cabdf3e60f6e88eef80bb7bc9e7e24bac643",
        "inputSpecPath" => "retrofi-storage-spec.json",
        "inputSpecSha256" => sha256_file(RETROFI_SPEC),
        "packageVersions" => package_versions(),
        "baseline" => baseline,
        "proposed" => proposed,
        "metrics" => Dict(
            "yearOneBillSavingsBeforeTaxUsd" =>
                baseline["yearOneBillBeforeTaxUsd"] -
                proposed["yearOneBillBeforeTaxUsd"],
            "yearOneEnergySavingsBeforeTaxUsd" =>
                baseline["yearOneEnergyCostBeforeTaxUsd"] -
                proposed["yearOneEnergyCostBeforeTaxUsd"],
            "yearOneDemandSavingsBeforeTaxUsd" =>
                baseline["yearOneDemandCostBeforeTaxUsd"] -
                proposed["yearOneDemandCostBeforeTaxUsd"]
        )
    )
    output["outputSha256"] = sha256_json(output)
    return output
end

function main()
    length(ARGS) == 1 || error("usage: runner.jl official|retrofi")
    if ARGS[1] == "official"
        println(JSON.json(official_proof()))
    elseif ARGS[1] == "retrofi"
        println(JSON.json(retrofi_proof()))
    else
        error("unknown proof mode: $(ARGS[1])")
    end
end

main()
