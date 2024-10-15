/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
    "./formkit.theme.ts" 
  ],
  

  theme: {
    extend: {
      keyframes: {
        spinner: {
          '0%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(180deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        sliding: {
          '0%': { transform: 'translate-x-0' },
          '50%': { transform: 'translate-x-2' },
          '100%': { transform: 'translate-x-full' },
        }
      },
      animation: {
        sliding: 'sliding 1s ease-in-out infinite',
      },
      
    // --color-whitePrimary: #FDFCFA;
    // --color-whiteSecondary: #F3F1EF;
      textColor: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        tab: "var(--color-tab)",
        mediumBlack: "var(--color-mediumBlack)",
        darkGrey: "var(--color-darkGrey)",
        lightGrey: "var(--color-lightGrey)",
        grey: "var(--color-grey)",
        barley: "var(--color-barley)",
        lightBarley: "var(--color-lightBarley)",
        
        orange: "var(--color-orange)",
        skyBlue: "var(--color-skyBlue)",
        royalBlue: "var(--color-royalBlue)",
        lightIndigo: "var(--color-lightIndigo)",
        lightPink: "var(--color-lightPink)",

        whitePrimary: "var(--color-whitePrimary)",
        whiteSecondary: "var(--color-whiteSecondary)",

        blackPrimary:"var(--color-blackPrimary)",
        blackSecondary: "var(--color-blackSecondary)",
        blackTertiary: "var(--color-blackTertiary)",
      },
      gradientColorStops:{
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        tab: "var(--color-tab)",
        mediumBlack: "var(--color-mediumBlack)",
        darkGrey: "var(--color-darkGrey)",
        lightGrey: "var(--color-lightGrey)",
        grey: "var(--color-grey)",
        barley: "var(--color-barley)",
        lightBarley: "var(--color-lightBarley)",
        
        orange: "var(--color-orange)",
        skyBlue: "var(--color-skyBlue)",
        royalBlue: "var(--color-royalBlue)",
        lightIndigo: "var(--color-lightIndigo)",
        lightPink: "var(--color-lightPink)",
        
        whitePrimary: "var(--color-whitePrimary)",
        whiteSecondary: "var(--color-whiteSecondary)",

        blackPrimary:"var(--color-blackPrimary)",
        blackSecondary: "var(--color-blackSecondary)",
        blackTertiary: "var(--color-blackTertiary)",
        
      },
      backgroundColor: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        tab: "var(--color-tab)",
        mediumBlack: "var(--color-mediumBlack)",
        darkGrey: "var(--color-darkGrey)",
        lightGrey: "var(--color-lightGrey)",
        grey: "var(--color-grey)",
        barley: "var(--color-barley)",
        lightBarley: "var(--color-lightBarley)",
        
        orange: "var(--color-orange)",
        skyBlue: "var(--color-skyBlue)",
        royalBlue: "var(--color-royalBlue)",
        lightIndigo: "var(--color-lightIndigo)",
        lightPink: "var(--color-lightPink)",
        
        whitePrimary: "var(--color-whitePrimary)",
        whiteSecondary: "var(--color-whiteSecondary)",

        blackPrimary:"var(--color-blackPrimary)",
        blackSecondary: "var(--color-blackSecondary)",
        blackTertiary: "var(--color-blackTertiary)",
      },
      borderColor:{
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        tab: "var(--color-tab)",
        mediumBlack: "var(--color-mediumBlack)",
        darkGrey: "var(--color-darkGrey)",
        lightGrey: "var(--color-lightGrey)",
        grey: "var(--color-grey)",
        barley: "var(--color-barley)",
        lightBarley: "var(--color-lightBarley)",
        
        orange: "var(--color-orange)",
        skyBlue: "var(--color-skyBlue)",
        royalBlue: "var(--color-royalBlue)",
        lightIndigo: "var(--color-lightIndigo)",
        lightPink: "var(--color-lightPink)",
        
        whitePrimary: "var(--color-whitePrimary)",
        whiteSecondary: "var(--color-whiteSecondary)",

        blackPrimary:"var(--color-blackPrimary)",
        blackSecondary: "var(--color-blackSecondary)",
        blackTertiary: "var(--color-blackTertiary)",
      },
      ringColor:{
        
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        
      }
    },
  },
  plugins: [],
};
