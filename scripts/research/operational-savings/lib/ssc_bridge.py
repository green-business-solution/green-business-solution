#!/usr/bin/env python3
"""Execute pinned SSC modules against official repository fixtures.

This bridge intentionally uses only the Python standard library and the SSC C
API. It reads the upstream C++ fixture definitions, verifies every source
artifact before loading the model, extracts native metadata from the loaded
module, and emits a deterministic proof document.
"""

import argparse
import ctypes
import errno
import hashlib
import json
import math
import os
from pathlib import Path
import re
import socket
import subprocess
import sys


ADAPTER_VERSION = "ssc-ctypes-fixture-bridge-v1"
PROOF_SCHEMA_VERSION = "operational-savings/ssc-model-proof-v1"
PINNED_SSC_VERSION = 303
PINNED_SSC_BUILD = "OS X 64 bit GNU/C++ Jul 24 2025 02:28:37"
PINNED_LIBRARY_SHA256 = (
    "db933646389fa94f41af34066d65034681d5836f1bd29644f9b2a934a01b788f"
)
PINNED_LIBRARY_SIZE = 37852576
PINNED_REOPT_COMMIT = "f952cabdf3e60f6e88eef80bb7bc9e7e24bac643"
PINNED_SSC_FIXTURE_COMMIT = "ba7a7968a115baa0c250597ce2381c7ffb27fbf2"

SSC_INPUT = 1
SSC_OUTPUT = 2
SSC_INOUT = 3
SSC_STRING = 1
SSC_NUMBER = 2
SSC_ARRAY = 3
SSC_MATRIX = 4
SSC_TABLE = 5

SSC_LOG_TYPES = {
    1: "NOTICE",
    2: "WARNING",
    3: "ERROR",
}

OPERATIONAL_ROOT = Path(__file__).resolve().parent.parent
DEFAULT_LIBRARY_PATH = (
    OPERATIONAL_ROOT / ".cache/repos/reopt/src/sam/libssc.dylib"
)
DEFAULT_REOPT_ROOT = OPERATIONAL_ROOT / ".cache/repos/reopt"
DEFAULT_SSC_ROOT = OPERATIONAL_ROOT / ".cache/repos/ssc"


class ProofError(RuntimeError):
    """A closed proof failure with a stable machine-readable code."""

    def __init__(self, code, message):
        super().__init__(message)
        self.code = code


