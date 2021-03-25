module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        '9/2': '45%' 
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
