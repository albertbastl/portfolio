// Case preview: hover a poster (~120 ms intent) → white veil, poster lifts in place,
// its case fades in: text on the half opposite the poster,
// 6 graphics clustered around the poster, giant title at the bottom. Stays open only while over the poster.
// Click/tap pins it open (until click elsewhere, Esc or close). Keyboard focus mirrors hover.
// Portrait (styles.css): case becomes a scrollable full-screen sheet.
(() => {
  const hero = document.querySelector(".hero");
  const posters = [...hero.querySelectorAll(".poster[data-project]")];
  const K = 1440 / 1276; // brief frame → site design frame (styles.css)
  const SLOTS = [[150, 200], [272, 200], [200, 220], [104, 220], [104, 220], [120, 120]];
  const INTENT = 120;

  const at = (x, y, w, h) =>
    `left:calc(${x * K} * var(--x));top:calc(${y * K} * var(--y));` +
    (w ? `width:calc(${w * K} * var(--u));height:calc(${h * K} * var(--u));` : "");

  const veil = document.createElement("div");
  veil.className = "case-veil";
  hero.append(veil);

  const cases = {};
  // Mobile sheet sizing: --w/--h = slot size (aspect + mockup em scale), wide slots span both columns.
  const fit = ([w, h]) =>
    `--w:${w};--h:${h};` + (w / h >= 1.6 || w >= 280 ? "grid-column:1/-1;--cols:1;" : "");

  for (const [id, p] of Object.entries(PROJECTS)) {
    const el = document.createElement("div");
    el.className = "case";
    el.setAttribute("aria-hidden", "true");
    el.innerHTML = `
      <button class="case__close" type="button">close ✕</button>
      <div class="case__info" id="case-${id}" style="${at(p.layout.info, 56)}">
        <p class="case__meta">${p.num} / ${p.type} · ${p.year}</p>
        <p class="case__who">client — ${p.client}<br>role — ${p.role}</p>
        <dl class="case__text">
          <dt>the brief</dt><dd>${p.brief}</dd>
          <dt>the thinking</dt><dd>${p.thinking}</dd>
          <dt>the outcome</dt><dd>${p.outcome}</dd>
        </dl>
      </div>
      ${p.gallery.map((g, i) => `
        <div class="case__g" style="${at(...p.layout.slots[i], ...(g.size || SLOTS[i]))}${fit(g.m || g.size || SLOTS[i])}--d:${150 + i * 70}ms">
          ${g.src ? `<img src="${g.src}" alt="">` : g.html}
        </div>`).join("")}
      <h2 class="case__title">${p.title}</h2>
    `;
    hero.append(el);
    cases[id] = el;
  }

  let active = null;
  let pinned = false;
  let timer = null;

  const open = (poster, pin = false) => {
    clearTimeout(timer);
    if (active === poster) {
      pinned ||= pin;
      return;
    }
    close();
    active = poster;
    pinned = pin;
    cases[poster.dataset.project].scrollTop = 0;
    hero.classList.add("is-casing");
    poster.classList.add("is-active");
    cases[poster.dataset.project].classList.add("is-open");
  };

  const close = () => {
    clearTimeout(timer);
    if (!active) return;
    hero.classList.remove("is-casing");
    active.classList.remove("is-active");
    cases[active.dataset.project].classList.remove("is-open");
    active = null;
    pinned = false;
  };

  for (const poster of posters) {
    const p = PROJECTS[poster.dataset.project];
    poster.tabIndex = 0;
    poster.setAttribute("aria-label", p.title);
    poster.setAttribute("aria-describedby", `case-${poster.dataset.project}`);

    poster.addEventListener("pointerenter", (e) => {
      if (e.pointerType !== "mouse") return;
      clearTimeout(timer);
      timer = setTimeout(() => open(poster), INTENT);
    });
    poster.addEventListener("pointerleave", (e) => {
      if (e.pointerType !== "mouse") return;
      clearTimeout(timer);
      if (active === poster && !pinned) close();
    });
    poster.addEventListener("click", () => (active === poster && pinned ? close() : open(poster, true)));
    poster.addEventListener("focus", () => poster.matches(":focus-visible") && open(poster));
    poster.addEventListener("blur", () => active === poster && !pinned && close());
  }

  // Any click off the open poster closes it (incl. the mobile sheet and its close button).
  document.addEventListener("click", (e) => active && !active.contains(e.target) && close());

  addEventListener("keydown", (e) => e.key === "Escape" && close());
  document.addEventListener("preview:hide", close);
})();
