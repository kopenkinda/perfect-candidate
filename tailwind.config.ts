import type { Config } from "tailwindcss";
import daisyui, { type Config as DaisyUIConfig } from "daisyui";
import { themeConfig } from "./src/config/theme.config";

const config: Config & { daisyui?: DaisyUIConfig } = {
  content: [
    "node_modules/daisyui/dist/**/*.js",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [themeConfig.light, themeConfig.dark],
    logs: process.env.NODE_ENV === "development",
    darkTheme: themeConfig.dark,
  },
  darkMode: ["selector", `[data-theme="${themeConfig.dark}"]`],
};
export default config;
