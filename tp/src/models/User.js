import { DataTypes } from "sequelize";
import sequelize from "../database/config.js";

export const User = sequelize.define("User", {
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  contraseña: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rol: {
    type: DataTypes.STRING,
    defaultValue: "admin"
  }
});


