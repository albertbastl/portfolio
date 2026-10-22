// Case preview data. Keys match data-project on posters.
// layout: coords in the 1276×728 brief frame (preview.js scales them).
//   info = x of the text block (half opposite the poster),
//   slots = [x, y] for gallery items 1–6, clustered around the poster
//   (fixed sizes: 150×200 · 272×200 · 200×220 · 104×220 · 104×220 · 120×120).
// gallery: { src } for a real image, { html } for a mockup; optional size: [w, h] overrides the slot size,
//   optional m: [w, h] = slot size on the phone sheet (w >= 280 or w/h >= 1.6 spans the full width).
// cut(): Segmento's sliced type — top piece above the slit, segment below (optionally shifted).
// TODO: mockups are stand-ins — swap for real project assets ({ src: "assets/…" }).
const cut = (text, top, bottom = top, shift = 0, size) =>
  `<span class="g-cut${text.length === 1 ? " g-cut--s" : ""}"${size ? ` style="font-size:${size}"` : ""}>` +
  `<span style="color:${top}">${text}</span><span style="color:${bottom}${shift ? `;left:${shift}` : ""}">${text}</span></span>`;

const PROJECTS = {
  "build-station": {
    num: "01", type: "hackathon landing page", year: "2026",
    title: "Build Station",
    client: "Solana CZE, Zero to Hero 2.0", role: "web design, development",
    brief: "Landing page for a 5-day Prague hackathon with a $10k+ local prize pool. Easy to read and navigate, with every piece of info in one place: schedule, prizes, sponsors.",
    thinking: "Kept their established brand: the gradient and the stacked bars. The hero's hook is a big 3D Solana mark built from cubes. Dark sections and gradient type give it a modern web3 feel.",
    outcome: "buildstation.cz website, which served 200+ people, with the biggest sponsors in the blockchain field.",
    // Poster left (71–241 × 119–346): site hero on top, 3D hook · schedule · palette below, partners under the poster.
    layout: { info: 760, slots: [[270, 40], [270, 344], [486, 344], [71, 362], [486, 490]] },
    gallery: [
      { size: [460, 288], src: "assets/buildstation-hero.jpg" },
      { size: [200, 196], src: "assets/buildstation-3d.jpg" },
      { size: [244, 138], src: "assets/buildstation-schedule.jpg" },
      { size: [170, 135], src: "assets/buildstation-partners.jpg" },
      { size: [244, 50], html: `<div class="g-palette g-palette--row g-mono">
        <i style="background:#14bdf0;color:#0a0a0a">#14bdf0</i>
        <i style="background:#0b3fd9;color:#fff">#0b3fd9</i>
        <i style="background:#7c2ff0;color:#fff">#7c2ff0</i>
        <i style="background:#c01f9e;color:#fff">#c01f9e</i>
        <i style="background:#ff2340;color:#fff">#ff2340</i>
      </div>` },
    ],
  },
  "na-skalu": {
    num: "02", type: "community website", year: "2026",
    title: "naskalu.cz",
    client: "personal, with Jakub Frgal", role: "logo, web design",
    brief: "Started as a dream: my friend and I couldn't find boulders in nature, so we built a community website where climbers map them together.",
    thinking: "Simple and straightforward, easy to use even for older climbers. Orange for a warm community feel.",
    outcome: "naskalu.cz, used by climbers across the Czech Republic to find outdoor climbing spots.",
    // Poster (359–456 × 76–206): logo left of it, boulder routes (main) under; right column hero · login · palette, bottom flush with the main shot.
    layout: { info: 740, slots: [[40, 100], [40, 236], [490, 56], [490, 241], [490, 426]] },
    gallery: [
      { size: [290, 79], src: "assets/naskalu-logo.png" },
      { size: [420, 240], src: "assets/naskalu-boulder.jpg" },
      { size: [226, 129], src: "assets/naskalu-hero.jpg" },
      { size: [226, 129], src: "assets/naskalu-login.jpg" },
      { size: [226, 50], html: `<div class="g-palette g-palette--row g-mono">
        <i style="background:#0a0a0a;color:#fff">#0a0a0a</i>
        <i style="background:#dc5f00;color:#fff">#dc5f00</i>
        <i style="background:#fff;color:#0a0a0a">#ffffff</i>
      </div>` },
    ],
  },
  segmento: {
    num: "03", type: "identity redesign", year: "2026",
    title: "Segmento",
    client: "Segmento, Prague", role: "logo, wordmark, brand system",
    brief: "Crypto analytics. Keep the letter S, but make the wordmark strong enough to carry the brand on its own.",
    thinking: "Purple taken from the established branding, set on dark for a modern web3 feel. The word is split into parts, like segments.",
    outcome: "Full brand redesign, new X and website graphics, pitch deck branding. Won best presentation at Build Station 2026 hackathon.",
    // Loose scatter around the poster (837–1019 × 56–300), staggered edges; right side runs lower (title only spans the left).
    layout: { info: 60, slots: [[580, 36], [1056, 60], [570, 290], [900, 380], [1140, 352]] },
    gallery: [
      // Phone: X + S squares side by side, then wordmark banner, deck, palette strip.
      { size: [220, 214], m: [200, 200], src: "assets/segmento-x.jpg" },
      { size: [204, 250], m: [288, 104], html: `<div class="g-col" style="background:#0c0d0f;align-items:center;justify-content:center">
        ${cut("segmento", "#f2f2ef", "#f2f2ef", 0, "3.6em")}
      </div>` },
      { size: [288, 162], src: "assets/segmento-deck.jpg" },
      { size: [200, 200], html: `<div class="g-col" style="background:#9c7bfa;align-items:center;justify-content:center">
        ${cut("s", "#f2f2ef", "#0c0d0f", 0, "20em")}
      </div>` },
      { size: [104, 236], m: [288, 56], html: `<div class="g-palette g-mono">
        <i style="flex:6;background:#0c0d0f;color:#f2f2ef">#0c0d0f</i>
        <i style="flex:3;background:#f2f2ef;color:#0c0d0f">#f2f2ef</i>
        <i style="flex:2;background:#9c7bfa;color:#0c0d0f">#9c7bfa</i>
      </div>` },
    ],
  },
  "forest-spirit": {
    num: "04", type: "photography", year: "2025",
    title: "Forest Spirit",
    client: "personal, fanal, madeira", role: "photography, poster",
    brief: "Moody forest shot, deep silhouettes, meaning left open to abstraction.",
    thinking: "Whole day in Fanal forest, waiting for the fog to strip the old laurels down to shapes.",
    outcome: "My best photo, the centre of a Madeira trilogy, later pushed to acid green for the poster.",
    // Trilogy: hero shot big, the other two stacked on the side, framing the poster.
    layout: { info: 60, slots: [[556, 130], [1030, 66], [1030, 432]] },
    gallery: [
      { size: [440, 293], html: `<div class="g-col g-photo">
        <img src="assets/madeira-fanal.jpg" alt="Twisted laurel trees in fog, Fanal forest">
        <span class="g-mono g-cap">i. forest spirit</span>
      </div>` },
      { size: [220, 147], m: [288, 192], html: `<div class="g-col g-photo">
        <img src="assets/madeira-fence.jpg" alt="Mossy laurels behind a wire fence in fog">
        <span class="g-mono g-cap">ii. where cows get lost</span>
      </div>` },
      { size: [220, 124], html: `<div class="g-col g-photo">
        <img src="assets/madeira-coast.jpg" alt="Ponta de São Lourenço coastline, Madeira">
        <span class="g-mono g-cap">iii. smell of sardines</span>
      </div>` },
    ],
  },
};
