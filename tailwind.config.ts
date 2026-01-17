import type { Config } from "tailwindcss";

import { colors } from "./app/theme/colors";
import { fontSize } from "./app/theme/fontSize";
import { fontFamily } from "./app/theme/fontFamily";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ...colors,
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        border: "hsl(var(--border))",
        ring: "hsl(var(--ring))",
        "focusly-bg": "var(--focusly-bg)",
        "focusly-text": {
          primary: "var(--focusly-text-primary)",
          secondary: "var(--focusly-text-secondary)",
        },
      },
      fontSize,
      fontFamily,
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
      },
      backgroundImage: {
        "focusly-gradient": "var(--focusly-gradient)",
        "focusly-gradient-white": `
          linear-gradient(to bottom left, #333, #f9f9f9, #f2f2f2, #ececec, #e6e6e6);
        `,
      },
    },
  },
  plugins: [],
} satisfies Config;
