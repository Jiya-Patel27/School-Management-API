const dotenv = require("dotenv");

dotenv.config();

const env = {
  port: Number(process.env.PORT) || 3000,
  db: {
    host: process.env.DB_HOST || "127.0.0.1",
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "school_management",
  },
};

module.exports = env;
