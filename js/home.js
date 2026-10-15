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
