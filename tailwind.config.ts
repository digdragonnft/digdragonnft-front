import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#111827",

          secondary: "#D9D9D9",

          accent: "#aa0507",

          neutral: "#232323",

          "base-100": "#F3F4F6",

          info: "#3b97e8",

          success: "#5EAF2C",

          warning: "#efc52e",

          error: "#e83026",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
} satisfies Config;
