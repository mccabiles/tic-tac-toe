import { Grid } from './components/Grid';
import './App.css';
import React from 'react';

const DEFAULT_BOARD = [
  '', '', '', '', '', '', '', '', '',
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [...DEFAULT_BOARD],
      currentPlayer: 'X'
    }

    console.log(this.state, this.state.board);
  }

  onCellClick = (index) => {
    this.state.board[index] = this.state.currentPlayer;
    this.setState({
      board: this.state.board,
      currentPlayer: this.state.currentPlayer === 'X' ? 'O' : 'X'
    });
  };

  render() {
    return (
      <div className="App">
        <h2>Player {this.state.currentPlayer} turn</h2>
        <div>
          <Grid board={this.state.board} onCellClick={this.onCellClick}></Grid>
        </div>
      </div>
    )
  };
}

export default App;