PROOF_SPECS = {
    "pvwatts": {
        "standardId": "STD-PVWATTS-V8",
        "processKey": "pvwatts_v8",
        "adapterPath": "scripts/research/operational-savings/adapters/pvwatts/run.mjs",
        "module": "pvwattsv8",
        "fixturePath": "test/input_cases/pvwatts_cases.h",
        "fixtureSha256": (
            "b806b704a8542aa22ab2ad9c06ece19dcd766eee75777b426039b73f23dfaa61"
        ),
        "fixtureSize": 3419,
        "primaryResourceField": "solar_resource_file",
        "resources": [
            {
                "field": "solar_resource_file",
                "role": "solar weather",
                "path": "test/input_cases/pvsamv1_data/USA AZ Phoenix (TMY2).csv",
                "sha256": (
                    "311b8871e989b40d0016f7019dcabc06ebf38e16509c51842fce4bf1e6f8c591"
                ),
                "byteSize": 501341,
            }
        ],
        "requiredFixtureFields": [
            "solar_resource_file",
            "system_use_lifetime_output",
            "analysis_period",
            "system_capacity",
            "module_type",
            "dc_ac_ratio",
            "bifaciality",
            "array_type",
            "tilt",
            "azimuth",
            "gcr",
            "losses",
            "inv_eff",
            "adjust_constant",
        ],
        "numberOutputs": [
            "annual_energy",
            "capacity_factor",
            "kwh_per_kw",
        ],
        "arrayOutputs": [
            "ac_monthly",
            "monthly_energy",
            "gen",
        ],
        "seriesOutput": "gen",
        "formulaTerm": "PV_AC_kWh_t",
        "formulaUnit": "kWh/interval",
        "formulaScope": "hourly AC electricity generation",
        "upstreamReference": {
            "fixtureBinaryVersion": 308,
            "expectedAnnualEnergyKwh": 7043.1973,
            "comparisonStatus": "NOT_ASSERTED_BINARY_VERSION_DIFFERS",
        },
        "warnings": [
            {
                "code": "HOSTED_REGRESSION_INPUTS_DIFFER",
                "severity": "INFO",
                "message": (
                    "The retained hosted PVWatts response is a Los Angeles case, "
                    "while this official local fixture is Phoenix TMY2, so their "
                    "numeric outputs are not directly compared."
                ),
            }
        ],
    },
    "sam-solar-thermal": {
        "standardId": "STD-SAM-SOLAR-THERMAL",
        "processKey": "sam_solar_thermal",
        "adapterPath": (
            "scripts/research/operational-savings/adapters/"
            "sam-solar-thermal/run.mjs"
        ),
        "module": "swh",
        "fixturePath": "test/input_cases/swh_common.h",
        "fixtureSha256": (
            "5bc2ecd5a6e241a4f653dfda60d5c02b502ec7700358392ad923e7207f5b119d"
        ),
        "fixtureSize": 22073,
        "primaryResourceField": "solar_resource_file",
        "resources": [
            {
                "field": "solar_resource_file",
                "role": "solar weather",
                "path": (
                    "test/input_cases/swh_residential_data/"
                    "fargo_nd_46.9_-96.8_mts1_60_tmy.csv"
                ),
                "sha256": (
                    "3228bdb487135d66debfd9a4fb215820ae236592e25c508e22e449139e098069"
                ),
                "byteSize": 414632,
            },
            {
                "field": "scaled_draw",
                "role": "hourly hot-water draw",
                "path": "test/input_cases/swh_residential_data/scaled_draw.csv",
                "sha256": (
                    "130b36ba452062931cc26c1b5ea1b6d23c9c12ced926dbb49dad12b16ae3f931"
                ),
                "byteSize": 166423,
            },
            {
                "field": "custom_mains",
                "role": "hourly mains temperature",
                "path": "test/input_cases/swh_residential_data/custom_mains.csv",
                "sha256": (
                    "0d7a553d3eeca206aa89e01ddc1e5b9225a217119c550c3184fd46273c9cd938"
                ),
                "byteSize": 164880,
            },
            {
                "field": "custom_set",
                "role": "hourly set temperature",
                "path": "test/input_cases/swh_residential_data/custom_set.csv",
                "sha256": (
                    "cfc31bfa47a35034c9905e8a9f612396c9ae1840e849942bd20c9cd1ccc06b7f"
                ),
                "byteSize": 26280,
            },
        ],
        "requiredFixtureFields": [
            "solar_resource_file",
            "scaled_draw",
            "system_capacity",
            "tilt",
            "azimuth",
            "albedo",
            "irrad_mode",
            "sky_model",
            "mdot",
            "ncoll",
            "fluid",
            "area_coll",
            "FRta",
            "FRUL",
            "iam",
            "test_fluid",
            "test_flow",
            "pipe_length",
            "pipe_diam",
            "pipe_k",
            "pipe_insul",
            "tank_h2d_ratio",
            "U_tank",
            "V_tank",
            "hx_eff",
            "T_room",
            "T_tank_max",
            "T_set",
            "pump_power",
            "pump_eff",
            "use_custom_mains",
            "custom_mains",
            "use_custom_set",
            "custom_set",
            "adjust_constant",
        ],
        "numberOutputs": [
            "annual_energy",
            "annual_Q_deliv",
            "capacity_factor",
        ],
        "arrayOutputs": [
            "monthly_energy",
            "monthly_Q_deliv",
            "gen",
        ],
        "seriesOutput": "gen",
        "formulaTerm": "SAM_output",
        "formulaUnit": "kWh-thermal/year",
        "formulaScope": "annual useful solar thermal system energy",
        "upstreamReference": {
            "fixtureBinaryVersion": 308,
            "expectedAnnualEnergyKwh": 2362.5,
            "comparisonStatus": "NOT_ASSERTED_BINARY_VERSION_DIFFERS",
        },
        "warnings": [
            {
                "code": "RESIDENTIAL_FIXTURE_SCOPE",
                "severity": "INFO",
                "message": (
                    "The official fixture proves the SWH model path but uses a "
                    "residential Fargo design and must not be presented as a "
                    "commercial California project design."
                ),
            }
        ],
    },
    "wind-sam": {
        "standardId": "STD-WIND-SAM",
        "processKey": "wind_sam",
        "adapterPath": "scripts/research/operational-savings/adapters/wind-sam/run.mjs",
        "module": "windpower",
        "fixturePath": "test/input_cases/windpower_cases.h",
        "fixtureSha256": (
            "99d80bffaa75def04d38cca4cb8f5e1e3befd043ce950513fb116d82cb479cf6"
        ),
        "fixtureSize": 5769,
        "primaryResourceField": "wind_resource_filename",
        "resources": [
            {
                "field": "wind_resource_filename",
                "role": "hourly wind resource",
                "path": "test/input_docs/wind.srw",
                "sha256": (
                    "94ebc09260d80bcc6796d89407248c39d9599aa9a046d01533fb8083737314b2"
                ),
                "byteSize": 122828,
            }
        ],
        "requiredFixtureFields": [
            "wind_resource_filename",
            "wind_resource_shear",
            "wind_resource_turbulence_coeff",
            "system_capacity",
            "wind_resource_model_choice",
            "wind_turbine_rotor_diameter",
            "wind_turbine_powercurve_windspeeds",
            "wind_turbine_powercurve_powerout",
            "wind_turbine_hub_ht",
            "wind_farm_xCoordinates",
            "wind_farm_yCoordinates",
            "wind_farm_wake_model",
            "adjust_constant",
        ],
        "numberOutputs": [
            "annual_energy",
            "capacity_factor",
            "annual_wake_loss_internal_percent",
        ],
        "arrayOutputs": [
            "monthly_energy",
            "gen",
        ],
        "seriesOutput": "gen",
        "formulaTerm": "wind_kWh_t",
        "formulaUnit": "kWh/interval",
        "formulaScope": "hourly AC electricity generation",
        "upstreamReference": {
            "fixtureBinaryVersion": 308,
            "expectedAnnualEnergyKwh": 33224154,
            "comparisonStatus": "NOT_ASSERTED_BINARY_VERSION_DIFFERS",
        },
        "warnings": [
            {
                "code": "NON_CALIFORNIA_RESOURCE_SCOPE",
                "severity": "INFO",
                "message": (
                    "The official representative wind resource is for "
                    "Northwestern Arkansas and proves model execution only, "
                    "not California project production."
                ),
            }
        ],
    },
}


def sha256_bytes(value):
    return hashlib.sha256(value).hexdigest()


def sha256_file(path):
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def canonical_json_bytes(value):
    return json.dumps(
        value,
        ensure_ascii=False,
        allow_nan=False,
        sort_keys=True,
        separators=(",", ":"),
    ).encode("utf-8")


def sha256_json(value):
    return sha256_bytes(canonical_json_bytes(value))


