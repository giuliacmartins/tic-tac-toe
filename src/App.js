import React, { useState } from "react";
import GameBoard from "./components/gameBoard/GameBoard.jsx";
import "./styles.css";

export default function App() {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [gameKey, setGameKey] = useState(0);

  function handleChoice(choice) {
    setPlayerChoice(choice);
  }

  function resetPlayerChoice() {
    setPlayerChoice(null);
    setGameKey((prev) => prev + 1);
  }

  return (
    <div className="app">
      {!playerChoice ? (
        <div className="choice-container">
          <h2>Choose your side:</h2>
          <button onClick={() => handleChoice("X")}>X</button>
          <button onClick={() => handleChoice("O")}>O</button>
        </div>
      ) : (
        <GameBoard
          key={gameKey}
          playerChoice={playerChoice}
          onChangeChoice={resetPlayerChoice}
        />
      )}
    </div>
  );
}
