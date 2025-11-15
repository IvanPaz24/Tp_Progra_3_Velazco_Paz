document.getElementById("salirTicket").addEventListener("click", () => {
    localStorage.removeItem("carrito");
    window.location.href = './index_cliente.html';
});