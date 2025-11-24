import { Producto } from './Productos.js';
import { Venta } from './Ventas.js';
import { VentaProducto } from './VentaProducto.js';

// Relación Muchos a Muchos
Producto.belongsToMany(Venta, {
  through: VentaProducto,
  foreignKey: 'productoId',
  otherKey: 'ventaId'
});

Venta.belongsToMany(Producto, {
  through: VentaProducto,
  foreignKey: 'ventaId',
  otherKey: 'productoId'
});

export { Producto, Venta, VentaProducto };