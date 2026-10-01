import React, { useEffect, useState } from 'react';

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    // Only run on devices with fine pointer (mouse/trackpad, not touch)
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const onMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      const target = e.target;
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a')
      );
    };

    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  // If offscreen or touch device
  if (pos.x < 0) return null;

  return (
    <>
      {/* Primary Dot */}
      <div
        className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          transform: `translate(-50%, -50%) scale(${clicked ? 0.7 : isPointer ? 1.4 : 1})`,
        }}
      >
        <div className={`w-2.5 h-2.5 rounded-full ${isPointer ? 'bg-cyan-300 shadow-neon-cyan' : 'bg-cyan-400'}`} />
      </div>

      {/* Outer Hologram Laser Ring */}
      <div
        className="fixed pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-all duration-150 ease-out"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          transform: `translate(-50%, -50%) scale(${clicked ? 1.6 : isPointer ? 1.8 : 1})`,
        }}
      >
        <div
          className={`w-7 h-7 rounded-full border ${
            isPointer ? 'border-cyan-300 border-dashed animate-spin' : 'border-cyan-500/40'
          }`}
        />
      </div>
    </>
  );
}
