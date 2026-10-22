// "interested ??" flips every poster to its info card; "turn back" (or Esc) flips them back.
(() => {
  const hero = document.querySelector(".hero");
  const btn = hero.querySelector(".about-btn");
  const posters = hero.querySelectorAll(".poster");
  const cards = hero.querySelectorAll(".card");

  const set = (flipped) => {
    hero.classList.toggle("is-flipped", flipped);
    btn.setAttribute("aria-pressed", flipped);
    btn.textContent = flipped ? "turn back ↺" : "interested ??";
    posters.forEach((el) => (el.inert = flipped));
    cards.forEach((el) => (el.inert = !flipped));
    if (flipped) document.dispatchEvent(new Event("preview:hide"));
  };

  btn.addEventListener("click", () => set(!hero.classList.contains("is-flipped")));

  addEventListener("keydown", (e) => {
    if (e.key === "Escape" && hero.classList.contains("is-flipped")) set(false);
  });
})();
