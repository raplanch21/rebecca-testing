/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-midnight': '#17044A',
        'brand-white': '#FFFFFF',
        'brand-teal': 'var(--primary-color)',
        'brand-teal-dark': 'var(--teal-80)',
        'brand-pink': 'var(--pink-110)',
        'gray-0': 'var(--gray-0)',
        'gray-10': 'var(--gray-10)',
        'gray-60': 'var(--gray-60)',
        'gray-100': 'var(--gray-100)',
        'gray-110': 'var(--gray-110)',
        'border-color': 'var(--border-color)',
        'purple-4': '#8B5CF6',
        'purple-hover': 'rgba(139, 92, 246, 0.2)',
        'purple-active': 'rgba(139, 92, 246, 0.3)',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'sora': ['Sora', 'sans-serif'],
      },
      fontSize: {
        'base': ['14.222px', '1.5'],
        'heading': ['36px', '1.2'],
      },
      spacing: {
        '18': '4.5rem',
      },
    },
  },
  plugins: [],
} 