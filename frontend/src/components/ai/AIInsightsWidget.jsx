import React from 'react';
import { useCity } from '../../context/CityContext';
import { Sparkles, Car, Zap, Trash2, Droplets, ArrowUpRight } from 'lucide-react';

export function AIInsightsWidget() {
  const { aiInsights } = useCity();

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'TRAFFIC': return <Car className="w-4 h-4 text-amber-400" />;
      case 'ENERGY': return <Zap className="w-4 h-4 text-emerald-400" />;
      case 'WASTE': return <Trash2 className="w-4 h-4 text-purple-400" />;
      case 'WATER': return <Droplets className="w-4 h-4 text-cyan-400" />;
      default: return <Sparkles className="w-4 h-4 text-cyan-400" />;
    }
  };

  const getBadgeStyle = (sev) => {
    switch (sev) {
      case 'alert': return 'border-red-500/40 bg-red-950/40 text-red-300';
      case 'warning': return 'border-amber-500/40 bg-amber-950/40 text-amber-300';
      case 'success': return 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300';
      default: return 'border-cyan-500/40 bg-cyan-950/40 text-cyan-300';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3.5">
      {aiInsights.slice(0, 4).map((ins) => (
        <div
          key={ins.id}
          className="relative p-4 rounded-xl bg-[#090f24]/80 backdrop-blur-md border border-cyan-500/20 hover:border-cyan-500/40 transition-all shadow-sm group"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-slate-900 border border-slate-700">
                {getCategoryIcon(ins.category)}
              </div>
              <span className={`px-2 py-0.2 rounded text-[10px] font-mono font-bold uppercase border ${getBadgeStyle(ins.severity)}`}>
                {ins.category}
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">{ins.timestamp}</span>
          </div>

          <h4 className="text-xs font-bold text-white tracking-wide mb-1 font-display">
            {ins.title}
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed font-sans line-clamp-2">
            {ins.message}
          </p>
        </div>
      ))}
    </div>
  );
}
