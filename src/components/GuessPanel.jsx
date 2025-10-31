// GuessPanel.jsx
import React from "react";
import "./GuessPanel.css";

/**
 * Displays current guesses succinctly and allows clearing.
 */
export default function GuessPanel({ guesses, setGuesses, dieOptions }) {
  function clear() {
    setGuesses(Array(5).fill(""));
  }

  return (
    <div className="guess-panel">
      <div className="guess-panel-header">
        <h4 className="guess-title">Current Guesses</h4>
        <button className="btn-link" onClick={clear}>
          Clear
        </button>
      </div>

      <div className="guess-grid">
        {guesses.map((g, i) => {
          /* *** THE 2ND KEY UX FIX ***
            We map the ID ('L') back to the full name.
          */
          const die = dieOptions.find((opt) => opt.id === g);
          const label = die ? die.name : "—";
          
          return (
            <div key={i} className="guess-cell">
              <div className="guess-die">Die {i + 1}</div>
              <div className="guess-label">{label}</div>
            </div>
          );
        })}
      </div>

      <div className="guess-tip">
        Tip: You can change guesses any time before submitting.
      </div>
    </div>
  );
}