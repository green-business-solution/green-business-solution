ARG JULIA_IMAGE=julia:1.10.4-bookworm@sha256:754e3f19a84522e7b890e173d926048a6d08df59e096628a385a719684e9f52f

FROM ${JULIA_IMAGE} AS build

ARG REOPT_COMMIT=f952cabdf3e60f6e88eef80bb7bc9e7e24bac643
ARG REOPT_ARCHIVE_SHA256=9b0068246fc2ed73c1834302a03f6e8d3ff7003827d9b5032a6a5a5257ceeb70
ARG HIGHS_VERSION=1.12.0

ENV JULIA_DEPOT_PATH=/opt/julia-depot

RUN apt-get update \
    && apt-get install --yes --no-install-recommends ca-certificates curl \
    && rm -rf /var/lib/apt/lists/*

RUN curl --fail --location --retry 5 \
      "https://github.com/NatLabRockies/REopt.jl/archive/${REOPT_COMMIT}.tar.gz" \
      --output /tmp/reopt.tar.gz \
    && echo "${REOPT_ARCHIVE_SHA256}  /tmp/reopt.tar.gz" | sha256sum --check - \
    && mkdir -p /opt/reopt \
    && tar --extract --gzip --file /tmp/reopt.tar.gz \
      --strip-components=1 --directory /opt/reopt \
    && rm /tmp/reopt.tar.gz \
    && cp /opt/reopt/Project.toml /opt/reopt/Project.upstream.toml \
    && cp /opt/reopt/Manifest.toml /opt/reopt/Manifest.upstream.toml

RUN julia --startup-file=no --history-file=no --project=/opt/reopt \
      -e "using Pkg; Pkg.add(PackageSpec(name=\"HiGHS\", version=\"${HIGHS_VERSION}\")); Pkg.instantiate(); Pkg.precompile()"

FROM ${JULIA_IMAGE}

ENV JULIA_DEPOT_PATH=/tmp/julia-depot:/opt/julia-depot \
    JULIA_PKG_OFFLINE=true \
    JULIA_NUM_THREADS=1 \
    OPENBLAS_NUM_THREADS=1

COPY --from=build /opt/julia-depot /opt/julia-depot
COPY --from=build /opt/reopt /opt/reopt
COPY runner.jl /opt/reopt-proof/runner.jl
COPY retrofi-storage-spec.json /opt/reopt-proof/retrofi-storage-spec.json

RUN chmod -R a+rX /opt/reopt-proof

USER 65532:65532

ENTRYPOINT ["julia", "--startup-file=no", "--history-file=no", "--project=/opt/reopt", "/opt/reopt-proof/runner.jl"]
