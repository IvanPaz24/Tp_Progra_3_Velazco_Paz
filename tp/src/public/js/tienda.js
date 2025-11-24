const btn = document.getElementById('btnCarrito');
if (btn) {
  btn.addEventListener('click', () => {
    window.location.href = 'index_carrito.html';
  });
}

let listaRemeras = [];
let listaPantalones = [];
let contRemeras = null;
let contPantalones = null;

let paginaActual = 1;
const productosPorPagina = 3;


// cargar productos

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("/productos");
    const data = await res.json();

    listaRemeras = data.filter(p => p.categoria === "remera");
    listaPantalones = data.filter(p => p.categoria === "pantalon");

    contRemeras = document.getElementById("remeras");
    contPantalones = document.getElementById("pantalones");

    mostrarPagina();

  } catch (err) {
    console.error("Error al cargar productos:", err);
  }
});



// renderizar productos

function renderizarProductos(lista, contenedor) {
  contenedor.innerHTML = ""; 

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
}



// paginacion

function mostrarPagina() {
  const inicio = (paginaActual - 1) * productosPorPagina;
  const fin = inicio + productosPorPagina;

  renderizarProductos(listaRemeras.slice(inicio, fin), contRemeras);
  renderizarProductos(listaPantalones.slice(inicio, fin), contPantalones);
}


// botones paginacion
document.getElementById("btnSiguiente").addEventListener("click", () => {
  const maxPag = Math.max(
    Math.ceil(listaRemeras.length / productosPorPagina),
    Math.ceil(listaPantalones.length / productosPorPagina)
  );

  if (paginaActual < maxPag) {
    paginaActual++;
    mostrarPagina();
  }
});

document.getElementById("btnAnterior").addEventListener("click", () => {
  if (paginaActual > 1) {
    paginaActual--;
    mostrarPagina();
  }
});



// delegacion de evento agregar/quitar

document.addEventListener("click", e => {

  if (e.target.classList.contains("btnAgregar")) {
    agregarAlCarrito(e.target.dataset.id);
  }

  if (e.target.classList.contains("btnQuitar")) {
    quitarDelCarrito(e.target.dataset.id);
  }
});



// logica Carrito

function agregarAlCarrito(id) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const producto = obtenerProductoDesdeDOM(id);

  const existente = carrito.find(p => p.id == id);
  if (existente) {
    existente.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert(`${producto.nombre} agregado al carrito`);
}


function quitarDelCarrito(id) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const producto = carrito.find(p => p.id == id);

  if (!producto) {
    alert("Ese producto no está en el carrito");
    return;
  }

  carrito = carrito.filter(p => p.id != id);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert(`${producto.nombre} eliminado del carrito`);
}



// obtener producto desde DOM

function obtenerProductoDesdeDOM(id) {
  const card = document.querySelector(`button[data-id="${id}"]`).closest(".producto");

  return {
    id,
    nombre: card.querySelector("h3").textContent,
    precio: parseFloat(card.querySelector("p").textContent.replace("Precio: $", "")),
    imagen: card.querySelector("img").src
  };
}


document.getElementById("SalirProducto").addEventListener("click", () => {
  localStorage.removeItem("carrito");
  localStorage.removeItem("clienteNombre");
  window.location.href = "index_cliente.html";
});
