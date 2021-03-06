import React, { Component } from "react";
import "./PlayingField.scss";

class PlayingField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: [],
      currentField: {},
      computerScore: 0,
      playerScore: 0
    };
    this.element = React.createRef();
    this.width = 0;
  }

  createFields() {
    const fields = [];
    for (let i = 0; i < this.props.gameMode.field ** 2; i++) {
      fields[`${i}`] = {
        failed: false,
        won: false,
        inAction: false,
        key: `${i}`
      };
    }
    this.setState({ fields });
  }

  componentDidMount() {
    this.createFields();
    this.width = this.element.current.offsetWidth;
  }

  updateField = () => {
    this.setState({
      fields: [],
      currentField: {},
      computerScore: 0,
      playerScore: 0
    });
    this.createFields();
  };

  async componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      if (this.props.gameMode !== prevProps.gameMode) {
        this.updateField();
      }
      if (this.props.gameInProgress && !this.props.gameFinished) {
        await this.updateField();
        this.gameStartAndFail();
        this.width = this.element.current.offsetWidth;
      }
    }
  }

  gameStartAndFail = () => {
    if (
      this.state.computerScore >= Math.floor(this.state.fields.length / 2) ||
      this.state.playerScore >= Math.floor(this.state.fields.length / 2)
    ) {
      this.props.setGameFinished(true);
      this.props.setGameInProgress(false);
      return this.state.computerScore > this.state.playerScore
        ? this.props.setWinnerName("Computer AI")
        : this.props.setWinnerName(this.props.playerName);
    }
    const fields = [...this.state.fields];
    const element = fields[Math.floor(Math.random() * fields.length)];
    if (element.failed || element.won) {
      return this.gameStartAndFail();
    }
    element.inAction = true;
    this.setState({ fields, currentField: element });
    setTimeout(() => {
      if (element.won !== true && element.inAction !== false) {
        let computerScore = this.state.computerScore;
        computerScore += 1;
        element.inAction = false;
        element.failed = true;
        this.computerScore += 1;
        this.setState({ fields, computerScore });
        this.gameStartAndFail();
      }
    }, this.props.gameMode.delay);
  };

  gameWin = field => {
    if (!this.props.gameInProgress) return;
    const fields = [...this.state.fields];
    const currentField = fields.find(item => item.key === field.key);
    if (currentField === this.state.currentField) {
      let playerScore = this.state.playerScore;
      playerScore += 1;
      fields[`${field.key}`].won = true;
      fields[`${field.key}`].inAction = false;
      this.setState({ fields, playerScore }, this.gameStartAndFail());
    } else {
      let computerScore = this.state.computerScore;
      computerScore += 1;
      const field = fields[`${this.state.currentField.key}`];
      fields[`${field.key}`].failed = true;
      fields[`${field.key}`].inAction = false;
      this.setState({ fields, computerScore }, this.gameStartAndFail());
    }
  };

  render() {
    const { fields } = this.state;
    const { gameMode, winnerName, gameFinished } = this.props;

    return (
      <section className="playing-area">
        {winnerName && gameFinished ? (
          <h2 className="playing-area__winner-name">{winnerName} won</h2>
        ) : (
          <span className="playing-area__winner-name"></span>
        )}
        <div
          ref={this.element}
          className="playing-area__field"
          style={{
            gridTemplateColumns: `repeat(${gameMode.field}, 1fr)`,
            height: this.width
          }}
        >
          {fields.map(field => (
            <div
              className="playing-area__field-element"
              key={field.key}
              style={
                ({},
                field.inAction
                  ? {
                      backgroundColor: "blue"
                    }
                  : field.failed
                  ? {
                      backgroundColor: "red"
                    }
                  : field.won
                  ? {
                      backgroundColor: "green"
                    }
                  : {
                      backgroundColor: "white"
                    })
              }
              onClick={() => this.gameWin(field)}
            ></div>
          ))}
        </div>
      </section>
    );
  }
}

export default PlayingField;
