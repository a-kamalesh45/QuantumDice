import React from "react";
import "./Leaderboard.css";

export default function Leaderboard({ list, onClear }) {
  // Sort list by score descending
  const sortedList = [...list].sort((a, b) => b.score - a.score);

  return (
    // This is now wrapped in a card by page.jsx,
    // but we'll make it a card itself for standalone use.
    <div className="card leaderboard-page"> 
      <div className="leaderboard-header">
        <h4 className="leaderboard-title">Leaderboard</h4>
        <button className="btn-link" onClick={onClear}>
          Clear All
        </button>
      </div>

      <div className="leaderboard-body">
        {sortedList.length === 0 ? (
          <div className="leaderboard-empty">No scores yet. Be the first!</div>
        ) : (
          <ol className="leaderboard-list">
            {sortedList.map((it, idx) => (
              <li key={idx} className="leaderboard-item">
                <div className="leaderboard-rank">{idx + 1}</div>
                <div className="leaderboard-details">
                  <div className="leaderboard-name">{it.name}</div>
                  <div className="leaderboard-meta">
                    {new Date(it.timestamp).toLocaleString()} • Rolls: {it.rolls}
                  </div>
                </div>
                <div className="leaderboard-score">{it.score}</div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}