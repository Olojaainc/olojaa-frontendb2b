import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		backgroundImage: {
  			'custom-url': 'url("/Background.png")',
  			'custom-radial': 'radial-gradient( #F4F5FE 0%, #FFEDE1 51%, #F4F6F7 100%), url("/Background.png")',
  			'custom-radial-orange': 'radial-gradient(99.91% 775.24% at 0% 54.88%, #FFFFFF 20.24%, rgba(255, 225, 204, 0.1) 57.08%, #FFFFFF 100%)',
  			'custom-radial-green': 'radial-gradient(99.91% 775.24% at 0% 54.88%, #FFFFFF 20.24%, rgba(209, 250, 223, 0.1) 57.08%, #FFFFFF 100%)',
  			'custom-radial-yellow': 'radial-gradient(99.91% 775.24% at 0% 54.88%, #FFFFFF 20.24%, rgba(251, 226, 183, 0.1) 57.08%, #FFFFFF 100%)',
  			'custom-radial-neon': 'radial-gradient(99.91% 775.24% at 0% 54.88%, #FFFFFF 20.24%, rgba(236, 252, 203, 0.1) 57.08%, #FFFFFF 100%)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
