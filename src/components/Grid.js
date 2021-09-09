import './Grid.css';

export function Grid(props) {
  const cells = props.board.map((cell, index) => {
    if (cell) {
      return <div className="board-cell" key={index}>{cell}</div>;
    }

    return <button
      className="board-cell"
      key={index}
      onClick={() => props.onCellClick(index)}
    ></button>
  });

  return <div className="board">
    {cells}
  </div>
}