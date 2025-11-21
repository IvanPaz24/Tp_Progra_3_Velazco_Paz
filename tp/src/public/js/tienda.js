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

    // Filtrar categorías
    listaRemeras = data.filter(p => p.categoria === "remera");
    listaPantalones = data.filter(p => p.categoria === "pantalon");

    contRemeras = document.getElementById("remeras");
    contPantalones = document.getElementById("pantalones");

    mostrarPagina();

  } catch (err) {
    console.error("Error al cargar productos:", err);
  }
});

// --------------------
// Renderizar productos
// --------------------
function renderizarProductos(lista, contenedor) {
  contenedor.innerHTML = ""; // limpiar antes de renderizar

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


let paginaActual = 1;
const productosPorPagina = 3;

let listaRemeras = [];
let listaPantalones = [];

let contRemeras = null;
let contPantalones = null;


// Renderiza ambas categorías según la página actual
function mostrarPagina() {
  const inicio = (paginaActual - 1) * productosPorPagina;
  const fin = inicio + productosPorPagina;

  const remerasPagina = listaRemeras.slice(inicio, fin);
  const pantalonesPagina = listaPantalones.slice(inicio, fin);

  renderizarProductos(remerasPagina, contRemeras);
  renderizarProductos(pantalonesPagina, contPantalones);
}



// ----------- BOTONES -----------

document.getElementById("btnSiguiente").addEventListener("click", () => {
  const maxPaginasRemeras = Math.ceil(listaRemeras.length / productosPorPagina);
  const maxPaginasPantalones = Math.ceil(listaPantalones.length / productosPorPagina);

  const maxPaginas = Math.max(maxPaginasRemeras, maxPaginasPantalones);

  if (paginaActual < maxPaginas) {
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
  alert(`${producto.nombre} agregado al carrito`);
}


// sacar producto

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


// obtener datos del producto desde el DOM

function obtenerProductoDesdeDOM(id) {
  const card = document.querySelector(`button[data-id="${id}"]`).closest(".producto");
  const nombre = card.querySelector("h3").textContent;
  const precio = parseFloat(card.querySelector("p").textContent.replace("Precio: $", ""));
  const imagen = card.querySelector("img").src;
  return { id, nombre, precio, imagen };
}

