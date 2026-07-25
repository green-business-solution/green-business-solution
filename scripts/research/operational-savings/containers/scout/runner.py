#!/usr/bin/env python3

from __future__ import annotations

import hashlib
import importlib.metadata
import json
import os
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path


SOURCE_ROOT = Path("/opt/scout")
PROOF_ROOT = Path("/opt/scout-proof")
RETAINED_OUTPUT = SOURCE_ROOT / "generated/ecm_prep.json"
SOURCE_COMMIT = "72bcf419eb1cb37379f163563344b0ec61507fd3"
EXPECTED_OUTPUT_SHA256 = (
    "f7b428a2e66d90b4bfc4cf6272d85f52b1aea88229ff3c3fb53e33f536eccf50"
)
EXPECTED_OUTPUT_SIZE = 599004
SOURCE_FILES = {
    "LICENSE.md": "8ab3f859bd20bbd4ba4e74902ce7d9af94fb866facf856da4b32ed1a380cd2ef",
    "ecm_definitions/(C) 90.1 Lighting.json": (
        "f58f1dec2e3b4693339eae59a73cf018b637a5c34400ff6c62dae189cfe18baa"
    ),
    "ecm_definitions/ecm_schema.json": (
        "d28cdc4fd33c65a03a05c0c08e5e222b1eaf26bb081670c5e081e78f7d1b07ed"
    ),
    "inputs/metadata.json": (
        "00d7ce7728310c909cc78ba48c608d142e9d8537141064814eb149537efb54a8"
    ),
    "inputs/microsegments.json": (
        "4765aa366a61704ad60de1e9a8a094e5872c6e64e118eb8d2e5f3fe44024ff1c"
    ),
    "inputs/panel_shares.csv": (
        "cea26fef22a8d7a7e144ab5d7d2beb2e702723b3e8de827230b56cc69cb2ff33"
    ),
    "pyproject.toml": (
        "8d7129fa3f5122fed8d203eabbc89ce12592cb13737786ef8f5b61f447bcaf7f"
    ),
    "scout/ecm_prep.py": (
        "639134208b7368e7a9cafe9975b8205ed8fe4b864cce10368167557cd5831848"
    ),
    "scout/supporting_data/config_schema.yml": (
        "1e6eff0552e7f88ed276950eb77551089c283734bb45caf00174c8be1e9405c8"
    ),
}
DEPENDENCIES = {
    "PyYAML": "6.0.3",
    "Pygments": "2.20.0",
    "attrs": "26.1.0",
    "backoff": "2.2.1",
    "certifi": "2026.7.22",
    "charset-normalizer": "3.4.9",
    "contourpy": "1.3.3",
    "cycler": "0.12.1",
    "fonttools": "4.63.0",
    "idna": "3.18",
    "iniconfig": "2.3.0",
    "jsonschema-specifications": "2025.9.1",
    "jsonschema": "4.26.0",
    "kiwisolver": "1.5.0",
    "matplotlib": "3.11.1",
    "numpy-financial": "1.0.0",
    "numpy": "1.26.4",
    "orjson": "3.11.9",
    "packaging": "26.2",
    "pandas": "3.0.5",
    "pillow": "12.3.0",
    "pluggy": "1.6.0",
    "pyparsing": "3.3.2",
    "pytest": "9.1.1",
    "python-dateutil": "2.9.0.post0",
    "python-dotenv": "1.2.2",
    "referencing": "0.37.0",
    "requests": "2.34.2",
    "rpds-py": "2026.6.3",
    "scipy": "1.17.1",
    "six": "1.17.0",
    "typing_extensions": "4.16.0",
    "urllib3": "2.7.0",
    "xlsxwriter": "3.2.9",
}
REDUCTION_FRACTIONS = {
    "assembly": 0.3,
    "education": 0.2,
    "food sales": 0.0,
    "food service": 0.2,
    "health care": 0.1,
    "lodging": 0.2,
    "large office": 0.2,
    "small office": 0.2,
    "mercantile/service": 0.2,
    "warehouse": 0.3,
    "other": 0.2,
    "unspecified": 0.0,
}
ANNUAL_RESULTS = {
    "Technical potential": {
        "2026": (1186769465.363136, 934880631.317625),
        "2030": (1047885368.3346288, 825149603.0763531),
        "2050": (769096048.4047761, 603637695.9110348),
    },
    "Max adoption potential": {
        "2026": (1186769465.363136, 1155705148.020538),
        "2030": (1047885368.3346288, 915676794.9491652),
        "2050": (769096048.4047761, 603637695.9110348),
    },
}
COMMAND = [
    sys.executable,
    "scout/ecm_prep.py",
    "--ecm_files",
    "(C) 90.1 Lighting",
    "--alt_regions",
    "AIA",
    "--no_scnd_lgt",
]


def fail(message: str) -> None:
    raise RuntimeError(f"SCOUT_CONTAINER_PROOF_INVALID: {message}")


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for block in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def validate_source_and_runtime() -> None:
    if sys.version_info[:3] != (3, 12, 13):
        fail(f"Python version is {sys.version.split()[0]}")
    for relative_path, expected_sha256 in SOURCE_FILES.items():
        actual_sha256 = sha256_file(SOURCE_ROOT / relative_path)
        if actual_sha256 != expected_sha256:
            fail(f"{relative_path} checksum is {actual_sha256}")
    for distribution, expected_version in DEPENDENCIES.items():
        actual_version = importlib.metadata.version(distribution)
        if actual_version != expected_version:
            fail(
                f"{distribution} version is {actual_version}, "
                f"expected {expected_version}"
            )


