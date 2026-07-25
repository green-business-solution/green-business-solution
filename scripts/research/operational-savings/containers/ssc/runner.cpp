#include <cstdlib>
#include <iomanip>
#include <iostream>
#include <sstream>
#include <stdexcept>
#include <string>

#include "sscapi.h"
#include "input_cases/pvwatts_cases.h"
#include "input_cases/swh_common.h"
#include "input_cases/windpower_cases.h"

#ifndef SSC_SOURCE_COMMIT
#define SSC_SOURCE_COMMIT "unknown"
#endif

namespace {

class DataHandle {
public:
    DataHandle() : value_(ssc_data_create()) {
        if (value_ == nullptr) {
            throw std::runtime_error("ssc_data_create returned null");
        }
    }

    ~DataHandle() {
        ssc_data_free(value_);
    }

    DataHandle(const DataHandle&) = delete;
    DataHandle& operator=(const DataHandle&) = delete;

    ssc_data_t get() const {
        return value_;
    }

private:
    ssc_data_t value_;
};

class ModuleHandle {
public:
    explicit ModuleHandle(const char* name) : value_(ssc_module_create(name)) {
        if (value_ == nullptr) {
            throw std::runtime_error(std::string("ssc_module_create failed for ") + name);
        }
    }

    ~ModuleHandle() {
        ssc_module_free(value_);
    }

    ModuleHandle(const ModuleHandle&) = delete;
    ModuleHandle& operator=(const ModuleHandle&) = delete;

    ssc_module_t get() const {
        return value_;
    }

private:
    ssc_module_t value_;
};

std::string escape_json(const std::string& input) {
    std::ostringstream output;
    for (const unsigned char character : input) {
        switch (character) {
        case '"':
            output << "\\\"";
            break;
        case '\\':
            output << "\\\\";
            break;
        case '\b':
            output << "\\b";
            break;
        case '\f':
            output << "\\f";
            break;
        case '\n':
            output << "\\n";
            break;
        case '\r':
            output << "\\r";
            break;
        case '\t':
            output << "\\t";
            break;
        default:
            if (character < 0x20) {
                output << "\\u"
                       << std::hex << std::setw(4) << std::setfill('0')
                       << static_cast<int>(character)
                       << std::dec << std::setfill(' ');
            } else {
                output << character;
            }
        }
    }
    return output.str();
}

std::string module_log(ssc_module_t module) {
    std::ostringstream output;
    int item_type = 0;
    float time = 0.0f;
    for (int index = 0;; ++index) {
        const char* message = ssc_module_log(module, index, &item_type, &time);
        if (message == nullptr) {
            break;
        }
        if (index > 0) {
            output << " | ";
        }
        output << "type=" << item_type << ": " << message;
    }
    return output.str();
}

void execute(ssc_data_t data, const char* module_name) {
    ModuleHandle module(module_name);
    if (ssc_module_exec(module.get(), data) == 0) {
        throw std::runtime_error(
            std::string("SSC module execution failed for ") + module_name + ": " +
            module_log(module.get()));
    }
}

double number(ssc_data_t data, const char* name) {
    ssc_number_t value = 0.0f;
    if (ssc_data_get_number(data, name, &value) == 0) {
        throw std::runtime_error(std::string("missing numeric SSC output: ") + name);
    }
    return static_cast<double>(value);
}

std::string prefix(const char* model) {
    std::ostringstream output;
    output << std::setprecision(10)
           << "{\"schemaVersion\":1"
           << ",\"sourceCommit\":\"" << SSC_SOURCE_COMMIT << "\""
           << ",\"sscApiVersion\":" << ssc_version()
           << ",\"model\":\"" << model << "\"";
    return output.str();
}

std::string pvwatts() {
    DataHandle data;
    ssc_data_t raw_data = data.get();
    if (pvwatts_nofinancial_testfile(raw_data) != 0) {
        throw std::runtime_error("official PVWatts fixture initialization failed");
    }
    execute(raw_data, "pvwattsv8");

    int monthly_count = 0;
    ssc_number_t* monthly = ssc_data_get_array(raw_data, "monthly_energy", &monthly_count);
    if (monthly == nullptr || monthly_count != 12) {
        throw std::runtime_error("monthly_energy did not contain exactly 12 values");
    }

    double annual_energy = 0.0;
    for (int index = 0; index < monthly_count; ++index) {
        annual_energy += static_cast<double>(monthly[index]);
    }

    std::ostringstream output;
    output << std::setprecision(10)
           << prefix("pvwattsv8")
           << ",\"fixture\":\"test/input_cases/pvsamv1_data/USA AZ Phoenix (TMY2).csv\""
           << ",\"outputs\":{"
           << "\"annualEnergyKwh\":" << annual_energy
           << ",\"capacityFactorPercent\":" << number(raw_data, "capacity_factor")
           << ",\"energyYieldKwhPerKw\":" << number(raw_data, "kwh_per_kw")
           << "}}";
    return output.str();
}

std::string solar_water_heating() {
    DataHandle data;
    ssc_data_t raw_data = data.get();
    swh_common(raw_data);
    execute(raw_data, "swh");

    std::ostringstream output;
    output << std::setprecision(10)
           << prefix("swh")
           << ",\"fixture\":\"test/input_cases/swh_residential_data/fargo_nd_46.9_-96.8_mts1_60_tmy.csv\""
           << ",\"outputs\":{"
           << "\"annualEnergyKwh\":" << number(raw_data, "annual_energy")
           << "}}";
    return output.str();
}

std::string wind() {
    DataHandle data;
    ssc_data_t raw_data = data.get();
    if (windpower_nofinancial_testfile(raw_data) != 0) {
        throw std::runtime_error("official wind fixture initialization failed");
    }
    execute(raw_data, "windpower");

    std::ostringstream output;
    output << std::setprecision(10)
           << prefix("windpower")
           << ",\"fixture\":\"test/input_docs/wind.srw\""
           << ",\"outputs\":{"
           << "\"annualEnergyKwh\":" << number(raw_data, "annual_energy")
           << ",\"internalWakeLossPercent\":"
           << number(raw_data, "annual_wake_loss_internal_percent")
           << "}}";
    return output.str();
}

}  // namespace

int main(int argc, char** argv) {
    if (argc != 2) {
        std::cerr << "usage: ssc-runner <pvwattsv8|swh|windpower>\n";
        return 64;
    }

    try {
        ssc_module_exec_set_print(0);
        const std::string model = argv[1];
        if (model == "pvwattsv8") {
            std::cout << pvwatts() << '\n';
        } else if (model == "swh") {
            std::cout << solar_water_heating() << '\n';
        } else if (model == "windpower") {
            std::cout << wind() << '\n';
        } else {
            std::cerr << "unsupported model: " << escape_json(model) << '\n';
            return 64;
        }
    } catch (const std::exception& error) {
        std::cerr << "{\"error\":\"" << escape_json(error.what()) << "\"}\n";
        return 1;
    }

    return 0;
}
