import express from "express";
import { crearTicket, generarPDF } from "../controllers/ticketController.js";

const router = express.Router();

router.post("/", crearTicket);
router.get("/pdf", generarPDF);

export default router;