/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        first: ["Helvetica", "Arial", "sans-serif"],
        second: ["Spectral", "Georgia"],
      },
      container: {
        center: true,
        padding: "1rem",
      },
      colors: {
        primary: "#fb1",
      },
      extend: {
        animation: {
          "fade-in-left": "animeLeft 0.3s forwards",
        },
        keyframes: {
          animeLeft: {
            to: {
              opacity: 1,
              transform: "initial",
            },
          },
        },
      },
    },
    boxShadow: {
      sm: "0 1px 2px 0 rgba(0, 0, 0, 0.1)",
    },
  },
  variants: {},
  plugins: [],
};
