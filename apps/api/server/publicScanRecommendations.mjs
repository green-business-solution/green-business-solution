function cleanText(value) {
  return String(value ?? "").trim();
}

function httpError(message, status) {
  const error = new Error(message);
  error.status = status;
  return error;
}

export async function resolvePublicScanRecommendationContext(
  input,
  { getUserRecord, verifyEnergyUploadSession }
) {
  const userId = cleanText(input?.userId);
  const uploadToken = cleanText(input?.uploadToken);

  if (!userId || !uploadToken) {
    throw httpError("A valid free-scan session is required to load recommendations.", 400);
  }

  const intake = await verifyEnergyUploadSession(userId, uploadToken);
  const user = await getUserRecord(userId);

  if (!user || user.role !== "client" || user.status !== "active") {
    throw httpError("The client profile for this free-scan session was not found.", 404);
  }

  return { intake, user };
}

export function sanitizePublicScanRecommendationPayload(payload) {
  if (!payload?.intake || typeof payload.intake !== "object") {
    return payload;
  }

  const { energyDataUploadSession: _privateSession, ...publicIntake } = payload.intake;
  return {
    ...payload,
    intake: publicIntake
  };
}