def validate_output(path: Path) -> dict[str, object]:
    actual_sha256 = sha256_file(path)
    actual_size = path.stat().st_size
    if actual_sha256 != EXPECTED_OUTPUT_SHA256:
        fail(f"preparation output checksum is {actual_sha256}")
    if actual_size != EXPECTED_OUTPUT_SIZE:
        fail(f"preparation output size is {actual_size}")
    output = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(output, list) or len(output) != 1:
        fail("preparation output must contain exactly one measure")
    measure = output[0]
    expected_fields = {
        "name": "(C) 90.1 Lighting",
        "measure_type": "add-on",
        "climate_zone": [
            "AIA_CZ1",
            "AIA_CZ2",
            "AIA_CZ3",
            "AIA_CZ4",
            "AIA_CZ5",
        ],
        "structure_type": ["new", "existing"],
        "cost_units": "2020$/ft^2 floor",
        "product_lifetime": 10.0,
        "product_lifetime_units": "years",
    }
    for name, expected in expected_fields.items():
        if measure.get(name) != expected:
            fail(f"prepared {name} does not match the retained proof")
    if measure.get("energy_efficiency_units") != {
        "primary": "relative savings (constant)",
        "secondary": None,
    }:
        fail("prepared efficiency unit does not match the retained proof")
    if measure.get("energy_efficiency", {}).get("primary") != REDUCTION_FRACTIONS:
        fail("prepared reduction fractions do not match the retained proof")
    for adoption, years in ANNUAL_RESULTS.items():
        totals = measure["markets"][adoption]["master_mseg"]["energy"]["total"]
        for year, (expected_baseline, expected_efficient) in years.items():
            if totals["baseline"][year] != expected_baseline:
                fail(f"{adoption} {year} baseline energy changed")
            if totals["efficient"][year] != expected_efficient:
                fail(f"{adoption} {year} efficient energy changed")
    return {
        "outputSha256": actual_sha256,
        "outputSizeBytes": actual_size,
        "measureName": measure["name"],
        "smallOfficeReductionFraction": (
            measure["energy_efficiency"]["primary"]["small office"]
        ),
        "technicalPotential2026": {
            "baselineEnergyMmbtu": (
                measure["markets"]["Technical potential"]
                ["master_mseg"]["energy"]["total"]["baseline"]["2026"]
            ),
            "efficientEnergyMmbtu": (
                measure["markets"]["Technical potential"]
                ["master_mseg"]["energy"]["total"]["efficient"]["2026"]
            ),
        },
    }


def verify_retained() -> dict[str, object]:
    validate_source_and_runtime()
    evidence = validate_output(RETAINED_OUTPUT)
    return {
        "schemaVersion": 1,
        "status": "PASS",
        "mode": "retained-output",
        "sourceCommit": SOURCE_COMMIT,
        "python": sys.version.split()[0],
        "dependencyCount": len(DEPENDENCIES),
        "fixtureHashesVerified": True,
        "licenseHashVerified": True,
        **evidence,
    }


def rerun_preparation() -> dict[str, object]:
    validate_source_and_runtime()
    with tempfile.TemporaryDirectory(prefix="scout-proof-") as temporary:
        worktree = Path(temporary) / "scout"
        shutil.copytree(
            SOURCE_ROOT,
            worktree,
            ignore=shutil.ignore_patterns("__pycache__", "*.pyc"),
        )
        generated = worktree / "generated"
        shutil.rmtree(generated)
        (generated / "ecm_competition_data").mkdir(parents=True)
        (generated / "eff_fs_splt_data").mkdir(parents=True)
        environment = {
            **os.environ,
            "HOME": temporary,
            "MPLCONFIGDIR": str(Path(temporary) / "matplotlib"),
            "OPENBLAS_NUM_THREADS": "1",
            "PYTHONDONTWRITEBYTECODE": "1",
            "PYTHONHASHSEED": "0",
            "PYTHONPATH": str(worktree),
        }
        completed = subprocess.run(
            COMMAND,
            cwd=worktree,
            env=environment,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            timeout=1800,
            check=False,
        )
        if completed.returncode != 0:
            fail(
                "ecm_prep exited "
                f"{completed.returncode}: {completed.stderr[-4000:]}"
            )
        evidence = validate_output(generated / "ecm_prep.json")
    return {
        "schemaVersion": 1,
        "status": "PASS",
        "mode": "full-rerun",
        "sourceCommit": SOURCE_COMMIT,
        "command": COMMAND[1:],
        "networkRequirement": "run with Docker --network none",
        "python": sys.version.split()[0],
        "dependencyCount": len(DEPENDENCIES),
        "fixtureHashesVerified": True,
        "licenseHashVerified": True,
        **evidence,
    }


def main() -> None:
    mode = sys.argv[1] if len(sys.argv) > 1 else "verify"
    if mode == "verify":
        result = verify_retained()
    elif mode == "rerun":
        result = rerun_preparation()
    else:
        fail(f"unsupported mode {mode}")
    print(json.dumps(result, separators=(",", ":"), sort_keys=True))


if __name__ == "__main__":
    main()
