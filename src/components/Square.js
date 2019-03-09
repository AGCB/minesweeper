import React from 'react';
import Infogrid from './Infogrid';

const Square = ({x,y,isBomb,
  bombsNear,flagged,gridSize, hidden,
  handleClick, handleRightClick}) => (
  <div
    className="square"
    onContextMenu={(e) => handleRightClick(e,x,y)}>
    {flagged? "flagged" :
      <Infogrid
        handleClick={handleClick}
        x={x}
        y={y}
        isBomb={isBomb}
        bombsNear={bombsNear}
        gridSize={gridSize}
        hidden={hidden}
        flagged={flagged}
      />}

  </div>
)

export default Square;
