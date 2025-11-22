import sequelize from "./config.js";

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Conexión exitosa con la base de datos MySQL.");
  } catch (error) {
    console.error("Error al conectar con MySQL:", error.message);
  } finally {
    await sequelize.close();
  }
}

testConnection();
