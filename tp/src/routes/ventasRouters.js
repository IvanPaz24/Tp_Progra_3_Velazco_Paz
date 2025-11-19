import { Router } from "express";
import { crearVenta } from "../controllers/ventasController.js";

const router = Router();

router.post("/", crearVenta);

export default router;