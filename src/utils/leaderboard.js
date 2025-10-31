// leaderboard.js
const KEY = "quantum_dice_leaderboard_v1";

export function loadLeaderboard() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveEntry(entry) {
  const list = loadLeaderboard();
  list.push(entry);
  // sort descending
  list.sort((a,b) => b.score - a.score);
  // keep top 50
  const trimmed = list.slice(0,50);
  localStorage.setItem(KEY, JSON.stringify(trimmed));
  return trimmed;
}

export function clearLeaderboard() {
  localStorage.removeItem(KEY);
}
