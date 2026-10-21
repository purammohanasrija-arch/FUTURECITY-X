import React, { useEffect } from 'react';
import { useCity } from '../../context/CityContext';
import { soundManager } from '../../utils/sound';
import {
  X,
  Cross,
  Zap,
  Droplets,
  Trash2,
  Train,
  GraduationCap,
  Building2,
  Trees,
  CheckCircle,
  AlertTriangle,
  Activity,
  Cpu,
  ShieldAlert
} from 'lucide-react';

export function ObjectInspectionModal() {
  const { selectedObject, closeInspector } = useCity();

  // Support ESC key to close inspector
  useEffect(() => {
    if (!selectedObject) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        soundManager.playClick();
        closeInspector();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedObject, closeInspector]);

  if (!selectedObject) return null;

  const getIcon = () => {
    switch (selectedObject.type) {
      case 'hospital': return <Cross className="w-6 h-6 text-red-400" />;
      case 'power': return <Zap className="w-6 h-6 text-emerald-400" />;
      case 'water': return <Droplets className="w-6 h-6 text-cyan-400" />;
      case 'waste': return <Trash2 className="w-6 h-6 text-lime-400" />;
      case 'metro': return <Train className="w-6 h-6 text-indigo-400" />;
      case 'school': return <GraduationCap className="w-6 h-6 text-amber-400" />;
      case 'park': return <Trees className="w-6 h-6 text-emerald-400" />;
      default: return <Building2 className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          soundManager.playClick();
          closeInspector();
        }
      }}
    >
      <div
        className="relative w-full max-w-lg p-6 overflow-hidden rounded-2xl bg-[#090f23]/95 border border-cyan-500/40 shadow-neon-cyan text-slate-100 font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hologram scanline & top tech deco */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent pointer-events-none" />
        <div className="flex items-center justify-between pb-4 border-b border-cyan-500/20">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-cyan-950/60 border border-cyan-500/30">
              {getIcon()}
            </div>
            <div>
              <div className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase">
                HOLOGRAPHIC TELEMETRY NODE // {selectedObject.sector}
              </div>
              <h2 className="text-xl font-bold font-display tracking-wide text-white">
                {selectedObject.name}
              </h2>
            </div>
          </div>
          <button
            type="button"
            aria-label="Close telemetry node inspector"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              soundManager.playClick();
              closeInspector();
            }}
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 hover:border-cyan-400 transition cursor-pointer z-10 flex items-center justify-center"
          >
            <X className="w-5 h-5 pointer-events-none" />
          </button>
        </div>

        {/* Dynamic Telemetry Stats Grid */}
        <div className="py-5 space-y-4">
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-700/50">
            <span className="text-xs text-slate-400 font-mono">STATUS LEVEL</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {selectedObject.status || 'OPERATIONAL'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            {/* Hospital Attributes */}
            {selectedObject.type === 'hospital' && (
              <>
                <div className="p-3 rounded-lg bg-slate-900/40 border border-cyan-500/15">
                  <div className="text-xs text-slate-400 font-mono">Beds Available</div>
                  <div className="text-2xl font-bold text-white font-display mt-0.5">{selectedObject.availableBeds} / {selectedObject.beds}</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/40 border border-cyan-500/15">
                  <div className="text-xs text-slate-400 font-mono">Emergency Capacity</div>
                  <div className="text-2xl font-bold text-amber-400 font-display mt-0.5">{selectedObject.emergencyCapacity}%</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/40 border border-cyan-500/15">
                  <div className="text-xs text-slate-400 font-mono">Active Ambulances</div>
                  <div className="text-2xl font-bold text-cyan-400 font-display mt-0.5">{selectedObject.ambulances} Units</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/40 border border-cyan-500/15">
                  <div className="text-xs text-slate-400 font-mono">Medical Staff</div>
                  <div className="text-2xl font-bold text-white font-display mt-0.5">{selectedObject.staff} On Duty</div>
                </div>
              </>
            )}

            {/* Power Station Attributes */}
            {selectedObject.type === 'power' && (
              <>
                <div className="p-3 rounded-lg bg-slate-900/40 border border-cyan-500/15">
                  <div className="text-xs text-slate-400 font-mono">Generation Output</div>
                  <div className="text-2xl font-bold text-emerald-400 font-display mt-0.5">{selectedObject.generation}</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/40 border border-cyan-500/15">
                  <div className="text-xs text-slate-400 font-mono">Parasitic Load</div>
                  <div className="text-2xl font-bold text-slate-300 font-display mt-0.5">{selectedObject.consumption}</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/40 border border-cyan-500/15">
                  <div className="text-xs text-slate-400 font-mono">Thermal Efficiency</div>
                  <div className="text-2xl font-bold text-cyan-400 font-display mt-0.5">{selectedObject.efficiency}%</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/40 border border-cyan-500/15">
                  <div className="text-xs text-slate-400 font-mono">Grid Synchronization</div>
                  <div className="text-2xl font-bold text-emerald-300 font-display mt-0.5">99.8 Hz Lock</div>
                </div>
              </>
            )}

            {/* Water Facility Attributes */}
            {selectedObject.type === 'water' && (
              <>
                <div className="p-3 rounded-lg bg-slate-900/40 border border-cyan-500/15">
                  <div className="text-xs text-slate-400 font-mono">Reserve Volume</div>
                  <div className="text-2xl font-bold text-cyan-300 font-display mt-0.5">{selectedObject.capacity}</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/40 border border-cyan-500/15">
                  <div className="text-xs text-slate-400 font-mono">Purity Standard</div>
                  <div className="text-2xl font-bold text-emerald-400 font-display mt-0.5">{selectedObject.currentPurity}</div>
                </div>
                <div className="col-span-2 p-3 rounded-lg bg-slate-900/40 border border-cyan-500/15">
                  <div className="text-xs text-slate-400 font-mono">Main Intake Flow Rate</div>
                  <div className="text-2xl font-bold text-cyan-400 font-display mt-0.5">{selectedObject.flowRate}</div>
                </div>
              </>
            )}

            {/* Waste Facility Attributes */}
            {selectedObject.type === 'waste' && (
              <>
                <div className="p-3 rounded-lg bg-slate-900/40 border border-cyan-500/15">
                  <div className="text-xs text-slate-400 font-mono">Daily Throughput</div>
                  <div className="text-2xl font-bold text-amber-300 font-display mt-0.5">{selectedObject.dailyThroughput}</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/40 border border-cyan-500/15">
                  <div className="text-xs text-slate-400 font-mono">Recycling Ratio</div>
                  <div className="text-2xl font-bold text-emerald-400 font-display mt-0.5">{selectedObject.recyclingRate}</div>
                </div>
                <div className="col-span-2 p-3 rounded-lg bg-slate-900/40 border border-cyan-500/15">
                  <div className="text-xs text-slate-400 font-mono">Recaptured Bio-Energy</div>
                  <div className="text-2xl font-bold text-lime-400 font-display mt-0.5">{selectedObject.energyRecaptured}</div>
                </div>
              </>
            )}

            {/* Metro Station Attributes */}
            {selectedObject.type === 'metro' && (
              <>
                <div className="p-3 rounded-lg bg-slate-900/40 border border-cyan-500/15">
                  <div className="text-xs text-slate-400 font-mono">Next Train Arrival</div>
                  <div className="text-2xl font-bold text-cyan-300 font-display mt-0.5">{selectedObject.nextArrival}</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/40 border border-cyan-500/15">
                  <div className="text-xs text-slate-400 font-mono">Platform Concourse</div>
                  <div className="text-2xl font-bold text-indigo-300 font-display mt-0.5">{selectedObject.platforms} Tracks</div>
                </div>
                <div className="col-span-2 p-3 rounded-lg bg-slate-900/40 border border-cyan-500/15">
                  <div className="text-xs text-slate-400 font-mono">Connected Lines</div>
                  <div className="text-sm font-bold text-white mt-1 flex flex-wrap gap-2">
                    {selectedObject.lines?.map((line, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-500/30 text-xs">
                        {line}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Skyscraper / Generic Building */}
            {['skyscraper', 'commercial', 'residential', 'industrial', 'school', 'park'].includes(selectedObject.type) && (
              <>
                <div className="p-3 rounded-lg bg-slate-900/40 border border-cyan-500/15">
                  <div className="text-xs text-slate-400 font-mono">Sector Assignment</div>
                  <div className="text-lg font-bold text-white font-display mt-0.5">{selectedObject.sector}</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/40 border border-cyan-500/15">
                  <div className="text-xs text-slate-400 font-mono">Structural Integrity</div>
                  <div className="text-lg font-bold text-emerald-400 font-display mt-0.5">{selectedObject.structuralIntegrity || 98}%</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/40 border border-cyan-500/15">
                  <div className="text-xs text-slate-400 font-mono">Occupancy / Load</div>
                  <div className="text-lg font-bold text-cyan-300 font-display mt-0.5">{selectedObject.occupancy || 84}%</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/40 border border-cyan-500/15">
                  <div className="text-xs text-slate-400 font-mono">Power Draw</div>
                  <div className="text-lg font-bold text-amber-300 font-display mt-0.5">{selectedObject.powerUsage || '2.4 MW'}</div>
                </div>
              </>
            )}
          </div>

          {/* AI Automated Diagnostic Note */}
          <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/25 flex items-start gap-2.5">
            <Cpu className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div className="text-xs text-cyan-200/90 leading-relaxed font-mono">
              <span className="font-bold text-cyan-300">AI DIAGNOSTIC: </span>
              {selectedObject.aiRecommendation || 'Facility operating within target tolerances. Automated telemetry streaming active at 50Hz.'}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-3 border-t border-cyan-500/20">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              soundManager.playClick();
              closeInspector();
            }}
            className="px-5 py-2 text-xs font-mono font-bold uppercase rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black shadow-neon-cyan transition cursor-pointer"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
}