def verify_file(path, expected_sha256, expected_size, label):
    if not path.is_file():
        raise ProofError("ARTIFACT_MISSING", "{} not found: {}".format(label, path))
    actual_size = path.stat().st_size
    if actual_size != expected_size:
        raise ProofError(
            "ARTIFACT_SIZE_MISMATCH",
            "{} expected {} bytes, received {}".format(
                label, expected_size, actual_size
            ),
        )
    actual_sha256 = sha256_file(path)
    if actual_sha256 != expected_sha256:
        raise ProofError(
            "CORRUPT_CHECKSUM",
            "{} expected {}, received {}".format(
                label, expected_sha256, actual_sha256
            ),
        )
    return {
        "byteSize": actual_size,
        "sha256": actual_sha256,
    }


def verify_git_commit(repo_root, expected_commit, label):
    try:
        result = subprocess.run(
            ["git", "-C", str(repo_root), "rev-parse", "HEAD"],
            check=True,
            capture_output=True,
            text=True,
        )
    except (OSError, subprocess.CalledProcessError) as error:
        raise ProofError(
            "SOURCE_IDENTITY_UNAVAILABLE",
            "{} commit could not be read: {}".format(label, error),
        )
    actual_commit = result.stdout.strip()
    if actual_commit != expected_commit:
        raise ProofError(
            "SOURCE_COMMIT_MISMATCH",
            "{} expected {}, received {}".format(
                label, expected_commit, actual_commit
            ),
        )
    return actual_commit


def verify_network_isolation():
    probe = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    probe.settimeout(0.1)
    try:
        probe.connect(("127.0.0.1", 9))
    except PermissionError as error:
        if error.errno != errno.EPERM:
            raise ProofError(
                "NETWORK_SANDBOX_PROBE_FAILED",
                "Unexpected permission error from deny-network probe: {}".format(
                    error
                ),
            )
        return {
            "target": "127.0.0.1:9",
            "result": "BLOCKED_EPERM",
        }
    except OSError as error:
        raise ProofError(
            "NETWORK_SANDBOX_NOT_ENFORCED",
            "Deny-network probe was not blocked by the OS sandbox: {}".format(
                error
            ),
        )
    finally:
        probe.close()
    raise ProofError(
        "NETWORK_SANDBOX_NOT_ENFORCED",
        "Deny-network probe unexpectedly connected",
    )


def relative_artifact_path(path):
    try:
        return path.resolve().relative_to(OPERATIONAL_ROOT.resolve()).as_posix()
    except ValueError:
        return str(path.resolve())


def parse_numeric_expression(expression):
    value = re.sub(r"\(\s*ssc_number_t\s*\)", "", expression).strip()
    if not re.fullmatch(
        r"[-+]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][-+]?\d+)?[fF]?", value
    ):
        return None
    if value[-1:] in {"f", "F"}:
        value = value[:-1]
    return float(value)


def parse_number_list(body):
    values = []
    for token in body.split(","):
        token = token.strip()
        if not token:
            continue
        value = parse_numeric_expression(token)
        if value is None:
            raise ProofError(
                "FIXTURE_PARSE_ERROR",
                "Unsupported numeric array token: {}".format(token),
            )
        values.append(value)
    return values


def read_numeric_file(path, expected_length):
    values = []
    with path.open("r", encoding="utf-8") as stream:
        for line_number, line in enumerate(stream, start=1):
            value = line.strip()
            if not value:
                continue
            try:
                values.append(float(value))
            except ValueError as error:
                raise ProofError(
                    "FIXTURE_PARSE_ERROR",
                    "{}:{} is not numeric: {}".format(path, line_number, error),
                )
    if len(values) != expected_length:
        raise ProofError(
            "FIXTURE_LENGTH_MISMATCH",
            "{} expected {} values, received {}".format(
                path, expected_length, len(values)
            ),
        )
    return values


