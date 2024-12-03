/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif']
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
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
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			},
  			primary: 'var(--color-primary)',
  			primary_on_brand: 'var(--color-primary-on-brand)',
  			secondary: 'var(--color-secondary)',
  			secondary_on_brand: 'var(--color-secondary-on-brand)',
  			secondary_hover: 'var(--color-secondary-hover)',
  			tertiary: 'var(--color-tertiary)',
  			tertiary_hover: 'var(--color-tertiary-hover)',
  			tertiary_on_brand: 'var(--color-tertiary-on-brand)',
  			quaternary: 'var(--color-quaternary)',
  			quaternary_on_brand: 'var(--color-quaternary-on-brand)',
  			disabled: 'var(--color-disabled)',
  			placeholder: 'var(--color-placeholder)',
  			placeholder_subtle: 'var(--color-placeholder-subtle)',
  			brand_primary: 'var(--color-brand-primary)',
  			brand_secondary: 'var(--color-brand-secondary)',
  			brand_tertiary: 'var(--color-brand-tertiary)',
  			brand_tertiary_alt: 'var(--color-brand-tertiary-alt)',
  			error_primary: 'var(--color-error-primary)',
  			warning_primary: 'var(--color-warning-primary)',
  			success_primary: 'var(--color-success-primary)'
  		}
  	}
  },
  plugins: [require('tailwindcss-animate')],
};
