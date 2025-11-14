import express from "express";
import sequelize from "./database/config.js";
import path from "path";
import { exec } from "child_process";
import { fileURLToPath } from "url";

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

// Rutas API
app.use("/productos", productosRoutes);
app.use("/ticket", ticketRoutes);

// -----------------------------
//   Rutas HTML CORRECTAS
// -----------------------------

// Home (cliente)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index_cliente.html"));
});

app.get("/productos-view", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index_produc.html"));
});

// --- Añadir esta ruta para que GET /index_produc.html funcione ---
app.get("/index_produc.html", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index_produc.html"));
});

app.get("/carrito-view", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index_produc.html"));
});

// --- Añadir esta ruta para que GET /index_produc.html funcione ---
app.get("/index_carrito.html", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index_carrito.html"));
});




// Vista productos (HTML)
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "views", "index_produc.html"));
// });

// -----------------------------
//   Sincronización DB
// -----------------------------
sequelize.sync({ force: true }).then(async () => {
  console.log("Base sincronizada");

  const { Producto } = await import("./models/Productos.js");

  await Producto.bulkCreate([
    { nombre: "Remera Roja", precio: 5000, categoria: "remera", imagen: "/img/remera roja.jpg" },
    { nombre: "Remera Azul", precio: 5000, categoria: "remera", imagen: "/img/remera azul.jpg" },
    { nombre: "Pantalón Negro", precio: 8000, categoria: "pantalon", imagen: "/img/pantalon negro.jpg" }
  ]);
});

// -----------------------------
//   Abrir navegador
// -----------------------------
function openUrl(url) {
  const command = process.platform === "win32"
    ? `start "" "${url}"`
    : process.platform === "darwin"
      ? `open "${url}"`
      : `xdg-open "${url}"`;

  exec(command);
}

// -----------------------------
//   Servidor
// -----------------------------
app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
  openUrl(`http://localhost:${PORT}`);
});
