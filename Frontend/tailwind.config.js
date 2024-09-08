/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slideInFromBottom: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        slideInFromBottom: 'slideInFromBottom 1s ease-out',
        slideInFromBottomDelayed: 'slideInFromBottom 1s ease-out 0.2s',
      }
    },
  },
  plugins: [],
};