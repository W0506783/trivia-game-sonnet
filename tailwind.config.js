export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          cyan: '#00ffff',
          pink: '#ff00ff',
          yellow: '#ffff00',
          green: '#00ff88',
        }
      },
      fontFamily: {
        arcade: ['"Press Start 2P"', 'cursive'],
      },
      boxShadow: {
        'neon-cyan': '0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 40px #00ffff',
        'neon-pink': '0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 40px #ff00ff',
        'neon-green': '0 0 10px #00ff88, 0 0 20px #00ff88, 0 0 40px #00ff88',
      },
      animation: {
        flicker: 'flicker 3s infinite',
      },
      keyframes: {
        flicker: {
          '0%, 95%, 100%': { opacity: 1 },
          '96%, 98%': { opacity: 0.5 },
          '97%, 99%': { opacity: 0.8 },
        }
      }
    },
  },
  plugins: [],
}