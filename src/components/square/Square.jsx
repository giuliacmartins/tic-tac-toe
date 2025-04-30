import React from "react";
import "./Square.css";

function Square({ value, onClick, isWinningSquare }) {
  return (
    <div
      className={`square ${isWinningSquare ? "winning" : ""}`}
      onClick={onClick}
    >
      {value}
    </div>
  );
}

export default Square;
