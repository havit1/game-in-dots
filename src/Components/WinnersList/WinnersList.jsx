import React, { Component } from "react";
import "./WinnersList.scss";

const WINNERS_LIST_URL =
  "https://starnavi-frontend-test-task.herokuapp.com/winners";

class WinnersList extends Component {
  state = {
    winnersList: []
  };

  getWinnersList = async () => {
    try {
      const response = await fetch(WINNERS_LIST_URL);
      const data = await response.json();
      this.setState({ winnersList: data });
    } catch (err) {
      console.error(err);
    }
  };

  onSomeoneWins = name => {
    if (this.props.gameFinished) {
      const winner = {
        winner: name,
        date: new Date()
      };
      console.log(JSON.stringify(winner));
    }
  };

  componentDidMount() {
    this.getWinnersList();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.onSomeoneWins(this.props.winnerName);
    }
  }

  render() {
    const { winnersList } = this.state;

    return (
      <section className="winner-list">
        <h1 className="winner-list__header">Leader Board</h1>
        <ul className="winner-list__list">
          {winnersList.map(winner => (
            <div className=" winner-list__list-element" key={winner.id}>
              <div className="winner-list__list-element-name">
                {winner.winner}
              </div>
              <div className="winner-list__list-element-date">
                {winner.date}
              </div>
            </div>
          ))}
        </ul>
      </section>
    );
  }
}

export default WinnersList;
