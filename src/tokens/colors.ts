export const colors = {
  // ===== LIGHT MODE =====
  light: {
    // Backgrounds - SAMA PERSIS DENGAN HARDCODE ANDA
    bgPrimary: '#f9fafb',           // bg-gray-50
    bgSecondary: '#f3f4f6',         // bg-gray-100
    bgCard: '#ffffff',              // bg-white
    bgMuted: '#e5e7eb',             // bg-gray-200
    bgHover: '#f3f4f6',             // bg-gray-100 (hover)
    
    // Text - SAMA PERSIS DENGAN HARDCODE ANDA
    textPrimary: '#111827',         // text-gray-900
    textSecondary: '#374151',       // text-gray-700
    textMuted: '#6b7280',           // text-gray-500
    textLight: '#4b5563',           // text-gray-600
    textInverse: '#ffffff',
    
    // Borders - SAMA PERSIS DENGAN HARDCODE ANDA
    border: '#e5e7eb',              // border-gray-200
    borderMedium: '#d1d5db',        // border-gray-300
    borderLight: '#f3f4f6',         // border-gray-100
    
    // Accents - SAMA PERSIS DENGAN HARDCODE ANDA
    accentPrimary: '#2563eb',       // text-blue-600
    accentHover: '#60a5fa',         // border-blue-400
    accentSuccess: '#22c55e',       // text-green-500
    accentWarning: '#f59e0b',       // text-amber-500
    accentError: '#ef4444',         // text-red-500
    
    // Status - SAMA PERSIS DENGAN HARDCODE ANDA
    statusActive: '#22c55e',        // text-green-500
    statusWarning: '#f59e0b',       // text-amber-500
    statusCritical: '#ef4444',      // text-red-500
    
    // Metrics - SAMA PERSIS DENGAN HARDCODE ANDA
    metricCpu: '#3b82f6',           // #3b82f6
    metricRam: '#8b5cf6',           // #8b5cf6
    metricStorage: '#22c55e',       // #22c55e
    metricNetwork: '#06b6d4',       // #06b6d4
    metricGpu: '#f97316',           // #f97316
    
    // Shadows - SAMA PERSIS DENGAN HARDCODE ANDA
    shadowCard: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
    shadowCardHover: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  },
  
  // ===== DARK MODE =====
  dark: {
    // Backgrounds - SAMA PERSIS DENGAN HARDCODE ANDA
    bgPrimary: '#0E0F11',
    bgSecondary: '#1A1B1E',
    bgCard: '#1E1F23',
    bgMuted: '#2A2B2F',
    bgHover: '#292A2C',
    
    // Text - SAMA PERSIS DENGAN HARDCODE ANDA
    textPrimary: '#E3E2E4',         // dark:text-[#E3E2E4]
    textSecondary: '#C3C5D7',       // dark:text-[#C3C5D7]
    textMuted: '#8A8B9E',           // dark:text-[#C3C5D7]/70
    textLight: '#64748b',
    textInverse: '#0E0F11',
    
    // Borders - SAMA PERSIS DENGAN HARDCODE ANDA
    border: '#434654',              // dark:border-[#434654]
    borderMedium: '#2A2B2F',
    borderLight: '#434654/30',
    
    // Accents - SAMA PERSIS DENGAN HARDCODE ANDA
    accentPrimary: '#B5C4FF',       // dark:text-[#B5C4FF]
    accentHover: '#B5C4FF/50',      // dark:border-[#B5C4FF]/50
    accentSuccess: '#5ADF8C',       // dark:text-[#5ADF8C]
    accentWarning: '#F9BD22',       // dark:text-[#F9BD22]
    accentError: '#FFB4AB',         // dark:text-[#FFB4AB]
    
    // Status - SAMA PERSIS DENGAN HARDCODE ANDA
    statusActive: '#5ADF8C',
    statusWarning: '#F9BD22',
    statusCritical: '#FFB4AB',
    
    // Metrics - SAMA PERSIS DENGAN HARDCODE ANDA
    metricCpu: '#60A5FA',
    metricRam: '#A78BFA',
    metricStorage: '#34D399',
    metricNetwork: '#22D3EE',
    metricGpu: '#FB923C',
    
    // Shadows - SAMA PERSIS DENGAN HARDCODE ANDA
    shadowCard: '0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px -1px rgba(0, 0, 0, 0.3)',
    shadowCardHover: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -2px rgba(0, 0, 0, 0.3)',
  },
} as const;