
export const parseShipPlacement = (input) => {
    const ships = [];
    const shipEntries = input.split(';').filter((x) => x);
  
    for (const entry of shipEntries) {
      const type = entry[0]; // stores the typr of ship ie: A,B,S
      const [start, end] = entry.slice(2, -1).split('-'); // Get the start and end coord based of the dash -
  
      const startCoord = parseCoord(start);
      const endCoord = parseCoord(end);
  
      const coords = [];
      if (startCoord.col === endCoord.col) {
        
        //vert placements, min and max ops ensure it works rgardless if it feed the end or start first
        const minRow = Math.min(startCoord.row, endCoord.row);
        const maxRow = Math.max(startCoord.row, endCoord.row);
        for (let row = minRow; row <= maxRow; row++) {
          coords.push(`${startCoord.col}${row}`);
        }
      } else if (startCoord.row === endCoord.row) {
        
         //horizontal placements, min and max ops ensure it works rgardless if it feed the end or start first
        const minCol = Math.min(startCoord.col.charCodeAt(0), endCoord.col.charCodeAt(0));
        const maxCol = Math.max(startCoord.col.charCodeAt(0), endCoord.col.charCodeAt(0));
        for (let col = minCol; col <= maxCol; col++) {
          coords.push(`${String.fromCharCode(col)}${startCoord.row}`);
        }
      } else {
        throw new Error('placement Invalid.');
      }
  
      ships.push({
        type,
        positions: coords,
        hits: 0,
        sunk: false,
      });
    }
  
    return ships;
  };
  
  const parseCoord = (coord) => {
    const col = coord[0].toUpperCase();
    const row = parseInt(coord.slice(1)); // Convert to index from 0
    return { col, row };
  };