import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx,js,jsx}', './app/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#6C5CE7',
        purple: '#6F5AF2',
        accent: '#7C5CFF',
        bg: '#F6F8FB',
        surface: '#FFFFFF',
        border: '#E6E9F0',
        muted: '#8F9BB3',
        success: '#2ECC71',
        danger: '#FF6B6B',
        warning: '#FFA94D',
        info: '#63C2FF',
      },
      boxShadow: {
        'card-sm': '0 1px 2px rgba(16,24,40,0.05)',
        'card-md': '0 4px 12px rgba(26,28,48,0.06)',
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '14px',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto'],
      },
    },
  },
}

export default config
