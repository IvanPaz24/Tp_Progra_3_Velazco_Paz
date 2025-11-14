import { Router } from "express";
import { crearAdmin, loginAdmin } from "../controllers/user.controller.js";

const router = Router();

router.post("/admin/create", crearAdmin);
router.post("/admin/login", loginAdmin);

export default router;
