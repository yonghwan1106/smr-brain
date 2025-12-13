import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1E3A5F",
          light: "#2D4A6F",
          dark: "#0F172A",
        },
        monitor: {
          DEFAULT: "#3B82F6",
          light: "#EFF6FF",
        },
        predict: {
          DEFAULT: "#10B981",
          light: "#ECFDF5",
        },
        assist: {
          DEFAULT: "#8B5CF6",
          light: "#F5F3FF",
        },
        optimize: {
          DEFAULT: "#F59E0B",
          light: "#FFFBEB",
        },
        danger: "#EF4444",
        warning: "#F59E0B",
        success: "#10B981",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 3s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
