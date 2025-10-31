import "./App.css";
import React, { useState, useEffect } from "react"; // Import useEffect
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Controls from "./components/Controls";
import DiceCard from "./components/DiceCard";
import GuessPanel from "./components/GuessPanel";
import ResultModal from "./components/ResultModal";
import Leaderboard from "./components/Leaderboard";
import Rules from "./components/Rules";
import { rollForType } from "./utils/diceLogic";
import { computeScore } from "./utils/scoring"; // Import new scoring logic
import {
  loadLeaderboard,
  saveEntry,
  clearLeaderboard,
} from "./utils/leaderboard";

/* *** SINGLE SOURCE OF TRUTH FOR DIE TYPES *** */
const DIE_TYPES = [
  { id: "L", name: "Weighted Low", description: "1–3 favored" },
  { id: "F", name: "Fair", description: "Even 1-6 odds" },
  { id: "H", name: "Weighted High", description: "4–6 favored" },
  { id: "S", name: "Double Six", description: "High chance of a 6" },
  { id: "T", name: "Triple One", description: "High chance of a 1" },
];

/* ---------------------- Utility ---------------------- */
function makeRandomMapping() {
  const ids = DIE_TYPES.map((d) => d.id);
  const copy = [...ids];
  const result = [];
  while (copy.length) {
    const index = Math.floor(Math.random() * copy.length);
    result.push(copy.splice(index, 1)[0]);
  }
  return result;
}

/* ---------------------- Sound Hook ---------------------- */
function useTinySound() {
  const ctxRef = React.useRef(null);
  function ensureContext() {
    if (!ctxRef.current)
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    return ctxRef.current;
  }
  function beep(freq = 440, duration = 0.12, type = "sine", gain = 0.12) {
    const ctx = ensureContext();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type;
    o.frequency.value = freq;
    g.gain.value = gain;
    o.connect(g);
    g.connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime + duration);
  }
  function rollSound() {
    beep(360, 0.08, "triangle", 0.09);
    setTimeout(() => beep(420, 0.08, "sine", 0.08), 80);
  }
  function success() {
    beep(700, 0.14, "sine", 0.12);
    setTimeout(() => beep(820, 0.12, "sine", 0.1), 120);
  }
  function wrong() {
    beep(180, 0.28, "sawtooth", 0.12);
  }
  return { rollSound, success, wrong };
}

/* ---------------------- Main Page ---------------------- */
export default function Page() {
  const MAX_ROLLS = 15;

  const [truth, setTruth] = useState(() => makeRandomMapping());
  const [faces, setFaces] = useState(Array(5).fill(null));
  const [histories, setHistories] = useState(Array(5).fill([]));
  const [rolls, setRolls] = useState(0);
  const [guesses, setGuesses] = useState(Array(5).fill(""));
  const [rolling, setRolling] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [result, setResult] = useState(null);
  const [leaderboard, setLeaderboard] = useState(() => loadLeaderboard());
  const [page, setPage] = useState("game");

  // NEW: State for the live penalty score
  const [livePenalty, setLivePenalty] = useState(0);

  const sound = useTinySound();

  // NEW: Effect to update the live penalty score whenever rolls change
  useEffect(() => {
    // This simple formula provides a live score as requested
    // It's consistent with the scoring.js logic
    setLivePenalty(rolls * 5);
  }, [rolls]);

  function newGame() {
    setTruth(makeRandomMapping());
    setFaces(Array(5).fill(null));
    setHistories(Array(5).fill([]));
    setRolls(0);
    setGuesses(Array(5).fill(""));
    setResult(null);
    setModalOpen(false);
    setPage("game"); // <--FIX: Navigate back to the game page
  }

  function onRoll() {
    if (rolls >= MAX_ROLLS) return;
    setRolling(true);
    sound.rollSound();

    setTimeout(() => {
      const newFaces = [...faces];
      const newHistories = histories.map((h) => [...h]);
      for (let i = 0; i < 5; i++) {
        const t = truth[i];
        const rolled = rollForType(t);
        newFaces[i] = rolled;
        newHistories[i].push(rolled);
      }
      setFaces(newFaces);
      setHistories(newHistories);
      setRolls((r) => r + 1);
      setRolling(false);
    }, 500);
  }

  function setGuessAt(index, val) {
    setGuesses((prev) => {
      const copy = [...prev];
      copy[index] = val;
      return copy;
    });
  }

  function onSubmit() {
    const scoring = computeScore({
      guesses,
      truth,
      rollsUsed: rolls,
      maxRolls: MAX_ROLLS,
    });
    setResult(scoring);
    setModalOpen(true);
    if (scoring.correct === truth.length) sound.success();
    else sound.wrong();
  }

  function handleSave(entry) {
    const updatedList = saveEntry(entry);
    setLeaderboard(updatedList);
    setModalOpen(false);
    setPage("leaderboard");
  }

  function handleClearLeaderboard() {
    clearLeaderboard();
    setLeaderboard([]);
  }

  function renderPage() {
    switch (page) {
      case "game":
        return (
          <div className="main-grid">
            <div className="main-section">
              <div className="card">
                <Controls
                  onRoll={onRoll}
                  onSubmit={onSubmit}
                  rolls={rolls}
                  maxRolls={MAX_ROLLS}
                  disabledRoll={rolls >= MAX_ROLLS}
                />

                <hr
                  style={{
                    border: "none",
                    borderTop: "1px solid var(--border-color)",
                    margin: "24px 0",
                  }}
                />

                <div className="dice-grid">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <DiceCard
                      key={i}
                      idx={i}
                      face={faces[i]}
                      history={histories[i]}
                      guess={guesses[i]}
                      setGuess={(val) => setGuessAt(i, val)}
                      dieOptions={DIE_TYPES}
                      rolling={rolling}
                      // NEW: Pass all current guesses
                      guesses={guesses}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="bottom-grid">
              <div className="card">
                <h4>Status</h4>
                {/* NEW: Updated Status Card */}
                <p className="status-line">
                  <span>Rolls used:</span>{" "}
                  <strong>
                    {rolls} / {MAX_ROLLS}
                  </strong>
                </p>
                <p className="status-line">
                  <span>Current Penalty:</span>{" "}
                  <strong className="penalty-score">-{livePenalty}</strong>
                </p>
              </div>
              <div className="card">
                <GuessPanel
                  guesses={guesses}
                  setGuesses={setGuesses}
                  dieOptions={DIE_TYPES}
                />
              </div>
            </div>
          </div>
        );
      case "rules":
        return <Rules dieOptions={DIE_TYPES} />;
      case "leaderboard":
        return (
          <Leaderboard list={leaderboard} onClear={handleClearLeaderboard} />
        );
      default:
        return null;
    }
  }

  return (
    <div>
      <Navbar page={page} setPage={setPage} />
      <div className="app-shell">
        <Header onNewGame={newGame} />
        {renderPage()}
      </div>
      <ResultModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        result={
          result || {
            final: 0,
            correct: 0,
            correctPoints: 0,
            penalty: 0,
            rollsUsed: rolls,
          }
        }
        truth={truth}
        guesses={guesses}
        dieOptions={DIE_TYPES}
        onSave={handleSave}
      />
    </div>
  );
}