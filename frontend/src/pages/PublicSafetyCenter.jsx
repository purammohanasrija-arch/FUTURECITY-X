import React, { useState, useEffect } from 'react';
import { useCity } from '../context/CityContext';
import { HolographicCard } from '../components/common/HolographicCard';
import { soundManager } from '../utils/sound';
import {
  ShieldAlert,
  Flame,
  AlertTriangle,
  Radio,
  Car,
  CheckCircle2,
  Clock,
  Plus,
  Send,
  X,
  Compass,
  Cross
} from 'lucide-react';

export function PublicSafetyCenter() {
  const { incidents, reportIncident, dispatchIncidentUnit, resolveIncident } = useCity();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState('Traffic Accident');
  const [newSector, setNewSector] = useState('Central District');
  const [newSeverity, setNewSeverity] = useState('High');

  // Support ESC key to close modal
  useEffect(() => {
    if (!showCreateModal) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        soundManager.playClick();
        setShowCreateModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showCreateModal]);

  const incidentTypes = ['Traffic Accident', 'Fire', 'Flood', 'Medical Emergency', 'Power Failure', 'Security Incident'];
  const sectors = ['Central District', 'Innovation District', 'Green Valley', 'Industrial Zone', 'Sector 1', 'Sector 2', 'Sector 3', 'Sector 4', 'Metro District'];

  const handleCreateIncident = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    soundManager.playClick();
    await reportIncident({
      title: newTitle,
      type: newType,
      sector: newSector,
      severity: newSeverity,
      location: `${newSector} Concourse`
    });

    setNewTitle('');
    setShowCreateModal(false);
  };

  const handleDispatch = async (inc) => {
    soundManager.playClick();
    const unit = inc.nearestUnits?.[0]?.unitId || 'UNIT-01';
    await dispatchIncidentUnit(inc.id, unit);
  };

  const handleResolve = async (incId) => {
    soundManager.playClick();
    await resolveIncident(incId);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto font-sans">
      {/* Create Incident Modal */}
      {showCreateModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              soundManager.playClick();
              setShowCreateModal(false);
            }
          }}
        >
          <div
            className="relative w-full max-w-lg p-6 rounded-2xl bg-[#080d22] border border-cyan-500/40 shadow-neon-cyan text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20">
              <h3 className="text-base font-bold font-display uppercase tracking-wide">
                Simulate New Civic Incident
              </h3>
              <button
                type="button"
                aria-label="Close incident modal"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  soundManager.playClick();
                  setShowCreateModal(false);
                }}
                className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 hover:border-cyan-400 transition cursor-pointer z-10 flex items-center justify-center"
              >
                <X className="w-5 h-5 pointer-events-none" />
              </button>
            </div>

            <form onSubmit={handleCreateIncident} className="py-4 space-y-4 font-mono text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Incident Headline</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Autonomous Shuttle Signal Lockout"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-cyan-500/30 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Category Type</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-cyan-500/30 text-white"
                  >
                    {incidentTypes.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Sector</label>
                  <select
                    value={newSector}
                    onChange={(e) => setNewSector(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-cyan-500/30 text-white"
                  >
                    {sectors.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Severity Rating</label>
                <div className="flex gap-2">
                  {['Low', 'Medium', 'High', 'Critical'].map((sev) => (
                    <button
                      key={sev}
                      type="button"
                      onClick={() => setNewSeverity(sev)}
                      className={`flex-1 py-1.5 rounded-lg border font-bold ${
                        newSeverity === sev
                          ? 'bg-cyan-500 text-black border-cyan-400 font-bold'
                          : 'bg-slate-900 text-slate-400 border-slate-700'
                      }`}
                    >
                      {sev}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-cyan-500/20">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold shadow-neon-cyan"
                >
                  Broadcast Incident
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-cyan-500/20">
        <div>
          <div className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
            // CIVIL DEFENSE & EMERGENCY DISPATCH
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
            Public Safety & Emergency Command
          </h1>
        </div>

        <button
          onClick={() => {
            soundManager.playClick();
            setShowCreateModal(true);
          }}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-500 to-amber-500 text-black font-mono font-bold text-xs shadow-md hover:scale-105 active:scale-95 transition flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>REPORT NEW INCIDENT</span>
        </button>
      </div>

      {/* Incident Feed List (Section 19 & 20) */}
      <div className="space-y-4">
        {incidents.map((inc) => {
          const isResolved = inc.status === 'Resolved';
          const isCritical = inc.severity === 'Critical' || inc.severity === 'High';

          return (
            <div
              key={inc.id}
              className={`p-5 rounded-2xl border backdrop-blur-xl transition-all ${
                isResolved
                  ? 'bg-slate-950/40 border-slate-800 opacity-75'
                  : isCritical
                  ? 'bg-[#18080f]/80 border-red-500/40 shadow-lg'
                  : 'bg-[#090f24]/80 border-cyan-500/30'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Left: Info */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-mono text-cyan-400 font-bold uppercase">
                      [{inc.id}] • {inc.type}
                    </span>
                    <span className={`px-2 py-0.2 rounded text-[10px] font-mono font-bold uppercase border ${
                      inc.severity === 'Critical'
                        ? 'bg-red-950 text-red-300 border-red-500/50'
                        : inc.severity === 'High'
                        ? 'bg-amber-950 text-amber-300 border-amber-500/50'
                        : 'bg-cyan-950 text-cyan-300 border-cyan-500/50'
                    }`}>
                      {inc.severity} Severity
                    </span>
                  </div>

                  <h3 className="text-base font-bold font-display text-white">
                    {inc.title}
                  </h3>

                  <div className="text-xs text-slate-300 font-mono">
                    Location: {inc.location} ({inc.sector}) • Reported at {inc.time}
                  </div>

                  <div className="text-xs text-slate-400 font-sans italic mt-1">
                    AI Assessment: {inc.aiAssessment}
                  </div>
                </div>

                {/* Right: Dispatch State & Actions */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  {/* Status Indicator Badge */}
                  <div className="text-right">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">STATUS</div>
                    <div className={`text-xs font-mono font-bold uppercase flex items-center gap-1.5 ${
                      isResolved ? 'text-emerald-400' : 'text-amber-400'
                    }`}>
                      {!isResolved && <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />}
                      {inc.status}
                    </div>
                  </div>

                  {/* Nearest Units Pill */}
                  {!isResolved && inc.nearestUnits?.length > 0 && (
                    <div className="hidden xl:flex items-center gap-2 p-2 rounded-lg bg-slate-900 border border-slate-700 font-mono text-[10px] text-slate-300">
                      <span>Nearest:</span>
                      {inc.nearestUnits.slice(0, 2).map((u, i) => (
                        <span key={i} className="text-cyan-300">
                          {u.unitId} ({u.etaMin}m ETA)
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Dispatch Unit Button */}
                  {inc.status === 'Reported' && (
                    <button
                      onClick={() => handleDispatch(inc)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 text-black font-mono font-bold text-xs shadow-neon-cyan hover:scale-105 active:scale-95 transition flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>DISPATCH UNIT</span>
                    </button>
                  )}

                  {/* Mark Resolved Button */}
                  {!isResolved && inc.status !== 'Reported' && (
                    <button
                      onClick={() => handleResolve(inc.id)}
                      className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-mono font-bold text-xs shadow-neon-green transition flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>RESOLVE INCIDENT</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
