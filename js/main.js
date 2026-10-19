/* Comportamentos usados em todas as páginas */
const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
const root = document.documentElement;

const EMAIL = document.querySelector(".mail")?.dataset.email || "";
$$(".year").forEach(el => el.textContent = new Date().getFullYear());

const fmt = new Intl.DateTimeFormat("pt-BR", { hour:"2-digit", minute:"2-digit", timeZone:"America/Recife" });
const tick = () => $$(".clock").forEach(c => c.textContent = fmt.format(new Date()));
tick(); setInterval(tick, 15000);

requestAnimationFrame(() => root.classList.add("is-loaded"));

/* Transição entre páginas */
if (root.classList.contains("pt-in")) {
  requestAnimationFrame(() => requestAnimationFrame(() => {
    root.classList.add("pt-out");
    setTimeout(() => root.classList.remove("pt-in","pt-out"), 900);
  }));
}
addEventListener("pageshow", e => { if (e.persisted) root.classList.remove("pt-leave","pt-in","pt-out"); });
function goTo(url){
  if (reduce) { location.href = url; return; }
  try { sessionStorage.setItem("pt","1"); } catch(e) {}
  root.classList.add("pt-leave");
  setTimeout(() => location.href = url, 480);
}
document.addEventListener("click", e => {
  const a = e.target.closest("a");
  if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
  const h = a.getAttribute("href") || "";
  if (a.hasAttribute("download") || a.target === "_blank" || !/\.html(#.*)?$/.test(h) || /^(https?:|mailto:)/.test(h)) return;
  e.preventDefault();
  goTo(a.href);
});

/* Cursor */
let mx = -9999, my = -9999;
addEventListener("mousemove", e => { mx = e.clientX; my = e.clientY; }, { passive:true });
if (finePointer) {
  const cursor = $(".cursor");
  root.classList.add("has-cursor");
  document.addEventListener("mouseleave", () => cursor.classList.add("is-hidden"));
  document.addEventListener("mouseenter", () => cursor.classList.remove("is-hidden"));
  document.addEventListener("mouseover", e => cursor.classList.toggle("is-link", !!e.target.closest("a, button")));
  let cx = 0, cy = 0;
  const loop = () => {
    cx += (mx - cx) * .35; cy += (my - cy) * .35;
    cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
}

/* Scroll */
const nav = $(".nav"), bar = $(".progress"), sheet = $(".sheet");
let lastY = scrollY, ticking = false;
function onScroll(){
  const y = scrollY, max = document.documentElement.scrollHeight - innerHeight;
  bar.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
  nav.classList.toggle("is-scrolled", y > 8);
  if (!sheet.classList.contains("is-open")) {
    const down = y > lastY + 4, up = y < lastY - 4;
    if (down && y > 160) nav.classList.add("is-hidden");
    else if (up || y < 160) nav.classList.remove("is-hidden");
  }
  lastY = y; ticking = false;
}
addEventListener("scroll", () => { if (!ticking){ ticking = true; requestAnimationFrame(onScroll); } }, { passive:true });
onScroll();
// Se o foco do teclado entrar na nav, ela aparece
nav.addEventListener("focusin", () => nav.classList.remove("is-hidden"));

/* Menu mobile */
const toggle = $(".menu-toggle");
let lastFocus = null;
function setSheet(open){
  sheet.classList.toggle("is-open", open);
  nav.classList.toggle("sheet-open", open); nav.classList.remove("is-hidden");
  sheet.setAttribute("aria-hidden", String(!open));
  sheet.inert = !open;
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  document.body.style.overflow = open ? "hidden" : "";
  if (open) { lastFocus = document.activeElement; setTimeout(() => $(".sheet nav a")?.focus({preventScroll:true}), 300); }
  else if (lastFocus) { lastFocus.focus({preventScroll:true}); lastFocus = null; }
}
sheet.inert = true;
toggle.addEventListener("click", () => setSheet(!sheet.classList.contains("is-open")));
$$(".sheet a").forEach(a => a.addEventListener("click", () => setSheet(false)));
addEventListener("keydown", e => { if (e.key === "Escape" && sheet.classList.contains("is-open")) setSheet(false); });
addEventListener("resize", () => { if (innerWidth > 860 && sheet.classList.contains("is-open")) setSheet(false); });

/* E-mail, download e topo */
const toast = $(".toast"), mail = $(".mail");
let mailTimer, toastTimer;
const showToast = () => {
  toast.classList.add("is-on");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-on"), 2200);
};
mail?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(EMAIL);
    mail.classList.add("is-copied"); showToast();
    clearTimeout(mailTimer);
    mailTimer = setTimeout(() => mail.classList.remove("is-copied"), 2200);
  } catch { location.href = "mailto:" + EMAIL; }
});
// No desktop, o e-mail do currículo copia em vez de abrir o app de e-mail
const desktop = matchMedia("(hover:hover) and (pointer:fine)");
$$(".js-copy-mail").forEach(a => a.addEventListener("click", async e => {
  if (!desktop.matches) return;
  e.preventDefault();
  try { await navigator.clipboard.writeText(EMAIL); showToast(); }
  catch { location.href = a.href; }
}));
$$(".js-cv").forEach(a => a.addEventListener("click", () => {
  a.classList.remove("is-pulled"); void a.offsetWidth; a.classList.add("is-pulled");
  setTimeout(() => a.classList.remove("is-pulled"), 950);
}));
$(".to-top")?.addEventListener("click", () => scrollTo({ top:0, behavior: reduce ? "auto" : "smooth" }));
