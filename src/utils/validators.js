function toNumber(value) {
  if (typeof value === "number") {
    return value;
  }

  if (typeof value === "string" && value.trim() !== "") {
    return Number(value);
  }

  return Number.NaN;
}

function validateCoordinates(latitude, longitude) {
  const parsedLatitude = toNumber(latitude);
  const parsedLongitude = toNumber(longitude);
  const errors = [];

  if (!Number.isFinite(parsedLatitude) || parsedLatitude < -90 || parsedLatitude > 90) {
    errors.push("Latitude must be a valid number between -90 and 90.");
  }

  if (
    !Number.isFinite(parsedLongitude) ||
    parsedLongitude < -180 ||
    parsedLongitude > 180
  ) {
    errors.push("Longitude must be a valid number between -180 and 180.");
  }

  return {
    errors,
    latitude: parsedLatitude,
    longitude: parsedLongitude,
  };
}

function validateAddSchoolPayload(payload) {
  const errors = [];
  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const address = typeof payload.address === "string" ? payload.address.trim() : "";
  const coordinates = validateCoordinates(payload.latitude, payload.longitude);

  if (!name) {
    errors.push("Name is required.");
  }

  if (!address) {
    errors.push("Address is required.");
  }

  errors.push(...coordinates.errors);

  return {
    errors,
    data: {
      name,
      address,
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
    },
  };
}

function validateListSchoolQuery(query) {
  const coordinates = validateCoordinates(query.latitude, query.longitude);

  return {
    errors: coordinates.errors,
    data: {
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
    },
  };
}

module.exports = {
  validateAddSchoolPayload,
  validateListSchoolQuery,
};
