// import React, { Component } from "react";
// import moment from "moment";
// import "./WinnersList.scss";

// const WINNERS_LIST_URL =
//   "https://starnavi-frontend-test-task.herokuapp.com/winners";

// class WinnersList extends Component {
//   state = {
//     winnersList: [],
//     sent: false
//   };

//   getWinnersList = async () => {
//     try {
//       const response = await fetch(WINNERS_LIST_URL);
//       const data = await response.json();
//       this.setState({ winnersList: data });
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   sendWinnerAndUpdate = name => {
//     if (this.props.gameFinished) {
//       const winner = {
//         winner: name,
//         date: moment().format("H:mm; D MMMM YYYY"),
//         id: Math.random()
//       };
//       fetch(WINNERS_LIST_URL, {
//         method: "POST",
//         body: JSON.stringify(winner),
//         headers: {
//           "Content-Type": "application/json"
//         }
//       })
//         .then(response => response.json())
//         .then(res => this.setState({ winnersList: res }));
//     }
//   };

//   componentDidMount() {
//     this.getWinnersList();
//     setInterval(this.getWinnersList, 100000);
//   }

//   componentWillUnmount() {
//     clearInterval(this.getWinnersList, 100000);
//   }

//   componentDidUpdate(prevProps) {
//     if (prevProps !== this.props) {
//       this.sendWinnerAndUpdate(this.props.winnerName);
//     }
//   }

//   render() {
//     const { winnersList } = this.state;

//     return (
//       <section className="winner-list">
//         <h1 className="winner-list__header">Leader Board</h1>
//         <ul className="winner-list__list">
//           {winnersList.map(winner => (
//             <div className=" winner-list__list-element" key={winner.id}>
//               <div className="winner-list__list-element-name">
//                 {winner.winner}
//               </div>
//               <div className="winner-list__list-element-date">
//                 {moment(winner.date, "H:mm; D MMMM YYYY").format(
//                   "D MMMM YYYY, H:mm"
//                 ) || winner.date}
//               </div>
//             </div>
//           ))}
//         </ul>
//       </section>
//     );
//   }
// }

// export default WinnersList;
