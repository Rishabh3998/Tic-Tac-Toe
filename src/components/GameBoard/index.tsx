import { IGameBoard } from "../../data";

const GameBoard = ({
  onSelectSquare,
  board,
}: {
  onSelectSquare: (rowIndex: number, colIndex: number) => void;
  board: IGameBoard;
}) => {
  return (
    <ol id="game-board">
      {board?.map((row, rowIndex: number) => (
        <li key={rowIndex}>
          <ol>
            {row?.map((col, colIndex: number) => (
              <li key={colIndex}>
                <button onClick={() => onSelectSquare(rowIndex, colIndex)}>
                  {col}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
};

export default GameBoard;
