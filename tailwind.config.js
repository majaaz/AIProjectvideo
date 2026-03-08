/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        amazon: {
          orange: '#FF9900',
          'orange-hover': '#F08804',
          blue: '#232F3E',
          'blue-light': '#37475A',
          yellow: '#FFD814',
          'yellow-hover': '#F7CA00',
        },
      },
    },
  },
  plugins: [],
}
