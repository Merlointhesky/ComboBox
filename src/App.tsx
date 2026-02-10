import React, { useState, useEffect } from 'react';
import { SetupScreen } from './components/SetupScreen';
import { GameScreen, ElementType } from './components/GameScreen';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface SaveData {
  godName: string;
  powers: string;
  planetName: string;
  elements: ElementType[];
}

function App() {
  const [gameState, setGameState] = useState<'setup' | 'playing'>('setup');
  const [gameData, setGameData] = useState({
    godName: '',
    powers: '',
    planetName: '',
  });
  const [initialElements, setInitialElements] = useState<ElementType[] | undefined>(undefined);

  useEffect(() => {
    const saved = localStorage.getItem('combobox_save');
    if (saved) {
      try {
        const parsed: SaveData = JSON.parse(saved);
        if (parsed.godName && parsed.planetName) {
            setGameData({
                godName: parsed.godName,
                powers: parsed.powers,
                planetName: parsed.planetName
            });
            setInitialElements(parsed.elements);
            setGameState('playing');
        }
      } catch (e) {
        console.error("Failed to load save", e);
      }
    }
  }, []);

  const handleStart = (godName: string, powers: string, planetName: string) => {
    setGameData({ godName, powers, planetName });
    // Clear previous save elements so we start fresh if manual start
    setInitialElements(undefined); 
    setGameState('playing');
  };

  const handleReset = () => {
    localStorage.removeItem('combobox_save');
    setGameState('setup');
    setGameData({ godName: '', powers: '', planetName: '' });
    setInitialElements(undefined);
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
          initialElements={initialElements}
          onReset={handleReset}
        />
      )}
    </DndProvider>
  );
}

export default App;
