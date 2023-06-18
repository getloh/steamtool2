/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-poppins)']
      },
      fontSize: {
        '2xs': ['0.6rem', {
          lineHeight: '0.66rem',
        }],
        '3xs': ['0.33rem', {
          lineHeight: '0.5rem',
        }]
      },
    },
  },
  plugins: [],
}

