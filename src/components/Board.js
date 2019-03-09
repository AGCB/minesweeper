import React from 'react';
import Row from './Row';

const Board = ({rows, gridSize, handleClick, handleRightClick}) => (
  <div className="board">
      {rows.map((x,i) => (
        <Row
          key={i}
          squares={x}
          gridSize={gridSize}
          handleClick={handleClick}
          handleRightClick={handleRightClick}/>
      ))}

  </div>
)

export default Board;
