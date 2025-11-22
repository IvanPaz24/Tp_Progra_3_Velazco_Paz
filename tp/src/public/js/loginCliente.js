const btn = document.getElementById('btnIngresar');
if (btn) {
  btn.addEventListener('click', () => {
    // validacion nombre
    const nombre = (document.getElementById('inputNombre') || {}).value?.trim();
    if (!nombre) { alert('Ingrese su nombre'); return; }

    // redirige a la pagina de productos (ruta relativa para poder abrir el HTML directamente)
    window.location.href = 'index_produc.html';

    localStorage.setItem('clienteNombre', nombre);
    console.log(nombre);
    
  });
}