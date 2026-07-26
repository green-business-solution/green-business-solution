const RADIANS = Math.PI / 180;

function dayOfYear(date) {
  return Math.floor(
    (
      Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) -
      Date.UTC(date.getUTCFullYear(), 0, 0)
    ) / 86_400_000
  );
}

function solarParameters(date) {
  const days = (Date.UTC(date.getUTCFullYear() + 1, 0, 1) -
    Date.UTC(date.getUTCFullYear(), 0, 1)) / 86_400_000;
  const gamma = (2 * Math.PI / days) * (dayOfYear(date) - 1);
  const equationOfTime =
    229.18 *
    (
      0.000075 +
      0.001868 * Math.cos(gamma) -
      0.032077 * Math.sin(gamma) -
      0.014615 * Math.cos(2 * gamma) -
      0.040849 * Math.sin(2 * gamma)
    );
  const declination =
    0.006918 -
    0.399912 * Math.cos(gamma) +
    0.070257 * Math.sin(gamma) -
    0.006758 * Math.cos(2 * gamma) +
    0.000907 * Math.sin(2 * gamma) -
    0.002697 * Math.cos(3 * gamma) +
    0.00148 * Math.sin(3 * gamma);
  return { equationOfTime, declination };
}

export function solarEventsUtc({
  date,
  latitude,
  longitude,
  zenithDegrees = 90.833
}) {
  if (Math.abs(latitude) > 90 || Math.abs(longitude) > 180) {
    throw new Error("INVALID_COORDINATES");
  }
  const { equationOfTime, declination } = solarParameters(date);
  const latitudeRadians = latitude * RADIANS;
  const cosineHourAngle =
    (
      Math.cos(zenithDegrees * RADIANS) /
      (Math.cos(latitudeRadians) * Math.cos(declination))
    ) -
    Math.tan(latitudeRadians) * Math.tan(declination);
  if (cosineHourAngle < -1 || cosineHourAngle > 1) {
    return {
      sunriseUtcMinutes: null,
      sunsetUtcMinutes: null,
      solarNoonUtcMinutes: 720 - 4 * longitude - equationOfTime
    };
  }
  const hourAngleDegrees = Math.acos(cosineHourAngle) / RADIANS;
  const solarNoonUtcMinutes = 720 - 4 * longitude - equationOfTime;
  return {
    sunriseUtcMinutes: solarNoonUtcMinutes - 4 * hourAngleDegrees,
    sunsetUtcMinutes: solarNoonUtcMinutes + 4 * hourAngleDegrees,
    solarNoonUtcMinutes
  };
}

export function minutesToClock(totalMinutes) {
  const normalized = ((Math.round(totalMinutes) % 1440) + 1440) % 1440;
  return `${String(Math.floor(normalized / 60)).padStart(2, "0")}:${String(
    normalized % 60
  ).padStart(2, "0")}`;
}