def parse_cpp_fixture(header_path, ssc_root, native_schema):
    """Parse the upstream code-generator fixture without copying sample values."""

    text = header_path.read_text(encoding="utf-8")
    known_inputs = {
        entry["name"]: entry
        for entry in native_schema
        if entry["varType"] in {"INPUT", "INOUT"}
    }

    file_variables = {}
    sprintf_pattern = re.compile(
        r"sprintf\(\s*(\w+)\s*,\s*\"%s/([^\"]+)\"\s*,[^;]+\);"
    )
    for match in sprintf_pattern.finditer(text):
        file_variables[match.group(1)] = (ssc_root / match.group(2)).resolve()

    inputs = {}
    origins = {}

    for match in re.finditer(
        r"ssc_data_set_number\(\s*data\s*,\s*\"([^\"]+)\"\s*,\s*(.*?)\s*\);",
        text,
    ):
        name = match.group(1)
        if name not in known_inputs:
            continue
        value = parse_numeric_expression(match.group(2))
        if value is not None:
            inputs[name] = value
            origins[name] = {
                "kind": "cpp_numeric_literal",
                "fixtureField": name,
            }

    for match in re.finditer(
        r"ssc_data_set_string\(\s*data\s*,\s*\"([^\"]+)\"\s*,\s*([:\w]+)\s*\);",
        text,
    ):
        name = match.group(1)
        if name not in known_inputs:
            continue
        variable = match.group(2).split("::")[-1]
        if variable not in file_variables:
            raise ProofError(
                "FIXTURE_PARSE_ERROR",
                "No sprintf path found for fixture variable {}".format(variable),
            )
        inputs[name] = str(file_variables[variable])
        origins[name] = {
            "kind": "official_repository_file",
            "path": relative_artifact_path(file_variables[variable]),
        }

    inline_arrays = {}
    inline_pattern = re.compile(
        r"(?:ssc_number_t|double)\s+(\w+)\s*\[\s*\d+\s*\]\s*=\s*\{(.*?)\};",
        re.DOTALL,
    )
    for match in inline_pattern.finditer(text):
        inline_arrays[match.group(1)] = parse_number_list(match.group(2))

    for match in re.finditer(
        r"(?<!ssc_data_)set_array\(\s*data\s*,\s*\"([^\"]+)\"\s*,\s*([:\w]+)\s*,\s*(\d+)\s*\);",
        text,
    ):
        name = match.group(1)
        if name not in known_inputs:
            continue
        variable = match.group(2).split("::")[-1]
        expected_length = int(match.group(3))
        if variable in inline_arrays:
            values = inline_arrays[variable]
            if len(values) != expected_length:
                raise ProofError(
                    "FIXTURE_LENGTH_MISMATCH",
                    "{} expected {} inline values, received {}".format(
                        name, expected_length, len(values)
                    ),
                )
            inputs[name] = values
            origins[name] = {
                "kind": "cpp_numeric_array",
                "fixtureField": name,
                "count": expected_length,
            }
            continue
        if variable not in file_variables:
            raise ProofError(
                "FIXTURE_PARSE_ERROR",
                "No source file found for array variable {}".format(variable),
            )
        source_path = file_variables[variable]
        inputs[name] = read_numeric_file(source_path, expected_length)
        origins[name] = {
            "kind": "official_repository_numeric_file",
            "path": relative_artifact_path(source_path),
            "count": expected_length,
        }

    for match in re.finditer(
        r"ssc_data_set_array\(\s*data\s*,\s*\"([^\"]+)\"\s*,\s*(\w+)\s*,\s*(\d+)\s*\);",
        text,
    ):
        name = match.group(1)
        if name not in known_inputs or name in inputs:
            continue
        variable = match.group(2)
        source_variable = variable
        if source_variable not in inline_arrays and "d" + variable in inline_arrays:
            source_variable = "d" + variable
        if source_variable not in inline_arrays:
            continue
        expected_length = int(match.group(3))
        values = inline_arrays[source_variable]
        if len(values) != expected_length:
            raise ProofError(
                "FIXTURE_LENGTH_MISMATCH",
                "{} expected {} inline values, received {}".format(
                    name, expected_length, len(values)
                ),
            )
        inputs[name] = values
        origins[name] = {
            "kind": "cpp_numeric_array",
            "fixtureField": name,
            "count": expected_length,
        }

    return inputs, origins


def decode_c_string(value):
    return value.decode("utf-8") if value else None


