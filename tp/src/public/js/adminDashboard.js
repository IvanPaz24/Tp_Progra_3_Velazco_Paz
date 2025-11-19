// Cargar productos del dashboard
fetch("/productos/dashboard")
  .then(res => res.json())
  .then(data => {
    renderizarProductos(data, document.getElementById("contenedorProductos"));
  });

// Render
function renderizarProductos(lista, contenedor) {
  contenedor.innerHTML = "";

  lista.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("productoAdmin");

    div.innerHTML = `
      <h3>${p.nombre}</h3>
      <img src="${p.imagen}" width="120">
      <p>Precio: $${p.precio}</p>
      <p>Categoría: ${p.categoria}</p>
      <p>Estado: <strong>${p.activo ? "Activo" : "Inactivo"}</strong></p>

      <div class="botones-producto">
        <button class="btnModificar" data-id="${p.id}">Modificar</button>
        <button class="btnBaja" data-id="${p.id}">Dar de baja</button>
      </div>
    `;

    contenedor.appendChild(div);
  });
}

// Manejo de acciones
document.addEventListener("click", async (e) => {
  const id = e.target.dataset.id;

  // MODIFICAR
  if (e.target.classList.contains("btnModificar")) {
    const nuevoNombre = prompt("Nuevo nombre:");
    const nuevoPrecio = prompt("Nuevo precio:");

    await fetch(`/productos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre: nuevoNombre, precio: nuevoPrecio })
    });

    return location.reload();
  }

  // BAJA LOGICA
  if (e.target.classList.contains("btnBaja")) {
    if (!confirm("¿Está seguro de dar de baja este producto?")) return;

    await fetch(`/productos/${id}/baja`, {
      method: "PUT",
    });

    return location.reload();
  }
});
