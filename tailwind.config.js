/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: '#034641', // 
        back_ground:"#D9D9D9",
        green:"#098178",
        gray2:"#F2F2F2",
        custom_green:'#09817803',
        custom_white: '#FFFFFF',

        
      },
    },
  },
  plugins: [],
}

