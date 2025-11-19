import { Venta } from "../models/Ventas.js";

export const crearVenta = async (req, res) => {
  try {
    const { nombre, total } = req.body;

    await Venta.create({ nombre, total });

    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: "Error al registrar la venta" });
  }
};