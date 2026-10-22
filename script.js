// Custom cursor: dot follows mouse exactly, inverting lens eases behind it.
(() => {
  if (!matchMedia("(pointer: fine)").matches) return;

  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const lens = document.createElement("div");
  const dot = document.createElement("div");
  lens.className = "cursor-lens";
  dot.className = "cursor-dot";
  document.body.append(lens, dot);

  let mx = innerWidth / 2, my = innerHeight / 2;
  let lx = mx, ly = my;

  addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    document.documentElement.classList.add("has-cursor");
    dot.style.transform = `translate(${mx}px, ${my}px)`;
  });

  document.addEventListener("mouseleave", () => {
    document.documentElement.classList.remove("has-cursor");
  });

  document.addEventListener("mouseover", (e) => {
    const active = !!e.target.closest("a, button, .poster");
    dot.classList.toggle("is-active", active);
    lens.classList.toggle("is-active", active);
  });

  const tick = () => {
    const ease = reduceMotion ? 1 : 0.15;
    lx += (mx - lx) * ease;
    ly += (my - ly) * ease;
    lens.style.transform = `translate(${lx}px, ${ly}px)`;
    requestAnimationFrame(tick);
  };
  tick();
})();
