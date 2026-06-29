export const typography = {
  fontFamily: {
    sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', monospace",
  },
  fontSize: {
    xs: 'clamp(0.75rem, 0.8vw, 0.875rem)',
    sm: 'clamp(0.875rem, 1vw, 1rem)',
    base: 'clamp(1rem, 1.5vw, 1.125rem)',
    lg: 'clamp(1.125rem, 2vw, 1.25rem)',
    xl: 'clamp(1.25rem, 2.5vw, 1.5rem)',
    '2xl': 'clamp(1.5rem, 3vw, 2rem)',
    '3xl': 'clamp(2rem, 5vw, 3.5rem)',
    '4xl': 'clamp(2.5rem, 6vw, 4rem)',
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
} as const;