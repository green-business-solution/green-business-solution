const energyDataIdPattern = /^energy_[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function cleanText(value) {
  return typeof value === "string" ? value.trim() : "";
}

export function cleanEnergyDataFileName(value) {
  return cleanText(value).replace(/[^\w.\-]+/g, "_").slice(0, 160);
}

export function isEnergyDataUploadId(value) {
  return energyDataIdPattern.test(cleanText(value));
}

export function buildEnergyDataS3Key({ userId, energyDataId, fileName }) {
  return `energy-data/${cleanText(userId)}/${cleanText(energyDataId)}/${cleanEnergyDataFileName(fileName)}`;
}

export function validateEnergyDataRegistrationKey({ userId, energyDataId, fileName, s3Key }) {
  const normalizedS3Key = cleanText(s3Key);
  const expectedS3Key = buildEnergyDataS3Key({ userId, energyDataId, fileName });

  if (!isEnergyDataUploadId(energyDataId)) {
    return {
      ok: false,
      expectedS3Key,
      reason: "invalid_energy_data_id"
    };
  }

  if (normalizedS3Key !== expectedS3Key) {
    return {
      ok: false,
      expectedS3Key,
      reason: "s3_key_mismatch"
    };
  }

  return {
    ok: true,
    expectedS3Key,
    reason: null
  };
}
