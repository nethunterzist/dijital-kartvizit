/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // Enhanced accessibility colors with better contrast
      colors: {
        'focus-ring': '#2563eb', // Blue-600
        'focus-ring-offset': '#ffffff',
      },
      ringWidth: {
        'focus': '3px',
      },
      ringOffsetWidth: {
        'focus': '2px',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        // Global focus visible utility for consistent focus indicators
        '.focus-visible-ring': {
          '@apply focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-focus-ring-offset': {},
        },
        // Screen reader only class (accessible but visually hidden)
        '.sr-only': {
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: '0',
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          borderWidth: '0',
        },
        '.sr-only-focusable': {
          '@apply sr-only': {},
        },
        '.sr-only-focusable:focus, .sr-only-focusable:active': {
          position: 'static',
          width: 'auto',
          height: 'auto',
          overflow: 'visible',
          clip: 'auto',
          whiteSpace: 'normal',
        },
        // Not screen reader only (shows visually when focused)
        '.not-sr-only': {
          position: 'static',
          width: 'auto',
          height: 'auto',
          padding: '0',
          margin: '0',
          overflow: 'visible',
          clip: 'auto',
          whiteSpace: 'normal',
        },
      });
    },
  ],
}
