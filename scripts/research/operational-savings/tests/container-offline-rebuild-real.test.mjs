import { expect, test } from "vitest";

import {
  inspectOfflineRebuilds,
  loadOfflineRebuildPlan
} from "../containers/offline-rebuild.mjs";

test(
  "classifies the retained container rebuild inputs without inventing missing dependencies",
  async () => {
    const plan = await loadOfflineRebuildPlan();
    const reports = await inspectOfflineRebuilds({
      plan,
      checkBaseImage: false
    });
    const byModel = Object.fromEntries(
      reports.map((report) => [report.modelId, report])
    );

    expect(byModel.reopt).toMatchObject({
      contextStatus:
        "BLOCKED_MISSING_EXACT_DEPENDENCY_ARTIFACT",
      artifacts: [
        {
          artifactId: "reopt-source",
          status: "VERIFIED_EXACT_LOCAL_INPUT"
        },
        {
          artifactId: "reopt-resolved-julia-environment",
          status: "MISSING_PINNED_IDENTITY"
        }
      ]
    });
    expect(byModel.ssc).toMatchObject({
      contextStatus:
        "BLOCKED_MISSING_EXACT_DEPENDENCY_ARTIFACT",
      artifacts: [
        {
          artifactId: "ssc-source",
          status: "VERIFIED_EXACT_LOCAL_INPUT"
        },
        {
          artifactId: "or-tools-linux-arm64-release",
          status: "VERIFIED_EXACT_LOCAL_INPUT"
        },
        {
          artifactId: "ssc-ubuntu-build-debs",
          status: "MISSING_PINNED_IDENTITY"
        },
        {
          artifactId: "ssc-ubuntu-runtime-debs",
          status: "MISSING_PINNED_IDENTITY"
        }
      ]
    });
    expect(byModel.scout).toMatchObject({
      contextStatus:
        "VERIFIED_EXACT_CONTEXT_INPUTS_READY",
      offlineBuildStatus:
        "BLOCKED_MISSING_AWS_RESTORED_IMAGE_DEPENDENCY",
      wheelhouse: {
        status: "VERIFIED_EXACT_LOCKED_WHEELHOUSE",
        expectedPackageCount: 34,
        actualPackageCount: 34,
        missingIdentities: []
      },
      imageDependencies: [
        {
          dependencyId:
            "python-3.12.13-slim-bookworm-linux-arm64",
          durableEvidenceReady: false
        }
      ]
    });
    expect(byModel.measur).toMatchObject({
      contextStatus:
        "BLOCKED_PROSPECTIVE_WORKFLOW_NOT_IMPLEMENTED",
      offlineBuildStatus:
        "BLOCKED_PROSPECTIVE_WORKFLOW_NOT_IMPLEMENTED",
      imageDependencies: [
        {
          dependencyId:
            "gcc-13.3.0-bookworm-linux-arm64",
          durableEvidenceReady: false
        },
        {
          dependencyId: "ubuntu-24.04-linux-arm64",
          durableEvidenceReady: false
        }
      ]
    });
  },
  30_000
);
