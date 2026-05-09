const app = require("./app");
const env = require("./config/env");
const { ensureDatabaseSetup } = require("./config/db");

async function startServer() {
  try {
    await ensureDatabaseSetup();

    app.listen(env.port, () => {
      console.log(`Server is running on port ${env.port}`);
    });
  } catch (error) {
    console.error("Failed to start the application.");
    console.error(error);
    process.exit(1);
  }
}

startServer();
