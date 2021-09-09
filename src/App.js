import { Grid } from './components/Grid';
import './App.css';
import React from 'react';
import { checkBoardState } from './services/api';
import { STATUS_CODES } from './constants';

const DEFAULT_BOARD = [
  '', '', '', '', '', '', '', '', '',
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [...DEFAULT_BOARD],
      currentPlayer: 'X',
      disabled: false,
    }
  }

  disableBoard = () => {
    this.setState({
      ...this.state,
      disabled: true,
    });
  }

  onCellClick = async (index) => {
    this.state.board[index] = this.state.currentPlayer;
    this.setState({
      board: this.state.board,
      currentPlayer: this.state.currentPlayer === 'X' ? 'O' : 'X'
    });

    const response = await checkBoardState(this.state.board).catch(() => {
      alert('Something went wrong! Please refresh the page!')
    });


    // TODO: Alerts could be better. For now, let's use hard-coded alerts.
    if (response.status == STATUS_CODES.ILLEGAL) {
      alert(response.data);
      this.disableBoard();
      return;
    }
    
    if (response.status == STATUS_CODES.YES_WINNER) {
      alert(`Player ${response.data} has won!`);
      this.disableBoard();
      return;
    }

    if (response.status == STATUS_CODES.DRAW) {
      alert(`Game is a draw!`);
      this.disableBoard();
      return;
    }
  };

  render() {
    return (
      <div className="App">
        <h2>Player {this.state.currentPlayer} turn</h2>
        <div>
          <Grid board={this.state.board} disabled={this.state.disabled} onCellClick={this.onCellClick}></Grid>
        </div>
      </div>
    )
  };
}

export default App;
