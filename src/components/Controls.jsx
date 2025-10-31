import React from "react";
import "./Controls.css";

export default function Controls({
  onRoll,
  onSubmit,
  rolls,
  maxRolls,
  disabledRoll,
}) {
  return (
    <div className="controls-container">
      <div className="button-group">
        <button
          className={`btn btn-cta ${disabledRoll ? "disabled" : ""}`}
          onClick={onRoll}
          disabled={disabledRoll}
        >
          Roll ({rolls}/{maxRolls})
        </button>
        <button className="btn btn-primary" onClick={onSubmit}>
          Submit Guess
        </button>
      </div>
    </div>
  );
}