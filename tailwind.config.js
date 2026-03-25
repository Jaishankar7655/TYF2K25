/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'neon-pink': '#ff2d95',
        'neon-cyan': '#00f0ff',
        'neon-purple': '#b026ff',
        'neon-yellow': '#ffe600',
        'neon-green': '#39ff14',
        'dark-bg': '#0a0a1a',
        'dark-card': '#12122a',
        'dark-surface': '#1a1a3e',
      },
      keyframes: {
        ticker: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideInUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        neonPulse: {
          '0%, 100%': { textShadow: '0 0 5px #ff2d95, 0 0 10px #ff2d95, 0 0 20px #ff2d95' },
          '50%': { textShadow: '0 0 5px #00f0ff, 0 0 10px #00f0ff, 0 0 20px #00f0ff' }
        },
        partyFloat: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        discoPulse: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.1)' }
        },
        confettiFall: {
          '0%': { transform: 'translateY(-100vh) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(100vh) rotate(720deg)', opacity: '0' }
        },
        musicBars: {
          '0%, 100%': { height: '8px' },
          '50%': { height: '24px' }
        },
        rainbowGlow: {
          '0%': { boxShadow: '0 0 15px #ff2d95' },
          '25%': { boxShadow: '0 0 15px #00f0ff' },
          '50%': { boxShadow: '0 0 15px #b026ff' },
          '75%': { boxShadow: '0 0 15px #ffe600' },
          '100%': { boxShadow: '0 0 15px #ff2d95' }
        }
      },
      animation: {
        ticker: 'ticker 12s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-in-up': 'slideInUp 0.6s ease-out',
        'neon-pulse': 'neonPulse 3s ease-in-out infinite',
        'party-float': 'partyFloat 3s ease-in-out infinite',
        'disco-pulse': 'discoPulse 2s ease-in-out infinite',
        'confetti': 'confettiFall 4s linear infinite',
        'music-bars': 'musicBars 0.8s ease-in-out infinite',
        'rainbow-glow': 'rainbowGlow 4s linear infinite',
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
};