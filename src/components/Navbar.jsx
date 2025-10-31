import React from "react";

export default function Navbar({ page, setPage }) {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Quantum Dice</div>
      <div className="nav-links">
        <button
          className={`nav-link ${page === "game" ? "active" : ""}`}
          onClick={() => setPage("game")}
        >
          Game
        </button>
        <button
          className={`nav-link ${page === "rules" ? "active" : ""}`}
          onClick={() => setPage("rules")}
        >
          Rules
        </button>
        <button
          className={`nav-link ${page === "leaderboard" ? "active" : ""}`}
          onClick={() => setPage("leaderboard")}
        >
          Leaderboard
        </button>
      </div>
    </nav>
  );
}