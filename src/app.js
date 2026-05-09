const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const schoolRoutes = require("./routes/schoolRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "School Management API is running.",
    endpoints: {
      addSchool: "POST /addSchool",
      listSchools: "GET /listSchools?latitude=<value>&longitude=<value>",
    },
  });
});

app.use("/", schoolRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found.",
  });
});

app.use((error, req, res, next) => {
  console.error(error);

  res.status(500).json({
    message: "Internal server error.",
  });
});

module.exports = app;
