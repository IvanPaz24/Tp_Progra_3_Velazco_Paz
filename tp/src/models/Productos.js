import { DataTypes } from "sequelize";
import  sequelize  from "../database/config.js";

export const Producto = sequelize.define("Producto", {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  imagen: {
    type: DataTypes.STRING, // guarda la ruta del archivo local
    allowNull: false,
  },
});