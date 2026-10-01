import React, { useState } from 'react';
import { useCity } from '../context/CityContext';
import { CityScene } from '../components/3d/CityScene';
import { ObjectInspectionModal } from '../components/common/ObjectInspectionModal';
import { soundManager } from '../utils/sound';
import {
  Box,
  Layers,
  Search,
  Filter,
  Cross,
  Zap,
  Droplets,
  Trash2,
  Train,
  Building2,
  Clock,
  Sun,
  Moon,
  CloudRain
} from 'lucide-react';

export function City3DView() {
  const { cityObjects, selectObject, timeOfDay, setTimeOfDay, weather, setWeatherMode, simulatedTime } = useCity();
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filterOptions = [
    { label: 'All Objects', type: 'all', icon: <Box className="w-3.5 h-3.5" /> },
    { label: 'Hospitals', type: 'hospital', icon: <Cross className="w-3.5 h-3.5 text-red-400" /> },
    { label: 'Power Plants', type: 'power', icon: <Zap className="w-3.5 h-3.5 text-emerald-400" /> },
    { label: 'Water Plants', type: 'water', icon: <Droplets className="w-3.5 h-3.5 text-cyan-400" /> },
    { label: 'Waste Centers', type: 'waste', icon: <Trash2 className="w-3.5 h-3.5 text-lime-400" /> },
    { label: 'Transit Hubs', type: 'metro', icon: <Train className="w-3.5 h-3.5 text-indigo-400" /> },
    { label: 'Skyscrapers', type: 'skyscraper', icon: <Building2 className="w-3.5 h-3.5 text-cyan-400" /> },
  ];

  const filteredObjects = cityObjects.filter((obj) => {
    const matchesType = filterType === 'all' || obj.type === filterType;
    const matchesSearch = obj.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          obj.sector.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] flex flex-col overflow-hidden bg-[#030611] font-sans">
      <ObjectInspectionModal />

      {/* Top Floating Controls Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-[#080d22]/90 border border-cyan-500/30 backdrop-blur-xl shadow-2xl">
        {/* Left: Search input */}
        <div className="flex items-center gap-2 flex-1 min-w-[200px] max-w-sm">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search building, hospital, or sector..."
              className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-slate-900/90 border border-cyan-500/25 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
            />
          </div>
        </div>

        {/* Center: Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {filterOptions.map((opt) => (
            <button
              key={opt.type}
              onClick={() => {
                soundManager.playClick();
                setFilterType(opt.type);
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition flex items-center gap-1.5 whitespace-nowrap ${
                filterType === opt.type
                  ? 'bg-cyan-500 text-black font-bold shadow-neon-cyan'
                  : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-700/60'
              }`}
            >
              {opt.icon}
              <span>{opt.label}</span>
            </button>
          ))}
        </div>

        {/* Right: Quick In-Scene Day/Night Slider */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-900/90 border border-cyan-500/20 text-xs font-mono">
          <Clock className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-white font-bold">{simulatedTime}</span>
          <input
            type="range"
            min="0"
            max="24"
            step="0.5"
            value={timeOfDay}
            onChange={(e) => setTimeOfDay(e.target.value)}
            className="w-16 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
        </div>
      </div>

      {/* Main 3D Canvas */}
      <div className="w-full h-full">
        <CityScene height="100%" showControls={true} />
      </div>

      {/* Bottom Floating Object Quick Drawer */}
      <div className="absolute bottom-4 left-4 right-4 z-20 max-w-4xl mx-auto flex items-center gap-2 p-2 rounded-xl bg-[#080d22]/85 backdrop-blur-xl border border-cyan-500/25 overflow-x-auto no-scrollbar shadow-2xl">
        <div className="px-2 text-[10px] font-mono uppercase tracking-wider text-cyan-400 whitespace-nowrap">
          {filteredObjects.length} Nodes:
        </div>
        {filteredObjects.slice(0, 8).map((obj) => (
          <button
            key={obj.id}
            onClick={() => selectObject(obj)}
            className="px-3 py-1.5 rounded-lg bg-slate-900/90 hover:bg-cyan-950 border border-cyan-500/20 hover:border-cyan-400 text-xs font-mono text-slate-200 hover:text-cyan-300 whitespace-nowrap transition flex items-center gap-1.5 shrink-0"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>{obj.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
