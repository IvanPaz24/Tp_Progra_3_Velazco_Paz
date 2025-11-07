import express from "express";
// const express = require("express");
import  sequelize  from "./db.js";
import { Producto } from "./Producto.js";
import path from "path";

const PORT = 3000;
const app = express();
app.use(express.json());

// Sincronizar con la base
sequelize.sync({ force: true }).then(async () => {
  console.log("Base sincronizada");

  // Insertar productos
  await Producto.bulkCreate([ 
    { nombre: "Remera", precio: 5000, imagen: "remera.jpg" },
    // { nombre: "Pantalón", precio: 8000, imagen: "/img/pantalon1.jpg" },
  ]);
});

// Endpoint para obtener productos
app.get("/productos", async (req, res) => {
  const productos = await Producto.findAll();
  res.json(productos);
});

// Servir página principal
// app.get("/", (req, res) => {
//   res.sendFile(path.resolve("./index_produc.html"));
// });

app.post("/nombre", (res, req) =>{
  const btn = res.body;

  btn.document.getElementById("btnIngresar").addEventListener( "click", () => {
    console.log("ingreso");
    
//   if (ingresoNombre()) {
//     // window.location.href = "index_produc.html";
// //       res.sendFile(path.resolve("./index_cliente.html/index_produc.html"));
//     console.log("Ingreso el nombre")

//   }
//   else{
//     alert("Ingrese su nombre");
//   }
    
})
})
// document.getElementById("btnIngresar").addEventListener( "click", () => {
//   if (ingresoNombre()) {
//     // window.location.href = "index_produc.html";
// //       res.sendFile(path.resolve("./index_cliente.html/index_produc.html"));
//     console.log("Ingreso el nombre")

//   }
//   else{
//     alert("Ingrese su nombre");
//   }
    
// })
app.get("/", (req, res) => {
 res.sendFile(path.resolve("./index_cliente.html"));
});

app.listen(PORT, () => console.log("Servidor en http://localhost:3000"));
