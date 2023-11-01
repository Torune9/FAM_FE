/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor : {
        'blueHunt' : '#3A98B9',
        'redHunt' : '#FF6969',
        'table' : '#96B6C5',
        'button' : '#7286D3',
        'blackCurrent' : '#191717'
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

