// utils/scoring.js

/**
 * Calculates the final score based on guesses, truth, and rolls.
 */
export function computeScore({ guesses, truth, rollsUsed, maxRolls }) {
  let correct = 0;
  
  for (let i = 0; i < truth.length; i++) {
    if (truth[i] === guesses[i]) {
      correct++;
    }
  }

  // Define scoring rules
  const correctPoints = correct * 50;
  // NEW: Simplified penalty to match the live score display
  const penalty = rollsUsed * 5; 
  
  // Calculate final score, ensuring it doesn't go below 0
  const final = Math.max(0, correctPoints - penalty);

  return { final, correct, correctPoints, penalty, rollsUsed };
}