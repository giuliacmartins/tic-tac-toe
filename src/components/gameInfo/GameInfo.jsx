import React from "react";
import "./GameInfo.css";

function GameInfo({ result }) {
  return (
    <div className="game-info">
      {result === "playing" && <p>Game in progress...</p>}
      {result === "draw" && <p>It's a Draw!</p>}
      {result === "win" && <p>You Win! 🎉</p>}
      {result === "lose" && <p>You Lose! 😞</p>}
    </div>
  );
}

export default GameInfo;
