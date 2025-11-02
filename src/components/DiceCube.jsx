// src/components/DiceCube.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./DiceCube.css"; // We will create this file next

// Helper function to get the transform string for a specific face
function getRotationForFace(face) {
  switch (face) {
    case 1:
      return "rotateX(0deg) rotateY(0deg)";
    case 2:
      return "rotateX(0deg) rotateY(-90deg)";
    case 3:
      return "rotateX(90deg) rotateY(0deg)";
    case 4:
      return "rotateX(-90deg) rotateY(0deg)";
    case 5:
      return "rotateX(0deg) rotateY(90deg)";
    case 6:
      return "rotateX(180deg) rotateY(0deg)";
    default:
      // Initial "blank" state
      return "rotateX(-45deg) rotateY(45deg)";
  }
}

export default function DiceCube({ face }) {
  const [rotation, setRotation] = useState(getRotationForFace(null));

  // This effect runs whenever the 'face' prop changes
  useEffect(() => {
    if (face === null) {
      // Reset to initial state
      setRotation(getRotationForFace(null));
      return;
    }

    // Get the target rotation
    const targetRotation = getRotationForFace(face);

    // Add 2-3 full random spins for a dynamic "roll" effect
    const randomSpinsX = Math.floor(Math.random() * 2) + 2; // 2 or 3 spins
    const randomSpinsY = Math.floor(Math.random() * 2) + 2; // 2 or 3 spins

    // We can't just add degrees, so we reconstruct the string.
    // This is a limitation of CSS transforms. A better way is to
    // animate the 'rotateX' and 'rotateY' properties directly.
    // Let's refactor to animate properties instead of the string.
  }, [face]);

  // ---
  // BETTER APPROACH: Animate properties, not the transform string.
  // ---
  const [rotationValues, setRotationValues] = useState({ x: -45, y: 45 });

  useEffect(() => {
    let target = { x: 0, y: 0 };
    switch (face) {
      case 1: target = { x: 0, y: 0 }; break;
      case 2: target = { x: 0, y: -90 }; break;
      case 3: target = { x: 90, y: 0 }; break;
      case 4: target = { x: -90, y: 0 }; break;
      case 5: target = { x: 0, y: 90 }; break;
      case 6: target = { x: 180, y: 0 }; break;
      default: target = { x: -45, y: 45 }; // Initial blank state
    }

    if (face !== null) {
      // Add random full spins
      target.x += (Math.floor(Math.random() * 2) + 2) * 360;
      target.y += (Math.floor(Math.random() * 2) + 2) * 360;
    }
    setRotationValues(target);
  }, [face]);


  return (
    <div className="dice-scene">
      <motion.div
        className="dice-cube"
        // Animate the rotation properties
        animate={{
          rotateX: rotationValues.x,
          rotateY: rotationValues.y,
        }}
        // Use a spring transition for a nice, bouncy roll
        transition={{ type: "spring", stiffness: 100, damping: 15, duration: 1.2 }}
      >
        <div className="dice-cube-face face-1">1</div>
        <div className="dice-cube-face face-2">2</div>
        <div className="dice-cube-face face-3">3</div>
        <div className="dice-cube-face face-4">4</div>
        <div className="dice-cube-face face-5">5</div>
        <div className="dice-cube-face face-6">9</div>
      </motion.div>
    </div>
  );
}