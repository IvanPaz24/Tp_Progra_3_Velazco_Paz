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

    await Producto.update(req.body, { where: { id } });

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

// ADMIN – ALTA LÓGICA
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

// ADMIN – CREAR PRODUCTO
export const crearProducto = async (req, res) => {
  try {
    const { nombre, precio, categoria } = req.body;

    // Validaciones
    if (!nombre || !precio || !categoria) {
      return res.render("agregar_producto", {
        error: "Todos los campos son obligatorios",
        mensaje: null
      });
    }

    // Verificar que haya imagen
    if (!req.file) {
      return res.render("agregar_producto", {
        error: "Debes subir una imagen",
        mensaje: null
      });
    }

    // RUTA CORRECTA DE LA IMAGEN EN SERVIDOR
    const rutaImagen = "/uploads/" + req.file.filename;

    await Producto.create({
      nombre,
      precio,
      categoria,
      imagen: rutaImagen,
      estado: "activo"
    });

    return res.render("agregar_producto", {
      mensaje: "Producto agregado correctamente",
      error: null
    });

  } catch (err) {
    console.error("Error al crear producto:", err);

    res.render("agregar_producto", {
      mensaje: null,
      error: "Error al guardar el producto"
    });
  }
};

export const obtenerProductoPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const producto = await Producto.findByPk(id);

    if (!producto) return res.send("Producto no encontrado");

    res.render("editar_producto", { producto, mensaje: null, error: null });

  } catch (err) {
    res.send("Error al cargar producto");
  }
};

export const editarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, precio, categoria } = req.body;

    const producto = await Producto.findByPk(id);
    if (!producto) return res.send("Producto no encontrado");

    // si subió una nueva imagen → reemplazar
    let nuevaImagen = producto.imagen;
    if (req.file) {
      nuevaImagen = "/img/productos/" + req.file.filename;
    }

    await producto.update({
      nombre,
      precio,
      categoria,
      imagen: nuevaImagen
    });

    res.redirect("/productos/dashboard");

  } catch (err) {
    res.send("Error al modificar el producto");
  }
};

