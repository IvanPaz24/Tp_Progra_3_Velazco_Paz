document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modalConfirmacion");
  const modalTitulo = document.getElementById("modalTitulo");
  const modalMensaje = document.getElementById("modalMensaje");
  const btnCancelar = document.getElementById("btnCancelar");
  const btnConfirmar = document.getElementById("btnConfirmar");

  let accionPendiente = null; 
  let productoId = null;

  //capturar clicks en los botones
  document.body.addEventListener("click", e => {
    //baja
    if (e.target.classList.contains("btnBaja")) {
      e.preventDefault();
      
      productoId = e.target.closest("form").action.match(/productos\/(\d+)/)[1];
      accionPendiente = "baja";

      modalTitulo.textContent = "Dar de baja producto";
      modalMensaje.textContent = "¿Está seguro que desea dar de baja este producto?";
      modal.style.display = "flex";
    }

    // reactivar
    if (e.target.classList.contains("btnAlta")) {
      e.preventDefault();

      productoId = e.target.closest("form").action.match(/productos\/(\d+)/)[1];
      accionPendiente = "alta";

      modalTitulo.textContent = "Reactivar producto";
      modalMensaje.textContent = "¿Está seguro que desea volver a activar este producto?";
      modal.style.display = "flex";
    }
  });

  // cancelar
  btnCancelar.addEventListener("click", () => {
    modal.style.display = "none";
    accionPendiente = null;
    productoId = null;
  });

  // confirmar
  btnConfirmar.addEventListener("click", async () => {
    if (!accionPendiente || !productoId) return;

    const url = `/productos/${productoId}/${accionPendiente}?_method=PUT`;

    await fetch(url, {
      method: "POST"
    });

    window.location.reload();
  });
});
