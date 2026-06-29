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
        // Backgrounds
        'bg-primary': 'var(--color-bg-primary)',
        'bg-secondary': 'var(--color-bg-secondary)',
        'bg-card': 'var(--color-bg-card)',
        'bg-muted': 'var(--color-bg-muted)',
        'bg-hover': 'var(--color-bg-hover)',
        
        // Text
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-muted': 'var(--color-text-muted)',
        'text-light': 'var(--color-text-light)',
        'text-inverse': 'var(--color-text-inverse)',
        
        // Borders
        'border': 'var(--color-border)',
        'border-medium': 'var(--color-border-medium)',
        'border-light': 'var(--color-border-light)',
        
        // Accents
        'accent': 'var(--color-accent-primary)',
        'accent-hover': 'var(--color-accent-hover)',
        'success': 'var(--color-accent-success)',
        'warning': 'var(--color-accent-warning)',
        'error': 'var(--color-accent-error)',
        
        // Status
        'status-active': 'var(--color-status-active)',
        'status-warning': 'var(--color-status-warning)',
        'status-critical': 'var(--color-status-critical)',
        
        // Metrics
        'metric-cpu': 'var(--color-metric-cpu)',
        'metric-ram': 'var(--color-metric-ram)',
        'metric-storage': 'var(--color-metric-storage)',
        'metric-network': 'var(--color-metric-network)',
        'metric-gpu': 'var(--color-metric-gpu)',
      },
      boxShadow: {
        'card': 'var(--shadow-card)',
        'card-hover': 'var(--shadow-card-hover)',
      },
    },
  },
  plugins: [],
}