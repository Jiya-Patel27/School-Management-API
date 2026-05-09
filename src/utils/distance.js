function toRadians(value) {
  return (value * Math.PI) / 180;
}

function calculateDistanceInKm(fromLatitude, fromLongitude, toLatitude, toLongitude) {
  const earthRadiusKm = 6371;

  const deltaLatitude = toRadians(toLatitude - fromLatitude);
  const deltaLongitude = toRadians(toLongitude - fromLongitude);

  const a =
    Math.sin(deltaLatitude / 2) * Math.sin(deltaLatitude / 2) +
    Math.cos(toRadians(fromLatitude)) *
      Math.cos(toRadians(toLatitude)) *
      Math.sin(deltaLongitude / 2) *
      Math.sin(deltaLongitude / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadiusKm * c;
}

module.exports = {
  calculateDistanceInKm,
};
