import { Router } from "express";
import { crearVenta} from "../controllers/ventasController.js";

const router = Router();

router.post("/", crearVenta);
// router.get("/", obtenerVentas);

export default router;