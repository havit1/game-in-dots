import React, { Component } from "react";
import GameSettingsBar from "./Components/GameSettingBar/GameSettingBar";
import PlayingField from "./Components/PlayingField/PlayingField";
import WinnersList from "./Components/WinnersList/WinnersList";
import "./App.scss";

const GAME_SETTINGS_URL =
  "https://starnavi-frontend-test-task.herokuapp.com/game-settings";

class App extends Component {
  state = {
    gameSettings: {},
    gameMode: null,
    playerName: "",
    gameInProgress: false,
    gameFinished: false,
    winnerName: ""
  };

  getGameSettingsData = async () => {
    try {
      const response = await fetch(GAME_SETTINGS_URL);
      const data = await response.json();
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const element = data[key];
          element.modeName = key;
        }
      }
      this.setState({ gameSettings: data });
      // this.setState({ gameMode: data.easyMode });
    } catch (err) {
      console.error(err);
    }
  };

  componentDidMount() {
    this.getGameSettingsData();
  }

  setGameModeValue = e => {
    const modeSettings = Object.values(this.state.gameSettings).find(
      mode => mode.modeName === e.currentTarget.value
    );
    this.setState({ gameMode: modeSettings });
  };

  onNameChange = e => {
    this.setState({ playerName: e.currentTarget.value });
  };

  setGameInProgress = state => {
    const gameInProgress = state;
    this.setState({ gameInProgress });
  };

  setGameFinished = state => {
    const gameFinished = state;
    this.setState({ gameFinished });
  };

  setWinnerName = winnerName => {
    this.setState({ winnerName });
  };

  render() {
    const {
      gameSettings,
      playerName,
      gameMode,
      gameInProgress,
      gameFinished,
      winnerName
    } = this.state;

    return (
      <div className="App">
        <section className="gaming-section">
          <GameSettingsBar
            gameSettings={gameSettings}
            setGameMode={this.setGameModeValue}
            onNameChange={this.onNameChange}
            playerName={playerName}
            setGameInProgress={this.setGameInProgress}
            gameInProgress={gameInProgress}
            setGameFinished={this.setGameFinished}
            gameFinished={gameFinished}
            setWinnerName={this.setWinnerName}
          />
          {gameMode && (
            <PlayingField
              setGameFinished={this.setGameFinished}
              setGameInProgress={this.setGameInProgress}
              gameFinished={gameFinished}
              gameMode={gameMode}
              gameInProgress={gameInProgress}
              winnerName={winnerName}
              setWinnerName={this.setWinnerName}
              playerName={playerName}
            />
          )}
        </section>
        {<WinnersList winnerName={winnerName} gameFinished={gameFinished} />}
      </div>
    );
  }
}

export default App;
