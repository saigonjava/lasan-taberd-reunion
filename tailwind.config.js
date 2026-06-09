/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        neon: '#38BDF8',
      },
      backgroundImage: {
        'grid-pattern': "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(148 163 184 / 0.04)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e\")",
      },
      boxShadow: {
        neon: '0 0 20px rgba(56,189,248,0.35)',
        'neon-lg': '0 0 40px rgba(56,189,248,0.5), 0 0 80px rgba(56,189,248,0.15)',
        card: '0 4px 32px rgba(0,0,0,0.5)',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease-out both',
        'fade-up-d1': 'fadeUp 0.7s 0.1s ease-out both',
        'fade-up-d2': 'fadeUp 0.7s 0.2s ease-out both',
        'fade-up-d3': 'fadeUp 0.7s 0.3s ease-out both',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'float': 'float 8s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(28px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%,100%': { opacity: '0.4' },
          '50%':     { opacity: '0.9' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-14px)' },
        },
      },
    },
  },
  plugins: [],
}
