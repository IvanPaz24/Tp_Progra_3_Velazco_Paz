// public/js/carrito.js

document.addEventListener("DOMContentLoaded", () => {
  mostrarCarrito();

  // Listener único para sumar/restar (delegado)
  document.getElementById("listaCarrito").addEventListener("click", e => {
    if (e.target.classList.contains("btnSumar")) {
      cambiarCantidad(e.target.dataset.id, 1);
    } else if (e.target.classList.contains("btnRestar")) {
      cambiarCantidad(e.target.dataset.id, -1);
    }
  });

  // Vaciar carrito
  document.getElementById("vaciarCarrito").addEventListener("click", () => {
    localStorage.removeItem("carrito");
    mostrarCarrito();
  });
});

function mostrarCarrito() {
  const lista = document.getElementById("listaCarrito");
  const totalDiv = document.getElementById("total");
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  if (carrito.length === 0) {
    lista.innerHTML = "<p>El carrito está vacío.</p>";
    totalDiv.textContent = "";
    return;
  }

  let total = 0;
  lista.innerHTML = "";

  carrito.forEach(p => {
    total += p.precio * p.cantidad;

    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
      <img src="${p.imagen}" width="100" height="100">
      <h3>${p.nombre}</h3>
      <p>Precio: $${p.precio}</p>
      <div class="cantidad-control">
        <button class="btnRestar" data-id="${p.id}">−</button>
        <span>${p.cantidad}</span>
        <button class="btnSumar" data-id="${p.id}">+</button>
      </div>
    `;
    lista.appendChild(div);
  });

  totalDiv.textContent = `Total: $${total.toFixed(2)}`;
}

function cambiarCantidad(id, delta) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const producto = carrito.find(p => p.id == id);

  if (!producto) return;

  producto.cantidad += delta;
  if (producto.cantidad <= 0) {
    carrito = carrito.filter(p => p.id != id); // eliminar si llega a 0
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
}

const btn = document.getElementById('finCompra');
if (btn) {
  btn.addEventListener('click', async () => {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // Envío el carrito al servidor
  const res = await fetch("/ticket", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ carrito }) // lo enviamos dentro de un objeto
  });

  
  const html = await res.text();
  document.open();
  document.write(html);
  document.close();
    // window.location.href = 'index_.ticket.html';
  });
}