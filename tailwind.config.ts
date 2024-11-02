import type { Config } from "tailwindcss";

import { colors } from "./app/theme/colors";
import { fontSize } from "./app/theme/fontSize";
import { fontFamily } from "./app/theme/fontFamily";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors,
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
    },
  },
  plugins: [],
} satisfies Config;
