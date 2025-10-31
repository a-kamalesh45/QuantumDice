import React from "react";
import "./Rules.css";

export default function Rules({ dieOptions }) {
  return (
    <div className="card">
      <h2>How to Play</h2>
      <p className="rules-intro">
        Welcome to Quantum Dice! The goal is simple: correctly identify all five
        hidden dice types in as few rolls as possible.
      </p>

      <div className="rules-section">
        <h3>1. Roll the Dice</h3>
        <p>
          Click the <strong>"Roll"</strong> button to roll all five dice at once.
          Each die has a hidden "type" that biases its rolls. You have a maximum
          of 15 rolls to gather information.
        </p>
      </div>

      <div className="rules-section">
        <h3>2. Observe & Infer</h3>
        <p>
          Watch the "Previous Results" for each die. If you see a lot of 1s and
          2s, it's probably a "Weighted Low" die. If you see a lot of 6s, it
          could be "Weighted High" or "Double Six."
        </p>
      </div>

      <div className="rules-section">
        <h3>3. Know The Die Types</h3>
        <p>
          There are 5 possible types, one for each die. The mapping is
          randomized every new game.
        </p>
        <ul className="die-types-list">
          {dieOptions.map((type) => (
            <li key={type.id}>
              <strong>{type.name}:</strong> {type.description}
            </li>
          ))}
        </ul>
      </div>

      <div className="rules-section">
        <h3>4. Make Your Guess</h3>
        <p>
          Use the dropdown menu on each die's card to select your guess for that
          die. You can change your guesses at any time before submitting.
        </p>
      </div>

      <div className="rules-section">
        <h3>5. Submit & Score</h3>
        <p>
          When you're confident, click the <strong>"Submit Guess"</strong>{" "}
          button. Your score is based on how many dice you identified correctly
          and how few rolls you used. Good luck!
        </p>
      </div>
    </div>
  );
}