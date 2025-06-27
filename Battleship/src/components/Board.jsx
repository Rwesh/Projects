import React from 'react';
import Cell from './Cell';

const Board = ({ boardData, isTarget, onCellClick, title }) => {
  const cols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const rows = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px' }}>
      
      <h3>{title}</h3>

      {/* prints col labs */}
      <div style={{ display: 'flex', marginLeft: '30px' }}>
        {cols.map((col) => (
          <div
            key={col}
            style={{
              width: '30px',
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >
            {col}
          </div>
        ))}
      </div>

      {/* prints the board itself*/}
      {rows.map((row) => (
        <div key={row} style={{ display: 'flex' }}>
          {/* prints row numbs */}
          <div
            style={{
              width: '30px',
              textAlign: 'center',
              fontWeight: 'bold',
              marginRight: '5px',
            }}
          >
            {row}
          </div>

          {/* maps the cells, mitchtochondria is the powerhouse of the cell */}
          {cols.map((col) => {
            const coord = `${col}${row}`;
            const cellData = boardData[coord] || { isShip: false, isHit: false, isMiss: false };

            return (
              <Cell
                key={coord}
                coord={coord}
                isShip={cellData.isShip}
                isHit={cellData.isHit}
                isMiss={cellData.isMiss}
                onClick={isTarget ? () => onCellClick(coord) : undefined}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Board;