/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          cream: '#FAF8F0',
          creamLight: '#FCFAF4',
          mint: '#EEF7E7',
          mintDark: '#E2F1D7',
          primary: '#08A82A',
          primaryHover: '#068f23',
          midForest: '#159447',
          deepGreen: '#075C35',
          darkForest: '#0B3B24',
          forestDark: '#123B2B',
          textSlate: '#5A7263',
          lime: '#D8F58A',
          cardBg: '#FFFFFF',
          borderGreen: '#D7ECD1',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 8px 30px rgba(18, 59, 43, 0.05)',
        'card': '0 14px 36px rgba(15, 60, 37, 0.07)',
        'float': '0 20px 40px -10px rgba(8, 168, 42, 0.16)',
      },
      borderRadius: {
        '3xl': '1.75rem',
        '4xl': '2.25rem',
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ],
}
