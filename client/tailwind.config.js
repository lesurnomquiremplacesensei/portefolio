/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette de couleurs sombres
        dark: {
          100: '#d1d5db', // Gris clair
          200: '#9ca3af', // Gris moyen
          300: '#6b7280', // Gris
          400: '#4b5563', // Gris foncé
          500: '#374151', // Gris très foncé
          600: '#1f2937', // Presque noir
          700: '#111827', // Noir bleuté
          800: '#0f172a', // Noir profond
          900: '#030712', // Noir absolu
        },
        primary: {
          100: '#93c5fd', // Bleu clair
          200: '#60a5fa', // Bleu moyen
          300: '#3b82f6', // Bleu
          400: '#2563eb', // Bleu foncé
          500: '#1d4ed8', // Bleu très foncé
          600: '#1e40af', // Bleu profond
          700: '#1e3a8a', // Bleu nuit
        },
        accent: {
          100: '#f9a8d4', // Rose clair
          200: '#f472b6', // Rose moyen
          300: '#ec4899', // Rose
          400: '#db2777', // Rose foncé
          500: '#be185d', // Rose très foncé
        }
      },
      backgroundColor: {
        'site': '#121212', // Couleur de fond principale du site
        'card': '#1e1e1e', // Couleur de fond des cartes
        'header': '#0f0f0f', // Couleur de fond de l'en-tête
      },
      textColor: {
        'primary': '#ffffff', // Texte principal
        'secondary': '#a3a3a3', // Texte secondaire
        'muted': '#6b7280', // Texte atténué
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 3s infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out forwards',
        'slide-in': 'slideIn 0.7s ease-out forwards',
        'slide-in-right': 'slideInRight 0.7s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.7s ease-out forwards',
        'flip-in': 'flipIn 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards',
        'zoom-in': 'zoomIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
        'rotate-in': 'rotateIn 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'float': 'float 3s ease-in-out infinite',
        'blur-in': 'blurIn 0.7s ease-out forwards',
        'swing': 'swing 1s ease-in-out forwards',
        'scale-up': 'scaleUp 0.5s cubic-bezier(0.39, 0.575, 0.565, 1) forwards',
        'progress-fill': 'progressFill 1.2s cubic-bezier(0.65, 0, 0.35, 1) forwards',
        'bounce-in': 'bounceIn 0.6s cubic-bezier(0.215, 0.610, 0.355, 1.000) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(50px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-50px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        flipIn: {
          '0%': { transform: 'perspective(400px) rotateX(90deg)', opacity: '0' },
          '40%': { transform: 'perspective(400px) rotateX(-10deg)' },
          '70%': { transform: 'perspective(400px) rotateX(10deg)' },
          '100%': { transform: 'perspective(400px) rotateX(0deg)', opacity: '1' },
        },
        zoomIn: {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        rotateIn: {
          '0%': { transform: 'rotate(-15deg) scale(0.8)', opacity: '0', transformOrigin: 'center' },
          '100%': { transform: 'rotate(0) scale(1)', opacity: '1', transformOrigin: 'center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        blurIn: {
          '0%': { filter: 'blur(10px)', opacity: '0' },
          '100%': { filter: 'blur(0)', opacity: '1' },
        },
        swing: {
          '0%': { transform: 'rotate(0deg)', transformOrigin: 'top center' },
          '20%': { transform: 'rotate(15deg)', transformOrigin: 'top center' },
          '40%': { transform: 'rotate(-10deg)', transformOrigin: 'top center' },
          '60%': { transform: 'rotate(5deg)', transformOrigin: 'top center' },
          '80%': { transform: 'rotate(-5deg)', transformOrigin: 'top center' },
          '100%': { transform: 'rotate(0deg)', transformOrigin: 'top center' },
        },
        scaleUp: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '80%': { transform: 'scale(1.1)', opacity: '0.8' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        progressFill: {
          '0%': { width: '0%', opacity: '0.5' },
          '50%': { opacity: '1' },
          '100%': { width: 'var(--progress-width)', opacity: '1' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '20%': { transform: 'scale(1.1)' },
          '40%': { transform: 'scale(0.9)' },
          '60%': { transform: 'scale(1.03)', opacity: '1' },
          '80%': { transform: 'scale(0.97)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
        'width': 'width',
        'filter': 'filter',
      },
      boxShadow: {
        'nav': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'glow': '0 0 15px rgba(59, 130, 246, 0.5)',
        'inner-glow': 'inset 0 0 10px rgba(59, 130, 246, 0.3)',
      },
      transitionDelay: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1000': '1000ms',
        '1200': '1200ms',
        '1500': '1500ms',
        '2000': '2000ms',
      },
    },
  },
  plugins: [],
  safelist: [
    'animate-fade-in',
    'animate-slide-in',
    'animate-slide-in-right',
    'animate-slide-in-left',
    'animate-flip-in',
    'animate-zoom-in',
    'animate-rotate-in',
    'animate-float',
    'animate-blur-in',
    'animate-swing',
    'animate-scale-up',
    'animate-progress-fill',
    'animate-bounce-in',
    'delay-100',
    'delay-200',
    'delay-300',
    'delay-400',
    'delay-500',
    'delay-600',
    'delay-700',
    'delay-800',
    'delay-900',
    'delay-1000',
    'delay-1500',
    'delay-2000',
    'scale-x-0',
    'scale-x-100',
  ],
}