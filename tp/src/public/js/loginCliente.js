// tp/src/public/js/cliente.js

// Si usas defer, el DOM ya está listo cuando se ejecuta este script,
// así que no hace falta esperar a DOMContentLoaded.
const btn = document.getElementById('btnIngresar');
if (btn) {
  btn.addEventListener('click', () => {
    // Validación opcional del nombre:
    const nombre = (document.getElementById('inputNombre') || {}).value?.trim();
    if (!nombre) { alert('Ingrese su nombre'); return; }

    // Redirige a la página de productos (ruta relativa para poder abrir el HTML directamente)
    window.location.href = 'index_produc.html';
  });
}