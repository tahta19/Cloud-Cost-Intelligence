/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': 'var(--color-bg-primary)',
        'bg-secondary': 'var(--color-bg-secondary)',
        'bg-card': 'var(--color-bg-card)',
        'bg-card-hover': 'var(--color-bg-card-hover)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-muted': 'var(--color-text-muted)',
        'text-light': 'var(--color-text-light)',
        'border': 'var(--color-border)',
        'border-light': 'var(--color-border-light)',
        'border-hover': 'var(--color-border-hover)',
        'accent': 'var(--color-accent-primary)',
        'success': 'var(--color-accent-success)',
        'warning': 'var(--color-accent-warning)',
        'error': 'var(--color-accent-error)',
        'status-active': 'var(--color-status-active)',
        'status-warning': 'var(--color-status-warning)',
        'status-critical': 'var(--color-status-critical)',
        'metric-cpu': 'var(--color-metric-cpu)',
        'metric-ram': 'var(--color-metric-ram)',
        'metric-storage': 'var(--color-metric-storage)',
        'metric-network': 'var(--color-metric-network)',
        'metric-gpu': 'var(--color-metric-gpu)',
      },
    },
  },
  plugins: [],
}