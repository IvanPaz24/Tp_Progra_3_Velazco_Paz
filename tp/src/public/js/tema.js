function initTema() {
    const btnTema = document.getElementById("themeToggle");
    const html = document.documentElement;

    if (!btnTema) {
        console.error("No se encontró el botón themeToggle");
        return;
    }

    // Cargar tema guardado
    if (localStorage.getItem("theme") === "dark") {
        html.classList.add("dark-theme");
        btnTema.textContent = "☀️";
    }

    // Alternar tema
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

// Esperar a que el DOM esté completamente cargado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTema);
} else {
    initTema();
}