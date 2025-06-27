import React from 'react';

const Cell = ({ coord, isShip, isHit, isMiss, onClick, isTarget }) => {
  const cellStyle = {
    width: '30px',
    height: '30px',
    border: '1px solid black',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: isHit ? 'red' : isMiss ? 'white' : 'lightblue',
    cursor: onClick ? 'pointer' : 'default',
  };

  return (
    <div style={cellStyle} onClick={onClick}>
      {isShip && !isTarget && <span>{isShip}</span>}
    </div>
  );
};

export default Cell;