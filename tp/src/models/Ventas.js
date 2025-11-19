import { DataTypes } from "sequelize";
import sequelize from "../database/config.js";

export const Venta = sequelize.define("Venta", {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});
