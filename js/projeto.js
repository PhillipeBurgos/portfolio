/* Comportamentos só das páginas de projeto (depende do main.js) */
/* Navegação entre projetos pelo teclado */
addEventListener("keydown", e => {
  if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
  if (e.target.closest("input, textarea, select, [contenteditable]")) return;
  if (sheet.classList.contains("is-open")) return;
  if (e.key === "ArrowRight") goTo($("[data-next]").href);
  if (e.key === "ArrowLeft") goTo($("[data-prev]").href);
});
