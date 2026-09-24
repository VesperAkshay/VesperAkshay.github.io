/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        system: ['var(--font-system)', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        desktop: 'var(--desktop-bg)',
        'window-surface': 'var(--window-bg)',
        'menubar-surface': 'var(--menubar-bg)',
        'dock-surface': 'var(--dock-bg)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        accent: 'var(--accent)',
      },
      borderRadius: {
        window: 'var(--radius-window)',
        bezel: 'var(--radius-bezel)',
        dock: 'var(--radius-dock)',
      },
      boxShadow: {
        window: 'var(--shadow-window)',
        'window-focused': 'var(--shadow-window-focused)',
      },
    },
  },
  plugins: [],
}
