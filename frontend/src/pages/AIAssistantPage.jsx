import React from 'react';
import { AIChatModal } from '../components/ai/AIChatModal';
import { Bot, Sparkles, Cpu, Layers } from 'lucide-react';

export function AIAssistantPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6 font-sans">
      <div className="pb-4 border-b border-cyan-500/20">
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-cyan-400 uppercase">
          <Bot className="w-4 h-4 text-cyan-400" />
          <span>AUTONOMOUS NEURAL ADVISOR</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white mt-1">
          AI City Assistant Console
        </h1>
        <p className="text-xs text-slate-400 font-mono mt-1">
          Direct neural link to FutureCity X telemetry bus, trained to advise on municipal operations, energy load balance, and emergency corridors.
        </p>
      </div>

      <div className="rounded-2xl border border-cyan-500/30 overflow-hidden shadow-2xl bg-[#070d24]">
        <AIChatModal floating={false} isOpen={true} onClose={() => {}} />
      </div>
    </div>
  );
}
