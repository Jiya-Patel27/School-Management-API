const mysql = require("mysql2/promise");
const env = require("./env");

let pool;

async function ensureDatabaseSetup() {
  const bootstrapConnection = await mysql.createConnection({
    host: env.db.host,
    port: env.db.port,
    user: env.db.user,
    password: env.db.password,
  });

  await bootstrapConnection.query(
    `CREATE DATABASE IF NOT EXISTS \`${env.db.database}\``
  );

  await bootstrapConnection.end();

  pool = mysql.createPool({
    host: env.db.host,
    port: env.db.port,
    user: env.db.user,
    password: env.db.password,
    database: env.db.database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  await pool.query(`
    CREATE TABLE IF NOT EXISTS schools (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      address VARCHAR(500) NOT NULL,
      latitude FLOAT NOT NULL,
      longitude FLOAT NOT NULL
    )
  `);

  return pool;
}

function getPool() {
  if (!pool) {
    throw new Error("Database pool is not initialized.");
  }

  return pool;
}

module.exports = {
  ensureDatabaseSetup,
  getPool,
};
