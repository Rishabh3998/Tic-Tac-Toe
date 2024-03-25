const GameOver = ({
  winner,
  handleRestartGame,
}: {
  winner: string;
  handleRestartGame: () => void;
}) => {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {winner && <p>{winner} won</p>}
      {!winner && <p>It's a draw</p>}
      <p>
        <button onClick={handleRestartGame}>Rematch!</button>
      </p>
    </div>
  );
};

export default GameOver;
