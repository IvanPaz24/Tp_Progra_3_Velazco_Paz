import { Producto } from "../models/Productos.js";


// CLIENTE – SOLO ACTIVOS

export const obtenerProductosActivos = async (req, res) => {
  try {
    const productos = await Producto.findAll({
      where: { estado: "activo" }
    });
    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ADMIN – TODOS LOS PRODUCTOS

export const obtenerTodosProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.render("index_dashboard", { productos });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ADMIN – MODIFICAR PRODUCTO

export const actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;

    await Producto.update(req.body, {
      where: { id }
    });

    res.redirect("/productos/dashboard");

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ADMIN – BAJA LÓGICA

export const bajaLogicaProducto = async (req, res) => {
  try {
    const { id } = req.params;

    await Producto.update(
      { estado: "inactivo" },
      { where: { id } }
    );

    res.redirect("/productos/dashboard");

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const activarProducto = async (req, res) => {
  try {
    const { id } = req.params;

    await Producto.update(
      { estado: "activo" },
      { where: { id } }
    );

    res.redirect("/productos/dashboard");

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
