/* Comportamentos só da home (depende do main.js) */
/* Nome do hero com peso variável */
const chars = $$(".hero-name .ch");
const BASE_W = 700, THIN = 230;
const weights = chars.map(() => reduce ? BASE_W : 200);
const startAt = performance.now() + 250;
let heroVisible = true;
new IntersectionObserver(([e]) => heroVisible = e.isIntersecting).observe($("#home"));
const heroName = $(".hero-name");
function heroLoop(now){
  if (heroVisible) {
    const R = parseFloat(getComputedStyle(heroName).fontSize) * 1.3;
    chars.forEach((ch, i) => {
      let target = BASE_W;
      if (now < startAt + i * 70) target = 200;
      else if (finePointer) {
        const r = ch.getBoundingClientRect();
        const t = Math.max(0, 1 - Math.hypot(r.left + r.width/2 - mx, r.top + r.height/2 - my) / R);
        target = BASE_W - (BASE_W - THIN) * (t * t * (3 - 2 * t));
      }
      weights[i] += (target - weights[i]) * .1;
      ch.style.fontVariationSettings = `"opsz" 96, "wght" ${weights[i].toFixed(1)}`;
    });
  }
  requestAnimationFrame(heroLoop);
}
if (!reduce) requestAnimationFrame(heroLoop);

/* Item ativo da nav */
const navLinks = $$(".menu a[data-section]");
const seen = new Map();
const io = new IntersectionObserver(entries => {
  entries.forEach(e => seen.set(e.target.id, e.intersectionRatio));
  let best = null, ratio = 0;
  seen.forEach((r, id) => { if (r > ratio){ ratio = r; best = id; } });
  navLinks.forEach(a => a.classList.toggle("is-active", a.dataset.section === best));
}, { threshold:[0,.15,.3,.5,.7,1] });
["home","portfolio","como-trabalho","curriculo","contato"].forEach(id => { const el = document.getElementById(id); if (el) io.observe(el); });

/* Acordeão */
$$(".job-head").forEach(btn => btn.addEventListener("click", () => {
  const job = btn.closest(".job");
  const open = !job.classList.contains("is-open");
  job.classList.toggle("is-open", open);
  btn.setAttribute("aria-expanded", String(open));
}));

/* Portfólio em desenvolvimento: arrastar a linha entre wireframe e alta fidelidade */
const wip = document.querySelector(".wip-art");
if (wip) {
  const handle = wip.querySelector(".wip-scan");
  const setPos = p => {
    p = Math.max(0, Math.min(100, p));
    wip.style.setProperty("--pos", p + "%");
    handle.setAttribute("aria-valuenow", Math.round(p));
    handle.setAttribute("aria-valuetext", Math.round(p) + "%");
  };
  const fromEvent = e => {
    const r = wip.getBoundingClientRect();
    setPos((e.clientX - r.left) / r.width * 100);
  };
  wip.addEventListener("pointerdown", e => {
    wip.classList.remove("is-intro");
    wip.classList.add("is-dragging");
    wip.setPointerCapture(e.pointerId);
    fromEvent(e);
  });
  wip.addEventListener("pointermove", e => { if (wip.classList.contains("is-dragging")) fromEvent(e); });
  const stop = () => wip.classList.remove("is-dragging");
  wip.addEventListener("pointerup", stop);
  wip.addEventListener("pointercancel", stop);
  handle.addEventListener("keydown", e => {
    const now = parseFloat(handle.getAttribute("aria-valuenow"));
    const step = e.shiftKey ? 20 : 5;
    const next = { ArrowLeft: now - step, ArrowDown: now - step, ArrowRight: now + step, ArrowUp: now + step, Home: 0, End: 100 }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    setPos(next);
  });

  // Ao aparecer na tela, a linha dá uma balançada para mostrar que dá para arrastar
  if (!matchMedia("(prefers-reduced-motion: reduce)").matches && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return;
      io.disconnect();
      wip.classList.add("is-intro");
      const steps = [72, 28, 50];
      steps.forEach((p, i) => setTimeout(() => { if (wip.classList.contains("is-intro")) setPos(p); }, 300 + i * 1100));
      setTimeout(() => wip.classList.remove("is-intro"), 300 + steps.length * 1100);
    }, { threshold: .6 });
    io.observe(wip);
  }
}
