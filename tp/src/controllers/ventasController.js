import { Venta } from "../models/Ventas.js";
import { VentaProducto } from "../models/VentaProducto.js";
import { Producto } from "../models/Productos.js";

export const crearVenta = async (req, res) => {
  try {
    const { nombre, total, productos } = req.body;

    //venta 
    const nuevaVenta = await Venta.create({ 
      nombre, 
      total,
      fecha: new Date()
    });


    //registros en la tabla intermedia
    const productosVenta = productos.map(producto => ({
      ventaId: nuevaVenta.id,
      productoId: producto.id,
      cantidad: producto.cantidad,
      precioUnitario: producto.precio,
      subtotal: producto.precio * producto.cantidad
    }));

  
    await VentaProducto.bulkCreate(productosVenta);

    res.json({ 
      success: true, 
      ventaId: nuevaVenta.id,
      message: "Venta registrada exitosamente" 
    });

  } catch (err) {
    console.error('Error al registrar la venta:', err);
    res.status(500).json({ 
      success: false,
      error: "Error al registrar la venta",
      details: err.message 
    });
  }
};
