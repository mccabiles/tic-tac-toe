require('dotenv').config();
import { get } from 'lodash';
import express from 'express';
const app = express();
const PORT = process.env.SERVER_PORT;
import cors from 'cors';

// We assume the board is a 3x3 numbered 0-8 from top-left to bottom-right
type BoardInput = 'X' | 'O' | '';
type BoardState = [
  BoardInput, BoardInput, BoardInput,
  BoardInput, BoardInput, BoardInput,
  BoardInput, BoardInput, BoardInput,
];

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

// 2: Check for illegal board states
//  2.1: # of O's > # of X's
//  2.2: # of 3 in a row is equal
const isIllegal = (boardState: BoardState): Boolean => {
  const oCount = boardState.filter(cell => cell === 'O').length;
  const xCount = boardState.filter(cell => cell ==='X').length;
  return (oCount > xCount) ||
    (xCount > oCount + 1) ||
    boardState.length !== 9;
}


// Player has won if there are 3 adjacent cells
//  Horizontals: (0,1,2), (3,4,5), (6,7,8)
//  Verticals: (0,3,6) (1,4,7), (2,5,8)
//  Diagonals: (0,4,8) (2,4,6),
const getWinner = (
  boardState: BoardState,
  startIndex: number,
  rowInterval: number,
  cellInterval: number,
  rows = 3,
): 'X' | 'O' | '' => {
  for (let i = 0; i < rows; i++) {
    const index = startIndex + (i * rowInterval);
    if (boardState[index] !== "" && 
      get(boardState, index) ===
        get(boardState, index + cellInterval) &&
      get(boardState, index) === 
        get(boardState, index + (2 * cellInterval))
    ) {
      return boardState[index];
    }
  }

  return '';
}

const checkWinner = (boardState: BoardState) => {
  return getWinner(boardState, 0, 3, 1) ||
    getWinner(boardState, 0, 1, 3) ||
    getWinner(boardState, 0, 2, 4, 1) ||
    getWinner(boardState, 2, 1, 2, 1);
}

// TODO: We might want to check if number of moves needed to win is > available moves
const isDraw = (boardState: BoardState): Boolean => {
  return boardState.filter(cell => !cell).length === 0;
}

app.post('/checkBoard', (req: express.Request, res: express.Response) => {
  const boardState = req.body.boardState;

  if (isIllegal(boardState)) {
    return res.status(403).send('Illegal board state');
  }
  
  if (!checkWinner(boardState)) {
    return res.status(201).send();
  }

  if (isDraw(boardState)) {
    return res.status(202).send('Game is a draw');
  }

  return res.status(200).send(checkWinner(boardState));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${ PORT }`);
});
