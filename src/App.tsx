import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import "./App.css";
import Log from "./components/Log";

const derivedActivePlayer = (
  gameTurns: Array<{ square: { row: number; col: number }; player: string }>
) => {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
  return currentPlayer;
};

const App = () => {
  const [gameTurns, setGameTurns] = useState<
    Array<{ square: { row: number; col: number }; player: string }>
  >([]);

  const activePlayer = derivedActivePlayer(gameTurns);

  const handleSelectPlayer = (rowIndex: number, colIndex: number) => {
    setGameTurns((prevTurns) => {
      const currentPlayer = derivedActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  };

  console.log({ gameTurns });
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
        <Log gameTurns={gameTurns} />
      </main>
    </>
  );
};

export default App;
