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
      fontFamily
    },
  },
  plugins: [],
} satisfies Config;