class SscLibrary:
    """Small memory-safe wrapper around the subset of the SSC C API we use."""

    def __init__(self, path):
        self.path = path
        try:
            self.library = ctypes.CDLL(str(path))
        except OSError as error:
            raise ProofError("SSC_LOAD_FAILED", str(error))
        self._declare_api()

    def _declare_api(self):
        library = self.library

        library.ssc_version.argtypes = []
        library.ssc_version.restype = ctypes.c_int
        library.ssc_build_info.argtypes = []
        library.ssc_build_info.restype = ctypes.c_char_p

        library.ssc_data_create.argtypes = []
        library.ssc_data_create.restype = ctypes.c_void_p
        library.ssc_data_free.argtypes = [ctypes.c_void_p]
        library.ssc_data_free.restype = None
        library.ssc_data_set_string.argtypes = [
            ctypes.c_void_p,
            ctypes.c_char_p,
            ctypes.c_char_p,
        ]
        library.ssc_data_set_string.restype = None
        library.ssc_data_set_number.argtypes = [
            ctypes.c_void_p,
            ctypes.c_char_p,
            ctypes.c_double,
        ]
        library.ssc_data_set_number.restype = None
        library.ssc_data_set_array.argtypes = [
            ctypes.c_void_p,
            ctypes.c_char_p,
            ctypes.POINTER(ctypes.c_double),
            ctypes.c_int,
        ]
        library.ssc_data_set_array.restype = None
        library.ssc_data_get_number.argtypes = [
            ctypes.c_void_p,
            ctypes.c_char_p,
            ctypes.POINTER(ctypes.c_double),
        ]
        library.ssc_data_get_number.restype = ctypes.c_int
        library.ssc_data_get_array.argtypes = [
            ctypes.c_void_p,
            ctypes.c_char_p,
            ctypes.POINTER(ctypes.c_int),
        ]
        library.ssc_data_get_array.restype = ctypes.POINTER(ctypes.c_double)

        library.ssc_module_create.argtypes = [ctypes.c_char_p]
        library.ssc_module_create.restype = ctypes.c_void_p
        library.ssc_module_free.argtypes = [ctypes.c_void_p]
        library.ssc_module_free.restype = None
        library.ssc_module_exec.argtypes = [ctypes.c_void_p, ctypes.c_void_p]
        library.ssc_module_exec.restype = ctypes.c_int
        library.ssc_module_exec_set_print.argtypes = [ctypes.c_int]
        library.ssc_module_exec_set_print.restype = None
        library.ssc_module_log.argtypes = [
            ctypes.c_void_p,
            ctypes.c_int,
            ctypes.POINTER(ctypes.c_int),
            ctypes.POINTER(ctypes.c_float),
        ]
        library.ssc_module_log.restype = ctypes.c_char_p
        library.ssc_module_var_info.argtypes = [ctypes.c_void_p, ctypes.c_int]
        library.ssc_module_var_info.restype = ctypes.c_void_p

        library.ssc_info_var_type.argtypes = [ctypes.c_void_p]
        library.ssc_info_var_type.restype = ctypes.c_int
        library.ssc_info_data_type.argtypes = [ctypes.c_void_p]
        library.ssc_info_data_type.restype = ctypes.c_int
        for function_name in (
            "ssc_info_name",
            "ssc_info_label",
            "ssc_info_units",
            "ssc_info_meta",
            "ssc_info_group",
            "ssc_info_required",
            "ssc_info_constraints",
            "ssc_info_uihint",
        ):
            function = getattr(library, function_name)
            function.argtypes = [ctypes.c_void_p]
            function.restype = ctypes.c_char_p

    @property
    def version(self):
        return self.library.ssc_version()

    @property
    def build_info(self):
        return decode_c_string(self.library.ssc_build_info())

    def create_module(self, module_name):
        module = self.library.ssc_module_create(module_name.encode("utf-8"))
        if not module:
            raise ProofError(
                "SSC_MODULE_UNAVAILABLE",
                "SSC module could not be created: {}".format(module_name),
            )
        return module

    def module_schema(self, module_name):
        module = self.create_module(module_name)
        try:
            schema = []
            index = 0
            while True:
                info = self.library.ssc_module_var_info(module, index)
                if not info:
                    break
                var_type = self.library.ssc_info_var_type(info)
                data_type = self.library.ssc_info_data_type(info)
                schema.append(
                    {
                        "index": index,
                        "varType": {
                            SSC_INPUT: "INPUT",
                            SSC_OUTPUT: "OUTPUT",
                            SSC_INOUT: "INOUT",
                        }.get(var_type, "UNKNOWN_{}".format(var_type)),
                        "dataType": {
                            SSC_STRING: "STRING",
                            SSC_NUMBER: "NUMBER",
                            SSC_ARRAY: "ARRAY",
                            SSC_MATRIX: "MATRIX",
                            SSC_TABLE: "TABLE",
                        }.get(data_type, "UNKNOWN_{}".format(data_type)),
                        "name": decode_c_string(self.library.ssc_info_name(info)),
                        "label": decode_c_string(self.library.ssc_info_label(info)),
                        "units": decode_c_string(self.library.ssc_info_units(info)),
                        "metadata": decode_c_string(
                            self.library.ssc_info_meta(info)
                        ),
                        "group": decode_c_string(self.library.ssc_info_group(info)),
                        "required": decode_c_string(
                            self.library.ssc_info_required(info)
                        ),
                        "constraints": decode_c_string(
                            self.library.ssc_info_constraints(info)
                        ),
                        "uiHint": decode_c_string(
                            self.library.ssc_info_uihint(info)
                        ),
                    }
                )
                index += 1
            return schema
        finally:
            self.library.ssc_module_free(module)

    def _set_input(self, data, name, entry, value, keepalive):
        encoded_name = name.encode("utf-8")
        data_type = entry["dataType"]
        if data_type == "STRING":
            self.library.ssc_data_set_string(
                data, encoded_name, str(value).encode("utf-8")
            )
            return
        if data_type == "NUMBER":
            self.library.ssc_data_set_number(data, encoded_name, float(value))
            return
        if data_type == "ARRAY":
            array = (ctypes.c_double * len(value))(*value)
            keepalive.append(array)
            self.library.ssc_data_set_array(
                data, encoded_name, array, len(value)
            )
            return
        raise ProofError(
            "UNSUPPORTED_SSC_INPUT_TYPE",
            "{} uses unsupported input type {}".format(name, data_type),
        )

    def _read_number(self, data, name):
        result = ctypes.c_double()
        found = self.library.ssc_data_get_number(
            data, name.encode("utf-8"), ctypes.byref(result)
        )
        if not found:
            raise ProofError(
                "SSC_OUTPUT_MISSING",
                "SSC did not return numeric output {}".format(name),
            )
        if not math.isfinite(result.value):
            raise ProofError(
                "SSC_OUTPUT_NONFINITE",
                "SSC returned a non-finite value for {}".format(name),
            )
        return result.value

    def _read_array(self, data, name):
        length = ctypes.c_int()
        pointer = self.library.ssc_data_get_array(
            data, name.encode("utf-8"), ctypes.byref(length)
        )
        if not pointer:
            raise ProofError(
                "SSC_OUTPUT_MISSING",
                "SSC did not return array output {}".format(name),
            )
        values = [float(pointer[index]) for index in range(length.value)]
        if any(not math.isfinite(value) for value in values):
            raise ProofError(
                "SSC_OUTPUT_NONFINITE",
                "SSC returned non-finite array values for {}".format(name),
            )
        return values

    def _read_logs(self, module):
        logs = []
        index = 0
        while True:
            item_type = ctypes.c_int()
            elapsed = ctypes.c_float()
            message = self.library.ssc_module_log(
                module,
                index,
                ctypes.byref(item_type),
                ctypes.byref(elapsed),
            )
            if not message:
                break
            logs.append(
                {
                    "type": SSC_LOG_TYPES.get(
                        item_type.value, "UNKNOWN_{}".format(item_type.value)
                    ),
                    "message": decode_c_string(message),
                }
            )
            index += 1
        return logs

    def execute(self, module_name, schema, inputs, number_outputs, array_outputs):
        schema_by_name = {entry["name"]: entry for entry in schema}
        self.library.ssc_module_exec_set_print(0)
        module = self.create_module(module_name)
        data = self.library.ssc_data_create()
        if not data:
            self.library.ssc_module_free(module)
            raise ProofError("SSC_DATA_ALLOCATION_FAILED", "ssc_data_create failed")
        keepalive = []
        try:
            for name, value in inputs.items():
                if name not in schema_by_name:
                    continue
                self._set_input(data, name, schema_by_name[name], value, keepalive)

            success = self.library.ssc_module_exec(module, data)
            logs = self._read_logs(module)
            if not success:
                error_messages = [
                    entry["message"]
                    for entry in logs
                    if entry["type"] == "ERROR"
                ]
                raise ProofError(
                    "SSC_EXECUTION_FAILED",
                    "; ".join(error_messages) or "{} failed".format(module_name),
                )

            return {
                "numbers": {
                    name: self._read_number(data, name)
                    for name in number_outputs
                },
                "arrays": {
                    name: self._read_array(data, name)
                    for name in array_outputs
                },
                "logs": logs,
            }
        finally:
            self.library.ssc_data_free(data)
            self.library.ssc_module_free(module)


