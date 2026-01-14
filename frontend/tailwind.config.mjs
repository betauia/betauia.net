/** @type {import("tailwindcss").Config} */

import typography from "@tailwindcss/typography";

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  plugins: [typography],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Poppins"', "ui-sans-serif", "system-ui", "sans-serif"],
      },

      colors: {
        brand: "#0085FF",
        accent: {
          DEFAULT: "#0085FF",
          secondary: "#14B8A6",
        },

        bg: {
          base: "#F2F2F6",
          raised: "#EAEAEF",
        },

        fg: {
          base: "#242424",
          body: "#3A3A3A",
          muted: "#5B6A80",
        },

        dark: {
          bg: {
            base: "#0F151F",
            raised: "#151E2D",
          },

          fg: {
            base: "#FDFDFD",
            body: "#D8E1F0",
            muted: "#A1B1D1",
          },
        },
      },
    },
  },
};
