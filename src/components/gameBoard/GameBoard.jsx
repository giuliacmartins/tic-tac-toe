import React, { useState, useEffect, useRef } from "react";
import Square from "../square/Square";
import GameInfo from "../gameInfo/GameInfo";
import "./GameBoard.css";

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function GameBoard({ playerChoice, onChangeChoice }) {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [result, setResult] = useState("playing");
  const [winningCombo, setWinningCombo] = useState([]);

  const clickSound = useRef(null);
  const winSound = useRef(null);
  const loseSound = useRef(null);
  const drawSound = useRef(null);

  const computerChoice = playerChoice === "X" ? "O" : "X";
  const isPlayerTurn =
    (xIsNext && playerChoice === "X") || (!xIsNext && playerChoice === "O");

  useEffect(() => {
    const winnerResult = calculateWinner(squares);
    if (winnerResult) {
      const { winner, combo } = winnerResult;
      setWinningCombo(combo);
      const outcome = winner === playerChoice ? "win" : "lose";
      setResult(outcome);
      if (outcome === "win") {
        winSound.current.play();
      } else {
        loseSound.current.play();
      }
    } else if (!squares.includes(null)) {
      setResult("draw");
      drawSound.current.play();
    } else if (!isPlayerTurn) {
      const timeout = setTimeout(() => makeComputerMove(), 500);
      return () => clearTimeout(timeout);
    }
  }, [squares, xIsNext]);

  function calculateWinner(squares) {
    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return { winner: squares[a], combo };
      }
    }
    return null;
  }

  function handleClick(index) {
    if (squares[index] || !isPlayerTurn || result !== "playing") return;

    clickSound.current.play();

    const newSquares = [...squares];
    newSquares[index] = playerChoice;
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  }

  function makeComputerMove() {
    const emptyIndexes = squares
      .map((val, idx) => (val === null ? idx : null))
      .filter((val) => val !== null);

    if (emptyIndexes.length === 0) return;

    const randomIndex =
      emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];

    const newSquares = [...squares];
    newSquares[randomIndex] = computerChoice;
    setSquares(newSquares);
    setXIsNext((prev) => !prev);
  }

  function handleRestart() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setResult("playing");
    setWinningCombo([]);
  }

  return (
    <div className="gameBoardWrapper">
      <div className="gameBoardStyle">
        <audio ref={clickSound} src="/sounds/button.mp3" />
        <audio ref={winSound} src="/sounds/win.mp3" />
        <audio ref={loseSound} src="/sounds/lost.mp3" />
        <audio ref={drawSound} src="/sounds/draw.mp3" />

        <GameInfo result={result} />
        <div className="gameBoard">
          {squares.map((value, index) => (
            <Square
              key={index}
              value={value}
              onClick={() => handleClick(index)}
              isWinningSquare={winningCombo.includes(index)}
            />
          ))}
        </div>

        {result !== "playing" && (
          <div className="restart-container">
            <button className="restart-btn" onClick={handleRestart}>
              Restart Game
            </button>
            <button className="restart-btn" onClick={onChangeChoice}>
              Change Player Choice
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default GameBoard;