def summarize_array(values, include_values=False):
    summary = {
        "count": len(values),
        "sha256": sha256_json(values),
        "sum": math.fsum(values),
        "minimum": min(values) if values else None,
        "maximum": max(values) if values else None,
        "firstValues": values[:3],
        "lastValues": values[-3:] if values else [],
    }
    if include_values:
        summary["values"] = values
    return summary


def summarize_inputs(inputs, origins):
    numbers = {}
    strings = {}
    arrays = {}
    for name in sorted(inputs):
        value = inputs[name]
        origin = origins.get(name, {"kind": "unknown"})
        if isinstance(value, list):
            arrays[name] = {
                "count": len(value),
                "sha256": sha256_json(value),
                "origin": origin,
            }
        elif isinstance(value, str):
            strings[name] = {
                "origin": origin,
            }
        else:
            numbers[name] = value
    return {
        "numbers": numbers,
        "strings": strings,
        "arrays": arrays,
    }


def canonical_input_for_hash(inputs, origins):
    canonical = {}
    for name in sorted(inputs):
        value = inputs[name]
        if isinstance(value, str):
            canonical[name] = origins.get(name, {"kind": "unknown"})
        else:
            canonical[name] = value
    return canonical


def build_series_output(values, annual_energy, include_series):
    if not values:
        raise ProofError("SSC_OUTPUT_EMPTY", "Generation series is empty")
    interval_hours = 8760.0 / len(values)
    interval_energy = [value * interval_hours for value in values]
    summary = summarize_array(interval_energy, include_series)
    summary["unit"] = "kWh/interval"
    summary["intervalHours"] = interval_hours
    summary["annualSumKwh"] = math.fsum(interval_energy)
    tolerance = max(0.01, abs(annual_energy) * 1e-8)
    summary["matchesAnnualEnergy"] = (
        abs(summary["annualSumKwh"] - annual_energy) <= tolerance
    )
    summary["annualComparisonToleranceKwh"] = tolerance
    return summary


