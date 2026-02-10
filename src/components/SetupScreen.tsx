import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface SetupProps {
  onStart: (godName: string, powers: string, planetName: string) => void;
}

export const SetupScreen: React.FC<SetupProps> = ({ onStart }) => {
  const [godName, setGodName] = useState('');
  const [powers, setPowers] = useState('');
  const [planetName, setPlanetName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (godName && powers && planetName) {
      onStart(godName, powers, planetName);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pastel-blue to-pastel-purple p-4">
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl max-w-md w-full border border-white/50">
        <div className="flex items-center justify-center mb-6">
          <div className="p-3 bg-pastel-pink rounded-full">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Genesis</h1>
        <p className="text-center text-gray-500 mb-8">Begin your divine journey</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Divine Name</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-pastel-purple focus:border-transparent outline-none transition-all"
              placeholder="e.g., Cronos"
              value={godName}
              onChange={(e) => setGodName(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Godly Powers</label>
            <textarea
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-pastel-purple focus:border-transparent outline-none transition-all h-24 resize-none"
              placeholder="Describe what you control (e.g., Time, Oceans, Lightning)"
              value={powers}
              onChange={(e) => setPowers(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Planet Name</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-pastel-purple focus:border-transparent outline-none transition-all"
              placeholder="e.g., Earth Prime"
              value={planetName}
              onChange={(e) => setPlanetName(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pastel-purple to-pastel-pink text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity shadow-md"
          >
            Create World
          </button>
        </form>
      </div>
    </div>
  );
};
