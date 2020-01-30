import React, { Component } from "react";
import "./GameSettingBar.scss";

class GameSettingsBar extends Component {
  state = {
    name: ""
  };

  chaningMode = e => {
    this.props.setGameFinished(false);
    this.props.setGameMode(e);
  };

  onButtonClick = () => {
    this.props.setGameFinished(false);
    this.props.setGameInProgress(true);
    this.props.onNameChange(this.state.name);
  };

  render() {
    const { gameSettings, gameInProgress, gameFinished, gameMode } = this.props;

    return (
      <nav className="bg-transparent navbar navbar-expand-lg navbar-light bg-light">
        <select
          className="custom-select text-white"
          disabled={gameInProgress}
          onChange={this.chaningMode}
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
          onChange={e => {
            this.setState({ name: e.currentTarget.value.trim() });
          }}
          value={this.state.name}
          disabled={gameInProgress}
          type="text"
        />
        <button
          className="btn btn-outline-success my-2 my-sm-0"
          disabled={!this.state.name || gameInProgress || !gameMode}
          onClick={this.onButtonClick}
        >
          {gameFinished ? "Play again" : "Play"}
        </button>
      </nav>
    );
  }
}

export default GameSettingsBar;
