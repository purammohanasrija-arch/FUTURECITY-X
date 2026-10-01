import React, { useState, useEffect } from 'react';
import { HolographicCard } from '../components/common/HolographicCard';
import { api } from '../services/api';
import {
  HardHat,
  Activity,
  Layers,
  CheckCircle2,
  Clock,
  Compass,
  AlertTriangle,
  Zap
} from 'lucide-react';

export function InfrastructureCenter() {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    const fetchInfra = async () => {
      try {
        const res = await api.getInfrastructure();
        if (res.success && res.data) {
          setNodes(res.data);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchInfra();
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto font-sans">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-cyan-500/20">
        <div>
          <div className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
            // STRUCTURAL STRAIN & SENSOR TELEMETRY
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
            Civic Infrastructure Health Monitoring
          </h1>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-cyan-500/30 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-slate-400">STRUCTURAL INTEGRITY:</span>
          <span className="text-emerald-400 font-bold">NOMINAL 94.2%</span>
        </div>
      </div>

      {/* Nodes Grid (Section 21) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {nodes.map((node) => (
          <HolographicCard
            key={node.id}
            title={node.name}
            subtitle={node.type}
            icon={<HardHat className="w-4 h-4 text-cyan-400" />}
            badge={node.status}
            badgeColor="green"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-mono text-slate-400">Structural Health</span>
                <span className="text-3xl font-bold font-display text-emerald-400">
                  {node.health}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full"
                  style={{ width: `${node.health}%` }}
                />
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-2 border-t border-cyan-500/10">
                <div className="p-2 rounded bg-slate-900/60">
                  <div className="text-[10px] text-slate-400">Current Load</div>
                  <div className="text-white font-bold mt-0.5">{node.currentLoad}%</div>
                </div>
                <div className="p-2 rounded bg-slate-900/60">
                  <div className="text-[10px] text-slate-400">Vibration Index</div>
                  <div className="text-cyan-300 font-bold mt-0.5">{node.vibrationIndex}</div>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
                <span>Sector: {node.sector}</span>
                <span>Inspected: {node.lastInspection}</span>
              </div>
            </div>
          </HolographicCard>
        ))}
      </div>
    </div>
  );
}
