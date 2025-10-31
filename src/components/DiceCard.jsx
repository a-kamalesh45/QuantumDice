import React from "react";
import "./DiceCard.css";
import DiceCube from "./DiceCube";

export default function DiceCard({
  idx,
  face,
  history,
  guess,
  setGuess,
  dieOptions,
  rolling,
  guesses, // NEW: Receive all current guesses
}) {
  return (
    <div className="dice-card">
      <div className="dice-card-header">
        <div>
          <h3 className="dice-card-title">Die #{idx + 1}</h3>
          <p className="dice-card-subtitle">Observe & infer</p>
        </div>
        <DiceCube face={face} />
      </div>

      <div className="dice-history-section">
        <div className="dice-history-header">
          <label className="dice-card-subtitle">Previous Results</label>
          <div className="dice-card-subtitle">Oldest → Newest</div>
        </div>
        <div className="dice-history">
          {history.length === 0 ? (
            <div className="no-rolls">No rolls yet</div>
          ) : (
            history.map((r, i) => (
              <div key={i} title={`Roll ${i + 1}`}>
                {r}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="dice-select-wrapper">
        <select
          className="dice-select"
          value={guess || ""}
          onChange={(e) => setGuess(e.target.value)}
        >
          <option value="">Select your guess...</option>
          {dieOptions.map((d) => {
            // NEW LOGIC: Check if this option is used by *another* die
            const isUsed = guesses.includes(d.id) && d.id !== guess;

            return (
              <option
                key={d.id}
                value={d.id}
                disabled={isUsed} // Disable if used elsewhere
              >
                {d.name} ({d.description})
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}