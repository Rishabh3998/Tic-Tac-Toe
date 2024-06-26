/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

interface IPlayer {
  playerName: string;
  playerSymbol: string;
  isActive: boolean;
  handlePlayerName: (symbol: string, newName: string) => void;
}

const Player = ({
  playerName,
  playerSymbol,
  isActive,
  handlePlayerName,
}: IPlayer) => {
  const [isEdit, setIsEdit] = useState(false);
  const [playerNames, setPlayerNames] = useState(playerName);

  const handleEdit = () => {
    setIsEdit((prev) => !prev);
    if (isEdit) {
      handlePlayerName(playerSymbol, playerNames);
    }
  };

  const handleChange = (e: any) => {
    const { value } = e.target;
    setPlayerNames(value);
  };

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {isEdit ? (
          <input
            placeholder={playerName}
            onChange={handleChange}
            value={playerNames}
          />
        ) : (
          <span className="player-name">{playerNames || playerName}</span>
        )}
        <span className="player-symbol">{playerSymbol}</span>
      </span>
      <button onClick={handleEdit}>{isEdit ? "Save" : "Edit"}</button>
    </li>
  );
};

export default Player;
