import express from "express";
import sequelize from "./database/config.js";
import path from "path";
import { exec } from "child_process";
import { fileURLToPath } from "url";
import userRoutes from "./routes/user.routes.js";
import bcrypt from "bcrypt";

// Importar rutas
import productosRoutes from "./routes/productosRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 3000;

app.use(express.json());

// Motor de vistas
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Carpeta pública
app.use(express.static(path.join(__dirname, "public")));
app.use("/public", express.static(path.join(__dirname, "public")));

//   Rutas API
app.use("/productos", productosRoutes);
app.use("/ticket", ticketRoutes);
app.use("/usuario", userRoutes);

//   Rutas HTML 
// Home (cliente)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index_cliente.html"));
});


//   Sincronización DB
sequelize.sync({ force: true }).then(async () => {
  console.log("Base sincronizada");

  const { Producto } = await import("./models/Productos.js");

  await Producto.bulkCreate([
    { nombre: "Remera Roja", precio: 5000, categoria: "remera", imagen: "/img/remera roja.jpg" },
    { nombre: "Remera Azul", precio: 5000, categoria: "remera", imagen: "/img/remera azul.jpg" },
    { nombre: "Pantalón Negro", precio: 8000, categoria: "pantalon", imagen: "/img/pantalon negro.jpg" }
  ]);

   // Insertar administrador al iniciar la BD
  const { User } = await import("./models/User.js");

  const passwordEncriptada = await bcrypt.hash("admin123", 10);

  await User.create({
    correo: "admin@admin.com",
    contraseña: passwordEncriptada,
    rol: "admin"
  });

  console.log("Administrador por defecto creado");

});

//   Abrir navegador
function openUrl(url) {
  const command = process.platform === "win32"
    ? `start "" "${url}"`
    : process.platform === "darwin"
      ? `open "${url}"`
      : `xdg-open "${url}"`;

  exec(command);
}

//   Servidor
app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
  openUrl(`http://localhost:${PORT}`);
});
