/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#dc2626',
          hover: '#b91c1c',
          glow: 'rgba(220, 38, 38, 0.2)',
        },
        'bg-base': '#fffdfa',
        'glass': {
          bg: 'rgba(255, 253, 250, 0.85)',
          border: 'rgba(254, 226, 226, 0.8)',
        }
      },
      fontFamily: {
        manrope: ['Manrope', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 10px 25px -5px rgba(220, 38, 38, 0.05), 0 8px 10px -6px rgba(220, 38, 38, 0.01)',
        'hover': '0 20px 25px -5px rgba(220, 38, 38, 0.1), 0 10px 10px -5px rgba(220, 38, 38, 0.04)',
      },
      animation: {
        'dropdown-fade': 'dropdownFade 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)',
      },
      keyframes: {
        dropdownFade: {
          '0%': { opacity: '0', transform: 'scale(0.95) translateY(-10px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
      }
    },
  },
  plugins: [],
}