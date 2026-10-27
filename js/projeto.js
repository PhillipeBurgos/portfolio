/* Comportamentos só das páginas de projeto (depende do main.js) */
/* Navegação entre projetos pelo teclado */
addEventListener("keydown", e => {
  if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
  if (e.target.closest("input, textarea, select, [contenteditable]")) return;
  if (sheet.classList.contains("is-open")) return;
  const a = e.key === "ArrowRight" ? $("[data-next]") : e.key === "ArrowLeft" ? $("[data-prev]") : null;
  if (a) goTo(a.href);
});

/* Galeria com zoom (pinça no mobile, roda do mouse no desktop) */
const vendor = new URL("vendor/", document.currentScript.src);
const zoomImgs = $$(".case-cover img, .case-figure img, .gallery img");
let pswpCss;
const loadCss = () => pswpCss ||= new Promise(r => {
  const l = document.createElement("link");
  l.rel = "stylesheet"; l.href = new URL("photoswipe.css", vendor);
  l.onload = l.onerror = r;
  document.head.append(l);
});
async function openGallery(index){
  const [, { default: PhotoSwipe }] = await Promise.all([loadCss(), import(new URL("photoswipe.esm.min.js", vendor))]);
  new PhotoSwipe({
    dataSource: zoomImgs.map(img => ({
      src: img.currentSrc || img.src, alt: img.alt,
      width: img.naturalWidth || +img.getAttribute("width") || 1600,
      height: img.naturalHeight || +img.getAttribute("height") || 900,
    })),
    index, maxZoomLevel: 2, wheelToZoom: true, showHideAnimationType: "fade",
    closeTitle: "Fechar", zoomTitle: "Zoom", arrowPrevTitle: "Imagem anterior", arrowNextTitle: "Próxima imagem",
    errorMsg: "Não foi possível carregar a imagem",
  }).init();
}
zoomImgs.forEach((img, i) => {
  img.classList.add("zoomable");
  img.tabIndex = 0;
  img.setAttribute("role", "button");
  img.setAttribute("aria-label", `Ampliar imagem: ${img.alt}`);
  img.addEventListener("click", () => openGallery(i));
  img.addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openGallery(i); }
  });
});
