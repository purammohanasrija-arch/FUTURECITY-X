import React from 'react';
import { useCity } from '../../context/CityContext';
import { Bell, X, AlertTriangle, CheckCircle, Info, ShieldAlert } from 'lucide-react';
import { soundManager } from '../../utils/sound';

export function NotificationToastContainer() {
  const { notifications, dismissNotification } = useCity();
  const recentToasts = notifications.slice(0, 3); // show top 3 toasts

  if (recentToasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm pointer-events-none">
      {recentToasts.map((n) => {
        const isAlert = n.type === 'alert' || n.type === 'warning';
        return (
          <div
            key={n.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border backdrop-blur-xl shadow-2xl transition-all animate-slideUp ${
              isAlert
                ? 'bg-[#18090f]/90 border-red-500/40 text-red-200'
                : 'bg-[#09152b]/90 border-cyan-500/40 text-cyan-100'
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {n.type === 'alert' ? (
                <ShieldAlert className="w-5 h-5 text-red-400" />
              ) : n.type === 'warning' ? (
                <AlertTriangle className="w-5 h-5 text-amber-400" />
              ) : n.type === 'success' ? (
                <CheckCircle className="w-5 h-5 text-emerald-400" />
              ) : (
                <Info className="w-5 h-5 text-cyan-400" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold font-mono uppercase tracking-wider text-white">
                {n.title}
              </div>
              <div className="text-xs opacity-90 leading-snug mt-0.5 line-clamp-2">
                {n.message}
              </div>
              <div className="text-[10px] text-slate-400 font-mono mt-1">{n.timestamp}</div>
            </div>

            <button
              type="button"
              aria-label="Dismiss alert"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                soundManager.playClick();
                dismissNotification(n.id);
              }}
              className="text-slate-400 hover:text-white transition p-1 rounded hover:bg-slate-800/60 cursor-pointer"
            >
              <X className="w-4 h-4 pointer-events-none" />
            </button>
          </div>
        );
      })}
    </div>
  );
}

export function NotificationDropdown({ isOpen, onClose }) {
  const { notifications, dismissNotification } = useCity();

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl bg-[#080d20] border border-cyan-500/30 shadow-2xl backdrop-blur-2xl z-50 overflow-hidden font-sans">
      <div className="flex items-center justify-between px-4 py-3 border-b border-cyan-500/20 bg-slate-900/60">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
            Central Alerts ({notifications.length})
          </span>
        </div>
        <button
          type="button"
          aria-label="Close notification dropdown"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            soundManager.playClick();
            if (onClose) onClose();
          }}
          className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800/60 cursor-pointer transition"
        >
          <X className="w-4 h-4 pointer-events-none" />
        </button>
      </div>

      <div className="max-h-80 overflow-y-auto divide-y divide-cyan-500/10">
        {notifications.length === 0 ? (
          <div className="p-6 text-center text-xs text-slate-400 font-mono">
            No active system alerts. All networks operating smoothly.
          </div>
        ) : (
          notifications.map((n) => (
            <div key={n.id} className="p-3 hover:bg-slate-900/40 transition flex items-start gap-2.5">
              <div className="mt-0.5 shrink-0">
                {n.type === 'alert' ? (
                  <ShieldAlert className="w-4 h-4 text-red-400" />
                ) : n.type === 'warning' ? (
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                ) : (
                  <Info className="w-4 h-4 text-cyan-400" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-slate-200">{n.title}</div>
                <div className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{n.message}</div>
                <div className="text-[10px] text-cyan-400 font-mono mt-1">{n.timestamp}</div>
              </div>
              <button
                onClick={() => dismissNotification(n.id)}
                className="text-slate-500 hover:text-slate-300"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
