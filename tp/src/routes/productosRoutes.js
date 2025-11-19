import { Router } from "express";
import {
  obtenerProductosActivos,
  obtenerTodosProductos,
  actualizarProducto,
  bajaLogicaProducto,
  activarProducto
} from "../controllers/productosControllers.js";

const router = Router();

router.get("/", obtenerProductosActivos);

router.get("/dashboard", obtenerTodosProductos);

router.put("/:id", actualizarProducto);

router.put("/:id/baja", bajaLogicaProducto);

router.put("/:id/alta", activarProducto);


export default router;
