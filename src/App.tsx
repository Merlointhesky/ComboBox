import React, { useState } from 'react';
import { SetupScreen } from './components/SetupScreen';
import { GameScreen } from './components/GameScreen';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  const [gameState, setGameState] = useState<'setup' | 'playing'>('setup');
  
  const [gameData, setGameData] = useState({
    godName: '',
    powers: '',
    planetName: '',
  });

  const handleStart = (godName: string, powers: string, planetName: string) => {
    setGameData({ godName, powers, planetName });
    setGameState('playing');
  };

  return (
    <DndProvider backend={HTML5Backend}>
      {gameState === 'setup' ? (
        <SetupScreen onStart={handleStart} />
      ) : (
        <GameScreen 
          godName={gameData.godName}
          powers={gameData.powers}
          planetName={gameData.planetName}
        />
      )}
    </DndProvider>
  );
}

export default App;
