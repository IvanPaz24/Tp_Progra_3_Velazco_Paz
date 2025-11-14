import express from "express";
// const express = require("express");
import  sequelize  from "./database/config.js";
import { Producto } from "./models/Productos.js";
import path from "path";
import { exec } from 'child_process';
import { fileURLToPath } from 'url';
import ejs from "ejs";
import puppeteer from "puppeteer";
import { log } from "console";

// __dirname equivalent for ES modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PORT = 3000;
const app = express();
app.use(express.json());

// Sincronizar con la base
sequelize.sync({ force: true }).then(async () => {
  console.log("Base sincronizada");

  // Insertar productos
  await Producto.bulkCreate([ 
    { nombre: "Remera Roja", precio: 5000, categoria:"remera", imagen: "/public/img/remera roja.jpg" },
    { nombre: "Remera Azul", precio: 5000, categoria:"remera", imagen: "/public/img/remera azul.jpg" },
    { nombre: "Pantalón Negro", precio: 8000, categoria:"pantalon", imagen: "/public/img/pantalon negro.jpg" },
  ]);
});

// Endpoint para obtener productos
app.get("/productos", async (req, res) => {
  const productos = await Producto.findAll();
  res.json(productos);
});

// Servir página principal
app.get("/", (req, res) => {
   res.sendFile(path.resolve("./index_produc.html"));
 });

// Servir archivos estáticos desde la carpeta `views` (y así poder
// acceder a /index_produc.html, /index_cliente.html, etc.)
app.use(express.static(path.join(__dirname, 'views')));

// Servir la carpeta public para CSS/JS/imagenes referenciadas como /public/...
// Servir 'public' en la raíz para poder usar rutas como /css/... y /js/...
app.use(express.static(path.join(__dirname, 'public')));
// También mantener el prefijo /public por compatibilidad
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
  // Enviar la página principal desde views
  res.sendFile(path.join(__dirname, 'views', 'index_cliente.html'));
});

function openUrlInBrowser(url) {
  try {
    const platform = process.platform;
    if (platform === 'win32') {
      // start requires a title argument; empty string used
      exec(`start "" "${url}"`);
    } else if (platform === 'darwin') {
      exec(`open "${url}"`);
    } else {
      exec(`xdg-open "${url}"`);
    }
  } catch (err) {
    console.error('No se pudo abrir el navegador automáticamente:', err);
  }
}

app.set("view engine", "ejs");

// Ruta para mostrar los datos
let carritoTemporal = [];
app.post("/ticket", (req, res) => {
  carritoTemporal = req.body.carrito; // guardamos el carrito en memoria
  res.render("index_ticket", { 
    datos: carritoTemporal,
    esVista: true
  }); 
  // console.log(carritoTemporal);
});
// app.get("/ticket", (req, res) => {
//   const { carrito } = req.query; // vienen del navegador
//   res.render("index_ticket", { datos: carrito }); // enviamos los datos a EJS
// });

// let esVista = true;

app.get("/ticket/pdf", async (req, res) => {
  try {
    if (!carritoTemporal || carritoTemporal.length === 0) {
      return res.send("No hay productos en el carrito");
    }

    const html = await ejs.renderFile(
      path.join(__dirname, "views", "index_ticket.ejs"),
      { datos: carritoTemporal,
        esVista: false
      }
    );

    // carritoTemporal.esVista = false;

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "20px", 
        bottom: "20px", 
        left: "20px", 
        right: "20px" }
    });

    await browser.close();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=ticket.pdf",
    });

    res.send(pdfBuffer);
  } catch (error) {
    console.error("Error generando el PDF:", error);
    res.status(500).send("Error generando el PDF");
  }
});

app.listen(PORT, () => {
  console.log("Servidor en http://localhost:3000");
  // Abrir directamente la vista cliente al arrancar
  const url = `http://localhost:${PORT}/index_cliente.html`;
  openUrlInBrowser(url);
});
