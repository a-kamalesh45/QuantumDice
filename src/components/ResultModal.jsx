import React, { useState } from "react";
import { motion } from "framer-motion";
import "./ResultModal.css";

export default function ResultModal({
  open,
  onClose,
  result,
  truth,
  guesses,
  dieOptions, // NEW
  onSave,
}) {
  const [name, setName] = useState("");

  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-backdrop" onClick={onClose} />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="modal-content"
      >
        <h2 className="modal-title">Results</h2>
        <p className="modal-note">
          You got {result.correct} / {truth.length} correct.
        </p>

        <div className="result-grid">
          <div className="result-card score-card">
            <div className="result-heading">Final Score</div>
            <div className="result-number">{result.final}</div>
            <div className="result-small">Rolls used: {result.rollsUsed}</div>
          </div>
          <div className="result-card">
            <div className="result-heading">Breakdown</div>
            <div className="result-small">
              Correct points: {result.correctPoints}
            </div>
            <div className="result-small">Penalty: {result.penalty}</div>
          </div>
        </div>

        <div className="truth-section">
          <h4 className="result-heading">Truth vs. Your Guess</h4>
          <div className="truth-grid">
            {truth.map((t, i) => {
              const ok = t === guesses[i];
              // Get full names for clarity
              const truthName = dieOptions.find((d) => d.id === t)?.name || t;
              const guessName =
                dieOptions.find((d) => d.id === guesses[i])?.name || "—";

              return (
                <div
                  key={i}
                  className={`truth-cell ${ok ? "truth-ok" : "truth-bad"}`}
                >
                  <div className="truth-title">Die {i + 1}</div>
                  <div className="truth-text">
                    <strong>Truth:</strong> {truthName}
                  </div>
                  <div className="truth-text">
                    <strong>You:</strong> {guessName}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="modal-actions">
          <input
            className="name-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name for leaderboard"
          />
          <button
            className="btn btn-primary"
            onClick={() => {
              onSave({
                name: name || "Anonymous",
                score: result.final,
                rolls: result.rollsUsed,
                timestamp: Date.now(),
              });
            }}
          >
            Save & View Leaderboard
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}