import React, { useState, useRef, useEffect } from 'react';
import { api } from '../../services/api';
import { soundManager } from '../../utils/sound';
import { Bot, Send, X, Sparkles, MessageSquare, CornerDownLeft, Loader2 } from 'lucide-react';

export function AIChatModal({ isOpen: externalOpen, onClose: externalClose, floating = true }) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = floating ? internalOpen : externalOpen;
  const onClose = floating ? () => setInternalOpen(false) : externalClose;

  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Greetings, Operator. I am **FutureCity X AI Core**. Telemetry streams are synchronized across all 8 sectors. Ask me about real-time traffic conditions, grid stability, water pressure, waste backlogs, or emergency incidents.',
      timestamp: 'Central AI // Online'
    }
  ]);

  const messagesEndRef = useRef(null);

  const suggestedPrompts = [
    'Why is traffic high in Sector 5?',
    'What is the city\'s current energy status?',
    'Which area has the highest waste?',
    'What should the city optimize first?',
    'Show me today\'s major incidents.'
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Support ESC key to close modal
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        soundManager.playClick();
        if (onClose) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSend = async (userQuery) => {
    const textToSend = userQuery || query;
    if (!textToSend.trim() || loading) return;

    soundManager.playClick();
    setQuery('');

    const userMsg = {
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await api.askAIChat(textToSend);
      if (res.success && res.reply) {
        soundManager.playBeep(1200, 0.08);
        setMessages(prev => [
          ...prev,
          {
            role: 'assistant',
            content: res.reply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: '⚠️ AI Core connectivity bottleneck. Telemetry telemetry cache returned nominal status.',
          timestamp: 'Diagnostic Fallback'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Shared Chat Body Content
  const renderChatContent = () => (
    <>
      {/* Top Cyan Glowing Beam */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent pointer-events-none" />

      {/* Chat Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-cyan-500/20 bg-slate-900/60 shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-cyan-950 border border-cyan-500/30">
            <Bot className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold font-display text-white tracking-wider">
                FUTURECITY X // AI CORE ASSISTANT
              </h3>
              <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                ONLINE
              </span>
            </div>
            <div className="text-[10px] font-mono text-cyan-400">
              Grounded in Live Sensor Telemetry • Gemini 1.5 Flash Architecture
            </div>
          </div>
        </div>

        <button
          type="button"
          aria-label="Close AI Core Assistant"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            soundManager.playClick();
            if (onClose) onClose();
          }}
          className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 hover:border-cyan-400 transition cursor-pointer z-10 flex items-center justify-center"
        >
          <X className="w-5 h-5 pointer-events-none" />
        </button>
      </div>

      {/* Suggested Prompt Chips */}
      <div className="px-4 py-2 border-b border-cyan-500/10 bg-slate-950/40 flex items-center gap-1.5 overflow-x-auto text-[11px] font-mono no-scrollbar shrink-0">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
        {suggestedPrompts.map((p, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSend(p)}
            className="px-2.5 py-1 rounded-full bg-slate-900 hover:bg-cyan-950 text-slate-300 hover:text-cyan-300 border border-cyan-500/20 whitespace-nowrap transition cursor-pointer"
          >
            {p}
          </button>
        ))}
      </div>

            {/* Message Conversation Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${
              m.role === 'user' ? 'items-end' : 'items-start'
            }`}
          >
            <div className="text-[10px] font-mono text-slate-400 mb-1 px-1">
              {m.role === 'user' ? 'Operator' : 'AI Core'} • {m.timestamp}
            </div>
            <div
              className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                m.role === 'user'
                  ? 'bg-cyan-600/90 text-white rounded-tr-none font-mono shadow-md'
                  : 'bg-[#0f1938]/80 text-slate-200 border border-cyan-500/25 rounded-tl-none font-sans shadow-glass'
              }`}
            >
              <div className="whitespace-pre-wrap">{m.content}</div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 p-3 text-xs text-cyan-400 font-mono">
            <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
            <span>Synthesizing city telemetry...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 border-t border-cyan-500/20 bg-slate-950/70 flex items-center gap-2 shrink-0"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask about traffic, energy grid, waste, or emergency response..."
          className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900/90 border border-cyan-500/30 text-white text-xs font-mono placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
        />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="p-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-black font-bold transition shadow-neon-cyan cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </>
  );

  // If embedded in a dedicated page (not floating button)
  if (!floating) {
    return (
      <div className="relative w-full h-[640px] flex flex-col rounded-2xl bg-[#080e22]/95 border border-cyan-500/40 shadow-neon-cyan font-sans overflow-hidden">
        {renderChatContent()}
      </div>
    );
  }

  return (
    <>
      {/* Floating Action Button */}
      <button
        type="button"
        onClick={() => {
          soundManager.playClick();
          setInternalOpen(!internalOpen);
        }}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-white font-mono text-xs font-bold shadow-neon-cyan hover:scale-105 active:scale-95 transition-all cursor-pointer"
      >
        <div className="relative">
          <Bot className="w-5 h-5 text-white" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        </div>
        <span className="tracking-wider">AI CORE</span>
      </button>

      {/* Holographic AI Chat Window Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              soundManager.playClick();
              if (onClose) onClose();
            }
          }}
        >
          <div
            className="relative w-full max-w-2xl h-[620px] max-h-[90vh] flex flex-col rounded-2xl bg-[#080e22]/95 border border-cyan-500/40 shadow-neon-cyan font-sans overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {renderChatContent()}
          </div>
        </div>
      )}
    </>
  );
}
