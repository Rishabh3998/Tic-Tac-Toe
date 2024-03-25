const Log = ({
  gameTurns,
}: {
  gameTurns: Array<{ square: { row: number; col: number }; player: string }>;
}) => {
  return (
    <ol id="log">
      {gameTurns?.map((turn) => {
        return (
          <li
            key={`${turn.square.row}${turn.square.col}`}
          >{`${turn.player} selected: row: ${turn.square.row}, col: ${turn.square.col}`}</li>
        );
      })}
    </ol>
  );
};

export default Log;
