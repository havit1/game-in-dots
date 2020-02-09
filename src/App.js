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

  onNameChange = name => {
    this.setState({ playerName: name });
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
      gameMode,
      winnerName,
      playerName,
      gameSettings,
      gameFinished,
      gameInProgress
    } = this.state;

    return (
      <div className="App">
        <section className="gaming-section">
          <GameSettingsBar
            gameMode={gameMode}
            playerName={playerName}
            gameFinished={gameFinished}
            gameSettings={gameSettings}
            gameInProgress={gameInProgress}
            onNameChange={this.onNameChange}
            setGameMode={this.setGameModeValue}
            setGameFinished={this.setGameFinished}
            setGameInProgress={this.setGameInProgress}
          />
          {gameMode && (
            <PlayingField
              gameMode={gameMode}
              winnerName={winnerName}
              playerName={playerName}
              gameFinished={gameFinished}
              gameInProgress={gameInProgress}
              setWinnerName={this.setWinnerName}
              setGameFinished={this.setGameFinished}
              setGameInProgress={this.setGameInProgress}
            />
          )}
        </section>
        {/* <WinnersList winnerName={winnerName} gameFinished={gameFinished} /> */}
      </div>
    );
  }
}

export default App;
