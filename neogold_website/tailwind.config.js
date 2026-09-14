/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          DEFAULT: '#14453D',
          light: '#1a574d',
          dark: '#0e352f',
        },
        'accent': {
          DEFAULT: '#DEC678',
          light: '#e4d290',
          dark: '#d3b95e',
        }
      },
      keyframes: {
        shimmer: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'float-slow': {
          '0%': { transform: 'translateY(0px) translateX(0px)' },
          '25%': { transform: 'translateY(-15px) translateX(5px)' },
          '50%': { transform: 'translateY(-5px) translateX(15px)' },
          '75%': { transform: 'translateY(-10px) translateX(5px)' },
          '100%': { transform: 'translateY(0px) translateX(0px)' },
        },
        'float-slower': {
          '0%': { transform: 'translateY(0px) translateX(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-7px) translateX(-5px) rotate(2deg)' },
          '66%': { transform: 'translateY(-14px) translateX(5px) rotate(-2deg)' },
          '100%': { transform: 'translateY(0px) translateX(0px) rotate(0deg)' },
        },
        'coin-float': {
          '0%': { transform: 'translateY(0) rotateY(0)' },
          '25%': { transform: 'translateY(-5px) rotateY(30deg)' },
          '50%': { transform: 'translateY(-10px) rotateY(90deg)' },
          '75%': { transform: 'translateY(-5px) rotateY(150deg)' },
          '100%': { transform: 'translateY(0) rotateY(180deg)' },
        },
        'bar-rotate': {
          '0%': { transform: 'translateY(0) rotateX(10deg) rotateY(0)' },
          '25%': { transform: 'translateY(-3px) rotateX(15deg) rotateY(5deg)' },
          '50%': { transform: 'translateY(-7px) rotateX(20deg) rotateY(0)' },
          '75%': { transform: 'translateY(-3px) rotateX(15deg) rotateY(-5deg)' },
          '100%': { transform: 'translateY(0) rotateX(10deg) rotateY(0)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.7, transform: 'scale(0.98)' },
        },
        wave: {
          '0%': { transform: 'translateX(0) translateY(0)' },
          '50%': { transform: 'translateX(-25px) translateY(10px)' },
          '100%': { transform: 'translateX(0) translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        }
      },
      animation: {
        shimmer: 'shimmer 3s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 8s ease-in-out infinite',
        'float-slower': 'float-slower 12s ease-in-out infinite',
        'coin-float': 'coin-float 10s ease-in-out infinite',
        'bar-rotate': 'bar-rotate 12s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
        wave: 'wave 15s ease-in-out infinite',
        fadeIn: 'fadeIn 0.5s ease-out'
      },
    },
  },
  plugins: [],
}; 