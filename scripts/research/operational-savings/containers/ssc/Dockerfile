# syntax=docker/dockerfile:1.7

ARG UBUNTU_IMAGE=ubuntu:24.04@sha256:4fbb8e6a8395de5a7550b33509421a2bafbc0aab6c06ba2cef9ebffbc7092d90

FROM --platform=$TARGETPLATFORM ${UBUNTU_IMAGE} AS ortools-release

ARG ORTOOLS_VERSION=9.14.6206
ARG ORTOOLS_ARCHIVE_SHA256=2f731a156cd9e4123d1433dec51a22ba74702d349457fe76c65bba0f1f7958e0

RUN apt-get update \
    && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
        ca-certificates \
        curl \
    && rm -rf /var/lib/apt/lists/*

RUN curl --fail --location --retry 5 \
        "https://github.com/google/or-tools/releases/download/v9.14/or-tools_aarch64_AlmaLinux-8.10_cpp_v${ORTOOLS_VERSION}.tar.gz" \
        --output /tmp/or-tools.tar.gz \
    && echo "${ORTOOLS_ARCHIVE_SHA256}  /tmp/or-tools.tar.gz" | sha256sum --check \
    && mkdir /opt/or-tools \
    && tar --extract --gzip --file /tmp/or-tools.tar.gz --directory /opt/or-tools --strip-components=1

FROM --platform=$TARGETPLATFORM ${UBUNTU_IMAGE} AS ssc-build

ARG BUILD_JOBS=4
ARG SSC_COMMIT=ba7a7968a115baa0c250597ce2381c7ffb27fbf2
ARG SSC_ARCHIVE_SHA256=00a3001c529c87b97c271bb75dd809c71003045ecadcedeb7b2b4d9cc9479631

RUN apt-get update \
    && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
        build-essential \
        ca-certificates \
        cmake \
        curl \
        ninja-build \
    && rm -rf /var/lib/apt/lists/*

COPY --from=ortools-release /opt/or-tools /opt/or-tools

ENV ORTOOLSDIR=/opt/or-tools

RUN curl --fail --location --retry 5 \
        "https://github.com/NatLabRockies/ssc/archive/${SSC_COMMIT}.tar.gz" \
        --output /tmp/ssc.tar.gz \
    && echo "${SSC_ARCHIVE_SHA256}  /tmp/ssc.tar.gz" | sha256sum --check \
    && mkdir /tmp/ssc \
    && tar --extract --gzip --file /tmp/ssc.tar.gz --directory /tmp/ssc --strip-components=1

RUN cmake \
        -S /tmp/ssc \
        -B /tmp/ssc-build \
        -G Ninja \
        -DCMAKE_BUILD_TYPE=Release \
        -DCMAKE_INCLUDE_PATH=/opt/or-tools/include \
        -DCMAKE_LIBRARY_PATH=/opt/or-tools/lib64 \
        "-DCMAKE_PREFIX_PATH=/opt/or-tools;/opt/or-tools/lib/cmake;/opt/or-tools/lib64/cmake" \
        -Dortools_DIR=/opt/or-tools/lib64/cmake/ortools \
        -DSAMAPI_EXPORT=ON \
        -DSAM_SKIP_TESTS=ON \
        -DSAM_SKIP_TOOLS=ON \
    && cmake --build /tmp/ssc-build --target ssc --parallel "${BUILD_JOBS}"

COPY runner.cpp /tmp/runner.cpp

RUN c++ \
        -std=c++17 \
        -O2 \
        -DSSC_SOURCE_COMMIT=\"${SSC_COMMIT}\" \
        -I/tmp/ssc/test \
        -I/tmp/ssc/ssc \
        -I/tmp/ssc/shared \
        /tmp/runner.cpp \
        -L/tmp/ssc-build/ssc \
        -Wl,-rpath,/opt/ssc/lib \
        -lssc \
        -o /tmp/ssc-runner

FROM --platform=$TARGETPLATFORM ${UBUNTU_IMAGE} AS runtime

ARG SSC_COMMIT=ba7a7968a115baa0c250597ce2381c7ffb27fbf2

LABEL org.opencontainers.image.title="Pinned SSC research runner" \
      org.opencontainers.image.description="Deterministic offline smoke calculations using official SSC fixtures" \
      org.opencontainers.image.source="https://github.com/NatLabRockies/ssc" \
      org.opencontainers.image.revision="${SSC_COMMIT}" \
      org.opencontainers.image.version="308" \
      org.opencontainers.image.licenses="BSD-3-Clause"

RUN apt-get update \
    && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
        libgomp1 \
        libstdc++6 \
    && rm -rf /var/lib/apt/lists/*

COPY --from=ortools-release /opt/or-tools/lib /opt/or-tools/lib
COPY --from=ortools-release /opt/or-tools/lib64 /opt/or-tools/lib64
COPY --from=ssc-build /tmp/ssc-build/ssc/libssc.so /opt/ssc/lib/libssc.so
COPY --from=ssc-build /tmp/ssc-runner /usr/local/bin/ssc-runner
COPY --from=ssc-build /tmp/ssc/LICENSE /opt/ssc/LICENSE
COPY --from=ssc-build ["/tmp/ssc/test/input_cases/pvsamv1_data/USA AZ Phoenix (TMY2).csv", "/opt/ssc-source/test/input_cases/pvsamv1_data/USA AZ Phoenix (TMY2).csv"]
COPY --from=ssc-build /tmp/ssc/test/input_cases/swh_residential_data /opt/ssc-source/test/input_cases/swh_residential_data
COPY --from=ssc-build /tmp/ssc/test/input_docs/wind.srw /opt/ssc-source/test/input_docs/wind.srw

ENV LD_LIBRARY_PATH=/opt/ssc/lib:/opt/or-tools/lib64:/opt/or-tools/lib \
    SSCDIR=/opt/ssc-source

USER 65532:65532
WORKDIR /work

ENTRYPOINT ["/usr/local/bin/ssc-runner"]
