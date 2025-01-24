import aspectRatio from "@tailwindcss/aspect-ratio";
import containerQueries from "@tailwindcss/container-queries";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{html,js,svelte,ts}",
    "./src/lib/**/*.{html,js,svelte,ts}",
  ],

  theme: {
    extend: {
      colors: {
        primary: {
          red: "#ff453a",
          orange: "#ff9f0a",
          yellow: "#ffd60a",
          green: "#32d74b",
          "light-blue": "#64d2ff",
          blue: "#3A40B4",
          "dark-blue": "#191F56",
          purple: "#0E1A7F",
          "dark-purple": "#050F43",
          violet: "#bf5af2",
          "black-blue": "#161616",
          gray: "#727272",
          pink: "#ff375f",
          white: "#fefefe",
          black: "#000000",
          container: "#121212",
          text: "#EBE2FF",
          "text-light": "#9BA7DF",
          "text-dark": "#AC99DC",
          "button-border": "#3BA6C8",
        },
        font: {
          "dark-gray": "#89929b",
          gray: "#c6cdd5",
          "light-gray": "#ecf2f8",
        },
        secondary: {
          red: "#fa7970",
          orange: "#faa356",
          green: "#7ce38b",
          "light-blue": "#a2d2fb",
          blue: "#77bdfb",
          violet: "#cea5fb",
        },
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      fontSize: {
        h1: "36px",
        h2: "30px",
        h3: "24px",
        "section-header": "16px",
        body: "14px",
        subheader: "12px",
      },
    },
  },

  plugins: [typography, forms, containerQueries, aspectRatio],
} as Config;
