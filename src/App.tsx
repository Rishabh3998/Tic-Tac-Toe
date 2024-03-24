import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import "./App.css";
import Log from "./components/Log";

function App() {
  const [activePlayer, setActivePlayer] = useState("X");
  const [gameTurns, setGameTurns] = useState<
    Array<{ square: { row: number; col: number }; player: string }>
  >([]);
  const handleSelectPlayer = (rowIndex: number, colIndex: number) => {
    setActivePlayer((prev) => {
      return prev === "X" ? "O" : "X";
    });
    setGameTurns((prevTurns) => {
      let currentPlayer = "X";
      if (prevTurns.length > 0 && prevTurns[0].player === "X") {
        currentPlayer = "O";
      } else {
        currentPlayer = "X";
      }
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  };
  return (
    <>
      <main>
        <div id="game-container">
          <ol id="players" className="highlight-player">
            <Player
              playerName="Player 1"
              playerSymbol="X"
              isActive={activePlayer === "X"}
            />
            <Player
              playerName="Player 2"
              playerSymbol="O"
              isActive={activePlayer === "O"}
            />
          </ol>
          <GameBoard onSelectSquare={handleSelectPlayer} turns={gameTurns} />
        </div>
        <Log />
      </main>
    </>
  );
}

export default App;
