import React from 'react';

export function HolographicCard({
  title,
  subtitle,
  icon,
  badge,
  badgeColor = 'cyan',
  glowColor = 'cyan',
  children,
  className = '',
  headerAction,
}) {
  const getGlowClass = () => {
    switch (glowColor) {
      case 'green': return 'hover:border-emerald-500/50 hover:shadow-neon-green';
      case 'amber': return 'hover:border-amber-500/50 hover:shadow-neon-amber';
      case 'pink': return 'hover:border-pink-500/50 hover:shadow-neon-pink';
      case 'red': return 'hover:border-red-500/50 shadow-sm';
      default: return 'hover:border-cyan-500/50 hover:shadow-neon-cyan';
    }
  };

  const getBadgeStyle = () => {
    switch (badgeColor) {
      case 'green': return 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40';
      case 'amber': return 'bg-amber-950/80 text-amber-300 border-amber-500/40';
      case 'red': return 'bg-red-950/80 text-red-300 border-red-500/40';
      default: return 'bg-cyan-950/80 text-cyan-300 border-cyan-500/40';
    }
  };

  return (
    <div className={`relative overflow-hidden rounded-xl bg-[#090f22]/80 backdrop-blur-xl border border-cyan-500/20 transition-all duration-300 ${getGlowClass()} ${className}`}>
      {/* Top subtle highlight line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

      {/* Card Header (if title or icon passed) */}
      {(title || icon) && (
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-cyan-500/15">
          <div className="flex items-center gap-2.5">
            {icon && <div className="text-cyan-400">{icon}</div>}
            <div>
              {subtitle && (
                <div className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase">
                  {subtitle}
                </div>
              )}
              <h3 className="text-sm font-bold font-display text-white tracking-wide">
                {title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {badge && (
              <span className={`px-2 py-0.5 rounded text-[11px] font-mono border ${getBadgeStyle()}`}>
                {badge}
              </span>
            )}
            {headerAction}
          </div>
        </div>
      )}

      {/* Card Content Body */}
      <div className="p-5">{children}</div>
    </div>
  );
}