def run_proof(
    proof_name,
    library_path,
    resource_override=None,
    required_version=PINNED_SSC_VERSION,
    include_series=False,
):
    if os.environ.get("OS_RESEARCH_NETWORK") != "disabled":
        raise ProofError(
            "OFFLINE_GUARD_REQUIRED",
            "Set OS_RESEARCH_NETWORK=disabled for local SSC execution",
        )
    if (
        os.environ.get("SSC_NETWORK_ENFORCEMENT")
        != "macos-sandbox-exec-deny-network"
    ):
        raise ProofError(
            "NETWORK_SANDBOX_REQUIRED",
            "Run the bridge through the adapter's macOS deny-network sandbox",
        )
    network_probe = verify_network_isolation()
    if proof_name not in PROOF_SPECS:
        raise ProofError("UNKNOWN_PROOF", proof_name)
    spec = PROOF_SPECS[proof_name]

    if required_version != PINNED_SSC_VERSION:
        raise ProofError(
            "SSC_VERSION_MISMATCH",
            "Adapter is pinned to SSC {}, requested {}".format(
                PINNED_SSC_VERSION, required_version
            ),
        )

    library_path = library_path.resolve()
    library_artifact = verify_file(
        library_path,
        PINNED_LIBRARY_SHA256,
        PINNED_LIBRARY_SIZE,
        "SSC library",
    )
    reopt_commit = verify_git_commit(
        DEFAULT_REOPT_ROOT, PINNED_REOPT_COMMIT, "REopt binary repository"
    )
    fixture_commit = verify_git_commit(
        DEFAULT_SSC_ROOT, PINNED_SSC_FIXTURE_COMMIT, "SSC fixture repository"
    )

    fixture_path = (DEFAULT_SSC_ROOT / spec["fixturePath"]).resolve()
    fixture_artifact = verify_file(
        fixture_path,
        spec["fixtureSha256"],
        spec["fixtureSize"],
        "SSC fixture",
    )

    verified_resources = []
    resource_paths = {}
    for resource in spec["resources"]:
        resource_path = (DEFAULT_SSC_ROOT / resource["path"]).resolve()
        if (
            resource_override is not None
            and resource["field"] == spec["primaryResourceField"]
        ):
            resource_path = resource_override.resolve()
        artifact = verify_file(
            resource_path,
            resource["sha256"],
            resource["byteSize"],
            "{} resource".format(resource["field"]),
        )
        resource_paths[resource["field"]] = resource_path
        verified_resources.append(
            {
                "field": resource["field"],
                "role": resource["role"],
                "path": relative_artifact_path(resource_path),
                "sha256": artifact["sha256"],
                "byteSize": artifact["byteSize"],
            }
        )

    ssc = SscLibrary(library_path)
    if ssc.version != PINNED_SSC_VERSION:
        raise ProofError(
            "SSC_VERSION_MISMATCH",
            "Library expected SSC {}, received {}".format(
                PINNED_SSC_VERSION, ssc.version
            ),
        )
    if ssc.build_info != PINNED_SSC_BUILD:
        raise ProofError(
            "SSC_BUILD_MISMATCH",
            "Library expected build {!r}, received {!r}".format(
                PINNED_SSC_BUILD, ssc.build_info
            ),
        )

    schema = ssc.module_schema(spec["module"])
    schema_fingerprint = sha256_json(schema)
    inputs, origins = parse_cpp_fixture(fixture_path, DEFAULT_SSC_ROOT, schema)

    primary_field = spec["primaryResourceField"]
    if resource_override is not None:
        inputs[primary_field] = str(resource_paths[primary_field])
        origins[primary_field] = {
            "kind": "official_repository_file",
            "path": relative_artifact_path(resource_paths[primary_field]),
        }

    missing_fields = [
        name for name in spec["requiredFixtureFields"] if name not in inputs
    ]
    if missing_fields:
        raise ProofError(
            "FIXTURE_REQUIRED_FIELD_MISSING",
            ", ".join(missing_fields),
        )

    for resource in spec["resources"]:
        field = resource["field"]
        expected_path = resource_paths[field].resolve()
        origin = origins.get(field)
        if not origin:
            raise ProofError(
                "FIXTURE_RESOURCE_NOT_USED",
                "Fixture did not bind {}".format(field),
            )
        if field in inputs and isinstance(inputs[field], str):
            if Path(inputs[field]).resolve() != expected_path:
                raise ProofError(
                    "FIXTURE_RESOURCE_PATH_MISMATCH",
                    "{} did not resolve to pinned resource".format(field),
                )
        elif origin.get("path") != relative_artifact_path(expected_path):
            raise ProofError(
                "FIXTURE_RESOURCE_PATH_MISMATCH",
                "{} did not resolve to pinned resource".format(field),
            )

    input_sha256 = sha256_json(canonical_input_for_hash(inputs, origins))
    execution = ssc.execute(
        spec["module"],
        schema,
        inputs,
        spec["numberOutputs"],
        spec["arrayOutputs"],
    )

    output_for_hash = {
        "numbers": execution["numbers"],
        "arrays": execution["arrays"],
    }
    output_sha256 = sha256_json(output_for_hash)
    annual_energy = execution["numbers"]["annual_energy"]
    series = execution["arrays"][spec["seriesOutput"]]
    series_output = build_series_output(
        series, annual_energy, include_series=include_series
    )

    normalized_arrays = {
        name: {
            **summarize_array(values, include_values=False),
            "nativeUnits": next(
                (
                    entry["units"]
                    for entry in schema
                    if entry["name"] == name
                ),
                None,
            ),
        }
        for name, values in execution["arrays"].items()
        if name != spec["seriesOutput"]
    }
    warnings = list(spec["warnings"])
    warnings.append(
        {
            "code": "SSC_BINARY_FIXTURE_VERSION_DIFFER",
            "severity": "INFO",
            "message": (
                "The executed binary is SSC 303 from the pinned REopt.jl "
                "repository, while the separately pinned official fixture "
                "repository currently reports SSC 308 expectations. The v308 "
                "numeric expectation is retained as non-asserted context only."
            ),
        }
    )
    if not series_output["matchesAnnualEnergy"]:
        warnings.append(
            {
                "code": "INTERVAL_ANNUAL_RECONCILIATION_MISMATCH",
                "severity": "WARNING",
                "message": (
                    "The interval generation sum does not reconcile to the "
                    "native annual_energy value within the recorded tolerance."
                ),
            }
        )
    for entry in execution["logs"]:
        if entry["type"] in {"WARNING", "ERROR"}:
            warnings.append(
                {
                    "code": "SSC_{}".format(entry["type"]),
                    "severity": entry["type"],
                    "message": entry["message"],
                }
            )

    model_version_id = "{}-ssc-{}".format(
        spec["standardId"].lower(), PINNED_SSC_VERSION
    )
    calculation_run_id = "{}-{}".format(
        spec["processKey"],
        sha256_json(
            {
                "modelVersion": model_version_id,
                "inputSha256": input_sha256,
                "outputSha256": output_sha256,
            }
        )[:24],
    )
    schema_id = "{}-{}".format(
        model_version_id, schema_fingerprint[:24]
    )

    if spec["formulaTerm"] == "SAM_output":
        formula_value = {
            "kind": "scalar",
            "value": annual_energy,
            "unit": spec["formulaUnit"],
        }
        selected_value = {
            "id": "{}-{}".format(calculation_run_id, spec["formulaTerm"]),
            "calculationRunId": calculation_run_id,
            "formulaTerm": spec["formulaTerm"],
            "value": annual_energy,
            "unit": spec["formulaUnit"],
            "scope": spec["formulaScope"],
            "selectionRule": "native SSC annual_energy output",
        }
        selected_series = None
    else:
        formula_value = {
            "kind": "interval_series",
            "unit": spec["formulaUnit"],
            "seriesPath": "normalizedOutput.intervalEnergy",
            "count": series_output["count"],
            "sha256": series_output["sha256"],
            "valuesIncluded": include_series,
        }
        selected_value = None
        selected_series = {
            "calculationRunId": calculation_run_id,
            "formulaTerm": spec["formulaTerm"],
            "unit": spec["formulaUnit"],
            "scope": spec["formulaScope"],
            "count": series_output["count"],
            "sha256": series_output["sha256"],
            "valuesIncluded": include_series,
        }

    proof = {
        "schemaVersion": PROOF_SCHEMA_VERSION,
        "proofStatus": "REAL_SOURCE_BACKED",
        "standardProofStatus": "REAL_SOURCE_PARTIAL",
        "proofScope": "LOCAL_MODEL_EXECUTION_AND_FORMULA_BINDING",
        "standardId": spec["standardId"],
        "processKey": spec["processKey"],
        "sourceIdentity": {
            "library": {
                "repository": "https://github.com/NatLabRockies/REopt.jl.git",
                "repositoryCommit": reopt_commit,
                "path": relative_artifact_path(library_path),
                "sha256": library_artifact["sha256"],
                "byteSize": library_artifact["byteSize"],
                "sscVersion": ssc.version,
                "buildInfo": ssc.build_info,
                "architecture": "Mach-O universal arm64/x86_64",
                "licenseContext": "REopt.jl Apache-2.0; SSC BSD-3-Clause",
            },
            "fixture": {
                "repository": "https://github.com/NatLabRockies/ssc.git",
                "repositoryCommit": fixture_commit,
                "path": relative_artifact_path(fixture_path),
                "sha256": fixture_artifact["sha256"],
                "byteSize": fixture_artifact["byteSize"],
                "parser": "source-specific C++ code-generator fixture parser",
            },
            "resources": verified_resources,
            "upstreamReference": spec["upstreamReference"],
        },
        "nativeModelInterface": {
            "module": spec["module"],
            "metadataSource": "SSC C API ssc_module_var_info",
            "schemaFingerprintSha256": schema_fingerprint,
            "variables": schema,
        },
        "execution": {
            "adapterVersion": ADAPTER_VERSION,
            "networkMode": "OFFLINE_LOCAL_FILES_ONLY",
            "networkDisabled": True,
            "networkIsolation": "macOS sandbox-exec profile: deny network*",
            "networkProbe": network_probe,
            "module": spec["module"],
            "status": "SUCCESS",
            "inputSha256": input_sha256,
            "outputSha256": output_sha256,
            "inputSummary": summarize_inputs(inputs, origins),
            "nativeLogs": execution["logs"],
        },
        "normalizedOutput": {
            "annualEnergy": {
                "value": annual_energy,
                "unit": "kWh",
                "nativeField": "annual_energy",
            },
            "nativeNumbers": execution["numbers"],
            "nativeArrays": normalized_arrays,
            "intervalEnergy": series_output,
        },
        "formulaBinding": {
            "formulaTerm": spec["formulaTerm"],
            "value": formula_value,
            "scope": spec["formulaScope"],
            "transformation": (
                "SSC native gen kW multiplied by the recorded interval hours"
                if formula_value["kind"] == "interval_series"
                else "SSC native annual_energy mapped without numeric alteration"
            ),
        },
        "warnings": warnings,
        "publicationRows": {
            "modelVersion": {
                "id": model_version_id,
                "standardId": spec["standardId"],
                "packageName": "SSC from pinned REopt.jl artifact",
                "version": str(PINNED_SSC_VERSION),
                "commitSha": reopt_commit,
                "executableSha256": library_artifact["sha256"],
            },
            "modelInputSchema": {
                "id": schema_id,
                "modelVersionId": model_version_id,
                "moduleName": spec["module"],
                "fingerprintSha256": schema_fingerprint,
                "schemaJson": schema,
            },
            "calculationRun": {
                "id": calculation_run_id,
                "standardId": spec["standardId"],
                "processKey": spec["processKey"],
                "modelVersionId": model_version_id,
                "adapterVersion": ADAPTER_VERSION,
                "inputSha256": input_sha256,
                "outputSha256": output_sha256,
                "networkDisabled": 1,
                "status": "SUCCESS",
            },
            "selectedValue": selected_value,
            "selectedSeries": selected_series,
            "selectedValueProvenance": {
                "sourceFields": [
                    spec["seriesOutput"],
                    "annual_energy",
                ],
                "filters": {
                    "fixtureSha256": fixture_artifact["sha256"],
                    "resourceSha256": [
                        resource["sha256"] for resource in verified_resources
                    ],
                    "sscVersion": ssc.version,
                },
                "transformation": (
                    "native gen kW multiplied by interval hours"
                    if selected_series
                    else "native annual_energy"
                ),
                "adapterPath": spec["adapterPath"],
            },
        },
    }
    proof["proofSha256"] = sha256_json(proof)
    return proof


