import React, { useState } from 'react';
import { parseShipPlacement } from '../utils/parseShipPlacement';

const PlayerSetup = ({ onComplete }) => {
  const [name, setName] = useState('');
  const [ships, setShips] = useState('');

  //submit logic
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
     
      console.log(ships);
      const parsedShips = parseShipPlacement(ships); // calls function to pares the ships
      console.log(parsedShips);
      
      onComplete({ name, ships: parsedShips });
    } catch (error) {
      
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Player name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Ship placements"
        value={ships}
        onChange={(e) => setShips(e.target.value)}
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default PlayerSetup;