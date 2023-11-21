/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor : {
        'greyHunt' : '#393E46',
        'redHunt' : '#D65A31',
        'darkHunt' : '#2C3639',
        'greenHunt' : '#116D6E',
        'pencil' : '#334756',
        'table' : '#EEEEEE',
        'button' : '#7286D3',
        'blackCurrent' : '#222831'
      },
      fontFamily: {
       'codensed'  : '"Roboto Condensed",sans-serif',
       'rubik' : 'Rubik,sans-serif',
       'barlow' : 'Barlow,sans-serif' 
      }
    },
  },
  plugins: [],
}