def parse_args(argv):
    parser = argparse.ArgumentParser()
    parser.add_argument("--proof", choices=sorted(PROOF_SPECS), required=True)
    parser.add_argument(
        "--library",
        type=Path,
        default=DEFAULT_LIBRARY_PATH,
        help="Pinned libssc.dylib path",
    )
    parser.add_argument(
        "--resource",
        type=Path,
        help="Override the primary resource path while retaining its checksum pin",
    )
    parser.add_argument(
        "--require-version",
        type=int,
        default=PINNED_SSC_VERSION,
        help="Require this caller-selected version in addition to the immutable pin",
    )
    parser.add_argument("--include-series", action="store_true")
    parser.add_argument("--output", type=Path)
    return parser.parse_args(argv)


def main(argv=None):
    args = parse_args(argv)
    try:
        proof = run_proof(
            args.proof,
            library_path=args.library,
            resource_override=args.resource,
            required_version=args.require_version,
            include_series=args.include_series,
        )
        encoded = json.dumps(
            proof,
            ensure_ascii=False,
            allow_nan=False,
            indent=2,
            sort_keys=True,
        ) + "\n"
        if args.output:
            args.output.parent.mkdir(parents=True, exist_ok=True)
            args.output.write_text(encoded, encoding="utf-8")
        sys.stdout.write(encoded)
        return 0
    except ProofError as error:
        sys.stderr.write("{}: {}\n".format(error.code, error))
        return 2
    except Exception as error:
        sys.stderr.write("UNEXPECTED_SSC_BRIDGE_FAILURE: {}\n".format(error))
        return 3


if __name__ == "__main__":
    sys.exit(main())
