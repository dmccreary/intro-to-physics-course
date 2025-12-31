// We'll build nodes programmatically so it's easier to read.

const nodes = new vis.DataSet();

// Calculate luminance to determine if text should be white or black
function getLuminance(hex) {
  // Convert hex to RGB
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  // Calculate relative luminance using sRGB color space
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance;
}

function addNode(id, label, color) {
  const luminance = getLuminance(color);
  const fontColor = luminance > 0.5 ? "#000" : "#fff";

  nodes.add({
    id: id,
    label: label,
    color: color,
    shape: "box",
    margin: 8,
    font: { size: 12, color: fontColor }
  });
}

// Simple color palette to keep things bright
const palette = [
  "#ffadad", "#ffd6a5", "#fdffb6", "#caffbf", "#9bf6ff",
  "#a0c4ff", "#bdb2ff", "#ffc6ff", "#e2f0cb", "#f1c0e8",
  "#ffafcc", "#d0f4de", "#fef9c3", "#e9d5ff", "#fbcfe8",
  "#bae6fd", "#f97316", "#facc15", "#22c55e", "#14b8a6",
  "#6366f1", "#8b5cf6", "#ec4899", "#f43f5e", "#0f766e"
];
let pc = 0;
function nextColor() {
  const c = palette[pc % palette.length];
  pc++;
  return c;
}

// ========== MAJOR BRANCHES ==========
addNode(1,  "Classical Mechanics",            nextColor());
addNode(2,  "Electromagnetism",               nextColor());
addNode(3,  "Optics",                         nextColor());
addNode(4,  "Quantum Physics",                nextColor());
addNode(5,  "Relativity",                     nextColor());
addNode(6,  "Astrophysics & Cosmology",       nextColor());
addNode(7,  "Condensed Matter Physics",       nextColor());
addNode(8,  "Nuclear & Particle Physics",     nextColor());
addNode(9,  "Geophysics & Atmospheric Physics", nextColor());
addNode(10, "Biophysics",                     nextColor());
addNode(11, "Computational & Theoretical Physics", nextColor());

// ========== SUBBRANCHES ==========

// 1. Classical Mechanics
addNode(101, "Statics & Dynamics",      nextColor());
addNode(102, "Fluid Mechanics",         nextColor());
addNode(103, "Acoustics",               nextColor());
addNode(104, "Thermodynamics",          nextColor());

// 2. Electromagnetism
addNode(201, "Electrostatics",               nextColor());
addNode(202, "Electrodynamics & Circuits",   nextColor());
addNode(203, "Magnetism",                    nextColor());
addNode(204, "Electromagnetic Waves",        nextColor());

// 3. Optics
addNode(301, "Geometrical Optics",     nextColor());
addNode(302, "Physical Optics",        nextColor());
addNode(303, "Quantum Optics",         nextColor());

// 4. Quantum Physics
addNode(401, "Quantum Mechanics",                      nextColor());
addNode(402, "Quantum Field Theory",                   nextColor());
addNode(403, "Quantum Info & Quantum Computing",       nextColor());

// 5. Relativity
addNode(501, "Special Relativity",     nextColor());
addNode(502, "General Relativity",     nextColor());
addNode(503, "Cosmological Relativity",nextColor());

// 6. Astrophysics & Cosmology
addNode(601, "Stellar Astrophysics",   nextColor());
addNode(602, "Planetary Science",      nextColor());
addNode(603, "Cosmology",              nextColor());

// 7. Condensed Matter
addNode(701, "Solid-State Physics",    nextColor());
addNode(702, "Soft Matter Physics",    nextColor());
addNode(703, "Materials Science",      nextColor());

// 8. Nuclear & Particle
addNode(801, "Nuclear Physics",        nextColor());
addNode(802, "Particle Physics",       nextColor());
addNode(803, "High-Energy Physics",    nextColor());

// 9. Geophysics & Atmospheric
addNode(901, "Seismology & Geodynamics",      nextColor());
addNode(902, "Meteorology & Climate Physics", nextColor());
addNode(903, "Oceanography & Planetary Physics", nextColor());

// 10. Biophysics
addNode(1001, "Molecular & Cellular Biophysics", nextColor());
addNode(1002, "Neurophysics",                    nextColor());
addNode(1003, "Biomechanics",                    nextColor());

