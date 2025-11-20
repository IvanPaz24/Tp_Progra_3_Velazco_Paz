import { Router } from "express";
import upload from "../middlewares/uploadImg.js";
import {
  obtenerProductosActivos,
  obtenerTodosProductos,
  actualizarProducto,
  bajaLogicaProducto,
  activarProducto,
  crearProducto,
  obtenerProductoPorId,
  editarProducto
} from "../controllers/productosControllers.js";

const router = Router();

router.get("/", obtenerProductosActivos);
router.get("/dashboard", obtenerTodosProductos);

// Mostrar formulario de agregar
router.get("/agregar", (req, res) => {
  res.render("agregar_producto", { mensaje: null, error: null });
});

// Crear producto con subida de imagen
router.post("/", upload.single("imagen"), crearProducto);

// modificar producto
router.put("/:id", actualizarProducto);

// baja lógica
router.put("/:id/baja", bajaLogicaProducto);

// reactivar
router.put("/:id/alta", activarProducto);

// Ruta para ver el formulario de edición
router.get("/:id/editar", obtenerProductoPorId);

// Ruta para enviar los datos modificados
router.post("/:id/editar", upload.single("imagen"), editarProducto);

export default router;
