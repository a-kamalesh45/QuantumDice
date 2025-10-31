import React from "react";
import "./Header.css";

export default function Header({ onNewGame }) {
  return (
    <header className="header">
      <div>
        <h1 className="header-title">Quantum Dice</h1>
        <p className="header-description">
          Infer hidden dice biases by rolling, observing, and guessing. Each die
          behaves differently — use probability and observation to deduce which
          is which.
        </p>
      </div>
      <button className="btn btn-secondary" onClick={onNewGame}>
        New Game
      </button>
    </header>
  );
}