import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import "./App.css";
import Log from "./components/Log";
import { initialGameBoard, WINNING_COMBINATIONS } from "./data";
import GameOver from "./components/GameOver";

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

  const gameBoard = [...initialGameBoard.map((innerArray) => [...innerArray])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = firstSquareSymbol;
    }
  }

  const handleSelectPlayer = (rowIndex: number, colIndex: number) => {
    const isFilled = gameTurns.findIndex(
      (turn) => turn.square.row == rowIndex && turn.square.col == colIndex
    );
    if (isFilled === -1) {
      setGameTurns((prevTurns) => {
        const currentPlayer = derivedActivePlayer(prevTurns);
        const updatedTurns = [
          { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
          ...prevTurns,
        ];
        return updatedTurns;
      });
    }
  };

  const hasDraw = gameTurns.length == 9 && !winner;

  const handleRestartGame = () => {
    setGameTurns([]);
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
          {(winner || hasDraw) && (
            <GameOver
              winner={winner as string}
              handleRestartGame={handleRestartGame}
            />
          )}
          <GameBoard onSelectSquare={handleSelectPlayer} board={gameBoard} />
        </div>
        <Log gameTurns={gameTurns} />
      </main>
    </>
  );
};

export default App;
