import express from "express";
import sequelize from "./database/config.js";
import path from "path";
import { exec } from "child_process";
import { fileURLToPath } from "url";
import userRoutes from "./routes/user.routes.js";
import bcrypt from "bcrypt";
import methodOverride from "method-override";

// Importar rutas
import productosRoutes from "./routes/productosRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import ventasRoutes from "./routes/ventasRouters.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Motor de vistas
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Carpeta pública
app.use(express.static(path.join(__dirname, "public")));
app.use("/public", express.static(path.join(__dirname, "public")));
// carpeta uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/img/productos", express.static(path.join(__dirname, "uploads")));



//   Rutas API

app.use("/productos", productosRoutes);
app.use("/ticket", ticketRoutes);
app.use("/usuario", userRoutes);
app.use("/ventas", ventasRoutes);


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
    // Remeras
    { nombre: "Remera Roja", precio: 5000, categoria: "remera", imagen: "/img/remera roja.jpg" },
    { nombre: "Remera Azul", precio: 6000, categoria: "remera", imagen: "/img/remera azul.jpg" },
    { nombre: "Remera Negra", precio: 7000, categoria: "remera", imagen: "/img/remera negra.jpg" },
    { nombre: "Remera Vino", precio: 9000, categoria: "remera", imagen: "/img/remera vino.jpg" },
    { nombre: "Remera Blanca", precio: 3000, categoria: "remera", imagen: "/img/remera blanca.jpg" },
    // Pantalones
    { nombre: "Pantalon Rojo", precio: 11000, categoria: "pantalon", imagen: "/img/pantalon rojo.jpg" },
    { nombre: "Pantalon Azul", precio: 13000, categoria: "pantalon", imagen: "/img/pantalon azul.jpg" },
    { nombre: "Pantalon Negro", precio: 9000, categoria: "pantalon", imagen: "/img/pantalon negro.jpg" },
    { nombre: "Pantalon Vino", precio: 17000, categoria: "pantalon", imagen: "/img/pantalon vino.jpg" },
    { nombre: "Pantalon Blanco", precio: 19000, categoria: "pantalon", imagen: "/img/pantalon blanco.jpg" }
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



