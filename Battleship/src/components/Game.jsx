
import React, { useState , useEffect} from 'react';
import Board from './Board';

const Game = ({ players, setPlayers, onGameOver }) => {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [message, setMessage] = useState(null);
  const [showResponseOverlay, setShowResponseOverlay] = useState(false);
  const [isTransition, setIsTransition] = useState(false);
  const [invalidClickMessage, setInvalidClickMessage] = useState(null);

  const currentPlayer = players[currentPlayerIndex];
  const opponent = players[1 - currentPlayerIndex];

  // Generate initialization data for the ship board

  const genShipBoard= () => {
    const boardData = {};
    currentPlayer.ships.forEach((ship) => {
      ship.positions.forEach((coord) => {
        boardData[coord] = {
          isShip: ship.type, 
          isHit: opponent.attacks.includes(coord), 
          isMiss: false, 
        };
      });
    });


    // Add misses to the players shp board, so they show up
    opponent.attacks.forEach((coord) => {
      if (!boardData[coord]) {
        boardData[coord] = {
          isShip: false,
          isHit: false,
          isMiss: true, 
        };
      }
    });

    return boardData;
  };


  // Generate intitialization data for the traget board
  const genTargetBoard = () => {
    const boardData = {};
    currentPlayer.attacks.forEach((coord) => {
      const isHit = opponent.ships.some((ship) => ship.positions.includes(coord));
      boardData[coord] = {
        isShip: false,
        isHit: isHit,
        isMiss: !isHit,
      };
    });
    return boardData;
  };

  const handleAttack = (coord) => {

    if (currentPlayer.attacks.includes(coord)) {
        setInvalidClickMessage('You already attacked this location!');
        return;
    }
   

    const isHit = opponent.ships.some((ship) => ship.positions.includes(coord));
    let sunkShip = null;

    const newPlayers = [...players];
    newPlayers[currentPlayerIndex].attacks.push(coord);

    if (isHit) {
      const shipIndex = opponent.ships.findIndex((s) =>
        s.positions.includes(coord)
      );
      const ship = newPlayers[1 - currentPlayerIndex].ships[shipIndex];
      ship.hits++;

      if (ship.hits === ship.positions.length) {
        ship.sunk = true;
        sunkShip = ship.type;
      }
    }

    setPlayers(newPlayers); 

    // check if all ships are sunk
    const gameOver = newPlayers[1 - currentPlayerIndex].ships.every((s) => s.sunk);
    if (gameOver) {
      onGameOver(currentPlayerIndex);
    } else {
      setMessage(`${isHit ? 'Hit' : 'Miss'}${sunkShip ? `! Sunk ${sunkShip}` : ''}`);
      setShowResponseOverlay(true); // Show result of shot
    }
  };

  
  const handleContinue = () => {
    setShowResponseOverlay(false);
    setIsTransition(true); // Show turn transition overlay
  };

  const handleNextTurn = () => {
    setIsTransition(false); 
    setCurrentPlayerIndex((prev) => 1 - prev); // Switch to the next player
  };

  useEffect(() => {
        if (invalidClickMessage) {
        const timeout = setTimeout(() => {
            setInvalidClickMessage(null);
        }, 2000);

        return () => clearTimeout(timeout);
        }
    }, [invalidClickMessage]);


  return (
    <div>
      {/* Transparent Overlay to stop player from being able to take more than shot per turn */}
      {showResponseOverlay && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 10, // why 10 , because twin
          }}
        />
      )}

      {/* overlay for result of one's shot */}
      {showResponseOverlay && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '20px',
            border: '1px solid black',
            zIndex: 1000,
          }}
        >
          <p>{message}</p>
          <button onClick={handleContinue}>Continue</button>
        </div>
      ) }

        {/* popup for already taken shops, on timer */}
        {invalidClickMessage && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '20px',
            border: '1px solid black',
            zIndex: 1000,
          }}
        >
          <p>{invalidClickMessage}</p>
        </div>
      )}

      {/* transition overlay for in between turns */}
      {isTransition && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '20px',
            border: '1px solid black',
            zIndex: 1000,
          }}
        >
          <p>{players[1 - currentPlayerIndex].name}'s turn</p>
          <button onClick={handleNextTurn}>Continue</button>
        </div>
      )}

      {/* board of the current players ships*/}
      {!isTransition && (
        <Board
          boardData={genShipBoard()}
          isTarget={false}
          title={`${currentPlayer.name}'s Ship Board`}
        />
      )}

      {/* current players target board */}
      {!isTransition && (
        <Board
          boardData={genTargetBoard()}
          isTarget={true}
          onCellClick={handleAttack}
          title={`${currentPlayer.name}'s Target Board`}
        />
      )}
    </div>
  );
};

export default Game;
