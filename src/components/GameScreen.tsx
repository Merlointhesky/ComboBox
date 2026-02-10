import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Settings, RefreshCw, ScrollText } from 'lucide-react';

interface ElementType {
  id: string;
  name: string;
  emoji: string;
  description: string;
}

interface GameScreenProps {
  godName: string;
  planetName: string;
  powers: string;
}

const ItemTypes = {
  ELEMENT: 'element',
};

// --- Element Card Component ---
interface ElementCardProps {
  element: ElementType;
  onCombine: (sourceId: string, targetId: string) => void;
}

const ElementCard: React.FC<ElementCardProps> = ({ element, onCombine }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.ELEMENT,
    item: { id: element.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.ELEMENT,
    drop: (item: { id: string }) => {
      if (item.id !== element.id) {
        onCombine(item.id, element.id);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  // Combine refs
  const ref = (node: HTMLDivElement | null) => {
    drag(drop(node));
  };

  return (
    <div
      ref={ref}
      className={`
        p-4 rounded-xl shadow-sm border-2 transition-all cursor-move
        flex flex-col items-center justify-center gap-2 aspect-square
        ${isOver ? 'bg-pastel-pink/20 border-pastel-pink scale-105' : 'bg-white border-white/50 hover:border-pastel-blue'}
        ${isDragging ? 'opacity-50' : 'opacity-100'}
      `}
    >
      <span className="text-4xl filter drop-shadow-sm">{element.emoji}</span>
      <span className="font-medium text-gray-700 text-sm">{element.name}</span>
    </div>
  );
};

// --- Main Game Component ---
export const GameScreen: React.FC<GameScreenProps> = ({ godName, planetName, powers }) => {
  const [elements, setElements] = useState<ElementType[]>([
    { id: 'air', name: 'Air', emoji: '💨', description: 'Gaseous substances' },
    { id: 'water', name: 'Water', emoji: '💧', description: 'Liquid life' },
    { id: 'earth', name: 'Earth', emoji: '🌱', description: 'Solid ground' },
    { id: 'fire', name: 'Fire', emoji: '🔥', description: 'Energy and heat' },
  ]);

  const [logs, setLogs] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Placeholder for AI Planet Image - in real app this would be state initialized with a base gen
  const [planetImage, setPlanetImage] = useState("https://images.unsplash.com/photo-1614730341194-75c60740a2d3?auto=format&fit=crop&q=80&w=1000");

  const handleCombine = async (sourceId: string, targetId: string) => {
    const source = elements.find(e => e.id === sourceId);
    const target = elements.find(e => e.id === targetId);
    
    if (!source || !target) return;

    setIsGenerating(true);
    const newLog = `${godName} combined ${source.name} and ${target.name}...`;
    setLogs(prev => [newLog, ...prev]);

    // TODO: Call Llama AI here
    console.log(`Combining ${source.name} + ${target.name} with powers: ${powers}`);

    // Mock AI delay and result
    setTimeout(() => {
        // Mock result logic
        const newElementId = `${source.id}-${target.id}`;
        // Prevent duplicates for this demo logic
        if (!elements.find(e => e.id === newElementId)) {
            const newElement: ElementType = {
                id: newElementId,
                name: `Essence of ${source.name} & ${target.name}`,
                emoji: '✨',
                description: 'A new manifestation created by your will.'
            };
            setElements(prev => [...prev, newElement]);
            setLogs(prev => [`Created ${newElement.name}! The planet evolves.`, ...prev]);
            
            // Mock image update (in real app, use AI gen prompt here)
            // setPlanetImage(...) 
        } else {
            setLogs(prev => [`The combination of ${source.name} and ${target.name} is already known.`, ...prev]);
        }
        setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar - Tools & Elements */}
      <div className="w-80 bg-white shadow-xl z-10 flex flex-col border-r border-gray-100">
        <div className="p-6 bg-gradient-to-r from-pastel-blue/30 to-pastel-purple/30">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <span className="text-2xl">⚡</span> Powers
          </h2>
          <p className="text-sm text-gray-500 mt-1">{powers}</p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Elements</h3>
          <div className="grid grid-cols-2 gap-3">
            {elements.map(el => (
              <ElementCard 
                key={el.id} 
                element={el} 
                onCombine={handleCombine}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main View - Planet */}
      <div className="flex-1 relative bg-black flex flex-col">
        {/* Top Overlay */}
        <div className="absolute top-0 w-full p-6 flex justify-between items-start z-20 pointer-events-none">
          <div className="bg-black/40 backdrop-blur-md p-4 rounded-xl text-white border border-white/10">
            <h1 className="text-3xl font-bold">{planetName}</h1>
            <p className="text-gray-300 text-sm">Ruled by {godName}</p>
          </div>
        </div>

        {/* Planet Display */}
        <div className="flex-1 flex items-center justify-center relative overflow-hidden">
          {/* Background Stars - simplified */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-[#000000] to-black"></div>
          
          {/* Planet Image */}
          <div className="relative w-[500px] h-[500px] rounded-full shadow-[0_0_100px_rgba(168,216,234,0.2)] transition-all duration-1000 group">
             <img 
               src={planetImage} 
               alt="Planet" 
               className="w-full h-full object-cover rounded-full animate-pulse-slow" 
               style={{ animationDuration: '10s' }}
             />
             <div className="absolute inset-0 rounded-full ring-inset ring-opacity-20 ring-white shadow-[inset_10px_-10px_50px_rgba(0,0,0,0.5)]"></div>
          </div>
          
          {isGenerating && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-50 backdrop-blur-sm">
                <div className="flex flex-col items-center gap-4">
                    <RefreshCw className="w-12 h-12 text-pastel-blue animate-spin" />
                    <span className="text-white font-medium text-lg animate-pulse">Shaping reality...</span>
                </div>
            </div>
          )}
        </div>

        {/* Bottom Panel - Logs */}
        <div className="h-48 bg-white/95 backdrop-blur border-t border-gray-200 flex flex-col">
            <div className="px-6 py-3 border-b border-gray-100 flex items-center gap-2">
                <ScrollText className="w-4 h-4 text-gray-400" />
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Chronicle</span>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {logs.map((log, i) => (
                    <div key={i} className="text-sm text-gray-600 font-mono">
                        <span className="text-gray-400 mr-2">[{logs.length - i}]</span>
                        {log}
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};
