import React, { useState } from 'react';
import PlayerSetup from './components/PlayerSetup';
import Game from './components/Game';

const App = () => {
  const [gameState, setGameState] = useState('setup');
  const [players, setPlayers] = useState([null, null]);
  const [winner, setWinner] = useState(null);
  const [showStartOverlay, setShowStartOverlay] = useState(false);

  const handlePlayerSetup = (index, player) => {
    const newPlayers = [...players];
    newPlayers[index] = {
      ...player,
      attacks: [],
      ships: player.ships.map(ship => ({
        ...ship,
        hits: 0,
        sunk: false,
      })),
    };
    setPlayers(newPlayers);

    if (index === 0) {
      setGameState('setup2');
    } else {
      setShowStartOverlay(true); // start screen
    }
  };

  const handleStartGame = () => {
    setShowStartOverlay(false);
    setGameState('playing'); // Start up game
  };

 
  
  const calcScore = (player, opponent) => {
    const hits = opponent.attacks.filter(coord =>
      player.ships.some(s => s.positions.includes(coord))
    ).length;
    return 24 - (2 * hits);
  };

  return (
    <div className="App">
      {/* Player 1 initializtion*/}
      {gameState === 'setup' && (
        <PlayerSetup onComplete={(player) => handlePlayerSetup(0, player)} />
      )}

      {/* Player 2 intitialize */}
      {gameState === 'setup2' && (
        <PlayerSetup onComplete={(player) => handlePlayerSetup(1, player)} />
      )}

      {/* Start screen */}
      {showStartOverlay && (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            alignContent: 'center',
            backgroundColor: 'white',
            padding: '20px',
            border: '1px solid black',
            zIndex: 1000,
          }}
        >
          <p>{players[0].name} click "Start" to start the game!</p>
          <button onClick={handleStartGame}>Start</button>
        </div>
      )}

      {/* active game */}
        {gameState === 'playing' && (
        <Game
          players={players} 
          setPlayers={setPlayers} //pass in setPlayer func 
          onGameOver={(winnerIndex) => {
            setWinner(winnerIndex);
            setGameState('ended');
          }}
        />
      )}

      {/* displays score on game over */}
      {gameState === 'ended' && winner !== null && (
        <div>
          <h2>Game Over! {players[winner].name} Wins!</h2>
          <p style={{fontSize: '30px'}}>Score:</p>
          <ul>
            <li style={{fontSize: '30px'}}>
              {players[winner].name}: {calcScore(players[winner], players[1-winner])}
            </li>
            <li style={{fontSize: '30px'}}>
              {players[1-winner].name}: {calcScore(players[1-winner], players[winner])}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;