const btnTema = document.getElementById("themeToggle");
const html = document.documentElement;

// Cargar tema guardado
if (localStorage.getItem("theme") === "dark") {
  html.classList.add("dark-theme");
  btnTema.textContent = "☀️";
}

// Alternar tema
btnTema.addEventListener("click", () => {
  html.classList.toggle("dark-theme");

  if (html.classList.contains("dark-theme")) {
    localStorage.setItem("theme", "dark");
    btnTema.textContent = "☀️";
  } else {
    localStorage.setItem("theme", "light");
    btnTema.textContent = "🌙";
  }
});