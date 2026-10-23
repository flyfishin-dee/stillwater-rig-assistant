
const rigs = {
  "Indicator / Bung": {
    line: "Floating",
    leaderLength: "7.5 ft",
    leaderX: "3X",
    tippetLength: "2–3 ft to start",
    tippetX: "4X",
    material: "Fluorocarbon",
    diameter: "0.18 mm",
    knot: "Double Uni or blood knot",
    tip: "Adjust the depth below the indicator to find the fish. For deeper fishing, increase the distance from indicator to fly."
  },
  "Static Buzzers": {
    line: "Floating",
    leaderLength: "9 ft",
    leaderX: "4X",
    tippetLength: "2–3 ft",
    tippetX: "4X–5X",
    material: "Fluorocarbon",
    diameter: "0.15–0.18 mm",
    knot: "Double Uni or blood knot",
    tip: "Fish slowly or static. Adjust depth and fly spacing to suit the conditions."
  },
  "Dry Fly": {
    line: "Floating",
    leaderLength: "9 ft",
    leaderX: "4X",
    tippetLength: "2–3 ft",
    tippetX: "5X",
    material: "Nylon / Copolymer",
    diameter: "0.15 mm",
    knot: "Double Uni or blood knot",
    tip: "Aim for a natural presentation without drag. Use a finer tippet for small flies when conditions allow."
  },
  "Washing Line": {
    line: "Floating / Midge-tip",
    leaderLength: "9 ft",
    leaderX: "3X",
    tippetLength: "3–5 ft including fly spacing",
    tippetX: "3X–4X",
    material: "Fluorocarbon",
    diameter: "0.18–0.20 mm",
    knot: "Double Uni or blood knot",
    tip: "Fish the upper layers with a slow retrieve. Adjust the spacing between flies and the buoyancy of your point fly."
  },
  "Pulling Lures": {
    line: "Intermediate / Sinking",
    leaderLength: "5–7.5 ft",
    leaderX: "2X",
    tippetLength: "1–2 ft if needed",
    tippetX: "2X–3X",
    material: "Fluorocarbon / Nylon",
    diameter: "0.20–0.23 mm",
    knot: "Double Uni or blood knot",
    tip: "Use a shorter, stronger setup for larger flies. Match your retrieve speed and sinking line to the depth."
  }
};

const $ = id => document.getElementById(id);

$("find").addEventListener("click", () => {
  const method = $("method").value;
  const fly = Number($("fly").value);
  const water = $("water").value;
  const r = rigs[method];

  const rows = [
    ["Fly line", r.line],
    ["Leader length", r.leaderLength],
    ["Leader tip", r.leaderX],
    ["Tippet length", r.tippetLength],
    ["Tippet rating", r.tippetX],
    ["Tippet material", r.material],
    ["Typical diameter", r.diameter],
    ["Joining knot", r.knot]
  ];

  const rowHTML = rows.map(([label, value]) => `
    <div class="line">
      <span>${label}</span>
      <span>${value}</span>
    </div>
  `).join("");

  const html = `
    <h2>Your recommended starting rig</h2>
    <div class="note">
      ${method} · Size ${fly} · ${water}
    </div>

    ${rowHTML}

    <h3>Rig assembly</h3>
    <div class="diagram">
      Fly line → ${r.leaderX} leader
      → ${r.tippetX} tippet → Fly
    </div>

    <h3>Fishing tip</h3>
    <p>${r.tip}</p>

    <p class="note">
      These are starting recommendations.
      Fly size and water conditions are not yet used
      to refine the leader and tippet ratings.
      Check the actual diameter and breaking strain
      of your chosen brand.
    </p>
  `;

  $("result").innerHTML = html;
  $("result").style.display = "block";
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./sw.js")
      .catch(() => {});
  });
}
