import React from 'react';

const Infogrid = ({
  x,
  y,
  isBomb,
  bombsNear,
  hidden,
  handleClick
}) => (
  <div className="infogrid" onClick={e => handleClick(e,x,y)}>
    {hidden?
      <div className="hidden">
        <span>"HIDDEN"</span>
        <span>"HIDDEN"</span>
        <span>"HIDDEN"</span>
        <span>"HIDDEN"</span>
      </div>

: <ul>
      <li>
        <span>{`${x}`}</span>
      </li>
      <li>
        {`${y}`}
      </li>
      <li>
        {`${isBomb}`}
      </li>
      <li>
        {`${bombsNear}`}
      </li>
    </ul>}
  </div>
)

export default Infogrid;
