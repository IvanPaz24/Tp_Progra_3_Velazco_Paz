import jwt from "jsonwebtoken";

export function validarToken(req, res, next) {

try {
    const header = req.headers.authorization;

    if (!header) {
      return res.status(401).json({ mensaje: "Token no enviado" });
    }

    const token = header.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();

  } catch (err) {
    // Bloqueo si expiró o si es inválido
    return res.status(401).json({ mensaje: "Token inválido o expirado" });
  }
}