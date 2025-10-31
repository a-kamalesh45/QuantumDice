// diceLogic.js
// Exports helpers for rolling the five dice types.
// Each roll returns an integer 1..6

// Weighted helper: accepts array of weights length 6
function weightedRoll(weights) {
  const total = weights.reduce((a, b) => a + b, 0);
  let r = Math.random() * total;
  for (let i = 0; i < weights.length; i++) {
    if (r < weights[i]) return i + 1;
    r -= weights[i];
  }
  return 6;
}

export function rollFair() {
  return Math.floor(Math.random() * 6) + 1;
}

export function rollWeightedLow() {
  // higher weight for 1-3
  const w = [2.2, 2.0, 2.0, 1.0, 0.9, 0.9];
  return weightedRoll(w);
}

export function rollWeightedHigh() {
  // higher weight for 4-6
  const w = [0.9, 1.0, 1.0, 2.0, 2.0, 2.2];
  return weightedRoll(w);
}

export function rollDoubleSix() {
  // Two faces are 6 -> simulate by higher weight on 6
  const w = [1,1,1,1,1,3];
  return weightedRoll(w);
}

// Triple One: 3 faces are 1; remaining three faces are randomized per roll
export function rollTripleOneRandomized() {
  // create per-roll faces: 3 x 1 plus random unique other faces
  const remainingFaces = [2,3,4,5,6].sort(() => Math.random() - 0.5).slice(0,3);
  // Build an array of six face values (values on faces)
  const faceValues = [1,1,1, ...remainingFaces];
  // Randomly pick a face index
  const idx = Math.floor(Math.random() * 6);
  return faceValues[idx];
}

// Helpers used by app to identify types
export const DIE_TYPES = [
  { id: "L", name: "Weighted Low" },
  { id: "F", name: "Fair" },
  { id: "H", name: "Weighted High" },
  { id: "S", name: "Double Six" },
  { id: "T", name: "Triple One" }
];

// A generic roll function that takes type id and optional quantum drift
export function rollForType(typeId, opts = {}) {
  const { quantumMode = false } = opts;
  // Quantum mode small random perturbation could slightly adjust selection
  switch (typeId) {
    case "L":
      return rollWeightedLow();
    case "F":
      return rollFair();
    case "H":
      return rollWeightedHigh();
    case "S":
      return rollDoubleSix();
    case "T":
      return rollTripleOneRandomized();
    default:
      return rollFair();
  }
}
