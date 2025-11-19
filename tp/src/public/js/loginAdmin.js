document.getElementById("btnIngresar").addEventListener("click", async () => {
    const correo = document.getElementById("inputCorreo").value;
    const contraseña = document.getElementById("inputPass").value;

    const res = await fetch("/usuario/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, contraseña })
    });

    const data = await res.json();

    if (data.mensaje === "Acceso permitido") {
        window.location.href = "/productos/dashboard";
    } else {
        alert(data.mensaje);
    }
});

// Botón para autocompletar
document.getElementById("btnAutocompletar").addEventListener("click", () => {
    document.getElementById("inputCorreo").value = "admin@admin.com";
    document.getElementById("inputPass").value = "admin123";
});
