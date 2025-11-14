import ejs from "ejs";
import path from "path";
import puppeteer from "puppeteer";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let carritoTemporal = [];

export const crearTicket = (req, res) => {
  carritoTemporal = req.body.carrito;

  res.render("index_ticket", {
    datos: carritoTemporal,
    esVista: true
  });
};

export const generarPDF = async (req, res) => {
  try {
    if (!carritoTemporal.length) {
      return res.send("No hay productos en el carrito");
    }

    const html = await ejs.renderFile(
      path.join(__dirname, "../views/index_ticket.ejs"),
      { datos: carritoTemporal, esVista: false }
    );

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "20px", bottom: "20px", left: "20px", right: "20px" }
    });

    await browser.close();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=ticket.pdf"
    });

    res.send(pdfBuffer);

  } catch (err) {
    console.error("Error generando PDF:", err);
    res.status(500).send("Error generando el PDF");
  }
};
