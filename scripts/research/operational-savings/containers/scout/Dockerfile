# syntax=docker/dockerfile:1.7

ARG PYTHON_IMAGE=python:3.12.13-slim-bookworm@sha256:d50fb7611f86d04a3b0471b46d7557818d88983fc3136726336b2a4c657aa30b

FROM --platform=$TARGETPLATFORM ${PYTHON_IMAGE} AS build

ARG SCOUT_COMMIT=72bcf419eb1cb37379f163563344b0ec61507fd3
ARG SCOUT_ARCHIVE_SHA256=07abd78a5e1c778fa3fa46e45f2b2aaef3c11089c2b2d99bc5ea0db928457822
ARG SCOUT_OUTPUT_SHA256=f7b428a2e66d90b4bfc4cf6272d85f52b1aea88229ff3c3fb53e33f536eccf50

ENV MPLCONFIGDIR=/tmp/matplotlib \
    OPENBLAS_NUM_THREADS=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONHASHSEED=0 \
    PYTHONPATH=/opt/scout

RUN apt-get update \
    && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
        ca-certificates \
        curl \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.lock /opt/scout-proof/requirements.lock

RUN python -m pip install \
        --no-cache-dir \
        --only-binary=:all: \
        --require-hashes \
        --requirement /opt/scout-proof/requirements.lock \
    && python -m pip check \
    && python -m pip freeze | LC_ALL=C sort \
        > /opt/scout-proof/dependencies.freeze

RUN curl --fail --location --retry 5 \
        "https://github.com/trynthink/scout/archive/${SCOUT_COMMIT}.tar.gz" \
        --output /tmp/scout.tar.gz \
    && echo "${SCOUT_ARCHIVE_SHA256}  /tmp/scout.tar.gz" \
        | sha256sum --check - \
    && mkdir -p /opt/scout \
    && tar --extract --gzip --file /tmp/scout.tar.gz \
        --directory /opt/scout --strip-components=1 \
    && rm /tmp/scout.tar.gz

COPY runner.py /opt/scout-proof/runner.py

WORKDIR /opt/scout

RUN python scout/ecm_prep.py \
        --ecm_files "(C) 90.1 Lighting" \
        --alt_regions AIA \
        --no_scnd_lgt \
    && echo "${SCOUT_OUTPUT_SHA256}  generated/ecm_prep.json" \
        | sha256sum --check - \
    && cp generated/ecm_prep.json /tmp/ecm_prep.json \
    && rm -rf generated \
    && mkdir -p generated/ecm_competition_data generated/eff_fs_splt_data \
    && cp /tmp/ecm_prep.json generated/ecm_prep.json \
    && rm /tmp/ecm_prep.json \
    && python /opt/scout-proof/runner.py verify

FROM --platform=$TARGETPLATFORM ${PYTHON_IMAGE}

ARG SCOUT_COMMIT=72bcf419eb1cb37379f163563344b0ec61507fd3

LABEL org.opencontainers.image.title="Pinned Scout research runner" \
      org.opencontainers.image.description="Deterministic offline Scout commercial lighting ECM preparation" \
      org.opencontainers.image.source="https://github.com/trynthink/scout" \
      org.opencontainers.image.revision="${SCOUT_COMMIT}" \
      org.opencontainers.image.licenses="Apache-2.0 OR BSD-3-Clause"

ENV HOME=/tmp \
    MPLCONFIGDIR=/tmp/matplotlib \
    OPENBLAS_NUM_THREADS=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONHASHSEED=0 \
    PYTHONPATH=/opt/scout

COPY --from=build /usr/local /usr/local
COPY --from=build /opt/scout /opt/scout
COPY --from=build /opt/scout-proof /opt/scout-proof

USER 65532:65532
WORKDIR /work

ENTRYPOINT ["python", "/opt/scout-proof/runner.py"]
CMD ["verify"]
