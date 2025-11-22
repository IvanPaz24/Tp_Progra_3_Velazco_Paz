function initTema() {
    const btnTema = document.getElementById("themeToggle");
    const html = document.documentElement;

    if (!btnTema) {
        console.error("No se encontró el botón themeToggle");
        return;
    }

    // cargar tema guardado
    if (localStorage.getItem("theme") === "dark") {
        html.classList.add("dark-theme");
        btnTema.textContent = "☀️";
    }

    // alternar tema
    btnTema.addEventListener("click", () => {
        console.log("Cambiando tema...");
        
        html.classList.toggle("dark-theme");

        if (html.classList.contains("dark-theme")) {
            localStorage.setItem("theme", "dark");
            btnTema.textContent = "☀️";
        } else {
            localStorage.setItem("theme", "light");
            btnTema.textContent = "🌙";
        }
    });
}

// esperar a que el DOM este completamente cargado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTema);
} else {
    initTema();
}