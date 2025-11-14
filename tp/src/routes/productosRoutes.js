import express from "express";
import { obtenerProductos } from "../controllers/productosControllers.js";

const router = express.Router();

router.get("/", obtenerProductos);

export default router;