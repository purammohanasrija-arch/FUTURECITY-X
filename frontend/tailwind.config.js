/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#050811',
          card: 'rgba(10, 16, 35, 0.75)',
          border: 'rgba(0, 240, 255, 0.18)',
          cyan: '#00f0ff',
          neonGreen: '#00ff9d',
          neonAmber: '#ffaa00',
          neonPink: '#ff007f',
          neonPurple: '#9d4edd',
          alertRed: '#ff3344',
          slate: '#0f172a',
          dark: '#03050c',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
        display: ['Orbitron', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'neon-cyan': '0 0 15px rgba(0, 240, 255, 0.35)',
        'neon-green': '0 0 15px rgba(0, 255, 157, 0.35)',
        'neon-amber': '0 0 15px rgba(255, 170, 0, 0.35)',
        'neon-pink': '0 0 15px rgba(255, 0, 127, 0.35)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan': 'scanline 8s linear infinite',
        'grid-flow': 'gridFlow 20s linear infinite',
        'radar': 'radarSweep 4s linear infinite',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        gridFlow: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '40px 40px' },
        },
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      }
    },
  },
  plugins: [],
}
