import { Grid } from './components/Grid';
import './App.css';
import React from 'react';
import { checkBoardState } from './api';

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
  }

  onCellClick = async (index) => {
    this.state.board[index] = this.state.currentPlayer;
    this.setState({
      board: this.state.board,
      currentPlayer: this.state.currentPlayer === 'X' ? 'O' : 'X'
    });

    await checkBoardState(this.state.board);
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