// 11. Computational & Theoretical
addNode(1101, "Mathematical Physics", nextColor());
addNode(1102, "Computational Physics", nextColor());
addNode(1103, "Statistical Physics",   nextColor());

// ========== EDGES ==========
const edges = new vis.DataSet();

function dep(from, to) {
  edges.add({
    from: from,
    to: to,
    arrows: "to",
    label: "DEPENDS_ON",
    font: { size: 8 }
  });
}

// Major-to-major (as before)
dep(3, 2);        // Optics → EM
dep(4, 1);        // Quantum → Classical
dep(4, 2);        // Quantum → EM
dep(5, 1);        // Relativity → Classical
dep(6, 5);        // Astrophysics → Relativity
dep(6, 2);        // Astrophysics → EM
dep(6, 1);        // Astrophysics → Classical
dep(7, 4);        // Condensed → Quantum
dep(7, 2);        // Condensed → EM
dep(8, 4);        // Nuclear/Particle → Quantum
dep(9, 1);        // Geophysics → Classical
dep(9, 2);        // Geophysics → EM
dep(10, 1);       // Biophysics → Classical
dep(10, 2);       // Biophysics → EM
dep(10, 4);       // Biophysics → Quantum (for molecular)
dep(11, 1);       // Comp/Theoretical → Classical
dep(11, 4);       // Comp/Theoretical → Quantum

// 1. Classical Mechanics subbranches
dep(101, 1);
dep(102, 1);
dep(103, 1);
dep(104, 1);

// 2. Electromagnetism subbranches
dep(201, 2);
dep(202, 2);
dep(203, 2);
dep(204, 2);

// 3. Optics subbranches
dep(301, 3);
dep(302, 3);
// Quantum Optics depends on Optics and Quantum Physics
dep(303, 3);
dep(303, 4);

// 4. Quantum Physics subbranches
dep(401, 4);
dep(402, 4);
dep(403, 4);

// 5. Relativity subbranches
dep(501, 5);
dep(502, 5);
dep(503, 5);

// 6. Astrophysics subbranches
dep(601, 6);
dep(602, 6);
// Cosmology depends on Astrophysics & Relativity
dep(603, 6);
dep(603, 5);

// 7. Condensed Matter subbranches
dep(701, 7);
dep(702, 7);
dep(703, 7);

// 8. Nuclear & Particle subbranches
dep(801, 8);
dep(802, 8);
// High-Energy Physics depends on Particle Physics and QFT
dep(803, 8);
dep(803, 802);
dep(803, 402);  // QFT

// 9. Geophysics & Atmospheric subbranches
dep(901, 9);
dep(902, 9);
dep(903, 9);
// Meteorology also depends on Fluid Mechanics and Thermodynamics
dep(902, 102);  // fluid
dep(902, 104);  // thermo

// 10. Biophysics subbranches
dep(1001, 10);
dep(1001, 4);   // molecular often uses quantum/EM
dep(1002, 10);
dep(1002, 2);   // neuro → EM
dep(1003, 10);
dep(1003, 1);   // biomechanics → classical

// 11. Computational & Theoretical subbranches
dep(1101, 11);
dep(1102, 11);
dep(1102, 1);  // computational methods often for mechanics
dep(1102, 4);  // ...and quantum
dep(1103, 11);
dep(1103, 4);  // stat phys connects to quantum
dep(1103, 1);  // and classical ensembles

// Create and draw network
const container = document.getElementById("network");
const data = { nodes, edges };

const options = {
  layout: {
    improvedLayout: true,
    hierarchical: false
  },
  physics: {
    enabled: true,
    stabilization: {
      iterations: 200
    },
    barnesHut: {
      gravitationalConstant: -3000,
      springLength: 130,
      springConstant: 0.03
    }
  },
  edges: {
    smooth: {
      type: "dynamic"
    },
    color: {
      color: "#666",
      highlight: "#000",
      hover: "#000"
    }
  },
  interaction: {
    hover: true,
    tooltipDelay: 120,
    zoomView: false,
    dragView: true,
    navigationButtons: true,
    keyboard: true
  }
};

const network = new vis.Network(container, data, options);

// Optional: log selected node to console
network.on("selectNode", (params) => {
  const id = params.nodes[0];
  if (id) {
    const n = nodes.get(id);
    console.log("Selected:", n.label);
  }
});
