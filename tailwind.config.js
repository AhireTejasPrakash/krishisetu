/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFAF6',
          100: '#FAF7F2',
          200: '#F5EFE6',
          300: '#EDE3D5',
        },
        green: {
          50: '#F0F7F1',
          100: '#EBF2EC',
          200: '#D1E8D3',
          300: '#A8D4AC',
          400: '#76BA7C',
          500: '#4E9A57',
          600: '#3D6B45',
          700: '#2E5235',
          800: '#1F3A25',
          900: '#122318',
        },
        charcoal: {
          50: '#F5F7F5',
          100: '#E8ECE8',
          200: '#C8D1C9',
          300: '#9BAD9D',
          400: '#6A7F6C',
          500: '#4A5E4C',
          600: '#3A4E3C',
          700: '#2A3B2C',
          800: '#1C2B1E',
          900: '#111A12',
        },
        amber: {
          50: '#FFF8EC',
          100: '#FDEFD3',
          200: '#FBDCA3',
          300: '#F8C16A',
          400: '#F4A030',
          500: '#E88010',
          600: '#C07A1A',
          700: '#9A5E12',
          800: '#7A4A0E',
          900: '#5A350A',
        },
        red: {
          50: '#FEF2F2',
          100: '#FDE8E8',
          200: '#FAC5C5',
          300: '#F59898',
          400: '#EE6060',
          500: '#E03333',
          600: '#B84040',
          700: '#8F2424',
          800: '#6E1A1A',
          900: '#4A1010',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        devanagari: ['Noto Sans Devanagari', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(28, 43, 30, 0.06), 0 1px 2px -1px rgba(28, 43, 30, 0.06)',
        'card-hover': '0 4px 12px 0 rgba(28, 43, 30, 0.10), 0 2px 4px -2px rgba(28, 43, 30, 0.06)',
        'dropdown': '0 8px 24px -4px rgba(28, 43, 30, 0.14), 0 4px 8px -4px rgba(28, 43, 30, 0.08)',
        'modal': '0 20px 60px -12px rgba(28, 43, 30, 0.20)',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '20px',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(12px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
