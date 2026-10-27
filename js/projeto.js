/* Comportamentos só das páginas de projeto (depende do main.js) */
/* Navegação entre projetos pelo teclado */
addEventListener("keydown", e => {
  if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
  if (e.target.closest("input, textarea, select, [contenteditable]")) return;
  if (sheet.classList.contains("is-open")) return;
  const a = e.key === "ArrowRight" ? $("[data-next]") : e.key === "ArrowLeft" ? $("[data-prev]") : null;
  if (a) goTo(a.href);
});
