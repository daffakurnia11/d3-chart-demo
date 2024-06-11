/** @type {import('tailwindcss').Config} */

import { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        inline: '0 0 2px 1px'
      },
      fontFamily: {
        display: ["Merriweather", "serif"],
        text: ["Inter", "sans-serif"],
      },
      borderRadius: {
        none: "0",
        sm: "4px",
        DEFAULT: "8px",
        md: "8px",
        lg: "12px",
        xl: "16px",
      },
      fontSize: {
        "6xl": ["60px", "1"],
        "5xl": ["48px", "1"],
        "4xl": ["40px", "48px"],
        "3xl": ["24px", "32px"],
        "2xl": ["22px", "28px"],
        xl: ["20px", "28px"],
        lg: ["18px", "28px"],
        base: ["16px", "24px"],
        sm: ["14px", "20px"],
        xs: ["12px", "16px"],
        "2xs": ["10px", "16px"],
      },
      colors: {
        primary: {
          500: "#0097B2",
          900: "#0F424B",
        },
        "secondary-green": {
          100: "#C1DFA6",
          200: "#AFE792",
          300: "#91D170",
          500: "#7ED957",
          700: "#2E8200",
          900: "#173C07",
        },
        "secondary-orange": {
          100: "#FFC197",
          200: "#F1B48B",
          300: "#E09663",
          500: "#FFA159",
          700: "#FF822B",
          900: "#572400",
        },
        "secondary-yellow": {
          100: "#F4F195",
          200: "#E8E46B",
          300: "#E9E44D",
          500: "#FFF533",
          700: "#F7E500",
          900: "#5E5400",
        },
        "secondary-blue": {
          100: "#B3EFFF",
          200: "#8DDAEE",
          300: "#66C0D8",
          500: "#0097B2",
          700: "#216970",
          900: "#00474F",
        },
        white: "#FFFFFF",
        black: "#000000",
        gray: {
          100: "#F5F5F5",
          200: "#D9D9D9",
          300: "#A4A4AB",
          400: "#7B8794",
          500: "#3E4C59",
        },
        element: {
          being: "#D4B88C",
          thinking: "#E585A1",
          relating: "#E84139",
          collaborating: "#FF6821",
          acting: "#661A30",
        },
        info: {
          100: "#E1EFFE",
          500: "#1A56DB",
        },
        success: {
          100: "#DEF7EC",
          500: "#046C4E",
        },
        warning: {
          100: "#FDE8E8",
          300: "#F47575",
          500: "#C81E1E",
        },
      },
    },
  },
  plugins: [],
};
export default config;
