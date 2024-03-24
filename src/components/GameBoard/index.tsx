interface IGameBoard extends Array<Array<string | null>> {}

const initialGameBoard: IGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const GameBoard = ({
  onSelectSquare,
  turns,
}: {
  onSelectSquare: (rowIndex: number, colIndex: number) => void;
  turns: Array<{ square: { row: number; col: number }; player: string }>;
}) => {
  const gameBoard = initialGameBoard;

  for (const turn of turns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  return (
    <ol id="game-board">
      {gameBoard?.map((row, rowIndex: number) => (
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
