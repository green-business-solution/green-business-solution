# syntax=docker/dockerfile:1.7

ARG UBUNTU_IMAGE=ubuntu:24.04@sha256:4fbb8e6a8395de5a7550b33509421a2bafbc0aab6c06ba2cef9ebffbc7092d90
ARG GCC_IMAGE=gcc:13.3.0-bookworm@sha256:1d71f0f3450214bef38fe09e6f610fb6cca90cf97b43f4ce845bfc32a4168818

FROM --platform=$TARGETPLATFORM ${GCC_IMAGE} AS build

ARG MEASUR_ARCHIVE_SHA256=8d0b14a6d86454b7530b1c94290f0e1dc24b72f8fb8ed9d551c9d525c0fd6fb4
ARG MEASUR_COMMIT=bdc33b837d39e3b30d2ad802cde9f49ec5df1e6b

COPY .build/amo-tools-suite.tar /tmp/amo-tools-suite.tar

RUN echo "${MEASUR_ARCHIVE_SHA256}  /tmp/amo-tools-suite.tar" \
      | sha256sum --check - \
    && mkdir -p /build/amo-tools-suite \
    && tar --extract \
      --file /tmp/amo-tools-suite.tar \
      --directory /build/amo-tools-suite \
    && rm /tmp/amo-tools-suite.tar \
    && test "$(sha256sum /build/amo-tools-suite/LICENSE.txt | cut -d' ' -f1)" \
      = "7372b9cff1cab763899bf6c4516b44163f8442fd38d0a3786e3ceafc0e81df62"

COPY .build/compressed-air.cpp /build/harness/compressed-air.cpp
COPY .build/equipment.cpp /build/harness/equipment.cpp

WORKDIR /build/amo-tools-suite

RUN mkdir -p /build/output \
    && g++ \
      -std=c++17 \
      -O2 \
      -ffile-prefix-map=/build/amo-tools-suite=/usr/src/amo-tools-suite \
      -ffile-prefix-map=/build/harness=/usr/src/retrofi-measur-harness \
      -static-libgcc \
      -static-libstdc++ \
      -Wl,--build-id=none \
      -I include \
      /build/harness/compressed-air.cpp \
      src/calculator/util/CompressedAirLeakSurvey.cpp \
      src/calculator/util/CompressedAirReduction.cpp \
      -o /build/output/measur-compressed-air

RUN g++ \
      -std=c++17 \
      -O2 \
      -ffile-prefix-map=/build/amo-tools-suite=/usr/src/amo-tools-suite \
      -ffile-prefix-map=/build/harness=/usr/src/retrofi-measur-harness \
      -static-libgcc \
      -static-libstdc++ \
      -Wl,--build-id=none \
      -I include \
      /build/harness/equipment.cpp \
      src/results/Results.cpp \
      src/calculator/motor/EstimateFLA.cpp \
      src/calculator/motor/MotorCurrent.cpp \
      src/calculator/motor/MotorEfficiency.cpp \
      src/calculator/motor/MotorPower.cpp \
      src/calculator/motor/MotorPowerFactor.cpp \
      src/calculator/motor/MotorShaftPower.cpp \
      src/calculator/motor/OptimalMotorPower.cpp \
      src/calculator/motor/OptimalMotorShaftPower.cpp \
      src/calculator/motor/OptimalMotorSize.cpp \
      src/calculator/motor/Poles.cpp \
      src/calculator/pump/MoverEfficiency.cpp \
      src/calculator/pump/OptimalDeviationFactor.cpp \
      src/calculator/pump/OptimalPrePumpEff.cpp \
      src/calculator/pump/OptimalPumpEfficiency.cpp \
      src/calculator/pump/OptimalPumpShaftPower.cpp \
      src/calculator/pump/OptimalSpecificSpeed.cpp \
      src/calculator/pump/OptimalSpecificSpeedCorrection.cpp \
      src/calculator/pump/PumpShaftPower.cpp \
      src/calculator/util/AnnualCost.cpp \
      src/calculator/util/AnnualEnergy.cpp \
      src/calculator/util/CurveFitVal.cpp \
      -o /build/output/measur-equipment

RUN /build/output/measur-compressed-air \
      8640 0.12 0.1 130 0.4 0.16 1 \
      > /tmp/compressed-air-proof.json \
    && /build/output/measur-equipment \
      60 1600 0 150 0.25 -1 3 0.95 \
      6 0.382 1780 1 1 1 1 0 1 \
      60 200 1780 3 0.95 460 227.29 0 \
      1000 277 0 150 125.857 480 8760 0.06 \
      1180 0.07024 0 1 60 600 1180 1 0.96 \
      460 683.2505707137 1 460 460 660 129691 \
      -16.36 1.1 0.988 0 0 0.595398315 8760 0.06 \
      59.5119 81.6495 87.98386 76 1 0 2 \
      > /tmp/equipment-proof.json \
    && test -s /tmp/compressed-air-proof.json \
    && test -s /tmp/equipment-proof.json

FROM --platform=$TARGETPLATFORM ${UBUNTU_IMAGE}

ARG MEASUR_COMMIT=bdc33b837d39e3b30d2ad802cde9f49ec5df1e6b

LABEL org.opencontainers.image.title="RetroFi DOE MEASUR research proof" \
      org.opencontainers.image.description="Offline research-only native DOE MEASUR module proof runner" \
      org.opencontainers.image.source="https://github.com/ORNL-AMO/AMO-Tools-Suite" \
      org.opencontainers.image.revision="${MEASUR_COMMIT}" \
      org.opencontainers.image.version="git-bdc33b8" \
      org.opencontainers.image.licenses="LicenseRef-ORNL-AMO-Permissive"

ENV MEASUR_SOURCE_COMMIT=${MEASUR_COMMIT}

COPY --from=build \
  /build/output/measur-compressed-air \
  /usr/local/libexec/measur-compressed-air
COPY --from=build \
  /build/output/measur-equipment \
  /usr/local/libexec/measur-equipment
COPY --from=build \
  /build/amo-tools-suite/LICENSE.txt \
  /opt/measur/LICENSE.txt
COPY entrypoint.sh /usr/local/bin/measur-proof

RUN chmod 0555 \
      /usr/local/bin/measur-proof \
      /usr/local/libexec/measur-compressed-air \
      /usr/local/libexec/measur-equipment \
    && chmod 0444 /opt/measur/LICENSE.txt

USER 65532:65532

ENTRYPOINT ["/usr/local/bin/measur-proof"]
CMD ["compressed-air", "8640", "0.12", "0.1", "130", "0.4", "0.16", "1"]
