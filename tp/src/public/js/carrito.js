document.addEventListener("DOMContentLoaded", () => {
  mostrarCarrito();

  // listener sumar o agregar cantidad
  document.getElementById("listaCarrito").addEventListener("click", e => {
    if (e.target.classList.contains("btnSumar")) {
      cambiarCantidad(e.target.dataset.id, 1);
    } 
    else if (e.target.classList.contains("btnRestar")) {
      cambiarCantidad(e.target.dataset.id, -1);
    }
  });

  // vaciar carrito
  document.getElementById("vaciarCarrito").addEventListener("click", () => {
    localStorage.removeItem("carrito");
    mostrarCarrito();
  });
});



// mostrar carrito

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


// cambiar cantidad

function cambiarCantidad(id, delta) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const producto = carrito.find(p => p.id == id);

  if (!producto) return;

  producto.cantidad += delta;

  if (producto.cantidad <= 0) {
    carrito = carrito.filter(p => p.id != id);
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
}



// verif carrito

function verificarCarrito(carrito) {
  return carrito.length > 0;
}



// fin compra

const btn = document.getElementById('finCompra');

if (btn) {
  btn.addEventListener('click', () => {
    
    const modal = document.getElementById("modalConfirmacion");
    const modalTitulo = document.getElementById("modalTitulo");
    const modalMensaje = document.getElementById("modalMensaje");
    const btnCancelar = document.getElementById("btnCancelar");
    const btnConfirmar = document.getElementById("btnConfirmar");

    modalTitulo.textContent = "Confirmar compra";
    modalMensaje.textContent = "¿Está seguro que desea finalizar la compra?";
    modal.style.display = "flex";

    // limpiar listeners viejos
    btnConfirmar.onclick = null;

    // listener único
    btnConfirmar.onclick = async () => {
      const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
      const clienteNombre = localStorage.getItem("clienteNombre") || "Cliente";

      if (!verificarCarrito(carrito)) {
        modalMensaje.textContent = "El carrito está vacío. Agregue productos antes de finalizar la compra.";
        
        btnConfirmar.onclick = () => {
          modal.style.display = "none";
        };

        return;
      }

      // enviar ticket al serv
      const res = await fetch("/ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ carrito, clienteNombre })
      });

      const html = await res.text();

      // registrar venta
      const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

      await fetch("/ventas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: clienteNombre, total })
      });

      // mostrar ticket
      document.open();
      document.write(html);
      document.close();
    };

    btnCancelar.onclick = () => {
      modal.style.display = "none";
    };

  });
}

// salir y limpiar carrito

document.getElementById("Salir").addEventListener("click", () => {
  localStorage.removeItem("carrito");
  localStorage.removeItem("clienteNombre");
  window.location.href = "index_cliente.html";
});
