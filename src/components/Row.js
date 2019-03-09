import React from 'react';
import Square from './Square';

const Row = ({squares,gridSize, handleClick, handleRightClick}) => (
  <div className="row">
    {
      squares.map((x,i) => (
        <Square
          key={i}
          x={x.x}
          y={x.y}
          isBomb={x.isBomb}
          bombsNear={x.bombsNear}
          gridSize={gridSize}
          hidden={x.hidden}
          handleClick={handleClick}
          handleRightClick={handleRightClick}
          flagged={x.flagged}/>
      ))
    }
  </div>
)

export default Row;
