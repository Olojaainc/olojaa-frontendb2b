import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        'custom-url': 'url("/Background.png")',
        'custom-radial': 'radial-gradient(50% 50% at 50% 50%, #F4F5FE 0%, #FFEDE1 51%, #F4F6F7 100%), url("/Background.png")'
      },
    },
  },
  plugins: [],
} satisfies Config;
