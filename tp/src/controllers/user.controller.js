import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// crear admin
export const crearAdmin = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    const hash = await bcrypt.hash(contraseña, 10);

    const admin = await User.create({
      correo,
      contraseña: hash,
      rol: "admin"
    });

    res.json({ mensaje: "Administrador creado", admin });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// login admin
export const loginAdmin = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    const user = await User.findOne({ where: { correo } });

    if (!user) {
      return res.status(400).json({ mensaje: "Correo incorrecto" });
    }

    const coincide = await bcrypt.compare(contraseña, user.contraseña);

    if (!coincide) {
      return res.status(400).json({ mensaje: "Contraseña incorrecta" });
    }
    
    // localStorage.setItem("token", token);
    const token = jwt.sign({ id: user.id, rol: user.rol }, process.env.JWT_SECRET, {
      expiresIn: "3m",
    });
    
    // res.json({ mensaje: "Login exitoso", token });
    // localStorage.setItem("token", token); 
    return res.json({
      mensaje: "Acceso permitido",
      token
    });
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
