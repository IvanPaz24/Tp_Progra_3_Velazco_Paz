// public/js/tienda.js
const btn = document.getElementById('btnCarrito');
if (btn) {
  btn.addEventListener('click', () => {
    window.location.href = 'index_carrito.html';
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("/productos");
    const data = await res.json();

    const remeras = data.filter(p => p.categoria === "remera");
    const pantalones = data.filter(p => p.categoria === "pantalon");

    const contRemeras = document.getElementById("remeras");
    const contPantalones = document.getElementById("pantalones");

    renderizarProductos(remeras, contRemeras);
    renderizarProductos(pantalones, contPantalones);
  } catch (err) {
    console.error("Error al cargar productos:", err);
  }
});


// renderizar productos

function renderizarProductos(lista, contenedor) {
  lista.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
      <h3>${p.nombre}</h3>
      <img src="${p.imagen}" width="120">
      <p>Precio: $${p.precio}</p>
      <div class="botones-producto">
        <button class="btnAgregar" data-id="${p.id}">Agregar al carrito</button>
        <button class="btnQuitar" data-id="${p.id}">Quitar del carrito</button>
      </div>
    `;
    contenedor.appendChild(div);
  });


  contenedor.addEventListener("click", e => {
    if (e.target.classList.contains("btnAgregar")) {
      agregarAlCarrito(e.target.dataset.id);
    } else if (e.target.classList.contains("btnQuitar")) {
      quitarDelCarrito(e.target.dataset.id);
    }
  });
}


// sumar producto

function agregarAlCarrito(id) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const producto = obtenerProductoDesdeDOM(id);

  const existente = carrito.find(p => p.id == id);
  if (existente) {
    existente.cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert(`✅ ${producto.nombre} agregado al carrito`);
}


// sacar producto

function quitarDelCarrito(id) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const producto = carrito.find(p => p.id == id);

  if (!producto) {
    alert("⚠️ Ese producto no está en el carrito");
    return;
  }

  carrito = carrito.filter(p => p.id != id);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert(`❌ ${producto.nombre} eliminado del carrito`);
}


// obtener datos del producto desde el DOM

function obtenerProductoDesdeDOM(id) {
  const card = document.querySelector(`button[data-id="${id}"]`).closest(".producto");
  const nombre = card.querySelector("h3").textContent;
  const precio = parseFloat(card.querySelector("p").textContent.replace("Precio: $", ""));
  const imagen = card.querySelector("img").src;
  return { id, nombre, precio, imagen };
}