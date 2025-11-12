class Ventas {
  constructor(id, usuario, productos, total, fecha = new Date()) {
    this.id = id;
    this.usuario = usuario; // relación con User
    this.productos = productos; // lista de productos con cantidades
    this.total = total;
    this.fecha = fecha;
  }
}
