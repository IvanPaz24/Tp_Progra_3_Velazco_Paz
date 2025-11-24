import { DataTypes } from "sequelize";
import sequelize from "../database/config.js";

export const VentaProducto = sequelize.define("VentaProducto", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ventaId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  productoId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  precioUnitario: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  subtotal: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  tableName: 'venta_productos'
});