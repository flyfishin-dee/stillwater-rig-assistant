
const rigs = {
  "Indicator / Bung": {
    line: "Floating",
    leaderLength: "7.5 ft",
    leaderX: "3X",
    tippetLength: "2–3 ft to start",
    material: "Fluorocarbon",
    minDiameter: 0.16,
    maxDiameter: 0.22,
    tip: "Adjust the indicator-to-fly distance to fish at the correct depth."
  },
  "Static Buzzers": {
    line: "Floating",
    leaderLength: "9 ft",
    leaderX: "4X",
    tippetLength: "2–3 ft",
    material: "Fluorocarbon",
    minDiameter: 0.14,
    maxDiameter: 0.20,
    tip: "Fish slowly or static. Change depth before changing your fly."
  },
  "Dry Fly": {
    line: "Floating",
    leaderLength: "9 ft",
    leaderX: "4X",
    tippetLength: "2–3 ft",
    material: "Nylon / Copolymer",
    minDiameter: 0.14,
    maxDiameter: 0.18,
    tip: "Aim for a natural, drag-free presentation."
  },
  "Washing Line": {
    line: "Floating / Midge-tip",
    leaderLength: "9 ft",
    leaderX: "3X",
    tippetLength: "3–5 ft including fly spacing",
    material: "Fluorocarbon",
    minDiameter: 0.18,
    maxDiameter: 0.23,
    tip: "Retrieve slowly and keep your flies fishing in the upper layers."
  },
  "Pulling Lures": {
    line: "Intermediate / Sinking",
    leaderLength: "5–7.5 ft",
    leaderX: "2X",
    tippetLength: "1–2 ft if needed",
    material: "Fluorocarbon / Nylon",
    minDiameter: 0.20,
    maxDiameter: 0.26,
    tip: "Use stronger tippet for heavy lures and aggressive retrieves."
  }
};

const $ = id => document.getElementById(id);

function approximateX(diameter) {
  if (diameter <= 0.11) return "7X";
  if (diameter <= 0.13) return "6X";
  if (diameter <= 0.15) return "5X";
  if (diameter <= 0.18) return "4X";
  if (diameter <= 0.20) return "3X";
  if (diameter <= 0.23) return "2X";
  if (diameter <= 0.25) return "1X";
  return "0X";
}

$("find").addEventListener("click", () => {
  const method = $("method").value;
  const fly = Number($("fly").value);
  const water = $("water").value;
  const r = rigs[method];

  let diameter;

  if (fly >= 18) {
    diameter = r.minDiameter;
  } else if (fly <= 10) {
    diameter = r.maxDiameter;
  } else {
    diameter = (r.minDiameter + r.maxDiameter) / 2;
  }

  if (water === "Calm") {
    diameter -= 0.01;
  } else if (water === "Windy") {
    diameter += 0.02;
  }

  diameter = Math.max(
    r.minDiameter,
    Math.min(r.maxDiameter, diameter)
  );

  diameter = Math.round(diameter * 100) / 100;

  const tippetX = approximateX(diameter);

  const rows = [
    ["Fly line", r.line],
    ["Leader length", r.leaderLength],
    ["Leader tip", r.leaderX],
    ["Tippet length", r.tippetLength],
    ["Tippet rating", tippetX + " (approx.)"],
    ["Tippet material", r.material],
    ["Tippet diameter", diameter.toFixed(2) + " mm"],
    ["Joining knot", "Double Uni or blood knot"]
  ];

  const rowHTML = rows.map(([label, value]) => `
    <div class="line">
      <span>${label}</span>
      <span>${value}</span>
    </div>
  `).join("");

  $("result").innerHTML = `
    <h2>Your recommended starting rig</h2>

    <div class="note">
      ${method} · Size ${fly} · ${water}
    </div>

    ${rowHTML}

    <h3>Rig assembly</h3>
    <div class="diagram">
      Fly line → ${r.leaderX} leader
      → ${tippetX} tippet → Fly
    </div>

    <h3>Fishing tip</h3>
    <p>${r.tip}</p>

    <p class="note">
      Recommendations are starting points for stocked
      stillwater trout. X ratings are approximate:
      check the actual diameter and breaking strain
      of your chosen brand. Use stronger tippet where
      fly weight, fish size or conditions require it.
    </p>
  `;

  $("result").style.display = "block";
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}
