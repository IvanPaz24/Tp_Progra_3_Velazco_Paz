import { Producto } from "../models/Productos.js";

export const obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener productos" });
  }
};