import React, { Component } from "react";
import "./GameSettingBar.scss";

class GameSettingsBar extends Component {
  render() {
    const {
      gameSettings,
      setGameMode,
      onNameChange,
      playerName,
      setGameInProgress,
      gameInProgress,
      setGameFinished,
      gameFinished,
      setWinnerName
    } = this.props;

    const chaningMode = e => {
      return setGameMode(e);
    };

    const onButtonClick = () => {
      setGameFinished(false);
      setGameInProgress(true);
      setWinnerName("");
    };

    return (
      <nav className="bg-transparent navbar navbar-expand-lg navbar-light bg-light">
        <select
          className="custom-select text-white"
          disabled={gameInProgress}
          onChange={chaningMode}
          name=""
          id=""
        >
          <option>Pick game mode</option>
          {gameSettings &&
            Object.keys(gameSettings).map(mode => (
              <option
                key={gameSettings[mode]["modeName"]}
                value={gameSettings[mode]["modeName"]}
              >
                {gameSettings[mode]["modeName"]}
              </option>
            ))}
        </select>
        <input
          className="form-control mr-sm-2"
          value={playerName}
          onChange={onNameChange}
          disabled={gameInProgress}
          type="text"
        />
        <button
          className="btn btn-outline-success my-2 my-sm-0"
          disabled={!playerName || gameInProgress}
          onClick={onButtonClick}
        >
          {gameFinished ? "Replay" : "Play"}
        </button>
      </nav>
    );
  }
}

export default GameSettingsBar;
