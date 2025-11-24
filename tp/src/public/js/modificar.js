const formulario = document.getElementById("formProducto");

formulario.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("entro");
    
    const token = localStorage.getItem("token");
    console.log(token);

    if (!token) {
        alert("Sesion expirada");
        return window.location.href = "/index_cliente.html";
    }

    // const form = e.target;
    const data = new FormData(formulario);

    // const resToken = await fetch("/auth/validar-token", {
    //     method: "GET",
    //     headers: {
    //         "Authorization": "Bearer " + token
    //     },
    // })

    // if (!resToken) {
    //     alert("Sesión expirada");
    //     localStorage.removeItem("token");
    //     return window.location.href = "/index_cliente.html";
    // }

    
    // if (resToken.status === 401){ 
    //     alert("Sesión expirada");
    //     localStorage.removeItem("token");
    //     return window.location.href = "/index_cliente.html";
    // }

    const res = await fetch(formulario.action, {
        method: formulario.method,
        headers: {
            "Authorization": "Bearer " + token
        },
        body: data
    });

    if (res.ok) {
        return window.location.href = "/productos/dashboard";
    }else{
        alert("Sesión expirada");
        localStorage.removeItem("token");
        return window.location.href = "/index_cliente.html";
    }
});