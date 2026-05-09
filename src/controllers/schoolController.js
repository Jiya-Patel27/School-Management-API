const { getPool } = require("../config/db");
const { calculateDistanceInKm } = require("../utils/distance");
const {
  validateAddSchoolPayload,
  validateListSchoolQuery,
} = require("../utils/validators");

async function addSchool(req, res, next) {
  try {
    const { errors, data } = validateAddSchoolPayload(req.body);

    if (errors.length > 0) {
      return res.status(400).json({
        message: "Validation failed.",
        errors,
      });
    }

    const pool = getPool();
    const [result] = await pool.execute(
      "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)",
      [data.name, data.address, data.latitude, data.longitude]
    );

    return res.status(201).json({
      message: "School added successfully.",
      data: {
        id: result.insertId,
        ...data,
      },
    });
  } catch (error) {
    return next(error);
  }
}

async function listSchools(req, res, next) {
  try {
    const { errors, data } = validateListSchoolQuery(req.query);

    if (errors.length > 0) {
      return res.status(400).json({
        message: "Validation failed.",
        errors,
      });
    }

    const pool = getPool();
    const [schools] = await pool.query(
      "SELECT id, name, address, latitude, longitude FROM schools"
    );

    const sortedSchools = schools
      .map((school) => {
        const distanceKm = calculateDistanceInKm(
          data.latitude,
          data.longitude,
          school.latitude,
          school.longitude
        );

        return {
          ...school,
          distanceKm: Number(distanceKm.toFixed(3)),
        };
      })
      .sort((firstSchool, secondSchool) => firstSchool.distanceKm - secondSchool.distanceKm);

    return res.status(200).json({
      message: "Schools fetched successfully.",
      userLocation: data,
      count: sortedSchools.length,
      data: sortedSchools,
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  addSchool,
  listSchools,
};
