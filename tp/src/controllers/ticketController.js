import ejs from "ejs";
import path from "path";
import puppeteer from "puppeteer";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let carritoTemporal = [];
let nombreCliente = "";

const cargarLogo = () => {
  try {
    const logoPath = path.join(__dirname, "../public/img/logo.png");
    const logoBuffer = fs.readFileSync(logoPath);
    const logoBase64 = logoBuffer.toString("base64");
    return `data:image/png;base64,${logoBase64}`;
  } catch (error) {
    console.log("No se pudo cargar el logo");
    return null;
  }
};

const obtenerFecha = () => {
  return new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const crearTicket = (req, res) => {
  carritoTemporal = req.body.carrito;
  nombreCliente = req.body.clienteNombre;

  const logo = cargarLogo();
  const fecha = obtenerFecha();

  res.render("index_ticket", {
    datos: carritoTemporal,
    nombreCliente: nombreCliente,
    esVista: true,
    logo: logo, 
    fecha: fecha 
  });
};


export const generarPDF = async (req, res) => {
  try {
    if (!carritoTemporal.length) {
      return res.send("No hay productos en el carrito");
    }

    const logo = cargarLogo();
    
    const fecha = new Date().toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const total = carritoTemporal.reduce((sum, item) => 
      sum + (item.precio * item.cantidad), 0
    );

    const html = await ejs.renderFile(
      path.join(__dirname, "../views/index_ticket.ejs"),
      { 
        datos: carritoTemporal, 
        esVista: false, 
        nombreCliente: nombreCliente,
        logo: logo,        
        fecha: fecha,      
        total: total      
      }
    );

    const browser = await puppeteer.launch({ headless: true,});
    
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "15mm",
        bottom: "15mm",
        left: "70mm",
        right: "20mm"
      }
    });

    await browser.close();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=ticket_compra.pdf"
    });

    res.send(pdfBuffer);

  } catch (err) {
    console.error("Error generando PDF:", err);
    res.status(500).send("Error generando el PDF");
  }
};